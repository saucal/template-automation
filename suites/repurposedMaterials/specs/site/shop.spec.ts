// Shop page behaviour — GI "Basic WooCommerce tests" 04. The migrated
// navigation spec only checked "products exist"; GI actually exercised
// pagination and the WPC location filter. Ported here.
//
// Data-dependent (needs ≥3 pages of products and an "Arizona Inventory"
// location term). Where the catalog can't satisfy a step we warn + skip that
// leg rather than hard-fail, so catalog drift doesn't red the maintenance run.
import { test, expect } from '../../fixtures';
import { dismissOverlays } from '../../helpers/repurposed';

const SHOP = '/view-all-products/';

test.describe('Shop', () => {
  test('RM-SHOP-01 — pagination to page 3', async ({ shopperPage }) => {
    await shopperPage.goto(SHOP);
    await shopperPage.waitForLoadState('load');
    await dismissOverlays(shopperPage);

    const page3 = shopperPage.locator(`a[href*="${SHOP}page/3/"]`).first();
    if ((await page3.count()) === 0) {
      test.skip(true, 'fewer than 3 pages of products — cannot exercise pagination');
      return;
    }
    await page3.click();
    await shopperPage.waitForLoadState('load');
    await dismissOverlays(shopperPage);

    await expect(shopperPage.locator('.page-numbers.current, .current').first(), 'current page marker should read 3').toContainText('3');
    expect(new URL(shopperPage.url()).pathname, 'URL should be on /page/3').toContain('/page/3');
    await expect(shopperPage.locator('ul.products > li').first(), 'page 3 should still list products').toBeVisible();
  });

  test('RM-SHOP-02 — location filter (Arizona Inventory)', async ({ shopperPage }) => {
    await shopperPage.goto(SHOP);
    await shopperPage.waitForLoadState('load');
    await dismissOverlays(shopperPage);

    // WPC filter widget: find the term row by its label text, tick its checkbox.
    const term = shopperPage.locator('.wpc-term-item', { hasText: /arizona inventory/i }).first();
    if ((await term.count()) === 0) {
      test.skip(true, 'WPC "Arizona Inventory" location filter not present');
      return;
    }
    await term.locator('input[type="checkbox"]').first().check({ force: true });

    // Filter applies via AJAX behind an overlay — wait for it to clear.
    await shopperPage.locator('.wpc-filters-overlay').first().waitFor({ state: 'hidden', timeout: 15_000 }).catch(() => {});

    await expect(
      shopperPage.locator('.wpc-filter-chip', { hasText: /arizona inventory/i }).first(),
      'an "Arizona Inventory" filter chip should appear'
    ).toBeVisible({ timeout: 15_000 });
    expect(shopperPage.url(), 'URL should carry the location filter query').toContain('location=');
    await expect(shopperPage.locator('ul.products > li').first(), 'filtered results should list products').toBeVisible();
  });
});
