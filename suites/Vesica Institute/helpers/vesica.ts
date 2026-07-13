// Vesica site helper — all Vesica-specific DOM: cart/checkout navigation, the
// Authorize.Net (AIM emulation, test-mode-prefilled card) + PayPal PPCP payment
// paths, order-received capture, and admin order/refund editor (legacy post.php).
//
// Consumed by: helpers/flows.ts (orchestration) and helpers/assertions.ts (reads).
// Rules: every action/read routes through helpers/resilient.ts (rule 23); NO
// expect() here (assertions live in assertions.ts); navigate via customer clicks,
// never goto to cart/checkout (rule 30) — the ONLY allowed goto is home priming,
// `?add-to-cart=<id>` links, and admin/email pages.
//
// Selectors verified live 2026-07-13 against stg-vesica-staging.kinsta.cloud —
// see docs/site-exploration.md.
import { type Page } from '@playwright/test';
import { ctxFor, resilientClick, resilientText } from './resilient';
import type { BrandConfig, BillingAddress, OrderConfig, OrderResult, CapturedTotals } from '../types/test-config';

// ---------------------------------------------------------------------------
// Brand config (this branch = Vesica only)
// ---------------------------------------------------------------------------

/** Per-brand facts. Vesica: Auth.Net CC (test-prefilled) + PayPal PPCP; refund
 *  test runs against the PayPal order (User 02), which supports a gateway API
 *  refund → Refunded. (Auth.Net AIM here is manual-refund-only; that path is
 *  Pur Crystal's, a separate branch.) */
export const brandConfig: BrandConfig = {
  product: { slug: 'bg-notebooks-set-of-3', id: '127660', type: 'simple' },
  hasPayPal: true,
  hasRegister: true,
  // PayPal PPCP admin refund note (confirm exact copy on first live PayPal order).
  refundNotePattern: /refund/i,
  refundedStatus: 'Refunded',
};

/** A product category listing that contains simple add-to-cart products. */
export const PRODUCT_CATEGORY_PATH =
  'product-category/vesica-shop/biogeometry/biogeometry-tools-for-the-public/';

/** Billing address for guest/new orders. US address (AvaTax computes tax by
 *  address; the CA test address resolved to $0 tax on staging). Email is filled
 *  per-run by the caller (unique) — this constant carries the static fields. */
export const BILLING: Omit<BillingAddress, 'email'> = {
  firstName: 'QA',
  lastName: 'Tester',
  company: '',
  address: '123 Test St',
  city: 'Beverly Hills',
  state: 'California',
  shortState: 'CA',
  zip: '90210',
  country: 'United States (US)',
  shortCountry: 'US',
  phone: '4089211861',
};

export const ORDER_DETAILS_TABLE =
  'table.woocommerce-table--order-details, table.shop_table.order_details';

// ---------------------------------------------------------------------------
// Small utils
// ---------------------------------------------------------------------------

/** Strip currency/whitespace → number. "Free"/empty → NaN (caller treats as no cost). */
export function toAmount(text: string | null | undefined): number {
  return parseFloat((text ?? '').replace(/[^0-9.-]/g, ''));
}

/** Generate a unique per-run order email (matches the GI `qa+gi_*@saucal.com` convention). */
export function orderEmail(prefix = 'order'): string {
  return `qa+gi_${prefix}_${Math.random().toString(36).slice(2, 10)}@saucal.com`;
}

// ---------------------------------------------------------------------------
// Popups / readiness
// ---------------------------------------------------------------------------

/** Dismiss the CookieYes consent banner if it rendered (best-effort — it often
 *  errors out on staging URL mismatch and never shows). */
export async function dismissCookieBanner(page: Page): Promise<void> {
  const accept = page
    .getByRole('button', { name: /accept all|accept|got it|i agree/i })
    .or(page.locator('.cky-btn-accept, #cookie_action_close_header'))
    .first();
  if (await accept.isVisible({ timeout: 1_500 }).catch(() => false)) {
    await accept.click({ timeout: 3_000 }).catch(() => {});
  }
}

