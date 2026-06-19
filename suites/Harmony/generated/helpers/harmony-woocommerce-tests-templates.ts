// @ts-nocheck
// Auto-generated from Ghost Inspector suite: "Harmony - WooCommerce Tests templates"
// Review all TODOs before using in production.
import { expect, type Page } from '@playwright/test';
import { blockUI, extractPriceFromElement, extractUserFromEmail, placeOrderElement, renewByAdmin, wooCommerceCheckoutTemplate } from './common-steps-for-all-projects';
import { addPrivateOrderNote, adminLogin, checkMyAccountOrderDetails, checkOrderDetails, checkTotal, currencyChecker, fastSpringPaymentGateway, fillBankTransfer, fillCC, fillCheckout, loadingPrice, login, myAccountOrderDetails, productManagedHostingMaintenance, subscriptionDetailsThankYouPage, thankYouPage } from './harmony-common-steps-for-suites';

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

// GI: "01 - Product Page" (68ee4c90a5c7995601dc971f)
export async function _01ProductPage(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.goto(`${vars.startUrl ?? ''}product/hours/`);
  await page.waitForLoadState('load');
  await page.waitForLoadState('load');
  await loadingPrice(page, vars);
  if (vars.country === 'CA') {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let urlElement = document.querySelector<HTMLAnchorElement>('div.summary > a');

let url = urlElement ? urlElement.getAttribute('href') : null;

return url === `${vars.startUrl}?post_type=post&p=124172` }, vars)).toBeTruthy();
  }
  if (vars.country !== 'CA') {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let urlElement = document.querySelector<HTMLAnchorElement>('div.summary > a');

let url = urlElement ? urlElement.getAttribute('href') : null;

return url === `${vars.startUrl}?post_type=post&p=124171` }, vars)).toBeTruthy();
  }
  await currencyChecker(page, vars);
}

// GI: "02 - Cart Page" (68ee4c90a5c7995601dc9720)
export async function _02CartPage(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.goto(`${vars.startUrl ?? ''}product/hours/`);
  await page.waitForLoadState('load');
  await loadingPrice(page, vars);
  vars.prod_desc = ((await page.locator(`h1.product_title`).textContent()) ?? '').trim();
  vars.prod_desc = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return `${vars.prod_desc}`.replaceAll('–','-') }, vars);
  {
    const _lbl = page.locator(`label[for="hours"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#hours`).filter({ visible: true }).first().click({ force: true }); }
  }
  try { await page.locator(`#hours`).first().fill(`50`); } catch { await page.locator(`#hours`).first().selectOption(`50`); }
  vars.unitPrice = ((await page.locator(`.wcpbc-price > .price > .woocommerce-Price-amount.amount > bdi`).or(page.locator(`div.summary.entry-summary > p.price > span > span > ins > span > bdi`)).textContent()) ?? '').trim();
  await currencyChecker(page, vars);
  await page.locator(`xpath=//button[contains(text(), "Add to cart")]`).or(page.locator(`button[type="submit"].single_add_to_cart_button`)).filter({ visible: true }).first().click({ force: true });
  await page.locator(`.wc-block-components-notice-banner a[href*="/cart/"].button.wc-forward`).or(page.locator(`.woocommerce-message a[href*="/cart/"].button.wc-forward`)).filter({ visible: true }).first().click({ force: true });
  await page.waitForLoadState('load');
  await expect(page.locator(`.cart_item > .product-name`).first()).toContainText(`${vars.prod_desc ?? ''} - 50 hours.`);
  await expect(page.locator(`.cart_item > .product-price > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
  await expect(page.locator(`td.product-subtotal > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
  await expect(page.locator(`tr.cart-subtotal > td > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
  await expect(page.locator(`strong > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
  await currencyChecker(page, vars);
}

// GI: "03 - Checkout Page - Managed Hosting" (68ee4c90a5c7995601dc9721)
export async function _03CheckoutPageManagedHosting(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.goto(`${vars.startUrl ?? ''}product/managed-hosting/`);
  await page.waitForLoadState('load');
  await page.waitForLoadState('load');
  await loadingPrice(page, vars);
  {
    const _lbl = page.locator(`label[for="plan"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#plan`).filter({ visible: true }).first().click({ force: true }); }
  }
  try { await page.locator(`#plan`).first().fill(`Up to 2,500 orders per month`); } catch { await page.locator(`#plan`).first().selectOption(`Up to 2,500 orders per month`); }
  if (vars.country === 'CA') {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let urlElement = document.querySelector<HTMLAnchorElement>('div.summary > a');

let url = urlElement ? urlElement.getAttribute('href') : null;

return url === `${vars.startUrl}?post_type=post&p=124176` }, vars)).toBeTruthy();
  }
  if (vars.country !== 'CA') {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let urlElement = document.querySelector<HTMLAnchorElement>('div.summary > a');
let url = urlElement ? urlElement.getAttribute('href') : null;

return url === `${vars.startUrl}?post_type=post&p=124175` }, vars)).toBeTruthy();
  }
  await page.locator(`button[type="submit"].single_add_to_cart_button`).filter({ visible: true }).first().click({ force: true });
  await page.locator(`.wc-block-components-notice-banner a[href*="/cart/"].button.wc-forward`).or(page.locator(`.woocommerce-message a[href*="/cart/"].button.wc-forward`)).filter({ visible: true }).first().click({ force: true });
  await page.locator(`xpath=//a[contains(text(), "Proceed to checkout")]`).or(page.locator(`a[href*="/checkout/"]`)).filter({ visible: true }).first().click({ force: true });
  await page.waitForLoadState('load');
  await expect(page.locator(`#payment_method_bacs`)).toHaveCount(0);
  if (vars.country === 'CA') {
    await expect(page.locator(`#payment_method_stripe`)).not.toHaveCount(0);
  }
  if (vars.country !== 'CA') {
    await expect(page.locator(`#payment_method_stripe`)).toHaveCount(0);
  }
  if (vars.country !== 'CA') {
    await expect(page.locator(`#payment_method_fastspring`)).not.toHaveCount(0);
  }
  if (vars.country === 'CA') {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let urlElement = document.querySelector<HTMLAnchorElement>('#terms_acceptance_field > span label > a:first-of-type');
let url = urlElement ? urlElement.getAttribute('href') : null;

return url === `${vars.startUrl}?post_type=page&p=124120` }, vars)).toBeTruthy();
  }
  if (vars.country === 'CA') {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let urlElement = document.querySelector<HTMLAnchorElement>('#terms_acceptance_field > span label > a:last-of-type');

let url = urlElement ? urlElement.getAttribute('href') : null;

return url === `${vars.startUrl}?post_type=post&p=124176` }, vars)).toBeTruthy();
  }
  if (vars.country !== 'CA') {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let urlElement = document.querySelector<HTMLAnchorElement>('#terms_acceptance_field > span label > a:first-of-type');
let url = urlElement ? urlElement.getAttribute('href') : null;

return url === `${vars.startUrl}?post_type=page&p=124115` }, vars)).toBeTruthy();
  }
  if (vars.country !== 'CA') {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let urlElement = document.querySelector<HTMLAnchorElement>('#terms_acceptance_field > span label > a:last-of-type');
let url = urlElement ? urlElement.getAttribute('href') : null;

return url === `${vars.startUrl}?post_type=post&p=124175` }, vars)).toBeTruthy();
  }
  await blockUI(page, vars);
}

// GI: "03 - Checkout Page - Managed Hosting & Maintenance" (68ee4c90a5c7995601dc9722)
export async function _03CheckoutPageManagedHostingMaintenance(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await productManagedHostingMaintenance(page, vars);
  await page.locator(`xpath=//a[contains(text(), "Proceed to checkout")]`).or(page.locator(`a[href*="/checkout/"]`)).filter({ visible: true }).first().click({ force: true });
  await page.waitForLoadState('load');
  await expect(page.locator(`#payment_method_bacs`)).toHaveCount(0);
  if (vars.country === 'CA') {
    await expect(page.locator(`#payment_method_stripe`)).not.toHaveCount(0);
  }
  if (vars.country !== 'CA') {
    await expect(page.locator(`#payment_method_stripe`)).toHaveCount(0);
  }
  if (vars.country !== 'CA') {
    await expect(page.locator(`#payment_method_fastspring`)).not.toHaveCount(0);
  }
  if (vars.country === 'CA') {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let urlElement = document.querySelector<HTMLAnchorElement>('#terms_acceptance_field > span label > a:first-of-type');
let url = urlElement ? urlElement.getAttribute('href') : null;

return url === `${vars.startUrl}?post_type=page&p=124120` }, vars)).toBeTruthy();
  }
  if (vars.country === 'CA') {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let urlElement = document.querySelector<HTMLAnchorElement>('#terms_acceptance_field > span label > a:nth-of-type(2)');

let url = urlElement ? urlElement.getAttribute('href') : null;

return url === `${vars.startUrl}?post_type=post&p=124176` }, vars)).toBeTruthy();
  }
  if (vars.country === 'CA') {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let urlElement = document.querySelector<HTMLAnchorElement>('#terms_acceptance_field > span label > a:last-of-type');

let url = urlElement ? urlElement.getAttribute('href') : null;

return url === `${vars.startUrl}?post_type=post&p=124178` }, vars)).toBeTruthy();
  }
  if (vars.country !== 'CA') {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let urlElement = document.querySelector<HTMLAnchorElement>('#terms_acceptance_field > span label > a:first-of-type');
let url = urlElement ? urlElement.getAttribute('href') : null;

return url === `${vars.startUrl}?post_type=page&p=124115` }, vars)).toBeTruthy();
  }
  if (vars.country !== 'CA') {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let urlElement = document.querySelector<HTMLAnchorElement>('#terms_acceptance_field > span label > a:nth-of-type(2)');
let url = urlElement ? urlElement.getAttribute('href') : null;

return url === `${vars.startUrl}?post_type=post&p=124175` }, vars)).toBeTruthy();
  }
  if (vars.country !== 'CA') {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let urlElement = document.querySelector<HTMLAnchorElement>('#terms_acceptance_field > span label > a:last-of-type');
let url = urlElement ? urlElement.getAttribute('href') : null;

return url === `${vars.startUrl}?post_type=post&p=124177` }, vars)).toBeTruthy();
  }
  await blockUI(page, vars);
}

