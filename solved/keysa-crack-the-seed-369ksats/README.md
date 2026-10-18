# Keysa: Crack the Seed Game
> **ПЕРЕМЕЩЕНО 2026-10-17 в `master/solved/`** — пазл решён/закрыт/тупиковый, активная работа не ведётся. Причина: [../INDEX.md](../INDEX.md). Вернуть в `puzzles/` — только при новых данных (правила: `AGENT_INSTRUCTIONS.md`).

Индекс: [MASTER_CATALOG.md](../../MASTER_CATALOG.md) (Части 1-8). Источник данных: [open-crypto-puzzles](https://github.com/floflo777/open-crypto-puzzles).

## Кратко
- Статус: **solved** (solved)
- Цепь: bitcoin
- Приз: 369369 sats (USD 233)
- Примечание: the author never published the escrow address; I found it by matching the announced amount, 369,369 sats, as a near-unique fingerprint in a full blockchain balance dump, then corroborated it by script type (v0_p2wpkh, matching BIP84) and by funding time (2 minutes 28 seconds after the announcement post)
- Опубликовано: 2023-06-26 https://x.com/SimplestBTCBook/status/1673197111603519490
- Типы: bip39-seed, word-selection
- Difficulty left: none
- swept on 2026-09-08 (block 966,260, 369,150 sats to bc1q82gz5dnpxnqmvzrkusm8yc0nt4dcqp8gd3y59j); the author confirmed the crack on X on 2026-09-10 without naming the solver; neither the 12 words nor the selection rule has been published; the negatives ledger stays as a record of what the selection rule is not

## Адреса/эскроу
- `bc1qcv84707v4sglaj306qezkcrun4eejh77k8cyjr` — main | expected: 0 sats (369,369 sats until 2026-09-08) | state: swept (checked 2026-09-12) | https://mempool.space/address/bc1qcv84707v4sglaj306qezkcrun4eejh77k8cyjr

## Источники
- 2023-06-26 — Keysa, original announcement — https://x.com/SimplestBTCBook/status/1673197111603519490
- 2026-08-16 — Keysa on Nostr — https://njump.me/npub1dpna3xwwddnhhzg9ycpvlcz2ze0jdwm2rf3eqd2lf9leaewtq7tqhw0ef2
- 2023-06-27 — Keysa, reply: all the words but two, are in order — https://x.com/SimplestBTCBook/status/1673685712498049025
- 2023-06-27 — Keysa, reply: one still wouldn't know which of all those words are the 12 — https://x.com/SimplestBTCBook/status/1673683632546873344
- 2023-06-27 — Keysa, reply: these are all BIP 39 words, because the anon set would decrease — https://x.com/SimplestBTCBook/status/1673720563318112256

## Подробности
Здесь должна накапливаться расширенная информация по мере проходов: подсказки, прогресс сообщества, проверенные гипотезы, ссылки, compute-оценки. Текущий файл — скелет из OCP; заполняется автоматически в циклах.


---
## Логирование (обязательно)
См. `../../AGENT_INSTRUCTIONS.md`. Любая значимая находка/прогресс/баланс/решение (полностью или частично) **должна** быть дописана сюда с датой и ссылкой. Параллельные агенты обязаны соблюдать тот же протокол.

## OCP deep docs
- Folder: https://github.com/floflo777/open-crypto-puzzles/tree/main/4-solved/keysa-crack-the-seed-369ksats
- README (raw): https://raw.githubusercontent.com/floflo777/open-crypto-puzzles/main/4-solved/keysa-crack-the-seed-369ksats/README.md

## OCP: машинные данные (puzzles.json, 16.10.2026)

Структурированные данные из `puzzles.json` репозитория [open-crypto-puzzles](https://github.com/floflo777/open-crypto-puzzles) (snapshot OCP: 2026-09-12; цены: {'date': '2026-08-16', 'BTC': 63000, 'ETH': 1880, 'AR': 1.81, 'LTC': 54}).

- `slug`: keysa-crack-the-seed-369ksats
- `title`: Keysa: Crack the Seed Game
- `status`: **solved**
- `tier`: solved | `chain`: bitcoin
- `series`: None
- `author`: Keysa | x:@SimplestBTCBook, nostr:npub1dpna3xwwddnhhzg9ycpvlcz2ze0jdwm2rf3eqd2lf9leaewtq7tqhw0ef2
- `prize`: 369369 sats (оценка $233 на 2026-08-16) — the author never published the escrow address; I found it by matching the announced amount, 369,369 sats, as a near-unique fingerprint in a full blockchain balance dump, then corroborated it by script type (v0_p2wpkh, matching BIP84) and by funding time (2 minutes 28 seconds after the announcement post)
- `published`: 2023-06-26 https://x.com/SimplestBTCBook/status/1673197111603519490
- `puzzle_type`: bip39-seed, word-selection
- `target_format`: BIP39 12 words (English), BIP84 m/84'/0'/0'/0/0, no passphrase
- `difficulty_left`: none
- `difficulty_note`: swept on 2026-09-08 (block 966,260, 369,150 sats to bc1q82gz5dnpxnqmvzrkusm8yc0nt4dcqp8gd3y59j); the author confirmed the crack on X on 2026-09-10 without naming the solver; neither the 12 words nor the selection rule has been published; the negatives ledger stays as a record of what the selection rule is not
- `tested_total`: {'candidates': 509479179, 'families': 6, 'certified': False}

**Адреса и проверенное состояние:**
- `bc1qcv84707v4sglaj306qezkcrun4eejh77k8cyjr` — escrow | main | ожидается: 0 sats (369,369 sats until 2026-09-08) | проверено 2026-09-12: **swept**
  - https://mempool.space/address/bc1qcv84707v4sglaj306qezkcrun4eejh77k8cyjr

**Деривация:**
- select 12 of the 70 printed words in some order, derive the BIP84 first receiving address, and compare it to the escrow address
- оракул: `tools/oracle.py` | сертифицирован: True
- сверено с: the public BIP39/BIP84 test vector (mnemonic 'abandon' repeated 11 times plus 'about'), since no solved sibling exists for this puzzle

**Зацепки (OCP `leads`):**
  - title: the solver posts the 12 words or the selection rule; credit goes to them | status: open

**Решения/выплаты (OCP `solutions`):**
  - date: 2026-09-08

**Артефакты (OCP `artifacts`):**
  - source: https://i.nostr.build/L9rQ.jpg
  - source: https://i.nostr.build/qYkB.jpg

**Материалы третьих лиц:**
- the two card images in clues/ are the author's own published puzzle material, posted on X and mirrored on nostr.build; her book and workshop materials are not included and are referenced by title only

**Источники (OCP `sources`):**
  - url: https://x.com/SimplestBTCBook/status/1673197111603519490 | title: Keysa, original announcement | date: 2023-06-26
  - url: https://njump.me/npub1dpna3xwwddnhhzg9ycpvlcz2ze0jdwm2rf3eqd2lf9leaewtq7tqhw0ef2 | title: Keysa on Nostr | date: 2026-08-16
  - url: https://x.com/SimplestBTCBook/status/1673685712498049025 | title: Keysa, reply: all the words but two, are in order | date: 2023-06-27
  - url: https://x.com/SimplestBTCBook/status/1673683632546873344 | title: Keysa, reply: one still wouldn't know which of all those words are the 12 | date: 2023-06-27
  - url: https://x.com/SimplestBTCBook/status/1673720563318112256 | title: Keysa, reply: these are all BIP 39 words, because the anon set would decrease | date: 2023-06-27
