// Melon Optics site helper — selectors, region/country data, popup handling,
// country-switch navigation. DOM lives here; assertions live in assertions.ts;
// orchestration in flows.ts. Consumed by specs + assertions.
import { type Page, type Locator } from '@playwright/test';
import type { RegionConfig, RegionKey, CountrySwitch, CartResult, CheckoutTotals } from '../types/test-config';
import { ctxFor, resilientClick, resilientSelect, resilientText } from './resilient';

// Stable selectors (confirmed live 2026-07-13, see .playwright-cli/explore-uk.md).
export const SELECTORS = {
  countryDropdown: '#mo-country-dropdown', // 2× (mobile hidden + desktop visible) → filter visible
  currencySwitcher: '#currency_switcher',
  klaviyoClose: 'button.klaviyo-close-form',
  accountLink: 'a[href*="/my-account/"]',
  megaMenuLink: 'a.mega-menu-link', // Max Mega Menu top-level triggers (href="#"), flyout opens on hover
  categoryLink: 'a[href*="/product-category/"]', // flyout reveals these on hover (no ul.mega-sub-menu on this theme)
  productTitle: 'h1.product_title',
  productPrice: 'p.price .woocommerce-Price-amount.amount', // the VISIBLE price (div.composite_price is a hidden template)
  compositePrice: 'div.composite_price .woocommerce-Price-amount.amount', // composite total (hidden until configured)
  compositeAddToCart: 'button.composite_add_to_cart_button', // composite products (a full-page POST, not AJAX)
  addToCart: 'button[name="add-to-cart"]',
  productsGrid: 'ul.products li.product',
  premadeCombo: 'li.melon-best-seller-thumbnail', // redesigned product page pre-made combinations
  galleryImg: '.woocommerce-product-gallery__wrapper img',
  // Cart / checkout
  viewCartLink: '.woocommerce-message a.wc-forward[href*="/cart/"]', // scoped to the "added to cart" notice (a hidden header dup also matches a.wc-forward)
  cartProceed: 'a.checkout-button, .wc-proceed-to-checkout a', // cart page → checkout
  cartItemName: 'td.product-name',
  cartSubtotalRow: 'tr.cart-subtotal',
  cartTotalRow: 'tr.order-total',
  amount: '.woocommerce-Price-amount.amount',
  // WFACP renders TWO review tables — a HIDDEN AJAX-updated .wfacp_mini_cart_reviews
  // (data-time re-renders) + the VISIBLE order summary. Target totals rows generically
  // and filter visible so we read the shown values, not the hidden copy.
  wfacpSubtotalRow: 'tr.cart-subtotal',
  wfacpShippingRow: 'tr.shipping_total_fee, tr.shipping, tr.woocommerce-shipping-totals',
  wfacpTotalRow: 'tr.order-total',
} as const;

/** Parse a WooCommerce price string ("£1,234.50") to a number. NaN if none. */
export function money(text: string | null | undefined): number {
  const n = parseFloat((text || '').replace(/[^0-9.]/g, ''));
  return Number.isNaN(n) ? NaN : n;
}

/**
 * The composite product used by the cart/checkout tests. The preset attribute query
 * fully configures it (in stock, purchasable) so we skip GI's out-of-stock component
 * swapping. Add-to-cart is a full-page POST that reloads the product page.
 */
export const COMPOSITE_GOGGLE = {
  slug: 'diablo-mtb-goggles',
  title: 'Diablo Goggle (mtb)',
  presetQuery: 'pa_frame=cosmic-black&pa_lens=smoke&pa_outrigger-nosepiece=galaxy-matte&pa_strap=black-with-white-silicon',
} as const;

/** Products under test. Goggles = WooCommerce Composite; jester = redesigned product page. */
export const PRODUCTS = {
  goggles: { slug: 'diablo-mtb-goggles', title: 'Diablo Goggle (mtb)' },
  jester: { slug: 'jester-sunglasses', title: 'Jester Sunglasses' },
} as const;

/**
 * Mega-menu navigation targets (rules 11/35 — GI's zero-assertion nav smoke tests
 * become behaviour checks). `category` set → the trigger's flyout links through to
 * that product-category; unset → menu-open-only (e.g. Sunglasses).
 */
