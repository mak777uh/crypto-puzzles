# Передача дел: все биткоин/крипто-загадки системы Ильи

Составлено 14.10.2026, 22:15 МСК. Работа по загадкам в системе Ильи прекращена 14.10 около 22:00, теперь их ведут другие агенты.

**Источники этого отчёта.** Журналы `NOTES.md`, `HYPOTHESES.md`, `tested.md`, `BRIEF.md`, `RULES.md`, `GRAPH.md`, `QUEUE.md` в `/workspace/work/<пазл>/`, а также:
- `/workspace/work/puzzle-inventory-2026-10-12.md`;
- `/workspace/work/pc_handoff/PC_AGENT_TASKS.md`;
- `/workspace/work/hunt/SOURCES.md`;
- `/workspace/projects/0f761e1e-…/coord/TOOLS.md` и `STATE.md`;
- выводы из лога ПК-агента `/workspace/projects/4dde0eb3-…/files/pc_agent_log_2026-10-14.md`.

**Балансы** перепроверены 14.10.2026 в 22:05–22:10 МСК:
- BTC: `mempool.space/api/address/<addr>`;
- LTC: blockcypher;
- SOL: `api.mainnet-beta.solana.com` (`getBalance`);
- ETH: `ethereum-rpc.publicnode.com` (`eth_getBalance`, `eth_getTransactionCount`);
- AR: `arweave.net/wallet/<addr>/balance`;
- GRS: chainz.cryptoid.info.

Сырой вывод лежит в `/workspace/work/pc_handoff/bal_2026-10-14.txt`, скрипт для повторной проверки — `/workspace/work/pc_handoff/bal.py` (`python3 bal.py`).

**Правила безопасности, которых держалась система.**
- Seed-фразы, WIF и приватные ключи пишутся только в `.secret/` (chmod 600) и нигде не печатаются. В этом отчёте их нет, папки `.secret/` не открывались.
- Никаких трат без явного согласия Ильи: платных подсказок, покупки книг, взносов.
- Никаких публикаций и писем авторам или решателям от имени Ильи. По SLM 14.10 18:46 Илья прямо запретил писать решателям.
- При совпадении весь баланс сразу выводился на BTC-адрес Ильи `bc1q4kgn8aj6j29j3zj9pfm4khcsx4hj7smkncz78a`, комиссия бралась из приза и ставилась повыше из-за гонки. Сейчас на этом адресе 0. Другие выплатные адреса Ильи: LTC `ltc1qkekjqn9yl0h5quwy42p7zqjuz3t4dmfarx8wtq`, EVM `0x724F6B03E8B1a5a4AE39082Ced21E88b9780125e`, SOL `3o15Gt7YLWDVEyS53UuJNJcYdyoaLNQx6hRsLCdyv4V9`. Пользоваться ими новые агенты могут только при отдельной договорённости с Ильёй.

**Каталог-первоисточник** почти для всех пазлов — floflo777/open-crypto-puzzles (OCP): https://github.com/floflo777/open-crypto-puzzles. Локальный клон: `/workspace/work/open-crypto-puzzles/`, последний коммит 2026-10-11. В каждой папке пазла есть `README.md`, `analysis/tested.md` (реестр негативов), `analysis/leads.md`, `clues/` и `tools/oracle.py`.

---

## 0. Сводная таблица

Статусы: **живой** — приз на месте и есть открытые гипотезы; **тупик** — приз на месте, но по нашему вердикту без новой информации не решается; **забран** — денег на адресе нет. Курс для оценки — около $82–83 тыс. за BTC (по инвентарю от 12.10).

| # | Загадка | Приз (14.10 22:05) | Адрес | Статус | Главный следующий шаг | Ресурсы и объём |
|---|---|---|---|---|---|---|
| 1 | BLM «Brave New World» | 0,20107284 BTC | `1KfZGvwZxsvSmemoCmEV75uqcNzYBHjkHZ` | **живой** | H2 (21 слово) дожать: h2_02_world и куски 03–14; затем H3 (24 слова) | H2: ~1,2·10⁷ (CPU-часы / GPU-минуты); H3: ~2·10¹⁰ (GPU ~сутки на 3070) |
| 2 | Trithemius «Securing Wealth in Poetry» | 0,03124630 BTC | `1K4ezpLybootYF23TM4a8Y4NyP7auysnRo` | **живой** (близок к вердикту) | Добить полный перебор BIP39×GPS: V16 ~234 из 467 единиц, V0 ~279 сдвигов | ~6–7·10⁸ всех BIP39-последовательностей; ~1 ч на 16 ядрах, ~80 сессий в песочнице |
| 3 | Genesis Block Wallet | 878 140 сат (растёт) | `bc1qfkhx02v89u2qyyyljeczw6hu9sr437y44t7ae5yf09thrdukfqesnjg2wj` | **живой**, слабый | Relaxed-перебор (68 пар / 612 форм) и satvar; следить за новыми OP_RETURN автора | 7,83·10⁷ (relaxed, ~9 ч на 16 ядрах) + ~1,6·10⁷ (satvar), CPU |
| 4 | Smith, Lyle & Moore Hunt #2 «Glimmer» | 0,03177700 BTC | `bc1q0akdjvrc2csau2n3gyxa3xcq0fss852x997m9y` | **живой**, упёрся в замок | Открыть замок h7j3h (a-rocky-beach): за ним слово 10 и далее | Wix-оракул ~0,5–1 проверка/с; офлайн-сид ~800–1250/с на ядро |
| 5 | Oobit 139 (bitcoinpuzzles.io) | 0,01545000 BTC | `1KKtnqLdK17ndRRwF8zaKZH6FSkSmTN6fk` | тупик (без платной подсказки) | Новая модель распределения слов (не «2 на клип»); найти, что значит «[1]+3» | 4 порядка + свободный порядок уже 0; дальше минуты CPU |
| 6 | Quizchain Real Big Block (Aoi Nakamoto) | 0,77700000 BTC | `14zMkTgaVXJcxdh4JdWi29MLRR44iUSG9W` | **тупик** (вердикт 14.10) | Только инсайт: правило флипов Grycoin-2 или новые слова автора | Наши ~1,1·10¹⁰ MD5 + ~3,2·10⁸ у OCP, всё 0 |
| 7 | Нуаза / bitcoin.fr «Chasse au trésor» | 0,20240000 BTC | `bc1q8zfy6wvvtskzkg4s343x42pyf363nmejspgc02` | тупик без книги | Купить книгу (€8,99–10, нужно согласие Ильи) или взять в библиотеке, выписать слова картинок | Оракул 64 бита без деривации, ~10⁹ за минуты |
| 8 | kTimesG Phy Challenge | 0,00800000 BTC | `bc1qrpn28qa82uyjg37dvsz3w7wpm3kpdea957nm9p` | тупик (пауза до подсказки автора) | Нужна новая трактовка картинки (k или d из эмодзи-спирали) | Оракул — одно скалярное умножение; проверено ~10⁷ значений + 4,4·10¹² рациональных пар |
| 9 | Solana Puzzles #4 | 0,834 SOL | `DmDBmb7AEm6xRxkoBYq1mJYqsZP263gmXB53zA2dqjne` | тупик (пауза до нового сигнала) | Зафиксировать 2–3 слова из текста или подтвердить Σ=13058 | ~2·10⁷ деривизаций уже 0; ~2k/с на 2 ядрах |
| 10 | Path to Greatness | 3,02608794 LTC | `LUtL7qnm3gzxKjHcfVLSjydqhhinTVmTmS` | живой, тяжёлый | Lock 1: как 15 нот дают 16 символов (beach); locks 2–4 по INSIGHTS.md | AES-оракул ~3,2·10⁶ ключей/с на ядро; уже ≥10¹⁰ у нас и 5,7·10¹² у OCP |
| 11 | Arweave #3 / #10 (+#11) | 1000,166 AR / 500,022 AR / 1,0 ETH | см. раздел 15 | живой, медленный | Новый авторский сигнал; KDF дорогой (~20 кандидатов/с на ядро) | CPU/GPU (у ПК-агента есть сертифицированный OpenCL-решатель) |
| 12 | RushWallet #30 | 0,01000000 BTC | `13Q8hJqagtd77ojTJcEZPjTz2sBFSsYxyj` | **тупик** (до нового медиа) | Найти видео выше 720p и прочитать лист в руке Дмитрия (~1:00) | ~4·10⁶ наших + ~5,5·10⁸ OCP, всё 0 |
| 13 | «Riddle for 8.5 BTC» (commanderu) | 99 081 сат | `1KDUcZh5Z6H1of4Pwoy5ojJtkQxcQBHhnH` | **тупик**, мелкий | Части 2/3/5/6 WIF только перебором (запрещён), приз ~$80 | — |
| 14 | Bitcoin Coders Puzzle 07 | 21 000 сат | `bc1qj7xsxrlgmnnrqwvlakacc5yrh33h2n3xaa0m09` | пауза, мелкий | Собрать 12 комикс-панелей из плиток 32×32, затем 12 слов | CPU, jigsaw-сборка |
| 15 | Bitaps Shamir SSS | 1,00016775 BTC | `bc1qyjwa0tf0en4x09magpuwmt2smpsrlaxwn85lh6` | **тупик** (≥2¹¹⁹) | Только третья доля или некриптостойкая генерация мнемоники | невыполнимо |
| 16 | LuckyLurker Vault #2 | 1,00000000 BTC | `bc1qnepv9pcnqvndux9h9mcaxvk6u993rc0lew9fpp` | отложен автором | Ждать перезапуска и подсказок (подписка на рассылку оформлена) | 0 до подсказок |
| — | Неначатые и кандидаты (GSMG, Ballet, Guntis, Fe, Groestlcoin и др.) | см. раздел 17 | — | — | — | — |

