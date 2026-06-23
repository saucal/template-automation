# Open Studio — Playwright refactor design

**Date:** 2026-06-23
**Reference implementation:** `suites/No Pong/` (completed GI→Playwright refactor in this same repo)
**Input (source of truth):** raw GI test JSON under `suites/Open Studio/<suite>/*.json` (authoritative for selectors/flow) + `generated/specs/*` and `generated/helpers/*` (lossy derivative).

Goal: refactor the GI-migrated Open Studio project into a clean, config-driven Playwright suite mirroring the No Pong / leggari architecture. Open Studio is a **single-host** subscription membership + course site (custom "OS" theme). Variant axis is **audience** (Guest vs Member), not region.

---

## 1. Scope & decisions (locked)

| Decision | Value |
|---|---|
| Topology | **Single host** `openstudio-staging.mystagingwebsite.com`. **Relative `goto` everywhere** (`'courses/'`, `'wp-admin/'`, `'./'`). Never a leading `/`. One Playwright project `open-studio`. |
| Audiences | Two spec groups: `specs/guest/` (public-page browsing) + `specs/member/`. **Classic Member suite dropped** — superseded by FunnelKit join. |
| Join | **Always FunnelKit funnel** (`/join/`). The upsell step is **optional and non-fatal**: detect the funnel upsell page; if absent, log and continue without failing. |
| Checkout | **Blocks checkout** (`button.wc-block-components-checkout-place-order-button`). Keep a classic fallback guard for safety; assertions branch blocks/classic. |
| Payment | **Stripe only.** Iframe `iframe[src*="js.stripe.com"]`, card `4242424242424242`, exp `04 / 27`, cvc `234`, postal `90210`. No captcha-bypass param exists. PayPal env var (`PAY_PAL_PASS`) is legacy — out of scope. |
| Email | **SAU/CAL Playgrounds Mailpit (same as No Pong)** — `helpers/playgrounds-email.ts` ported verbatim (`findEmail`/`deleteEmails`/`mailpitViewUrl` via Mailpit REST). `helpers/email.ts` wraps it: `forgotPasswordLink` / `welcomeLink` / `refundEmailText` (regex the link/body out of message HTML). **Not** the GI hosted inbox. `MAILPIT_URL` env overrides the inbox host. |
| Resilient locators | **Full rule 23 incl. Stagehand.** Port `helpers/resilient.ts` + Stagehand-over-CDP fixture verbatim from No Pong. Stagehand active only when `ANTHROPIC_API_KEY` set; otherwise Playwright-only tiers. |
| WC REST | **None** — DOM-first. No `helpers/wc-api.ts`. `SuiteVars` minimal / DOM-read. |
| GI conditionals | Build **Open-Studio-only** code. Branch on typed config (survey / upsell / user / subscription / frequency) via small focused functions — **never** on `vars.*` strings or project-name switches. See §6. |
| Side-effect gates | Refund + subscription renewal behind env flags (real side effects on the live staging site). |
| Build order | Guest visual first (cheap, proves fixtures/config) → member join (core) → account/auth → content pages → commerce/refund. `npx tsc --noEmit` clean at each phase. |
| Test execution | **User runs live Playwright themselves at the end.** Claude builds specs/helpers + verifies with `tsc --noEmit` only — no `playwright test`, no `--update-snapshots`, no live runs (direct or via subagents). Commit without a green-live gate. |

---

## 2. Directory layout

