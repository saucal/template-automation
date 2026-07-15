// Pur Crystal guest nav + visual (GI "Pur Crystal - Basic WooCommerce Tests - Guest").
// The GI page-by-page nav tests collapse into ONE data-driven spec: each public page
// loads (behaviour, rule 35) and matches its full-page screenshot baseline, plus the
// simple + variable product PDPs. Cart/checkout render is covered by the order flow.
//
// Stability (verified live with playwright-cli): fullPage was non-deterministic because the
// JetMenu mega-menu dropdown panels (.jet-mega-menu-mega-container) get laid out on the
// resize/scroll that fullPage capture fires, toggling documentElement.scrollWidth 1280↔1852
// so two consecutive shots never match. stabilize() display:none's those panels. We also
// pre-seed Cookie Law Info consent (acceptCookieConsent) so its bottom-right bar never
// renders into the baseline. Capture after freezing motion, eager-loading media, scrolling.
//
// Baselines are per-project (`*-purcrystal-darwin.png`); seed with `--update-snapshots`.
import { test, expect } from '../../fixtures';
import { acceptCookieConsent, pickFirstProduct, MINERAL_CATEGORY } from '../../helpers/purcrystal';
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
      // ROOT CAUSE of the width oscillation (verified live with playwright-cli): the JetMenu
      // mega-menu dropdown panels (.jet-mega-menu-mega-container, position:absolute, right
      // edge ~1852px) are laid out whenever a resize/scroll fires — which is exactly what
      // fullPage capture does — flipping documentElement.scrollWidth 1280↔1852 so two shots
      // never match. They're hover-only panels (invisible above the fold), so display:none
      // (removes them from layout → no scrollWidth contribution) is safe and deterministic.
      '.jet-mega-menu-mega-container{display:none!important}' +
      // Belt-and-suspenders clamp for any other horizontal overflow.
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
    fullPage: true, // stable once JetMenu mega panels are hidden (see stabilize)
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
        await acceptCookieConsent(shopperPage); // pre-seed before the page renders the cli bar
        await shopperPage.goto(path, { waitUntil: 'load' });
        await snapshot(shopperPage, name);
      });
    }

    test('PC-NAV-product – simple product page loads + visual', async ({ shopperPage }) => {
      await acceptCookieConsent(shopperPage);
      await pickFirstProduct(shopperPage, MINERAL_CATEGORY, { type: 'simple' });
      await snapshot(shopperPage, 'product');
    });

    test('PC-NAV-variable-product – variable product page loads + visual', async ({ shopperPage }) => {
      await acceptCookieConsent(shopperPage);
      await pickFirstProduct(shopperPage, MINERAL_CATEGORY, { type: 'variable' });
      await snapshot(shopperPage, 'variable-product');
    });
  }
);
