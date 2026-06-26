// All expect() lives here. Assertions branch on typed config/result, never on
// project/region. Blocks-checkout + custom OS-theme surfaces.
import { type Page, type Locator, expect } from '@playwright/test';
import type { OrderResult, Frequency } from '../types/test-config';
import * as os from './openstudio';
import { refundEmailText } from './email';

const PAYMENT_LABEL_RE = /Credit ?\/? ?Debit Card|Payment via/i;

/**
 * Visual comparison that WARNS instead of failing. A baseline diff (or a missing
 * baseline on first run) logs a non-fatal warning and the test continues — the
 * functional assertions around it still guard real breakage. Pass `locator` to
 * shoot a single element instead of the full page.
 */
export async function softScreenshot(
  page: Page,
  name: string,
  opts: { mask?: Locator[]; locator?: Locator; fullPage?: boolean } = {},
): Promise<void> {
  await os.dismissPopups(page);
  try {
    if (opts.locator) {
      await expect(opts.locator).toHaveScreenshot(name, { mask: opts.mask ?? [] });
    } else {
      await expect(page).toHaveScreenshot(name, { fullPage: opts.fullPage ?? true, mask: opts.mask ?? [] });
    }
  } catch (err) {
    console.warn(`[visual] ${name} differs from baseline (non-fatal): ${(err as Error).message.split('\n')[0]}`);
  }
}

export function assertOrderPlaced(result: OrderResult): void {
  expect(result.orderNumber, 'order number present').toMatch(/\d+/);
  expect(result.email, 'confirmation email present').toContain('@');
}

export async function assertDashboardPlan(page: Page, frequency: Frequency): Promise<void> {
  const d = await os.readDashboard(page);
  expect(d.plan.toUpperCase()).toContain('OPEN STUDIO');
  expect(d.nextPayment, 'next payment date shown').not.toEqual('');
  // Monthly → "Monthly subscription"; Annually → "Yearly subscription" (GI wording).
  const expected = frequency === 'monthly' ? /month/i : /year/i;
  expect(d.frequency).toMatch(expected);
}

/**
 * Compare a content page beyond "it loaded": the page reached its path, renders a
 * heading, and its main region actually contains the expected content token.
 */
export async function assertPageContent(page: Page, path: string, content: RegExp): Promise<void> {
  await page.goto(path, { waitUntil: 'networkidle' });
  await expect(page).toHaveURL(new RegExp(path === './' ? '/$' : path.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
  await expect(page.locator('h1, h2, .entry-title, .os-page-title').first()).toBeVisible();
  await expect(page.locator('main, #main, .site-main').first()).toContainText(content);
}

/** A course-only buyer never gets a membership: dashboard shows NO PLAN + a join CTA. */
export async function assertNoMembership(page: Page): Promise<void> {
  await page.goto(os.PATHS.dashboard, { waitUntil: 'networkidle' });
  await expect(page.locator('.os-account-membership')).toContainText(/NO PLAN IS ACTIVE/i);
  await expect(page.locator('a[href*="/join"].button').first()).toBeVisible();
}

export async function assertBackendOrder(adminPage: Page, result: OrderResult): Promise<void> {
  await adminPage.goto(`wp-admin/admin.php?page=wc-orders&action=edit&id=${result.orderNumber}`, { waitUntil: 'networkidle' });
  await expect(adminPage.locator('.woocommerce-order-data, #order_data').first()).toContainText(PAYMENT_LABEL_RE);
  // status select + customer email on the order edit screen (GI Check_order_on_Backend).
  await expect(adminPage.locator('#select2-order_status-container, #order_status')).toContainText(/Completed|Processing/i);
  if (result.email) {
    await expect(adminPage.locator(`a[href="mailto:${result.email}"], .order_data_column`).first()).toContainText(result.email);
  }
}

export async function assertCourseAccess(page: Page): Promise<void> {
  await page.goto(os.PATHS.membersArea, { waitUntil: 'networkidle' });
  await expect(page.locator('main, .site-main').first()).toBeVisible();
}

// Runs on the order-received / confirmation page (post-place-order), NOT the
// checkout review (which is gone by then). GI 23: two order_item rows — the course
// + the Open Studio subscription line.
export async function assertCoursePlusSubscription(page: Page): Promise<void> {
  const rows = page.locator('tr.order_item');
  await expect(rows).toHaveCount(2);
  await expect(page.locator('a[href*="?attribute_frequency="]').first()).toContainText(/Open Studio/i);
}

// ---- membership-gating: sessions, course CTA, nav, bookmarks -------------

/** A Pro-only session shows the upgrade gate + a join CTA (guest or free member). */
export async function assertProGated(page: Page): Promise<void> {
  await expect(page.locator('.os-single-event__join, .os-single-event__joindesc').first())
    .toContainText(/Open Studio Pro member/i);
  await expect(page.locator('a[href*="pro"].button, a[href*="/join/"].button').first()).toBeVisible();
}

/** A non-Pro session is joinable: timer + join-event control, no upgrade gate. */
export async function assertSessionJoinable(page: Page): Promise<void> {
  await expect(page.locator('span.os-event-timer, a.os-event-join-event').first()).toBeVisible();
}

/** Course detail CTA differs by audience: guests see "Join now", members don't. */
export async function assertJoinCta(page: Page, present: boolean): Promise<void> {
  const cta = page.locator('a[href*="/join/"]');
  if (present) await expect(cta.first()).toBeVisible();
  else await expect(cta).toHaveCount(0);
}

/** Logged-in desktop nav exposes member-only destinations. */
export async function assertLoggedInMenuDesktop(page: Page): Promise<void> {
  await os.openDesktopMenu(page);
  await expect(page.locator('a[href*="/courses/"]').first()).toBeVisible();
  await expect(page.locator('a[href*="/community/"]').first()).toBeVisible();
  await expect(page.locator('a[href*="/my-account/"]').first()).toBeVisible();
}

/** Logged-in mobile drawer exposes Dashboard / Bookmarks / Log out. */
export async function assertLoggedInMenuMobile(page: Page): Promise<void> {
  await os.openMobileMenu(page);
  await expect(page.locator('a[href*="/dashboard/"]').first()).toBeVisible();
  await expect(page.locator('a[href*="/mybookmarks/"], :text("My Bookmarks")').first()).toBeVisible();
  await expect(page.locator(':text("Log out")').first()).toBeVisible();
}

/** After removing the only bookmark, the count reads 0. */
export async function assertBookmarksCleared(page: Page): Promise<void> {
  await expect(page.locator('.os-bookmarks__count > strong').first()).toContainText('0');
}

export async function assertRefunded(adminPage: Page): Promise<void> {
  await expect(adminPage.locator('#select2-order_status-container')).toContainText(/Refunded/i);
  await expect(adminPage.locator('tr.refund td.line_cost .woocommerce-Price-amount.amount').first()).toContainText(/-/);
}

export async function assertRefundEmail(emailPage: Page, email: string): Promise<void> {
  const text = await refundEmailText(emailPage, email);
  expect(text, 'refund email should reference the refund').toMatch(/refund/i);
}
