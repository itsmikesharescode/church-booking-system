import type { PostgrestSingleResponse } from '@supabase/supabase-js';
import type { LayoutServerLoad } from './$types';
import type { Book2User } from '$lib/types';

export const load: LayoutServerLoad = async ({ locals: { supabase, user } }) => {
	return {
		bookings: (await supabase
			.from('booking_list_tb')
			.select('*, user_list_tb("*")')
			.order('created_at', { ascending: true })
			.eq('user_id', user?.id)) as PostgrestSingleResponse<Book2User[]>
	};
};
