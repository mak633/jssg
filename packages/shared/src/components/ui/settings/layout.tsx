import { PropsWithChildren } from 'react';

import { SideNav } from './side-nav';

export function SettingsLayout({ children }: PropsWithChildren) {
  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
      <p className="text-muted-foreground">Manage your account settings.</p>
      <SideNav />

      <div className="mx-auto max-w-[80vw] justify-center">{children}</div>
    </div>
  );
}
