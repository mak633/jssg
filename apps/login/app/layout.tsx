import '@shared/globals.css';
import { Inter as FontSans } from 'next/font/google';
import { cookies } from 'next/headers';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { PropsWithChildren } from 'react';

import { Toaster } from '@shared/components/primitives/sonner';
import { ThemeToggle } from '@shared/components/ui/theme-toggle';
import { dummyTokenPath } from '@shared/lib/dummy-data';
import {
  defaultThemePresets,
  generateThemeCSS,
  themeSchema,
} from '@shared/lib/theme-utils';
import { cn } from '@shared/lib/utils';
import { ColorMode } from '@shared/types/base';

import { TermsOfUse } from '@/components/term-of-use';
import { environment } from '@/environment';

import { Providers } from './providers';

import type { Metadata } from 'next';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'Sign into your account',
};

export default async function RootLayout({
  children,
}: Readonly<PropsWithChildren>) {
  const cookieStore = await cookies();
  const cookieToken = cookieStore.get(dummyTokenPath);

  if (cookieToken) {
    if (cookieToken.value.includes('dummyUserJWT')) {
      redirect(environment.PORTAL_UI_BASE_URL);
    }
    if (cookieToken.value.includes('dummyAdminJWT')) {
      redirect(environment.ADMIN_UI_BASE_URL);
    }
  }

  const theme = cookieStore.get('theme')?.value;
  const colorMode = cookieStore.get('color-mode')?.value as ColorMode;

  const parsedTheme = themeSchema.safeParse(JSON.parse(theme ?? '{}'));

  const currentTheme = parsedTheme.success
    ? parsedTheme.data
    : defaultThemePresets['default'];

  const css = generateThemeCSS(currentTheme, colorMode ?? 'light');

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <style dangerouslySetInnerHTML={{ __html: css }} />
      </head>
      <body
        className={cn(
          'bg-background min-h-screen bg-cover bg-center font-sans antialiased',
          'bg-[url(https://wealth.jsafrasarasin.com/public/assets/bjss/assets/images/08.jpg)]',
          fontSans.variable
        )}
      >
        <Providers initialTheme={currentTheme} initialColorMode={colorMode}>
          <div className="absolute flex w-full items-center justify-between p-6">
            <ThemeToggle />
          </div>
          <div className="-z-1 absolute top-12 flex w-full items-center justify-center">
            <Image
              src="https://wealth.jsafrasarasin.com/public/assets/bjss/assets/images/bjss-theme-logo.svg"
              alt="J. Safra Sarasin logo"
              width="240"
              height="96"
            />
          </div>
          <div className="flex h-screen w-full flex-col items-center justify-between p-4">
            <div className="rounded-4xl bg-background my-auto w-full max-w-lg p-6 md:p-12">
              {children}
            </div>
            <TermsOfUse />
          </div>
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
