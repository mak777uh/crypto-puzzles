# FTPK Season 4: Something in Common
> **ПЕРЕМЕЩЕНО 2026-10-17 в `master/solved/`** — пазл решён/закрыт/тупиковый, активная работа не ведётся. Причина: [../INDEX.md](../INDEX.md). Вернуть в `puzzles/` — только при новых данных (правила: `AGENT_INSTRUCTIONS.md`).

Индекс: [MASTER_CATALOG.md](../../MASTER_CATALOG.md) (Части 1-8). Источник данных: [open-crypto-puzzles](https://github.com/floflo777/open-crypto-puzzles).

## Кратко
- Статус: **solved** (solved)
- Цепь: ethereum
- Приз: 166.0 USDC (USD 166)
- Примечание: the author tops up this prize over time; it started at 150 USDC and has grown since, plus a small native ETH gas preload for the eventual winner
- Опубликовано: 2026-07-16 https://x.com/FTPKgame/status/2077755138668671313
- Типы: bip39-seed, word-selection
- Difficulty left: none
- solved by a reader after publication, not by me

## Адреса/эскроу
- `0xa468335485cE853F21A44451755bd88364e9d618` — main | expected: 166.000000 USDC | state: swept (checked 2026-08-21) | https://etherscan.io/address/0xa468335485cE853F21A44451755bd88364e9d618

## Источники
- 2026-07-16 — "A new treasure hunt is live! (Something in common), 12 hidden words, 150 USDC to be won" — https://x.com/FTPKgame/status/2077755138668671313
- 2026-07-23 — "Yes, all the words are necessarily part of the BIP-39 list" — https://x.com/FTPKgame/status/2080258068529492034
- 2026-07-25 — "There is something that almost all the games have in common" — https://x.com/FTPKgame/status/2080976765401387082
- 2026-07-22 — "In Season 4, there is a hidden page to help you with Season 2" — https://x.com/FTPKgame/status/2079947035357102350
- 2026-08-16 — FTPK hub page — https://findtheprivatekeys.vercel.app/
- 2026-08-16 — Season 4 puzzle site — https://findtheprivatekeys4.vercel.app/
- 2026-08-16 — Escrow wallet, etherscan.io — https://etherscan.io/address/0xa468335485cE853F21A44451755bd88364e9d618

## Подробности
Здесь должна накапливаться расширенная информация по мере проходов: подсказки, прогресс сообщества, проверенные гипотезы, ссылки, compute-оценки. Текущий файл — скелет из OCP; заполняется автоматически в циклах.


---
## Логирование (обязательно)
См. `../../AGENT_INSTRUCTIONS.md`. Любая значимая находка/прогресс/баланс/решение (полностью или частично) **должна** быть дописана сюда с датой и ссылкой. Параллельные агенты обязаны соблюдать тот же протокол.

## OCP deep docs
- Folder: https://github.com/floflo777/open-crypto-puzzles/tree/main/4-solved/ftpk-season-4-166usdc
- README (raw): https://raw.githubusercontent.com/floflo777/open-crypto-puzzles/main/4-solved/ftpk-season-4-166usdc/README.md

## OCP: машинные данные (puzzles.json, 16.10.2026)

Структурированные данные из `puzzles.json` репозитория [open-crypto-puzzles](https://github.com/floflo777/open-crypto-puzzles) (snapshot OCP: 2026-08-21; цены: {'date': '2026-08-16', 'BTC': 63000, 'ETH': 1880, 'AR': 1.81, 'LTC': 54}).

- `slug`: ftpk-season-4-166usdc
- `title`: FTPK Season 4: Something in Common
- `status`: **solved**
- `tier`: solved | `chain`: ethereum
- `series`: ftpk
- `author`: FTPKgame | x:@FTPKgame
- `prize`: 166.0 USDC (оценка $166 на 2026-08-16) — the author tops up this prize over time; it started at 150 USDC and has grown since, plus a small native ETH gas preload for the eventual winner
- `published`: 2026-07-16 https://x.com/FTPKgame/status/2077755138668671313
- `puzzle_type`: bip39-seed, word-selection
- `target_format`: 12 English BIP39 words, BIP44 Ethereum m/44'/60'/0'/0/0, no passphrase, order recoverable offline once the word set is known
- `difficulty_left`: none
- `difficulty_note`: solved by a reader after publication, not by me

**Адреса и проверенное состояние:**
- `0xa468335485cE853F21A44451755bd88364e9d618` — escrow | main | ожидается: 166.000000 USDC | проверено 2026-08-21: **swept**
  - https://etherscan.io/address/0xa468335485cE853F21A44451755bd88364e9d618

**Деривация:**
- solve each of 12 independent mini-games to get one BIP39 word each, then derive the standard BIP44 first Ethereum address and compare it to the escrow
- оракул: `tools/oracle.py` | сертифицирован: True
- сверено с: the public BIP39/BIP44 test mnemonic (12x 'abandon' plus 'about'); no author-published worked example exists for this season

**Зацепки (OCP `leads`):**
  - title: identify the common mechanic across the 12 games (most likely: each yields a number used as a BIP39 wordlist index) | status: open
  - title: solve the remaining games directly; the word order is a minor convenience, not a real lock, once the word set is known | status: open

**Решения/выплаты (OCP `solutions`):**
  - date: 2026-08-20

**Материалы третьих лиц:**
- no images, audio, or video shipped; only short quoted author text and the site's own rule text are included

**Источники (OCP `sources`):**
  - url: https://x.com/FTPKgame/status/2077755138668671313 | title: "A new treasure hunt is live! (Something in common), 12 hidden words, 150 USDC to be won" | date: 2026-07-16
  - url: https://x.com/FTPKgame/status/2080258068529492034 | title: "Yes, all the words are necessarily part of the BIP-39 list" | date: 2026-07-23
  - url: https://x.com/FTPKgame/status/2080976765401387082 | title: "There is something that almost all the games have in common" | date: 2026-07-25
  - url: https://x.com/FTPKgame/status/2079947035357102350 | title: "In Season 4, there is a hidden page to help you with Season 2" | date: 2026-07-22
  - url: https://findtheprivatekeys.vercel.app/ | title: FTPK hub page | date: 2026-08-16
  - url: https://findtheprivatekeys4.vercel.app/ | title: Season 4 puzzle site | date: 2026-08-16
  - url: https://etherscan.io/address/0xa468335485cE853F21A44451755bd88364e9d618 | title: Escrow wallet, etherscan.io | date: 2026-08-16
