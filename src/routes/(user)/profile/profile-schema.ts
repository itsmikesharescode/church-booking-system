import { z } from 'zod';

const MAX_FILE_SIZE = 1024 * 1024; // 1MB in bytes
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/gif'];

export const upUpProfileSchema = z.object({
	profilePhoto: z
		.instanceof(File) // Ensures that the value is a File instance
		.refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
			message: 'Only .jpeg, .png, and .gif files are accepted'
		})
		.refine((file) => file.size <= MAX_FILE_SIZE, {
			message: 'File size should be less than or equal to 1MB'
		})
});

export const updateInfoSchema = z.object({
	firstName: z.string().min(1, { message: 'Must enter your new first name.' }),
	middleName: z.string().min(1, { message: 'Must enter your new middle name.' }),
	lastName: z.string().min(1, { message: 'Must enter your new last name.' }),
	mobileNum: z.string().regex(/^(\+63)\d{10}$/, {
		message: 'Must enter a valid mobile number in the format +639xxxxxxxxx.'
	}),
	gender: z
		.string()
		.refine((v) => ['Male', 'Female'].includes(v), { message: 'Must choose your new gender.' }),
	birthDate: z.string().min(1, { message: 'Must enter your new birth date.' })
});

export const updateEmailSchema = z.object({
	email: z.string().email({ message: 'Must enter a new valid email.' })
});

export const updatePwdSchema = z
	.object({
		pwd: z.string().min(8, { message: 'Must choose strong new password.' }),
		confirmPwd: z.string()
	})
	.superRefine(({ pwd, confirmPwd }, ctx) => {
		if (pwd !== confirmPwd) {
			ctx.addIssue({
				code: 'custom',
				message: 'Must confirm your new password.',
				path: ['confirmPwd']
			});
		}
	});

export type UpUpProfileSchema = typeof upUpProfileSchema;
export type UpdateInfoShema = typeof updateInfoSchema;
export type UpdateEmailSchema = typeof updateEmailSchema;
export type UpdatePwdSchema = typeof updatePwdSchema;
