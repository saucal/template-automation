// Resilient action/assertion wrapper (prompt rule 23, docs/locator-fallback-strategy.md).
//
// Every action/read tries tiered fallbacks:
//   1. primary  — Playwright locator (prefer ARIA/role)
//   2. alt       — a different Playwright locator (text/CSS); OMIT for stable
//                  selectors (stable IDs → Stagehand-only fallback)
//   3. Stagehand — AI act()/extract() in natural language (only if a stagehand
//                  handle exists; null when ANTHROPIC_API_KEY is unset)
//
// Stagehand is the LAST resort — the happy path is pure Playwright. `ai` is a
// NOUN phrase naming the element ("the Add to cart button", "the billing first
// name field"); the wrapper composes the verb.
import { type Locator, type Page } from '@playwright/test';
import { z } from 'zod';
import type { Stagehand } from '@browserbasehq/stagehand';

export interface ResilientCtx {
  page: Page;
  stagehand: Stagehand | null;
}

// The active Stagehand handle for this worker. Playwright workers are separate
// processes, so a module-level global is worker-safe (one stagehand per worker,
// set by the fixture). Lets helpers keep their (page) signatures and build a
// ResilientCtx on demand via ctxFor(page) without threading stagehand everywhere.
let activeStagehand: Stagehand | null = null;
export function setActiveStagehand(sh: Stagehand | null): void {
  activeStagehand = sh;
}

/** Build a ResilientCtx for any page (admin/shopper/email) with the worker's stagehand. */
export function ctxFor(page: Page): ResilientCtx {
  return { page, stagehand: activeStagehand };
}

export interface Target {
  /** Primary Playwright locator (prefer getByRole/getByLabel). */
  primary: Locator;
  /** Alternate Playwright locator (text/CSS). Omit for stable-selector → Stagehand-only. */
  alt?: Locator;
  /** Natural-language NOUN phrase for the Stagehand fallback, e.g. "the Add to cart button". */
  ai: string;
}

// Per-tier action timeout. Matches the config actionTimeout — Kinsta full-page navs
// triggered by a click (product tile, Save) can take >8s, and the click auto-waits for
// them, so a tighter budget spuriously fails a click that actually succeeded.
const TIER_TIMEOUT = 15_000;

/**
 * Unwrap the lazy-page Proxy (adminPage / emailPage) to the underlying real Page
 * before handing it to Stagehand — Stagehand rejects the Proxy with "page:
 * expected Page or Frame". The eager shopperPage is already a real Page (no
 * `__realPage`), so it passes through unchanged.
 */
function realPage(page: Page): Page {
  return (page as unknown as { __realPage?: Page }).__realPage ?? page;
}

/**
 * Run the Playwright tiers (primary → alt) then the Stagehand tier. Returns the
 * first success; throws the first Playwright error if every tier fails.
 */
async function withFallback<T>(
  ctx: ResilientCtx,
  target: Target,
  pwAction: (locator: Locator) => Promise<T>,
  aiAction: (sh: Stagehand) => Promise<T>
): Promise<T> {
  const locators: Locator[] = [target.primary.first()];
  if (target.alt) locators.push(target.alt.first());

  let firstError: unknown;
  for (const loc of locators) {
    try {
      return await pwAction(loc);
    } catch (err) {
      firstError ??= err;
    }
  }

  if (ctx.stagehand) {
    // Reaching the AI tier means the primary (and alt) locators broke — surface it
    // so the brittle selector gets fixed rather than silently leaning on AI.
    console.warn(`[resilient] locators failed → using Stagehand for "${target.ai}". Fix the selector.`);
    try {
      return await aiAction(ctx.stagehand);
    } catch (aiErr) {
      // Every tier failed (Playwright + Stagehand) — throw an aggregated error so
      // the report shows both failure reasons, not just the Playwright one.
      throw new Error(
        `${target.ai} — not found.\n` +
          `  Playwright: ${(firstError as Error)?.message ?? firstError}\n` +
          `  Stagehand:  ${(aiErr as Error)?.message ?? aiErr}`
      );
    }
  }
  throw firstError;
}

/**
 * Stagehand action via observe → act. observe() returns the concrete element(s)
 * matching the instruction; if it finds NONE we throw instead of letting act()
 * click/fill an arbitrary element (prevents silent wrong-target actions). We then
 * act on the observed result, so the action targets exactly what observe matched.
 */
async function aiAct(sh: Stagehand, page: Page, instruction: string): Promise<void> {
  const p = realPage(page);
  const actions = await sh.observe(instruction, { page: p });
  if (!actions || actions.length === 0) {
    throw new Error(`Stagehand observe() found no element for: ${instruction}`);
  }
  await sh.act(actions[0], { page: p });
}

export async function resilientClick(ctx: ResilientCtx, target: Target): Promise<void> {
  await withFallback(
    ctx,
    target,
    (loc) => loc.click({ timeout: TIER_TIMEOUT }),
    (sh) => aiAct(sh, ctx.page, `click ${target.ai}`)
  );
}

export async function resilientFill(ctx: ResilientCtx, target: Target, value: string): Promise<void> {
  await withFallback(
    ctx,
    target,
    (loc) => loc.fill(value, { timeout: TIER_TIMEOUT }),
    (sh) => aiAct(sh, ctx.page, `fill ${target.ai} with "${value}"`)
  );
}

export async function resilientSelect(ctx: ResilientCtx, target: Target, value: string): Promise<void> {
  await withFallback(
    ctx,
    target,
    (loc) => loc.selectOption(value, { timeout: TIER_TIMEOUT }).then(() => undefined),
    (sh) => aiAct(sh, ctx.page, `select the option "${value}" in ${target.ai}`)
  );
}

export async function resilientCheck(ctx: ResilientCtx, target: Target): Promise<void> {
  await withFallback(
    ctx,
    target,
    (loc) => loc.check({ timeout: TIER_TIMEOUT }),
    (sh) => aiAct(sh, ctx.page, `check ${target.ai}`)
  );
}

export async function resilientUncheck(ctx: ResilientCtx, target: Target): Promise<void> {
  await withFallback(
    ctx,
    target,
    (loc) => loc.uncheck({ timeout: TIER_TIMEOUT }),
    (sh) => aiAct(sh, ctx.page, `uncheck ${target.ai}`)
  );
}

/** Read trimmed text. Stagehand fallback uses extract() with a typed schema. */
export async function resilientText(ctx: ResilientCtx, target: Target): Promise<string> {
  return withFallback(
    ctx,
    target,
    async (loc) => ((await loc.textContent({ timeout: TIER_TIMEOUT })) ?? '').trim(),
    async (sh) => {
      const r = await sh.extract(`the visible text of ${target.ai}`, z.object({ text: z.string() }), { page: realPage(ctx.page) });
      return ((r as { text?: string })?.text ?? '').trim();
    }
  );
}
