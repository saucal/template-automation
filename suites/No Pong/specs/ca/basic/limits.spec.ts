// CA product quantity-limit suite. Unlike AU (a combined-weight cap), the CA
// store enforces a PER-ITEM cap on each product, and the notice copy differs:
//   "There is a limit of N items per order." — not AU's "WHOOPS… TOO MANY ITEMS".
//
//   - 35g cap: 12 per order (product 616).
//   - 85g cap:  6 per order (product 1684403).
//
// Thin spec: actions via the cart helpers, the single assert in assertions.ts
// (rule 6). Each test sets the line qty well above the cap and expects it to be
// clamped back to the cap.
import { test } from '../../../fixtures';
import { addToCartById, setCartQtyAndUpdate } from '../../../helpers/nopong';
import { assertQuantityLimit } from '../../../helpers/assertions';

// CA add-to-cart ids: 616 = 35g product (confirmed live: 12-item cap). 1684403 =
// 85g product (from the AU export; confirm the CA id if LIM-02 finds no product).
const PRODUCT_35G_ID = 616;
const PRODUCT_85G_ID = 750731;

// CA over-limit notice, e.g. "There is a limit of 12 items per order."
const caLimitNotice = (cap: number) => new RegExp(`limit of ${cap} items per order`, 'i');

test.describe('CA Quantity limits', { tag: ['@plugin:woocommerce'] }, () => {
  test('NP-CA-LIM-01 — 35g per-item cap clamps to 12', async ({ shopperPage: page }) => {
    await addToCartById(page, PRODUCT_35G_ID);
    await setCartQtyAndUpdate(page, 12);
    await setCartQtyAndUpdate(page, 13);
    await assertQuantityLimit(page, { clampedQty: '12', noticePattern: caLimitNotice(12) });
  });

  test('NP-CA-LIM-02 — 85g per-item cap clamps to 6', async ({ shopperPage: page }) => {
    await addToCartById(page, PRODUCT_85G_ID);
    await setCartQtyAndUpdate(page, 6);
    await setCartQtyAndUpdate(page, 7);
    await assertQuantityLimit(page, { clampedQty: '6' });
  });
});
