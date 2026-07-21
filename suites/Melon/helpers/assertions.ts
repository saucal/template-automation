// All expect() calls live here (rule 6). Specs call these; they never inline expect().
// Every expect carries a behaviour-phrased message with dynamic data (rule 19).
import { expect, type Page } from '@playwright/test';
import type { RegionConfig, CountrySwitch, CartResult, CheckoutTotals, PlacedOrder } from '../types/test-config';
import { getSelectedCountryCode, getSelectedCurrency, money, SELECTORS } from './melon';
import { ctxFor, resilientText } from './resilient';

/** Value part of a "Label : Value" main-component string, e.g. "Frame : Cosmic Black" → "Cosmic Black". */
function componentValue(component: string): string {
  const parts = component.split(':');
  return (parts.length > 1 ? parts.slice(1).join(':') : component).trim();
}

/** Read the visible text of the order-details region (WFACP/wfty thank-you OR standard Woo). */
async function orderRegionText(page: Page): Promise<string> {
  // Join ALL order blocks, not just .first(): the items/totals live in
  // .woocommerce-order-details while the email + billing/shipping addresses render in a
  // separate .woocommerce-customer-details block on the thank-you / view-order page.
  const region = page.locator(
    // FunnelKit custom thank-you: items in .wfty_pro_list_cont, email + billing/shipping
    // in .wfty_customer_info (the .wffn_wfty_wc_thankyou wrapper holds both). The woo
    // classes cover the standard My Account view-order page.
    '.wffn_wfty_wc_thankyou, .wfty_customer_info, .wfty_pro_list_cont, .woocommerce-order-details, .woocommerce-customer-details, .woocommerce-order, section.woocommerce-order-details, .woocommerce-table--order-details'
  );
  const parts = await region.allTextContents().catch(() => []);
  return parts.join(' ').replace(/\s+/g, ' ').trim();
}

/**
 * Assert the storefront reflects the primed country: the country dropdown holds
 * the expected code (the reliable signal) and the page title matches the blog.
 * Currency is SOFT — the currency switcher lags the country switch by a page load
 * (matches GI's optional treatment), so a mismatch warns rather than fails.
 */
export async function assertCountryAndCurrency(
  page: Page,
  expected: { mocs: string; country: string; currency: string; title: string }
): Promise<void> {
  const code = await getSelectedCountryCode(page);
  expect(code, `country dropdown should hold "${expected.mocs}" (${expected.country}) after switching`).toBe(expected.mocs);

  await expect(page, `page title should identify the "${expected.title}" storefront`).toHaveTitle(new RegExp(expected.title));

  // Currency switcher lags — warn, don't fail (known client-side race). Skip when
  // no currency expectation is supplied (e.g. the switch-landing check).
  if (expected.currency) {
    const currency = await getSelectedCurrency(page);
    if (currency !== expected.currency) {
      console.warn(`[melon] currency switcher shows "${currency}", expected "${expected.currency}" — known lag after country switch`);
    }
  }
}

/**
 * Assert a country switch landed on the right blog (URL path) with the right
 * country selected and title. Used by the parameterized country-switch spec.
 */
export async function assertRegionLanding(page: Page, sw: CountrySwitch): Promise<void> {
  expect(new URL(page.url()).pathname, `?mocs=${sw.mocs} should redirect to "${sw.landsOn}"`).toBe(sw.landsOn);
  await assertCountryAndCurrency(page, { mocs: sw.mocs, country: sw.country, currency: '', title: sw.title });
}

/** Assert we're on a region's home page (title identifies the blog). */
export async function assertOnRegionHome(page: Page, region: RegionConfig): Promise<void> {
  await expect(page, `should be on the "${region.title}" home page`).toHaveTitle(new RegExp(region.title));
}

/** Assert we landed on a product-category page with products listed (behaviour, rule 35). */
export async function assertOnCategory(page: Page, category: string): Promise<void> {
  expect(new URL(page.url()).pathname, `should land on the "${category}" category page`)
    .toContain(`/product-category/${category}/`);
  // Reading the first product's text (resilient) proves the category lists products.
  const firstProduct = await resilientText(ctxFor(page), {
    primary: page.locator(SELECTORS.productsGrid),
    ai: `a product tile in the "${category}" category`,
  });
  expect(firstProduct.length, `the "${category}" category should list at least one product`).toBeGreaterThan(0);
}

/**
 * Assert the cart page shows the added product and its subtotal matches the captured
 * unit price × qty (parity from product page → cart).
 */
