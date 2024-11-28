import { superValidate } from 'sveltekit-superforms';
import type { Actions, PageServerLoad } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { fail } from '@sveltejs/kit';
import { approveSchema } from './components/approve-reservation/schema';

export const load: PageServerLoad = async () => {
  return {
    approveForm: await superValidate(zod(approveSchema))
  };
};

export const actions: Actions = {
  deleteBookingEvent: async ({ locals: { supabase }, request }) => {
    const formData = await request.formData();
    const bookingId = formData.get('bookingId') as string;

    const { error } = await supabase.from('booking_list_tb').delete().eq('id', Number(bookingId));

    if (error) return fail(401, { msg: error.message });

    return { msg: 'Deleted successfully.' };
  },

  approveBookingEvent: async ({ locals: { supabase }, request }) => {
    const form = await superValidate(request, zod(approveSchema));

    if (!form.valid) return fail(400, { form });

    const { error } = await supabase
      .from('booking_list_tb')
      .update([
        {
          price: form.data.price
        }
      ])
      .eq('id', form.data.bookId);

    if (error) return fail(401, { form, msg: error.message });
    return { form, msg: 'Booking approved.' };
  }
};
