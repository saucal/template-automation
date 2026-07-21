// AU visual-regression suite — replaces the GI "Basic WooCommerce Test"
// navigation/screenshot chains (home / shop / FAQ / in-the-news / store-locator /
// cart / checkout). The pages keep a layout screenshot, AND the GI checks that were
// genuinely FUNCTIONAL (not pixels) are kept as behaviour tests: slider autoplay (02)
// and mobile add-to-cart popup (19) inline below, plus FAQ accordion (12) and Store
// Locator search (14) via assertFaqAccordion / assertStoreLocatorSearch — GI verified
// real behaviour on those two, which a screenshot alone doesn't cover.
//
// Runs on the project fixture (same as the rest of the suite). Maintenance-cycle
// workflow: run once BEFORE updates with --update-snapshots to refresh baselines,
// then once AFTER to compare — same machine/env both times, so headed-vs-headless
// rendering never mismatches within a cycle. (If the run env changes between
// cycles, just refresh again.)
//
// Data-driven over a page list (no nav duplication); cart/checkout reach state via
// the order helper. Prices/dates are masked so baselines track LAYOUT, not value
// drift between maintenance cycles.
//
// Relative goto only (rule 12): the AU baseURL has a trailing slash, so 'shop/'
// etc. resolve correctly. NEVER start a goto path with '/'.
//
// Refresh baselines:  npx playwright test specs/au/basic/visual.spec.ts --project=au --update-snapshots
import { type Page, type Locator } from '@playwright/test';
import { test, expect } from '../../../fixtures';
import { addToCart, dismissPopups } from '../../../helpers/nopong';
import { assertFaqAccordion, assertStoreLocatorSearch } from '../../../helpers/assertions';

// Mask dynamic content so visual diffs flag layout/markup changes, not price/date drift.
const dynamicMasks = (page: Page) => [
  page.locator('.woocommerce-Price-amount'),
  page.locator('time, .date'),
];

// fullPage screenshots resize the viewport to content height but DON'T fire the
// scroll/intersection events lazy-loaded images wait on — so below-fold images
// capture blank or inconsistent. Step-scroll to the bottom to trigger every
// loader, wait for all images to finish decoding, then scroll back to the top.
const triggerLazyLoad = async (page: Page) => {
  await page.evaluate(async () => {
    const step = window.innerHeight;
    const max = document.body.scrollHeight;
    for (let y = 0; y < max; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 150));
    }
    window.scrollTo(0, 0);
    // Wait for decode of every <img> now in the DOM — but RACE each against a
    // timeout: a lazy placeholder with empty/unassigned src stays !complete and
    // fires neither load nor error, so an unbounded Promise.all would hang forever.
    await Promise.all(
      Array.from(document.images)
        .filter((img) => !img.complete)
        .map((img) => new Promise<void>((res) => {
          const done = () => res();
          img.addEventListener('load', done, { once: true });
          img.addEventListener('error', done, { once: true });
          setTimeout(done, 3000);
        }))
    );
  });
  // networkidle never settles on sites with chat/analytics sockets — bound it.
  await page.waitForLoadState('networkidle', { timeout: 5_000 }).catch(() => {});
};

const shot = async (page: Page, name: string) => {
  await triggerLazyLoad(page);
  await expect(page).toHaveScreenshot(`${name}.png`, {
    fullPage: true,
    animations: 'disabled',
    mask: dynamicMasks(page),
  });
};

// Static content pages reachable directly by URL (relative; no leading slash).
// Slugs confirmed live against https://no-pong-au-develop.go-vip.net/ (all 200):
//   home './', shop 'shop/', FAQ 'faq/' (GI 12), in-the-news 'news/' (GI 13 menu
//   item #menu-item-3129812 → /news/), store-locator 'stockists/' (GI 14).
const PAGES: Array<{ name: string; path: string }> = [
  { name: 'home', path: './' },
  { name: 'shop', path: 'shop/' },
  { name: 'in-the-news', path: 'news/' },
];

test.describe('AU Visual — content pages', { tag: ['@plugin:woocommerce'] }, () => {
  for (const p of PAGES) {
    test(`visual: ${p.name}`, async ({ shopperPage: page }) => {
      await page.goto(p.path);
      await page.waitForLoadState('load');
      await dismissPopups(page);
      await shot(page, p.name);
    });
  }
});

test.describe('AU Visual — cart & checkout', { tag: ['@plugin:woocommerce'] }, () => {
  test('visual: cart', async ({ shopperPage: page }) => {
    await page.goto('./');
    await dismissPopups(page);
    // Empty slug → first non-bundle product on the shop page (intended).
    await addToCart(page, 'au', { kind: 'simple', slug: '', qty: 1 });
    await page.goto('cart/');
    await page.waitForLoadState('load');
    await shot(page, 'cart');
  });

  test('visual: checkout', async ({ shopperPage: page }) => {
    await page.goto('./');
    await dismissPopups(page);
    await addToCart(page, 'au', { kind: 'simple', slug: '', qty: 1 });
    await page.goto('check-out/');
    await page.waitForLoadState('load');
    // No Pong uses CLASSIC WooCommerce checkout — wait for the classic form
    // (best-effort; not the leggari WooFunnels #wfacp_checkout_form).
    await page.locator('form.checkout, form.woocommerce-checkout').first()
      .waitFor({ state: 'visible', timeout: 15_000 }).catch(() => {});
    await shot(page, 'checkout');
  });
});

