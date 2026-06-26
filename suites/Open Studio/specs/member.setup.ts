import { test as setup } from '../fixtures';
import { runJoinFlow } from '../helpers/flows';
import { assertOrderPlaced, assertDashboardPlan, assertBackendOrder } from '../helpers/assertions';
import { loginAccount } from '../helpers/account';
import type { JoinConfig, UserConfig } from '../types/test-config';
import fs from 'fs';
import path from 'path';

const MEMBER_STATE = path.join(__dirname, '..', 'auth', 'member.json');
const MEMBER_CREDS = path.join(__dirname, '..', 'auth', 'member-creds.json');

// Single source of the logged-in Open Studio purchaser. This IS the OS-JOIN-01
// membership purchase — the member specs (content/nav/account profile) reuse the
// member it creates rather than a fake pre-provisioned account. Mirrors GI's
// Member suite, where test 01 joins and the rest of the suite reuses that member.
//
// If MEMBER_EMAIL/MEMBER_PASS are set, an existing purchaser is reused (logged in,
// no new purchase). Otherwise a fresh member is created via the FunnelKit join.
// Saves the authenticated storage state + creds under auth/ (gitignored) for the
// memberPage / memberCreds fixtures.
setup('OS-JOIN-01 create member (purchase membership)', async ({ shopperPage, adminPage }) => {
  const envEmail = process.env.MEMBER_EMAIL;
  const envPass = process.env.MEMBER_PASS;

  let creds: { email: string; password: string };

  if (envEmail && envPass) {
    await loginAccount(shopperPage, envEmail, envPass);
    creds = { email: envEmail, password: envPass };
  } else {
    const stamp = Date.now();
    const user: UserConfig = {
      email: `qa+os-member-${stamp}@saucal.com`, password: 'Test12345!',
      firstName: 'QA', lastName: 'Member',
    };
    const cfg: JoinConfig = {
      testId: 'OS-JOIN-01', title: 'create member', frequency: 'annually',
      survey: 'submit', upsell: 'accept', surveyData: { instrument: 'piano', skillLevel: 'beginner' },
    };
    const result = await runJoinFlow(shopperPage, cfg, user);
    assertOrderPlaced(result);
    await assertDashboardPlan(shopperPage, cfg.frequency);
    await assertBackendOrder(adminPage, result);
    creds = { email: user.email, password: user.password };
  }

  fs.mkdirSync(path.dirname(MEMBER_STATE), { recursive: true });
  await shopperPage.context().storageState({ path: MEMBER_STATE });
  fs.writeFileSync(MEMBER_CREDS, JSON.stringify(creds, null, 2));
});
