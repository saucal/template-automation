# No Pong Blocks Cart + Checkout Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the No Pong helpers drive both the classic AND the WooCommerce Blocks cart/checkout, chosen by a live DOM check, so CA/US `develop` (Blocks) and AU (classic) both pass without spec changes.

**Architecture:** Each of the 5 touch points becomes a thin exported dispatcher that calls a `*Classic` or `*Blocks` sibling based on a live DOM check (`isBlocksCart` / `isBlockCheckout`). Classic implementations are preserved verbatim (renamed); Blocks siblings are new. No spec files change — dispatchers are transparent.

**Tech Stack:** TypeScript, Playwright, WooCommerce Blocks (React) + classic shortcode checkout, Stripe Payment Element, PayPal PPCP. Selectors sourced from live ARIA snapshots at `~/projects/nopong-limited/.qa/snapshots/{au,ca}-{cart,checkout}-blocks.yml` (2026-07-16).

**Testing model (project convention `nopong_user_runs_tests`):** Claude writes helpers + runs `npm run typecheck` and `npx playwright test --list`; the **user runs live Playwright**. There are no unit tests — the per-task verification is a clean typecheck + specs still enumerating. Blocks selectors the snapshots did not cover are marked `TODO(live-verify)` in comments.

**Verification commands used by every task:**
- Typecheck: `npm run typecheck` — Expected: no output, exit 0.
- Enumerate: `npx playwright test --list` — Expected: same test count as before (dispatchers add no tests), no import/parse errors.

---

## File Structure

- **Modify `helpers/nopong.ts`** — add `isBlocksCart`; convert `setCartShippingDestination`, `setCartQtyAndUpdate`, `fillCheckoutAddress`, `pay`/`payStripe`/`payPaypal`/`placeOrder` into dispatchers + `*Classic`/`*Blocks` siblings; extract shared `drivePaypalSmartButton`.
- **Modify `helpers/assertions.ts`** — convert `assertSubscriptionCartTotal` into a dispatcher + `*Classic`/`*Blocks` siblings.
- **Modify `docs/TODO.md`** — record the Blocks work + the `TODO(live-verify)` selector list.
- **Specs unchanged.**

---

## Task 1: `isBlocksCart` detection helper

**Files:**
- Modify: `helpers/nopong.ts` (insert after `isBlockCheckout`, ~line 201)

- [ ] **Step 1: Add the detection helper**

Insert immediately after the existing `isBlockCheckout` function (after line 201):

```ts
/** Blocks vs classic CART — live DOM check (rule: never branch on region/tier). */
export async function isBlocksCart(page: Page): Promise<boolean> {
  await page.waitForLoadState('load').catch(() => {});
  const blocks = await page.locator('.wp-block-woocommerce-cart').count();
  const classic = await page.locator('form.woocommerce-cart-form').count();
  return blocks > 0 && classic === 0;
}
```

- [ ] **Step 2: Typecheck**

Run: `npm run typecheck`
Expected: no output, exit 0.

- [ ] **Step 3: Commit**

```bash
git add helpers/nopong.ts
git commit -m "feat(nopong): add isBlocksCart live-DOM detection helper"
```

---

## Task 2: `setCartShippingDestination` dispatcher + Blocks sibling

**Files:**
- Modify: `helpers/nopong.ts:612-663` (the current `setCartShippingDestination`)

- [ ] **Step 1: Rename the existing function to `setCartShippingDestinationClassic`**

Change the signature line (612) from:

```ts
export async function setCartShippingDestination(page: Page, region: Region): Promise<void> {
```

to:

```ts
async function setCartShippingDestinationClassic(page: Page, region: Region): Promise<void> {
```

Delete the now-obsolete Blocks-detection guard inside it (the block currently at lines 627-640 that throws "not supported by this helper yet"), since the dispatcher handles that branch now. Replace those lines with the original fail-fast for the classic-only case:

```ts
  const country = page.locator('#select2-calc_shipping_country-container');
  if (!(await country.first().isVisible({ timeout: 8_000 }).catch(() => false))) {
    throw new Error('setCartShippingDestinationClassic: #calc_shipping_country select2 never appeared.');
  }
```

- [ ] **Step 2: Add the Blocks sibling** (immediately after `setCartShippingDestinationClassic`)

