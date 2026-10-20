# Trithemius: Wealth in Poetry

Индекс: [MASTER_CATALOG.md](../../MASTER_CATALOG.md) (Части 1-8). Источник данных: [open-crypto-puzzles](https://github.com/floflo777/open-crypto-puzzles).

## Кратко
- Статус: **open** (mid)
- Цепь: bitcoin
- Приз: 3124630 sats (USD 1969)
- Примечание: 0.0312463 BTC, 2 funding transactions, exact dates not recorded
- Опубликовано: 2019-02-11 https://medium.com/coinmonks/securing-bitcoin-seed-phrases-in-stories-d8eb43a02254
- Типы: bip39-seed, text-cipher, brainwallet
- Difficulty left: insight
- the mechanism is taught explicitly by the author; tokenization is calibrated against both worked examples; the real carrier text and numeric key are, by the article's own design, author-specific and not guessable from the article alone, consistent with a stylometric pass finding no detectable insertion fingerprint

## Адреса/эскроу
- `1K4ezpLybootYF23TM4a8Y4NyP7auysnRo` — main | expected: 3124630 sats | state: funded-unspent (checked 2026-08-16) | https://mempool.space/address/1K4ezpLybootYF23TM4a8Y4NyP7auysnRo

## Источники
- 2019-02-11 — Trithemius, Securing Bitcoin Seed Phrases in Stories, Medium/Coinmonks — https://medium.com/coinmonks/securing-bitcoin-seed-phrases-in-stories-d8eb43a02254
- 2026-08-16 — Community tracker confirming the puzzle is unsolved — https://privatekeys.pw/puzzles/0.03-btc-coinmonks-puzzle
- 2019-02-11 — Article mirror — https://www.cryptoxploits.com/bitcoin-poetry-puzzle/
- 2019-02-11 — Reddit discussion — https://www.reddit.com/r/CryptoCurrency/comments/lw5z8d/reminder_the_bounty_from_coinmonks_post_in_2019/
- 2019-02-11 — Community research/scripts — https://github.com/HomelessPhD/Wealth_in_Poetry (HomelessPhD, try_BIP39.py / try_old_Electrum.py)
## Подробности
Здесь должна накапливаться расширенная информация по мере проходов: подсказки, прогресс сообщества, проверенные гипотезы, ссылки, compute-оценки. Текущий файл — скелет из OCP; заполняется автоматически в циклах.


## Обновление (2026-10-19, Beam — обогащение из privatekeys.pw)
- Тип: источники / выжимка
- Суть: добавлены mirror статьи, Reddit-обсуждение и ссылка на HomelessPhD (скрипты линейного сдвига 12 слов); зафиксировано, что «consecutive BIP39 words» не дали ключ (совпадает с нашими негативами). Файл: data/privatekeys-pw-summary.md.
- Источник: https://privatekeys.pw/puzzles/0.03-btc-coinmonks-puzzle
- Проверено: баланс 3 124 630 сат (blockstream, 2026-10-19) — без изменений.

---
## Логирование (обязательно)
См. `../../AGENT_INSTRUCTIONS.md`. Любая значимая находка/прогресс/баланс/решение (полностью или частично) **должна** быть дописана сюда с датой и ссылкой. Параллельные агенты обязаны соблюдать тот же протокол.

## OCP deep docs
- Folder: https://github.com/floflo777/open-crypto-puzzles/tree/main/2-mid-prizes/wealth-in-poetry-0-03btc
- README (raw): https://raw.githubusercontent.com/floflo777/open-crypto-puzzles/main/2-mid-prizes/wealth-in-poetry-0-03btc/README.md


## Curated deep dive (OCP, 16.10.2026)
- Механизм: статья «Securing Bitcoin Seed Phrases in Stories» (2019-02-11): числовый ключ, специфичный автору, выбирает позиции слов из текста. Два рабочих примера: (a) телефон → позиции; (b) pos_i = 10·i + digit_i (GPS координаты).
- Подтверждённые факты:
  1. Токенизация: из 4 токенизаторов 2 точно воспроизводят позиции обеих примеров.
  2. GPS-формула по полному нарративу оставляет 2 из 12 слотов без валидных слов BIP39 — значит пример демонстрационный, а не реальный ключ.
  3. Стилометрия: BIP39-слова статистически неразличимы от остального текста (нет следа вставки).
  4. Форензика архивного файла (33 MIME-части, 11 изображений): без стего/метадаты/zero-width.
- Проверено (отрицательно): 541 числовых ключей ~300k дериваций; ~500k адресов (BIP44/49/84, raw BIP32, master, Electrum v1/v2) — 0; ~78k passphrase; стего (11 img) — чистый шум; WIF/hex-скан 125 подстрок — 0.
- Открытые зацепки: (1) расшифровать cipher-таблицы на фото титульной страницы Steganographia ( shelfmark Jesus College M.7.7) — единственный неиспользованный артефакт; (2) проверить old-Electrum (не-BIP39); (3) построить certified acceptance test для derivation code (сейчас все негативы uncertified).
- Оригинал: OCP README (raw).
## Досье Hark v2 (16.10.2026)

Перенесено из `MASTER_CATALOG_v2_2026-10-16.md` (рабочие досье агентов Hark, 16.10.2026 23:40 МСК). Картина механизма, подсказок, проверенных и отброшенных гипотез, оракулов и файлов.

### A1. Trithemius «Securing Wealth in Poetry» — 0,03124630 BTC
- **→ Полное актуальное досье (что решено, что проверено, что осталось): ЧАСТЬ 8.1 (Trithemius).** Старая краткая запись заменена.


### Trithemius «Securing Wealth in Poetry» — 3 124 630 sat (0,0312463 BTC)
- **Адрес/сеть**: BTC mainnet, `1K4ezpLybootYF23TM4a8Y4NyP7auysnRo` (P2PKH, сжатый ключ предполагается). 2 входящих tx, 0 трат:
  - финансирование `0a9ddd15…` — 2019-02-10 14:47 UTC, 3 050 269 sat с адреса 3Gyb…;
  - докидка `b3c9d8cc…` — 2019-04-08, 74 361 sat.
- **Путь деривации**: не известен. Проверяем BIP39: m/44'/0'/0'/0/0..1, m/0/0, m/0/1, m/0'/0/0, m/44'/0'/0'/1/0; Electrum: m/0/0..1, m/1/0..1. Пустая пассфраза. В статье «send it to your hardware wallet» — это намекает на BIP44.
- **Баланс**: 3 124 630 sat, spent 0 — последняя проверка 15.10 02:25 MSK (mempool.space). Совпадает с проверками 13.10 и 14.10.
- **Источники**:
  - Оригинал: https://medium.com/coinmonks/securing-bitcoin-seed-phrases-in-stories-d8eb43a02254 (OneSourGrape → @Trithemius; firstPublishedAt 2019-02-11 15:34:04 UTC; снимки Wayback 02-11…02-17 идентичны).
  - Разборы: https://github.com/HomelessPhD/Wealth_in_Poetry ; https://github.com/diploux/unsolved-crypto-puzzles/tree/main/puzzles/trithemius-wealth-in-poetry (заявляют скрытую «decode chain»).
  - Трекеры: https://puzzles.agntn.dev/collections/wealth-in-poetry ; https://privatekeys.pw/puzzles/0.03-btc-coinmonks-puzzle (UNSOLVED).
  - OCP `2-mid-prizes/wealth-in-poetry-0-03btc`.
- **Механизм**: 12 слов BIP39 по позициям токенов в тексте статьи. Проверить можно только адресом; фильтр — checksum BIP39 (1/16) или версия Electrum (1/256). Автор описал два метода:
  - (a) «Story & phone number»: цифры 2–3 телефонов → возрастающие позиции. Номера «written on a different page», то есть в статье их может не быть.
  - (b) «Letter & GPS»: pos_i = S + 10·i + d_i, где d_i — цифры координат лендмарка, «related to a plot».
  - Токенизация откалибрована на обоих примерах автора: слова через дефис и апостроф — один токен.
  - Носители VARS3: 32 варианта текста (`carrier3.py`): V0 = (4,1,1,1,1), V16 = (0,1,1,1,1).
- **Подсказки автора** (все — 2019-02-11, в самой статье; после этого автор не отвечал ни под статьёй, ни где-либо ещё):
  - «If you've read this far, you've read every word required to access a wallet with .03 BTC. Good luck!»
  - «Only you know which story contains your wealth.»
  - Метод (a) «…written on a different page to remove any connection…».
  - Метод (b): «21.493021 translates to: 2, 11, 24, 39, 43, 50, 62, 71».
  - Обещал пожертвовать приз (GiveDirectly), если его не заберут до конца 2020, — не сделал.
- **Что установлено**:
  - Пример (a) нерабочий: позиция 113 = «a».
  - Пример (b) (Supreme Court 38.8906 N, 77.0044 W → «asset trial load … honey») валиден по checksum, но его адреса никогда не финансировались.
  - Показанная в статье «seed phrase» witch collapse… скопирована с Bitcoin Wiki — не ключ.
  - Сюжет: Китай → Циндао → Тайвань → Канада. Шапка — фото Barth Bailey «Flock of birds», Middle Creek WMA, PA.
  - EXIF вычищен, стего не подтверждено.
  - Аномалии (diploux, не объяснены): «ye-ye» ровно один раз в каждом из 8 абзацев (позиции 26, 88, 179, 233, 278, 381, 437, 521); прописью «eighteen / ten / four thousand»; «it's» вместо «its».
  - GPS-правило перечислимо без знания лендмарка: ≈8,4e8 (V0) / 8,7e8 (V16) all-BIP39 на носитель, ≈5,3e7 с checksum.
- **Проверено и отброшено (всё 0 совпадений по адресу)**:
  - OCP 08.2026: 541 числовой ключ (~300 тыс. дериваций); деривации и пассфразы к примерам (~578 тыс.); форензика и LSB.
  - diploux: даты и годы как ключ. HomelessPhD: скользящие окна BIP39 / old Electrum.
  - Наше, 13–14.10:
    - GPS по Qingdao, Тайваню, Канаде, Caracas — ≈80 тыс.;
    - 15 лендмарков — 736 тыс.;
    - ye-ye и числительные как поток;
    - DMS 14 лендмарков — 43,7 тыс.;
    - все города ≥200k (3101): 5,67 млн; × 16 токенизаций + 15 пассфраз: 22,5 млн; × 32 носителя: 51,5 млн; lon-lat: 43,9 млн;
    - окрестность ±0,1° городов — 1,9e8;
    - Middle Creek WMA — 6,8 млн;
    - нулевой шифр — 74 потока;
    - выделения Medium (жирный, курсив, ссылки) — 126 тыс.;
    - GPS от структурных якорей — 1,19e8;
    - гео-коробка Китай/Тайвань — 702 тыс. checksum;
    - цифры из гиперссылок.
  - **Electrum 2.x × полное GPS-пространство на V0 и V16** (≈1,7e9 → ≈6,7 млн Electrum-валидных) — ЗАКРЫТО 14.10 10:20.
  - **BIP39 × полное GPS** — частично:
    - V16: 832 из 950 сдвигов (`s26_16.done`) + **219 из 467 единиц** (`s27_16.units`, уникальных строк 219, последнее изменение 14.10 ≈22:02 MSK);
    - V0: 583 из 862 сдвигов (`s26_0.done`).
- **Что осталось / следующий шаг**:
  - Остаток (`trith_remain.py`, 15.10 02:25):
    - V16 — 248 единиц, 4,97e8 all (≈3,1e7 checksum), ≈14,5–20,5 ч на 2 CPU;
    - V0 — 916 единиц / 279 сдвигов, 7,89e8 all, ≈23–32 ч.
  - Итого ≈1,29e9 all ≈ 37,5–53 ч CPU (на ПК Ильи с 16 ядрами — примерно в 8 раз быстрее).
  - Команды: `cd /workspace/work/trithemius && python3 s27_bip39.py 16 1000` (до 0 единиц), затем `python3 s27_bip39.py 0 1000`. Прогресс проверять так: `python3 /workspace/projects/b6983d3d-52f5-48f8-9974-b99dc8e31c55/work/trith_remain.py`.
  - Это массовый счёт (>10^6): по правилу Ильи 16.10 «идеи, а не переборы» допустим только как финальный счёт узкой идеи. Trithemius понижен до яруса 2–3, в свободный слот.
  - Дешёвые идеи из досье:
    - числительные eighteen / ten / four thousand как цифры метода (a) — <1e4 кандидатов;
    - добавить в оракул несжатый P2PKH и m/44'/0'/0'/0/2..19 для новых прогонов.
  - Если полный GPS-перебор даст 0 — вердикт «правило (b) не работает». Остаётся (a), без внешней информации нерешаемо: C(130,12) ≈ 1e17 на одну историю.
- **Оракул, скорость, файлы**:
  - `/workspace/work/trithemius/oracle.py` (checksum → PBKDF2 → BIP32 → P2PKH, 6 путей; самотест «abandon×11 about» → 1LqBGSKuX5yYUonjxT5qGfpUsXKYYWeabA).
  - `/workspace/work/trithemius/electrum_oracle.py` (тест «cycle rocket…» → 1NNkttn1YvVGdqBW4PR6zvc3Zx3H5owKRf).
  - Раннер `/workspace/work/trithemius/s27_bip39.py V TL`: единица = сдвиг × первое слово; прогресс в `s27_V.units`, закрытые сдвиги в `s26_V.done`; хит → `.secret/FOUND.txt` и печать «НАЙДЕНО».
  - Носители: `carrier3.py` (VARS3), `gps_engine.py`, `article.txt`, `snaps/`, `fresh/`.
  - Журналы: `/workspace/work/trithemius/NOTES.md` (сессии 1–60), `HYPOTHESES.md`.
  - Досье: `/workspace/projects/b6983d3d-52f5-48f8-9974-b99dc8e31c55/strategy/dossiers/trithemius.md`.
  - Скорость 6 760–9 520 all/с ≈ 430–600 адресных проверок/с на 2 CPU (общие).
  - Нужен `pip install -q coincurve` после перезапуска песочницы. Нельзя делать `pkill -f s27_bip39` из шелла — убивает сам шелл.
- **Проекты Hark и статус**:
  - 13.10: создан проект **de339428-d222-4341-95b9-15e8b475a28c** (Trithemius), задача 3034aaca каждые 20 мин до 13.11. Последнее сообщение в журнале — 14.10 21:50 (сессия 60, ≈254 из 467 по оценке сессии; по файлу 219 уникальных).
  - 14.10 22:05: остановлен общей отменой биткоин-загадок Ильёй (дневной лог: «Genesis/Arweave/пазлы остановлены»; точный статус задачи 3034aaca отдельно не записан).
  - 15.10 01:41: передан стратегу **b6983d3d-52f5-48f8-9974-b99dc8e31c55** (задача b0ef392a, сначала ярус 1, потом понижен до 2). С 15.10 s27 не запускался: фоновый слот занимал Genesis, потом действует запрет массовых переборов.
- **Оценка шансов**: ≈0,5% (досье 15.10; ранее 2–5%). Главный риск — ключ сделан методом (a) с номерами вне статьи. Тогда весь GPS-перебор бесполезен. diploux может решить раньше.

---

## Оперативный статус v2 (16.10.2026 ~23:30 МСК)

Строка из сводной таблицы `MASTER_CATALOG_v2` (Часть 0.3):

| Trithemius | 0,0312463 BTC, не тронут | ~0,5% | BIP39-ветка GPS-правила: 219/467 единиц; остаток 37–53 ч CPU | стратег (свободный слот) |

## Досье agntn/puzzles (16.10.2026)

Перенесено из реестра [@agntn/puzzles](https://puzzles.agntn.dev/collections/wealth-in-poetry) (raw: https://puzzles.agntn.dev/collections/wealth-in-poetry.md). Ниже — разбор первоисточника: механика, кто решал, что проверено.

- `id`: "wealth-in-poetry"
- `chain`: "bitcoin"
- `address`: "1K4ezpLybootYF23TM4a8Y4NyP7auysnRo"
- `sourceUrl`: ARTICLE
- `startedAt`: "2019-02-11 15:34:04"
- `prize`: 0.0312463

> A Medium essay from February 2019 about hiding seed phrases in stories, with a real one hidden in the essay itself and 0.03 BTC on its wallet. Still unclaimed.

February 11, 2019, 15:34 UTC. Coinmonks on Medium publishes [Securing Wealth in Poetry](https://medium.com/coinmonks/securing-bitcoin-seed-phrases-in-stories-d8eb43a02254), by an account called OneSourGrape. Subtitle: "What if you could embed your net worth in a story?". Eleven minutes of reading about refugees, gold and steganography. Then the last lines:

> If you’ve read this far, you’ve read every word required to access a wallet with .03 BTC. Good luck!

And right under it, the address. **0.03 BTC**, and it's still there.

## What's in the essay

It opens with the author's grandfather. A merchant family in 1930s China, gold yuanbao sewn into a shirt lining, a boat to Taiwan priced at up to ten taels, a new life there and later in Canada. Then fiat money as a tool of control, from China to Zimbabwe to Venezuela. Then bitcoin as the thing you can't confiscate, except for one weak spot.

That weak spot is the "touchpoints". A private key looks like a private key. A numbered list of twelve words looks like a password to money. Border guards will learn to spot both. The essay shows one of each, just so you know what they look like: a hex key and the phrase `witch collapse practice feed shame open despair creek road again ice least`. Funny thing, that phrase isn't BIP39 at all. `witch`, `collapse`, `shame` and `least` aren't on the BIP39 list. All twelve words are on Electrum's old wordlist, though.

Then steganography, "hidden writing" as opposed to "secret writing". Invisible ink, microdots, and a null cipher: "Fishing freshwater bends and saltwater coasts…", third letter of each word, "Send Lawyers, Guns, and Money".

And finally the "trithemian seed", named after Johannes Trithemius and his Steganographia. Seed words sit inside an ordinary story, next to decoy words, and something else says which ones count. The essay gives two worked examples:

- **Story & phone number.** A short story about an old palace, then two phone numbers for Eric and Carl on another page. The digits turn into word positions: `(2,6,9,18,22,25,45,70,86,100,113,116.)`.
- **Letter & GPS location.** A lawyer's letter about a Supreme Court case, then the court's coordinates, 38.8906° N, 77.0044° W. Every digit read goes up by ten, so `21.493021` means 2, 11, 24, 39, 43, 50, 62, 71.

The essay says the method isn't meant to be uncrackable. It's meant to keep anyone from even wondering whether there's something to crack. And then it claims its own text is exactly that.

## What the chain shows

The coins came first. 3,050,269 sat landed on 2019-02-10 at 14:47 UTC, one day before the essay went up. On 2019-04-08 someone sent another 74,361 sat. Nothing has left the address since.

The essay made a promise, too: "If the amount is not accessed by the end of 2020, we will donate the contents of the account to GiveDirectly.org/refugees." The end of 2020 came and went, and the coins never moved. Whatever happened with the donation, it didn't come from this wallet.

The account went by Sharon & Philippe for a while. Then it took the handle `@Trithemius`, so the essay is signed Trithemius today and `@onesourgrape` links go nowhere. More on the [author page](https://puzzles.agntn.dev/authors/trithemius).

## What the Securing Wealth in Poetry record carries

```ts [src/collections/wealth-in-poetry.ts]
export const wealthInPoetryPuzzle = puzzle({
  id: "wealth-in-poetry",
  chain: "bitcoin",
  address: "1K4ezpLybootYF23TM4a8Y4NyP7auysnRo",
  sourceUrl: ARTICLE,
  startedAt: "2019-02-11 15:34:04",
  prize: 0.0312463,
  hints: [official("The beauty of trithemian seeds is that they hide in plain sight. …", ARTICLE)],
  transactions: [funding(/* 2019-02-10, 0.03050269 BTC */), increase(/* 2019-04-08, 74,361 sat */)],
  assets: assets({ puzzle: "puzzle.txt", sourceUrl: CAPTURE }),
});
```

### The hint, the closing line

The author said exactly one thing about the puzzle: you've already read every word you need. That's the hint. The phone numbers and GPS digits are examples of the method, not instructions for this wallet. Nobody who could say otherwise ever did.

### Started at the essay, funded before it

`startedAt` is the publication time, 15:34:04 UTC, straight from Medium's own `firstPublishedAt`. The funding keeps its own date, a day earlier. The author put in 0.03050269 BTC, and the essay rounds it to .03. The 74,361 sat from April is an `increase`, so `prize` is 0.0312463 BTC, what the address holds.

### The text

For a puzzle like this, the text is the puzzle. `assets/wealth-in-poetry/puzzle.txt` is the essay as the [Wayback Machine saw it on publication day](https://web.archive.org/web/20190211203952/https://medium.com/coinmonks/securing-bitcoin-seed-phrases-in-stories-d8eb43a02254). It's one paragraph per block, headings and image captions included, taken from the paragraph list Medium ships inside the page. The rendered HTML says the same thing. The only difference is typography: no-break spaces that keep the last two words of a heading, caption or pull quote together, and hair spaces around the dashes. The file keeps the plain spaces the author typed. The pictures aren't in it.

### A singleton id, no name segment

`wealth-in-poetry` is the whole identifier, like [`brave-new-world`](https://puzzles.agntn.dev/collections/brave-new-world), [`gsmg`](https://puzzles.agntn.dev/collections/gsmg) and the other singletons. One puzzle, one key, no slash.

## The Securing Wealth in Poetry record

## OCP: машинные данные (puzzles.json, 16.10.2026)

Структурированные данные из `puzzles.json` репозитория [open-crypto-puzzles](https://github.com/floflo777/open-crypto-puzzles) (snapshot OCP: 2026-08-16; цены: {'date': '2026-08-16', 'BTC': 63000, 'ETH': 1880, 'AR': 1.81, 'LTC': 54}).

- `slug`: wealth-in-poetry-0-03btc
- `title`: Trithemius: Wealth in Poetry
- `status`: **open**
- `tier`: mid | `chain`: bitcoin
- `series`: None
- `author`: Trithemius (pseudonym)
- `prize`: 3124630 sats (оценка $1969 на 2026-08-16) — 0.0312463 BTC, 2 funding transactions, exact dates not recorded
- `published`: 2019-02-11 https://medium.com/coinmonks/securing-bitcoin-seed-phrases-in-stories-d8eb43a02254
- `puzzle_type`: bip39-seed, text-cipher, brainwallet
- `target_format`: BIP39 12 words, position selected by an author-specific numeric key applied to the article text; passphrase and derivation path not confirmed
- `difficulty_left`: insight
- `difficulty_note`: the mechanism is taught explicitly by the author; tokenization is calibrated against both worked examples; the real carrier text and numeric key are, by the article's own design, author-specific and not guessable from the article alone, consistent with a stylometric pass finding no detectable insertion fingerprint
- `tested_total`: {'candidates': 878000, 'families': 8, 'certified': False}

**Адреса и проверенное состояние:**
- `1K4ezpLybootYF23TM4a8Y4NyP7auysnRo` — escrow | main | ожидается: 3124630 sats | проверено 2026-08-16: **funded-unspent**
  - https://mempool.space/address/1K4ezpLybootYF23TM4a8Y4NyP7auysnRo

**Деривация:**
- tokenize the article text, apply an unknown author-specific numeric key to select 12 word positions, then derive BIP44/49/84 or a raw BIP32 path and compare to the escrow address

**Зацепки (OCP `leads`):**
  - title: read the cipher table on the embedded Steganographia photo | status: open
  - title: rule out an old-Electrum (non-BIP39) wallet | status: open
  - title: build a certified acceptance test for the derivation code | status: open

**Материалы третьих лиц:**
- the narrative text was written and published by the puzzle author himself as the vehicle for the puzzle; short excerpts are quoted in clues/author-posts.md; the embedded stock photography is third-party licensed illustration, referenced but not reproduced here

**Источники (OCP `sources`):**
  - url: https://medium.com/coinmonks/securing-bitcoin-seed-phrases-in-stories-d8eb43a02254 | title: Trithemius, Securing Bitcoin Seed Phrases in Stories, Medium/Coinmonks | date: 2019-02-11
  - url: https://privatekeys.pw/puzzles/0.03-btc-coinmonks-puzzle | title: Community tracker confirming the puzzle is unsolved | date: 2026-08-16
