import { z } from 'zod';

export function generateThemeCSS(
  theme: z.infer<typeof themeSchema>,
  mode: 'light' | 'dark'
) {
  const styles = theme.styles[mode] || theme.styles['light'];

  const vars = Object.entries(styles)
    .map(([key, value]) => `--${key}: ${value};`)
    .join('\n');

  return `
:root {
${vars}
}
`;
}

export type ThemeStyle = z.infer<typeof stylesSchema>;

export const stylesSchema = z
  .object({
    radius: z.string(),
    background: z.string(),
    foreground: z.string(),
    card: z.string(),
    'card-foreground': z.string(),
    popover: z.string(),
    'popover-foreground': z.string(),
    primary: z.string(),
    'primary-foreground': z.string(),
    secondary: z.string(),
    'secondary-foreground': z.string(),
    muted: z.string(),
    'muted-foreground': z.string(),
    accent: z.string(),
    'accent-foreground': z.string(),
    destructive: z.string(),
    'destructive-foreground': z.string(),
    border: z.string(),
    input: z.string(),
    ring: z.string(),
    sidebar: z.string(),
    'sidebar-foreground': z.string(),
    'sidebar-primary': z.string(),
    'sidebar-primary-foreground': z.string(),
    'sidebar-accent': z.string(),
    'sidebar-accent-foreground': z.string(),
    'sidebar-border': z.string(),
    'sidebar-ring': z.string(),
  })
  .strict();

export const themeStylesSchema = z.object({
  light: stylesSchema,
  dark: stylesSchema,
});

export const themeSchema = z.object({
  name: z.string(),
  styles: themeStylesSchema,
});

export const defaultThemePresets: Record<
  'default' | 'blue',
  z.infer<typeof themeSchema>
