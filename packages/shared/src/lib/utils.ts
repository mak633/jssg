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
}

export const convertLocalToUTCDate = (date?: Date) => {
  if (!date) {
    return;
  }
  date = new Date(date);
  date = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
  );

  return date;
};

export const convertUTCToLocalDate = (date?: Date | null) => {
  if (!date) {
    return;
  }
  date = new Date(date);
  date = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());

  return date;
};

export const formatDate = (date?: Date) =>
  date &&
  date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

export const formatDateTime = (date?: Date) => {
  if (!date) {
    return '';
  }
  const formattedDate = date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  const formattedTime = date.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
    timeZone: 'UTC',
  });

  return `${formattedDate} ${formattedTime} GMT`;
};
