// @ts-nocheck
// Auto-generated from Ghost Inspector suite: "DollarTabs - Basic WooCommerce tests"
// Review all TODOs before running.
import dotenv from 'dotenv';
dotenv.config();
import { test, expect } from '@playwright/test';
import { extractUserFromEmail, login, registration, under21Age } from '../helpers/dollartabs-common-steps-for-project';
import { extractUserFromEmail, registration, under18Age } from '../helpers/simply7oh-common-steps-for-project';

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

test.describe('DollarTabs - Basic WooCommerce tests', () => {

  const vars = new Proxy<Record<string, string>>({
    "email": `qa+gi_order_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "emailReg": `qa+gi_reg_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "emailForgot": `qa+gi_forgot_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "payPalUser": "qa+gi_sb-8eg0v132169@saucal.com",
    "payPalPass": process.env.PAY_PAL_PASS ?? '',
    "adminUser": "saucal_maintenance_admin",
    "adminPass": process.env.ADMIN_PASS ?? '',
    "password": process.env.PASSWORD ?? '',
    "password2": process.env.PASSWORD2 ?? '',
    "firstName": "QA",
    "lastName": `${Math.random().toString(36).substring(2, 10)}`,
  }, { get: (o: Record<string, string>, k: string) => (k in o ? o[k] : '') });

  test('01 - Home page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await under21Age(page, vars);
    await expect(page.locator(`.products.eael-post-appender`)).not.toHaveCount(0);
  });

  test('02 - Header', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await under21Age(page, vars);
    await expect(page.locator(`#ast-hf-menu-1 > .menu-item.menu-item-type-post_type.menu-item-object-page.menu-item-home.current-menu-item.page_item.current_page_item > a[href*="/"].menu-link > .menu-text`).first()).toContainText(`HOME`);
    await expect(page.locator(`#ast-hf-menu-1 > li.menu-item.menu-item-type-post_type.menu-item-object-page:nth-of-type(2) > a[href*="/my-account-2/"].menu-link > .menu-text`).first()).toContainText(`ACCOUNT`);
    await expect(page.locator(`#ast-hf-menu-1 > li.menu-item.menu-item-type-post_type.menu-item-object-page:nth-of-type(3) > a[href*="/contact/"].menu-link > .menu-text`).first()).toContainText(`CONTACT`);
    await expect(page.locator(`#ast-hf-menu-1 > li.menu-item.menu-item-type-post_type.menu-item-object-page:nth-of-type(4) > a[href*="/disclaimer/"].menu-link > .menu-text`).first()).toContainText(`DISCLAIMER`);
    await expect(page.locator(`.site-primary-header-wrap.ast-container > div > .site-header-primary-section-right.site-header-section > .ast-builder-layout-element.ast-header-woo-cart > .ast-site-header-cart.ast-menu-cart-with-border.ast-menu-cart-outline > .ast-site-header-cart-li > a[href*="/cart-2/"][aria-label="View Shopping Cart, empty"].cart-container > .ast-addon-cart-wrap > i.astra-icon > .ast-icon.icon-bag > svg[id="ast-bag-icon-svg"]`)).not.toHaveCount(0);
    await expect(page.locator(`.site-primary-header-wrap.ast-container > div > .site-header-primary-section-right.site-header-section > .ast-builder-layout-element.ast-header-woo-cart > .ast-site-header-cart.ast-menu-cart-with-border.ast-menu-cart-outline > .ast-site-header-cart-li > a[href*="/cart-2/"][aria-label="View Shopping Cart, empty"].cart-container > .ast-addon-cart-wrap > i.astra-icon`)).not.toHaveCount(0);
  });

  test('03 - Footer', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await under21Age(page, vars);
  });

  test('05 - Simple product page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await under21Age(page, vars);
    await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const addToCartButtons = Array.from<any>(document.querySelectorAll(
  'li.product:has(.star-rating:not(.eael-star-rating)) .product_type_simple.add_to_cart_button'
))[0];

const titleLink = addToCartButtons.closest('li.product').querySelector('.eael-product-title > a')

titleLink.click()
 }, vars);
    await expect(page.locator(`.woocommerce-product-rating`)).not.toHaveCount(0);
    vars.prod_desc = ((await page.locator(`h1.product_title`).textContent()) ?? '').trim();
    vars.unitPrice = ((await page.locator(`div.summary.entry-summary > .price > ins > .woocommerce-Price-amount.amount > bdi`).or(page.locator(`div.summary.entry-summary > .price > .woocommerce-Price-amount.amount > bdi`)).textContent()) ?? '').trim();
  });

  test('06 - Variable product page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await under21Age(page, vars);
    await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const addToCartButtons = Array.from<any>(document.querySelectorAll(
  'li.product:has(.star-rating:not(.eael-star-rating)) .product_type_variable.add_to_cart_button'
))[0];

const titleLink = addToCartButtons.closest('li.product').querySelector('.eael-product-title > a')

titleLink.click()
 }, vars);
    await expect(page.locator(`.woocommerce-product-rating`)).not.toHaveCount(0);
    await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); 
    return new Promise(async (resolve,reject) => {
  const form = document.querySelector<HTMLFormElement>('form.variations_form');
    if (!form) {
        console.error("No variations form found");
        reject(new Error("No variations form found"));
        return;
    }

    const selects = Array.from<any>(form.querySelectorAll('select[name^="attribute_"]'));
    if (selects.length === 0) {
        console.error("No attribute dropdowns found");
        reject(new Error("No attribute dropdowns found"));
        return;
    }

    console.log(`Found ${selects.length} attribute dropdown(s)`);

    // Reset everything first
    form.querySelector('.reset_variations')?.click();
    await new Promise(r => setTimeout(r, 400)); // give Woo time to reset

    // Prepare list of options for each select (skip the empty first option)
    const optionsPerSelect = Array.from<any>(selects).map(sel => {
        return Array.from<any>(sel.options)
            .filter(opt => opt.value !== "")   // skip "Choose …"
            .map(opt => ({ value: opt.value, text: opt.textContent.trim() }));
    });

    console.log("Options per attribute:", optionsPerSelect.map(arr => arr.length));

    // We'll do a simple nested loop / recursive try (depth = number of attributes)
    let found = false;
    let attempts = 0;
    const maxAttempts = 300; // safety limit

    async function tryCombination(currentIndex, currentValues) {
        if (found) return;
        if (attempts++ > maxAttempts) {
            console.warn("Reached max attempts — probably no in-stock variation");
            reject(new Error("Reached max attempts — probably no in-stock variation"));
            return;
        }

        if (currentIndex === selects.length) {
            // full combination selected → check stock
            await new Promise(r => setTimeout(r, 600)); // WooCommerce needs ~300-800ms to update DOM

            const outOfStockEl = form.querySelector('.woocommerce-variation-availability .stock.out-of-stock, .stock.outofstock');

            if (!outOfStockEl) {
                // No out-of-stock element → we have stock!
                found = true;

                console.log("%cFOUND IN-STOCK COMBINATION after " + attempts + " tries!", "color:lime;font-weight:bold;font-size:16px");

                // Show what we selected
                currentValues.forEach((val, i) => {
                    const label = selects[i].previousElementSibling?.textContent.trim() || selects[i].name;
                    console.log(`  • ${label}: ${val.text} (${val.value})`);
                });

                // Optional: highlight the selects
                selects.forEach((sel, i) => {
                    sel.value = currentValues[i].value;
                    sel.dispatchEvent(new Event('change', { bubbles: true }));
                });

                // You can stop here — or continue if you want all in-stock combos
                resolve();
            } else {
                console.log(`Attempt ${attempts}: out of stock`);
            }
            return;
        }

        // Try each option in current dropdown
        for (const opt of optionsPerSelect[currentIndex]) {
            if (found) break;

            // Select it
            selects[currentIndex].value = opt.value;
            selects[currentIndex].dispatchEvent(new Event('change', { bubbles: true }));

            // Recurse to next attribute
            await tryCombination(currentIndex + 1, [...currentValues, opt]);
        }
    }

    console.log("Starting search for in-stock variation...");

    await tryCombination(0, []);

    if (!found) {
        console.error("No in-stock variation found after checking many combinations");
        reject(new Error("No in-stock variation found after checking many combinations"));
    }
}) }, vars);
    vars.variable = ((await page.locator(`table.variations select`).textContent()) ?? '').trim();
    vars.prod_desc = ((await page.locator(`h1.product_title`).textContent()) ?? '').trim();
    vars.unitPrice = ((await page.locator(`.woocommerce-variation-price > .price > ins > .woocommerce-Price-amount.amount > bdi`).or(page.locator(`.woocommerce-variation-price > .price > .woocommerce-Price-amount.amount > bdi`)).or(page.locator(`.summary.entry-summary .price > ins > .woocommerce-Price-amount.amount > bdi`)).or(page.locator(`.summary.entry-summary .price > .woocommerce-Price-amount.amount > bdi`)).textContent()) ?? '').trim();
  });

  test('07 - Cart page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    if (vars.product === 'simple' || vars.product === '') {
      // ↓ 05 - Simple product page
      await under21Age(page, vars);
      await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const addToCartButtons = Array.from<any>(document.querySelectorAll(
  'li.product:has(.star-rating:not(.eael-star-rating)) .product_type_simple.add_to_cart_button'
))[0];

const titleLink = addToCartButtons.closest('li.product').querySelector('.eael-product-title > a')

titleLink.click()
 }, vars);
      await expect(page.locator(`.woocommerce-product-rating`)).not.toHaveCount(0);
      vars.prod_desc = ((await page.locator(`h1.product_title`).textContent()) ?? '').trim();
      vars.unitPrice = ((await page.locator(`div.summary.entry-summary > .price > ins > .woocommerce-Price-amount.amount > bdi`).or(page.locator(`div.summary.entry-summary > .price > .woocommerce-Price-amount.amount > bdi`)).textContent()) ?? '').trim();
      // ↑ end 05 - Simple product page
    }
    if (vars.product === 'variable') {
      // ↓ 06 - Variable product page
      await under21Age(page, vars);
      await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const addToCartButtons = Array.from<any>(document.querySelectorAll(
  'li.product:has(.star-rating:not(.eael-star-rating)) .product_type_variable.add_to_cart_button'
))[0];

const titleLink = addToCartButtons.closest('li.product').querySelector('.eael-product-title > a')

titleLink.click()
 }, vars);
      await expect(page.locator(`.woocommerce-product-rating`)).not.toHaveCount(0);
      await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); 
    return new Promise(async (resolve,reject) => {
  const form = document.querySelector<HTMLFormElement>('form.variations_form');
    if (!form) {
        console.error("No variations form found");
        reject(new Error("No variations form found"));
        return;
    }

    const selects = Array.from<any>(form.querySelectorAll('select[name^="attribute_"]'));
    if (selects.length === 0) {
        console.error("No attribute dropdowns found");
        reject(new Error("No attribute dropdowns found"));
        return;
    }

    console.log(`Found ${selects.length} attribute dropdown(s)`);

    // Reset everything first
    form.querySelector('.reset_variations')?.click();
    await new Promise(r => setTimeout(r, 400)); // give Woo time to reset

    // Prepare list of options for each select (skip the empty first option)
    const optionsPerSelect = Array.from<any>(selects).map(sel => {
        return Array.from<any>(sel.options)
            .filter(opt => opt.value !== "")   // skip "Choose …"
            .map(opt => ({ value: opt.value, text: opt.textContent.trim() }));
    });

    console.log("Options per attribute:", optionsPerSelect.map(arr => arr.length));

    // We'll do a simple nested loop / recursive try (depth = number of attributes)
    let found = false;
    let attempts = 0;
    const maxAttempts = 300; // safety limit

    async function tryCombination(currentIndex, currentValues) {
        if (found) return;
        if (attempts++ > maxAttempts) {
            console.warn("Reached max attempts — probably no in-stock variation");
            reject(new Error("Reached max attempts — probably no in-stock variation"));
            return;
        }

        if (currentIndex === selects.length) {
            // full combination selected → check stock
            await new Promise(r => setTimeout(r, 600)); // WooCommerce needs ~300-800ms to update DOM

            const outOfStockEl = form.querySelector('.woocommerce-variation-availability .stock.out-of-stock, .stock.outofstock');

            if (!outOfStockEl) {
                // No out-of-stock element → we have stock!
                found = true;

                console.log("%cFOUND IN-STOCK COMBINATION after " + attempts + " tries!", "color:lime;font-weight:bold;font-size:16px");

                // Show what we selected
                currentValues.forEach((val, i) => {
                    const label = selects[i].previousElementSibling?.textContent.trim() || selects[i].name;
                    console.log(`  • ${label}: ${val.text} (${val.value})`);
                });

                // Optional: highlight the selects
                selects.forEach((sel, i) => {
                    sel.value = currentValues[i].value;
                    sel.dispatchEvent(new Event('change', { bubbles: true }));
                });

                // You can stop here — or continue if you want all in-stock combos
                resolve();
            } else {
                console.log(`Attempt ${attempts}: out of stock`);
            }
            return;
        }

        // Try each option in current dropdown
        for (const opt of optionsPerSelect[currentIndex]) {
            if (found) break;

            // Select it
            selects[currentIndex].value = opt.value;
            selects[currentIndex].dispatchEvent(new Event('change', { bubbles: true }));

            // Recurse to next attribute
            await tryCombination(currentIndex + 1, [...currentValues, opt]);
        }
    }

    console.log("Starting search for in-stock variation...");

    await tryCombination(0, []);

    if (!found) {
        console.error("No in-stock variation found after checking many combinations");
        reject(new Error("No in-stock variation found after checking many combinations"));
    }
}) }, vars);
      vars.variable = ((await page.locator(`table.variations select`).textContent()) ?? '').trim();
      vars.prod_desc = ((await page.locator(`h1.product_title`).textContent()) ?? '').trim();
      vars.unitPrice = ((await page.locator(`.woocommerce-variation-price > .price > ins > .woocommerce-Price-amount.amount > bdi`).or(page.locator(`.woocommerce-variation-price > .price > .woocommerce-Price-amount.amount > bdi`)).or(page.locator(`.summary.entry-summary .price > ins > .woocommerce-Price-amount.amount > bdi`)).or(page.locator(`.summary.entry-summary .price > .woocommerce-Price-amount.amount > bdi`)).textContent()) ?? '').trim();
      // ↑ end 06 - Variable product page
    }
    await page.locator(`xpath=//button[contains(text(), "Add to cart")]`).or(page.locator(`button[name="add-to-cart"]`)).filter({ visible: true }).first().click({ force: true });
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector('.woocommerce-message')

