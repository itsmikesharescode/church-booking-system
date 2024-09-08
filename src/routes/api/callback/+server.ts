import { json, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ locals: { supabaseAdmin }, request }) => {
	const body = await request.json();
	console.log(body);
	if (body.status === 'PAID') {
		const { error: insertError } = await supabaseAdmin.from('orders_tb').insert([
			{
				user_id: body.external_id,
				xendit_callback: body
			}
		]);

		if (insertError) console.log(insertError); // intentional error side effect for vercel logging
	}

	return json({ status: 'success' });
};
