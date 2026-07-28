// @ts-nocheck
// Auto-generated from Ghost Inspector suite: "Gruum - Basic WooCommerce Tests"
// Review all TODOs before running.
import dotenv from 'dotenv';
dotenv.config();
import { test, expect } from '@playwright/test';
import { blockUI, scrollFullPage } from '../helpers/common-steps-for-all-projects';
import { extractUserFromEmail, login, register } from '../helpers/gruum-common-steps';

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

test.describe('Gruum - Basic WooCommerce Tests', () => {

  const vars = new Proxy<Record<string, string>>({
    "payPalUser": "qa+gi_sb-8eg0v132169@saucal.com",
    "payPalPass": process.env.PAY_PAL_PASS ?? '',
    "adminUser": "saucal_maintenance_admin",
    "adminPass": process.env.ADMIN_PASS ?? '',
    "firstName": "QA",
    "lastName": `${Math.random().toString(36).substring(2, 10)}`,
    "emailReg": `gi_reg_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "email": `gi_order_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "phone": "+447412345678",
    "emailForgot": `gi_forgot_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "password": process.env.PASSWORD ?? '',
    "password2": process.env.PASSWORD2 ?? '',
    "Symbol": "£",
    "zipCode": "WC2H 7LA",
    "lastName2": `${Math.random().toString(36).substring(2, 10)}2`,
    "company2": "Shipping Inc.",
    "street4": "5th Floor",
    "street3": "30 Leicester Square",
    "countryComplete": "United Kingdom (UK)",
    "country": "UK",
    "company": "Test Inc.",
    "street": "29-30 Leicester Square",
    "street2": "Ap. 4",
    "city": "London",
    "county": "Greater London",
    "prodUrl": "https://gruum.com/",
  }, { get: (o: Record<string, string>, k: string) => (k in o ? o[k] : '') });

  test('01 - Home page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.waitForLoadState('load');
    await page.locator(`.hamburger-menu.hamburger-menu-white`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`ul#menu-fletcher-moss-menu > li.menu-item > span > a[href="/product/offer-clearance/"]`).first()).toContainText(`Clearance`);
    await expect(page.locator(`ul#menu-fletcher-moss-menu > li.menu-item > span > a[href="/product-category/new-in/"]`)).not.toHaveCount(0);
    await expect(page.locator(`ul#menu-fletcher-moss-menu > li.menu-item > span > a[href*="/skin-care/"]`)).not.toHaveCount(0);
    await expect(page.locator(`ul#menu-fletcher-moss-menu > li.menu-item > span > a[href*="/hair-care/"]`)).not.toHaveCount(0);
    await expect(page.locator(`ul#menu-fletcher-moss-menu > li.menu-item > span > a[href*="/body-care"]`)).not.toHaveCount(0);
    await expect(page.locator(`ul#menu-fletcher-moss-menu > li.menu-item > span > a[href*="/home/"]`)).not.toHaveCount(0);
    await expect(page.locator(`ul#menu-fletcher-moss-menu > li.menu-item > span > a[href*="/sun-care"]`)).not.toHaveCount(0);
    await expect(page.locator(`ul#menu-fletcher-moss-menu > li.menu-item > span > a[href*="/gift-sets/"]`)).not.toHaveCount(0);
    await expect(page.locator(`ul#menu-fletcher-moss-menu > li.menu-item > span > a[href*="/self-care"]`)).not.toHaveCount(0);
    await expect(page.locator(`ul#menu-fletcher-moss-menu > li.menu-item > span > a[href*="/shave"]`)).not.toHaveCount(0);
    await expect(page.locator(`ul#menu-fletcher-moss-menu > li.menu-item > span > a[href*="/dental"]`)).not.toHaveCount(0);
    await expect(page.locator(`ul#menu-fletcher-moss-menu > li.menu-item > span > a[href*="/beard/"]`)).not.toHaveCount(0);
    await expect(page.locator(`ul#menu-fletcher-moss-menu > li.menu-item > span > a[href*="/kids/"]`)).not.toHaveCount(0);
  });

  test('02 - About - Our mission', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.waitForLoadState('load');
    await scrollFullPage(page, vars);
    await expect(page.locator(`a[href*="/our-mission/"]`).first()).toContainText(`About us`);
    await page.locator(`a[href*="/our-mission/"]`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
  });

  test('03 - About - Reviews', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await expect(page.locator(`a[href*="/reviews/"]`).first()).toContainText(`Reviews`);
    await page.locator(`a[href*="/reviews/"]`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    {
      let _ok = false;
      if (!_ok) { try { await page.locator(`iframe[name="full-page-widget_frame"]`).first().contentFrame().locator(`iframe#reviews-widget-summon-vertical_frame .header__left`).first().click({ force: true }); _ok = true; } catch {} }
      if (!_ok) throw new Error('No clickable candidate matched');
    }
    {
      let _ok = false;
      if (!_ok) { try { await page.locator(`iframe[name="full-page-widget_frame"]`).first().contentFrame().locator(`iframe#reviews-widget-summon-vertical_frame .vw__header`).first().click({ force: true }); _ok = true; } catch {} }
      if (!_ok) throw new Error('No clickable candidate matched');
    }
    await expect(page.locator(`#h-our-reviews`).first()).toContainText(`Our reviews`);
  });

  test('04 - About - Recycling info', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await expect(page.locator(`a[href*="/recycling-information/"]`).first()).toContainText(`Recycling info`);
    await page.locator(`a[href*="/recycling-information/"]`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    await expect(page.locator(`.entry-content > div.wp-block-group.is-layout-constrained.wp-container-core-group-is-layout-86e79a2b.wp-block-group-is-layout-constrained:nth-of-type(3)`)).not.toHaveCount(0);
    await expect(page.locator(`div.wp-block-group.alignfull.has-background.is-layout-constrained.wp-block-group-is-layout-constrained:nth-of-type(4) > .wp-block-group.is-layout-constrained.wp-container-core-group-is-layout-86e79a2b.wp-block-group-is-layout-constrained`)).not.toHaveCount(0);
    await expect(page.locator(`.wp-block-sg-gutenberg-customisations-static-carousel.has-mid-grey-color.has-text-color.has-link-color.static-carousel-6-slides > .carousel.is-draggable`)).not.toHaveCount(0);
    await expect(page.locator(`div.wp-block-group.is-layout-constrained.wp-container-core-group-is-layout-86e79a2b.wp-block-group-is-layout-constrained:nth-of-type(8) > .sg-products-carousel.products-carousel-12-slides > .sg-products-carousel-inner > .inner.is-draggable`)).not.toHaveCount(0);
    await expect(page.locator(`div.wp-block-group.alignfull.has-background.is-layout-constrained.wp-block-group-is-layout-constrained:nth-of-type(10) > .wp-block-group.is-layout-constrained.wp-container-core-group-is-layout-86e79a2b.wp-block-group-is-layout-constrained > .wp-block-sg-gutenberg-customisations-static-carousel.static-carousel-6-slides > .carousel.is-draggable`)).not.toHaveCount(0);
    await expect(page.locator(`div.wp-block-group.is-layout-constrained.wp-container-core-group-is-layout-86e79a2b.wp-block-group-is-layout-constrained:nth-of-type(11) > .sg-products-carousel.products-carousel-12-slides > .sg-products-carousel-inner > .inner.is-draggable`)).not.toHaveCount(0);
  });

  test('07 - Footer', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.waitForLoadState('load');
    await expect(page.locator(`#footer-columns > div.wp-block-columns:nth-of-type(1) > div.wp-block-column.is-layout-flow.wp-block-column-is-layout-flow:nth-of-type(1)`)).not.toHaveCount(0);
    await expect(page.locator(`.wp-block-columns.column-gap-new`)).not.toHaveCount(0);
    await expect(page.locator(`footer.wp-block-template-part`)).not.toHaveCount(0);
    await expect(page.locator(`#footer-columns > div.wp-block-columns:nth-of-type(1) > div.wp-block-column.is-layout-flow.wp-block-column-is-layout-flow:nth-of-type(1)`)).not.toHaveCount(0);
    await expect(page.locator(`.wp-block-columns.column-gap-new`)).not.toHaveCount(0);
    await expect(page.locator(`footer.wp-block-template-part`)).not.toHaveCount(0);
  });

  test('08 - Category page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.waitForLoadState('load');
    await page.locator(`.hamburger-menu > svg`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`li.menu-item.menu-item-type-custom.menu-item-object-custom.menu-item-has-children:nth-of-type(1) > .menu-link-wrapper > .sub-menu-trigger > span > svg`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`xpath=//a[contains(text(), "Bestsellers")]`).or(page.locator(`.menu-link-wrapper > a[href="/product-category/bestsellers/"]`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`h1.woocommerce-products-header__title`).first()).toContainText(`Bestsellers`);
    await expect(page.locator(`nav[aria-label="Breadcrumb"]`)).not.toHaveCount(0);
    await expect(page.locator(`.page-container.clearfix`)).not.toHaveCount(0);
    await expect(page.locator(`.products.columns-5`)).not.toHaveCount(0);
    await expect(page.locator(`.row > div:nth-of-type(2)`)).not.toHaveCount(0);
    await expect(page.locator(`.container > .row > div:nth-of-type(1)`)).not.toHaveCount(0);
    await page.locator(`#product-loop > div.row > div > ul > li:nth-of-type(1)`).first().hover();
    await expect(page.locator(`#product-loop > div.row > div > ul > li:nth-of-type(1).has-subscription-plans.product.type-product.status-publish.first.instock > div:nth-of-type(2) > .product-price-wrapper.clearfix > .price > .woocommerce-Price-amount.amount > bdi`)).not.toHaveCount(0);
    await expect(page.locator(`#product-loop > div.row > div > ul > li:nth-of-type(1).has-subscription-plans.product.type-product.status-publish.first.instock> div:nth-of-type(2) > .product-purchase-options > ul > li:nth-of-type(2)`)).not.toHaveCount(0);
    await expect(page.locator(`#product-loop > div.row > div > ul > li:nth-of-type(1).has-subscription-plans.product.type-product.status-publish.first.instock > div:nth-of-type(2) > .product-price-wrapper.clearfix > .product-loop-reviews.loaded`)).not.toHaveCount(0);
  });

  test('09 - Simple Product page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.goto(`${vars.startUrl ?? ''}shop/`);
    await page.waitForLoadState('load');
    await page.locator(`li.instock.product-type-simple > a > .woocommerce-LoopProduct-image-wrapper > div:nth-of-type(2) > img`).filter({ visible: true }).first().click({ force: true });
    vars.{{prodDesc}} = ((await page.locator(`h1.product-title`).textContent()) ?? '').trim();
    vars.unitPrice = ((await page.locator(`div.product-add-to-cart-radio:nth-of-type(1) > label > .product-add-to-cart-price > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
    vars.subPrice = ((await page.locator(`.product-add-to-cart-price.product-add-to-cart-price-subscription-scheme > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
    await expect(page.locator(`#product-description > .toggle-heading`)).not.toHaveCount(0);
    await expect(page.locator(`div.toggle:nth-of-type(2) > .toggle-heading`)).not.toHaveCount(0);
    await expect(page.locator(`div.toggle:nth-of-type(3) > .toggle-heading`)).not.toHaveCount(0);
    await page.waitForLoadState('load');
  });

  test('10 - Variable Product page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.goto(`${vars.startUrl ?? ''}shop/`);
    await page.waitForLoadState('load');
    await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let element = Array.from<any>(document.querySelectorAll<HTMLAnchorElement>('li.instock.product-type-variable > a > .woocommerce-LoopProduct-image-wrapper > div:nth-of-type(2) > img'));
let viewMore = document.querySelector('#product-loop > div.row > div > div > span');
let maxAttempts = 3;
let attempts = 0;

function checkAndClick() {
    let newElements = Array.from<any>(document.querySelectorAll<HTMLAnchorElement>('li.instock.product-type-variable > a > .woocommerce-LoopProduct-image-wrapper > div:nth-of-type(2) > img'));
    if (newElements.length === 0 && attempts < maxAttempts) {
        if (viewMore) {
            viewMore.click();
            console.log('click, attempt', attempts + 1);
            attempts++;
            // Check again after a short delay to allow DOM updates
            setTimeout(checkAndClick, 5000);
        } else {
            console.log('View more element not found');
        }
    } else if (newElements.length > 0) {
        console.log('Elements found:', newElements.length);
        element = newElements; // Update the element reference
    } else {
        console.log('Max attempts reached, no elements found');
    }
}

// Initial check and start the process
if (element.length === 0 && viewMore) {
    viewMore.click();
    console.log('click, attempt 1');
    attempts++;
    setTimeout(checkAndClick, 5000); // Start checking after the first click
} else if (element.length > 0) {
    console.log('Elements already found:', element.length);
} else {
    console.log('View more element not found');
} }, vars);
    await page.locator(`li.instock.product-type-variable > a > .woocommerce-LoopProduct-image-wrapper > div:nth-of-type(2) > img`).filter({ visible: true }).first().click({ force: true });
    vars.prodDesc = ((await page.locator(`h1.product-title`).textContent()) ?? '').trim();
    vars.unitPrice = ((await page.locator(`div.product-add-to-cart-radio:nth-of-type(1) > label > .product-add-to-cart-price > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
    vars.subPrice = ((await page.locator(`.product-add-to-cart-price.product-add-to-cart-price-subscription-scheme > .woocommerce-Price-amount.amount > bdi`).or(page.locator(`div:nth-child(2) > label > div.product-add-to-cart-price`)).textContent()) ?? '').trim();
    await expect(page.locator(`#product-description > .toggle-heading`)).not.toHaveCount(0);
  });

  test('11 - Bundle Product page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.locator(`.hamburger-menu.hamburger-menu-white`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`a[href*="/product-category/gift-sets/"]`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    await page.locator(`li:nth-of-type(1) > a > .woocommerce-LoopProduct-image-wrapper > div:nth-of-type(2) > img`).filter({ visible: true }).first().click({ force: true });
    vars.prodDesc = ((await page.locator(`h1.product-title`).textContent()) ?? '').trim();
    vars.unitPrice = ((await page.locator(`.product-price > ins > .woocommerce-Price-amount.amount > bdi`).or(page.locator(`.product-price > .woocommerce-Price-amount.amount > bdi`)).textContent()) ?? '').trim();
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return document.querySelector('.bundled_product.bundled_product_summary.product.bundled_item_optional > .details > h4.bundled_product_title.product_title > .bundled_product_title_inner > .item_title')
 }, vars)) {
      vars.optionalDesc = ((await page.locator(`.bundled_product.bundled_product_summary.product.bundled_item_optional > .details > h4.bundled_product_title.product_title > .bundled_product_title_inner > .item_title`).textContent()) ?? '').trim();
    }
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return document.querySelector('.bundled_product.bundled_product_summary.product.bundled_item_optional > .details > h4.bundled_product_title.product_title > .bundled_product_title_inner > .item_title')
 }, vars)) {
      vars.optionalPrice = ((await page.locator(`.bundled-item-price > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
    }
    vars.products = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const productList = document.querySelector('.toggle-content ul');
const products = Array.from<any>(productList.querySelectorAll('li')).map(item => item.textContent.trim());
const filteredProducts = products.filter(item => !item.includes("(Optional)"));

return filteredProducts }, vars);
  });

  test('12 - Cart Page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    // ↓ 09 - Simple Product page
    await page.goto(`${vars.startUrl ?? ''}shop/`);
    await page.waitForLoadState('load');
    await page.locator(`li.instock.product-type-simple > a > .woocommerce-LoopProduct-image-wrapper > div:nth-of-type(2) > img`).filter({ visible: true }).first().click({ force: true });
    vars.{{prodDesc}} = ((await page.locator(`h1.product-title`).textContent()) ?? '').trim();
    vars.unitPrice = ((await page.locator(`div.product-add-to-cart-radio:nth-of-type(1) > label > .product-add-to-cart-price > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
    vars.subPrice = ((await page.locator(`.product-add-to-cart-price.product-add-to-cart-price-subscription-scheme > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
    await expect(page.locator(`#product-description > .toggle-heading`)).not.toHaveCount(0);
    await expect(page.locator(`div.toggle:nth-of-type(2) > .toggle-heading`)).not.toHaveCount(0);
    await expect(page.locator(`div.toggle:nth-of-type(3) > .toggle-heading`)).not.toHaveCount(0);
    await page.waitForLoadState('load');
    // ↑ end 09 - Simple Product page
    await page.locator(`div.product-add-to-cart-box:nth-of-type(2) > form[action*="/product/har-shampoo-bar-nourishing-50g/"].cart > .button-wrap > button[name="add-to-cart"][type="submit"].single_add_to_cart_button.button.alt.btn.btn-primary`).filter({ visible: true }).first().click({ force: true });
    vars.prodDesc = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const prodDesc = `${vars.prodDesc}`.replaceAll('–','-')

return prodDesc }, vars);
    await expect(page.locator(`a.product-name`).first()).toHaveText(`${vars.prodDesc ?? ''}`);
    await expect(page.locator(`.woocommerce-mini-cart-item > .product-details > .price > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    await expect(page.locator(`.price.pull-right > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    vars.freeShipping = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let unitPrice = parseFloat(`${vars.unitPrice}`.replace('£','').trim())
let freeShipping = (30 - unitPrice).toFixed(2)

return freeShipping
 }, vars);
    await expect(page.locator(`.widget_shopping_cart_content > div:nth-of-type(1) > .text`).first()).toHaveText(`Spend £${vars.freeShipping ?? ''} more for Free UK Delivery`);
    await page.locator(`a[href*="/cart/"].btn`).filter({ visible: true }).first().click({ force: true });
    vars.prodDesc = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const prodDesc = `${vars.prodDesc}`.replaceAll('-','–')

return prodDesc }, vars);
    await expect(page.locator(`td.product-name > a`).first()).toContainText(`${vars.prodDesc ?? ''}`);
    await expect(page.locator(`td.product-price > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    await page.locator(`input[type="button"].plus`).filter({ visible: true }).first().click({ force: true });
    await blockUI(page, vars);
    await expect(page.locator(`.woocommerce-message`).first()).toContainText(`Basket updated.`);
    vars.qty = `2`;
    vars.subtotal = ((await page.locator(`.one-time-option-price > .woocommerce-Price-amount.amount`).textContent()) ?? '').trim();
    await expect(page.locator(`.wcsatt-options > li.subscription-option:nth-of-type(2)`)).not.toHaveCount(0);
    await expect(page.locator(`.wcsatt-options > li.subscription-option:nth-of-type(3)`)).not.toHaveCount(0);
    await expect(page.locator(`.wcsatt-options > li.subscription-option:nth-of-type(4)`)).not.toHaveCount(0);
    await expect(page.locator(`tr.cart-subtotal > td > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.subtotal ?? ''}`);
    vars.shippingPrice = ((await page.locator(`label[for="shipping_method_0_flat_rate1"] > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
    vars.total = ((await page.locator(`strong > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const unitPrice = parseFloat(`${vars.unitPrice}`.replace('£','').trim())
const shippingPrice = parseFloat(`${vars.shippingPrice}`.replace('£','').trim())
const qty = vars.qty
const subtotal = parseFloat(`${vars.subtotal}`.replace('£','').trim())
const total2 = parseFloat((subtotal + shippingPrice).toFixed(2))
const subtotal2 = parseFloat((unitPrice * qty).toFixed(2))
const total = parseFloat(`${vars.total}`.replace('£','').trim())
return total2 === total && subtotal2 === subtotal
 }, vars)).toBeTruthy();
  });

  test('13 - Checkout page - Step 1', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    // ↓ 10 - Variable Product page
    await page.goto(`${vars.startUrl ?? ''}shop/`);
    await page.waitForLoadState('load');
    await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let element = Array.from<any>(document.querySelectorAll<HTMLAnchorElement>('li.instock.product-type-variable > a > .woocommerce-LoopProduct-image-wrapper > div:nth-of-type(2) > img'));
let viewMore = document.querySelector('#product-loop > div.row > div > div > span');
let maxAttempts = 3;
let attempts = 0;

function checkAndClick() {
    let newElements = Array.from<any>(document.querySelectorAll<HTMLAnchorElement>('li.instock.product-type-variable > a > .woocommerce-LoopProduct-image-wrapper > div:nth-of-type(2) > img'));
    if (newElements.length === 0 && attempts < maxAttempts) {
        if (viewMore) {
            viewMore.click();
            console.log('click, attempt', attempts + 1);
            attempts++;
            // Check again after a short delay to allow DOM updates
            setTimeout(checkAndClick, 5000);
        } else {
            console.log('View more element not found');
        }
    } else if (newElements.length > 0) {
        console.log('Elements found:', newElements.length);
        element = newElements; // Update the element reference
    } else {
        console.log('Max attempts reached, no elements found');
    }
}

// Initial check and start the process
if (element.length === 0 && viewMore) {
    viewMore.click();
    console.log('click, attempt 1');
    attempts++;
    setTimeout(checkAndClick, 5000); // Start checking after the first click
} else if (element.length > 0) {
    console.log('Elements already found:', element.length);
} else {
    console.log('View more element not found');
} }, vars);
    await page.locator(`li.instock.product-type-variable > a > .woocommerce-LoopProduct-image-wrapper > div:nth-of-type(2) > img`).filter({ visible: true }).first().click({ force: true });
    vars.prodDesc = ((await page.locator(`h1.product-title`).textContent()) ?? '').trim();
    vars.unitPrice = ((await page.locator(`div.product-add-to-cart-radio:nth-of-type(1) > label > .product-add-to-cart-price > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
    vars.subPrice = ((await page.locator(`.product-add-to-cart-price.product-add-to-cart-price-subscription-scheme > .woocommerce-Price-amount.amount > bdi`).or(page.locator(`div:nth-child(2) > label > div.product-add-to-cart-price`)).textContent()) ?? '').trim();
    await expect(page.locator(`#product-description > .toggle-heading`)).not.toHaveCount(0);
    // ↑ end 10 - Variable Product page
    await page.locator(`xpath=//a[contains(text(), "Tangerine")]`).or(page.locator(`a[href="#"][title="Tangerine"]`)).filter({ visible: true }).first().click({ force: true });
    vars.colour = ((await page.locator(`.attribute_pa_colour_picker_label`).textContent()) ?? '').trim();
    await page.locator(`xpath=//button[contains(text(), "Add to basket")]`).or(page.locator(`button[type="submit"].single_add_to_cart_button.button`)).filter({ visible: true }).first().click({ force: true });
    await page.locator(`a[href*="/checkout/"]`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
  });

  test('13 - Checkout page - Step 2', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    // ↓ 13 - Checkout page - Step 1
    // ↓ 10 - Variable Product page
    await page.goto(`${vars.startUrl ?? ''}shop/`);
    await page.waitForLoadState('load');
    await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let element = Array.from<any>(document.querySelectorAll<HTMLAnchorElement>('li.instock.product-type-variable > a > .woocommerce-LoopProduct-image-wrapper > div:nth-of-type(2) > img'));
let viewMore = document.querySelector('#product-loop > div.row > div > div > span');
let maxAttempts = 3;
let attempts = 0;

function checkAndClick() {
    let newElements = Array.from<any>(document.querySelectorAll<HTMLAnchorElement>('li.instock.product-type-variable > a > .woocommerce-LoopProduct-image-wrapper > div:nth-of-type(2) > img'));
    if (newElements.length === 0 && attempts < maxAttempts) {
        if (viewMore) {
            viewMore.click();
            console.log('click, attempt', attempts + 1);
            attempts++;
            // Check again after a short delay to allow DOM updates
            setTimeout(checkAndClick, 5000);
        } else {
            console.log('View more element not found');
        }
    } else if (newElements.length > 0) {
        console.log('Elements found:', newElements.length);
        element = newElements; // Update the element reference
    } else {
        console.log('Max attempts reached, no elements found');
    }
}

// Initial check and start the process
if (element.length === 0 && viewMore) {
    viewMore.click();
    console.log('click, attempt 1');
    attempts++;
    setTimeout(checkAndClick, 5000); // Start checking after the first click
} else if (element.length > 0) {
    console.log('Elements already found:', element.length);
} else {
    console.log('View more element not found');
} }, vars);
    await page.locator(`li.instock.product-type-variable > a > .woocommerce-LoopProduct-image-wrapper > div:nth-of-type(2) > img`).filter({ visible: true }).first().click({ force: true });
    vars.prodDesc = ((await page.locator(`h1.product-title`).textContent()) ?? '').trim();
    vars.unitPrice = ((await page.locator(`div.product-add-to-cart-radio:nth-of-type(1) > label > .product-add-to-cart-price > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
    vars.subPrice = ((await page.locator(`.product-add-to-cart-price.product-add-to-cart-price-subscription-scheme > .woocommerce-Price-amount.amount > bdi`).or(page.locator(`div:nth-child(2) > label > div.product-add-to-cart-price`)).textContent()) ?? '').trim();
    await expect(page.locator(`#product-description > .toggle-heading`)).not.toHaveCount(0);
    // ↑ end 10 - Variable Product page
    await page.locator(`xpath=//a[contains(text(), "Tangerine")]`).or(page.locator(`a[href="#"][title="Tangerine"]`)).filter({ visible: true }).first().click({ force: true });
    vars.colour = ((await page.locator(`.attribute_pa_colour_picker_label`).textContent()) ?? '').trim();
    await page.locator(`xpath=//button[contains(text(), "Add to basket")]`).or(page.locator(`button[type="submit"].single_add_to_cart_button.button`)).filter({ visible: true }).first().click({ force: true });
    await page.locator(`a[href*="/checkout/"]`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    // ↑ end 13 - Checkout page - Step 1
    await blockUI(page, vars);
    {
      const _lbl = page.locator(`label[for="billing_email"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#billing_email`).filter({ visible: true }).first().click({ force: true }); }
    }
    try { await page.locator(`#billing_email`).first().fill(`${vars.email ?? ''}`); } catch { await page.locator(`#billing_email`).first().selectOption(`${vars.email ?? ''}`); }
    try { await page.locator(`#billing_first_name`).first().fill(`${vars.firstName ?? ''}`); } catch { await page.locator(`#billing_first_name`).first().selectOption(`${vars.firstName ?? ''}`); }
    try { await page.locator(`#billing_last_name`).first().fill(`${vars.lastName ?? ''}`); } catch { await page.locator(`#billing_last_name`).first().selectOption(`${vars.lastName ?? ''}`); }
    try { await page.locator(`#billing_phone`).first().fill(`${vars.phone ?? ''}`); } catch { await page.locator(`#billing_phone`).first().selectOption(`${vars.phone ?? ''}`); }
    {
      const _lbl = page.locator(`label[for="createaccount"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#createaccount`).filter({ visible: true }).first().click({ force: true }); }
    }
    try { await page.locator(`#account_password`).first().fill(`${vars.password ?? ''}`); } catch { await page.locator(`#account_password`).first().selectOption(`${vars.password ?? ''}`); }
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return document.querySelector('#sgm_optin') }, vars)) {
      {
        const _lbl = page.locator(`label[for="sgm_optin"]`).filter({ visible: true });
        if (await _lbl.count() > 0) { await _lbl.first().click(); }
        else { await page.locator(`#sgm_optin`).filter({ visible: true }).first().click({ force: true }); }
      }
    }
    await page.locator(`xpath=//button[contains(text(), "Continue to address")]`).or(page.locator(`.flux-step.flux-step--1 > footer.flux-footer > button.flux-button`)).filter({ visible: true }).first().click({ force: true });
  });

  test('13 - Checkout page - Step 3', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    // ↓ 13 - Checkout page - Step 2
    // ↓ 13 - Checkout page - Step 1
    // ↓ 10 - Variable Product page
    await page.goto(`${vars.startUrl ?? ''}shop/`);
    await page.waitForLoadState('load');
    await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let element = Array.from<any>(document.querySelectorAll<HTMLAnchorElement>('li.instock.product-type-variable > a > .woocommerce-LoopProduct-image-wrapper > div:nth-of-type(2) > img'));
let viewMore = document.querySelector('#product-loop > div.row > div > div > span');
let maxAttempts = 3;
let attempts = 0;

function checkAndClick() {
    let newElements = Array.from<any>(document.querySelectorAll<HTMLAnchorElement>('li.instock.product-type-variable > a > .woocommerce-LoopProduct-image-wrapper > div:nth-of-type(2) > img'));
    if (newElements.length === 0 && attempts < maxAttempts) {
        if (viewMore) {
            viewMore.click();
            console.log('click, attempt', attempts + 1);
            attempts++;
            // Check again after a short delay to allow DOM updates
            setTimeout(checkAndClick, 5000);
        } else {
            console.log('View more element not found');
        }
    } else if (newElements.length > 0) {
        console.log('Elements found:', newElements.length);
        element = newElements; // Update the element reference
    } else {
        console.log('Max attempts reached, no elements found');
    }
}

// Initial check and start the process
if (element.length === 0 && viewMore) {
    viewMore.click();
    console.log('click, attempt 1');
    attempts++;
    setTimeout(checkAndClick, 5000); // Start checking after the first click
} else if (element.length > 0) {
    console.log('Elements already found:', element.length);
} else {
    console.log('View more element not found');
} }, vars);
    await page.locator(`li.instock.product-type-variable > a > .woocommerce-LoopProduct-image-wrapper > div:nth-of-type(2) > img`).filter({ visible: true }).first().click({ force: true });
    vars.prodDesc = ((await page.locator(`h1.product-title`).textContent()) ?? '').trim();
    vars.unitPrice = ((await page.locator(`div.product-add-to-cart-radio:nth-of-type(1) > label > .product-add-to-cart-price > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
    vars.subPrice = ((await page.locator(`.product-add-to-cart-price.product-add-to-cart-price-subscription-scheme > .woocommerce-Price-amount.amount > bdi`).or(page.locator(`div:nth-child(2) > label > div.product-add-to-cart-price`)).textContent()) ?? '').trim();
    await expect(page.locator(`#product-description > .toggle-heading`)).not.toHaveCount(0);
    // ↑ end 10 - Variable Product page
    await page.locator(`xpath=//a[contains(text(), "Tangerine")]`).or(page.locator(`a[href="#"][title="Tangerine"]`)).filter({ visible: true }).first().click({ force: true });
    vars.colour = ((await page.locator(`.attribute_pa_colour_picker_label`).textContent()) ?? '').trim();
    await page.locator(`xpath=//button[contains(text(), "Add to basket")]`).or(page.locator(`button[type="submit"].single_add_to_cart_button.button`)).filter({ visible: true }).first().click({ force: true });
    await page.locator(`a[href*="/checkout/"]`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    // ↑ end 13 - Checkout page - Step 1
    await blockUI(page, vars);
    {
      const _lbl = page.locator(`label[for="billing_email"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#billing_email`).filter({ visible: true }).first().click({ force: true }); }
    }
    try { await page.locator(`#billing_email`).first().fill(`${vars.email ?? ''}`); } catch { await page.locator(`#billing_email`).first().selectOption(`${vars.email ?? ''}`); }
    try { await page.locator(`#billing_first_name`).first().fill(`${vars.firstName ?? ''}`); } catch { await page.locator(`#billing_first_name`).first().selectOption(`${vars.firstName ?? ''}`); }
    try { await page.locator(`#billing_last_name`).first().fill(`${vars.lastName ?? ''}`); } catch { await page.locator(`#billing_last_name`).first().selectOption(`${vars.lastName ?? ''}`); }
    try { await page.locator(`#billing_phone`).first().fill(`${vars.phone ?? ''}`); } catch { await page.locator(`#billing_phone`).first().selectOption(`${vars.phone ?? ''}`); }
    {
      const _lbl = page.locator(`label[for="createaccount"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#createaccount`).filter({ visible: true }).first().click({ force: true }); }
    }
    try { await page.locator(`#account_password`).first().fill(`${vars.password ?? ''}`); } catch { await page.locator(`#account_password`).first().selectOption(`${vars.password ?? ''}`); }
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return document.querySelector('#sgm_optin') }, vars)) {
      {
        const _lbl = page.locator(`label[for="sgm_optin"]`).filter({ visible: true });
        if (await _lbl.count() > 0) { await _lbl.first().click(); }
        else { await page.locator(`#sgm_optin`).filter({ visible: true }).first().click({ force: true }); }
      }
    }
    await page.locator(`xpath=//button[contains(text(), "Continue to address")]`).or(page.locator(`.flux-step.flux-step--1 > footer.flux-footer > button.flux-button`)).filter({ visible: true }).first().click({ force: true });
    // ↑ end 13 - Checkout page - Step 2
    await blockUI(page, vars);
    try { await page.locator(`#sgwcav_postcode_lookup`).first().fill(`${vars.zipCode ?? ''}`); } catch { await page.locator(`#sgwcav_postcode_lookup`).first().selectOption(`${vars.zipCode ?? ''}`); }
    await expect(page.locator(`button[name="sgwcav_postcode_lookup_button"].disabled`)).toHaveCount(0);
    await page.locator(`xpath=//button[contains(text(), "Find Address")]`).or(page.locator(`button[name="sgwcav_postcode_lookup_button"]`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`xpath=//span[contains(text(), "Select your address to populate the form.")]`)).not.toHaveCount(0);
    await page.locator(`xpath=//span[contains(text(), "Select your address to populate the form.")]`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`xpath=//li[contains(text(), "${vars.street ?? ''}")]`).or(page.locator(`li.select2-results__option.select2-results__option--highlighted`)).filter({ visible: true }).first().click({ force: true });
    try { await page.locator(`#billing_company`).first().fill(`${vars.company ?? ''}`); } catch { await page.locator(`#billing_company`).first().selectOption(`${vars.company ?? ''}`); }
    await expect(page.locator(`#billing_address_1`).first()).toHaveText(`${vars.street ?? ''}`);
    try { await page.locator(`#billing_address_2`).first().fill(`${vars.street2 ?? ''}`); } catch { await page.locator(`#billing_address_2`).first().selectOption(`${vars.street2 ?? ''}`); }
    vars.city2 = ((await page.locator(`#billing_city`).textContent()) ?? '').trim();
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const city = `${vars.city}`.toLowerCase()
const city2 = `${vars.city2}`.toLowerCase()