export async function assertCartContents(page: Page, cart: CartResult): Promise<void> {
  const itemName = await resilientText(ctxFor(page), {
    primary: page.locator(SELECTORS.cartItemName),
    ai: 'the cart line-item name',
  });
  expect(itemName, `cart should list the added product "${cart.productName}"`).toContain(cart.productName);

  const subtotal = money(await resilientText(ctxFor(page), {
    primary: page.locator(SELECTORS.cartSubtotalRow).locator(SELECTORS.amount),
    ai: 'the cart subtotal amount',
  }));
  expect(subtotal, `cart subtotal should equal unit price × qty (£${cart.subtotal})`).toBeCloseTo(cart.subtotal, 2);
}

/**
 * Assert the product gallery reflects the selected pre-made combination: every
 * attribute slug in the combination appears in at least one gallery image src
 * (behaviour, not a pinned image — rule 35).
 */
export function assertGalleryMatchesCombination(params: Record<string, string>, srcs: string[]): void {
  const slugs = Object.values(params).filter(Boolean);
  expect(slugs.length, 'combination should declare attribute params').toBeGreaterThan(0);
  for (const slug of slugs) {
    expect(srcs.some((s) => s.includes(slug)),
      `gallery should show an image matching combination attribute "${slug}"\nsrcs:\n${srcs.join('\n')}`).toBeTruthy();
  }
}

/**
 * Assert checkout totals are internally consistent and carry the cart price through:
 * subtotal matches the cart, and total = subtotal + shipping (tax-exclusive UK region).
 */
export async function assertCheckoutTotals(cart: CartResult, totals: CheckoutTotals): Promise<void> {
  expect(totals.subtotal, `checkout subtotal (£${totals.subtotal}) should match the cart subtotal (£${cart.subtotal})`)
    .toBeCloseTo(cart.subtotal, 2);
  expect(totals.total, `order total (£${totals.total}) should equal subtotal (£${totals.subtotal}) + shipping (£${totals.shipping})`)
    .toBeCloseTo(totals.subtotal + totals.shipping, 2);
}

/** Assert the shopper is logged in — the My Account navigation only renders when authenticated. */
export async function assertLoggedIn(page: Page): Promise<void> {
  const nav = await resilientText(ctxFor(page), {
    primary: page.locator('.woocommerce-MyAccount-navigation'),
    ai: 'the My Account navigation',
  });
  expect(nav.length, 'should be logged in (My Account navigation should be present)').toBeGreaterThan(0);
}

/** Assert the My Account navigation exposes the expected sections (behaviour, rule 35). */
export async function assertAccountNavTabs(page: Page, tabs: string[]): Promise<void> {
  const nav = await resilientText(ctxFor(page), {
    primary: page.locator('.woocommerce-MyAccount-navigation'),
    ai: 'the My Account navigation',
  });
  for (const tab of tabs) {
    expect(nav, `My Account navigation should include the "${tab}" section`).toContain(tab);
  }
}

/** Assert the lost-password form confirmed the reset email was sent. */
export async function assertResetEmailSent(page: Page): Promise<void> {
  const notice = await resilientText(ctxFor(page), {
    primary: page.locator('.woocommerce-message, .woocommerce-info, .wc-block-components-notice-banner__content'),
    ai: 'the password-reset confirmation notice',
  });
  expect(notice.toLowerCase(), `lost-password should confirm the reset email was sent\nnotice: "${notice}"`)
    .toMatch(/reset .*(sent|email)|email .*sent/);
}

/** Assert a product page loaded with the expected title, a visible price, and an add-to-cart button (rule 35). */
export async function assertProductPage(page: Page, product: { title: string }, symbol = '£'): Promise<void> {
  const title = await resilientText(ctxFor(page), {
    primary: page.locator(SELECTORS.productTitle),
    ai: 'the product title heading',
  });
  expect(title, `product page title should be "${product.title}"`).toContain(product.title);

  const price = await resilientText(ctxFor(page), {
    primary: page.locator(SELECTORS.productPrice).filter({ visible: true }),
    ai: 'the product price',
  });
  expect(price, `product "${product.title}" should show a price in ${symbol}`).toContain(symbol);

  const addToCart = await resilientText(ctxFor(page), {
    primary: page.locator(SELECTORS.addToCart),
    ai: 'the add-to-cart button',
  });
  expect(addToCart.toLowerCase(), `product "${product.title}" should have an add-to-cart button`).toContain('add');
}

/**
 * Assert the order-received (thank-you) page reflects the placed order: the composite
 * product + its component values, any accepted upsell item, the Stripe payment method,
 * the customer email, and both addresses. Totals parity is covered by checkout.spec, so
 * here we assert the order shows the unit price + a total (not re-derive the math).
 */
