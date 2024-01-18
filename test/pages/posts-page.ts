import { BasePage } from './base-page';
export class PostsPage extends BasePage {
  public get elements() {
    return {
      header: {
        title: 'header-title',
        username: 'header-username',
      },
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
}
