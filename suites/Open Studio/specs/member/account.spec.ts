import { test, expect } from '../../fixtures';
import { loginAccount, logoutAccount, assertMyAccountLinks, forgotPassword } from '../../helpers/account';
import { updateProfile, PATHS } from '../../helpers/openstudio';

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

  // GI member #03 tail: a member edits the my-profile survey (instrument + level)
  // and saves successfully.
  test('OS-ACC-03 profile survey edit', async ({ shopperPage }) => {
    await loginAccount(shopperPage, MEMBER.email, MEMBER.password);
    await updateProfile(shopperPage, { instrument: 'Piano', skillLevel: 'Beginner' });
    await expect(shopperPage).toHaveURL(new RegExp(PATHS.myProfile.replace(/\//g, '\\/')));
  });
});
