// Course PDP + cart parity — replaces GI Basic 13 (Course page) and 14 (Cart
// page). GI 15 (Checkout page) is deliberately NOT ported 1:1: its checkout
// asserts duplicate what the place-order chain verifies on every run (playbook
// triage — duplicates → skip).
//
// The course is picked BEHAVIOURALLY (first in-stock variable-subscription with
// a real price), not GI's pinned grid index [2] which broke as the catalogue
// changed (rule 35). Parity: listing price ↔ PDP variation price ↔ cart line ↔
// cart totals, with the seat qty multiplying the WCS subscription line price.
import { test } from '../../fixtures';
import { runCartFlow } from '../../helpers/flows';
import { assertCartParity, assertCoursePageReady } from '../../helpers/assertions';
import { dismissPopups, goToAllCourses, pickCourseFromGrid } from '../../helpers/pls';

const TAGS = ['@plugin:woocommerce', '@plugin:woocommerce-subscriptions'];

test.describe('PLS Course & Cart', { tag: TAGS }, () => {
  test('PLS-COURSE-01 — course page renders qty + sign-up (via Courses menu)', async ({ shopperPage: page }) => {
    await page.goto('./');
    await page.waitForLoadState('load');
    await dismissPopups(page);

    await goToAllCourses(page);
    await pickCourseFromGrid(page);
    await assertCoursePageReady(page);
  });

  test('PLS-CART-01 — cart parity for a 3-seat course', async ({ shopperPage: page }) => {
    const capture = await runCartFlow(page, 'PLS-CART-01', 3);
    assertCartParity(capture, { qty: 3 });
  });
});
