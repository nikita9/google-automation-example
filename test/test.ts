import { browser } from 'protractor';
import { SignIn } from '../utils/basicFragment/signIn';
import { Constants } from '../utils/constants';
//tslint:disable
describe('Reach the google voice page', () => {
  let signIn = new SignIn();

  it('When I go to the Google Voice page', async () => {
    await browser.get(`${process.env.API_ENV}voice.google.com/about`);
    await signIn.screenshot('open.png');
  });

  it('When I click on the Login button', async () => {
    await signIn.clickLogin();
    await signIn.screenshot('clickLogin.png');
  });

  it('When I type email into email field', async () => {
    await signIn.typeEmail();
    await signIn.screenshot('typeEmail.png');
  });

  it('When I type password into password field', async () => {
    await signIn.typePassword();
    await signIn.screenshot('typePassword.png');
  });

  it('When I type phone into phone field', async () => {
   try {
     await signIn.typePhone();
   } catch (e) {
     await signIn.screenshot('typePhone.png');
   }
  });

  it('When I go to Messages page', async () => {
    await browser.waitForAngularEnabled(false);
    await browser.get('https://voice.google.com/messages');
    // await browser.waitForAngularEnabled(true);
    // await browser.waitForAngular();
    // await signIn.clickOnImgMessage();
    // await signIn.screenshot('openMessages.png');
  });

  it('When I click on the sendMessage button', async () => {
    await browser.waitForAngularEnabled(false);
    await signIn.clickSendMessage();

    await signIn.screenshot('clickMessages.png');
  });

  it('When I type numbers into the Contacts field', async () => {
    await browser.waitForAngularEnabled(false);
    await signIn.typeContacts(Constants.numbers['1']);
    await signIn.screenshot('typeContacts.png');
  });

  it('When I type message', async () => {
    await signIn.typeMessage('test');
    await signIn.screenshot('typeMessages.png');
  });

  it('When I click on the Send button', async () => {
    await signIn.sendMessage();
    await signIn.screenshot('typeSendMessage.png');
  });

  it('Send list of numbers', async () => {
    const numbers: object = Constants.numbers;
    for (const i in numbers) {
      if (numbers.hasOwnProperty(i)) {
        await signIn.clickSendMessage();
        await signIn.typeContacts(numbers[i]);
        try {
          await signIn.typeMessage('test');
        } catch (e) {

        }
        await signIn.screenshot('777.png');
        await signIn.sendMessage();
        await signIn.screenshot('999.png');
      }
    }
  });

  it('List of Numbers', async () => {
   try {
     await signIn.listOfNumebrs();
   } catch (e) {
     
   }
  });
});


