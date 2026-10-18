# Bitcoin Movie Enigma
> **ПЕРЕМЕЩЕНО 2026-10-17 в `master/solved/`** — пазл решён/закрыт/тупиковый, активная работа не ведётся. Причина: [../INDEX.md](../INDEX.md). Вернуть в `puzzles/` — только при новых данных (правила: `AGENT_INSTRUCTIONS.md`).

Индекс: [MASTER_CATALOG.md](../../MASTER_CATALOG.md) (Части 1-8). Источник данных: [open-crypto-puzzles](https://github.com/floflo777/open-crypto-puzzles).

## Кратко
- Статус: **solved** (solved)
- Цепь: bitcoin
- Приз: 100000 sats (USD 63)
- Примечание: single P2WPKH escrow, one funding transaction
- Опубликовано: 2024-01-03 https://bitcoinmovieenigma.com/rules
- Типы: bip39-seed, text-cipher, word-selection
- Difficulty left: none
- solved by a reader (rabbidbird) after publication, not by me; the winning 24-word phrase fails the BIP39 checksum, so every checksum-filtered sweep, mine included, had discarded it

## Адреса/эскроу
- `bc1q94ecsn0qk8lap2gefrycnms3ruepy889z969a6` — main | expected: 100000 sats prize, now swept by confirmed payout | state: swept (checked 2026-09-07) | https://mempool.space/address/bc1q94ecsn0qk8lap2gefrycnms3ruepy889z969a6

## Источники
- 2024-01-03 — Bitcoin Movie Enigma, rules page — https://bitcoinmovieenigma.com/rules
- 2026-08-16 — Bitcoin Movie Enigma, about page — https://bitcoinmovieenigma.com/about
- 2026-08-16 — Bitcoin Movie Enigma, wallet page — https://bitcoinmovieenigma.com/wallet
- 2024-01-03 — klems, Nostr launch note with the rules — https://njump.me/48fbbff9845680b463784d5ddfdc5907a953b3f4df9e0e49a97d6eb123d52145
- 2022-04-08 — klems, X account @cryptop1r4t3, first launch of the same 34 stills — https://x.com/cryptop1r4t3
- 2026-08-29 — deviceio121, issue #9: MGM's official The Man in the Iron Mask clip, 2:18 frame is panel 14 — https://www.youtube.com/watch?v=3PcEZNC7IPw
- 2026-09-07 — Confirmed payout transaction — https://mempool.space/tx/bd3b088164ae32458b97b917af8fab14056461c5e954499f7bd4cf3a67d6c5f4

## Подробности
Здесь должна накапливаться расширенная информация по мере проходов: подсказки, прогресс сообщества, проверенные гипотезы, ссылки, compute-оценки. Текущий файл — скелет из OCP; заполняется автоматически в циклах.


---
## Логирование (обязательно)
См. `../../AGENT_INSTRUCTIONS.md`. Любая значимая находка/прогресс/баланс/решение (полностью или частично) **должна** быть дописана сюда с датой и ссылкой. Параллельные агенты обязаны соблюдать тот же протокол.

## OCP deep docs
- Folder: https://github.com/floflo777/open-crypto-puzzles/tree/main/4-solved/bitcoin-movie-enigma-100ksats
- README (raw): https://raw.githubusercontent.com/floflo777/open-crypto-puzzles/main/4-solved/bitcoin-movie-enigma-100ksats/README.md

## Досье agntn/puzzles (16.10.2026)

Перенесено из реестра [@agntn/puzzles](https://puzzles.agntn.dev/collections/movie-enigma) (raw: https://puzzles.agntn.dev/collections/movie-enigma.md). Ниже — разбор первоисточника: механика, кто решал, что проверено.

- `id`: "movie-enigma"
- `chain`: "bitcoin"
- `address`: "bc1q94ecsn0qk8lap2gefrycnms3ruepy889z969a6"
- `sourceUrl`: "https://bitcoinmovieenigma.com/rules"
- `startedAt`: "2022-04-08 16:15:24"
- `status`: Status.Solved
- `prize`: 0.001
- `pubkey`: compressed("022c17f7486b4107b42a243a62e4d0919af3e8ee858a272319bffb0536486b9405")
- `key`: seed(

> 34 film stills, each title turned into a BIP39 word, ten intruders to drop. 100,000 sats on a SegWit address since April 2022, claimed in September 2026 with a phrase whose checksum fails.

## The puzzle

klems posted 34 movie frames on X in April 2022 and put 100,000 sats on a native SegWit address the same day. The platforms compressed the frames badly, so the puzzle got a small site of its own and a relaunch on Nostr in January 2024. The rules: name every film, turn each title into an English BIP39 word "somehow", and drop the ten intruders, films that don't belong in the sequence, using what IMDb says about each. The 24 words left, in panel order, restore the wallet.

The intruders sit in five thematic groups, two outliers each: Kubrick films, 1979 releases, films with Jean Reno, films of at least two hours, second installments. The word is the opening prefix of the title without its article, four letters where that lands on a word, three where the prefix is already unique. `Paths of Glory` is `path`, `Apocalypse Now` is `apology`, `Godzilla` is `goddess`.

## What the records carry

The one record is the only one in the dataset with a full seed phrase on it:

```ts [src/collections/movie-enigma.ts]
export const movieEnigmaPuzzle = puzzle({
  id: "movie-enigma",
  chain: "bitcoin",
  address: "bc1q94ecsn0qk8lap2gefrycnms3ruepy889z969a6",
  sourceUrl: "https://bitcoinmovieenigma.com/rules",
  startedAt: "2022-04-08 16:15:24",
  status: Status.Solved,
  pubkey: compressed("022c17f7486b4107b42a243a62e4d0919af3e8ee858a272319bffb0536486b9405"),
  key: seed(
    "path mad alien apology escape spare miss goddess leopard crime visit clock start first blade guard close barrel term screen matrix toy ghost shine",
    "m/84'/0'/0'/0/0",
  ),
  prize: 0.001,
  solvedAt: "2026-09-08 01:32:56",
  solveTime: 139396652,
  transactions: [
    funding("b805…b2a3", "2022-04-08 16:15:24", 0.001),
    claim("bd3b…c5f4", "2026-09-08 01:32:56", 0.00099766),
  ],
  solver: party("rabbidbird", {
    addresses: ["35h2x1Rqq3HmV1NX4KQAGZoz8Vmf42ktQT"],
    profiles: [profile("github", "https://github.com/rabbidbird")],
  }),
  assets: assets({
    solution: "solution.md",
    sourceUrl: "https://github.com/floflo777/open-crypto-puzzles/issues/24",
  }),
});
```

The phrase fails the BIP39 checksum. Its last word encodes 47 where the entropy calls for 119, so a wallet that validates before deriving refuses it, and every sweep that filtered candidates on the checksum threw the answer away. The seed is PBKDF2 over the words, so derivation doesn't care: `m/84'/0'/0'/0/0` gives the funded address and the compressed key the claim spent with. `verify()` derives it the same way and says `verified`. That's the one place the checksum matters in this library, and it doesn't.

The public key comes from the claim's witness. The `started` date is the funding transaction, which is the day of the first X post; the site's own frame pages show synthetic dates.

## Status

Solved. rabbidbird posted the phrase and the payout on 2026-09-08, twelve minutes after the claim confirmed, in [floflo777/open-crypto-puzzles#24](https://github.com/floflo777/open-crypto-puzzles/issues/24). That announcement is the record's solution asset, `assets/movie-enigma/solution.md`, with the issue as its source, so the answer travels with its provenance. A singleton like `gsmg` and `bitaps`: the id is `movie-enigma`. The film stills stay on the author's site, they're frames from other people's films.

## The record

The one puzzle in this collection, the way its page shows it.

## OCP: машинные данные (puzzles.json, 16.10.2026)

Структурированные данные из `puzzles.json` репозитория [open-crypto-puzzles](https://github.com/floflo777/open-crypto-puzzles) (snapshot OCP: 2026-09-09; цены: {'date': '2026-08-16', 'BTC': 63000, 'ETH': 1880, 'AR': 1.81, 'LTC': 54}).

- `slug`: bitcoin-movie-enigma-100ksats
- `title`: Bitcoin Movie Enigma
- `status`: **solved**
- `tier`: solved | `chain`: bitcoin
- `series`: None
- `author`: klems | nostr:npub10q5dpm5p05a0g3vtgcl76wv0pc4t820f5fj8qmpfaa4umv6404xqvwzvp0, x:@cryptop1r4t3
- `prize`: 100000 sats (оценка $63 на 2026-08-16) — single P2WPKH escrow, one funding transaction
- `published`: 2024-01-03 https://bitcoinmovieenigma.com/rules
- `puzzle_type`: bip39-seed, text-cipher, word-selection
- `target_format`: 24 English BIP39-listed words with invalid checksum; PBKDF2 mnemonic salt, empty passphrase, BIP84 m/84'/0'/0'/0/0
- `difficulty_left`: none
- `difficulty_note`: solved by a reader (rabbidbird) after publication, not by me; the winning 24-word phrase fails the BIP39 checksum, so every checksum-filtered sweep, mine included, had discarded it
- `tested_total`: {'candidates': 69234511, 'families': 20, 'certified': False}

**Адреса и проверенное состояние:**
- `bc1q94ecsn0qk8lap2gefrycnms3ruepy889z969a6` — escrow | main | ожидается: 100000 sats prize, now swept by confirmed payout | проверено 2026-09-07: **swept**
  - https://mempool.space/address/bc1q94ecsn0qk8lap2gefrycnms3ruepy889z969a6

**Деривация:**
- Recovered phrase derives the funded native SegWit address at BIP84 account 0, receiving index 0. It fails the BIP39 checksum, so the oracle derives 24 English word-list entries without enforcing that checksum.
- оракул: `tools/oracle.py` | сертифицирован: True
- сверено с: Public BIP84 vector plus independently calculated valid/invalid 24-word regression addresses; actual target independently reproduced with manual BIP32, secp256k1 and Bech32.

**Решения/выплаты (OCP `solutions`):**
  - date: 2026-09-07

**Выплата (OCP `payout`):**
  - txid
  - destination
  - payout_sats
  - fee_sats
  - confirmed
  - block_height
  - verification

**Материалы третьих лиц:**
- the 34 movie panels are individual frames from third-party films, not original material by the author; I do not reproduce them here and link to the author's still-live site instead

**Источники (OCP `sources`):**
  - url: https://bitcoinmovieenigma.com/rules | title: Bitcoin Movie Enigma, rules page | date: 2024-01-03
  - url: https://bitcoinmovieenigma.com/about | title: Bitcoin Movie Enigma, about page | date: 2026-08-16
  - url: https://bitcoinmovieenigma.com/wallet | title: Bitcoin Movie Enigma, wallet page | date: 2026-08-16
  - url: https://njump.me/48fbbff9845680b463784d5ddfdc5907a953b3f4df9e0e49a97d6eb123d52145 | title: klems, Nostr launch note with the rules | date: 2024-01-03
  - url: https://x.com/cryptop1r4t3 | title: klems, X account @cryptop1r4t3, first launch of the same 34 stills | date: 2022-04-08
  - url: https://www.youtube.com/watch?v=3PcEZNC7IPw | title: deviceio121, issue #9: MGM's official The Man in the Iron Mask clip, 2:18 frame is panel 14 | date: 2026-08-29
  - url: https://mempool.space/tx/bd3b088164ae32458b97b917af8fab14056461c5e954499f7bd4cf3a67d6c5f4 | title: Confirmed payout transaction | date: 2026-09-07
