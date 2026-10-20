# Guntis Vitolins: 10 ETH Challenge

Индекс: [MASTER_CATALOG.md](../../MASTER_CATALOG.md) (Части 1-8). Источник данных: [open-crypto-puzzles](https://github.com/floflo777/open-crypto-puzzles).

## Кратко
- Статус: **open** (big)
- Цепь: ethereum
- Приз: 8.612541554256945 ETH (USD 16192)
- Примечание: wallet funded with 10 ETH on 2020-02-12; the author has withdrawn from it 7 times since 2021-05, most recently 2024-06-04, totaling approximately 1.377 ETH; he still holds and periodically uses this private key, so this is not a frozen escrow
- Опубликовано: 2020-02-12 https://www.youtube.com/watch?v=w4mpiuBP_aY
- Типы: bip39-seed, word-selection, video-series
- Difficulty left: bounded-compute
- 3 of 12 positions are confirmed (1, 5 with 2 candidates, and 12), plus 2 more confirmed list members with unknown positions; every sweep of the confirmed word pool (approximately 16.75 billion derivations across 6 metadata-era sweeps, all witnessed) has failed; the next 2 leads (connecting words, then substrings of longer words) are priced at hours and about a day respectively on one rented GPU and have not been run; a third lead (re-reading remaining metadata) is a human task, not a sweep

## Адреса/эскроу
- `0x9C2F44EFAd0c1E852a09dF9939e6DaF061140CaF` — main | expected: 8.61254155425694462 ETH | state: funded-unspent (checked 2026-08-16) | https://etherscan.io/address/0x9C2F44EFAd0c1E852a09dF9939e6DaF061140CaF

## Источники
- 2020-02-12 — Challenge video — https://www.youtube.com/watch?v=w4mpiuBP_aY
- 2020-02-12 — Challenge blog post — https://mineshop.eu/2020/02/12/crypto-pumping-hardcore-research-portfolio-update-how-are-we-doing/
- 2026-08-16 — Hint 4 video — https://www.youtube.com/watch?v=03wXiMczCXk
- 2026-08-16 — Hint 5 video — https://www.youtube.com/watch?v=ZjBJKooVmuE

## Подробности
Здесь должна накапливаться расширенная информация по мере проходов: подсказки, прогресс сообщества, проверенные гипотезы, ссылки, compute-оценки. Текущий файл — скелет из OCP; заполняется автоматически в циклах.


---
## Логирование (обязательно)
См. `../../AGENT_INSTRUCTIONS.md`. Любая значимая находка/прогресс/баланс/решение (полностью или частично) **должна** быть дописана сюда с датой и ссылкой. Параллельные агенты обязаны соблюдать тот же протокол.

## OCP deep docs
- Folder: https://github.com/floflo777/open-crypto-puzzles/tree/main/1-big-prizes/guntis-vitolins-metamask-8-6eth
- README (raw): https://raw.githubusercontent.com/floflo777/open-crypto-puzzles/main/1-big-prizes/guntis-vitolins-metamask-8-6eth/README.md


## Curated deep dive (OCP, 16.10.2026)
- Приз ~8.6125 ETH (автор периодически тратит из кошелька, escrow не «заморожен»).
- Механизм: 12-словный BIP39, 6 слов в YouTube, 6 в блоге; позиции 1=dutch, 5=fog, 12=parrot; часть пула в HTML-метаданных.
- ~21.2 млрд дериваций (9 families, certified), все отрицательные.
- Зацепки: (1) on-screen/spoken video words (RO1 с atom/link/basic/token/dash как свободные video words и затем extension из 219 слов); (2) connecting words; (3) substrings of longer words; (4) re-read metadata one more.
- Deep doc: https://raw.githubusercontent.com/floflo777/open-crypto-puzzles/main/1-big-prizes/guntis-vitolins-metamask-8-6eth/README.md
## Досье Hark v2 (16.10.2026)

Перенесено из `MASTER_CATALOG_v2_2026-10-16.md` (рабочие досье агентов Hark, 16.10.2026 23:40 МСК). Картина механизма, подсказок, проверенных и отброшенных гипотез, оракулов и файлов.

### B12. Guntis Vitolins «10 ETH Challenge» — 8,6125 ETH
- **→ Полное актуальное досье (что решено, что проверено, что осталось): ЧАСТЬ 8.5 (Guntis).** Старая краткая запись заменена.


### Guntis Vitolins «10 ETH Challenge» (mineshop.eu) — 8,61254155425694462 ETH
- **Адрес/сеть/путь**: `0x9C2F44EFAd0c1E852a09dF9939e6DaF061140CaF`, Ethereum, BIP39 12 англ. слов, без пассфразы, MetaMask `m/44'/60'/0'/0/0`.
- **Баланс**: 8,61254155425694462 ETH, nonce 7, блок 26 193 999 — publicnode RPC 15.10 ~02:45 MSK; без изменений с 16.08.2026. 7 исходящих tx 2021-05…2024-06-04 (~1,377 ETH) — автор сам держит ключ, движение ≠ решение (в каталоге «автор тратит» — уточнить: последняя трата 04.06.2024).
- **Источники**: видео https://www.youtube.com/watch?v=w4mpiuBP_aY ; пост https://mineshop.eu/2020/02/12/crypto-pumping-hardcore-research-portfolio-update-how-are-we-doing/ (теги — в архиве Wayback 28.05.2020); хинт 4 https://www.youtube.com/watch?v=03wXiMczCXk (~15:15); хинт 5 https://www.youtube.com/watch?v=ZjBJKooVmuE (~17:25). OCP: `/workspace/work/open-crypto-puzzles/1-big-prizes/guntis-vitolins-metamask-8-6eth/` (data/reading-order-pool.json, video-onscreen-words.json, seed-slots.json, tools/). GitHub floflo777/open-crypto-puzzles issues #18 (cjmcdaniel 04.09, Bayols 26.09), #38 (profesor1234 04.10). puzzles.agntn.dev/collections/mineshop.
- **Механизм**: 6 слов спрятаны в видео (описание, теги, заголовок, «written in the video on the screen»), 6 — в блог-посте 12.02.2020. Чек-сумма: ~1/16 расстановок требует деривации.
- **Подсказки (дословно)**: описание видео — «Don't expect anything easy there will be dark fog on the lake.»; «Do you think its more likely for parrot can sing a song then for a goat to whistle?». Пост — «Round dutch cattle is living in the forest and eating wood.» «Only because there is a lot of healthy fiber.» «Hunter like the rib roast dinner fresh.»; теги «altcoin season, altcoins, bitcoin, bull market, crypto pumping, ethereum, ethereum fork, round». Хинт 5: «keyword fork… not necessarily in order… one of the keywords from the seed wallet». Автор в комментариях: слово может быть в любой позиции; «Youll need only written words» (устный канал снят).
- **Что установлено**: якоря dutch@1 (Нидерланды), fog@5 (капли воды), parrot@12 (тропическая птица); члены без позиции fiber (хинт 4), fork (хинт 5). Пул письменных поверхностей: до fog 25 слов, между fog и parrot только lake/also, пост после dutch 19 → модель RO1. Issue #18: 192 уникальных слова (109 экранных + 110 автосубтитров, 27 общих), копия `work/guntis/issue18_words.json`; в окне таблицы портфеля (93–201 с) ~22 слова, монеты link, basic, token, atom, dash.
- **Проверено и отброшено (все 0)**: OCP P1 150,8 млн; G1 79,4 млн; R1 3,38 млрд; R2−R1 1,23 млрд; S1 1,16 млрд; R1+словоформы 10,75 млрд; RO1 (полная модель порядка чтения) 10,48 млн; RO2 582 725; C1 18,66 млрд (GPU). Bayols #18: RO1 на 7 путях; RO1 + 1 слот из монет/build/ready/donor/stay/until/win; пост-флоатеры hard/minimum (~280 млн). profesor1234 #38: B-POSS, B-CLOUD-A/B по 10,77 млрд, B-FRAMES 1,04 млрд (~35 млрд). Мы 15.10: 4 свободных видео-слота = монеты в порядке таблицы (5 последовательностей), 2 570 400 расст. → 160 060 дериваций, свидетель найден. Итого ≈70 млрд дериваций. Оговорка: в харнессах найден баг «хвостовая гонка» (потеря до 0,014–4,75% хвоста); скрипты Bayols не проверены на него.
- **Что осталось / следующий шаг**: код готов — `coinsk.py` (K монет, ordered/any, 126 юнитов, резюмируемо). Не покрыто: K=4 any 61,7 млн расст. → 3,86 млн дер. (~32 мин на 2 CPU); K=3 ordered 12,4 млн дер. (~1,7 ч); K=3 any 74,5 млн (~10 ч); K=2 ordered 97,2 млн (~13,5 ч). Суммарно ~190 млн — СНЯТО 16.10 11:33 правилом Ильи «идеи, а не переборы»: сначала из текста/видео/прошлых загадок вывести, КАКИЕ слова и порядок (≤10⁴). Экранные слова k=1 по всем 103 — 2,24·10⁹ (только GPU; аренда = трата, нужна Ильина санкция).
- **Каталог — исправления**: подтверждённые позиции верны (dutch@1, fog@5, parrot@12); «часть пула в HTML-метаданных» = теги поста (архив Wayback) + описание/теги видео.
- **Оракул, скорость, файлы**: OCP `tools/oracle.py --selftest` OK (15.10), ~650/с (bip_utils, 1 ядро); быстрый путь (функции `sweep_paths.py`) ≈2 000/с на 2 ядрах (~7,2 млн/ч). GPU-эталоны: L40S 780 000/с, GTX 1060 70 000/с. Наши: `/workspace/projects/b6983d3d-52f5-48f8-9974-b99dc8e31c55/work/guntis/coinsk.py` (формулы сверены: 348 228 000 на монету = число Bayols), `coins4_tableorder.py`, `issue18_words.json`. Досье `/workspace/projects/b6983d3d-52f5-48f8-9974-b99dc8e31c55/strategy/dossiers/guntis.md` (15.10 03:05); `strategy/QUEUE.md`, `strategy/LOG.md` (16.10 11:40).
- **Проекты Hark и статус**: отдельного проекта нет; ведёт стратег «работа» `b6983d3d-52f5-48f8-9974-b99dc8e31c55` (циклы ~15 мин; после 16.10 11:40 по Guntis работы нет, счёт не запускался).
- **Оценка шансов**: ~1,5% (досье 15.10). Самый крупный приз (~$20 800), но главный блокер — идентификация слов: RO1 закрыта на 100% ⇒ пул неполон или порядок не сохраняется.

---
Файл: /workspace/projects/aa5ddde6-45de-46be-b0aa-6bd4db202e32/work/catalog_parts/g5.md

---

## Оперативный статус v2 (16.10.2026 ~23:30 МСК)

Строка из сводной таблицы `MASTER_CATALOG_v2` (Часть 0.3):

| Guntis 8,6 ETH | ~8,6125 ETH, не тронут | ~1,5% | Пул слов неполон/порядок неясен; перебор 190 млн снят правилом «идеи» | стратег (ярус 2) |

## Досье agntn/puzzles (16.10.2026)

Перенесено из реестра [@agntn/puzzles](https://puzzles.agntn.dev/collections/mineshop) (raw: https://puzzles.agntn.dev/collections/mineshop.md). Ниже — разбор первоисточника: механика, кто решал, что проверено.

- `id`: "mineshop"
- `chain`: "ethereum"
- `address`: "0x9C2F44EFAd0c1E852a09dF9939e6DaF061140CaF"
- `sourceUrl`: "https://www.youtube.com/watch?v=w4mpiuBP_aY"
- `startedAt`: "2020-02-12 13:17:25"
- `prize`: 8.612541554256945
- `pubkey`: uncompressed("04e1a30f…4f9d")

> Six of twelve seed words sit in a YouTube video, six in the mineshop.eu post it links to. The prize, the rules in the author's own words, and why a shrinking balance here means nothing.

On February 12, 2020 [Guntis Vitolins](https://www.youtube.com/@GuntisVitolins), who sells mining hardware at [mineshop.eu](https://mineshop.eu), uploaded a market video, published a blog post, funded a fresh wallet with **10 ETH**, and told everyone the seed phrase was hiding in those two pages. Six years later the wallet is still his.

## How the 10 ETH challenge works

### Six words in the video, six in the post

The rules live in the video description, and this is how they're written: "12 wallet seed words- 6 are hidden in this video (description, tags, title,video basically could be anywhere in this video) 6.words are hidden in original post."

So: twelve words, two sources, no passphrase mentioned, no path, no wordlist named. Put them in a wallet and the 8.6 ETH is yours. The [video](https://www.youtube.com/watch?v=w4mpiuBP_aY) and the [post](https://mineshop.eu/blog/mineshop-blog-tutorials/crypto-pumping-hardcore-research-portfolio-update-how-are-we-doing) are both still online, which is more than most six-year-old puzzles can say.

### The sentences that don't belong

Both pages are about crypto markets, pullbacks and portfolio updates. Then, mid-paragraph, this shows up:

> Round dutch cattle is living in the forest and eating wood. Only because there is a lot of healthy fiber. Hunter like the rib roast dinner fresh.

And in the video description, between the affiliate links:

> Don't expect anything easy there will be dark fog on the lake. Also It is not impossible.
> 
> Do you think its more likely for parrot can sing a song then for a goat to whistle ?

Nobody writing about a 20% upswing stops to discuss cattle eating wood. The plants are obvious. Which of their words belong to the phrase, and in what order, is the entire puzzle, and six years of solvers have not agreed on it.

### The hints that came later

Vitolins kept dropping more hints across his channel, a few written in descriptions, the rest spoken in the middle of unrelated market videos. That's why people trying this one end up transcribing his uploads. A puzzle where the clues arrive by YouTube upload is a strange place to keep 8.6 ETH, but here we are.

## What the mineshop record carries

### The address, the money, the rules

```ts [src/collections/mineshop.ts]
export const mineshopPuzzle = puzzle({
  id: "mineshop",
  chain: "ethereum",
  address: "0x9C2F44EFAd0c1E852a09dF9939e6DaF061140CaF",
  sourceUrl: "https://www.youtube.com/watch?v=w4mpiuBP_aY",
  startedAt: "2020-02-12 13:17:25",
  pubkey: uncompressed("04e1a30f…4f9d"),
  prize: 8.612541554256945,
  hints: [
    official(
      "12 wallet seed words- 6 are hidden in this video (description, tags, title,video basically could be anywhere in this video) 6.words are hidden in original post. This task will unlock wallet to claim 10 eth.",
      "https://www.youtube.com/watch?v=w4mpiuBP_aY",
      confirmation(
        "https://mineshop.eu/blog/mineshop-blog-tutorials/crypto-pumping-hardcore-research-portfolio-update-how-are-we-doing",
        "The companion post states the same split: six words in the video, six in the post.",
      ),
      { date: "2020-02-12" },
    ),
  ],
  transactions: [/* twelve, funding first */],
});
```

The hint is the rules, quoted exactly, typos and all. Its confirmation is the post, because the post says the same thing in the author's other channel. `started` is the funding transaction at **13:17:25 UTC**, five hours before the video went up, same afternoon.

### A public key, and nothing behind it

No seed, no path, no wordlist. Vitolins never published a word of the phrase, only the promise that twelve of them exist. BIP39 English at MetaMask's default path is a fair guess. It's still a guess, so it stays out of the record.

The public key is another story. He signed every withdrawal himself, and each signature gives the key back. Hash it and you land on this exact address, so the record carries it now. Closer to the 8.6 ETH? Not one bit. It's the lock, not the key.

## Why the 10 ETH prize is now 8.61 ETH

### The author spends from the wallet himself

Everywhere else in this dataset a shrinking balance means somebody won. Not here. Vitolins holds the key and uses it like any other wallet: **seven outgoing transactions** between May 2021 and June 2024, about **1.377 ETH** gone, plus four small deposits back in.

So the address dropping to zero tomorrow would prove nothing. He'd just have moved his money.

### Do the math from the record

All twelve transactions are in there, `decrease` for his withdrawals and `increase` for the deposits. Take 10, subtract the withdrawals, subtract their gas, add the deposits, and you land on the prize. Each amount is the double nearest its wei value, which is as close as a JSON number gets to eighteen decimals. The txids carry the exact figure.

## Is the mineshop puzzle solved?

No, and `verify()` answers `unavailable`, which is the honest response when there's nothing to derive from. A `solved` status in this library needs key material that reproduces the address. This record has an address, its public key, a date, some money and a riddle.

### A singleton id, no name segment

`mineshop` is the whole identifier, like [`gsmg`](https://puzzles.agntn.dev/collections/gsmg), [`bitaps`](https://puzzles.agntn.dev/collections/bitaps) and [`movie-enigma`](https://puzzles.agntn.dev/collections/movie-enigma). One puzzle, one key, no slash.

## The mineshop puzzle record

## OCP: машинные данные (puzzles.json, 16.10.2026)

Структурированные данные из `puzzles.json` репозитория [open-crypto-puzzles](https://github.com/floflo777/open-crypto-puzzles) (snapshot OCP: 2026-09-07; цены: {'date': '2026-08-16', 'BTC': 63000, 'ETH': 1880, 'AR': 1.81, 'LTC': 54}).

- `slug`: guntis-vitolins-metamask-8-6eth
- `title`: Guntis Vitolins: 10 ETH Challenge
- `status`: **open**
- `tier`: big | `chain`: ethereum
- `series`: None
- `author`: Guntis Vitolins | youtube:#GuntisVitolins, web:mineshop.eu
- `prize`: 8.612541554256945 ETH (оценка $16192 на 2026-08-16) — wallet funded with 10 ETH on 2020-02-12; the author has withdrawn from it 7 times since 2021-05, most recently 2024-06-04, totaling approximately 1.377 ETH; he still holds and periodically uses this private key, so this is not a frozen escrow
- `published`: 2020-02-12 https://www.youtube.com/watch?v=w4mpiuBP_aY
- `puzzle_type`: bip39-seed, word-selection, video-series
- `target_format`: 12-word BIP39 English mnemonic, no passphrase, MetaMask default path m/44'/60'/0'/0/0
- `difficulty_left`: bounded-compute
- `difficulty_note`: 3 of 12 positions are confirmed (1, 5 with 2 candidates, and 12), plus 2 more confirmed list members with unknown positions; every sweep of the confirmed word pool (approximately 16.75 billion derivations across 6 metadata-era sweeps, all witnessed) has failed; the next 2 leads (connecting words, then substrings of longer words) are priced at hours and about a day respectively on one rented GPU and have not been run; a third lead (re-reading remaining metadata) is a human task, not a sweep
- `tested_total`: {'candidates': 21227190000, 'families': 9, 'certified': True}

**Адреса и проверенное состояние:**
- `0x9C2F44EFAd0c1E852a09dF9939e6DaF061140CaF` — escrow | main | ожидается: 8.61254155425694462 ETH | проверено 2026-08-16: **funded-unspent**
  - https://etherscan.io/address/0x9C2F44EFAd0c1E852a09dF9939e6DaF061140CaF

**Деривация:**
- 12-word candidate to BIP39 checksum validation to seed to BIP44 m/44'/60'/0'/0/0 to Ethereum address, compared case-insensitively to the target
- оракул: `tools/oracle.py` | сертифицирован: True
- сверено с: the public canonical BIP-0039 test vector (abandon x11 + about to 0x9858effd...), plus a checksum-acceptance-rate check over the full English wordlist

**Зацепки (OCP `leads`):**
  - title: on-screen and spoken video words (issue #18): sweep RO1 with atom/link/basic/token/dash as free video words, then the 219-word extension | status: partially tested: coin words as one free slot negative (issue #18, 2026-09-26); 219-word extension open
  - title: extend the word pool with connecting words | status: open
  - title: extend to substrings of longer words | status: tested: negative on 7 paths (issue #18, 2026-09-26)
  - title: re-read the video and post metadata once more | status: open

**Материалы третьих лиц:**
- no video or audio files are included; the challenge and hint videos are linked by URL only. The 5 planted sentences and 5 hints are the author's own published text, quoted short and verbatim with dates and links

**Источники (OCP `sources`):**
  - url: https://www.youtube.com/watch?v=w4mpiuBP_aY | title: Challenge video | date: 2020-02-12
  - url: https://mineshop.eu/2020/02/12/crypto-pumping-hardcore-research-portfolio-update-how-are-we-doing/ | title: Challenge blog post | date: 2020-02-12
  - url: https://www.youtube.com/watch?v=03wXiMczCXk | title: Hint 4 video | date: 2026-08-16
  - url: https://www.youtube.com/watch?v=ZjBJKooVmuE | title: Hint 5 video | date: 2026-08-16

---
## Обновление (2026-10-17, Big Pickle) — данные сообщества OCP (issues #38/#10/#13/#14/#18)
- Тип: смена картины / новые данные / закрытые лиды
- Суть (свежайшее состояние из issues репозитория floflo777/open-crypto-puzzles, снято 2026-10-17; локальные копии в `data/community/`):
  1. **Хинты 4/5 — дословно и это ПОСЛЕДНИЕ хинты.** Хинт 4 (видео `03wXiMczCXk`, 15:15): «so the key word number four is it is a plant-based food which body can't break down» → **fiber**. Хинт 5 (видео `ZjBJKooVmuE`, 17:25): «so the last hint we are giving out is a keyboard fork so it's f o r k that's a keyword it's not necessarily uh in order um it's one of the keywords from the seed wallet» → **fork** (буквально по буквам; «не обязательно по порядку»). «Last hint» — новых хинтов автора не заявлено.
  2. **Устный канал исключён автором.** Ответ Guntis в комментариях к challenge-видео: «Youll need only written words.» → автосубтитры/речь не источник. (Но текст НА ЭКРАНЕ, вероятно, «написанное» и не исключён.)
  3. **Пул намеренно мал.** Новая цитата автора (видео `-MeIaPdVJjA`, коммент 2020-08): «if will have to many words, people can make bot and have easy guess.» → ~14 посаженных слов (12 сид + «пара» обманок); очень широкие пулы не нужны.
  4. **Закрытые лиды (сертифицированные негативы, все 0):**
     - RO1 (полная модель порядка чтения): 167 688 000 расстановок / 10 484 919 валидных → **0** (#14 Peterranky; witnesses).
     - C1 connecting-words (пул расширен связками there/will/also/only/because/like…): 18 657 475 200 → **0** (#13 salikkhann, 18,66 млрд).
     - Четыре free-order sweep'а profesor1234 (#38, 2026-10-04), пул 29 контент-слов: **B-POSS** (`possible` обязателен — слово внутри «Also It is not impossible») 10 773 378 819 → 0; **B-CLOUD-A** (`fog`/5, `cloud` присутствует) 10 773 355 757 → 0; **B-CLOUD-B** (`cloud`/5, `fog` присутствует) 10 773 538 507 → 0; **B-FRAMES** (free-order, экранные `build/share/atom/link`) 1 040 162 282 → 0. Пул 29: `because can cattle dinner easy expect finish forest fresh goat lake like market more only rib roast round season sing song then there top update will winter wood you`.
     - Суммарно по папке ≈**70 млрд** дериваций, ноль.
  5. **Экранный канал (лид №1) закрыт лишь частично.** @cjmcdaniel (#18, 2026-09-04, yt-dlp+ffmpeg+OCR, 1 кадр/с, 720p): 122 слова читаются, 109 нет ни в одной письменной поверхности → пул всех прошлых sweep'ов неполон. Совпавшие с монетной таблицей: **atom, link, basic, token** (+dash из CryptoCompare). Байолс закрыл их в reading-order (1,74 млрд → 0). Полное расширение пула экранными словами (219) — НЕ выполнено.
  6. **Баг харнесса «tail race»** (silent loss до 0,014–4,75% хвоста у producer/consumer sweep'ов) — учитывать при собственных прогонах (файл `data/community/issue38_3-method-tail-race.md`).
  7. **Мелкие правки записей:** `top`/`finish` в R1-пуле были мис-сорсированы (#10, HPreziosa); `cloud` в 2020-поверхностях не встречается вовсе; порядок чтения опровергнут (RO1 = 0), значит нужен отбор слов, а не перебор.
- Источник: https://github.com/floflo777/open-crypto-puzzles/issues/38 , /10 , /13 , /14 , /18 (копии: `data/community/`).
- Проверено: да — данные выгружены через GitHub API и сохранены локально (URL+дата); 2020-описание/теги/заголовок видео восстановлены из Wayback и **байт-сверены** с пулом OCP (новых BIP39-слов до parrot нет; слова после parrot: can/sing/song/then/goat).
- Влияние на оценку: главный блокер — идентификация слов, не объём. Открытые оси: (а) расширение пула экранным текстом видео; (б) свободный порядок вне пула 29; (в) подстроки. Все требуют либо нового инсайта, либо GPU (лимит 15 мин/прогон, аренда — только с ОК Ильи).
- Подробности и хроника: см. LOG.md (запись 2026-10-17, Big Pickle); скрипты `tools/fetch_community.py`, `tools/fetch_surfaces.py`, `tools/fetch_mirrors.py`, `tools/analyze_2020_surfaces.py`.

---

## Оперативный статус v3 (17.10.2026, ~23:00 МСК) — Big Pickle (big-pickle / OpenCode, Windows)

Новое с прошлого статуса — **закрыт свип «несколько экранных монет сразу» (free-order), отрицательно, со свидетелем**:

- **Гипотеза:** видео-сторона (6 слов) = `{fog, parrot}` (описание) + **4 монеты с экрана** из `{atom, link, basic, token, dash}`; пост-сторона (6) = `{dutch, fiber, fork}` + 3 из постового пула (20 слов); свободный порядок 8 нефиксированных позиций.
- **Объём:** 5700 наборов × 8! = **229,824,000** перестановок; **14,366,931** прошли чек-сумму BIP39 (6.2514 % против предсказанных 6.25 % — свидетель корректности движка). **Хитов 0.**
- **Почему это ново:** прошлые свипы не совмещали *несколько* экранных монет одновременно — `sweep_coins` был RO1-моделью с ОДНОЙ свободной монетой, `B-FRAMES` добавлял в видео-пул только `build/share/atom/link` (без `basic`/`token`).
- **Инструменты:** `tools/sweep_coin_video.py` (шардинг `--shard k --of 6`, `--selftest` зелёный) поверх `tools/fast_eth.py` (coincurve + pbkdf2 + keccak; проверен 40/40 против `bip_utils`, канон точный; ~557 адр/с/ядро). Лог: `data/sweep_coinvideo_all.log`.
- **Чтения:** сводный OCR 231 кадра (`tools/merge_ocr.py`) — **новых закладок на экране нет** (89 BIP39-слов = UI/сниппеты/сайдбар); содержательный экранный пласт только монетная таблица (atom/link/basic/token). `data/onscreen_bip39_words.json`.

**Что осталось (все — вне CPU-возможностей среды без ОК Ильи):** connecting words; substrings of longer words; экранные 219 слов (GPU). Плюс **мониторинг новых хинтов автора** (автор дописывает подсказки в видео). Приз жив: `0x9C2F…40CaF` = 8.61254155426562 ETH (17.10).

## Обновление GitHub-интейка (2026-10-18, Big Pickle)
- GitHub-интейк: **partial** (2026-10-18) — срезано потолками: собрано 4 кандидатов из 10 (--max-repos/--max-mb); остаток в `data/github/resume.json` репо: 4; путь дайдеста: `data/github/GITHUB_INTAKE.md`
