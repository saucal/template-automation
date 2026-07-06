// NP-CA-SUB — Subscription place + backend + email + renew. Replaces GI
// "CA - Subscription test" 01-04 (place / backend / email / renew). Serial chain
// on one subscription: the place test feeds the backend/email/renew tests.
//
// Thin spec: config → flow → assertions (rule 6). The subscription product is
// added from the Monthly Club page; checkout runs the subscription gateway path.
import { test } from '../../../fixtures';
import { runSubscriptionFlow, subscriptionAsOrder } from '../../../helpers/flows';
import {
  assertBackend,
  assertCheckoutStories,
  assertFrontendParity,
  assertMyAccount,
  assertPointsEarned,
  assertSubscriptionBackend,
  assertSubscriptionEmail,
  assertSubscriptionPlaced,
  performAndAssertRenewal,
} from '../../../helpers/assertions';
import type { SubscriptionConfig, SubscriptionResult } from '../../../types/test-config';

const config: SubscriptionConfig = {
  testId: 'NP-CA-SUB-01',
  title: 'CA subscription place order (Stripe)',
  region: 'ca',
  payment: 'stripe',
  pdp: { kind: 'subscription', slug: '', qty: 1 },
  expectedSubStatus: 'Active',
};

const chain: { result?: SubscriptionResult } = {};

test.describe.serial('NP-CA-SUB — Subscription', { tag: ['@plugin:woocommerce', '@plugin:woocommerce-subscriptions', '@plugin:woocommerce-gateway-stripe'] }, () => {
  test('NP-CA-SUB-01 — place subscription order', async ({ shopperPage, adminPage, emailPage }) => {
    const capture = await runSubscriptionFlow({ shopperPage, adminPage, emailPage }, config);
    chain.result = capture.result;
    const orderCfg = subscriptionAsOrder(config);

    assertSubscriptionPlaced(capture.result, config.region);
    assertCheckoutStories(capture.stories);
    // Same order-parity coverage a normal order gets, plus recurring-totals parity
    // (inside assertFrontendParity / assertMyAccount when the capture has recurring).
    assertFrontendParity(capture, orderCfg);
    assertPointsEarned(capture.result, orderCfg);
    await assertMyAccount(shopperPage, capture.result, orderCfg);
    await assertBackend(adminPage, capture.result, orderCfg);
  });

  // shopperPage requested as keepalive — see place-order.spec.ts PO-02 note:
  // the CDP-attached browser needs one eager real page or admin/email ops detach.
  test('NP-CA-SUB-02 — backend: subscription Active + recurring total', async ({ shopperPage: _keepalive, adminPage }) => {
    if (!chain.result) throw new Error('NP-CA-SUB-01 must place the subscription first');
    await assertSubscriptionBackend(adminPage, chain.result);
  });

  test('NP-CA-SUB-03 — subscription confirmation email', async ({ shopperPage: _keepalive, emailPage }) => {
    if (!chain.result) throw new Error('NP-CA-SUB-01 must place the subscription first');
    await assertSubscriptionEmail(emailPage, chain.result);
  });

  test('NP-CA-SUB-04 — admin renewal creates a renewal order', async ({ shopperPage: _keepalive, adminPage }) => {
    if (!chain.result) throw new Error('NP-CA-SUB-01 must place the subscription first');
    await performAndAssertRenewal(adminPage, chain.result);
  });
});
