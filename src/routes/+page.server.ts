import { superValidate } from 'sveltekit-superforms';
import type { Actions, PageServerLoad } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { reservationSchema } from './_components/_operations/schema';
import { fail } from '@sveltejs/kit';
import type { ChurchType, UserProfile } from '$lib/types';
import type { PostgrestSingleResponse } from '@supabase/supabase-js';
import { convertTo24HourFormat } from '$lib';

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
		const initialTime = convertTo24HourFormat(form.data.initialTime);
		const finalTime = convertTo24HourFormat(form.data.finalTime);
		const churchObj = JSON.parse(form.data.churchObj) as ChurchType;

		const { error } = await supabase.rpc('validate_and_insert_booking', {
			p_church_id: churchObj.id,
			p_event_name: form.data.eventName,
			p_number_guest: form.data.guestCount,
			p_date: form.data.dateIn,
			p_initial_time: initialTime,
			p_final_time: finalTime,
			p_event_note: form.data.clientNote
		});

		if (error) return fail(401, { form, msg: error.message });

		return { form, msg: 'Successfully booked.' };
	}
};
