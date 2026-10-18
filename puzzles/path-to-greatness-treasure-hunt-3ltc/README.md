# Path to Greatness: Treasure Hunt

Индекс: [MASTER_CATALOG.md](../../MASTER_CATALOG.md) (Части 1-8). Источник данных: [open-crypto-puzzles](https://github.com/floflo777/open-crypto-puzzles).

## Кратко
- Статус: **open** (mid)
- Цепь: litecoin
- Приз: 3.02608794 LTC (USD 163)
- Примечание: 302,608,794 litoshis. The pot is topped up by the public: the site invites donations straight into the prize address, which is why there are 8 incoming transactions. LTC was $54.17 when I read the price on 2026-09-12; the repository snapshot price of $54 is used here.
- Опубликовано: 2021-07-25 https://reddit.com/r/ARG/comments/orgh1k/i_made_a_treasure_hunt_with_a_crypto_prize/
- Типы: raw-private-key, image-stego, audio, text-cipher
- Difficulty left: insight
- No compute step is missing. The four segments are independent and each has a perfect test, so one reading of one clue is settled in microseconds. What is missing is two of the eight readings: the writing convention for the 16 characters of clue 6 and what clue 1 asks to be written twice (segment 1), and the string the author drew out of the hidden image of clue 7 (segment 3).

## Адреса/эскроу
- `LUtL7qnm3gzxKjHcfVLSjydqhhinTVmTmS` — prize | expected: 302,608,794 litoshis received over 8 transactions, 0 spent | state: funded-unspent (checked 2026-09-12) | https://litecoinspace.org/address/LUtL7qnm3gzxKjHcfVLSjydqhhinTVmTmS

## Источники
- 2021-07-25 — I made a treasure hunt with a crypto prize, r/ARG announcement — https://reddit.com/r/ARG/comments/orgh1k/i_made_a_treasure_hunt_with_a_crypto_prize/
- 2026-09-09 — p2gtreasure.com, clues, rules and donation address — https://p2gtreasure.com/
- 2026-09-09 — p2gtreasure.com/old/, the original site and its seven rules — https://p2gtreasure.com/old/index.html
- 2026-09-12 — Escrow on litecoinspace, funded and unspent — https://litecoinspace.org/address/LUtL7qnm3gzxKjHcfVLSjydqhhinTVmTmS
- 2021-02-04 — P2G Treasure Hunt gameplay demo, Unity Windows build of 2021-02-04 — https://drive.google.com/file/d/15B7i1EU7OUpc1SXYmSccRLDku4199cSB/view
- 2021-02-05 — Path to Greatness demo trailer, YouTube — https://www.youtube.com/watch?v=T98D6Otefgs
- 2019-03-18 — Seconds of Dream, Path to Greatness Soundtrack, YouTube, the monophonic opening used by clue 6 — https://www.youtube.com/watch?v=EojQgdZeTyM
- 2021-01-07 — Seconds of Dream, album by Justin Patterson, 13 tracks, the source of the four IVs — https://open.spotify.com/album/1pGpPWw8Dl0Uq7n77s4koK
- 2021-01-07 — Seconds of Dream tracklist with durations, iTunes — https://music.apple.com/us/album/seconds-of-dream/1548289299

## Подробности
Здесь должна накапливаться расширенная информация по мере проходов: подсказки, прогресс сообщества, проверенные гипотезы, ссылки, compute-оценки. Текущий файл — скелет из OCP; заполняется автоматически в циклах.


---
## Логирование (обязательно)
См. `../../AGENT_INSTRUCTIONS.md`. Любая значимая находка/прогресс/баланс/решение (полностью или частично) **должна** быть дописана сюда с датой и ссылкой. Параллельные агенты обязаны соблюдать тот же протокол.

## OCP deep docs
- Folder: https://github.com/floflo777/open-crypto-puzzles/tree/main/2-mid-prizes/path-to-greatness-treasure-hunt-3ltc
- README (raw): https://raw.githubusercontent.com/floflo777/open-crypto-puzzles/main/2-mid-prizes/path-to-greatness-treasure-hunt-3ltc/README.md


## Curated deep dive (OCP, 16.10.2026)
- Chain: LTC, P2PKH. 8 ответов → 4 ключа AES-256-CBC:
  - Seg1: imagine 16 + beach 16, IV few_n_far_btween
  - Seg2: chess 12 + wonders 20, IV nocturnal_sugars
  - Seg3: wasd 8 + ship 24, IV colors_on_leaves
  - Seg4: scramble 15 + sky 17, IV seconds_of_dream
- Источники: p2gtreasure.com, YouTube UCrwC8bYZ_Yyum9gj4OHVEiQ (3 видео вкл. Soloville).
- Ни один из четырёх замков не вскрыт. AES-оракул ~3.2M ключей/с на ядро.
- Подсказки: clue1 «Imagine» (Леннон + 19410712), clue6 «Beach» (15 нот → 16 символов).
- Зацепки: re-check 64-bit verifiers (\(8\) допустимых последних слов), построить словари из 8 ответов.
## Досье Hark v2 (16.10.2026)

Перенесено из `MASTER_CATALOG_v2_2026-10-16.md` (рабочие досье агентов Hark, 16.10.2026 23:40 МСК). Картина механизма, подсказок, проверенных и отброшенных гипотез, оракулов и файлов.

### A4. Path to Greatness — 3,02608794 LTC
- **→ Полное актуальное досье (что решено, что проверено, что осталось): ЧАСТЬ 8.3 (Path to Greatness).** Старая краткая запись заменена.


### Path to Greatness — 3,02608794 LTC
- **Адрес/сеть**: `LUtL7qnm3gzxKjHcfVLSjydqhhinTVmTmS` (Litecoin). **Баланс**: 302 608 794 литоши, 8 входящих tx, 0 отправлено, мемпул пуст — последняя наша проверка 13.10.2026 16:30 +04 (litecoinspace/blockcypher; затем каталог отмечает ту же сумму на 14.10). Не тронут.
- **Выплата при решении**: свип сразу на LTC-адрес Ильи `ltc1qkekjqn9yl0h5quwy42p7zqjuz3t4dmfarx8wtq` (указал 12.10 18:15).
- **Источники**: сайт p2gtreasure.com (+ /old/p2g.html); OCP `github.com/floflo777/open-crypto-puzzles/tree/main/2-mid-prizes/path-to-greatness-treasure-hunt-3ltc` (README, analysis/leads.md, tested.md ≈5,7·10¹² негативов, tools/oracle.py); демо игры (Unity, Google Drive id `15B7i1EU7OUpc1SXYmSccRLDku4199cSB`, 134 МБ); YouTube-канал автора UCrwC8bYZ_Yyum9gj4OHVEiQ (3 видео: T98D6Otefgs анонс 05.02.2021, LxcJ3eqM2Rc «Soloville», EojQgdZeTyM «Seconds of Dream»); второй канал автора @jpatt194 (UCd31L914iVvaFMwEbN-7izQ, полный альбом Archaic Reveries lS7VW3az4Zs). Альбомы автора: «Seconds of Dream» (iTunes 1548289299, 13 треков) и «Archaic Reveries» (1398628401, 8 треков).
- **Механизм** (схема автора с computer_screen.jpg): 8 ответов (длины 16,15,8,12,20,16,24,17; пробелы убраны; lowercase, кроме chess) → 4 ключа AES-256-CBC, каждый шифрует 1 блок; super_key расшифровывает WIF.
  - Seg1 = imagine(16) + beach(16), IV `few_n_far_btween`
  - Seg2 = chess(12, регистр сохраняется) + wonders(20), IV `nocturnal_sugars`
  - Seg3 = wasd(8) + ship(24), IV `colors_on_leaves`
  - Seg4 = scramble(15) + sky(17), IV `seconds_of_dream`
  - Оракул: открытый текст блока должен кончаться паддингом (PKCS7 8×0x08 → ложные срабатывания 2⁻⁶⁴). 13.10 введён «relaxed padding» (`seg_rp`: любые 8 одинаковых байт или ANSI X.923), потому что PKCS7 нигде не доказан.
  - Аудит 15.10: MITM по половинам ключа невозможен (раунд-ключи K2..K14 смешивают обе половины) → замки вскрываются только трактовкой подсказок.
- **Подсказки и наши чтения**:
  - Clue 1 «Imagine» (пародия на Леннона + число 19410712): «the infamous way» = формат YYYYDDMM по примеру 19410712 (Пёрл-Харбор); ответ = (1941+N)0712, записанный дважды; N = число погибших (не установлено). Вариант «for→4 ⇒ 1945» — лишь догадка. Цифровые формы покрыты полностью (см. ниже).
  - Clue 6 «Beach» (аудио: «counting starts with a deer / pattern starts with the sun / note the first fifteen you hear»): 15 нот → 16 символов (лишний символ не объяснён). Мелодия с YouTube (A#5 F#5 B5 A#5 F#5 D#5 F5 C#5 B4 C#5 A#4 …) подтверждена независимо 13.10; в игре с t=0 звучит другая (D#5 F5 F#5 F5 D#5 A#4 B4 F#4 …); «Lost and Found» (Archaic Reveries) — D4 E4 F4 E4 D4 C4 D4 C4 A3 …; Soloville — ре-минорная, отдельно. Чтения «deer = do, sun = re (ре, а не соль)» → тоника G#, нота F — единственная хроматическая (даёт 16-й символ); также соль-правило, ступени от тоники, сольфеджио-буквы.
  - Clue 5 «Wonders» (пиктограммы + числа 12772 mi, 5210 km, 12061 mi): строки 4–8 стиха — цитаты чужих песен: Hávamál (Falkenbach), Nightwish «Ghost Love Score», Pink Floyd «High Hopes», Coheed and Cambria «Three Evils», Alestorm «Treasure Island»; L2 ≈ Vintersorg. Пиктограммы ↔ эти песни (призрак с сердцем = GLS, три демона = Three Evils, рогатый шлем = Hávamál, якорь = Alestorm, star?star = Vintersorg «Astral & Arcane»). Ряды: GLS ▼ HighHopes ▶ 12772; Alestorm ▲ ThreeEvils ◀ 5210; Hávamál ▲ Astral&Arcane ▶ 12061. Операция, связывающая пару песен с числом, не найдена. Литерал «12772mi5210km12061mi» ровно 20 символов — проверен, 0.
  - Clue 4 «Chess» (стих «From the front lines to the throne», «A period of madness / From a symbol that's flown»): позиция сконструирована (не мат в 2 — поправка 13.10; нет мата ≤4 по Stockfish 17; источник в базе lichess не найден). На доске следы монтажа: вклеенная область A {b8–h8, c7–h7, c6–h6} (Re8 c7 f7 d6 Nf6 g6) и метки в углах c3 (пешка) и c2 (король) — «от передовой до трона». Лучшее чтение белых: Ng5Bd4Qb3Kc2.
  - Clue 3 «WASD» (сетка стрелок с числами): один цикл из 92 клеток + ровно 4 «хвоста» без предшественника — (r1,c2) 5→, (r4,c9) 2↑, (r8,c10) 4←, (r9,c1) 1↓ (четыре разных направления) + 4 изолированные звезды 1–4; ни одна стрелка не ведёт на звезду или за край (≈2 % случайно → задумано). Ни одна механика не даёт однозначной 8-клавишной строки. Топ-кандидаты: `$W/ptg/s21g/TOPLEFT.txt` (7s1a9d4w, 2w1s5d4a, 5d2w4a1s, d3w1as24, 53214124, 64283188, g5c9d2i9).
  - Clue 7 «Ship» (Ship.png): **установлено** — это отредактированное фото Wikimedia «RMS Titanic 3.jpg» (ревизия 11.12.2018); три правки: стих, водяной знак в небе **«clue 8 in sand»**, имя на носу заменено на **SIMOISIAYSC** = инициалы реплики Эндрюса из фильма 1997: «**S**he **i**s **m**ade **o**f **i**ron, **s**ir! **I** **a**ssure **y**ou, **s**he **c**an». Красный LSB: монтаж Исмей (Джонатан Хайд) слева, Эндрюс (Виктор Гарбер) справа + чертёж носа с надписями палуб. Ship (24) привязан к этой сцене, но конкретная строка не найдена.
  - Clue 8 «Sky» (панель-пример, 13 клеток `ehk-bqNEFRUn`… ↔ 13 треков SoD; правило «4 → Exit Light → T», «8 → Ghost March → R»: число = индекс буквы в названии трека). Песок Beach.png несёт пиксельный текст 3×5: **`G0dcbA-A`** (8) и **`80f9Fk-FC`** (9) → 8+9 = 17 = длина sky; слева рамка 10×10 с подписями углов 00/90/09/99, нарисованная как 4 уголка без середины.
  - Clue 2 «Scramble» (41-буквенное предложение, правило «capital: addition, lower: subtract»): строка S делится ровно на 15 токенов вида [строчные/тире][Заглавная] — по одному на символ scramble; значения токенов (−22,16,5,6,4,4,−5,−40,15,−8,−4,−31,−23,−12,2) в английский текст не переводятся.
- **Что установлено/решено** (ни один замок не вскрыт):
  - Файлы подсказок финальные и уникальные (все снимки Wayback 2022–2026 = SHA1 наших файлов; аудит данных 13.10). В демо нет QR/beach/ship-текстур; Beach/Ship с Drive байт-в-байт равны файлам сайта. Твит автора 16.05.2021: «All the clues are now posted… no need to download the demo».
  - Лексика clue 5 = цитаты песен; bow = акроним реплики Эндрюса; «clue 8 in sand» → текст на песке; рамка-уголки на песке.
  - Позиционная SoD-расшифровка примера clue 8 (вперёд, регистр игнорируется) даёт `notth##io###a` (5 клеток вне длины названия), null-тест p≈0,003–0,008 — **умеренный сигнал**, но противоречит печатному примеру 2.
  - Холодные пересборки A/B (13.10, вслепую) вывели ту же структуру — якорения на ложной схеме не обнаружено.
- **Проверено и отброшено** (ориентировочно наш вклад >5·10¹⁰ ключей сверх ~5,7·10¹² OCP, всё = 0; свидетели-witness перепроверялись перед прогонами):
  - Lock 1: imagine = все 8-цифровые блоки дважды (d8x2, 1e8) × сотни/тысячи форм beach (YouTube, игровая, onset-15, G#-re, сольфеджио, октавные метки, вставка любого из 94 символов) → 0 (сессии 2–18, ~4·10¹⁰); imagine = любой год 1941–9999 + 0712 во всех порядках × 3 623 формы beach → 0; даты прописью / с разделителями / «каждый символ дважды» / зеркало → 0; «Lost and Found» 16-нотные формы × 1 685 403 форм imagine + 15 нот с любым вставленным символом × все imagine = 1,25·10¹⁰ → 0 (13.10 16:40). Вывод: lock 1 блокирует запись beach (15→16), а не imagine.
  - Lock 2: шахматные чтения × песенные/числовые токены wonders (14,9M), литерал wonders, широкие 20-символьные формы wonders 137k × 7 285 шахматных = 10⁹ → 0; таблица Менделеева, география 26 «чудес» → 0. «Мат в 2» — ошибка (1.Qxb6+ cxb6).
  - Lock 3: ship = btscssimoisiayscaswiiamc, simoisiaysc+thomasandrews, jonathanhydevictorgarber, ismaybutthisshipcantsink, nearermygodtothee+bethany/horbury, sheltersaloonuppermiddle, songedautomne… — каждая × ВСЕ {0-9wasd}⁸ (1,48·10⁹) → 0; 9 617 ship-кандидатов (`$W/ptg/s20l3/ship_UX.txt`) × {w,a,s,d}⁸, {W,A,S,D}⁸, {^<v>}⁸ и структурные left → 0. Вывод аналитиков: блокер, вероятно, сетка WASD.
  - Lock 4: «not the middle» как истина отброшен (null-тест: свободный 5-титульный шифр даёт английский почти из любой строки); scramble-семейства × sky (песок, шаблоны) — сотни миллионов, scrS × skyBig 1,39·10⁹ → 0.
  - Порядок половин/перестановка CT/IV (kord/, 1,74·10⁹ ключей, 6 IV) → 0. Аудио/стего в Beach.png (биты, сигнатуры) → пусто. Публичных решений/обсуждений сверх OCP, agntn и r/ARG нет.
- **Что осталось / следующий шаг** (только инсайт, без массового перебора — указание Ильи 13.10 09:39: прогоны <10⁹ и под конкретное чтение):
  1. Lock 1: правило записи 15 нот → 16 символов (или иной источник мелодии).
  2. Lock 2: операция «пара песен → число» в wonders (длительности/номера/даты точных версий; ▲▼ как чарты).
  3. Lock 3: механика сетки WASD → 8 клавиш; ship — производная строка из сцены Исмей/Эндрюс.
  4. Lock 4: правило overflow для 5 клеток примера clue 8, затем применить к 17 клеткам песка; правило clue 2 → 15 символов.
  - Не перезапущены после рестартов: полосы `s19l3` (isamathematicalcertainty, jbruceismaythomasandrews × {0-9wasd}⁸) и `s21g/runpa.sh` — результатов нет.
- **Оракул, скорость, файлы/скрипты**:
  - `$W/ptg/seg.c` / `$W/ptg/seg` (AES ARMv8, ~3,2·10⁶ ключей/с/ядро; режимы file:, d8x2, sep8x2, cs:); relaxed-padding: `$W/ptg/s15/seg_rp`, `pat_rp`, `ins_rp`; многоCT/IV: `$W/ptg/kord/segk.c`. Полная цепочка: `PYTHONPATH=pylib python3 $W/ptg/p/tools/oracle.py --answers …` (selftest OK). Сборка через zig (`$W/ptg/pylib`), gcc в песочнице нет.
  - Заметки: `$W/ptg/NOTES.md` (104 КБ, по сессиям), `$W/ptg/INSIGHTS.md` (84 КБ, по замкам), `$W/ptg/audit/DATA_AUDIT.md`, `$W/ptg/cold/A_readings.md`, `B_readings.md`.
  - Данные: аудио `$W/ptg/audio/game/album_from_demo.ogg`, `$W/ptg/audio/yt/*.mp3` (soloville, secondsofdream, archaic_reveries, lostandfound); текстуры без потерь `$W/ptg/demo/tex/*.png`; OCP-копия `$W/ptg/p/`.
- **Проекты Hark и статус**: работа велась в проекте «работа» (`b6983d3d…`), сессии 1–22 с 12.10 по 13.10. Задачи: ежечасная `48f4c59c-e1ff-40ee-931c-bca6282035a7` (13.10 15:50 переведена на 1 сессию/день в 14:00 MSK до 19.10) и ежедневная `85082f68-1d68-42f2-bd6f-06584d1a1c5f`; 14.10 22:00 все загадки отменены — актуальный статус задач по файлам не подтверждён (вероятно, остановлены). Ключ не найден, ничего не свипалось.
- **Оценка шансов**: 2–4 % (аудит 15.10, ярус 3). Сильная сторона — быстрый точный оракул; слабая — все 4 замка закрыты, решающий шаг — трактовка, а не вычисление.

## Оперативный статус v2 (16.10.2026 ~23:30 МСК)

Строка из сводной таблицы `MASTER_CATALOG_v2` (Часть 0.3):

| Path to Greatness | 3,02608794 LTC, не тронут | 2–4% | 4 AES-замка закрыты; новые зацепки по кораблю/песку/песням — 8.3 | заморожено |

## Досье agntn/puzzles (16.10.2026)

Перенесено из реестра [@agntn/puzzles](https://puzzles.agntn.dev/collections/path-to-greatness) (raw: https://puzzles.agntn.dev/collections/path-to-greatness.md). Ниже — разбор первоисточника: механика, кто решал, что проверено.

- `id`: "path-to-greatness"
- `chain`: "litecoin"
- `address`: "LUtL7qnm3gzxKjHcfVLSjydqhhinTVmTmS"
- `sourceUrl`: SITE
- `startedAt`: "2021-02-05 19:02:37"
- `prize`: 3.02608794

> A 2021 Litecoin treasure hunt from an indie game developer. The clues sat inside a parkour game demo and later on the hunt's page as nine images. Nobody has taken the prize.

February 5, 2021, 19:02 UTC. A 50 second [trailer](https://www.youtube.com/watch?v=T98D6Otefgs) goes up on the Path to Greatness YouTube channel, "Treasure Hunt Announcement". Justin Patterson builds that 3D parkour platformer on his own, and the free [gameplay demo](https://drive.google.com/file/d/15B7i1EU7OUpc1SXYmSccRLDku4199cSB/view) sits on Google Drive, a 128 MB Windows build whose files are dated the day before. You run an obstacle course, collect orbs, turn on lava if you want. And the demo is also "a delivery system for something else":

> Clues can be found inside the demo, and will lead you to a Litecoin wallet's private key.

The prize is whatever that wallet holds. Donations raise it, and it has only grown. Nothing has ever left the address.

## What's in the clues

By May 2021 the clues are on the web too. The [hunt's page](https://p2gtreasure.com/) shows nine images, also as `p2g_clues.zip`. Five are rooms from the game, each with text on the far wall: a poem that starts "Imagine all the people", a scrambled block of letters, a grid of numbers titled "wasd", a chess position under a short verse, and a poem about the eight wonders with rows of symbols. A sixth room, `00111111`, has sketches and faint marks. The last two are QR codes.

The ninth image is the one that explains the rest. It's a fake desktop with four windows:

- **litecoin_wallet.txt**: the address and the private key as a WIF, encrypted with a `super_key`. AES 256-bit, CBC, IV `goodluck_havefun`.
- **super_key_segments.sheet**: the super key in four encrypted segments of 8 bytes. Each one has its own IV and names the two clues that make its key, clue 1 + 6, 4 + 5, 3 + 7 and 2 + 8.
- **clues.sheet**: eight clues by name, imagine, scramble, wasd, chess, wonders, beach, ship and sky, with the segment each one feeds and its byte range. Two answers fill 32 bytes together.
- **fix_clues.script**: remove the spaces from every answer and lowercase all of them except clue 4. "A monkey on a typewriter wrote this at some point in time."

So the structure is out in the open. Eight answers, four AES keys, one super key, one WIF. The five room images are named after the first five clues. Beach, ship and sky don't appear as an image name anywhere, so those three are still somewhere in the pictures or in the demo.

### The IVs are song titles

A month before the hunt, on January 7, 2021, Justin Patterson released an album, [Seconds of Dream](https://music.apple.com/us/album/seconds-of-dream/1548289299), thirteen tracks, also on [Spotify](https://open.spotify.com/album/1pGpPWw8Dl0Uq7n77s4koK). Put its track list next to the segment sheet. `few_n_far_btween` is track 1, Few and Far Between. `nocturnal_sugars` is track 6, Nocturnal Sugars. `seconds_of_dream` is the title track, which the game's channel posted back in 2019 as the [Path to Greatness soundtrack](https://www.youtube.com/watch?v=EojQgdZeTyM). Only `colors_on_leaves` isn't on the album.

An IV isn't secret, so this opens nothing by itself. Three of four names off one album of his is still hard to call a coincidence.

The rules say it plainly: "The first and last steps are the only steps I will ever provide." Download the demo, and sweep the wallet. Everything in between is yours.

## Nobody took it

July 25, 2021, the author [posted the hunt to r/ARG](https://www.reddit.com/r/ARG/comments/orgh1k/i_made_a_treasure_hunt_with_a_crypto_prize/): 3 LTC in the wallet, about $375 then. He was proud of the puzzles and was "having a hard time finding" the people who'd enjoy them. One commenter said they had figured some parts out. A month later he [wrote](https://www.reddit.com/r/ARG/comments/orgh1k/i_made_a_treasure_hunt_with_a_crypto_prize/haakcwj/) that he knew of no online community working on it, "only a few private efforts through DMs".

## What the chain shows

The first coins arrived on 2021-02-02 at 14:57 UTC, 0.03477051 LTC, three days before the trailer. Three more deposits came on February 5, hours before it. One on February 12 came from the second address the first site asked people to donate to, the one that split every donation between the game and the prize. Two more followed in May 2021, and the largest, 1.8999958 LTC, on 2021-07-22.

Eight deposits in all, and not a single spend. The page's own rule for the ending is the balance: "If the prize value shown above becomes zero (or close to zero), it means that someone has won and the treasure hunt is over." It isn't zero.

## What the Path to Greatness record carries

```ts [src/collections/path-to-greatness.ts]
export const treasureHunt = puzzle({
  id: "path-to-greatness",
  chain: "litecoin",
  address: "LUtL7qnm3gzxKjHcfVLSjydqhhinTVmTmS",
  sourceUrl: SITE,
  startedAt: "2021-02-05 19:02:37",
  prize: 3.02608794,
  hints: [
    official("Clues can be found inside the demo, and will lead you to a Litecoin wallet's private key.", OLD, confirmation(CAPTURE, …)),
    official("The first and last steps are the only steps I will ever provide.", RULES),
    official("The clues above will lead to a Litecoin wallet's private key.", SITE, confirmation(CLUES_CAPTURE, …)),
  ],
  transactions: [funding(/* 2021-02-02, 0.03477051 LTC */), increase(/* seven more, to 2021-07-22 */)],
  assets: assets({ puzzle: "computer-screen.jpg", hints: ["clue1-imagine.jpg", …, "qr2.jpg"], sourceUrl: "https://p2gtreasure.com/Clues/p2g_clues.zip" }),
});
```

### Started at the trailer

`startedAt` is the moment the announcement trailer went public, 19:02:37 UTC, from YouTube's own publish date. The coins came first, three days earlier, and keep their own date on the `funding`.

### The prize is the wallet

The first deposit was 0.03477051 LTC, and the author says the prize is the balance, donations included, so `prize` is everything the address received, 3.02608794 LTC. The first deposit is the `funding`, the other seven are `increase`.

### The author's hints

Two come from the first site, which lives on under `/old/`: where the clues are and what they lead to, and the rule about the first and last steps. The third is the same promise on the current page, pointing at the images. The first and third carry a Wayback capture as their `confirmation`, from February and May 2021. The desktop image isn't retyped into a hint. It's the `puzzle` asset, and the other eight images are hint files, byte for byte the files in the author's zip.

### No public key yet

The address has never spent, so the chain hasn't shown its key. `pubkey` stays absent until it does.

## The Path to Greatness record

## OCP: машинные данные (puzzles.json, 16.10.2026)

Структурированные данные из `puzzles.json` репозитория [open-crypto-puzzles](https://github.com/floflo777/open-crypto-puzzles) (snapshot OCP: 2026-09-12; цены: {'date': '2026-08-16', 'BTC': 63000, 'ETH': 1880, 'AR': 1.81, 'LTC': 54}).

- `slug`: path-to-greatness-treasure-hunt-3ltc
- `title`: Path to Greatness: Treasure Hunt
- `status`: **open**
- `tier`: mid | `chain`: litecoin
- `series`: None
- `author`: Justin Patterson | jpatt94, jpatt194
- `prize`: 3.02608794 LTC (оценка $163 на 2026-08-16) — 302,608,794 litoshis. The pot is topped up by the public: the site invites donations straight into the prize address, which is why there are 8 incoming transactions. LTC was $54.17 when I read the price on 2026-09-12; the repository snapshot price of $54 is used here.
- `published`: 2021-07-25 https://reddit.com/r/ARG/comments/orgh1k/i_made_a_treasure_hunt_with_a_crypto_prize/
- `puzzle_type`: raw-private-key, image-stego, audio, text-cipher
- `target_format`: Litecoin WIF, version byte 0xB0 so the string starts with T (compressed) or 6 (uncompressed), encrypted with AES-256-CBC under a 32-byte super_key and the IV goodluck_havefun; the address is P2PKH version 0x30
- `difficulty_left`: insight
- `difficulty_note`: No compute step is missing. The four segments are independent and each has a perfect test, so one reading of one clue is settled in microseconds. What is missing is two of the eight readings: the writing convention for the 16 characters of clue 6 and what clue 1 asks to be written twice (segment 1), and the string the author drew out of the hidden image of clue 7 (segment 3).
- `tested_total`: {'candidates': 5690021893966, 'families': 37, 'certified': True}

**Адреса и проверенное состояние:**
- `LUtL7qnm3gzxKjHcfVLSjydqhhinTVmTmS` — escrow | prize | ожидается: 302,608,794 litoshis received over 8 transactions, 0 spent | проверено 2026-09-12: **funded-unspent**
  - https://litecoinspace.org/address/LUtL7qnm3gzxKjHcfVLSjydqhhinTVmTmS

**Деривация:**
- The author published the whole scheme on his own clue image computer_screen.jpg. The 8 clue answers concatenate to 128 ASCII characters, which are four AES-256 keys. The 32-byte super_key is cut into four 8-byte segments, each encrypted separately in AES-256-CBC under its own 16-character IV (an album track title), with the key being two clue answers concatenated. Each segment ciphertext is one block holding 8 useful bytes, so its plaintext must end with a PKCS7 padding of eight 0x08 bytes: that is an exact per-segment oracle with a false positive rate of 2^-64, and it needs nothing from the other six answers. The super_key then decrypts the 64-byte WIF blob, and the WIF gives the address through secp256k1, hash160 and base58check 0x30.
- оракул: `tools/oracle.py` | сертифицирован: True
- сверено с: the canonical secp256k1 and hash160 vectors for private key 1 (1BgGZ9tcN4rm9KBzDn7KprQz87SZ26SAMH and 1EHNa6Q4Jz2uvNExL497mE43ikXhwF6kZm), eight keys cross-checked between coincurve and the pure Python ecdsa package, the Litecoin version bytes and WIF encoder cross-checked against a third library, synthetic witnesses on both AES layers with 1,024 neighbouring keys rejected, three control negatives, and the author's own arithmetic (8 answer lengths summing to 128, four 16-character IVs, four 16-byte ciphertexts, a 64-byte WIF blob, base64 canonicity of the 22nd character)

**Зацепки (OCP `leads`):**
  - title: Segment 1: the 16th character of beach, and how imagine is written | status: open
  - title: Segment 1: imagine may not be a date, but the word the song replaced | status: open
  - title: Segment 3: the string the author drew out of the Titanic montage, as a description rather than a quotation | status: open
  - title: Segment 4: the pairing rule between the 17 digits of clue 8 and the 13 album tracks | status: open
  - title: Segment 2: identify the six pictograms of clue 5 | status: open

**Артефакты (OCP `artifacts`):**
  - source: https://p2gtreasure.com/Clues/computer_screen.jpg
  - source: https://p2gtreasure.com/Clues/clue1_imagine.jpg
  - source: https://p2gtreasure.com/Clues/clue2_scramble.jpg
  - source: https://p2gtreasure.com/Clues/clue3_wasd.jpg
  - source: https://p2gtreasure.com/Clues/clue4_chess.jpg
  - source: https://p2gtreasure.com/Clues/clue5_wonders.jpg
  - source: https://p2gtreasure.com/Clues/00111111.jpg
  - source: https://p2gtreasure.com/Clues/qr1.jpg
  - source: https://p2gtreasure.com/Clues/qr2.jpg
  - source: https://p2gtreasure.com/treasure_chest.png
  - source: https://drive.google.com/file/d/1Z6hDNcfWfVwNkJJ1l4DvZm-MbuQD8Y6N/view (reached from the QR code clues/qr1.jpg through tinyurl.com/y6c6o3uj)
  - source: https://drive.google.com/file/d/1jzxIFQGmTnR3EB42bd-DPEJfe655XbhG/view (reached from the QR code clues/qr2.jpg through tinyurl.com/y28knqz3)

**Материалы третьих лиц:**
- Only the author's own published puzzle files are shipped here: the nine clue images served by p2gtreasure.com, the site banner, and the two lossless carriers Beach.png and Ship.png that his QR codes point at. Not shipped, and not to be added: the game demo p2g_demo.zip (134 MB, Google Drive, the author's own but far over the repository size limits), the album audio embedded in it or published on Spotify and iTunes, any frame or transcript of the 1997 film Titanic that the clue 7 montage is built from, and the audio of the author's YouTube video EojQgdZeTyM. All four are linked by URL instead. The clue poems are quoted in short excerpts only, in clues/author-posts.md.

**Источники (OCP `sources`):**
  - url: https://reddit.com/r/ARG/comments/orgh1k/i_made_a_treasure_hunt_with_a_crypto_prize/ | title: I made a treasure hunt with a crypto prize, r/ARG announcement | date: 2021-07-25
  - url: https://p2gtreasure.com/ | title: p2gtreasure.com, clues, rules and donation address | date: 2026-09-09
  - url: https://p2gtreasure.com/old/index.html | title: p2gtreasure.com/old/, the original site and its seven rules | date: 2026-09-09
  - url: https://litecoinspace.org/address/LUtL7qnm3gzxKjHcfVLSjydqhhinTVmTmS | title: Escrow on litecoinspace, funded and unspent | date: 2026-09-12
  - url: https://drive.google.com/file/d/15B7i1EU7OUpc1SXYmSccRLDku4199cSB/view | title: P2G Treasure Hunt gameplay demo, Unity Windows build of 2021-02-04 | date: 2021-02-04
  - url: https://www.youtube.com/watch?v=T98D6Otefgs | title: Path to Greatness demo trailer, YouTube | date: 2021-02-05
  - url: https://www.youtube.com/watch?v=EojQgdZeTyM | title: Seconds of Dream, Path to Greatness Soundtrack, YouTube, the monophonic opening used by clue 6 | date: 2019-03-18
  - url: https://open.spotify.com/album/1pGpPWw8Dl0Uq7n77s4koK | title: Seconds of Dream, album by Justin Patterson, 13 tracks, the source of the four IVs | date: 2021-01-07
  - url: https://music.apple.com/us/album/seconds-of-dream/1548289299 | title: Seconds of Dream tracklist with durations, iTunes | date: 2021-01-07

---

## Оперативный статус (17.10.2026, ~23:20 МСК) — Big Pickle (OpenCode, Windows)

**Сделано: папка впервые получила все медиа пазла** (раньше были только тексты OCP):

- Скачано с `p2gtreasure.com` (нужен полный браузерный `User-Agent`+`Accept` — иначе сервер отдаёт `406`): `data/site/Clues__p2g_clues.zip` и все 9 подсказок (`00111111.jpg`, `clue1_imagine.jpg`, `clue2_scramble.jpg`, `clue3_wasd.jpg`, `clue4_chess.jpg`, `clue5_wonders.jpg`, `computer_screen.jpg`, `qr1.jpg`, `qr2.jpg`), плюс `treasure_chest.png`, `lookingood.css`, `old__index.html`.
- **Разрешены оба QR** → Google Drive → скачаны **два без потерь носителя**: `data/site/Beach.png` (clue 6, аудио) и `data/site/Ship.png` (clue 7, стего, 1920×1080).
- Сохранены первоисточники OCP: `data/site/ocp__README.md`, `ocp__analysis__leads.md`, `ocp__analysis__tested.md`, `ocp__clues__author-posts.md`.
- **Треклист альбома** «Seconds of Dream» (13 треков, iTunes API) → `data/album_tracklist.json` (словарь подсказки 8).

**Проверки:** приз жив (`LUtL7qnm…` = 302,608,794 litoshi, 8 tx, 0 трат, blockcypher). `Ship.png` подтверждён как стего (`R&0xFE==G&0xFE` 100 %, красный LSB mean **0.2502**); красный LSB извлечён (`data/site/ship_redlsb_{raw,3x3}.png`), **текста в скрытой картинке нет** (дизеренный фотомонтаж). OCR подсказок 8 и computer_screen воспроизводит панель правила и всю схему. **Подсказка 8:** оба свидетеля сходятся при чтении «число = позиция буквы в названии трека» (`ExitLight[4]=t`, `GhostMarch[8]=r`); строка → 17 цифр `58112171456182114`; правило выбора трека для 13 ячеек — **открыто**.

**Итог:** медиа-пробел закрыт; для победы остаются инсайты по 2 из 8 ответов (clue 6 аудио — нужен доступ к YouTube; clue 7 — стего извлечён). Детали — `LOG.md` за 17.10.
