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

export type BookingType = {
  id: number;
  created_at: string;
  church_id: number;
  event_name: string;
  number_guest: number;
  date: string;
  initial_time: string;
  final_time: string;
  event_note: string;
  user_id: string;
  price: number;
};

export type ChurchType = {
  id: number;
  created_at: string;
  name: string;
  description: string;
  open_time: string;
  close_time: string;
  photo_path: string;
  price: number;
};

export type PaidType = {
  id: number;
  created_at: string;
  xendit_callback: XenditCB;
  booking_obj: BookingType;
  user_id: string;
};

export interface XenditCB {
  id: string;
  amount: number;
  status: 'PAID' | 'PENDING' | 'FAILED' | string;
  created: string;
  is_high: boolean;
  paid_at?: string;
  updated: string;
  user_id: string;
  currency: string;
  payment_id: string;
  description: string;
  external_id: string;
  paid_amount: number;
  ewallet_type: 'GCASH' | string;
  merchant_name: string;
  payment_method: 'EWALLET' | string;
  payment_channel: 'GCASH' | string;
  payment_method_id?: string;
  failure_redirect_url: string;
  success_redirect_url: string;
}

export interface Book2User extends BookingType {
  user_list_tb: UserType;
}

export interface BookChurchUser extends BookingType {
  user_data: UserType;
  church_data: ChurchType;
}

export interface AdminQType {
  users: UserType[];
  churches: ChurchType[];
  bookings: BookChurchUser[];
  payments: PaidType[];
  dashboard: {
    total_reservation: number;
    total_users: number;
    weekly_approve: Array<{ date: string; count: number }>;
    weekly_income: Array<{ date: string; income: number }>;
  };
}

export interface Church2Book extends ChurchType {
  bookings: {
    date: string;
    initial_time: string;
    final_time: string;
  }[];
}

export interface UserQType {
  churches: Church2Book[];
  reservations: BookingType[];
  payments: PaidType[];
}
