// @ts-nocheck
// Auto-generated from Ghost Inspector suite: "PLS - Basic WooCommerce Tests"
// Review all TODOs before running.
import dotenv from 'dotenv';
dotenv.config();
import { test, expect } from '@playwright/test';
import { login } from '../helpers/common-steps-for-all-projects';
import { forgotPasswordFlow } from '../helpers/pls-common-steps';

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

test.describe('PLS - Basic WooCommerce Tests', () => {

  const vars = new Proxy<Record<string, string>>({
    "email": `qa+gi_order_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "emailReg": `qa+gi_reg_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "emailForgot": `qa+gi_forgot_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "payPalUser": "qa+gi_sb-8eg0v132169@saucal.com",
    "payPalPass": process.env.PAY_PAL_PASS ?? '',
    "adminUser": "saucal_maintenance_admin",
    "adminPass": process.env.ADMIN_PASS ?? '',
    "firstName": "QA",
    "lastName": "Testing",
    "firstName3": "QA3",
    "lastName2": `${Math.random().toString(36).substring(2, 10)}-2`,
    "lastName3": `${Math.random().toString(36).substring(2, 10)}-3`,
    "email2": `qa+gi_part2-${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "email3": `qa+gi_part3-${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "phone2": "432-234-2344",
    "phone3": "123-765-0988",
    "credentials2": "RDA",
    "credentials3": "FTD",
    "professionalTitle": "QA Engineer",
    "phone": "1231231234",
    "subject": "Testing Subject",
    "message": "Testing message",
    "project": "pls",
    "password": "xOvH5u7k0sSz41eW1kUZDBcR830BwhdhQS",
    "password2": process.env.PASSWORD2 ?? '',
    "firstName2": "QA2",
    "multiSteps": "yes",
  }, { get: (o: Record<string, string>, k: string) => (k in o ? o[k] : '') });

  test('PLS - 01 - Home Page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.waitForLoadState('load');
  });

  test('PLS - 02 - All Courses', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.locator(`li.menu-item.menu-item-type-custom.menu-item-object-custom.menu-item-has-children:nth-of-type(2) > a.menu-link > .menu-text`).or(page.locator(`li.menu-item.menu-item-type-custom.menu-item-object-custom.menu-item-has-children.menu-item--has-toggle:nth-of-type(2) > a > .nav-drop-title-wrap`)).first().hover();
    await page.locator(`xpath=//span[contains(text(), "All CE Courses")]`).or(page.locator(`a[href*="/all-courses/"] > .menu-text`)).or(page.locator(`xpath=//a[contains(text(), "All CE Courses")]`)).or(page.locator(`a[href*="/all-courses/"]`)).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
  });

  test('PLS - 03 - Dental Hygiene Clinical Skills Refresher', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.locator(`li.menu-item.menu-item-type-custom.menu-item-object-custom.menu-item-has-children:nth-of-type(2) > a.menu-link > .menu-text`).or(page.locator(`li.menu-item.menu-item-type-custom.menu-item-object-custom.menu-item-has-children.menu-item--has-toggle:nth-of-type(2) > a > .nav-drop-title-wrap`)).first().hover();
    await page.locator(`xpath=//span[contains(text(), "Dental Hygiene Clinical Skills Refresher")]`).or(page.locator(`a[href*="/dental-hygiene-clinical-skills-refresher/"] > .menu-text`)).or(page.locator(`xpath=//a[contains(text(), "Dental Hygiene Clinical Skills Refresher")]`)).or(page.locator(`a[href*="/dental-hygiene-clinical-skills-refresher/"]`)).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    try { await page.locator(`#form-field-name`).or(page.locator(`#field116667cfd3a-4b`)).or(page.locator(`input[name="field7cfd3a-4b"]`)).first().fill(`${vars.firstName ?? ''} ${vars.lastName ?? ''}`); } catch { await page.locator(`#form-field-name`).or(page.locator(`#field116667cfd3a-4b`)).or(page.locator(`input[name="field7cfd3a-4b"]`)).first().selectOption(`${vars.firstName ?? ''} ${vars.lastName ?? ''}`); }
    try { await page.locator(`div.elementor-field-type-text.elementor-field-group.elementor-column:nth-of-type(2) > input[type="text"].elementor-field.elementor-field-textual`).or(page.locator(`#field11666de8245-65`)).or(page.locator(`#field119802ecfad-af`)).first().fill(`${vars.yearGraduate ?? ''}`); } catch { await page.locator(`div.elementor-field-type-text.elementor-field-group.elementor-column:nth-of-type(2) > input[type="text"].elementor-field.elementor-field-textual`).or(page.locator(`#field11666de8245-65`)).or(page.locator(`#field119802ecfad-af`)).first().selectOption(`${vars.yearGraduate ?? ''}`); }
    try { await page.locator(`div.elementor-field-type-text.elementor-field-group.elementor-column:nth-of-type(3) > input[type="text"].elementor-field.elementor-field-textual`).or(page.locator(`#field116661348e4-de`)).or(page.locator(`input[name="field1348e4-de"]`)).first().fill(`yes`); } catch { await page.locator(`div.elementor-field-type-text.elementor-field-group.elementor-column:nth-of-type(3) > input[type="text"].elementor-field.elementor-field-textual`).or(page.locator(`#field116661348e4-de`)).or(page.locator(`input[name="field1348e4-de"]`)).first().selectOption(`yes`); }
    try { await page.locator(`#form-field-email`).or(page.locator(`#field116662ecfad-af`)).or(page.locator(`input[name="field2ecfad-af"]`)).first().fill(`${vars.email ?? ''}`); } catch { await page.locator(`#form-field-email`).or(page.locator(`#field116662ecfad-af`)).or(page.locator(`input[name="field2ecfad-af"]`)).first().selectOption(`${vars.email ?? ''}`); }
    try { await page.locator(`#form-field-field_1c7ec3e`).or(page.locator(`#field11666c5d3c0-3b`)).or(page.locator(`input[name="fieldc5d3c0-3b"]`)).first().fill(`${vars.phone ?? ''}`); } catch { await page.locator(`#form-field-field_1c7ec3e`).or(page.locator(`#field11666c5d3c0-3b`)).or(page.locator(`input[name="fieldc5d3c0-3b"]`)).first().selectOption(`${vars.phone ?? ''}`); }
    try { await page.locator(`#form-field-field_0e73ef0`).or(page.locator(`#field1166665035e-f9`)).or(page.locator(`input[name="field10b98c-fb"]`)).first().fill(`10am`); } catch { await page.locator(`#form-field-field_0e73ef0`).or(page.locator(`#field1166665035e-f9`)).or(page.locator(`input[name="field10b98c-fb"]`)).first().selectOption(`10am`); }
    try { await page.locator(`#form-field-message`).or(page.locator(`#field11980c8da86-bb`)).or(page.locator(`textarea[name="fieldc8da86-bb"]`)).first().fill(`${vars.message ?? ''}`); } catch { await page.locator(`#form-field-message`).or(page.locator(`#field11980c8da86-bb`)).or(page.locator(`textarea[name="fieldc8da86-bb"]`)).first().selectOption(`${vars.message ?? ''}`); }
    await page.locator(`xpath=//span[contains(text(), "Submit")]`).or(page.locator(`button[type="submit"] > .elementor-button-content-wrapper > .elementor-button-text`)).or(page.locator(`button > span.kt-btn-inner-text`)).filter({ visible: true }).first().click({ force: true });
  });

  test('PLS - 04 - CE Requirements by State', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.locator(`li.menu-item.menu-item-type-custom.menu-item-object-custom.menu-item-has-children:nth-of-type(2) > a.menu-link > .menu-text`).or(page.locator(`li.menu-item.menu-item-type-custom.menu-item-object-custom.menu-item-has-children.menu-item--has-toggle:nth-of-type(2) > a > .nav-drop-title-wrap`)).first().hover();
    await page.locator(`xpath=//span[contains(text(), "CE Requirements by State")]`).or(page.locator(`a[href*="/state-continuing-education/"] > .menu-text`)).or(page.locator(`xpath=//a[contains(text(), "CE Requirements by State")]`)).or(page.locator(`a[href*="/state-continuing-education/"]`)).filter({ visible: true }).first().click({ force: true });
    {
      const _lbl = page.locator(`label[for="csearch"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#csearch`).filter({ visible: true }).first().click({ force: true }); }
    }
    try { await page.locator(`#csearch`).first().fill(`FL`); } catch { await page.locator(`#csearch`).first().selectOption(`FL`); }
    await page.locator(`input[type="submit"]`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
  });

  test('PLS - 05 - Private CE', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.locator(`xpath=//span[contains(text(), "Private CE")]`).or(page.locator(`a[href*="/consulting/"] > .menu-text`)).or(page.locator(`xpath=//a[contains(text(), "Private CE")]`)).or(page.locator(`a[href*="/consulting/"]`)).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
  });

  test('PLS - 06 - About us', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.locator(`xpath=//span[contains(text(), "FAQ")]`).or(page.locator(`a[href*="/faq/"] > .menu-text`)).or(page.locator(`xpath=//a[contains(text(), "FAQ")]`)).or(page.locator(`a[href*="/faq/"]`)).first().hover();
    await page.locator(`xpath=//span[contains(text(), "About")]`).or(page.locator(`a[href*="/about/"] > .menu-text`)).or(page.locator(`xpath=//a[contains(text(), "About")]`)).or(page.locator(`a[href*="/about/"]`)).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
  });

  test('PLS - 07 - Policies', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.locator(`xpath=//span[contains(text(), "FAQ")]`).or(page.locator(`a[href*="/faq/"] > .menu-text`)).or(page.locator(`xpath=//a[contains(text(), "FAQ")]`)).or(page.locator(`a[href*="/faq/"]`)).first().hover();
    await page.locator(`xpath=//span[contains(text(), "Policies")]`).or(page.locator(`a[href*="/policies/"] > .menu-text`)).or(page.locator(`xpath=//a[contains(text(), "Policies")]`)).or(page.locator(`a[href*="/policies/"]`)).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
  });

  test('PLS - 08 - Contact page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.locator(`xpath=//span[contains(text(), "Contact")]`).or(page.locator(`a[href*="/contact-us/"] > .menu-text`)).or(page.locator(`xpath=//a[contains(text(), "Contact")]`)).or(page.locator(`a[href*="/contact-us/"]`)).filter({ visible: true }).first().click({ force: true });
    try { await page.locator(`#form-field-name`).or(page.locator(`#field116436c9431-03`)).first().fill(`${vars.firstName ?? ''}`); } catch { await page.locator(`#form-field-name`).or(page.locator(`#field116436c9431-03`)).first().selectOption(`${vars.firstName ?? ''}`); }
    try { await page.locator(`#form-field-field_a21cf9d`).or(page.locator(`#field116433b1450-0a`)).first().fill(`${vars.lastName ?? ''}`); } catch { await page.locator(`#form-field-field_a21cf9d`).or(page.locator(`#field116433b1450-0a`)).first().selectOption(`${vars.lastName ?? ''}`); }
    try { await page.locator(`div.elementor-field-type-text.elementor-field-group.elementor-column:nth-of-type(3) > input[type="text"].elementor-field.elementor-field-textual`).or(page.locator(`#field116438d0074-d7`)).first().fill(`${vars.professionalTitle ?? ''}`); } catch { await page.locator(`div.elementor-field-type-text.elementor-field-group.elementor-column:nth-of-type(3) > input[type="text"].elementor-field.elementor-field-textual`).or(page.locator(`#field116438d0074-d7`)).first().selectOption(`${vars.professionalTitle ?? ''}`); }
    try { await page.locator(`#form-field-email`).or(page.locator(`#field11643a07267-04`)).first().fill(`${vars.email ?? ''}`); } catch { await page.locator(`#form-field-email`).or(page.locator(`#field11643a07267-04`)).first().selectOption(`${vars.email ?? ''}`); }
    try { await page.locator(`input[title="Only numbers and phone characters (#, -, *, etc) are accepted."]`).or(page.locator(`#field116436ed816-6f`)).first().fill(`${vars.phone ?? ''}`); } catch { await page.locator(`input[title="Only numbers and phone characters (#, -, *, etc) are accepted."]`).or(page.locator(`#field116436ed816-6f`)).first().selectOption(`${vars.phone ?? ''}`); }
    try { await page.locator(`div.elementor-field-type-text.elementor-field-group.elementor-column:nth-of-type(6) > input[type="text"].elementor-field.elementor-field-textual`).or(page.locator(`#field1164301677e-26`)).first().fill(`${vars.subject ?? ''}`); } catch { await page.locator(`div.elementor-field-type-text.elementor-field-group.elementor-column:nth-of-type(6) > input[type="text"].elementor-field.elementor-field-textual`).or(page.locator(`#field1164301677e-26`)).first().selectOption(`${vars.subject ?? ''}`); }
    try { await page.locator(`#form-field-message`).or(page.locator(`#field116436987af-f5`)).first().fill(`${vars.message ?? ''}`); } catch { await page.locator(`#form-field-message`).or(page.locator(`#field116436987af-f5`)).first().selectOption(`${vars.message ?? ''}`); }
    await page.locator(`xpath=//span[contains(text(), "Send")]`).or(page.locator(`.elementor-button-text`)).or(page.locator(`xpath=//span[contains(text(), "Submit")]`)).or(page.locator(`button > span.kt-btn-inner-text`)).filter({ visible: true }).first().click({ force: true });
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector('.elementor-message')

return element !== null
 }, vars)) {
      await expect(page.locator(`.elementor-message`).or(page.locator(`.kb-adv-form-message.kb-adv-form-success`)).first()).toContainText(`Your submission was successful.`);
    }
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector<HTMLFormElement>('.kb-adv-form-message.kb-adv-form-success')

