// @ts-nocheck
// Auto-generated from Ghost Inspector suite: "PLS - Place Order"
// Review all TODOs before running.
import dotenv from 'dotenv';
dotenv.config();
import { test, expect } from '@playwright/test';
import { blockUI, extractUserFromEmail, fillStripeForm, login } from '../helpers/common-steps-for-all-projects';
import { checkThankYouPageMyAccount } from '../helpers/pls-common-steps';

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

test.describe('PLS - Place Order', () => {

  const vars = new Proxy<Record<string, string>>({
    "email": `qa+gi_order_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "emailReg": `qa+gi_reg_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "emailForgot": `qa+gi_forgot_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "payPalUser": "qa+gi_sb-8eg0v132169@saucal.com",
    "payPalPass": process.env.PAY_PAL_PASS ?? '',
    "adminUser": "saucal_maintenance_admin",
    "adminPass": process.env.ADMIN_PASS ?? '',
    "firstName": "QA",
    "lastName": `${Math.random().toString(36).substring(2, 10)}`,
    "email2": `qa+gi_part2-${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "email3": `qa+gi_part3-${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "city": "Miami",
    "phone2": "123-765-4444",
    "phone3": "123-765-0988",
    "credentials2": "RDA",
    "credentials3": "FTD",
    "zipCode": "33126",
    "street": "123 False",
    "Symbol": "$",
    "countryComplete": "United States (US)",
    "street2": "Ap. 4",
    "phone": "1231231234",
    "project": "pls",
    "company": "Testing Inc.",
    "country": "US",
    "stateComplete": "Florida",
    "state": "FL",
    "firstName2": "QA2",
    "firstName3": "QA3",
    "lastName2": `${Math.random().toString(36).substring(2, 10)}-2`,
    "lastName3": `${Math.random().toString(36).substring(2, 10)}-3`,
    "multiSteps": "yes",
  }, { get: (o: Record<string, string>, k: string) => (k in o ? o[k] : '') });

  test('01 - Place order - Guest user', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    // ↓ PLS - 15 - Checkout page
    // ↓ PLS - 14 - Cart page
    // ↓ PLS - 02 - All Courses
    await page.locator(`li.menu-item.menu-item-type-custom.menu-item-object-custom.menu-item-has-children:nth-of-type(2) > a.menu-link > .menu-text`).or(page.locator(`li.menu-item.menu-item-type-custom.menu-item-object-custom.menu-item-has-children.menu-item--has-toggle:nth-of-type(2) > a > .nav-drop-title-wrap`)).first().hover();
    await page.locator(`xpath=//span[contains(text(), "All CE Courses")]`).or(page.locator(`a[href*="/all-courses/"] > .menu-text`)).or(page.locator(`xpath=//a[contains(text(), "All CE Courses")]`)).or(page.locator(`a[href*="/all-courses/"]`)).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    // ↑ end PLS - 02 - All Courses
    vars.unitPriceComplete = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const firstProductTop = Array.from<any>(document.querySelectorAll(
  "ul.products > li.product-type-subscription.instock .price, ul.products > li.product-type-variable-subscription.instock .price .amount"
))[2];

const unitPriceComplete = firstProductTop.textContent

return unitPriceComplete }, vars);
    await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const firstProductTop = Array.from<any>(document.querySelectorAll(
  "ul.products > li.product-type-subscription.instock, ul.products > li.product-type-variable-subscription.instock"
))[2];

const firstLink = firstProductTop.querySelector("a");

if (firstLink) {
  firstLink.click();
} else {
  console.log("No product found in stock");
} }, vars);
    vars.prodDesc = ((await page.locator(`h1.product_title`).textContent()) ?? '').trim();
    vars.prodDesc = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const desc = `${vars.prodDesc}`.replaceAll('–' , '-')

return desc }, vars);
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector('#pa_choose-subscription_period')

return element !== null && element !== undefined  }, vars)) {
      try { await page.locator(`#pa_choose-subscription_period`).first().fill(`7days`); } catch { await page.locator(`#pa_choose-subscription_period`).first().selectOption(`7days`); }
    }
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector('#pa_choose-subscription_period')

return element !== null && element !== undefined  }, vars)) {
      vars.days = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return document.querySelector<HTMLSelectElement>('select#pa_choose-subscription_period > option[value="7days"]').textContent }, vars);
    }
    await expect(page.locator(`div.woocommerce-variation-price > span > span.woocommerce-Price-amount.amount > bdi`).or(page.locator(`div.woocommerce-variation-price > .price`)).first()).toContainText(`${vars.unitPriceComplete ?? ''}`);
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector<HTMLFormElement>('form > table[aria-label="Product Details"].woocommerce-product-attributes.shop_attributes > tbody > tr.woocommerce-product-attributes-item.woocommerce-product-attributes-item--attribute_pa_date > td.woocommerce-product-attributes-item__value > p')

return element !== null && element !== undefined }, vars)) {
      vars.date = ((await page.locator(`form > table[aria-label="Product Details"].woocommerce-product-attributes.shop_attributes > tbody > tr.woocommerce-product-attributes-item.woocommerce-product-attributes-item--attribute_pa_date > td.woocommerce-product-attributes-item__value > p`).textContent()) ?? '').trim();
    }
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector<HTMLFormElement>('form > table[aria-label="Product Details"].woocommerce-product-attributes.shop_attributes > tbody > tr.woocommerce-product-attributes-item.woocommerce-product-attributes-item--attribute_pa_time-specific > td.woocommerce-product-attributes-item__value > p')

return element !== null && element !== undefined }, vars)) {
      vars.time = ((await page.locator(`form > table[aria-label="Product Details"].woocommerce-product-attributes.shop_attributes > tbody > tr.woocommerce-product-attributes-item.woocommerce-product-attributes-item--attribute_pa_time-specific > td.woocommerce-product-attributes-item__value > p`).textContent()) ?? '').trim();
    }
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector<HTMLAnchorElement>('form > table[aria-label="Product Details"].woocommerce-product-attributes.shop_attributes > tbody > tr.woocommerce-product-attributes-item.woocommerce-product-attributes-item--attribute_pa_location > td.woocommerce-product-attributes-item__value > p > a[href*="/location/"]')

return element !== null && element !== undefined }, vars)) {
      vars.location = ((await page.locator(`form > table[aria-label="Product Details"].woocommerce-product-attributes.shop_attributes > tbody > tr.woocommerce-product-attributes-item.woocommerce-product-attributes-item--attribute_pa_location > td.woocommerce-product-attributes-item__value > p > a[href*="/location/"]`).textContent()) ?? '').trim();
    }
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector<HTMLFormElement>('form > table[aria-label="Product Details"].woocommerce-product-attributes.shop_attributes > tbody > tr.woocommerce-product-attributes-item.woocommerce-product-attributes-item--attribute_pa_ceus > td.woocommerce-product-attributes-item__value > p')

