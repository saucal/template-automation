// @ts-nocheck
// Auto-generated from Ghost Inspector suite: "Melon - Basic WooCommerce Test - UK Site"
// Review all TODOs before running.
import dotenv from 'dotenv';
dotenv.config();
import { test, expect } from '@playwright/test';
import { blockImageSizes, blockUI, calculateSubtotal, extractUserFromEmail, placeOrderElement, uRLOfCurrentPage, wooCommerceCheckoutTemplate } from '../helpers/common-steps-for-all-projects';
import { checkCountryAndCurrency, closePopup, login, register, upSellFlow } from '../helpers/common-steps-for-melon';

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

test.describe('Melon - Basic WooCommerce Test - UK Site', () => {

  const vars = new Proxy<Record<string, string>>({
    "email": `qa+gi_order_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "emailReg": `qa+gi_reg_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "emailForgot": `qa+gi_forgot_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "payPalUser": "qa+gi_sb-8eg0v132169@saucal.com",
    "payPalPass": process.env.PAY_PAL_PASS ?? '',
    "adminUser": "saucal_maintenance_admin",
    "adminPass": process.env.ADMIN_PASS ?? '',
    "Symbol": "£",
    "project": "melon",
    "city": "Cardiff",
    "zipCode": "CF10 1DY",
    "phone": "3453453454",
    "year": "26",
    "firstName": "QA",
    "lastName": `${Math.random().toString(36).substring(2, 10)}`,
    "street3": "123 Shipping",
    "street4": "block 1",
    "company": "Testing SA",
    "company2": "Testing Shipping",
    "url": "https://melonoptics-maintenance.mystagingwebsite.com/",
    "lastName2": `${Math.random().toString(36).substring(2, 10)} Shipp`,
    "currency": "GBP",
    "password": process.env.PASSWORD ?? '',
    "password2": process.env.PASSWORD2 ?? '',
    "country": "UK",
    "countryComplete": "United Kingdom (UK)",
    "street": "123 false street",
    "street2": "Ap. 4",
  }, { get: (o: Record<string, string>, k: string) => (k in o ? o[k] : '') });

  test('01 - Home Page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    vars.country = `GB`;
    await page.waitForLoadState('load');
    await closePopup(page, vars);
    await uRLOfCurrentPage(page, vars);
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let url = `${vars.site}`
return url === `${vars.url}` }, vars)).toBeTruthy();
    await checkCountryAndCurrency(page, vars);
  });

  test('01 - Home Page - Australia', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    vars.Symbol = `$`;
    vars.country = `AU`;
    vars.currency = `AUD`;
    await page.waitForLoadState('load');
    await uRLOfCurrentPage(page, vars);
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let url = `${vars.site}`
return url === `${vars.url}` }, vars)).toBeTruthy();
    await checkCountryAndCurrency(page, vars);
  });

  test('01 - Home Page - Canada', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    vars.Symbol = `$`;
    vars.currency = `CAD`;
    vars.country = `CA`;
    await page.waitForLoadState('load');
    await uRLOfCurrentPage(page, vars);
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let url = `${vars.site}`
return url === `${vars.url}` }, vars)).toBeTruthy();
    await checkCountryAndCurrency(page, vars);
  });

  test('01 - Home Page - EU site', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    vars.Symbol = `€`;
    vars.country = `IT`;
    vars.currency = `EUR`;
    await page.waitForLoadState('load');
    await uRLOfCurrentPage(page, vars);
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let url = `${vars.site}`
return url === `${vars.url}eu/` }, vars)).toBeTruthy();
    await checkCountryAndCurrency(page, vars);
  });

  test('01 - Home Page - International', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    vars.country = `GB`;
    vars.currency = `GBP`;
    await page.waitForLoadState('load');
    await uRLOfCurrentPage(page, vars);
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let url = `${vars.site}`
return url === `${vars.url}` }, vars)).toBeTruthy();
    await checkCountryAndCurrency(page, vars);
  });

  test('01 - Home Page - US', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    vars.country = `US`;
    vars.Symbol = `$`;
    vars.currency = `USD`;
    await page.waitForLoadState('load');
    await uRLOfCurrentPage(page, vars);
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let url = `${vars.site}`
return url === `${vars.url}us/` }, vars)).toBeTruthy();
    await checkCountryAndCurrency(page, vars);
  });

  test('01 - Home Page - ZA site', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    vars.country = `ZA`;
    vars.Symbol = `R`;
    vars.currency = `ZAR`;
    await page.waitForLoadState('load');
    await uRLOfCurrentPage(page, vars);
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let url = `${vars.site}`
return url.includes(`${vars.url}za/`) }, vars)).toBeTruthy();
    await checkCountryAndCurrency(page, vars);
    vars.currency = `GBP`;
    vars.Symbol = `£`;
    vars.country = `UK`;
  });

  test('02 - Accessories Page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    vars.currency = `GBP`;
    vars.country = `UK`;
    vars.Symbol = `£`;
    await page.waitForLoadState('load');
    await closePopup(page, vars);
    await page.locator(`li.mega-menu-item.mega-menu-item-type-custom.mega-menu-item-object-custom.mega-menu-item-has-children.mega-menu-megamenu.mega-align-bottom-left:nth-of-type(4) > a[href="#"].mega-menu-link`).or(page.locator(`li.mega-category-menu.mega-menu-item.mega-menu-item-type-custom.mega-menu-item-object-custom.mega-menu-item-has-children.mega-align-bottom-left.mega-menu-flyout.mega-menu-trigger.category-menu:nth-of-type(4) > a[href="#"].mega-menu-link`)).filter({ visible: true }).first().click({ force: true });
    await page.locator(`xpath=//a[contains(text(),'Accessories')]`).or(page.locator(`a[href*="/product-category/accessories/"]`)).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
  });

  test('02 - Sunglasses Menu', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.waitForLoadState('load');
    await closePopup(page, vars);
    await page.locator(`li.mega-menu-item.mega-menu-item-type-custom.mega-menu-item-object-custom.mega-menu-item-has-children.mega-align-bottom-left.mega-menu-flyout.mega-menu-trigger:nth-of-type(1) > a[href="#"].mega-menu-link`).or(page.locator(`xpath=//a[contains(text(),'Sunglasses')]`)).filter({ visible: true }).first().click({ force: true });
  });

  test('03 - Product page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await closePopup(page, vars);
    await page.locator(`xpath=//a[contains(text(),'Goggles')]`).or(page.locator(`li.mega-menu-item.mega-menu-item-type-custom.mega-menu-item-object-custom.mega-menu-item-has-children.mega-menu-megamenu.mega-align-bottom-left:nth-of-type(1) > a[href="#"].mega-menu-link`)).filter({ visible: true }).first().click({ force: true });
    await page.goto(`${vars.startUrl ?? ''}shop/diablo-mtb-goggles/?pa_frame=cosmic-black&pa_lens=smoke&pa_outrigger-nosepiece=galaxy-matte&pa_strap=black-with-white-silicon`);
    await page.waitForLoadState('load');
    await page.waitForLoadState('load');
    if ((() => { let test =vars.test
return test != "slider" })()) {
      vars.prod_desc = ((await page.locator(`h1.product_title`).textContent()) ?? '').trim();
    }
    if ((() => { let test =vars.test
return test != "slider" })()) {
      vars.stock = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let available = document.querySelector("div.composite_availability");
let stock;
if (available.getAttribute("style") === '' || available.getAttribute("style") === null) {
    stock = document.querySelector("div.composite_availability > .stock.out-of-stock.insufficient-stock").innerText;
    stock = stock.replace("Insufficient stock → ","");
    stock = stock.split(", ");
    for ( var i = 0; i < stock.length; i++ ) {
        stock[i] = stock[i].toLowerCase();
        if (stock[i] === "outrigger/nose") {
            stock[i] = stock[i].replace("/","-");
        }
    }
} else {
    stock = []
}
return stock }, vars);
    }
    if ((() => { let test =vars.test
return test != "slider" })()) {
      vars.prod_desc = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let prodDesc = `${vars.prod_desc}`
prodDesc = prodDesc.replace("–","-")
return prodDesc }, vars);
    }
    if ((() => { let test =vars.test
let stock = vars.stock
return test != "slider" && stock.length > 0 })()) {
      vars.comp1 = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let stock = vars.stock
return stock[0] }, vars);
    }
    if ((() => { let test =vars.test
let stock = vars.stock
return test != "slider" && stock.length > 0 })()) {
      await page.locator(`.melon-optics-customizer-component-tabs > li[data-customizer-component="${vars.comp1 ?? ''}"]`).filter({ visible: true }).first().click({ force: true });
    }
    if ((() => { let test =vars.test
let stock = vars.stock
return test != "slider" && stock.length > 0 })()) {
      await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return new Promise(function (resolve, reject) {
  let stock = vars.stock;
  let available = document.querySelector("div.composite_availability");
  let components = document.querySelectorAll('div[data-customizer-component="'+stock[0]+'"] > ul > li:not(.disabled)');
  let comp = document.querySelector("div.composite_availability > .stock.out-of-stock.insufficient-stock").innerText;
      comp = comp.replace("Insufficient stock → ","");
      comp = comp.split(", ");
      comp = comp[0];
  let inStock = document.querySelector("div.composite_availability > .stock.out-of-stock.insufficient-stock").innerText;
  let n = 0
  function clickComponent(n) {
    if (n >= components.length) {
      resolve();
      return;
    }
    components[n].click();
    setTimeout(() => {
      inStock = document.querySelector("div.composite_availability > .stock.out-of-stock.insufficient-stock").innerText;
      if (inStock.includes(comp)) {
        available = document.querySelector("div.composite_availability");
        if (available.getAttribute("style") === '' ||available.getAttribute("style") === null) {
          clickComponent(n + 1);
        } else {
          resolve();
        }
      } else {
        resolve();
      }
    }, 1000);
  }

  clickComponent(n);
}) }, vars);
    }
    if ((() => { let test =vars.test
let stock = vars.stock
return test != "slider" && stock.length > 1 })()) {
      vars.comp2 = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let stock = vars.stock
return stock[1] }, vars);
    }
    if ((() => { let test =vars.test
let stock = vars.stock
return test != "slider" && stock.length > 1 })()) {
      await page.locator(`.melon-optics-customizer-component-tabs > li[data-customizer-component="${vars.comp2 ?? ''}"]`).filter({ visible: true }).first().click({ force: true });
    }
    if ((() => { let test =vars.test
let stock = vars.stock
return test != "slider" && stock.length > 1 })()) {
      await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return new Promise(function (resolve, reject) {
  let stock = vars.stock;
  let available = document.querySelector("div.composite_availability");
  let components = document.querySelectorAll('div[data-customizer-component="'+stock[1]+'"] > ul > li:not(.disabled)');
  let comp = document.querySelector("div.composite_availability > .stock.out-of-stock.insufficient-stock").innerText;
      comp = comp.replace("Insufficient stock → ","");
      comp = comp.split(", ");
      comp = comp[0];
  let inStock = document.querySelector("div.composite_availability > .stock.out-of-stock.insufficient-stock").innerText;
  let n = 0
  function clickComponent(n) {
    if (n >= components.length) {
      resolve();
      return;
    }
    components[n].click();
    setTimeout(() => {
      inStock = document.querySelector("div.composite_availability > .stock.out-of-stock.insufficient-stock").innerText;
      if (inStock.includes(comp)) {
        available = document.querySelector("div.composite_availability");
        if (available.getAttribute("style") === '' ||available.getAttribute("style") === null) {
          clickComponent(n + 1);
        } else {
          resolve();
        }
      } else {
        resolve();
      }
    }, 1000);
  }

  clickComponent(n);
}) }, vars);
    }
    if ((() => { let test =vars.test
let stock = vars.stock
return test != "slider" && stock.length > 2 })()) {
      vars.comp3 = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let stock = vars.stock
return stock[2] }, vars);
    }
    if ((() => { let test =vars.test
let stock = vars.stock
return test != "slider" && stock.length > 2 })()) {
      await page.locator(`.melon-optics-customizer-component-tabs > li[data-customizer-component="${vars.comp3 ?? ''}"]`).filter({ visible: true }).first().click({ force: true });
    }
    if ((() => { let test =vars.test
let stock = vars.stock
return test != "slider" && stock.length > 2 })()) {
      await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return new Promise(function (resolve, reject) {
  let stock = vars.stock;
  let available = document.querySelector("div.composite_availability");
  let components = document.querySelectorAll('div[data-customizer-component="'+stock[2]+'"] > ul > li:not(.disabled)');
  let comp = document.querySelector("div.composite_availability > .stock.out-of-stock.insufficient-stock").innerText;
      comp = comp.replace("Insufficient stock → ","");
      comp = comp.split(", ");
      comp = comp[0];
  let inStock = document.querySelector("div.composite_availability > .stock.out-of-stock.insufficient-stock").innerText;
  let n = 0
  function clickComponent(n) {
    if (n >= components.length) {
      resolve();
      return;
    }
    components[n].click();
    setTimeout(() => {
      inStock = document.querySelector("div.composite_availability > .stock.out-of-stock.insufficient-stock").innerText;
      if (inStock.includes(comp)) {
        available = document.querySelector("div.composite_availability");
        if (available.getAttribute("style") === '' ||available.getAttribute("style") === null) {
          clickComponent(n + 1);
        } else {
          resolve();
        }
      } else {
        resolve();
      }
    }, 1000);
  }

  clickComponent(n);
}) }, vars);
    }
    if ((() => { let test =vars.test
let stock = vars.stock
return test != "slider" && stock.length > 3 })()) {
      vars.comp4 = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let stock = vars.stock
return stock[3] }, vars);
    }
    if ((() => { let test =vars.test
let stock = vars.stock
return test != "slider" && stock.length > 3 })()) {
      await page.locator(`.melon-optics-customizer-component-tabs > li[data-customizer-component="${vars.comp4 ?? ''}"]`).filter({ visible: true }).first().click({ force: true });
    }
    if ((() => { let test =vars.test
let stock = vars.stock
return test != "slider" && stock.length > 3 })()) {
      await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return new Promise(function (resolve, reject) {
  let stock = vars.stock;
  let available = document.querySelector("div.composite_availability");
  let components = document.querySelectorAll('div[data-customizer-component="'+stock[3]+'"] > ul > li:not(.disabled)');
  let comp = document.querySelector("div.composite_availability > .stock.out-of-stock.insufficient-stock").innerText;
      comp = comp.replace("Insufficient stock → ","");
      comp = comp.split(", ");
      comp = comp[0];
  let inStock = document.querySelector("div.composite_availability > .stock.out-of-stock.insufficient-stock").innerText;
  let n = 0
  function clickComponent(n) {
    if (n >= components.length) {
      resolve();
      return;
    }
    components[n].click();
    setTimeout(() => {
      inStock = document.querySelector("div.composite_availability > .stock.out-of-stock.insufficient-stock").innerText;
      if (inStock.includes(comp)) {
        available = document.querySelector("div.composite_availability");
        if (available.getAttribute("style") === '' ||available.getAttribute("style") === null) {
          clickComponent(n + 1);
        } else {
          resolve();
        }
      } else {
        resolve();
      }
    }, 1000);
  }

  clickComponent(n);
}) }, vars);
    }
    if ((() => { let test =vars.test
return test != "slider" })()) {
      vars.straps = ((await page.locator(`div:nth-of-type(2) > ul > li.main-component:nth-of-type(1)`).textContent()) ?? '').trim();
    }
    if ((() => { let test =vars.test
return test != "slider" })()) {
      vars.lens = ((await page.locator(`div:nth-of-type(2) > ul > li.main-component:nth-of-type(2)`).textContent()) ?? '').trim();
    }
    if ((() => { let test =vars.test
return test != "slider" })()) {
      vars.outrigger = ((await page.locator(`div:nth-of-type(2) > ul > li.main-component:nth-of-type(3)`).textContent()) ?? '').trim();
    }
    if ((() => { let test =vars.test
return test != "slider" })()) {
      vars.frame = ((await page.locator(`div:nth-of-type(2) > ul > li.main-component:nth-of-type(4)`).textContent()) ?? '').trim();
    }
    if ((() => { let test =vars.test
return test != "slider" })()) {
      vars.unitPrice = ((await page.locator(`div.composite_price > p.price > ins > span.woocommerce-Price-amount.amount`).or(page.locator(`div.composite_price > p.price > span.woocommerce-Price-amount.amount`)).textContent()) ?? '').trim();
    }
    await blockImageSizes(page, vars);
  });

  test('04 - Cart Page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    // ↓ 03 - Product page
    await closePopup(page, vars);
    await page.locator(`xpath=//a[contains(text(),'Goggles')]`).or(page.locator(`li.mega-menu-item.mega-menu-item-type-custom.mega-menu-item-object-custom.mega-menu-item-has-children.mega-menu-megamenu.mega-align-bottom-left:nth-of-type(1) > a[href="#"].mega-menu-link`)).filter({ visible: true }).first().click({ force: true });
    await page.goto(`${vars.startUrl ?? ''}shop/diablo-mtb-goggles/?pa_frame=cosmic-black&pa_lens=smoke&pa_outrigger-nosepiece=galaxy-matte&pa_strap=black-with-white-silicon`);
    await page.waitForLoadState('load');
    await page.waitForLoadState('load');
    if ((() => { let test =vars.test
return test != "slider" })()) {
      vars.prod_desc = ((await page.locator(`h1.product_title`).textContent()) ?? '').trim();
    }
    if ((() => { let test =vars.test
return test != "slider" })()) {
      vars.stock = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let available = document.querySelector("div.composite_availability");
let stock;
if (available.getAttribute("style") === '' || available.getAttribute("style") === null) {
    stock = document.querySelector("div.composite_availability > .stock.out-of-stock.insufficient-stock").innerText;
    stock = stock.replace("Insufficient stock → ","");
    stock = stock.split(", ");
    for ( var i = 0; i < stock.length; i++ ) {
        stock[i] = stock[i].toLowerCase();
        if (stock[i] === "outrigger/nose") {
            stock[i] = stock[i].replace("/","-");
        }
    }
} else {
    stock = []
}
return stock }, vars);
    }
    if ((() => { let test =vars.test
return test != "slider" })()) {
      vars.prod_desc = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let prodDesc = `${vars.prod_desc}`
prodDesc = prodDesc.replace("–","-")
return prodDesc }, vars);
    }
    if ((() => { let test =vars.test
let stock = vars.stock
return test != "slider" && stock.length > 0 })()) {
      vars.comp1 = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let stock = vars.stock
return stock[0] }, vars);
    }
    if ((() => { let test =vars.test
let stock = vars.stock
return test != "slider" && stock.length > 0 })()) {
      await page.locator(`.melon-optics-customizer-component-tabs > li[data-customizer-component="${vars.comp1 ?? ''}"]`).filter({ visible: true }).first().click({ force: true });
    }
    if ((() => { let test =vars.test
let stock = vars.stock
return test != "slider" && stock.length > 0 })()) {
      await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return new Promise(function (resolve, reject) {
  let stock = vars.stock;
  let available = document.querySelector("div.composite_availability");
  let components = document.querySelectorAll('div[data-customizer-component="'+stock[0]+'"] > ul > li:not(.disabled)');
  let comp = document.querySelector("div.composite_availability > .stock.out-of-stock.insufficient-stock").innerText;
      comp = comp.replace("Insufficient stock → ","");
      comp = comp.split(", ");
      comp = comp[0];
  let inStock = document.querySelector("div.composite_availability > .stock.out-of-stock.insufficient-stock").innerText;
  let n = 0
  function clickComponent(n) {
    if (n >= components.length) {
      resolve();
      return;
    }
    components[n].click();
    setTimeout(() => {
      inStock = document.querySelector("div.composite_availability > .stock.out-of-stock.insufficient-stock").innerText;
      if (inStock.includes(comp)) {
        available = document.querySelector("div.composite_availability");
        if (available.getAttribute("style") === '' ||available.getAttribute("style") === null) {
          clickComponent(n + 1);
        } else {
          resolve();
        }
      } else {
        resolve();
      }
    }, 1000);
  }

  clickComponent(n);
}) }, vars);
    }
    if ((() => { let test =vars.test
let stock = vars.stock
return test != "slider" && stock.length > 1 })()) {
      vars.comp2 = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let stock = vars.stock
return stock[1] }, vars);
    }
    if ((() => { let test =vars.test
let stock = vars.stock
return test != "slider" && stock.length > 1 })()) {
      await page.locator(`.melon-optics-customizer-component-tabs > li[data-customizer-component="${vars.comp2 ?? ''}"]`).filter({ visible: true }).first().click({ force: true });
    }
    if ((() => { let test =vars.test
let stock = vars.stock
return test != "slider" && stock.length > 1 })()) {
      await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return new Promise(function (resolve, reject) {
  let stock = vars.stock;
  let available = document.querySelector("div.composite_availability");
  let components = document.querySelectorAll('div[data-customizer-component="'+stock[1]+'"] > ul > li:not(.disabled)');
  let comp = document.querySelector("div.composite_availability > .stock.out-of-stock.insufficient-stock").innerText;
      comp = comp.replace("Insufficient stock → ","");
      comp = comp.split(", ");
      comp = comp[0];
  let inStock = document.querySelector("div.composite_availability > .stock.out-of-stock.insufficient-stock").innerText;
  let n = 0
  function clickComponent(n) {
    if (n >= components.length) {
      resolve();
      return;
    }
    components[n].click();
    setTimeout(() => {
      inStock = document.querySelector("div.composite_availability > .stock.out-of-stock.insufficient-stock").innerText;
      if (inStock.includes(comp)) {
        available = document.querySelector("div.composite_availability");
        if (available.getAttribute("style") === '' ||available.getAttribute("style") === null) {
          clickComponent(n + 1);
        } else {
          resolve();
        }
      } else {
        resolve();
      }
    }, 1000);
  }

  clickComponent(n);
}) }, vars);
    }
    if ((() => { let test =vars.test
let stock = vars.stock
return test != "slider" && stock.length > 2 })()) {
      vars.comp3 = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let stock = vars.stock
return stock[2] }, vars);
    }
    if ((() => { let test =vars.test
let stock = vars.stock
return test != "slider" && stock.length > 2 })()) {
      await page.locator(`.melon-optics-customizer-component-tabs > li[data-customizer-component="${vars.comp3 ?? ''}"]`).filter({ visible: true }).first().click({ force: true });
    }
    if ((() => { let test =vars.test
let stock = vars.stock
return test != "slider" && stock.length > 2 })()) {
      await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return new Promise(function (resolve, reject) {
  let stock = vars.stock;
  let available = document.querySelector("div.composite_availability");
  let components = document.querySelectorAll('div[data-customizer-component="'+stock[2]+'"] > ul > li:not(.disabled)');
  let comp = document.querySelector("div.composite_availability > .stock.out-of-stock.insufficient-stock").innerText;
      comp = comp.replace("Insufficient stock → ","");
      comp = comp.split(", ");
      comp = comp[0];
  let inStock = document.querySelector("div.composite_availability > .stock.out-of-stock.insufficient-stock").innerText;
  let n = 0
  function clickComponent(n) {
    if (n >= components.length) {
      resolve();
      return;
    }
    components[n].click();
    setTimeout(() => {
      inStock = document.querySelector("div.composite_availability > .stock.out-of-stock.insufficient-stock").innerText;
      if (inStock.includes(comp)) {
        available = document.querySelector("div.composite_availability");
        if (available.getAttribute("style") === '' ||available.getAttribute("style") === null) {
          clickComponent(n + 1);
        } else {
          resolve();
        }
      } else {
        resolve();
      }
    }, 1000);
  }

  clickComponent(n);
}) }, vars);
    }
    if ((() => { let test =vars.test
let stock = vars.stock
return test != "slider" && stock.length > 3 })()) {
      vars.comp4 = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let stock = vars.stock
return stock[3] }, vars);
    }
    if ((() => { let test =vars.test
let stock = vars.stock
return test != "slider" && stock.length > 3 })()) {
      await page.locator(`.melon-optics-customizer-component-tabs > li[data-customizer-component="${vars.comp4 ?? ''}"]`).filter({ visible: true }).first().click({ force: true });
    }
    if ((() => { let test =vars.test
let stock = vars.stock
return test != "slider" && stock.length > 3 })()) {
      await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return new Promise(function (resolve, reject) {
  let stock = vars.stock;
  let available = document.querySelector("div.composite_availability");
  let components = document.querySelectorAll('div[data-customizer-component="'+stock[3]+'"] > ul > li:not(.disabled)');
  let comp = document.querySelector("div.composite_availability > .stock.out-of-stock.insufficient-stock").innerText;
      comp = comp.replace("Insufficient stock → ","");
      comp = comp.split(", ");
      comp = comp[0];
  let inStock = document.querySelector("div.composite_availability > .stock.out-of-stock.insufficient-stock").innerText;
  let n = 0
  function clickComponent(n) {
    if (n >= components.length) {
      resolve();
      return;
    }
    components[n].click();
    setTimeout(() => {
      inStock = document.querySelector("div.composite_availability > .stock.out-of-stock.insufficient-stock").innerText;
      if (inStock.includes(comp)) {
        available = document.querySelector("div.composite_availability");
        if (available.getAttribute("style") === '' ||available.getAttribute("style") === null) {
          clickComponent(n + 1);
        } else {
          resolve();
        }
      } else {
        resolve();
      }
    }, 1000);
  }

  clickComponent(n);
}) }, vars);
    }
    if ((() => { let test =vars.test
return test != "slider" })()) {
      vars.straps = ((await page.locator(`div:nth-of-type(2) > ul > li.main-component:nth-of-type(1)`).textContent()) ?? '').trim();
    }
    if ((() => { let test =vars.test
return test != "slider" })()) {
      vars.lens = ((await page.locator(`div:nth-of-type(2) > ul > li.main-component:nth-of-type(2)`).textContent()) ?? '').trim();
    }
    if ((() => { let test =vars.test
return test != "slider" })()) {
      vars.outrigger = ((await page.locator(`div:nth-of-type(2) > ul > li.main-component:nth-of-type(3)`).textContent()) ?? '').trim();
    }
    if ((() => { let test =vars.test
return test != "slider" })()) {
      vars.frame = ((await page.locator(`div:nth-of-type(2) > ul > li.main-component:nth-of-type(4)`).textContent()) ?? '').trim();
    }
    if ((() => { let test =vars.test
return test != "slider" })()) {
      vars.unitPrice = ((await page.locator(`div.composite_price > p.price > ins > span.woocommerce-Price-amount.amount`).or(page.locator(`div.composite_price > p.price > span.woocommerce-Price-amount.amount`)).textContent()) ?? '').trim();
    }
    await blockImageSizes(page, vars);
    // ↑ end 03 - Product page
    await page.locator(`button[name="add-to-cart"]`).filter({ visible: true }).first().click({ force: true });
    if (false) {
      vars.straps2 = ((await page.locator(`div.fkcart--item.fkcart-panel.fkcart-free-item:nth-of-type(2) > .fkcart-item-info > .fkcart-item-meta > div.fkcart-item-meta-content:nth-of-type(1) > .fkcart-attr-wrap > .fkcart-attr-value`).textContent()) ?? '').trim();
    }
    if (false) {
      vars.lens2 = ((await page.locator(`div.fkcart--item.fkcart-panel.fkcart-free-item:nth-of-type(3) > .fkcart-item-info > .fkcart-item-meta > div.fkcart-item-meta-content:nth-of-type(1) > .fkcart-attr-wrap > .fkcart-attr-value`).textContent()) ?? '').trim();
    }
    if (false) {
      vars.outrigger2 = ((await page.locator(`div.fkcart--item.fkcart-panel.fkcart-free-item:nth-of-type(4) > .fkcart-item-info > .fkcart-item-meta > div.fkcart-item-meta-content:nth-of-type(1) > .fkcart-attr-wrap > .fkcart-attr-value`).textContent()) ?? '').trim();
    }
    if (false) {
      vars.frame2 = ((await page.locator(`div.fkcart--item.fkcart-panel.fkcart-free-item:nth-of-type(5) > .fkcart-item-info > .fkcart-item-meta > div.fkcart-item-meta-content:nth-of-type(1) > .fkcart-attr-wrap > .fkcart-attr-value`).textContent()) ?? '').trim();
    }
    if (false) {
      expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let attributes = [`${vars.straps}`,
`${vars.straps2}`,`${vars.lens}`,`${vars.lens2}`,
`${vars.outrigger2}`,`${vars.outrigger}`,
`${vars.frame2}`,`${vars.frame}`]

for (let i = 0; i < attributes.length; i++) {
   // attributes[i] = attributes[i].replace(/(?:\s)/g,"");
    let aux = attributes[i].split(':')
    attributes[i] = aux.length > 1 ? aux[1].trim() : aux[0].trim();
}

return attributes[0] === attributes[1] && attributes[2] === attributes[3] 
&& attributes[4] === attributes[5]
&& attributes[6] === attributes[7]
 }, vars)).toBeTruthy();
    }
    if (false) {
      vars.extras = ((await page.locator(`td.product-name.last-composited-extra-padding > .component-name.component_table_item_indent > dl.component`).textContent()) ?? '').trim();
    }
    await expect(page.locator(`#fkcart-modal > div > div.fkcart-preview-ui > div.fkcart-slider-body > div.fkcart-item-wrap.fkcart-pt-16 > div:nth-child(1) > div.fkcart-item-misc > div > span`).or(page.locator(`#fkcart-modal > div > div.fkcart-preview-ui > div.fkcart-reward-product-wrap > div > div.fkcart-item-wrap.fkcart-pt-16 > div:nth-child(1) > div > div.fkcart-item-info.fkcart-item-wrap-start > div.fkcart-item-misc > div > span`)).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    vars.qty = ((await page.locator(`input.fkcart-quantity__input`).textContent()) ?? '').trim();
    await calculateSubtotal(page, vars);
    if (false) {
      await expect(page.locator(`tr:nth-of-type(1) td.product-subtotal > span.woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
    }
    await expect(page.locator(`#fkcart-modal > div > div.fkcart-preview-ui > div.fkcart-slider-footer.fkcart-pb-16 > div.fkcart-order-summary.fkcart-panel.fkcart-pt-16 > div > div.fkcart-summary-line-item.fkcart-subtotal-wrap > div.fkcart-summary-amount > strong > span`).or(page.locator(`#fkcart-modal > div > div.fkcart-preview-ui > div.fkcart-slider-footer.fkcart-pb-16 > div.fkcart_summary_cta > div.fkcart-order-summary.fkcart-panel > div > div.fkcart-summary-line-item.fkcart-subtotal-wrap > div.fkcart-summary-amount > strong > span`)).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
    if (false) {
      vars.shippingPrice = ((await page.locator(`ul#shipping_method > li:first-child > label > span.woocommerce-Price-amount.amount`).textContent()) ?? '').trim();
    }
    vars.total = ((await page.locator(`#fkcart-modal > div > div.fkcart-preview-ui > div.fkcart-slider-footer.fkcart-pb-16 > div.fkcart-order-summary.fkcart-panel.fkcart-pt-16 > div > div.fkcart-summary-line-item.fkcart-subtotal-wrap > div.fkcart-summary-amount > strong > span`).or(page.locator(`#fkcart-checkout-button > div.fkcart-checkout--price > span`)).textContent()) ?? '').trim();
    if (false) {
      vars.taxPriceSmall = ((await page.locator(`div.woocommerce > div.kadence-woo-cart-form-wrap > div > div > table > tbody > tr.order-total > td > small > span`).textContent()) ?? '').trim();
    }
    await page.locator(`xpath=//a[contains(text(),'View cart')]`).or(page.locator(`s[href*='cart/']`)).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
  });

  test('05 - Checkout page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    // ↓ 04 - Cart Page
    // ↓ 03 - Product page
    await closePopup(page, vars);
    await page.locator(`xpath=//a[contains(text(),'Goggles')]`).or(page.locator(`li.mega-menu-item.mega-menu-item-type-custom.mega-menu-item-object-custom.mega-menu-item-has-children.mega-menu-megamenu.mega-align-bottom-left:nth-of-type(1) > a[href="#"].mega-menu-link`)).filter({ visible: true }).first().click({ force: true });
    await page.goto(`${vars.startUrl ?? ''}shop/diablo-mtb-goggles/?pa_frame=cosmic-black&pa_lens=smoke&pa_outrigger-nosepiece=galaxy-matte&pa_strap=black-with-white-silicon`);
    await page.waitForLoadState('load');
    await page.waitForLoadState('load');
    if ((() => { let test =vars.test
return test != "slider" })()) {
      vars.prod_desc = ((await page.locator(`h1.product_title`).textContent()) ?? '').trim();
    }
    if ((() => { let test =vars.test
return test != "slider" })()) {
      vars.stock = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let available = document.querySelector("div.composite_availability");
let stock;
if (available.getAttribute("style") === '' || available.getAttribute("style") === null) {
    stock = document.querySelector("div.composite_availability > .stock.out-of-stock.insufficient-stock").innerText;
    stock = stock.replace("Insufficient stock → ","");
    stock = stock.split(", ");
    for ( var i = 0; i < stock.length; i++ ) {
        stock[i] = stock[i].toLowerCase();
        if (stock[i] === "outrigger/nose") {
            stock[i] = stock[i].replace("/","-");
        }
    }
} else {
    stock = []
}
return stock }, vars);
    }
    if ((() => { let test =vars.test
return test != "slider" })()) {
      vars.prod_desc = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let prodDesc = `${vars.prod_desc}`
prodDesc = prodDesc.replace("–","-")
return prodDesc }, vars);
    }
    if ((() => { let test =vars.test
let stock = vars.stock
return test != "slider" && stock.length > 0 })()) {
      vars.comp1 = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let stock = vars.stock
return stock[0] }, vars);
    }
    if ((() => { let test =vars.test
let stock = vars.stock
return test != "slider" && stock.length > 0 })()) {
      await page.locator(`.melon-optics-customizer-component-tabs > li[data-customizer-component="${vars.comp1 ?? ''}"]`).filter({ visible: true }).first().click({ force: true });
    }
    if ((() => { let test =vars.test
let stock = vars.stock
return test != "slider" && stock.length > 0 })()) {
      await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return new Promise(function (resolve, reject) {
  let stock = vars.stock;
  let available = document.querySelector("div.composite_availability");
  let components = document.querySelectorAll('div[data-customizer-component="'+stock[0]+'"] > ul > li:not(.disabled)');
  let comp = document.querySelector("div.composite_availability > .stock.out-of-stock.insufficient-stock").innerText;
      comp = comp.replace("Insufficient stock → ","");
      comp = comp.split(", ");
      comp = comp[0];
  let inStock = document.querySelector("div.composite_availability > .stock.out-of-stock.insufficient-stock").innerText;
  let n = 0
  function clickComponent(n) {
    if (n >= components.length) {
      resolve();
      return;
    }
    components[n].click();
    setTimeout(() => {
      inStock = document.querySelector("div.composite_availability > .stock.out-of-stock.insufficient-stock").innerText;
      if (inStock.includes(comp)) {
        available = document.querySelector("div.composite_availability");
        if (available.getAttribute("style") === '' ||available.getAttribute("style") === null) {
          clickComponent(n + 1);
        } else {
          resolve();
        }
      } else {
        resolve();
      }
    }, 1000);
  }

  clickComponent(n);
}) }, vars);
    }
    if ((() => { let test =vars.test
let stock = vars.stock
return test != "slider" && stock.length > 1 })()) {
      vars.comp2 = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let stock = vars.stock
return stock[1] }, vars);
    }
    if ((() => { let test =vars.test
let stock = vars.stock
return test != "slider" && stock.length > 1 })()) {
      await page.locator(`.melon-optics-customizer-component-tabs > li[data-customizer-component="${vars.comp2 ?? ''}"]`).filter({ visible: true }).first().click({ force: true });
    }
    if ((() => { let test =vars.test
let stock = vars.stock
return test != "slider" && stock.length > 1 })()) {
      await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return new Promise(function (resolve, reject) {
  let stock = vars.stock;
  let available = document.querySelector("div.composite_availability");
  let components = document.querySelectorAll('div[data-customizer-component="'+stock[1]+'"] > ul > li:not(.disabled)');
  let comp = document.querySelector("div.composite_availability > .stock.out-of-stock.insufficient-stock").innerText;
      comp = comp.replace("Insufficient stock → ","");
      comp = comp.split(", ");
      comp = comp[0];
  let inStock = document.querySelector("div.composite_availability > .stock.out-of-stock.insufficient-stock").innerText;
  let n = 0
  function clickComponent(n) {
    if (n >= components.length) {
      resolve();
      return;
    }
    components[n].click();
    setTimeout(() => {
      inStock = document.querySelector("div.composite_availability > .stock.out-of-stock.insufficient-stock").innerText;
      if (inStock.includes(comp)) {
        available = document.querySelector("div.composite_availability");
        if (available.getAttribute("style") === '' ||available.getAttribute("style") === null) {
          clickComponent(n + 1);
        } else {
          resolve();
        }
      } else {
        resolve();
      }
    }, 1000);
  }

  clickComponent(n);
}) }, vars);
    }
    if ((() => { let test =vars.test
let stock = vars.stock
return test != "slider" && stock.length > 2 })()) {
      vars.comp3 = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let stock = vars.stock
return stock[2] }, vars);
    }
    if ((() => { let test =vars.test
let stock = vars.stock
return test != "slider" && stock.length > 2 })()) {
      await page.locator(`.melon-optics-customizer-component-tabs > li[data-customizer-component="${vars.comp3 ?? ''}"]`).filter({ visible: true }).first().click({ force: true });
    }
    if ((() => { let test =vars.test
let stock = vars.stock
return test != "slider" && stock.length > 2 })()) {
      await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return new Promise(function (resolve, reject) {
  let stock = vars.stock;
  let available = document.querySelector("div.composite_availability");
  let components = document.querySelectorAll('div[data-customizer-component="'+stock[2]+'"] > ul > li:not(.disabled)');
  let comp = document.querySelector("div.composite_availability > .stock.out-of-stock.insufficient-stock").innerText;
      comp = comp.replace("Insufficient stock → ","");
      comp = comp.split(", ");
      comp = comp[0];
  let inStock = document.querySelector("div.composite_availability > .stock.out-of-stock.insufficient-stock").innerText;
  let n = 0
  function clickComponent(n) {
    if (n >= components.length) {
      resolve();
      return;
    }
    components[n].click();
    setTimeout(() => {
      inStock = document.querySelector("div.composite_availability > .stock.out-of-stock.insufficient-stock").innerText;
      if (inStock.includes(comp)) {
        available = document.querySelector("div.composite_availability");
        if (available.getAttribute("style") === '' ||available.getAttribute("style") === null) {
          clickComponent(n + 1);
        } else {
          resolve();
        }
      } else {
        resolve();
      }
    }, 1000);
  }

  clickComponent(n);
}) }, vars);
    }
    if ((() => { let test =vars.test
let stock = vars.stock
return test != "slider" && stock.length > 3 })()) {
      vars.comp4 = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let stock = vars.stock
return stock[3] }, vars);
    }
    if ((() => { let test =vars.test
let stock = vars.stock
return test != "slider" && stock.length > 3 })()) {
      await page.locator(`.melon-optics-customizer-component-tabs > li[data-customizer-component="${vars.comp4 ?? ''}"]`).filter({ visible: true }).first().click({ force: true });
    }
    if ((() => { let test =vars.test
let stock = vars.stock
return test != "slider" && stock.length > 3 })()) {
      await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return new Promise(function (resolve, reject) {
  let stock = vars.stock;
  let available = document.querySelector("div.composite_availability");
  let components = document.querySelectorAll('div[data-customizer-component="'+stock[3]+'"] > ul > li:not(.disabled)');
  let comp = document.querySelector("div.composite_availability > .stock.out-of-stock.insufficient-stock").innerText;
      comp = comp.replace("Insufficient stock → ","");
      comp = comp.split(", ");
      comp = comp[0];
  let inStock = document.querySelector("div.composite_availability > .stock.out-of-stock.insufficient-stock").innerText;
  let n = 0
  function clickComponent(n) {
    if (n >= components.length) {
      resolve();
      return;
    }
    components[n].click();
    setTimeout(() => {
      inStock = document.querySelector("div.composite_availability > .stock.out-of-stock.insufficient-stock").innerText;
      if (inStock.includes(comp)) {
        available = document.querySelector("div.composite_availability");
        if (available.getAttribute("style") === '' ||available.getAttribute("style") === null) {
          clickComponent(n + 1);
        } else {
          resolve();
        }
      } else {
        resolve();
      }
    }, 1000);
  }

  clickComponent(n);
}) }, vars);
    }
    if ((() => { let test =vars.test
return test != "slider" })()) {
      vars.straps = ((await page.locator(`div:nth-of-type(2) > ul > li.main-component:nth-of-type(1)`).textContent()) ?? '').trim();
    }
    if ((() => { let test =vars.test
return test != "slider" })()) {
      vars.lens = ((await page.locator(`div:nth-of-type(2) > ul > li.main-component:nth-of-type(2)`).textContent()) ?? '').trim();
    }
    if ((() => { let test =vars.test
return test != "slider" })()) {
      vars.outrigger = ((await page.locator(`div:nth-of-type(2) > ul > li.main-component:nth-of-type(3)`).textContent()) ?? '').trim();
    }
    if ((() => { let test =vars.test
return test != "slider" })()) {
      vars.frame = ((await page.locator(`div:nth-of-type(2) > ul > li.main-component:nth-of-type(4)`).textContent()) ?? '').trim();
    }
    if ((() => { let test =vars.test
return test != "slider" })()) {
      vars.unitPrice = ((await page.locator(`div.composite_price > p.price > ins > span.woocommerce-Price-amount.amount`).or(page.locator(`div.composite_price > p.price > span.woocommerce-Price-amount.amount`)).textContent()) ?? '').trim();
    }
    await blockImageSizes(page, vars);
    // ↑ end 03 - Product page
    await page.locator(`button[name="add-to-cart"]`).filter({ visible: true }).first().click({ force: true });
    if (false) {
      vars.straps2 = ((await page.locator(`div.fkcart--item.fkcart-panel.fkcart-free-item:nth-of-type(2) > .fkcart-item-info > .fkcart-item-meta > div.fkcart-item-meta-content:nth-of-type(1) > .fkcart-attr-wrap > .fkcart-attr-value`).textContent()) ?? '').trim();
    }
    if (false) {
      vars.lens2 = ((await page.locator(`div.fkcart--item.fkcart-panel.fkcart-free-item:nth-of-type(3) > .fkcart-item-info > .fkcart-item-meta > div.fkcart-item-meta-content:nth-of-type(1) > .fkcart-attr-wrap > .fkcart-attr-value`).textContent()) ?? '').trim();
    }
    if (false) {
      vars.outrigger2 = ((await page.locator(`div.fkcart--item.fkcart-panel.fkcart-free-item:nth-of-type(4) > .fkcart-item-info > .fkcart-item-meta > div.fkcart-item-meta-content:nth-of-type(1) > .fkcart-attr-wrap > .fkcart-attr-value`).textContent()) ?? '').trim();
    }
    if (false) {
      vars.frame2 = ((await page.locator(`div.fkcart--item.fkcart-panel.fkcart-free-item:nth-of-type(5) > .fkcart-item-info > .fkcart-item-meta > div.fkcart-item-meta-content:nth-of-type(1) > .fkcart-attr-wrap > .fkcart-attr-value`).textContent()) ?? '').trim();
    }
    if (false) {
      expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let attributes = [`${vars.straps}`,
`${vars.straps2}`,`${vars.lens}`,`${vars.lens2}`,
`${vars.outrigger2}`,`${vars.outrigger}`,
`${vars.frame2}`,`${vars.frame}`]

for (let i = 0; i < attributes.length; i++) {
   // attributes[i] = attributes[i].replace(/(?:\s)/g,"");
    let aux = attributes[i].split(':')
    attributes[i] = aux.length > 1 ? aux[1].trim() : aux[0].trim();
}

return attributes[0] === attributes[1] && attributes[2] === attributes[3] 
&& attributes[4] === attributes[5]
&& attributes[6] === attributes[7]
 }, vars)).toBeTruthy();
    }
    if (false) {
      vars.extras = ((await page.locator(`td.product-name.last-composited-extra-padding > .component-name.component_table_item_indent > dl.component`).textContent()) ?? '').trim();
    }
    await expect(page.locator(`#fkcart-modal > div > div.fkcart-preview-ui > div.fkcart-slider-body > div.fkcart-item-wrap.fkcart-pt-16 > div:nth-child(1) > div.fkcart-item-misc > div > span`).or(page.locator(`#fkcart-modal > div > div.fkcart-preview-ui > div.fkcart-reward-product-wrap > div > div.fkcart-item-wrap.fkcart-pt-16 > div:nth-child(1) > div > div.fkcart-item-info.fkcart-item-wrap-start > div.fkcart-item-misc > div > span`)).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    vars.qty = ((await page.locator(`input.fkcart-quantity__input`).textContent()) ?? '').trim();
    await calculateSubtotal(page, vars);
    if (false) {
      await expect(page.locator(`tr:nth-of-type(1) td.product-subtotal > span.woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
    }
    await expect(page.locator(`#fkcart-modal > div > div.fkcart-preview-ui > div.fkcart-slider-footer.fkcart-pb-16 > div.fkcart-order-summary.fkcart-panel.fkcart-pt-16 > div > div.fkcart-summary-line-item.fkcart-subtotal-wrap > div.fkcart-summary-amount > strong > span`).or(page.locator(`#fkcart-modal > div > div.fkcart-preview-ui > div.fkcart-slider-footer.fkcart-pb-16 > div.fkcart_summary_cta > div.fkcart-order-summary.fkcart-panel > div > div.fkcart-summary-line-item.fkcart-subtotal-wrap > div.fkcart-summary-amount > strong > span`)).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
    if (false) {
      vars.shippingPrice = ((await page.locator(`ul#shipping_method > li:first-child > label > span.woocommerce-Price-amount.amount`).textContent()) ?? '').trim();
    }
    vars.total = ((await page.locator(`#fkcart-modal > div > div.fkcart-preview-ui > div.fkcart-slider-footer.fkcart-pb-16 > div.fkcart-order-summary.fkcart-panel.fkcart-pt-16 > div > div.fkcart-summary-line-item.fkcart-subtotal-wrap > div.fkcart-summary-amount > strong > span`).or(page.locator(`#fkcart-checkout-button > div.fkcart-checkout--price > span`)).textContent()) ?? '').trim();
    if (false) {
      vars.taxPriceSmall = ((await page.locator(`div.woocommerce > div.kadence-woo-cart-form-wrap > div > div > table > tbody > tr.order-total > td > small > span`).textContent()) ?? '').trim();
    }
    await page.locator(`xpath=//a[contains(text(),'View cart')]`).or(page.locator(`s[href*='cart/']`)).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    // ↑ end 04 - Cart Page
    {
      const _lbl = page.locator(`label[for="fkcart-checkout-button"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`a[href*="/checkout/"].checkout-button`).or(page.locator(`#fkcart-checkout-button`)).filter({ visible: true }).first().click({ force: true }); }
    }
    await page.waitForLoadState('load');
    await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return new Promise((resolve, reject) => {
  const timeout = setTimeout(() => {
    clearInterval(checkExistence);
    reject(new Error("Timeout: data-time attribute not found on wfob_wrap after 30 seconds."));
  }, 30000); // 30 seconds timeout

  const checkExistence = setInterval(() => {
    let wfobWrapElement = document.querySelector('#wfob_wrap[data-time]');
    

    if (wfobWrapElement !== null) {
      clearInterval(checkExistence);
      clearTimeout(timeout);
      console.log("✅ data-time attribute detected on wfob_wrap! Blur should be removed.");
      resolve(true);
    } else {
      console.log("⏳ Waiting for data-time attribute to be added to wfob_wrap...");
    }
  }, 1500);
}) }, vars);
    await expect(page.locator(`tr.cart_item.component_container_table_item > td.product-name`).or(page.locator(`div:not(.wfacp_min_cart_widget) > table > tbody > tr.cart_item.component_container_table_item.wfacp_delete_active > td.product-name-area > div.product-name.wfacp_summary_img_true > div.wfacp_cart_title_sec > span`)).first()).toContainText(`${vars.prod_desc ?? ''}`);
    await expect(page.locator(`td.product-total > span.woocommerce-Price-amount.amount`).or(page.locator(`div:not(.wfacp_min_cart_widget) > table > tbody > tr.cart_item.component_container_table_item.wfacp_delete_active > td.product-total > span.woocommerce-Price-amount.amount`)).first()).toContainText(`${vars.subtotalPrice ?? ''}`);
    await expect(page.locator(`.wfacp_mini_cart_reviews > tbody > tr.cart-subtotal > td > span`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
    vars.shippingPrice = ((await page.locator(`ul#shipping_method > li:first-child > label > span.woocommerce-Price-amount.amount`).or(page.locator(`.wfacp_mini_cart_reviews > tbody > tr.shipping_total_fee > td:nth-child(2) > span > span`)).textContent()) ?? '').trim();
    vars.Total = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const subtotal = parseFloat(`${vars.subtotalPrice}`.replace(`${vars.Symbol}`,"").replaceAll(",","").trim());
const shipping = parseFloat(`${vars.shippingPrice}`.replace(`${vars.Symbol}`,"").replaceAll(",","").trim());
let total = subtotal + shipping;
total = Intl.NumberFormat('en-IN', { style: 'currency', currency: `${vars.currency}`}).format(total);
return total; }, vars);
    await expect(page.locator(`#wfacp_mini_cart_reviews_64378bb3 > tbody > tr.order-total > td > strong > span`).first()).toHaveText(`${vars.Total ?? ''}`);
    if (false) {
      vars.taxPriceSmall = ((await page.locator(`.wfacp_mini_cart_reviews > tbody > tr.order-total > td > small > span`).textContent()) ?? '').trim();
    }
  });

  test('05 - Checkout page - required fields', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    // ↓ 05 - Checkout page
    // ↓ 04 - Cart Page
    // ↓ 03 - Product page
    await closePopup(page, vars);
    await page.locator(`xpath=//a[contains(text(),'Goggles')]`).or(page.locator(`li.mega-menu-item.mega-menu-item-type-custom.mega-menu-item-object-custom.mega-menu-item-has-children.mega-menu-megamenu.mega-align-bottom-left:nth-of-type(1) > a[href="#"].mega-menu-link`)).filter({ visible: true }).first().click({ force: true });
    await page.goto(`${vars.startUrl ?? ''}shop/diablo-mtb-goggles/?pa_frame=cosmic-black&pa_lens=smoke&pa_outrigger-nosepiece=galaxy-matte&pa_strap=black-with-white-silicon`);
    await page.waitForLoadState('load');
    await page.waitForLoadState('load');
    if ((() => { let test =vars.test
return test != "slider" })()) {
      vars.prod_desc = ((await page.locator(`h1.product_title`).textContent()) ?? '').trim();
    }
    if ((() => { let test =vars.test
return test != "slider" })()) {
      vars.stock = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let available = document.querySelector("div.composite_availability");
let stock;
if (available.getAttribute("style") === '' || available.getAttribute("style") === null) {
    stock = document.querySelector("div.composite_availability > .stock.out-of-stock.insufficient-stock").innerText;
    stock = stock.replace("Insufficient stock → ","");
    stock = stock.split(", ");
    for ( var i = 0; i < stock.length; i++ ) {
        stock[i] = stock[i].toLowerCase();
        if (stock[i] === "outrigger/nose") {
            stock[i] = stock[i].replace("/","-");
        }
    }
} else {
    stock = []
}
return stock }, vars);
    }
    if ((() => { let test =vars.test
return test != "slider" })()) {
      vars.prod_desc = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let prodDesc = `${vars.prod_desc}`
prodDesc = prodDesc.replace("–","-")
return prodDesc }, vars);
    }
    if ((() => { let test =vars.test
let stock = vars.stock
return test != "slider" && stock.length > 0 })()) {
      vars.comp1 = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let stock = vars.stock
return stock[0] }, vars);
    }
    if ((() => { let test =vars.test
let stock = vars.stock
return test != "slider" && stock.length > 0 })()) {
      await page.locator(`.melon-optics-customizer-component-tabs > li[data-customizer-component="${vars.comp1 ?? ''}"]`).filter({ visible: true }).first().click({ force: true });
    }
    if ((() => { let test =vars.test
let stock = vars.stock
return test != "slider" && stock.length > 0 })()) {
      await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return new Promise(function (resolve, reject) {
  let stock = vars.stock;
  let available = document.querySelector("div.composite_availability");
  let components = document.querySelectorAll('div[data-customizer-component="'+stock[0]+'"] > ul > li:not(.disabled)');
  let comp = document.querySelector("div.composite_availability > .stock.out-of-stock.insufficient-stock").innerText;
      comp = comp.replace("Insufficient stock → ","");
      comp = comp.split(", ");
      comp = comp[0];
  let inStock = document.querySelector("div.composite_availability > .stock.out-of-stock.insufficient-stock").innerText;
  let n = 0
  function clickComponent(n) {
    if (n >= components.length) {
      resolve();
      return;
    }
    components[n].click();
    setTimeout(() => {
      inStock = document.querySelector("div.composite_availability > .stock.out-of-stock.insufficient-stock").innerText;
      if (inStock.includes(comp)) {
        available = document.querySelector("div.composite_availability");
        if (available.getAttribute("style") === '' ||available.getAttribute("style") === null) {
          clickComponent(n + 1);
        } else {
          resolve();
        }
      } else {
        resolve();
      }
    }, 1000);
  }

  clickComponent(n);
}) }, vars);
    }
    if ((() => { let test =vars.test
let stock = vars.stock
return test != "slider" && stock.length > 1 })()) {
      vars.comp2 = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let stock = vars.stock
return stock[1] }, vars);
    }
    if ((() => { let test =vars.test
let stock = vars.stock
return test != "slider" && stock.length > 1 })()) {
      await page.locator(`.melon-optics-customizer-component-tabs > li[data-customizer-component="${vars.comp2 ?? ''}"]`).filter({ visible: true }).first().click({ force: true });
    }
    if ((() => { let test =vars.test
let stock = vars.stock
return test != "slider" && stock.length > 1 })()) {
      await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return new Promise(function (resolve, reject) {
  let stock = vars.stock;
  let available = document.querySelector("div.composite_availability");
  let components = document.querySelectorAll('div[data-customizer-component="'+stock[1]+'"] > ul > li:not(.disabled)');
  let comp = document.querySelector("div.composite_availability > .stock.out-of-stock.insufficient-stock").innerText;
      comp = comp.replace("Insufficient stock → ","");
      comp = comp.split(", ");
      comp = comp[0];
  let inStock = document.querySelector("div.composite_availability > .stock.out-of-stock.insufficient-stock").innerText;
  let n = 0
  function clickComponent(n) {
    if (n >= components.length) {
      resolve();
      return;
    }
    components[n].click();
    setTimeout(() => {
      inStock = document.querySelector("div.composite_availability > .stock.out-of-stock.insufficient-stock").innerText;
      if (inStock.includes(comp)) {
        available = document.querySelector("div.composite_availability");
        if (available.getAttribute("style") === '' ||available.getAttribute("style") === null) {
          clickComponent(n + 1);
        } else {
          resolve();
        }
      } else {
        resolve();
      }
    }, 1000);
  }

  clickComponent(n);
}) }, vars);
    }
    if ((() => { let test =vars.test
let stock = vars.stock
return test != "slider" && stock.length > 2 })()) {
      vars.comp3 = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let stock = vars.stock
return stock[2] }, vars);
    }
    if ((() => { let test =vars.test
let stock = vars.stock
return test != "slider" && stock.length > 2 })()) {
      await page.locator(`.melon-optics-customizer-component-tabs > li[data-customizer-component="${vars.comp3 ?? ''}"]`).filter({ visible: true }).first().click({ force: true });
    }
    if ((() => { let test =vars.test
let stock = vars.stock
return test != "slider" && stock.length > 2 })()) {
      await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return new Promise(function (resolve, reject) {
  let stock = vars.stock;
  let available = document.querySelector("div.composite_availability");
  let components = document.querySelectorAll('div[data-customizer-component="'+stock[2]+'"] > ul > li:not(.disabled)');
  let comp = document.querySelector("div.composite_availability > .stock.out-of-stock.insufficient-stock").innerText;
      comp = comp.replace("Insufficient stock → ","");
      comp = comp.split(", ");
      comp = comp[0];
  let inStock = document.querySelector("div.composite_availability > .stock.out-of-stock.insufficient-stock").innerText;
  let n = 0
  function clickComponent(n) {
    if (n >= components.length) {
      resolve();
      return;
    }
    components[n].click();
    setTimeout(() => {
      inStock = document.querySelector("div.composite_availability > .stock.out-of-stock.insufficient-stock").innerText;
      if (inStock.includes(comp)) {
        available = document.querySelector("div.composite_availability");
        if (available.getAttribute("style") === '' ||available.getAttribute("style") === null) {
          clickComponent(n + 1);
        } else {
          resolve();
        }
      } else {
        resolve();
      }
    }, 1000);
  }

  clickComponent(n);
}) }, vars);
    }
    if ((() => { let test =vars.test
let stock = vars.stock
return test != "slider" && stock.length > 3 })()) {
      vars.comp4 = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let stock = vars.stock
return stock[3] }, vars);
    }
    if ((() => { let test =vars.test
let stock = vars.stock
return test != "slider" && stock.length > 3 })()) {
      await page.locator(`.melon-optics-customizer-component-tabs > li[data-customizer-component="${vars.comp4 ?? ''}"]`).filter({ visible: true }).first().click({ force: true });
    }
    if ((() => { let test =vars.test
let stock = vars.stock
return test != "slider" && stock.length > 3 })()) {
      await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return new Promise(function (resolve, reject) {
  let stock = vars.stock;
  let available = document.querySelector("div.composite_availability");
  let components = document.querySelectorAll('div[data-customizer-component="'+stock[3]+'"] > ul > li:not(.disabled)');
  let comp = document.querySelector("div.composite_availability > .stock.out-of-stock.insufficient-stock").innerText;
      comp = comp.replace("Insufficient stock → ","");
      comp = comp.split(", ");
      comp = comp[0];
  let inStock = document.querySelector("div.composite_availability > .stock.out-of-stock.insufficient-stock").innerText;
  let n = 0
  function clickComponent(n) {
    if (n >= components.length) {
      resolve();
      return;
    }
    components[n].click();
    setTimeout(() => {
      inStock = document.querySelector("div.composite_availability > .stock.out-of-stock.insufficient-stock").innerText;
      if (inStock.includes(comp)) {
        available = document.querySelector("div.composite_availability");
        if (available.getAttribute("style") === '' ||available.getAttribute("style") === null) {
          clickComponent(n + 1);
        } else {
          resolve();
        }
      } else {
        resolve();
      }
    }, 1000);
  }

  clickComponent(n);
}) }, vars);
    }
    if ((() => { let test =vars.test
return test != "slider" })()) {
      vars.straps = ((await page.locator(`div:nth-of-type(2) > ul > li.main-component:nth-of-type(1)`).textContent()) ?? '').trim();
    }
    if ((() => { let test =vars.test
return test != "slider" })()) {
      vars.lens = ((await page.locator(`div:nth-of-type(2) > ul > li.main-component:nth-of-type(2)`).textContent()) ?? '').trim();
    }
    if ((() => { let test =vars.test
return test != "slider" })()) {
      vars.outrigger = ((await page.locator(`div:nth-of-type(2) > ul > li.main-component:nth-of-type(3)`).textContent()) ?? '').trim();
    }
    if ((() => { let test =vars.test
return test != "slider" })()) {
      vars.frame = ((await page.locator(`div:nth-of-type(2) > ul > li.main-component:nth-of-type(4)`).textContent()) ?? '').trim();
    }
    if ((() => { let test =vars.test
return test != "slider" })()) {
      vars.unitPrice = ((await page.locator(`div.composite_price > p.price > ins > span.woocommerce-Price-amount.amount`).or(page.locator(`div.composite_price > p.price > span.woocommerce-Price-amount.amount`)).textContent()) ?? '').trim();
    }
    await blockImageSizes(page, vars);
    // ↑ end 03 - Product page
    await page.locator(`button[name="add-to-cart"]`).filter({ visible: true }).first().click({ force: true });
    if (false) {
      vars.straps2 = ((await page.locator(`div.fkcart--item.fkcart-panel.fkcart-free-item:nth-of-type(2) > .fkcart-item-info > .fkcart-item-meta > div.fkcart-item-meta-content:nth-of-type(1) > .fkcart-attr-wrap > .fkcart-attr-value`).textContent()) ?? '').trim();
    }
    if (false) {
      vars.lens2 = ((await page.locator(`div.fkcart--item.fkcart-panel.fkcart-free-item:nth-of-type(3) > .fkcart-item-info > .fkcart-item-meta > div.fkcart-item-meta-content:nth-of-type(1) > .fkcart-attr-wrap > .fkcart-attr-value`).textContent()) ?? '').trim();
    }
    if (false) {
      vars.outrigger2 = ((await page.locator(`div.fkcart--item.fkcart-panel.fkcart-free-item:nth-of-type(4) > .fkcart-item-info > .fkcart-item-meta > div.fkcart-item-meta-content:nth-of-type(1) > .fkcart-attr-wrap > .fkcart-attr-value`).textContent()) ?? '').trim();
    }
    if (false) {
      vars.frame2 = ((await page.locator(`div.fkcart--item.fkcart-panel.fkcart-free-item:nth-of-type(5) > .fkcart-item-info > .fkcart-item-meta > div.fkcart-item-meta-content:nth-of-type(1) > .fkcart-attr-wrap > .fkcart-attr-value`).textContent()) ?? '').trim();
    }
    if (false) {
      expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let attributes = [`${vars.straps}`,
`${vars.straps2}`,`${vars.lens}`,`${vars.lens2}`,
`${vars.outrigger2}`,`${vars.outrigger}`,
`${vars.frame2}`,`${vars.frame}`]

for (let i = 0; i < attributes.length; i++) {
   // attributes[i] = attributes[i].replace(/(?:\s)/g,"");
    let aux = attributes[i].split(':')
    attributes[i] = aux.length > 1 ? aux[1].trim() : aux[0].trim();
}

return attributes[0] === attributes[1] && attributes[2] === attributes[3] 
&& attributes[4] === attributes[5]
&& attributes[6] === attributes[7]
 }, vars)).toBeTruthy();
    }
    if (false) {
      vars.extras = ((await page.locator(`td.product-name.last-composited-extra-padding > .component-name.component_table_item_indent > dl.component`).textContent()) ?? '').trim();
    }
    await expect(page.locator(`#fkcart-modal > div > div.fkcart-preview-ui > div.fkcart-slider-body > div.fkcart-item-wrap.fkcart-pt-16 > div:nth-child(1) > div.fkcart-item-misc > div > span`).or(page.locator(`#fkcart-modal > div > div.fkcart-preview-ui > div.fkcart-reward-product-wrap > div > div.fkcart-item-wrap.fkcart-pt-16 > div:nth-child(1) > div > div.fkcart-item-info.fkcart-item-wrap-start > div.fkcart-item-misc > div > span`)).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    vars.qty = ((await page.locator(`input.fkcart-quantity__input`).textContent()) ?? '').trim();
    await calculateSubtotal(page, vars);
    if (false) {
      await expect(page.locator(`tr:nth-of-type(1) td.product-subtotal > span.woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
    }
    await expect(page.locator(`#fkcart-modal > div > div.fkcart-preview-ui > div.fkcart-slider-footer.fkcart-pb-16 > div.fkcart-order-summary.fkcart-panel.fkcart-pt-16 > div > div.fkcart-summary-line-item.fkcart-subtotal-wrap > div.fkcart-summary-amount > strong > span`).or(page.locator(`#fkcart-modal > div > div.fkcart-preview-ui > div.fkcart-slider-footer.fkcart-pb-16 > div.fkcart_summary_cta > div.fkcart-order-summary.fkcart-panel > div > div.fkcart-summary-line-item.fkcart-subtotal-wrap > div.fkcart-summary-amount > strong > span`)).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
    if (false) {
      vars.shippingPrice = ((await page.locator(`ul#shipping_method > li:first-child > label > span.woocommerce-Price-amount.amount`).textContent()) ?? '').trim();
    }
    vars.total = ((await page.locator(`#fkcart-modal > div > div.fkcart-preview-ui > div.fkcart-slider-footer.fkcart-pb-16 > div.fkcart-order-summary.fkcart-panel.fkcart-pt-16 > div > div.fkcart-summary-line-item.fkcart-subtotal-wrap > div.fkcart-summary-amount > strong > span`).or(page.locator(`#fkcart-checkout-button > div.fkcart-checkout--price > span`)).textContent()) ?? '').trim();
    if (false) {
      vars.taxPriceSmall = ((await page.locator(`div.woocommerce > div.kadence-woo-cart-form-wrap > div > div > table > tbody > tr.order-total > td > small > span`).textContent()) ?? '').trim();
    }
    await page.locator(`xpath=//a[contains(text(),'View cart')]`).or(page.locator(`s[href*='cart/']`)).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    // ↑ end 04 - Cart Page
    {
      const _lbl = page.locator(`label[for="fkcart-checkout-button"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`a[href*="/checkout/"].checkout-button`).or(page.locator(`#fkcart-checkout-button`)).filter({ visible: true }).first().click({ force: true }); }
    }
    await page.waitForLoadState('load');
    await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return new Promise((resolve, reject) => {
  const timeout = setTimeout(() => {
    clearInterval(checkExistence);
    reject(new Error("Timeout: data-time attribute not found on wfob_wrap after 30 seconds."));
  }, 30000); // 30 seconds timeout

  const checkExistence = setInterval(() => {
    let wfobWrapElement = document.querySelector('#wfob_wrap[data-time]');
    

    if (wfobWrapElement !== null) {
      clearInterval(checkExistence);
      clearTimeout(timeout);
      console.log("✅ data-time attribute detected on wfob_wrap! Blur should be removed.");
      resolve(true);
    } else {
      console.log("⏳ Waiting for data-time attribute to be added to wfob_wrap...");
    }
  }, 1500);
}) }, vars);
    await expect(page.locator(`tr.cart_item.component_container_table_item > td.product-name`).or(page.locator(`div:not(.wfacp_min_cart_widget) > table > tbody > tr.cart_item.component_container_table_item.wfacp_delete_active > td.product-name-area > div.product-name.wfacp_summary_img_true > div.wfacp_cart_title_sec > span`)).first()).toContainText(`${vars.prod_desc ?? ''}`);
    await expect(page.locator(`td.product-total > span.woocommerce-Price-amount.amount`).or(page.locator(`div:not(.wfacp_min_cart_widget) > table > tbody > tr.cart_item.component_container_table_item.wfacp_delete_active > td.product-total > span.woocommerce-Price-amount.amount`)).first()).toContainText(`${vars.subtotalPrice ?? ''}`);
    await expect(page.locator(`.wfacp_mini_cart_reviews > tbody > tr.cart-subtotal > td > span`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
    vars.shippingPrice = ((await page.locator(`ul#shipping_method > li:first-child > label > span.woocommerce-Price-amount.amount`).or(page.locator(`.wfacp_mini_cart_reviews > tbody > tr.shipping_total_fee > td:nth-child(2) > span > span`)).textContent()) ?? '').trim();
    vars.Total = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const subtotal = parseFloat(`${vars.subtotalPrice}`.replace(`${vars.Symbol}`,"").replaceAll(",","").trim());
const shipping = parseFloat(`${vars.shippingPrice}`.replace(`${vars.Symbol}`,"").replaceAll(",","").trim());
let total = subtotal + shipping;
total = Intl.NumberFormat('en-IN', { style: 'currency', currency: `${vars.currency}`}).format(total);
return total; }, vars);
    await expect(page.locator(`#wfacp_mini_cart_reviews_64378bb3 > tbody > tr.order-total > td > strong > span`).first()).toHaveText(`${vars.Total ?? ''}`);
    if (false) {
      vars.taxPriceSmall = ((await page.locator(`.wfacp_mini_cart_reviews > tbody > tr.order-total > td > small > span`).textContent()) ?? '').trim();
    }
    // ↑ end 05 - Checkout page
    try { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="number"]`).first().fill(`4242 4242 4242 4242`); } catch { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="number"]`).first().selectOption(`4242 4242 4242 4242`); }
    vars.year = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const nextYear = (new Date().getFullYear() + 1) % 100;

return nextYear  }, vars);
    try { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="expiry"]`).first().fill(`12 / ${vars.year ?? ''}`); } catch { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="expiry"]`).first().selectOption(`12 / ${vars.year ?? ''}`); }
    try { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="cvc"]`).first().fill(`123`); } catch { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="cvc"]`).first().selectOption(`123`); }
    await placeOrderElement(page, vars);
    try {
      await expect(page.locator(`.woocommerce-error`).first()).toHaveText(`Billing Email is a required field.
Billing First name is a required field.
Billing Last name is a required field.
Shipping Street address is a required field.
Shipping Town / City is a required field.
Shipping Postcode is a required field.`);
    } catch { /* optional step: assertText */ }
  });

  test('07 - Registration, My Account links and Login', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    vars.username = `${vars.emailReg ?? ''}`;
    vars.pass = `${vars.password ?? ''}`;
    await closePopup(page, vars);
    await register(page, vars);
    await login(page, vars);
    await page.locator(`xpath=//a[contains(text(), "Orders")]`).or(page.locator(`.woocommerce-MyAccount-navigation-link > a[href*="/my-account/orders/"]`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.wc-block-components-notice-banner__content`).or(page.locator(`.woocommerce-info`)).or(page.locator(`.woocommerce-message`))).not.toHaveCount(0);
    await page.locator(`xpath=//a[contains(text(), "Downloads")]`).or(page.locator(`a[href*="/my-account/downloads/"]`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.wc-block-components-notice-banner__content`).or(page.locator(`.woocommerce-message`)).or(page.locator(`.woocommerce-info`))).not.toHaveCount(0);
    await page.locator(`xpath=//a[contains(text(), "Addresses")]`).or(page.locator(`a[href*="/my-account/edit-address/"]`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.woocommerce-MyAccount-content`)).not.toHaveCount(0);
    await page.locator(`xpath=//a[contains(text(), "Account details")]`).or(page.locator(`a[href*="/my-account/edit-account/"]`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.woocommerce-MyAccount-content`)).not.toHaveCount(0);
    await page.locator(`xpath=//a[contains(text(), "Logout")]`).or(page.locator(`a[href*="/my-account/customer-logout/?_wpnonce="]`)).filter({ visible: true }).first().click({ force: true });
    vars.pass = `${vars.password ?? ''}`;
    await login(page, vars);
  });

  test('08 - “Forgot password?” flow', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    vars.username = `${vars.emailForgot ?? ''}`;
    vars.pass = `${vars.password ?? ''}`;
    await closePopup(page, vars);
    await register(page, vars);
    await page.waitForLoadState('load');
    await page.locator(`a[href*="/my-account/lost-password/"]`).filter({ visible: true }).first().click({ force: true });
    try { await page.locator(`#user_login`).first().fill(`${vars.username ?? ''}`); } catch { await page.locator(`#user_login`).first().selectOption(`${vars.username ?? ''}`); }
    await page.locator(`button[type="submit"].woocommerce-Button`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.wc-block-components-notice-banner__content`).or(page.locator(`.woocommerce-info`)).or(page.locator(`.woocommerce-message`)).first()).toHaveText(`Password reset email has been sent.`);
    await extractUserFromEmail(page, vars);
    await page.locator(`xpath=//a[contains(text(), "Password Reset for Melon Optics")]`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`a.link`).filter({ visible: true }).first().click({ force: true });
    try { await page.locator(`#password_1`).first().fill(`${vars.password2 ?? ''}`); } catch { await page.locator(`#password_1`).first().selectOption(`${vars.password2 ?? ''}`); }
    try { await page.locator(`#password_2`).first().fill(`${vars.password2 ?? ''}`); } catch { await page.locator(`#password_2`).first().selectOption(`${vars.password2 ?? ''}`); }
    await page.locator(`button[type="submit"]`).filter({ visible: true }).first().click({ force: true });
    vars.pass = `${vars.password2 ?? ''}`;
    await page.locator(`a[href*="/my-account/customer-logout/?_wpnonce="]`).filter({ visible: true }).first().click({ force: true });
    await login(page, vars);
  });

  test('09 - Slider Lens comparison', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    vars.test = `slider`;
    // ↓ 03 - Product page
    await closePopup(page, vars);
    await page.locator(`xpath=//a[contains(text(),'Goggles')]`).or(page.locator(`li.mega-menu-item.mega-menu-item-type-custom.mega-menu-item-object-custom.mega-menu-item-has-children.mega-menu-megamenu.mega-align-bottom-left:nth-of-type(1) > a[href="#"].mega-menu-link`)).filter({ visible: true }).first().click({ force: true });
    await page.goto(`${vars.startUrl ?? ''}shop/diablo-mtb-goggles/?pa_frame=cosmic-black&pa_lens=smoke&pa_outrigger-nosepiece=galaxy-matte&pa_strap=black-with-white-silicon`);
    await page.waitForLoadState('load');
    await page.waitForLoadState('load');
    if ((() => { let test =vars.test
return test != "slider" })()) {
      vars.prod_desc = ((await page.locator(`h1.product_title`).textContent()) ?? '').trim();
    }
    if ((() => { let test =vars.test
return test != "slider" })()) {
      vars.stock = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let available = document.querySelector("div.composite_availability");
let stock;
if (available.getAttribute("style") === '' || available.getAttribute("style") === null) {
    stock = document.querySelector("div.composite_availability > .stock.out-of-stock.insufficient-stock").innerText;
    stock = stock.replace("Insufficient stock → ","");
    stock = stock.split(", ");
    for ( var i = 0; i < stock.length; i++ ) {
        stock[i] = stock[i].toLowerCase();
        if (stock[i] === "outrigger/nose") {
            stock[i] = stock[i].replace("/","-");
        }
    }
} else {
    stock = []
}
return stock }, vars);
    }
    if ((() => { let test =vars.test
return test != "slider" })()) {
      vars.prod_desc = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let prodDesc = `${vars.prod_desc}`
prodDesc = prodDesc.replace("–","-")
return prodDesc }, vars);
    }
    if ((() => { let test =vars.test
let stock = vars.stock
return test != "slider" && stock.length > 0 })()) {
      vars.comp1 = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let stock = vars.stock
return stock[0] }, vars);
    }
    if ((() => { let test =vars.test
let stock = vars.stock
return test != "slider" && stock.length > 0 })()) {
      await page.locator(`.melon-optics-customizer-component-tabs > li[data-customizer-component="${vars.comp1 ?? ''}"]`).filter({ visible: true }).first().click({ force: true });
    }
    if ((() => { let test =vars.test
let stock = vars.stock
return test != "slider" && stock.length > 0 })()) {
      await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return new Promise(function (resolve, reject) {
  let stock = vars.stock;
  let available = document.querySelector("div.composite_availability");
  let components = document.querySelectorAll('div[data-customizer-component="'+stock[0]+'"] > ul > li:not(.disabled)');
  let comp = document.querySelector("div.composite_availability > .stock.out-of-stock.insufficient-stock").innerText;
      comp = comp.replace("Insufficient stock → ","");
      comp = comp.split(", ");
      comp = comp[0];
  let inStock = document.querySelector("div.composite_availability > .stock.out-of-stock.insufficient-stock").innerText;
  let n = 0
  function clickComponent(n) {
    if (n >= components.length) {
      resolve();
      return;
    }
    components[n].click();
    setTimeout(() => {
      inStock = document.querySelector("div.composite_availability > .stock.out-of-stock.insufficient-stock").innerText;
      if (inStock.includes(comp)) {
        available = document.querySelector("div.composite_availability");
        if (available.getAttribute("style") === '' ||available.getAttribute("style") === null) {
          clickComponent(n + 1);
        } else {
          resolve();
        }
      } else {
        resolve();
      }
    }, 1000);
  }

  clickComponent(n);
}) }, vars);
    }
    if ((() => { let test =vars.test
let stock = vars.stock
return test != "slider" && stock.length > 1 })()) {
      vars.comp2 = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let stock = vars.stock
return stock[1] }, vars);
    }
    if ((() => { let test =vars.test
let stock = vars.stock
return test != "slider" && stock.length > 1 })()) {
      await page.locator(`.melon-optics-customizer-component-tabs > li[data-customizer-component="${vars.comp2 ?? ''}"]`).filter({ visible: true }).first().click({ force: true });
    }
    if ((() => { let test =vars.test
let stock = vars.stock
return test != "slider" && stock.length > 1 })()) {
      await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return new Promise(function (resolve, reject) {
  let stock = vars.stock;
  let available = document.querySelector("div.composite_availability");
  let components = document.querySelectorAll('div[data-customizer-component="'+stock[1]+'"] > ul > li:not(.disabled)');
  let comp = document.querySelector("div.composite_availability > .stock.out-of-stock.insufficient-stock").innerText;
      comp = comp.replace("Insufficient stock → ","");
      comp = comp.split(", ");
      comp = comp[0];
  let inStock = document.querySelector("div.composite_availability > .stock.out-of-stock.insufficient-stock").innerText;
  let n = 0
  function clickComponent(n) {
    if (n >= components.length) {
      resolve();
      return;
    }
    components[n].click();
    setTimeout(() => {
      inStock = document.querySelector("div.composite_availability > .stock.out-of-stock.insufficient-stock").innerText;
      if (inStock.includes(comp)) {
        available = document.querySelector("div.composite_availability");
        if (available.getAttribute("style") === '' ||available.getAttribute("style") === null) {
          clickComponent(n + 1);
        } else {
          resolve();
        }
      } else {
        resolve();
      }
    }, 1000);
  }

  clickComponent(n);
}) }, vars);
    }
    if ((() => { let test =vars.test
let stock = vars.stock
return test != "slider" && stock.length > 2 })()) {
      vars.comp3 = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let stock = vars.stock
return stock[2] }, vars);
    }
    if ((() => { let test =vars.test
let stock = vars.stock
return test != "slider" && stock.length > 2 })()) {
      await page.locator(`.melon-optics-customizer-component-tabs > li[data-customizer-component="${vars.comp3 ?? ''}"]`).filter({ visible: true }).first().click({ force: true });
    }
    if ((() => { let test =vars.test
let stock = vars.stock
return test != "slider" && stock.length > 2 })()) {
      await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return new Promise(function (resolve, reject) {
  let stock = vars.stock;
  let available = document.querySelector("div.composite_availability");
  let components = document.querySelectorAll('div[data-customizer-component="'+stock[2]+'"] > ul > li:not(.disabled)');
  let comp = document.querySelector("div.composite_availability > .stock.out-of-stock.insufficient-stock").innerText;
      comp = comp.replace("Insufficient stock → ","");
      comp = comp.split(", ");
      comp = comp[0];
  let inStock = document.querySelector("div.composite_availability > .stock.out-of-stock.insufficient-stock").innerText;
  let n = 0
  function clickComponent(n) {
    if (n >= components.length) {
      resolve();
      return;
    }
    components[n].click();
    setTimeout(() => {
      inStock = document.querySelector("div.composite_availability > .stock.out-of-stock.insufficient-stock").innerText;
      if (inStock.includes(comp)) {
        available = document.querySelector("div.composite_availability");
        if (available.getAttribute("style") === '' ||available.getAttribute("style") === null) {
          clickComponent(n + 1);
        } else {
          resolve();
        }
      } else {
        resolve();
      }
    }, 1000);
  }

  clickComponent(n);
}) }, vars);
    }
    if ((() => { let test =vars.test
let stock = vars.stock
return test != "slider" && stock.length > 3 })()) {
      vars.comp4 = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let stock = vars.stock
return stock[3] }, vars);
    }
    if ((() => { let test =vars.test
let stock = vars.stock
return test != "slider" && stock.length > 3 })()) {
      await page.locator(`.melon-optics-customizer-component-tabs > li[data-customizer-component="${vars.comp4 ?? ''}"]`).filter({ visible: true }).first().click({ force: true });
    }
    if ((() => { let test =vars.test
let stock = vars.stock
return test != "slider" && stock.length > 3 })()) {
      await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return new Promise(function (resolve, reject) {
  let stock = vars.stock;
  let available = document.querySelector("div.composite_availability");
  let components = document.querySelectorAll('div[data-customizer-component="'+stock[3]+'"] > ul > li:not(.disabled)');
  let comp = document.querySelector("div.composite_availability > .stock.out-of-stock.insufficient-stock").innerText;
      comp = comp.replace("Insufficient stock → ","");
      comp = comp.split(", ");
      comp = comp[0];
  let inStock = document.querySelector("div.composite_availability > .stock.out-of-stock.insufficient-stock").innerText;
  let n = 0
  function clickComponent(n) {
    if (n >= components.length) {
      resolve();
      return;
    }
    components[n].click();
    setTimeout(() => {
      inStock = document.querySelector("div.composite_availability > .stock.out-of-stock.insufficient-stock").innerText;
      if (inStock.includes(comp)) {
        available = document.querySelector("div.composite_availability");
        if (available.getAttribute("style") === '' ||available.getAttribute("style") === null) {
          clickComponent(n + 1);
        } else {
          resolve();
        }
      } else {
        resolve();
      }
    }, 1000);
  }

  clickComponent(n);
}) }, vars);
    }
    if ((() => { let test =vars.test
return test != "slider" })()) {
      vars.straps = ((await page.locator(`div:nth-of-type(2) > ul > li.main-component:nth-of-type(1)`).textContent()) ?? '').trim();
    }
    if ((() => { let test =vars.test
return test != "slider" })()) {
      vars.lens = ((await page.locator(`div:nth-of-type(2) > ul > li.main-component:nth-of-type(2)`).textContent()) ?? '').trim();
    }
    if ((() => { let test =vars.test
return test != "slider" })()) {
      vars.outrigger = ((await page.locator(`div:nth-of-type(2) > ul > li.main-component:nth-of-type(3)`).textContent()) ?? '').trim();
    }
    if ((() => { let test =vars.test
return test != "slider" })()) {
      vars.frame = ((await page.locator(`div:nth-of-type(2) > ul > li.main-component:nth-of-type(4)`).textContent()) ?? '').trim();
    }
    if ((() => { let test =vars.test
return test != "slider" })()) {
      vars.unitPrice = ((await page.locator(`div.composite_price > p.price > ins > span.woocommerce-Price-amount.amount`).or(page.locator(`div.composite_price > p.price > span.woocommerce-Price-amount.amount`)).textContent()) ?? '').trim();
    }
    await blockImageSizes(page, vars);
    // ↑ end 03 - Product page
    try {
      await page.locator(`.kt-blocks-modal-link-inner > strong`).filter({ visible: true }).first().click({ force: true });
    } catch { /* optional step: click */ }
    try {
      {
        const _lbl = page.locator(`label[for="slider"]`).filter({ visible: true });
        if (await _lbl.count() > 0) { await _lbl.first().click(); }
        else { await page.locator(`#slider`).filter({ visible: true }).first().click({ force: true }); }
      }
    } catch { /* optional step: click */ }
    // TODO: unknown keypress value="right"
    await page.keyboard.press('right');
    // TODO: unknown keypress value="right"
    await page.keyboard.press('right');
    // TODO: unknown keypress value="right"
    await page.keyboard.press('right');
    // TODO: unknown keypress value="right"
    await page.keyboard.press('right');
    // TODO: unknown keypress value="right"
    await page.keyboard.press('right');
    // TODO: unknown keypress value="right"
    await page.keyboard.press('right');
    // TODO: unknown keypress value="right"
    await page.keyboard.press('right');
    // TODO: unknown keypress value="right"
    await page.keyboard.press('right');
    // TODO: unknown keypress value="right"
    await page.keyboard.press('right');
    // TODO: unknown keypress value="right"
    await page.keyboard.press('right');
  });

  test('10 - Place order - Accept Upsell', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    vars.test = ``;
    // ↓ 01 - Place order - Upsell Accepted
    vars.accept = `yes`;
    // ↓ 05 - Checkout page
    // ↓ 04 - Cart Page
    // ↓ 03 - Product page
    await closePopup(page, vars);
    await page.locator(`xpath=//a[contains(text(),'Goggles')]`).or(page.locator(`li.mega-menu-item.mega-menu-item-type-custom.mega-menu-item-object-custom.mega-menu-item-has-children.mega-menu-megamenu.mega-align-bottom-left:nth-of-type(1) > a[href="#"].mega-menu-link`)).filter({ visible: true }).first().click({ force: true });
    await page.goto(`${vars.startUrl ?? ''}shop/diablo-mtb-goggles/?pa_frame=cosmic-black&pa_lens=smoke&pa_outrigger-nosepiece=galaxy-matte&pa_strap=black-with-white-silicon`);
    await page.waitForLoadState('load');
    await page.waitForLoadState('load');
    if ((() => { let test =vars.test
return test != "slider" })()) {
      vars.prod_desc = ((await page.locator(`h1.product_title`).textContent()) ?? '').trim();
    }
    if ((() => { let test =vars.test
return test != "slider" })()) {
      vars.stock = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let available = document.querySelector("div.composite_availability");
let stock;
if (available.getAttribute("style") === '' || available.getAttribute("style") === null) {
    stock = document.querySelector("div.composite_availability > .stock.out-of-stock.insufficient-stock").innerText;
    stock = stock.replace("Insufficient stock → ","");
    stock = stock.split(", ");
    for ( var i = 0; i < stock.length; i++ ) {
        stock[i] = stock[i].toLowerCase();
        if (stock[i] === "outrigger/nose") {
            stock[i] = stock[i].replace("/","-");
        }
    }
} else {
    stock = []
}
return stock }, vars);
    }
    if ((() => { let test =vars.test
return test != "slider" })()) {
      vars.prod_desc = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let prodDesc = `${vars.prod_desc}`
prodDesc = prodDesc.replace("–","-")
return prodDesc }, vars);
    }
    if ((() => { let test =vars.test
let stock = vars.stock
return test != "slider" && stock.length > 0 })()) {
      vars.comp1 = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let stock = vars.stock
return stock[0] }, vars);
    }
    if ((() => { let test =vars.test
let stock = vars.stock
return test != "slider" && stock.length > 0 })()) {
      await page.locator(`.melon-optics-customizer-component-tabs > li[data-customizer-component="${vars.comp1 ?? ''}"]`).filter({ visible: true }).first().click({ force: true });
    }
    if ((() => { let test =vars.test
let stock = vars.stock
return test != "slider" && stock.length > 0 })()) {
      await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return new Promise(function (resolve, reject) {
  let stock = vars.stock;
  let available = document.querySelector("div.composite_availability");
  let components = document.querySelectorAll('div[data-customizer-component="'+stock[0]+'"] > ul > li:not(.disabled)');
  let comp = document.querySelector("div.composite_availability > .stock.out-of-stock.insufficient-stock").innerText;
      comp = comp.replace("Insufficient stock → ","");
      comp = comp.split(", ");
      comp = comp[0];
  let inStock = document.querySelector("div.composite_availability > .stock.out-of-stock.insufficient-stock").innerText;
  let n = 0
  function clickComponent(n) {
    if (n >= components.length) {
      resolve();
      return;
    }
    components[n].click();
    setTimeout(() => {
      inStock = document.querySelector("div.composite_availability > .stock.out-of-stock.insufficient-stock").innerText;
      if (inStock.includes(comp)) {
        available = document.querySelector("div.composite_availability");
        if (available.getAttribute("style") === '' ||available.getAttribute("style") === null) {
          clickComponent(n + 1);
        } else {
          resolve();
        }
      } else {
        resolve();
      }
    }, 1000);
  }

  clickComponent(n);
}) }, vars);
    }
    if ((() => { let test =vars.test
let stock = vars.stock
return test != "slider" && stock.length > 1 })()) {
      vars.comp2 = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let stock = vars.stock
return stock[1] }, vars);
    }
    if ((() => { let test =vars.test
let stock = vars.stock
return test != "slider" && stock.length > 1 })()) {
      await page.locator(`.melon-optics-customizer-component-tabs > li[data-customizer-component="${vars.comp2 ?? ''}"]`).filter({ visible: true }).first().click({ force: true });
    }
    if ((() => { let test =vars.test
let stock = vars.stock
return test != "slider" && stock.length > 1 })()) {
      await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return new Promise(function (resolve, reject) {
  let stock = vars.stock;
  let available = document.querySelector("div.composite_availability");
  let components = document.querySelectorAll('div[data-customizer-component="'+stock[1]+'"] > ul > li:not(.disabled)');
  let comp = document.querySelector("div.composite_availability > .stock.out-of-stock.insufficient-stock").innerText;
      comp = comp.replace("Insufficient stock → ","");
      comp = comp.split(", ");
      comp = comp[0];
  let inStock = document.querySelector("div.composite_availability > .stock.out-of-stock.insufficient-stock").innerText;
  let n = 0
  function clickComponent(n) {
    if (n >= components.length) {
      resolve();
      return;
    }
    components[n].click();
    setTimeout(() => {
      inStock = document.querySelector("div.composite_availability > .stock.out-of-stock.insufficient-stock").innerText;
      if (inStock.includes(comp)) {
        available = document.querySelector("div.composite_availability");
        if (available.getAttribute("style") === '' ||available.getAttribute("style") === null) {
          clickComponent(n + 1);
        } else {
          resolve();
        }
      } else {
        resolve();
      }
    }, 1000);
  }

  clickComponent(n);
}) }, vars);
    }
    if ((() => { let test =vars.test
let stock = vars.stock
return test != "slider" && stock.length > 2 })()) {
      vars.comp3 = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let stock = vars.stock
return stock[2] }, vars);
    }
    if ((() => { let test =vars.test
let stock = vars.stock
return test != "slider" && stock.length > 2 })()) {
      await page.locator(`.melon-optics-customizer-component-tabs > li[data-customizer-component="${vars.comp3 ?? ''}"]`).filter({ visible: true }).first().click({ force: true });
    }
    if ((() => { let test =vars.test
let stock = vars.stock
return test != "slider" && stock.length > 2 })()) {
      await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return new Promise(function (resolve, reject) {
  let stock = vars.stock;
  let available = document.querySelector("div.composite_availability");
  let components = document.querySelectorAll('div[data-customizer-component="'+stock[2]+'"] > ul > li:not(.disabled)');
  let comp = document.querySelector("div.composite_availability > .stock.out-of-stock.insufficient-stock").innerText;
      comp = comp.replace("Insufficient stock → ","");
      comp = comp.split(", ");
      comp = comp[0];
  let inStock = document.querySelector("div.composite_availability > .stock.out-of-stock.insufficient-stock").innerText;
  let n = 0
  function clickComponent(n) {
    if (n >= components.length) {
      resolve();
      return;
    }
    components[n].click();
    setTimeout(() => {
      inStock = document.querySelector("div.composite_availability > .stock.out-of-stock.insufficient-stock").innerText;
      if (inStock.includes(comp)) {
        available = document.querySelector("div.composite_availability");
        if (available.getAttribute("style") === '' ||available.getAttribute("style") === null) {
          clickComponent(n + 1);
        } else {
          resolve();
        }
      } else {
        resolve();
      }
    }, 1000);
  }

  clickComponent(n);
}) }, vars);
    }
    if ((() => { let test =vars.test
let stock = vars.stock
return test != "slider" && stock.length > 3 })()) {
      vars.comp4 = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let stock = vars.stock
return stock[3] }, vars);
    }
    if ((() => { let test =vars.test
let stock = vars.stock
return test != "slider" && stock.length > 3 })()) {
      await page.locator(`.melon-optics-customizer-component-tabs > li[data-customizer-component="${vars.comp4 ?? ''}"]`).filter({ visible: true }).first().click({ force: true });
    }
    if ((() => { let test =vars.test
let stock = vars.stock
return test != "slider" && stock.length > 3 })()) {
      await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return new Promise(function (resolve, reject) {
  let stock = vars.stock;
  let available = document.querySelector("div.composite_availability");
  let components = document.querySelectorAll('div[data-customizer-component="'+stock[3]+'"] > ul > li:not(.disabled)');
  let comp = document.querySelector("div.composite_availability > .stock.out-of-stock.insufficient-stock").innerText;
      comp = comp.replace("Insufficient stock → ","");
      comp = comp.split(", ");
      comp = comp[0];
  let inStock = document.querySelector("div.composite_availability > .stock.out-of-stock.insufficient-stock").innerText;
  let n = 0
  function clickComponent(n) {
    if (n >= components.length) {
      resolve();
      return;
    }
    components[n].click();
    setTimeout(() => {
      inStock = document.querySelector("div.composite_availability > .stock.out-of-stock.insufficient-stock").innerText;
      if (inStock.includes(comp)) {
        available = document.querySelector("div.composite_availability");
        if (available.getAttribute("style") === '' ||available.getAttribute("style") === null) {
          clickComponent(n + 1);
        } else {
          resolve();
        }
      } else {
        resolve();
      }
    }, 1000);
  }

  clickComponent(n);
}) }, vars);
    }
    if ((() => { let test =vars.test
return test != "slider" })()) {
      vars.straps = ((await page.locator(`div:nth-of-type(2) > ul > li.main-component:nth-of-type(1)`).textContent()) ?? '').trim();
    }
    if ((() => { let test =vars.test
return test != "slider" })()) {
      vars.lens = ((await page.locator(`div:nth-of-type(2) > ul > li.main-component:nth-of-type(2)`).textContent()) ?? '').trim();
    }
    if ((() => { let test =vars.test
return test != "slider" })()) {
      vars.outrigger = ((await page.locator(`div:nth-of-type(2) > ul > li.main-component:nth-of-type(3)`).textContent()) ?? '').trim();
    }
    if ((() => { let test =vars.test
return test != "slider" })()) {
      vars.frame = ((await page.locator(`div:nth-of-type(2) > ul > li.main-component:nth-of-type(4)`).textContent()) ?? '').trim();
    }
    if ((() => { let test =vars.test
return test != "slider" })()) {
      vars.unitPrice = ((await page.locator(`div.composite_price > p.price > ins > span.woocommerce-Price-amount.amount`).or(page.locator(`div.composite_price > p.price > span.woocommerce-Price-amount.amount`)).textContent()) ?? '').trim();
    }
    await blockImageSizes(page, vars);
    // ↑ end 03 - Product page
    await page.locator(`button[name="add-to-cart"]`).filter({ visible: true }).first().click({ force: true });
    if (false) {
      vars.straps2 = ((await page.locator(`div.fkcart--item.fkcart-panel.fkcart-free-item:nth-of-type(2) > .fkcart-item-info > .fkcart-item-meta > div.fkcart-item-meta-content:nth-of-type(1) > .fkcart-attr-wrap > .fkcart-attr-value`).textContent()) ?? '').trim();
    }
    if (false) {
      vars.lens2 = ((await page.locator(`div.fkcart--item.fkcart-panel.fkcart-free-item:nth-of-type(3) > .fkcart-item-info > .fkcart-item-meta > div.fkcart-item-meta-content:nth-of-type(1) > .fkcart-attr-wrap > .fkcart-attr-value`).textContent()) ?? '').trim();
    }
    if (false) {
      vars.outrigger2 = ((await page.locator(`div.fkcart--item.fkcart-panel.fkcart-free-item:nth-of-type(4) > .fkcart-item-info > .fkcart-item-meta > div.fkcart-item-meta-content:nth-of-type(1) > .fkcart-attr-wrap > .fkcart-attr-value`).textContent()) ?? '').trim();
    }
    if (false) {
      vars.frame2 = ((await page.locator(`div.fkcart--item.fkcart-panel.fkcart-free-item:nth-of-type(5) > .fkcart-item-info > .fkcart-item-meta > div.fkcart-item-meta-content:nth-of-type(1) > .fkcart-attr-wrap > .fkcart-attr-value`).textContent()) ?? '').trim();
    }
    if (false) {
      expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let attributes = [`${vars.straps}`,
`${vars.straps2}`,`${vars.lens}`,`${vars.lens2}`,
`${vars.outrigger2}`,`${vars.outrigger}`,
`${vars.frame2}`,`${vars.frame}`]

for (let i = 0; i < attributes.length; i++) {
   // attributes[i] = attributes[i].replace(/(?:\s)/g,"");
    let aux = attributes[i].split(':')
    attributes[i] = aux.length > 1 ? aux[1].trim() : aux[0].trim();
}

return attributes[0] === attributes[1] && attributes[2] === attributes[3] 
&& attributes[4] === attributes[5]
&& attributes[6] === attributes[7]
 }, vars)).toBeTruthy();
    }
    if (false) {
      vars.extras = ((await page.locator(`td.product-name.last-composited-extra-padding > .component-name.component_table_item_indent > dl.component`).textContent()) ?? '').trim();
    }
    await expect(page.locator(`#fkcart-modal > div > div.fkcart-preview-ui > div.fkcart-slider-body > div.fkcart-item-wrap.fkcart-pt-16 > div:nth-child(1) > div.fkcart-item-misc > div > span`).or(page.locator(`#fkcart-modal > div > div.fkcart-preview-ui > div.fkcart-reward-product-wrap > div > div.fkcart-item-wrap.fkcart-pt-16 > div:nth-child(1) > div > div.fkcart-item-info.fkcart-item-wrap-start > div.fkcart-item-misc > div > span`)).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    vars.qty = ((await page.locator(`input.fkcart-quantity__input`).textContent()) ?? '').trim();
    await calculateSubtotal(page, vars);
    if (false) {
      await expect(page.locator(`tr:nth-of-type(1) td.product-subtotal > span.woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
    }
    await expect(page.locator(`#fkcart-modal > div > div.fkcart-preview-ui > div.fkcart-slider-footer.fkcart-pb-16 > div.fkcart-order-summary.fkcart-panel.fkcart-pt-16 > div > div.fkcart-summary-line-item.fkcart-subtotal-wrap > div.fkcart-summary-amount > strong > span`).or(page.locator(`#fkcart-modal > div > div.fkcart-preview-ui > div.fkcart-slider-footer.fkcart-pb-16 > div.fkcart_summary_cta > div.fkcart-order-summary.fkcart-panel > div > div.fkcart-summary-line-item.fkcart-subtotal-wrap > div.fkcart-summary-amount > strong > span`)).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
    if (false) {
      vars.shippingPrice = ((await page.locator(`ul#shipping_method > li:first-child > label > span.woocommerce-Price-amount.amount`).textContent()) ?? '').trim();
    }
    vars.total = ((await page.locator(`#fkcart-modal > div > div.fkcart-preview-ui > div.fkcart-slider-footer.fkcart-pb-16 > div.fkcart-order-summary.fkcart-panel.fkcart-pt-16 > div > div.fkcart-summary-line-item.fkcart-subtotal-wrap > div.fkcart-summary-amount > strong > span`).or(page.locator(`#fkcart-checkout-button > div.fkcart-checkout--price > span`)).textContent()) ?? '').trim();
    if (false) {
      vars.taxPriceSmall = ((await page.locator(`div.woocommerce > div.kadence-woo-cart-form-wrap > div > div > table > tbody > tr.order-total > td > small > span`).textContent()) ?? '').trim();
    }
    await page.locator(`xpath=//a[contains(text(),'View cart')]`).or(page.locator(`s[href*='cart/']`)).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    // ↑ end 04 - Cart Page
    {
      const _lbl = page.locator(`label[for="fkcart-checkout-button"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`a[href*="/checkout/"].checkout-button`).or(page.locator(`#fkcart-checkout-button`)).filter({ visible: true }).first().click({ force: true }); }
    }
    await page.waitForLoadState('load');
    await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return new Promise((resolve, reject) => {
  const timeout = setTimeout(() => {
    clearInterval(checkExistence);
    reject(new Error("Timeout: data-time attribute not found on wfob_wrap after 30 seconds."));
  }, 30000); // 30 seconds timeout

  const checkExistence = setInterval(() => {
    let wfobWrapElement = document.querySelector('#wfob_wrap[data-time]');
    

    if (wfobWrapElement !== null) {
      clearInterval(checkExistence);
      clearTimeout(timeout);
      console.log("✅ data-time attribute detected on wfob_wrap! Blur should be removed.");
      resolve(true);
    } else {
      console.log("⏳ Waiting for data-time attribute to be added to wfob_wrap...");
    }
  }, 1500);
}) }, vars);
    await expect(page.locator(`tr.cart_item.component_container_table_item > td.product-name`).or(page.locator(`div:not(.wfacp_min_cart_widget) > table > tbody > tr.cart_item.component_container_table_item.wfacp_delete_active > td.product-name-area > div.product-name.wfacp_summary_img_true > div.wfacp_cart_title_sec > span`)).first()).toContainText(`${vars.prod_desc ?? ''}`);
    await expect(page.locator(`td.product-total > span.woocommerce-Price-amount.amount`).or(page.locator(`div:not(.wfacp_min_cart_widget) > table > tbody > tr.cart_item.component_container_table_item.wfacp_delete_active > td.product-total > span.woocommerce-Price-amount.amount`)).first()).toContainText(`${vars.subtotalPrice ?? ''}`);
    await expect(page.locator(`.wfacp_mini_cart_reviews > tbody > tr.cart-subtotal > td > span`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
    vars.shippingPrice = ((await page.locator(`ul#shipping_method > li:first-child > label > span.woocommerce-Price-amount.amount`).or(page.locator(`.wfacp_mini_cart_reviews > tbody > tr.shipping_total_fee > td:nth-child(2) > span > span`)).textContent()) ?? '').trim();
    vars.Total = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const subtotal = parseFloat(`${vars.subtotalPrice}`.replace(`${vars.Symbol}`,"").replaceAll(",","").trim());
const shipping = parseFloat(`${vars.shippingPrice}`.replace(`${vars.Symbol}`,"").replaceAll(",","").trim());
let total = subtotal + shipping;
total = Intl.NumberFormat('en-IN', { style: 'currency', currency: `${vars.currency}`}).format(total);
return total; }, vars);
    await expect(page.locator(`#wfacp_mini_cart_reviews_64378bb3 > tbody > tr.order-total > td > strong > span`).first()).toHaveText(`${vars.Total ?? ''}`);
    if (false) {
      vars.taxPriceSmall = ((await page.locator(`.wfacp_mini_cart_reviews > tbody > tr.order-total > td > small > span`).textContent()) ?? '').trim();
    }
    // ↑ end 05 - Checkout page
    await wooCommerceCheckoutTemplate(page, vars);
    try { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="number"]`).first().fill(`4242 4242 4242 4242`); } catch { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="number"]`).first().selectOption(`4242 4242 4242 4242`); }
    try { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="expiry"]`).first().fill(`12 / ${vars.year ?? ''}`); } catch { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="expiry"]`).first().selectOption(`12 / ${vars.year ?? ''}`); }
    try { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="cvc"]`).first().fill(`123`); } catch { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="cvc"]`).first().selectOption(`123`); }
    await placeOrderElement(page, vars);
    await blockUI(page, vars);
    await page.waitForLoadState('load');
    vars.upsell = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let upsell = window.location.href.includes('thank-you-page')