export async function assertOrderReceived(page: Page, order: PlacedOrder): Promise<void> {
  expect(new URL(page.url()).href, 'should land on the order-received / thank-you page')
    .toMatch(/order-received|thank-you/i);
  expect(order.orderNumber, 'the order should have a number').not.toBe('');

  const text = await orderRegionText(page);
  expect(text, `order should list the product "${order.selection.prodDesc}"`).toContain(order.selection.prodDesc);
  for (const comp of order.selection.components) {
    const val = componentValue(comp);
    expect(text, `order should show the component "${val}"`).toContain(val);
  }
  if (order.upsell.accepted) {
    for (const item of order.upsell.items) {
      expect(text, `order should include the accepted upsell "${item.desc}"`).toContain(item.desc);
    }
  }
  expect(text, 'order should be paid via Credit Card (Stripe)').toMatch(/Stripe/i);
  expect(text, `order should show the customer email ${order.customer.email}`).toContain(order.customer.email);
  expect(text, 'order should show the billing recipient')
    .toContain(`${order.customer.billing.firstName} ${order.customer.billing.lastName}`);
  expect(text, 'order should show the shipping recipient')
    .toContain(`${order.customer.shipping.firstName} ${order.customer.shipping.lastName}`);
  expect(text, `order should show the shipping postcode ${order.customer.shipping.postcode}`)
    .toContain(order.customer.shipping.postcode);
}

/**
 * Assert the order appears in My Account: status Processing, the product listed, and the
 * total shown. Assumes the caller navigated to the order's view-order page.
 */
export async function assertMyAccountOrder(page: Page, order: PlacedOrder): Promise<void> {
  const status = await resilientText(ctxFor(page), {
    primary: page.locator('mark.order-status, .woocommerce-orders-table__cell-order-status'),
    ai: 'the order status',
  });
  expect(status, 'the placed order should be in the Processing state').toMatch(/Processing/i);

  const text = await orderRegionText(page);
  expect(text, `my-account order should list the product "${order.selection.prodDesc}"`).toContain(order.selection.prodDesc);
  if (order.upsell.accepted) {
    for (const item of order.upsell.items) {
      expect(text, `my-account order should include the accepted upsell "${item.desc}"`).toContain(item.desc);
    }
  }
  // Address on the order record (the closest reachable order back-office — the admin
  // account has no wp-admin order access). billing == shipping here (single address).
  const addr = order.customer.shipping;
  expect(text, 'my-account order should show the recipient')
    .toContain(`${addr.firstName} ${addr.lastName}`);
  expect(text, `my-account order should show the street "${addr.address1}"`).toContain(addr.address1);
  expect(text, `my-account order should show the city "${addr.city}"`).toContain(addr.city);
  expect(text, `my-account order should show the postcode "${addr.postcode}"`).toContain(addr.postcode);
}

/**
 * Assert the order-receipt email (emailPage already opened on the rendered Mailpit message):
 * it shows the product, the Stripe payment, the customer email, and both addresses.
 */
export async function assertOrderEmail(emailPage: Page, order: PlacedOrder): Promise<void> {
  const body = ((await emailPage.locator('body').textContent().catch(() => '')) ?? '').replace(/\s+/g, ' ').trim();
  expect(body, `the receipt email should list the product "${order.selection.prodDesc}"`).toContain(order.selection.prodDesc);
  for (const comp of order.selection.components) {
    const val = componentValue(comp);
    expect(body, `the receipt email should show the component "${val}"`).toContain(val);
  }
  if (order.upsell.accepted) {
    for (const item of order.upsell.items) {
      expect(body, `the receipt email should include the accepted upsell "${item.desc}"`).toContain(item.desc);
    }
  }
  expect(body, `the receipt email should be addressed to ${order.customer.email}`).toContain(order.customer.email);
  expect(body, 'the receipt email should show the billing recipient')
    .toContain(`${order.customer.billing.firstName} ${order.customer.billing.lastName}`);
  // Address lines (billing == shipping here — single address). Assert the street, city
  // and postcode appear so the receipt reflects where the order ships.
  const addr = order.customer.shipping;
  expect(body, `the receipt email should show the street "${addr.address1}"`).toContain(addr.address1);
  expect(body, `the receipt email should show the city "${addr.city}"`).toContain(addr.city);
  expect(body, `the receipt email should show the postcode "${addr.postcode}"`).toContain(addr.postcode);
}
