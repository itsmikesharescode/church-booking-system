import { superValidate } from 'sveltekit-superforms';
import type { Actions, PageServerLoad } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { createUserSchema, updateUserSchema } from './manage-users-schema';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
	return {
		createUserForm: await superValidate(zod(createUserSchema)),
		updateUserForm: await superValidate(zod(updateUserSchema))
	};
};

export const actions: Actions = {
	createUserEvent: async ({ locals: { supabase }, request }) => {
		const form = await superValidate(request, zod(createUserSchema));

		if (!form.valid) return fail(400, { form });

		const {
			data: { user },
			error
		} = await supabase.auth.admin.createUser({
			email: form.data.email,
			password: form.data.pwd,
			user_metadata: {
				role: 'user',
				email: form.data.email,
				firstName: form.data.firstName,
				middleName: form.data.middleName,
				lastName: form.data.lastName,
				gender: form.data.gender,
				birthDate: form.data.birthDate,
				mobileNum: form.data.mobileNum
			}
		});

		if (error) return fail(401, { form, msg: error.message });
		else if (user) return { form, msg: 'Account Created.', user };
	},

	updateUserEvent: async ({ locals: { supabase }, request }) => {
		const form = await superValidate(request, zod(updateUserSchema));

		if (!form.valid) return fail(400, { form });

		const {
			data: { user },
			error
		} = await supabase.auth.admin.updateUserById(form.data.userId, {
			email: form.data.email,
			password: form.data.pwd,
			user_metadata: {
				role: 'user',
				email: form.data.email,
				firstName: form.data.firstName,
				middleName: form.data.middleName,
				lastName: form.data.lastName,
				gender: form.data.gender,
				birthDate: form.data.birthDate,
				mobileNum: form.data.mobileNum
			}
		});

		if (error) return fail(401, { form, msg: error.message });
		else if (user) return { form, msg: 'Account Updated.', user };
	},

	deleteUserEvent: async ({ locals: { supabase }, request }) => {
		const formData = await request.formData();
		const userId = formData.get('userId') as string;

		const {
			data: { user },
			error
		} = await supabase.auth.admin.deleteUser(userId);

		if (error) return fail(401, { msg: error.message });
		else if (user) return { msg: 'Account Deleted.', user };
	}
};