if (upsell) {
    upsell = "no"
} else {
    upsell = "yes"
}

return upsell }, vars);
    if (vars.upsell === "yes") {
      await upSellFlow(page, vars);
    }
    if (vars.upsell === "yes" && vars.accept === "yes") {
      vars.taxPriceSmall = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); 
let total = parseFloat(`${vars.subtotalPrice}`.replace(`${vars.Symbol}`,"").trim());
let shipping = parseFloat(`${vars.shippingPrice}`.replace(`${vars.Symbol}`,"").trim());
let price2 = parseFloat(`${vars.price2}`.replace(`${vars.Symbol}`,"").trim());
let price3 = `${vars.price3}`
if (price3 !== "") {
    price3 = parseFloat(price3.replace(`${vars.Symbol}`,"").trim());
} else {
    price3 = 0
}

total = total - ( total / 1.2 )
shipping = shipping - ( shipping / 1.2 )
price2 = price2 - ( price2 / 1.2 )

if (price3 !== 0) {
    price3 = price3 - ( price3 / 1.2 )
}


let taxPriceSmall = Number(total.toFixed(2))+Number(price2.toFixed(2))+Number(price3.toFixed(2))+Number(shipping.toFixed(2))

taxPriceSmall = Intl.NumberFormat('en-IN', { style: 'currency', currency: 'GBP'}).format(taxPriceSmall)

