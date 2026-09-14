# Baseline suite — what every WooCommerce site gets before you explore it

The explore pass tells you what is DIFFERENT about a site. This list is what is the same about all
of them: the paths a WooCommerce store has whether or not anyone mentioned them, and the ones that
cost money when they break.

Use it twice. At triage, as the floor — a site missing one of these has a gap, not a short suite.
At handoff, as the ledger — every row here is either a spec id or a reason.

Built from 12 migrations (Sept 2026); the "found by" column names the site where the row stopped
being theoretical.

## P0 — money

| # | Case | Asserts | Found by |
|---|---|---|---|
| 1 | **Guest purchase, real gateway** | The [surface matrix](../refactor-wc-automation.prompt.md#surface-matrix) in full: product, line total, every totals row, both addresses, payment method + transaction id, gateway order note, and the customer e-mail OPENED in `emailPage` | every site |
| 2 | **Declined card** | The checkout SAYS why, no order is created, and the cart SURVIVES — an emptied cart under a failed payment is how a customer pays twice | raven-rocks |
| 3 | **Variable product purchase** | The variation's price survives PDP → cart → checkout → thank-you. Catalogue-driven, never pinned ([dont-eat-your-fixture](../refactor-wc-automation.prompt.md#dont-eat-your-fixture)) | raven-rocks |
| 4 | **Shipping + tax quote** | What the customer is quoted is what they are charged, and the total ADDS UP. Include the free-shipping threshold if the site advertises one: buy just over it | raven-rocks |
| 5 | **Refund through the gateway** | Exactly ONE reversal at the gateway, the status moves, the refunded figure renders — and the failure mode of the site's own refund plugins is named | raven-rocks, 2m |
| 6 | **Cart** | Add, change quantity, remove; totals recalculate; empty cart renders | every site |

## P1 — the customer's account and the paths around the checkout

| # | Case | Asserts | Found by |
|---|---|---|---|
| 7 | **Login** | The site's own redirect lands somewhere sensible and My Account renders the orders table — the cheapest detector for a 2FA/security plugin catching a role it should not | raven-rocks |
| 8 | **Registration** | An account is created and the visitor ends up signed in. Captcha-gated? [captcha-policy](../refactor-wc-automation.prompt.md#captcha-policy) | raven-rocks |
| 9 | **Password reset** | Requested, link followed from the mail, new password set — then log OUT and back IN with it ([assert-from-a-fresh-state](../refactor-wc-automation.prompt.md#assert-from-a-fresh-state)) | raven-rocks |
| 10 | **Search** | A known term returns the product. Whatever plugin owns search, this is how a customer reaches a product without the menu | raven-rocks |
| 11 | **Catalogue filter** | The filter narrows, and asking for two different states returns different products | raven-rocks |
| 12 | **AJAX add to cart from a listing** | No navigation, and the header count MOVES — a silent add is how a customer buys three of everything | raven-rocks |
| 13 | **Contact form** | Sent end to end where the captcha allows it; otherwise the contract: every field still collected, the guard still present, an empty submit still refused | raven-rocks |
| 14 | **Out-of-stock behaviour** | The PDP says so, and whatever the site offers instead (a restock signup, a backorder) works | raven-rocks |

## P1 — the merchant's side

| # | Case | Asserts | Found by |
|---|---|---|---|
| 15 | **Order documents** | Invoice and packing slip come back as real PDFs (magic bytes, not status codes), plus the two other shapes: attached to a transactional mail, and the credit note on a refunded order. An absent one is a finding to ledger | raven-rocks |
| 16 | **Order e-mails beyond the first** | Whatever the shop actually sends on completion/refund, opened in the trap | harmony |
| 17 | **Any admin screen the client paid for** | A custom panel, an export, a bulk action: assert the happy path AND that a role without the capability is refused at BOTH the screen and its endpoint | raven-rocks |

## P2 — the suite's own safety net

| # | Case | Asserts | Found by |
|---|---|---|---|
| 18 | **`@visual` sweep** | Home, shop, my-account, a PDP of EACH product shape, any landing page the client republishes, and the header/footer as ELEMENT shots — theme-builder chrome moves first and a full-page shot buries it | raven-rocks, melon |
| 19 | **Patched vulnerabilities** | Where a patch is re-applied on every build (composer-patches), probe the sink directly: it can stop applying silently | raven-rocks |
| 20 | **Security-relevant file storage** | Anything the site writes for download (exports, invoices, logs): reachable for the admin, refused for everyone, and no directory listing anywhere | raven-rocks |

## Deliberately NOT on this list

- Anything needing a fixture that does not exist yet (B2B/wholesale pricing tiers, store credit, a
  subscription) — name it in the handoff with what it needs, and let the client decide.
- One-off structural checks (a theme switch, a test-mode flip): they are not regression surface.
- A negative control you have not verified the mechanism of
  ([gi-negative-controls](../refactor-wc-automation.prompt.md#gi-negative-controls)).
