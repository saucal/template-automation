import { test, expect } from '../../fixtures';
import { addMembershipToCart } from '../../helpers/openstudio';

// GI guest #18 — a guest can add membership and reach the WFACP funnel checkout.
// The direct add-to-cart link lands straight on checkout with the membership in cart.
// No purchase: assert the checkout renders with email + place-order controls.
test.describe('Guest · join checkout reachable', { tag: ['@plugin:woocommerce', '@plugin:funnel-builder'] }, () => {
  test('OS-GUEST-join-checkout', async ({ shopperPage }) => {
    await addMembershipToCart(shopperPage, 'monthly');
    await expect(shopperPage.locator('#billing_email, #email').first()).toBeVisible();
    await expect(shopperPage.locator('#place_order').filter({ visible: true }).first()).toBeVisible();
    await expect(shopperPage.locator('.wc-block-components-spinner, .blockUI').first()).toHaveCount(0).catch(() => {});
  });
});
