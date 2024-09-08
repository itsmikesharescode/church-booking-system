import { fail, type Actions } from '@sveltejs/kit';
import type { CreateInvoiceRequest } from 'xendit-node/invoice/models';

export const actions: Actions = {
	deleteReservationEvent: async ({ locals: { supabase }, request }) => {
		const formData = await request.formData();
		const bookingId = formData.get('bookingId') as string;

		const { error } = await supabase.from('booking_list_tb').delete().eq('id', bookingId);

		if (error) return fail(401, { msg: error.message });
		return { msg: 'Reservation deleted.' };
	},

	paymentProcessEvent: async ({ locals: { xenditClient }, request }) => {
		const formData = await request.formData();
		const invoiceRef = formData.get('invoiceRef') as string;
		const invoice = JSON.parse(invoiceRef) as CreateInvoiceRequest;

		try {
			if (invoice) {
				const res = await xenditClient.Invoice.createInvoice({
					data: invoice
				});
				if (res) {
					return { xenditData: res };
				}
			}
			return fail(401, { msg: 'There is an error 1 try reloading.' });
		} catch (error) {
			return fail(401, { msg: 'There is an error 1 try reloading.' });
		}
	}
};