/** Wait for the checkout to settle: WC's `.blockUI` overlay gone and #place_order present. */
export async function waitForCheckoutReady(page: Page, timeout = 30_000): Promise<void> {
  await page
    .locator('#order_review, form.checkout')
    .first()
    .waitFor({ state: 'visible', timeout })
    .catch(() => {});
  // WooCommerce blocks the form with a .blockUI overlay during update_order_review
  // AJAX; wait for it to clear so clicks land on the real controls, not the overlay.
  await page
    .locator('.blockUI.blockOverlay')
    .first()
    .waitFor({ state: 'hidden', timeout })
    .catch(() => {});
}

// ---------------------------------------------------------------------------
// Cart / checkout navigation (rule 30 — customer click paths)
// ---------------------------------------------------------------------------

/** Add a simple product to the cart via its `?add-to-cart=<id>` link (an allowed
 *  goto per rule 30). Lands on /cart/. */
export async function addToCart(page: Page, productId = brandConfig.product.id): Promise<void> {
  await page.goto(`?add-to-cart=${productId}`, { waitUntil: 'load' });
  await dismissCookieBanner(page);
}

/** Go to the cart by clicking the header cart link (customer path — not a goto). */
export async function goToCart(page: Page): Promise<void> {
  const ctx = ctxFor(page);
  await resilientClick(ctx, {
    primary: page.getByRole('link', { name: /cart/i }).first(),
    alt: page.locator('a[href$="/cart/"], a[href*="/cart/"]').first(),
    ai: 'the header cart link',
  });
  await page.waitForURL('**/cart/**', { timeout: 20_000 }).catch(() => {});
}

/** Proceed from the cart page to checkout by clicking "Proceed to checkout". */
export async function proceedToCheckout(page: Page): Promise<void> {
  const ctx = ctxFor(page);
  await resilientClick(ctx, {
    primary: page.getByRole('link', { name: /proceed to checkout/i }),
    alt: page.locator('a.checkout-button, a[href*="/checkout/"]').first(),
    ai: 'the Proceed to checkout button',
  });
  await page.waitForURL('**/checkout/**', { timeout: 20_000 }).catch(() => {});
  await waitForCheckoutReady(page);
}

// ---------------------------------------------------------------------------
// Checkout: billing + payment
// ---------------------------------------------------------------------------

/** Fill the classic checkout billing fields. Country/state are select2 over native
 *  <select>: set the native value + dispatch `change` so WooCommerce's
 *  update_order_review fires (a plain resilientFill can't drive select2). */
export async function fillCheckoutAddress(
  page: Page,
  billing: BillingAddress
): Promise<void> {
  await waitForCheckoutReady(page);
  // Text inputs.
  const text: Array<[string, string | undefined]> = [
    ['#billing_first_name', billing.firstName],
    ['#billing_last_name', billing.lastName],
    ['#billing_company', billing.company],
    ['#billing_address_1', billing.address],
    ['#billing_address_2', billing.address2],
    ['#billing_city', billing.city],
    ['#billing_postcode', billing.zip],
    ['#billing_phone', billing.phone],
    ['#billing_email', billing.email],
  ];
  for (const [sel, val] of text) {
    if (val === undefined) continue;
    await page.locator(sel).fill(val).catch(() => {});
  }
  // Country + state selects — value must be the short code; dispatch change to
  // trigger the dependent state-select re-render + shipping/tax recalculation.
  await setSelect(page, '#billing_country', billing.shortCountry ?? billing.country);
  await waitForCheckoutReady(page);
  await setSelect(page, '#billing_state', billing.shortState ?? billing.state);
  await waitForCheckoutReady(page);
}

/** Set a native <select> (behind select2) to `value` and fire the events WC listens on. */
async function setSelect(page: Page, selector: string, value: string): Promise<void> {
  await page
    .locator(selector)
    .evaluate((el, v) => {
      const sel = el as HTMLSelectElement;
      sel.value = v;
      sel.dispatchEvent(new Event('change', { bubbles: true }));
    }, value)
    .catch(() => {});
}

