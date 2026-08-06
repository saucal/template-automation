// Template for fixtures/index.ts — three isolated contexts per test, ALL lazy.
//
//   shopperPage — the storefront customer
//   adminPage   — loaded with auth/admin.json
//   emailPage   — renders Mailpit / Playgrounds messages as evidence
//
// Every one is a Proxy that only opens a context on FIRST USE, so an
// admin-only test never launches a shopper context and vice versa.
//
// The browser comes from Stagehand over CDP so the resilient wrapper's AI tier
// can drive the same pages (NO_STAGEHAND=1 falls back to a plain Playwright
// browser with the AI tier disabled).
//
// Everything here is read from playwright.config.ts — headless, slowMo,
// viewport, trace, launchOptions. NEVER invent a bespoke env var (HEADED=1) for
// something the runner already models; --headed and `use` must win.
//
// Gotcha once pages are lazy: register `page.on('dialog', …)` AFTER the first
// goto on a proxied page. Registering before it double-inits the context and the
// handler binds to a different page instance than the one navigating.
import { test as base, expect, chromium } from '@playwright/test';
import type {
  Browser,
  BrowserContext,
  LaunchOptions,
  Page,
  TestInfo,
  WorkerInfo,
} from '@playwright/test';
import { Stagehand } from '@browserbasehq/stagehand';
import fs from 'fs';
import { ADMIN_STATE } from '../global-setup';
import { registerAiTier } from '../helpers/resilient';

const DEFAULT_VIEWPORT = { width: 1920, height: 1080 };

/**
 * Consent cookies, pre-seeded so the banner never renders.
 * Identify the ACTUAL plugin first — this is Cookie Law Info (`cli-*`);
 * CookieYes uses `cky-*` and these names are a silent no-op there.
 */
const CONSENT_COOKIES = (url: string) => {
  const { hostname } = new URL(url);
  const base = { domain: hostname, path: '/' };
  return [
    { name: 'viewed_cookie_policy', value: 'yes', ...base },
    { name: 'cookielawinfo-checkbox-necessary', value: 'yes', ...base },
    { name: 'cookielawinfo-checkbox-non-necessary', value: 'yes', ...base },
    { name: 'CookieLawInfoConsent', value: 'yes', ...base },
  ];
};

/**
 * Browser launch settings, read from playwright.config.ts.
 *
 * Contexts do NOT need this: the runner injects `use` into every
 * browser.newContext() it sees, baseURL included (verified — a manual context
 * resolves a relative goto against baseURL). A browser this fixture launches
 * itself is outside that, so launch-time options have to be read by hand.
 *
 * Takes the info object structurally because the runtime fixture is
 * worker-scoped and receives WorkerInfo, while page fixtures get TestInfo —
 * both carry `project.use`, which is all this needs.
 *
 * `slowMo` is split out because on the Stagehand path Stagehand, not us,
 * launches the browser — slowMo is applied to the CDP connection instead.
 *
 * `viewport` is returned for the same reason: measured, a Stagehand-launched
 * browser renders at Stagehand's own DEFAULT_VIEWPORT (1288x711 —
 * stagehand/dist/esm/lib/v3/v3.js `configuredViewport`) no matter what
 * newContext was told, and page.viewportSize() still reports the value we asked
 * for, so the mismatch is INVISIBLE from the test side (it silently recorded a
 * whole suite of visual baselines at the wrong size). It has to be handed to
 * Stagehand's own launch options. Declare viewport ONCE, in the project's `use`
 * (after the devices spread, which carries its own 1280x720), and let the
 * browser launch, the context and the video size all derive from this read.
 */
function launchSettings({ project }: WorkerInfo | TestInfo): {
  headless: boolean;
  slowMo: number | undefined;
  launch: Omit<LaunchOptions, 'headless' | 'slowMo'>;
  viewport: { width: number; height: number };
} {
  const { headless, launchOptions = {}, viewport } = project.use as {
    headless?: boolean;
    launchOptions?: LaunchOptions;
    viewport?: { width: number; height: number } | null;
  };
  const { slowMo, headless: _ignored, ...launch } = launchOptions;
  return {
    headless: headless !== false,
    slowMo,
    launch,
    viewport: viewport ?? DEFAULT_VIEWPORT,
  };
}

