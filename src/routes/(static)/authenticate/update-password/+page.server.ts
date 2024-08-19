import { redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { fail, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { recUpdatePwdSchema } from './update-password-schema';

export const load: PageServerLoad = async ({ locals: { supabase }, url }) => {
	const { error } = await supabase.auth.verifyOtp({
		token_hash: url.searchParams.get('token') ?? '',
		type: 'email'
	});

	if (error) redirect(303, `/?error=${error.message.split(' ').join('-')}`);
	return {
		recUpdatePwdForm: await superValidate(zod(recUpdatePwdSchema))
	};
};

export const actions: Actions = {
	recUpdatePwdEvent: async ({ locals: { supabase }, request }) => {
		const form = await superValidate(request, zod(recUpdatePwdSchema));

		if (!form.valid) return fail(400, { form });

		const {
			data: { user },
			error
		} = await supabase.auth.updateUser({
			password: form.data.newPwd
		});

		if (error) return fail(401, { form, msg: error.message });
		else if (user) return { form, msg: 'Password updated.' };
	}
};
