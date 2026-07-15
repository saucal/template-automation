// Fixtures — three pages (shopper / admin / email). shopperPage is eager (every
// spec uses it); adminPage + emailPage are lazy Proxies (contexts only spin up if
// used) and authenticate lazily per-environment via ensureAdminState (rule 32).
//
// No test logic / assertions here — see helpers/. Failure screenshots are owned
// here (rule 25): screenshot:'off' in config, and finishContext captures ONE
// named full-page shot per context, gated on failure.
import { test as base, type Page, type BrowserContext, type Video, type TestInfo } from '@playwright/test';
import { Stagehand } from '@browserbasehq/stagehand';
import { ensureAdminState } from '../helpers/admin-login';
import { setActiveStagehand } from '../helpers/resilient';

type Fixtures = { shopperPage: Page; adminPage: Page; emailPage: Page };
type WorkerFixtures = { stagehand: Stagehand | null };

/**
 * Worker-scoped Stagehand handle for the resilient wrapper's AI tier (rule 23).
 * INERT until ANTHROPIC_API_KEY is set: with no key we register `null`, so
 * resilientClick/Fill/Text fall back to pure Playwright (primary → alt) and never
 * invoke AI. When the key is present we spin up one Stagehand per worker and
 * register it, so a broken selector self-heals via act()/extract().
 *
 * NOTE (enabling AI, do once the key is added + verify): Stagehand LOCAL launches
 * its OWN browser. For act()/observe() to target the SAME pages the fixtures drive,
 * the shopper/admin/email contexts must be created from a browser connected to
 * Stagehand over CDP (chromium.connectOverCDP(stagehand-cdp-endpoint)) — see
 * docs/locator-fallback-strategy.md. That bridge is the remaining step; it needs a
 * live key to verify, so it's intentionally not wired blind here.
 */
async function createStagehand(): Promise<Stagehand | null> {
  if (!process.env.ANTHROPIC_API_KEY) return null;
  const sh = new Stagehand({
    env: 'LOCAL',
    model: { modelName: 'anthropic/claude-sonnet-4-6', apiKey: process.env.ANTHROPIC_API_KEY },
    selfHeal: true,
  } as ConstructorParameters<typeof Stagehand>[0]);
  await sh.init();
  return sh;
}

// The Klaviyo signup popup is dismissed with a real close-button click in
// helpers/melon.ts `closePopup` (called after each navigation), not CSS-hidden.

// playwright.config uses video.{mode,size}; browser.newContext uses recordVideo.{dir,size}.
function getRecordVideoOptions(testInfo: TestInfo, dir: string) {
  const cfg = (testInfo.project.use.video ?? {}) as any;
  return { dir, size: cfg.size ?? { width: 1280, height: 720 } };
}

// video.path() resolves only AFTER ctx.close() finalises the recording.
async function attachVideo(video: Video, name: string, testInfo: TestInfo): Promise<void> {
  const videoPath = await video.path().catch(() => null);
  if (videoPath) {
    await testInfo.attach(name, { path: videoPath, contentType: 'video/webm' }).catch(() => {});
  }
}

// One named full-page screenshot per context, only on failure (rule 25).
async function attachFailureShot(page: Page, name: string, testInfo: TestInfo): Promise<void> {
  if (testInfo.status === testInfo.expectedStatus) return;
  const buf = await page.screenshot({ fullPage: true }).catch(() => null);
  if (buf) await testInfo.attach(name, { body: buf, contentType: 'image/png' }).catch(() => {});
}

// Returns a Proxy<Page> that creates the real ctx + page on first method call.
// AFTER init, sync methods must be BOUND to the real page, else `.first()` errors.
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
    await attachFailureShot(page, name, testInfo);
    const video = page.video();
    await ctx.close();
    if (video) await attachVideo(video, name, testInfo);
  };

  return { proxy, teardown };
}

export const test = base.extend<Fixtures, WorkerFixtures>({
  // One Stagehand per worker; register it for the resilient wrapper, tear down after.
  stagehand: [
    async ({}, use) => {
      const sh = await createStagehand();
      setActiveStagehand(sh);
      await use(sh);
      setActiveStagehand(null);
      if (sh) await sh.close();
    },
    { scope: 'worker', auto: true },
  ],

  shopperPage: async ({ browser }, use, testInfo) => {
    const ctx = await browser.newContext({
      ...testInfo.project.use,
      recordVideo: getRecordVideoOptions(testInfo, testInfo.outputDir),
    });
    const page = await ctx.newPage();
    await use(page);
    await attachFailureShot(page, 'shopperPage', testInfo);
    const video = page.video();
    await ctx.close();
    if (video) await attachVideo(video, 'shopperPage', testInfo);
  },

  adminPage: async ({ browser }, use, testInfo) => {
    const { proxy, teardown } = makeLazyPage(async () => {
      const state = await ensureAdminState(testInfo.project.name, testInfo.project.use.baseURL!);
      const ctx = await browser.newContext({
        ...testInfo.project.use,
        storageState: state,
        recordVideo: getRecordVideoOptions(testInfo, testInfo.outputDir),
      });
      return { ctx, page: await ctx.newPage() };
    });
    await use(proxy);
    await teardown('adminPage', testInfo);
  },

  emailPage: async ({ browser }, use, testInfo) => {
    // Uses admin auth so wp-admin AJAX (Playgrounds email plugin) is available.
    const { proxy, teardown } = makeLazyPage(async () => {
      const state = await ensureAdminState(testInfo.project.name, testInfo.project.use.baseURL!);
      const ctx = await browser.newContext({
        ...testInfo.project.use,
        storageState: state,
        recordVideo: getRecordVideoOptions(testInfo, testInfo.outputDir),
      });
      return { ctx, page: await ctx.newPage() };
    });
    await use(proxy);
    await teardown('emailPage', testInfo);
  },
});

export { expect } from '@playwright/test';
