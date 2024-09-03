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
	upUpProfileEvent: async ({ locals: { supabase, resizeImage, user }, request }) => {
		const form = await superValidate(request, zod(upUpProfileSchema));

		if (!form.valid) return fail(400, withFiles({ form }));

		const resizeFile = await resizeImage(form.data.profilePhoto);

		if (resizeFile) {
			const { data, error } = await supabase.storage
				.from('profile_bucket')
				.upload(`${user?.id}/profile_photo`, resizeFile, { cacheControl: '3600', upsert: true });

			if (error) return fail(401, withFiles({ form, msg: error.message }));
			else if (data) {
				const {
					data: { user },
					error: updateErr
				} = await supabase.auth.updateUser({
					data: {
						avatarLink: data.path
					}
				});

				if (updateErr) return fail(401, withFiles({ form, msg: updateErr.message }));
				else if (user) return withFiles({ form, msg: 'Avatar updated.', user });
			}
		}

		return fail(401, withFiles({ msg: 'Error Resizing in the server try reuploading.' }));
	},

	updateInfoEvent: async ({ locals: { supabase }, request }) => {
		const form = await superValidate(request, zod(updateInfoSchema));

		if (!form.valid) return fail(400, { form });

		const {
			data: { user },
			error
		} = await supabase.auth.updateUser({
			data: {
				firstName: form.data.firstName,
				middleName: form.data.middleName,
				lastName: form.data.lastName,
				gender: form.data.gender,
				birthDate: form.data.birthDate,
				mobileNum: form.data.mobileNum
			}
		});

		if (error) return fail(401, { form, msg: error.message });
		else if (user) return { form, msg: 'Information Updated.', user };
	},

	updateEmailEvent: async ({ locals: { supabase }, request }) => {
		const form = await superValidate(request, zod(updateEmailSchema));
		if (!form.valid) return fail(400, { form });

		const {
			data: { user },
			error
		} = await supabase.auth.updateUser({
			email: form.data.email
		});
		if (error) return fail(401, { form, msg: error.message });
		else if (user)
			return {
				form,
				msg: `An confirmation email has been sent to your new email ${form.data.email}.`
			};
	},

	updatePwdEvent: async ({ locals: { supabase }, request }) => {
		const form = await superValidate(request, zod(updatePwdSchema));

		if (!form.valid) return fail(400, { form });

		const {
			data: { user },
			error
		} = await supabase.auth.updateUser({
			password: form.data.pwd
		});

		if (error) return fail(401, { form, msg: error.message });
		else if (user) return { form, msg: 'Password updated', user };
	}
};