/**
 * Swallows Stagehand's CDP-teardown unhandled rejections (browserbase/stagehand#1390).
 *
 * Stagehand registers `process.once('unhandledRejection')`, absorbs the FIRST
 * CDP-teardown error then unhooks — so the SECOND reaches Playwright's worker
 * handler and fails an unrelated test. Short-lived targets trigger it: gateway
 * iframes, the PayPal / Klarna popups, closing lazy contexts. Only the
 * unhandled-rejection channel is intercepted; awaited throws keep their stacks.
 */
function guardCdpRejections(): void {
  const CDP_NOISE = /-32001|Session with given id not found|CDP session detached/i;
  const existing = process.listeners('unhandledRejection');
  process.removeAllListeners('unhandledRejection');
  process.on('unhandledRejection', (reason, promise) => {
    if (CDP_NOISE.test(String((reason as Error)?.message ?? reason))) return;
    for (const listener of existing) listener(reason, promise);
  });
}

type Runtime = { browser: Browser; stagehand: Stagehand | null };

export const test = base.extend<
  { shopperPage: Page; adminPage: Page; emailPage: Page },
  { runtime: Runtime }
>({
  runtime: [
    async ({}, use, workerInfo) => {
      const { headless, slowMo, launch, viewport } = launchSettings(workerInfo);

      // NO_STAGEHAND=1 launches a plain Playwright browser and disables the AI
      // tier. Note that visual baselines are BROWSER-SOURCE-DEPENDENT: Stagehand's
      // Chrome and Playwright's chromium render differently, so baselines
      // recorded on one source fail wholesale on the other even at an identical
      // viewport. Pick one source for visual specs and stay on it.
      if (process.env.NO_STAGEHAND === '1') {
        const plain = await chromium.launch({ ...launch, headless, slowMo });
        registerAiTier(null);
        await use({ browser: plain, stagehand: null });
        await plain.close().catch(() => {});
        return;
      }

      guardCdpRejections();

      // Provider is a .env switch, not a code change: set STAGEHAND_MODEL to any
      // model Stagehand supports and supply the matching key.
      const modelName = process.env.STAGEHAND_MODEL ?? 'anthropic/claude-sonnet-4-6';
      const apiKey =
        process.env.STAGEHAND_API_KEY ??
        (modelName.startsWith('openai/') ? process.env.OPENAI_API_KEY : process.env.ANTHROPIC_API_KEY);

      const stagehand = new Stagehand({
        env: 'LOCAL',
        model: { modelName, apiKey },
        selfHeal: true,
        verbose: 0,
        // Cast because Stagehand types this as its own option bag, not
        // Playwright's — the overlapping keys are passed to its LOCAL launch.
        // viewport MUST be here: newContext({viewport}) does not resize a browser
        // Stagehand launched.
        localBrowserLaunchOptions: { ...launch, headless, viewport } as Record<string, unknown>,
      });
      await stagehand.init();
      // slowMo goes on the connection, not the launch: Stagehand owns the browser
      // process here, and connectOverCDP honours slowMo itself.
      const browser = await chromium.connectOverCDP(stagehand.connectURL(), slowMo ? { slowMo } : {});

      // KEEPALIVE. stagehand.init() leaves one about:blank page open. Every page
      // fixture here is lazy, so closing it means the CDP-attached Chromium exits
      // as soon as the last test context closes ("Target page, context or browser
      // has been closed"). A lone about:blank ALSO breaks connectOverCDP's
      // active-target resolution ("Not attached to an active page"). Both are
      // solved by navigating that page to baseURL and leaving it open for the
      // worker's lifetime: one real page, no blank target, one load per worker.
      const baseURL = (workerInfo.project.use as { baseURL?: string }).baseURL;
      const [first, ...rest] = browser.contexts().flatMap((ctx) => ctx.pages());
      for (const stray of rest) await stray.close().catch(() => {});
      if (first && baseURL) await first.goto(baseURL, { waitUntil: 'domcontentloaded' }).catch(() => {});

      registerAiTier({
        act: async (page, instruction) => {
          await stagehand.act(instruction, { page });
        },
        extract: async (page, instruction) => {
          // Schema-less overload on purpose: passing a zod schema here makes tsc
          // blow its heap on Stagehand's generic inference (TS2589), and the
          // wrapper only ever needs one string back.
          const result = await stagehand.extract(instruction, { page });
          return String(result.extraction ?? '').trim();
        },
      });

      await use({ browser, stagehand });

      registerAiTier(null);
      await browser.close().catch(() => {});
      await stagehand.close().catch(() => {});
    },
    { scope: 'worker' },
  ],

  shopperPage: async ({ runtime }, use, testInfo) => {
    const lazy = lazyPage(runtime.browser, testInfo, false, 'shopperPage');
    await use(lazy.proxy);
    await lazy.finish();
  },

  adminPage: async ({ runtime }, use, testInfo) => {
    const lazy = lazyPage(runtime.browser, testInfo, true, 'adminPage');
    await use(lazy.proxy);
    await lazy.finish();
  },

  emailPage: async ({ runtime }, use, testInfo) => {
    const lazy = lazyPage(runtime.browser, testInfo, false, 'emailPage');
    await use(lazy.proxy);
    await lazy.finish();
  },
});

