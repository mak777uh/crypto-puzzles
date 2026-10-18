# Reddit (PullPush / api.pullpush.io) — INDEX

All queries against `https://api.pullpush.io`. Machine note: PullPush rate-limits
the scraper aggressively ("Rate limit exceeded. This website does not provide free
scraping resources for agents") — recovered by ~30s pauses. Raw JSON kept next to this file.

## Query log

| Query | URL | Results | Content |
|---|---|---|---|
| submission q=GemfinderOfX | `.../submission/?q=GemfinderOfX&size=100` | 0 | empty (`sub_GemfinderOfX.json`) |
| submission q=9vw04 | `.../submission/?q=9vw04&size=100` | 0 | empty (`sub_9vw04.json`) |
| comment q=9vw04 | `.../comment/?q=9vw04&size=100` | 2 | BOTH in thread 1hj1v0g, author `tarje`: "From the post, what is \"9vw04\"?" and "maybe this? https://imgur.com/9vw04" (`com_9vw04.json`) |
| comment q=GemfinderOfX | `.../comment/?q=GemfinderOfX&size=100` | 0 | empty |
| submission q="gem finder" puzzle | `.../submission/?q=%22gem%20finder%22%20puzzle` | 3 | IRRELEVANT (cfbsimulator, Luigi's Mansion reviews) |
| submission q="private key puzzle" grid | `.../submission/?q=%22private%20key%20puzzle%22%20grid` | 0 | empty |
| submission/comment q=<bc1qr5ms... address> | both | 0 | empty |
| submission q=irrationallibs | `.../submission/?q=irrationallibs` | 1 | the 1hj1v0g post itself (selftext cites @irrationallibs) |
| comment q=irrationallibs | 0 | empty |
| comment q="gem finder" puzzle | 2 | IRRELEVANT (Luigi's Mansion) |
| subreddit-scoped Bitcoin/BitcoinBeginners/CryptoCurrency/BitcoinHub/1satrabit × (gem finder / 9vw04) | all | 0 or rate-limited | nothing new |

## The one relevant thread: r/Bitcoin `1hj1v0g`

- Title "Bitcoin puzzle", author `NoEngineer4773`, created 2024-12-21, links
  `https://x.com/irrationallibs/status/1870319691295764655` (SAME status id the
  GemfinderOfX announcement uses — likely a quote/retweet chain).
- 7 comments total (full dump in `t3_1hj1v0g.json` / `t3_1hj1v0g.txt`). NO third-party
  key-extraction theory, NO grid transcript, NO BSGS range, NO "52 zero" analysis.
  Discussion is only "what is 9vw04?" + one imgur link `https://imgur.com/9vw04` +
  "have no idea how to solve it".

## Conclusion
Reddit via PullPush yields **no substantive third-party analysis** of the puzzle.
Only lead worth manual checking: `https://imgur.com/9vw04` (posted by tarje).
New threads may exist that PullPush has not indexed — cross-check via Wayback.
