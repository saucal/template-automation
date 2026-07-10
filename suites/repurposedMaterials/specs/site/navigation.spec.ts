// Site navigation tests — replaces GI "Basic WooCommerce tests" 01-11.
// Functional render checks only: each test verifies a page loads with its key
// elements present. Pixel comparisons for the same pages live in visual.spec.ts.
import { test, expect } from '../../fixtures';
import { dismissOverlays } from '../../helpers/repurposed';

test.describe('Site Navigation', () => {
  test('RM-NAV-01 — Home page', async ({ shopperPage }) => {
    await shopperPage.goto('/');
    await shopperPage.waitForLoadState('load');
    await dismissOverlays(shopperPage);

    await expect(shopperPage.locator('.avia-slide-wrap').first(), 'hero slider should be present').toBeVisible();
    await expect(shopperPage.locator('.avia-animated-number').first(), 'animated numbers should be present').toBeVisible();
  });

  test('RM-NAV-02 — Header navigation', async ({ shopperPage }) => {
    await shopperPage.goto('/');
    await shopperPage.waitForLoadState('load');
    await dismissOverlays(shopperPage);

    await shopperPage.locator('#menu-item-16307').first().hover();
    await expect(shopperPage.locator('#menu-item-16307 > ul').first(), 'submenu should be visible on hover').toBeVisible();

    await shopperPage.locator('#menu-item-56846').first().hover();
    await expect(shopperPage.locator('#menu-item-16307 > ul').first(), 'submenu should hide when hovering away').not.toBeVisible();
  });

  test('RM-NAV-03 — Footer', async ({ shopperPage }) => {
    await shopperPage.goto('/');
    await shopperPage.waitForLoadState('load');
    await dismissOverlays(shopperPage);

    await expect(shopperPage.locator('#menu-quick-links'), 'quick links should be present').not.toHaveCount(0);
    await expect(shopperPage.locator('.noLightbox').first(), 'trust badges / images should be present').toBeVisible();
  });

  test('RM-NAV-04 — Shop page', async ({ shopperPage }) => {
    await shopperPage.goto('/view-all-products/');
    await shopperPage.waitForLoadState('load');
    await dismissOverlays(shopperPage);

    await expect(shopperPage.locator('ul.products > li').first(), 'products should be listed').toBeVisible();
    await expect(shopperPage.locator('a[href*="/view-all-products/page/"]').first(), 'pagination should exist').toBeVisible();
  });

  test('RM-NAV-05 — Simple product page', async ({ shopperPage }) => {
    await shopperPage.goto('/view-all-products/');
    await shopperPage.waitForLoadState('load');
    await dismissOverlays(shopperPage);

    await shopperPage.locator('ul.products > li a.woocommerce-LoopProduct-link').first().click();
    await shopperPage.waitForLoadState('load');
    await dismissOverlays(shopperPage);

    await expect(shopperPage.locator('h1.product_title').first(), 'product title should render').toBeVisible();
    await expect(shopperPage.locator('.woocommerce-product-gallery').first(), 'product gallery should render').toBeVisible();
    await expect(shopperPage.locator('button[name="add-to-cart"], .single_add_to_cart_button').first(), 'add-to-cart button should render').toBeVisible();
  });

  test('RM-NAV-06 — Variable product page', async ({ shopperPage }) => {
    await shopperPage.goto('/view-all-products/');
    await shopperPage.waitForLoadState('load');
    await dismissOverlays(shopperPage);

    const variableLink = shopperPage.locator('ul.products > li.product-type-variable a.woocommerce-LoopProduct-link').first();
    if ((await variableLink.count()) === 0) {
      test.skip(true, 'No variable products found on shop page');
      return;
    }
    await variableLink.click();
    await shopperPage.waitForLoadState('load');
    await dismissOverlays(shopperPage);

    await expect(shopperPage.locator('h1.product_title').first(), 'product title should render').toBeVisible();
    await expect(shopperPage.locator('.variations select, .variations_form').first(), 'variation selects should render').toBeVisible();
  });

  test('RM-NAV-07 — Cart page', async ({ shopperPage }) => {
    await shopperPage.goto('/view-all-products/');
    await shopperPage.waitForLoadState('load');
    await dismissOverlays(shopperPage);

    await shopperPage.locator('ul.products > li.instock.product-type-simple a.add_to_cart_button').first().click();
    await shopperPage.locator('.added_to_cart, .woocommerce-message').first().waitFor({ state: 'visible', timeout: 15_000 }).catch(() => {});

    await shopperPage.goto('/cart/');
    await shopperPage.waitForLoadState('load');
    await dismissOverlays(shopperPage);

    await expect(shopperPage.locator('table.shop_table.cart, .woocommerce-cart-form').first(), 'cart table should render').toBeVisible();
    await expect(shopperPage.locator('.cart-subtotal, .order-total').first(), 'cart totals should render').toBeVisible();
  });

  test('RM-NAV-08 — Checkout validation', async ({ shopperPage }) => {
    await shopperPage.goto('/view-all-products/');
    await shopperPage.waitForLoadState('load');
    await dismissOverlays(shopperPage);

    await shopperPage.locator('ul.products > li.instock.product-type-simple a.add_to_cart_button').first().click();
    await shopperPage.locator('.added_to_cart, .woocommerce-message').first().waitFor({ state: 'visible', timeout: 15_000 }).catch(() => {});

    await shopperPage.goto('/checkout/');
    await shopperPage.waitForLoadState('load');
    await dismissOverlays(shopperPage);
    await shopperPage.locator('form.woocommerce-checkout').waitFor({ state: 'visible', timeout: 15_000 });

    // Check terms so the form validates payment fields specifically
    const terms = shopperPage.locator('#terms').or(shopperPage.locator('#terms_acceptance'));
    if ((await terms.count()) > 0) {
      await terms.first().check({ force: true }).catch(() => {});
    }

    await shopperPage.locator('#place_order').click({ force: true });

    // Accept.Blue or WC validation errors — either client-side or server-side
    const errorNotice = shopperPage
      .locator('.woocommerce-error, .woocommerce-NoticeGroup-checkout, .woocommerce-error-message')
      .first();
    await expect(errorNotice, 'validation errors should appear').toBeVisible({ timeout: 30_000 });

    // GI parity (Basic 08 step 11): the notice names the specific missing fields,
    // not just "something is wrong". Billing is empty here, so WC flags required
    // billing fields server-side.
    const errorText = (await errorNotice.textContent().catch(() => '')) ?? '';
    expect(errorText, 'validation should say a field is required').toMatch(/required/i);
    expect(errorText, 'validation should flag the missing billing first name').toMatch(/first name/i);
  });
});
