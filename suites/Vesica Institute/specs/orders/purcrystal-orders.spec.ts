// Pur Crystal order chain (serial) — full GI parity ("Pur Crystal - Basic WooCommerce
// Tests - USer"). Guest places a CC order (Auth.Net, qty 2, ship-to-different-address)
// for the first simple product in the meteorite category, then it's verified in the
// backend and fully refunded by admin. CC-only — no membership / PayPal / account.
//
// Thin spec — config → flow → assert*; no inline expect() (all in assertions.ts).
// NOTE (first-run verify): Auth.Net refund button (API vs manual) + FL tax value.
import { test } from '../../fixtures';
import type { OrderConfig, OrderResult } from '../../types/test-config';
import { runOrderFlow, type OrderFlowCapture } from '../../helpers/flows';
import { performRefund, openAdminOrder, MINERAL_CATEGORY } from '../../helpers/purcrystal';
import {
  assertValidationErrors,
  assertCartParity,
  assertOrderParity,
  assertMyAccount,
  assertBackend,
  assertOrderEmail,
  assertRefund,
  assertRefundEmail,
} from '../../helpers/assertions';

test.describe.serial(
  'Pur Crystal orders',
  { tag: ['@plugin:woocommerce', '@plugin:woocommerce-gateway-authorize-net-cim'] },
  () => {
    const ccConfig: OrderConfig = {
      testId: 'PC-PO-01',
      brand: 'purcrystal',
      user: 'new',
      payment: 'cc',
      categoryPath: MINERAL_CATEGORY,
      qty: 2,
      shipToDifferent: true,
      expectedStatus: 'Processing',
      expectShipping: true,
      expectTax: false, // FL/AvaTax value confirmed on first run; cross-surface parity still asserted
    };

    let cap: OrderFlowCapture;
    let result: OrderResult;

    test('PC-PO-01 – place order (new user, CC, qty 2, ship-to-different)', async ({ shopperPage }) => {
      cap = await runOrderFlow({ shopperPage }, ccConfig);
      result = cap.result;
      assertValidationErrors(cap);
      assertCartParity(cap);
      assertOrderParity(result, ccConfig);
      // Guest checkout auto-logs-in the purchaser → My Account parity in the same context.
      await assertMyAccount(shopperPage, result, ccConfig);
    });

    test('PC-PO-02 – CC order backend + email parity', async ({ shopperPage, adminPage, emailPage }) => {
      test.skip(!result, 'depends on PC-PO-01');
      await assertBackend(adminPage, result, ccConfig);
      await assertOrderEmail(emailPage, result, ccConfig);
    });

    test('PC-PO-04 – refund by admin', async ({ shopperPage, adminPage }) => {
      test.skip(!result, 'depends on PC-PO-01');
      const refundConfig: OrderConfig = {
        ...ccConfig, testId: 'PC-PO-04', expectedStatus: 'Refunded',
        refund: { status: 'Refunded', includeShipping: true, notePattern: /refund/i },
      };
      await openAdminOrder(adminPage, result.postId);
      await performRefund(adminPage, { includeShipping: true, preferApi: true });
      await assertRefund(adminPage, result, refundConfig);
    });

    test('PC-PO-05 – refund email', async ({ shopperPage, emailPage }) => {
      test.skip(!result, 'depends on PC-PO-01');
      await assertRefundEmail(emailPage, result, ccConfig);
    });
  }
);
