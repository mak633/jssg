import { clsx, type ClassValue } from 'clsx';
import { redirect } from 'next/navigation';
import { twMerge } from 'tailwind-merge';

import { dummyUsers } from './dummy-data';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function getUser(token: string, redirectUri: string) {
  const user = dummyUsers.find((u) => u.token === token);

  if (user) {
    return user;
  } else {
    redirect(redirectUri);
  }
};

export const formatDate = (date?: Date) =>
  date &&
  date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
