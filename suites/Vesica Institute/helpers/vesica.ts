// Vesica site helper — all Vesica-specific DOM. Mirrors the GI "Vesica - Basic
// WooCommerce Tests - User" flow (the source of truth): pick the FIRST product from
// a category, capture PDP name+price, validation-first checkout, Auth.Net (test-
// prefilled card) / PayPal PPCP payment, full order-received capture, membership,
// the CC→account→set-password→login chain, and the admin full refund (incl shipping).
//
// Consumed by helpers/flows.ts + helpers/assertions.ts. NO expect() here. Navigate via
// customer clicks (rule 30); allowed goto: home priming, `?add-to-cart` (unused now),
// admin/email. Selectors verified live 2026-07-13 (docs/site-exploration.md) and
// cross-checked against generated/specs/vesica-basic-woocommerce-tests-user.spec.ts.
import { type Page } from '@playwright/test';
import { ctxFor, resilientClick } from './resilient';
import type { BrandConfig, BillingAddress, OrderConfig, OrderResult, CapturedTotals } from '../types/test-config';

// ---------------------------------------------------------------------------
// Brand config + constants (this branch = Vesica only)
// ---------------------------------------------------------------------------

export const brandConfig: BrandConfig = {
  product: { slug: 'first-in-all-products', type: 'simple' },
  hasPayPal: true,
  hasRegister: true,
  refundNotePattern: /refund/i,
  refundedStatus: 'Refunded',
};

/** CC (membership) order picks the first product here; PayPal picks from the physical category. */
export const ALL_PRODUCTS_CATEGORY = 'product-category/all-products/';
export const PHYSICAL_CATEGORY = 'product-category/vesica-shop/biogeometry/biogeometry-tools-for-the-public/';

export const ORDER_DETAILS_TABLE =
  'table.woocommerce-table--order-details, table.shop_table.order_details';

/** Billing address — matches the GI `vars` bag (Miami FL). Email filled per-run by caller. */
export const BILLING: Omit<BillingAddress, 'email'> = {
  firstName: 'QA',
  lastName: `qa${Math.random().toString(36).slice(2, 8)}`,
  company: 'Testing Inc.',
  address: '1000 Nw 42nd Ave',
  address2: 'Ap. 4',
  city: 'Miami',
  state: 'Florida',
  shortState: 'FL',
  zip: '33126-3645',
  country: 'United States (US)',
  shortCountry: 'US',
  phone: '4089211861',
};

// ---------------------------------------------------------------------------
// Utils
// ---------------------------------------------------------------------------

export function toAmount(text: string | null | undefined): number {
  return parseFloat((text ?? '').replace(/[^0-9.-]/g, ''));
}

/** Normalise product name the way GI does (curly quotes → straight, en-dash → hyphen). */
export function normalizeProductName(s: string): string {
  return (s ?? '').replace(/[“”]/g, '"').replaceAll('–', '-').trim();
}

export function orderEmail(prefix = 'order'): string {
  return `qa+gi_${prefix}_${Math.random().toString(36).slice(2, 10)}@saucal.com`;
}

// ---------------------------------------------------------------------------
// Popups / readiness
// ---------------------------------------------------------------------------

/** Dismiss the CookieYes consent banner if present (GI clicks "Reject All"). */
export async function dismissCookieBanner(page: Page): Promise<void> {
  const btn = page
    .locator('.cky-notice-btn-wrapper > button.cky-btn-reject, button[aria-label="Reject All"]')
    .or(page.getByRole('button', { name: /reject all|accept all|got it/i }))
    .first();
  if (await btn.isVisible({ timeout: 1_500 }).catch(() => false)) {
    await btn.click({ force: true, timeout: 3_000 }).catch(() => {});
  }
}

/** Wait for the checkout to settle: WC `.blockUI` overlay gone + the form present. */
export async function waitForCheckoutReady(page: Page, timeout = 30_000): Promise<void> {
  await page.locator('form.checkout, #order_review').first().waitFor({ state: 'visible', timeout }).catch(() => {});
  await page.locator('.blockUI.blockOverlay').first().waitFor({ state: 'hidden', timeout }).catch(() => {});
}

// ---------------------------------------------------------------------------
// Product selection (GI: category → first in-stock product tile → PDP capture)
// ---------------------------------------------------------------------------

export interface PdpCapture {
  productName: string;
  unitPrice: string;
}

