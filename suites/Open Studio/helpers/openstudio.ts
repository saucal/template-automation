// Open Studio site DOM layer — relative paths, selectors, cart/checkout/funnel/
// survey/dashboard primitives. All goto() are relative (no leading slash) so they
// resolve against the configured baseURL. No project/region conditionals: this is
// the Open-Studio-only path expressed through typed config.
import { type Page } from '@playwright/test';
import type { Frequency, UserConfig, UpsellChoice, SurveyChoice, SurveyConfig, OrderResult } from '../types/test-config';

/** Relative paths — all goto() are relative (no leading slash). */
export const PATHS = {
  home: './',
  courses: 'courses/',
  instructors: 'instructors/',
  mentorSessions: 'mentor-sessions/',
  pro: 'pro/',
  podcasts: 'podcasts/',
  about: 'about-us/',
  contact: 'contact/',
  careers: 'careers/',
  terms: 'terms-of-service/',
  privacy: 'privacy-policy/',
  events: 'events/',
  community: 'community/',
  gps: 'gps/',
  osSessions: 'os-sessions/',
  join: 'join/',
  dashboard: 'dashboard/',
  welcome: 'welcome-to-open-studio/',
  myAccount: 'my-account/',
  lostPassword: 'my-account/lost-password/',
  orders: 'my-account/orders/',
  membersArea: 'my-account/members-area/',
  bookmarks: 'mybookmarks/',
  checkout: 'checkout/',
  membershipProduct: 'product/open-studio/',
  singleCourse: 'product/jazz-piano-jump-start-course/',
  // content (non-product) surfaces — used for membership-gating checks.
  courseDetail: 'courses/jazz-piano-jump-start/',
  instrumentPiano: 'piano/',
  instructorDetail: 'instructors/peter-martin/',
  myProfile: 'my-account/my-profile/',
} as const;

export const STRIPE_CARD = { number: '4242 4242 4242 4242', expiry: '04 / 27', cvc: '234', postal: '90210' } as const;
export const PAYMENT_LABEL = 'Credit / Debit Card';

/** Public pages for the guest visual sweep: [slug, path]. */
export const GUEST_PAGES: ReadonlyArray<readonly [string, string]> = [
  ['home', PATHS.home],
  ['courses', PATHS.courses],
  ['instructors', PATHS.instructors],
  ['mentor-sessions', PATHS.mentorSessions],
  ['pro', PATHS.pro],
  ['podcasts', PATHS.podcasts],
  ['about', PATHS.about],
  ['contact', PATHS.contact],
  ['careers', PATHS.careers],
  ['terms', PATHS.terms],
  ['privacy', PATHS.privacy],
];

/** Best-effort dismissal of cookie/consent + newsletter popups. Swallow if absent. */
export async function dismissPopups(page: Page): Promise<void> {
  for (const sel of ['button:has-text("Accept")', '.pum-close', '[aria-label="Close"]']) {
    const el = page.locator(sel).filter({ visible: true });
    if (await el.count()) await el.first().click({ force: true }).catch(() => {});
  }
}

// ---- cart + checkout -----------------------------------------------------

export async function addMembershipToCart(page: Page, frequency: Frequency): Promise<void> {
  const attr = frequency === 'monthly' ? 'Monthly' : 'Annually';
  await page.goto(`${PATHS.membershipProduct}?attribute_frequency=${attr}`, { waitUntil: 'networkidle' });
  await dismissPopups(page);
  await page.locator('button[name="add-to-cart"]').or(page.getByRole('link', { name: /Sign Up|Join/i })).first().click();
}

export async function addSingleCourse(page: Page): Promise<{ title: string; price: string }> {
  await page.goto(PATHS.singleCourse, { waitUntil: 'networkidle' });
  await dismissPopups(page);
  const title = ((await page.locator('h2.os-course-info-page-header__title').first().textContent().catch(() => '')) ?? '').trim();
  const price = ((await page.locator('.summary.entry-summary .price bdi').last().textContent().catch(() => '')) ?? '').trim();
  await page.getByRole('button', { name: /Buy Course/i }).or(page.locator('button[name="add-to-cart"]')).first().click();
  return { title, price };
}

/** Fill Blocks checkout contact + account fields for a new member. */
export async function fillCheckout(page: Page, user: UserConfig): Promise<void> {
  await page.goto(PATHS.checkout, { waitUntil: 'networkidle' });
  await dismissPopups(page);
  await page.locator('#email, #billing_email').first().fill(user.email);
  const pw = page.locator('#account_password, #password');
  if (await pw.count()) await pw.first().fill(user.password);
  const fn = page.locator('#billing_first_name, #shipping-first_name');
  if (await fn.count()) await fn.first().fill(user.firstName);
  const ln = page.locator('#billing_last_name, #shipping-last_name');
  if (await ln.count()) await ln.first().fill(user.lastName);
}

