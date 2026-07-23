import { test, expect } from '../../fixtures';
import { GUEST_PAGES, PATHS } from '../../helpers/openstudio';
import { softScreenshot } from '../../helpers/assertions';

// Visual comparison is NON-FATAL (softScreenshot): a baseline diff warns, doesn't
// fail. Baselines auto-create on first run; review the PNGs before trusting them.
test.describe('Guest · public pages', { tag: ['@plugin:woocommerce'] }, () => {
  for (const [slug, path] of GUEST_PAGES) {
    test(`OS-GUEST-${slug}`, async ({ shopperPage }) => {
      await shopperPage.goto(path, { waitUntil: 'load' });
      await softScreenshot(shopperPage, `${slug}.png`);
    });
  }

  test('OS-GUEST-menu-desktop', async ({ shopperPage }) => {
    await shopperPage.goto(PATHS.home, { waitUntil: 'load' });
    const header = shopperPage.locator('header').first();
    await expect(header).toBeVisible();
    await softScreenshot(shopperPage, 'menu-desktop.png', { locator: header });
  });

  test('OS-GUEST-menu-mobile', async ({ shopperPage }) => {
    await shopperPage.setViewportSize({ width: 390, height: 844 });
    await shopperPage.goto(PATHS.home, { waitUntil: 'load' });
    const header = shopperPage.locator('header').first();
    await softScreenshot(shopperPage, 'menu-mobile.png', { locator: header });
  });
});