/** Select the Authorize.Net (Credit Card) gateway. It is the default-checked
 *  method and the card fields are PREFILLED in test mode, so this only needs to
 *  ensure the radio is selected (no card entry). */
export async function selectCreditCard(page: Page): Promise<void> {
  const ctx = ctxFor(page);
  const radio = page.locator('#payment_method_authorize_net_aim_emulation');
  if (!(await radio.isChecked().catch(() => false))) {
    await resilientClick(ctx, {
      primary: page.locator('label[for="payment_method_authorize_net_aim_emulation"]'),
      ai: 'the Credit Card payment method option',
    });
  }
  await waitForCheckoutReady(page);
}

/** Accept the terms checkbox then place the order (Auth.Net path — card prefilled). */
export async function placeOrderAuthNet(page: Page): Promise<void> {
  await selectCreditCard(page);
  await acceptTerms(page);
  await placeOrder(page);
  await page.waitForURL('**/order-received/**', { timeout: 60_000 });
}

/** Check the required "I have read and agree to the Terms" checkbox if present. */
export async function acceptTerms(page: Page): Promise<void> {
  const terms = page.locator('#terms').first();
  if ((await terms.count()) > 0 && !(await terms.isChecked().catch(() => false))) {
    // #terms may be visually hidden behind a styled label; .check() forces :checked
    // and fires change, which is what WC validates. AI tier can't fix actionability.
    await terms.check().catch(async () => {
      await page.locator('label[for="terms"]').click({ force: true }).catch(() => {});
    });
  }
}

/** Wait for #place_order to be enabled, then click it (GI `placeOrderElement`). */
export async function placeOrder(page: Page): Promise<void> {
  await waitForCheckoutReady(page);
  await page
    .locator('#place_order:not([disabled])')
    .first()
    .waitFor({ state: 'visible', timeout: 15_000 })
    .catch(() => {});
  await resilientClick(ctxFor(page), {
    primary: page.locator('#place_order').filter({ visible: true }),
    alt: page.getByRole('button', { name: /place order/i }),
    ai: 'the Place order button',
  });
}

/**
 * PayPal PPCP: select the PayPal gateway, click the "Pay with PayPal" Smart Button
 * inside PayPal's cross-origin SDK iframe, then drive the sandbox popup login
 * (email → Next → password → Log In → review Pay CTA #one-time-cta). Ported from
 * the No Pong reference; sandbox screens vary run-to-run so it's a resilient loop.
 */
