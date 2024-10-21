import type { PostgrestSingleResponse } from '@supabase/supabase-js';
import type { LayoutServerLoad } from './$types';
import type { ChurchType, UserQType } from '$lib/types';

export const load: LayoutServerLoad = async ({ locals: { supabase, session }, cookies }) => {
  return {
    userQ: (await supabase.rpc('user_query')) as PostgrestSingleResponse<UserQType>,
    session,
    cookies: cookies.getAll()
  };
};