/** Fill the Stripe card iframe and place the (Blocks) order. */
export async function payStripeAndPlaceOrder(page: Page): Promise<void> {
  const frame = page.frameLocator('iframe[src*="js.stripe.com"]').first();
  await frame.locator('input[name="number"]').fill(STRIPE_CARD.number);
  await frame.locator('input[name="expiry"]').fill(STRIPE_CARD.expiry);
  await frame.locator('input[name="cvc"]').fill(STRIPE_CARD.cvc);
  const postal = frame.locator('input[name="postalCode"]');
  if (await postal.count()) await postal.fill(STRIPE_CARD.postal);
  // Uncheck Stripe Link opt-in if present+checked — otherwise the Link modal can
  // intercept place-order (GI fill_CC clicked #checkbox-linkOptIn[checked]).
  const linkOptIn = frame.locator('#checkbox-linkOptIn');
  if (await linkOptIn.count() && await linkOptIn.isChecked().catch(() => false)) {
    await linkOptIn.uncheck().catch(() => {});
  }
  await page.locator('button.wc-block-components-checkout-place-order-button').click();
  await page.locator('.wc-block-components-spinner, .blockUI').first().waitFor({ state: 'hidden' }).catch(() => {});
}

// ---- FunnelKit upsell + survey + confirmation ----------------------------

/**
 * After place-order, FunnelKit may serve an upsell page. Honor `choice` IF an
 * upsell appears; if none appears within the window, log and continue — never
 * fail (the funnel does not always serve an upsell). Returns whether one was handled.
 */
export async function handleFunnelKitUpsell(page: Page, choice: UpsellChoice): Promise<boolean> {
  const heading = page.locator('.bwf-inner-col > h2.bwf-adv-heading.bwf-width-default');
  const appeared = await heading.first().waitFor({ state: 'visible', timeout: 8_000 }).then(() => true).catch(() => false);
  if (!appeared) {
    console.log('[openstudio] no FunnelKit upsell served — continuing');
    return false;
  }
  const sel = choice === 'accept' ? 'a.bwf-btn.solid.wfocu_upsell' : 'a.bwf-btn.solid.wfocu_skip_offer';
  await page.locator(sel).first().click();
  await page.waitForLoadState('networkidle');
  return true;
}

/** Read order number + email + total from the order-received / FunnelKit confirmation. */
export async function readOrderReceived(page: Page): Promise<OrderResult> {
  const classicOrder = page.locator('.order > strong');
  const orderNumber = (await classicOrder.count())
    ? ((await classicOrder.first().textContent()) ?? '').trim()
    : ((await page.locator('.bwf-align-wrap-full p.bwf-adv-heading').first().textContent().catch(() => '')) ?? '').trim();
  // Classic order-received uses `.email > strong`; the FunnelKit confirmation has
  // no such node — fall back to the bwf heading's strong (GI parity), else email
  // stays '' and assertOrderPlaced would wrongly fail on the funnel path.
  const classicEmail = page.locator('.email > strong');
  const email = (await classicEmail.count())
    ? ((await classicEmail.first().textContent()) ?? '').trim()
    : ((await page.locator('.bwf-align-wrap-full p.bwf-adv-heading > strong').first().textContent().catch(() => '')) ?? '').trim();
  const total = ((await page.locator('strong > .woocommerce-Price-amount.amount > bdi').first().textContent().catch(() => '')) ?? '').trim();
  return { orderNumber, email, total, paymentLabel: PAYMENT_LABEL };
}

/** Welcome-page survey: submit it (with data) or skip via ?skip-survey=1. */
export async function doSurvey(page: Page, choice: SurveyChoice, data: SurveyConfig): Promise<void> {
  await page.goto(PATHS.welcome, { waitUntil: 'networkidle' });
  if (choice === 'skip') {
    await page.locator('a[href*="/dashboard/?skip-survey=1"]').first().click();
    await page.waitForLoadState('networkidle');
    return;
  }
  await page.locator(`input[name="os-survey-instrument"][value="${data.instrument}"]`)
    .or(page.locator('input[name="os-survey-instrument"]')).first().check();
  await page.locator(`input[name="os-survey-skill-level"][value="${data.skillLevel}"]`)
    .or(page.locator('input[name="os-survey-skill-level"]')).first().check();
  await page.locator('input[type="submit"].button').first().click();
  await page.waitForLoadState('networkidle');
}

export interface DashboardReading {
  plan: string;
  frequency: string;
  nextPayment: string;
}

