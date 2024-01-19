import { BasePage } from './base-page';
export class PostsPage extends BasePage {
  public get elements() {
    return {
      header: {
        title: 'header-title',
        username: 'header-username',
      },
      posts: {
        container: 'posts-container',
        item: (id: number) => `post-item-${id}`
      }
    };
  }

  public async goToPostsPage() {
    await this.goto('/posts');
    return this.page.getByTestId(this.elements.header.title);
  }

  public getHeaderTitle() {
    return this.page.getByTestId(this.elements.header.title);
  }

  public getHeaderUsername() {
    return this.page.getByTestId(this.elements.header.username);
  }

  public getPostsContainer() {
    return this.page.getByTestId(this.elements.posts.container)
  }

  public getPostItemById(id: number) {
    return this.page.getByTestId(this.elements.posts.item(id))
  }
  public getPostItems() {
    return this.getPostsContainer().locator('.post-card')
  }
}
