import { expect } from '@playwright/test';
import { createBdd } from 'playwright-bdd';

import { test } from '../../../../context';
import { Store } from 'pinia';

declare const window: Window &
  typeof globalThis & {
    AuthStore: Store & { setConnectedUser: (username: string) => void };
  };

const { Then } = createBdd(test);

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
