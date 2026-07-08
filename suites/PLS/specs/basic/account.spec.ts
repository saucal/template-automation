// Login & My Account — replaces GI Basic 11. Logs the pre-provisioned staging
// customer in and walks every account tab (orders, subscriptions, Smart Coupons,
// addresses, payment methods, account details).
//
// GI retried with a second password when the first failed (the forgot-password
// flow leaves the account on PASSWORD2) — same convention here. The GI 12
// forgot-password test itself moved into the orders chain (PLS-PO-03), where the
// order-created account has a Playgrounds inbox the reset email can be read from
// (the staging user's @saucal.com inbox isn't reachable from this suite).
import { test } from '../../fixtures';
import { dismissPopups, isLoggedIn, loginAccount } from '../../helpers/pls';
import { assertLoggedIn, assertMyAccountTabs } from '../../helpers/assertions';

const STAGING_USER = process.env.STAGING_USER_EMAIL || 'qa+gi_staging_user@saucal.com';
const PASSWORD = process.env.PASSWORD ?? '';
const PASSWORD2 = process.env.PASSWORD2 ?? '';

test.describe('PLS Account', { tag: ['@plugin:woocommerce', '@plugin:woocommerce-smart-coupons'] }, () => {
  test('PLS-ACC-01 — staging user logs in and every My Account tab renders', async ({ shopperPage: page }) => {
    test.skip(!PASSWORD && !PASSWORD2, 'staging user credentials (PASSWORD / PASSWORD2) not configured');

    await page.goto('./');
    await page.waitForLoadState('load');
    await dismissPopups(page);

    await loginAccount(page, STAGING_USER, PASSWORD || PASSWORD2);
    if (!(await isLoggedIn(page)) && PASSWORD2 && PASSWORD) {
      // The account may be on the alternate password (post-reset state).
      await loginAccount(page, STAGING_USER, PASSWORD2);
    }
    await assertLoggedIn(page);
    await assertMyAccountTabs(page);
  });
});