// GI: "03 - Checkout Page - Managed Woo - Yearly" (68ee4c90a5c7995601dc9723)
export async function _03CheckoutPageManagedWooYearly(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.goto(`${vars.startUrl ?? ''}product/managed-woocommerce/`);
  await page.waitForLoadState('load');
  await page.waitForLoadState('load');
  await loadingPrice(page, vars);
  {
    const _lbl = page.locator(`label[for="plan"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#plan`).filter({ visible: true }).first().click({ force: true }); }
  }
  try { await page.locator(`#plan`).first().fill(`Growth`); } catch { await page.locator(`#plan`).first().selectOption(`Growth`); }
  {
    const _lbl = page.locator(`label[for="recurrence"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#recurrence`).filter({ visible: true }).first().click({ force: true }); }
  }
  try { await page.locator(`#recurrence`).first().fill(`Yearly`); } catch { await page.locator(`#recurrence`).first().selectOption(`Yearly`); }
  await page.locator(`button[type="submit"].single_add_to_cart_button`).filter({ visible: true }).first().click({ force: true });
  await page.locator(`.wc-block-components-notice-banner a[href*="/cart/"].button.wc-forward`).or(page.locator(`.woocommerce-message a[href*="/cart/"].button.wc-forward`)).filter({ visible: true }).first().click({ force: true });
  await page.locator(`xpath=//a[contains(text(), "Proceed to checkout")]`).or(page.locator(`a[href*="/checkout/"]`)).filter({ visible: true }).first().click({ force: true });
  await page.waitForLoadState('load');
  if (vars.country === 'CA') {
    await expect(page.locator(`#payment_method_bacs`)).not.toHaveCount(0);
  }
  if (vars.country === 'CA') {
    await expect(page.locator(`#payment_method_stripe`)).not.toHaveCount(0);
  }
  if (vars.country === 'CA') {
    {
      const _lbl = page.locator(`label[for="payment_method_bacs"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#payment_method_bacs`).filter({ visible: true }).first().click({ force: true }); }
    }
  }
  try {
    if (vars.country === 'CA') {
      await expect(page.locator(`.payment_box.payment_method_bacs > p > a`)).not.toHaveCount(0);
    }
  } catch { /* optional step: assertElementPresent */ }
  if (vars.country === 'CA') {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let element = document.querySelector<HTMLAnchorElement>(".payment_box.payment_method_bacs > p > a")
element = element.getAttribute("href")
return element === `${vars.bankAccount}` }, vars)).toBeTruthy();
  }
  if (vars.country !== 'CA') {
    await expect(page.locator(`#payment_method_fastspring`)).not.toHaveCount(0);
  }
  if (vars.country !== 'CA') {
    await expect(page.locator(`#payment_method_bacs`)).toHaveCount(0);
  }
  if (vars.country !== 'CA') {
    await expect(page.locator(`#payment_method_stripe`)).toHaveCount(0);
  }
  if (vars.country === 'CA') {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let urlElement = document.querySelector<HTMLAnchorElement>('#terms_acceptance_field > span label > a:first-of-type');
let url = urlElement ? urlElement.getAttribute('href') : null;

return url === `${vars.startUrl}?post_type=page&p=124120` }, vars)).toBeTruthy();
  }
  if (vars.country !== 'CA') {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let urlElement = document.querySelector<HTMLAnchorElement>('#terms_acceptance_field > span label > a:first-of-type');
let url = urlElement ? urlElement.getAttribute('href') : null;

return url === `${vars.startUrl}?post_type=page&p=124115` }, vars)).toBeTruthy();
  }
  if (vars.country === 'CA') {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let urlElement = document.querySelector<HTMLAnchorElement>('#terms_acceptance_field > span label > a:nth-of-type(2)');
let url = urlElement ? urlElement.getAttribute('href') : null;

return url === `${vars.startUrl}?post_type=post&p=124176` }, vars)).toBeTruthy();
  }
  if (vars.country !== 'CA') {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let urlElement = document.querySelector<HTMLAnchorElement>('#terms_acceptance_field > span label > a:nth-of-type(2)');
let url = urlElement ? urlElement.getAttribute('href') : null;

return url === `${vars.startUrl}?post_type=post&p=124175` }, vars)).toBeTruthy();
  }
  if (vars.country === 'CA') {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let urlElement = document.querySelector<HTMLAnchorElement>('#terms_acceptance_field > span label > a:last-of-type');
let url = urlElement ? urlElement.getAttribute('href') : null;

return url === `${vars.startUrl}?post_type=post&p=124178` }, vars)).toBeTruthy();
  }
  if (vars.country !== 'CA') {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let urlElement = document.querySelector<HTMLAnchorElement>('#terms_acceptance_field > span label > a:last-of-type');
let url = urlElement ? urlElement.getAttribute('href') : null;

return url === `${vars.startUrl}?post_type=post&p=124177` }, vars)).toBeTruthy();
  }
  await blockUI(page, vars);
}

// GI: "03 - Checkout Page - On Demand hours" (68ee4c90a5c7995601dc9724)
export async function _03CheckoutPageOnDemandHours(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await _02CartPage(page, vars);
  await page.locator(`xpath=//a[contains(text(), "Proceed to checkout")]`).or(page.locator(`a[href*="/checkout/"]`)).filter({ visible: true }).first().click({ force: true });
  await page.waitForLoadState('load');
  await expect(page.locator(`td.product-name`).first()).toContainText(`${vars.prod_desc ?? ''} - 50 hours.  `);
  await expect(page.locator(`td.product-total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
  await expect(page.locator(`tr.cart-subtotal > td > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
  await expect(page.locator(`strong > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
  await currencyChecker(page, vars);
  if (vars.country === 'CA') {
    await expect(page.locator(`#payment_method_bacs`)).not.toHaveCount(0);
  }
  if (vars.country === 'CA') {
    await expect(page.locator(`#payment_method_stripe`)).not.toHaveCount(0);
  }
  if (vars.country === 'CA') {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let element = document.querySelector<HTMLAnchorElement>(".payment_box.payment_method_bacs > p > a")
element = element ? element.getAttribute("href") : null;
return element === `${vars.bankAccount}` }, vars)).toBeTruthy();
  }
  if (vars.country !== 'CA') {
    await expect(page.locator(`#payment_method_fastspring`)).not.toHaveCount(0);
  }
  if (vars.country === 'CA') {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let urlElement = document.querySelector<HTMLAnchorElement>('#terms_acceptance_field > span label > a:first-of-type');
let url = urlElement ? urlElement.getAttribute('href') : null;

return url === `${vars.startUrl}?post_type=page&p=124120` }, vars)).toBeTruthy();
  }
  if (vars.country === 'CA') {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let urlElement = document.querySelector<HTMLAnchorElement>('#terms_acceptance_field > span label > a:last-of-type');
let url = urlElement ? urlElement.getAttribute('href') : null;

return url === `${vars.startUrl}?post_type=post&p=124172` }, vars)).toBeTruthy();
  }
  if (vars.country !== 'CA') {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let urlElement = document.querySelector<HTMLAnchorElement>('#terms_acceptance_field > span label > a:first-of-type');
let url = urlElement ? urlElement.getAttribute('href') : null;

return url === `${vars.startUrl}?post_type=page&p=124115` }, vars)).toBeTruthy();
  }
  if (vars.country !== 'CA') {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let urlElement = document.querySelector<HTMLAnchorElement>('#terms_acceptance_field > span label > a:last-of-type');
let url = urlElement ? urlElement.getAttribute('href') : null;

return url === `${vars.startUrl}?post_type=post&p=124171` }, vars)).toBeTruthy();
  }
  await blockUI(page, vars);
}

// GI: "03 - Checkout Page - Woocommerce Maintenance" (68ee4c90a5c7995601dc9725)
export async function _03CheckoutPageWoocommerceMaintenance(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.goto(`${vars.startUrl ?? ''}product/woocommerce-maintenance/`);
  await page.waitForLoadState('load');
  await page.waitForLoadState('load');
  await loadingPrice(page, vars);
  {
    const _lbl = page.locator(`label[for="plan"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#plan`).filter({ visible: true }).first().click({ force: true }); }
  }
  try { await page.locator(`#plan`).first().fill(`Up to 10,000 orders per month`); } catch { await page.locator(`#plan`).first().selectOption(`Up to 10,000 orders per month`); }
  if (vars.country === 'CA') {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let urlElement = document.querySelector<HTMLAnchorElement>('div.summary > a');

let url = urlElement ? urlElement.getAttribute('href') : null;

return url === `${vars.startUrl}?post_type=post&p=124178` }, vars)).toBeTruthy();
  }
  if (vars.country !== 'CA') {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let urlElement = document.querySelector<HTMLAnchorElement>('div.summary > a');
let url = urlElement ? urlElement.getAttribute('href') : null;

return url === `${vars.startUrl}?post_type=post&p=124177` }, vars)).toBeTruthy();
  }
  await page.locator(`button[type="submit"].single_add_to_cart_button`).filter({ visible: true }).first().click({ force: true });
  await page.locator(`.wc-block-components-notice-banner a[href*="/cart/"].button.wc-forward`).or(page.locator(`.woocommerce-message a[href*="/cart/"].button.wc-forward`)).filter({ visible: true }).first().click({ force: true });
  await page.locator(`xpath=//a[contains(text(), "Proceed to checkout")]`).or(page.locator(`a[href*="/checkout/"]`)).filter({ visible: true }).first().click({ force: true });
  await page.waitForLoadState('load');
  await expect(page.locator(`#payment_method_bacs`)).toHaveCount(0);
  if (vars.country === 'CA') {
    await expect(page.locator(`#payment_method_stripe`)).not.toHaveCount(0);
  }
  if (vars.country !== 'CA') {
    await expect(page.locator(`#payment_method_stripe`)).toHaveCount(0);
  }
  if (vars.country !== 'CA') {
    await expect(page.locator(`#payment_method_fastspring`)).not.toHaveCount(0);
  }
  if (vars.country === 'CA') {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let urlElement = document.querySelector<HTMLAnchorElement>('#terms_acceptance_field > span label > a:first-of-type');
let url = urlElement ? urlElement.getAttribute('href') : null;

return url === `${vars.startUrl}?post_type=page&p=124120` }, vars)).toBeTruthy();
  }
  if (vars.country === 'CA') {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let urlElement = document.querySelector<HTMLAnchorElement>('#terms_acceptance_field > span label > a:last-of-type');

let url = urlElement ? urlElement.getAttribute('href') : null;

return url === `${vars.startUrl}?post_type=post&p=124178` }, vars)).toBeTruthy();
  }
  if (vars.country !== 'CA') {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let urlElement = document.querySelector<HTMLAnchorElement>('#terms_acceptance_field > span label > a:first-of-type');
let url = urlElement ? urlElement.getAttribute('href') : null;

return url === `${vars.startUrl}?post_type=page&p=124115` }, vars)).toBeTruthy();
  }
  if (vars.country !== 'CA') {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let urlElement = document.querySelector<HTMLAnchorElement>('#terms_acceptance_field > span label > a:last-of-type');
let url = urlElement ? urlElement.getAttribute('href') : null;

return url === `${vars.startUrl}?post_type=post&p=124177` }, vars)).toBeTruthy();
  }
  await blockUI(page, vars);
}

