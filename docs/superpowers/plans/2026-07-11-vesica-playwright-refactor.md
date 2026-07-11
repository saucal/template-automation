# Vesica Institute GI → Playwright Refactor — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrate the `Vesica Institute` GI suite (2 brands × Guest/User) into a clean, config-driven Playwright project inside `suites/Vesica Institute/`, preserving full GI parity. Vesica brand first as the proven reference, then Pur Crystal.

> **AMENDMENT 2026-07-11 — two-branch split.** Vesica and Pur Crystal ship in **two separate branches**, each a single-brand self-contained project with the core DUPLICATED. This plan now covers the **Vesica brand only** (Tasks 0–7, 9). **Task 8 (Pur Crystal) is REMOVED from this plan** → Pur Crystal gets its own branch (`feat/purcrystal-playwright-refactor`) + own plan, built by duplicating this branch's core after Vesica is green. Single Playwright project per branch (`BASE_URL`), `Brand` is a single literal.

**Architecture:** Self-contained single-brand project (PLS pattern), one Playwright project per branch (one Kinsta host). DOM-first (no WC REST). Capture-once parity across thank-you · My Account · email · admin. Auth.Net CC (test-gateway prefill) + PayPal PPCP popup. Every action/assertion through a resilient Playwright→Stagehand wrapper; every `expect()` in `assertions.ts`.

**Tech Stack:** `@playwright/test`, `@woocommerce/e2e-utils-playwright`, `dotenv`, `@browserbasehq/stagehand`, TypeScript. Node 24.

**Design spec:** `docs/superpowers/specs/2026-07-11-vesica-playwright-refactor-design.md`
**Reference impls (copy/adapt, do NOT re-derive):**
- PLS — `../pls/suites/PLS/{helpers,fixtures,types,admin-login.ts,playwright.config.ts}` (in-suites layout, DOM-first, lazy auth, refund, Playgrounds email)
- No Pong — `../../no-pong-automation/{helpers,fixtures}` (parity matrix, PayPal PPCP loop, resilient+Stagehand, brand/region-as-project)
- Templates — `prompts/templates/*.ts`
- GI-flattened reference — `suites/Vesica Institute/generated/` (read-only; the parity source)

**Verification gates (this domain has no unit tests):**
- `tsc --noEmit` clean after every code task.
- `npx playwright test --list` enumerates the expected tests.
- Live Playwright run is done by the USER at the end (per project convention) — do NOT claim green from tsc alone.

**Working dir:** `suites/Vesica Institute/` in worktree `.worktrees/vesica`, branch `feat/vesica-playwright-refactor`. Commit after each task.

---

### Task 0: Live-exploration of both staging sites (MANDATORY — precedes code)

**Files:**
- Create: `suites/Vesica Institute/docs/site-exploration.md`

Per canonical rule "GI export is source of truth + live-explore before writing code." Selectors in this plan's later tasks are finalized HERE, not guessed.

- [ ] **Step 1:** Confirm creds in `.env` resolve — admin login to both `stg-vesica-staging.kinsta.cloud` and `stg-purcrystal-staging.kinsta.cloud` wp-admin via playwright-cli.
- [ ] **Step 2:** Vesica: navigate home → shop → product → cart → checkout. Record: theme, add-to-cart selector, mini-cart/drawer behavior, cart→checkout click path, whether checkout renders in `#wcp-checkout-iframe`, the Auth.Net "Credit Card" radio + whether card fields prefill, `#place_order` enable behavior.
- [ ] **Step 3:** Vesica: capture order-received DOM shape (totals table classes, billing block, `.method > strong` payment label). Place one CC order end-to-end manually via CLI; record admin order-editor selectors (status container `#select2-order_status-container`, `.woocommerce-order-data__meta`, order-notes container), refund form (`input.refund_order_item_qty`, `#refund_amount`, refund button label, whether Auth.Net refunds→Refunded or voids→Cancelled, the exact note text).
- [ ] **Step 4:** Vesica: confirm PayPal PPCP smart-button frame + sandbox popup flow; confirm the passwordless "set your new password" email + `#password_1/2`; check reCAPTCHA on register; confirm courses/members pages (product vs membership — affects nothing if no subscription assertions).
- [ ] **Step 5:** Confirm Playgrounds email-redirect plugin active on BOTH hosts (`mail.playgrounds.saucal.io`), filtered by site title. Record poll expectations (local trap vs ESP lag).
- [ ] **Step 6:** Pur Crystal: repeat 2–3 briefly — variable-product variation selectors, contact-form (`submit-contact`), per-brand product/page slugs+IDs (NEVER reuse Vesica IDs).
- [ ] **Step 7:** Write all findings to `docs/site-exploration.md` (selectors, IDs, gotchas, the refund-vs-void answer). Commit.

