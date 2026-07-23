import { test, expect } from '../../fixtures';
import { loginAccount, logoutAccount, assertMyAccountLinks, forgotPassword } from '../../helpers/account';
import { updateProfile, PATHS } from '../../helpers/openstudio';

// Uses the membership-holder created by member.setup: memberCreds for the auth
// flows that must be driven by hand, memberPage for the already-authed checks.
test.describe('Member · account', { tag: ['@plugin:woocommerce', '@plugin:login-with-ajax'] }, () => {
  test('OS-ACC-01 login & my-account', async ({ shopperPage, memberCreds }) => {
    await loginAccount(shopperPage, memberCreds.email, memberCreds.password);
    await assertMyAccountLinks(shopperPage);
    await logoutAccount(shopperPage);
  });

  // Reset to the SAME password so the shared member's creds stay valid for other
  // specs (a real rotation would break memberPage/memberCreds mid-run).
  test('OS-ACC-02 forgot password', async ({ shopperPage, emailPage, memberCreds }) => {
    await forgotPassword(shopperPage, emailPage, memberCreds.email, memberCreds.password);
  });

  // GI member #03 tail: a member edits the my-profile survey (instrument + level)
  // and saves successfully.
  test('OS-ACC-03 profile survey edit', async ({ memberPage }) => {
    await updateProfile(memberPage, { instrument: 'Piano', skillLevel: 'Beginner' });
    await expect(memberPage).toHaveURL(new RegExp(PATHS.myProfile.replace(/\//g, '\\/')));
  });
});
