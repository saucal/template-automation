// @ts-nocheck
// Auto-generated from Ghost Inspector suite: "Leggari Academy - Basic WooCommerce test"
// Review all TODOs before running.
import dotenv from 'dotenv';
dotenv.config();
import { test, expect } from '@playwright/test';
import { blockUI, scrollFullPage } from '../helpers/common-steps-for-all-projects';
import { closePopupContact, extractUserFromEmail, fillCC, login } from '../helpers/leggari-academy-common-steps';

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

test.describe('Leggari Academy - Basic WooCommerce test', () => {

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
    "password": process.env.PASSWORD ?? '',
  }, { get: (o: Record<string, string>, k: string) => (k in o ? o[k] : '') });

  test('01 - Home page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.waitForLoadState('load');
    await scrollFullPage(page, vars);
    await closePopupContact(page, vars);
    await expect(page.locator(`body > div.elementor > section.elementor-section.elementor-top-section.elementor-element.elementor-section-full_width.sales-page-hero.elementor-section-height-default.elementor-section-height-default > div.elementor-container.elementor-column-gap-default > div.elementor-column.elementor-col-50.elementor-top-column.elementor-element > div > section > div > div > div > div.elementor-element.elementor-align-justify.elementor-mobile-align-center.pricing.elementor-widget.elementor-widget-button > div > div > a > span > span`).first()).toContainText(`Join Leggari  Academy`);
    {
      let _ok = false;
      if (!_ok) { try { await page.locator(`iframe[src*="player.vimeo.com"]`).first().contentFrame().locator(`.vp-target`).first().click({ force: true }); _ok = true; } catch {} }
      if (!_ok) throw new Error('No clickable candidate matched');
    }
    {
      let _ok = false;
      if (!_ok) { try { await page.locator(`iframe[src*="player.vimeo.com"]`).first().contentFrame().locator(`.vp-target`).first().click({ force: true }); _ok = true; } catch {} }
      if (!_ok) throw new Error('No clickable candidate matched');
    }
    await page.locator(`.elementor-element.elementor-element-8bd68c9 > .elementor-widget-container > .elementor-toggle > .elementor-toggle-item > .elementor-tab-title > .elementor-toggle-icon.elementor-toggle-icon-right > .elementor-toggle-icon-closed > svg.e-fas-caret-down`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`.elementor-element.elementor-element-dfb6af6 > .elementor-widget-container > .elementor-toggle > .elementor-toggle-item > .elementor-tab-title > .elementor-toggle-icon.elementor-toggle-icon-right > .elementor-toggle-icon-closed > svg.e-fas-caret-down`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.elementor-element.elementor-element-8bd68c9 > .elementor-widget-container > .elementor-toggle > .elementor-toggle-item > .elementor-tab-content.elementor-clearfix > p`).first()).toContainText(`Leggari Academy offers a more comprehensive learning experience compared to our previous in-person trainings. The online format allows us to dive deeper into each topic, providing detailed insights and covering all aspects of an installation to better reflect real-world scenarios. Although live training provided hands-on experience, it had limitations in terms of time, space, and controlled environments. Contrary to popular belief, we found that hands-on practice during live training didn’t necessarily guarantee immediate proficiency, as most attendees still needed to practice after the class to truly master the process. With this in mind, we decided to prioritize the delivery of extensive information through Leggari Academy’s online platform, ensuring a more effective and accessible learning experience.`);
    await expect(page.locator(`.elementor-element.elementor-element-dfb6af6 > .elementor-widget-container > .elementor-toggle > .elementor-toggle-item > .elementor-tab-content.elementor-clearfix > p`).first()).toContainText(`Absolutely, there is significant demand for more installers in the coatings industry. The need for skilled workers currently exceeds the supply, and this trend is expected to continue for years to come. We developed Leggari Academy over two years in response to the growing demand for various coating applications. Our training encompasses both indoor and outdoor applications, such as countertops, floors, and walls, with plans to add more systems at no extra cost. Leggari Academy’s comprehensive approach, covering nine systems, enables students to work year-round, regardless of the season. The widespread exposure of coatings and resurfacing techniques on social media has increased global interest in these services, further emphasizing the need for more trained installers.`);
  });

  test('02 - Terms of Use', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.locator(`xpath=//span[contains(text(), "Terms of Use")]`).or(page.locator(`a[href*="/terms-of-use/"] > .elementor-icon-list-text`)).filter({ visible: true }).first().click({ force: true });
  });

  test('03 - Disclaimer', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.locator(`xpath=//span[contains(text(), "Disclaimer")]`).or(page.locator(`a[href*="/disclaimer/"] > .elementor-icon-list-text`)).filter({ visible: true }).first().click({ force: true });
  });

  test('04 - Privacy Policy', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.locator(`xpath=//span[contains(text(), "Privacy  Policy")]`).or(page.locator(`a[href*="/privacy-policy/"] > .elementor-icon-list-text`)).filter({ visible: true }).first().click({ force: true });
  });

  test('05 - Cookie Policy', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.locator(`xpath=//span[contains(text(), "Cookie Policy")]`).or(page.locator(`a[href*="/cookie-policy/"] > .elementor-icon-list-text`)).filter({ visible: true }).first().click({ force: true });
  });

  test('06 - Refund Policy', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.locator(`xpath=//span[contains(text(), "Refund Policy")]`).or(page.locator(`a[href*="/refund-policy/"] > .elementor-icon-list-text`)).filter({ visible: true }).first().click({ force: true });
  });

  test('07 - Checkout page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.locator(`div.elementor-element.e-con-full.e-con.e-child:nth-of-type(2) > .elementor-element.elementor-align-center.pricing.elementor-widget.elementor-widget-button > .elementor-widget-container > .elementor-button-wrapper > a[href="#pricing"].elementor-button.elementor-button-link > .elementor-button-content-wrapper > .elementor-button-text`).or(page.locator(`body > div.elementor.elementor-17691 > div.elementor-element.elementor-element-5d2f1f9.e-con-full.elementor-hidden-tablet.elementor-hidden-mobile.e-flex.e-con.e-parent.e-lazyloaded > div.elementor-element.elementor-element-80b20c6.e-con-full.e-flex.e-con.e-child > div.elementor-element.elementor-element-4153ba5.elementor-align-center.elementor-mobile-align-center.pricing.elementor-widget.elementor-widget-button > div > div > a`)).filter({ visible: true }).first().click({ force: true });
    vars.unitPrice = ((await page.locator(`#pricing > .elementor-container.elementor-column-gap-default > .elementor-column.elementor-top-column.elementor-element > .elementor-widget-wrap.elementor-element-populated > div.elementor-element.elementor-widget.elementor-widget-text-editor:nth-of-type(5) > .elementor-widget-container`).or(page.locator(`#pricing2 > div > div > div > div.elementor-element.elementor-element-8d74649.elementor-widget.elementor-widget-text-editor > div > p`)).or(page.locator(`#pricing2 > div > div > div > div.elementor-element.elementor-element-ff17608.elementor-widget.elementor-widget-text-editor > div`)).textContent()) ?? '').trim();
    await page.locator(`.elementor-element.elementor-align-center.main-cta-button > .elementor-widget-container > .elementor-button-wrapper > a[href*="/leggari-academy-checkout/?add-to-cart=17043&quantity=1"].elementor-button.elementor-button-link > .elementor-button-content-wrapper > .elementor-button-text`).or(page.locator(`#pricing2 > div > div > div > div.elementor-element.elementor-element-afb4471.elementor-align-center.elementor-widget-mobile__width-inherit.main-cta-button.elementor-widget.elementor-widget-button > div > div > a`)).filter({ visible: true }).first().click({ force: true });
    try {
      await expect(page.locator(`li.product-item:nth-of-type(1) > .product-item-wrapper`).first()).toHaveText(`One-time payment

($1799)`);
    } catch { /* optional step: assertText */ }
    await expect(page.locator(`li.product-item:nth-of-type(1) > .product-item-wrapper`).first()).toContainText(`($1799)`);
    try {
      await expect(page.locator(`li.product-item:nth-of-type(2) > .product-item-wrapper`).first()).toHaveText(`$999 + split-pay

(3 x $399)`);
    } catch { /* optional step: assertText */ }
    await expect(page.locator(`li.product-item:nth-of-type(2) > .product-item-wrapper`).first()).toContainText(`(3 x $399)`);
    try {
      await expect(page.locator(`li.product-item:nth-of-type(3) > .product-item-wrapper`).first()).toHaveText(`Split-pay

(2 x $999)`);
    } catch { /* optional step: assertText */ }
    await expect(page.locator(`li.product-item:nth-of-type(3) > .product-item-wrapper`).first()).toContainText(`(2 x $999)`);
    try {
      await expect(page.locator(`li.product-item:nth-of-type(4) > .product-item-wrapper`).first()).toHaveText(`$199 + split-pay

(11 x $199)`);
    } catch { /* optional step: assertText */ }
    await expect(page.locator(`li.product-item:nth-of-type(4) > .product-item-wrapper`).first()).toContainText(`(11 x $199)`);
    await expect(page.locator(`.product-total > .woocommerce-Price-amount.amount > bdi`)).not.toHaveCount(0);
    await expect(page.locator(`.future-payments-detail > .woocommerce-Price-amount.amount > bdi`)).not.toHaveCount(0);
    await expect(page.locator(`.final-payment-details > .woocommerce-Price-amount.amount > bdi`)).not.toHaveCount(0);
  });

  test('08 - Checkout page - required', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.locator(`div.elementor-element.e-con-full.e-con.e-child:nth-of-type(2) > .elementor-element.elementor-align-center.pricing.elementor-widget.elementor-widget-button > .elementor-widget-container > .elementor-button-wrapper > a[href="#pricing"].elementor-button.elementor-button-link > .elementor-button-content-wrapper > .elementor-button-text`).or(page.locator(`body > div.elementor.elementor-17691 > div.elementor-element.elementor-element-5d2f1f9.e-con-full.elementor-hidden-tablet.elementor-hidden-mobile.e-flex.e-con.e-parent.e-lazyloaded > div.elementor-element.elementor-element-80b20c6.e-con-full.e-flex.e-con.e-child > div.elementor-element.elementor-element-4153ba5.elementor-align-center.elementor-mobile-align-center.pricing.elementor-widget.elementor-widget-button > div > div > a`)).filter({ visible: true }).first().click({ force: true });
    await page.locator(`.elementor-element.elementor-align-center.main-cta-button > .elementor-widget-container > .elementor-button-wrapper > a[href*="/leggari-academy-checkout/?add-to-cart=17043&quantity=1"].elementor-button.elementor-button-link > .elementor-button-content-wrapper > .elementor-button-text`).or(page.locator(`#pricing2 > div > div > div > div.elementor-element.elementor-element-afb4471.elementor-align-center.elementor-widget-mobile__width-inherit.main-cta-button.elementor-widget.elementor-widget-button > div > div > a`)).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    await blockUI(page, vars);
    {
      const _lbl = page.locator(`label[for="place_order"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#place_order`).or(page.locator(`xpath=//button[contains(text(), "Get Leggari Academy Now!")]`)).filter({ visible: true }).first().click({ force: true }); }
    }
    await expect(page.locator(`.woocommerce-error > li`).first()).toContainText(`Your card number is incomplete.`);
    {
      let _ok = false;
      if (!_ok) { try { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`#payment-numberInput`).first().click({ force: true }); _ok = true; } catch {} }
      if (!_ok) throw new Error('No clickable candidate matched');
    }
    await fillCC(page, vars);
    {
      const _lbl = page.locator(`label[for="place_order"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`xpath=//button[contains(text(), "Get Leggari Academy Now!")]`).or(page.locator(`#place_order`)).filter({ visible: true }).first().click({ force: true }); }
    }
    try {
      await expect(page.locator(`.woocommerce-error`).first()).toHaveText(`Billing Email * is a required field.
Billing Create account password * is a required field.
Billing First name * is a required field.
Billing Last name * is a required field.
Billing Phone number * is a required field.
Billing Preferred language * is a required field.
Shipping Street address * is a required field.
Shipping City * is a required field.
Shipping Zip Code * is a required field.
Please read and accept the terms and conditions to proceed with your order.`);
    } catch { /* optional step: assertText */ }
  });

  test('09 - Login & My Account', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await login(page, vars);
    await page.locator(`xpath=//a[contains(text(), "Memberships")]`).or(page.locator(`a[href*="/membership-account/members-area/"]`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.woocommerce-account-my-memberships > p`).first()).toContainText(`Looks like you don't have a membership yet!`);
    await page.locator(`xpath=//a[contains(text(), "Payment methods")]`).or(page.locator(`a[href*="/membership-account/payment-methods/"]`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.woocommerce-info`).first()).toContainText(`No saved methods found.`);
    await page.locator(`xpath=//a[contains(text(), "Account details")]`).or(page.locator(`a[href*="/membership-account/edit-account/"]`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`form.woocommerce-EditAccountForm`)).not.toHaveCount(0);
    await page.locator(`xpath=//a[contains(text(), "Dashboard")]`).or(page.locator(`.woocommerce-MyAccount-navigation-link.woocommerce-MyAccount-navigation-link--dashboard > a[href*="/membership-account/"]`)).filter({ visible: true }).first().click({ force: true });
    await page.locator(`xpath=//a[contains(text(), "Log out")]`).or(page.locator(`a[href*="/wp-login.php?action=logout&redirect_to=https%3A%2F%2Fstg-schoolofepoxy-staging.kinsta.cloud%2Fmembership-account%2F&_wpnonce=ac872c2111"]`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`form.woocommerce-form`)).not.toHaveCount(0);
  });

  test('10 - Forgot Password flow', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.locator(`xpath=//span[contains(text(), "Members Login")]`).or(page.locator(`a[href*="/login/"] > .elementor-icon-list-text`)).filter({ visible: true }).first().click({ force: true });
    await page.locator(`xpath=//a[contains(text(), "Lost your password?")]`).or(page.locator(`a[href*="/login/lost-password/"]`)).filter({ visible: true }).first().click({ force: true });
    {
      const _lbl = page.locator(`label[for="user_login"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#user_login`).filter({ visible: true }).first().click({ force: true }); }
    }
    try { await page.locator(`#user_login`).first().fill(`${vars.username ?? ''}`); } catch { await page.locator(`#user_login`).first().selectOption(`${vars.username ?? ''}`); }
    await page.locator(`xpath=//button[contains(text(), "Reset password")]`).or(page.locator(`button[type="submit"]`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.woocommerce-message`).first()).toContainText(`Password reset email has been sent.`);
    await extractUserFromEmail(page, vars);
    await page.locator(`xpath=//a[contains(text(), "Password Reset Request")]`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`xpath=//a[contains(text(), "Click here to reset your password")]`).or(page.locator(`a[href*="membership-account/lost-password/?key="]`)).filter({ visible: true }).first().click({ force: true });
    try { await page.locator(`#password_1`).first().fill(`xOvH5u7k0sSz41eW1kUZDBcR830BwhdhQS`); } catch { await page.locator(`#password_1`).first().selectOption(`xOvH5u7k0sSz41eW1kUZDBcR830BwhdhQS`); }
    try { await page.locator(`#password_2`).first().fill(`xOvH5u7k0sSz41eW1kUZDBcR830BwhdhQS`); } catch { await page.locator(`#password_2`).first().selectOption(`xOvH5u7k0sSz41eW1kUZDBcR830BwhdhQS`); }
    await page.locator(`xpath=//button[contains(text(), "Save")]`).or(page.locator(`button[type="submit"]`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.woocommerce-message`).first()).toContainText(`Your password has been reset successfully.`);
  });

});
