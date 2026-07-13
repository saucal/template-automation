// Vesica account flows: passwordless registration (verify via set-password email)
// and forgot-password. Thin — flow + assert* helpers, no inline expect().
// Parity source: GI `vesica-basic-woocommerce-tests-user` tests 03 (register) + 04
// (forgot password). Both share the set-password page (#password_1/#password_2).
//
// Email links are ESP tracking-wrapped and the SITE invalidates a prior reset key when
// a new reset is requested — so between the two reset cycles we DELETE the inbox, else
// findEmail can return the stale (already-used) account-created link during ESP lag.
import { test } from '../../fixtures';
import { runRegisterFlow, runForgotPasswordFlow, completeSetPassword } from '../../helpers/flows';
import {
  assertPasswordResetRequested,
  assertPasswordWasReset,
  resetLinkFromEmail,
} from '../../helpers/assertions';
import { deleteEmails } from '../../helpers/playgrounds-email';

const NEW_PASSWORD = process.env.PASSWORD || 'fric2171Biot';
const NEW_PASSWORD2 = process.env.PASSWORD2 || 'fric2172Biot';

test.describe(
  'Vesica account',
  { tag: ['@plugin:woocommerce'] },
  () => {
    test('VES-ACC-01 – register new user (passwordless → set password)', async ({ shopperPage, emailPage }) => {
      const email = await runRegisterFlow(shopperPage);
      const link = await resetLinkFromEmail(email);
      await completeSetPassword(shopperPage, link, NEW_PASSWORD);
      await assertPasswordWasReset(shopperPage);
    });

    test('VES-ACC-02 – forgot password', async ({ shopperPage, emailPage }) => {
      // Establish a fresh account first (register + set password from its email).
      const email = await runRegisterFlow(shopperPage);
      const firstLink = await resetLinkFromEmail(email);
      await completeSetPassword(shopperPage, firstLink, NEW_PASSWORD);

      // Clear the inbox so the forgot-password email is the ONLY match — requesting a
      // new reset invalidates the account-created key, and findEmail could otherwise
      // return that stale (already-used) link before the new one lands (ESP lag).
      await deleteEmails(email);

      await runForgotPasswordFlow(shopperPage, email);
      await assertPasswordResetRequested(shopperPage);
      const resetLink = await resetLinkFromEmail(email);
      await completeSetPassword(shopperPage, resetLink, NEW_PASSWORD2);
      await assertPasswordWasReset(shopperPage);
    });
  }
);
