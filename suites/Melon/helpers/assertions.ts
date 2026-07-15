// All expect() calls live here (rule 6). Specs call these; they never inline expect().
// Every expect carries a behaviour-phrased message with dynamic data (rule 19).
import { expect, type Page } from '@playwright/test';
import type { RegionConfig, CountrySwitch, CartResult, CheckoutTotals } from '../types/test-config';
import { getSelectedCountryCode, getSelectedCurrency, money, SELECTORS } from './melon';
import { ctxFor, resilientText } from './resilient';

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
export async function assertProductPage(page: Page, product: { title: string }): Promise<void> {
  const title = await resilientText(ctxFor(page), {
    primary: page.locator(SELECTORS.productTitle),
    ai: 'the product title heading',
  });
  expect(title, `product page title should be "${product.title}"`).toContain(product.title);

  const price = await resilientText(ctxFor(page), {
    primary: page.locator(SELECTORS.productPrice).filter({ visible: true }),
    ai: 'the product price',
  });
  expect(price, `product "${product.title}" should show a price`).toContain('£');

  const addToCart = await resilientText(ctxFor(page), {
    primary: page.locator(SELECTORS.addToCart),
    ai: 'the add-to-cart button',
  });
  expect(addToCart.toLowerCase(), `product "${product.title}" should have an add-to-cart button`).toContain('add');
}
