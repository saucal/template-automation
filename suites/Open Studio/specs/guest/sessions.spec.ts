import { test, expect } from '../../fixtures';
import { gotoEvents, openProSession } from '../../helpers/openstudio';
import { assertProGated } from '../../helpers/assertions';

// GI guest #15 (live schedule) + #16 (Pro-gated session). The membership gate is
// the product's core value prop — assert a guest hitting a Pro session is told to
// upgrade rather than letting them in.
test.describe('Guest · sessions', { tag: ['@plugin:woocommerce', '@plugin:woocommerce-subscriptions'] }, () => {
  test('OS-GUEST-live-sessions', async ({ shopperPage }) => {
    await gotoEvents(shopperPage);
    // calendar renders event items with a timezone label.
    await expect(shopperPage.locator('.os-calendar-event-item').first()).toBeVisible();
  });

  test('OS-GUEST-session-pro-gated', async ({ shopperPage }) => {
    await gotoEvents(shopperPage);
    await openProSession(shopperPage);
    await assertProGated(shopperPage);
  });
});
