// @ts-nocheck
// Auto-generated from Ghost Inspector suite: "Mood - Common steps"
// Review all TODOs before using in production.
import { expect, type Page } from '@playwright/test';
import { calculateSubtotal, currencyToNumber } from './common-steps-for-all-projects';

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

// GI: "Add product to Cart" (6447e1e3e36f7ecf09d6bfd5)
export async function addProductToCart(page: Page, vars: Record<string, string> = {}): Promise<void> {
  if ((() => { let variable = vars.variable
return variable === "yes" })()) {
    // ↓ 06 - Variable Product page
    // ↓ 04 - Shop page
    if ((() => { let upsell = vars.upsell
return upsell != "no" })()) {
      await page.locator(`button[name="age_gate[confirm]"][type="submit"].age-gate-submit-yes`).filter({ visible: true }).first().click({ force: true });
    }
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let width = window.innerWidth
return width <= 767 }, vars)) {
      await page.locator(`div.hamburg-bars`).filter({ visible: true }).first().click({ force: true });
    }
    await page.locator(`.hm-nav-shop > a[href*="/shop/"]`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    // ↑ end 04 - Shop page
    await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let product = document.querySelector<HTMLAnchorElement>("a.product_type_variable");
product.previousElementSibling.click(); }, vars);
    await closePopup(page, vars);
    await expect(page.locator(`span.stamped-product-reviews-badge`)).not.toHaveCount(0);
    await expect(page.locator(`section.Product_Reviews_Block`)).not.toHaveCount(0);
    // ↑ end 06 - Variable Product page
  }
  if ((() => { let variable = vars.variable
return variable === "yes" })()) {
    await selectVariables(page, vars);
  }
  if ((() => { let variable = vars.variable
return variable === "no" })()) {
    // ↓ 07 - Simple product page
    // ↓ 04 - Shop page
    if ((() => { let upsell = vars.upsell
return upsell != "no" })()) {
      await page.locator(`button[name="age_gate[confirm]"][type="submit"].age-gate-submit-yes`).filter({ visible: true }).first().click({ force: true });
    }
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let width = window.innerWidth
return width <= 767 }, vars)) {
      await page.locator(`div.hamburg-bars`).filter({ visible: true }).first().click({ force: true });
    }
    await page.locator(`.hm-nav-shop > a[href*="/shop/"]`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    // ↑ end 04 - Shop page
    await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let product = document.querySelector("li.product-type-simple");
product.firstElementChild.click(); }, vars);
    if ((() => { let upsell = vars.upsell
return upsell != "no" })()) {
      await closePopup(page, vars);
    }
    if ((() => { let upsell = vars.upsell
return upsell != "no" })()) {
      await expect(page.locator(`span.stamped-product-reviews-badge`)).not.toHaveCount(0);
    }
    if ((() => { let upsell = vars.upsell
return upsell != "no" })()) {
      await expect(page.locator(`section.Product_Reviews_Block`)).not.toHaveCount(0);
    }
    // ↑ end 07 - Simple product page
  }
  if ((() => { let variable = vars.variable
return variable === "yes" })()) {
    vars.unitPrice = ((await page.locator(`.woocommerce-variation-price > .price > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
  }
  if ((() => { let variable = vars.variable
return variable === "no" })()) {
    vars.unitPrice = ((await page.locator(`.Single_Product_Disc > .price > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
  }
  await currencyToNumber(page, vars);
  if ((() => { let shipping = vars.shipping
return shipping = "free" })()) {
    await calculateForFreeShipping(page, vars);
  }
  if ((() => { let shipping = vars.shipping
return shipping != "free" })()) {
    vars.qty = `1`;
  }
  try { await page.locator(`input[name="quantity"]`).first().fill(`${vars.qty ?? ''}`); } catch { await page.locator(`input[name="quantity"]`).first().selectOption(`${vars.qty ?? ''}`); }
  vars.prod_desc = ((await page.locator(`h1.product_title`).textContent()) ?? '').trim();
  if ((() => { let variable = vars.variable
return variable === "yes" })()) {
    vars.var = ((await page.locator(`.variations_form > .cartWrapper > .variations li:nth-of-type(${vars.n ?? ''}) > .variable-item-contents > .variable-item-span.variable-item-span-button`).textContent()) ?? '').trim();
  }
  await page.locator(`button[type="submit"]`).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`#cfw-side-cart-form`)).not.toHaveCount(0);
  if ((() => { let variable = vars.variable
return variable === "yes" })()) {
    await expect(page.locator(`.cfw-cart-item-title > a`).first()).toHaveText(`${vars.prod_desc ?? ''} - ${vars.var ?? ''}`);
  }
  if ((() => { let variable = vars.variable
return variable === "no" })()) {
    await expect(page.locator(`.cfw-cart-item-title > a`).first()).toHaveText(`${vars.prod_desc ?? ''}`);
  }
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return vars.qty == jQuery('tr.cart-item-row.cart_item > th.cfw-cart-item-description > .cfw_side_cart_item_after_data > .cfw-edit-item-quantity-control-wrap > .cfw-quantity-stepper > a[aria-label="Edit"].cfw-quantity-stepper-value-label.cfw-quantity-bulk-edit').text().trim(); }, vars)).toBeTruthy();
  await calculateSubtotal(page, vars);
  await expect(page.locator(`tr.cart-item-row.cart_item > td.cfw-cart-item-subtotal > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
  vars.prodPrice = `${vars.subtotalPrice ?? ''}`;
  await expect(page.locator(`tr.cart-subtotal > td > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
}

// GI: "calculate for Free Shipping" (6447d284e36f7ecf09d25df4)
export async function calculateForFreeShipping(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.qty = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let price = vars.price;
let qty = Math.ceil(99/price);
return qty }, vars);
}