return taxPriceSmall
 }, vars);
    }
    if (vars.upsell === "yes" && vars.accept === "yes") {
      vars.total = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); 
let total = parseFloat(`${vars.total}`.replace(`${vars.Symbol}`,"").trim());
let price2 = parseFloat(`${vars.price2}`.replace(`${vars.Symbol}`,"").trim());
let price3 = `${vars.price3}`
if (price3 !== "") {
    price3 = parseFloat(price3.replace(`${vars.Symbol}`,"").trim());
} else {
    price3 = 0
}


total = total+price2+price3

total = Intl.NumberFormat('en-IN', { style: 'currency', currency: 'GBP'}).format(total)

return total

 }, vars);
    }
    await blockUI(page, vars);
    vars.orderNumber = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return location.search.split('order_id=')[1].split('&')[0] }, vars);
    await expect(page.locator(`div.wfty_pro_list_cont.wfty_show_images > table > tfoot > tr:nth-child(4) > td > span`).or(page.locator(`table tfoot tr:nth-of-type(1) .woocommerce-Price-amount.amount`)).first()).toHaveText(`${vars.total ?? ''}`);
    await expect(page.locator(`.method > strong`).or(page.locator(`table tfoot tr:nth-of-type(3) td`)).first()).toHaveText(`Credit Card (Stripe)`);
    await expect(page.locator(`.email > strong`).or(page.locator(`.wfty_customer_info > .wfty_content > div:nth-child(1) > div.wfty_view`)).first()).toHaveText(`${vars.email ?? ''}`);
    await expect(page.locator(`tr.woocommerce-table__line-item.order_item:nth-of-type(1) > td.woocommerce-table__product-name.product-name > a`).or(page.locator(`div.wfty_pro_list_cont.wfty_show_images > div:nth-child(1) > div > div.wfty_p_name > a > span`)).first()).toHaveText(`${vars.prod_desc ?? ''}`);
    await expect(page.locator(`div.wfty_pro_list_cont > div:nth-child(1) > div.wfty_rightDiv > span`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    vars.straps = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let element = `${vars.straps}`
const regex = /:\s*([^,]*)$/;  // Matches ": " followed by any characters except comma

const match = element.match(regex);

return match[1] }, vars);
    vars.lens = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let element = `${vars.lens}`