return element !== null && element !== undefined }, vars)) {
      vars.ceus = ((await page.locator(`form > table[aria-label="Product Details"].woocommerce-product-attributes.shop_attributes > tbody > tr.woocommerce-product-attributes-item.woocommerce-product-attributes-item--attribute_pa_ceus > td.woocommerce-product-attributes-item__value > p`).textContent()) ?? '').trim();
    }
    vars.qty = `3`;
    try { await page.locator(`#pl_subscriptions_quantity`).or(page.locator(`input.qty`)).first().fill(`${vars.qty ?? ''}`); } catch { await page.locator(`#pl_subscriptions_quantity`).or(page.locator(`input.qty`)).first().selectOption(`${vars.qty ?? ''}`); }
    if ((() => { const multiSteps = vars.multiSteps

return multiSteps !== 'yes' })()) {
      await page.locator(`label[for="pl_subscriptions_me"]`).filter({ visible: true }).first().click({ force: true });
    }
    if ((() => { const multiSteps = vars.multiSteps

return multiSteps !== 'yes' })()) {
      try { await page.locator(`input[name="pl_recipient_email[0]"]`).first().fill(`${vars.email2 ?? ''}`); } catch { await page.locator(`input[name="pl_recipient_email[0]"]`).first().selectOption(`${vars.email2 ?? ''}`); }
    }
    if ((() => { const multiSteps = vars.multiSteps

return multiSteps !== 'yes' })()) {
      try { await page.locator(`input[name="pl_recipient_firstname[0]"]`).first().fill(`${vars.firstName2 ?? ''}`); } catch { await page.locator(`input[name="pl_recipient_firstname[0]"]`).first().selectOption(`${vars.firstName2 ?? ''}`); }
    }
    if ((() => { const multiSteps = vars.multiSteps

return multiSteps !== 'yes' })()) {
      try { await page.locator(`input[name="pl_recipient_lastname[0]"]`).first().fill(`${vars.lastName2 ?? ''}`); } catch { await page.locator(`input[name="pl_recipient_lastname[0]"]`).first().selectOption(`${vars.lastName2 ?? ''}`); }
    }
    if ((() => { const multiSteps = vars.multiSteps

return multiSteps !== 'yes' })()) {
      try { await page.locator(`input[name="pl_recipient_phone[0]"]`).first().fill(`${vars.phone2 ?? ''}`); } catch { await page.locator(`input[name="pl_recipient_phone[0]"]`).first().selectOption(`${vars.phone2 ?? ''}`); }
    }
    if ((() => { const multiSteps = vars.multiSteps

return multiSteps !== 'yes' })()) {
      try { await page.locator(`select[name="pl_recipient_credentials[0]"]`).first().fill(`${vars.credentials2 ?? ''}`); } catch { await page.locator(`select[name="pl_recipient_credentials[0]"]`).first().selectOption(`${vars.credentials2 ?? ''}`); }
    }
    if ((() => { const multiSteps = vars.multiSteps

return multiSteps !== 'yes' })()) {
      try { await page.locator(`input[name="pl_recipient_email[1]"]`).first().fill(`${vars.email3 ?? ''}`); } catch { await page.locator(`input[name="pl_recipient_email[1]"]`).first().selectOption(`${vars.email3 ?? ''}`); }
    }
    if ((() => { const multiSteps = vars.multiSteps

return multiSteps !== 'yes' })()) {
      try { await page.locator(`input[name="pl_recipient_firstname[1]"]`).first().fill(`${vars.firstName3 ?? ''}`); } catch { await page.locator(`input[name="pl_recipient_firstname[1]"]`).first().selectOption(`${vars.firstName3 ?? ''}`); }
    }
    if ((() => { const multiSteps = vars.multiSteps

return multiSteps !== 'yes' })()) {
      try { await page.locator(`input[name="pl_recipient_lastname[1]"]`).first().fill(`${vars.lastName3 ?? ''}`); } catch { await page.locator(`input[name="pl_recipient_lastname[1]"]`).first().selectOption(`${vars.lastName3 ?? ''}`); }
    }
    if ((() => { const multiSteps = vars.multiSteps

return multiSteps !== 'yes' })()) {
      try { await page.locator(`input[name="pl_recipient_phone[1]"]`).first().fill(`${vars.phone3 ?? ''}`); } catch { await page.locator(`input[name="pl_recipient_phone[1]"]`).first().selectOption(`${vars.phone3 ?? ''}`); }
    }
    if ((() => { const multiSteps = vars.multiSteps

return multiSteps !== 'yes' })()) {
      await expect(page.locator(`select[name="pl_recipient_credentials[1]"]`).first()).toHaveText(`RDH`);
    }
    if ((() => { const multiSteps = vars.multiSteps

return multiSteps !== 'yes' })()) {
      try { await page.locator(`select[name="pl_recipient_credentials[1]"]`).first().fill(`${vars.credentials3 ?? ''}`); } catch { await page.locator(`select[name="pl_recipient_credentials[1]"]`).first().selectOption(`${vars.credentials3 ?? ''}`); }
    }
    await page.locator(`xpath=//button[contains(text(), "Sign up now")]`).or(page.locator(`button[name="add-to-cart"]`)).filter({ visible: true }).first().click({ force: true });
    await page.locator(`xpath=//a[contains(text(), "View cart")]`).or(page.locator(`a.button.wc-forward:not(.checkout)`)).filter({ visible: true }).first().click({ force: true });
    if (vars.days === '') {
      await expect(page.locator(`.ast-product-name > a[href*="/product/"]`).or(page.locator(`tr.woocommerce-cart-form__cart-item.cart_item:nth-of-type(1) > td.product-name > a[href*="/product/"]`)).first()).toHaveText(`${vars.prodDesc ?? ''}`);
    }
    if ((() => { const multiSteps = vars.multiSteps

return multiSteps !== 'yes' && vars.days === '' })()) {
      await expect(page.locator(`.ast-product-name > a[href*="/product/"]`).or(page.locator(`tr.woocommerce-cart-form__cart-item.cart_item:nth-of-type(2) > td.product-name > a[href*="/product/"]`)).first()).toHaveText(`${vars.prodDesc ?? ''}`);
    }
    if ((() => { const multiSteps = vars.multiSteps

return multiSteps !== 'yes' && vars.days === '' })()) {
      await expect(page.locator(`.ast-product-name > a[href*="/product/"]`).or(page.locator(`tr.woocommerce-cart-form__cart-item.cart_item:nth-of-type(3) > td.product-name > a[href*="/product/"]`)).first()).toHaveText(`${vars.prodDesc ?? ''}`);
    }
    if ((() => { const multiSteps = vars.multiSteps

return multiSteps !== 'yes' })()) {
      await expect(page.locator(`tr.woocommerce-cart-form__cart-item.cart_item:nth-of-type(2) > td.product-name > fieldset > .wcsg_add_recipient_fields > .form-row.form-row.woocommerce_subscriptions_gifting_recipient_email > input[placeholder="recipient@example.com"][type="email"].input-text.recipient_email`).first()).toHaveText(`${vars.email2 ?? ''}`);
    }
    if ((() => { const multiSteps = vars.multiSteps

return multiSteps !== 'yes' })()) {
      await expect(page.locator(`tr.woocommerce-cart-form__cart-item.cart_item:nth-of-type(2) > td.product-name > fieldset > .wcsg_add_recipient_fields > p.form-row:nth-of-type(2) > input[type="text"].input-text.recipient_firstname`).first()).toHaveText(`${vars.firstName2 ?? ''}`);
    }
    if ((() => { const multiSteps = vars.multiSteps

return multiSteps !== 'yes' })()) {
      await expect(page.locator(`tr.woocommerce-cart-form__cart-item.cart_item:nth-of-type(2) > td.product-name > fieldset > .wcsg_add_recipient_fields > p.form-row:nth-of-type(3) > input[type="text"].input-text.recipient_lastname`).first()).toHaveText(`${vars.lastName2 ?? ''}`);
    }
    if ((() => { const multiSteps = vars.multiSteps

return multiSteps !== 'yes' })()) {
      await expect(page.locator(`tr.woocommerce-cart-form__cart-item.cart_item:nth-of-type(2) > td.product-name > fieldset > .wcsg_add_recipient_fields > p.form-row:nth-of-type(4) > .iti.iti--separate-dial-code > input[placeholder="201-555-5555"][type="tel"].input-text.pl_phone.recipient_phone`).first()).toHaveText(`${vars.phone2 ?? ''}`);
    }
    if ((() => { const multiSteps = vars.multiSteps

return multiSteps !== 'yes' })()) {
      await expect(page.locator(`tr.woocommerce-cart-form__cart-item.cart_item:nth-of-type(2) > td.product-name > fieldset > .wcsg_add_recipient_fields > p.form-row:nth-of-type(5) > select.input-text.recipient_credentials`).first()).toContainText(`${vars.credentials2 ?? ''}`);
    }
    if ((() => { const multiSteps = vars.multiSteps

return multiSteps !== 'yes' })()) {
      await expect(page.locator(`tr.woocommerce-cart-form__cart-item.cart_item:nth-of-type(3) > td.product-name > fieldset > .wcsg_add_recipient_fields > .form-row.form-row.woocommerce_subscriptions_gifting_recipient_email > input[placeholder="recipient@example.com"][type="email"].input-text.recipient_email`).first()).toContainText(`${vars.email3 ?? ''}`);
    }
    if ((() => { const multiSteps = vars.multiSteps

return multiSteps !== 'yes' })()) {
      await expect(page.locator(`tr.woocommerce-cart-form__cart-item.cart_item:nth-of-type(3) > td.product-name > fieldset > .wcsg_add_recipient_fields > p.form-row:nth-of-type(2) > input[type="text"].input-text.recipient_firstname`).first()).toContainText(`${vars.firstName3 ?? ''}`);
    }
    if ((() => { const multiSteps = vars.multiSteps

return multiSteps !== 'yes' })()) {
      await expect(page.locator(`tr.woocommerce-cart-form__cart-item.cart_item:nth-of-type(3) > td.product-name > fieldset > .wcsg_add_recipient_fields > p.form-row:nth-of-type(3) > input[type="text"].input-text.recipient_lastname`).first()).toContainText(`${vars.lastName3 ?? ''}`);
    }
    if ((() => { const multiSteps = vars.multiSteps

return multiSteps !== 'yes' })()) {
      await expect(page.locator(`tr.woocommerce-cart-form__cart-item.cart_item:nth-of-type(3) > td.product-name > fieldset > .wcsg_add_recipient_fields > p.form-row:nth-of-type(4) > .iti.iti--separate-dial-code > input[placeholder="201-555-5555"][type="tel"].input-text.pl_phone.recipient_phone`).first()).toContainText(`${vars.phone3 ?? ''}`);
    }
    if ((() => { const multiSteps = vars.multiSteps

return multiSteps !== 'yes' })()) {
      await expect(page.locator(`tr.woocommerce-cart-form__cart-item.cart_item:nth-of-type(3) > td.product-name > fieldset > .wcsg_add_recipient_fields > p.form-row:nth-of-type(5) > select.input-text.recipient_credentials`).first()).toContainText(`${vars.credentials3 ?? ''}`);
    }
    if (vars.days !== '') {
      await expect(page.locator(`.ast-product-name > a[href*="/product/"]`).or(page.locator(`tr.woocommerce-cart-form__cart-item.cart_item:nth-of-type(1) > td.product-name > a[href*="/product/"]`)).first()).toContainText(`${vars.days ?? ''}`);
    }
    if (vars.days !== '') {
      await expect(page.locator(`.ast-product-name > a[href*="/product/"]`).or(page.locator(`tr.woocommerce-cart-form__cart-item.cart_item:nth-of-type(1) > td.product-name > a[href*="/product/"]`)).first()).toContainText(`${vars.prodDesc ?? ''}`);
    }
    if ((() => { const multiSteps = vars.multiSteps

return multiSteps !== 'yes' && vars.days !== '' })()) {
      await expect(page.locator(`.ast-product-name > a[href*="/product/"]`).or(page.locator(`tr.woocommerce-cart-form__cart-item.cart_item:nth-of-type(2) > td.product-name > a[href*="/product/"]`)).first()).toContainText(`${vars.days ?? ''}`);
    }
    if ((() => { const multiSteps = vars.multiSteps

return multiSteps !== 'yes' && vars.days !== '' })()) {
      await expect(page.locator(`.ast-product-name > a[href*="/product/"]`).or(page.locator(`tr.woocommerce-cart-form__cart-item.cart_item:nth-of-type(2) > td.product-name > a[href*="/product/"]`)).first()).toContainText(`${vars.prodDesc ?? ''}`);
    }
    if ((() => { const multiSteps = vars.multiSteps

return multiSteps !== 'yes' && vars.days !== '' })()) {
      await expect(page.locator(`.ast-product-name > a[href*="/product/"]`).or(page.locator(`tr.woocommerce-cart-form__cart-item.cart_item:nth-of-type(3) > td.product-name > a[href*="/product/"]`)).first()).toContainText(`${vars.days ?? ''}`);
    }
    if ((() => { const multiSteps = vars.multiSteps

return multiSteps !== 'yes' && vars.days !== '' })()) {
      await expect(page.locator(`.ast-product-name > a[href*="/product/"]`).or(page.locator(`tr.woocommerce-cart-form__cart-item.cart_item:nth-of-type(3) > td.product-name > a[href*="/product/"]`)).first()).toContainText(`${vars.prodDesc ?? ''}`);
    }
    if (false) {
      vars.unitPriceComplete = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const str = `${vars.unitPriceComplete}`;

// Replace "sale ends" with "Sale Ends" and "reg." with "Reg."
const formattedStr = str
    .replace("sale ends", "Sale Ends")
    .replace("reg.", "Reg.");
    
return formattedStr }, vars);
    }
    if ((() => { const multiSteps = vars.multiSteps

return multiSteps !== 'yes' })()) {
      await expect(page.locator(`tr.woocommerce-cart-form__cart-item.cart_item:nth-of-type(3) > td.product-price`).first()).toHaveText(`${vars.unitPriceComplete ?? ''}`);
    }
    if ((() => { const multiSteps = vars.multiSteps

return multiSteps !== 'yes' })()) {
      await expect(page.locator(`tr.woocommerce-cart-form__cart-item.cart_item:nth-of-type(2) > td.product-price`).first()).toHaveText(`${vars.unitPriceComplete ?? ''}`);
    }
    await expect(page.locator(`tr.woocommerce-cart-form__cart-item.cart_item:nth-of-type(1) > td.product-price`).first()).toHaveText(`${vars.unitPriceComplete ?? ''}`);
    vars.unitPrice = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const str = `${vars.unitPriceComplete}`;

