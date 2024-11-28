import { superValidate, withFiles } from 'sveltekit-superforms';
import type { Actions, PageServerLoad } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { fail } from '@sveltejs/kit';
import { convertTo24HourFormat } from '$lib';
import { addChurchSchema } from './_components/add-church/schema';
import {
  updateChurchInfoSchema,
  updateChurchPhotoSchema
} from './_components/update-church/components/schema';

export const load: PageServerLoad = async ({ locals: { supabase } }) => {
  return {
    addChurchForm: await superValidate(zod(addChurchSchema)),
    updateChurchInfoForm: await superValidate(zod(updateChurchInfoSchema)),
    updateChurchPhotoForm: await superValidate(zod(updateChurchPhotoSchema))
  };
};

export const actions: Actions = {
  addChurchEvent: async ({ request, locals: { supabase } }) => {
    const form = await superValidate(request, zod(addChurchSchema));

    if (!form.valid) return fail(400, withFiles({ form }));

    console.log(form.data);

    const openTconvert = convertTo24HourFormat(form.data.openT);
    const closeTconvert = convertTo24HourFormat(form.data.closeT);
    const uid = crypto.randomUUID();

    const { data: uploadData, error: uploadErr } = await supabase.storage
      .from('church_bucket')
      .upload(uid, form.data.photo, {
        cacheControl: '3600',
        upsert: false
      });

    if (uploadErr) return fail(401, withFiles({ form, msg: uploadErr.message }));

    if (uploadData) {
      const { error } = await supabase.from('church_list_tb').insert([
        {
          name: form.data.name,
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

  updateChurchInfoEvent: async ({ request, locals: { supabase } }) => {
    const form = await superValidate(request, zod(updateChurchInfoSchema));

    if (!form.valid) return fail(400, { form });

    console.log(form.data);

    const { error } = await supabase
      .from('church_list_tb')
      .update([
        {
          name: form.data.name,
          description: form.data.description,
          open_time: form.data.openT,
          close_time: form.data.closeT,
          price: form.data.price
        }
      ])
      .eq('id', form.data.id);

    if (error) return fail(401, { form, msg: error.message });
    return { form, msg: 'Updated details successfully' };
  },

  updateChurchPhotoEvent: async ({ request, locals: { supabase } }) => {
    const form = await superValidate(request, zod(updateChurchPhotoSchema));

    if (!form.valid) return fail(400, { form });

    const { data, error } = await supabase.storage
      .from('church_bucket')
      .update(form.data.photoPath, form.data.photo);

    if (error) return fail(401, withFiles({ form, msg: error.message }));

    const { error: updateErr } = await supabase
      .from('church_list_tb')
      .update([
        {
          photo_path: data.path
        }
      ])
      .eq('id', form.data.id);

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