const regex = /:\s*([^,]*)$/;  // Matches ": " followed by any characters except comma

const match = element.match(regex);

return match[1] }, vars);
    vars.outrigger = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = `${vars.outrigger}`;
const regex = /:\s*([^,]*)$/;  // Matches ": " followed by any characters except comma

const match = element.match(regex);

return match[1] }, vars);
    vars.frame = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let element = `${vars.frame}`
const regex = /:\s*([^,]*)$/;  // Matches ": " followed by any characters except comma

const match = element.match(regex);

return match[1] }, vars);
    await expect(page.locator(`tr.woocommerce-table__line-item.order_item.component_table_item:nth-of-type(2) > td.woocommerce-table__product-name.product-name > .component-name.component_table_item_indent > .wc-item-meta > li > p`).or(page.locator(`div.wfty_pro_list_cont.wfty_show_images > div:nth-child(2) > div > div.wfty_p_name > div > ul > li > p`)).or(page.locator(`div.wfty_pro_list_cont.wfty_show_images > div:nth-child(2) > div > div.wfty_p_name`)).first()).toContainText(`${vars.straps ?? ''}`);
    await expect(page.locator(`tr.woocommerce-table__line-item.order_item.component_table_item:nth-of-type(3) > td.woocommerce-table__product-name.product-name > .component-name.component_table_item_indent > .wc-item-meta > li > p`).or(page.locator(`div.wfty_pro_list_cont.wfty_show_images > div:nth-child(3) > div > div.wfty_p_name > div > ul > li > p`)).or(page.locator(`div.wfty_pro_list_cont.wfty_show_images > div:nth-child(3) > div > div.wfty_p_name`)).first()).toContainText(`${vars.lens ?? ''}`);
    await expect(page.locator(`tr.woocommerce-table__line-item.order_item.component_table_item:nth-of-type(4) > td.woocommerce-table__product-name.product-name > .component-name.component_table_item_indent > .wc-item-meta > li > p`).or(page.locator(`div.wfty_pro_list_cont.wfty_show_images > div:nth-child(4) > div > div.wfty_p_name > div > ul > li > p`)).or(page.locator(`div.wfty_pro_list_cont.wfty_show_images > div:nth-child(4) > div > div.wfty_p_name`)).first()).toContainText(`${vars.outrigger ?? ''}`);
    await expect(page.locator(`tr.woocommerce-table__line-item.order_item.component_table_item:nth-of-type(5) > td.woocommerce-table__product-name.product-name > .component-name.component_table_item_indent > .wc-item-meta > li > p`).or(page.locator(`div.wfty_pro_list_cont.wfty_show_images > div:nth-child(5) > div > div.wfty_p_name > div > ul > li > p`)).or(page.locator(`div.wfty_pro_list_cont.wfty_show_images > div:nth-child(5) > div > div.wfty_p_name`)).first()).toContainText(`${vars.frame ?? ''}`);
    if (vars.upsell === "yes" && vars.accept === "yes") {
      await expect(page.locator(`tr.woocommerce-table__line-item.order_item:nth-of-type(6) > td.woocommerce-table__product-name.product-name > a`).or(page.locator(`div.wfty_pro_list_cont.wfty_show_images > div:nth-child(6) > div > div.wfty_p_name > a > span`)).first()).toContainText(`${vars.prod_desc2 ?? ''}`);
    }
    if (false) {
      await expect(page.locator(`tr.woocommerce-table__line-item.order_item:nth-of-type(6) > td.woocommerce-table__product-name.product-name > strong.product-quantity`).first()).toContainText(`× 3`);
    }
    if (vars.upsell === "yes" && vars.accept === "yes") {
      await expect(page.locator(`tr:nth-of-type(6).woocommerce-table__line-item.order_item > td.woocommerce-table__product-total.product-total > span`).or(page.locator(`div.wfty_pro_list_cont > div:nth-child(6) > div.wfty_rightDiv > span`)).first()).toContainText(`${vars.price2 ?? ''}`);
    }
    if (vars.prod_desc3 !== "" && vars.upsell === "yes" && vars.accept === "yes") {
      await expect(page.locator(`tr.woocommerce-table__line-item.order_item:nth-of-type(7) > td.woocommerce-table__product-name.product-name > a`).or(page.locator(`div.wfty_pro_list_cont.wfty_show_images > div:nth-child(7) > div > div.wfty_p_name > a > span`)).first()).toContainText(`${vars.prod_desc3 ?? ''}`);
    }
    if (false) {
      await expect(page.locator(`tr.woocommerce-table__line-item.order_item:nth-of-type(7) > td.woocommerce-table__product-name.product-name > strong.product-quantity`).first()).toContainText(`× 1`);
    }
    if (vars.prod_desc3 !== "" && vars.upsell === "yes" && vars.accept === "yes") {
      await expect(page.locator(`tr:nth-of-type(7).woocommerce-table__line-item.order_item > td.woocommerce-table__product-total.product-total > span`).or(page.locator(`div.wfty_pro_list_cont > div:nth-child(7) > div.wfty_rightDiv > span`)).first()).toContainText(`${vars.price3 ?? ''}`);
    }
    if (vars.upsell === "yes" && vars.accept === "yes") {
      vars.subtotalPrice = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let subtotalPrice = parseFloat(`${vars.subtotalPrice}`.replace(`${vars.Symbol}`,"").trim());
let price2 = parseFloat(`${vars.price2}`.replace(`${vars.Symbol}`,"").trim());
let price3 = `${vars.price3}`
if (price3 !== "") {
    price3 = parseFloat(price3.replace(`${vars.Symbol}`,"").trim());
} else {
    price3 = 0
}
subtotalPrice = subtotalPrice+price2+price3

subtotalPrice = Intl.NumberFormat('en-IN', { style: 'currency', currency: `${vars.currency}`}).format(subtotalPrice)

return subtotalPrice
 }, vars);
    }
    await expect(page.locator(`tfoot > tr:nth-of-type(1) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
    await expect(page.locator(`tfoot > tr:nth-of-type(2) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.shippingPrice ?? ''}`);
    await expect(page.locator(`tfoot > tr:nth-of-type(3) > td`).first()).toHaveText(`Credit Card (Stripe)`);
    await expect(page.locator(`tfoot > tr:nth-of-type(4) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.total ?? ''}`);
    await expect(page.locator(`tfoot > tr:nth-of-type(4) > td > small > .woocommerce-Price-amount.amount`).first()).toContainText(`${vars.taxPriceSmall ?? ''}`);
    if (false) {
      await expect(page.locator(`tfoot > tr:nth-of-type(5) > td`).first()).toContainText(`Order Note for Testing this field`);
    }
    await expect(page.locator(`.woocommerce-column.woocommerce-column--1 > address`).or(page.locator(`div.wfty-cust-details-block > div > div > div.wfty_content.wfty_clearfix.wfty_text > div:nth-child(4)`)).first()).toContainText(`Billing address
