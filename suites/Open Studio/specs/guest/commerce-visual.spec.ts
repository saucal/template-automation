import { test } from '../../fixtures';
import { type Page, type Locator } from '@playwright/test';
import {
  PATHS, addMembershipToCart, addSingleCourse,
  fillCheckout, payStripeAndPlaceOrder, handleFunnelKitUpsell,
} from '../../helpers/openstudio';
import { softScreenshot } from '../../helpers/assertions';
import type { UserConfig } from '../../types/test-config';

function newUser(slug: string): UserConfig {
  const stamp = Date.now();
  return { email: `qa+os-vis-${slug}-${stamp}@saucal.com`, password: 'Test12345!', firstName: 'QA', lastName: slug };
}

// Visual comparison is NON-FATAL (softScreenshot): a baseline diff is a warning, not
// a failure (same warn-don't-hard-fail posture as tax/shipping). A real broken page
// still fails via the functional steps (add-to-cart / checkout / place-order) around
// it. Baselines auto-create on first run; review the PNGs before trusting them.
const visualCheck = (page: Page, name: string, masks: Locator[] = []): Promise<void> =>
  softScreenshot(page, name, { mask: masks });

test.describe('Guest · commerce visual [WooCommerce][WC Blocks][visual]', () => {
  // ---- cart (contents differ by product) ----
  test('OS-VIS-cart-membership', async ({ shopperPage }) => {
    await addMembershipToCart(shopperPage, 'monthly');
    await shopperPage.goto(PATHS.cart, { waitUntil: 'networkidle' });
    await visualCheck(shopperPage, 'cart-membership.png');
  });

  test('OS-VIS-cart-course', async ({ shopperPage }) => {
    await addSingleCourse(shopperPage);
    await shopperPage.goto(PATHS.cart, { waitUntil: 'networkidle' });
    await visualCheck(shopperPage, 'cart-course.png');
  });

  // ---- checkout (membership = subscription/trial layout; course = one-time) ----
  test('OS-VIS-checkout-membership', async ({ shopperPage }) => {
    await addMembershipToCart(shopperPage, 'monthly');
    await shopperPage.goto(PATHS.checkout, { waitUntil: 'networkidle' });
    // renewal date + trial countdown are dynamic — mask them.
    const masks = [
      shopperPage.locator('.os-trial-checkout-notice'),
      shopperPage.locator('tr.recurring-total'),
      shopperPage.locator('td.subscription-next-payment'),
    ];
    await visualCheck(shopperPage, 'checkout-membership.png', masks);
  });

  test('OS-VIS-checkout-course', async ({ shopperPage }) => {
    await addSingleCourse(shopperPage);
    await shopperPage.goto(PATHS.checkout, { waitUntil: 'networkidle' });
    await visualCheck(shopperPage, 'checkout-course.png');
  });

  // ---- thank-you / order-received (course = WC order page; membership = FunnelKit) ----
  test('OS-VIS-thankyou-course', async ({ shopperPage }) => {
    await addSingleCourse(shopperPage);
    await fillCheckout(shopperPage, newUser('course'));
    await payStripeAndPlaceOrder(shopperPage);
    const masks = [
      shopperPage.locator('.order > strong'),
      shopperPage.locator('.email > strong'),
    ];
    await visualCheck(shopperPage, 'thankyou-course.png', masks);
  });

  test('OS-VIS-thankyou-membership', async ({ shopperPage }) => {
    await addMembershipToCart(shopperPage, 'monthly');
    await fillCheckout(shopperPage, newUser('member'));
    await payStripeAndPlaceOrder(shopperPage);
    await handleFunnelKitUpsell(shopperPage, 'skip'); // non-fatal
    const masks = [
      shopperPage.locator('.order > strong'),
      shopperPage.locator('.email > strong'),
      shopperPage.locator('.bwf-align-wrap-full p.bwf-adv-heading'),
      shopperPage.locator('td.subscription-next-payment'),
    ];
    await visualCheck(shopperPage, 'thankyou-membership.png', masks);
  });
});
