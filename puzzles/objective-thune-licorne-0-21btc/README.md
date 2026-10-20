# Objective Thune: Le Secret de la Licorne
> **ВОЗВРАЩЁН В `master/puzzles/` 2026-10-19 — статус «СТОРОЖ» (решение Ильи)** — папка была перенесена в `solved/` 17.10.2026 как тупик; приз жив с 2020, новых событий нет, но деньги не разобраны, поэтому цель держится под наблюдением, а не под перебором. Рабочих прогонов не запускать — нужен физический факт (какие 3 из 210 нумерованных томов содержат ключи), вычислением не берётся. Основание: `AGENT_INSTRUCTIONS.md` §5 + правило №4; история переносов: [../../solved/INDEX.md](../../solved/INDEX.md).

Индекс: [MASTER_CATALOG.md](../../MASTER_CATALOG.md) (Части 1-8). Источник данных: [open-crypto-puzzles](https://github.com/floflo777/open-crypto-puzzles).

## Кратко
- Статус: **сторож** (тупик сохраняется; наблюдение вместо активной работы — решение Ильи 19.10.2026)
- Цепь: bitcoin
- Приз: 0.21021 BTC (USD 13243)
- Примечание: P2SH escrow, 2 funding transactions: 2020-01-03 (21,000,000 sats) and 2020-06-19 (21,000 sats)
- Опубликовано: 2020-03-01 https://bitcoin.fr/le-secret-de-la-licorne/
- Типы: multisig, physical-object, book
- Difficulty left: none
- the mechanism is fully specified and the oracle is ready; what is missing is which 3 of the 210 physical book copies hold the keys, a physical fact, not a computation

## Адреса/эскроу
- `3Jf995GANG4EmFBK89byNNyZdtB3ELXJsZ` — main | expected: 0.21021 BTC (21,021,000 sats) | state: funded-unspent (checked 2026-08-16) | https://mempool.space/address/3Jf995GANG4EmFBK89byNNyZdtB3ELXJsZ

## Источники
- 2020-03-01 — Le secret de la Licorne — https://bitcoin.fr/le-secret-de-la-licorne/
- 2021-01-16 — Objective Thune, collector edition product page — https://www.plaisirvaleurdhistoire.com/shop/objective-thune/222-soutien-licorne-financement-participatif-d-une-collection-bitcoin.html
- 2020-02-29 — journalducoin.com, interview with the publisher — https://journalducoin.com
- 2026-08-16 — PVH editions — https://pvh-editions.com
- 2026-08-16 — mempool.space, escrow address — https://mempool.space/address/3Jf995GANG4EmFBK89byNNyZdtB3ELXJsZ

## Подробности
Здесь должна накапливаться расширенная информация по мере проходов: подсказки, прогресс сообщества, проверенные гипотезы, ссылки, compute-оценки. Текущий файл — скелет из OCP; заполняется автоматически в циклах.


---
## Логирование (обязательно)
См. `../../AGENT_INSTRUCTIONS.md`. Любая значимая находка/прогресс/баланс/решение (полностью или частично) **должна** быть дописана сюда с датой и ссылкой. Параллельные агенты обязаны соблюдать тот же протокол.

## OCP deep docs
- Folder: https://github.com/floflo777/open-crypto-puzzles/tree/main/archive/dead-ends/objective-thune-licorne-0-21btc
- README (raw): https://raw.githubusercontent.com/floflo777/open-crypto-puzzles/main/archive/dead-ends/objective-thune-licorne-0-21btc/README.md

## OCP: машинные данные (puzzles.json, 16.10.2026)

Структурированные данные из `puzzles.json` репозитория [open-crypto-puzzles](https://github.com/floflo777/open-crypto-puzzles) (snapshot OCP: 2026-08-16; цены: {'date': '2026-08-16', 'BTC': 63000, 'ETH': 1880, 'AR': 1.81, 'LTC': 54}).

- `slug`: objective-thune-licorne-0-21btc
- `title`: Objective Thune: Le Secret de la Licorne
- `status`: **dead-end** (dead-end: unobtainable-material)
- `tier`: dead-end | `chain`: bitcoin
- `series`: None
- `author`: Jacques Favier and Philippe Ratte, published by PVH editions | web:pvh-editions.com, x:@EditionsPvh
- `prize`: 0.21021 BTC (оценка $13243 на 2026-08-16) — P2SH escrow, 2 funding transactions: 2020-01-03 (21,000,000 sats) and 2020-06-19 (21,000 sats)
- `published`: 2020-03-01 https://bitcoin.fr/le-secret-de-la-licorne/
- `puzzle_type`: multisig, physical-object, book
- `target_format`: 3 private keys, physically hidden in 3 of 210 numbered book copies; their public keys form a Bitcoin Core 0.18.1-style P2SH multisig redeem script (M-of-3, key order not sorted)
- `difficulty_left`: none
- `difficulty_note`: the mechanism is fully specified and the oracle is ready; what is missing is which 3 of the 210 physical book copies hold the keys, a physical fact, not a computation
- `tested_total`: {'candidates': 4308174, 'families': 6, 'certified': True}

**Адреса и проверенное состояние:**
- `3Jf995GANG4EmFBK89byNNyZdtB3ELXJsZ` — escrow | main | ожидается: 0.21021 BTC (21,021,000 sats) | проверено 2026-08-16: **funded-unspent**
  - https://mempool.space/address/3Jf995GANG4EmFBK89byNNyZdtB3ELXJsZ

**Деривация:**
- rebuild OP_M <pk1> <pk2> <pk3> OP_3 OP_CHECKMULTISIG for every key order and every M from candidate public keys, hash160 the script, base58check-encode as P2SH, compare to the escrow
- оракул: `tools/oracle.py` | сертифицирован: True
- сверено с: a real, already-spent 2-of-3 P2SH multisig found on-chain (block 360000, transaction de5af572e195ecbd7ce715be0464f79cd720b1c540c23c07a9d4e23dd24f8e47), decoded directly from its scriptSig

**Зацепки (OCP `leads`):**
  - title: write to the authors or the publisher: has the lot ever been claimed | status: open
  - title: the 2025 CC BY-SA print-files zip (currently 404, not archived) | status: open
  - title: locate a physical numbered collector copy and inspect it | status: open
  - title: re-read the authors' and publisher's social accounts for a claim mention | status: open

**Материалы третьих лиц:**
- the book is a commercial work; no page scans, OCR text, or press photos of the interior are included. Only short verbatim quotes (with source and date) from the publisher's own announcements are used, none exceeding 2 sentences; no image from the book, its cover, or press coverage is shipped in this folder

**Источники (OCP `sources`):**
  - url: https://bitcoin.fr/le-secret-de-la-licorne/ | title: Le secret de la Licorne | date: 2020-03-01
  - url: https://www.plaisirvaleurdhistoire.com/shop/objective-thune/222-soutien-licorne-financement-participatif-d-une-collection-bitcoin.html | title: Objective Thune, collector edition product page | date: 2021-01-16
  - url: https://journalducoin.com | title: journalducoin.com, interview with the publisher | date: 2020-02-29
  - url: https://pvh-editions.com | title: PVH editions | date: 2026-08-16
  - url: https://mempool.space/address/3Jf995GANG4EmFBK89byNNyZdtB3ELXJsZ | title: mempool.space, escrow address | date: 2026-08-16

## Возврат в puzzles (2026-10-19, Beam)
- Причина: на адресе эскроу 3Jf995GANG4EmFBK89byNNyZdtB3ELXJsZ остаётся **0.21021 BTC (21 021 000 сат)**, unspent; пазл ранее dead-end (физический объект), но деньги не сняты — требуется поиск готового решения/ключей в сети.
- Источник проверки: blockstream.info (2026-10-19).

## Поправка к возврату (2026-10-19, Qoder)
- Тип: отрицательный результат / классификация статуса
- Суть: возврат в `puzzles/` отменён, папка снова в `solved/`. Он-чейн: `3Jf995…` = 21 021 000 сат, трат 0, пополнения — только 2020 год (03.01 и 19.06). Ни возврата приза, ни новой стадии автора нет → §5 не выполняется. Нужен физический факт (какие 3 из 210 книг), перебором не берётся.
- Источник: https://blockstream.info/address/3Jf995GANG4EmFBK89byNNyZdtB3ELXJsZ (проверено 19.10.2026)
- Проверено: да
- Влияние на оценку: цель — сторож; рабочей оси нет.
- Подробности и хроника: см. LOG.md

## Обновление (2026-10-19, Qoder) — статус «сторож» по решению владельца
- Тип: решение владельца / статус цели
- Суть: по запросу Ильи папка возвращена в `puzzles/` и ведётся как **цель-сторож**: приз `3Jf995GANG4EmFBK89byNNyZdtB3ELXJsZ` = 21 021 000 сат (0,21021 BTC), жив с 2020; рабочих прогонов нет — тупик прежний (нужен физический факт: какие 3 из 210 нумерованных томов содержат ключи; вычислением не берётся).
- Что делает сторож: `python tools/sandbox/monitor.py` следит за балансом, tx_count и OP_RETURN адреса и сам дописывает событие в этот `LOG.md`.
- Условия переоткрытия активной работы: (§5) пополнение/возврат приза, публикация отсутствующих материалов, заявление автора о новой стадии.
- Источник: решение Ильи в сессии 19.10.2026; проверка баланса — https://blockstream.info/api (read-only, 19.10.2026).
- Проверено: да (только чтение он-чейн; транзакций не создавалось).
- Подробности и хроника: см. LOG.md
