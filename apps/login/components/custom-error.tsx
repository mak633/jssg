import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';

export function CustomError({ message }: { message: string }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const error = searchParams.get('error');

  useEffect(() => {
    if (error) {
      const url = new URL(window.location.href);
      url.searchParams.delete('error');
      window.history.replaceState({}, document.title, url);
    }
  }, [error, searchParams, router]);

  if (!error) return null;

  return <p className="text-red-500">{message}</p>;
}
