'use client';

import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';
import { z } from 'zod';

import { defaultThemePresets, themeSchema } from '@shared/lib/theme-utils';

type ThemeContextType = {
  theme: z.infer<typeof themeSchema>;
  setTheme: Dispatch<SetStateAction<z.infer<typeof themeSchema>>>;
  colorMode: 'light' | 'dark';
  setColorMode: Dispatch<SetStateAction<'light' | 'dark'>>;
  toggleColorMode: () => void;
};

const ThemeContext = createContext<ThemeContextType>({} as ThemeContextType);

type Props = {
  initialTheme?: z.infer<typeof themeSchema>;
  initialColorMode?: 'light' | 'dark';
};

export function ThemeProvider({
  children,
  initialTheme,
  initialColorMode,
}: PropsWithChildren<Props>) {
  const [theme, setTheme] = useState<z.infer<typeof themeSchema>>(
    initialTheme ?? defaultThemePresets['default']
  );

  const getSystemPreference = (): 'light' | 'dark' => {
    if (typeof window === 'undefined') return 'light';

    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  };

  const [colorMode, setColorMode] = useState<'light' | 'dark'>(
    initialColorMode ?? getSystemPreference()
  );

  useEffect(() => {
    const themeStyles = theme.styles[colorMode];

    Object.entries(themeStyles).forEach(([key, value]) => {
      document.documentElement.style.setProperty(`--${key}`, value);
    });
  }, [colorMode, theme]);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(colorMode);

    const cookie = `color-mode=${encodeURIComponent(colorMode)}; path=/`;
    document.cookie = cookie;
  }, [colorMode]);

  useEffect(() => {
    const cookie = `theme=${encodeURIComponent(JSON.stringify(theme))}; path=/`;
    document.cookie = cookie;
  }, [theme]);

  const toggleColorMode = () => {
    setColorMode(colorMode === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        colorMode,
        setColorMode,
        toggleColorMode,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = (): ThemeContextType => useContext(ThemeContext);
