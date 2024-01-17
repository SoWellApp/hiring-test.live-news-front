import { BasePage } from './base-page';
export class AuthPage extends BasePage {
  public get elements() {
    return {
      title: 'h4.title',
      inputs: {
        username: 'input-username',
        password: 'input-password',
      },
      btns: {
        submit: 'btn-submit',
      },
    };
  }

  public async goToAuthPage() {
    await this.goto();
    return this.page.waitForSelector(this.elements.title);
  }

  public getInput(inputName: keyof typeof this.elements.inputs) {
    return this.page.getByTestId(this.elements.inputs[inputName]);
  }

  public getBtn(btnName: keyof typeof this.elements.btns) {
    return this.page.getByTestId(this.elements.btns[btnName]);
  }
}
