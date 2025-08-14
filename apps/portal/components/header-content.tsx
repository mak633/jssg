'use client';

import { ThemeToggle } from '@shared/components/ui/theme-toggle';
import { UserMenu } from '@shared/components/ui/user/user-menu';

export function HeaderContent() {
  return (
          <div className="absolute flex w-full items-center justify-between p-6">
            <ThemeToggle />
            <UserMenu />
          </div>
  );
}