/** Navigate a category and open the FIRST in-stock product; capture name + unit price. */
export async function pickFirstProduct(page: Page, categoryPath: string): Promise<PdpCapture> {
  await page.goto(categoryPath, { waitUntil: 'load' });
  await dismissCookieBanner(page);
  const ctx = ctxFor(page);
  await resilientClick(ctx, {
    primary: page.locator('li.product.instock a h2.woocommerce-loop-product__title').first(),
    alt: page.locator('ul.products li.product a.woocommerce-loop-product__link, ul.products li.product a').first(),
    ai: 'the first in-stock product in the listing',
  });
  await page.locator('h1.product_title').first().waitFor({ state: 'visible', timeout: 20_000 });
  const productName = normalizeProductName((await page.locator('h1.product_title').first().textContent()) ?? '');
  const unitPrice = (
    (await page.locator('.elementor-widget-container > .price .woocommerce-Price-amount.amount > bdi, p.price .woocommerce-Price-amount.amount > bdi')
      .first()
      .textContent()) ?? ''
  ).trim();
  return { productName, unitPrice };
}

/** Click "Add to cart" on the current PDP. Lands on the cart page. */
export async function addToCartFromPdp(page: Page): Promise<void> {
  await resilientClick(ctxFor(page), {
    primary: page.getByRole('button', { name: /add to cart/i }),
    alt: page.locator('button[name="add-to-cart"], .single_add_to_cart_button').first(),
    ai: 'the Add to cart button',
  });
  await page.waitForLoadState('load').catch(() => {});
}

/** Read the cart-page line values for parity (product name + the four price cells). */
export async function readCartLine(page: Page): Promise<{ name: string; price: string; subtotal: string; cartSubtotal: string; total: string }> {
  const txt = async (sel: string) => ((await page.locator(sel).first().textContent().catch(() => '')) ?? '').trim();
  return {
    name: await txt('.product-name > a'),
    price: await txt('td.product-price .woocommerce-Price-amount.amount > bdi'),
    subtotal: await txt('td.product-subtotal .woocommerce-Price-amount.amount > bdi'),
    cartSubtotal: await txt('tr.cart-subtotal .woocommerce-Price-amount.amount > bdi'),
    total: await txt('.cart_totals strong .woocommerce-Price-amount.amount > bdi'),
  };
}

// ---------------------------------------------------------------------------
// Cart / checkout navigation (rule 30 — customer click paths)
// ---------------------------------------------------------------------------

export async function goToCart(page: Page): Promise<void> {
  await resilientClick(ctxFor(page), {
    primary: page.getByRole('link', { name: /cart/i }).first(),
    alt: page.locator('a[href$="/cart/"], a[href*="/cart/"]').first(),
    ai: 'the header cart link',
  });
  await page.waitForURL('**/cart/**', { timeout: 20_000 }).catch(() => {});
}

export async function proceedToCheckout(page: Page): Promise<void> {
  await resilientClick(ctxFor(page), {
    primary: page.getByRole('link', { name: /proceed to checkout/i }),
    alt: page.locator('a.checkout-button, a[href*="/checkout/"]').first(),
    ai: 'the Proceed to checkout button',
  });
  await page.waitForURL('**/checkout/**', { timeout: 20_000 }).catch(() => {});
  await waitForCheckoutReady(page);
}

// ---------------------------------------------------------------------------
// Checkout: validation-first, billing, payment
// ---------------------------------------------------------------------------

/** GI validation-first: click Place order on an EMPTY form, return the error notice text. */
export async function submitEmptyCheckoutForErrors(page: Page): Promise<string> {
  await placeOrder(page);
  const err = page.locator('.woocommerce-error').first();
  await err.waitFor({ state: 'visible', timeout: 15_000 }).catch(() => {});
  return ((await err.textContent().catch(() => '')) ?? '').trim();
}

/** Fill the classic checkout billing fields (select2 country/state via native value+change). */
export async function fillCheckoutAddress(page: Page, billing: BillingAddress): Promise<void> {
  await waitForCheckoutReady(page);
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
  await setSelect(page, '#billing_country', billing.shortCountry ?? billing.country);
  await waitForCheckoutReady(page);
  await setSelect(page, '#billing_state', billing.shortState ?? billing.state);
  await waitForCheckoutReady(page);

  // AvaTax "Validate address" button (optional; present when the plugin renders it).
  const validate = page.locator('button.wc_avatax_validate_address.button');
  if (await validate.isVisible({ timeout: 1_500 }).catch(() => false)) {
    await validate.click({ force: true }).catch(() => {});
    await waitForCheckoutReady(page);
  }
}

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

