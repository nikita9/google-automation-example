import { Fragment } from '../fragment/fragment.wrapper';
import { $, browser, ExpectedConditions } from 'protractor';
import { Constants } from '../constants';
import * as fs from 'fs';

export class SignIn {
  private readonly signInButton: Fragment;
  private readonly emailField: Fragment;
  private readonly passwordField: Fragment;
  private readonly sendSMSField: Fragment;
  private readonly nextButton: Fragment;
  private readonly nextButtonPassword: Fragment;
  private readonly sendMessageButton: Fragment;
  private readonly contactField: Fragment;
  private readonly messageField: Fragment;
  private readonly sendButton: Fragment;
  private readonly messageImg: Fragment;
  private readonly phoneField: Fragment;

  constructor() {
    this.signInButton = new Fragment($('[class="signUpLink"]'));
    this.emailField = new Fragment($('[type="email"]'));
    this.passwordField = new Fragment($('[type="password"]'));
    this.sendSMSField = new Fragment($('[data-sendmethod="SMS"]'));
    this.nextButton = new Fragment($('[id="identifierNext"]'));
    this.nextButtonPassword = new Fragment($('[id="passwordNext"]'));
    this.sendMessageButton = new Fragment($('div > div[gv-test-id="send-new-message"] > div > md-icon'));
    this.contactField = new Fragment($('div > input[aria-owns="contact-list"]'));
    this.messageField = new Fragment($('md-input-container > textarea[ng-disabled="ctrl.isSendSmsDisabled()"]'));
    this.sendButton = new Fragment($('gv-icon-button[icon-name="send"] > button[ng-click="ctrl.onClick($event)"]'));
    this.messageImg = new Fragment($('gv-nav-item-icon[md-labeled-by-tooltip="md-tooltip-1"] > md-icon'));
    this.phoneField = new Fragment($('input[type="tel"]'));
    // this.messageImg = new Fragment($('gv-nav-item-icon[md-labeled-by-tooltip="md-tooltip-1"] > md-icon'));
  }

  public async clickLogin(): Promise<void> {
    await this.signInButton.clickOn();
  }

  public async typeEmail(): Promise<void> {
    await this.emailField.clickOn();
    await this.emailField.type(Constants.email);
    await this.emailField.submit();
  }

  public async typePassword(): Promise<void> {
    await this.passwordField.type(Constants.password);
    await this.passwordField.submit();
  }

  public async clickSendMessage(): Promise<void> {
    await browser.wait(ExpectedConditions.visibilityOf(this.sendMessageButton));
    await browser.actions().mouseMove(this.sendMessageButton).click().perform();
    await this.sendMessageButton.click();
  }

  public async typeContacts(numbers: string): Promise<void> {
    // await this.contactField.sendKeys(numbers);
    await this.contactField.sendKeys(numbers + ';');
  }

  public async typeMessage(text: string): Promise<void> {
    await this.messageField.type(text);
  }

  public async sendMessage(): Promise<void> {
    await browser.wait(ExpectedConditions.visibilityOf(this.sendButton));
    await browser.actions().mouseMove(this.sendButton).click().perform();
    await this.sendButton.clickOn();
  }

  public async typePhone(): Promise<void> {
    try {
    // await browser.wait(ExpectedConditions.visibilityOf(this.sendButton));
    // await browser.actions().mouseMove(this.sendButton).click().perform();
      await this.phoneField.clickOn();
      await this.phoneField.type(Constants.phone);
      await this.phoneField.submit();
    } catch (e) {
      throw new Error(`There is no phone field ${e}`);
    }
  }

  public async listOfNumebrs(): Promise<void> {
    const numbers: object = Constants.numbers;
    for (const i in numbers) {
      if (numbers.hasOwnProperty(i)) {
        await this.clickSendMessage();
        try {
          await this.typeContacts(numbers[i]);
        } catch (e) {
          throw new Error(`There is no phone field ${e}`);
        }
        await this.typeMessage('test');
        await this.screenshot('777.png');
        await this.sendMessage();
        await this.screenshot('999.png');
      }
    }
  }

  public async screenshot(name: string): Promise<void> {
    const screen = await browser.takeScreenshot();
    const stream = fs.createWriteStream(name);
    stream.write(new Buffer(screen, 'base64'));
    stream.end();
  }

  public async clickOnImgMessage(): Promise<void> {
    await browser.wait(ExpectedConditions.visibilityOf(this.messageImg));
    // await browser.actions().mouseMove(this.messageImg).click().perform();
    await browser.executeScript('document.querySelector(\'gv-nav-item-icon[md-labeled-by-tooltip="md-tooltip-1"] ' +
      '> md-icon\').click();');
    // await this.messageImg.clickOn();
  }

  public async getUrl(): Promise<void> {
    await browser.getCurrentUrl();
  }
  public async sendSMS(code: string): Promise<void> {
    await this.sendSMSField.type(code);
  }

  public async clickNext(): Promise<void> {
    await this.nextButton.click();
  }

  public async clickNextPassword(): Promise<void> {
    await this.nextButtonPassword.clickOn();
  }
}