/** Contexts whose tracing actually started, so finishContext knows to stop it. */
const traced = new WeakSet<BrowserContext>();

/**
 * Bridges the config's video options onto newContext's recordVideo shape
 * (playwright.config uses `video.{mode,show.{actions,test}}`; newContext uses
 * `recordVideo.{dir,size,showActions,showTest}`). Size always comes from the
 * viewport — never a second hardcoded size, or the video is a squashed rescale.
 */
function recordVideoOptions(testInfo: TestInfo, viewport: { width: number; height: number }) {
  const video = (testInfo.project.use.video ?? {}) as {
    show?: { actions?: unknown; test?: unknown };
  };
  return {
    dir: testInfo.outputPath('videos'),
    size: viewport,
    ...(video.show?.actions ? { showActions: video.show.actions } : {}),
    ...(video.show?.test ? { showTest: video.show.test } : {}),
  };
}

async function openContext(
  browser: Browser,
  testInfo: TestInfo,
  asAdmin: boolean
): Promise<{ ctx: BrowserContext; page: Page }> {
  const { viewport } = launchSettings(testInfo);
  const ctx = await browser.newContext({
    // wp-admin ships an INLINE cross-document view transition
    // (`@view-transition{navigation:auto}`) gated on
    // `prefers-reduced-motion: no-preference`. On a click-driven form-submit
    // redirect the compositor holds the OLD page's snapshot: the page goes white,
    // page.screenshot() hangs, video freezes, and the NEXT click times out on
    // "waiting for element to be visible, enabled and stable" — with the snapshot
    // showing that element visible, enabled and correctly labelled. Reduced
    // motion stops the transition existing rather than racing it.
    reducedMotion: 'reduce',
    viewport,
    ignoreHTTPSErrors: true,
    recordVideo: recordVideoOptions(testInfo, viewport),
    storageState: asAdmin && fs.existsSync(ADMIN_STATE) ? ADMIN_STATE : undefined,
  });
  // Honour the config's `trace`. The runner's artifacts instrumentation has
  // ALREADY started tracing on this context (measured: our own start() fails with
  // "Tracing has been already started" on both browser paths), but it never saves
  // the zip — its teardown only runs for contexts IT created, and every context
  // here is ours, so the recording was silently discarded on close and `trace:
  // 'on'` produced no trace, ever. So don't start: mark it, and stop it into a
  // file in finishContext. Modes collapse to on/off deliberately — the
  // retain-on-* variants need a failure verdict that isn't known until then.
  if ((testInfo.project.use as { trace?: unknown }).trace !== 'off') {
    traced.add(ctx);
    // Fallback for the case where nothing started it; harmless if it throws
    // because tracing is already running, which is the normal path.
    await ctx.tracing.start({ screenshots: true, snapshots: true, sources: true }).catch(() => {});
  }
  await ctx.addCookies(CONSENT_COOKIES(process.env.BASE_URL!));
  const page = await ctx.newPage();
  return { ctx, page };
}

