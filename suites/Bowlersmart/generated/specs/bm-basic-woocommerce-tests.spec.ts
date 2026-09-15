// @ts-nocheck
// Auto-generated from Ghost Inspector suite: "BM - Basic WooCommerce Tests"
// Review all TODOs before running.
import dotenv from 'dotenv';
dotenv.config();
import { test, expect } from '@playwright/test';
import { exitTestProdSite, extractUserFromEmail, goToMyAccount, login, register } from '../helpers/bm-common-steps';
import { blockUI, shippingOnCart } from '../helpers/common-steps-for-all-projects';

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

test.describe('BM - Basic WooCommerce Tests', () => {

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
    "project": "template",
    "countryComplete": "United States (US)",
    "state": "FL",
    "stateComplete": "Florida",
    "Symbol": "$",
    "country": "US",
    "company": "Test LLC.",
    "company2": "Testing Shipping",
    "street2": "Ap. 4",
    "street4": "Ap. Ship",
    "street": "123 False Street",
    "street3": "123 False Shipping",
    "city": "Miami",
    "zipCode": "33126",
    "phone": "6135465467",
    "password": process.env.PASSWORD ?? '',
    "password2": process.env.PASSWORD2 ?? '',
    "lastName2": `${Math.random().toString(36).substring(2, 10)} Ship`,
    "prodUrl": "https://www.bowlersmart.com/",
  }, { get: (o: Record<string, string>, k: string) => (k in o ? o[k] : '') });

  test('01 - Home Page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.waitForLoadState('load');
    try {
      await page.locator(`iframe#attentive_creative button#closeIconContainer`).filter({ visible: true }).first().click({ force: true });
    } catch { /* optional step: click */ }
  });

  test('02 - Balls by Brand Page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    // ↓ 01 - Home Page
    await page.waitForLoadState('load');
    try {
      await page.locator(`iframe#attentive_creative button#closeIconContainer`).filter({ visible: true }).first().click({ force: true });
    } catch { /* optional step: click */ }
    // ↑ end 01 - Home Page
    await page.locator(`a[href*="/shop/bowling-gear/bowling-balls/"][title="Bowling Balls"].nav-top-link`).first().hover();
    await page.locator(`li#tab-by-brand > a`).first().hover();
    await page.locator(`xpath=//span[@class = 'ux-menu-link__text' and contains(text(), 'SWAG')]`).filter({ visible: true }).first().click({ force: true });
  });

  test('02 - Balls Page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    // ↓ 01 - Home Page
    await page.waitForLoadState('load');
    try {
      await page.locator(`iframe#attentive_creative button#closeIconContainer`).filter({ visible: true }).first().click({ force: true });
    } catch { /* optional step: click */ }
    // ↑ end 01 - Home Page
    await page.locator(`a[href*="/shop/bowling-gear/bowling-balls/"][title="Bowling Balls"].nav-top-link`).filter({ visible: true }).first().click({ force: true });
  });

  test('02 - Shop Page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.goto(`${vars.startUrl ?? ''}shop`);
    await page.waitForLoadState('load');
    try {
      await page.locator(`iframe#attentive_creative button#closeIconContainer`).filter({ visible: true }).first().click({ force: true });
    } catch { /* optional step: click */ }
    await page.waitForLoadState('load');
  });

  test('03 - Simple Product Page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.goto(`${vars.startUrl ?? ''}shop/bowling-gear/bowling-accessories/bowling-shoe-accessories/3g-accessories/`);
    await page.waitForLoadState('load');
    await page.locator(`div.product-type-simple.instock a > img`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    vars.prod_desc = ((await page.locator(`h1.product_title`).or(page.locator(`h3.product_title`)).or(page.locator(`p > mark.has-inline-color > em`)).textContent()) ?? '').trim();
    vars.unitPrice = ((await page.locator(`p.price > ins > .woocommerce-Price-amount.amount > bdi`).or(page.locator(`p.price > .woocommerce-Price-amount.amount > bdi`)).or(page.locator(`p.price > span > ins > .woocommerce-Price-amount.amount > bdi`)).or(page.locator(`p.price > span > .woocommerce-Price-amount.amount > bdi`)).textContent()) ?? '').trim();
  });

  test('04 - Variable Product Page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    // ↓ 02 - Balls by Brand Page
    // ↓ 01 - Home Page
    await page.waitForLoadState('load');
    try {
      await page.locator(`iframe#attentive_creative button#closeIconContainer`).filter({ visible: true }).first().click({ force: true });
    } catch { /* optional step: click */ }
    // ↑ end 01 - Home Page
    await page.locator(`a[href*="/shop/bowling-gear/bowling-balls/"][title="Bowling Balls"].nav-top-link`).first().hover();
    await page.locator(`li#tab-by-brand > a`).first().hover();
    await page.locator(`xpath=//span[@class = 'ux-menu-link__text' and contains(text(), 'SWAG')]`).filter({ visible: true }).first().click({ force: true });
    // ↑ end 02 - Balls by Brand Page
    await page.locator(`div.product-type-variable.instock a > img`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    vars.weight = ((await page.locator(`#pa_ball-weight option[selected="selected"]`).textContent()) ?? '').trim();
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector('div.single_variation_wrap > div.wc-pao-addons-container, div.single_variation_wrap > div.product-addon')

return element != null }, vars)) {
      try { await page.locator(`div.wc-pao-addon:nth-of-type(1) > .form-row > select.wc-pao-addon-field`).or(page.locator(`div.product-addon.product-addon-drilling-protection .form-row > select.addon-select`)).first().fill(`yes-covers-cracking-during-ball-drilling-1`); } catch { await page.locator(`div.wc-pao-addon:nth-of-type(1) > .form-row > select.wc-pao-addon-field`).or(page.locator(`div.product-addon.product-addon-drilling-protection .form-row > select.addon-select`)).first().selectOption(`yes-covers-cracking-during-ball-drilling-1`); }
    }
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector('div.single_variation_wrap > div.wc-pao-addons-container, div.single_variation_wrap > div.product-addon')

