import { test } from '../../fixtures';
import { runJoinFlow } from '../../helpers/flows';
import { assertOrderPlaced, assertDashboardPlan, assertBackendOrder } from '../../helpers/assertions';
import type { JoinConfig, UserConfig } from '../../types/test-config';

function newUser(slug: string): UserConfig {
  const stamp = Date.now();
  return { email: `qa+os-${slug}-${stamp}@saucal.com`, password: 'Test12345!', firstName: 'QA', lastName: slug };
}

const SURVEY = { instrument: 'piano', skillLevel: 'beginner' };

test.describe.serial('Member · join via FunnelKit [WooCommerce][WC Subscriptions][FunnelKit][Stripe]', () => {
  test('OS-JOIN-01 submit survey', async ({ shopperPage, adminPage }) => {
    const cfg: JoinConfig = {
      testId: 'OS-JOIN-01', title: 'submit survey', frequency: 'monthly',
      survey: 'submit', upsell: 'accept', surveyData: SURVEY,
    };
    const result = await runJoinFlow(shopperPage, cfg, newUser('submit'));
    assertOrderPlaced(result);
    await assertDashboardPlan(shopperPage, cfg.frequency);
    await assertBackendOrder(adminPage, result);
  });

  test('OS-JOIN-02 ignore survey', async ({ shopperPage }) => {
    const cfg: JoinConfig = {
      testId: 'OS-JOIN-02', title: 'ignore survey', frequency: 'monthly',
      survey: 'skip', upsell: 'skip', surveyData: SURVEY,
    };
    const result = await runJoinFlow(shopperPage, cfg, newUser('skip'));
    assertOrderPlaced(result);
  });

  test('OS-JOIN-03 backend & renew', async ({ adminPage }) => {
    test.skip(!process.env.RUN_RENEW, 'renewal gated by RUN_RENEW (real side effect on staging)');
    // Trigger a renewal from the subscription admin screen and assert the next
    // payment date advances. Confirm the exact admin renewal action against the
    // live site before wiring it (selector: td.subscription-next-payment;
    // admin.php?page=wc-orders shop_subscription edit screen).
    void adminPage;
  });
});
