// Test fixtures — three isolated contexts (shopper / admin / email) plus an
// optional Stagehand AI handle for the resilient-locator fallback (rule 23).
//
// Integration model: Playwright Test is the driver (owns testInfo/config).
// When ANTHROPIC_API_KEY is set, Stagehand owns the browser and Playwright
// attaches over CDP — so the AI fallback (stagehand.act/extract) operates on the
// SAME pages. Without the key we launch a plain Playwright browser and `stagehand`
// is null (the wrapper skips the AI tier). Happy path is identical either way.
//
// Because we create contexts manually (needed for the 3-context + CDP model),
// Playwright's auto trace/screenshot/video do NOT apply — we honor the config's
// trace/screenshot/video settings manually below. shopperPage is eager;
// adminPage/emailPage are lazy and authenticate per-environment (rule 32).
import { test as base, chromium, type Browser, type Page, type BrowserContext, type Video, type TestInfo } from '@playwright/test';
import { Stagehand } from '@browserbasehq/stagehand';
import { ensureAdminState } from '../helpers/admin-login';
import { setActiveStagehand } from '../helpers/resilient';
import path from 'path';

const AI_ENABLED = !!process.env.ANTHROPIC_API_KEY;
const STAGEHAND_MODEL = process.env.STAGEHAND_MODEL || 'anthropic/claude-sonnet-4-6';
const DEBUG = !!process.env.MELON_DEBUG;

// Melon opts the WHOLE site into cross-document view transitions
// (`@view-transition{navigation:auto}` in the melon-optics-product-configurator CSS).
// They activate on the CLICK-DRIVEN form-submit redirects (Register → ?_wc_user_reg,
// Save password → ?password-reset) — NOT on scripted goto. On the slow maintenance
// host the transition paints an empty/stale frame for SECONDS (the "white page") and,
// when a nav fires mid-transition, throws "Transition was skipped" and leaves the
// compositor stuck on the old snapshot — so screenshots hang and clicks never reach
// "stable". The step it surfaces on shifts with driver latency (plain launch vs
// Stagehand-over-CDP + slowMo), hence "sooner" without Stagehand, "later" with it.
//
// FIX: neutralizeViewTransitions() below zeroes the transition animation via a
// document-start CSS injection, so every transition completes instantly — no white
// frame, no stuck compositor — regardless of what triggers it. VT_FLAG is a best-
// effort launch flag on top (observed NOT to stop the transitions on this Chrome, so
// the CSS injection is the load-bearing fix). Set MELON_VT_KEEP=1 to disable BOTH and
// reproduce/inspect the issue.
const VT_FLAG = '--disable-features=ViewTransitionOnNavigation';
const LAUNCH_ARGS = process.env.MELON_VT_KEEP ? [] : [VT_FLAG];

// Silence the Vercel AI SDK warning Stagehand triggers ("System messages in the
// prompt or messages fields can be a security risk…") — expected for Stagehand's
// LLM client, just log noise here.
(globalThis as Record<string, unknown>).AI_SDK_LOG_WARNINGS = false;

type Fixtures = {
  /** Stagehand instance for AI fallback, or null when ANTHROPIC_API_KEY is unset. */
  stagehand: Stagehand | null;
  /** Browser the contexts are created from — Stagehand's CDP browser, or plain PW. */
  pageBrowser: Browser;
  shopperPage: Page;
  adminPage: Page;
  emailPage: Page;
};

// ---- config bridges ------------------------------------------------------

// Only valid BrowserContext options from project.use — spreading the whole `use`
// object passes launch-only / test-runner keys (launchOptions, video config,
// trace, screenshot, slowMo, actionTimeout…) that newContext doesn't accept.
const CONTEXT_OPTION_KEYS = [
  'baseURL', 'viewport', 'userAgent', 'locale', 'timezoneId', 'geolocation', 'permissions',
  'ignoreHTTPSErrors', 'colorScheme', 'reducedMotion', 'forcedColors', 'deviceScaleFactor',
  'isMobile', 'hasTouch', 'javaScriptEnabled', 'extraHTTPHeaders', 'acceptDownloads',
  'bypassCSP', 'httpCredentials', 'offline', 'proxy', 'recordHar', 'serviceWorkers', 'screen',
] as const;

function pickContextOptions(testInfo: TestInfo): Record<string, unknown> {
  const use = testInfo.project.use as Record<string, unknown>;
  const out: Record<string, unknown> = {};
  for (const k of CONTEXT_OPTION_KEYS) if (use[k] !== undefined) out[k] = use[k];
  return out;
}

