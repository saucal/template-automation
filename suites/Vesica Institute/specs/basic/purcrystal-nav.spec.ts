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

/** Freeze motion, hide fixed overlays, force lazy media to load eagerly, then scroll the
 *  whole page as the LAST step before capture. fullPage is non-deterministic otherwise:
 *  Playwright's fullPage resize re-triggers IntersectionObserver/lazy image loads *during*
 *  capture, so a one-shot scroll at page-load goes stale. Eager-loading kills the lazy
 *  trigger; the trailing scroll settles progressive content immediately before the shot. */
async function stabilize(page: import('@playwright/test').Page): Promise<void> {
  // Freeze + hide + eager-load first, so the scroll below is the final thing that happens.
  await page.evaluate(() => {
    const style = document.createElement('style');
    style.textContent =
      '*,*::before,*::after{animation:none!important;transition:none!important;scroll-behavior:auto!important}' +
      // The Cookie Law Info settings modal (#cliSettingsPopup / .cli-modal, intrinsic
      // ~1852px) stays in the DOM and gets laid out during fullPage's viewport resize,
      // toggling documentElement.scrollWidth (1280 ↔ 1852) so capture never stabilizes.
      // display:none (NOT visibility:hidden — that keeps the box width) removes it from
      // layout so it can't inflate scrollWidth. Also drop the bar itself.
      '#cookie-law-info-bar,#cliSettingsPopup,.cli-modal,.cli-modal-backdrop,.cli-settings-overlay{display:none!important}' +
      // Belt-and-suspenders clamp for any other horizontal overflow (`clip` forces
      // scrollWidth == clientWidth; `hidden` would still report content width).
      'html,body{overflow-x:clip!important}' +
      // Hide fixed/sticky overlays — they recompute position during full-page capture.
      '.elementor-menu-cart__container,.woolentor-quickview-modal,[class*="quickview-modal"]{visibility:hidden!important}';
    document.head.appendChild(style);
    document.querySelectorAll<HTMLElement>('*').forEach((el) => {
      const pos = getComputedStyle(el).position;
      if ((pos === 'fixed' || pos === 'sticky') && el.offsetHeight > 0) el.style.visibility = 'hidden';
    });
    // loading="lazy" is what re-fires during Playwright's fullPage viewport resize — make
    // every image eager so no image request is left to trigger mid-capture.
    document.querySelectorAll<HTMLImageElement>('img[loading="lazy"]').forEach((img) => { img.loading = 'eager'; });
  });

  // Scroll the whole page (re-reading scrollHeight as progressive content grows it),
  // awaiting every pending image, as the LAST action before toHaveScreenshot.
  await page.evaluate(async () => {
    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
    const step = Math.max(300, Math.floor(window.innerHeight * 0.9));
    for (let y = 0; y < document.body.scrollHeight; y += step) { window.scrollTo(0, y); await sleep(120); }
    window.scrollTo(0, document.body.scrollHeight);
    await Promise.all(
      Array.from(document.images).filter((img) => !img.complete).map(
        (img) => new Promise<void>((resolve) => {
          img.addEventListener('load', () => resolve(), { once: true });
          img.addEventListener('error', () => resolve(), { once: true });
          setTimeout(() => resolve(), 3_000);
        })
      )
    );
    window.scrollTo(0, 0); // back to top so the capture starts from a settled above-fold
  });
  await page.waitForLoadState('networkidle', { timeout: 8_000 }).catch(() => {});
}

async function snapshot(page: import('@playwright/test').Page, name: string): Promise<void> {
  await assertPageRenders(page, name);
  await stabilize(page);
  await expect(page, `${name} visual regression`).toHaveScreenshot(`${name}.png`, {
    fullPage: true, // consent-gated embeds settle once cookies are ACCEPTED (see dismissCookieBanner)
    animations: 'disabled',
    maxDiffPixelRatio: 0.05,
    timeout: 30_000,
  });
}

test.describe(
  'Pur Crystal guest nav + visual',
  { tag: ['@plugin:woocommerce', '@plugin:elementor'] },
  () => {
    for (const { name, path } of PAGES) {
      test(`PC-NAV-${name} – ${name} page loads + visual`, async ({ shopperPage }) => {
        await shopperPage.goto(path, { waitUntil: 'load' });
        await snapshot(shopperPage, name);
      });
    }

    test('PC-NAV-product – simple product page loads + visual', async ({ shopperPage }) => {
      await pickFirstProduct(shopperPage, MINERAL_CATEGORY, { type: 'simple' });
      await snapshot(shopperPage, 'product');
    });

    test('PC-NAV-variable-product – variable product page loads + visual', async ({ shopperPage }) => {
      await pickFirstProduct(shopperPage, MINERAL_CATEGORY, { type: 'variable' });
      await snapshot(shopperPage, 'variable-product');
    });
  }
);