return element !== null }, vars)) {
      await expect(page.locator(`.elementor-message`).or(page.locator(`.kb-adv-form-message.kb-adv-form-success`)).first()).toContainText(`Submission Success, Thanks for getting in touch!`);
    }
  });

  test('PLS - 09 - Blog page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.locator(`xpath=//span[contains(text(), "Blog")]`).or(page.locator(`a[href*="/blog/"] > .menu-text`)).or(page.locator(`xpath=//a[contains(text(), "Blog")]`)).or(page.locator(`a[href*="/blog/"]`)).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
  });

  test('PLS - 10 - Post page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.goto(`${vars.startUrl ?? ''}adolescent-bulimia-and-vaping/`);
    await page.waitForLoadState('load');
    await page.waitForLoadState('load');
  });

  test('PLS - 11 - Login & My Account', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.locator(`xpath=//span[contains(text(), "My account")]`).or(page.locator(`a[href*="/my-account/"] > .menu-text`)).or(page.locator(`xpath=//a[contains(text(), "My account")]`)).or(page.locator(`a[href*="/my-account/"]`)).filter({ visible: true }).first().click({ force: true });
    vars.username = `qa+gi_staging_user@saucal.com`;
    vars.pass = `${vars.password ?? ''}`;
    await login(page, vars);
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let element = document.querySelector('.woocommerce-error > li')

return element !== null }, vars)) {
      vars.pass = `${vars.password2 ?? ''}`;
    }
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let element = document.querySelector('.woocommerce-error > li')

return element !== null }, vars)) {
      await login(page, vars);
    }
    await expect(page.locator(`.woocommerce-MyAccount-content`)).not.toHaveCount(0);
    await page.locator(`.woocommerce-MyAccount-navigation-link > a[href*="/my-account/orders/"]`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.woocommerce-message`).or(page.locator(`.woocommerce-info`)).first()).toContainText(`No order has been made yet.`);
    await page.locator(`a[href*="/my-account/subscriptions/"] > .ast-woo-nav-link-name`).or(page.locator(`a[href*="/my-account/subscriptions/"]`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.no_subscriptions`)).not.toHaveCount(0);
    try {
      await expect(page.locator(`a[href*="/my-courses"].woocommerce-button`).first()).toContainText(`Access your active on-demand webinars`);
    } catch { /* optional step: assertTextPresent */ }
    await page.locator(`xpath=//span[contains(text(), "Coupons")]`).or(page.locator(`a[href*="/my-account/wc-smart-coupons/"] > .ast-woo-nav-link-name`)).or(page.locator(`a[href*="/my-account/wc-smart-coupons/"]`)).or(page.locator(`xpath=//a[contains(text(), "Coupons")]`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.woocommerce-MyAccount-content > h2`).first()).toHaveText(`Available Coupons & Store Credits`);
    await page.locator(`xpath=//span[contains(text(), "Address")]`).or(page.locator(`a[href*="/my-account/edit-address/"] > .ast-woo-nav-link-name`)).or(page.locator(`a[href*="/my-account/edit-address/"]`)).or(page.locator(`xpath=//a[contains(text(), "Address")]`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.woocommerce-MyAccount-content .woocommerce-Address-title.title`)).not.toHaveCount(0);
    await page.locator(`xpath=//span[contains(text(), "Payment methods")]`).or(page.locator(`a[href*="/my-account/payment-methods/"] > .ast-woo-nav-link-name`)).or(page.locator(`a[href*="/my-account/payment-methods/"]`)).or(page.locator(`xpath=//a[contains(text(), "Payment methods")]`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.woocommerce-info`).first()).toContainText(`No saved methods found.`);
    await page.locator(`xpath=//span[contains(text(), "Account details")]`).or(page.locator(`a[href*="/my-account/edit-account/"] > .ast-woo-nav-link-name`)).or(page.locator(`a[href*="/my-account/edit-account/"]`)).or(page.locator(`xpath=//a[contains(text(), "Account details")]`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`form.woocommerce-EditAccountForm`)).not.toHaveCount(0);
    await page.locator(`li.woocommerce-MyAccount-navigation-link.woocommerce-MyAccount-navigation-link--dashboard`).filter({ visible: true }).first().click({ force: true });
  });

  test('PLS - 12 - Forgot Password? flow', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await forgotPasswordFlow(page, vars);
    await page.locator(`xpath=//span[contains(text(), "Log out")]`).or(page.locator(`a[href*='/my-account/customer-logout/']`)).filter({ visible: true }).first().click({ force: true });
    vars.pass = `${vars.password2 ?? ''}`;
    await login(page, vars);
    await page.locator(`.woocommerce-MyAccount-content`).filter({ visible: true }).first().click({ force: true });
  });

  test('PLS - 13 - Course page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    // ↓ PLS - 02 - All Courses
    await page.locator(`li.menu-item.menu-item-type-custom.menu-item-object-custom.menu-item-has-children:nth-of-type(2) > a.menu-link > .menu-text`).or(page.locator(`li.menu-item.menu-item-type-custom.menu-item-object-custom.menu-item-has-children.menu-item--has-toggle:nth-of-type(2) > a > .nav-drop-title-wrap`)).first().hover();
    await page.locator(`xpath=//span[contains(text(), "All CE Courses")]`).or(page.locator(`a[href*="/all-courses/"] > .menu-text`)).or(page.locator(`xpath=//a[contains(text(), "All CE Courses")]`)).or(page.locator(`a[href*="/all-courses/"]`)).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    // ↑ end PLS - 02 - All Courses
    await page.locator(`ul.products > li.product-type-subscription.instock a`).or(page.locator(`ul.products > li.product-type-variable-subscription.instock a`)).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    await expect(page.locator(`div.quantity > input[name*="quantity"]`).first()).toBeVisible();
  });

  test('PLS - 14 - Cart page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    // ↓ PLS - 02 - All Courses
    await page.locator(`li.menu-item.menu-item-type-custom.menu-item-object-custom.menu-item-has-children:nth-of-type(2) > a.menu-link > .menu-text`).or(page.locator(`li.menu-item.menu-item-type-custom.menu-item-object-custom.menu-item-has-children.menu-item--has-toggle:nth-of-type(2) > a > .nav-drop-title-wrap`)).first().hover();
    await page.locator(`xpath=//span[contains(text(), "All CE Courses")]`).or(page.locator(`a[href*="/all-courses/"] > .menu-text`)).or(page.locator(`xpath=//a[contains(text(), "All CE Courses")]`)).or(page.locator(`a[href*="/all-courses/"]`)).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    // ↑ end PLS - 02 - All Courses
    vars.unitPriceComplete = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const firstProductTop = Array.from<any>(document.querySelectorAll(
  "ul.products > li.product-type-subscription.instock .price, ul.products > li.product-type-variable-subscription.instock .price .amount"
))[2];

const unitPriceComplete = firstProductTop.textContent

return unitPriceComplete }, vars);
    await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const firstProductTop = Array.from<any>(document.querySelectorAll(
  "ul.products > li.product-type-subscription.instock, ul.products > li.product-type-variable-subscription.instock"
))[2];

