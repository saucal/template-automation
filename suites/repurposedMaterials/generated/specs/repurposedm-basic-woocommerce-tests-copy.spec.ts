// @ts-nocheck
// Auto-generated from Ghost Inspector suite: "repurposedM - Basic WooCommerce tests (Copy)"
// Review all TODOs before running.
import dotenv from 'dotenv';
dotenv.config();
import { test, expect } from '@playwright/test';
import { blockImageSizes, placeOrderElement } from '../helpers/common-steps-for-all-projects';
import { checkTotal, checkVariations, closePopup } from '../helpers/repurposedm-common-steps';

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

test.describe('repurposedM - Basic WooCommerce tests (Copy)', () => {

  const vars = new Proxy<Record<string, string>>({
    "email": `qa+gi_order_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "emailReg": `qa+gi_reg_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "emailForgot": `qa+gi_forgot_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "payPalUser": "qa+gi_sb-8eg0v132169@saucal.com",
    "payPalPass": process.env.PAY_PAL_PASS ?? '',
    "adminUser": "saucal_maintenance_admin",
    "adminPass": process.env.ADMIN_PASS ?? '',
    "Symbol": "$",
    "password": process.env.PASSWORD ?? '',
    "password2": process.env.PASSWORD2 ?? '',
    "prodUrl": "www.repurposedmaterialsinc.com",
  }, { get: (o: Record<string, string>, k: string) => (k in o ? o[k] : '') });

  test('01 - Home page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.waitForLoadState('load');
    await expect(page.locator(`.avia-slide-wrap`)).not.toHaveCount(0);
    await expect(page.locator(`.avia-animated-number`)).not.toHaveCount(0);
    await closePopup(page, vars);
    await blockImageSizes(page, vars);
  });

  test('02 - Header', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.locator(`#menu-item-16307`).first().hover();
    await closePopup(page, vars);
    await page.locator(`#menu-item-16307`).first().hover();
    await expect(page.locator(`#menu-item-16307 > ul`).first()).toBeVisible();
    await page.locator(`#menu-item-56846`).first().hover();
    await expect(page.locator(`#menu-item-16307 > ul`).first()).not.toBeVisible();
    await closePopup(page, vars);
  });

  test('03 - Footer', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await expect(page.locator(`#menu-quick-links`)).not.toHaveCount(0);
    await expect(page.locator(`.noLightbox`)).not.toHaveCount(0);
    await closePopup(page, vars);
  });

  test('04 - Shop page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.locator(`xpath=//span[contains(text(), "Shop All Products")]`).or(page.locator(`.menu-item.menu-item-type-post_type > a[href*="/view-all-products/"] > .avia-menu-text`)).filter({ visible: true }).first().click({ force: true });
    await closePopup(page, vars);
    await page.locator(`a[href*="/view-all-products/page/3/"]`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.current`).first()).toContainText(`3`);
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const url = window.location.href

return url.includes('/page/3') }, vars)).toBeTruthy();
    await page.waitForLoadState('load');
    {
      const _lbl = page.locator(`label[for="wpc-checkbox-taxonomy-pwb-brand-1504"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#wpc-checkbox-taxonomy-pwb-brand-1504`).filter({ visible: true }).first().click({ force: true }); }
    }
    await expect(page.locator(`.wpc-filters-overlay`).first()).not.toBeVisible();
    await expect(page.locator(`div:nth-of-type(2) > .wpc-filter-chips-list > li.wpc-filter-chip:nth-of-type(2) > a[href*="/view-all-products/"][title="Remove «Location: Arizona Inventory» from results"] > .wpc-chip-content > .wpc-filter-chip-name`).first()).toContainText(`Arizona Inventory`);
    await expect(page.locator(`.inner_product_header > .inner_product_header_table > .inner_product_header_cell > .woocommerce-product-details__short-description > p > span`).first()).toContainText(`See Available Options | FREE SHIPPING | L: ARIZONA`);
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const description = Array.from<any>(document.querySelectorAll('ul.products > li div.woocommerce-product-details__short-description'))

return  Array.from<any>(description).every(note => {
            return  note.textContent.includes('ARIZONA') || 
                    note.textContent.includes('L: MULTIPLE LOCATIONS') || 
                    note.textContent.includes('L: ALL LOCATIONS') || 
                    note.textContent.includes('See Locations Below')
        }); }, vars)).toBeTruthy();
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const url = window.location.href

