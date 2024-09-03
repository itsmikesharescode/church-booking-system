import { superValidate, withFiles } from 'sveltekit-superforms';
import type { Actions, PageServerLoad } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { upChSchema } from './admin-dashboard-schema';
import { fail } from '@sveltejs/kit';
import { convertTo24HourFormat } from '$lib';

export const load: PageServerLoad = async () => {
	return {
		upChForm: await superValidate(zod(upChSchema))
	};
};

export const actions: Actions = {
	upLoadChEvent: async ({ request, locals: { supabase } }) => {
		const form = await superValidate(request, zod(upChSchema));

		if (!form.valid) return fail(400, withFiles({ form }));

		const openTconvert = convertTo24HourFormat(form.data.openT);
		const closeTconvert = convertTo24HourFormat(form.data.closeT);
		const uid = crypto.randomUUID();

		const { data: uploadData, error: uploadErr } = await supabase.storage
			.from('church_bucket')
			.upload(uid, form.data.chPhoto, {
				cacheControl: '3600',
				upsert: false
			});

		if (uploadErr) return fail(401, withFiles({ form, msg: uploadErr.message }));

		if (uploadData) {
			const { error } = await supabase.from('church_list_tb').insert([
				{
					name: form.data.chName,
					description: form.data.description,
					open_time: openTconvert,
					close_time: closeTconvert,
					photo_path: uploadData.path
				}
			]);

			if (error) return fail(401, withFiles({ form, msg: error.message }));

			return withFiles({ form, msg: 'Upload success.' });
		}
	}
};