/** Capture the checkout review totals (before paying) — the parity anchor for PayPal. */
export async function captureCheckoutTotals(page: Page): Promise<CapturedTotals> {
  return readTotals(page, 'table.woocommerce-checkout-review-order-table, table.shop_table');
}

export async function selectCreditCard(page: Page): Promise<void> {
  const radio = page.locator('#payment_method_authorize_net_aim_emulation');
  if (!(await radio.isChecked().catch(() => false))) {
    await resilientClick(ctxFor(page), {
      primary: page.locator('label[for="payment_method_authorize_net_aim_emulation"]'),
      ai: 'the Credit Card payment method option',
    });
  }
  await waitForCheckoutReady(page);
}

export async function selectPayPal(page: Page): Promise<void> {
  await resilientClick(ctxFor(page), {
    primary: page.locator('label[for="payment_method_ppcp-gateway"]'),
    alt: page.locator('#payment_method_ppcp-gateway').first(),
    ai: 'the PayPal payment method option',
  });
  await waitForCheckoutReady(page);
}

/** Auth.Net place-order: card is test-prefilled — select CC, accept terms, place. */
export async function placeOrderAuthNet(page: Page): Promise<void> {
  await selectCreditCard(page);
  await acceptTerms(page);
  await placeOrder(page);
  await page.waitForURL('**/order-received/**', { timeout: 60_000 });
}

export async function acceptTerms(page: Page): Promise<void> {
  const terms = page.locator('#terms').first();
  if ((await terms.count()) > 0 && !(await terms.isChecked().catch(() => false))) {
    await terms.check().catch(async () => {
      await page.locator('label[for="terms"]').click({ force: true }).catch(() => {});
    });
  }
}

export async function placeOrder(page: Page): Promise<void> {
  await waitForCheckoutReady(page);
  await page.locator('#place_order:not([disabled])').first().waitFor({ state: 'visible', timeout: 15_000 }).catch(() => {});
  await resilientClick(ctxFor(page), {
    primary: page.locator('#place_order').filter({ visible: true }),
    alt: page.getByRole('button', { name: /place order/i }),
    ai: 'the Place order button',
  });
}

/**
 * PayPal PPCP: select PayPal, click the "Pay with PayPal" Smart Button (cross-origin
 * SDK iframe), drive the sandbox popup login (email → Next → password → Log In → the
 * review "Pay" CTA #one-time-cta). Ported from No Pong; sandbox screens vary so it's
 * a resilient loop. Assumes terms already accepted by the caller.
 */
export async function payPayPal(page: Page): Promise<void> {
  await selectPayPal(page);
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
  const emailField = flow.getByRole('textbox', { name: /email or mobile/i })
    .or(flow.locator('#email, input[name="login_email"], input[type="email"]')).first();
  const passField = flow.getByRole('textbox', { name: /^password$/i })
    .or(flow.locator('#password, input[name="login_password"], input[type="password"]')).first();
  const nextBtn = flow.getByRole('button', { name: /^next$/i }).first();
  const loginBtn = flow.getByRole('button', { name: /log\s?in|^login$/i }).first();
  const approveBtn = flow.getByRole('button', { name: 'Pay', exact: true })
    .or(flow.locator('#one-time-cta, button:has-text("Pay Now"), button:has-text("Complete Purchase"), [data-testid="submit-button-initial"]')).first();
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
      if (!(await clickIfVisible(loginBtn))) await clickIfVisible(approveBtn);
    }
    await page.waitForTimeout(2_000);
  }
  await page.waitForURL('**/order-received/**', { timeout: 60_000 });
}

// ---------------------------------------------------------------------------
// Order-received capture (the capture-once parity source)
// ---------------------------------------------------------------------------

