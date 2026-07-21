// EU account (GI "07 – Registration, My Account links and Login", EU Site). Register a
// new passwordless account on the EU blog (set password via the emailed link), confirm
// logged in + account nav sections present, then log out and back in. Account helpers
// are region-parameterized — same flow as UK, primed on /eu/.
import { test } from '../../../fixtures';
import { REGIONS } from '../../../helpers/melon';
import { uniqueEmail, registerAccount, loginAccount, logout } from '../../../helpers/account';
import { assertLoggedIn, assertAccountNavTabs } from '../../../helpers/assertions';

const PASSWORD = process.env.PASSWORD || 'Melon-QA-Pass-1!';

test.describe('EU — account', { tag: ['@plugin:woocommerce'] }, () => {
  test('MO-EU-ACCT-01 – register, browse account nav, log out and back in', async ({ shopperPage, emailPage }) => {
    const email = uniqueEmail();

    await registerAccount(shopperPage, emailPage, REGIONS.eu, email, PASSWORD);
    await assertLoggedIn(shopperPage);
    await assertAccountNavTabs(shopperPage, ['Orders', 'Downloads', 'Addresses', 'Account details']);

    await logout(shopperPage);
    await loginAccount(shopperPage, REGIONS.eu, email, PASSWORD);
    await assertLoggedIn(shopperPage);
  });
});
