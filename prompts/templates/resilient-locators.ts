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

const TIER_TIMEOUT = 8_000;

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
    try {
      return await aiAction(ctx.stagehand);
    } catch (err) {
      console.warn(`[resilient] Stagehand fallback failed for "${target.ai}": ${(err as Error).message}`);
    }
  }
  throw firstError;
}

export async function resilientClick(ctx: ResilientCtx, target: Target): Promise<void> {
  await withFallback(
    ctx,
    target,
    (loc) => loc.click({ timeout: TIER_TIMEOUT }),
    (sh) => sh.act(`click ${target.ai}`, { page: ctx.page }).then(() => undefined)
  );
}

export async function resilientFill(ctx: ResilientCtx, target: Target, value: string): Promise<void> {
  await withFallback(
    ctx,
    target,
    (loc) => loc.fill(value, { timeout: TIER_TIMEOUT }),
    (sh) => sh.act(`fill ${target.ai} with "${value}"`, { page: ctx.page }).then(() => undefined)
  );
}

export async function resilientSelect(ctx: ResilientCtx, target: Target, value: string): Promise<void> {
  await withFallback(
    ctx,
    target,
    (loc) => loc.selectOption(value, { timeout: TIER_TIMEOUT }).then(() => undefined),
    (sh) => sh.act(`select "${value}" in ${target.ai}`, { page: ctx.page }).then(() => undefined)
  );
}

export async function resilientCheck(ctx: ResilientCtx, target: Target): Promise<void> {
  await withFallback(
    ctx,
    target,
    (loc) => loc.check({ timeout: TIER_TIMEOUT }),
    (sh) => sh.act(`check ${target.ai}`, { page: ctx.page }).then(() => undefined)
  );
}

export async function resilientUncheck(ctx: ResilientCtx, target: Target): Promise<void> {
  await withFallback(
    ctx,
    target,
    (loc) => loc.uncheck({ timeout: TIER_TIMEOUT }),
    (sh) => sh.act(`uncheck ${target.ai}`, { page: ctx.page }).then(() => undefined)
  );
}

/** Read trimmed text. Stagehand fallback uses extract() with a typed schema. */
export async function resilientText(ctx: ResilientCtx, target: Target): Promise<string> {
  return withFallback(
    ctx,
    target,
    async (loc) => ((await loc.textContent({ timeout: TIER_TIMEOUT })) ?? '').trim(),
    async (sh) => {
      const r = await sh.extract(`the visible text of ${target.ai}`, z.object({ text: z.string() }), { page: ctx.page });
      return ((r as { text?: string })?.text ?? '').trim();
    }
  );
}