return url.includes('?location=arizona-inventory') }, vars)).toBeTruthy();
    await closePopup(page, vars);
  });

  test('05 - Simple product page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.locator(`xpath=//span[contains(text(), "Shop All Products")]`).or(page.locator(`.menu-item.menu-item-type-post_type > a[href*="/view-all-products/"] > .avia-menu-text`)).filter({ visible: true }).first().click({ force: true });
    await closePopup(page, vars);
    vars.selector = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') });  const maxPrice = 100.0;

  var items = Array.from<any>(document.querySelectorAll(
    'ul.products > li.instock.product-type-simple'
  ));

  function parsePrice(li) {
    // Prefer sale price (<ins>) when present, else the first amount.
    var amt =
      li.querySelector('.price ins .woocommerce-Price-amount') ||
      li.querySelector('.price .woocommerce-Price-amount');
    if (!amt) return NaN;
    return parseFloat(amt.textContent.replace(/[^0-9.]/g, ''));
  }

  function buildSelector(li) {
    // 1-based position among <li> siblings, for nth-of-type uniqueness.
    var idx =
      Array.prototype.filter.call(li.parentNode.children, function (n) {
        return n.tagName === 'LI';
      }).indexOf(li) + 1;
    return (
      'ul.products > li.instock.product-type-simple:nth-of-type(' +
      idx +
      ') > div'
    );
  }

  for (var i = 0; i < items.length; i++) {
    var li = items[i];
    var price = parsePrice(li);
    if (isNaN(price) || price >= maxPrice) continue;
    if (!li.querySelector(':scope > div')) continue;

    var title = li.querySelector('.woocommerce-loop-product__title');
    
    return buildSelector(li)
    
  }

  return { found: false, maxPrice: maxPrice }; }, vars);
    await page.locator(`${vars.selector ?? ''}`).filter({ visible: true }).first().click({ force: true });
    vars.prod_desc = ((await page.locator(`h1.product_title`).textContent()) ?? '').trim();
    vars.unitPrice = ((await page.locator(`.product-summary > .price > span > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
    await closePopup(page, vars);
  });

  test('06 - Variable product page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.locator(`xpath=//span[contains(text(), "Shop All Products")]`).or(page.locator(`.menu-item.menu-item-type-post_type > a[href*="/view-all-products/"] > .avia-menu-text`)).filter({ visible: true }).first().click({ force: true });
    await closePopup(page, vars);
    vars.selector = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const maxPrice = 100.0;

  var items = Array.from<any>(document.querySelectorAll(
    'ul.products > li.instock.product-type-variable'
  ));

  function lowestPrice(li) {
    var amounts = Array.from<any>(li.querySelectorAll('.price .woocommerce-Price-amount'));
    if (!amounts.length) return NaN;
    var prices = Array.prototype.map.call(amounts, function (a) {
      return parseFloat(a.textContent.replace(/[^0-9.]/g, ''));
    });
    return Math.min.apply(null, prices);
  }

  function buildSelector(li) {
    // 1-based position among <li> siblings, for nth-of-type uniqueness.
    var idx =
      Array.prototype.filter.call(li.parentNode.children, function (n) {
        return n.tagName === 'LI';
      }).indexOf(li) + 1;
    return (
      'ul.products > li.instock.product-type-variable:nth-of-type(' +
      idx +
      ') > div'
    );
  }

  for (var i = 0; i < items.length; i++) {
    var li = items[i];
    var price = lowestPrice(li);
    if (isNaN(price) || price >= maxPrice) continue;
    if (!li.querySelector(':scope > div')) continue;

    var title = li.querySelector('.woocommerce-loop-product__title');
    
    return buildSelector(li)
    
  }

  return { found: false, maxPrice: maxPrice }; }, vars);
    await page.locator(`${vars.selector ?? ''}`).filter({ visible: true }).first().click({ force: true });
    await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); function selectFirstAvailableVariation() {
    // Find all variation dropdowns on the page
    const variationSelects = Array.from<any>(document.querySelectorAll<HTMLSelectElement>('table.variations select[name^="attribute_"]'));

    if (variationSelects.length === 0) {
        console.log("No variation dropdowns found");
        return false;
    }

    let changed = false;

    variationSelects.forEach(select => {
        // Skip if already has a value
        if (select.value !== "" && select.value !== null) {
            return;
        }

        // Find the first <option> that is not the placeholder ("Choose an option")
        const validOptions = Array.from<any>(select.options).filter(opt => 
            opt.value !== "" && 
            opt.value.trim() !== "" &&
            !opt.disabled &&
            opt.classList.contains("enabled")   // WooCommerce often adds this
        );

        if (validOptions.length > 0) {
            select.value = validOptions[0].value;
            // Trigger change event so WooCommerce updates price/image/stock
            select.dispatchEvent(new Event('change', { bubbles: true }));
            changed = true;
        }
    });

    if (changed) {
        console.log(`Selected first available option in ${variationSelects.length} dropdown(s)`);
    } else {
        console.log("All dropdowns already have values or no valid options found");
    }

    return changed;
}

