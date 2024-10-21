import { z } from 'zod';

const timeFormat = /^(0[1-9]|1[0-2]):[0-5][0-9] (AM|PM)$/;

export const reservationSchema = z.object({
  churchObj: z.string(),
  eventName: z.string().min(1, { message: 'Must enter event name.' }),
  guestCount: z.number().min(1, { message: 'Must enter number of guest.' }),
  clientNote: z.string().min(1, { message: 'Must enter client note.' }),
  dateIn: z.string().min(1, { message: 'Must enter a date.' }),
  initialTime: z.string().regex(timeFormat, { message: 'Must be in the format HH:MM AM/PM.' }),
  finalTime: z.string().regex(timeFormat, { message: 'Must be in the format HH:MM AM/PM.' })
});

export type ReservationSchema = typeof reservationSchema;