/** Read totals from an order-details/checkout-review table by row semantics. */
export async function readTotals(page: Page, tableSelector: string): Promise<CapturedTotals> {
  return page.evaluate((sel) => {
    const norm = (s: string | null | undefined) => (s ?? '').replace(/\s+/g, ' ').trim();
    const tables = [...document.querySelectorAll(sel)].filter((t) => /subtotal/i.test(t.textContent ?? ''));
    const out: { subtotal: string; shipping: string; tax: string; total: string } = { subtotal: '', shipping: '', tax: '', total: '' };
    for (const t of tables) {
      for (const r of Array.from(t.querySelectorAll('tr'))) {
        const head = norm(r.querySelector('th, td')?.textContent).toLowerCase().replace(':', '').trim();
        const priceEl = Array.from(r.querySelectorAll('td:last-child .woocommerce-Price-amount')).find((el) => !el.closest('.includes_tax'));
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

/** Full order-received capture into an OrderResult (the parity source). */
export async function readOrderReceived(page: Page, config: OrderConfig): Promise<OrderResult> {
  await page.waitForURL('**/order-received/**', { timeout: 30_000 });
  await page.waitForLoadState('load');

  const txt = async (sel: string) => ((await page.locator(sel).first().textContent().catch(() => '')) ?? '').trim();
  const orderNumber = (await txt('li.woocommerce-order-overview__order.order > strong')).replace(/[^0-9]/g, '');
  const postId = page.url().match(/order-received\/(\d+)/)?.[1] ?? orderNumber;
  const paymentLabel = await txt('li.woocommerce-order-overview__payment-method.method > strong');
  const productName = normalizeProductName(await txt('td.product-name a[href*="/product/"], td.woocommerce-table__product-name a'));
  const totals = await readTotals(page, ORDER_DETAILS_TABLE);

  const blocks = page.locator('.woocommerce-customer-details address');
  const n = await blocks.count().catch(() => 0);
  const billingBlock = n > 0 ? ((await blocks.nth(0).innerText().catch(() => '')) ?? '').trim() : '';
  const shippingBlock = n > 1 ? ((await blocks.nth(1).innerText().catch(() => '')) ?? '').trim() : undefined;

  return {
    orderNumber,
    postId,
    billingEmail: config.accountEmail ?? '',
    productName,
    unitPrice: totals.subtotal || totals.total,
    paymentLabel,
    totals,
    billingBlock,
    shippingBlock,
  };
}

// ---------------------------------------------------------------------------
// Account: login / passwordless set-password chain / membership
// ---------------------------------------------------------------------------

/** Log a shopper in at /my-account/ (polls for the account nav as the success signal). */
export async function loginShopper(page: Page, email: string, password: string): Promise<void> {
  await page.goto('my-account/', { waitUntil: 'load' });
  await dismissCookieBanner(page);
  if (await page.locator('.woocommerce-MyAccount-navigation').isVisible({ timeout: 2_000 }).catch(() => false)) return;
  await page.locator('#username').fill(email);
  await page.locator('#password').fill(password);
  await resilientClick(ctxFor(page), {
    primary: page.getByRole('button', { name: /log in/i }),
    alt: page.locator('button[name="login"]'),
    ai: 'the account Log in button',
  });
  await page.locator('.woocommerce-MyAccount-navigation').waitFor({ state: 'visible', timeout: 20_000 });
}

/** Set a new password on the reset/set-password page (#password_1/#password_2). */
export async function setNewPassword(page: Page, newPassword: string): Promise<void> {
  await page.locator('#password_1').waitFor({ state: 'visible', timeout: 20_000 });
  await page.locator('#password_1').fill(newPassword);
  await page.locator('#password_2').fill(newPassword);
  await resilientClick(ctxFor(page), {
    primary: page.getByRole('button', { name: /save|reset password|set password/i }),
    alt: page.locator('button[type="submit"]').first(),
    ai: 'the Save / Set password button',
  });
  await page.waitForLoadState('load').catch(() => {});
}

export async function requestPasswordReset(page: Page, email: string): Promise<void> {
  await page.goto('my-account/lost-password/', { waitUntil: 'load' });
  await dismissCookieBanner(page);
  await page.locator('#user_login').fill(email);
  await resilientClick(ctxFor(page), {
    primary: page.getByRole('button', { name: /reset password|get new password/i }),
    alt: page.locator('button[type="submit"]').first(),
    ai: 'the Reset password button',
  });
}

/** Navigate My Account → Orders (via the account menu). */
export async function goToMyAccountOrders(page: Page): Promise<void> {
  await page.goto('my-account/orders/', { waitUntil: 'load' });
  await dismissCookieBanner(page);
}

/** Open a specific order from the My Account view-order page. */
export async function goToViewOrder(page: Page, orderNumber: string): Promise<void> {
  await page.goto(`my-account/view-order/${orderNumber}/`, { waitUntil: 'load' });
  await dismissCookieBanner(page);
}

// ---------------------------------------------------------------------------
// Admin order editor + full refund (legacy post.php)
// ---------------------------------------------------------------------------

export async function openAdminOrder(adminPage: Page, postId: string): Promise<void> {
  await adminPage.goto(`wp-admin/post.php?post=${postId}&action=edit`, { waitUntil: 'load' });
}

export async function readAdminOrderStatus(adminPage: Page): Promise<string> {
  const container = adminPage.locator('#select2-order_status-container');
  if (await container.count().catch(() => 0)) {
    return ((await container.first().textContent().catch(() => '')) ?? '').trim();
  }
  const val = await adminPage.locator('#order_status').inputValue().catch(() => '');
  return val.replace(/^wc-/, '');
}

export async function readOrderNotes(adminPage: Page): Promise<string[]> {
  return adminPage
    .locator('#woocommerce-order-notes li .note_content, ul.order_notes li .note_content')
    .allInnerTexts()
    .catch(() => []);
}

/**
 * Full refund from the admin editor (GI test 02 refund). Opens the refund form, copies
 * each line item's ordered qty → refund qty (bubbling change), optionally copies the
 * shipping line total + shipping tax columns (full refund incl shipping), sets the
 * reason, clicks the gateway API-refund button (PayPal PPCP), accepts the native
 * confirm. Note text / resulting status are asserted from config.
 */
export async function performRefund(
  adminPage: Page,
  opts: { reason?: string; includeShipping?: boolean; preferApi?: boolean } = {}
): Promise<void> {
  const { reason = 'Testing Refund', includeShipping = false, preferApi = true } = opts;
  const ctx = ctxFor(adminPage);
  await resilientClick(ctx, {
    primary: adminPage.locator('button.refund-items'),
    alt: adminPage.getByRole('button', { name: /^refund$/i }),
    ai: 'the Refund button in the admin order editor',
  });
  await adminPage.locator('input.refund_order_item_qty').first().waitFor({ state: 'visible', timeout: 10_000 });

  // Copy ordered qty → refund qty (bubbling change so WC recomputes line totals).
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

  if (includeShipping) {
    // Copy the shipping line's cost + each shipping tax column into their refund inputs
    // (GI copies `.view` amount → `.refund > input.refund_line_total/…_tax`).
    await adminPage.evaluate(() => {
      const num = (el: Element | null) => (el?.textContent ?? '').replace(/[^0-9.-]/g, '');
      const shipRow = document.querySelector('tr.shipping');
      if (!shipRow) return;
      const cost = num(shipRow.querySelector('td.line_cost > .view .woocommerce-Price-amount.amount'));
      const costInput = shipRow.querySelector<HTMLInputElement>('td.line_cost .refund input.refund_line_total');
      if (costInput && cost) { costInput.value = cost; costInput.dispatchEvent(new Event('change', { bubbles: true })); }
      shipRow.querySelectorAll('td.line_tax').forEach((td) => {
        const amt = num(td.querySelector('.view .woocommerce-Price-amount.amount'));
        const inp = td.querySelector<HTMLInputElement>('.refund input.refund_line_tax');
        if (inp && amt) { inp.value = amt; inp.dispatchEvent(new Event('change', { bubbles: true })); }
      });
    });
  }

  // Poll computed refund amount > 0 before submitting (rule 27 — a $0 refund is a silent no-op).
  await adminPage.locator('#refund_amount').evaluate((el) => new Promise<void>((resolve, reject) => {
    const ok = () => parseFloat((el as HTMLInputElement).value || '0') > 0;
    if (ok()) return resolve();
    const id = setInterval(() => { if (ok()) { clearInterval(id); resolve(); } }, 300);
    setTimeout(() => { clearInterval(id); reject(new Error('refund amount stayed $0')); }, 10_000);
  })).catch(() => {});

  adminPage.once('dialog', (d) => d.accept().catch(() => {}));
  const apiBtn = adminPage.locator('button.do-api-refund');
  const manualBtn = adminPage.locator('button.do-manual-refund');
  const useApi = preferApi && (await apiBtn.count()) > 0;
  await resilientClick(ctx, {
    primary: useApi ? apiBtn : manualBtn,
    alt: useApi ? manualBtn : apiBtn,
    ai: useApi ? 'the gateway refund button' : 'the manual refund button',
  });
  await adminPage.waitForLoadState('load').catch(() => {});
}