// Extract the expiration date (case-insensitive)
const dateMatch = str.match(/sale ends (\d+\/\d+\/\d+)/i); // Added /i for case-insensitivity
let isExpired = true;

if (dateMatch) {
    const expirationDate = new Date(dateMatch[1]);
    const currentDate = new Date();
    isExpired = currentDate > expirationDate; // Today (3/14/25) > 3/1/25, so true
}

// Extract all price matches
const matches = str.match(/\$\d{1,3}(?:,\d{3})*(?:\.\s?\d{2})?/g);

const extractedPrices = matches 
    ? matches.map(price => {
        // Remove all spaces
        price = price.replace(/\s/g, '');
        
        // If no decimal exists, add .00
        if (!price.includes('.')) {
            return price + '.00';
        }
        
        // If decimal exists, ensure exactly 2 digits
        const [whole, decimal] = price.split('.');
        return `${whole}.${decimal.padEnd(2, '0')}`;
    }) 
    : [];

// If there's no expiration date or only one price, return the first price
// Otherwise return sale price (index 0) if not expired, regular price (index 1) if expired
const result = (!dateMatch || extractedPrices.length === 1) 
    ? extractedPrices[0] 
    : (isExpired ? extractedPrices[1] : extractedPrices[0]);
    
return result }, vars);
    vars.subtotal  = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const unitPrice = parseFloat(`${vars.unitPrice}`.replace(',','').replace('$','').trim())
