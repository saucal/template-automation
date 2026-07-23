import { test } from '../../fixtures';
import { runJoinFlow } from '../../helpers/flows';
import { assertOrderPlaced } from '../../helpers/assertions';
import type { JoinConfig, UserConfig } from '../../types/test-config';

function newUser(slug: string): UserConfig {
  const stamp = Date.now();
  return { email: `qa+os-${slug}-${stamp}@saucal.com`, password: 'Test12345!', firstName: 'QA', lastName: slug };
}

const SURVEY = { instrument: 'piano', skillLevel: 'beginner' };

// OS-JOIN-01 (the annually submit-survey + accept-upsell purchase) now lives in
// `specs/member.setup.ts` — it creates the reusable member that the rest of the
// member specs share. These cover the OTHER join scenarios.
test.describe.serial('Member · join via FunnelKit', { tag: ['@plugin:woocommerce', '@plugin:woocommerce-subscriptions', '@plugin:funnel-builder', '@plugin:woocommerce-gateway-stripe'] }, () => {
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