export interface MenuNav { name: string; trigger: string; category: string }
export const UK_MENU_NAVS: MenuNav[] = [
  { name: 'Accessories', trigger: 'Parts & Acc', category: 'accessories' },
  // GI's zero-assertion "Sunglasses Menu" (menu-open smoke) is folded — the mega-menu
  // open/hover is already exercised by the Accessories nav above (prompt: nav smoke → fold).
];

/**
 * Full-spec Melon storefronts. Melon is a path-based WP multisite on one host;
 * each blog is reached by priming `?mocs=<code>` (redirects to `path`). The mocs
 * query param wins over the persisted country cookie, so priming is deterministic
 * and needs no cookie reset. See melon-optics-geolocation/GeoLocationRedirect.php.
 */
export const REGIONS: Record<RegionKey, RegionConfig> = {
  uk: { key: 'uk', path: '', mocs: 'GB', title: 'Melon Optics', country: 'United Kingdom (UK)', currency: 'GBP', symbol: '£' },
  eu: { key: 'eu', path: 'eu/', mocs: 'DE', title: 'Melon Optics EU', country: 'Germany', currency: 'EUR', symbol: '€' },
};

/**
 * Country-switcher matrix for the UK-home "switch country" spec. Collapses GI's 6
 * near-duplicate "01 – Home Page – <region>" tests into one parameterized spec
 * (rules 11/35). CA/AU/INT stay on blog 1 (currency switch only); DE/US redirect
 * to another blog. Values confirmed live 2026-07-13.
 */
export const COUNTRY_SWITCHES: CountrySwitch[] = [
  { mocs: 'GB', country: 'United Kingdom (UK)', landsOn: '/', title: 'Melon Optics' },
  { mocs: 'CA', country: 'Canada', landsOn: '/', title: 'Melon Optics' },
  { mocs: 'AU', country: 'Australia', landsOn: '/', title: 'Melon Optics' },
  { mocs: 'INT', country: 'International', landsOn: '/', title: 'Melon Optics' },
  { mocs: 'DE', country: 'Germany', landsOn: '/eu/', title: 'Melon Optics EU' },
  { mocs: 'US', country: 'United States (US)', landsOn: '/us/', title: 'Melon Optics US' },
];

/**
 * The country / currency selects render TWICE (mobile + desktop). The mobile one
 * is hidden (offsetParent null); interaction must target the VISIBLE desktop one.
 */
export function countryDropdown(page: Page): Locator {
  return page.locator(SELECTORS.countryDropdown).filter({ visible: true }).first();
}
export function currencySwitcher(page: Page): Locator {
  return page.locator(SELECTORS.currencySwitcher).filter({ visible: true }).first();
}

/**
 * INITIAL landing on a region's home, priming the country via ?mocs= (rule 30
 * allows goto for the priming visit). Relative goto so the per-project baseURL
 * host wins (rule 12). Closes the Klaviyo popup after load.
 */
export async function primeRegion(page: Page, region: RegionConfig): Promise<void> {
  await page.goto(`${region.path}?mocs=${region.mocs}`);
  await page.waitForLoadState('load');
  await closePopup(page);
}

/**
 * Switch country the way a customer does (rule 30): select the code in the visible
 * #mo-country-dropdown, whose change handler submits #mo-country-dropdown-form and
 * reloads/redirects. No-op (no navigation) when the code is already selected.
 */
export async function switchCountry(page: Page, sw: CountrySwitch): Promise<void> {
  const dropdown = countryDropdown(page);
  const current = await dropdown.inputValue(); // form-value read (not text) — raw is fine
  if (current !== sw.mocs) {
    await Promise.all([
      page.waitForNavigation({ waitUntil: 'load', timeout: 20_000 }),
      resilientSelect(ctxFor(page), { primary: dropdown, ai: 'the country dropdown' }, sw.mocs),
    ]);
  }
  await closePopup(page);
}

/**
 * Dismiss the Klaviyo signup popup. It fires on a DELAY and re-shows after each page
 * load, covering content (add-to-cart, View cart, Proceed), so call this after every
 * navigation before clicking. Waits a bounded window for it to appear, then closes it;
 * silently proceeds if it never shows.
 */
