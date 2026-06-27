import { test } from '../../fixtures';
import { type Page, type Locator } from '@playwright/test';
import { PATHS, addMembershipToCart, payStripeAndPlaceOrder, handleFunnelKitUpsell } from '../../helpers/openstudio';
import { softScreenshot } from '../../helpers/assertions';

// Membership commerce runs in the MEMBER AREA (logged-in via memberPage), not as a
// guest. The member is already authenticated, so checkout needs no registration —
// the direct ?add-to-cart link lands on the Blocks checkout with billing prefilled.
//
// Visual comparison is NON-FATAL (softScreenshot): a baseline diff warns, doesn't
// fail. The functional steps (add-to-cart / pay) stay hard assertions.
const visualCheck = (page: Page, name: string, masks: Locator[] = []): Promise<void> =>
  softScreenshot(page, name, { mask: masks });

test.describe('Member · membership commerce visual [WooCommerce][WC Subscriptions][WC Blocks][visual]', () => {
  test('OS-VIS-cart-membership', async ({ memberPage }) => {
    await addMembershipToCart(memberPage, 'monthly');
    await memberPage.goto(PATHS.cart, { waitUntil: 'networkidle' });
    await visualCheck(memberPage, 'cart-membership.png');
  });

  test('OS-VIS-checkout-membership', async ({ memberPage }) => {
    await addMembershipToCart(memberPage, 'monthly'); // lands on checkout
    const masks = [
      memberPage.locator('.os-trial-checkout-notice'),
      memberPage.locator('tr.recurring-total'),
      memberPage.locator('td.subscription-next-payment'),
    ];
    await visualCheck(memberPage, 'checkout-membership.png', masks);
  });

  test('OS-VIS-thankyou-membership', async ({ memberPage }) => {
    await addMembershipToCart(memberPage, 'monthly');
    await payStripeAndPlaceOrder(memberPage);
    await handleFunnelKitUpsell(memberPage, 'skip'); // non-fatal
    const masks = [
      memberPage.locator('.order > strong'),
      memberPage.locator('.email > strong'),
      memberPage.locator('.bwf-align-wrap-full p.bwf-adv-heading'),
      memberPage.locator('td.subscription-next-payment'),
    ];
    await visualCheck(memberPage, 'thankyou-membership.png', masks);
  });
});
