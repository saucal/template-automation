# Exploration: PLS staging (pls-maintenance.mystagingwebsite.com)
**Captured:** 2026-07-08 · order O-08924 (post 26773) placed + refunded live during exploration

## Stack
- Theme: **Kadence** (+ kadence-blocks / shop-kit / pro). **No Elementor** — GI Elementor selectors are dead; Kadence `.kb-adv-form-*` are live.
- Checkout: **WC Blocks** wrapped by custom `pls-core` 4-step wizard `.pls-checkout-steps` (1 Billing / 2 Participants / 3 Payment / 4 Confirmation), nav `button.pls-checkout-steps__nav-btn--next` / `--prev`, step tabs `button.pls-checkout-steps__step` (clickable to go back), active = `.pls-checkout-steps__step--active`.
- Payment: **woocommerce-gateway-stripe** Payment Element — ONE iframe `iframe[src*="js.stripe.com"]` with role textboxes "Card number" / "Expiration date MM / YY" / "Security code". 4242… card. Radio label "Payment methods Test Mode".
- Subscriptions: woocommerce-subscriptions (+ custom-price-string). Products are subscription / variable-subscription.
- Order numbers: **wt-woocommerce-sequential-order-numbers** → display number `O-08924` ≠ post ID. Admin heading "Order #O-08924 details". Find order by displayed number, not URL id.
- Translation: **Weglot** (`/es/` prefix).
- Email: post-smtp → **Playgrounds Mailpit** (mail.playgrounds.saucal.io) — instant delivery, no ESP lag. Use `@playgrounds.saucal.io` recipients.
- Other: woocommerce-smart-coupons (My Account "Coupons" tab), sensei-pro-wc-paid-courses (My Account "Courses"), woocommerce-to-zoom (webinar registrant when location=Internet), follow-up-emails/automatewoo ("Email queued: Subscription is ending" notes), Wordfence + invisible reCAPTCHA badge on login page.

## Catalogue (all-courses)
- `ul.products > li` classes: `product-type-subscription`, `product-type-variable-subscription`, also `product-type-variable`, `product-type-simple`. GI picked combined index [2] → "Medical Errors…". Pick behaviorally: first `.instock.product-type-variable-subscription` with `#pa_choose-subscription_period` options (7days present) and price > 0.
- PDP (variable subscription): select `#pa_choose-subscription_period` = `7days` ("7 Days"), qty = plain `input.qty` (name=quantity) — NO `#pl_subscriptions_quantity`, NO PDP recipient fields (participants moved to checkout wizard). Add button: "Sign up now" (`.single_add_to_cart_button`). Variation price `.woocommerce-variation-price` = "$18.00 for 1 week".
- Attributes table `table.woocommerce-product-attributes` rows: pa_ceus, pa_choose-subscription_period, pa_intended-audience, pa_teaching-method, pa_course-materials. (No pa_date/pa_time/pa_location on this product; location=Internet → downloads + Zoom fields on other products.)

## Add-to-cart → cart
- Add opens a **cart drawer** (`#cart-drawer` popup-drawer; `.drawer-overlay` intercepts page clicks). Click drawer's "View cart" link (inside #cart-drawer) — the page-level alert "View cart" is覆 blocked by the overlay.
- Cart: 1 line "«Product» - 7 Days", `td.product-price` $18.00, qty input =3, `.subscription-price` in line = $54.00 (= qty×unit, matches multiStep GI branch), `tr.cart-subtotal` $54.00, `tr.order-total` $54.00. **No tax row, no shipping row, no recurring-totals section** (virtual subscription, price constant).
- "Proceed to checkout" = `a.checkout-button`.

## Checkout wizard details
- Step 1 Billing (blocks): `#email`, `#billing-first_name`, `#billing-pls-core-middle_name` ("Middle Name (optional)"), `#billing-last_name`, `#billing-company`, `#billing-address_1`, `#billing-address_2` (visible, no toggle needed), `#billing-city`, `#billing-country`, `#billing-state`, `#billing-postcode`, `#billing-phone`.
  - **Country defaults by geo-IP (AR!). Select country US FIRST** — changing country re-renders state select (ref invalidated) and **CLEARS postcode + phone**; label becomes "ZIP Code". Then state FL. Next silently no-ops while required fields empty (no visible validation error).