// GI: "04 - Step 1 - Affiliate Registration" (68ee4c90a5c7995601dc9726)
export async function _04Step1AffiliateRegistration(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.affiliateEmail = `qa+gi_affiliate_${vars.alphanumeric ?? ''}@saucal.com`;
  vars.username = `${vars.affiliateEmail ?? ''}`;
  vars.user = `qa${vars.alphanumeric ?? ''}`;
  await page.goto(`${vars.startUrl ?? ''}affiliate-area/`);
  await page.waitForLoadState('load');
  try { await page.locator(`#affwp-user-name`).first().fill(`QA Affiliate`); } catch { await page.locator(`#affwp-user-name`).first().selectOption(`QA Affiliate`); }
  try { await page.locator(`#affwp-user-login`).first().fill(`${vars.user ?? ''}`); } catch { await page.locator(`#affwp-user-login`).first().selectOption(`${vars.user ?? ''}`); }
  try { await page.locator(`#affwp-user-email`).first().fill(`${vars.username ?? ''}`); } catch { await page.locator(`#affwp-user-email`).first().selectOption(`${vars.username ?? ''}`); }
  try { await page.locator(`#affwp-payment-email`).first().fill(`${vars.username ?? ''}`); } catch { await page.locator(`#affwp-payment-email`).first().selectOption(`${vars.username ?? ''}`); }
  try { await page.locator(`#affwp-user-url`).first().fill(`https://saucal.com/affiliate-test`); } catch { await page.locator(`#affwp-user-url`).first().selectOption(`https://saucal.com/affiliate-test`); }
  try { await page.locator(`#affwp-promotion-method`).first().fill(`This is a Testing promote tex for this field`); } catch { await page.locator(`#affwp-promotion-method`).first().selectOption(`This is a Testing promote tex for this field`); }
  {
    const _lbl = page.locator(`label[for="affwp-tos"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#affwp-tos`).filter({ visible: true }).first().click({ force: true }); }
  }
  await page.locator(`p:nth-of-type(8) > input[type="submit"].button`).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`.affwp-notice`).first()).toHaveText(`Your affiliate account is pending approval`);
}

// GI: "04 - Step 2 - Affiliate approval" (68ee4c90a5c7995601dc9727)
export async function _04Step2AffiliateApproval(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.admin = `yes`;
  await adminLogin(page, vars);
  await page.locator(`a[href="admin.php?page=affiliate-wp"] > .wp-menu-name`).filter({ visible: true }).first().click({ force: true });
  await page.locator(`a[href="admin.php?page=affiliate-wp-affiliates"]`).filter({ visible: true }).first().click({ force: true });
  await page.locator(`table.affiliates > tbody > tr:nth-of-type(1) > td`).first().hover();
  await page.locator(`table.affiliates > tbody > tr:nth-of-type(1) > td a[href*="action=accept"]`).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`tr:nth-of-type(1) > td.status.column-status`).first()).toContainText(`Active`);
}

// GI: "04 - Step 3 - Affiliate Dashboard" (68ee4c90a5c7995601dc9728)
export async function _04Step3AffiliateDashboard(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.username = `${vars.affiliateEmail ?? ''}`;
  await extractUserFromEmail(page, vars);
  await page.locator(`xpath=//a[contains(text(), "Affiliate Application Accepted")]`).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`td > table > tbody > tr > td > div > p:nth-of-type(1)`).first()).toContainText(`Congratulations`);
  await page.goBack();
  await page.locator(`xpath=//a[contains(text(), "Your Affiliate Application Is Being Reviewed")]`).filter({ visible: true }).first().click({ force: true });
  await page.locator(`a[href*="wp-login.php?action=rp&key="]`).or(page.locator(`tbody p > a`)).filter({ visible: true }).first().click({ force: true });
  try { await page.locator(`#pass1`).first().fill(`${vars.password ?? ''}`); } catch { await page.locator(`#pass1`).first().selectOption(`${vars.password ?? ''}`); }
  {
    const _lbl = page.locator(`label[for="wp-submit"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#wp-submit`).filter({ visible: true }).first().click({ force: true }); }
  }
  await page.locator(`a[href*="/wp-login.php"]`).filter({ visible: true }).first().click({ force: true });
  try { await page.locator(`#user_login`).first().fill(`${vars.username ?? ''}`); } catch { await page.locator(`#user_login`).first().selectOption(`${vars.username ?? ''}`); }
  try { await page.locator(`#user_pass`).first().fill(`${vars.password ?? ''}`); } catch { await page.locator(`#user_pass`).first().selectOption(`${vars.password ?? ''}`); }
  {
    const _lbl = page.locator(`label[for="wp-submit"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#wp-submit`).filter({ visible: true }).first().click({ force: true }); }
  }
  await page.goto(`${vars.startUrl ?? ''}affiliate-area/`);
  await page.waitForLoadState('load');
  await expect(page.locator(`#affwp-affiliate-dashboard-url-generator h3`)).not.toHaveCount(0);
  await page.locator(`html`).filter({ visible: true }).first().click({ force: true });
  try { await page.locator(`#affwp-url`).first().fill(`${vars.startUrl ?? ''}`); } catch { await page.locator(`#affwp-url`).first().selectOption(`${vars.startUrl ?? ''}`); }
  await page.locator(`input[type="submit"]`).filter({ visible: true }).first().click({ force: true });
  vars.affiliateSite = ((await page.locator(`div.affwp-custom-link-row > span.affwp-custom-link`).textContent()) ?? '').trim();
}

// GI: "05 - Place order - 01 - New User - Regular product" (68ee4c90a5c7995601dc9729)
export async function _05PlaceOrder01NewUserRegularProduct(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.goto(`${vars.affiliateSite ?? ''}`);
  await page.waitForLoadState('load');
  vars.own = `yes`;
  await _03CheckoutPageOnDemandHours(page, vars);
  if (vars.country === 'CA') {
    await placeOrderElement(page, vars);
  }
  if (vars.country === 'CA') {
    await expect(page.locator(`.woocommerce-error li`).first()).toContainText(`Your card number is incomplete.`);
  }
  if (vars.country === 'CA') {
    await fillCC(page, vars);
  }
  await placeOrderElement(page, vars);
  if (vars.country === 'CA') {
    await expect(page.locator(`.wc-block-components-notice-banner.is-error`).or(page.locator(`.woocommerce-error`)).first()).toContainText(`Please confirm you read and accepted the terms.
Billing Email address is a required field.
Billing First name is a required field.
Billing Last name is a required field.
Billing Street address is a required field.
Billing Town / City is a required field.
Billing Province is a required field.
Billing Postal code is a required field.
Billing Phone is a required field.
Billing You are purchasing: is a required field.
Create account password is a required field.`);
  }
  if (vars.country !== 'CA') {
    await expect(page.locator(`.wc-block-components-notice-banner.is-error`).or(page.locator(`.woocommerce-error`)).first()).toContainText(`Please confirm you read and accepted the terms.
Billing Email address is a required field.
Billing First name is a required field.
Billing Last name is a required field.
Billing Street address is a required field.
Billing Town / City is a required field.
Billing State is a required field.
Billing ZIP Code is a required field.
Billing Phone is a required field.
Billing You are purchasing: is a required field.
Create account password is a required field.
Please select who you are purchasing on behalf of.`);
  }
  await fillCheckout(page, vars);
  await blockUI(page, vars);
  await placeOrderElement(page, vars);
  if (vars.country === 'CA') {
    await blockUI(page, vars);
  }
  if (vars.country !== 'CA') {
    await fastSpringPaymentGateway(page, vars);
  }
  await page.waitForLoadState('load');
  await thankYouPage(page, vars);
  vars.refOrder1 = `${vars.orderNumber ?? ''}`;
  await checkOrderDetails(page, vars);
  await checkMyAccountOrderDetails(page, vars);
}

// GI: "05 - Place order - 02 - One-time order backend" (68ee4c90a5c7995601dc972a)
export async function _05PlaceOrder02OneTimeOrderBackend(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.admin = `yes`;
  await adminLogin(page, vars);
  await page.locator(`a[href="admin.php?page=wc-admin"] > .wp-menu-name`).filter({ visible: true }).first().click({ force: true });
  await page.locator(`a[href="edit.php?post_type=shop_order"]`).filter({ visible: true }).first().click({ force: true });
  await page.locator(`.wp-list-table tr#post-${vars.orderNumber ?? ''} td.order_number a.order-view`).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`.woocommerce-order-data__meta`).first()).toContainText(`Payment via ${vars.paymentMethod ?? ''}`);
  await expect(page.locator(`#select2-order_status-container`).first()).toContainText(`Completed`);
  if (vars.country === 'CA') {
    await expect(page.locator(`div.order_data_column:nth-of-type(2) > .address > p:nth-of-type(1)`).first()).toHaveText(`${vars.company ?? ''}
${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.street ?? ''}
${vars.city ?? ''} ${vars.state ?? ''} ${vars.zipCode ?? ''}`);
  }
  if (vars.country === 'US') {
    await expect(page.locator(`div.order_data_column:nth-of-type(2) > .address > p:nth-of-type(1)`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.company ?? ''}
${vars.street ?? ''}
${vars.city ?? ''}, ${vars.state ?? ''} ${vars.zipCode ?? ''}
${vars.countryComplete ?? ''}`);
  }
  await expect(page.locator(`div.order_data_column:nth-of-type(3) > .address > p`).first()).toContainText(`No shipping address set.`);
  await expect(page.locator(`a[href="mailto:${vars.email ?? ''}"]`).first()).toContainText(`${vars.email ?? ''}`);
  await expect(page.locator(`a[href*="tel:"]`).first()).toContainText(`${vars.phone ?? ''}`);
  try {
    await expect(page.locator(`div.order_data_column:nth-of-type(2) > div:nth-of-type(1) > p:nth-of-type(4)`).first()).toHaveText(`Purchasing in behalf:
own`);
  } catch { /* optional step: assertText */ }
  await expect(page.locator(`tr.item td.item_cost > .view > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
  await expect(page.locator(`tr.item td.line_cost > .view > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
  await expect(page.locator(`tr.shipping > td.line_cost > .view > .woocommerce-Price-amount.amount`)).toHaveCount(0);
  await expect(page.locator(`table.wc-order-totals:nth-of-type(1) > tbody > tr:nth-of-type(1) > td.total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.subtotal ?? ''}`);
  await expect(page.locator(`.wc-order-data-row.wc-order-totals-items > table.wc-order-totals:nth-of-type(1) > tbody > tr:nth-of-type(2) > td.total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.taxPrice ?? ''}`);
  await expect(page.locator(`.wc-order-data-row.wc-order-totals-items > table.wc-order-totals:nth-of-type(1) > tbody > tr:nth-of-type(3) > td.total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.total ?? ''}`);
  await expect(page.locator(`table.wc-order-totals:nth-of-type(2) > tbody > tr:nth-of-type(1) > td.total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.total ?? ''}`);
  await currencyChecker(page, vars);
  vars.referral1 = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let subtotal = `${vars.unitPrice}`;
subtotal = subtotal.replace(",","");
subtotal = Number(subtotal.replace(`${vars.Symbol}`,""));
let comission = (subtotal*5)/100;
comission = comission.toFixed(2)
return comission }, vars);
  vars.noteReferral = ((await page.locator(`#woocommerce-order-notes > div.inside > ul > li:nth-child(5) > div > p`).or(page.locator(`#woocommerce-order-notes > div.inside > ul > li:nth-child(3) > div > p`)).textContent()) ?? '').trim();
  if (vars.country === 'CA') {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let note = `${vars.noteReferral}`;
let array = note.match(/([0-9]+\.[0-9]+)/g);
let referral = Number(`${vars.referral1}`)
let rate = Number(array[2])
let referralUSD = Math.round(rate*referral*100)/100;


return Number(array[0]) === referral && referralUSD === Number(array[1])
 }, vars)).toBeTruthy();
  }
  if (vars.country !== 'CA') {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let note = `${vars.noteReferral}`;
let array = note.match(/([0-9]+\.[0-9]+)/g);
let referral = Number(`${vars.referral1}`)

return Number(array[0]) === referral
 }, vars)).toBeTruthy();
  }
  if (vars.country === 'CA') {
    vars.referral1USD = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let string = `${vars.noteReferral}`;
let array = string.match(/([0-9]+\.[0-9]+)/g);

return array[1]
 }, vars);
  }
  if (vars.country !== 'CA') {
    vars.referral1USD = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let string = `${vars.noteReferral}`;
let array = string.match(/([0-9]+\.[0-9]+)/g);

return array[0]
 }, vars);
  }
  await addPrivateOrderNote(page, vars);
}