const subtotal = unitPrice * vars.qty
const formattedSubtotal = subtotal.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
return formattedSubtotal

 }, vars);
    try {
      if ((() => { const multiSteps = vars.multiSteps

return multiSteps === 'yes' })()) {
        await expect(page.locator(`tr.woocommerce-cart-form__cart-item.cart_item:nth-of-type(1) .subscription-price`).first()).toHaveText(`${vars.subtotal ?? ''}`);
      }
    } catch { /* optional step: assertText */ }
    if ((() => { const multiSteps = vars.multiSteps

return multiSteps !== 'yes' })()) {
      await expect(page.locator(`tr.woocommerce-cart-form__cart-item.cart_item:nth-of-type(1) .subscription-price`).first()).toHaveText(`${vars.unitPriceComplete ?? ''}`);
    }
    if ((() => { const multiSteps = vars.multiSteps

return multiSteps !== 'yes' })()) {
      await expect(page.locator(`tr.woocommerce-cart-form__cart-item.cart_item:nth-of-type(2) .subscription-price`).first()).toHaveText(`${vars.unitPriceComplete ?? ''}`);
    }
    if ((() => { const multiSteps = vars.multiSteps

return multiSteps !== 'yes' })()) {
      await expect(page.locator(`tr.woocommerce-cart-form__cart-item.cart_item:nth-of-type(3) .subscription-price`).first()).toHaveText(`${vars.unitPriceComplete ?? ''}`);
    }
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector<HTMLTableRowElement>('tbody > tr.cart-discount > td > span')

return false === !element }, vars)) {
      vars.discount = ((await page.locator(`tbody > tr.cart-discount > td > span`).textContent()) ?? '').trim();
    }
    vars.total = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const subtotal = parseFloat(`${vars.subtotal}`.replace('$','').replace(',','').trim());
let discount = `${vars.discount}`;
if (discount === '') {
    discount = 0;
} else {
    discount = parseFloat(discount.replace('$','').replace(',','').trim());
}

const total = (subtotal - discount).toFixed(2)

return '$' + total
 }, vars);
    await expect(page.locator(`tr.cart-subtotal > td > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.subtotal ?? ''}`);
    await expect(page.locator(`tr.order-total strong > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.total ?? ''}`);
    // ↑ end PLS - 14 - Cart page
    await page.locator(`xpath=//a[contains(text(), "Proceed to checkout")]`).or(page.locator(`a[href*="/checkout/"].checkout-button`)).filter({ visible: true }).first().click({ force: true });
    if (false) {
      await expect(page.locator(`#order_review > table.shop_table.woocommerce-checkout-review-order-table > tbody > tr.cart_item > td.product-name > .ast-product-image > .ast-product-name`).or(page.locator(`#order_review > table.shop_table.woocommerce-checkout-review-order-table > tbody > tr.cart_item > td.product-name`)).first()).toContainText(`${vars.prodDesc ?? ''}`);
    }
    if (false) {
      await expect(page.locator(`#order_review > table.shop_table.woocommerce-checkout-review-order-table > tbody > tr.cart_item > td.product-name > .ast-product-image > .ast-product-name`).or(page.locator(`#order_review > table.shop_table.woocommerce-checkout-review-order-table > tbody > tr.cart_item > td.product-name`)).first()).toContainText(`${vars.prodDesc ?? ''}`);
    }
    if (false) {
      await expect(page.locator(`#order_review > table.shop_table.woocommerce-checkout-review-order-table > tbody > tr.cart_item > td.product-total > .subscription-price`).first()).toContainText(`${vars.unitPriceComplete ?? ''}`);
    }
    if (false) {
      await expect(page.locator(`#order_review > table.shop_table.woocommerce-checkout-review-order-table > tfoot > tr.cart-subtotal > td > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    }
    if (false) {
      await expect(page.locator(`#order_review > table.shop_table.woocommerce-checkout-review-order-table > tfoot > tr.order-total > td > strong > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    }
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector('.wc-block-checkout')

return element !== null }, vars)) {
      vars.prodDesc = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = `${vars.prodDesc}`
//.replace('-','–')
return element }, vars);
    }
    try {
      await expect(page.locator(`div.wc-block-components-order-summary-item:nth-of-type(1) > .wc-block-components-order-summary-item__description > h3.wc-block-components-product-name`).or(page.locator(`tr:nth-of-type(1) > td.product-name`)).first()).toContainText(`${vars.prodDesc ?? ''}`);
    } catch { /* optional step: assertTextPresent */ }
    if (vars.days !== '') {
      await expect(page.locator(`div.wc-block-components-order-summary-item:nth-of-type(1) > .wc-block-components-order-summary-item__description > .wc-block-components-product-metadata > .wc-block-components-product-details > .wc-block-components-product-details__subscription-period > .wc-block-components-product-details__value`).or(page.locator(`tr:nth-of-type(1) > td.product-name`)).first()).toContainText(`${vars.days ?? ''}`);
    }
    if ((() => { const multiSteps = vars.multiSteps

return multiSteps === 'yes' })()) {
      await expect(page.locator(`div:nth-child(1) > div.wc-block-components-order-summary-item__total-price > span span`).or(page.locator(`tr:nth-of-type(1) > td.product-total .woocommerce-Price-amount.amount > bdi`)).or(page.locator(`div.wp-block-woocommerce-checkout-order-summary-totals-block > div.wp-block-woocommerce-checkout-order-summary-subtotal-block.wc-block-components-totals-wrapper > div > span.wc-block-formatted-money-amount.wc-block-components-formatted-money-amount.wc-block-components-totals-item__value`)).first()).toContainText(`${vars.subtotal ?? ''}`);
    }
    if ((() => { const multiSteps = vars.multiSteps

return multiSteps !== 'yes' })()) {
      await expect(page.locator(`div:nth-child(1) > div.wc-block-components-order-summary-item__total-price > span span`).or(page.locator(`tr:nth-of-type(1) > td.product-total .woocommerce-Price-amount.amount > bdi`)).first()).toContainText(`${vars.unitPrice ?? ''}`);
    }
    if ((() => { const multiSteps = vars.multiSteps

return multiSteps !== 'yes' })()) {
      await expect(page.locator(`div.wc-block-components-order-summary-item:nth-of-type(2) > .wc-block-components-order-summary-item__description > h3.wc-block-components-product-name`).or(page.locator(`tr:nth-of-type(2) > td.product-name`)).first()).toContainText(`${vars.prodDesc ?? ''}`);
    }
    if ((() => { const multiSteps = vars.multiSteps

return multiSteps !== 'yes' &&vars.days !== '' })()) {
      await expect(page.locator(`div.wc-block-components-order-summary-item:nth-of-type(2) > .wc-block-components-order-summary-item__description > .wc-block-components-product-metadata > .wc-block-components-product-details > .wc-block-components-product-details__subscription-period > .wc-block-components-product-details__value`).or(page.locator(`tr:nth-of-type(2) > td.product-name`)).first()).toContainText(`${vars.days ?? ''}`);
    }
    if ((() => { const multiSteps = vars.multiSteps

return multiSteps !== 'yes' })()) {
      await expect(page.locator(`div:nth-child(2) > div.wc-block-components-order-summary-item__total-price > span span`).or(page.locator(`tr:nth-of-type(2) > td.product-total .woocommerce-Price-amount.amount > bdi`)).first()).toContainText(`${vars.unitPrice ?? ''}`);
    }
    if ((() => { const multiSteps = vars.multiSteps

return multiSteps !== 'yes' })()) {
      await expect(page.locator(`div.wc-block-components-order-summary-item:nth-of-type(3) > .wc-block-components-order-summary-item__description > h3.wc-block-components-product-name`).or(page.locator(`tr:nth-of-type(3) > td.product-name`)).first()).toContainText(`${vars.prodDesc ?? ''}`);
    }
    if ((() => { const multiSteps = vars.multiSteps

return multiSteps !== 'yes' && vars.days !== '' })()) {
      await expect(page.locator(`div.wc-block-components-order-summary-item:nth-of-type(3) > .wc-block-components-order-summary-item__description > .wc-block-components-product-metadata > .wc-block-components-product-details > .wc-block-components-product-details__subscription-period > .wc-block-components-product-details__value`).or(page.locator(`tr:nth-of-type(3) > td.product-name`)).first()).toContainText(`${vars.days ?? ''}`);
    }
    if ((() => { const multiSteps = vars.multiSteps

return multiSteps !== 'yes' })()) {
      await expect(page.locator(`div:nth-child(3) > div.wc-block-components-order-summary-item__total-price > span span`).or(page.locator(`tr:nth-of-type(3) > td.product-total .woocommerce-Price-amount.amount > bdi`)).first()).toContainText(`${vars.unitPrice ?? ''}`);
    }
    vars.blocks = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector('.wc-block-checkout')

