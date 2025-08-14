import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1).max(100),
});

export type LoginInputs = z.infer<typeof loginSchema>;
