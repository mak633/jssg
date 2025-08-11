'use client';

import { useEffect, useState } from 'react';

import { Label } from '@shared/components/primitives/label';
import {
  RadioGroup,
  RadioGroupItem,
} from '@shared/components/primitives/radio-group';
import { useTheme } from '@shared/components/theme-provider';
import { defaultThemePresets } from '@shared/lib/theme-utils';

export function AppearanceForm() {
  const [mounted, setMounted] = useState<boolean>(false);
  const { colorMode, setColorMode, setTheme, theme } = useTheme();

  const onColorModeChange = (theme: string) => {
    setColorMode(theme as 'light' | 'dark');
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  const changeThemePreset = (theme: keyof typeof defaultThemePresets) => {
    const styles = defaultThemePresets[theme] || defaultThemePresets.default;

    setTheme(styles);
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="space-y-8">
      <div className="space-y-1">
        <h1 className="text-sm font-medium leading-none">Colour Mode</h1>
        <p className="text-muted-foreground text-sm">
          Select the mode for the site.
        </p>
        <RadioGroup
          value={colorMode}
          onValueChange={onColorModeChange}
          className="grid grid-cols-1 gap-8 pt-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
        >
          <div className="space-y-2">
            <Label
              htmlFor="light"
              className="[&:has([data-state=checked])>div]:border-primary"
            >
              <RadioGroupItem value="light" id="light" className="sr-only" />
              <div className="border-muted hover:border-accent items-center rounded-md border-2 p-1">
                <div className="space-y-2 rounded-sm bg-[#ecedef] p-2">
                  <div className="space-y-2 rounded-md bg-white p-2 shadow-sm">
                    <div className="h-2 w-[80px] rounded-lg bg-[#ecedef]" />
                    <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                  </div>
                  <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
                    <div className="size-4 rounded-full bg-[#ecedef]" />
                    <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                  </div>
                  <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
                    <div className="size-4 rounded-full bg-[#ecedef]" />
                    <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                  </div>
                </div>
              </div>
              <span className="block w-full p-2 text-center font-normal">
                Light
              </span>
            </Label>
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="dark"
              className="[&:has([data-state=checked])>div]:border-primary"
            >
              <RadioGroupItem value="dark" id="dark" className="sr-only" />
              <div className="border-muted bg-popover hover:bg-accent hover:text-accent-foreground items-center rounded-md border-2 p-1">
                <div className="space-y-2 rounded-sm bg-slate-950 p-2">
                  <div className="space-y-2 rounded-md bg-slate-800 p-2 shadow-sm">
                    <div className="h-2 w-[80px] rounded-lg bg-slate-400" />
                    <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                  </div>
                  <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
                    <div className="size-4 rounded-full bg-slate-400" />
                    <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                  </div>
                  <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
                    <div className="size-4 rounded-full bg-slate-400" />
                    <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                  </div>
                </div>
              </div>
              <span className="block w-full p-2 text-center font-normal">
                Dark
              </span>
            </Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-1">
        <h1 className="text-sm font-medium leading-none">Theme presets</h1>
        <p className="text-muted-foreground text-sm">
          Select the theme&apos;s color for the site, or create your own below.
        </p>
        <RadioGroup
          value={theme.name}
          onValueChange={changeThemePreset}
          className="grid grid-cols-1 gap-8 pt-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
        >
          <div className="space-y-2">
            <Label
              htmlFor="default"
              className="[&:has([data-state=checked])>div]:border-primary"
            >
              <RadioGroupItem
                value="default"
                id="default"
                className="sr-only"
              />
              <div className="border-muted hover:border-accent items-center rounded-md border-2 p-1">
                <div className="space-y-2 rounded-sm bg-[#ecedef] p-2 dark:bg-[#020817]">
                  <div className="space-y-2 rounded-md bg-white p-2 shadow-sm dark:bg-slate-800">
                    <div className="h-2 w-[80px] rounded-lg bg-[#ecedef] dark:bg-slate-400" />
                    <div className="h-2 w-[100px] rounded-lg bg-[#ecedef] dark:bg-slate-400" />
                  </div>
                  <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm dark:bg-slate-800">
                    <div className="size-4 rounded-full bg-[#ecedef] dark:bg-slate-400" />
                    <div className="h-2 w-[100px] rounded-lg bg-[#ecedef] dark:bg-slate-400" />
                  </div>
                  <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm dark:bg-slate-800">
                    <div className="size-4 rounded-full bg-[#ecedef] dark:bg-slate-400" />
                    <div className="h-2 w-[100px] rounded-lg bg-[#ecedef] dark:bg-slate-400" />
                  </div>
                </div>
              </div>
              <span className="block w-full p-2 text-center font-normal">
                Default
              </span>
            </Label>
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="blue"
              className="[&:has([data-state=checked])>div]:border-primary"
            >
              <RadioGroupItem value="blue" id="blue" className="sr-only" />
              <div className="border-muted hover:border-accent items-center rounded-md border-2 p-1">
                <div className="space-y-2 rounded-sm bg-[#ecedef] p-2 dark:bg-[#020817]">
                  <div className="space-y-2 rounded-md bg-white p-2 shadow-sm dark:bg-[#1e293b]">
                    <div className="h-2 w-[80px] rounded-lg bg-[#3b82f6]" />
                    <div className="h-2 w-[100px] rounded-lg bg-[#3b82f6]" />
                  </div>
                  <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm dark:bg-[#1e293b]">
                    <div className="size-4 rounded-full bg-[#3b82f6]" />
                    <div className="h-2 w-[100px] rounded-lg bg-[#3b82f6]" />
                  </div>
                  <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm dark:bg-[#1e293b]">
                    <div className="size-4 rounded-full bg-[#3b82f6]" />
                    <div className="h-2 w-[100px] rounded-lg bg-[#3b82f6]" />
                  </div>
                </div>
              </div>
              <span className="block w-full p-2 text-center font-normal">
                Blue
              </span>
            </Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
}
