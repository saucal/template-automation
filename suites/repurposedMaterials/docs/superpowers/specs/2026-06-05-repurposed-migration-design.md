# repurposedMATERIALS GI-to-Playwright Migration Design

**Date:** 2026-06-05
**Reference implementation:** leggari-automation (8 specs, bluesnap-style 3-context architecture)
**Approach:** Full leggari clone — types/fixtures/helpers/specs + Stagehand resilient layer

## Site Profile

- **URL:** repurposedmaterialsinc-staging.mystagingwebsite.com
- **Checkout:** Classic (shortcode `form.woocommerce-checkout`)
- **Payment gateway:** Accept.Blue v2 (sole method, direct DOM fields — no iframe)
- **Product types in tests:** Simple only
- **Email service:** Mailpit via @playgrounds.saucal.io
- **Site quirks:**
  - Shadow-DOM promotional popup (`dialog` with `button[aria-label="Close"]`)
  - LiveChat widget (`#chat-widget-container`) — iframe intercepts pointer events
  - Mailchimp popup (`.mcforms-wrapper`) — intercepts clicks on product buttons
  - Custom checkout fields: `#purchase_repurposing` (textarea), `#how_did_you_hear_about_us` (Select2)
  - Mailchimp newsletter checkbox (`#mailchimp_woocommerce_newsletter`)
  - CC processing fee (3.25%) as order line item
  - reCAPTCHA iframe (broken on staging — domain mismatch)
  - eCheck payment method from GI common steps is dead code (not present on site)

## Project Structure

```
repurposedmaterials-automation/
  types/
    test-config.ts
  fixtures/
    index.ts
  helpers/
    resilient.ts
    repurposed.ts
    assertions.ts
    flows.ts
    account.ts
    playgrounds-email.ts
  specs/
    orders/
      place-order-new-user.spec.ts
      place-order-logged-user.spec.ts
    account/
      account.spec.ts
    site/
      navigation.spec.ts
      visual.spec.ts
  global-setup.ts
  playwright.config.ts
  .env.example
```

`generated/` stays for reference but is NOT in `testDir`.

## Types

```typescript
// types/test-config.ts
export type PaymentMethod = 'acceptblue';
export type UserKind = 'guest' | 'new' | 'logged';

export interface SimplePdp {
  kind: 'simple';
  slug?: string;        // explicit product URL path
  maxPrice?: number;    // dynamic selection: random in-stock simple under this price
  qty: number;
}

export type PdpConfig = SimplePdp;

export interface OrderConfig {
  testId: string;       // e.g. 'RM-PO-01'
  title: string;
  user: UserKind;
  payment: PaymentMethod;
  pdp: PdpConfig;
  expectedStatus: 'Processing';
}

export interface CapturedPrices {
  productName: string;
  unitPrice: string;
  subtotal: string;
  shipping: string;
  tax: string;
  ccFee: string;        // Accept.Blue 3.25% processing fee
  total: string;
}

export interface OrderResult extends CapturedPrices {
  orderNumber: string;
  email: string;
  paymentLabel: string; // 'Credit Card'
}

export interface SuiteVars {
  title: string;        // site title for Mailpit email filter
}
```

