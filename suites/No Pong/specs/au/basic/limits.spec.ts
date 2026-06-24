// AU product quantity-limit suite — replaces GI Basic 15 (Tin Limit) and 16 (85g
// Limit). No Pong caps how much product can be in the cart; exceeding a cap pops
// an over-limit error notice and clamps the offending line item.
//
//   - Tin cap (15): a single product entered above its per-item cap clamps back
//     to the cap (17 → 12).
//   - 85g weight cap (16): adding a second product pushes the combined weight
//     over the cap, so the first item is clamped down (11 → 5).
//
// Thin spec: actions via the cart helpers, the single assert in assertions.ts
// (rule 6). Product ids are the AU add-to-cart ids from the GI export.
import { test } from '../../../fixtures';
import { addToCartById, setCartQtyAndUpdate } from '../../../helpers/nopong';
import { assertQuantityLimit } from '../../../helpers/assertions';

// AU add-to-cart ids (GI 15/16): 616 = tin product, 1684403 = second product
// whose combined weight trips the 85g cap.
const TIN_PRODUCT_ID = 616;
const SECOND_PRODUCT_ID = 1684403;

test.describe('AU Quantity limits', { tag: ['@plugin:woocommerce'] }, () => {
  test('NP-AU-LIM-01 — tin per-item cap clamps an over-limit quantity', async ({ shopperPage: page }) => {
    await addToCartById(page, TIN_PRODUCT_ID);
    await setCartQtyAndUpdate(page, 50);
    await assertQuantityLimit(page, { clampedQty: '49' });
  });

  test('NP-AU-LIM-02 — 85g combined-weight cap clamps the cart', async ({ shopperPage: page }) => {
    await addToCartById(page, TIN_PRODUCT_ID);
    await setCartQtyAndUpdate(page, 50);
    // Adding a second product pushes combined weight past the 85g cap → clamp.
    await addToCartById(page, SECOND_PRODUCT_ID);
    await assertQuantityLimit(page, { clampedQty: '48' });
  });
});
