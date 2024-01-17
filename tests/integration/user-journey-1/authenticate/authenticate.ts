import { Given, When, Then } from '@cucumber/cucumber';
import { ICustomWorld } from '../../../support/custom-world';
import { expect } from '@playwright/test';

Given('User navigates to the application', async function (this: ICustomWorld) {
  await this.pagesObj!.authPage.goToAuthPage();
});

When(
  'I enter the username as {string}',
  async function (this: ICustomWorld, username: string) {
    await this.pagesObj!.authPage.getInput('username').fill(username);
  }
);

When(
  'I enter the password as {string}',
  async function (this: ICustomWorld, password: string) {
    await this.pagesObj!.authPage.getInput('password').fill(password);
  }
);

When('I click on login button', async function (this: ICustomWorld) {
  await this.pagesObj!.authPage.getBtn('submit').click();
});

Then(
  'The login button is {string}',
  async function (this: ICustomWorld, btnState) {
    const btn = this.pagesObj!.authPage.getBtn('submit');
    if (btnState === 'enabled') {
      await expect(btn!).toHaveClass(/q-btn--actionable/);
    } else {
      await expect(btn!).toHaveClass(/disabled/);
    }
  }
);

Then('User should logged in successfully', async function (this: ICustomWorld) {
  await expect(this.page!).toHaveURL(/init-synchronization/);
});
