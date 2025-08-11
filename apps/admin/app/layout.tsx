import '@shared/globals.css';
import { Inter as FontSans } from 'next/font/google';
import { cookies } from 'next/headers';
import { PropsWithChildren, Suspense } from 'react';

import { LayoutGrid, Users } from '@shared/components/icons';
import { TopLoader } from '@shared/components/primitives/next-top-loader';
import { SidebarInset } from '@shared/components/primitives/sidebar';
import { Toaster } from '@shared/components/primitives/sonner';
import { Content } from '@shared/components/ui/layout/content';
import { Header } from '@shared/components/ui/layout/header';
import { Layout } from '@shared/components/ui/layout/layout';
import { AppSidebar, NavSection } from '@shared/components/ui/layout/sidebar';
import { dummyToken } from '@shared/lib/dummy-data';
import {
  defaultThemePresets,
  generateThemeCSS,
  themeSchema,
} from '@shared/lib/theme-utils';
import { cn, getUser } from '@shared/lib/utils';
import { ColorMode } from '@shared/types';

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

const sections: NavSection[] = [
  {
    title: 'Platform',
    items: [
      {
        title: 'Dashboard',
        icon: <LayoutGrid />,
        url: '/dashboard',
        'data-testid': 'menu-item-dashboard',
      },
    ],
  },
  {
    title: 'Admin',
    items: [
      {
        title: 'Users',
        url: '/users',
        icon: <Users />,
        'data-testid': 'menu-item-users',
      },
    ],
  },
];

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
          'bg-background min-h-screen font-sans antialiased',
          fontSans.variable
        )}
      >
        <Providers
          user={user}
          initialTheme={currentTheme}
          initialColorMode={colorMode}
        >
          <TopLoader />
          <Layout>
            <AppSidebar sections={sections} />
            <SidebarInset className="overflow-x-auto">
              <Header>
                <div className="flex items-center justify-end gap-2"></div>
              </Header>
              <Content>
                <Suspense>{children}</Suspense>
              </Content>
            </SidebarInset>
          </Layout>
          <Toaster richColors />
        </Providers>
      </body>
    </html>
  );
}
