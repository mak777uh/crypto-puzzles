# Arweave Puzzle #3

Индекс: [MASTER_CATALOG.md](../../MASTER_CATALOG.md) (Части 1-8). Источник данных: [open-crypto-puzzles](https://github.com/floflo777/open-crypto-puzzles).

## Кратко
- Статус: **open** (mid)
- Цепь: arweave
- Приз: 1000.165838006237 AR (USD 1810)
- Примечание: balance drifts slightly above the original funding from unsolicited dust deposits over the years
- Опубликовано: 2019-05-27 https://twitter.com/arweavep/status/1132936723162378240
- Типы: word-selection, text-cipher
- Difficulty left: insight
- Exact-address oracle and original-page controls pass. Historical searches lack per-run witnesses and do not prove the number of wrong image readings. Dated ecosystem sources and visual interpretation remain unresolved.

## Адреса/эскроу
- `wHP6OPG5GMF5dedo_CD8AAy6x8La-gfI5b5pk65Tx_0` — main | expected: 1000.165838006237 AR | state: funded-unspent (checked 2026-09-04) | https://viewblock.io/arweave/address/wHP6OPG5GMF5dedo_CD8AAy6x8La-gfI5b5pk65Tx_0

## Источники
- 2019-05-27 — Puzzle Weave 3 announcement — https://twitter.com/arweavep/status/1132936723162378240
- 2019-05-27 — Live puzzle page — https://kszeqgxezf5quhzld4nhpasyilhxphclq2peqi5mrn7utxmqhwga.arweave.net/VLJIGuTJewofKx8ad4JYQs93nEuGnkgjrIt_Sd2QPYw
- 2019-09-26 — "With N.1.7.0.0 release, third pic became obsolete" — https://twitter.com/arweavep/status/1177235139035836417
- 2019-07-21 — "Did anybody count the dots?" — https://twitter.com/arweavep/status/1152887601529073665
- 2020-03-04 — "The list of unsolved Arweave puzzles ordered by difficulty probably looks like: 3, 9, 8, 5, 7" — https://twitter.com/arweavep/status/1235199397371277315
- 2026-08-16 — HomelessPhD/AR_Puzzles community repository, PZL3 entry — https://github.com/HomelessPhD/AR_Puzzles/tree/main/PZL3
- 2026-08-16 — Escrow wallet, viewblock.io — https://viewblock.io/arweave/address/wHP6OPG5GMF5dedo_CD8AAy6x8La-gfI5b5pk65Tx_0
- 2019-10-10 — Community Spotlight: Meeting Tiamat — https://arweave.medium.com/community-spotlight-meeting-tiamat-e484655b25e0
- 2019-05-27 — Arweave Newsletter: May — https://arweave.medium.com/arweave-newsletter-may-9de22fa3700e

## Подробности
Здесь должна накапливаться расширенная информация по мере проходов: подсказки, прогресс сообщества, проверенные гипотезы, ссылки, compute-оценки. Текущий файл — скелет из OCP; заполняется автоматически в циклах.


---
## Логирование (обязательно)
См. `../../AGENT_INSTRUCTIONS.md`. Любая значимая находка/прогресс/баланс/решение (полностью или частично) **должна** быть дописана сюда с датой и ссылкой. Параллельные агенты обязаны соблюдать тот же протокол.

## OCP deep docs
- Folder: https://github.com/floflo777/open-crypto-puzzles/tree/main/2-mid-prizes/arweave-puzzle-3-1000ar
- README (raw): https://raw.githubusercontent.com/floflo777/open-crypto-puzzles/main/2-mid-prizes/arweave-puzzle-3-1000ar/README.md

## Досье Hark v2 (16.10.2026)

### Arweave Puzzles (автор Tiamat, @arweavep) — #3, #10, #11, #12
Общее: механизм #3/#10/#12 = SHA512^11513(ответ) hex → CryptoJS EvpKDF (1e4 итераций, 32 слова) → Rijndael Nk=32/Nr=38 CBC → Arweave JWK; сертифицирован на решённом #8 («RasputinWilhelmAlekhine»). Наш чекер `$W/arweave/fastcheck.py {3|10}` — расшифровка первого блока, при префиксе `{"` полный оракул; ~20 канд/с/ядро при свободном CPU (KDF дорогой; реально 7–20). Ложные `{"` ≈1/65k (встречались, полный оракул отсекал). Хиты пишутся в `$W/arweave/hits.private` (600, не открывать в отчётах). Источник общины: https://github.com/HomelessPhD/AR_Puzzles (README PZL3/PZL10, issues #5–#12 — авторских подсказок нет). Свип-конвейер готов, не использован: `$W/arweave/sweep/sweep.js`, `autosweep.py`, `p10/autosweep10.py`. Работа в проекте «работа», остановлена 14.10 22:00.

---

#### #3 — 1000,165838 AR
- **Адрес**: `wHP6OPG5GMF5dedo_CD8AAy6x8La-gfI5b5pk65Tx_0`. **Баланс**: 1 000 165 838 006 237 winston, last_tx пуст — наша проверка 13.10.2026 06:49 UTC. Опубликован 27.05.2019 (изначально 750 AR, позже доливка).
- **Источники**: OCP `2-mid-prizes/arweave-puzzle-3-1000ar`; страница arweave.net/VLJIGuTJ… (32 поля по 1 символу = 8×4); Discord-экспорт/Medium/tiamat в `$W/arweave/src/`; ответы автора в треде твита 1132936723162378240 (архив 2022).
- **Механизм**: 8 ребусов по 4 символа, склейка, lowercase (пустые клетки допустимы).
- **Подсказки и чтения**: 1 кривые буквы A N/H I D → anno / 1984 (плакат Big Brother, порт Arweave 1984) / aihd — слабо; 2 ромб «21863» → md12 / md5 / pool — не решён; 3 кирка + «SH», автор: «with N.1.7.0.0 release, third pic became obsolete» (SHA-384→RandomX) → **a384** (сильно); 4 перевёрнутый треугольник с гранёным камнем = **логотип SILO** (баннер Medium 21.02.2019) → **silo** (сильно; автор «подогнал ответ под очевидную догадку arweave-india»); 5 карта Скандинавии → e4d5 / loki; 6 дерево → root/tree (цитата «type TREE» может относиться к #5 → tree не исключать); 7 кактус + бумеранг + камень → pull / **arid** (ArweaveID); 8 точки, «Did anybody count the dots?» → 57–58 → **base** (Base58). Автор: «7 картинок легко тому, кто следил 6 месяцев, для 1 нужна удача».
- **Проверено и отброшено**: H5 (консенсус anno md12 a384 cash e4d5 root pull base + все 1–2-слотовые замены) 11 973; H6 (silo+arid) 4 808; H7 5 544; H8 (a384/silo/base фикс., продукт слотов 5×6×7 × 25×25 слов слотов 1–2) 77 256; H9–H11 (1984/aihd, md5, короткие слова) 20 968 → **всего ≈121 тыс. уникальных, 0 совпадений** (12–13.10). OCP: 1 679 616 и ~3,3·10⁸ (без свидетелей) — 0. H9 чанки 07–10 (~8 тыс.) не завершены (VM-рестарт).
- **18.10 (Qoder Desktop)**: ось «компаунд-слово» (рисунок = один компонент термина, ответ = второй: ANNO→unce, ZIP→code, SH→a384, AR→cash, Scandinavia→e4d5, tree→hash, UP→vest, 58→base) — 7 349 уникальных (A 800 vest, B 800 pull, C 3 124 расширенные пулы, D 2 625 silo-вариант), **0 совпадений**; точный `oracle.check()` через `tools/ocp/parallel_check.py` (~6/с на 14 воркерах), selftest PZL8 OK. Файлы `data/compound_batch_[A-D].txt`, sha256 в `LOG.md` и `data/01_tested.md`. Ось исчерпана; тотальный счёт по папке ≈128 тыс. уникальных, 0.
- **Осталось**: ≥1–2 опорных слота прочитаны неверно; нужны новые прочтения по источникам 12.2018–05.2019 (логотипы Chronobot, Weavemail, ArweaveID, Quorweave), «tree» в слоте 6, семейство Big Brother в слоте 1, слот 2.
- **Файлы**: `$W/arweave/gen3_h5.py`…`gen3_h11.py`, `$W/arweave/runs/` (списки и выводы, `tested_h5_h8.txt`), `$W/arweave/NOTES.md`.
- **Шансы**: 2–3 % (аудит 15.10, ярус 3; брать только с новой идеей прочтения).

## Оперативный статус v2 (16.10.2026 ~23:30 МСК)

Строка из сводной таблицы `MASTER_CATALOG_v2` (Часть 0.3):

| Arweave #3 / #10 | 1000,166 AR / 500,022 AR, не тронуты | низкий | ~121 тыс. кандидатов #3 = 0 | заморожено |

## Досье agntn/puzzles — серия Puzzle Weave (16.10.2026)

Общий разбор серии Puzzle Weave из реестра [@agntn/puzzles](https://puzzles.agntn.dev/collections/weave) (raw: https://puzzles.agntn.dev/collections/weave.md).


> Tiamat's twelve weave puzzles from 2019 and 2020 with prizes in AR and ETH and DAI. Nine claimed. Three still open including over 1500 AR.

## The puzzle

Tiamat published a series of puzzles on Arweave itself. Every titled page says Puzzle Weave and a number. Hence the key `weave` and ids like `weave/3`. Arweave is the address, not the name. Each puzzle is a transaction with instructions and a funded wallet. A few live on Ethereum for variety. The prizes were AR for the most part, plus a few ETH and one 100 DAI bounty. That bounty is why `currency` exists as a field.

```ts
const puzzle = await get("weave/9");

puzzle.chain(); // "ethereum"
puzzle.prize(); // 100
puzzle.currency(); // "DAI"
puzzle.prizeCurrency(); // "DAI", not ETH
```

## What the records carry

An Arweave address is a `standard` address. There are no script kinds to pick from, and the library has no key to address derivation for the chain, so an Arweave record never verifies. It doesn't have to. None of the solvers published a key. The outcomes are `claimed`, the wallet was emptied, and the record stops where the knowledge stops. The Ethereum records in the collection are the same shape with `chain: "ethereum"`.

```ts [src/collections/weave/3.ts]
export const weave3 = puzzle({
  id: "weave/3",
  chain: "arweave",
  address: "wHP6OPG5GMF5dedo_CD8AAy6x8La-gfI5b5pk65Tx_0",
  sourceUrl: "https://ur42unm2jhdm.arweave.net/VLJIGuTJewofKx8ad4JYQs93nEuGnkgjrIt_Sd2QPYw",
  startedAt: "2019-05-25 13:07:33",
  prize: 1000.165838006237,
  transactions: [
    funding("hTB5Ouv5nY11pQiGFXCJQZxNOkVlgPAAJ9IYSRu8v0E", "2019-05-25 13:07:33", 250),
    funding("_Aa5au3qzhCSIPxj5RfLkF_eSUuxAcnqoWY3PeKTaRg", "2019-05-27 08:30:39", 500),
    funding("7-sWojFc0sG3mTr34YGBGssYDvXjOPZf-xik8v1Ct24", "2019-08-28 14:09:38", 250),
    increase("2u0lD8wh91CYdWU0NiqSPC2K2MBo-1KdtKSREcSoyjc", "2021-12-21 01:58:12", 0.03062018),
    increase(…),
    …
  ],
});
```

Three funding transactions make the 1000 AR bounty. Then strangers kept tipping the wallet, from December 2021 to September 2025. A few sent hundredths of an AR, most a lot less. Who sends dust to an open puzzle? Nobody says. The record lists every tip anyway, because the prize is what the wallet holds, not what the author promised. `weave/10` and `weave/12` got the same treatment.

## Two weaves you can actually read

Most weaves are a picture and an unlock box. Two of them aren't. `weave/1` and `weave/4` print their riddles as plain text. So the records carry them as `official` hints, one riddle per hint. `puzzles hints weave/4` lists them.

### Puzzle Weave 1, seven riddles and one rule

The page has seven riddles. Under each one the blanks give away the length of the answer. The instructions add a rule: write several numbers in ascending order. That rule is a hint too. The last riddle is a picture of ten logos, so the record ships it as `assets/weave/1/logos.png`.

ZorenX wrote up every answer in June 2020. Each one sits on its riddle as `answer`. Glued together they make `5710:011890DeadSeaBd6Apple039`. Ten boxes, zero spaces.

The page also promised more hints through Weavemail every couple of days. None of them made it to the record.

### Puzzle Weave 4 and a lot of zeros

Five riddles, one input box. Tiamat helped twice under the launch tweet. First came a run length example, a week after it. Then one line about the droids: only a "%" on the 2nd question. ZorenX lists a third hint, no separators and case sensitive. It isn't anywhere on Tiamat's feed that we could find. So the record keeps it as `community`.

Which is the most compressible hodler? A zero address, obviously. Except the answer has 41 zeros, one more than an Ethereum address holds. And that's exactly the string that opens the wallet.

Medium marks that write-up as edited two weeks after it went up. Which version first had the answers? No capture says. So the Weave 4 answers carry no date.

### Check the answers yourself

Both pages keep the encrypted key file and the code that opens it. The code runs the answer through SHA-512 11,513 times, then decrypts with CryptoJS AES. We ran it on both published strings. Each one gave back a key file for the record's address. A wrong string just says FAILED.

## Status

Three open: `weave/3` and `weave/10` on Arweave, `weave/11` on Ethereum for 1 ETH. `puzzles balance weave/3` asks the arweave.net gateway whether the AR is still there.

`weave/12` held out for six and a half years. On 3 October 2026 someone moved 1 AR out of it, waited five minutes and took the other 398.75. Nobody has said who or how, so the record has both claims and no solver.

## Every puzzle

One page each: the record, the transactions and the live balance.

<collection-puzzles collection="weave">

</collection-puzzles>

## OCP: машинные данные (puzzles.json, 16.10.2026)

Структурированные данные из `puzzles.json` репозитория [open-crypto-puzzles](https://github.com/floflo777/open-crypto-puzzles) (snapshot OCP: 2026-09-07; цены: {'date': '2026-08-16', 'BTC': 63000, 'ETH': 1880, 'AR': 1.81, 'LTC': 54}).

- `slug`: arweave-puzzle-3-1000ar
- `title`: Arweave Puzzle #3
- `status`: **open**
- `tier`: mid | `chain`: arweave
- `series`: arweave-puzzles
- `author`: Tiamat | twitter:@ArweaveP
- `prize`: 1000.165838006237 AR (оценка $1810 на 2026-08-16) — balance drifts slightly above the original funding from unsolicited dust deposits over the years
- `published`: 2019-05-27 https://twitter.com/arweavep/status/1132936723162378240
- `puzzle_type`: word-selection, text-cipher
- `target_format`: 8 four-character answers, one per rebus image, concatenated in image order and lowercased, SHA-512 applied 11,513 times, CryptoJS AES-OpenSSL decrypt (non-standard 1024-bit key, 38-round Rijndael), plaintext must contain the literal "kty":"RSA"; derive base64url(SHA256(decoded JWK n)) and require exact escrow-address equality
- `difficulty_left`: insight
- `difficulty_note`: Exact-address oracle and original-page controls pass. Historical searches lack per-run witnesses and do not prove the number of wrong image readings. Dated ecosystem sources and visual interpretation remain unresolved.
- `tested_total`: {'candidates': 1216, 'families': 4, 'certified': True}

**Адреса и проверенное состояние:**
- `wHP6OPG5GMF5dedo_CD8AAy6x8La-gfI5b5pk65Tx_0` — escrow | main | ожидается: 1000.165838006237 AR | проверено 2026-09-04: **funded-unspent**
  - https://viewblock.io/arweave/address/wHP6OPG5GMF5dedo_CD8AAy6x8La-gfI5b5pk65Tx_0

**Деривация:**
- read 8 hand-drawn rebus images into 8 four-character tokens, concatenate in DOM order, lowercase, stretch with SHA-512 x11513, use the result as an EvpKDF/AES-OpenSSL password to decrypt the page's ciphertext into an Arweave RSA wallet keyfile
- оракул: `tools/oracle.py` | сертифицирован: True
- сверено с: Real solved sibling #8, positive and wrong-target controls; original #3 JavaScript encrypt/decrypt fixture with lowercase and whitespace checks, 2026-09-05

**Зацепки (OCP `leads`):**
  - title: sharper visual/OSINT reading of slots 1 and 7, plus the slot 5 and slot 8 arbitration | status: open
  - title: bounded 2-slot sweeps on the most-suspect pairs once a reading is fixed | status: open

**Артефакты (OCP `artifacts`):**
  - source: https://kszeqgxezf5quhzld4nhpasyilhxphclq2peqi5mrn7utxmqhwga.arweave.net/VLJIGuTJewofKx8ad4JYQs93nEuGnkgjrIt_Sd2QPYw
  - source: https://kszeqgxezf5quhzld4nhpasyilhxphclq2peqi5mrn7utxmqhwga.arweave.net/VLJIGuTJewofKx8ad4JYQs93nEuGnkgjrIt_Sd2QPYw
  - source: https://kszeqgxezf5quhzld4nhpasyilhxphclq2peqi5mrn7utxmqhwga.arweave.net/VLJIGuTJewofKx8ad4JYQs93nEuGnkgjrIt_Sd2QPYw
  - source: https://kszeqgxezf5quhzld4nhpasyilhxphclq2peqi5mrn7utxmqhwga.arweave.net/VLJIGuTJewofKx8ad4JYQs93nEuGnkgjrIt_Sd2QPYw
  - source: https://kszeqgxezf5quhzld4nhpasyilhxphclq2peqi5mrn7utxmqhwga.arweave.net/VLJIGuTJewofKx8ad4JYQs93nEuGnkgjrIt_Sd2QPYw
  - source: https://kszeqgxezf5quhzld4nhpasyilhxphclq2peqi5mrn7utxmqhwga.arweave.net/VLJIGuTJewofKx8ad4JYQs93nEuGnkgjrIt_Sd2QPYw
  - source: https://kszeqgxezf5quhzld4nhpasyilhxphclq2peqi5mrn7utxmqhwga.arweave.net/VLJIGuTJewofKx8ad4JYQs93nEuGnkgjrIt_Sd2QPYw
  - source: https://kszeqgxezf5quhzld4nhpasyilhxphclq2peqi5mrn7utxmqhwga.arweave.net/VLJIGuTJewofKx8ad4JYQs93nEuGnkgjrIt_Sd2QPYw
  - source: https://kszeqgxezf5quhzld4nhpasyilhxphclq2peqi5mrn7utxmqhwga.arweave.net/VLJIGuTJewofKx8ad4JYQs93nEuGnkgjrIt_Sd2QPYw

**Материалы третьих лиц:**
- the 8 rebus images and their composite are the author's own puzzle material, published on the Arweave permaweb page; no book, audio, or video material; no third-party community images shipped

**Источники (OCP `sources`):**
  - url: https://twitter.com/arweavep/status/1132936723162378240 | title: Puzzle Weave 3 announcement | date: 2019-05-27
  - url: https://kszeqgxezf5quhzld4nhpasyilhxphclq2peqi5mrn7utxmqhwga.arweave.net/VLJIGuTJewofKx8ad4JYQs93nEuGnkgjrIt_Sd2QPYw | title: Live puzzle page | date: 2019-05-27
  - url: https://twitter.com/arweavep/status/1177235139035836417 | title: "With N.1.7.0.0 release, third pic became obsolete" | date: 2019-09-26
  - url: https://twitter.com/arweavep/status/1152887601529073665 | title: "Did anybody count the dots?" | date: 2019-07-21
  - url: https://twitter.com/arweavep/status/1235199397371277315 | title: "The list of unsolved Arweave puzzles ordered by difficulty probably looks like: 3, 9, 8, 5, 7" | date: 2020-03-04
  - url: https://github.com/HomelessPhD/AR_Puzzles/tree/main/PZL3 | title: HomelessPhD/AR_Puzzles community repository, PZL3 entry | date: 2026-08-16
  - url: https://viewblock.io/arweave/address/wHP6OPG5GMF5dedo_CD8AAy6x8La-gfI5b5pk65Tx_0 | title: Escrow wallet, viewblock.io | date: 2026-08-16
  - url: https://arweave.medium.com/community-spotlight-meeting-tiamat-e484655b25e0 | title: Community Spotlight: Meeting Tiamat | date: 2019-10-10
  - url: https://arweave.medium.com/arweave-newsletter-may-9de22fa3700e | title: Arweave Newsletter: May | date: 2019-05-27
