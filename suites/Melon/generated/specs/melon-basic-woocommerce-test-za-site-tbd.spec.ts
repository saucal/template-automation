// @ts-nocheck
// Auto-generated from Ghost Inspector suite: "Melon - Basic WooCommerce Test - ZA Site (TBD)"
// Review all TODOs before running.
import dotenv from 'dotenv';
dotenv.config();
import { test, expect } from '@playwright/test';
import { blockImageSizes, blockUI, calculateSubtotal, extractUserFromEmail, placeOrderElement, uRLOfCurrentPage, wooCommerceCheckoutTemplate } from '../helpers/common-steps-for-all-projects';
import { checkCountryAndCurrency, login, register } from '../helpers/common-steps-for-melon';

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

test.describe('Melon - Basic WooCommerce Test - ZA Site (TBD)', () => {

  const vars = new Proxy<Record<string, string>>({
    "email": `qa+gi_order_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "emailReg": `qa+gi_reg_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "emailForgot": `qa+gi_forgot_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "payPalUser": "qa+gi_sb-8eg0v132169@saucal.com",
    "payPalPass": process.env.PAY_PAL_PASS ?? '',
    "adminUser": "saucal_maintenance_admin",
    "adminPass": process.env.ADMIN_PASS ?? '',
    "Symbol": "R",
    "project": "melon",
    "stateComplete": "Western Cape",
    "countryComplete": "South Africa",
    "city": "Cape Town",
    "street": "123 false street",
    "street2": "Ap. 4",
    "zipCode": "8001",
    "lastName": `${Math.random().toString(36).substring(2, 10)}`,
    "phone": "3453453454",
    "firstName": "QA",
    "street3": "123 Shipping",
    "company2": "Testing Shipping",
    "street4": "block 1",
    "company": "Testing SA",
    "lastName2": `${Math.random().toString(36).substring(2, 10)} Shipp`,
    "password": process.env.PASSWORD ?? '',
    "url": "https://melonoptics-stg.cc02.convesio.saucal.io/za/",
    "currency": "ZAR",
    "password2": process.env.PASSWORD2 ?? '',
    "country": "ZA",
    "state": "WC",
  }, { get: (o: Record<string, string>, k: string) => (k in o ? o[k] : '') });

  test('01 - Home Page', async ({ page }) => {
    await page.goto(`/za/`);
    await page.waitForLoadState('load');

    await page.waitForLoadState('load');
    await uRLOfCurrentPage(page, vars);
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let url = `${vars.site}`
return url === `${vars.startUrl}` }, vars)).toBeTruthy();
    await checkCountryAndCurrency(page, vars);
  });

  test('02 - Accessories Page', async ({ page }) => {
    await page.goto(`/za/`);
    await page.waitForLoadState('load');

    await page.waitForLoadState('load');
    await page.locator(`li.mega-menu-item.mega-menu-item-type-custom.mega-menu-item-object-custom.mega-menu-item-has-children.mega-menu-megamenu.mega-align-bottom-left:nth-of-type(4) > a[href="#"].mega-menu-link`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`li.mega-menu-item.mega-menu-item-type-taxonomy.mega-menu-item-object-product_cat:nth-of-type(1) > a[href*="/product-category/accessories/"].mega-menu-link`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
  });

  test('02 - Bike Menu', async ({ page }) => {
    await page.goto(`/za/`);
    await page.waitForLoadState('load');

    await page.waitForLoadState('load');
    await page.locator(`li.mega-menu-item.mega-menu-item-type-custom.mega-menu-item-object-custom.mega-menu-item-has-children.mega-menu-megamenu.mega-align-bottom-left:nth-of-type(1) > a[href="#"].mega-menu-link`).filter({ visible: true }).first().click({ force: true });
  });

  test('03 - Product page', async ({ page }) => {
    await page.goto(`/za/`);
    await page.waitForLoadState('load');

    // ↓ 02 - Bike Menu
    await page.waitForLoadState('load');
    await page.locator(`li.mega-menu-item.mega-menu-item-type-custom.mega-menu-item-object-custom.mega-menu-item-has-children.mega-menu-megamenu.mega-align-bottom-left:nth-of-type(1) > a[href="#"].mega-menu-link`).filter({ visible: true }).first().click({ force: true });
    // ↑ end 02 - Bike Menu
    await page.locator(`ul.mega-sub-menu > li:nth-of-type(2) > a[href*="/shop/diablo-mtb-goggles/"]`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    try {
      await page.locator(`svg.needsclick`).filter({ visible: true }).first().click({ force: true });
    } catch { /* optional step: click */ }
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
      vars.unitPrice = ((await page.locator(`div.composite_price > p.price > span.woocommerce-Price-amount.amount`).textContent()) ?? '').trim();
    }
    await blockImageSizes(page, vars);
  });

  test('04 - Cart Page', async ({ page }) => {
    await page.goto(`/za/`);
    await page.waitForLoadState('load');

    // ↓ 03 - Product page
    // ↓ 02 - Bike Menu
    await page.waitForLoadState('load');
    await page.locator(`li.mega-menu-item.mega-menu-item-type-custom.mega-menu-item-object-custom.mega-menu-item-has-children.mega-menu-megamenu.mega-align-bottom-left:nth-of-type(1) > a[href="#"].mega-menu-link`).filter({ visible: true }).first().click({ force: true });
    // ↑ end 02 - Bike Menu
    await page.locator(`ul.mega-sub-menu > li:nth-of-type(2) > a[href*="/shop/diablo-mtb-goggles/"]`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    try {
      await page.locator(`svg.needsclick`).filter({ visible: true }).first().click({ force: true });
    } catch { /* optional step: click */ }
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
      vars.unitPrice = ((await page.locator(`div.composite_price > p.price > span.woocommerce-Price-amount.amount`).textContent()) ?? '').trim();
    }
    await blockImageSizes(page, vars);
    // ↑ end 03 - Product page
    await page.locator(`button[name="add-to-cart"]`).filter({ visible: true }).first().click({ force: true });
    vars.straps2 = ((await page.locator(`tr.woocommerce-cart-form__cart-item.cart_item.component_table_item:nth-of-type(2) > td.product-name > .component-name.component_table_item_indent > dl.component`).or(page.locator(`#fkcart-modal > div > div.fkcart-preview-ui > div.fkcart-slider-body > div.fkcart-item-wrap.fkcart-pt-16 > div:nth-child(2) > div.fkcart-item-info > div.fkcart-item-meta > div:nth-child(3) > span > span.fkcart-attr-value`)).textContent()) ?? '').trim();
    vars.lens2 = ((await page.locator(`tr.woocommerce-cart-form__cart-item.cart_item.component_table_item:nth-of-type(3) > td.product-name > .component-name.component_table_item_indent > dl.component`).or(page.locator(`#fkcart-modal > div > div.fkcart-preview-ui > div.fkcart-slider-body > div.fkcart-item-wrap.fkcart-pt-16 > div:nth-child(3) > div.fkcart-item-info > div.fkcart-item-meta > div:nth-child(3) > span > span.fkcart-attr-value`)).textContent()) ?? '').trim();
    vars.outrigger2 = ((await page.locator(`tr.woocommerce-cart-form__cart-item.cart_item.component_table_item:nth-of-type(4) > td.product-name > .component-name.component_table_item_indent > dl.component`).or(page.locator(`#fkcart-modal > div > div.fkcart-preview-ui > div.fkcart-slider-body > div.fkcart-item-wrap.fkcart-pt-16 > div:nth-child(4) > div.fkcart-item-info > div.fkcart-item-meta > div:nth-child(3) > span > span.fkcart-attr-value`)).textContent()) ?? '').trim();
    vars.frame2 = ((await page.locator(`tr.woocommerce-cart-form__cart-item.cart_item.component_table_item:nth-of-type(5) > td.product-name > .component-name.component_table_item_indent > dl.component`).or(page.locator(`#fkcart-modal > div > div.fkcart-preview-ui > div.fkcart-slider-body > div.fkcart-item-wrap.fkcart-pt-16 > div:nth-child(5) > div.fkcart-item-info > div.fkcart-item-meta > div:nth-child(3) > span > span.fkcart-attr-value`)).textContent()) ?? '').trim();
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let attributes = [`${vars.straps}`,
`${vars.straps2}`,`${vars.lens}`,`${vars.lens2}`,
`${vars.outrigger2}`,`${vars.outrigger}`,
`${vars.frame2}`,`${vars.frame}`]

for (let i = 0; i < attributes.length; i++) {
    //attributes[i] = attributes[i].replace(/(?:\s)/g,"");
    let aux = attributes[i].split(':')
    attributes[i] = aux.length > 1 ? aux[1].trim() : aux[0].trim();
}

return attributes[0] === attributes[1] && attributes[2] === attributes[3] 
&& attributes[4] === attributes[5]
&& attributes[6] === attributes[7]
 }, vars)).toBeTruthy();
    try {
      if ((() => { let project = vars.project
return project !== "melon" })()) {
        vars.extras = ((await page.locator(`td.product-name.last-composited-extra-padding > .component-name.component_table_item_indent > dl.component`).textContent()) ?? '').trim();
      }
    } catch { /* optional step: extract */ }
    try {
      await expect(page.locator(`td.product-price > span.woocommerce-Price-amount.amount`).or(page.locator(`#fkcart-modal > div > div.fkcart-preview-ui > div.fkcart-slider-body > div.fkcart-item-wrap.fkcart-pt-16 > div:nth-child(1) > div.fkcart-item-misc > div > span`)).first()).toContainText(`${vars.unitPrice ?? ''}`);
    } catch { /* optional step: assertTextPresent */ }
    vars.qty = ((await page.locator(`input.fkcart-quantity__input`).textContent()) ?? '').trim();
    await calculateSubtotal(page, vars);
    try {
      if ((() => { let project = vars.project
return project !== "melon" })()) {
        await expect(page.locator(`td.product-subtotal > span.woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
      }
    } catch { /* optional step: assertText */ }
    try {
      await expect(page.locator(`tr.cart-subtotal > td > span.woocommerce-Price-amount.amount`).or(page.locator(`#fkcart-modal > div > div.fkcart-preview-ui > div.fkcart-slider-footer.fkcart-pb-16 > div.fkcart-order-summary.fkcart-panel.fkcart-pt-16 > div > div.fkcart-summary-line-item.fkcart-subtotal-wrap > div.fkcart-summary-amount > strong > span`)).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
    } catch { /* optional step: assertText */ }
    try {
      if ((() => { let project = vars.project
return project !== "melon" })()) {
        vars.shippingPrice = ((await page.locator(`ul#shipping_method > li:first-child > label > span.woocommerce-Price-amount.amount`).textContent()) ?? '').trim();
      }
    } catch { /* optional step: extract */ }
    vars.total = ((await page.locator(`#fkcart-modal > div > div.fkcart-preview-ui > div.fkcart-slider-footer.fkcart-pb-16 > div.fkcart-order-summary.fkcart-panel.fkcart-pt-16 > div > div.fkcart-summary-line-item.fkcart-subtotal-wrap > div.fkcart-summary-amount > strong > span`).textContent()) ?? '').trim();
    try {
      if ((() => { let project = vars.project
return project !== "melon" })()) {
        vars.taxPriceSmall = ((await page.locator(`small.includes_tax > span.woocommerce-Price-amount.amount`).textContent()) ?? '').trim();
      }
    } catch { /* optional step: extract */ }
  });

  test('05 - Checkout page', async ({ page }) => {
    await page.goto(`/za/`);
    await page.waitForLoadState('load');

    // ↓ 04 - Cart Page
    // ↓ 03 - Product page
    // ↓ 02 - Bike Menu
    await page.waitForLoadState('load');
    await page.locator(`li.mega-menu-item.mega-menu-item-type-custom.mega-menu-item-object-custom.mega-menu-item-has-children.mega-menu-megamenu.mega-align-bottom-left:nth-of-type(1) > a[href="#"].mega-menu-link`).filter({ visible: true }).first().click({ force: true });
    // ↑ end 02 - Bike Menu
    await page.locator(`ul.mega-sub-menu > li:nth-of-type(2) > a[href*="/shop/diablo-mtb-goggles/"]`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    try {
      await page.locator(`svg.needsclick`).filter({ visible: true }).first().click({ force: true });
    } catch { /* optional step: click */ }
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
      vars.unitPrice = ((await page.locator(`div.composite_price > p.price > span.woocommerce-Price-amount.amount`).textContent()) ?? '').trim();
    }
    await blockImageSizes(page, vars);
    // ↑ end 03 - Product page
    await page.locator(`button[name="add-to-cart"]`).filter({ visible: true }).first().click({ force: true });
    vars.straps2 = ((await page.locator(`tr.woocommerce-cart-form__cart-item.cart_item.component_table_item:nth-of-type(2) > td.product-name > .component-name.component_table_item_indent > dl.component`).or(page.locator(`#fkcart-modal > div > div.fkcart-preview-ui > div.fkcart-slider-body > div.fkcart-item-wrap.fkcart-pt-16 > div:nth-child(2) > div.fkcart-item-info > div.fkcart-item-meta > div:nth-child(3) > span > span.fkcart-attr-value`)).textContent()) ?? '').trim();
    vars.lens2 = ((await page.locator(`tr.woocommerce-cart-form__cart-item.cart_item.component_table_item:nth-of-type(3) > td.product-name > .component-name.component_table_item_indent > dl.component`).or(page.locator(`#fkcart-modal > div > div.fkcart-preview-ui > div.fkcart-slider-body > div.fkcart-item-wrap.fkcart-pt-16 > div:nth-child(3) > div.fkcart-item-info > div.fkcart-item-meta > div:nth-child(3) > span > span.fkcart-attr-value`)).textContent()) ?? '').trim();
    vars.outrigger2 = ((await page.locator(`tr.woocommerce-cart-form__cart-item.cart_item.component_table_item:nth-of-type(4) > td.product-name > .component-name.component_table_item_indent > dl.component`).or(page.locator(`#fkcart-modal > div > div.fkcart-preview-ui > div.fkcart-slider-body > div.fkcart-item-wrap.fkcart-pt-16 > div:nth-child(4) > div.fkcart-item-info > div.fkcart-item-meta > div:nth-child(3) > span > span.fkcart-attr-value`)).textContent()) ?? '').trim();
    vars.frame2 = ((await page.locator(`tr.woocommerce-cart-form__cart-item.cart_item.component_table_item:nth-of-type(5) > td.product-name > .component-name.component_table_item_indent > dl.component`).or(page.locator(`#fkcart-modal > div > div.fkcart-preview-ui > div.fkcart-slider-body > div.fkcart-item-wrap.fkcart-pt-16 > div:nth-child(5) > div.fkcart-item-info > div.fkcart-item-meta > div:nth-child(3) > span > span.fkcart-attr-value`)).textContent()) ?? '').trim();
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let attributes = [`${vars.straps}`,
`${vars.straps2}`,`${vars.lens}`,`${vars.lens2}`,
`${vars.outrigger2}`,`${vars.outrigger}`,
`${vars.frame2}`,`${vars.frame}`]

for (let i = 0; i < attributes.length; i++) {
    //attributes[i] = attributes[i].replace(/(?:\s)/g,"");
    let aux = attributes[i].split(':')
    attributes[i] = aux.length > 1 ? aux[1].trim() : aux[0].trim();
}

return attributes[0] === attributes[1] && attributes[2] === attributes[3] 
&& attributes[4] === attributes[5]
&& attributes[6] === attributes[7]
 }, vars)).toBeTruthy();
    try {
      if ((() => { let project = vars.project
return project !== "melon" })()) {
        vars.extras = ((await page.locator(`td.product-name.last-composited-extra-padding > .component-name.component_table_item_indent > dl.component`).textContent()) ?? '').trim();
      }
    } catch { /* optional step: extract */ }
    try {
      await expect(page.locator(`td.product-price > span.woocommerce-Price-amount.amount`).or(page.locator(`#fkcart-modal > div > div.fkcart-preview-ui > div.fkcart-slider-body > div.fkcart-item-wrap.fkcart-pt-16 > div:nth-child(1) > div.fkcart-item-misc > div > span`)).first()).toContainText(`${vars.unitPrice ?? ''}`);
    } catch { /* optional step: assertTextPresent */ }
    vars.qty = ((await page.locator(`input.fkcart-quantity__input`).textContent()) ?? '').trim();
    await calculateSubtotal(page, vars);
    try {
      if ((() => { let project = vars.project
return project !== "melon" })()) {
        await expect(page.locator(`td.product-subtotal > span.woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
      }
    } catch { /* optional step: assertText */ }
    try {
      await expect(page.locator(`tr.cart-subtotal > td > span.woocommerce-Price-amount.amount`).or(page.locator(`#fkcart-modal > div > div.fkcart-preview-ui > div.fkcart-slider-footer.fkcart-pb-16 > div.fkcart-order-summary.fkcart-panel.fkcart-pt-16 > div > div.fkcart-summary-line-item.fkcart-subtotal-wrap > div.fkcart-summary-amount > strong > span`)).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
    } catch { /* optional step: assertText */ }
    try {
      if ((() => { let project = vars.project
return project !== "melon" })()) {
        vars.shippingPrice = ((await page.locator(`ul#shipping_method > li:first-child > label > span.woocommerce-Price-amount.amount`).textContent()) ?? '').trim();
      }
    } catch { /* optional step: extract */ }
    vars.total = ((await page.locator(`#fkcart-modal > div > div.fkcart-preview-ui > div.fkcart-slider-footer.fkcart-pb-16 > div.fkcart-order-summary.fkcart-panel.fkcart-pt-16 > div > div.fkcart-summary-line-item.fkcart-subtotal-wrap > div.fkcart-summary-amount > strong > span`).textContent()) ?? '').trim();
    try {
      if ((() => { let project = vars.project
return project !== "melon" })()) {
        vars.taxPriceSmall = ((await page.locator(`small.includes_tax > span.woocommerce-Price-amount.amount`).textContent()) ?? '').trim();
      }
    } catch { /* optional step: extract */ }
    // ↑ end 04 - Cart Page
    {
      const _lbl = page.locator(`label[for="fkcart-checkout-button"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`a[href*="/checkout/"].checkout-button`).or(page.locator(`#fkcart-checkout-button`)).filter({ visible: true }).first().click({ force: true }); }
    }
    await expect(page.locator(`tr.cart_item.component_container_table_item > td.product-name`).or(page.locator(`#wfacp_mini_cart_items_e081fbde > table > tbody > tr.cart_item.component_container_table_item.wfacp_delete_active > td.product-name-area > div.product-name.wfacp_summary_img_true > div.wfacp_cart_title_sec > span`)).first()).toContainText(`${vars.prod_desc ?? ''}`);
    await expect(page.locator(`#wfacp_mini_cart_reviews_e081fbde > tbody > tr.cart-subtotal > td > span > bdi`).first()).toContainText(`${vars.subtotalPrice ?? ''}`);
    try {
      await expect(page.locator(`#wfacp_mini_cart_reviews_e081fbde > tbody > tr.cart-subtotal > td > span`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
    } catch { /* optional step: assertText */ }
    try {
      await expect(page.locator(`#wfacp_mini_cart_reviews_e081fbde > tbody > tr.shipping_total_fee > td:nth-child(2) > span > span`).first()).toHaveText(`${vars.shippingPrice ?? ''}`);
    } catch { /* optional step: assertText */ }
    try {
      await expect(page.locator(`#wfacp_mini_cart_reviews_e081fbde > tbody > tr.order-total > td > strong > span`).first()).toHaveText(`${vars.subtotalPrice ?? ''} + ${vars.shippingPrice ?? ''}`);
    } catch { /* optional step: assertText */ }
    try {
      await expect(page.locator(`small.includes_tax > span.woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.taxPriceSmall ?? ''}`);
    } catch { /* optional step: assertText */ }
  });

  test('06 - Place order - No Upsell', async ({ page }) => {
    await page.goto(`/za/`);
    await page.waitForLoadState('load');

    // ↓ 05 - Checkout page
    // ↓ 04 - Cart Page
    // ↓ 03 - Product page
    // ↓ 02 - Bike Menu
    await page.waitForLoadState('load');
    await page.locator(`li.mega-menu-item.mega-menu-item-type-custom.mega-menu-item-object-custom.mega-menu-item-has-children.mega-menu-megamenu.mega-align-bottom-left:nth-of-type(1) > a[href="#"].mega-menu-link`).filter({ visible: true }).first().click({ force: true });
    // ↑ end 02 - Bike Menu
    await page.locator(`ul.mega-sub-menu > li:nth-of-type(2) > a[href*="/shop/diablo-mtb-goggles/"]`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    try {
      await page.locator(`svg.needsclick`).filter({ visible: true }).first().click({ force: true });
    } catch { /* optional step: click */ }
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
      vars.unitPrice = ((await page.locator(`div.composite_price > p.price > span.woocommerce-Price-amount.amount`).textContent()) ?? '').trim();
    }
    await blockImageSizes(page, vars);
    // ↑ end 03 - Product page
    await page.locator(`button[name="add-to-cart"]`).filter({ visible: true }).first().click({ force: true });
    vars.straps2 = ((await page.locator(`tr.woocommerce-cart-form__cart-item.cart_item.component_table_item:nth-of-type(2) > td.product-name > .component-name.component_table_item_indent > dl.component`).or(page.locator(`#fkcart-modal > div > div.fkcart-preview-ui > div.fkcart-slider-body > div.fkcart-item-wrap.fkcart-pt-16 > div:nth-child(2) > div.fkcart-item-info > div.fkcart-item-meta > div:nth-child(3) > span > span.fkcart-attr-value`)).textContent()) ?? '').trim();
    vars.lens2 = ((await page.locator(`tr.woocommerce-cart-form__cart-item.cart_item.component_table_item:nth-of-type(3) > td.product-name > .component-name.component_table_item_indent > dl.component`).or(page.locator(`#fkcart-modal > div > div.fkcart-preview-ui > div.fkcart-slider-body > div.fkcart-item-wrap.fkcart-pt-16 > div:nth-child(3) > div.fkcart-item-info > div.fkcart-item-meta > div:nth-child(3) > span > span.fkcart-attr-value`)).textContent()) ?? '').trim();
    vars.outrigger2 = ((await page.locator(`tr.woocommerce-cart-form__cart-item.cart_item.component_table_item:nth-of-type(4) > td.product-name > .component-name.component_table_item_indent > dl.component`).or(page.locator(`#fkcart-modal > div > div.fkcart-preview-ui > div.fkcart-slider-body > div.fkcart-item-wrap.fkcart-pt-16 > div:nth-child(4) > div.fkcart-item-info > div.fkcart-item-meta > div:nth-child(3) > span > span.fkcart-attr-value`)).textContent()) ?? '').trim();
    vars.frame2 = ((await page.locator(`tr.woocommerce-cart-form__cart-item.cart_item.component_table_item:nth-of-type(5) > td.product-name > .component-name.component_table_item_indent > dl.component`).or(page.locator(`#fkcart-modal > div > div.fkcart-preview-ui > div.fkcart-slider-body > div.fkcart-item-wrap.fkcart-pt-16 > div:nth-child(5) > div.fkcart-item-info > div.fkcart-item-meta > div:nth-child(3) > span > span.fkcart-attr-value`)).textContent()) ?? '').trim();
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let attributes = [`${vars.straps}`,
`${vars.straps2}`,`${vars.lens}`,`${vars.lens2}`,
`${vars.outrigger2}`,`${vars.outrigger}`,
`${vars.frame2}`,`${vars.frame}`]

for (let i = 0; i < attributes.length; i++) {
    //attributes[i] = attributes[i].replace(/(?:\s)/g,"");
    let aux = attributes[i].split(':')
    attributes[i] = aux.length > 1 ? aux[1].trim() : aux[0].trim();
}

return attributes[0] === attributes[1] && attributes[2] === attributes[3] 
&& attributes[4] === attributes[5]
&& attributes[6] === attributes[7]
 }, vars)).toBeTruthy();
    try {
      if ((() => { let project = vars.project
return project !== "melon" })()) {
        vars.extras = ((await page.locator(`td.product-name.last-composited-extra-padding > .component-name.component_table_item_indent > dl.component`).textContent()) ?? '').trim();
      }
    } catch { /* optional step: extract */ }
    try {
      await expect(page.locator(`td.product-price > span.woocommerce-Price-amount.amount`).or(page.locator(`#fkcart-modal > div > div.fkcart-preview-ui > div.fkcart-slider-body > div.fkcart-item-wrap.fkcart-pt-16 > div:nth-child(1) > div.fkcart-item-misc > div > span`)).first()).toContainText(`${vars.unitPrice ?? ''}`);
    } catch { /* optional step: assertTextPresent */ }
    vars.qty = ((await page.locator(`input.fkcart-quantity__input`).textContent()) ?? '').trim();
    await calculateSubtotal(page, vars);
    try {
      if ((() => { let project = vars.project
return project !== "melon" })()) {
        await expect(page.locator(`td.product-subtotal > span.woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
      }
    } catch { /* optional step: assertText */ }
    try {
      await expect(page.locator(`tr.cart-subtotal > td > span.woocommerce-Price-amount.amount`).or(page.locator(`#fkcart-modal > div > div.fkcart-preview-ui > div.fkcart-slider-footer.fkcart-pb-16 > div.fkcart-order-summary.fkcart-panel.fkcart-pt-16 > div > div.fkcart-summary-line-item.fkcart-subtotal-wrap > div.fkcart-summary-amount > strong > span`)).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
    } catch { /* optional step: assertText */ }
    try {
      if ((() => { let project = vars.project
return project !== "melon" })()) {
        vars.shippingPrice = ((await page.locator(`ul#shipping_method > li:first-child > label > span.woocommerce-Price-amount.amount`).textContent()) ?? '').trim();
      }
    } catch { /* optional step: extract */ }
    vars.total = ((await page.locator(`#fkcart-modal > div > div.fkcart-preview-ui > div.fkcart-slider-footer.fkcart-pb-16 > div.fkcart-order-summary.fkcart-panel.fkcart-pt-16 > div > div.fkcart-summary-line-item.fkcart-subtotal-wrap > div.fkcart-summary-amount > strong > span`).textContent()) ?? '').trim();
    try {
      if ((() => { let project = vars.project
return project !== "melon" })()) {
        vars.taxPriceSmall = ((await page.locator(`small.includes_tax > span.woocommerce-Price-amount.amount`).textContent()) ?? '').trim();
      }
    } catch { /* optional step: extract */ }
    // ↑ end 04 - Cart Page
    {
      const _lbl = page.locator(`label[for="fkcart-checkout-button"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`a[href*="/checkout/"].checkout-button`).or(page.locator(`#fkcart-checkout-button`)).filter({ visible: true }).first().click({ force: true }); }
    }
    await expect(page.locator(`tr.cart_item.component_container_table_item > td.product-name`).or(page.locator(`#wfacp_mini_cart_items_e081fbde > table > tbody > tr.cart_item.component_container_table_item.wfacp_delete_active > td.product-name-area > div.product-name.wfacp_summary_img_true > div.wfacp_cart_title_sec > span`)).first()).toContainText(`${vars.prod_desc ?? ''}`);
    await expect(page.locator(`#wfacp_mini_cart_reviews_e081fbde > tbody > tr.cart-subtotal > td > span > bdi`).first()).toContainText(`${vars.subtotalPrice ?? ''}`);
    try {
      await expect(page.locator(`#wfacp_mini_cart_reviews_e081fbde > tbody > tr.cart-subtotal > td > span`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
    } catch { /* optional step: assertText */ }
    try {
      await expect(page.locator(`#wfacp_mini_cart_reviews_e081fbde > tbody > tr.shipping_total_fee > td:nth-child(2) > span > span`).first()).toHaveText(`${vars.shippingPrice ?? ''}`);
    } catch { /* optional step: assertText */ }
    try {
      await expect(page.locator(`#wfacp_mini_cart_reviews_e081fbde > tbody > tr.order-total > td > strong > span`).first()).toHaveText(`${vars.subtotalPrice ?? ''} + ${vars.shippingPrice ?? ''}`);
    } catch { /* optional step: assertText */ }
    try {
      await expect(page.locator(`small.includes_tax > span.woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.taxPriceSmall ?? ''}`);
    } catch { /* optional step: assertText */ }
    // ↑ end 05 - Checkout page
    await placeOrderElement(page, vars);
    try {
      if ((() => { let project = vars.project
return project !== "melon" })()) {
        await page.locator(`.wc_payment_method.payment_method_stripe`).filter({ visible: true }).first().click({ force: true });
      }
    } catch { /* optional step: click */ }
    try { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="number"]`).first().fill(`4242 4242 4242 4242`); } catch { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="number"]`).first().selectOption(`4242 4242 4242 4242`); }
    vars.year = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const nextYear = (new Date().getFullYear() + 1) % 100;

return nextYear }, vars);
    try { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="expiry"]`).first().fill(`12 / ${vars.year ?? ''}`); } catch { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="expiry"]`).first().selectOption(`12 / ${vars.year ?? ''}`); }
    try { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="cvc"]`).first().fill(`123`); } catch { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="cvc"]`).first().selectOption(`123`); }
    await placeOrderElement(page, vars);
    await expect(page.locator(`.wc-block-components-notice-banner__content ul > li:nth-of-type(1)`).or(page.locator(`.woocommerce-error > li:nth-of-type(1)`)).first()).toHaveText(`Billing First name is a required field.`);
    await expect(page.locator(`.wc-block-components-notice-banner__content ul > li:nth-of-type(2)`).or(page.locator(`.woocommerce-error > li:nth-of-type(2)`)).first()).toHaveText(`Billing Last name is a required field.`);
    await expect(page.locator(`.wc-block-components-notice-banner__content ul > li:nth-of-type(3)`).or(page.locator(`.woocommerce-error > li:nth-of-type(4)`)).first()).toHaveText(`Shipping Street address is a required field.`);
    await expect(page.locator(`.wc-block-components-notice-banner__content ul > li:nth-of-type(4)`).or(page.locator(`.woocommerce-error > li:nth-of-type(7)`)).first()).toHaveText(`Shipping Postcode is a required field.`);
    await expect(page.locator(`.wc-block-components-notice-banner__content ul > li:nth-of-type(5)`).or(page.locator(`.woocommerce-error > li:nth-of-type(5)`)).first()).toHaveText(`Shipping Town / City is a required field.`);
    await expect(page.locator(`.wc-block-components-notice-banner__content ul > li:nth-of-type(6)`).or(page.locator(`.woocommerce-error > li:nth-of-type(6)`)).first()).toHaveText(`Shipping Province is a required field.`);
    try {
      if ((() => { let project = vars.project
return project !== "melon" })()) {
        await expect(page.locator(`.wc-block-components-notice-banner__content ul > li:nth-of-type(7)`).or(page.locator(`.woocommerce-error > li:nth-of-type(8)`)).first()).toHaveText(`Billing Phone is a required field.`);
      }
    } catch { /* optional step: assertText */ }
    await expect(page.locator(`.wc-block-components-notice-banner__content ul > li:nth-of-type(8)`).or(page.locator(`.woocommerce-error > li:nth-of-type(3)`)).first()).toHaveText(`Billing Email is a required field.`);
    await wooCommerceCheckoutTemplate(page, vars);
    try { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="number"]`).first().fill(`4242 4242 4242 4242`); } catch { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="number"]`).first().selectOption(`4242 4242 4242 4242`); }
    try { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="expiry"]`).first().fill(`12 / 24`); } catch { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="expiry"]`).first().selectOption(`12 / 24`); }
    try { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="cvc"]`).first().fill(`123`); } catch { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="cvc"]`).first().selectOption(`123`); }
    await placeOrderElement(page, vars);
    await blockUI(page, vars);
    await page.waitForLoadState('load');
    vars.orderNumber = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return location.search.split('order_id=')[1].split('&')[0] }, vars);
    await expect(page.locator(`div.wfty_pro_list_cont.wfty_show_images > table > tfoot > tr:nth-child(4) > td > span`).first()).toHaveText(`${vars.total ?? ''}`);
    await expect(page.locator(`table tfoot tr:nth-of-type(3) td`).first()).toHaveText(`Credit Card (Stripe)`);
    await expect(page.locator(`.email > strong`).or(page.locator(`.wfty_customer_info > .wfty_content > div:nth-child(1) > div.wfty_view`)).first()).toHaveText(`${vars.email ?? ''}`);
    await expect(page.locator(`td.woocommerce-table__product-name.product-name > a`).or(page.locator(`div.wfty_pro_list_cont.wfty_show_images > div:nth-child(1) > div > div.wfty_p_name > a > span`)).first()).toHaveText(`${vars.prod_desc ?? ''}`);
    vars.straps = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let element = `${vars.straps}`;
