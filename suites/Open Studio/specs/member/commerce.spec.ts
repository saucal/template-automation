import { test } from '../../fixtures';
import { runSingleCourseFlow, runCoursePlusSubscriptionFlow, runRefundFlow } from '../../helpers/flows';
import { assertOrderPlaced, assertCourseAccess, assertCoursePlusSubscription, assertNoMembership, assertRefunded, assertRefundEmail } from '../../helpers/assertions';
import type { UserConfig } from '../../types/test-config';

function newUser(slug: string): UserConfig {
  const stamp = Date.now();
  return { email: `qa+os-${slug}-${stamp}@saucal.com`, password: 'Test12345!', firstName: 'QA', lastName: slug };
}

test.describe('Member · commerce [WooCommerce][WC Subscriptions][Stripe]', () => {
  test('OS-COM-01 purchase single course', async ({ shopperPage }) => {
    const result = await runSingleCourseFlow(shopperPage, newUser('course'));
    assertOrderPlaced(result);
    await assertCourseAccess(shopperPage);
    // GI #22: buying a single course grants NO membership plan.
    await assertNoMembership(shopperPage);
  });

  test('OS-COM-02 course + subscription', async ({ shopperPage }) => {
    const result = await runCoursePlusSubscriptionFlow(shopperPage, newUser('coursesub'), 'monthly');
    assertOrderPlaced(result);
    await assertCoursePlusSubscription(shopperPage);
  });

  test('OS-COM-03 refund', async ({ shopperPage, adminPage, emailPage }) => {
    test.skip(!process.env.RUN_REFUND, 'refund gated by RUN_REFUND (real side effect on staging)');
    const user = newUser('refund');
    const result = await runSingleCourseFlow(shopperPage, user);
    await runRefundFlow(adminPage, result.orderNumber);
    await assertRefunded(adminPage);
    await assertRefundEmail(emailPage, user.email);
  });
});
