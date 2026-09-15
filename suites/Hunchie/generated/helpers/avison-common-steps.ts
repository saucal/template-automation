// @ts-nocheck
// Auto-generated from Ghost Inspector suite: "Avison - Common steps"
// Review all TODOs before using in production.
import { expect, type Page } from '@playwright/test';
import { extractUserFromEmail } from './common-steps-for-all-projects';

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

// GI: "Admin login" (675af2e97a599a5bc877efa3)
export async function adminLogin(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.goto(`${vars.url ?? ''}/wp-admin/post.php?post=${vars.orderNumber ?? ''}&action=edit`);
  await page.waitForLoadState('load');
  await page.waitForLoadState('load');
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let flag = document.querySelector('ul > .woocommerce-MyAccount-navigation-link--dashboard.is-active').checkVisibility();
return flag; }, vars)) {
    await page.locator(`div > div > p:nth-child(2) > a`).or(page.locator(`#post-15 > div > div > div > div > p:nth-child(2) > a`)).filter({ visible: true }).first().click({ force: true });
  }
  try { await page.locator(`#username`).first().fill(`${vars.admin ?? ''}`); } catch { await page.locator(`#username`).first().selectOption(`${vars.admin ?? ''}`); }
  try { await page.locator(`#password`).first().fill(`${vars.adminPass ?? ''}`); } catch { await page.locator(`#password`).first().selectOption(`${vars.adminPass ?? ''}`); }
  await page.locator(`form.login > p > button`).or(page.locator(`#customer_login > div.u-column1.col-1 > form > p:nth-child(3) > button`)).filter({ visible: true }).first().click({ force: true });
}

// GI: "Calculate shipping in cart" (67599a8ce11b42a63da83469)
export async function calculateShippingInCart(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.locator(`.woocommerce-shipping-calculator > a`).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`.shipping-calculator-form`).first()).toBeVisible();
  try { await page.locator(`#calc_shipping_country`).first().fill(`${vars.countryShort ?? ''}`); } catch { await page.locator(`#calc_shipping_country`).first().selectOption(`${vars.countryShort ?? ''}`); }
  try { await page.locator(`select#calc_shipping_state`).first().fill(`${vars.shippingStateShort ?? ''}`); } catch { await page.locator(`select#calc_shipping_state`).first().selectOption(`${vars.shippingStateShort ?? ''}`); }
  try { await page.locator(`input#calc_shipping_city`).first().fill(`${vars.shippingCity ?? ''}`); } catch { await page.locator(`input#calc_shipping_city`).first().selectOption(`${vars.shippingCity ?? ''}`); }
  try { await page.locator(`input#calc_shipping_postcode`).first().fill(`${vars.shippingZip ?? ''}`); } catch { await page.locator(`input#calc_shipping_postcode`).first().selectOption(`${vars.shippingZip ?? ''}`); }
  await page.locator(`form > section > p > button.button`).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`.woocommerce-shipping-totals`).first()).toBeVisible();
}

