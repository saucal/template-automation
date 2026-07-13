// Vesica account flows: passwordless registration (verify via set-password email)
// and forgot-password. Thin spec — flow + assert* helpers, no inline expect().
// Parity source: GI `vesica-basic-woocommerce-tests-user` tests 03 (register) + 04
// (forgot password). Both share the set-password page (#password_1/#password_2).
//
// NOTE (first-run verify): the standalone register form may be reCAPTCHA-gated
// (rule 28) and email delivery goes via the Playgrounds redirect plugin — confirm
// both on the first live run (see docs/site-exploration.md).
import { test } from '../../fixtures';
import { runRegisterFlow, runForgotPasswordFlow, completeSetPassword } from '../../helpers/flows';
import {
  assertPasswordResetRequested,
  assertPasswordWasReset,
  resetLinkFromEmail,
} from '../../helpers/assertions';

const NEW_PASSWORD = process.env.PASSWORD || 'fric2171Biot';

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
      // Use a fresh registered account so the reset email is deterministic.
      const email = await runRegisterFlow(shopperPage);
      await resetLinkFromEmail(email); // consume the account-created email first
      await runForgotPasswordFlow(shopperPage, email);
      await assertPasswordResetRequested(shopperPage);
      const link = await resetLinkFromEmail(email);
      await completeSetPassword(shopperPage, link, NEW_PASSWORD);
      await assertPasswordWasReset(shopperPage);
    });
  }
);
