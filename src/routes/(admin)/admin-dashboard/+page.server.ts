import { superValidate, withFiles } from 'sveltekit-superforms';
import type { Actions, PageServerLoad } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { upChSchema, updateChInfoSchema, updateChPhotoSchema } from './admin-dashboard-schema';
import { fail } from '@sveltejs/kit';
import { convertTo24HourFormat } from '$lib';

export const load: PageServerLoad = async ({ locals: { supabase } }) => {
  return {
    upChForm: await superValidate(zod(upChSchema)),
    updateChInfoForm: await superValidate(zod(updateChInfoSchema)),
    updateChPhotoForm: await superValidate(zod(updateChPhotoSchema))
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
          photo_path: uploadData.path,
          price: form.data.price
        }
      ]);

      if (error) return fail(401, withFiles({ form, msg: error.message }));

      return withFiles({ form, msg: 'Upload success.' });
    }
  },

  updateChInfoEvent: async ({ request, locals: { supabase } }) => {
    const form = await superValidate(request, zod(updateChInfoSchema));

    if (!form.valid) return fail(400, { form });

    const { error } = await supabase
      .from('church_list_tb')
      .update([
        {
          name: form.data.chName,
          description: form.data.description,
          open_time: form.data.openT,
          close_time: form.data.closeT
        }
      ])
      .eq('id', form.data.chId);

    if (error) return fail(401, { form, msg: error.message });
    return { form, msg: 'Updated details successfully' };
  },

  updateChPhotoEvent: async ({ request, locals: { supabase } }) => {
    const form = await superValidate(request, zod(updateChPhotoSchema));

    if (!form.valid) return fail(400, { form });

    const { data, error } = await supabase.storage
      .from('church_bucket')
      .update(form.data.chPhotoPath, form.data.chPhoto);

    if (error) return fail(401, withFiles({ form, msg: error.message }));

    const { error: updateErr } = await supabase
      .from('church_list_tb')
      .update([
        {
          photo_path: data.path
        }
      ])
      .eq('id', form.data.chId);

    if (updateErr) return fail(401, withFiles({ form, msg: updateErr.message }));
    return withFiles({ form, msg: 'Updated photo successfully.' });
  },

  deleteChEvent: async ({ request, locals: { supabase } }) => {
    const formData = await request.formData();
    const chId = formData.get('chId') as string;
    const chPhotoPath = formData.get('chPhotoPath') as string;

    await supabase.storage.from('church_bucket').remove([chPhotoPath]);
    const { error } = await supabase.from('church_list_tb').delete().eq('id', Number(chId));
    if (error) return fail(401, { msg: error.message });
    return { msg: 'Deleted successfully.' };
  }
};
