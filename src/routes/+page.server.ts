import { superValidate } from 'sveltekit-superforms';
import type { Actions, PageServerLoad } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { reservationSchema } from './_components/_operations/schema';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
	return {
		reservationForm: await superValidate(zod(reservationSchema))
	};
};

export const actions: Actions = {
	reservationEvent: async ({ request }) => {
		const form = await superValidate(request, zod(reservationSchema));

		if (!form.valid) return fail(400, { form });

		console.log(form.data);
	}
};
