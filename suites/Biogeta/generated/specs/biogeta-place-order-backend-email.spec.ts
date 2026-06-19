// @ts-nocheck
// Auto-generated from Ghost Inspector suite: "Biogeta - Place order Backend + Email"
// Review all TODOs before running.
import dotenv from 'dotenv';
dotenv.config();
import { test, expect } from '@playwright/test';
import { checkOrderOnMyAccount, exitTest, loginAdmin, selectPayPal, userEmailLink } from '../helpers/biogeta-common-steps';
import { blockUI } from '../helpers/common-steps-for-all-projects';

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

test.describe('Biogeta - Place order Backend + Email', () => {

  const vars = new Proxy<Record<string, string>>({
    "email": `qa+gi_order_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "emailReg": `qa+gi_reg_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "emailForgot": `qa+gi_forgot_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "payPalUser": "qa+gi_sb-8eg0v132169@saucal.com",
    "payPalPass": process.env.PAY_PAL_PASS ?? '',
    "adminUser": "saucal_maintenance_admin",
    "adminPass": process.env.ADMIN_PASS ?? '',
    "project": "biogeta",
    "zipCode": "10785",
    "password2": process.env.PASSWORD2 ?? '',
    "Symbol": "€",
    "firstName": "QA",
    "vat": "DE123456789",
    "lastName": `${Math.random().toString(36).substring(2, 10)}`,
    "street": "30 Leicester Square",
    "city": "Berlin",
    "phone": "+497412345678",
    "lastName2": `${Math.random().toString(36).substring(2, 10)}`,
    "company2": "Shipping Inc.",
    "street3": "30 Leicester Square",
    "password": process.env.PASSWORD ?? '',
    "prodUrl": "https://biogeta.com/de/",
  }, { get: (o: Record<string, string>, k: string) => (k in o ? o[k] : '') });

  test('01 - Place order - New User', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await exitTest(page, vars);
    // ↓ 07 - Checkout page
    // ↓ 05 - Smart Composite product
    // ↓ 02 - Products page
    await page.waitForLoadState('load');
    await page.locator(`#menu-1-ad71c0e > li.menu-item.menu-item-type-post_type.menu-item-object-page:nth-of-type(1) > a[href*="/de/shop/"].elementor-item`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`section.elementor-section.elementor-top-section.elementor-element.elementor-section-boxed.elementor-section-height-default.elementor-section-height-default:nth-of-type(6) > .elementor-container.elementor-column-gap-default > .elementor-column.elementor-top-column.elementor-element > .elementor-widget-wrap.elementor-element-populated`)).not.toHaveCount(0);
    await expect(page.locator(`section.elementor-section.elementor-top-section.elementor-element.elementor-section-boxed.elementor-section-height-default.elementor-section-height-default:nth-of-type(6) > .elementor-container.elementor-column-gap-default > .elementor-column.elementor-top-column.elementor-element > .elementor-widget-wrap.elementor-element-populated > section.elementor-section.elementor-inner-section.elementor-element.elementor-section-boxed.elementor-section-height-default.elementor-section-height-default:nth-of-type(1) > .elementor-container.elementor-column-gap-default > div.elementor-column.elementor-inner-column.elementor-element:nth-of-type(1)`)).not.toHaveCount(0);
    await expect(page.locator(`section.elementor-section.elementor-top-section.elementor-element.elementor-section-boxed.elementor-section-height-default.elementor-section-height-default:nth-of-type(6) > .elementor-container.elementor-column-gap-default > .elementor-column.elementor-top-column.elementor-element > .elementor-widget-wrap.elementor-element-populated > section.elementor-section.elementor-inner-section.elementor-element.elementor-section-boxed.elementor-section-height-default.elementor-section-height-default:nth-of-type(1) > .elementor-container.elementor-column-gap-default > div.elementor-column.elementor-inner-column.elementor-element:nth-of-type(1) > .elementor-widget-wrap.elementor-element-populated`)).not.toHaveCount(0);
    await expect(page.locator(`a[href="/produkt/biogeta-home-harmonizer/"] > .elementor-button-content-wrapper > .elementor-button-text`).first()).toContainText(`Zum Produkt`);
    await expect(page.locator(`.elementor-section.elementor-inner-section.elementor-element.elementor-element-e78df51 > .elementor-container.elementor-column-gap-default > div.elementor-column.elementor-inner-column.elementor-element:nth-of-type(1) > .elementor-widget-wrap.elementor-element-populated`)).not.toHaveCount(0);
    await expect(page.locator(`.elementor-section.elementor-top-section.elementor-element.elementor-element-71c9a21 > .elementor-container.elementor-column-gap-default > .elementor-column.elementor-top-column.elementor-element > .elementor-widget-wrap.elementor-element-populated`)).not.toHaveCount(0);
    // ↑ end 02 - Products page
    await page.locator(`a[href="/produkt/home-harmonizer/"] > .elementor-button-content-wrapper > .elementor-button-text`).or(page.locator(`a[href*="home-harmonizer/"] > .elementor-button-content-wrapper > .elementor-button-text`)).filter({ visible: true }).first().click({ force: true });
    if (!page.url().includes('produkt/home-harmonizer/')) {
      await page.goto(`${vars.startUrl ?? ''}de/produkt/home-harmonizer/`);
      await page.waitForLoadState('load');
    }
    vars.prod_desc = ((await page.locator(`h1.product_title`).textContent()) ?? '').trim();
    vars.unitPrice = ((await page.locator(`.price > ins > .woocommerce-Price-amount.amount`).or(page.locator(`.price > .woocommerce-Price-amount.amount`)).textContent()) ?? '').trim();
    vars.prod_desc2 = ((await page.locator(`.wooco_component_product > div > div > div > div:nth-of-type(3) > div:nth-of-type(1)`).textContent()) ?? '').trim();
    vars.unitPrice2 = ((await page.locator(`div:nth-of-type(2) > span:nth-of-type(1) > ins > .woocommerce-Price-amount.amount`).or(page.locator(`div:nth-of-type(2) > span:nth-of-type(1) > .woocommerce-Price-amount.amount`)).textContent()) ?? '').trim();
    if (false) {
      await page.locator(`.wooco_component_product > div > div > div > .wooco-qty-wrap > .wooco-qty-input > .wooco_component_product_qty_btn.wooco_component_product_qty_plus.wooco-plus`).filter({ visible: true }).first().click({ force: true });
    }
    await page.locator(`.wooco_component_product > div > div > div > div:nth-of-type(1) > span`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`#wooco_component_product_select_3 > div > a > small.dd-desc`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`xpath=//label[contains(text(), "BALANCE ANHÄNGER")]`).or(page.locator(`#wooco_component_product_select_3 > .dd-options.dd-click-off-close > li:nth-of-type(2) > a.dd-option > label.dd-option-text`)).filter({ visible: true }).first().click({ force: true });
    vars.prod_desc3 = ((await page.locator(`#wooco_component_product_select_3 > div > a > label`).textContent()) ?? '').trim();
    vars.prod_desc3 = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const prod_desc3 = `${vars.prod_desc3}`.split('-')[0].trim();

return prod_desc3 }, vars);
    vars.unitPrice3 = ((await page.locator(`div > a > small.dd-desc > span:nth-of-type(1) > ins > .woocommerce-Price-amount.amount > bdi`).or(page.locator(`div > a > small.dd-desc > span:nth-of-type(1) > .woocommerce-Price-amount.amount > bdi`)).textContent()) ?? '').trim();
    await page.locator(`#wooco_component_product_select_4 > div > a > small.dd-desc`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`xpath=//label[contains(text(), "DETOX PLATTE")]`).or(page.locator(`#wooco_component_product_select_4 > .dd-options.dd-click-off-close > li:nth-of-type(2) > a.dd-option > label.dd-option-text`)).filter({ visible: true }).first().click({ force: true });
    await page.locator(`.wooco_component.wooco_component_4 > .wooco_component_product > .wooco_component_product_qty.wooco-qty-wrap > .wooco-qty-input > .wooco_component_product_qty_btn.wooco_component_product_qty_plus.wooco-plus`).filter({ visible: true }).first().click({ force: true });
    vars.prod_desc4 = ((await page.locator(`#wooco_component_product_select_4 > div > a > label`).textContent()) ?? '').trim();
    vars.unitPrice4 = ((await page.locator(`#wooco_component_product_select_4 > div > a > small.dd-desc > span:nth-of-type(1) > ins > .woocommerce-Price-amount.amount > bdi`).or(page.locator(`#wooco_component_product_select_4 > div > a > small.dd-desc > span:nth-of-type(1) > .woocommerce-Price-amount.amount > bdi`)).textContent()) ?? '').trim();
    await page.locator(`#wooco_component_product_select_5 > div > a > label`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`xpath=//label[contains(text(), "1 × ELEKTROSMOG  minimieren - Video-Kurs + E-Book")]`).or(page.locator(`#wooco_component_product_select_5 > .dd-options.dd-click-off-close > li:nth-of-type(2) > a.dd-option > label.dd-option-text`)).filter({ visible: true }).first().click({ force: true });
    vars.prod_desc5 = ((await page.locator(`#wooco_component_product_select_5 > div > a > label`).textContent()) ?? '').trim();
    vars.prod_desc5 = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let prod_desc5 = `${vars.prod_desc5}`.replace('1 × ','')

return prod_desc5 }, vars);
    vars.unitPrice5 = ((await page.locator(`#wooco_component_product_select_5 > div > a > small.dd-desc > span:nth-of-type(1) > ins > .woocommerce-Price-amount.amount > bdi`).or(page.locator(`#wooco_component_product_select_5 > div > a > small.dd-desc > span:nth-of-type(1) > .woocommerce-Price-amount.amount > bdi`)).textContent()) ?? '').trim();
    vars.totalProd = ((await page.locator(`.wooco_total > ins > .woocommerce-Price-amount.amount`).or(page.locator(`.wooco_total > .woocommerce-Price-amount.amount`)).textContent()) ?? '').trim();
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let unitPrice = parseFloat(`${vars.unitPrice}`.replace(`${vars.Symbol}`,'').replace('.','').replace(',','.').trim())
let unitPrice2 = parseFloat(`${vars.unitPrice2}`.replace(`${vars.Symbol}`,'').replace('.','').replace(',','.').trim())
let unitPrice3 = parseFloat(`${vars.unitPrice3}`.replace(`${vars.Symbol}`,'').replace('.','').replace(',','.').trim())
let unitPrice4 = parseFloat(`${vars.unitPrice4}`.replace(`${vars.Symbol}`,'').replace('.','').replace(',','.').trim())
let unitPrice5 = parseFloat(`${vars.unitPrice5}`.replace(`${vars.Symbol}`,'').replace('.','').replace(',','.').trim())
let totalProd = parseFloat(`${vars.totalProd}`.replace(`${vars.Symbol}`,'').replace('.','').replace(',','.').trim())

