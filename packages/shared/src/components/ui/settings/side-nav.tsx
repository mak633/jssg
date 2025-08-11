'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@shared/lib/utils';

export function SideNav() {
  const pathname = usePathname();

  return (
    <nav className="border-border mb-6 flex space-x-8 border-b">
      <Link
        href="/settings/appearance"
        className={cn(
          'hover:text-foreground flex items-center gap-2 whitespace-nowrap border-b-2 px-1 py-4 text-sm font-medium transition-colors',
          pathname === '/settings/appearance'
            ? 'border-primary text-primary'
            : 'text-muted-foreground border-transparent hover:border-gray-300'
        )}
      >
        Appearance
      </Link>

      <Link
        href="/settings/profile"
        className={cn(
          'hover:text-foreground flex items-center gap-2 whitespace-nowrap border-b-2 px-1 py-4 text-sm font-medium transition-colors',
          pathname === '/settings/profile'
            ? 'border-primary text-primary'
            : 'text-muted-foreground border-transparent hover:border-gray-300'
        )}
      >
        Profile
      </Link>
    </nav>
  );
}