// Run it
selectFirstAvailableVariation(); }, vars);
    vars.variations = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); // Find all variation <select> elements
    const variationSelects = Array.from<any>(document.querySelectorAll<HTMLSelectElement>('table.variations select[name^="attribute_"]'));

    if (variationSelects.length === 0) {
        console.log("No variation dropdowns found on this page.");
        return [];
    }

    const results = [];

    variationSelects.forEach((select, index) => {
        const selectedOption = select.options[select.selectedIndex];
        
        // Skip if nothing is selected or it's the placeholder
        if (!selectedOption || selectedOption.value === "" || selectedOption.value === null) {
            results.push({
                attribute: select.name.replace("attribute_", ""), // e.g. "length"
                label: "No selection",
                value: "",
                displayText: "Choose an option (placeholder)"
            });
            return;
        }

        // Most reliable text sources
        const displayText = selectedOption.textContent.trim() || 
                           selectedOption.innerText.trim() || 
                           selectedOption.label?.trim() || 
                           selectedOption.value.trim();

        results.push({
            attribute: select.name.replace("attribute_", ""),   // clean name: "length", "color", etc.
            label: select.previousElementSibling?.textContent?.trim() ||    // usually the <label> text
                   select.closest("tr")?.querySelector("th.label")?.textContent?.trim() ||
                   select.name,
            value: selectedOption.value,                       // raw value e.g. "350' - 1,700 lbs"
            displayText: displayText                           // human-readable e.g. "350' - 1,700 lbs"
        });
    });

    // Show in console (nicely formatted)
    console.group("Selected Variations");
    results.forEach((item, i) => {
        console.log(`#${i + 1}  ${item.label.padEnd(12)} : ${item.displayText}`);
        console.log(`     (raw value → ${item.value})`);
    });
    console.groupEnd();

    // Also return the array so you can use it programmatically
    return results; }, vars);
    vars.prod_desc = ((await page.locator(`h1.product_title`).textContent()) ?? '').trim();
    vars.unitPrice = ((await page.locator(`.woocommerce-variation-price > .price > span > .woocommerce-Price-amount.amount > bdi`).or(page.locator(`.product-summary > .price > span > .woocommerce-Price-amount.amount > bdi`)).textContent()) ?? '').trim();
    await closePopup(page, vars);
  });

  test('07 - Cart page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    if (vars.product === 'simple' || vars.product === '') {
      // ↓ 05 - Simple product page
      await page.locator(`xpath=//span[contains(text(), "Shop All Products")]`).or(page.locator(`.menu-item.menu-item-type-post_type > a[href*="/view-all-products/"] > .avia-menu-text`)).filter({ visible: true }).first().click({ force: true });
      await closePopup(page, vars);
      vars.selector = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') });  const maxPrice = 100.0;

  var items = Array.from<any>(document.querySelectorAll(
    'ul.products > li.instock.product-type-simple'
  ));

  function parsePrice(li) {
    // Prefer sale price (<ins>) when present, else the first amount.
    var amt =
      li.querySelector('.price ins .woocommerce-Price-amount') ||
      li.querySelector('.price .woocommerce-Price-amount');
    if (!amt) return NaN;
    return parseFloat(amt.textContent.replace(/[^0-9.]/g, ''));
  }

  function buildSelector(li) {
    // 1-based position among <li> siblings, for nth-of-type uniqueness.
    var idx =
      Array.prototype.filter.call(li.parentNode.children, function (n) {
        return n.tagName === 'LI';
      }).indexOf(li) + 1;
    return (
      'ul.products > li.instock.product-type-simple:nth-of-type(' +
      idx +
      ') > div'
    );
  }

  for (var i = 0; i < items.length; i++) {
    var li = items[i];
    var price = parsePrice(li);
    if (isNaN(price) || price >= maxPrice) continue;
    if (!li.querySelector(':scope > div')) continue;

    var title = li.querySelector('.woocommerce-loop-product__title');
    
    return buildSelector(li)
    
  }

  return { found: false, maxPrice: maxPrice }; }, vars);
      await page.locator(`${vars.selector ?? ''}`).filter({ visible: true }).first().click({ force: true });
      vars.prod_desc = ((await page.locator(`h1.product_title`).textContent()) ?? '').trim();
      vars.unitPrice = ((await page.locator(`.product-summary > .price > span > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
      await closePopup(page, vars);
      // ↑ end 05 - Simple product page
    }
    if (vars.product === 'variable') {
      // ↓ 06 - Variable product page
      await page.locator(`xpath=//span[contains(text(), "Shop All Products")]`).or(page.locator(`.menu-item.menu-item-type-post_type > a[href*="/view-all-products/"] > .avia-menu-text`)).filter({ visible: true }).first().click({ force: true });
      await closePopup(page, vars);
      vars.selector = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const maxPrice = 100.0;

  var items = Array.from<any>(document.querySelectorAll(
    'ul.products > li.instock.product-type-variable'
  ));

  function lowestPrice(li) {
    var amounts = Array.from<any>(li.querySelectorAll('.price .woocommerce-Price-amount'));
    if (!amounts.length) return NaN;
    var prices = Array.prototype.map.call(amounts, function (a) {
      return parseFloat(a.textContent.replace(/[^0-9.]/g, ''));
    });
    return Math.min.apply(null, prices);
  }

  function buildSelector(li) {
    // 1-based position among <li> siblings, for nth-of-type uniqueness.
    var idx =
      Array.prototype.filter.call(li.parentNode.children, function (n) {
        return n.tagName === 'LI';
      }).indexOf(li) + 1;
    return (
      'ul.products > li.instock.product-type-variable:nth-of-type(' +
      idx +
      ') > div'
    );
  }

  for (var i = 0; i < items.length; i++) {
    var li = items[i];
    var price = lowestPrice(li);
    if (isNaN(price) || price >= maxPrice) continue;
    if (!li.querySelector(':scope > div')) continue;

    var title = li.querySelector('.woocommerce-loop-product__title');
    
    return buildSelector(li)
    
  }

  return { found: false, maxPrice: maxPrice }; }, vars);
      await page.locator(`${vars.selector ?? ''}`).filter({ visible: true }).first().click({ force: true });
      await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); function selectFirstAvailableVariation() {
    // Find all variation dropdowns on the page
    const variationSelects = Array.from<any>(document.querySelectorAll<HTMLSelectElement>('table.variations select[name^="attribute_"]'));

    if (variationSelects.length === 0) {
        console.log("No variation dropdowns found");
        return false;
    }

    let changed = false;

    variationSelects.forEach(select => {
        // Skip if already has a value
        if (select.value !== "" && select.value !== null) {
            return;
        }

        // Find the first <option> that is not the placeholder ("Choose an option")
        const validOptions = Array.from<any>(select.options).filter(opt => 
            opt.value !== "" && 
            opt.value.trim() !== "" &&
            !opt.disabled &&
            opt.classList.contains("enabled")   // WooCommerce often adds this
        );

        if (validOptions.length > 0) {
            select.value = validOptions[0].value;
            // Trigger change event so WooCommerce updates price/image/stock
            select.dispatchEvent(new Event('change', { bubbles: true }));
            changed = true;
        }
    });

    if (changed) {
        console.log(`Selected first available option in ${variationSelects.length} dropdown(s)`);
    } else {
        console.log("All dropdowns already have values or no valid options found");
    }

    return changed;
}

