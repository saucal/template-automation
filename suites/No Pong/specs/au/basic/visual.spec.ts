// AU visual-regression suite — replaces the GI "Basic WooCommerce Test"
// navigation/screenshot chains (home / shop / FAQ / in-the-news / store-locator /
// cart / checkout) that existed only for per-page screenshot comparison, plus the
// two GI checks that are genuinely FUNCTIONAL (slider autoplay 02, subscription
// popup 19) and so are kept as small functional tests, not screenshots.
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
import { type Page } from '@playwright/test';
import { test, expect } from '../../../fixtures';
import { addToCart, dismissPopups } from '../../../helpers/nopong';

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
  { name: 'faq', path: 'faq/' },
  { name: 'in-the-news', path: 'news/' },
  { name: 'store-locator', path: 'stockists/' },
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
    await page.goto('checkout/');
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

test.describe('AU Visual — subscription popup', { tag: ['@plugin:woocommerce'] }, () => {
  // GI 19: on the Monthly Club page, clicking "Join the Club" opens the No Pong
  // product popup modal. We assert the modal appears.
  test('monthly-club "Join the Club" opens product popup', async ({ shopperPage: page }) => {
    await page.goto('monthly-club/');
    await page.waitForLoadState('load');
    await dismissPopups(page);

    const join = page.locator('a[href*="?add-to-cart="]').filter({ hasText: /join the club/i }).first()
      .or(page.getByRole('link', { name: /join the club/i }).first());
    await join.click({ timeout: 15_000 });

    const modal = page.locator('.nopong-product-popup-modal').first();
    await expect(modal, 'subscription product popup modal should appear after Join the Club').toBeVisible({ timeout: 15_000 });
  });
});
