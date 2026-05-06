// Template for fixtures/index.ts — three fixtures (shopper / admin / email).
// shopperPage stays eager (every spec uses it).
// adminPage + emailPage use makeLazyPage so contexts only spin up if used.
import { test as base, type Page, type BrowserContext, type Video, type TestInfo } from '@playwright/test';
import path from 'path';

type Fixtures = { shopperPage: Page; adminPage: Page; emailPage: Page };

// ---- video options bridge ------------------------------------------------
// playwright.config uses video.{mode,size,show.{actions,test}};
// browser.newContext uses recordVideo.{dir,size,showActions,showTest}.
function getRecordVideoOptions(testInfo: TestInfo, dir: string) {
  const cfg = (testInfo.project.use.video ?? {}) as any;
  const size = cfg.size ?? { width: 1280, height: 720 };
  const showActions = cfg.show?.actions ?? cfg.showActions;
  const showTest = cfg.show?.test ?? cfg.showTest;
  return {
    dir,
    size,
    ...(showActions ? { showActions } : {}),
    ...(showTest ? { showTest } : {}),
  };
}

// video.path() resolves only AFTER ctx.close() finalises the recording.
async function attachVideo(video: Video, name: string, testInfo: TestInfo): Promise<void> {
  const videoPath = await video.path().catch(() => null);
  if (videoPath) {
    await testInfo.attach(name, { path: videoPath, contentType: 'video/webm' }).catch(() => {});
  }
}

// ---- lazy page proxy -----------------------------------------------------
// Returns a Proxy<Page> that creates the real ctx + page on first method call.
// Critical: AFTER init, sync methods (locator, getByRole, etc.) must be BOUND
// to the real page — otherwise `page.locator(...).first()` errors with
// `.first is not a function` (returned a Promise wrapping the locator).
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
    if (!ctx) return; // never initialised → no work
    const video = page?.video();
    await ctx.close();
    if (video) await attachVideo(video, name, testInfo);
  };

  return { proxy, teardown };
}

const ADMIN_STATE = path.join(__dirname, '..', 'auth', 'admin.json');

export const test = base.extend<Fixtures>({
  shopperPage: async ({ browser }, use, testInfo) => {
    const ctx = await browser.newContext({
      ...testInfo.project.use,
      recordVideo: getRecordVideoOptions(testInfo, testInfo.outputDir),
    });
    const page = await ctx.newPage();
    await use(page);
    const video = page.video();
    await ctx.close();
    if (video) await attachVideo(video, 'shopperPage', testInfo);
  },

  adminPage: async ({ browser }, use, testInfo) => {
    const { proxy, teardown } = makeLazyPage(async () => {
      const ctx = await browser.newContext({
        ...testInfo.project.use,
        storageState: ADMIN_STATE,
        recordVideo: getRecordVideoOptions(testInfo, testInfo.outputDir),
      });
      return { ctx, page: await ctx.newPage() };
    });
    await use(proxy);
    await teardown('adminPage', testInfo);
  },

  emailPage: async ({ browser }, use, testInfo) => {
    // Uses admin auth so wp-admin AJAX (ajax_object) is available on subsite.
    const { proxy, teardown } = makeLazyPage(async () => {
      const ctx = await browser.newContext({
        ...testInfo.project.use,
        storageState: ADMIN_STATE,
        recordVideo: getRecordVideoOptions(testInfo, testInfo.outputDir),
      });
      return { ctx, page: await ctx.newPage() };
    });
    await use(proxy);
    await teardown('emailPage', testInfo);
  },
});

export { expect } from '@playwright/test';
