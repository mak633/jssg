'use client';

import { PropsWithChildren } from 'react';

import { SidebarTrigger } from '@shared/components/primitives/sidebar';

import { UserMenu } from '../user/user-menu';

export function Header({ children }: PropsWithChildren) {
  return (
    <header className="bg-background/60 sticky top-0 z-10 flex h-16 items-center justify-between space-x-2 border-b p-4 backdrop-blur-xl">
      <SidebarTrigger />
      <div className="flex-1">{children}</div>
      <UserMenu />
    </header>
  );
}
