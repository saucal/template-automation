// Visual-regression suite for repurposedMATERIALS — the screenshot half of the
// GI "Basic WooCommerce tests" nav chains. navigation.spec.ts keeps the
// functional (render/behaviour) assertions; the pixel comparisons live here.
//
// Same shot()/triggerLazyLoad/dynamicMasks trio the No Pong / PLS / leggari
// suites use, so diffs track layout/markup — not price/date/animation drift.
//
// Maintenance-cycle workflow: refresh baselines BEFORE site changes with
//   npx playwright test specs/site/visual.spec.ts --update-snapshots
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

const openHome = async (page: Page): Promise<void> => {
  await page.goto('/');
  await page.waitForLoadState('load');
  await dismissOverlays(page);
};

const openShop = async (page: Page): Promise<void> => {
  await page.goto('/view-all-products/');
  await page.waitForLoadState('load');
  await dismissOverlays(page);
};

test.describe('RM Visual', () => {
  test('RM-VIS-01 — Home page', async ({ shopperPage: page }) => {
    await openHome(page);
    await shot(page, 'home');
  });

  test('RM-VIS-02 — Header', async ({ shopperPage: page }) => {
    await openHome(page);
    const header = page
      .locator('#header')
      .or(page.locator('header#header, #avia-header, .av-main-nav-wrap'))
      .first();
    await shotEl(page, header, 'header');
  });

  test('RM-VIS-03 — Footer', async ({ shopperPage: page }) => {
    await openHome(page);
    await shotEl(page, page.locator('#av_section_9').first(), 'footer');
  });

  test('RM-VIS-04 — Shop page', async ({ shopperPage: page }) => {
    await openShop(page);
    await shot(page, 'shop');
  });

  test('RM-VIS-05 — Simple product page', async ({ shopperPage: page }) => {
    await openShop(page);
    await page.locator('ul.products > li a.woocommerce-LoopProduct-link').first().click();
    await page.waitForLoadState('load');
    await dismissOverlays(page);
    await shot(page, 'pdp');
  });

  test('RM-VIS-06 — Variable product page', async ({ shopperPage: page }) => {
    await openShop(page);
    const variableLink = page
      .locator('ul.products > li.product-type-variable a.woocommerce-LoopProduct-link')
      .first();
    if ((await variableLink.count()) === 0) {
      test.skip(true, 'No variable products found on shop page');
      return;
    }
    await variableLink.click();
    await page.waitForLoadState('load');
    await dismissOverlays(page);
    await shot(page, 'variable-product');
  });

  test('RM-VIS-07 — Cart page', async ({ shopperPage: page }) => {
    await openShop(page);
    await page.locator('ul.products > li.instock.product-type-simple a.add_to_cart_button').first().click();
    await page
      .locator('.added_to_cart, .woocommerce-message')
      .first()
      .waitFor({ state: 'visible', timeout: 15_000 })
      .catch(() => {});

    await page.goto('/cart/');
    await page.waitForLoadState('load');
    await dismissOverlays(page);
    await shot(page, 'cart');
  });

  test('RM-VIS-08 — Checkout validation state', async ({ shopperPage: page }) => {
    await openShop(page);
    await page.locator('ul.products > li.instock.product-type-simple a.add_to_cart_button').first().click();
    await page
      .locator('.added_to_cart, .woocommerce-message')
      .first()
      .waitFor({ state: 'visible', timeout: 15_000 })
      .catch(() => {});

    await page.goto('/checkout/');
    await page.waitForLoadState('load');
    await dismissOverlays(page);
    await page.locator('form.woocommerce-checkout').waitFor({ state: 'visible', timeout: 15_000 });

    const terms = page.locator('#terms').or(page.locator('#terms_acceptance'));
    if ((await terms.count()) > 0) {
      await terms.first().check({ force: true }).catch(() => {});
    }
    await page.locator('#place_order').click({ force: true });

    await expect(
      page.locator('.woocommerce-error, .woocommerce-NoticeGroup-checkout, .woocommerce-error-message').first(),
      'validation errors should appear'
    ).toBeVisible({ timeout: 30_000 });
    await shot(page, 'checkout-validation', false);
  });
});
