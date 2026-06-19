// @ts-nocheck
// Auto-generated from Ghost Inspector suite: "Red Apple - Common steps for suite"
// Review all TODOs before using in production.
import { expect, type Page } from '@playwright/test';
import { extractUserFromEmail, uRLOfCurrentPage } from './common-steps-for-all-projects';

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

// GI: "Admin - Orders login" (665f631d1aac3ea14fff318e)
export async function adminOrdersLogin(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.goto(`https://b55bbf98-2935-4d85-980f-44080a73c7c1.cc12.conves.io/wp-admin/edit.php?post_type=shop_order`);
  await page.waitForLoadState('load');
  try { await page.locator(`#user_login`).first().fill(`${vars.adminUser ?? ''}`); } catch { await page.locator(`#user_login`).first().selectOption(`${vars.adminUser ?? ''}`); }
  try { await page.locator(`#user_pass`).first().fill(`${vars.adminPass ?? ''}`); } catch { await page.locator(`#user_pass`).first().selectOption(`${vars.adminPass ?? ''}`); }
  {
    const _lbl = page.locator(`label[for="wp-submit"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#wp-submit`).filter({ visible: true }).first().click({ force: true }); }
  }
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let adminHeader = document.querySelector('h1.admin-email__heading');
returnadminHeader.checkVisibility(); }, vars)) {
    await page.locator(`div.admin-email__actions-secondary > a`).filter({ visible: true }).first().click({ force: true });
  }
}

// GI: "Check Red Apple order on Email" (666b40b21aac3ea14fe9c681)
export async function checkRedAppleOrderOnEmail(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await extractUserFromEmail(page, vars);
  try {
    if (vars.project !== "vesica") {
      await page.locator(`tr:nth-child(1) > td.subject > a`).filter({ visible: true }).first().click({ force: true });
    }
  } catch { /* optional step: click */ }
  await expect(page.locator(`td.thwec-builder-column > table:nth-child(1) > tbody > tr > td > table:nth-child(2) > tbody > tr > td`).first()).toContainText(`${vars.firstName ?? ''} Thank you for your order! You totally rock.`);
  await expect(page.locator(`tbody > tr.order_item:nth-child(1) > td.order-item`).first()).toContainText(`${vars.productName ?? ''}`);
  await expect(page.locator(`tbody > tr.order_item:nth-child(1) > td.order-item-qty`).first()).toContainText(`${vars.qty ?? ''}`);
  await expect(page.locator(`tbody > tr.order_item:nth-child(1) > td.order-item-price`).first()).toHaveText(`${vars.productPrice ?? ''}`);
  await expect(page.locator(`tfoot > tr:nth-child(1) > td`).first()).toHaveText(`${vars.cartSubTotal ?? ''}`);
  try {
    if (vars.project !== "leggari") {
      await expect(page.locator(`tr:nth-of-type(2) > td.td`).first()).toContainText(`${vars.shippingPrice ?? ''}`);
    }
  } catch { /* optional step: assertTextPresent */ }
  try {
    if (vars.project !== "icg" && vars.project !== "leggari") {
      await expect(page.locator(`tr:nth-of-type(3) > td.td`).first()).toContainText(`${vars.taxPrice ?? ''}`);
    }
  } catch { /* optional step: assertTextPresent */ }
  await expect(page.locator(`tfoot > tr:nth-child(4) > td`).first()).toContainText(`Credit Card`);
  try {
    if (vars.project !== "icg" && vars.project !== "leggari" && vars.project !== "vesica") {
      await expect(page.locator(`tr:nth-of-type(5) > td.td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.total ?? ''}`);
    }
  } catch { /* optional step: assertText */ }
  await expect(page.locator(`tbody > tr > td > p.address`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.streetShipping ?? ''}
${vars.shippingAddress2 ?? ''}
${vars.cityShipping ?? ''}, ${vars.stateShippingShort ?? ''} ${vars.postCodeShipping ?? ''}`);
}

// GI: "Fill billing address" (66d9cf0289b30b261f1b0802)
export async function fillBillingAddress(page: Page, vars: Record<string, string> = {}): Promise<void> {
  try { await page.locator(`#billing_country`).first().fill(`${vars.countryShort ?? ''}`); } catch { await page.locator(`#billing_country`).first().selectOption(`${vars.countryShort ?? ''}`); }
  try { await page.locator(`#billing_address_1`).first().fill(`${vars.streetBilling ?? ''}`); } catch { await page.locator(`#billing_address_1`).first().selectOption(`${vars.streetBilling ?? ''}`); }
  try { await page.locator(`#billing_address_2`).first().fill(`${vars.billingAddress2 ?? ''}`); } catch { await page.locator(`#billing_address_2`).first().selectOption(`${vars.billingAddress2 ?? ''}`); }
  try { await page.locator(`#billing_city`).first().fill(`${vars.cityBilling ?? ''}`); } catch { await page.locator(`#billing_city`).first().selectOption(`${vars.cityBilling ?? ''}`); }
  try { await page.locator(`#billing_state`).first().fill(`${vars.stateBillingShort ?? ''}`); } catch { await page.locator(`#billing_state`).first().selectOption(`${vars.stateBillingShort ?? ''}`); }
  try { await page.locator(`#billing_postcode`).first().fill(`${vars.postCodeBilling ?? ''}`); } catch { await page.locator(`#billing_postcode`).first().selectOption(`${vars.postCodeBilling ?? ''}`); }
}

// GI: "Fill shipping address " (66d9d22e89b30b261f1bcf88)
export async function fillShippingAddress(page: Page, vars: Record<string, string> = {}): Promise<void> {
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return let selected = document.querySelector('#ship-to-different-address-checkbox').checked == false; }, vars)) {
    {
      const _lbl = page.locator(`label[for="ship-to-different-address-checkbox"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#ship-to-different-address-checkbox`).filter({ visible: true }).first().click({ force: true }); }
    }
  }
  try { await page.locator(`#shipping_country`).first().fill(`${vars.countryShort ?? ''}`); } catch { await page.locator(`#shipping_country`).first().selectOption(`${vars.countryShort ?? ''}`); }
  try { await page.locator(`#shipping_address_1`).first().fill(`${vars.streetShipping ?? ''}`); } catch { await page.locator(`#shipping_address_1`).first().selectOption(`${vars.streetShipping ?? ''}`); }
  try { await page.locator(`#shipping_address_2`).first().fill(`${vars.shippingAddress2 ?? ''}`); } catch { await page.locator(`#shipping_address_2`).first().selectOption(`${vars.shippingAddress2 ?? ''}`); }
  try { await page.locator(`#shipping_city`).first().fill(`${vars.cityShipping ?? ''}`); } catch { await page.locator(`#shipping_city`).first().selectOption(`${vars.cityShipping ?? ''}`); }
  try { await page.locator(`#shipping_state`).first().fill(`${vars.stateShippingShort ?? ''}`); } catch { await page.locator(`#shipping_state`).first().selectOption(`${vars.stateShippingShort ?? ''}`); }
  try { await page.locator(`#shipping_postcode`).first().fill(`${vars.postCodeShipping ?? ''}`); } catch { await page.locator(`#shipping_postcode`).first().selectOption(`${vars.postCodeShipping ?? ''}`); }
}

