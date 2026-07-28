// @ts-nocheck
// Auto-generated from Ghost Inspector suite: "Elka - Place Order USD"
// Review all TODOs before running.
import dotenv from 'dotenv';
dotenv.config();
import { test, expect } from '@playwright/test';
import { blockUI, extractUserFromEmail, wooCommerceCheckoutTemplate } from '../helpers/common-steps-for-all-projects';
import { fillCCPaypal } from '../helpers/elka-common-steps-for-suite';

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

test.describe('Elka - Place Order USD', () => {

  const vars = new Proxy<Record<string, string>>({
    "email": `qa+gi_order_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "emailReg": `qa+gi_reg_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "emailForgot": `qa+gi_forgot_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "payPalUser": "qa+gi_sb-8eg0v132169@saucal.com",
    "payPalPass": process.env.PAY_PAL_PASS ?? '',
    "adminUser": "saucal_maintenance_admin",
    "adminPass": process.env.ADMIN_PASS ?? '',
    "firstName": "QA",
    "lastName": `${Math.random().toString(36).substring(2, 10)}`,
    "state": "FL",
    "zipCode": "33126",
    "password": process.env.PASSWORD ?? '',
    "password2": process.env.PASSWORD2 ?? '',
    "phone": "3453456655",
    "project": "elka",
    "stateComplete": "Florida",
    "country": "US",
    "countryComplete": "United States (US)",
    "Symbol": "$",
    "company": "Testing Inc.",
    "street": "6700 NW 12TH ST",
    "city": "MIAMI",
  }, { get: (o: Record<string, string>, k: string) => (k in o ? o[k] : '') });

  test('01 - New User - Place Order', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    // ↓ 05 - Checkout page
    vars.email = `gi_order_${vars.alphanumeric ?? ''}@saucal.com`;
    // ↓ 04 - Cart page
    // ↓ 03 - Product page
    // ↓ 02 - Shop page
    await page.waitForLoadState('load');
    await page.locator(`#menu-item-344367 > a > span.menu-text`).first().hover();
    await page.locator(`#menu-item-344370 > a`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    // ↑ end 02 - Shop page
    await page.locator(`a[href*="/utv/stage-3/"] > .fusion-column-inner-bg-image`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`.fusion-button-text.fusion-button-text-right`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`li:nth-of-type(1).product.type-product > div > a`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    // ↑ end 03 - Product page
    vars.prod_year = `2018`;
    try { await page.locator(`#input_11_15`).first().fill(`${vars.prod_year ?? ''}`); } catch { await page.locator(`#input_11_15`).first().selectOption(`${vars.prod_year ?? ''}`); }
    vars.weight = `43kg`;
    try { await page.locator(`#input_11_4`).first().fill(`${vars.weight ?? ''}`); } catch { await page.locator(`#input_11_4`).first().selectOption(`${vars.weight ?? ''}`); }
    {
      const _lbl = page.locator(`label[for="choice_11_13_1"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#choice_11_13_1`).filter({ visible: true }).first().click({ force: true }); }
    }
    vars.weight2 = `12kg`;
    vars.prod_desc = ((await page.locator(`.fusion-title > h2.fusion-responsive-typography-calculated`).textContent()) ?? '').trim();
    try { await page.locator(`#input_11_11`).first().fill(`${vars.weight2 ?? ''}`); } catch { await page.locator(`#input_11_11`).first().selectOption(`${vars.weight2 ?? ''}`); }
    {
      const _lbl = page.locator(`label[for="input_11_1"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#input_11_1`).filter({ visible: true }).first().click({ force: true }); }
    }
    try { await page.locator(`#input_11_1`).first().fill(`Stock Geometry`); } catch { await page.locator(`#input_11_1`).first().selectOption(`Stock Geometry`); }
    // TODO: command="dragAndDrop" target="#input_11_1" value=".fusion-header > .fusion-row"
    {
      const _lbl = page.locator(`label[for="input_11_5"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#input_11_5`).filter({ visible: true }).first().click({ force: true }); }
    }
    try { await page.locator(`#input_11_5`).first().fill(`MX Racing`); } catch { await page.locator(`#input_11_5`).first().selectOption(`MX Racing`); }
    // TODO: command="dragAndDrop" target="#input_11_5" value=".fusion-header > .fusion-row"
    {
      const _lbl = page.locator(`label[for="input_11_9"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#input_11_9`).filter({ visible: true }).first().click({ force: true }); }
    }
    try { await page.locator(`#input_11_9`).first().fill(`Stock Tires`); } catch { await page.locator(`#input_11_9`).first().selectOption(`Stock Tires`); }
    // TODO: command="dragAndDrop" target="#input_11_9" value=".fusion-header > .fusion-row"
    vars.unitPrice = ((await page.locator(`.woocommerce-Price-amount > bdi`).textContent()) ?? '').trim();
    vars.option1 = ((await page.locator(`#label_11_12_0`).textContent()) ?? '').trim();
    vars.option2 = ((await page.locator(`#label_11_13_1`).textContent()) ?? '').trim();
    vars.option3 = ((await page.locator(`#input_11_1`).textContent()) ?? '').trim();
    vars.option4 = ((await page.locator(`#input_11_5`).textContent()) ?? '').trim();
    vars.option5 = ((await page.locator(`#input_11_9`).textContent()) ?? '').trim();
    {
      const _lbl = page.locator(`label[for="gform_submit_button_11"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#gform_submit_button_11`).filter({ visible: true }).first().click({ force: true }); }
    }
    await page.locator(`xpath=//a[contains(text(), "View cart")]`).or(page.locator(`a[href*="/shop/cart/?c=72e1ba2726d6"].button`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`a[href*="/product/"].product-title`).first()).toContainText(`${vars.prod_desc ?? ''}`);
    await expect(page.locator(`dd.variation-Model-yearofyourUTV > p`).first()).toContainText(`${vars.prod_year ?? ''}`);
    await expect(page.locator(`dd.variation-RiderWeight > p`).first()).toContainText(`${vars.weight ?? ''}`);
    await expect(page.locator(`dd.variation-Howmanypassengers > p`).first()).toContainText(`${vars.option1 ?? ''}`);
    await expect(page.locator(`dd.variation-Doyoucarryadditionalpayload > p`).first()).toContainText(`${vars.option2 ?? ''}`);
    await expect(page.locator(`dd.variation-Weightofyouradditionalpayload > p`).first()).toContainText(`${vars.weight2 ?? ''}`);
    await expect(page.locator(`dd.variation-Geometry > p`).first()).toContainText(`${vars.option3 ?? ''}`);
    await expect(page.locator(`dd.variation-Primarytypeofriding > p`).first()).toContainText(`${vars.option4 ?? ''}`);
    await expect(page.locator(`dd.variation-Tires > p`).first()).toContainText(`${vars.option5 ?? ''}`);
    await expect(page.locator(`td.product-price > .woocommerce-Price-amount.amount > bdi`).first()).toContainText(`${vars.unitPrice ?? ''}`);
    await expect(page.locator(`td.product-subtotal > .woocommerce-Price-amount.amount > bdi`).first()).toContainText(`${vars.unitPrice ?? ''}`);
    await expect(page.locator(`tr.cart-subtotal > td > .woocommerce-Price-amount.amount > bdi`).first()).toContainText(`${vars.unitPrice ?? ''}`);
    await expect(page.locator(`strong > .woocommerce-Price-amount.amount > bdi`)).not.toHaveCount(0);
    // ↑ end 04 - Cart page
    await page.locator(`xpath=//a[contains(text(), "Proceed to checkout")]`).or(page.locator(`a[href*="/shop/checkout/"].fusion-button`)).filter({ visible: true }).first().click({ force: true });
    await wooCommerceCheckoutTemplate(page, vars);
    await expect(page.locator(`dd.variation-Model-yearofyourUTV > p`).first()).toContainText(`${vars.prod_year ?? ''}`);
    await expect(page.locator(`dd.variation-RiderWeight > p`).first()).toContainText(`${vars.weight ?? ''}`);
    await expect(page.locator(`dd.variation-Howmanypassengers > p`).first()).toContainText(`${vars.option1 ?? ''}`);
    await expect(page.locator(`dd.variation-Doyoucarryadditionalpayload > p`).first()).toContainText(`${vars.option2 ?? ''}`);
    await expect(page.locator(`dd.variation-Weightofyouradditionalpayload > p`).first()).toContainText(`${vars.weight2 ?? ''}`);
    await expect(page.locator(`dd.variation-Geometry > p`).first()).toContainText(`${vars.option3 ?? ''}`);
    await expect(page.locator(`dd.variation-Primarytypeofriding > p`).first()).toContainText(`${vars.option4 ?? ''}`);
    await expect(page.locator(`dd.variation-Tires > p`).first()).toContainText(`${vars.option5 ?? ''}`);
    try {
      await expect(page.locator(`div .ppc-button-wrapper`).first()).toBeVisible();
    } catch { /* optional step: assertElementVisible */ }
    try {
      await expect(page.locator(`iframe[src*="www.sandbox.paypal.com"]`).first().contentFrame().locator(`.paypal-powered-by`).first()).toBeVisible();
    } catch { /* optional step: assertElementVisible */ }
    // ↑ end 05 - Checkout page
    {
      const _lbl = page.locator(`label[for="terms"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#terms`).filter({ visible: true }).first().click({ force: true }); }
    }
    await fillCCPaypal(page, vars);
    await page.waitForTimeout(1000);
    await blockUI(page, vars);
    await expect(page.locator(`.woocommerce-notice--success.woocommerce-thankyou-order-received`).or(page.locator(`.woocommerce-order > h2.fusion-responsive-typography-calculated`)).first()).toContainText(`Thank you. Your order has been received.`);
    vars.orderNumber = ((await page.locator(`.order > strong`).textContent()) ?? '').trim();
    await expect(page.locator(`strong > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.total ?? ''}`);
    await expect(page.locator(`li:nth-of-type(1) > p`).first()).toContainText(`${vars.prod_year ?? ''}`);
    await expect(page.locator(`li:nth-of-type(2) > p`).first()).toContainText(`${vars.weight ?? ''}`);
    await expect(page.locator(`li:nth-of-type(3) > p`).first()).toContainText(`${vars.option1 ?? ''}`);
    await expect(page.locator(`li:nth-of-type(4) > p`).first()).toContainText(`${vars.option2 ?? ''}`);
    await expect(page.locator(`li:nth-of-type(5) > p`).first()).toContainText(`${vars.weight2 ?? ''}`);
    await expect(page.locator(`li:nth-of-type(6) > p`).first()).toContainText(`${vars.option3 ?? ''}`);
    await expect(page.locator(`li:nth-of-type(7) > p`).first()).toContainText(`${vars.option4 ?? ''}`);
    await expect(page.locator(`li:nth-of-type(8) > p`).first()).toContainText(`${vars.option5 ?? ''}`);
    await expect(page.locator(`td.woocommerce-table__product-total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    await expect(page.locator(`tfoot > tr:nth-of-type(1) > td.product-total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    await expect(page.locator(`tr:nth-of-type(2) > td.product-total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.shippingPrice ?? ''}`);
    await expect(page.locator(`tr:nth-of-type(3) > td.product-total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.taxPrice ?? ''}`);
    await expect(page.locator(`tr:nth-of-type(5) > td.product-total > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.total ?? ''}`);
    await expect(page.locator(`dl.customer_details > dd:nth-of-type(1)`).first()).toContainText(`${vars.email ?? ''}`);
    await expect(page.locator(`dl.customer_details > dd:nth-of-type(2)`).first()).toContainText(`${vars.phone ?? ''}`);
    await expect(page.locator(`address > p`).first()).toContainText(`${vars.firstName ?? ''}`);
    await expect(page.locator(`address > p`).first()).toContainText(`${vars.lastName ?? ''}`);
    await expect(page.locator(`address > p`).first()).toContainText(`${vars.company ?? ''}`);
    await expect(page.locator(`address > p`).first()).toContainText(`${vars.street ?? ''}`);
    await expect(page.locator(`address > p`).first()).toContainText(`${vars.city ?? ''}`);
    await expect(page.locator(`address > p`).first()).toContainText(`FL`);
    await expect(page.locator(`address > p`).first()).toContainText(`${vars.zipCode ?? ''}`);
    await expect(page.locator(`address > p`).first()).toContainText(`United States (US)`);
    await expect(page.locator(`.product-info > a[href*="/product/"]`).first()).toContainText(`${vars.prod_desc ?? ''}`);
    await page.locator(`xpath=//a[contains(text(), "My account")]`).or(page.locator(`a[href*="/my-account/"]`)).filter({ visible: true }).first().click({ force: true });
    await page.locator(`xpath=//a[contains(text(), "Orders")]`).or(page.locator(`.woocommerce-MyAccount-navigation-link > a[href*="/my-account/orders/"]`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.woocommerce-Price-amount`).first()).toHaveText(`${vars.total ?? ''}`);
    await page.locator(`xpath=//a[contains(text(), "#${vars.orderNumber ?? ''}")]`).or(page.locator(`td.woocommerce-orders-table__cell.woocommerce-orders-table__cell-order-number > a[href*="/my-account/view-order/${vars.orderNumber ?? ''}/"]`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`li:nth-of-type(1) > p`).first()).toContainText(`${vars.prod_year ?? ''}`);
    await expect(page.locator(`li:nth-of-type(2) > p`).first()).toContainText(`${vars.weight ?? ''}`);
    await expect(page.locator(`li:nth-of-type(3) > p`).first()).toContainText(`${vars.option1 ?? ''}`);
    await expect(page.locator(`li:nth-of-type(4) > p`).first()).toContainText(`${vars.option2 ?? ''}`);
    await expect(page.locator(`li:nth-of-type(5) > p`).first()).toContainText(`${vars.weight2 ?? ''}`);
    await expect(page.locator(`li:nth-of-type(6) > p`).first()).toContainText(`${vars.option3 ?? ''}`);
    await expect(page.locator(`li:nth-of-type(7) > p`).first()).toContainText(`${vars.option4 ?? ''}`);
    await expect(page.locator(`li:nth-of-type(8) > p`).first()).toContainText(`${vars.option5 ?? ''}`);
    await expect(page.locator(`td.woocommerce-table__product-total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    await expect(page.locator(`tfoot > tr:nth-of-type(1) > td.product-total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    await expect(page.locator(`tr:nth-of-type(2) > td.product-total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.shippingPrice ?? ''}`);
    await expect(page.locator(`tr:nth-of-type(3) > td.product-total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.taxPrice ?? ''}`);
    await expect(page.locator(`tr:nth-of-type(4) > td.product-total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.total ?? ''}`);
    await expect(page.locator(`tr:nth-of-type(5) > td.product-total`).first()).toHaveText(`PayPal`);
    await expect(page.locator(`dl.customer_details > dd:nth-of-type(1)`).first()).toContainText(`${vars.email ?? ''}`);
    await expect(page.locator(`dl.customer_details > dd:nth-of-type(2)`).first()).toContainText(`${vars.phone ?? ''}`);
    await expect(page.locator(`address > p`).first()).toContainText(`${vars.firstName ?? ''}`);
    await expect(page.locator(`address > p`).first()).toContainText(`${vars.lastName ?? ''}`);
    await expect(page.locator(`address > p`).first()).toContainText(`${vars.company ?? ''}`);
    await expect(page.locator(`address > p`).first()).toContainText(`${vars.street ?? ''}`);
    await expect(page.locator(`address > p`).first()).toContainText(`${vars.city ?? ''}`);
    await expect(page.locator(`address > p`).first()).toContainText(`FL`);
    await expect(page.locator(`address > p`).first()).toContainText(`${vars.zipCode ?? ''}`);
    await expect(page.locator(`address > p`).first()).toContainText(`United States (US)`);
  });

  test('03 - Place order - Email', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    vars.username = `${vars.email ?? ''}`;
    await extractUserFromEmail(page, vars);
    await page.locator(`xpath=//a[contains(text(), "order has been received!")]`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`tr.order_item > td.td:nth-of-type(1)`).first()).toContainText(`${vars.prodDesc ?? ''}`);
    await expect(page.locator(`td.td:nth-of-type(3) > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    await expect(page.locator(`tfoot > tr:nth-of-type(1) > td.td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    await expect(page.locator(`tr:nth-of-type(2) > td.td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.shippingPrice ?? ''}`);
    await expect(page.locator(`tr:nth-of-type(3) > td.td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.taxPrice ?? ''}`);
    await expect(page.locator(`tr:nth-of-type(5) > td.td`).first()).toContainText(`PayPal`);
    await expect(page.locator(`tr:nth-of-type(4) > td.td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.total ?? ''}`);
    await expect(page.locator(`tr:nth-of-type(6) > td.td`).first()).toContainText(`Order Note for Testing this field`);
    await expect(page.locator(`td:nth-of-type(1) > address.address`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.company ?? ''}
${vars.street ?? ''}
${vars.city ?? ''}, ${vars.state ?? ''} ${vars.zipCode ?? ''}-2082
${vars.countryComplete ?? ''}
${vars.phone ?? ''}
${vars.email ?? ''}`);
  });

});
