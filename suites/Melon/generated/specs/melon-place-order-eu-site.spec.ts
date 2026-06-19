// @ts-nocheck
// Auto-generated from Ghost Inspector suite: "Melon - Place order - EU Site"
// Review all TODOs before running.
import dotenv from 'dotenv';
dotenv.config();
import { test, expect } from '@playwright/test';
import { blockImageSizes, blockUI, calculateSubtotal, extractUserFromEmail, placeOrderElement, wooCommerceCheckoutTemplate } from '../helpers/common-steps-for-all-projects';

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

test.describe('Melon - Place order - EU Site', () => {

  const vars = new Proxy<Record<string, string>>({
    "email": `qa+gi_order_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "emailReg": `qa+gi_reg_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "emailForgot": `qa+gi_forgot_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "payPalUser": "qa+gi_sb-8eg0v132169@saucal.com",
    "payPalPass": process.env.PAY_PAL_PASS ?? '',
    "adminUser": "saucal_maintenance_admin",
    "adminPass": process.env.ADMIN_PASS ?? '',
    "Symbol": "€",
    "project": "melon",
    "stateComplete": "MILANO",
    "countryComplete": "Italy",
    "city": "Milano",
    "street": "123 false street",
    "street2": "Ap. 4",
    "zipCode": "20129",
    "lastName": `${Math.random().toString(36).substring(2, 10)}`,
    "phone": "3453453454",
    "firstName": "QA",
    "street3": "123 Shipping",
    "company2": "Testing Shipping",
    "street4": "block 1",
    "company": "Testing SA",
    "lastName2": `${Math.random().toString(36).substring(2, 10)} Shipp`,
    "password": process.env.PASSWORD ?? '',
    "url": "https://melonoptics-maintenance.mystagingwebsite.com/eu/",
    "currency": "EUR",
    "password2": process.env.PASSWORD2 ?? '',
    "country": "IT",
    "state": "MI",
  }, { get: (o: Record<string, string>, k: string) => (k in o ? o[k] : '') });

  test('01 - Place order - No Upsell', async ({ page }) => {
    await page.goto(`/eu/`);
    await page.waitForLoadState('load');

    // ↓ 05 - Checkout page
    // ↓ 04 - Cart Page
    // ↓ 03 - Product page
    // ↓ 02 - Bike Menu
    await page.waitForLoadState('load');
    await page.locator(`li.mega-menu-item.mega-menu-item-type-custom:nth-of-type(2) > a[href="#"].mega-menu-link`).filter({ visible: true }).first().click({ force: true });
    // ↑ end 02 - Bike Menu
    await page.goto(`${vars.url ?? ''}shop/diablo-mtb-goggles/?pa_frame=cosmic-black&pa_lens=smoke&pa_outrigger-nosepiece=galaxy-matte&pa_strap=black-with-white-silicon`);
    await page.waitForLoadState('load');
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
    vars.straps2 = ((await page.locator(`div.fkcart--item.fkcart-panel.fkcart-free-item:nth-of-type(2) > .fkcart-item-info > .fkcart-item-meta > div.fkcart-item-meta-content:nth-of-type(1) > .fkcart-attr-wrap > .fkcart-attr-value`).or(page.locator(`#cart-drawer > div.drawer-inner > div.drawer-content.woocommerce.widget_shopping_cart > div > div > ul > li > dl dd.variation-Straps`)).textContent()) ?? '').trim();
    vars.lens2 = ((await page.locator(`div.fkcart--item.fkcart-panel.fkcart-free-item:nth-of-type(3) > .fkcart-item-info > .fkcart-item-meta > div.fkcart-item-meta-content:nth-of-type(1) > .fkcart-attr-wrap > .fkcart-attr-value`).or(page.locator(`#cart-drawer > div.drawer-inner > div.drawer-content.woocommerce.widget_shopping_cart > div > div > ul > li > dl dd.variation-Lenses`)).textContent()) ?? '').trim();
    vars.outrigger2 = ((await page.locator(`div.fkcart--item.fkcart-panel.fkcart-free-item:nth-of-type(4) > .fkcart-item-info > .fkcart-item-meta > div.fkcart-item-meta-content:nth-of-type(1) > .fkcart-attr-wrap > .fkcart-attr-value`).or(page.locator(`#cart-drawer > div.drawer-inner > div.drawer-content.woocommerce.widget_shopping_cart > div > div > ul > li > dl dd.variation-Outrigger`)).textContent()) ?? '').trim();
    vars.frame2 = ((await page.locator(`div.fkcart--item.fkcart-panel.fkcart-free-item:nth-of-type(5) > .fkcart-item-info > .fkcart-item-meta > div.fkcart-item-meta-content:nth-of-type(1) > .fkcart-attr-wrap > .fkcart-attr-value`).or(page.locator(`#cart-drawer > div.drawer-inner > div.drawer-content.woocommerce.widget_shopping_cart > div > div > ul > li > dl dd.variation-Frame`)).textContent()) ?? '').trim();
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let attributes = [`${vars.straps}`,
`${vars.straps2}`,`${vars.lens}`,`${vars.lens2}`,
`${vars.outrigger2}`,`${vars.outrigger}`,
`${vars.frame2}`,`${vars.frame}`]

for (let i = 0; i < attributes.length; i++) {
    //attributes[i] = attributes[i].replace(/(?:\s)/g,"");
    attributes[i] = attributes[i].replace("× 1","");
    let aux = attributes[i].split(':')
    attributes[i] = aux.length > 1 ? aux[1].trim() : aux[0].trim();
}

return attributes[0] === attributes[1] && attributes[2] === attributes[3] 
&& attributes[4] === attributes[5]
&& attributes[6] === attributes[7]
 }, vars)).toBeTruthy();
    if (false) {
      vars.extras = ((await page.locator(`td.product-name.last-composited-extra-padding > .component-name.component_table_item_indent > dl.component`).textContent()) ?? '').trim();
    }
    await page.reload();
    await page.waitForLoadState('load');
    {
      const _lbl = page.locator(`label[for="fkcart-floating-toggler"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#fkcart-floating-toggler`).filter({ visible: true }).first().click({ force: true }); }
    }
    await expect(page.locator(`td.product-price > span.woocommerce-Price-amount.amount`).or(page.locator(`#fkcart-modal > div > div.fkcart-preview-ui > div.fkcart-slider-body > div.fkcart-item-wrap.fkcart-pt-16 > div:nth-child(1) > div.fkcart-item-misc > div > span`)).or(page.locator(`#fkcart-modal > div > div.fkcart-preview-ui > div.fkcart-reward-product-wrap > div > div.fkcart-item-wrap.fkcart-pt-16 > div:nth-child(1) > div > div.fkcart-item-info.fkcart-item-wrap-start > div.fkcart-item-misc > div > span`)).first()).toContainText(`${vars.unitPrice ?? ''}`);
    vars.qty = ((await page.locator(`input.fkcart-quantity__input`).textContent()) ?? '').trim();
    await calculateSubtotal(page, vars);
    if (false) {
      await expect(page.locator(`td.product-subtotal > span.woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
    }
    await expect(page.locator(`tr.cart-subtotal > td > span.woocommerce-Price-amount.amount`).or(page.locator(`#fkcart-modal > div > div.fkcart-preview-ui > div.fkcart-slider-footer.fkcart-pb-16 > div.fkcart-order-summary.fkcart-panel.fkcart-pt-16 > div > div.fkcart-summary-line-item.fkcart-subtotal-wrap > div.fkcart-summary-amount > strong > span`)).or(page.locator(`#fkcart-modal > div > div.fkcart-preview-ui > div.fkcart-slider-footer.fkcart-pb-16 > div.fkcart_summary_cta > div.fkcart-order-summary.fkcart-panel > div > div.fkcart-summary-line-item.fkcart-subtotal-wrap > div.fkcart-summary-amount > strong > span`)).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
    if (false) {
      vars.shippingPrice = ((await page.locator(`ul#shipping_method > li:first-child > label > span.woocommerce-Price-amount.amount`).textContent()) ?? '').trim();
    }
    vars.total = ((await page.locator(`#fkcart-modal > div > div.fkcart-preview-ui > div.fkcart-slider-footer.fkcart-pb-16 > div.fkcart-order-summary.fkcart-panel.fkcart-pt-16 > div > div.fkcart-summary-line-item.fkcart-subtotal-wrap > div.fkcart-summary-amount > strong > span`).or(page.locator(`#fkcart-checkout-button > div.fkcart-checkout--price > span`)).textContent()) ?? '').trim();
    if (false) {
      vars.taxPriceSmall = ((await page.locator(`div.woocommerce > div.kadence-woo-cart-form-wrap > div > div > table > tbody > tr.order-total > td > small > span`).textContent()) ?? '').trim();
    }
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
  }, 10000); // 30 seconds timeout

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
  }, 2000);
}) }, vars);
    await expect(page.locator(`tr.cart_item.component_container_table_item > td.product-name`).or(page.locator(`#wfacp_mini_cart_items_e081fbde > table > tbody > tr.cart_item.component_container_table_item.wfacp_delete_active > td.product-name-area > div.product-name.wfacp_summary_img_true > div.wfacp_cart_title_sec > span`)).first()).toBeVisible();
    await expect(page.locator(`tr.cart_item.component_container_table_item > td.product-name`).or(page.locator(`#wfacp_mini_cart_items_e081fbde > table > tbody > tr.cart_item.component_container_table_item.wfacp_delete_active > td.product-name-area > div.product-name.wfacp_summary_img_true > div.wfacp_cart_title_sec > span`)).first()).toContainText(`${vars.prod_desc ?? ''}`);
    await expect(page.locator(`#wfacp_mini_cart_reviews_e081fbde > tbody > tr.cart-subtotal > td > span > bdi`).first()).toContainText(`${vars.subtotalPrice ?? ''}`);
    await expect(page.locator(`#wfacp_mini_cart_reviews_e081fbde > tbody > tr.cart-subtotal > td > span`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
    vars.shippingPrice = ((await page.locator(`.wfacp_mini_cart_reviews > tbody > tr.shipping_total_fee > td:nth-child(2) > span > span`).textContent()) ?? '').trim();
    vars.Total = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const subtotal = parseFloat(`${vars.subtotalPrice}`.replace(`${vars.Symbol}`,"").replaceAll(",",".").trim());
console.log(subtotal);
const shipping = parseFloat(`${vars.shippingPrice}`.replace(`${vars.Symbol}`,"").replaceAll(",",".").trim());
console.log(shipping);
let total = subtotal + shipping;
console.log(total);
total = Intl.NumberFormat('en-IN', { style: 'currency', currency: `${vars.currency}`}).format(total).replaceAll(".",",");
console.log(total);
return total; }, vars);
    await expect(page.locator(`.wfacp_mini_cart_reviews > tbody > tr.order-total > td > strong > span`).first()).toHaveText(`${vars.Total ?? ''}`);
    vars.taxPriceSmall = ((await page.locator(`.wfacp_mini_cart_reviews > tbody > tr.order-total > td > small > span`).textContent()) ?? '').trim();
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
    await wooCommerceCheckoutTemplate(page, vars);
    try {
      await page.locator(`.wc_payment_method.payment_method_stripe`).filter({ visible: true }).first().click({ force: true });
    } catch { /* optional step: click */ }
    try { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="number"]`).first().fill(`4242 4242 4242 4242`); } catch { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="number"]`).first().selectOption(`4242 4242 4242 4242`); }
    try { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="expiry"]`).first().fill(`12 / 26`); } catch { await page.locator(`iframe[src*="js.stripe.com"]`).first().contentFrame().locator(`input[name="expiry"]`).first().selectOption(`12 / 26`); }
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
    await expect(page.locator(`.wfty-order-details-block .wfty_pro_list:nth-of-type(2) .wfty_p_name`).first()).toContainText(`${vars.straps ?? ''}`);
    await expect(page.locator(`.wfty-order-details-block .wfty_pro_list:nth-of-type(3) .wfty_p_name`).first()).toContainText(`${vars.lens ?? ''}`);
    await expect(page.locator(`.wfty-order-details-block .wfty_pro_list:nth-of-type(4) .wfty_p_name`).first()).toContainText(`${vars.outrigger ?? ''}`);
    await expect(page.locator(`.wfty-order-details-block .wfty_pro_list:nth-of-type(5) .wfty_p_name`).first()).toContainText(`${vars.frame ?? ''}`);
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
    await expect(page.locator(`.woocommerce-table__product-name .Straps > p`).first()).toContainText(`${vars.straps ?? ''}`);
    await expect(page.locator(`.woocommerce-table__product-name .Lenses > p`).first()).toContainText(`${vars.lens ?? ''}`);
    await expect(page.locator(`.woocommerce-table__product-name .Outrigger > p`).first()).toContainText(`${vars.outrigger ?? ''}`);
    await expect(page.locator(`.woocommerce-table__product-name .Frame > p`).first()).toContainText(`${vars.frame ?? ''}`);
    await expect(page.locator(`tfoot > tr:nth-of-type(1) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.subtotalPrice ?? ''}`);
    await expect(page.locator(`tfoot > tr:nth-of-type(2) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.shippingPrice ?? ''}`);
    await expect(page.locator(`tfoot > tr:nth-of-type(4) > td`).first()).toHaveText(`Credit Card (Stripe)`);
    await expect(page.locator(`tfoot > tr:nth-of-type(3) > td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.total ?? ''}`);
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

  test('03 - Place order - Email', async ({ page }) => {
    await page.goto(`/eu/`);
    await page.waitForLoadState('load');

    vars.username = `${vars.email ?? ''}`;
    await extractUserFromEmail(page, vars);
    await page.locator(`xpath=//a[contains(text(), "Your Melon Optics EU order receipt from")]`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`tr.order_item > td.td:nth-of-type(1)`).first()).toContainText(`${vars.prodDesc ?? ''}`);
    await expect(page.locator(`td.td:nth-of-type(3) > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    await expect(page.locator(`tfoot tr:nth-of-type(3) > td.td > .woocommerce-Price-amount.amount`).or(page.locator(`tbody > tr.order-totals.order-totals-subtotal > td`)).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    await expect(page.locator(`tbody > tr.order-totals.order-totals-shipping > td > span`).first()).toHaveText(`${vars.shippingPrice ?? ''}`);
    try {
      await expect(page.locator(`tr.order-totals-payment_method > td.td`).first()).toContainText(`Credit Card (Stripe)`);
    } catch { /* optional step: assertTextPresent */ }
    await expect(page.locator(`tbody > tr.order-totals.order-totals-total > td > span`).first()).toHaveText(`${vars.total ?? ''}`);
    await expect(page.locator(`small.includes_tax .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.taxPriceSmall ?? ''}`);
    await expect(page.locator(`td:nth-of-type(1) > address.address`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.street3 ?? ''}
${vars.street2 ?? ''}
${vars.zipCode ?? ''}
${vars.city ?? ''}
${vars.stateComplete ?? ''}
${vars.countryComplete ?? ''}
${vars.phone ?? ''}
${vars.email ?? ''}`);
    await expect(page.locator(`td:nth-of-type(2) > address.address`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName2 ?? ''}
${vars.street3 ?? ''}
${vars.street2 ?? ''}
${vars.zipCode ?? ''}
${vars.city ?? ''}
${vars.stateComplete ?? ''}
${vars.countryComplete ?? ''}
${vars.phone ?? ''}`);
  });

});
