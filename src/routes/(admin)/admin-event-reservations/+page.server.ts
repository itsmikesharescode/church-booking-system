import { superValidate } from 'sveltekit-superforms';
import type { Actions, PageServerLoad } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { updateStatusEventSchema } from './_components/_operations/_operations/event-schema';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
	return {
		updateStatusEventForm: await superValidate(zod(updateStatusEventSchema))
	};
};

export const actions: Actions = {
	deleteBookingEvent: async ({ locals: { supabase }, request }) => {
		const formData = await request.formData();
		const bookingId = formData.get('bookingId') as string;

		const { error } = await supabase.from('booking_list_tb').delete().eq('id', Number(bookingId));

		if (error) return fail(401, { msg: error.message });

		return { msg: 'Deleted successfully.' };
	}
};
