# ONFO / Dr. J.R. Forsyth Bitcoin Treasure Hunt
> **ВОЗВРАЩЁН В `master/puzzles/` 2026-10-19 — статус «СТОРОЖ» (решение Ильи)** — папка была перенесена в `solved/` 17.10.2026 как тупик; приз жив с 2021-06, новых событий нет, но деньги не разобраны, поэтому цель держится под наблюдением, а не под перебором. Рабочих прогонов не запускать: сегменты 6–10 не опубликованы, единственный названный держатель ключа умер в 2023. Основание: `AGENT_INSTRUCTIONS.md` §5 + правило №4; история переносов: [../../solved/INDEX.md](../../solved/INDEX.md).

Индекс: [MASTER_CATALOG.md](../../MASTER_CATALOG.md) (Части 1-8). Источник данных: [open-crypto-puzzles](https://github.com/floflo777/open-crypto-puzzles).

## Кратко
- Статус: **сторож** (тупик сохраняется; наблюдение вместо активной работы — решение Ильи 19.10.2026)
- Цепь: bitcoin
- Приз: 1 BTC (USD 63000)
- Примечание: reported in contemporaneous coverage as funded from the author's personal funds, not a company treasury
- Опубликовано: 2021-06-25 https://www.benzinga.com/pressreleases/21/06/a21717862/onfo-announces-bitcoin-treasure-hunt
- Типы: raw-private-key, video-series
- Difficulty left: external-info
- half of the announced material (segments 6 to 10) was never published, and the sole self-declared key holder died in 2023; no known method applies to an incomplete corpus

## Адреса/эскроу
- `157dpLJgAAKugukKz8UwBHapM4idyZvnLc` — the announced prize wallet | expected: 1 BTC | state: funded-unspent (checked 2026-08-16) | https://mempool.space/address/157dpLJgAAKugukKz8UwBHapM4idyZvnLc

## Источники
- 2021-06-25 — ONFO Announces Bitcoin Treasure Hunt (press release) — https://www.benzinga.com/pressreleases/21/06/a21717862/onfo-announces-bitcoin-treasure-hunt
- 2021-06-22 — SEGMENT 1 - Intro to Crypto — https://www.youtube.com/watch?v=YMl3-AfBBvs
- 2021-07-09 — SEGMENT 2 - Modern Slavery — https://www.youtube.com/watch?v=40l9ukS7Nmg
- 2022-03-29 — Segment 5 - Leveling the Playing Field (last segment published) — https://www.youtube.com/watch?v=LMbvquFBhoE
- 2023-06-01 — Missing 'Bitcoin Millionaire' and ONFO coin co-creator found dead: Report — https://cointelegraph.com/news/bitcoin-millionaire-onfo-coin-creator-dead

## Подробности
Здесь должна накапливаться расширенная информация по мере проходов: подсказки, прогресс сообщества, проверенные гипотезы, ссылки, compute-оценки. Текущий файл — скелет из OCP; заполняется автоматически в циклах.


---
## Логирование (обязательно)
См. `../../AGENT_INSTRUCTIONS.md`. Любая значимая находка/прогресс/баланс/решение (полностью или частично) **должна** быть дописана сюда с датой и ссылкой. Параллельные агенты обязаны соблюдать тот же протокол.

## OCP deep docs
- Folder: https://github.com/floflo777/open-crypto-puzzles/tree/main/archive/dead-ends/onfo-forsyth-1btc
- README (raw): https://raw.githubusercontent.com/floflo777/open-crypto-puzzles/main/archive/dead-ends/onfo-forsyth-1btc/README.md

## OCP: машинные данные (puzzles.json, 16.10.2026)

Структурированные данные из `puzzles.json` репозитория [open-crypto-puzzles](https://github.com/floflo777/open-crypto-puzzles) (snapshot OCP: 2026-08-16; цены: {'date': '2026-08-16', 'BTC': 63000, 'ETH': 1880, 'AR': 1.81, 'LTC': 54}).

- `slug`: onfo-forsyth-1btc
- `title`: ONFO / Dr. J.R. Forsyth Bitcoin Treasure Hunt
- `status`: **dead-end** (dead-end: author-deceased-unfinished)
- `tier`: dead-end | `chain`: bitcoin
- `series`: None
- `author`: Dr. John Forsyth (Onfo LLC, persona "Dr. J.R. Forsyth") | youtube:@onfocoin
- `prize`: 1 BTC (оценка $63000 на 2026-08-16) — reported in contemporaneous coverage as funded from the author's personal funds, not a company treasury
- `published`: 2021-06-25 https://www.benzinga.com/pressreleases/21/06/a21717862/onfo-announces-bitcoin-treasure-hunt
- `puzzle_type`: raw-private-key, video-series
- `target_format`: a Bitcoin private key, format not specified by the author (WIF or hex), matching P2PKH address 157dpLJgAAKugukKz8UwBHapM4idyZvnLc
- `difficulty_left`: external-info
- `difficulty_note`: half of the announced material (segments 6 to 10) was never published, and the sole self-declared key holder died in 2023; no known method applies to an incomplete corpus

**Адреса и проверенное состояние:**
- `157dpLJgAAKugukKz8UwBHapM4idyZvnLc` — escrow | the announced prize wallet | ожидается: 1 BTC | проверено 2026-08-16: **funded-unspent**
  - https://mempool.space/address/157dpLJgAAKugukKz8UwBHapM4idyZvnLc

**Деривация:**
- the author stated a private key is hidden "in plain sight" somewhere in the visual or audio content of 10 video segments, all required together; no decoding method, cipher, or steganographic technique was ever specified, and only 5 of the 10 segments were ever published

**Материалы третьих лиц:**
- short verbatim quotes from the author's own press release and video descriptions; one news report cited for the date of the author's death, no further detail reproduced

**Источники (OCP `sources`):**
  - url: https://www.benzinga.com/pressreleases/21/06/a21717862/onfo-announces-bitcoin-treasure-hunt | title: ONFO Announces Bitcoin Treasure Hunt (press release) | date: 2021-06-25
  - url: https://www.youtube.com/watch?v=YMl3-AfBBvs | title: SEGMENT 1 - Intro to Crypto | date: 2021-06-22
  - url: https://www.youtube.com/watch?v=40l9ukS7Nmg | title: SEGMENT 2 - Modern Slavery | date: 2021-07-09
  - url: https://www.youtube.com/watch?v=LMbvquFBhoE | title: Segment 5 - Leveling the Playing Field (last segment published) | date: 2022-03-29
  - url: https://cointelegraph.com/news/bitcoin-millionaire-onfo-coin-creator-dead | title: Missing 'Bitcoin Millionaire' and ONFO coin co-creator found dead: Report | date: 2023-06-01

## Возврат в puzzles (2026-10-19, Beam)
- Причина: на адресе эскроу 157dpLJgAAKugukKz8UwBHapM4idyZvnLc остаётся **1.0 BTC (100 000 000 сат)**, unspent с 2021-06; пазл ранее помечен dead-end, но деньги не сняты — требуется повторный поиск решения/ключа в сети.
- Источник проверки: blockstream.info (2026-10-19).

## Поправка к возврату (2026-10-19, Qoder)
- Тип: отрицательный результат / классификация статуса
- Суть: возврат в `puzzles/` отменён, папка снова в `solved/`. Он-чейн: `157dpLJ…` = 100 000 000 сат, spent 0 — приз жив **с 2021-06**, т.е. это не пополнение и не новая стадия (§5). Тупик прежнее: сегменты 6–10 не опубликованы, держатель ключа умер в 2023, готового решения в сети нет.
- Источник: https://blockstream.info/address/157dpLJgAAKugukKz8UwBHapM4idyZvnLc (проверено 19.10.2026)
- Проверено: да (blockstream.info, read-only)
- Влияние на оценку: цель остаётся «сторож», не рабочая; ресурсы не тратить.
- Подробности и хроника: см. LOG.md

## Обновление (2026-10-19, Qoder) — статус «сторож» по решению владельца
- Тип: решение владельца / статус цели
- Суть: по запросу Ильи папка возвращена в `puzzles/` и ведётся как **цель-сторож**: приз `157dpLJgAAKugukKz8UwBHapM4idyZvnLc` = 100 000 000 сат (1,00000000 BTC), жив с 2021-06; рабочих прогонов нет — тупик прежний (сегменты 6–10 не опубликованы, единственный названный держатель ключа умер в 2023).
- Что делает сторож: `python tools/sandbox/monitor.py` следит за балансом, tx_count и OP_RETURN адреса и сам дописывает событие в этот `LOG.md`.
- Условия переоткрытия активной работы: (§5) пополнение/возврат приза, публикация отсутствующих материалов, заявление автора о новой стадии.
- Источник: решение Ильи в сессии 19.10.2026; проверка баланса — https://blockstream.info/api (read-only, 19.10.2026).
- Проверено: да (только чтение он-чейн; транзакций не создавалось).
- Подробности и хроника: см. LOG.md