// GI: "05 - Place order - 03 - Existent User (Subscription)" (68ee4c90a5c7995601dc972b)
export async function _05PlaceOrder03ExistentUserSubscription(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.username = `${vars.email ?? ''}`;
  vars.saved = `yes`;
  vars.email1 = `${vars.email ?? ''}`;
  vars.pass = `${vars.password ?? ''}`;
  await login(page, vars);
  await productManagedHostingMaintenance(page, vars);
  await currencyChecker(page, vars);
  await expect(page.locator(`td.product-name > a[href*="/product/"]`).or(page.locator(`td.product-name`)).or(page.locator(`.cart_item > th.product-name`)).first()).toHaveText(`${vars.prod_desc ?? ''} - ${vars.variable ?? ''} `);
  await expect(page.locator(`td.product-price > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
  await expect(page.locator(`.subscription-price > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
  vars.subtotal = ((await page.locator(`tr.cart-subtotal > td > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let unit = `${vars.unitPrice}`;
let subtotal = `${vars.subtotal}`;

unit = unit.replace(",","");
subtotal = subtotal.replace(",","");

unit = Number(unit.replace(`${vars.Symbol}`,""));
subtotal = Number(subtotal.replace(`${vars.Symbol}`,""));


return subtotal === unit }, vars)).toBeTruthy();
  if (vars.country === 'CA') {
    vars.taxPrice = ((await page.locator(`tr.tax-rate:not(.recurring-total) > td > .woocommerce-Price-amount.amount`).or(page.locator(`tr.fee:not(.recurring-total) > td > .woocommerce-Price-amount.amount`)).textContent()) ?? '').trim();
  }
  if (vars.country !== 'CA') {
    await expect(page.locator(`strong > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.subtotal ?? ''}`);
  }
  if (vars.country === 'CA') {
    vars.total = ((await page.locator(`strong > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
  }
  await expect(page.locator(`tr.cart-subtotal.recurring-total td .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
  if (vars.country === 'CA') {
    vars.taxRenew = ((await page.locator(`tr.tax-rate.recurring-total > td > .woocommerce-Price-amount.amount`).or(page.locator(`tr.fee.recurring-total > td > .woocommerce-Price-amount.amount`)).textContent()) ?? '').trim();
  }
  if (vars.country === 'CA') {
    vars.totalRenew = ((await page.locator(`tr.order-total.recurring-total > td > strong > .woocommerce-Price-amount.amount`).textContent()) ?? '').trim();
  }
  if (vars.country !== 'CA') {
    await expect(page.locator(`tr.order-total.recurring-total > td > strong > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
  }
  await page.locator(`xpath=//a[contains(text(), "Proceed to checkout")]`).or(page.locator(`a[href*="/checkout/"]`)).filter({ visible: true }).first().click({ force: true });
  if (vars.country !== 'CA') {
    await blockUI(page, vars);
  }
  if (vars.country !== 'CA') {
    await page.waitForTimeout(5000);
  }
  if (vars.country !== 'CA') {
    await blockUI(page, vars);
  }
  await currencyChecker(page, vars);
  await expect(page.locator(`td.product-name`).first()).toContainText(`${vars.prod_desc ?? ''} - ${vars.variable ?? ''}`);
  await expect(page.locator(`.subscription-price > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
  await expect(page.locator(`tfoot > tr.cart-subtotal:not(.recurring-total) > td > span > bdi`).first()).toHaveText(`${vars.subtotal ?? ''}`);
  if (vars.country === 'CA') {
    await expect(page.locator(`tr.tax-rate:not(.recurring-total) > td > .woocommerce-Price-amount.amount`).or(page.locator(`tr.fee:not(.recurring-total) > td > .woocommerce-Price-amount.amount`)).first()).toHaveText(`${vars.taxPrice ?? ''}`);
  }
  if (vars.country !== 'CA') {
    vars.taxPrice = ((await page.locator(`tr.tax-rate:not(.recurring-total) > td > .woocommerce-Price-amount.amount`).or(page.locator(`tr.fee:not(.recurring-total) > td > .woocommerce-Price-amount.amount`)).textContent()) ?? '').trim();
  }
  if (vars.country === 'CA') {
    await expect(page.locator(`tr.order-total:not(.recurring-total) strong > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.total ?? ''}`);
  }
  if (vars.country !== 'CA') {
    vars.total = ((await page.locator(`tr.order-total:not(.recurring-total) strong > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
  }
  await expect(page.locator(`tr.cart-subtotal.recurring-total > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
  if (vars.country === 'CA') {
    await expect(page.locator(`tr.tax-rate.recurring-total > td > .woocommerce-Price-amount.amount`).or(page.locator(`tr.fee.recurring-total > td > .woocommerce-Price-amount.amount`)).first()).toHaveText(`${vars.taxRenew ?? ''}`);
  }
  if (vars.country !== 'CA') {
    vars.taxRenew = ((await page.locator(`tr.tax-rate.recurring-total > td > .woocommerce-Price-amount.amount`).or(page.locator(`tr.fee.recurring-total > td > .woocommerce-Price-amount.amount`)).textContent()) ?? '').trim();
  }
  if (vars.country === 'CA') {
    await expect(page.locator(`tr.order-total.recurring-total > td > strong > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.totalRenew ?? ''}`);
  }
  if (vars.country !== 'CA') {
    vars.totalRenew = ((await page.locator(`tr.order-total.recurring-total > td > strong > .woocommerce-Price-amount.amount`).textContent()) ?? '').trim();
  }
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); 
let subtotal = `${vars.subtotal}`;
let tax;
if (`${vars.taxPrice}` === '') {
    tax = '0.00';
} else {
    tax = `${vars.taxPrice}`;
}
let total = `${vars.total}`;

subtotal = subtotal.replace(",","");
tax = tax.replace(",","");
total = total.replace(",","");

subtotal = Number(subtotal.replace(`${vars.Symbol}`,""));
tax = Number(tax.replace(`${vars.Symbol}`,""));
total = Number(total.replace(`${vars.Symbol}`,""));

let total2 = subtotal+tax;
total2 = Number(total2.toFixed(2));

return total === total2 }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let unit = `${vars.unitPrice}`;

let taxRenew;
if (`${vars.taxRenew}` === '') {
    taxRenew = '0.00';
} else {
    taxRenew = `${vars.taxRenew}`;
}

let totalRenew = `${vars.totalRenew}`;

unit = unit.replace(",","");
taxRenew = taxRenew.replace(",","");
totalRenew = totalRenew.replace(",","");

unit = Number(unit.replace(`${vars.Symbol}`,""));
taxRenew = Number(taxRenew.replace(`${vars.Symbol}`,""));
totalRenew = Number(totalRenew.replace(`${vars.Symbol}`,""));

let totalRenew2 = unit+taxRenew;
totalRenew2 = Number(totalRenew2.toFixed(2));

return totalRenew === totalRenew2 }, vars)).toBeTruthy();
  if (vars.country === 'CA') {
    await fillCC(page, vars);
  }
  {
    const _lbl = page.locator(`label[for="terms_acceptance"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#terms_acceptance`).filter({ visible: true }).first().click({ force: true }); }
  }
  await placeOrderElement(page, vars);
  if (vars.country !== 'CA') {
    await fastSpringPaymentGateway(page, vars);
  }
  await blockUI(page, vars);
  await page.waitForLoadState('load');
  await thankYouPage(page, vars);
  vars.refOrder2 = `${vars.orderNumber ?? ''}`;
  await checkOrderDetails(page, vars);
  await subscriptionDetailsThankYouPage(page, vars);
  await currencyChecker(page, vars);
  vars.subscriptionID1 = `${vars.subscriptionID ?? ''}`;
  await myAccountOrderDetails(page, vars);
}

// GI: "05 - Place order - 04 - Renew order" (68ee4c90a5c7995601dc972c)
export async function _05PlaceOrder04RenewOrder(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.admin = `yes`;
  await adminLogin(page, vars);
  await page.locator(`a[href="edit.php?post_type=shop_order"]`).filter({ visible: true }).first().click({ force: true });
  await page.locator(`a[href*="/wp-admin/post.php?post=${vars.orderNumber ?? ''}&action=edit"] > strong`).filter({ visible: true }).first().click({ force: true });
  await currencyChecker(page, vars);
  await expect(page.locator(`.woocommerce-order-data__meta`).first()).toContainText(`${vars.paymentMethod ?? ''}`);
  await expect(page.locator(`#select2-order_status-container`).first()).toContainText(`Completed`);
  if (vars.country === 'CA') {
    await expect(page.locator(`div.order_data_column:nth-of-type(2) > .address > p:nth-of-type(1)`).first()).toContainText(`${vars.company ?? ''}
${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.street ?? ''}
${vars.city ?? ''} ${vars.state ?? ''} ${vars.zipCode ?? ''}`);
  }
  if (vars.country !== 'CA') {
    await expect(page.locator(`div.order_data_column:nth-of-type(2) > .address > p:nth-of-type(1)`).first()).toContainText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.company ?? ''}
${vars.street ?? ''}
${vars.city ?? ''}, ${vars.state ?? ''} ${vars.zipCode ?? ''}
${vars.countryComplete ?? ''}`);
  }
  await expect(page.locator(`div.order_data_column:nth-of-type(3) > .address > p`).first()).toContainText(`No shipping address set.`);
  await expect(page.locator(`a[href="mailto:${vars.email ?? ''}"]`).first()).toContainText(`${vars.email ?? ''}`);
  await expect(page.locator(`a[href*="tel:"]`).first()).toContainText(`${vars.phone ?? ''}`);
  try {
    await expect(page.locator(`div.order_data_column:nth-of-type(2) > p`).first()).toHaveText(`Purchasing in behalf: own`);
  } catch { /* optional step: assertText */ }
  await expect(page.locator(`tr.item td.item_cost > .view > .woocommerce-Price-amount.amount > bdi`).first()).toContainText(`${vars.subtotal ?? ''}`);
  await expect(page.locator(`tr.item td.line_cost > .view > .woocommerce-Price-amount.amount > bdi`).first()).toContainText(`${vars.subtotal ?? ''}`);
  await expect(page.locator(`tr.fee td.line_cost > .view > .woocommerce-Price-amount.amount > bdi`).or(page.locator(`#order_line_items > tr > td.line_tax > div.view > span > bdi`)).first()).toContainText(`${vars.taxPrice ?? ''}`);
  await expect(page.locator(`tr.shipping > td.line_cost > .view > .woocommerce-Price-amount.amount`)).toHaveCount(0);
  await expect(page.locator(`table.wc-order-totals:nth-of-type(1) > tbody > tr:nth-of-type(1) > td.total > .woocommerce-Price-amount.amount > bdi`).first()).toContainText(`${vars.subtotal ?? ''}`);
  await expect(page.locator(`.wc-order-data-row.wc-order-totals-items > table.wc-order-totals:nth-of-type(1) > tbody > tr:nth-of-type(2) > td.total > .woocommerce-Price-amount.amount > bdi`).first()).toContainText(`${vars.taxPrice ?? ''}`);
  await expect(page.locator(`.wc-order-data-row.wc-order-totals-items > table.wc-order-totals:nth-of-type(1) > tbody > tr:nth-of-type(3) > td.total > .woocommerce-Price-amount.amount > bdi`).first()).toContainText(`${vars.total ?? ''}`);
  await expect(page.locator(`table.wc-order-totals:nth-of-type(2) > tbody > tr:nth-of-type(1) > td.total > .woocommerce-Price-amount.amount > bdi`).first()).toContainText(`${vars.total ?? ''}`);
  await renewByAdmin(page, vars);
  await currencyChecker(page, vars);
  await expect(page.locator(`tr.item td.item_cost > .view > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
  await expect(page.locator(`tr.item td.line_cost > .view > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
  await expect(page.locator(`td.line_tax > .view > .woocommerce-Price-amount.amount > bdi`).or(page.locator(`tr.fee td.line_cost > .view > .woocommerce-Price-amount.amount > bdi`)).first()).toHaveText(`${vars.taxRenew ?? ''}`);
  await expect(page.locator(`tr:nth-of-type(1) > td.total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
  await expect(page.locator(`.wc-order-data-row.wc-order-totals-items > table.wc-order-totals:nth-of-type(1) > tbody > tr:nth-of-type(2) > td.total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.taxRenew ?? ''}`);
  await expect(page.locator(`.wc-order-data-row.wc-order-totals-items > table.wc-order-totals:nth-of-type(1) > tbody > tr:nth-of-type(3) > td.total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.totalRenew ?? ''}`);
  await page.locator(`a[href*="/wp-admin/post.php?post=${vars.renewID ?? ''}&action=edit"]`).filter({ visible: true }).first().click({ force: true });
  await currencyChecker(page, vars);
  await expect(page.locator(`tr.item td.item_cost > .view > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
  await expect(page.locator(`tr.item td.line_cost > .view > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
  await expect(page.locator(`td.line_tax > .view > .woocommerce-Price-amount.amount > bdi`).or(page.locator(`tr.fee td.line_cost .woocommerce-Price-amount.amount > bdi`)).first()).toHaveText(`${vars.taxRenew ?? ''}`);
  await expect(page.locator(`table.wc-order-totals:nth-of-type(1) > tbody > tr:nth-of-type(1) > td.total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
  await expect(page.locator(`.wc-order-data-row.wc-order-totals-items > table.wc-order-totals:nth-of-type(1) > tbody > tr:nth-of-type(2) > td.total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.taxRenew ?? ''}`);
  await expect(page.locator(`.wc-order-data-row.wc-order-totals-items > table.wc-order-totals:nth-of-type(1) > tbody > tr:nth-of-type(3) > td.total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.totalRenew ?? ''}`);
  if ((() => { let staging = vars.stagingMode
return staging.includes("staging") })()) {
    await expect(page.locator(`#select2-order_status-container`).first()).toContainText(`Pending payment`);
  }
  if ((() => { let staging = vars.stagingMode
return false === staging.includes("staging") })()) {
    await expect(page.locator(`#select2-order_status-container`).first()).toContainText(`Completed`);
  }
}

// GI: "05 - Place order - 05 - New User - Subscription" (68ee4c90a5c7995601dc972d)
export async function _05PlaceOrder05NewUserSubscription(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.own = ``;
  vars.saved = ``;
  vars.subscription = `yes`;
  vars.email = `qa+gi_order_${vars.alphanumeric ?? ''}@saucal.com`;
  if (vars.country === 'CA') {
    await page.goto(`${vars.startUrl ?? ''}product/managed-woocommerce/`);
    await page.waitForLoadState('load');
  }
  if (vars.country !== 'CA') {
    await page.goto(`${vars.startUrl ?? ''}product/managed-hosting/`);
    await page.waitForLoadState('load');
  }
  await page.waitForLoadState('load');
  if (vars.country === 'CA') {
    try { await page.locator(`#plan`).first().fill(`Launch`); } catch { await page.locator(`#plan`).first().selectOption(`Launch`); }
  }
  if (vars.country === 'CA') {
    try { await page.locator(`#recurrence`).first().fill(`Yearly`); } catch { await page.locator(`#recurrence`).first().selectOption(`Yearly`); }
  }
  if (vars.country !== 'CA') {
    try { await page.locator(`#plan`).first().fill(`Up to 2,500 orders per month`); } catch { await page.locator(`#plan`).first().selectOption(`Up to 2,500 orders per month`); }
  }
  vars.unitPrice = ((await page.locator(`.woocommerce-variation-price > .price > span > bdi`).or(page.locator(`.wcpbc-price > .price > span > bdi`)).textContent()) ?? '').trim();
  if (vars.country === 'CA') {
    vars.signUpFee = ((await page.locator(`.woocommerce-variation-price > .price > span > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
  }
  await currencyChecker(page, vars);
  await page.locator(`button[type="submit"].single_add_to_cart_button`).filter({ visible: true }).first().click({ force: true });
  await page.locator(`.wc-block-components-notice-banner a[href*="/cart/"].button.wc-forward`).or(page.locator(`.woocommerce-message a[href*="/cart/"].button.wc-forward`)).filter({ visible: true }).first().click({ force: true });
  vars.prod_desc = ((await page.locator(`td.product-name > a[href*="/product/"]`).or(page.locator(`td.product-name`)).or(page.locator(`.cart_item > th.product-name`)).textContent()) ?? '').trim();
  await expect(page.locator(`td.product-price > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
  if (vars.country === 'CA') {
    await expect(page.locator(`td.product-price > .subscription-details > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.signUpFee ?? ''}`);
  }
  await expect(page.locator(`.subscription-price > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
  if (vars.country === 'CA') {
    await expect(page.locator(`.subscription-price > .subscription-details > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.signUpFee ?? ''}`);
  }
  vars.subtotal = ((await page.locator(`tr.cart-subtotal > td > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let unit = `${vars.unitPrice}`;

let signup;

if (`${vars.signUpFee}` === '') {
    signup = "0.00";
} else {
    signup = `${vars.signUpFee}`;
}


let subtotal = `${vars.subtotal}`;

unit = unit.replace(",","");
signup = signup.replace(",","");
subtotal = subtotal.replace(",","");

unit = Number(unit.replace(`${vars.Symbol}`,""));
signup = Number(signup.replace(`${vars.Symbol}`,""));
subtotal = Number(subtotal.replace(`${vars.Symbol}`,""));

let subtotal2 = unit+signup;
subtotal2 = Number(subtotal2.toFixed(2));

return subtotal === subtotal2 }, vars)).toBeTruthy();
  await expect(page.locator(`strong > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.subtotal ?? ''}`);
  await page.locator(`xpath=//a[contains(text(), "Proceed to checkout")]`).or(page.locator(`a[href*="/checkout/"]`)).filter({ visible: true }).first().click({ force: true });
  await currencyChecker(page, vars);
  await fillCheckout(page, vars);
  if (vars.country === 'CA') {
    await fillBankTransfer(page, vars);
  }
  await blockUI(page, vars);
  if (vars.country !== 'CA') {
    await page.waitForTimeout(5000);
  }
  if (vars.country !== 'CA') {
    await blockUI(page, vars);
  }
  await placeOrderElement(page, vars);
  if (vars.country !== 'CA') {
    await fastSpringPaymentGateway(page, vars);
  }
  await blockUI(page, vars);
  await page.waitForLoadState('load');
  await thankYouPage(page, vars);
  await checkOrderDetails(page, vars);
  vars.orderNumber05 = `${vars.orderNumber ?? ''}`;
  await subscriptionDetailsThankYouPage(page, vars);
  vars.subscriptionID05 = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let ID = `${vars.subscriptionID}`
ID = ID.replace("#","")
return ID }, vars);
  if (vars.country === 'CA') {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let element = document.querySelector<HTMLAnchorElement>("div > p:nth-of-type(2) > a")
element = element.getAttribute("href")
console.log(element);
return element === `${vars.bankAccount}` }, vars)).toBeTruthy();
  }
}

// GI: "05 - Place order - 06 - Backend" (68ee4c90a5c7995601dc972e)
export async function _05PlaceOrder06Backend(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.admin = `yes`;
  await adminLogin(page, vars);
  await page.locator(`a[href="edit.php?post_type=shop_order"]`).filter({ visible: true }).first().click({ force: true });
  await page.locator(`a[href*="/wp-admin/post.php?post=${vars.orderNumber05 ?? ''}&action=edit"] > strong`).filter({ visible: true }).first().click({ force: true });
  await currencyChecker(page, vars);
  await expect(page.locator(`.woocommerce-order-data__meta`).first()).toContainText(`Payment via ${vars.paymentMethod ?? ''}`);
  if (vars.country !== 'CA') {
    await expect(page.locator(`#select2-order_status-container`).first()).toContainText(`Complete`);
  }
  if (vars.country == 'CA') {
    await expect(page.locator(`#select2-order_status-container`).first()).toContainText(`On hold`);
  }
  if (vars.country !== 'CA') {
    await expect(page.locator(`div.order_data_column:nth-of-type(2) > .address > p:nth-of-type(1)`).first()).toContainText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.company ?? ''}
${vars.street ?? ''}
${vars.city ?? ''}, ${vars.state ?? ''} ${vars.zipCode ?? ''}
${vars.countryComplete ?? ''}`);
  }
  if (vars.country === 'CA') {
    await expect(page.locator(`div.order_data_column:nth-of-type(2) > .address > p:nth-of-type(1)`).first()).toContainText(`${vars.company ?? ''}
${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.street ?? ''}
${vars.city ?? ''} ${vars.state ?? ''} ${vars.zipCode ?? ''}`);
  }
  await expect(page.locator(`div.order_data_column:nth-of-type(3) > .address > p`).first()).toContainText(`No shipping address set.`);
  await expect(page.locator(`a[href="mailto:${vars.email ?? ''}"]`).first()).toContainText(`${vars.email ?? ''}`);
  await expect(page.locator(`a[href*="tel:"]`).first()).toContainText(`${vars.phone ?? ''}`);
  await expect(page.locator(`td.item_cost > .view > .woocommerce-Price-amount.amount > bdi`).first()).toContainText(`${vars.subtotal ?? ''}`);
  await expect(page.locator(`td.line_cost > .view > .woocommerce-Price-amount.amount > bdi`).first()).toContainText(`${vars.subtotal ?? ''}`);
  await expect(page.locator(`tr.shipping > td.line_cost > .view > .woocommerce-Price-amount.amount`)).toHaveCount(0);
  await expect(page.locator(`table.wc-order-totals:nth-of-type(1) > tbody > tr:nth-of-type(1) > td.total > .woocommerce-Price-amount.amount > bdi`).first()).toContainText(`${vars.subtotal ?? ''}`);
  await expect(page.locator(`.wc-order-data-row.wc-order-totals-items > table.wc-order-totals:nth-of-type(1) > tbody > tr:nth-of-type(2) > td.total > .woocommerce-Price-amount.amount > bdi`).first()).toContainText(`${vars.taxPrice ?? ''}`);
  await expect(page.locator(`.wc-order-data-row.wc-order-totals-items > table.wc-order-totals:nth-of-type(1) > tbody > tr:nth-of-type(3) > td.total > .woocommerce-Price-amount.amount > bdi`).first()).toContainText(`${vars.total ?? ''}`);
  try {
    await expect(page.locator(`div.order_data_column:nth-of-type(2) > p:nth-of-type(1)`).first()).toHaveText(`Purchasing in behalf: company`);
  } catch { /* optional step: assertText */ }
  try {
    await expect(page.locator(`div.order_data_column:nth-of-type(2) > p:nth-of-type(2)`).first()).toHaveText(`Full legal name: Legal Inc.`);
  } catch { /* optional step: assertText */ }
  try {
    await expect(page.locator(`div.order_data_column:nth-of-type(2) > p:nth-of-type(3)`).first()).toHaveText(`Registered address: 123 False, Miami FL 33126 US`);
  } catch { /* optional step: assertText */ }
  try {
    await expect(page.locator(`div.order_data_column:nth-of-type(2) > p:nth-of-type(4)`).first()).toHaveText(`Company number: 1231231234`);
  } catch { /* optional step: assertText */ }
  try {
    await expect(page.locator(`.order_data_column > p:nth-of-type(5)`).first()).toHaveText(`Place of incorporation: test`);
  } catch { /* optional step: assertText */ }
}

// GI: "06 - Test Scenario 1 - Step 1 - Admin order creation" (68ee4c90a5c7995601dc972f)
export async function _06TestScenario1Step1AdminOrderCreation(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.admin = `yes`;
  await adminLogin(page, vars);
  await page.locator(`a[href="edit.php?post_type=shop_order"]`).filter({ visible: true }).first().click({ force: true });
  await page.locator(`a[href*="/wp-admin/post-new.php?post_type=shop_order"]`).filter({ visible: true }).first().click({ force: true });
  vars.orderNumber = ((await page.locator(`h2.woocommerce-order-data__heading`).textContent()) ?? '').trim();
  vars.order = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const regex = /([0-9])\w+/g;
const str = `${vars.orderNumber}`;
let m;
m = regex.exec(str)
return m[0] }, vars);
  {
    const _lbl = page.locator(`label[for="select2-customer_user-container"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#select2-customer_user-container`).filter({ visible: true }).first().click({ force: true }); }
  }
  try { await page.locator(`span:nth-of-type(1) > input[type="text"]`).first().fill(`${vars.email ?? ''}`); } catch { await page.locator(`span:nth-of-type(1) > input[type="text"]`).first().selectOption(`${vars.email ?? ''}`); }
  await expect(page.locator(`#select2-customer_user-results > li.select2-results__option.select2-results__option--highlighted`)).not.toHaveCount(0);
  await page.locator(`#select2-customer_user-results > li:nth-of-type(1)`).filter({ visible: true }).first().click({ force: true });
  await page.waitForTimeout(5000);
  await page.locator(`.load_customer_billing`).filter({ visible: true }).first().click({ force: true });
  await page.waitForTimeout(5000);
  await page.locator(`.billing-same-as-shipping`).filter({ visible: true }).first().click({ force: true });
  await page.waitForTimeout(10000);
  await page.locator(`xpath=//button[contains(text(), "Add item(s)")]`).or(page.locator(`button[type="button"].button.add-line-item`)).filter({ visible: true }).first().click({ force: true });
  await page.locator(`xpath=//button[contains(text(), "Add product(s)")]`).or(page.locator(`button[type="button"].button.add-order-item`)).filter({ visible: true }).first().click({ force: true });
  await page.locator(`xpath=//span[contains(text(), "Search for a product…")]`).or(page.locator(`#select2-item_id-tf-container > span`)).filter({ visible: true }).first().click({ force: true });
  vars.product = `On-Demand Development (Block Hours) - 100`;
  try { await page.locator(`span:nth-of-type(1) > input[type="text"]`).first().fill(`${vars.product ?? ''}`); } catch { await page.locator(`span:nth-of-type(1) > input[type="text"]`).first().selectOption(`${vars.product ?? ''}`); }
  await expect(page.locator(`li.loading-results`)).not.toHaveCount(0);
  await expect(page.locator(`li.loading-results`)).toHaveCount(0);
  await page.locator(`xpath=//li[contains(text(), "${vars.product ?? ''}")]`).or(page.locator(`.select2-results > ul.select2-results__options > li`)).filter({ visible: true }).first().click({ force: true });
  {
    const _lbl = page.locator(`label[for="btn-ok"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#btn-ok`).filter({ visible: true }).first().click({ force: true }); }
  }
  await blockUI(page, vars);
  vars.price = ((await page.locator(`td.line_cost > .view > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
  vars.subtotal = `${vars.price ?? ''}`;
  await extractPriceFromElement(page, vars);
  vars.priceUSD = `${vars.unitPrice ?? ''}`;
  {
    const _lbl = page.locator(`label[for="wcpbc-load-pricing-action"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#wcpbc-load-pricing-action`).filter({ visible: true }).first().click({ force: true }); }
  }
  await blockUI(page, vars);
  vars.price = ((await page.locator(`td.line_cost > .view > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
  await extractPriceFromElement(page, vars);
  if (vars.country === 'CA') {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let priceUSD = `${vars.priceUSD}`
let unitPrice = `${vars.unitPrice}`
return priceUSD != unitPrice }, vars)).toBeTruthy();
  }
  await expect(page.locator(`tr:nth-of-type(1) > td.total > .woocommerce-Price-amount.amount > bdi`).first()).toContainText(`${vars.price ?? ''}`);
  if (vars.country === 'CA') {
    vars.taxPrice = ((await page.locator(`#woocommerce-order-items > div.inside > div.wc-order-data-row.wc-order-totals-items.wc-order-items-editable > table:nth-child(1) > tbody > tr:nth-child(2) > td.total > span > bdi`).textContent()) ?? '').trim();
  }
  if (vars.country === 'CA') {
    vars.total = ((await page.locator(`#woocommerce-order-items > div.inside > div.wc-order-data-row.wc-order-totals-items.wc-order-items-editable > table:nth-child(1) > tbody > tr:nth-child(3) > td.total > span > bdi`).textContent()) ?? '').trim();
  }
  if (vars.country !== 'CA') {
    vars.total = ((await page.locator(`#woocommerce-order-items > div.inside > div.wc-order-data-row.wc-order-totals-items.wc-order-items-editable > table:nth-child(1) > tbody > tr:nth-child(2) > td.total > span > bdi`).textContent()) ?? '').trim();
  }
  try {
    if (false) {
      expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let symbol = document.getElementsByClassName('woocommerce-Price-currencySymbol')
let boolean = false
let n = 0
let length = symbol.length

while (n < length) {
        if (symbol[n].textContent === `{${vars.Symbol}`) {
        boolean = true
        } else {
            boolean = false
            break;
        }
        n++;
    }

return boolean }, vars)).toBeTruthy();
    }
  } catch { /* optional step: assertEval */ }
  await currencyChecker(page, vars);
  // skipped: select-open click on 'select[name="wc_order_action"]' — use selectOption instead
  try { await page.locator(`select[name="wc_order_action"]`).first().fill(`send_order_details`); } catch { await page.locator(`select[name="wc_order_action"]`).first().selectOption(`send_order_details`); }
  // TODO: command="dragAndDrop" target="select[name=\"wc_order_action\"]" value="#wp-admin-bar-wp-logo > a[href*=\"/wp-admin/about.php\"].ab-item"
  await page.locator(`xpath=//button[contains(text(), "Create")]`).or(page.locator(`button[name="save"]`)).filter({ visible: true }).first().click({ force: true });
  await blockUI(page, vars);
  await page.waitForLoadState('load');
  await blockUI(page, vars);
  await expect(page.locator(`li.note:nth-of-type(1) > .note_content > p`).first()).toContainText(`Order details manually sent to customer.`);
  vars.username = ((await page.locator(`#order_data > div.order_data_column_container > div:nth-child(2) > div.address > p:nth-child(2) > a`).textContent()) ?? '').trim();
  vars.address = ((await page.locator(`#order_data > div.order_data_column_container > div:nth-child(2) > div.address > p:nth-child(1)`).textContent()) ?? '').trim();
  vars.phone = ((await page.locator(`#order_data > div.order_data_column_container > div:nth-child(2) > div.address > p:nth-child(3) > a`).textContent()) ?? '').trim();
}

// GI: "06 - Test Scenario 1 - Step 2 - Customer Pay Order" (68ee4c90a5c7995601dc9730)
export async function _06TestScenario1Step2CustomerPayOrder(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.admin = `no`;
  vars.subscription = `no`;
  vars.saved = `yes`;
  vars.username = `${vars.email ?? ''}`;
  vars.pass = `${vars.password ?? ''}`;
  await extractUserFromEmail(page, vars);
  await page.locator(`xpath=//a[contains(text(), "Your latest SAU/CAL invoice")]`).or(page.locator(`xpath=//a[contains(text(), "You have a new order")]`)).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`#header_wrapper > h1`).first()).toContainText(`${vars.order ?? ''}`);
  await expect(page.locator(`tr.order_item > td.td.text-align-left:nth-of-type(1)`).first()).toContainText(`${vars.product ?? ''}`);
  await expect(page.locator(`tr.order_item > td.td.text-align-left:nth-of-type(2)`).first()).toHaveText(`1`);
  await expect(page.locator(`tr.order_item > td.td.text-align-left:nth-of-type(3) > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.price ?? ''}`);
  await expect(page.locator(`tr.order-totals.order-totals-subtotal > td.td.text-align-left > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.price ?? ''}`);
  if (vars.country === 'CA') {
    await expect(page.locator(`tr.order-totals.order-totals-tax > td.td.text-align-left > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.taxPrice ?? ''}`);
  }
  await expect(page.locator(`tr.order-totals.order-totals-total > td.td.text-align-left > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.total ?? ''}`);
  await expect(page.locator(`address.address`)).not.toHaveCount(0);
  await page.locator(`#body_content_inner > p:nth-child(2) > a`).filter({ visible: true }).first().click({ force: true });
  await login(page, vars);
  await page.waitForLoadState('load');
  await expect(page.locator(`a[href*="/cart/"][title="View your shopping cart"] > .count`).first()).toContainText(`1 item`);
  await expect(page.locator(`td.product-name`).first()).toContainText(`${vars.product ?? ''}`);
  await expect(page.locator(`td.product-total > .woocommerce-Price-amount.amount > bdi`).first()).toContainText(`${vars.price ?? ''}`);
  await expect(page.locator(`tr.cart-subtotal > td > .woocommerce-Price-amount.amount > bdi`).or(page.locator(`tfoot tr:nth-of-type(1) > td > .woocommerce-Price-amount.amount > bdi`)).first()).toContainText(`${vars.price ?? ''}`);
  if (vars.country === 'CA') {
    await expect(page.locator(`tr.tax-rate > td > .woocommerce-Price-amount.amount`).or(page.locator(`tr.fee > td > .woocommerce-Price-amount.amount > bdi`)).or(page.locator(`tr.fee > td > .woocommerce-Price-amount.amount`)).first()).toContainText(`${vars.taxPrice ?? ''}`);
  }
  if (vars.country !== 'CA') {
    await blockUI(page, vars);
  }
  if (vars.country !== 'CA') {
    await page.waitForTimeout(15000);
  }
  if (vars.country !== 'CA') {
    await blockUI(page, vars);
  }
  if (vars.country !== 'CA') {
    vars.taxPrice = ((await page.locator(`tr.tax-rate > td > .woocommerce-Price-amount.amount`).or(page.locator(`tr.fee > td > .woocommerce-Price-amount.amount > bdi`)).or(page.locator(`tr.fee > td > .woocommerce-Price-amount.amount`)).textContent()) ?? '').trim();
  }
  if (vars.country === 'CA') {
    await expect(page.locator(`tr.order-total > td > strong > .woocommerce-Price-amount.amount > bdi`).first()).toContainText(`${vars.total ?? ''}`);
  }
  if (vars.country !== 'CA') {
    vars.total = ((await page.locator(`tr.order-total > td > strong > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
  }
  if (vars.country !== 'CA') {
    await checkTotal(page, vars);
  }
  if (vars.country === 'CA') {
    {
      const _lbl = page.locator(`label[for="payment_method_bacs"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#payment_method_bacs`).filter({ visible: true }).first().click({ force: true }); }
    }
  }
  await blockUI(page, vars);
  {
    const _lbl = page.locator(`label[for="terms_acceptance"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#terms_acceptance`).filter({ visible: true }).first().click({ force: true }); }
  }
  {
    const _lbl = page.locator(`label[for="place_order"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#place_order`).filter({ visible: true }).first().click({ force: true }); }
  }
  if (vars.country !== 'CA') {
    await fastSpringPaymentGateway(page, vars);
  }
  await expect(page.locator(`.order > strong`).first()).toContainText(`${vars.order ?? ''}`);
  await expect(page.locator(`strong > .woocommerce-Price-amount.amount > bdi`).first()).toContainText(`${vars.total ?? ''}`);
  await expect(page.locator(`td.woocommerce-table__product-name`).first()).toContainText(`${vars.product ?? ''}`);
  await expect(page.locator(`td.woocommerce-table__product-total > .woocommerce-Price-amount.amount > bdi`).first()).toContainText(`${vars.price ?? ''}`);
  await expect(page.locator(`tfoot > tr:nth-of-type(1) > td > .woocommerce-Price-amount.amount`).first()).toContainText(`${vars.price ?? ''}`);
  await expect(page.locator(`tr:nth-of-type(2) > td > .woocommerce-Price-amount.amount`).first()).toContainText(`${vars.taxPrice ?? ''}`);
  await expect(page.locator(`tr:nth-of-type(4) > td > .woocommerce-Price-amount.amount`).first()).toContainText(`${vars.total ?? ''}`);
  await expect(page.locator(`.woocommerce-customer-details > address`).first()).toContainText(`${vars.address ?? ''}`);
  await expect(page.locator(`.woocommerce-customer-details > address`).first()).toContainText(`${vars.username ?? ''}`);
  await expect(page.locator(`.woocommerce-customer-details > address`).first()).toContainText(`${vars.phone ?? ''}`);
}

// GI: "07 - 01 - Affiliate Dashboard - Check referral" (68ee4c90a5c7995601dc9731)
export async function _0701AffiliateDashboardCheckReferral(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.admin = `no`;
  vars.username = `${vars.affiliateEmail ?? ''}`;
  vars.pass = `${vars.password ?? ''}`;
  await login(page, vars);
  await page.goto(`${vars.site ?? ''}affiliate-area/`);
  await page.waitForLoadState('load');
  await page.locator(`li:nth-of-type(3) > a[href*="stats"]`).filter({ visible: true }).first().click({ force: true });
  if ((() => { let staging = vars.stagingMode
return staging.includes("staging") })()) {
    await expect(page.locator(`td[data-th="Unpaid Referrals"]`).first()).toHaveText(`1`);
  }
  if ((() => { let staging = vars.stagingMode
return false === staging.includes("staging") })()) {
    await expect(page.locator(`td[data-th="Unpaid Referrals"]`).first()).toHaveText(`1`);
  }
  if ((() => { let staging = vars.stagingMode
return staging.includes("staging") })()) {
    vars.totalReferral = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let referral1 = vars.referral1USD;

let totalReferral = Math.round((referral1)*100)/100
return Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD'}).format(totalReferral)

 }, vars);
  }
  if ((() => { let staging = vars.stagingMode
return false === staging.includes("staging") })()) {
    vars.totalReferral = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let referral1 = vars.referral1USD;

let totalReferral = Math.round((referral1)*100)/100
return Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD'}).format(totalReferral)
 }, vars);
  }
  if ((() => { let staging = vars.stagingMode
return staging.includes("staging") })()) {
    await expect(page.locator(`td[data-th="Unpaid Earnings"]`).first()).toHaveText(`${vars.totalReferral ?? ''}`);
  }
  if ((() => { let staging = vars.stagingMode
return false === staging.includes("staging") })()) {
    await expect(page.locator(`td[data-th="Unpaid Earnings"]`).first()).toHaveText(`${vars.totalReferral ?? ''}`);
  }
}

// GI: "07 - 02 - Affiliate referral backend" (68ee4c90a5c7995601dc9732)
export async function _0702AffiliateReferralBackend(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.admin = `yes`;
  await adminLogin(page, vars);
  await page.locator(`a[href="admin.php?page=affiliate-wp"] > .wp-menu-name`).filter({ visible: true }).first().click({ force: true });
  await page.locator(`a[href="admin.php?page=affiliate-wp-referrals"]`).filter({ visible: true }).first().click({ force: true });
  if ((() => { let staging = vars.stagingMode
return staging.includes("staging") })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let ref1 = document.querySelector(`a[href*='${vars.refOrder1}']`)


ref1 = ref1.parentElement
ref1 = ref1.previousElementSibling
ref1 = ref1.previousElementSibling


return ref1.innerText === "$"+`${vars.referral1USD}` 
 }, vars)).toBeTruthy();
  }
  if ((() => { let staging = vars.stagingMode
return false === staging.includes("staging") })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let ref1 = document.querySelector(`a[href*='${vars.refOrder1}']`)


ref1 = ref1.parentElement
ref1 = ref1.previousElementSibling
ref1 = ref1.previousElementSibling



return ref1.innerText === "$"+`${vars.referral1USD}` 
 }, vars)).toBeTruthy();
  }
}

// GI: "08 - Cancel Subscription by Customer" (68ee4c90a5c7995601dc9733)
export async function _08CancelSubscriptionByCustomer(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.admin = ``;
  vars.username = `${vars.email1 ?? ''}`;
  vars.pass = `${vars.password ?? ''}`;
  await login(page, vars);
  await page.locator(`a[href*="/view-subscription/"]`).filter({ visible: true }).first().click({ force: true });
  await page.locator(`a[href*="change_subscription_to=cancelled"]`).filter({ visible: true }).first().click({ force: true });
  await page.waitForLoadState('load');
  await expect(page.locator(`.wc-block-components-notice-banner`).or(page.locator(`.woocommerce-info`)).or(page.locator(`.woocommerce-message`)).first()).toContainText(`Your subscription has been cancelled.`);
  await expect(page.locator(`table.shop_table.subscription_details > tbody > tr:nth-of-type(1) > td:nth-of-type(2)`).first()).toContainText(`Pending Cancellation`);
}

// GI: "09 - Renew without Next payment day" (68ee4c90a5c7995601dc9734)
export async function _09RenewWithoutNextPaymentDay(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.site = `${vars.url ?? ''}`;
  vars.admin = `yes`;
  vars.orderNumber = `${vars.orderNumber05 ?? ''}`;
  vars.subscriptionID = `${vars.subscriptionID05 ?? ''}`;
  await adminLogin(page, vars);
  await page.locator(`a[href="edit.php?post_type=shop_order"]`).filter({ visible: true }).first().click({ force: true });
  await page.locator(`a[href*="/wp-admin/post.php?post=${vars.orderNumber ?? ''}&action=edit"] > strong`).filter({ visible: true }).first().click({ force: true });
  {
    const _lbl = page.locator(`label[for="select2-order_status-container"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#select2-order_status-container`).filter({ visible: true }).first().click({ force: true }); }
  }
  await page.locator(`xpath=//li[contains(text(), "Completed")]`).filter({ visible: true }).first().click({ force: true });
  await page.locator(`button[name="save"]`).filter({ visible: true }).first().click({ force: true });
  await page.locator(`a[href="edit.php?post_type=shop_subscription"]`).filter({ visible: true }).first().click({ force: true });
  await page.locator(`a[href*="/wp-admin/post.php?post=${vars.subscriptionID ?? ''}&action=edit"]`).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`#select2-order_status-container`).first()).toContainText(`Active`);
  try { await page.locator(`#next_payment`).first().fill(``); } catch { await page.locator(`#next_payment`).first().selectOption(``); }
  await page.locator(`button[name="save"]`).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`[id="message"].updated > p`).first()).toContainText(`Subscription updated.`);
  // skipped: select-open click on 'select[name="wc_order_action"]' — use selectOption instead
  try { await page.locator(`select[name="wc_order_action"]`).first().fill(`wcs_process_renewal`); } catch { await page.locator(`select[name="wc_order_action"]`).first().selectOption(`wcs_process_renewal`); }
  await page.locator(`button[name="save"]`).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`[id="message"].updated > p`).first()).toContainText(`Subscription updated.`);
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); var element = document.querySelector('#next_payment_timestamp_utc');
return element.getAttribute('value') === '0' }, vars)).toBeTruthy();
}

