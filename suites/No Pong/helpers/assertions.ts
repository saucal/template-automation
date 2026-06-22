// All expect() for the No Pong suite lives here — specs stay assertion-free
// (rule 6, the only exception being toHaveScreenshot in the visual spec). Every
// expect carries a message (rule 19). Copy-text matches use intent regexes, not
// verbatim strings (rule 26), so a content tweak doesn't break the gate.
//
// Grows per phase: quantity limits (Task 9) → order parity (Task 11) →
// subscription / wholesale asserts (Tasks 13-15).
import { expect, type Page } from '@playwright/test';
import { readFirstCartQty } from './nopong';

/** Default "over the limit" notice — No Pong: "WHOOPS-A-DAISY! ... TOO MANY ITEMS ...". */
const OVER_LIMIT_NOTICE = /too many items|whoops/i;

/**
 * Assert a quantity cap was enforced: the cart shows an over-limit error notice
 * and the line-item quantity was clamped to `clampedQty`. Covers both the
 * single-product tin cap (qty entered above the cap) and the cross-product 85g
 * weight cap (adding another product trips the cap and clamps the first item).
 */
export async function assertQuantityLimit(
  page: Page,
  opts: { clampedQty: string; noticePattern?: RegExp }
): Promise<void> {
  const notice = page
    .locator('.woocommerce-error, .wc-block-components-notice-banner.is-error .wc-block-components-notice-banner__content')
    .first();
  await expect(notice, 'an over-limit error notice should appear when the quantity cap is exceeded')
    .toContainText(opts.noticePattern ?? OVER_LIMIT_NOTICE, { timeout: 15_000 });

  const qty = await readFirstCartQty(page);
  expect(qty, `cart quantity should be clamped to the cap (${opts.clampedQty})`).toBe(opts.clampedQty);
}
