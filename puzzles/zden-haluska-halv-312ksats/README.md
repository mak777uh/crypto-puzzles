# Zden Level HALV

Индекс: [MASTER_CATALOG.md](../../MASTER_CATALOG.md) (Части 1-8). Источник данных: [open-crypto-puzzles](https://github.com/floflo777/open-crypto-puzzles).

## Кратко
- Статус: **open** (mid)
- Цепь: bitcoin
- Приз: 312500 sats (USD 197)
- Опубликовано: 2024-04-20 https://twitter.com/Zd3N/status/1781475361160663236
- Типы: geometry, raw-private-key
- Difficulty left: external-info
- the waveform geometry is stably measured across 3 independent passes; the measured information capacity of the image (about 118 bits) falls short of the 256 bits a private key needs, and no hint has been published for this specific puzzle, unlike every other long-open puzzle in the same series

## Адреса/эскроу
- `1crypto24HCr178iMcKd5iUi5D4rsg1nK` — main | expected: 312500 sats | state: funded-unspent (checked 2026-08-16) | https://mempool.space/address/1crypto24HCr178iMcKd5iUi5D4rsg1nK

## Источники
- 2024-04-20 — Zden, original announcement — https://twitter.com/Zd3N/status/1781475361160663236
- 2026-08-16 — Zden's puzzle site — https://crypto.haluska.sk/

## Подробности
Здесь должна накапливаться расширенная информация по мере проходов: подсказки, прогресс сообщества, проверенные гипотезы, ссылки, compute-оценки. Текущий файл — скелет из OCP; заполняется автоматически в циклах.


---
## Логирование (обязательно)
См. `../../AGENT_INSTRUCTIONS.md`. Любая значимая находка/прогресс/баланс/решение (полностью или частично) **должна** быть дописана сюда с датой и ссылкой. Параллельные агенты обязаны соблюдать тот же протокол.

## OCP deep docs
- Folder: https://github.com/floflo777/open-crypto-puzzles/tree/main/2-mid-prizes/zden-haluska-halv-312ksats
- README (raw): https://raw.githubusercontent.com/floflo777/open-crypto-puzzles/main/2-mid-prizes/zden-haluska-halv-312ksats/README.md
## Досье Hark v2 (16.10.2026)

Перенесено из `MASTER_CATALOG_v2_2026-10-16.md` (рабочие досье агентов Hark, 16.10.2026 23:40 МСК). Картина механизма, подсказок, проверенных и отброшенных гипотез, оракулов и файлов.

### B21. Zden «HALV» — 0,003125 BTC
- **→ Полное актуальное досье (что решено, что проверено, что осталось): ЧАСТЬ 8.5 (Zden HALV).** Старая краткая запись заменена.


### Zden «HALV» (crypto.haluska.sk) — 312 500 сат (0,003125 BTC)
- **Адрес/сеть/путь**: `1crypto24HCr178iMcKd5iUi5D4rsg1nK`, BTC P2PKH (ванити `1crypto…`). Ключ — сырой 256-битный приватный ключ, спрятанный в картинке; формат неизвестен: прямой hex (как LVL3/LVL5/Nethemba) или WIF (как LVL1/2/4/XM17/SFX). Оракул проверяет compressed и uncompressed.
- **Баланс**: 312 500 сат, 1 входящий выход, трат нет — mempool.space 15.10 ~02:20; циклы проекта «приз проверен/цел» — последняя запись 16.10 23:10 MSK.
- **Источники**: https://crypto.haluska.sk/ (зеркало crypto.satori.digital), опубликовано 20.04.2024; твит https://twitter.com/Zd3N/status/1781475361160663236. Решение LVL5: https://echo.ls/zden-level-5/ ; разбор LVL4: https://steemit.com/bitcoin/@mmorsl/solution-of-the-bitcoin-crypto-puzzle-level-4-by-zden. OCP: `/workspace/work/open-crypto-puzzles/2-mid-prizes/zden-haluska-halv-312ksats/`. Внешний разбор: github benjacasas02/independent-cryptography-research (research/zden; >33 000 кандидатов — 0).
- **Механизм**: одна картинка `cryptoHALV.png` (950×950, grayscale). Сигнал s(x)≥0 нарисован как s и −s, строго зеркален вокруг y=475 на x 93–857 (асимметрии кроме лого/маркера нет). Подсказка автора одна (20.04.2024): «This level is way easier than LVL 5. It shouldn't take long until it's solved.» Файлы `cryptoHALV_hint.*` — 404 (15.10).
- **Подсказки и наши чтения**:
  - В картинке: «CRYPTO.SATORI.DIGITAL_ZDEN.ART», адрес, штамп «20042402» = DDMMYYHH (20.04.24 02 ч CEST — момент халвинга, декор), логотип «BTCRYPTO / ZDEN / LVL / HALV». tEXt Comment — только название/адрес/домены/zden@satori.sk.
  - Маркер у x=91, y 443–506 (64 строки): 1-px линия из 4 штрихов 11/12/13/11 с паузами 5/6/5, яркость — пила из 7 ступеней (23…216), как «Linear Ramp» плагина Satori Pixel Stretch (SFX). Гипотеза: маркер старта/развёртки.
  - «Грамматика» автора (по решённым уровням): всё в точных целых пикселях, без LSB; квантование малыми уровнями (Nethemba: размер 0..3 = 2 бита); маркер старта/направления; LVL5 — измерения прямоугольников + формула из угла → round → суммы пар → 32 байта hex, uncompressed.
- **Что установлено**: модель отсчётов ТОЧНАЯ (15.10): 256 узлов на сетке x = 92 + 3k (k 0..255), значение в узле L∈{0..3} × unit полосы; 8 полос по 32 узла с unit 128, 64, 32, 16, 8, 4, 2, 1; между узлами прямые отрезки (подтверждено синтезом). Последовательность — `work/levels.txt`. Распределение 0:117, 2:78, 1:34, 3:27 — сильно неравномерно ⇒ вероятно НЕ прямые биты; 256×2 = 512 бит, а не 256. Лепестков (ненулевых серий) 63. Второго канала в наклонах/плато нет. OCP-модель «59 долей круг/ромб, ~118 бит» неверна.
- **Проверено и отброшено (все 0)**:
  - S3 (15.10): 158 структурных упаковок base-4 (все/чётные/нечётные узлы, MSB/LSB, прямой/обратный, инверсия, половины, XOR, sha256, 1 бит/узел, int mod 2^256); ASCII-гипотеза не печатна.
  - S4: лепестки/паузы/разности/вершины/высоты как hex, base 4–7/16 — 7 025. S5: base58-тест, base-7 по разностям, знак верх/низ (шум ≤14/255), WIF (512 бит не влезают) — ~24. S6: хеши строк маркера — 18. Цикл 7: выборки 4 из 8 полос — 6 720. Цикл 8: чёт/нечёт, hi/lo биты, пары-нибблы — 32.
  - I2 хеши дат/наград халвингов, 312500, адреса, имён — ~140; I3 хеши чисел маркера — 22 404; I4 PNG-стего/чанки/хвост — чисто (фон строго 0); I5 24 биекции уровень→2 бита × узлы × направление + пары base-7 — 290; White Paper-приём (sha/dsha файла/пикселей, строки) — 24.
  - OCP (до нас): 59-символьная последовательность форм (202 ключа), ступени халвинга (~47), брейнволлеты (~110), дифференциал+знак, wildcard WIF (>5·10⁸) — все 0.
- **Что осталось / следующий шаг**: I1 — разобрать solver-картинки прошлых уровней (crypto1–4solver, cryptoSFX_solver, crypto_nethemba_solver, cryptoxm17solver): какая операция над измерениями давала байты, вывести 3 схемы и применить к levels.txt (числится «следующим» с 16.10 14:40, пока не сделан). Открыто: маркер 11/12/13/11 как параметр чтения (старт/шаг), неравномерность распределения уровней как признак кода переменной длины/base58. Внешне — следить за появлением cryptoHALV_hint.
- **Оракул, скорость, файлы**:
  - `/workspace/projects/294b2fcf-d0e2-45ba-9439-92c69cd75685/work/oracle.py` (selftest OK; запуск `PYTHONPATH=work/pylib:/workspace/projects/b6983d3d-52f5-48f8-9974-b99dc8e31c55/work/pylib python3 work/oracle.py --stdin`), быстрый пакетный `work/check.py` (coincurve). OCP-оракул: `.../zden-haluska-halv-312ksats/tools/oracle.py`.
  - Данные: `work/levels.txt`, `work/node_final.csv`, `work/synth.py`, `work/disc2.py`, `work/vectorize.py`, `work/cands_*.txt`/`.py`, `work/data/cryptoHALV.png`, `work/data/solvers/` (решатели прошлых уровней), кропы маркера/даты. Журнал: `/workspace/projects/294b2fcf-d0e2-45ba-9439-92c69cd75685/NOTES.md`. Досье: `/workspace/projects/b6983d3d-52f5-48f8-9974-b99dc8e31c55/strategy/dossiers/zden-halv.md` (15.10 02:50) + `dossiers/halv/`.
- **Проекты Hark и статус**: `294b2fcf-d0e2-45ba-9439-92c69cd75685` «Zden HALV» — активен, цикл раз в 30 мин (с 16.10 11:35; 15.10 был переведён на ежедневный 10:00 после закрытия S1–S6). Последние ~10 циклов (с 14:40) новых идей не отработали — только проверка приза.
- **Оценка шансов**: 12% (досье 15.10, ярус 1). Блокер интеллектуальный: схема «уровни → 256 бит»; трат не требуется.

---

## Оперативный статус v2 (16.10.2026 ~23:30 МСК)

Строка из сводной таблицы `MASTER_CATALOG_v2` (Часть 0.3):

| Zden HALV | 312 500 сат, не тронут | ~12% | Осциллограмма = 256 узлов × 4 уровня × 8 полос; все прямые упаковки 0; дальше — грамматика автора по решателям LVL1–5 | проект 294b2fcf (цикл 15 мин) |

## Досье agntn/puzzles (16.10.2026)

Перенесено из реестра [@agntn/puzzles](https://puzzles.agntn.dev/collections/zden) (raw: https://puzzles.agntn.dev/collections/zden.md). Ниже — разбор первоисточника: механика, кто решал, что проверено.

- `sourceUrl`: "https://crypto.haluska.sk/crypto1.png"

> Sixteen visual puzzles by Zden on Bitcoin and Ethereum and Litecoin and Decred. Every one ships its image. Level 5 took eight years to crack.

## The puzzle

Zden publishes images with a key hidden in them, on [crypto.haluska.sk](https://crypto.haluska.sk/). Most levels are a single image. Autonomy combines images and animation across several stages. The prize sits on the address. The solver posts the key. The series moved across four chains, so this is the one collection that spans four values of `chain`. `zden/decred-janus` paid 460 DCR, `zden/litecoin-segwit` 230 LTC, `zden/xixoio` 6 ETH.

## What the records carry

Every Zden record has an `assets({ puzzle })` entry pointing at the image under `assets/zden/` in the repository, so `assetPath()` and `assetUrl()` answer for all sixteen. Fifteen carry the public key, seven carry the private key. A `solved` status doesn't mean the record has enough key material for `verify`; without it, verification answers `unavailable`.

`zden/decred-autonomy` was left out because the live catalog didn't show an address. The [original page's archived HTML](https://web.archive.org/web/20170430210807/https://decred.org/autonomy_puzzle/) links `DseEpHK49hHrTJhxwop3B86K1dryv4CYz8N` below its reward counter, so there's no need for a special addressless record. [Scott Burke's account for BlockCrushr Labs](https://medium.com/blockcrushr-labs/solving-decreds-autonomy-puzzle-aedac18f18f3) dates the launch to 25 April 2017 and documents their solution. The record ships Zden's [gate render](https://crypto.haluska.sk/gate_full.jpg), not the entire interactive puzzle.

Why did 355 DCR leave the address when the puzzle promised 500? [Decred's v1.0 press release](https://www.prnewswire.com/news-releases/decred-releases-v10-the-worlds-first-cryptocurrency-of-the-people-for-the-people-and-by-the-people-300443738.html) has the rule: 500 DCR to the first solver, cut every 24 hours. The chain follows it to the letter. On 26 April 100 DCR went back to the address that had put the prize up. Then 50 on the 27th, 25 on the 28th. Two deposits added 3 and 25 DCR. Slow solvers paid for every day, literally.

The rest of the history is housekeeping. The `funding` is a first 500 DCR that sat there from 6 to 11 April, before launch, and then left. The 502.86 DCR that stayed came in on the 20th. On launch day it left for another address and came back 24 minutes later. Same round trip as in [Proof of Writing](https://puzzles.agntn.dev/collections/proof-of-writing), so a `decrease` and an `increase`. Then 29 April, 23:08 UTC. One transaction sent 355 DCR out and the change back. A second one took the change in the same block. Both are `claim`, and `prize: 355.85470498` is what the address held right before. The launch is dated only to the day, so there's no `solveTime`. The article's publication date isn't a solve date either.

Seven of those solved records also ship the solution image he posted next to the puzzle. Levels 1, 2, 3, SFX, XM17, Nethemba and XIXOIO. The page linked them. The records didn't. `assets({ solution })` is the same field Movie Enigma already used, and `puzzles_show` prints it as `solution asset:`.

```ts
assets: assets({
  puzzle: "level-1/puzzle.png",
  solution: "level-1/solver.png",
  sourceUrl: "https://crypto.haluska.sk/crypto1.png",
}),
```

The hints Zden published are on the records too, in the shape they came in. Codex Protocol got two more renderings, Litecoin SegWit three SVG drawings and Decred Janus a stripped down tree, so those three list the files under `assets({ hints })` and `puzzles_show` prints them as `hint assets:`. The Janus file also comments `33*bbb`. That's the hint, so the record carries it as `official(…)` with a 2018 Wayback capture of the SVG. Demobit and XIXOIO were hinted on Twitter, so those two carry `official(…)` entries with the tweet as the source and a Wayback capture behind it. `puzzles_hints` answers the text ones. The image ones are files, and `assetLinks()` is where a script picks them up.

```ts [src/collections/zden/decred-janus.ts]
export const zdenPuzzleDecredJanus = puzzle({
  id: "zden/decred-janus",
  chain: "decred",
  address: "DsRaAja82UvgnqYaBHYFuyCKURFX2rCyEJ8",
  sourceUrl: "https://crypto.haluska.sk/decred_tree.svg",
  startedAt: "2017-03-07 04:20:56",
  status: Status.Solved,
  pubkey: compressed("02278753666ec31c29b755a39421017bd80744d728204da0f7ff452846112b618b"),
  prize: 460,
  solvedAt: "2017-03-18 13:51:29",
  transactions: [
    funding("900e…05f2", "2017-03-07 04:20:56", 100),
    increase("47c3…60c2", "2017-03-07 04:31:20", 100),
    increase("f968…6581", "2017-03-07 04:48:32", 100),
    increase("2a06…e90e", "2017-03-07 20:38:42", 150),
    increase("327a…4b13", "2017-03-07 20:55:54", 5),
    increase("77f5…4719", "2017-03-07 21:00:08", 5),
    claim("2af4…5467", "2017-03-18 13:51:29", 460),
  ],
  assets: assets({ puzzle: "decred-janus/puzzle.svg", hints: ["decred-janus/hint.svg"] }),
  hints: [
    official(
      "33*bbb",
      "https://crypto.haluska.sk/decred_tree_hint.svg",
      confirmation(
        "https://web.archive.org/web/20181219152809/http://crypto.haluska.sk/decred_tree_hint.svg",
        "Wayback capture of the hint SVG",
      ),
    ),
  ],
});
```

`prize: 460` is in DCR because the record says `chain: "decred"` and `prizeCurrency()` reads the chain's symbol from `@agntn/chains`. A `currency` field is only written when the prize isn't the native token.

The 777 sat tx on `zden/1bitcoin-white-paper` isn't the claim. It pays the notarization address and sends change back. The actual sweep lands four days later. His page says the image's SHA-256 is that wallet's private key, so the record quotes that as `official(…)`. The puzzle wallet key is a different one: JTobcat, Ziot and Motive printed it in their writeup, and the record stores that hex and WIF.

## Status

One puzzle is still open: `zden/level-halv`, the halving puzzle from April 2024. The only thing the author said about it, that it is way easier than level 5, is on the record. Level 5 is solved now, the story is below. Want to see what a solved multi chain record looks like? This is the collection.

## Level 5, solved after eight years

`zden/level-5` was the longest wait in this collection. Zden funded `1cryptoGeCRiTzVgxBQcKFFjSVydN1GW7` on 20 October 2018 and topped it up three times to 0.0055555 BTC. On 12 December 2021 Zden relaunched it with a corrected image and new hints, because the 2018 release was, in Zden's own words, incomplete. So for three years the puzzle had no solution at all. Everyone who tried was decoding a broken picture.

On 22 September 2026 at 18:34:35 UTC, in block 968171, all four outputs left in one transaction, [`e254…8e8e`](https://blockstream.info/tx/e2544433184d0fe4157ca10a8e1ce753bb52a7b0bbcf833740d7448ed25e8e8e). For five days that was all anyone had: a spend, an uncompressed public key and a fresh address. The record said `claimed`.

Then on 27 September the winner posted [the solution on echo.ls](https://echo.ls/zden-level-5/), and Zden's page now links it as written by the winner. Every rectangle gives four numbers: width, height and the two border thicknesses. The little diagram in the corner says `-1`, `×10` and `64`. Scale each side by ten, add its border, take one away, divide by 64. Multiply the two and you land within a sixth of an integer, every time. Sum the areas in pairs and the 32 sums are the 32 bytes of the key. Simple? Only once somebody shows you.

```ts [src/collections/zden/level-5.ts]
status: Status.Solved,
key: hex("f4bfad68198549d3e5612fa3b1cabad14679c634359e2f5efdd804ddce8a9f51").wif(
  "5Kg5Mosdn8dbSCsNBVtFHTVMjyfSE8UR2nfLLG8JcjWJNqtBBCG",
),
solver: party("echo.ls", { key: "echo-ls", /* … */ }),
```

`puzzles verify zden/level-5` derives the vanity address from that key, so you don't have to take anybody's word for it. The solver has [a page](https://puzzles.agntn.dev/solvers/echo-ls) too.

## Every puzzle

One page each: the record, the transactions and the live balance.

<collection-puzzles collection="zden">

</collection-puzzles>

## OCP: машинные данные (puzzles.json, 16.10.2026)

Структурированные данные из `puzzles.json` репозитория [open-crypto-puzzles](https://github.com/floflo777/open-crypto-puzzles) (snapshot OCP: 2026-08-16; цены: {'date': '2026-08-16', 'BTC': 63000, 'ETH': 1880, 'AR': 1.81, 'LTC': 54}).

- `slug`: zden-haluska-halv-312ksats
- `title`: Zden Level HALV
- `status`: **open**
- `tier`: mid | `chain`: bitcoin
- `series`: Zden's crypto.haluska.sk puzzle series
- `author`: Zden (Zdenek Haluska) | x:@Zd3N
- `prize`: 312500 sats (оценка $197 на 2026-08-16)
- `published`: 2024-04-20 https://twitter.com/Zd3N/status/1781475361160663236
- `puzzle_type`: geometry, raw-private-key
- `target_format`: 256-bit private key as direct hex, P2PKH
- `difficulty_left`: external-info
- `difficulty_note`: the waveform geometry is stably measured across 3 independent passes; the measured information capacity of the image (about 118 bits) falls short of the 256 bits a private key needs, and no hint has been published for this specific puzzle, unlike every other long-open puzzle in the same series
- `tested_total`: {'candidates': 500000400, 'families': 5, 'certified': False}

**Адреса и проверенное состояние:**
- `1crypto24HCr178iMcKd5iUi5D4rsg1nK` — escrow | main | ожидается: 312500 sats | проверено 2026-08-16: **funded-unspent**
  - https://mempool.space/address/1crypto24HCr178iMcKd5iUi5D4rsg1nK

**Деривация:**
- read the shape (circle or diamond) of each of 59 waveform lobes and any other channel needed, turn that reading into a 256-bit private key, derive P2PKH and compare to the escrow
- оракул: `tools/oracle.py` | сертифицирован: True
- сверено с: a standard public vector, private key 1 (the generator point); the puzzle's own waveform reading is not itself certified

**Зацепки (OCP `leads`):**
  - title: a hint published by the author (none exists yet for this puzzle) | status: open
  - title: certify the oracle with a known-good vector | status: open

**Артефакты (OCP `artifacts`):**
  - source: https://crypto.haluska.sk/

**Источники (OCP `sources`):**
  - url: https://twitter.com/Zd3N/status/1781475361160663236 | title: Zden, original announcement | date: 2024-04-20
  - url: https://crypto.haluska.sk/ | title: Zden's puzzle site | date: 2026-08-16

## Обновление GitHub-интейка (2026-10-18, Qoder)
- GitHub-интейк: **partial** (2026-10-18) — срезано потолками: собрано 2 репо из 8 кандидатов (--max-repos 2), 111 файл (533 КБ), 0 API-запросов; остаток в `data/github/resume.json` репо: 2; путь дайдеста: `data/github/GITHUB_INTAKE.md`
- Остаток — форки `*/open-crypto-puzzles` (шум реестра, не содержимое пазла): полная пересборка `run … --full` при наличии бюджета.


## Итог прохода 2026-10-18 (Qoder) — модель исправлена, три оси закрыты
- **Сертифицировано измерительное плечо:** LVL 1 воспроизведён по пикселям 47/51 символа
  (правило `ord(c) = round((x_end − 30)/12) + 47`, шаг 12 px) — `tools/zden_grammar_verify_2026-10-18.py lvl1`.
  Ground truth 6 решённых уровней герметичен: hex → **uncompressed** P2PKH = адрес уровня
  байт в байт (та же подкоманда, `gt`).
- **ИСПРАВЛЕНА ОСНОВНАЯ МОДЕЛЬ:** решётка 3-px ячеек начинается с **x = 112**, а не с x = 92
  (область 92..111 — шкала: пунктир на x=91 и «ромб» ±385 = 3·128). Прежние ~20 000 /
  >33 000 кандидатов брались не в той фазе и правильную решётку не покрывают.
- Съёмщик и результат: `tools/zden_halv_measure_2026-10-18.py` → `data/halv_wave_model_2026-10-18.json`
  (контурная осциллограмма, 64 нулевых прогона / 63 импульса, октавы unit = 128>>b, вершина = 3·unit).
- Грамматики всех решённых уровней собраны в `data/GRAMMAR.md`; калибровка — `data/solvers/`
  (35 файлов, sha256 в `data/solvers/MANIFEST.md`).
- **Негативы (оракул, свидетели OK):** A1 бит присутствия — 8; A2 уровни → hi/lo/xor-плоскости — 48;
  A3 все 24 биекции уровень→2 бита на правильной решётке — 192. Итого 256 кандидатов, 0 совпадений (A1b — то же присутствие, но по центру ячейки, 8).
- Стего отрицательно: tEXt = только название/адрес/контакты, после IEND пусто, LSB без ASCII,
  вне bounding box — только футер и логотип.
- **Свободная часть:** не упаковка, а операция «измерение → байт» (прецедент LVL 5) и каналы
  «ширины провалов/импульсов» (1..7 ячеек) и «форма вершины». LVL 2 машинно не воспроизведён.
- Отчёт: `reports/2026-10-18_1645_Qoder_zden-halv-grammar-induction.md`. Бронь снята.
