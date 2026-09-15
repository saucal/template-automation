// @ts-nocheck
// Auto-generated from Ghost Inspector suite: "McKeen - Order - Declined transaction"
// Review all TODOs before running.
import dotenv from 'dotenv';
dotenv.config();
import { test, expect } from '@playwright/test';
import { blockUI, calculateSubtotal, placeOrderElement, wooCommerceCheckoutTemplate } from '../helpers/common-steps-for-all-projects';
import { _09PlaceOrder02Backend } from '../helpers/template-woocommerce-tests';

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

test.describe('McKeen - Order - Declined transaction', () => {

  const vars = new Proxy<Record<string, string>>({
    "email": `qa+gi_order_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "emailReg": `qa+gi_reg_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "emailForgot": `qa+gi_forgot_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "payPalUser": "qa+gi_sb-8eg0v132169@saucal.com",
    "payPalPass": process.env.PAY_PAL_PASS ?? '',
    "adminUser": "saucal_maintenance_admin",
    "adminPass": process.env.ADMIN_PASS ?? '',
    "zipCode": "K1S 3V6",
    "url": "https://staging-metroglebe.kinsta.cloud/",
    "stateComplete": "Ontario",
    "country": "CA",
    "countryComplete": "Canada",
    "lastName2": "Shipping Last Name",
    "street3": "123 Shipping False",
    "street4": "Of. 67",
    "company2": "Shipping company",
    "phone": "5675676545",
    "password": process.env.PASSWORD ?? '',
    "company": "Testing SA",
    "project": "mckeen",
    "currency": "CAD",
    "Symbol": "$",
    "firstName": "QA",
    "lastName": `${Math.random().toString(36).substring(2, 10)}`,
    "street": "123 False Street",
    "street2": "Ap. 2",
    "city": "Ottawa",
    "state": "ON",
    "admin_user": "guest+maintenanceAdmin@saucal.com",
    "admin_pass": process.env.ADMIN_PASS ?? '',
  }, { get: (o: Record<string, string>, k: string) => (k in o ? o[k] : '') });

  test('Place order - 01 - New User', async ({ page }) => {
    await page.goto(`${vars.url ?? ''}`);
    await page.waitForLoadState('load');

    await page.locator(`a[href="/shop"].shop`).filter({ visible: true }).first().click({ force: true });
    try { await page.locator(`input[placeholder="enter your postal code"]`).first().fill(`${vars.zipCode ?? ''}`); } catch { await page.locator(`input[placeholder="enter your postal code"]`).first().selectOption(`${vars.zipCode ?? ''}`); }
    await page.locator(`button.confirm`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`.category-title > a[href*="/product-category/local/"]`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`a > h2.woocommerce-loop-product__title`).filter({ visible: true }).first().click({ force: true });
    {
      const _lbl = page.locator(`label[for="pa_selection"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#pa_selection`).filter({ visible: true }).first().click({ force: true }); }
    }
    await page.locator(`#pa_selection > option.attached.enabled`).filter({ visible: true }).first().click({ force: true });
    vars.unitPrice = ((await page.locator(`div.woocommerce-variation.single_variation > div.woocommerce-variation-price > span > span > bdi`).textContent()) ?? '').trim();
    vars.qty = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let unit_price = `${vars.unitPrice}`;
unit_price = Number(unit_price.replace("$","").trim());
let qty = Math.ceil(50 / unit_price);
return qty
 }, vars);
    try { await page.locator(`input[name="quantity"]`).first().fill(`${vars.qty ?? ''}`); } catch { await page.locator(`input[name="quantity"]`).first().selectOption(`${vars.qty ?? ''}`); }
    await page.locator(`xpath=//button[contains(text(), "Add to cart")]`).or(page.locator(`button[type="submit"]`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.header-social > .container > .header-social__holder > .social-svg_holder.cart--holder > [id="site-header-cart"].site-header-cart.menu > li:nth-of-type(2) > .widget.woocommerce.widget_shopping_cart > .widget_shopping_cart_content > .woocommerce-mini-cart.cart_list.product_list_widget > .woocommerce-mini-cart-item.mini_cart_item > .quantity > .woocommerce-Price-amount.amount > bdi`).first()).toContainText(`${vars.unitPrice ?? ''}`);
    await page.locator(`.header-social > .container > .header-social__holder > .social-svg_holder.cart--holder > [id="site-header-cart"].site-header-cart.menu > li:nth-of-type(2) > .widget.woocommerce.widget_shopping_cart > .widget_shopping_cart_content > .woocommerce-mini-cart__buttons.buttons > a[href*="/cart/"].button.wc-forward`).filter({ visible: true }).first().click({ force: true });
    await calculateSubtotal(page, vars);
    try {
      await expect(page.locator(`tr.cart-subtotal > td > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
    } catch { /* optional step: assertText */ }
    vars.shippingPrice = ((await page.locator(`label[for="shipping_method_0_flat_rate1"] > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
    await expect(page.locator(`tr.shipping > td > p`).first()).toHaveText(`Shipping to ON ${vars.zipCode ?? ''}.`);
    try {
      vars.taxPrice = ((await page.locator(`tr.tax-rate > td > .woocommerce-Price-amount.amount`).textContent()) ?? '').trim();
    } catch { /* optional step: extract */ }
    vars.total = ((await page.locator(`tr.order-total > td > strong > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
    await page.locator(`xpath=//a[contains(text(), "Proceed to checkout")]`).or(page.locator(`a[href*="/checkout/"]`)).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    await blockUI(page, vars);
    await placeOrderElement(page, vars);
    await expect(page.locator(`.woocommerce_error > li`).first()).toContainText(`The card number is incomplete.`);
    {
      let _ok = false;
      if (!_ok) { try { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="cardnumber"]`).first().click({ force: true }); _ok = true; } catch {} }
      if (!_ok) throw new Error('No clickable candidate matched');
    }
    try { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="cardnumber"]`).first().fill(`4000 0000 0000 0341`); } catch { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="cardnumber"]`).first().selectOption(`4000 0000 0000 0341`); }
    try { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="exp-date"]`).first().fill(`04 / 28`); } catch { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="exp-date"]`).first().selectOption(`04 / 28`); }
    try { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="cvc"]`).first().fill(`242`); } catch { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="cvc"]`).first().selectOption(`242`); }
    await placeOrderElement(page, vars);
    await expect(page.locator(`.wc-block-components-notice-banner__content ul > li:nth-of-type(1)`).or(page.locator(`.woocommerce-error > li:nth-of-type(1)`)).first()).toContainText(`Selected date is not valid`);
    await expect(page.locator(`.wc-block-components-notice-banner__content ul > li:nth-of-type(2)`).or(page.locator(`.woocommerce-error > li:nth-of-type(2)`)).first()).toContainText(`Billing First name is a required field.`);
    await expect(page.locator(`.wc-block-components-notice-banner__content ul > li:nth-of-type(3)`).or(page.locator(`.woocommerce-error > li:nth-of-type(3)`)).first()).toContainText(`Billing Last name is a required field.`);
    await expect(page.locator(`.wc-block-components-notice-banner__content ul > li:nth-of-type(4)`).or(page.locator(`.woocommerce-error > li:nth-of-type(4)`)).first()).toContainText(`Billing Street address is a required field.`);
    await expect(page.locator(`.wc-block-components-notice-banner__content ul > li:nth-of-type(5)`).or(page.locator(`.woocommerce-error > li:nth-of-type(5)`)).first()).toContainText(`Billing Phone is a required field.`);
    await expect(page.locator(`.wc-block-components-notice-banner__content ul > li:nth-of-type(6)`).or(page.locator(`.woocommerce-error > li:nth-of-type(6)`)).first()).toContainText(`Billing Email address is a required field.`);
    await expect(page.locator(`.wc-block-components-notice-banner__content ul > li:nth-of-type(7)`).or(page.locator(`.woocommerce-error > li:nth-of-type(7)`)).first()).toContainText(`Delivery Date is a required field.`);
    await expect(page.locator(`.wc-block-components-notice-banner__content ul > li:nth-of-type(8)`).or(page.locator(`.woocommerce-error > li:nth-of-type(8)`)).first()).toContainText(`Please read and accept the terms and conditions to proceed with your order.`);
    await wooCommerceCheckoutTemplate(page, vars);
    await page.locator(`img[title="Calendar View"]`).filter({ visible: true }).first().click({ force: true });
    vars.tomorrow = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let d = new Date();
let today = d.getDate();
let tomorrow;
if (today == 28 || today==30 || today == 31) {
    tomorrow = 1
} else {
 tomorrow = today+1;
}
return tomorrow
 }, vars);
    await page.locator(`xpath=//a[contains(text(), "${vars.tomorrow ?? ''}")]`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`xpath=//label[contains(text(), "Save payment information to my account for future purchases.")]`).or(page.locator(`label[for="wc-stripe-new-payment-method"]`)).filter({ visible: true }).first().click({ force: true });
    await blockUI(page, vars);
    await placeOrderElement(page, vars);
    await page.waitForLoadState('load');
    vars.orderNumber = ((await page.locator(`.order > strong`).textContent()) ?? '').trim();
    await expect(page.locator(`.email > strong`).first()).toHaveText(`${vars.email ?? ''}`);
    await expect(page.locator(`.total > strong > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.total ?? ''}`);
    await expect(page.locator(`td.woocommerce-table__product-total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
    await expect(page.locator(`table.woocommerce-table > tfoot > tr:nth-of-type(1) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
    await expect(page.locator(`table.woocommerce-table > tfoot > tr:nth-of-type(2) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.shippingPrice ?? ''}`);
    await expect(page.locator(`table.woocommerce-table > tfoot > tr:nth-of-type(3) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.taxPrice ?? ''}`);
    await expect(page.locator(`table.woocommerce-table > tfoot > tr:nth-of-type(5) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.total ?? ''}`);
    await expect(page.locator(`.woocommerce-column.woocommerce-column--1 > address`).first()).toContainText(`${vars.company ?? ''}
${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.street ?? ''}
${vars.street2 ?? ''}
${vars.city ?? ''} ${vars.state ?? ''} ${vars.zipCode ?? ''}

${vars.phone ?? ''}

${vars.email ?? ''}`);
    await expect(page.locator(`.woocommerce-column.woocommerce-column--2 > address`).first()).toContainText(`${vars.company2 ?? ''}
${vars.firstName ?? ''} ${vars.lastName2 ?? ''}
${vars.street3 ?? ''}
${vars.street4 ?? ''}
${vars.city ?? ''} ${vars.state ?? ''} ${vars.zipCode ?? ''}`);
    await page.locator(`.header-social > .container > .header-social__holder > a[href="/my-account"].my-account`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`.woocommerce-MyAccount-navigation-link > a[href*="/my-account/orders/"]`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`td.woocommerce-orders-table__cell.woocommerce-orders-table__cell-order-status`).first()).toHaveText(`Received`);
    await expect(page.locator(`.woocommerce-Price-amount`).first()).toContainText(`${vars.total ?? ''}`);
    await page.locator(`xpath=//a[contains(text(), "View")]`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.woocommerce-Price-amount > bdi`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
    await expect(page.locator(`table.woocommerce-table > tfoot > tr:nth-of-type(1) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
    await expect(page.locator(`table.woocommerce-table > tfoot > tr:nth-of-type(2) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.shippingPrice ?? ''}`);
    await expect(page.locator(`table.woocommerce-table > tfoot > tr:nth-of-type(3) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.taxPrice ?? ''}`);
    await expect(page.locator(`mark.order-status`).first()).toContainText(`Received`);
  });

  test('Place order - 02 - Backend Admin', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await _09PlaceOrder02Backend(page, vars);
    {
      const _lbl = page.locator(`label[for="select2-order_status-container"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#select2-order_status-container`).filter({ visible: true }).first().click({ force: true }); }
    }
    await page.locator(`xpath=//li[contains(text(), "Collecting")]`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`xpath=//button[contains(text(), "Update")]`).or(page.locator(`button[name="save"]`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`li.note:nth-of-type(1) > .note_content > p`).first()).toContainText(`Order status changed from Received to Collecting.`);
    {
      const _lbl = page.locator(`label[for="select2-order_status-container"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`xpath=//span[contains(text(), "Collecting")]`).or(page.locator(`#select2-order_status-container`)).filter({ visible: true }).first().click({ force: true }); }
    }
    await page.locator(`xpath=//li[contains(text(), "Charge")]`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`xpath=//button[contains(text(), "Update")]`).or(page.locator(`button[name="save"]`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`li.note.system-note:nth-of-type(3) > .note_content > p`).first()).toContainText(`Stripe payment intent created (Payment Intent ID:`);
    await expect(page.locator(`li.note.system-note:nth-of-type(2) > .note_content > p`).first()).toContainText(`Order status changed from Charge to Collecting.`);
    await expect(page.locator(`li.note.system-note:nth-of-type(1) > .note_content > p`).first()).toContainText(`The card was declined.`);
    await expect(page.locator(`#select2-order_status-container`).first()).toContainText(`Collecting`);
  });

});