// --- Functional checks (GI 02 + GI 19) — NOT screenshots --------------------
// These two GI tests verified behaviour, not pixels, so they stay functional.
// The only raw expect allowed here is toBeVisible (with a message).

test.describe('AU Visual — slider autoplay', { tag: ['@plugin:woocommerce'] }, () => {
  // GI 02 screenshotted the gallery slider at t=0 and again after a 12s pause to
  // confirm autoplay advanced. We assert the active slide index changes instead.
  test('home gallery slider autoplays', async ({ shopperPage: page }) => {
    await page.goto('./');
    await page.waitForLoadState('load');
    await dismissPopups(page);

    const slider = page.locator('.wp-block-nopong-limited-gallery-slider.embla--initialized').first()
      .or(page.locator('#tns2-mw').first());
    await expect(slider, 'home gallery slider should be present and initialised').toBeVisible({ timeout: 20_000 });

    // Read the active-slide signature, wait past one autoplay cycle, read again.
    const signature = async () =>
      slider.evaluate((el) => {
        const active = el.querySelector(
          '.embla__slide--selected, .is-selected, .tns-slide-active, [aria-hidden="false"]'
        );
        // Fall back to horizontal transform of the track when no active-class exists.
        const track = el.querySelector<HTMLElement>('.embla__container, .tns-inner, .slider-track');
        return (active?.getAttribute('aria-label') || active?.textContent?.slice(0, 40) || '') +
          '|' + (track ? getComputedStyle(track).transform : '');
      });

    const before = await signature();
    await page.waitForTimeout(12_000); // GI used a 12s pause to clear one autoplay interval
    const after = await signature();
    expect(after, 'gallery slider should advance to a new slide after autoplay interval').not.toBe(before);
  });
});

test.describe('AU Visual — mobile add-to-cart popup', { tag: ['@plugin:woocommerce'] }, () => {
  // GI 19: on MOBILE (≤767px) clicking an add-to-cart link pops the No Pong
  // product modal; on desktop it doesn't (the GI test gated the assert on
  // window.innerWidth). GI only covered the subscription product — we cover a
  // subscription product (Monthly Club) AND a simple product (Shop grid).
  // GI 19 seq 4 clicks the product CARD (`<li>`), not the inner anchor — on
  // mobile, tapping the card is what opens the popup; the add-to-cart link is the
  // GI fallback. The Monthly Club page renders cards in a `.wp-block-handpicked-products`
  // block (per the GI selector); we scope to cards that contain an add-to-cart
  // link and take the first, rather than hardcoding GI's `:nth-of-type(3)` / id 704019.
  const CASES: Array<{ label: string; path: string; trigger: (page: Page) => Locator }> = [
    {
      label: 'subscription product',
      path: 'monthly-club/',
      trigger: (page) => page.locator([
        '.wp-block-handpicked-products > ul > li:has(a[href*="?add-to-cart="])',
        '#main ul.wc-block-grid__products > li:has(a[href*="?add-to-cart="])',
      ].join(', ')).first(),
    },
    {
      label: 'simple product',
      path: 'products/',
      // No GI ref (our addition) — mirror GI's card-tap on the shop grid.
      trigger: (page) =>
        page.locator("ul.wc-block-grid__products > li:not([data-slug*='bundle']):has(a[href*='?add-to-cart='])").first(),
    },
  ];

  for (const c of CASES) {
    test(`mobile add-to-cart opens product popup — ${c.label}`, async ({ mobileShopperPage: page }) => {
      await page.goto(c.path);
      await page.waitForLoadState('load');
      // Fail fast & unambiguously if the mobile context didn't take — separates
      // "emulation not applied" from "popup didn't fire on mobile" (GI 19's gate
      // is window.innerWidth <= 767).
      const innerWidth = await page.evaluate(() => window.innerWidth);
      expect(innerWidth, 'mobileShopperPage should emulate a ≤767px viewport').toBeLessThanOrEqual(767);
      // Clear the cookie banner BEFORE adding — dismissPopups also closes the
      // product modal, so it must not run after the add-to-cart click.
      await dismissPopups(page);

      await c.trigger(page).click({ timeout: 15_000 });

      const modal = page.locator('.nopong-product-popup-modal').first();
      await expect(modal, `${c.label}: product popup modal should appear on mobile after add-to-cart`)
        .toBeVisible({ timeout: 15_000 });
    });
  }
});

// --- Functional content checks (GI 12 + GI 14) — behaviour a screenshot can't cover -
// GI verified these pages FUNCTIONALLY; the assertions live in helpers/assertions.ts
// (rule 6). The layout screenshots above still guard markup/layout regressions.

test.describe('AU Basic — FAQ accordion', { tag: ['@plugin:woocommerce'] }, () => {
  test('faq accordion toggles and embeds a video (GI 12)', async ({ shopperPage: page }) => {
    await page.goto('faq/');
    await page.waitForLoadState('load');
    await dismissPopups(page);
    await assertFaqAccordion(page);
    await shot(page, 'faq');
  });
});

test.describe('AU Basic — store locator search', { tag: ['@plugin:woocommerce'] }, () => {
  test('store locator search: no-results + in-range results + map (GI 14)', async ({ shopperPage: page }) => {
    await page.goto('stockists/');
    await page.waitForLoadState('load');
    await dismissPopups(page);
    // wanaka (NZ) is outside the AU store radius → no results; Alice Springs has stockists.
    await assertStoreLocatorSearch(page, { noResultsQuery: 'wanaka', inRangeQuery: 'Alice Springs' });
    await shot(page, 'stockists');
  });
});
