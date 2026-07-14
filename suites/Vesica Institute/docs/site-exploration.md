# Pur Crystal staging — live-exploration (PC-2)

**Host:** https://stg-purcrystal-staging.kinsta.cloud/ · Elementor theme · Auth.Net + PPCP + AvaTax (same stack as Vesica). Admin creds = same `saucal_maintenance_admin` (verified logs in).

## Order flow (GI PC User)
- Product: first **`li.instock.product-type-simple`** in `crystals-minerals/meteorite/` → e.g. "Meteorite, Muonionalusta… Pendants" ($179). PDP has `input.qty` / `input[name=quantity]`.
- **qty = 2** (fill quantity on the PDP before add-to-cart). Cart subtotal = unitPrice × qty (GI `calculateSubtotal`).
- Add to cart → click **"View cart"** link (not auto-redirect).
- Checkout payment radios: **`ppcp-card-button-gateway` is DEFAULT-checked**, plus `authorize_net_aim_emulation` + `ppcp-gateway`. GI selects **Auth.Net explicitly** (`#payment_method_authorize_net_aim_emulation`). Card is **TEST-MODE PREFILLED** (`4007 0000 0002 7`).
- **Ship-to-different-address** (`#ship-to-different-address-checkbox`) → fill `#shipping_*` (company "Shipping Inc.", address_2 "AP. Shipping"). → **TWO address blocks** on order-received / admin / email (`.woocommerce-column--1` billing, `--2` shipping).
- Billing: Miami FL (state FL / Florida), zip 33126. Physical product → shipping method required + AvaTax tax.
- Status after order = **Processing** (physical; no membership).
- Order-received/backend/My-Account asserts: product "× qty", product-total = subtotal, subtotal/shipping/tax/CC/total rows, both address blocks. (GI selectors mirror Vesica + col--2 shipping.)

## Refund (GI test 04 "Refund by Admin")
- Admin order editor → refund-items → fill item qty + shipping line total + shipping tax cols → click the gateway refund button (`button.button-primary` = do-api-refund; GI expects it). **Verify live whether Auth.Net here exposes do-api-refund or only do-manual-refund** — `performRefund(preferApi:true)` falls back to manual. Assert status Refunded + refund row −total + refunded-total.

## Guest suite (13) — nav slugs
- Home `/` · Crystals-Minerals (Shop / A-Z) `/crystals-minerals/` · Articles `/blog/category/articles/` · Contact `/contact/` (form `#form-field-name/email/message` + submit → "…Sent").
- Category = a `/crystals-minerals/<cat>/` (e.g. meteorite); Mineral / Article = specific pages (clicked from listing — grab slugs at build/live).
- Simple product (meteorite pendant), Variable product (`meteorite-small-chunks` — product-type-variable, needs variation select). Cart/Checkout covered by the order flow. GI 13 = "Featured in … Course" page.

## No: membership, PayPal (as a place-order path), register, forgot-password. CC-only, guest→ship-to-different.