// Run it
selectFirstAvailableVariation(); }, vars);
      vars.variations = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); // Find all variation <select> elements
    const variationSelects = Array.from<any>(document.querySelectorAll<HTMLSelectElement>('table.variations select[name^="attribute_"]'));

    if (variationSelects.length === 0) {
        console.log("No variation dropdowns found on this page.");
        return [];
    }

    const results = [];

    variationSelects.forEach((select, index) => {
        const selectedOption = select.options[select.selectedIndex];
        
        // Skip if nothing is selected or it's the placeholder
        if (!selectedOption || selectedOption.value === "" || selectedOption.value === null) {
            results.push({
                attribute: select.name.replace("attribute_", ""), // e.g. "length"
                label: "No selection",
                value: "",
                displayText: "Choose an option (placeholder)"
            });
            return;
        }

        // Most reliable text sources
        const displayText = selectedOption.textContent.trim() || 
                           selectedOption.innerText.trim() || 
                           selectedOption.label?.trim() || 
                           selectedOption.value.trim();

        results.push({
            attribute: select.name.replace("attribute_", ""),   // clean name: "length", "color", etc.
            label: select.previousElementSibling?.textContent?.trim() ||    // usually the <label> text
                   select.closest("tr")?.querySelector("th.label")?.textContent?.trim() ||
                   select.name,
            value: selectedOption.value,                       // raw value e.g. "350' - 1,700 lbs"
            displayText: displayText                           // human-readable e.g. "350' - 1,700 lbs"
        });
    });

    // Show in console (nicely formatted)
    console.group("Selected Variations");
    results.forEach((item, i) => {
        console.log(`#${i + 1}  ${item.label.padEnd(12)} : ${item.displayText}`);
        console.log(`     (raw value → ${item.value})`);
    });
    console.groupEnd();

    // Also return the array so you can use it programmatically
    return results; }, vars);
      vars.prod_desc = ((await page.locator(`h1.product_title`).textContent()) ?? '').trim();
      vars.unitPrice = ((await page.locator(`.woocommerce-variation-price > .price > span > .woocommerce-Price-amount.amount > bdi`).or(page.locator(`.product-summary > .price > span > .woocommerce-Price-amount.amount > bdi`)).textContent()) ?? '').trim();
      await closePopup(page, vars);
      // ↑ end 06 - Variable product page
    }
    await page.locator(`xpath=//button[contains(text(), "Add to cart")]`).or(page.locator(`button[name="add-to-cart"]`)).filter({ visible: true }).first().click({ force: true });
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector('.woocommerce-message')

