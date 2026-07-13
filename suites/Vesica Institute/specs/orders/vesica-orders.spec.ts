// Vesica order chain (serial): CC place-order + backend/email parity, then the
// PayPal (PPCP) order + backend + refund + refund-email. Thin spec — config →
// flow → assert*; no inline expect() (all assertions live in helpers/assertions.ts).
// Parity source = the GI generated spec `vesica-basic-woocommerce-tests-user`.
//
// NOTE (first-run verify): the PayPal PPCP sandbox popup + the refund gateway note
// text/status are confirmed on the first live run (see docs/site-exploration.md).
import { test } from '../../fixtures';
import type { OrderConfig, OrderResult } from '../../types/test-config';
import { runOrderFlow } from '../../helpers/flows';
import { performRefund, openAdminOrder } from '../../helpers/vesica';
import {
  assertOrderParity,
  assertBackend,
  assertOrderEmail,
  assertRefund,
  assertRefundEmail,
} from '../../helpers/assertions';

test.describe.serial(
  'Vesica orders',
  { tag: ['@plugin:woocommerce', '@plugin:woocommerce-gateway-authorize-net-cim', '@plugin:woocommerce-paypal-payments'] },
  () => {
    const ccConfig: OrderConfig = {
      testId: 'VES-PO-01',
      brand: 'vesica',
      user: 'new',
      payment: 'cc',
      expectedStatus: 'Processing',
    };
    const ppConfig: OrderConfig = {
      testId: 'VES-PO-02',
      brand: 'vesica',
      user: 'new',
      payment: 'paypal',
      expectedStatus: 'Processing',
    };
    const ppRefundConfig: OrderConfig = {
      ...ppConfig,
      testId: 'VES-PO-02c',
      refund: { status: 'Refunded', notePattern: /refund/i },
    };

    let ccResult: OrderResult;
    let ppResult: OrderResult;

    test('VES-PO-01 – place order (new user, Credit Card)', async ({ shopperPage }) => {
      ccResult = await runOrderFlow({ shopperPage }, ccConfig);
      assertOrderParity(ccResult, ccConfig);
    });

    test('VES-PO-01b – CC order backend + email parity', async ({ shopperPage, adminPage, emailPage }) => {
      test.skip(!ccResult, 'depends on VES-PO-01');
      await assertBackend(adminPage, ccResult, ccConfig);
      await assertOrderEmail(emailPage, ccResult, ccConfig);
    });

    test('VES-PO-02 – place order (PayPal)', async ({ shopperPage }) => {
      ppResult = await runOrderFlow({ shopperPage }, ppConfig);
      assertOrderParity(ppResult, ppConfig);
    });

    test('VES-PO-02b – PayPal order backend parity', async ({ shopperPage, adminPage }) => {
      test.skip(!ppResult, 'depends on VES-PO-02');
      await assertBackend(adminPage, ppResult, ppConfig);
    });

    test('VES-PO-02c – refund the PayPal order', async ({ shopperPage, adminPage }) => {
      test.skip(!ppResult, 'depends on VES-PO-02');
      await openAdminOrder(adminPage, ppResult.postId);
      await performRefund(adminPage, { preferApi: true });
      await assertRefund(adminPage, ppRefundConfig);
    });

    test('VES-PO-02d – refund email', async ({ shopperPage, emailPage }) => {
      test.skip(!ppResult, 'depends on VES-PO-02');
      await assertRefundEmail(emailPage, ppResult, ppRefundConfig);
    });
  }
);