return city === city2 }, vars)).toBeTruthy();
    try { await page.locator(`#billing_state`).first().fill(`${vars.county ?? ''}`); } catch { await page.locator(`#billing_state`).first().selectOption(`${vars.county ?? ''}`); }
    await expect(page.locator(`#billing_postcode`).first()).toHaveText(`${vars.zipCode ?? ''}`);
    await page.locator(`xpath=//span[contains(text(), "Ship to a different address?")]`).or(page.locator(`#ship-to-different-address > label.woocommerce-form__label.woocommerce-form__label-for-checkbox.checkbox > span:nth-of-type(2)`)).filter({ visible: true }).first().click({ force: true });
    try { await page.locator(`#shipping_first_name`).first().fill(`${vars.firstName ?? ''}`); } catch { await page.locator(`#shipping_first_name`).first().selectOption(`${vars.firstName ?? ''}`); }
    try { await page.locator(`#shipping_last_name`).first().fill(`${vars.lastName2 ?? ''}`); } catch { await page.locator(`#shipping_last_name`).first().selectOption(`${vars.lastName2 ?? ''}`); }
    try { await page.locator(`#shipping_company`).first().fill(`{{company2}`); } catch { await page.locator(`#shipping_company`).first().selectOption(`{{company2}`); }
    try { await page.locator(`#shipping_address_1`).first().fill(`${vars.street3 ?? ''}`); } catch { await page.locator(`#shipping_address_1`).first().selectOption(`${vars.street3 ?? ''}`); }
    try { await page.locator(`#shipping_address_2`).first().fill(`${vars.street4 ?? ''}`); } catch { await page.locator(`#shipping_address_2`).first().selectOption(`${vars.street4 ?? ''}`); }
    try { await page.locator(`#shipping_city`).first().fill(`${vars.city ?? ''}`); } catch { await page.locator(`#shipping_city`).first().selectOption(`${vars.city ?? ''}`); }
    try { await page.locator(`#shipping_state`).first().fill(`${vars.county ?? ''}`); } catch { await page.locator(`#shipping_state`).first().selectOption(`${vars.county ?? ''}`); }
    try { await page.locator(`#shipping_postcode`).first().fill(`${vars.zipCode ?? ''}`); } catch { await page.locator(`#shipping_postcode`).first().selectOption(`${vars.zipCode ?? ''}`); }
    await page.locator(`xpath=//button[contains(text(), "Continue to payment")]`).or(page.locator(`.flux-step.flux-step--2 > footer.flux-footer > button.flux-button`)).filter({ visible: true }).first().click({ force: true });
  });

  test('14 - Register, My Account links and Login', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    if (vars.startUrl === vars.prodUrl) {
      // TODO: command="exit" target="" value="passing"
    }
    vars.username = `${vars.emailReg ?? ''}`;
    vars.pass = `${vars.password ?? ''}`;
    await register(page, vars);
    await page.waitForLoadState('load');
    await page.locator(`a[href*="/my-account/subscriptions/"]`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.row > div > .woocommerce-info`).first()).toContainText(`No results.`);
    await page.locator(`.back-link > a[href*="/my-account/"]`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`a[href*="/my-account/edit-account/"]`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.woocommerce-edit-account-form-inner`)).not.toHaveCount(0);
    await page.locator(`.back-link > a[href*="/my-account/"]`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`a[href*="/my-account/edit-address/"]`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`div.woocommerce-Address:nth-of-type(1) > .woocommerce-Address-inner`)).not.toHaveCount(0);
    await expect(page.locator(`div.woocommerce-Address:nth-of-type(2) > .woocommerce-Address-inner`)).not.toHaveCount(0);
    await page.locator(`.back-link > a[href*="/my-account/"]`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`a[href*="/my-account/payment-methods/"]`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`a[href*="/my-account/add-payment-method/"]`).first()).toContainText(`Add payment method`);
    await page.locator(`.back-link > a[href*="/my-account/"]`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`i.i-order-history`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.woocommerce-message`)).not.toHaveCount(0);
    await page.locator(`.back-link > a[href*="/my-account/"]`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`a[href*="https://support.gruum.com/"]`)).not.toHaveCount(0);
    await expect(page.locator(`.inner > h3`).first()).toContainText(`You don’t have an active subscription`);
    await expect(page.locator(`a[href="/gruum-plan/"]`).first()).toContainText(`Start a new subscription`);
    await page.locator(`a[href*="/my-account/customer-logout/"]`).filter({ visible: true }).first().click({ force: true });
    try {
      await page.locator(`xpath=//a[contains(text(), "Confirm and log out")]`).or(page.locator(`a[href*="/wp-login.php?action=logout&redirect_to="]`)).filter({ visible: true }).first().click({ force: true });
    } catch { /* optional step: click */ }
    await expect(page.locator(`div:nth-of-type(1) > .bordered_box_div`)).not.toHaveCount(0);
    await login(page, vars);
  });

  test('15 - Forgot Email Flow', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    if (vars.startUrl === vars.prodUrl) {
      // TODO: command="exit" target="" value="passing"
    }
    vars.username = `${vars.emailForgot ?? ''}`;
    vars.pass = `${vars.password ?? ''}`;
    await register(page, vars);
    await page.waitForLoadState('load');
    await page.locator(`a[href*="/my-account/customer-logout/"]`).filter({ visible: true }).first().click({ force: true });
    try {
      if (false) {
        await page.locator(`xpath=//a[contains(text(), "Confirm and log out")]`).or(page.locator(`a[href*="/wp-login.php?action=logout&redirect_to=https%3A%2F%2Fsaucal.gruum.it%2Fmy-account%2F&_wpnonce="]`)).filter({ visible: true }).first().click({ force: true });
      }
    } catch { /* optional step: click */ }
    await page.locator(`xpath=//a[contains(text(), "Forgot your password or email address?")]`).or(page.locator(`a[href*="/my-account/lost-password/"]`)).filter({ visible: true }).first().click({ force: true });
    try { await page.locator(`#user_login`).first().fill(`${vars.username ?? ''}`); } catch { await page.locator(`#user_login`).first().selectOption(`${vars.username ?? ''}`); }
    await page.locator(`xpath=//button[contains(text(), "Reset password")]`).or(page.locator(`button[type="submit"].woocommerce-Button`)).filter({ visible: true }).first().click({ force: true });
    await page.waitForTimeout(10000);
    await page.waitForLoadState('load');
    await expect(page.locator(`.woocommerce-message`).first()).toContainText(`If the provided email is valid, you will recieve a password reset email.`);
    await expect(page.locator(`.bordered_box_div > p`).first()).toContainText(`A password reset email has been sent to the email address on file for your account, but may take several minutes to show up in your inbox. Please wait at least 10 minutes before attempting another reset.`);
    await extractUserFromEmail(page, vars);
    await page.locator(`xpath=//a[contains(text(), "Password Reset for grüum")]`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`xpath=//a[contains(text(), "Reset your password")]`).or(page.locator(`#body_content_inner > div > p:nth-child(7) > a`)).filter({ visible: true }).first().click({ force: true });
    {
      const _lbl = page.locator(`label[for="password_1"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#password_1`).filter({ visible: true }).first().click({ force: true }); }
    }
    try { await page.locator(`#password_1`).first().fill(`${vars.password2 ?? ''}`); } catch { await page.locator(`#password_1`).first().selectOption(`${vars.password2 ?? ''}`); }
    try { await page.locator(`#password_2`).first().fill(`${vars.password2 ?? ''}`); } catch { await page.locator(`#password_2`).first().selectOption(`${vars.password2 ?? ''}`); }
    vars.pass = `${vars.password2 ?? ''}`;
    await page.locator(`xpath=//button[contains(text(), "Save")]`).or(page.locator(`button[type="submit"].woocommerce-Button`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.woocommerce-message`).first()).toContainText(`Your password has been reset successfully.`);
    await page.locator(`a[href*="/my-account/customer-logout/"]`).filter({ visible: true }).first().click({ force: true });
    await page.waitForTimeout(3000);
    if (false) {
      await page.locator(`xpath=//a[contains(text(), "Confirm and log out")]`).or(page.locator(`a[href*="/wp-login.php?action=logout&redirect_to="]`)).filter({ visible: true }).first().click({ force: true });
    }
    await login(page, vars);
  });

});
