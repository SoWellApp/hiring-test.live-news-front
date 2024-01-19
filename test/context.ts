import { test as base } from 'playwright-bdd';
import { AuthPage } from './pages/auth-page';
import { PostsPage } from './pages/posts-page';
import { Store } from 'pinia';
import { Post } from 'src/types';
import { posts } from './fixtures/posts';
import { users } from './fixtures/users';

declare const window: Window &
  typeof globalThis & {
    AuthStore: Store & { setConnectedUser: (username: string) => void };
  };

// export custom test function
export const test = base.extend<{
  pageObjects: { authPage: AuthPage; postsPage: PostsPage };
  postsFixture: Post[];
}>({
  pageObjects: async ({ page, context }, use) => {
    await use({
      authPage: new AuthPage(page, context),
      postsPage: new PostsPage(page, context),
    });
  },
  postsFixture: async ({}, use) => {
    const populatedPosts: Post[] = posts.map((post) => {
      const author = users.find((user) => user.id === post.author);
      if (!author) throw 'Author not found';
      return {
        ...post,
        author,
      };
    });
    await use(populatedPosts);
  },
});
