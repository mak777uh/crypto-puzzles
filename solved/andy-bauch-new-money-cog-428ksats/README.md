# Andy Bauch: New Money, COG
> **ПЕРЕМЕЩЕНО 2026-10-17 в `master/solved/`** — пазл решён/закрыт/тупиковый, активная работа не ведётся. Причина: [../INDEX.md](../INDEX.md). Вернуть в `puzzles/` — только при новых данных (правила: `AGENT_INSTRUCTIONS.md`).

Индекс: [MASTER_CATALOG.md](../../MASTER_CATALOG.md) (Части 1-8). Источник данных: [open-crypto-puzzles](https://github.com/floflo777/open-crypto-puzzles).

## Кратко
- Статус: **solved** (solved)
- Цепь: bitcoin
- Приз: 428206 sats (USD 270)
- Примечание: the escrow received 527,872 sats on 2017-07-01, that amount left on 2017-12-30 and was replaced by the same funder the next day, 2017-12-31, with the 428,206 sats that remains unspent today
- Опубликовано: 2018-03-23 http://web.archive.org/web/20180921114353/https://www.artsy.net/show/hijinx-new-money
- Типы: pixel-code, physical-object
- Difficulty left: external-info
- the general encoding method is understood and 2 of its known variants are ruled out for COG with witnessed negatives; the blocker is image fidelity (whether individual brick seams are visible), and the physical piece is held by a private collector who bought it in 2018, not the artist

## Адреса/эскроу
- `1HLodS8H2GoWbnBXWcz7EkY773dKdD4JEv` — main | expected: 0 sats (428,206 sats until 2026-09-25) | state: swept (checked 2026-09-26) | https://mempool.space/address/1HLodS8H2GoWbnBXWcz7EkY773dKdD4JEv

## Источники
- 2026-08-16 — Andy Bauch, artist site — https://andybauch.com/
- 2018-09-21 — "New Money" show listing, Artsy — https://www.artsy.net/show/hijinx-new-money
- 2018-03-24 — "New Money" show listing showing COG's $14,000 price — https://www.artsy.net/show/hijinx-new-money
- 2024-08-14 — ESCAPUZZLED Podcast, episode 7 — https://www.youtube.com/watch?v=nAz4DogvdPA
- 2026-09-26 — issue #35, sweep reported by Andy00L — https://github.com/floflo777/open-crypto-puzzles/issues/35

## Подробности
Здесь должна накапливаться расширенная информация по мере проходов: подсказки, прогресс сообщества, проверенные гипотезы, ссылки, compute-оценки. Текущий файл — скелет из OCP; заполняется автоматически в циклах.


---
## Логирование (обязательно)
См. `../../AGENT_INSTRUCTIONS.md`. Любая значимая находка/прогресс/баланс/решение (полностью или частично) **должна** быть дописана сюда с датой и ссылкой. Параллельные агенты обязаны соблюдать тот же протокол.

## OCP deep docs
- Folder: https://github.com/floflo777/open-crypto-puzzles/tree/main/4-solved/andy-bauch-new-money-cog-428ksats
- README (raw): https://raw.githubusercontent.com/floflo777/open-crypto-puzzles/main/4-solved/andy-bauch-new-money-cog-428ksats/README.md

## OCP: машинные данные (puzzles.json, 16.10.2026)

Структурированные данные из `puzzles.json` репозитория [open-crypto-puzzles](https://github.com/floflo777/open-crypto-puzzles) (snapshot OCP: 2026-08-16; цены: {'date': '2026-08-16', 'BTC': 63000, 'ETH': 1880, 'AR': 1.81, 'LTC': 54}).

- `slug`: andy-bauch-new-money-cog-428ksats
- `title`: Andy Bauch: New Money, COG
- `status`: **solved**
- `tier`: solved | `chain`: bitcoin
- `series`: Andy Bauch, "New Money" (2016-2018)
- `author`: Andy Bauch | web:andybauch.com
- `prize`: 428206 sats (оценка $270 на 2026-08-16) — the escrow received 527,872 sats on 2017-07-01, that amount left on 2017-12-30 and was replaced by the same funder the next day, 2017-12-31, with the 428,206 sats that remains unspent today
- `published`: 2018-03-23 http://web.archive.org/web/20180921114353/https://www.artsy.net/show/hijinx-new-money
- `puzzle_type`: pixel-code, physical-object
- `target_format`: unknown; likely a 52-character compressed WIF private key (K or L prefix), P2PKH, based on the escrow's own compressed-pubkey spend
- `difficulty_left`: external-info
- `difficulty_note`: the general encoding method is understood and 2 of its known variants are ruled out for COG with witnessed negatives; the blocker is image fidelity (whether individual brick seams are visible), and the physical piece is held by a private collector who bought it in 2018, not the artist
- `tested_total`: {'candidates': 494000000, 'families': 7, 'certified': True}

**Адреса и проверенное состояние:**
- `1HLodS8H2GoWbnBXWcz7EkY773dKdD4JEv` — escrow | main | ожидается: 0 sats (428,206 sats until 2026-09-25) | проверено 2026-09-26: **swept**
  - https://mempool.space/address/1HLodS8H2GoWbnBXWcz7EkY773dKdD4JEv

**Деривация:**
- a private key encoded as a pattern of colored LEGO bricks (mechanism used for COG specifically not yet fixed: color count, cell size and payload region are all unknown), decoded back to compressed and uncompressed P2PKH addresses and compared to the escrow
- оракул: `tools/oracle.py` | сертифицирован: True
- сверено с: the private key behind the solved sibling piece BITCOIN $60 in the same series

**Зацепки (OCP `leads`):**
  - title: a photograph resolving individual plate seams (about 40 px/stud or more), from the piece's current owner | status: open
  - title: close the color-count gap in the region search (only 4 colors tried so far) | status: open
  - title: series pieces from 2017 with no public photo yet | status: open

**Решения/выплаты (OCP `solutions`):**
  - date: 2026-09-25

**Артефакты (OCP `artifacts`):**
  - source: https://andybauch.com/museum-of-human-obsolescence
  - source: https://andybauch.com/museum-of-human-obsolescence
  - source: https://andybauch.com/museum-of-human-obsolescence

**Материалы третьих лиц:**
- installation and press photography of the show (Vice, Gizmodo, Whitehot and others) is not included; only the 3 panel images from the artist's own site and short quoted material are used

**Источники (OCP `sources`):**
  - url: https://andybauch.com/ | title: Andy Bauch, artist site | date: 2026-08-16
  - url: https://www.artsy.net/show/hijinx-new-money | title: "New Money" show listing, Artsy | date: 2018-09-21
  - url: https://www.artsy.net/show/hijinx-new-money | title: "New Money" show listing showing COG's $14,000 price | date: 2018-03-24
  - url: https://www.youtube.com/watch?v=nAz4DogvdPA | title: ESCAPUZZLED Podcast, episode 7 | date: 2024-08-14
  - url: https://github.com/floflo777/open-crypto-puzzles/issues/35 | title: issue #35, sweep reported by Andy00L | date: 2026-09-26