const regex = /:\s*([^,]*)$/;  // Matches ": " followed by any characters except comma

const match = element.match(regex);

return match[1] }, vars);
    vars.lens = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let element = `${vars.lens}`;
const regex = /:\s*([^,]*)$/;  // Matches ": " followed by any characters except comma

const match = element.match(regex);

return match[1] }, vars);
    vars.outrigger = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let element = `${vars.outrigger}`;
const regex = /:\s*([^,]*)$/;  // Matches ": " followed by any characters except comma

const match = element.match(regex);

return match[1] }, vars);
    vars.frame = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let element = `${vars.frame}`;
const regex = /:\s*([^,]*)$/;  // Matches ": " followed by any characters except comma

const match = element.match(regex);

return match[1] }, vars);
    await expect(page.locator(`tr.woocommerce-table__line-item.order_item.component_table_item:nth-of-type(2) > td.woocommerce-table__product-name.product-name > .component-name.component_table_item_indent > .wc-item-meta > li > p`).or(page.locator(`div.wfty_pro_list_cont.wfty_show_images > div:nth-child(2) > div > div.wfty_p_name > div > ul > li > p`)).first()).toHaveText(`${vars.straps ?? ''}`);
    await expect(page.locator(`tr.woocommerce-table__line-item.order_item.component_table_item:nth-of-type(3) > td.woocommerce-table__product-name.product-name > .component-name.component_table_item_indent > .wc-item-meta > li > p`).or(page.locator(`div.wfty_pro_list_cont.wfty_show_images > div:nth-child(3) > div > div.wfty_p_name > div > ul > li > p`)).first()).toHaveText(`${vars.lens ?? ''}`);
    await expect(page.locator(`tr.woocommerce-table__line-item.order_item.component_table_item:nth-of-type(4) > td.woocommerce-table__product-name.product-name > .component-name.component_table_item_indent > .wc-item-meta > li > p`).or(page.locator(`div.wfty_pro_list_cont.wfty_show_images > div:nth-child(4) > div > div.wfty_p_name > div > ul > li > p`)).first()).toHaveText(`${vars.outrigger ?? ''}`);
    await expect(page.locator(`tr.woocommerce-table__line-item.order_item.component_table_item:nth-of-type(5) > td.woocommerce-table__product-name.product-name > .component-name.component_table_item_indent > .wc-item-meta > li > p`).or(page.locator(`div.wfty_pro_list_cont.wfty_show_images > div:nth-child(5) > div > div.wfty_p_name > div > ul > li > p`)).first()).toHaveText(`${vars.frame ?? ''}`);
    await expect(page.locator(`tfoot > tr:nth-of-type(1) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
    await expect(page.locator(`tfoot > tr:nth-of-type(2) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.shippingPrice ?? ''}`);
    await expect(page.locator(`tfoot > tr:nth-of-type(3) > td`).first()).toHaveText(`Credit Card (Stripe)`);
    await expect(page.locator(`tfoot > tr:nth-of-type(4) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.total ?? ''}`);
    if ((() => { let project = vars.project
return project !== "melon" })()) {
      await expect(page.locator(`tfoot > tr:nth-of-type(4) > td > small > .woocommerce-Price-amount.amount`).first()).toContainText(`${vars.taxPriceSmall ?? ''}`);
    }
    try {
      await expect(page.locator(`tfoot > tr:nth-of-type(5) > td`).first()).toContainText(`Order Note for Testing this field`);
    } catch { /* optional step: assertTextPresent */ }
    await expect(page.locator(`.woocommerce-column.woocommerce-column--1 > address`).or(page.locator(`div.wfty-cust-details-block > div > div > div.wfty_content.wfty_clearfix.wfty_text > div:nth-child(4)`)).first()).toContainText(`Billing address
