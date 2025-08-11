'use client';

import { Settings, LogOut } from 'lucide-react';
import Link from 'next/link';
import { PropsWithChildren } from 'react';

import { Button } from '@shared/components/primitives/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@shared/components/primitives/dropdown-menu';
import { SidebarTrigger } from '@shared/components/primitives/sidebar';
import UserAvatar from '@shared/components/ui/user-avatar/user-avatar';
import { useAuth } from '@shared/contexts/auth-context';

export function Header({ children }: PropsWithChildren) {
  const { user, signout } = useAuth();

  const handleSignOut = () => {
    signout();
  };

  return (
    <header className="bg-background/60 sticky top-0 z-10 flex h-16 items-center justify-between space-x-2 border-b p-4 backdrop-blur-xl">
      <SidebarTrigger />
      <div className="flex-1">{children}</div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative size-8 rounded-full">
            <UserAvatar user={user} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-80" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">
                {user.firstName}
              </p>
              <p className="text-muted-foreground text-xs leading-none">
                {user.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <Link
                href="/settings/appearance"
                className="flex w-full items-center space-x-2.5"
              >
                <Settings className="size-4" />
                <p className="text-sm">Settings</p>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleSignOut}>
            <div className="flex w-full items-center space-x-2.5">
              <LogOut className="size-4" />
              <p className="text-sm">Sign out</p>
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