const firstLink = firstProductTop.querySelector("a");

if (firstLink) {
  firstLink.click();
} else {
  console.log("No product found in stock");
} }, vars);
    vars.prodDesc = ((await page.locator(`h1.product_title`).textContent()) ?? '').trim();
    vars.prodDesc = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const desc = `${vars.prodDesc}`.replaceAll('–' , '-')

return desc }, vars);
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector('#pa_choose-subscription_period')

return element !== null && element !== undefined  }, vars)) {
      try { await page.locator(`#pa_choose-subscription_period`).first().fill(`7days`); } catch { await page.locator(`#pa_choose-subscription_period`).first().selectOption(`7days`); }
    }
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector('#pa_choose-subscription_period')

return element !== null && element !== undefined  }, vars)) {
      vars.days = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return document.querySelector<HTMLSelectElement>('select#pa_choose-subscription_period > option[value="7days"]').textContent }, vars);
    }
    await expect(page.locator(`div.woocommerce-variation-price > span > span.woocommerce-Price-amount.amount > bdi`).or(page.locator(`div.woocommerce-variation-price > .price`)).first()).toContainText(`${vars.unitPriceComplete ?? ''}`);
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector<HTMLFormElement>('form > table[aria-label="Product Details"].woocommerce-product-attributes.shop_attributes > tbody > tr.woocommerce-product-attributes-item.woocommerce-product-attributes-item--attribute_pa_date > td.woocommerce-product-attributes-item__value > p')

return element !== null && element !== undefined }, vars)) {
      vars.date = ((await page.locator(`form > table[aria-label="Product Details"].woocommerce-product-attributes.shop_attributes > tbody > tr.woocommerce-product-attributes-item.woocommerce-product-attributes-item--attribute_pa_date > td.woocommerce-product-attributes-item__value > p`).textContent()) ?? '').trim();
    }
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector<HTMLFormElement>('form > table[aria-label="Product Details"].woocommerce-product-attributes.shop_attributes > tbody > tr.woocommerce-product-attributes-item.woocommerce-product-attributes-item--attribute_pa_time-specific > td.woocommerce-product-attributes-item__value > p')

return element !== null && element !== undefined }, vars)) {
      vars.time = ((await page.locator(`form > table[aria-label="Product Details"].woocommerce-product-attributes.shop_attributes > tbody > tr.woocommerce-product-attributes-item.woocommerce-product-attributes-item--attribute_pa_time-specific > td.woocommerce-product-attributes-item__value > p`).textContent()) ?? '').trim();
    }
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector<HTMLAnchorElement>('form > table[aria-label="Product Details"].woocommerce-product-attributes.shop_attributes > tbody > tr.woocommerce-product-attributes-item.woocommerce-product-attributes-item--attribute_pa_location > td.woocommerce-product-attributes-item__value > p > a[href*="/location/"]')

return element !== null && element !== undefined }, vars)) {
      vars.location = ((await page.locator(`form > table[aria-label="Product Details"].woocommerce-product-attributes.shop_attributes > tbody > tr.woocommerce-product-attributes-item.woocommerce-product-attributes-item--attribute_pa_location > td.woocommerce-product-attributes-item__value > p > a[href*="/location/"]`).textContent()) ?? '').trim();
    }
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector<HTMLFormElement>('form > table[aria-label="Product Details"].woocommerce-product-attributes.shop_attributes > tbody > tr.woocommerce-product-attributes-item.woocommerce-product-attributes-item--attribute_pa_ceus > td.woocommerce-product-attributes-item__value > p')

