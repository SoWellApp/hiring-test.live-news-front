import { config } from '../support/config';
import { Page, BrowserContext } from 'playwright';
import { join } from 'path';

export class BasePage {
  page: Page;
  context: BrowserContext;

  constructor(page: Page, context: BrowserContext) {
    this.page = page;
    this.context = context;
  }

  public goto(optionalUrl?: string) {
    const pageToGoTo = optionalUrl
      ? (config.APP_URL += optionalUrl)
      : config.APP_URL;

    return this.page.goto(pageToGoTo);
  }

  public screenshot(name: string): Promise<Buffer> | undefined {
    return this.page.screenshot({ path: join('screenshots', `${name}.png`) });
  }
}
