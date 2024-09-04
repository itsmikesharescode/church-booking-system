import type { PostgrestSingleResponse } from '@supabase/supabase-js';
import type { LayoutServerLoad } from './$types';
import type { ChurchType } from '$lib/types';

export const load: LayoutServerLoad = async ({ locals: { supabase, session }, cookies }) => {
	return {
		churches: (await supabase
			.from('church_list_tb')
			.select('*, booking_list_tb("initial_time","final_time", "date")')
			.order('created_at', { ascending: true })) as PostgrestSingleResponse<ChurchType[]>,
		session,
		cookies: cookies.getAll()
	};
};