return element !== null && element !== undefined }, vars)) {
      vars.ceus = ((await page.locator(`form > table[aria-label="Product Details"].woocommerce-product-attributes.shop_attributes > tbody > tr.woocommerce-product-attributes-item.woocommerce-product-attributes-item--attribute_pa_ceus > td.woocommerce-product-attributes-item__value > p`).textContent()) ?? '').trim();
    }
    vars.qty = `3`;
    try { await page.locator(`#pl_subscriptions_quantity`).or(page.locator(`input.qty`)).first().fill(`${vars.qty ?? ''}`); } catch { await page.locator(`#pl_subscriptions_quantity`).or(page.locator(`input.qty`)).first().selectOption(`${vars.qty ?? ''}`); }
    if ((() => { const multiSteps = vars.multiSteps

return multiSteps !== 'yes' })()) {
      await page.locator(`label[for="pl_subscriptions_me"]`).filter({ visible: true }).first().click({ force: true });
    }
    if ((() => { const multiSteps = vars.multiSteps

return multiSteps !== 'yes' })()) {
      try { await page.locator(`input[name="pl_recipient_email[0]"]`).first().fill(`${vars.email2 ?? ''}`); } catch { await page.locator(`input[name="pl_recipient_email[0]"]`).first().selectOption(`${vars.email2 ?? ''}`); }
    }
    if ((() => { const multiSteps = vars.multiSteps

return multiSteps !== 'yes' })()) {
      try { await page.locator(`input[name="pl_recipient_firstname[0]"]`).first().fill(`${vars.firstName2 ?? ''}`); } catch { await page.locator(`input[name="pl_recipient_firstname[0]"]`).first().selectOption(`${vars.firstName2 ?? ''}`); }
    }
    if ((() => { const multiSteps = vars.multiSteps

return multiSteps !== 'yes' })()) {
      try { await page.locator(`input[name="pl_recipient_lastname[0]"]`).first().fill(`${vars.lastName2 ?? ''}`); } catch { await page.locator(`input[name="pl_recipient_lastname[0]"]`).first().selectOption(`${vars.lastName2 ?? ''}`); }
    }
    if ((() => { const multiSteps = vars.multiSteps

return multiSteps !== 'yes' })()) {
      try { await page.locator(`input[name="pl_recipient_phone[0]"]`).first().fill(`${vars.phone2 ?? ''}`); } catch { await page.locator(`input[name="pl_recipient_phone[0]"]`).first().selectOption(`${vars.phone2 ?? ''}`); }
    }
    if ((() => { const multiSteps = vars.multiSteps

return multiSteps !== 'yes' })()) {
      try { await page.locator(`select[name="pl_recipient_credentials[0]"]`).first().fill(`${vars.credentials2 ?? ''}`); } catch { await page.locator(`select[name="pl_recipient_credentials[0]"]`).first().selectOption(`${vars.credentials2 ?? ''}`); }
    }
    if ((() => { const multiSteps = vars.multiSteps

return multiSteps !== 'yes' })()) {
      try { await page.locator(`input[name="pl_recipient_email[1]"]`).first().fill(`${vars.email3 ?? ''}`); } catch { await page.locator(`input[name="pl_recipient_email[1]"]`).first().selectOption(`${vars.email3 ?? ''}`); }
    }
    if ((() => { const multiSteps = vars.multiSteps

return multiSteps !== 'yes' })()) {
      try { await page.locator(`input[name="pl_recipient_firstname[1]"]`).first().fill(`${vars.firstName3 ?? ''}`); } catch { await page.locator(`input[name="pl_recipient_firstname[1]"]`).first().selectOption(`${vars.firstName3 ?? ''}`); }
    }
    if ((() => { const multiSteps = vars.multiSteps

return multiSteps !== 'yes' })()) {
      try { await page.locator(`input[name="pl_recipient_lastname[1]"]`).first().fill(`${vars.lastName3 ?? ''}`); } catch { await page.locator(`input[name="pl_recipient_lastname[1]"]`).first().selectOption(`${vars.lastName3 ?? ''}`); }
    }
    if ((() => { const multiSteps = vars.multiSteps

return multiSteps !== 'yes' })()) {
      try { await page.locator(`input[name="pl_recipient_phone[1]"]`).first().fill(`${vars.phone3 ?? ''}`); } catch { await page.locator(`input[name="pl_recipient_phone[1]"]`).first().selectOption(`${vars.phone3 ?? ''}`); }
    }
    if ((() => { const multiSteps = vars.multiSteps

return multiSteps !== 'yes' })()) {
      await expect(page.locator(`select[name="pl_recipient_credentials[1]"]`).first()).toHaveText(`RDH`);
    }
    if ((() => { const multiSteps = vars.multiSteps

return multiSteps !== 'yes' })()) {
      try { await page.locator(`select[name="pl_recipient_credentials[1]"]`).first().fill(`${vars.credentials3 ?? ''}`); } catch { await page.locator(`select[name="pl_recipient_credentials[1]"]`).first().selectOption(`${vars.credentials3 ?? ''}`); }
    }
    await page.locator(`xpath=//button[contains(text(), "Sign up now")]`).or(page.locator(`button[name="add-to-cart"]`)).filter({ visible: true }).first().click({ force: true });
    await page.locator(`xpath=//a[contains(text(), "View cart")]`).or(page.locator(`a.button.wc-forward:not(.checkout)`)).filter({ visible: true }).first().click({ force: true });
    if (vars.days === '') {
      await expect(page.locator(`.ast-product-name > a[href*="/product/"]`).or(page.locator(`tr.woocommerce-cart-form__cart-item.cart_item:nth-of-type(1) > td.product-name > a[href*="/product/"]`)).first()).toHaveText(`${vars.prodDesc ?? ''}`);
    }
    if ((() => { const multiSteps = vars.multiSteps

return multiSteps !== 'yes' && vars.days === '' })()) {
      await expect(page.locator(`.ast-product-name > a[href*="/product/"]`).or(page.locator(`tr.woocommerce-cart-form__cart-item.cart_item:nth-of-type(2) > td.product-name > a[href*="/product/"]`)).first()).toHaveText(`${vars.prodDesc ?? ''}`);
    }
    if ((() => { const multiSteps = vars.multiSteps

return multiSteps !== 'yes' && vars.days === '' })()) {
      await expect(page.locator(`.ast-product-name > a[href*="/product/"]`).or(page.locator(`tr.woocommerce-cart-form__cart-item.cart_item:nth-of-type(3) > td.product-name > a[href*="/product/"]`)).first()).toHaveText(`${vars.prodDesc ?? ''}`);
    }
    if ((() => { const multiSteps = vars.multiSteps

return multiSteps !== 'yes' })()) {
      await expect(page.locator(`tr.woocommerce-cart-form__cart-item.cart_item:nth-of-type(2) > td.product-name > fieldset > .wcsg_add_recipient_fields > .form-row.form-row.woocommerce_subscriptions_gifting_recipient_email > input[placeholder="recipient@example.com"][type="email"].input-text.recipient_email`).first()).toHaveText(`${vars.email2 ?? ''}`);
    }
    if ((() => { const multiSteps = vars.multiSteps

return multiSteps !== 'yes' })()) {
      await expect(page.locator(`tr.woocommerce-cart-form__cart-item.cart_item:nth-of-type(2) > td.product-name > fieldset > .wcsg_add_recipient_fields > p.form-row:nth-of-type(2) > input[type="text"].input-text.recipient_firstname`).first()).toHaveText(`${vars.firstName2 ?? ''}`);
    }
    if ((() => { const multiSteps = vars.multiSteps

return multiSteps !== 'yes' })()) {
      await expect(page.locator(`tr.woocommerce-cart-form__cart-item.cart_item:nth-of-type(2) > td.product-name > fieldset > .wcsg_add_recipient_fields > p.form-row:nth-of-type(3) > input[type="text"].input-text.recipient_lastname`).first()).toHaveText(`${vars.lastName2 ?? ''}`);
    }
    if ((() => { const multiSteps = vars.multiSteps

return multiSteps !== 'yes' })()) {
      await expect(page.locator(`tr.woocommerce-cart-form__cart-item.cart_item:nth-of-type(2) > td.product-name > fieldset > .wcsg_add_recipient_fields > p.form-row:nth-of-type(4) > .iti.iti--separate-dial-code > input[placeholder="201-555-5555"][type="tel"].input-text.pl_phone.recipient_phone`).first()).toHaveText(`${vars.phone2 ?? ''}`);
    }
    if ((() => { const multiSteps = vars.multiSteps

return multiSteps !== 'yes' })()) {
      await expect(page.locator(`tr.woocommerce-cart-form__cart-item.cart_item:nth-of-type(2) > td.product-name > fieldset > .wcsg_add_recipient_fields > p.form-row:nth-of-type(5) > select.input-text.recipient_credentials`).first()).toContainText(`${vars.credentials2 ?? ''}`);
    }
    if ((() => { const multiSteps = vars.multiSteps

return multiSteps !== 'yes' })()) {
      await expect(page.locator(`tr.woocommerce-cart-form__cart-item.cart_item:nth-of-type(3) > td.product-name > fieldset > .wcsg_add_recipient_fields > .form-row.form-row.woocommerce_subscriptions_gifting_recipient_email > input[placeholder="recipient@example.com"][type="email"].input-text.recipient_email`).first()).toContainText(`${vars.email3 ?? ''}`);
    }
    if ((() => { const multiSteps = vars.multiSteps

return multiSteps !== 'yes' })()) {
      await expect(page.locator(`tr.woocommerce-cart-form__cart-item.cart_item:nth-of-type(3) > td.product-name > fieldset > .wcsg_add_recipient_fields > p.form-row:nth-of-type(2) > input[type="text"].input-text.recipient_firstname`).first()).toContainText(`${vars.firstName3 ?? ''}`);
    }
    if ((() => { const multiSteps = vars.multiSteps

return multiSteps !== 'yes' })()) {
      await expect(page.locator(`tr.woocommerce-cart-form__cart-item.cart_item:nth-of-type(3) > td.product-name > fieldset > .wcsg_add_recipient_fields > p.form-row:nth-of-type(3) > input[type="text"].input-text.recipient_lastname`).first()).toContainText(`${vars.lastName3 ?? ''}`);
    }
    if ((() => { const multiSteps = vars.multiSteps

return multiSteps !== 'yes' })()) {
      await expect(page.locator(`tr.woocommerce-cart-form__cart-item.cart_item:nth-of-type(3) > td.product-name > fieldset > .wcsg_add_recipient_fields > p.form-row:nth-of-type(4) > .iti.iti--separate-dial-code > input[placeholder="201-555-5555"][type="tel"].input-text.pl_phone.recipient_phone`).first()).toContainText(`${vars.phone3 ?? ''}`);
    }
    if ((() => { const multiSteps = vars.multiSteps

return multiSteps !== 'yes' })()) {
      await expect(page.locator(`tr.woocommerce-cart-form__cart-item.cart_item:nth-of-type(3) > td.product-name > fieldset > .wcsg_add_recipient_fields > p.form-row:nth-of-type(5) > select.input-text.recipient_credentials`).first()).toContainText(`${vars.credentials3 ?? ''}`);
    }
    if (vars.days !== '') {
      await expect(page.locator(`.ast-product-name > a[href*="/product/"]`).or(page.locator(`tr.woocommerce-cart-form__cart-item.cart_item:nth-of-type(1) > td.product-name > a[href*="/product/"]`)).first()).toContainText(`${vars.days ?? ''}`);
    }
    if (vars.days !== '') {
      await expect(page.locator(`.ast-product-name > a[href*="/product/"]`).or(page.locator(`tr.woocommerce-cart-form__cart-item.cart_item:nth-of-type(1) > td.product-name > a[href*="/product/"]`)).first()).toContainText(`${vars.prodDesc ?? ''}`);
    }
    if ((() => { const multiSteps = vars.multiSteps

return multiSteps !== 'yes' && vars.days !== '' })()) {
      await expect(page.locator(`.ast-product-name > a[href*="/product/"]`).or(page.locator(`tr.woocommerce-cart-form__cart-item.cart_item:nth-of-type(2) > td.product-name > a[href*="/product/"]`)).first()).toContainText(`${vars.days ?? ''}`);
    }
    if ((() => { const multiSteps = vars.multiSteps

return multiSteps !== 'yes' && vars.days !== '' })()) {
      await expect(page.locator(`.ast-product-name > a[href*="/product/"]`).or(page.locator(`tr.woocommerce-cart-form__cart-item.cart_item:nth-of-type(2) > td.product-name > a[href*="/product/"]`)).first()).toContainText(`${vars.prodDesc ?? ''}`);
    }
    if ((() => { const multiSteps = vars.multiSteps

return multiSteps !== 'yes' && vars.days !== '' })()) {
      await expect(page.locator(`.ast-product-name > a[href*="/product/"]`).or(page.locator(`tr.woocommerce-cart-form__cart-item.cart_item:nth-of-type(3) > td.product-name > a[href*="/product/"]`)).first()).toContainText(`${vars.days ?? ''}`);
    }
    if ((() => { const multiSteps = vars.multiSteps

return multiSteps !== 'yes' && vars.days !== '' })()) {
      await expect(page.locator(`.ast-product-name > a[href*="/product/"]`).or(page.locator(`tr.woocommerce-cart-form__cart-item.cart_item:nth-of-type(3) > td.product-name > a[href*="/product/"]`)).first()).toContainText(`${vars.prodDesc ?? ''}`);
    }
    if (false) {
      vars.unitPriceComplete = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const str = `${vars.unitPriceComplete}`;

// Replace "sale ends" with "Sale Ends" and "reg." with "Reg."
const formattedStr = str
    .replace("sale ends", "Sale Ends")
    .replace("reg.", "Reg.");
    
return formattedStr }, vars);
    }
    if ((() => { const multiSteps = vars.multiSteps

return multiSteps !== 'yes' })()) {
      await expect(page.locator(`tr.woocommerce-cart-form__cart-item.cart_item:nth-of-type(3) > td.product-price`).first()).toHaveText(`${vars.unitPriceComplete ?? ''}`);
    }
    if ((() => { const multiSteps = vars.multiSteps

return multiSteps !== 'yes' })()) {
      await expect(page.locator(`tr.woocommerce-cart-form__cart-item.cart_item:nth-of-type(2) > td.product-price`).first()).toHaveText(`${vars.unitPriceComplete ?? ''}`);
    }
    await expect(page.locator(`tr.woocommerce-cart-form__cart-item.cart_item:nth-of-type(1) > td.product-price`).first()).toHaveText(`${vars.unitPriceComplete ?? ''}`);
    vars.unitPrice = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const str = `${vars.unitPriceComplete}`;

// Extract the expiration date (case-insensitive)
const dateMatch = str.match(/sale ends (\d+\/\d+\/\d+)/i); // Added /i for case-insensitivity
let isExpired = true;

if (dateMatch) {
    const expirationDate = new Date(dateMatch[1]);
    const currentDate = new Date();
    isExpired = currentDate > expirationDate; // Today (3/14/25) > 3/1/25, so true
}

// Extract all price matches
const matches = str.match(/\$\d{1,3}(?:,\d{3})*(?:\.\s?\d{2})?/g);

