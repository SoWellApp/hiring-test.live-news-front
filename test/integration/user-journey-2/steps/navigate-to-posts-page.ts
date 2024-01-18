import { expect } from '@playwright/test';
import { createBdd } from 'playwright-bdd';

import { test } from '../../../fixtures';
import { Store } from 'pinia';

declare const window: Window &
  typeof globalThis & {
    AuthStore: Store & { setConnectedUser: (username: string) => void };
  };

const { Given, When, Then } = createBdd(test);

Given(
  'I am authenticated as {string}',
  async ({ pageObjects }, username: string) => {
    const { postsPage } = pageObjects;
    await postsPage.goto();
    await postsPage.page.waitForSelector('h4.title');
    await postsPage.page.evaluate(
      (username: string) => window.AuthStore.setConnectedUser(username),
      username
    );
  }
);

When('I navigate to the posts page', async ({ pageObjects: { postsPage } }) => {
  await postsPage.goToPostsPage();
});

Then(
  'I can see {string} in the header title',
  async ({ pageObjects: { postsPage } }, title: string) => {
    await expect(postsPage.getHeaderTitle()).toContainText(new RegExp(title));
  }
);

Then(
  'I can see {string} in the header username',
  async ({ pageObjects: { postsPage } }, username: string) => {
    await expect(postsPage.getHeaderUsername()).toContainText(
      new RegExp(username)
    );
  }
);
