# No Pong — WooCommerce Blocks cart + checkout support

**Date:** 2026-07-17
**Branch:** `feat/nopong-playwright-refactor`
**Status:** design approved (pending written-spec review)

## Problem

No Pong's `develop` tier is mid-rollout of the WooCommerce **Cart & Checkout Blocks**.
The current helpers in `helpers/nopong.ts` drive only the **classic** shortcode
cart/checkout. CA/US `develop` now render the Blocks versions, so:

- `setCartShippingDestination` throws "not supported yet" (Blocks cart has no
  `#calc_shipping_*` select2).
- `pay()` fails at the classic `#terms` checkbox (Blocks uses a different terms control),
  and everything after it (`payment_method_stripe` label, `iframe[js.stripe.com]`,
  `#place_order`) is classic-only too.

The site toggles between classic and Blocks **between runs** (confirmed: CA/US were
classic on 2026-07-08, Blocks by 07-09). AU currently renders classic on every tier.

## Principle

**Branch on a live DOM check every page load — never on region/tier config.**
A `region === 'ca' ? blocks : classic` branch goes silently stale the next time the
site's toggle flips. (Same reasoning as the branch-on-typed-config-not-strings rule.)

## Architecture — paired functions + thin dispatcher

Keep each classic implementation, add a Blocks sibling, and make the exported name a
thin dispatcher:

```ts
export async function setCartShippingDestination(page: Page, region: Region) {
  if (await isBlocksCart(page)) return setCartShippingDestinationBlocks(page, region);
  return setCartShippingDestinationClassic(page, region);
}
```

Chosen (already agreed in the prior brainstorm) over inline `if/else` inside each body
because classic is deleted once Blocks is fully rolled out — cleanup then = "delete the
N `*Classic` functions and collapse each dispatcher", not surgery inside shared bodies.

## Detection helpers (single source of truth)

- `isBlocksCart(page)` — **new.** `.wp-block-woocommerce-cart` present (renders
  `table "Products in cart"`) AND `.woocommerce-cart-form` absent.
- `isBlockCheckout(page)` — **exists** (`nopong.ts:199`, `.wc-block-checkout,
  .wp-block-woocommerce-checkout`), currently never called; start calling it.

## The 5 touch points

Selectors below are from the live ARIA snapshots at
`~/projects/nopong-limited/.qa/snapshots/{au,ca}-{cart,checkout}-blocks.yml`
(captured 2026-07-16) plus the 2026-07-08/09 cart exploration.

### 1. `setCartShippingDestination` (cart page)
- **Classic (keep):** select2 `#calc_shipping_country` → `#calc_shipping_state` →
  `#calc_shipping_city` / `#calc_shipping_postcode` → `button[name=calc_shipping]`.
- **Blocks:** totals block shows `button "Change address"` (address already set) or
  `button "Calculate shipping"` (not yet). Click it → inline mini address form:
  `combobox "Country / Region"`, a state `combobox` (label varies — CA "Province",
  AU "State/County"), `textbox` postcode (`/postcode|postal|zip/i`), **no City field** →
  `button "Update"`. Select state as the combobox that is not the country one.

### 2. `setCartQtyAndUpdate` (cart page)
- **Classic (keep):** `input.qty` fill → Enter → blur → AJAX recalc. Keeps the
  `{ verify }` reload-and-confirm retry (session-propagation lag).
- **Blocks:** `getByRole('spinbutton', { name: /quantity of/i })` (aria-label
  "Quantity of {product} in your cart.") — fill + blur; Blocks auto-recalculates, there
  is **no Update button**. `{ verify }` still reloads and re-reads the spinbutton value.

### 3. `assertSubscriptionCartTotal` (cart page — `helpers/assertions.ts`)
- **Classic (keep):** `tr.cart-subtotal` / `td.product-price ins` / `tr.order-total`
  (+ `.recurring-total` variants).
