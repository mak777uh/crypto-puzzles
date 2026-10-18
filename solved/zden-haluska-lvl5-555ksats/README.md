# Zden Cryptopuzzle LVL.5
> **ПЕРЕМЕЩЕНО 2026-10-17 в `master/solved/`** — пазл решён/закрыт/тупиковый, активная работа не ведётся. Причина: [../INDEX.md](../INDEX.md). Вернуть в `puzzles/` — только при новых данных (правила: `AGENT_INSTRUCTIONS.md`).

Индекс: [MASTER_CATALOG.md](../../MASTER_CATALOG.md) (Части 1-8). Источник данных: [open-crypto-puzzles](https://github.com/floflo777/open-crypto-puzzles).

## Кратко
- Статус: **solved** (solved)
- Цепь: bitcoin
- Приз: 555550 sats (USD 350)
- Опубликовано: 2018-11-09 https://twitter.com/Zd3N/status/1060955171591766018
- Типы: geometry, raw-private-key
- Difficulty left: external-info
- the rectangle geometry is certified byte-perfect and the hint formula is read at the pixel level; over 545 million candidate keys across 3,200-plus readings have produced zero matches; the blocker is the exact meaning of 3 undefined terms in the author's own hint, not computation

## Адреса/эскроу
- `1cryptoGeCRiTzVgxBQcKFFjSVydN1GW7` — main | expected: 0 sats (555,550 sats until 2026-09-22) | state: swept (checked 2026-09-26) | https://mempool.space/address/1cryptoGeCRiTzVgxBQcKFFjSVydN1GW7

## Источники
- 2018-11-09 — Zden, original announcement — https://twitter.com/Zd3N/status/1060955171591766018
- 2018-12-24 — Zden, Christmas hint bundle — https://twitter.com/Zd3N/status/1077146640090316800
- 2026-08-16 — Zden's puzzle site — https://crypto.haluska.sk/
- 2026-08-16 — Community documentation and the author's own measurement script — https://github.com/HomelessPhD/Zden_LVL5
- 2026-09-23 — issue #34, sweep reported by deviceio121 — https://github.com/floflo777/open-crypto-puzzles/issues/34
- 2026-09-27 — Solver write-up, echo.ls — https://echo.ls/zden-level-5/

## Подробности
Здесь должна накапливаться расширенная информация по мере проходов: подсказки, прогресс сообщества, проверенные гипотезы, ссылки, compute-оценки. Текущий файл — скелет из OCP; заполняется автоматически в циклах.


---
## Логирование (обязательно)
См. `../../AGENT_INSTRUCTIONS.md`. Любая значимая находка/прогресс/баланс/решение (полностью или частично) **должна** быть дописана сюда с датой и ссылкой. Параллельные агенты обязаны соблюдать тот же протокол.

## OCP deep docs
- Folder: https://github.com/floflo777/open-crypto-puzzles/tree/main/4-solved/zden-haluska-lvl5-555ksats
- README (raw): https://raw.githubusercontent.com/floflo777/open-crypto-puzzles/main/4-solved/zden-haluska-lvl5-555ksats/README.md

## OCP: машинные данные (puzzles.json, 16.10.2026)

Структурированные данные из `puzzles.json` репозитория [open-crypto-puzzles](https://github.com/floflo777/open-crypto-puzzles) (snapshot OCP: 2026-08-16; цены: {'date': '2026-08-16', 'BTC': 63000, 'ETH': 1880, 'AR': 1.81, 'LTC': 54}).

- `slug`: zden-haluska-lvl5-555ksats
- `title`: Zden Cryptopuzzle LVL.5
- `status`: **solved**
- `tier`: solved | `chain`: bitcoin
- `series`: Zden's crypto.haluska.sk puzzle series
- `author`: Zden (Zdenek Haluska) | x:@Zd3N
- `prize`: 555550 sats (оценка $350 на 2026-08-16)
- `published`: 2018-11-09 https://twitter.com/Zd3N/status/1060955171591766018
- `puzzle_type`: geometry, raw-private-key
- `target_format`: 256-bit private key as direct hex (not WIF, not BIP39), P2PKH
- `difficulty_left`: external-info
- `difficulty_note`: the rectangle geometry is certified byte-perfect and the hint formula is read at the pixel level; over 545 million candidate keys across 3,200-plus readings have produced zero matches; the blocker is the exact meaning of 3 undefined terms in the author's own hint, not computation
- `tested_total`: {'candidates': 545000000, 'families': 7, 'certified': False}

**Адреса и проверенное состояние:**
- `1cryptoGeCRiTzVgxBQcKFFjSVydN1GW7` — escrow | main | ожидается: 0 sats (555,550 sats until 2026-09-22) | проверено 2026-09-26: **swept**
  - https://mempool.space/address/1cryptoGeCRiTzVgxBQcKFFjSVydN1GW7

**Деривация:**
- sum the areas of 2 'following' rectangles (of 64 in an 8x8 grid) under a formula read from a pixel-level hint, normalize to 1 byte, repeat for 32 byte pairs to build a 256-bit private key, derive P2PKH and compare to the escrow
- оракул: `tools/oracle.py` | сертифицирован: True
- сверено с: a standard public vector, private key 1 (the generator point); the puzzle's own rectangle-to-key reading is not itself certified

**Зацепки (OCP `leads`):**
  - title: a clarification from the author on 3 exact bindings (x, byte-range normalization, following) | status: open
  - title: a higher-fidelity source for the mini-hint glyphs | status: open
  - title: a wider author-error tolerance sweep (3-byte wildcard) | status: open

**Решения/выплаты (OCP `solutions`):**
  - date: 2026-09-22

**Артефакты (OCP `artifacts`):**
  - source: https://crypto.haluska.sk/
  - source: https://crypto.haluska.sk/crypto5fix.png

**Источники (OCP `sources`):**
  - url: https://twitter.com/Zd3N/status/1060955171591766018 | title: Zden, original announcement | date: 2018-11-09
  - url: https://twitter.com/Zd3N/status/1077146640090316800 | title: Zden, Christmas hint bundle | date: 2018-12-24
  - url: https://crypto.haluska.sk/ | title: Zden's puzzle site | date: 2026-08-16
  - url: https://github.com/HomelessPhD/Zden_LVL5 | title: Community documentation and the author's own measurement script | date: 2026-08-16
  - url: https://github.com/floflo777/open-crypto-puzzles/issues/34 | title: issue #34, sweep reported by deviceio121 | date: 2026-09-23
  - url: https://echo.ls/zden-level-5/ | title: Solver write-up, echo.ls | date: 2026-09-27
