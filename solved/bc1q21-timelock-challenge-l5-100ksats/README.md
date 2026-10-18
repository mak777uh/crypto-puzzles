# bc1q21 Time-Lock Challenge, Level 5
> **ПЕРЕМЕЩЕНО 2026-10-17 в `master/solved/`** — пазл решён/закрыт/тупиковый, активная работа не ведётся. Причина: [../INDEX.md](../INDEX.md). Вернуть в `puzzles/` — только при новых данных (правила: `AGENT_INSTRUCTIONS.md`).

Индекс: [MASTER_CATALOG.md](../../MASTER_CATALOG.md) (Части 1-8). Источник данных: [open-crypto-puzzles](https://github.com/floflo777/open-crypto-puzzles).

## Кратко
- Статус: **solved** (solved)
- Цепь: bitcoin
- Приз: 100000 sats (USD 63)
- Примечание: 100,000 sats locked in the P2SH time lock; I received 99,604 sats after the 396 sat network fee
- Опубликовано: 2026-07-13 https://bc1q21.com
- Типы: bip39-seed, timelock
- Difficulty left: none
- solved; the claim transaction confirms the answer

## Адреса/эскроу
- `37xcRXcYRht9VZJeLYWegDRC2fjX5XVnAp` — P2SH CLTV time lock holding the prize | expected: 100,000 sats, funded 2026-07-03 | state: swept (checked 2026-08-16) | https://mempool.space/address/37xcRXcYRht9VZJeLYWegDRC2fjX5XVnAp
- `bc1q3pwpgp7dkhtzj6qya39l8tu6dgdarv9gr9kx0r` — funding-oracle address, BIP84 m/84'/0'/0'/0/0 of the recovery phrase | expected: 101,750 sats total received | state: swept (checked 2026-08-16) | https://mempool.space/address/bc1q3pwpgp7dkhtzj6qya39l8tu6dgdarv9gr9kx0r

## Источники
- 2026-08-16 — bc1q21, official site — https://bc1q21.com
- 2026-07-24 — Claim transaction, mempool.space — https://mempool.space/tx/73baf40f668fb221b6b9c934f199a51f7e0ab1f1bb585e07c18a7b3e88dfd7ed
- 2026-07-03 — Time-lock creation transaction, mempool.space — https://mempool.space/tx/d2c8237bd6d107a4d08ab390c0bfa4f21f4e52a19d8672d66012bceaab881901

## Подробности
Здесь должна накапливаться расширенная информация по мере проходов: подсказки, прогресс сообщества, проверенные гипотезы, ссылки, compute-оценки. Текущий файл — скелет из OCP; заполняется автоматически в циклах.


---
## Логирование (обязательно)
См. `../../AGENT_INSTRUCTIONS.md`. Любая значимая находка/прогресс/баланс/решение (полностью или частично) **должна** быть дописана сюда с датой и ссылкой. Параллельные агенты обязаны соблюдать тот же протокол.

## OCP deep docs
- Folder: https://github.com/floflo777/open-crypto-puzzles/tree/main/4-solved/bc1q21-timelock-challenge-l5-100ksats
- README (raw): https://raw.githubusercontent.com/floflo777/open-crypto-puzzles/main/4-solved/bc1q21-timelock-challenge-l5-100ksats/README.md

## OCP: машинные данные (puzzles.json, 16.10.2026)

Структурированные данные из `puzzles.json` репозитория [open-crypto-puzzles](https://github.com/floflo777/open-crypto-puzzles) (snapshot OCP: 2026-08-16; цены: {'date': '2026-08-16', 'BTC': 63000, 'ETH': 1880, 'AR': 1.81, 'LTC': 54}).

- `slug`: bc1q21-timelock-challenge-l5-100ksats
- `title`: bc1q21 Time-Lock Challenge, Level 5
- `status`: **solved**
- `tier`: solved | `chain`: bitcoin
- `series`: None
- `author`: bc1q21 | x:@bc1q21, primal:bc1q21, youtube:bc1q21
- `prize`: 100000 sats (оценка $63 на 2026-08-16) — 100,000 sats locked in the P2SH time lock; I received 99,604 sats after the 396 sat network fee
- `published`: 2026-07-13 https://bc1q21.com
- `puzzle_type`: bip39-seed, timelock
- `target_format`: BIP39 12 words, English, BIP84 m/84'/0'/0'/0/0 for the funding-oracle address; the prize itself sits behind a P2SH CLTV script spent with a key at m/44'/0'/0'/0/0, no passphrase
- `difficulty_left`: none
- `difficulty_note`: solved; the claim transaction confirms the answer
- `tested_total`: {'candidates': 2488320000, 'families': 1, 'certified': True}

**Адреса и проверенное состояние:**
- `37xcRXcYRht9VZJeLYWegDRC2fjX5XVnAp` — contract | P2SH CLTV time lock holding the prize | ожидается: 100,000 sats, funded 2026-07-03 | проверено 2026-08-16: **swept**
  - https://mempool.space/address/37xcRXcYRht9VZJeLYWegDRC2fjX5XVnAp
- `bc1q3pwpgp7dkhtzj6qya39l8tu6dgdarv9gr9kx0r` — escrow | funding-oracle address, BIP84 m/84'/0'/0'/0/0 of the recovery phrase | ожидается: 101,750 sats total received | проверено 2026-08-16: **swept**
  - https://mempool.space/address/bc1q3pwpgp7dkhtzj6qya39l8tu6dgdarv9gr9kx0r

**Деривация:**
- assemble 12 BIP39 words from 12 daily riddle clues under a wordlist-constrained reading (the operator substitutes the closest BIP39 word when the natural English word is not in the list); validate against the funding-oracle address; separately reconstruct the CLTV redeem script by hashing candidate (derivation path, midnight-UTC locktime) pairs and comparing the result to the P2SH address
- оракул: `tools/oracle.py` | сертифицирован: True
- сверено с: the official BIP84 test vector, and the solved mnemonic itself, which reproduces the funding-oracle address exactly

**Решения/выплаты (OCP `solutions`):**
  - date: 2026-07-24

**Материалы третьих лиц:**
- 12 short daily riddle quotes from the operator's own public posts, reproduced verbatim with dates; nothing else

**Источники (OCP `sources`):**
  - url: https://bc1q21.com | title: bc1q21, official site | date: 2026-08-16
  - url: https://mempool.space/tx/73baf40f668fb221b6b9c934f199a51f7e0ab1f1bb585e07c18a7b3e88dfd7ed | title: Claim transaction, mempool.space | date: 2026-07-24
  - url: https://mempool.space/tx/d2c8237bd6d107a4d08ab390c0bfa4f21f4e52a19d8672d66012bceaab881901 | title: Time-lock creation transaction, mempool.space | date: 2026-07-03
