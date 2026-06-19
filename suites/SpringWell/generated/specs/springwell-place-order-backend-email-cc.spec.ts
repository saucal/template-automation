// @ts-nocheck
// Auto-generated from Ghost Inspector suite: "SpringWell - Place order Backend + Email - CC"
// Review all TODOs before running.
import dotenv from 'dotenv';
dotenv.config();
import { test, expect } from '@playwright/test';
import { blockUI, placeOrderElement } from '../helpers/common-steps-for-all-projects';
import { backendOrder, checkOrderAndSubscriptionsOnMyAccount, checkTheTotal, exitTest, extractUserFromEmail, fillCC, fillCheckout, loginAdmin } from '../helpers/springwell-common-steps';

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

test.describe('SpringWell - Place order Backend + Email - CC', () => {

  const vars = new Proxy<Record<string, string>>({
    "email": `qa+gi_order_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "emailReg": `qa+gi_reg_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "emailForgot": `qa+gi_forgot_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "payPalUser": "qa+gi_sb-8eg0v132169@saucal.com",
    "payPalPass": process.env.PAY_PAL_PASS ?? '',
    "adminUser": "saucal_maintenance_admin",
    "adminPass": process.env.ADMIN_PASS ?? '',
    "project": "springwell",
    "zipCode": "11230",
    "password2": process.env.PASSWORD2 ?? '',
    "Symbol": "$",
    "firstName": "QA",
    "notes": "Testing Notes",
    "lastName": `${Math.random().toString(36).substring(2, 10)}`,
    "company": "Test Inc.",
    "street": "30 Leicester Square",
    "street2": "Ap. 4",
    "city": "Brooklyn",
    "stateComplete": "New York",
    "countryComplete": "United States (US)",
    "state": "NY",
    "prodUrl": "https://www.springwellwater.com/",
    "country": "US",
    "phone": "3412345678",
    "lastName2": `${Math.random().toString(36).substring(2, 10)}`,
    "company2": "Shipping Inc.",
    "street3": "30 Leicester Square",
    "street4": "5th Floor",
    "password": process.env.PASSWORD ?? '',
  }, { get: (o: Record<string, string>, k: string) => (k in o ? o[k] : '') });

  test('01 - Place order - New User', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await exitTest(page, vars);
    await page.locator(`xpath=//a[contains(text(), "SHOP WATER FILTRATION")]`).or(page.locator(`.offer-one__single > a[href="/product/water-filters/whole-house-water-filters/"]`)).filter({ visible: true }).first().click({ force: true });
    vars.prod_desc = ((await page.locator(`h1.product_title`).textContent()) ?? '').trim();
    vars.unitPrice = ((await page.locator(`strong.color-green.variable-dt-p`).textContent()) ?? '').trim();
    await page.locator(`xpath=//*[contains(text(),'Save choices')]`).filter({ visible: true }).first().click({ force: true });
    await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const upgrades = Array.from<any>(document.querySelectorAll<HTMLInputElement>('form > div.more_product_options > div > div input'));

upgrades.forEach(checkbox => {
  if ((checkbox as HTMLInputElement).checked) {
    (checkbox as HTMLInputElement).checked = false;
  }
}); }, vars);
    vars.selector1 = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const elements = Array.from<any>(document.querySelectorAll<HTMLFormElement>('form > div.more_product_options > div.product-line-item-form'));
const visibleElements = Array.from<any>(elements).filter(element => element.style.display !== 'none');
const firstVisible = visibleElements[0];
let selector = 'form > div.more_product_options';

if (firstVisible) {
  if (firstVisible.id) {
    selector += ` > #${firstVisible.id}`;
  } else {
    const siblings = Array.from<any>(firstVisible.parentNode.children).filter(
      sib => sib.tagName === firstVisible.tagName
    );
    if (siblings.length > 1) {
      const index = siblings.indexOf(firstVisible) + 1;
      selector += ` > div.product-line-item-form:nth-of-type(${index})`;
    } else {
      selector += ' > div.product-line-item-form';
    }
  }
  console.log('CSS Selector for the first visible element:', selector);
} else {
  console.log('No visible elements found.');
}

return selector }, vars);
    await page.locator(`${vars.selector1 ?? ''} input`).filter({ visible: true }).first().click({ force: true });
    vars.upgrade_desc = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return document.querySelector(`${vars.selector1} label`).textContent.trim()

