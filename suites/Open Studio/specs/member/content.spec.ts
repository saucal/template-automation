import { test, expect } from '../../fixtures';
import {
  PATHS, gotoCourseDetail, gotoEvents, openProSession, openFreeSession,
  toggleBookmark, removeFirstBookmark,
} from '../../helpers/openstudio';
import {
  assertJoinCta, assertProGated, assertSessionJoinable, assertBookmarksCleared, assertPageContent, softScreenshot,
} from '../../helpers/assertions';

// Logged in as the membership-holder created by member.setup (memberPage) — no
// fake pre-provisioned account, no per-test login.
//
// Content pages are compared, not just smoke-loaded: each asserts its path + a
// page-specific content token (verify the tokens against the live site on first run).
const CONTENT_PAGES: ReadonlyArray<readonly [string, string, RegExp]> = [
  ['home', PATHS.home, /Open Studio/i],
  ['community', PATHS.community, /communit/i],
  ['events', PATHS.events, /event|session|calendar/i],
  ['gps', PATHS.gps, /practice|guided/i],
  ['sessions', PATHS.osSessions, /session/i],
];

test.describe('Member · content pages', { tag: ['@plugin:woocommerce', '@plugin:woocommerce-subscriptions'] }, () => {
  for (const [slug, path, content] of CONTENT_PAGES) {
    test(`OS-CONTENT-${slug}`, async ({ memberPage }) => {
      await assertPageContent(memberPage, path, content);
      // Non-fatal visual comparison of the logged-in page (warns on diff).
      await softScreenshot(memberPage, `member-${slug}.png`);
    });
  }

  // GI member #17: a member on a course detail no longer sees the "Join now" CTA.
  test('OS-CONTENT-course-no-join', async ({ memberPage }) => {
    await gotoCourseDetail(memberPage);
    await assertJoinCta(memberPage, false);
  });

  // GI member #19: a free session is joinable; a Pro session still gates a
  // non-Pro member toward upgrading.
  test('OS-CONTENT-session-access', async ({ memberPage }) => {
    await gotoEvents(memberPage);
    await openFreeSession(memberPage);
    await assertSessionJoinable(memberPage);
    await gotoEvents(memberPage);
    await openProSession(memberPage);
    await assertProGated(memberPage);
  });

  // GI member #24: add a bookmark, remove it, count returns to 0.
  test('OS-CONTENT-bookmark', async ({ memberPage }) => {
    await gotoCourseDetail(memberPage);
    await toggleBookmark(memberPage);
    await memberPage.goto(PATHS.bookmarks, { waitUntil: 'load' });
    await expect(memberPage.locator('main, .site-main').first()).toBeVisible();
    await removeFirstBookmark(memberPage);
    await assertBookmarksCleared(memberPage);
  });
});