// Playwright runs headless unless `--headed` is passed (which sets use.headless=false).
// Stagehand's LOCAL browser + manual chromium.launch don't read that flag — bridge it.
function isHeadless(testInfo: TestInfo): boolean {
  return (testInfo.project.use as { headless?: boolean }).headless !== false;
}

// actionTimeout / navigationTimeout are NOT context options — apply on the page.
function applyTimeouts(page: Page, testInfo: TestInfo): void {
  const use = testInfo.project.use as { actionTimeout?: number; navigationTimeout?: number };
  if (use.actionTimeout) page.setDefaultTimeout(use.actionTimeout);
  if (use.navigationTimeout) page.setDefaultNavigationTimeout(use.navigationTimeout);
}

// playwright.config uses video.{mode,size}; browser.newContext uses recordVideo.{dir,size}.
function getRecordVideoOptions(testInfo: TestInfo, dir: string) {
  const cfg = (testInfo.project.use.video ?? {}) as any;
  const mode = typeof cfg === 'string' ? cfg : cfg.mode;
  if (mode === 'off') return undefined;
  const size = cfg.size ?? { width: 1280, height: 720 };
  return { dir, size };
}

type TraceMode = 'off' | 'on' | 'retain-on-failure' | 'on-first-retry' | 'on-all-retries';
const traceMode = (testInfo: TestInfo): TraceMode =>
  ((testInfo.project.use as { trace?: TraceMode }).trace ?? 'off');
const screenshotMode = (testInfo: TestInfo): 'off' | 'on' | 'only-on-failure' =>
  ((testInfo.project.use as { screenshot?: 'off' | 'on' | 'only-on-failure' }).screenshot ?? 'off');

const traced = new WeakSet<BrowserContext>();

// ---- debug instrumentation (opt-in via MELON_DEBUG) ----------------------
// All gated on MELON_DEBUG so normal runs stay quiet. Logs, per context:
//  - pageerror       — surfaces the "Transition was skipped" AbortError and friends
//  - main-frame nav  — every navigation + URL (spot the slow / interrupted ones)
//  - console         — any browser console line mentioning "transition"
function instrument(page: Page, label: string): void {
  if (!DEBUG) return;
  page.on('pageerror', (err) => console.log(`[melon:${label}] pageerror: ${err.message || err}`));
  page.on('framenavigated', (f) => {
    if (f === page.mainFrame()) console.log(`[melon:${label}] nav → ${f.url()}`);
  });
  page.on('console', (msg) => {
    if (/transition/i.test(msg.text())) console.log(`[melon:${label}] console: ${msg.text()}`);
  });
}

// THE FIX: zero the view-transition animation on every document so any transition —
// goto OR the click-driven form-submit redirects that actually trigger it here —
// completes instantly. Injected at document-start, so the `!important` rule beats the
// plugin's `@view-transition{navigation:auto}` before the transition ever paints.
// Skipped when MELON_VT_KEEP=1 (to reproduce the white-page freeze).
async function neutralizeViewTransitions(page: Page): Promise<void> {
  if (process.env.MELON_VT_KEEP) return;
  await page.addInitScript({
    content: `(() => {
      const css = '::view-transition-group(*),::view-transition-image-pair(*),::view-transition-old(*),::view-transition-new(*){animation-duration:0s!important;animation-delay:0s!important}';
      const s = document.createElement('style');
      s.setAttribute('data-melon-vt-off', '');
      s.textContent = css;
      (document.head || document.documentElement).appendChild(s);
    })();`,
  });
}

// Logs the view-transition lifecycle from inside the page — pageswap/pagereveal for
// cross-document (the @view-transition case), startViewTransition for same-document.
// With the VT flag on you should see NOTHING here; with MELON_VT_KEEP=1 you'll see the
// transitions fire (and the "aborted" line when a nav interrupts one).
async function addVtDebug(page: Page): Promise<void> {
  if (!DEBUG) return;
  await page.addInitScript({
    content: `(() => {
      const log = (m) => console.log('[melon-vt] ' + m);
      addEventListener('pageswap', (e) => log('pageswap viewTransition=' + !!e.viewTransition));
      addEventListener('pagereveal', (e) => log('pagereveal viewTransition=' + !!e.viewTransition));
      if (typeof document.startViewTransition === 'function') {
        const orig = document.startViewTransition.bind(document);
        document.startViewTransition = (cb) => {
          log('startViewTransition');
          const vt = orig(cb);
          if (vt && vt.finished) vt.finished.then(() => log('finished')).catch((err) => log('aborted ' + err));
          return vt;
        };
      }
    })();`,
  });
}

