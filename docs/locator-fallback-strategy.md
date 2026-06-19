# Resilient Locator & Assertion Fallback Strategy

**Canonical strategy for all automation projects** (template-automation; adopted
by leggari, bluesnap, mastercard, no-pong, repurposed…). Goal: a maintenance-cycle
regression suite that survives selector drift. Every **action** and **assertion**
has a tiered fallback. Stagehand AI is the last resort only — the primary path
stays pure Playwright (fast, free, deterministic).

## Tier order (general elements)

Follows Playwright's official locator priority (most→least resilient):

1. **Primary — ARIA/role:** `getByRole(role, { name })`, `getByLabel(...)`. User-facing, survives DOM/class churn.
2. **Fallback 1 — text or CSS:** `getByText(...)` / `getByPlaceholder(...)`, else a stable CSS/`.or()` locator. A *different* Playwright strategy than tier 1.
3. **Fallback 2 — Stagehand AI:** `stagehand.act("<NL instruction>", { page })` for actions; `stagehand.extract(instruction, zodSchema, { page })` for reads/assertions.

## Exception — stable selectors → Stagehand-only fallback

For elements with stable IDs/names (checkout form `#billing_*` / `#shipping_*`,
`#place_order`, `#terms`, `#order_comments`, product `#base`/`#highlight`,
`#leggari-sqf-for-kit`), **skip Tier-1-alt** — there's no value in a second CSS
guess when the ID is stable. Use:

1. **Primary:** stable CSS/ID locator.
2. **Fallback:** Stagehand AI only.

## Why Stagehand is last, not first

- LLM cost + latency per call — keep it off the hot path.
- All 3 specs already pass on pure Playwright; Stagehand is **insurance against drift**, not the driver.
- Deterministic-where-reused: prefer `observe()` → `act(action)` (no LLM on the act) over raw `act("NL")` for repeated steps; raw `act` is fine for the rare fallback path.

## Stagehand setup (best practice, from docs + `/Users/christian/ai-automation`)

```ts
import { Stagehand } from '@browserbasehq/stagehand';
import { chromium } from 'playwright-core';

const stagehand = new Stagehand({
  env: 'LOCAL',
  // V3Options.model — NOT top-level modelName/modelClientOptions (those are
  // ignored and Stagehand silently defaults to OpenAI → "OpenAI API key missing").
  model: { modelName: 'anthropic/claude-sonnet-4-6', apiKey: process.env.ANTHROPIC_API_KEY },
  selfHeal: true,                                     // adapt to minor DOM changes
});
// Valid Anthropic ids: anthropic/claude-sonnet-4-6, anthropic/claude-haiku-4-5.
// @ai-sdk/anthropic ships with stagehand. There is no `enableCaching` option (use `cacheDir`).
await stagehand.init();
const browser = await chromium.connectOverCDP({ wsEndpoint: stagehand.connectURL() });
// bridge testInfo.project.use → context options (viewport, baseURL, ignoreHTTPSErrors, recordVideo…)
```

- **Reads/assertions:** `extract(instruction, z.object({...}), { page })`. Scope with `observe()` selector for ~10x fewer tokens on verbose pages.
- **Actions:** `act("fill billing first name with QA", { page })`. For secrets use `observe(..., { variables })` → `act(action, { variables })` (placeholders, no raw secrets in prompts).
- Deps: `@browserbasehq/stagehand`, `playwright-core`, `zod`. Env: `ANTHROPIC_API_KEY`.

## Playwright Test integration — the clean way (task #11)

**Direction:** Playwright Test stays the driver (it owns `testInfo`, config, projects).
Stagehand is a service the fixture starts; it owns the browser, and Playwright
attaches to it over CDP. You bridge **PW → Stagehand** (feed `testInfo.project.use`
into the contexts), never the reverse — Stagehand has no `testInfo`.

One browser, one Stagehand instance, three isolated contexts (shopper/admin/email).
`stagehand.context` is a real Playwright `BrowserContext`; AI methods take `{ page }`,
so a single Stagehand drives every context's pages.

```ts
// fixtures/index.ts
import { test as base, chromium, type Browser, type Page } from '@playwright/test';
import { Stagehand } from '@browserbasehq/stagehand';

type Fx = { stagehand: Stagehand; shopperPage: Page; adminPage: Page; emailPage: Page };

export const test = base.extend<Fx>({
  // 1. Stagehand owns the browser (per test). Lifecycle tied to the fixture.
  stagehand: async ({}, use) => {
    const sh = new Stagehand({
      env: 'LOCAL',
      modelName: 'anthropic/claude-sonnet-4-5',
      modelClientOptions: { apiKey: process.env.ANTHROPIC_API_KEY },
      enableCaching: true,
      selfHeal: true,
    });
    await sh.init();
    await use(sh);
    await sh.close();
  },

  // 2. Playwright attaches to Stagehand's browser over CDP (SAME browser).
  _cdp: [async ({ stagehand }, use) => {
    const browser = await chromium.connectOverCDP({ wsEndpoint: stagehand.connectURL() });
    await use(browser);
    await browser.close();
  }, { scope: 'test', auto: false }],

  // 3. Each role = an isolated context from that browser, bridging testInfo.project.use
  //    (viewport, baseURL, ignoreHTTPSErrors, recordVideo, storageState) — PW config inherited.
  shopperPage: async ({ _cdp }, use, testInfo) => {
    const ctx = await _cdp.newContext({ ...contextFromTestInfo(testInfo) /*, recordVideo */ });
    const page = await ctx.newPage();
    await use(page);
    await ctx.close(); // attach video after close (video.path() resolves post-close)
  },
  // adminPage / emailPage: same, lazy-init Proxy + storageState: auth/admin.json
});
```

- Helpers receive `ctx = { page, stagehand }` and call the resilient wrapper.
- Determinism for cache hits: fixed viewport, `await page.waitForLoadState('networkidle')` before any Stagehand call, scope `extract`/`observe` with a `selector`, and use `act(..., { variables })` so one cache entry covers many values.
- `global-setup.ts` (admin login → `auth/admin.json`) stays as-is — it uses a plain `chromium.launch`, independent of Stagehand.
- Trade-off: Stagehand's own default context (created by `init()`) goes unused; we create our own 3 for isolation + video + admin storageState. Minor overhead, cleaner isolation.

## Wrapper API (task #12)

```ts
// action: try primary → alt → AI
resilientClick(ctx, { primary, alt?, ai });
resilientFill(ctx,  { primary, alt?, ai }, value);
resilientSelect(ctx,{ primary, alt?, ai }, value);

// read/assert: returns captured string; AI extract as last resort
resilientText(ctx, { primary, alt?, ai, schema? }): Promise<string>;
```

`ctx = { page, stagehand }`. Stable-form helpers pass no `alt` (Stagehand-only fallback).
Each tier wrapped in try/catch; on final failure throw the original error with all
tiers logged. Keep return/capture shapes identical so `flows.ts`/`assertions.ts`
parity logic is unchanged.

## Migration (task #13)

Refactor `helpers/leggari.ts` (PDP fillers, checkout, payment, readers) and
`helpers/assertions.ts` (parity matrix) onto the wrapper. All 3 specs must stay
green after migration. Pure-Playwright path unchanged in the happy case; only the
fallback behavior is added.

## Version note

`/Users/christian/ai-automation` uses Stagehand **v2** (`stagehand.act('NL', {page})`).
v3 keeps the same `{ page }` option but favors `observe()`→`act(action)`. Pin and
follow whichever major version we install; this doc targets v3 semantics.
```
