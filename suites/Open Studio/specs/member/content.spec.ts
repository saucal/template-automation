import { test, expect } from '../../fixtures';
import { loginAccount } from '../../helpers/account';
import {
  PATHS, gotoCourseDetail, gotoEvents, openProSession, openFreeSession,
  toggleBookmark, removeFirstBookmark,
} from '../../helpers/openstudio';
import { assertJoinCta, assertProGated, assertSessionJoinable, assertBookmarksCleared } from '../../helpers/assertions';

const MEMBER = {
  email: process.env.MEMBER_EMAIL ?? 'qa+os-member@saucal.com',
  password: process.env.MEMBER_PASS ?? 'Test12345!',
};

const CONTENT_PAGES: ReadonlyArray<readonly [string, string]> = [
  ['home', PATHS.home],
  ['community', PATHS.community],
  ['events', PATHS.events],
  ['gps', PATHS.gps],
  ['sessions', PATHS.osSessions],
];

test.describe('Member · content pages [WooCommerce][OS theme][Membership]', () => {
  test.beforeEach(async ({ shopperPage }) => {
    await loginAccount(shopperPage, MEMBER.email, MEMBER.password);
  });

  for (const [slug, path] of CONTENT_PAGES) {
    test(`OS-CONTENT-${slug}`, async ({ shopperPage }) => {
      await shopperPage.goto(path, { waitUntil: 'networkidle' });
      await expect(shopperPage.locator('main, #main, .site-main').first()).toBeVisible();
    });
  }

  // GI member #17: a member on a course detail no longer sees the "Join now" CTA.
  test('OS-CONTENT-course-no-join', async ({ shopperPage }) => {
    await gotoCourseDetail(shopperPage);
    await assertJoinCta(shopperPage, false);
  });

  // GI member #19: a free session is joinable; a Pro session still gates a
  // non-Pro member toward upgrading.
  test('OS-CONTENT-session-access', async ({ shopperPage }) => {
    await gotoEvents(shopperPage);
    await openFreeSession(shopperPage);
    await assertSessionJoinable(shopperPage);
    await gotoEvents(shopperPage);
    await openProSession(shopperPage);
    await assertProGated(shopperPage);
  });

  // GI member #24: add a bookmark, remove it, count returns to 0.
  test('OS-CONTENT-bookmark', async ({ shopperPage }) => {
    await gotoCourseDetail(shopperPage);
    await toggleBookmark(shopperPage);
    await shopperPage.goto(PATHS.bookmarks, { waitUntil: 'networkidle' });
    await expect(shopperPage.locator('main, .site-main').first()).toBeVisible();
    await removeFirstBookmark(shopperPage);
    await assertBookmarksCleared(shopperPage);
  });
});
