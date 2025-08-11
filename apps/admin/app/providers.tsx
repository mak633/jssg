'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { PropsWithChildren, useState } from 'react';
import { z } from 'zod';

import { ThemeProvider } from '@shared/components/theme-provider';
import { AuthProvider } from '@shared/contexts/auth-context';
import { themeSchema } from '@shared/lib/theme-utils';
import { User } from '@shared/types/user';

type Props = {
  user: User;
  initialTheme?: z.infer<typeof themeSchema>;
  initialColorMode?: 'light' | 'dark';
};

export function Providers({
  children,
  user,
  initialTheme,
  initialColorMode,
}: PropsWithChildren<Props>) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider user={user}>
        <ThemeProvider
          initialTheme={initialTheme}
          initialColorMode={initialColorMode}
        >
          {children}
        </ThemeProvider>
      </AuthProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