return element !== null }, vars);
    await expect(page.locator(`.wc-block-formatted-money-amount.wc-block-components-formatted-money-amount.wc-block-components-totals-item__value`).or(page.locator(`tr.cart-subtotal .woocommerce-Price-amount.amount > bdi`)).first()).toContainText(`${vars.subtotal ?? ''}`);
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector('div.wp-block-woocommerce-checkout-order-summary-discount-block.wc-block-components-totals-wrapper > div > span.wc-block-number-format-container > span')

return !element === false }, vars)) {
      await expect(page.locator(`div.wp-block-woocommerce-checkout-order-summary-discount-block.wc-block-components-totals-wrapper > div > span.wc-block-number-format-container > span`).first()).toHaveText(`-${vars.discount ?? ''}`);
    }
    await expect(page.locator(`.wc-block-formatted-money-amount.wc-block-components-formatted-money-amount.wc-block-components-totals-footer-item-tax-value`).or(page.locator(`tr.order-total .woocommerce-Price-amount.amount > bdi`)).first()).toContainText(`${vars.total ?? ''}`);
    if ((() => { const multiSteps = vars.multiSteps

return multiSteps !== 'yes' })()) {
      await expect(page.locator(`div.wc-block-components-order-summary-item:nth-of-type(2) > .wc-block-components-order-summary-item__description > .wc-block-components-product-metadata > div.wc-block-components-product-details:nth-of-type(1) > .wc-block-components-product-details__participant > .wc-block-components-product-details__value`).or(page.locator(`#order_review > table > tbody > tr:nth-child(2) > td.product-name > dl > dd > p`)).first()).toContainText(`${vars.firstName2 ?? ''} ${vars.lastName2 ?? ''} (${vars.email2 ?? ''})`);
    }
    if ((() => { const multiSteps = vars.multiSteps

return multiSteps !== 'yes' })()) {
      await expect(page.locator(`div.wc-block-components-order-summary-item:nth-of-type(3) > .wc-block-components-order-summary-item__description > .wc-block-components-product-metadata > div.wc-block-components-product-details:nth-of-type(1) > .wc-block-components-product-details__participant > .wc-block-components-product-details__value`).or(page.locator(`tr:nth-of-type(3) > td.product-name > p`)).or(page.locator(`#order_review > table > tbody > tr:nth-child(3) > td.product-name > dl > dd > p`)).first()).toContainText(`${vars.firstName3 ?? ''} ${vars.lastName3 ?? ''} (${vars.email3 ?? ''})`);
    }
    // ↑ end PLS - 15 - Checkout page
    await fillStripeForm(page, vars);
    try { await page.locator(`#billing_email`).or(page.locator(`#email`)).first().fill(`${vars.email ?? ''}`); } catch { await page.locator(`#billing_email`).or(page.locator(`#email`)).first().selectOption(`${vars.email ?? ''}`); }
    try { await page.locator(`#billing_first_name`).or(page.locator(`#billing-first_name`)).first().fill(`${vars.firstName ?? ''}`); } catch { await page.locator(`#billing_first_name`).or(page.locator(`#billing-first_name`)).first().selectOption(`${vars.firstName ?? ''}`); }
    try { await page.locator(`#billing_last_name`).or(page.locator(`#billing-last_name`)).first().fill(`${vars.lastName ?? ''}`); } catch { await page.locator(`#billing_last_name`).or(page.locator(`#billing-last_name`)).first().selectOption(`${vars.lastName ?? ''}`); }
    try { await page.locator(`#billing_company`).or(page.locator(`#billing-company`)).first().fill(`${vars.company ?? ''}`); } catch { await page.locator(`#billing_company`).or(page.locator(`#billing-company`)).first().selectOption(`${vars.company ?? ''}`); }
    try { await page.locator(`#billing_address_1`).or(page.locator(`#billing-address_1`)).first().fill(`${vars.street ?? ''}`); } catch { await page.locator(`#billing_address_1`).or(page.locator(`#billing-address_1`)).first().selectOption(`${vars.street ?? ''}`); }
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector('.wc-block-components-address-form__address_2-toggle')

return element !== null && element !== undefined }, vars)) {
      await page.locator(`.wc-block-components-address-form__address_2-toggle`).filter({ visible: true }).first().click({ force: true });
    }
    try { await page.locator(`#billing_address_2`).or(page.locator(`#billing-address_2`)).first().fill(`${vars.street2 ?? ''}`); } catch { await page.locator(`#billing_address_2`).or(page.locator(`#billing-address_2`)).first().selectOption(`${vars.street2 ?? ''}`); }
    try { await page.locator(`#billing_city`).or(page.locator(`#billing-city`)).first().fill(`${vars.city ?? ''}`); } catch { await page.locator(`#billing_city`).or(page.locator(`#billing-city`)).first().selectOption(`${vars.city ?? ''}`); }
    {
      const _lbl = page.locator(`label[for="select2-billing_state-container"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#select2-billing_state-container`).or(page.locator(`select#billing-state`)).filter({ visible: true }).first().click({ force: true }); }
    }
    try {
      try { await page.locator(`span > span:nth-of-type(1) > input[type="text"]`).first().fill(`${vars.stateComplete ?? ''}`); } catch { await page.locator(`span > span:nth-of-type(1) > input[type="text"]`).first().selectOption(`${vars.stateComplete ?? ''}`); }
    } catch { /* optional step: assign */ }
    try { await page.locator(`xpath=//li[contains(text(), "${vars.stateComplete ?? ''}")]`).or(page.locator(`xpath=//option[contains(text(), "${vars.stateComplete ?? ''}")]`)).filter({ visible: true }).first().click(); } catch { await page.locator('select').filter({ has: page.locator('option', { hasText: `${vars.stateComplete ?? ''}` }) }).first().selectOption({ label: `${vars.stateComplete ?? ''}` }); }
    try { await page.locator(`#billing_postcode`).or(page.locator(`#billing-postcode`)).first().fill(`${vars.zipCode ?? ''}`); } catch { await page.locator(`#billing_postcode`).or(page.locator(`#billing-postcode`)).first().selectOption(`${vars.zipCode ?? ''}`); }
    try { await page.locator(`#billing_phone`).or(page.locator(`#billing-phone`)).first().fill(`${vars.phone ?? ''}`); } catch { await page.locator(`#billing_phone`).or(page.locator(`#billing-phone`)).first().selectOption(`${vars.phone ?? ''}`); }
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector<HTMLInputElement>('.wc-block-checkout__order-notes input.wc-block-components-checkbox__input')