// GI: "10 - Place order - New User - Discovery" (68ee4c90a5c7995601dc9735)
export async function _10PlaceOrderNewUserDiscovery(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.subscription = ``;
  vars.email = `qa+gi_order_${vars.alphanumeric ?? ''}@saucal.com`;
  vars.username = `${vars.email ?? ''}`;
  await page.goto(`${vars.startUrl ?? ''}product/discovery-consultation/`);
  await page.waitForLoadState('load');
  await page.waitForLoadState('load');
  vars.unitPrice = ((await page.locator(`ins > .woocommerce-Price-amount.amount > bdi`).or(page.locator(`.woocommerce-Price-amount.amount > bdi`)).textContent()) ?? '').trim();
  await currencyChecker(page, vars);
  await page.locator(`button[type="submit"].single_add_to_cart_button`).filter({ visible: true }).first().click({ force: true });
  await page.locator(`.wc-block-components-notice-banner a[href*="/cart/"].button.wc-forward`).or(page.locator(`.woocommerce-message a[href*="/cart/"].button.wc-forward`)).filter({ visible: true }).first().click({ force: true });
  vars.prod_desc = ((await page.locator(`.cart_item > .product-name`).textContent()) ?? '').trim();
  await expect(page.locator(`td.product-price > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
  vars.subtotalPrice = ((await page.locator(`tr.cart-subtotal > td > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
  await expect(page.locator(`tr.cart-subtotal > td > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
  vars.total = ((await page.locator(`strong > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); 
let subtotal = `${vars.subtotalPrice}`;
let total = `${vars.total}`;

subtotal = subtotal.replace(",","");
total = total.replace(",","");

subtotal = Number(subtotal.replace(`${vars.Symbol}`,""));
total = Number(total.replace(`${vars.Symbol}`,""));


return total === subtotal }, vars)).toBeTruthy();
  await currencyChecker(page, vars);
  await page.locator(`xpath=//a[contains(text(), "Proceed to checkout")]`).or(page.locator(`a[href*="/checkout/"]`)).filter({ visible: true }).first().click({ force: true });
  await currencyChecker(page, vars);
  await wooCommerceCheckoutTemplate(page, vars);
  try {
    await page.locator(`xpath=//label[contains(text(), "on your own behalf")]`).or(page.locator(`label[for="billing_behalf_company_own"].radio`)).filter({ visible: true }).first().click({ force: true });
  } catch { /* optional step: click */ }
  await expect(page.locator(`td.product-name`).first()).toContainText(`${vars.prod_desc ?? ''}`);
  await expect(page.locator(`td.product-total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
  await expect(page.locator(`tr.cart-subtotal > td > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
  await expect(page.locator(`strong > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.total ?? ''}`);
  await blockUI(page, vars);
  {
    const _lbl = page.locator(`label[for="payment_method_stripe"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#payment_method_stripe`).filter({ visible: true }).first().click({ force: true }); }
  }
  try { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="number"]`).first().fill(`${vars.cc ?? ''}`); } catch { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="number"]`).first().selectOption(`${vars.cc ?? ''}`); }
  try { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="expiry"]`).first().fill(`${vars.month ?? ''} / ${vars.year ?? ''}`); } catch { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="expiry"]`).first().selectOption(`${vars.month ?? ''} / ${vars.year ?? ''}`); }
  try { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="cvc"]`).first().fill(`${vars.cvv ?? ''}`); } catch { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="cvc"]`).first().selectOption(`${vars.cvv ?? ''}`); }
  await blockUI(page, vars);
  await placeOrderElement(page, vars);
  await blockUI(page, vars);
  await page.waitForLoadState('load');
  vars.orderNumber = ((await page.locator(`.order > strong`).textContent()) ?? '').trim();
  await expect(page.locator(`strong > .woocommerce-Price-amount.amount > bdi`).first()).toContainText(`${vars.total ?? ''}`);
  await expect(page.locator(`td.woocommerce-table__product-total > .woocommerce-Price-amount.amount > bdi`).first()).toContainText(`${vars.subtotalPrice ?? ''}`);
  await expect(page.locator(`tfoot > tr:nth-of-type(1) > td > .woocommerce-Price-amount.amount`).first()).toContainText(`${vars.subtotalPrice ?? ''}`);
  await expect(page.locator(`tfoot:nth-child(3) > tr:nth-child(2) > td:nth-child(2) > span:nth-child(1)`).or(page.locator(`section.woocommerce-order-details > table > tfoot:nth-child(4) > tr:nth-child(2) > td > span`)).first()).toContainText(`${vars.taxPrice ?? ''}`);
  await expect(page.locator(`tfoot:nth-child(3) > tr:nth-child(4) > td:nth-child(2) > span:nth-child(1)`).or(page.locator(`section.woocommerce-order-details > table > tfoot:nth-child(4) > tr:nth-child(4) > td > span`)).first()).toContainText(`${vars.total ?? ''}`);
  await expect(page.locator(`.email > strong`).first()).toContainText(`${vars.email ?? ''}`);
  await expect(page.locator(`section.woocommerce-customer-details > address`).first()).toContainText(`${vars.company ?? ''}
${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.street ?? ''}
${vars.city ?? ''} ${vars.state ?? ''} ${vars.zipCode ?? ''}

${vars.phone ?? ''}

${vars.email ?? ''}`);
  await currencyChecker(page, vars);
}

