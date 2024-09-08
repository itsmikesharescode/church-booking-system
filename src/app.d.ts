import type { Session, SupabaseClient, User } from '@supabase/supabase-js';
import type Xendit from 'xendit-node';
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			supabase: SupabaseClient;
			supabaseAdmin: SupabaseClient;
			getSession(): Promise<{ session: Session | null; user: User | null }>;
			session: Session | null;
			user: User | null;
			avifCompress: (file: File) => Promise<File | null>;
			resizeImage: (file: File) => Promise<File | null>;
			xenditClient: Xendit;
		}
		interface PageData {
			session: Session | null;
		}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