> = {
  default: {
    name: 'default',
    styles: {
      light: {
        radius: '0.625rem',
        background: 'oklch(1 0 0)',
        foreground: 'oklch(0.141 0.005 285.823)',
        card: 'oklch(1 0 0)',
        'card-foreground': 'oklch(0.141 0.005 285.823)',
        popover: 'oklch(1 0 0)',
        'popover-foreground': 'oklch(0.141 0.005 285.823)',
        primary: 'oklch(0.21 0.006 285.885)',
        'primary-foreground': 'oklch(0.985 0 0)',
        secondary: 'oklch(0.967 0.001 286.375)',
        'secondary-foreground': 'oklch(0.21 0.006 285.885)',
        muted: 'oklch(0.967 0.001 286.375)',
        'muted-foreground': 'oklch(0.552 0.016 285.938)',
        accent: 'oklch(0.967 0.001 286.375)',
        'accent-foreground': 'oklch(0.21 0.006 285.885)',
        destructive: 'oklch(0.577 0.245 27.325)',
        'destructive-foreground': 'oklch(0.577 0.245 27.325)',
        border: 'oklch(0.92 0.004 286.32)',
        input: 'oklch(0.92 0.004 286.32)',
        ring: 'oklch(0.705 0.015 286.067)',
        sidebar: 'oklch(0.985 0 0)',
        'sidebar-foreground': 'oklch(0.141 0.005 285.823)',
        'sidebar-primary': 'oklch(0.21 0.006 285.885)',
        'sidebar-primary-foreground': 'oklch(0.985 0 0)',
        'sidebar-accent': 'oklch(0.967 0.001 286.375)',
        'sidebar-accent-foreground': 'oklch(0.21 0.006 285.885)',
        'sidebar-border': 'oklch(0.92 0.004 286.32)',
        'sidebar-ring': 'oklch(0.705 0.015 286.067)',
      },
      dark: {
        radius: '0.625rem',
        background: 'oklch(0.141 0.005 285.823)',
        foreground: 'oklch(0.985 0 0)',
        card: 'oklch(0.21 0.006 285.885)',
        'card-foreground': 'oklch(0.985 0 0)',
        popover: 'oklch(0.21 0.006 285.885)',
        'popover-foreground': 'oklch(0.985 0 0)',
        primary: 'oklch(0.92 0.004 286.32)',
        'primary-foreground': 'oklch(0.21 0.006 285.885)',
        secondary: 'oklch(0.274 0.006 286.033)',
        'secondary-foreground': 'oklch(0.985 0 0)',
        muted: 'oklch(0.274 0.006 286.033)',
        'muted-foreground': 'oklch(0.705 0.015 286.067)',
        accent: 'oklch(0.274 0.006 286.033)',
        'accent-foreground': 'oklch(0.985 0 0)',
        destructive: 'oklch(0.704 0.191 22.216)',
        'destructive-foreground': 'oklch(0.637 0.237 25.331)',
        border: 'oklch(1 0 0 / 10%)',
        input: 'oklch(1 0 0 / 15%)',
        ring: 'oklch(0.552 0.016 285.938)',
        sidebar: 'oklch(0.21 0.006 285.885)',
        'sidebar-foreground': 'oklch(0.985 0 0)',
        'sidebar-primary': 'oklch(0.488 0.243 264.376)',
        'sidebar-primary-foreground': 'oklch(0.985 0 0)',
        'sidebar-accent': 'oklch(0.274 0.006 286.033)',
        'sidebar-accent-foreground': 'oklch(0.985 0 0)',
        'sidebar-border': 'oklch(1 0 0 / 10%)',
        'sidebar-ring': 'oklch(0.552 0.016 285.938)',
      },
    },
  },
  blue: {
    name: 'blue',
    styles: {
      light: {
        radius: '0.65rem',
        background: 'oklch(1 0 0)',
        foreground: 'oklch(0.141 0.005 285.823)',
        card: 'oklch(1 0 0)',
        'card-foreground': 'oklch(0.141 0.005 285.823)',
        popover: 'oklch(1 0 0)',
        'popover-foreground': 'oklch(0.141 0.005 285.823)',
        primary: 'oklch(0.623 0.214 259.815)',
        'primary-foreground': 'oklch(0.97 0.014 254.604)',
        secondary: 'oklch(0.967 0.001 286.375)',
        'secondary-foreground': 'oklch(0.21 0.006 285.885)',
        muted: 'oklch(0.967 0.001 286.375)',
        'muted-foreground': 'oklch(0.552 0.016 285.938)',
        accent: 'oklch(0.967 0.001 286.375)',
        'accent-foreground': 'oklch(0.21 0.006 285.885)',
        destructive: 'oklch(0.577 0.245 27.325)',
        'destructive-foreground': 'oklch(0.577 0.245 27.325)',
        border: 'oklch(0.92 0.004 286.32)',
        input: 'oklch(0.92 0.004 286.32)',
        ring: 'oklch(0.623 0.214 259.815)',

        sidebar: 'oklch(0.985 0 0)',
        'sidebar-foreground': 'oklch(0.141 0.005 285.823)',
        'sidebar-primary': 'oklch(0.623 0.214 259.815)',
        'sidebar-primary-foreground': 'oklch(0.97 0.014 254.604)',
        'sidebar-accent': 'oklch(0.967 0.001 286.375)',
        'sidebar-accent-foreground': 'oklch(0.21 0.006 285.885)',
        'sidebar-border': 'oklch(0.92 0.004 286.32)',
        'sidebar-ring': 'oklch(0.623 0.214 259.815)',
      },
      dark: {
        radius: '0.65rem',
        background: 'oklch(0.141 0.005 285.823)',
        foreground: 'oklch(0.985 0 0)',
        card: 'oklch(0.21 0.006 285.885)',
        'card-foreground': 'oklch(0.985 0 0)',
        popover: 'oklch(0.21 0.006 285.885)',
        'popover-foreground': 'oklch(0.985 0 0)',
        primary: 'oklch(0.546 0.245 262.881)',
        'primary-foreground': 'oklch(0.379 0.146 265.522)',
        secondary: 'oklch(0.274 0.006 286.033)',
        'secondary-foreground': 'oklch(0.985 0 0)',
        muted: 'oklch(0.274 0.006 286.033)',
        'muted-foreground': 'oklch(0.705 0.015 286.067)',
        accent: 'oklch(0.274 0.006 286.033)',
        'accent-foreground': 'oklch(0.985 0 0)',
        destructive: 'oklch(0.704 0.191 22.216)',
        'destructive-foreground': 'oklch(0.637 0.237 25.331)',
        border: 'oklch(1 0 0 / 10%)',
        input: 'oklch(1 0 0 / 15%)',
        ring: 'oklch(0.488 0.243 264.376)',
        sidebar: 'oklch(0.21 0.006 285.885)',
        'sidebar-foreground': 'oklch(0.985 0 0)',
        'sidebar-primary': 'oklch(0.546 0.245 262.881)',
        'sidebar-primary-foreground': 'oklch(0.379 0.146 265.522)',
        'sidebar-accent': 'oklch(0.274 0.006 286.033)',
        'sidebar-accent-foreground': 'oklch(0.985 0 0)',
        'sidebar-border': 'oklch(1 0 0 / 10%)',
        'sidebar-ring': 'oklch(0.488 0.243 264.376)',
      },
    },
  },
};

