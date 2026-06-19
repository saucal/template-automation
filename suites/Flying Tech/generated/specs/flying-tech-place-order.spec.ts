// @ts-nocheck
// Auto-generated from Ghost Inspector suite: "Flying Tech - Place order"
// Review all TODOs before running.
import dotenv from 'dotenv';
dotenv.config();
import { test, expect } from '@playwright/test';
import { blockUI, extractUserFromEmail, login } from '../helpers/common-steps-for-all-projects';

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

test.describe('Flying Tech - Place order', () => {

  const vars = new Proxy<Record<string, string>>({
    "email": `qa+gi_order_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "emailReg": `qa+gi_reg_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "emailForgot": `qa+gi_forgot_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "payPalUser": "qa+gi_sb-8eg0v132169@saucal.com",
    "payPalPass": process.env.PAY_PAL_PASS ?? '',
    "project": "flyingTech",
    "Symbol": "£",
    "countryComplete": "United Kingdom (UK)",
    "country": "UK",
    "zipCode": "CF24 4NN",
    "street": "52a Crwys Road",
    "county": "South Glamorgan",
    "street2": "Ap. 4",
    "city": "Cardiff",
    "street3": "54a Crwys Road",
    "adminUser": "guest+maintenanceAdmin@saucal.com",
    "adminPass": process.env.ADMIN_PASS ?? '',
    "street4": "AP. 6",
    "phone": "1231231234",
    "company2": "Shipping",
    "site": "https://khrff7b2hz-staging.onrocket.site/",
    "firstName": "QA",
    "password": process.env.PASSWORD ?? '',
    "lastName": `${Math.random().toString(36).substring(2, 10)}`,
    "company": "Testing",
  }, { get: (o: Record<string, string>, k: string) => (k in o ? o[k] : '') });

  test('01 - Place order', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.locator(`.wd-sticky-nav-title`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`.menu-item.menu-item-type-taxonomy.menu-item-object-product_cat.item-level-0.menu-simple-dropdown > a[href*="/product-category/pre-built-drones-kits/"].woodmart-nav-link`).filter({ visible: true }).first().click({ force: true });
    await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const firstProductTop = Array.from<any>(document.querySelectorAll(
  "div.products > div.wd-product:not(.outofstock) > div > .product-element-top.wd-quick-shop"
))[1];

// Hover over the first product (requires a library like Playwright or Puppeteer for true hover simulation)
if (firstProductTop) {
  firstProductTop.dispatchEvent(new MouseEvent("mouseover", { bubbles: true, cancelable: true }));

  // Select the link inside and click it
  const firstLink = firstProductTop.querySelector("a");
  if (firstLink) {
    firstLink.click();
    console.log("Hovered and clicked the first product's link!");
  } else {
    console.log("No link found inside the first product.");
  }
} else {
  console.log("No product found to hover or click.");
} }, vars);
    await page.waitForLoadState('load');
    vars.prodDesc = ((await page.locator(`h1.product_title`).textContent()) ?? '').trim();
    vars.variable = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let version = document.querySelector('#version')
if (version === null) {
    return false
} else {
    return true
}
 }, vars);
    if (vars.variable) {
      {
        const _lbl = page.locator(`label[for="version"]`).filter({ visible: true });
        if (await _lbl.count() > 0) { await _lbl.first().click(); }
        else { await page.locator(`#version`).filter({ visible: true }).first().click({ force: true }); }
      }
    }
    if (vars.variable) {
      vars.version = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); // Select the form element
const form = document.querySelector('.variations_form');

// Get the data-product_variations attribute
const variationsData = form.getAttribute('data-product_variations');

// Parse the JSON string into a JavaScript object
const variations = JSON.parse(variationsData);

// Filter the available variations
const availableVariations = variations.filter(variation => variation.is_in_stock && variation.variation_is_active);

return availableVariations[0].attributes.attribute_version
 }, vars);
    }
    if (vars.variable) {
      try { await page.locator(`#version`).first().fill(`${vars.version ?? ''}`); } catch { await page.locator(`#version`).first().selectOption(`${vars.version ?? ''}`); }
    }
    vars.unitPrice = ((await page.locator(`.woocommerce-variation-price > .price > ins > .woocommerce-Price-amount.amount > bdi`).or(page.locator(`.woocommerce-variation-price > .price > .woocommerce-Price-amount.amount > bdi`)).or(page.locator(`ddiv.summary-inner > .price > ins > .woocommerce-Price-amount.amount > bdi`)).or(page.locator(`div.summary-inner > .price > .woocommerce-Price-amount.amount > bdi`)).textContent()) ?? '').trim();
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let sku = document.querySelector('.sku')
return sku !== null }, vars)) {
      vars.sku = ((await page.locator(`.sku`).textContent()) ?? '').trim();
    }
    await page.locator(`xpath=//button[contains(text(), "Add to cart")]`).or(page.locator(`button[type="submit"].single_add_to_cart_button`)).filter({ visible: true }).first().click({ force: true });
    vars.prodDesc = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let prodDesc = `${vars.prodDesc}`
prodDesc = prodDesc.replaceAll('–','-')
//prodDesc = prodDesc.replaceAll('″','"')