- **Blocks:** different DOM — `.wc-block-components-totals-item` rows labelled
  "Subtotal" / "Estimated total", line-item del/ins ("Previous price" / "Discounted
  price"), the "Sign up fee" line, recurring section. New `assertSubscriptionCartTotalBlocks`
  reads those; dispatched inside `assertSubscriptionCartTotal`. Same arithmetic model
  (subtotal = unit×qty + fee; total = subtotal + shipping + addTax(region)).

### 4. `fillCheckoutAddress` (checkout page)
- **Classic (keep):** `#billing_*` ids.
- **Blocks:** accessible-name fields in the `form "Checkout"` shipping-address group:
  `textbox "Email address"`, `combobox "Country/Region"`, `First name`, `Last name`,
  `Address`, `City`, state combo (`Province` CA / `State/County` AU), `Postal code`,
  `Phone (optional)`. `checkbox "Create an account with No Pong[ Canada]"` for new users.
  `checkbox "Use same address for billing"` is checked by default → billing = shipping,
  no separate billing fill. Logged-in users skip (saved address prefills), same as classic.

### 5. `pay` / `payStripe` / `payPaypal` / `placeOrder` (checkout page)
- **Terms — classic (keep):** `#terms` force-check.
  **Blocks:** `checkbox "You must accept our Terms and Conditions..."`.
- **Stripe — classic (keep):** `label[for=payment_method_stripe]` +
  `iframe[js.stripe.com]` `input[name=number/expiry/cvc]`.
  **Blocks:** `radio "Credit / Debit Card"` (checked by default) + the Stripe
  **Payment Element** iframe with **textboxes** `Card number`, `Expiration date MM / YY`,
  `Security code` (note: different shape than the classic 3-`input` iframe). Saved-card
  and save-card sub-paths get Blocks equivalents where they exist.
- **PayPal — classic (keep):** PPCP all-frames scan + sandbox popup.
  **Blocks (build now, flag for live-verify):** select `radio "PayPal"`, then **reuse the
  existing all-frames `findPayButton` + sandbox-popup loop** — the loaded PayPal-radio
  state was not in the snapshots, so every Blocks-PayPal selector is marked
  `TODO: confirm on live run`. PO-05 (AU) and CA PayPal exercise it.
- **Place order — classic (keep):** `#place_order`.
  **Blocks:** `.wc-block-components-checkout-place-order-button` (text varies:
  "Place Order" simple, "Join the Club" subscription → locate by class, not text).

## Confirmed / dropped

- **No "AI agent" checkbox** on either AU or CA Blocks checkout in the 2026-07-16
  snapshots — the earlier concern is dropped. (Re-check if a live run surfaces it.)
- **AU is also on Blocks** (au-{cart,checkout}-blocks.yml, 2026-07-16) — same as CA/US.
  The only AU/CA/US difference is tax mode, driven entirely by `regionConfig.taxInclusive`
  (AU inclusive → no separate tax row; CA exclusive → additive row; US none). The live DOM
  check routes each region through the Blocks branch automatically; no region-specific code.
  Classic branch remains only as a fallback for any tier still serving the old cart/checkout.

## Nav helpers (verify, likely no change)

- `goToCart` — navigates via header/mini-cart; getting to the cart is the same, only the
  cart page differs. Flag for live-verify (Blocks mini-cart flyout may differ).
- `proceedToCheckout` — Blocks cart uses `link "Proceed to Checkout"`; the existing
  `getByRole('link', {name:/proceed to checkout/i})` fallback already covers it.

## Testing

Per project convention (`nopong_user_runs_tests`): Claude writes specs + runs `tsc`
only; the **user runs live Playwright**. No spec files change shape — the dispatchers are
transparent to `cart.spec.ts` / `place-order.spec.ts`. Deliverable = tsc-clean helpers +
this design doc + updated `docs/TODO.md`. User validates AU + CA/US (all Blocks) on the
live develop tier — the only per-region difference is tax mode (AU inclusive / CA
exclusive / US none), already driven by `regionConfig.taxInclusive`.

## Out of scope

- Deleting the classic path (happens later, once Blocks is fully rolled out).
- US-suite PayPal place-order (already dropped, commit `2e3106e`).
- Wholesale / subscription-manage flows (unchanged).
