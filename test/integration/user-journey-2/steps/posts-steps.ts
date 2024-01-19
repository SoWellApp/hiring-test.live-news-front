import { createBdd } from 'playwright-bdd';

import { test } from '../../../context';
import { Store } from 'pinia';

declare const window: Window &
  typeof globalThis & {
    AuthStore: Store & { setConnectedUser: (username: string) => void };
  };

// intercept ici

const { When } = createBdd(test);
When(
  'I navigate to the posts page',
  async ({ pageObjects: { postsPage }, postsFixture }) => {
    const request = {
      path: '*/**/api/posts/find?sort=updatedAt%20DESC',
    };
    // TODO: verifier le verbe et les headers d'auth
    // TODO: faire un exemple POST avec un payload

    const response = {
      status: 200,
      json: postsFixture,
    };

    await postsPage.page.route(request.path, async (route) => {
      route.fulfill(response);
    });
    await postsPage.goToPostsPage();
  }
);
