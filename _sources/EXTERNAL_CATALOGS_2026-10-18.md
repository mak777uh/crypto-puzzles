# Реестр внешних каталогов и репозиториев загадок (проход 2026-10-18, агент Qoder)

Назначение: единая карта **источников**, из которых база может пополняться, с пометкой «уже отработано / новое»,
чтобы следующий агент не повторял обход и знал, где ещё искать. Ссылки обязательны (протокол, п.8).

Метод построения: `_sources/KNOWN_SET_2026-10-18.json` (скрипт `tools/known_set.py`: 928 файлов базы →
14 447 уникальных URL, 78+52 слага, 1 634 URL кодовых хостингов) как множество «что уже есть»; далее —
поиск новых источников (WebSearch, GitHub topics/search API, raw.githubusercontent, Arctic Shift, blockscout).

Легенда: **ОТРАБОТАНО** = реестр целиком слит в базу; **НОВОЕ** = источник/пазл, которых 17.10 в базе не было;
**ЖДАЩЕЕ** = требует проверки (адрес/баланс/архив).

## A. Машиночитаемые реестры пазлов (ядро базы)

| Источник | Ссылка | Статус | Что даёт |
|---|---|---|---|
| Open Crypto Puzzles (floflo777) | https://github.com/floflo777/open-crypto-puzzles (`puzzles.json`, 49 записей) | ОТРАБОТАНО | все 49 slugs совпадают с нашими папками; дельт нет (проверено 18.10 сверкой) |
| @agntn/puzzles (TypeScript-реестр) | https://github.com/agntn/puzzles · https://puzzles.agntn.dev · npm `@agntn/puzzles` 0.30.0 | ОТРАБОТАНО | 50 коллекций (`sitemap.md`), разобраны в 30 папок + 4 Arweave; машинные данные: `https://puzzles.agntn.dev/raw/collections/<slug>.md` |
| agntn MCP/Playground | https://puzzles.agntn.dev/mcp · https://puzzles.agntn.dev/playground | НОВОЕ (канал доступа) | те же данные через MCP-инструменты (`get/require/all/solved/unsolved/withPubkey/count/verify/balance`) — удобно для авторазвёртки балансов |
| privatekeys.pw — каталог пазлов | https://privatekeys.pw/puzzles (5 страниц, фильтр `?status=unsolved`) | ОТРАБОТАНО | «Unsolved» = 4 позиции: Zden HALV, BLM 0.2 BTC, GSMG, Wealth in Poetry — все уже в базе |
| btcpuzzle.info | https://btcpuzzle.info/puzzle | ОТРАБОТАНО | трекер 1000 BTC (160 адресов) |
| btcpuzzlesearch.com | https://btcpuzzlesearch.com | ОТРАБОТАНО | 77 открытых призов |
| floflo777/crypto-puzzle-hunt | https://github.com/floflo777/crypto-puzzle-hunt | ОТРАБОТАНО | 32 загадки (предок OCP) |
| itsnex1s/crypto-puzzle-list | https://github.com/itsnex1s/crypto-puzzle-list | ОТРАБОТАНО | упоминается в Части 4 |
| timchurchard/bitcoin-puzzles | https://github.com/timchurchard/bitcoin-puzzles | ОТРАБОТАНО | — |
| needlespace.com/en/puzzle, lotterypzl.org | https://needlespace.com/en/puzzle · https://lotterypzl.org/ | ОТРАБОТАНО (в каталоге) | статусы не перепроверялись 18.10 |

## B. Новые каталоги/площадки (добавлены 18.10.2026)

