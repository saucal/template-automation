// AU cart suite — replaces GI Basic 10 (Subscription test - Cart Page). GI added
// a subscription product, opened the cart, set qty=2, and asserted the cart
// totals recomputed. The distinctive bit (no other spec does it) is a CART-PAGE
// quantity change on a subscription product, so it lives here in basic rather
// than in the order-placing subscription specs.
//
// Thin spec: actions via the cart helpers, the single assert in assertions.ts
// (rule 6). Runs at the default desktop viewport (no add-to-cart popup there).
import { test } from '../../../fixtures';
import { addSubscriptionToCart, goToCart, setCartQtyAndUpdate, setCartShippingDestination } from '../../../helpers/nopong';
import { assertSubscriptionCartTotal } from '../../../helpers/assertions';

test.describe('AU Cart — subscription quantity', { tag: ['@plugin:woocommerce'] }, () => {
  test('NP-AU-CART-01 — subscription recurring total tracks cart quantity', async ({ shopperPage: page }) => {
    await addSubscriptionToCart(page, 'au');
    await page.waitForLoadState('load');
    await goToCart(page);
    // GI 10: set an in-region shipping destination BEFORE the qty change — the
    // shipping-calculator form POST does not carry cart-quantity fields, and
    // submitting it after the qty update was found to reset the line item back
    // to qty=1 (a real site bug, confirmed via network trace: the calc_shipping
    // response itself renders quantity=1). Doing it first, then changing qty
    // last, avoids that reset — the qty-update AJAX doesn't touch shipping.
    await setCartShippingDestination(page, 'au');
    await setCartQtyAndUpdate(page, 2, { verify: true });
    await assertSubscriptionCartTotal(page, { qty: 2, region: 'au' });
  });
});
