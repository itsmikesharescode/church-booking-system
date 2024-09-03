import { z } from 'zod';

const timeFormat = /^(0[1-9]|1[0-2]):[0-5][0-9] (AM|PM)$/;

export const upChSchema = z.object({
	chName: z.string().min(1, { message: 'Must enter church name.' }),
	description: z.string().min(5, { message: 'Must enter church description.' }),
	date: z.string(),
	openT: z.string().regex(timeFormat, { message: 'Must be in the format HH:MM AM/PM.' }),
	closeT: z.string().regex(timeFormat, { message: 'Must be in the format HH:MM AM/PM.' }),
	chPhoto: z
		.instanceof(File, { message: 'Please upload a file.' })
		.refine((f) => f.size < 200_000_000, 'Max 200 MB upload size.')
});

export type UpChSchema = typeof upChSchema;
