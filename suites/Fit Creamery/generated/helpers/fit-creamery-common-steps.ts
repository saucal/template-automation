// @ts-nocheck
// Auto-generated from Ghost Inspector suite: "Fit Creamery - Common steps"
// Review all TODOs before using in production.
import { expect, type Page } from '@playwright/test';
import { blockUI } from './common-steps-for-all-projects';

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

// GI: "Accept upsell" (6851ef4389ec07266b5006f3)
export async function acceptUpsell(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.flavor = ((await page.locator(`#flavor`).textContent()) ?? '').trim();
  vars.upsellPrices = ((await page.locator(`#wcf-upsell-offer > .cartflows-pro-elementor__offer-yes-no-inner-wrap > .cartflows-pro-elementor__offer-yes-no-button-content-wrap > .cartflows-pro-elementor__offer-yes-no-button-title-wrap > .cartflows-pro-elementor__offer-yes-no-button-title`).textContent()) ?? '').trim();
  vars.upsellPrice = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const text = `${vars.upsellPrices}`;
const prices = text.match(/\$[0-9]+/g);

return prices[0] + '.00' }, vars);
  await page.locator(`#wcf-upsell-offer > .cartflows-pro-elementor__offer-yes-no-inner-wrap > .cartflows-pro-elementor__offer-yes-no-button-content-wrap > .cartflows-pro-elementor__offer-yes-no-button-title-wrap > .cartflows-pro-elementor__offer-yes-no-button-title`).filter({ visible: true }).first().click({ force: true });
}

// GI: "Check Order on My Account" (6851d69415b3a1154915e1d1)
export async function checkOrderOnMyAccount(page: Page, vars: Record<string, string> = {}): Promise<void> {
  if (vars.upsellPrice !== '') {
    vars.subtotal = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const unitPrice = parseFloat(`${vars.unitPrice}`.replace('$','').replace(',','').trim())
const upsellPrice = parseFloat(`${vars.upsellPrice}`.replace('$','').replace(',','').trim())

const amount = unitPrice + upsellPrice;
const usdFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
});
const subtotal = usdFormatter.format(amount);

return subtotal

 }, vars);
  }
  if (vars.upsellPrice !== '') {
    vars.taxPrice = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const subtotal = parseFloat(`${vars.subtotal}`.replace('$','').replace(',','').trim())
const discount = parseFloat(`${vars.discount}`.replace('$','').replace(',','').trim())

const amount = (subtotal - discount) * 0.07;
const usdFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
});
const tax = usdFormatter.format(amount);

return tax

 }, vars);
  }
  if (vars.upsellPrice !== '') {
    vars.total = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const subtotal = parseFloat(`${vars.subtotal}`.replace('$','').replace(',','').trim())
const discount = parseFloat(`${vars.discount}`.replace('$','').replace(',','').trim())
const tax = parseFloat(`${vars.taxPrice}`.replace('$','').replace(',','').trim())

const amount = subtotal - discount + tax;
const usdFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
});
const total = usdFormatter.format(amount);

