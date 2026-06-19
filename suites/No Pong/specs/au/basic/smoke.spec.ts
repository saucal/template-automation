// Throwaway harness smoke test — validates global-setup admin login, the
// 3-context fixture, relative goto, and (when ANTHROPIC_API_KEY is set) the
// Stagehand bridge. Delete once real specs are green.
import { test, expect } from '../../../fixtures';

test.describe('AU smoke', { tag: ['@plugin:woocommerce'] }, () => {
  test('storefront loads + admin is authenticated', async ({ shopperPage, adminPage }) => {
    await shopperPage.goto('./');
    await shopperPage.waitForLoadState('load');
    await expect(shopperPage, 'storefront title should mention No Pong').toHaveTitle(/no.?pong/i);

    await adminPage.goto('wp-admin/');
    await adminPage.waitForLoadState('domcontentloaded');
    await expect(adminPage.locator('#wpadminbar, body.wp-admin').first(), 'admin bar should be present (logged in)').toBeVisible({ timeout: 15_000 });
  });
});
