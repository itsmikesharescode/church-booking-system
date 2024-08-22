import { z } from 'zod';

export const updateStatusEventSchema = z.object({
	eventObj: z.string().min(1, { message: 'Must have event obj' }),
	status: z.string().min(1, { message: 'Must choose status.' })
});

export type UpdateStatusEventSchema = typeof updateStatusEventSchema;
