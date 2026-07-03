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
// adminPage/emailPage are lazy.
import { test as base, chromium, devices, type Browser, type Page, type BrowserContext, type Video, type TestInfo } from '@playwright/test';
import { Stagehand } from '@browserbasehq/stagehand';
import { setActiveStagehand } from '../helpers/resilient';
import path from 'path';

const AI_ENABLED = !!process.env.ANTHROPIC_API_KEY;
const STAGEHAND_MODEL = process.env.STAGEHAND_MODEL || 'anthropic/claude-sonnet-4-6';

// Drop benign log noise at the console layer:
//  - the Vercel AI SDK "System messages in the prompt…" warning Stagehand triggers
//    (AI_SDK_LOG_WARNINGS=false doesn't catch this one in the bundled SDK version);
//  - the background CDP-teardown rejection (#1390) that STAGEHAND'S OWN logger prints.
//    The process guard below already stops these from FAILING a test; Stagehand's
//    own once-handler still LOGS the one it absorbs — this silences that residual line.
// Stringify object args so a `{ reason }` object is matched, not just string lines.
(globalThis as Record<string, unknown>).AI_SDK_LOG_WARNINGS = false;
const LOG_NOISE = /System messages in the prompt|allowSystemInMessages|-32001|Session with given id not found|CDP session detached/i;
for (const level of ['log', 'warn', 'error'] as const) {
  const orig = console[level].bind(console);
  console[level] = (...args: any[]) => {
    let blob = '';
    try { blob = args.map((a) => (typeof a === 'string' ? a : JSON.stringify(a))).join(' '); } catch { /* circular arg */ }
    if (LOG_NOISE.test(blob)) return;
    orig(...args);
  };
}

// ---- Stagehand background-CDP rejection guard -----------------------------
// Known Stagehand v3 bug — browserbase/stagehand#1390. Stagehand connects over
// CDP and auto-attaches to EVERY target, including the short-lived Stripe iframe
// (js.stripe.com), PayPal popup, and lazily-created admin/email contexts our
// flows open/close. When such a transient target dies mid-attach, an inflight CDP
// op rejects ("-32001 Session with given id not found" / "CDP session detached").
// Stagehand registers its OWN handler with process.once('unhandledRejection'), so
// it absorbs the FIRST such rejection then unhooks — the 2nd reaches Playwright's
// worker handler (process.on('unhandledRejection') → _currentTest._failWithError),
// failing a test for a reason unrelated to its assertions (the flow succeeded).
//
// The issue's endorsed workaround is a PERSISTENT host-app handler that catches
// CDP-session errors specifically and lets everything else propagate. We can't
// patch Stagehand's bundled dist, so we filter at the process level: swallow ONLY
// these benign background CDP-teardown rejections and re-dispatch every other
// reason to Playwright's original handler(s), preserving real failure detection.
// This only intercepts the UNHANDLED-rejection channel — awaited Stagehand/Playwright
// failures throw with real stacks through the test's await chain and are untouched,
// so a genuine bug is never masked. Runs once per worker.
const STAGEHAND_CDP_NOISE = /-32001|Session with given id not found|CDP session detached/i;
const REJECTION_GUARD_FLAG = '__nopongStagehandRejectionGuard';
if (AI_ENABLED && !(globalThis as Record<string, unknown>)[REJECTION_GUARD_FLAG]) {
  (globalThis as Record<string, unknown>)[REJECTION_GUARD_FLAG] = true;
  // Playwright's worker registers its unhandledRejection listener in the
  // WorkerMain constructor, before any test file (and thus this module) loads —
  // so it's already present and we proxy through it.
  const priorListeners = process.listeners('unhandledRejection') as Array<
    (reason: unknown, promise: Promise<unknown>) => void
  >;
  process.removeAllListeners('unhandledRejection');
  process.on('unhandledRejection', (reason, promise) => {
    const msg = String((reason as { message?: string } | undefined)?.message ?? reason);
    if (STAGEHAND_CDP_NOISE.test(msg)) return; // benign Stagehand CDP teardown race — drop
    if (priorListeners.length === 0) {
      // No handler to defer to: don't silently swallow a real rejection.
      console.error('[fixtures] unhandled rejection (no prior listener):', reason);
      return;
    }
    for (const listener of priorListeners) listener(reason, promise);
  });
}