export async function readDashboard(page: Page): Promise<DashboardReading> {
  await page.goto(PATHS.dashboard, { waitUntil: 'networkidle' });
  const plan = ((await page.locator('.os-account-membership').first().textContent().catch(() => '')) ?? '').trim();
  const frequency = ((await page.locator('.os-my-dashboard__frequency > span').first().textContent().catch(() => '')) ?? '').trim();
  const nextPayment = ((await page.locator('.os-my-dashboard__next > span').first().textContent().catch(() => '')) ?? '').trim();
  return { plan, frequency, nextPayment };
}

// ---- navigation (header menus) -------------------------------------------

/** Open the desktop primary nav (hamburger that reveals #primary-menu). */
export async function openDesktopMenu(page: Page): Promise<void> {
  await page.locator('#os-open-menu').first().click().catch(() => {});
}

/** Open the mobile drawer menu (#mobile-menu). */
export async function openMobileMenu(page: Page): Promise<void> {
  await page.locator('svg.kadence-svg-icon.kadence-menu-svg').first().click().catch(() => {});
}

// ---- guest content surfaces (membership-gating) --------------------------

/** Course detail (content, not the product page). Guest sees a "Join now" CTA. */
export async function gotoCourseDetail(page: Page): Promise<void> {
  await page.goto(PATHS.courseDetail, { waitUntil: 'networkidle' });
  await dismissPopups(page);
}

/** Instrument archive reached from the courses instrument grid. */
export async function gotoInstrumentPage(page: Page): Promise<void> {
  await page.goto(PATHS.courses, { waitUntil: 'networkidle' });
  await dismissPopups(page);
  await page.locator('a[href*="/piano/"].os-instruments-grid__instrument').first().click().catch(() => {});
  await page.waitForLoadState('networkidle');
}

export async function gotoInstructorDetail(page: Page): Promise<void> {
  await page.goto(PATHS.instructorDetail, { waitUntil: 'networkidle' });
  await dismissPopups(page);
}

// ---- events / sessions ---------------------------------------------------

/** Open the events calendar (live schedule, all timezones render in GMT label). */
export async function gotoEvents(page: Page): Promise<void> {
  await page.goto(PATHS.events, { waitUntil: 'networkidle' });
  await dismissPopups(page);
  // calendar hydrates async — give it a beat (GI used explicit pauses here).
  await page.locator('.os-calendar-event-item').first().waitFor({ state: 'visible', timeout: 15_000 }).catch(() => {});
}

/** Click into a Pro-only (locked) upcoming session. */
export async function openProSession(page: Page): Promise<void> {
  await page.locator('div.os-calendar-event-item.os-calendar-event-item-pro:not(.os-calendar-event-item-past)')
    .first().click();
  await page.waitForLoadState('networkidle');
}

/** Click into a free upcoming session (non-pro). */
export async function openFreeSession(page: Page): Promise<void> {
  await page.locator('div.os-calendar-event-item:not(.os-calendar-event-item-pro):not(.os-calendar-event-item-past)')
    .first().click();
  await page.waitForLoadState('networkidle');
}

// ---- bookmarks -----------------------------------------------------------

/** Toggle the bookmark control on the current course/lesson surface. */
export async function toggleBookmark(page: Page): Promise<void> {
  await page.locator('.cbxwpbkmarkwrap.cbxwpbkmarkwrap_loggedin, button:has-text("Bookmark")')
    .first().click().catch(() => {});
  await page.waitForTimeout(1_000);
}

/** Remove the first bookmark on the My Bookmarks page (confirm in the popup). */
export async function removeFirstBookmark(page: Page): Promise<void> {
  await page.goto(PATHS.bookmarks, { waitUntil: 'networkidle' });
  const remove = page.locator('button.os-bookmark-item__remove').first();
  if (!(await remove.count())) return;
  await remove.click();
  // confirm in the awn popup (button text varies — match the confirm action).
  await page.locator('.awn-popup-body .os-bookmark-popup__actions button').first().click().catch(() => {});
  await page.locator('#awn-popup-wrapper').waitFor({ state: 'hidden' }).catch(() => {});
}

// ---- profile -------------------------------------------------------------

/** Update the my-profile survey (instrument + skill level) and save. */
export async function updateProfile(page: Page, data: SurveyConfig): Promise<void> {
  await page.goto(PATHS.myProfile, { waitUntil: 'networkidle' });
  await page.locator(`//label[contains(translate(text(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz'),'${data.instrument.toLowerCase()}')]`)
    .first().click().catch(() => {});
  await page.locator(`//label[contains(translate(text(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz'),'${data.skillLevel.toLowerCase()}')]`)
    .first().click().catch(() => {});
  await page.locator('input[type="submit"].button[value="Update"], input[type="submit"].button').first().click();
  await page.waitForLoadState('networkidle');
}
