import { json, type RequestHandler } from '@sveltejs/kit';
import type { CreateInvoiceRequest } from 'xendit-node/invoice/models';

export const POST: RequestHandler = async ({ request, locals: { xenditClient } }) => {
	const invoice = (await request.json()) as CreateInvoiceRequest | null;

	try {
		if (invoice) {
			const res = await xenditClient.Invoice.createInvoice({
				data: invoice
			});
			if (res) {
				return json({ msg: 'Success', xenditData: res });
			}
		}
		return json({ msg: 'Invalid invoice data' }, { status: 400 });
	} catch (error) {
		return json({ msg: 'Error' }, { status: 401 });
	}
};
