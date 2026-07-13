// Vesica order chain (serial) — full GI parity ("Vesica - Basic WooCommerce Tests
// - User"). CC test buys the first ALL-PRODUCTS item (a membership: $0 ship/tax,
// status Completed) as a guest that auto-creates + auto-logs-in the account; the
// PayPal test reuses THAT account (set-password chain) to buy a physical product
// (ship+tax, Processing), then it is fully refunded. Order + My-Account + membership
// asserts run in ONE test each so the auto-login session is preserved.
//
// Thin spec — config → flow → assert*; no inline expect() (all in assertions.ts).
// NOTE (first-run verify): PayPal PPCP sandbox popup, Playgrounds email, membership
// page slug, and set-password chain — see docs/site-exploration.md.
import { test } from '../../fixtures';
import type { OrderConfig, OrderResult } from '../../types/test-config';
import { runOrderFlow, establishAccountViaEmail, type OrderFlowCapture } from '../../helpers/flows';
import { performRefund, openAdminOrder, ALL_PRODUCTS_CATEGORY, PHYSICAL_CATEGORY } from '../../helpers/vesica';
import {
  assertValidationErrors,
  assertCartParity,
  assertOrderParity,
  assertMyAccount,
  assertMembershipActive,
  assertBackend,
  assertOrderEmail,
  assertRefund,
  assertRefundEmail,
} from '../../helpers/assertions';

const PASSWORD = process.env.PASSWORD || 'fric2171Biot';

test.describe.serial(
  'Vesica orders',
  { tag: ['@plugin:woocommerce', '@plugin:woocommerce-gateway-authorize-net-cim', '@plugin:woocommerce-paypal-payments', '@plugin:woocommerce-memberships'] },
  () => {
    const ccConfig: OrderConfig = {
      testId: 'VES-PO-01',
      brand: 'vesica',
      user: 'new',
      payment: 'cc',
      categoryPath: ALL_PRODUCTS_CATEGORY,
      expectedStatus: 'Completed',
      isMembership: true,
      expectShipping: false,
      expectTax: false,
    };

    let ccCapture: OrderFlowCapture;
    let ccEmail: string;
    let ppResult: OrderResult;

    test('VES-PO-01 – place order (new user, Credit Card, membership)', async ({ shopperPage }) => {
      ccCapture = await runOrderFlow({ shopperPage }, ccConfig);
      ccEmail = ccCapture.result.billingEmail;
      assertValidationErrors(ccCapture);
      assertCartParity(ccCapture);
      assertOrderParity(ccCapture.result, ccConfig);
      // Guest checkout auto-logs-in the purchaser → My Account + membership in the SAME context.
      await assertMyAccount(shopperPage, ccCapture.result, ccConfig);
      await assertMembershipActive(shopperPage, ccConfig);
    });

    test('VES-PO-01b – CC order backend + email parity', async ({ shopperPage, adminPage, emailPage }) => {
      test.skip(!ccCapture, 'depends on VES-PO-01');
      await assertBackend(adminPage, ccCapture.result, ccConfig);
      await assertOrderEmail(emailPage, ccCapture.result, ccConfig);
    });

    test('VES-PO-02 – place order (logged user, PayPal, physical)', async ({ shopperPage }) => {
      test.skip(!ccEmail, 'depends on VES-PO-01 account');
      // Reuse the CC account: follow its set-password email, then log in.
      await establishAccountViaEmail(shopperPage, ccEmail, PASSWORD);
      const ppConfig: OrderConfig = {
        testId: 'VES-PO-02',
        brand: 'vesica',
        user: 'logged',
        payment: 'paypal',
        categoryPath: PHYSICAL_CATEGORY,
        expectedStatus: 'Processing',
        expectShipping: true,
        expectTax: true,
        accountEmail: ccEmail,
      };
      const cap = await runOrderFlow({ shopperPage }, ppConfig);
      ppResult = cap.result;
      assertCartParity(cap);
      assertOrderParity(ppResult, ppConfig);
      await assertMyAccount(shopperPage, ppResult, ppConfig);
    });

    const ppConfigBase: OrderConfig = {
      testId: 'VES-PO-02', brand: 'vesica', user: 'logged', payment: 'paypal',
      categoryPath: PHYSICAL_CATEGORY, expectedStatus: 'Processing', expectShipping: true, expectTax: true,
    };

    test('VES-PO-02b – PayPal order backend parity', async ({ shopperPage, adminPage }) => {
      test.skip(!ppResult, 'depends on VES-PO-02');
      await assertBackend(adminPage, ppResult, ppConfigBase);
    });

    test('VES-PO-02c – full refund the PayPal order (incl shipping)', async ({ shopperPage, adminPage }) => {
      test.skip(!ppResult, 'depends on VES-PO-02');
      const refundConfig: OrderConfig = {
        ...ppConfigBase, testId: 'VES-PO-02c', expectedStatus: 'Refunded',
        refund: { status: 'Refunded', includeShipping: true, notePattern: /refund/i },
      };
      await openAdminOrder(adminPage, ppResult.postId);
      await performRefund(adminPage, { includeShipping: true, preferApi: true });
      await assertRefund(adminPage, ppResult, refundConfig);
    });

    test('VES-PO-02d – refund email', async ({ shopperPage, emailPage }) => {
      test.skip(!ppResult, 'depends on VES-PO-02');
      await assertRefundEmail(emailPage, ppResult, ppConfigBase);
    });
  }
);
