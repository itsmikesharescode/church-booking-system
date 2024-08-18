import type { SupabaseJwt } from '$lib/types';
import { createServerClient } from '@supabase/ssr';
import type { Session } from '@supabase/supabase-js';
import { type Handle, redirect } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import jwt from 'jsonwebtoken';

const supabaseUrl = import.meta.env.VITE_SB_URL;
const supabaseAnonKey = import.meta.env.VITE_SB_ANON_KEY;
const supabaseAdminKey = import.meta.env.VITE_SB_ADMIN_KEY;
const jwtSecret = import.meta.env.VITE_JWT_KEY;

const supabase: Handle = async ({ event, resolve }) => {
	/**
	 * Creates a Supabase client specific to this server request.
	 *
	 * The Supabase client gets the Auth token from the request cookies.
	 */
	event.locals.supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
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

	return resolve(event);
};

export const handle: Handle = sequence(supabase, authGuard);
