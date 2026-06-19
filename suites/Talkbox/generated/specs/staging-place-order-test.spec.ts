// @ts-nocheck
// Auto-generated from Ghost Inspector suite: "Staging - Place Order Test"
// Review all TODOs before running.
import dotenv from 'dotenv';
dotenv.config();
import { test, expect } from '@playwright/test';
import { blockUI } from '../helpers/common-steps-for-all-projects';
import { _03PlaceOrderEmail, _04RefundByAdmin, _05RefundEmail, addCCProduct, extractUserFromEmail, login, newUserSubscriptionProduct, renewBackEnd } from '../helpers/talkbox-common-steps';

async function _giEval(page: any, fn: any, vars: any): Promise<any> {
  for (let i = 0; i < 3; i++) {
    try { return await page.evaluate(fn, vars); }
    catch (e: any) {
      if (i < 2 && /Execution context was destroyed|Target page, context or browser has been closed|frame got detached/i.test(e?.message || '')) {
        await page.waitForLoadState('domcontentloaded').catch(() => {});
        continue;
      }
      throw e;
    }
  }
}

test.describe('Staging - Place Order Test', () => {

  const vars = new Proxy<Record<string, string>>({
    "email": `qa+gi_order_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "emailReg": `qa+gi_reg_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "emailForgot": `qa+gi_forgot_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "payPalUser": "qa+gi_sb-8eg0v132169@saucal.com",
    "payPalPass": process.env.PAY_PAL_PASS ?? '',
    "adminUser": "saucal_maintenance_admin",
    "adminPass": process.env.ADMIN_PASS ?? '',
    "CCard": "4242424242424242",
    "month": "05",
    "phone": "6134564567",
    "password": process.env.PASSWORD ?? '',
    "stateComplete": "Texas",
    "password2": process.env.PASSWORD2 ?? '',
    "zipCode": "75234",
    "street3": "123 false Shipping Street",
    "project": "talkbox",
    "countryComplete": "United States (US)",
    "year": "23",
    "cvv": "123",
    "Symbol": "$",
    "street2": "Of. 2",
    "street4": "Ap. 4",
    "street": "123 False Street",
    "company": "Testing Inc.",
    "city": "Dallas",
    "state": "TX",
    "country": "US",
    "firstName": "QA",
    "lastName": `${Math.random().toString(36).substring(2, 10)}`,
  }, { get: (o: Record<string, string>, k: string) => (k in o ? o[k] : '') });

  test('01 - Place order - 01 - New User + Upsell', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    vars.language = `Spanish`;
    vars.user = `new`;
    // ↓ 08 - Checkout Page
    // ↓ 06 - Landing Page - Step 2
    // ↓ 05 - Landing Page
    await page.waitForLoadState('load');
    await page.locator(`div > div.talkbox-dropdown-button__button`).first().hover();
    await page.locator(`xpath=//a[contains(text(),'${vars.language ?? ''}')]`).filter({ visible: true }).first().click({ force: true });
    try {
      if (false) {
        await page.locator(`div > a[href*="/p_landing/spanish/"`).filter({ visible: true }).first().click({ force: true });
      }
    } catch { /* optional step: click */ }
    await page.waitForLoadState('load');
    if (false) {
      await expect(page.locator(`div.wp-block-media-text__content > h2.has-text-color > strong`).first()).toContainText(`THE SPANISH talkbox.mom PROGRAM`);
    }
    // ↑ end 05 - Landing Page
    await page.locator(`#product-landing > main > div > div > article:nth-child(2) > a`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    vars.frequency = ((await page.locator(`article:nth-of-type(2) .pc-landing-box__title.pc-landing-box__title--colored`).textContent()) ?? '').trim();
    // ↑ end 06 - Landing Page - Step 2
    await page.locator(`article:nth-of-type(2) button[type="submit"]`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    await blockUI(page, vars);
    // ↑ end 08 - Checkout Page
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const elem = document.querySelector('.wfob_checkbox.wfob_bump_product')

return !!elem }, vars)) {
      await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const elem = document.querySelector<HTMLInputElement>('input[type="checkbox"].wfob_checkbox')

while (!(elem as HTMLInputElement).checked && !!elem) {
    elem.click();
} }, vars);
    }
    vars.upsell = `yes`;
    await newUserSubscriptionProduct(page, vars);
    await expect(page.locator(`.woocommerce-customer-details--maincolumn > address`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.street ?? ''}
${vars.street2 ?? ''}
${vars.city ?? ''}, ${vars.state ?? ''} ${vars.zipCode ?? ''}`);
    await expect(page.locator(`.woocommerce-customer-details--phone`).first()).toContainText(`${vars.phone ?? ''}`);
    await expect(page.locator(`.woocommerce-customer-details--email`).first()).toContainText(`${vars.email ?? ''}`);
    await expect(page.locator(`.woocommerce-column > address`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName2 ?? ''}
${vars.street3 ?? ''}
${vars.street4 ?? ''}
${vars.city ?? ''}, ${vars.state ?? ''} ${vars.zipCode ?? ''}

${vars.phone ?? ''}`);
    await page.locator(`xpath=//span[contains(text(), "Back to programs")]`).or(page.locator(`a[href*="/my-programs/"] > span`)).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
  });

  test('02 - Place order - 02 - Email', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await _03PlaceOrderEmail(page, vars);
  });

  test('03 - Place order - 03 - Admin', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await renewBackEnd(page, vars);
  });

  test('04 - Place order - 04 - Refund', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await _04RefundByAdmin(page, vars);
  });

  test('05 - Place order - 05 - Refund Email', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await _05RefundEmail(page, vars);
  });

  test('06 - Place order - 01 - Logged User + CC', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    vars.username = `${vars.email ?? ''}`;
    vars.user = `logged`;
    await extractUserFromEmail(page, vars);
    await page.locator(`xpath=//a[contains(text(),'Activate Your Account')]`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`xpath=//a[contains(text(),'Set your password')]`).filter({ visible: true }).first().click({ force: true });
    try { await page.locator(`#password_1`).first().fill(`${vars.password ?? ''}`); } catch { await page.locator(`#password_1`).first().selectOption(`${vars.password ?? ''}`); }
    try { await page.locator(`#password_2`).first().fill(`${vars.password ?? ''}`); } catch { await page.locator(`#password_2`).first().selectOption(`${vars.password ?? ''}`); }
    await page.locator(`button[type='submit']`).or(page.locator(`xpath=//button[contains(text(),'Save')]`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.woocommerce-message`).first()).toHaveText(`Your password has been reset successfully.`);
    await page.locator(`a[rel='home']`).filter({ visible: true }).first().click({ force: true });
    vars.language = `French`;
    vars.upsell = `no`;
    // ↓ 08 - Checkout Page
    // ↓ 06 - Landing Page - Step 2
    // ↓ 05 - Landing Page
    await page.waitForLoadState('load');
    await page.locator(`div > div.talkbox-dropdown-button__button`).first().hover();
    await page.locator(`xpath=//a[contains(text(),'${vars.language ?? ''}')]`).filter({ visible: true }).first().click({ force: true });
    try {
      if (false) {
        await page.locator(`div > a[href*="/p_landing/spanish/"`).filter({ visible: true }).first().click({ force: true });
      }
    } catch { /* optional step: click */ }
    await page.waitForLoadState('load');
    if (false) {
      await expect(page.locator(`div.wp-block-media-text__content > h2.has-text-color > strong`).first()).toContainText(`THE SPANISH talkbox.mom PROGRAM`);
    }
    // ↑ end 05 - Landing Page
    await page.locator(`#product-landing > main > div > div > article:nth-child(2) > a`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    vars.frequency = ((await page.locator(`article:nth-of-type(2) .pc-landing-box__title.pc-landing-box__title--colored`).textContent()) ?? '').trim();
    // ↑ end 06 - Landing Page - Step 2
    await page.locator(`article:nth-of-type(2) button[type="submit"]`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    await blockUI(page, vars);
    // ↑ end 08 - Checkout Page
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const elem = document.querySelector('.wfob_checkbox.wfob_bump_product')

return !!elem }, vars)) {
      await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const elem = document.querySelector<HTMLInputElement>('input[type="checkbox"].wfob_checkbox')

while (!(elem as HTMLInputElement).checked && !!elem) {
    elem.click();
} }, vars);
    }
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const elem = document.querySelector('.wfob_checkbox.wfob_bump_product')

