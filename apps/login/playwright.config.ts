import { defineConfig, devices } from '@playwright/test';
import defaultConfig from '@ui/shared/playwright.config.ts';

export default defineConfig({
  ...defaultConfig,
  use: {
    baseURL: 'http://localhost:2000',
  },

  projects: [
    {
      name: 'Google Chrome',
      use: {
        ...devices['Desktop Chrome'],
        channel: 'chrome',
      },
    },
    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
      },
    },
  ],
});
