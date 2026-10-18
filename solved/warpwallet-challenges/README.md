# WarpWallet challenges
> **ПЕРЕМЕЩЕНО 2026-10-17 в `master/solved/`** — пазл решён/закрыт/тупиковый, активная работа не ведётся. Причина: [../INDEX.md](../INDEX.md). Вернуть в `puzzles/` — только при новых данных (правила: `AGENT_INSTRUCTIONS.md`).

Индекс: [MASTER_CATALOG.md](../../MASTER_CATALOG.md). Источник: реестр [@agntn/puzzles](https://puzzles.agntn.dev/collections/warp) (raw: https://puzzles.agntn.dev/collections/warp.md).

## Кратко (реестр agntn/puzzles)
- Описание: Keybase's scrypt brainwallet with six funded challenges from 2013 to 2016. Four solved and two expired with the keys published afterwards. 41.85 BTC in total.
- Реестр: https://puzzles.agntn.dev/collections/warp
- `id`: "warp/challenge-1"
- `chain`: "bitcoin"
- `address`: "1JKb1617p68H5MPkoNaMtaJCqKDU3h8qSn"
- `sourceUrl`: "https://keybase.io/warp"
- `startedAt`: "2013-11-19 20:12:25"
- `status`: Status.Solved
- `prize`: 0.1
- `pubkey`: uncompressed("045f75…51af")
- `key`: hex("20f5df9cba8251e90a66d3aa1ca2849b12eaca135abb837671ac4a2bc2014e2b")

> Keybase's scrypt brainwallet with six funded challenges from 2013 to 2016. Four solved and two expired with the keys published afterwards. 41.85 BTC in total.

## The puzzle

[WarpWallet](https://keybase.io/warp) was Keybase's answer to weak brainwallets. scrypt with a salt, usually an email address, so a passphrase couldn't be brute forced with a plain SHA-256 wordlist. To prove it, they funded challenges with short passphrases and dared people to crack them. The four small ones fell. The two 20 BTC ones didn't. They expired on schedule, and Keybase published the passphrases when they took the coins back.

## What the records carry

Every WarpWallet record carries the hex key, the WIF and the passphrase, plus the salt where one was used, as `.passphrase(…)` and `.salt(…)` on the key builder. The library verifies the key against the address, not the passphrase against the key. scrypt with WarpWallet's parameters is a different package's job.

Each record also carries the hint Keybase printed next to its wallet, as `official(…)` with a Wayback capture of the page for its confirmation. The page still shows five of them; for the first 20 BTC challenge it shows the answer instead, so the December 2013 capture is where that hint lives. Each confirmation points at the versioned page the capture holds, because the bare `keybase.io/warp` capture is a redirect stub that dies in a browser.

```ts [src/collections/warp/challenge-1.ts]
export const warpPuzzleChallenge1 = puzzle({
  id: "warp/challenge-1",
  chain: "bitcoin",
  address: "1JKb1617p68H5MPkoNaMtaJCqKDU3h8qSn",
  sourceUrl: "https://keybase.io/warp",
  startedAt: "2013-11-19 20:12:25",
  status: Status.Solved,
  pubkey: uncompressed("045f75…51af"),
  key: hex("20f5df9cba8251e90a66d3aa1ca2849b12eaca135abb837671ac4a2bc2014e2b")
    .wif("5J4oWdwA5mSCP4GVWF237zgYK4h1csD2PfrmK3uh3YcRFSWZ2H1")
    .passphrase("Je"),
  prize: 0.1,
  hints: [
    official(
      "this passphrase is 2 random alphanumeric characters, such as 'X9'.",
      "https://keybase.io/warp",
      confirmation(
        "https://web.archive.org/web/20131213023906/https://keybase.io/warp/warp_1.0.6_SHA256_e68d4587b0e2ec34a7b554fbd1ed2d0fedfaeacf3e47fbb6c5403e252348cbfc.html",
        "Wayback capture of the challenge page",
      ),
    ),
  ],
});
```

A two character passphrase and it still took a scrypt run per guess. That was the argument.

## Status

`expired` is the status for the two big challenges. The author took the prize back when the deadline passed. The keys on those records are the ones Keybase published, so they verify like any solved puzzle. The `warpwallet` alias resolves to this collection in every lookup.

## Every puzzle

One page each: the record, the transactions and the live balance.

<collection-puzzles collection="warp">

</collection-puzzles>

---
## Логирование (обязательно)
См. `../../AGENT_INSTRUCTIONS.md`. Любая значимая находка, прогресс, баланс или решение **должны** быть дописаны сюда с датой и ссылкой.

## История изменений
- 2026-10-16 (deepseek-flash) — данные перенесены из реестра [@agntn/puzzles](https://puzzles.agntn.dev/) (первоисточники внутри текста).
