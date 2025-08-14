import { test, expect } from '@playwright/test';

test.describe('Dashboard', () => {
  test('should have welcome text', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByText('Welcome to the Admin')).toBeVisible();
  });
});
