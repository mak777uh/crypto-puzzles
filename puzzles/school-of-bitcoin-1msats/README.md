# School of Bitcoin: 1 Million Sats In This Image

Индекс: [MASTER_CATALOG.md](../../MASTER_CATALOG.md) (Части 1-8). Источник данных: [open-crypto-puzzles](https://github.com/floflo777/open-crypto-puzzles).

## Кратко
- Статус: **open** (mid)
- Цепь: bitcoin
- Приз: 1000000 sats (USD 630)
- Примечание: single funding transaction, 0.01 BTC
- Опубликовано: 2025-03-09 https://stacker.news/items/908283
- Типы: bip39-seed, image-stego, password-pages
- Difficulty left: external-info
- word 1 (abstract) is confirmed; the remaining 11 words are not found on the card or in any crawled course content, and the intended-path KeePass file was pulled from the live site before it was opened by anyone who has a copy, so the missing piece is external information rather than more search over known material

## Адреса/эскроу
- `bc1qcsdfkaqgy9ux668vmzflzqsyg0qtspncymt5ed` — main | expected: 1000000 sats | state: funded-unspent (checked 2026-08-16) | https://mempool.space/address/bc1qcsdfkaqgy9ux668vmzflzqsyg0qtspncymt5ed

## Источники
- 2025-03-09 — Puzzle announcement, stacker.news item 908283 — https://stacker.news/items/908283
- 2026-08-16 — School of Bitcoin course site — https://schoolofbitcoin.com/

## Подробности
Здесь должна накапливаться расширенная информация по мере проходов: подсказки, прогресс сообщества, проверенные гипотезы, ссылки, compute-оценки. Текущий файл — скелет из OCP; заполняется автоматически в циклах.


---
## Логирование (обязательно)
См. `../../AGENT_INSTRUCTIONS.md`. Любая значимая находка/прогресс/баланс/решение (полностью или частично) **должна** быть дописана сюда с датой и ссылкой. Параллельные агенты обязаны соблюдать тот же протокол.

## OCP deep docs
- Folder: https://github.com/floflo777/open-crypto-puzzles/tree/main/2-mid-prizes/school-of-bitcoin-1msats
- README (raw): https://raw.githubusercontent.com/floflo777/open-crypto-puzzles/main/2-mid-prizes/school-of-bitcoin-1msats/README.md

## Досье agntn/puzzles (16.10.2026)

Перенесено из реестра [@agntn/puzzles](https://puzzles.agntn.dev/collections/school-of-bitcoin) (raw: https://puzzles.agntn.dev/collections/school-of-bitcoin.md). Ниже — разбор первоисточника: механика, кто решал, что проверено.

- `id`: "school-of-bitcoin"
- `chain`: "bitcoin"
- `address`: "bc1qcsdfkaqgy9ux668vmzflzqsyg0qtspncymt5ed"
- `sourceUrl`: CARD
- `startedAt`: "2024-11-23 05:22:14"
- `prize`: 0.01

> A Bitcoin course hid a million sats behind the back of its business card and showed it at 2000 followers. Unclaimed since November 2024

October 21, 2024. School of Bitcoin posts the front of its business card on X. On the back, inside a puzzle, sits a million sats. The catch? You see the back at 2000 followers.

The coins were already waiting. They landed on the address nine days before that post. Then a month of "pls follow and retweet". On November 23 the account got there, and the back went up as the pinned tweet. Still unclaimed. Want a go?

## What's on the card?

### Every clue, supposedly

The card says it out loud. "Hidden on this card... is every clue needed to find a treasure of... 1 Million Sats." Bold claim for a business card. And it's busy.

Three QR codes, one orange, one blue, one white. A column of blue Wingdings down the left edge. A column of yellow Morse down the right. A tiny `007` next to the blue code. Three cartoon characters, one of them asking "Has anyone found it yet?" Nobody has, so far.

### Wingdings, what a font

In March 2025 someone shared the card on [Stacker News](https://stacker.news/items/908283) after giving up on it. The thread took it apart in an afternoon. The Wingdings read "Wingdings, what a font! But it is the black characters you want :)". So, ten black characters scattered over the card.

The Morse read "ZEROBONEZEROONEZERO FINGZ KNEE DID 4D A DRESS 2Z PRIES". Read it aloud. `0b1010` is ten, so "10 things needed for the address to see prize". Dad joke level puns, in Morse. Respect.

### The first word

The free course got searched too. Lesson 1 has a hidden extra slide with a Rick Roll and binary numbers on top. Decoded, it says "You found a clue to the hidden treasure of 1 FULL BITCOIN! :) abstract". First seed word, says the thread. One down, eleven to go?

### The author drops in

A day later an anonymous account showed up in the thread. "Let the Games Begin :)", signed M, with the schoolofbitcoin.com link. It told the players they had "gotten further than anyone so far". And a reply to the hidden slide path? "shhh.... dont tell... its a secret :)". Hard to read that as anyone but the author.

## The 10,000 follower clue

The pinned tweet ends with a promise. At 10,000 followers, if it's still unclaimed, there's "a big clue to the treasure". In November 2024 the account had 2493 followers. By March 2025 it had 2423. The big clue is going the wrong way.

So the author reposted the card on March 7, 2025, tagging Grok. "I've designed it to be a.i proof... prove me wrong". Nobody has proved it wrong yet. The coins sit right where they landed.

## What the record carries

```ts [src/collections/school-of-bitcoin.ts]
export const businessCard = puzzle({
  id: "school-of-bitcoin",
  chain: "bitcoin",
  address: "bc1qcsdfkaqgy9ux668vmzflzqsyg0qtspncymt5ed",
  sourceUrl: CARD,
  startedAt: "2024-11-23 05:22:14",
  prize: 0.01,
  hints: [official("Hidden on this card... is every clue needed to find a treasure of... 1 Million Sats", CARD, undefined, { date: "2024-11-23" }), …],
  transactions: [funding("bddcb314…", "2024-10-12 07:23:20", 0.01)],
  assets: assets({ puzzle: "puzzle.jpg", … }),
});
```

### Why November and not October

The funding is from October 12, 2024. But nobody could play before the back of the card existed in public, so `startedAt` is the moment it went up. X keeps four versions of that post, all edited within four minutes. The first went out at 05:22:14 UTC, and that's the date. The record cites the last one, the version the account still has pinned.

### The card itself

`puzzle.jpg` is the photo from the pinned tweet at full size, 3175 by 1969. The March repost and the Stacker News thread use a smaller copy, 2048 wide. Same card, fewer pixels, so the record keeps the big one. Its SHA-256 matches what X serves for `?name=orig`.

### Hints, both kinds

The record keeps <dataset-count of="hints" puzzle="school-of-bitcoin">

</dataset-count>

 hints. The official ones are the card, the pinned tweet, the repost and one comment from the anonymous account. The community ones are the three decodes from the Stacker News thread: the Morse, the Wingdings and `abstract`. A hint records who said it and where. It doesn't say whether it's right.

### No key, no pubkey

`bc1qcsdf…` received one funding and never spent it. No public key on chain, no published seed. `verify` has nothing to check, and `status` stays `unsolved`.

Both tweets are archived in [assets/sources/school-of-bitcoin](https://github.com/agntn/puzzles/tree/main/assets/sources/school-of-bitcoin), each with a Wayback capture taken the second it went up.

## The School of Bitcoin record

## OCP: машинные данные (puzzles.json, 16.10.2026)

Структурированные данные из `puzzles.json` репозитория [open-crypto-puzzles](https://github.com/floflo777/open-crypto-puzzles) (snapshot OCP: 2026-08-16; цены: {'date': '2026-08-16', 'BTC': 63000, 'ETH': 1880, 'AR': 1.81, 'LTC': 54}).

- `slug`: school-of-bitcoin-1msats
- `title`: School of Bitcoin: 1 Million Sats In This Image
- `status`: **open**
- `tier`: mid | `chain`: bitcoin
- `series`: None
- `author`: School of Bitcoin | x:@schoolofbitcoin
- `prize`: 1000000 sats (оценка $630 на 2026-08-16) — single funding transaction, 0.01 BTC
- `published`: 2025-03-09 https://stacker.news/items/908283
- `puzzle_type`: bip39-seed, image-stego, password-pages
- `target_format`: BIP39 12 words, word 1 = abstract, possible passphrase, BIP84 m/84'/0'/0'/0/0
- `difficulty_left`: external-info
- `difficulty_note`: word 1 (abstract) is confirmed; the remaining 11 words are not found on the card or in any crawled course content, and the intended-path KeePass file was pulled from the live site before it was opened by anyone who has a copy, so the missing piece is external information rather than more search over known material
- `tested_total`: {'candidates': 178264, 'families': 6, 'certified': True}

**Адреса и проверенное состояние:**
- `bc1qcsdfkaqgy9ux668vmzflzqsyg0qtspncymt5ed` — escrow | main | ожидается: 1000000 sats | проверено 2026-08-16: **funded-unspent**
  - https://mempool.space/address/bc1qcsdfkaqgy9ux668vmzflzqsyg0qtspncymt5ed

**Деривация:**
- derive the first receiving address for a 12-word candidate (with optional passphrase) under BIP44/49/84, account 0, and compare to the escrow address
- оракул: `tools/oracle.py` | сертифицирован: True
- сверено с: the public BIP39/BIP84 test vector (mnemonic 'abandon' repeated 11 times plus 'about'), since no solved sibling exists for this puzzle

**Зацепки (OCP `leads`):**
  - title: obtain the complete kdbx file and its passphrase | status: open
  - title: a fresh reading of the remaining 11 seed words | status: open

**Материалы третьих лиц:**
- the course video and slide content are copyrighted and not reproduced; only short decoded clue text (the binary overlay message, the Morse and Wingdings decodes) is quoted in clues/author-posts.md

**Источники (OCP `sources`):**
  - url: https://stacker.news/items/908283 | title: Puzzle announcement, stacker.news item 908283 | date: 2025-03-09
  - url: https://schoolofbitcoin.com/ | title: School of Bitcoin course site | date: 2026-08-16


## Обновление (2026-10-17, AutoClaw / zai_glm-5.3-flash)
- Тип: отрицательный результат / подтверждение
- Суть: свежий полный краул обновлённого сайта (3 пакета, 291 слайд; трек `your-first-bitcoin/` удалён): новых скрытых слайдов/каналов нет; скрытый слайд Rick-Roll (what-is-money slide 104) по-прежнему даёт бинарник «You found a clue to the hidden treasure of 1 FULL BITCOIN! :) abstract» (слово №1 = `abstract`, без изменений); `whatisthepassphrase.kdbx` с живого сайта отсутствует (16 путей → 404), клиентской валидации ответов нет.
- Источник: https://schoolofbitcoin.com/
- Проверено: да (полный краул + распаковка presInfo и всех slideN.js трёх пакетов; перебор типовых путей kdbx)
- Влияние на оценку: без изменений (~1–2%); остаются только внешние пути (копия kdbx у участника сообщества / новая подсказка автора). Точка сравнения для будущих апдейтов сайта зафиксирована в LOG.md.
- Подробности и хроника: см. LOG.md