Verification: `docs/site-exploration.md` exists with concrete selectors + the open-question answers from the design's "Out of scope / confirm" list.

Commit: `docs(vesica): live site-exploration findings for both brands`

---

### Task 1: Project scaffold (package.json, tsconfig, config, .env, .gitignore)

**Files:**
- Modify: `suites/Vesica Institute/package.json` (migrate-gi seeded it — align to rule 10)
- Create/Modify: `suites/Vesica Institute/tsconfig.json`, `playwright.config.ts`, `.env.example`, `.gitignore`

- [ ] **Step 1:** Set `package.json` deps per rule 10 (`@woocommerce/e2e-utils-playwright ^0.4.0`, `dotenv`; dev: `@babel/runtime ^7.29.2`, `@playwright/test ^1.59.1`, `@types/node`, `typescript`, `@browserbasehq/stagehand`, `playwright-core`, `zod`). Scripts: `test`, `test:basic`, `test:orders`, `setup:browsers`, `typecheck`, `lint:plugin-tags`. Adapt from `../pls/suites/PLS/package.json`.
- [ ] **Step 2:** `playwright.config.ts` from `prompts/templates/playwright.config.ts` + No Pong brand-project pattern: two projects `vesica`/`purcrystal` from a `BRANDS` map with `baseUrlFor(brand)`; `fullyParallel:false`, `workers:2`, 240s test / 15s expect, `trace/video` on, `screenshot:'off'` (rule 25), `slowMo:250`, `testDir:'specs'`.
- [ ] **Step 3:** `.env.example` — `BASE_URL_VESICA`, `BASE_URL_PURCRYSTAL`, `WP_ADMIN_USER`, `ADMIN_PASS`, `PASSWORD`, `PASSWORD2`, `PAY_PAL_PASS`, `REFUND_BRAND`, `ANTHROPIC_API_KEY`. `.gitignore` — `auth/`, `.env`, `node_modules/`, `test-results/`, `reports/`, `generated/` (regenerated).
- [ ] **Step 4:** `npm install`. Run `npx tsc --noEmit` (expect: fails only on not-yet-created imports, or clean if no source yet).
- [ ] **Step 5:** Commit: `chore(vesica): scaffold Playwright project (config, deps, env)`

---

### Task 2: Types + lazy admin auth

**Files:**
- Create: `types/test-config.ts`, `types/woocommerce__e2e-utils-playwright.d.ts` (← template), `admin-login.ts`

- [ ] **Step 1:** `types/woocommerce__e2e-utils-playwright.d.ts` — copy from `prompts/templates/woocommerce__e2e-utils-playwright.d.ts`.
- [ ] **Step 2:** `types/test-config.ts` — define `Brand = 'vesica'|'purcrystal'`; `BrandConfig` (baseUrlEnvKey, product slugs/IDs, variableProductSlug?, refundNotePattern, refundedStatus, hasPayPal, hasRegister); `OrderConfig` (user:'guest'|'new'|'logged', paymentMethod:'cc'|'paypal', expectedStatus, refundNotePattern, refundedStatus); `OrderResult` (orderNumber, postId, totals, billingBlock, paymentLabel, gatewayNote). No `SuiteVars` (DOM-first).
- [ ] **Step 3:** `admin-login.ts` — copy No Pong `admin-login.ts` pattern (`loginOnHost`, `ensureAdminState(brand, baseURL)`, `authStatePath(brand)` → `auth/admin-<brand>.json`, cross-worker `.lock`). Reads `WP_ADMIN_USER`/`ADMIN_PASS`.
- [ ] **Step 4:** `npx tsc --noEmit` — expect clean (or unresolved fixtures import only).
- [ ] **Step 5:** Commit: `feat(vesica): config types + lazy per-host admin auth`

---

### Task 3: Fixtures + resilient wrapper + email + order-notes

**Files:**
- Create: `fixtures/index.ts`, `helpers/resilient.ts`, `helpers/playgrounds-email.ts`, `helpers/order-notes.ts`

- [ ] **Step 1:** `helpers/resilient.ts` — copy No Pong `helpers/resilient.ts` (tiered `resilientClick/Fill/Select/Check/Text`, Stagehand last-resort, `setActiveStagehand`/`ctxFor`, rate-limit retry). Verify Stagehand v3 `model` config shape (rule 23).
- [ ] **Step 2:** `helpers/order-notes.ts` — copy `prompts/templates/order-notes.ts` (scan-all + regex).
- [ ] **Step 3:** `helpers/playgrounds-email.ts` — copy `prompts/templates/playgrounds-email.ts` / PLS version; filter by brand site title; navigate-back-to-root after viewing (rule 14). Poll window per Task 0 finding.
- [ ] **Step 4:** `fixtures/index.ts` — from `prompts/templates/fixtures.ts` + No Pong: `shopperPage` eager, `adminPage`/`emailPage` lazy Proxy (`.bind(page)` after init, rule 13), `recordVideo` bridged from `use.video`, video attach after `ctx.close()`, per-context failure screenshot gated on status (rule 25), wire `setActiveStagehand`/`ctxFor`, call `ensureAdminState` on first admin/email use.
- [ ] **Step 5:** `npx tsc --noEmit` — expect clean.
- [ ] **Step 6:** Commit: `feat(vesica): fixtures, resilient wrapper, email + order-notes helpers`

