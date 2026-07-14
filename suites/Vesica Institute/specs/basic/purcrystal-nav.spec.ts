// Pur Crystal guest nav + visual (GI "Pur Crystal - Basic WooCommerce Tests - Guest").
// The GI page-by-page nav tests collapse into ONE data-driven visual spec: each public
// page loads (behaviour, rule 35) and matches its full-page screenshot baseline, plus
// the simple + variable product PDPs. Cart/checkout render is covered by the order flow.
//
// Baselines are per-project (`*-purcrystal-darwin.png`); seed with `--update-snapshots`.
import { test, expect } from '../../fixtures';
import { dismissCookieBanner, pickFirstProduct, MINERAL_CATEGORY } from '../../helpers/purcrystal';
import { assertPageRenders } from '../../helpers/assertions';

interface NavPage { name: string; path: string }

// Real slugs from live-exploration + the GI guest spec.
const PAGES: NavPage[] = [
  { name: 'home', path: '/' },
  { name: 'crystals-minerals', path: 'crystals-minerals/' },
  { name: 'category', path: 'crystals-minerals/meteorite/' },
  { name: 'articles', path: 'blog/category/articles/' },
  { name: 'featured', path: 'crystals-minerals/featured-in-minerals-crystals-for-times-of-stress-course/' },
  { name: 'contact', path: 'contact/' },
];

/** Trigger lazy-loaded media before a full-page screenshot (rule 24), bounded so a
 *  placeholder with no src can't hang the wait. */
async function triggerLazyLoad(page: import('@playwright/test').Page): Promise<void> {
  await page.evaluate(async () => {
    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
    const step = Math.max(300, Math.floor(window.innerHeight * 0.9));
    for (let y = 0; y < document.body.scrollHeight; y += step) { window.scrollTo(0, y); await sleep(150); }
    await Promise.all(
      Array.from(document.images).filter((img) => !img.complete).map(
        (img) => new Promise<void>((resolve) => {
          const done = () => resolve();
          img.addEventListener('load', done, { once: true });
          img.addEventListener('error', done, { once: true });
          setTimeout(done, 3_000);
        })
      )
    );
    window.scrollTo(0, 0);
  });
  await page.waitForLoadState('networkidle', { timeout: 8_000 }).catch(() => {});
}

async function snapshot(page: import('@playwright/test').Page, name: string): Promise<void> {
  await assertPageRenders(page, name);
  await triggerLazyLoad(page);
  await expect(page, `${name} visual regression`).toHaveScreenshot(`${name}.png`, {
    fullPage: true,
    animations: 'disabled',
    maxDiffPixelRatio: 0.02,
    mask: [page.getByRole('link', { name: /cart/i }).first()],
  });
}

test.describe(
  'Pur Crystal guest nav + visual',
  { tag: ['@plugin:woocommerce', '@plugin:elementor'] },
  () => {
    for (const { name, path } of PAGES) {
      test(`PC-NAV-${name} – ${name} page loads + visual`, async ({ shopperPage }) => {
        await shopperPage.goto(path, { waitUntil: 'load' });
        await dismissCookieBanner(shopperPage);
        await snapshot(shopperPage, name);
      });
    }

    // Simple product PDP (GI guest test 09).
    test('PC-NAV-product – simple product page loads + visual', async ({ shopperPage }) => {
      await shopperPage.goto('/', { waitUntil: 'load' });
      await pickFirstProduct(shopperPage, MINERAL_CATEGORY, { type: 'simple' });
      await snapshot(shopperPage, 'product');
    });

    // Variable product PDP (GI guest test 10).
    test('PC-NAV-variable-product – variable product page loads + visual', async ({ shopperPage }) => {
      await shopperPage.goto('/', { waitUntil: 'load' });
      await pickFirstProduct(shopperPage, MINERAL_CATEGORY, { type: 'variable' });
      await snapshot(shopperPage, 'variable-product');
    });
  }
);
