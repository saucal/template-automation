// AU account flows — replaces GI Basic 09 (registration / My Account links /
// login) and 11 (forgot-password). Functional coverage not touched by the order
// specs. Thin spec: drive helpers, no raw expect() here (rule 6) — the asserts
// live in helpers/account.ts.
import { test } from '../../../fixtures';
import { emailForTest } from '../../../helpers/nopong';
import {
  registerNewUser,
  assertMyAccountLinks,
  logoutAccount,
  loginAccount,
  forgotPassword,
} from '../../../helpers/account';

const PASSWORD = process.env.PASSWORD || 'QAcustomer!2026';

test.describe('AU Account flows', { tag: ['@plugin:woocommerce'] }, () => {
  test('NP-AU-ACC-01 — register, My Account links, login', async ({ shopperPage }) => {
    const email = emailForTest('au-acc-01');
    await registerNewUser(shopperPage, email, PASSWORD);
    await assertMyAccountLinks(shopperPage);
    await logoutAccount(shopperPage);
    await loginAccount(shopperPage, email, PASSWORD);
  });

  test('NP-AU-ACC-02 — forgot password', async ({ shopperPage }) => {
    const email = emailForTest('au-acc-02');
    const newPassword = `${PASSWORD}X`;
    await registerNewUser(shopperPage, email, PASSWORD);
    await logoutAccount(shopperPage);
    await forgotPassword(shopperPage, email, newPassword);
  });
});
