import { z } from 'zod';

export const approveSchema = z.object({
  bookId: z.number(),
  price: z.number().refine((v) => v > 1, { message: 'Must enter a valid price.' })
});

export type ApproveSchema = typeof approveSchema;
