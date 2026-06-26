# Open Studio suite — open TODOs

GI parity ledger after the guest/member refactor + parity pass (38 tests / 9 specs).
GI source of truth = raw `suites/*/*.json`. Live run + live-site triage are the
user's to drive.

## Done in the 2026-06-26 parity pass

- [x] **13 Instructor page** → `guest/content.spec.ts` OS-GUEST-instructor-detail.
- [x] **14 Course page + "Join now" CTA** → OS-GUEST-course-detail-join-cta (guest)
  + OS-CONTENT-course-no-join (member, CTA absent).
- [x] **15 Live Sessions** → `guest/sessions.spec.ts` OS-GUEST-live-sessions.
- [x] **16 Session pro-gating** → OS-GUEST-session-pro-gated + member
  OS-CONTENT-session-access (free joinable + pro gated).
- [x] **19 Instrument page** → OS-GUEST-instrument-page.
- [x] **Member nav 05/06** → `member/nav.spec.ts` OS-NAV-desktop / OS-NAV-mobile.
- [x] **Member profile edit (03 tail)** → OS-ACC-03.
- [x] **Single-course NO PLAN ACTIVE (22)** → OS-COM-01 assertNoMembership.
- [x] **Bookmark add/remove/count=0 (24)** → OS-CONTENT-bookmark.
- [x] Review fixes: funnel-confirmation email fallback, OS-JOIN-03 → fixme,
  assertCoursePlusSubscription retargeted + wired, Stripe Link opt-in uncheck.

## Still to do

### Stubs to wire (need live site)

- [ ] **OS-JOIN-03 backend & renew** (`specs/member/join.spec.ts`) — currently
  `test.fixme`, body is a stub. Wire the admin renewal action live; assert
  next-payment advances (`td.subscription-next-payment` on the
  `admin.php?page=wc-orders` shop_subscription edit screen). Then swap fixme →
  RUN_RENEW gate.
- [ ] **OS-COM-03 refund** (`specs/member/commerce.spec.ts`) — `test.skip` behind
  `RUN_REFUND`; `assertRefundEmail` depends on confirming the Playgrounds Mailpit
  source live.

### Minor parity gap (deferred)

- [ ] **Common 17 Space Event page** (event → space, artist header) — not covered.
  Low value; add only if the artist/space surface matters.

### Live-run validation (user runs, not Claude)

- [ ] **Full run never executed live**: `npx playwright test` (38 tests). Expect
  selector drift — many specs built from GI JSON, not live-explored. The new
  parity selectors (gating / nav / bookmark / profile / sessions) are the
  least-verified — triage them first.
- [ ] **Visual baselines don't exist** — first run needs `--update-snapshots`
  (guest page sweep + desktop/mobile menus).

### At repo move (not now)

- [ ] **Functional `@tag`s** for plugin-update maintenance selection (convert the
  `[WooCommerce][...]` title labels to Playwright tags) + verify completeness
  against the live active-plugin list. No open-studio-automation repo exists yet —
  fork from `template-automation`.

## Notes / decisions

- Join deep price/trial/sub-line asserts kept **coarse** by design (typed-config,
  not GI's var-juggling); dashboard + backend asserts cover the substance. Not a gap.
- GI numbering is non-contiguous (no member 07–16, no 23) — member reuses guest
  pages; those are GI's gaps, not ours.
- `OS-COM-02` course + subscription is an **addition** beyond the GI set (kept).