const extractedPrices = matches 
    ? matches.map(price => {
        // Remove all spaces
        price = price.replace(/\s/g, '');
        
        // If no decimal exists, add .00
        if (!price.includes('.')) {
            return price + '.00';
        }
        
        // If decimal exists, ensure exactly 2 digits
        const [whole, decimal] = price.split('.');
        return `${whole}.${decimal.padEnd(2, '0')}`;
    }) 
    : [];

// If there's no expiration date or only one price, return the first price
// Otherwise return sale price (index 0) if not expired, regular price (index 1) if expired
const result = (!dateMatch || extractedPrices.length === 1) 
    ? extractedPrices[0] 
    : (isExpired ? extractedPrices[1] : extractedPrices[0]);
    
return result }, vars);
    vars.subtotal  = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const unitPrice = parseFloat(`${vars.unitPrice}`.replace(',','').replace('$','').trim())
const subtotal = unitPrice * vars.qty
const formattedSubtotal = subtotal.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
return formattedSubtotal

 }, vars);
    try {
      if ((() => { const multiSteps = vars.multiSteps

return multiSteps === 'yes' })()) {
        await expect(page.locator(`tr.woocommerce-cart-form__cart-item.cart_item:nth-of-type(1) .subscription-price`).first()).toHaveText(`${vars.subtotal ?? ''}`);
      }
    } catch { /* optional step: assertText */ }
    if ((() => { const multiSteps = vars.multiSteps

return multiSteps !== 'yes' })()) {
      await expect(page.locator(`tr.woocommerce-cart-form__cart-item.cart_item:nth-of-type(1) .subscription-price`).first()).toHaveText(`${vars.unitPriceComplete ?? ''}`);
    }
    if ((() => { const multiSteps = vars.multiSteps

return multiSteps !== 'yes' })()) {
      await expect(page.locator(`tr.woocommerce-cart-form__cart-item.cart_item:nth-of-type(2) .subscription-price`).first()).toHaveText(`${vars.unitPriceComplete ?? ''}`);
    }
    if ((() => { const multiSteps = vars.multiSteps

return multiSteps !== 'yes' })()) {
      await expect(page.locator(`tr.woocommerce-cart-form__cart-item.cart_item:nth-of-type(3) .subscription-price`).first()).toHaveText(`${vars.unitPriceComplete ?? ''}`);
    }
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector<HTMLTableRowElement>('tbody > tr.cart-discount > td > span')

return false === !element }, vars)) {
      vars.discount = ((await page.locator(`tbody > tr.cart-discount > td > span`).textContent()) ?? '').trim();
    }
    vars.total = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const subtotal = parseFloat(`${vars.subtotal}`.replace('$','').replace(',','').trim());
let discount = `${vars.discount}`;
if (discount === '') {
    discount = 0;
} else {
    discount = parseFloat(discount.replace('$','').replace(',','').trim());
}

const total = (subtotal - discount).toFixed(2)

return '$' + total
 }, vars);
    await expect(page.locator(`tr.cart-subtotal > td > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.subtotal ?? ''}`);
    await expect(page.locator(`tr.order-total strong > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.total ?? ''}`);
  });

  test('PLS - 15 - Checkout page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    // ↓ PLS - 14 - Cart page
    // ↓ PLS - 02 - All Courses
    await page.locator(`li.menu-item.menu-item-type-custom.menu-item-object-custom.menu-item-has-children:nth-of-type(2) > a.menu-link > .menu-text`).or(page.locator(`li.menu-item.menu-item-type-custom.menu-item-object-custom.menu-item-has-children.menu-item--has-toggle:nth-of-type(2) > a > .nav-drop-title-wrap`)).first().hover();
    await page.locator(`xpath=//span[contains(text(), "All CE Courses")]`).or(page.locator(`a[href*="/all-courses/"] > .menu-text`)).or(page.locator(`xpath=//a[contains(text(), "All CE Courses")]`)).or(page.locator(`a[href*="/all-courses/"]`)).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    // ↑ end PLS - 02 - All Courses
    vars.unitPriceComplete = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const firstProductTop = Array.from<any>(document.querySelectorAll(
  "ul.products > li.product-type-subscription.instock .price, ul.products > li.product-type-variable-subscription.instock .price .amount"
))[2];

const unitPriceComplete = firstProductTop.textContent

return unitPriceComplete }, vars);
    await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const firstProductTop = Array.from<any>(document.querySelectorAll(
  "ul.products > li.product-type-subscription.instock, ul.products > li.product-type-variable-subscription.instock"
))[2];

const firstLink = firstProductTop.querySelector("a");

if (firstLink) {
  firstLink.click();
} else {
  console.log("No product found in stock");
} }, vars);
    vars.prodDesc = ((await page.locator(`h1.product_title`).textContent()) ?? '').trim();
    vars.prodDesc = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const desc = `${vars.prodDesc}`.replaceAll('–' , '-')

return desc }, vars);
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector('#pa_choose-subscription_period')

return element !== null && element !== undefined  }, vars)) {
      try { await page.locator(`#pa_choose-subscription_period`).first().fill(`7days`); } catch { await page.locator(`#pa_choose-subscription_period`).first().selectOption(`7days`); }
    }
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector('#pa_choose-subscription_period')

return element !== null && element !== undefined  }, vars)) {
      vars.days = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return document.querySelector<HTMLSelectElement>('select#pa_choose-subscription_period > option[value="7days"]').textContent }, vars);
    }
    await expect(page.locator(`div.woocommerce-variation-price > span > span.woocommerce-Price-amount.amount > bdi`).or(page.locator(`div.woocommerce-variation-price > .price`)).first()).toContainText(`${vars.unitPriceComplete ?? ''}`);
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector<HTMLFormElement>('form > table[aria-label="Product Details"].woocommerce-product-attributes.shop_attributes > tbody > tr.woocommerce-product-attributes-item.woocommerce-product-attributes-item--attribute_pa_date > td.woocommerce-product-attributes-item__value > p')

return element !== null && element !== undefined }, vars)) {
      vars.date = ((await page.locator(`form > table[aria-label="Product Details"].woocommerce-product-attributes.shop_attributes > tbody > tr.woocommerce-product-attributes-item.woocommerce-product-attributes-item--attribute_pa_date > td.woocommerce-product-attributes-item__value > p`).textContent()) ?? '').trim();
    }
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector<HTMLFormElement>('form > table[aria-label="Product Details"].woocommerce-product-attributes.shop_attributes > tbody > tr.woocommerce-product-attributes-item.woocommerce-product-attributes-item--attribute_pa_time-specific > td.woocommerce-product-attributes-item__value > p')

return element !== null && element !== undefined }, vars)) {
      vars.time = ((await page.locator(`form > table[aria-label="Product Details"].woocommerce-product-attributes.shop_attributes > tbody > tr.woocommerce-product-attributes-item.woocommerce-product-attributes-item--attribute_pa_time-specific > td.woocommerce-product-attributes-item__value > p`).textContent()) ?? '').trim();
    }
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector<HTMLAnchorElement>('form > table[aria-label="Product Details"].woocommerce-product-attributes.shop_attributes > tbody > tr.woocommerce-product-attributes-item.woocommerce-product-attributes-item--attribute_pa_location > td.woocommerce-product-attributes-item__value > p > a[href*="/location/"]')

return element !== null && element !== undefined }, vars)) {
      vars.location = ((await page.locator(`form > table[aria-label="Product Details"].woocommerce-product-attributes.shop_attributes > tbody > tr.woocommerce-product-attributes-item.woocommerce-product-attributes-item--attribute_pa_location > td.woocommerce-product-attributes-item__value > p > a[href*="/location/"]`).textContent()) ?? '').trim();
    }
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector<HTMLFormElement>('form > table[aria-label="Product Details"].woocommerce-product-attributes.shop_attributes > tbody > tr.woocommerce-product-attributes-item.woocommerce-product-attributes-item--attribute_pa_ceus > td.woocommerce-product-attributes-item__value > p')

