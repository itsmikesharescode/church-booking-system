import { z } from 'zod';

export const updateUserSchema = z
	.object({
		userId: z.string(),
		firstName: z.string().min(1, { message: 'Must enter first name.' }),
		middleName: z.string().min(1, { message: 'Must enter middle name' }),
		lastName: z.string().min(1, { message: 'Must enter last name.' }),
		gender: z
			.string()
			.refine((v) => ['Male', 'Female'].includes(v), { message: 'Must choose a gender.' }),
		birthDate: z.string().min(1, { message: 'Must enter birth date.' }),
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

export type UpdateUserSchema = typeof updateUserSchema;