---

### Task 4: Site helper `helpers/vesica.ts` (Vesica brand)

**Files:**
- Create: `helpers/vesica.ts`

Selectors from Task 0 `site-exploration.md` + cross-checked against `generated/helpers/common-steps-for-all-projects.ts` (placeOrderElement, login, payPalTemplate, forgotPasswordFlow, checkTheTotal, checkOrderOnEmail).

- [ ] **Step 1:** `brandConfig: Record<Brand, BrandConfig>` — fill `vesica` from Task 0 (product slug/ID, `hasPayPal:true`, `hasRegister:true`, refund note/status). `purcrystal` stub filled in Task 8.
- [ ] **Step 2:** Navigation + cart (rule 30 — click paths, no goto to cart/checkout): `addToCart(page, brand)`, `goToCart(page)` (header cart → View cart), `proceedToCheckout(page)` (blockUI-aware), `waitForCheckoutReady(page)`.
- [ ] **Step 3:** Checkout + payment: `fillCheckoutAddress(page, billing)` (handle `#wcp-checkout-iframe` via frameLocator if Task 0 found it), `placeOrderAuthNet(page)` (wait `#place_order` enable → resilientClick; no card entry — gateway prefills), `payPalPPCP(page, {user,pass})` (No Pong popup loop: leave about:blank → resilient email/pass/Next loop → `#one-time-cta`).
- [ ] **Step 4:** Capture + refund: `readOrderReceived(page): OrderResult` (totals/billing/paymentLabel/orderNumber + postId from URL), `openAdminOrder(adminPage, postId)`, `performRefund(adminPage, config)` (qty-fill `input.refund_order_item_qty` with bubbling change → poll `#refund_amount>0` → submit → handle native confirm).
- [ ] **Step 5:** `BILLING` constant (from generated `vars`: phone `4089211861`, `@saucal.com` unique-per-run emails). File header + JSDoc per rule 20. All interactions via resilient wrapper (rule 23).
- [ ] **Step 6:** `npx tsc --noEmit` — expect clean.
- [ ] **Step 7:** Commit: `feat(vesica): site helper — cart/checkout/AuthNet/PayPal/refund`

---

### Task 5: Flows + assertions

**Files:**
- Create: `helpers/flows.ts`, `helpers/assertions.ts`

- [ ] **Step 1:** `helpers/flows.ts` — orchestrators returning Result, no `expect()`: `runOrderFlow({shopperPage}, config, brand)` (add→checkout→address→pay→readOrderReceived), `runRefundFlow({adminPage}, result, config)`, `runRegisterFlow`, `runForgotPasswordFlow` (shared set-password helper). Numbered-step JSDoc.
- [ ] **Step 2:** `helpers/assertions.ts` — ALL `expect()`, each with a message (rule 19): `assertParity(result, config)` implementing the capture-once matrix across thank-you/My-Account/email/admin (payment label `Credit Card`/`PayPal`, totals via `expectMoney` skipping absent rows, billing name/street/city/postcode, admin `Payment via <Method>` meta + gateway note via order-notes regex); `assertRefund` (config-driven note + status); `assertRegisterEmail`/`assertForgotPasswordEmail`. Guest guard (rule 18).
- [ ] **Step 3:** `npx tsc --noEmit` — expect clean.
- [ ] **Step 4:** `grep -rnE "expect\(" specs` (once specs exist) must be empty except `toHaveScreenshot`; `grep -nE "expect\([^,]+\)\." helpers/assertions.ts` must return zero. (Run in Task 7.)
- [ ] **Step 5:** Commit: `feat(vesica): order/refund/account flows + parity assertions`

---

### Task 6: Vesica specs (orders + account)

**Files:**
- Create: `specs/orders/vesica-orders.spec.ts`, `specs/orders/vesica-account.spec.ts`

Parity source: `generated/specs/vesica-basic-woocommerce-tests-user.spec.ts`.