let totalProd2 = Number((unitPrice + unitPrice2 + unitPrice3 + unitPrice4 + unitPrice5).toFixed(2))

return totalProd === totalProd2
 }, vars)).toBeTruthy();
    await expect(page.locator(`.price > ins > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.totalProd ?? ''}`);
    // ↑ end 05 - Smart Composite product
    await page.locator(`xpath=//button[contains(text(), "Add to cart")]`).or(page.locator(`button[name="add-to-cart"]`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.woocommerce-message`).first()).toContainText(`„${vars.prod_desc ?? ''}“ wurde deinem Warenkorb hinzugefügt.`);
    await expect(page.locator(`div:nth-of-type(1).fkcart--item .fkcart-item-title`).first()).toContainText(`${vars.prod_desc ?? ''}`);
    await expect(page.locator(`div:nth-of-type(1).fkcart--item .fkcart-item-price > ins > .woocommerce-Price-amount.amount`).or(page.locator(`div:nth-of-type(1).fkcart--item .fkcart-item-price > .woocommerce-Price-amount.amount`)).first()).toHaveText(`${vars.totalProd ?? ''}`);
    await expect(page.locator(`div:nth-of-type(2).fkcart--item .fkcart-item-title`).first()).toContainText(`${vars.prod_desc ?? ''} → HOME Harmonizer - M`);
    await expect(page.locator(`div:nth-of-type(2).fkcart--item .fkcart-item-price > ins > .woocommerce-Price-amount.amount`).or(page.locator(`div:nth-of-type(2).fkcart--item .fkcart-item-price > .woocommerce-Price-amount.amount`)).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    await expect(page.locator(`div:nth-of-type(3).fkcart--item .fkcart-item-title`).first()).toContainText(`${vars.prod_desc ?? ''} → ${vars.prod_desc2 ?? ''}`);
    await expect(page.locator(`div:nth-of-type(3).fkcart--item .fkcart-item-price > ins > .woocommerce-Price-amount.amount`).or(page.locator(`div:nth-of-type(3).fkcart--item .fkcart-item-price > .woocommerce-Price-amount.amount`)).first()).toHaveText(`${vars.unitPrice2 ?? ''}`);
    await expect(page.locator(`div:nth-of-type(4).fkcart--item .fkcart-item-title`).first()).toContainText(`${vars.prod_desc ?? ''} → ${vars.prod_desc3 ?? ''}`);
    await expect(page.locator(`div:nth-of-type(4).fkcart--item .fkcart-item-price > ins > .woocommerce-Price-amount.amount`).or(page.locator(`div:nth-of-type(4).fkcart--item .fkcart-item-price > .woocommerce-Price-amount.amount`)).first()).toHaveText(`${vars.unitPrice3 ?? ''}`);
    await expect(page.locator(`div:nth-of-type(5).fkcart--item .fkcart-item-title`).first()).toContainText(`${vars.prod_desc ?? ''} → ${vars.prod_desc4 ?? ''}`);
    await expect(page.locator(`div:nth-of-type(5).fkcart--item .fkcart-item-price > ins > .woocommerce-Price-amount.amount`).or(page.locator(`div:nth-of-type(5).fkcart--item .fkcart-item-price > .woocommerce-Price-amount.amount`)).first()).toHaveText(`${vars.unitPrice4 ?? ''}`);
    await expect(page.locator(`div:nth-of-type(6).fkcart--item .fkcart-item-title`).first()).toContainText(`${vars.prod_desc ?? ''} → ${vars.prod_desc5 ?? ''}`);
    await expect(page.locator(`div:nth-of-type(6).fkcart--item .fkcart-item-price > ins > .woocommerce-Price-amount.amount`).or(page.locator(`div:nth-of-type(6).fkcart--item .fkcart-item-price > .woocommerce-Price-amount.amount`)).first()).toHaveText(`${vars.unitPrice5 ?? ''}`);
    await expect(page.locator(`div.fkcart-summary-amount > strong > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.totalProd ?? ''}`);
    vars.subtotal = `${vars.totalProd ?? ''}`;
    vars.total = `${vars.totalProd ?? ''}`;
    {
      const _lbl = page.locator(`label[for="fkcart-checkout-button"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#fkcart-checkout-button`).filter({ visible: true }).first().click({ force: true }); }
    }
    // ↑ end 07 - Checkout page
    try { await page.locator(`#billing_email`).first().fill(`${vars.email ?? ''}`); } catch { await page.locator(`#billing_email`).first().selectOption(`${vars.email ?? ''}`); }
    try { await page.locator(`#billing_first_name`).first().fill(`${vars.firstName ?? ''}`); } catch { await page.locator(`#billing_first_name`).first().selectOption(`${vars.firstName ?? ''}`); }
    try { await page.locator(`#billing_last_name`).first().fill(`${vars.lastName ?? ''}`); } catch { await page.locator(`#billing_last_name`).first().selectOption(`${vars.lastName ?? ''}`); }
    try { await page.locator(`#shipping_address_1`).first().fill(`${vars.street3 ?? ''}`); } catch { await page.locator(`#shipping_address_1`).first().selectOption(`${vars.street3 ?? ''}`); }
    try { await page.locator(`#shipping_city`).first().fill(`${vars.city ?? ''}`); } catch { await page.locator(`#shipping_city`).first().selectOption(`${vars.city ?? ''}`); }
    try { await page.locator(`#shipping_postcode`).first().fill(`${vars.zipCode ?? ''}`); } catch { await page.locator(`#shipping_postcode`).first().selectOption(`${vars.zipCode ?? ''}`); }
    {
      const _lbl = page.locator(`label[for="select2-shipping_state-container"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#select2-shipping_state-container`).filter({ visible: true }).first().click({ force: true }); }
    }
    await page.locator(`xpath=//li[contains(text(), "${vars.city ?? ''}")]`).filter({ visible: true }).first().click({ force: true });
    try { await page.locator(`#billing_phone`).first().fill(`${vars.phone ?? ''}`); } catch { await page.locator(`#billing_phone`).first().selectOption(`${vars.phone ?? ''}`); }
    {
      const _lbl = page.locator(`label[for="terms"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#terms`).filter({ visible: true }).first().click({ force: true }); }
    }
    await selectPayPal(page, vars);
    await blockUI(page, vars);
    await page.waitForLoadState('load');
    await checkOrderOnMyAccount(page, vars);
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
    await expect(page.locator(`.woocommerce-order-data__meta`).first()).toContainText(`${vars.paymentMethod ?? ''}`);
    await expect(page.locator(`#select2-order_status-container`).first()).toContainText(`In Bearbeitung`);
    await expect(page.locator(`div.order_data_column:nth-of-type(2) > .address > p:nth-of-type(1)`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.street3 ?? ''}
${vars.zipCode ?? ''} ${vars.city ?? ''}`);
    await expect(page.locator(`a[href*="mailto:qa+gi_order_"]`).first()).toHaveText(`${vars.email ?? ''}`);
    await expect(page.locator(`a[href*="tel:"]`).first()).toHaveText(`${vars.phone ?? ''}${vars.phone ?? ''}`);
    await expect(page.locator(`div.order_data_column:nth-of-type(3) > .address > p:nth-of-type(1)`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.street3 ?? ''}
${vars.zipCode ?? ''} ${vars.city ?? ''}`);
    await expect(page.locator(`tr.shipping > td.line_cost > .view > .woocommerce-Price-amount.amount`).first()).toHaveText(`€ 0,00`);
    await expect(page.locator(`.wc-order-data-row.wc-order-totals-items > table.wc-order-totals:nth-of-type(1) > tbody > tr:nth-of-type(2) > td.total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`€ 0,00`);
    await expect(page.locator(`.wc-order-data-row.wc-order-totals-items > table.wc-order-totals:nth-of-type(1) > tbody > tr:nth-of-type(4) > td.total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.total ?? ''}`);
    await expect(page.locator(`table.wc-order-totals:nth-of-type(2) > tbody > tr:nth-of-type(1) > td.total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.total ?? ''}`);
  });

  test('03 - Place order - Email', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await exitTest(page, vars);
    await userEmailLink(page, vars);
    await page.locator(`xpath=//a[contains(text(), "Bestellung wurde empfangen!")]`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`#body_content_inner > table.td`)).not.toHaveCount(0);
    await expect(page.locator(`tr.order_item.wooco-cart-item.wooco-cart-parent > td.td.text-align-left:nth-of-type(1)`).first()).toContainText(`${vars.prod_desc ?? ''}`);
    await expect(page.locator(`tr.order_item.wooco-cart-item.wooco-cart-parent > td.td:nth-of-type(3) > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.totalProd ?? ''}`);
    await expect(page.locator(`tr.order_item.wooco-cart-item.wooco-cart-child.wooco-item-child:nth-of-type(2) > td.td:nth-of-type(1)`).first()).toContainText(`${vars.prod_desc ?? ''} → HOME Harmonizer - M`);
    await expect(page.locator(`tr.order_item.wooco-cart-item.wooco-cart-child.wooco-item-child:nth-of-type(2) > td.td:nth-of-type(3) > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    await expect(page.locator(`tr.order_item.wooco-cart-item.wooco-cart-child.wooco-item-child:nth-of-type(3) > td.td:nth-of-type(1)`).first()).toContainText(`${vars.prod_desc ?? ''} → ${vars.prod_desc2 ?? ''}`);
    await expect(page.locator(`tr.order_item.wooco-cart-item.wooco-cart-child.wooco-item-child:nth-of-type(3) > td.td:nth-of-type(3) > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.unitPrice2 ?? ''}`);
    await expect(page.locator(`tr.order_item.wooco-cart-item.wooco-cart-child.wooco-item-child:nth-of-type(4) > td.td:nth-of-type(1)`).first()).toContainText(`${vars.prod_desc ?? ''} → ${vars.prod_desc3 ?? ''}`);
    await expect(page.locator(`tr.order_item.wooco-cart-item.wooco-cart-child.wooco-item-child:nth-of-type(4) > td.td:nth-of-type(3) > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.unitPrice3 ?? ''}`);
    await expect(page.locator(`tr.order_item.wooco-cart-item.wooco-cart-child.wooco-item-child:nth-of-type(5) > td.td:nth-of-type(1)`).first()).toContainText(`${vars.prod_desc ?? ''} → ${vars.prod_desc4 ?? ''}`);
    await expect(page.locator(`tr.order_item.wooco-cart-item.wooco-cart-child.wooco-item-child:nth-of-type(5) > td.td:nth-of-type(3) > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.unitPrice4 ?? ''}`);
    await expect(page.locator(`tr.order_item.wooco-cart-item.wooco-cart-child.wooco-item-child:nth-of-type(6) > td.td:nth-of-type(1)`).first()).toContainText(`${vars.prod_desc ?? ''} → ${vars.prod_desc5 ?? ''}`);
    await expect(page.locator(`tr.order_item.wooco-cart-item.wooco-cart-child.wooco-item-child:nth-of-type(6) > td.td:nth-of-type(3) > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.unitPrice5 ?? ''}`);
    await expect(page.locator(`tr.order-totals.order-totals-subtotal > td.td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.subtotal ?? ''}`);
    await expect(page.locator(`tr.order-totals.order-totals-shipping > td.td`).first()).toContainText(`Free shipping`);
    await expect(page.locator(`tr.order-totals.order-totals-payment_method > td.td`).first()).toContainText(`${vars.paymentMethod ?? ''}`);
    await expect(page.locator(`tr.order-totals.order-totals-total > td.td > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.total ?? ''}`);
    await expect(page.locator(`td:nth-of-type(1) > address.address`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.street3 ?? ''}
${vars.zipCode ?? ''} ${vars.city ?? ''}
Deutschland
${vars.phone ?? ''}
${vars.email ?? ''}`);
    await expect(page.locator(`td:nth-of-type(2) > address.address`).first()).toHaveText(`${vars.firstName ?? ''} ${vars.lastName ?? ''}
${vars.street3 ?? ''}
${vars.zipCode ?? ''} ${vars.city ?? ''}
Deutschland
${vars.phone ?? ''}`);
  });

  test('04 - Refund by Admin', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await exitTest(page, vars);
    await loginAdmin(page, vars);
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
    try { await page.locator(`#refund_reason`).first().fill(`Testing Refund`); } catch { await page.locator(`#refund_reason`).first().selectOption(`Testing Refund`); }
    await expect(page.locator(`button[type="button"].button.button-primary.do-api-refund > .wc-order-refund-amount > .woocommerce-Price-amount.amount`).first()).toContainText(`${vars.total ?? ''}`);
    await page.locator(`button[type="button"].button.button-primary.do-api-refund > .wc-order-refund-amount > .woocommerce-Price-amount.amount`).filter({ visible: true }).first().click({ force: true });
    await blockUI(page, vars);
    await expect(page.locator(`#select2-order_status-container`).first()).toContainText(`Rückerstattet`);
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

    await exitTest(page, vars);
    await page.goto(`https://email.ghostinspector.com/${vars.userEmailExtract ?? ''}`);
    await page.waitForLoadState('load');
    await page.locator(`xpath=//a[contains(text(), "wurde zurückerstattet")]`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`tfoot tr:nth-of-type(3) > td.td > .woocommerce-Price-amount.amount`).first()).toHaveText(`-${vars.total ?? ''}`);
    await expect(page.locator(`tfoot > tr > td.td > del`).first()).toHaveText(`${vars.total ?? ''}`);
    await expect(page.locator(`tfoot > tr > td.td > ins > .woocommerce-Price-amount.amount`).first()).toHaveText(`${vars.Symbol ?? ''} 0,00`);
  });

});