| Источник | Ссылка | Тип | Вердикт |
|---|---|---|---|
| **SecretScan Bitcoin-puzzle** | https://secretscan.org/Bitcoin_puzzle | трекер 160 адресов + «pool/join a puzzle» (совместный майнинг диапазона) | НОВОЕ (в базе было 0 упоминаний) — полезен как свежий трекер статусов и как индикатор активности пулов |
| **Unsolved Hunts** | https://www.unsolvedhunts.com/ (подтверждается через Ubisoft/polygon-релизы) | коммерческий каталог живых физических охот | НОВОЕ — источник новых «клатовых» пазлов; ончейн-призов не видно |
| **Gold & Crystal** | https://goldandcrystal.com/en | охота Ubisoft × Unsolved Hunts, $500 000, 15 загадок, вход от ~$40, старт 2026-11-09 | НОВОЕ → досье `puzzles/gold-crystal-ubisoft-hunt-500k/` |
| **Krypto Chase / Skavengerz** | https://www.prnewswire.com/news-releases/new-treasure-hunt-series-offers-1-million-grand-prize-302901997.html | серия по 50 штатам США, $5k/квалификация, $1M финал | НОВОЕ → досье `puzzles/krypto-chase-skavengerz-1m/` |
| **LunarCrush Lunar Vault** | https://www.prnewswire.com/news-releases/lunarcrush-to-launch-bitcoin-treasure-hunt-on-lunar-outpost-rover-to-earths-moon-301779515.html | 62 BTC, ключ на луноходе MAPP | НОВОЕ → досье `puzzles/lunarcrush-lunar-vault-62btc/` |
| **Satoshi's Treasure (ARG 2019)** | https://github.com/mingrui/satoshis_treasure · https://satoshistreasure.xyz (не отвечает 18.10) | 11 ключей, ~$1M в BTC | НОВОЕ → досье `puzzles/satoshis-treasure-arg-1m/` (адрес приза не подтверждён) |
| **Hung-Hua Tang «8964»** | https://www.reddit.com/r/Bitcoin/comments/1nc5tt2/ · https://www.threads.com/@hunghuatang | 24 числа → 24 слова seed, BTC-награда (релиз 2025-08-25) | НОВОЕ → досье `puzzles/hunghuatang-8964-btc-puzzle/` (адрес не найден) |
| **MysteriousWritings forum** | https://mysteriouswritings.proboards.com/ | форум некрипто-кладов (Forrest Fenn-тип) | НОВОЕ (справочный, низкий приоритет) |
| **BlockHunt (dorahacks)** | https://dorahacks.io/build/14565 | hackathon-прототип децентрализованной охоты | НОВОЕ, но неактивно — в активные не брать |
| **slowmist/awesome-blockchain-bug-bounty** | https://github.com/slowmist/awesome-blockchain-bug-bounty | каталог bug bounty (смежная категория: Trezor/Fe у нас уже есть) | НОВОЕ как источник; отбор по принципу «пазл, а не аудит» |
| **HackenProof / Immunefi** | https://hackenproof.com/programs · https://immunefi.com/ | платформы наград | НОВОЕ (мониторинг редкий: это работа, не загадки) |
| **Alchemy dapp list: web3 security competitions** | https://www.alchemy.com/dapps/list-of/web3-security-competitions-on-ethereum | список CTF/соревнований 2026 | НОВОЕ (кандидаты в Category «off-chain/jury» — как Puzzleth, Qairos) |

## C. GitHub-репозитории по теме (18.10.2026): что новое и зачем

