import { superValidate, withFiles } from 'sveltekit-superforms';
import type { Actions, PageServerLoad } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import {
	updateEmailSchema,
	updateInfoSchema,
	updatePwdSchema,
	upUpProfileSchema
} from './profile-schema';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
	return {
		upUpProfileForm: await superValidate(zod(upUpProfileSchema)),
		updateInfoForm: await superValidate(zod(updateInfoSchema)),
		updateEmailForm: await superValidate(zod(updateEmailSchema)),
		updatePwdForm: await superValidate(zod(updatePwdSchema))
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
	},

	updateEmailEvent: async ({ locals: { supabase }, request }) => {
		const form = await superValidate(request, zod(updateEmailSchema));
		if (!form.valid) return fail(400, { form });

		console.log(form.data);
	},

	updatePwdEvent: async ({ locals: { supabase }, request }) => {
		const form = await superValidate(request, zod(updatePwdSchema));

		if (!form.valid) return fail(400, { form });

		console.log(form.data);
	}
};
