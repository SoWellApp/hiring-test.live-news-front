import { createBdd } from 'playwright-bdd';
import { Store } from 'pinia';
import { expect } from '@playwright/test';
import { test } from '../../../../context';
import { DataTable } from '@cucumber/cucumber';

declare const window: Window &
  typeof globalThis & {
    AuthStore: Store & { setConnectedUser: (username: string) => void };
  };

const { Then } = createBdd(test);

Then(
  'I can see a the following posts:',
  async ({ pageObjects }, table: DataTable) => {
    const rows = table.hashes();
    await expect(pageObjects.postsPage.getPostItems()).toHaveCount(9);
    rows.forEach(async (row) => {
      await expect(
        pageObjects.postsPage.getPostItems().filter({ hasText: row.title })
      ).toBeVisible();
    });
  }
);
