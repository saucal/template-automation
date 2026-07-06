// NP-CA-PO — Place-order serial chain. Replaces GI New-User 01-05 (place /
// email / backend / refund / refund-email), Logged-User 06-08, and 09 Not
// Wholesale. One worker, in-order: each test builds on the account created by
// the first.
//
// Three browser contexts per test (shopper / admin / email) via the fixture.
// Thin spec: config → flow → assertions. No selectors or raw expect() here
// (rule 6) — all parity lives in helpers/assertions.ts.
//
// Chain state is shared in module scope (describe.serial runs sequentially in
// one worker, so the capture from test 1 is visible to later tests). Each region
// refunds its own order on its own site (rule 12).
import { test } from '../../../fixtures';
import { runOrderFlow, type FlowCapture } from '../../../helpers/flows';
import {
  assertBackend,
  assertCheckoutStories,
  assertEmail,
  assertFrontendParity,
  assertMyAccount,
  assertNotWholesale,
  assertPointsEarned,
  assertRefundEmail,
  performAndAssertRefund,
} from '../../../helpers/assertions';
import { loginAccount } from '../../../helpers/account';
import type { OrderConfig } from '../../../types/test-config';

const PASSWORD = process.env.PASSWORD || 'QAcustomer!2026';

// Stripe new-user order — the chain's anchor (its account + order feed the rest).
const newUser: OrderConfig = {
  testId: 'NP-CA-PO-01',
  title: 'New-user place order (Stripe)',
  region: 'ca',
  product: 'simple',
  user: 'new',
  payment: 'stripe',
  pdp: { kind: 'simple', slug: '', qty: 1 },
  expectedStatus: 'Processing',
  refundedStatus: 'Refunded',
  savePaymentMethod: true, // save the card so PO-03 can reorder with it
};

// Shared across the serial chain.
const chain: { capture?: FlowCapture; email?: string } = {};

const TAGS = ['@plugin:woocommerce', '@plugin:woocommerce-gateway-stripe', '@plugin:woocommerce-points-and-rewards'];

test.describe.serial('NP-CA-PO — Place order', { tag: TAGS }, () => {
  test('NP-CA-PO-01 — new-user order (Stripe) + full parity', async ({ shopperPage, adminPage, emailPage }) => {
    const capture = await runOrderFlow({ shopperPage, adminPage, emailPage }, newUser);
    chain.capture = capture;
    chain.email = capture.email;

    assertFrontendParity(capture, newUser);
    assertCheckoutStories(capture.stories);
    assertPointsEarned(capture.result, newUser);
    await assertMyAccount(shopperPage, capture.result, newUser);
    await assertBackend(adminPage, capture.result, newUser);
    await assertEmail(emailPage, capture, newUser);
  });

  // shopperPage is requested only as a keepalive: the CDP-attached browser exits
  // when its last real page closes (and a lone stray about:blank confuses
  // connectOverCDP's active-target resolution), so admin/email-only tests still
  // need one eager page to keep adminPage.reload() etc. attached.
  test('NP-CA-PO-02 — full refund (Stripe) + refund email', async ({ shopperPage: _keepalive, adminPage, emailPage }) => {
    if (!chain.capture) throw new Error('NP-CA-PO-01 must have produced an order before the refund runs');

    await performAndAssertRefund(adminPage, chain.capture!, newUser);
    await assertRefundEmail(emailPage, chain.capture!);
  });

  test('NP-CA-PO-03 — logged-in user reorders (Stripe)', async ({ shopperPage, adminPage, emailPage }) => {
    if (!chain.email) throw new Error('NP-CA-PO-01 must have created an account to reuse');

    const loggedUser: OrderConfig = {
      ...newUser,
      testId: 'NP-CA-PO-03',
      title: 'Logged-in user reorder (Stripe)',
      user: 'logged',
      accountEmail: chain.email,
      savePaymentMethod: false,
      useSavedCard: true, // reuse the card saved in PO-01
    };

    await loginAccount(shopperPage, chain.email!, PASSWORD);
    const capture = await runOrderFlow({ shopperPage, adminPage, emailPage }, loggedUser);

    assertFrontendParity(capture, loggedUser);
    await assertMyAccount(shopperPage, capture.result, loggedUser);
    await assertBackend(adminPage, capture.result, loggedUser);
  });

  test('NP-CA-PO-04 — non-wholesale user is blocked from wholesale pricing', async ({ shopperPage }) => {
    if (!chain.email) throw new Error('NP-CA-PO-01 must have created an account to log in with');
    await loginAccount(shopperPage, chain.email!, PASSWORD);
    await assertNotWholesale(shopperPage);
  });
});

// PayPal variant — standalone parity (no refund). Exercises the PayPal sandbox
// redirect path of pay(); not part of the Stripe refund chain.
const paypalUser: OrderConfig = {
  testId: 'NP-CA-PO-05',
  title: 'New-user place order (PayPal)',
  region: 'ca',
  product: 'simple',
  user: 'new',
  payment: 'paypal',
  pdp: { kind: 'simple', slug: '', qty: 1 },
  expectedStatus: 'Processing',
};

test.describe('NP-CA-PO-05 — PayPal place order', { tag: ['@plugin:woocommerce', '@plugin:woocommerce-paypal-payments'] }, () => {
  test(paypalUser.title, async ({ shopperPage, adminPage, emailPage }) => {
    test.skip(!process.env.PAY_PAL_USER, 'PayPal sandbox credentials (PAY_PAL_USER) not configured');
    const capture = await runOrderFlow({ shopperPage, adminPage, emailPage }, paypalUser);

    assertFrontendParity(capture, paypalUser);
    await assertBackend(adminPage, capture.result, paypalUser);
    await assertEmail(emailPage, capture, paypalUser);
  });
});
