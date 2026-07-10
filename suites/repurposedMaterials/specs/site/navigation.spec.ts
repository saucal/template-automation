// Site navigation + visual regression — GI "Basic WooCommerce tests" 01-11.
// Each test both verifies a page renders (functional) AND takes a masked,
// lazy-load-settled screenshot for pixel-regression, so every page is visited
// once. (Screenshots use the same shot()/triggerLazyLoad/dynamicMasks trio the
// No Pong / PLS / leggari suites use.)
//
// Maintenance-cycle workflow: refresh baselines BEFORE site changes with
//   npx playwright test specs/site/navigation.spec.ts --update-snapshots
// then run again AFTER to compare (same machine/env both times).
import { type Locator, type Page } from '@playwright/test';
import { test, expect } from '../../fixtures';
import { dismissOverlays } from '../../helpers/repurposed';

// Mask dynamic content so a diff means layout changed, not a value drifted.
// `.avia-animated-number` counts up on the home hero — freeze it here rather
// than racing a settle timeout.
const dynamicMasks = (page: Page): Locator[] => [
  page.locator('.woocommerce-Price-amount'),
  page.locator('time, .date'),
  page.locator('.avia-animated-number'),
];

// fullPage screenshots resize the viewport to content height but DON'T fire the
// scroll/intersection events lazy-loaded images wait on — step-scroll to the
// bottom to trigger every loader, wait (bounded) for image decode, scroll back.
const triggerLazyLoad = async (page: Page): Promise<void> => {
  await page.evaluate(async () => {
    const step = window.innerHeight;
    const max = document.body.scrollHeight;
    for (let y = 0; y < max; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 150));
    }
    window.scrollTo(0, 0);
    // Race each image's decode against a timeout: a lazy placeholder with an
    // unassigned src stays !complete forever and fires neither load nor error.
    await Promise.all(
      Array.from(document.images)
        .filter((img) => !img.complete)
        .map(
          (img) =>
            new Promise<void>((res) => {
              const done = () => res();
              img.addEventListener('load', done, { once: true });
              img.addEventListener('error', done, { once: true });
              setTimeout(done, 3000);
            })
        )
    );
  });
  // networkidle never settles on sites with chat/analytics sockets — bound it.
  await page.waitForLoadState('networkidle', { timeout: 5_000 }).catch(() => {});
};

/** Full-page layout shot (lazy-load triggered, dynamic content masked). */
const shot = async (page: Page, name: string, fullPage = true): Promise<void> => {
  await triggerLazyLoad(page);
  await expect(page).toHaveScreenshot(`${name}.png`, {
    fullPage,
    animations: 'disabled',
    mask: dynamicMasks(page),
  });
};

/** Element-scoped shot (header/footer) — no lazy-load/fullPage needed. */
const shotEl = async (page: Page, locator: Locator, name: string): Promise<void> => {
  await expect(locator).toHaveScreenshot(`${name}.png`, {
    animations: 'disabled',
    mask: dynamicMasks(page),
  });
};

test.describe('Site Navigation', () => {
  test('RM-NAV-01 — Home page', async ({ shopperPage }) => {
    await shopperPage.goto('/');
    await shopperPage.waitForLoadState('load');
    await dismissOverlays(shopperPage);

    await expect(shopperPage.locator('.avia-slide-wrap').first(), 'hero slider should be present').toBeVisible();
    await expect(shopperPage.locator('.avia-animated-number').first(), 'animated numbers should be present').toBeVisible();
    await shot(shopperPage, 'home');
  });

  test('RM-NAV-02 — Header navigation', async ({ shopperPage }) => {
    await shopperPage.goto('/');
    await shopperPage.waitForLoadState('load');
    await dismissOverlays(shopperPage);

    await shopperPage.locator('#menu-item-16307').first().hover();
    await expect(shopperPage.locator('#menu-item-16307 > ul').first(), 'submenu should be visible on hover').toBeVisible();

    await shopperPage.locator('#menu-item-56846').first().hover();
    await expect(shopperPage.locator('#menu-item-16307 > ul').first(), 'submenu should hide when hovering away').not.toBeVisible();

    const header = shopperPage.locator('#header').or(shopperPage.locator('header#header, #avia-header, .av-main-nav-wrap')).first();
    await shotEl(shopperPage, header, 'header');
  });

  test('RM-NAV-03 — Footer', async ({ shopperPage }) => {
    await shopperPage.goto('/');
    await shopperPage.waitForLoadState('load');
    await dismissOverlays(shopperPage);

    await expect(shopperPage.locator('#menu-quick-links'), 'quick links should be present').not.toHaveCount(0);
    await expect(shopperPage.locator('.noLightbox').first(), 'trust badges / images should be present').toBeVisible();
    await shotEl(shopperPage, shopperPage.locator('#av_section_9').first(), 'footer');
  });

  test('RM-NAV-04 — Shop page', async ({ shopperPage }) => {
    await shopperPage.goto('/view-all-products/');
    await shopperPage.waitForLoadState('load');
    await dismissOverlays(shopperPage);

    await expect(shopperPage.locator('ul.products > li').first(), 'products should be listed').toBeVisible();
    await expect(shopperPage.locator('a[href*="/view-all-products/page/"]').first(), 'pagination should exist').toBeVisible();
    await shot(shopperPage, 'shop');
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
    await shot(shopperPage, 'pdp');
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
    await shot(shopperPage, 'variable-product');
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
    await shot(shopperPage, 'cart');
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

    await shopperPage.locator('#place_order').filter({ visible: true }).first().click({ force: true });

    // On this site the Accept.Blue gateway validates client-side and flags the first
    // required field with `.woocommerce-invalid` (no WC server-side error notice on a
    // fully-empty submit). The meaningful guarantees: a required field is flagged AND
    // the order is not placed.
    const invalid = shopperPage.locator('.woocommerce-invalid').first();
    await expect(invalid, 'submitting an empty checkout should flag a required field').toBeVisible({ timeout: 30_000 });
    expect((await invalid.textContent().catch(() => '')) ?? '', 'the flagged field should be named').not.toBe('');
    expect(new URL(shopperPage.url()).pathname, 'an empty checkout must not place an order').not.toContain('order-received');
    await shot(shopperPage, 'checkout-validation', false);
  });
});