```
suites/Open Studio/
├── package.json            # + @woocommerce/e2e-utils-playwright, @browserbasehq/stagehand,
│                           #  playwright-core, zod, @babel/runtime, dotenv, dayjs
├── tsconfig.json  .env.example  .gitignore
├── playwright.config.ts    # single project 'open-studio'; baseURL from .env; blocks checkout;
│                           #  REFUND/RENEW env gates; slowMo 250; trace/video/screenshot on
├── global-setup.ts         # admin login → auth/admin.json
├── auth/                   # gitignored — admin.json
├── docs/superpowers/{specs,plans}/   # this design + plan
├── types/
│   └── test-config.ts      # JoinConfig / UserConfig / SubscriptionConfig / SurveyConfig / OrderResult / SuiteVars
├── fixtures/
│   └── index.ts            # PORT from No Pong — shopper / admin / email + Stagehand CDP bridge
├── helpers/
│   ├── openstudio.ts       # site map + selectors; addMembershipToCart, addSingleCourse,
│   │                       #  fillCheckout (blocks), payStripe (iframe), funnelKitJoin (graceful upsell),
│   │                       #  submitSurvey / skipSurvey, readDashboard, myAccountNav
│   ├── resilient.ts        # PORT verbatim from No Pong
│   ├── email.ts            # inbox abstraction (source confirmed at build)
│   ├── order-notes.ts      # PORT from No Pong
│   ├── account.ts          # LWA login, logout, forgotPassword, assertMyAccountLinks, assertDashboardPlan
│   ├── flows.ts            # runJoinFlow / runSingleCourseFlow / runCoursePlusSubscriptionFlow / runRefundFlow
│   └── assertions.ts       # ALL expect(): blocks order-received, backend order, dashboard plan,
│                           #  subscription next-payment, refund (admin + email), survey applied
└── specs/
    ├── guest/
    │   ├── visual.spec.ts        # 11 public pages + desktop/mobile menus (toHaveScreenshot)
    │   └── join-checkout.spec.ts # guest reaches /join/ → checkout page (no purchase) — GI guest #18
    └── member/
        ├── join.spec.ts          # FunnelKit: survey-submit + ignore-survey; serial → backend & renew (gated)
        ├── account.spec.ts       # login / my-account / forgot-password / logout
        ├── content.spec.ts       # home, course, session, community, space-event, instrument, bookmark — as member
        └── commerce.spec.ts      # single course; course+subscription; refund (gated)
```

---

## 3. Typed config model (replaces GI `vars`)

```ts
type Frequency = 'monthly' | 'annually';

interface SurveyConfig      { instrument: string; skillLevel: string; }
interface JoinConfig        { survey: 'submit' | 'skip'; upsell: 'accept' | 'skip'; frequency: Frequency; }
interface UserConfig        { email: string; password: string; firstName: string; lastName: string; }  // generated per-run
interface SubscriptionConfig{ product: 'open-studio'; nextPaymentTz: 'America/Chicago'; }
interface OrderResult       { orderNumber: string; email: string; total: string; subscriptionId?: string; }
```

`upsell` is **best-effort**: `funnelKitJoin` waits briefly for `a.bwf-btn.solid.wfocu_upsell` / `a.bwf-btn.solid.wfocu_skip_offer`. If the funnel served no upsell page, it logs and proceeds — no failure. This satisfies the requirement that the upsell flow may sometimes be absent.

---

## 4. Site map & key selectors (GI-derived, baked in)

**Public pages (guest):** home `./` · courses `courses/` · instructors `instructors/` · mentor-sessions `mentor-sessions/` · pro `pro/` · podcasts `podcasts/` · about `about-us/` · contact `contact/` · careers `careers/` · terms `terms-of-service/` · privacy `privacy-policy/` · live sessions/events `events/` · community `community/` · gps `gps/` · os-sessions `os-sessions/` · single course `product/jazz-piano-jump-start-course/`.

**Account / member:** my-account `my-account/` · lost-password `my-account/lost-password/` · my-profile `my-account/my-profile/` · orders `my-account/orders/` · view-order `my-account/view-order/{n}/` · view-subscription `my-account/view-subscription/{id}/` · members-area `my-account/members-area/` · dashboard `dashboard/` · welcome `welcome-to-open-studio/` · bookmarks `mybookmarks/`.

**Membership product:** `product/open-studio/?attribute_frequency=Monthly|Annually` (monthly `add-to-cart=16` @ $19; annually `add-to-cart=17`). Upsell product "Open Studio Pro - Annually".

**FunnelKit funnel:** upsell page detect `.bwf-inner-col > h2.bwf-adv-heading.bwf-width-default`; accept `a.bwf-btn.solid.wfocu_upsell`; skip `a.bwf-btn.solid.wfocu_skip_offer`; funnel order number `.bwf-align-wrap-full ... p:nth-child(1).bwf-adv-heading`.

**Survey (welcome page):** instrument radios `input[name="os-survey-instrument"]`; skill radios `input[name="os-survey-skill-level"]`; submit `input[type="submit"].button`; skip `a[href*="/dashboard/?skip-survey=1"]`.

**Blocks checkout:** email `#billing_email`; account password `#account_password`; place order `button.wc-block-components-checkout-place-order-button`; loading `.wc-block-components-spinner` / `.blockUI`. **Stripe iframe** `iframe[src*="js.stripe.com"]`: `input[name="number"]` `4242424242424242`, `input[name="expiry"]` `04 / 27`, `input[name="cvc"]` `234`, `input[name="postalCode"]` `90210`.