// GI: "10 - Place order - New User - Discovery - Refund" (68ee4c90a5c7995601dc9736)
export async function _10PlaceOrderNewUserDiscoveryRefund(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.admin = `yes`;
  await adminLogin(page, vars);
  await page.locator(`a[href="admin.php?page=wc-admin"] > .wp-menu-name`).first().hover();
  await page.locator(`a[href="edit.php?post_type=shop_order"]`).or(page.locator(`a[href="admin.php?page=wc-orders"]`)).filter({ visible: true }).first().click({ force: true });
  await page.locator(`a[href*="/wp-admin/post.php?post=${vars.orderNumber ?? ''}&action=edit"] > strong`).or(page.locator(`a[href*="/wp-admin/admin.php?page=wc-orders&action=edit&id=${vars.orderNumber ?? ''}"] > strong`)).filter({ visible: true }).first().click({ force: true });
  await page.locator(`button[type="button"].button.refund-items`).filter({ visible: true }).first().click({ force: true });
  await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const quantityElements = Array.from<any>(document.querySelectorAll<HTMLTableRowElement>('tbody#order_line_items > tr > td.quantity > div.view'));
console.log('Found quantity elements:', quantityElements.length);

const quantities = [];

quantityElements.forEach((element, index) => {
    // Log raw content
    const text = element.textContent.trim();
    console.log(`Element ${index + 1} raw text: '${text}'`);
    
    // Try multiple extraction methods
    let qty;
    
    // Method 1: Original regex
    const match1 = text.match(/x\s*(\d+)/);
    if (match1 && match1[1]) {
        qty = parseInt(match1[1], 10);
        console.log(`Element ${index + 1} - Matched with regex 1: ${qty}`);
    } else {
        // Method 2: Simpler digit extraction
        const match2 = text.match(/\d+/);
        if (match2) {
            qty = parseInt(match2[0], 10);
            console.log(`Element ${index + 1} - Matched with regex 2: ${qty}`);
        }
    }
    
    if (qty !== undefined) {
        quantities.push(qty);
    } else {
        console.log(`Element ${index + 1} - No quantity extracted`);
    }
});

console.log('Extracted quantities:', quantities);

// Assign to refund inputs
const refundInputs = Array.from<any>(document.querySelectorAll<HTMLInputElement>('input[type="number"].refund_order_item_qty'));
console.log('Found refund inputs:', refundInputs.length);

refundInputs.forEach((input, index) => {
    if (index < quantities.length) {
        input.value = quantities[index];
        console.log(`Assigned ${quantities[index]} to refund input #${index + 1}`);
        
        // Trigger WooCommerce recalculation
        const event = new Event('change', { bubbles: true });
        input.dispatchEvent(event);
    }
}); }, vars);
  try { await page.locator(`#refund_reason`).first().fill(`Testing Refund`); } catch { await page.locator(`#refund_reason`).first().selectOption(`Testing Refund`); }
  await expect(page.locator(`button[type="button"].button.button-primary.do-api-refund > .wc-order-refund-amount > .woocommerce-Price-amount.amount`).first()).toContainText(`${vars.total ?? ''}`);
  await page.locator(`button[type="button"].button.button-primary.do-api-refund > .wc-order-refund-amount > .woocommerce-Price-amount.amount`).filter({ visible: true }).first().click({ force: true });
  await blockUI(page, vars);
  await expect(page.locator(`#select2-order_status-container`).first()).toContainText(`Refunded`);
  await expect(page.locator(`tr.refund > td.name`)).not.toHaveCount(0);
  await expect(page.locator(`tr.refund > td.line_cost > .view > .woocommerce-Price-amount.amount`).first()).toHaveText(`-${vars.total ?? ''}`);
  await expect(page.locator(`tr:nth-of-type(1) > td.total.refunded-total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.total ?? ''}`);
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); function checkRefundNote(note) {
    const total = `${vars.total}`.replace(/\$/g, '\\$');
    const pattern = new RegExp(`Refunded ${total} – Refund ID: re_[a-zA-Z0-9]+ – Reason: Testing Refund`);
    return pattern.test(note);
}