return !!element }, vars)) {
      await expect(page.locator(`.woocommerce-message`).first()).toContainText(`${vars.prod_desc ?? ''}`);
    }
    await expect(page.locator(`.av-cart-counter`).first()).toContainText(`1`);
    await page.locator(`.woocommerce-message > a[href*="/cart/"].button.wc-forward`).filter({ visible: true }).first().click({ force: true });
    vars.prod_desc = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); function normalizeSpecialChars(str) {
  return str
    // Quotes & primes → straight
    .replace(/[\u2018\u2019\u201A\u201B\u2032\u2035]/g, "'")   // ' ' ‚ ‛ ′ ‵ → '
    .replace(/[\u201C\u201D\u201E\u201F\u2033\u2036]/g, '"')   // " " „ ‟ ″ ‶ → "
    // Dashes → hyphen-minus
    .replace(/[\u2013\u2014\u2015\u2212]/g, '-')               // – — ― − → -
    // Ellipsis
    .replace(/\u2026/g, '...')                                  // … → ...
    // Spaces
    .replace(/[\u00A0\u2000-\u200B\u202F\u205F\u3000]/g, ' ')  // non-breaking & fancy spaces → space
    // Bullets & misc
    .replace(/[\u2022\u2023\u2043]/g, '*')                     // • ‣ ⁃ → *
    .trim();
}

// Example
const input = `${vars.prod_desc}`;