Key differences from leggari:
- `ccFee` in CapturedPrices (site charges 3.25% CC processing fee)
- No variable/composite PDP types — only simple products
- `'logged'` user kind instead of `'contractor'`
- Dynamic product selection via `maxPrice` (replicates GI's eval picking random <$100 in-stock simple)

## Fixtures

Identical to leggari's `fixtures/index.ts`:
- `stagehand` — optional, inits when `ANTHROPIC_API_KEY` set
- `pageBrowser` — Stagehand CDP browser or plain chromium
- `shopperPage` — eager, no auth
- `adminPage` — lazy, `storageState: auth/admin.json`
- `emailPage` — lazy, admin auth (Mailpit + wp-admin nav)
- Manual trace/screenshot/video honoring (`openContext`/`finishContext`)
- `pickContextOptions` allow-list, `isHeadless` bridge, `applyTimeouts`

Direct copy from leggari, no changes needed.

## Overlay Dismissal

Three overlays to dismiss on every navigation, handled by `dismissOverlays(page)` in `helpers/repurposed.ts`:

1. Remove `#chat-widget-container` via `page.evaluate` (iframe intercepts clicks)
2. Remove `.mcforms-wrapper` elements via `page.evaluate`
3. Click `dialog button[aria-label="Close"]` if visible (may need `>>>` piercing selector for shadow DOM)

Order matters: remove pointer-intercepting overlays first, then dismiss dialog.

## Helpers

### `helpers/repurposed.ts` — site-specific interactions

- `dismissOverlays(page)` — remove LiveChat + Mailchimp, close promotional dialog
- `findAndAddSimpleProduct(page, config: SimplePdp)` — shop page, eval picks random in-stock simple under maxPrice, add-to-cart, return productName + unitPrice
- `goToCheckout(page)` — navigate to `/checkout/`, dismissOverlays, wait for form
- `fillCheckout(page, vars)` — billing/shipping fields, uncheck Mailchimp newsletter if checked, check createaccount for new users, fill `#purchase_repurposing` + `#how_did_you_hear_about_us`, check terms
- `fillAcceptBlue(page, vars)` — Name on Card, Card number, Expiry, CVC (direct DOM)
- `capturePrices(page): CapturedPrices` — subtotal, shipping, CC fee, tax, total from order review
- `placeOrder(page)` — click `#place_order`, wait for `/order-received/`
- `captureOrderResult(page, prices, email): OrderResult` — order number from thank-you, combine with prices

All actions/assertions routed through resilient wrappers (rule 23).

### `helpers/assertions.ts` — parity checks

- `assertThankYouPage(page, expected: OrderResult)` — order number, product, payment, prices
- `assertMyAccount(page, expected: OrderResult)` — my-account -> orders -> view order
- `assertBackendOrder(adminPage, expected: OrderResult)` — wp-admin order, status Processing, payment "Credit Card", order notes `accept.blue Gateway v2 Payment Completed`
- `assertRefundBackend(adminPage, expected: OrderResult)` — perform refund, verify `accept.blue Gateway v2 Refund`
- `assertOrderEmail(emailPage, expected, suiteVars)` — Mailpit order email
- `assertRefundEmail(emailPage, expected, suiteVars)` — Mailpit refund email

### `helpers/flows.ts` — orchestration

- `placeOrderFlow(shopperPage, config): OrderResult` — dismissOverlays -> product -> cart -> checkout -> fill -> pay -> capture
- `verifyOrderFlow(shopperPage, adminPage, emailPage, result, suiteVars)` — thank-you -> my-account -> backend -> email
- `refundFlow(adminPage, emailPage, result, suiteVars)` — refund -> notes -> email

### `helpers/account.ts` — account operations

- `register(page, email, password)`
- `login(page, username, password)`
- `lostPassword(page, email)` — trigger + verify via Mailpit
- `assertMyAccountLinks(page)` — navigate each tab, verify content loads

### `helpers/playgrounds-email.ts`

Copy from leggari, adapted for `@playgrounds.saucal.io` + `MAILPIT_URL` env var.

### `helpers/resilient.ts`

Copy from leggari. Exports `resilientClick/Fill/Select/Check/Uncheck` + `resilientText`.

## Specs

### `specs/orders/place-order-new-user.spec.ts`

Merges GI Place Order CC tests 01-05 (shopper + email + backend + refund + refund email):

```
test.describe('Place Order - New User')
  beforeAll: fetch SuiteVars (site title from DOM)

  test('RM-PO-01: place order, verify end-to-end'):
    shopperPage: placeOrderFlow (guest email, new account creation)
    shopperPage: assertThankYouPage
    shopperPage: assertMyAccount
    adminPage: assertBackendOrder
    emailPage: assertOrderEmail
    adminPage: refund
    adminPage: assertRefundBackend
    emailPage: assertRefundEmail
```

### `specs/orders/place-order-logged-user.spec.ts`

Merges GI Place Order CC tests 06-08 (logged user shopper + email + backend):

```
test.describe('Place Order - Logged User')
  beforeAll: fetch SuiteVars, login as existing user (PASSWORD from .env)

  test('RM-PO-02: place order as logged user, verify end-to-end'):
    shopperPage: login -> placeOrderFlow (skip billing/createaccount)
    shopperPage: assertThankYouPage
    shopperPage: assertMyAccount
    adminPage: assertBackendOrder
    emailPage: assertOrderEmail
```

### `specs/account/account.spec.ts`

Maps to GI Basic tests 12 + 13:

```
test.describe('Account')
  test('RM-AC-01: register + my-account navigation'):
    shopperPage: register -> assertMyAccountLinks -> logout

  test('RM-AC-02: login + lost password'):
    shopperPage: login -> logout -> lostPassword -> verify email -> reset -> login
```

### `specs/site/navigation.spec.ts`

Maps to GI Basic tests 01-11:

```
test.describe('Site Navigation')
  test('RM-NAV-01: home page'): hero slider, animated numbers, content sections
  test('RM-NAV-02: header'): mega menu hover, submenu visibility
  test('RM-NAV-03: footer'): quick links, trust badges
  test('RM-NAV-04: shop page'): pagination, filters, product descriptions
  test('RM-NAV-05: simple product page'): PDP layout, add-to-cart, gallery
  test('RM-NAV-06: variable product page'): variation selects, price update
  test('RM-NAV-07: cart page'): update qty, remove item, coupon
  test('RM-NAV-08: checkout validation'): empty CC fields error, terms required error
```

### `specs/site/visual.spec.ts`

Screenshot comparisons (new, not in GI, follows leggari pattern):

```
test.describe('Visual Regression')
  test('RM-VIS-01: home'): toHaveScreenshot
  test('RM-VIS-02: shop'): toHaveScreenshot
  test('RM-VIS-03: PDP'): toHaveScreenshot
  test('RM-VIS-04: cart'): toHaveScreenshot
```

## GI Test Triage

| GI Test | Disposition | Target Spec |
|---------|-------------|-------------|
| Place Order CC 01-05 (new user) | Merged (3-context) | place-order-new-user.spec.ts |
| Place Order CC 06-08 (logged user) | Merged (3-context) | place-order-logged-user.spec.ts |
| Basic 01-11 (site/navigation) | Mapped | navigation.spec.ts |
| Basic 12-13 (account) | Merged | account.spec.ts |
| Common Steps (18 helpers) | Absorbed into helpers/ | N/A |
| Common Steps Global (4 helpers) | blockUI absorbed, rest dropped | N/A |
| Fill eCheck helper | Dropped (dead code) | N/A |

## Env Vars (.env.example)

```
BASE_URL=https://repurposedmaterialsinc-staging.mystagingwebsite.com
WP_ADMIN_USER=saucal_maintenance_admin
ADMIN_PASS=
PASSWORD=
PASSWORD2=
MAILPIT_URL=
ANTHROPIC_API_KEY=
STAGEHAND_MODEL=anthropic/claude-sonnet-4-6
```

## Implementation Order

1. Scaffold: types, fixtures, playwright.config, global-setup, .env.example, resilient.ts
2. Order specs (orders first): repurposed.ts + assertions.ts + flows.ts + playgrounds-email.ts + 2 order specs
3. Account spec: account.ts + account.spec.ts
4. Site specs: navigation.spec.ts + visual.spec.ts