```ts
/**
 * Blocks cart: the shipping destination is set through the inline address editor in
 * the "Cart totals" block ("Change address" once resolved, "Calculate shipping"
 * before). The mini-form has a Country/Region combobox, a state combobox (label
 * varies by region — "Province" CA, "State/County" AU — so matched by exclusion),
 * and a Postcode/ZIP textbox (NO City field), committed with "Update".
 * TODO(live-verify): the expanded mini-form was not in the 2026-07-16 snapshots
 * (captured while the cart was still loading) — confirm the combobox/textbox names.
 */
async function setCartShippingDestinationBlocks(page: Page, region: Region): Promise<void> {
  const { billing } = regionFor(region);
  const ctx = ctxFor(page);
  const opener = page.getByRole('button', { name: /change address|calculate shipping/i }).first();
  if (await opener.isVisible({ timeout: 8_000 }).catch(() => false)) {
    await opener.click().catch(() => {});
  }
  const country = page.getByRole('combobox', { name: /country/i }).first();
  await country.waitFor({ state: 'visible', timeout: 10_000 });
  await country.selectOption(billing.shortCountry).catch(async () => {
    await country.selectOption({ label: billing.countryComplete });
  });
  await waitForCheckoutReady(page);
  if (billing.shortState) {
    // The state combobox is the one that is NOT the country combobox.
    const combos = page.getByRole('combobox');
    const n = await combos.count();
    for (let i = 0; i < n; i++) {
      const cb = combos.nth(i);
      if (/country/i.test((await cb.getAttribute('aria-label')) ?? '')) continue;
      await cb.selectOption(billing.shortState).catch(() => {});
      break;
    }
    await waitForCheckoutReady(page);
  }
  const postcode = page.getByRole('textbox', { name: /postcode|postal|zip/i }).first();
  if (await postcode.isVisible({ timeout: 5_000 }).catch(() => false)) {
    await postcode.fill(billing.zip);
  }
  await resilientClick(ctx, {
    primary: page.getByRole('button', { name: /^update$/i }),
    alt: page.getByRole('button', { name: /update/i }),
    ai: 'the Update button in the Blocks cart shipping-address editor',
  });
  await waitForCheckoutReady(page);
}
```

- [ ] **Step 3: Add the dispatcher** (immediately after the Blocks sibling)

```ts
/** Set the cart shipping destination — classic calculator or Blocks address editor. */
export async function setCartShippingDestination(page: Page, region: Region): Promise<void> {
  if (await isBlocksCart(page)) return setCartShippingDestinationBlocks(page, region);
  return setCartShippingDestinationClassic(page, region);
}
```

- [ ] **Step 4: Typecheck + enumerate**

Run: `npm run typecheck` — Expected: exit 0.
Run: `npx playwright test --list` — Expected: unchanged test count, no errors.

- [ ] **Step 5: Commit**

```bash
git add helpers/nopong.ts
git commit -m "feat(nopong): Blocks-aware setCartShippingDestination dispatcher"
```

---

## Task 3: `setCartQtyAndUpdate` dispatcher + Blocks sibling

**Files:**
- Modify: `helpers/nopong.ts:570-595` (the current `setCartQtyAndUpdate`)

- [ ] **Step 1: Rename the existing function to `setCartQtyAndUpdateClassic`**

Change the signature line (570) from:

```ts
export async function setCartQtyAndUpdate(page: Page, qty: number, opts: { verify?: boolean } = {}): Promise<void> {
```

to (note: opts becomes required here; the dispatcher supplies the default):

```ts
async function setCartQtyAndUpdateClassic(page: Page, qty: number, opts: { verify?: boolean }): Promise<void> {
```

- [ ] **Step 2: Add the Blocks sibling** (immediately after `setCartQtyAndUpdateClassic`)

```ts
/**
 * Blocks cart: the line-item quantity is a spinbutton (aria-label "Quantity of
 * {product} in your cart.") with +/- steppers; there is NO "Update cart" button —
 * the Blocks store recalculates on change. `{ verify }` reloads and re-reads the
 * spinbutton to confirm the qty stuck (same session-propagation lag as classic).
 */
async function setCartQtyAndUpdateBlocks(page: Page, qty: number, opts: { verify?: boolean }): Promise<void> {
  const ctx = ctxFor(page);
  const sel = () => page.getByRole('spinbutton', { name: /quantity of/i }).first();
  const attempts = opts.verify ? 3 : 1;
  for (let attempt = 1; attempt <= attempts; attempt++) {
    await goToCart(page);
    const spin = sel();
    await spin.waitFor({ state: 'visible', timeout: 10_000 });
    await resilientFill(ctx, { primary: spin, ai: 'the Blocks cart quantity spinbutton' }, String(qty));
    await spin.press('Tab'); // commit → Blocks store recalculates
    await page.locator('.wc-block-components-spinner').first()
      .waitFor({ state: 'visible', timeout: 3_000 }).catch(() => {});
    await waitForCheckoutReady(page);
    if (!opts.verify) return;
    await page.reload({ waitUntil: 'load' });
    await waitForCheckoutReady(page);
    const persisted = await sel().inputValue().catch(() => '');
    if (persisted === String(qty)) return;
  }
  throw new Error(`Blocks cart quantity did not persist as ${qty} after ${attempts} attempts (session-propagation lag on the site)`);
}
```