**Инструменты перебора (не загадки — в Часть 4 «Инструменты»):**
hevnsnt/collider (Kangaroo CUDA/Metal, 29★) · oritwoen/kangaroo (Vulkan/Metal/DX12, 28★) ·
pscamillo/PSCKangaroo (форк RCKangaroo, 28★) · magicsih/bitcoin-puzzle-solver (Rust, 16★) ·
sayine/keyspace-engine (+ трекер https://keyspace.emrahsayin.com — с этой машины fetch не прошёл) ·
lucaamann/btc-puzzle-1000 (CUDA, заявлено 1.53 Гkey/s на RTX 5070 Ti) · Daniel-Wu-1/bitcoin-puzzle-gpu ·
tongriyaotxt/gpu-keyhunt (107 Mkeys/s, «50M-address funded DB») · RyuK-H/OnePiece-Bitcoin ·
forkingfabi/NanoSatoshi-71 (ESP32) · mayanthacreates/btc-puzzle-135 · SittingDuck52/Heuhaufen (дашборд) ·
IndiGuy69/bidirectional-keyspace-scanner · Luanqmata/Puzzle_bitcoin_2k15 · ufodia/Bitcoin-Puzzle-Address-Generator ·
arturfromtheblock/emoji-mapping-tool (инструмент для Phy Challenge) · oritwoen/unsek (фреймворк крипто-исследований).

**Репозитории-разборы по НАШИМ пазлам (обогащение, не новые загадки):**
- `consigcody94/ARweave-Puzzle-11` (2026-09) — независимое подтверждение: `0xFF2142E98E09b5344994F9bEB9C56C95506B9F17`
  = **1.0000 ETH, nonce 0** (наша проверка eth.blockscout.com 18.10.2026 подтвердила), куча стего-осей (zsteg-аудит,
  434 alpha-аномалий, permutations «naval slipway», «skyline rectangles»), Metal-солвер. Копия README:
  `puzzles/arweave-puzzle-11-1eth/data/consigcody94_solver_repo_readme_2026-10-18.md`.
- `HosterjackAGV/gsmg-5btc-puzzle` (2026-09) — «interactive compendium» GSMG; папка GSMG в этот момент под бронью
  Big Pickle, поэтому ссылка зафиксирована здесь и в отчёте, в чужой LOG не писать.
- `beltromatti/5-btc-puzzle` — заметки по одной ветке GSMG (1★).
- `psamillo/bitcoin-puzzle-research` — «Dead ends & lessons learned»: источник **негативных** результатов по 1000 BTC.
- `roadhero/Bitcoin-Puzzle-Info` — статусы по номерам (в т.ч. #69 solved, ключ近 начала диапазона) — уже упоминался в базе,
  теперь имеет смысл как периодический трекер.
- `SmallCakekoo/open-crypto-puzzles` — форк OCP (0★), дубликат, игнорировать.
- `cyberspacepirates/bitcoin-lottery` — «лотерея 6.6 BTC, 66-й пазл»: README 517 байт, по сути идея пула, отдельного приза нет.

## D. Отрицательные результаты обхода (не повторять)
- GitHub HTML-поиск (`/search?type=repositories`) без авторизации отдаёт 0 результатов; topic-страницы работают,
  `/topics/crypto-puzzle` — 404 (есть `/topics/bitcoin-puzzle`).
- API-поиск репозиториев по многословным запросам («bitcoin puzzle list catalog», «seed phrase puzzle bounty»,
  «3cube puzzle», «unsolved puzzles bounty») → total_count = 0. Работают короткие: `topic:treasure-hunt` (146),
  `topic:crypto-puzzle` (2), `crypto puzzle unsolved bounty in:name,description,readme` (33).
- Лимит без токена: 60 core-запросов/час, 10 search-запросов/мин — обход вести пакетом и кэшировать в `_sources/`.
- `bitcointalk.org` с этой машины **не резолвится** (curl exit 6); WebFetch тоже падает. Обход — только через
  зеркала/web.archive.org или готовые дампы (`puzzles/gsmg-io-5btc-puzzle/data/bitcointalk/`).
- Arctic Shift: `r/CryptoPuzzlers` и `r/bitcoinpuzzles` за 2026 год — 0 постов; `r/CryptoCurrency` за 2026 — 100 постов,
  релевантных пазлов — 0 (кроме обсуждений 1000 BTC).
- `3cube-puzzle.io` — не отвечает (000), `www.3cube.io/puzzles` — припаркованный домен Hostinger → серия мертва,
  в базу не добавляем (фиксация негатива).
- `dorahacks.io/build/14565` (BlockHunt) — hackathon-прототип, приз не подтверждён.
- `threads.com` — WebFetch падает («fetch failed»), посты @hunghuatang не получены; нужен web.archive.org.

## E. Как обновлять этот реестр (регламент)
1. `python tools/known_set.py` → обновить множество «что уже есть».
2. `python tools/external_catalog_diff.py agntn` / `ocp` → сверка реестров с базой по адресам и названиям.
3. 4 новых канала на проход: (a) `topic:bitcoin-puzzle` + `topic:treasure-hunt`; (b) WebSearch «<год> new crypto
   treasure hunt prize»; (c) Arctic Shift по `after=<последняя дата>`; (d) blockscout/balance-чек по всем адресам
   из новых досье.
4. Каждый найденный пазл → папка `puzzles/<slug>/` + строка в индекс + строка в Части 14 каталога; отбраковка →
   `puzzles/dead-ends-registry/README.md` с причиной.
