// @ts-nocheck
// Auto-generated from Ghost Inspector suite: "Template WooCommerce Tests"
// Review all TODOs before using in production.
import { expect, type Page } from '@playwright/test';
import { blockUI, calculateSubtotal, checkOrderAndSubscriptionsOnMyAccount, checkOrderOnBackend, forgotPasswordFlow, login, logout, myAccountLinksAndLogout, placeOrderElement, register, renewByAdmin, shippingOnCart, wooCommerceCheckoutTemplate } from './common-steps-for-all-projects';

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

// GI: "01 - Home Page" (646b8d2a33135384bb052b2e)
export async function _01HomePage(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.waitForLoadState('load');
}

// GI: "02 - Shop Page" (646b8d2a33135384bb052b2f)
export async function _02ShopPage(page: Page, vars: Record<string, string> = {}): Promise<void> {
  if ((() => { let project = vars.project
return project !== "Phlearn" })()) {
    await page.locator(`a[href*="/shop/"]`).filter({ visible: true }).first().click({ force: true });
  }
  if ((() => { let project = vars.project
return project === "Phlearn" })()) {
    await page.locator(`a[href*="/subscribe/"]`).filter({ visible: true }).first().click({ force: true });
  }
  await page.waitForLoadState('load');
}

// GI: "03 - Simple Product Page" (646b8d2a33135384bb052b30)
export async function _03SimpleProductPage(page: Page, vars: Record<string, string> = {}): Promise<void> {
  if (vars.project !== "talkbox" && vars.project !== "leggari") {
    await _02ShopPage(page, vars);
  }
  if (vars.project !== "talkbox" && vars.project !== "icg" 
&& vars.project !== "leggari") {
    await page.locator(`li.product-type-simple > a[href*="/product/"] > img`).filter({ visible: true }).first().click({ force: true });
  }
  if (vars.project == "icg") {
    await page.locator(`div.trade-product__title > h3 > a[href*="/product/"]`).filter({ visible: true }).first().click({ force: true });
  }
  if (vars.project == "icg") {
    await page.reload();
    await page.waitForLoadState('load');
  }
  if (vars.project === "talkbox") {
    await page.locator(`#site-navigation > div > ul > li:nth-child(2)`).filter({ visible: true }).first().click({ force: true });
  }
  try {
    if (vars.project === "talkbox") {
      await page.locator(`div > div:nth-child(2) > div > div > div > div > div > div > a.kb-button`).filter({ visible: true }).first().click({ force: true });
    }
  } catch { /* optional step: click */ }
  await page.waitForLoadState('load');
  vars.prod_desc = ((await page.locator(`h1.product_title`).or(page.locator(`h3.product_title`)).or(page.locator(`p > mark.has-inline-color > em`)).textContent()) ?? '').trim();
  if (vars.project == "icg") {
    vars.prod_desc = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let prod_desc = `${vars.prod_desc}`
prod_desc = prod_desc.replace(/–/g, "-");
return prod_desc }, vars);
  }
  if (vars.project !== "icg" && vars.project != "talkbox") {
    vars.unitPrice = ((await page.locator(`div.summary > p.price > ins > .woocommerce-Price-amount.amount > bdi`).or(page.locator(`div.summary > p.price > .woocommerce-Price-amount.amount > bdi`)).or(page.locator(`div.summary > p.price > span > ins > .woocommerce-Price-amount.amount > bdi`)).or(page.locator(`div.summary > p.price > span > .woocommerce-Price-amount.amount > bdi`)).textContent()) ?? '').trim();
  }
  if (vars.project == "icg") {
    vars.unitPrice = ((await page.locator(`.icg-price > .woocommerce-Price-amount.amount`).textContent()) ?? '').trim();
  }
  if (vars.project === "talkbox") {
    vars.unitPrice = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let price = document.querySelector('h2 > strong > mark.has-inline-color').textContent
price = price.slice(0,3)
return price }, vars);
  }
}

