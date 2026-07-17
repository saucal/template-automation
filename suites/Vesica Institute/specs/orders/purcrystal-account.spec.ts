// Pur Crystal account flows. Thin — flow + assert* helpers, no inline expect().
// Parity source: Vesica GI "Register user" (03) + "Forgot password flow" (04) — Pur
// Crystal shares the same WooCommerce account setup (passwordless registration →
// set-password email; same #password_1/#password_2 set-password page).
//
// The site registers PASSWORDLESS: the account-created email carries a "set your new
// password" link. Email links are ESP tracking-wrapped, and requesting a new reset
// invalidates any prior reset key — so between the two reset cycles in ACC-02 we DELETE
// the inbox, else resetLinkFromEmail could return the stale (already-used) link (ESP lag).
import { test } from '../../fixtures';
import { runRegisterFlow, runForgotPasswordFlow, completeSetPassword } from '../../helpers/flows';
import { loginShopper, logoutShopper } from '../../helpers/purcrystal';
import {
  assertLoggedIn,
  assertMyAccountLinks,
  assertPasswordResetRequested,
  assertPasswordWasReset,
  resetLinkFromEmail,
} from '../../helpers/assertions';
import { deleteEmails } from '../../helpers/playgrounds-email';

const NEW_PASSWORD = process.env.PASSWORD || 'fric2171Biot';
const NEW_PASSWORD2 = process.env.PASSWORD2 || 'fric2172Biot';

test.describe(
  'Pur Crystal account',
  { tag: ['@plugin:woocommerce'] },
  () => {
    test('PC-ACC-01 – register new user, my-account links, login', async ({ shopperPage, emailPage }) => {
      // Register (passwordless) → follow the set-password link from the email.
      const email = await runRegisterFlow(shopperPage);
      const link = await resetLinkFromEmail(email);
      await completeSetPassword(shopperPage, link, NEW_PASSWORD);
      await assertPasswordWasReset(shopperPage);

      // The account dashboard exposes the standard My Account navigation links.
      await assertMyAccountLinks(shopperPage);

      // Log out, then log back in with the credentials just set.
      await logoutShopper(shopperPage);
      await loginShopper(shopperPage, email, NEW_PASSWORD);
      await assertLoggedIn(shopperPage);
    });

    test('PC-ACC-02 – forgot password', async ({ shopperPage, emailPage }) => {
      // Establish a fresh account first (register + set password from its email).
      const email = await runRegisterFlow(shopperPage);
      const firstLink = await resetLinkFromEmail(email);
      await completeSetPassword(shopperPage, firstLink, NEW_PASSWORD);
      await logoutShopper(shopperPage);

      // Clear the inbox so the forgot-password email is the ONLY match — requesting a
      // new reset invalidates the account-created key, and resetLinkFromEmail could
      // otherwise return that stale (already-used) link before the new one lands.
      await deleteEmails(email);

      await runForgotPasswordFlow(shopperPage, email);
      await assertPasswordResetRequested(shopperPage);
      const resetLink = await resetLinkFromEmail(email);
      await completeSetPassword(shopperPage, resetLink, NEW_PASSWORD2);
      await assertPasswordWasReset(shopperPage);
    });
  }
);
