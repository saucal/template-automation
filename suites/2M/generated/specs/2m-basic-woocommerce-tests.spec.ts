// @ts-nocheck
// Auto-generated from Ghost Inspector suite: "2M - Basic WooCommerce Tests"
// Review all TODOs before running.
import dotenv from 'dotenv';
dotenv.config();
import { test, expect } from '@playwright/test';
import { extractUserFromEmail, login } from '../helpers/common-steps-for-all-projects';

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

test.describe('2M - Basic WooCommerce Tests', () => {

  const vars = new Proxy<Record<string, string>>({
    "email": `qa+gi_order_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "emailReg": `qa+gi_reg_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "emailForgot": `qa+gi_forgot_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "payPalUser": "qa+gi_sb-8eg0v132169@saucal.com",
    "payPalPass": process.env.PAY_PAL_PASS ?? '',
    "adminUser": "saucal_maintenance_admin",
    "adminPass": process.env.ADMIN_PASS ?? '',
    "username": "qa+gi_staging_user@saucal.com",
    "password2": process.env.PASSWORD2 ?? '',
    "PONumber": "000-647657",
    "countryComplete": "United States (US)",
    "project": "2m",
    "Symbol": "$",
    "password": process.env.PASSWORD ?? '',
    "street": "123 False Street",
    "city": "Miami",
    "state": "FL",
    "aim": "6ca64cf55317426785ba330a8e6b71b456655",
    "country": "US",
    "qty1": "2",
    "qty2": "1",
    "qty3": "1",
    "qty4": "1",
    "zipCode": "33126",
    "emailCC": "qa+gi_ccemail@saucal.com",
    "phone": "3050698796",
  }, { get: (o: Record<string, string>, k: string) => (k in o ? o[k] : '') });

  test('“Forgot password?” flow', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.locator(`xpath=//a[contains(text(), "Lost your password?")]`).or(page.locator(`a[href*="/my-account/lost-password/"]`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`form.woocommerce-ResetPassword > p:nth-of-type(1)`).first()).toContainText(`Lost your password? Please enter your username or email address. You will receive a link to create a new password via email.`);
    {
      const _lbl = page.locator(`label[for="user_login"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#user_login`).filter({ visible: true }).first().click({ force: true }); }
    }
    try { await page.locator(`#user_login`).first().fill(`${vars.username ?? ''}`); } catch { await page.locator(`#user_login`).first().selectOption(`${vars.username ?? ''}`); }
    await page.locator(`xpath=//button[contains(text(), "Reset password")]`).or(page.locator(`button[type="submit"]`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.wc-block-components-notice-banner__content`).or(page.locator(`.woocommerce-message`)).first()).toContainText(`Password reset email has been sent.`);
    await extractUserFromEmail(page, vars);
    await page.locator(`a.link`).filter({ visible: true }).first().click({ force: true });
    try { await page.locator(`#password_1`).first().fill(`${vars.password2 ?? ''}`); } catch { await page.locator(`#password_1`).first().selectOption(`${vars.password2 ?? ''}`); }
    try { await page.locator(`#password_2`).first().fill(`${vars.password2 ?? ''}`); } catch { await page.locator(`#password_2`).first().selectOption(`${vars.password2 ?? ''}`); }
    await page.locator(`xpath=//button[contains(text(), "Save")]`).or(page.locator(`button[type="submit"]`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.wc-block-components-notice-banner__content`).or(page.locator(`.woocommerce-message`)).first()).toContainText(`Your password has been reset successfully.`);
    vars.pass = `${vars.password2 ?? ''}`;
    await login(page, vars);
  });

  test('Checkout page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    // ↓ Products page
    vars.pass = `${vars.password ?? ''}`;
    await login(page, vars);
    // ↑ end Products page
    await expect(page.locator(`.custom-subscription-page`)).not.toHaveCount(0);
    try { await page.locator(`#post-840 > div.entry-content > div:nth-child(2) > div > div.custom-subscription-page > ul > li:nth-child(1) > div.mandatory-product-quantity.col-sm-2 > form > div > div.woocommerce-variation-add-to-cart.variations_button.woocommerce-variation-add-to-cart-enabled > div > input.input-text.qty.text`).first().fill(`2`); } catch { await page.locator(`#post-840 > div.entry-content > div:nth-child(2) > div > div.custom-subscription-page > ul > li:nth-child(1) > div.mandatory-product-quantity.col-sm-2 > form > div > div.woocommerce-variation-add-to-cart.variations_button.woocommerce-variation-add-to-cart-enabled > div > input.input-text.qty.text`).first().selectOption(`2`); }
    {
      const _lbl = page.locator(`label[for="submit-all-products"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#submit-all-products`).filter({ visible: true }).first().click({ force: true }); }
    }
  });

  test('My Account links and Login', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.waitForLoadState('load');
    vars.pass = `${vars.password ?? ''}`;
    await login(page, vars);
    await page.locator(`xpath=//a[contains(text(), "Development Training")]`).or(page.locator(`a[href*="/my-account/development-training/"]`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.product`)).not.toHaveCount(0);
    await page.locator(`xpath=//a[contains(text(), "Manage Subscriptions")]`).or(page.locator(`a[href*="/my-account/subscriptions/"]`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.no_subscriptions`)).not.toHaveCount(0);
    await page.locator(`xpath=//a[contains(text(), "Company details")]`).or(page.locator(`a[href*="/my-account/company-address/"]`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.woocommerce-MyAccount-content`)).not.toHaveCount(0);
    await page.locator(`xpath=//a[contains(text(), "Payment methods")]`).or(page.locator(`a[href*="/my-account/payment-methods/"]`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.wc-block-components-notice-banner__content`).or(page.locator(`.woocommerce-info`)).first()).toContainText(`No saved methods found.`);
    await page.locator(`xpath=//a[contains(text(), "History")]`).or(page.locator(`a[href*="/my-account/orders/"]`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.wc-block-components-notice-banner__content`).or(page.locator(`.woocommerce-info`)).first()).toContainText(`No order has been made yet.`);
    await page.locator(`xpath=//a[contains(text(), "Change password")]`).or(page.locator(`a[href*="/my-account/edit-account/"]`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`label[for="password_current"]`).first()).toContainText(`Current password (leave blank to leave unchanged)`);
    await expect(page.locator(`label[for="password_1"]`).first()).toContainText(`New password (leave blank to leave unchanged)`);
    await expect(page.locator(`label[for="password_2"]`).first()).toContainText(`Confirm new password`);
    await page.locator(`xpath=//a[contains(text(), "Billing Logout")]`).or(page.locator(`a[href*="/my-account/customer-logout/?_wpnonce="]`)).filter({ visible: true }).first().click({ force: true });
    try { await page.locator(`#username`).first().fill(`saucal@2mnetworks.com`); } catch { await page.locator(`#username`).first().selectOption(`saucal@2mnetworks.com`); }
    try { await page.locator(`#password`).first().fill(`2d$*Lj8vZN5q5hKE3SHyN5A(`); } catch { await page.locator(`#password`).first().selectOption(`2d$*Lj8vZN5q5hKE3SHyN5A(`); }
    await expect(page.locator(`form.woocommerce-form > h4`).first()).toContainText(`Your billing account credentials may be different to your form builder account credentials.`);
  });

  test('Products page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    vars.pass = `${vars.password ?? ''}`;
    await login(page, vars);
  });

});