${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.street3 ?? ''}
${vars.street2 ?? ''}
${vars.city ?? ''}
${vars.zipCode ?? ''}`);
    await expect(page.locator(`.woocommerce-column.woocommerce-column--2 > address`).or(page.locator(`div.wfty-cust-details-block > div > div > div.wfty_content.wfty_clearfix.wfty_text > div:nth-child(5)`)).first()).toContainText(`Shipping address
${vars.firstName ?? ''} ${vars.lastName2 ?? ''}
${vars.street3 ?? ''}
${vars.street2 ?? ''}
${vars.city ?? ''}
${vars.zipCode ?? ''}`);
    try {
      await page.goto(`${vars.startUrl ?? ''}my-account/`);
      await page.waitForLoadState('load');
    } catch { /* optional step: open */ }
    try {
      await page.locator(`a[href*="/my-account/orders/"]`).filter({ visible: true }).first().click({ force: true });
    } catch { /* optional step: click */ }
    await expect(page.locator(`td.woocommerce-orders-table__cell.woocommerce-orders-table__cell-order-status`).first()).toContainText(`Processing`);
    await expect(page.locator(`td.woocommerce-orders-table__cell.woocommerce-orders-table__cell-order-total > .woocommerce-Price-amount.amount`).first()).toContainText(`${vars.total ?? ''}`);
    await page.locator(`th.woocommerce-orders-table__cell.woocommerce-orders-table__cell-order-number > a[href*="/my-account/view-order/${vars.orderNumber ?? ''}/"]`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`mark.order-status`).first()).toHaveText(`Processing`);
    await expect(page.locator(`tr.woocommerce-table__line-item.order_item:nth-of-type(1) > td.woocommerce-table__product-name.product-name > a`).first()).toHaveText(`${vars.prod_desc ?? ''}`);
    await expect(page.locator(`tr:nth-of-type(1).woocommerce-table__line-item.order_item > td.woocommerce-table__product-total > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    await expect(page.locator(`tr.woocommerce-table__line-item.order_item.component_table_item:nth-of-type(2) > td.woocommerce-table__product-name.product-name > .component-name.component_table_item_indent > .wc-item-meta > li`).or(page.locator(`section.woocommerce-order-details > table > tbody > tr:nth-child(2) > td.woocommerce-table__product-name.product-name > div > dl > dd > p`)).first()).toContainText(`${vars.straps ?? ''}`);
    await expect(page.locator(`tr.woocommerce-table__line-item.order_item.component_table_item:nth-of-type(3) > td.woocommerce-table__product-name.product-name > .component-name.component_table_item_indent > .wc-item-meta > li`).or(page.locator(`section.woocommerce-order-details > table > tbody > tr:nth-child(3) > td.woocommerce-table__product-name.product-name > div > dl > dd > p`)).first()).toContainText(`${vars.lens ?? ''}`);
    await expect(page.locator(`tr.woocommerce-table__line-item.order_item.component_table_item:nth-of-type(4) > td.woocommerce-table__product-name.product-name > .component-name.component_table_item_indent > .wc-item-meta > li`).or(page.locator(`section.woocommerce-order-details > table > tbody > tr:nth-child(4) > td.woocommerce-table__product-name.product-name > div > dl > dd > p`)).first()).toContainText(`${vars.outrigger ?? ''}`);
    await expect(page.locator(`tr.woocommerce-table__line-item.order_item.component_table_item:nth-of-type(5) > td.woocommerce-table__product-name.product-name > .component-name.component_table_item_indent > .wc-item-meta > li`).or(page.locator(`section.woocommerce-order-details > table > tbody > tr:nth-child(5) > td.woocommerce-table__product-name.product-name > div > dl > dd > p`)).first()).toContainText(`${vars.frame ?? ''}`);
    if (vars.upsell === "yes" && vars.accept === "yes") {
      await expect(page.locator(`tr.woocommerce-table__line-item.order_item:nth-of-type(6) > td.woocommerce-table__product-name.product-name > a`).first()).toContainText(`${vars.prod_desc2 ?? ''}`);
    }
    if (vars.upsell === "yes" && vars.accept === "yes") {
      await expect(page.locator(`tr.woocommerce-table__line-item.order_item:nth-of-type(6) > td.woocommerce-table__product-name.product-name > strong.product-quantity`).first()).toHaveText(`× 1`);
    }
    if (vars.upsell === "yes" && vars.accept === "yes") {
      await expect(page.locator(`tr:nth-of-type(6).woocommerce-table__line-item.order_item > td.woocommerce-table__product-total.product-total > span`).first()).toContainText(`${vars.price2 ?? ''}`);
    }
    if (vars.prod_desc3 !== "" && vars.upsell === "yes" && vars.accept === "yes") {
      await expect(page.locator(`tr.woocommerce-table__line-item.order_item:nth-of-type(7) > td.woocommerce-table__product-name.product-name > a`).first()).toContainText(`${vars.prod_desc3 ?? ''}`);
    }
    if (vars.prod_desc3 !== "" && vars.upsell === "yes" && vars.accept === "yes") {
      await expect(page.locator(`tr.woocommerce-table__line-item.order_item:nth-of-type(7) > td.woocommerce-table__product-name.product-name > strong.product-quantity`).first()).toContainText(`× 1`);
    }
    if (vars.prod_desc3 !== "" && vars.upsell === "yes" && vars.accept === "yes") {
      await expect(page.locator(`tr:nth-of-type(7).woocommerce-table__line-item.order_item > td.woocommerce-table__product-total.product-total > span`).first()).toContainText(`${vars.price3 ?? ''}`);
    }
    await expect(page.locator(`tfoot > tr:nth-of-type(1) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
    await expect(page.locator(`tfoot > tr:nth-of-type(2) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.shippingPrice ?? ''}`);
    await expect(page.locator(`tfoot > tr:nth-of-type(4) > td`).first()).toHaveText(`Credit Card (Stripe)`);
    await expect(page.locator(`tfoot > tr:nth-of-type(3) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.total ?? ''}`);
    await expect(page.locator(`tfoot > tr:nth-of-type(3) > td > small > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.taxPriceSmall ?? ''}`);
    try {
      await expect(page.locator(`tfoot > tr:nth-of-type(5) > td`).first()).toHaveText(`Order Note for Testing this field`);
    } catch { /* optional step: assertText */ }
    await expect(page.locator(`.woocommerce-column.woocommerce-column--1 > address`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.street3 ?? ''}
${vars.street2 ?? ''}
${vars.city ?? ''}
${vars.zipCode ?? ''}

${vars.phone ?? ''}

${vars.email ?? ''}`);
    await expect(page.locator(`.woocommerce-column.woocommerce-column--2 > address`).first()).toContainText(`${vars.firstName ?? ''} ${vars.lastName2 ?? ''}
${vars.street3 ?? ''}
${vars.street2 ?? ''}
${vars.city ?? ''}
${vars.zipCode ?? ''}

${vars.phone ?? ''}`);
    // ↑ end 01 - Place order - Upsell Accepted
  });

  test('10 - Place order - Accept Upsell - Email', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    // ↓ 03 - Place order - Email
    vars.username = `${vars.email ?? ''}`;
    await extractUserFromEmail(page, vars);
    await page.locator(`xpath=//a[contains(text(), "Your Melon Optics order receipt from")]`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`tr.order_item > td.td:nth-of-type(1)`).first()).toContainText(`${vars.prodDesc ?? ''}`);
    await expect(page.locator(`tr.order_item.component_container_table_item > td.td:nth-of-type(3) > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    if (vars.price2 !== '') {
      await expect(page.locator(`tr.order_item:nth-of-type(6) > td.td:nth-of-type(3) > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.price2 ?? ''}`);
    }
    if (vars.price2 !== '') {
      await expect(page.locator(`tr.order_item:nth-of-type(7) > td.td:nth-of-type(3) > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.price3 ?? ''}`);
    }
    await expect(page.locator(`tr.order-totals-subtotal > td.td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
    await expect(page.locator(`tr.order-totals-shipping > td.td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.shippingPrice ?? ''}`);
    try {
      await expect(page.locator(`tr.order-totals-payment_method > td.td`).first()).toContainText(`Credit Card (Stripe)`);
    } catch { /* optional step: assertTextPresent */ }
    await expect(page.locator(`small .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.taxPriceSmall ?? ''}`);
    await expect(page.locator(`tr.order-totals-total > td.td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.total ?? ''}`);
    await expect(page.locator(`td:nth-of-type(1) > address.address`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.street3 ?? ''}
${vars.street2 ?? ''}
${vars.city ?? ''}
${vars.zipCode ?? ''}
${vars.countryComplete ?? ''}
${vars.phone ?? ''}
${vars.email ?? ''}`);
    await expect(page.locator(`td:nth-of-type(2) > address.address`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName2 ?? ''}
${vars.street3 ?? ''}
${vars.street2 ?? ''}
${vars.city ?? ''}
${vars.zipCode ?? ''}
${vars.countryComplete ?? ''}
${vars.phone ?? ''}`);
    // ↑ end 03 - Place order - Email
  });

  test('11 - Place order - Upsell rejected', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    // ↓ 01 - Place order - Upsell rejected
    vars.accept = `no`;
    vars.email = `qa+gi_order_${vars.alphanumeric ?? ''}@saucal.com`;
    // ↓ 05 - Checkout page
    // ↓ 04 - Cart Page
    // ↓ 03 - Product page
    await closePopup(page, vars);
    await page.locator(`xpath=//a[contains(text(),'Goggles')]`).or(page.locator(`li.mega-menu-item.mega-menu-item-type-custom.mega-menu-item-object-custom.mega-menu-item-has-children.mega-menu-megamenu.mega-align-bottom-left:nth-of-type(1) > a[href="#"].mega-menu-link`)).filter({ visible: true }).first().click({ force: true });
    await page.goto(`${vars.startUrl ?? ''}shop/diablo-mtb-goggles/?pa_frame=cosmic-black&pa_lens=smoke&pa_outrigger-nosepiece=galaxy-matte&pa_strap=black-with-white-silicon`);
    await page.waitForLoadState('load');
    await page.waitForLoadState('load');
    if ((() => { let test =vars.test
return test != "slider" })()) {
      vars.prod_desc = ((await page.locator(`h1.product_title`).textContent()) ?? '').trim();
    }
    if ((() => { let test =vars.test
return test != "slider" })()) {
      vars.stock = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let available = document.querySelector("div.composite_availability");
let stock;
if (available.getAttribute("style") === '' || available.getAttribute("style") === null) {
    stock = document.querySelector("div.composite_availability > .stock.out-of-stock.insufficient-stock").innerText;
    stock = stock.replace("Insufficient stock → ","");
    stock = stock.split(", ");
    for ( var i = 0; i < stock.length; i++ ) {
        stock[i] = stock[i].toLowerCase();
        if (stock[i] === "outrigger/nose") {
            stock[i] = stock[i].replace("/","-");
        }
    }
} else {
    stock = []
}
return stock }, vars);
    }
    if ((() => { let test =vars.test
return test != "slider" })()) {
      vars.prod_desc = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let prodDesc = `${vars.prod_desc}`
prodDesc = prodDesc.replace("–","-")
return prodDesc }, vars);
    }
    if ((() => { let test =vars.test
let stock = vars.stock
return test != "slider" && stock.length > 0 })()) {
      vars.comp1 = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let stock = vars.stock
return stock[0] }, vars);
    }
    if ((() => { let test =vars.test
let stock = vars.stock
return test != "slider" && stock.length > 0 })()) {
      await page.locator(`.melon-optics-customizer-component-tabs > li[data-customizer-component="${vars.comp1 ?? ''}"]`).filter({ visible: true }).first().click({ force: true });
    }
    if ((() => { let test =vars.test
let stock = vars.stock
return test != "slider" && stock.length > 0 })()) {
      await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return new Promise(function (resolve, reject) {
  let stock = vars.stock;
  let available = document.querySelector("div.composite_availability");
  let components = document.querySelectorAll('div[data-customizer-component="'+stock[0]+'"] > ul > li:not(.disabled)');
  let comp = document.querySelector("div.composite_availability > .stock.out-of-stock.insufficient-stock").innerText;
      comp = comp.replace("Insufficient stock → ","");
      comp = comp.split(", ");
      comp = comp[0];
  let inStock = document.querySelector("div.composite_availability > .stock.out-of-stock.insufficient-stock").innerText;
  let n = 0
  function clickComponent(n) {
    if (n >= components.length) {
      resolve();
      return;
    }
    components[n].click();
    setTimeout(() => {
      inStock = document.querySelector("div.composite_availability > .stock.out-of-stock.insufficient-stock").innerText;
      if (inStock.includes(comp)) {
        available = document.querySelector("div.composite_availability");
        if (available.getAttribute("style") === '' ||available.getAttribute("style") === null) {
          clickComponent(n + 1);
        } else {
          resolve();
        }
      } else {
        resolve();
      }
    }, 1000);
  }

  clickComponent(n);
}) }, vars);
    }
    if ((() => { let test =vars.test
let stock = vars.stock
return test != "slider" && stock.length > 1 })()) {
      vars.comp2 = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let stock = vars.stock
return stock[1] }, vars);
    }
    if ((() => { let test =vars.test
let stock = vars.stock
return test != "slider" && stock.length > 1 })()) {
      await page.locator(`.melon-optics-customizer-component-tabs > li[data-customizer-component="${vars.comp2 ?? ''}"]`).filter({ visible: true }).first().click({ force: true });
    }
    if ((() => { let test =vars.test
let stock = vars.stock
return test != "slider" && stock.length > 1 })()) {
      await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return new Promise(function (resolve, reject) {
  let stock = vars.stock;
  let available = document.querySelector("div.composite_availability");
  let components = document.querySelectorAll('div[data-customizer-component="'+stock[1]+'"] > ul > li:not(.disabled)');
  let comp = document.querySelector("div.composite_availability > .stock.out-of-stock.insufficient-stock").innerText;
      comp = comp.replace("Insufficient stock → ","");
      comp = comp.split(", ");
      comp = comp[0];
  let inStock = document.querySelector("div.composite_availability > .stock.out-of-stock.insufficient-stock").innerText;
  let n = 0
  function clickComponent(n) {
    if (n >= components.length) {
      resolve();
      return;
    }
    components[n].click();
    setTimeout(() => {
      inStock = document.querySelector("div.composite_availability > .stock.out-of-stock.insufficient-stock").innerText;
      if (inStock.includes(comp)) {
        available = document.querySelector("div.composite_availability");
        if (available.getAttribute("style") === '' ||available.getAttribute("style") === null) {
          clickComponent(n + 1);
        } else {
          resolve();
        }
      } else {
        resolve();
      }
    }, 1000);
  }

  clickComponent(n);
}) }, vars);
    }
    if ((() => { let test =vars.test
let stock = vars.stock
return test != "slider" && stock.length > 2 })()) {
      vars.comp3 = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let stock = vars.stock
return stock[2] }, vars);
    }
    if ((() => { let test =vars.test
let stock = vars.stock
return test != "slider" && stock.length > 2 })()) {
      await page.locator(`.melon-optics-customizer-component-tabs > li[data-customizer-component="${vars.comp3 ?? ''}"]`).filter({ visible: true }).first().click({ force: true });
    }
    if ((() => { let test =vars.test
let stock = vars.stock
return test != "slider" && stock.length > 2 })()) {
      await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return new Promise(function (resolve, reject) {
  let stock = vars.stock;
  let available = document.querySelector("div.composite_availability");
  let components = document.querySelectorAll('div[data-customizer-component="'+stock[2]+'"] > ul > li:not(.disabled)');
  let comp = document.querySelector("div.composite_availability > .stock.out-of-stock.insufficient-stock").innerText;
      comp = comp.replace("Insufficient stock → ","");
      comp = comp.split(", ");
      comp = comp[0];
  let inStock = document.querySelector("div.composite_availability > .stock.out-of-stock.insufficient-stock").innerText;
  let n = 0
  function clickComponent(n) {
    if (n >= components.length) {
      resolve();
      return;
    }
    components[n].click();
    setTimeout(() => {
      inStock = document.querySelector("div.composite_availability > .stock.out-of-stock.insufficient-stock").innerText;
      if (inStock.includes(comp)) {
        available = document.querySelector("div.composite_availability");
        if (available.getAttribute("style") === '' ||available.getAttribute("style") === null) {
          clickComponent(n + 1);
        } else {
          resolve();
        }
      } else {
        resolve();
      }
    }, 1000);
  }

  clickComponent(n);
}) }, vars);
    }
    if ((() => { let test =vars.test
let stock = vars.stock
return test != "slider" && stock.length > 3 })()) {
      vars.comp4 = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let stock = vars.stock
return stock[3] }, vars);
    }
    if ((() => { let test =vars.test
let stock = vars.stock
return test != "slider" && stock.length > 3 })()) {
      await page.locator(`.melon-optics-customizer-component-tabs > li[data-customizer-component="${vars.comp4 ?? ''}"]`).filter({ visible: true }).first().click({ force: true });
    }
    if ((() => { let test =vars.test
let stock = vars.stock
return test != "slider" && stock.length > 3 })()) {
      await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return new Promise(function (resolve, reject) {
  let stock = vars.stock;
  let available = document.querySelector("div.composite_availability");
  let components = document.querySelectorAll('div[data-customizer-component="'+stock[3]+'"] > ul > li:not(.disabled)');
  let comp = document.querySelector("div.composite_availability > .stock.out-of-stock.insufficient-stock").innerText;
      comp = comp.replace("Insufficient stock → ","");
      comp = comp.split(", ");
      comp = comp[0];
  let inStock = document.querySelector("div.composite_availability > .stock.out-of-stock.insufficient-stock").innerText;
  let n = 0
  function clickComponent(n) {
    if (n >= components.length) {
      resolve();
      return;
    }
    components[n].click();
    setTimeout(() => {
      inStock = document.querySelector("div.composite_availability > .stock.out-of-stock.insufficient-stock").innerText;
      if (inStock.includes(comp)) {
        available = document.querySelector("div.composite_availability");
        if (available.getAttribute("style") === '' ||available.getAttribute("style") === null) {
          clickComponent(n + 1);
        } else {
          resolve();
        }
      } else {
        resolve();
      }
    }, 1000);
  }

  clickComponent(n);
}) }, vars);
    }
    if ((() => { let test =vars.test
return test != "slider" })()) {
      vars.straps = ((await page.locator(`div:nth-of-type(2) > ul > li.main-component:nth-of-type(1)`).textContent()) ?? '').trim();
    }
    if ((() => { let test =vars.test
return test != "slider" })()) {
      vars.lens = ((await page.locator(`div:nth-of-type(2) > ul > li.main-component:nth-of-type(2)`).textContent()) ?? '').trim();
    }
    if ((() => { let test =vars.test
return test != "slider" })()) {
      vars.outrigger = ((await page.locator(`div:nth-of-type(2) > ul > li.main-component:nth-of-type(3)`).textContent()) ?? '').trim();
    }
    if ((() => { let test =vars.test
return test != "slider" })()) {
      vars.frame = ((await page.locator(`div:nth-of-type(2) > ul > li.main-component:nth-of-type(4)`).textContent()) ?? '').trim();
    }
    if ((() => { let test =vars.test
return test != "slider" })()) {
      vars.unitPrice = ((await page.locator(`div.composite_price > p.price > ins > span.woocommerce-Price-amount.amount`).or(page.locator(`div.composite_price > p.price > span.woocommerce-Price-amount.amount`)).textContent()) ?? '').trim();
    }
    await blockImageSizes(page, vars);
    // ↑ end 03 - Product page
    await page.locator(`button[name="add-to-cart"]`).filter({ visible: true }).first().click({ force: true });
    if (false) {
      vars.straps2 = ((await page.locator(`div.fkcart--item.fkcart-panel.fkcart-free-item:nth-of-type(2) > .fkcart-item-info > .fkcart-item-meta > div.fkcart-item-meta-content:nth-of-type(1) > .fkcart-attr-wrap > .fkcart-attr-value`).textContent()) ?? '').trim();
    }
    if (false) {
      vars.lens2 = ((await page.locator(`div.fkcart--item.fkcart-panel.fkcart-free-item:nth-of-type(3) > .fkcart-item-info > .fkcart-item-meta > div.fkcart-item-meta-content:nth-of-type(1) > .fkcart-attr-wrap > .fkcart-attr-value`).textContent()) ?? '').trim();
    }
    if (false) {
      vars.outrigger2 = ((await page.locator(`div.fkcart--item.fkcart-panel.fkcart-free-item:nth-of-type(4) > .fkcart-item-info > .fkcart-item-meta > div.fkcart-item-meta-content:nth-of-type(1) > .fkcart-attr-wrap > .fkcart-attr-value`).textContent()) ?? '').trim();
    }
    if (false) {
      vars.frame2 = ((await page.locator(`div.fkcart--item.fkcart-panel.fkcart-free-item:nth-of-type(5) > .fkcart-item-info > .fkcart-item-meta > div.fkcart-item-meta-content:nth-of-type(1) > .fkcart-attr-wrap > .fkcart-attr-value`).textContent()) ?? '').trim();
    }
    if (false) {
      expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let attributes = [`${vars.straps}`,
`${vars.straps2}`,`${vars.lens}`,`${vars.lens2}`,
`${vars.outrigger2}`,`${vars.outrigger}`,
`${vars.frame2}`,`${vars.frame}`]

for (let i = 0; i < attributes.length; i++) {
   // attributes[i] = attributes[i].replace(/(?:\s)/g,"");
    let aux = attributes[i].split(':')
    attributes[i] = aux.length > 1 ? aux[1].trim() : aux[0].trim();
}

return attributes[0] === attributes[1] && attributes[2] === attributes[3] 
&& attributes[4] === attributes[5]
&& attributes[6] === attributes[7]
 }, vars)).toBeTruthy();
    }
    if (false) {
      vars.extras = ((await page.locator(`td.product-name.last-composited-extra-padding > .component-name.component_table_item_indent > dl.component`).textContent()) ?? '').trim();
    }
    await expect(page.locator(`#fkcart-modal > div > div.fkcart-preview-ui > div.fkcart-slider-body > div.fkcart-item-wrap.fkcart-pt-16 > div:nth-child(1) > div.fkcart-item-misc > div > span`).or(page.locator(`#fkcart-modal > div > div.fkcart-preview-ui > div.fkcart-reward-product-wrap > div > div.fkcart-item-wrap.fkcart-pt-16 > div:nth-child(1) > div > div.fkcart-item-info.fkcart-item-wrap-start > div.fkcart-item-misc > div > span`)).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    vars.qty = ((await page.locator(`input.fkcart-quantity__input`).textContent()) ?? '').trim();
    await calculateSubtotal(page, vars);
    if (false) {
      await expect(page.locator(`tr:nth-of-type(1) td.product-subtotal > span.woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
    }
    await expect(page.locator(`#fkcart-modal > div > div.fkcart-preview-ui > div.fkcart-slider-footer.fkcart-pb-16 > div.fkcart-order-summary.fkcart-panel.fkcart-pt-16 > div > div.fkcart-summary-line-item.fkcart-subtotal-wrap > div.fkcart-summary-amount > strong > span`).or(page.locator(`#fkcart-modal > div > div.fkcart-preview-ui > div.fkcart-slider-footer.fkcart-pb-16 > div.fkcart_summary_cta > div.fkcart-order-summary.fkcart-panel > div > div.fkcart-summary-line-item.fkcart-subtotal-wrap > div.fkcart-summary-amount > strong > span`)).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
    if (false) {
      vars.shippingPrice = ((await page.locator(`ul#shipping_method > li:first-child > label > span.woocommerce-Price-amount.amount`).textContent()) ?? '').trim();
    }
    vars.total = ((await page.locator(`#fkcart-modal > div > div.fkcart-preview-ui > div.fkcart-slider-footer.fkcart-pb-16 > div.fkcart-order-summary.fkcart-panel.fkcart-pt-16 > div > div.fkcart-summary-line-item.fkcart-subtotal-wrap > div.fkcart-summary-amount > strong > span`).or(page.locator(`#fkcart-checkout-button > div.fkcart-checkout--price > span`)).textContent()) ?? '').trim();
    if (false) {
      vars.taxPriceSmall = ((await page.locator(`div.woocommerce > div.kadence-woo-cart-form-wrap > div > div > table > tbody > tr.order-total > td > small > span`).textContent()) ?? '').trim();
    }
    await page.locator(`xpath=//a[contains(text(),'View cart')]`).or(page.locator(`s[href*='cart/']`)).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    // ↑ end 04 - Cart Page
    {
      const _lbl = page.locator(`label[for="fkcart-checkout-button"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`a[href*="/checkout/"].checkout-button`).or(page.locator(`#fkcart-checkout-button`)).filter({ visible: true }).first().click({ force: true }); }
    }
    await page.waitForLoadState('load');
    await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return new Promise((resolve, reject) => {
  const timeout = setTimeout(() => {
    clearInterval(checkExistence);
    reject(new Error("Timeout: data-time attribute not found on wfob_wrap after 30 seconds."));
  }, 30000); // 30 seconds timeout

  const checkExistence = setInterval(() => {
    let wfobWrapElement = document.querySelector('#wfob_wrap[data-time]');
    

    if (wfobWrapElement !== null) {
      clearInterval(checkExistence);
      clearTimeout(timeout);
      console.log("✅ data-time attribute detected on wfob_wrap! Blur should be removed.");
      resolve(true);
    } else {
      console.log("⏳ Waiting for data-time attribute to be added to wfob_wrap...");
    }
  }, 1500);
}) }, vars);
    await expect(page.locator(`tr.cart_item.component_container_table_item > td.product-name`).or(page.locator(`div:not(.wfacp_min_cart_widget) > table > tbody > tr.cart_item.component_container_table_item.wfacp_delete_active > td.product-name-area > div.product-name.wfacp_summary_img_true > div.wfacp_cart_title_sec > span`)).first()).toContainText(`${vars.prod_desc ?? ''}`);
    await expect(page.locator(`td.product-total > span.woocommerce-Price-amount.amount`).or(page.locator(`div:not(.wfacp_min_cart_widget) > table > tbody > tr.cart_item.component_container_table_item.wfacp_delete_active > td.product-total > span.woocommerce-Price-amount.amount`)).first()).toContainText(`${vars.subtotalPrice ?? ''}`);
    await expect(page.locator(`.wfacp_mini_cart_reviews > tbody > tr.cart-subtotal > td > span`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
    vars.shippingPrice = ((await page.locator(`ul#shipping_method > li:first-child > label > span.woocommerce-Price-amount.amount`).or(page.locator(`.wfacp_mini_cart_reviews > tbody > tr.shipping_total_fee > td:nth-child(2) > span > span`)).textContent()) ?? '').trim();
    vars.Total = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const subtotal = parseFloat(`${vars.subtotalPrice}`.replace(`${vars.Symbol}`,"").replaceAll(",","").trim());
const shipping = parseFloat(`${vars.shippingPrice}`.replace(`${vars.Symbol}`,"").replaceAll(",","").trim());
let total = subtotal + shipping;
total = Intl.NumberFormat('en-IN', { style: 'currency', currency: `${vars.currency}`}).format(total);
return total; }, vars);
    await expect(page.locator(`#wfacp_mini_cart_reviews_64378bb3 > tbody > tr.order-total > td > strong > span`).first()).toHaveText(`${vars.Total ?? ''}`);
    if (false) {
      vars.taxPriceSmall = ((await page.locator(`.wfacp_mini_cart_reviews > tbody > tr.order-total > td > small > span`).textContent()) ?? '').trim();
    }
    // ↑ end 05 - Checkout page
    try {
      await page.locator(`.wc_payment_method.payment_method_stripe`).filter({ visible: true }).first().click({ force: true });
    } catch { /* optional step: click */ }
    await wooCommerceCheckoutTemplate(page, vars);
    try { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="number"]`).first().fill(`4242 4242 4242 4242`); } catch { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="number"]`).first().selectOption(`4242 4242 4242 4242`); }
    try { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="expiry"]`).first().fill(`12 / ${vars.year ?? ''}`); } catch { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="expiry"]`).first().selectOption(`12 / ${vars.year ?? ''}`); }
    try { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="cvc"]`).first().fill(`123`); } catch { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="cvc"]`).first().selectOption(`123`); }
    await placeOrderElement(page, vars);
    await blockUI(page, vars);
    await page.waitForLoadState('load');
    vars.upsell = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let upsell = window.location.href.includes('thank-you-page')

