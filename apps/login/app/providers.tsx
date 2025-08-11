'use client';

import '../utils/config/i18n';

import { PropsWithChildren } from 'react';
import { CookiesProvider } from 'react-cookie';
import { z } from 'zod';

import { ThemeProvider } from '@shared/components/theme-provider';
import { themeSchema } from '@shared/lib/theme-utils';

type Props = {
  initialTheme?: z.infer<typeof themeSchema>;
  initialColorMode?: 'light' | 'dark';
};

export function Providers({
  children,
  initialTheme,
  initialColorMode,
}: PropsWithChildren<Props>) {
  return (
    <CookiesProvider>
      <ThemeProvider
        initialTheme={initialTheme}
        initialColorMode={initialColorMode}
      >
        {children}
      </ThemeProvider>
    </CookiesProvider>
  );
}
