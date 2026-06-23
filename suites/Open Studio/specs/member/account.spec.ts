import { test } from '../../fixtures';
import { loginAccount, logoutAccount, assertMyAccountLinks, forgotPassword } from '../../helpers/account';

const MEMBER = {
  email: process.env.MEMBER_EMAIL ?? 'qa+os-member@saucal.com',
  password: process.env.MEMBER_PASS ?? 'Test12345!',
};

test.describe('Member · account [WooCommerce][Login-With-Ajax]', () => {
  test('OS-ACC-01 login & my-account', async ({ shopperPage }) => {
    await loginAccount(shopperPage, MEMBER.email, MEMBER.password);
    await assertMyAccountLinks(shopperPage);
    await logoutAccount(shopperPage);
  });

  test('OS-ACC-02 forgot password', async ({ shopperPage, emailPage }) => {
    await forgotPassword(shopperPage, emailPage, MEMBER.email, 'NewTest12345!');
  });
});
