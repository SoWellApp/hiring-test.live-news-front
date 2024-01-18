import { test as base } from 'playwright-bdd';
import { AuthPage } from './pages/auth-page';
import { PostsPage } from './pages/posts-page';
import { Store } from 'pinia';

declare const window: Window &
  typeof globalThis & {
    AuthStore: Store & { setConnectedUser: (username: string) => void };
  };

// export custom test function
export const test = base.extend<{
  pageObjects: { authPage: AuthPage; postsPage: PostsPage };
}>({
  pageObjects: async ({ page, context }, use) => {
    await use({
      authPage: new AuthPage(page, context),
      postsPage: new PostsPage(page, context),
    });
  },
});
