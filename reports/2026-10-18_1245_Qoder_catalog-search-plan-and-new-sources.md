# Отчёт прохода: поиск внешних каталогов/репозиториев загадок и доливка в базу новых нерешённых пазлов

- **Дата/время**: 2026-10-18, 12:30–12:50 (локальное), 09:30–09:50 UTC
- **Агент**: Qoder (Qoder Desktop, Windows)
- **Тема запроса пользователя**: «изучи каталог, план поиск каталогов и репо загадок, которых у нас нет в базе,
  и добавление их в базу со всей сопутствующей инфой и ссылками. Только нерешённые загадки»
- **Режим**: ОБОГАЩЕНИЕ (сбор каталогов) + каталогизация новых нерешённых пазлов. Без трат, без трансляций,
  без платных регистраций.Bronи чужих пазлов не нарушались (GSMG под бронью Big Pickle — только ссылка в реестре).

---

## 1. Изучение каталога (что уже есть)

Прочитаны: `AGENT_INSTRUCTIONS.md` (протокол, 8 разделов), `README.md`, `MASTER_CATALOG.md` (Части 1–9, headings 1207 строк),
`puzzles/README.md` (80 слага), `solved/INDEX.md` (27 решённых + 11 закрытых + 14 dead-end),
`puzzles/dead-ends-registry/README.md` (59 отбракованных + 10 дополнений 17.10), `_sources/` (OCP-дампы, dsh-сессия),
`tools/`, `reports/` (16 отчётов), `agents/REGISTRY.md`, `WAKE_QUEUE.md`, `PROPOSALS.md`.

Построен машиночитаемый «Known set» (чтобы дедупликация была фактом, а не памятью):
- скрипт `tools/known_set.py` → `_sources/KNOWN_SET_2026-10-18.json` / `.txt`;
- объём: **928** просканированных файлов, **14 447** уникальных URL, **1 634** URL на github/raw/gitlab/huggingface,
  **78** активных + **52** решённых слегов, ~1 500 нормализованных названий.