---

## 1. BLM «Brave New World» — 0,20107284 BTC

- **Адрес:** `1KfZGvwZxsvSmemoCmEV75uqcNzYBHjkHZ` (P2PKH). 14.10 22:05: 20 107 284 сат, 5 входящих tx, трат 0.
- **Источники.**
  - Репозиторий сообщества: https://github.com/jmr2704/bitcoin-0.2-image-puzzle. README и таблица позиций; копия — `/workspace/work/blm/repo_README.md`.
  - OCP: `1-big-prizes/blm-brave-new-world-0-2btc`. Копия в `/workspace/work/blm/ocp/`: `README.md`, `analysis/tested.md`, `analysis/leads.md`, `clues/welcome-to-the-brave-new-world.png` (1600×1200 — максимальное разрешение, другого нет), `clues/author-posts.md`, `tools/oracle.py`.
- **Механизм** (README): «You will need to guess the: Words to use. Correct order of the words. Correct length.» Это BIP39 (или old-Electrum v1, не установлено). Сообщество записывает слова как «число → BIP39[число−1]»; все 43 пары из README сходятся (проверка ПК-агента Ильи).
- **Подсказки** (руны решены сообществом):
  - правая колонка: «ЗДЕСЬ ЗАШИФРОВАНЫ БИТКОИНЫ НА ЧЁРНЫЙ ДЕНЬ НОМЕР Х»;
  - ещё две руны: «Я надеюсь, что сюда будут присылать много биткоинов» и **«Сумма двух чисел»**;
  - над Трампом — TUESDAY (шифр Gravity Falls). Это 3 ноября 2020 = 11.03.20, день выборов.
- **Правило «сумма двух чисел» на циферблате.** Циферблат зеркальный, смотреть на `dial2x.png`:
  - красная стрелка MOON стоит между 12 и 1 → позиция 13;
  - длинная TOWER между 1 и 2 → 3;
  - короткая часовая между 10 и 11 → 21.

  OCP независимо намерил стрелки на 0,54 и 1,48 ч. Отсюда длина фразы ≥21, вероятнее 24.
- **Каркас позиций** (таблица сообщества плюс правило сумм):

  | Позиция | Слово | Откуда |
  |---|---|---|
  | 1 | subject | Section 1 |
  | 2 | camera или twin | — |
  | 3 | tower | часы 1+2 |
  | 4 | mask | — |
  | 5 | police | — |
  | 6 | ? | — |
  | 7 | liberty | 7 лучей короны |
  | 8 | ? | — |
  | 9 | eye | пирамида 4+5 |
  | 10 | black | «номер X» = 10 |
  | 11 | pyramid | 5+6 |
  | 12 | vote или debate | «.vs.» зеркально = 12 |
  | 13 | moon | 12+1 |
  | 14, 15 | ? | — |
  | 16 | rifle | M16 |
  | 17 | gold | 17 лет графика |
  | 18 | ? | — |
  | 19 | glove | CVD19 |
  | 20 | apple или second | XX у Леопольда |
  | 21 | часовая стрелка, слово неизвестно | 10+11 |
  | 22–23 | ? | — |
  | 24 | checksum | — |

  **Пул-15 для пустых слотов:** welcome brave world peace end one more real order proof first food time stock power.

  Прочее на картинке:
  - под циферблатом строка рун из 3 слов через «:» — не расшифрована;
  - на печати зеркальные латинские девизы: …NOSCERE…, FIAT JUSTITIA ET PEREAT MUNDUS, …UBI PATRIA;
  - опечатки микротекста whitepaper: wich, proot, introdue, participans, doudle, sing, abcense, arrrived.
