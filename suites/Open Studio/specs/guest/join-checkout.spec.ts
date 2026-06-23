import { test, expect } from '../../fixtures';
import { PATHS, dismissPopups } from '../../helpers/openstudio';

// GI guest #18 — a guest can add membership and reach the Blocks checkout page.
// No purchase: assert the checkout renders with email + place-order controls.
test.describe('Guest · join checkout reachable [WooCommerce][WC Blocks]', () => {
  test('OS-GUEST-join-checkout', async ({ shopperPage }) => {
    await shopperPage.goto(`${PATHS.membershipProduct}?attribute_frequency=Monthly`, { waitUntil: 'networkidle' });
    await dismissPopups(shopperPage);
    await shopperPage.locator('button[name="add-to-cart"]')
      .or(shopperPage.getByRole('link', { name: /Sign Up|Join/i })).first().click();
    await shopperPage.goto(PATHS.checkout, { waitUntil: 'networkidle' });
    await expect(shopperPage.locator('#billing_email, #email, .wc-block-components-text-input input').first()).toBeVisible();
    await expect(shopperPage.locator('button.wc-block-components-checkout-place-order-button')).toBeVisible();
  });
});
