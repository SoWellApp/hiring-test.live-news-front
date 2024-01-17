import { test as base } from 'playwright-bdd';
import { AuthPage } from './pages/auth-page';
// export custom test function
export const test = base.extend<{ pageObjects: { authPage: AuthPage } }>({
  pageObjects: async ({ page, context }, use) => {
    await use({
      authPage: new AuthPage(page, context),
    });
  },
});
