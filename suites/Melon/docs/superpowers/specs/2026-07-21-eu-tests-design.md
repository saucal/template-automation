# EU test suite — design

**Goal:** GI parity for the EU (`/eu/`, Germany, EUR) site, mirroring the refactored UK split-spec structure and reusing the region-parameterized helpers.

## GI source coverage
- **Basic WooCommerce Test – EU Site:** 01 Home, 02 Accessories, 02 Bike Menu, 03 Product, 04 Cart, 05 Checkout, 05 Checkout required-fields, 07 Register/Login, 08 Forgot password, 09 Slider (FOLD), 10 Place order No-Upsell.
- **Place order – EU Site:** 01 Place order No-Upsell, 03 Email.

## Specs to create (`specs/eu/`)
- `basic/home.spec.ts` — land `/eu/`, title "…Melon Optics EU", country DE, currency EUR. (DE→/eu/ redirect already covered by the UK home country-switch matrix — not duplicated.)
- `basic/navigation.spec.ts` — Accessories via **Extras** trigger; Bike menu-open FOLDED (like UK Sunglasses smoke).
- `basic/product.spec.ts` — composite goggle via **Bike** trigger.
- `basic/cart.spec.ts` — cart totals (EUR).
- `basic/checkout.spec.ts` — WFACP + Stripe, **DE address**, + required-fields.
- `basic/account.spec.ts` — register/login/nav (reuse account helpers).
- `basic/forgot-password.spec.ts` — reuse.
- `orders/place-order.spec.ts` — single **No-Upsell** case + receipt email.

Skip: 09 Slider (folded). 10 Place-order-in-basic → folds into orders spec (as UK).

## EU deltas confirmed live (staging, 2026-07-21)
| Delta | Finding | Handling |
|---|---|---|
| Currency format | `€80,00` — **comma decimal**, dot thousands (`€1.234,56`) | Fix `money()` to be separator-aware (last of `.`/`,` = decimal, strip others). Must keep UK `£1,234.50` working. |
| Tax | VAT-inclusive: Subtotal €80,00, Total €85,94 incl €13,72 "GERMANY OSS TAX" | Total = subtotal + shipping STILL holds (VAT inside subtotal) → **no total-math branch**, only comma parsing. Never compute tax. |
| Country default | Runner IP → **Austria (AT)** ("Collect @ Melon Innsbruck Store") | Force **DE** in checkout (like UK forces GB). |
| Shipping (DE) | "Express Tracked Delivery €5,94", single method | Auto-selected; no free-ship / no local-pickup default. |
| Nav triggers | Top menu: Bike, Snow, Sunglasses, Extras, LTD | goggles=**Bike**, accessories=**Extras** (category `accessories`). |
| Product | `diablo-mtb-goggles` present on `/eu/`, same preset attrs | reuse `COMPOSITE_GOGGLE` preset; EU price €80. |
| Upsell | GI EU = No Upsell | `handleUpsell` no-ops when no offer; orders spec = single no-upsell case. |
| Email subject | "Your Melon Optics **EU** order receipt from" | region-specific subject. |

## Config / helper changes
- `helpers/melon.ts` `money()`: separator-aware parse (EU comma decimals) — re-run UK to confirm no regression.
- `helpers/melon.ts`: `EU_MENU_NAVS = [{name:'Accessories', trigger:'Extras', category:'accessories'}]`; EU goggles product with `menuTrigger:'Bike'` (region-aware product const, e.g. `EU_PRODUCTS`).
- `helpers/orders.ts` `makeCustomer`: add a **DE customer** (German name/address/postcode/phone, countryName "Germany") — currently UK-only.
- `orders/place-order.spec.ts` (EU): receipt subject "Your Melon Optics EU order receipt from".
- No `taxInclusive` flag added (YAGNI — total math unchanged).

## Test runs
Build against maintenance project; explore/confirm on staging. First live run confirms EU email subject + no-upsell funnel end-to-end.