//#product-284 > div > div > div:nth-child(2) > div > form > div.more_product_options > div:nth-child(4) > div.prd-col-1 > label     }, vars);
    vars.upgrade = ((await page.locator(`${vars.selector1 ?? ''} span.priceprod`).textContent()) ?? '').trim();
    vars.upgrade = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const upgrade = `${vars.upgrade}`.replace('+ ','').trim()

return upgrade
 }, vars);
    vars.selector2 = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const elements = Array.from<any>(document.querySelectorAll<HTMLFormElement>('form > div.more_product_options > div.product-line-item-form'));
const visibleElements = Array.from<any>(elements).filter(element => element.style.display !== 'none');
const firstVisible = visibleElements[1];
let selector = 'form > div.more_product_options';

if (firstVisible) {
  if (firstVisible.id) {
    selector += ` > #${firstVisible.id}`;
  } else {
    const siblings = Array.from<any>(firstVisible.parentNode.children).filter(
      sib => sib.tagName === firstVisible.tagName
    );
    if (siblings.length > 1) {
      const index = siblings.indexOf(firstVisible) + 1;
      selector += ` > div.product-line-item-form:nth-of-type(${index})`;
    } else {
      selector += ' > div.product-line-item-form';
    }
  }
  console.log('CSS Selector for the first visible element:', selector);
} else {
  console.log('No visible elements found.');
}

return selector }, vars);
    await page.locator(`${vars.selector2 ?? ''} input`).filter({ visible: true }).first().click({ force: true });
    vars.addon_desc = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return document.querySelector(`${vars.selector2} label`).textContent.trim()
 }, vars);
    vars.addon = ((await page.locator(`${vars.selector2 ?? ''} span.priceprod`).textContent()) ?? '').trim();
    vars.addon = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const addon = `${vars.addon}`.replace('+ ','').trim()

return addon }, vars);
    vars.subtotalProd = ((await page.locator(`.sub-tt-pr`).textContent()) ?? '').trim();
    vars.subtotalProd = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const amount = vars.subtotalProd;
const usdFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
});
return usdFormatter.format(amount);
 }, vars);
    vars.variable1 = ((await page.locator(`#number-of-bathrooms`).textContent()) ?? '').trim();
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const unitPrice = parseFloat(`${vars.unitPrice}`.replace('$','').replaceAll(',','').trim())
const upgrade = parseFloat(`${vars.upgrade}`.replace('$','').replaceAll(',','').trim())
const addon = parseFloat(`${vars.addon}`.replace('$','').replaceAll(',','').trim())
const subtotalProd = parseFloat(`${vars.subtotalProd}`.replace('$','').replaceAll(',','').trim())

const subtotalProd2 = parseFloat((unitPrice + upgrade + addon).toFixed(2))

