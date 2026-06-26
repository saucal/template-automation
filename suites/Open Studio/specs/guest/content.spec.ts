import { test, expect } from '../../fixtures';
import { gotoCourseDetail, gotoInstrumentPage, gotoInstructorDetail } from '../../helpers/openstudio';
import { assertJoinCta } from '../../helpers/assertions';

// GI guest #13 (instructor detail), #14 (course detail + Join now CTA), #19
// (instrument archive). Functional nav + the guest-facing "Join now" CTA.
test.describe('Guest · content surfaces [WooCommerce][OS theme][Membership]', () => {
  test('OS-GUEST-course-detail-join-cta', async ({ shopperPage }) => {
    await gotoCourseDetail(shopperPage);
    await assertJoinCta(shopperPage, true); // guest sees Join now
  });

  test('OS-GUEST-instrument-page', async ({ shopperPage }) => {
    await gotoInstrumentPage(shopperPage);
    await expect(shopperPage.locator('main, .site-main').first()).toBeVisible();
  });

  test('OS-GUEST-instructor-detail', async ({ shopperPage }) => {
    await gotoInstructorDetail(shopperPage);
    await expect(shopperPage.locator('main, .site-main, .artist-header__wrap').first()).toBeVisible();
  });
});