return normalizeSpecialChars(input) }, vars);
    await expect(page.locator(`td.product-name > a`).first()).toContainText(`${vars.prod_desc ?? ''}`);
    if (vars.product === 'variable') {
      await checkVariations(page, vars);
    }
    await expect(page.locator(`td.product-price > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    await expect(page.locator(`td.product-subtotal > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    vars.subtotal = ((await page.locator(`tr.cart-subtotal > td > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector<HTMLTableRowElement>('tr.shipping > td > #shipping_method > li > label')

return !!element }, vars)) {
      vars.shippingPrice = ((await page.locator(`tr.shipping > td > #shipping_method > li > label > .woocommerce-Price-amount.amount > bdi`).or(page.locator(`tr.shipping > td > #shipping_method > li > label`)).textContent()) ?? '').trim();
    }
    vars.taxPrice = ((await page.locator(`tr.tax-total > td > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
    vars.total = ((await page.locator(`strong > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
    await checkTotal(page, vars);
  });

  test('08 - Checkout page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    // ↓ 07 - Cart page
    if (vars.product === 'simple' || vars.product === '') {
      // ↓ 05 - Simple product page
      await page.locator(`xpath=//span[contains(text(), "Shop All Products")]`).or(page.locator(`.menu-item.menu-item-type-post_type > a[href*="/view-all-products/"] > .avia-menu-text`)).filter({ visible: true }).first().click({ force: true });
      await closePopup(page, vars);
      vars.selector = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') });  const maxPrice = 100.0;

  var items = Array.from<any>(document.querySelectorAll(
    'ul.products > li.instock.product-type-simple'
  ));

  function parsePrice(li) {
    // Prefer sale price (<ins>) when present, else the first amount.
    var amt =
      li.querySelector('.price ins .woocommerce-Price-amount') ||
      li.querySelector('.price .woocommerce-Price-amount');
    if (!amt) return NaN;
    return parseFloat(amt.textContent.replace(/[^0-9.]/g, ''));
  }

  function buildSelector(li) {
    // 1-based position among <li> siblings, for nth-of-type uniqueness.
    var idx =
      Array.prototype.filter.call(li.parentNode.children, function (n) {
        return n.tagName === 'LI';
      }).indexOf(li) + 1;
    return (
      'ul.products > li.instock.product-type-simple:nth-of-type(' +
      idx +
      ') > div'
    );
  }

  for (var i = 0; i < items.length; i++) {
    var li = items[i];
    var price = parsePrice(li);
    if (isNaN(price) || price >= maxPrice) continue;
    if (!li.querySelector(':scope > div')) continue;

    var title = li.querySelector('.woocommerce-loop-product__title');
    
    return buildSelector(li)
    
  }

  return { found: false, maxPrice: maxPrice }; }, vars);
      await page.locator(`${vars.selector ?? ''}`).filter({ visible: true }).first().click({ force: true });
      vars.prod_desc = ((await page.locator(`h1.product_title`).textContent()) ?? '').trim();
      vars.unitPrice = ((await page.locator(`.product-summary > .price > span > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
      await closePopup(page, vars);
      // ↑ end 05 - Simple product page
    }
    if (vars.product === 'variable') {
      // ↓ 06 - Variable product page
      await page.locator(`xpath=//span[contains(text(), "Shop All Products")]`).or(page.locator(`.menu-item.menu-item-type-post_type > a[href*="/view-all-products/"] > .avia-menu-text`)).filter({ visible: true }).first().click({ force: true });
      await closePopup(page, vars);
      vars.selector = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const maxPrice = 100.0;

  var items = Array.from<any>(document.querySelectorAll(
    'ul.products > li.instock.product-type-variable'
  ));

  function lowestPrice(li) {
    var amounts = Array.from<any>(li.querySelectorAll('.price .woocommerce-Price-amount'));
    if (!amounts.length) return NaN;
    var prices = Array.prototype.map.call(amounts, function (a) {
      return parseFloat(a.textContent.replace(/[^0-9.]/g, ''));
    });
    return Math.min.apply(null, prices);
  }

  function buildSelector(li) {
    // 1-based position among <li> siblings, for nth-of-type uniqueness.
    var idx =
      Array.prototype.filter.call(li.parentNode.children, function (n) {
        return n.tagName === 'LI';
      }).indexOf(li) + 1;
    return (
      'ul.products > li.instock.product-type-variable:nth-of-type(' +
      idx +
      ') > div'
    );
  }

  for (var i = 0; i < items.length; i++) {
    var li = items[i];
    var price = lowestPrice(li);
    if (isNaN(price) || price >= maxPrice) continue;
    if (!li.querySelector(':scope > div')) continue;

    var title = li.querySelector('.woocommerce-loop-product__title');
    
    return buildSelector(li)
    
  }

  return { found: false, maxPrice: maxPrice }; }, vars);
      await page.locator(`${vars.selector ?? ''}`).filter({ visible: true }).first().click({ force: true });
      await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); function selectFirstAvailableVariation() {
    // Find all variation dropdowns on the page
    const variationSelects = Array.from<any>(document.querySelectorAll<HTMLSelectElement>('table.variations select[name^="attribute_"]'));

    if (variationSelects.length === 0) {
        console.log("No variation dropdowns found");
        return false;
    }

    let changed = false;

    variationSelects.forEach(select => {
        // Skip if already has a value
        if (select.value !== "" && select.value !== null) {
            return;
        }

        // Find the first <option> that is not the placeholder ("Choose an option")
        const validOptions = Array.from<any>(select.options).filter(opt => 
            opt.value !== "" && 
            opt.value.trim() !== "" &&
            !opt.disabled &&
            opt.classList.contains("enabled")   // WooCommerce often adds this
        );

        if (validOptions.length > 0) {
            select.value = validOptions[0].value;
            // Trigger change event so WooCommerce updates price/image/stock
            select.dispatchEvent(new Event('change', { bubbles: true }));
            changed = true;
        }
    });

    if (changed) {
        console.log(`Selected first available option in ${variationSelects.length} dropdown(s)`);
    } else {
        console.log("All dropdowns already have values or no valid options found");
    }

    return changed;
}

// Run it
selectFirstAvailableVariation(); }, vars);
      vars.variations = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); // Find all variation <select> elements
    const variationSelects = Array.from<any>(document.querySelectorAll<HTMLSelectElement>('table.variations select[name^="attribute_"]'));

    if (variationSelects.length === 0) {
        console.log("No variation dropdowns found on this page.");
        return [];
    }

    const results = [];

    variationSelects.forEach((select, index) => {
        const selectedOption = select.options[select.selectedIndex];
        
        // Skip if nothing is selected or it's the placeholder
        if (!selectedOption || selectedOption.value === "" || selectedOption.value === null) {
            results.push({
                attribute: select.name.replace("attribute_", ""), // e.g. "length"
                label: "No selection",
                value: "",
                displayText: "Choose an option (placeholder)"
            });
            return;
        }

        // Most reliable text sources
        const displayText = selectedOption.textContent.trim() || 
                           selectedOption.innerText.trim() || 
                           selectedOption.label?.trim() || 
                           selectedOption.value.trim();

        results.push({
            attribute: select.name.replace("attribute_", ""),   // clean name: "length", "color", etc.
            label: select.previousElementSibling?.textContent?.trim() ||    // usually the <label> text
                   select.closest("tr")?.querySelector("th.label")?.textContent?.trim() ||
                   select.name,
            value: selectedOption.value,                       // raw value e.g. "350' - 1,700 lbs"
            displayText: displayText                           // human-readable e.g. "350' - 1,700 lbs"
        });
    });

    // Show in console (nicely formatted)
    console.group("Selected Variations");
    results.forEach((item, i) => {
        console.log(`#${i + 1}  ${item.label.padEnd(12)} : ${item.displayText}`);
        console.log(`     (raw value → ${item.value})`);
    });
    console.groupEnd();

    // Also return the array so you can use it programmatically
    return results; }, vars);
      vars.prod_desc = ((await page.locator(`h1.product_title`).textContent()) ?? '').trim();
      vars.unitPrice = ((await page.locator(`.woocommerce-variation-price > .price > span > .woocommerce-Price-amount.amount > bdi`).or(page.locator(`.product-summary > .price > span > .woocommerce-Price-amount.amount > bdi`)).textContent()) ?? '').trim();
      await closePopup(page, vars);
      // ↑ end 06 - Variable product page
    }
    await page.locator(`xpath=//button[contains(text(), "Add to cart")]`).or(page.locator(`button[name="add-to-cart"]`)).filter({ visible: true }).first().click({ force: true });
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector('.woocommerce-message')

