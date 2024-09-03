import { superValidate } from 'sveltekit-superforms';
import type { Actions, PageServerLoad } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { createUserSchema, updateUserSchema } from './manage-users-schema';
import { fail } from '@sveltejs/kit';
import type { PostgrestSingleResponse } from '@supabase/supabase-js';
import type { UserType } from '$lib/types';

export const load: PageServerLoad = async () => {
	return {
		createUserForm: await superValidate(zod(createUserSchema)),
		updateUserForm: await superValidate(zod(updateUserSchema))
	};
};

export const actions: Actions = {
	createUserEvent: async ({ locals: { supabaseAdmin }, request }) => {
		const form = await superValidate(request, zod(createUserSchema));

		if (!form.valid) return fail(400, { form });

		const {
			data: { user },
			error
		} = await supabaseAdmin.auth.admin.createUser({
			email: form.data.email,
			password: form.data.pwd,
			email_confirm: true,
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
		else if (user) {
			const { data, error: selectErr } = (await supabaseAdmin
				.from('user_list_tb')
				.select('*')
				.order('created_at', { ascending: true })
				.limit(10)) as PostgrestSingleResponse<UserType[]>;

			if (selectErr) return fail(401, { form, msg: selectErr.message });

			return { form, msg: 'Account Created.', data };
		}
	},

	updateUserEvent: async ({ locals: { supabaseAdmin }, request }) => {
		const form = await superValidate(request, zod(updateUserSchema));

		if (!form.valid) return fail(400, { form });

		const {
			data: { user },
			error
		} = await supabaseAdmin.auth.admin.updateUserById(form.data.userId, {
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
		else if (user) {
			const { data, error: selectErr } = (await supabaseAdmin
				.from('user_list_tb')
				.select('*')
				.order('created_at', { ascending: true })
				.limit(10)) as PostgrestSingleResponse<UserType[]>;

			if (selectErr) return fail(401, { form, msg: selectErr.message });

			return { form, msg: 'Account Updated.', data };
		}
	},

	deleteUserEvent: async ({ locals: { supabaseAdmin }, request }) => {
		const formData = await request.formData();
		const userId = formData.get('userId') as string;

		const {
			data: { user },
			error
		} = await supabaseAdmin.auth.admin.deleteUser(userId);

		if (error) return fail(401, { msg: error.message });
		else if (user) {
			const { data, error: selectErr } = (await supabaseAdmin
				.from('user_list_tb')
				.select('*')
				.order('created_at', { ascending: true })
				.limit(10)) as PostgrestSingleResponse<UserType[]>;

			if (selectErr) return fail(401, { msg: selectErr.message });

			return { msg: 'Account Deleted.', data };
		}
	}
};
