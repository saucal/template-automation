// Template for the admin gateway refund. Four things go wrong here, each of them
// SILENTLY (the click resolves, the test carries on, the failure surfaces later on
// an unrelated assertion):
//   1. The refund form starts empty → WC computes $0 → no gateway note.
//   2. The submit button confirms via a NATIVE dialog. Playwright's default is to
//      DISMISS, so the refund is cancelled. Ghost Inspector auto-ACCEPTS dialogs,
//      which is why no GI step covers this and ports miss it.
//   3. Ending the flow on `.catch(() => {})` waits means "refund never ran" and
//      "refund succeeded" look identical — wait for a positive signal instead.
//   4. Hardcoding the amount in the note regex drifts the moment the test's
//      product/plan changes; derive it from the captured order total.
import { expect, type Page } from '@playwright/test';

/** Money string → numeric (2dp); '' / 'Free' → NaN. */
function toAmount(text: string): number {
  return parseFloat((text || '').replace(/[^0-9.-]/g, ''));
}

export async function runRefundFlow(adminPage: Page, postId: string): Promise<void> {
  await adminPage.goto(`/wp-admin/post.php?post=${postId}&action=edit`);
  await adminPage.waitForLoadState('load');

  await adminPage.locator('button.refund-items').click();

  // Copy ordered qty → refund qty. WC recomputes the line total on `change`; a
  // Playwright fill fires it on blur, but dispatch explicitly so the recalc lands
  // before submit. Do the same for tr.fee / tr.shipping line_cost + line_tax.
  const qtyInputs = adminPage.locator('input.refund_order_item_qty');
  const viewQtys = adminPage.locator('tbody#order_line_items > tr > td.quantity > div.view');
  const count = await qtyInputs.count();
  for (let i = 0; i < count; i++) {
    const qtyText = (await viewQtys.nth(i).textContent().catch(() => '')) ?? '';
    await qtyInputs.nth(i).fill((qtyText.match(/\d+/) ?? ['1'])[0]);
    await qtyInputs.nth(i).dispatchEvent('change');
  }

  await adminPage.locator('#refund_reason').fill('Testing Refund');

  // Gate on a computed amount > 0 — a silent $0 refund leaves no gateway note, and
  // the assertion then fails on a MISSING note, which points nowhere useful.
  await adminPage
    .locator('.do-api-refund .wc-order-refund-amount .woocommerce-Price-amount.amount')
    .first()
    .waitFor({ state: 'visible', timeout: 10_000 });

  // `on`, NOT `once`: a tiered/retrying click wrapper (resilient-locators) may click
  // more than once, and a consumed handler lets the retry's dialog fall back to
  // auto-dismiss. Never `.catch()` the accept() — it rejects exactly when something
  // else already handled (i.e. cancelled) the dialog, the one case worth surfacing.
  adminPage.on('dialog', (d) => d.accept());
  await adminPage.locator('button.do-api-refund').click();

  await adminPage.locator('.blockUI').first().waitFor({ state: 'visible', timeout: 20_000 }).catch(() => {});
  await adminPage.locator('.blockUI').first().waitFor({ state: 'detached', timeout: 20_000 }).catch(() => {});

  // Positive signal: WC appends the refund line item only after the gateway call
  // succeeds. Without this, the swallowed waits above let a cancelled refund return
  // "successfully" and fail 20s later on the status/note assertion.
  await adminPage.locator('tr.refund').first().waitFor({ timeout: 20_000 });
}

/**
 * Refund-note pattern. Gateway SHAPE is config-driven; the AMOUNT is derived from the
 * captured order total, never a literal — a hardcoded `999\.00` silently stops
 * matching the day the spec's plan becomes $199. Escaping the captured string (rather
 * than reformatting a number) keeps thousands separators and currency symbol intact,
 * because the note prints the same `wc_price` output as the thank-you page.
 */
export function refundNotePattern(capturedTotal: string, override?: RegExp): RegExp {
  if (override) return override;
  const amount = capturedTotal.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return new RegExp(`Refunded ${amount}.*Refund ID: \\w+`);
}

/** Assert the refunded amount numerically too — catches a partial/zero refund. */
export function expectRefundedTotal(noteText: string, capturedTotal: string): void {
  expect(toAmount(noteText), `refund note should refund the full ${capturedTotal}`).toBe(
    toAmount(capturedTotal)
  );
}