// GI: "Fill stripe form" (666b5e403b8c989d7213578d)
export async function fillStripeForm(page: Page, vars: Record<string, string> = {}): Promise<void> {
  {
    let _ok = false;
    if (!_ok) { try { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="cardnumber"]`).first().click({ force: true }); _ok = true; } catch {} }
    if (!_ok) throw new Error('No clickable candidate matched');
  }
  try { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="cardnumber"]`).first().fill(`4242 4242 4242 4242`); } catch { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="cardnumber"]`).first().selectOption(`4242 4242 4242 4242`); }
  try { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="exp-date"]`).first().fill(`01 / 25`); } catch { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="exp-date"]`).first().selectOption(`01 / 25`); }
  try { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="cvc"]`).first().fill(`111`); } catch { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="cvc"]`).first().selectOption(`111`); }
  {
    const _lbl = page.locator(`label[for="place_order"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`xpath=//button[contains(text(), "Pay Now")]`).or(page.locator(`#place_order`)).filter({ visible: true }).first().click({ force: true }); }
  }
}

// GI: "Get order number from URL" (665f6e631aac3ea14f00a426)
export async function getOrderNumberFromURL(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await uRLOfCurrentPage(page, vars);
  vars.orderNumber = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let url = window.location.href;
let part = url.split('/');
let orderNumber = part[5];
return orderNumber; }, vars);
  vars.baseUrl = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return baseUrl = window.location.protocol + "//" + window.location.host }, vars);
  vars.orderLink = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let orderLink = `${vars.baseUrl}/wp-admin/post.php?post=${vars.orderNumber}&action=edit`
console.log(orderLink)
return orderLink; }, vars);
  try {
    vars.orderSelector = `a [href="${vars.orderLink ?? ''}"] > strong`;
  } catch { /* optional step: store */ }
}

// GI: "Logout from account" (665f69ba1aac3ea14ffffa9a)
export async function logoutFromAccount(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.goto(`https://b55bbf98-2935-4d85-980f-44080a73c7c1.cc12.conves.io/my-account/`);
  await page.waitForLoadState('load');
  try {
    await page.locator(`.logout > a`).filter({ visible: true }).first().click({ force: true });
  } catch { /* optional step: click */ }
  await page.waitForTimeout(500);
  await expect(page.locator(`span.header-account-label`).first()).toContainText(`Sign In`);
}

// GI: "Select stripe and fill CC WIP" (6660a6647e028d9ed9213544)
export async function selectStripeAndFillCCWIP(page: Page, vars: Record<string, string> = {}): Promise<void> {
  {
    const _lbl = page.locator(`label[for="payment_method_stripe"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#payment_method_stripe`).filter({ visible: true }).first().click({ force: true }); }
  }
  {
    let _ok = false;
    if (!_ok) { try { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="cardnumber"]`).first().click({ force: true }); _ok = true; } catch {} }
    if (!_ok) throw new Error('No clickable candidate matched');
  }
  try { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="cardnumber"]`).first().fill(`4242 4242 4242 4242`); } catch { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="cardnumber"]`).first().selectOption(`4242 4242 4242 4242`); }
  {
    let _ok = false;
    if (!_ok) { try { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="exp-date"]`).first().click({ force: true }); _ok = true; } catch {} }
    if (!_ok) throw new Error('No clickable candidate matched');
  }
  try { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="exp-date"]`).first().fill(`01 / 25`); } catch { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="exp-date"]`).first().selectOption(`01 / 25`); }
  {
    let _ok = false;
    if (!_ok) { try { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="cvc"]`).first().click({ force: true }); _ok = true; } catch {} }
    if (!_ok) throw new Error('No clickable candidate matched');
  }
  try { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="cvc"]`).first().fill(`111`); } catch { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="cvc"]`).first().selectOption(`111`); }
  {
    const _lbl = page.locator(`label[for="wc-stripe-new-payment-method"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#wc-stripe-new-payment-method`).filter({ visible: true }).first().click({ force: true }); }
  }
}
