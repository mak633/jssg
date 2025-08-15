import { clsx, type ClassValue } from 'clsx';
import { redirect } from 'next/navigation';
import { twMerge } from 'tailwind-merge';

import { User, UserRole } from '@shared/types/user';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function getUser(
  token: string,
  redirectUri: string,
  users: User[],
  isAdmin?: boolean
) {
  const user = users.find((u) => u.token === token);

  if (user && !(isAdmin && user.role !== UserRole.Admin)) {
    return user;
  } else {
    redirect(redirectUri);
  }
}

export const formatDate = (date?: Date) =>
  date &&
  date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
