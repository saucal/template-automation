// PLS-PO — Place-order serial chain. Replaces the GI "PLS - Place Order -
// Multi-Step checkout" suite 01-05 (place / email / backend / refund / refund
// email) — the classic "PLS - Place Order" suite is legacy and intentionally
// not ported. GI Basic 12 (forgot password) also lives here: the chain's
// auto-created account has a Playgrounds inbox its reset email can be read from.
//
// GI's split shopper/backend/email tests merge into single atomic tests with
// three contexts (shopper / admin / email) via the fixture (playbook 8). Thin
// specs: config → flow → assertions; no selectors or raw expect() here (rule 6).
//
// Chain state is shared in module scope (describe.serial runs in one worker):
// the order + account from test 1 feed the refund, password-reset and reorder.
import { test } from '../../fixtures';
import { runOrderFlow, type FlowCapture } from '../../helpers/flows';
import {
  assertBackend,
  assertFrontendParity,
  assertLoggedIn,
  assertMyAccount,
  assertParticipantEmails,
  assertPasswordResetRequested,
  assertPasswordWasReset,
  assertPurchaserEmails,
  assertRefundEmail,
  performAndAssertRefund,
  resetLinkFromEmail,
} from '../../helpers/assertions';
import {
  loginAccount,
  logoutAccount,
  requestPasswordReset,
  setNewPassword,
  submitPasswordReset,
} from '../../helpers/pls';
import type { OrderConfig } from '../../types/test-config';

const PASSWORD2 = process.env.PASSWORD2 || 'QAcustomer!2026';

// Guest multi-step order — the chain's anchor. 3 seats: the site spawns one
// subscription per participant, and 3 participants exercise the full wizard
// (billing-copy checkbox + two fully-filled participant grids).
const guestOrder: OrderConfig = {
  testId: 'PLS-PO-01',
  title: 'Guest multi-step order (Stripe)',
  user: 'guest',
  qty: 3,
  expectedStatus: 'Completed', // virtual subscription courses auto-complete
  refundedStatus: 'Refunded',
};

// Shared across the serial chain.
const chain: { capture?: FlowCapture } = {};

const TAGS = [
  '@plugin:woocommerce',
  '@plugin:woocommerce-gateway-stripe',
  '@plugin:woocommerce-subscriptions',
  '@plugin:pls-core',
  '@plugin:pls-ce-services',
  '@plugin:wt-woocommerce-sequential-order-numbers',
];

test.describe.serial('PLS-PO — Place order (multi-step checkout)', { tag: TAGS }, () => {
  test('PLS-PO-01 — guest order via the 4-step wizard + full parity', async ({ shopperPage, adminPage, emailPage }) => {
    const capture = await runOrderFlow({ shopperPage, adminPage, emailPage }, guestOrder);
    chain.capture = capture;

    assertFrontendParity(capture, guestOrder);
    // The purchaser is auto-signed-in after a guest order — My Account parity runs
    // on the same shopper context.
    await assertMyAccount(shopperPage, capture, guestOrder);
    await assertBackend(adminPage, capture, guestOrder);
    await assertPurchaserEmails(emailPage, capture, guestOrder);
    await assertParticipantEmails(emailPage, capture);
  });

  // shopperPage is requested only as a keepalive: the CDP-attached browser exits
  // when its last real page closes, so admin/email-only tests still need one
  // eager page (see fixtures/index.ts).
  test('PLS-PO-02 — full refund (Stripe) + refund email', async ({ shopperPage: _keepalive, adminPage, emailPage }) => {
    if (!chain.capture) throw new Error('PLS-PO-01 must have produced an order before the refund runs');

    await performAndAssertRefund(adminPage, chain.capture, guestOrder);
    await assertRefundEmail(emailPage, chain.capture);
  });

  test('PLS-PO-03 — purchaser resets password via email and logs back in', async ({ shopperPage }) => {
    if (!chain.capture) throw new Error('PLS-PO-01 must have created an account before the password reset');
    const email = chain.capture.result.email;

    // The purchaser context from PO-01 is gone (fresh context per test) — start
    // logged-out and drive the lost-password flow like GI Basic 12.
    await logoutAccount(shopperPage).catch(() => {});
    await requestPasswordReset(shopperPage);
    await submitPasswordReset(shopperPage, email);
    await assertPasswordResetRequested(shopperPage);

    const link = await resetLinkFromEmail(email);
    await shopperPage.goto(link);
    await shopperPage.waitForLoadState('load');
    await setNewPassword(shopperPage, PASSWORD2);
    await assertPasswordWasReset(shopperPage);

    await loginAccount(shopperPage, email, PASSWORD2);
    await assertLoggedIn(shopperPage);
  });
});
