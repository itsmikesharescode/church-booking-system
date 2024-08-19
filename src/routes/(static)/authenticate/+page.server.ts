import { superValidate } from 'sveltekit-superforms';
import type { Actions, PageServerLoad } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { forgotPwdSchema, signInSchema, signUpSchema } from './authenticate-schema';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
	return {
		signInForm: await superValidate(zod(signInSchema)),
		signUpForm: await superValidate(zod(signUpSchema)),
		forgotPwdForm: await superValidate(zod(forgotPwdSchema))
	};
};

export const actions: Actions = {
	signInEvent: async ({ locals: { supabase }, request }) => {
		const form = await superValidate(request, zod(signInSchema));

		if (!form.valid) return fail(400, { form });
	},
	signUpEvent: async ({ locals: { supabase }, request }) => {
		const form = await superValidate(request, zod(signUpSchema));

		if (!form.valid) return fail(400, { form });
	},
	forgotPwdEvent: async ({ locals: { supabase }, request }) => {
		const form = await superValidate(request, zod(forgotPwdSchema));
	}
};