// GI: "04 - Variable Product Page" (646b929c33135384bb067ba6)
export async function _04VariableProductPage(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await _02ShopPage(page, vars);
  await page.locator(`li.product-type-variable > a[href*="/product/"] > img`).filter({ visible: true }).first().click({ force: true });
  await page.waitForLoadState('load');
  try { await page.locator(`tr:nth-of-type(1) > td.value > select`).first().fill(`S`); } catch { await page.locator(`tr:nth-of-type(1) > td.value > select`).first().selectOption(`S`); }
  vars.variable1 = ((await page.locator(`tr:nth-of-type(1) > td.value > select`).textContent()) ?? '').trim();
  vars.prod_desc = ((await page.locator(`h1.product_title`).textContent()) ?? '').trim();
  vars.unitPrice = ((await page.locator(`div.woocommerce-variation-price > .price > ins > .woocommerce-Price-amount.amount > bdi`).or(page.locator(`div.woocommerce-variation-price > .price > .woocommerce-Price-amount.amount > bdi`)).textContent()) ?? '').trim();
}

// GI: "05 - Simple Subscription Product Page" (646e091233135384bb9bf24c)
export async function _05SimpleSubscriptionProductPage(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await _02ShopPage(page, vars);
  if ((() => { let project = vars.project
return project !== "Phlearn" })()) {
    await page.locator(`li.product-type-subscription > a[href*="/product/"] > img`).filter({ visible: true }).first().click({ force: true });
  }
  if ((() => { let project = vars.project
return project === "Phlearn" })()) {
    await page.locator(`a[href="#subscriptions-link"][title="Join PHLEARN PRO"]`).filter({ visible: true }).first().click({ force: true });
  }
  await page.waitForLoadState('load');
  if ((() => { let project = vars.project
return project !== "Phlearn" })()) {
    vars.prod_desc = ((await page.locator(`h1.product_title`).textContent()) ?? '').trim();
  }
  if ((() => { let project = vars.project
return project !== "Phlearn" })()) {
    vars.prod_desc = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let desc = `${vars.prod_desc}`
desc = desc.replace("–","-")
return desc }, vars);
  }
  if ((() => { let project = vars.project
return project !== "Phlearn" })()) {
    vars.unitPrice = ((await page.locator(`div.summary > p.price > ins > .woocommerce-Price-amount.amount > bdi`).or(page.locator(`div.summary > p.price > .woocommerce-Price-amount.amount > bdi`)).textContent()) ?? '').trim();
  }
  try {
    if ((() => { let project = vars.project
return project !== "Phlearn" })()) {
      vars.SignUpFee = ((await page.locator(`div.summary .subscription-details > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
    }
  } catch { /* optional step: extract */ }
}

// GI: "06 - Variable Subscription Product Page" (646e0912cc654ac751c1d3b5)
export async function _06VariableSubscriptionProductPage(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await _02ShopPage(page, vars);
  await page.locator(`li.product-type-variable-subscription > a[href*="/product/"] > img`).filter({ visible: true }).first().click({ force: true });
  await page.waitForLoadState('load');
  try { await page.locator(`tr:nth-of-type(1) > td.value > select`).first().fill(`Gold`); } catch { await page.locator(`tr:nth-of-type(1) > td.value > select`).first().selectOption(`Gold`); }
  try { await page.locator(`tr:nth-of-type(2) > td.value > select`).first().fill(`Week`); } catch { await page.locator(`tr:nth-of-type(2) > td.value > select`).first().selectOption(`Week`); }
  vars.variable1 = ((await page.locator(`tr:nth-of-type(1) > td.value > select`).textContent()) ?? '').trim();
  vars.variable2 = ((await page.locator(`tr:nth-of-type(2) > td.value > select`).textContent()) ?? '').trim();
  vars.prod_desc = ((await page.locator(`h1.product_title`).textContent()) ?? '').trim();
  vars.unitPrice = ((await page.locator(`div.woocommerce-variation-price > .price > ins > .woocommerce-Price-amount.amount > bdi`).or(page.locator(`div.woocommerce-variation-price > .price > .woocommerce-Price-amount.amount > bdi`)).textContent()) ?? '').trim();
  try {
    vars.SignUpFee = ((await page.locator(`.subscription-details > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
  } catch { /* optional step: extract */ }
}

// GI: "07 - Cart Page" (646b8d2a33135384bb052b31)
export async function _07CartPage(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.qty = `2`;
  await _03SimpleProductPage(page, vars);
  try { await page.locator(`input[name="quantity"]`).first().fill(`${vars.qty ?? ''}`); } catch { await page.locator(`input[name="quantity"]`).first().selectOption(`${vars.qty ?? ''}`); }
  await page.locator(`button[name="add-to-cart"]`).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`.woocommerce-message`).first()).toContainText(`${vars.qty ?? ''} × “${vars.prod_desc ?? ''}” have been added to your cart.`);
  if ("hunchie" !== "hunchie") {
    await page.locator(`a[href*="/cart/"]`).filter({ visible: true }).first().click({ force: true });
  }
  await page.waitForLoadState('load');
  await shippingOnCart(page, vars);
  await expect(page.locator(`td.product-name > a[href*="/product/"]`).first()).toContainText(`${vars.prod_desc ?? ''}`);
  await expect(page.locator(`td.product-price > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
  await expect(page.locator(`div.quantity > .qty`).first()).toHaveText(`${vars.qty ?? ''}`);
  vars.subtotalPrice = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let unitPrice = `${vars.unitPrice}`
unitPrice = unitPrice.replace(`${vars.Symbol}`,"").trim();
let qty = vars.qty
let subtotal = unitPrice * qty
return `${vars.Symbol}`+(Math.round(subtotal*100)/100).toFixed(2) }, vars);
  await expect(page.locator(`td.product-subtotal > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
  await expect(page.locator(`tr.cart-subtotal > td > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
  vars.shippingPrice = ((await page.locator(`li:nth-of-type(1) > label > .woocommerce-Price-amount.amount > bdi`).or(page.locator(`li:nth-of-type(1) > label`)).textContent()) ?? '').trim();
  vars.taxPrice = ((await page.locator(`tr.tax-rate > td > span.woocommerce-Price-amount.amount`).or(page.locator(`tr.tax-total > td > span.woocommerce-Price-amount.amount`)).textContent()) ?? '').trim();
  vars.total = ((await page.locator(`strong > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
}

// GI: "08 - Checkout page" (646b8d2a33135384bb052b32)
export async function _08CheckoutPage(page: Page, vars: Record<string, string> = {}): Promise<void> {
  if (vars.project !== "icg") {
    await _07CartPage(page, vars);
  }
  if (vars.project == "icg") {
    await _03SimpleProductPage(page, vars);
  }
  if (vars.project == "icg") {
    try { await page.locator(`div.quantity > input[type='number']`).first().fill(`${vars.qty ?? ''}`); } catch { await page.locator(`div.quantity > input[type='number']`).first().selectOption(`${vars.qty ?? ''}`); }
  }
  if (vars.project == "icg") {
    await page.locator(`button[name="add-to-cart"]`).filter({ visible: true }).first().click({ force: true });
  }
  if (vars.project == "icg") {
    await calculateSubtotal(page, vars);
  }
  if (vars.project == "icg") {
    await expect(page.locator(`a[href="#cart"] > .header-cart-total.header-cart-is-empty-false > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
  }
  if (vars.project == "icg") {
    await page.locator(`a[href="#cart"] > .header-cart-total.header-cart-is-empty-false > .woocommerce-Price-amount.amount`).first().hover();
  }
  if (vars.project == "icg") {
    await expect(page.locator(`.menu-item > .kadence-mini-cart-refresh > .woocommerce-mini-cart.cart_list.product_list_widget > .woocommerce-mini-cart-item.mini_cart_item > .quantity`).first()).toHaveText(`${vars.qty ?? ''} × ${vars.unitPrice ?? ''}`);
  }
  if (vars.project == "icg") {
    await page.locator(`.menu-item > .kadence-mini-cart-refresh > .woocommerce-mini-cart__buttons.buttons > a[href*="/checkout/"].button.checkout.wc-forward.js-icg-front-end-view-cart`).filter({ visible: true }).first().click({ force: true });
  }
  if (vars.project !== "icg") {
    await page.locator(`a[href*="/checkout/"].checkout-button`).filter({ visible: true }).first().click({ force: true });
  }
  if (vars.project !== "icg") {
    await expect(page.locator(`h1.entry-title`).first()).toContainText(`Checkout`);
  }
  if (vars.project !== "icg") {
    await expect(page.locator(`td.product-name`).first()).toHaveText(`${vars.prod_desc ?? ''}  × ${vars.qty ?? ''}`);
  }
  if (vars.project == "icg") {
    await expect(page.locator(`iframe#wcp-checkout-iframe td.product-name`).first()).toHaveText(`${vars.prod_desc ?? ''} 
${vars.qty ?? ''} x ${vars.unitPrice ?? ''}`);
  }
  await expect(page.locator(`td.product-total > .woocommerce-Price-amount.amount > bdi`).or(page.locator(`iframe#wcp-checkout-iframe td.product-total > .icg-price-cart > .woocommerce-Price-amount.amount > bdi`)).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
  await expect(page.locator(`tr.cart-subtotal > td > .woocommerce-Price-amount.amount > bdi`).or(page.locator(`iframe#wcp-checkout-iframe tr.cart-subtotal > td > .woocommerce-Price-amount.amount > bdi`)).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
  if (vars.project !== "icg") {
    await expect(page.locator(`ul#shipping_method > li:nth-of-type(1) > label > .woocommerce-Price-amount.amount > bdi`).or(page.locator(`ul#shipping_method > li:nth-of-type(1) > label`)).first()).toHaveText(`${vars.shippingPrice ?? ''}`);
  }
  if (vars.project == "icg") {
    vars.shippingPrice = ((await page.locator(`iframe#wcp-checkout-iframe ul#shipping_method > li:nth-of-type(1) > label > .woocommerce-Price-amount.amount > bdi`).or(page.locator(`iframe#wcp-checkout-iframe ul#shipping_method > li:nth-of-type(1) > label`)).textContent()) ?? '').trim();
  }
  if (vars.project !== "icg") {
    await expect(page.locator(`tr.tax-rate > td > .woocommerce-Price-amount.amount`).or(page.locator(`tr.tax-total > td > .woocommerce-Price-amount.amount`)).first()).toHaveText(`${vars.taxPrice ?? ''}`);
  }
  if (vars.project !== "icg") {
    await expect(page.locator(`strong > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.total ?? ''}`);
  }
  if (vars.project == "icg") {
    vars.total = ((await page.locator(`iframe#wcp-checkout-iframe strong > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
  }
}

// GI: "09 - Place order - 02 - Backend" (646cae9033135384bb42d5bb)
export async function _09PlaceOrder02Backend(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.admin = `yes`;
  vars.username = `${vars.adminUser ?? ''}`;
  vars.pass = `${vars.adminPass ?? ''}`;
  await login(page, vars);
  await checkOrderOnBackend(page, vars);
}

// GI: "09 - Place order - 03 - logged User variable product" (646bde7ccc654ac7513713b1)
export async function _09PlaceOrder03LoggedUserVariableProduct(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.user = `old`;
  vars.variable = `yes`;
  await _04VariableProductPage(page, vars);
  vars.username = `${vars.email ?? ''}`;
  try { await page.locator(`input[name="quantity"]`).first().fill(`${vars.qty ?? ''}`); } catch { await page.locator(`input[name="quantity"]`).first().selectOption(`${vars.qty ?? ''}`); }
  await page.locator(`button[type="submit"].single_add_to_cart_button`).filter({ visible: true }).first().click({ force: true });
  await page.locator(`a[href*="/cart/"]`).filter({ visible: true }).first().click({ force: true });
  await page.locator(`a[href*="/checkout/"].checkout-button`).filter({ visible: true }).first().click({ force: true });
  await page.locator(`div.woocommerce-form-login-toggle > div > a`).filter({ visible: true }).first().click({ force: true });
  try { await page.locator(`form.woocommerce-form.woocommerce-form-login.login #password`).first().fill(`${vars.password ?? ''}`); } catch { await page.locator(`form.woocommerce-form.woocommerce-form-login.login #password`).first().selectOption(`${vars.password ?? ''}`); }
  try { await page.locator(`form.woocommerce-form.woocommerce-form-login.login #username`).first().fill(`${vars.email ?? ''}`); } catch { await page.locator(`form.woocommerce-form.woocommerce-form-login.login #username`).first().selectOption(`${vars.email ?? ''}`); }
  await page.locator(`button[type="submit"].woocommerce-form-login__submit`).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`td.product-name`).first()).toHaveText(`${vars.prod_desc ?? ''} - ${vars.variable1 ?? ''}  × ${vars.qty ?? ''}`);
  vars.subtotalPrice = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let unitPrice = `${vars.unitPrice}`
unitPrice = unitPrice.replace(`${vars.Symbol}`,"").trim();
let qty = vars.qty
let subtotal = unitPrice * qty
return `${vars.Symbol}`+(Math.round(subtotal*100)/100).toFixed(2) }, vars);
  await expect(page.locator(`td.product-total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
  await expect(page.locator(`tr.cart-subtotal > td > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
  vars.shippingPrice = ((await page.locator(`li:nth-of-type(1) > label > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
  vars.taxPrice = ((await page.locator(`tr.tax-rate > td > .woocommerce-Price-amount.amount`).textContent()) ?? '').trim();
  vars.total = ((await page.locator(`strong > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let unit = `${vars.subtotalPrice}`;
let shipping = `${vars.shippingPrice}`;
let discount = `${vars.discount}`
if (discount === ""){
    discount = "0.00";
};
if (shipping.includes("Free") || shipping.includes("Lettermail (untracked)")){
    shipping = "0.00";
};
let tax = `${vars.taxPrice}`;
if (tax === ""){
    tax = "0.00";
};
let total = `${vars.total}`;

unit = unit.replace(",","");
discount = discount.replace(",","");
shipping = shipping.replace(",","");
tax = tax.replace(",","");
total = total.replace(",","");

unit = Number(unit.replace(`${vars.Symbol}`,""));
discount = Number(discount.replace(`${vars.Symbol}`,""));
shipping = Number(shipping.replace(`${vars.Symbol}`,""));
tax = Number(tax.replace(`${vars.Symbol}`,""));
total = Number(total.replace(`${vars.Symbol}`,""));

let total2 = unit-discount+shipping+tax;
total2 = Number(total2.toFixed(2));

return total === total2 }, vars)).toBeTruthy();
  await placeOrderElement(page, vars);
  await blockUI(page, vars);
  await page.waitForLoadState('load');
  await checkOrderAndSubscriptionsOnMyAccount(page, vars);
}

// GI: "10 - Place order - 01 - New User subscription product" (646e0f2dcc654ac751c4ec3b)
export async function _10PlaceOrder01NewUserSubscriptionProduct(page: Page, vars: Record<string, string> = {}): Promise<void> {
  if ((() => { let project = vars.project
return project !== "talkbox" })()) {
    vars.email = `qa+gi_subs_${vars.alphanumeric ?? ''}@saucal.com`;
  }
  if ((() => { let project = vars.project
return project !== "talkbox" })()) {
    vars.unitPrice = ``;
  }
  if ((() => { let project = vars.project
return project !== "talkbox" })()) {
    vars.subtotalPrice = ``;
  }
  if ((() => { let project = vars.project
return project !== "talkbox" })()) {
    vars.shippingPrice = ``;
  }
  if ((() => { let project = vars.project
return project !== "talkbox" })()) {
    vars.taxPrice = ``;
  }
  if ((() => { let project = vars.project
return project !== "talkbox" })()) {
    vars.total = ``;
  }
  vars.qty = `1`;
  vars.variable = `no`;
  vars.subscription = `yes`;
  vars.user = `new`;
  if ((() => { let project = vars.project
return project === "template" })()) {
    await _05SimpleSubscriptionProductPage(page, vars);
  }
  if ((() => { let project = vars.project
return project === "nopong" })()) {
    await page.locator(`#menu-main-menu > li.menu-item.menu-item-type-post_type.menu-item-object-page:nth-of-type(5) > a[href*="/monthly-club/"]`).filter({ visible: true }).first().click({ force: true });
  }
  if ((() => { let project = vars.project
return project === "nopong" })()) {
    await page.waitForLoadState('load');
  }
  if ((() => { let project = vars.project
return project === "nopong" })()) {
    vars.prod_desc = ((await page.locator(`li:nth-child(1) div.wc-block-grid__product-title`).textContent()) ?? '').trim();
  }
  if ((() => { let project = vars.project
return project === "nopong" })()) {
    vars.unitPrice = ((await page.locator(`li:nth-child(1) > div.wc-block-grid__product-price.price > span.woocommerce-Price-amount.amount`).textContent()) ?? '').trim();
  }
  if ((() => { let project = vars.project
return project === "nopong" })()) {
    vars.signUpFee = ((await page.locator(`li:nth-of-type(1) > .price > span.subscription-details > .woocommerce-Price-amount`).textContent()) ?? '').trim();
  }
  if ((() => { let project = vars.project
return project === "nopong" })()) {
    await page.locator(`li:nth-of-type(1) a[href*="?add-to-cart="]`).filter({ visible: true }).first().click({ force: true });
  }
  if ((() => { let project = vars.project
return project === "nopong" })()) {
    vars.subtotalPrice = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let unitPrice = `${vars.unitPrice}`
let signUp = `${vars.signUpFee}`
unitPrice = unitPrice.replace(`${vars.Symbol}`,"").trim();
signUp = signUp.replace(`${vars.Symbol}`,"").trim();
let qty = vars.qty
let subtotal = (unitPrice+signUp) * qty
return `${vars.Symbol}`+(Math.round(subtotal*100)/100).toFixed(2) }, vars);
  }
  if ((() => { let project = vars.project
return project === "template" })()) {
    try { await page.locator(`input[name="quantity"]`).first().fill(`${vars.qty ?? ''}`); } catch { await page.locator(`input[name="quantity"]`).first().selectOption(`${vars.qty ?? ''}`); }
  }
  if ((() => { let project = vars.project
return project === "template" })()) {
    await page.locator(`button[name="add-to-cart"]`).filter({ visible: true }).first().click({ force: true });
  }
  if ((() => { let project = vars.project
return project === "template" })()) {
    await page.locator(`a[href*="/cart/"]`).filter({ visible: true }).first().click({ force: true });
  }
  if ((() => { let project = vars.project
return project === "nopong" })()) {
    await page.locator(`a[href*="/checkout/"].checkout-button`).or(page.locator(`a[href*="/check-out/"].checkout-button`)).filter({ visible: true }).first().click({ force: true });
  }
  if ((() => { let project = vars.project
return project === "talkbox" || project === "nopong" })()) {
    await blockUI(page, vars);
  }
  if ((() => { let project = vars.project
return project === "talkbox" || project === "nopong" })()) {
    await placeOrderElement(page, vars);
  }
  if ((() => { let project = vars.project
return project === "talkbox" })()) {
    await blockUI(page, vars);
  }
  if ((() => { let project = vars.project
return project === "talkbox" })()) {
    await blockUI(page, vars);
  }
  if ((() => { let project = vars.project
return project === "nopong" })()) {
    await blockUI(page, vars);
  }
  if ((() => { let project = vars.project
return project === "nopong" })()) {
    await expect(page.locator(`.woocommerce-error > li`).first()).toHaveText(`Your card number is incomplete.`);
  }
  try { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="number"]`).first().fill(`4242 4242 4242 4242`); } catch { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="number"]`).first().selectOption(`4242 4242 4242 4242`); }
  try { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="expiry"]`).first().fill(`12 / 26`); } catch { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="expiry"]`).first().selectOption(`12 / 26`); }
  try { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="cvc"]`).first().fill(`123`); } catch { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="cvc"]`).first().selectOption(`123`); }
  if ((() => { let project = vars.project
return project === "talkbox" })()) {
    {
      const _lbl = page.locator(`label[for="ship-to-different-address-checkbox"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#ship-to-different-address-checkbox`).filter({ visible: true }).first().click({ force: true }); }
    }
  }
  if ((() => { let project = vars.project
return project === "talkbox" || project === "nopong" })()) {
    await placeOrderElement(page, vars);
  }
  if ((() => { let project = vars.project
return project === "talkbox" || project === "nopong" })()) {
    await blockUI(page, vars);
  }
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let width = window.innerWidth
let project = `${vars.project}`
return width === 1920 && project === "talkbox" }, vars)) {
    await expect(page.locator(`.wc-block-components-notice-banner.is-error`).or(page.locator(`.woocommerce-error`)).first()).toHaveText(`Invalid recurring shipping method.
Billing First Name is a required field.
Billing Last Name is a required field.
Billing Email Address is a required field.
Billing Phone Number for Delivery is a required field.
Billing Address is a required field.
Billing Town / City is a required field.
Billing State is a required field.
Billing ZIP is a required field.
Shipping First Name is a required field.
Shipping Last Name is a required field.
Shipping Address is a required field.
Shipping Town / City is a required field.
Shipping State is a required field.
Shipping ZIP is a required field.
Please read and accept the terms and conditions to proceed with your order.`);
  }
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let width = window.innerWidth
let project = `${vars.project}`
return width === 360 && project === "talkbox" }, vars)) {
    await expect(page.locator(`.wc-block-components-notice-banner.is-error`).or(page.locator(`.woocommerce-error`)).first()).toHaveText(`Invalid recurring shipping method.
Billing First Name is a required field.
Billing Last Name is a required field.
Billing Email Address is a required field.
Billing Phone Number for Delivery is a required field.
Billing Address is a required field.
Billing Town / City is a required field.
Billing State is a required field.
Billing ZIP is a required field.
Shipping First Name is a required field.
Shipping Last Name is a required field.
Shipping Address is a required field.
Shipping Town / City is a required field.
Shipping State is a required field.
Shipping ZIP is a required field.
Please read and accept the terms and conditions to proceed with your order.`);
  }
  await wooCommerceCheckoutTemplate(page, vars);
  await placeOrderElement(page, vars);
  await blockUI(page, vars);
  if ((() => { let project = vars.project
return project === "talkbox" })()) {
    await blockUI(page, vars);
  }
  await page.waitForLoadState('load');
  if ((() => { let project = vars.project
return project === "talkbox" })()) {
    await expect(page.locator(`h3.wp-block-kadence-advancedheading`).first()).toHaveText(`CONGRATULATIONS, ${vars.firstName ?? ''}!`);
  }
  await checkOrderAndSubscriptionsOnMyAccount(page, vars);
}

