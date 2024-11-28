import { z } from 'zod';
import type { BookingType, ChurchType, UserProfile, XenditCB } from '$lib/types';

export const eventReservationSchema = z.object({
  id: z.number(),
  created_at: z.string(),
  status: z.string(),
  price: z.number(),
  preview: z.string(),
  client_name: z.string(),
  event_name: z.string(),
  event_note: z.string(),
  date: z.string(),
  number_of_guests: z.number(),
  user_meta_data: z.custom<UserProfile>(),
  church_data: z.custom<ChurchType>()
});

export type EventReservationPageTable = z.output<typeof eventReservationSchema>;
