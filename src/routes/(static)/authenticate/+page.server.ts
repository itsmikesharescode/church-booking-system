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

    const { data, error } = await supabase.auth.signInWithPassword({
      email: form.data.email,
      password: form.data.pwd
    });

    if (error) return fail(401, { form, msg: error.message });
    else if (data.user) return { form, msg: 'Welcome back!' };
  },
  signUpEvent: async ({ locals: { supabase }, request }) => {
    const form = await superValidate(request, zod(signUpSchema));

    if (!form.valid) return fail(400, { form });

    const {
      data: { user },
      error
    } = await supabase.auth.signUp({
      email: form.data.email,
      password: form.data.pwd,
      options: {
        data: {
          role: 'user',
          email: form.data.email,
          firstName: form.data.firstName,
          middleName: form.data.middleName,
          lastName: form.data.lastName,
          gender: form.data.gender,
          birthDate: form.data.birthDate,
          mobileNum: form.data.mobileNum
        }
      }
    });

    if (error) return fail(401, { form, msg: error.message });
    else if (user) return { form, msg: 'Account created.' };
  },
  forgotPwdEvent: async ({ locals: { supabase }, request }) => {
    const form = await superValidate(request, zod(forgotPwdSchema));

    if (!form.valid) return fail(400, { form });

    const { error } = await supabase.auth.resetPasswordForEmail(form.data.email);
    if (error) return fail(401, { form, msg: error.message });

    return {
      form,
      msg: `An email containing password resit link has been sent to your email ${form.data.email}.`
    };
  }
};
