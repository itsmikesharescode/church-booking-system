import { fail, type Actions } from '@sveltejs/kit';

export const actions: Actions = {
  deletePaymentEvent: async ({ locals: { supabase }, request }) => {
    const formData = await request.formData();
    const paymentId = formData.get('paymentId') as string;

    const { error } = await supabase.from('paid_list_tb').delete().eq('id', paymentId);
    if (error) return fail(401, { msg: error.message });
    return { msg: 'Payment deleted.' };
  }
};