**Order received (classic confirm):** order `.order > strong`; email `.email > strong`; total `strong > .woocommerce-Price-amount.amount > bdi`.

**Login (Login-With-Ajax):** trigger `button.header-account-button` / `a[href*="/my-account/"]`; user `#username`; pass `#password`; submit `button[name="login"]`; spinner `.lwa-loading`.

**Dashboard plan:** `.os-account-membership` ("YOUR CURRENT PLAN" / "OPEN STUDIO" / "OPEN STUDIO PRO"); frequency `.os-my-dashboard__frequency > span`; next payment `.os-my-dashboard__next > span`; price `.woocommerce-Price-amount`.

**Single course:** title `h2.os-course-info-page-header__title`; price `.summary.entry-summary .price ... bdi`; add `//button[contains(text(),"Buy Course")]` / `button[name="add-to-cart"]`.

**Admin / refund / renew:** orders menu `a[href="admin.php?page=wc-orders"]`; open order `admin.php?page=wc-orders&action=edit&id={n}`; refund btn `button.button.refund-items`; reason `#refund_reason`; do refund `button.button-primary.do-api-refund`; status `#select2-order_status-container` ("Refunded"); refund line `tr.refund > td.line_cost`; next-payment `td.subscription-next-payment`. Refund email link "has been refunded"; amount `tr:nth-of-type(3) > td.td > .woocommerce-Price-amount.amount` as `-{amount}`.

**Plugins to tag each `describe`:** WooCommerce · WC Subscriptions · Stripe Gateway · FunnelKit (funnel+upsell) · Login-With-Ajax · WC Blocks checkout · custom OS theme.

---

## 5. Key flows (`helpers/flows.ts`)

- **runJoinFlow(config)** — add membership (`product/open-studio/?attribute_frequency=…`) → blocks checkout → inline register (`#billing_email` / `#account_password`) → Stripe iframe → place order → **graceful** FunnelKit upsell (accept/skip/absent) → order-received → welcome-page survey (`submit` or `?skip-survey=1`) → assert dashboard plan. Returns `OrderResult`.
- **Backend & renew** (serial, after join; renewal **gated** by env) — admin order check; trigger renewal; read next-payment (`.os-my-dashboard__next`, `td.subscription-next-payment`).
- **runSingleCourseFlow** — `product/jazz-piano-jump-start-course/` → Buy Course → blocks checkout → assert members-area access.
- **runCoursePlusSubscriptionFlow** — course + subscription in one cart; assert both rows + subscription-details "/ month with a {trial}-day free trial".
- **runRefundFlow** (gated) — admin `do-api-refund` → status Refunded → refund line negative → refund email "has been refunded".

---

## 6. GI conditionals to AVOID (do NOT port)

`generated/helpers/common-steps-for-all-projects.ts` is shared across many unrelated sites and branches on project name / currency / `vars` flags. Port **none** of it. Specifically avoid:

- Project-name switches: `project === "Phlearn" | "vesica" | "icg" | "hunchie" | "leggari" | "mckeen" | "talkbox" | …` (login, lost-password path/message, order-confirmation message, payment-method label, order-status expectation).
- Multi-currency subtotal branches (USD/GBP/EUR/AUD/CAD).
- The massive per-project shipping/billing address assertion block.
- Generic `checkOrderAndSubscriptionsOnMyAccount()` — use Open-Studio-specific `readDashboard` / `assertDashboardPlan` instead.

Reproduce **only** the Open-Studio path, expressed through typed config.

---

## 7. Build order (phases)

1. **Scaffold** — package.json deps, tsconfig, playwright.config (single project, gates), global-setup, fixtures (port), resilient (port), order-notes (port), types. `tsc` clean.
2. **Guest visual** — `guest/visual.spec.ts` (11 pages + menus) + `guest/join-checkout.spec.ts`. Proves fixtures/config/baseURL.
3. **Member join** — `helpers/openstudio.ts` join pieces + `flows.runJoinFlow` + `member/join.spec.ts` (survey-submit, ignore-survey; serial backend+renew gated).
4. **Account/auth** — `helpers/account.ts` + `member/account.spec.ts` (login, my-account, forgot-password, logout).
5. **Content pages** — `member/content.spec.ts` (home, course, session, community, space-event, instrument, bookmark).
6. **Commerce** — `member/commerce.spec.ts` (single course, course+subscription, refund gated) + `email.ts` source confirmed.

Each phase: `npx tsc --noEmit` clean, commit. **User runs live at the end.**