// GI: "10 - Place order - 02 - Renew + BackEnd" (646e3557cc654ac751d2888b)
export async function _10PlaceOrder02RenewBackEnd(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.admin = `yes`;
  vars.username = `${vars.admin_user ?? ''}`;
  vars.pass = `${vars.admin_pass ?? ''}`;
  await login(page, vars);
  vars.stagingMode = ((await page.locator(`a[href="edit.php?post_type=shop_subscription"]`).textContent()) ?? '').trim();
  await page.locator(`a[href="admin.php?page=wc-admin"] > .wp-menu-name`).filter({ visible: true }).first().click({ force: true });
  await page.locator(`a[href="edit.php?post_type=shop_order"]`).filter({ visible: true }).first().click({ force: true });
  await page.locator(`a[href*="/wp-admin/post.php?post=${vars.orderNumber ?? ''}&action=edit"] > strong`).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`.woocommerce-order-data__meta`).first()).toContainText(`Payment via Card`);
  await expect(page.locator(`#select2-order_status-container`).first()).toContainText(`Processing`);
  await expect(page.locator(`.wc-order-data-row.wc-order-totals-items > table.wc-order-totals:nth-of-type(1) > tbody > tr:nth-of-type(1) > td.total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
  if (vars.project !== "talkbox") {
    await expect(page.locator(`.wc-order-data-row.wc-order-totals-items > table.wc-order-totals:nth-of-type(1) > tbody > tr:nth-of-type(2) > td.total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.taxPrice ?? ''}`);
  }
  if (vars.project !== "talkbox") {
    await expect(page.locator(`.wc-order-data-row.wc-order-totals-items > table.wc-order-totals:nth-of-type(1) > tbody > tr:nth-of-type(3) > td.total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.total ?? ''}`);
  }
  if (vars.project === "talkbox") {
    await expect(page.locator(`.wc-order-data-row.wc-order-totals-items > table.wc-order-totals:nth-of-type(1) > tbody > tr:nth-of-type(6) > td.total > .woocommerce-Price-amount.amount > bdi`).or(page.locator(`table.wc-order-totals:nth-child(4) > tbody > tr > td.total > span > bdi`)).first()).toHaveText(`${vars.total ?? ''}`);
  }
  if (vars.project !== "talkbox") {
    await expect(page.locator(`td:nth-of-type(5) > .amount`).first()).toHaveText(`${vars.recurringTotal ?? ''} / week`);
  }
  if (vars.project === "talkbox") {
    await expect(page.locator(`tr:nth-of-type(1) td:nth-of-type(5) > .amount`).first()).toHaveText(`${vars.recurringTotal ?? ''} every 8 months`);
  }
  await renewByAdmin(page, vars);
  await page.locator(`a[href*="/wp-admin/post.php?post=${vars.renewID ?? ''}&action=edit"]`).filter({ visible: true }).first().click({ force: true });
  if ((() => { let staging = vars.stagingMode
return false === staging.includes("staging") })()) {
    await expect(page.locator(`.woocommerce-order-data__meta`).first()).toContainText(`Payment via Credit Card`);
  }
  if ((() => { let staging = vars.stagingMode
return false === staging.includes("staging") })()) {
    await expect(page.locator(`#select2-order_status-container`).first()).toContainText(`Completed`);
  }
  if ((() => { let staging = vars.stagingMode
return staging.includes("staging") &&vars.project !== "talkbox" })()) {
    await expect(page.locator(`#select2-order_status-container`).first()).toContainText(`Pending payment`);
  }
  if ((() => { let staging = vars.stagingMode
return staging.includes("staging")  && vars.project == "talkbox" })()) {
    await expect(page.locator(`#select2-order_status-container`).first()).toContainText(`Processing`);
  }
  if (vars.project !== "talkbox") {
    await expect(page.locator(`.wc-order-data-row.wc-order-totals-items > table.wc-order-totals:nth-of-type(1) > tbody > tr:nth-of-type(1) > td.total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
  }
  if (vars.project !== "talkbox") {
    await expect(page.locator(`.wc-order-data-row.wc-order-totals-items > table.wc-order-totals:nth-of-type(1) > tbody > tr:nth-of-type(2) > td.total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.recurringTax ?? ''}`);
  }
  if (vars.project !== "talkbox") {
    await expect(page.locator(`.wc-order-data-row.wc-order-totals-items > table.wc-order-totals:nth-of-type(1) > tbody > tr:nth-of-type(3) > td.total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.recurringTotal ?? ''}`);
  }
  if (vars.project == "talkbox") {
    await expect(page.locator(`.wc-order-data-row.wc-order-totals-items > table.wc-order-totals:nth-of-type(1) > tbody > tr:nth-of-type(4) > td.total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`$0.00`);
  }
}