return !!element }, vars)) {
      await expect(page.locator(`.woocommerce-message`).first()).toContainText(`${vars.prod_desc ?? ''}`);
    }
    vars.prod_desc = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const prod_desc = `${vars.prod_desc}`.replaceAll('–','-')

return prod_desc }, vars);
    await page.locator(`#ast-desktop-header > div.ast-main-header-wrap.main-header-bar-wrap > div > div > div > div.site-header-primary-section-right.site-header-section.ast-flex.ast-grid-right-section > div.ast-builder-layout-element.site-header-focus-item.ast-header-woo-cart > div > div.ast-site-header-cart-li > a > div > i > span.ast-icon.icon-bag`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.woocommerce.widget_shopping_cart`)).not.toHaveCount(0);
    await expect(page.locator(`div.ast-product-name`).first()).toContainText(`${vars.prod_desc ?? ''}`);
    await expect(page.locator(`#astra-mobile-cart-drawer > div.astra-cart-drawer-content > div > div > ul > li > div.ast-mini-cart-price-wrap > span > bdi`).first()).toContainText(`${vars.unitPrice ?? ''}`);
    await expect(page.locator(`p.woocommerce-mini-cart__total.total > span > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    await page.locator(`p.woocommerce-mini-cart__buttons.buttons > a[href*='cart'].button`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`td.product-subtotal > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    await expect(page.locator(`tr.cart-subtotal > td > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    await expect(page.locator(`tr.order-total > td > strong > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    await expect(page.locator(`div.ast-product-name > a[href*="/product/"]`).first()).toContainText(`${vars.prod_desc ?? ''}`);
    if (vars.product === 'variable') {
      await expect(page.locator(`div.ast-product-name > a[href*="/product/"]`).first()).toContainText(`variable`);
    }
  });

  test('08 - Checkout page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    if (vars.product === 'simple' || vars.product === '') {
      // ↓ 05 - Simple product page
      await under21Age(page, vars);
      await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const addToCartButtons = Array.from<any>(document.querySelectorAll(
  'li.product:has(.star-rating:not(.eael-star-rating)) .product_type_simple.add_to_cart_button'
))[0];

const titleLink = addToCartButtons.closest('li.product').querySelector('.eael-product-title > a')

titleLink.click()
 }, vars);
      await expect(page.locator(`.woocommerce-product-rating`)).not.toHaveCount(0);
      vars.prod_desc = ((await page.locator(`h1.product_title`).textContent()) ?? '').trim();
      vars.unitPrice = ((await page.locator(`div.summary.entry-summary > .price > ins > .woocommerce-Price-amount.amount > bdi`).or(page.locator(`div.summary.entry-summary > .price > .woocommerce-Price-amount.amount > bdi`)).textContent()) ?? '').trim();
      // ↑ end 05 - Simple product page
    }
    if (vars.product === 'variable') {
      // ↓ 06 - Variable product page
      await under21Age(page, vars);
      await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const addToCartButtons = Array.from<any>(document.querySelectorAll(
  'li.product:has(.star-rating:not(.eael-star-rating)) .product_type_variable.add_to_cart_button'
))[0];

const titleLink = addToCartButtons.closest('li.product').querySelector('.eael-product-title > a')

titleLink.click()
 }, vars);
      await expect(page.locator(`.woocommerce-product-rating`)).not.toHaveCount(0);
      await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); 
    return new Promise(async (resolve,reject) => {
  const form = document.querySelector<HTMLFormElement>('form.variations_form');
    if (!form) {
        console.error("No variations form found");
        reject(new Error("No variations form found"));
        return;
    }

    const selects = Array.from<any>(form.querySelectorAll('select[name^="attribute_"]'));
    if (selects.length === 0) {
        console.error("No attribute dropdowns found");
        reject(new Error("No attribute dropdowns found"));
        return;
    }

    console.log(`Found ${selects.length} attribute dropdown(s)`);

    // Reset everything first
    form.querySelector('.reset_variations')?.click();
    await new Promise(r => setTimeout(r, 400)); // give Woo time to reset

    // Prepare list of options for each select (skip the empty first option)
    const optionsPerSelect = Array.from<any>(selects).map(sel => {
        return Array.from<any>(sel.options)
            .filter(opt => opt.value !== "")   // skip "Choose …"
            .map(opt => ({ value: opt.value, text: opt.textContent.trim() }));
    });

    console.log("Options per attribute:", optionsPerSelect.map(arr => arr.length));

    // We'll do a simple nested loop / recursive try (depth = number of attributes)
    let found = false;
    let attempts = 0;
    const maxAttempts = 300; // safety limit

    async function tryCombination(currentIndex, currentValues) {
        if (found) return;
        if (attempts++ > maxAttempts) {
            console.warn("Reached max attempts — probably no in-stock variation");
            reject(new Error("Reached max attempts — probably no in-stock variation"));
            return;
        }

        if (currentIndex === selects.length) {
            // full combination selected → check stock
            await new Promise(r => setTimeout(r, 600)); // WooCommerce needs ~300-800ms to update DOM

            const outOfStockEl = form.querySelector('.woocommerce-variation-availability .stock.out-of-stock, .stock.outofstock');

            if (!outOfStockEl) {
                // No out-of-stock element → we have stock!
                found = true;

                console.log("%cFOUND IN-STOCK COMBINATION after " + attempts + " tries!", "color:lime;font-weight:bold;font-size:16px");

                // Show what we selected
                currentValues.forEach((val, i) => {
                    const label = selects[i].previousElementSibling?.textContent.trim() || selects[i].name;
                    console.log(`  • ${label}: ${val.text} (${val.value})`);
                });

                // Optional: highlight the selects
                selects.forEach((sel, i) => {
                    sel.value = currentValues[i].value;
                    sel.dispatchEvent(new Event('change', { bubbles: true }));
                });

                // You can stop here — or continue if you want all in-stock combos
                resolve();
            } else {
                console.log(`Attempt ${attempts}: out of stock`);
            }
            return;
        }

        // Try each option in current dropdown
        for (const opt of optionsPerSelect[currentIndex]) {
            if (found) break;

            // Select it
            selects[currentIndex].value = opt.value;
            selects[currentIndex].dispatchEvent(new Event('change', { bubbles: true }));

            // Recurse to next attribute
            await tryCombination(currentIndex + 1, [...currentValues, opt]);
        }
    }

    console.log("Starting search for in-stock variation...");

    await tryCombination(0, []);

    if (!found) {
        console.error("No in-stock variation found after checking many combinations");
        reject(new Error("No in-stock variation found after checking many combinations"));
    }
}) }, vars);
      vars.variable = ((await page.locator(`table.variations select`).textContent()) ?? '').trim();
      vars.prod_desc = ((await page.locator(`h1.product_title`).textContent()) ?? '').trim();
      vars.unitPrice = ((await page.locator(`.woocommerce-variation-price > .price > ins > .woocommerce-Price-amount.amount > bdi`).or(page.locator(`.woocommerce-variation-price > .price > .woocommerce-Price-amount.amount > bdi`)).or(page.locator(`.summary.entry-summary .price > ins > .woocommerce-Price-amount.amount > bdi`)).or(page.locator(`.summary.entry-summary .price > .woocommerce-Price-amount.amount > bdi`)).textContent()) ?? '').trim();
      // ↑ end 06 - Variable product page
    }
    await page.locator(`xpath=//button[contains(text(), "Add to cart")]`).or(page.locator(`button[name="add-to-cart"]`)).filter({ visible: true }).first().click({ force: true });
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector('.woocommerce-message')

