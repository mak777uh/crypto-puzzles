# Wonderabbit: Prometheus
> **ПЕРЕМЕЩЕНО 2026-10-17 в `master/solved/`** — пазл решён/закрыт/тупиковый, активная работа не ведётся. Причина: [../INDEX.md](../INDEX.md). Вернуть в `puzzles/` — только при новых данных (правила: `AGENT_INSTRUCTIONS.md`).

Индекс: [MASTER_CATALOG.md](../../MASTER_CATALOG.md) (Части 1-8). Источник данных: [open-crypto-puzzles](https://github.com/floflo777/open-crypto-puzzles).

## Кратко
- Статус: **solved** (solved)
- Цепь: bitcoin
- Приз: 1031123 sats (USD 650)
- Примечание: current balance after a documented 21000-sats self-test transaction that the author sent to and from themselves before funding the prize; not the prize moving
- Опубликовано: 2025-04-01 https://cyphermunkhouse.com/wonderabbit
- Типы: bip39-seed, physical-object, text-cipher
- Difficulty left: external-info
- the encoding rules are fully published by the author, but the companion puzzle programme that turns those rules into an actual 12-word phrase has never appeared online; nothing is computable until it is obtained

## Адреса/эскроу
- `bc1q3nxe7436s3mlrkyrg3uv2a40yt5dcmfu7tggx5` — main | expected: 0 sats (1,031,123 sats until 2026-09-28) | state: swept (checked 2026-10-03) | https://mempool.space/address/bc1q3nxe7436s3mlrkyrg3uv2a40yt5dcmfu7tggx5

## Источники
- 2026-08-02 — Prometheus rules, Cyphermunk House — https://cyphermunkhouse.com/wonderabbit
- 2026-08-02 — Show description, wonderabbit.org — https://wonderabbit.org
- 2026-08-16 — WONDERABBIT on Nostr — https://njump.me/npub1gclc9l83teatpeymmyawc8u4mzal9r0kvh58hq9rwvfy7ys2qn4sr6wdfh
- 2026-09-28 — issue #36, sweep reported by Andy00L — https://github.com/floflo777/open-crypto-puzzles/issues/36

## Подробности
Здесь должна накапливаться расширенная информация по мере проходов: подсказки, прогресс сообщества, проверенные гипотезы, ссылки, compute-оценки. Текущий файл — скелет из OCP; заполняется автоматически в циклах.


---
## Логирование (обязательно)
См. `../../AGENT_INSTRUCTIONS.md`. Любая значимая находка/прогресс/баланс/решение (полностью или частично) **должна** быть дописана сюда с датой и ссылкой. Параллельные агенты обязаны соблюдать тот же протокол.

## OCP deep docs
- Folder: https://github.com/floflo777/open-crypto-puzzles/tree/main/4-solved/wonderabbit-prometheus-1msats
- README (raw): https://raw.githubusercontent.com/floflo777/open-crypto-puzzles/main/4-solved/wonderabbit-prometheus-1msats/README.md

## OCP: машинные данные (puzzles.json, 16.10.2026)

Структурированные данные из `puzzles.json` репозитория [open-crypto-puzzles](https://github.com/floflo777/open-crypto-puzzles) (snapshot OCP: 2026-08-16; цены: {'date': '2026-08-16', 'BTC': 63000, 'ETH': 1880, 'AR': 1.81, 'LTC': 54}).

- `slug`: wonderabbit-prometheus-1msats
- `title`: Wonderabbit: Prometheus
- `status`: **solved**
- `tier`: solved | `chain`: bitcoin
- `series`: None
- `author`: WONDERABBIT (Cyphermunk House) | nostr:npub1gclc9l83teatpeymmyawc8u4mzal9r0kvh58hq9rwvfy7ys2qn4sr6wdfh, nostr:npub17mzfuxmmwyrty75gy493dlhqmq6lezk2rkmcu2svhx3l0zwyrtysal50aq
- `prize`: 1031123 sats (оценка $650 на 2026-08-16) — current balance after a documented 21000-sats self-test transaction that the author sent to and from themselves before funding the prize; not the prize moving
- `published`: 2025-04-01 https://cyphermunkhouse.com/wonderabbit
- `puzzle_type`: bip39-seed, physical-object, text-cipher
- `target_format`: BIP39 12 words, each expressed as text, a 1-2048 wordlist index, or an 11-bit binary; derivation path not established
- `difficulty_left`: external-info
- `difficulty_note`: the encoding rules are fully published by the author, but the companion puzzle programme that turns those rules into an actual 12-word phrase has never appeared online; nothing is computable until it is obtained
- `tested_total`: {'candidates': 0, 'families': 4, 'certified': False}

**Адреса и проверенное состояние:**
- `bc1q3nxe7436s3mlrkyrg3uv2a40yt5dcmfu7tggx5` — escrow | main | ожидается: 0 sats (1,031,123 sats until 2026-09-28) | проверено 2026-10-03: **swept**
  - https://mempool.space/address/bc1q3nxe7436s3mlrkyrg3uv2a40yt5dcmfu7tggx5

**Деривация:**
- no ciphertext has been extracted from public material; once words, indices, or binaries are recovered from the companion programme, derive BIP44/49/84 and compare to the escrow address

**Зацепки (OCP `leads`):**
  - title: obtain the companion puzzle programme | status: open
  - title: ask a specific yes-or-no question on Nostr | status: open
  - title: watch for a third staging of the show | status: open

**Решения/выплаты (OCP `solutions`):**
  - date: 2026-09-28

**Материалы третьих лиц:**
- the rules and show description are the author's own published text, quoted verbatim in clues/author-posts.md; no recording, script, or programme scan exists to include

**Источники (OCP `sources`):**
  - url: https://cyphermunkhouse.com/wonderabbit | title: Prometheus rules, Cyphermunk House | date: 2026-08-02
  - url: https://wonderabbit.org | title: Show description, wonderabbit.org | date: 2026-08-02
  - url: https://njump.me/npub1gclc9l83teatpeymmyawc8u4mzal9r0kvh58hq9rwvfy7ys2qn4sr6wdfh | title: WONDERABBIT on Nostr | date: 2026-08-16
  - url: https://github.com/floflo777/open-crypto-puzzles/issues/36 | title: issue #36, sweep reported by Andy00L | date: 2026-09-28