return !!element }, vars)) {
      await expect(page.locator(`.woocommerce-message`).first()).toContainText(`${vars.prod_desc ?? ''}`);
    }
    await expect(page.locator(`.av-cart-counter`).first()).toContainText(`1`);
    await page.locator(`.woocommerce-message > a[href*="/cart/"].button.wc-forward`).filter({ visible: true }).first().click({ force: true });
    vars.prod_desc = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); function normalizeSpecialChars(str) {
  return str
    // Quotes & primes → straight
    .replace(/[\u2018\u2019\u201A\u201B\u2032\u2035]/g, "'")   // ' ' ‚ ‛ ′ ‵ → '
    .replace(/[\u201C\u201D\u201E\u201F\u2033\u2036]/g, '"')   // " " „ ‟ ″ ‶ → "
    // Dashes → hyphen-minus
    .replace(/[\u2013\u2014\u2015\u2212]/g, '-')               // – — ― − → -
    // Ellipsis
    .replace(/\u2026/g, '...')                                  // … → ...
    // Spaces
    .replace(/[\u00A0\u2000-\u200B\u202F\u205F\u3000]/g, ' ')  // non-breaking & fancy spaces → space
    // Bullets & misc
    .replace(/[\u2022\u2023\u2043]/g, '*')                     // • ‣ ⁃ → *
    .trim();
}

