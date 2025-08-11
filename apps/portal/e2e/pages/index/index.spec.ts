import { test, expect } from '@playwright/test';

test.describe('Dashboard', () => {
  test('should have welcome to Portal text', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByText('Welcome to the Portal')).toBeVisible();
  });
});