async function finishContext(
  ctx: BrowserContext,
  page: Page,
  testInfo: TestInfo,
  name: string
): Promise<void> {
  if (testInfo.status !== testInfo.expectedStatus) {
    try {
      // animations: 'disabled' so a page with a running CSS animation can still be
      // captured — with the default this timed out on the admin order screen and
      // the failing run had NO screenshot at all.
      const shot = await page.screenshot({ fullPage: true, timeout: 30_000, animations: 'disabled' });
      await testInfo.attach(`${name}.png`, { body: shot, contentType: 'image/png' });
    } catch (error) {
      console.warn(`[fixtures] could not capture ${name}.png: ${(error as Error).message.split('\n')[0]}`);
    }
  }
  if (traced.has(ctx)) {
    const tracePath = testInfo.outputPath(`${name}-trace.zip`);
    try {
      await ctx.tracing.stop({ path: tracePath });
      if (fs.existsSync(tracePath)) {
        await testInfo.attach(`${name}-trace.zip`, { path: tracePath, contentType: 'application/zip' });
      }
    } catch (error) {
      console.warn(`[fixtures] could not save ${name} trace: ${(error as Error).message.split('\n')[0]}`);
    }
  }
  const video = page.video();
  await ctx.close();
  if (video) {
    // Guarded because attach() COPIES the file: video.path() can point at a path
    // that doesn't exist locally when the browser arrived over CDP, and an
    // unguarded throw here escapes teardown and reports the whole test as a
    // fixture error — masking the actual result. Seen as
    // "ENOENT: copyfile 'test-results/.../videos/page@….webm'".
    try {
      const videoPath = await video.path();
      if (fs.existsSync(videoPath)) {
        await testInfo.attach(`${name}.webm`, { path: videoPath, contentType: 'video/webm' });
      } else {
        console.warn(`[fixtures] ${name} video missing at ${videoPath}`);
      }
    } catch (error) {
      console.warn(`[fixtures] could not attach ${name} video: ${(error as Error).message.split('\n')[0]}`);
    }
  }
}

/**
 * Page that materialises on first async use. After init, sync members must be
 * BOUND to the real page or calls like locator(...).first() throw
 * "is not a function" (they'd return a Promise wrapping the locator).
 */
function lazyPage(browser: Browser, testInfo: TestInfo, asAdmin: boolean, name: string) {
  let real: { ctx: BrowserContext; page: Page } | null = null;

  const ensure = async () => {
    if (!real) real = await openContext(browser, testInfo, asAdmin);
    return real.page;
  };

  const proxy = new Proxy({} as Page, {
    get(_target, prop: string | symbol) {
      if (prop === 'then' || prop === 'catch' || prop === 'finally') return undefined;
      if (real) {
        const value = (real.page as unknown as Record<string | symbol, unknown>)[prop];
        return typeof value === 'function' ? (value as (...a: unknown[]) => unknown).bind(real.page) : value;
      }
      return (...args: unknown[]) =>
        ensure().then((page) => {
          const value = (page as unknown as Record<string | symbol, unknown>)[prop];
          return typeof value === 'function'
            ? (value as (...a: unknown[]) => unknown).apply(page, args)
            : value;
        });
    },
  });

  return {
    proxy,
    finish: async () => {
      if (real) await finishContext(real.ctx, real.page, testInfo, name);
    },
  };
}

export { expect };
