// Pur Crystal guest nav (GI "Pur Crystal - Basic WooCommerce Tests - Guest").
// GI navigated to each guest page and confirmed it loads — it did NOT do visual
// regression. This site's pages carry persistent motion (autoplay hero/carousels)
// that never settles into two stable full-page shots, so pixel baselines are unviable
// AND beyond GI's scope. We assert the GI parity: each page LOADS its main content
// (behaviour, rule 35) + the simple/variable product PDPs render. Cart/checkout render
// is covered by the order flow; the contact-form submit is in vesica-contact... spec.
import { test } from '../../fixtures';
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

test.describe(
  'Pur Crystal guest nav',
  { tag: ['@plugin:woocommerce', '@plugin:elementor'] },
  () => {
    for (const { name, path } of PAGES) {
      test(`PC-NAV-${name} – ${name} page loads`, async ({ shopperPage }) => {
        await shopperPage.goto(path, { waitUntil: 'domcontentloaded' });
        await dismissCookieBanner(shopperPage);
        await assertPageRenders(shopperPage, name);
      });
    }

    // Simple product PDP (GI guest test 09).
    test('PC-NAV-product – simple product page loads', async ({ shopperPage }) => {
      await shopperPage.goto('/', { waitUntil: 'domcontentloaded' });
      await pickFirstProduct(shopperPage, MINERAL_CATEGORY, { type: 'simple' });
      await assertPageRenders(shopperPage, 'product');
    });

    // Variable product PDP (GI guest test 10).
    test('PC-NAV-variable-product – variable product page loads', async ({ shopperPage }) => {
      await shopperPage.goto('/', { waitUntil: 'domcontentloaded' });
      await pickFirstProduct(shopperPage, MINERAL_CATEGORY, { type: 'variable' });
      await assertPageRenders(shopperPage, 'variable-product');
    });
  }
);