export async function payPayPal(page: Page): Promise<void> {
  const ctx = ctxFor(page);
  await resilientClick(ctx, {
    primary: page.locator('label[for*="payment_method_ppcp"], label[for*="payment_method_paypal"]'),
    alt: page.locator('input[id*="ppcp"], input[id*="paypal"]').first(),
    ai: 'the PayPal payment method option',
  });
  await acceptTerms(page);
  await waitForCheckoutReady(page);

  const findPayButton = async () => {
    const framed = page.locator('iframe[name*="paypal" i]').first();
    if (await framed.count().catch(() => 0)) {
      const link = framed.contentFrame().getByRole('link', { name: /pay with paypal/i });
      if (await link.count().catch(() => 0)) return link.first();
    }
    for (const frame of page.frames()) {
      const byRole = frame.getByRole('link', { name: /pay with paypal/i });
      if (await byRole.count().catch(() => 0)) return byRole.first();
      const byData = frame.locator('[data-funding-source="paypal"]');
      if (await byData.count().catch(() => 0)) return byData.first();
    }
    return null;
  };
  let payButton = await findPayButton();
  for (let i = 0; i < 20 && !payButton; i++) {
    await page.waitForTimeout(1_000);
    payButton = await findPayButton();
  }
  if (!payButton) throw new Error('PayPal Smart Button never rendered after selecting PayPal');
  await payButton.waitFor({ state: 'visible', timeout: 20_000 });

  const popupPromise = page.waitForEvent('popup', { timeout: 30_000 }).catch(() => null);
  await payButton.click({ timeout: 20_000 });
  const popup = await popupPromise;
  const flow = popup ?? page;
  if (popup) {
    await popup.waitForURL((u) => !u.toString().includes('about:blank'), { timeout: 30_000 }).catch(() => {});
    await popup.waitForLoadState('domcontentloaded').catch(() => {});
  }

  const user = process.env.PAY_PAL_USER ?? 'qa+gi_sb-8eg0v132169@saucal.com';
  const pass = process.env.PAY_PAL_PASS ?? '';
  const emailField = flow
    .getByRole('textbox', { name: /email or mobile/i })
    .or(flow.locator('#email, input[name="login_email"], input[type="email"]'))
    .first();
  const passField = flow
    .getByRole('textbox', { name: /^password$/i })
    .or(flow.locator('#password, input[name="login_password"], input[type="password"]'))
    .first();
  const nextBtn = flow.getByRole('button', { name: /^next$/i }).first();
  const loginBtn = flow.getByRole('button', { name: /log\s?in|^login$/i }).first();
  // Review-screen SUBMIT is the "Pay" button / #one-time-cta — NOT the "Pay in full"
  // tile (a role=checkbox that only selects funding).
  const approveBtn = flow
    .getByRole('button', { name: 'Pay', exact: true })
    .or(flow.locator('#one-time-cta, button:has-text("Pay Now"), button:has-text("Complete Purchase"), [data-testid="submit-button-initial"]'))
    .first();
  const fillIfEmpty = async (loc: ReturnType<Page['locator']>, value: string) => {
    if (!value) return;
    if (!(await loc.isVisible({ timeout: 500 }).catch(() => false))) return;
    if (await loc.inputValue().catch(() => '')) return;
    await loc.fill(value, { timeout: 5_000 }).catch(() => {});
  };
  const clickIfVisible = async (loc: ReturnType<Page['locator']>) => {
    if (await loc.isVisible({ timeout: 500 }).catch(() => false)) {
      await loc.click({ timeout: 5_000 }).catch(() => {});
      return true;
    }
    return false;
  };
  for (let i = 0; i < 15; i++) {
    if (page.url().includes('/order-received/')) break;
    if (popup && popup.isClosed()) break;
    await fillIfEmpty(emailField, user);
    await fillIfEmpty(passField, pass);
    if (!(await clickIfVisible(nextBtn))) {
      if (!(await clickIfVisible(loginBtn))) {
        await clickIfVisible(approveBtn);
      }
    }
    await page.waitForTimeout(2_000);
  }
  await page.waitForURL('**/order-received/**', { timeout: 60_000 });
}

// ---------------------------------------------------------------------------
// Order-received capture (the capture-once parity source)
// ---------------------------------------------------------------------------

/** Read totals from an order-details / checkout-review table (subtotal/shipping/tax/total). */
export async function readTotals(page: Page, tableSelector: string): Promise<CapturedTotals> {
  return page.evaluate((sel) => {
    const norm = (s: string | null | undefined) => (s ?? '').replace(/\s+/g, ' ').trim();
    const tables = [...document.querySelectorAll(sel)].filter((t) => /subtotal/i.test(t.textContent ?? ''));
    const out: { subtotal: string; shipping: string; tax: string; total: string } = {
      subtotal: '', shipping: '', tax: '', total: '',
    };
    for (const t of tables) {
      for (const r of Array.from(t.querySelectorAll('tr'))) {
        const head = norm(r.querySelector('th, td')?.textContent).toLowerCase().replace(':', '').trim();
        const priceEl = Array.from(r.querySelectorAll('td:last-child .woocommerce-Price-amount')).find(
          (el) => !el.closest('.includes_tax')
        );
        const amt = norm((priceEl ?? r.querySelector('td:last-child'))?.textContent);
        if (head === 'subtotal') out.subtotal = amt;
        else if (r.classList.contains('shipping') || head.startsWith('shipping') || head.startsWith('shipment')) out.shipping = amt;
        else if (/\b(?:gst|hst|pst|qst|vat|tax)\b/.test(head)) out.tax = amt;
        else if (head === 'total') out.total = amt;
      }
    }
    return out;
  }, tableSelector);
}

