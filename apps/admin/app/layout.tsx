import '@shared/globals.css';
import { Inter as FontSans } from 'next/font/google';
import { cookies } from 'next/headers';
import { PropsWithChildren, Suspense } from 'react';

import {
  FileQuestionIcon,
  LayoutGridIcon,
  UsersIcon,
} from '@shared/components/icons';
import { TopLoader } from '@shared/components/primitives/next-top-loader';
import { SidebarInset } from '@shared/components/primitives/sidebar';
import { Content } from '@shared/components/ui/layout/content';
import { Header } from '@shared/components/ui/layout/header';
import { Layout } from '@shared/components/ui/layout/layout';
import { AppSidebar, NavSection } from '@shared/components/ui/layout/sidebar';
import { dummyTokenPath, dummyUsersRecord } from '@shared/lib/dummy-data';
import {
  defaultThemePresets,
  generateThemeCSS,
  themeSchema,
} from '@shared/lib/theme-utils';
import { cn, getUser } from '@shared/lib/utils';
import { ColorMode } from '@shared/types/base';

import { environment } from '@/environment';

import { Providers } from './providers';

import type { Metadata } from 'next';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'Admin',
};

const sections: NavSection[] = [
  {
    title: 'Platform',
    items: [
      {
        title: 'Dashboard',
        icon: <LayoutGridIcon />,
        url: '/dashboard',
        'data-testid': 'menu-item-dashboard',
      },
    ],
  },
  {
    title: 'Admin',
    items: [
      {
        title: 'Quiz',
        url: '/quiz',
        icon: <FileQuestionIcon />,
        'data-testid': 'menu-item-quiz',
      },
      {
        title: 'Users',
        url: '/users',
        icon: <UsersIcon />,
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
  const token = cookieStore.get(dummyTokenPath)?.value ?? '';
  const cookiesUsers = cookieStore.get(dummyUsersRecord)?.value ?? '';
  const users = JSON.parse(cookiesUsers || '[]');

  const user = await getUser(token, environment.LOGIN_UI_BASE_URL, users, true);

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
        </Providers>
      </body>
    </html>
  );
}
