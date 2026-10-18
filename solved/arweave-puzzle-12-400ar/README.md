# Arweave Puzzle Weave #12
> **ПЕРЕМЕЩЕНО 2026-10-17 в `master/solved/`** — пазл решён/закрыт/тупиковый, активная работа не ведётся. Причина: [../INDEX.md](../INDEX.md). Вернуть в `puzzles/` — только при новых данных (правила: `AGENT_INSTRUCTIONS.md`).

Индекс: [MASTER_CATALOG.md](../../MASTER_CATALOG.md) (Части 1-8). Источник данных: [open-crypto-puzzles](https://github.com/floflo777/open-crypto-puzzles).

## Кратко
- Статус: **open** (mid)
- Цепь: arweave
- Приз: 400.00248121 AR (USD 724)
- Примечание: the small amount above 400 AR is unsolicited dust received after the 2020-04-14 funding, not a partial withdrawal
- Опубликовано: 2020-05-05 https://twitter.com/arweavep/status/1257613928185675776
- Типы: word-selection, geometry, text-cipher
- Difficulty left: insight
- mechanism and oracle fully certified; piece 3 is solved with certainty, piece 1 has a strong unconfirmed reading, piece 4's hatching is refuted as an ordering scheme; the open gap is piece 2's exact 18-character string once the other 3 pieces are fixed

## Адреса/эскроу
- `XRGEfkMbCMHeTY9mZI9Lh6hf8EmA8RstmBFUjDm40fg` — main | expected: 400.00248121 AR | state: funded-unspent (checked 2026-08-16) | https://viewblock.io/arweave/address/XRGEfkMbCMHeTY9mZI9Lh6hf8EmA8RstmBFUjDm40fg

## Источники
- 2020-05-05 — "Puzzle 12 is here" — https://twitter.com/arweavep/status/1257613928185675776
- 2020-04-29 — Live puzzle page — https://arweave.net/gymumAAsxGlzqPL5HzoEB8Xryu61o174j7vHwx21Qoo
- 2020-05-23 — "58 chars CS" — https://twitter.com/arweavep/status/1264211142714499072
- 2020-04-14 — "1,2,4,8 = solved / 3,5,7,9 = not solved yet" — https://twitter.com/arweavep/status/1250036746802298885
- 2026-08-16 — HomelessPhD/AR_Puzzles community repository, PZL12 entry — https://github.com/HomelessPhD/AR_Puzzles/tree/main/PZL12
- 2026-08-16 — Escrow wallet, viewblock.io — https://viewblock.io/arweave/address/XRGEfkMbCMHeTY9mZI9Lh6hf8EmA8RstmBFUjDm40fg

## Подробности
Здесь должна накапливаться расширенная информация по мере проходов: подсказки, прогресс сообщества, проверенные гипотезы, ссылки, compute-оценки. Текущий файл — скелет из OCP; заполняется автоматически в циклах.


---
## Логирование (обязательно)
См. `../../AGENT_INSTRUCTIONS.md`. Любая значимая находка/прогресс/баланс/решение (полностью или частично) **должна** быть дописана сюда с датой и ссылкой. Параллельные агенты обязаны соблюдать тот же протокол.

## OCP deep docs
- Folder: https://github.com/floflo777/open-crypto-puzzles/tree/main/2-mid-prizes/arweave-puzzle-12-400ar
- README (raw): https://raw.githubusercontent.com/floflo777/open-crypto-puzzles/main/2-mid-prizes/arweave-puzzle-12-400ar/README.md

## Досье Hark v2 (16.10.2026)

### Arweave Puzzles (автор Tiamat, @arweavep) — #3, #10, #11, #12
Общее: механизм #3/#10/#12 = SHA512^11513(ответ) hex → CryptoJS EvpKDF (1e4 итераций, 32 слова) → Rijndael Nk=32/Nr=38 CBC → Arweave JWK; сертифицирован на решённом #8 («RasputinWilhelmAlekhine»). Наш чекер `$W/arweave/fastcheck.py {3|10}` — расшифровка первого блока, при префиксе `{"` полный оракул; ~20 канд/с/ядро при свободном CPU (KDF дорогой; реально 7–20). Ложные `{"` ≈1/65k (встречались, полный оракул отсекал). Хиты пишутся в `$W/arweave/hits.private` (600, не открывать в отчётах). Источник общины: https://github.com/HomelessPhD/AR_Puzzles (README PZL3/PZL10, issues #5–#12 — авторских подсказок нет). Свип-конвейер готов, не использован: `$W/arweave/sweep/sweep.js`, `autosweep.py`, `p10/autosweep10.py`. Работа в проекте «работа», остановлена 14.10 22:00.

---

#### #12 — 400,00248121 AR — **ПОПРАВКА: приз, по нашим данным, забран**
- **Адрес**: `XRGEfkMbCMHeTY9mZI9Lh6hf8EmA8RstmBFUjDm40fg`. Каталог (7.2) пишет «открыто, проверено 16.08.2026» по OCP; но наш скан 12.10.2026 показал **0 AR** («appears swept», work/zero-spend-earning-scan-2026-10-12.md), а лог ПК-агента Ильи 14.10 фиксирует вывод средств tx `gx0Ws1TP…` (эскроу = 0). Строку каталога надо перевести в «решён/забран», перепроверить на viewblock перед любым действием.
- **Механизм (для истории)**: пазл из 4 кусков (флаги, кит + дата 16-03-2020, фигуры с цифрами, 5 штрихованных букв) → один ответ 58 символов с учётом регистра, тот же пайплайн. Кусок 3 решён (2111011 → HEXAGON), кусок 1 — сильное неподтверждённое чтение, кусок 2 (18 символов) открыт; OCP ~157 тыс. кандидатов = 0. ПК-агент Ильи написал сертифицированный решатель (C+OpenCL), работа брошена из-за нулевого баланса.
- **Шансы**: 0 (приза нет).

Файл: `/workspace/projects/aa5ddde6-45de-46be-b0aa-6bd4db202e32/work/catalog_parts/g3.md`

---

## Досье Hark v2 (16.10.2026) — каталог 7.2

### Arweave Weave #12 — 400,00248121 AR (~$724)
- ⚠️ **ПОПРАВКА 16.10: по нашей ончейн-проверке приз ЗАБРАН / эскроу пуст** (см. 8.6 §0). Статус «открыто» ниже — устаревшие данные OCP (август).
- **Адрес**: `XRGEfkMbCMHeTY9mZI9Lh6hf8EmA8RstmBFUjDm40fg` (Arweave)
- **Статус**: открыто (funded-unspent, проверено 16.08.2026)
- **Тип**: word-selection, geometry, text-cipher
- **Источники**:
  - X: https://twitter.com/arweavep/status/1257613928185675776 (05.05.2020, «Puzzle 12 is here»)
  - Страница: https://arweave.net/gymumAAsxGlzqPL5HzoEB8Xryu61o174j7vHwx21Qoo
  - X: https://twitter.com/arweavep/status/1264211142714499072 («58 chars CS»)
  - X: https://twitter.com/arweavep/status/1250036746802298885 («1,2,4,8 = solved / 3,5,7,9 = not solved»)
  - OCP: https://github.com/floflo777/open-crypto-puzzles/tree/main/2-mid-prizes/arweave-puzzle-12-400ar
  - Explorer: https://viewblock.io/arweave/address/XRGEfkMbCMHeTY9mZI9Lh6hf8EmA8RstmBFUjDm40fg
- **Суть**: кусок 3 решён, кусок 1 имеет сильное неподтверждённое чтение, открыто 18-символьное значение куска 2.

## Поправка к каталогу v2 (16.10.2026) — Arweave Weave #12

**В разделе 7.2 каталога четыре пазла названы «открытыми», но наша живая проверка 12.10.2026 это опровергает.** Источники: `/workspace/work/puzzle-inventory-2026-10-12.md`, раздел «Swept, solved or unfunded», и `/workspace/work/ocp_check_2026-10-12.txt`. Статусы «открыто» в 7.2 взяты из манифеста OCP (проверка 16.08–27.08.2026) и устарели.
   - **Arweave Weave #12.** Адрес `XRGEfkMb…40fg`: баланс 0 AR, last_tx `gx0Ws1TP…`. В ocp_check «DRIFT: manifest says funded-unspent, chain says unfunded». Handoff 14.10 тоже пишет «#12 забран».
   - **FTPK Season 2.** Контракт `0xb5fe4f1b…dc`: USDT balanceOf = 0, nonce 6. ocp_check: «swept».
   - **LogicBeach «Powerful Moss»** (Base). Контракт `0x831102C7…44Dd`: баланс 0, nonce 1. В инвентаре: «claimed Oct 2026».
   - **Pindar Van Arman bitGAN.** Адрес `0x18f87e…478d`: 0 ETH (12.10 и 14.10). Приз здесь NFT, а владение NFT мы **не проверяли**, так что статус не подтверждён.

## Оперативный статус v2 (16.10.2026 ~23:30 МСК)

Строка из сводной таблицы `MASTER_CATALOG_v2` (Часть 0.3):

| Arweave #12 | **0 AR — забран** | — | Не брать | — |

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

- `slug`: arweave-puzzle-12-400ar
- `title`: Arweave Puzzle Weave #12
- `status`: **open**
- `tier`: mid | `chain`: arweave
- `series`: arweave-puzzles
- `author`: Tiamat | twitter:@ArweaveP
- `prize`: 400.00248121 AR (оценка $724 на 2026-08-16) — the small amount above 400 AR is unsolicited dust received after the 2020-04-14 funding, not a partial withdrawal
- `published`: 2020-05-05 https://twitter.com/arweavep/status/1257613928185675776
- `puzzle_type`: word-selection, geometry, text-cipher
- `target_format`: one 58-character answer, case-sensitive, the concatenation of 4 jigsaw sub-answers with no separator, SHA-512 applied 11,513 times, CryptoJS AES-OpenSSL decrypt (non-standard 1024-bit key, 38-round Rijndael), plaintext must contain the literal "kty":"RSA"
- `difficulty_left`: insight
- `difficulty_note`: mechanism and oracle fully certified; piece 3 is solved with certainty, piece 1 has a strong unconfirmed reading, piece 4's hatching is refuted as an ordering scheme; the open gap is piece 2's exact 18-character string once the other 3 pieces are fixed
- `tested_total`: {'candidates': 3014356, 'families': 16, 'certified': True}

**Адреса и проверенное состояние:**
- `XRGEfkMbCMHeTY9mZI9Lh6hf8EmA8RstmBFUjDm40fg` — escrow | main | ожидается: 400.00248121 AR | проверено 2026-08-16: **funded-unspent**
  - https://viewblock.io/arweave/address/XRGEfkMbCMHeTY9mZI9Lh6hf8EmA8RstmBFUjDm40fg

**Деривация:**
- read each of the 4 jigsaw pieces (flags, a whale and a date, shapes with digit strings, hatched letters) into its own sub-answer, concatenate with no separator into an exact 58-character case-sensitive string, stretch with SHA-512 x11513, use the result as an EvpKDF/AES-OpenSSL password to decrypt the page's ciphertext into an Arweave RSA wallet keyfile
- оракул: `tools/oracle.py` | сертифицирован: True
- сверено с: solved sibling Arweave Puzzle Weave #8 (answer RasputinWilhelmAlekhine), reproduced byte-for-byte against the puzzle's own decrypt routine

**Зацепки (OCP `leads`):**
  - title: identify piece 2, "the whale": a co-investor, a ticker, or a date-derived string once AndreessenHorowitz is ruled out | status: open
  - title: confirm piece 1's blank flag as Blue by an oracle hit rather than by the 58-character budget alone | status: open

**Артефакты (OCP `artifacts`):**
  - source: https://arweave.net/gymumAAsxGlzqPL5HzoEB8Xryu61o174j7vHwx21Qoo

**Материалы третьих лиц:**
- the jigsaw image is the author's own puzzle material, published on the Arweave permaweb page; no book, audio, or video material

**Источники (OCP `sources`):**
  - url: https://twitter.com/arweavep/status/1257613928185675776 | title: "Puzzle 12 is here" | date: 2020-05-05
  - url: https://arweave.net/gymumAAsxGlzqPL5HzoEB8Xryu61o174j7vHwx21Qoo | title: Live puzzle page | date: 2020-04-29
  - url: https://twitter.com/arweavep/status/1264211142714499072 | title: "58 chars CS" | date: 2020-05-23
  - url: https://twitter.com/arweavep/status/1250036746802298885 | title: "1,2,4,8 = solved / 3,5,7,9 = not solved yet" | date: 2020-04-14
  - url: https://github.com/HomelessPhD/AR_Puzzles/tree/main/PZL12 | title: HomelessPhD/AR_Puzzles community repository, PZL12 entry | date: 2026-08-16
  - url: https://viewblock.io/arweave/address/XRGEfkMbCMHeTY9mZI9Lh6hf8EmA8RstmBFUjDm40fg | title: Escrow wallet, viewblock.io | date: 2026-08-16