return !!element }, vars)) {
      await expect(page.locator(`.woocommerce-message`).first()).toContainText(`${vars.prod_desc ?? ''}`);
    }
    vars.prod_desc = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const prod_desc = `${vars.prod_desc}`.replaceAll('–','-')

return prod_desc }, vars);
    await page.locator(`#ast-desktop-header > div.ast-main-header-wrap.main-header-bar-wrap > div > div > div > div.site-header-primary-section-right.site-header-section.ast-flex.ast-grid-right-section > div.ast-builder-layout-element.site-header-focus-item.ast-header-woo-cart > div > div.ast-site-header-cart-li > a > div > i > span.ast-icon.icon-bag`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.woocommerce.widget_shopping_cart`)).not.toHaveCount(0);
    await expect(page.locator(`div.ast-product-name`).first()).toContainText(`${vars.prod_desc ?? ''}`);
    await expect(page.locator(`#astra-mobile-cart-drawer > div.astra-cart-drawer-content > div > div > ul > li > div.ast-mini-cart-price-wrap > span > bdi`).first()).toContainText(`${vars.unitPrice ?? ''}`);
    await expect(page.locator(`p.woocommerce-mini-cart__total.total > span > bdi`).first()).toContainText(`${vars.unitPrice ?? ''}`);
    await page.locator(`p.woocommerce-mini-cart__buttons.buttons > a[href*='checkout'].button`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`#order_review > table > tbody > tr > td.product-total > span > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    await expect(page.locator(`#order_review tr.cart-subtotal > td > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    await expect(page.locator(`#order_review tr.order-total > td > strong > span > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    await expect(page.locator(`#order_review > table > tbody > tr > td.product-name > div > div.ast-product-name`).first()).toContainText(`${vars.prod_desc ?? ''}`);
    if (vars.product === 'variable') {
      await expect(page.locator(`#order_review > table > tbody > tr > td.product-name > div > div.ast-product-name`).first()).toContainText(`${vars.variable ?? ''}`);
    }
  });

  test('09 - Registration, My Account links and Login', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    vars.username = `${vars.emailReg ?? ''}`;
    vars.pass = `${vars.password ?? ''}`;
    await under21Age(page, vars);
    await registration(page, vars);
    await page.locator(`a[href*="/customer-logout/?_wpnonce="]`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`#customer_login`)).not.toHaveCount(0);
    await extractUserFromEmail(page, vars);
    await page.locator(`xpath=//a[contains(text(),'account has been created!')]`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`xpath=//a[contains(text(),'Set your new password.')]`).filter({ visible: true }).first().click({ force: true });
    try { await page.locator(`#password_1`).first().fill(`${vars.password ?? ''}`); } catch { await page.locator(`#password_1`).first().selectOption(`${vars.password ?? ''}`); }
    try { await page.locator(`#password_2`).first().fill(`${vars.password ?? ''}`); } catch { await page.locator(`#password_2`).first().selectOption(`${vars.password ?? ''}`); }
    await page.locator(`button[type="submit"]`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.woocommerce-message`).first()).toHaveText(`Your password has been reset successfully.`);
    await page.locator(`a[href*="/customer-logout/?_wpnonce="]`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`#customer_login`)).not.toHaveCount(0);
    await login(page, vars);
    await page.locator(`xpath=//a[contains(text(), "Orders")]`).or(page.locator(`.woocommerce-MyAccount-navigation-link > a[href*="/orders/"]`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.woocommerce-info`)).not.toHaveCount(0);
    await page.locator(`xpath=//a[contains(text(), "Downloads")]`).or(page.locator(`a[href*="/downloads/"]`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.woocommerce-info`)).not.toHaveCount(0);
    await page.locator(`xpath=//a[contains(text(), "Addresses")]`).or(page.locator(`a[href*="/edit-address/"]`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.u-columns`)).not.toHaveCount(0);
    await page.locator(`xpath=//a[contains(text(), "Payment methods")]`).or(page.locator(`a[href*="/payment-methods/"]`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.woocommerce-info`).first()).toContainText(`No saved methods found.`);
    await page.locator(`xpath=//a[contains(text(), "Account details")]`).or(page.locator(`a[href*="/edit-account/"]`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`form.woocommerce-EditAccountForm`)).not.toHaveCount(0);
    await page.locator(`xpath=//a[contains(text(), "Gift Card Balance")]`).or(page.locator(`a[href*="/balance/"]`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`#pwgc-balance-title`).first()).toContainText(`Check Gift Card Balance`);
    await page.locator(`a[href*="/account/"]`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`xpath=//a[contains(text(), "Quotes")]`).or(page.locator(`a[href*="/quotes/"]`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.woocommerce-message`)).not.toHaveCount(0);
    await page.locator(`xpath=//a[contains(text(), "My Coupons")]`).or(page.locator(`a[href*="/my-coupons/"]`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`div > div > div.woocommerce-MyAccount-content > p`).first()).toContainText(`You have no coupons.`);
    await page.locator(`xpath=//a[contains(text(), "Dashboard")]`).or(page.locator(`.woocommerce-MyAccount-navigation-link.woocommerce-MyAccount-navigation-link--dashboard > a[href*="account/"]`)).filter({ visible: true }).first().click({ force: true });
  });

  test('10 - Forgot password flow', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    vars.username = `${vars.emailReg ?? ''}`;
    vars.pass = `${vars.password ?? ''}`;
    await under18Age(page, vars);
    await registration(page, vars);
    await page.locator(`a[href*="/account/customer-logout/?_wpnonce="]`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`#customer_login`)).not.toHaveCount(0);
    await page.locator(`xpath=//a[contains(text(), "Lost your password?")]`).or(page.locator(`a[href*="/account/lost-password/"]`)).filter({ visible: true }).first().click({ force: true });
    try { await page.locator(`#user_login`).first().fill(`${vars.username ?? ''}`); } catch { await page.locator(`#user_login`).first().selectOption(`${vars.username ?? ''}`); }
    await page.locator(`xpath=//button[contains(text(), "Reset password")]`).or(page.locator(`button[type="submit"].woocommerce-Button`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.woocommerce-message`).first()).toContainText(`Password reset email has been sent.`);
    await extractUserFromEmail(page, vars);
    await page.locator(`xpath=//a[contains(),'Reset your password']`).filter({ visible: true }).first().click({ force: true });
    await page.waitForTimeout(2000);
    await page.locator(`xpath=//a[contains(),'Reset your password']`).filter({ visible: true }).first().click({ force: true });
    {
      const _lbl = page.locator(`label[for="password_1"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#password_1`).filter({ visible: true }).first().click({ force: true }); }
    }
    try { await page.locator(`#password_1`).first().fill(`${vars.password2 ?? ''}`); } catch { await page.locator(`#password_1`).first().selectOption(`${vars.password2 ?? ''}`); }
    try { await page.locator(`#password_2`).first().fill(`${vars.password2 ?? ''}`); } catch { await page.locator(`#password_2`).first().selectOption(`${vars.password2 ?? ''}`); }
    await page.locator(`xpath=//button[contains(text(), "Save")]`).or(page.locator(`button[type="submit"].woocommerce-Button`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.woocommerce-message`).first()).toContainText(`Your password has been reset successfully.`);
  });

});
