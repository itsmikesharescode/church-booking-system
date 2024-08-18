import { superValidate } from 'sveltekit-superforms';
import type { Actions, PageServerLoad } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { signInSchema, signUpSchema } from './authenticate-schema';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
	return {
		signInForm: await superValidate(zod(signInSchema)),
		signUpForm: await superValidate(zod(signUpSchema))
	};
};

export const actions: Actions = {
	signInEvent: async ({ locals: { supabase }, request }) => {
		const form = await superValidate(zod(signInSchema));

		if (!form.valid) return fail(400, { form });
	},
	signUpEvent: async ({ locals: { supabase }, request }) => {
		const form = await superValidate(zod(signUpSchema));

		if (!form.valid) return fail(400, { form });
	}
};
