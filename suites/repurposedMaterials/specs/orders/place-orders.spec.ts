// Place Order specs — serial: new user first, then logged user.
//
// RM-PO-01: new user (Accept.Blue CC, simple product) — full E2E + refund
// RM-PO-02: logged user (Accept.Blue CC, variable product) — E2E without refund,
//           placed on the SAME account RM-PO-01 created (GI parity).
//
// GI parity: GI's logged-user test reused the new-user account (set-password flow)
// so its saved address prefills checkout. We achieve the same by handing the
// new-user's logged-in session cookies from RM-PO-01 to RM-PO-02 (serial, same
// worker) — no email/set-password round-trip, but the same account + saved address.
import { test, expect } from '../../fixtures';
import type { BrowserContext } from '@playwright/test';
import { runOrderFlow } from '../../helpers/flows';
import {
  assertThankYouPage,
  assertCheckoutParity,
  assertMyAccount,
  assertBackendOrder,
  performAndAssertRefund,
  assertOrderEmail,
  assertRefundEmail,
} from '../../helpers/assertions';
import { dismissOverlays } from '../../helpers/repurposed';
import type { OrderConfig } from '../../types/test-config';

const newUserConfig: OrderConfig = {
  testId: 'RM-PO-01',
  title: 'Place order — new user (Accept.Blue CC)',
  user: 'new',
  payment: 'acceptblue',
  pdp: { kind: 'simple', maxPrice: 100, qty: 1 },
  expectedStatus: 'Processing',
};

const loggedUserConfig: OrderConfig = {
  testId: 'RM-PO-02',
  title: 'Place order — logged user (Accept.Blue CC, variable product)',
  user: 'logged',
  payment: 'acceptblue',
  pdp: { kind: 'variable', maxPrice: 100, qty: 1 },
  expectedStatus: 'Processing',
};

// Account handed from RM-PO-01 → RM-PO-02 (serial block, same worker process).
type SavedAccount = { email: string; cookies: Awaited<ReturnType<BrowserContext['storageState']>>['cookies'] };
let savedAccount: SavedAccount | null = null;

test.describe.serial('Place Orders', () => {
  test(newUserConfig.title, async ({ shopperPage, adminPage, emailPage }) => {
    const capture = await runOrderFlow({ shopperPage, adminPage, emailPage }, newUserConfig);

    assertThankYouPage(capture.result);
    assertCheckoutParity(capture.checkout, capture.result);
    await assertMyAccount(shopperPage, capture.result, newUserConfig);
    await assertBackendOrder(adminPage, capture.result, newUserConfig);
    await assertOrderEmail(capture.result);

    // Hand the new-user account (logged-in session + email) to RM-PO-02 before the
    // refund — WooCommerce logs the customer in after creating the account at
    // checkout, so the shopper context now holds that account's auth cookies.
    savedAccount = {
      email: capture.result.email,
      cookies: (await shopperPage.context().storageState()).cookies,
    };

    await performAndAssertRefund(adminPage, capture.result);
    await assertRefundEmail(capture.result);
  });

  test(loggedUserConfig.title, async ({ shopperPage, adminPage, emailPage }) => {
    expect(savedAccount, 'RM-PO-01 must run first and create the account').not.toBeNull();

    // Reuse the RM-PO-01 account: inject its session cookies so the saved
    // billing/shipping address prefills checkout (GI parity).
    await shopperPage.goto('/');
    await shopperPage.context().addCookies(savedAccount!.cookies);
    await shopperPage.goto('/my-account/');
    await shopperPage.waitForLoadState('load');
    await dismissOverlays(shopperPage);
    await expect(
      shopperPage.locator('a[href*="customer-logout"], .woocommerce-MyAccount-navigation').first(),
      'shopper should be logged in as the RM-PO-01 account'
    ).toBeVisible();

    // Place the order on that account (same email → confirmation lands in its inbox).
    const config: OrderConfig = { ...loggedUserConfig, accountEmail: savedAccount!.email };
    const capture = await runOrderFlow({ shopperPage, adminPage, emailPage }, config);

    assertThankYouPage(capture.result);
    assertCheckoutParity(capture.checkout, capture.result);
    await assertMyAccount(shopperPage, capture.result, config);
    await assertBackendOrder(adminPage, capture.result, config);
    await assertOrderEmail(capture.result);
  });
});
