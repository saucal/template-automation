// @ts-nocheck
// Auto-generated from Ghost Inspector suite: "Phlearn - Basic WooCommerce Tests"
// Review all TODOs before running.
import dotenv from 'dotenv';
dotenv.config();
import { test, expect } from '@playwright/test';
import { _05PlacerOrderNewUserBackendCopy, _05PlacerOrderNewUserCopy, _10RegistrationMyAccountLinksAndLogin, _11ForgotPasswordFlow, _3DSStep, fillCC, fillCheckout, phlearnBlockUI } from '../helpers/phlearn-common-steps-for-project';
import { _01HomePage, _02ShopPage, _05SimpleSubscriptionProductPage } from '../helpers/template-woocommerce-tests';

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

test.describe('Phlearn - Basic WooCommerce Tests', () => {

  const vars = new Proxy<Record<string, string>>({
    "payPalUser": "qa+gi_sb-8eg0v132169@saucal.com",
    "payPalPass": process.env.PAY_PAL_PASS ?? '',
    "adminUser": "saucal_maintenance_admin",
    "adminPass": process.env.ADMIN_PASS ?? '',
    "email": `qa+gi_order_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "emailReg": `qa+gi_reg_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "emailForgot": `qa+gi_forgot_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "password": process.env.PASSWORD ?? '',
    "password2": process.env.PASSWORD2 ?? '',
    "firstName": "Saucal Test",
    "zipCode": "33126",
    "project": "Phlearn",
    "Symbol": "$",
    "url": "https://phlearn-staging.mystagingwebsite.com/",
  }, { get: (o: Record<string, string>, k: string) => (k in o ? o[k] : '') });

  test('01 - Home page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await _01HomePage(page, vars);
    try {
      await expect(page.locator(`iframe[width="100%"]`).first().contentFrame().locator(`span.close-icon`).or(page.locator(`iframe[width="100%"]`).first().contentFrame().locator(`div#close`))).not.toHaveCount(0);
    } catch { /* optional step: assertElementPresent */ }
    try {
      await expect(page.locator(`iframe[width="100%"]`).first().contentFrame().locator(`span.close-icon`).or(page.locator(`iframe[width="100%"]`).first().contentFrame().locator(`div#close`)).first()).toBeVisible();
    } catch { /* optional step: assertElementVisible */ }
    try {
      {
        let _ok = false;
        if (!_ok) { try { await page.locator(`iframe[width="100%"]`).first().contentFrame().locator(`span.close-icon`).first().click({ force: true }); _ok = true; } catch {} }
        if (!_ok) { try { await page.locator(`iframe[width="100%"]`).first().contentFrame().locator(`div#close`).first().click({ force: true }); _ok = true; } catch {} }
        if (!_ok) throw new Error('No clickable candidate matched');
      }
    } catch { /* optional step: click */ }
  });

  test('02 - Shop Page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    // ↓ 01 - Home page
    await _01HomePage(page, vars);
    try {
      await expect(page.locator(`iframe[width="100%"]`).first().contentFrame().locator(`span.close-icon`).or(page.locator(`iframe[width="100%"]`).first().contentFrame().locator(`div#close`))).not.toHaveCount(0);
    } catch { /* optional step: assertElementPresent */ }
    try {
      await expect(page.locator(`iframe[width="100%"]`).first().contentFrame().locator(`span.close-icon`).or(page.locator(`iframe[width="100%"]`).first().contentFrame().locator(`div#close`)).first()).toBeVisible();
    } catch { /* optional step: assertElementVisible */ }
    try {
      {
        let _ok = false;
        if (!_ok) { try { await page.locator(`iframe[width="100%"]`).first().contentFrame().locator(`span.close-icon`).first().click({ force: true }); _ok = true; } catch {} }
        if (!_ok) { try { await page.locator(`iframe[width="100%"]`).first().contentFrame().locator(`div#close`).first().click({ force: true }); _ok = true; } catch {} }
        if (!_ok) throw new Error('No clickable candidate matched');
      }
    } catch { /* optional step: click */ }
    // ↑ end 01 - Home page
    await _02ShopPage(page, vars);
  });

  test('03 - Product Page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    // ↓ 01 - Home page
    await _01HomePage(page, vars);
    try {
      await expect(page.locator(`iframe[width="100%"]`).first().contentFrame().locator(`span.close-icon`).or(page.locator(`iframe[width="100%"]`).first().contentFrame().locator(`div#close`))).not.toHaveCount(0);
    } catch { /* optional step: assertElementPresent */ }
    try {
      await expect(page.locator(`iframe[width="100%"]`).first().contentFrame().locator(`span.close-icon`).or(page.locator(`iframe[width="100%"]`).first().contentFrame().locator(`div#close`)).first()).toBeVisible();
    } catch { /* optional step: assertElementVisible */ }
    try {
      {
        let _ok = false;
        if (!_ok) { try { await page.locator(`iframe[width="100%"]`).first().contentFrame().locator(`span.close-icon`).first().click({ force: true }); _ok = true; } catch {} }
        if (!_ok) { try { await page.locator(`iframe[width="100%"]`).first().contentFrame().locator(`div#close`).first().click({ force: true }); _ok = true; } catch {} }
        if (!_ok) throw new Error('No clickable candidate matched');
      }
    } catch { /* optional step: click */ }
    // ↑ end 01 - Home page
    await _05SimpleSubscriptionProductPage(page, vars);
  });

  test('04 - Checkout Page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    // ↓ 01 - Home page
    await _01HomePage(page, vars);
    try {
      await expect(page.locator(`iframe[width="100%"]`).first().contentFrame().locator(`span.close-icon`).or(page.locator(`iframe[width="100%"]`).first().contentFrame().locator(`div#close`))).not.toHaveCount(0);
    } catch { /* optional step: assertElementPresent */ }
    try {
      await expect(page.locator(`iframe[width="100%"]`).first().contentFrame().locator(`span.close-icon`).or(page.locator(`iframe[width="100%"]`).first().contentFrame().locator(`div#close`)).first()).toBeVisible();
    } catch { /* optional step: assertElementVisible */ }
    try {
      {
        let _ok = false;
        if (!_ok) { try { await page.locator(`iframe[width="100%"]`).first().contentFrame().locator(`span.close-icon`).first().click({ force: true }); _ok = true; } catch {} }
        if (!_ok) { try { await page.locator(`iframe[width="100%"]`).first().contentFrame().locator(`div#close`).first().click({ force: true }); _ok = true; } catch {} }
        if (!_ok) throw new Error('No clickable candidate matched');
      }
    } catch { /* optional step: click */ }
    // ↑ end 01 - Home page
    // ↓ 03 - Product Page
    // ↓ 01 - Home page
    await _01HomePage(page, vars);
    try {
      await expect(page.locator(`iframe[width="100%"]`).first().contentFrame().locator(`span.close-icon`).or(page.locator(`iframe[width="100%"]`).first().contentFrame().locator(`div#close`))).not.toHaveCount(0);
    } catch { /* optional step: assertElementPresent */ }
    try {
      await expect(page.locator(`iframe[width="100%"]`).first().contentFrame().locator(`span.close-icon`).or(page.locator(`iframe[width="100%"]`).first().contentFrame().locator(`div#close`)).first()).toBeVisible();
    } catch { /* optional step: assertElementVisible */ }
    try {
      {
        let _ok = false;
        if (!_ok) { try { await page.locator(`iframe[width="100%"]`).first().contentFrame().locator(`span.close-icon`).first().click({ force: true }); _ok = true; } catch {} }
        if (!_ok) { try { await page.locator(`iframe[width="100%"]`).first().contentFrame().locator(`div#close`).first().click({ force: true }); _ok = true; } catch {} }
        if (!_ok) throw new Error('No clickable candidate matched');
      }
    } catch { /* optional step: click */ }
    // ↑ end 01 - Home page
    await _05SimpleSubscriptionProductPage(page, vars);
    // ↑ end 03 - Product Page
    await page.locator(`.variation.year > button[name="continue"][type="submit"].continue`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`a[href="#email"]`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`input[name="username"]`).filter({ visible: true }).first().click({ force: true });
    try { await page.locator(`input[name="username"]`).first().fill(`${vars.email ?? ''}`); } catch { await page.locator(`input[name="username"]`).first().selectOption(`${vars.email ?? ''}`); }
    try { await page.locator(`input[name="password"]`).first().fill(`${vars.password ?? ''}`); } catch { await page.locator(`input[name="password"]`).first().selectOption(`${vars.password ?? ''}`); }
    await page.locator(`xpath=//button[contains(text(), "Register And Continue")]`).or(page.locator(`button[type="submit"]`)).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    await expect(page.locator(`iframe[src="${vars.startUrl ?? ''}checkout/?iframe_checkout=1"]`).first().contentFrame().locator(`iframe#braintree-hosted-field-number input#credit-card-number`)).not.toHaveCount(0);
  });

  test('05 - Placer order - New User', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await _05PlacerOrderNewUserCopy(page, vars);
  });

  test('05 - Placer order - New User - Backend', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await _05PlacerOrderNewUserBackendCopy(page, vars);
  });

  test('06 - Thank You page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    // ↓ 01 - Home page
    await _01HomePage(page, vars);
    try {
      await expect(page.locator(`iframe[width="100%"]`).first().contentFrame().locator(`span.close-icon`).or(page.locator(`iframe[width="100%"]`).first().contentFrame().locator(`div#close`))).not.toHaveCount(0);
    } catch { /* optional step: assertElementPresent */ }
    try {
      await expect(page.locator(`iframe[width="100%"]`).first().contentFrame().locator(`span.close-icon`).or(page.locator(`iframe[width="100%"]`).first().contentFrame().locator(`div#close`)).first()).toBeVisible();
    } catch { /* optional step: assertElementVisible */ }
    try {
      {
        let _ok = false;
        if (!_ok) { try { await page.locator(`iframe[width="100%"]`).first().contentFrame().locator(`span.close-icon`).first().click({ force: true }); _ok = true; } catch {} }
        if (!_ok) { try { await page.locator(`iframe[width="100%"]`).first().contentFrame().locator(`div#close`).first().click({ force: true }); _ok = true; } catch {} }
        if (!_ok) throw new Error('No clickable candidate matched');
      }
    } catch { /* optional step: click */ }
    // ↑ end 01 - Home page
    vars.email = `qa+gi_order_+2${vars.alphanumeric ?? ''}@saucal.com`;
    // ↓ 04 - Checkout Page
    // ↓ 01 - Home page
    await _01HomePage(page, vars);
    try {
      await expect(page.locator(`iframe[width="100%"]`).first().contentFrame().locator(`span.close-icon`).or(page.locator(`iframe[width="100%"]`).first().contentFrame().locator(`div#close`))).not.toHaveCount(0);
    } catch { /* optional step: assertElementPresent */ }
    try {
      await expect(page.locator(`iframe[width="100%"]`).first().contentFrame().locator(`span.close-icon`).or(page.locator(`iframe[width="100%"]`).first().contentFrame().locator(`div#close`)).first()).toBeVisible();
    } catch { /* optional step: assertElementVisible */ }
    try {
      {
        let _ok = false;
        if (!_ok) { try { await page.locator(`iframe[width="100%"]`).first().contentFrame().locator(`span.close-icon`).first().click({ force: true }); _ok = true; } catch {} }
        if (!_ok) { try { await page.locator(`iframe[width="100%"]`).first().contentFrame().locator(`div#close`).first().click({ force: true }); _ok = true; } catch {} }
        if (!_ok) throw new Error('No clickable candidate matched');
      }
    } catch { /* optional step: click */ }
    // ↑ end 01 - Home page
    // ↓ 03 - Product Page
    // ↓ 01 - Home page
    await _01HomePage(page, vars);
    try {
      await expect(page.locator(`iframe[width="100%"]`).first().contentFrame().locator(`span.close-icon`).or(page.locator(`iframe[width="100%"]`).first().contentFrame().locator(`div#close`))).not.toHaveCount(0);
    } catch { /* optional step: assertElementPresent */ }
    try {
      await expect(page.locator(`iframe[width="100%"]`).first().contentFrame().locator(`span.close-icon`).or(page.locator(`iframe[width="100%"]`).first().contentFrame().locator(`div#close`)).first()).toBeVisible();
    } catch { /* optional step: assertElementVisible */ }
    try {
      {
        let _ok = false;
        if (!_ok) { try { await page.locator(`iframe[width="100%"]`).first().contentFrame().locator(`span.close-icon`).first().click({ force: true }); _ok = true; } catch {} }
        if (!_ok) { try { await page.locator(`iframe[width="100%"]`).first().contentFrame().locator(`div#close`).first().click({ force: true }); _ok = true; } catch {} }
        if (!_ok) throw new Error('No clickable candidate matched');
      }
    } catch { /* optional step: click */ }
    // ↑ end 01 - Home page
    await _05SimpleSubscriptionProductPage(page, vars);
    // ↑ end 03 - Product Page
    await page.locator(`.variation.year > button[name="continue"][type="submit"].continue`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`a[href="#email"]`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`input[name="username"]`).filter({ visible: true }).first().click({ force: true });
    try { await page.locator(`input[name="username"]`).first().fill(`${vars.email ?? ''}`); } catch { await page.locator(`input[name="username"]`).first().selectOption(`${vars.email ?? ''}`); }
    try { await page.locator(`input[name="password"]`).first().fill(`${vars.password ?? ''}`); } catch { await page.locator(`input[name="password"]`).first().selectOption(`${vars.password ?? ''}`); }
    await page.locator(`xpath=//button[contains(text(), "Register And Continue")]`).or(page.locator(`button[type="submit"]`)).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    await expect(page.locator(`iframe[src="${vars.startUrl ?? ''}checkout/?iframe_checkout=1"]`).first().contentFrame().locator(`iframe#braintree-hosted-field-number input#credit-card-number`)).not.toHaveCount(0);
    // ↑ end 04 - Checkout Page
    await fillCheckout(page, vars);
    await fillCC(page, vars);
    {
      let _ok = false;
      if (!_ok) { try { await page.locator(`iframe[src="${vars.startUrl ?? ''}checkout/?iframe_checkout=1"]`).first().contentFrame().locator(`//button[contains(text(), "Place order")]`).first().click({ force: true }); _ok = true; } catch {} }
      if (!_ok) { try { await page.locator(`iframe[src="${vars.startUrl ?? ''}checkout/?iframe_checkout=1"]`).first().contentFrame().locator(`#place_order`).first().click({ force: true }); _ok = true; } catch {} }
      if (!_ok) throw new Error('No clickable candidate matched');
    }
    await _3DSStep(page, vars);
    await phlearnBlockUI(page, vars);
    await page.waitForLoadState('load');
  });

  test('07 - Registration, My Account links and Login', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    // ↓ 01 - Home page
    await _01HomePage(page, vars);
    try {
      await expect(page.locator(`iframe[width="100%"]`).first().contentFrame().locator(`span.close-icon`).or(page.locator(`iframe[width="100%"]`).first().contentFrame().locator(`div#close`))).not.toHaveCount(0);
    } catch { /* optional step: assertElementPresent */ }
    try {
      await expect(page.locator(`iframe[width="100%"]`).first().contentFrame().locator(`span.close-icon`).or(page.locator(`iframe[width="100%"]`).first().contentFrame().locator(`div#close`)).first()).toBeVisible();
    } catch { /* optional step: assertElementVisible */ }
    try {
      {
        let _ok = false;
        if (!_ok) { try { await page.locator(`iframe[width="100%"]`).first().contentFrame().locator(`span.close-icon`).first().click({ force: true }); _ok = true; } catch {} }
        if (!_ok) { try { await page.locator(`iframe[width="100%"]`).first().contentFrame().locator(`div#close`).first().click({ force: true }); _ok = true; } catch {} }
        if (!_ok) throw new Error('No clickable candidate matched');
      }
    } catch { /* optional step: click */ }
    // ↑ end 01 - Home page
    await _10RegistrationMyAccountLinksAndLogin(page, vars);
  });

  test('08 - "Forgot password?" flow', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    // ↓ 01 - Home page
    await _01HomePage(page, vars);
    try {
      await expect(page.locator(`iframe[width="100%"]`).first().contentFrame().locator(`span.close-icon`).or(page.locator(`iframe[width="100%"]`).first().contentFrame().locator(`div#close`))).not.toHaveCount(0);
    } catch { /* optional step: assertElementPresent */ }
    try {
      await expect(page.locator(`iframe[width="100%"]`).first().contentFrame().locator(`span.close-icon`).or(page.locator(`iframe[width="100%"]`).first().contentFrame().locator(`div#close`)).first()).toBeVisible();
    } catch { /* optional step: assertElementVisible */ }
    try {
      {
        let _ok = false;
        if (!_ok) { try { await page.locator(`iframe[width="100%"]`).first().contentFrame().locator(`span.close-icon`).first().click({ force: true }); _ok = true; } catch {} }
        if (!_ok) { try { await page.locator(`iframe[width="100%"]`).first().contentFrame().locator(`div#close`).first().click({ force: true }); _ok = true; } catch {} }
        if (!_ok) throw new Error('No clickable candidate matched');
      }
    } catch { /* optional step: click */ }
    // ↑ end 01 - Home page
    await _11ForgotPasswordFlow(page, vars);
  });

  test('09 - ReCaptcha test', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.goto(`${vars.startUrl ?? ''}support/`);
    await page.waitForLoadState('load');
    // ↓ 01 - Home page
    await _01HomePage(page, vars);
    try {
      await expect(page.locator(`iframe[width="100%"]`).first().contentFrame().locator(`span.close-icon`).or(page.locator(`iframe[width="100%"]`).first().contentFrame().locator(`div#close`))).not.toHaveCount(0);
    } catch { /* optional step: assertElementPresent */ }
    try {
      await expect(page.locator(`iframe[width="100%"]`).first().contentFrame().locator(`span.close-icon`).or(page.locator(`iframe[width="100%"]`).first().contentFrame().locator(`div#close`)).first()).toBeVisible();
    } catch { /* optional step: assertElementVisible */ }
    try {
      {
        let _ok = false;
        if (!_ok) { try { await page.locator(`iframe[width="100%"]`).first().contentFrame().locator(`span.close-icon`).first().click({ force: true }); _ok = true; } catch {} }
        if (!_ok) { try { await page.locator(`iframe[width="100%"]`).first().contentFrame().locator(`div#close`).first().click({ force: true }); _ok = true; } catch {} }
        if (!_ok) throw new Error('No clickable candidate matched');
      }
    } catch { /* optional step: click */ }
    // ↑ end 01 - Home page
    try { await page.locator(`#input_23_1`).first().fill(`John Doe`); } catch { await page.locator(`#input_23_1`).first().selectOption(`John Doe`); }
    try { await page.locator(`#input_23_8`).first().fill(`qa+gi_form_${vars.alphanumeric ?? ''}@saucal.com`); } catch { await page.locator(`#input_23_8`).first().selectOption(`qa+gi_form_${vars.alphanumeric ?? ''}@saucal.com`); }
    try { await page.locator(`#input_23_7`).first().fill(`PHLEARN PRO Subscriber`); } catch { await page.locator(`#input_23_7`).first().selectOption(`PHLEARN PRO Subscriber`); }
    try { await page.locator(`#input_23_2`).first().fill(`orem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna.`); } catch { await page.locator(`#input_23_2`).first().selectOption(`orem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna.`); }
    {
      const _lbl = page.locator(`label[for="choice_23_6_1"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#choice_23_6_1`).filter({ visible: true }).first().click({ force: true }); }
    }
    {
      const _lbl = page.locator(`label[for="gform_submit_button_23"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#gform_submit_button_23`).filter({ visible: true }).first().click({ force: true }); }
    }
    await expect(page.locator(`#gform_confirmation_message_23`).first()).toHaveText(`Thanks for contacting us! We will get in touch with you shortly.`);
  });

});
