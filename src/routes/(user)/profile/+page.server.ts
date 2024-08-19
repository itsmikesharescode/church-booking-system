import { superValidate, withFiles } from 'sveltekit-superforms';
import type { Actions, PageServerLoad } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { updateInfoSchema, upUpProfileSchema } from './profile-schema';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
	return {
		upUpProfileForm: await superValidate(zod(upUpProfileSchema)),
		updateInfoForm: await superValidate(zod(updateInfoSchema))
	};
};

export const actions: Actions = {
	upUpProfileEvent: async ({ locals: { supabase }, request }) => {
		const form = await superValidate(request, zod(upUpProfileSchema));

		if (!form.valid) return fail(400, withFiles({ form }));
		console.log(form.data);
	},

	updateInfoEvent: async ({ locals: { supabase }, request }) => {
		const form = await superValidate(request, zod(updateInfoSchema));

		if (!form.valid) return fail(400, { form });

		console.log(form.data);
	}
};
