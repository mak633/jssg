import { Button } from "@shared/components/primitives/button";
import { useAuth } from "@shared/contexts/auth-context";
import { LogOut } from "lucide-react";
import UserAvatar from "./user-avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@shared/components/primitives/dropdown-menu";

export const UserMenu = () => {
  const { user, signout } = useAuth();

  const handleSignOut = () => {
    signout();
  };

  return (
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
          <DropdownMenuItem onClick={handleSignOut}>
            <div className="flex w-full items-center space-x-2.5">
              <LogOut className="size-4" />
              <p className="text-sm">Sign out</p>
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      )
};