return element != null }, vars)) {
      vars.cracking = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let text = document.querySelector<HTMLOptionElement>("option[value='yes-covers-cracking-during-ball-drilling-1']").textContent
let crackingMatch = text.match(/\$\d*\.?\d+/);
let cracking = crackingMatch ? crackingMatch[0] : "";
return cracking }, vars);
    }
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector('div.single_variation_wrap > div.wc-pao-addons-container, div.single_variation_wrap > div.product-addon')

return element != null }, vars)) {
      try { await page.locator(`div.wc-pao-addon:nth-of-type(2) > .form-row > select.wc-pao-addon-field`).or(page.locator(`div.product-addon.product-addon-extra-365-warranty-coverage .form-row > select.addon-select`)).first().fill(`yes-add-365-warranty-coverage-1`); } catch { await page.locator(`div.wc-pao-addon:nth-of-type(2) > .form-row > select.wc-pao-addon-field`).or(page.locator(`div.product-addon.product-addon-extra-365-warranty-coverage .form-row > select.addon-select`)).first().selectOption(`yes-add-365-warranty-coverage-1`); }
    }
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector('div.single_variation_wrap > div.wc-pao-addons-container, div.single_variation_wrap > div.product-addon')

return element != null }, vars)) {
      vars.warranty = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let text = document.querySelector<HTMLOptionElement>("option[value='yes-add-365-warranty-coverage-1']").textContent
let warrantyMatch = text.match(/\$\d*\.?\d+/);
let warranty = warrantyMatch ? warrantyMatch[0] : "";
return warranty }, vars);
    }
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector('div.single_variation_wrap > div.wc-pao-addons-container, div.single_variation_wrap > div.product-addon')

return element != null }, vars)) {
      try { await page.locator(`input[type="text"].input-text.wc-pao-addon-field`).or(page.locator(`div.product-addon.product-addon-specific-requests input[type="text"].input-text`)).first().fill(`Testing request`); } catch { await page.locator(`input[type="text"].input-text.wc-pao-addon-field`).or(page.locator(`div.product-addon.product-addon-specific-requests input[type="text"].input-text`)).first().selectOption(`Testing request`); }
    }
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector('div.single_variation_wrap > div.wc-pao-addons-container, div.single_variation_wrap > div.product-addon')

return element != null }, vars)) {
      await page.locator(`div.form-row:nth-of-type(1) > div:nth-of-type(1) > input[type="checkbox"].wc-pao-addon-checkbox`).or(page.locator(`div.product-addon.product-addon-money-saving-options > p:nth-of-type(1) input[type="checkbox"]`)).filter({ visible: true }).first().click({ force: true });
    }
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector('div.single_variation_wrap > div.wc-pao-addons-container, div.single_variation_wrap > div.product-addon')

return element != null }, vars)) {
      vars.cleaner = ((await page.locator(`div.form-row:nth-of-type(1) > div:nth-of-type(1) .wc-pao-addon-price .woocommerce-Price-amount`).or(page.locator(`div.product-addon.product-addon-money-saving-options > p:nth-of-type(1) .woocommerce-Price-amount.amount > bdi`)).textContent()) ?? '').trim();
    }
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector('div.single_variation_wrap > div.wc-pao-addons-container, div.single_variation_wrap > div.product-addon')

return element != null }, vars)) {
      await page.locator(`div.form-row:nth-of-type(1) > div:nth-of-type(2) > input[type="checkbox"].wc-pao-addon-checkbox`).or(page.locator(`div.product-addon.product-addon-money-saving-options > p:nth-of-type(2) input[type="checkbox"]`)).filter({ visible: true }).first().click({ force: true });
    }
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector('div.single_variation_wrap > div.wc-pao-addons-container, div.single_variation_wrap > div.product-addon')

return element != null }, vars)) {
      vars.shammy  = ((await page.locator(`div.form-row:nth-of-type(1) > div:nth-of-type(2) .wc-pao-addon-price .woocommerce-Price-amount`).or(page.locator(`div.product-addon.product-addon-money-saving-options > p:nth-of-type(2) .woocommerce-Price-amount.amount > bdi`)).textContent()) ?? '').trim();
    }
    vars.prod_desc = ((await page.locator(`h1.product_title`).textContent()) ?? '').trim();
    vars.unitPrice = ((await page.locator(`div > .price > ins > .woocommerce-Price-amount.amount > bdi`).or(page.locator(`div > .price > .woocommerce-Price-amount.amount > bdi`)).or(page.locator(`div > div > div.product-main > div > div.product-info.summary.entry-summary > div.price-wrapper > p > ins > span > bdi`)).or(page.locator(`div > div > div.product-main > div > div.product-info.summary.entry-summary > div.price-wrapper > p > span > bdi`)).textContent()) ?? '').trim();
    vars.subtotalProduct = ((await page.locator(`div#product-addons-total dd:nth-of-type(2) span.amount`).or(page.locator(`.product-addon-totals .wc-pao-subtotal-line .price .amount`)).textContent()) ?? '').trim();
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let unitPrice = parseFloat(`${vars.unitPrice}`.replace('$','').trim())
let cracking = parseFloat(`${vars.cracking}`.replace('$','').trim()) || 0;
let warranty = parseFloat(`${vars.warranty}`.replace('$','').trim()) || 0;
let cleaner = parseFloat(`${vars.cleaner}`.replace('$','').trim()) || 0;
let shammy = parseFloat(`${vars.shammy}`.replace('$','').trim()) || 0;
let subtotalProduct = parseFloat(`${vars.subtotalProduct}`.replace('$','').trim())
let subtotal2 = unitPrice + cracking + warranty + cleaner + shammy
subtotal2 = Number(subtotal2.toFixed(2))

