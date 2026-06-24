# Open Studio suite — open TODOs

Tracking GI parity gaps after the guest/member refactor (29 tests / 6 specs).
GI source of truth = `generated/specs/*.spec.ts` (3 files, frozen). Live run +
live-site triage are the user's to drive.

## GI replication gaps (not yet covered)

- [ ] **Guest single-detail pages absent from the guest sweep.** `GUEST_PAGES`
  in `helpers/openstudio.ts` only sweeps list/static pages (home…privacy). These
  GI guest tests have no guest-side equivalent:
  - [ ] **13 Instructor page** (single instructor detail) — no path, not covered
    anywhere. Add `PATHS.instructor` (pick a live instructor slug) + guest visual.
  - [ ] **19 Instrument Page** — no path, not covered anywhere. Add
    `PATHS.instrument` (pick a live instrument slug) + guest visual.
  - [ ] **14 Course Page** — only tested as *member* (`OS-CONTENT-course`). Add
    a guest visual against `PATHS.singleCourse`.
  - [ ] **15 Live Sessions Page** — only as member (`events`/`osSessions`). Add a
    guest visual; confirm which path GI 15 actually hit (events vs os-sessions).
  - [ ] **16 Session page** (single session detail) — only as member
    (`OS-CONTENT-sessions`). Add a guest visual + confirm the single-session slug.

- [ ] **Member nav not verified separately (GI 05/06).** Logged-in menu was
  folded into the *guest* `OS-GUEST-menu-desktop/mobile` tests. The member menu
  usually differs (account/logout/dashboard links). Add member menu-desktop +
  menu-mobile screenshots in a logged-in context.

## Stubs to wire (the 2 build-time TODOs)

- [ ] **OS-JOIN-03 backend & renew** (`specs/member/join.spec.ts`) — GI member
  "01 Backend & renew". Currently `test.skip` behind `RUN_RENEW`, body is a stub.
  Wire the admin renewal action against the live site (assert next-payment date
  advances; selector `td.subscription-next-payment` on the
  `admin.php?page=wc-orders` shop_subscription edit screen).
- [ ] **Refund email source** — `OS-COM-03` refund (`specs/member/commerce.spec.ts`)
  is `test.skip` behind `RUN_REFUND`; `assertRefundEmail` depends on the Mailpit
  email source being confirmed live (Playgrounds Mailpit, No Pong style).

## Live-run validation (user runs, not Claude)

- [ ] **Full run** never executed live: `npx playwright test` (29 tests). Expect
  selector drift — built from GI JSON, not all live-explored.
- [ ] **Visual baselines** don't exist yet — first run needs `--update-snapshots`
  to generate guest/menu screenshots.

## Notes

- GI's own numbering is non-contiguous (no member 07–16, no 23) — member reuses
  guest pages, so those gaps are GI's, not ours.
- `OS-COM-02` course + subscription is an **addition** beyond the GI set (kept).