export const colorGroups = [
  {
    name: 'Primary Colours',
    colors: [
      { name: 'Primary', id: 'primary' },
      { name: 'Primary Foreground', id: 'primary-foreground' },
    ],
  },
  {
    name: 'Secondary Colours',
    colors: [
      { name: 'Secondary', id: 'secondary' },
      { name: 'Secondary Foreground', id: 'secondary-foreground' },
    ],
  },
  {
    name: 'Accent Colours',
    colors: [
      { name: 'Accent', id: 'accent' },
      { name: 'Accent Foreground', id: 'accent-foreground' },
    ],
  },
  {
    name: 'Base Colours',
    colors: [
      { name: 'Background', id: 'background' },
      { name: 'Foreground', id: 'foreground' },
    ],
  },
  {
    name: 'Card Colours',
    colors: [
      { name: 'Card Background', id: 'card' },
      { name: 'Card Foreground', id: 'card-foreground' },
    ],
  },
  {
    name: 'Popover Colours',
    colors: [
      { name: 'Popover Background', id: 'popover' },
      { name: 'Popover Foreground', id: 'popover-foreground' },
    ],
  },
  {
    name: 'Muted Colours',
    colors: [
      { name: 'Muted', id: 'muted' },
      { name: 'Muted Foreground', id: 'muted-foreground' },
    ],
  },
  {
    name: 'Destructive Colours',
    colors: [
      { name: 'Destructive', id: 'destructive' },
      { name: 'Destructive Foreground', id: 'destructive-foreground' },
    ],
  },
  {
    name: 'Border & Input Colours',
    colors: [
      { name: 'Border', id: 'border' },
      { name: 'Input', id: 'input' },
      { name: 'Ring', id: 'ring' },
    ],
  },
  {
    name: 'Sidebar Colours',
    colors: [
      { name: 'Sidebar Background', id: 'sidebar' },
      { name: 'Sidebar Foreground', id: 'sidebar-foreground' },
      { name: 'Sidebar Primary', id: 'sidebar-primary' },
      { name: 'Sidebar Primary Foreground', id: 'sidebar-primary-foreground' },
      { name: 'Sidebar Accent', id: 'sidebar-accent' },
      { name: 'Sidebar Accent Foreground', id: 'sidebar-accent-foreground' },
      { name: 'Sidebar Border', id: 'sidebar-border' },
      { name: 'Sidebar Ring', id: 'sidebar-ring' },
    ],
  },
] as const;
