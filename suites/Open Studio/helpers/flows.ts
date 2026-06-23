// Flow compositions — orchestrate the openstudio primitives into end-to-end
// journeys and return a typed result. All expect() lives in assertions.ts.
import { type Page } from '@playwright/test';
import * as os from './openstudio';
import type { JoinConfig, UserConfig, OrderResult, Frequency } from '../types/test-config';

/**
 * Join via the FunnelKit funnel: add membership → blocks checkout (register inline)
 * → Stripe → place order → graceful upsell → read confirmation → welcome survey.
 */
export async function runJoinFlow(shopper: Page, config: JoinConfig, user: UserConfig): Promise<OrderResult> {
  await os.addMembershipToCart(shopper, config.frequency);
  await os.fillCheckout(shopper, user);
  await os.payStripeAndPlaceOrder(shopper);
  await os.handleFunnelKitUpsell(shopper, config.upsell); // non-fatal
  const result = await os.readOrderReceived(shopper);
  await os.doSurvey(shopper, config.survey, config.surveyData);
  return result;
}

export async function runSingleCourseFlow(shopper: Page, user: UserConfig): Promise<OrderResult> {
  await os.addSingleCourse(shopper);
  await os.fillCheckout(shopper, user);
  await os.payStripeAndPlaceOrder(shopper);
  return os.readOrderReceived(shopper);
}

export async function runCoursePlusSubscriptionFlow(shopper: Page, user: UserConfig, frequency: Frequency): Promise<OrderResult> {
  await os.addSingleCourse(shopper);
  await os.addMembershipToCart(shopper, frequency);
  await os.fillCheckout(shopper, user);
  await os.payStripeAndPlaceOrder(shopper);
  return os.readOrderReceived(shopper);
}

/** Admin-side refund of an order via the WC order edit screen. */
export async function runRefundFlow(adminPage: Page, orderNumber: string): Promise<void> {
  await adminPage.goto(`wp-admin/admin.php?page=wc-orders&action=edit&id=${orderNumber}`, { waitUntil: 'networkidle' });
  await adminPage.locator('button.button.refund-items').click();
  await adminPage.locator('#refund_reason').fill('Testing Refund');
  await adminPage.locator('button.button-primary.do-api-refund').click();
  await adminPage.locator('#select2-order_status-container').waitFor();
}