type Fixtures = {
  /** Stagehand instance for AI fallback, or null when ANTHROPIC_API_KEY is unset. */
  stagehand: Stagehand | null;
  /** Browser the contexts are created from — Stagehand's CDP browser, or plain PW. */
  pageBrowser: Browser;
  shopperPage: Page;
  /** Shopper context emulating a phone (375×812, touch) — for responsive-only UI. */
  mobileShopperPage: Page;
  adminPage: Page;
  emailPage: Page;
};

// Mobile emulation profile for mobileShopperPage — the iPhone X descriptor is
// 375×812 (exactly GI 19's viewport) and carries the real mobile UA, scale,
// isMobile + hasTouch. Baked into the context at creation (NOT setViewportSize
// after load) so the page paints mobile from the first byte and any
// breakpoint/touch-gated JS binds correctly. GI 19's add-to-cart popup only
// fires below the theme's 767px breakpoint.
const MOBILE_EMULATION = devices['iPhone X'];

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

// playwright.config uses video.{mode,size,show.{actions,test}};
// browser.newContext uses recordVideo.{dir,size,showActions,showTest}.
function getRecordVideoOptions(testInfo: TestInfo, dir: string) {
  const cfg = (testInfo.project.use.video ?? {}) as any;
  const mode = typeof cfg === 'string' ? cfg : cfg.mode;
  if (mode === 'off') return undefined;
  const size = cfg.size ?? { width: 1280, height: 720 };
  const showActions = cfg.show?.actions ?? cfg.showActions;
  const showTest = cfg.show?.test ?? cfg.showTest;
  return { dir, size, ...(showActions ? { showActions } : {}), ...(showTest ? { showTest } : {}) };
}

type CaptureMode = 'off' | 'on' | 'retain-on-failure' | 'on-first-retry' | 'on-all-retries';
const traceMode = (testInfo: TestInfo): CaptureMode =>
  ((testInfo.project.use as { trace?: CaptureMode }).trace ?? 'off');
const videoMode = (testInfo: TestInfo): CaptureMode => {
  const cfg = (testInfo.project.use.video ?? 'off') as CaptureMode | { mode?: CaptureMode };
  return typeof cfg === 'string' ? cfg : (cfg.mode ?? 'off');
};
const screenshotMode = (testInfo: TestInfo): 'off' | 'on' | 'only-on-failure' =>
  ((testInfo.project.use as { screenshot?: 'off' | 'on' | 'only-on-failure' }).screenshot ?? 'off');

// Whether an artifact (trace/video) recorded under `mode` should be kept for
// this run. `on` = always; the rest keep only on failure / the matching retry.
function keepCapture(mode: CaptureMode, testInfo: TestInfo, failed: boolean): boolean {
  return (
    mode === 'on' ||
    (mode === 'retain-on-failure' && failed) ||
    (mode === 'on-first-retry' && testInfo.retry === 1) ||
    (mode === 'on-all-retries' && testInfo.retry > 0)
  );
}

const traced = new WeakSet<BrowserContext>();

// ---- context lifecycle (trace + screenshot + video, honoring config) -----

