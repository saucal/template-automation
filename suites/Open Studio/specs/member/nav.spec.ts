import { test } from '../../fixtures';
import { loginAccount } from '../../helpers/account';
import { assertLoggedInMenuDesktop, assertLoggedInMenuMobile } from '../../helpers/assertions';
import { PATHS } from '../../helpers/openstudio';

const MEMBER = {
  email: process.env.MEMBER_EMAIL ?? 'qa+os-member@saucal.com',
  password: process.env.MEMBER_PASS ?? 'Test12345!',
};

// GI member #05 (mobile) + #06 (desktop): a logged-in member's nav exposes the
// member-only destinations (Dashboard, Bookmarks, Log out, account).
test.describe('Member · navigation [WooCommerce][OS theme]', () => {
  test.beforeEach(async ({ shopperPage }) => {
    await loginAccount(shopperPage, MEMBER.email, MEMBER.password);
  });

  test('OS-NAV-desktop', async ({ shopperPage }) => {
    await shopperPage.goto(PATHS.home, { waitUntil: 'networkidle' });
    await assertLoggedInMenuDesktop(shopperPage);
  });

  test('OS-NAV-mobile', async ({ shopperPage }) => {
    await shopperPage.setViewportSize({ width: 390, height: 844 });
    await shopperPage.goto(PATHS.home, { waitUntil: 'networkidle' });
    await assertLoggedInMenuMobile(shopperPage);
  });
});