/** Read + capture the order-received page into an OrderResult (the parity source). */
export async function readOrderReceived(page: Page, config: OrderConfig): Promise<OrderResult> {
  await page.waitForURL('**/order-received/**', { timeout: 30_000 });
  await page.waitForLoadState('load');
  const ctx = ctxFor(page);

  const orderNumber = (
    await resilientText(ctx, {
      primary: page.locator('li.woocommerce-order-overview__order.order > strong'),
      ai: 'the order number on the order confirmation',
    })
  ).replace(/[^0-9]/g, '');

  // WP post id from the order-received URL (…/order-received/<postId>/?key=…).
  const postId = (page.url().match(/order-received\/(\d+)/)?.[1]) ?? orderNumber;

  const paymentLabel = await resilientText(ctx, {
    primary: page.locator('li.woocommerce-order-overview__payment-method.method > strong'),
    ai: 'the payment method on the order confirmation',
  });

  const billingBlock = await resilientText(ctx, {
    primary: page.locator('.woocommerce-column--billing-address address').first()
      .or(page.locator('.woocommerce-customer-details address').first()),
    ai: 'the billing address block on the order confirmation',
  });

  const totals = await readTotals(page, ORDER_DETAILS_TABLE);

  return {
    orderNumber,
    postId,
    billingEmail: config.accountEmail ?? BILLING_EMAIL_PLACEHOLDER,
    paymentLabel,
    totals,
    billingBlock,
  };
}

/** Placeholder used only when a caller didn't thread the email through config. */
const BILLING_EMAIL_PLACEHOLDER = '';

// ---------------------------------------------------------------------------
// Account flows (login / passwordless set-password / forgot-password)
// ---------------------------------------------------------------------------

/** Log a shopper in at /my-account/ (polls for the account nav as the success signal). */
export async function loginShopper(page: Page, email: string, password: string): Promise<void> {
  await page.goto('my-account/', { waitUntil: 'load' });
  await dismissCookieBanner(page);
  const ctx = ctxFor(page);
  if (await page.locator('.woocommerce-MyAccount-navigation').isVisible({ timeout: 2_000 }).catch(() => false)) {
    return; // already logged in
  }
  await page.locator('#username').fill(email);
  await page.locator('#password').fill(password);
  await resilientClick(ctx, {
    primary: page.getByRole('button', { name: /log in/i }),
    alt: page.locator('button[name="login"]'),
    ai: 'the account Log in button',
  });
  await page.locator('.woocommerce-MyAccount-navigation').waitFor({ state: 'visible', timeout: 20_000 });
}

/** Set a new password on the reset/set-password page (#password_1/#password_2).
 *  Shared by passwordless account-creation verify and the forgot-password flow. */
export async function setNewPassword(page: Page, newPassword: string): Promise<void> {
  await page.locator('#password_1').waitFor({ state: 'visible', timeout: 20_000 });
  await page.locator('#password_1').fill(newPassword);
  await page.locator('#password_2').fill(newPassword);
  await resilientClick(ctxFor(page), {
    primary: page.getByRole('button', { name: /save|reset password|set password/i }),
    alt: page.locator('button[value="Save"], button[type="submit"]').first(),
    ai: 'the Save / Set password button',
  });
}

/** Request a password reset for `email` on /my-account/lost-password/. */
export async function requestPasswordReset(page: Page, email: string): Promise<void> {
  await page.goto('my-account/lost-password/', { waitUntil: 'load' });
  await dismissCookieBanner(page);
  await page.locator('#user_login').fill(email);
  await resilientClick(ctxFor(page), {
    primary: page.getByRole('button', { name: /reset password|get new password/i }),
    alt: page.locator('button[value="Reset password"], button[type="submit"]').first(),
    ai: 'the Reset password button',
  });
}

// ---------------------------------------------------------------------------
// Admin order editor + refund (legacy post.php)
// ---------------------------------------------------------------------------

