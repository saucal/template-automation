// @ts-nocheck
// Auto-generated from Ghost Inspector suite: "Old test - Basic"
// Review all TODOs before running.
import dotenv from 'dotenv';
dotenv.config();
import { test, expect } from '@playwright/test';
import { blockUI, extractUserFromEmail, login, uRLOfCurrentPage } from '../helpers/common-steps-for-all-projects';
import { login } from '../helpers/talkbox-common-steps';

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

test.describe('Old test - Basic', () => {

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
    "cvv": "123",
    "lastName": "Customer",
    "company": "Testing Inc.",
    "street": "123 False Street",
    "city": "Miami",
    "state": "FL",
    "country": "US",
    "firstName": "Maintenance",
    "phone": "6134564567",
    "stateComplete": "Florida",
    "project": "talkbox",
    "password": process.env.PASSWORD ?? '',
    "password2": process.env.PASSWORD2 ?? '',
    "zipCode": "33126",
    "street3": "123 false Shipping Street",
    "countryComplete": "United States (US)",
    "year": "23",
    "Symbol": "$",
    "street2": "Of. 2",
    "street4": "Ap. 4",
  }, { get: (o: Record<string, string>, k: string) => (k in o ? o[k] : '') });

  test('01 - Home Page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.waitForLoadState('load');
    await uRLOfCurrentPage(page, vars);
    try {
      expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let url = `${vars.site}`
return url === `${vars.url}/` }, vars)).toBeTruthy();
    } catch { /* optional step: assertEval */ }
    await expect(page.locator(`a[href="#BuyTalkBox"]`).or(page.locator(`div > div > span.talkbox-dropdown-button__label`))).not.toHaveCount(0);
    await expect(page.locator(`div.gb-container > div > a.kb-button`).first()).toBeVisible();
    await expect(page.locator(`div#understandgoals`)).not.toHaveCount(0);
  });

  test('02 - Academy Page - Deprecated', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.waitForLoadState('load');
    try {
      await page.locator(`a[href*="/academy/"] > strong`).filter({ visible: true }).first().click({ force: true });
    } catch { /* optional step: click */ }
    await page.goto(`${vars.url ?? ''}/academy/`);
    await page.waitForLoadState('load');
    await page.locator(`xpath=//a[contains(text(), "German")]`).or(page.locator(`a[href*="/academygerman/"]`)).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    await uRLOfCurrentPage(page, vars);
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return `${vars.site}` === `${vars.url}/academygerman/` }, vars)).toBeTruthy();
  });

  test('03 - Blog Page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.waitForLoadState('load');
    await page.locator(`a[href*="/blog/"] > strong`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    await uRLOfCurrentPage(page, vars);
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return `${vars.site}` === `${vars.url}/blog/` }, vars)).toBeTruthy();
  });

  test('04 - Post page', async ({ page }) => {
    await page.goto(`${vars.url ?? ''}/blog/creating-a-language-immersion-trip-for-your-family/`);
    await page.waitForLoadState('load');

    await page.waitForLoadState('load');
    await expect(page.locator(`h1.entry-title`).first()).toContainText(`Creating a Language Immersion Trip for Your Family`);
  });

  test('05 - Landing Page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.waitForLoadState('load');
    await page.locator(`div > div.talkbox-dropdown-button__button`).first().hover();
    await page.locator(`div > ul.talkbox-dropdown-button__content > li:nth-child(1) > a`).filter({ visible: true }).first().click({ force: true });
    try {
      if (false) {
        await page.locator(`div > a[href*="/p_landing/spanish/"`).filter({ visible: true }).first().click({ force: true });
      }
    } catch { /* optional step: click */ }
    await page.waitForLoadState('load');
    if (false) {
      await expect(page.locator(`div.wp-block-media-text__content > h2.has-text-color > strong`).first()).toContainText(`THE SPANISH talkbox.mom PROGRAM`);
    }
  });

  test('06 - Landing Page - Step 2', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    // ↓ 05 - Landing Page
    await page.waitForLoadState('load');
    await page.locator(`div > div.talkbox-dropdown-button__button`).first().hover();
    await page.locator(`div > ul.talkbox-dropdown-button__content > li:nth-child(1) > a`).filter({ visible: true }).first().click({ force: true });
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
    await page.locator(`div.wp-block-kadence-column:nth-of-type(2) > .kt-inside-inner-col > .talkbox-dropdown-button > .talkbox-dropdown-button__button > .talkbox-dropdown-button__label`).first().hover();
    await page.locator(`xpath=//a[contains(text(),'Spanish')]`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    vars.frequency = ((await page.locator(`article:nth-of-type(2) .pc-landing-box__title.pc-landing-box__title--colored`).textContent()) ?? '').trim();
  });

  test('07 - Landing Page - Step 3', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    // ↓ 06 - Landing Page - Step 2
    // ↓ 05 - Landing Page
    await page.waitForLoadState('load');
    await page.locator(`div > div.talkbox-dropdown-button__button`).first().hover();
    await page.locator(`div > ul.talkbox-dropdown-button__content > li:nth-child(1) > a`).filter({ visible: true }).first().click({ force: true });
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
    await page.locator(`div.wp-block-kadence-column:nth-of-type(2) > .kt-inside-inner-col > .talkbox-dropdown-button > .talkbox-dropdown-button__button > .talkbox-dropdown-button__label`).first().hover();
    await page.locator(`xpath=//a[contains(text(),'Spanish')]`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    vars.frequency = ((await page.locator(`article:nth-of-type(2) .pc-landing-box__title.pc-landing-box__title--colored`).textContent()) ?? '').trim();
    // ↑ end 06 - Landing Page - Step 2
    await page.locator(`div.pc-landing-box__list > article:nth-of-type(2) button`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
  });

  test('08 - Checkout Page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    // ↓ 07 - Landing Page - Step 3
    // ↓ 06 - Landing Page - Step 2
    // ↓ 05 - Landing Page
    await page.waitForLoadState('load');
    await page.locator(`div > div.talkbox-dropdown-button__button`).first().hover();
    await page.locator(`div > ul.talkbox-dropdown-button__content > li:nth-child(1) > a`).filter({ visible: true }).first().click({ force: true });
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
    await page.locator(`div.wp-block-kadence-column:nth-of-type(2) > .kt-inside-inner-col > .talkbox-dropdown-button > .talkbox-dropdown-button__button > .talkbox-dropdown-button__label`).first().hover();
    await page.locator(`xpath=//a[contains(text(),'Spanish')]`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    vars.frequency = ((await page.locator(`article:nth-of-type(2) .pc-landing-box__title.pc-landing-box__title--colored`).textContent()) ?? '').trim();
    // ↑ end 06 - Landing Page - Step 2
    await page.locator(`div.pc-landing-box__list > article:nth-of-type(2) button`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    // ↑ end 07 - Landing Page - Step 3
    await page.locator(`button[type="submit"]`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    await blockUI(page, vars);
  });

  test('10 - My Account links and Login', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    vars.username = `qa+gi_staging_user@saucal.com`;
    vars.pass = `${vars.password ?? ''}`;
    await login(page, vars);
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const elem = document.querySelector('#learndash-content')

return !!elem }, vars)) {
      await page.locator(`.user-name`).filter({ visible: true }).first().click({ force: true });
    }
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const elem = document.querySelector('#learndash-content')

return !!elem }, vars)) {
      await page.locator(`li > a[href*='account/'] > span`).filter({ visible: true }).first().click({ force: true });
    }
    await page.locator(`.woocommerce-MyAccount-navigation-link > a[href*="/account/orders/"]`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.woocommerce-MyAccount-content`)).not.toHaveCount(0);
    await page.locator(`a[href*="/account/view-subscription"]`).or(page.locator(`a[href*="/account/subscriptions"]`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.woocommerce-MyAccount-content`)).not.toHaveCount(0);
    await page.locator(`a[href*="/account/downloads/"]`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.wc-MyAccount-sub-tagline`).first()).toContainText(`No downloads available yet.`);
    await page.locator(`a[href*="/account/edit-address/"]`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.u-columns`)).not.toHaveCount(0);
    await page.locator(`a[href*="/account/payment-methods/"]`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.woocommerce-MyAccount-content`)).not.toHaveCount(0);
    await page.locator(`a[href*="/account/edit-account/"]`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.wc-MyAccount-inner-content`)).not.toHaveCount(0);
    await page.locator(`a[href*="/account/referrals/"]`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.woocommerce-MyAccount-content > p`).first()).toHaveText(`You do not have any completed referrals yet. Refer a friend here.`);
    await page.locator(`a[href*="/account/invite/"]`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.woocommerce-MyAccount-content > div:nth-of-type(2)`)).not.toHaveCount(0);
    await page.locator(`.woocommerce-MyAccount-navigation-link.woocommerce-MyAccount-navigation-link--dashboard > a[href*="/account/"]`).filter({ visible: true }).first().click({ force: true });
  });

  test('11 - “Forgot password?” flow', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.locator(`a[href*="/account/?redirect_to="]`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`a[href*="/account/lost-password/"]`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`button.woocommerce-Button`).or(page.locator(`button[type="submit"].woocommerce-Button`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`ul.woocommerce-error > li`).first()).toContainText(`Enter a username or email address.`);
    try { await page.locator(`#user_login`).first().fill(`${vars.username ?? ''}`); } catch { await page.locator(`#user_login`).first().selectOption(`${vars.username ?? ''}`); }
    await page.locator(`button[type="submit"].woocommerce-Button`).or(page.locator(`button.woocommerce-Button`)).filter({ visible: true }).first().click({ force: true });
    try {
      await expect(page.locator(`.wc-block-components-notice-banner.is-success > .wc-block-components-notice-banner__content`).or(page.locator(`.woocommerce-message`)).first()).toHaveText(`Password reset email has been sent.`);
    } catch { /* optional step: assertText */ }
    await extractUserFromEmail(page, vars);
    await page.locator(`xpath=//a[contains(text(), "Password Reset Request for ")]`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`a.link`).or(page.locator(`xpath=//a[contains(text(), "Reset password")]`)).filter({ visible: true }).first().click({ force: true });
    try { await page.locator(`#password_1`).first().fill(`${vars.password2 ?? ''}`); } catch { await page.locator(`#password_1`).first().selectOption(`${vars.password2 ?? ''}`); }
    try { await page.locator(`#password_2`).first().fill(`${vars.password2 ?? ''}`); } catch { await page.locator(`#password_2`).first().selectOption(`${vars.password2 ?? ''}`); }
    await page.locator(`button[type="submit"]`).filter({ visible: true }).first().click({ force: true });
    vars.pass = `${vars.password2 ?? ''}`;
    await expect(page.locator(`.woocommerce-message`).first()).toContainText(`Your password has been reset successfully.`);
    await expect(page.locator(`div.MyAccount-content--dashboard > div > h2`).first()).toContainText(`Hello ${vars.firstName ?? ''} ${vars.lastName ?? ''}`);
  });

  test('12 - Submit Contact form (CF7 plugin)', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    vars.admin = ``;
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
