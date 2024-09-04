import { superValidate } from 'sveltekit-superforms';
import type { Actions, PageServerLoad } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { reservationSchema } from './_components/_operations/schema';
import { fail } from '@sveltejs/kit';
import type { ChurchType, UserProfile } from '$lib/types';
import type { PostgrestSingleResponse } from '@supabase/supabase-js';

export const load: PageServerLoad = async ({ locals: { supabase } }) => {
	return {
		churches: (await supabase
			.from('church_list_tb')
			.select('*')
			.order('created_at', { ascending: true })) as PostgrestSingleResponse<ChurchType[]>,
		reservationForm: await superValidate(zod(reservationSchema))
	};
};

export const actions: Actions = {
	reservationEvent: async ({ locals: { supabase, user }, request }) => {
		const form = await superValidate(request, zod(reservationSchema));

		if (!form.valid) return fail(400, { form });
		const userObj = JSON.parse(form.data.userObj) as UserProfile;

		if (userObj && user) {
			const { error } = await supabase.from('reservation_tb').insert([
				{
					user_id: user.id,
					user_obj: userObj,
					event_name: form.data.eventName,
					number_of_guest: form.data.guestCount,
					date_in: form.data.dateIn,
					initial_time: form.data.initialTime,
					final_time: form.data.finalTime,
					note: form.data.clientNote
				}
			]);

			if (error) return fail(401, { form, msg: error.message });

			return { form, msg: 'Successfully Reserve.' };
		}

		return fail(401, { form, msg: 'Not authorize try relogging your account.' });
	}
};
