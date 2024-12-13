import { z } from 'zod';

export const requestCertificateSchema = z.object({
  id: z.number(),
  date: z.string().min(1, { message: 'Must enter a date.' }),
  certificateName: z.string().min(1, { message: 'Must select a certificate.' })
});

export type RequestCertificateSchema = typeof requestCertificateSchema;
