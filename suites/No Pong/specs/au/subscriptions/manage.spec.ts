// NP-AU-SUBM — Subscription management. Replaces GI "AU - Subscription Test -
// Cancel/Reactivate/Change Schedule" 21-24: customer cancel → admin reactivate →
// reactivation verification → change billing schedule. Serial on one
// subscription placed by the first test.
//
// Thin spec: actions via the subscription helpers, asserts in assertions.ts
// (rule 6).
import { test } from '../../../fixtures';
import { runSubscriptionFlow } from '../../../helpers/flows';
import {
  cancelSubscriptionAsCustomer,
  changeSubscriptionSchedule,
  goToSubscription,
  setSubscriptionStatusAsAdmin,
} from '../../../helpers/nopong';
import {
  assertScheduleChanged,
  assertSubscriptionPlaced,
  assertSubscriptionStatus,
} from '../../../helpers/assertions';
import type { SubscriptionConfig, SubscriptionResult } from '../../../types/test-config';
import { loginAccount } from '../../../helpers/account';

const config: SubscriptionConfig = {
  testId: 'NP-AU-SUBM-01',
  title: 'AU subscription management (Stripe)',
  region: 'au',
  payment: 'stripe',
  pdp: { kind: 'subscription', slug: '', qty: 1 },
};

const NEW_SCHEDULE = { interval: '3', period: 'week' as const };

const PASSWORD = process.env.PASSWORD || 'QAcustomer!2026';

const chain: { result?: SubscriptionResult } = {};

test.describe.serial('NP-AU-SUBM — Subscription management', { tag: ['@plugin:woocommerce', '@plugin:woocommerce-subscriptions'] }, () => {
  test('NP-AU-SUBM-01 — place the subscription to manage', async ({ shopperPage, adminPage, emailPage }) => {
    const capture = await runSubscriptionFlow({ shopperPage, adminPage, emailPage }, config);
    chain.result = capture.result;
    assertSubscriptionPlaced(capture.result);
  });

  test('NP-AU-SUBM-02 — customer cancels → Pending Cancellation', async ({ shopperPage }) => {
    if (!chain.result) throw new Error('NP-AU-SUBM-01 must place the subscription first');
    // SUBM-01's authenticated context is torn down; this fresh context must log
    // back in as the account created at subscription checkout before cancelling.
    await loginAccount(shopperPage, chain.result.email, PASSWORD);
    await cancelSubscriptionAsCustomer(shopperPage, chain.result.subscriptionNumber);
    await assertSubscriptionStatus(shopperPage, 'Pending Cancellation');
  });

  // shopperPage requested as keepalive — see place-order.spec.ts PO-02 note.
  test('NP-AU-SUBM-03 — admin reactivates → Active', async ({ shopperPage: _keepalive, adminPage }) => {
    if (!chain.result) throw new Error('NP-AU-SUBM-01 must place the subscription first');
    await setSubscriptionStatusAsAdmin(adminPage, chain.result.subscriptionNumber, 'wc-active');
    await assertSubscriptionStatus(adminPage, 'Active');
  });

  test('NP-AU-SUBM-04 — reactivation reflected on the customer view', async ({ shopperPage }) => {
    if (!chain.result) throw new Error('NP-AU-SUBM-01 must place the subscription first');
    await loginAccount(shopperPage, chain.result.email, PASSWORD);
    await goToSubscription(shopperPage, chain.result.subscriptionNumber);
    await assertSubscriptionStatus(shopperPage, 'Active');
  });

  test('NP-AU-SUBM-05 — change billing schedule', async ({ shopperPage }) => {
    if (!chain.result) throw new Error('NP-AU-SUBM-01 must place the subscription first');
    await loginAccount(shopperPage, chain.result.email, PASSWORD);
    await changeSubscriptionSchedule(shopperPage, chain.result.subscriptionNumber, NEW_SCHEDULE);
    await assertScheduleChanged(shopperPage, NEW_SCHEDULE);
  });
});
