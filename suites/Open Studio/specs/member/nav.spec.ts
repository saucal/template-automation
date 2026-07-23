import { test } from '../../fixtures';
import { assertLoggedInMenuDesktop, assertLoggedInMenuMobile } from '../../helpers/assertions';
import { PATHS } from '../../helpers/openstudio';

// GI member #05 (mobile) + #06 (desktop): a logged-in member's nav exposes the
// member-only destinations (Dashboard, Bookmarks, Log out, account). Reuses the
// membership-holder from member.setup (memberPage) — already authenticated.
test.describe('Member · navigation', { tag: ['@plugin:woocommerce'] }, () => {
  test('OS-NAV-desktop', async ({ memberPage }) => {
    await memberPage.goto(PATHS.home, { waitUntil: 'load' });
    await assertLoggedInMenuDesktop(memberPage);
  });

  test('OS-NAV-mobile', async ({ memberPage }) => {
    await memberPage.setViewportSize({ width: 390, height: 844 });
    await memberPage.goto(PATHS.home, { waitUntil: 'load' });
    await assertLoggedInMenuMobile(memberPage);
  });
});