// Example
const input = `${vars.prod_desc}`;


return normalizeSpecialChars(input) }, vars);
    await expect(page.locator(`td.product-name > a`).first()).toContainText(`${vars.prod_desc ?? ''}`);
    if (vars.product === 'variable') {
      await checkVariations(page, vars);
    }
    await expect(page.locator(`td.product-price > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    await expect(page.locator(`td.product-subtotal > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    vars.subtotal = ((await page.locator(`tr.cart-subtotal > td > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); const element = document.querySelector<HTMLTableRowElement>('tr.shipping > td > #shipping_method > li > label')

return !!element }, vars)) {
      vars.shippingPrice = ((await page.locator(`tr.shipping > td > #shipping_method > li > label > .woocommerce-Price-amount.amount > bdi`).or(page.locator(`tr.shipping > td > #shipping_method > li > label`)).textContent()) ?? '').trim();
    }
    vars.taxPrice = ((await page.locator(`tr.tax-total > td > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
    vars.total = ((await page.locator(`strong > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
    await checkTotal(page, vars);
    // ↑ end 07 - Cart page
    await page.locator(`xpath=//a[contains(text(), "Checkout")]`).or(page.locator(`a[href*="/checkout/"].checkout-button`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`td.product-name`).first()).toContainText(`${vars.prod_desc ?? ''}`);
    if (vars.product === 'variable') {
      await checkVariations(page, vars);
    }
    await expect(page.locator(`td.product-total > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.unitPrice ?? ''}`);
    await expect(page.locator(`tr.cart-subtotal > td > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.subtotal ?? ''}`);
    vars.fee = ((await page.locator(`tr.fee > td > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
    await expect(page.locator(`tr.tax-total > td > .woocommerce-Price-amount.amount > bdi`).first()).toHaveText(`${vars.taxPrice ?? ''}`);
    vars.total = ((await page.locator(`strong > .woocommerce-Price-amount.amount > bdi`).textContent()) ?? '').trim();
    await checkTotal(page, vars);
    await placeOrderElement(page, vars);
    await expect(page.locator(`.woocommerce-error`).first()).toContainText(`Card Number is required!
Billing First name is a required field.
Billing Last name is a required field.
Billing Country / Region is a required field.
Billing Street address is a required field.
Billing Town / City is a required field.
Billing State / County is a required field.
Billing Postcode / ZIP is a required field.
Billing Phone is a required field.
Billing Email address is a required field.
How are you repurposing this purchase? is a required field.
How did you hear about this specific material? is a required field.
Please read and accept the terms and conditions to proceed with your order.`);
  });

  test('09 - Contact page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.locator(`li.menu-item.menu-item-type-post_type.menu-item-object-page:nth-of-type(6) > a[href*="/contact/"]`).filter({ visible: true }).first().click({ force: true });
    await closePopup(page, vars);
  });

  test('11 - About Us page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.locator(`xpath=//a[contains(text(), "About Us")]`).or(page.locator(`a[href*="/about/"]`)).filter({ visible: true }).first().click({ force: true });
    await closePopup(page, vars);
  });

});