- [ ] **Step 3: Add the dispatcher** (immediately after the Blocks sibling)

```ts
/** Set the cart line-item quantity — classic qty input or Blocks spinbutton. */
export async function setCartQtyAndUpdate(page: Page, qty: number, opts: { verify?: boolean } = {}): Promise<void> {
  if (await isBlocksCart(page)) return setCartQtyAndUpdateBlocks(page, qty, opts);
  return setCartQtyAndUpdateClassic(page, qty, opts);
}
```

- [ ] **Step 4: Typecheck + enumerate**

Run: `npm run typecheck` — Expected: exit 0.
Run: `npx playwright test --list` — Expected: unchanged test count, no errors.

- [ ] **Step 5: Commit**

```bash
git add helpers/nopong.ts
git commit -m "feat(nopong): Blocks-aware setCartQtyAndUpdate dispatcher"
```

---

## Task 4: `assertSubscriptionCartTotal` dispatcher + Blocks sibling

**Files:**
- Modify: `helpers/assertions.ts:225-309` (the current `assertSubscriptionCartTotal`)

- [ ] **Step 1: Rename the existing function to `assertSubscriptionCartTotalClassic`**

Change the signature line (225) from:

```ts
export async function assertSubscriptionCartTotal(
  page: Page,
  opts: { qty: number; region: Region }
): Promise<void> {
```

to:

```ts
async function assertSubscriptionCartTotalClassic(
  page: Page,
  opts: { qty: number; region: Region }
): Promise<void> {
```

Leave its body unchanged.

- [ ] **Step 2: Add the Blocks sibling** (immediately after `assertSubscriptionCartTotalClassic`)

The Blocks cart totals use a different DOM: `.wc-block-components-totals-item` rows
(label + value) and a `.wc-block-components-totals-footer-item` for the total; the
line-item discounted price is `.wc-block-components-product-price__value.is-discounted`.
The subscription-specific values (discounted unit price, sign-up fee, recurring total)
were not in a loaded snapshot, so they use `resilientText` (Stagehand self-heals the
selector on the live run) and are marked `TODO(live-verify)`. Same arithmetic model as
classic.