return !!elem }, vars)) {
      await page.waitForTimeout(5000);
    }
    await addCCProduct(page, vars);
    await newUserSubscriptionProduct(page, vars);
    await expect(page.locator(`.woocommerce-customer-details--maincolumn > address`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.street ?? ''}
${vars.street2 ?? ''}
${vars.city ?? ''}, ${vars.state ?? ''} ${vars.zipCode ?? ''}`);
    await expect(page.locator(`.woocommerce-customer-details--phone`).first()).toContainText(`${vars.phone ?? ''}`);
    await expect(page.locator(`.woocommerce-customer-details--email`).first()).toContainText(`${vars.email ?? ''}`);
    await expect(page.locator(`.woocommerce-column > address`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName2 ?? ''}
${vars.street3 ?? ''}
${vars.street4 ?? ''}
${vars.city ?? ''}, ${vars.state ?? ''} ${vars.zipCode ?? ''}

${vars.phone ?? ''}`);
    await page.locator(`xpath=//span[contains(text(), "Back to programs")]`).or(page.locator(`a[href*="/my-programs/"] > span`)).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
  });

  test('07 - Place order - 02 - Email', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await _03PlaceOrderEmail(page, vars);
  });

  test('08 - Place order - 03 - Admin', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await renewBackEnd(page, vars);
  });

  test('12 - Submit Contact form (CF7 plugin)', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    vars.admin = ``;
    vars.pass = `${vars.password2 ?? ''}`;
    vars.username = `${vars.email ?? ''}`;
    await login(page, vars);
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const elem = document.querySelector('#learndash-content')

return !elem }, vars)) {
      await page.locator(`a[href*="/my-programs/"]`).filter({ visible: true }).first().click({ force: true });
    }
    await page.locator(`a[href*="/my-programs/spanish-01/"] > img.attachment-medium.size-medium.wp-post-image`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`xpath=//a[contains(text(), "Start Box")]`).or(page.locator(`a[href*="/my-programs/spanish-01/challenge/spanish-01-1/"].btn-advance`)).filter({ visible: true }).first().click({ force: true });
    await page.locator(`a[href*="/my-programs/spanish-01/challenge/spanish-01-1/page/spanish-01-1-extras/"] > .bb-lms-title.bb-not-completed-item`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`form[action*="/my-programs/spanish-01/challenge/spanish-01-1/page/spanish-01-1-extras/#wpcf7"] > p`)).not.toHaveCount(0);
    try { await page.locator(`textarea[name="your-message"]`).first().fill(`This is a Test for CF7`); } catch { await page.locator(`textarea[name="your-message"]`).first().selectOption(`This is a Test for CF7`); }
    await page.locator(`input[type="submit"].wpcf7-form-control`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.wpcf7-spinner`).first()).toBeVisible();
    await expect(page.locator(`.wpcf7-spinner`).first()).not.toBeVisible();
    await expect(page.locator(`.wpcf7-response-output`).first()).toContainText(`Thank you for your message. It has been sent.`);
    await page.screenshot({ fullPage: true });
    await page.waitForTimeout(30000);
    await page.goto(`https://email.ghostinspector.com/qa+talkbox_mom/latest`);
    await page.waitForLoadState('load');
    await expect(page.locator(`#content > p:nth-of-type(1)`).first()).toHaveText(`Submitted by ${vars.firstName ?? ''} ${vars.lastName ?? ''}
Email: ${vars.email ?? ''}
Question: This is a Test for CF7`);
  });

});