return subtotalProduct === subtotal2;
 }, vars)).toBeTruthy();
  });

  test('04 - Variable Product Page - 2', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.goto(`${vars.startUrl ?? ''}product/epic-lil-dennys-carbon-blue-silver-rental-style-youth-bowling-shoes/`);
    await page.waitForLoadState('load');
    await page.waitForLoadState('load');
    vars.size = ((await page.locator(`#pa_unisex-shoe-sizing option[selected="selected"]`).textContent()) ?? '').trim();
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector('div.single_variation_wrap > div.wc-pao-addons-container')

return element != null }, vars)) {
      try { await page.locator(`div.wc-pao-addon:nth-of-type(1) > .form-row > select.wc-pao-addon-field`).first().fill(`yes-add-365-warranty-coverage-1`); } catch { await page.locator(`div.wc-pao-addon:nth-of-type(1) > .form-row > select.wc-pao-addon-field`).first().selectOption(`yes-add-365-warranty-coverage-1`); }
    }
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector('div.single_variation_wrap > div.wc-pao-addons-container')

return element != null }, vars)) {
      vars.warranty = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let text = document.querySelector<HTMLOptionElement>("option[value='yes-add-365-warranty-coverage-1']").textContent
let warrantyMatch = text.match(/\$\d*\.?\d+/);
let warranty = warrantyMatch ? warrantyMatch[0] : "";
return warranty }, vars);
    }
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector('div.single_variation_wrap > div.wc-pao-addons-container')

return element != null }, vars)) {
      await page.locator(`div.form-row:nth-of-type(1) > div:nth-of-type(1) > input[type="checkbox"].wc-pao-addon-checkbox`).filter({ visible: true }).first().click({ force: true });
    }
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector('div.single_variation_wrap > div.wc-pao-addons-container')

return element != null }, vars)) {
      vars.conditioner = ((await page.locator(`div.form-row:nth-of-type(1) > div:nth-of-type(1) .wc-pao-addon-price .woocommerce-Price-amount`).textContent()) ?? '').trim();
    }
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector('div.single_variation_wrap > div.wc-pao-addons-container')

return element != null }, vars)) {
      await page.locator(`div.form-row:nth-of-type(1) > div:nth-of-type(2) > input[type="checkbox"].wc-pao-addon-checkbox`).filter({ visible: true }).first().click({ force: true });
    }
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector('div.single_variation_wrap > div.wc-pao-addons-container')

return element != null }, vars)) {
      vars.fresheners  = ((await page.locator(`div.form-row:nth-of-type(1) > div:nth-of-type(2) .wc-pao-addon-price .woocommerce-Price-amount`).textContent()) ?? '').trim();
    }
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector<HTMLSelectElement>('div.wc-pao-addon-container.wc-pao-addon:nth-of-type(3) > .form-row.wc-pao-addon-wrap > select.wc-pao-addon-field')

return element != null }, vars)) {
      await page.locator(`div.wc-pao-addon-container.wc-pao-addon:nth-of-type(3) > .form-row.wc-pao-addon-wrap > select.wc-pao-addon-field`).filter({ visible: true }).first().click({ force: true });
    }
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector<HTMLSelectElement>('div.wc-pao-addon-container.wc-pao-addon:nth-of-type(3) > .form-row.wc-pao-addon-wrap > select.wc-pao-addon-field')

return element != null }, vars)) {
      try { await page.locator(`div.wc-pao-addon-container.wc-pao-addon:nth-of-type(3) > .form-row.wc-pao-addon-wrap > select.wc-pao-addon-field`).first().fill(`small-1`); } catch { await page.locator(`div.wc-pao-addon-container.wc-pao-addon:nth-of-type(3) > .form-row.wc-pao-addon-wrap > select.wc-pao-addon-field`).first().selectOption(`small-1`); }
    }
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector<HTMLSelectElement>('div.wc-pao-addon-container.wc-pao-addon:nth-of-type(3) > .form-row.wc-pao-addon-wrap > select.wc-pao-addon-field')