- Step 2 Participants: qty=3 → 3 groups. P1 has checkbox "Use billing name as participant 1" (auto-fills name/email/phone from billing; then only Credentials needed). Fields per group: `.pls-field-first_name/middle_name/last_name/email/phone input` (+ `.pls-field-credentials select[aria-label="Credentials"]`). Input ids `#textinput-N` are unstable — use class/label locators. Credentials options (14): Admin, CDA, CRDH, DA, DDS, DH, DMD, FTD, O.Mgr, RDA, RDH, Recptn, RN, Other.
- Step 3 Payment: Stripe Payment Element iframe (see above).
- Step 4 Confirmation: order summary (blocks), "Course Participants" review (`.pls-participant-course…`) with Edit button, checkbox "Add a note to your order" reveals textarea "Notes about your order." → "Testing Notes", button "Place Order".

## Thank-you (order-received/26773)
- `.order strong` = O-08924; Email / Total $54.00 / Payment method "Credit / Debit Card" rows.
- Order details table: ONE line item "«name» - 7 Days × 3" with `.pls-confirmation-summary__participant` blocks (Participant #N / Full Name: First Mid Last / Email / Credentials / Phone).
- tfoot: Subtotal $54.00 · Payment method: Credit / Debit Card · Total $54.00 · Note: Testing Notes.
- Related subscriptions table: **3 subscriptions** (#26774-76), one per participant, each "Active — $18.00".
- Customer address block: "QA Mid Explore / Testing Inc. / 123 False / Miami, FL 33126 / phone / email" (includes middle name).
- Guest is **auto-logged-in** as the new account after purchase (body.logged-in) — passwordless account creation.

## Emails (Mailpit, instant)
- Purchaser: "Professional Learning Services Order Confirmation O-08924" + "Your Professional Learning Services account has been created!"
- Participants 2/3: "Your Professional Learning Services account has been created!" + "Your new course at Professional Learning Services"
- Refund: "Your Professional Learning Services order #O-08924 has been refunded"

## Admin (saucal_maintenance_admin — No Pong ADMIN_PASS works)
- Order editor: status select2 "Completed" (auto-completes — virtual), meta "Payment via Credit / Debit Card (ch_…). Paid on …", billing block includes "Middle Name: Mid", customer note "Testing Notes", line item ×3 cost $54.00 with participants div, totals: Items Subtotal $54.00 / Order Total / Paid / Stripe Fee / Stripe Payout.
- Refund: button `.refund-items` → fill `input.refund_order_item_qty` = 3. **Playwright fill alone did NOT trigger WC recalcs — needed an explicit change event dispatch; poll `#refund_amount` > 0.** Reason field. Submit button text "Refund $54.00 via **Stripe**" (`button.do-api-refund`). Native confirm dialog "Are you sure you wish to process this refund?…" must be accepted. → status Refunded, `tr.refund td.line_cost` -$54.00, refunded-total -$54.00.
- Refund note: `Refunded $54.00 – Refund ID: re_… – Reason: Testing Refund` (en-dash –). Also "Stripe charge complete (Charge ID: ch_…)".

## My Account (logged-in customer)
- Tabs incl. Orders, Subscriptions, Coupons (smart-coupons "Available Coupons & Store Credits"), Courses link `a[href*="/my-courses"]` "Access your active on-demand webinars", Addresses, Payment methods, Account details.
- Login page: standard WC `form.woocommerce-form-login` #username/#password, lost-password link; NO register form; invisible reCAPTCHA badge present (grecaptcha-badge).
- Lost password: `form.woocommerce-ResetPassword` #user_login, copy "Lost your password? Please enter your username or email address…".

## Basic pages
- CE-by-state `/state-continuing-education/`: `#csearch` is a **SELECT** (name=csearch, values AL/AK/…/FL) in `form.search-courses-form` + submit.
- Contact `/contact-us/`: Kadence advanced form; labels First Name*, Last Name*, Professional Title*, Email*, Phone*, Subject* (name=subject_field), Message*; submit "Submit"; success `.kb-adv-form-message.kb-adv-form-success` = "Submission Success, Thanks for getting in touch!".
- Menu: Primary nav with "Courses" child menu (hover) → "All CE Courses" /all-courses/, "CE Requirements by State" /state-continuing-education/; Private CE /consulting/; FAQ → About /about/, Policies /policies/; Blog /blog/; Contact /contact-us/; My account; EN/ES switcher (Weglot /es/).
