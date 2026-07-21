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

/**
 * Parse a WooCommerce price string to a number. Locale-aware: the LAST separator is the
 * decimal point, earlier separators are thousands — so UK "£1,234.50" → 1234.5 AND EU
 * "€1.234,56" / "€80,00" → 1234.56 / 80. NaN if no digits.
 */
export function money(text: string | null | undefined): number {
  const raw = (text || '').replace(/[^0-9.,]/g, '');
  if (!raw) return NaN;
  const lastSep = Math.max(raw.lastIndexOf('.'), raw.lastIndexOf(','));
  const normalized =
    lastSep === -1 ? raw : `${raw.slice(0, lastSep).replace(/[.,]/g, '')}.${raw.slice(lastSep + 1)}`;
  const n = parseFloat(normalized);
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

/**
 * Products under test. Goggles = WooCommerce Composite; jester = redesigned product page.
 * `menuTrigger` = the top-level mega-menu whose flyout links to the product (customer
 * path — see openProductViaMegaMenu). The goggle is NOT on the shop grid, only in the
 * "Goggles" flyout (confirmed live 2026-07-17).
 */
export const PRODUCTS = {
  goggles: { slug: 'diablo-mtb-goggles', title: 'Diablo Goggle (mtb)', menuTrigger: 'Goggles' },
  jester: { slug: 'jester-sunglasses', title: 'Jester Sunglasses', menuTrigger: 'Sunglasses' },
} as const;

/**
 * EU products. Same composite goggle, but the EU storefront's top menu differs —
 * the goggle flyout lives under the "Bike" trigger (UK uses "Goggles"). Confirmed live
 * 2026-07-21: top nav = Bike / Snow / Sunglasses / Extras / LTD Editions.
 */
export const EU_PRODUCTS = {
  goggles: { slug: 'diablo-mtb-goggles', title: 'Diablo Goggle (mtb)', menuTrigger: 'Bike' },
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
 * EU mega-menu navs (GI "02 – Accessories Page"). The accessories flyout lives under the
 * "Extras" trigger on the EU blog (confirmed live 2026-07-21). GI's "02 – Bike Menu"
 * menu-open smoke is folded (same call as UK's Sunglasses smoke — the open/hover is
 * already exercised here).
 */
export const EU_MENU_NAVS: MenuNav[] = [
  { name: 'Accessories', trigger: 'Extras', category: 'accessories' },
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
      page.waitForLoadState('domcontentloaded', { timeout: 20_000 }),
      page.waitForLoadState('load', { timeout: 30_000 }),
      resilientSelect(ctxFor(page), { primary: dropdown, ai: 'the country dropdown' }, sw.mocs),
    ]);
  }
}

/**
 * Dismiss the Klaviyo signup popup. It fires on a DELAY on the FIRST page load of a
 * session and does not re-show, so call this only after the initial landing goto.
 * Waits a bounded window for it to appear, then closes it; silently proceeds if it
 * never shows.
 */
export async function closePopup(page: Page): Promise<void> {
  // Real click of the Klaviyo popup's close button. It's delayed (~1.2s), so the click
  // auto-waits for it to appear; if it never does within the window, the .catch lets
  // the flow proceed. Scoped to the modal container so it only matches the actual popup
  // close, not other elements.
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
 * Reach a product page the customer way (rule 30): prime the region, open the product's
 * top-level mega-menu, then click its tile in the flyout. Verified live 2026-07-17 —
 * the goggle is NOT on the shop grid; the Goggles flyout is the only click-path.
 *
 * This flyout differs from the category navs: it holds product tiles, no
 * `a[href*="/product-category/"]`, so the "menu open" signal is the product TILE
 * flipping visible (flyout links are visibility:hidden until the click-type Max Mega
 * Menu opens). The tile sits below the fold — resilientClick auto-scrolls it in.
 */
export async function openProductViaMegaMenu(
  page: Page,
  region: RegionConfig,
  product: { slug: string; menuTrigger: string }
): Promise<void> {
  await primeRegion(page, region);
  const trigger = page.locator(SELECTORS.megaMenuLink).filter({ hasText: product.menuTrigger }).filter({ visible: true });
  await resilientClick(ctxFor(page), {
    primary: trigger,
    alt: page.getByRole('link', { name: product.menuTrigger }),
    ai: `the "${product.menuTrigger}" top menu`,
  });
  // Open-signal: the product tile in the flyout flips visible.
  const tile = page.locator(`a[href*="/shop/${product.slug}/"]`).filter({ visible: true }).first();
  await tile.waitFor({ state: 'visible', timeout: 8_000 });
  await Promise.all([
    page.waitForNavigation({ waitUntil: 'load', timeout: 45_000 }),
    // noWaitAfter: the composite product page loads slower than TIER_TIMEOUT; the
    // waitForNavigation above owns the load wait, so the click must not also block on it.
    resilientClick(ctxFor(page), { primary: tile, ai: `the ${product.slug} product tile` }, { noWaitAfter: true }),
  ]);
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
  const viewCart = page.locator(SELECTORS.viewCartLink).first();
  await viewCart.waitFor({ state: 'visible', timeout: 15_000 });
  await Promise.all([
    page.waitForURL('**/cart/**', { timeout: 20_000 }),
    viewCart.dispatchEvent('click'),
  ]);
  await page.waitForLoadState('load');
}

/**
 * Proceed from the cart page to the WFACP checkout (customer click, rule 30).
 * Like the View cart link, the "Proceed to checkout" button is visible but the
 * sticky header fails Playwright's actionability gate, so dispatch the click
 * directly on the confirmed-visible button.
 */
export async function goToCheckoutFromCart(page: Page): Promise<void> {
  const proceed = page.locator(SELECTORS.cartProceed).first();
  await proceed.waitFor({ state: 'visible', timeout: 15_000 });
  await Promise.all([
    page.waitForURL('**/checkout/**', { timeout: 20_000 }),
    proceed.dispatchEvent('click'),
  ]);
  await page.locator(SELECTORS.wfacpTotalRow).filter({ visible: true }).first().waitFor({ state: 'visible', timeout: 30_000 });
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

export async function waitForCheckoutReady(page: Page): Promise<void> {
  await page.waitForLoadState('load');
  for (const sel of [
    '.blockUI.blockOverlay',
    '.wc-block-components-spinner',
    '.wc-block-components-checkout-place-order-button--loading',
  ]) {
    await page.locator(sel).first().waitFor({ state: 'hidden', timeout: 15_000 }).catch(() => {});
  }
}
