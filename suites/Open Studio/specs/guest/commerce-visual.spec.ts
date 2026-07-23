import { test } from '../../fixtures';
import { type Page, type Locator } from '@playwright/test';
import { PATHS, addSingleCourse, fillCheckout, payStripeAndPlaceOrder } from '../../helpers/openstudio';
import { softScreenshot } from '../../helpers/assertions';
import type { UserConfig } from '../../types/test-config';
import { expect } from '@playwright/test';

function newUser(slug: string): UserConfig {
  const stamp = Date.now();
  return { email: `qa+os-vis-${slug}-${stamp}@saucal.com`, password: 'fric2171Biot', firstName: 'QA', lastName: slug };
}

// Course commerce is a guest flow (single course = one-time, no login required).
// Membership commerce visual lives in specs/member/commerce-visual.spec.ts — it
// runs logged-in (member area), not as a guest.
//
// Visual comparison is NON-FATAL (softScreenshot): a baseline diff warns, doesn't
// fail. The functional steps (add-to-cart / checkout / pay) stay hard assertions.
const visualCheck = (page: Page, name: string, masks: Locator[] = []): Promise<void> =>
  softScreenshot(page, name, { mask: masks });

test.describe('Guest · commerce visual', { tag: ['@plugin:woocommerce', '@plugin:woocommerce-gateway-stripe', '@plugin:funnel-builder'] }, () => {
  test('OS-VIS-cart-course', async ({ shopperPage }) => {
    await addSingleCourse(shopperPage);
    await shopperPage.goto(PATHS.cart, { waitUntil: 'load' });
    await visualCheck(shopperPage, 'cart-course.png');
  });

  test('OS-VIS-checkout-course', async ({ shopperPage }) => {
    await addSingleCourse(shopperPage);
    await shopperPage.goto(PATHS.checkout, { waitUntil: 'load' });
    await expect(shopperPage.locator('.blockUI, .wc-block-components-spinner').first()).toHaveCount(0).catch(() => {});
    await visualCheck(shopperPage, 'checkout-course.png');
  });

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
});
