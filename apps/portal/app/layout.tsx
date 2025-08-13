import '@shared/globals.css';

import { Inter as FontSans } from 'next/font/google';
import { cookies } from 'next/headers';
import { PropsWithChildren } from 'react';

import { ScrollArea } from '@shared/components/primitives/scroll-area';
import { Toaster } from '@shared/components/primitives/sonner';
import { ThemeToggle } from '@shared/components/ui/theme-toggle';
import { dummyToken } from '@shared/lib/dummy-data';
import {
  defaultThemePresets,
  generateThemeCSS,
  themeSchema,
} from '@shared/lib/theme-utils';
import { cn, getUser } from '@shared/lib/utils';
import { ColorMode } from '@shared/types';

import { HeaderLogo } from '@/components/header-logo';
import { environment } from '@/environment';

import { Providers } from './providers';

import type { Metadata } from 'next';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'Portal',
};

export default async function RootLayout({
  children,
}: Readonly<PropsWithChildren>) {
  const cookieStore = await cookies();

  const theme = cookieStore.get('theme')?.value;
  const colorMode = cookieStore.get('color-mode')?.value as ColorMode;
  const token = cookieStore.get(dummyToken)?.value ?? '';

  const user = await getUser(token, environment.LOGIN_UI_BASE_URL);

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
          'bg-background min-h-screen w-full bg-cover bg-center font-sans antialiased',
          'bg-[url(https://wealth.jsafrasarasin.com/public/assets/bjss/assets/images/08.jpg)]',
          fontSans.variable
        )}
      >
        <Providers
          user={user}
          initialTheme={currentTheme}
          initialColorMode={colorMode}
        >
          <div className="absolute flex w-full items-center justify-between p-6">
            <ThemeToggle />
          </div>
          <HeaderLogo />
          <main className="flex h-screen w-full flex-col items-center justify-center px-4 pb-4 pt-16">
            <div className="rounded-4xl max-h-200 size-full max-w-4xl overflow-hidden bg-white">
              <ScrollArea className="size-full p-8">{children}</ScrollArea>
            </div>
          </main>
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
