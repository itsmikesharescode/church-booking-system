import { z } from 'zod';
import type { BookingType, XenditCB } from '$lib/types';

export const churchSchema = z.object({
  id: z.number(),
  created_at: z.string(),
  name: z.string(),
  description: z.string(),
  open_time: z.string(),
  close_time: z.string(),
  photo_path: z.string(),
  price: z.number()
});

export type DashboardPageTable = z.output<typeof churchSchema>;
