// All expect() lives here. Assertions branch on typed config/result, never on
// project/region. Blocks-checkout + custom OS-theme surfaces.
import { type Page, expect } from '@playwright/test';
import type { OrderResult, Frequency } from '../types/test-config';
import * as os from './openstudio';
import { refundEmail } from './email';

const PAYMENT_LABEL_RE = /Credit ?\/? ?Debit Card|Payment via/i;

export function assertOrderPlaced(result: OrderResult): void {
  expect(result.orderNumber, 'order number present').toMatch(/\d+/);
  expect(result.email, 'confirmation email present').toContain('@');
}

export async function assertDashboardPlan(page: Page, frequency: Frequency): Promise<void> {
  const d = await os.readDashboard(page);
  expect(d.plan.toUpperCase()).toContain('OPEN STUDIO');
  expect(d.nextPayment, 'next payment date shown').not.toEqual('');
  if (frequency === 'monthly') expect(d.frequency.toLowerCase()).toContain('month');
}

export async function assertBackendOrder(adminPage: Page, result: OrderResult): Promise<void> {
  await adminPage.goto(`wp-admin/admin.php?page=wc-orders&action=edit&id=${result.orderNumber}`, { waitUntil: 'networkidle' });
  await expect(adminPage.locator('.woocommerce-order-data, #order_data').first()).toContainText(PAYMENT_LABEL_RE);
}

export async function assertCourseAccess(page: Page): Promise<void> {
  await page.goto(os.PATHS.membersArea, { waitUntil: 'networkidle' });
  await expect(page.locator('main, .site-main').first()).toBeVisible();
}

export async function assertCoursePlusSubscription(page: Page): Promise<void> {
  const rows = page.locator('#order_review .os-checkout-order-review table tbody tr');
  await expect(rows).toHaveCount(2);
  await expect(page.locator('span.subscription-details').first()).toContainText(/month|free trial/i);
}

export async function assertRefunded(adminPage: Page): Promise<void> {
  await expect(adminPage.locator('#select2-order_status-container')).toContainText(/Refunded/i);
  await expect(adminPage.locator('tr.refund td.line_cost .woocommerce-Price-amount.amount').first()).toContainText(/-/);
}

export async function assertRefundEmail(emailPage: Page, email: string): Promise<void> {
  const amount = await refundEmail(emailPage, email);
  expect(amount, 'refund email shows negative amount').toMatch(/-/);
}
