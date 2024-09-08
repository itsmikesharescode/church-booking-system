import type { PostgrestSingleResponse } from '@supabase/supabase-js';
import type { LayoutServerLoad } from './$types';
import type { AdminQType } from '$lib/types';

export const load: LayoutServerLoad = async ({ locals: { supabase } }) => {
	const { data, error } = await supabase.rpc('admin_query');
	console.log(data, error?.message);

	return {
		adminQ: (await supabase.rpc('admin_query')) as PostgrestSingleResponse<AdminQType>
	};
};
