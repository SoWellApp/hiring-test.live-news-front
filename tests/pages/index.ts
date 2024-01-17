import { BasePage } from './base-page';
import { AuthPage } from './auth-page';
import { Page, BrowserContext } from 'playwright';

export class AllPagesObject {
  basePage: BasePage;
  authPage: AuthPage;

  constructor(public page: Page, public context: BrowserContext) {
    this.basePage = new BasePage(page, context);
    this.authPage = new AuthPage(page, context);
  }
}
