import { z } from 'zod';

export const reservationSchema = z.object({
  user_id: z.string(),
  id: z.number(),
  created_at: z.string(),
  church_id: z.number(),
  event_name: z.string(),
  number_guest: z.number(),
  date: z.string(),
  initial_time: z.string(),
  final_time: z.string(),
  event_note: z.string(),
  price: z.number()
});

export type ReservationPageTable = z.output<typeof reservationSchema>;
