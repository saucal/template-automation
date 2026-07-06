// AU cart suite — replaces GI Basic 10 (Subscription test - Cart Page). GI added
// a subscription product, opened the cart, set qty=2, and asserted the cart
// totals recomputed. The distinctive bit (no other spec does it) is a CART-PAGE
// quantity change on a subscription product, so it lives here in basic rather
// than in the order-placing subscription specs.
//
// Thin spec: actions via the cart helpers, the single assert in assertions.ts
// (rule 6). Runs at the default desktop viewport (no add-to-cart popup there).
import { test } from '../../../fixtures';
import { addSubscriptionToCart, setCartQtyAndUpdate, setCartShippingDestination } from '../../../helpers/nopong';
import { assertSubscriptionCartTotal } from '../../../helpers/assertions';

test.describe('AU Cart — subscription quantity', { tag: ['@plugin:woocommerce'] }, () => {
  test('NP-AU-CART-01 — subscription recurring total tracks cart quantity', async ({ shopperPage: page }) => {
    await addSubscriptionToCart(page, 'au');
    await setCartQtyAndUpdate(page, 2);
    // GI 10: set an in-region shipping destination so the cart renders full totals.
    await setCartShippingDestination(page, 'au');
    // GI 10 seq 11 (refresh): the qty commits to the session (mini-cart updates),
    // but the cart-page line item/totals can render stale — reload for the fresh,
    // server-rendered qty-2 state (incl. the discounted <ins> price) before asserting.
    await page.waitForLoadState('load');
    await assertSubscriptionCartTotal(page, { qty: 2 });
  });
});
