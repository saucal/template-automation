// NP-AU-WS — Wholesale. Replaces GI 17 (Wholesale access) + 18 (Wholesale Place
// Order): a wholesale customer logs in, sees the gated wholesale catalogue, and
// places a wholesale-priced order. Serial: login/access → order.
//
// Thin spec: actions via the wholesale helpers, asserts in assertions.ts
// (rule 6). The wholesale account is pre-provisioned; credentials come from the
// environment (WHOLESALE_USER / WHOLESALE_PASS) — never hardcoded.
import { test } from '../../../fixtures';
import { runWholesaleFlow } from '../../../helpers/flows';
import { wholesaleLogin } from '../../../helpers/nopong';
import { assertWholesaleAccess, assertWholesalePricing } from '../../../helpers/assertions';
import type { WholesaleConfig } from '../../../types/test-config';
import { loginAccount } from '../../../helpers/account';

const WHOLESALE_USER = process.env.WHOLESALE_USER || '';
const WHOLESALE_PASS = process.env.WHOLESALE_PASS || '';

const config: WholesaleConfig = {
  testId: 'NP-AU-WS-01',
  title: 'AU wholesale place order (Stripe)',
  region: 'au',
  email: WHOLESALE_USER,
  pdp: { kind: 'simple', slug: '', qty: 1 },
  payment: 'stripe',
};

test.describe.serial('NP-AU-WS — Wholesale', { tag: ['@plugin:woocommerce', '@plugin:woocommerce-wholesale-prices'] }, () => {
  test.skip(!WHOLESALE_USER || !WHOLESALE_PASS, 'wholesale credentials (WHOLESALE_USER / WHOLESALE_PASS) not configured');
  // The preprod wholesale-products page renders an EMPTY catalogue
  // (<ul class="wc-block-grid__products"></ul>) — the handpicked-products block
  // has no published/in-stock products assigned, though the account is correctly
  // wholesale-approved (My Account "Wholesale products" nav link present). GI
  // expected 8 products. Both tests need products to exist; un-skip once preprod
  // wholesale catalogue is populated.
  test.skip(false, 'preprod wholesale catalogue renders no products (data/config gap, not a test bug)');

  test('NP-AU-WS-01 — wholesale login unlocks the wholesale catalogue', async ({ shopperPage }) => {
    await loginAccount(shopperPage, WHOLESALE_USER, WHOLESALE_PASS);
    await assertWholesaleAccess(shopperPage);
  });

  test('NP-AU-WS-02 — wholesale-priced order', async ({ shopperPage, adminPage, emailPage }) => {
    await loginAccount(shopperPage, WHOLESALE_USER, WHOLESALE_PASS);
    const result = await runWholesaleFlow({ shopperPage, adminPage, emailPage }, config);
    assertWholesalePricing(result);
  });
});
