import { adminRoutes, userRoutes } from '$lib';
import { createServerClient } from '@supabase/ssr';
import { type Handle, redirect } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import sharp from 'sharp';
import { Xendit } from 'xendit-node';
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';
import {
  PRIVATE_SUPABASE_ADMIN_KEY,
  PRIVATE_XENDIT_KEY,
  PRIVATE_MAILER_KEY,
  PRIVATE_MAILER_USER,
  PRIVATE_GEMINI_KEY
} from '$env/static/private';
import { GoogleGenerativeAI } from '@google/generative-ai';
import nodemailer from 'nodemailer';

const supabase: Handle = async ({ event, resolve }) => {
  event.locals.supabase = createServerClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
    cookies: {
      getAll: () => event.cookies.getAll(),
      setAll: (cookiesToSet) => {
        cookiesToSet.forEach(({ name, value, options }) => {
          event.cookies.set(name, value, { ...options, path: '/' });
        });
      }
    }
  });

  event.locals.supabaseAdmin = createServerClient(PUBLIC_SUPABASE_URL, PRIVATE_SUPABASE_ADMIN_KEY, {
    cookies: {
      getAll: () => event.cookies.getAll(),

      setAll: (cookiesToSet) => {
        cookiesToSet.forEach(({ name, value, options }) => {
          event.cookies.set(name, value, { ...options, path: '/' });
        });
      }
    }
  });

  event.locals.safeGetSession = async () => {
    const {
      data: { session }
    } = await event.locals.supabase.auth.getSession();
    if (!session) {
      return { session: null, user: null };
    }

    const {
      data: { user },
      error
    } = await event.locals.supabase.auth.getUser();
    if (error) {
      return { session: null, user: null };
    }

    return { session, user };
  };

  return resolve(event, {
    filterSerializedResponseHeaders(name) {
      return name === 'content-range' || name === 'x-supabase-api-version';
    }
  });
};

const authGuard: Handle = async ({ event, resolve }) => {
  const { session, user } = await event.locals.safeGetSession();
  event.locals.session = session;
  event.locals.user = user;
  console.log(user?.user_metadata.role);
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

  event.locals.gemini = async (prompt: string): Promise<{ error?: string; result?: string }> => {
    try {
      if (!prompt?.trim()) {
        return { error: 'Prompt is required' };
      }

      const genAI = new GoogleGenerativeAI(PRIVATE_GEMINI_KEY);
      const model = genAI.getGenerativeModel({
        model: 'gemini-1.0-pro'
      });

      const generationConfig = {
        temperature: 0.9,
        topP: 1,
        maxOutputTokens: 2048,
        responseMimeType: 'text/plain'
      };

      const chatSession = model.startChat({
        generationConfig,
        history: []
      });

      const response = await chatSession.sendMessage(prompt);
      const result = response.response.text();

      return { result };
    } catch (error) {
      console.error('Gemini API error:', error);
      return { error: 'Failed to process your request' };
    }
  };

  event.locals.mailer = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: PRIVATE_MAILER_USER,
      pass: PRIVATE_MAILER_KEY
    }
  });

  event.locals.sendEmail = async ({
    to,
    subject,
    html
  }: {
    to: string;
    subject: string;
    html: string;
  }) => {
    try {
      await event.locals.mailer.sendMail({
        from: PRIVATE_MAILER_USER,
        to,
        subject,
        html
      });
      return { success: true };
    } catch (error) {
      console.error('Email sending failed:', error);
      return { success: false, error };
    }
  };

  return resolve(event);
};

const paymentHooks: Handle = async ({ event, resolve }) => {
  event.locals.xenditClient = new Xendit({ secretKey: PRIVATE_XENDIT_KEY });

  return resolve(event);
};

export const handle: Handle = sequence(supabase, authGuard, workers, paymentHooks);