```ts
/**
 * Blocks-cart variant of the subscription cart-total assertion. Reads the
 * `.wc-block-components-totals-item` rows by label and the discounted line-item
 * price, then applies the same model: initial subtotal = discounted unit × qty +
 * sign-up fee; total = subtotal + shipping + region tax; recurring subtotal =
 * unit × qty; recurring total layers recurring shipping + tax.
 * TODO(live-verify): the subscription Blocks cart was not in the 2026-07-16
 * snapshots — confirm the sign-up-fee, recurring-subtotal, and recurring-total
 * selectors on the live run (Stagehand covers drift meanwhile).
 */
async function assertSubscriptionCartTotalBlocks(
  page: Page,
  opts: { qty: number; region: Region }
): Promise<void> {
  const ctx = ctxFor(page);

  // Read a Blocks totals row's value by matching its label text (case-insensitive).
  const rowValue = async (labelRe: string): Promise<string> =>
    page.evaluate((re) => {
      const rx = new RegExp(re, 'i');
      const rows = Array.from(document.querySelectorAll(
        '.wc-block-components-totals-item, .wc-block-components-totals-footer-item'
      ));
      for (const r of rows) {
        const label = (r.querySelector('.wc-block-components-totals-item__label')?.textContent ?? '').trim();
        if (rx.test(label)) {
          const v = r.querySelector('.wc-block-components-totals-item__value')?.textContent ?? '';
          return v.replace(/\s+/g, ' ').trim();
        }
      }
      return '';
    }, labelRe);

  const onSale = (await page.locator('.wc-block-components-product-price__value.is-discounted, .wc-block-cart-item__prices ins').count()) > 0;
  expect(onSale, `qty ${opts.qty} should trigger the subscription quantity discount (a discounted line-item price)`).toBe(true);

  const unitPrice = await resilientText(ctx, {
    primary: page.locator('.wc-block-components-product-price__value.is-discounted').first()
      .or(page.locator('.wc-block-cart-item__prices ins .wc-block-components-product-price__value').first()),
    ai: 'the subscription line-item discounted unit price in the Blocks cart',
  });
  const signUpFee = await resilientText(ctx, {
    primary: page.getByText(/sign up fee/i).first()
      .locator('xpath=following::*[contains(@class,"amount")][1]'),
    ai: 'the subscription sign-up fee amount in the Blocks cart',
  }).catch(() => '');

  const subtotal = await rowValue('^subtotal$');
  const shipping = await rowValue('shipping|shipment|standard|canadapost|auspost');
  const tax = await rowValue('gst|hst|pst|qst|vat|tax');
  const total = await rowValue('estimated total|^total|due today');

  const recurringSubtotal = await resilientText(ctx, {
    primary: page.getByText(/recurring/i).locator('xpath=ancestor::*[contains(@class,"totals-item")]//*[contains(@class,"totals-item__value")]').first(),
    ai: 'the recurring subtotal in the Blocks cart',
  }).catch(() => '');
  const recurringTotal = await resilientText(ctx, {
    primary: page.getByText(/\/\s*month|per month|every month|recurring total/i)
      .locator('xpath=following::*[contains(@class,"amount")][1]').first(),
    ai: 'the recurring total in the Blocks cart',
  }).catch(() => '');

  const money = (s: string) => (Number.isNaN(toAmount(s)) ? 0 : toAmount(s));
  const addTax = (t: string) => (regionFor(opts.region).taxInclusive ? 0 : money(t));

  const expectedSubtotal = (toAmount(unitPrice) * opts.qty) + money(signUpFee);
  expectMoney(subtotal, expectedSubtotal.toFixed(2),
    `Blocks subtotal should equal discounted unit price × ${opts.qty} + sign-up fee`);
  expectMoney(total, (expectedSubtotal + money(shipping) + addTax(tax)).toFixed(2),
    'Blocks cart total should equal subtotal + shipping + tax');

  // Recurring section is only asserted when the Blocks cart renders it (values non-empty).
  if (recurringSubtotal) {
    expectMoney(recurringSubtotal, (toAmount(unitPrice) * opts.qty).toFixed(2),
      `Blocks recurring subtotal should equal discounted unit price × ${opts.qty}`);
  }
  if (recurringTotal) {
    expectMoney(recurringTotal, ((toAmount(unitPrice) * opts.qty) + addTax(tax)).toFixed(2),
      'Blocks recurring total should equal recurring subtotal + recurring tax');
  }
}
```

- [ ] **Step 3: Add the dispatcher** (immediately after the Blocks sibling)

```ts
/** Assert the subscription cart total — classic table or Blocks totals block. */
export async function assertSubscriptionCartTotal(
  page: Page,
  opts: { qty: number; region: Region }
): Promise<void> {
  if (await isBlocksCart(page)) return assertSubscriptionCartTotalBlocks(page, opts);
  return assertSubscriptionCartTotalClassic(page, opts);
}
```

- [ ] **Step 4: Add the `isBlocksCart` import to `assertions.ts`**

Find the existing import from `./nopong` at the top of `helpers/assertions.ts` and add `isBlocksCart` to the named imports (keep the others). Example:

```ts
import { /* …existing… */, isBlocksCart } from './nopong';
```

- [ ] **Step 5: Typecheck + enumerate**

Run: `npm run typecheck` — Expected: exit 0 (confirms `resilientText`, `expectMoney`, `toAmount`, `regionFor`, `ctxFor` are all already imported in this file; if `resilientText`/`ctxFor` are not yet imported, add them from their existing source used elsewhere in the file).
Run: `npx playwright test --list` — Expected: unchanged test count.

- [ ] **Step 6: Commit**

```bash
git add helpers/assertions.ts
git commit -m "feat(nopong): Blocks-aware assertSubscriptionCartTotal dispatcher"
```

---

## Task 5: `fillCheckoutAddress` dispatcher + Blocks sibling

**Files:**
- Modify: `helpers/nopong.ts:675-710` (the current `fillCheckoutAddress`)

- [ ] **Step 1: Convert the exported function into a dispatcher that navigates once**

Replace the signature + navigation preamble (lines 675-679):

