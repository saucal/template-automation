// @ts-nocheck
// Auto-generated from Ghost Inspector suite: "Inspire Gateway - Basic WooCommerce Test"
// Review all TODOs before running.
import dotenv from 'dotenv';
dotenv.config();
import { test, expect } from '@playwright/test';
import { extractFourDigitsOfCC } from '../helpers/bluesnap-common-steps-for-suites';
import { blockUI, placeOrderElement, wooCommerceCheckoutTemplate } from '../helpers/common-steps-for-all-projects';
import { adminLogin, fillCCInfo, fillCCInfoSubscriptionOrSaveCCNotSetted } from '../helpers/inspire-gateway-common-steps-for-suites';

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

test.describe('Inspire Gateway - Basic WooCommerce Test', () => {

  const vars = new Proxy<Record<string, string>>({
    "email": `qa+gi_order_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "emailReg": `qa+gi_reg_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "emailForgot": `qa+gi_forgot_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "payPalUser": "qa+gi_sb-8eg0v132169@saucal.com",
    "payPalPass": process.env.PAY_PAL_PASS ?? '',
    "adminUser": "saucal_maintenance_admin",
    "adminPass": process.env.ADMIN_PASS ?? '',
    "CCard_Visa": "4532456663391384",
    "CCard_Master": "5428418638398609",
    "month": "12",
    "year": "2030",
    "firstName": "QA",
    "lastName": `${Math.random().toString(36).substring(2, 10)}`,
    "street": "123 False Street",
    "city": "Miami",
    "stateComplete": "Florida",
    "zipCode": "33126",
    "phone": "3049589689",
    "CCard_stripe": "4242424242424242",
    "password": process.env.PASSWORD ?? '',
    "woo_user": process.env.WOO_USER ?? '',
    "woo_pass": process.env.WOO_PASS ?? '',
    "state": "FL",
    "project": "inspire",
    "Symbol": "$",
  }, { get: (o: Record<string, string>, k: string) => (k in o ? o[k] : '') });

  test('01 - Simple Product - Place Order', async ({ page }) => {
    await page.goto(`/product/beanie/`);
    await page.waitForLoadState('load');

    vars.CCard = `${vars.CCard_Master ?? ''}`;
    vars.CCType = `MasterCard`;
    await page.locator(`xpath=//button[contains(text(), "Add to cart")]`).or(page.locator(`button[name="add-to-cart"]`)).filter({ visible: true }).first().click({ force: true });
    await page.locator(`.woocommerce-message > a[href*="/cart/"].button.wc-forward`).filter({ visible: true }).first().click({ force: true });
    vars.total = ((await page.locator(`strong > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
    await page.locator(`xpath=//a[contains(text(), "Proceed to checkout")]`).or(page.locator(`a[href*="/checkout/"].checkout-button`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`label[for="payment_method_inspire"]`)).not.toHaveCount(0);
    await page.locator(`label[for="payment_method_inspire"]`).filter({ visible: true }).first().click({ force: true });
    await blockUI(page, vars);
    await placeOrderElement(page, vars);
    await expect(page.locator(`.woocommerce-error > li:nth-of-type(1)`).first()).toContainText(`Card number is invalid.`);
    await wooCommerceCheckoutTemplate(page, vars);
    await fillCCInfo(page, vars);
    await placeOrderElement(page, vars);
    await expect(page.locator(`h1.entry-title`).first()).toContainText(`Order received`);
    await expect(page.locator(`strong > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.total ?? ''}`);
    await expect(page.locator(`tr:nth-of-type(4) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.total ?? ''}`);
    await page.locator(`.nav-menu > .page_item.page-item-9 > a[href*="/my-account/"]`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`xpath=//a[contains(text(), "Orders")]`).or(page.locator(`.woocommerce-MyAccount-navigation-link > a[href*="/my-account/orders/"]`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`td.woocommerce-orders-table__cell > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.total ?? ''}`);
    await expect(page.locator(`td.woocommerce-orders-table__cell.woocommerce-orders-table__cell-order-status`).first()).toContainText(`Processing`);
    await page.locator(`xpath=//a[contains(text(), "View")]`).or(page.locator(`a[href*="/my-account/view-order/"].woocommerce-button`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`tr:nth-of-type(4) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.total ?? ''}`);
    await expect(page.locator(`tr:nth-of-type(3) > td`).first()).toContainText(`Credit Card (Inspire Commerce)`);
    vars.orderNumber = ((await page.locator(`mark.order-number`).textContent()) ?? '').trim();
    await page.locator(`xpath=//a[contains(text(), "Dashboard")]`).or(page.locator(`.woocommerce-MyAccount-navigation-link.woocommerce-MyAccount-navigation-link--dashboard > a[href*="/my-account/"]`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.woocommerce-MyAccount-content > header.title:nth-of-type(1)`)).not.toHaveCount(0);
    await extractFourDigitsOfCC(page, vars);
    await expect(page.locator(`#cc-number-0`).first()).toContainText(`${vars.fourDigits ?? ''}`);
    vars.1fourDigits = `${vars.fourDigits ?? ''}`;
    await expect(page.locator(`.woocommerce-MyAccount-content > header.title:nth-of-type(2)`)).toHaveCount(0);
    await expect(page.locator(`#edit-button-0`).first()).toContainText(`Edit`);
    {
      const _lbl = page.locator(`label[for="edit-button-0"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#edit-button-0`).filter({ visible: true }).first().click({ force: true }); }
    }
    vars.CCard = `${vars.CCard_Visa ?? ''}`;
    try { await page.locator(`#edit-cc-number-0`).first().fill(`${vars.CCard ?? ''}`); } catch { await page.locator(`#edit-cc-number-0`).first().selectOption(`${vars.CCard ?? ''}`); }
    try { await page.locator(`#edit-cc-exp-0`).first().fill(`12/24`); } catch { await page.locator(`#edit-cc-exp-0`).first().selectOption(`12/24`); }
    {
      const _lbl = page.locator(`label[for="save-button-0"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#save-button-0`).filter({ visible: true }).first().click({ force: true }); }
    }
    await expect(page.locator(`#cc-number-0`).first()).toContainText(`${vars.fourDigits ?? ''}`);
    await page.locator(`.nav-menu > .page_item.page-item-6 > a[href*="/shop/"]`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`a[href="?add-to-cart=29"]`).or(page.locator(`a[href="/shop/?add-to-cart=29"]`)).filter({ visible: true }).first().click({ force: true });
    await page.locator(`a[href*="/cart/"][title="View cart"]`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`xpath=//a[contains(text(), "Proceed to checkout")]`).or(page.locator(`a[href*="/checkout/"].checkout-button`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`#inspire-stored-info > p`).first()).toContainText(`${vars.fourDigits ?? ''}`);
    {
      const _lbl = page.locator(`label[for="place_order"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`xpath=//button[contains(text(), "Place order")]`).or(page.locator(`#place_order`)).filter({ visible: true }).first().click({ force: true }); }
    }
    await expect(page.locator(`h1.entry-title`).first()).toContainText(`Order received`);
    await expect(page.locator(`.woocommerce-notice`).first()).toContainText(`Thank you. Your order has been received.`);
  });

  test('02 - Simple Product - Order on Admin', async ({ page }) => {
    await page.goto(`/my-account/`);
    await page.waitForLoadState('load');

    await adminLogin(page, vars);
    await page.goto(`https://pluginmaint.mystagingwebsite.com/wp-admin/`);
    await page.waitForLoadState('load');
    await page.locator(`#toplevel_page_woocommerce > a > div.wp-menu-name`).first().hover();
    await page.locator(`a[href="edit.php?post_type=shop_order"]`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`a[href*="/wp-admin/post.php?post=${vars.orderNumber ?? ''}&action=edit"] > strong`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.woocommerce-order-data__meta`).first()).toContainText(`Payment via Credit Card (Inspire Commerce).`);
    vars.transactionNote = ((await page.locator(`li.note.system-note:nth-of-type(2) > .note_content > p`).textContent()) ?? '').trim();
    vars.transactionID = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let str = `${vars.transactionNote}`;
let regex = /([0-9])\w+/g;
let m;

m = regex.exec(str);
return m[0] }, vars);
    await expect(page.locator(`li.note.system-note:nth-of-type(2) > .note_content > p`).first()).toContainText(`Inspire Commerce payment completed. Transaction ID:`);
    await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); window.open(`https://secure.inspiregateway.net/api/query.php/?security_key=G878BrDH5enF89F46tem2Fssa93DV3Ta&transaction_id=${vars.transactionID}`)
 }, vars);
    await expect(page.locator(`transaction > transaction_id`).first()).toHaveText(`${vars.transactionID ?? ''}`);
    await expect(page.locator(`transaction > order_id`).first()).toHaveText(`${vars.orderNumber ?? ''}`);
    await expect(page.locator(`transaction > cc_number`).first()).toContainText(`${vars['1fourDigits'] ?? ''}`);
    vars.total2 = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let total = `${vars.total}`;

total = Number(total.replace("$",""))

return total }, vars);
    await expect(page.locator(`action > amount`).first()).toContainText(`${vars.total2 ?? ''}`);
  });

  test('03 - Subscription Product - Place Order', async ({ page }) => {
    await page.goto(`/product/subscription-product-test-1/`);
    await page.waitForLoadState('load');

    vars.type = `Sub`;
    vars.CCard = `${vars.CCard_Master ?? ''}`;
    vars.CCType = `MasterCard`;
    await page.locator(`xpath=//button[contains(text(), "Add to cart")]`).or(page.locator(`button[name="add-to-cart"]`)).filter({ visible: true }).first().click({ force: true });
    await page.locator(`.woocommerce-message > a[href*="/cart/"].button.wc-forward`).filter({ visible: true }).first().click({ force: true });
    vars.total = ((await page.locator(`strong > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
    await page.locator(`xpath=//a[contains(text(), "Proceed to checkout")]`).or(page.locator(`a[href*="/checkout/"].checkout-button`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`label[for="payment_method_inspire"]`)).not.toHaveCount(0);
    await page.locator(`label[for="payment_method_inspire"]`).filter({ visible: true }).first().click({ force: true });
    await blockUI(page, vars);
    await placeOrderElement(page, vars);
    await expect(page.locator(`.woocommerce-error > li:nth-of-type(1)`).first()).toContainText(`Card number is invalid.`);
    vars.email = `qa+gi_suborder_${vars.alphanumeric ?? ''}@saucal.com`;
    await wooCommerceCheckoutTemplate(page, vars);
    await fillCCInfoSubscriptionOrSaveCCNotSetted(page, vars);
    await placeOrderElement(page, vars);
    await expect(page.locator(`h1.entry-title`).first()).toContainText(`Order received`);
    await expect(page.locator(`strong > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.total ?? ''}`);
    await expect(page.locator(`tr:nth-of-type(4) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.total ?? ''}`);
    await expect(page.locator(`td.subscription-total.order-total.woocommerce-orders-table__cell.woocommerce-orders-table__cell-subscription-total.woocommerce-orders-table__cell-order-total > span`).first()).toHaveText(`${vars.total ?? ''}`);
    await page.locator(`.nav-menu > .page_item.page-item-9 > a[href*="/my-account/"]`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`xpath=//a[contains(text(), "Orders")]`).or(page.locator(`.woocommerce-MyAccount-navigation-link > a[href*="/my-account/orders/"]`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`td.woocommerce-orders-table__cell > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.total ?? ''}`);
    await expect(page.locator(`td.woocommerce-orders-table__cell.woocommerce-orders-table__cell-order-status`).first()).toContainText(`Processing`);
    await page.locator(`xpath=//a[contains(text(), "View")]`).or(page.locator(`a[href*="/my-account/view-order/"].woocommerce-button`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`tr:nth-of-type(4) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.total ?? ''}`);
    await expect(page.locator(`tr:nth-of-type(3) > td`).first()).toContainText(`Credit Card (Inspire Commerce)`);
    vars.orderNumber = ((await page.locator(`mark.order-number`).textContent()) ?? '').trim();
    await page.locator(`xpath=//a[contains(text(), "My Subscription")]`).or(page.locator(`a[href*="/my-account/view-subscription/"]`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`table.shop_table.subscription_details > tbody > tr:nth-of-type(1) > td:nth-of-type(2)`).first()).toContainText(`Active`);
    await expect(page.locator(`.subscription-payment-method`).first()).toContainText(`Via Credit Card (Inspire Commerce)`);
    await expect(page.locator(`tr:nth-of-type(3) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.total ?? ''}`);
    await expect(page.locator(`td.order-number > a[href*="/my-account/view-order/"]`).first()).toContainText(`${vars.orderNumber ?? ''}`);
    await page.locator(`xpath=//a[contains(text(), "Dashboard")]`).or(page.locator(`.woocommerce-MyAccount-navigation-link.woocommerce-MyAccount-navigation-link--dashboard > a[href*="/my-account/"]`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.woocommerce-MyAccount-content > header.title:nth-of-type(1)`)).not.toHaveCount(0);
    await extractFourDigitsOfCC(page, vars);
    await expect(page.locator(`#cc-number-0`).first()).toContainText(`${vars.fourDigits ?? ''}`);
    await expect(page.locator(`.woocommerce-MyAccount-content > header.title:nth-of-type(2)`)).toHaveCount(0);
  });

  test('04 - Subscription Product - Order on Admin', async ({ page }) => {
    await page.goto(`/my-account/`);
    await page.waitForLoadState('load');

    await adminLogin(page, vars);
    await page.goto(`https://pluginmaint.mystagingwebsite.com/wp-admin/`);
    await page.waitForLoadState('load');
    await page.locator(`#toplevel_page_woocommerce > a > div.wp-menu-name`).first().hover();
    await page.locator(`a[href="edit.php?post_type=shop_order"]`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`a[href*="/wp-admin/post.php?post=${vars.orderNumber ?? ''}&action=edit"]`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.woocommerce-order-data__meta`).first()).toContainText(`Payment via Credit Card (Inspire Commerce).`);
    vars.transactionNote = ((await page.locator(`li.note.system-note:nth-of-type(2) > .note_content > p`).textContent()) ?? '').trim();
    vars.transactionID = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let str = `${vars.transactionNote}`;
let regex = /([0-9])\w+/g;
let m;

m = regex.exec(str);
return m[0] }, vars);
    await expect(page.locator(`li.note.system-note:nth-of-type(2) > .note_content > p`).first()).toContainText(`Inspire Commerce payment completed. Transaction ID:`);
    await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); window.open(`https://secure.inspiregateway.net/api/query.php/?security_key=G878BrDH5enF89F46tem2Fssa93DV3Ta&transaction_id=${vars.transactionID}`)
 }, vars);
    await expect(page.locator(`transaction > transaction_id`).first()).toHaveText(`${vars.transactionID ?? ''}`);
    await expect(page.locator(`transaction > order_id`).first()).toHaveText(`${vars.orderNumber ?? ''}`);
    await expect(page.locator(`transaction > cc_number`).first()).toContainText(`${vars['1fourDigits'] ?? ''}`);
    vars.total2 = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let total = `${vars.total}`;

total = Number(total.replace("$",""))

return total }, vars);
    await expect(page.locator(`action > amount`).first()).toContainText(`${vars.total2 ?? ''}`);
    await page.locator(`div.woocommerce_subscriptions_related_orders a[href*="/wp-admin/post.php?post="]`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.inspire`)).not.toHaveCount(0);
    await expect(page.locator(`#select2-order_status-container`).first()).toContainText(`Active`);
    await expect(page.locator(`.wc-order-data-row.wc-order-totals-items > table.wc-order-totals:nth-of-type(1) > tbody > tr:nth-of-type(3) > td.total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.total ?? ''}`);
  });

});
