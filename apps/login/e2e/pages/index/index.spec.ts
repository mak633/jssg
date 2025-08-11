import { test, expect } from '@playwright/test';

test.describe('Login page', () => {
  test('should have email input', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByRole('textbox', { name: 'email' })).toBeVisible();
  });
});