return element !== null && element !== undefined }, vars)) {
      vars.ceus = ((await page.locator(`form > table[aria-label="Product Details"].woocommerce-product-attributes.shop_attributes > tbody > tr.woocommerce-product-attributes-item.woocommerce-product-attributes-item--attribute_pa_ceus > td.woocommerce-product-attributes-item__value > p`).textContent()) ?? '').trim();
    }
    vars.qty = `3`;
    try { await page.locator(`#pl_subscriptions_quantity`).or(page.locator(`input.qty`)).first().fill(`${vars.qty ?? ''}`); } catch { await page.locator(`#pl_subscriptions_quantity`).or(page.locator(`input.qty`)).first().selectOption(`${vars.qty ?? ''}`); }
    if ((() => { const multiSteps = vars.multiSteps

return multiSteps !== 'yes' })()) {
      await page.locator(`label[for="pl_subscriptions_me"]`).filter({ visible: true }).first().click({ force: true });
    }
    if ((() => { const multiSteps = vars.multiSteps

return multiSteps !== 'yes' })()) {
      try { await page.locator(`input[name="pl_recipient_email[0]"]`).first().fill(`${vars.email2 ?? ''}`); } catch { await page.locator(`input[name="pl_recipient_email[0]"]`).first().selectOption(`${vars.email2 ?? ''}`); }
    }
    if ((() => { const multiSteps = vars.multiSteps

return multiSteps !== 'yes' })()) {
      try { await page.locator(`input[name="pl_recipient_firstname[0]"]`).first().fill(`${vars.firstName2 ?? ''}`); } catch { await page.locator(`input[name="pl_recipient_firstname[0]"]`).first().selectOption(`${vars.firstName2 ?? ''}`); }
    }
    if ((() => { const multiSteps = vars.multiSteps

return multiSteps !== 'yes' })()) {
      try { await page.locator(`input[name="pl_recipient_lastname[0]"]`).first().fill(`${vars.lastName2 ?? ''}`); } catch { await page.locator(`input[name="pl_recipient_lastname[0]"]`).first().selectOption(`${vars.lastName2 ?? ''}`); }
    }
    if ((() => { const multiSteps = vars.multiSteps

return multiSteps !== 'yes' })()) {
      try { await page.locator(`input[name="pl_recipient_phone[0]"]`).first().fill(`${vars.phone2 ?? ''}`); } catch { await page.locator(`input[name="pl_recipient_phone[0]"]`).first().selectOption(`${vars.phone2 ?? ''}`); }
    }
    if ((() => { const multiSteps = vars.multiSteps

return multiSteps !== 'yes' })()) {
      try { await page.locator(`select[name="pl_recipient_credentials[0]"]`).first().fill(`${vars.credentials2 ?? ''}`); } catch { await page.locator(`select[name="pl_recipient_credentials[0]"]`).first().selectOption(`${vars.credentials2 ?? ''}`); }
    }
    if ((() => { const multiSteps = vars.multiSteps

return multiSteps !== 'yes' })()) {
      try { await page.locator(`input[name="pl_recipient_email[1]"]`).first().fill(`${vars.email3 ?? ''}`); } catch { await page.locator(`input[name="pl_recipient_email[1]"]`).first().selectOption(`${vars.email3 ?? ''}`); }
    }
    if ((() => { const multiSteps = vars.multiSteps

return multiSteps !== 'yes' })()) {
      try { await page.locator(`input[name="pl_recipient_firstname[1]"]`).first().fill(`${vars.firstName3 ?? ''}`); } catch { await page.locator(`input[name="pl_recipient_firstname[1]"]`).first().selectOption(`${vars.firstName3 ?? ''}`); }
    }
    if ((() => { const multiSteps = vars.multiSteps

return multiSteps !== 'yes' })()) {
      try { await page.locator(`input[name="pl_recipient_lastname[1]"]`).first().fill(`${vars.lastName3 ?? ''}`); } catch { await page.locator(`input[name="pl_recipient_lastname[1]"]`).first().selectOption(`${vars.lastName3 ?? ''}`); }
    }
    if ((() => { const multiSteps = vars.multiSteps

return multiSteps !== 'yes' })()) {
      try { await page.locator(`input[name="pl_recipient_phone[1]"]`).first().fill(`${vars.phone3 ?? ''}`); } catch { await page.locator(`input[name="pl_recipient_phone[1]"]`).first().selectOption(`${vars.phone3 ?? ''}`); }
    }
    if ((() => { const multiSteps = vars.multiSteps

return multiSteps !== 'yes' })()) {
      await expect(page.locator(`select[name="pl_recipient_credentials[1]"]`).first()).toHaveText(`RDH`);
    }
    if ((() => { const multiSteps = vars.multiSteps

return multiSteps !== 'yes' })()) {
      try { await page.locator(`select[name="pl_recipient_credentials[1]"]`).first().fill(`${vars.credentials3 ?? ''}`); } catch { await page.locator(`select[name="pl_recipient_credentials[1]"]`).first().selectOption(`${vars.credentials3 ?? ''}`); }
    }
    await page.locator(`xpath=//button[contains(text(), "Sign up now")]`).or(page.locator(`button[name="add-to-cart"]`)).filter({ visible: true }).first().click({ force: true });
    await page.locator(`xpath=//a[contains(text(), "View cart")]`).or(page.locator(`a.button.wc-forward:not(.checkout)`)).filter({ visible: true }).first().click({ force: true });
    if (vars.days === '') {
      await expect(page.locator(`.ast-product-name > a[href*="/product/"]`).or(page.locator(`tr.woocommerce-cart-form__cart-item.cart_item:nth-of-type(1) > td.product-name > a[href*="/product/"]`)).first()).toHaveText(`${vars.prodDesc ?? ''}`);
    }
    if ((() => { const multiSteps = vars.multiSteps

return multiSteps !== 'yes' && vars.days === '' })()) {
      await expect(page.locator(`.ast-product-name > a[href*="/product/"]`).or(page.locator(`tr.woocommerce-cart-form__cart-item.cart_item:nth-of-type(2) > td.product-name > a[href*="/product/"]`)).first()).toHaveText(`${vars.prodDesc ?? ''}`);
    }
    if ((() => { const multiSteps = vars.multiSteps

return multiSteps !== 'yes' && vars.days === '' })()) {
      await expect(page.locator(`.ast-product-name > a[href*="/product/"]`).or(page.locator(`tr.woocommerce-cart-form__cart-item.cart_item:nth-of-type(3) > td.product-name > a[href*="/product/"]`)).first()).toHaveText(`${vars.prodDesc ?? ''}`);
    }
    if ((() => { const multiSteps = vars.multiSteps

return multiSteps !== 'yes' })()) {
      await expect(page.locator(`tr.woocommerce-cart-form__cart-item.cart_item:nth-of-type(2) > td.product-name > fieldset > .wcsg_add_recipient_fields > .form-row.form-row.woocommerce_subscriptions_gifting_recipient_email > input[placeholder="recipient@example.com"][type="email"].input-text.recipient_email`).first()).toHaveText(`${vars.email2 ?? ''}`);
    }
    if ((() => { const multiSteps = vars.multiSteps

return multiSteps !== 'yes' })()) {
      await expect(page.locator(`tr.woocommerce-cart-form__cart-item.cart_item:nth-of-type(2) > td.product-name > fieldset > .wcsg_add_recipient_fields > p.form-row:nth-of-type(2) > input[type="text"].input-text.recipient_firstname`).first()).toHaveText(`${vars.firstName2 ?? ''}`);
    }
    if ((() => { const multiSteps = vars.multiSteps

return multiSteps !== 'yes' })()) {
      await expect(page.locator(`tr.woocommerce-cart-form__cart-item.cart_item:nth-of-type(2) > td.product-name > fieldset > .wcsg_add_recipient_fields > p.form-row:nth-of-type(3) > input[type="text"].input-text.recipient_lastname`).first()).toHaveText(`${vars.lastName2 ?? ''}`);
    }
    if ((() => { const multiSteps = vars.multiSteps

return multiSteps !== 'yes' })()) {
      await expect(page.locator(`tr.woocommerce-cart-form__cart-item.cart_item:nth-of-type(2) > td.product-name > fieldset > .wcsg_add_recipient_fields > p.form-row:nth-of-type(4) > .iti.iti--separate-dial-code > input[placeholder="201-555-5555"][type="tel"].input-text.pl_phone.recipient_phone`).first()).toHaveText(`${vars.phone2 ?? ''}`);
    }
    if ((() => { const multiSteps = vars.multiSteps

return multiSteps !== 'yes' })()) {
      await expect(page.locator(`tr.woocommerce-cart-form__cart-item.cart_item:nth-of-type(2) > td.product-name > fieldset > .wcsg_add_recipient_fields > p.form-row:nth-of-type(5) > select.input-text.recipient_credentials`).first()).toContainText(`${vars.credentials2 ?? ''}`);
    }
    if ((() => { const multiSteps = vars.multiSteps

return multiSteps !== 'yes' })()) {
      await expect(page.locator(`tr.woocommerce-cart-form__cart-item.cart_item:nth-of-type(3) > td.product-name > fieldset > .wcsg_add_recipient_fields > .form-row.form-row.woocommerce_subscriptions_gifting_recipient_email > input[placeholder="recipient@example.com"][type="email"].input-text.recipient_email`).first()).toContainText(`${vars.email3 ?? ''}`);
    }
    if ((() => { const multiSteps = vars.multiSteps

return multiSteps !== 'yes' })()) {
      await expect(page.locator(`tr.woocommerce-cart-form__cart-item.cart_item:nth-of-type(3) > td.product-name > fieldset > .wcsg_add_recipient_fields > p.form-row:nth-of-type(2) > input[type="text"].input-text.recipient_firstname`).first()).toContainText(`${vars.firstName3 ?? ''}`);
    }
    if ((() => { const multiSteps = vars.multiSteps

return multiSteps !== 'yes' })()) {
      await expect(page.locator(`tr.woocommerce-cart-form__cart-item.cart_item:nth-of-type(3) > td.product-name > fieldset > .wcsg_add_recipient_fields > p.form-row:nth-of-type(3) > input[type="text"].input-text.recipient_lastname`).first()).toContainText(`${vars.lastName3 ?? ''}`);
    }
    if ((() => { const multiSteps = vars.multiSteps

return multiSteps !== 'yes' })()) {
      await expect(page.locator(`tr.woocommerce-cart-form__cart-item.cart_item:nth-of-type(3) > td.product-name > fieldset > .wcsg_add_recipient_fields > p.form-row:nth-of-type(4) > .iti.iti--separate-dial-code > input[placeholder="201-555-5555"][type="tel"].input-text.pl_phone.recipient_phone`).first()).toContainText(`${vars.phone3 ?? ''}`);
    }
    if ((() => { const multiSteps = vars.multiSteps

return multiSteps !== 'yes' })()) {
      await expect(page.locator(`tr.woocommerce-cart-form__cart-item.cart_item:nth-of-type(3) > td.product-name > fieldset > .wcsg_add_recipient_fields > p.form-row:nth-of-type(5) > select.input-text.recipient_credentials`).first()).toContainText(`${vars.credentials3 ?? ''}`);
    }
    if (vars.days !== '') {
      await expect(page.locator(`.ast-product-name > a[href*="/product/"]`).or(page.locator(`tr.woocommerce-cart-form__cart-item.cart_item:nth-of-type(1) > td.product-name > a[href*="/product/"]`)).first()).toContainText(`${vars.days ?? ''}`);
    }
    if (vars.days !== '') {
      await expect(page.locator(`.ast-product-name > a[href*="/product/"]`).or(page.locator(`tr.woocommerce-cart-form__cart-item.cart_item:nth-of-type(1) > td.product-name > a[href*="/product/"]`)).first()).toContainText(`${vars.prodDesc ?? ''}`);
    }
    if ((() => { const multiSteps = vars.multiSteps

return multiSteps !== 'yes' && vars.days !== '' })()) {
      await expect(page.locator(`.ast-product-name > a[href*="/product/"]`).or(page.locator(`tr.woocommerce-cart-form__cart-item.cart_item:nth-of-type(2) > td.product-name > a[href*="/product/"]`)).first()).toContainText(`${vars.days ?? ''}`);
    }
    if ((() => { const multiSteps = vars.multiSteps

return multiSteps !== 'yes' && vars.days !== '' })()) {
      await expect(page.locator(`.ast-product-name > a[href*="/product/"]`).or(page.locator(`tr.woocommerce-cart-form__cart-item.cart_item:nth-of-type(2) > td.product-name > a[href*="/product/"]`)).first()).toContainText(`${vars.prodDesc ?? ''}`);
    }
    if ((() => { const multiSteps = vars.multiSteps

return multiSteps !== 'yes' && vars.days !== '' })()) {
      await expect(page.locator(`.ast-product-name > a[href*="/product/"]`).or(page.locator(`tr.woocommerce-cart-form__cart-item.cart_item:nth-of-type(3) > td.product-name > a[href*="/product/"]`)).first()).toContainText(`${vars.days ?? ''}`);
    }
    if ((() => { const multiSteps = vars.multiSteps

return multiSteps !== 'yes' && vars.days !== '' })()) {
      await expect(page.locator(`.ast-product-name > a[href*="/product/"]`).or(page.locator(`tr.woocommerce-cart-form__cart-item.cart_item:nth-of-type(3) > td.product-name > a[href*="/product/"]`)).first()).toContainText(`${vars.prodDesc ?? ''}`);
    }
    if (false) {
      vars.unitPriceComplete = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const str = `${vars.unitPriceComplete}`;

// Replace "sale ends" with "Sale Ends" and "reg." with "Reg."
const formattedStr = str
    .replace("sale ends", "Sale Ends")
    .replace("reg.", "Reg.");
    
return formattedStr }, vars);
    }
    if ((() => { const multiSteps = vars.multiSteps

return multiSteps !== 'yes' })()) {
      await expect(page.locator(`tr.woocommerce-cart-form__cart-item.cart_item:nth-of-type(3) > td.product-price`).first()).toHaveText(`${vars.unitPriceComplete ?? ''}`);
    }
    if ((() => { const multiSteps = vars.multiSteps

return multiSteps !== 'yes' })()) {
      await expect(page.locator(`tr.woocommerce-cart-form__cart-item.cart_item:nth-of-type(2) > td.product-price`).first()).toHaveText(`${vars.unitPriceComplete ?? ''}`);
    }
    await expect(page.locator(`tr.woocommerce-cart-form__cart-item.cart_item:nth-of-type(1) > td.product-price`).first()).toHaveText(`${vars.unitPriceComplete ?? ''}`);
    vars.unitPrice = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const str = `${vars.unitPriceComplete}`;