async function openContext(
  pageBrowser: Browser,
  testInfo: TestInfo,
  extra: Record<string, unknown> = {}
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
  // config (it would attach a duplicate `screenshot.png`), so this fixture is the
  // sole source of failure screenshots — gate on failure directly, not the config
  // key. `screenshot:'on'` in config still forces a shot every test.
  const ss = screenshotMode(testInfo);
  if (failed || ss === 'on') {
    const buf = await page.screenshot({ fullPage: true }).catch(() => null);
    if (buf) await testInfo.attach(`${name}.png`, { body: buf, contentType: 'image/png' }).catch(() => {});
  }

  if (traced.has(ctx)) {
    const keep = keepCapture(traceMode(testInfo), testInfo, failed);
    const tracePath = path.join(testInfo.outputDir, `trace-${name}.zip`);
    await ctx.tracing.stop(keep ? { path: tracePath } : {}).catch(() => {});
    if (keep) await testInfo.attach(`trace-${name}`, { path: tracePath, contentType: 'application/zip' }).catch(() => {});
  }

  // Video records every test (recordVideo can't be toggled post-hoc), so honor
  // the mode here: attach when kept, otherwise discard the file (no pass spam).
  const video = page.video();
  await ctx.close();
  if (video) {
    if (keepCapture(videoMode(testInfo), testInfo, failed)) await attachVideo(video, name, testInfo);
    else await video.delete().catch(() => {});
  }
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
      // Unwrap to the underlying real Page for libraries that reject the Proxy
      // (Stagehand: "expected Page or Frame"). Undefined until first use — but by
      // the time the AI tier runs, a Playwright tier has already initialised it.
      if (prop === '__realPage') return page;
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

import { authStatePath } from '../admin-login';

export const test = base.extend<Fixtures>({
  // Stagehand owns the browser when an API key is present; otherwise null.
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
      localBrowserLaunchOptions: { headless: isHeadless(testInfo) },
      selfHeal: true,
      verbose: 0,
    } as ConstructorParameters<typeof Stagehand>[0]);
    await sh.init();
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
      // Stagehand's init() opens a default about:blank page/window we never use.
      // Close it so there's no stray window (Stagehand acts on the pages we pass).
      // NOTE: every test must request the eager shopperPage so a real page always
      // exists — Chromium exits when its last page closes, and a lone stray
      // about:blank confuses connectOverCDP's active-target resolution (admin-only
      // tests otherwise fail with "browser has been closed" / "Not attached to an
      // active page"). Admin/email-only specs add shopperPage purely as a keepalive.
      for (const ctx of cdp.contexts()) {
        for (const pg of ctx.pages()) {
          if (pg.url() === 'about:blank') await pg.close().catch(() => {});
        }
      }
      await use(cdp);
      await cdp.close();
      return;
    }
    // Manual chromium.launch ignores --headed too — apply the same signal.
    const browser = await chromium.launch({ ...testInfo.project.use.launchOptions, headless: isHeadless(testInfo) });
    await use(browser);
    await browser.close();
  },

  shopperPage: async ({ pageBrowser }, use, testInfo) => {
    const { ctx, page } = await openContext(pageBrowser, testInfo);
    // Captcha bypass: the first visit to the site with ?sc_bypass=1 sets the
    // server-side bypass flag (cookie) for this context, so the later checkout /
    // registration submits skip the captcha. Relative goto resolves against the
    // baseURL trailing slash (rule 12). Best-effort: skipped when baseURL is unset.
    await page.goto('?sc_bypass=1', { waitUntil: 'load' }).catch(() => {});
    await use(page);
    await finishContext(ctx, page, 'shopperPage', testInfo);
  },

  // Phone-emulated shopper context. DELIBERATELY independent of pageBrowser /
  // Stagehand: Stagehand owns Chrome via connectOverCDP, and that hop DROPS
  // newContext device emulation (the page falls back to Stagehand's 1288px
  // window — see the Stagehand-CDP memory). The popup check uses only plain
  // locator clicks + toBeVisible (no AI self-heal), so we launch our own plain
  // chromium where devices['iPhone X'] applies cleanly. Not requesting
  // pageBrowser means Stagehand never even inits for these tests.
  mobileShopperPage: async ({}, use, testInfo) => {
    const browser = await chromium.launch({ ...testInfo.project.use.launchOptions, headless: isHeadless(testInfo) });
    const { ctx, page } = await openContext(browser, testInfo, MOBILE_EMULATION);
    await page.goto('?sc_bypass=1', { waitUntil: 'load' }).catch(() => {});
    await use(page);
    await finishContext(ctx, page, 'mobileShopperPage', testInfo);
    await browser.close();
  },

  adminPage: async ({ pageBrowser }, use, testInfo) => {
    const { proxy, teardown } = makeLazyPage(() => openContext(pageBrowser, testInfo, { storageState: authStatePath(testInfo.project.name) }));
    await use(proxy);
    await teardown('adminPage', testInfo);
  },

  emailPage: async ({ pageBrowser }, use, testInfo) => {
    // Admin auth so the Mailpit view + any wp-admin nav is available.
    const { proxy, teardown } = makeLazyPage(() => openContext(pageBrowser, testInfo, { storageState: authStatePath(testInfo.project.name) }));
    await use(proxy);
    await teardown('emailPage', testInfo);
  },
});

export { expect } from '@playwright/test';
