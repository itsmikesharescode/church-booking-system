import { z } from 'zod';

export const accountPageTable = z.object({
  user_id: z.string(),
  created_at: z.string(),
  role: z.string(),
  email: z.string().email(),
  title: z.string(),
  avatar: z.string(),
  approved: z.boolean(),
  fullName: z.string(),
  interests: z.array(z.string()),
  department: z.string(),
  previousSchool: z.string(),
  yearsInService: z.number(),
  preferredSchedule: z.object({
    day: z.string(),
    endTime: z.string(),
    available: z.string(),
    startTime: z.string()
  })
});

export type AccountPageTable = z.output<typeof accountPageTable>;
