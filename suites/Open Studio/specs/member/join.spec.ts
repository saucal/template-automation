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
      // GI submit-survey / accept-upsell exercise the Annually variant.
      testId: 'OS-JOIN-01', title: 'submit survey', frequency: 'annually',
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

  // fixme (not skip): the body is unimplemented, so a RUN_RENEW gate would report
  // a false green. Mark fixme until the admin renewal action is wired + verified
  // live, then swap to a RUN_RENEW gate (real side effect on staging).
  // TODO: trigger renewal on admin.php?page=wc-orders shop_subscription edit
  // screen; assert td.subscription-next-payment advances.
  test.fixme('OS-JOIN-03 backend & renew', async ({ adminPage }) => {
    void adminPage;
  });
});