// GI: "10 - Registration, My Account links and Login" (646b8d2a33135384bb052b34)
export async function _10RegistrationMyAccountLinksAndLogin(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.admin = `no`;
  if (vars.project !== "hunchie") {
    vars.username = `${vars.emailReg ?? ''}`;
  }
  if (vars.project === "hunchie") {
    vars.username = `${vars.email ?? ''}`;
  }
  vars.pass = `${vars.password ?? ''}`;
  if (vars.project !== "hunchie") {
    await register(page, vars);
  }
  if (vars.project === "hunchie") {
    await login(page, vars);
  }
  await myAccountLinksAndLogout(page, vars);
  if (vars.project !== "hunchie") {
    await login(page, vars);
  }
}

// GI: "11 - “Forgot password?” flow" (646b8d2a33135384bb052b35)
export async function _11ForgotPasswordFlow(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.pass = `${vars.password ?? ''}`;
  if (vars.project !== "hunchie") {
    vars.username = `${vars.emailForgot ?? ''}`;
  }
  if (vars.project === "hunchie") {
    vars.username = `${vars.email ?? ''}`;
  }
  if (vars.project !== "hunchie") {
    await register(page, vars);
  }
  if (vars.project !== "hunchie") {
    await logout(page, vars);
  }
  await forgotPasswordFlow(page, vars);
  vars.pass = `${vars.password2 ?? ''}`;
  await login(page, vars);
}