export async function closePopup(page: Page): Promise<void> {
  // Real click of the Klaviyo popup's close button. It's delayed (~1.2s) and re-shows
  // per page, so the click auto-waits for it to appear; if it never does within the
  // window, the .catch lets the flow proceed. Scoped to the modal container so it only
  // matches the actual popup close, not other elements.
  await page.locator('div[data-testid="modal-form-container"] button.klaviyo-close-form').click({ timeout: 10_000 }).catch(() => {});
}

/**
 * Open a top-level mega-menu flyout by CLICKING its trigger (customer click, rule 30).
 * This "mega-category-menu" type opens on click (hover leaves the flyout links
 * visibility:hidden). It renders no ul.mega-sub-menu, so the "open" signal is a
 * category link flipping to visible.
 */
export async function openMegaMenu(page: Page, trigger: string): Promise<void> {
  const link = page.locator(SELECTORS.megaMenuLink).filter({ hasText: trigger }).filter({ visible: true });
  await resilientClick(ctxFor(page), {
    primary: link,
    alt: page.getByRole('link', { name: trigger }),
    ai: `the "${trigger}" top menu`,
  });
  await page.locator(SELECTORS.categoryLink).filter({ visible: true }).first().waitFor({ state: 'visible', timeout: 8_000 });
}

/**
 * Navigate to a product-category the customer way (rule 30): hover the mega-menu
 * trigger to reveal the flyout, then click the category link. Waits for load.
 */
export async function navigateToCategory(page: Page, trigger: string, category: string): Promise<void> {
  await openMegaMenu(page, trigger);
  const catLink = page.locator(`a[href*="/product-category/${category}/"]`).filter({ visible: true });
  await Promise.all([
    page.waitForNavigation({ waitUntil: 'load', timeout: 20_000 }),
    resilientClick(ctxFor(page), { primary: catLink, ai: `the "${category}" category link` }),
  ]);
  await closePopup(page);
}

/**
 * Land directly on a product page (rule 30 allows goto for a direct product URL).
 * Primes the region country via ?mocs= and dismisses the popup.
 */
export async function openProduct(page: Page, region: RegionConfig, product: { slug: string }): Promise<void> {
  await page.goto(`${region.path}shop/${product.slug}/?mocs=${region.mocs}`);
  await page.waitForLoadState('load');
  await closePopup(page);
}

/**
 * Add the configured composite goggle to the cart and capture cart facts. Lands on
 * the product with a full valid config, dismisses the popup, captures name + unit
 * price, clicks the composite add-to-cart (a full-page POST), and waits for the
 * post-add "View cart" notice. Returns the captured CartResult (qty 1).
 */
export async function addCompositeToCart(page: Page, region: RegionConfig): Promise<CartResult> {
  // Load the product WITH ?mocs= so the geolocation layer does NOT server-redirect to
  // ?mocs=INT (its geo default), which would hang as a pending navigation under the
  // add-to-cart click. The explicit mocs also sets the country cookie so the later
  // cart/checkout pages (reached without mocs) don't geo-redirect either. The client
  // strips mocs from the address bar via history.replaceState (harmless, same-doc).
  await page.goto(`${region.path}shop/${COMPOSITE_GOGGLE.slug}/?${COMPOSITE_GOGGLE.presetQuery}&mocs=${region.mocs}`);
  await page.waitForLoadState('load');
  await closePopup(page);

  const productName = await resilientText(ctxFor(page), {
    primary: page.locator(SELECTORS.productTitle),
    ai: 'the product title heading',
  });
  const unitPrice = money(await resilientText(ctxFor(page), {
    primary: page.locator(SELECTORS.productPrice).filter({ visible: true }),
    ai: 'the product price',
  }));

  await resilientClick(ctxFor(page), {
    primary: page.locator(SELECTORS.compositeAddToCart),
    ai: 'the Add to cart button',
  });
  // Composite add reloads the product page; the woo notice + View cart link is the done signal.
  await page.locator(SELECTORS.viewCartLink).filter({ visible: true }).first().waitFor({ state: 'visible', timeout: 30_000 });

  return { productName, unitPrice, qty: 1, subtotal: unitPrice };
}

