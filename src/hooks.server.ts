import { adminRoutes, userRoutes } from '$lib';
import type { SupabaseJwt } from '$lib/types';
import { createServerClient } from '@supabase/ssr';
import type { Session } from '@supabase/supabase-js';
import { type Handle, redirect } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import jwt from 'jsonwebtoken';
import sharp from 'sharp';
import { Xendit } from 'xendit-node';

const supabaseUrl = import.meta.env.VITE_SB_URL;
const supabaseAnonKey = import.meta.env.VITE_SB_ANON_KEY;
const supabaseAdminKey = import.meta.env.VITE_SB_ADMIN_KEY;
const jwtSecret = import.meta.env.VITE_JWT_KEY;
const xenditKey = import.meta.env.VITE_XENDIT_KEY;

const supabase: Handle = async ({ event, resolve }) => {
	/**
	 * Creates a Supabase client specific to this server request.
	 *
	 * The Supabase client gets the Auth token from the request cookies.
	 */
	event.locals.supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
		cookies: {
			getAll: () => event.cookies.getAll(),
			setAll: (cookiesToSet) => {
				cookiesToSet.forEach(({ name, value, options }) => {
					event.cookies.set(name, value, { ...options, path: '/' });
				});
			}
		}
	});

	event.locals.supabaseAdmin = createServerClient(supabaseUrl, supabaseAdminKey, {
		cookies: {
			getAll: () => event.cookies.getAll(),
			/**
			 * SvelteKit's cookies API requires `path` to be explicitly set in
			 * the cookie options. Setting `path` to `/` replicates previous/
			 * standard behavior.
			 */
			setAll: (cookiesToSet) => {
				cookiesToSet.forEach(({ name, value, options }) => {
					event.cookies.set(name, value, { ...options, path: '/' });
				});
			}
		}
	});

	event.locals.getSession = async () => {
		const {
			data: { session }
		} = await event.locals.supabase.auth.getSession();

		if (!session) return { session: null, user: null };

		try {
			const decoded = jwt.verify(session.access_token, jwtSecret) as SupabaseJwt;
			const validated_session: Session = {
				access_token: session.access_token,
				refresh_token: session.refresh_token,
				expires_at: decoded.exp,
				expires_in: decoded.exp - Math.round(Date.now() / 1000),
				token_type: 'bearer',
				user: {
					app_metadata: decoded.app_metadata ?? {},
					aud: 'authenticated',
					created_at: '',
					id: decoded.sub,
					user_metadata: decoded.user_metadata
				}
			};

			return { session: validated_session, user: validated_session.user };
		} catch (err) {
			return { session: null, user: null };
		}
	};

	return resolve(event, {
		filterSerializedResponseHeaders(name) {
			/**
			 * Supabase libraries use the `content-range` and `x-supabase-api-version`
			 * headers, so we need to tell SvelteKit to pass it through.
			 */
			return name === 'content-range' || name === 'x-supabase-api-version';
		}
	});
};

const authGuard: Handle = async ({ event, resolve }) => {
	const { session, user } = await event.locals.getSession();
	event.locals.session = session;
	event.locals.user = user;

	const path = event.url.pathname;
	// redirect user by roles if has auth
	if (user && path === '/authenticate') {
		const { role } = user.user_metadata;
		if (role === 'user') redirect(303, '/');
		if (role === 'admin') redirect(303, '/admin-dashboard');
	}

	// if has auth and visiting admin site but not admin
	if (user && adminRoutes.includes(path)) {
		const { role } = user.user_metadata;
		if (role !== 'admin') redirect(303, '/?error=not-authorize');
	}

	// if has auth and visiting user site but is admin
	if (user && userRoutes.includes(path)) {
		const { role } = user.user_metadata;
		if (role !== 'user') redirect(303, '/admin-dashboard');
	}

	// if admin visiting landing
	if (user && path === '/') {
		const { role } = user.user_metadata;
		if (role === 'admin') redirect(303, '/admin-dashboard');
	}

	// check if no auth at restricted user routes
	if (!user && userRoutes.includes(path)) redirect(303, '/');
	if (!user && adminRoutes.includes(path)) redirect(303, '/?error=not-authorize');

	return resolve(event);
};

const workers: Handle = async ({ event, resolve }) => {
	event.locals.avifCompress = async (file: File) => {
		try {
			if (!file || file.size === 0) throw new Error('Invalid file');

			const buffer = Buffer.from(await file.arrayBuffer());

			const processedBuffer = await sharp(buffer)
				.resize(400, 400, { fit: 'cover', withoutEnlargement: true })
				.avif({ quality: 80 })
				.toBuffer();

			return new File([processedBuffer], 'image.avif', { type: 'image/avif' });
		} catch (error) {
			return null;
		}
	};

	event.locals.resizeImage = async (file: File) => {
		try {
			if (!file || file.size === 0) throw new Error('Invalid file');

			const MAX_SIZE = 1 * 1024 * 1024; // 1MB in bytes

			// Convert file to buffer
			let buffer = Buffer.from(await file.arrayBuffer());

			// Resize to 400x400 pixels
			let processedBuffer = await sharp(buffer)
				.resize(400, 400, { fit: 'cover', withoutEnlargement: true })
				.toBuffer();

			// If resized image is still larger than 1MB, try to compress it further
			while (processedBuffer.length > MAX_SIZE) {
				// Compress further by reducing quality (you can adjust this as needed)
				processedBuffer = await sharp(processedBuffer)
					.jpeg({ quality: 80 }) // Adjust quality to lower the size
					.toBuffer();

				// If quality adjustment does not work, break the loop to avoid infinite loops
				if (processedBuffer.length <= MAX_SIZE || processedBuffer.length >= buffer.length) {
					break;
				}

				buffer = processedBuffer;
			}

			// If the final processed buffer is still larger than 1MB, return null
			if (processedBuffer.length > MAX_SIZE) {
				throw new Error('Unable to reduce file size under 1MB');
			}

			return new File([processedBuffer], file.name, { type: file.type });
		} catch (error) {
			return null;
		}
	};

	return resolve(event);
};

const paymentHooks: Handle = async ({ event, resolve }) => {
	event.locals.xenditClient = new Xendit({ secretKey: xenditKey });

	return resolve(event);
};

export const handle: Handle = sequence(supabase, authGuard, workers, paymentHooks);
