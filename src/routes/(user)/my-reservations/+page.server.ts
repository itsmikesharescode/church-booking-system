import { fail, type Actions } from '@sveltejs/kit';

export const actions: Actions = {
	deleteReservationEvent: async ({ locals: { supabase }, request }) => {
		const formData = await request.formData();
		const bookingId = formData.get('bookingId') as string;

		const { error } = await supabase.from('booking_list_tb').delete().eq('id', bookingId);

		if (error) return fail(401, { msg: error.message });
		return { msg: 'Reservation deleted.' };
	},

	paymentProcessEvent: async ({ locals: { supabase }, request }) => {
		const formData = await request.formData();
		console.log('HI');
	}
};
