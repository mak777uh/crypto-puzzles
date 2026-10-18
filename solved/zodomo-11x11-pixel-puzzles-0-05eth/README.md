# Zodomo 11x11 Pixel Puzzles
> **ПЕРЕМЕЩЕНО 2026-10-17 в `master/solved/`** — пазл решён/закрыт/тупиковый, активная работа не ведётся. Причина: [../INDEX.md](../INDEX.md). Вернуть в `puzzles/` — только при новых данных (правила: `AGENT_INSTRUCTIONS.md`).

Индекс: [MASTER_CATALOG.md](../../MASTER_CATALOG.md) (Части 1-8). Источник данных: [open-crypto-puzzles](https://github.com/floflo777/open-crypto-puzzles).

## Кратко
- Статус: **dead-end** (dead-end)
- Цепь: ethereum
- Приз: 0.05 ETH (USD 94)
- Примечание: the active (fourth) puzzle's nominal per-piece prize; no escrow currently holds it, see Why this is a dead end
- Опубликовано: 2026-07-30 https://networked.art/11x11
- Типы: bip39-seed, pixel-code
- Difficulty left: external-info
- the active puzzle's escrow does not exist on Ethereum mainnet as of the last check; even once it does, its encoding scheme is not yet identified, and the strongest lead is a set of author-distributed hints in a gated community chat

## Адреса/эскроу
- `0x60a5431a138b0320641408694562f624f3c977a8` — piece #869 escrow | expected: 0.05 ETH, funded 2026-07-30 | state: swept (checked 2026-08-16) | https://etherscan.io/address/0x60a5431a138b0320641408694562f624f3c977a8
- `0x9cc846fe9b75a4cee897f605b240dd0030fcd5a2` — piece #930 escrow, encoding scheme not reconstructed | expected: 0.05 ETH, funded 2026-07-30 | state: swept (checked 2026-08-16) | https://etherscan.io/address/0x9cc846fe9b75a4cee897f605b240dd0030fcd5a2
- `0xf5d45c9d798aedb754b1ed8660af3ea79178b765` — piece #993 escrow, reclaimed by the artist himself | expected: 0.05 ETH, funded 2026-07-30 | state: swept (checked 2026-08-16) | https://etherscan.io/address/0xf5d45c9d798aedb754b1ed8660af3ea79178b765
- `0xa15585918e6ef74239246f4e1538acdf70b4743e` — queengarden.eth, paid by hand as the 3rd solver's prize; a real person's active personal wallet, not an escrow for the active puzzle | expected: n/a | state: unknown (checked 2026-08-16) | https://etherscan.io/address/0xa15585918e6ef74239246f4e1538acdf70b4743e

## Источники
- 2026-08-16 — Zodomo, piece collection — https://networked.art/11x11
- 2026-08-01 — Zodomo, X post announcing the active puzzle — https://x.com/Zodomo/status/2083364549697155550
- 2026-07-30 — Zodomo, X post naming the intended difficulty — https://x.com/Zodomo/status/2082949091244327366

## Подробности
Здесь должна накапливаться расширенная информация по мере проходов: подсказки, прогресс сообщества, проверенные гипотезы, ссылки, compute-оценки. Текущий файл — скелет из OCP; заполняется автоматически в циклах.


---
## Логирование (обязательно)
См. `../../AGENT_INSTRUCTIONS.md`. Любая значимая находка/прогресс/баланс/решение (полностью или частично) **должна** быть дописана сюда с датой и ссылкой. Параллельные агенты обязаны соблюдать тот же протокол.

## OCP deep docs
- Folder: https://github.com/floflo777/open-crypto-puzzles/tree/main/archive/dead-ends/zodomo-11x11-pixel-puzzles-0-05eth
- README (raw): https://raw.githubusercontent.com/floflo777/open-crypto-puzzles/main/archive/dead-ends/zodomo-11x11-pixel-puzzles-0-05eth/README.md

## OCP: машинные данные (puzzles.json, 16.10.2026)

Структурированные данные из `puzzles.json` репозитория [open-crypto-puzzles](https://github.com/floflo777/open-crypto-puzzles) (snapshot OCP: 2026-08-16; цены: {'date': '2026-08-16', 'BTC': 63000, 'ETH': 1880, 'AR': 1.81, 'LTC': 54}).

- `slug`: zodomo-11x11-pixel-puzzles-0-05eth
- `title`: Zodomo 11x11 Pixel Puzzles
- `status`: **dead-end** (dead-end: unfunded)
- `tier`: dead-end | `chain`: ethereum
- `series`: None
- `author`: Zodomo | x:@Zodomo, ens:zodomo.eth, farcaster:fid 9511
- `prize`: 0.05 ETH (оценка $94 на 2026-08-16) — the active (fourth) puzzle's nominal per-piece prize; no escrow currently holds it, see Why this is a dead end
- `published`: 2026-07-30 https://networked.art/11x11
- `puzzle_type`: bip39-seed, pixel-code
- `target_format`: BIP39 mnemonic, 12 or 24 words, English, encoded in an 11x11 pixel grid using an 11-color base-11 palette, BIP44 m/44'/60'/0'/0/0, no passphrase
- `difficulty_left`: external-info
- `difficulty_note`: the active puzzle's escrow does not exist on Ethereum mainnet as of the last check; even once it does, its encoding scheme is not yet identified, and the strongest lead is a set of author-distributed hints in a gated community chat

**Адреса и проверенное состояние:**
- `0x60a5431a138b0320641408694562f624f3c977a8` — escrow | piece #869 escrow | ожидается: 0.05 ETH, funded 2026-07-30 | проверено 2026-08-16: **swept**
  - https://etherscan.io/address/0x60a5431a138b0320641408694562f624f3c977a8
- `0x9cc846fe9b75a4cee897f605b240dd0030fcd5a2` — escrow | piece #930 escrow, encoding scheme not reconstructed | ожидается: 0.05 ETH, funded 2026-07-30 | проверено 2026-08-16: **swept**
  - https://etherscan.io/address/0x9cc846fe9b75a4cee897f605b240dd0030fcd5a2
- `0xf5d45c9d798aedb754b1ed8660af3ea79178b765` — escrow | piece #993 escrow, reclaimed by the artist himself | ожидается: 0.05 ETH, funded 2026-07-30 | проверено 2026-08-16: **swept**
  - https://etherscan.io/address/0xf5d45c9d798aedb754b1ed8660af3ea79178b765
- `0xa15585918e6ef74239246f4e1538acdf70b4743e` — payout | queengarden.eth, paid by hand as the 3rd solver's prize; a real person's active personal wallet, not an escrow for the active puzzle | ожидается: n/a | проверено 2026-08-16: **unknown**
  - https://etherscan.io/address/0xa15585918e6ef74239246f4e1538acdf70b4743e

**Деривация:**
- read the 121-pixel grid (an 11-color palette read as base-11 digits) in a traversal order into a bit string, pack it into BIP39 word indices, derive an Ethereum address at m/44'/60'/0'/0/0, compare to a known escrow; two schemes (a boustrophedon triple-repetition for piece #869, a color-partition split for piece #993) are fully reconstructed and certified; the scheme used for piece #930 and for the active puzzle is not
- оракул: `tools/oracle.py` | сертифицирован: True
- сверено с: piece #993, whose reconstructed mnemonic reproduces its escrow address exactly (the escrow has since been reclaimed by the artist, not a live prize)

**Материалы третьих лиц:**
- 5 short verbatim X posts by the artist, and the artist's own published pixel grids and palette; no third-party copyrighted material

**Источники (OCP `sources`):**
  - url: https://networked.art/11x11 | title: Zodomo, piece collection | date: 2026-08-16
  - url: https://x.com/Zodomo/status/2083364549697155550 | title: Zodomo, X post announcing the active puzzle | date: 2026-08-01
  - url: https://x.com/Zodomo/status/2082949091244327366 | title: Zodomo, X post naming the intended difficulty | date: 2026-07-30
