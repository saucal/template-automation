# Resilient Locator Strategy — lokinator

The tiered-fallback locator design every suite uses ships as **lokinator**
(`github:saucal/lokinator-automation`, re-exported by woolverine). Read its README for the
API and env; this page keeps the design rules the suites follow.

## Tiers

`heal(page, { primary, alt?, ai })` and the `resilientClick/Fill/Select/Check/Text/Locator/ExpectText`
wrappers (`ctxFor(page)` builds the ctx) resolve in this order:

1. **primary** — the measured selector: role/label query, or a stable id (`#billing_email`).
2. **alt** — a DIFFERENT strategy (css ↔ role). Omit for stable ids; woolverine's own helpers
   already carry the other checkout variant's selector here.
3. **cached fix** — `.lokinator-cache.json`, committed: its diff is the drift report.
4. **LLM** — `ariaSnapshot` + the failed selectors → one selector back, verified, cached. Plain
   `fetch`, OpenAI by default (`OPENAI_API_KEY`, `LOKINATOR_MODEL` = bare model id). A healthy run
   spends zero tokens. A cached fix is evicted only after AI adjudication, never on a timeout.

No CDP, no Stagehand, no SDKs. The AI tier is drift insurance, not the driver.

## Rules

- `ai` is a NOUN phrase naming the element ("the Add to basket button"); the wrapper composes the verb.
- Anchor `LOKINATOR_CACHE` in `playwright.config.ts` — the default is cwd-relative.
- When a heal lands live: fix the primary in code, keep the cache entry as the record.
- A heal error WITHOUT `| AI suggested:` = the AI tier never answered (key/model) — check the API, not the page.
- `resilientText` reads `textContent`: no CSS `text-transform`, `<br>` lines glue. Use `innerText`
  through `heal()` when line structure matters; never `split('\n')` a `resilientText` result.
- Regex `hasText` is not whitespace-normalized — anchor on the leaf cell, not the row.
- Popup pages (PayPal, Klarna) are not your app: plain Playwright locators inside them.
- Allowed raw calls: waits/navigation, `setInputFiles`, `dispatchEvent` for 0-height triggers.