return total

 }, vars);
  }
  await expect(page.locator(`.woocommerce-notice`).first()).toContainText(`Your order details:`);
  vars.orderNumber = ((await page.locator(`.order > strong`).textContent()) ?? '').trim();
  await expect(page.locator(`.email > strong`).first()).toHaveText(`${vars.email ?? ''}`);
  await expect(page.locator(`strong > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.total ?? ''}`);
  await expect(page.locator(`.method > strong`).first()).toHaveText(`${vars.paymentMethod ?? ''}`);
  await expect(page.locator(`tr.woocommerce-table__line-item.order_item:nth-of-type(1) > td.woocommerce-table__product-name.product-name`).first()).toHaveText(`${vars.prod_desc ?? ''} × 4`);
  await expect(page.locator(`tr.woocommerce-table__line-item.order_item:nth-of-type(1) > td.woocommerce-table__product-total.product-total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
  if (vars.upsellPrice !== '') {
    await expect(page.locator(`tr.woocommerce-table__line-item.order_item:nth-of-type(2) > td.woocommerce-table__product-name.product-name`).first()).toHaveText(`Fit Sweet Ice Cream Mix - ${vars.flavor ?? ''} × 2`);
  }
  if (vars.upsellPrice !== '') {
    await expect(page.locator(`tr.woocommerce-table__line-item.order_item:nth-of-type(2) > td.woocommerce-table__product-total.product-total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.upsellPrice ?? ''}`);
  }
  await expect(page.locator(`tfoot > tr:nth-of-type(1) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.subtotal ?? ''}`);
  await expect(page.locator(`tfoot > tr:nth-of-type(2) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.discount ?? ''}`);
  await expect(page.locator(`tr:nth-of-type(3) > td`).first()).toContainText(`Free shipping`);
  await expect(page.locator(`tr:nth-of-type(4) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.taxPrice ?? ''}`);
  await expect(page.locator(`tr:nth-of-type(5) > td`).first()).toContainText(`Credit Card`);
  await expect(page.locator(`tr:nth-of-type(6) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.total ?? ''}`);
  await expect(page.locator(`.woocommerce-column.woocommerce-column--1 > address`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.street ?? ''}
${vars.street2 ?? ''}
${vars.city ?? ''}, ${vars.state ?? ''} ${vars.zipCode ?? ''}

${vars.phone ?? ''}

${vars.email ?? ''}`);
  await expect(page.locator(`.woocommerce-column.woocommerce-column--2 > address`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName2 ?? ''}
${vars.street3 ?? ''}
${vars.street4 ?? ''}
${vars.city ?? ''}, ${vars.state ?? ''} ${vars.zipCode ?? ''}`);
}

// GI: "Close reminder" (686bb63389ec07266b0aec83)
export async function closeReminder(page: Page, vars: Record<string, string> = {}): Promise<void> {
  try {
    await page.locator(`svg.e-eicon-close > use`).filter({ visible: true }).first().click({ force: true });
  } catch { /* optional step: click */ }
}

// GI: "Extract user from email" (6852b97a15b3a115493ef502)
export async function extractUserFromEmail(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.userEmailExtract = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const regex = /^(qa\+)?(\w+)[^@]+/g
const str = `${vars.email}`;
let m;
m = regex.exec(str)
return m[0] }, vars);
  await page.goto(`https://email.ghostinspector.com/${vars.userEmailExtract ?? ''}`);
  await page.waitForLoadState('load');
}

// GI: "Fill CC" (6851dcb689ec07266b44cc90)
export async function fillCC(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.paymentMethod = `Credit Card`;
  vars.paymentMethodMeta = `Credit Card`;
  {
    const _lbl = page.locator(`label[for="payment_method_cpsw_stripe"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#payment_method_cpsw_stripe`).filter({ visible: true }).first().click({ force: true }); }
  }
  try { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="cardnumber"]`).or(page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="number"]`)).first().fill(`4242 4242 4242 4242`); } catch { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="cardnumber"]`).or(page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="number"]`)).first().selectOption(`4242 4242 4242 4242`); }
  try { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="exp-date"]`).or(page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="expiry"]`)).first().fill(`12 / 30`); } catch { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="exp-date"]`).or(page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="expiry"]`)).first().selectOption(`12 / 30`); }
  try { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="cvc"]`).first().fill(`123`); } catch { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="cvc"]`).first().selectOption(`123`); }
}

