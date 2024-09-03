import type { UserMetadata } from '@supabase/supabase-js';

export interface Result<T> {
	status: number;
	type: string;
	data: T;
}

//supabase workaround
export type SupabaseJwt = {
	aal: string;
	aud: string;
	email: string;
	exp: number;
	iat: number;
	phone: string;
	role: string;
	session_id: string;
	sub: string;
	amr?: { method: string; timestamp: number }[];
	app_metadata?: {
		provider?: string;
		providers?: string[];
		[key: string]: any;
	};
	is_anonymous?: boolean;
	iss?: string;
	jti?: string;
	nbf?: string;
	user_metadata: UserMetadata;
};

export type UserProfile = {
	avatarLink: string;
	birthDate: string;
	email: string;
	email_verified: boolean;
	firstName: string;
	lastName: string;
	middleName: string;
	gender: 'Male' | 'Female';
	mobileNum: string;
	phone_verified: boolean;
	role: 'user' | 'admin';
	sub: string;
};

export type UserType = {
	user_id: string;
	created_at: string;
	user_meta_data: UserProfile;
};

export type ChurchType = {
	id: number;
	created_at: string;
	name: string;
	description: string;
	open_time: string;
	close_time: string;
	photo_path: string;
};

export interface AdminQType {
	users: UserType[] | [];
	churches: ChurchType[] | [];
}
