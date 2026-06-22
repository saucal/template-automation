// NP-AU-PO — Place-order serial chain. Replaces GI New-User 01-05 (place /
// email / backend / refund / refund-email), Logged-User 06-08, and 09 Not
// Wholesale. One worker, in-order: each test builds on the account created by
// the first.
//
// Three browser contexts per test (shopper / admin / email) via the fixture.
// Thin spec: config → flow → assertions. No selectors or raw expect() here
// (rule 6) — all parity lives in helpers/assertions.ts.
//
// Chain state is shared in module scope (describe.serial runs sequentially in
// one worker, so the capture from test 1 is visible to later tests). The refund
// test is gated to a single region (rule 12) via REFUND_PROJECT.
import { test } from '../../../fixtures';
import { runOrderFlow, type FlowCapture } from '../../../helpers/flows';
import {
  assertBackend,
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
  testId: 'NP-AU-PO-01',
  title: 'New-user place order (Stripe)',
  region: 'au',
  product: 'simple',
  user: 'new',
  payment: 'stripe',
  pdp: { kind: 'simple', slug: '', qty: 1 },
  expectedStatus: 'Processing',
  refundedStatus: 'Refunded',
};

// Shared across the serial chain.
const chain: { capture?: FlowCapture; email?: string } = {};

const TAGS = ['@plugin:woocommerce', '@plugin:woocommerce-gateway-stripe', '@plugin:woocommerce-points-and-rewards'];

test.describe.serial('NP-AU-PO — Place order', { tag: TAGS }, () => {
  test('NP-AU-PO-01 — new-user order (Stripe) + full parity', async ({ shopperPage, adminPage, emailPage }) => {
    const capture = await runOrderFlow({ shopperPage, adminPage, emailPage }, newUser);
    chain.capture = capture;
    chain.email = capture.email;

    assertFrontendParity(capture, newUser);
    assertPointsEarned(capture, newUser);
    await assertMyAccount(shopperPage, capture, newUser);
    await assertBackend(adminPage, capture, newUser);
    await assertEmail(emailPage, capture, newUser);
  });

  test('NP-AU-PO-02 — full refund (Stripe) + refund email', async ({ adminPage, emailPage }) => {
    test.skip(process.env.REFUND_PROJECT !== 'au', 'refund is gated to a single region (REFUND_PROJECT)');
    if (!chain.capture) throw new Error('NP-AU-PO-01 must have produced an order before the refund runs');

    await performAndAssertRefund(adminPage, chain.capture!, newUser);
    await assertRefundEmail(emailPage, chain.capture!);
  });

  test('NP-AU-PO-03 — logged-in user reorders (Stripe)', async ({ shopperPage, adminPage, emailPage }) => {
    if (!chain.email) throw new Error('NP-AU-PO-01 must have created an account to reuse');

    const loggedUser: OrderConfig = {
      ...newUser,
      testId: 'NP-AU-PO-03',
      title: 'Logged-in user reorder (Stripe)',
      user: 'logged',
      accountEmail: chain.email,
    };

    await loginAccount(shopperPage, chain.email!, PASSWORD);
    const capture = await runOrderFlow({ shopperPage, adminPage, emailPage }, loggedUser);

    assertFrontendParity(capture, loggedUser);
    await assertMyAccount(shopperPage, capture, loggedUser);
    await assertBackend(adminPage, capture, loggedUser);
  });

  test('NP-AU-PO-04 — non-wholesale user is blocked from wholesale pricing', async ({ shopperPage }) => {
    if (!chain.email) throw new Error('NP-AU-PO-01 must have created an account to log in with');
    await loginAccount(shopperPage, chain.email!, PASSWORD);
    await assertNotWholesale(shopperPage);
  });
});

// PayPal variant — standalone parity (no refund). Exercises the PayPal sandbox
// redirect path of pay(); not part of the Stripe refund chain.
const paypalUser: OrderConfig = {
  testId: 'NP-AU-PO-05',
  title: 'New-user place order (PayPal)',
  region: 'au',
  product: 'simple',
  user: 'new',
  payment: 'paypal',
  pdp: { kind: 'simple', slug: '', qty: 1 },
  expectedStatus: 'Processing',
};

test.describe('NP-AU-PO-05 — PayPal place order', { tag: ['@plugin:woocommerce', '@plugin:woocommerce-paypal-payments'] }, () => {
  test(paypalUser.title, async ({ shopperPage, adminPage, emailPage }) => {
    test.skip(!process.env.PAY_PAL_USER, 'PayPal sandbox credentials (PAY_PAL_USER) not configured');
    const capture = await runOrderFlow({ shopperPage, adminPage, emailPage }, paypalUser);

    assertFrontendParity(capture, paypalUser);
    await assertBackend(adminPage, capture, paypalUser);
    await assertEmail(emailPage, capture, paypalUser);
  });
});