return element != null }, vars)) {
      vars.shirt = `Small`;
    }
    vars.prod_desc = ((await page.locator(`h1.product_title`).textContent()) ?? '').trim();
    vars.unitPrice = ((await page.locator(`div.product-info.summary > div > .price > ins > .woocommerce-Price-amount.amount > bdi`).or(page.locator(`div.product-info.summary > div > .price > .woocommerce-Price-amount.amount > bdi`)).or(page.locator(`div > div > div.product-main > div > div.product-info.summary.entry-summary > div.price-wrapper > p > ins > span > bdi`)).or(page.locator(`div > div > div.product-main > div > div.product-info.summary.entry-summary > div.price-wrapper > p > span > bdi`)).textContent()) ?? '').trim();
    vars.subtotalProduct = ((await page.locator(`div#product-addons-total dd:nth-of-type(2) span.amount`).or(page.locator(`.product-addon-totals .wc-pao-subtotal-line .price .amount`)).textContent()) ?? '').trim();
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let unitPrice = parseFloat(`${vars.unitPrice}`.replace('$','').trim())
let warranty = parseFloat(`${vars.warranty}`.replace('$','').trim()) || 0;
let conditioner = parseFloat(`${vars.conditioner}`.replace('$','').trim()) || 0;
let fresheners = parseFloat(`${vars.fresheners}`.replace('$','').trim()) || 0;
let subtotalProduct = parseFloat(`${vars.subtotalProduct}`.replace('$','').trim())
let subtotal2 = unitPrice + warranty + conditioner + fresheners
subtotal2 = Number(subtotal2.toFixed(2))

return subtotalProduct === subtotal2;
 }, vars)).toBeTruthy();
  });

  test('04 - Variable Product Page - 3', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.goto(`${vars.startUrl ?? ''}product/brunswick-ethos-solid-fast-track-coolwick-bowling-jersey/`);
    await page.waitForLoadState('load');
    await page.waitForLoadState('load');
    // skipped: select-open click on 'select.wc-pao-addon-field' — use selectOption instead
    try { await page.locator(`select.wc-pao-addon-field`).first().fill(`large-3`); } catch { await page.locator(`select.wc-pao-addon-field`).first().selectOption(`large-3`); }
    await expect(page.locator(`select.wc-pao-addon-field`).first()).toContainText(`large-3`);
    vars.size = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const size = document.querySelector<HTMLOptionElement>('option[value="large-3"]').textContent.trim()
return size }, vars);
    await page.locator(`div.wc-pao-addon-container.wc-pao-addon:nth-of-type(2) > .form-row.wc-pao-addon-wrap > div > input[type="checkbox"].wc-pao-addon-field.wc-pao-addon-checkbox`).filter({ visible: true }).first().click({ force: true });
    vars.upgrade = ((await page.locator(`.wc-pao-addon-price > .woocommerce-Price-amount.amount`).textContent()) ?? '').trim();
    try { await page.locator(`input[type="text"].input-text.wc-pao-addon-field`).first().fill(`Chris`); } catch { await page.locator(`input[type="text"].input-text.wc-pao-addon-field`).first().selectOption(`Chris`); }
    vars.namePrice = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let text = document.querySelector("h2.wc-pao-addon-heading").textContent;
let namePrice = text.match(/\$\d*\.?\d*/); // Matches $ followed by digits, optional dot, and optional digits
namePrice = namePrice ? Number(namePrice[0].replace('$', '')).toFixed(2) : "0.00";
return `$${namePrice}`; // Add back the $ sign }, vars);
    await page.locator(`div.wc-pao-addon-container.wc-pao-addon:nth-of-type(5) > .form-row.wc-pao-addon-wrap > div > input[type="checkbox"].wc-pao-addon-field.wc-pao-addon-checkbox`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`div.wc-pao-addon-container.wc-pao-addon:nth-of-type(6) > .form-row.wc-pao-addon-wrap > div > input[type="checkbox"].wc-pao-addon-field.wc-pao-addon-checkbox`).filter({ visible: true }).first().click({ force: true });
    vars.prod_desc = ((await page.locator(`h1.product_title`).textContent()) ?? '').trim();
    vars.unitPrice = ((await page.locator(`div.product-info.summary > div > .price > ins > .woocommerce-Price-amount.amount > bdi`).or(page.locator(`div.product-info.summary > div > .price > .woocommerce-Price-amount.amount > bdi`)).or(page.locator(`div > div > div.product-main > div > div.product-info.summary.entry-summary > div.price-wrapper > p > ins > span > bdi`)).or(page.locator(`div > div > div.product-main > div > div.product-info.summary.entry-summary > div.price-wrapper > p > span > bdi`)).textContent()) ?? '').trim();
    vars.subtotalProduct = ((await page.locator(`div#product-addons-total dd:nth-of-type(2) span.amount`).or(page.locator(`.product-addon-totals .wc-pao-subtotal-line .price .amount`)).textContent()) ?? '').trim();
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let unitPrice = parseFloat(`${vars.unitPrice}`.replace('$','').trim())
let upgrade = parseFloat(`${vars.upgrade}`.replace('$','').trim()) || 0;
let namePrice = parseFloat(`${vars.namePrice}`.replace('$','').trim()) || 0;
let subtotalProduct = parseFloat(`${vars.subtotalProduct}`.replace('$','').trim())
let subtotal2 = unitPrice + upgrade + namePrice
subtotal2 = Number(subtotal2.toFixed(2))