if (upsell) {
    upsell = "no"
} else {
    upsell = "yes"
}

return upsell }, vars);
    if (vars.upsell === "yes") {
      await upSellFlow(page, vars);
    }
    if (vars.upsell === "yes" && vars.accept === "yes") {
      vars.total = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let total = parseFloat(`${vars.total}`.replace(`${vars.Symbol}`,"").trim());
let price2 = parseFloat(`${vars.price2}`.replace(`${vars.Symbol}`,"").trim());
let price3 = parseFloat(`${vars.price3}`.replace(`${vars.Symbol}`,"").trim());

total = total+price2+price3

total = Intl.NumberFormat('en-IN', { style: 'currency', currency: `${vars.currency}`}).format(total)

return total
 }, vars);
    }
    if (vars.upsell === "yes" && vars.accept === "yes") {
      vars.taxPriceSmall = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let total = parseFloat(`${vars.total}`.replace(`${vars.Symbol}`,"").trim());
let taxPriceSmall = total - ( total / 1.2 )
taxPriceSmall = Intl.NumberFormat('en-IN', { style: 'currency', currency: `${vars.currency}`}).format(taxPriceSmall)

return taxPriceSmall
 }, vars);
    }
    vars.orderNumber = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return location.search.split('order_id=')[1].split('&')[0] }, vars);
    await expect(page.locator(`strong > .woocommerce-Price-amount.amount`).or(page.locator(`div.wfty_pro_list_cont.wfty_show_images > table > tfoot > tr:nth-child(4) > td > span`)).first()).toHaveText(`${vars.total ?? ''}`);
    await expect(page.locator(`.method > strong`).or(page.locator(`table tfoot tr:nth-of-type(3) td`)).first()).toHaveText(`Credit Card (Stripe)`);
    await expect(page.locator(`.email > strong`).or(page.locator(`.wfty_customer_info > .wfty_content > div:nth-child(1) > div.wfty_view`)).first()).toHaveText(`${vars.email ?? ''}`);
    await expect(page.locator(`tr.woocommerce-table__line-item.order_item:nth-of-type(1) > td.woocommerce-table__product-name.product-name > a`).or(page.locator(`div.wfty_pro_list_cont.wfty_show_images > div:nth-child(1) > div > div.wfty_p_name > a > span`)).first()).toHaveText(`${vars.prod_desc ?? ''}`);
    if (vars.straps2.includes(': ')) {
      vars.straps2 = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let element = `${vars.straps2}`
const regex = /:\s*([^,]*)$/;  // Matches ": " followed by any characters except comma

const match = element.match(regex);

return match[1] }, vars);
    }
    if (vars.lens2.includes(': ')) {
      vars.lens2 = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let element = `${vars.lens2}`
const regex = /:\s*([^,]*)$/;  // Matches ": " followed by any characters except comma

const match = element.match(regex);

return match[1] }, vars);
    }
    if (vars.outrigger2.includes(': ')) {
      vars.outrigger2 = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let element = `${vars.outrigger2}`
const regex = /:\s*([^,]*)$/;  // Matches ": " followed by any characters except comma

const match = element.match(regex);

return match[1] }, vars);
    }
    if (vars.frame2.includes(': ')) {
      vars.frame2 = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let element = `${vars.frame2}`
const regex = /:\s*([^,]*)$/;  // Matches ": " followed by any characters except comma

const match = element.match(regex);

return match[1] }, vars);
    }
    await expect(page.locator(`tr.woocommerce-table__line-item.order_item.component_table_item:nth-of-type(2) > td.woocommerce-table__product-name.product-name > .component-name.component_table_item_indent > .wc-item-meta > li > p`).or(page.locator(`div.wfty_pro_list_cont.wfty_show_images > div:nth-child(2) > div > div.wfty_p_name > div > ul > li > p`)).or(page.locator(`div.wfty_pro_list_cont.wfty_show_images > div:nth-child(2) > div > div.wfty_p_name`)).first()).toContainText(`${vars.straps2 ?? ''}`);
    await expect(page.locator(`tr.woocommerce-table__line-item.order_item.component_table_item:nth-of-type(3) > td.woocommerce-table__product-name.product-name > .component-name.component_table_item_indent > .wc-item-meta > li > p`).or(page.locator(`div.wfty_pro_list_cont.wfty_show_images > div:nth-child(3) > div > div.wfty_p_name > div > ul > li > p`)).or(page.locator(`div.wfty_pro_list_cont.wfty_show_images > div:nth-child(3) > div > div.wfty_p_name`)).first()).toContainText(`${vars.lens2 ?? ''}`);
    await expect(page.locator(`tr.woocommerce-table__line-item.order_item.component_table_item:nth-of-type(4) > td.woocommerce-table__product-name.product-name > .component-name.component_table_item_indent > .wc-item-meta > li > p`).or(page.locator(`div.wfty_pro_list_cont.wfty_show_images > div:nth-child(4) > div > div.wfty_p_name > div > ul > li > p`)).or(page.locator(`div.wfty_pro_list_cont.wfty_show_images > div:nth-child(4) > div > div.wfty_p_name`)).first()).toContainText(`${vars.outrigger2 ?? ''}`);
    await expect(page.locator(`tr.woocommerce-table__line-item.order_item.component_table_item:nth-of-type(5) > td.woocommerce-table__product-name.product-name > .component-name.component_table_item_indent > .wc-item-meta > li > p`).or(page.locator(`div.wfty_pro_list_cont.wfty_show_images > div:nth-child(5) > div > div.wfty_p_name > div > ul > li > p`)).or(page.locator(`div.wfty_pro_list_cont.wfty_show_images > div:nth-child(5) > div > div.wfty_p_name`)).first()).toContainText(`${vars.frame2 ?? ''}`);
    if (vars.upsell === "yes" && vars.accept === "yes") {
      await expect(page.locator(`tr.woocommerce-table__line-item.order_item:nth-of-type(6) > td.woocommerce-table__product-name.product-name > a`).first()).toHaveText(`${vars.prod_desc2 ?? ''}`);
    }
    if (vars.upsell === "yes" && vars.accept === "yes") {
      await expect(page.locator(`tr.woocommerce-table__line-item.order_item:nth-of-type(6) > td.woocommerce-table__product-name.product-name > strong.product-quantity`).first()).toContainText(`× 3`);
    }
    if (vars.upsell === "yes" && vars.accept === "yes") {
      await expect(page.locator(`tr:nth-of-type(6).woocommerce-table__line-item.order_item > td.woocommerce-table__product-total.product-total > span`).first()).toContainText(`${vars.price2 ?? ''}`);
    }
    if (vars.upsell === "yes" && vars.accept === "yes") {
      await expect(page.locator(`tr.woocommerce-table__line-item.order_item:nth-of-type(7) > td.woocommerce-table__product-name.product-name > a`).first()).toContainText(`${vars.prod_desc3 ?? ''}`);
    }
    if (vars.upsell === "yes" && vars.accept === "yes") {
      await expect(page.locator(`tr.woocommerce-table__line-item.order_item:nth-of-type(7) > td.woocommerce-table__product-name.product-name > strong.product-quantity`).first()).toContainText(`× 1`);
    }
    if (vars.upsell === "yes" && vars.accept === "yes") {
      await expect(page.locator(`tr:nth-of-type(7).woocommerce-table__line-item.order_item > td.woocommerce-table__product-total.product-total > span`).first()).toContainText(`${vars.price3 ?? ''}`);
    }
    if (vars.upsell === "yes" && vars.accept === "yes") {
      vars.subtotalPrice = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let subtotalPrice = parseFloat(`${vars.subtotalPrice}`.replace(`${vars.Symbol}`,"").trim());
let price2 = parseFloat(`${vars.price2}`.replace(`${vars.Symbol}`,"").trim());
let price3 = parseFloat(`${vars.price3}`.replace(`${vars.Symbol}`,"").trim());

subtotalPrice = subtotalPrice+price2+price3

subtotalPrice = Intl.NumberFormat('en-IN', { style: 'currency', currency: `${vars.currency}`}).format(subtotalPrice)

return subtotalPrice
 }, vars);
    }
    await expect(page.locator(`tfoot > tr:nth-of-type(1) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
    await expect(page.locator(`tfoot > tr:nth-of-type(2) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.shippingPrice ?? ''}`);
    await expect(page.locator(`tfoot > tr:nth-of-type(3) > td`).first()).toHaveText(`Credit Card (Stripe)`);
    await expect(page.locator(`tfoot > tr:nth-of-type(4) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.total ?? ''}`);
    await expect(page.locator(`tfoot > tr:nth-of-type(4) > td > small > .woocommerce-Price-amount.amount`).first()).toContainText(`${vars.taxPriceSmall ?? ''}`);
    try {
      await expect(page.locator(`tfoot > tr:nth-of-type(5) > td`).first()).toContainText(`Order Note for Testing this field`);
    } catch { /* optional step: assertTextPresent */ }
    await expect(page.locator(`.woocommerce-column.woocommerce-column--1 > address`).or(page.locator(`div.wfty-cust-details-block > div > div > div.wfty_content.wfty_clearfix.wfty_text > div:nth-child(4)`)).first()).toHaveText(`Billing address
