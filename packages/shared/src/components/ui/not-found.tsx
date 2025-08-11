'use client';

import { useRouter } from 'next/navigation';

import { Button } from '@shared/components/primitives/button';

export function NotFound() {
  const router = useRouter();

  return (
    <div className="space-y-4 text-center">
      <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200">
        Oops!
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-400">
        The page you&apos;re looking for was not found.
      </p>
      <Button onClick={router.back}>Go back</Button>
    </div>
  );
}