${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.street3 ?? ''}
${vars.street2 ?? ''}
${vars.zipCode ?? ''}
${vars.city ?? ''}
${vars.stateComplete ?? ''}
${vars.countryComplete ?? ''}`);
    try {
      await expect(page.locator(`.woocommerce-column.woocommerce-column--2 > address`).or(page.locator(`div.wfty-cust-details-block > div > div > div.wfty_content.wfty_clearfix.wfty_text > div:nth-child(5)`)).first()).toContainText(`Shipping address
${vars.firstName ?? ''} ${vars.lastName2 ?? ''}
${vars.street3 ?? ''}
${vars.street2 ?? ''}
${vars.zipCode ?? ''}
${vars.city ?? ''}
${vars.stateComplete ?? ''}
${vars.countryComplete ?? ''}`);
    } catch { /* optional step: assertTextPresent */ }
    await page.goto(`${vars.url ?? ''}my-account/`);
    await page.waitForLoadState('load');
    await page.locator(`a[href*="/my-account/orders/"]`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`td.woocommerce-orders-table__cell.woocommerce-orders-table__cell-order-status`).first()).toContainText(`Processing`);
    await expect(page.locator(`td.woocommerce-orders-table__cell.woocommerce-orders-table__cell-order-total > .woocommerce-Price-amount.amount`).first()).toContainText(`${vars.total ?? ''}`);
    await page.locator(`th.woocommerce-orders-table__cell.woocommerce-orders-table__cell-order-number > a[href*="/my-account/view-order/${vars.orderNumber ?? ''}/"]`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`mark.order-status`).first()).toHaveText(`Processing`);
    await expect(page.locator(`td.woocommerce-table__product-name.product-name > a`).first()).toHaveText(`${vars.prod_desc ?? ''}`);
    await expect(page.locator(`td.woocommerce-table__product-total > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    await expect(page.locator(`tr.woocommerce-table__line-item.order_item.component_table_item:nth-of-type(2) > td.woocommerce-table__product-name.product-name > .component-name.component_table_item_indent > .wc-item-meta > li`).first()).toContainText(`${vars.straps ?? ''}`);
    await expect(page.locator(`tr.woocommerce-table__line-item.order_item.component_table_item:nth-of-type(3) > td.woocommerce-table__product-name.product-name > .component-name.component_table_item_indent > .wc-item-meta > li`).first()).toContainText(`${vars.lens ?? ''}`);
    await expect(page.locator(`tr.woocommerce-table__line-item.order_item.component_table_item:nth-of-type(4) > td.woocommerce-table__product-name.product-name > .component-name.component_table_item_indent > .wc-item-meta > li`).first()).toContainText(`${vars.outrigger ?? ''}`);
    await expect(page.locator(`tr.woocommerce-table__line-item.order_item.component_table_item:nth-of-type(5) > td.woocommerce-table__product-name.product-name > .component-name.component_table_item_indent > .wc-item-meta > li`).first()).toContainText(`${vars.frame ?? ''}`);
    await expect(page.locator(`tfoot > tr:nth-of-type(1) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
    await expect(page.locator(`tfoot > tr:nth-of-type(2) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.shippingPrice ?? ''}`);
    await expect(page.locator(`tfoot > tr:nth-of-type(3) > td`).first()).toHaveText(`Credit Card (Stripe)`);
    await expect(page.locator(`tfoot > tr:nth-of-type(4) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.total ?? ''}`);
    await expect(page.locator(`tfoot > tr:nth-of-type(4) > td > small > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.taxPriceSmall ?? ''}`);
    try {
      await expect(page.locator(`tfoot > tr:nth-of-type(5) > td`).first()).toHaveText(`Order Note for Testing this field`);
    } catch { /* optional step: assertText */ }
    await expect(page.locator(`.woocommerce-column.woocommerce-column--1 > address`).first()).toContainText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.street3 ?? ''}
${vars.street2 ?? ''}
${vars.zipCode ?? ''}
${vars.city ?? ''}
${vars.stateComplete ?? ''}
${vars.countryComplete ?? ''}

${vars.phone ?? ''}

${vars.email ?? ''}`);
    await expect(page.locator(`.woocommerce-column.woocommerce-column--2 > address`).first()).toContainText(`${vars.firstName ?? ''} ${vars.lastName2 ?? ''}
${vars.street3 ?? ''}
${vars.street2 ?? ''}
${vars.zipCode ?? ''}
${vars.city ?? ''}
${vars.stateComplete ?? ''}
${vars.countryComplete ?? ''}`);
  });

  test('07 - Registration, My Account links and Login', async ({ page }) => {
    await page.goto(`/za/`);
    await page.waitForLoadState('load');

    vars.username = `${vars.emailReg ?? ''}`;
    vars.pass = `${vars.password ?? ''}`;
    await register(page, vars);
    await login(page, vars);
    await page.locator(`xpath=//a[contains(text(), "Orders")]`).or(page.locator(`.woocommerce-MyAccount-navigation-link > a[href*="/my-account/orders/"]`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.wc-block-components-notice-banner__content`).or(page.locator(`.woocommerce-info`))).not.toHaveCount(0);
    await page.locator(`xpath=//a[contains(text(), "Downloads")]`).or(page.locator(`a[href*="/my-account/downloads/"]`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.wc-block-components-notice-banner__content`).or(page.locator(`.woocommerce-info`))).not.toHaveCount(0);
    await page.locator(`xpath=//a[contains(text(), "Addresses")]`).or(page.locator(`a[href*="/my-account/edit-address/"]`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.woocommerce-MyAccount-content`)).not.toHaveCount(0);
    await page.locator(`xpath=//a[contains(text(), "Account details")]`).or(page.locator(`a[href*="/my-account/edit-account/"]`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.woocommerce-MyAccount-content`)).not.toHaveCount(0);
    await page.locator(`xpath=//a[contains(text(), "Logout")]`).or(page.locator(`a[href*="/my-account/customer-logout/?_wpnonce="]`)).filter({ visible: true }).first().click({ force: true });
    vars.pass = `${vars.password ?? ''}`;
    await login(page, vars);
  });

  test('08 - “Forgot password?” flow', async ({ page }) => {
    await page.goto(`/za/`);
    await page.waitForLoadState('load');

    vars.username = `${vars.emailForgot ?? ''}`;
    vars.pass = `${vars.password ?? ''}`;
    await register(page, vars);
    await page.waitForLoadState('load');
    await page.locator(`a[href*="/my-account/lost-password/"]`).filter({ visible: true }).first().click({ force: true });
    try { await page.locator(`#user_login`).first().fill(`${vars.username ?? ''}`); } catch { await page.locator(`#user_login`).first().selectOption(`${vars.username ?? ''}`); }
    await page.locator(`button[type="submit"].woocommerce-Button`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.wc-block-components-notice-banner__content`).or(page.locator(`.woocommerce-info`)).or(page.locator(`.woocommerce-message`)).first()).toHaveText(`Password reset email has been sent.`);
    await extractUserFromEmail(page, vars);
    await page.locator(`a.link`).filter({ visible: true }).first().click({ force: true });
    try { await page.locator(`#password_1`).first().fill(`${vars.password2 ?? ''}`); } catch { await page.locator(`#password_1`).first().selectOption(`${vars.password2 ?? ''}`); }
    try { await page.locator(`#password_2`).first().fill(`${vars.password2 ?? ''}`); } catch { await page.locator(`#password_2`).first().selectOption(`${vars.password2 ?? ''}`); }
    await page.locator(`button[type="submit"]`).filter({ visible: true }).first().click({ force: true });
    vars.pass = `${vars.password2 ?? ''}`;
    await page.locator(`a[href*="/my-account/customer-logout/?_wpnonce="]`).filter({ visible: true }).first().click({ force: true });
    await login(page, vars);
  });

  test('09 - Slider Lens comparison', async ({ page }) => {
    await page.goto(`/za/`);
    await page.waitForLoadState('load');

    vars.test = `slider`;
    // ↓ 03 - Product page
    // ↓ 02 - Bike Menu
    await page.waitForLoadState('load');
    await page.locator(`li.mega-menu-item.mega-menu-item-type-custom.mega-menu-item-object-custom.mega-menu-item-has-children.mega-menu-megamenu.mega-align-bottom-left:nth-of-type(1) > a[href="#"].mega-menu-link`).filter({ visible: true }).first().click({ force: true });
    // ↑ end 02 - Bike Menu
    await page.locator(`ul.mega-sub-menu > li:nth-of-type(2) > a[href*="/shop/diablo-mtb-goggles/"]`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    try {
      await page.locator(`svg.needsclick`).filter({ visible: true }).first().click({ force: true });
    } catch { /* optional step: click */ }
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
      vars.unitPrice = ((await page.locator(`div.composite_price > p.price > span.woocommerce-Price-amount.amount`).textContent()) ?? '').trim();
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

});