return subtotalProd2 === subtotalProd
 }, vars)).toBeTruthy();
    {
      const _lbl = page.locator(`label[for="custom-add-to-cart"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`xpath=//button[contains(text(), "Buy Now")]`).or(page.locator(`button[type="button"].single_add_to_cart_button`)).or(page.locator(`#custom-add-to-cart`)).filter({ visible: true }).first().click({ force: true }); }
    }
    await expect(page.locator(`tr:nth-of-type(3) > td.product-name > a`).first()).toContainText(`${vars.prod_desc ?? ''} - ${vars.variable1 ?? ''}`);
    await expect(page.locator(`tr.woocommerce-cart-form__cart-item.cart_item:nth-of-type(3) > td.product-price > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    await expect(page.locator(`tr.woocommerce-cart-form__cart-item.cart_item:nth-of-type(3) > td.product-subtotal > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    await expect(page.locator(`tr:nth-of-type(1) > td.product-name > a`).first()).toContainText(`${vars.upgrade_desc ?? ''}`);
    await expect(page.locator(`tr.woocommerce-cart-form__cart-item.cart_item:nth-of-type(1) > td.product-price > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.upgrade ?? ''}`);
    await expect(page.locator(`tr.woocommerce-cart-form__cart-item.cart_item:nth-of-type(1) > td.product-subtotal > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.upgrade ?? ''}`);
    await expect(page.locator(`tr:nth-of-type(2) > td.product-name > a`).first()).toContainText(`${vars.addon_desc ?? ''}`);
    await expect(page.locator(`tr.woocommerce-cart-form__cart-item.cart_item:nth-of-type(2) > td.product-price > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.addon ?? ''}`);
    await expect(page.locator(`tr.woocommerce-cart-form__cart-item.cart_item:nth-of-type(2) > td.product-subtotal > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.addon ?? ''}`);
    vars.subtotal = `${vars.subtotalProd ?? ''}`;
    await expect(page.locator(`tr.cart-subtotal > td > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.subtotal ?? ''}`);
    await expect(page.locator(`strong > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.subtotal ?? ''}`);
    await page.locator(`xpath=//a[contains(text(), "Proceed to checkout")]`).or(page.locator(`a[href*="/checkout/"].checkout-button`)).filter({ visible: true }).first().click({ force: true });
    await fillCheckout(page, vars);
    await expect(page.locator(`tr.cart_item:nth-of-type(3) > td.product-name`).first()).toContainText(`${vars.prod_desc ?? ''} - ${vars.variable1 ?? ''}`);
    await expect(page.locator(`tr.cart_item:nth-of-type(3) > td.product-total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    await expect(page.locator(`tr.cart_item:nth-of-type(1) > td.product-name`).first()).toContainText(`${vars.upgrade_desc ?? ''}`);
    await expect(page.locator(`tr.cart_item:nth-of-type(1) > td.product-total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.upgrade ?? ''}`);
    await expect(page.locator(`tr.cart_item:nth-of-type(2) > td.product-name`).first()).toContainText(`${vars.addon_desc ?? ''}`);
    await expect(page.locator(`tr.cart_item:nth-of-type(2) > td.product-total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.addon ?? ''}`);
    await expect(page.locator(`tr.cart-subtotal > td > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.subtotal ?? ''}`);
    vars.shippingPrice = ((await page.locator(`#shipping_method > li > label`).textContent()) ?? '').trim();
    vars.taxPrice = ((await page.locator(`tr.tax-total > td > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
    vars.total = ((await page.locator(`strong > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
    await checkTheTotal(page, vars);
    await fillCC(page, vars);
    await placeOrderElement(page, vars);
    await blockUI(page, vars);
    await page.waitForLoadState('load');
    await checkOrderAndSubscriptionsOnMyAccount(page, vars);
  });

  test('02 - Place order - Backend', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await exitTest(page, vars);
    await loginAdmin(page, vars);
    await page.locator(`a[href="admin.php?page=wc-admin"] > .wp-menu-name`).first().hover();
    await page.locator(`a[href="edit.php?post_type=shop_order"]`).or(page.locator(`a[href="admin.php?page=wc-orders"]`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`tr.iedit.author-other.level-0.type-shop_order.status-wc-processing.hentry:nth-of-type(1) > td.order_total.column-order_total > .tips > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.total ?? ''}`);
    await page.locator(`a[href*="/wp-admin/post.php?post=${vars.orderNumber ?? ''}&action=edit"] > strong`).or(page.locator(`a[href*="/wp-admin/admin.php?page=wc-orders&action=edit&id=${vars.orderNumber ?? ''}"] > strong`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.woocommerce-order-data__meta`).first()).toContainText(`${vars.paymentMethodMeta ?? ''}`);
    await expect(page.locator(`#select2-order_status-container`).first()).toContainText(`Processing`);
    await backendOrder(page, vars);
  });

  test('03 - Place order - Email', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await exitTest(page, vars);
    await extractUserFromEmail(page, vars);
    await page.locator(`xpath=//a[contains(text(), "order has been received!")]`).filter({ visible: true }).first().click({ force: true });
    if (vars.variable1 === '') {
      await expect(page.locator(`tr:nth-of-type(1).order_item > td.td:nth-of-type(1)`).first()).toContainText(`${vars.prod_desc ?? ''}`);
    }
    if (vars.variable1 === '') {
      await expect(page.locator(`tr:nth-of-type(1).order_item > td.td:nth-of-type(3) > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    }
    if (vars.variable1 !== '') {
      await expect(page.locator(`tr:nth-of-type(3).order_item > td.td:nth-of-type(1)`).first()).toContainText(`${vars.prod_desc ?? ''} - ${vars.variable1 ?? ''}`);
    }
    if (vars.variable1 !== '') {
      await expect(page.locator(`tr:nth-of-type(3).order_item > td.td:nth-of-type(3) > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    }
    if (vars.upgrade !== '') {
      await expect(page.locator(`tr:nth-of-type(1).order_item > td.td:nth-of-type(1)`).first()).toContainText(`${vars.upgrade_desc ?? ''}`);
    }
    if (vars.upgrade !== '') {
      await expect(page.locator(`tr:nth-of-type(1).order_item > td.td:nth-of-type(3) > .woocommerce-Price-amount.amount`).first()).toContainText(`${vars.upgrade ?? ''}`);
    }
    if (vars.addon !== '') {
      await expect(page.locator(`tr:nth-of-type(2).order_item > td.td:nth-of-type(1)`).first()).toContainText(`${vars.addon_desc ?? ''}`);
    }
    if (vars.addon !== '') {
      await expect(page.locator(`tr:nth-of-type(2).order_item > td.td:nth-of-type(3) > .woocommerce-Price-amount.amount`).first()).toContainText(`${vars.addon ?? ''}`);
    }
    await expect(page.locator(`tfoot > tr:nth-of-type(1) > td.td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.subtotal ?? ''}`);
    await expect(page.locator(`tfoot > tr:nth-of-type(2) > td.td`).first()).toHaveText(`Free shipping`);
    await expect(page.locator(`tfoot > tr:nth-of-type(3) > td.td > .woocommerce-Price-amount.amount`).first()).toHaveText(`$0.00`);
    await expect(page.locator(`tfoot > tr:nth-of-type(4) > td.td`).first()).toContainText(`${vars.paymentMethod ?? ''}`);
    await expect(page.locator(`tfoot > tr:nth-of-type(5) > td.td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.total ?? ''}`);
    await expect(page.locator(`tfoot > tr:nth-of-type(6) > td.td`).first()).toContainText(`${vars.notes ?? ''}`);
    await expect(page.locator(`td:nth-of-type(1) > address.address`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.company ?? ''}
${vars.street ?? ''}
${vars.street2 ?? ''}
${vars.city ?? ''}, ${vars.state ?? ''} ${vars.zipCode ?? ''}
${vars.countryComplete ?? ''}
${vars.phone ?? ''}
${vars.email ?? ''}`);
    await expect(page.locator(`td:nth-of-type(2) > address.address`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName2 ?? ''}
${vars.company2 ?? ''}
${vars.street3 ?? ''}
${vars.street4 ?? ''}
${vars.city ?? ''}, ${vars.state ?? ''} ${vars.zipCode ?? ''}
${vars.countryComplete ?? ''}`);
  });

});
