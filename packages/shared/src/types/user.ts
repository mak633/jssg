import { z } from 'zod';

import { BaseEntity } from '@shared/types/base';

export enum UserRole {
  Admin = 'admin',
  User = 'user',
}

export const userSchema = z.object({
  firstName: z.string().min(1).max(100),
  lastName: z.string().min(1).max(100),
  email: z.string().email(),
  password: z.string().min(1).max(100),
});

export type UserInputs = z.infer<typeof userSchema>;

export type User = UserInputs & BaseEntity & { role: UserRole; token: string };
