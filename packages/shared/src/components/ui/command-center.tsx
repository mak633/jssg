'use client';

import router from 'next/router';
import { PropsWithChildren } from 'react';

import { SunIcon, MoonIcon } from '@shared/components/icons';
import { Button } from '@shared/components/primitives/button';
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
} from '@shared/components/primitives/command';
import { useGlobalCommand } from '@shared/hooks/use-global-command';

import { useTheme } from '../theme-provider';

import { NavSection } from './layout/sidebar';

type Props = {
  links: NavSection[];
  onInputValueChange?: (search: string) => void;
};

export function CommandCenter({
  children,
  onInputValueChange,
  links,
}: PropsWithChildren<Props>) {
  const { open, setOpen, runCommand } = useGlobalCommand();
  const { setColorMode } = useTheme();

  return (
    <>
      <Button
        variant="outline"
        className="text-muted-foreground flex w-auto flex-1 justify-between pr-1 md:w-[300px] md:flex-none"
        onClick={() => setOpen(true)}
      >
        <span>Search...</span>
        <kbd className="bg-muted h-5 rounded border px-1.5">/</kbd>
      </Button>
      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        commandProps={{
          filter(value, search) {
            if (
              value.toLowerCase().includes(search.toLowerCase()) ||
              value.includes('no_filter-')
            ) {
              return 1; // ensures items arent filtered
            }

            return 0;
          },
        }}
      >
        <CommandInput
          placeholder="Type a command or search..."
          onValueChange={onInputValueChange}
        />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Links">
            {links
              .map((x) => x.items)
              .flat()
              .filter((x) => 'url' in x)
              .map((link) => (
                <CommandItem
                  key={link.url}
                  onSelect={() => runCommand(() => router.push(link.url))}
                >
                  <span className="[&>svg]w-4 mr-2 [&>svg]:h-4">
                    {link.icon}
                  </span>
                  {link.title}
                </CommandItem>
              ))}
          </CommandGroup>

          {children}

          <CommandSeparator />

          <CommandGroup heading="Colour Mode">
            <CommandItem
              onSelect={() => runCommand(() => setColorMode('light'))}
            >
              <SunIcon className="mr-2 size-4" />
              Light
            </CommandItem>
            <CommandItem
              onSelect={() => runCommand(() => setColorMode('dark'))}
            >
              <MoonIcon className="mr-2 size-4" />
              Dark
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
