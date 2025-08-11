import { cookies } from 'next/headers';
import { PropsWithChildren } from 'react';

import { SidebarProvider } from '@shared/components/primitives/sidebar';
import { TooltipProvider } from '@shared/components/primitives/tooltip';

export async function Layout({ children }: PropsWithChildren) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get('sidebar_state')?.value === 'true';

  return (
    <TooltipProvider delayDuration={0}>
      <SidebarProvider defaultOpen={defaultOpen}>{children}</SidebarProvider>
    </TooltipProvider>
  );
}