// Extract the expiration date (case-insensitive)
const dateMatch = str.match(/sale ends (\d+\/\d+\/\d+)/i); // Added /i for case-insensitivity
let isExpired = true;

if (dateMatch) {
    const expirationDate = new Date(dateMatch[1]);
    const currentDate = new Date();
    isExpired = currentDate > expirationDate; // Today (3/14/25) > 3/1/25, so true
}

// Extract all price matches
const matches = str.match(/\$\d{1,3}(?:,\d{3})*(?:\.\s?\d{2})?/g);

const extractedPrices = matches 
    ? matches.map(price => {
        // Remove all spaces
        price = price.replace(/\s/g, '');
        
        // If no decimal exists, add .00
        if (!price.includes('.')) {
            return price + '.00';
        }
        
        // If decimal exists, ensure exactly 2 digits
        const [whole, decimal] = price.split('.');
        return `${whole}.${decimal.padEnd(2, '0')}`;
    }) 
    : [];

// If there's no expiration date or only one price, return the first price
// Otherwise return sale price (index 0) if not expired, regular price (index 1) if expired
const result = (!dateMatch || extractedPrices.length === 1) 
    ? extractedPrices[0] 
    : (isExpired ? extractedPrices[1] : extractedPrices[0]);
    
return result }, vars);
    vars.subtotal  = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const unitPrice = parseFloat(`${vars.unitPrice}`.replace(',','').replace('$','').trim())
const subtotal = unitPrice * vars.qty
const formattedSubtotal = subtotal.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
return formattedSubtotal

 }, vars);
    try {
      if ((() => { const multiSteps = vars.multiSteps

return multiSteps === 'yes' })()) {
        await expect(page.locator(`tr.woocommerce-cart-form__cart-item.cart_item:nth-of-type(1) .subscription-price`).first()).toHaveText(`${vars.subtotal ?? ''}`);
      }
    } catch { /* optional step: assertText */ }
    if ((() => { const multiSteps = vars.multiSteps

return multiSteps !== 'yes' })()) {
      await expect(page.locator(`tr.woocommerce-cart-form__cart-item.cart_item:nth-of-type(1) .subscription-price`).first()).toHaveText(`${vars.unitPriceComplete ?? ''}`);
    }
    if ((() => { const multiSteps = vars.multiSteps

return multiSteps !== 'yes' })()) {
      await expect(page.locator(`tr.woocommerce-cart-form__cart-item.cart_item:nth-of-type(2) .subscription-price`).first()).toHaveText(`${vars.unitPriceComplete ?? ''}`);
    }
    if ((() => { const multiSteps = vars.multiSteps

return multiSteps !== 'yes' })()) {
      await expect(page.locator(`tr.woocommerce-cart-form__cart-item.cart_item:nth-of-type(3) .subscription-price`).first()).toHaveText(`${vars.unitPriceComplete ?? ''}`);
    }
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector<HTMLTableRowElement>('tbody > tr.cart-discount > td > span')

return false === !element }, vars)) {
      vars.discount = ((await page.locator(`tbody > tr.cart-discount > td > span`).textContent()) ?? '').trim();
    }
    vars.total = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const subtotal = parseFloat(`${vars.subtotal}`.replace('$','').replace(',','').trim());
let discount = `${vars.discount}`;
if (discount === '') {
    discount = 0;
} else {
    discount = parseFloat(discount.replace('$','').replace(',','').trim());
}

const total = (subtotal - discount).toFixed(2)

return '$' + total
 }, vars);
    await expect(page.locator(`tr.cart-subtotal > td > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.subtotal ?? ''}`);
    await expect(page.locator(`tr.order-total strong > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.total ?? ''}`);
    // ↑ end PLS - 14 - Cart page
    await page.locator(`xpath=//a[contains(text(), "Proceed to checkout")]`).or(page.locator(`a[href*="/checkout/"].checkout-button`)).filter({ visible: true }).first().click({ force: true });
    if (false) {
      await expect(page.locator(`#order_review > table.shop_table.woocommerce-checkout-review-order-table > tbody > tr.cart_item > td.product-name > .ast-product-image > .ast-product-name`).or(page.locator(`#order_review > table.shop_table.woocommerce-checkout-review-order-table > tbody > tr.cart_item > td.product-name`)).first()).toContainText(`${vars.prodDesc ?? ''}`);
    }
    if (false) {
      await expect(page.locator(`#order_review > table.shop_table.woocommerce-checkout-review-order-table > tbody > tr.cart_item > td.product-name > .ast-product-image > .ast-product-name`).or(page.locator(`#order_review > table.shop_table.woocommerce-checkout-review-order-table > tbody > tr.cart_item > td.product-name`)).first()).toContainText(`${vars.prodDesc ?? ''}`);
    }
    if (false) {
      await expect(page.locator(`#order_review > table.shop_table.woocommerce-checkout-review-order-table > tbody > tr.cart_item > td.product-total > .subscription-price`).first()).toContainText(`${vars.unitPriceComplete ?? ''}`);
    }
    if (false) {
      await expect(page.locator(`#order_review > table.shop_table.woocommerce-checkout-review-order-table > tfoot > tr.cart-subtotal > td > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    }
    if (false) {
      await expect(page.locator(`#order_review > table.shop_table.woocommerce-checkout-review-order-table > tfoot > tr.order-total > td > strong > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    }
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector('.wc-block-checkout')

return element !== null }, vars)) {
      vars.prodDesc = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = `${vars.prodDesc}`
//.replace('-','–')
return element }, vars);
    }
    try {
      await expect(page.locator(`div.wc-block-components-order-summary-item:nth-of-type(1) > .wc-block-components-order-summary-item__description > h3.wc-block-components-product-name`).or(page.locator(`tr:nth-of-type(1) > td.product-name`)).first()).toContainText(`${vars.prodDesc ?? ''}`);
    } catch { /* optional step: assertTextPresent */ }
    if (vars.days !== '') {
      await expect(page.locator(`div.wc-block-components-order-summary-item:nth-of-type(1) > .wc-block-components-order-summary-item__description > .wc-block-components-product-metadata > .wc-block-components-product-details > .wc-block-components-product-details__subscription-period > .wc-block-components-product-details__value`).or(page.locator(`tr:nth-of-type(1) > td.product-name`)).first()).toContainText(`${vars.days ?? ''}`);
    }
    if ((() => { const multiSteps = vars.multiSteps

return multiSteps === 'yes' })()) {
      await expect(page.locator(`div:nth-child(1) > div.wc-block-components-order-summary-item__total-price > span span`).or(page.locator(`tr:nth-of-type(1) > td.product-total .woocommerce-Price-amount.amount > bdi`)).or(page.locator(`div.wp-block-woocommerce-checkout-order-summary-totals-block > div.wp-block-woocommerce-checkout-order-summary-subtotal-block.wc-block-components-totals-wrapper > div > span.wc-block-formatted-money-amount.wc-block-components-formatted-money-amount.wc-block-components-totals-item__value`)).first()).toContainText(`${vars.subtotal ?? ''}`);
    }
    if ((() => { const multiSteps = vars.multiSteps

return multiSteps !== 'yes' })()) {
      await expect(page.locator(`div:nth-child(1) > div.wc-block-components-order-summary-item__total-price > span span`).or(page.locator(`tr:nth-of-type(1) > td.product-total .woocommerce-Price-amount.amount > bdi`)).first()).toContainText(`${vars.unitPrice ?? ''}`);
    }
    if ((() => { const multiSteps = vars.multiSteps

return multiSteps !== 'yes' })()) {
      await expect(page.locator(`div.wc-block-components-order-summary-item:nth-of-type(2) > .wc-block-components-order-summary-item__description > h3.wc-block-components-product-name`).or(page.locator(`tr:nth-of-type(2) > td.product-name`)).first()).toContainText(`${vars.prodDesc ?? ''}`);
    }
    if ((() => { const multiSteps = vars.multiSteps

return multiSteps !== 'yes' &&vars.days !== '' })()) {
      await expect(page.locator(`div.wc-block-components-order-summary-item:nth-of-type(2) > .wc-block-components-order-summary-item__description > .wc-block-components-product-metadata > .wc-block-components-product-details > .wc-block-components-product-details__subscription-period > .wc-block-components-product-details__value`).or(page.locator(`tr:nth-of-type(2) > td.product-name`)).first()).toContainText(`${vars.days ?? ''}`);
    }
    if ((() => { const multiSteps = vars.multiSteps

return multiSteps !== 'yes' })()) {
      await expect(page.locator(`div:nth-child(2) > div.wc-block-components-order-summary-item__total-price > span span`).or(page.locator(`tr:nth-of-type(2) > td.product-total .woocommerce-Price-amount.amount > bdi`)).first()).toContainText(`${vars.unitPrice ?? ''}`);
    }
    if ((() => { const multiSteps = vars.multiSteps

return multiSteps !== 'yes' })()) {
      await expect(page.locator(`div.wc-block-components-order-summary-item:nth-of-type(3) > .wc-block-components-order-summary-item__description > h3.wc-block-components-product-name`).or(page.locator(`tr:nth-of-type(3) > td.product-name`)).first()).toContainText(`${vars.prodDesc ?? ''}`);
    }
    if ((() => { const multiSteps = vars.multiSteps

return multiSteps !== 'yes' && vars.days !== '' })()) {
      await expect(page.locator(`div.wc-block-components-order-summary-item:nth-of-type(3) > .wc-block-components-order-summary-item__description > .wc-block-components-product-metadata > .wc-block-components-product-details > .wc-block-components-product-details__subscription-period > .wc-block-components-product-details__value`).or(page.locator(`tr:nth-of-type(3) > td.product-name`)).first()).toContainText(`${vars.days ?? ''}`);
    }
    if ((() => { const multiSteps = vars.multiSteps

return multiSteps !== 'yes' })()) {
      await expect(page.locator(`div:nth-child(3) > div.wc-block-components-order-summary-item__total-price > span span`).or(page.locator(`tr:nth-of-type(3) > td.product-total .woocommerce-Price-amount.amount > bdi`)).first()).toContainText(`${vars.unitPrice ?? ''}`);
    }
    vars.blocks = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector('.wc-block-checkout')