// ---- context lifecycle (trace + screenshot + video, honoring config) -----

async function openContext(
  pageBrowser: Browser,
  testInfo: TestInfo,
  extra: Record<string, unknown> = {},
  label = 'page'
): Promise<{ ctx: BrowserContext; page: Page }> {
  const ctx = await pageBrowser.newContext({
    ...pickContextOptions(testInfo),
    recordVideo: getRecordVideoOptions(testInfo, testInfo.outputDir),
    ...extra,
  });
  if (traceMode(testInfo) !== 'off') {
    // May throw "Tracing has been already started" when Stagehand owns the
    // browser (it starts CDP tracing browser-wide). Skip PW tracing in that case.
    try {
      await ctx.tracing.start({ screenshots: true, snapshots: true, sources: true });
      traced.add(ctx);
    } catch { /* tracing unavailable on this context (Stagehand-owned browser) */ }
  }
  const page = await ctx.newPage();
  applyTimeouts(page, testInfo);
  await neutralizeViewTransitions(page);
  await addVtDebug(page);
  instrument(page, label);
  return { ctx, page };
}

// video.path() resolves only AFTER ctx.close() finalises the recording.
async function attachVideo(video: Video, name: string, testInfo: TestInfo): Promise<void> {
  const videoPath = await video.path().catch(() => null);
  if (videoPath) await testInfo.attach(name, { path: videoPath, contentType: 'video/webm' }).catch(() => {});
}

/** Screenshot (if configured) → stop+attach trace (before close) → close → attach video. */
async function finishContext(ctx: BrowserContext, page: Page, name: string, testInfo: TestInfo): Promise<void> {
  const failed = testInfo.status !== testInfo.expectedStatus;

  // Named, full-page screenshot per context. Built-in screenshot is disabled in
  // config, so this fixture is the sole source of failure screenshots — gate on
  // failure directly. `screenshot:'on'` still forces a shot every test.
  const ss = screenshotMode(testInfo);
  if (failed || ss === 'on') {
    const buf = await page.screenshot({ fullPage: true }).catch(() => null);
    if (buf) await testInfo.attach(`${name}.png`, { body: buf, contentType: 'image/png' }).catch(() => {});
  }

  if (traced.has(ctx)) {
    const mode = traceMode(testInfo);
    const keep =
      mode === 'on' ||
      (mode === 'retain-on-failure' && failed) ||
      (mode === 'on-first-retry' && testInfo.retry === 1) ||
      (mode === 'on-all-retries' && testInfo.retry > 0);
    const tracePath = path.join(testInfo.outputDir, `trace-${name}.zip`);
    await ctx.tracing.stop(keep ? { path: tracePath } : {}).catch(() => {});
    if (keep) await testInfo.attach(`trace-${name}`, { path: tracePath, contentType: 'application/zip' }).catch(() => {});
  }

  const video = page.video();
  await ctx.close();
  if (video) await attachVideo(video, name, testInfo);
}

// ---- lazy page proxy -----------------------------------------------------
// Returns a Proxy<Page> that creates the real ctx + page on first method call.
// After init, sync methods (locator, getByRole, …) must be BOUND to the real
// page — otherwise `page.locator(...).first()` errors with `.first is not a
// function` (a Promise wrapping the locator is returned instead).
function makeLazyPage(factory: () => Promise<{ ctx: BrowserContext; page: Page }>) {
  let ctx: BrowserContext | undefined;
  let page: Page | undefined;
  async function init() { if (!page) ({ ctx, page } = await factory()); return page!; }

  const proxy = new Proxy({} as Page, {
    get(_, prop: string) {
      if (prop === 'then' || prop === 'catch' || prop === 'finally') return undefined;
      if (page) {
        const v = (page as any)[prop];
        return typeof v === 'function' ? v.bind(page) : v;
      }
      return (...args: unknown[]) => init().then((p) => (p as any)[prop](...args));
    },
  });

  const teardown = async (name: string, testInfo: TestInfo) => {
    if (!ctx || !page) return; // never initialised → no work
    await finishContext(ctx, page, name, testInfo);
  };

  return { proxy, teardown };
}