- [ ] **Step 1:** `vesica-orders.spec.ts` — `describe.serial` + `@plugin` tags (rule 29) + chain state (`prompts/templates/chain-state.ts` → `auth/chain-vesica.json`): VES-PO-01 CC new-user (runOrderFlow + assertParity) → VES-PO-01b backend (assert admin) → VES-PO-02 PayPal logged-user (reuse account cookies) + backend → VES-PO-02-refund (gated `REFUND_BRAND==='vesica'`) → VES-PO-02-refund-email. Thin: config→flow→assert only.
- [ ] **Step 2:** `vesica-account.spec.ts` — VES-ACC-01 register (passwordless → set-password email → assert), VES-ACC-02 forgot-password (shared helper). reCAPTCHA guard per Task 0.
- [ ] **Step 3:** `npx tsc --noEmit` clean; `npx playwright test --list --project=vesica` enumerates the new tests.
- [ ] **Step 4:** Run the two `grep` lint checks from Task 5 Step 4 — fix any inline `expect`.
- [ ] **Step 5:** Commit: `feat(vesica): order chain + account specs (Vesica brand)`

---

### Task 7: Vesica nav/visual spec

**Files:**
- Create: `specs/basic/vesica-nav.spec.ts`

Parity source: `generated/specs/vesica-basic-woocommerce-tests-guest.spec.ts` (14 pages incl 5 course pages).

- [ ] **Step 1:** Data-driven: `PAGES: {name, path}[]` for the 14 guest pages. Per page: goto → nav/content existence assert (behaviour not pinned copy, rule 35) → lazy-load scroll+decode (rule 24) → `toHaveScreenshot` masking dynamic content. Facade assert for any lazy embeds (rule 31).
- [ ] **Step 2:** `@plugin` tags. `npx tsc --noEmit` clean; `npx playwright test --list --project=vesica` shows nav tests.
- [ ] **Step 3:** Commit: `feat(vesica): data-driven nav/visual spec (Vesica guest)`

**→ CHECKPOINT: Vesica brand complete. USER runs `npx playwright test --project=vesica` live; iterate on failures (baselines via `--update-snapshots`). Do not proceed to Pur Crystal until Vesica is green.**

---

### Task 8: Pur Crystal site config + specs

**Files:**
- Modify: `helpers/vesica.ts` (fill `brandConfig.purcrystal` + variable-product helper + contact-form)
- Create: `specs/orders/purcrystal-orders.spec.ts`, `specs/basic/purcrystal-nav.spec.ts`

Parity sources: `generated/specs/pur-crystal-basic-woocommerce-tests-{user,guest}.spec.ts`.

- [ ] **Step 1:** Fill `brandConfig.purcrystal` from Task 0 (own slugs/IDs, `hasPayPal:false`, `hasRegister:false`). Add `selectVariation(page, ...)` for the variable product and `submitContactForm(page)` (Pur Crystal guest 08).
- [ ] **Step 2:** `purcrystal-orders.spec.ts` — serial chain: PC-PO-01 CC new-user + assertParity → PC-PO-01b backend → PC-PO-04 refund-by-admin (gated `REFUND_BRAND==='purcrystal'`) → PC-PO-05 refund-email. No PayPal/register.
- [ ] **Step 3:** `purcrystal-nav.spec.ts` — data-driven over the 13 guest pages (incl variable-product page + contact/submit-contact as a functional form check, not screenshot).
- [ ] **Step 4:** `npx tsc --noEmit` clean; `npx playwright test --list --project=purcrystal` enumerates; run both grep lint checks.
- [ ] **Step 5:** Commit: `feat(purcrystal): brand config + order + nav specs`

**→ CHECKPOINT: USER runs `npx playwright test --project=purcrystal` live; iterate. Generate visual baselines per project with `--update-snapshots`.**

---

### Task 9: Finalize

- [ ] **Step 1:** Ensure `package.json` `test:basic`/`test:orders` scripts point only at folders that exist (rule 10). `npm run lint:plugin-tags` passes (every describe tagged).
- [ ] **Step 2:** Update `docs/site-exploration.md` with any live-run corrections; note live-run status.
- [ ] **Step 3:** Update memory: create `vesica_refactor_resume_state.md` + index line (built/tsc-clean/live-run status, brand configs, Auth.Net refund-vs-void answer, gotchas).
- [ ] **Step 4:** Commit: `chore(vesica): finalize scripts, docs, resume-state`

---

## Self-review notes
- **Spec coverage:** §1 layout → Tasks 1–8; §2 brand-project → Task 1/8; §3 parity → Task 5/6/8; §4 gateways → Task 4; §5 triage → Tasks 6–8. Live-explore (design "confirm" list) → Task 0.
- **Domain deviation from strict TDD:** intentional — canonical prompt forbids guessing selectors; verification is `tsc` + `--list` + user live-run. Selectors finalized in Task 0, not fabricated here.
- **Type consistency:** `OrderConfig`/`OrderResult`/`BrandConfig`/`Brand` defined Task 2, used Tasks 4–8. `brandConfig` map keyed by `Brand`. `readOrderReceived` returns `OrderResult` consumed by `assertParity`.
