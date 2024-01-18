import { expect } from '@playwright/test';
import { createBdd } from 'playwright-bdd';

import { test } from '../../../fixtures';

const { Given, When, Then } = createBdd(test);

Given(
  'User navigates to the application',
  async ({ pageObjects: { authPage } }) => {
    await authPage.goToAuthPage();
  }
);

When(
  'I enter the username as {string}',
  async ({ pageObjects: { authPage } }, username: string) => {
    await authPage.getInput('username').fill(username);
  }
);

When(
  'I enter the password as {string}',
  async ({ pageObjects: { authPage } }, password: string) => {
    await authPage.getInput('password').fill(password);
  }
);

When('I click on login button', async ({ pageObjects: { authPage } }) => {
  await authPage.getBtn('submit').click();
});

Then(
  'The login button is {string}',
  async ({ pageObjects: { authPage } }, btnState: string) => {
    const btn = authPage.getBtn('submit');
    if (btnState === 'enabled') {
      await expect(btn!).toHaveClass(/q-btn--actionable/);
    } else {
      await expect(btn!).toHaveClass(/disabled/);
    }
  }
);

Then('User should logged in successfully', async ({ page }) => {
  await expect(page).toHaveURL(/init-synchronization/);
});
