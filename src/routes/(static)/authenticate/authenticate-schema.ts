import { z } from 'zod';

export const signInSchema = z.object({
  email: z.string().email({ message: 'Must enter a valid email.' }),
  pwd: z.string().min(1, { message: 'Must enter a password.' })
});

export const signUpSchema = z
  .object({
    firstName: z.string().min(1, { message: 'Must enter first name.' }),
    middleName: z.string().min(1, { message: 'Must enter middle name' }),
    lastName: z.string().min(1, { message: 'Must enter last name.' }),
    gender: z
      .string()
      .refine((v) => ['Male', 'Female'].includes(v), { message: 'Must choose a gender.' }),
    email: z.string().email({ message: 'Must enter a valid email.' }),
    mobileNum: z.string().regex(/^(\+63)\d{10}$/, {
      message: 'Must enter a valid mobile number in the format +639xxxxxxxxx.'
    }),
    pwd: z.string().min(8, { message: 'Must choose strong password.' }),
    confirmPwd: z.string()
  })
  .superRefine(({ pwd, confirmPwd }, ctx) => {
    if (pwd !== confirmPwd) {
      ctx.addIssue({
        code: 'custom',
        message: 'Confirm password must match',
        path: ['confirmPwd']
      });
    }
  });

export const forgotPwdSchema = z.object({
  email: z.string().min(1, { message: 'Must enter valid email.' })
});

export type SignInSchema = typeof signInSchema;
export type SignUpSchema = typeof signUpSchema;
export type ForgotPwdSchema = typeof forgotPwdSchema;
