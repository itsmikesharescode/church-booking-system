import { z } from 'zod';

const timeFormat = /^(0[1-9]|1[0-2]):[0-5][0-9] (AM|PM)$/;

export const addChurchSchema = z.object({
  price: z.number().min(1, { message: 'Must enter church price.' }),
  name: z.string().min(1, { message: 'Must enter church name.' }),
  description: z.string().min(5, { message: 'Must enter church description.' }),
  openT: z.string().regex(timeFormat, { message: 'Must be in the format HH:MM AM/PM.' }),
  closeT: z.string().regex(timeFormat, { message: 'Must be in the format HH:MM AM/PM.' }),
  photo: z
    .instanceof(File, { message: 'Please upload a file.' })
    .refine((f) => f.size < 2_000_000, 'Max 2 MB upload size.')
});

export type AddChurchSchema = typeof addChurchSchema;