return element !== null && element !== undefined }, vars)) {
      await page.locator(`.wc-block-checkout__order-notes input.wc-block-components-checkbox__input`).filter({ visible: true }).first().click({ force: true });
    }
    {
      const _lbl = page.locator(`label[for="order-pls-ce-services-pl_user_credentials"]`).or(page.locator(`label[for="pl_user_credentials"]`)).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#order-pls-ce-services-pl_user_credentials`).or(page.locator(`#pl_user_credentials`)).filter({ visible: true }).first().click({ force: true }); }
    }
    try { await page.locator(`#order-pls-ce-services-pl_user_credentials`).or(page.locator(`#pl_user_credentials`)).first().fill(`CRDH`); } catch { await page.locator(`#order-pls-ce-services-pl_user_credentials`).or(page.locator(`#pl_user_credentials`)).first().selectOption(`CRDH`); }
    try { await page.locator(`#order_comments`).or(page.locator(`.wc-block-checkout__order-notes .wc-block-components-textarea`)).first().fill(`Testing Notes`); } catch { await page.locator(`#order_comments`).or(page.locator(`.wc-block-checkout__order-notes .wc-block-components-textarea`)).first().selectOption(`Testing Notes`); }
    if (vars.location === 'Internet') {
      await page.locator(`xpath=//button[contains(text(), "Copy from billing details")]`).or(page.locator(`button.woocommerce-to-zoom-copy-from-billing`)).filter({ visible: true }).first().click({ force: true });
    }
    if (vars.location === 'Internet') {
      try { await page.locator(`input[placeholder="Cell Phone (for text notices during the webinar) *"]`).or(page.locator(`div.zoom-webinar-registrant-container > p:nth-of-type(4) input`)).first().fill(`${vars.phone ?? ''}`); } catch { await page.locator(`input[placeholder="Cell Phone (for text notices during the webinar) *"]`).or(page.locator(`div.zoom-webinar-registrant-container > p:nth-of-type(4) input`)).first().selectOption(`${vars.phone ?? ''}`); }
    }
    {
      const _lbl = page.locator(`label[for="place_order"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`xpath=//button[contains(text(), "Place Order")]`).or(page.locator(`#place_order`)).or(page.locator(`.wc-block-components-checkout-place-order-button__text`)).filter({ visible: true }).first().click({ force: true }); }
    }
    await blockUI(page, vars);
    vars.orderNumber = ((await page.locator(`.order > strong`).textContent()) ?? '').trim();
    await expect(page.locator(`.email > strong`).first()).toHaveText(`${vars.email ?? ''}`);
    await expect(page.locator(`strong > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.total ?? ''}`);
    await expect(page.locator(`.method > strong`).first()).toHaveText(`Credit / Debit Card`);
    await checkThankYouPageMyAccount(page, vars);
    await page.locator(`img.custom-logo`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`xpath=//span[contains(text(), "My account")]`).or(page.locator(`a[href*="/my-account/"] > .menu-text`)).or(page.locator(`xpath=//a[contains(text(), "My account")]`)).or(page.locator(`a[href*="/my-account/"]`)).filter({ visible: true }).first().click({ force: true });
    await page.locator(`.woocommerce-MyAccount-navigation-link > a[href*="/my-account/orders/"]`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`xpath=//a[contains(text(), "View")]`).or(page.locator(`a[href*="/my-account/view-order/"]`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`mark.order-number`).first()).toContainText(`${vars.orderNumber ?? ''}`);
    await expect(page.locator(`mark.order-status`).first()).toContainText(`Completed`);
    await checkThankYouPageMyAccount(page, vars);
    await page.locator(`a[href*="/my-account/view-subscription/"] > .ast-woo-nav-link-name`).or(page.locator(`a[href*="/my-account/view-subscription/"]`)).or(page.locator(`a[href*="subscription"]`)).filter({ visible: true }).first().click({ force: true });
    if (vars.days === '') {
      await expect(page.locator(`td.product-name > a[href*="/product/"]`).first()).toContainText(`${vars.prodDesc ?? ''}`);
    }
    if (vars.days !== '') {
      await expect(page.locator(`td.product-name > a[href*="/product/"]`).first()).toContainText(`${vars.prodDesc ?? ''}`);
    }
    await expect(page.locator(`td.product-total > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    await expect(page.locator(`tfoot > tr:nth-of-type(1) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    await expect(page.locator(`tr:nth-of-type(2) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    try {
      await expect(page.locator(`.woocommerce-order-downloads`)).not.toHaveCount(0);
    } catch { /* optional step: assertElementPresent */ }
    await expect(page.locator(`a[href*="/my-account/view-order"]`).first()).toContainText(`#${vars.orderNumber ?? ''}`);
    await expect(page.locator(`.woocommerce-customer-details > address`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.company ?? ''}
${vars.street ?? ''}
${vars.street2 ?? ''}
${vars.city ?? ''}, ${vars.state ?? ''} ${vars.zipCode ?? ''}

${vars.phone ?? ''}

${vars.email ?? ''}`);
  });

  test('02 - Place order - Email', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    vars.username = `${vars.email ?? ''}`;
    await extractUserFromEmail(page, vars);
    vars.userEmail1Extract = `${vars.userEmailExtract ?? ''}`;
    await page.locator(`xpath=//a[contains(text(), "Professional Learning Services Order Confirmation ${vars.orderNumber ?? ''}")]`).filter({ visible: true }).first().click({ force: true });
    if (vars.days === '') {
      await expect(page.locator(`tr.order_item > td.td:nth-of-type(1)`).first()).toContainText(`${vars.prodDesc ?? ''}`);
    }
    if (vars.days !== '') {
      await expect(page.locator(`tr.order_item > td.td:nth-of-type(1)`).first()).toContainText(`${vars.prodDesc ?? ''} - ${vars.days ?? ''}`);
    }
    await expect(page.locator(`tr.order_item > td.td:nth-of-type(3) > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.unitPrice ?? ''}${vars.unitPrice ?? ''}${vars.unitPrice ?? ''}`);
    await expect(page.locator(`tfoot > tr:nth-of-type(1) > td.td > .woocommerce-Price-amount.amount`).or(page.locator(`tbody > tr.order-totals.order-totals-subtotal > td > span`)).first()).toHaveText(`${vars.subtotal ?? ''}`);
    if (vars.discount !== '') {
      await expect(page.locator(`tfoot > tr:nth-of-type(2) > td.td > .woocommerce-Price-amount.amount`).or(page.locator(`tbody > tr.order-totals.order-totals-discount > td`)).first()).toHaveText(`${vars.discount ?? ''}`);
    }
    if (vars.discount == '') {
      await expect(page.locator(`tfoot > tr:nth-of-type(2) > td.td`).or(page.locator(`tbody > tr.order-totals.order-totals-payment_method > td`)).first()).toContainText(`Credit / Debit Card`);
    }
    if (vars.discount !== '') {
      await expect(page.locator(`tfoot > tr:nth-of-type(3) > td.td`).or(page.locator(`tbody > tr.order-totals.order-totals-payment_method > td`)).first()).toContainText(`Credit / Debit Card`);
    }
    if (vars.discount === '') {
      await expect(page.locator(`tfoot > tr:nth-of-type(3) > td.td > .woocommerce-Price-amount.amount`).or(page.locator(`tbody > tr.order-totals.order-totals-total.order-totals-last > td`)).first()).toHaveText(`${vars.total ?? ''}`);
    }
    if (vars.discount !== '') {
      await expect(page.locator(`tfoot > tr:nth-of-type(4) > td.td > .woocommerce-Price-amount.amount`).or(page.locator(`tbody > tr.order-totals.order-totals-total.order-totals-last > td`)).first()).toHaveText(`${vars.total ?? ''}`);
    }
    if (vars.discount === '') {
      await expect(page.locator(`tfoot > tr:nth-of-type(4) > td.td`).or(page.locator(`table:nth-child(2) > tbody > tr:nth-child(4) > td`)).first()).toContainText(`Testing Notes`);
    }
    if (vars.discount !== '') {
      await expect(page.locator(`tfoot > tr:nth-of-type(5) > td.td`).or(page.locator(`table:nth-child(2) > tbody > tr:nth-child(4) > td`)).first()).toContainText(`Testing Notes`);
    }
    await expect(page.locator(`td:nth-of-type(1) > address.address`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.company ?? ''}
${vars.street ?? ''}
${vars.street2 ?? ''}
${vars.city ?? ''}, ${vars.state ?? ''} ${vars.zipCode ?? ''}
${vars.countryComplete ?? ''}
${vars.phone ?? ''}
${vars.email ?? ''}`);
    vars.username = `${vars.email2 ?? ''}`;
    await extractUserFromEmail(page, vars);
    vars.userEmail2Extract = `${vars.userEmailExtract ?? ''}`;
    await page.locator(`xpath=//a[contains(text(), "Your account on Professional Learning Services")]`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`#body_content_inner > p:nth-of-type(2)`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName ?? ''} (${vars.email ?? ''}) just purchased a course for you at Professional Learning Services so we've created an account for you.`);
    await expect(page.locator(`#body_content_inner > p:nth-of-type(6)`).first()).toHaveText(`Once completed you may access your account area to view your course(s) here: My Account. When in your "My Account" select "Courses" then click on "Access your active on-demand webinars".`);
    await page.goBack();
    await page.locator(`xpath=//a[contains(text(), "Your new course at Professional Learning Services")]`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`#body_content_inner > p:nth-of-type(2)`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName ?? ''} (${vars.email ?? ''}) just purchased a course for you at Professional Learning Services. Details of the course are shown below.`);
    await expect(page.locator(`#body_content_inner > p:nth-of-type(3)`).first()).toContainText(`We noticed you didn't have an account so we created one for you. Your account login details and course access information have been sent to you in a separate email.`);
    await expect(page.locator(`tr.order_item > td.td:nth-of-type(1)`).first()).toContainText(`${vars.prodDesc ?? ''}`);
    await expect(page.locator(`tr.order_item > td.td:nth-of-type(1)`).first()).toContainText(`${vars.email2 ?? ''}`);
    vars.username = `${vars.email3 ?? ''}`;
    await extractUserFromEmail(page, vars);
    vars.userEmail3Extract = `${vars.userEmailExtract ?? ''}`;
    await page.locator(`xpath=//a[contains(text(), "Your account on Professional Learning Services")]`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`#body_content_inner > p:nth-of-type(2)`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName ?? ''} (${vars.email ?? ''}) just purchased a course for you at Professional Learning Services so we've created an account for you.`);
    await expect(page.locator(`#body_content_inner > p:nth-of-type(6)`).first()).toHaveText(`Once completed you may access your account area to view your course(s) here: My Account. When in your "My Account" select "Courses" then click on "Access your active on-demand webinars".`);
    await page.goBack();
    await page.locator(`xpath=//a[contains(text(), "Your new course at Professional Learning Services")]`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`#body_content_inner > p:nth-of-type(2)`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName ?? ''} (${vars.email ?? ''}) just purchased a course for you at Professional Learning Services. Details of the course are shown below.`);
    await expect(page.locator(`#body_content_inner > p:nth-of-type(3)`).first()).toContainText(`We noticed you didn't have an account so we created one for you. Your account login details and course access information have been sent to you in a separate email.`);
    await expect(page.locator(`tr.order_item > td.td:nth-of-type(1)`).first()).toContainText(`${vars.prodDesc ?? ''}`);
    await expect(page.locator(`tr.order_item > td.td:nth-of-type(1)`).first()).toContainText(`${vars.email3 ?? ''}`);
  });

  test('03 - Place order - Backend', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    vars.admin = `yes`;
    vars.username = `${vars.adminUser ?? ''}`;
    vars.pass = `${vars.adminPass ?? ''}`;
    await login(page, vars);
    await page.locator(`a[href="admin.php?page=wc-admin"] > .wp-menu-name`).first().hover();
    await page.locator(`a[href="edit.php?post_type=shop_order"]`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    await expect(page.locator(`tr.iedit.author-other.level-0.type-shop_order.hentry:nth-of-type(1) > td.order_total.column-order_total > .tips > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.total ?? ''}`);
    await page.locator(`tr.iedit.author-other.level-0.type-shop_order.hentry:nth-of-type(1) > td:nth-of-type(1) > a:nth-of-type(2)`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.woocommerce-order-data__meta`).first()).toContainText(`Payment via Credit / Debit Card`);
    await expect(page.locator(`#select2-order_status-container`).first()).toContainText(`Completed`);
    await expect(page.locator(`div.order_data_column:nth-of-type(2) > .address > p:nth-of-type(1)`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.company ?? ''}
${vars.street ?? ''}
${vars.street2 ?? ''}
${vars.city ?? ''}, ${vars.state ?? ''} ${vars.zipCode ?? ''}`);
    await expect(page.locator(`a[href*="mailto:qa+gi_order_"]`).first()).toHaveText(`${vars.email ?? ''}`);
    await expect(page.locator(`a[href*="tel:"]`).first()).toContainText(`${vars.phone ?? ''}`);
    try {
      await expect(page.locator(`div.order_data_column:nth-of-type(3) > .address > p:nth-of-type(1)`).first()).toHaveText(`Address:
No shipping address set.`);
    } catch { /* optional step: assertText */ }
    await expect(page.locator(`.order_note`).first()).toHaveText(`Customer provided note:
Testing Notes`);
    if (vars.days === '') {
      await expect(page.locator(`tbody#order_line_items > tr:nth-of-type(1) a[href*="/wp-admin/post.php?post="]`).first()).toContainText(`${vars.prodDesc ?? ''}`);
    }
    if (vars.days === '') {
      await expect(page.locator(`tbody#order_line_items > tr:nth-of-type(2) a[href*="/wp-admin/post.php?post="]`).first()).toContainText(`${vars.prodDesc ?? ''}`);
    }
    if (vars.days === '') {
      await expect(page.locator(`tbody#order_line_items > tr:nth-of-type(3) a[href*="/wp-admin/post.php?post="]`).first()).toContainText(`${vars.prodDesc ?? ''}`);
    }
    if (vars.days !== '') {
      await expect(page.locator(`tbody#order_line_items > tr:nth-of-type(1) a[href*="/wp-admin/post.php?post="]`).first()).toContainText(`${vars.prodDesc ?? ''} - ${vars.days ?? ''}`);
    }
    if (vars.days !== '') {
      await expect(page.locator(`tbody#order_line_items > tr:nth-of-type(2) a[href*="/wp-admin/post.php?post="]`).first()).toContainText(`${vars.prodDesc ?? ''} - ${vars.days ?? ''}`);
    }
    if (vars.days !== '') {
      await expect(page.locator(`tbody#order_line_items > tr:nth-of-type(3) a[href*="/wp-admin/post.php?post="]`).first()).toContainText(`${vars.prodDesc ?? ''} - ${vars.days ?? ''}`);
    }
    await expect(page.locator(`tbody#order_line_items > tr:nth-of-type(1) td.item_cost > .view > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    await expect(page.locator(`tbody#order_line_items > tr:nth-of-type(2) td.item_cost > .view > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    await expect(page.locator(`tbody#order_line_items > tr:nth-of-type(3) td.item_cost > .view > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    await expect(page.locator(`table.wc-order-totals:nth-of-type(1) > tbody > tr:nth-of-type(1) > td.total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.subtotal ?? ''}`);
    if (vars.discount !== '') {
      await expect(page.locator(`.wc-order-data-row.wc-order-totals-items > table.wc-order-totals:nth-of-type(1) > tbody > tr:nth-of-type(2) > td.total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.discount ?? ''}`);
    }
    if (vars.discount === '') {
      await expect(page.locator(`.wc-order-data-row.wc-order-totals-items > table.wc-order-totals:nth-of-type(1) > tbody > tr:nth-of-type(2) > td.total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.total ?? ''}`);
    }
    if (vars.discount !== '') {
      await expect(page.locator(`.wc-order-data-row.wc-order-totals-items > table.wc-order-totals:nth-of-type(1) > tbody > tr:nth-of-type(3) > td.total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.total ?? ''}`);
    }
    await expect(page.locator(`table.wc-order-totals:nth-of-type(2) > tbody > tr:nth-of-type(1) > td.total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.total ?? ''}`);
    await expect(page.locator(`tr.item:nth-of-type(2) > td.name > .view > table.display_meta > tbody > tr:nth-of-type(2) > td > p`).first()).toContainText(`${vars.firstName2 ?? ''}`);
    await expect(page.locator(`tr.item:nth-of-type(2) > td.name > .view > table.display_meta > tbody > tr:nth-of-type(3) > td > p`).first()).toContainText(`${vars.lastName2 ?? ''}`);
    await expect(page.locator(`tr.item:nth-of-type(2) > td.name > .view > table.display_meta > tbody > tr:nth-of-type(4) > td > p`).first()).toContainText(`${vars.phone2 ?? ''}`);
    await expect(page.locator(`tr.item:nth-of-type(2) > td.name > .view > table.display_meta > tbody > tr:nth-of-type(5) > td > p`).first()).toHaveText(`${vars.email2 ?? ''}`);
    await expect(page.locator(`tr.item:nth-of-type(2) > td.name > .view > table.display_meta > tbody > tr:nth-of-type(6) > td > p`).first()).toContainText(`${vars.credentials2 ?? ''}`);
    await expect(page.locator(`tr.item:nth-of-type(3) > td.name > .view > table.display_meta > tbody > tr:nth-of-type(2) > td > p`).first()).toContainText(`${vars.firstName3 ?? ''}`);
    await expect(page.locator(`tr.item:nth-of-type(3) > td.name > .view > table.display_meta > tbody > tr:nth-of-type(3) > td > p`).first()).toContainText(`${vars.lastName3 ?? ''}`);
    await expect(page.locator(`tr.item:nth-of-type(3) > td.name > .view > table.display_meta > tbody > tr:nth-of-type(4) > td > p`).first()).toContainText(`${vars.phone3 ?? ''}`);
    await expect(page.locator(`tr.item:nth-of-type(3) > td.name > .view > table.display_meta > tbody > tr:nth-of-type(5) > td > p`).first()).toHaveText(`${vars.email3 ?? ''}`);
    await expect(page.locator(`tr.item:nth-of-type(3) > td.name > .view > table.display_meta > tbody > tr:nth-of-type(6) > td > p`).first()).toContainText(`${vars.credentials3 ?? ''}`);
  });

  test('04 - Refund by Admin', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    vars.admin = `yes`;
    vars.username = `${vars.adminUser ?? ''}`;
    vars.pass = `${vars.adminPass ?? ''}`;
    await login(page, vars);
    await page.locator(`a[href="admin.php?page=wc-admin"] > .wp-menu-name`).first().hover();
    await page.locator(`a[href="edit.php?post_type=shop_order"]`).or(page.locator(`a[href="admin.php?page=wc-orders"]`)).filter({ visible: true }).first().click({ force: true });
    await page.locator(`a[href*="/wp-admin/post.php?post=${vars.orderNumber ?? ''}&action=edit"] > strong`).or(page.locator(`a[href*="/wp-admin/admin.php?page=wc-orders&action=edit&id=${vars.orderNumber ?? ''}"] > strong`)).or(page.locator(`tr.iedit.author-other.level-0.type-shop_order.hentry:nth-of-type(1) > td:nth-of-type(1) > a:nth-of-type(2)`)).filter({ visible: true }).first().click({ force: true });
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
    try { await page.locator(`#refund_reason`).first().fill(`Testing Refund`); } catch { await page.locator(`#refund_reason`).first().selectOption(`Testing Refund`); }
    await expect(page.locator(`button[type="button"].button.button-primary.do-api-refund > .wc-order-refund-amount > .woocommerce-Price-amount.amount`).first()).toContainText(`${vars.total ?? ''}`);
    await page.locator(`button[type="button"].button.button-primary.do-api-refund > .wc-order-refund-amount > .woocommerce-Price-amount.amount`).filter({ visible: true }).first().click({ force: true });
    await blockUI(page, vars);
    await expect(page.locator(`#select2-order_status-container`).first()).toContainText(`Refunded`);
    await expect(page.locator(`tr.refund > td.name`)).not.toHaveCount(0);
    await expect(page.locator(`tr.refund > td.line_cost > .view > .woocommerce-Price-amount.amount`).first()).toHaveText(`-${vars.total ?? ''}`);
    await expect(page.locator(`tr:nth-of-type(1) > td.total.refunded-total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.total ?? ''}`);
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); // Function to check for refund ID note in WooCommerce admin notes
function hasRefundNote() {
    // Select all note content paragraphs
    const notes = Array.from<any>(document.querySelectorAll('li.note.system-note > .note_content > p'));
    
    // Regular expression to match
    const refundIdPattern = /Refund ID: re_[A-Za-z0-9]+ – Reason: Testing Refund/;
    
    // Check each note for the pattern
    for (const note of notes) {
        if (refundIdPattern.test(note.textContent.trim())) {
            return true;
        }
    }
    
    return false;
}

return hasRefundNote() }, vars)).toBeTruthy();
  });

  test('05 - Refund Email', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.waitForTimeout(20000);
    vars.userEmailExtract = `${vars.userEmail1Extract ?? ''}`;
    await page.goto(`https://email.ghostinspector.com/${vars.userEmailExtract ?? ''}`);
    await page.waitForLoadState('load');
    await page.locator(`xpath=//a[contains(text(), "has been refunded")]`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`tr.order-totals.order-totals-refund > td > span.woocommerce-Price-amount.amount`).first()).toHaveText(`-${vars.total ?? ''}`);
    await expect(page.locator(`tfoot > tr > td.td > del`).or(page.locator(`tr.order-totals.order-totals-total.order-totals-last > td > del`)).first()).toHaveText(`${vars.total ?? ''}`);
    await expect(page.locator(`tfoot > tr > td.td > ins > .woocommerce-Price-amount.amount`).or(page.locator(`tr.order-totals.order-totals-total.order-totals-last > td > ins > .woocommerce-Price-amount.amount`)).first()).toHaveText(`${vars.Symbol ?? ''}0.00`);
  });

});