return element !== null }, vars);
    await expect(page.locator(`.wc-block-formatted-money-amount.wc-block-components-formatted-money-amount.wc-block-components-totals-item__value`).or(page.locator(`tr.cart-subtotal .woocommerce-Price-amount.amount > bdi`)).first()).toContainText(`${vars.subtotal ?? ''}`);
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector('div.wp-block-woocommerce-checkout-order-summary-discount-block.wc-block-components-totals-wrapper > div > span.wc-block-number-format-container > span')

return !element === false }, vars)) {
      await expect(page.locator(`div.wp-block-woocommerce-checkout-order-summary-discount-block.wc-block-components-totals-wrapper > div > span.wc-block-number-format-container > span`).first()).toHaveText(`-${vars.discount ?? ''}`);
    }
    await expect(page.locator(`.wc-block-formatted-money-amount.wc-block-components-formatted-money-amount.wc-block-components-totals-footer-item-tax-value`).or(page.locator(`tr.order-total .woocommerce-Price-amount.amount > bdi`)).first()).toContainText(`${vars.total ?? ''}`);
    if ((() => { const multiSteps = vars.multiSteps

return multiSteps !== 'yes' })()) {
      await expect(page.locator(`div.wc-block-components-order-summary-item:nth-of-type(2) > .wc-block-components-order-summary-item__description > .wc-block-components-product-metadata > div.wc-block-components-product-details:nth-of-type(1) > .wc-block-components-product-details__participant > .wc-block-components-product-details__value`).or(page.locator(`#order_review > table > tbody > tr:nth-child(2) > td.product-name > dl > dd > p`)).first()).toContainText(`${vars.firstName2 ?? ''} ${vars.lastName2 ?? ''} (${vars.email2 ?? ''})`);
    }
    if ((() => { const multiSteps = vars.multiSteps

return multiSteps !== 'yes' })()) {
      await expect(page.locator(`div.wc-block-components-order-summary-item:nth-of-type(3) > .wc-block-components-order-summary-item__description > .wc-block-components-product-metadata > div.wc-block-components-product-details:nth-of-type(1) > .wc-block-components-product-details__participant > .wc-block-components-product-details__value`).or(page.locator(`tr:nth-of-type(3) > td.product-name > p`)).or(page.locator(`#order_review > table > tbody > tr:nth-child(3) > td.product-name > dl > dd > p`)).first()).toContainText(`${vars.firstName3 ?? ''} ${vars.lastName3 ?? ''} (${vars.email3 ?? ''})`);
    }
  });

  test('PLS - 17 - Transaltion', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    try {
      await expect(page.locator(`li:nth-of-type(1) > .elementor-icon-list-text`).or(page.locator(`ul.wp-block-list:nth-of-type(1) > li`)).first()).toHaveText(`A growing library of on demand dental CE with a wide range of theoretical content of current relevance to dental and allied health professionals.`);
    } catch { /* optional step: assertText */ }
    try {
      await expect(page.locator(`li:nth-of-type(2) > .elementor-icon-list-text`).or(page.locator(`ul.wp-block-list:nth-of-type(2) > li`)).first()).toHaveText(`Mandatory CE, in many states, for the HCP including CPR, Sexual Harassment, OSHA, HIPAA, Cultural Competence, Infection Control,  Radiation Health and Safety.`);
    } catch { /* optional step: assertText */ }
    await page.locator(`a[href*="/es/"]`).filter({ visible: true }).first().click({ force: true });
    try {
      await expect(page.locator(`li:nth-of-type(1) > .elementor-icon-list-text`).or(page.locator(`ul.wp-block-list:nth-of-type(1) > li`)).first()).toContainText(`Una creciente biblioteca de CE dental a la carta con una amplia gama de contenidos teóricos de relevancia actual para los profesionales de la odontología y la sanidad aliada.`);
    } catch { /* optional step: assertTextPresent */ }
    try {
      await expect(page.locator(`li:nth-of-type(2) > .elementor-icon-list-text`).or(page.locator(`ul.wp-block-list:nth-of-type(2) > li`)).first()).toHaveText(`CE obligatorio, en muchos estados, para el HCP, incluyendo RCP, acoso sexual, OSHA, HIPAA, competencia cultural, control de infecciones, salud y seguridad radiológica.`);
    } catch { /* optional step: assertText */ }
    await expect(page.locator(`#menu-item-21 > a[href*="/es/"].menu-link > .menu-text`).or(page.locator(`#menu-item-11957 > a`)).first()).toContainText(`Inicio`);
    await expect(page.locator(`li.menu-item.menu-item-type-custom.menu-item-object-custom.menu-item-has-children:nth-of-type(2) > a.menu-link > .menu-text`).or(page.locator(`xpath=//li[@id='menu-item-755']//span[@class='nav-drop-title-wrap']`)).first()).toContainText(`Cursos`);
    await expect(page.locator(`a[href*="/consulting/"] > .menu-text`).or(page.locator(`a[href*="/es/private-ce/"]`)).first()).toContainText(`CE privado`);
    await expect(page.locator(`a[href*="/es/faq/"] > .menu-text`).or(page.locator(`a[href*="/es/faq/"]`)).first()).toContainText(`PREGUNTAS FRECUENTES`);
    await expect(page.locator(`a[href*="/blog/"] > .menu-text`).or(page.locator(`a[href*="/blog/"]`)).first()).toContainText(`Blog`);
    await expect(page.locator(`a[href*="/contact-us/"] > .menu-text`).or(page.locator(`a[href*="/contact-us/"]`)).first()).toContainText(`Póngase en contacto con`);
    await expect(page.locator(`a[href*="/es/my-account/"] > .menu-text`).or(page.locator(`a[href*="/es/my-account/"]`)).first()).toContainText(`Mi cuenta`);
    await page.locator(`a[href*="/"][title="English"]`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`#menu-item-21 > a[href*="/"].menu-link > .menu-text`).or(page.locator(`#menu-item-11957 > a`)).first()).toContainText(`Home`);
    await expect(page.locator(`li.menu-item.menu-item-type-custom.menu-item-object-custom.menu-item-has-children:nth-of-type(2) > a.menu-link > .menu-text`).or(page.locator(`xpath=//li[@id='menu-item-755']//span[@class='nav-drop-title-wrap']`)).first()).toContainText(`Courses`);
    await expect(page.locator(`a[href*="/consulting/"] > .menu-text`).or(page.locator(`a[href*="/private-ce/"]`)).first()).toContainText(`Private CE`);
    await expect(page.locator(`a[href*="/faq/"] > .menu-text`).or(page.locator(`a[href*="/faq/"]`)).first()).toContainText(`FAQ`);
    await expect(page.locator(`a[href*="/blog/"] > .menu-text`).or(page.locator(`a[href*="/blog/"]`)).first()).toContainText(`Blog`);
    await expect(page.locator(`a[href*="/contact-us/"] > .menu-text`).or(page.locator(`a[href*="/contact-us/"]`)).first()).toContainText(`Contact`);
    await expect(page.locator(`a[href*="/my-account/"] > .menu-text`).or(page.locator(`a[href*="/my-account/"]`)).first()).toContainText(`My account`);
  });

});