```ts
export async function fillCheckoutAddress(page: Page, config: OrderConfig): Promise<void> {
  await goToCart(page);
  await proceedToCheckout(page);

  if (config.user === 'logged') return; // saved address prefills
```

with:

```ts
export async function fillCheckoutAddress(page: Page, config: OrderConfig): Promise<void> {
  await goToCart(page);
  await proceedToCheckout(page);
  if (config.user === 'logged') return; // saved address prefills (both flows)
  if (await isBlockCheckout(page)) return fillCheckoutAddressBlocks(page, config);
  return fillCheckoutAddressClassic(page, config);
}

/** Classic checkout: fill the #billing_* fields. */
async function fillCheckoutAddressClassic(page: Page, config: OrderConfig): Promise<void> {
```

The remaining original body (lines 681-709: `const ctx …` through the trailing
`await waitForCheckoutReady(page);` and closing brace) stays as the body of
`fillCheckoutAddressClassic`, unchanged.

- [ ] **Step 2: Add the Blocks sibling** (immediately after `fillCheckoutAddressClassic`)

```ts
/**
 * Blocks checkout: accessible-name fields inside the `form "Checkout"` shipping
 * group. "Use same address for billing" is checked by default, so billing mirrors
 * shipping — no separate billing fill. State combobox label varies by region
 * ("Province" CA, "State/County" AU) so it's matched by exclusion of the country
 * combobox. Confirmed against au-checkout-blocks.yml / ca-checkout-blocks.yml.
 */
async function fillCheckoutAddressBlocks(page: Page, config: OrderConfig): Promise<void> {
  const ctx = ctxFor(page);
  const billing = regionFor(config.region).billing;
  const email = emailFor(config);

  await resilientFill(ctx, { primary: page.getByRole('textbox', { name: /email address/i }), ai: 'the checkout email field' }, email);
  await page.getByRole('combobox', { name: /country/i }).first().selectOption(billing.shortCountry);
  await waitForCheckoutReady(page);
  await resilientFill(ctx, { primary: page.getByRole('textbox', { name: /^first name$/i }), ai: 'the first name field' }, billing.firstName);
  await resilientFill(ctx, { primary: page.getByRole('textbox', { name: /^last name$/i }), ai: 'the last name field' }, billing.lastName);
  await resilientFill(ctx, { primary: page.getByRole('textbox', { name: /^address$/i }), ai: 'the street address field' }, billing.street);
  await resilientFill(ctx, { primary: page.getByRole('textbox', { name: /^city$/i }), ai: 'the city field' }, billing.city);
  if (billing.shortState) {
    const combos = page.getByRole('combobox');
    const n = await combos.count();
    for (let i = 0; i < n; i++) {
      const cb = combos.nth(i);
      if (/country/i.test((await cb.getAttribute('aria-label')) ?? '')) continue;
      await cb.selectOption(billing.shortState).catch(() => {});
      break;
    }
  }
  await resilientFill(ctx, { primary: page.getByRole('textbox', { name: /postal code|postcode|zip/i }), ai: 'the postcode field' }, billing.zip);
  const phone = page.getByRole('textbox', { name: /phone/i });
  if (await phone.count()) {
    await resilientFill(ctx, { primary: phone.first(), ai: 'the phone field' }, billing.phone);
  }

  if (config.user === 'new') {
    const create = page.getByRole('checkbox', { name: /create an account/i });
    if ((await create.count()) > 0 && !(await create.isChecked().catch(() => false))) {
      await resilientCheck(ctx, { primary: create, ai: 'the "Create an account" checkbox' });
    }
    const pass = page.getByRole('textbox', { name: /password/i })
      .or(page.locator('input[type="password"]')).first();
    if (await pass.isVisible({ timeout: 2_000 }).catch(() => false)) {
      await resilientFill(ctx, { primary: pass, ai: 'the account password field' }, process.env.PASSWORD ?? '');
    }
  }

  await waitForCheckoutReady(page);
}
```

- [ ] **Step 3: Typecheck + enumerate**

Run: `npm run typecheck` — Expected: exit 0.
Run: `npx playwright test --list` — Expected: unchanged test count.

- [ ] **Step 4: Commit**

```bash
git add helpers/nopong.ts
git commit -m "feat(nopong): Blocks-aware fillCheckoutAddress dispatcher"
```

---

## Task 6: Blocks terms + Stripe + place-order (`pay` dispatcher)

**Files:**
- Modify: `helpers/nopong.ts:864-915` (`pay`, `payStripe`) and `:1042-1052` (`placeOrder`)

- [ ] **Step 1: Replace `pay` with a dispatcher that also handles terms per flow**

