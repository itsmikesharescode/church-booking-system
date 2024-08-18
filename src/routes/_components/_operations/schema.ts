import { z } from 'zod';

export const reservationSchema = z.object({
	eventName: z.string().min(1, { message: 'Must enter event name.' }),
	guestCount: z.number().min(1, { message: 'Must enter number of guest.' }),
	clientNote: z.string().min(1, { message: 'Must enter client note.' }),
	dateIn: z.string().min(1, { message: 'Must enter a date.' }),
	initialTime: z.string().min(1, { message: 'Enter initial time.' }),
	finalTime: z.string().min(1, { message: 'Must enter final time.' })
});

export type ReservationSchema = typeof reservationSchema;
