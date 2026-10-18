# BLM Collage: Welcome to the Brave New World

Индекс: [MASTER_CATALOG.md](../../MASTER_CATALOG.md) (Части 1-8). Источник данных: [open-crypto-puzzles](https://github.com/floflo777/open-crypto-puzzles).

## Кратко
- Статус: **open** (big)
- Цепь: bitcoin
- Приз: 20107284 sats (USD 12668)
- Примечание: 0.20107284 BTC, funded 2020-05-10 in 5 transactions, before the puzzle post
- Опубликовано: 2020-10-08 https://www.reddit.com/user/stsh_n/comments/j79zvj/bitcoin_puzzle_2000/
- Типы: image-stego, word-selection, bip39-seed, text-cipher
- Difficulty left: insight
- the derivation, both candidate formats, and every path are fully mapped and oracle-certified; about 479 million derivations have been tested across anchor-based and anchor-free families (including 7.2 billion GPU sequences over a 13-word pool with no fixed positions), all negative; the 4 word-position anchors that framed nearly all of that work trace to 2 Reddit accounts with zero posts about this puzzle and are retracted here, so what remains open is the 12-word input, not compute or path coverage

## Адреса/эскроу
- `1KfZGvwZxsvSmemoCmEV75uqcNzYBHjkHZ` — main | expected: 20107284 sats | state: funded-unspent (checked 2026-08-16) | https://mempool.space/address/1KfZGvwZxsvSmemoCmEV75uqcNzYBHjkHZ

## Источники
- 2020-10-08 — u/stsh_n, Bitcoin puzzle (2000$) — https://www.reddit.com/user/stsh_n/comments/j79zvj/bitcoin_puzzle_2000/
- 2026-08-16 — Is this puzzle still valid?, r/bitcoinpuzzles — https://www.reddit.com/r/bitcoinpuzzles/comments/jrr7mo/is_this_puzzle_still_valid_is_this_image_correct/
- 2026-08-16 — BitcoinTalk topic 5404767 — https://bitcointalk.org/index.php?topic=5404767.0

## Подробности
Здесь должна накапливаться расширенная информация по мере проходов: подсказки, прогресс сообщества, проверенные гипотезы, ссылки, compute-оценки. Текущий файл — скелет из OCP; заполняется автоматически в циклах.


---
## Логирование (обязательно)
См. `../../AGENT_INSTRUCTIONS.md`. Любая значимая находка/прогресс/баланс/решение (полностью или частично) **должна** быть дописана сюда с датой и ссылкой. Параллельные агенты обязаны соблюдать тот же протокол.

## OCP deep docs
- Folder: https://github.com/floflo777/open-crypto-puzzles/tree/main/1-big-prizes/blm-brave-new-world-0-2btc
- README (raw): https://raw.githubusercontent.com/floflo777/open-crypto-puzzles/main/1-big-prizes/blm-brave-new-world-0-2btc/README.md


## Curated deep dive (OCP, 16.10.2026)
- Баланс 20 107 284 сат, 5 tx, 0 трат. Collage 1600×1200, SHA256 d0b04378f75d63997b8034ec2ef1bdd108178e4546de78237bd35abf4189a782.
- Руны (кириллица): «Здесь зашифрованы биткоины на чёрный день номер X», «Я надеюсь что сюда будут присылать много биткоинов», «Сумма двух чисел». TUESDAY (Bill Cipher над Трампом) = 3.11.2020.
- Часовые позиции (verified): секундная MOON (12-1→13), минутная TOWER (1-2→3), часовая (10-11→21), показывает 10:07, повёрнуты ~73°.
- 25 строк микротекста = WELCOME TO THE BRAVE NEW WORLD (12+13); опечатки whitepaper.
- Пул-15 для пустых слотов: welcome brave world peace end one more real order proof first food time stock power.
- Проверено: 278+ млрд дериваций (rarsn4), 377 млрд (ArmaCorex), 7.2 млрд GPU (OCP). Формат-конфликт breathe (Electrum) vs this/food (BIP39).
- Зацепки: H2 (21 слово) ~1.2e7; H3 (24 слова) ~2e10 GPU; проверить Electrum v2 (40/42 слов совместимы).
## Досье Hark v2 (16.10.2026)

Перенесено из `MASTER_CATALOG_v2_2026-10-16.md` (рабочие досье агентов Hark, 16.10.2026 23:40 МСК). Картина механизма, подсказок, проверенных и отброшенных гипотез, оракулов и файлов.

### B1. BLM «Brave New World» — 0,20107284 BTC
- **→ Полное актуальное досье (что решено, что проверено, что осталось): ЧАСТЬ 8.4 (BLM).** Старая краткая запись заменена.


### BLM «Brave New World» — 0,20107284 BTC
- **Адрес/сеть/путь**: BTC mainnet, `1KfZGvwZxsvSmemoCmEV75uqcNzYBHjkHZ` (P2PKH). Формат не установлен: BIP39 или old-Electrum v1. Наш стандарт проверки: пути m/44'/0'/0'/0/0, m/0/0, m/0'/0/0, m/49', m/84' (последние две — по hash160 как P2PKH), сжатый и несжатый ключ.
- **Баланс**: 20 107 284 сат, 5 входящих tx, трат 0. Проверено 14.10 22:05 MSK (bal_2026-10-14.txt). 15.10 01:45 MSK приз на месте (аудит).
- **Источники**:
  - Автор u/stsh_n, Reddit, 08.10.2020, «Bitcoin puzzle (2000$)», одна картинка: https://www.reddit.com/user/stsh_n/comments/j79zvj/bitcoin_puzzle_2000/
  - Репо сообщества: https://github.com/jmr2704/bitcoin-0.2-image-puzzle (копия `/workspace/work/blm/repo_README.md`).
  - OCP: https://github.com/floflo777/open-crypto-puzzles/tree/main/1-big-prizes/blm-brave-new-world-0-2btc (копия `/workspace/work/blm/ocp/`: README, analysis/tested.md, leads.md, clues/*.png, tools/oracle.py).
  - bitcointalk: https://bitcointalk.org/index.php?topic=5404767.0 — обсуждение сообщества, не материал автора.
  - Ещё в каталоге: HomelessPhD/BLM_0.2BTC, rarsn4/blm-0.2btc-analysis, Dileep-Kumar-5/blm-puzzle-analysis, grokipedia. В наших файлах их нет и мы их не открывали.
- **Механизм**: README сообщества: «You will need to guess the: Words to use. Correct order of the words. Correct length.» Сообщество записывает слова как «число → BIP39[число−1]». ПК-агент Ильи сверил все 43 пары README: 43/43 (`HANDOVER_ilya_2026-10-14.md`, §2.1). Оговорка: числа вычислило само сообщество, это не канал извлечения слов из картинки.
- **Изображение**: 1600×1200, это максимум, другого разрешения нет (OCP). Стего, EXIF, LSB, альфа-канал чистые. Ончейн-данных в funding-tx нет: нет ни OP_RETURN, ни данных в witness (HANDOVER §3).
- **Подсказки и наши чтения**:
  - Руны решены сообществом, заново не транскрибировать:
    - правая колонка: «ЗДЕСЬ ЗАШИФРОВАНЫ БИТКОИНЫ НА ЧЁРНЫЙ ДЕНЬ НОМЕР Х»;
    - ещё две строки: «Я надеюсь что сюда будут присылать много биткоинов» и «Сумма двух чисел»;
    - над Трампом: TUESDAY (шифр Bill Cipher / Gravity Falls) = 03.11.2020, день выборов.
    - Наш сквозной декод 14.10 (сессия 1) строгой подстановки не дал. Вероятная причина — путаница похожих глифов.
  - Часы читаются глазом. Мы смотрели 14.10 13:29 на `/workspace/work/blm/dial2x.png` (кроп 265,729–685,1140 ×2). Циферблат зеркальный и повёрнут примерно на −73° (OCP):
    - красная стрелка MOON между 12 и 1 → 13;
    - длинная стрелка TOWER между 1 и 2 → 3;
    - короткая часовая между 10 и 11 → 21.
    - OCP независимо намерил 0,54 и 1,48 ч.
    - Наш вывод: длина ≥21, вероятнее 24.
    - ПК-агент Ильи эти позиции измерить не смог и считает их гипотезой сообщества (HANDOVER §2.2).
  - Каркас позиций (таблица сообщества + правило «сумма двух чисел»):

    | Позиция | Слово |
    |---|---|
    | 1 | subject |
    | 2 | camera или twin |
    | 3 | tower |
    | 4 | mask |
    | 5 | police |
    | 6 | ? |
    | 7 | liberty |
    | 8 | ? |
    | 9 | eye (4+5) |
    | 10 | black («номер X») |
    | 11 | pyramid (5+6) |
    | 12 | vote или debate |
    | 13 | moon |
    | 14, 15 | ? |
    | 16 | rifle |
    | 17 | gold |
    | 18 | ? |
    | 19 | glove (CVD19) |
    | 20 | apple или second (XX) |
    | 21 | часовая стрелка, слово неизвестно |
    | 22–23 | ? |
    | 24 | checksum |

  - Пул-15 для пустых слотов: welcome brave world peace end one more real order proof first food time stock power.
  - Не разобрано:
    - строка рун под циферблатом (3 слова через «:»);
    - зеркальные латинские девизы на печати: …NOSCERE…, FIAT JUSTITIA ET PEREAT MUNDUS, …UBI PATRIA;
    - опечатки микротекста whitepaper: wich, proot, introdue, participans, doudle, sing, abcense, arrrived.
  - Конфликт словарей: police, one, seed, phrase и this есть в BIP39, но их нет в old-Electrum (HANDOVER §4.3). Breathe и fist указывают на Electrum (OCP README).
- **Что установлено/решено**: руны, TUESDAY, три позиции часов (сильная поддержка), механизм «число → BIP39». Глифы в левом верхнем углу — псевдоалфавит нейросети (подпись «ChatGPT»). «Часы с годами» — график смертности COVID. Полосы по краям — повёрнутый адрес. «1713 в слове COVID» при ×16 не подтверждено (HANDOVER §3).
- **Проверено и отброшено** (всё 0 совпадений):
  - OCP: ~7,2·10⁹ BIP39-последовательностей, все 12-из-13 и все порядки пула `moon tower real black subject time first food this proof order receive mask`, GPU, m/44'/0'/0'/0/0. Плюс ~3·10⁷ old-Electrum v1, ~1,6·10⁶ «якорных» BIP39. Electrum v2 и широкий набор путей (~47 путей) проверены только на 5 топ-последовательностях. Три прогона btcrecover (4,99·10⁸, 2,74·10⁸, 8,8·10⁵) — результат «not recorded», это не «0» (`ocp/analysis/tested.md`). Якоря tower/subject/time/real отозваны: у их источников нет постов о пазле.
  - Сообщество, со слов самих раннеров, OCP не воспроизводил: ArmaCorex 3,772·10¹¹, ac00300 4,79·10⁸, demesmaeker 6×12!. Цифры каталога «278+ / 191+ млрд (rarsn4)» в наших файлах не подтверждены.
  - ПК Ильи: наборы A и B, все подмножества и порядки, 0. 12 слов old-Electrum в порядке чтения: 2 275 мнемоник, 0. sweep24: 12 разных слов из пула-17, все порядки, только сжатый ключ, m/44'/0'/0'/0/0, ~192 тыс./с, ~12 суток. Итог в наших файлах не записан.
  - Наши прогоны 14.10, `/workspace/work/blm/NOTES.md` и `tools/*.prog`:
    - каркас как 12 слов (позиции 1–12, слоты 6 и 8 — все 2048): 785 299 checksum-валидных фраз × 5 путей × comp/uncomp, 0;
    - H1, 18 слов (позиции 1–5, 7, 9–13, 16, 17; слоты 6, 8, 14, 15 из пула-15; 18-е по checksum): 1 620 000, DONE, 0;
    - H2, 21 слово: куски h2_00_welcome, h2_01_brave и h2_02_world по 1 620 000, все DONE (`h2_02_world.json.prog` = «1620000 DONE», mtime 14.10 19:18 UTC = 22:18 MSK), 0. В PUZZLES_HANDOFF.md кусок h2_02 записан как «на 720 000» — это устарело;
    - H11 («WELCOME TO THE» = 12 строк whitepaper, по слову из строки по порядку): 256 наборов → 22 валидных, 0.
- **Что осталось / следующий шаг**:
  1. H2: куски `h2_03_peace` … `h2_14_power` (12 × ~1,62·10⁶). Прогресса по ним нет: файлов `.prog` не существует.
  2. H4: варианты camera↔twin, vote↔debate, apple↔second (×8).
  3. H6: black на 20, second на 10.
  4. H3: 24 слова, слоты 6, 8, 14, 15, 18, 21–23 из пула-15, 24-е по checksum, ≈2·10¹⁰. Только GPU (~29 ч на 3070).
  5. H5: BIP39-passphrase TUESDAY, BLM, 10:07, CVD19, 05.25.20.
  6. H8–H10: опечатки, цветные слова, строка рун под циферблатом.
  7. Перезапустить три btcrecover-прогона OCP, у которых не записан результат. OCP называет это своей «fastest open lead».
  8. Узнать у Ильи итог sweep24.
- **Оракул, скорость, файлы/скрипты**:
  - Оракулы:
    - `/workspace/work/blm/ocp/tools/oracle.py --selftest` / `--stdin`: ~1,7 тыс. BIP39/с на ядро, ~280/с Electrum v1;
    - `/workspace/work/blm/tools/fastcheck.py` (слоты в JSON: слово, список или «*»; checksum-отсев; ~1 мс на фразу на ядро, ~770 деривизаций/с с 5 путями).
  - Раннеры:
    - `/workspace/work/blm/tools/run.py <slots.json>`: возобновляемый, прогресс в `.prog`, сам останавливается через ~1050 с, сам доставляет pip-пакеты;
    - `fc18.py`, `h11.py`, `h18.json`, `h2_NN_*.json`.
  - Материалы: `/workspace/work/blm/dial2x.png`, `crops/`, `runes/`, `HANDOVER_ilya_2026-10-14.md` (= `/workspace/projects/233a2ae6-8f6b-4fb0-9137-902718c1a34f/files/uploads/HANDOVER.md`).
  - `FOR_OPENCODE.md` — канал Hark → OpenCode. Ответного `FROM_OPENCODE.md` нет.
- **Проекты Hark и статус**: проект 233a2ae6-8f6b-4fb0-9137-902718c1a34f. Задача сессий 1a204712-2611-475e-8401-e1ecf34f9510 (каждые 20 мин). Последняя запись журнала проекта — 14.10 ~22:40 MSK. Аудит 15.10 01:45: ярус 3, заморожено. H2 держать фоном, только если это бесплатно по токенам; новых гипотез не плодить. Илья 14.10 14:27: «тупик не надо, нужны гипотезы».
- **Оценка шансов**: наша 14.10 13:00 — 1–3%, 13:31 — 3–5%. Аудит 15.10 — ≤1%. Каждая гипотеза 10⁶–10⁷ без сигнала, это лотерея. Решает правило порядка или пула, а не железо.

---

## Оперативный статус v2 (16.10.2026 ~23:30 МСК)

Строка из сводной таблицы `MASTER_CATALOG_v2` (Часть 0.3):

| BLM | 0,20107284 BTC, не тронут | ≤1–3% | h2_02 досчитан 0; Electrum v2 не проверен толком | заморожено |

## Досье agntn/puzzles (16.10.2026)

Перенесено из реестра [@agntn/puzzles](https://puzzles.agntn.dev/collections/brave-new-world) (raw: https://puzzles.agntn.dev/collections/brave-new-world.md). Ниже — разбор первоисточника: механика, кто решал, что проверено.

- `id`: "brave-new-world"
- `chain`: "bitcoin"
- `address`: "1KfZGvwZxsvSmemoCmEV75uqcNzYBHjkHZ"
- `sourceUrl`: THREAD
- `startedAt`: "2020-10-08 09:25:30"
- `prize`: 0.20107284

> A picture puzzle one Reddit account posted to its own profile in October 2020, with 0.2 BTC on the address written into it. Six years later the coins are still there.

October 8, 2020, 09:25 UTC. A Reddit account called stsh_n [posts to its own profile](https://www.reddit.com/user/stsh_n/comments/j79zvj/bitcoin_puzzle_2000/). Title: "Bitcoin puzzle (2000$)". Body: one picture. No rules, no hint, no "good luck". The address in the picture holds **0.2 BTC**, roughly the two grand from the title at the time. And it had been sitting there since May.

## What's in the picture

Pretty much all of 2020, in one collage.

"Welcome to the BRAVE NEW WORLD" in the middle, built from tiny handwriting that quotes the Bitcoin whitepaper. Behind it, huge and faded, "FIND THE SEED PHRASE". That's the only instruction you get.

Then the year itself. George Floyd with "05.25.20" and "I can't BREATHE". Black Lives Matter slogans. Surveillance cameras. A statue with a bag over its head. The pyramid from the dollar bill. A clock face. Trump and Biden nose to nose over "11.03.20", a big red question mark between them. The Statue of Liberty holds a tablet that says BLM, with "1865-202…?" next to her and "ONLY real BITCOIN" on the pedestal.

And runes. Four places: top left, down the right edge, along the bottom, next to the question mark.

The address? Rotated, up the left edge: `1KfZGvwZxsvSmemoCmEV75uqcNzYBHjkHZ`. Easy to miss the first time.

### Why some lists say BLM

Because of that tablet and the slogans. [floflo777's open-crypto-puzzles](https://github.com/floflo777/open-crypto-puzzles/tree/main/1-big-prizes/blm-brave-new-world-0-2btc) files it as BLM, for example. The key here goes with what the picture calls itself.

## What the chain shows

The coins came before the puzzle. 0.2 BTC landed on 2020-05-10 at 08:01 UTC, five months before the post.

After that, silence. Until strangers started tipping it. 1000 sat in October 2023, 100,000 in December 2024, then 557 and 5727 in 2025. Tiny, but somebody still cares. The address has received 20,107,284 sat in total and spent exactly zero.

Over two hundred comments by now. Rune translations, word lists, orderings, permutation counts that get scarier every year. stsh_n isn't in any of them, at least not in the [Arctic Shift](https://arctic-shift.photon-reddit.com/) archive of Reddit. The coins don't move.

## What the Brave New World record carries

```ts [src/collections/brave-new-world.ts]
export const braveNewWorldPuzzle = puzzle({
  id: "brave-new-world",
  chain: "bitcoin",
  address: "1KfZGvwZxsvSmemoCmEV75uqcNzYBHjkHZ",
  sourceUrl: THREAD,
  startedAt: "2020-10-08 09:25:30",
  prize: 0.20107284,
  transactions: [funding(/* 2020-05-10, 0.2 BTC */), increase(/* … four top-ups */)],
  assets: assets({ puzzle: "puzzle.png", sourceUrl: PICTURE }),
});
```

### No hints, on purpose

The author gave a title and a picture. That's it. The rune readings in the thread might be right, might be nonsense, and nobody who could say ever did. A hint on this record means the author said it, so the list stays empty.

### Started at the post, funded before it

`startedAt` is the post, because that's when anyone could start looking. The funding keeps its own date, five months earlier. The four tips are `increase` entries, and `prize` counts them: 0.20107284 BTC, what the address holds.

### The picture

`assets/brave-new-world/puzzle.png` is the file Reddit serves for the post, 1600 by 1200. Full size matters here, the runes are small. `assetUrl()` points at it on GitHub.

### A singleton id, no name segment

`brave-new-world` is the whole identifier, like [`picture-puzzle`](https://puzzles.agntn.dev/collections/picture-puzzle), [`gsmg`](https://puzzles.agntn.dev/collections/gsmg) and the other singletons. One puzzle, one key, no slash.

## The Brave New World record

## OCP: машинные данные (puzzles.json, 16.10.2026)

Структурированные данные из `puzzles.json` репозитория [open-crypto-puzzles](https://github.com/floflo777/open-crypto-puzzles) (snapshot OCP: 2026-09-07; цены: {'date': '2026-08-16', 'BTC': 63000, 'ETH': 1880, 'AR': 1.81, 'LTC': 54}).

- `slug`: blm-brave-new-world-0-2btc
- `title`: BLM Collage: Welcome to the Brave New World
- `status`: **open**
- `tier`: big | `chain`: bitcoin
- `series`: None
- `author`: u/stsh_n | reddit:u/stsh_n
- `prize`: 20107284 sats (оценка $12668 на 2026-08-16) — 0.20107284 BTC, funded 2020-05-10 in 5 transactions, before the puzzle post
- `published`: 2020-10-08 https://www.reddit.com/user/stsh_n/comments/j79zvj/bitcoin_puzzle_2000/
- `puzzle_type`: image-stego, word-selection, bip39-seed, text-cipher
- `target_format`: BIP39 12 words at 4 candidate paths, or old-Electrum v1 12 words at 5 address indexes and 2 change values; both compressed and uncompressed P2PKH checked
- `difficulty_left`: insight
- `difficulty_note`: the derivation, both candidate formats, and every path are fully mapped and oracle-certified; about 479 million derivations have been tested across anchor-based and anchor-free families (including 7.2 billion GPU sequences over a 13-word pool with no fixed positions), all negative; the 4 word-position anchors that framed nearly all of that work trace to 2 Reddit accounts with zero posts about this puzzle and are retracted here, so what remains open is the 12-word input, not compute or path coverage
- `tested_total`: {'candidates': 479054867, 'families': 14, 'certified': True}

**Адреса и проверенное состояние:**
- `1KfZGvwZxsvSmemoCmEV75uqcNzYBHjkHZ` — escrow | main | ожидается: 20107284 sats | проверено 2026-08-16: **funded-unspent**
  - https://mempool.space/address/1KfZGvwZxsvSmemoCmEV75uqcNzYBHjkHZ

**Деривация:**
- read 12 candidate words off the published collage, try them as a BIP39 mnemonic under 4 paths and both compressions, then as an old-Electrum v1 mnemonic under 5 indexes and 2 change values, and compare the derived P2PKH address to the escrow
- оракул: `tools/oracle.py` | сертифицирован: True
- сверено с: the raw priv=1 P2PKH vectors, the public BIP39 all-zero-entropy test vector, and a public old-Electrum v1 test vector, since no solved sibling exists for this puzzle

**Зацепки (OCP `leads`):**
  - title: log the 3 already-launched btcrecover runs | status: open
  - title: re-derive the word inventory from the image itself | status: open
  - title: cross the rune transcription against the Russian-prose cipher key | status: open
  - title: settle BIP39 versus old-Electrum from a source | status: open

**Артефакты (OCP `artifacts`):**
  - source: https://www.reddit.com/user/stsh_n/comments/j79zvj/bitcoin_puzzle_2000/

**Материалы третьих лиц:**
- the collage image in clues/ is the author's own published puzzle material, posted once on Reddit; no other author material exists; community forum discussion is cited by URL and date only, never reproduced

**Источники (OCP `sources`):**
  - url: https://www.reddit.com/user/stsh_n/comments/j79zvj/bitcoin_puzzle_2000/ | title: u/stsh_n, Bitcoin puzzle (2000$) | date: 2020-10-08
  - url: https://www.reddit.com/r/bitcoinpuzzles/comments/jrr7mo/is_this_puzzle_still_valid_is_this_image_correct/ | title: Is this puzzle still valid?, r/bitcoinpuzzles | date: 2026-08-16
  - url: https://bitcointalk.org/index.php?topic=5404767.0 | title: BitcoinTalk topic 5404767 | date: 2026-08-16
