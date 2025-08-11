import { defineConfig } from '@playwright/test';
import defaultConfig from '@ui/shared/playwright.config.ts';

export default defineConfig({
  ...defaultConfig,
  use: {
    baseURL: 'http://localhost:2002',
  },
});
