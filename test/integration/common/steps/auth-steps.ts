import { createBdd } from 'playwright-bdd';

import { test } from '../../../context';
import { Store } from 'pinia';

declare const window: Window &
  typeof globalThis & {
    AuthStore: Store & { setConnectedUser: (username: string) => void };
  };

const { Given } = createBdd(test);

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
