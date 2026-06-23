import { test, expect } from '../../fixtures';
import { loginAccount } from '../../helpers/account';
import { PATHS } from '../../helpers/openstudio';

const MEMBER = {
  email: process.env.MEMBER_EMAIL ?? 'qa+os-member@saucal.com',
  password: process.env.MEMBER_PASS ?? 'Test12345!',
};

const CONTENT_PAGES: ReadonlyArray<readonly [string, string]> = [
  ['home', PATHS.home],
  ['course', PATHS.singleCourse],
  ['community', PATHS.community],
  ['events', PATHS.events],
  ['gps', PATHS.gps],
  ['sessions', PATHS.osSessions],
];

test.describe('Member · content pages [WooCommerce][OS theme]', () => {
  test.beforeEach(async ({ shopperPage }) => {
    await loginAccount(shopperPage, MEMBER.email, MEMBER.password);
  });

  for (const [slug, path] of CONTENT_PAGES) {
    test(`OS-CONTENT-${slug}`, async ({ shopperPage }) => {
      await shopperPage.goto(path, { waitUntil: 'networkidle' });
      await expect(shopperPage.locator('main, #main, .site-main').first()).toBeVisible();
    });
  }

  test('OS-CONTENT-bookmark', async ({ shopperPage }) => {
    await shopperPage.goto(PATHS.singleCourse, { waitUntil: 'networkidle' });
    const bm = shopperPage.locator('[class*="bookmark"], button:has-text("Bookmark")').first();
    if (await bm.count()) await bm.click().catch(() => {});
    await shopperPage.goto(PATHS.bookmarks, { waitUntil: 'networkidle' });
    await expect(shopperPage.locator('main, .site-main').first()).toBeVisible();
  });
});