return subtotalProduct === subtotal2;
 }, vars)).toBeTruthy();
  });

  test('07 - Cart Page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    vars.qty = `2`;
    // ↓ 03 - Simple Product Page
    await page.goto(`${vars.startUrl ?? ''}shop/bowling-gear/bowling-accessories/bowling-shoe-accessories/3g-accessories/`);
    await page.waitForLoadState('load');
    await page.locator(`div.product-type-simple.instock a > img`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    vars.prod_desc = ((await page.locator(`h1.product_title`).or(page.locator(`h3.product_title`)).or(page.locator(`p > mark.has-inline-color > em`)).textContent()) ?? '').trim();
    vars.unitPrice = ((await page.locator(`p.price > ins > .woocommerce-Price-amount.amount > bdi`).or(page.locator(`p.price > .woocommerce-Price-amount.amount > bdi`)).or(page.locator(`p.price > span > ins > .woocommerce-Price-amount.amount > bdi`)).or(page.locator(`p.price > span > .woocommerce-Price-amount.amount > bdi`)).textContent()) ?? '').trim();
    // ↑ end 03 - Simple Product Page
    try { await page.locator(`input[name="quantity"]`).first().fill(`${vars.qty ?? ''}`); } catch { await page.locator(`input[name="quantity"]`).first().selectOption(`${vars.qty ?? ''}`); }
    await page.locator(`button[name="add-to-cart"]`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.woocommerce-message`).first()).toContainText(`${vars.qty ?? ''} × “${vars.prod_desc ?? ''}” have been added to your cart.`);
    await expect(page.locator(`#cart-popup:not(.mfp-hide)`)).not.toHaveCount(0);
    await expect(page.locator(`#cart-popup a[href*="/product/"]`).first()).toHaveText(`${vars.prod_desc ?? ''}`);
    await expect(page.locator(`.ux-mini-cart-qty > .quantity`).first()).toHaveText(`2 × ${vars.unitPrice ?? ''}`);
    vars.subtotalPrice = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let unitPrice = `${vars.unitPrice}`
unitPrice = unitPrice.replace(`${vars.Symbol}`,"").trim();
let qty = vars.qty
let subtotal = unitPrice * qty
return `${vars.Symbol}`+(Math.round(subtotal*100)/100).toFixed(2) }, vars);
    await expect(page.locator(`.woocommerce-mini-cart__total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
    await page.locator(`#cart-popup a[href*="/cart/"].button.wc-forward`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    await shippingOnCart(page, vars);
    await expect(page.locator(`td.product-name > a[href*="/product/"]`).first()).toContainText(`${vars.prod_desc ?? ''}`);
    await expect(page.locator(`td.product-price > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    await expect(page.locator(`div.quantity > .qty`).first()).toHaveText(`${vars.qty ?? ''}`);
    await expect(page.locator(`td.product-subtotal > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
    await expect(page.locator(`tr.cart-subtotal > td > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
    vars.shippingPrice = ((await page.locator(`li:nth-of-type(1) > label > .woocommerce-Price-amount.amount > bdi`).or(page.locator(`li:nth-of-type(1) > label`)).textContent()) ?? '').trim();
    vars.taxPrice = ((await page.locator(`tr.tax-rate > td > span.woocommerce-Price-amount.amount`).or(page.locator(`tr.tax-total > td > span.woocommerce-Price-amount.amount`)).textContent()) ?? '').trim();
    vars.total = ((await page.locator(`strong > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
  });

  test('08 - Checkout page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    vars.qty = `1`;
    // ↓ 04 - Variable Product Page
    // ↓ 02 - Balls by Brand Page
    // ↓ 01 - Home Page
    await page.waitForLoadState('load');
    try {
      await page.locator(`iframe#attentive_creative button#closeIconContainer`).filter({ visible: true }).first().click({ force: true });
    } catch { /* optional step: click */ }
    // ↑ end 01 - Home Page
    await page.locator(`a[href*="/shop/bowling-gear/bowling-balls/"][title="Bowling Balls"].nav-top-link`).first().hover();
    await page.locator(`li#tab-by-brand > a`).first().hover();
    await page.locator(`xpath=//span[@class = 'ux-menu-link__text' and contains(text(), 'SWAG')]`).filter({ visible: true }).first().click({ force: true });
    // ↑ end 02 - Balls by Brand Page
    await page.locator(`div.product-type-variable.instock a > img`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    vars.weight = ((await page.locator(`#pa_ball-weight option[selected="selected"]`).textContent()) ?? '').trim();
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector('div.single_variation_wrap > div.wc-pao-addons-container, div.single_variation_wrap > div.product-addon')

return element != null }, vars)) {
      try { await page.locator(`div.wc-pao-addon:nth-of-type(1) > .form-row > select.wc-pao-addon-field`).or(page.locator(`div.product-addon.product-addon-drilling-protection .form-row > select.addon-select`)).first().fill(`yes-covers-cracking-during-ball-drilling-1`); } catch { await page.locator(`div.wc-pao-addon:nth-of-type(1) > .form-row > select.wc-pao-addon-field`).or(page.locator(`div.product-addon.product-addon-drilling-protection .form-row > select.addon-select`)).first().selectOption(`yes-covers-cracking-during-ball-drilling-1`); }
    }
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector('div.single_variation_wrap > div.wc-pao-addons-container, div.single_variation_wrap > div.product-addon')

return element != null }, vars)) {
      vars.cracking = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let text = document.querySelector<HTMLOptionElement>("option[value='yes-covers-cracking-during-ball-drilling-1']").textContent
let crackingMatch = text.match(/\$\d*\.?\d+/);
let cracking = crackingMatch ? crackingMatch[0] : "";
return cracking }, vars);
    }
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector('div.single_variation_wrap > div.wc-pao-addons-container, div.single_variation_wrap > div.product-addon')

