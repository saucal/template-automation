import { test, expect } from '../../fixtures';
import { addMembershipToCart } from '../../helpers/openstudio';

// GI guest #18 — a guest can add membership and reach the Blocks checkout page.
// The direct add-to-cart link lands straight on checkout with the membership in cart.
// No purchase: assert the checkout renders with email + place-order controls.
test.describe('Guest · join checkout reachable [WooCommerce][WC Blocks]', () => {
  test('OS-GUEST-join-checkout', async ({ shopperPage }) => {
    await addMembershipToCart(shopperPage, 'monthly');
    await expect(shopperPage.locator('#billing_email, #email, .wc-block-components-text-input input').first()).toBeVisible();
    await expect(shopperPage.locator('button.wc-block-components-checkout-place-order-button')).toBeVisible();
  });
});