${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.street3 ?? ''}
${vars.street2 ?? ''}
${vars.city ?? ''}
${vars.zipCode ?? ''}`);
    await expect(page.locator(`.woocommerce-column.woocommerce-column--2 > address`).or(page.locator(`div.wfty-cust-details-block > div > div > div.wfty_content.wfty_clearfix.wfty_text > div:nth-child(5)`)).first()).toHaveText(`Shipping address
${vars.firstName ?? ''} ${vars.lastName2 ?? ''}
${vars.street3 ?? ''}
${vars.street2 ?? ''}
${vars.city ?? ''}
${vars.zipCode ?? ''}`);
    try {
      await page.goto(`${vars.startUrl ?? ''}my-account/`);
      await page.waitForLoadState('load');
    } catch { /* optional step: open */ }
    try {
      await page.locator(`a[href*="/my-account/orders/"]`).filter({ visible: true }).first().click({ force: true });
    } catch { /* optional step: click */ }
    await expect(page.locator(`td.woocommerce-orders-table__cell.woocommerce-orders-table__cell-order-status`).first()).toContainText(`Processing`);
    await expect(page.locator(`td.woocommerce-orders-table__cell.woocommerce-orders-table__cell-order-total > .woocommerce-Price-amount.amount`).first()).toContainText(`${vars.total ?? ''}`);
    await page.locator(`th.woocommerce-orders-table__cell.woocommerce-orders-table__cell-order-number > a[href*="/my-account/view-order/${vars.orderNumber ?? ''}/"]`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`mark.order-status`).first()).toHaveText(`Processing`);
    await expect(page.locator(`tr.woocommerce-table__line-item.order_item:nth-of-type(1) > td.woocommerce-table__product-name.product-name > a`).first()).toHaveText(`${vars.prod_desc ?? ''}`);
    await expect(page.locator(`tr:nth-of-type(1).woocommerce-table__line-item.order_item > td.woocommerce-table__product-total > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    await expect(page.locator(`tr.woocommerce-table__line-item.order_item.component_table_item:nth-of-type(2) > td.woocommerce-table__product-name.product-name > .component-name.component_table_item_indent > .wc-item-meta > li`).or(page.locator(`section.woocommerce-order-details > table > tbody > tr:nth-child(2) > td.woocommerce-table__product-name.product-name > div > dl > dd > p`)).first()).toContainText(`${vars.straps2 ?? ''}`);
    await expect(page.locator(`tr.woocommerce-table__line-item.order_item.component_table_item:nth-of-type(3) > td.woocommerce-table__product-name.product-name > .component-name.component_table_item_indent > .wc-item-meta > li`).or(page.locator(`section.woocommerce-order-details > table > tbody > tr:nth-child(3) > td.woocommerce-table__product-name.product-name > div > dl > dd > p`)).first()).toContainText(`${vars.lens2 ?? ''}`);
    await expect(page.locator(`tr.woocommerce-table__line-item.order_item.component_table_item:nth-of-type(4) > td.woocommerce-table__product-name.product-name > .component-name.component_table_item_indent > .wc-item-meta > li`).or(page.locator(`section.woocommerce-order-details > table > tbody > tr:nth-child(4) > td.woocommerce-table__product-name.product-name > div > dl > dd > p`)).first()).toContainText(`${vars.outrigger2 ?? ''}`);
    await expect(page.locator(`tr.woocommerce-table__line-item.order_item.component_table_item:nth-of-type(5) > td.woocommerce-table__product-name.product-name > .component-name.component_table_item_indent > .wc-item-meta > li`).or(page.locator(`section.woocommerce-order-details > table > tbody > tr:nth-child(5) > td.woocommerce-table__product-name.product-name > div > dl > dd > p`)).first()).toContainText(`${vars.frame2 ?? ''}`);
    if (vars.upsell === "yes" && vars.accept === "yes") {
      await expect(page.locator(`tr.woocommerce-table__line-item.order_item:nth-of-type(6) > td.woocommerce-table__product-name.product-name > a`).first()).toHaveText(`${vars.prod_desc2 ?? ''}`);
    }
    if (vars.upsell === "yes" && vars.accept === "yes") {
      await expect(page.locator(`tr.woocommerce-table__line-item.order_item:nth-of-type(6) > td.woocommerce-table__product-name.product-name > strong.product-quantity`).first()).toContainText(`× 3`);
    }
    if (vars.upsell === "yes" && vars.accept === "yes") {
      await expect(page.locator(`tr:nth-of-type(6).woocommerce-table__line-item.order_item > td.woocommerce-table__product-total.product-total > span`).first()).toContainText(`${vars.price2 ?? ''}`);
    }
    if (vars.upsell === "yes" && vars.accept === "yes") {
      await expect(page.locator(`tr.woocommerce-table__line-item.order_item:nth-of-type(7) > td.woocommerce-table__product-name.product-name > a`).first()).toContainText(`${vars.prod_desc3 ?? ''}`);
    }
    if (vars.upsell === "yes" && vars.accept === "yes") {
      await expect(page.locator(`tr.woocommerce-table__line-item.order_item:nth-of-type(7) > td.woocommerce-table__product-name.product-name > strong.product-quantity`).first()).toContainText(`× 1`);
    }
    if (vars.upsell === "yes" && vars.accept === "yes") {
      await expect(page.locator(`tr:nth-of-type(7).woocommerce-table__line-item.order_item > td.woocommerce-table__product-total.product-total > span`).first()).toContainText(`${vars.price3 ?? ''}`);
    }
    await expect(page.locator(`tfoot > tr:nth-of-type(1) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
    await expect(page.locator(`tfoot > tr:nth-of-type(2) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.shippingPrice ?? ''}`);
    await expect(page.locator(`tfoot > tr:nth-of-type(4) > td`).first()).toHaveText(`Credit Card (Stripe)`);
    await expect(page.locator(`tfoot > tr:nth-of-type(3) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.total ?? ''}`);
    await expect(page.locator(`tfoot > tr:nth-of-type(3) > td > small > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.taxPriceSmall ?? ''}`);
    try {
      await expect(page.locator(`tfoot > tr:nth-of-type(5) > td`).first()).toHaveText(`Order Note for Testing this field`);
    } catch { /* optional step: assertText */ }
    await expect(page.locator(`.woocommerce-column.woocommerce-column--1 > address`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.street3 ?? ''}
${vars.street2 ?? ''}
${vars.city ?? ''}
${vars.zipCode ?? ''}

${vars.phone ?? ''}

${vars.email ?? ''}`);
    await expect(page.locator(`.woocommerce-column.woocommerce-column--2 > address`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName2 ?? ''}
${vars.street3 ?? ''}
${vars.street2 ?? ''}
${vars.city ?? ''}
${vars.zipCode ?? ''}

${vars.phone ?? ''}`);
    // ↑ end 01 - Place order - Upsell rejected
  });

  test('11 - Place order - Upsell rejected - Email', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    // ↓ 03 - Place order - Email
    vars.username = `${vars.email ?? ''}`;
    await extractUserFromEmail(page, vars);
    await page.locator(`xpath=//a[contains(text(), "Your Melon Optics order receipt from")]`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`tr.order_item > td.td:nth-of-type(1)`).first()).toContainText(`${vars.prodDesc ?? ''}`);
    await expect(page.locator(`tbody > tr.order_item.component_container_table_item > td:nth-child(3) > span`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    await expect(page.locator(`tbody > tr.order-totals.order-totals-subtotal > td > span`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    await expect(page.locator(`tbody > tr.order-totals.order-totals-shipping > td > span`).first()).toHaveText(`${vars.shippingPrice ?? ''}`);
    try {
      await expect(page.locator(`tbody > tr.order-totals.order-totals-payment_method.order-totals-last > td`).first()).toContainText(`Credit Card (Stripe)`);
    } catch { /* optional step: assertTextPresent */ }
    await expect(page.locator(`tbody > tr.order-totals.order-totals-total > td > span`).first()).toHaveText(`${vars.total ?? ''}`);
    await expect(page.locator(`small .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.taxPriceSmall ?? ''}`);
    await expect(page.locator(`td:nth-of-type(1) > address.address`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.street3 ?? ''}
${vars.street2 ?? ''}
${vars.city ?? ''}
${vars.zipCode ?? ''}
${vars.countryComplete ?? ''}
${vars.phone ?? ''}
${vars.email ?? ''}`);
    await expect(page.locator(`td:nth-of-type(2) > address.address`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName2 ?? ''}
${vars.street3 ?? ''}
${vars.street2 ?? ''}
${vars.city ?? ''}
${vars.zipCode ?? ''}
${vars.countryComplete ?? ''}
${vars.phone ?? ''}`);
    // ↑ end 03 - Place order - Email
  });

  test('New Product page Redesigned', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.goto(`${vars.startUrl ?? ''}shop/jester-sunglasses/`);
    await page.waitForLoadState('load');
    try {
      await page.locator(`svg.needsclick > path`).filter({ visible: true }).first().click({ force: true });
    } catch { /* optional step: click */ }
    await page.locator(`div.melon-optics-customizer-section:nth-of-type(1) > .melon-optics-customizer-pre-made-combinations-list > li.melon-best-seller-thumbnail:nth-of-type(1) > img.attachment-woocommerce_gallery_thumbnail`).filter({ visible: true }).first().click({ force: true });
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); /* --------------------------------------------------------------
   1. Your gallery images
   -------------------------------------------------------------- */
const images = Array.from<any>(document.querySelectorAll<HTMLImageElement>('.woocommerce-product-gallery__wrapper.slick-initialized .slick-slide:nth-of-type(1) .melon-optics-composite-images > span > img'));

/* --------------------------------------------------------------
   2. The attribute object (exactly as you posted)
   -------------------------------------------------------------- */
const attributes = JSON.parse(document.querySelector('div.melon-optics-customizer-section:nth-of-type(1) > .melon-optics-customizer-pre-made-combinations-list > li.melon-best-seller-thumbnail:nth-of-type(1)').getAttribute('data-combination-params'));

/* --------------------------------------------------------------
   3. Expected order (frame → lens → nose‑rubber → icon)
   -------------------------------------------------------------- */
const attrOrder = [
  attributes['pa_frame'],
  attributes['pa_lens'],
  attributes['pa_nose-rubber'],
  attributes['pa_icon']
];

/* --------------------------------------------------------------
   4. Validation function – returns boolean + failure message
   -------------------------------------------------------------- */
function areGalleryImagesCorrect() {
  // 1. Count check
  if (images.length !== attrOrder.length) {
    const msg = `Count mismatch: ${images.length} images but ${attrOrder.length} attributes expected.`;
    console.error('%c' + msg, 'color:red; font-weight:bold;');
    return false;
  }

  const failures = [];

  images.forEach((img, idx) => {
    const expected = attrOrder[idx];
    const src = (img.currentSrc || img.src || img.getAttribute('src') || '').trim();

    const ok = src && ( src.toLowerCase().includes(expected.replaceAll('-','').toLowerCase()) || src.toLowerCase().includes(expected.toLowerCase()) );

    // visual feedback
    img.style.border = ok ? '3px solid lime' : '3px solid red';
    img.title = ok
      ? `Correct: ${expected}`
      : `MISSING: "${expected}"`;

    if (!ok) {
      failures.push({
        position: idx + 1,
        expected: expected,
        actual: src || '(no src)'
      });
    }

    console.log(`[Image ${idx + 1}] ${ok ? 'PASS' : 'FAIL'} ${src}`);
  });

  // 2. If any failures → print detailed message
  if (failures.length > 0) {
    console.groupCollapsed('%cGallery validation FAILED', 'color:red; font-weight:bold;');
    console.warn('The following images do NOT contain the required slug:');
    failures.forEach(f => {
      console.warn(
        `Image ${f.position} → Expected slug: "${f.expected}"\n` +
        `Current URL: ${f.actual}`
      );
    });
    console.warn('Fix the filenames so each URL contains its attribute slug.');
    console.groupEnd();

    return false;
  }

  // 3. All good
  console.log('%cAll images are correct!', 'color:lime; font-weight:bold;');
  return true;
}

/* --------------------------------------------------------------
   5. Run it
   -------------------------------------------------------------- */
const result = areGalleryImagesCorrect();
console.log('%cFINAL RESULT → ' + result, `font-weight:bold; color:${result?'lime':'red'};`);

return result }, vars)).toBeTruthy();
  });

});
