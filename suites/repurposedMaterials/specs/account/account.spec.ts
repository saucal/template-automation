// Account flows — replaces GI "Basic" tests 12 (registration, My Account, login)
// and 13 (forgot password).
import { test } from '../../fixtures';
import { emailForTest } from '../../helpers/repurposed';
import { registerCustomer, loginAccount, logoutAccount, assertMyAccountTabs, forgotPassword } from '../../helpers/account';

const PASSWORD = process.env.PASSWORD || 'QAcustomer!2026';

test.describe('Account flows', () => {
  test('RM-AC-01 — register, My Account navigation, login', async ({ shopperPage }) => {
    const email = emailForTest('rm-ac-01');
    await registerCustomer(shopperPage, email, PASSWORD);
    await assertMyAccountTabs(shopperPage);
    await logoutAccount(shopperPage);
    await loginAccount(shopperPage, email, PASSWORD);
  });

  test('RM-AC-02 — forgot password', async ({ shopperPage }) => {
    const email = emailForTest('rm-ac-02');
    const newPassword = `${PASSWORD}X`;
    await registerCustomer(shopperPage, email, PASSWORD);
    await logoutAccount(shopperPage);
    await forgotPassword(shopperPage, email, newPassword);
  });
});
