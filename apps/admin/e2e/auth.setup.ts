import { test as setup } from '@playwright/test';

const authFile = '.playwright/.auth/user.json';

setup('authenticate', async ({ page }) => {
  await page.goto('/');

  await page
    .getByPlaceholder('name@example.com')
    .fill(process.env.PLAYWRIGHT_USER_EMAIL ?? '');
  await page.getByRole('button', { name: 'Sign In' }).click();

  await page
    .getByPlaceholder('Password')
    .fill(process.env.PLAYWRIGHT_USER_PASSWORD ?? '');
  await page.getByRole('button', { name: 'Sign in' }).click();

  const signIn = page.locator('#idSIButton9');
  await signIn.waitFor();
  await signIn.click();

  await page.context().storageState({ path: authFile });
});
