import { PropsWithChildren } from 'react';

import { SettingsLayout } from '@shared/components/ui/settings/layout';

export default function Layout({ children }: PropsWithChildren) {
  return <SettingsLayout>{children}</SettingsLayout>;
}
