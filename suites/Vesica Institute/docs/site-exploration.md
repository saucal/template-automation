# Vesica staging — live-exploration findings (Task 0)

**Host:** https://stg-vesica-staging.kinsta.cloud/ (Kinsta) · **Theme:** Elementor (GI selectors mostly still valid)
**Captured:** 2026-07-11 (partial — admin/refund/PayPal/email still pending, see bottom)

## Nav (home)
Header links: Home, About, Courses, Articles, Shop, Members, Contact; Cart = `link "$0.00 Cart"`. Login/Register link present. CookieYes banner script loads but errors on staging URL mismatch (likely inert — confirm it doesn't block clicks).

## Shop / products
- `/shop/` is a **category index** (not product grid). Categories incl "Vesica Shop", "All Products", "BioGeometry® Tools for the Public", etc.
- Product archives list **simple products as AJAX add-to-cart links**: `/<category>/?add-to-cart=<id>` (text "Add to cart"). e.g. category `product-category/vesica-shop/biogeometry/biogeometry-tools-for-the-public/` → BG Notebooks id **127660** ($24), Olive Wood BG Plates **129891** ($100), BG Building Blocks **127... ** ($64).
- Adding `/?add-to-cart=<id>` redirects to `/cart/`.
- GI order flow (from generated): goto `/` → click shop nav (`a[href*="/vesica-shop/"]` or `product-category/all-products/`) → first `button[name="add-to-cart"]` (single-product page) OR the archive add-to-cart link → "Proceed to checkout" (`a[href*="/checkout/"]`).

## Checkout (`/checkout/`) — CLASSIC WooCommerce
- Payment radios `input[name=payment_method]`: **`authorize_net_aim_emulation`** (checked default = CC) + **`ppcp-gateway`** (PayPal PPCP).
- **Auth.Net AIM emulation is in TEST MODE and PREFILLS the card** (banner "TEST MODE ENABLED"): 
  - `#wc-authorize-net-aim-emulation-account-number` = `4007 0000 0002 7`
  - `#wc-authorize-net-aim-emulation-expiry` = `01 / 27`
  - `#wc-authorize-net-aim-emulation-csc` = `123`
  - → **place-order = check `#terms` then click `#place_order`. NO card typing.**
- `#place_order` (name `woocommerce_checkout_place_order`, text "Place order"), starts enabled.
- `#terms` checkbox (required) + hidden `terms-field`.
- **reCAPTCHA present** (google api2, key `6LdvulAsAAAA...`) — did NOT block a headless submit in exploration, but fixtures prime `?sc_bypass=1` (SAU/CAL bypass) for safety.
- Billing fields (classic select2): `#billing_first_name/last_name/company/country/address_1/address_2/city/state/postcode/phone/email` + `#billing_wc_avatax_vat_id`. Shipping mirror `#shipping_*`. **WC AvaTax** computes tax (address-dependent; was $0.00 for CA test addr). Shipping method radios `#shipping_method_0_*`.
- Checkout review totals rows: `.cart-subtotal`, `.woocommerce-shipping-totals.shipping`, `.tax-total`, `.order-total`.

## Order-received (placed live: order **153814**)
- Order number: `.woocommerce-order-overview__order.order strong`
- **Payment label** `Credit Card`: `.woocommerce-order-overview__payment-method strong`
- Totals: `.woocommerce-table--order-details tfoot tr` (th | td) → Subtotal / Shipping (`$X via <method>`) / Tax / Payment method / Total.
- Billing block: `.woocommerce-column--billing-address address` (name / street / "City, ST ZIP" / phone / email).
- Product name: `.woocommerce-table--order-details td.product-name a`.
- Example capture: subtotal $24.00, shipping $16.37 via USPS Priority Mail, tax $0.00, total $40.37.

## Admin
- **Legacy `post.php?post=<id>&action=edit`** editor (from generated GI) — NOT HPOS `admin.php?page=wc-orders`. Order list `edit.php?post_type=shop_order`.
- Login = standard `#user_login`/`#user_pass`/`#wp-submit` (no SSO seen). admin-login.ts handles it.

## Payments / accounts (from generated GI, live-confirm pending)
- **PayPal PPCP** sandbox (client-id `AVN7N7w8...`, env sandbox) — smart buttons + card funding; popup flow like No Pong.
- New-user CC: order as guest → passwordless account auto-created → "Click here to set your new password" email → `#password_1`/`#password_2`. Same set-password page as forgot-password.
- GI emailed via `email.ghostinspector.com` → **migrate to Playgrounds** (`mail.playgrounds.saucal.io`); confirm redirect plugin active on Kinsta.

## Admin editor (order 153814, legacy post.php) — CAPTURED 2026-07-13
- Login: `#user_login`/`#user_pass`/`#wp-submit` (or role textboxes "Username or Email Address"/"Password" + "Log In" button). No SSO/2FA. Confirm-email interstitial not seen.
- `#order_status` select, value `wc-processing`.
- Payment method meta: dropdown with "Payment method: … Credit Card/PayPal/Other".
- **Order notes** (`#woocommerce-order-notes li .note_content` / `.order_notes li .note_content`), CC gateway notes:
  - `Payment via Credit Card (80057161678).` → regex `/Payment via Credit Card \(\d+\)/`
  - `Authorize.Net Emulation – Credit Card Test Charge Approved: Visa ending in 0027` (en-dash)
  - plus "Email 'Processing order' sent", "Email 'New order' sent", AvaTax + stock notes.
- **Refund form** (`button.refund-items` → opens): `input.refund_order_item_qty` (fill + bubbling `change` → recomputes), `#refund_amount`, `input.refund_line_total` (2). Buttons: `button.do-manual-refund` ("Refund $X manually") + `.cancel-action`. **Auth.Net AIM emulation = MANUAL refund ONLY (no `do-api-refund`, no void)** → a CC refund goes to status **Refunded** via manual refund. (Filling item qty=1 → `#refund_amount`=24.00; shipping row separate. Order left UNMODIFIED — no refund submitted.)

## Email (Playgrounds) — CONFIRMED 2026-07-13
- Generated emails MUST use **@playgrounds.saucal.io** (the SAU/CAL trap inbox `findEmail` searches). `@saucal.com` does NOT land.
- Emails route through an **ESP (SMTP.com) that REWRITES links as tracking redirects** (`https://track.smtpsendemail.com/…` → real kinsta URL). So the direct reset URL never appears in the body — extract the **"Click here to set your new password"** anchor href (tracking URL) and let `goto` follow the redirect (handled in `resetLinkFromEmail`).
- Account-created email headline: "Welcome to the Vesica Institute for Holistic Studies". Expect ESP delivery lag/reorder → poll window widened (findEmail 40×3s=120s).

## STILL PENDING (build-time / first-run capture)
1. **PayPal PPCP** place-order (sandbox popup) + its refund — Vesica's refund test (User 02) is on the PayPal order, NOT CC. PPCP likely has `button.do-api-refund` ("Refund $X via PayPal"). Capture when placing a PayPal order (needs sandbox login loop, No Pong pattern).
2. Playgrounds email plugin active on Kinsta? (register + refund-email + set-password link).
3. Register / forgot-password `#password_1`/`#password_2` set-password flow + reCAPTCHA on standalone register.
4. Pur Crystal — separate branch, its own Task 0 (incl Auth.Net CC "Refund by Admin" — manual refund confirmed above applies there).