// GI: "Check order on backend" (675b7a367a599a5bc891766b)
export async function checkOrderOnBackend(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await expect(page.locator(`.woocommerce-order-data__meta`).first()).toContainText(`Payment via Credit Card`);
  await expect(page.locator(`#select2-order_status-container`).first()).toContainText(`Processing`);
  await expect(page.locator(`div.order_data_column:nth-of-type(2) > .address > p:nth-of-type(1)`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.shippingStreet ?? ''}
${vars.shippingCity ?? ''}, ${vars.shippingStateShort ?? ''} ${vars.shippingZip ?? ''}`);
  await expect(page.locator(`div.order_data_column:nth-child(2) > div:nth-child(2) > p:nth-child(2) > a`).first()).toHaveText(`${vars.email ?? ''}`);
  await expect(page.locator(`div.order_data_column:nth-child(2) > div:nth-child(2) > p:nth-child(2) > a`).first()).toHaveText(`${vars.email ?? ''}`);
  await expect(page.locator(`td.item_cost > .view > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.productPrice ?? ''}`);
  vars.shippingPrice = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let shippingPrice = `${vars.shippingText}`
if (shippingPrice.includes("Free")){
    shippingPrice = "$0.00";
};
return shippingPrice }, vars);
  await expect(page.locator(`.shipping > td:nth-child(2) > div.view:nth-child(1)`).first()).toContainText(`${vars.shippingText ?? ''}`);
  await expect(page.locator(`tr.shipping > td.line_cost > .view > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.shippingPrice ?? ''}`);
  await expect(page.locator(`div.wc-order-data-row:not(.wc-order-refund-items) > table.wc-order-totals:nth-of-type(1) > tbody > tr:nth-of-type(1) > td.total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.productPrice ?? ''}`);
  await expect(page.locator(`.wc-order-data-row.wc-order-totals-items > table.wc-order-totals:nth-of-type(1) > tbody > tr:nth-of-type(3) > td.total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.productPrice ?? ''}`);
}

// GI: "Check order on Email " (6759e8a77a599a5bc84ef7cc)
export async function checkOrderOnEmail(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await extractUserFromEmail(page, vars);
  await expect(page.locator(`#header_wrapper > h1`).first()).toContainText(`Thank you for your order`);
  await expect(page.locator(`.td > tbody > tr > td:nth-child(1)`).first()).toContainText(`${vars.productName ?? ''}`);
  await expect(page.locator(`.td > tbody > tr > td:nth-child(2)`).first()).toContainText(`${vars.qty ?? ''}`);
  await expect(page.locator(`.td > tbody > tr > td:nth-child(3)`).first()).toHaveText(`$${vars.total ?? ''}`);
  await expect(page.locator(`tfoot > tr:nth-child(1) > td`).first()).toHaveText(`$${vars.total ?? ''}`);
  await expect(page.locator(`tfoot > tr:nth-child(2) > td`).first()).toContainText(`${vars.shippingText ?? ''}`);
  await expect(page.locator(`tfoot > tr:nth-child(3) > td`).first()).toContainText(`${vars.tax ?? ''}`);
  await expect(page.locator(`tfoot > tr:nth-child(4) > td`).first()).toContainText(`Credit Card`);
  await expect(page.locator(`tr:nth-of-type(5) > td.td > .woocommerce-Price-amount.amount`).first()).toHaveText(`$${vars.total ?? ''}`);
  await expect(page.locator(`tbody > tr > td:nth-child(1) > .address`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.billingStreet ?? ''}
${vars.address2 ?? ''}
${vars.billingCity ?? ''}, ${vars.billingStateShort ?? ''} ${vars.billingZip ?? ''}
+14843004199
${vars.email ?? ''}`);
}

// GI: "Extract order from URL" (675a05027a599a5bc853570e)
export async function extractOrderFromURL(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.orderNumber = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let order = window.location.href;
order = order.split('/');
return order[5];
 }, vars);
}

// GI: "Extract shipping options WIP not finished" (6759a4b97a599a5bc83cb739)
export async function extractShippingOptionsWIPNotFinished(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let shippings = Array.from<any>(document.querySelectorAll("#shipping_method > li > label"));
 }, vars);
}

// GI: "Extract username" (675752d6e11b42a63d349a1f)
export async function extractUsername(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.userEmailExtract = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const email = `${vars.email}`;
let extractedUserName = email.slice(0,29);
console.log(extractedUserName);
return extractedUserName; }, vars);
}

// GI: "Fill alternative address" (675a0a9b7a599a5bc85412a1)
export async function fillAlternativeAddress(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.locator(`input#shipping_dif_from_billing_radio`).or(page.locator(`#cfw-shipping-same-billing > ul.cfw-radio-reveal-group > li:nth-child(2) > div > label`)).filter({ visible: true }).first().click({ force: true });
  try { await page.locator(`#billing_first_name`).first().fill(`${vars.firstName ?? ''}`); } catch { await page.locator(`#billing_first_name`).first().selectOption(`${vars.firstName ?? ''}`); }
  try { await page.locator(`#billing_last_name`).first().fill(`${vars.lastName ?? ''}`); } catch { await page.locator(`#billing_last_name`).first().selectOption(`${vars.lastName ?? ''}`); }
  try { await page.locator(`#billing_address_1`).first().fill(`${vars.billingStreet ?? ''}`); } catch { await page.locator(`#billing_address_1`).first().selectOption(`${vars.billingStreet ?? ''}`); }
  await page.locator(`div#cfw-billing-fields-container > div:nth-child(4) > a`).filter({ visible: true }).first().click({ force: true });
  try { await page.locator(`#billing_address_2`).first().fill(`${vars.address2 ?? ''}`); } catch { await page.locator(`#billing_address_2`).first().selectOption(`${vars.address2 ?? ''}`); }
  try { await page.locator(`#billing_postcode`).first().fill(`${vars.billingZip ?? ''}`); } catch { await page.locator(`#billing_postcode`).first().selectOption(`${vars.billingZip ?? ''}`); }
  try { await page.locator(`#billing_state`).first().fill(`${vars.billingStateShort ?? ''}`); } catch { await page.locator(`#billing_state`).first().selectOption(`${vars.billingStateShort ?? ''}`); }
  try { await page.locator(`#billing_city`).first().fill(`${vars.billingCity ?? ''}`); } catch { await page.locator(`#billing_city`).first().selectOption(`${vars.billingCity ?? ''}`); }
  try { await page.locator(`#billing_phone`).first().fill(`${vars.phone ?? ''}`); } catch { await page.locator(`#billing_phone`).first().selectOption(`${vars.phone ?? ''}`); }
}
