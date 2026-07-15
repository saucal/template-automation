// Pur Crystal guest nav + visual (GI "Pur Crystal - Basic WooCommerce Tests - Guest").
// The GI page-by-page nav tests collapse into ONE data-driven spec: each public page
// loads (behaviour, rule 35) and matches its full-page screenshot baseline, plus the
// simple + variable product PDPs. Cart/checkout render is covered by the order flow.
//
// Stability: full-page scroll-stitch was non-deterministic while cookies were REJECTED —
// consent-gated embeds rendered as lazy placeholders that re-drew as Playwright scrolled.
// ACCEPTING the banner (see dismissCookieBanner) loads the real embeds, which settle to a
// fixed size, so we capture fullPage after freezing CSS motion and hiding fixed overlays.
//
// Baselines are per-project (`*-purcrystal-darwin.png`); seed with `--update-snapshots`.
import { test, expect } from '../../fixtures';
import { dismissCookieBanner, pickFirstProduct, MINERAL_CATEGORY } from '../../helpers/purcrystal';
import { assertPageRenders } from '../../helpers/assertions';

interface NavPage { name: string; path: string }

const PAGES: NavPage[] = [
  { name: 'home', path: '/' },
  { name: 'crystals-minerals', path: 'crystals-minerals/' },
  { name: 'category', path: 'crystals-minerals/meteorite/' },
  { name: 'articles', path: 'blog/category/articles/' },
  { name: 'featured', path: 'crystals-minerals/featured-in-minerals-crystals-for-times-of-stress-course/' },
  { name: 'contact', path: 'contact/' },
];

/** Load lazy media, freeze motion, and HIDE fixed overlays so `fullPage` capture is
 *  stable (fixed elements otherwise smear/recompute between the two stability shots). */
async function stabilize(page: import('@playwright/test').Page): Promise<void> {
  await page.evaluate(async () => {
    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
    const step = Math.max(300, Math.floor(window.innerHeight * 0.9));
    for (let y = 0; y < document.body.scrollHeight; y += step) { window.scrollTo(0, y); await sleep(120); }
    await Promise.all(
      Array.from(document.images).filter((img) => !img.complete).map(
        (img) => new Promise<void>((resolve) => {
          img.addEventListener('load', () => resolve(), { once: true });
          img.addEventListener('error', () => resolve(), { once: true });
          setTimeout(() => resolve(), 3_000);
        })
      )
    );
    window.scrollTo(0, 0);
    const style = document.createElement('style');
    style.textContent =
      '*,*::before,*::after{animation:none!important;transition:none!important;scroll-behavior:auto!important}' +
      // Hide fixed/sticky overlays — they recompute position during full-page capture.
      // The CookieYes banner (.cky-*) is position:fixed and Playwright duplicates it at
      // several scroll offsets during full-page stitch ("banner appears twice"); hide it
      // by vendor class rather than trusting the accept click or the position heuristic.
      '.elementor-menu-cart__container,.woolentor-quickview-modal,[class*="quickview-modal"],[class*="cky-"]{visibility:hidden!important}';
    document.head.appendChild(style);
    document.querySelectorAll<HTMLElement>('*').forEach((el) => {
      const pos = getComputedStyle(el).position;
      if ((pos === 'fixed' || pos === 'sticky') && el.offsetHeight > 0) el.style.visibility = 'hidden';
    });
  });
  await page.waitForLoadState('networkidle', { timeout: 8_000 }).catch(() => {});
}

async function snapshot(page: import('@playwright/test').Page, name: string): Promise<void> {
  await assertPageRenders(page, name);
  await stabilize(page);
  await expect(page, `${name} visual regression`).toHaveScreenshot(`${name}.png`, {
    fullPage: true, // consent-gated embeds settle once cookies are ACCEPTED (see dismissCookieBanner)
    animations: 'disabled',
    maxDiffPixelRatio: 0.02,
    timeout: 30_000,
  });
}

test.describe(
  'Pur Crystal guest nav + visual',
  { tag: ['@plugin:woocommerce', '@plugin:elementor'] },
  () => {
    for (const { name, path } of PAGES) {
      test(`PC-NAV-${name} – ${name} page loads + visual`, async ({ shopperPage }) => {
        await shopperPage.goto(path, { waitUntil: 'domcontentloaded' });
        await dismissCookieBanner(shopperPage);
        await snapshot(shopperPage, name);
      });
    }

    test('PC-NAV-product – simple product page loads + visual', async ({ shopperPage }) => {
      await shopperPage.goto('/', { waitUntil: 'domcontentloaded' });
      await pickFirstProduct(shopperPage, MINERAL_CATEGORY, { type: 'simple' });
      await snapshot(shopperPage, 'product');
    });

    test('PC-NAV-variable-product – variable product page loads + visual', async ({ shopperPage }) => {
      await shopperPage.goto('/', { waitUntil: 'domcontentloaded' });
      await pickFirstProduct(shopperPage, MINERAL_CATEGORY, { type: 'variable' });
      await snapshot(shopperPage, 'variable-product');
    });
  }
);
