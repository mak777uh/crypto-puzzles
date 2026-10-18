# LuckyLurker Seed Riddles
> **ПЕРЕМЕЩЕНО 2026-10-17 в `master/solved/`** — пазл решён/закрыт/тупиковый, активная работа не ведётся. Причина: [../INDEX.md](../INDEX.md). Вернуть в `puzzles/` — только при новых данных (правила: `AGENT_INSTRUCTIONS.md`).

Индекс: [MASTER_CATALOG.md](../../MASTER_CATALOG.md) (Части 1-8). Источник данных: [open-crypto-puzzles](https://github.com/floflo777/open-crypto-puzzles).

## Кратко
- Статус: **solved** (solved)
- Цепь: bitcoin
- Приз: 80000 sats (USD 50)
- Примечание: single P2WPKH escrow, 2 funding transactions of 40,000 sats each
- Опубликовано: 2026-03-17 https://luckylurker.com/bitcoin-vault/
- Типы: bip39-seed, word-selection, text-cipher
- Difficulty left: none
- solved by a reader after publication, not by me

## Адреса/эскроу
- `bc1q32e3dxcd0n2tlzdmchraf2057d0ax4xdwrk3jq` — main | expected: 80000 sats | state: swept (checked 2026-08-21) | https://mempool.space/address/bc1q32e3dxcd0n2tlzdmchraf2057d0ax4xdwrk3jq

## Источники
- 2026-03-17 — Bitcoin Vault puzzle page — https://luckylurker.com/bitcoin-vault/
- 2026-08-16 — Crypto casinos guide (hint 3 target) — https://luckylurker.com/crypto-casinos-guide/
- 2026-08-16 — Gamdom review (hint 5 target) — https://luckylurker.com/casino/gamdom/
- 2026-08-16 — N1 Casino review (hint 8 target) — https://luckylurker.com/casino/n1/
- 2026-08-16 — Fastest crypto casino withdrawals article (hint 9 target) — https://luckylurker.com/fastest-crypto-casino-withdrawals-2026/

## Подробности
Здесь должна накапливаться расширенная информация по мере проходов: подсказки, прогресс сообщества, проверенные гипотезы, ссылки, compute-оценки. Текущий файл — скелет из OCP; заполняется автоматически в циклах.


---
## Логирование (обязательно)
См. `../../AGENT_INSTRUCTIONS.md`. Любая значимая находка/прогресс/баланс/решение (полностью или частично) **должна** быть дописана сюда с датой и ссылкой. Параллельные агенты обязаны соблюдать тот же протокол.

## OCP deep docs
- Folder: https://github.com/floflo777/open-crypto-puzzles/tree/main/4-solved/luckylurker-seed-riddles-80ksats
- README (raw): https://raw.githubusercontent.com/floflo777/open-crypto-puzzles/main/4-solved/luckylurker-seed-riddles-80ksats/README.md

## OCP: машинные данные (puzzles.json, 16.10.2026)

Структурированные данные из `puzzles.json` репозитория [open-crypto-puzzles](https://github.com/floflo777/open-crypto-puzzles) (snapshot OCP: 2026-08-21; цены: {'date': '2026-08-16', 'BTC': 63000, 'ETH': 1880, 'AR': 1.81, 'LTC': 54}).

- `slug`: luckylurker-seed-riddles-80ksats
- `title`: LuckyLurker Seed Riddles
- `status`: **solved**
- `tier`: solved | `chain`: bitcoin
- `series`: None
- `author`: unknown individual, published on luckylurker.com
- `prize`: 80000 sats (оценка $50 на 2026-08-16) — single P2WPKH escrow, 2 funding transactions of 40,000 sats each
- `published`: 2026-03-17 https://luckylurker.com/bitcoin-vault/
- `puzzle_type`: bip39-seed, word-selection, text-cipher
- `target_format`: BIP39 12 words (English), fixed 1:1 position mapping from the 12 published hints, most likely BIP84 m/84'/0'/0'/0/0 (script type v0_p2wpkh), no passphrase stated
- `difficulty_left`: none
- `difficulty_note`: solved by a reader after publication, not by me
- `tested_total`: {'candidates': 2000000, 'families': 1, 'certified': False}

**Адреса и проверенное состояние:**
- `bc1q32e3dxcd0n2tlzdmchraf2057d0ax4xdwrk3jq` — escrow | main | ожидается: 80000 sats | проверено 2026-08-21: **swept**
  - https://mempool.space/address/bc1q32e3dxcd0n2tlzdmchraf2057d0ax4xdwrk3jq

**Деривация:**
- resolve each of the 12 labeled hints to one BIP39 word at its stated position, then derive the 12-word mnemonic to a Bitcoin address
- оракул: `tools/oracle.py` | сертифицирован: True
- сверено с: the public BIP39/BIP84 test vectors, since no solved sibling puzzle exists on this site

**Зацепки (OCP `leads`):**
  - title: Wait for or request the site's own canonical answer to the 8 riddles | status: open
  - title: Re-check the other 8 riddle-linked articles for the same italic-tag device | status: open

**Решения/выплаты (OCP `solutions`):**
  - date: 2026-08-17

**Материалы третьих лиц:**
- The puzzle page and 4 target review articles are the site's own published pages; only short verbatim hints and a table of the marked words are included, no full page content.

**Источники (OCP `sources`):**
  - url: https://luckylurker.com/bitcoin-vault/ | title: Bitcoin Vault puzzle page | date: 2026-03-17
  - url: https://luckylurker.com/crypto-casinos-guide/ | title: Crypto casinos guide (hint 3 target) | date: 2026-08-16
  - url: https://luckylurker.com/casino/gamdom/ | title: Gamdom review (hint 5 target) | date: 2026-08-16
  - url: https://luckylurker.com/casino/n1/ | title: N1 Casino review (hint 8 target) | date: 2026-08-16
  - url: https://luckylurker.com/fastest-crypto-casino-withdrawals-2026/ | title: Fastest crypto casino withdrawals article (hint 9 target) | date: 2026-08-16