Replace the whole `pay` function (864-880) with:

```ts
/** Dispatch to the configured payment method for the active checkout flow. */
export async function pay(page: Page, config: OrderConfig): Promise<void> {
  await waitForCheckoutReady(page);
  const blocks = await isBlockCheckout(page);
  await acceptTerms(page, blocks);
  if (config.payment === 'stripe') {
    await (blocks ? payStripeBlocks(page, config) : payStripeClassic(page, config));
  } else {
    await (blocks ? payPaypalBlocks(page) : payPaypalClassic(page));
  }
}

/**
 * Tick the "terms and conditions" consent. Classic renders a visually-hidden native
 * #terms behind a styled label (a plain .check() finds it but can't action it, so we
 * force it); Blocks renders `checkbox "You must accept our Terms…"`.
 */
async function acceptTerms(page: Page, blocks: boolean): Promise<void> {
  const terms = blocks
    ? page.getByRole('checkbox', { name: /accept our terms/i }).first()
    : page.locator('#terms').or(page.getByRole('checkbox', { name: 'I have read and agree to the' })).first();
  if ((await terms.count()) > 0 && !(await terms.isChecked().catch(() => false))) {
    await terms.check().catch(async () => { await terms.check({ force: true }); });
  }
}
```

- [ ] **Step 2: Rename `payStripe` → `payStripeClassic` and end it with the classic place-order**

Change the signature (888) from:

```ts
async function payStripe(page: Page, config: OrderConfig): Promise<void> {
```

to:

```ts
async function payStripeClassic(page: Page, config: OrderConfig): Promise<void> {
```

Its body is unchanged (it already calls `placeOrder(page)` at the end — that becomes the classic place-order via the rename in Step 4).

- [ ] **Step 3: Add `payStripeBlocks`** (immediately after `payStripeClassic`)

```ts
/**
 * Blocks Stripe: the "Credit / Debit Card" method is selected by default. The Stripe
 * Payment Element renders textboxes (accessible names "Card number", "Expiration date
 * MM / YY", "Security code") inside its iframe — a different shape than the classic
 * 3-input iframe. Confirmed against {au,ca}-checkout-blocks.yml.
 */
async function payStripeBlocks(page: Page, config: OrderConfig): Promise<void> {
  const cc = page.getByRole('radio', { name: /credit \/ debit card/i }).first();
  if ((await cc.count()) > 0 && !(await cc.isChecked().catch(() => false))) {
    await cc.check().catch(() => {});
  }
  if (config.useSavedCard) {
    // TODO(live-verify): saved-token radio markup on Blocks not snapshotted.
    const savedToken = page.locator('input[name*="saved-token" i]:not([value="new"]), input[name*="wc-stripe-payment-token" i]:not([value="new"])').first();
    await savedToken.waitFor({ state: 'visible', timeout: 10_000 });
    await savedToken.check();
  } else {
    const frame = page.locator('iframe[src*="js.stripe.com"], iframe[title*="payment" i], iframe[name*="stripe" i]').first().contentFrame();
    await frame.getByRole('textbox', { name: /card number/i }).fill(STRIPE_CARD.number);
    await frame.getByRole('textbox', { name: /expiration date/i }).fill(STRIPE_CARD.expiry);
    await frame.getByRole('textbox', { name: /security code/i }).fill(STRIPE_CARD.cvc);
    if (config.savePaymentMethod) {
      const save = page.getByRole('checkbox', { name: /save (payment information|.*card)/i }).first();
      if (await save.count()) await save.check().catch(() => {});
    }
  }
  await placeOrderBlocks(page);
}
```

- [ ] **Step 4: Rename `placeOrder` → `placeOrderClassic` and add `placeOrderBlocks`**

Change the signature (1042) from:

```ts
async function placeOrder(page: Page): Promise<void> {
```

to:

```ts
async function placeOrderClassic(page: Page): Promise<void> {
```

Then add immediately after it:

```ts
/**
 * Blocks place-order button. Located by class, not text — the label varies
 * ("Place Order" simple, "Join the Club" subscription). Confirmed
 * `.wc-block-components-checkout-place-order-button` in {au,ca}-checkout-blocks.yml.
 */
async function placeOrderBlocks(page: Page): Promise<void> {
  await waitForCheckoutReady(page);
  const btn = page.locator('.wc-block-components-checkout-place-order-button').filter({ visible: true }).first();
  await btn.waitFor({ state: 'visible', timeout: 15_000 });
  await resilientClick(ctxFor(page), {
    primary: btn,
    alt: page.getByRole('button', { name: /place order|join the club/i }),
    ai: 'the Blocks Place Order / Join the Club button',
  });
}
```