/** Open an order in the legacy post.php editor. */
export async function openAdminOrder(adminPage: Page, postId: string): Promise<void> {
  await adminPage.goto(`wp-admin/post.php?post=${postId}&action=edit`, { waitUntil: 'load' });
}

/** Read the admin order status (select value, e.g. "wc-processing" → "processing"). */
export async function readAdminOrderStatus(adminPage: Page): Promise<string> {
  const val = await adminPage.locator('#order_status').inputValue().catch(() => '');
  return val.replace(/^wc-/, '');
}

/** Read all admin order-note contents (newest-first as rendered). */
export async function readOrderNotes(adminPage: Page): Promise<string[]> {
  return adminPage
    .locator('#woocommerce-order-notes li .note_content, ul.order_notes li .note_content')
    .allInnerTexts()
    .catch(() => []);
}

/**
 * Perform a full refund from the admin order editor. Opens the refund form, copies
 * each line item's ordered qty into `input.refund_order_item_qty` (WC recomputes
 * the line totals on `change`), polls the computed `#refund_amount` > 0, then clicks
 * the gateway API-refund button (PayPal PPCP) — falling back to the manual-refund
 * button for gateways without API refund (Auth.Net AIM). Accepts the native confirm.
 * Note text + resulting status are gateway-specific — assert them from config.
 */
export async function performRefund(
  adminPage: Page,
  opts: { reason?: string; preferApi?: boolean } = {}
): Promise<void> {
  const { reason = 'Testing Refund', preferApi = true } = opts;
  const ctx = ctxFor(adminPage);
  await resilientClick(ctx, {
    primary: adminPage.locator('button.refund-items'),
    alt: adminPage.getByRole('button', { name: /^refund$/i }),
    ai: 'the Refund button in the admin order editor',
  });
  await adminPage.locator('input.refund_order_item_qty').first().waitFor({ state: 'visible', timeout: 10_000 });

  // Copy ordered qty → refund qty (bubbling change so WC recomputes line totals),
  // and set the refund reason.
  await adminPage.evaluate((refundReason) => {
    const qtyViews = document.querySelectorAll('#order_line_items > tr > td.quantity > div.view');
    const qtys = Array.from(qtyViews).map((el) => {
      const m = (el.textContent ?? '').trim().match(/\d+/);
      return m ? parseInt(m[0], 10) : 1;
    });
    document.querySelectorAll<HTMLInputElement>('input.refund_order_item_qty').forEach((input, i) => {
      input.value = String(qtys[i] ?? 1);
      input.dispatchEvent(new Event('change', { bubbles: true }));
    });
    const reasonInput = document.querySelector<HTMLInputElement>('#refund_reason');
    if (reasonInput) reasonInput.value = refundReason;
  }, reason);

  // Poll the computed refund amount > 0 before submitting — a silent $0 refund
  // leaves no gateway note and makes the assertion fail on a missing note (rule 27).
  await adminPage
    .locator('#refund_amount')
    .evaluate((el) => {
      return new Promise<void>((resolve, reject) => {
        const check = () => (parseFloat((el as HTMLInputElement).value || '0') > 0 ? resolve() : null);
        check();
        const id = setInterval(() => { if (parseFloat((el as HTMLInputElement).value || '0') > 0) { clearInterval(id); resolve(); } }, 300);
        setTimeout(() => { clearInterval(id); reject(new Error('refund amount stayed $0')); }, 10_000);
      });
    })
    .catch(() => {});

  // The refund button triggers a native confirm() — accept it.
  adminPage.once('dialog', (d) => d.accept().catch(() => {}));

  const apiBtn = adminPage.locator('button.do-api-refund');
  const manualBtn = adminPage.locator('button.do-manual-refund');
  const useApi = preferApi && (await apiBtn.count()) > 0;
  await resilientClick(ctx, {
    primary: useApi ? apiBtn : manualBtn,
    alt: useApi ? manualBtn : apiBtn,
    ai: useApi ? 'the gateway refund button' : 'the manual refund button',
  });
  // The order editor reloads / updates the totals + notes after the refund lands.
  await adminPage.waitForLoadState('load').catch(() => {});
}