- **Проверено, не повторять** (у всех ниже 0 совпадений):
  - OCP: ~7,2·10⁹ BIP39-последовательностей. Все 12-из-13 и все порядки пула `moon tower real black subject time first food this proof order receive mask` (6,23·10⁹, GPU, путь m/44'/0'/0'/0/0). Плюс ~3·10⁷ old-Electrum v1. Стего, EXIF, LSB чисто. Якоря tower/subject/time/real отозваны.
  - ПК Ильи: наборы A и B (транспаранты + заголовок + часы / инструкция), все порядки. 12 слов old-Electrum в порядке чтения (2 275). sweep24: 12 разных из пула-17, все порядки, только сжатый ключ, m/44'/0'/0'/0/0 — долгий слепой прогон на 3070.
  - Наши сессии:

    | Гипотеза | Что перебиралось | Объём |
    |---|---|---|
    | Каркас как 12 слов | позиции 1–12, слоты 6 и 8 — все 2048 слов | 785 299 валидных фраз × 5 путей × comp/uncomp |
    | **H1** | 18 слов: 1–5, 7, 9–13, 16, 17; слоты 6, 8, 14, 15 из пула-15; 18-е по checksum | 1 620 000 |
    | **H11** | «WELCOME TO THE» = 12 строк whitepaper, по слову из строки по порядку | 256 → 22 валидных |
    | **H2**, куски h2_00_welcome и h2_01_brave | 21 слово | 1 620 000 каждый, DONE |
    | **H2**, кусок h2_02_world | 21 слово | на 720 000 (`tools/h2_02_world.json.prog`) |

    Пути: m/44'/0'/0'/0/0, m/0/0, m/0'/0/0, m/49', m/84' (по hash160), сжатый и несжатый ключ.
- **Открытые гипотезы и что делать:**
  1. **H2** до конца: куски `tools/h2_02…h2_14_*.json` (слот 6 = welcome…power), всего 15⁵×16 ≈ 1,2·10⁷. Раннер: `python3 tools/run.py tools/h2_NN_x.json` — возобновляемый, прогресс в `.prog`, сам останавливается через ~1050 с.
  2. **H4:** варианты camera↔twin, vote↔debate, apple↔second (×8).
  3. **H3:** 24 слова, слоты 6, 8, 14, 15, 18, 21, 22, 23 из пула-15, 24-е по checksum ≈ 2·10¹⁰. Это для GPU, ~29 ч при 192 тыс./с.
  4. **H5:** BIP39-passphrase для лучших кандидатов: TUESDAY, BLM, 10:07, CVD19, 05.25.20.
  5. **H6:** black на 20, second на 10.
  6. **H8–H10:** опечатки и цветные слова микротекста; строка рун под циферблатом.
- **Файлы:**
  - `/workspace/work/blm/`: `NOTES.md` (журнал и очередь H1–H11), `HANDOVER_ilya_2026-10-14.md` (передача ПК-агента Ильи: окружение RTX 3070 / NVRTC, опровергнутое), `FOR_OPENCODE.md` (канал Hark → OpenCode), `dial2x.png`, `crops/`, `runes/`;
  - `tools/`: `fastcheck.py` (слоты в JSON: слово, список или «*»; checksum-отсев), `run.py`, `fc18.py`, `h18.json`, `h2_*.json`, `h11.py`;
  - оракул OCP: `ocp/tools/oracle.py --selftest`.
  - Задача сессий: 1a204712 (20 мин), проект 233a2ae6.

## 2. Trithemius «Securing Wealth in Poetry» — 0,03124630 BTC

- **Адрес:** `1K4ezpLybootYF23TM4a8Y4NyP7auysnRo` (P2PKH). 14.10: 3 124 630 сат, 2 входящих tx (финансирование 0a9ddd15… от 10.02.2019 и докидка b3c9d8cc… от 08.04.2019), трат 0.
- **Источники:**
  - статья на Medium/Coinmonks от 11.02.2019, автор OneSourGrape (@Trithemius). Копия первого дня (Wayback 20190211203952) — `article.txt`, JSON абзацев — `fresh/paragraphs_20190211.json`;
  - OCP: `2-mid-prizes/wealth-in-poetry-0-03btc`, также `/workspace/work/multichain/oldforums/unsolved-crypto-puzzles/puzzles/trithemius-wealth-in-poetry/` (diploux);
  - HomelessPhD (`hp/`), privatekeys.pw;
  - дамп 94 ответов под статьёй: `/workspace/web/notes/de339428-…/medium-trithemius-…/findings.md`. Ответов автора нет ни одного. Заявление Niroice о том, что приз забран, ложно: он перепутал адрес.
- **Механизм автора:** 12 слов BIP39 выбираются по позициям токенов в тексте.
  - (a) «Story & phone number»: цифры 2–3 телефонов дают возрастающие позиции.
  - (b) «Letter & GPS»: **pos_i = 10·i + digit_i** (i = 0…11), где digit_i — цифры координат лендмарка из сюжета. Пример автора по (b) даёт валидную BIP39-фразу; свидетель — в `oracle.py`.
  - Автор пишет, что номера записаны «на другой странице», так что ключ может быть вообще не опубликован.
- **Подсказки и наблюдения:**
  - шапка статьи — фото «Flock of birds» (Barth Bailey, Unsplash 5_bAKRGvkq8), это Middle Creek WMA;
  - «Zimbabwe» и «Venezuela» выделены просто потому, что это гиперссылки на BBC, а не авторский акцент;
  - стего в картинках не найдено;
  - пример 1 из статьи (телефоны) нерабочий: слово №113 = «a».
- **Проверено** (всё 0; полный журнал — `HYPOTHESES.md`):
  - города мира с населением ≥200 тыс. (3101), окрестности ±0,1°, порядки lat-lon и lon-lat;
  - DMS-координаты 14 лендмарков в 6 форматах; Qingdao, Тайвань, Канада, Каракас, Middle Creek WMA (6,8 млн);
  - нулевой шифр (74 потока), ye-ye, числительные, канал выделений (125 970);
  - 16 токенизаций и 32 варианта носителя;
  - якоря абзацев: 1,19·10⁸ всех BIP39 / 4,95·10⁶ checksum;
  - BIP39-passphrase (15 слов) на кандидатах;
  - **Electrum 2.x standard × полное GPS-перечисление — закрыто на обоих носителях** (VARS3[0] и VARS3[16]).
- **Главный вывод «свежего взгляда».** Правило (b) перечислимо целиком, без знания лендмарка: ~8,4·10⁸ всех BIP39-последовательностей и ~5,3·10⁷ с валидным checksum на носитель. Все прошлые прогоны по городам — его подмножество.
- **Остаток (на момент передачи):**
  - носитель VARS3[16]: `s27_bip39.py 16 <сек>`, единицы «сдвиг × первое слово», прогресс в `s27_16.units` (в файле 233 строки из 467; последняя запись журнала — «осталось ≈254»);
  - носитель VARS3[0]: `s26_bip39.py 0 <сек>`, прогресс `s26_0.done`, осталось ≈279 сдвигов;
  - в песочнице это ~470 проверок/с, на 16 ядрах около часа. Нужен `pip install coincurve`: пакет регулярно пропадает.
- **Вердикт, если везде 0:** правило (b) на опубликованном тексте не работает. Остаётся правило (a) с телефонами вне статьи, а это без автора нерешаемо.
- **Файлы:** `/workspace/work/trithemius/`:
  - `oracle.py` (сертифицирован на abandon…about → 1LqBGS…), `electrum_oracle.py`;
  - `gps_engine.py`, `gps2.py`, `carrier.py`, `carrier2.py`, `carrier3.py`;
  - `s26_bip39.py`, `s27_bip39.py`, `fv_*.py`, `geo/` (cities15000, pkl-кандидаты);
  - `HYPOTHESES.md`, `NOTES.md`.
  - Задача 3034aaca, проект de339428.

## 3. Genesis Block Wallet — 878 140 сат (растёт)

- **Эскроу:** `bc1qfkhx02v89u2qyyyljeczw6hu9sr437y44t7ae5yf09thrdukfqesnjg2wj` (2-of-2 P2WSH). 14.10 22:05: 103 tx, 878 140 сат, трат 0. Приз растёт за счёт платных вопросов автору.
- **Источники:**
  - анонс в блоке 963629 (22.08.2026); вопросы и ответы — в OP_RETURN транзакций на эскроу, расшифровка в `/workspace/work/genesis/opreturn_dialog.txt`;
  - X: https://x.com/glxyresearch/status/2091729030160507360;
  - пресса: https://crypto.news/bitcoin-puzzle-hides-wallet-key-in-genesis-block-data/ (не прочитано — fetch падал; подсказок сверх OP_RETURN не ожидается);
  - OCP: `3-small-prizes/genesis-block-wallet-puzzle-142ksats`.
- **Подтверждённый пайплайн.** Непрерывный срез 570-символьного hex raw-блока генезиса: одна строка без переводов (`tr -d '\n'`), lowercase или UPPERCASE, чётная длина ≥66 — это 64 009 срезов. Далее SHA-256 текста → первые 32 hex = энтропия → BIP39, 12 слов → passphrase → отпечаток мастер-ключа. Тест-вектор автора: `00000019d6689c08` + «Test Example» → первое слово host, отпечаток b7f4182b.
- **Цели:** косайнеры A = `0852014c`, B = `040e2791`, ключи m/48'/0'/X'/2' (account = данные генезиса). Пароль у обоих одинаковый.
- **Подсказки автора.** Ниже ответы автора; в скобках — вопрос участника, на который он отвечал.
  - Скрипт — multisig, 2 ключа, оба обязательны.
  - (Вопрос: оба ключа из одного поля генезиса и функция — хэш?) «Yes, both keys use the same Genesis field, and there is no hash.» При этом сам пайплайн использует SHA-256 текста как 128-битный digest — автор так и подтвердил: «It's a 128-bit digest».
  - «root = master key from BIP39 seed; genesis_data = BIP48 account».
  - BIP39: 12 слов, passphrase есть.
  - Passphrase: «Who received the first transaction?» — это имя.
  - «Try all four forms: binary, hex, decimal, ASCII».
  - «Send 50k sats and I'll reveal the public keys».
  - По форме passphrase: ровно два слова через один пробел, каждое — given name или surname получателя. Слово 1 строго короче слова 2, трёхбуквенных слов нет.
  - Команда `tr -d '\n'` (#971322).
  - P.S. со ссылкой на YouTube в вопросе #969987 — это P.S. автора вопроса, а не автора пазла.
- **Проверено (0 против A и B, ~1·10⁸ кандидатов, оба регистра текста, сверено до единицы):**
  - Satoshi Nakamoto в 9 и 16 регистрах, с переводом строки и без, с пробелами, multiline-модель (305 тыс.);
  - перевёрнутые байты FP;
  - Hal, Harold, Thomas, Finney: все пары × 9 регистров (core4, 144 формы);
  - уменьшительные harry/tommy/thom/finn: 16 пар, 18,4 млн, сертифицировано;
  - 24 доп. пары, 27,65 млн: fran finney, dorian nakamoto, laszlo hanyecz, gavin andresen и др.;
  - jeremy sturdivant (оба регистра);
  - new3: dustin trammell, jercos sturdivant, malmi martti (lower и upper).
- **Стена.** Форма, подтверждённая автором, исключает любое имя Хэла (Hal — 3 буквы, Harold/Thomas/Finney — по 6). Скорее всего, «получатель» — не Хэл, либо ответы о форме неточны.
- **Что дожимать:**
  1. **relaxed**: 68 пар, нарушающих форму, × 9 регистров = 612 форм (Tom, Fin, реверсы вроде «harold harry»), 78 347 016 кандидатов, ~9 ч на 16 ядрах (у ПК-агента есть `sweep.mjs`).
  2. **satvar**: 255 вариантов написания Satoshi Nakamoto, `pp_sat_variants.json`. lower идёт: `state/satvar_lower.progress` = 2000/64009. upper не начат.
  3. Платный вопрос автору — 5k сат дали ответ `tr`. Это трата, только с согласия Ильи.
  4. Следить за tx_count > 103: ответы автора на чужие вопросы — бесплатные подсказки.
- **Файлы:** `/workspace/work/genesis/`:
  - `core.py` (оракул, самотест host/b7f4182b; ~1 230 кандидатов/с на ядро);
  - `sweep2.py` (возобновляемый: `python3 sweep2.py JOB PP CASE LO 64009 780`), `QUEUE.md`, `tested.md`, `state/`;
  - `block.hex`, `pp_*.json`, `opreturn_dialog.txt`.
  - Задача a8e1265d.

## 4. Smith, Lyle & Moore Hunt #2 «Glimmer» — 0,03177700 BTC

- **Адрес:** `bc1q0akdjvrc2csau2n3gyxa3xcq0fss852x997m9y`. 14.10: 3 177 700 сат, трат 0.
- **Формат:** BIP39, 12 слов + passphrase, BIP84 m/84'/0'/0'/0/0.
  - xpub: `xpub6CpNc58zqQvNGPHDGGTr68wgrmtfFDBWRuSDAxoDdrCE1iRAaZtyAD5T9uCJ3ELUYKCkx8Jkind2kwoR3Uxmg1ycQ6DWyGxZBMFvQqhNqVC`;
  - depth 3, адрес приза = xpub/0/0, parent fingerprint 9e948e49 — его можно использовать для быстрой сверки.
- **Источники:**
  - сайт smithlylemoore.com (Wix; metaSiteId 13cab6fc-e004-4514-aab0-a7cf702047f9, siteId b8aa9fe0-61db-4696-8909-9dd877606aa4, rev 4);
  - OCP: `2-mid-prizes/smith-lyle-moore-hunt-2-0-032btc` (копия `slm/ocp/`);
  - r/smithlylemoore: wojppy (Second Treasure Hunt Discussion), w8pwag;
  - Reddit напрямую отдаёт 403 — читать через Arctic Shift: `https://arctic-shift.photon-reddit.com/api/comments/search?subreddit=smithlylemoore&limit=100&sort=desc`, `/api/comments/tree?link_id=t3_wojppy&limit=500` (curl, параметр `before=YYYY-MM-DDTHH:MM:SS`);
  - отчёт решателей от 26.08.2026: `findings.txt`;
  - agntn: puzzles.agntn.dev/collections/smith-lyle-moore.
  - Hunt #1 решён в 2021 году, решение опубликовано: puzzles.agntn.dev/…/born-to-be-wild.
- **Главный инструмент — оракул паролей Wix.** `POST https://site-pages.wix.com/_api/wix-public-html-info-webapp/resolve_protected_page_urls?siteRevision=4`, тело `{"password","pageId","metaSiteId","siteId"}`. Ответ 200 = пароль верный, 403 = неверный, иное = rate-limit. Запросы только последовательно, пауза 1,2–1,5 с, ~0,4–0,75 проверки/с. Код: `wix.py`, `g.py PAGE pw…`, `gl.py PAGE LISTFILE`, `runl.py` (пропускает проверенное), лог `guesslog.txt`.
- **Открыто 46 из 57 страниц.** Все пароли — в `pwmap.json`, правила автора — в `RULES.md`:
  - ответ пишется строчными и слитно;
  - имена — Title Case;
  - числа цифрами;
  - песни SLM как ответы;
  - бутылки — 4-буквенные префиксы слов;
  - GPS-EXIF картинки → «градусы+минуты+секунды(3 знака)»: oq7la = 27756932, ml7yd = 73511573;
  - копии страниц наследуют пароль оригинала (rtf05 = north64).

  Ключевые пароли: c2ozw = discoverglimmer (15 ASCII-байт в 120 «слотах» вспышек видео pxsqo), wt1jy = «pirate bay» (с пробелом), xtb6t = amphitrite, sm18u = youshallpass47 (семафор).
- **Найденные слова seed (бутылки):**
  - East sm18u: 1–4 «when you depart find», 5 «mystery»;
  - c2ozw: таблички «5 6 7 8 / discover music need love»;
  - North mwfaz: «hunt gather whale blood»;
  - West wt1jy: «ship hunt shallow parrot».

  Реддит: «слово 10 выдаётся, 9 и 12 — нет», «last two key words are given», «есть замены для нескольких слов». Кит и пиратская бутылка, вероятно, обманки или замены. «Your ticket is word11 word12» = «virtual moon» — это Hunt #1, к Glimmer не относится.
- **Закрытые замки** (подробно в `GRAPH.md`):
  - **h7j3h** «a-rocky-beach»: подсказка «where will you find her?», текст «Land in the distance… closer to her». Проверено ~5300 вариантов. По реддиту «ответ несложный, главное — написать правильно».
  - **gkfxt** /glimmer (~330 вариантов): создан через 7 мин после h7j3h, вероятно его копия с тем же паролем.
  - **y6cd1** pirate-battle (~950): EXIF «nope lol», вероятно троллинг.
  - **a/b/c/d** = y756h, leklh, xjnxo, vy58x (гипотеза key-check, ~300).
  - **fibyo/tt6yc** vampire (~344) — никто из решателей их не открыл.
  - **sodpq** — Hunt #1; **jbuh5** — не парольная страница.
- **Офлайн-проверки seed** (0 совпадений):
  - run1–run5: 490 валидных порядков цепочек × ~5000 слов;
  - естественный порядок 12 «бутылочных» слов (валиден по checksum) × pp2/pp3/pp4/pp5/pp6/pp8 (21k–215k пассфраз из текстов всех релизов SLM, мифологии, чисел);
  - valid_drop (13 минус одно);
  - замена одного слова на любое (1,14 млн);
  - «virtual moon» как 11–12 (52 987 × 15);
  - run14 (8 слов + 4 из пула, 154 × 498);
  - **run15**: 1–8 из бутылок + 9–12 из пула-30, 50 499 валидных × 8 пассфраз.
- **Дальше:**
  - только h7j3h новыми структурными идеями, а не словарями: за ним по реддиту слово 10;
  - Arctic Shift раз в цикл — новее 08.10 ничего не было;
  - пространство «9 и 12 из всех 2048 + 10–11 из пула» ≈ 2,4·10⁸ ≈ 80 ч CPU — только на ПК или GPU и при сильном обосновании;
  - внешний контакт с решателями Илья запретил.
- **Файлы:** `/workspace/work/slm/`:
  - `NOTES.md` (94 КБ), `RULES.md`, `GRAPH.md`, `pwmap.json`, `pages/*.json`, `pub/`, `txt.py`;
  - `seedsearch.py` (PBKDF2+BIP84, ~3 мс), `run*.py`, `lists/` (pp*.txt, h7_*.txt), `logs/`, `lyr/` (тексты песен), `img/`, `reddit*`.
  - Задача 9e23b25d.

## 5. Oobit 139 (bitcoinpuzzles.io) — 0,01545 BTC

- **Адрес:** `1KKtnqLdK17ndRRwF8zaKZH6FSkSmTN6fk`, путь m/44'/0'/0'/0/0, P2PKH. 14.10: 1 545 000 сат, 2 входящих tx, трат 0.
- **Источник:** https://bitcoinpuzzles.io/en/puzzles/139 «Super challenge Oobit 12 words». Автор Mestre Caçatal, 02.06.2026. Описание: «Oobit Challenge [1]+3». Платная подсказка 1 (~4588 CB, около $1,8) — Илья отказался покупать 14.10 15:21, повторно не предлагать.
- **Почерк автора.** Решённые #100 и #138 (оба решил Pasaribu Halomuan) устроены как 3 картинки × 4 слова. Слова брались из объектов картинки, его видео, прошлых пазлов (venture, oxygen, similar повторяются) и названий в Discord.
- **Найдено в картинке `p139.png`** (2752×1536):
  1. Внизу текст «7DEcPmhijrU» — это YouTube ID unlisted-клипа «Desafio Oobit» на канале @CortesdaCacatolandia.
  2. На панцире иврит «פטריה» = «гриб», то есть **mushroom** (высокая уверенность).
  3. В небе цифры 201025109820650999. Прочтения как Discord/Twitter/Pinterest-ID, как ключ и как индексы — ничего не дали.
- **6 клипов «Desafio Oobit»** (по 5–6 с), по датам загрузки:
  - 7DEcPmhijrU (12.07): слон + ржавый каменный диск, камень Яп;
  - qrvocJCSc4Q (12.07): черепаха + койот с костью;
  - bshCjlr5bdI (15.07): атлет поднимает бетонную плиту;
  - NagGwROg-lM (27.07): олень и белый гриб;
  - uxLjx32vTL0 (31.07): волк или койот в туманной пустыне;
  - V0E8p9wreD4 (02.08): чёрная пантера на каменной стене.

  Надёжные слова: mushroom, elephant, deer, tortoise, coyote; кандидаты — bone, slab, stone. Комментарии под клипами — филлер; @phantompharaohrp написал «...<.dev--->», смысл не найден.
- **Проверено (0):** «2 слова на клип» в 4 фиксированных порядках (asc_ET, asc_TE, desc_ET, desc_TE — по ~40 820 наборов, ~163 тыс. проверок каждый). Плюс free1: свободный порядок клипов, 720×, 72 набора, 206 928 проверок. **В PC_AGENT_TASKS.md desc_TE указан как остаток — это устарело: он закрыт 14.10 17:20.**
- **Дальше:**
  - схема «2 на клип» не подтверждена;
  - нужна другая модель: 1 слово с клипа + 6 с главной картинки, либо разбор «[1]+3»;
  - свежие комментарии на сайте;
  - 12! перебирать без сужения не нужно: при точном наборе слов это ~3·10⁷ PBKDF2, часы CPU.
- **Файлы:** `/workspace/work/oobit139/`: `BRIEF.md`, `NOTES.md`, `pairsearch.py` (`--fixed-order`), `oracle.py`, `hyp_*.json`, `pairs_*.log`, `clips/`, кропы. Задача 24a0db5d, проект 1ae68e05.

## 6. Quizchain Real Big Block (Aoi Nakamoto) — 0,777 BTC

- **Адрес:** `14zMkTgaVXJcxdh4JdWi29MLRR44iUSG9W`. 14.10: 77 700 000 сат, трат 0. Старый адрес до перехеширования — `1EFojcAo2vbhRGCGCa7q8Wwvzss28mhQYC` (пуст), годится как второй оракул «старой» версии текста.
- **Источники:**
  - глава Wattpad https://www.wattpad.com/720888559-second, история 184148284 «Second», описание «Hint for block 77». Сохранено: `second_api.html` (API apiv2/storytext?id=720888559), `second_plain.txt`, все 34 части в `parts/`;
  - r/Grycoin и r/bitcoinpuzzles через Arctic Shift (`aoi_posts_all.json`, `*_comments.json`);
  - OCP: `1-big-prizes/aoi-nakamoto-quizchain-0-854btc` (tested.md — ~320 млн негативов);
  - agntn real-big-block, grycoin/2; benevolentcyka/puzzle.
- **Механизм** (подтверждён):

  текст (UTF-8) → MD5 → энтропия 16 байт → BIP39, 12 слов без пароля → m/44'/0'/0'/0/i (i = 0…5) → P2PKH.

  Самотест: `tools/engine.py selftest` (вектор автора + Stage One). Инструмент автора умеет и SHA-256 → 24 слова (QC1-4/10).
- **Подсказки автора:**
  - «Final version of the second chapter»;
  - два перевода строки между абзацами («Enter дважды», «13 10 13 10»);
  - «формат первой стадии — большая подсказка к формату второй»;
  - «перехешировала, убрала один из твистов»;
  - «7-й приватный ключ… но первый тоже» — то есть индекс 0;
  - позже: «потеряла информацию о решении» (часть 762380140, «tragic boating accident variation»).

  Аномалии в тексте главы: «ppM», «VIrgin», «BItcoin», 10 абзацев с `<br>`.
- **Что установлено:**
  - Правило нормализации воспроизведено на 8 решённых блоках: QC1-4/10/15/29, QC2-29/50/62/63 и Stage One.
  - Автор всегда хешировала с LF (хотя писала «13 10»).
  - Ошибки автора механические: хвостовой LF из текстового редактора.
  - QC1-29 = 17 строк через `\n` + «vOIce» + « » + последние 3 символа WIF прошлого блока.
- **Проверено** (0; подробнее — таблица в `NOTES.md`): H1, H2, H4/H11, H5, H8 (54 млн проверок ключей), H9 (2^15 правок опечаток), H18, **H19 = все 2³⁰ подмножеств флипов × 10 джойнов = 10 737 418 240 MD5** (C-перебор с midstate, `tools/h19_c.c`), H20 (1,47 млн), H21 (7,66 млн), H22 (11 616 — перенос правила QC1-29 на RBB). Ключевой нерешённый узел — флип-правило Grycoin-2 (адрес 1tzieU…, префикс MD5 3c6, pubkey 039ad91b…). Без него перенос на RBB невозможен. Sea_Ferret_9615 на GPU (>10¹¹) тоже 0.
- **Вердикт 14.10 10:40:** исчерпано, задача на паузе. Автор, по её словам, сама потеряла решение.
- **Если продолжать** — только инсайт:
  - как puzzleponky решил Grycoin-2 («easy after solving block 2, tricky bits»; 70 его комментариев прочитаны);
  - H10/H15: формат QC1-77 «[solution] TOMI Omit TOMI [link]», где link — полный приватный ключ блока 44 (неизвестен).
- **Файлы:** `/workspace/work/quizchain/`: `NOTES.md`, `fresh_look.md`, `tools/` (`engine.py`, `qc1lib.py`, `h19_c.c`, `h20_split.py`, `h21_edit.py`, `h22_link.py`, `sweep.py`), `ocp/`, `parts/`. Задача 915ee0aa, проект 2236ab0e.

## 7. Нуаза / bitcoin.fr «Chasse au trésor» — 0,2024 BTC

- **Адрес:** `bc1q8zfy6wvvtskzkg4s343x42pyf363nmejspgc02`, P2WPKH m/84'/0'/0'/0/0, без passphrase (подтверждено автором: e-ducat.fr/2024-09-29-adresses-et-chemins). 14.10: 20 240 000 сат, трат 0.
- **Источники:**
  - https://bitcoin.fr/chasse-au-tresor/ — все 14 официальных подсказок, выходили в X @e_ducat с 15.08 по 25.12.2024;
  - книга Pierre Noizat «L'énergie, face cachée de la monnaie»;
  - форум jeuxvideo.com, тема 76202287;
  - репозиторий блога: github.com/pierrenoizat/pierrenoizat.github.io.
- **Механизм.** 24 английских слова BIP39. Слова 1–21 — французские слова из книги, каждое заменяется английским словом того же номера в english.txt. 22–24 — слоган **open always win** (Samsung «Open Always Wins», «wins» нет в BIP39). Настоящее 24-е слово не совпадает с checksum.
  - Подсказка 9 даёт **64-битный верификатор без деривации**: 8 допустимых последних слов (alien detect flip gas organ peasant staff trigger). Реализация — `src/chk.py`.
- **Слоты:**

  | Слова | Откуда | Статус |
  |---|---|---|
  | 1–12 | картинки книги по порядку | известны частично |
  | 13–14 | обложка | énergie / monnaie / pierre |
  | 15–16 | олимпийские годы биографии как номера | 1960 → visual, 1980 → wash |
  | 17 | имя автора / департамент | Creuse (23): creuser / accepter… — открыт |
  | 18–19 | оглавление | économie / progrès / amour / bonheur / science… |
  | 20–21 | начало главы на центральную тему | гл. 4 «Énergie»: physique, source |

  Из картинок, найденных бесплатно: «énergie libre» (OverDrive sample), таблица p.72 (fossile, manuel, physique), «indice baguette» (indice, baguette, travail, acheter, source), дерево решений (pluie, soleil).
- **Проверено (0):** famA (1,11·10⁹), famB (4,8·10⁸), famC (3,6·10⁸), famD-y (1,85·10⁷), famD-w (3,5·10⁸). У решателей форума с книгой — ~10¹⁶ на 10×RTX 4090, тоже 0. Консенсус форума: у автора ошибка или неоднозначность.
- **Блокер.** Недостающих картинок (yin-yang p.42, timbre p.101, bilan BCE p.99, identité p.174, bonhomme/opinions p.178) нет ни в одном бесплатном источнике. Пройдены Google Books, Amazon/Kindle, Everand, OverDrive, лекции и интервью. 13.10 15:13 Илья решил книгу не покупать (Kindle €8,99, EPUB €10). Есть путь через библиотечную карту: Tout Apprendre/Mozaik во французских медиатеках.
- **Файлы:** `/workspace/work/noizat/`: `NOTES.md`, `src/` (`chk.py`, `famA–D.py`), `runs/`, `web/` (картинки блога, kindle_sample), `french.txt` (NFC), транскрипты лекций. Проект fba678df.

## 8. kTimesG Phy Challenge — 0,008 BTC

- **Адрес:** `bc1qrpn28qa82uyjg37dvsz3w7wpm3kpdea957nm9p` (P2WPKH). 14.10: 800 000 сат, трат 0.
- **Источники:**
  - https://bitcointalk.org/index.php?topic=5584952.0 — 102 поста, 6 страниц, перечитаны 13.10; шапка: «3 posts by 2+ users deleted»;
  - https://puzzles.agntn.dev/collections/phy;
  - альбом SecretAdmirere imgur BzcJMdl.
- **Механизм.** Подпись Bitcoin Signed Message `J0d1vHyL…6Gr2bE=`, заголовок 39 (P2WPKH, recid 0).
  - r = 0x4775bc7c…0d06b2f8, s = 0x5b890b292ba1abd9b1 — всего 71 бит, построено вручную.
  - pubkey 02425afd…6650eb; z = стандартный хеш signed message полного текста OP (без завершающего LF).
  - Раз s выбран автором, то d = (s·k − z)·r⁻¹ mod n: **достаточно найти k** (или d), закодированный в картинке.
  - Картинка — эмодзи-спираль 2048² (256 эмодзи, «phyllotaxis»).
- **Подсказки автора:**
  - «modular values», «fractional», «spacestamps… phylo-based proof-of-equivalence»;
  - «no loose ends, no hashing»;
  - «the hints are already inside-out»;
  - «the data speaks for itself»; Kangaroo не подразумевался;
  - «97% of the recoloring… a much easier and precise normalization than grayscale-to-tone exists»;
  - «everything required to solve is in the first post»;
  - удалённый ответ «🔀🔄» на реплику «маленький s (9 байт) может быть подсказкой»;
  - «gvonys fhelucrM kbZ» = «Mox Zephyrus flabit»;
  - «no useless information».
- **Что установлено:**
  - Все 9 байт s нечётные, бит 2 = 0 — это структура.
  - Таблица эмодзи сообщества проверена попиксельно: поз. 188 — 🩷 U+1FA77, а не ❤️. Это новая таблица t3.
  - 4 ошибки SecretAdmirere лежат на одном рукаве: 124/128 ≈ 97%.
  - Подробности: `inv/phy/FRESH.md`.
- **Проверено (0):** сессии 1–9 (`SUB.md`), гипотезы H1–H100+:
  - кодпоинты, тона, ранги, UTF-кодировки во многих порядках;
  - BSGS до 2⁴⁵ (k·G = R и др.);
  - решётки LLL/CVP (7006);
  - k = ±a/b (194 тыс.);
  - золотое сечение, Фибоначчи;
  - shuffle-seed = s;
  - 6-битный символ для s (57 млн окон);
  - аффинные порядки (4,27 млн);
  - t3/t3n (396 068).
- **Вердикт 14.10 08:40:** пауза до новой подсказки автора.
- **Файлы:** `/workspace/work/inv/phy/`: `FRESH.md`, `SUB.md`, `verify.py`, `signed_message.txt`, `puzzle_data.txt`, `puzzle.png`, `emoji_tables.json`, `s8/`, `var_t3*/`, множество `*.py`. Журнал: `/workspace/work/web3auto/NOTES.md` (раздел phy). Задача 676189e9 (watch, раз в 6 ч), проект 1d1b2b74 («наука»).

## 9. Solana Puzzles #4 — 0,834 SOL

- **Кошелёк:** `DmDBmb7AEm6xRxkoBYq1mJYqsZP263gmXB53zA2dqjne`. 14.10: 834 000 000 lamports. Входящих tx две: 02.09.2025 и 27.01.2026; исходящих нет.
- **Источники:**
  - https://solanapuzzles.com/puzzle4 (картинка images/puzzle4.png, 1536×1024);
  - старая страница подсказок /puzzle4-1 (Wayback 20260625004904, копия `puzzle4/wb_p41.txt`);
  - TG-чат https://t.me/+5GYvaO1qGT44Mjdh (экспорт и разбор: `puzzle4/tg/findings.md`);
  - x.com/solanapuzzles.
- **Механизм** (серия восстановлена на решённых #1–#3: `puzzle4/SOLFRESH.md`):
  - случайная мнемоника кошелька, 12 слов;
  - Phantom m/44'/501'/0'/0', без passphrase;
  - в #1–#3 картинка 3×4, одна ячейка = одно слово через смысловую связь: признак, действие, смысл, а очевидное слово часто избегается;
  - порядок: #1 построчно, #2 обратный, #3 по спирали.
- **12 подсказок #4:**
  1. When things look backwards, clarity comes.
  2. Look for the answer in the stars.
  3. Don't forget to look for the X on the map.
  4. Half of the truth hides in the other half.
  5. It's hidden in the cat's eyes.
  6. The circle of 13 spins twice.
  7. Prime numbers will unlock the gate.
  8. From darkness to light, shift the letters.
  9. You never have to hunt a whale…
  10. What remains when you remove what both share.
  11. Don't believe in everything you see.
  12. Are you ready to read between the lines?
- **Расшифровано на картинке:**
  - ROT13 «hello world» и «did you follow the link?»;
  - зеркальное «Not your keys, not your coins»;
  - «The key is under the moonlight»;
  - 2^128+51 — простое для SSS, рядом портрет, похожий на Шамира;
  - 13°37'N 00°42'E;
  - Σx = 13058 — возможно, сумма индексов слов (на #1–#3 не подтверждается);
  - QR → YouTube QhXQo-h0lwc (numbers station). Аудио = ASCII «evident agenda» → evidence/agent (префиксы). Ловушка «whale»?
  - админ: «Not with simple numbers».
- **Проверено (0):**
  - M2, M5, M7 (3,5 млн);
  - orders E1/E2 (5,3 млн комбинаций, 332 тыс. деривизаций);
  - wide (S и NS полностью);
  - R1–R5, анаграммы;
  - Σ-MITM (550 048 деривизаций);
  - run4: 12 объектов коллажа, 9 порядков × 2 ветки = 6 094 231 деривизация;
  - хеш-сиды, SSS-комбинации энтропий #1–#3.
- **Вердикт 14.10 11:05:** модель объектов — тупик. Нужен новый сигнал: подтверждение Σ или текстовый ключ, фиксирующий 2–3 слова.
- **Файлы:** `/workspace/work/web3auto/puzzle4/`: `derive.py` (сверен на #1–#3), `SOLFRESH.md`, `reasoning.md`, `obj_slots.json`, `run4/`, `wide.py`, `m7.py`, `orders.py`, `audio/`, `tg/`. Журнал: `/workspace/work/web3auto/NOTES.md`.

## 10. Path to Greatness — 3,02608794 LTC

- **Адрес:** `LUtL7qnm3gzxKjHcfVLSjydqhhinTVmTmS`. 14.10: 302 608 794 литоши, 8 tx, отправлено 0.
- **Источники:**
  - OCP: `2-mid-prizes/path-to-greatness-treasure-hunt-3ltc` (`analysis/tested.md` — ~5,7·10¹² негативов, почти все только PKCS7);
  - сайт p2gtreasure.com;
  - YouTube-канал автора UCrwC8bYZ_Yyum9gj4OHVEiQ: 3 видео, в том числе «Soloville»;
  - демо-игра на Google Drive (Unity, 134 МБ; аудио альбома извлечено);
  - r/ARG.
- **Механизм** (по экрану компьютера автора). 8 ответов длиной 16, 15, 8, 12, 20, 16, 24, 17 → 4 ключа AES-256-CBC:
  - Seg1: imagine 16 + beach 16, IV few_n_far_btween;
  - Seg2: chess 12 (регистр сохраняется) + wonders 20, IV nocturnal_sugars;
  - Seg3: wasd 8 + ship 24, IV colors_on_leaves;
  - Seg4: scramble 15 + sky 17, IV seconds_of_dream.

  Каждый сегмент — один блок, это точный оракул (вероятность ложного срабатывания 2⁻⁶⁴). super_key расшифровывает WIF.
- **Статус замков: ни один из 4 не вскрыт.** В инвентаре от 12.10 написано «all opened by us» — это ошибка прочтения: в NOTES слово «OPEN» означает «не решён».
- **Подсказки:**
  - clue 1 «Imagine»: Леннон-пародия + 19410712, то есть дата в формате YYYYDDMM, «written twice the infamous way»;
  - clue 6 «Beach»: «Our counting starts with a deer / Our pattern starts with the sun / Note the first fifteen you hear» — мелодия, 15 нот против 16 символов;
  - clue 8: «4 → Exit Light → T» и «8 → Ghost March → R» (номер = индекс буквы в названии трека);
  - строки clue 5 — цитаты чужих песен: Ghost Love Score, High Hopes, Three Evils, Treasure Island, Hávamál.
- **Проверено.**
  - Lock 1: все «8 цифр дважды» × десятки тысяч форм beach (d8x2, sep8x2). Любой год + 0712 (s16, ~9·10⁹), вставка символа (s22lf, 1,25·10¹⁰), relaxed padding (zero, X.923 и пр.).
  - Lock 2: ~10⁹ chess × wonders (l2w).
  - Lock 3: полное {0-9wasd}^8 × пул ship, по 1,48·10⁹ на каждый левый.
  - Lock 4: ~2·10⁹.
  - kord: 1,74·10⁹ одним расшифрованием против всех 4 CT.
  - Всё 0, свидетели (подложенные ключи) переоткрываются.
- **Дальше:**
  - lock 1: как 15 нот записываются 16 символами, либо imagine не цифры;
  - lock 4: позиционное прочтение по трекам даёт «notth…» (умеренный сигнал);
  - не перезапущены линии s19l3 (`lane.sh 999999 isamathematicalcertainty jbruceismaythomasandrews`) и s21g/runpa.sh.
- **Файлы:** `/workspace/projects/b6983d3d-52f5-48f8-9974-b99dc8e31c55/work/ptg/`:
  - `NOTES.md` (104 КБ), `INSIGHTS.md` (84 КБ);
  - `seg.c`/`seg` (ARMv8 AES ~3,2·10⁶/с на ядро; сборка через zig cc), `s15/seg_rp`, `pat_rp`, `ins_rp` (relaxed padding), `s17/map_rp`, `kord/segk.c`;
  - `audio/` (`game/album_from_demo.ogg`, `yt/*.mp3`), `demo/tex/` (lossless-текстуры подсказок), `p/` (OCP-папка).
  - Задача 48f4c59c (ежедневно 14:00), проект b6983d3d («работа»).

## 11. RushWallet #30 — 0,01 BTC

- **Адрес:** `13Q8hJqagtd77ojTJcEZPjTz2sBFSsYxyj` (P2PKH, несжатый ключ). 14.10: 1 000 000 сат. Одна трата в истории — это возврат 1 BTC организатору 25.03.2015; текущие 0,01 BTC от 24.04.2015 не тронуты.
- **Источники:**
  - bitcointalk, тема 793720 (583 поста, `btt/thread.txt`);
  - visalord/rushwallet-puzzle-30 (`visa/`, видео 720p `visa/video/Bitcoin_puzzle_ARCHIVE.webm`);
  - OCP: `2-mid-prizes/rushwallet-contest-30-1msats` (~552 млн негативов);
  - kryptokit.com в Wayback.
- **Механизм** (contest.js, 2015): priv = SHA256(utf8 фразы как есть), несжатый ключ.
- **Подсказки:**
  - Морзе: «DMITRI KNOWS THIS GAME IS NOT EASY… READ SATOSHI'S PAPER»;
  - S4VV4S: «Wallet 30 still hides somewhere in the whitepaper» — это мнение игрока, не организатора;
  - Дмитрий держит лист на ~1:00 — двухколоночная вёрстка, не первая страница whitepaper, в 720p нечитаемо;
  - «x4 on the princess», email-подсказка «9e]IW8lnJN;J[88U3…», 3302-ветка.
- **Таблица механизмов #1–#29** (`clues.md`): все решённые фразы — читаемый в кадре текст дословно, кратность видна на экране (X2…X7).
- **Проверено (0):** whitepaper как токены, предложения, заголовки, шапка × регистры × повторы, модель опечаток (3,97 млн); шаблоны A/B/C (~40 тыс.). Итого ~4·10⁶.
- **Вердикт:** тупик до нового медиа — видео выше 720p, оригинал письма или reddit-подсказка 2i7uv6.
- **Файлы:** `/workspace/work/rushwallet30/`: `NOTES.md`, `clues.md`, `bw.py` (оракул ~10 тыс./с), `h1_whitepaper.py`, `h2_typo.py`, `wp.txt`, `btt/`, `visa/`, `wayback/`. Задача ee1bf57f (пауза), проект 4c642759.

## 12. «Riddle for 8.5 BTC» (commanderu.github.io) — 99 081 сат

- **Адрес:** `1KDUcZh5Z6H1of4Pwoy5ojJtkQxcQBHhnH`. 14.10: 99 081 сат, 8 входящих донатов 2019–2025, трат 0. **8,5 BTC на этом адресе никогда не было**: заявление OP про 2010 год ложно, на сайте стоит донат-виджет.
- **Источники:** commanderu.github.io (репозиторий commanderu/commanderu.github.io, клон в `repo/`, 78 коммитов), bitcointalk 5573629.
- **Механизм.** WIF uncompressed из 6 частей: 3×9 + 3×8 = 51 символ.
  1. QR → «1.5JRd42nU1»: **часть 1 = 5JRd42nU1** — найдена.
  2. «AnimalƵ (1,3,5,7 - word 2,3,6,8 - numbers)» — 8 символов, проверочного хеша нет.
  3. MD5 221b71a2f785887386016268b47fa956 + OpenSSL `U2FsdGVkX18XIKPjM2cf54Jh81/zBmjRohN8cnJ7wfE=` (salt 1720a3e333671fe7).
  4. MD5 b621fcb9… = **AhiF1tpuG** — найдена.
  5. MD5 7f4eb6dbc2e0658e661e9ccbd0a3f289 — не найдена.
  6. MD5 7099591e95e1a4927a5e96cbbb467275 — не найдена.
- **Проверено (0):** ~4,1·10⁸ MD5 по шаблону «животное с цифрами»; 7 380 вариантов openssl; MD4/NTLM/sha (~10⁴). Полный 58⁸ — ~1,3·10¹⁴, перебор запрещён.
- **Вердикт:** тупик, приз ~$80. **Файлы:** `/workspace/work/riddle85/` (`NOTES.md`, `s2/search.py`, `s2/animals.txt`, `repo/`). Задача a9fb75cf (пауза), проект f3403511.

## 13. Bitcoin Coders Puzzle 07 — 21 000 сат

- **Адрес:** `bc1qj7xsxrlgmnnrqwvlakacc5yrh33h2n3xaa0m09` (tx 85ad0185…0c5e), путь m/84'/0'/0'/0/0. 14.10: 21 000 сат, трат 0. URL страницы пазла в журнале не записан: находку сделала охота 98bdbcc9. Картинка: `p07.png` / `p07.webp` (1088×1472).
- **Механизм:** плитки 32×32 (34×46 = 1564) — перемешанная комикс-страница из 4×3 = 12 панелей, по слову на панель, порядок чтения слева направо и сверху вниз.
- **Узнано 5 панелей:**
  - контейнер на кране в порту за сеткой — crane / cargo / fence / harbor;
  - девушка в шляпе и очках — lady / woman / girl / hat;
  - дерево на кофейной бумаге — tree;
  - татуировка-дракон — dragon / tattoo;
  - бриллиант на фиолетовом фоне — diamond / crystal.
- **Сборка:**
  - `solve.py` / `merge.py` (Kruskal) дали 438 кластеров;
  - `gaps` (GA, nemanja-m) глобально не собрал;
  - следующий шаг — gaps по кластерам либо больше популяции.
- **Статус:** пауза по лимиту сессий, приз ~$17. **Файлы:** `/workspace/work/bcoders07/` (`NOTES.md`, `classify.py`, `solve.py`, `merge.py`, `asm/`, `gapsrepo/`). Задача 9ff8cf3b, проект 28058c93.

## 14. Bitaps Shamir SSS challenge — 1,00016775 BTC

- **Адрес:** `bc1qyjwa0tf0en4x09magpuwmt2smpsrlaxwn85lh6` (BIP84 m/84'/0'/0'/0/0). 14.10: 100 016 775 сат, трат 0.
- **Источники:** https://bitaps.com/mnemonic/challenge (`challenge.html`); код jsbtc master (последний коммит 2020-09-30), `src/functions/shamir_secret_sharing.js` (клон `jsbtc/`); OCP `1-big-prizes/bitaps-shamir-challenge-1btc`.
- **Механизм:** 3-of-5 Shamir над GF(256). Опубликованы 2 доли по 12 слов (x упакован в 4 бита checksum):
  - S1 session cigar grape merry useful churn fatal thought very any arm unaware;
  - S2 clock fresh security field caution effort gorilla speed plastic common tomato echo.
- **Аудит.** GF, Лагранж и pow корректны. Утечки две:
  - `while(q.includes(w))` — 0,27 бита;
  - главная: `igamc()` вызывает `igam()` без S, получается ReferenceError, и буфер отбраковывается при χ² < 3. P(pass) = 0,139, то есть ≤2,85 бита на буфер.

  Сумма ≤~9 бит, остаток ≥2¹¹⁹.
- **Вердикт:** нерешаемо без третьей доли. **Файлы:** `/workspace/work/bitaps_sss/` (`NOTES.md`, `rtest.py`, `jsbtc/`). Задача 5b44f3ad (сторож), проект d54060b7.

## 15. Arweave Puzzle #3, #10 (+#11)

- **Адреса и балансы 14.10:**
  - #3 `wHP6OPG5GMF5dedo_CD8AAy6x8La-gfI5b5pk65Tx_0` — 1000,1658 AR, не тратился;
  - #10 `bkjJGw3NLxs8OAyRxgTL-QFpiB3lBJqZ76kDhWdB-Rs` — 500,0223 AR;
  - #11 (ETH) `0xFF2142E98E09b5344994F9bEB9C56C95506B9F17` — 1,0 ETH, nonce 0;
  - #12 забран (вывод tx gx0Ws1TP…).
- **Источники:** OCP `2-mid-prizes/arweave-puzzle-3-1000ar`, `…-10-500ar`, `…-11-1eth`; https://github.com/HomelessPhD/AR_Puzzles (подсказки автора из Discord).
- **Механизм** #3/#10: SHA512^11513(ответ) hex → CryptoJS EvpKDF (1e4, 32 слова) → Rijndael Nk=32/Nr=38 CBC. #3 приводит ответ к нижнему регистру (32 клетки 8×4), #10 чувствителен к регистру.
- **Подсказки #3** — 8 картинок, консенсус: anno md12 a384 cash e4d5 root pull base. Автор: «7 картинок решаются легко, для одной нужна удача»; «people see a tree… type TREE» — значит, не tree.
- **Подсказки #10:** кости 2,1,4 / 2,4; «6 3 18»; Палпатин; «[0-19]»; ключ «…nesis #28».
- **Проверено (0):** #3 H5 — 11 973 кандидата; #10 H10-W — 72, H10-N — 28 960; до нас ~8 млн.
- **Скорость:** ~20 кандидатов/с на ядро, KDF дорогой. У ПК-агента есть сертифицированный C/OpenCL-решатель (делался для #12).
- **Файлы:** `/workspace/projects/b6983d3d-…/work/arweave/` (`NOTES.md`, `fastcheck.py`, `gen3_h*.py`, `p10/`, `autosweep.py` — только после проверенного хита, `hits.private` — не читать).

## 16. LuckyLurker Bitcoin Vault #2 — 1 BTC

- **Адрес:** `bc1qnepv9pcnqvndux9h9mcaxvk6u993rc0lew9fpp` (финансирован 12.08.2026, tx 2314d7f0…f198). 14.10: 100 000 000 сат, трат 0.
- **Источники:** https://luckylurker.com/bitcoin-vault-2/ (за SG-капчей, читать браузером), https://luckylurker.com/bitcoin-vault-2-is-live-1-btc-prize/, bitcointalk 5577554, X @LuckyLurkerPaul. Автор — Paul Jones.
- **Статус.** «Postponed until further notice»: договорённости со спонсором не урегулированы, даты и суммы нет. Подсказок 0. 14.10 15:19 почта mak777777uh@gmail.com подписана на бесплатную рассылку «Get Vault #2 updates»; подтверждающего письма не было.
- **Модель на будущее.** Vault #1 был Electrum SegWit seed без passphrase, путь m/0'/0/1. Подсказки сначала получали подписчики, публично — позже. `oracle.py` проверяет BIP39 (84/49/44, индексы 0–19) и Electrum segwit.
- **Файлы:** `/workspace/work/luckylurker2/` (`NOTES.md`, `oracle.py`, копии страниц). Сторож eabd2a4e (раз в 6 ч), проект 6ad2f71d.

## 17. Неначатые и кандидаты (кратко)

Источник — инвентарь от 12.10, балансы перепроверены 14.10. Все пути ниже — в OCP, если не указано иное.

| Пазл | Адрес | Баланс 14.10 | Что нужно | Наша оценка |
|---|---|---|---|---|
| GSMG.io | `1GSMG1JC9wtdSwfwApgj2xcmJPAwx7prBe` | 1,25649674 BTC | пароль финальных AES-блобов (salphaseion), многоступенчатый шифр; https://gsmg.io/puzzle, `1-big-prizes/gsmg-io-5btc-puzzle` | ~0,1%, тысячи атакуют с 2019 |
| Ballet / Bobby Lee | `1JxWyNrkgYvgsHu8hVQZqTXEB9RftRGP5m`, `1QGtbKxx6FKDD66LwnrzHCAHmyZ7mDHqC4` | 1,00003481 + 1,00003877 BTC | скрытая половина BIP38-пароля, ни разу не сфотографирована | нужна внешняя информация |
| Guntis Vitolins «10 ETH» | `0x9C2F44EFAd0c1E852a09dF9939e6DaF061140CaF` | 8,6125 ETH (nonce 7, автор тратит) | MetaMask seed по видео и блогу, 3 позиции известны; `1-big-prizes/guntis-vitolins-metamask-8-6eth` | L–M, ограниченный перебор |
| Fe «Bountiful» | registry `0x71fB6afcD98c5BD611712ad4b8D314EF729aa69D` | 1,0 ETH | `claim()` из нерешаемой «пятнашки» через баг компилятора Fe или контракта; https://github.com/fe-lang/bountiful. Наше: `Adjacency.lean` (правила ходов = смежность, доказано), fuzz.py/fuzz2.py на байт-идентичном байткоде — 0 расхождений (`/workspace/work/bountiful*`). Нужен газ (lock + claim) | L |
| Peter Todd, коллизии | `35Snmmy3…`, `3KyiQEGq…`, `39VXyuoc…`, `3DUQQvz4…` | 0,2773 + 0,1158 + 0,1003 + 0,1003 BTC | коллизия SHA-256 / RIPEMD-160 / HASH160 / HASH256 | ~0 |
| 1000-BTC puzzle | #71 `1PWo3JeB9jrGwfHDNpdGK54CRas7fsVzXU` (7,10 BTC); всего ~903 BTC в 77 адресах (`/workspace/work/inv/btc1000_bal.json`) | — | перебор диапазона, Kangaroo; RBF-гонка ботов | ~0 |
| Groestlcoin puzzle | `FindKEYLrVaahtkaVRk8KTspRMyWxfUi3i` | 1000,0001 GRS (chainz, 14.10) | groestlcoin.org/puzzle, bitcointalk 5137602. По SOURCES.md вынесен в проект f3203026; локальных заметок в workspace не найдено | не оценивалось |
| QDay «Steal this vault» (Solana) | программа `22AEUZtxpbi1ReJGrG9SyFob3uHGzZERERyVNp6uV8Y6`; вероятный vault CzTEB1SUozi1mGQWsSXA8b6DX7dZjbuFtTKPraU7AvAz (~1 SOL) | не перепроверялось | подделка LMS-подписи или баг программы; https://beforeqday.com/challenge. Трогать только подтверждённый challenge-vault | L–M |
| Corey Phillips kitten | `bc1qcyrndzgy036f6ax370g8zyvlw86ulawgt0246r` | 0,010019 BTC | BIP39-passphrase; автор: «not meant to be solved» | L |
| School of Bitcoin | `bc1qcsdfkaqgy9ux668vmzflzqsyg0qtspncymt5ed` | 0,01 BTC | Морзе / Wingdings / QR → seed | L–M |
| seed-phrase.com | `bc1q7x3p3rkmkxgf20n3apkccqcmn5mdtsf8zx5227` | 0,01 BTC | серия подсказок 2024 | L |
| AH White «Walking Banks» | `bc1qxy4tf0s4n7x9w24rawf9qsxh2hyljrmvyrhwzt`, `bc1q4qc24xk5cehc4t7vr264zldsms2kmxf86jqjau` | 0,001 + 0,007 BTC | 24 слова в романе, 4 известны | L |
| Keir Finlow-Bates | `17Y9czcbcCz433QXsy1SGQjwLb27BBtLLZ`, `1DZ5NbUwDgxeJkKhQLgYcUUX36PtYso1pm`, `19kkawFcg2U2s6vq368MXD7FJU9JZvRrjA` | 3 × 0,002 BTC | brainwallet-ответы из книги | L–M |
| Zden «HALV» | `1crypto24HCr178iMcKd5iUi5D4rsg1nK` | 0,003125 BTC | raw key из геометрической картинки; crypto.haluska.sk | L |
| The Great Riddle | `bc1qm3ayuhn7wppuqxaywu8ea0lggs8myy7543fekk` | 0,00423871 BTC | 25-е слово выдаёт автор, выплата не автоматическая | — |
| Exitonly Challenge 14 | `bc1q5rjy2cdfy4n4dkk4r6pxtwqlm8tgjcc2dj0ee9` | 0,0003 BTC | seed | неэкономично |
| bitaddress BIP38 giveaway | `1J7BVeP8JK4op2X3GN3Hy7xkTnGnQTMpou` | 0,005297 BTC | забытый BIP38-пароль владельца; stacker.news/items/275973 | ~0 |
| Crypto Puzzles 2018 #2 | `0x1fa8Be9De5bBFE047C72dB8E8E3257128F7661ad` | 0,05 ETH | raw key из серии картинок и видео | L |
| Teikhos C1/C2/C3 | `0x17e5e0910b…`, `0xd7c6d542f3…`, `0x973c2178b0…` | ~2,0 ETH (по инвентарю) | неопубликованный 256-битный ключ автора | ~0 |

Забраны или закрыты, не тратить время: Arweave #12, FTPK S2/S4, LogicBeach Powerful Moss, 1000-BTC #135, Satoshi-Maze, Proof of Writing, Movie Enigma, Hunting Time, Keysa, LuckyLurker #1, Dug Student Hunt, 310 BTC Challenge, Paradigm Kryptos CTF, cryptopuzzles.eth (Easycore/Numbers), Plato's Solid. WIF500 (500 BTC) — закрытый GPU-перебор 2⁵⁸, отсев.

---

## 18. Общие инструменты, скорости, ограничения

**Вычисления**
- **Песочница:** 2 CPU arm64, без GPU. Фоновые задачи живут ≤1200 с, foreground `sleep` >~100 с убивает фон и /tmp. pip-пакеты (coincurve, bip_utils, mnemonic, base58) регулярно пропадают — ставить заново в той же команде. `pkill -f` по подстроке убивает сам шелл. Потолок перебора ≈1e9 на CPU.
- **ПК Ильи:** RTX 3070 Laptop 8 ГБ (CUDA через NVRTC/cupy, без nvcc), 16 логических ядер, miniconda, bip_utils 2.12.2. Работает через свой агент — там лог и `sweep.mjs` (Genesis), sweep24 (BLM). Набор оракулов и скриптов: `/workspace/work/pc_handoff/pc_agent_kit.zip` (папки blm/, trithemius/, genesis/, oobit139/).
- **Google Colab** (бесплатный T4). Блокнот hark-worker: https://colab.research.google.com/drive/1aYf845IOyq4HMii_yZk3kzjfnq-vt0As, браузер-сессия colab-google (вход mak777777uh@gmail.com). Ограничения:
  - браузер портит длинный текст в ячейке;
  - загрузка через панель не работает, file:// недоступен;
  - presigned URL живут 10 мин и слишком длинные для набора;
  - рабочий, но не проверенный путь: однострочник `!curl -sL <короткий URL> | python`;
  - тяжёлый перебор ключей — риск бана по ToS, только для уже суженной задачи.

**Скорости оракулов** (по журналам)

| Задача | Скорость |
|---|---|
| BIP39 → BIP44 (BLM `fastcheck.py`) | ~1 мс на фразу на ядро, ~770 деривизаций/с с 5 путями; ~1,7 тыс./с на ядро в OCP-оракуле |
| BIP39 + BIP84 (SLM `seedsearch.py`) | ~800–1250 проверок/с на ядро |
| Genesis `core.py` (PBKDF2 + отпечаток) | ~1 230/с на ядро |
| Trithemius `s27_bip39.py` | ~470 проверок/с при общем CPU |
| Quizchain `engine.py` | ~830/с на ядро; C-перебор MD5 с midstate — 10,7·10⁹ за ~2,3 ч |
| PTG `seg` (AES) | ~3,2·10⁶ ключей/с на ядро |
| Arweave | ~20 кандидатов/с на ядро |
| RushWallet `bw.py` | ~10 тыс./с |
| Нуаза `chk.py` | ~10⁹ за минуты (без деривации) |
| Solana `derive.py` + Pool(2) | ~1,5–2 тыс. деривизаций/с |
| Wix-оракул SLM | 0,4–0,75/с, только последовательно |
| ПК: GPU-ядро BIP39 (OCP) | 12,7·10⁶ последовательностей/с; sweep24 Ильи ~192 тыс. адресов/с |

**Источники и методы**
- **Балансы:** mempool.space/api/address, blockstream.info/api/address; LTC — blockcypher (litecoinspace иногда таймаутит); SOL — api.mainnet-beta.solana.com; ETH — ethereum-rpc.publicnode.com; AR — arweave.net/wallet/<addr>/balance; GRS — chainz.cryptoid.info. Скрипты: `/workspace/work/pc_handoff/bal.py` и `/workspace/projects/0f761e1e-…/coord/prizes.py` (строки OK/DROP/ERR).
- **Архивы:** web.archive.org (CDX бывает «Temporarily Offline»), archive.ph.
- **Reddit:** только через Arctic Shift (curl, не urllib).
- **bitcointalk:** постранично через curl `;start=N`.
- **YouTube** блокирует песочницу: yt-dlp даёт 403/429. Обход — браузер плюс загрузчики (en.loader.to → savenow), либо `analyze_video` для транскрипта.
- **Каталоги:** floflo777/open-crypto-puzzles (клон `/workspace/work/open-crypto-puzzles`, `engines/` — CUDA-движки BIP39-passphrase и Arweave), puzzles.agntn.dev (клон `/workspace/work/inv/agntn`), diploux/unsolved-crypto-puzzles, oritwoen/boha, cbman0/BitcoinPuzzles, privatekeys.pw.
- **Реестр охоты** со всеми просмотренными площадками и закладками: `/workspace/work/hunt/SOURCES.md`.

**Журналы проектов**
- `/workspace/projects/<id>/.hark/journal/*.jsonl` (время в UTC); сводка — `coord/digest.py`; состояние координатора — `coord/STATE.md`, `coord/DIGEST.md`.
- Проекты по пазлам:

  | Проект | ID |
  |---|---|
  | Quizchain | 2236ab0e |
  | RushWallet | 4c642759 |
  | 8.5 BTC | f3403511 |
  | BLM | 233a2ae6 |
  | Oobit | 1ae68e05 |
  | Coders07 | 28058c93 |
  | Bitaps | d54060b7 |
  | LuckyLurker | 6ad2f71d |
  | Trithemius | de339428 |
  | Нуаза | fba678df |
  | Phy и Solana #4 («наука») | 1d1b2b74 |
  | PTG и Arweave («работа») | b6983d3d |
  | лог ПК-агента | 4dde0eb3 |
  | охоты | 98bdbcc9 (Unsolved), 58bbce50 (оычн) |

- Регулярные задачи, судя по журналам, на момент передачи могли ещё работать: BLM 1a204712, Trithemius 3034aaca, Genesis a8e1265d, SLM 9e23b25d, Oobit 24a0db5d, Quizchain 915ee0aa, Phy/Sol4 676189e9, PTG 48f4c59c, LuckyLurker eabd2a4e, Bitaps 5b44f3ad. Если работа прекращена, их нужно отменить.

## 19. Замечания и расхождения
- В `PC_AGENT_TASKS.md` Oobit desc_TE указан как остаток, но он уже проверен (0) 14.10 17:20.
- В инвентаре от 12.10 у Path to Greatness написано «all opened by us». По журналу ни один из 4 AES-замков не вскрыт.
- Даты в части записей журналов Trithemius и BLM (например, «сессия 60, 22:43–23:05») позже момента составления отчёта — видимо, авторы сессий писали время по другому часовому поясу. Состояние брать из файлов прогресса (`s27_16.units`, `*.prog`, `state/*.progress`), а не из меток времени.
- Bitcoin Coders Puzzle 07: URL оригинальной страницы в журнале не записан.
- Groestlcoin: заметок проекта f3203026 в workspace не найдено, проверен только баланс.
- QDay и Teikhos: балансы 14.10 не перепроверялись, цифры из инвентаря от 12.10.