return prodDesc }, vars);
    if (vars.variable) {
      await expect(page.locator(`span.wd-entities-title`).first()).toHaveText(`${vars.prodDesc ?? ''} - ${vars.version ?? ''}`);
    }
    if (false === vars.variable) {
      await expect(page.locator(`span.wd-entities-title`).first()).toHaveText(`${vars.prodDesc ?? ''}`);
    }
    await expect(page.locator(`.woocommerce-mini-cart__total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    await page.locator(`xpath=//a[contains(text(), "Checkout")]`).or(page.locator(`a[href*="/checkout/"]`)).filter({ visible: true }).first().click({ force: true });
    try { await page.locator(`#billing_first_name`).first().fill(`${vars.firstName ?? ''}`); } catch { await page.locator(`#billing_first_name`).first().selectOption(`${vars.firstName ?? ''}`); }
    try { await page.locator(`#billing_last_name`).first().fill(`${vars.lastName ?? ''}`); } catch { await page.locator(`#billing_last_name`).first().selectOption(`${vars.lastName ?? ''}`); }
    await page.locator(`.wd-wpb > div:nth-of-type(1) > div > .form-row.idpc_lookup.field > span.woocommerce-input-wrapper:nth-of-type(1) > input[id="idpc_input"][placeholder="Enter your postcode"][aria-label="Search a postcode to retrieve your address"][type="text"].idpc-input`).filter({ visible: true }).first().click({ force: true });
    try { await page.locator(`.wd-wpb > div:nth-of-type(1) > div > .form-row.idpc_lookup.field > span.woocommerce-input-wrapper:nth-of-type(1) > input[id="idpc_input"][placeholder="Enter your postcode"][aria-label="Search a postcode to retrieve your address"][type="text"].idpc-input`).first().fill(`${vars.zipCode ?? ''}`); } catch { await page.locator(`.wd-wpb > div:nth-of-type(1) > div > .form-row.idpc_lookup.field > span.woocommerce-input-wrapper:nth-of-type(1) > input[id="idpc_input"][placeholder="Enter your postcode"][aria-label="Search a postcode to retrieve your address"][type="text"].idpc-input`).first().selectOption(`${vars.zipCode ?? ''}`); }
    await page.waitForTimeout(10000);
    await expect(page.locator(`.wd-wpb > div:nth-of-type(1) > div > .form-row.idpc_lookup.field > span.woocommerce-input-wrapper:nth-of-type(2) > button[id="idpc_button"][type="button"].idpc-button.btn`).first()).toBeVisible();
    await page.locator(`.wd-wpb > div:nth-of-type(1) > div > .form-row.idpc_lookup.field > span.woocommerce-input-wrapper:nth-of-type(2) > button[id="idpc_button"][type="button"].idpc-button.btn`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.wd-wpb > div:nth-of-type(1) > div > .form-row.idpc_lookup.field > span.woocommerce-input-wrapper:nth-of-type(3) > span > select[id="idpc_dropdown"][aria-label="Select your address"]`).first()).toBeVisible();
    await page.locator(`.wd-wpb > div:nth-of-type(1) > div > .form-row.idpc_lookup.field > span.woocommerce-input-wrapper:nth-of-type(3) > span > select[id="idpc_dropdown"][aria-label="Select your address"]`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`xpath=//div[@class='woocommerce-billing-fields']//select[@id='idpc_dropdown']/option[contains(text(), "${vars.street ?? ''}")]`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`#billing_address_1`).first()).toHaveText(`${vars.street ?? ''}`);
    await expect(page.locator(`#billing_city`).first()).toHaveText(`${vars.city ?? ''}`);
    await expect(page.locator(`#billing_state`).first()).toHaveText(`${vars.county ?? ''}`);
    await expect(page.locator(`#billing_postcode`).first()).toHaveText(`${vars.zipCode ?? ''}`);
    try {
      if (false) {
        try { await page.locator(`#billing_company`).first().fill(`${vars.company ?? ''}`); } catch { await page.locator(`#billing_company`).first().selectOption(`${vars.company ?? ''}`); }
      }
    } catch { /* optional step: assign */ }
    try { await page.locator(`#billing_address_2`).first().fill(`${vars.street2 ?? ''}`); } catch { await page.locator(`#billing_address_2`).first().selectOption(`${vars.street2 ?? ''}`); }
    try { await page.locator(`#billing_phone`).first().fill(`${vars.phone ?? ''}`); } catch { await page.locator(`#billing_phone`).first().selectOption(`${vars.phone ?? ''}`); }
    try { await page.locator(`#billing_email`).first().fill(`${vars.email ?? ''}`); } catch { await page.locator(`#billing_email`).first().selectOption(`${vars.email ?? ''}`); }
    await page.locator(`xpath=//span[contains(text(), "Create an account?")]`).or(page.locator(`.form-row.create-account > label.woocommerce-form__label.woocommerce-form__label-for-checkbox.checkbox > span`)).filter({ visible: true }).first().click({ force: true });
    await page.locator(`xpath=//span[contains(text(), "Ship to a different address?")]`).or(page.locator(`#ship-to-different-address > label.woocommerce-form__label.woocommerce-form__label-for-checkbox.checkbox > span`)).filter({ visible: true }).first().click({ force: true });
    try { await page.locator(`#account_password`).first().fill(`${vars.password ?? ''}`); } catch { await page.locator(`#account_password`).first().selectOption(`${vars.password ?? ''}`); }
    try { await page.locator(`#shipping_first_name`).first().fill(`${vars.firstName ?? ''}`); } catch { await page.locator(`#shipping_first_name`).first().selectOption(`${vars.firstName ?? ''}`); }
    try { await page.locator(`#shipping_last_name`).first().fill(`${vars.lastName ?? ''}`); } catch { await page.locator(`#shipping_last_name`).first().selectOption(`${vars.lastName ?? ''}`); }
    try { await page.locator(`.shipping_address > div > .form-row.idpc_lookup.field > span.woocommerce-input-wrapper:nth-of-type(1) > input[id="idpc_input"][placeholder="Enter your postcode"][aria-label="Search a postcode to retrieve your address"][type="text"].idpc-input`).first().fill(`${vars.zipCode ?? ''}`); } catch { await page.locator(`.shipping_address > div > .form-row.idpc_lookup.field > span.woocommerce-input-wrapper:nth-of-type(1) > input[id="idpc_input"][placeholder="Enter your postcode"][aria-label="Search a postcode to retrieve your address"][type="text"].idpc-input`).first().selectOption(`${vars.zipCode ?? ''}`); }
    await page.locator(`.shipping_address > div > .form-row.idpc_lookup.field > span.woocommerce-input-wrapper:nth-of-type(2) > button[id="idpc_button"][type="button"].idpc-button.btn`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`.shipping_address > div > .form-row.idpc_lookup.field > span.woocommerce-input-wrapper:nth-of-type(2) > button[id="idpc_button"][type="button"].idpc-button.btn`).filter({ visible: true }).first().click({ force: true });
    await page.waitForTimeout(2000);
    await expect(page.locator(`.woocommerce-billing-fields span > select[id="idpc_dropdown"][aria-label="Select your address"]`).first()).toBeVisible();
    await page.locator(`.woocommerce-billing-fields span > select[id="idpc_dropdown"][aria-label="Select your address"]`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`xpath=//div[@class='woocommerce-shipping-fields']//select[@id='idpc_dropdown']/option[contains(text(), "${vars.street3 ?? ''}")]`).filter({ visible: true }).first().click({ force: true });
    try { await page.locator(`#shipping_address_2`).first().fill(`${vars.street4 ?? ''}`); } catch { await page.locator(`#shipping_address_2`).first().selectOption(`${vars.street4 ?? ''}`); }
    try {
      if (false) {
        try { await page.locator(`#shipping_company`).first().fill(`${vars.company2 ?? ''}`); } catch { await page.locator(`#shipping_company`).first().selectOption(`${vars.company2 ?? ''}`); }
      }
    } catch { /* optional step: assign */ }
    await expect(page.locator(`#shipping_address_1`).first()).toHaveText(`${vars.street3 ?? ''}`);
    await expect(page.locator(`#shipping_city`).first()).toHaveText(`${vars.city ?? ''}`);
    await expect(page.locator(`#shipping_state`).first()).toHaveText(`${vars.county ?? ''}`);
    await expect(page.locator(`#shipping_postcode`).first()).toHaveText(`${vars.zipCode ?? ''}`);
    try { await page.locator(`#order_comments`).first().fill(`Order testing notes`); } catch { await page.locator(`#order_comments`).first().selectOption(`Order testing notes`); }
    await page.locator(`xpath=//span[contains(text(), "Step 2. Check Order (Click Here)")]`).or(page.locator(`a[href="#1711561135041-fd073c70-bca1"] > .vc_tta-title-text`)).filter({ visible: true }).first().click({ force: true });
    if (vars.variable) {
      await expect(page.locator(`.cart-product-label`).first()).toContainText(`${vars.prodDesc ?? ''} - ${vars.version ?? ''}`);
    }
    if (false ===  vars.variable) {
      await expect(page.locator(`.cart-product-label`).first()).toHaveText(`${vars.prodDesc ?? ''}`);
    }
    await expect(page.locator(`.wd-checkout-prod-total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    vars.subtotal = ((await page.locator(`td > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
    await page.locator(`ul#shipping_method > li:nth-of-type(2) > input`).filter({ visible: true }).first().click({ force: true });
    await blockUI(page, vars);
    vars.shippingPrice = ((await page.locator(`ul#shipping_method > li:nth-of-type(2) > label > .woocommerce-Price-amount.amount > bdi`).or(page.locator(`ul#shipping_method > li:nth-of-type(2) > label`)).textContent()) ?? '').trim();
    vars.total = ((await page.locator(`strong > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
    vars.taxPrice = ((await page.locator(`small.includes_tax > .woocommerce-Price-amount.amount`).textContent()) ?? '').trim();
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const price = parseFloat(`${vars.unitPrice}`.replace(`${vars.Symbol}`,"").replaceAll(",","").trim());
let shippingPrice = `${vars.shippingPrice}`

if (shippingPrice.includes('FREE')) {
    shippingPrice = '0.00'
}

shippingPrice = parseFloat(shippingPrice.replace(`${vars.Symbol}`,"").replaceAll(",","").trim());
const subtotal = parseFloat(`${vars.subtotal}`.replace(`${vars.Symbol}`,"").replaceAll(",","").trim());
const total = parseFloat(`${vars.total}`.replace(`${vars.Symbol}`,"").replaceAll(",","").trim());

let total2 = parseFloat((subtotal + shippingPrice).toFixed(2))

return price === subtotal 
        && total2 === total }, vars)).toBeTruthy();
    await page.locator(`xpath=//span[contains(text(), "Step 3. Payment (Click Here)")]`).or(page.locator(`a[href="#1711561261565-26c82784-a5ba"] > .vc_tta-title-text`)).filter({ visible: true }).first().click({ force: true });
    await page.locator(`xpath=//span[contains(text(), "Step 3. Payment (Click Here)")]`).or(page.locator(`a[href="#1711561261565-26c82784-a5ba"] > .vc_tta-title-text`)).filter({ visible: true }).first().click({ force: true });
    {
      const _lbl = page.locator(`label[for="payment_method_ppcp-credit-card-gateway"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#payment_method_ppcp-credit-card-gateway`).filter({ visible: true }).first().click({ force: true }); }
    }
    await blockUI(page, vars);
    try { await page.locator(`iframe[title="paypal_card_number_field"]`).first().contentFrame().locator(`input[name="number"]`).first().fill(`4462603040971339`); } catch { await page.locator(`iframe[title="paypal_card_number_field"]`).first().contentFrame().locator(`input[name="number"]`).first().selectOption(`4462603040971339`); }
    try { await page.locator(`iframe[title="paypal_card_expiry_field"]`).first().contentFrame().locator(`input[name="expiry"]`).first().fill(`11/28`); } catch { await page.locator(`iframe[title="paypal_card_expiry_field"]`).first().contentFrame().locator(`input[name="expiry"]`).first().selectOption(`11/28`); }
    try { await page.locator(`iframe[title="paypal_card_cvv_field"]`).first().contentFrame().locator(`input[name="cvv"]`).first().fill(`139`); } catch { await page.locator(`iframe[title="paypal_card_cvv_field"]`).first().contentFrame().locator(`input[name="cvv"]`).first().selectOption(`139`); }
    await page.locator(`.woocommerce-terms-and-conditions-checkbox-text`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`button[type="submit"].button.alt.ppcp-dcc-order-button`).filter({ visible: true }).first().click({ force: true });
    try {
      await expect(page.locator(`.paypal-checkout-sandbox`)).not.toHaveCount(0);
    } catch { /* optional step: assertElementPresent */ }
    try {
      await expect(page.locator(`iframe.paypal-checkout-sandbox-iframe iframe.component-frame .loader`)).not.toHaveCount(0);
    } catch { /* optional step: assertElementPresent */ }
    try {
      await expect(page.locator(`iframe.paypal-checkout-sandbox-iframe iframe.component-frame .loader`)).toHaveCount(0);
    } catch { /* optional step: assertElementNotPresent */ }
    try { await page.locator(`iframe.paypal-checkout-sandbox-iframe iframe.component-frame iframe#threedsIframeV2 iframe#threedsIframe #otp`).first().fill(`1234`); } catch { await page.locator(`iframe.paypal-checkout-sandbox-iframe iframe.component-frame iframe#threedsIframeV2 iframe#threedsIframe #otp`).first().selectOption(`1234`); }
    try {
      {
        let _ok = false;
        if (!_ok) { try { await page.locator(`xpath=//iframe[contains(@class, 'paypal-checkout-sandbox-iframe')]//iframe[contains(@class, 'component-frame')]//iframe[@id='threedsIframeV2']//iframe[@id='threedsIframe']//*[contains(text(),'Yes, I Accept')]`).first().click({ force: true }); _ok = true; } catch {} }
        if (!_ok) throw new Error('No clickable candidate matched');
      }
    } catch { /* optional step: click */ }
    await page.locator(`iframe.paypal-checkout-sandbox-iframe iframe.component-frame iframe#threedsIframeV2 iframe#threedsIframe #submit-button`).filter({ visible: true }).first().click({ force: true });
    await blockUI(page, vars);
    vars.orderNumber = ((await page.locator(`.order > strong`).textContent()) ?? '').trim();
    await expect(page.locator(`.email > strong`).first()).toHaveText(`${vars.email ?? ''}`);
    await expect(page.locator(`strong > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.total ?? ''}`);
    await expect(page.locator(`.method > strong`).first()).toContainText(`Credit / Debit Cards`);
    if (vars.variable && vars.sku != '') {
      await expect(page.locator(`td.woocommerce-table__product-name`).first()).toHaveText(`${vars.prodDesc ?? ''} - ${vars.version ?? ''} × 1
SKU: ${vars.sku ?? ''}
Version: 

${vars.version ?? ''}`);
    }
    if (vars.variable && vars.sku === '') {
      await expect(page.locator(`td.woocommerce-table__product-name`).first()).toHaveText(`${vars.prodDesc ?? ''} - ${vars.version ?? ''} × 1
Version: 

${vars.version ?? ''}`);
    }
    if (false === vars.variable && vars.sku != '') {
      await expect(page.locator(`td.woocommerce-table__product-name`).first()).toHaveText(`${vars.prodDesc ?? ''} × 1
SKU: ${vars.sku ?? ''}`);
    }
    if (false === vars.variable && vars.sku === '') {
      await expect(page.locator(`td.woocommerce-table__product-name`).first()).toHaveText(`${vars.prodDesc ?? ''} × 1`);
    }
    await expect(page.locator(`td.woocommerce-table__product-total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    await expect(page.locator(`tfoot > tr:nth-of-type(1) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.subtotal ?? ''}`);
    await expect(page.locator(`tr:nth-of-type(2) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.shippingPrice ?? ''}`);
    await expect(page.locator(`tr:nth-of-type(4) > td`).first()).toContainText(`Credit / Debit Cards`);
    await expect(page.locator(`tr:nth-of-type(3) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.total ?? ''}`);
    await expect(page.locator(`small.includes_tax > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.taxPrice ?? ''}`);
    await expect(page.locator(`tr:nth-of-type(5) > td`).first()).toHaveText(`Order testing notes`);
    await expect(page.locator(`.woocommerce-column.woocommerce-column--1 > address`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.street ?? ''}
${vars.street2 ?? ''}
${vars.city ?? ''}
${vars.county ?? ''}
${vars.zipCode ?? ''}

${vars.phone ?? ''}

${vars.email ?? ''}`);
    if (false) {
      await expect(page.locator(`.woocommerce-column.woocommerce-column--1 > address`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.company ?? ''}
${vars.street ?? ''}
${vars.street2 ?? ''}
${vars.city ?? ''}
${vars.county ?? ''}
${vars.zipCode ?? ''}

${vars.phone ?? ''}

${vars.email ?? ''}`);
    }
    await expect(page.locator(`.woocommerce-column.woocommerce-column--2 > address`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.street3 ?? ''}
${vars.street4 ?? ''}
${vars.city ?? ''}
${vars.county ?? ''}
${vars.zipCode ?? ''}`);
    if (false) {
      await expect(page.locator(`.woocommerce-column.woocommerce-column--2 > address`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.company2 ?? ''}
${vars.street3 ?? ''}
${vars.street4 ?? ''}
${vars.city ?? ''}
${vars.county ?? ''}
${vars.zipCode ?? ''}`);
    }
    await page.locator(`header.whb-header > .whb-main-header > .whb-row.whb-general-header.whb-not-sticky-row.whb-without-bg.whb-border-fullwidth.whb-color-dark > .container > .whb-general-header-inner > div.whb-column:nth-of-type(3) > .wd-header-my-account.wd-tools-element.wd-design-1.wd-account-style-text.whb-vssfpylqqax9pvkfnxoz > a[href*="/my-account/"][title="My account"] > .wd-tools-text`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`nav.woocommerce-MyAccount-navigation > ul > .woocommerce-MyAccount-navigation-link.woocommerce-MyAccount-navigation-link--orders > a[href*="/my-account/orders/"]`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`td.woocommerce-orders-table__cell.woocommerce-orders-table__cell-order-status`).first()).toContainText(`Processing`);
    await expect(page.locator(`td.woocommerce-orders-table__cell > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.total ?? ''}`);
    await page.locator(`xpath=//a[contains(text(), "#${vars.orderNumber ?? ''}")]`).or(page.locator(`td.woocommerce-orders-table__cell.woocommerce-orders-table__cell-order-number > a[href*="/my-account/view-order/${vars.orderNumber ?? ''}/"]`)).filter({ visible: true }).first().click({ force: true });
    if (vars.variable && vars.sku === '') {
      await expect(page.locator(`td.woocommerce-table__product-name`).first()).toHaveText(`${vars.prodDesc ?? ''} - ${vars.version ?? ''} × 1
Version: 

${vars.version ?? ''}`);
    }
    if (vars.variable && vars.sku != '') {
      await expect(page.locator(`td.woocommerce-table__product-name`).first()).toHaveText(`${vars.prodDesc ?? ''} - ${vars.version ?? ''} × 1
SKU: ${vars.sku ?? ''}
Version: 

${vars.version ?? ''}`);
    }
    if (false === vars.variable && vars.sku === '') {
      await expect(page.locator(`td.woocommerce-table__product-name`).first()).toHaveText(`${vars.prodDesc ?? ''} × 1`);
    }
    if (false === vars.variable && vars.sku != '') {
      await expect(page.locator(`td.woocommerce-table__product-name`).first()).toHaveText(`${vars.prodDesc ?? ''} × 1
SKU: ${vars.sku ?? ''}`);
    }
    await expect(page.locator(`td.woocommerce-table__product-total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    await expect(page.locator(`tfoot > tr:nth-of-type(1) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.subtotal ?? ''}`);
    await expect(page.locator(`tr:nth-of-type(2) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.shippingPrice ?? ''}`);
    await expect(page.locator(`tr:nth-of-type(4) > td`).first()).toContainText(`Credit / Debit Cards`);
    await expect(page.locator(`tr:nth-of-type(3) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.total ?? ''}`);
    await expect(page.locator(`small.includes_tax > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.taxPrice ?? ''}`);
    await expect(page.locator(`tr:nth-of-type(5) > td`).first()).toContainText(`Order testing notes`);
    await expect(page.locator(`.woocommerce-column.woocommerce-column--1 > address`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.street ?? ''}
${vars.street2 ?? ''}
${vars.city ?? ''}
${vars.county ?? ''}
${vars.zipCode ?? ''}

${vars.phone ?? ''}

${vars.email ?? ''}`);
    if (false) {
      await expect(page.locator(`.woocommerce-column.woocommerce-column--1 > address`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.company ?? ''}
${vars.street ?? ''}
${vars.street2 ?? ''}
${vars.city ?? ''}
${vars.county ?? ''}
${vars.zipCode ?? ''}

${vars.phone ?? ''}

${vars.email ?? ''}`);
    }
    await expect(page.locator(`.woocommerce-column.woocommerce-column--2 > address`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.street3 ?? ''}
${vars.street4 ?? ''}
${vars.city ?? ''}
${vars.county ?? ''}
${vars.zipCode ?? ''}`);
    if (false) {
      await expect(page.locator(`.woocommerce-column.woocommerce-column--2 > address`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.company2 ?? ''}
${vars.street3 ?? ''}
${vars.street4 ?? ''}
${vars.city ?? ''}
${vars.county ?? ''}
${vars.zipCode ?? ''}`);
    }
  });

  test('02 - Place order - Email', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    vars.username = `${vars.email ?? ''}`;
    await extractUserFromEmail(page, vars);
    await page.locator(`xpath=//a[contains(text(), "Your Flying Tech order has been received!")]`).filter({ visible: true }).first().click({ force: true });
    if (false === vars.variable) {
      await expect(page.locator(`tr.order_item > td.td:nth-of-type(1)`).first()).toContainText(`${vars.prodDesc ?? ''}`);
    }
    if (vars.variable) {
      await expect(page.locator(`tr.order_item > td.td:nth-of-type(1)`).first()).toHaveText(`${vars.prodDesc ?? ''} - ${vars.version ?? ''}
Version:

${vars.version ?? ''}`);
    }
    await expect(page.locator(`td.td:nth-of-type(3) > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    await expect(page.locator(`tfoot > tr:nth-of-type(1) > td.td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.subtotal ?? ''}`);
    await expect(page.locator(`tr:nth-of-type(2) > td.td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.shippingPrice ?? ''}`);
    await expect(page.locator(`tr:nth-of-type(4) > td.td`).first()).toContainText(`Credit / Debit Cards`);
    await expect(page.locator(`tr:nth-of-type(3) > td.td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.total ?? ''}`);
    await expect(page.locator(`small.includes_tax > span`).first()).toHaveText(`${vars.taxPrice ?? ''}`);
    await expect(page.locator(`tr:nth-of-type(5) > td.td`).first()).toContainText(`Order testing notes`);
    if (false) {
      await expect(page.locator(`td:nth-of-type(1) > address.address`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.company ?? ''}
${vars.street ?? ''}
${vars.street2 ?? ''}
${vars.city ?? ''}
${vars.county ?? ''}
${vars.zipCode ?? ''}
${vars.phone ?? ''}
${vars.email ?? ''}`);
    }
    await expect(page.locator(`td:nth-of-type(1) > address.address`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.street ?? ''}
${vars.street2 ?? ''}
${vars.city ?? ''}
${vars.county ?? ''}
${vars.zipCode ?? ''}
${vars.countryComplete ?? ''}
${vars.phone ?? ''}
${vars.email ?? ''}`);
    await expect(page.locator(`td:nth-of-type(2) > address.address`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.street3 ?? ''}
${vars.street4 ?? ''}
${vars.city ?? ''}
${vars.county ?? ''}
${vars.zipCode ?? ''}
${vars.countryComplete ?? ''}`);
    if (false) {
      await expect(page.locator(`td:nth-of-type(2) > address.address`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.company2 ?? ''}
${vars.street3 ?? ''}
${vars.street4 ?? ''}
${vars.city ?? ''}
${vars.county ?? ''}
${vars.zipCode ?? ''}`);
    }
  });

  test('03 - Place order - Backend', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.locator(`xpath=//a[contains(text(), "Accept")]`).or(page.locator(`a[href="#"].btn`)).filter({ visible: true }).first().click({ force: true });
    vars.admin = `yes`;
    vars.username = `${vars.adminUser ?? ''}`;
    vars.pass = `${vars.adminPass ?? ''}`;
    await login(page, vars);
    await page.waitForTimeout(5000);
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector<HTMLAnchorElement>('a[href="admin.php?page=wc-admin"] > .wp-menu-name')

return !element }, vars)) {
      await login(page, vars);
    }
    await page.goto(`${vars.startUrl ?? ''}wp-admin/admin.php?page=wc-orders`);
    await page.waitForLoadState('load');
    await expect(page.locator(`tr:nth-of-type(1) > td.order_total.column-order_total > .tips > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.total ?? ''}`);
    await page.locator(`a[href*="/wp-admin/admin.php?page=wc-orders&action=edit&id=${vars.orderNumber ?? ''}"] > strong`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.woocommerce-order-data__meta`).first()).toContainText(`Credit / Debit Cards`);
    await expect(page.locator(`#select2-order_status-container`).first()).toContainText(`Processing`);
    await expect(page.locator(`div.order_data_column:nth-of-type(2) > .address > p:nth-of-type(1)`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.street ?? ''}
${vars.street2 ?? ''}
${vars.city ?? ''}
${vars.county ?? ''}
${vars.zipCode ?? ''}`);
    if (false) {
      await expect(page.locator(`div.order_data_column:nth-of-type(2) > .address > p:nth-of-type(1)`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.company ?? ''}
${vars.street ?? ''}
${vars.street2 ?? ''}
${vars.city ?? ''}
${vars.county ?? ''}
${vars.zipCode ?? ''}`);
    }
    await expect(page.locator(`a[href*="mailto:qa+gi_order_"]`).first()).toHaveText(`${vars.email ?? ''}`);
    await expect(page.locator(`a[href*="tel:"]`).first()).toHaveText(`${vars.phone ?? ''}`);
    await expect(page.locator(`div.order_data_column:nth-of-type(3) > .address > p:nth-of-type(1)`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.street3 ?? ''}
${vars.street4 ?? ''}
${vars.city ?? ''}
${vars.county ?? ''}
${vars.zipCode ?? ''}`);
    if (false) {
      await expect(page.locator(`div.order_data_column:nth-of-type(3) > .address > p:nth-of-type(1)`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.company2 ?? ''}
${vars.street3 ?? ''}
${vars.street4 ?? ''}
${vars.city ?? ''}
${vars.county ?? ''}
${vars.zipCode ?? ''}`);
    }
    await expect(page.locator(`.order_note`).first()).toHaveText(`Customer provided note:
Order testing notes`);
    if (false === vars.variable) {
      await expect(page.locator(`a[href*="/wp-admin/post.php?post="]`).first()).toContainText(`${vars.prodDesc ?? ''}`);
    }
    if (vars.variable) {
      await expect(page.locator(`a[href*="/wp-admin/post.php?post="]`).first()).toContainText(`${vars.prodDesc ?? ''} - ${vars.version ?? ''}`);
    }
    vars.costPrice = ((await page.locator(`td.line_cost > .view > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
    vars.costTax = ((await page.locator(`td.line_tax > .view > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
    vars.costShipping = ((await page.locator(`tr.shipping > td.line_cost > .view > .woocommerce-Price-amount.amount`).textContent()) ?? '').trim();
    vars.costShippingTax = ((await page.locator(`tr.shipping > td.line_tax > .view > .woocommerce-Price-amount.amount`).textContent()) ?? '').trim();
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const price = parseFloat(`${vars.unitPrice}`.replace(`${vars.Symbol}`,"").replaceAll(",","").trim());
let shippingPrice = `${vars.shippingPrice}`

if (shippingPrice.includes('FREE')) {
    shippingPrice = '0.00'
}

shippingPrice = parseFloat(shippingPrice.replace(`${vars.Symbol}`,"").replaceAll(",","").trim());
const tax = parseFloat(`${vars.taxPrice}`.replace(`${vars.Symbol}`,"").replaceAll(",","").trim());
const costPrice = parseFloat(`${vars.costPrice}`.replace(`${vars.Symbol}`,"").replaceAll(",","").trim());
const costTax = parseFloat(`${vars.costTax}`.replace(`${vars.Symbol}`,"").replaceAll(",","").trim());
const costShipping = parseFloat(`${vars.costShipping}`.replace(`${vars.Symbol}`,"").replaceAll(",","").trim());
const costShippingTax = parseFloat(`${vars.costShippingTax}`.replace(`${vars.Symbol}`,"").replaceAll(",","").trim());

let price2 = Number((costPrice + costTax).toFixed(2));
let shippingPrice2 = Number((costShipping + costShippingTax).toFixed(2));
let tax2 = Number((costTax + costShippingTax).toFixed(2));

return price === price 
        && shippingPrice === shippingPrice2
        && tax === tax2 }, vars)).toBeTruthy();
    await expect(page.locator(`table.wc-order-totals:nth-of-type(1) > tbody > tr:nth-of-type(1) > td.total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.costPrice ?? ''}`);
    await expect(page.locator(`.wc-order-data-row.wc-order-totals-items > table.wc-order-totals:nth-of-type(1) > tbody > tr:nth-of-type(2) > td.total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.costShipping ?? ''}`);
    await expect(page.locator(`.wc-order-data-row.wc-order-totals-items > table.wc-order-totals:nth-of-type(1) > tbody > tr:nth-of-type(3) > td.total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.taxPrice ?? ''}`);
    await expect(page.locator(`tr:nth-of-type(4) > td.total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.total ?? ''}`);
    await expect(page.locator(`table.wc-order-totals:nth-of-type(2) > tbody > tr:nth-of-type(1) > td.total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.total ?? ''}`);
  });

  test('04 - Refund by Admin', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.locator(`xpath=//a[contains(text(), "Accept")]`).or(page.locator(`a[href="#"].btn`)).filter({ visible: true }).first().click({ force: true });
    vars.admin = `yes`;
    vars.username = `${vars.adminUser ?? ''}`;
    vars.pass = `${vars.adminPass ?? ''}`;
    await login(page, vars);
    await page.waitForTimeout(5000);
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector<HTMLAnchorElement>('a[href="admin.php?page=wc-admin"] > .wp-menu-name')

return !element }, vars)) {
      await login(page, vars);
    }
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
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const shipping = document.querySelector<HTMLTableRowElement>('tr.shipping > td.line_cost > .view > .woocommerce-Price-amount.amount')

return shipping !== null  }, vars)) {
      vars.shippingPriceWithoutTax = ((await page.locator(`tr.shipping > td.line_cost > .view > .woocommerce-Price-amount.amount`).textContent()) ?? '').trim();
    }
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const shipping = document.querySelector<HTMLTableRowElement>('tr.shipping > td.line_cost > .view > .woocommerce-Price-amount.amount')

return shipping !== null  }, vars)) {
      try { await page.locator(`tr.shipping > td.line_cost > .refund > input.refund_line_total.wc_input_price`).first().fill(`${vars.shippingPriceWithoutTax ?? ''}`); } catch { await page.locator(`tr.shipping > td.line_cost > .refund > input.refund_line_total.wc_input_price`).first().selectOption(`${vars.shippingPriceWithoutTax ?? ''}`); }
    }
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const shipping = document.querySelector<HTMLTableRowElement>('tr.shipping > td.line_tax > .view > .woocommerce-Price-amount.amount')

