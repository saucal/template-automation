// @ts-nocheck
// Auto-generated from Ghost Inspector suite: "Biogeta - Basic WooCommerce tests"
// Review all TODOs before running.
import dotenv from 'dotenv';
dotenv.config();
import { test, expect } from '@playwright/test';
import { closeLanguageChange, exitTest, login, logout, register, userEmailLink } from '../helpers/biogeta-common-steps';

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

test.describe('Biogeta - Basic WooCommerce tests', () => {

  const vars = new Proxy<Record<string, string>>({
    "email": `qa+gi_order_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "emailReg": `qa+gi_reg_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "emailForgot": `qa+gi_forgot_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "payPalUser": "qa+gi_sb-8eg0v132169@saucal.com",
    "payPalPass": process.env.PAY_PAL_PASS ?? '',
    "adminUser": "saucal_maintenance_admin",
    "adminPass": process.env.ADMIN_PASS ?? '',
    "Symbol": "€",
    "password": process.env.PASSWORD ?? '',
    "password2": process.env.PASSWORD2 ?? '',
    "prodUrl": "https://biogeta.com/de/",
  }, { get: (o: Record<string, string>, k: string) => (k in o ? o[k] : '') });

  test('01 - Home page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.waitForLoadState('load');
    await closeLanguageChange(page, vars);
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let url = window.location.href

return url.includes(`${vars.startUrl}de/`) }, vars)).toBeTruthy();
  });

  test('01 - Home page - Language detected', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.waitForLoadState('load');
    await expect(page.locator(`[id="en_US"].trp-ls-shortcode-current-language`).first()).toBeVisible();
    {
      const _lbl = page.locator(`label[for="trp_ald_popup_change_language"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`xpath=//a[contains(text(), "Change Language")]`).or(page.locator(`#trp_ald_popup_change_language`)).filter({ visible: true }).first().click({ force: true }); }
    }
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const url = window.location.href

return url.includes(`${vars.startUrl}en/`) }, vars)).toBeTruthy();
  });

  test('02 - Products page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.waitForLoadState('load');
    await page.locator(`#menu-1-ad71c0e > li.menu-item.menu-item-type-post_type.menu-item-object-page:nth-of-type(1) > a[href*="/de/shop/"].elementor-item`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`section.elementor-section.elementor-top-section.elementor-element.elementor-section-boxed.elementor-section-height-default.elementor-section-height-default:nth-of-type(6) > .elementor-container.elementor-column-gap-default > .elementor-column.elementor-top-column.elementor-element > .elementor-widget-wrap.elementor-element-populated`)).not.toHaveCount(0);
    await expect(page.locator(`section.elementor-section.elementor-top-section.elementor-element.elementor-section-boxed.elementor-section-height-default.elementor-section-height-default:nth-of-type(6) > .elementor-container.elementor-column-gap-default > .elementor-column.elementor-top-column.elementor-element > .elementor-widget-wrap.elementor-element-populated > section.elementor-section.elementor-inner-section.elementor-element.elementor-section-boxed.elementor-section-height-default.elementor-section-height-default:nth-of-type(1) > .elementor-container.elementor-column-gap-default > div.elementor-column.elementor-inner-column.elementor-element:nth-of-type(1)`)).not.toHaveCount(0);
    await expect(page.locator(`section.elementor-section.elementor-top-section.elementor-element.elementor-section-boxed.elementor-section-height-default.elementor-section-height-default:nth-of-type(6) > .elementor-container.elementor-column-gap-default > .elementor-column.elementor-top-column.elementor-element > .elementor-widget-wrap.elementor-element-populated > section.elementor-section.elementor-inner-section.elementor-element.elementor-section-boxed.elementor-section-height-default.elementor-section-height-default:nth-of-type(1) > .elementor-container.elementor-column-gap-default > div.elementor-column.elementor-inner-column.elementor-element:nth-of-type(1) > .elementor-widget-wrap.elementor-element-populated`)).not.toHaveCount(0);
    await expect(page.locator(`a[href="/produkt/biogeta-home-harmonizer/"] > .elementor-button-content-wrapper > .elementor-button-text`).first()).toContainText(`Zum Produkt`);
    await expect(page.locator(`.elementor-section.elementor-inner-section.elementor-element.elementor-element-e78df51 > .elementor-container.elementor-column-gap-default > div.elementor-column.elementor-inner-column.elementor-element:nth-of-type(1) > .elementor-widget-wrap.elementor-element-populated`)).not.toHaveCount(0);
    await expect(page.locator(`.elementor-section.elementor-top-section.elementor-element.elementor-element-71c9a21 > .elementor-container.elementor-column-gap-default > .elementor-column.elementor-top-column.elementor-element > .elementor-widget-wrap.elementor-element-populated`)).not.toHaveCount(0);
  });

  test('04 - Product page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.goto(`${vars.startUrl ?? ''}produkt/balance-waver/`);
    await page.waitForLoadState('load');
    vars.prod_desc = ((await page.locator(`h1.product_title`).textContent()) ?? '').trim();
    vars.unitPrice = ((await page.locator(`.woocommerce-Price-amount > bdi`).textContent()) ?? '').trim();
    await expect(page.locator(`button[name="add-to-cart"]`).first()).toBeVisible();
  });

  test('05 - Smart Composite product', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

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
  });

  test('06 - Cart page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    vars.qty = `2`;
    // ↓ 04 - Product page
    await page.goto(`${vars.startUrl ?? ''}produkt/balance-waver/`);
    await page.waitForLoadState('load');
    vars.prod_desc = ((await page.locator(`h1.product_title`).textContent()) ?? '').trim();
    vars.unitPrice = ((await page.locator(`.woocommerce-Price-amount > bdi`).textContent()) ?? '').trim();
    await expect(page.locator(`button[name="add-to-cart"]`).first()).toBeVisible();
    // ↑ end 04 - Product page
    try { await page.locator(`input[name="quantity"]`).first().fill(`${vars.qty ?? ''}`); } catch { await page.locator(`input[name="quantity"]`).first().selectOption(`${vars.qty ?? ''}`); }
    await page.locator(`xpath=//button[contains(text(), "Add to cart")]`).or(page.locator(`button[name="add-to-cart"]`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.woocommerce-message`).first()).toContainText(`${vars.qty ?? ''} × „${vars.prod_desc ?? ''}“ wurden deinem Warenkorb hinzugefügt.`);
    await expect(page.locator(`a.fkcart-item-title`).first()).toContainText(`${vars.prod_desc ?? ''}`);
    vars.subtotal = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let unitPrice = parseFloat(`${vars.unitPrice}`.replace(`${vars.Symbol}`,'').replace('.','').replace(',','.').trim())
let qty = vars.qty
let subtotal = (unitPrice * qty).toFixed(2)

let formattedSubtotal = `€ ${parseFloat(subtotal).toLocaleString('de-DE', { 
  minimumFractionDigits: 2, 
  maximumFractionDigits: 2 
})}`.replace('.', '#').replace(',', ',').replace('#', '.');

return formattedSubtotal }, vars);
    await expect(page.locator(`div.fkcart-item-price > ins > .woocommerce-Price-amount.amount`).or(page.locator(`div.fkcart-item-price > .woocommerce-Price-amount.amount`)).first()).toHaveText(`${vars.subtotal ?? ''}`);
    await expect(page.locator(`div.fkcart-summary-amount > strong > .woocommerce-Price-amount.amount`)).not.toHaveCount(0);
  });

  test('07 - Checkout page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

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
  });

  test('08 - Consultation page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.locator(`#menu-1-ad71c0e > li.menu-item.menu-item-type-post_type.menu-item-object-page:nth-of-type(2) > a[href*="/de/beratung/"].elementor-item`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
  });

  test('09 - Testimonials page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.locator(`#menu-1-ad71c0e > li.menu-item.menu-item-type-post_type.menu-item-object-page:nth-of-type(3) > a[href*="/de/erfahrungen-feedback/"].elementor-item`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
  });

  test('10 - Affiliate page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.locator(`.elementor-column.elementor-top-column.elementor-element.elementor-element-eb73e4e > .elementor-widget-wrap.elementor-element-populated > div.elementor-element.elementor-icon-list--layout-inline.elementor-align-left.elementor-list-item-link-full_width.elementor-widget.elementor-widget-icon-list:nth-of-type(1) > .elementor-widget-container > .elementor-icon-list-items.elementor-inline-items > li.elementor-icon-list-item.elementor-inline-item:nth-of-type(1) > a[href="/3-level-partnerprogramm/"] > .elementor-icon-list-text`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
  });

  test('11 - Shipping page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.locator(`.elementor-column.elementor-top-column.elementor-element.elementor-element-eb73e4e > .elementor-widget-wrap.elementor-element-populated > div.elementor-element.elementor-icon-list--layout-inline.elementor-align-left.elementor-list-item-link-full_width.elementor-widget.elementor-widget-icon-list:nth-of-type(1) > .elementor-widget-container > .elementor-icon-list-items.elementor-inline-items > li.elementor-icon-list-item.elementor-inline-item:nth-of-type(2) > a[href="/versand-rueckgabe/"] > .elementor-icon-list-text`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
  });

  test('12 - Register, My Account links, Login', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await exitTest(page, vars);
    await register(page, vars);
    await userEmailLink(page, vars);
    await page.locator(`xpath=//a[contains(text(),'Konto wurde erstellt')]`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`#body_content_inner > p:nth-child(3) > a`).or(page.locator(`#body_content_inner > div > p:nth-child(5) > a`)).filter({ visible: true }).first().click({ force: true });
    try { await page.locator(`#password_1`).first().fill(`${vars.password ?? ''}`); } catch { await page.locator(`#password_1`).first().selectOption(`${vars.password ?? ''}`); }
    try { await page.locator(`#password_2`).first().fill(`${vars.password ?? ''}`); } catch { await page.locator(`#password_2`).first().selectOption(`${vars.password ?? ''}`); }
    await page.locator(`xpath=//button[contains(text(), "Speichern")]`).or(page.locator(`button[type="submit"].woocommerce-Button`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.woocommerce-message`).first()).toContainText(`Dein Passwort wurde erfolgreich zurückgesetzt.`);
    await page.locator(`.woocommerce-MyAccount-navigation-link > a[href*="/orders/"]`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.woocommerce-info`).first()).toContainText(`Es wurde noch keine Bestellung aufgegeben.`);
    await page.locator(`a[href*="/downloads/"]`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.woocommerce-info`).first()).toContainText(`Noch keine Downloads verfügbar.`);
    await page.locator(`a[href*="/edit-address/"]`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.u-columns`)).not.toHaveCount(0);
    await page.locator(`a[href*="/payment-methods/"]`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.woocommerce-info`).first()).toContainText(`Keine gespeicherten Zahlungsarten gefunden.`);
    await page.locator(`a[href*="/edit-account/"]`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`form.woocommerce-EditAccountForm > p.woocommerce-form-row.form-row:nth-of-type(4)`)).not.toHaveCount(0);
    await logout(page, vars);
    await login(page, vars);
  });

  test('13 - Forgot password flow', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await exitTest(page, vars);
    vars.email = `${vars.emailForgot ?? ''}`;
    await register(page, vars);
    await logout(page, vars);
    await page.locator(`xpath=//a[contains(text(), "Passwort vergessen?")]`).or(page.locator(`a[href*="/de/mein-konto/lost-password/"]`)).filter({ visible: true }).first().click({ force: true });
    try { await page.locator(`#user_login`).first().fill(`${vars.email ?? ''}`); } catch { await page.locator(`#user_login`).first().selectOption(`${vars.email ?? ''}`); }
    await page.locator(`xpath=//button[contains(text(), "Passwort zurücksetzen")]`).or(page.locator(`button[type="submit"].woocommerce-Button`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.woocommerce-message`).first()).toContainText(`Es wurde eine E-Mail zum Zurücksetzen des Passworts versandt.`);
    await page.waitForTimeout(30000);
    await userEmailLink(page, vars);
    await page.locator(`xpath=//a[contains(text(),'Passwort')]`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`#body_content_inner > p:nth-child(5) > a`).or(page.locator(`#body_content_inner > div > p:nth-child(7) > a`)).filter({ visible: true }).first().click({ force: true });
    try { await page.locator(`#password_1`).first().fill(`${vars.password2 ?? ''}`); } catch { await page.locator(`#password_1`).first().selectOption(`${vars.password2 ?? ''}`); }
    try { await page.locator(`#password_2`).first().fill(`${vars.password2 ?? ''}`); } catch { await page.locator(`#password_2`).first().selectOption(`${vars.password2 ?? ''}`); }
    await page.locator(`xpath=//button[contains(text(), "Speichern")]`).or(page.locator(`button[type="submit"].woocommerce-Button`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.woocommerce-message`).first()).toContainText(`Dein Passwort wurde erfolgreich zurückgesetzt.`);
  });

});
