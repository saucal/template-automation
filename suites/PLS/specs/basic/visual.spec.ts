// Visual-regression suite — replaces the GI "Basic WooCommerce Tests" nav-only
// chains (01 Home, 02 All Courses, 05 Private CE, 06 About, 07 Policies,
// 09 Blog, 10 Post). Those GI tests only navigated and looked; a data-driven
// layout screenshot per page covers the same regression surface without one
// test per page. Pages with real behaviour (forms, course, cart, account,
// translation) live in their own specs.
//
// NOTE: the GI export reached About/Policies through a header "FAQ" hover menu
// that no longer exists (current primary nav: Home / Courses / Private CE /
// Contact — About/Policies/Blog moved to the footer), so pages are visited by
// URL. Menu behaviour itself is exercised by the course/order flows (Courses
// submenu) and the translation spec.
//
// Maintenance-cycle workflow: refresh baselines BEFORE updates with
//   npx playwright test specs/basic/visual.spec.ts --update-snapshots
// then run again AFTER updates to compare (same machine/env both times).
import { type Page } from '@playwright/test';
import { test, expect } from '../../fixtures';
import { dismissPopups } from '../../helpers/pls';

// Mask dynamic content so diffs flag layout/markup changes, not price/date drift.
const dynamicMasks = (page: Page) => [
  page.locator('.woocommerce-Price-amount'),
  page.locator('time, .date, .entry-date'),
];

// fullPage screenshots resize the viewport to content height but DON'T fire the
// scroll/intersection events lazy-loaded images wait on — step-scroll to the
// bottom to trigger every loader, wait (bounded) for image decode, scroll back.
const triggerLazyLoad = async (page: Page) => {
  await page.evaluate(async () => {
    const step = window.innerHeight;
    const max = document.body.scrollHeight;
    for (let y = 0; y < max; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 150));
    }
    window.scrollTo(0, 0);
    // Race each image's decode against a timeout: a lazy placeholder with an
    // unassigned src stays !complete forever and fires neither load nor error.
    await Promise.all(
      Array.from(document.images)
        .filter((img) => !img.complete)
        .map(
          (img) =>
            new Promise<void>((res) => {
              const done = () => res();
              img.addEventListener('load', done, { once: true });
              img.addEventListener('error', done, { once: true });
              setTimeout(done, 3000);
            })
        )
    );
  });
  // networkidle never settles on sites with chat/analytics sockets — bound it.
  await page.waitForLoadState('networkidle', { timeout: 5_000 }).catch(() => {});
};

const shot = async (page: Page, name: string) => {
  await triggerLazyLoad(page);
  await expect(page).toHaveScreenshot(`${name}.png`, {
    fullPage: true,
    animations: 'disabled',
    mask: dynamicMasks(page),
  });
};

// Relative paths (baseURL carries the trailing slash — never a leading '/').
// Slugs confirmed live 2026-07-08 (docs/site-exploration.md).
const PAGES: Array<{ name: string; path: string }> = [
  { name: 'home', path: './' },
  { name: 'all-courses', path: 'all-courses/' },
  { name: 'private-ce', path: 'consulting/' },
  { name: 'about', path: 'about/' },
  { name: 'policies', path: 'policies/' },
  { name: 'blog', path: 'blog/' },
  // GI 10 opened this specific post; kept as the representative single-post layout.
  { name: 'post', path: 'adolescent-bulimia-and-vaping/' },
];

test.describe('PLS Visual — content pages', { tag: ['@plugin:woocommerce', '@plugin:kadence-blocks'] }, () => {
  for (const p of PAGES) {
    test(`PLS-VIS — ${p.name}`, async ({ shopperPage: page }) => {
      await page.goto(p.path);
      await page.waitForLoadState('load');
      await dismissPopups(page);
      await shot(page, p.name);
    });
  }
});