return shipping !== null }, vars)) {
      vars.shippingTax = ((await page.locator(`tr.shipping > td.line_tax > .view > .woocommerce-Price-amount.amount`).textContent()) ?? '').trim();
    }
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const shipping = document.querySelector<HTMLTableRowElement>('tr.shipping > td.line_tax > .view > .woocommerce-Price-amount.amount')

return shipping !== null }, vars)) {
      try { await page.locator(`tr.shipping > td.line_tax > .refund > input.refund_line_tax.wc_input_price`).first().fill(`${vars.shippingTax ?? ''}`); } catch { await page.locator(`tr.shipping > td.line_tax > .refund > input.refund_line_tax.wc_input_price`).first().selectOption(`${vars.shippingTax ?? ''}`); }
    }
    vars.amount = ((await page.locator(`td.line_tax > .view > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
    vars.amount = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let amount = `${vars.amount}`
amount = amount.replace('£','')
return amount }, vars);
    try { await page.locator(`tr.item > td.line_tax > .refund > input[placeholder="0"][type="text"].refund_line_tax.wc_input_price`).first().fill(`${vars.amount ?? ''}`); } catch { await page.locator(`tr.item > td.line_tax > .refund > input[placeholder="0"][type="text"].refund_line_tax.wc_input_price`).first().selectOption(`${vars.amount ?? ''}`); }
    try { await page.locator(`#refund_reason`).first().fill(`Testing Refund`); } catch { await page.locator(`#refund_reason`).first().selectOption(`Testing Refund`); }
    await expect(page.locator(`button[type="button"].button.button-primary.do-api-refund > .wc-order-refund-amount > .woocommerce-Price-amount.amount`).first()).toContainText(`${vars.total ?? ''}`);
    await page.locator(`button[type="button"].button.button-primary.do-api-refund > .wc-order-refund-amount > .woocommerce-Price-amount.amount`).filter({ visible: true }).first().click({ force: true });
    await blockUI(page, vars);
    await expect(page.locator(`#select2-order_status-container`).first()).toContainText(`Refunded`);
    await expect(page.locator(`tr.refund > td.name`)).not.toHaveCount(0);
    await expect(page.locator(`tr.refund > td.line_cost > .view > .woocommerce-Price-amount.amount`).first()).toHaveText(`-${vars.total ?? ''}`);
    await expect(page.locator(`tr:nth-of-type(1) > td.total.refunded-total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.total ?? ''}`);
    if (vars.project === 'nopong') {
      await expect(page.locator(`li.note.system-note:nth-of-type(3) > .note_content > p`).first()).toContainText(`Refunded ${vars.total ?? ''}`);
    }
    if (vars.project === '2m') {
      await expect(page.locator(`li.note.system-note:nth-of-type(2) > .note_content > p`).first()).toContainText(`Refunded ${vars.totalOrder ?? ''}`);
    }
    if (vars.project === 'cashForeClub') {
      await expect(page.locator(`li.note.system-note:nth-of-type(2) > .note_content > p`).first()).toContainText(`PayPal refund ID:`);
    }
  });

  test('05 - Refund Email', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.goto(`https://email.ghostinspector.com/${vars.userEmailExtract ?? ''}`);
    await page.waitForLoadState('load');
    await page.locator(`xpath=//a[contains(text(), "has been refunded")]`).filter({ visible: true }).first().click({ force: true });
    if (vars.project === 'nopong') {
      await expect(page.locator(`tr:nth-of-type(3) > td.td > .woocommerce-Price-amount.amount`).first()).toHaveText(`-${vars.total ?? ''}`);
    }
    if (vars.project === 'cashForeClub') {
      await expect(page.locator(`tr:nth-of-type(4) > td.td > .woocommerce-Price-amount.amount`).first()).toHaveText(`-${vars.total ?? ''}`);
    }
    await expect(page.locator(`tfoot > tr > td.td > del`).first()).toHaveText(`${vars.total ?? ''}`);
    await expect(page.locator(`tfoot > tr > td.td > ins > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.Symbol ?? ''}0.00`);
  });

});
