import { z } from 'zod';

export const recUpdatePwdSchema = z
	.object({
		newPwd: z.string().min(8, { message: 'Must choose a strong password.' }),
		confirmNewPwd: z.string()
	})
	.superRefine(({ newPwd, confirmNewPwd }, ctx) => {
		if (newPwd !== confirmNewPwd) {
			ctx.addIssue({
				code: 'custom',
				message: 'Must confirm new password.',
				path: ['confirmNewPwd']
			});
		}
	});

export type RecUpdatePwdSchema = typeof recUpdatePwdSchema;