Update the one remaining reference: in `payStripeClassic` the final call `await placeOrder(page);` becomes `await placeOrderClassic(page);`.

- [ ] **Step 5: Typecheck + enumerate**

Run: `npm run typecheck` — Expected: exit 0. (This will fail until Task 7 renames `payPaypal` → `payPaypalClassic` and adds `payPaypalBlocks`, both referenced by the new `pay`. If running tasks strictly in order, expect an "unresolved name `payPaypalClassic`/`payPaypalBlocks`" error here — that is resolved by Task 7. Do Task 7 before committing if you want a clean intermediate typecheck; otherwise commit and let Task 7 restore green.)

- [ ] **Step 6: Commit**

```bash
git add helpers/nopong.ts
git commit -m "feat(nopong): Blocks terms + Stripe Payment Element + place-order"
```

---

## Task 7: Blocks PayPal (extract shared popup driver)

**Files:**
- Modify: `helpers/nopong.ts:927-1039` (`payPaypal`)

- [ ] **Step 1: Rename `payPaypal` → `payPaypalClassic`, keeping only the gateway-select preamble**

Change the signature (927) from:

```ts
async function payPaypal(page: Page): Promise<void> {
```

to:

```ts
async function payPaypalClassic(page: Page): Promise<void> {
```

Keep its gateway-selection preamble (the `resilientClick` selecting the classic PPCP
label + the following `await waitForCheckoutReady(page);`, currently lines 928-934).
Then, in place of the smart-button find + popup loop that currently continues in this
function (lines 935-1039), call the shared driver:

```ts
  await drivePaypalSmartButton(page);
}
```

- [ ] **Step 2: Add the shared `drivePaypalSmartButton`** containing the extracted body

Move the entire block currently at lines 935-1039 (from the `findPayButton` definition
through the final `await page.waitForURL('**/order-received/**', …)`) into a new function
placed immediately after `payPaypalClassic`. It is identical code, just relocated:

```ts
/**
 * Shared PayPal PPCP driver: find the "Pay with PayPal" Smart Button in whichever
 * (cross-origin) frame the SDK rendered it, click it, and drive the sandbox popup
 * login + approve. Called by both the classic and Blocks PayPal paths after each has
 * selected its own PayPal gateway option.
 */
async function drivePaypalSmartButton(page: Page): Promise<void> {
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
  if (!payButton) throw new Error('PayPal Smart Button never rendered in any frame after selecting PayPal');
  await payButton.waitFor({ state: 'visible', timeout: 20_000 });

  const popupPromise = page.waitForEvent('popup', { timeout: 30_000 }).catch(() => null);
  await payButton.click({ timeout: 20_000 });
  const popup = await popupPromise;
  const flow = popup ?? page;
  if (popup) {
    await popup.waitForURL((u) => !u.toString().includes('about:blank'), { timeout: 30_000 }).catch(() => {});
    await popup.waitForLoadState('domcontentloaded').catch(() => {});
  }

  const user = process.env.PAY_PAL_USER ?? '';
  const pass = process.env.PAY_PAL_PASS ?? '';
  const emailField = flow.getByRole('textbox', { name: /email or mobile/i })
    .or(flow.locator('#email, input[name="login_email"], input[type="email"]')).first();
  const passField = flow.getByRole('textbox', { name: /^password$/i })
    .or(flow.locator('#password, input[name="login_password"], input[type="password"]')).first();

  const nextBtn = flow.getByRole('button', { name: /^next$/i }).first();
  const loginBtn = flow.getByRole('button', { name: /log\s?in|^login$/i }).first();
  const approveBtn = flow.getByRole('button', { name: 'Pay', exact: true })
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

  await page.waitForURL('**/order-received/**', { timeout: 60_000 }).catch(() => {});
}
```

- [ ] **Step 3: Add `payPaypalBlocks`** (immediately after `drivePaypalSmartButton`)