Ключевой вывод по покрытию: два главных реестра **слиты полностью** — OCP (49 записей `puzzles.json`,
все slug'и = наши папки) и @agntn/puzzles (50 коллекций из `sitemap.md`, разобраны в 30 папок + Arweave-серия);
каталог privatekeys.pw в статусе «unsolved» даёт ровно 4 позиции — все уже в базе.
То есть «низкие фрукты» кончились: прирост возможен только из источников вне этих трёх реестров.

## 2. План поиска (методика, пригодная для повтора)

**Каналы (в порядке ожидаемой отдачи):**
1. Машиночитаемые реестры (JSON/TypeScript/npm) — сверка адресов, не названий: `tools/external_catalog_diff.py`.
2. GitHub: topic-страницы (`/topics/bitcoin-puzzle`, `/topics/treasure-hunt`) + API `search/repositories` короткими
   запросами (многословные дают 0); HTML-поиск без токена бесполезен (0 результатов).
3. WebSearch по «свежим» признакам: год + «treasure hunt» + «prize» + «unsolved», отдельные заходы на
   BTC/ETH/SOL/AR/ADA/ALGO/LTC/DOGE… и на физические охоты (geogaming, GPS, scavenger).
4. Reddit через Arctic Shift API (по subreddit + after=дата; точечный разбор кандидатов через `/api/posts/ids`).
5. Live-площадки-агрегаторы (btcpuzzle-подобные, SecretScan,Unsolved Hunts, krypto-трекеры) — руками, т.к. API нет.
6. Репо-разборы по уже нашим пазлам (обогащение): ищем `owner/repo` с именем пазла в README.

**Фильтр «только нерешённые» (обязательный, по одному протоколу):**
(а) источник/автор жив; (б) есть публичный адрес или иной оракул → проверка баланса (blockstream / blockcypher /
eth.blockscout / api.mainnet-beta.solana.com); (в) статус «unsolved» по первоисточнику, а не по статье;
(г) отсутствие в `solved/` и `dead-ends-registry`; (д) призовой фонд ≠ 0. Если (б) невыполним — пазл помечается
«ЖДАЩЕЕ/адрес не подтверждён» и в Tier-списки не попадает.

**Дедуп:** совпадение по адресу (нормализованный base58/bech32/0x/addr1) ИЛИ по ≥2 токенам названия из Known set.

**Бюджет/безопасность:** только бесплатные read-only API; GitHub без токена — 60 core/час, 10 search/мин (учтено);
никаких регистраций с оплатой и никаких писем авторам без ОК Ильи.

## 3. Результаты: новые каталоги и репозитории

Полная карта — `_sources/EXTERNAL_CATALOGS_2026-10-18.md` (разделы A «отработано», B «новые каталоги»,
C «репозитории», D «отрицательные результаты», E «регламент обновления»).

Новых источников-каталогов (ранее 0 упоминаний в базе): SecretScan (160 адресов + пул-«join a puzzle»),
Unsolved Hunts (коммерческий каталог живых охот), Gold & Crystal (Ubisoft), Krypto Chase/Skavengerz,
LunarCrush Lunar Vault, Satoshi's Treasure, «8964» (Hung-Hua Tang), MysteriousWritings forum,
BlockHunt (dorahacks), slowmist/awesome-blockchain-bug-bounty, HackenProof, Immunefi,
Alchemy web3-security-competitions, agntn MCP/Playground как канал данных, 17 новых инструментов-перебиралок.

## 4. Добавлено в базу (5 новых досье, все — нерешённые)

| Папка | Что | Приз | Вердикт/риск |
|---|---|---|---|
| `puzzles/gold-crystal-ubisoft-hunt-500k/` | Ubisoft × Unsolved Hunts, 15 загадок, старт 2026-11-09 | $500 000 (физический клад) | вне блокчейна, вход от ~$40 → мониторинг |
| `puzzles/krypto-chase-skavengerz-1m/` | серия по 50 штатам, GPS + шифрподсказки | $5k/квалификация, $1M финал (BTC или cash) | физприсутствие в США, ончейн-оракула нет |
| `puzzles/lunarcrush-lunar-vault-62btc/` | ключ 62 BTC на луноходе MAPP | 62 BTC | адрес не опубликован → баланс не проверялся |
| `puzzles/satoshis-treasure-arg-1m/` | ARG 2019, 11 ключей, часть не вскрыта | ~$1M (≈198 BTC на 2019) | сайт не отвечает (000), адрес приза не подтверждён |
| `puzzles/hunghuatang-8964-btc-puzzle/` | 24 числа → 24 слова seed, релиз 2025-08-25 | BTC (сумма не подтверждена) | Threads недоступен, адрес не найден |

Все 5 содержат: механику, даты, организаторов/авторов, **полный список ссылок-первоисточников**, вердикт по
нашему скоупу, конкретную ось следующего прохода и `LOG.md` с записью сессии (включая негативы).

## 5. Обогащение существующих пазлов (попутно)

- `arweave-puzzle-11-1eth`: внешний репозиторий `consigcody94/ARweave-Puzzle-11` (README сохранён в `data/`),
  **независимая ончейн-верификация 18.10.2026 через eth.blockscout.com: `0xFF2142E98E09b5344994F9bEB9C56C95506B9F17`
  = 1.000000000000000000 ETH (=1.0 ETH),Nonce/tx_count = 0, курс $2 423.3 → приз жив**.
- GSMG: найден `HosterjackAGV/gsmg-5btc-puzzle` (compendium) — запись оставлена в реестре, папка под чужой бронью.
- 1000 BTC: `psamillo/bitcoin-puzzle-research` (разбор мёртвых осей и уроков) и `roadhero/Bitcoin-Puzzle-Info` (статусы) —
  кандидаты в следующий проход для сверки негативов с нашей осью.

## 6. Что НЕ получилось / проверено негативно (не повторять)

См. раздел D реестра: `bitcointalk.org` не резолвится, `3cube-puzzle.io` мёртв/припаркован, `r/CryptoPuzzlers` и
`r/bitcoinpuzzles` пусты за 2026, GitHub HTML-поиск и многословные API-запросы бесполезны, `threads.com` не отдаёт
контент, `keyspace.emrahsayin.com` — fetch failed, OCP/agntn/privatekeys.pw дают 0 новых пазлов.

## 7. Следующие шаги (по убыванию отдачи)

1. **Добить «ЖДАЩИЕ» адреса** (нужен только read-only обход архивов): web.archive.org →
   `satoshistreasure.xyz/k1..k11` и условия LunarCrush → извлечь BTC-адреса → balance-чек → вердикт «актив/мёртв».
2. Threads «8964»: достать посты через архив; если адрес приза появится — проверка баланса.
3. Проход по **CTF/web3-конкурсам 2026** (Alchemy list + Immunefi/HackenProof) с фильтром «есть on-chain escrow и
   пазл-механика» — там могут быть живые 1-5 ETH задачи, отсутствующие в OCP.
4. Мониторинг новых источников раз в 7 дней: `topic:bitcoin-puzzle`, `topic:treasure-hunt`, Arctic Shift after=дата,
   SecretScan/btcpuzzlesearch — по регламенту (раздел E реестра).
5. Регулярная сверка: `python tools/known_set.py && python tools/external_catalog_diff.py agntn && … ocp`.

## 8. Изменения в файлах базы (этот проход)

- создано: `tools/known_set.py`, `tools/external_catalog_diff.py`,
  `_sources/KNOWN_SET_2026-10-18.{json,txt}`, `_sources/EXTERNAL_CATALOGS_2026-10-18.md`,
  `_sources/external_catalogs_2026-10-18/` (дампы: agntn sitemap/collections/authors/llms-full + npm-пакет,
  OCP `puzzles.json`, GitHub search JSON, privatekeys.pw, README внешних репо, PR Krypto Chase),
  5 новых папок пазлов (README + LOG + data).
- обновлено: `puzzles/README.md` (индекс, счётчик), `MASTER_CATALOG.md` (Часть 4 «Каталоги/Инструменты» +
  новая Часть 14), `puzzles/dead-ends-registry/README.md` (дополнение 18.10), `puzzles/arweave-puzzle-11-1eth/`
  (LOG + data), `agents/REGISTRY.md`, `WAKE_QUEUE.md` (отметка прохода).
- **не** опубликовано на GitHub (pulш = действие с внешним эффектом, требует ОК Ильи); коммит — по запросу.

---
## §9 Проход верификации 5 новых досье (18.10, 13:05, Qoder)
Метод: web.archive.org CDX+снимки, Arctic Shift API, валидация base58-чексумм, баланс blockstream.info;
проба живости доменов (curl). Только read-only.

| Досье | Вердикт | Доказательство |
|---|---|---|
| gold-crystal-ubisoft-hunt-500k | активна, нерешена, **off-chain/физическая** ($500k клад, вход ~$40) | goldandcrystal.com/en HTTP 200; ончейн-компоненты нет |
| krypto-chase-skavengerz-1m | активна, нерешена, **off-chain/физическая** (GPS-охота, выплата BTC/cash) | skavengerz.com HTTP 200 |
| lunarcrush-lunar-vault-62btc | нерешена, **off-chain**: адрес приза Nakamoto_1 не публикуется (ключ на ровере); доставка сейфа не подтверждена; Blue Ghost M1 сел 02.03.2025 | hiro_blog.html (архив); firefly/payloadspace; ложный адрес 1BrFBQb… (чексумма fail) |
| satoshis-treasure-arg-1m | **→ solved/defunct**: сайт мёртв; bounty-адрес 1899BGHGR4… баланс 0 (funded=spent=1 020 000 сат); «адреса» в seal.html ложные; фонд физический | blockstream.info; web.archive.org seal.html/hidden; base58-валидация |
| hunghuatang-8964-btc-puzzle | **→ solved**: решён, автор @hunghuatang подтвердил @IndividualOk6204 (0.008964 BTC, 6-bit/XOR) | Arctic Shift r/Bitcoin 1tw7glw + 50 коммент. (data/*.json) |
Итог: из 5 добавленных 3 остаются активными (off-chain-каталожные позиции, нерешены), 2 перенесены в `solved/` —
соблюдён фильтр «только нерешённые». Базовые индексы (puzzles/README, solved/INDEX, root README, Часть 14) обновлены.
