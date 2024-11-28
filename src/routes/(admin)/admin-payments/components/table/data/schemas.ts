import { z } from 'zod';
import type { BookingType, XenditCB } from '$lib/types';

export const paymentSchema = z.object({
  id: z.number(),
  created_at: z.string(),
  user_id: z.string(),
  ref_id: z.string(),
  method: z.string(),
  amount: z.number(),
  xendit_callback: z.custom<XenditCB>(),
  booking_obj: z.custom<BookingType>()
});

export type PaymentsPageTable = z.output<typeof paymentSchema>;