return element != null }, vars)) {
      try { await page.locator(`div.wc-pao-addon:nth-of-type(2) > .form-row > select.wc-pao-addon-field`).or(page.locator(`div.product-addon.product-addon-extra-365-warranty-coverage .form-row > select.addon-select`)).first().fill(`yes-add-365-warranty-coverage-1`); } catch { await page.locator(`div.wc-pao-addon:nth-of-type(2) > .form-row > select.wc-pao-addon-field`).or(page.locator(`div.product-addon.product-addon-extra-365-warranty-coverage .form-row > select.addon-select`)).first().selectOption(`yes-add-365-warranty-coverage-1`); }
    }
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector('div.single_variation_wrap > div.wc-pao-addons-container, div.single_variation_wrap > div.product-addon')

return element != null }, vars)) {
      vars.warranty = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let text = document.querySelector<HTMLOptionElement>("option[value='yes-add-365-warranty-coverage-1']").textContent
let warrantyMatch = text.match(/\$\d*\.?\d+/);
let warranty = warrantyMatch ? warrantyMatch[0] : "";
return warranty }, vars);
    }
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector('div.single_variation_wrap > div.wc-pao-addons-container, div.single_variation_wrap > div.product-addon')

return element != null }, vars)) {
      try { await page.locator(`input[type="text"].input-text.wc-pao-addon-field`).or(page.locator(`div.product-addon.product-addon-specific-requests input[type="text"].input-text`)).first().fill(`Testing request`); } catch { await page.locator(`input[type="text"].input-text.wc-pao-addon-field`).or(page.locator(`div.product-addon.product-addon-specific-requests input[type="text"].input-text`)).first().selectOption(`Testing request`); }
    }
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector('div.single_variation_wrap > div.wc-pao-addons-container, div.single_variation_wrap > div.product-addon')

return element != null }, vars)) {
      await page.locator(`div.form-row:nth-of-type(1) > div:nth-of-type(1) > input[type="checkbox"].wc-pao-addon-checkbox`).or(page.locator(`div.product-addon.product-addon-money-saving-options > p:nth-of-type(1) input[type="checkbox"]`)).filter({ visible: true }).first().click({ force: true });
    }
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector('div.single_variation_wrap > div.wc-pao-addons-container, div.single_variation_wrap > div.product-addon')

return element != null }, vars)) {
      vars.cleaner = ((await page.locator(`div.form-row:nth-of-type(1) > div:nth-of-type(1) .wc-pao-addon-price .woocommerce-Price-amount`).or(page.locator(`div.product-addon.product-addon-money-saving-options > p:nth-of-type(1) .woocommerce-Price-amount.amount > bdi`)).textContent()) ?? '').trim();
    }
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector('div.single_variation_wrap > div.wc-pao-addons-container, div.single_variation_wrap > div.product-addon')

return element != null }, vars)) {
      await page.locator(`div.form-row:nth-of-type(1) > div:nth-of-type(2) > input[type="checkbox"].wc-pao-addon-checkbox`).or(page.locator(`div.product-addon.product-addon-money-saving-options > p:nth-of-type(2) input[type="checkbox"]`)).filter({ visible: true }).first().click({ force: true });
    }
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector('div.single_variation_wrap > div.wc-pao-addons-container, div.single_variation_wrap > div.product-addon')

return element != null }, vars)) {
      vars.shammy  = ((await page.locator(`div.form-row:nth-of-type(1) > div:nth-of-type(2) .wc-pao-addon-price .woocommerce-Price-amount`).or(page.locator(`div.product-addon.product-addon-money-saving-options > p:nth-of-type(2) .woocommerce-Price-amount.amount > bdi`)).textContent()) ?? '').trim();
    }
    vars.prod_desc = ((await page.locator(`h1.product_title`).textContent()) ?? '').trim();
    vars.unitPrice = ((await page.locator(`div > .price > ins > .woocommerce-Price-amount.amount > bdi`).or(page.locator(`div > .price > .woocommerce-Price-amount.amount > bdi`)).or(page.locator(`div > div > div.product-main > div > div.product-info.summary.entry-summary > div.price-wrapper > p > ins > span > bdi`)).or(page.locator(`div > div > div.product-main > div > div.product-info.summary.entry-summary > div.price-wrapper > p > span > bdi`)).textContent()) ?? '').trim();
    vars.subtotalProduct = ((await page.locator(`div#product-addons-total dd:nth-of-type(2) span.amount`).or(page.locator(`.product-addon-totals .wc-pao-subtotal-line .price .amount`)).textContent()) ?? '').trim();
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let unitPrice = parseFloat(`${vars.unitPrice}`.replace('$','').trim())
let cracking = parseFloat(`${vars.cracking}`.replace('$','').trim()) || 0;
let warranty = parseFloat(`${vars.warranty}`.replace('$','').trim()) || 0;
let cleaner = parseFloat(`${vars.cleaner}`.replace('$','').trim()) || 0;
let shammy = parseFloat(`${vars.shammy}`.replace('$','').trim()) || 0;
let subtotalProduct = parseFloat(`${vars.subtotalProduct}`.replace('$','').trim())
let subtotal2 = unitPrice + cracking + warranty + cleaner + shammy
subtotal2 = Number(subtotal2.toFixed(2))