export const test = base.extend<Fixtures>({
  // Stagehand owns the browser when an API key is present; otherwise null (no
  // browser is launched, so no stray about:blank window).
  stagehand: async ({}, use, testInfo) => {
    if (!AI_ENABLED) {
      await use(null);
      return;
    }
    const sh = new Stagehand({
      env: 'LOCAL',
      // V3Options.model — string auto-loads ANTHROPIC_API_KEY, or {modelName,apiKey} explicit.
      model: { modelName: STAGEHAND_MODEL, apiKey: process.env.ANTHROPIC_API_KEY },
      // Stagehand launches the LOCAL browser headed by default — honor Playwright's
      // headed/headless signal (`--headed` sets use.headless=false; default headless).
      // LAUNCH_ARGS disables cross-document view transitions (see VT_FLAG note).
      localBrowserLaunchOptions: { headless: isHeadless(testInfo), args: LAUNCH_ARGS },
      selfHeal: true,
      verbose: 0,
    } as ConstructorParameters<typeof Stagehand>[0]);
    await sh.init();
    if (DEBUG) console.log(`[melon] launch: Stagehand/CDP${process.env.MELON_VT_KEEP ? ' (view transitions KEPT)' : ' (view transitions disabled)'}`);
    setActiveStagehand(sh);
    await use(sh);
    setActiveStagehand(null);
    await sh.close();
  },

  // The browser our contexts come from: Stagehand's (via CDP) or a plain PW one.
  // We do NOT depend on the built-in `browser` fixture — that would launch a
  // second, unused browser whenever Stagehand owns one.
  pageBrowser: async ({ stagehand }, use, testInfo) => {
    if (stagehand) {
      // slowMo is a launch-time option, but Stagehand launched the browser — so
      // apply it on the CDP connection instead (connectOverCDP supports slowMo).
      const slowMo = (testInfo.project.use.launchOptions as { slowMo?: number } | undefined)?.slowMo;
      const cdp = await chromium.connectOverCDP({ wsEndpoint: stagehand.connectURL(), slowMo });
      let closingIntentionally = false;
      cdp.on('disconnected', () => {
        if (closingIntentionally) return; // our own teardown close() below — expected
        console.error('CRITICAL: CDP connection lost!');
        process.exit(1);
      });
      // Stagehand's init() opens a default about:blank page/window we never use.
      // Close it so there's no stray window (Stagehand acts on the pages we pass).
      for (const ctx of cdp.contexts()) {
        for (const pg of ctx.pages()) {
          if (pg.url() === 'about:blank') await pg.close().catch(() => {});
        }
      }
      await use(cdp);
      closingIntentionally = true;
      await cdp.close();
      return;
    }
    // Manual chromium.launch ignores --headed too — apply the same signal.
    // channel: 'chrome' uses the real, installed Google Chrome (matching Stagehand's
    // chrome-launcher path). LAUNCH_ARGS disables cross-document view transitions —
    // the real cause of the blank/"white" frame (see VT_FLAG note above), NOT the
    // Chromium-fingerprinting theory this comment used to carry.
    const browser = await chromium.launch({
      channel: 'chrome',
      ...testInfo.project.use.launchOptions,
      headless: isHeadless(testInfo),
      args: [...LAUNCH_ARGS, ...(testInfo.project.use.launchOptions?.args ?? [])],
    });
    if (DEBUG) console.log(`[melon] launch: plain Chrome${process.env.MELON_VT_KEEP ? ' (view transitions KEPT)' : ' (view transitions disabled)'}`);
    await use(browser);
    await browser.close();
  },

  shopperPage: async ({ pageBrowser }, use, testInfo) => {
    const { ctx, page } = await openContext(pageBrowser, testInfo, {}, 'shopper');
    await use(page);
    await finishContext(ctx, page, 'shopperPage', testInfo);
  },

  adminPage: async ({ pageBrowser }, use, testInfo) => {
    const { proxy, teardown } = makeLazyPage(async () => {
      const state = await ensureAdminState(testInfo.project.name, testInfo.project.use.baseURL!);
      return openContext(pageBrowser, testInfo, { storageState: state }, 'admin');
    });
    await use(proxy);
    await teardown('adminPage', testInfo);
  },

  emailPage: async ({ pageBrowser }, use, testInfo) => {
    // Admin auth so the Mailpit view + any wp-admin nav is available.
    const { proxy, teardown } = makeLazyPage(async () => {
      const state = await ensureAdminState(testInfo.project.name, testInfo.project.use.baseURL!);
      return openContext(pageBrowser, testInfo, { storageState: state }, 'email');
    });
    await use(proxy);
    await teardown('emailPage', testInfo);
  },
});

export { expect } from '@playwright/test';
