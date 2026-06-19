// @ts-nocheck
// Auto-generated from Ghost Inspector suite: "BlueSnap - Common Steps for suites"
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

// GI: "3ds" (620bf92bd6344e0e7410aa98)
export async function _3ds(page: Page, vars: Record<string, string> = {}): Promise<void> {
  try { await page.locator(`iframe[name*='cardinal-stepUpIframe']`).first().contentFrame().locator(`iframe#cardinal-step-up-iframe  form > input.input-field`).first().fill(`1234`); } catch { await page.locator(`iframe[name*='cardinal-stepUpIframe']`).first().contentFrame().locator(`iframe#cardinal-step-up-iframe  form > input.input-field`).first().selectOption(`1234`); }
  {
    let _ok = false;
    if (!_ok) { try { await page.locator(`iframe[name*='cardinal-stepUpIframe']`).first().contentFrame().locator(`iframe#cardinal-step-up-iframe  form > input.button.primary`).first().click({ force: true }); _ok = true; } catch {} }
    if (!_ok) throw new Error('No clickable candidate matched');
  }
}

// GI: "Activate PayPal" (64f5cc315e52a69a752ed5a1)
export async function activatePayPal(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.pluginLog = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return new Promise(function (resolve, reject) {
  const username = "demouser"; 
  const password = `${vars.wp_api_pass}`; 
  const url = `${vars.startUrl}wp-json/wp/v2/plugins/woocommerce-paypal-payments/woocommerce-paypal-payments?status=active`;
  let headers = new Headers();
  headers.set('Content-Type', 'application/json');
  headers.set('Authorization', 'Basic ' + btoa(username + ":" + password));
  fetch(url, {method:'POST',
      headers: headers, credentials: 'omit'
      })
  .then(function(response) {
    if (response.ok) {
    resolve(response.json())
    } else {
    reject(new Error('error'))
    } 
  })
}) }, vars);
}

// GI: "Activate Pre order" (65410a804ee1df25e0cf0b12)
export async function activatePreOrder(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.pluginLog = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return new Promise(function (resolve, reject) {
  const username = "demouser"; 
  const password = `${vars.wp_api_pass}`; 
  const url = `${vars.startUrl}wp-json/wp/v2/plugins/woocommerce-pre-orders/woocommerce-pre-orders?status=active`;
  let headers = new Headers();
  headers.set('Content-Type', 'application/json');
  headers.set('Authorization', 'Basic ' + btoa(username + ":" + password));
  fetch(url, {method:'POST',
      headers: headers, credentials: 'omit'
      })
  .then(function(response) {
    if (response.ok) {
    resolve(response.json())
    } else {
    reject(new Error('error'))
    } 
  })
}) }, vars);
}

// GI: "Activate Pre-order" (65cb952cf59aa2b4f322819e)
export async function activatePreOrder(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.pluginLog = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return new Promise(function (resolve, reject) {
  const username = "demouser"; 
  const password = `${vars.wp_api_pass}`; 
  const url = `${vars.startUrl}wp-json/wp/v2/plugins/woocommerce-pre-orders/woocommerce-pre-orders?status=active`;
  let headers = new Headers();
  headers.set('Content-Type', 'application/json');
  headers.set('Authorization', 'Basic ' + btoa(username + ":" + password));
  fetch(url, {method:'POST',
      headers: headers, credentials: 'omit'
      })
  .then(function(response) {
    if (response.ok) {
    resolve(response.json())
    } else {
    reject(new Error('error'))
    } 
  })
}) }, vars);
}

// GI: "add coupon" (6365216d151ae3d9c5a8e127)
export async function addCoupon(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.locator(`xpath=//a[contains(text(), "Click here to enter your code")]`).or(page.locator(`.woocommerce-form-coupon-toggle > .woocommerce-info > a[href="#"]`)).or(page.locator(`div.wp-block-woocommerce-checkout-order-summary-coupon-form-block.wc-block-components-totals-wrapper > div > div`)).filter({ visible: true }).first().click({ force: true });
  if ((() => { let test = vars.test
return test !== "subscription" })()) {
    try { await page.locator(`#coupon_code`).or(page.locator(`#wc-block-components-totals-coupon__input-coupon`)).first().fill(`test`); } catch { await page.locator(`#coupon_code`).or(page.locator(`#wc-block-components-totals-coupon__input-coupon`)).first().selectOption(`test`); }
  }
  if ((() => { let test = vars.test
return test === "subscription" })()) {
    try { await page.locator(`#coupon_code`).or(page.locator(`#wc-block-components-totals-coupon__input-coupon`)).first().fill(`test2`); } catch { await page.locator(`#coupon_code`).or(page.locator(`#wc-block-components-totals-coupon__input-coupon`)).first().selectOption(`test2`); }
  }
  await page.locator(`xpath=//button[contains(text(), "Apply coupon")]`).or(page.locator(`button[name="apply_coupon"]`)).or(page.locator(`#wc-block-components-totals-coupon__form > button`)).or(page.locator(`xpath=//div[contains(text(), "Apply")]`)).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`.woocommerce-message`).or(page.locator(`.wc-block-components-notice-banner.is-success`)).or(page.locator(`div.wc-block-components-notice-banner__content`)).first()).toContainText(`applied`);
}

// GI: "Add PreOrder Product (Upfront) to Cart" (61dddab553eed2e62198cf59)
export async function addPreOrderProductUpfrontToCart(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.goto(`${vars.startUrl ?? ''}product/long-sleeve-tee/`);
  await page.waitForLoadState('load');
  await page.locator(`xpath=//button[contains(text(), "Pre-Order Now")]`).or(page.locator(`button[type="submit"].single_add_to_cart_button`)).filter({ visible: true }).first().click({ force: true });
  await page.locator(`a[href*="/cart/"].button.wc-forward`).or(page.locator(`xpath=//a[contains(text(), "View cart")]`)).filter({ visible: true }).first().click({ force: true });
  await page.locator(`a[href*="/checkout/"].checkout-button`).or(page.locator(`xpath=//a[contains(text(), "Proceed to checkout")]`)).or(page.locator(`xpath=//span[contains(text(), "Proceed to Checkout")]`)).or(page.locator(`xpath=//div[contains(text(), "Proceed to Checkout")]`)).filter({ visible: true }).first().click({ force: true });
  await extractDate(page, vars);
  try {
    vars.bluesnap_gateway_general_params = ((await page.locator(`script#woocommerce-bluesnap-gateway-general-js-extra`).textContent()) ?? '').trim();
  } catch { /* optional step: extract */ }
  try {
    vars.pfToken = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); vars.bluesnap_gateway_general_params
return woocommerce_bluesnap_gateway_general_params.token }, vars);
  } catch { /* optional step: extractEval */ }
  await getLogRequestResponsePaymentFieldsTokens(page, vars);
}

// GI: "Add PreOrder Product (Upon release) to Cart" (61d59473116a0e1d8100d6d0)
export async function addPreOrderProductUponReleaseToCart(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.goto(`${vars.startUrl ?? ''}product/belt/`);
  await page.waitForLoadState('load');
  await page.locator(`xpath=//button[contains(text(), "Pre-Order Now")]`).or(page.locator(`button[type="submit"].single_add_to_cart_button`)).filter({ visible: true }).first().click({ force: true });
  await page.locator(`a[href*="/cart/"].button.wc-forward`).or(page.locator(`xpath=//a[contains(text(), "View cart")]`)).filter({ visible: true }).first().click({ force: true });
  await page.locator(`a[href*="/checkout/"].checkout-button`).or(page.locator(`xpath=//a[contains(text(), "Proceed to checkout")]`)).or(page.locator(`xpath=//span[contains(text(), "Proceed to Checkout")]`)).or(page.locator(`xpath=//div[contains(text(), "Proceed to Checkout")]`)).filter({ visible: true }).first().click({ force: true });
  await extractDate(page, vars);
  await extractPftoken(page, vars);
  await getLogRequestResponsePaymentFieldsTokens(page, vars);
}

// GI: "Add Simple Product to Cart" (60abe83bef68371384fe5dde)
export async function addSimpleProductToCart(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.goto(`${vars.startUrl ?? ''}product/beanie/`);
  await page.waitForLoadState('load');
  await page.locator(`button.single_add_to_cart_button.button.alt`).filter({ visible: true }).first().click({ force: true });
  await page.locator(`a[href*="/checkout/"]`).or(page.locator(`xpath=//a[contains(text(), "Proceed to checkout")]`)).or(page.locator(`xpath=//span[contains(text(), "Proceed to Checkout")]`)).or(page.locator(`div.wp-block-woocommerce-proceed-to-checkout-block span.wc-block-components-button__text`)).filter({ visible: true }).first().click({ force: true });
  await page.waitForLoadState('load');
  vars.bluesnap_gateway_general_params = ((await page.locator(`script#woocommerce-bluesnap-gateway-general-js-extra`).textContent()) ?? '').trim();
  vars.pfToken = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); vars.bluesnap_gateway_general_params
return woocommerce_bluesnap_gateway_general_params.token }, vars);
  if ((() => { let IDTest = vars.IDTest
let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
return ((IDTest !== "BLU-001-056" && IDTest !== "BLU-001-059" && IDTest !== "BLU-001-063" && IDTest !== "BLU-001-064") 
&& (Number(blueSnapVs[0]) == 2 && Number(blueSnapVs[1]) == 5)) 
|| (Number(blueSnapVs[0]) == 2 && Number(blueSnapVs[1]) == 6) 
|| Number(blueSnapVs[0]) >= 3 })()) {
    await getLogRequestResponsePaymentFieldsTokens(page, vars);
  }
}

// GI: "Add Simple Product to Cart - without going to checkout or checking the pftoken" (6334a527db1ab7e45ee43007)
export async function addSimpleProductToCartWithoutGoingToCheckoutOrCheckingThePftoken(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.goto(`${vars.startUrl ?? ''}product/beanie/`);
  await page.waitForLoadState('load');
  await page.locator(`button.single_add_to_cart_button.button.alt`).filter({ visible: true }).first().click({ force: true });
  await page.locator(`a[href*="/cart/"]`).filter({ visible: true }).first().click({ force: true });
  await page.locator(`td.product-remove > .remove`).or(page.locator(`.wc-block-cart-item__remove-link`)).filter({ visible: true }).first().click({ force: true });
}

// GI: "Add Simple Product to Cart (Downloadable)" (62b1b95a5dd4634dc8dcde3c)
export async function addSimpleProductToCartDownloadable(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.goto(`${vars.startUrl ?? ''}product/beanie-nft/`);
  await page.waitForLoadState('load');
  await page.locator(`button.single_add_to_cart_button.button.alt`).filter({ visible: true }).first().click({ force: true });
  await page.locator(`a[href*="/cart/"]`).or(page.locator(`xpath=//a[contains(text(), "View cart")]`)).filter({ visible: true }).first().click({ force: true });
  await page.locator(`a[href*="/checkout/"].checkout-button`).or(page.locator(`xpath=//a[contains(text(), "Proceed to checkout")]`)).or(page.locator(`xpath=//span[contains(text(), "Proceed to Checkout")]`)).or(page.locator(`xpath=//div[contains(text(), "Proceed to Checkout")]`)).filter({ visible: true }).first().click({ force: true });
  await page.waitForLoadState('load');
  await extractDate(page, vars);
  vars.bluesnap_gateway_general_params = ((await page.locator(`script#woocommerce-bluesnap-gateway-general-js-extra`).textContent()) ?? '').trim();
  vars.pfToken = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); vars.bluesnap_gateway_general_params
return woocommerce_bluesnap_gateway_general_params.token }, vars);
  if ((() => { let IDTest = vars.IDTest
let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
return ((IDTest !== "BLU-001-056" && IDTest !== "BLU-001-059" && IDTest !== "BLU-001-063" && IDTest !== "BLU-001-064") 
&& (Number(blueSnapVs[0]) == 2 && Number(blueSnapVs[1]) == 5)) 
|| (Number(blueSnapVs[0]) == 2 && Number(blueSnapVs[1]) == 6) 
|| Number(blueSnapVs[0]) >= 3 })()) {
    await getLogRequestResponsePaymentFieldsTokens(page, vars);
  }
}

// GI: "Add Simple Product to Cart (Virtual)" (62b1b9555dd4634dc8dcdd03)
export async function addSimpleProductToCartVirtual(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.goto(`${vars.startUrl ?? ''}product/beanie-virtual/`);
  await page.waitForLoadState('load');
  await page.locator(`button.single_add_to_cart_button.button.alt`).filter({ visible: true }).first().click({ force: true });
  await page.locator(`a[href*="/cart/"]`).or(page.locator(`xpath=//a[contains(text(), "View cart")]`)).filter({ visible: true }).first().click({ force: true });
  await page.locator(`a[href*="/checkout/"].checkout-button`).or(page.locator(`.wc-block-cart__submit.wp-block-woocommerce-proceed-to-checkout-block > div > a`)).or(page.locator(`xpath=//a[contains(text(), "Proceed to checkout")]`)).or(page.locator(`xpath=//span[contains(text(), "Proceed to Checkout")]`)).filter({ visible: true }).first().click({ force: true });
  await page.reload();
  await page.waitForLoadState('load');
  await page.waitForLoadState('load');
  await extractDate(page, vars);
  vars.bluesnap_gateway_general_params = ((await page.locator(`script#woocommerce-bluesnap-gateway-general-js-extra`).textContent()) ?? '').trim();
  vars.pfToken = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); vars.bluesnap_gateway_general_params
return woocommerce_bluesnap_gateway_general_params.token }, vars);
  if ((() => { let IDTest = vars.IDTest
let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
return ((IDTest !== "BLU-001-056" && IDTest !== "BLU-001-059" && IDTest !== "BLU-001-063" && IDTest !== "BLU-001-064") 
&& (Number(blueSnapVs[0]) == 2 && Number(blueSnapVs[1]) == 5)) 
|| (Number(blueSnapVs[0]) == 2 && Number(blueSnapVs[1]) == 6) 
|| Number(blueSnapVs[0]) >= 3 })()) {
    await getLogRequestResponsePaymentFieldsTokens(page, vars);
  }
}

// GI: "Add Simple Subscription Product to Cart (Downloadable)" (62b1c09a5dd4634dc8df2299)
export async function addSimpleSubscriptionProductToCartDownloadable(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.goto(`${vars.startUrl ?? ''}product/subscription-test-downloadable/`);
  await page.waitForLoadState('load');
  await page.locator(`xpath=//button[contains(text(), "Sign Up Now")]`).or(page.locator(`button[type="submit"].single_add_to_cart_button`)).filter({ visible: true }).first().click({ force: true });
  if (vars.testID === "BLU-001-071") {
    await expect(page.locator(`.woocommerce-info`).or(page.locator(`.wc-block-components-notice-banner.is-info`)).first()).toHaveText(`A subscription has been removed from your cart. Due to payment gateway restrictions, different subscription products can not be purchased at the same time.`);
  }
  await page.locator(`a[href*="/cart/"].button.wc-forward`).or(page.locator(`xpath=//a[contains(text(), "View cart")]`)).filter({ visible: true }).first().click({ force: true });
  await page.waitForLoadState('load');
  if (vars.testID !== "BLU-001-071") {
    await page.locator(`a[href*="/checkout/"].checkout-button`).or(page.locator(`xpath=//a[contains(text(), "Proceed to checkout")]`)).or(page.locator(`xpath=//a[contains(text(), "Proceed to Checkout")]`)).or(page.locator(`div.wp-block-woocommerce-proceed-to-checkout-block .wc-block-components-button__text`)).filter({ visible: true }).first().click({ force: true });
  }
  if (vars.testID !== "BLU-001-071") {
    await page.waitForLoadState('load');
  }
  if (vars.testID !== "BLU-001-071") {
    await extractDate(page, vars);
  }
  try {
    if (vars.testID !== "BLU-001-071") {
      vars.bluesnap_gateway_general_params = ((await page.locator(`script#woocommerce-bluesnap-gateway-general-js-extra`).textContent()) ?? '').trim();
    }
  } catch { /* optional step: extract */ }
  try {
    if (vars.testID !== "BLU-001-071") {
      vars.pfToken = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); vars.bluesnap_gateway_general_params
return woocommerce_bluesnap_gateway_general_params.token }, vars);
    }
  } catch { /* optional step: extractEval */ }
  if (vars.testID !== "BLU-001-071") {
    await getLogRequestResponsePaymentFieldsTokens(page, vars);
  }
}

// GI: "Add Simple Subscription Product to Cart (Virtual)" (62b1bf7c183cb14313425373)
export async function addSimpleSubscriptionProductToCartVirtual(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.goto(`${vars.startUrl ?? ''}product/subscription-test-simple-virtual/`);
  await page.waitForLoadState('load');
  await page.locator(`xpath=//button[contains(text(), "Sign Up Now")]`).or(page.locator(`button[type="submit"].single_add_to_cart_button`)).filter({ visible: true }).first().click({ force: true });
  if (vars.testID !== "BLU-001-071") {
    await page.locator(`a[href*="/cart/"].button.wc-forward`).or(page.locator(`xpath=//a[contains(text(), "View cart")]`)).filter({ visible: true }).first().click({ force: true });
  }
  if (vars.testID !== "BLU-001-071") {
    await page.waitForLoadState('load');
  }
  if (vars.testID !== "BLU-001-071") {
    await page.locator(`a[href*="/checkout/"].checkout-button`).or(page.locator(`xpath=//a[contains(text(), "Proceed to checkout")]`)).or(page.locator(`div.wp-block-woocommerce-proceed-to-checkout-block .wc-block-components-button__text`)).or(page.locator(`xpath=//div[contains(text(), "Proceed to Checkout")]`)).filter({ visible: true }).first().click({ force: true });
  }
  if (vars.testID !== "BLU-001-071") {
    await page.waitForLoadState('load');
  }
  if (vars.testID !== "BLU-001-071") {
    await extractDate(page, vars);
  }
  try {
    if (vars.testID !== "BLU-001-071") {
      vars.bluesnap_gateway_general_params = ((await page.locator(`script#woocommerce-bluesnap-gateway-general-js-extra`).textContent()) ?? '').trim();
    }
  } catch { /* optional step: extract */ }
  try {
    if (vars.testID !== "BLU-001-071") {
      vars.pfToken = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); vars.bluesnap_gateway_general_params
return woocommerce_bluesnap_gateway_general_params.token }, vars);
    }
  } catch { /* optional step: extractEval */ }
  if (vars.testID !== "BLU-001-071") {
    await getLogRequestResponsePaymentFieldsTokens(page, vars);
  }
}

// GI: "Add Variable Subscription Product to Cart" (6182954005bc2f0b13e578b1)
export async function addVariableSubscriptionProductToCart(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.goto(`${vars.startUrl ?? ''}/product/subscription-test-variable/?attribute_type=Gold&attribute_period=Week`);
  await page.waitForLoadState('load');
  await page.locator(`xpath=//button[contains(text(), "Sign Up Now")]`).or(page.locator(`button[type="submit"].single_add_to_cart_button`)).filter({ visible: true }).first().click({ force: true });
  await page.locator(`a[href*="/cart/"].button.wc-forward`).or(page.locator(`xpath=//a[contains(text(), "View cart")]`)).filter({ visible: true }).first().click({ force: true });
  await page.waitForLoadState('load');
  await page.locator(`a[href*="/checkout/"].checkout-button`).or(page.locator(`xpath=//a[contains(text(), "Proceed to checkout")]`)).or(page.locator(`xpath=//span[contains(text(), "Proceed to Checkout")]`)).or(page.locator(`xpath=//div[contains(text(), "Proceed to Checkout")]`)).filter({ visible: true }).first().click({ force: true });
  await page.waitForLoadState('load');
  await extractDate(page, vars);
  try {
    vars.bluesnap_gateway_general_params = ((await page.locator(`script#woocommerce-bluesnap-gateway-general-js-extra`).textContent()) ?? '').trim();
  } catch { /* optional step: extract */ }
  try {
    vars.pfToken = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); vars.bluesnap_gateway_general_params
return woocommerce_bluesnap_gateway_general_params.token }, vars);
  } catch { /* optional step: extractEval */ }
  if ((() => { let testId =vars.testId
return testId != "BLU-001-026" })()) {
    await getLogRequestResponsePaymentFieldsTokens(page, vars);
  }
}

// GI: "Add Variable Subscription Product to Cart - Daily" (62260e850271df9af5296257)
export async function addVariableSubscriptionProductToCartDaily(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.goto(`${vars.startUrl ?? ''}product/subscription-test-variable/`);
  await page.waitForLoadState('load');
  {
    const _lbl = page.locator(`label[for="type"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#type`).filter({ visible: true }).first().click({ force: true }); }
  }
  try { await page.locator(`#type`).first().fill(`Gold`); } catch { await page.locator(`#type`).first().selectOption(`Gold`); }
  // TODO: command="dragAndDrop" target="#type" value=".storefront-sticky-add-to-cart"
  {
    const _lbl = page.locator(`label[for="period"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#period`).filter({ visible: true }).first().click({ force: true }); }
  }
  try { await page.locator(`#period`).first().fill(`Day`); } catch { await page.locator(`#period`).first().selectOption(`Day`); }
  // TODO: command="dragAndDrop" target="#period" value=".storefront-sticky-add-to-cart"
  await page.locator(`xpath=//button[contains(text(), "Sign Up Now")]`).or(page.locator(`button[type="submit"].single_add_to_cart_button`)).filter({ visible: true }).first().click({ force: true });
  await page.locator(`a[href*="/cart/"].button.wc-forward`).or(page.locator(`xpath=//a[contains(text(), "View cart")]`)).filter({ visible: true }).first().click({ force: true });
  await page.waitForLoadState('load');
  await page.locator(`a[href*="/checkout/"].checkout-button`).or(page.locator(`xpath=//a[contains(text(), "Proceed to checkout")]`)).or(page.locator(`div.wp-block-woocommerce-proceed-to-checkout-block span.wc-block-components-button__text`)).or(page.locator(`xpath=//*[contains(text(), "Proceed to Checkout")]`)).filter({ visible: true }).first().click({ force: true });
  await page.waitForLoadState('load');
  try {
    vars.bluesnap_gateway_general_params = ((await page.locator(`script#woocommerce-bluesnap-gateway-general-js-extra`).textContent()) ?? '').trim();
  } catch { /* optional step: extract */ }
  try {
    vars.pfToken = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); vars.bluesnap_gateway_general_params
return woocommerce_bluesnap_gateway_general_params.token }, vars);
  } catch { /* optional step: extractEval */ }
}

// GI: "Add Variable Subscription Product to Cart with Free Trial" (639a0958a67dec3a1236aa98)
export async function addVariableSubscriptionProductToCartWithFreeTrial(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.goto(`${vars.startUrl ?? ''}product/subscription-test-variable/`);
  await page.waitForLoadState('load');
  {
    const _lbl = page.locator(`label[for="type"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#type`).filter({ visible: true }).first().click({ force: true }); }
  }
  try { await page.locator(`#type`).first().fill(`Silver`); } catch { await page.locator(`#type`).first().selectOption(`Silver`); }
  {
    const _lbl = page.locator(`label[for="period"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#period`).filter({ visible: true }).first().click({ force: true }); }
  }
  try { await page.locator(`#period`).first().fill(`Week`); } catch { await page.locator(`#period`).first().selectOption(`Week`); }
  await page.locator(`xpath=//button[contains(text(), "Sign Up Now")]`).or(page.locator(`button[type="submit"].single_add_to_cart_button`)).filter({ visible: true }).first().click({ force: true });
  await page.waitForLoadState('load');
  await page.goto(`${vars.startUrl ?? ''}checkout`);
  await page.waitForLoadState('load');
  await page.waitForLoadState('load');
  await extractDate(page, vars);
  try {
    vars.bluesnap_gateway_general_params = ((await page.locator(`script#woocommerce-bluesnap-gateway-general-js-extra`).textContent()) ?? '').trim();
  } catch { /* optional step: extract */ }
  try {
    vars.pfToken = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); vars.bluesnap_gateway_general_params
return woocommerce_bluesnap_gateway_general_params.token }, vars);
  } catch { /* optional step: extractEval */ }
  if ((() => { let testId =vars.testId
return testId != "BLU-001-026" })()) {
    await getLogRequestResponsePaymentFieldsTokens(page, vars);
  }
}

// GI: "BlueSnap Sandbox end - Look for transaction" (64dbe2a3e10c1b9203a78713)
export async function blueSnapSandboxEndLookForTransaction(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.goto(`https://sandbox.bluesnap.com/jsp/developer_login.jsp`);
  await page.waitForLoadState('load');
  try { await page.locator(`#username`).first().fill(`${vars.user_bluesnap ?? ''}`); } catch { await page.locator(`#username`).first().selectOption(`${vars.user_bluesnap ?? ''}`); }
  try { await page.locator(`#password`).first().fill(`${vars.password_bluesnap ?? ''}`); } catch { await page.locator(`#password`).first().selectOption(`${vars.password_bluesnap ?? ''}`); }
  await page.locator(`button.btn`).filter({ visible: true }).first().click({ force: true });
  await page.locator(`xpath=//a[contains(text(), "Find a Transaction")]`).or(page.locator(`#new-menu-find-transaction > a[href*="order_locator.jsp?sessionId="]`)).filter({ visible: true }).first().click({ force: true });
  try { await page.locator(`input[name="searchId"]`).first().fill(`${vars.transaction_id ?? ''}`); } catch { await page.locator(`input[name="searchId"]`).first().selectOption(`${vars.transaction_id ?? ''}`); }
  await page.locator(`.button_line > button.btn.btn-warning.component_submit_button`).filter({ visible: true }).first().click({ force: true });
  await page.waitForLoadState('load');
}

// GI: "BlueSnap Sandbox end - refund" (61fd20e7f5376dce52e3dace)
export async function blueSnapSandboxEndRefund(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.goto(`https://sandbox.bluesnap.com/jsp/developer_login.jsp`);
  await page.waitForLoadState('load');
  try { await page.locator(`#username`).first().fill(`${vars.user_bluesnap ?? ''}`); } catch { await page.locator(`#username`).first().selectOption(`${vars.user_bluesnap ?? ''}`); }
  try { await page.locator(`#password`).first().fill(`${vars.password_bluesnap ?? ''}`); } catch { await page.locator(`#password`).first().selectOption(`${vars.password_bluesnap ?? ''}`); }
  await page.locator(`button.btn`).filter({ visible: true }).first().click({ force: true });
  await page.locator(`xpath=//a[contains(text(), "Find a Transaction")]`).or(page.locator(`#new-menu-find-transaction > a[href*="order_locator.jsp?sessionId="]`)).filter({ visible: true }).first().click({ force: true });
  try { await page.locator(`input[name="searchId"]`).first().fill(`${vars.transaction_id ?? ''}`); } catch { await page.locator(`input[name="searchId"]`).first().selectOption(`${vars.transaction_id ?? ''}`); }
  await page.locator(`.button_line > button.btn.btn-warning.component_submit_button`).filter({ visible: true }).first().click({ force: true });
  await page.waitForLoadState('load');
  await expect(page.locator(`table.table.table-bordered.content_table_class > tbody > tr:nth-of-type(2) > td.plain9BlackOnNone:nth-of-type(1)`)).not.toHaveCount(0);
  await expect(page.locator(`table.table.table-bordered.content_table_class > tbody > tr:nth-of-type(2) > td.plain9BlackOnNone:nth-of-type(1)`).first()).toContainText(`REFUND`);
  if ((() => { let test = vars.test
let currency = vars.currency
let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
return  ((currency !== "JPY" && currency !== "GBP") 
        || 
        (currency === "JPY" && (Number(blueSnapVs[0]) >= 3 && Number(blueSnapVs[1]) >= 5))
        ||
        (currency === "GBP" && (Number(blueSnapVs[0]) >= 3 && Number(blueSnapVs[1]) >= 2))
        )
        &&
        test != "partial" })()) {
    await expect(page.locator(`table.table.table-bordered.content_table_class > tbody > tr:nth-of-type(2) > td.plain9BlackOnNone:nth-of-type(2)`).first()).toContainText(`-${vars.total ?? ''}`);
  }
  if ((() => { let test = vars.test
let currency = vars.currency
let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
return (currency !== "JPY" || (currency === "JPY" && (Number(blueSnapVs[0]) >= 3 && Number(blueSnapVs[1]) >= 5))) 
&&
test === "partial" })()) {
    await expect(page.locator(`table.table.table-bordered.content_table_class > tbody > tr:nth-of-type(2) > td.plain9BlackOnNone:nth-of-type(2)`).first()).toContainText(`-${vars.partialRefund ?? ''}`);
  }
  if ((() => { let scenario = vars.scenario
let currency = vars.curr
return scenario === "multi-currency" && currency !== "USD" })()) {
    await expect(page.locator(`table.table.table-bordered.content_table_class > tbody > tr:nth-of-type(2) > td.plain9BlackOnNone:nth-of-type(2)`).first()).toContainText(`${vars.currency ?? ''}`);
  }
  if ((() => { let scenario = vars.scenario
let currency = vars.curr
return scenario === "multi-currency" && currency === "USD" })()) {
    // TODO: command="assertTextNotPresent" target="table.table.table-bordered.content_table_class > tbody > tr:nth-of-type(2) > td.plain9BlackOnNone:nth-of-type(2)" value="{{currency}}"
  }
  await expect(page.locator(`table.table.table-bordered.content_table_class > tbody > tr:nth-of-type(2) > td.plain9BlackOnNone:nth-of-type(7)`).first()).toContainText(`wc_reason:${vars.testID ?? ''}`);
}

// GI: "calculate totalUSD" (63652089db1ab7e45e65950e)
export async function calculateTotalUSD(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.rate = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let rates = vars.rates;
let currency = `${vars.curr}`;
let rate;
let boolean = false;
let n = 0
while (boolean === false && rates.response.currencyRate.length > n) {
    if (rates.response.currencyRate[n].quoteCurrency != currency) {
        n++
    } else {
        rate = rates.response.currencyRate[n].conversionRate
        boolean = true
    }
}
return rate }, vars);
  if ((() => { let defaultCurr = vars.defaultCurr
return defaultCurr === "USD" })()) {
    vars.totalUSD = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let total = vars.total
let rate = vars.rate
let totalDefaultCurr = total / rate
totalDefaultCurr = Math.round(totalDefaultCurr*100)/100

return totalDefaultCurr }, vars);
  }
  if ((() => { let defaultCurr = vars.defaultCurr
let curr = vars.curr
return defaultCurr !== "USD" && curr !== "USD" })()) {
    vars.totalDefaultCurr = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let total = vars.total
let rate = vars.rate
let totalDefaultCurr = total / rate
let multiply
  
  if (`${vars.defaultCurr}` === "JPY") {
      multiply = 1
  } else {
      multiply = 100
  }
  
totalDefaultCurr = Math.round(totalDefaultCurr*multiply)/multiply

return totalDefaultCurr }, vars);
  }
  if ((() => { let defaultCurr = vars.defaultCurr
let curr = vars.curr
return defaultCurr !== "USD" && curr !== "USD" })()) {
    vars.rate = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let rates = vars.rates;
let currency = "USD";
let rate;
let boolean = false;
let n = 0
while (boolean === false && rates.response.currencyRate.length > n) {
    if (rates.response.currencyRate[n].quoteCurrency != currency) {
        n++
    } else {
        rate = rates.response.currencyRate[n].conversionRate
        boolean = true
    }
}
return rate }, vars);
  }
  if ((() => { let defaultCurr = vars.defaultCurr
let curr = vars.curr
return defaultCurr !== "USD" && curr !== "USD" })()) {
    vars.totalUSD = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let total = vars.totalDefaultCurr
let rate = vars.rate
let totalUSD = total * rate
totalUSD = Math.floor(totalUSD*100)/100

return totalUSD }, vars);
  }
  if ((() => { let defaultCurr = vars.defaultCurr
let curr = vars.curr
return defaultCurr !== "USD" && curr === "USD" })()) {
    vars.totalUSD = `${vars.total ?? ''}`;
  }
}

// GI: "Cancel Auhorize_only order" (6206a3b55ce599ddc09d9cf0)
export async function cancelAuhorizeOnlyOrder(page: Page, vars: Record<string, string> = {}): Promise<void> {
  {
    const _lbl = page.locator(`label[for="select2-order_status-container"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#select2-order_status-container`).filter({ visible: true }).first().click({ force: true }); }
  }
  await page.locator(`xpath=//li[contains(text(), "Cancelled")]`).filter({ visible: true }).first().click({ force: true });
  await extractDate(page, vars);
  await page.locator(`xpath=//button[contains(text(), "Update")]`).or(page.locator(`button[name="save"]`)).filter({ visible: true }).first().click({ force: true });
}

// GI: "Capture Auhorize_only order" (6206a3628be2b2bbc662ff32)
export async function captureAuhorizeOnlyOrder(page: Page, vars: Record<string, string> = {}): Promise<void> {
  {
    const _lbl = page.locator(`label[for="select2-order_status-container"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#select2-order_status-container`).filter({ visible: true }).first().click({ force: true }); }
  }
  {
    const _lbl = page.locator(`label[for="select2-order_status-result-vjz8-wc-processing"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`xpath=//li[contains(text(), "Processing")]`).or(page.locator(`#select2-order_status-result-vjz8-wc-processing`)).filter({ visible: true }).first().click({ force: true }); }
  }
  await extractDate(page, vars);
  await page.locator(`xpath=//button[contains(text(), "Update")]`).or(page.locator(`button[name="save"]`)).filter({ visible: true }).first().click({ force: true });
}

// GI: "Capture PayPal payment" (650e061f043e569e6bd78f4a)
export async function capturePayPalPayment(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.locator(`.form-field.form-field-wide > a`).filter({ visible: true }).first().click({ force: true });
  // skipped: select-open click on 'select[name="wc_order_action"]' — use selectOption instead
  try { await page.locator(`select[name="wc_order_action"]`).first().fill(`ppcp_authorize_order`); } catch { await page.locator(`select[name="wc_order_action"]`).first().selectOption(`ppcp_authorize_order`); }
  await page.locator(`xpath=//button[contains(text(), "Update")]`).or(page.locator(`button[name="save"]`)).filter({ visible: true }).first().click({ force: true });
  await page.waitForTimeout(3000);
  await expect(page.locator(`#select2-order_status-container`).first()).toContainText(`Completed`);
  await page.locator(`.woocommerce_subscriptions_related_orders > table > tbody > tr > td > a`).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`#select2-order_status-container`).first()).toContainText(`Active`);
}

// GI: "change currency format" (6385025ea67dec3a12801e4e)
export async function changeCurrencyFormat(page: Page, vars: Record<string, string> = {}): Promise<void> {
  if ((() => { let freeTrial = vars.freeTrial
let checklogs = vars.checklogs
let test = vars.test
return test != "preorder" && freeTrial != "yes" && checklogs != "upgrade" })()) {
    vars.totalProd = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let result = vars.listPrices
return Intl.NumberFormat(`${vars.locale}`, { style: 'currency', currency: `${vars.currency}`}).format(result[6])
 }, vars);
  }
  if ((() => { let test = vars.test
return test === "preorder" })()) {
    vars.totalProd = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let result = vars.listPrices
return Intl.NumberFormat(`${vars.locale}`, { style: 'currency', currency: `${vars.currency}`}).format(result[0])
 }, vars);
  }
  if ((() => { let freeTrial = vars.freeTrial
return freeTrial === "yes" })()) {
    vars.totalProd = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let result = vars.listPrices
return Intl.NumberFormat(`${vars.locale}`, { style: 'currency', currency: `${vars.currency}`}).format(result[4])
 }, vars);
  }
  if ((() => { let checklogs = vars.checklogs
return checklogs === "upgrade" })()) {
    vars.totalProd = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let result = vars.listPrices
return Intl.NumberFormat(`${vars.locale}`, { style: 'currency', currency: `${vars.currency}`}).format(result[5])
 }, vars);
  }
  if ((() => { let freeTrial = vars.freeTrial
let checklogs = vars.checklogs
let test = vars.test
return test != "preorder" && freeTrial != "yes" && checklogs != "upgrade" })()) {
    vars.discount = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let result = vars.listPrices
return Intl.NumberFormat(`${vars.locale}`, { style: 'currency', currency: `${vars.currency}`}).format(result[8])
 }, vars);
  }
  if ((() => { let test = vars.test
return test === "preorder" })()) {
    vars.discount = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let result = vars.listPrices
return Intl.NumberFormat(`${vars.locale}`, { style: 'currency', currency: `${vars.currency}`}).format(result[2])
 }, vars);
  }
  if ((() => { let freeTrial = vars.freeTrial
return freeTrial === "yes" })()) {
    vars.discount = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let result = vars.listPrices
return Intl.NumberFormat(`${vars.locale}`, { style: 'currency', currency: `${vars.currency}`}).format(result[6])
 }, vars);
  }
  if ((() => { let checklogs = vars.checklogs
return checklogs === "upgrade" })()) {
    vars.discount = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let result = vars.listPrices
return Intl.NumberFormat(`${vars.locale}`, { style: 'currency', currency: `${vars.currency}`}).format(result[7])
 }, vars);
  }
  if ((() => { let freeTrial = vars.freeTrial
let checklogs = vars.checklogs
let test = vars.test
return test != "preorder" && freeTrial != "yes" && checklogs != "upgrade" })()) {
    vars.shipping = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let result = vars.listPrices
return Intl.NumberFormat(`${vars.locale}`, { style: 'currency', currency: `${vars.currency}`}).format(result[9])
 }, vars);
  }
  if ((() => { let test = vars.test
return test === "preorder" })()) {
    vars.shipping = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let result = vars.listPrices
return Intl.NumberFormat(`${vars.locale}`, { style: 'currency', currency: `${vars.currency}`}).format(result[3])
 }, vars);
  }
  if ((() => { let freeTrial = vars.freeTrial
return freeTrial === "yes" })()) {
    vars.shipping = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let result = vars.listPrices
return Intl.NumberFormat(`${vars.locale}`, { style: 'currency', currency: `${vars.currency}`}).format(result[7])
 }, vars);
  }
  if ((() => { let checklogs = vars.checklogs
return checklogs === "upgrade" })()) {
    vars.shipping = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let result = vars.listPrices
return Intl.NumberFormat(`${vars.locale}`, { style: 'currency', currency: `${vars.currency}`}).format(result[8])
 }, vars);
  }
  if ((() => { let freeTrial = vars.freeTrial
let checklogs = vars.checklogs
let test = vars.test
return test != "preorder" && freeTrial != "yes" && checklogs != "upgrade" })()) {
    vars.subtotal = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let result = vars.listPrices
return Intl.NumberFormat(`${vars.locale}`, { style: 'currency', currency: `${vars.currency}`}).format(result[7])
 }, vars);
  }
  if ((() => { let test = vars.test
return test === "preorder" })()) {
    vars.subtotal = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let result = vars.listPrices
return Intl.NumberFormat(`${vars.locale}`, { style: 'currency', currency: `${vars.currency}`}).format(result[1])
 }, vars);
  }
  if ((() => { let freeTrial = vars.freeTrial
return freeTrial === "yes" })()) {
    vars.subtotal = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let result = vars.listPrices
return Intl.NumberFormat(`${vars.locale}`, { style: 'currency', currency: `${vars.currency}`}).format(result[5])
 }, vars);
  }
  if ((() => { let checklogs = vars.checklogs
return checklogs === "upgrade" })()) {
    vars.subtotal = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let result = vars.listPrices
return Intl.NumberFormat(`${vars.locale}`, { style: 'currency', currency: `${vars.currency}`}).format(result[6])
 }, vars);
  }
  if ((() => { let freeTrial = vars.freeTrial
let checklogs = vars.checklogs
let test = vars.test
return test != "preorder" && freeTrial != "yes" && checklogs != "upgrade" })()) {
    vars.tax = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let result = vars.listPrices
return Intl.NumberFormat(`${vars.locale}`, { style: 'currency', currency: `${vars.currency}`}).format(result[10])
 }, vars);
  }
  if ((() => { let test = vars.test
return test === "preorder" })()) {
    vars.tax = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let result = vars.listPrices
return Intl.NumberFormat(`${vars.locale}`, { style: 'currency', currency: `${vars.currency}`}).format(result[4])
 }, vars);
  }
  if ((() => { let freeTrial = vars.freeTrial
return freeTrial === "yes" })()) {
    vars.tax = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let result = vars.listPrices
return Intl.NumberFormat(`${vars.locale}`, { style: 'currency', currency: `${vars.currency}`}).format(result[8])
 }, vars);
  }
  if ((() => { let checklogs = vars.checklogs
return checklogs === "upgrade" })()) {
    vars.tax = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let result = vars.listPrices
return Intl.NumberFormat(`${vars.locale}`, { style: 'currency', currency: `${vars.currency}`}).format(result[9])
 }, vars);
  }
  if ((() => { let freeTrial = vars.freeTrial
let checklogs = vars.checklogs
let test = vars.test
return test != "preorder" && freeTrial != "yes" && checklogs != "upgrade" })()) {
    vars.total = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let result = vars.listPrices
return Intl.NumberFormat(`${vars.locale}`, { style: 'currency', currency: `${vars.currency}`}).format(result[11])
 }, vars);
  }
  if ((() => { let test = vars.test
return test === "preorder" })()) {
    vars.total = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let result = vars.listPrices
return Intl.NumberFormat(`${vars.locale}`, { style: 'currency', currency: `${vars.currency}`}).format(result[5])
 }, vars);
  }
  if ((() => { let freeTrial = vars.freeTrial
return freeTrial === "yes" })()) {
    vars.total = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let result = vars.listPrices
return Intl.NumberFormat(`${vars.locale}`, { style: 'currency', currency: `${vars.currency}`}).format(result[9])
 }, vars);
  }
  if ((() => { let checklogs = vars.checklogs
return checklogs === "upgrade" })()) {
    vars.total = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let result = vars.listPrices
return Intl.NumberFormat(`${vars.locale}`, { style: 'currency', currency: `${vars.currency}`}).format(result[10])
 }, vars);
  }
  if ((() => { let test = vars.test
let checklogs = vars.checklogs
let freeTrial = vars.freeTrial
return test === "subscription" && freeTrial != "yes" && checklogs != "upgrade" })()) {
    vars.recurringTotal = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let result = vars.listPrices
return Intl.NumberFormat(`${vars.locale}`, { style: 'currency', currency: `${vars.currency}`}).format(result[11])
 }, vars);
  }
  if ((() => { let freeTrial = vars.freeTrial
return freeTrial === "yes" })()) {
    vars.recurringTotal = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let result = vars.listPrices
return Intl.NumberFormat(`${vars.locale}`, { style: 'currency', currency: `${vars.currency}`}).format(result[9])
 }, vars);
  }
  if ((() => { let checklogs = vars.checklogs
return checklogs === "upgrade" })()) {
    vars.recurringTotal = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let result = vars.listPrices
return Intl.NumberFormat(`${vars.locale}`, { style: 'currency', currency: `${vars.currency}`}).format(result[10])
 }, vars);
  }
}

// GI: "Check ACH/CC not on Checkout" (62b08929183cb14313ff85ea)
export async function checkACHCCNotOnCheckout(page: Page, vars: Record<string, string> = {}): Promise<void> {
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let payment = `${vars.payment}`
const element = document.querySelector<HTMLFormElement>('form.checkout.woocommerce-checkout')
return payment != "ach" && !element === false }, vars)) {
    await expect(page.locator(`xpath=//label[contains(text(),'${vars.CCName ?? ''} ending in ${vars.fourDigits ?? ''} (expires ${vars.month ?? ''}/${vars.year ?? ''})')]`)).toHaveCount(0);
  }
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let payment = `${vars.payment}`
const element = document.querySelector('.wp-block-woocommerce-checkout.wc-block-checkout')
return payment != "ach" && !element === false }, vars)) {
    await expect(page.locator(`xpath=//*[contains(text(),'${vars.CCName ?? ''} ending in ${vars.fourDigits ?? ''}')]`)).toHaveCount(0);
  }
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let payment = `${vars.payment}`
const element = document.querySelector<HTMLFormElement>('form.checkout.woocommerce-checkout')
return payment === "ach" && !element === false }, vars)) {
    await expect(page.locator(`xpath=//label[contains(text(),'ACH/ECP with public account number 44556')]`)).toHaveCount(0);
  }
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let payment = `${vars.payment}`
const element = document.querySelector('.wp-block-woocommerce-checkout.wc-block-checkout')
return payment = "ach" && !element === false }, vars)) {
    await expect(page.locator(`xpath=//*[contains(text(),'ACH/ECP with public account number 44556')]`)).toHaveCount(0);
  }
}

// GI: "Check ACH/CC Saved on Checkout" (60d0bc83fd5d095fc942518b)
export async function checkACHCCSavedOnCheckout(page: Page, vars: Record<string, string> = {}): Promise<void> {
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let payment = `${vars.payment}`
const element = document.querySelector<HTMLFormElement>('form.checkout.woocommerce-checkout')
 
return payment !== "ach" && element !== null && element !== undefined }, vars)) {
    await expect(page.locator(`.woocommerce-SavedPaymentMethods-token > label`).first()).toContainText(`${vars.CCName ?? ''} ending in ${vars.fourDigits ?? ''} (expires ${vars.month ?? ''}/${vars.year ?? ''})`);
  }
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let payment = `${vars.payment}`
const element = document.querySelector<HTMLFormElement>('form.checkout.woocommerce-checkout')
return payment === "ach" && element !== null && element !== undefined }, vars)) {
    await expect(page.locator(`.woocommerce-SavedPaymentMethods-token > label`).first()).toContainText(`ACH/ECP with public account number 44556`);
  }
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let payment = `${vars.payment}`
const element = document.querySelector<HTMLFormElement>('.wc-block-components-form.wc-block-checkout__form')
 
return payment !== "ach" && element !== null && element !== undefined }, vars)) {
    await expect(page.locator(`span[id*='radio-control-wc-payment-method-saved-tokens']`).first()).toContainText(`${vars.CCName ?? ''} ending in ${vars.fourDigits ?? ''}`);
  }
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const payment = `${vars.payment}`
const element = document.querySelector<HTMLFormElement>('.wc-block-components-form.wc-block-checkout__form')


return  payment === "ach" 
        && 
        element !== null 
        && 
        element !== undefined }, vars)) {
    await expect(page.locator(`span[id*='radio-control-wc-payment-method-saved-tokens']`).first()).toContainText(`Consumer Checking Account ending in 44556`);
  }
}

// GI: "Check Cart is empty" (60e74955ed68ff1796486747)
export async function checkCartIsEmpty(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.goto(`${vars.startUrl ?? ''}cart/`);
  await page.waitForLoadState('load');
  await page.waitForLoadState('load');
  await blockUI(page, vars);
  await expect(page.locator(`.cart-empty`).or(page.locator(`.wc-block-components-notice-banner.is-info`)).or(page.locator(`.wc-block-cart__empty-cart__title`)).first()).toContainText(`Your cart is currently empty`);
}

// GI: "Check Pre Order failed" (61ded58d5b9a7d92d2b824e9)
export async function checkPreOrderFailed(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.locator(`.nav-menu > .page_item > a[href*="/my-account/"]`).filter({ visible: true }).first().click({ force: true });
  await page.locator(`xpath=//a[contains(text(), "Pre-Orders")]`).or(page.locator(`a[href*="/my-account/pre-orders/"]`)).filter({ visible: true }).first().click({ force: true });
  try {
    await expect(page.locator(`tr.order:nth-of-type(1) > td.pre-order-status`).first()).toHaveText(``);
  } catch { /* optional step: assertText */ }
  try {
    await expect(page.locator(`tr.order:nth-of-type(1) > td.pre-order-status`)).toHaveCount(0);
  } catch { /* optional step: assertElementNotPresent */ }
}

// GI: "Check transcation is present on Order backend" (61e0311521c976abaf97ce6f)
export async function checkTranscationIsPresentOnOrderBackend(page: Page, vars: Record<string, string> = {}): Promise<void> {
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let element = document.getElementsByClassName('wp-menu-name')

return element.length === 0 }, vars)) {
    await loginAdmin(page, vars);
  }
  if ((() => { let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
return (Number(blueSnapVs[0]) == 2 && Number(blueSnapVs[1]) <= 6)
|| (Number(blueSnapVs[0]) == 3 && Number(blueSnapVs[1]) <= 3) })()) {
    vars.labeIPN = `IPN`;
  }
  if ((() => { let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
return (Number(blueSnapVs[0]) >= 3 && Number(blueSnapVs[1]) >= 4) })()) {
    vars.labeIPN = `Webhook`;
  }
  vars.hpos = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let hpos = Array.from<any>(document.querySelectorAll<HTMLAnchorElement>('a[href="admin.php?page=wc-orders"]'))
let legacy = Array.from<any>(document.querySelectorAll<HTMLAnchorElement>('a[href="edit.php?post_type=shop_order"]'))

if (hpos.length !== 0) {
    return "on"
}

if (legacy.length !== 0) {
    return "off"
}
 }, vars);
  if (vars.hpos === "off") {
    await page.goto(`${vars.startUrl ?? ''}wp-admin/post.php?post=${vars.orderNumber ?? ''}&action=edit`);
    await page.waitForLoadState('load');
  }
  if (vars.hpos === "on") {
    await page.goto(`${vars.startUrl ?? ''}wp-admin/admin.php?page=wc-orders&action=edit&id=${vars.orderNumber ?? ''}`);
    await page.waitForLoadState('load');
  }
  if ((() => { let payment = vars.payment
return payment != "ach" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const jsonOrder = vars.myOrder
const paymentMethod = jsonOrder.payment_method
return paymentMethod === "bluesnap" }, vars)).toBeTruthy();
  }
  if ((() => { let payment = vars.payment
return payment != "ach" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const paymentMethodT = `${vars.paymentMethodTitle}`
return paymentMethodT === "Credit/Debit Card" }, vars)).toBeTruthy();
  }
  if ((() => { let payment = vars.payment
return payment != "ach" })()) {
    await expect(page.locator(`tbody > tr:nth-child(2) > td:nth-child(1) > span.description`).first()).toContainText(`${vars.paymentMethodTitle ?? ''}`);
  }
  if ((() => { let payment = vars.payment
let test = vars.test
return payment === "ach" && test != "ipn" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const jsonOrder = vars.myOrder
const paymentMethod = jsonOrder.payment_method
return paymentMethod === "bluesnap_ach" }, vars)).toBeTruthy();
  }
  if ((() => { let payment = vars.payment
let test = vars.test
return payment === "ach" && test != "ipn" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const paymentMethodT = `${vars.paymentMethodTitle}`
return paymentMethodT === "ACH/ECP Transactions" }, vars)).toBeTruthy();
  }
  await expect(page.locator(`.woocommerce-order-data__meta`).first()).toContainText(`Payment via ${vars.paymentMethodTitle ?? ''} (${vars.transaction_id ?? ''})`);
  if ((() => { let test = vars.test
let payment =vars.payment
return test != "preorder" && payment != "ach" })()) {
    await expect(page.locator(`li.note.system-note:nth-of-type(2) > .note_content > p`).first()).toContainText(`Bluesnap transaction complete (Transaction ID: ${vars.transaction_id ?? ''})`);
  }
  if ((() => { let test = vars.test
let payment =vars.payment
return test != "preorder" && payment != "ach" })()) {
    await expect(page.locator(`#select2-order_status-container`).first()).toHaveText(`${vars.status ?? ''}`);
  }
  if ((() => { let pay = vars.pay
return pay === "now" })()) {
    await expect(page.locator(`li.note.system-note:nth-of-type(2) > .note_content > p`).first()).toContainText(`Bluesnap transaction complete (Transaction ID: ${vars.transaction_id ?? ''})`);
  }
  if ((() => { let pay = vars.pay
return pay === "upfront" })()) {
    await expect(page.locator(`li.note.system-note:nth-of-type(5) > .note_content > p`).first()).toContainText(`Bluesnap transaction complete (Transaction ID: ${vars.transaction_id ?? ''})`);
  }
  if ((() => { let payment = vars.payment
return payment === "ach" })()) {
    vars.status = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let prod = `${vars.prod}`
if (prod === "downloadable") {
    return "Completed"
} else {
    return "Processing"
} }, vars);
  }
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let payment = `${vars.payment}`
let product = `${vars.product}`
let status = document.querySelector('#select2-order_status-container').textContent 
return payment === "ach" && product === "simple" && status === 'On hold' }, vars)) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); // Select all <p> elements inside <li class="note system-note"> under .note_content
const notes = Array.from<any>(document.querySelectorAll('li.note.system-note .note_content p'));

// Filter notes for the specific text content
const targetNotes = notes.filter(p => 
  p.textContent.includes('ACH Transaction approved') || 
  p.textContent.includes('BlueSnap ACH Declined') || 
  p.textContent.includes('Charge pending confirmation from BlueSnap') ||
  p.textContent.includes('Order status changed from On hold') ||
  p.textContent.includes('Payment via ACH/ECP Transactions')
);

if (targetNotes.length === 1 && 
    targetNotes[0].textContent === `Charge pending confirmation from BlueSnap (Charge ID: ${vars.transaction_id}). Order status changed from Pending payment to On hold.`) 
{
    return true
} else {
    return false
}

 }, vars)).toBeTruthy();
  }
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let payment = `${vars.payment}`
let product = `${vars.product}`
let status = document.querySelector('#select2-order_status-container').textContent 
return payment === "ach" && product === "simple" && status === 'Failed' }, vars)) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); // Select all <p> elements inside <li class="note system-note"> under .note_content
const notes = Array.from<any>(document.querySelectorAll('li.note.system-note .note_content p'));

// Filter notes for the specific text content
const targetNotes = notes.filter(p => 
  p.textContent.includes('ACH Transaction approved') || 
  p.textContent.includes('BlueSnap ACH Declined') || 
  p.textContent.includes('Charge pending confirmation from BlueSnap') ||
  p.textContent.includes('Order status changed from On hold') ||
  p.textContent.includes('Payment via ACH/ECP Transactions')
);

if (targetNotes.length === 2 && 
    targetNotes[0].textContent === `BlueSnap ACH Declined ${vars.labeIPN} request received. A chargeback has been created for this transaction. Reason: null – null. Order status changed from On hold to Failed.` && 
    targetNotes[1].textContent === `Charge pending confirmation from BlueSnap (Charge ID: ${vars.transaction_id}). Order status changed from Pending payment to On hold.`    ) 
{
    return true
} else {
    return false
}

 }, vars)).toBeTruthy();
  }
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let payment = `${vars.payment}`
let product = `${vars.product}`
let status = document.querySelector('#select2-order_status-container').textContent 
return payment === "ach" && product === "simple" 
        && (status === 'Completed' || status === 'Processing') }, vars)) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); // Select all <p> elements inside <li class="note system-note"> under .note_content
const notes = Array.from<any>(document.querySelectorAll('li.note.system-note .note_content p'));

// Filter notes for the specific text content
const targetNotes = notes.filter(p => 
  p.textContent.includes('ACH Transaction approved') || 
  p.textContent.includes('BlueSnap ACH Declined') || 
  p.textContent.includes('Charge pending confirmation from BlueSnap') ||
  p.textContent.includes('Order status changed from On hold') ||
  p.textContent.includes('Payment via ACH/ECP Transactions')
);

if (targetNotes.length === 3 && 
    (
        targetNotes[0].textContent === `Order status changed from On hold to ${vars.status}.` ||
        targetNotes[0].textContent === `Payment via ACH/ECP Transactions (${vars.transaction_id}).`
    ) && 
    targetNotes[1].textContent === `ACH Transaction approved via ${vars.labeIPN} request.` &&
    targetNotes[2].textContent === `Charge pending confirmation from BlueSnap (Charge ID: ${vars.transaction_id}). Order status changed from Pending payment to On hold.`    ) 
{
    return true
} else {
    return false
}
 }, vars)).toBeTruthy();
  }
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let payment = `${vars.payment}`
let product = `${vars.product}`
let status = document.querySelector("#select2-order_status-container").textContent
return payment === "ach" && product === "subscription" && status === 'On hold' }, vars)) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); // Select all <p> elements inside <li class="note system-note"> under .note_content
const notes = Array.from<any>(document.querySelectorAll('li.note.system-note .note_content p'));

// Filter notes for the specific text content
const targetNotes = notes.filter(p => 
  p.textContent.includes('ACH Transaction approved') || 
  p.textContent.includes('BlueSnap ACH Declined') || 
  p.textContent.includes('Charge pending confirmation from BlueSnap') ||
  p.textContent.includes('Order status changed from On hold') ||
  p.textContent.includes('Bluesnap transaction complete') ||
  p.textContent.includes('Payment via ACH/ECP Transactions')
);

if (targetNotes.length === 2 && 
    targetNotes[0].textContent === `Charge pending confirmation from BlueSnap (Charge ID: ${vars.transaction_id}). Order status changed from Pending payment to On hold.` &&
    targetNotes[1].textContent === `Bluesnap transaction complete (Transaction ID: ${vars.transaction_id})`
    ) 
{
    return true
} else {
    return false
}
 }, vars)).toBeTruthy();
  }
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let payment = `${vars.payment}`
let product = `${vars.product}`
let status = document.querySelector("#select2-order_status-container").textContent
return payment === "ach" && product === "subscription" && (status === 'Completed' || status === 'Processing') }, vars)) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); // Select all <p> elements inside <li class="note system-note"> under .note_content
const notes = Array.from<any>(document.querySelectorAll('li.note.system-note .note_content p'));

// Filter notes for the specific text content
const targetNotes = notes.filter(p => 
  p.textContent.includes('ACH Transaction approved') || 
  p.textContent.includes('BlueSnap ACH Declined') || 
  p.textContent.includes('Charge pending confirmation from BlueSnap') ||
  p.textContent.includes('Order status changed from On hold') ||
  p.textContent.includes('Bluesnap transaction complete') ||
  p.textContent.includes('Payment via ACH/ECP Transactions')
);

if (targetNotes.length === 4 && 
    (
        targetNotes[0].textContent === `Order status changed from On hold to ${vars.status}.` ||
        targetNotes[0].textContent === `Payment via ACH/ECP Transactions (${vars.transaction_id}).`
    ) && 
    targetNotes[1].textContent === `ACH Transaction approved via ${vars.labeIPN} request.` &&
    targetNotes[2].textContent === `Charge pending confirmation from BlueSnap (Charge ID: ${vars.transaction_id}). Order status changed from Pending payment to On hold.` &&
    targetNotes[3].textContent === `Bluesnap transaction complete (Transaction ID: ${vars.transaction_id})`
    ) 
{
    return true
} else {
    return false
}
 }, vars)).toBeTruthy();
  }
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let payment = `${vars.payment}`
let product = `${vars.product}`
let status = document.querySelector("#select2-order_status-container").textContent
return payment === "ach" && product === "subscription" && status === 'Failed' }, vars)) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); // Select all <p> elements inside <li class="note system-note"> under .note_content
const notes = Array.from<any>(document.querySelectorAll('li.note.system-note .note_content p'));

// Filter notes for the specific text content
const targetNotes = notes.filter(p => 
  p.textContent.includes('ACH Transaction approved') || 
  p.textContent.includes('BlueSnap ACH Declined') || 
  p.textContent.includes('Charge pending confirmation from BlueSnap') ||
  p.textContent.includes('Order status changed from On hold') ||
  p.textContent.includes('Bluesnap transaction complete') ||
  p.textContent.includes('Payment via ACH/ECP Transactions')
);

if (
    targetNotes.length === 3 && 
    targetNotes[0].textContent === `BlueSnap ACH Declined ${vars.labeIPN} request received. A chargeback has been created for this transaction. Reason: null – null. Order status changed from On hold to Failed.` && 
    targetNotes[1].textContent === `Charge pending confirmation from BlueSnap (Charge ID: ${vars.transaction_id}). Order status changed from Pending payment to On hold.` &&
    targetNotes[2].textContent === `Bluesnap transaction complete (Transaction ID: ${vars.transaction_id})`
    ) 
{
    return true
} else {
    return false
} }, vars)).toBeTruthy();
  }
}

// GI: "Clean emails" (6848c177e29526b3edf16cba)
export async function cleanEmails(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.extraFilter = `subject: ${vars.title ?? ''}`;
  await deletePlaygroundsEmail(page, vars);
  vars.extraFilter = ``;
}

// GI: "Clean Rate exchange Transient" (65cb8044d76b6bca5f5ebc36)
export async function cleanRateExchangeTransient(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.logs = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return new Promise(function (resolve, reject) {
  const url = `${vars.startUrl}` + 'wp-json/wc-automation-helper/wp-clear-transient?transient=wc_bluesnap_currency_rates';
  const username = `${vars.woo_user}`;
  const password = `${vars.woo_pass}`;
  let headers = new Headers();
  headers.set('Content-Type', 'application/json');
  headers.set('Authorization', 'Basic ' + btoa(username + ":" + password));
  fetch(url, {method:'POST', headers: headers})
  .then(function(response) {
    if (response.ok) {
      resolve(response.json())
    } else {
      resolve([])
    } 
  })
  }) }, vars);
  await page.waitForTimeout(5000);
}

// GI: "Clear Cache" (65cb6688d76b6bca5f578635)
export async function clearCache(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.waitForTimeout(10000);
  vars.logs = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return new Promise(function (resolve, reject) {
  const url = `${vars.startUrl}` + 'wp-json/wc-automation-helper/wp-clear-cache';
  const username = `${vars.woo_user}`;
  const password = `${vars.woo_pass}`;
  let headers = new Headers();
  headers.set('Content-Type', 'application/json');
  headers.set('Authorization', 'Basic ' + btoa(username + ":" + password));
  fetch(url, {method:'POST', headers: headers})
  .then(function(response) {
    if (response.ok) {
      resolve(response.json())
    } else {
      resolve([])
    } 
  })
  }) }, vars);
  await page.reload();
  await page.waitForLoadState('load');
}

// GI: "Complete pre-order with admin" (61df1930c305b67a97eeb564)
export async function completePreOrderWithAdmin(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.locator(`a[href="admin.php?page=wc-admin"] > .wp-menu-name`).first().hover();
  await page.locator(`xpath=//a[contains(text(), "Pre-Orders")]`).or(page.locator(`a[href="admin.php?page=wc_pre_orders"]`)).filter({ visible: true }).first().click({ force: true });
  await page.waitForLoadState('load');
  vars.nth = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const link = document.querySelector(`a[href*="post.php?post=${vars.orderNumber}"],a[href*="page=wc-orders&action=edit&id=${vars.orderNumber}"]`);

  if (!link) {
    console.log("Link not found");
    return;
  }

  const tr = link.closest('tr');
  if (!tr) {
    console.log("No <tr> found");
    return;
  }

  const nth = Array.from<any>(tr.parentNode.children).indexOf(tr) + 1;
  console.log(`tr is the ${nth} child → matches :nth-child(${nth})`);
  
  return nth }, vars);
  await extractDate(page, vars);
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return !!document.querySelector<HTMLButtonElement>('td.actions.column-actions > button[title="Complete pre-order"].button.complete-order > .button-text') }, vars)) {
    await page.locator(`tr:nth-of-type(${vars.nth ?? ''}) > td.actions.column-actions > button[title="Complete pre-order"].button.complete-order > .button-text`).filter({ visible: true }).first().click({ force: true });
  }
  try {
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return !!document.querySelector<HTMLButtonElement>('td.actions.column-actions > button[title="Complete pre-order"].button.complete-order > .button-text') }, vars)) {
      await expect(page.locator(`xpath=//button[contains(text(), "Complete pre-order")]`).or(page.locator(`#confirm-complete-btn`)).first()).toBeVisible();
    }
  } catch { /* optional step: assertElementVisible */ }
  try {
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return !!document.querySelector<HTMLButtonElement>('td.actions.column-actions > button[title="Complete pre-order"].button.complete-order > .button-text') }, vars)) {
      {
        const _lbl = page.locator(`label[for="confirm-complete-btn"]`).filter({ visible: true });
        if (await _lbl.count() > 0) { await _lbl.first().click(); }
        else { await page.locator(`xpath=//button[contains(text(), "Complete pre-order")]`).or(page.locator(`#confirm-complete-btn`)).filter({ visible: true }).first().click({ force: true }); }
      }
    }
  } catch { /* optional step: click */ }
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return !document.querySelector<HTMLButtonElement>('td.actions.column-actions > button[title="Complete pre-order"].button.complete-order > .button-text') }, vars)) {
    await page.locator(`tr:nth-of-type(${vars.nth ?? ''}) > th.check-column > input[name="order_id[]"][type="checkbox"]`).filter({ visible: true }).first().click({ force: true });
  }
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return !document.querySelector<HTMLButtonElement>('td.actions.column-actions > button[title="Complete pre-order"].button.complete-order > .button-text') }, vars)) {
    {
      const _lbl = page.locator(`label[for="bulk-action-selector-top"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#bulk-action-selector-top`).filter({ visible: true }).first().click({ force: true }); }
    }
  }
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return !document.querySelector<HTMLButtonElement>('td.actions.column-actions > button[title="Complete pre-order"].button.complete-order > .button-text') }, vars)) {
    try { await page.locator(`#bulk-action-selector-top`).first().fill(`complete`); } catch { await page.locator(`#bulk-action-selector-top`).first().selectOption(`complete`); }
  }
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return !document.querySelector<HTMLButtonElement>('td.actions.column-actions > button[title="Complete pre-order"].button.complete-order > .button-text') }, vars)) {
    {
      const _lbl = page.locator(`label[for="doaction"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#doaction`).filter({ visible: true }).first().click({ force: true }); }
    }
  }
}

// GI: "Create order for user by API" (62bf4dd15a1bf494e9033682)
export async function createOrderForUserByAPI(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.myOrder = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return new Promise(function (resolve, reject) {
  const username = `${vars.woo_user}`; 
  const password = `${vars.woo_pass}`; 
  const url = `${vars.startUrl}wp-json/wc/v3/orders/?customer_id=${vars.userId}`;
  const data = `{"currency":"USD","billing":{"first_name":"${vars.firstName}","last_name":"${vars.lastName}","company":"${vars.company}","address_1":"${vars.street}","address_2":"${vars.address2}","city":"${vars.city}","state":"FL","postcode":"${vars.zipCode}","country":"US","email":"${vars.email}","phone":"${vars.phone}"},"line_items":[{"product_id":${vars.productID},"quantity":1}]}`;
  let headers = new Headers();
  headers.set('Content-Type', 'application/json');
  headers.set('Authorization', 'Basic ' + btoa(username + ":" + password));
  fetch(url, {method:'POST',
      body: data,
      headers: headers,
      credentials: 'omit'
      })
  .then(function(response) {
    if (response.ok) {
    resolve(response.json())
    } else {
    reject(new Error('error'))
    } 
  })
}) }, vars);
  vars.total = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const jsonOrder = vars.myOrder
return Number(jsonOrder.total) }, vars);
  vars.orderNumber = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const jsonOrder = vars.myOrder
return jsonOrder.id }, vars);
}

// GI: "Customer Pay Pending order" (61d6e3e228dae1039a26a801)
export async function customerPayPendingOrder(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await extractDate(page, vars);
  await placeOrderButtonEnabled(page, vars);
  if ((() => { let _3dsSetting = vars['3dsSetting'];
let BlueSnapVs = vars.BlueSnapVs;
BlueSnapVs = BlueSnapVs.split('.');
let payment = vars.payment;
let payForOrder = vars.payForOrder

return (Number(BlueSnapVs[0]) >= 3 && Number(BlueSnapVs[1]) === 0) && 
        _3dsSetting !== "deactivated" &&
        payment === "cc" && payForOrder !== "yes" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const targetElement = document.querySelector('#place_order');
return targetElement.getAttribute('data-bluesnap') === 'submitButton' }, vars)).toBeTruthy();
  }
  if ((() => { let _3dsSetting = vars['3dsSetting'];
let BlueSnapVs = vars.BlueSnapVs;
BlueSnapVs = BlueSnapVs.split('.');
let payment = vars.payment;


return (Number(BlueSnapVs[0]) >= 3 && Number(BlueSnapVs[1]) >= 2) && 
        _3dsSetting !== "deactivated" &&
        payment === "cc" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const targetElement = document.querySelector('#place_order');
return targetElement.getAttribute('data-bluesnap') === 'submitButton' }, vars)).toBeTruthy();
  }
  if ((() => { let _3dsSetting = vars['3dsSetting'];
let BlueSnapVs = vars.BlueSnapVs;
BlueSnapVs = BlueSnapVs.split('.');
let payment = vars.payment;

return (Number(BlueSnapVs[0]) >= 3 && Number(BlueSnapVs[1]) >= 0) && 
(_3dsSetting === "deactivated" ||
        payment !== "cc") })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const targetElement = document.querySelector('#place_order');
return targetElement.getAttribute('data-bluesnap') === null }, vars)).toBeTruthy();
  }
  {
    const _lbl = page.locator(`label[for="place_order"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`xpath=//button[contains(text(), "Pay for order")]`).or(page.locator(`#place_order`)).filter({ visible: true }).first().click({ force: true }); }
  }
  await blockUI(page, vars);
  await page.waitForLoadState('load');
  if ((() => { const pay = vars.pay
return pay === "later" })()) {
    await expect(page.locator(`.woocommerce-notice`).first()).toContainText(`Your pre-order has been received. You will be prompted for payment for your order when your pre-order is released on January 1, 2099. Your order details are shown below for your reference.`);
  }
  if ((() => { const pay = vars.pay
return pay === "upfront" })()) {
    await expect(page.locator(`.woocommerce-notice`).first()).toContainText(`Thank you. Your order has been received.`);
  }
  await getWooOrderDetails(page, vars);
  await expect(page.locator(`.method > strong`).first()).toContainText(`${vars.paymentMethodTitle ?? ''}`);
  if ((() => { let scenario = vars.scenario
return scenario != 'multi-currency' })()) {
    await expect(page.locator(`tr:nth-of-type(4) > td`).first()).toContainText(`${vars.paymentMethodTitle ?? ''}`);
  }
  if ((() => { let scenario = vars.scenario
return scenario === 'multi-currency' })()) {
    await expect(page.locator(`tr:nth-of-type(5) > td`).first()).toContainText(`${vars.paymentMethodTitle ?? ''}`);
  }
  if ((() => { let scenario = vars.scenario
return scenario === 'multi-currency' })()) {
    await changeCurrencyFormat(page, vars);
  }
  if ((() => { let scenario = vars.scenario
let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
const blog = vars.blog

return  (
            (blueSnapVs[0] >= 3 && blueSnapVs[1] >= 2 && !blog.includes('block'))
            ||
            (blueSnapVs[0] >= 3 && blueSnapVs[1] >= 5 && blog.includes('block'))
        )
        &&
        scenario === 'multi-currency' })()) {
    await verifyCurrencyOnTheAfterPlaceOrder(page, vars);
  }
  await page.locator(`.nav-menu > .page_item > a[href*="/my-account/"]`).filter({ visible: true }).first().click({ force: true });
  await page.locator(`.woocommerce-MyAccount-navigation-link > a[href*="/my-account/orders/"]`).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`tr.woocommerce-orders-table__row.order:nth-of-type(1) > td.woocommerce-orders-table__cell.woocommerce-orders-table__cell-order-status`).first()).toContainText(`${vars.status ?? ''}`);
  await page.locator(`a[href*="/my-account/view-order/${vars.orderNumber ?? ''}/"].woocommerce-button`).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`mark.order-status`).first()).toContainText(`${vars.status ?? ''}`);
  if ((() => { let scenario = vars.scenario
return scenario != 'multi-currency' })()) {
    await expect(page.locator(`tr:nth-of-type(4) > td`).first()).toContainText(`${vars.paymentMethodTitle ?? ''}`);
  }
  if ((() => { let scenario = vars.scenario
return scenario === 'multi-currency' })()) {
    await expect(page.locator(`tr:nth-of-type(5) > td`).first()).toContainText(`${vars.paymentMethodTitle ?? ''}`);
  }
  if ((() => { let scenario = vars.scenario
let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
const blog = vars.blog

return  (
            (blueSnapVs[0] >= 3 && blueSnapVs[1] >= 2 && !blog.includes('block'))
            ||
            (blueSnapVs[0] >= 3 && blueSnapVs[1] >= 5 && blog.includes('block'))
        )
        &&
        scenario === 'multi-currency' })()) {
    await verifyCurrencyOnTheAfterPlaceOrder(page, vars);
  }
}

// GI: "Customer Pay Pending order decline transaction" (61decfe2c305b67a97b43542)
export async function customerPayPendingOrderDeclineTransaction(page: Page, vars: Record<string, string> = {}): Promise<void> {
  {
    const _lbl = page.locator(`label[for="place_order"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`xpath=//button[contains(text(), "Pay for order")]`).or(page.locator(`#place_order`)).filter({ visible: true }).first().click({ force: true }); }
  }
  await blockUI(page, vars);
  await expect(page.locator(`.woocommerce-error`).or(page.locator(`.wc-block-components-notice-banner.is-error`)).first()).toHaveText(`This is the new error message for 14002|INCORRECT_INFORMATION`);
}

// GI: "Deactivate PayPal" (64f5cbcbe0dfa97aa9f14eb0)
export async function deactivatePayPal(page: Page, vars: Record<string, string> = {}): Promise<void> {
  try {
    vars.pluginLog = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return new Promise(function (resolve, reject) {
  const username = "demouser"; 
  const password = `${vars.wp_api_pass}`; 
  const url = `${vars.startUrl}wp-json/wp/v2/plugins/woocommerce-paypal-payments/woocommerce-paypal-payments?status=inactive`;
  let headers = new Headers();
  headers.set('Content-Type', 'application/json');
  headers.set('Authorization', 'Basic ' + btoa(username + ":" + password));
  fetch(url, {method:'POST',
      headers: headers, credentials: 'omit'
      })
  .then(function(response) {
    if (response.ok) {
    resolve(response.json())
    } else {
    reject(new Error('error'))
    } 
  })
}) }, vars);
  } catch { /* optional step: extractEval */ }
}

// GI: "Deactivate Pre-order" (65cb94e7d76b6bca5f65f778)
export async function deactivatePreOrder(page: Page, vars: Record<string, string> = {}): Promise<void> {
  try {
    vars.pluginLog = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return new Promise(function (resolve, reject) {
  const username = "demouser"; 
  const password = `${vars.wp_api_pass}`; 
  const url = `${vars.startUrl}wp-json/wp/v2/plugins/woocommerce-pre-orders/woocommerce-pre-orders?status=inactive`;
  let headers = new Headers();
  headers.set('Content-Type', 'application/json');
  headers.set('Authorization', 'Basic ' + btoa(username + ":" + password));
  fetch(url, {method:'POST',
      headers: headers, credentials: 'omit'
      })
  .then(function(response) {
    if (response.ok) {
    resolve(response.json())
    } else {
    reject(new Error('error'))
    } 
  })
}) }, vars);
  } catch { /* optional step: extractEval */ }
}

// GI: "Default Currency on site" (65a15a286e489be5285930c5)
export async function defaultCurrencyOnSite(page: Page, vars: Record<string, string> = {}): Promise<void> {
  if ((() => { let currency = vars.currency
return currency ==="EUR" })()) {
    vars.decimals = `2`;
  }
  if ((() => { let currency = vars.currency
return currency ==="EUR" })()) {
    vars.position = `right_space`;
  }
  if ((() => { let currency = vars.currency
return currency ==="EUR" })()) {
    vars.locale = `de-DE`;
  }
  if ((() => { let currency = vars.currency
return currency ==="GBP" })()) {
    vars.decimals = `2`;
  }
  if ((() => { let currency = vars.currency
return currency ==="GBP" })()) {
    vars.position = `left`;
  }
  if ((() => { let currency = vars.currency
return currency ==="GBP" })()) {
    vars.locale = `en-GB`;
  }
  if ((() => { let currency = vars.currency
return currency ==="JPY" })()) {
    vars.decimals = `0`;
  }
  if ((() => { let currency = vars.currency
return currency ==="JPY" })()) {
    vars.position = `left`;
  }
  if ((() => { let currency = vars.currency
return currency ==="JPY" })()) {
    vars.locale = `en-US`;
  }
  if ((() => { let currency = vars.currency
return currency ==="USD" })()) {
    vars.decimals = `2`;
  }
  if ((() => { let currency = vars.currency
return currency ==="USD" })()) {
    vars.position = `left`;
  }
  if ((() => { let currency = vars.currency
return currency ==="USD" })()) {
    vars.locale = `en-US`;
  }
  vars.parts = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const formatter = new Intl.NumberFormat(`${vars.locale}`, {
    style: 'currency',
    currency: `${vars.currency}`,
    minimumFractionDigits: `${vars.currency}` === 'JPY' ? 0 : 2
  });

const parts = formatter.formatToParts(1000.1);

return parts }, vars);
}

// GI: "Delete All Playgrounds Email" (68430ccc6fbaa3266048629d)
export async function deleteAllPlaygroundsEmail(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.Title = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); 
  // Split the string by underscores
  let parts = `${vars.blog}`.split('_');
  
  // Capitalize first letter of each word and join with spaces
  let formatted = parts
    .map((part, index) => {
      // Skip capitalization for the last part if it's a number
      if (index === parts.length - 1 && !isNaN(part)) {
        return part;
      }
      // Capitalize first letter
      return part.charAt(0).toUpperCase() + part.slice(1).toLowerCase();
    })
    .join(' ');
  
  return formatted; }, vars);
  try {
    await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') });  return new Promise(async (resolve, reject) => {   
    const data = new URLSearchParams();
    data.append('action', 'delete_mail');
    //data.append('email', `${vars.playgroundsEmail}`);
    data.append('extraFilter', `subject:"${vars.Title}"`);
    
    const response = await fetch(ajax_object.ajax_url, {
        method: 'POST',
        body: data,
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    });
    
    const result = await response.json();
    
    if (!result.success) {
        console.error('Failed to delete mail');
        reject();
    } else {
        console.log('Mails deleted successfully');
        resolve()
    }
}) }, vars);
  } catch { /* optional step: eval */ }
}

// GI: "Delete CC from Menu" (617ffdd800b8571b399c1646)
export async function deleteCCFromMenu(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.locator(`.woocommerce-MyAccount-navigation-link > a[href*="/my-account/payment-methods/"]`).filter({ visible: true }).first().click({ force: true });
  await extractDate(page, vars);
  await page.locator(`xpath=//a[contains(text(), "Delete")]`).or(page.locator(`a[href*="/my-account/delete-payment-method/221/?_wpnonce="]`)).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`.woocommerce-message`).or(page.locator(`.wc-block-components-notice-banner.is-success`)).first()).toContainText(`Payment method deleted.`);
}

// GI: "Delete Playgrounds Email" (66f2b775a2e33ca5c405a1f2)
export async function deletePlaygroundsEmail(page: Page, vars: Record<string, string> = {}): Promise<void> {
  if (vars.extraFilter === '') {
    vars.extraFilter = ``;
  }
  try {
    await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') });  return new Promise(async (resolve, reject) => {   
    const data = new URLSearchParams();
    data.append('action', 'delete_mail');
    data.append('email', `${vars.playgroundsEmail}`);
    data.append('extraFilter', `${vars.extraFilter}`);
    
    const response = await fetch(ajax_object.ajax_url, {
        method: 'POST',
        body: data,
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    });
    
    const result = await response.json();
    
    if (!result.success) {
        console.error('Failed to delete mail');
        reject();
    } else {
        console.log('Mail deleted successfully');
        resolve()
    }
}) }, vars);
  } catch { /* optional step: eval */ }
}

// GI: "Extract date" (6182913d23071a6a858762c3)
export async function extractDate(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.payDate = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let date = new Date();
date = date.getFullYear()+'-'+('0'+(date.getMonth()+1)).slice(-2)+'-'+('0'+date.getDate()).slice(-2)+'T'+('0'+date.getUTCHours()).slice(-2)+":"+('0'+date.getMinutes()).slice(-2)+":"+('0'+date.getSeconds()).slice(-2);

return date }, vars);
}

// GI: "Extract four digits of CC" (60d0e066fd5d095fc94397bd)
export async function extractFourDigitsOfCC(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.fourDigits = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let card = `${vars.CCard}`
let four = card.substr(card.length - 4);
return four }, vars);
}

// GI: "extract pftoken" (61e03cdec885adb93decd9fc)
export async function extractPftoken(page: Page, vars: Record<string, string> = {}): Promise<void> {
  try {
    vars.bluesnap_gateway_general_params = ((await page.locator(`script#woocommerce-bluesnap-gateway-general-js-extra`).textContent()) ?? '').trim();
  } catch { /* optional step: extract */ }
  try {
    vars.pfToken = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); vars.bluesnap_gateway_general_params
return woocommerce_bluesnap_gateway_general_params.token }, vars);
  } catch { /* optional step: extractEval */ }
}

// GI: "Extract user from email" (62e7eb69e3896e4c0d0ec65b)
export async function extractUserFromEmail(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.userEmailExtract = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const regex = /\w+\+\w+[^@]/g;
const str = `${vars.email}`;
let m;
m = regex.exec(str)
return m[0] }, vars);
  await page.goto(`https://email.ghostinspector.com/${vars.userEmailExtract ?? ''}`);
  await page.waitForLoadState('load');
  await page.waitForTimeout(30000);
}

// GI: "Fill ACH Info" (6213d6e15f85360d3f13d6e4)
export async function fillACHInfo(page: Page, vars: Record<string, string> = {}): Promise<void> {
  {
    const _lbl = page.locator(`label[for="payment_method_bluesnap_ach"]`).or(page.locator(`label[for="radio-control-wc-payment-method-options-bluesnap_ach"]`)).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#payment_method_bluesnap_ach`).or(page.locator(`#radio-control-wc-payment-method-options-bluesnap_ach`)).filter({ visible: true }).first().click({ force: true }); }
  }
  try { await page.locator(`#bluesnap_ach-account-number`).first().fill(`${vars.accountNumber ?? ''}`); } catch { await page.locator(`#bluesnap_ach-account-number`).first().selectOption(`${vars.accountNumber ?? ''}`); }
  try { await page.locator(`#bluesnap_ach-routing-number`).first().fill(`${vars.routingNumber ?? ''}`); } catch { await page.locator(`#bluesnap_ach-routing-number`).first().selectOption(`${vars.routingNumber ?? ''}`); }
  if ((() => { let test = vars.test
return test != "002-011" })()) {
    try { await page.locator(`#bluesnap_ach-account-type`).first().fill(`consumer-checking`); } catch { await page.locator(`#bluesnap_ach-account-type`).first().selectOption(`consumer-checking`); }
  }
  if ((() => { let test = vars.test
return test === "002-011" })()) {
    try { await page.locator(`#bluesnap_ach-account-type`).first().fill(`corporate-checking`); } catch { await page.locator(`#bluesnap_ach-account-type`).first().selectOption(`corporate-checking`); }
  }
  if ((() => { let test = vars.test
return test != "002-012" && test != "002-017" && test != "002-022" && test != "002-012-B" })()) {
    {
      const _lbl = page.locator(`label[for="bluesnap_ach-user-consent"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#bluesnap_ach-user-consent`).filter({ visible: true }).first().click({ force: true }); }
    }
  }
}

// GI: "Fill Billing details" (621d1feff2cc49562ea7c3eb)
export async function fillBillingDetails(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.locator(`xpath=//a[contains(text(), "Addresses")]`).or(page.locator(`.woocommerce-MyAccount-navigation-link > a[href*="/my-account/edit-address/"]`)).filter({ visible: true }).first().click({ force: true });
  await page.locator(`a[href*="/my-account/edit-address/billing/"]`).filter({ visible: true }).first().click({ force: true });
  try { await page.locator(`#billing_first_name`).first().fill(`${vars.firstName ?? ''}`); } catch { await page.locator(`#billing_first_name`).first().selectOption(`${vars.firstName ?? ''}`); }
  try { await page.locator(`#billing_last_name`).first().fill(`${vars.lastName ?? ''}`); } catch { await page.locator(`#billing_last_name`).first().selectOption(`${vars.lastName ?? ''}`); }
  await page.locator(`xpath=//span[contains(text(), "Select a country / region…")]`).or(page.locator(`#select2-billing_country-container > span`)).filter({ visible: true }).first().click({ force: true });
  try { await page.locator(`span > span:nth-of-type(1) > input[type="text"]`).first().fill(`United States`); } catch { await page.locator(`span > span:nth-of-type(1) > input[type="text"]`).first().selectOption(`United States`); }
  await page.keyboard.press('Enter');
  try { await page.locator(`#billing_address_1`).first().fill(`${vars.street ?? ''}`); } catch { await page.locator(`#billing_address_1`).first().selectOption(`${vars.street ?? ''}`); }
  try { await page.locator(`#billing_address_2`).first().fill(`${vars.address2 ?? ''}`); } catch { await page.locator(`#billing_address_2`).first().selectOption(`${vars.address2 ?? ''}`); }
  try { await page.locator(`#billing_city`).first().fill(`${vars.city ?? ''}`); } catch { await page.locator(`#billing_city`).first().selectOption(`${vars.city ?? ''}`); }
  await page.locator(`xpath=//span[contains(text(), "Select an option…")]`).or(page.locator(`#select2-billing_state-container > span`)).filter({ visible: true }).first().click({ force: true });
  try { await page.locator(`span > span:nth-of-type(1) > input[type="text"]`).first().fill(`Florida`); } catch { await page.locator(`span > span:nth-of-type(1) > input[type="text"]`).first().selectOption(`Florida`); }
  await page.keyboard.press('Enter');
  try { await page.locator(`#billing_postcode`).first().fill(`${vars.zipCode ?? ''}`); } catch { await page.locator(`#billing_postcode`).first().selectOption(`${vars.zipCode ?? ''}`); }
  try { await page.locator(`#billing_phone`).first().fill(`${vars.phone ?? ''}`); } catch { await page.locator(`#billing_phone`).first().selectOption(`${vars.phone ?? ''}`); }
  await page.locator(`xpath=//button[contains(text(), "Save address")]`).or(page.locator(`button[name="save_address"]`)).filter({ visible: true }).first().click({ force: true });
  await page.locator(`xpath=//a[contains(text(), "Edit Shipping address")]`).or(page.locator(`a[href*="/my-account/edit-address/shipping/"]`)).filter({ visible: true }).first().click({ force: true });
  try { await page.locator(`#shipping_first_name`).first().fill(`${vars.firstName ?? ''}`); } catch { await page.locator(`#shipping_first_name`).first().selectOption(`${vars.firstName ?? ''}`); }
  try { await page.locator(`#shipping_last_name`).first().fill(`${vars.lastName ?? ''}`); } catch { await page.locator(`#shipping_last_name`).first().selectOption(`${vars.lastName ?? ''}`); }
  await page.locator(`xpath=//span[contains(text(), "Select a country / region…")]`).or(page.locator(`#select2-shipping_country-container > span`)).filter({ visible: true }).first().click({ force: true });
  try { await page.locator(`span > span:nth-of-type(1) > input[type="text"]`).first().fill(`United States`); } catch { await page.locator(`span > span:nth-of-type(1) > input[type="text"]`).first().selectOption(`United States`); }
  await page.keyboard.press('Enter');
  try { await page.locator(`#shipping_address_1`).first().fill(`${vars.street ?? ''}`); } catch { await page.locator(`#shipping_address_1`).first().selectOption(`${vars.street ?? ''}`); }
  try { await page.locator(`#shipping_address_2`).first().fill(`${vars.address2 ?? ''}`); } catch { await page.locator(`#shipping_address_2`).first().selectOption(`${vars.address2 ?? ''}`); }
  try { await page.locator(`#shipping_city`).first().fill(`${vars.city ?? ''}`); } catch { await page.locator(`#shipping_city`).first().selectOption(`${vars.city ?? ''}`); }
  await page.locator(`xpath=//span[contains(text(), "Select an option…")]`).or(page.locator(`#select2-shipping_state-container > span`)).filter({ visible: true }).first().click({ force: true });
  try { await page.locator(`span > span:nth-of-type(1) > input[type="text"]`).first().fill(`Florida`); } catch { await page.locator(`span > span:nth-of-type(1) > input[type="text"]`).first().selectOption(`Florida`); }
  await page.keyboard.press('Enter');
  try { await page.locator(`#shipping_postcode`).first().fill(`${vars.zipCode ?? ''}`); } catch { await page.locator(`#shipping_postcode`).first().selectOption(`${vars.zipCode ?? ''}`); }
  await page.locator(`xpath=//button[contains(text(), "Save address")]`).or(page.locator(`button[name="save_address"]`)).filter({ visible: true }).first().click({ force: true });
}

// GI: "Fill CC Info - 2.6.x" (622f38756f3ed7a04da7918e)
export async function fillCCInfo26X(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.waitForTimeout(10000);
  await blockUI(page, vars);
  await expect(page.locator(`.wc_payment_method.payment_method_bluesnap > label`).or(page.locator(`.woocommerce-PaymentMethod.payment_method_bluesnap > label`)).or(page.locator(`#radio-control-wc-payment-method-options-bluesnap__label > span`)).or(page.locator(`#payment_method_bluesnap`)).first()).toContainText(`Credit/Debit Card`);
  {
    const _lbl = page.locator(`label[for="payment_method_bluesnap"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`.wc_payment_method.payment_method_bluesnap > label`).or(page.locator(`.woocommerce-PaymentMethod.payment_method_bluesnap > label`)).or(page.locator(`#payment_method_bluesnap`)).or(page.locator(`#radio-control-wc-payment-method-options-bluesnap__label > span`)).filter({ visible: true }).first().click({ force: true }); }
  }
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); 
const element = document.querySelector('.payment_box.payment_method_bluesnap > p:first-of-type');

return element !== null && element !== undefined 
 }, vars)) {
    await expect(page.locator(`.payment_box.payment_method_bluesnap > p:first-of-type`).first()).toHaveText(`Pay using your Credit/Debit Card`);
  }
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector('#radio-control-wc-payment-method-options-bluesnap__content');

return element !== null && element !== undefined     }, vars)) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector('#radio-control-wc-payment-method-options-bluesnap__content');
const text = element.childNodes[0].textContent.trim();

return text === "Pay using your Credit/Debit Card" }, vars)).toBeTruthy();
  }
  await expect(page.locator(`.payment_box.payment_method_bluesnap > p:first-of-type`).or(page.locator(`#radio-control-wc-payment-method-options-bluesnap__content`)).first()).toBeVisible();
  await page.locator(`iframe#bluesnap-hosted-iframe-ccn #ccn`).filter({ visible: true }).first().click({ force: true });
  await blockUI(page, vars);
  await page.waitForTimeout(2500);
  try { await page.locator(`iframe#bluesnap-hosted-iframe-ccn #ccn`).first().fill(`${vars.CCard ?? ''}`); } catch { await page.locator(`iframe#bluesnap-hosted-iframe-ccn #ccn`).first().selectOption(`${vars.CCard ?? ''}`); }
  if ((() => { let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
return (Number(blueSnapVs[0]) == 2 && Number(blueSnapVs[1]) == 6) || Number(blueSnapVs[0]) >= 3 })()) {
    {
      let _ok = false;
      if (!_ok) { try { await page.locator(`iframe#bluesnap-hosted-iframe-exp #exp`).first().click({ force: true }); _ok = true; } catch {} }
      if (!_ok) { try { await page.locator(`iframe[id="bluesnap-hosted-iframe-exp"]`).first().contentFrame().locator(`input[id="exp"]`).first().click({ force: true }); _ok = true; } catch {} }
      if (!_ok) throw new Error('No clickable candidate matched');
    }
  }
  if ((() => { let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
return (Number(blueSnapVs[0]) == 2 && Number(blueSnapVs[1]) == 6) || Number(blueSnapVs[0]) >= 3 })()) {
    try { await page.locator(`iframe#bluesnap-hosted-iframe-exp #exp`).or(page.locator(`iframe[id="bluesnap-hosted-iframe-exp"]`).first().contentFrame().locator(`input[id="exp"]`)).first().fill(`${vars.month ?? ''}${vars.year ?? ''}`); } catch { await page.locator(`iframe#bluesnap-hosted-iframe-exp #exp`).or(page.locator(`iframe[id="bluesnap-hosted-iframe-exp"]`).first().contentFrame().locator(`input[id="exp"]`)).first().selectOption(`${vars.month ?? ''}${vars.year ?? ''}`); }
  }
  if ((() => { let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
return Number(blueSnapVs[0]) == 2 && Number(blueSnapVs[1]) == 5 })()) {
    await page.locator(`iframe#bluesnap-hosted-iframe-exp #month`).filter({ visible: true }).first().click({ force: true });
  }
  if ((() => { let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
return Number(blueSnapVs[0]) == 2 && Number(blueSnapVs[1]) == 5 })()) {
    try { await page.locator(`iframe#bluesnap-hosted-iframe-exp #month`).first().fill(`${vars.month ?? ''}`); } catch { await page.locator(`iframe#bluesnap-hosted-iframe-exp #month`).first().selectOption(`${vars.month ?? ''}`); }
  }
  if ((() => { let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
return Number(blueSnapVs[0]) == 2 && Number(blueSnapVs[1]) == 5 })()) {
    await page.locator(`iframe#bluesnap-hosted-iframe-exp #year`).filter({ visible: true }).first().click({ force: true });
  }
  if ((() => { let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
return Number(blueSnapVs[0]) == 2 && Number(blueSnapVs[1]) == 5 })()) {
    try { await page.locator(`iframe#bluesnap-hosted-iframe-exp #year`).first().fill(`${vars.year ?? ''}`); } catch { await page.locator(`iframe#bluesnap-hosted-iframe-exp #year`).first().selectOption(`${vars.year ?? ''}`); }
  }
  await page.locator(`iframe#bluesnap-hosted-iframe-cvv #cvv`).filter({ visible: true }).first().click({ force: true });
  try { await page.locator(`iframe#bluesnap-hosted-iframe-cvv #cvv`).first().fill(`${vars.cvv ?? ''}`); } catch { await page.locator(`iframe#bluesnap-hosted-iframe-cvv #cvv`).first().selectOption(`${vars.cvv ?? ''}`); }
}

// GI: "Fill CC Info add new one (already present other CC) - 2.6.x" (622f38c96f3ed7a04da7cb6a)
export async function fillCCInfoAddNewOneAlreadyPresentOtherCC26X(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.locator(`input#wc-bluesnap-payment-token-new`).or(page.locator(`input#radio-control-wc-payment-method-options-bluesnap`)).filter({ visible: true }).first().click({ force: true });
  await blockUI(page, vars);
  await page.locator(`iframe#bluesnap-hosted-iframe-ccn #ccn`).filter({ visible: true }).first().click({ force: true });
  try { await page.locator(`iframe#bluesnap-hosted-iframe-ccn #ccn`).first().fill(`${vars.CCard ?? ''}`); } catch { await page.locator(`iframe#bluesnap-hosted-iframe-ccn #ccn`).first().selectOption(`${vars.CCard ?? ''}`); }
  if ((() => { let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
return (Number(blueSnapVs[0]) == 2 && Number(blueSnapVs[1]) == 6) || Number(blueSnapVs[0]) >= 3 })()) {
    await page.locator(`iframe#bluesnap-hosted-iframe-exp #exp`).filter({ visible: true }).first().click({ force: true });
  }
  if ((() => { let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
return (Number(blueSnapVs[0]) == 2 && Number(blueSnapVs[1]) == 6) || Number(blueSnapVs[0]) >= 3 })()) {
    try { await page.locator(`iframe#bluesnap-hosted-iframe-exp #exp`).first().fill(`${vars.month ?? ''}${vars.year ?? ''}`); } catch { await page.locator(`iframe#bluesnap-hosted-iframe-exp #exp`).first().selectOption(`${vars.month ?? ''}${vars.year ?? ''}`); }
  }
  if ((() => { let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
return Number(blueSnapVs[0]) == 2 && Number(blueSnapVs[1]) == 5 })()) {
    await page.locator(`iframe#bluesnap-hosted-iframe-exp #month`).filter({ visible: true }).first().click({ force: true });
  }
  if ((() => { let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
return Number(blueSnapVs[0]) == 2 && Number(blueSnapVs[1]) == 5 })()) {
    try { await page.locator(`iframe#bluesnap-hosted-iframe-exp #month`).first().fill(`${vars.month ?? ''}`); } catch { await page.locator(`iframe#bluesnap-hosted-iframe-exp #month`).first().selectOption(`${vars.month ?? ''}`); }
  }
  if ((() => { let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
return Number(blueSnapVs[0]) == 2 && Number(blueSnapVs[1]) == 5 })()) {
    await page.locator(`iframe#bluesnap-hosted-iframe-exp #year`).filter({ visible: true }).first().click({ force: true });
  }
  if ((() => { let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
return Number(blueSnapVs[0]) == 2 && Number(blueSnapVs[1]) == 5 })()) {
    try { await page.locator(`iframe#bluesnap-hosted-iframe-exp #year`).first().fill(`${vars.year ?? ''}`); } catch { await page.locator(`iframe#bluesnap-hosted-iframe-exp #year`).first().selectOption(`${vars.year ?? ''}`); }
  }
  await page.locator(`iframe#bluesnap-hosted-iframe-cvv #cvv`).filter({ visible: true }).first().click({ force: true });
  try { await page.locator(`iframe#bluesnap-hosted-iframe-cvv #cvv`).first().fill(`${vars.cvv ?? ''}`); } catch { await page.locator(`iframe#bluesnap-hosted-iframe-cvv #cvv`).first().selectOption(`${vars.cvv ?? ''}`); }
}

// GI: "Fill Checkout data - Create Account" (60abe99aef68371384fe86a7)
export async function fillCheckoutDataCreateAccount(page: Page, vars: Record<string, string> = {}): Promise<void> {
  try { await page.locator(`#billing_first_name`).or(page.locator(`#shipping-first_name`)).or(page.locator(`#billing-first_name`)).first().fill(`${vars.firstName ?? ''}`); } catch { await page.locator(`#billing_first_name`).or(page.locator(`#shipping-first_name`)).or(page.locator(`#billing-first_name`)).first().selectOption(`${vars.firstName ?? ''}`); }
  try { await page.locator(`#billing_last_name`).or(page.locator(`#shipping-last_name`)).or(page.locator(`#billing-last_name`)).first().fill(`${vars.lastName ?? ''}`); } catch { await page.locator(`#billing_last_name`).or(page.locator(`#shipping-last_name`)).or(page.locator(`#billing-last_name`)).first().selectOption(`${vars.lastName ?? ''}`); }
  try { await page.locator(`#billing_company`).or(page.locator(`#shipping-company`)).or(page.locator(`#billing-company`)).first().fill(`${vars.company ?? ''}`); } catch { await page.locator(`#billing_company`).or(page.locator(`#shipping-company`)).or(page.locator(`#billing-company`)).first().selectOption(`${vars.company ?? ''}`); }
  try { await page.locator(`#billing_address_1`).or(page.locator(`#shipping-address_1`)).or(page.locator(`#billing-address_1`)).first().fill(`${vars.street ?? ''}`); } catch { await page.locator(`#billing_address_1`).or(page.locator(`#shipping-address_1`)).or(page.locator(`#billing-address_1`)).first().selectOption(`${vars.street ?? ''}`); }
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector('.wc-block-components-address-form__address_2-toggle')

return element !== null && element !== undefined }, vars)) {
    await page.locator(`xpath=//span[contains(text(), "+ Add apartment, suite, etc.")]`).or(page.locator(`.wc-block-components-address-form__address_2-toggle`)).filter({ visible: true }).first().click({ force: true });
  }
  try { await page.locator(`#billing_address_2`).or(page.locator(`#shipping-address_2`)).or(page.locator(`#billing-address_2`)).first().fill(`${vars.address2 ?? ''}`); } catch { await page.locator(`#billing_address_2`).or(page.locator(`#shipping-address_2`)).or(page.locator(`#billing-address_2`)).first().selectOption(`${vars.address2 ?? ''}`); }
  try { await page.locator(`#billing_city`).or(page.locator(`#shipping-city`)).or(page.locator(`#billing-city`)).first().fill(`${vars.city ?? ''}`); } catch { await page.locator(`#billing_city`).or(page.locator(`#shipping-city`)).or(page.locator(`#billing-city`)).first().selectOption(`${vars.city ?? ''}`); }
  try { await page.locator(`#billing_postcode`).or(page.locator(`#shipping-postcode`)).or(page.locator(`#billing-postcode`)).first().fill(`${vars.zipCode ?? ''}`); } catch { await page.locator(`#billing_postcode`).or(page.locator(`#shipping-postcode`)).or(page.locator(`#billing-postcode`)).first().selectOption(`${vars.zipCode ?? ''}`); }
  try { await page.locator(`#billing_phone`).or(page.locator(`#shipping-phone`)).or(page.locator(`#billing-phone`)).first().fill(`${vars.phone ?? ''}`); } catch { await page.locator(`#billing_phone`).or(page.locator(`#shipping-phone`)).or(page.locator(`#billing-phone`)).first().selectOption(`${vars.phone ?? ''}`); }
  try { await page.locator(`#billing_email`).or(page.locator(`#email`)).first().fill(`${vars.email ?? ''}`); } catch { await page.locator(`#billing_email`).or(page.locator(`#email`)).first().selectOption(`${vars.email ?? ''}`); }
  {
    const _lbl = page.locator(`label[for="createaccount"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#createaccount`).or(page.locator(`.wc-block-checkout__create-account > label > input`)).filter({ visible: true }).first().click({ force: true }); }
  }
  {
    const _lbl = page.locator(`label[for="account_password"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#account_password`).or(page.locator(`.wc-block-components-address-form__password > input`)).filter({ visible: true }).first().click({ force: true }); }
  }
  try { await page.locator(`#account_password`).or(page.locator(`.wc-block-components-address-form__password > input`)).first().fill(`${vars.password ?? ''}`); } catch { await page.locator(`#account_password`).or(page.locator(`.wc-block-components-address-form__password > input`)).first().selectOption(`${vars.password ?? ''}`); }
  // TODO: unknown keypress value="50"
  await page.locator(`#account_password`).or(page.locator(`.wc-block-components-address-form__password > input`)).first().press('50');
  await page.locator(`#account_password`).or(page.locator(`.wc-block-components-address-form__password > input`)).first().press('Backspace');
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector<HTMLInputElement>('.wc-block-components-checkbox.wc-block-checkout__use-address-for-billing input')

if ( ! element ) {
    console.log('Element is not present')
    return false
} else if ( ! (element as HTMLInputElement).checked ) {
    console.log('Element is not checked')
    return true
} else {
    console.log('Element is checked')
    return false
}

 }, vars)) {
    await page.locator(`.wc-block-components-checkbox.wc-block-checkout__use-address-for-billing input`).filter({ visible: true }).first().click({ force: true });
  }
}

// GI: "Fill Checkout data - Not Creating Account" (60afae19c894e66ce1666874)
export async function fillCheckoutDataNotCreatingAccount(page: Page, vars: Record<string, string> = {}): Promise<void> {
  try { await page.locator(`#billing_first_name`).or(page.locator(`#shipping-first_name`)).or(page.locator(`#billing-first_name`)).first().fill(`${vars.firstName ?? ''}`); } catch { await page.locator(`#billing_first_name`).or(page.locator(`#shipping-first_name`)).or(page.locator(`#billing-first_name`)).first().selectOption(`${vars.firstName ?? ''}`); }
  try { await page.locator(`#billing_last_name`).or(page.locator(`#shipping-last_name`)).or(page.locator(`#billing-last_name`)).first().fill(`${vars.lastName ?? ''}`); } catch { await page.locator(`#billing_last_name`).or(page.locator(`#shipping-last_name`)).or(page.locator(`#billing-last_name`)).first().selectOption(`${vars.lastName ?? ''}`); }
  try { await page.locator(`#billing_company`).or(page.locator(`#shipping-company`)).or(page.locator(`#billing-company`)).first().fill(`${vars.company ?? ''}`); } catch { await page.locator(`#billing_company`).or(page.locator(`#shipping-company`)).or(page.locator(`#billing-company`)).first().selectOption(`${vars.company ?? ''}`); }
  try { await page.locator(`#billing_address_1`).or(page.locator(`#shipping-address_1`)).or(page.locator(`#billing-address_1`)).first().fill(`${vars.street ?? ''}`); } catch { await page.locator(`#billing_address_1`).or(page.locator(`#shipping-address_1`)).or(page.locator(`#billing-address_1`)).first().selectOption(`${vars.street ?? ''}`); }
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector('.wc-block-components-address-form__address_2-toggle')

return element !== null && element !== undefined }, vars)) {
    await page.locator(`xpath=//span[contains(text(), "+ Add apartment, suite, etc.")]`).or(page.locator(`.wc-block-components-address-form__address_2-toggle`)).filter({ visible: true }).first().click({ force: true });
  }
  try { await page.locator(`#billing_address_2`).or(page.locator(`#shipping-address_2`)).or(page.locator(`#billing-address_2`)).first().fill(`${vars.address2 ?? ''}`); } catch { await page.locator(`#billing_address_2`).or(page.locator(`#shipping-address_2`)).or(page.locator(`#billing-address_2`)).first().selectOption(`${vars.address2 ?? ''}`); }
  try { await page.locator(`#billing_city`).or(page.locator(`#shipping-city`)).or(page.locator(`#billing-city`)).first().fill(`${vars.city ?? ''}`); } catch { await page.locator(`#billing_city`).or(page.locator(`#shipping-city`)).or(page.locator(`#billing-city`)).first().selectOption(`${vars.city ?? ''}`); }
  try { await page.locator(`#billing_postcode`).or(page.locator(`#shipping-postcode`)).or(page.locator(`#billing-postcode`)).first().fill(`${vars.zipCode ?? ''}`); } catch { await page.locator(`#billing_postcode`).or(page.locator(`#shipping-postcode`)).or(page.locator(`#billing-postcode`)).first().selectOption(`${vars.zipCode ?? ''}`); }
  try { await page.locator(`#billing_phone`).or(page.locator(`#shipping-phone`)).or(page.locator(`#billing-phone`)).first().fill(`${vars.phone ?? ''}`); } catch { await page.locator(`#billing_phone`).or(page.locator(`#shipping-phone`)).or(page.locator(`#billing-phone`)).first().selectOption(`${vars.phone ?? ''}`); }
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return document.querySelector('#email, #billing_email').getAttribute('value') === '' }, vars)) {
    try { await page.locator(`#billing_email`).or(page.locator(`#email`)).first().fill(`${vars.email ?? ''}`); } catch { await page.locator(`#billing_email`).or(page.locator(`#email`)).first().selectOption(`${vars.email ?? ''}`); }
  }
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector<HTMLInputElement>('.wc-block-components-checkbox.wc-block-checkout__use-address-for-billing input')

if ( ! element ) {
    console.log('Element is not present')
    return false
} else if ( ! (element as HTMLInputElement).checked ) {
    console.log('Element is not checked')
    return true
} else {
    console.log('Element is checked')
    return false
} }, vars)) {
    await page.locator(`.wc-block-components-checkbox.wc-block-checkout__use-address-for-billing input`).filter({ visible: true }).first().click({ force: true });
  }
}

// GI: "Fill Checkout data - Subscription" (6182947023071a6a85887daf)
export async function fillCheckoutDataSubscription(page: Page, vars: Record<string, string> = {}): Promise<void> {
  try { await page.locator(`#billing_first_name`).or(page.locator(`#shipping-first_name`)).or(page.locator(`#billing-first_name`)).first().fill(`${vars.firstName ?? ''}`); } catch { await page.locator(`#billing_first_name`).or(page.locator(`#shipping-first_name`)).or(page.locator(`#billing-first_name`)).first().selectOption(`${vars.firstName ?? ''}`); }
  try { await page.locator(`#billing_last_name`).or(page.locator(`#shipping-last_name`)).or(page.locator(`#billing-last_name`)).first().fill(`${vars.lastName ?? ''}`); } catch { await page.locator(`#billing_last_name`).or(page.locator(`#shipping-last_name`)).or(page.locator(`#billing-last_name`)).first().selectOption(`${vars.lastName ?? ''}`); }
  try { await page.locator(`#billing_company`).or(page.locator(`#shipping-company`)).or(page.locator(`#billing-company`)).first().fill(`${vars.company ?? ''}`); } catch { await page.locator(`#billing_company`).or(page.locator(`#shipping-company`)).or(page.locator(`#billing-company`)).first().selectOption(`${vars.company ?? ''}`); }
  try { await page.locator(`#billing_address_1`).or(page.locator(`#shipping-address_1`)).or(page.locator(`#billing-address_1`)).first().fill(`${vars.street ?? ''}`); } catch { await page.locator(`#billing_address_1`).or(page.locator(`#shipping-address_1`)).or(page.locator(`#billing-address_1`)).first().selectOption(`${vars.street ?? ''}`); }
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector('.wc-block-components-address-form__address_2-toggle')

return element !== null && element !== undefined }, vars)) {
    await page.locator(`xpath=//span[contains(text(), "+ Add apartment, suite, etc.")]`).or(page.locator(`.wc-block-components-address-form__address_2-toggle`)).filter({ visible: true }).first().click({ force: true });
  }
  try { await page.locator(`#billing_address_2`).or(page.locator(`#shipping-address_2`)).or(page.locator(`#billing-address_2`)).first().fill(`${vars.address2 ?? ''}`); } catch { await page.locator(`#billing_address_2`).or(page.locator(`#shipping-address_2`)).or(page.locator(`#billing-address_2`)).first().selectOption(`${vars.address2 ?? ''}`); }
  try { await page.locator(`#billing_city`).or(page.locator(`#shipping-city`)).or(page.locator(`#billing-city`)).first().fill(`${vars.city ?? ''}`); } catch { await page.locator(`#billing_city`).or(page.locator(`#shipping-city`)).or(page.locator(`#billing-city`)).first().selectOption(`${vars.city ?? ''}`); }
  try { await page.locator(`#billing_postcode`).or(page.locator(`#shipping-postcode`)).or(page.locator(`#billing-postcode`)).first().fill(`${vars.zipCode ?? ''}`); } catch { await page.locator(`#billing_postcode`).or(page.locator(`#shipping-postcode`)).or(page.locator(`#billing-postcode`)).first().selectOption(`${vars.zipCode ?? ''}`); }
  try { await page.locator(`#billing_phone`).or(page.locator(`#shipping-phone`)).or(page.locator(`#billing-phone`)).first().fill(`${vars.phone ?? ''}`); } catch { await page.locator(`#billing_phone`).or(page.locator(`#shipping-phone`)).or(page.locator(`#billing-phone`)).first().selectOption(`${vars.phone ?? ''}`); }
  try { await page.locator(`#billing_email`).or(page.locator(`#email`)).first().fill(`${vars.email ?? ''}`); } catch { await page.locator(`#billing_email`).or(page.locator(`#email`)).first().selectOption(`${vars.email ?? ''}`); }
  try { await page.locator(`#account_password`).or(page.locator(`.wc-block-components-address-form__password > input`)).first().fill(`${vars.password ?? ''}`); } catch { await page.locator(`#account_password`).or(page.locator(`.wc-block-components-address-form__password > input`)).first().selectOption(`${vars.password ?? ''}`); }
  // TODO: unknown keypress value="50"
  await page.locator(`#account_password`).or(page.locator(`.wc-block-components-address-form__password > input`)).first().press('50');
  await page.locator(`#account_password`).or(page.locator(`.wc-block-components-address-form__password > input`)).first().press('Backspace');
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector<HTMLInputElement>('.wc-block-components-checkbox.wc-block-checkout__use-address-for-billing input')

if ( ! element ) {
    console.log('Element is not present')
    return false
} else if ( ! (element as HTMLInputElement).checked ) {
    console.log('Element is not checked')
    return true
} else {
    console.log('Element is checked')
    return false
}
 }, vars)) {
    await page.locator(`.wc-block-components-checkbox.wc-block-checkout__use-address-for-billing input`).filter({ visible: true }).first().click({ force: true });
  }
}

// GI: "Fill Checkout data - Subscription - logged user" (61fd32354789a4030c410012)
export async function fillCheckoutDataSubscriptionLoggedUser(page: Page, vars: Record<string, string> = {}): Promise<void> {
  try { await page.locator(`#billing_first_name`).or(page.locator(`#shipping-first_name`)).or(page.locator(`#billing-first_name`)).first().fill(`${vars.firstName ?? ''}`); } catch { await page.locator(`#billing_first_name`).or(page.locator(`#shipping-first_name`)).or(page.locator(`#billing-first_name`)).first().selectOption(`${vars.firstName ?? ''}`); }
  try { await page.locator(`#billing_last_name`).or(page.locator(`#shipping-last_name`)).or(page.locator(`#billing-last_name`)).first().fill(`${vars.lastName ?? ''}`); } catch { await page.locator(`#billing_last_name`).or(page.locator(`#shipping-last_name`)).or(page.locator(`#billing-last_name`)).first().selectOption(`${vars.lastName ?? ''}`); }
  try { await page.locator(`#billing_company`).or(page.locator(`#shipping-company`)).or(page.locator(`#billing-company`)).first().fill(`${vars.company ?? ''}`); } catch { await page.locator(`#billing_company`).or(page.locator(`#shipping-company`)).or(page.locator(`#billing-company`)).first().selectOption(`${vars.company ?? ''}`); }
  try { await page.locator(`#billing_address_1`).or(page.locator(`#shipping-address_1`)).or(page.locator(`#billing-address_1`)).first().fill(`${vars.street ?? ''}`); } catch { await page.locator(`#billing_address_1`).or(page.locator(`#shipping-address_1`)).or(page.locator(`#billing-address_1`)).first().selectOption(`${vars.street ?? ''}`); }
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector('.wc-block-components-address-form__address_2-toggle')

return element !== null && element !== undefined }, vars)) {
    await page.locator(`xpath=//span[contains(text(), "+ Add apartment, suite, etc.")]`).or(page.locator(`.wc-block-components-address-form__address_2-toggle`)).filter({ visible: true }).first().click({ force: true });
  }
  try { await page.locator(`#billing_address_2`).or(page.locator(`#shipping-address_2`)).or(page.locator(`#billing-address_2`)).first().fill(`${vars.address2 ?? ''}`); } catch { await page.locator(`#billing_address_2`).or(page.locator(`#shipping-address_2`)).or(page.locator(`#billing-address_2`)).first().selectOption(`${vars.address2 ?? ''}`); }
  try { await page.locator(`#billing_city`).or(page.locator(`#shipping-city`)).or(page.locator(`#billing-city`)).first().fill(`${vars.city ?? ''}`); } catch { await page.locator(`#billing_city`).or(page.locator(`#shipping-city`)).or(page.locator(`#billing-city`)).first().selectOption(`${vars.city ?? ''}`); }
  try { await page.locator(`#billing_postcode`).or(page.locator(`#shipping-postcode`)).or(page.locator(`#billing-postcode`)).first().fill(`${vars.zipCode ?? ''}`); } catch { await page.locator(`#billing_postcode`).or(page.locator(`#shipping-postcode`)).or(page.locator(`#billing-postcode`)).first().selectOption(`${vars.zipCode ?? ''}`); }
  try { await page.locator(`#billing_phone`).or(page.locator(`#shipping-phone`)).or(page.locator(`#billing-phone`)).first().fill(`${vars.phone ?? ''}`); } catch { await page.locator(`#billing_phone`).or(page.locator(`#shipping-phone`)).or(page.locator(`#billing-phone`)).first().selectOption(`${vars.phone ?? ''}`); }
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector<HTMLInputElement>('.wc-block-components-checkbox.wc-block-checkout__use-address-for-billing input')

if ( ! element ) {
    console.log('Element is not present')
    return false
} else if ( ! (element as HTMLInputElement).checked ) {
    console.log('Element is not checked')
    return true
} else {
    console.log('Element is checked')
    return false
}
 }, vars)) {
    await page.locator(`.wc-block-components-checkbox.wc-block-checkout__use-address-for-billing input`).filter({ visible: true }).first().click({ force: true });
  }
}

// GI: "Force renew order to fail" (61dc7e760698fd5fcf2fb68f)
export async function forceRenewOrderToFail(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.failedOrder = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return new Promise(function (resolve, reject) {
  const url = `${vars.startUrl}` + 'wp-json/wc-automation-helper/subscription-process-renewal/?subscription_id=`+${vars.subscriptionID}+`&force_fail=1';
  const username = `${vars.woo_user}`;
  const password = `${vars.woo_pass}`;
  let headers = new Headers();
  headers.set('Content-Type', 'application/json');
  headers.set('Authorization', 'Basic ' + btoa(username + ":" + password));
  fetch(url, {method:'POST', headers: headers, credentials: 'omit'})
  .then(function(response) {
    if (response.ok) {
      resolve(response.json())
    } else {
      reject(new Error('error'))
    } 
  })
  }) }, vars);
  vars.orderNumber = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const failedOrder = vars.failedOrder

return failedOrder.renewal_order_id }, vars);
}

// GI: "Get all Logs request response - /recurring/ondemand/{{subsID}}" (649f045682bf299ccbf28843)
export async function getAllLogsRequestResponseRecurringOndemandSubsID(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.logsAll = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return new Promise(function (resolve, reject) {
  const url = `${vars.startUrl}` + 'wp-json/wc-automation-helper/log-request-response-group/?datetime='+`${vars.payDate}&initial_request_slug=/recurring/ondemand/${vars.subsID}`;
  const username = `${vars.woo_user}`;
  const password = `${vars.woo_pass}`;
  let headers = new Headers();
  headers.set('Content-Type', 'application/json');
  headers.set('Authorization', 'Basic ' + btoa(username + ":" + password));
  fetch(url, {method:'GET', headers: headers, credentials: 'omit'})
  .then(function(response) {
    if (response.ok) {
      resolve(response.json())
    } else {
      reject([])
    } 
  })
  }) }, vars);
  if ((() => { let logsAll = vars.logsAll;
return logsAll.length === 0 })()) {
    vars.logsAll = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let date = `${vars.payDate}`
date = new Date(date);
date = new Date (date.getTime()+60000);
date = date.getFullYear()+'-'+('0'+(date.getMonth()+1)).slice(-2)+'-'+('0'+date.getDate()).slice(-2)+'T'+('0'+date.getUTCHours()).slice(-2)+":"+('0'+date.getMinutes()).slice(-2)+":"+('0'+date.getSeconds()).slice(-2);

return new Promise(function (resolve, reject) {
  const url = `${vars.startUrl}` + 'wp-json/wc-automation-helper/log-request-response-group/?datetime='+`${vars.payDate}&initial_request_slug=/recurring/ondemand/${vars.subsID}`;
  const username = `${vars.woo_user}`;
  const password = `${vars.woo_pass}`;
  let headers = new Headers();
  headers.set('Content-Type', 'application/json');
  headers.set('Authorization', 'Basic ' + btoa(username + ":" + password));
  fetch(url, {method:'GET', headers: headers, credentials: 'omit'})
  .then(function(response) {
    if (response.ok) {
      resolve(response.json())
    } else {
      reject([])
    } 
  })
 }) }, vars);
  }
}

// GI: "Get Alt transaction Details from Bluesnap" (6213d88e5f85360d3f1496b4)
export async function getAltTransactionDetailsFromBluesnap(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.transLogs = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return new Promise(function (resolve, reject) {
  const url = `${vars.startUrl}` + 'wp-json/wc-automation-helper/api-request/?url=alt-transactions/'+`${vars.transaction_id}`;
  const username = `${vars.woo_user}`;
  const password = `${vars.woo_pass}`;
  let headers = new Headers();
  headers.set('Content-Type', 'application/json');
  headers.set('Authorization', 'Basic ' + btoa(username + ":" + password));
  fetch(url, {method:'GET', headers: headers, credentials: 'omit',})
  .then(function(response) {
    if (response.ok) {
      resolve(response.json())
    } else {
      reject(new Error('error'))
    } 
  })
  }) }, vars);
  vars.vaultedShopperId = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const jsonOrder = vars.transLogs
return jsonOrder.vaultedShopperId }, vars);
  if ((() => { let product = vars.product
return product === "subscription" })()) {
    vars.subsID = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const jsonOrder = vars.transLogs
let subsID = jsonOrder.subscriptionId
return subsID }, vars);
  }
}

// GI: "Get BlueSnap version" (64e89beb4c06b965a964a55f)
export async function getBlueSnapVersion(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.pluginLog = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return new Promise(function (resolve, reject) {
  const username = "demouser"; 
  const password = `${vars.wp_api_pass}`; 
  const url = `${vars.startUrl}wp-json/wp/v2/plugins/bluesnap-payment-gateway-for-woocommerce/bluesnap-for-woocommerce`;
  let headers = new Headers();
  headers.set('Content-Type', 'application/json');
  headers.set('Authorization', 'Basic ' + btoa(username + ":" + password));
  fetch(url, {method:'GET',
      headers: headers,
      credentials: 'omit',
      })
  .then(function(response) {
    if (response.ok) {
    resolve(response.json())
    } else {
    reject(new Error('error'))
    } 
  })
}) }, vars);
  vars.BlueSnapVs = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const pluginLog = vars.pluginLog
return pluginLog.version }, vars);
}

// GI: "Get default currency price" (630e60c1e3896e4c0d45da3f)
export async function getDefaultCurrencyPrice(page: Page, vars: Record<string, string> = {}): Promise<void> {
  if ((() => { let currency = vars.currency
return currency === vars.defaultCurr || currency === "" })()) {
    vars.resultDefault = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let content = Array.from<any>(document.querySelectorAll(".price > span.woocommerce-Price-amount.amount, .price > ins > span.woocommerce-Price-amount.amount, .price > del > span.woocommerce-Price-amount.amount, .storefront-sticky-add-to-cart__content-price > span.woocommerce-Price-amount.amount, .storefront-sticky-add-to-cart__content-price > ins > span.woocommerce-Price-amount.amount, .storefront-sticky-add-to-cart__content-price > del > span.woocommerce-Price-amount.amount"))
let minicart = Array.from<any>(document.querySelectorAll(".cart-contents > span.woocommerce-Price-amount.amount"))
let subscription = Array.from<any>(document.querySelectorAll(".subscription-details > span.woocommerce-Price-amount.amount"))
let result = []

for (let i = 0; i < content.length; i++) {
        result.push(content[i].textContent);
    }
for (let i = 0; i < minicart.length; i++) {
        result.push(minicart[i].textContent);
    }
for (let i = 0; i < subscription.length; i++) {
        result.push(subscription[i].textContent);
    }
return result }, vars);
  }
  if ((() => { let currency = vars.currency
return currency !== vars.defaultCurr && currency !== "" })()) {
    vars.resultEUR = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let content = Array.from<any>(document.querySelectorAll(".bluesnap-multicurrency-html.currency-show > span.woocommerce-Price-amount.amount,.bluesnap-multicurrency-html.currency-show > ins > span.woocommerce-Price-amount.amount,.bluesnap-multicurrency-html.currency-show > del > span.woocommerce-Price-amount.amount, .storefront-sticky-add-to-cart__content-price > .bluesnap-multicurrency-html.currency-show > span.woocommerce-Price-amount.amount, .storefront-sticky-add-to-cart__content-price > .bluesnap-multicurrency-html.currency-show > ins > span.woocommerce-Price-amount.amount, .storefront-sticky-add-to-cart__content-price > .bluesnap-multicurrency-html.currency-show > del > span.woocommerce-Price-amount.amount"))
let minicart = Array.from<any>(document.querySelectorAll(".cart-contents > span.woocommerce-Price-amount.amount"))
let subscription = Array.from<any>(document.querySelectorAll(".subscription-details > span.woocommerce-Price-amount.amount"))
let result = []

for (let i = 0; i < content.length; i++) {
        result.push(content[i].textContent);
    }
for (let i = 0; i < minicart.length; i++) {
        result.push(minicart[i].textContent);
    }
for (let i = 0; i < subscription.length; i++) {
        result.push(subscription[i].textContent);
    }
return result }, vars);
  }
}

// GI: "Get default currency price from checkout page before paying" (637b658bd093ba4902f5bab6)
export async function getDefaultCurrencyPriceFromCheckoutPageBeforePaying(page: Page, vars: Record<string, string> = {}): Promise<void> {
  if ((() => { let test = vars.test
let checklogs = vars.checklogs
let freeTrial = vars.freeTrial
return test === "subscription" && checklogs != "upgrade" && freeTrial !="yes" })()) {
    vars.price = ((await page.locator(`tbody > tr > td > .subscription-price > .woocommerce-Price-amount.amount`).or(page.locator(`div.wc-block-components-order-summary-item__description > div.wc-block-cart-item__prices > span > span`)).or(page.locator(`div.wc-block-components-order-summary-item__description > div > div > div > span.wc-block-components-product-details__value > span`)).textContent()) ?? '').trim();
  }
  if ((() => { let test = vars.test
let checklogs = vars.checklogs
let freeTrial = vars.freeTrial
return test === "subscription" && checklogs != "upgrade" && freeTrial !="yes" })()) {
    vars.totalProd = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let content = Array.from<any>(document.querySelectorAll<HTMLTableRowElement>("tbody > tr > td > .subscription-price .woocommerce-Price-amount.amount, div.wc-block-components-order-summary-item__description .woocommerce-Price-amount.amount, div.wc-block-components-order-summary-item__description > div.wc-block-cart-item__prices > span > span, div.wc-block-components-order-summary-item__description > div > div > div > span.wc-block-components-product-details__value > span"))
let result = []
let n = 0
let totalProd = 0

const formatter = new Intl.NumberFormat(`${vars.locale}`, {
    style: 'currency',
    currency: `${vars.currency}`,
    minimumFractionDigits: `${vars.currency}` === 'JPY' ? 0 : 2
  });

const parts = formatter.formatToParts(1000.1);
let decimalSeparator;
if (`${vars.currency}` != 'JPY') {
 decimalSeparator = parts.find(part => part.type === 'decimal').value;
}
const groupSeparator = parts.find(part => part.type === 'group').value;
const curr = parts.find(part => part.type === 'currency').value;

for (let i = 0; i < content.length; i++) {
        result.push(content[i].textContent);
    }
    
while (result.length > n) {
    result[n] = result[n].replace(curr, '') // remove currency symbol
                         .replace(new RegExp(`\\${groupSeparator}`, 'g'), '') // remove group separators
                         .trim(); // remove whitespace
    if (`${vars.currency}` != 'JPY') {
        result[n] = result[n].replace(decimalSeparator, '.') // replace decimal separator
    }
    totalProd = totalProd + Number(result[n])
    n++
}
totalProd = Intl.NumberFormat(`${vars.locale}`, { style: 'currency', currency: `${vars.currency}`}).format(totalProd)

return totalProd }, vars);
  }
  if ((() => { let test = vars.test
let checklogs = vars.checklogs
let freeTrial = vars.freeTrial

return test === "subscription" && (checklogs === "upgrade" || freeTrial ==="yes") })()) {
    vars.price = ((await page.locator(`tbody > tr > td > .subscription-price > .woocommerce-Price-amount.amount`).or(page.locator(`div.wc-block-components-order-summary-item__description > div.wc-block-cart-item__prices > span > ins`)).or(page.locator(`div.wc-block-components-order-summary-item__description > div.wc-block-cart-item__prices > span > span`)).textContent()) ?? '').trim();
  }
  if ((() => { let test = vars.test
let checklogs = vars.checklogs
let freeTrial = vars.freeTrial

return test === "subscription" && (checklogs === "upgrade" || freeTrial ==="yes") })()) {
    vars.totalProd = ((await page.locator(`tbody > tr > td > .subscription-price > span > .woocommerce-Price-amount.amount`).or(page.locator(`div.wc-block-components-order-summary-item__description .woocommerce-Price-amount.amount`)).textContent()) ?? '').trim();
  }
  if ((() => { let test = vars.test
return test != "subscription" })()) {
    vars.totalProd = ((await page.locator(`tbody > tr > td.product-total > .woocommerce-Price-amount.amount`).or(page.locator(`div.wc-block-components-order-summary-item__description > span > ins`)).or(page.locator(`div.wc-block-components-order-summary-item__description > div> span > span`)).textContent()) ?? '').trim();
  }
  vars.subtotal = ((await page.locator(`tfoot > tr:nth-of-type(1) > td > .woocommerce-Price-amount.amount`).or(page.locator(`.wp-block-woocommerce-checkout-order-summary-subtotal-block .wc-block-components-totals-item__value`)).textContent()) ?? '').trim();
  if ((() => { let checklogs = vars.checklogs
let freeTrial = vars.freeTrial
return checklogs != "upgrade" && freeTrial !="yes" })()) {
    vars.shipping = ((await page.locator(`label[for="shipping_method_0_flat_rate1"] > .woocommerce-Price-amount.amount > bdi`).or(page.locator(`.wc-block-components-totals-shipping .wc-block-components-totals-item__value`)).textContent()) ?? '').trim();
  }
  if ((() => { let freeTrial = vars.freeTrial
return freeTrial !="yes" })()) {
    vars.discount = ((await page.locator(`tr.cart-discount:nth-of-type(2) > td > .woocommerce-Price-amount.amount`).or(page.locator(`.wc-block-components-totals-discount .wc-block-components-totals-item__value`)).textContent()) ?? '').trim();
  }
  if ((() => { let freeTrial = vars.freeTrial
return freeTrial !="yes" })()) {
    vars.discount = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return `${vars.discount}`.replace('-','') }, vars);
  }
  if ((() => { let checklogs = vars.checklogs
let freeTrial = vars.freeTrial
return checklogs != "upgrade" && freeTrial !="yes" && vars.includeTax === "no" })()) {
    vars.tax = ((await page.locator(`tr.tax-rate:nth-of-type(4) > td > .woocommerce-Price-amount.amount`).or(page.locator(`.wc-block-components-totals-taxes .wc-block-components-totals-item__value`)).textContent()) ?? '').trim();
  }
  if ((() => { let checklogs = vars.checklogs
let freeTrial = vars.freeTrial
return (checklogs === "upgrade" || freeTrial ==="yes") && vars.includeTax === "no" })()) {
    vars.tax = ((await page.locator(`tr.tax-rate:nth-of-type(3) > td > .woocommerce-Price-amount.amount`).or(page.locator(`.wc-block-components-totals-taxes .wc-block-components-totals-item__value`)).textContent()) ?? '').trim();
  }
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector('.wc-block-checkout')

return `${vars.includeTax}` === "yes" && !element }, vars)) {
    vars.tax = ((await page.locator(`tr.order-total:not(.recurring-total) small.includes_tax > span`).textContent()) ?? '').trim();
  }
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector('.wc-block-checkout')

return `${vars.includeTax}` === "yes" && !!element }, vars)) {
    vars.tax = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector('div.wc-block-components-totals-item__description > p.wc-block-components-totals-footer-item-tax')

let tax = element.textContent.replace(/[^\d.,]/g, '')
const currency = `${vars.currency}`

if ('EUR' === currency) {
    tax = Number(tax.replace(',','.'))
} else {
    tax = Number(tax)
}

return Intl.NumberFormat(`${vars.locale}`, { style: 'currency', currency: `${vars.currency}`}).format(tax)

 }, vars);
  }
  vars.total = ((await page.locator(`strong > .woocommerce-Price-amount.amount > bdi`).or(page.locator(`.wc-block-components-totals-footer-item .wc-block-components-totals-item__value`)).textContent()) ?? '').trim();
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector('.wc-block-checkout')
const test = `${vars.test}`

return !!element && test === "subscription" }, vars)) {
    await page.locator(`.wcs-recurring-totals-panel__details .wc-block-components-panel__button`).filter({ visible: true }).first().click({ force: true });
  }
  if ((() => { let test = vars.test
return test === "subscription" })()) {
    vars.recurringSubtotal = ((await page.locator(`tr.cart-subtotal.recurring-total > td > .woocommerce-Price-amount.amount`).or(page.locator(`div.wc-block-components-panel__content > div:nth-child(1) > div:nth-child(1) > span.wc-block-components-totals-item__value`)).textContent()) ?? '').trim();
  }
  if ((() => { let test = vars.test
let checklogs = vars.checklogs
let freeTrial = vars.freeTrial
return test === "subscription" && checklogs != "upgrade" && freeTrial !="yes" })()) {
    vars.recurringShipping = ((await page.locator(`tr.shipping.recurring-total > td > .woocommerce-Price-amount.amount`).or(page.locator(`.wcs-recurring-totals-panel__details .wc-block-components-totals-shipping .wc-block-components-totals-item__value`)).textContent()) ?? '').trim();
  }
  if ((() => { let checklogs = vars.checklogs
let freeTrial = vars.freeTrial
return checklogs === "upgrade" || freeTrial ==="yes" })()) {
    vars.recurringShipping = ((await page.locator(`li:nth-of-type(1) > label > .woocommerce-Price-amount.amount`).or(page.locator(`.wcs-recurring-totals-panel__details .wc-block-components-totals-shipping .wc-block-components-totals-item__value`)).textContent()) ?? '').trim();
  }
  if ((() => { let test = vars.test
return test === "subscription" })()) {
    vars.recurringDiscount = ((await page.locator(`tr.cart-discount.recurring-total > td > .woocommerce-Price-amount.amount`).or(page.locator(`.wcs-recurring-totals-panel__details .wc-block-components-totals-discount .wc-block-components-totals-item__value`)).textContent()) ?? '').trim();
  }
  if ((() => { let test = vars.test
return test === "subscription" })()) {
    vars.recurringDiscount = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return `${vars.recurringDiscount}`.replace('-','') }, vars);
  }
  if ((() => { let test = vars.test
return test === "subscription" && vars.includeTax === "no" })()) {
    vars.recurringTax = ((await page.locator(`tr.tax-rate.recurring-total > td > .woocommerce-Price-amount.amount`).or(page.locator(`.wcs-recurring-totals-panel__details .wc-block-components-totals-taxes .wc-block-components-totals-item__value`)).textContent()) ?? '').trim();
  }
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector('.wc-block-checkout')

let test = `${vars.test}`
return test === "subscription" && `${vars.includeTax}` === "yes" && !element }, vars)) {
    vars.recurringTax = ((await page.locator(`tr.order-total.recurring-total small.includes_tax > span`).textContent()) ?? '').trim();
  }
  if ((() => { let test = vars.test
return test === "subscription" })()) {
    vars.recurringTotal = ((await page.locator(`tr.order-total.recurring-total > td > strong > .woocommerce-Price-amount.amount`).or(page.locator(`.wcs-recurring-totals-panel__details-total .wc-block-components-totals-item__value`)).textContent()) ?? '').trim();
  }
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector('.wc-block-checkout')

let test = `${vars.test}`
return test === "subscription" && `${vars.includeTax}` === "yes" && !!element }, vars)) {
    vars.recurringTax = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const total = `${vars.recurringTotal}`

const totalWOT;
const currency = `${vars.currency}`

totalWOT = total.replace(/[^\d.,]/g, '')

if ('EUR' === currency) {
    totalWOT = Number(total.replace(',','.')) / 1.1
} else {
    totalWOT = Number(total) / 1.1
}

const tax = totalWOT * 0.1

return Intl.NumberFormat(`${vars.locale}`, { style: 'currency', currency: `${vars.currency}`}).format(tax)
 }, vars);
  }
  if ((() => { let checklogs = vars.checklogs
let freeTrial = vars.freeTrial
return checklogs != "upgrade" && freeTrial !="yes" })()) {
    vars.listPrices = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); 
let result = [`${vars.totalProd}`,`${vars.subtotal}`,`${vars.discount}`,`${vars.shipping}`,`${vars.tax}`,`${vars.total}`,`${vars.price}`,`${vars.recurringSubtotal}`,`${vars.recurringDiscount}`,`${vars.recurringShipping}`,`${vars.recurringTax}`,`${vars.recurringTotal}`]
let n = 0

const formatter = new Intl.NumberFormat(`${vars.locale}`, {
    style: 'currency',
    currency: `${vars.currency}`,
    minimumFractionDigits: `${vars.currency}` === 'JPY' ? 0 : 2
  });

const parts = formatter.formatToParts(1000.1);
let decimalSeparator;
if (`${vars.currency}` != 'JPY') {
 decimalSeparator = parts.find(part => part.type === 'decimal').value;
}
const groupSeparator = parts.find(part => part.type === 'group').value;
const curr = parts.find(part => part.type === 'currency').value;

while (result.length > n) {
    result[n] = result[n].replace(curr, '') // remove currency symbol
                         .replace(new RegExp(`\\${groupSeparator}`, 'g'), '') // remove group separators
                         .trim();
    if (`${vars.currency}` != 'JPY') {
        result[n] = result[n].replace(decimalSeparator, '.') // replace decimal separator
    }
    result[n] = Number(result[n]);
    n++
}

return result }, vars);
  }
  if ((() => { let checklogs = vars.checklogs
return checklogs === "upgrade" })()) {
    vars.listPrices = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); 
let result = [`${vars.totalProd}`,`${vars.subtotal}`,`${vars.discount}`,`${vars.tax}`,`${vars.total}`,`${vars.price}`,`${vars.recurringSubtotal}`,`${vars.recurringDiscount}`,`${vars.recurringShipping}`,`${vars.recurringTax}`,`${vars.recurringTotal}`]
let n = 0

const formatter = new Intl.NumberFormat(`${vars.locale}`, {
    style: 'currency',
    currency: `${vars.currency}`,
    minimumFractionDigits: `${vars.currency}` === 'JPY' ? 0 : 2
  });

const parts = formatter.formatToParts(1000.1);
let decimalSeparator;
if (`${vars.currency}` != 'JPY') {
 decimalSeparator = parts.find(part => part.type === 'decimal').value;
}
const groupSeparator = parts.find(part => part.type === 'group').value;
const curr = parts.find(part => part.type === 'currency').value;

while (result.length > n) {
    result[n] = result[n].replace(curr, '') // remove currency symbol
                         .replace(new RegExp(`\\${groupSeparator}`, 'g'), '') // remove group separators
                         .trim();
    if (`${vars.currency}` != 'JPY') {
        result[n] = result[n].replace(decimalSeparator, '.') // replace decimal separator
    }
    result[n] = Number(result[n]);
    n++
}

return result }, vars);
  }
  if ((() => { let freeTrial = vars.freeTrial
return freeTrial ==="yes" })()) {
    vars.listPrices = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); 
let result = [`${vars.totalProd}`,`${vars.subtotal}`,`${vars.tax}`,`${vars.total}`,`${vars.price}`,`${vars.recurringSubtotal}`,`${vars.recurringDiscount}`,`${vars.recurringShipping}`,`${vars.recurringTax}`,`${vars.recurringTotal}`]
let n = 0

const formatter = new Intl.NumberFormat(`${vars.locale}`, {
    style: 'currency',
    currency: `${vars.currency}`,
    minimumFractionDigits: `${vars.currency}` === 'JPY' ? 0 : 2
  });

const parts = formatter.formatToParts(1000.1);
let decimalSeparator;
if (`${vars.currency}` != 'JPY') {
 decimalSeparator = parts.find(part => part.type === 'decimal').value;
}
const groupSeparator = parts.find(part => part.type === 'group').value;
const curr = parts.find(part => part.type === 'currency').value;

while (result.length > n) {
    result[n] = result[n].replace(curr, '') // remove currency symbol
                         .replace(new RegExp(`\\${groupSeparator}`, 'g'), '') // remove group separators
                         .trim();
    if (`${vars.currency}` != 'JPY') {
        result[n] = result[n].replace(decimalSeparator, '.') // replace decimal separator
    }
    result[n] = Number(result[n]);
    n++
}

return result }, vars);
  }
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let checklogs = `${vars.checklogs}`
let freeTrial = `${vars.freeTrial}`
let includeTax = `${vars.includeTax}`
let blueSnapVs = `${vars.BlueSnapVs}`
blueSnapVs = blueSnapVs.split('.');
const blocks = !document.querySelector('.wc-block-checkout, .wc-block-cart')

return checklogs != "upgrade" && freeTrial !="yes" && includeTax === "no"
        && 
        (
            (blueSnapVs[0] >= 3 && blueSnapVs[1] >= 2 && blocks)
            ||
            (blueSnapVs[0] >= 3 && blueSnapVs[1] >= 5 && !blocks)
        )
        
             }, vars)) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let listPrices = vars.listPrices
let totalProduct = listPrices[0]
let subtotal = listPrices[1]
let discount = listPrices[2]
let shipping = listPrices[3]
let tax = listPrices[4]
let total = listPrices[5]
let total2
if (`${vars.curr}` === "JPY") {
    total2 = Math.round(subtotal-discount+shipping+tax)
} else {
    total2 = Math.round((subtotal-discount+shipping+tax)*100)/100
}

return totalProduct === subtotal && total === total2
 }, vars)).toBeTruthy();
  }
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let checklogs = `${vars.checklogs}`
let freeTrial = `${vars.freeTrial}`
let includeTax = `${vars.includeTax}`
let blueSnapVs = `${vars.BlueSnapVs}`
blueSnapVs = blueSnapVs.split('.');
const blocks = !!document.querySelector('.wc-block-checkout, .wc-block-cart')

return checklogs != "upgrade" && freeTrial !="yes" && includeTax === "yes" 
        && 
        (
            (blueSnapVs[0] >= 3 && blueSnapVs[1] >= 2 && !blocks) 
            ||
            (blueSnapVs[0] >= 3 && blueSnapVs[1] >= 5 && blocks)
        )
   
  }, vars)) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let listPrices = vars.listPrices
let totalProduct = listPrices[0]
let subtotal = listPrices[1]
let discount = listPrices[2]
let shipping = listPrices[3]
let total = listPrices[5]
let total2
if (`${vars.curr}` === "JPY") {
    total2 = Math.round(subtotal-discount+shipping)
} else {
    total2 = Math.round((subtotal-discount+shipping)*100)/100
}

return totalProduct === subtotal && total === total2
 }, vars)).toBeTruthy();
  }
  if ((() => { let test = vars.test
let checklogs = vars.checklogs
let freeTrial = vars.freeTrial
let includeTax = vars.includeTax
return checklogs != "upgrade" && freeTrial !="yes" && includeTax === "no"
&& test === "subscription" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let listPrices = vars.listPrices
let totalProduct = listPrices[6]
let subtotal = listPrices[7]
let discount = listPrices[8]
let shipping = listPrices[9]
let tax = listPrices[10]
let total = listPrices[11]
let total2
if (`${vars.curr}` === "JPY") {
    total2 = Math.round(subtotal-discount+shipping+tax)
} else {
    total2 = Math.round((subtotal-discount+shipping+tax)*100)/100
}

return totalProduct === subtotal && total === total2
 }, vars)).toBeTruthy();
  }
  if ((() => { let test = vars.test
let checklogs = vars.checklogs
let freeTrial = vars.freeTrial
let includeTax = vars.includeTax
let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
return checklogs != "upgrade" && freeTrial !="yes" && includeTax === "yes"
        && test === "subscription"
        && 
        (blueSnapVs[0] >= 3 && blueSnapVs[1] >= 2) })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let listPrices = vars.listPrices
let totalProduct = listPrices[6]
let subtotal = listPrices[7]
let discount = listPrices[8]
let shipping = listPrices[9]
let total = listPrices[11]
let total2
if (`${vars.curr}` === "JPY") {
    total2 = Math.round(subtotal-discount+shipping)
} else {
    total2 = Math.round((subtotal-discount+shipping)*100)/100
}

return totalProduct === subtotal && total === total2
 }, vars)).toBeTruthy();
  }
  if ((() => { let checklogs = vars.checklogs
return checklogs === "upgrade" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let listPrices = vars.listPrices
let totalProduct = listPrices[0]
let subtotal = listPrices[1]
let discount = listPrices[2]
let tax = listPrices[3]
let total = listPrices[4]
let total2
if (`${vars.curr}` === "JPY") {
    total2 = Math.round(subtotal-discount+tax)
} else {
    total2 = Math.round((subtotal-discount+tax)*100)/100
}

let totalProduct2 = listPrices[5]
let subtotal2 = listPrices[6]
let discount2 = listPrices[7]
let shipping2 = listPrices[8]
let tax2 = listPrices[9]
let total3 = listPrices[10]
let total4
if (`${vars.curr}` === "JPY") {
    total4 = Math.round(subtotal2-discount2+shipping2+tax2)
} else {
    total4 = Math.round((subtotal2-discount2+shipping2+tax2)*100)/100
}

return totalProduct === subtotal && total === total2 
&& totalProduct2 === subtotal2 && total3 === total4 }, vars)).toBeTruthy();
  }
  if ((() => { let freeTrial = vars.freeTrial
return freeTrial ==="yes" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let listPrices = vars.listPrices
let totalProduct = listPrices[0]
let subtotal = listPrices[1]
let tax = listPrices[2]
let total = listPrices[3]
let total2
if (`${vars.curr}` === "JPY") {
    total2 = Math.round(subtotal+tax)
} else {
    total2 = Math.round((subtotal+tax)*100)/100
}

let totalProduct2 = listPrices[4]
let subtotal2 = listPrices[5]
let discount2 = listPrices[6]
let shipping2 = listPrices[7]
let tax2 = listPrices[8]
let total3 = listPrices[9]
let total4
if (`${vars.curr}` === "JPY") {
    total4 = Math.round(subtotal2-discount2+shipping2+tax2)
} else {
    total4 = Math.round((subtotal2-discount2+shipping2+tax2)*100)/100
}

return totalProduct === subtotal && total === total2 
&& totalProduct2 === subtotal2 && total3 === total4 }, vars)).toBeTruthy();
  }
}

// GI: "Get default currency price on cart" (636024fadb1ab7e45ee9eb8b)
export async function getDefaultCurrencyPriceOnCart(page: Page, vars: Record<string, string> = {}): Promise<void> {
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let currency = `${vars.currency}`
const element = document.querySelector('.wp-block-woocommerce-cart')

return (currency === `${vars.defaultCurr}` || currency === "") && element === null }, vars)) {
    vars.resultDefault = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); //let content = Array.from<any>(document.querySelectorAll<HTMLTableCellElement>("td > .woocommerce-Price-amount.amount, span > .woocommerce-Price-amount.amount, .cart-contents .woocommerce-Price-amount.amount"))
let content = Array.from<any>(document.querySelectorAll<HTMLTableRowElement>("tr.cart_item .woocommerce-Price-amount.amount,tr.cart-discount .woocommerce-Price-amount.amount"))
let result = []

for (let i = 0; i < content.length; i++) {
        result.push(content[i].textContent);
    }
return result }, vars);
  }
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let currency = `${vars.currency}`
const element = document.querySelector('.wp-block-woocommerce-cart')

return (currency === `${vars.defaultCurr}` || currency === "") && element !== null }, vars)) {
    vars.resultDefault = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); //let content = Array.from<any>(document.querySelectorAll<HTMLTableCellElement>("td > .woocommerce-Price-amount.amount, span > .woocommerce-Price-amount.amount, .cart-contents .woocommerce-Price-amount.amount"))
let content = Array.from<any>(document.querySelectorAll(".wc-block-cart-item__prices .wc-block-components-formatted-money-amount, .wc-block-components-product-details__sign-up-fee > .wc-block-components-product-details__value, .wc-block-components-totals-discount .wc-block-components-formatted-money-amount"))
let result = []

for (let i = 0; i < content.length; i++) {
        result.push(content[i].textContent);
    }
return result }, vars);
  }
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let currency = `${vars.currency}`
const element = document.querySelector('.wp-block-woocommerce-cart')

return (currency !== `${vars.defaultCurr}` && currency !== "") && element === null }, vars)) {
    vars.resultEUR = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); //let content = Array.from<any>(document.querySelectorAll<HTMLTableCellElement>("td > .woocommerce-Price-amount.amount, span > .woocommerce-Price-amount.amount, .cart-contents .woocommerce-Price-amount.amount"))
let content = Array.from<any>(document.querySelectorAll<HTMLTableRowElement>("tr.cart_item .woocommerce-Price-amount.amount,tr.cart-discount .woocommerce-Price-amount.amount"))
let result = []

for (let i = 0; i < content.length; i++) {
        result.push(content[i].textContent);
    }
return result }, vars);
  }
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let currency = `${vars.currency}`
const element = document.querySelector('.wp-block-woocommerce-cart')

return (currency !== `${vars.defaultCurr}` && currency !== "") && element !== null }, vars)) {
    vars.resultEUR = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); //let content = Array.from<any>(document.querySelectorAll<HTMLTableCellElement>("td > .woocommerce-Price-amount.amount, span > .woocommerce-Price-amount.amount, .cart-contents .woocommerce-Price-amount.amount"))
let content = Array.from<any>(document.querySelectorAll(".wc-block-cart-item__prices .wc-block-components-formatted-money-amount, .wc-block-components-product-details__sign-up-fee > .wc-block-components-product-details__value, .wc-block-components-totals-discount .wc-block-components-formatted-money-amount"))
let result = []

for (let i = 0; i < content.length; i++) {
        result.push(content[i].textContent);
    }
return result }, vars);
  }
  await getDefaultCurrencyPriceOnCartShipping(page, vars);
}

// GI: "Get default currency price on cart - Shipping" (65f9f5da752b1a838b7f1091)
export async function getDefaultCurrencyPriceOnCartShipping(page: Page, vars: Record<string, string> = {}): Promise<void> {
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let currency = `${vars.currency}`
const element = document.querySelector('.wp-block-woocommerce-cart')
return (currency === `${vars.defaultCurr}` || currency === "") && element === null
 }, vars)) {
    vars.resultDefaultShipping = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); //let content = Array.from<any>(document.querySelectorAll<HTMLTableCellElement>("td > .woocommerce-Price-amount.amount, span > .woocommerce-Price-amount.amount, .cart-contents .woocommerce-Price-amount.amount"))
let content = Array.from<any>(document.querySelectorAll<HTMLTableRowElement>("tr.shipping .woocommerce-Price-amount.amount"))
let result = []

for (let i = 0; i < content.length; i++) {
        result.push(content[i].textContent);
    }
return result }, vars);
  }
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector('.wp-block-woocommerce-cart')
let currency = `${vars.currency}`
return (currency === `${vars.defaultCurr}` || currency === "") && element !== null
 }, vars)) {
    vars.resultDefaultShipping = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); //let content = Array.from<any>(document.querySelectorAll<HTMLTableCellElement>("td > .woocommerce-Price-amount.amount, span > .woocommerce-Price-amount.amount, .cart-contents .woocommerce-Price-amount.amount"))
let content = Array.from<any>(document.querySelectorAll(".wc-block-components-totals-shipping__options .wc-block-formatted-money-amount"))
let result = []

for (let i = 0; i < content.length; i++) {
        result.push(content[i].textContent);
    }
return result }, vars);
  }
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let currency = `${vars.currency}`
const element = document.querySelector('.wp-block-woocommerce-cart')
return (currency !== `${vars.defaultCurr}` && currency !== "") && element === null }, vars)) {
    vars.resultEURShipping = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); //let content = Array.from<any>(document.querySelectorAll<HTMLTableCellElement>("td > .woocommerce-Price-amount.amount, span > .woocommerce-Price-amount.amount, .cart-contents .woocommerce-Price-amount.amount"))
let content = Array.from<any>(document.querySelectorAll<HTMLTableRowElement>("tr.shipping .woocommerce-Price-amount.amount"))
let result = []

for (let i = 0; i < content.length; i++) {
        result.push(content[i].textContent);
    }
return result }, vars);
  }
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let currency = `${vars.currency}`
const element = document.querySelector('.wp-block-woocommerce-cart')
return (currency !== `${vars.defaultCurr}` && currency !== "") && element !== null }, vars)) {
    vars.resultEURShipping = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); //let content = Array.from<any>(document.querySelectorAll<HTMLTableCellElement>("td > .woocommerce-Price-amount.amount, span > .woocommerce-Price-amount.amount, .cart-contents .woocommerce-Price-amount.amount"))
let content = Array.from<any>(document.querySelectorAll(".wc-block-components-totals-shipping__options .wc-block-formatted-money-amount"))
let result = []

for (let i = 0; i < content.length; i++) {
        result.push(content[i].textContent);
    }
return result }, vars);
  }
}

// GI: "Get group Log request response" (60e71211ed68ff1796455d0c)
export async function getGroupLogRequestResponse(page: Page, vars: Record<string, string> = {}): Promise<void> {
  if ((() => { let test = vars.test
return test === "BLU-001-018" })()) {
    vars.logs = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let date = `${vars.payDate}`

return new Promise(function (resolve, reject) {
  const url = `${vars.startUrl}` + 'wp-json/wc-automation-helper/log-request-response-group/?datetime='+`${vars.payDate}&initial_request_slug=vaulted-shoppers/${vars.vaultedShopperId}`;
  const username = `${vars.woo_user}`;
  const password = `${vars.woo_pass}`;
  let headers = new Headers();
  headers.set('Content-Type', 'application/json');
  headers.set('Authorization', 'Basic ' + btoa(username + ":" + password));
  fetch(url, {method:'GET', headers: headers, credentials: 'omit'})
  .then(function(response) {
    if (response.ok) {
      resolve(response.json())
    } else {
      resolve([])
    } 
  })
  }) }, vars);
  }
  if ((() => { let test = vars.test
return test === "BLU-001-018" })()) {
    vars.logs = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let logs = vars.logs
let logs1 = []
let length = logs.length
let n = 0
try {
    while (n < length) {
        if (logs[n].content.email != `${vars.email}` || logs[n+1].method != "PUT"){
            n++
        } else {
            logs1 = [logs[n],logs[n+1],logs[n+2]] 
            break;
        }
    }
} catch(e) {
    console.error(e);
} 
return logs1 }, vars);
  }
  if ((() => { let test = vars.test
return test === "BLU-001-018" })()) {
    vars.logs = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let logs = vars.logs
let length = logs.length
if (length === 0) {
    let date = `${vars.payDate}`
    date = new Date(date);
    date = new Date (date.getTime()+60000);
    date = date.getFullYear()+'-'+('0'+(date.getMonth()+1)).slice(-2)+'-'+('0'+date.getDate()).slice(-2)+'T'+('0'+date.getUTCHours()).slice(-2)+":"+('0'+date.getMinutes()).slice(-2)+":"+('0'+date.getSeconds()).slice(-2);

    logs =  new Promise(function (resolve, reject) {
    const url = `${vars.startUrl}` + 'wp-json/wc-automation-helper/log-request-response-group/?datetime='+date+`&initial_request_slug=vaulted-shoppers/${vars.vaultedShopperId}`;
    const username = `${vars.woo_user}`;
    const password = `${vars.woo_pass}`;
    let headers = new Headers();
    headers.set('Content-Type', 'application/json');
    headers.set('Authorization', 'Basic ' + btoa(username + ":" + password));
    fetch(url, {method:'GET', headers: headers, credentials: 'omit'})
    .then(function(response) {
    if (response.ok) {
      resolve(response.json())
    } else {
      resolve([])
    } 
  })
  })
} 
return logs }, vars);
  }
  if ((() => { let test = vars.test
return test === "BLU-001-018" })()) {
    vars.logs = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let logs = vars.logs
let logs1 = []
let length = logs.length
let n = 0
while (n < length) {
    if (logs[n].content.email != `${vars.email}`|| logs[n+1].method != "PUT"){
        n++
    } else {
        logs1 = [logs[n],logs[n+1],logs[n+2]]  
        break;
    }
}
return logs1 }, vars);
  }
  if ((() => { let test = vars.test
return test != "BLU-001-018" })()) {
    vars.logs = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return new Promise(function (resolve, reject) {
  const url = `${vars.startUrl}` + 'wp-json/wc-automation-helper/log-request-response-group/?datetime='+`${vars.payDate}&initial_request_slug=vaulted-shoppers`;
  const username = `${vars.woo_user}`;
  const password = `${vars.woo_pass}`;
  let headers = new Headers();
  headers.set('Content-Type', 'application/json');
  headers.set('Authorization', 'Basic ' + btoa(username + ":" + password));
  fetch(url, {method:'GET', headers: headers, credentials: 'omit'})
  .then(function(response) {
    if (response.ok) {
      resolve(response.json())
    } else {
      resolve([])
    } 
  })
  }) }, vars);
  }
  if ((() => { let test = vars.test
return test != "BLU-001-018" })()) {
    vars.logs = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let logs = vars.logs
let logs1 = []
let length = logs.length
let n = 0
while (n < length) {
    if (logs[n].content.email != `${vars.email}`){
        n++
    } else {
        logs1 = [logs[n],logs[n+1]] 
        break;
    }
}
return logs1 }, vars);
  }
  if ((() => { let test = vars.test
return test != "BLU-001-018" })()) {
    vars.logs = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let logs = vars.logs
let length = logs.length
if (length === 0) {
    let date = `${vars.payDate}`
    date = new Date(date);
    date = new Date (date.getTime()+60000);
    date = date.getFullYear()+'-'+('0'+(date.getMonth()+1)).slice(-2)+'-'+('0'+date.getDate()).slice(-2)+'T'+('0'+date.getUTCHours()).slice(-2)+":"+('0'+date.getMinutes()).slice(-2)+":"+('0'+date.getSeconds()).slice(-2);

    logs = new Promise(function (resolve, reject) {
    const url = `${vars.startUrl}` + 'wp-json/wc-automation-helper/log-request-response-group/?datetime='+date+'&initial_request_slug=vaulted-shoppers';
    const username = `${vars.woo_user}`;
    const password = `${vars.woo_pass}`;
    let headers = new Headers();
    headers.set('Content-Type', 'application/json');
    headers.set('Authorization', 'Basic ' + btoa(username + ":" + password));
    fetch(url, {method:'GET', headers: headers, credentials: 'omit'})
    .then(function(response) {
    if (response.ok) {
      resolve(response.json())
    } else {
      resolve([])
    } 
  })
  })
} 
return logs }, vars);
  }
  if ((() => { let test = vars.test
return test != "BLU-001-018" })()) {
    vars.logs = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let logs = vars.logs
let logs1 = []
let length = logs.length
let n = 0
while (n < length) {
    if (logs[n].content.email != `${vars.email}`){
        n++
    } else {
        logs1 = [logs[n],logs[n+1]] 
        break;
    }
}
return logs1 }, vars);
  }
}

// GI: "Get group Log request response - transactions" (60afe010c894e66ce1684541)
export async function getGroupLogRequestResponseTransactions(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.logs = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let date = `${vars.payDate}`

return new Promise(function (resolve, reject) {
  const url = `${vars.startUrl}` + 'wp-json/wc-automation-helper/log-request-response-group/?datetime='+date+'&initial_request_slug=/transactions'
  const username = `${vars.woo_user}`;
  const password = `${vars.woo_pass}`;
  let headers = new Headers();
  headers.set('Content-Type', 'application/json');
  headers.set('Authorization', 'Basic ' + btoa(username + ":" + password));
  fetch(url, {method:'GET', headers: headers, credentials: 'omit'})
  .then(function(response) {
    if (response.ok) {
        console.log('99 ok', response);
      resolve(response.json())
    } else {
        console.log('99 error', response);
      resolve([])
    } 
  })
  })
 }, vars);
  if ((() => { let auth = vars.auth
return auth != "capture" && auth != "cancel" })()) {
    vars.logs = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let logs = vars.logs
let logs1 = []
let length = logs.length
let n = 0
while (n < length) {
    if (logs[n].content.merchantTransactionId != Number(vars.orderNumber) || logs[n+1].content.merchantTransactionId != `${vars.orderNumber}`){
        n++
    } else {
        logs1 = [logs[n],logs[n+1]] 
        break;
    }
}
return logs1 }, vars);
  }
  if ((() => { let auth = vars.auth
return auth === "capture" || auth === "cancel" })()) {
    vars.logs = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let logs = vars.logs
let logs1 = []
let length = logs.length
let n = 0
while (n < length) {
    if (logs[n].content.transactionId != `${vars.transaction_id}` || logs[n].method != "PUT"){
        n++
    } else {
        logs1 = [logs[n],logs[n+1]] 
        break;
    }
}
return logs1 }, vars);
  }
  if ((() => { let logs = vars.logs
let length = logs.length
return length === 0 })()) {
    vars.logs = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let date = `${vars.payDate}`
date = new Date(date);
date = new Date (date.getTime()+60000);
date = date.getFullYear()+'-'+('0'+(date.getMonth()+1)).slice(-2)+'-'+('0'+date.getDate()).slice(-2)+'T'+('0'+date.getUTCHours()).slice(-2)+":"+('0'+date.getMinutes()).slice(-2)+":"+('0'+date.getSeconds()).slice(-2);

return new Promise(function (resolve, reject) {
  const url = `${vars.startUrl}` + 'wp-json/wc-automation-helper/log-request-response-group/?datetime='+date+'&initial_request_slug=/transactions'
  const username = `${vars.woo_user}`;
  const password = `${vars.woo_pass}`;
  let headers = new Headers();
  headers.set('Content-Type', 'application/json');
  headers.set('Authorization', 'Basic ' + btoa(username + ":" + password));
  fetch(url, {method:'GET', headers: headers, credentials: 'omit'})
  .then(function(response) {
    if (response.ok) {
      resolve(response.json())
    } else {
      resolve([])
    } 
  })
  }) }, vars);
  }
  if ((() => { let auth = vars.auth
return auth != "capture" && auth != "cancel" })()) {
    vars.logs = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let logs = vars.logs
let logs1 = []
let length = logs.length
let n = 0
while (n < length) {
    if (logs[n].content.merchantTransactionId != Number(vars.orderNumber) || logs[n+1].content.merchantTransactionId != `${vars.orderNumber}`){
        n++
    } else {
        logs1 = [logs[n],logs[n+1]] 
        break;
    }
}
return logs1 }, vars);
  }
  if ((() => { let auth = vars.auth
return auth === "capture" || auth === "cancel" })()) {
    vars.logs = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let logs = vars.logs
let logs1 = []
let length = logs.length
let n = 0
while (n < length) {
    if (logs[n].content.transactionId != `${vars.transaction_id}` || logs[n].method != "PUT" ){
        n++
    } else {
        logs1 = [logs[n],logs[n+1]] 
        break;
    }
}
return logs1 }, vars);
  }
}

// GI: "Get group Log request response - transactions declined" (62386af56f3ed7a04d0fb929)
export async function getGroupLogRequestResponseTransactionsDeclined(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.logs = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let date = `${vars.payDate}`

return new Promise(function (resolve, reject) {
  const url = `${vars.startUrl}` + 'wp-json/wc-automation-helper/log-request-response-group/?datetime='+date+'&initial_request_slug=/transactions'
  const username = `${vars.woo_user}`;
  const password = `${vars.woo_pass}`;
  let headers = new Headers();
  headers.set('Content-Type', 'application/json');
  headers.set('Authorization', 'Basic ' + btoa(username + ":" + password));
  fetch(url, {method:'GET', headers: headers, credentials: 'omit'})
  .then(function(response) {
    if (response.ok) {
      resolve(response.json())
    } else {
      resolve([])
    } 
  })
  })
 }, vars);
  if ((() => { let auth = vars.auth
return auth != "capture" && auth != "cancel" })()) {
    vars.logs = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let logs = vars.logs
let logs1 = []
let length = logs.length
let n = 0
while (n < length) {
    if (logs[n].content.merchantTransactionId != Number(vars.orderNumber) || logs[n+1].content.merchantTransactionId != undefined){
        n++
    } else {
        logs1 = [logs[n],logs[n+1]] 
        break;
    }
}
return logs1 }, vars);
  }
  if ((() => { let auth = vars.auth
return auth === "capture" || auth === "cancel" })()) {
    vars.logs = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let logs = vars.logs
let logs1 = []
let length = logs.length
let n = 0
while (n < length) {
    if (logs[n].content.transactionId != `${vars.transaction_id}` || logs[n].method != "PUT"){
        n++
    } else {
        logs1 = [logs[n],logs[n+1]] 
        break;
    }
}
return logs1 }, vars);
  }
  if ((() => { let logs = vars.logs
let length = logs.length
return length === 0 })()) {
    vars.logs = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let date = `${vars.payDate}`
date = new Date(date);
date = new Date (date.getTime()+60000);
date = date.getFullYear()+'-'+('0'+(date.getMonth()+1)).slice(-2)+'-'+('0'+date.getDate()).slice(-2)+'T'+('0'+date.getUTCHours()).slice(-2)+":"+('0'+date.getMinutes()).slice(-2)+":"+('0'+date.getSeconds()).slice(-2);

return new Promise(function (resolve, reject) {
  const url = `${vars.startUrl}` + 'wp-json/wc-automation-helper/log-request-response-group/?datetime='+date+'&initial_request_slug=/transactions'
  const username = `${vars.woo_user}`;
  const password = `${vars.woo_pass}`;
  let headers = new Headers();
  headers.set('Content-Type', 'application/json');
  headers.set('Authorization', 'Basic ' + btoa(username + ":" + password));
  fetch(url, {method:'GET', headers: headers, credentials: 'omit'})
  .then(function(response) {
    if (response.ok) {
      resolve(response.json())
    } else {
      resolve([])
    } 
  })
  }) }, vars);
  }
  if ((() => { let auth = vars.auth
return auth != "capture" && auth != "cancel" })()) {
    vars.logs = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let logs = vars.logs
let logs1 = []
let length = logs.length
let n = 0
while (n < length) {
    if (logs[n].content.merchantTransactionId != Number(vars.orderNumber) || logs[n+1].content.merchantTransactionId != undefined){
        n++
    } else {
        logs1 = [logs[n],logs[n+1]] 
        break;
    }
}
return logs1 }, vars);
  }
  if ((() => { let auth = vars.auth
return auth === "capture" || auth === "cancel" })()) {
    vars.logs = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let logs = vars.logs
let logs1 = []
let length = logs.length
let n = 0
while (n < length) {
    if (logs[n].content.transactionId != `${vars.transaction_id}` || logs[n].method != "PUT" ){
        n++
    } else {
        logs1 = [logs[n],logs[n+1]] 
        break;
    }
}
return logs1 }, vars);
  }
}

// GI: "Get Log request response - /payment-fields-tokens" (62bf0b17834704196f9948f3)
export async function getLogRequestResponsePaymentFieldsTokens(page: Page, vars: Record<string, string> = {}): Promise<void> {
  if ((() => { let user = vars.user
let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
return user != "old"
        || 
        ((Number(blueSnapVs[0]) == 2 && Number(blueSnapVs[1]) == 5)
           &&  user == "old" ) })()) {
    vars.logs = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); 
return new Promise(function (resolve, reject) {
  const url = `${vars.startUrl}` + 'wp-json/wc-automation-helper/log-request-response/?url_path=/payment-fields-tokens';
  const username = `${vars.woo_user}`;
  const password = `${vars.woo_pass}`;
  let headers = new Headers();
  headers.set('Content-Type', 'application/json');
  headers.set('Authorization', 'Basic ' + btoa(username + ":" + password));
  fetch(url, {method:'GET', headers: headers, credentials: 'omit',})
  .then(function(response) {
    if (response.ok) {
      resolve(response.json())
    } else {
      resolve([])
    } 
  })
  }) }, vars);
  }
  if ((() => { let payment = vars.payment
let user = vars.user
let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
return (
        (Number(blueSnapVs[0]) == 2 && Number(blueSnapVs[1]) == 6) 
        || Number(blueSnapVs[0]) >= 3
        ) &&

payment != "ach" && user === "old" })()) {
    vars.logs = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); 
return new Promise(function (resolve, reject) {
  const url = `${vars.startUrl}` + `wp-json/wc-automation-helper/log-request-response/?url_path=/payment-fields-tokens?shopperId=${vars.vaultedShopperId}`;
  const username = `${vars.woo_user}`;
  const password = `${vars.woo_pass}`;
  let headers = new Headers();
  headers.set('Content-Type', 'application/json');
  headers.set('Authorization', 'Basic ' + btoa(username + ":" + password));
  fetch(url, {method:'GET', headers: headers, credentials: 'omit',})
  .then(function(response) {
    if (response.ok) {
      resolve(response.json())
    } else {
      resolve([])
    } 
  })
  })

 }, vars);
  }
  if ((() => { let payment = vars.payment
let user = vars.user
return (payment === "ach" && user != "old") || (payment != "ach") })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let logs = vars.logs
return logs.request.method === "POST" }, vars)).toBeTruthy();
  }
  if ((() => { let user = vars.user
let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
return user != "old" 
        || 
        (
            (Number(blueSnapVs[0]) == 2 && Number(blueSnapVs[1]) == 5)
           &&  user == "old" 
        ) })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let logs = vars.logs
return logs.request.url === "https://sandbox.bluesnap.com/services/2/payment-fields-tokens" }, vars)).toBeTruthy();
  }
  if ((() => { let payment = vars.payment
let user = vars.user
let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
return payment != "ach" && user === "old" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let logs = vars.logs
return logs.request.url === `https://sandbox.bluesnap.com/services/2/payment-fields-tokens?shopperId=${vars.vaultedShopperId}` }, vars)).toBeTruthy();
  }
  if ((() => { let payment = vars.payment
let user = vars.user
return payment != "ach" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let logs = vars.logs
return logs.response.response_data.headers[0] === "HTTP/1.1 201 Created" || logs.response.response_data.headers[0] === "HTTP/1.1 201 201" }, vars)).toBeTruthy();
  }
  if ((() => { let payment = vars.payment
let user = vars.user
let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');

return payment != "ach" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let logs = vars.logs
//return logs.response.response_data.headers[7] === `Location: https://sandbox.bluesnap.com/services/2/payment-fields-tokens/${vars.pfToken}`
//|| logs.response.response_data.headers[9] === `Location: https://sandbox.bluesnap.com/services/2/payment-fields-tokens/${vars.pfToken}`
//    || logs.response.response_data.headers[5] === `Location: https://sandbox.bluesnap.com/services/2/payment-fields-tokens/${vars.pfToken}`

function checkLocation(location) {
    const pattern = /Location: https:\/\/sandbox.bluesnap.com\/services\/2\/payment-fields-tokens\/vars.pfToken/;
    return pattern.test(location);
}

return logs.response.response_data.headers.some(location => checkLocation(location))
 }, vars)).toBeTruthy();
  }
  if ((() => { let payment = vars.payment
let user = vars.user
return payment === "ach" && user != "old" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let logs = vars.logs
return logs.response.response_data.headers[0] === "HTTP/1.1 201 Created" || logs.response.response_data.headers[0] === "HTTP/1.1 201 201" }, vars)).toBeTruthy();
  }
  if ((() => { let payment = vars.payment
let user = vars.user
let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');

return payment === "ach" && user != "old" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let logs = vars.logs
//return logs.response.response_data.headers[7] === `Location: https://sandbox.bluesnap.com/services/2/payment-fields-tokens/${vars.pfToken}`
//|| logs.response.response_data.headers[9] === `Location: https://sandbox.bluesnap.com/services/2/payment-fields-tokens/${vars.pfToken}`
//|| logs.response.response_data.headers[5] === `Location: https://sandbox.bluesnap.com/services/2/payment-fields-tokens/${vars.pfToken}`


function checkLocation(location) {
    const pattern = /Location: https:\/\/sandbox.bluesnap.com\/services\/2\/payment-fields-tokens\/vars.pfToken/;
    return pattern.test(location);
}

return logs.response.response_data.headers.some(location => checkLocation(location))

 }, vars)).toBeTruthy();
  }
}

// GI: "Get Log request response - /recurring/ondemand" (61fbf199b79a0772bb31a479)
export async function getLogRequestResponseRecurringOndemand(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.logs = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); 
return new Promise(function (resolve, reject) {
  const url = `${vars.startUrl}` + `wp-json/wc-automation-helper/log-request-response-group/?datetime=${vars.payDate}&initial_request_slug=/recurring/ondemand`
  const username = `${vars.woo_user}`;
  const password = `${vars.woo_pass}`;
  let headers = new Headers();
  headers.set('Content-Type', 'application/json');
  headers.set('Authorization', 'Basic ' + btoa(username + ":" + password));
  fetch(url, {method:'GET', headers: headers, credentials: 'omit'})
  .then(function(response) {
    if (response.ok) {
      resolve(response.json())
    } else {
      resolve([])
    } 
  })
  })

 }, vars);
  vars.logs = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let logs = vars.logs
let logs1 = []
let length = logs.length
let n = 0
while (n < length) {
    if (logs[n].content.merchantTransactionId != Number(vars.orderNumber) || logs[n+1].content.merchantTransactionId != `${vars.orderNumber}`){
        n++
    } else {
        logs1 = [logs[n],logs[n+1]] 
        break;
    }
}
return logs1 }, vars);
  if ((() => { let logs = vars.logs
let length = logs.length
return length === 0 })()) {
    vars.logs = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let date = `${vars.payDate}`
date = new Date(date);
date = new Date (date.getTime()+60000);
date = date.getFullYear()+'-'+('0'+(date.getMonth()+1)).slice(-2)+'-'+('0'+date.getDate()).slice(-2)+'T'+('0'+date.getUTCHours()).slice(-2)+":"+('0'+date.getMinutes()).slice(-2)+":"+('0'+date.getSeconds()).slice(-2);


return new Promise(function (resolve, reject) {
  const url = `${vars.startUrl}` + 'wp-json/wc-automation-helper/log-request-response-group/?datetime='+date+'&initial_request_slug=/recurring/ondemand'
  const username = `${vars.woo_user}`;
  const password = `${vars.woo_pass}`;
  let headers = new Headers();
  headers.set('Content-Type', 'application/json');
  headers.set('Authorization', 'Basic ' + btoa(username + ":" + password));
  fetch(url, {method:'GET', headers: headers, credentials: 'omit'})
  .then(function(response) {
    if (response.ok) {
      resolve(response.json())
    } else {
      resolve([])
    } 
  })
  }) }, vars);
  }
  vars.logs = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let logs = vars.logs
let logs1 = []
let length = logs.length
let n = 0
while (n < length) {
    if (logs[n].content.merchantTransactionId != Number(vars.orderNumber) || logs[n+1].content.merchantTransactionId != `${vars.orderNumber}`){
        n++
    } else {
        logs1 = [logs[n],logs[n+1]] 
        break;
    }
}
return logs1 }, vars);
}

// GI: "Get Log request response - /recurring/ondemand for decline" (6238625aaacde4b98775894d)
export async function getLogRequestResponseRecurringOndemandForDecline(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.logs = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); 
return new Promise(function (resolve, reject) {
  const url = `${vars.startUrl}` + `wp-json/wc-automation-helper/log-request-response-group/?datetime=${vars.payDate}&initial_request_slug=/recurring/ondemand`
  const username = `${vars.woo_user}`;
  const password = `${vars.woo_pass}`;
  let headers = new Headers();
  headers.set('Content-Type', 'application/json');
  headers.set('Authorization', 'Basic ' + btoa(username + ":" + password));
  fetch(url, {method:'GET', headers: headers, credentials: 'omit',})
  .then(function(response) {
    if (response.ok) {
      resolve(response.json())
    } else {
      resolve([])
    } 
  })
  })

 }, vars);
  vars.logs = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let logs = vars.logs
let logs1 = []
let length = logs.length
let n = 0
while (n < length) {
    if (logs[n].content.merchantTransactionId != Number(vars.orderNumber) || logs[n+1].content.merchantTransactionId != undefined){
        n++
    } else {
        logs1 = [logs[n],logs[n+1]] 
        break;
    }
}
return logs1 }, vars);
  if ((() => { let logs = vars.logs
let length = logs.length
return length === 0 })()) {
    vars.logs = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let date = `${vars.payDate}`
date = new Date(date);
date = new Date (date.getTime()+60000);
date = date.getFullYear()+'-'+('0'+(date.getMonth()+1)).slice(-2)+'-'+('0'+date.getDate()).slice(-2)+'T'+('0'+date.getUTCHours()).slice(-2)+":"+('0'+date.getMinutes()).slice(-2)+":"+('0'+date.getSeconds()).slice(-2);


return new Promise(function (resolve, reject) {
  const url = `${vars.startUrl}` + 'wp-json/wc-automation-helper/log-request-response-group/?datetime='+date+'&initial_request_slug=/recurring/ondemand'
  const username = `${vars.woo_user}`;
  const password = `${vars.woo_pass}`;
  let headers = new Headers();
  headers.set('Content-Type', 'application/json');
  headers.set('Authorization', 'Basic ' + btoa(username + ":" + password));
  fetch(url, {method:'GET', headers: headers})
  .then(function(response) {
    if (response.ok) {
      resolve(response.json())
    } else {
      resolve([])
    } 
  })
  }) }, vars);
  }
  vars.logs = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let logs = vars.logs
let logs1 = []
let length = logs.length
let n = 0
while (n < length) {
    if (logs[n].content.merchantTransactionId != Number(vars.orderNumber) || logs[n+1].content.merchantTransactionId != undefined){
        n++
    } else {
        logs1 = [logs[n],logs[n+1]] 
        break;
    }
}
return logs1 }, vars);
}

// GI: "Get Log request response - /recurring/ondemand/{{subsID}}" (61fbf2ffb79a0772bb32a172)
export async function getLogRequestResponseRecurringOndemandSubsID(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.logs = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return new Promise(function (resolve, reject) {
  const url = `${vars.startUrl}` + `wp-json/wc-automation-helper/log-request-response/?url_path=/recurring/ondemand/${vars.subsID}`;
  const username = `${vars.woo_user}`;
  const password = `${vars.woo_pass}`;
  let headers = new Headers();
  headers.set('Content-Type', 'application/json');
  headers.set('Authorization', 'Basic ' + btoa(username + ":" + password));
  fetch(url, {method:'GET', headers: headers, credentials: 'omit',})
  .then(function(response) {
    if (response.ok) {
      resolve(response.json())
    } else {
      reject(new Error('error'))
    } 
  })
  }) }, vars);
}

// GI: "Get Log request response - alt transactions" (6213dcb3029c844528c9ac72)
export async function getLogRequestResponseAltTransactions(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.logs = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return new Promise(function (resolve, reject) {
  const url = `${vars.startUrl}` + 'wp-json/wc-automation-helper/log-request-response/?url_path=/alt-transactions';
  const username = `${vars.woo_user}`;
  const password = `${vars.woo_pass}`;
  let headers = new Headers();
  headers.set('Content-Type', 'application/json');
  headers.set('Authorization', 'Basic ' + btoa(username + ":" + password));
  fetch(url, {method:'GET', headers: headers, credentials: 'omit'})
  .then(function(response) {
    if (response.ok) {
      resolve(response.json())
    } else {
      reject(new Error('error'))
    } 
  })
  }) }, vars);
}

// GI: "Get Log request response - currency rate" (630f555dcd380e119cb7c9f8)
export async function getLogRequestResponseCurrencyRate(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.rates = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); 
return new Promise(function (resolve, reject) {
  const url = `${vars.startUrl}` + `wp-json/wc-automation-helper/log-request-response/?url_path=currency-rates?base-currency=${vars.defaultCurr}`;
  const username = `${vars.woo_user}`;
  const password = `${vars.woo_pass}`;
  let headers = new Headers();
  headers.set('Content-Type', 'application/json');
  headers.set('Authorization', 'Basic ' + btoa(username + ":" + password));
  fetch(url, {method:'GET', headers: headers, credentials: 'omit'})
  .then(function(response) {
    if (response.ok) {
      resolve(response.json())
    } else {
      resolve([])
    } 
  })
  }) }, vars);
  vars.rate = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); 
let rates = vars.rates;
let currency = `${vars.curr}`;
let rate;
let boolean = false;
let n = 0
while (boolean === false && rates.response.currencyRate.length > n) {
    if (rates.response.currencyRate[n].quoteCurrency != currency) {
        n++
    } else {
        rate = rates.response.currencyRate[n].conversionRate
        boolean = true
    }
}
return rate }, vars);
}

// GI: "Get Log request response - IPN" (622b9705aacde4b98716aea4)
export async function getLogRequestResponseIPN(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.waitForTimeout(15000);
  vars.logs = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return new Promise(function (resolve, reject) {
  const url = `${vars.startUrl}` + `wp-json/wc-automation-helper/ipn-log-request/?date=${vars.date}&transaction_id=${vars.orderNumber}`;
  const username = `${vars.woo_user}`;
  const password = `${vars.woo_pass}`;
  let headers = new Headers();
  headers.set('Content-Type', 'application/json');
  headers.set('Authorization', 'Basic ' + btoa(username + ":" + password));
  fetch(url, {method:'GET', headers: headers, credentials: 'omit'})
  .then(function(response) {
    if (response.ok) {
      resolve(response.json())
    } else {
      reject(new Error('error'))
    } 
  })
  }) }, vars);
}

// GI: "Get Log request response - no /recurring/ondemand" (6236625d6f3ed7a04d9e5398)
export async function getLogRequestResponseNoRecurringOndemand(page: Page, vars: Record<string, string> = {}): Promise<void> {
  if (false) {
    vars.logs = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); 
return new Promise(function (resolve, reject) {
  const url = `${vars.startUrl}` + 'wp-json/wc-automation-helper/log-request-response-group/?datetime='+`${vars.payDate}&initial_request_slug=ondemand`;
  const username = `${vars.woo_user}`;
  const password = `${vars.woo_pass}`;
  let headers = new Headers();
  headers.set('Content-Type', 'application/json');
  headers.set('Authorization', 'Basic ' + btoa(username + ":" + password));
  fetch(url, {method:'GET', headers: headers, credentials: 'omit'})
  .then(function(response) {
    if (response.ok) {
      resolve(response.json())
    } else {
      resolve(false)
    } 
  })
  })

 }, vars);
  }
  vars.logs = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); 
return new Promise(function (resolve, reject) {
  const url = `${vars.startUrl}` + 'wp-json/wc-automation-helper/log-request-response-group/?datetime='+`${vars.payDate}&initial_request_slug=ondemand`;
  const username = `${vars.woo_user}`;
  const password = `${vars.woo_pass}`;
  let headers = new Headers();
  headers.set('Content-Type', 'application/json');
  headers.set('Authorization', 'Basic ' + btoa(username + ":" + password));
  fetch(url, { method: 'GET', headers: headers, credentials: 'omit' })
      .then((response) => {
        if (response.ok) {
          return response.json(); // Return the Promise to be handled in the next .then
        } else {
          resolve(false); // Resolve with false if response is not OK
        }
      })
      .then((data) => {
        // Check if data is an array and not empty
        if (Array.isArray(data) && data.length > 0) {
          resolve(data); // Resolve with the data if it's a non-empty array
        } else {
          resolve(false); // Resolve with false if data is not a non-empty array
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        reject(error); // Reject the Promise if there's an error (e.g., network issue or invalid JSON)
      });
}) }, vars);
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); 
let logs = vars.logs
return logs === false }, vars)).toBeTruthy();
  vars.logs = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let date = `${vars.payDate}`
date = new Date(date);
date = new Date (date.getTime()+60000);
date = date.getFullYear()+'-'+('0'+(date.getMonth()+1)).slice(-2)+'-'+('0'+date.getDate()).slice(-2)+'T'+('0'+date.getUTCHours()).slice(-2)+":"+('0'+date.getMinutes()).slice(-2)+":"+('0'+date.getSeconds()).slice(-2);


return new Promise(function (resolve, reject) {
  const url = `${vars.startUrl}` + 'wp-json/wc-automation-helper/log-request-response-group/?datetime='+`${vars.payDate}&initial_request_slug=ondemand`;
  const username = `${vars.woo_user}`;
  const password = `${vars.woo_pass}`;
  let headers = new Headers();
  headers.set('Content-Type', 'application/json');
  headers.set('Authorization', 'Basic ' + btoa(username + ":" + password));
  fetch(url, { method: 'GET', headers: headers, credentials: 'omit' })
      .then((response) => {
        if (response.ok) {
          return response.json(); // Return the Promise to be handled in the next .then
        } else {
          resolve(false); // Resolve with false if response is not OK
        }
      })
      .then((data) => {
        // Check if data is an array and not empty
        if (Array.isArray(data) && data.length > 0) {
          resolve(data); // Resolve with the data if it's a non-empty array
        } else {
          resolve(false); // Resolve with false if data is not a non-empty array
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        reject(error); // Reject the Promise if there's an error (e.g., network issue or invalid JSON)
      });
}) }, vars);
  if (false) {
    vars.logs = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let date = `${vars.payDate}`
date = new Date(date);
date = new Date (date.getTime()+60000);
date = date.getFullYear()+'-'+('0'+(date.getMonth()+1)).slice(-2)+'-'+('0'+date.getDate()).slice(-2)+'T'+('0'+date.getUTCHours()).slice(-2)+":"+('0'+date.getMinutes()).slice(-2)+":"+('0'+date.getSeconds()).slice(-2);


return new Promise(function (resolve, reject) {
  const url = `${vars.startUrl}` + 'wp-json/wc-automation-helper/log-request-response-group/?datetime='+`${vars.payDate}&initial_request_slug=ondemand`;
  const username = `${vars.woo_user}`;
  const password = `${vars.woo_pass}`;
  let headers = new Headers();
  headers.set('Content-Type', 'application/json');
  headers.set('Authorization', 'Basic ' + btoa(username + ":" + password));
  fetch(url, {method:'GET', headers: headers, credentials: 'omit'})
  .then(function(response) {
    if (response.ok) {
      resolve(response.json())
    } else {
      resolve(false)
    } 
  })
  }) }, vars);
  }
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let logs = vars.logs
return logs === false }, vars)).toBeTruthy();
}

// GI: "Get Log request response - no /transactions" (623664cbaacde4b9870b987c)
export async function getLogRequestResponseNoTransactions(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.logs = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return new Promise(function (resolve, reject) {
  const url = `${vars.startUrl}` + 'wp-json/wc-automation-helper/log-request-response-group/?datetime='+`${vars.payDate}&initial_request_slug=transactions`;
  const username = `${vars.woo_user}`;
  const password = `${vars.woo_pass}`;
  let headers = new Headers();
  headers.set('Content-Type', 'application/json');
  headers.set('Authorization', 'Basic ' + btoa(username + ":" + password));
  fetch(url, {method:'GET', headers: headers, credentials: 'omit'})
  .then(function(response) {
    if (response.ok) {
      resolve(response.json())
    } else {
      resolve(false)
    } 
  })
  }) }, vars);
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); 
let logs = vars.logs
return logs === false }, vars)).toBeTruthy();
  vars.logs = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let date = `${vars.payDate}`
date = new Date(date);
date = new Date (date.getTime()+60000);
date = date.getFullYear()+'-'+('0'+(date.getMonth()+1)).slice(-2)+'-'+('0'+date.getDate()).slice(-2)+'T'+('0'+date.getUTCHours()).slice(-2)+":"+('0'+date.getMinutes()).slice(-2)+":"+('0'+date.getSeconds()).slice(-2);


return new Promise(function (resolve, reject) {
  const url = `${vars.startUrl}` + 'wp-json/wc-automation-helper/log-request-response-group/?datetime='+`${vars.payDate}&initial_request_slug=transaction`;
  const username = `${vars.woo_user}`;
  const password = `${vars.woo_pass}`;
  let headers = new Headers();
  headers.set('Content-Type', 'application/json');
  headers.set('Authorization', 'Basic ' + btoa(username + ":" + password));
  fetch(url, {method:'GET', headers: headers, credentials: 'omit'})
  .then(function(response) {
    if (response.ok) {
      resolve(response.json())
    } else {
      resolve(false)
    } 
  })
  }) }, vars);
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let logs = vars.logs
return logs === false }, vars)).toBeTruthy();
}

// GI: "Get Log request response - refunds" (61fd1cdf9fa735249fdf9e75)
export async function getLogRequestResponseRefunds(page: Page, vars: Record<string, string> = {}): Promise<void> {
  if ((() => { let currency = vars.currency
let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
/*currency !== "JPY" || (currency === "JPY" && (Number(blueSnapVs[0]) >= 3 && Number(blueSnapVs[1]) >= 4))*/
return true })()) {
    vars.logs = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return new Promise(function (resolve, reject) {
  const url = `${vars.startUrl}` + `wp-json/wc-automation-helper/log-request-response/?url_path=/transactions/${vars.transaction_id}/refund`;
  const username = `${vars.woo_user}`;
  const password = `${vars.woo_pass}`;
  let headers = new Headers();
  headers.set('Content-Type', 'application/json');
  headers.set('Authorization', 'Basic ' + btoa(username + ":" + password));
  fetch(url, {method:'GET', headers: headers, credentials: 'omit'})
  .then(function(response) {
    if (response.ok) {
      resolve(response.json())
    } else {
      reject(new Error('error'))
    } 
  })
  }) }, vars);
  }
}

// GI: "Get Log request response - transactions" (62374711aacde4b98726644d)
export async function getLogRequestResponseTransactions(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.logs = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); 
return new Promise(function (resolve, reject) {
  const url = `${vars.startUrl}` + 'wp-json/wc-automation-helper/log-request-response/?url_path=/transactions'
  const username = `${vars.woo_user}`;
  const password = `${vars.woo_pass}`;
  let headers = new Headers();
  headers.set('Content-Type', 'application/json');
  headers.set('Authorization', 'Basic ' + btoa(username + ":" + password));
  fetch(url, {method:'GET', headers: headers, credentials: 'omit'})
  .then(function(response) {
    if (response.ok) {
      resolve(response.json())
    } else {
      resolve([])
    } 
  })
  })
 }, vars);
}

// GI: "Get Log request response - Upgrade" (61b217bcc9d89130135bfd37)
export async function getLogRequestResponseUpgrade(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.logs = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return new Promise(function (resolve, reject) {
  const url = `${vars.startUrl}` + `wp-json/wc-automation-helper/log-request-response/?url_path=/recurring/subscriptions/${vars.subsID}`;
  const username = `${vars.woo_user}`;
  const password = `${vars.woo_pass}`;
  let headers = new Headers();
  headers.set('Content-Type', 'application/json');
  headers.set('Authorization', 'Basic ' + btoa(username + ":" + password));
  fetch(url, {method:'GET', headers: headers, credentials: 'omit'})
  .then(function(response) {
    if (response.ok) {
      resolve(response.json())
    } else {
      reject(new Error('error'))
    } 
  })
  }) }, vars);
}

// GI: "Get Log request response - vaulted shopper" (621790cd5b434a506348e639)
export async function getLogRequestResponseVaultedShopper(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.logs = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return new Promise(function (resolve, reject) {
  const url = `${vars.startUrl}` + `wp-json/wc-automation-helper/log-request-response/?url_path=/vaulted-shoppers/${vars.vaultedShopperId}`;
  const username = `${vars.woo_user}`;
  const password = `${vars.woo_pass}`;
  let headers = new Headers();
  headers.set('Content-Type', 'application/json');
  headers.set('Authorization', 'Basic ' + btoa(username + ":" + password));
  fetch(url, {method:'GET', headers: headers, credentials: 'omit'})
  .then(function(response) {
    if (response.ok) {
      resolve(response.json())
    } else {
      resolve([])
    } 
  })
  }) }, vars);
}

// GI: "Get Log request response - vaulted shopper - add payment method" (621d22920271df9af5bfdbeb)
export async function getLogRequestResponseVaultedShopperAddPaymentMethod(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.logs = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return new Promise(function (resolve, reject) {
  const url = `${vars.startUrl}` + 'wp-json/wc-automation-helper/log-request-response/?url_path=/vaulted-shoppers';
  const username = `${vars.woo_user}`;
  const password = `${vars.woo_pass}`;
  let headers = new Headers();
  headers.set('Content-Type', 'application/json');
  headers.set('Authorization', 'Basic ' + btoa(username + ":" + password));
  fetch(url, {method:'GET', headers: headers, credentials: 'omit'})
  .then(function(response) {
    if (response.ok) {
      resolve(response.json())
    } else {
      reject(new Error('error'))
    } 
  })
  }) }, vars);
}

// GI: "Get Mini-cart currency prices" (635c28ae151ae3d9c5b53157)
export async function getMiniCartCurrencyPrices(page: Page, vars: Record<string, string> = {}): Promise<void> {
  if ((() => { let currency = vars.defaultCurr
return currency === vars.currency || vars.currency === "" })()) {
    vars.resultDefault = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let content = Array.from<any>(document.querySelectorAll(".woocommerce-mini-cart-item.mini_cart_item .woocommerce-Price-amount.amount"))
let minicart = Array.from<any>(document.querySelectorAll(".cart-contents > span.woocommerce-Price-amount.amount"))
let result = []

for (let i = 0; i < content.length; i++) {
        result.push(content[i].textContent);
    }
for (let i = 0; i < minicart.length; i++) {
        result.push(minicart[i].textContent);
    }

return result }, vars);
  }
  if ((() => { let currency = vars.curr
return currency === vars.currency })()) {
    vars.resultEUR = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let content = Array.from<any>(document.querySelectorAll(".woocommerce-mini-cart-item.mini_cart_item .woocommerce-Price-amount.amount"))
let minicart = Array.from<any>(document.querySelectorAll(".cart-contents > span.woocommerce-Price-amount.amount"))
let result = []

for (let i = 0; i < content.length; i++) {
        result.push(content[i].textContent);
    }
for (let i = 0; i < minicart.length; i++) {
        result.push(minicart[i].textContent);
    }

return result }, vars);
  }
}

// GI: "Get Pre Order version" (64e89de54c06b965a964daba)
export async function getPreOrderVersion(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.pluginLog = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return new Promise(function (resolve, reject) {
  const username = "demouser"; 
  const password = `${vars.wp_api_pass}`; 
  const url = `${vars.startUrl}wp-json/wp/v2/plugins/woocommerce-pre-orders/woocommerce-pre-orders`;
  let headers = new Headers();
  headers.set('Content-Type', 'application/json');
  headers.set('Authorization', 'Basic ' + btoa(username + ":" + password));
  fetch(url, {method:'GET',
      headers: headers, 
      credentials: 'omit'
      })
  .then(function(response) {
    if (response.ok) {
    resolve(response.json())
    } else {
    reject(new Error('error'))
    } 
  })
}) }, vars);
  vars.PreOrderVs = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const pluginLog = vars.pluginLog
return pluginLog.version }, vars);
}

// GI: "Get Site Title" (6634f5ac89e87fd8391d9c05)
export async function getSiteTitle(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.siteSettings = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return new Promise(function (resolve, reject) {
  const username = "demouser"; 
  const password = `${vars.wp_api_pass}`; 
  const url = `${vars.startUrl}wp-json/wp/v2/settings`;
  let headers = new Headers();
  headers.set('Content-Type', 'application/json');
  headers.set('Authorization', 'Basic ' + btoa(username + ":" + password));
  fetch(url, {method:'GET',
      headers: headers, 
      credentials: 'omit'
      })
  .then(function(response) {
    if (response.ok) {
    resolve(response.json())
    } else {
    reject(new Error('error'))
    } 
  })
}) }, vars);
  vars.blog = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let siteSettings = vars.siteSettings
let title = siteSettings.title
title = title.toLowerCase().replace(/\s/g,'_')

return title
 }, vars);
  vars.title = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let siteSettings = vars.siteSettings
let title = siteSettings.title

return title
 }, vars);
  await cleanEmails(page, vars);
}

// GI: "Get transaction Details from Bluesnap" (61dc4e5d0698fd5fcf0e1955)
export async function getTransactionDetailsFromBluesnap(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.transLogs = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return new Promise(function (resolve, reject) {
  const url = `${vars.startUrl}` + 'wp-json/wc-automation-helper/api-request/?url=transactions/'+`${vars.transaction_id}`;
  const username = `${vars.woo_user}`;
  const password = `${vars.woo_pass}`;
  let headers = new Headers();
  headers.set('Content-Type', 'application/json');
  headers.set('Authorization', 'Basic ' + btoa(username + ":" + password));
  fetch(url, {method:'GET', headers: headers, credentials: 'omit'})
  .then(function(response) {
    if (response.ok) {
      resolve(response.json())
    } else {
      reject(new Error('error'))
    } 
  })
  }) }, vars);
  vars.transactionApprovalTime = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const jsonOrder = vars.transLogs
return jsonOrder.transactionApprovalTime }, vars);
  vars.vaultedShopperId = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const jsonOrder = vars.transLogs
return jsonOrder.vaultedShopperId }, vars);
}

// GI: "Get users" (62bf4d305a1bf494e90327d3)
export async function getUsers(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.myUsers = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return new Promise(function (resolve, reject) {
  const username = `${vars.woo_user}`; 
  const password = `${vars.woo_pass}`; 
  const url = `${vars.startUrl}wp-json/wc/v3/customers/?search=${vars.username}`;
  let headers = new Headers();
  headers.set('Content-Type', 'application/json');
  headers.set('Authorization', 'Basic ' + btoa(username + ":" + password));
  fetch(url, {method:'GET',
      headers: headers, 
      credentials: 'omit'
      })
  .then(function(response) {
    if (response.ok) {
    resolve(response.json())
    } else {
    reject(new Error('error'))
    } 
  })
}) }, vars);
  vars.userId = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const jsonUsers = vars.myUsers
return jsonUsers[0].id }, vars);
}

// GI: "Get variables for subscriptions" (61fbf4c39357d693ef1f4b90)
export async function getVariablesForSubscriptions(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.chargeId = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[1].content.chargeId }, vars);
  vars.subsID = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[1].content.subscriptionId  }, vars);
  vars.vaultedShopperId = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[1].content.vaultedShopperId }, vars);
}

// GI: "Get Woo order details" (60afddfb373d3a09fef13e98)
export async function getWooOrderDetails(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.myOrder = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return new Promise(function (resolve, reject) {
  const order = vars.orderNumber;
  const username = `${vars.woo_user}`; 
  const password = `${vars.woo_pass}`; 
  const url = `${vars.startUrl}wp-json/wc/v3/orders/`+order;
  let headers = new Headers();
  headers.set('Content-Type', 'application/json');
  headers.set('Authorization', 'Basic ' + btoa(username + ":" + password));
  fetch(url, {method:'GET',
      headers: headers,
      credentials: 'omit',
      })
  .then(function(response) {
    if (response.ok) {
    resolve(response.json())
    } else {
    reject(new Error('error'))
    } 
  })
}) }, vars);
  vars.transaction_id = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const jsonOrder = vars.myOrder
return jsonOrder.transaction_id }, vars);
  vars.paymentMethodTitle = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const jsonOrder = vars.myOrder
return jsonOrder.payment_method_title }, vars);
  vars.payDateRenew = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const jsonOrder = vars.myOrder
return jsonOrder.date_modified }, vars);
  vars.total = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const jsonOrder = vars.myOrder
return Number(jsonOrder.total) }, vars);
  if ((() => { let currency = vars.curr
let scenario = vars.scenario
return scenario === "multi-currency" && currency === "JPY" })()) {
    vars.total = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let total = vars.total
total = Math.round(total)
return total }, vars);
  }
  vars.shippingTotal = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const jsonOrder = vars.myOrder
return jsonOrder.shipping_total }, vars);
  vars.shippingTaxTotal = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const jsonOrder = vars.myOrder
return jsonOrder.shipping_tax }, vars);
}

// GI: "Get Woo order failed" (61793652e3892d651a992c7e)
export async function getWooOrderFailed(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.myOrders = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return new Promise(function (resolve, reject) {
  const username = `${vars.woo_user}`; 
  const password = `${vars.woo_pass}`; 
  const url = `${vars.startUrl}wp-json/wc/v3/orders?status=failed`;
  let headers = new Headers();
  headers.set('Content-Type', 'application/json');
  headers.set('Authorization', 'Basic ' + btoa(username + ":" + password));
  fetch(url, {method:'GET',
      headers: headers, 
      credentials: 'omit'
      
      })
  .then(function(response) {
    if (response.ok) {
    resolve(response.json())
    } else {
    reject(new Error('error'))
    } 
  })
}) }, vars);
  if ((() => { let test = vars['3ds']
return test != "1.0d" && test != "2.0d" && test != "2.0dW" })()) {
    vars.orderNumber = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const jsonOrder = vars.myOrders
return jsonOrder[0].id }, vars);
  }
  if ((() => { let test = vars['3ds']
return test != "1.0d" && test != "2.0d" && test != "2.0dW" })()) {
    vars.payDate = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const jsonOrder = vars.myOrders
return jsonOrder[0].date_modified }, vars);
  }
  if ((() => { let test = vars['3ds']
return test != "1.0d" && test != "2.0d" && test != "2.0dW" })()) {
    vars.paymentMethodTitle = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const jsonOrder = vars.myOrders
return jsonOrder[0].payment_method_title }, vars);
  }
}

// GI: "Get Woo subscription details" (6182d15923071a6a859d55f2)
export async function getWooSubscriptionDetails(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.mySubscription = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return new Promise(function (resolve, reject) {
  const subscription = vars.subscriptionID;
  const username = `${vars.woo_user}`; 
  const password = `${vars.woo_pass}`; 
  const url = `${vars.startUrl}wp-json/wc/v3/subscriptions/`+subscription;
  let headers = new Headers();
  headers.set('Content-Type', 'application/json');
  headers.set('Authorization', 'Basic ' + btoa(username + ":" + password));
  fetch(url, {method:'GET',
      headers: headers, 
      credentials: 'omit'
      })
  .then(function(response) {
    if (response.ok) {
    resolve(response.json())
    } else {
    reject(new Error('error'))
    } 
  })
}) }, vars);
  vars.totalRenew = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const jsonOrder = vars.mySubscription
return Number(jsonOrder.total) }, vars);
  if ((() => { let id = vars.testID
return id != "BLU-002-029" && id != "BLU-002-031" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const jsonOrder = vars.mySubscription
return jsonOrder.payment_method_title === `${vars.paymentMethodTitle}` }, vars)).toBeTruthy();
  }
  if ((() => { let id = vars.testID 
return id === "BLU-002-029" ||  id === "BLU-002-031" })()) {
    vars.paymentMethodTitle = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const jsonOrder = vars.mySubscription
return jsonOrder.payment_method_title }, vars);
  }
  vars.shippingTotal = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const jsonOrder = vars.mySubscription
return jsonOrder.shipping_total }, vars);
  vars.shippingTaxTotal = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const jsonOrder = vars.mySubscription
return jsonOrder.shipping_tax }, vars);
}

// GI: "Go to My Account" (61b35d62a13e6dcc564804ef)
export async function goToMyAccount(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.locator(`a[href*="/my-account/"]`).filter({ visible: true }).first().click({ force: true });
}

// GI: "Go To Order with Admin" (61e9747fbd8d00e4de7e084c)
export async function goToOrderWithAdmin(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.locator(`a[href="admin.php?page=wc-admin"] > .wp-menu-name`).filter({ visible: true }).first().click({ force: true });
  await page.locator(`a[href="edit.php?post_type=shop_order"]`).or(page.locator(`a[href="admin.php?page=wc-orders"]`)).filter({ visible: true }).first().click({ force: true });
  await page.waitForLoadState('load');
  vars.orderVisible = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let legacy = document.querySelectorAll(`a[href*="/wp-admin/post.php?post=${vars.orderNumber}&action=edit"] > strong`);
let hpos = document.querySelectorAll(`a[href*="/wp-admin/admin.php?page=wc-orders&action=edit&id=${vars.orderNumber}"] > strong`);
let boolean = false
if (legacy.length == 1 || hpos.length == 1) {
    boolean = true
}

return boolean
 }, vars);
  if ((() => { let orderVisible = vars.orderVisible

return orderVisible === "true" })()) {
    await page.locator(`a[href*="/wp-admin/post.php?post=${vars.orderNumber ?? ''}&action=edit"] > strong`).or(page.locator(`a[href*="/wp-admin/admin.php?page=wc-orders&action=edit&id=${vars.orderNumber ?? ''}"] > strong`)).filter({ visible: true }).first().click({ force: true });
  }
  if ((() => { let orderVisible = vars.orderVisible

return orderVisible === "false" })()) {
    await page.locator(`.next-page.button`).filter({ visible: true }).first().click({ force: true });
  }
  if ((() => { let orderVisible = vars.orderVisible

return orderVisible === "false" })()) {
    await page.waitForLoadState('load');
  }
  if ((() => { let orderVisible = vars.orderVisible

return orderVisible === "false" })()) {
    await page.locator(`a[href*="/wp-admin/post.php?post=${vars.orderNumber ?? ''}&action=edit"] > strong`).or(page.locator(`a[href*="/wp-admin/admin.php?page=wc-orders&action=edit&id=${vars.orderNumber ?? ''}"] > strong`)).filter({ visible: true }).first().click({ force: true });
  }
}

// GI: "Go to Pending Payment order" (61ded6705b9a7d92d2b8de48)
export async function goToPendingPaymentOrder(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.locator(`a[href*="/my-account/orders/"]`).filter({ visible: true }).first().click({ force: true });
  await page.locator(`a[href*="/checkout/order-pay/${vars.orderNumber ?? ''}/?pay_for_order=true&key=wc_order"]`).filter({ visible: true }).first().click({ force: true });
}

// GI: "Go To Subscription with Admin " (64f735715e52a69a7567ef1b)
export async function goToSubscriptionWithAdmin(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.locator(`a[href="admin.php?page=wc-admin"] > .wp-menu-name`).filter({ visible: true }).first().click({ force: true });
  await page.locator(`a[href="edit.php?post_type=shop_subscription"]`).or(page.locator(`a[href="admin.php?page=wc-orders--shop_subscription"]`)).filter({ visible: true }).first().click({ force: true });
  await page.locator(`a[href*="/wp-admin/post.php?post=${vars.subscriptionID ?? ''}&action=edit"]`).or(page.locator(`a[href*="/wp-admin/admin.php?page=wc-orders--shop_subscription&action=edit&id=${vars.subscriptionID ?? ''}"]`)).filter({ visible: true }).first().click({ force: true });
}

// GI: "Log in" (60c91e7a4f70ce5aa436fe2a)
export async function logIn(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.locator(`.nav-menu > .page_item > a[href*="/my-account/"]`).filter({ visible: true }).first().click({ force: true });
  try { await page.locator(`#username`).first().fill(`${vars.username ?? ''}`); } catch { await page.locator(`#username`).first().selectOption(`${vars.username ?? ''}`); }
  try { await page.locator(`#password`).first().fill(`${vars.password ?? ''}`); } catch { await page.locator(`#password`).first().selectOption(`${vars.password ?? ''}`); }
  await page.locator(`xpath=//button[contains(text(), "Log in")]`).or(page.locator(`button[name="login"]`)).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`h1.entry-title`).first()).toContainText(`My account`);
}

// GI: "Login admin" (61d5b5207e5be41b1d21e1ed)
export async function loginAdmin(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.goto(`${vars.startUrl ?? ''}wp-admin/`);
  await page.waitForLoadState('load');
  try { await page.locator(`#user_login`).first().fill(`demouser`); } catch { await page.locator(`#user_login`).first().selectOption(`demouser`); }
  try { await page.locator(`#user_pass`).first().fill(`demopass`); } catch { await page.locator(`#user_pass`).first().selectOption(`demopass`); }
  {
    const _lbl = page.locator(`label[for="wp-submit"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#wp-submit`).filter({ visible: true }).first().click({ force: true }); }
  }
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let element = document.getElementById('correct-admin-email')
return element != null && element != undefined }, vars)) {
    {
      const _lbl = page.locator(`label[for="correct-admin-email"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#correct-admin-email`).filter({ visible: true }).first().click({ force: true }); }
    }
  }
}

// GI: "Pay order - Pending Payment" (61d6e11c28dae1039a253733)
export async function payOrderPendingPayment(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.locator(`.woocommerce-MyAccount-navigation-link > a[href*="/my-account/orders/"]`).filter({ visible: true }).first().click({ force: true });
  await page.locator(`a[href*="/checkout/order-pay/${vars.orderNumber ?? ''}/?pay_for_order=true&key=wc_order_"]`).filter({ visible: true }).first().click({ force: true });
}

// GI: "Payment Method Menu - ACH/CC available" (60afb03fc894e66ce1667086)
export async function paymentMethodMenuACHCCAvailable(page: Page, vars: Record<string, string> = {}): Promise<void> {
  try {
    await page.locator(`.nav-menu > li.page-item-7 > a`).filter({ visible: true }).first().click({ force: true });
  } catch { /* optional step: click */ }
  await page.locator(`.woocommerce-MyAccount-navigation-link > a[href*="/my-account/payment-methods/"]`).filter({ visible: true }).first().click({ force: true });
  vars.n = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let num = document.getElementsByClassName("payment-method").length
return num }, vars);
  if ((() => { let payment = vars.payment
return (payment !== "ach" && vars.saveCC !== "disabled") || (vars.test === "subscription" && vars.saveCC === "disabled") })()) {
    await expect(page.locator(`tr:nth-child(${vars.n ?? ''}) > td.woocommerce-PaymentMethod.woocommerce-PaymentMethod--method`).first()).toContainText(`${vars.CCName ?? ''} ending in ${vars.fourDigits ?? ''}`);
  }
  if ((() => { let payment = vars.payment
return (payment !== "ach" && vars.saveCC !== "disabled") || (vars.test === "subscription" && vars.saveCC === "disabled") })()) {
    await expect(page.locator(`tr:nth-child(${vars.n ?? ''}) > td.woocommerce-PaymentMethod.woocommerce-PaymentMethod--expires`).first()).toContainText(`${vars.month ?? ''}/${vars.year ?? ''}`);
  }
  if ((() => { let test =vars.test
return test === "002-009" || test === "002-021" || test === "002-012" })()) {
    await expect(page.locator(`tr:nth-child(${vars.n ?? ''}) > td.woocommerce-PaymentMethod.woocommerce-PaymentMethod--method`).first()).toContainText(`Consumer Checking Account ending in 44556`);
  }
  if ((() => { let payment = vars.payment
return payment === "ach" })()) {
    await expect(page.locator(`tr:nth-child(${vars.n ?? ''}) > td.woocommerce-PaymentMethod.woocommerce-PaymentMethod--expires`).first()).toContainText(`N/A`);
  }
  if ((() => { let test =vars.test
return test === "002-011" || test === "002-013" })()) {
    await expect(page.locator(`tr:nth-child(${vars.n ?? ''}) > td.woocommerce-PaymentMethod.woocommerce-PaymentMethod--method`).first()).toContainText(`Corporate Checking Account ending in 44556`);
  }
  if ((() => { let test =vars.test
return test === "002-012-B" })()) {
    await expect(page.locator(`tr:nth-child(1) > td.woocommerce-PaymentMethod.woocommerce-PaymentMethod--method`).first()).toContainText(`Consumer Checking Account ending in 44556`);
  }
  if ((() => { let test =vars.test
return test === "002-012-B" })()) {
    await expect(page.locator(`tr:nth-child(2) > td.woocommerce-PaymentMethod.woocommerce-PaymentMethod--method`).first()).toContainText(`Consumer Checking Account ending in 45562`);
  }
  if (vars.saveCC === "disabled" && vars.test !== "subscription") {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return `${vars.n}` === "0" }, vars)).toBeTruthy();
  }
  if (vars.saveCC === "disabled" && vars.test !== "subscription") {
    await expect(page.locator(`.woocommerce-info`).or(page.locator(`.wc-block-components-notice-banner.is-info`)).first()).toHaveText(`No saved methods found.`);
  }
}

// GI: "Payment Method Menu - ACH/CC not present" (62b085c6183cb14313fe7b92)
export async function paymentMethodMenuACHCCNotPresent(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.locator(`.woocommerce-MyAccount-navigation-link > a[href*="/my-account/payment-methods/"]`).filter({ visible: true }).first().click({ force: true });
  vars.n = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let num = document.getElementsByClassName("payment-method").length
return num }, vars);
  if ((() => { let payment = vars.payment
return payment != "ach" })()) {
    // TODO: command="assertTextNotPresent" target="tr:nth-child({{n}}) > td.woocommerce-PaymentMethod.woocommerce-PaymentMethod--method" value="{{CCName}} ending in {{fourDigits}}"
  }
  if ((() => { let test =vars.test
return test === "002-009" || test === "002-021" })()) {
    await expect(page.locator(`tr:nth-child(${vars.n ?? ''}) > td.woocommerce-PaymentMethod.woocommerce-PaymentMethod--method`).first()).toContainText(`Consumer checking account ending in 44556`);
  }
  if ((() => { let payment = vars.payment
return payment === "ach" })()) {
    await expect(page.locator(`tr:nth-child(${vars.n ?? ''}) > td.woocommerce-PaymentMethod.woocommerce-PaymentMethod--expires`).first()).toContainText(`N/A`);
  }
  if ((() => { let test =vars.test
return test === "002-011" || test === "002-013" || test === "002-012" })()) {
    await expect(page.locator(`tr:nth-child(${vars.n ?? ''}) > td.woocommerce-PaymentMethod.woocommerce-PaymentMethod--method`).first()).toContainText(`Corporate checking account ending in 44556`);
  }
}

// GI: "Payment Method Menu - No CC" (6183bf8905bc2f0b1331072a)
export async function paymentMethodMenuNoCC(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.locator(`.woocommerce-MyAccount-navigation-link > a[href*="/my-account/payment-methods/"]`).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`.woocommerce-info`).or(page.locator(`.wc-block-components-notice-banner.is-info`)).first()).toHaveText(`No saved methods found.`);
}

// GI: "Payment section enabled" (64cd9836e71b46cb75bf6bcb)
export async function paymentSectionEnabled(page: Page, vars: Record<string, string> = {}): Promise<void> {
  try {
    await expect(page.locator(`label[for="payment_method_bluesnap"]`).first()).toHaveText(` Credit/Debit Card`);
  } catch { /* optional step: assertText */ }
  try {
    await expect(page.locator(`label[for="wc-bluesnap-payment-token-new"]`).first()).toHaveText(`Use a new payment method`);
  } catch { /* optional step: assertText */ }
  try {
    await expect(page.locator(`#bluesnap-card-number`)).not.toHaveCount(0);
  } catch { /* optional step: assertElementPresent */ }
  try {
    await expect(page.locator(`#bluesnap-card-expiry`)).not.toHaveCount(0);
  } catch { /* optional step: assertElementPresent */ }
  try {
    await expect(page.locator(`#bluesnap-card-cvc`)).not.toHaveCount(0);
  } catch { /* optional step: assertElementPresent */ }
  await placeOrderButtonEnabled(page, vars);
}

// GI: "PayPal BlueSnap template " (64dbe24332faa072bdd7fb18)
export async function payPalBlueSnapTemplate(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await blockUI(page, vars);
  {
    let _ok = false;
    if (!_ok) { try { await page.locator(`iframe[title="PayPal"]`).first().contentFrame().locator(`.paypal-button.paypal-button-number-0`).first().click({ force: true }); _ok = true; } catch {} }
    if (!_ok) { try { await page.locator(`iframe[title="PayPal"]`).first().click({ force: true }); _ok = true; } catch {} }
    if (!_ok) throw new Error('No clickable candidate matched');
  }
  try {
    await expect(page.locator(`.loader`)).not.toHaveCount(0);
  } catch { /* optional step: assertElementPresent */ }
  try {
    await expect(page.locator(`.loader`)).toHaveCount(0);
  } catch { /* optional step: assertElementNotPresent */ }
  try {
    await page.locator(`xpath=//a[contains(text(), "Click to Continue")]`).filter({ visible: true }).first().click({ force: true });
  } catch { /* optional step: click */ }
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return document.querySelector('#backToInputEmailLink') }, vars)) {
    {
      const _lbl = page.locator(`label[for="backToInputEmailLink"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#backToInputEmailLink`).filter({ visible: true }).first().click({ force: true }); }
    }
  }
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return document.querySelector<HTMLAnchorElement>('a.btn') }, vars)) {
    await page.locator(`xpath=//a[contains(text(), "Iniciar sesión")]`).or(page.locator(`a.btn`)).filter({ visible: true }).first().click({ force: true });
  }
  try { await page.locator(`#email`).or(page.locator(`input[name='login_email']`)).or(page.locator(`input#login_email`)).first().fill(``); } catch { await page.locator(`#email`).or(page.locator(`input[name='login_email']`)).or(page.locator(`input#login_email`)).first().selectOption(``); }
  try { await page.locator(`input#email`).or(page.locator(`input[name='login_email']`)).first().fill(`${vars.payPalUser ?? ''}`); } catch { await page.locator(`input#email`).or(page.locator(`input[name='login_email']`)).first().selectOption(`${vars.payPalUser ?? ''}`); }
  await page.locator(`button#btnNext`).or(page.locator(`button[name='btnNext']`)).or(page.locator(`xpath=//button[contains(text(),'Next')]`)).filter({ visible: true }).first().click({ force: true });
  try {
    await expect(page.locator(`div.lockIcon`)).not.toHaveCount(0);
  } catch { /* optional step: assertElementPresent */ }
  try {
    await expect(page.locator(`div.lockIcon`)).toHaveCount(0);
  } catch { /* optional step: assertElementNotPresent */ }
  try {
    await page.locator(`xpath=//a[contains(text(),'Log in with a password instead')]`).or(page.locator(`xpath=//button[contains(text(),'Use Password Instead')]`)).filter({ visible: true }).first().click({ force: true });
  } catch { /* optional step: click */ }
  try { await page.locator(`div > input#password`).or(page.locator(`input[name='login_password']`)).first().fill(`${vars.payPalPass ?? ''}`); } catch { await page.locator(`div > input#password`).or(page.locator(`input[name='login_password']`)).first().selectOption(`${vars.payPalPass ?? ''}`); }
  await page.locator(`button[data-atomic-wait-intent='Submit_Password']`).or(page.locator(`button#btnLogin`)).or(page.locator(`button[name='btnLogin']`)).or(page.locator(`xpath=//button[contains(text(), "Log In")][1]`)).filter({ visible: true }).first().click({ force: true });
  try {
    await expect(page.locator(`div.lockIcon`)).not.toHaveCount(0);
  } catch { /* optional step: assertElementPresent */ }
  try {
    await expect(page.locator(`div.lockIcon`)).toHaveCount(0);
  } catch { /* optional step: assertElementNotPresent */ }
  {
    const _lbl = page.locator(`label[for="payment-submit-btn"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`[data-testid="submit-button-initial"]`).or(page.locator(`xpath=//button[contains(text(), "Complete Purchase")]`)).or(page.locator(`#payment-submit-btn`)).or(page.locator(`#one-time-cta > div > div > div.pe-2`)).or(page.locator(`xpath=//button[@id='one-time-cta']/div/div/div[contains(text(), "Pay")]`)).filter({ visible: true }).first().click({ force: true }); }
  }
  await page.waitForTimeout(2000);
  try {
    await expect(page.locator(`.Spinner_spinner_2t_Ob`).or(page.locator(`div[class*="Spinner_SpinnerLoader"]`)).or(page.locator(`div.lockIcon`))).not.toHaveCount(0);
  } catch { /* optional step: assertElementPresent */ }
  try {
    await expect(page.locator(`.Spinner_spinner_2t_Ob`).or(page.locator(`div[class*="Spinner_SpinnerLoader"]`)).or(page.locator(`div.lockIcon`))).toHaveCount(0);
  } catch { /* optional step: assertElementNotPresent */ }
  await page.waitForLoadState('load');
  await blockUI(page, vars);
}

// GI: "Place Order" (60ae9973386331066dbb4dad)
export async function placeOrder(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await blockUI(page, vars);
  await expect(page.locator(`#place_order`).or(page.locator(`xpath=//button[contains(text(), "Place order")]`)).or(page.locator(`.wc-block-components-checkout-place-order-button`)).or(page.locator(`xpath=//button/span/div[contains(text(), "Place Order")]`))).not.toHaveCount(0);
  await expect(page.locator(`#place_order`).or(page.locator(`xpath=//button[contains(text(), "Place order")]`)).or(page.locator(`.wc-block-components-checkout-place-order-button`)).or(page.locator(`xpath=//button/span/div[contains(text(), "Place Order")]`)).first()).toBeVisible();
  await placeOrderButtonEnabled(page, vars);
  if ((() => { let _3dsSetting = vars['3dsSetting'];
let BlueSnapVs = vars.BlueSnapVs;
BlueSnapVs = BlueSnapVs.split('.');
let payment = vars.payment;
let payForOrder = vars.payForOrder
let useSavedCC = vars.useSavedCC

return ((Number(BlueSnapVs[0]) === 3 && Number(BlueSnapVs[1]) === 0)
||(Number(BlueSnapVs[0]) === 2 && Number(BlueSnapVs[1])===6))
&& 
_3dsSetting !== "deactivated" &&
        payment === "cc" && payForOrder !== "yes" && useSavedCC !== "yes" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const targetElement = document.querySelector<HTMLButtonElement>('#place_order, .wc-block-components-checkout-place-order-button');
return targetElement.getAttribute('data-bluesnap') === 'submitButton' }, vars)).toBeTruthy();
  }
  if ((() => { let _3dsSetting = vars['3dsSetting'];
let BlueSnapVs = vars.BlueSnapVs;
BlueSnapVs = BlueSnapVs.split('.');
let payment = vars.payment;
let useSavedCC = vars.useSavedCC

return (Number(BlueSnapVs[0]) >= 3 && Number(BlueSnapVs[1]) >= 2) && 
        _3dsSetting !== "deactivated" &&
        payment === "cc" && useSavedCC !== "yes" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const targetElement = document.querySelector<HTMLButtonElement>('#place_order, .wc-block-components-checkout-place-order-button');
return targetElement.getAttribute('data-bluesnap') === 'submitButton' }, vars)).toBeTruthy();
  }
  try {
    if ((() => { let _3dsSetting = vars['3dsSetting'];
let BlueSnapVs = vars.BlueSnapVs;
BlueSnapVs = BlueSnapVs.split('.');
let payment = vars.payment;
let useSavedCC = vars.useSavedCC

return (Number(BlueSnapVs[0]) >= 3 && Number(BlueSnapVs[1]) >= 2) && 
(_3dsSetting === "deactivated" ||
        payment !== "cc" || useSavedCC === "yes") })()) {
      expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const targetElement = document.querySelector<HTMLButtonElement>('#place_order, .wc-block-components-checkout-place-order-button');
return targetElement.getAttribute('data-bluesnap') === null }, vars)).toBeTruthy();
    }
  } catch { /* optional step: assertEval */ }
  if ((() => { let _3dsSetting = vars['3dsSetting'];
let BlueSnapVs = vars.BlueSnapVs;
BlueSnapVs = BlueSnapVs.split('.');
let payment = vars.payment;
let useSavedCC = vars.useSavedCC

return (Number(BlueSnapVs[0]) === 3 && Number(BlueSnapVs[1]) === 0) && 
(_3dsSetting === "deactivated" || useSavedCC === "yes") })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const targetElement = document.querySelector<HTMLButtonElement>('#place_order, .wc-block-components-checkout-place-order-button');
return targetElement.getAttribute('data-bluesnap') === null }, vars)).toBeTruthy();
  }
  if ((() => { let _3dsSetting = vars['3dsSetting'];
let BlueSnapVs = vars.BlueSnapVs;
BlueSnapVs = BlueSnapVs.split('.');
return (Number(BlueSnapVs[0]) === 2 && Number(BlueSnapVs[1]) === 6) && 
_3dsSetting === "deactivated" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const targetElement = document.querySelector<HTMLButtonElement>('#place_order, .wc-block-components-checkout-place-order-button');
return targetElement.getAttribute('data-bluesnap') === null }, vars)).toBeTruthy();
  }
  await extractDate(page, vars);
  {
    const _lbl = page.locator(`label[for="place_order"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#place_order`).or(page.locator(`xpath=//button[contains(text(), "Place order")]`)).or(page.locator(`.wc-block-components-checkout-place-order-button`)).or(page.locator(`xpath=//button/span/div[contains(text(), "Place Order")]`)).filter({ visible: true }).first().click({ force: true }); }
  }
  await blockUI(page, vars);
  if ((() => { let test = vars['3ds']
let threeDS = vars['3dsSetting']
let test2 = vars.IDTest
let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
return (test === "1.0a" || test === "1.0d" || test === "2.0aW" || test === "2.0dW") && threeDS === "activated" 
&& (
    ((test2 != "BLU-001-059" && test2 != "BLU-001-056") && (Number(blueSnapVs[0]) == 2 && Number(blueSnapVs[1]) == 5))
    ||((Number(blueSnapVs[0]) == 2 && Number(blueSnapVs[1]) == 6) || Number(blueSnapVs[0]) >= 3)
    ) })()) {
    await expect(page.locator(`#Cardinal-ElementContainer`).or(page.locator(`#cardinal-cruise-popup-container`))).not.toHaveCount(0);
  }
  if ((() => { let test = vars['3ds']
let threeDS = vars['3dsSetting']
let test2 = vars.IDTest
let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
return (test === "1.0a" || test === "1.0d" || test === "2.0aW" || test === "2.0dW") && threeDS === "activated" 
&& (
    ((test2 != "BLU-001-059" && test2 != "BLU-001-056") && (Number(blueSnapVs[0]) == 2 && Number(blueSnapVs[1]) == 5))
    ||((Number(blueSnapVs[0]) == 2 && Number(blueSnapVs[1]) == 6) || Number(blueSnapVs[0]) >= 3)
    ) })()) {
    await _3ds(page, vars);
  }
  if ((() => { let test = vars['3ds']
let threeDS = vars['3dsSetting']
let test2 = vars.IDTest
let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
return (test === "1.0a" || test === "1.0d" || test === "2.0aW" || test === "2.0dW") && threeDS === "activated" 
&& (
    ((test2 != "BLU-001-059" && test2 != "BLU-001-056") && (Number(blueSnapVs[0]) == 2 && Number(blueSnapVs[1]) == 5))
    ||((Number(blueSnapVs[0]) == 2 && Number(blueSnapVs[1]) == 6) || Number(blueSnapVs[0]) >= 3)
    ) })()) {
    await extractDate(page, vars);
  }
  if ((() => { let threeDS = vars['3dsSetting']
let test = vars['3ds']
let test2 = vars.test
let version =vars.version
return (test === "1.0a" || test === "1.0d" || test === "2.0aW" || test === "2.0dW") && threeDS === "deactivated" })()) {
    await expect(page.locator(`#Cardinal-ElementContainer`).or(page.locator(`#cardinal-cruise-popup-container`))).toHaveCount(0);
  }
  await blockUI(page, vars);
  await page.waitForLoadState('load');
  await expect(page.locator(`.woocommerce-notice`).first()).toContainText(`Thank you. Your order has been received.`);
  if ((() => { let scenario = vars.scenario
return scenario === "multi-currency" })()) {
    await expect(page.locator(`li > strong > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.total ?? ''}`);
  }
  vars.orderNumber = ((await page.locator(`.woocommerce-order-overview__order > strong:nth-child(1)`).textContent()) ?? '').trim();
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return document.getElementsByClassName("subscription-id").length > 0 }, vars)) {
    vars.subscription = ((await page.locator(`td.subscription-id.order-number.woocommerce-orders-table__cell.woocommerce-orders-table__cell-subscription-id.woocommerce-orders-table__cell-order-number > a`).textContent()) ?? '').trim();
  }
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return document.getElementsByClassName("subscription-id").length > 0 }, vars)) {
    vars.subscriptionID = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let subscription = `${vars.subscription}`;
subscription = subscription.replace("#","");
return subscription; }, vars);
  }
  vars.n = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let elements = Array.from<any>(document.querySelectorAll<HTMLTableElement>('section.woocommerce-order-details > table > tfoot > tr'))
let length = elements.length
return length-1 }, vars);
  if ((() => { let payment = vars.payment
return payment != "ach" })()) {
    await expect(page.locator(`.woocommerce-order-overview__payment-method.method > strong`).first()).toHaveText(`Credit/Debit Card`);
  }
  if ((() => { let payment = vars.payment
return payment != "ach" })()) {
    await expect(page.locator(`section.woocommerce-order-details > table > tfoot > tr:nth-child(${vars.n ?? ''}) > td`).first()).toHaveText(`Credit/Debit Card`);
  }
  if ((() => { let payment = vars.payment
return payment === "ach" })()) {
    await expect(page.locator(`.woocommerce-order-overview__payment-method.method > strong`).first()).toHaveText(`ACH/ECP Transactions`);
  }
  if ((() => { let payment = vars.payment
return payment === "ach" })()) {
    await expect(page.locator(`section.woocommerce-order-details > table > tfoot > tr:nth-child(${vars.n ?? ''}) > td`).first()).toHaveText(`ACH/ECP Transactions`);
  }
  await page.locator(`.nav-menu > .page_item > a[href*="/my-account/"]`).filter({ visible: true }).first().click({ force: true });
  await page.locator(`.woocommerce-MyAccount-navigation-link > a[href*="/my-account/orders/"]`).filter({ visible: true }).first().click({ force: true });
  if ((() => { let scenario = vars.scenario
return scenario === "multi-currency" })()) {
    await expect(page.locator(`tr:nth-of-type(1) > .woocommerce-orders-table__cell.woocommerce-orders-table__cell-order-total > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.total ?? ''}`);
  }
  await page.locator(`td.woocommerce-orders-table__cell.woocommerce-orders-table__cell-order-number > a[href*="/my-account/view-order/${vars.orderNumber ?? ''}/"]`).or(page.locator(`td > a[href*="/my-account/view-order/${vars.orderNumber ?? ''}/"]`)).or(page.locator(`th > a[href*="/my-account/view-order/${vars.orderNumber ?? ''}/"]`)).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`mark.order-status`).first()).toHaveText(`${vars.status ?? ''}`);
  vars.n = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let elements = Array.from<any>(document.querySelectorAll<HTMLTableElement>('section.woocommerce-order-details > table > tfoot > tr > th:not(.order-actions--heading)'))
let length = elements.length

return length-1 }, vars);
  if ((() => { let payment = vars.payment
return payment === "ach" })()) {
    await expect(page.locator(`section.woocommerce-order-details > table > tfoot > tr:nth-child(${vars.n ?? ''}) > td`).first()).toHaveText(`ACH/ECP Transactions`);
  }
  if ((() => { let payment = vars.payment
return payment != "ach" })()) {
    await expect(page.locator(`section.woocommerce-order-details > table > tfoot > tr:nth-child(${vars.n ?? ''}) > td`).first()).toHaveText(`Credit/Debit Card`);
  }
  if ((() => { let scenario = vars.scenario
let test = vars.test
return scenario === "multi-currency" })()) {
    await verifyCurrencyOnTheAfterPlaceOrder(page, vars);
  }
}

// GI: "Place Order - Guest user" (60afaebec894e66ce1666ab8)
export async function placeOrderGuestUser(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await extractDate(page, vars);
  await placeOrderButtonEnabled(page, vars);
  if ((() => { let _3dsSetting = vars['3dsSetting'];
let BlueSnapVs = vars.BlueSnapVs;
BlueSnapVs = BlueSnapVs.split('.');
let payment = vars.payment;
let payForOrder = vars.payForOrder

return ((Number(BlueSnapVs[0]) === 3 && Number(BlueSnapVs[1]) === 0)
||(Number(BlueSnapVs[0]) === 2 && Number(BlueSnapVs[1])===6)) && 
        _3dsSetting !== "deactivated" &&
        payment === "cc" && payForOrder !== "yes" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const targetElement = document.querySelector<HTMLButtonElement>('#place_order, .wc-block-components-checkout-place-order-button');
return targetElement.getAttribute('data-bluesnap') === 'submitButton' }, vars)).toBeTruthy();
  }
  if ((() => { let _3dsSetting = vars['3dsSetting'];
let BlueSnapVs = vars.BlueSnapVs;
BlueSnapVs = BlueSnapVs.split('.');
let payment = vars.payment;


return (Number(BlueSnapVs[0]) >= 3 && Number(BlueSnapVs[1]) >= 2) && 
        _3dsSetting !== "deactivated" &&
        payment === "cc" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const targetElement = document.querySelector<HTMLButtonElement>('#place_order, .wc-block-components-checkout-place-order-button');
return targetElement.getAttribute('data-bluesnap') === 'submitButton' }, vars)).toBeTruthy();
  }
  try {
    if ((() => { let _3dsSetting = vars['3dsSetting'];
let BlueSnapVs = vars.BlueSnapVs;
BlueSnapVs = BlueSnapVs.split('.');
let payment = vars.payment;

return (Number(BlueSnapVs[0]) >= 3 && Number(BlueSnapVs[1]) >= 2) && 
(_3dsSetting === "deactivated" ||
        payment !== "cc") })()) {
      expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const targetElement = document.querySelector<HTMLButtonElement>('#place_order, .wc-block-components-checkout-place-order-button');
return targetElement.getAttribute('data-bluesnap') === null }, vars)).toBeTruthy();
    }
  } catch { /* optional step: assertEval */ }
  if ((() => { let _3dsSetting = vars['3dsSetting'];
let BlueSnapVs = vars.BlueSnapVs;
BlueSnapVs = BlueSnapVs.split('.');
let payment = vars.payment;

return (Number(BlueSnapVs[0]) === 3 && Number(BlueSnapVs[1]) === 0) && 
_3dsSetting === "deactivated" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const targetElement = document.querySelector<HTMLButtonElement>('#place_order, .wc-block-components-checkout-place-order-button');
return targetElement.getAttribute('data-bluesnap') === null }, vars)).toBeTruthy();
  }
  if ((() => { let _3dsSetting = vars['3dsSetting'];
let BlueSnapVs = vars.BlueSnapVs;
BlueSnapVs = BlueSnapVs.split('.');
return (Number(BlueSnapVs[0]) === 2 && Number(BlueSnapVs[1]) === 6) && 
_3dsSetting === "deactivated" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const targetElement = document.querySelector<HTMLButtonElement>('#place_order, .wc-block-components-checkout-place-order-button');
return targetElement.getAttribute('data-bluesnap') === null }, vars)).toBeTruthy();
  }
  {
    const _lbl = page.locator(`label[for="place_order"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#place_order`).or(page.locator(`xpath=//button[contains(text(), "Place order")]`)).or(page.locator(`.wc-block-components-checkout-place-order-button`)).or(page.locator(`xpath=//button/span/div[contains(text(), "Place Order")]`)).filter({ visible: true }).first().click({ force: true }); }
  }
  await blockUI(page, vars);
  await expect(page.locator(`.woocommerce-notice`).first()).toContainText(`Thank you. Your order has been received.`);
  vars.orderNumber = ((await page.locator(`.woocommerce-order-overview__order > strong:nth-child(1)`).textContent()) ?? '').trim();
  vars.n = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let elements = Array.from<any>(document.querySelectorAll<HTMLTableElement>('section.woocommerce-order-details > table > tfoot > tr'))
let length = elements.length
return length-1 }, vars);
  if ((() => { let payment = vars.payment
return payment != "ach" })()) {
    await expect(page.locator(`.woocommerce-order-overview__payment-method.method > strong`).first()).toHaveText(`Credit/Debit Card`);
  }
  if ((() => { let payment = vars.payment
return payment != "ach" })()) {
    await expect(page.locator(`section.woocommerce-order-details > table > tfoot > tr:nth-child(${vars.n ?? ''}) > td`).first()).toHaveText(`Credit/Debit Card`);
  }
  if ((() => { let payment = vars.payment
return payment === "ach" })()) {
    await expect(page.locator(`.woocommerce-order-overview__payment-method.method > strong`).first()).toHaveText(`ACH/ECP Transactions`);
  }
  if ((() => { let payment = vars.payment
return payment === "ach" })()) {
    await expect(page.locator(`section.woocommerce-order-details > table > tfoot > tr:nth-child(${vars.n ?? ''}) > td`).first()).toHaveText(`ACH/ECP Transactions`);
  }
}

// GI: "Place Order - Guest user - error message" (60d09b301da0a93062eecacf)
export async function placeOrderGuestUserErrorMessage(page: Page, vars: Record<string, string> = {}): Promise<void> {
  {
    const _lbl = page.locator(`label[for="place_order"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#place_order`).or(page.locator(`xpath=//button[contains(text(), "Place order")]`)).or(page.locator(`.wc-block-components-checkout-place-order-button`)).or(page.locator(`xpath=//button/span/div[contains(text(), "Place Order")]`)).filter({ visible: true }).first().click({ force: true }); }
  }
  if ((() => { let test = vars['3ds']

return test === "1.0d" || test === "2.0dW" })()) {
    await expect(page.locator(`#Cardinal-ElementContainer`).or(page.locator(`#cardinal-cruise-popup-container`))).not.toHaveCount(0);
  }
  if ((() => { let test = vars['3ds']

return test === "1.0d" || test === "2.0dW" })()) {
    await _3ds(page, vars);
  }
  await blockUI(page, vars);
  if ((() => { let test = vars['3ds']
return test === "1.0d" || test === "2.0d" || test === "2.0dW" })()) {
    await expect(page.locator(`.woocommerce-error`).or(page.locator(`.wc-block-components-notice-banner.is-error`)).first()).toContainText(`${vars.error_message ?? ''}`);
  }
  if ((() => { let test = vars['3ds']
return test != "1.0d" && test != "2.0d" && test != "2.0dW" })()) {
    await expect(page.locator(`ul.woocommerce-error > li`).or(page.locator(`.wc-block-components-notice-banner.is-error`)).first()).toContainText(`${vars.error_message ?? ''}`);
  }
}

// GI: "Place Order - Subscription" (618294eb05bc2f0b13e55cd5)
export async function placeOrderSubscription(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await blockUI(page, vars);
  {
    const _lbl = page.locator(`label[for="place_order"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#place_order`).or(page.locator(`xpath=//button[contains(text(), "Place order")]`)).or(page.locator(`.wc-block-components-checkout-place-order-button`)).or(page.locator(`xpath=//button/span/div[contains(text(), "Place Order")]`)).filter({ visible: true }).first().click({ force: true }); }
  }
  await expect(page.locator(`.woocommerce-notice`).first()).toContainText(`Thank you. Your order has been received.`);
  vars.orderNumber = ((await page.locator(`.woocommerce-order-overview__order > strong:nth-child(1)`).textContent()) ?? '').trim();
  await page.locator(`.nav-menu > .page_item.page-item-7 > a[href*="/my-account/"]`).filter({ visible: true }).first().click({ force: true });
  await page.locator(`.woocommerce-MyAccount-navigation-link > a[href*="/my-account/orders/"]`).filter({ visible: true }).first().click({ force: true });
  await page.locator(`td.woocommerce-orders-table__cell.woocommerce-orders-table__cell-order-number > a[href*="/my-account/view-order/${vars.orderNumber ?? ''}/"]`).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`mark.order-status`).first()).toHaveText(`${vars.status ?? ''}`);
}

// GI: "Place Order button enabled" (64a2b3be82bf299ccb450eeb)
export async function placeOrderButtonEnabled(page: Page, vars: Record<string, string> = {}): Promise<void> {
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') });     return new Promise((resolve) => {
    const targetElement = document.querySelector<HTMLButtonElement>('#place_order, .wc-block-components-checkout-place-order-button');

    if (!targetElement.disabled) {
      // If the attribute is already false, resolve the promise immediately
      resolve(true);
      return;
    }

    const observer = new MutationObserver((mutationsList) => {
      for (const mutation of mutationsList) {
        if (
          mutation.type === 'attributes' &&
          mutation.attributeName === 'disabled' &&
          !targetElement.disabled
        ) {
          observer.disconnect();
          resolve(true);
          break;
        }
      }
    });

    observer.observe(targetElement, { attributes: true });
  }); }, vars)).toBeTruthy();
}

// GI: "Place Pre-Order" (61d596e27e5be41b1d0d8f37)
export async function placePreOrder(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await blockUI(page, vars);
  await extractDate(page, vars);
  await placeOrderButtonEnabled(page, vars);
  if ((() => { let _3dsSetting = vars['3dsSetting'];
let BlueSnapVs = vars.BlueSnapVs;
BlueSnapVs = BlueSnapVs.split('.');
let payment = vars.payment;
let payForOrder = vars.payForOrder
let pay = vars.pay

return ((Number(BlueSnapVs[0]) === 3 && Number(BlueSnapVs[1]) === 0)
||(Number(BlueSnapVs[0]) === 2 && Number(BlueSnapVs[1])===6)) && 
        _3dsSetting !== "deactivated" &&
        payment === "cc" && payForOrder !== "yes"  && pay !== "later" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const targetElement = document.querySelector<HTMLButtonElement>('#place_order, .wc-block-components-checkout-place-order-button');
return targetElement.getAttribute('data-bluesnap') === 'submitButton' }, vars)).toBeTruthy();
  }
  if ((() => { let _3dsSetting = vars['3dsSetting'];
let BlueSnapVs = vars.BlueSnapVs;
BlueSnapVs = BlueSnapVs.split('.');
let payment = vars.payment;
let pay = vars.pay



return (Number(BlueSnapVs[0]) >= 3 && Number(BlueSnapVs[1]) >= 2) && 
        _3dsSetting !== "deactivated" &&
        payment === "cc" && pay !== "later" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const targetElement = document.querySelector<HTMLButtonElement>('#place_order, .wc-block-components-checkout-place-order-button');
return targetElement.getAttribute('data-bluesnap') === 'submitButton' }, vars)).toBeTruthy();
  }
  try {
    if ((() => { let _3dsSetting = vars['3dsSetting'];
let BlueSnapVs = vars.BlueSnapVs;
BlueSnapVs = BlueSnapVs.split('.');
let payment = vars.payment;
let pay = vars.pay

return (Number(BlueSnapVs[0]) >= 3 && Number(BlueSnapVs[1]) >= 2) && 
(_3dsSetting === "deactivated" ||
        payment !== "cc" || pay === "later") })()) {
      expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const targetElement = document.querySelector<HTMLButtonElement>('#place_order, .wc-block-components-checkout-place-order-button');
return targetElement.getAttribute('data-bluesnap') === null }, vars)).toBeTruthy();
    }
  } catch { /* optional step: assertEval */ }
  if ((() => { let _3dsSetting = vars['3dsSetting'];
let BlueSnapVs = vars.BlueSnapVs;
BlueSnapVs = BlueSnapVs.split('.');
let payment = vars.payment;
let pay = vars.pay

return (Number(BlueSnapVs[0]) === 3 && Number(BlueSnapVs[1]) === 0) && 
_3dsSetting === "deactivated" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const targetElement = document.querySelector<HTMLButtonElement>('#place_order, .wc-block-components-checkout-place-order-button');
return targetElement.getAttribute('data-bluesnap') === null }, vars)).toBeTruthy();
  }
  if ((() => { let _3dsSetting = vars['3dsSetting'];
let BlueSnapVs = vars.BlueSnapVs;
BlueSnapVs = BlueSnapVs.split('.');
return (Number(BlueSnapVs[0]) === 2 && Number(BlueSnapVs[1]) === 6) && 
_3dsSetting === "deactivated" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const targetElement = document.querySelector<HTMLButtonElement>('#place_order, .wc-block-components-checkout-place-order-button');
return targetElement.getAttribute('data-bluesnap') === null }, vars)).toBeTruthy();
  }
  {
    const _lbl = page.locator(`label[for="place_order"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#place_order`).or(page.locator(`xpath=//button[contains(text(), "Place Pre-Order Now")]`)).or(page.locator(`.wc-block-components-checkout-place-order-button`)).or(page.locator(`xpath=//button/span/div[contains(text(), "Place Order")]`)).filter({ visible: true }).first().click({ force: true }); }
  }
  await blockUI(page, vars);
  await page.waitForLoadState('load');
  if ((() => { let pay = vars.pay
return pay === "now" })()) {
    await expect(page.locator(`.woocommerce-notice`).first()).toContainText(`Your pre-order has been received. You will be automatically charged for your order via your selected payment method when your pre-order is released on January 1, 2099. Your order details are shown below for your reference.`);
  }
  if ((() => { let pay = vars.pay
return pay === "later" })()) {
    await expect(page.locator(`.woocommerce-notice`).first()).toContainText(`Your pre-order has been received. You will be prompted for payment for your order when your pre-order is released on January 1, 2099. Your order details are shown below for your reference.`);
  }
  if ((() => { let pay = vars.pay
return pay === "upfront" })()) {
    await expect(page.locator(`.woocommerce-notice`).first()).toContainText(`Thank you. Your order has been received.`);
  }
  vars.orderNumber = ((await page.locator(`.woocommerce-order-overview__order > strong:nth-child(1)`).textContent()) ?? '').trim();
  if ((() => { let scenario = vars.scenario
return scenario === "multi-currency" })()) {
    await expect(page.locator(`li > strong > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.total ?? ''}`);
  }
  vars.n = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let elements = Array.from<any>(document.querySelectorAll<HTMLTableElement>('section.woocommerce-order-details > table > tfoot > tr'))
let length = elements.length
return length-1 }, vars);
  if ((() => { let payment = vars.payment
let pay = vars.pay
return payment != "ach" && pay != "later" })()) {
    await expect(page.locator(`.woocommerce-order-overview__payment-method.method > strong`).first()).toHaveText(`Credit/Debit Card`);
  }
  if ((() => { let payment = vars.payment
let pay = vars.pay
return payment != "ach" && pay != "later" })()) {
    await expect(page.locator(`section.woocommerce-order-details > table > tfoot > tr:nth-child(${vars.n ?? ''}) > td`).first()).toHaveText(`Credit/Debit Card`);
  }
  if ((() => { let payment = vars.payment
let pay = vars.pay
return payment === "ach" && pay != "later" })()) {
    await expect(page.locator(`.woocommerce-order-overview__payment-method.method > strong`).first()).toHaveText(`ACH/ECP Transactions`);
  }
  if ((() => { let payment = vars.payment
let pay = vars.pay
return payment === "ach" && pay != "later" })()) {
    await expect(page.locator(`section.woocommerce-order-details > table > tfoot > tr:nth-child(${vars.n ?? ''}) > td`).first()).toHaveText(`ACH/ECP Transactions`);
  }
  if ((() => { let pay = vars.pay
return pay === "later" })()) {
    await expect(page.locator(`.woocommerce-order-overview__payment-method.method > strong`).first()).toHaveText(`Pay Later`);
  }
  if ((() => { let pay = vars.pay
return pay === "later" })()) {
    await expect(page.locator(`section.woocommerce-order-details > table > tfoot > tr:nth-child(${vars.n ?? ''}) > td`).first()).toHaveText(`Pay Later`);
  }
  if ((() => { let scenario = vars.scenario
return scenario === "multi-currency" })()) {
    await verifyCurrencyOnTheAfterPlaceOrder(page, vars);
  }
  await page.locator(`.nav-menu > .page_item > a[href*="/my-account/"]`).filter({ visible: true }).first().click({ force: true });
  await page.locator(`.woocommerce-MyAccount-navigation-link > a[href*="/my-account/orders/"]`).filter({ visible: true }).first().click({ force: true });
  if ((() => { let scenario = vars.scenario
return scenario === "multi-currency" })()) {
    await expect(page.locator(`tr:nth-of-type(1) > .woocommerce-orders-table__cell.woocommerce-orders-table__cell-order-total > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.total ?? ''}`);
  }
  await page.locator(`td.woocommerce-orders-table__cell.woocommerce-orders-table__cell-order-number > a[href*="/my-account/view-order/${vars.orderNumber ?? ''}/"]`).or(page.locator(`td > a[href*="/my-account/view-order/${vars.orderNumber ?? ''}/"]`)).or(page.locator(`th > a[href*="/my-account/view-order/${vars.orderNumber ?? ''}/"]`)).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`mark.order-status`).first()).toHaveText(`${vars.status ?? ''}`);
  vars.n = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let elements = Array.from<any>(document.querySelectorAll<HTMLTableElement>('section.woocommerce-order-details > table > tfoot > tr > th:not(.order-actions--heading)'))
let length = elements.length

return length-1 }, vars);
  if ((() => { let payment = vars.payment
let pay = vars.pay
return payment != "ach" && pay != "later" })()) {
    await expect(page.locator(`section.woocommerce-order-details > table > tfoot > tr:nth-child(${vars.n ?? ''}) > td`).first()).toHaveText(`Credit/Debit Card`);
  }
  if ((() => { let payment = vars.payment
let pay = vars.pay
return payment === "ach" && pay != "later" })()) {
    await expect(page.locator(`section.woocommerce-order-details > table > tfoot > tr:nth-child(${vars.n ?? ''}) > td`).first()).toHaveText(`ACH/ECP Transactions`);
  }
  if ((() => { let pay = vars.pay
return pay === "later" })()) {
    await expect(page.locator(`section.woocommerce-order-details > table > tfoot > tr:nth-child(${vars.n ?? ''}) > td`).first()).toHaveText(`Pay Later`);
  }
  if ((() => { let scenario = vars.scenario
return scenario === "multi-currency" })()) {
    await verifyCurrencyOnTheAfterPlaceOrder(page, vars);
  }
}

// GI: "Place Pre-Order - decline transaction" (61dec61236bb62032a93eef8)
export async function placePreOrderDeclineTransaction(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await blockUI(page, vars);
  {
    const _lbl = page.locator(`label[for="place_order"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#place_order`).or(page.locator(`xpath=//button[contains(text(), "Place Pre-Order Now")]`)).or(page.locator(`.wc-block-components-checkout-place-order-button`)).or(page.locator(`xpath=//button/span/div[contains(text(), "Place Order")]`)).filter({ visible: true }).first().click({ force: true }); }
  }
  await blockUI(page, vars);
  await expect(page.locator(`.woocommerce-error`).or(page.locator(`.wc-block-components-notice-banner.is-error`)).first()).toHaveText(`This is the new error message for 14002|INCORRECT_INFORMATION`);
}

// GI: "Playgrounds Email" (66eac6fbc859f8c7111ded5b)
export async function playgroundsEmail(page: Page, vars: Record<string, string> = {}): Promise<void> {
  try {
    vars.emailTest = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return new Promise(async (resolve, reject) => {
  const to = encodeURIComponent(`${vars.playgroundsEmail}`);
  const order = `${vars.orderNumber}`
  const username = `${vars.woo_user}`; 
  const password = `${vars.woo_pass}`;
  const test = `${vars.test}`; 
  let url;
  if (test==="full" || test==="partial") {
    url = `${vars.startUrl}wp-json/wc-automation-helper/get-mail/?to=`+to+"&contains="+order+"&subject=refund";
  } else {
    url = `${vars.startUrl}wp-json/wc-automation-helper/get-mail/?to=`+to+"&contains="+order;
  }
  let headers = new Headers();
  headers.set('Content-Type', 'application/json');
  headers.set('Authorization', 'Basic ' + btoa(username + ":" + password));
  fetch(url, { method: 'GET', headers, credentials: 'omit' })
      .then(r => r.ok ? r.json() : Promise.reject(new Error('HTTP ' + r.status)))
      .then(data => {
        const mail = data.mails && data.mails[0];
        if (!mail) return reject(new Error('no mail found'));
        const f = document.createElement('iframe');
        f.style.cssText = 'position:fixed;inset:0;width:100vw;height:100vh;border:0;background:#fff;z-index:2147483647';
        f.srcdoc = mail.message;            // render email HTML
        document.body.appendChild(f);
        resolve(mail.subject);              // GI assertion can use this
      })
      .catch(reject);
}) }, vars);
  } catch { /* optional step: extractEval */ }
}

// GI: "Pre Order Menu" (61d597ca116a0e1d81026a07)
export async function preOrderMenu(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.locator(`a[href*="/my-account/pre-orders/"]`).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`a[href*="/my-account/view-order/${vars.orderNumber ?? ''}/"]`).first()).toContainText(`#${vars.orderNumber ?? ''}`);
  await expect(page.locator(`tr.order:nth-of-type(1) > td.pre-order-status`).first()).toContainText(`${vars.preOrderStatus ?? ''}`);
}

// GI: "pre-order upfront products - check backend" (62b06afa5dd4634dc88fc293)
export async function preOrderUpfrontProductsCheckBackend(page: Page, vars: Record<string, string> = {}): Promise<void> {
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let element = document.getElementsByClassName('wp-menu-name')

return element.length === 0 }, vars)) {
    await loginAdmin(page, vars);
  }
  await page.locator(`a[href="admin.php?page=wc-admin"] > .wp-menu-name`).filter({ visible: true }).first().click({ force: true });
  await page.locator(`a[href="edit.php?post_type=shop_order"]`).filter({ visible: true }).first().click({ force: true });
  try {
    await expect(page.locator(`tr#post-${vars.orderNumber ?? ''} mark.order-status > span`).first()).toHaveText(`Pre ordered`);
  } catch { /* optional step: assertText */ }
  await page.locator(`a[href*="/wp-admin/post.php?post=${vars.orderNumber ?? ''}&action=edit"] > strong`).filter({ visible: true }).first().click({ force: true });
  if ((() => { let payment = vars.payment
return payment != "ach" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const jsonOrder = vars.myOrder
const paymentMethod = jsonOrder.payment_method
return paymentMethod === "bluesnap" }, vars)).toBeTruthy();
  }
  if ((() => { let payment = vars.payment
return payment != "ach" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const paymentMethodT = `${vars.paymentMethodTitle}`
return paymentMethodT === "Credit/Debit Card" }, vars)).toBeTruthy();
  }
  if ((() => { let payment = vars.payment
return payment != "ach" })()) {
    await expect(page.locator(`tbody > tr:nth-child(2) > td:nth-child(1) > span.description`).first()).toContainText(`${vars.paymentMethodTitle ?? ''}`);
  }
  if ((() => { let payment = vars.payment
return payment === "ach" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const jsonOrder = vars.myOrder
const paymentMethod = jsonOrder.payment_method
return paymentMethod === "bluesnap_ach" }, vars)).toBeTruthy();
  }
  if ((() => { let payment = vars.payment
return payment === "ach" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const paymentMethodT = `${vars.paymentMethodTitle}`
return paymentMethodT === "ACH/ECP Transactions" }, vars)).toBeTruthy();
  }
  await expect(page.locator(`.woocommerce-order-data__meta`).first()).toContainText(`Payment via ${vars.paymentMethodTitle ?? ''} (${vars.transaction_id ?? ''})`);
  vars.n = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let length = document.getElementsByClassName("note_content").length
return length }, vars);
  if ((() => { let num = vars.n
let trans = vars.trans
return num === 6 && trans === "accepted" })()) {
    await expect(page.locator(`li.note.system-note:nth-of-type(4) > .note_content > p`).first()).toContainText(`ACH Transaction approved via IPN request.`);
  }
  if ((() => { let num = vars.n
let trans = vars.trans
return num === 6 && trans === "accepted" })()) {
    await expect(page.locator(`li.note.system-note:nth-of-type(3) > .note_content > p`).first()).toContainText(`Order status changed from On hold to Pre ordered.`);
  }
  if ((() => { let num = vars.n
let trans = vars.trans
return num === 6 && trans === "accepted" })()) {
    await expect(page.locator(`li.note.system-note:nth-of-type(2) > .note_content > p`).first()).toContainText(`Order status changed from Pre ordered to Processing.`);
  }
  if ((() => { let num = vars.n
let trans = vars.trans
return num === 6 && trans === "accepted" })()) {
    await expect(page.locator(`li.note.system-note:nth-of-type(1) > .note_content > p`).first()).toContainText(`Pre-Order status changed from active to completed.`);
  }
  if ((() => { let num = vars.n
let trans = vars.trans
return num === 6 && trans === "accepted" })()) {
    await expect(page.locator(`#select2-order_status-container`).first()).toHaveText(`Processing`);
  }
  if ((() => { let num = vars.n
let trans = vars.trans
return num === 5 })()) {
    await expect(page.locator(`li.note.system-note:nth-of-type(3) > .note_content > p`).first()).toContainText(`Order status changed from On hold to Processing.`);
  }
  if ((() => { let num = vars.n
let trans = vars.trans
return num === 5 })()) {
    await expect(page.locator(`li.note.system-note:nth-of-type(2) > .note_content > p`).first()).toContainText(`Order status changed from Processing to Pre ordered.`);
  }
  if ((() => { let num = vars.n
let trans = vars.trans
return num === 5 })()) {
    await expect(page.locator(`li.note.system-note:nth-of-type(1) > .note_content > p`).first()).toContainText(`Pre-Order status changed from active to completed.`);
  }
  if ((() => { let num = vars.n
let trans = vars.trans
return num === 5 })()) {
    await expect(page.locator(`#select2-order_status-container`).first()).toContainText(`Pre ordered`);
  }
  if ((() => { let num = vars.n
let trans = vars.trans
return num === 6 && trans === "declined" })()) {
    await expect(page.locator(`li.note.system-note:nth-of-type(4) > .note_content > p`).first()).toContainText(`BlueSnap ACH Declined IPN request received. A chargeback has been created for this transaction. Reason: null-null. Order status changed from On hold to Failed.`);
  }
  if ((() => { let num = vars.n
let trans = vars.trans
return num === 6 && trans === "declined" })()) {
    await expect(page.locator(`li.note.system-note:nth-of-type(3) > .note_content > p`).first()).toContainText(`Order status changed from Failed to Processing.`);
  }
  if ((() => { let num = vars.n
let trans = vars.trans
return num === 6 && trans === "declined" })()) {
    await expect(page.locator(`li.note.system-note:nth-of-type(2) > .note_content > p`).first()).toContainText(`Order status changed from Processing to Pre ordered.`);
  }
  if ((() => { let num = vars.n
let trans = vars.trans
return num === 6 && trans === "declined" })()) {
    await expect(page.locator(`li.note.system-note:nth-of-type(1) > .note_content > p`).first()).toContainText(`Pre-Order status changed from active to completed.`);
  }
  if ((() => { let num = vars.n
let trans = vars.trans
return num === 6 && trans === "declined" })()) {
    await expect(page.locator(`#select2-order_status-container`).first()).toContainText(`Pre ordered`);
  }
}

// GI: "Register" (60c91eea4f70ce5aa437045b)
export async function register(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.locator(`.nav-menu > .page_item > a[href*="/my-account/"]`).filter({ visible: true }).first().click({ force: true });
  try { await page.locator(`#reg_email`).first().fill(`${vars.username ?? ''}`); } catch { await page.locator(`#reg_email`).first().selectOption(`${vars.username ?? ''}`); }
  try { await page.locator(`#reg_password`).first().fill(`${vars.password ?? ''}`); } catch { await page.locator(`#reg_password`).first().selectOption(`${vars.password ?? ''}`); }
  await page.locator(`xpath=//button[contains(text(), "Register")]`).or(page.locator(`button[name="register"]`)).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`h1.entry-title`).first()).toContainText(`My account`);
}

// GI: "Renew by Admin" (6183d91c308b6f6744d1c74e)
export async function renewByAdmin(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.locator(`a[href="edit.php?post_type=shop_subscription"]`).or(page.locator(`a[href="admin.php?page=wc-orders--shop_subscription"]`)).filter({ visible: true }).first().click({ force: true });
  await page.locator(`a[href*="/wp-admin/post.php?post=${vars.subscriptionID ?? ''}&action=edit"]`).or(page.locator(`a[href*="/wp-admin/admin.php?page=wc-orders--shop_subscription&action=edit&id=${vars.subscriptionID ?? ''}"]`)).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`#select2-order_status-container`).first()).toContainText(`${vars.subStatus ?? ''}`);
  if ((() => { let payment = vars.payment
return payment != "ach" })()) {
    await expect(page.locator(`.bluesnap`).first()).toContainText(`${vars.paymentMethodTitle ?? ''}`);
  }
  if ((() => { let payment = vars.payment
return payment === "ach" })()) {
    await expect(page.locator(`.bluesnap_ach`).first()).toContainText(`${vars.paymentMethodTitle ?? ''}`);
  }
  if ((() => { let scenario = vars.scenario
let currency = vars.currency
let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
return (scenario === "multi-currency" && currency !== "JPY") 
|| (scenario === "multi-currency" && currency === "JPY" && (Number(blueSnapVs[0]) >= 3 && Number(blueSnapVs[1]) >= 5)) })()) {
    await verifyCurrencyOnBackendSubscription(page, vars);
  }
  // skipped: select-open click on 'select[name="wc_order_action"]' — use selectOption instead
  try { await page.locator(`select[name="wc_order_action"]`).first().fill(`wcs_process_renewal`); } catch { await page.locator(`select[name="wc_order_action"]`).first().selectOption(`wcs_process_renewal`); }
  await page.locator(`xpath=//button[contains(text(), "Update")]`).or(page.locator(`button[name="save"]`)).filter({ visible: true }).first().click({ force: true });
  try {
    await expect(page.locator(`#message > p`).first()).toContainText(`Subscription updated.`);
  } catch { /* optional step: assertTextPresent */ }
  if ((() => { let payment = vars.payment
return payment != "ach" })()) {
    await expect(page.locator(`#select2-order_status-container`).first()).toContainText(`${vars.subStatus ?? ''}`);
  }
  if ((() => { let payment = vars.payment
return payment === "ach" })()) {
    await expect(page.locator(`#select2-order_status-container`).first()).toContainText(`${vars.subStatusACH ?? ''}`);
  }
  vars.renewID = ((await page.locator(`#subscription_renewal_orders > div.inside > div > table > tbody > tr:first-of-type > td:nth-child(1) > a`).or(page.locator(`#woocommerce-order-notes > div.inside > ul > li:nth-child(3) > div > p > a`)).textContent()) ?? '').trim();
  vars.renewID = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let renew = `${vars.renewID}`;
renew = renew.replace("#","");
return renew
 }, vars);
  await page.locator(`a[href*="/wp-admin/post.php?post=${vars.renewID ?? ''}&action=edit"]`).or(page.locator(`a[href*="/wp-admin/admin.php?page=wc-orders&action=edit&id=${vars.renewID ?? ''}"]`)).filter({ visible: true }).first().click({ force: true });
  vars.orderNumber = `${vars.renewID ?? ''}`;
  await getWooOrderDetails(page, vars);
  await expect(page.locator(`.woocommerce-order-data__meta`).first()).toContainText(`Payment via ${vars.paymentMethodTitle ?? ''} (${vars.transaction_id ?? ''})`);
  await expect(page.locator(`li.note.system-note:nth-of-type(2) > .note_content > p`).first()).toContainText(`Bluesnap transaction complete (Transaction ID: ${vars.transaction_id ?? ''})`);
  if ((() => { let payment = vars.payment
return payment === "ach" })()) {
    await expect(page.locator(`li.note.system-note:nth-of-type(1) > .note_content > p`).first()).toContainText(`Charge pending confirmation from BlueSnap (Charge ID: ${vars.transaction_id ?? ''}). Order status changed from Pending payment to On hold.`);
  }
}

// GI: "Renew Subscription " (64cebadc6f03cb8cdbbed332)
export async function renewSubscription(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await blockUI(page, vars);
  {
    const _lbl = page.locator(`label[for="place_order"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#place_order`).or(page.locator(`xpath=//button[contains(text(), "Renew subscription")]`)).or(page.locator(`xpath=//div[contains(text(), "Renew subscription")]`)).or(page.locator(`.wc-block-components-checkout-place-order-button`)).filter({ visible: true }).first().click({ force: true }); }
  }
  await expect(page.locator(`.woocommerce-notice`).first()).toContainText(`Thank you. Your order has been received.`);
  vars.orderNumber = ((await page.locator(`.woocommerce-order-overview__order > strong:nth-child(1)`).textContent()) ?? '').trim();
  await page.locator(`.nav-menu > .page_item.page-item-7 > a[href*="/my-account/"]`).filter({ visible: true }).first().click({ force: true });
  await page.locator(`.woocommerce-MyAccount-navigation-link > a[href*="/my-account/orders/"]`).filter({ visible: true }).first().click({ force: true });
  await page.locator(`td.woocommerce-orders-table__cell.woocommerce-orders-table__cell-order-number > a[href*="/my-account/view-order/${vars.orderNumber ?? ''}/"]`).or(page.locator(`td > a[href*="/my-account/view-order/${vars.orderNumber ?? ''}/"]`)).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`mark.order-status`).first()).toHaveText(`${vars.status ?? ''}`);
}

// GI: "Run Specific for renew orders" (622a0fe26f3ed7a04db3e5a6)
export async function runSpecificForRenewOrders(page: Page, vars: Record<string, string> = {}): Promise<void> {
  try {
    vars.runSpecificLog = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return new Promise(function (resolve, reject) {
  const url = `${vars.startUrl}` + 'wp-json/wc-automation-helper/api-request/?url=subscriptions/`+${vars.subsID}+`/run-specific';
  const username = `${vars.woo_user}`;
  const password = `${vars.woo_pass}`;
  let headers = new Headers();
  headers.set('Content-Type', 'application/json');
  headers.set('Authorization', 'Basic ' + btoa(username + ":" + password));
  fetch(url, {method:'GET', headers: headers})
  .then(function(response) {
    if (response.ok) {
      resolve(response.json())
    } else {
      reject(new Error('error'))
    } 
  })
  }) }, vars);
  } catch { /* optional step: extractEval */ }
}

// GI: "Save CC" (614a2b454170222740a3551f)
export async function saveCC(page: Page, vars: Record<string, string> = {}): Promise<void> {
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector<HTMLFormElement>('form.checkout.woocommerce-checkout , form#order_review')
return `${vars.saveCC}` === "disabled" && element !== null && element !== undefined }, vars)) {
    await expect(page.locator(`input#wc-bluesnap-new-payment-method`)).toHaveCount(0);
  }
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector<HTMLFormElement>('.wc-block-components-form.wc-block-checkout__form')
return `${vars.saveCC}` === "disabled" && element !== null && element !== undefined
 }, vars)) {
    await expect(page.locator(`div#radio-control-wc-payment-method-options-bluesnap__content > div.wc-block-components-payment-methods__save-card-info input`)).toHaveCount(0);
  }
  if (vars.saveCC === "disabled") {
    await page.locator(`input#createaccount`).or(page.locator(`.wc-block-checkout__create-account > label > input`)).filter({ visible: true }).first().click({ force: true });
  }
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector<HTMLFormElement>('form.checkout.woocommerce-checkout , form#order_review')
return `${vars.saveCC}` === "disabled" && element !== null && element !== undefined }, vars)) {
    await expect(page.locator(`input#wc-bluesnap-new-payment-method`)).toHaveCount(0);
  }
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector<HTMLFormElement>('.wc-block-components-form.wc-block-checkout__form')
return `${vars.saveCC}` === "disabled" && element !== null && element !== undefined
 }, vars)) {
    await expect(page.locator(`div#radio-control-wc-payment-method-options-bluesnap__content > div.wc-block-components-payment-methods__save-card-info input`)).toHaveCount(0);
  }
  if (vars.saveCC === "disabled") {
    await page.locator(`input#createaccount`).or(page.locator(`.wc-block-checkout__create-account > label > input`)).filter({ visible: true }).first().click({ force: true });
  }
  if (vars.saveCC === "disabled") {
    try { await page.locator(`#account_password`).or(page.locator(`.wc-block-components-address-form__password > input`)).first().fill(`${vars.password ?? ''}`); } catch { await page.locator(`#account_password`).or(page.locator(`.wc-block-components-address-form__password > input`)).first().selectOption(`${vars.password ?? ''}`); }
  }
  if (vars.saveCC === "disabled") {
    // TODO: unknown keypress value="50"
    await page.locator(`#account_password`).or(page.locator(`.wc-block-components-address-form__password > input`)).first().press('50');
  }
  if (vars.saveCC === "disabled") {
    await page.locator(`#account_password`).or(page.locator(`.wc-block-components-address-form__password > input`)).first().press('Backspace');
  }
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector<HTMLFormElement>('form.checkout.woocommerce-checkout , form#order_review')

return `${vars.saveCC}` !== "disabled" && element !== null && element !== undefined
 }, vars)) {
    await page.locator(`input#wc-bluesnap-new-payment-method`).filter({ visible: true }).first().click({ force: true });
  }
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector<HTMLFormElement>('.wc-block-components-form.wc-block-checkout__form')

return `${vars.saveCC}` !== "disabled" && element !== null && element !== undefined
 }, vars)) {
    await page.locator(`div#radio-control-wc-payment-method-options-bluesnap__content > div.wc-block-components-payment-methods__save-card-info input`).filter({ visible: true }).first().click({ force: true });
  }
}

// GI: "Select CC as payment method" (6737a9198eeafb3bd1a79495)
export async function selectCCAsPaymentMethod(page: Page, vars: Record<string, string> = {}): Promise<void> {
  {
    const _lbl = page.locator(`label[for="payment_method_bluesnap"]`).or(page.locator(`label[for="radio-control-wc-payment-method-options-bluesnap"]`)).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#payment_method_bluesnap`).or(page.locator(`#radio-control-wc-payment-method-options-bluesnap`)).filter({ visible: true }).first().click({ force: true }); }
  }
  await blockUI(page, vars);
}

// GI: "select Currency on Front End" (630e2591e3896e4c0d349f26)
export async function selectCurrencyOnFrontEnd(page: Page, vars: Record<string, string> = {}): Promise<void> {
  // skipped: select-open click on 'select[name="bluesnap_currency_selector"]' — use selectOption instead
  try { await page.locator(`select[name="bluesnap_currency_selector"]`).or(page.locator(`#page > div.header-widget-region > div > form > select`)).first().fill(`${vars.currency ?? ''}`); } catch { await page.locator(`select[name="bluesnap_currency_selector"]`).or(page.locator(`#page > div.header-widget-region > div > form > select`)).first().selectOption(`${vars.currency ?? ''}`); }
  await page.waitForLoadState('load');
  await defaultCurrencyOnSite(page, vars);
}

// GI: "Settings - Activate Appel Pay,  Multi-currency and Google Pay" (64b69ae4e62b31988df8a6da)
export async function settingsActivateAppelPayMultiCurrencyAndGooglePay(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.logs = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return new Promise(function (resolve, reject) {
  const url = `${vars.startUrl}` + 'wp-json/wc-automation-helper/bluesnap-settings/?multicurrency=yes&apple_pay=yes&google_pay=yes';
  const username = `${vars.woo_user}`;
  const password = `${vars.woo_pass}`;
  let headers = new Headers();
  headers.set('Content-Type', 'application/json');
  headers.set('Authorization', 'Basic ' + btoa(username + ":" + password));
  fetch(url, {method:'POST', headers: headers, credentials: 'omit'})
  .then(function(response) {
    if (response.ok) {
      resolve(response.json())
    } else {
      resolve([])
    } 
  })
  }) }, vars);
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let logs = vars.logs
return logs.status === "OK" }, vars)).toBeTruthy();
}

// GI: "Settings - Activate Appel Pay, not Multi-currency nor Google Pay" (64b696fa49da953edbf2725f)
export async function settingsActivateAppelPayNotMultiCurrencyNorGooglePay(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.logs = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return new Promise(function (resolve, reject) {
  const url = `${vars.startUrl}` + 'wp-json/wc-automation-helper/bluesnap-settings/?multicurrency=no&apple_pay=yes&google_pay=no';
  const username = `${vars.woo_user}`;
  const password = `${vars.woo_pass}`;
  let headers = new Headers();
  headers.set('Content-Type', 'application/json');
  headers.set('Authorization', 'Basic ' + btoa(username + ":" + password));
  fetch(url, {method:'POST', headers: headers, credentials: 'omit'})
  .then(function(response) {
    if (response.ok) {
      resolve(response.json())
    } else {
      resolve([])
    } 
  })
  }) }, vars);
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let logs = vars.logs
return logs.status === "OK" || logs.warning === "No options updated!"
 }, vars)).toBeTruthy();
  await clearCache(page, vars);
}

// GI: "Settings - Activate Capture and 3DS" (643fe3fac05a9d9f34afaec8)
export async function settingsActivateCaptureAnd3DS(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.logs = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return new Promise(function (resolve, reject) {
  const url = `${vars.startUrl}` + 'wp-json/wc-automation-helper/bluesnap-settings/?enabled=yes&_3D_secure=yes&capture_charge=yes&saved_cards=yes&multicurrency=yes';
  const username = `${vars.woo_user}`;
  const password = `${vars.woo_pass}`;
  let headers = new Headers();
  headers.set('Content-Type', 'application/json');
  headers.set('Authorization', 'Basic ' + btoa(username + ":" + password));
  fetch(url, {method:'POST', headers: headers, credentials: 'omit'})
  .then(function(response) {
    if (response.ok) {
      resolve(response.json())
    } else {
      resolve([])
    } 
  })
  }) }, vars);
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let logs = vars.logs
return logs.status === "OK" && ((logs.changed_options.capture_charge === "yes" && logs.changed_options._3D_secure === "yes") || logs.warning === "No options updated!") }, vars)).toBeTruthy();
}

// GI: "Settings - Activate Google Pay, not Multi-currency nor Apple Pay" (64b698fbe62b31988df81b5c)
export async function settingsActivateGooglePayNotMultiCurrencyNorApplePay(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.logs = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return new Promise(function (resolve, reject) {
  const url = `${vars.startUrl}` + 'wp-json/wc-automation-helper/bluesnap-settings/?multicurrency=no&apple_pay=no&google_pay=yes';
  const username = `${vars.woo_user}`;
  const password = `${vars.woo_pass}`;
  let headers = new Headers();
  headers.set('Content-Type', 'application/json');
  headers.set('Authorization', 'Basic ' + btoa(username + ":" + password));
  fetch(url, {method:'POST', headers: headers, credentials: 'omit'})
  .then(function(response) {
    if (response.ok) {
      resolve(response.json())
    } else {
      resolve([])
    } 
  })
  }) }, vars);
  try {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let logs = vars.logs
return logs.status === "OK" && 
(
    (logs.changed_options.google_pay === "yes" && logs.changed_options.apple_pay === "no")
|| logs.warning === "No options updated!"
) }, vars)).toBeTruthy();
  } catch { /* optional step: assertEval */ }
  await clearCache(page, vars);
}

// GI: "Settings - Activate HPOS" (65f8496b452496039ed0a5cf)
export async function settingsActivateHPOS(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.logs = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let defaultParts = vars.defaultParts
let thousand = defaultParts.find(part => part.type === 'group').value
let decimal = defaultParts.find(part => part.type === 'decimal').value

return new Promise(function (resolve, reject) {
  const url = `${vars.startUrl}` + 'wp-json/wc-automation-helper/woocommerce-settings/?custom_orders_table_enabled=yes&custom_orders_table_data_sync_enabled=yes';
  const username = `${vars.woo_user}`;
  const password = `${vars.woo_pass}`;
  let headers = new Headers();
  headers.set('Content-Type', 'application/json');
  headers.set('Authorization', 'Basic ' + btoa(username + ":" + password));
  fetch(url, {method:'POST', headers: headers, credentials: 'omit'})
  .then(function(response) {
    if (response.ok) {
      resolve(response.json())
    } else {
      resolve([])
    } 
  })
  }) }, vars);
}

// GI: "Settings - Activate Multi-currency" (6483820782bf299ccbd696d1)
export async function settingsActivateMultiCurrency(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.logs = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return new Promise(function (resolve, reject) {
  const url = `${vars.startUrl}` + 'wp-json/wc-automation-helper/bluesnap-settings/?multicurrency=yes';
  const username = `${vars.woo_user}`;
  const password = `${vars.woo_pass}`;
  let headers = new Headers();
  headers.set('Content-Type', 'application/json');
  headers.set('Authorization', 'Basic ' + btoa(username + ":" + password));
  fetch(url, {method:'POST', headers: headers, credentials: 'omit'})
  .then(function(response) {
    if (response.ok) {
      resolve(response.json())
    } else {
      resolve([])
    } 
  })
  }) }, vars);
  try {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let logs = vars.logs
return logs.status === "OK" && 
(logs.changed_options.multicurrency === "yes" 
|| logs.warning === "No options updated!"
|| logs.changed_options.currencies_supported !== []) }, vars)).toBeTruthy();
  } catch { /* optional step: assertEval */ }
  await clearCache(page, vars);
}

// GI: "Settings - Activate only 3DS" (62c30e40834704196fe3c89e)
export async function settingsActivateOnly3DS(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.logs = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return new Promise(function (resolve, reject) {
  const url = `${vars.startUrl}` + 'wp-json/wc-automation-helper/bluesnap-settings/?enabled=yes&_3D_secure=yes&capture_charge=yes&saved_cards=yes&multicurrency=yes';
  const username = `${vars.woo_user}`;
  const password = `${vars.woo_pass}`;
  let headers = new Headers();
  headers.set('Content-Type', 'application/json');
  headers.set('Authorization', 'Basic ' + btoa(username + ":" + password));
  fetch(url, {method:'POST', headers: headers, credentials: 'omit'})
  .then(function(response) {
    if (response.ok) {
      resolve(response.json())
    } else {
      resolve([])
    } 
  })
  }) }, vars);
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let logs = vars.logs
return logs.status === "OK" && (logs.changed_options._3D_secure === "yes"|| logs.warning === "No options updated!") }, vars)).toBeTruthy();
}

// GI: "Settings - Activate only Capture" (62c30f655a1bf494e94417a1)
export async function settingsActivateOnlyCapture(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.logs = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return new Promise(function (resolve, reject) {
  const url = `${vars.startUrl}` + 'wp-json/wc-automation-helper/bluesnap-settings/?enabled=yes&_3D_secure=yes&capture_charge=yes&saved_cards=yes&multicurrency=yes';
  const username = `${vars.woo_user}`;
  const password = `${vars.woo_pass}`;
  let headers = new Headers();
  headers.set('Content-Type', 'application/json');
  headers.set('Authorization', 'Basic ' + btoa(username + ":" + password));
  fetch(url, {method:'POST', headers: headers, credentials: 'omit'})
  .then(function(response) {
    if (response.ok) {
      resolve(response.json())
    } else {
      resolve([])
    } 
  })
  }) }, vars);
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let logs = vars.logs
return logs.status === "OK" && (logs.changed_options.capture_charge === "yes"|| logs.warning === "No options updated!") }, vars)).toBeTruthy();
}

// GI: "Settings - Activate Save Cards" (6488b88b82bf299ccbb7c6be)
export async function settingsActivateSaveCards(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.logs = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return new Promise(function (resolve, reject) {
  const url = `${vars.startUrl}` + 'wp-json/wc-automation-helper/bluesnap-settings/?enabled=yes&_3D_secure=yes&capture_charge=yes&saved_cards=yes&multicurrency=yes';
  const username = `${vars.woo_user}`;
  const password = `${vars.woo_pass}`;
  let headers = new Headers();
  headers.set('Content-Type', 'application/json');
  headers.set('Authorization', 'Basic ' + btoa(username + ":" + password));
  fetch(url, {method:'POST', headers: headers, credentials: 'omit'})
  .then(function(response) {
    if (response.ok) {
      resolve(response.json())
    } else {
      resolve([])
    } 
  })
  }) }, vars);
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let logs = vars.logs
return logs.status === "OK" && 
    (logs.changed_options.saved_cards === "yes" 
    || logs.warning === "No options updated!" 
    || logs.options.saved_cards === "yes" ) }, vars)).toBeTruthy();
}

// GI: "Settings - Activate WooCommerce" (649edd15ca40d9f691f1e520)
export async function settingsActivateWooCommerce(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.logs = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return new Promise(function (resolve, reject) {
  const url = `${vars.startUrl}` + 'wp-json/wc-automation-helper/activate-plugin';
  const username = `${vars.woo_user}`;
  const password = `${vars.woo_pass}`;
  const data = {
    "plugin": "woocommerce/woocommerce.php"
    }
  let headers = new Headers();
  headers.set('Content-Type', 'application/json');
  headers.set('Authorization', 'Basic ' + btoa(username + ":" + password));
  fetch(url, {method:'POST', headers: headers, credentials: 'omit', body: JSON.stringify(data)})
  .then(function(response) {
    if (response.ok) {
      resolve(response.json())
    } else {
      resolve([])
    } 
  })
  }) }, vars);
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.status === "OK" }, vars)).toBeTruthy();
}

// GI: "Settings - Change Default currency" (65a159893a499796834bb8a2)
export async function settingsChangeDefaultCurrency(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.logs = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let defaultParts = vars.defaultParts
let thousand = defaultParts.find(part => part.type === 'group').value
let decimal = defaultParts.find(part => part.type === 'decimal').value

return new Promise(function (resolve, reject) {
  const url = `${vars.startUrl}` + `wp-json/wc-automation-helper/woocommerce-settings/?currency=${vars.currency}&price_thousand_sep=`+thousand+'&price_decimal_sep='+decimal+`&price_num_decimals=${vars.decimals}&currency_pos=${vars.position}`;
  const username = `${vars.woo_user}`;
  const password = `${vars.woo_pass}`;
  let headers = new Headers();
  headers.set('Content-Type', 'application/json');
  headers.set('Authorization', 'Basic ' + btoa(username + ":" + password));
  fetch(url, {method:'POST', headers: headers, credentials: 'omit'})
  .then(function(response) {
    if (response.ok) {
      resolve(response.json())
    } else {
      resolve([])
    } 
  })
  }) }, vars);
  await cleanRateExchangeTransient(page, vars);
}

// GI: "Settings - Deactivate capture and 3DS" (643fe3262bcba1d90a909d76)
export async function settingsDeactivateCaptureAnd3DS(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.logs = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return new Promise(function (resolve, reject) {
  const url = `${vars.startUrl}` + 'wp-json/wc-automation-helper/bluesnap-settings/?enabled=yes&_3D_secure=no&capture_charge=no&saved_cards=yes&multicurrency=yes';
  const username = `${vars.woo_user}`;
  const password = `${vars.woo_pass}`;
  let headers = new Headers();
  headers.set('Content-Type', 'application/json');
  headers.set('Authorization', 'Basic ' + btoa(username + ":" + password));
  fetch(url, {method:'POST', headers: headers, credentials: 'omit'})
  .then(function(response) {
    if (response.ok) {
      resolve(response.json())
    } else {
      resolve([])
    } 
  })
  }) }, vars);
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let logs = vars.logs
return logs.status === "OK" && ((logs.changed_options.capture_charge === "no" && logs.changed_options._3D_secure === "no") || logs.warning === "No options updated!") }, vars)).toBeTruthy();
}

// GI: "Settings - Deactivate HPOS" (65f849bd752b1a838b24487b)
export async function settingsDeactivateHPOS(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.logs = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let defaultParts = vars.defaultParts
let thousand = defaultParts.find(part => part.type === 'group').value
let decimal = defaultParts.find(part => part.type === 'decimal').value

return new Promise(function (resolve, reject) {
  const url = `${vars.startUrl}` + 'wp-json/wc-automation-helper/woocommerce-settings/?custom_orders_table_enabled=no&custom_orders_table_data_sync_enabled=yes';
  const username = `${vars.woo_user}`;
  const password = `${vars.woo_pass}`;
  let headers = new Headers();
  headers.set('Content-Type', 'application/json');
  headers.set('Authorization', 'Basic ' + btoa(username + ":" + password));
  fetch(url, {method:'POST', headers: headers, credentials: 'omit'})
  .then(function(response) {
    if (response.ok) {
      resolve(response.json())
    } else {
      resolve([])
    } 
  })
  }) }, vars);
}

// GI: "Settings - Deactivate Multi-currency" (6483818556ef19024fa96e66)
export async function settingsDeactivateMultiCurrency(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.logs = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return new Promise(function (resolve, reject) {
  const url = `${vars.startUrl}` + 'wp-json/wc-automation-helper/bluesnap-settings/?enabled=yes&_3D_secure=yes&capture_charge=yes&saved_cards=yes&multicurrency=no';
  const username = `${vars.woo_user}`;
  const password = `${vars.woo_pass}`;
  let headers = new Headers();
  headers.set('Content-Type', 'application/json');
  headers.set('Authorization', 'Basic ' + btoa(username + ":" + password));
  fetch(url, {method:'POST', headers: headers, credentials: 'omit'})
  .then(function(response) {
    if (response.ok) {
      resolve(response.json())
    } else {
      resolve([])
    } 
  })
  }) }, vars);
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let logs = vars.logs
return logs.status === "OK" && (logs.changed_options.multicurrency === "no" || logs.warning === "No options updated!") }, vars)).toBeTruthy();
}

// GI: "Settings - Deactivate Multi-currency, Appel Pay and Google Pay" (64b68ea149da953edbec06c1)
export async function settingsDeactivateMultiCurrencyAppelPayAndGooglePay(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.logs = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return new Promise(function (resolve, reject) {
  const url = `${vars.startUrl}` + 'wp-json/wc-automation-helper/bluesnap-settings/?multicurrency=no&apple_pay=no&google_pay=no';
  const username = `${vars.woo_user}`;
  const password = `${vars.woo_pass}`;
  let headers = new Headers();
  headers.set('Content-Type', 'application/json');
  headers.set('Authorization', 'Basic ' + btoa(username + ":" + password));
  fetch(url, {method:'POST', headers: headers, credentials: 'omit'})
  .then(function(response) {
    if (response.ok) {
      resolve(response.json())
    } else {
      resolve([])
    } 
  })
  }) }, vars);
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let logs = vars.logs
return logs.status === "OK" }, vars)).toBeTruthy();
  await clearCache(page, vars);
}

// GI: "Settings - Deactivate only 3DS" (62c30cc5834704196fe39625)
export async function settingsDeactivateOnly3DS(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.logs = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return new Promise(function (resolve, reject) {
  const url = `${vars.startUrl}` + 'wp-json/wc-automation-helper/bluesnap-settings/?enabled=yes&_3D_secure=no&capture_charge=yes&saved_cards=yes&multicurrency=yes';
  const username = `${vars.woo_user}`;
  const password = `${vars.woo_pass}`;
  let headers = new Headers();
  headers.set('Content-Type', 'application/json');
  headers.set('Authorization', 'Basic ' + btoa(username + ":" + password));
  fetch(url, {method:'POST', headers: headers, credentials: 'omit'})
  .then(function(response) {
    if (response.ok) {
      resolve(response.json())
    } else {
      resolve([])
    } 
  })
  }) }, vars);
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let logs = vars.logs
return logs.status === "OK" && (logs.changed_options._3D_secure === "no"|| logs.warning === "No options updated!") }, vars)).toBeTruthy();
}

// GI: "Settings - Deactivate only capture" (62c30fff5a1bf494e94432c7)
export async function settingsDeactivateOnlyCapture(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.logs = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return new Promise(function (resolve, reject) {
  const url = `${vars.startUrl}` + 'wp-json/wc-automation-helper/bluesnap-settings/?enabled=yes&_3D_secure=yes&capture_charge=no&saved_cards=yes&multicurrency=yes';
  const username = `${vars.woo_user}`;
  const password = `${vars.woo_pass}`;
  let headers = new Headers();
  headers.set('Content-Type', 'application/json');
  headers.set('Authorization', 'Basic ' + btoa(username + ":" + password));
  fetch(url, {method:'POST', headers: headers, credentials: 'omit'})
  .then(function(response) {
    if (response.ok) {
      resolve(response.json())
    } else {
      resolve([])
    } 
  })
  }) }, vars);
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let logs = vars.logs
return logs.status === "OK" && (logs.changed_options.capture_charge === "no" || logs.warning === "No options updated!") }, vars)).toBeTruthy();
}

// GI: "Settings - Deactivate Save Cards" (6488b88b56ef19024f8c1641)
export async function settingsDeactivateSaveCards(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.logs = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return new Promise(function (resolve, reject) {
  const url = `${vars.startUrl}` + 'wp-json/wc-automation-helper/bluesnap-settings/?enabled=yes&_3D_secure=yes&capture_charge=yes&saved_cards=no&multicurrency=yes';
  const username = `${vars.woo_user}`;
  const password = `${vars.woo_pass}`;
  let headers = new Headers();
  headers.set('Content-Type', 'application/json');
  headers.set('Authorization', 'Basic ' + btoa(username + ":" + password));
  fetch(url, {method:'POST', headers: headers, credentials: 'omit'})
  .then(function(response) {
    if (response.ok) {
      resolve(response.json())
    } else {
      resolve([])
    } 
  })
  }) }, vars);
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let logs = vars.logs
return logs.status === "OK" && (logs.changed_options.saved_cards === "no" || logs.warning === "No options updated!") }, vars)).toBeTruthy();
}

// GI: "Settings - Deactivate WooCommerce" (649ed48182bf299ccbe741ed)
export async function settingsDeactivateWooCommerce(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.logs = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return new Promise(function (resolve, reject) {
  const url = `${vars.startUrl}` + 'wp-json/wc-automation-helper/deactivate-plugin';
  const username = `${vars.woo_user}`;
  const password = `${vars.woo_pass}`;
  const data = {
    "plugin": "woocommerce/woocommerce.php"
    }
  let headers = new Headers();
  headers.set('Content-Type', 'application/json');
  headers.set('Authorization', 'Basic ' + btoa(username + ":" + password));
  fetch(url, {method:'POST', headers: headers, credentials: 'omit', body: JSON.stringify(data)})
  .then(function(response) {
    if (response.ok) {
      resolve(response.json())
    } else {
      resolve([])
    } 
  })
  }) }, vars);
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.status === "OK" }, vars)).toBeTruthy();
}

// GI: "Settings - Exclude tax" (645e2e8d0b7aefb97246d23e)
export async function settingsExcludeTax(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.logs = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return new Promise(function (resolve, reject) {
  const url = `${vars.startUrl}` + 'wp-json/wc-automation-helper/woocommerce-tax-settings/?prices_include_tax=no&tax_display_shop=excl&tax_display_cart=excl';
  const username = `${vars.woo_user}`;
  const password = `${vars.woo_pass}`;
  let headers = new Headers();
  headers.set('Content-Type', 'application/json');
  headers.set('Authorization', 'Basic ' + btoa(username + ":" + password));
  fetch(url, {method:'POST', headers: headers, credentials: 'omit'})
  .then(function(response) {
    if (response.ok) {
      resolve(response.json())
    } else {
      resolve([])
    } 
  })
  }) }, vars);
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let logs = vars.logs
return logs.status === "OK" }, vars)).toBeTruthy();
}

// GI: "Settings - Include tax" (645e2f74af1e488d2582b58f)
export async function settingsIncludeTax(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.logs = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return new Promise(function (resolve, reject) {
  const url = `${vars.startUrl}` + 'wp-json/wc-automation-helper/woocommerce-tax-settings/?prices_include_tax=yes&tax_display_shop=incl&tax_display_cart=incl';
  const username = `${vars.woo_user}`;
  const password = `${vars.woo_pass}`;
  let headers = new Headers();
  headers.set('Content-Type', 'application/json');
  headers.set('Authorization', 'Basic ' + btoa(username + ":" + password));
  fetch(url, {method:'POST', headers: headers, credentials: 'omit'})
  .then(function(response) {
    if (response.ok) {
      resolve(response.json())
    } else {
      resolve([])
    } 
  })
  }) }, vars);
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let logs = vars.logs
return logs.status === "OK" }, vars)).toBeTruthy();
}

// GI: "Settings - Subscription - Disable retry" (65afcd8a723472e428746c1a)
export async function settingsSubscriptionDisableRetry(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.logs = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return new Promise(function (resolve, reject) {
  const url = `${vars.startUrl}` + 'wp-json/wc-automation-helper/subscriptions-settings/?enable_retry=no';
  const username = `${vars.woo_user}`;
  const password = `${vars.woo_pass}`;
  let headers = new Headers();
  headers.set('Content-Type', 'application/json');
  headers.set('Authorization', 'Basic ' + btoa(username + ":" + password));
  fetch(url, {method:'POST', headers: headers, credentials: 'omit'})
  .then(function(response) {
    if (response.ok) {
      resolve(response.json())
    } else {
      resolve([])
    } 
  })
  }) }, vars);
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let logs = vars.logs
return logs.status === "OK" }, vars)).toBeTruthy();
}

// GI: "Settings - Subscription - Enable retry" (65afcd43723472e428745f5a)
export async function settingsSubscriptionEnableRetry(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.logs = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return new Promise(function (resolve, reject) {
  const url = `${vars.startUrl}` + 'wp-json/wc-automation-helper/subscriptions-settings/?enable_retry=yes';
  const username = `${vars.woo_user}`;
  const password = `${vars.woo_pass}`;
  let headers = new Headers();
  headers.set('Content-Type', 'application/json');
  headers.set('Authorization', 'Basic ' + btoa(username + ":" + password));
  fetch(url, {method:'POST', headers: headers, credentials: 'omit'})
  .then(function(response) {
    if (response.ok) {
      resolve(response.json())
    } else {
      resolve([])
    } 
  })
  }) }, vars);
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let logs = vars.logs
return logs.status === "OK" }, vars)).toBeTruthy();
}

// GI: "Subscription Menu" (6182caf6308b6f67448bf5f5)
export async function subscriptionMenu(page: Page, vars: Record<string, string> = {}): Promise<void> {
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return document.getElementsByClassName("woocommerce-MyAccount-navigation-link--subscriptions")[0].innerText === "Subscriptions" }, vars)) {
    await page.locator(`a[href*="/my-account/subsriptions/"]`).or(page.locator(`li.woocommerce-MyAccount-navigation-link.woocommerce-MyAccount-navigation-link--subscriptions > a`)).filter({ visible: true }).first().click({ force: true });
  }
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return document.getElementsByClassName("woocommerce-MyAccount-navigation-link--subscriptions")[0].innerText === "Subscriptions" }, vars)) {
    await expect(page.locator(`td.subscription-id > a[href*="/my-account/view-subscription/${vars.subscriptionID ?? ''}/"]`).first()).toContainText(`#${vars.subscriptionID ?? ''}`);
  }
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return document.getElementsByClassName("woocommerce-MyAccount-navigation-link--subscriptions")[0].innerText === "Subscriptions" }, vars)) {
    await expect(page.locator(`tr.order.woocommerce-orders-table__row:nth-of-type(1) > td.subscription-status.order-status.woocommerce-orders-table__cell.woocommerce-orders-table__cell-subscription-status.woocommerce-orders-table__cell-order-status`).first()).toContainText(`${vars.subStatus ?? ''}`);
  }
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let scenario = `${vars.scenario}`
return document.getElementsByClassName("woocommerce-MyAccount-navigation-link--subscriptions")[0].innerText === "Subscriptions" && scenario === "multi-currency" }, vars)) {
    await expect(page.locator(`tr.order.woocommerce-orders-table__row:nth-of-type(1) > td.subscription-total > .woocommerce-Price-amount.amount`).first()).toContainText(`${vars.recurringTotal ?? ''}`);
  }
  await page.locator(`a[href*="/my-account/view-subscription/${vars.subscriptionID ?? ''}/"]`).filter({ visible: true }).first().click({ force: true });
  await expect(page.locator(`h1.entry-title`).first()).toContainText(`Subscription #${vars.subscriptionID ?? ''}`);
  await expect(page.locator(`table.shop_table.subscription_details > tbody > tr:nth-of-type(1) > td:nth-of-type(2)`).first()).toContainText(`${vars.subStatus ?? ''}`);
  await expect(page.locator(`.subscription-payment-method`).first()).toContainText(`Via ${vars.paymentMethodTitle ?? ''}`);
  try {
    if (vars.subStatus === "On hold" 
|| 
(vars.subStatus === "Active" 
&& 
((vars.manualRenew === "Yes" || vars.checklogs === "upgrade") && vars.payment === "ach"))) {
      await expect(page.locator(`a.button[href*="change_subscription_to=cancelled"]`).or(page.locator(`.subscription_details > tbody > tr:nth-child(7) > td > a.cancel`))).toHaveCount(0);
    }
  } catch { /* optional step: assertElementNotPresent */ }
  if (vars.subStatus === "On hold" 
|| 
(vars.subStatus === "Active" 
&& 
((vars.manualRenew === "Yes" || vars.checklogs === "upgrade") && vars.payment === "ach"))) {
    await expect(page.locator(`td:nth-child(2) > a.button.subscription_renewal_early`)).toHaveCount(0);
  }
  if (vars.subStatus === "Active" 

&& vars.manualRenew !== "Yes" && vars.checklogs !== "upgrade") {
    await expect(page.locator(`a.button[href*="change_subscription_to=cancelled"]`)).not.toHaveCount(0);
  }
  if ((() => { let scenario = vars.scenario
let manualRenew = vars.manualRenew
let blueSnapVs = vars.BlueSnapVs
let includeTax = vars.includeTax
blueSnapVs = blueSnapVs.split('.');
return scenario === "multi-currency" && manualRenew !== "Yes" && 
        (
        includeTax == "no"
        ||
        (includeTax == "yes" && blueSnapVs[0] >= 3 && blueSnapVs[1] >= 2)    
        ) })()) {
    await expect(page.locator(`div:not(.wcs_early_renew_modal_totals_table) > table td.product-total > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.price ?? ''}`);
  }
  if ((() => { let scenario = vars.scenario
let manualRenew = vars.manualRenew
return scenario === "multi-currency" && manualRenew !== "Yes" })()) {
    await expect(page.locator(`tfoot > tr:nth-of-type(1) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.recurringSubtotal ?? ''}`);
  }
  if ((() => { let scenario = vars.scenario
let manualRenew = vars.manualRenew
return scenario === "multi-currency" && manualRenew !== "Yes" })()) {
    await expect(page.locator(`tfoot > tr:nth-of-type(2) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.recurringDiscount ?? ''}`);
  }
  if ((() => { let scenario = vars.scenario
let manualRenew = vars.manualRenew
let includeTax = vars.includeTax
let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
return scenario === "multi-currency" && manualRenew !== "Yes" && 
        (
            includeTax == "no"
            ||
            (includeTax == "yes" && blueSnapVs[0] >= 3 && blueSnapVs[1] >= 2)
        ) })()) {
    await expect(page.locator(`tfoot > tr:nth-of-type(3) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.recurringShipping ?? ''}`);
  }
  if ((() => { let scenario = vars.scenario
let manualRenew = vars.manualRenew
let checklogs = vars.checklogs
let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');

return scenario === "multi-currency" && vars.includeTax === "no" && manualRenew !== "Yes" })()) {
    await expect(page.locator(`tfoot > tr:nth-of-type(4) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.recurringTax ?? ''}`);
  }
  if ((() => { let scenario = vars.scenario
let manualRenew = vars.manualRenew
let checklogs = vars.checklogs
let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');

return scenario === "multi-currency" && vars.includeTax === "no" && manualRenew !== "Yes" })()) {
    await expect(page.locator(`tfoot > tr:nth-of-type(5) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.recurringTotal ?? ''}`);
  }
  if ((() => { let scenario = vars.scenario
let manualRenew = vars.manualRenew
return scenario === "multi-currency"  && vars.includeTax === "yes" && manualRenew !== "Yes" })()) {
    await expect(page.locator(`tfoot > tr:nth-of-type(4) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.recurringTotal ?? ''}`);
  }
}

// GI: "Upgrade subscription" (62b1e82f5dd4634dc8ef7224)
export async function upgradeSubscription(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.locator(`xpath=//a[contains(text(), "Upgrade or Downgrade")]`).or(page.locator(`a[href*="/product/subscription-test-variable/?switch-subscription=${vars.subscriptionID ?? ''}"]`)).filter({ visible: true }).first().click({ force: true });
  {
    const _lbl = page.locator(`label[for="type"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#type`).filter({ visible: true }).first().click({ force: true }); }
  }
  try { await page.locator(`#type`).first().fill(`Platinum`); } catch { await page.locator(`#type`).first().selectOption(`Platinum`); }
  {
    const _lbl = page.locator(`label[for="period"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#period`).filter({ visible: true }).first().click({ force: true }); }
  }
  try { await page.locator(`#period`).first().fill(`Week`); } catch { await page.locator(`#period`).first().selectOption(`Week`); }
  await page.locator(`button[type="submit"].single_add_to_cart_button`).filter({ visible: true }).first().click({ force: true });
  await page.locator(`a[href*="/cart/"].button.wc-forward`).filter({ visible: true }).first().click({ force: true });
  if ("BLU-001-022" === vars.testId) {
    vars.currency = `EUR`;
  }
  if ("BLU-001-022" === vars.testId) {
    await selectCurrencyOnFrontEnd(page, vars);
  }
  if ("BLU-001-022" === vars.testId) {
    await expect(page.locator(`.woocommerce-error > li`).or(page.locator(`.wc-block-components-notice-banner.is-error`)).first()).toHaveText(`You cannot change currency while a subscription switch exists in your cart.`);
  }
  await page.locator(`a[href*="/checkout/"].checkout-button`).or(page.locator(`a[href*="/checkout/"] > div`)).or(page.locator(`xpath=//div[contains(text(),'Proceed to Checkout')]`)).filter({ visible: true }).first().click({ force: true });
  if ("BLU-001-022" === vars.testId) {
    vars.currency = `EUR`;
  }
  if ("BLU-001-022" === vars.testId) {
    await selectCurrencyOnFrontEnd(page, vars);
  }
  if ("BLU-001-022" === vars.testId) {
    await expect(page.locator(`.woocommerce-error > li`).or(page.locator(`.wc-block-components-notice-banner.is-error`)).first()).toHaveText(`You cannot change currency while a subscription switch exists in your cart.`);
  }
  await page.waitForLoadState('load');
  await blockUI(page, vars);
}

// GI: "Use 3DS CC" (620bf570329c2fb1fecab703)
export async function use3DSCC(page: Page, vars: Record<string, string> = {}): Promise<void> {
  if ((() => { let cc = vars['3ds']
return cc === "1.0a" })()) {
    vars.CCard = `4000000000000002`;
  }
  if ((() => { let cc = vars['3ds']
return cc === "1.0d" })()) {
    vars.CCard = `4000000000000028`;
  }
  if ((() => { let cc = vars['3ds']
return cc === "2.0a" })()) {
    vars.CCard = `4000000000002701`;
  }
  if ((() => { let cc = vars['3ds']
return cc === "2.0aW" })()) {
    vars.CCard = `4000000000002503`;
  }
  if ((() => { let cc = vars['3ds']
return cc === "2.0d" })()) {
    vars.CCard = `4000000000002925`;
  }
  if ((() => { let cc = vars['3ds']
return cc === "2.0dW" })()) {
    vars.CCard = `4000000000002370`;
  }
  vars.month = `01`;
  vars.year = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let year = new Date().getFullYear()+3
year = year.toString().substr(-2)
return year
 }, vars);
  vars.cvv = `123`;
  vars.ShortName = `VISA`;
  vars.CCName = `Visa`;
}

// GI: "Use AMEX" (61b35fe8c9d89130132fecda)
export async function useAMEX(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.CCard = `374245455400126`;
  vars.CCName = `American Express`;
  vars.month = `05`;
  vars.year = `29`;
  vars.cvv = `1234`;
  vars.ShortName = `AMEX`;
}

// GI: "Use CENCOSUD decline" (64088010af1e488d25dbe9a9)
export async function useCENCOSUDDecline(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.CCard = `6034932528973614`;
  vars.month = `06`;
  vars.year = `29`;
  vars.cvv = `123`;
  vars.ShortName = `CENCOSUD`;
}

// GI: "Use Diners" (648a130356ef19024fef006f)
export async function useDiners(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.CCard = `30012263304734`;
  vars.CCName = `Diners`;
  vars.month = `05`;
  vars.year = `29`;
  vars.cvv = `123`;
  vars.ShortName = `DINERS`;
}

// GI: "Use MASTER" (61b360923a4935e146473e7f)
export async function useMASTER(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.CCard = `5425233430109903`;
  vars.CCName = `MasterCard`;
  vars.month = `04`;
  vars.year = `29`;
  vars.cvv = `765`;
  vars.ShortName = `MASTERCARD`;
}

// GI: "Use Visa decline" (61dec15736bb62032a9017b7)
export async function useVisaDecline(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.CCard = `4917484589897107`;
  vars.month = `01`;
  vars.year = `29`;
  vars.cvv = `123`;
  vars.ShortName = `VISA`;
  vars.CCName = `Visa`;
}

// GI: "verify currency email" (637b9f845a27ff0806a9467f)
export async function verifyCurrencyEmail(page: Page, vars: Record<string, string> = {}): Promise<void> {
  if ((() => { let test = vars.test
let checklogs = vars.checklogs
let freeTrial = vars.freeTrial
let includeTax = vars.includeTax
let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
const blog = vars.blog

return  (
            (blueSnapVs[0] >= 3 && blueSnapVs[1] >= 2 && !blog.includes('block')
            ||
            (blueSnapVs[0] >= 3 && blueSnapVs[1] >= 5 && blog.includes('block') })()) {
    await expect(page.locator(`iframe[srcdoc]`).first().contentFrame().locator(`div:nth-of-type(1) > table.td > tbody > tr.order_item > td.td:nth-of-type(3) > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.totalProd ?? ''}`);
  }
  await expect(page.locator(`iframe[srcdoc]`).first().contentFrame().locator(`div:nth-of-type(1) > table.td > tfoot > tr:nth-of-type(1) > td.td > .woocommerce-Price-amount.amount`).or(page.locator(`iframe[srcdoc]`).first().contentFrame().locator(`tbody > tr.order-totals-subtotal > td.td > .woocommerce-Price-amount.amount`)).first()).toHaveText(`${vars.subtotal ?? ''}`);
  if ((() => { let freeTrial = vars.freeTrial
return freeTrial != "yes" })()) {
    await expect(page.locator(`iframe[srcdoc]`).first().contentFrame().locator(`div:nth-of-type(1) > table.td > tfoot > tr:nth-of-type(2) > td.td > .woocommerce-Price-amount.amount`).or(page.locator(`iframe[srcdoc]`).first().contentFrame().locator(`tbody > tr.order-totals-discount > td.td > .woocommerce-Price-amount.amount`)).first()).toHaveText(`${vars.discount ?? ''}`);
  }
  if ((() => { let freeTrial = vars.freeTrial
return freeTrial === "yes" })()) {
    await expect(page.locator(`iframe[srcdoc]`).first().contentFrame().locator(`div:nth-of-type(1) > table.td > tfoot > tr:nth-of-type(2) > td.td > .woocommerce-Price-amount.amount`).or(page.locator(`iframe[srcdoc]`).first().contentFrame().locator(`tbody > tr.order-totals-tax > td.td > .woocommerce-Price-amount.amount`)).first()).toHaveText(`${vars.tax ?? ''}`);
  }
  if ((() => { let checklogs = vars.checklogs
let freeTrial = vars.freeTrial
let blueSnapVs = vars.BlueSnapVs
let includeTax = vars.includeTax
blueSnapVs = blueSnapVs.split('.');
return checklogs != "upgrade" && freeTrial != "yes"  && 
        (
            includeTax == "no"
            ||
            (includeTax == "yes" && blueSnapVs[0] >= 3 && blueSnapVs[1] >= 2)
        ) })()) {
    await expect(page.locator(`iframe[srcdoc]`).first().contentFrame().locator(`div:nth-of-type(1) > table.td > tfoot > tr:nth-of-type(3) > td.td > .woocommerce-Price-amount.amount`).or(page.locator(`iframe[srcdoc]`).first().contentFrame().locator(`tbody > tr.order-totals-shipping > td.td > .woocommerce-Price-amount.amount`)).first()).toContainText(`${vars.shipping ?? ''}`);
  }
  if ((() => { let checklogs = vars.checklogs
let freeTrial = vars.freeTrial
return checklogs != "upgrade" && freeTrial != "yes" && vars.includeTax === "no" })()) {
    await expect(page.locator(`iframe[srcdoc]`).first().contentFrame().locator(`div:nth-of-type(1) > table.td > tfoot > tr:nth-of-type(4) > td.td > .woocommerce-Price-amount.amount`).or(page.locator(`iframe[srcdoc]`).first().contentFrame().locator(`tbody > tr.order-totals-tax > td.td > .woocommerce-Price-amount.amount`)).first()).toHaveText(`${vars.tax ?? ''}`);
  }
  if ((() => { let checklogs = vars.checklogs
return checklogs === "upgrade" })()) {
    await expect(page.locator(`iframe[srcdoc]`).first().contentFrame().locator(`div:nth-of-type(1) > table.td > tfoot > tr:nth-of-type(3) > td.td > .woocommerce-Price-amount.amount`).or(page.locator(`iframe[srcdoc]`).first().contentFrame().locator(`tbody > tr.order-totals-tax > td.td > .woocommerce-Price-amount.amount`)).first()).toHaveText(`${vars.tax ?? ''}`);
  }
  if (vars.includeTax === "yes") {
    await expect(page.locator(`iframe[srcdoc]`).first().contentFrame().locator(`small.includes_tax > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.tax ?? ''}`);
  }
  if ((() => { let checklogs = vars.checklogs
return checklogs === "upgrade" && vars.includeTax === "no" })()) {
    await expect(page.locator(`iframe[srcdoc]`).first().contentFrame().locator(`div:nth-of-type(1) > table.td > tfoot > tr:nth-of-type(5) > td.td > .woocommerce-Price-amount.amount`).or(page.locator(`iframe[srcdoc]`).first().contentFrame().locator(`tbody > tr.order-totals-total > td.td > .woocommerce-Price-amount.amount`)).first()).toHaveText(`${vars.total ?? ''}`);
  }
  if ((() => { let checklogs = vars.checklogs
return checklogs === "upgrade" && vars.includeTax === "yes" })()) {
    await expect(page.locator(`iframe[srcdoc]`).first().contentFrame().locator(`div:nth-of-type(1) > table.td > tfoot > tr:nth-of-type(4) > td.td > .woocommerce-Price-amount.amount`).or(page.locator(`iframe[srcdoc]`).first().contentFrame().locator(`tbody > tr.order-totals-total > td.td > .woocommerce-Price-amount.amount`)).first()).toHaveText(`${vars.total ?? ''}`);
  }
  if ((() => { let freeTrial = vars.freeTrial
return freeTrial === "yes" && vars.includeTax === "no" })()) {
    await expect(page.locator(`iframe[srcdoc]`).first().contentFrame().locator(`div:nth-of-type(1) > table.td > tfoot > tr:nth-of-type(4) > td.td > .woocommerce-Price-amount.amount`).or(page.locator(`iframe[srcdoc]`).first().contentFrame().locator(`tbody > tr.order-totals-total > td.td > .woocommerce-Price-amount.amount`)).first()).toHaveText(`${vars.total ?? ''}`);
  }
  if ((() => { let freeTrial = vars.freeTrial
return freeTrial === "yes" && vars.includeTax === "yes" })()) {
    await expect(page.locator(`iframe[srcdoc]`).first().contentFrame().locator(`div:nth-of-type(1) > table.td > tfoot > tr:nth-of-type(3) > td.td > .woocommerce-Price-amount.amount`).or(page.locator(`iframe[srcdoc]`).first().contentFrame().locator(`tbody > tr.order-totals-total > td.td > .woocommerce-Price-amount.amount`)).first()).toHaveText(`${vars.total ?? ''}`);
  }
  if ((() => { let checklogs = vars.checklogs
let test = vars.test
let freeTrial = vars.freeTrial
return checklogs != "upgrade" && test != "partial" && test != "full" 
&& freeTrial != "yes" && vars.includeTax === "no" })()) {
    await expect(page.locator(`iframe[srcdoc]`).first().contentFrame().locator(`div:nth-of-type(1) > table.td > tfoot > tr:nth-of-type(6) > td.td > .woocommerce-Price-amount.amount`).or(page.locator(`iframe[srcdoc]`).first().contentFrame().locator(`tbody > tr.order-totals-total > td.td > .woocommerce-Price-amount.amount`)).first()).toHaveText(`${vars.total ?? ''}`);
  }
  if ((() => { let checklogs = vars.checklogs
let test = vars.test
let freeTrial = vars.freeTrial
return checklogs != "upgrade" && test != "partial" && test != "full" 
&& freeTrial != "yes" && vars.includeTax === "yes" })()) {
    await expect(page.locator(`iframe[srcdoc]`).first().contentFrame().locator(`div:nth-of-type(1) > table.td > tfoot > tr:nth-of-type(5) > td.td > .woocommerce-Price-amount.amount`).or(page.locator(`iframe[srcdoc]`).first().contentFrame().locator(`tbody > tr.order-totals-total > td.td > .woocommerce-Price-amount.amount`)).first()).toHaveText(`${vars.total ?? ''}`);
  }
  if ((() => { let test = vars.test
return test === "full" })()) {
    await expect(page.locator(`iframe[srcdoc]`).first().contentFrame().locator(`div:nth-of-type(1) > table.td > tfoot > tr:nth-of-type(6) > td.td > .woocommerce-Price-amount.amount`).or(page.locator(`iframe[srcdoc]`).first().contentFrame().locator(`tbody > tr.order-totals-refund > td.td > .woocommerce-Price-amount.amount`)).first()).toHaveText(`-${vars.total ?? ''}`);
  }
  if ((() => { let test = vars.test
return test === "full" })()) {
    await expect(page.locator(`iframe[srcdoc]`).first().contentFrame().locator(`div:nth-of-type(1) > table.td > tfoot > tr:nth-of-type(7) > td.td > del`).or(page.locator(`iframe[srcdoc]`).first().contentFrame().locator(`tbody > tr.order-totals-total > td.td > del`)).first()).toHaveText(`${vars.total ?? ''}`);
  }
  if ((() => { let test = vars.test
return test === "full" })()) {
    await expect(page.locator(`iframe[srcdoc]`).first().contentFrame().locator(`div:nth-of-type(1) > table.td > tfoot > tr:nth-of-type(7) > td.td > ins > .woocommerce-Price-amount.amount`).or(page.locator(`iframe[srcdoc]`).first().contentFrame().locator(`tbody > tr.order-totals-total > td.td > ins > .woocommerce-Price-amount.amount`)).first()).toContainText(`0.00`);
  }
  if ((() => { let test = vars.test
return test === "partial" })()) {
    vars.total = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let total = `${vars.total}`
total = total.replace(`${vars.symbol}`,"").trim();
return total }, vars);
  }
  if ((() => { let test = vars.test
return test === "partial" })()) {
    vars.restTotal = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let total = vars.total-vars.partialRefund
return Intl.NumberFormat(`${vars.locale}`, { style: 'currency', currency: `${vars.currency}`}).format(total) }, vars);
  }
  if ((() => { let test = vars.test
return test === "partial" })()) {
    vars.total = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return Intl.NumberFormat(`${vars.locale}`, { style: 'currency', currency: `${vars.currency}`}).format(vars.total) }, vars);
  }
  if ((() => { let test = vars.test
return test === "partial" })()) {
    await expect(page.locator(`iframe[srcdoc]`).first().contentFrame().locator(`div:nth-of-type(1) > table.td > tfoot > tr:nth-of-type(6) > td.td > .woocommerce-Price-amount.amount`).or(page.locator(`iframe[srcdoc]`).first().contentFrame().locator(`tbody > tr.order-totals-refund > td.td > .woocommerce-Price-amount.amount`)).first()).toHaveText(`-${vars.partialRefund ?? ''}`);
  }
  if ((() => { let test = vars.test
return test === "partial" })()) {
    await expect(page.locator(`iframe[srcdoc]`).first().contentFrame().locator(`div:nth-of-type(1) > table.td > tfoot > tr:nth-of-type(7) > td.td > del`).or(page.locator(`iframe[srcdoc]`).first().contentFrame().locator(`tbody > tr.order-totals-total > td.td > del`)).first()).toHaveText(`${vars.total ?? ''}`);
  }
  if ((() => { let test = vars.test
return test === "partial" })()) {
    await expect(page.locator(`iframe[srcdoc]`).first().contentFrame().locator(`div:nth-of-type(1) > table.td > tfoot > tr:nth-of-type(7) > td.td > ins > .woocommerce-Price-amount.amount`).or(page.locator(`iframe[srcdoc]`).first().contentFrame().locator(`tbody > tr.order-totals-total > td.td > ins > .woocommerce-Price-amount.amount`)).first()).toHaveText(`${vars.restTotal ?? ''}`);
  }
  if ((() => { let test = vars.test
return test === "subscription" })()) {
    await expect(page.locator(`iframe[srcdoc]`).first().contentFrame().locator(`td.td:nth-of-type(4) > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.recurringTotal ?? ''}`);
  }
  if ((() => { let checklogs = vars.checklogs
return checklogs === "upgrade" })()) {
    await expect(page.locator(`iframe[srcdoc]`).first().contentFrame().locator(`div:nth-of-type(3) > table.td > tbody > tr.order_item > td.td:nth-of-type(3) > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.price ?? ''}`);
  }
  if ((() => { let checklogs = vars.checklogs
return checklogs === "upgrade" })()) {
    await expect(page.locator(`iframe[srcdoc]`).first().contentFrame().locator(`div:nth-of-type(3) > table.td > tfoot > tr:nth-of-type(1) > td.td > .woocommerce-Price-amount.amount`).or(page.locator(`iframe[srcdoc]`).first().contentFrame().locator(`tbody > tr.order-totals-subtotal > td.td > .woocommerce-Price-amount.amount`)).first()).toHaveText(`${vars.recurringSubtotal ?? ''}`);
  }
  if ((() => { let checklogs = vars.checklogs
return checklogs === "upgrade" })()) {
    await expect(page.locator(`iframe[srcdoc]`).first().contentFrame().locator(`div:nth-of-type(3) > table.td > tfoot > tr:nth-of-type(2) > td.td > .woocommerce-Price-amount.amount`).or(page.locator(`iframe[srcdoc]`).first().contentFrame().locator(`tbody > tr.order-totals-discount > td.td > .woocommerce-Price-amount.amount`)).first()).toContainText(`${vars.recurringDiscount ?? ''}`);
  }
  if ((() => { let checklogs = vars.checklogs
return checklogs === "upgrade" })()) {
    await expect(page.locator(`iframe[srcdoc]`).first().contentFrame().locator(`div:nth-of-type(3) > table.td > tfoot > tr:nth-of-type(3) > td.td > .woocommerce-Price-amount.amount`).or(page.locator(`iframe[srcdoc]`).first().contentFrame().locator(`tbody > tr.order-totals-shipping > td.td > .woocommerce-Price-amount.amount`)).first()).toContainText(`${vars.recurringShipping ?? ''}`);
  }
  if ((() => { let checklogs = vars.checklogs
return checklogs === "upgrade" })()) {
    await expect(page.locator(`iframe[srcdoc]`).first().contentFrame().locator(`tr:nth-of-type(4) > td.td > .woocommerce-Price-amount.amount`).or(page.locator(`iframe[srcdoc]`).first().contentFrame().locator(`tbody > tr.order-totals-tax > td.td > .woocommerce-Price-amount.amount`)).first()).toHaveText(`${vars.recurringTax ?? ''}`);
  }
  if ((() => { let checklogs = vars.checklogs
return checklogs === "upgrade" })()) {
    await expect(page.locator(`iframe[srcdoc]`).first().contentFrame().locator(`tr:nth-of-type(6) > td.td > .woocommerce-Price-amount.amount`).or(page.locator(`iframe[srcdoc]`).first().contentFrame().locator(`tbody > tr.order-totals-total > td.td > .woocommerce-Price-amount.amount`)).first()).toHaveText(`${vars.recurringTotal ?? ''}`);
  }
}

// GI: "verify currency on backend order" (637bde1c00f0a0a031e7f7d2)
export async function verifyCurrencyOnBackendOrder(page: Page, vars: Record<string, string> = {}): Promise<void> {
  if ((() => { let currency = vars.currency
let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
    return (
                currency !== "JPY" 
                || 
                (
                    currency === "JPY" 
                    && 
                    (
                        Number(blueSnapVs[0]) >= 3 
                        && Number(blueSnapVs[1]) >= 5
                    )
                )
            )
            &&
            vars.includeTax === "no" })()) {
    vars.totalProd = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let result = vars.listPrices
return Intl.NumberFormat(`${vars.defaultLocale}`, { style: 'currency', currency: `${vars.currency}`, minimumFractionDigits: 2}).format(result[0])
 }, vars);
  }
  if ((() => { let currency = vars.currency
let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
    return (
                currency !== "JPY" 
                || 
                (
                    currency === "JPY" 
                    && 
                    (
                        Number(blueSnapVs[0]) >= 3 
                        && Number(blueSnapVs[1]) >= 5
                    )
                )
            )
            &&
        vars.includeTax === "yes" })()) {
    vars.totalProd = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let result = vars.listPrices
let price = result[0]/1.1
if (`${vars.currency}` === 'JPY') {
    price = Math.round(price)
}
return Intl.NumberFormat(`${vars.defaultLocale}`, { style: 'currency', currency: `${vars.currency}`, minimumFractionDigits: 2}).format(price)
 }, vars);
  }
  if ((() => { let currency = vars.currency
let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
    return 
                (
                    currency !== "JPY"
                    &&
                    (
                        Number(blueSnapVs[0]) >= 3 
                        && Number(blueSnapVs[1]) >= 2
                    )
                )
                || 
                (
                    currency === "JPY" 
                    && 
                    (
                        Number(blueSnapVs[0]) >= 3 
                        && Number(blueSnapVs[1]) >= 5
                    )
                ) })()) {
    await expect(page.locator(`td.item_cost > .view > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.totalProd ?? ''}`);
  }
  if ((() => { let freeTrial = vars.freeTrial
let currency = vars.currency
let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
    return (
                currency !== "JPY" 
                || 
                (
                    currency === "JPY" 
                    && 
                    (
                        Number(blueSnapVs[0]) >= 3 
                        && Number(blueSnapVs[1]) >= 5
                    )
                )
            )
            &&
            freeTrial != "yes" 
            && 
            vars.includeTax === "yes" })()) {
    vars.totalProdWithDiscount = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let result = vars.listPrices
let price = (result[0]/1.1)-(result[2]/1.1)
if (`${vars.currency}` === 'JPY') {
    price = Math.round(price)
}
return Intl.NumberFormat(`${vars.defaultLocale}`, { style: 'currency', currency: `${vars.currency}`, minimumFractionDigits: 2}).format(price)
 }, vars);
  }
  if ((() => { let freeTrial = vars.freeTrial
let currency = vars.currency
let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
    return (
                currency !== "JPY" 
                || 
                (
                    currency === "JPY" 
                    && 
                    (
                        Number(blueSnapVs[0]) >= 3 
                        && Number(blueSnapVs[1]) >= 5
                    )
                )
            )
            &&
            freeTrial != "yes" 
            && 
            vars.includeTax === "no" })()) {
    vars.totalProdWithDiscount = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let result = vars.listPrices
let price = result[0]-result[2]
if (`${vars.currency}` === 'JPY') {
    price = Math.round(price)
}
return Intl.NumberFormat(`${vars.defaultLocale}`, { style: 'currency', currency: `${vars.currency}`, minimumFractionDigits: 2}).format(price)
 }, vars);
  }
  if ((() => { let freeTrial = vars.freeTrial
let includeTax = vars.includeTax
let currency = vars.currency
let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
const blog = vars.blog.includes('block')
    return (
                (
                    currency !== "JPY"
                    &&
                    (
                        (blueSnapVs[0] >= 3 
                        && 
                        blueSnapVs[1] >= 2
                        &&
                        !blog)
                        ||
                        (blueSnapVs[0] >= 3 
                        && 
                        blueSnapVs[1] >= 5
                        &&
                        blog)
                    )
                )
                || 
                (
                    currency === "JPY" 
                    && 
                    (
                        Number(blueSnapVs[0]) >= 3 
                        && Number(blueSnapVs[1]) >= 5
                    )
                )
            )
            &&
            freeTrial != "yes" })()) {
    await expect(page.locator(`td.line_cost > .view > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.totalProdWithDiscount ?? ''}`);
  }
  if ((() => { let freeTrial = vars.freeTrial
let currency = vars.currency
let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
return      (
                currency !== "JPY" 
                || 
                (
                    currency === "JPY" 
                    && 
                    (
                        Number(blueSnapVs[0]) >= 3 
                        && Number(blueSnapVs[1]) >= 5
                    )
                )
            )
            &&
            freeTrial === "yes" })()) {
    await expect(page.locator(`td.line_cost > .view > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.totalProd ?? ''}`);
  }
  if ((() => { let freeTrial = vars.freeTrial
let currency = vars.currency
let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
return (
                currency !== "JPY" 
                || 
                (
                    currency === "JPY" 
                    && 
                    (
                        Number(blueSnapVs[0]) >= 3 
                        && Number(blueSnapVs[1]) >= 5
                    )
                )
            )
            &&
            freeTrial != "yes" && vars.includeTax === "no" })()) {
    vars.productTax = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let result = vars.listPrices
let price = (result[0]-result[2])*0.1
if (`${vars.currency}` === 'JPY') {
    price = Math.round(price)
}
return Intl.NumberFormat(`${vars.defaultLocale}`, { style: 'currency', currency: `${vars.currency}`, minimumFractionDigits: 2}).format(price)
 }, vars);
  }
  if ((() => { let freeTrial = vars.freeTrial
let currency = vars.currency
let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
    return (
                currency !== "JPY" 
                || 
                (
                    currency === "JPY" 
                    && 
                    (
                        Number(blueSnapVs[0]) >= 3 
                        && Number(blueSnapVs[1]) >= 5
                    )
                )
            )
            &&
            freeTrial != "yes" && vars.includeTax === "yes" })()) {
    vars.productTax = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let result = vars.listPrices
let price = ((result[0]/1.1)-(result[2]/1.1))*0.1
if (`${vars.currency}` === 'JPY') {
    price = Math.round(price)
}
return Intl.NumberFormat(`${vars.defaultLocale}`, { style: 'currency', currency: `${vars.currency}`, minimumFractionDigits: 2}).format(price)
 }, vars);
  }
  if ((() => { let freeTrial = vars.freeTrial
let currency = vars.currency
let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
    return (
                currency !== "JPY" 
                || 
                (
                    currency === "JPY" 
                    && 
                    (
                        Number(blueSnapVs[0]) >= 3 
                        && Number(blueSnapVs[1]) >= 5
                    )
                )
            )
            && 
            freeTrial === "yes" && vars.includeTax === "no" })()) {
    vars.productTax = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let result = vars.listPrices
let price = (result[0])*0.1
if (`${vars.currency}` === 'JPY') {
    price = Math.round(price)
}
return Intl.NumberFormat(`${vars.defaultLocale}`, { style: 'currency', currency: `${vars.currency}`, minimumFractionDigits: 2}).format(price)
 }, vars);
  }
  if ((() => { let freeTrial = vars.freeTrial
let currency = vars.currency
let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
    return (
                currency !== "JPY" 
                || 
                (
                    currency === "JPY" 
                    && 
                    (
                        Number(blueSnapVs[0]) >= 3 
                        && Number(blueSnapVs[1]) >= 5
                    )
                )
            )
            &&
            freeTrial === "yes" && vars.includeTax === "yes" })()) {
    vars.productTax = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let result = vars.listPrices
let price = (result[0]/1.1)*0.1
if (`${vars.currency}` === 'JPY') {
    price = Math.round(price)
}
return Intl.NumberFormat(`${vars.defaultLocale}`, { style: 'currency', currency: `${vars.currency}`, minimumFractionDigits: 2}).format(price)
 }, vars);
  }
  if ((() => { let currency = vars.currency
let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
    return (
                currency !== "JPY" 
                || 
                (
                    currency === "JPY" 
                    && 
                    (
                        Number(blueSnapVs[0]) >= 3 
                        && Number(blueSnapVs[1]) >= 5
                    )
                )
            ) })()) {
    await expect(page.locator(`td.line_tax > .view > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.productTax ?? ''}`);
  }
  if ((() => { let freeTrial = vars.freeTrial
let currency = vars.currency
let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
    return (
                currency !== "JPY" 
                || 
                (
                    currency === "JPY" 
                    && 
                    (
                        Number(blueSnapVs[0]) >= 3 
                        && Number(blueSnapVs[1]) >= 5
                    )
                )
            )
            &&
            freeTrial != "yes" && vars.includeTax === "no" })()) {
    vars.discount = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let result = vars.listPrices
return Intl.NumberFormat(`${vars.defaultLocale}`, { style: 'currency', currency: `${vars.currency}`, minimumFractionDigits: 2}).format(result[2])
 }, vars);
  }
  if ((() => { let freeTrial = vars.freeTrial
let currency = vars.currency
let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
    return (
                currency !== "JPY" 
                || 
                (
                    currency === "JPY" 
                    && 
                    (
                        Number(blueSnapVs[0]) >= 3 
                        && Number(blueSnapVs[1]) >= 5
                    )
                )
            )
            &&
            freeTrial != "yes" && vars.includeTax === "yes" })()) {
    vars.discount = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let result = vars.listPrices
let discount = result[2]/1.1
if (`${vars.currency}` === 'JPY') {
    price = Math.round(price)
}
return Intl.NumberFormat(`${vars.defaultLocale}`, { style: 'currency', currency: `${vars.currency}`, minimumFractionDigits: 2}).format(discount)
 }, vars);
  }
  if ((() => { let freeTrial = vars.freeTrial
let currency = vars.currency
let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
    return (
                currency !== "JPY" 
                || 
                (
                    currency === "JPY" 
                    && 
                    (
                        Number(blueSnapVs[0]) >= 3 
                        && Number(blueSnapVs[1]) >= 5
                    )
                )
            )
            &&
            freeTrial != "yes" })()) {
    await expect(page.locator(`.wc-order-item-discount > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.discount ?? ''}`);
  }
  if ((() => { let freeTrial = vars.freeTrial
let checklogs = vars.checklogs
let currency = vars.currency
let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
    return (
                currency !== "JPY" 
                || 
                (
                    currency === "JPY" 
                    && 
                    (
                        Number(blueSnapVs[0]) >= 3 
                        && Number(blueSnapVs[1]) >= 5
                    )
                )
            )
            &&
            freeTrial != "yes" && checklogs != "upgrade" && vars.includeTax === "no" })()) {
    vars.shipping = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let result = vars.listPrices
return Intl.NumberFormat(`${vars.defaultLocale}`, { style: 'currency', currency: `${vars.currency}`, minimumFractionDigits: 2}).format(result[3])
 }, vars);
  }
  if ((() => { let freeTrial = vars.freeTrial
let checklogs = vars.checklogs
let currency = vars.currency
let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
    return (
                currency !== "JPY" 
                || 
                (
                    currency === "JPY" 
                    && 
                    (
                        Number(blueSnapVs[0]) >= 3 
                        && Number(blueSnapVs[1]) >= 5
                    )
                )
            )
            &&
            freeTrial != "yes" && checklogs != "upgrade" && vars.includeTax === "yes" })()) {
    vars.shipping = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let result = vars.listPrices
let price = result[3]/1.1
if (`${vars.currency}` === 'JPY') {
    price = Math.round(price)
}
return Intl.NumberFormat(`${vars.defaultLocale}`, { style: 'currency', currency: `${vars.currency}`, minimumFractionDigits: 2}).format(price)
 }, vars);
  }
  if ((() => { let freeTrial = vars.freeTrial
let checklogs = vars.checklogs
let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
let currency = vars.currency

    return (
                currency !== "JPY" 
                || 
                (
                    currency === "JPY" 
                    && 
                    (
                        Number(blueSnapVs[0]) >= 3 
                        && Number(blueSnapVs[1]) >= 5
                    )
                )
            )
            &&
            freeTrial != "yes" && checklogs != "upgrade" && 
            (
                vars.includeTax === "no"
                || 
                (
                    vars.includeTax === "yes"  
                    && 
                    blueSnapVs[0] >= 3 
                    && 
                    blueSnapVs[1] >= 2
                )
            ) })()) {
    await expect(page.locator(`tr.shipping > td.line_cost > .view > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.shipping ?? ''}`);
  }
  if ((() => { let freeTrial = vars.freeTrial
let checklogs = vars.checklogs
let currency = vars.currency
let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
    return (
                currency !== "JPY" 
                || 
                (
                    currency === "JPY" 
                    && 
                    (
                        Number(blueSnapVs[0]) >= 3 
                        && Number(blueSnapVs[1]) >= 5
                    )
                )
            )
            &&
            freeTrial != "yes" && checklogs != "upgrade" && vars.includeTax === "no" })()) {
    vars.shippingTax = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let result = vars.listPrices
let price = result[3]*0.1
if (`${vars.currency}` === 'JPY') {
    price = Math.round(price)
}
return Intl.NumberFormat(`${vars.defaultLocale}`, { style: 'currency', currency: `${vars.currency}`, minimumFractionDigits: 2}).format(price)
 }, vars);
  }
  if ((() => { let freeTrial = vars.freeTrial
let checklogs = vars.checklogs
let currency = vars.currency
let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
    return (
                currency !== "JPY" 
                || 
                (
                    currency === "JPY" 
                    && 
                    (
                        Number(blueSnapVs[0]) >= 3 
                        && Number(blueSnapVs[1]) >= 5
                    )
                )
            )
            &&
            freeTrial != "yes" && checklogs != "upgrade" && vars.includeTax === "yes" })()) {
    vars.shippingTax = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let result = vars.listPrices
let price = (result[3]/1.1)*0.1
if (`${vars.currency}` === 'JPY') {
    price = Math.round(price)
}
return Intl.NumberFormat(`${vars.defaultLocale}`, { style: 'currency', currency: `${vars.currency}`, minimumFractionDigits: 2}).format(price)
 }, vars);
  }
  if ((() => { let freeTrial = vars.freeTrial
let checklogs = vars.checklogs
let currency = vars.currency
let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
    return (
                currency !== "JPY" 
                || 
                (
                    currency === "JPY" 
                    && 
                    (
                        Number(blueSnapVs[0]) >= 3 
                        && Number(blueSnapVs[1]) >= 5
                    )
                )
            )
            &&
            freeTrial != "yes" && checklogs != "upgrade" && 
        (vars.includeTax === "no"
        || (vars.includeTax === "yes"  && blueSnapVs[0] >= 3 && blueSnapVs[1] >= 2)
        ) })()) {
    await expect(page.locator(`tr.shipping > td.line_tax > .view > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.shippingTax ?? ''}`);
  }
  if ((() => { let currency = vars.currency
let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
    return (
                currency !== "JPY" 
                || 
                (
                    currency === "JPY" 
                    && 
                    (
                        Number(blueSnapVs[0]) >= 3 
                        && Number(blueSnapVs[1]) >= 5
                    )
                )
            )
            && vars.includeTax === "yes" })()) {
    vars.subtotal = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let result = vars.listPrices
let price = result[1]/1.1
if (`${vars.currency}` === 'JPY') {
    price = Math.round(price)
}
return Intl.NumberFormat(`${vars.defaultLocale}`, { style: 'currency', currency: `${vars.currency}`, minimumFractionDigits: 2}).format(price)
 }, vars);
  }
  if ((() => { let currency = vars.currency
let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
    return (
                currency !== "JPY" 
                || 
                (
                    currency === "JPY" 
                    && 
                    (
                        Number(blueSnapVs[0]) >= 3 
                        && Number(blueSnapVs[1]) >= 5
                    )
                )
            )
            &&
            vars.includeTax === "no" })()) {
    vars.subtotal = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let result = vars.listPrices
return Intl.NumberFormat(`${vars.defaultLocale}`, { style: 'currency', currency: `${vars.currency}`, minimumFractionDigits: 2}).format(result[1])
 }, vars);
  }
  if ((() => { let currency = vars.currency
let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
    return (
                currency !== "JPY" 
                || 
                (
                    currency === "JPY" 
                    && 
                    (
                        Number(blueSnapVs[0]) >= 3 
                        && Number(blueSnapVs[1]) >= 5
                    )
                )
            ) })()) {
    await expect(page.locator(`table.wc-order-totals:nth-of-type(1) > tbody > tr:nth-of-type(1) > td.total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.subtotal ?? ''}`);
  }
  if ((() => { let freeTrial = vars.freeTrial
let currency = vars.currency
let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
    return (
                currency !== "JPY" 
                || 
                (
                    currency === "JPY" 
                    && 
                    (
                        Number(blueSnapVs[0]) >= 3 
                        && Number(blueSnapVs[1]) >= 5
                    )
                )
            )
            &&
            freeTrial != "yes" })()) {
    await expect(page.locator(`.wc-order-data-row.wc-order-totals-items > table.wc-order-totals:nth-of-type(1) > tbody > tr:nth-of-type(2) > td.total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.discount ?? ''}`);
  }
  if ((() => { let freeTrial = vars.freeTrial
let checklogs = vars.checklogs
let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
let includeTax = vars.includeTax
let currency = vars.currency
    return (
                currency !== "JPY" 
                || 
                (
                    currency === "JPY" 
                    && 
                    (
                        Number(blueSnapVs[0]) >= 3 
                        && Number(blueSnapVs[1]) >= 5
                    )
                )
            )
            &&
            freeTrial != "yes" && checklogs != "upgrade" 
            && 
            (
                includeTax === "no"
                || 
                (
                    includeTax === "yes" 
                    &&
                    blueSnapVs[0] >= 3 && blueSnapVs[1] >= 2
                )
            ) })()) {
    await expect(page.locator(`.wc-order-data-row.wc-order-totals-items > table.wc-order-totals:nth-of-type(1) > tbody > tr:nth-of-type(3) > td.total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.shipping ?? ''}`);
  }
  if ((() => { let freeTrial = vars.freeTrial
let checklogs = vars.checklogs
let includeTax = vars.includeTax
let currency = vars.currency
let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
    return (
                currency !== "JPY" 
                || 
                (
                    currency === "JPY" 
                    && 
                    (
                        Number(blueSnapVs[0]) >= 3 
                        && Number(blueSnapVs[1]) >= 5
                    )
                )
            )
            &&
            freeTrial != "yes" && checklogs != "upgrade" })()) {
    vars.tax = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let result = vars.listPrices
return Intl.NumberFormat(`${vars.defaultLocale}`, { style: 'currency', currency: `${vars.currency}`, minimumFractionDigits: 2}).format(result[4])
 }, vars);
  }
  if ((() => { let freeTrial = vars.freeTrial
let checklogs = vars.checklogs
let includeTax = vars.includeTax
let currency = vars.currency
let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
    return (
                currency !== "JPY" 
                || 
                (
                    currency === "JPY" 
                    && 
                    (
                        Number(blueSnapVs[0]) >= 3 
                        && Number(blueSnapVs[1]) >= 5
                    )
                )
            )
            &&
            freeTrial != "yes" && checklogs != "upgrade" })()) {
    await expect(page.locator(`tr:nth-of-type(4) > td.total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.tax ?? ''}`);
  }
  if ((() => { let freeTrial = vars.freeTrial
let currency = vars.currency
let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
    return (
                currency !== "JPY" 
                || 
                (
                    currency === "JPY" 
                    && 
                    (
                        Number(blueSnapVs[0]) >= 3 
                        && Number(blueSnapVs[1]) >= 5
                    )
                )
            )
            &&
            freeTrial === "yes" })()) {
    vars.tax = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let result = vars.listPrices
return Intl.NumberFormat(`${vars.defaultLocale}`, { style: 'currency', currency: `${vars.currency}`, minimumFractionDigits: 2}).format(result[2])
 }, vars);
  }
  if ((() => { let freeTrial = vars.freeTrial
let currency = vars.currency
let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
    return (
                currency !== "JPY" 
                || 
                (
                    currency === "JPY" 
                    && 
                    (
                        Number(blueSnapVs[0]) >= 3 
                        && Number(blueSnapVs[1]) >= 5
                    )
                )
            )
            &&
            freeTrial === "yes" })()) {
    await expect(page.locator(`div.wc-order-data-row.wc-order-totals-items.wc-order-items-editable > table.wc-order-totals > tbody > tr:nth-of-type(2) > td.total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.tax ?? ''}`);
  }
  if ((() => { let checklogs = vars.checklogs
let currency = vars.currency
let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
    return (
                currency !== "JPY" 
                || 
                (
                    currency === "JPY" 
                    && 
                    (
                        Number(blueSnapVs[0]) >= 3 
                        && Number(blueSnapVs[1]) >= 5
                    )
                )
            )
            &&
            checklogs === "upgrade" })()) {
    vars.tax = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let result = vars.listPrices
return Intl.NumberFormat(`${vars.defaultLocale}`, { style: 'currency', currency: `${vars.currency}`, minimumFractionDigits: 2}).format(result[3])
 }, vars);
  }
  if ((() => { let checklogs = vars.checklogs
let currency = vars.currency
let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
    return (
                currency !== "JPY" 
                || 
                (
                    currency === "JPY" 
                    && 
                    (
                        Number(blueSnapVs[0]) >= 3 
                        && Number(blueSnapVs[1]) >= 5
                    )
                )
            )
            &&
            checklogs === "upgrade" })()) {
    await expect(page.locator(`div.wc-order-data-row.wc-order-totals-items.wc-order-items-editable > table.wc-order-totals > tbody >tr:nth-of-type(3) > td.total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.tax ?? ''}`);
  }
  if ((() => { let freeTrial = vars.freeTrial
let checklogs = vars.checklogs
let currency = vars.currency
let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
    return (
                currency !== "JPY" 
                || 
                (
                    currency === "JPY" 
                    && 
                    (
                        Number(blueSnapVs[0]) >= 3 
                        && Number(blueSnapVs[1]) >= 5
                    )
                )
            )
            &&
            freeTrial != "yes" && checklogs != "upgrade" })()) {
    vars.total = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let result = vars.listPrices
return Intl.NumberFormat(`${vars.defaultLocale}`, { style: 'currency', currency: `${vars.currency}`, minimumFractionDigits: 2}).format(result[5])
 }, vars);
  }
  if ((() => { let freeTrial = vars.freeTrial
let checklogs = vars.checklogs
let currency = vars.currency
let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
    return (
                currency !== "JPY" 
                || 
                (
                    currency === "JPY" 
                    && 
                    (
                        Number(blueSnapVs[0]) >= 3 
                        && Number(blueSnapVs[1]) >= 5
                    )
                )
            )
            &&
            freeTrial != "yes" && checklogs != "upgrade" })()) {
    await expect(page.locator(`tr:nth-of-type(5) > td.total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.total ?? ''}`);
  }
  if ((() => { let freeTrial = vars.freeTrial
let currency = vars.currency
let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
    return (
                currency !== "JPY" 
                || 
                (
                    currency === "JPY" 
                    && 
                    (
                        Number(blueSnapVs[0]) >= 3 
                        && Number(blueSnapVs[1]) >= 5
                    )
                )
            )
            &&
            freeTrial === "yes" })()) {
    vars.total = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let result = vars.listPrices
return Intl.NumberFormat(`${vars.defaultLocale}`, { style: 'currency', currency: `${vars.currency}`, minimumFractionDigits: 2}).format(result[3])
 }, vars);
  }
  if ((() => { let freeTrial = vars.freeTrial
let currency = vars.currency
let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
    return (
                currency !== "JPY" 
                || 
                (
                    currency === "JPY" 
                    && 
                    (
                        Number(blueSnapVs[0]) >= 3 
                        && Number(blueSnapVs[1]) >= 5
                    )
                )
            )
            &&
            freeTrial === "yes" })()) {
    await expect(page.locator(`div.wc-order-data-row.wc-order-totals-items.wc-order-items-editable > table.wc-order-totals > tbody > tr:nth-of-type(3) > td.total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.total ?? ''}`);
  }
  if ((() => { let checklogs = vars.checklogs
let currency = vars.currency
let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
    return (
                currency !== "JPY" 
                || 
                (
                    currency === "JPY" 
                    && 
                    (
                        Number(blueSnapVs[0]) >= 3 
                        && Number(blueSnapVs[1]) >= 5
                    )
                )
            )
            &&
            checklogs === "upgrade" })()) {
    vars.total = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let result = vars.listPrices
return Intl.NumberFormat(`${vars.defaultLocale}`, { style: 'currency', currency: `${vars.currency}`, minimumFractionDigits: 2}).format(result[4])
 }, vars);
  }
  if ((() => { let checklogs = vars.checklogs
let currency = vars.currency
let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
    return (
                currency !== "JPY" 
                || 
                (
                    currency === "JPY" 
                    && 
                    (
                        Number(blueSnapVs[0]) >= 3 
                        && Number(blueSnapVs[1]) >= 5
                    )
                )
            )
            &&
            checklogs === "upgrade" })()) {
    await expect(page.locator(`div.wc-order-data-row.wc-order-totals-items.wc-order-items-editable > table.wc-order-totals > tbody > tr:nth-of-type(4) > td.total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.total ?? ''}`);
  }
  if ((() => { let pay = vars.pay
let currency = vars.currency
let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
    return (
                currency !== "JPY" 
                || 
                (
                    currency === "JPY" 
                    && 
                    (
                        Number(blueSnapVs[0]) >= 3 
                        && Number(blueSnapVs[1]) >= 5
                    )
                )
            )
            &&
            pay != "later" })()) {
    await expect(page.locator(`.wc-order-data-row.wc-order-totals-items > table.wc-order-totals:nth-of-type(2) > tbody > tr:nth-of-type(1) > td.total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.total ?? ''}`);
  }
  if ((() => { let test = vars.test
let freeTrial = vars.freeTrial
let checklogs = vars.checklogs
let currency = vars.currency
let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
    return (
                currency !== "JPY" 
                || 
                (
                    currency === "JPY" 
                    && 
                    (
                        Number(blueSnapVs[0]) >= 3 
                        && Number(blueSnapVs[1]) >= 5
                    )
                )
            )
            &&
            test === "subscription" && freeTrial != "yes" && checklogs != "upgrade" })()) {
    vars.recurringTotal = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let result = vars.listPrices
return Intl.NumberFormat(`${vars.defaultLocale}`, { style: 'currency', currency: `${vars.currency}`, minimumFractionDigits: 2}).format(result[11])
 }, vars);
  }
  if ((() => { let freeTrial = vars.freeTrial
let test = vars.test
let currency = vars.currency
let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
    return (
                currency !== "JPY" 
                || 
                (
                    currency === "JPY" 
                    && 
                    (
                        Number(blueSnapVs[0]) >= 3 
                        && Number(blueSnapVs[1]) >= 5
                    )
                )
            )
            &&
            test === "subscription" && freeTrial === "yes" })()) {
    vars.recurringTotal = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let result = vars.listPrices
return Intl.NumberFormat(`${vars.defaultLocale}`, { style: 'currency', currency: `${vars.currency}`, minimumFractionDigits: 2}).format(result[9])
 }, vars);
  }
  if ((() => { let checklogs = vars.checklogs
let test = vars.test
let currency = vars.currency
let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
    return (
                currency !== "JPY" 
                || 
                (
                    currency === "JPY" 
                    && 
                    (
                        Number(blueSnapVs[0]) >= 3 
                        && Number(blueSnapVs[1]) >= 5
                    )
                )
            )
            &&
            test === "subscription" && checklogs === "upgrade" })()) {
    vars.recurringTotal = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let result = vars.listPrices
return Intl.NumberFormat(`${vars.defaultLocale}`, { style: 'currency', currency: `${vars.currency}`, minimumFractionDigits: 2}).format(result[10])
 }, vars);
  }
  if ((() => { let test = vars.test
let checklogs = vars.checklogs
let currency = vars.currency
let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
    return (
                currency !== "JPY" 
                || 
                (
                    currency === "JPY" 
                    && 
                    (
                        Number(blueSnapVs[0]) >= 3 
                        && Number(blueSnapVs[1]) >= 5
                    )
                )
            )
            &&
            test === "subscription" })()) {
    await expect(page.locator(`.amount > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.recurringTotal ?? ''}`);
  }
  if ((() => { let currency = vars.currency
let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
    return (
                currency !== "JPY" 
                || 
                (
                    currency === "JPY" 
                    && 
                    (
                        Number(blueSnapVs[0]) >= 3 
                        && Number(blueSnapVs[1]) >= 5
                    )
                )
            ) })()) {
    await verifyCurrencyOnRefund(page, vars);
  }
}

// GI: "verify currency on backend renew" (638500c8a67dec3a127fc87f)
export async function verifyCurrencyOnBackendRenew(page: Page, vars: Record<string, string> = {}): Promise<void> {
  if ((() => { let checklogs = vars.checklogs
let freeTrial = vars.freeTrial
let currency = vars.currency
let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
    return (
                currency !== "JPY" 
                || 
                (
                    currency === "JPY" 
                    && 
                    (
                        Number(blueSnapVs[0]) >= 3 
                        && Number(blueSnapVs[1]) >= 5
                    )
                )
            )
            &&checklogs != "upgrade" && freeTrial != "yes" && vars.includeTax === "no" })()) {
    vars.totalProd = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let result = vars.listPrices
return Intl.NumberFormat(`${vars.defaultLocale}`, { style: 'currency', currency: `${vars.currency}`, minimumFractionDigits: 2}).format(result[6])
 }, vars);
  }
  if ((() => { let checklogs = vars.checklogs
let freeTrial = vars.freeTrial
let currency = vars.currency
let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
    return (
                currency !== "JPY" 
                || 
                (
                    currency === "JPY" 
                    && 
                    (
                        Number(blueSnapVs[0]) >= 3 
                        && Number(blueSnapVs[1]) >= 5
                    )
                )
            )
            &&
            checklogs != "upgrade" && freeTrial != "yes" && vars.includeTax === "yes" })()) {
    vars.totalProd = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let result = vars.listPrices
let price = result[6]/1.1
return Intl.NumberFormat(`${vars.defaultLocale}`, { style: 'currency', currency: `${vars.currency}`, minimumFractionDigits: 2}).format(price)
 }, vars);
  }
  if ((() => { let freeTrial = vars.freeTrial
let currency = vars.currency
let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
    return (
                currency !== "JPY" 
                || 
                (
                    currency === "JPY" 
                    && 
                    (
                        Number(blueSnapVs[0]) >= 3 
                        && Number(blueSnapVs[1]) >= 5
                    )
                )
            )
            &&
            freeTrial === "yes" })()) {
    vars.totalProd = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let result = vars.listPrices
return Intl.NumberFormat(`${vars.defaultLocale}`, { style: 'currency', currency: `${vars.currency}`, minimumFractionDigits: 2}).format(result[4])
 }, vars);
  }
  if ((() => { let checklogs = vars.checklogs
let currency = vars.currency
let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
    return (
                currency !== "JPY" 
                || 
                (
                    currency === "JPY" 
                    && 
                    (
                        Number(blueSnapVs[0]) >= 3 
                        && Number(blueSnapVs[1]) >= 5
                    )
                )
            )
            && checklogs === "upgrade" })()) {
    vars.totalProd = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let result = vars.listPrices
return Intl.NumberFormat(`${vars.defaultLocale}`, { style: 'currency', currency: `${vars.currency}`, minimumFractionDigits: 2}).format(result[5])
 }, vars);
  }
  if ((() => { let currency = vars.currency
let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
    return (
                currency !== "JPY" 
                || 
                (
                    currency === "JPY" 
                    && 
                    (
                        Number(blueSnapVs[0]) >= 3 
                        && Number(blueSnapVs[1]) >= 5
                    )
                )
            ) })()) {
    await expect(page.locator(`td.item_cost > .view > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.totalProd ?? ''}`);
  }
  if ((() => { let checklogs = vars.checklogs
let freeTrial = vars.freeTrial
let currency = vars.currency
let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
    return (
                currency !== "JPY" 
                || 
                (
                    currency === "JPY" 
                    && 
                    (
                        Number(blueSnapVs[0]) >= 3 
                        && Number(blueSnapVs[1]) >= 5
                    )
                )
            )
            &&
            checklogs != "upgrade" && freeTrial != "yes" && vars.includeTax === "no" })()) {
    vars.totalProdWithDiscount = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let result = vars.listPrices
let price = result[6]-result[8]
return Intl.NumberFormat(`${vars.defaultLocale}`, { style: 'currency', currency: `${vars.currency}`, minimumFractionDigits: 2}).format(price)
 }, vars);
  }
  if ((() => { let checklogs = vars.checklogs
let freeTrial = vars.freeTrial
let currency = vars.currency
let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
    return (
                currency !== "JPY" 
                || 
                (
                    currency === "JPY" 
                    && 
                    (
                        Number(blueSnapVs[0]) >= 3 
                        && Number(blueSnapVs[1]) >= 5
                    )
                )
            )
            &&
            checklogs != "upgrade" && freeTrial != "yes" && vars.includeTax === "yes" })()) {
    vars.totalProdWithDiscount = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let result = vars.listPrices
let price = (result[6]/1.1)-(result[8]/1.1)
return Intl.NumberFormat(`${vars.defaultLocale}`, { style: 'currency', currency: `${vars.currency}`, minimumFractionDigits: 2}).format(price)
 }, vars);
  }
  if ((() => { let freeTrial = vars.freeTrial
let currency = vars.currency
let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
    return (
                currency !== "JPY" 
                || 
                (
                    currency === "JPY" 
                    && 
                    (
                        Number(blueSnapVs[0]) >= 3 
                        && Number(blueSnapVs[1]) >= 5
                    )
                )
            )
            &&
            freeTrial === "yes" })()) {
    vars.totalProdWithDiscount = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let result = vars.listPrices
let price = result[4]-result[6]
return Intl.NumberFormat(`${vars.defaultLocale}`, { style: 'currency', currency: `${vars.currency}`, minimumFractionDigits: 2}).format(price)
 }, vars);
  }
  if ((() => { let checklogs = vars.checklogs
let currency = vars.currency
let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
    return (
                currency !== "JPY" 
                || 
                (
                    currency === "JPY" 
                    && 
                    (
                        Number(blueSnapVs[0]) >= 3 
                        && Number(blueSnapVs[1]) >= 5
                    )
                )
            )
            &&
            checklogs === "upgrade" })()) {
    vars.totalProdWithDiscount = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let result = vars.listPrices
let price = result[5]-result[7]
return Intl.NumberFormat(`${vars.defaultLocale}`, { style: 'currency', currency: `${vars.currency}`, minimumFractionDigits: 2}).format(price)
 }, vars);
  }
  if ((() => { let currency = vars.currency
let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
    return (
                currency !== "JPY" 
                || 
                (
                    currency === "JPY" 
                    && 
                    (
                        Number(blueSnapVs[0]) >= 3 
                        && Number(blueSnapVs[1]) >= 5
                    )
                )
            )
            && 
            (
                vars.includeTax === "no"
                ||
                (vars.includeTax === "yes"
                && 
                (Number(blueSnapVs[0]) >= 3 && Number(blueSnapVs[1]) >= 2)) 
            ) })()) {
    await expect(page.locator(`td.line_cost > .view > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.totalProdWithDiscount ?? ''}`);
  }
  if ((() => { let checklogs = vars.checklogs
let freeTrial = vars.freeTrial
let currency = vars.currency
let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
    return (
                currency !== "JPY" 
                || 
                (
                    currency === "JPY" 
                    && 
                    (
                        Number(blueSnapVs[0]) >= 3 
                        && Number(blueSnapVs[1]) >= 5
                    )
                )
            )
            && checklogs != "upgrade" && freeTrial != "yes" && vars.includeTax === "no" })()) {
    vars.productTax = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let result = vars.listPrices
let price = (result[6]-result[8])*0.1
return Intl.NumberFormat(`${vars.defaultLocale}`, { style: 'currency', currency: `${vars.currency}`, minimumFractionDigits: 2}).format(price)
 }, vars);
  }
  if ((() => { let checklogs = vars.checklogs
let freeTrial = vars.freeTrial
let currency = vars.currency
let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
    return (
                currency !== "JPY" 
                || 
                (
                    currency === "JPY" 
                    && 
                    (
                        Number(blueSnapVs[0]) >= 3 
                        && Number(blueSnapVs[1]) >= 5
                    )
                )
            )
            &&
            checklogs != "upgrade" && freeTrial != "yes" && vars.includeTax === "yes" })()) {
    vars.productTax = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let result = vars.listPrices
let price = ((result[6]/1.1)-(result[8]/1.1))*0.1
return Intl.NumberFormat(`${vars.defaultLocale}`, { style: 'currency', currency: `${vars.currency}`, minimumFractionDigits: 2}).format(price)
 }, vars);
  }
  if ((() => { let freeTrial = vars.freeTrial
let currency = vars.currency
let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
    return (
                currency !== "JPY" 
                || 
                (
                    currency === "JPY" 
                    && 
                    (
                        Number(blueSnapVs[0]) >= 3 
                        && Number(blueSnapVs[1]) >= 5
                    )
                )
            )
            &&
            freeTrial === "yes" })()) {
    vars.productTax = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let result = vars.listPrices
let price = (result[4]-result[6])*0.1
return Intl.NumberFormat(`${vars.defaultLocale}`, { style: 'currency', currency: `${vars.currency}`, minimumFractionDigits: 2}).format(price)
 }, vars);
  }
  if ((() => { let checklogs = vars.checklogs
let currency = vars.currency
let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
    return (
                currency !== "JPY" 
                || 
                (
                    currency === "JPY" 
                    && 
                    (
                        Number(blueSnapVs[0]) >= 3 
                        && Number(blueSnapVs[1]) >= 5
                    )
                )
            )
            &&
            checklogs === "upgrade" })()) {
    vars.productTax = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let result = vars.listPrices
let price = (result[5]-result[7])*0.1
return Intl.NumberFormat(`${vars.defaultLocale}`, { style: 'currency', currency: `${vars.currency}`, minimumFractionDigits: 2}).format(price)
 }, vars);
  }
  if ((() => { let currency = vars.currency
let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
    return (
                currency !== "JPY" 
                || 
                (
                    currency === "JPY" 
                    && 
                    (
                        Number(blueSnapVs[0]) >= 3 
                        && Number(blueSnapVs[1]) >= 5
                    )
                )
            ) })()) {
    await expect(page.locator(`td.line_tax > .view > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.productTax ?? ''}`);
  }
  if ((() => { let checklogs = vars.checklogs
let freeTrial = vars.freeTrial
let currency = vars.currency
let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
    return (
                currency !== "JPY" 
                || 
                (
                    currency === "JPY" 
                    && 
                    (
                        Number(blueSnapVs[0]) >= 3 
                        && Number(blueSnapVs[1]) >= 5
                    )
                )
            )
            &&
            checklogs != "upgrade" && freeTrial != "yes" && vars.includeTax === "no" })()) {
    vars.discount = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let result = vars.listPrices
return Intl.NumberFormat(`${vars.defaultLocale}`, { style: 'currency', currency: `${vars.currency}`, minimumFractionDigits: 2}).format(result[8])
 }, vars);
  }
  if ((() => { let checklogs = vars.checklogs
let freeTrial = vars.freeTrial
let currency = vars.currency
let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
    return (
                currency !== "JPY" 
                || 
                (
                    currency === "JPY" 
                    && 
                    (
                        Number(blueSnapVs[0]) >= 3 
                        && Number(blueSnapVs[1]) >= 5
                    )
                )
            )
            &&
            checklogs != "upgrade" && freeTrial != "yes" && vars.includeTax === "yes" })()) {
    vars.discount = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let result = vars.listPrices
let price = result[8]/1.1
return Intl.NumberFormat(`${vars.defaultLocale}`, { style: 'currency', currency: `${vars.currency}`, minimumFractionDigits: 2}).format(price)
 }, vars);
  }
  if ((() => { let freeTrial = vars.freeTrial
let currency = vars.currency
let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
    return (
                currency !== "JPY" 
                || 
                (
                    currency === "JPY" 
                    && 
                    (
                        Number(blueSnapVs[0]) >= 3 
                        && Number(blueSnapVs[1]) >= 5
                    )
                )
            )
            &&
            freeTrial === "yes" })()) {
    vars.discount = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let result = vars.listPrices
return Intl.NumberFormat(`${vars.defaultLocale}`, { style: 'currency', currency: `${vars.currency}`, minimumFractionDigits: 2}).format(result[6])
 }, vars);
  }
  if ((() => { let checklogs = vars.checklogs
let currency = vars.currency
let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
    return (
                currency !== "JPY" 
                || 
                (
                    currency === "JPY" 
                    && 
                    (
                        Number(blueSnapVs[0]) >= 3 
                        && Number(blueSnapVs[1]) >= 5
                    )
                )
            )
            && checklogs === "upgrade" })()) {
    vars.discount = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let result = vars.listPrices
return Intl.NumberFormat(`${vars.defaultLocale}`, { style: 'currency', currency: `${vars.currency}`, minimumFractionDigits: 2}).format(result[7])
 }, vars);
  }
  if ((() => { let currency = vars.currency
let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
    return (
                currency !== "JPY" 
                || 
                (
                    currency === "JPY" 
                    && 
                    (
                        Number(blueSnapVs[0]) >= 3 
                        && Number(blueSnapVs[1]) >= 5
                    )
                )
            ) })()) {
    await expect(page.locator(`.wc-order-item-discount > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.discount ?? ''}`);
  }
  if ((() => { let checklogs = vars.checklogs
let freeTrial = vars.freeTrial
let currency = vars.currency
let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
    return (
                currency !== "JPY" 
                || 
                (
                    currency === "JPY" 
                    && 
                    (
                        Number(blueSnapVs[0]) >= 3 
                        && Number(blueSnapVs[1]) >= 5
                    )
                )
            )
            &&
            checklogs != "upgrade" && freeTrial != "yes" && vars.includeTax === "no" })()) {
    vars.shipping = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let result = vars.listPrices
return Intl.NumberFormat(`${vars.defaultLocale}`, { style: 'currency', currency: `${vars.currency}`, minimumFractionDigits: 2}).format(result[9])
 }, vars);
  }
  if ((() => { let checklogs = vars.checklogs
let freeTrial = vars.freeTrial
let currency = vars.currency
let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
    return (
                currency !== "JPY" 
                || 
                (
                    currency === "JPY" 
                    && 
                    (
                        Number(blueSnapVs[0]) >= 3 
                        && Number(blueSnapVs[1]) >= 5
                    )
                )
            )
            &&
            checklogs != "upgrade" && freeTrial != "yes" && vars.includeTax === "yes" })()) {
    vars.shipping = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let result = vars.listPrices
let price = result[9]/1.1
return Intl.NumberFormat(`${vars.defaultLocale}`, { style: 'currency', currency: `${vars.currency}`, minimumFractionDigits: 2}).format(price)
 }, vars);
  }
  if ((() => { let freeTrial = vars.freeTrial
let currency = vars.currency
let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
    return (
                currency !== "JPY" 
                || 
                (
                    currency === "JPY" 
                    && 
                    (
                        Number(blueSnapVs[0]) >= 3 
                        && Number(blueSnapVs[1]) >= 5
                    )
                )
            )
            &&
            freeTrial === "yes" })()) {
    vars.shipping = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let result = vars.listPrices
return Intl.NumberFormat(`${vars.defaultLocale}`, { style: 'currency', currency: `${vars.currency}`, minimumFractionDigits: 2}).format(result[7])
 }, vars);
  }
  if ((() => { let checklogs = vars.checklogs
let currency = vars.currency
let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
    return (
                currency !== "JPY" 
                || 
                (
                    currency === "JPY" 
                    && 
                    (
                        Number(blueSnapVs[0]) >= 3 
                        && Number(blueSnapVs[1]) >= 5
                    )
                )
            )
            &&
            checklogs === "upgrade" })()) {
    vars.shipping = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let result = vars.listPrices
return Intl.NumberFormat(`${vars.defaultLocale}`, { style: 'currency', currency: `${vars.currency}`, minimumFractionDigits: 2}).format(result[8])
 }, vars);
  }
  if ((() => { let checklogs = vars.checklogs
let freeTrial = vars.freeTrial
let currency = vars.currency
let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
    return (
                currency !== "JPY" 
                || 
                (
                    currency === "JPY" 
                    && 
                    (
                        Number(blueSnapVs[0]) >= 3 
                        && Number(blueSnapVs[1]) >= 5
                    )
                )
            )
            &&
            (
                (checklogs != "upgrade" && freeTrial != "yes" && vars.includeTax === "yes"
&& (Number(blueSnapVs[0]) >= 3 && Number(blueSnapVs[1]) >= 2)) || vars.includeTax === "no") })()) {
    await expect(page.locator(`tr.shipping > td.line_cost > .view > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.shipping ?? ''}`);
  }
  if ((() => { let checklogs = vars.checklogs
let freeTrial = vars.freeTrial
let currency = vars.currency
let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
    return (
                currency !== "JPY" 
                || 
                (
                    currency === "JPY" 
                    && 
                    (
                        Number(blueSnapVs[0]) >= 3 
                        && Number(blueSnapVs[1]) >= 5
                    )
                )
            )
            &&
            checklogs != "upgrade" && freeTrial != "yes" && vars.includeTax === "no" })()) {
    vars.shippingTax = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let result = vars.listPrices
let price = result[9]*0.1
return Intl.NumberFormat(`${vars.defaultCurr}`, { style: 'currency', currency: `${vars.currency}`, minimumFractionDigits: 2}).format(price)
 }, vars);
  }
  if ((() => { let checklogs = vars.checklogs
let freeTrial = vars.freeTrial
let currency = vars.currency
let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
    return (
                currency !== "JPY" 
                || 
                (
                    currency === "JPY" 
                    && 
                    (
                        Number(blueSnapVs[0]) >= 3 
                        && Number(blueSnapVs[1]) >= 5
                    )
                )
            )
            && checklogs != "upgrade" && freeTrial != "yes" && vars.includeTax === "yes" })()) {
    vars.shippingTax = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let result = vars.listPrices
let price = (result[9]/1.1)*0.1
return Intl.NumberFormat(`${vars.defaultLocale}`, { style: 'currency', currency: `${vars.currency}`, minimumFractionDigits: 2}).format(price)
 }, vars);
  }
  if ((() => { let freeTrial = vars.freeTrial
let currency = vars.currency
let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
    return (
                currency !== "JPY" 
                || 
                (
                    currency === "JPY" 
                    && 
                    (
                        Number(blueSnapVs[0]) >= 3 
                        && Number(blueSnapVs[1]) >= 5
                    )
                )
            )
            &&
            freeTrial === "yes" })()) {
    vars.shippingTax = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let result = vars.listPrices
let price = result[7]*0.1
return Intl.NumberFormat(`${vars.defaultLocale}`, { style: 'currency', currency: `${vars.currency}`, minimumFractionDigits: 2}).format(price)
 }, vars);
  }
  if ((() => { let checklogs = vars.checklogs
let currency = vars.currency
let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
    return (
                currency !== "JPY" 
                || 
                (
                    currency === "JPY" 
                    && 
                    (
                        Number(blueSnapVs[0]) >= 3 
                        && Number(blueSnapVs[1]) >= 5
                    )
                )
            )
            &&
            checklogs === "upgrade" })()) {
    vars.shippingTax = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let result = vars.listPrices
let price = result[8]*0.1
return Intl.NumberFormat(`${vars.defaultLocale}`, { style: 'currency', currency: `${vars.currency}`, minimumFractionDigits: 2}).format(price)
 }, vars);
  }
  if ((() => { let checklogs = vars.checklogs
let freeTrial = vars.freeTrial
let currency = vars.currency
let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
    return (
                currency !== "JPY" 
                || 
                (
                    currency === "JPY" 
                    && 
                    (
                        Number(blueSnapVs[0]) >= 3 
                        && Number(blueSnapVs[1]) >= 5
                    )
                )
            )
            &&
            (
                checklogs != "upgrade" && freeTrial != "yes"
&& (Number(blueSnapVs[0]) >= 3 && Number(blueSnapVs[1]) >= 2)
            ) })()) {
    await expect(page.locator(`tr.shipping > td.line_tax > .view > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.shippingTax ?? ''}`);
  }
  if ((() => { let checklogs = vars.checklogs
let freeTrial = vars.freeTrial
let currency = vars.currency
let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
    return (
                currency !== "JPY" 
                || 
                (
                    currency === "JPY" 
                    && 
                    (
                        Number(blueSnapVs[0]) >= 3 
                        && Number(blueSnapVs[1]) >= 5
                    )
                )
            )
            &&
            checklogs != "upgrade" && freeTrial != "yes" && vars.includeTax === "no" })()) {
    vars.subtotal = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let result = vars.listPrices
return Intl.NumberFormat(`${vars.defaultLocale}`, { style: 'currency', currency: `${vars.currency}`, minimumFractionDigits: 2}).format(result[7])
 }, vars);
  }
  if ((() => { let checklogs = vars.checklogs
let freeTrial = vars.freeTrial
let currency = vars.currency
let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
    return (
                currency !== "JPY" 
                || 
                (
                    currency === "JPY" 
                    && 
                    (
                        Number(blueSnapVs[0]) >= 3 
                        && Number(blueSnapVs[1]) >= 5
                    )
                )
            )
            &&
            checklogs != "upgrade" && freeTrial != "yes" && vars.includeTax === "yes" })()) {
    vars.subtotal = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let result = vars.listPrices
let price = result[7]/1.1
return Intl.NumberFormat(`${vars.defaultLocale}`, { style: 'currency', currency: `${vars.currency}`, minimumFractionDigits: 2}).format(price)
 }, vars);
  }
  if ((() => { let freeTrial = vars.freeTrial
let currency = vars.currency
let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
    return (
                currency !== "JPY" 
                || 
                (
                    currency === "JPY" 
                    && 
                    (
                        Number(blueSnapVs[0]) >= 3 
                        && Number(blueSnapVs[1]) >= 5
                    )
                )
            )
            && freeTrial === "yes" })()) {
    vars.subtotal = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let result = vars.listPrices
return Intl.NumberFormat(`${vars.defaultLocale}`, { style: 'currency', currency: `${vars.currency}`, minimumFractionDigits: 2}).format(result[5])
 }, vars);
  }
  if ((() => { let checklogs = vars.checklogs
let currency = vars.currency
let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
    return (
                currency !== "JPY" 
                || 
                (
                    currency === "JPY" 
                    && 
                    (
                        Number(blueSnapVs[0]) >= 3 
                        && Number(blueSnapVs[1]) >= 5
                    )
                )
            )
            && checklogs === "upgrade" })()) {
    vars.subtotal = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let result = vars.listPrices
return Intl.NumberFormat(`${vars.defaultLocale}`, { style: 'currency', currency: `${vars.currency}`, minimumFractionDigits: 2}).format(result[6])
 }, vars);
  }
  if ((() => { let currency = vars.currency
let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
    return (
                currency !== "JPY" 
                || 
                (
                    currency === "JPY" 
                    && 
                    (
                        Number(blueSnapVs[0]) >= 3 
                        && Number(blueSnapVs[1]) >= 5
                    )
                )
            ) })()) {
    await expect(page.locator(`table.wc-order-totals:nth-of-type(1) > tbody > tr:nth-of-type(1) > td.total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.subtotal ?? ''}`);
  }
  if ((() => { let currency = vars.currency
let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
    return (
                currency !== "JPY" 
                || 
                (
                    currency === "JPY" 
                    && 
                    (
                        Number(blueSnapVs[0]) >= 3 
                        && Number(blueSnapVs[1]) >= 5
                    )
                )
            )
            &&
            (
                (vars.includeTax === "yes"
&& (Number(blueSnapVs[0]) >= 3 && Number(blueSnapVs[1]) >= 2)) 
|| vars.includeTax === "no"
            ) })()) {
    await expect(page.locator(`.wc-order-data-row.wc-order-totals-items > table.wc-order-totals:nth-of-type(1) > tbody > tr:nth-of-type(2) > td.total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.discount ?? ''}`);
  }
  if ((() => { let currency = vars.currency
let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
    return (
                currency !== "JPY" 
                || 
                (
                    currency === "JPY" 
                    && 
                    (
                        Number(blueSnapVs[0]) >= 3 
                        && Number(blueSnapVs[1]) >= 5
                    )
                )
            )
            &&
            (
                (vars.includeTax === "yes"
&& (Number(blueSnapVs[0]) >= 3 && Number(blueSnapVs[1]) >= 2)) 
|| vars.includeTax === "no"
            ) })()) {
    await expect(page.locator(`.wc-order-data-row.wc-order-totals-items > table.wc-order-totals:nth-of-type(1) > tbody > tr:nth-of-type(3) > td.total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.shipping ?? ''}`);
  }
  if ((() => { let checklogs = vars.checklogs
let freeTrial = vars.freeTrial
let currency = vars.currency
let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
    return (
                currency !== "JPY" 
                || 
                (
                    currency === "JPY" 
                    && 
                    (
                        Number(blueSnapVs[0]) >= 3 
                        && Number(blueSnapVs[1]) >= 5
                    )
                )
            )
            &&
            checklogs != "upgrade" && freeTrial != "yes" })()) {
    vars.tax = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let result = vars.listPrices
return Intl.NumberFormat(`${vars.defaultLocale}`, { style: 'currency', currency: `${vars.currency}`, minimumFractionDigits: 2}).format(result[10])
 }, vars);
  }
  if ((() => { let freeTrial = vars.freeTrial
let currency = vars.currency
let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
    return (
                currency !== "JPY" 
                || 
                (
                    currency === "JPY" 
                    && 
                    (
                        Number(blueSnapVs[0]) >= 3 
                        && Number(blueSnapVs[1]) >= 5
                    )
                )
            )
            &&
            freeTrial === "yes" })()) {
    vars.tax = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let result = vars.listPrices
return Intl.NumberFormat(`${vars.defaultLocale}`, { style: 'currency', currency: `${vars.currency}`, minimumFractionDigits: 2}).format(result[8])
 }, vars);
  }
  if ((() => { let checklogs = vars.checklogs
let currency = vars.currency
let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
    return (
                currency !== "JPY" 
                || 
                (
                    currency === "JPY" 
                    && 
                    (
                        Number(blueSnapVs[0]) >= 3 
                        && Number(blueSnapVs[1]) >= 5
                    )
                )
            )
            &&
            checklogs === "upgrade" })()) {
    vars.tax = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let result = vars.listPrices
return Intl.NumberFormat(`${vars.defaultLocale}`, { style: 'currency', currency: `${vars.currency}`, minimumFractionDigits: 2}).format(result[9])
 }, vars);
  }
  if ((() => { let currency = vars.currency
let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
    return (
                currency !== "JPY" 
                || 
                (
                    currency === "JPY" 
                    && 
                    (
                        Number(blueSnapVs[0]) >= 3 
                        && Number(blueSnapVs[1]) >= 5
                    )
                )
            ) })()) {
    await expect(page.locator(`tr:nth-of-type(4) > td.total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.tax ?? ''}`);
  }
  if ((() => { let checklogs = vars.checklogs
let freeTrial = vars.freeTrial
let currency = vars.currency
let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
    return (
                currency !== "JPY" 
                || 
                (
                    currency === "JPY" 
                    && 
                    (
                        Number(blueSnapVs[0]) >= 3 
                        && Number(blueSnapVs[1]) >= 5
                    )
                )
            )
            &&
            checklogs != "upgrade" && freeTrial != "yes" })()) {
    vars.total = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let result = vars.listPrices
return Intl.NumberFormat(`${vars.defaultLocale}`, { style: 'currency', currency: `${vars.currency}`, minimumFractionDigits: 2}).format(result[11])
 }, vars);
  }
  if ((() => { let freeTrial = vars.freeTrial
let currency = vars.currency
let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
    return (
                currency !== "JPY" 
                || 
                (
                    currency === "JPY" 
                    && 
                    (
                        Number(blueSnapVs[0]) >= 3 
                        && Number(blueSnapVs[1]) >= 5
                    )
                )
            )
            &&
            freeTrial === "yes" })()) {
    vars.total = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let result = vars.listPrices
return Intl.NumberFormat(`${vars.defaultLocale}`, { style: 'currency', currency: `${vars.currency}`, minimumFractionDigits: 2}).format(result[9])
 }, vars);
  }
  if ((() => { let checklogs = vars.checklogs
let currency = vars.currency
let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
    return (
                currency !== "JPY" 
                || 
                (
                    currency === "JPY" 
                    && 
                    (
                        Number(blueSnapVs[0]) >= 3 
                        && Number(blueSnapVs[1]) >= 5
                    )
                )
            )
            &&
            checklogs === "upgrade" })()) {
    vars.total = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let result = vars.listPrices
return Intl.NumberFormat(`${vars.defaultLocale}`, { style: 'currency', currency: `${vars.currency}`, minimumFractionDigits: 2}).format(result[10])
 }, vars);
  }
  if ((() => { let currency = vars.currency
let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
    return (
                currency !== "JPY" 
                || 
                (
                    currency === "JPY" 
                    && 
                    (
                        Number(blueSnapVs[0]) >= 3 
                        && Number(blueSnapVs[1]) >= 5
                    )
                )
            ) })()) {
    await expect(page.locator(`tr:nth-of-type(5) > td.total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.total ?? ''}`);
  }
  if ((() => { let currency = vars.currency
let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
    return (
                currency !== "JPY" 
                || 
                (
                    currency === "JPY" 
                    && 
                    (
                        Number(blueSnapVs[0]) >= 3 
                        && Number(blueSnapVs[1]) >= 5
                    )
                )
            ) })()) {
    await expect(page.locator(`.wc-order-data-row.wc-order-totals-items > table.wc-order-totals:nth-of-type(2) > tbody > tr:nth-of-type(1) > td.total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.total ?? ''}`);
  }
  if ((() => { let currency = vars.currency
let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
    return (
                currency !== "JPY" 
                || 
                (
                    currency === "JPY" 
                    && 
                    (
                        Number(blueSnapVs[0]) >= 3 
                        && Number(blueSnapVs[1]) >= 5
                    )
                )
            ) })()) {
    await expect(page.locator(`tr:nth-of-type(1) .amount > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.total ?? ''}`);
  }
  if ((() => { let test = vars.test
let freeTrial = vars.freeTrial
let checklogs = vars.checklogs
let currency = vars.currency
let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
    return (
                currency !== "JPY" 
                || 
                (
                    currency === "JPY" 
                    && 
                    (
                        Number(blueSnapVs[0]) >= 3 
                        && Number(blueSnapVs[1]) >= 5
                    )
                )
            )
            &&
            test === "subscription" && freeTrial != "yes" && checklogs != "upgrade" })()) {
    vars.total = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let result = vars.listPrices
return Intl.NumberFormat(`${vars.defaultLocale}`, { style: 'currency', currency: `${vars.currency}`, minimumFractionDigits: 2}).format(result[5])
 }, vars);
  }
  if ((() => { let test = vars.test
let freeTrial = vars.freeTrial
let currency = vars.currency
let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
    return (
                currency !== "JPY" 
                || 
                (
                    currency === "JPY" 
                    && 
                    (
                        Number(blueSnapVs[0]) >= 3 
                        && Number(blueSnapVs[1]) >= 5
                    )
                )
            )
            &&
            test === "subscription" && freeTrial === "yes" })()) {
    vars.total = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let result = vars.listPrices
return Intl.NumberFormat(`${vars.defaultLocale}`, { style: 'currency', currency: `${vars.currency}`, minimumFractionDigits: 2}).format(result[3])
 }, vars);
  }
  if ((() => { let test = vars.test
let checklogs = vars.checklogs
let currency = vars.currency
let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
    return (
                currency !== "JPY" 
                || 
                (
                    currency === "JPY" 
                    && 
                    (
                        Number(blueSnapVs[0]) >= 3 
                        && Number(blueSnapVs[1]) >= 5
                    )
                )
            )
            &&
            test === "subscription" &&  checklogs === "upgrade" })()) {
    vars.total = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let result = vars.listPrices
return Intl.NumberFormat(`${vars.defaultLocale}`, { style: 'currency', currency: `${vars.currency}`, minimumFractionDigits: 2}).format(result[4])
 }, vars);
  }
  if ((() => { let test = vars.test
let checklogs = vars.checklogs
let currency = vars.currency
let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
    return (
                currency !== "JPY" 
                || 
                (
                    currency === "JPY" 
                    && 
                    (
                        Number(blueSnapVs[0]) >= 3 
                        && Number(blueSnapVs[1]) >= 5
                    )
                )
            )
            && test === "subscription" &&  checklogs != "upgrade" })()) {
    await expect(page.locator(`tr:nth-of-type(2) .amount > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.total ?? ''}`);
  }
  if ((() => { let currency = vars.currency
let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
    return (
                currency !== "JPY" 
                || 
                (
                    currency === "JPY" 
                    && 
                    (
                        Number(blueSnapVs[0]) >= 3 
                        && Number(blueSnapVs[1]) >= 5
                    )
                )
            ) })()) {
    await verifyCurrencyOnRefund(page, vars);
  }
}

// GI: "verify currency on backend subscription" (637be7a2d093ba490226963b)
export async function verifyCurrencyOnBackendSubscription(page: Page, vars: Record<string, string> = {}): Promise<void> {
  if ((() => { let checklogs = vars.checklogs
let freeTrial = vars.freeTrial
return checklogs != "upgrade" && freeTrial != "yes" && vars.includeTax === "no" })()) {
    vars.price = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let result = vars.listPrices
return Intl.NumberFormat(`${vars.defaultLocale}`, { style: 'currency', currency: `${vars.currency}`}).format(result[6])
 }, vars);
  }
  if ((() => { let checklogs = vars.checklogs
let freeTrial = vars.freeTrial
return checklogs != "upgrade" && freeTrial != "yes" && vars.includeTax === "yes" })()) {
    vars.price = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let result = vars.listPrices
let price = result[6]/1.1
return Intl.NumberFormat(`${vars.defaultLocale}`, { style: 'currency', currency: `${vars.currency}`}).format(price)
 }, vars);
  }
  if ((() => { let freeTrial = vars.freeTrial
return freeTrial === "yes" })()) {
    vars.price = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let result = vars.listPrices
return Intl.NumberFormat(`${vars.defaultLocale}`, { style: 'currency', currency: `${vars.currency}`}).format(result[4])
 }, vars);
  }
  if ((() => { let checklogs = vars.checklogs
return checklogs === "upgrade" })()) {
    vars.price = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let result = vars.listPrices
return Intl.NumberFormat(`${vars.defaultLocale}`, { style: 'currency', currency: `${vars.currency}`}).format(result[5])
 }, vars);
  }
  await expect(page.locator(`td.item_cost > .view > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.price ?? ''}`);
  if ((() => { let checklogs = vars.checklogs
let freeTrial = vars.freeTrial
return checklogs != "upgrade" && freeTrial != "yes" && vars.includeTax === "no" })()) {
    vars.priceWithDiscount = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let result = vars.listPrices
let price = result[6]-result[8]
return Intl.NumberFormat(`${vars.defaultLocale}`, { style: 'currency', currency: `${vars.currency}`}).format(price)
 }, vars);
  }
  if ((() => { let checklogs = vars.checklogs
let freeTrial = vars.freeTrial
let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
return checklogs != "upgrade" && freeTrial != "yes" && vars.includeTax === "yes" })()) {
    vars.priceWithDiscount = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let result = vars.listPrices
let price = (result[6]/1.1)-(result[8]/1.1)
return Intl.NumberFormat(`${vars.defaultLocale}`, { style: 'currency', currency: `${vars.currency}`}).format(price)
 }, vars);
  }
  if ((() => { let freeTrial = vars.freeTrial
return freeTrial === "yes" })()) {
    vars.priceWithDiscount = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let result = vars.listPrices
let price = result[4]-result[6]
return Intl.NumberFormat(`${vars.defaultLocale}`, { style: 'currency', currency: `${vars.currency}`}).format(price)
 }, vars);
  }
  if ((() => { let checklogs = vars.checklogs
return checklogs === "upgrade" })()) {
    vars.priceWithDiscount = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let result = vars.listPrices
let price = result[5]-result[7]
return Intl.NumberFormat(`${vars.defaultLocale}`, { style: 'currency', currency: `${vars.currency}`}).format(price)
 }, vars);
  }
  if ((() => { let test = vars.test
let checklogs = vars.checklogs
let freeTrial = vars.freeTrial
let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
return (vars.includeTax === "yes"
&& (Number(blueSnapVs[0]) >= 3 && Number(blueSnapVs[1]) >= 2)) 
|| vars.includeTax === "no" })()) {
    await expect(page.locator(`td.line_cost > .view > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.priceWithDiscount ?? ''}`);
  }
  if ((() => { let checklogs = vars.checklogs
let freeTrial = vars.freeTrial
return checklogs != "upgrade" && freeTrial != "yes" && vars.includeTax === "no" })()) {
    vars.productTax = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let result = vars.listPrices
let price = (result[6]-result[8])*0.1
return Intl.NumberFormat(`${vars.defaultLocale}`, { style: 'currency', currency: `${vars.currency}`}).format(price)
 }, vars);
  }
  if ((() => { let checklogs = vars.checklogs
let freeTrial = vars.freeTrial
return checklogs != "upgrade" && freeTrial != "yes" && vars.includeTax === "yes" })()) {
    vars.productTax = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let result = vars.listPrices
let price = ((result[6]/1.1)-(result[8]/1.1))*0.1
return Intl.NumberFormat(`${vars.defaultLocale}`, { style: 'currency', currency: `${vars.currency}`}).format(price)
 }, vars);
  }
  if ((() => { let freeTrial = vars.freeTrial
return freeTrial === "yes" })()) {
    vars.productTax = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let result = vars.listPrices
let price = (result[4]-result[6])*0.1
return Intl.NumberFormat(`${vars.defaultLocale}`, { style: 'currency', currency: `${vars.currency}`}).format(price)
 }, vars);
  }
  if ((() => { let checklogs = vars.checklogs
return checklogs === "upgrade" })()) {
    vars.productTax = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let result = vars.listPrices
let price = (result[5]-result[7])*0.1
return Intl.NumberFormat(`${vars.defaultLocale}`, { style: 'currency', currency: `${vars.currency}`}).format(price)
 }, vars);
  }
  await expect(page.locator(`td.line_tax > .view > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.productTax ?? ''}`);
  if ((() => { let checklogs = vars.checklogs
let freeTrial = vars.freeTrial
return checklogs != "upgrade" && freeTrial != "yes" && vars.includeTax === "no" })()) {
    vars.recurringDiscount = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let result = vars.listPrices
return Intl.NumberFormat(`${vars.defaultLocale}`, { style: 'currency', currency: `${vars.currency}`}).format(result[8])
 }, vars);
  }
  if ((() => { let checklogs = vars.checklogs
let freeTrial = vars.freeTrial
return checklogs != "upgrade" && freeTrial != "yes" && vars.includeTax === "yes" })()) {
    vars.recurringDiscount = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let result = vars.listPrices
let price = result[8]/1.1
return Intl.NumberFormat(`${vars.defaultLocale}`, { style: 'currency', currency: `${vars.currency}`}).format(price)
 }, vars);
  }
  if ((() => { let freeTrial = vars.freeTrial
return freeTrial === "yes" })()) {
    vars.recurringDiscount = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let result = vars.listPrices
return Intl.NumberFormat(`${vars.defaultLocale}`, { style: 'currency', currency: `${vars.currency}`}).format(result[6])
 }, vars);
  }
  if ((() => { let checklogs = vars.checklogs
return checklogs === "upgrade" })()) {
    vars.recurringDiscount = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let result = vars.listPrices
return Intl.NumberFormat(`${vars.defaultLocale}`, { style: 'currency', currency: `${vars.currency}`}).format(result[7])
 }, vars);
  }
  await expect(page.locator(`.wc-order-item-discount > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.recurringDiscount ?? ''}`);
  if ((() => { let checklogs = vars.checklogs
let freeTrial = vars.freeTrial
return checklogs != "upgrade" && freeTrial != "yes" && vars.includeTax === "no" })()) {
    vars.recurringShipping = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let result = vars.listPrices
return Intl.NumberFormat(`${vars.defaultLocale}`, { style: 'currency', currency: `${vars.currency}`}).format(result[9])
 }, vars);
  }
  if ((() => { let checklogs = vars.checklogs
let freeTrial = vars.freeTrial
return checklogs != "upgrade" && freeTrial != "yes" && vars.includeTax === "yes" })()) {
    vars.recurringShipping = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let result = vars.listPrices
let price = result[9]/1.1
return Intl.NumberFormat(`${vars.defaultLocale}`, { style: 'currency', currency: `${vars.currency}`}).format(price)
 }, vars);
  }
  if ((() => { let freeTrial = vars.freeTrial
return freeTrial === "yes" })()) {
    vars.recurringShipping = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let result = vars.listPrices
return Intl.NumberFormat(`${vars.defaultLocale}`, { style: 'currency', currency: `${vars.currency}`}).format(result[7])
 }, vars);
  }
  if ((() => { let checklogs = vars.checklogs
return checklogs === "upgrade" })()) {
    vars.recurringShipping = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let result = vars.listPrices
return Intl.NumberFormat(`${vars.defaultLocale}`, { style: 'currency', currency: `${vars.currency}`}).format(result[8])
 }, vars);
  }
  if ((() => { let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
return (vars.includeTax === "yes"
&& (Number(blueSnapVs[0]) >= 3 && Number(blueSnapVs[1]) >= 2)) 
|| vars.includeTax === "no" })()) {
    await expect(page.locator(`tr.shipping > td.line_cost > .view > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.recurringShipping ?? ''}`);
  }
  if ((() => { let checklogs = vars.checklogs
let freeTrial = vars.freeTrial
return checklogs != "upgrade" && freeTrial != "yes" && vars.includeTax === "no" })()) {
    vars.shippingTax = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let result = vars.listPrices
let price = result[9]*0.1
return Intl.NumberFormat(`${vars.defaultLocale}`, { style: 'currency', currency: `${vars.currency}`}).format(price)
 }, vars);
  }
  if ((() => { let checklogs = vars.checklogs
let freeTrial = vars.freeTrial
return checklogs != "upgrade" && freeTrial != "yes" && vars.includeTax === "yes" })()) {
    vars.shippingTax = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let result = vars.listPrices
let price = (result[9]/1.1)*0.1
return Intl.NumberFormat(`${vars.defaultLocale}`, { style: 'currency', currency: `${vars.currency}`}).format(price)
 }, vars);
  }
  if ((() => { let freeTrial = vars.freeTrial
return freeTrial === "yes" })()) {
    vars.shippingTax = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let result = vars.listPrices
let price = result[7]*0.1
return Intl.NumberFormat(`${vars.defaultLocale}`, { style: 'currency', currency: `${vars.currency}`}).format(price)
 }, vars);
  }
  if ((() => { let checklogs = vars.checklogs
return checklogs === "upgrade" })()) {
    vars.shippingTax = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let result = vars.listPrices
let price = result[8]*0.1
return Intl.NumberFormat(`${vars.defaultLocale}`, { style: 'currency', currency: `${vars.currency}`}).format(price)
 }, vars);
  }
  if ((() => { let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
return Number(blueSnapVs[0]) >= 3 && Number(blueSnapVs[1]) >= 2 })()) {
    await expect(page.locator(`tr.shipping > td.line_tax > .view > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.shippingTax ?? ''}`);
  }
  if ((() => { let checklogs = vars.checklogs
let freeTrial = vars.freeTrial
return checklogs != "upgrade" && freeTrial != "yes" && vars.includeTax === "no" })()) {
    vars.recurringSubtotal = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let result = vars.listPrices
return Intl.NumberFormat(`${vars.defaultLocale}`, { style: 'currency', currency: `${vars.currency}`}).format(result[7])
 }, vars);
  }
  if ((() => { let checklogs = vars.checklogs
let freeTrial = vars.freeTrial
return checklogs != "upgrade" && freeTrial != "yes" && vars.includeTax === "yes" })()) {
    vars.recurringSubtotal = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let result = vars.listPrices
let price = result[7]/1.1
return Intl.NumberFormat(`${vars.defaultLocale}`, { style: 'currency', currency: `${vars.currency}`}).format(price)
 }, vars);
  }
  if ((() => { let freeTrial = vars.freeTrial
return freeTrial === "yes" })()) {
    vars.recurringSubtotal = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let result = vars.listPrices
return Intl.NumberFormat(`${vars.defaultLocale}`, { style: 'currency', currency: `${vars.currency}`}).format(result[5])
 }, vars);
  }
  if ((() => { let checklogs = vars.checklogs
return checklogs === "upgrade" })()) {
    vars.recurringSubtotal = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let result = vars.listPrices
return Intl.NumberFormat(`${vars.defaultLocale}`, { style: 'currency', currency: `${vars.currency}`}).format(result[6])
 }, vars);
  }
  await expect(page.locator(`table.wc-order-totals:nth-of-type(1) > tbody > tr:nth-of-type(1) > td.total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.recurringSubtotal ?? ''}`);
  await expect(page.locator(`.wc-order-data-row.wc-order-totals-items > table.wc-order-totals:nth-of-type(1) > tbody > tr:nth-of-type(2) > td.total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.recurringDiscount ?? ''}`);
  if ((() => { let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
return (vars.includeTax === "yes"
&& (Number(blueSnapVs[0]) >= 3 && Number(blueSnapVs[1]) >= 2)) 
|| vars.includeTax === "no" })()) {
    await expect(page.locator(`.wc-order-data-row.wc-order-totals-items > table.wc-order-totals:nth-of-type(1) > tbody > tr:nth-of-type(3) > td.total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.recurringShipping ?? ''}`);
  }
  if ((() => { let checklogs = vars.checklogs
let freeTrial = vars.freeTrial
return checklogs != "upgrade" && freeTrial != "yes" })()) {
    vars.recurringTax = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let result = vars.listPrices
return Intl.NumberFormat(`${vars.defaultLocale}`, { style: 'currency', currency: `${vars.currency}`}).format(result[10])
 }, vars);
  }
  if ((() => { let freeTrial = vars.freeTrial
return freeTrial === "yes" })()) {
    vars.recurringTax = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let result = vars.listPrices
return Intl.NumberFormat(`${vars.defaultLocale}`, { style: 'currency', currency: `${vars.currency}`}).format(result[8])
 }, vars);
  }
  if ((() => { let checklogs = vars.checklogs
return checklogs === "upgrade" })()) {
    vars.recurringTax = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let result = vars.listPrices
return Intl.NumberFormat(`${vars.defaultLocale}`, { style: 'currency', currency: `${vars.currency}`}).format(result[9])
 }, vars);
  }
  await expect(page.locator(`tr:nth-of-type(4) > td.total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.recurringTax ?? ''}`);
  if ((() => { let checklogs = vars.checklogs
let freeTrial = vars.freeTrial
return checklogs != "upgrade" && freeTrial != "yes" })()) {
    vars.recurringTotal = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let result = vars.listPrices
return Intl.NumberFormat(`${vars.defaultLocale}`, { style: 'currency', currency: `${vars.currency}`}).format(result[11])
 }, vars);
  }
  if ((() => { let freeTrial = vars.freeTrial
return freeTrial === "yes" })()) {
    vars.recurringTotal = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let result = vars.listPrices
return Intl.NumberFormat(`${vars.defaultLocale}`, { style: 'currency', currency: `${vars.currency}`}).format(result[9])
 }, vars);
  }
  if ((() => { let checklogs = vars.checklogs
return checklogs === "upgrade" })()) {
    vars.recurringTotal = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let result = vars.listPrices
return Intl.NumberFormat(`${vars.defaultLocale}`, { style: 'currency', currency: `${vars.currency}`}).format(result[10])
 }, vars);
  }
  await expect(page.locator(`tr:nth-of-type(5) > td.total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.recurringTotal ?? ''}`);
  if ((() => { let test = vars.test
let checklogs = vars.checklogs
let freeTrial = vars.freeTrial
return test === "subscription" && checklogs != "upgrade" && freeTrial != "yes" })()) {
    vars.total = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let result = vars.listPrices
return Intl.NumberFormat(`${vars.defaultLocale}`, { style: 'currency', currency: `${vars.currency}`}).format(result[5])
 }, vars);
  }
  if ((() => { let test = vars.test
let freeTrial = vars.freeTrial
return test === "subscription" && freeTrial === "yes" })()) {
    vars.total = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let result = vars.listPrices
return Intl.NumberFormat(`${vars.defaultLocale}`, { style: 'currency', currency: `${vars.currency}`}).format(result[3])
 }, vars);
  }
  if ((() => { let test = vars.test
let checklogs = vars.checklogs
return test === "subscription" && checklogs === "upgrade" })()) {
    vars.total = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let result = vars.listPrices
return Intl.NumberFormat(`${vars.defaultLocale}`, { style: 'currency', currency: `${vars.currency}`}).format(result[4])
 }, vars);
  }
}

// GI: "Verify currency on mini-cart" (63601f59151ae3d9c525146d)
export async function verifyCurrencyOnMiniCart(page: Page, vars: Record<string, string> = {}): Promise<void> {
  if ((() => { let currency = vars.currency
return currency === "EUR" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); function compareNumbers(a, b) {
  return a - b;
}

let result = vars.resultEUR
let resultDefault = vars.resultDefault
let rate = vars.rate
let n = 0
let boolean = true
let boolean2 = true
let boolean3 = true
let boolean4
let price
let price2
let last = result.length-1
let lastTotal = 0

const isCurrencySymbol = (currentValue) => currentValue.endsWith(String.fromCharCode(160)+"€");
boolean2 = result.every(isCurrencySymbol);
console.log("boolean2 is "+boolean2);

while (result.length > n) {
    result[n] = result[n].replace(/[^0-9\,]+/g,"")
    result[n] = Number(result[n].replace(",","."))
    n++
}
result = result.sort(compareNumbers);
n = 0;
while (resultDefault.length > n) {
    resultDefault[n] = Number(resultDefault[n].replace(/[^0-9\.]+/g,""))
    n++
}
resultDefault = resultDefault.sort(compareNumbers);
n = 0;
if (result.length === resultDefault.length) {
    console.log("length is correct "+boolean3)
} else {
    boolean3 = false
    console.log("length is not correct "+boolean3)
}
while (last > n) {
        price = resultDefault[n]
        price = price * rate
        price = Number(price.toFixed(vars.decimals))
        lastTotal = lastTotal + price
        price2 = result[n]
        if (price != price2) {
            boolean = false
            console.log(n+" is "+boolean)
            break;
        } else {
            n++
        }
    }

boolean4 = lastTotal === result[last]
console.log("boolean4 is "+boolean4);

return boolean2 && boolean && boolean3 && boolean4 }, vars)).toBeTruthy();
  }
  if ((() => { let currency = vars.currency
return currency === "GBP" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); function compareNumbers(a, b) {
  return a - b;
}

let result = vars.resultEUR
let resultDefault = vars.resultDefault
let rate = vars.rate
let n = 0
let boolean = true
let boolean2 = true
let boolean3 = true
let boolean4
let price
let price2
let last = result.length-1
let lastTotal = 0

const isCurrencySymbol = (currentValue) => currentValue.startsWith(`${vars.symbol}`);
boolean2 = result.every(isCurrencySymbol);
console.log("boolean2 is "+boolean2);

while (result.length > n) {
    result[n] = Number(result[n].replace(/[^0-9\.]+/g,""))
    n++
}
result = result.sort(compareNumbers);
n = 0;
while (resultDefault.length > n) {
    resultDefault[n] = Number(resultDefault[n].replace(/[^0-9\.]+/g,""))
    n++
}
resultDefault = resultDefault.sort(compareNumbers);
n = 0;
if (result.length === resultDefault.length) {
    console.log("length is correct "+boolean3)
} else {
    boolean3 = false
    console.log("length is not correct "+boolean3)
}
while (last > n) {
        price = resultDefault[n]
        price = price * rate
        price = Number(price.toFixed(vars.decimals))
        lastTotal = lastTotal + price
        price2 = result[n]
        if (price != price2) {
            boolean = false
            console.log(n+" is "+boolean)
            break;
        } else {
            n++
        }
    }

boolean4 = lastTotal === result[last]
console.log("boolean4 is "+boolean4);

return boolean2 && boolean && boolean3 && boolean4 }, vars)).toBeTruthy();
  }
  if ((() => { let currency = vars.currency
return currency === "JPY" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); function compareNumbers(a, b) {
  return a - b;
}

let result = vars.resultEUR
let resultDefault = vars.resultDefault
let rate = vars.rate
let n = 0
let boolean = true
let boolean2 = true
let boolean3 = true
let boolean4
let price
let price2
let last = result.length-1
let lastTotal = 0

const isCurrencySymbol = (currentValue) => currentValue.startsWith(`${vars.symbol}`);
boolean2 = result.every(isCurrencySymbol);
console.log("boolean2 is "+boolean2);

while (result.length > n) {
    result[n] = Number(result[n].replace(/[^0-9]+/g,""))
    n++
}
result = result.sort(compareNumbers);
n = 0;
while (resultDefault.length > n) {
    resultDefault[n] = Number(resultDefault[n].replace(/[^0-9\.]+/g,""))
    n++
}
resultDefault = resultDefault.sort(compareNumbers);
n = 0;
if (result.length === resultDefault.length) {
    console.log("length is correct "+boolean3)
} else {
    boolean3 = false
    console.log("length is not correct "+boolean3)
}
while (last > n) {
        price = resultDefault[n]
        price = price * rate
        price = Number(price.toFixed(vars.decimals))
        lastTotal = lastTotal + price
        price2 = result[n]
        if (price != price2) {
            boolean = false
            console.log(n+" is "+boolean)
            break;
        } else {
            n++
        }
    }

boolean4 = lastTotal === result[last]
console.log("boolean4 is "+boolean4);

return boolean2 && boolean && boolean3 && boolean4 }, vars)).toBeTruthy();
  }
}

// GI: "verify currency on refund" (6452af88af1e488d25284065)
export async function verifyCurrencyOnRefund(page: Page, vars: Record<string, string> = {}): Promise<void> {
  if ((() => { let test = vars.test
return test === "full" })()) {
    vars.totalRefunded = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return Intl.NumberFormat(`${vars.defaultLocale}`, { style: 'currency', currency: `${vars.currency}`, minimumFractionDigits: 2}).format(0.00) }, vars);
  }
  if ((() => { let test = vars.test
return test === "full" })()) {
    await expect(page.locator(`.wc-order-data-row.wc-order-refund-items > table.wc-order-totals > tbody > tr:nth-of-type(2) > td.total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.totalRefunded ?? ''}`);
  }
  if ((() => { let test = vars.test
return test === "full" })()) {
    await expect(page.locator(`.wc-order-data-row.wc-order-refund-items > table.wc-order-totals > tbody > tr:nth-of-type(3) > td.total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.total ?? ''}`);
  }
  if ((() => { let test = vars.test
let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');

return test === "full" && blueSnapVs[0] >= 3 && blueSnapVs[1] >= 2 })()) {
    await expect(page.locator(`button[type="button"].button.button-primary.do-manual-refund > .wc-order-refund-amount > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.total ?? ''}`);
  }
  if ((() => { let test = vars.test
let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');

return test === "full" && blueSnapVs[0] >= 3 && blueSnapVs[1] >= 2 })()) {
    await expect(page.locator(`button[type="button"].button.button-primary.do-api-refund > .wc-order-refund-amount > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.total ?? ''}`);
  }
  if ((() => { let test = vars.test
return test === "partial" })()) {
    vars.totalRefunded = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return Intl.NumberFormat(`${vars.defaultLocale}`, { style: 'currency', currency: `${vars.currency}`, minimumFractionDigits: 2}).format(0.00) }, vars);
  }
  if ((() => { let test = vars.test
return test === "partial" })()) {
    await expect(page.locator(`.wc-order-data-row.wc-order-refund-items > table.wc-order-totals > tbody > tr:nth-of-type(2) > td.total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.totalRefunded ?? ''}`);
  }
  if ((() => { let test = vars.test
return test === "partial" })()) {
    await expect(page.locator(`.wc-order-data-row.wc-order-refund-items > table.wc-order-totals > tbody > tr:nth-of-type(3) > td.total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.total ?? ''}`);
  }
  if ((() => { let test = vars.test
return test === "partial" })()) {
    await expect(page.locator(`#refund_amount`).first()).toHaveText(`${vars.partialRefund ?? ''}`);
  }
  if ((() => { let test = vars.test
return test === "partial" })()) {
    vars.partialRefund = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let result = vars.partialRefund
return Intl.NumberFormat(`${vars.defaultLocale}`, { style: 'currency', currency: `${vars.currency}`}).format(result)
 }, vars);
  }
  if ((() => { let test = vars.test
return test === "partial" })()) {
    await expect(page.locator(`button[type="button"].button.button-primary.do-manual-refund > .wc-order-refund-amount > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.partialRefund ?? ''}`);
  }
  if ((() => { let test = vars.test
return test === "partial" })()) {
    await expect(page.locator(`button[type="button"].button.button-primary.do-api-refund > .wc-order-refund-amount > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.partialRefund ?? ''}`);
  }
}

// GI: "Verify currency on the After place order" (637b7006d093ba4902fa121c)
export async function verifyCurrencyOnTheAfterPlaceOrder(page: Page, vars: Record<string, string> = {}): Promise<void> {
  if ((() => { let test = vars.test
let includeTax = vars.includeTax
let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
const blog = vars.blog
return  (
            (blueSnapVs[0] >= 3 && blueSnapVs[1] >= 2 && !blog.includes('block'))
            ||
            (blueSnapVs[0] >= 3 && blueSnapVs[1] >= 5 && blog.includes('block'))
        ) })()) {
    await expect(page.locator(`td.woocommerce-table__product-total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.totalProd ?? ''}`);
  }
  await expect(page.locator(`tfoot > tr:nth-of-type(1) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.subtotal ?? ''}`);
  if ((() => { let freeTrial = vars.freeTrial
return freeTrial !="yes" })()) {
    await expect(page.locator(`tr:nth-of-type(2) > td > .woocommerce-Price-amount.amount`).first()).toContainText(`${vars.discount ?? ''}`);
  }
  if ((() => { let checklogs = vars.checklogs
let freeTrial = vars.freeTrial
let order = vars.order
let manualRenew = vars.manualRenew
let blueSnapVs = vars.BlueSnapVs
let includeTax = vars.includeTax
blueSnapVs = blueSnapVs.split('.');
return freeTrial !="yes" && checklogs != "upgrade" && 
        (
            (
                includeTax == "no"
                &&
                manualRenew !== "Yes"
                &&
                order != "fail"
            )
            ||
            (
                includeTax == "no"
                &&
                (manualRenew === "Yes" || order === "fail")
                &&
                blueSnapVs[0] >= 3 && blueSnapVs[1] >= 2
            )
            ||
            (
                includeTax == "yes" 
                && 
                blueSnapVs[0] >= 3 && blueSnapVs[1] >= 2
            )
        ) })()) {
    await expect(page.locator(`tr:nth-of-type(3) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.shipping ?? ''}`);
  }
  if ((() => { let checklogs = vars.checklogs
let freeTrial = vars.freeTrial
let manualRenew = vars.manualRenew
let blueSnapVs = vars.BlueSnapVs
let order = vars.order
blueSnapVs = blueSnapVs.split(".")
return  freeTrial !="yes" 
        && 
        checklogs != "upgrade" 
        && 
        vars.includeTax === "no"
        &&
        (
           (manualRenew != "Yes" && order !== "fail")
           ||
           (
               (manualRenew === "Yes" || order === "fail")
               &&
               blueSnapVs[0] >= 3 && blueSnapVs[1] >= 2
            )
        ) })()) {
    await expect(page.locator(`tr:nth-of-type(4) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.tax ?? ''}`);
  }
  if ((() => { let freeTrial = vars.freeTrial
return freeTrial === "yes" && vars.includeTax === "no" })()) {
    await expect(page.locator(`tr:nth-of-type(2) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.tax ?? ''}`);
  }
  if ((() => { let checklogs = vars.checklogs
return checklogs === "upgrade" && vars.includeTax === "no" })()) {
    await expect(page.locator(`tr:nth-of-type(3) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.tax ?? ''}`);
  }
  if (vars.includeTax === "yes") {
    await expect(page.locator(`small.includes_tax > span`).first()).toHaveText(`${vars.tax ?? ''}`);
  }
  if ((() => { let checklogs = vars.checklogs
return checklogs === "upgrade" && vars.includeTax === "no" })()) {
    await expect(page.locator(`tr:nth-of-type(5) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.total ?? ''}`);
  }
  if ((() => { let checklogs = vars.checklogs
return checklogs === "upgrade" && vars.includeTax === "yes" })()) {
    await expect(page.locator(`tr:nth-of-type(4) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.total ?? ''}`);
  }
  if ((() => { let checklogs = vars.checklogs
let freeTrial = vars.freeTrial
let manualRenew = vars.manualRenew
let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split(".")
return  freeTrial !="yes" 
        && 
        checklogs != "upgrade" 
        && 
        vars.includeTax === "no"
        &&
        (
           (manualRenew != "Yes" && vars.order !== "fail")
           ||
           (
               (manualRenew === "Yes" || vars.order === "fail")
               &&
               blueSnapVs[0] >= 3 && blueSnapVs[1] >= 2
            )
        ) })()) {
    await expect(page.locator(`tr:nth-of-type(6) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.total ?? ''}`);
  }
  if ((() => { let checklogs = vars.checklogs
let freeTrial = vars.freeTrial
return freeTrial !="yes" && checklogs != "upgrade" && vars.includeTax === "yes" })()) {
    await expect(page.locator(`tr:nth-of-type(5) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.total ?? ''}`);
  }
  if ((() => { let freeTrial = vars.freeTrial
return freeTrial === "yes" && vars.includeTax === "no" })()) {
    await expect(page.locator(`tr:nth-of-type(4) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.total ?? ''}`);
  }
  if ((() => { let freeTrial = vars.freeTrial
return freeTrial === "yes" && vars.includeTax === "yes" })()) {
    await expect(page.locator(`tr:nth-of-type(3) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.total ?? ''}`);
  }
  if ((() => { let test = vars.test
let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split(".")
let checklogs = vars.checklogs
return test === "subscription" })()) {
    await expect(page.locator(`td.subscription-total > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.recurringTotal ?? ''}`);
  }
}

// GI: "Verify currency on the After place order - not in use" (636a9bacad2d75f812a0a752)
export async function verifyCurrencyOnTheAfterPlaceOrderNotInUse(page: Page, vars: Record<string, string> = {}): Promise<void> {
  try {
    if ((() => { let currency = vars.currency
return currency === "EUR" })()) {
      expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); function compareNumbers(a, b) {
  return a - b;
}

let result = vars.resultEUR
let resultDefault = vars.resultDefault
let n = 0
let boolean = true
let boolean2 = true
let boolean3 = true
let price
let price2

const isCurrencySymbol = (currentValue) => currentValue.endsWith(String.fromCharCode(160)+`${vars.symbol}`);
boolean2 = result.every(isCurrencySymbol);
console.log("boolean2 is "+boolean2);

while (result.length > n) {
    result[n] = result[n].replace(/[^0-9\,]+/g,"")
    result[n] = Number(result[n].replace(",","."))
    n++
}
result = result.sort(compareNumbers);
n = 0;
while (resultDefault.length > n) {
    resultDefault[n] = result[n].replace(/[^0-9\,]+/g,"")
    resultDefault[n] = Number(result[n].replace(",","."))
    n++
}
resultDefault = resultDefault.sort(compareNumbers);
n = 0;
if (result.length === resultDefault.length) {
    console.log("length is correct "+boolean3)
} else {
    boolean3 = false
    console.log("length is not correct "+boolean3)
}
while (result.length > n) {
        price = resultDefault[n]
        price2 = result[n]
        if (price != price2) {
            boolean = false
            console.log(n+" is "+boolean)
            break;
        } else {
            n++
        }
    }    

return boolean2 && boolean && boolean3 }, vars)).toBeTruthy();
    }
  } catch { /* optional step: assertEval */ }
  try {
    if ((() => { let currency = vars.currency
return currency === "GBP" })()) {
      expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); function compareNumbers(a, b) {
  return a - b;
}

let result = vars.resultEUR
let resultDefault = vars.resultDefault
let n = 0
let boolean = true
let boolean2 = true
let boolean3 = true
let price
let price2

const isCurrencySymbol = (currentValue) => currentValue.startsWith(`${vars.symbol}`);
boolean2 = result.every(isCurrencySymbol);
console.log("boolean2 is "+boolean2);

while (result.length > n) {
    result[n] = Number(result[n].replace(/[^0-9\.]+/g,""))
    n++
}
result = result.sort(compareNumbers);
n = 0;
while (resultDefault.length > n) {
    resultDefault[n] = Number(resultDefault[n].replace(/[^0-9\.]+/g,""))
    n++
}
resultDefault = resultDefault.sort(compareNumbers);
n = 0;
if (result.length === resultDefault.length) {
    console.log("length is correct "+boolean3)
} else {
    boolean3 = false
    console.log("length is not correct "+boolean3)
}
while (result.length > n) {
        price = resultDefault[n]
        price2 = result[n]
        if (price != price2) {
            boolean = false
            console.log(n+" is "+boolean)
            break;
        } else {
            n++
        }
    }    

return boolean2 && boolean && boolean3 }, vars)).toBeTruthy();
    }
  } catch { /* optional step: assertEval */ }
  try {
    if ((() => { let currency = vars.currency
return currency === "JPY" })()) {
      expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); function compareNumbers(a, b) {
  return a - b;
}

let result = vars.resultEUR
let resultDefault = vars.resultDefault
let n = 0
let boolean = true
let boolean2 = true
let boolean3 = true
let price
let price2

const isCurrencySymbol = (currentValue) => currentValue.startsWith(`${vars.symbol}`);
boolean2 = result.every(isCurrencySymbol);
console.log("boolean2 is "+boolean2);

while (result.length > n) {
    result[n] = Number(result[n].replace(/[^0-9]+/g,""))
    n++
}
result = result.sort(compareNumbers);
n = 0;
while (resultDefault.length > n) {
    resultDefault[n] = Number(resultDefault[n].replace(/[^0-9]+/g,""))
    n++
}
resultDefault = resultDefault.sort(compareNumbers);
n = 0;
if (result.length === resultDefault.length) {
    console.log("length is correct "+boolean3)
} else {
    boolean3 = false
    console.log("length is not correct "+boolean3)
}
while (result.length > n) {
        price = resultDefault[n]
        price2 = result[n]
        if (price != price2) {
            boolean = false
            console.log(n+" is "+boolean)
            break;
        } else {
            n++
        }
    }    

return boolean2 && boolean && boolean3 }, vars)).toBeTruthy();
    }
  } catch { /* optional step: assertEval */ }
}

// GI: "Verify currency on the page" (630e5a9ecd380e119c7bcdea)
export async function verifyCurrencyOnThePage(page: Page, vars: Record<string, string> = {}): Promise<void> {
  if ((() => { let includeTax = vars.includeTax
let includeShipping = vars.includeShipping
let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
return  Number(blueSnapVs[0]) >= 3 && Number(blueSnapVs[1]) >= 5
        &&
        includeTax === "yes"
        &&
        includeShipping === 'yes' })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); function compareNumbers(a, b) {
    return a - b;
  }
  function convertCurrencyToNumber(currencyString, decimal = '') {
      // Remove non-numeric characters (except the decimal point and comma)
      const numericString = currencyString.replace(/[^0-9.,]/g, '');
      let numericValue;
      // Replace commas with dots (for consistency) and convert the numeric string to a JavaScript number
      if (decimal === ',') {
          numericValue = parseFloat(numericString.replace('.','').replace(',','.'));
      } else {
          numericValue = parseFloat(numericString.replace(',',''));
      }
      return numericValue;
  }
  
  let result = vars.resultEURShipping
  let resultDefault = vars.resultDefaultShipping
  let parts = vars.parts
  let defaultParts = vars.defaultParts
  let rate = vars.rate
  let n = 0
  let boolean = true
  let boolean2 = true
  let boolean3 = true
  let price
  let price2
  let curr = `${vars.curr}`
  let defaultCurr = `${vars.defaultCurr}`
  let isCurrencySymbol
  const symbol = parts.find(part => part.type === 'currency').value
  
  if (curr === "EUR") {
      isCurrencySymbol = (currentValue) => currentValue.endsWith(" " + symbol) || currentValue.endsWith(String.fromCharCode(160)+symbol);
  } else {
      isCurrencySymbol = (currentValue) => currentValue.startsWith(symbol);
  }
  boolean2 = result.every(isCurrencySymbol);
  console.log("boolean2 is "+boolean2);
  
  while (result.length > n) {
    if (curr === 'JPY') {
        result[n] = convertCurrencyToNumber(result[n])
    } else {
        result[n] = convertCurrencyToNumber(result[n], parts.find(part => part.type === 'decimal').value)
    }
    n++
  }
  result = result.sort(compareNumbers);
  
  n = 0;
  
  while (resultDefault.length > n) {
    if (defaultCurr === 'JPY') {
        resultDefault[n] = convertCurrencyToNumber(resultDefault[n])
    } else {
        resultDefault[n] = convertCurrencyToNumber(resultDefault[n], defaultParts.find(part => part.type === 'decimal').value)
    }
    n++
  }
  resultDefault = resultDefault.sort(compareNumbers);
  
  n = 0;
  if (result.length === resultDefault.length) {
      console.log("length is correct "+boolean3)
  } else {
      boolean3 = false
      console.log("length is not correct "+boolean3)
  }
  
  while (result.length > n) {
          price = resultDefault[n] / 1.1

          if ( curr === "JPY") {
              price = Math.round(price * rate)+Math.round((price*0.1) * rate)
          } else {
              price = (Math.round(price*rate*100)+Math.round((price*0.1)*rate*100))/100
          }
          
          price2 = result[n]
          
          
          if (price2 !== price) {
              boolean = false
              console.log("price is "+price)
              console.log("price2 is "+price2)
              console.log(n+" is "+boolean)
              break;
          } else {
              console.log(n + "price: "+ price + ", and price 2: "+price2)
              n++
          }
      }    
  
  return boolean2 && boolean && boolean3 }, vars)).toBeTruthy();
  }
  if ((() => { let includeTax = vars.includeTax
let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
return  Number(blueSnapVs[0]) >= 3 && Number(blueSnapVs[1]) >= 5
        &&
        includeTax === "yes" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); function compareNumbers(a, b) {
    return a - b;
  }
  function convertCurrencyToNumber(currencyString, decimal = '') {
      // Remove non-numeric characters (except the decimal point and comma)
      const numericString = currencyString.replace(/[^0-9.,]/g, '');
      let numericValue;
      // Replace commas with dots (for consistency) and convert the numeric string to a JavaScript number
      if (decimal === ',') {
          numericValue = parseFloat(numericString.replace('.','').replace(',','.'));
      } else {
          numericValue = parseFloat(numericString.replace(',',''));
      }
      return numericValue;
  }
  
  let result = vars.resultEUR
  let resultDefault = vars.resultDefault
  let parts = vars.parts
  let defaultParts = vars.defaultParts
  let rate = vars.rate
  let n = 0
  let boolean = true
  let boolean2 = true
  let boolean3 = true
  let price
  let price2
  let curr = `${vars.curr}`
  let defaultCurr = `${vars.defaultCurr}`
  let isCurrencySymbol
  const symbol = parts.find(part => part.type === 'currency').value
  
  if (curr === "EUR") {
      isCurrencySymbol = (currentValue) => currentValue.endsWith(" " + symbol) || currentValue.endsWith(String.fromCharCode(160)+symbol);
  } else {
      isCurrencySymbol = (currentValue) => currentValue.startsWith(symbol);
  }
  boolean2 = result.every(isCurrencySymbol);
  console.log("boolean2 is "+boolean2);
  
  while (result.length > n) {
    if (curr === 'JPY') {
        result[n] = convertCurrencyToNumber(result[n])
    } else {
        result[n] = convertCurrencyToNumber(result[n], parts.find(part => part.type === 'decimal').value)
    }
    n++
  }
  result = result.sort(compareNumbers);
  
  n = 0;
  
  while (resultDefault.length > n) {
    if (defaultCurr === 'JPY') {
        resultDefault[n] = convertCurrencyToNumber(resultDefault[n])
    } else {
        resultDefault[n] = convertCurrencyToNumber(resultDefault[n], defaultParts.find(part => part.type === 'decimal').value)
    }
    n++
  }
  resultDefault = resultDefault.sort(compareNumbers);
  
  n = 0;
  if (result.length === resultDefault.length) {
      console.log("length is correct "+boolean3)
  } else {
      boolean3 = false
      console.log("length is not correct "+boolean3)
  }
  
  while (result.length > n) {
          price = resultDefault[n]

          if ( curr === "JPY") {
              price = Math.round(price * rate)
          } else {
              price = Math.round(price * rate * 100) / 100
          }
          
          price2 = result[n]

          if (price2 !== price) {
              boolean = false
              console.log("price is "+price)
              console.log("price2 is "+price2)
              console.log(n+" is "+boolean)
              break;
          } else {
              console.log(n + "price: "+ price + ", and price 2: "+price2)
              n++
          }
      }    
  
  return boolean2 && boolean && boolean3 }, vars)).toBeTruthy();
  }
  if ((() => { let includeTax = vars.includeTax
let includeShipping = vars.includeShipping
let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
return  Number(blueSnapVs[0]) >= 3 && Number(blueSnapVs[1]) >= 5
        &&
        (includeTax === "no" || includeTax === "")
        &&
    includeShipping === 'yes' })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); function compareNumbers(a, b) {
    return a - b;
  }
  function convertCurrencyToNumber(currencyString, decimal = '') {
      // Remove non-numeric characters (except the decimal point and comma)
      const numericString = currencyString.replace(/[^0-9.,]/g, '');
      let numericValue;
      // Replace commas with dots (for consistency) and convert the numeric string to a JavaScript number
      if (decimal === ',') {
          numericValue = parseFloat(numericString.replace('.','').replace(',','.'));
      } else {
          numericValue = parseFloat(numericString.replace(',',''));
      }
      return numericValue;
  }
  
  let result = vars.resultEURShipping
  let resultDefault = vars.resultDefaultShipping
  let parts = vars.parts
  let defaultParts = vars.defaultParts
  let rate = vars.rate
  let n = 0
  let boolean = true
  let boolean2 = true
  let boolean3 = true
  let price
  let price2
  let curr = `${vars.curr}`
  let defaultCurr = `${vars.defaultCurr}`
  let isCurrencySymbol
  const symbol = parts.find(part => part.type === 'currency').value
  
  if (curr === "EUR") {
      isCurrencySymbol = (currentValue) => currentValue.endsWith(" " + symbol) || currentValue.endsWith(String.fromCharCode(160)+symbol);
  } else {
      isCurrencySymbol = (currentValue) => currentValue.startsWith(symbol);
  }
  boolean2 = result.every(isCurrencySymbol);
  console.log("boolean2 is "+boolean2);
  
  while (result.length > n) {
    if (curr === 'JPY') {
        result[n] = convertCurrencyToNumber(result[n])
    } else {
        result[n] = convertCurrencyToNumber(result[n], parts.find(part => part.type === 'decimal').value)
    }
    n++
  }
  result = result.sort(compareNumbers);
  
  n = 0;
  
  while (resultDefault.length > n) {
    if (defaultCurr === 'JPY') {
        resultDefault[n] = convertCurrencyToNumber(resultDefault[n])
    } else {
        resultDefault[n] = convertCurrencyToNumber(resultDefault[n], defaultParts.find(part => part.type === 'decimal').value)
    }
    n++
  }
  resultDefault = resultDefault.sort(compareNumbers);
  
  n = 0;
  if (result.length === resultDefault.length) {
      console.log("length is correct "+boolean3)
  } else {
      boolean3 = false
      console.log("length is not correct "+boolean3)
  }
  
  while (result.length > n) {
          price = resultDefault[n]
          
           if ( curr === "JPY") {
              price = Math.round(price * rate)
          } else {
              price = Math.round(price * rate * 100) / 100
          }
          price2 = result[n]
          
          if (price2 !== price) {
              boolean = false
              console.log("price is "+price)
              console.log("price2 is "+price2)
              console.log(n+" is "+boolean)
              break;
          } else {
              console.log(n + "price: "+ price + ", and price 2: "+price2)
              n++
          }
      }    
  
  return boolean2 && boolean && boolean3 }, vars)).toBeTruthy();
  }
  if ((() => { let includeTax = vars.includeTax
let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
return  Number(blueSnapVs[0]) >= 3 && Number(blueSnapVs[1]) >= 5
        &&
        (includeTax === "no" || includeTax === "") })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); function compareNumbers(a, b) {
    return a - b;
  }
  function convertCurrencyToNumber(currencyString, decimal = '') {
      // Remove non-numeric characters (except the decimal point and comma)
      const numericString = currencyString.replace(/[^0-9.,]/g, '');
      let numericValue;
      // Replace commas with dots (for consistency) and convert the numeric string to a JavaScript number
      if (decimal === ',') {
          numericValue = parseFloat(numericString.replace('.','').replace(',','.'));
      } else {
          numericValue = parseFloat(numericString.replace(',',''));
      }
      return numericValue;
  }
  
  let result = vars.resultEUR
  let resultDefault = vars.resultDefault
  let parts = vars.parts
  let defaultParts = vars.defaultParts
  let rate = vars.rate
  let n = 0
  let boolean = true
  let boolean2 = true
  let boolean3 = true
  let price
  let price2
  let curr = `${vars.curr}`
  let defaultCurr = `${vars.defaultCurr}`
  let isCurrencySymbol
  const symbol = parts.find(part => part.type === 'currency').value
  
  if (curr === "EUR") {
      isCurrencySymbol = (currentValue) => currentValue.endsWith(" " + symbol) || currentValue.endsWith(String.fromCharCode(160)+symbol);
  } else {
      isCurrencySymbol = (currentValue) => currentValue.startsWith(symbol);
  }
  boolean2 = result.every(isCurrencySymbol);
  console.log("boolean2 is "+boolean2);
  
  while (result.length > n) {
    if (curr === 'JPY') {
        result[n] = convertCurrencyToNumber(result[n])
    } else {
        result[n] = convertCurrencyToNumber(result[n], parts.find(part => part.type === 'decimal').value)
    }
    n++
  }
  result = result.sort(compareNumbers);
  
  n = 0;
  
  while (resultDefault.length > n) {
    if (defaultCurr === 'JPY') {
        resultDefault[n] = convertCurrencyToNumber(resultDefault[n])
    } else {
        resultDefault[n] = convertCurrencyToNumber(resultDefault[n], defaultParts.find(part => part.type === 'decimal').value)
    }
    n++
  }
  resultDefault = resultDefault.sort(compareNumbers);
  
  n = 0;
  if (result.length === resultDefault.length) {
      console.log("length is correct "+boolean3)
  } else {
      boolean3 = false
      console.log("length is not correct "+boolean3)
  }
  
  while (result.length > n) {
          price = resultDefault[n]

           if ( curr === "JPY") {
              price = Math.round(price * rate)
          } else {
              price = Math.round(price * rate * 100) / 100
          }
          price2 = result[n]
          
          if (price2 !== price) {
              boolean = false
              console.log("price is "+price)
              console.log("price2 is "+price2)
              console.log(n+" is "+boolean)
              break;
          } else {
              console.log(n + "price: "+ price + ", and price 2: "+price2)
              n++
          }
      }    
  
  return boolean2 && boolean && boolean3 }, vars)).toBeTruthy();
  }
}

// GI: "verify currency price from checkout page before paying" (6387657890342827367acc9c)
export async function verifyCurrencyPriceFromCheckoutPageBeforePaying(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await expect(page.locator(`tbody > tr > td.product-total > .woocommerce-Price-amount.amount`).or(page.locator(`div.wc-block-components-order-summary-item__total-price .wc-block-components-product-price__value`)).first()).toHaveText(`${vars.totalProd ?? ''}`);
  await expect(page.locator(`tfoot > tr:nth-of-type(1) > td > .woocommerce-Price-amount.amount`).or(page.locator(`.wp-block-woocommerce-checkout-order-summary-subtotal-block .wc-block-components-totals-item__value`)).first()).toHaveText(`${vars.subtotal ?? ''}`);
  if ((() => { let manualRenew = vars.manualRenew
let order = vars.order
let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');

return (manualRenew !== "Yes" && order !== "fail"
        (
            (manualRenew === "Yes" || order === "fail")
            &&
            blueSnapVs[0] >= 3 && blueSnapVs[1] >= 2
        ) })()) {
    await expect(page.locator(`label[for="shipping_method_0_flat_rate1"] > .woocommerce-Price-amount.amount > bdi`).or(page.locator(`.wc-block-components-totals-shipping .wc-block-components-totals-item__value`)).first()).toHaveText(`${vars.shipping ?? ''}`);
  }
  await expect(page.locator(`tr.cart-discount:nth-of-type(2) > td > .woocommerce-Price-amount.amount`).or(page.locator(`.wc-block-components-totals-discount .wc-block-components-totals-item__value`)).first()).toContainText(`${vars.discount ?? ''}`);
  if ((() => { let manualRenew = vars.manualRenew
let order = vars.order
let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');

return (manualRenew !== "Yes" && order !== "fail") ||
        (
            (manualRenew === "Yes" || order === "fail")
            &&
            (blueSnapVs[0] >= 3 && blueSnapVs[1] >= 2)
        ) })()) {
    await expect(page.locator(`tr.tax-rate:nth-of-type(4) > td > .woocommerce-Price-amount.amount`).or(page.locator(`.wc-block-components-totals-taxes .wc-block-components-totals-item__value`)).first()).toHaveText(`${vars.tax ?? ''}`);
  }
  if ((() => { let manualRenew = vars.manualRenew
let order = vars.order
let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');

return (manualRenew !== "Yes" && order !== "fail") ||
        (
            (manualRenew === "Yes" || order === "fail")
            &&
            (blueSnapVs[0] >= 3 && blueSnapVs[1] >= 2)
        ) })()) {
    await expect(page.locator(`strong > .woocommerce-Price-amount.amount > bdi`).or(page.locator(`.wc-block-components-totals-item .wc-block-components-totals-footer-item-tax-value`)).first()).toHaveText(`${vars.total ?? ''}`);
  }
}

// GI: "Verify decline transaction" (61deccb536bb62032a9993fe)
export async function verifyDeclineTransaction(page: Page, vars: Record<string, string> = {}): Promise<void> {
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[1].content.message[0].errorName === "GENERAL_PAYMENT_PROCESSING_ERROR" }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[1].content.message[0].code === "14002" }, vars)).toBeTruthy();
  if ((() => { let pay = vars.pay

return pay === "now" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[1].content.message[0].description === "Transaction creation could not be completed because of transaction processing failure: DECLINE - Default BlueSnapTestProcessor [DECLINE] message" }, vars)).toBeTruthy();
  }
  if ((() => { let pay = vars.pay

return pay === "later" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[1].content.message[0].description === "Transaction failed  because of payment processing failure.: DECLINE - Default BlueSnapTestProcessor [DECLINE] message" }, vars)).toBeTruthy();
  }
}

// GI: "verify Email - Admin and Customer" (62e7f24fe3896e4c0d11128a)
export async function verifyEmailAdminAndCustomer(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.playgroundsEmail = `${vars.email ?? ''}`;
  await playgroundsEmail(page, vars);
  vars.n = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let len = Array.from<any>(document.querySelectorAll<HTMLTableElement>("#body_content_inner > div:nth-of-type(1) > table > tfoot > tr > td.td"))
len = len.length -1
return len }, vars);
  await expect(page.locator(`iframe[srcdoc]`).first().contentFrame().locator(`#body_content_inner > div:nth-of-type(1) > table > tfoot > tr:nth-of-type(${vars.n ?? ''}) > td.td`).or(page.locator(`iframe[srcdoc]`).first().contentFrame().locator(`tbody > tr.order-totals-payment_method > td.td`)).or(page.locator(`iframe[srcdoc]`).first().contentFrame().locator(`tfoot > tr.order-totals-payment_method > td.td`)).first()).toContainText(`${vars.paymentMethodTitle ?? ''}`);
  if ((() => { let checklogs = vars.checklogs
let payment = vars.payment
return checklogs === "upgrade" })()) {
    vars.n2 = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let len = Array.from<any>(document.querySelectorAll<HTMLTableElement>("#body_content_inner > div:nth-of-type(3) > table > tfoot > tr > td.td"))
len = len.length -1
return len }, vars);
  }
  if ((() => { let checklogs = vars.checklogs
let payment = vars.payment
return checklogs === "upgrade" })()) {
    await expect(page.locator(`iframe[srcdoc]`).first().contentFrame().locator(`#body_content_inner > div:nth-of-type(3) > table > tfoot > tr:nth-of-type(${vars.n2 ?? ''}) > td.td`).or(page.locator(`iframe[srcdoc]`).first().contentFrame().locator(`tbody > tr.order-totals-payment_method > td.td`)).or(page.locator(`iframe[srcdoc]`).first().contentFrame().locator(`tfoot > tr.order-totals-payment_method > td.td`)).first()).toContainText(`${vars.paymentMethodTitle ?? ''}`);
  }
  if ((() => { let scenario = vars.scenario
let blueSnapVs = vars.BlueSnapVs
let freeTrial = vars.freeTrial
let currency = vars.currency
let checklogs = vars.checklogs
let renew = vars.renew
blueSnapVs = blueSnapVs.split('.');
return scenario === "multi-currency" &&
(
    (
        renew !== "yes" 
        && 
        freeTrial !== "yes"
    ) 
    || 
    (
        renew === "yes" 
        && 
        (Number(blueSnapVs[0]) >= 3 && Number(blueSnapVs[1]) >= 5)
    ) 
    ||
    (
        freeTrial === "yes" 
        && 
        ( 
            currency !== "JPY" 
            || 
            (
                currency === "JPY" 
                && 
                (Number(blueSnapVs[0]) >= 3 && Number(blueSnapVs[1]) >= 5)
            )
        )
    )
) })()) {
    await verifyCurrencyEmail(page, vars);
  }
  vars.playgroundsEmail = `qa@saucal.com`;
  if ((() => { let checklogs = vars.checklogs
let payment = vars.payment
return checklogs === "upgrade" })()) {
    vars.extraFilter = `subject: Subscription Switched (${vars.orderNumber ?? ''})`;
  }
  await page.goto(`${vars.startUrl ?? ''}`);
  await page.waitForLoadState('load');
  await playgroundsEmail(page, vars);
  await expect(page.locator(`iframe[srcdoc]`).first().contentFrame().locator(`tfoot > tr:nth-of-type(${vars.n ?? ''}) > td.td`).or(page.locator(`iframe[srcdoc]`).first().contentFrame().locator(`tbody > tr.order-totals-payment_method > td.td`)).or(page.locator(`iframe[srcdoc]`).first().contentFrame().locator(`tfoot > tr.order-totals-payment_method > td.td`)).first()).toContainText(`${vars.paymentMethodTitle ?? ''}`);
  if ((() => { let scenario = vars.scenario
let blueSnapVs = vars.BlueSnapVs
let freeTrial = vars.freeTrial
let currency = vars.currency
let checklogs = vars.checklogs
let renew = vars.renew
blueSnapVs = blueSnapVs.split('.');
return scenario === "multi-currency" &&
(
    (
        renew !== "yes" 
        && 
        freeTrial !== "yes"
    ) 
    || 
    (
        renew === "yes" 
        && 
        (Number(blueSnapVs[0]) >= 3 && Number(blueSnapVs[1]) >= 5)
    ) 
    ||
    (
        freeTrial === "yes" 
        && 
        ( 
            currency !== "JPY" 
            || 
            (
                currency === "JPY" 
                && 
                (Number(blueSnapVs[0]) >= 3 && Number(blueSnapVs[1]) >= 5)
            )
        )
    )
) })()) {
    await verifyCurrencyEmail(page, vars);
  }
  if ((() => { let checklogs = vars.checklogs
let payment = vars.payment
return checklogs === "upgrade" })()) {
    await expect(page.locator(`iframe[srcdoc]`).first().contentFrame().locator(`#body_content_inner > div:nth-of-type(3) > table > tfoot > tr:nth-of-type(${vars.n2 ?? ''}) > td.td`).or(page.locator(`iframe[srcdoc]`).first().contentFrame().locator(`tbody > tr.order-totals-payment_method > td.td`)).or(page.locator(`iframe[srcdoc]`).first().contentFrame().locator(`#body_content_inner > div:nth-of-type(3) > table > tfoot > tr.order-totals-payment_method > td.td`)).first()).toContainText(`${vars.paymentMethodTitle ?? ''}`);
  }
}

// GI: "verify Email - Only Admin" (62e81039cd380e119c4ad0fb)
export async function verifyEmailOnlyAdmin(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.playgroundsEmail = `qa@saucal.com`;
  await playgroundsEmail(page, vars);
  vars.n = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let len = Array.from<any>(document.querySelectorAll<HTMLTableRowElement>("tfoot > tr"))
len = len.length -1
return len }, vars);
  await expect(page.locator(`iframe[srcdoc]`).first().contentFrame().locator(`tfoot > tr:nth-of-type(${vars.n ?? ''}) > td.td`).or(page.locator(`iframe[srcdoc]`).first().contentFrame().locator(`tbody > tr.order-totals-payment_method > td.td`)).or(page.locator(`iframe[srcdoc]`).first().contentFrame().locator(`tfoot > tr.order-totals-payment_method > td.td`)).first()).toContainText(`${vars.paymentMethodTitle ?? ''}`);
}

// GI: "verify Email - only Customer" (62e8139ae3896e4c0d17b671)
export async function verifyEmailOnlyCustomer(page: Page, vars: Record<string, string> = {}): Promise<void> {
  await page.goto(`${vars.startUrl ?? ''}`);
  await page.waitForLoadState('load');
  vars.playgroundsEmail = `${vars.email ?? ''}`;
  await playgroundsEmail(page, vars);
  if ((() => { let test = vars.test
return test != "full" && test != "partial" })()) {
    vars.n = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let len = Array.from<any>(document.querySelectorAll<HTMLTableRowElement>("tfoot > tr"))
len = len.length -1
return len }, vars);
  }
  if ((() => { let test = vars.test
return test === "full" || test === "partial" })()) {
    vars.n = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let len = Array.from<any>(document.querySelectorAll<HTMLTableRowElement>("tfoot > tr"))
len = len.length -2
return len }, vars);
  }
  await expect(page.locator(`iframe[srcdoc]`).first().contentFrame().locator(`tfoot > tr:nth-of-type(${vars.n ?? ''}) > td.td`).or(page.locator(`iframe[srcdoc]`).first().contentFrame().locator(`tbody > tr.order-totals-payment_method > td.td`)).or(page.locator(`iframe[srcdoc]`).first().contentFrame().locator(`tfoot > tr.order-totals-payment_method > td.td`)).first()).toContainText(`${vars.paymentMethodTitle ?? ''}`);
  if ((() => { let scenario = vars.scenario
let test = vars.test
let blueSnapVs = vars.BlueSnapVs
let complete = vars.complete
blueSnapVs = blueSnapVs.split('.');

return scenario === "multi-currency" && 
    (
        (
            complete !== "yes" 
            && test !== "full" 
            && test !== "partial"
        ) ||
        (
           (Number(blueSnapVs[0]) >= 3 && Number(blueSnapVs[1]) >= 5) &&
           (
            complete === "yes" 
            || test === "full" 
            || test === "partial"
            )
        )
    ) })()) {
    await verifyCurrencyEmail(page, vars);
  }
}

// GI: "Verify logs /transactions" (60d091441da0a93062ee2260)
export async function verifyLogsTransactions(page: Page, vars: Record<string, string> = {}): Promise<void> {
  if ((() => { let auth = vars.auth
return auth != "only" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[0].content.cardTransactionType === "AUTH_CAPTURE" }, vars)).toBeTruthy();
  }
  if ((() => { let auth = vars.auth
return auth === "only" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[0].content.cardTransactionType === "AUTH_ONLY" }, vars)).toBeTruthy();
  }
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[0].method === "POST" }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[0].url === "https://sandbox.bluesnap.com/services/2/transactions" }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return Number(logs[0].content.amount) === vars.total }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[0].content.currency === "USD" }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[0].content.merchantTransactionId === Number(vars.orderNumber) }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[0].content.transactionFraudInfo.fraudSessionId !== "" }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[0].content.transactionFraudInfo.shopperIpAddress !== "" }, vars)).toBeTruthy();
  if ((() => { let user = vars.user
return user === "old" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
let vaulted = `${vars.vaultedShopperId}`
return logs[0].content.vaultedShopperId === vaulted }, vars)).toBeTruthy();
  }
  if ((() => { let user = vars.user
return user === "new" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[0].content.vaultedShopperId === "" }, vars)).toBeTruthy();
  }
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[0].content.softDescriptor === "BSTEST2-wpe" }, vars)).toBeTruthy();
  if ((() => { let useSavedCC = vars.useSavedCC
return useSavedCC === "no" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[0].content.cardHolderInfo.firstName === `${vars.firstName}` }, vars)).toBeTruthy();
  }
  if ((() => { let useSavedCC = vars.useSavedCC
return useSavedCC === "no" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[0].content.cardHolderInfo.lastName === `${vars.lastName}` }, vars)).toBeTruthy();
  }
  if ((() => { let useSavedCC = vars.useSavedCC
return useSavedCC === "no" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[0].content.cardHolderInfo.companyName === `${vars.company}` }, vars)).toBeTruthy();
  }
  if ((() => { let useSavedCC = vars.useSavedCC
return useSavedCC === "no" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[0].content.cardHolderInfo.email === `${vars.email}` }, vars)).toBeTruthy();
  }
  if ((() => { let useSavedCC = vars.useSavedCC
return useSavedCC === "no" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[0].content.cardHolderInfo.country === "US" }, vars)).toBeTruthy();
  }
  if ((() => { let useSavedCC = vars.useSavedCC
return useSavedCC === "no" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[0].content.cardHolderInfo.state === "FL" }, vars)).toBeTruthy();
  }
  if ((() => { let useSavedCC = vars.useSavedCC
return useSavedCC === "no" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[0].content.cardHolderInfo.address === `${vars.street}` }, vars)).toBeTruthy();
  }
  if ((() => { let useSavedCC = vars.useSavedCC
return useSavedCC === "no" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[0].content.cardHolderInfo.address2 === `${vars.address2}` }, vars)).toBeTruthy();
  }
  if ((() => { let useSavedCC = vars.useSavedCC
return useSavedCC === "no" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[0].content.cardHolderInfo.city === `${vars.city}` }, vars)).toBeTruthy();
  }
  if ((() => { let useSavedCC = vars.useSavedCC
return useSavedCC === "no" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[0].content.cardHolderInfo.zip === `${vars.zipCode}` }, vars)).toBeTruthy();
  }
  if ((() => { let useSavedCC = vars.useSavedCC
return useSavedCC === "no" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[0].content.pfToken === `${vars.pfToken}`  }, vars)).toBeTruthy();
  }
  if ((() => { let useSavedCC = vars.useSavedCC
return useSavedCC === "yes" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[0].content.creditCard.cardLastFourDigits === `${vars.fourDigits}` }, vars)).toBeTruthy();
  }
  if ((() => { let useSavedCC = vars.useSavedCC
return useSavedCC === "yes" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[0].content.creditCard.cardType === `${vars.ShortName}` }, vars)).toBeTruthy();
  }
  if ((() => { let saveCC = vars.saveCC
let useSavedCC = vars.useSavedCC
return saveCC === "no" &&  useSavedCC === "no" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[0].content.storeCard === false }, vars)).toBeTruthy();
  }
  if ((() => { let cc = vars['3ds']
let threeDS = vars['3dsSetting']
return cc === "2.0aW" && threeDS != "deactivated" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[0].content.threeDSecureReferenceId != "" }, vars)).toBeTruthy();
  }
  if ((() => { let cc = vars['3ds']
let threeDS = vars['3dsSetting']
return cc != "2.0aW" || threeDS === "deactivated" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[0].content.threeDSecureReferenceId === undefined }, vars)).toBeTruthy();
  }
  if ((() => { let saveCC = vars.saveCC
let useSavedCC = vars.useSavedCC
return saveCC === "yes" &&  useSavedCC === "no" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[0].content.storeCard === true }, vars)).toBeTruthy();
  }
  if ((() => { let auth = vars.auth
return auth != "only" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[1].content.cardTransactionType === "AUTH_CAPTURE" }, vars)).toBeTruthy();
  }
  if ((() => { let auth = vars.auth
return auth === "only" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[1].content.cardTransactionType === "AUTH_ONLY" }, vars)).toBeTruthy();
  }
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[1].content.merchantTransactionId === `${vars.orderNumber}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[1].content.transactionId === `${vars.transaction_id}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[1].content.softDescriptor === "BLS*BSTEST2-WPE" }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[1].content.amount === vars.total }, vars)).toBeTruthy();
  if ((() => { let useSavedCC = vars.useSavedCC
return useSavedCC === "no" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[1].content.cardHolderInfo.firstName === `${vars.firstName}` }, vars)).toBeTruthy();
  }
  if ((() => { let useSavedCC = vars.useSavedCC
return useSavedCC === "no" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[1].content.cardHolderInfo.lastName === `${vars.lastName}` }, vars)).toBeTruthy();
  }
  if ((() => { let useSavedCC = vars.useSavedCC
return useSavedCC === "no" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[1].content.cardHolderInfo.email === `${vars.email}` }, vars)).toBeTruthy();
  }
  if ((() => { let useSavedCC = vars.useSavedCC
return useSavedCC === "no" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[1].content.cardHolderInfo.country === "US" }, vars)).toBeTruthy();
  }
  if ((() => { let useSavedCC = vars.useSavedCC
return useSavedCC === "no" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[1].content.cardHolderInfo.state === "FL" }, vars)).toBeTruthy();
  }
  if ((() => { let useSavedCC = vars.useSavedCC
return useSavedCC === "no" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[1].content.cardHolderInfo.address === `${vars.street}` }, vars)).toBeTruthy();
  }
  if ((() => { let useSavedCC = vars.useSavedCC
return useSavedCC === "no" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[1].content.cardHolderInfo.city === `${vars.city}` }, vars)).toBeTruthy();
  }
  if ((() => { let useSavedCC = vars.useSavedCC
return useSavedCC === "no" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[1].content.cardHolderInfo.zip === `${vars.zipCode}` }, vars)).toBeTruthy();
  }
  if ((() => { let useSavedCC = vars.useSavedCC
return useSavedCC === "no" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[1].content.cardHolderInfo.companyName === `${vars.company}` }, vars)).toBeTruthy();
  }
  if ((() => { let user = vars.user
return user === "new" })()) {
    vars.vaultedShopperId = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[1].content.vaultedShopperId }, vars);
  }
  if ((() => { let user = vars.user
return user === "old" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[1].content.vaultedShopperId === vars.vaultedShopperId }, vars)).toBeTruthy();
  }
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[1].content.creditCard.cardLastFourDigits === `${vars.fourDigits}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[1].content.creditCard.cardType === `${vars.ShortName}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
const AE_month = Number(`${vars.month}`)
return logs[1].content.creditCard.expirationMonth === ""+AE_month+"" }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
const AE_year = "20"+`${vars.year}`
return logs[1].content.creditCard.expirationYear === AE_year }, vars)).toBeTruthy();
  if ((() => { let cc = vars['3ds']
let threeDSSetting = vars['3dsSetting']
return (cc != "1.0a" && cc != "2.0a" && cc != "2.0aW") && threeDSSetting != "deactivated" && useSavedCC === "no" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
const threeDS = "AUTHENTICATION_UNAVAILABLE"


return logs[1].content.threeDSecure.authenticationResult === threeDS }, vars)).toBeTruthy();
  }
  if ((() => { let cc = vars['3ds']
let threeDSSetting = vars['3dsSetting']
let useSavedCC = vars.useSavedCC
return (cc === "1.0a" || cc === "2.0a" || cc === "2.0aW") && threeDSSetting != "deactivated" && useSavedCC === "no" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
const threeDS = "AUTHENTICATION_SUCCEEDED"


return logs[1].content.threeDSecure.authenticationResult === threeDS }, vars)).toBeTruthy();
  }
  if ((() => { let threeDS = vars['3dsSetting']
let useSavedCC = vars.useSavedCC
return threeDS === "deactivated" || useSavedCC === "yes" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[1].content.threeDSecure === undefined }, vars)).toBeTruthy();
  }
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[1].content.processingInfo.processingStatus === "success" }, vars)).toBeTruthy();
}

// GI: "Verify logs /transactions - 2.6.x" (6241b2c1dbfd38bdb76806c8)
export async function verifyLogsTransactions26X(page: Page, vars: Record<string, string> = {}): Promise<void> {
  if ((() => { let auth = vars.auth
return auth != "only" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[0].content.cardTransactionType === "AUTH_CAPTURE" }, vars)).toBeTruthy();
  }
  if ((() => { let auth = vars.auth
return auth === "only" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[0].content.cardTransactionType === "AUTH_ONLY" }, vars)).toBeTruthy();
  }
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[0].method === "POST" }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[0].url === "https://sandbox.bluesnap.com/services/2/transactions" }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return Number(logs[0].content.amount) === vars.total }, vars)).toBeTruthy();
  if ((() => { let scenario = vars.scenario
return scenario != "multi-currency" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[0].content.currency === `${vars.defaultCurr}` }, vars)).toBeTruthy();
  }
  if ((() => { let scenario = vars.scenario
return scenario === "multi-currency" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[0].content.currency === `${vars.curr}` }, vars)).toBeTruthy();
  }
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[0].content.merchantTransactionId === Number(vars.orderNumber) }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[0].content.transactionFraudInfo.fraudSessionId !== "" }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[0].content.transactionFraudInfo.shopperIpAddress !== "" }, vars)).toBeTruthy();
  if ((() => { let user = vars.user
return user === "old" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
let vaulted = `${vars.vaultedShopperId}`
return logs[0].content.vaultedShopperId === vaulted }, vars)).toBeTruthy();
  }
  if ((() => { let user = vars.user
return user === "new" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[0].content.vaultedShopperId === "" }, vars)).toBeTruthy();
  }
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[0].content.softDescriptor === "BSTEST2-wpe" }, vars)).toBeTruthy();
  if ((() => { let useSavedCC = vars.useSavedCC
return useSavedCC === "no" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[0].content.cardHolderInfo.firstName === `${vars.firstName}` }, vars)).toBeTruthy();
  }
  if ((() => { let useSavedCC = vars.useSavedCC
return useSavedCC === "no" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[0].content.cardHolderInfo.lastName === `${vars.lastName}` }, vars)).toBeTruthy();
  }
  if ((() => { let useSavedCC = vars.useSavedCC
return useSavedCC === "no" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[0].content.cardHolderInfo.companyName === `${vars.company}` }, vars)).toBeTruthy();
  }
  if ((() => { let useSavedCC = vars.useSavedCC
return useSavedCC === "no" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[0].content.cardHolderInfo.email === `${vars.email}` }, vars)).toBeTruthy();
  }
  if ((() => { let useSavedCC = vars.useSavedCC
return useSavedCC === "no" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[0].content.cardHolderInfo.country === "US" }, vars)).toBeTruthy();
  }
  if ((() => { let useSavedCC = vars.useSavedCC
return useSavedCC === "no" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[0].content.cardHolderInfo.state === "FL" }, vars)).toBeTruthy();
  }
  if ((() => { let useSavedCC = vars.useSavedCC
return useSavedCC === "no" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[0].content.cardHolderInfo.address === `${vars.street}` }, vars)).toBeTruthy();
  }
  if ((() => { let useSavedCC = vars.useSavedCC
return useSavedCC === "no" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[0].content.cardHolderInfo.address2 === `${vars.address2}` }, vars)).toBeTruthy();
  }
  if ((() => { let useSavedCC = vars.useSavedCC
return useSavedCC === "no" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[0].content.cardHolderInfo.city === `${vars.city}` }, vars)).toBeTruthy();
  }
  if ((() => { let useSavedCC = vars.useSavedCC
return useSavedCC === "no" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[0].content.cardHolderInfo.zip === `${vars.zipCode}` }, vars)).toBeTruthy();
  }
  if ((() => { let useSavedCC = vars.useSavedCC
return useSavedCC === "no" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[0].content.pfToken === `${vars.pfToken}`  }, vars)).toBeTruthy();
  }
  if ((() => { let useSavedCC = vars.useSavedCC
return useSavedCC === "yes" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[0].content.creditCard.cardLastFourDigits === `${vars.fourDigits}` }, vars)).toBeTruthy();
  }
  if ((() => { let useSavedCC = vars.useSavedCC
return useSavedCC === "yes" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[0].content.creditCard.cardType === `${vars.ShortName}` }, vars)).toBeTruthy();
  }
  if ((() => { let threeDS = vars['3dsSetting']
let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');

return (
            (Number(blueSnapVs[0]) == 2 && Number(blueSnapVs[1]) == 6) 
            || Number(blueSnapVs[0]) >= 3
        ) && 
        threeDS != "deactivated" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[0].content.threeDSecure.threeDSecureReferenceId != "" }, vars)).toBeTruthy();
  }
  if ((() => { let threeDS = vars['3dsSetting']
let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');

return (
            Number(blueSnapVs[0]) == 2 && Number(blueSnapVs[1]) == 5 
        ) && 
        threeDS != "deactivated" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[0].content.threeDSecureReferenceId != "" }, vars)).toBeTruthy();
  }
  if ((() => { let threeDS = vars['3dsSetting']
let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');

return (
            (Number(blueSnapVs[0]) == 2 && Number(blueSnapVs[1]) == 6) 
            || Number(blueSnapVs[0]) >= 3
        ) && 
        threeDS === "deactivated" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[0].content.threeDSecure === undefined }, vars)).toBeTruthy();
  }
  if ((() => { let threeDS = vars['3dsSetting']
let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');

return (
            Number(blueSnapVs[0]) == 2 && Number(blueSnapVs[1]) == 5 
        ) && 
        threeDS === "deactivated" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[0].content.threeDSecureReferenceId === undefined }, vars)).toBeTruthy();
  }
  if ((() => { let saveCC = vars.saveCC
let useSavedCC = vars.useSavedCC
return (saveCC === "no" || saveCC === "disabled") &&  useSavedCC === "no" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[0].content.storeCard === false }, vars)).toBeTruthy();
  }
  if ((() => { let saveCC = vars.saveCC
let useSavedCC = vars.useSavedCC
return saveCC === "yes" &&  useSavedCC === "no" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[0].content.storeCard === true }, vars)).toBeTruthy();
  }
  if ((() => { let auth = vars.auth
return auth != "only" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[1].content.cardTransactionType === "AUTH_CAPTURE" }, vars)).toBeTruthy();
  }
  if ((() => { let auth = vars.auth
return auth === "only" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[1].content.cardTransactionType === "AUTH_ONLY" }, vars)).toBeTruthy();
  }
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[1].content.merchantTransactionId === `${vars.orderNumber}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[1].content.transactionId === `${vars.transaction_id}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[1].content.softDescriptor === "BLS*BSTEST2-WPE" || logs[1].content.softDescriptor === "BLS*BSTEST2-wpe" }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[1].content.amount === vars.total }, vars)).toBeTruthy();
  if ((() => { let useSavedCC = vars.useSavedCC
return useSavedCC === "no" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[1].content.cardHolderInfo.firstName === `${vars.firstName}` }, vars)).toBeTruthy();
  }
  if ((() => { let useSavedCC = vars.useSavedCC
return useSavedCC === "no" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[1].content.cardHolderInfo.lastName === `${vars.lastName}` }, vars)).toBeTruthy();
  }
  if ((() => { let useSavedCC = vars.useSavedCC
return useSavedCC === "no" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[1].content.cardHolderInfo.email === `${vars.email}` }, vars)).toBeTruthy();
  }
  if ((() => { let useSavedCC = vars.useSavedCC
return useSavedCC === "no" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[1].content.cardHolderInfo.country === "US" }, vars)).toBeTruthy();
  }
  if ((() => { let useSavedCC = vars.useSavedCC
return useSavedCC === "no" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[1].content.cardHolderInfo.state === "FL" }, vars)).toBeTruthy();
  }
  if ((() => { let useSavedCC = vars.useSavedCC
return useSavedCC === "no" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[1].content.cardHolderInfo.address === `${vars.street}` }, vars)).toBeTruthy();
  }
  if ((() => { let useSavedCC = vars.useSavedCC
return useSavedCC === "no" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[1].content.cardHolderInfo.city === `${vars.city}` }, vars)).toBeTruthy();
  }
  if ((() => { let useSavedCC = vars.useSavedCC
return useSavedCC === "no" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[1].content.cardHolderInfo.zip === `${vars.zipCode}` }, vars)).toBeTruthy();
  }
  if ((() => { let useSavedCC = vars.useSavedCC
return useSavedCC === "no" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[1].content.cardHolderInfo.companyName === `${vars.company}` }, vars)).toBeTruthy();
  }
  if ((() => { let user = vars.user
return user === "new" })()) {
    vars.vaultedShopperId = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[1].content.vaultedShopperId }, vars);
  }
  if ((() => { let user = vars.user
return user === "old" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[1].content.vaultedShopperId === vars.vaultedShopperId }, vars)).toBeTruthy();
  }
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[1].content.creditCard.cardLastFourDigits === `${vars.fourDigits}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[1].content.creditCard.cardType === `${vars.ShortName}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
const AE_month = Number(`${vars.month}`)
return logs[1].content.creditCard.expirationMonth === ""+AE_month+"" }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
const AE_year = "20"+`${vars.year}`
return logs[1].content.creditCard.expirationYear === AE_year }, vars)).toBeTruthy();
  if ((() => { let scenario = vars.scenario
return scenario != "multi-currency" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[1].content.currency === "USD" }, vars)).toBeTruthy();
  }
  if ((() => { let scenario = vars.scenario
return scenario === "multi-currency" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[1].content.currency === `${vars.currency}` }, vars)).toBeTruthy();
  }
  if ((() => { let scenario = vars.scenario
return scenario === "multi-currency" })()) {
    await calculateTotalUSD(page, vars);
  }
  if ((() => { let scenario = vars.scenario
return scenario === "multi-currency" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[1].content.usdAmount === vars.totalUSD }, vars)).toBeTruthy();
  }
  if ((() => { let cc = vars['3ds']
let threeDSSetting = vars['3dsSetting']
let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');

return (
            (Number(blueSnapVs[0]) == 2 && Number(blueSnapVs[1]) == 6) 
            || Number(blueSnapVs[0]) >= 3
        ) && (
            cc != "1.0a" && cc != "2.0a" && cc != "2.0aW"
            ) && threeDSSetting != "deactivated" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
const threeDS = "AUTHENTICATION_UNAVAILABLE"
return logs[1].content.threeDSecure.authenticationResult === threeDS }, vars)).toBeTruthy();
  }
  if ((() => { let cc = vars['3ds']
let threeDSSetting = vars['3dsSetting']
let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');

return (
            (Number(blueSnapVs[0]) == 2 && Number(blueSnapVs[1]) == 6) 
            || Number(blueSnapVs[0]) >= 3
        ) && (
            cc === "1.0a" || cc === "2.0a" || cc === "2.0aW"
            ) && threeDSSetting != "deactivated" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
const threeDS = "AUTHENTICATION_SUCCEEDED"
return logs[1].content.threeDSecure.authenticationResult === threeDS }, vars)).toBeTruthy();
  }
  if ((() => { let threeDS = vars['3dsSetting']
let useSavedCC = vars.useSavedCC
let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');

return threeDS === "deactivated" 
        || 
        (useSavedCC === "yes" 
        && Number(blueSnapVs[0]) == 2 && Number(blueSnapVs[1]) == 5) })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[1].content.threeDSecure === undefined }, vars)).toBeTruthy();
  }
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[1].content.processingInfo.processingStatus === "success" }, vars)).toBeTruthy();
}

// GI: "Verify logs T/R - AUTH_CAPTURE - Change PM" (620e59676428cd4cb32b564a)
export async function verifyLogsTRAUTHCAPTUREChangePM(page: Page, vars: Record<string, string> = {}): Promise<void> {
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.request.method === "PUT" }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.request.url === `https://sandbox.bluesnap.com/services/2/recurring/subscriptions/${vars.subsID}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.request.content.vaultedShopperId === `${vars.vaultedShopperId}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.vaultedShopperId === vars.vaultedShopperId }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.paymentSource.creditCardInfo.creditCard.cardLastFourDigits === `${vars.fourDigits}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.paymentSource.creditCardInfo.creditCard.cardType === `${vars.ShortName}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.paymentSource.creditCardInfo.creditCard.expirationMonth === `${vars.month}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
const AE_year = "20"+`${vars.year}`
return logs.response.paymentSource.creditCardInfo.creditCard.expirationYear === AE_year }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.request.content.paymentSource.creditCardInfo.billingContactInfo.firstName === `${vars.firstName}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.paymentSource.creditCardInfo.billingContactInfo.firstName === `${vars.firstName}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.request.content.paymentSource.creditCardInfo.billingContactInfo.lastName === `${vars.lastName}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.paymentSource.creditCardInfo.billingContactInfo.lastName === `${vars.lastName}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.request.content.paymentSource.creditCardInfo.billingContactInfo.companyName === `${vars.company}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.request.content.paymentSource.creditCardInfo.billingContactInfo.email === `${vars.email}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.request.content.paymentSource.creditCardInfo.billingContactInfo.country === "US" }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.paymentSource.creditCardInfo.billingContactInfo.country === "us" }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.request.content.paymentSource.creditCardInfo.billingContactInfo.state === "FL" }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.paymentSource.creditCardInfo.billingContactInfo.state === "FL" }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.request.content.paymentSource.creditCardInfo.billingContactInfo.address1 === `${vars.street}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.paymentSource.creditCardInfo.billingContactInfo.address1 === `${vars.street}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.request.content.paymentSource.creditCardInfo.billingContactInfo.address2 === `${vars.address2}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.request.content.paymentSource.creditCardInfo.billingContactInfo.city === `${vars.city}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.paymentSource.creditCardInfo.billingContactInfo.city === `${vars.city}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.request.content.paymentSource.creditCardInfo.billingContactInfo.zip === `${vars.zipCode}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.paymentSource.creditCardInfo.billingContactInfo.zip === `${vars.zipCode}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.subscriptionId === vars.subsID }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.vaultedShopperId === vars.vaultedShopperId }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.status === "ACTIVE" }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.currency === "USD" }, vars)).toBeTruthy();
  try {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.softDescriptor === "BLS*BSTEST2-wpe" }, vars)).toBeTruthy();
  } catch { /* optional step: assertEval */ }
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.chargeFrequency === "ONDEMAND" }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.autoRenew === true }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.overrideInitialChargeAmount === vars.totalOld }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.payerInfo.firstName === `${vars.firstName}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.payerInfo.lastName === `${vars.lastName}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.payerInfo.email === `${vars.email}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.payerInfo.country === "us" }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.payerInfo.state === "FL" }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.payerInfo.address === `${vars.street}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.payerInfo.city === `${vars.city}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.payerInfo.zip === `${vars.zipCode}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.scheduled === true }, vars)).toBeTruthy();
}

// GI: "Verify logs T/R - AUTH_CAPTURE - Change PM - 2.6.x" (622f395faacde4b9871501c2)
export async function verifyLogsTRAUTHCAPTUREChangePM26X(page: Page, vars: Record<string, string> = {}): Promise<void> {
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.request.method === "PUT" }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.request.url === `https://sandbox.bluesnap.com/services/2/recurring/subscriptions/${vars.subsID}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.request.content.vaultedShopperId === `${vars.vaultedShopperId}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.vaultedShopperId === vars.vaultedShopperId }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.paymentSource.creditCardInfo.creditCard.cardLastFourDigits === `${vars.fourDigits}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.paymentSource.creditCardInfo.creditCard.cardType === `${vars.ShortName}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.paymentSource.creditCardInfo.creditCard.expirationMonth === `${vars.month}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
const AE_year = "20"+`${vars.year}`
return logs.response.paymentSource.creditCardInfo.creditCard.expirationYear === AE_year }, vars)).toBeTruthy();
  if ((() => { let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
return (Number(blueSnapVs[0]) == 2 && Number(blueSnapVs[1]) == 6) || Number(blueSnapVs[0]) >= 3 })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.request.content.threeDSecure.threeDSecureReferenceId != "" }, vars)).toBeTruthy();
  }
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.request.content.paymentSource.creditCardInfo.billingContactInfo.firstName === `${vars.firstName}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.paymentSource.creditCardInfo.billingContactInfo.firstName === `${vars.firstName}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.request.content.paymentSource.creditCardInfo.billingContactInfo.lastName === `${vars.lastName}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.paymentSource.creditCardInfo.billingContactInfo.lastName === `${vars.lastName}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.request.content.paymentSource.creditCardInfo.billingContactInfo.companyName === `${vars.company}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.request.content.paymentSource.creditCardInfo.billingContactInfo.email === `${vars.email}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.request.content.paymentSource.creditCardInfo.billingContactInfo.country === "US" }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.paymentSource.creditCardInfo.billingContactInfo.country === "us" }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.request.content.paymentSource.creditCardInfo.billingContactInfo.state === "FL" }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.paymentSource.creditCardInfo.billingContactInfo.state === "FL" }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.request.content.paymentSource.creditCardInfo.billingContactInfo.address1 === `${vars.street}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.paymentSource.creditCardInfo.billingContactInfo.address1 === `${vars.street}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.request.content.paymentSource.creditCardInfo.billingContactInfo.address2 === `${vars.address2}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.request.content.paymentSource.creditCardInfo.billingContactInfo.city === `${vars.city}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.paymentSource.creditCardInfo.billingContactInfo.city === `${vars.city}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.request.content.paymentSource.creditCardInfo.billingContactInfo.zip === `${vars.zipCode}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.paymentSource.creditCardInfo.billingContactInfo.zip === `${vars.zipCode}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.subscriptionId === vars.subsID }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.vaultedShopperId === vars.vaultedShopperId }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.status === "ACTIVE" }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.currency === "USD" }, vars)).toBeTruthy();
  try {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.softDescriptor === "BLS*BSTEST2-wpe" }, vars)).toBeTruthy();
  } catch { /* optional step: assertEval */ }
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.chargeFrequency === "ONDEMAND" }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.autoRenew === true }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.overrideInitialChargeAmount === vars.totalOld }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.payerInfo.firstName === `${vars.firstName}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.payerInfo.lastName === `${vars.lastName}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.payerInfo.email === `${vars.email}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.payerInfo.country === "us" }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.payerInfo.state === "FL" }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.payerInfo.address === `${vars.street}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.payerInfo.city === `${vars.city}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.payerInfo.zip === `${vars.zipCode}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.scheduled === true }, vars)).toBeTruthy();
}

// GI: "Verify logs T/R - AUTH_CAPTURE - PreORder upon release complete" (620bec396428cd4cb36d3dd7)
export async function verifyLogsTRAUTHCAPTUREPreORderUponReleaseComplete(page: Page, vars: Record<string, string> = {}): Promise<void> {
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.request.method === "PUT" }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.request.url === `https://sandbox.bluesnap.com/services/2/recurring/subscriptions/${vars.subsID}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.request.content.status === "CANCELED" }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.vaultedShopperId === vars.vaultedShopperId }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.paymentSource.creditCardInfo.creditCard.cardLastFourDigits === `${vars.fourDigits}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.paymentSource.creditCardInfo.creditCard.cardType === `${vars.ShortName}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.paymentSource.creditCardInfo.creditCard.expirationMonth === `${vars.month}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
const AE_year = "20"+`${vars.year}`
return logs.response.paymentSource.creditCardInfo.creditCard.expirationYear === AE_year }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.paymentSource.creditCardInfo.billingContactInfo.firstName === `${vars.firstName}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.paymentSource.creditCardInfo.billingContactInfo.lastName === `${vars.lastName}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.paymentSource.creditCardInfo.billingContactInfo.country === "us" }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.paymentSource.creditCardInfo.billingContactInfo.state === "FL" }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.paymentSource.creditCardInfo.billingContactInfo.address1 === `${vars.street}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.paymentSource.creditCardInfo.billingContactInfo.city === `${vars.city}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.paymentSource.creditCardInfo.billingContactInfo.zip === `${vars.zipCode}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.subscriptionId === vars.subsID }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.vaultedShopperId === vars.vaultedShopperId }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.status === "CANCELED" }, vars)).toBeTruthy();
  if ((() => { let scenario = vars.scenario
return scenario != "multi-currency" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.currency === "USD" }, vars)).toBeTruthy();
  }
  if ((() => { let scenario = vars.scenario
return scenario === "multi-currency" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.currency === `${vars.currency}` }, vars)).toBeTruthy();
  }
  try {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.softDescriptor === "BLS*BSTEST2-wpe" }, vars)).toBeTruthy();
  } catch { /* optional step: assertEval */ }
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.chargeFrequency === "ONDEMAND" }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.autoRenew === true }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.payerInfo.firstName === `${vars.firstName}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.payerInfo.lastName === `${vars.lastName}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.payerInfo.email === `${vars.email}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.payerInfo.country === "us" }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.payerInfo.state === "FL" }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.payerInfo.address === `${vars.street}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.payerInfo.city === `${vars.city}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.payerInfo.zip === `${vars.zipCode}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.scheduled === false }, vars)).toBeTruthy();
}

// GI: "Verify logs T/R - AUTH_CAPTURE - Refund" (61fd1f259fa735249fe0d362)
export async function verifyLogsTRAUTHCAPTURERefund(page: Page, vars: Record<string, string> = {}): Promise<void> {
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.request.method === "PUT" }, vars)).toBeTruthy();
  if ((() => { let test = vars.test
let currency = vars.currency
let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
return  (
            currency !== "JPY" 
            || 
            (
                currency === "JPY" 
                && 
                (
                    Number(blueSnapVs[0]) >= 3 
                    && 
                    Number(blueSnapVs[1]) >= 5
                )
            )
        ) 
        &&
        test === "partial" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
let partialRefund = vars.partialRefund
partialRefund = partialRefund.toFixed(2)
return logs.request.url === `https://sandbox.bluesnap.com/services/2/transactions/${vars.transaction_id}/refund?reason=wc_reason:${vars.testID}&cancelsubscriptions=false&amount=`+partialRefund }, vars)).toBeTruthy();
  }
  if ((() => { let test = vars.test
let currency = vars.currency
let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
return  (
            (currency !== "JPY" && currency !== "GBP") 
            ||
            (currency === "JPY" && (
                    Number(blueSnapVs[0]) >= 3 
                    && 
                    Number(blueSnapVs[1]) >= 5
                )
            ||
            (currency === "GBP" && (
                    Number(blueSnapVs[0]) == 3 
                    && 
                    Number(blueSnapVs[1]) >= 2)
                )
        )
        && 
        test != "partial" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.request.url === `https://sandbox.bluesnap.com/services/2/transactions/${vars.transaction_id}/refund?reason=wc_reason:${vars.testID}&cancelsubscriptions=false` }, vars)).toBeTruthy();
  }
  if ((() => { let test = vars.test
let scenario = vars.scenario
let currency = vars.currency
let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
return test === "partial" && scenario === "multi-currency" })()) {
    vars.totalUSD = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let total = vars.partialRefund;
let rate = vars.rate;
let totalUSD = Math.round(total * rate * 100) /100;
return totalUSD }, vars);
  }
  try {
    if ((() => { let test = vars.test
let scenario = vars.scenario
let currency = vars.currency
let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
return test === "partial" && scenario === "multi-currency" })()) {
      expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.response_data.headers[6] === `bluesnap-usd-refund-amount: ${vars.totalUSD}` }, vars)).toBeTruthy();
    }
  } catch { /* optional step: assertEval */ }
  if ((() => { let test = vars.test
let scenario = vars.scenario
let currency = vars.currency
let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
return test != "partial"  && scenario === "multi-currency" })()) {
    vars.totalUSD = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let total = vars.total;
let rate = vars.rate;
let totalUSD = Math.round(total * rate * 100) /100;
return totalUSD }, vars);
  }
  try {
    if ((() => { let test = vars.test
let scenario = vars.scenario
let currency = vars.currency
let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
return test != "partial"  && scenario === "multi-currency" })()) {
      expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.response_data.headers[6] === `bluesnap-usd-refund-amount: ${vars.totalUSD}` }, vars)).toBeTruthy();
    }
  } catch { /* optional step: assertEval */ }
}

// GI: "Verify logs T/R - AUTH_CAPTURE - Renewal" (61b0ff5d3a4935e146c7525e)
export async function verifyLogsTRAUTHCAPTURERenewal(page: Page, vars: Record<string, string> = {}): Promise<void> {
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.request.method === "POST" }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.request.url === `https://sandbox.bluesnap.com/services/2/recurring/ondemand/${vars.subsID}` }, vars)).toBeTruthy();
  if ((() => { let checklogs = vars.checklogs
let order = vars.order
let test = vars.test
let scenario = vars.scenario
let manualRenew = vars.manualRenew
let blueSnapVs = vars.BlueSnapVs
let currency = vars.curr
blueSnapVs = blueSnapVs.split('.');

return  checklogs != "upgrade" && order != "fail" && test != "preorder"
        &&
        (
            currency !== "JPY" 
            ||
            (
                currency === "JPY" 
                && 
                Number(blueSnapVs[0]) >= 3 
                && 
                Number(blueSnapVs[1]) >= 5
            )
        )
        &&
        (
            manualRenew !== "Yes"
            ||
            (
                manualRenew === "Yes"
                &&
                blueSnapVs[0] >= 3
                &&
                blueSnapVs[1] >= 2
            )
        ) })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return Number(logs.request.content.amount) === vars.totalRenew }, vars)).toBeTruthy();
  }
  if ((() => { let checklogs = vars.checklogs
let order = vars.order
let test = vars.test
let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
let currency = vars.curr
return (checklogs === "upgrade" || order === "fail" || test === "preorder") 
        &&
        (currency !== "JPY" || (currency === "JPY" && (Number(blueSnapVs[0]) >= 3 && Number(blueSnapVs[1]) >= 5))) })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return Number(logs.request.content.amount) === vars.total }, vars)).toBeTruthy();
  }
  if ((() => { let scenario = vars.scenario
return scenario != "multi-currency" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.request.content.currency === "USD" }, vars)).toBeTruthy();
  }
  if ((() => { let scenario = vars.scenario
return scenario === "multi-currency" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.request.content.currency === `${vars.currency}` }, vars)).toBeTruthy();
  }
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.request.content.merchantTransactionId === Number(vars.orderNumber) }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.subscriptionId === vars.subsID }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.merchantTransactionId === `${vars.orderNumber}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.transactionId === `${vars.transaction_id}` }, vars)).toBeTruthy();
  try {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.softDescriptor === "BLS*BSTEST2-wpe" || logs.response.softDescriptor === "BLS*BSTEST2-WPE" || logs.response.softDescriptor === "BLS*SAUCAL" || logs.response.softDescriptor === "BLS*Saucal" }, vars)).toBeTruthy();
  } catch { /* optional step: assertEval */ }
  if ((() => { let checklogs = vars.checklogs
let order = vars.order
let test = vars.test
let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
let manualRenew = vars.manualRenew
let currency = vars.curr

return checklogs != "upgrade" && order != "fail" && test != "preorder" && 
        (
            manualRenew !== "Yes"
            ||
            (
                manualRenew === "Yes"
                &&
                blueSnapVs[0] >= 3
                &&
                blueSnapVs[1] >= 2
            )
        )
        &&
        (   
            currency !== "JPY" 
            || 
            (
                currency === "JPY" 
                && 
                (
                    Number(blueSnapVs[0]) >= 3 
                    && 
                    Number(blueSnapVs[1]) >= 5
                )
            )
        ) })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.amount === vars.totalRenew }, vars)).toBeTruthy();
  }
  if ((() => { let checklogs = vars.checklogs
let order = vars.order
let test = vars.test
let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
let currency = vars.curr
return (checklogs === "upgrade" || order === "fail" || test === "preorder") 
        &&
        (currency !== "JPY" || (currency === "JPY" && (Number(blueSnapVs[0]) >= 3 && Number(blueSnapVs[1]) >= 5))) })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.amount === vars.total }, vars)).toBeTruthy();
  }
  if ((() => { let payment = vars.payment
return payment != "ach" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.paymentSource.creditCardInfo.billingContactInfo.firstName === `${vars.firstName}` }, vars)).toBeTruthy();
  }
  if ((() => { let payment = vars.payment
return payment != "ach" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.paymentSource.creditCardInfo.billingContactInfo.lastName === `${vars.lastName}` }, vars)).toBeTruthy();
  }
  if ((() => { let payment = vars.payment
return payment != "ach" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.paymentSource.creditCardInfo.billingContactInfo.country === "us" }, vars)).toBeTruthy();
  }
  if ((() => { let payment = vars.payment
return payment != "ach" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.paymentSource.creditCardInfo.billingContactInfo.state === "FL" }, vars)).toBeTruthy();
  }
  if ((() => { let payment = vars.payment
return payment != "ach" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.paymentSource.creditCardInfo.billingContactInfo.address1 === `${vars.street}` }, vars)).toBeTruthy();
  }
  if ((() => { let payment = vars.payment
return payment != "ach" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.paymentSource.creditCardInfo.billingContactInfo.city === `${vars.city}` }, vars)).toBeTruthy();
  }
  if ((() => { let payment = vars.payment
return payment != "ach" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.paymentSource.creditCardInfo.billingContactInfo.zip === `${vars.zipCode}` }, vars)).toBeTruthy();
  }
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.vaultedShopperId === vars.vaultedShopperId }, vars)).toBeTruthy();
  if ((() => { let payment = vars.payment
return payment != "ach" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.paymentSource.creditCardInfo.creditCard.cardLastFourDigits === `${vars.fourDigits}` }, vars)).toBeTruthy();
  }
  if ((() => { let payment = vars.payment
return payment != "ach" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.paymentSource.creditCardInfo.creditCard.cardType === `${vars.ShortName}` }, vars)).toBeTruthy();
  }
  if ((() => { let payment = vars.payment
return payment != "ach" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.paymentSource.creditCardInfo.creditCard.expirationMonth === `${vars.month}` }, vars)).toBeTruthy();
  }
  if ((() => { let payment = vars.payment
return payment != "ach" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
const AE_year = "20"+`${vars.year}`
return logs.response.paymentSource.creditCardInfo.creditCard.expirationYear === AE_year }, vars)).toBeTruthy();
  }
  if ((() => { let payment = vars.payment
return payment != "ach" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.processingInfo.processingStatus === "SUCCESS" }, vars)).toBeTruthy();
  }
  if ((() => { let payment = vars.payment
let trans = vars.trans
return payment === "ach" && trans === "accepted" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.paymentSource.ecpInfo.ecp.accountNumber.includes("44556") }, vars)).toBeTruthy();
  }
  if ((() => { let payment = vars.payment
let trans = vars.trans
return payment === "ach" && trans === "accepted" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.paymentSource.ecpInfo.ecp.routingNumber.includes("77665") }, vars)).toBeTruthy();
  }
  if ((() => { let payment = vars.payment
return payment === "ach" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.paymentSource.ecpInfo.ecp.accountType === "CONSUMER_CHECKING" }, vars)).toBeTruthy();
  }
  if ((() => { let payment = vars.payment
return payment === "ach" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.processingInfo.processingStatus === "PENDING" }, vars)).toBeTruthy();
  }
  if ((() => { let payment = vars.payment
let trans = vars.trans
return payment === "ach" && trans === "declined" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.paymentSource.ecpInfo.ecp.accountNumber.includes("56789") }, vars)).toBeTruthy();
  }
  if ((() => { let payment = vars.payment
let trans = vars.trans
return payment === "ach" && trans === "declined" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.paymentSource.ecpInfo.ecp.routingNumber.includes("54321") }, vars)).toBeTruthy();
  }
  if ((() => { let scenario = vars.scenario
return scenario != "multi-currency" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.currency === "USD" }, vars)).toBeTruthy();
  }
  if ((() => { let scenario = vars.scenario
return scenario === "multi-currency" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.currency === `${vars.currency}` }, vars)).toBeTruthy();
  }
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.chargeInfo.chargeType === "RECURRING" }, vars)).toBeTruthy();
}

// GI: "Verify logs T/R - AUTH_CAPTURE - Upgrade" (620bce456428cd4cb35471c8)
export async function verifyLogsTRAUTHCAPTUREUpgrade(page: Page, vars: Record<string, string> = {}): Promise<void> {
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.request.method === "PUT" }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.request.url === `https://sandbox.bluesnap.com/services/2/recurring/subscriptions/${vars.subsID}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.request.content.vaultedShopperId === `${vars.vaultedShopperId}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.vaultedShopperId === vars.vaultedShopperId }, vars)).toBeTruthy();
  if ((() => { const check = vars.checklogs
const upgradeTo = vars.upgradeTo
return check === "upgrade" && upgradeTo != "cc" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.request.content.paymentSource.creditCardInfo.creditCard.cardLastFourDigits === `${vars.fourDigits}` }, vars)).toBeTruthy();
  }
  if ((() => { const check = vars.checklogs
const upgradeTo = vars.upgradeTo
return check === "upgrade" && upgradeTo != "cc" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.request.content.paymentSource.creditCardInfo.creditCard.cardType === `${vars.ShortName}` }, vars)).toBeTruthy();
  }
  if ((() => { const check = vars.checklogs
const upgradeTo = vars.upgradeTo
return check === "upgrade" && upgradeTo === "cc" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.request.content.paymentSource.creditCardInfo.pfToken === `${vars.pfToken}` }, vars)).toBeTruthy();
  }
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.paymentSource.creditCardInfo.creditCard.cardLastFourDigits === `${vars.fourDigits}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.paymentSource.creditCardInfo.creditCard.cardType === `${vars.ShortName}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.paymentSource.creditCardInfo.creditCard.expirationMonth === `${vars.month}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
const AE_year = "20"+`${vars.year}`
return logs.response.paymentSource.creditCardInfo.creditCard.expirationYear === AE_year }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.request.content.paymentSource.creditCardInfo.billingContactInfo.firstName === `${vars.firstName}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.paymentSource.creditCardInfo.billingContactInfo.firstName === `${vars.firstName}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.request.content.paymentSource.creditCardInfo.billingContactInfo.lastName === `${vars.lastName}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.paymentSource.creditCardInfo.billingContactInfo.lastName === `${vars.lastName}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.request.content.paymentSource.creditCardInfo.billingContactInfo.companyName === `${vars.company}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.request.content.paymentSource.creditCardInfo.billingContactInfo.email === `${vars.email}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.request.content.paymentSource.creditCardInfo.billingContactInfo.country === "US" }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.paymentSource.creditCardInfo.billingContactInfo.country === "us" }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.request.content.paymentSource.creditCardInfo.billingContactInfo.state === "FL" }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.paymentSource.creditCardInfo.billingContactInfo.state === "FL" }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.request.content.paymentSource.creditCardInfo.billingContactInfo.address1 === `${vars.street}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.paymentSource.creditCardInfo.billingContactInfo.address1 === `${vars.street}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.request.content.paymentSource.creditCardInfo.billingContactInfo.address2 === `${vars.address2}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.request.content.paymentSource.creditCardInfo.billingContactInfo.city === `${vars.city}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.paymentSource.creditCardInfo.billingContactInfo.city === `${vars.city}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.request.content.paymentSource.creditCardInfo.billingContactInfo.zip === `${vars.zipCode}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.paymentSource.creditCardInfo.billingContactInfo.zip === `${vars.zipCode}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.subscriptionId === vars.subsID }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.vaultedShopperId === vars.vaultedShopperId }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.status === "ACTIVE" }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.currency === "USD" }, vars)).toBeTruthy();
  try {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.softDescriptor === "BLS*BSTEST2-wpe" }, vars)).toBeTruthy();
  } catch { /* optional step: assertEval */ }
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.chargeFrequency === "ONDEMAND" }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.autoRenew === true }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
const totalOld2 = vars.totalOld
return logs.response.overrideInitialChargeAmount === totalOld2 }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.payerInfo.firstName === `${vars.firstName}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.payerInfo.lastName === `${vars.lastName}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.payerInfo.email === `${vars.email}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.payerInfo.country === "us" }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.payerInfo.state === "FL" }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.payerInfo.address === `${vars.street}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.payerInfo.city === `${vars.city}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.payerInfo.zip === `${vars.zipCode}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.scheduled === true }, vars)).toBeTruthy();
}

// GI: "Verify logs T/R - AUTH_CAPTURE - Upgrade - 2.6.x" (6241c515e066134dd1017949)
export async function verifyLogsTRAUTHCAPTUREUpgrade26X(page: Page, vars: Record<string, string> = {}): Promise<void> {
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.request.method === "PUT" }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.request.url === `https://sandbox.bluesnap.com/services/2/recurring/subscriptions/${vars.subsID}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.request.content.vaultedShopperId === `${vars.vaultedShopperId}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.vaultedShopperId === vars.vaultedShopperId }, vars)).toBeTruthy();
  if ((() => { const check = vars.checklogs
const upgradeTo = vars.upgradeTo
return check === "upgrade" && upgradeTo != "cc" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.request.content.paymentSource.creditCardInfo.creditCard.cardLastFourDigits === `${vars.fourDigits}` }, vars)).toBeTruthy();
  }
  if ((() => { const check = vars.checklogs
const upgradeTo = vars.upgradeTo
return check === "upgrade" && upgradeTo != "cc" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.request.content.paymentSource.creditCardInfo.creditCard.cardType === `${vars.ShortName}` }, vars)).toBeTruthy();
  }
  if ((() => { const check = vars.checklogs
const upgradeTo = vars.upgradeTo

return check === "upgrade" && upgradeTo === "cc" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.request.content.paymentSource.creditCardInfo.pfToken === `${vars.pfToken}` }, vars)).toBeTruthy();
  }
  if ((() => { let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
return (Number(blueSnapVs[0]) == 2 && Number(blueSnapVs[1]) == 6) || Number(blueSnapVs[0]) >= 3 })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.request.content.threeDSecure.threeDSecureReferenceId != "" }, vars)).toBeTruthy();
  }
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.paymentSource.creditCardInfo.creditCard.cardLastFourDigits === `${vars.fourDigits}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.paymentSource.creditCardInfo.creditCard.cardType === `${vars.ShortName}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.paymentSource.creditCardInfo.creditCard.expirationMonth === `${vars.month}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
const AE_year = "20"+`${vars.year}`
return logs.response.paymentSource.creditCardInfo.creditCard.expirationYear === AE_year }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.request.content.paymentSource.creditCardInfo.billingContactInfo.firstName === `${vars.firstName}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.paymentSource.creditCardInfo.billingContactInfo.firstName === `${vars.firstName}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.request.content.paymentSource.creditCardInfo.billingContactInfo.lastName === `${vars.lastName}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.paymentSource.creditCardInfo.billingContactInfo.lastName === `${vars.lastName}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.request.content.paymentSource.creditCardInfo.billingContactInfo.companyName === `${vars.company}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.request.content.paymentSource.creditCardInfo.billingContactInfo.email === `${vars.email}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.request.content.paymentSource.creditCardInfo.billingContactInfo.country === "US" }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.paymentSource.creditCardInfo.billingContactInfo.country === "us" }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.request.content.paymentSource.creditCardInfo.billingContactInfo.state === "FL" }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.paymentSource.creditCardInfo.billingContactInfo.state === "FL" }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.request.content.paymentSource.creditCardInfo.billingContactInfo.address1 === `${vars.street}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.paymentSource.creditCardInfo.billingContactInfo.address1 === `${vars.street}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.request.content.paymentSource.creditCardInfo.billingContactInfo.address2 === `${vars.address2}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.request.content.paymentSource.creditCardInfo.billingContactInfo.city === `${vars.city}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.paymentSource.creditCardInfo.billingContactInfo.city === `${vars.city}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.request.content.paymentSource.creditCardInfo.billingContactInfo.zip === `${vars.zipCode}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.paymentSource.creditCardInfo.billingContactInfo.zip === `${vars.zipCode}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.subscriptionId === vars.subsID }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.vaultedShopperId === vars.vaultedShopperId }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.status === "ACTIVE" }, vars)).toBeTruthy();
  if ((() => { let scenario = vars.scenario
return scenario != "multi-currency" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.currency === "USD" }, vars)).toBeTruthy();
  }
  if ((() => { let scenario = vars.scenario
return scenario === "multi-currency" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.currency === `${vars.currency}` }, vars)).toBeTruthy();
  }
  try {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.softDescriptor === "BLS*BSTEST2-wpe" || logs.response.softDescriptor === "BLS*BSTEST2-WPE"
|| logs.response.softDescriptor === "BSTEST2-wpe" || logs.response.softDescriptor === "BSTEST2-WPE" }, vars)).toBeTruthy();
  } catch { /* optional step: assertEval */ }
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.chargeFrequency === "ONDEMAND" }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.autoRenew === true }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
const totalOld2 = vars.totalOld
return logs.response.overrideInitialChargeAmount === totalOld2 }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.payerInfo.firstName === `${vars.firstName}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.payerInfo.lastName === `${vars.lastName}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.payerInfo.email === `${vars.email}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.payerInfo.country === "us" }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.payerInfo.state === "FL" }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.payerInfo.address === `${vars.street}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.payerInfo.city === `${vars.city}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.payerInfo.zip === `${vars.zipCode}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.scheduled === true }, vars)).toBeTruthy();
}

// GI: "Verify logs T/R - AUTH_REVERSAL / CAPTURE" (620ab20bd9e39f83d076dfae)
export async function verifyLogsTRAUTHREVERSALCAPTURE(page: Page, vars: Record<string, string> = {}): Promise<void> {
  if ((() => { let auth = vars.auth
return auth === "capture" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[0].content.cardTransactionType === "CAPTURE" }, vars)).toBeTruthy();
  }
  if ((() => { let auth = vars.auth
return auth === "cancel" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[0].content.cardTransactionType === "AUTH_REVERSAL" }, vars)).toBeTruthy();
  }
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[0].method === "PUT" }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[0].url === "https://sandbox.bluesnap.com/services/2/transactions" }, vars)).toBeTruthy();
  if ((() => { let auth = vars.auth
return auth === "capture" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return Number(logs[0].content.amount) === vars.total }, vars)).toBeTruthy();
  }
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[0].content.transactionId === `${vars.transaction_id}` }, vars)).toBeTruthy();
  if ((() => { let auth = vars.auth
return auth === "capture" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[1].content.cardTransactionType === "CAPTURE" }, vars)).toBeTruthy();
  }
  if ((() => { let auth = vars.auth
return auth === "cancel" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[1].content.cardTransactionType === "AUTH_REVERSAL" }, vars)).toBeTruthy();
  }
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[1].content.transactionId === `${vars.transaction_id}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[1].content.softDescriptor === "BLS*BSTEST2-WPE" }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[1].content.amount === vars.total }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[1].content.cardHolderInfo.firstName === `${vars.firstName}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[1].content.cardHolderInfo.lastName === `${vars.lastName}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[1].content.cardHolderInfo.email === `${vars.email}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[1].content.cardHolderInfo.country === "us" }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[1].content.cardHolderInfo.state === "FL" }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[1].content.cardHolderInfo.address === `${vars.street}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[1].content.cardHolderInfo.city === `${vars.city}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[1].content.cardHolderInfo.zip === `${vars.zipCode}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[1].content.cardHolderInfo.companyName === `${vars.company}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[1].content.vaultedShopperId === vars.vaultedShopperId }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[1].content.creditCard.cardLastFourDigits === `${vars.fourDigits}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[1].content.creditCard.cardType === `${vars.ShortName}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
const AE_month = Number(`${vars.month}`)
return logs[1].content.creditCard.expirationMonth === ""+AE_month+"" }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
const AE_year = "20"+`${vars.year}`
return logs[1].content.creditCard.expirationYear === AE_year }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
const threeDS = "AUTHENTICATION_UNAVAILABLE"


return logs[1].content.threeDSecure.authenticationResult === threeDS }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[1].content.processingInfo.processingStatus === "SUCCESS" }, vars)).toBeTruthy();
}

// GI: "Verify logs T/R Guest Shopper - ACH" (6213dddb5f85360d3f170bee)
export async function verifyLogsTRGuestShopperACH(page: Page, vars: Record<string, string> = {}): Promise<void> {
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.request.method === "POST" }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.request.url === "https://sandbox.bluesnap.com/services/2/alt-transactions" }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return Number(logs.request.content.amount) === vars.total }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.request.content.currency === "USD" }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.request.content.merchantTransactionId === Number(vars.orderNumber) }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.request.content.transactionFraudInfo.fraudSessionId !== "" }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.request.content.transactionFraudInfo.shopperIpAddress !== "" }, vars)).toBeTruthy();
  if ((() => { let test = vars.test
return test === "002-001" || test === "002-008" || test === "002-009" || test === "preorder" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.request.content.vaultedShopperId === "" }, vars)).toBeTruthy();
  }
  if ((() => { let test = vars.test
return test === "002-010" || test === "002-011" || test === "002-013" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.request.content.vaultedShopperId === `${vars.vaultedShopperId}` }, vars)).toBeTruthy();
  }
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.request.content.softDescriptor === "BSTEST2-wpe" }, vars)).toBeTruthy();
  if ((() => { let transaction = vars.trans
let test = vars.test
return transaction === "accepted" && test != "002-001" && test != "002-009" && test != "preorder" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
let account = logs.request.content.ecpTransaction.publicAccountNumber

return account.includes("44556") }, vars)).toBeTruthy();
  }
  if ((() => { let transaction = vars.trans
let test = vars.test
return transaction === "accepted" && test != "002-001" && test != "002-009" && test != "preorder" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
let routing = logs.request.content.ecpTransaction.publicRoutingNumber

return routing.includes("77665") }, vars)).toBeTruthy();
  }
  if ((() => { let test = vars.test
let trans = vars.trans
return test === "002-001" || test === "002-009" || (trans === "accepted" && test === "preorder") })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
let account = logs.request.content.ecpTransaction.accountNumber

return account.includes("44556") }, vars)).toBeTruthy();
  }
  if ((() => { let test = vars.test
let trans = vars.trans
return test === "002-001" || test === "002-009" || (trans === "accepted" && test === "preorder") })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
let routing = logs.request.content.ecpTransaction.routingNumber

return routing.includes("77665") }, vars)).toBeTruthy();
  }
  if ((() => { let transaction = vars.trans
let test = vars.test
return transaction === "declined"  && test != "002-008" && test != "preorder" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
let account = logs.request.content.ecpTransaction.publicAccountNumber
return account.includes("56789") }, vars)).toBeTruthy();
  }
  if ((() => { let transaction = vars.trans
let test = vars.test
return transaction === "declined"  && test != "002-008" && test != "preorder" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
let routing = logs.request.content.ecpTransaction.publicRoutingNumber
return routing.includes("54321") }, vars)).toBeTruthy();
  }
  if ((() => { let test = vars.test
let transaction = vars.trans
return transaction === "declined" && (test === "002-008" || test === "preorder") })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
let account = logs.request.content.ecpTransaction.accountNumber

return account.includes("56789") }, vars)).toBeTruthy();
  }
  if ((() => { let test = vars.test
let transaction = vars.trans
return transaction === "declined" && (test === "002-008" || test === "preorder") })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
let routing = logs.request.content.ecpTransaction.routingNumber
return routing.includes("54321") }, vars)).toBeTruthy();
  }
  if ((() => { let test = vars.test
return test != "002-011" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.request.content.ecpTransaction.accountType === "CONSUMER_CHECKING" }, vars)).toBeTruthy();
  }
  if ((() => { let test = vars.test
return test === "002-011" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.request.content.ecpTransaction.accountType === "CORPORATE_CHECKING" }, vars)).toBeTruthy();
  }
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.request.content.authorizedByShopper === true }, vars)).toBeTruthy();
  if ((() => { let test = vars.test
return test === "002-001" || test === "002-008" || test === "002-009" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.request.content.payerInfo.firstName === `${vars.firstName}` }, vars)).toBeTruthy();
  }
  if ((() => { let test = vars.test
return test === "002-001" || test === "002-008" || test === "002-009" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.request.content.payerInfo.lastName === `${vars.lastName}` }, vars)).toBeTruthy();
  }
  if ((() => { let test = vars.test
return test === "002-001" || test === "002-008" || test === "002-009" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.request.content.payerInfo.companyName === `${vars.company}` }, vars)).toBeTruthy();
  }
  if ((() => { let test = vars.test
return test === "002-001" || test === "002-008" || test === "002-009" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.request.content.payerInfo.email === `${vars.email}` }, vars)).toBeTruthy();
  }
  if ((() => { let test = vars.test
return test === "002-001" || test === "002-008" || test === "002-009" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.request.content.payerInfo.country === "US" }, vars)).toBeTruthy();
  }
  if ((() => { let test = vars.test
return test === "002-001" || test === "002-008" || test === "002-009" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.request.content.payerInfo.state === "FL" }, vars)).toBeTruthy();
  }
  if ((() => { let test = vars.test
return test === "002-001" || test === "002-008" || test === "002-009" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.request.content.payerInfo.address === `${vars.street}` }, vars)).toBeTruthy();
  }
  if ((() => { let test = vars.test
return test === "002-001" || test === "002-008" || test === "002-009" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.request.content.payerInfo.address2 === `${vars.address2}` }, vars)).toBeTruthy();
  }
  if ((() => { let test = vars.test
return test === "002-001" || test === "002-008" || test === "002-009" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.request.content.payerInfo.city === `${vars.city}` }, vars)).toBeTruthy();
  }
  if ((() => { let test = vars.test
return test === "002-001" || test === "002-008" || test === "002-009" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.request.content.payerInfo.zip === `${vars.zipCode}` }, vars)).toBeTruthy();
  }
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.merchantTransactionId === `${vars.orderNumber}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.transactionId === `${vars.transaction_id}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.softDescriptor === "BSTEST2-wpe" }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.amount === vars.total }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.currency === "USD" }, vars)).toBeTruthy();
  if ((() => { let test = vars.test
return test === "002-001" || test === "002-008" || test === "002-009" || test === "preorder" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.payerInfo.firstName === `${vars.firstName}` }, vars)).toBeTruthy();
  }
  if ((() => { let test = vars.test
return test === "002-001" || test === "002-008" || test === "002-009" || test === "preorder" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.payerInfo.lastName === `${vars.lastName}` }, vars)).toBeTruthy();
  }
  if ((() => { let test = vars.test
return test === "002-001" || test === "002-008" || test === "002-009" || test === "preorder" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.payerInfo.email === `${vars.email}` }, vars)).toBeTruthy();
  }
  if ((() => { let test = vars.test
return test === "002-001" || test === "002-008" || test === "002-009" || test === "preorder" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.payerInfo.country === "us" }, vars)).toBeTruthy();
  }
  if ((() => { let test = vars.test
return test === "002-001" || test === "002-008" || test === "002-009" || test === "preorder" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.payerInfo.state === "FL" }, vars)).toBeTruthy();
  }
  if ((() => { let test = vars.test
return test === "002-001" || test === "002-008" || test === "002-009" || test === "preorder" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.payerInfo.address === `${vars.street}` }, vars)).toBeTruthy();
  }
  if ((() => { let test = vars.test
return test === "002-001" || test === "002-008" || test === "002-009" || test === "preorder" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.payerInfo.city === `${vars.city}` }, vars)).toBeTruthy();
  }
  if ((() => { let test = vars.test
return test === "002-001" || test === "002-008" || test === "002-009" || test === "preorder" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.payerInfo.zip === `${vars.zipCode}` }, vars)).toBeTruthy();
  }
  if ((() => { let test = vars.test
return test === "002-001" || test === "002-008" || test === "002-009" || test === "preorder" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.payerInfo.companyName === `${vars.company}` }, vars)).toBeTruthy();
  }
  if ((() => { let test = vars.test
return test === "002-001" || test === "002-008" || test === "002-009" || test === "preorder" })()) {
    vars.vaultedShopperId = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.vaultedShopperId }, vars);
  }
  if ((() => { let test = vars.test
return test === "002-010" || test === "002-011" || test === "002-013" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.vaultedShopperId === vars.vaultedShopperId }, vars)).toBeTruthy();
  }
  if ((() => { let test = vars.test
return test != "002-011" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.ecpTransaction.accountType === "CONSUMER_CHECKING" }, vars)).toBeTruthy();
  }
  if ((() => { let test = vars.test
return test === "002-011" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.ecpTransaction.accountType === "CORPORATE_CHECKING" }, vars)).toBeTruthy();
  }
  if ((() => { let transaction = vars.trans
return transaction === "accepted" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
let account = logs.response.ecpTransaction.publicAccountNumber

return account.includes("44556") }, vars)).toBeTruthy();
  }
  if ((() => { let transaction = vars.trans
return transaction === "accepted" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
let routing = logs.response.ecpTransaction.publicRoutingNumber

return routing.includes("77665") }, vars)).toBeTruthy();
  }
  if ((() => { let transaction = vars.trans
return transaction === "declined" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
let account = logs.response.ecpTransaction.publicAccountNumber

return account.includes("56789") }, vars)).toBeTruthy();
  }
  if ((() => { let transaction = vars.trans
return transaction === "declined" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
let routing = logs.response.ecpTransaction.publicRoutingNumber

return routing.includes("54321") }, vars)).toBeTruthy();
  }
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.processingInfo.processingStatus === "PENDING" }, vars)).toBeTruthy();
}

// GI: "Verify logs T/R New Shopper - AUTH_CAPTURE - ACH - Subscription" (621fbc70ee28e97e1af52056)
export async function verifyLogsTRNewShopperAUTHCAPTUREACHSubscription(page: Page, vars: Record<string, string> = {}): Promise<void> {
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[0].method === "POST" }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[0].url === "https://sandbox.bluesnap.com/services/2/recurring/ondemand" }, vars)).toBeTruthy();
  if ((() => { const test = vars.test
return test === "subscription" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return Number(logs[0].content.amount) === vars.total }, vars)).toBeTruthy();
  }
  if ((() => { const test = vars.test
return test === "preorder" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return Number(logs[0].content.amount) === 0.00 }, vars)).toBeTruthy();
  }
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[0].content.currency === "USD" }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[0].content.merchantTransactionId === Number(vars.orderNumber) }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[0].content.transactionFraudInfo.fraudSessionId !== "" }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[0].content.transactionFraudInfo.shopperIpAddress !== "" }, vars)).toBeTruthy();
  if ((() => { const user = vars.user
return user === "new" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[0].content.vaultedShopperId === "" }, vars)).toBeTruthy();
  }
  if ((() => { const user = vars.user
return user === "old" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[0].content.vaultedShopperId === `${vars.vaultedShopperId}` }, vars)).toBeTruthy();
  }
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[0].content.softDescriptor === "BSTEST2-wpe" }, vars)).toBeTruthy();
  if ((() => { const user = vars.user
return user === "new" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[0].content.payerInfo.firstName === `${vars.firstName}` }, vars)).toBeTruthy();
  }
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[0].content.paymentSource.ecpInfo.billingContactInfo.firstName === `${vars.firstName}` }, vars)).toBeTruthy();
  if ((() => { const user = vars.user
return user === "new" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[0].content.payerInfo.lastName === `${vars.lastName}` }, vars)).toBeTruthy();
  }
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[0].content.paymentSource.ecpInfo.billingContactInfo.lastName === `${vars.lastName}` }, vars)).toBeTruthy();
  if ((() => { const user = vars.user
return user === "new" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[0].content.payerInfo.companyName === `${vars.company}` }, vars)).toBeTruthy();
  }
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[0].content.paymentSource.ecpInfo.billingContactInfo.companyName === `${vars.company}` }, vars)).toBeTruthy();
  if ((() => { const user = vars.user
return user === "new" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[0].content.payerInfo.email === `${vars.email}` }, vars)).toBeTruthy();
  }
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[0].content.paymentSource.ecpInfo.billingContactInfo.email === `${vars.email}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[0].content.paymentSource.ecpInfo.billingContactInfo.country === "US" }, vars)).toBeTruthy();
  if ((() => { const user = vars.user
return user === "new" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[0].content.payerInfo.country === "US" }, vars)).toBeTruthy();
  }
  if ((() => { const user = vars.user
return user === "new" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[0].content.payerInfo.state === "FL" }, vars)).toBeTruthy();
  }
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[0].content.paymentSource.ecpInfo.billingContactInfo.state === "FL" }, vars)).toBeTruthy();
  if ((() => { const user = vars.user
return user === "new" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[0].content.payerInfo.address === `${vars.street}` }, vars)).toBeTruthy();
  }
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[0].content.paymentSource.ecpInfo.billingContactInfo.address1 === `${vars.street}` }, vars)).toBeTruthy();
  if ((() => { const user = vars.user
return user === "new" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[0].content.payerInfo.address2 === `${vars.address2}` }, vars)).toBeTruthy();
  }
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[0].content.paymentSource.ecpInfo.billingContactInfo.address2 === `${vars.address2}` }, vars)).toBeTruthy();
  if ((() => { const user = vars.user
return user === "new" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[0].content.payerInfo.city === `${vars.city}` }, vars)).toBeTruthy();
  }
  try {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[0].content.paymentSource.ecpInfo.billingContactInfo.city === `${vars.city}` }, vars)).toBeTruthy();
  } catch { /* optional step: assertEval */ }
  if ((() => { const user = vars.user
return user === "new" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[0].content.payerInfo.zip === `${vars.zipCode}` }, vars)).toBeTruthy();
  }
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[0].content.paymentSource.ecpInfo.billingContactInfo.zip === `${vars.zipCode}` }, vars)).toBeTruthy();
  if ((() => { let trans = vars.trans
return trans === "accepted" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[0].content.paymentSource.ecpInfo.ecp.accountNumber.includes("44556") }, vars)).toBeTruthy();
  }
  if ((() => { let trans = vars.trans
return trans === "accepted" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[0].content.paymentSource.ecpInfo.ecp.routingNumber.includes("77665") }, vars)).toBeTruthy();
  }
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[0].content.paymentSource.ecpInfo.ecp.accountType === "CONSUMER_CHECKING" }, vars)).toBeTruthy();
  if ((() => { let trans = vars.trans
return trans === "declined" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[0].content.paymentSource.ecpInfo.ecp.accountNumber.includes("56789") }, vars)).toBeTruthy();
  }
  if ((() => { let trans = vars.trans
return trans === "declined" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[0].content.paymentSource.ecpInfo.ecp.routingNumber.includes("54321") }, vars)).toBeTruthy();
  }
  if ((() => { const test = vars.test

return test === "subscription" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[0].content.scheduled === true }, vars)).toBeTruthy();
  }
  vars.chargeId = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
let chargeId = logs[1].content.chargeId
return chargeId }, vars);
  vars.subsID = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
let subsId = logs[1].content.subscriptionId
return subsId }, vars);
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[1].content.merchantTransactionId === `${vars.orderNumber}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[1].content.transactionId === `${vars.transaction_id}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[1].content.softDescriptor === "BSTEST2-wpe" }, vars)).toBeTruthy();
  if ((() => { const test = vars.test
return test === "subscription" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[1].content.amount === vars.total }, vars)).toBeTruthy();
  }
  if ((() => { const test = vars.test
return test === "preorder" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return Number(logs[1].content.amount) === 0.00 }, vars)).toBeTruthy();
  }
  vars.vaultedShopperId = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[1].content.vaultedShopperId }, vars);
  if ((() => { let trans = vars.trans
return trans === "accepted" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[1].content.paymentSource.ecpInfo.ecp.accountNumber.includes("44556") }, vars)).toBeTruthy();
  }
  if ((() => { let trans = vars.trans
return trans === "accepted" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[1].content.paymentSource.ecpInfo.ecp.routingNumber.includes("77665") }, vars)).toBeTruthy();
  }
  if ((() => { let trans = vars.trans
return trans === "declined" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[1].content.paymentSource.ecpInfo.ecp.accountNumber.includes("56789") }, vars)).toBeTruthy();
  }
  if ((() => { let trans = vars.trans
return trans === "declined" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[1].content.paymentSource.ecpInfo.ecp.routingNumber.includes("54321") }, vars)).toBeTruthy();
  }
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[1].content.paymentSource.ecpInfo.ecp.accountType === "CONSUMER_CHECKING" }, vars)).toBeTruthy();
  if ((() => { const test = vars.test
return test === "subscription" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[1].content.processingInfo.processingStatus === "PENDING" }, vars)).toBeTruthy();
  }
  if ((() => { const test = vars.test
return test === "preorder" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[1].content.processingInfo.processingStatus === "SUCCESS" }, vars)).toBeTruthy();
  }
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[1].content.chargeInfo.chargeType === "INITIAL" }, vars)).toBeTruthy();
}

// GI: "Verify logs T/R New Shopper - AUTH_CAPTURE - CC - Subscription" (6183c32823071a6a85d39d56)
export async function verifyLogsTRNewShopperAUTHCAPTURECCSubscription(page: Page, vars: Record<string, string> = {}): Promise<void> {
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[0].method === "POST" }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[0].url === "https://sandbox.bluesnap.com/services/2/recurring/ondemand" }, vars)).toBeTruthy();
  if ((() => { const test = vars.test
return test === "subscription" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return Number(logs[0].content.amount) === vars.total }, vars)).toBeTruthy();
  }
  if ((() => { const test = vars.test
return test === "preorder" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return Number(logs[0].content.amount) === 0.00 }, vars)).toBeTruthy();
  }
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[0].content.currency === "USD" }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[0].content.merchantTransactionId === Number(vars.orderNumber) }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[0].content.transactionFraudInfo.fraudSessionId !== "" }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[0].content.transactionFraudInfo.shopperIpAddress !== "" }, vars)).toBeTruthy();
  if ((() => { const user = vars.user
return user === "new" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[0].content.vaultedShopperId === "" }, vars)).toBeTruthy();
  }
  if ((() => { const user = vars.user
return user === "old" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[0].content.vaultedShopperId === `${vars.vaultedShopperId}` }, vars)).toBeTruthy();
  }
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[0].content.softDescriptor === "BSTEST2-wpe" }, vars)).toBeTruthy();
  if ((() => { const user = vars.user
return user === "new" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[0].content.payerInfo.firstName === `${vars.firstName}` }, vars)).toBeTruthy();
  }
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[0].content.paymentSource.creditCardInfo.billingContactInfo.firstName === `${vars.firstName}` }, vars)).toBeTruthy();
  if ((() => { const user = vars.user
return user === "new" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[0].content.payerInfo.lastName === `${vars.lastName}` }, vars)).toBeTruthy();
  }
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[0].content.paymentSource.creditCardInfo.billingContactInfo.lastName === `${vars.lastName}` }, vars)).toBeTruthy();
  if ((() => { const user = vars.user
return user === "new" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[0].content.payerInfo.companyName === `${vars.company}` }, vars)).toBeTruthy();
  }
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[0].content.paymentSource.creditCardInfo.billingContactInfo.companyName === `${vars.company}` }, vars)).toBeTruthy();
  if ((() => { const user = vars.user
return user === "new" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[0].content.payerInfo.email === `${vars.email}` }, vars)).toBeTruthy();
  }
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[0].content.paymentSource.creditCardInfo.billingContactInfo.email === `${vars.email}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[0].content.paymentSource.creditCardInfo.billingContactInfo.country === "US" }, vars)).toBeTruthy();
  if ((() => { const user = vars.user
return user === "new" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[0].content.payerInfo.country === "US" }, vars)).toBeTruthy();
  }
  if ((() => { const user = vars.user
return user === "new" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[0].content.payerInfo.state === "FL" }, vars)).toBeTruthy();
  }
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[0].content.paymentSource.creditCardInfo.billingContactInfo.state === "FL" }, vars)).toBeTruthy();
  if ((() => { const user = vars.user
return user === "new" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[0].content.payerInfo.address === `${vars.street}` }, vars)).toBeTruthy();
  }
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[0].content.paymentSource.creditCardInfo.billingContactInfo.address1 === `${vars.street}` }, vars)).toBeTruthy();
  if ((() => { const user = vars.user
return user === "new" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[0].content.payerInfo.address2 === `${vars.address2}` }, vars)).toBeTruthy();
  }
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[0].content.paymentSource.creditCardInfo.billingContactInfo.address2 === `${vars.address2}` }, vars)).toBeTruthy();
  if ((() => { const user = vars.user
return user === "new" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[0].content.payerInfo.city === `${vars.city}` }, vars)).toBeTruthy();
  }
  try {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[0].content.paymentSource.creditCardInfo.billingContactInfo.city === `${vars.city}` }, vars)).toBeTruthy();
  } catch { /* optional step: assertEval */ }
  if ((() => { const user = vars.user
return user === "new" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[0].content.payerInfo.zip === `${vars.zipCode}` }, vars)).toBeTruthy();
  }
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[0].content.paymentSource.creditCardInfo.billingContactInfo.zip === `${vars.zipCode}` }, vars)).toBeTruthy();
  if ((() => { const user = vars.user
return user === "new" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[0].content.paymentSource.creditCardInfo.pfToken === `${vars.pfToken}`  }, vars)).toBeTruthy();
  }
  if ((() => { const test = vars.test

return test = "subscription" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[0].content.scheduled === true }, vars)).toBeTruthy();
  }
  vars.chargeId = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[1].content.chargeId }, vars);
  vars.subsID = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[1].content.subscriptionId  }, vars);
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[1].content.merchantTransactionId === `${vars.orderNumber}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[1].content.transactionId === `${vars.transaction_id}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[1].content.softDescriptor === "BLS*BSTEST2-WPE" }, vars)).toBeTruthy();
  if ((() => { const test = vars.test
return test === "subscription" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[1].content.amount === vars.total }, vars)).toBeTruthy();
  }
  if ((() => { const test = vars.test
return test === "preorder" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return Number(logs[1].content.amount) === 0.00 }, vars)).toBeTruthy();
  }
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[1].content.paymentSource.creditCardInfo.billingContactInfo.firstName === `${vars.firstName}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[1].content.paymentSource.creditCardInfo.billingContactInfo.lastName === `${vars.lastName}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[1].content.paymentSource.creditCardInfo.billingContactInfo.country === "us" }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[1].content.paymentSource.creditCardInfo.billingContactInfo.state === "FL" }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[1].content.paymentSource.creditCardInfo.billingContactInfo.address1 === `${vars.street}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[1].content.paymentSource.creditCardInfo.billingContactInfo.address2 === `${vars.address2}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[1].content.paymentSource.creditCardInfo.billingContactInfo.city === `${vars.city}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[1].content.paymentSource.creditCardInfo.billingContactInfo.zip === `${vars.zipCode}` }, vars)).toBeTruthy();
  vars.vaultedShopperId = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[1].content.vaultedShopperId }, vars);
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[1].content.paymentSource.creditCardInfo.creditCard.cardLastFourDigits === `${vars.fourDigits}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[1].content.paymentSource.creditCardInfo.creditCard.cardType === `${vars.ShortName}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[1].content.paymentSource.creditCardInfo.creditCard.expirationMonth === `${vars.month}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
const AE_year = "20"+`${vars.year}`
return logs[1].content.paymentSource.creditCardInfo.creditCard.expirationYear === AE_year }, vars)).toBeTruthy();
  if ((() => { const user = vars.user
return user === "new" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
const threeDS = "AUTHENTICATION_UNAVAILABLE"


return logs[1].content.threeDSecure.authenticationResult === threeDS }, vars)).toBeTruthy();
  }
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[1].content.processingInfo.processingStatus === "SUCCESS" }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[1].content.chargeInfo.chargeType === "INITIAL" }, vars)).toBeTruthy();
}

// GI: "Verify logs T/R New Shopper - AUTH_CAPTURE - CC - Subscription - 2.6.x" (6241afece066134dd1ec9c73)
export async function verifyLogsTRNewShopperAUTHCAPTURECCSubscription26X(page: Page, vars: Record<string, string> = {}): Promise<void> {
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[0].method === "POST" }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[0].url === "https://sandbox.bluesnap.com/services/2/recurring/ondemand" }, vars)).toBeTruthy();
  if ((() => { const test = vars.test
return test === "subscription" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return Number(logs[0].content.amount) === vars.total }, vars)).toBeTruthy();
  }
  if ((() => { const test = vars.test
return test === "preorder" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return Number(logs[0].content.amount) === 0.00 }, vars)).toBeTruthy();
  }
  if ((() => { let scenario = vars.scenario
return scenario != "multi-currency" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[0].content.currency === "USD" }, vars)).toBeTruthy();
  }
  if ((() => { let scenario = vars.scenario
return scenario === "multi-currency" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[0].content.currency === `${vars.currency}` }, vars)).toBeTruthy();
  }
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[0].content.merchantTransactionId === Number(vars.orderNumber) }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[0].content.transactionFraudInfo.fraudSessionId !== "" }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[0].content.transactionFraudInfo.shopperIpAddress !== "" }, vars)).toBeTruthy();
  if ((() => { const user = vars.user
return user === "new" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[0].content.vaultedShopperId === "" }, vars)).toBeTruthy();
  }
  if ((() => { const user = vars.user
return user === "old" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[0].content.vaultedShopperId === `${vars.vaultedShopperId}` }, vars)).toBeTruthy();
  }
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[0].content.softDescriptor === "BSTEST2-wpe" }, vars)).toBeTruthy();
  if ((() => { const user = vars.user
return user === "new" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[0].content.payerInfo.firstName === `${vars.firstName}` }, vars)).toBeTruthy();
  }
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[0].content.paymentSource.creditCardInfo.billingContactInfo.firstName === `${vars.firstName}` }, vars)).toBeTruthy();
  if ((() => { const user = vars.user
return user === "new" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[0].content.payerInfo.lastName === `${vars.lastName}` }, vars)).toBeTruthy();
  }
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[0].content.paymentSource.creditCardInfo.billingContactInfo.lastName === `${vars.lastName}` }, vars)).toBeTruthy();
  if ((() => { const user = vars.user
return user === "new" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[0].content.payerInfo.companyName === `${vars.company}` }, vars)).toBeTruthy();
  }
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[0].content.paymentSource.creditCardInfo.billingContactInfo.companyName === `${vars.company}` }, vars)).toBeTruthy();
  if ((() => { const user = vars.user
return user === "new" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[0].content.payerInfo.email === `${vars.email}` }, vars)).toBeTruthy();
  }
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[0].content.paymentSource.creditCardInfo.billingContactInfo.email === `${vars.email}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[0].content.paymentSource.creditCardInfo.billingContactInfo.country === "US" }, vars)).toBeTruthy();
  if ((() => { const user = vars.user
return user === "new" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[0].content.payerInfo.country === "US" }, vars)).toBeTruthy();
  }
  if ((() => { const user = vars.user
return user === "new" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[0].content.payerInfo.state === "FL" }, vars)).toBeTruthy();
  }
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[0].content.paymentSource.creditCardInfo.billingContactInfo.state === "FL" }, vars)).toBeTruthy();
  if ((() => { const user = vars.user
return user === "new" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[0].content.payerInfo.address === `${vars.street}` }, vars)).toBeTruthy();
  }
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[0].content.paymentSource.creditCardInfo.billingContactInfo.address1 === `${vars.street}` }, vars)).toBeTruthy();
  if ((() => { const user = vars.user
return user === "new" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[0].content.payerInfo.address2 === `${vars.address2}` }, vars)).toBeTruthy();
  }
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[0].content.paymentSource.creditCardInfo.billingContactInfo.address2 === `${vars.address2}` }, vars)).toBeTruthy();
  if ((() => { const user = vars.user
return user === "new" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[0].content.payerInfo.city === `${vars.city}` }, vars)).toBeTruthy();
  }
  try {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[0].content.paymentSource.creditCardInfo.billingContactInfo.city === `${vars.city}` }, vars)).toBeTruthy();
  } catch { /* optional step: assertEval */ }
  if ((() => { const user = vars.user
return user === "new" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[0].content.payerInfo.zip === `${vars.zipCode}` }, vars)).toBeTruthy();
  }
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[0].content.paymentSource.creditCardInfo.billingContactInfo.zip === `${vars.zipCode}` }, vars)).toBeTruthy();
  if ((() => { const user = vars.user
return user === "new" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[0].content.paymentSource.creditCardInfo.pfToken === `${vars.pfToken}`  }, vars)).toBeTruthy();
  }
  if ((() => { let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
return (Number(blueSnapVs[0]) == 2 && Number(blueSnapVs[1]) == 6) || Number(blueSnapVs[0]) >= 3 })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[0].content.threeDSecure.threeDSecureReferenceId != "" }, vars)).toBeTruthy();
  }
  if ((() => { const test = vars.test

return test === "subscription" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[0].content.scheduled === true }, vars)).toBeTruthy();
  }
  vars.chargeId = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[1].content.chargeId }, vars);
  vars.subsID = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[1].content.subscriptionId  }, vars);
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[1].content.merchantTransactionId === `${vars.orderNumber}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[1].content.transactionId === `${vars.transaction_id}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[1].content.softDescriptor === "BLS*BSTEST2-WPE" || logs[1].content.softDescriptor === "BLS*BSTEST2-wpe" }, vars)).toBeTruthy();
  if ((() => { const test = vars.test
return test === "subscription" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[1].content.amount === vars.total }, vars)).toBeTruthy();
  }
  if ((() => { const test = vars.test
return test === "preorder" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return Number(logs[1].content.amount) === 0.00 }, vars)).toBeTruthy();
  }
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[1].content.paymentSource.creditCardInfo.billingContactInfo.firstName === `${vars.firstName}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[1].content.paymentSource.creditCardInfo.billingContactInfo.lastName === `${vars.lastName}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[1].content.paymentSource.creditCardInfo.billingContactInfo.country === "us" }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[1].content.paymentSource.creditCardInfo.billingContactInfo.state === "FL" }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[1].content.paymentSource.creditCardInfo.billingContactInfo.address1 === `${vars.street}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[1].content.paymentSource.creditCardInfo.billingContactInfo.address2 === `${vars.address2}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[1].content.paymentSource.creditCardInfo.billingContactInfo.city === `${vars.city}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[1].content.paymentSource.creditCardInfo.billingContactInfo.zip === `${vars.zipCode}` }, vars)).toBeTruthy();
  vars.vaultedShopperId = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[1].content.vaultedShopperId }, vars);
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[1].content.paymentSource.creditCardInfo.creditCard.cardLastFourDigits === `${vars.fourDigits}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[1].content.paymentSource.creditCardInfo.creditCard.cardType === `${vars.ShortName}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[1].content.paymentSource.creditCardInfo.creditCard.expirationMonth === `${vars.month}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
const AE_year = "20"+`${vars.year}`
return logs[1].content.paymentSource.creditCardInfo.creditCard.expirationYear === AE_year }, vars)).toBeTruthy();
  if ((() => { const user = vars.user
return user === "new" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
const threeDS = "AUTHENTICATION_UNAVAILABLE"


return logs[1].content.threeDSecure.authenticationResult === threeDS }, vars)).toBeTruthy();
  }
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[1].content.processingInfo.processingStatus === "SUCCESS" }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[1].content.chargeInfo.chargeType === "INITIAL" }, vars)).toBeTruthy();
}

// GI: "Verify No Vaulted Shopper Request" (60e752b0ed68ff179648d89c)
export async function verifyNoVaultedShopperRequest(page: Page, vars: Record<string, string> = {}): Promise<void> {
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return Object.keys(logs).length === 0 }, vars)).toBeTruthy();
}

// GI: "Verify Tax and Totals on Cart and Checkout" (65c0ddebc80ecf94ff05a002)
export async function verifyTaxAndTotalsOnCartAndCheckout(page: Page, vars: Record<string, string> = {}): Promise<void> {
  if ((() => { let includeTax = vars.includeTax
return includeTax === "no" })()) {
    vars.taxTotals = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') });  function convertCurrencyToNumber(currencyString, decimal = '') {
      // Remove non-numeric characters (except the decimal point and comma)
      const numericString = currencyString.replace(/[^0-9.,]/g, '');
      let numericValue;
      // Replace commas with dots (for consistency) and convert the numeric string to a JavaScript number
      if (decimal === ',') {
          numericValue = parseFloat(numericString.replace('.','').replace(',','.'));
      } else {
          numericValue = parseFloat(numericString.replace(',',''));
      }
      return numericValue;
  }
  
  //let content = Array.from<any>(document.querySelectorAll<HTMLTableCellElement>("td > .woocommerce-Price-amount.amount, span > .woocommerce-Price-amount.amount, .cart-contents .woocommerce-Price-amount.amount"))
let priceProductList = Array.from<any>(document.querySelectorAll<HTMLTableRowElement>("tr.cart_item .woocommerce-Price-amount.amount, .wc-block-components-order-summary-item__description .wc-block-components-order-summary-item__individual-price, .wc-block-components-product-details__sign-up-fee > .wc-block-components-product-details__value"))
let discountList = Array.from<any>(document.querySelectorAll<HTMLTableRowElement>("tr.cart-discount .woocommerce-Price-amount.amount, .wc-block-components-totals-discount .wc-block-components-formatted-money-amount"))
let shippingList = Array.from<any>(document.querySelectorAll<HTMLTableRowElement>("tr.shipping .woocommerce-Price-amount.amount, .wc-block-components-totals-shipping .wc-block-formatted-money-amount"))

let result = []

result.push(priceProductList[priceProductList.length-2].textContent)
result.push(priceProductList[priceProductList.length-1].textContent)
result.push(discountList[0].textContent)
result.push(discountList[1].textContent)
result.push(shippingList[0]?.textContent || '0')
result.push(shippingList[shippingList.length-1]?.textContent || '0')



  let parts = vars.parts
  let n = 0
  let curr = `${vars.curr}`
  let isCurrencySymbol
  const symbol = parts.find(part => part.type === 'currency').value
  let length = result.length
  
  while (result.length > n) {
    if (curr === 'JPY') {
        result[n] = convertCurrencyToNumber(result[n])
    } else {
        result[n] = convertCurrencyToNumber(result[n], parts.find(part => part.type === 'decimal').value)
    }
    n++
  }
  //tax total Calculation
  let subtotal = result[0]+result[1]
  let discount = result[2]
  let shipping = result[4]
  let recurringSubtotal = result[0]
  let recurringDiscount = result[3]
  let recurringShipping = result[5]
  let tax = (Math.round((subtotal - discount) * 0.1 * 100)/100) + (Math.round(shipping * 0.1 * 100)/100)
  let recurringTax = (Math.round((recurringSubtotal - recurringDiscount) * 0.1 * 100)/100) + (Math.round(recurringShipping * 0.1 * 100)/100)
  let total = Intl.NumberFormat(`${vars.locale}`, { style: 'currency', currency: `${vars.currency}`}).format((subtotal-discount)+shipping+tax)
  let recurringTotal = Intl.NumberFormat(`${vars.locale}`, { style: 'currency', currency: `${vars.currency}`}).format((recurringSubtotal-recurringDiscount)+recurringShipping+recurringTax)
  tax = Intl.NumberFormat(`${vars.locale}`, { style: 'currency', currency: `${vars.currency}`}).format(tax)
  recurringTax = Intl.NumberFormat(`${vars.locale}`, { style: 'currency', currency: `${vars.currency}`}).format(recurringTax)
  subtotal = Intl.NumberFormat(`${vars.locale}`, { style: 'currency', currency: `${vars.currency}`}).format(subtotal)
  recurringSubtotal = Intl.NumberFormat(`${vars.locale}`, { style: 'currency', currency: `${vars.currency}`}).format(recurringSubtotal)
  
  
  let totals = [tax,recurringTax,total,recurringTotal,subtotal,recurringSubtotal]

  return totals }, vars);
  }
  if ((() => { let includeTax = vars.includeTax
return includeTax === "yes" })()) {
    vars.taxTotals = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') });  function convertCurrencyToNumber(currencyString, decimal = '') {
      // Remove non-numeric characters (except the decimal point and comma)
      const numericString = currencyString.replace(/[^0-9.,]/g, '');
      let numericValue;
      // Replace commas with dots (for consistency) and convert the numeric string to a JavaScript number
      if (decimal === ',') {
          numericValue = parseFloat(numericString.replace('.','').replace(',','.'));
      } else {
          numericValue = parseFloat(numericString.replace(',',''));
      }
      return numericValue;
  }
  
let priceProductList = Array.from<any>(document.querySelectorAll<HTMLTableRowElement>("tr.cart_item .woocommerce-Price-amount.amount, .wc-block-components-order-summary-item__description .wc-block-components-order-summary-item__individual-price, .wc-block-components-product-details__sign-up-fee > .wc-block-components-product-details__value"))
let discountList = Array.from<any>(document.querySelectorAll<HTMLTableRowElement>("tr.cart-discount .woocommerce-Price-amount.amount, .wc-block-components-totals-discount .wc-block-components-formatted-money-amount"))
let shippingList = Array.from<any>(document.querySelectorAll<HTMLTableRowElement>("tr.shipping .woocommerce-Price-amount.amount, .wc-block-components-totals-shipping .wc-block-formatted-money-amount"))

let result = []

result.push(priceProductList[priceProductList.length-2].textContent)
result.push(priceProductList[priceProductList.length-1].textContent)
result.push(discountList[0].textContent)
result.push(discountList[1].textContent)
result.push(shippingList[0]?.textContent || '0')
result.push(shippingList[shippingList.length-1]?.textContent || '0')

  let parts = vars.parts
  let n = 0
  let curr = `${vars.curr}`
  let isCurrencySymbol
  const symbol = parts.find(part => part.type === 'currency').value
  let length = result.length
  
  while (result.length > n) {
    if (curr === 'JPY') {
        result[n] = convertCurrencyToNumber(result[n])
    } else {
        result[n] = convertCurrencyToNumber(result[n], parts.find(part => part.type === 'decimal').value)
    }
    n++
  }
  //tax total Calculation
  let subtotal = result[0]+result[1]
  let discount = result[2]
  let shipping = result[4]
  let recurringSubtotal = result[0]
  let recurringDiscount = result[3]
  let recurringShipping = result[5]
  let tax = (Math.round(((subtotal - discount)/1.1*0.1)*100)/100)+(Math.round((shipping/1.1*0.1)*100)/100)
  let recurringTax = (Math.round(((recurringSubtotal-recurringDiscount)/1.1*0.1)*100)/100) + (Math.round((recurringShipping/1.1*0.1)*100)/100)
  let total = Intl.NumberFormat(`${vars.locale}`, { style: 'currency', currency: `${vars.currency}`}).format((subtotal-discount)+shipping)
  let recurringTotal = Intl.NumberFormat(`${vars.locale}`, { style: 'currency', currency: `${vars.currency}`}).format((recurringSubtotal-recurringDiscount)+recurringShipping)
  tax = Intl.NumberFormat(`${vars.locale}`, { style: 'currency', currency: `${vars.currency}`}).format(tax)
  recurringTax = Intl.NumberFormat(`${vars.locale}`, { style: 'currency', currency: `${vars.currency}`}).format(recurringTax)
  subtotal = Intl.NumberFormat(`${vars.locale}`, { style: 'currency', currency: `${vars.currency}`}).format(subtotal)
  recurringSubtotal = Intl.NumberFormat(`${vars.locale}`, { style: 'currency', currency: `${vars.currency}`}).format(recurringSubtotal)
  
  
  let totals = [tax,recurringTax,total,recurringTotal,subtotal,recurringSubtotal]

  return totals }, vars);
  }
  vars.tax = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let taxTotals = vars.taxTotals
return taxTotals[0] }, vars);
  vars.recurringTax = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let taxTotals = vars.taxTotals
return taxTotals[1] }, vars);
  vars.total = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let taxTotals = vars.taxTotals
return taxTotals[2] }, vars);
  vars.recurringTotal = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let taxTotals = vars.taxTotals
return taxTotals[3] }, vars);
  vars.subtotal = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let taxTotals = vars.taxTotals
return taxTotals[4] }, vars);
  vars.recurringSubtotal = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let taxTotals = vars.taxTotals
return taxTotals[5] }, vars);
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let blueSnapVs = `${vars.BlueSnapVs}`
const blocks = !!document.querySelector('.wc-block-checkout, .wc-block-cart')
blueSnapVs = blueSnapVs.split('.');
return (blueSnapVs[0] >= 3 && blueSnapVs[1] >= 2 
        &&
        !blocks) 
        || 
        (blueSnapVs[0] >= 3 && blueSnapVs[1] >= 5 
        &&
        blocks) }, vars)) {
    await expect(page.locator(`tr.order-total:not(.recurring-total) strong > .woocommerce-Price-amount.amount`).or(page.locator(`.wc-block-components-totals-footer-item .wc-block-formatted-money-amount`)).first()).toHaveText(`${vars.total ?? ''}`);
  }
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let blueSnapVs = `${vars.BlueSnapVs}`
const blocks = !!document.querySelector('.wc-block-checkout, .wc-block-cart')
blueSnapVs = blueSnapVs.split('.');

return  !blocks 
        || 
        (blueSnapVs[0] >= 3 && blueSnapVs[1] >= 5 
        &&
        blocks) }, vars)) {
    await expect(page.locator(`tr.order-total.recurring-total strong > .woocommerce-Price-amount.amount`).or(page.locator(`.wcs-recurring-totals-panel__details-total .wc-block-formatted-money-amount`)).first()).toHaveText(`${vars.recurringTotal ?? ''}`);
  }
  if ((() => { let includeTax = vars.includeTax
return includeTax === "no" })()) {
    await expect(page.locator(`tr.tax-rate:not(.recurring-total) .woocommerce-Price-amount.amount`).or(page.locator(`div.wp-block-woocommerce-checkout-order-summary-totals-block:not(.wcs-recurring-totals-panel__details) > div > div.wc-block-components-totals-taxes > .wc-block-formatted-money-amount`)).or(page.locator(`div.wp-block-woocommerce-cart-order-summary-totals-block:not(.wcs-recurring-totals-panel__details) > div > div.wc-block-components-totals-taxes > .wc-block-formatted-money-amount`)).first()).toHaveText(`${vars.tax ?? ''}`);
  }
  if ((() => { let includeTax = vars.includeTax
return includeTax === "no" })()) {
    await expect(page.locator(`tr.tax-rate.recurring-total .woocommerce-Price-amount.amount`).or(page.locator(`.wcs-recurring-totals-panel__details .wc-block-components-totals-taxes > .wc-block-formatted-money-amount`)).first()).toHaveText(`${vars.recurringTax ?? ''}`);
  }
  if ((() => { let includeTax = vars.includeTax
return includeTax === "yes" })()) {
    await expect(page.locator(`tr.order-total:not(.recurring-total) small > .woocommerce-Price-amount.amount`).or(page.locator(`.wc-block-components-totals-footer-item-tax`)).first()).toContainText(`${vars.tax ?? ''}`);
  }
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const blocks = !!document.querySelector('.wc-block-checkout, .wc-block-cart')
let includeTax = `${vars.includeTax}`
return !blocks && includeTax === "yes" }, vars)) {
    await expect(page.locator(`tr.order-total.recurring-total small > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.recurringTax ?? ''}`);
  }
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let blueSnapVs = `${vars.BlueSnapVs}`
const blocks = !!document.querySelector('.wc-block-checkout, .wc-block-cart')
blueSnapVs = blueSnapVs.split('.');
return (blueSnapVs[0] >= 3 && blueSnapVs[1] >= 2 
        &&
        !blocks) 
        || 
        (blueSnapVs[0] >= 3 && blueSnapVs[1] >= 5 
        &&
        blocks) }, vars)) {
    await expect(page.locator(`tr.cart-subtotal:not(.recurring-total) .woocommerce-Price-amount.amount`).or(page.locator(`.wp-block-woocommerce-cart-order-summary-block > div:nth-of-type(2) > div:nth-of-type(1) > div:nth-of-type(1) .wc-block-components-totals-item__value`)).first()).toHaveText(`${vars.subtotal ?? ''}`);
  }
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let blueSnapVs = `${vars.BlueSnapVs}`
const blocks = !!document.querySelector('.wc-block-checkout, .wc-block-cart')
blueSnapVs = blueSnapVs.split('.');

return  (blueSnapVs[0] >= 3 && blueSnapVs[1] >= 5 
        &&
        blocks) }, vars)) {
    await expect(page.locator(`.wc-block-cart-item__total .wc-block-components-product-price__value`).first()).toHaveText(`${vars.subtotal ?? ''}`);
  }
  if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let blueSnapVs = `${vars.BlueSnapVs}`
const blocks = !!document.querySelector('.wc-block-checkout, .wc-block-cart')
blueSnapVs = blueSnapVs.split('.');

return  !blocks 
        || 
        (blueSnapVs[0] >= 3 && blueSnapVs[1] >= 5 
        &&
        blocks) }, vars)) {
    await expect(page.locator(`tr.cart-subtotal.recurring-total .woocommerce-Price-amount.amount`).or(page.locator(`.wcs-recurring-totals-panel__details > div:nth-of-type(2) > div:nth-of-type(1) > div:nth-of-type(1) .wc-block-components-totals-item__value`)).first()).toHaveText(`${vars.recurringSubtotal ?? ''}`);
  }
}

// GI: "Verify Vaulted Shopper" (60e74d63ed68ff1796488ae6)
export async function verifyVaultedShopper(page: Page, vars: Record<string, string> = {}): Promise<void> {
  if ((() => { let test = vars.test
return test != "002-012" && test != "002-017" && test != "002-011" && test != "002-012-B" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.request.method === "GET" }, vars)).toBeTruthy();
  }
  if ((() => { let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
let test = vars.test
return test != "002-012" && test != "002-017" && test != "002-011" && test != "002-012-B" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.request.url === `https://sandbox.bluesnap.com/services/2/vaulted-shoppers/${vars.vaultedShopperId}` }, vars)).toBeTruthy();
  }
  if ((() => { let test = vars.test
return test != "002-012" && test != "002-017" && test != "002-011" && test != "002-012-B" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.vaultedShopperId === vars.vaultedShopperId }, vars)).toBeTruthy();
  }
  if ((() => { let test = vars.test
return test === "002-011" || test === "002-012-B" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.request.method === "PUT" }, vars)).toBeTruthy();
  }
  if ((() => { let test = vars.test
return test === "002-011" || test === "002-012-B" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.vaultedShopperId === vars.vaultedShopperId }, vars)).toBeTruthy();
  }
  if ((() => { let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
let test = vars.test
return test === "002-011" || test === "002-012-B" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.request.url === `https://sandbox.bluesnap.com/services/2/vaulted-shoppers/${vars.vaultedShopperId}` }, vars)).toBeTruthy();
  }
  if ((() => { let test = vars.test
return test === "002-012" || test == "002-017" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.request.method === "POST" }, vars)).toBeTruthy();
  }
  if ((() => { let blueSnapVs = vars.BlueSnapVs
blueSnapVs = blueSnapVs.split('.');
let test = vars.test
return test === "002-012" || test == "002-017" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.request.url === "https://sandbox.bluesnap.com/services/2/vaulted-shoppers" }, vars)).toBeTruthy();
  }
  if ((() => { let test = vars.test
return test === "002-012" || test == "002-017" })()) {
    vars.vaultedShopperId = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.vaultedShopperId }, vars);
  }
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.firstName === `${vars.firstName}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.lastName === `${vars.lastName}` }, vars)).toBeTruthy();
  if ((() => { let test = vars.test
return test != "002-012" && test != "002-017" && test != "002-012-B" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.companyName === `${vars.company}` }, vars)).toBeTruthy();
  }
  if ((() => { let test = vars.test
return test === "002-012" || test === "002-017" || test === "002-012-B" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.companyName === undefined }, vars)).toBeTruthy();
  }
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
let email = `${vars.email}`
let email2 = logs.response.email
email = email.toLowerCase()
email2 = email2.toLowerCase()

return email === email2 }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.country === "us" }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.state === "FL" }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.address === `${vars.street}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.address2 === `${vars.address2}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.city === `${vars.city}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.zip === `${vars.zipCode}` }, vars)).toBeTruthy();
  if ((() => { let scenario = vars.scenario
return scenario != "multi-currency" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.shopperCurrency === "USD" }, vars)).toBeTruthy();
  }
  if ((() => { let scenario = vars.scenario
return scenario === "multi-currency" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.shopperCurrency === `${vars.curr}` }, vars)).toBeTruthy();
  }
  if ((() => { let payment = vars.payment
return payment != "ach" })()) {
    vars.length = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.paymentSources.creditCardInfo.length-1 }, vars);
  }
  if ((() => { let payment = vars.payment
return payment != "ach" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs;
let length = vars.length;
let n = 0;
let boolean = false;

function check() {
    while (n <= length) {
        if (logs.response.paymentSources.creditCardInfo[n].creditCard.cardLastFourDigits === `${vars.fourDigits}`) {
        boolean = true
        }
        n++;
    }
    return boolean
}

return check();
 }, vars)).toBeTruthy();
  }
  if ((() => { let payment = vars.payment
return payment != "ach" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs;
let length = vars.length;
let n = 0;
let boolean = false;

function check() {
    while (n <= length) {
        if (logs.response.paymentSources.creditCardInfo[n].creditCard.cardType === `${vars.ShortName}`) {
        boolean = true
        }
        n++;
    }
    return boolean
}

return check();
 }, vars)).toBeTruthy();
  }
  if ((() => { let payment = vars.payment
return payment != "ach" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
const AE_month = `${vars.month}`
let length = vars.length;
let n = 0;
let boolean = false;

function check() {
    while (n <= length) {
        if (logs.response.paymentSources.creditCardInfo[n].creditCard.expirationMonth === AE_month) {
        boolean = true
        }
        n++;
    }
    return boolean
}

return check(); }, vars)).toBeTruthy();
  }
  if ((() => { let payment = vars.payment
return payment != "ach" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs;
const AE_year = "20"+`${vars.year}`;
let length = vars.length;
let n = 0;
let boolean = false;

function check() {
    while (n <= length) {
        if (logs.response.paymentSources.creditCardInfo[n].creditCard.expirationYear === AE_year) {
        boolean = true
        }
        n++;
    }
    return boolean
}

return check(); }, vars)).toBeTruthy();
  }
  if ((() => { let payment = vars.payment
return payment != "ach" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.lastPaymentInfo.paymentMethod === "CC" }, vars)).toBeTruthy();
  }
  if ((() => { let payment = vars.payment
return payment != "ach" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.lastPaymentInfo.creditCard.cardLastFourDigits === `${vars.fourDigits}` }, vars)).toBeTruthy();
  }
  if ((() => { let payment = vars.payment
return payment != "ach" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.lastPaymentInfo.creditCard.cardType === `${vars.ShortName}` }, vars)).toBeTruthy();
  }
  if ((() => { let payment = vars.payment
return payment === "ach" })()) {
    vars.length = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.paymentSources.ecpDetails.length-1 }, vars);
  }
  if ((() => { let payment = vars.payment
return payment === "ach" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs;
let length = vars.length;
let n = 0;
let boolean = false;

function check() {
    while (n <= length) {
        if (logs.response.paymentSources.ecpDetails[n].ecp.accountType === "CONSUMER_CHECKING") {
        boolean = true
        }
        n++;
    }
    return boolean
}

return check();
 }, vars)).toBeTruthy();
  }
  if ((() => { let payment = vars.payment
let trans = vars.trans
return payment === "ach" && trans === "accepted" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs;
let length = vars.length;
let n = 0;
let boolean = false;

function check() {
    while (n <= length) {
        if (logs.response.paymentSources.ecpDetails[n].ecp.publicAccountNumber === "44556") {
        boolean = true
        }
        n++;
    }
    return boolean
}

return check();
 }, vars)).toBeTruthy();
  }
  if ((() => { let payment = vars.payment
let trans = vars.trans
return payment === "ach" && trans === "accepted" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs;
let length = vars.length;
let n = 0;
let boolean = false;

function check() {
    while (n <= length) {
        if (logs.response.paymentSources.ecpDetails[n].ecp.publicRoutingNumber === "77665") {
        boolean = true
        }
        n++;
    }
    return boolean
}

return check();
 }, vars)).toBeTruthy();
  }
  if ((() => { let payment = vars.payment
let trans = vars.trans
let test = vars.test
return payment === "ach" && trans === "accepted" && test === "002-012-B" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs;
let length = vars.length;
let n = 0;
let boolean = false;

function check() {
    while (n <= length) {
        if (logs.response.paymentSources.ecpDetails[n].ecp.publicAccountNumber === "45562") {
        boolean = true
        }
        n++;
    }
    return boolean
}

return check();
 }, vars)).toBeTruthy();
  }
  if ((() => { let payment = vars.payment
let trans = vars.trans
return payment === "ach" && trans === "declined" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs;
let length = vars.length;
let n = 0;
let boolean = false;

function check() {
    while (n <= length) {
        if (logs.response.paymentSources.ecpDetails[n].ecp.publicAccountNumber === "56789") {
        boolean = true
        }
        n++;
    }
    return boolean
}

return check();
 }, vars)).toBeTruthy();
  }
  if ((() => { let payment = vars.payment
let trans = vars.trans
return payment === "ach" && trans === "declined" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs;
let length = vars.length;
let n = 0;
let boolean = false;

function check() {
    while (n <= length) {
        if (logs.response.paymentSources.ecpDetails[n].ecp.publicRoutingNumber === "54321") {
        boolean = true
        }
        n++;
    }
    return boolean
}

return check();
 }, vars)).toBeTruthy();
  }
}

// GI: "Verify Vaulted Shopper - ACH - Delete Payment method on My Account" (621d2f59ee28e97e1a3ff3d5)
export async function verifyVaultedShopperACHDeletePaymentMethodOnMyAccount(page: Page, vars: Record<string, string> = {}): Promise<void> {
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.request.type === "request" }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.request.method === "PUT" }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.request.url === `https://sandbox.bluesnap.com/services/2/vaulted-shoppers/${vars.vaultedShopperId}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
 
return logs.request.content.paymentSources.ecpDetails[0].ecp.accountType === "CONSUMER_CHECKING" }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.request.content.paymentSources.ecpDetails[0].ecp.publicAccountNumber === "44556" }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.request.content.paymentSources.ecpDetails[0].ecp.publicRoutingNumber === "77665" }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.request.content.paymentSources.ecpDetails[0].status === "D" }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.paymentSources.ecpDetails === undefined  }, vars)).toBeTruthy();
}

// GI: "Verify Vaulted Shopper - Add Payment method on My Account" (617bf306e3892d651a451943)
export async function verifyVaultedShopperAddPaymentMethodOnMyAccount(page: Page, vars: Record<string, string> = {}): Promise<void> {
  if ((() => { let test = vars.test
return test === "BLU-001-013" || test === "BLU-001-073" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[0].method === "POST" }, vars)).toBeTruthy();
  }
  if ((() => { let test = vars.test
return test === "BLU-001-013" || test === "BLU-001-073" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[0].url === "https://sandbox.bluesnap.com/services/2/vaulted-shoppers" }, vars)).toBeTruthy();
  }
  if ((() => { let test = vars.test
return test === "BLU-001-013" || test === "BLU-001-073" })()) {
    vars.vaultedShopperId = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
let vaultedShopper = logs[1].content.vaultedShopperId;
return vaultedShopper }, vars);
  }
  if ((() => { let test = vars.test
return test === "BLU-001-013" || test === "BLU-001-073" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
let token = logs[0].content.paymentSources.creditCardInfo[0].pfToken;
return token === `${vars.pfToken}` }, vars)).toBeTruthy();
  }
  if ((() => { let test = vars.test
return test === "BLU-001-013-B" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[0].method === "PUT" }, vars)).toBeTruthy();
  }
  if ((() => { let test = vars.test
return test === "BLU-001-013-B" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[0].url === `https://sandbox.bluesnap.com/services/2/vaulted-shoppers/${vars.vaultedShopperId}` }, vars)).toBeTruthy();
  }
  if ((() => { let test = vars.test
return test === "BLU-001-013-B" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
let vaultedShopper = logs[1].content.vaultedShopperId;
return vaultedShopper === vars.vaultedShopperId }, vars)).toBeTruthy();
  }
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[1].content.email === `${vars.email}` }, vars)).toBeTruthy();
  vars.length = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[1].content.paymentSources.creditCardInfo.length }, vars);
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
const num = vars.length-1
return logs[1].content.paymentSources.creditCardInfo[num].creditCard.cardLastFourDigits === `${vars.fourDigits}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs;
const num = vars.length-1
return logs[1].content.paymentSources.creditCardInfo[num].creditCard.cardType === `${vars.ShortName}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
const AE_month = `${vars.month}`
const num = vars.length-1
return logs[1].content.paymentSources.creditCardInfo[num].creditCard.expirationMonth === AE_month }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
const AE_year = "20"+`${vars.year}`
const num = vars.length-1
return logs[1].content.paymentSources.creditCardInfo[num].creditCard.expirationYear === AE_year }, vars)).toBeTruthy();
  if ((() => { let test = vars.test
return test === "BLU-001-013-B" })()) {
    await useAMEX(page, vars);
  }
  if ((() => { let test = vars.test
return test === "BLU-001-013-B" })()) {
    await extractFourDigitsOfCC(page, vars);
  }
  if ((() => { let test = vars.test
return test === "BLU-001-013-B" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
const num = vars.length-2
return logs[1].content.paymentSources.creditCardInfo[num].creditCard.cardLastFourDigits === `${vars.fourDigits}` }, vars)).toBeTruthy();
  }
  if ((() => { let test = vars.test
return test === "BLU-001-013-B" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs;
const num = vars.length-2
return logs[1].content.paymentSources.creditCardInfo[num].creditCard.cardType === `${vars.ShortName}` }, vars)).toBeTruthy();
  }
  if ((() => { let test = vars.test
return test === "BLU-001-013-B" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
const AE_month = `${vars.month}`
const num = vars.length-2
return logs[1].content.paymentSources.creditCardInfo[num].creditCard.expirationMonth === AE_month }, vars)).toBeTruthy();
  }
  if ((() => { let test = vars.test
return test === "BLU-001-013-B" })()) {
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
const AE_year = "20"+`${vars.year}`
const num = vars.length-2
return logs[1].content.paymentSources.creditCardInfo[num].creditCard.expirationYear === AE_year }, vars)).toBeTruthy();
  }
}

// GI: "Verify Vaulted Shopper - Delete Payment method on My Account" (617ffff4e3892d651aa2e588)
export async function verifyVaultedShopperDeletePaymentMethodOnMyAccount(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.num = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs;
let len = logs.length;

return len
 }, vars);
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.request.type === "request" }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.request.method === "PUT" }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.request.url === `https://sandbox.bluesnap.com/services/2/vaulted-shoppers/${vars.vaultedShopperId}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
 
return logs.request.content.paymentSources.creditCardInfo[0].creditCard.cardType === `${vars.ShortName}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.request.content.paymentSources.creditCardInfo[0].creditCard.cardLastFourDigits === `${vars.fourDigits}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.request.content.paymentSources.creditCardInfo[0].status === "D" }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs.response.paymentSources.creditCardInfo.length === 1 }, vars)).toBeTruthy();
}

// GI: "Verify Vaulted Shopper - New shopper - add payment" (60f18f1bb0cb3f6a9af82699)
export async function verifyVaultedShopperNewShopperAddPayment(page: Page, vars: Record<string, string> = {}): Promise<void> {
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[0].method === "GET" }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[0].url === `https://sandbox.bluesnap.com/services/2/vaulted-shoppers/${vars.vaultedShopperId}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[1].content.vaultedShopperId === vars.vaultedShopperId }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[1].content.firstName === `${vars.firstName}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[1].content.lastName === `${vars.lastName}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[1].content.companyName === `${vars.company}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[1].content.email === `${vars.email}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[1].content.country === "us" }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[1].content.state === "FL" }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[1].content.address === `${vars.street}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[1].content.address2 === `${vars.address2}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[1].content.city === `${vars.city}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[1].content.zip === `${vars.zipCode}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[1].content.shopperCurrency === "USD" }, vars)).toBeTruthy();
  vars.length = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[1].content.paymentSources.creditCardInfo.length }, vars);
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
const num = vars.length-1
return logs[1].content.paymentSources.creditCardInfo[num].creditCard.cardLastFourDigits === `${vars.fourDigits}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs;
const num = vars.length-1
return logs[1].content.paymentSources.creditCardInfo[num].creditCard.cardType === `${vars.CC_ShortName}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
const AE_month = `${vars.month}`
const num = vars.length-1
return logs[1].content.paymentSources.creditCardInfo[num].creditCard.expirationMonth === AE_month }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
const AE_year = "20"+`${vars.year}`
const num = vars.length-1
return logs[1].content.paymentSources.creditCardInfo[num].creditCard.expirationYear === AE_year }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[1].content.lastPaymentInfo.paymentMethod === "CC" }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[1].content.lastPaymentInfo.creditCard.cardLastFourDigits === `${vars.fourDigits}` }, vars)).toBeTruthy();
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const logs = vars.logs
return logs[1].content.lastPaymentInfo.creditCard.cardType === `${vars.CC_ShortName}` }, vars)).toBeTruthy();
}