return subtotalProduct === subtotal2;
 }, vars)).toBeTruthy();
    // ↑ end 04 - Variable Product Page
    await page.locator(`xpath=//button[contains(text(), "Add to cart")]`).or(page.locator(`button[type="submit"].single_add_to_cart_button`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`#cart-popup a[href*="/product/"]`).first()).toHaveText(`${vars.prod_desc ?? ''} - ${vars.weight ?? ''}`);
    await expect(page.locator(`dl.variation`).first()).toHaveText(`Drilling Protection:

Yes - Covers Cracking During Ball Drilling

Extra 365 Warranty Coverage:

Yes - Add 365 Warranty Coverage

Specific Requests:

Testing request

Money Saving Options:

Add Max Tack Ball Cleaner 8oz.

Money Saving Options:

Add BowlersMart Blue Shammy`);
    await expect(page.locator(`#cart-popup .quantity > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.subtotalProduct ?? ''}`);
    await expect(page.locator(`#cart-popup .woocommerce-mini-cart__total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.subtotalProduct ?? ''}`);
    await page.locator(`a[href*="/checkout/"].button.checkout`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`td.product-name`).first()).toContainText(`${vars.prod_desc ?? ''} - ${vars.weight ?? ''}  × 1`);
    await expect(page.locator(`dl.variation`).first()).toHaveText(`Drilling Protection:

Yes - Covers Cracking During Ball Drilling

Extra 365 Warranty Coverage:

Yes - Add 365 Warranty Coverage

Specific Requests:

Testing request

Money Saving Options:

Add Max Tack Ball Cleaner 8oz.

Money Saving Options:

Add BowlersMart Blue Shammy`);
    await page.locator(`.create-account > label > input[type="checkbox"].input-checkbox`).filter({ visible: true }).first().click({ force: true });
    await blockUI(page, vars);
    await page.locator(`.create-account > label > input[type="checkbox"].input-checkbox`).filter({ visible: true }).first().click({ force: true });
    await blockUI(page, vars);
    await expect(page.locator(`.product-total > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.subtotalProduct ?? ''}`);
    await expect(page.locator(`tr.cart-subtotal > td > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.subtotalProduct ?? ''}`);
    await expect(page.locator(`label[for="shipping_method_0_free_shipping1"]`).first()).toContainText(`FREE Standard Shipping`);
    vars.shippingProtection = ((await page.locator(`tr.fee > td > .woocommerce-Price-amount.amount > bdi`).or(page.locator(`#order_review > div.optional_fee_container > table > tbody > tr > td > p > span`)).textContent()) ?? '').trim();
    vars.taxPrice = ((await page.locator(`tr.tax-total > td > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
    vars.total = ((await page.locator(`strong > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let subtotalProduct = parseFloat(`${vars.subtotalProduct}`.replace('$','').trim())
let shippingProtection

if (`${vars.shippingProtection}` === '') {
    shippingProtection = 0
} else {
    shippingProtection  = parseFloat(`${vars.shippingProtection}`.replace('$','').trim())
}

let tax = parseFloat(`${vars.taxPrice}`.replace('$','').trim())
let total = parseFloat(`${vars.total}`.replace('$','').trim())

let total2 = subtotalProduct + shippingProtection + tax
total2 = Number(total2.toFixed(2))

return total === total2 }, vars)).toBeTruthy();
  });

  test('10 - Registration, My Account links and Login', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await exitTestProdSite(page, vars);
    // ↓ 01 - Home Page
    await page.waitForLoadState('load');
    try {
      await page.locator(`iframe#attentive_creative button#closeIconContainer`).filter({ visible: true }).first().click({ force: true });
    } catch { /* optional step: click */ }
    // ↑ end 01 - Home Page
    vars.admin = `no`;
    vars.email = `${vars.emailReg ?? ''}`;
    vars.username = `${vars.alphanumeric ?? ''}`;
    await goToMyAccount(page, vars);
    await register(page, vars);
    await goToMyAccount(page, vars);
    await page.locator(`.dashboard-links > .woocommerce-MyAccount-navigation-link.woocommerce-MyAccount-navigation-link--pre-orders > a[href*="/my-account/pre-orders/"]`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.woocommerce-MyAccount-content > p`).first()).toContainText(`You have no pre-orders.`);
    await page.locator(`#my-account-nav > .woocommerce-MyAccount-navigation-link.woocommerce-MyAccount-navigation-link--orders > a[href*="/my-account/orders/"]`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.message-container`).first()).toHaveText(`No order has been made yet.`);
    await page.locator(`#my-account-nav > .woocommerce-MyAccount-navigation-link.woocommerce-MyAccount-navigation-link--pw-gift-card-balance > a[href*="/balance/"]`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`#pwgc-balance-container`)).not.toHaveCount(0);
    await page.locator(`i.icon-user`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`#my-account-nav > .woocommerce-MyAccount-navigation-link.woocommerce-MyAccount-navigation-link--edit-address > a[href*="/my-account/edit-address/"]`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.u-columns.addresses`)).not.toHaveCount(0);
    await page.locator(`#my-account-nav > .woocommerce-MyAccount-navigation-link.woocommerce-MyAccount-navigation-link--backinstock > a[href*="/my-account/backinstock/"]`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`div:nth-of-type(2) > table.woocommerce-orders-table.woocommerce-MyAccount-orders.shop_table.shop_table_responsive.my_account_orders.account-orders-table > tbody > tr > td`).first()).toContainText(`No active notifications found.`);
    await page.locator(`#my-account-nav > .woocommerce-MyAccount-navigation-link.woocommerce-MyAccount-navigation-link--payment-methods > a[href*="/my-account/payment-methods/"]`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.message-container`).first()).toContainText(`No saved methods found.`);
    await page.locator(`#my-account-nav > .woocommerce-MyAccount-navigation-link.woocommerce-MyAccount-navigation-link--edit-account > a[href*="/my-account/edit-account/"]`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`form.woocommerce-EditAccountForm`)).not.toHaveCount(0);
    await page.locator(`#my-account-nav > .woocommerce-MyAccount-navigation-link.woocommerce-MyAccount-navigation-link--rewards > a[href*="/my-account/rewards/"]`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`#my-account-nav > .woocommerce-MyAccount-navigation-link.woocommerce-MyAccount-navigation-link--customer-logout > a[href*="/my-account/customer-logout/"]`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`xpath=//a[contains(text(), "Confirm and log out")]`).or(page.locator(`.message-container > a[href*="/wp-login.php?action=logout&redirect_to=https%3A%2F%2Fbowlersmart-com-staging.go-vip.net%2Fmy-account%2F&_wpnonce=48a264574c"]`)).filter({ visible: true }).first().click({ force: true });
    await login(page, vars);
  });

  test('11 - “Forgot password?” flow', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await exitTestProdSite(page, vars);
    vars.email = `${vars.emailForgot ?? ''}`;
    vars.username = `${vars.alphanumeric ?? ''}`;
    await register(page, vars);
    await goToMyAccount(page, vars);
    await page.locator(`#my-account-nav > .woocommerce-MyAccount-navigation-link.woocommerce-MyAccount-navigation-link--customer-logout > a[href*="/my-account/customer-logout/"]`).filter({ visible: true }).first().click({ force: true });
    await page.waitForTimeout(60000);
    await page.locator(`xpath=//a[contains(text(), "Confirm and log out")]`).or(page.locator(`.message-container > a[href*="/wp-login.php?action=logout&redirect_to=https%3A%2F%2Fbowlersmart-com-staging.go-vip.net%2Fmy-account%2F&_wpnonce=b73df221f2"]`)).filter({ visible: true }).first().click({ force: true });
    await page.locator(`xpath=//a[contains(text(), "Lost your password?")]`).or(page.locator(`.woocommerce-LostPassword > a[href*="/my-account/lost-password/"]`)).filter({ visible: true }).first().click({ force: true });
    try { await page.locator(`#user_login`).first().fill(`${vars.email ?? ''}`); } catch { await page.locator(`#user_login`).first().selectOption(`${vars.email ?? ''}`); }
    await page.locator(`xpath=//button[contains(text(), "Reset password")]`).or(page.locator(`button[type="submit"].woocommerce-Button`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.message-container`).first()).toHaveText(` Password reset email has been sent.`);
    await extractUserFromEmail(page, vars);
    await page.locator(`xpath=//a[contains(text(), 'Password Reset Request')]`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`xpath=//a[contains(text(), "Click here to reset your password")]`).or(page.locator(`a[href*="${vars.startUrl ?? ''}my-account/lost-password/?key="]`)).filter({ visible: true }).first().click({ force: true });
    try { await page.locator(`#password_1`).first().fill(`${vars.password2 ?? ''}`); } catch { await page.locator(`#password_1`).first().selectOption(`${vars.password2 ?? ''}`); }
    try { await page.locator(`#password_2`).first().fill(`${vars.password2 ?? ''}`); } catch { await page.locator(`#password_2`).first().selectOption(`${vars.password2 ?? ''}`); }
    await page.locator(`xpath=//button[contains(text(), "Save")]`).or(page.locator(`button[type="submit"].woocommerce-Button`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.message-container`).first()).toHaveText(` Your password has been reset successfully.`);
  });

  test('12 - Contact Us Page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.locator(`footer a[href="/contact-us/"]`).filter({ visible: true }).first().click({ force: true });
    await exitTestProdSite(page, vars);
    try { await page.locator(`#input_3_1_3`).first().fill(`QA`); } catch { await page.locator(`#input_3_1_3`).first().selectOption(`QA`); }
    try { await page.locator(`#input_3_1_6`).first().fill(`Test`); } catch { await page.locator(`#input_3_1_6`).first().selectOption(`Test`); }
    try { await page.locator(`#input_3_2`).first().fill(`${vars.email ?? ''}`); } catch { await page.locator(`#input_3_2`).first().selectOption(`${vars.email ?? ''}`); }
    try { await page.locator(`#input_3_3`).first().fill(`(304) 564-5654`); } catch { await page.locator(`#input_3_3`).first().selectOption(`(304) 564-5654`); }
    try { await page.locator(`#input_3_10`).first().fill(`Yes`); } catch { await page.locator(`#input_3_10`).first().selectOption(`Yes`); }
    try { await page.locator(`#input_3_7`).first().fill(`General Question`); } catch { await page.locator(`#input_3_7`).first().selectOption(`General Question`); }
    try { await page.locator(`#input_3_5`).first().fill(`Testing Description`); } catch { await page.locator(`#input_3_5`).first().selectOption(`Testing Description`); }
    // TODO: file upload — replace URL with a local file path or fetch buffer
    await page.locator(`input[type='file']`).first().setInputFiles(`https://ghostinspector-prod.s3.amazonaws.com/uploads/78d27f93-93cb-40e7-aca0-ac7a8824694e.jpg`);
    {
      const _lbl = page.locator(`label[for="gform_submit_button_3"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#gform_submit_button_3`).filter({ visible: true }).first().click({ force: true }); }
    }
    await expect(page.locator(`#gform_confirmation_message_3`).first()).toHaveText(`QA,

Thank you for contacting the customer excellence team here at BowlersMart.com! We have received your email and are looking into your inquiry. We strive to provide an excellent customer service experience and will respond to your request shortly.

Warm Regards,
Customer Excellence Team
BowlersMart.com`);
  });

});