/**
 * Go to the cart page via the "View cart" notice link (customer click, rule 30).
 * The link is visible + stable in isolation, but the sticky header intermittently
 * fails Playwright's actionability gate at the test viewport, so dispatch the click
 * directly on the (confirmed-visible) link — still a click on the real element.
 */
export async function goToCart(page: Page): Promise<void> {
  await closePopup(page);
  const viewCart = page.locator(SELECTORS.viewCartLink).first();
  await viewCart.waitFor({ state: 'visible', timeout: 15_000 });
  await Promise.all([
    page.waitForURL('**/cart/**', { timeout: 20_000 }),
    viewCart.dispatchEvent('click'),
  ]);
  await page.waitForLoadState('load');
  await closePopup(page);
}

/**
 * Proceed from the cart page to the WFACP checkout (customer click, rule 30).
 * Like the View cart link, the "Proceed to checkout" button is visible but the
 * sticky header fails Playwright's actionability gate, so dispatch the click
 * directly on the confirmed-visible button.
 */
export async function goToCheckoutFromCart(page: Page): Promise<void> {
  await closePopup(page);
  const proceed = page.locator(SELECTORS.cartProceed).first();
  await proceed.waitFor({ state: 'visible', timeout: 15_000 });
  await Promise.all([
    page.waitForURL('**/checkout/**', { timeout: 20_000 }),
    proceed.dispatchEvent('click'),
  ]);
  await page.locator(SELECTORS.wfacpTotalRow).filter({ visible: true }).first().waitFor({ state: 'visible', timeout: 30_000 });
  await closePopup(page);
}

/** Read the FunnelKit Aero (WFACP) order-summary totals. */
export async function readCheckoutTotals(page: Page): Promise<CheckoutTotals> {
  const rowAmount = async (rowSel: string): Promise<number> =>
    money(await resilientText(ctxFor(page), {
      primary: page.locator(rowSel).filter({ visible: true }).locator(SELECTORS.amount),
      ai: `the amount in the "${rowSel}" summary row`,
    }).catch(() => ''));
  return {
    subtotal: await rowAmount(SELECTORS.wfacpSubtotalRow),
    shipping: await rowAmount(SELECTORS.wfacpShippingRow),
    total: await rowAmount(SELECTORS.wfacpTotalRow),
  };
}

/**
 * Redesigned product page: click the first pre-made combination and return its
 * declared attribute params + the resulting gallery image srcs. Waits for the
 * gallery to re-render to the combination (its frame image to appear). The params
 * (raw data-attr) and img srcs (custom DOM read) are rule-23-allowed raw reads.
 */
export async function selectPremadeCombination(page: Page): Promise<{ params: Record<string, string>; srcs: string[] }> {
  const first = page.locator(SELECTORS.premadeCombo).first();
  const params = JSON.parse((await first.getAttribute('data-combination-params')) ?? '{}') as Record<string, string>;
  await resilientClick(ctxFor(page), { primary: first, ai: 'the first pre-made combination thumbnail' });
  // Gallery re-renders to the combination — wait for its frame image to load in.
  if (params['pa_frame']) {
    await page.locator(`${SELECTORS.galleryImg}[src*="${params['pa_frame']}"]`).first()
      .waitFor({ state: 'attached', timeout: 15_000 }).catch(() => {});
  }
  const srcs = await page.evaluate(
    (sel) => Array.from(document.querySelectorAll<HTMLImageElement>(sel)).map((i) => i.currentSrc || i.src),
    SELECTORS.galleryImg
  );
  return { params, srcs };
}

/** Selected country code held by the country dropdown (e.g. 'GB','CA'). The reliable country signal. */
export async function getSelectedCountryCode(page: Page): Promise<string> {
  return countryDropdown(page).inputValue();
}

/** Selected currency code (e.g. 'GBP'). SOFT signal — the switcher lags a page load. */
export async function getSelectedCurrency(page: Page): Promise<string> {
  return currencySwitcher(page).inputValue();
}
