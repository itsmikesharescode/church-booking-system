import type { PostgrestSingleResponse } from '@supabase/supabase-js';
import type { LayoutServerLoad } from './$types';
import type { AdminQType } from '$lib/types';

export const load: LayoutServerLoad = async ({ locals: { supabase } }) => {
  return {
    adminQ: (await supabase.rpc('admin_query')) as PostgrestSingleResponse<AdminQType>
  };
};
