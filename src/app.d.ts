import type { Session, SupabaseClient, User } from '@supabase/supabase-js';
import type Xendit from 'xendit-node';
import type { Mailer } from 'nodemailer';
declare global {
  namespace App {
    // interface Error {}
    interface Locals {
      supabase: SupabaseClient;
      supabaseAdmin: SupabaseClient;
      safeGetSession(): Promise<{ session: Session | null; user: User | null }>;
      session: Session | null;
      user: User | null;
      avifCompress: (file: File) => Promise<File | null>;
      resizeImage: (file: File) => Promise<File | null>;
      gemini: (prompt: string) => Promise<{ error?: string; result?: string }>;
      xenditClient: Xendit;
      mailer: Mailer;
      sendEmail: (params: {
        to: string;
        subject: string;
        html: string;
      }) => Promise<{ success: boolean; error?: string }>;
    }
    interface PageData {
      session: Session | null;
      supabase?: SupabaseClient;
      user?: User | null;
    }
    // interface PageState {}
    // interface Platform {}
  }
}

export {};
