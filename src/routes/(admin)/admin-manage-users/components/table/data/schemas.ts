import { z } from 'zod';

export const userSchema = z.object({
  user_id: z.string(),
  created_at: z.string(),
  email: z.string(),
  client_name: z.string(),
  mobile_number: z.string(),
  gender: z.string(),
  birthdate: z.string()
});

export type ManageUserPageTable = z.output<typeof userSchema>;