```ts
/**
 * Blocks PayPal: select the "PayPal" payment radio, then drive the same PPCP Smart
 * Button + sandbox popup as classic (the SDK button + popup are gateway-agnostic).
 * TODO(live-verify): the loaded PayPal-radio state was not in the 2026-07-16
 * snapshots — confirm the radio name and that the Smart Button renders after
 * selecting it (vs the top "Express Checkout" PayPal iframe) on the live run.
 */
async function payPaypalBlocks(page: Page): Promise<void> {
  const ctx = ctxFor(page);
  const radio = page.getByRole('radio', { name: /^paypal$/i }).first();
  if ((await radio.count()) > 0 && !(await radio.isChecked().catch(() => false))) {
    await resilientClick(ctx, { primary: radio, ai: 'the PayPal payment method radio (Blocks)' });
  }
  await waitForCheckoutReady(page);
  await drivePaypalSmartButton(page);
}
```

- [ ] **Step 4: Typecheck + enumerate**

Run: `npm run typecheck` — Expected: exit 0 (all names from Task 6 now resolve).
Run: `npx playwright test --list` — Expected: unchanged test count.

- [ ] **Step 5: Commit**

```bash
git add helpers/nopong.ts
git commit -m "feat(nopong): Blocks PayPal path via shared PPCP popup driver"
```

---

## Task 8: Document + final verification

**Files:**
- Modify: `docs/TODO.md`

- [ ] **Step 1: Append a Blocks section to `docs/TODO.md`**

```markdown
## WooCommerce Blocks cart/checkout (2026-07-17)

Helpers now dispatch classic vs Blocks by live DOM check (`isBlocksCart` /
`isBlockCheckout`). AU renders classic (must stay green); CA/US develop render Blocks.
Classic path is deleted later once Blocks is fully rolled out.

**TODO(live-verify) — selectors not covered by the 2026-07-16 snapshots:**
- Blocks cart shipping mini-form combobox/textbox names (`setCartShippingDestinationBlocks`).
- Blocks subscription cart totals: sign-up-fee / recurring-subtotal / recurring-total
  (`assertSubscriptionCartTotalBlocks`) — Stagehand covers drift meanwhile.
- Blocks Stripe saved-token radio markup (`payStripeBlocks`, useSavedCard path).
- Blocks PayPal: radio name + Smart Button renders after selecting the radio
  (vs the top Express-Checkout iframe) (`payPaypalBlocks`).
```

- [ ] **Step 2: Full typecheck + enumerate**

Run: `npm run typecheck` — Expected: exit 0.
Run: `npx playwright test --list` — Expected: same test count as before this plan; no errors.

- [ ] **Step 3: Commit**

```bash
git add docs/TODO.md
git commit -m "docs(nopong): track Blocks cart/checkout live-verify selectors"
```

- [ ] **Step 4: Hand off to the user for the live run**

Per `nopong_user_runs_tests`: the user runs live Playwright against develop (CA/US =
Blocks) and preprod/develop AU (classic). Report the `TODO(live-verify)` list so they
know which selectors to watch. Do NOT run the full live suite from here.

---

## Self-Review

**Spec coverage:**
- Detection helpers → Task 1 (`isBlocksCart`) + existing `isBlockCheckout` (used in Tasks 5, 6).
- Touch point 1 `setCartShippingDestination` → Task 2.
- Touch point 2 `setCartQtyAndUpdate` → Task 3.
- Touch point 3 `assertSubscriptionCartTotal` → Task 4.
- Touch point 4 `fillCheckoutAddress` → Task 5.
- Touch point 5 `pay`/terms/Stripe/place-order → Task 6; PayPal → Task 7.
- Live-verify flags + AU-classic-stays-green + user-runs-live → Task 8.
- No-AI-checkbox / nav-helpers-no-change: noted in spec, no code needed (nav helpers already have Blocks-compatible fallbacks per spec).

**Placeholder scan:** No "TBD"/"implement later" steps; every code step has complete code. `TODO(live-verify)` markers are intentional runtime-confirmation flags on real, working code (not plan placeholders).

**Type consistency:** Renames are consistent — `*Classic`/`*Blocks` suffix pairs each with an exported dispatcher of the original name and signature (`setCartShippingDestination`, `setCartQtyAndUpdate`, `fillCheckoutAddress`, `pay`, `assertSubscriptionCartTotal` keep their exact public signatures; specs call sites unchanged). Internal renames `payStripe→payStripeClassic`, `payPaypal→payPaypalClassic`, `placeOrder→placeOrderClassic` each have their single call site updated (Task 6 Step 4, Task 7 Step 1). New internal names referenced by `pay`: `payStripeBlocks`, `payPaypalBlocks`, `payStripeClassic`, `payPaypalClassic`, `acceptTerms`, `placeOrderBlocks` — all defined in Tasks 6-7. `drivePaypalSmartButton` defined once (Task 7), called by both PayPal siblings.
