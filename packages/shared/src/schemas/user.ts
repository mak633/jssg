import { z } from 'zod';

export const schema = z.object({
  firstName: z.string().min(1).max(128),
  lastName: z.string().min(1).max(128),
  email: z.string().email().min(2).max(1024),
});

export type Inputs = z.infer<typeof schema>;
