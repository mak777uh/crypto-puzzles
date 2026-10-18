# Wayback (web.archive.org) — FINDINGS NOTE

## 1. Reddit thread `1hj1v0g` (see ../reddit/wayback/)
CDX `reddit.com/r/Bitcoin/comments/1hj1v0g*` -> 8 rows, all **2025-08** HTML snapshots
(`cdx_1hj1v0g.json`). No `.json` captures, no `old.reddit.com` captures
(`cdx_1hj1v0g_json.json` = `[]`).
Fetched raw snapshot `snap_1hj1v0g_20250803.html` (117 KB) = modern Reddit JS shell,
**contains ZERO of the keywords** `9vw04`, `imgur`, `Gemfinder`, `irrationallibs`,
`bc1qr5`, `zero`, `grid`, `BSGS`, `offset`, `private key`. So Wayback adds nothing
beyond the 7 comments already pulled from PullPush.

## 2. X / Twitter announcement thread
- CDX `x.com/GemfinderOfX/status/1870319691295764655*` -> `[]` (NOT archived).
- CDX `twitter.com/GemfinderOfX/status/1870319691295764655*` -> `[]` (NOT archived).
  => **The December-2024 puzzle announcement tweet has NO Wayback capture at all.**
- CDX `twitter.com/GemfinderOfX*` filtered `from=20240101&to=20251231` -> `[]`
  (`cdx_gemfinder_2024_2025.json`). => No captures of the whole puzzle-era.
- CDX `twitter.com/GemfinderOfX/status/*` (unfiltered, limit 100) -> **100 captures,
  ALL dated 2026-02-09/10**, mimetype `application/json` (`cdx_twitter_com_GemfinderOfX.json`).

### What those Feb-2026 captures actually are
Fetched 13 raw archived JSON tweets (`snaps/*.json`, index `snaps_sample.json`).
They are **NOT** about the Bitcoin puzzle. The `@GemfinderOfX` handle in Feb-2026 is
posting crypto-shill / memecoin promotion content. Verbatim examples:
- "Raid and repost this, spreading the word is how we win."
- "$Rock won't stop, can't stop."
- "$Rock 10m 4 days"
- "1,222 holders your early be glad." / "1,500 holders now we are climbing"
- "This is almost the top for when you search the CA address let's push it more"
- "@solanagpu Not even playable on mobile"
No grid, no 9vw04, no 52 zeros, no BSGS, no private-key content. Either the account
was renamed/repurposed or a different operator now holds the handle.

## 3. imgur `9vw04`
CDX `imgur.com/9vw04*` request hit the "Internet Archive Temporarily Offline"
interstitial (no result saved). Worth a manual retry: `https://imgur.com/9vw04`
(referenced by Reddit user `tarje`) — could be the puzzle grid image itself.

## Caveat
Internet Archive CDX/API was intermittently serving a "Temporarily Offline" HTML
interstitial during this run; several calls needed retries. Results marked `[]` above
were confirmed valid JSON empty responses, not the offline page.