// GI: "Fill Checkout" (6851db0615b3a11549188a1a)
export async function fillCheckout(page: Page, vars: Record<string, string> = {}): Promise<void> {
  try { await page.locator(`#billing_email`).first().fill(`${vars.email ?? ''}`); } catch { await page.locator(`#billing_email`).first().selectOption(`${vars.email ?? ''}`); }
  try { await page.locator(`#billing_first_name`).first().fill(`${vars.firstName ?? ''}`); } catch { await page.locator(`#billing_first_name`).first().selectOption(`${vars.firstName ?? ''}`); }
  try { await page.locator(`#billing_last_name`).first().fill(`${vars.lastName ?? ''}`); } catch { await page.locator(`#billing_last_name`).first().selectOption(`${vars.lastName ?? ''}`); }
  try { await page.locator(`#billing_phone`).first().fill(`${vars.phone ?? ''}`); } catch { await page.locator(`#billing_phone`).first().selectOption(`${vars.phone ?? ''}`); }
  try { await page.locator(`#billing_address_1`).first().fill(`${vars.street ?? ''}`); } catch { await page.locator(`#billing_address_1`).first().selectOption(`${vars.street ?? ''}`); }
  try { await page.locator(`#billing_address_2`).first().fill(`${vars.street2 ?? ''}`); } catch { await page.locator(`#billing_address_2`).first().selectOption(`${vars.street2 ?? ''}`); }
  try { await page.locator(`#billing_city`).first().fill(`${vars.city ?? ''}`); } catch { await page.locator(`#billing_city`).first().selectOption(`${vars.city ?? ''}`); }
  await page.locator(`#select2-billing_state-container > span`).filter({ visible: true }).first().click({ force: true });
  try { await page.locator(`span > span:nth-of-type(1) > input[type="text"]`).first().fill(`${vars.stateComplete ?? ''}`); } catch { await page.locator(`span > span:nth-of-type(1) > input[type="text"]`).first().selectOption(`${vars.stateComplete ?? ''}`); }
  await page.locator(`xpath=//li[contains(text(), "${vars.stateComplete ?? ''}")]`).filter({ visible: true }).first().click({ force: true });
  try { await page.locator(`#billing_postcode`).first().fill(`${vars.zipCode ?? ''}`); } catch { await page.locator(`#billing_postcode`).first().selectOption(`${vars.zipCode ?? ''}`); }
  {
    const _lbl = page.locator(`label[for="ship-to-different-address-checkbox"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#ship-to-different-address-checkbox`).filter({ visible: true }).first().click({ force: true }); }
  }
  try { await page.locator(`#shipping_first_name`).first().fill(`${vars.firstName ?? ''}`); } catch { await page.locator(`#shipping_first_name`).first().selectOption(`${vars.firstName ?? ''}`); }
  try { await page.locator(`#shipping_last_name`).first().fill(`${vars.lastName2 ?? ''}`); } catch { await page.locator(`#shipping_last_name`).first().selectOption(`${vars.lastName2 ?? ''}`); }
  try { await page.locator(`#shipping_address_1`).first().fill(`${vars.street3 ?? ''}`); } catch { await page.locator(`#shipping_address_1`).first().selectOption(`${vars.street3 ?? ''}`); }
  try { await page.locator(`#shipping_address_2`).first().fill(`${vars.street4 ?? ''}`); } catch { await page.locator(`#shipping_address_2`).first().selectOption(`${vars.street4 ?? ''}`); }
  try { await page.locator(`#shipping_city`).first().fill(`${vars.city ?? ''}`); } catch { await page.locator(`#shipping_city`).first().selectOption(`${vars.city ?? ''}`); }
  await page.locator(`#select2-shipping_state-container > span`).filter({ visible: true }).first().click({ force: true });
  try { await page.locator(`span > span:nth-of-type(1) > input[type="text"]`).first().fill(`${vars.stateComplete ?? ''}`); } catch { await page.locator(`span > span:nth-of-type(1) > input[type="text"]`).first().selectOption(`${vars.stateComplete ?? ''}`); }
  await page.locator(`xpath=//li[contains(text(), "${vars.stateComplete ?? ''}")]`).filter({ visible: true }).first().click({ force: true });
  try { await page.locator(`#shipping_postcode`).first().fill(`${vars.zipCode ?? ''}`); } catch { await page.locator(`#shipping_postcode`).first().selectOption(`${vars.zipCode ?? ''}`); }
}

// GI: "Login Admin" (6852ad9fe5aac3e528cdb403)
export async function loginAdmin(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.goto(`${vars.startUrl ?? ''}scrt/`);
  await page.waitForLoadState('load');
  try { await page.locator(`#user_login`).or(page.locator(`#username`)).first().fill(`${vars.adminUser ?? ''}`); } catch { await page.locator(`#user_login`).or(page.locator(`#username`)).first().selectOption(`${vars.adminUser ?? ''}`); }
  try { await page.locator(`#user_pass`).or(page.locator(`#password`)).first().fill(`${vars.adminPass ?? ''}`); } catch { await page.locator(`#user_pass`).or(page.locator(`#password`)).first().selectOption(`${vars.adminPass ?? ''}`); }
  {
    const _lbl = page.locator(`label[for="wp-submit"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#wp-submit`).or(page.locator(`button[name="login"]`)).filter({ visible: true }).first().click({ force: true }); }
  }
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let element = document.getElementById('correct-admin-email')
let admin = `${vars.admin}`
return element != null && element != undefined && admin === "yes" }, vars)) {
    {
      const _lbl = page.locator(`label[for="correct-admin-email"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#correct-admin-email`).filter({ visible: true }).first().click({ force: true }); }
    }
  }
  try {
    await expect(page.locator(`#adminmenumain`)).not.toHaveCount(0);
  } catch { /* optional step: assertElementPresent */ }
}

// GI: "Refund Upsell" (6852bbbd15b3a115493f5244)
export async function refundUpsell(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.locator(`button[type="button"].button.wcf-offer-refund`).filter({ visible: true }).first().click({ force: true });
  await blockUI(page, vars);
}
