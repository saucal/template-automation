// UK forgot-password (GI "08 – Forgot password? flow"). Register an account, request
// a password reset (assert the "email sent" notice), complete the reset via the
// emailed link with a NEW password, then log in with that new password.
import { test } from '../../../fixtures';
import { REGIONS } from '../../../helpers/melon';
import { uniqueEmail, registerAccount, logout, loginAccount, requestPasswordReset, completePasswordReset } from '../../../helpers/account';
import { assertResetEmailSent, assertLoggedIn } from '../../../helpers/assertions';

const PASSWORD = process.env.PASSWORD || 'Melon-QA-Pass-1!';
const PASSWORD2 = process.env.PASSWORD2 || 'Melon-QA-Pass-2!';

test.describe('UK — forgot password', { tag: ['@plugin:woocommerce'] }, () => {
  test('MO-UK-ACCT-02 – reset password and log in with the new one', async ({ shopperPage }) => {
    const email = uniqueEmail();
    await registerAccount(shopperPage, REGIONS.uk, email, PASSWORD);
    await logout(shopperPage);

    await requestPasswordReset(shopperPage, REGIONS.uk, email);
    await assertResetEmailSent(shopperPage);

    await completePasswordReset(shopperPage, email, PASSWORD2);
    await logout(shopperPage);

    await loginAccount(shopperPage, REGIONS.uk, email, PASSWORD2);
    await assertLoggedIn(shopperPage);
  });
});