let note = document.querySelector('ul.order_notes > li:nth-of-type(2) > div > p').textContent

return checkRefundNote(note) }, vars)).toBeTruthy();
}

// GI: "10 - Place order - New User - Discovery - Refund Email" (68ee4c90a5c7995601dc9737)
export async function _10PlaceOrderNewUserDiscoveryRefundEmail(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.username = `${vars.email ?? ''}`;
  await extractUserFromEmail(page, vars);
  await page.locator(`xpath=//a[contains(text(), "has been refunded")]`).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`tfoot > tr > td.td > del`).or(page.locator(`tr.order-totals.order-totals-total.order-totals-last > td > del`)).first()).toHaveText(`${vars.total ?? ''}`);
  await expect(page.locator(`tfoot > tr > td.td > ins > .woocommerce-Price-amount.amount`).or(page.locator(`tr.order-totals.order-totals-total.order-totals-last > td > ins > span`)).first()).toHaveText(`${vars.Symbol ?? ''}0.00`);
}

// GI: "12 - Managed Hosting page" (68ee4c90a5c7995601dc9738)
export async function _12ManagedHostingPage(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.goto(`${vars.site ?? ''}product/managed-hosting/`);
  await page.waitForLoadState('load');
  {
    const _lbl = page.locator(`label[for="plan"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#plan`).filter({ visible: true }).first().click({ force: true }); }
  }
  {
    const _lbl = page.locator(`label[for="plan"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#plan`).filter({ visible: true }).first().click({ force: true }); }
  }
  try { await page.locator(`#plan`).first().fill(`Up to 500 orders per month`); } catch { await page.locator(`#plan`).first().selectOption(`Up to 500 orders per month`); }
  await currencyChecker(page, vars);
}
