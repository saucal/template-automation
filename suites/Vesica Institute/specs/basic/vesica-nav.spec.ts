// Vesica guest nav + visual regression. The GI guest suite's page-by-page nav
// tests collapse into ONE data-driven visual spec (triage rule): each public page
// loads (behaviour assert, rule 35) and matches its full-page screenshot baseline.
// Cart/checkout render is exercised by the orders flow (not duplicated here).
//
// Baselines: generate per-project on first run with `--update-snapshots`
// (filenames carry the project, e.g. home-vesica-darwin.png).
//
// Follow-up (need auth / exact slugs — first-run): Members (/my-account/courses/,
// auth-gated) and the 4 course sub-pages (BG/C&M/SS/VS drill-downs).
import { test, expect } from '../../fixtures';
import { dismissCookieBanner, pickFirstProduct, goToCoursesMenuItem, ALL_PRODUCTS_CATEGORY } from '../../helpers/vesica';
import { assertPageRenders } from '../../helpers/assertions';

interface NavPage {
  name: string;
  path: string;
}

// Real paths captured live from the header nav (docs/site-exploration.md).
// Members (/my-account/courses/) is auth-gated — as a guest it renders the login
// screen; the visual baseline captures that (GI guest test 07).
const PAGES: NavPage[] = [
  { name: 'home', path: '/' },
  { name: 'about', path: 'about-us/' },
  { name: 'courses', path: 'calendar-of-courses-and-events/' },
  { name: 'articles', path: 'article-topics/' },
  { name: 'shop', path: 'product-category/all-products/' },
  { name: 'members', path: 'my-account/courses/' },
  { name: 'contact', path: 'contact-us/' },
];

// Course sub-pages (GI guest test 04) — navigated THROUGH the Courses dropdown (the
// real interaction), identifying each sub-item by its real slug (from live-exploration).
const COURSE_PAGES: Array<{ key: string; slug: string }> = [
  { key: 'course-bg', slug: 'bg-courses/' },
  { key: 'course-cm', slug: 'crystals-and-minerals-courses/' },
  { key: 'course-vs', slug: 'vibrational-science-courses/' },
  { key: 'course-ss', slug: 'spiritual-science-courses/' },
];

/**
 * Trigger lazy-loaded media before a full-page screenshot (rule 24): step-scroll to
 * the bottom, await each <img> decode (BOUNDED — a placeholder with no src fires
 * neither load nor error, so race a 3s timeout), then scroll back to top.
 */
async function triggerLazyLoad(page: import('@playwright/test').Page): Promise<void> {
  await page.evaluate(async () => {
    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
    const step = Math.max(300, Math.floor(window.innerHeight * 0.9));
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await sleep(150);
    }
    await Promise.all(
      Array.from(document.images)
        .filter((img) => !img.complete)
        .map(
          (img) =>
            new Promise<void>((resolve) => {
              const done = () => resolve();
              img.addEventListener('load', done, { once: true });
              img.addEventListener('error', done, { once: true });
              setTimeout(done, 3_000); // bound: unresolved lazy src never fires events
            })
        )
    );
    window.scrollTo(0, 0);
  });
  await page.waitForLoadState('networkidle', { timeout: 8_000 }).catch(() => {});
}

test.describe(
  'Vesica guest nav + visual',
  { tag: ['@plugin:woocommerce', '@plugin:elementor'] },
  () => {
    for (const { name, path } of PAGES) {
      test(`VES-NAV-${name} – ${name} page loads + visual`, async ({ shopperPage }) => {
        await shopperPage.goto(path, { waitUntil: 'load' });
        await dismissCookieBanner(shopperPage);

        // Behaviour: the page rendered real content (not an error/empty shell).
        await assertPageRenders(shopperPage, name);

        await triggerLazyLoad(shopperPage);

        // Mask dynamic chrome (header cart total) so the baseline tracks LAYOUT.
        await expect(shopperPage, `${name} page visual regression`).toHaveScreenshot(`${name}.png`, {
          fullPage: true,
          animations: 'disabled',
          maxDiffPixelRatio: 0.02,
          mask: [shopperPage.getByRole('link', { name: /cart/i }).first()],
        });
      });
    }

    // Course sub-pages (GI guest test 04): navigate via the Courses dropdown, then snapshot.
    for (const { key, slug } of COURSE_PAGES) {
      test(`VES-NAV-${key} – ${key} loads + visual`, async ({ shopperPage }) => {
        await goToCoursesMenuItem(shopperPage, slug);
        await assertPageRenders(shopperPage, key);
        await triggerLazyLoad(shopperPage);
        await expect(shopperPage, `${key} visual regression`).toHaveScreenshot(`${key}.png`, {
          fullPage: true,
          animations: 'disabled',
          maxDiffPixelRatio: 0.02,
          mask: [shopperPage.getByRole('link', { name: /cart/i }).first()],
        });
      });
    }

    // Product page (GI guest test 09): open the first product PDP and snapshot it.
    test('VES-NAV-product – product page loads + visual', async ({ shopperPage }) => {
      await shopperPage.goto('/', { waitUntil: 'load' });
      await pickFirstProduct(shopperPage, ALL_PRODUCTS_CATEGORY);
      await assertPageRenders(shopperPage, 'product');
      await triggerLazyLoad(shopperPage);
      await expect(shopperPage, 'product page visual regression').toHaveScreenshot('product.png', {
        fullPage: true,
        animations: 'disabled',
        maxDiffPixelRatio: 0.02,
        mask: [shopperPage.getByRole('link', { name: /cart/i }).first()],
      });
    });
  }
);
