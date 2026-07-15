// UK account (GI "07 – Registration, My Account links and Login"). Register a new
// passwordless account (set password via the emailed link), confirm logged in and
// the account nav sections are present, then log out and back in to exercise login.
import { test } from '../../../fixtures';
import { REGIONS } from '../../../helpers/melon';
import { uniqueEmail, registerAccount, loginAccount, logout } from '../../../helpers/account';
import { assertLoggedIn, assertAccountNavTabs } from '../../../helpers/assertions';

const PASSWORD = process.env.PASSWORD || 'Melon-QA-Pass-1!';

test.describe('UK — account', { tag: ['@plugin:woocommerce'] }, () => {
  test('MO-UK-ACCT-01 – register, browse account nav, log out and back in', async ({ shopperPage }) => {
    const email = uniqueEmail();

    await registerAccount(shopperPage, REGIONS.uk, email, PASSWORD);
    await assertLoggedIn(shopperPage);
    await assertAccountNavTabs(shopperPage, ['Orders', 'Downloads', 'Addresses', 'Account details']);

    await logout(shopperPage);
    await loginAccount(shopperPage, REGIONS.uk, email, PASSWORD);
    await assertLoggedIn(shopperPage);
  });
});