// GI: "Check Email order" (64492700d19bd3b458584a68)
export async function checkEmailOrder(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.locator(`xpath=//a[contains(text(), "Your Hello Mood order has been received!")]`).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`td:nth-of-type(1) > h3`).first()).toHaveText(`Order number: ${vars.orderNumber ?? ''}`);
  await expect(page.locator(`tr.order_item:nth-of-type(1) > td.td:nth-of-type(1)`).first()).toContainText(`${vars.prod_desc ?? ''}`);
  if ((() => { let upsell = vars.upsell
return upsell != "yes" })()) {
    await expect(page.locator(`tr.order_item:nth-of-type(1) > td.td:nth-of-type(3) > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
  }
  if ((() => { let upsell = vars.upsell
return upsell === "yes" })()) {
    await expect(page.locator(`tr.order_item:nth-of-type(1) > td.td:nth-of-type(3) > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.prodPrice ?? ''}`);
  }
  if ((() => { let upsell = vars.upsell
return upsell === "yes" })()) {
    await expect(page.locator(`tr.order_item:nth-of-type(2) > td.td:nth-of-type(1)`).first()).toContainText(`${vars.prod_desc2 ?? ''}`);
  }
  if ((() => { let upsell = vars.upsell
return upsell === "yes" })()) {
    await expect(page.locator(`tr.order_item:nth-of-type(2) > td.td:nth-of-type(3) > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.unitPrice2 ?? ''}`);
  }
  await expect(page.locator(`td.td.tvalue-subtotal > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
  if ((() => { let upsell = vars.upsell
return upsell != "yes" })()) {
    await expect(page.locator(`td.td.tvalue-discount`).first()).toHaveText(`-${vars.discount ?? ''}`);
  }
  if ((() => { let upsell = vars.upsell
return upsell != "yes" })()) {
    await expect(page.locator(`td.td.tvalue-shipping`).first()).toContainText(`${vars.shippingPrice ?? ''}`);
  }
  if ((() => { let upsell = vars.upsell
return upsell === "yes" })()) {
    await expect(page.locator(`td.td.tvalue-shipping`).first()).toContainText(`Free`);
  }
  await expect(page.locator(`td.td.tvalue-salestax > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.taxPrice ?? ''}`);
  await expect(page.locator(`td.td.tvalue-total > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.total ?? ''}`);
  if ((() => { let upsell = vars.upsell
return upsell === "yes" })()) {
    await expect(page.locator(`td.address-container > address.address > table > tbody > tr > td.address-td`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.street ?? ''}
${vars.street2 ?? ''}
${vars.city ?? ''}, ${vars.state ?? ''} ${vars.zipCode ?? ''}

${vars.phone ?? ''}


${vars.email ?? ''}`);
  }
  if ((() => { let upsell = vars.upsell
return upsell != "yes" })()) {
    await expect(page.locator(`td.address-container > address.address > table > tbody > tr > td.address-td`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.street3 ?? ''}
${vars.street4 ?? ''}
${vars.city ?? ''}, ${vars.state ?? ''} ${vars.zipCode ?? ''}

${vars.phone ?? ''}


${vars.email ?? ''}`);
  }
  await expect(page.locator(`td:nth-of-type(2) > address.address > table > tbody > tr > td.address-td`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName2 ?? ''}
${vars.company2 ?? ''}
${vars.street3 ?? ''}
${vars.street4 ?? ''}
${vars.city ?? ''}, ${vars.state ?? ''} ${vars.zipCode ?? ''}

${vars.phone ?? ''}`);
}

// GI: "Check Thank you page and Order on My Account" (644926210b7aefb972691261)
export async function checkThankYouPageAndOrderOnMyAccount(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await expect(page.locator(`tr.cart-item-row:nth-of-type(1) > th.cfw-cart-item-description > .cfw-cart-item-title`).first()).toHaveText(`${vars.prod_desc ?? ''}`);
  await expect(page.locator(`tr.cart-item-row:nth-of-type(1) > td.cfw-cart-item-subtotal > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.prodPrice ?? ''}`);
  if ((() => { let upsell = vars.upsell
return upsell === "yes" })()) {
    await expect(page.locator(`tr.cart-item-row:nth-of-type(2) > th.cfw-cart-item-description > .cfw-cart-item-title`).first()).toContainText(`${vars.prod_desc2 ?? ''}`);
  }
  if ((() => { let upsell = vars.upsell
return upsell === "yes" })()) {
    await expect(page.locator(`tr.cart-item-row:nth-of-type(2) > td.cfw-cart-item-subtotal > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice2 ?? ''}`);
  }
  await expect(page.locator(`tr.cart-subtotal:nth-of-type(1) > td > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
  if ((() => { let upsell = vars.upsell
return upsell != "yes" })()) {
    await expect(page.locator(`tr.cart-subtotal:nth-of-type(2) > td > .woocommerce-Price-amount.amount > bdi`).first()).toContainText(`${vars.discount ?? ''}`);
  }
  if ((() => { let upsell = vars.upsell
return upsell === "yes" })()) {
    await expect(page.locator(`tr.cart-subtotal:nth-of-type(2) > td`).first()).toHaveText(`Free via USPS First-Class Mail®`);
  }
  if ((() => { let upsell = vars.upsell
return upsell === "yes" })()) {
    await expect(page.locator(`tr.cart-subtotal:nth-of-type(3) > td > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.taxPrice ?? ''}`);
  }
  if ((() => { let upsell = vars.upsell
return upsell != "yes" })()) {
    await expect(page.locator(`tr.cart-subtotal:nth-of-type(3) > td > .woocommerce-Price-amount.amount > bdi`).first()).toContainText(`${vars.shippingPrice ?? ''}`);
  }
  if ((() => { let upsell = vars.upsell
return upsell != "yes" })()) {
    await expect(page.locator(`tr.cart-subtotal:nth-of-type(4) > td > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.taxPrice ?? ''}`);
  }
  await expect(page.locator(`tr.cart-subtotal.order-total > td > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.total ?? ''}`);
  await expect(page.locator(`.inner > div.row:nth-of-type(1) > div:nth-of-type(1) > p`).first()).toContainText(`${vars.email ?? ''}`);
  await expect(page.locator(`div:nth-of-type(1) > address`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName2 ?? ''}
${vars.company2 ?? ''}
${vars.street3 ?? ''}
${vars.street4 ?? ''}
${vars.city ?? ''}, ${vars.state ?? ''} ${vars.zipCode ?? ''}`);
  if ((() => { let upsell = vars.upsell
return upsell === "yes" })()) {
    await expect(page.locator(`div:nth-of-type(2) > address`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.street ?? ''}
${vars.street2 ?? ''}
${vars.city ?? ''}, ${vars.state ?? ''} ${vars.zipCode ?? ''}`);
  }
  if ((() => { let upsell = vars.upsell
return upsell != "yes" })()) {
    await expect(page.locator(`div:nth-of-type(2) > address`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.street3 ?? ''}
${vars.street4 ?? ''}
${vars.city ?? ''}, ${vars.state ?? ''} ${vars.zipCode ?? ''}`);
  }
}

// GI: "close chat" (644a5d5aaf1e488d25e61046)
export async function closeChat(page: Page, vars: Record<string, string> = {}): Promise<void> {
  try {
    await page.locator(`iframe.intercom-borderless-frame #intercom-container-body`).first().hover();
  } catch { /* optional step: mouseOver */ }
  try {
    await page.locator(`iframe.intercom-borderless-frame div#intercom-container > div > div > div > div > div:nth-of-type(2) > span`).filter({ visible: true }).first().click({ force: true });
  } catch { /* optional step: click */ }
}

// GI: "close Popup" (6446b84be36f7ecf09a4d536)
export async function closePopup(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); var body = document.documentElement || document.body;
body.scrollTop = 2000; }, vars);
  await page.waitForTimeout(2000);
  try {
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return window.innerWidth === 360 }, vars)) {
      await page.locator(`button.needsclick.klaviyo-close-form`).filter({ visible: true }).first().click({ force: true });
    }
  } catch { /* optional step: click */ }
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return window.innerWidth === 1920 }, vars)) {
    await page.locator(`button.needsclick.klaviyo-close-form`).filter({ visible: true }).first().click({ force: true });
  }
}

// GI: "Select variables" (6447cd213a008cd31cc20868)
export async function selectVariables(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.n = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let select = Array.from<any>(document.querySelectorAll<HTMLButtonElement>(".variations_form > .cartWrapper .variations li.variable-item.button-variable-item"));
return Math.floor((Math.random()*select.length)+1) }, vars);
  await page.locator(`li:nth-of-type(${vars.n ?? ''}).variable-item.button-variable-item`).filter({ visible: true }).first().click({ force: true });
}
