# Arweave Puzzle #10

Индекс: [MASTER_CATALOG.md](../../MASTER_CATALOG.md) (Части 1-8). Источник данных: [open-crypto-puzzles](https://github.com/floflo777/open-crypto-puzzles).

## Кратко
- Статус: **open** (mid)
- Цепь: arweave
- Приз: 500.02225493 AR (USD 905)
- Опубликовано: 2020-04-14 https://arweave.net/1fLPMP_smP6ipdIYbYUAZtFPwO4crdYr4kMVf5uTivg
- Типы: word-selection, text-cipher
- Difficulty left: insight
- the author never published any length or charset constraint for this puzzle specifically; on the order of 8,000,000 candidates tested across every literal, pun, and genesis-block reading found so far, 0 matches; the block is one unguessed token, not a search problem

## Адреса/эскроу
- `bkjJGw3NLxs8OAyRxgTL-QFpiB3lBJqZ76kDhWdB-Rs` — main | expected: 500.02225493 AR | state: funded-unspent (checked 2026-08-16) | https://viewblock.io/arweave/address/bkjJGw3NLxs8OAyRxgTL-QFpiB3lBJqZ76kDhWdB-Rs

## Источники
- 2020-04-14 — Live puzzle page — https://arweave.net/1fLPMP_smP6ipdIYbYUAZtFPwO4crdYr4kMVf5uTivg
- 2020-04-14 — "1,2,4,8 = solved / 3,5,7,9 = not solved yet" — https://twitter.com/arweavep/status/1250036746802298885
- 2020-04-22 — @_LeFevre_ reply in the #10 announcement thread — https://github.com/HomelessPhD/AR_Puzzles/tree/main/PZL10
- 2026-08-16 — HomelessPhD/AR_Puzzles community repository, PZL10 entry — https://github.com/HomelessPhD/AR_Puzzles/tree/main/PZL10
- 2026-08-16 — Escrow wallet, viewblock.io — https://viewblock.io/arweave/address/bkjJGw3NLxs8OAyRxgTL-QFpiB3lBJqZ76kDhWdB-Rs

## Подробности
Здесь должна накапливаться расширенная информация по мере проходов: подсказки, прогресс сообщества, проверенные гипотезы, ссылки, compute-оценки. Текущий файл — скелет из OCP; заполняется автоматически в циклах.


---
## Логирование (обязательно)
См. `../../AGENT_INSTRUCTIONS.md`. Любая значимая находка/прогресс/баланс/решение (полностью или частично) **должна** быть дописана сюда с датой и ссылкой. Параллельные агенты обязаны соблюдать тот же протокол.

## OCP deep docs
- Folder: https://github.com/floflo777/open-crypto-puzzles/tree/main/2-mid-prizes/arweave-puzzle-10-500ar
- README (raw): https://raw.githubusercontent.com/floflo777/open-crypto-puzzles/main/2-mid-prizes/arweave-puzzle-10-500ar/README.md

## Досье Hark v2 (16.10.2026)

### Arweave Puzzles (автор Tiamat, @arweavep) — #3, #10, #11, #12
Общее: механизм #3/#10/#12 = SHA512^11513(ответ) hex → CryptoJS EvpKDF (1e4 итераций, 32 слова) → Rijndael Nk=32/Nr=38 CBC → Arweave JWK; сертифицирован на решённом #8 («RasputinWilhelmAlekhine»). Наш чекер `$W/arweave/fastcheck.py {3|10}` — расшифровка первого блока, при префиксе `{"` полный оракул; ~20 канд/с/ядро при свободном CPU (KDF дорогой; реально 7–20). Ложные `{"` ≈1/65k (встречались, полный оракул отсекал). Хиты пишутся в `$W/arweave/hits.private` (600, не открывать в отчётах). Источник общины: https://github.com/HomelessPhD/AR_Puzzles (README PZL3/PZL10, issues #5–#12 — авторских подсказок нет). Свип-конвейер готов, не использован: `$W/arweave/sweep/sweep.js`, `autosweep.py`, `p10/autosweep10.py`. Работа в проекте «работа», остановлена 14.10 22:00.

---

#### #10 — 500,022 AR
- **Адрес**: `bkjJGw3NLxs8OAyRxgTL-QFpiB3lBJqZ76kDhWdB-Rs`. **Баланс**: 500 022 254 930 000 winston, last_tx пуст — 13.10.2026 10:25 MSK. Опубликован 14.04.2020 (arweave.net/1fLPMP_smP6ipdIYbYUAZtFPwO4crdYr4kMVf5uTivg).
- **Механизм**: свободный текст, регистр важен, длина неизвестна.
- **Подсказки и чтения**: кости (2,1,4 / 2,4) → Einstein/«Dice»/214; «6 3 18» вокруг кольца → 03.06.2018 (ICO); логотип «a» поверх силуэта Палпатина → Palpatine/Sidious/Order66; «[0-19]» → COVID-19 / срез / высота блока; ключ с биркой «…nesis #28» → Genesis 28 (Иаков/Вефиль/лестница) или генезис-блок Arweave. Единственная авторская подсказка: «1,2,4,8 = solved / 3,5,7,9 = not solved yet».
- **Проверено и отброшено**: генезис-блок Arweave (genesis_wallets.csv 507 строк, 314 tx блока 0, индексы 27/28, срезы) 72 → 0; имена в стиле #8 (Einstein/Palpatine/Covid19/Jacob/2018 во всех порядках, 4-/3-слотовые) 28 960 → 0 (13.10); OCP ~8 010 190 → 0.
- **Осталось**: нужен новый ограничитель (подсказка автора) или иное прочтение механики; слепые продукты токенов бесполезны.
- **Файлы**: `$W/arweave/p10/` (gen10_names.py, h10n.txt, h10w.txt, fastcheck1.py, genesis_wallets.csv).
- **Шансы**: <1 % — «не брать» (аудит 15.10).

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

- `slug`: arweave-puzzle-10-500ar
- `title`: Arweave Puzzle #10
- `status`: **open**
- `tier`: mid | `chain`: arweave
- `series`: arweave-puzzles
- `author`: Tiamat | twitter:@ArweaveP
- `prize`: 500.02225493 AR (оценка $905 на 2026-08-16)
- `published`: 2020-04-14 https://arweave.net/1fLPMP_smP6ipdIYbYUAZtFPwO4crdYr4kMVf5uTivg
- `puzzle_type`: word-selection, text-cipher
- `target_format`: one free-text answer, case-sensitive, any length, SHA-512 applied 11,513 times, CryptoJS AES-OpenSSL decrypt (non-standard 1024-bit key, 38-round Rijndael), plaintext must contain the literal "kty":"RSA"
- `difficulty_left`: insight
- `difficulty_note`: the author never published any length or charset constraint for this puzzle specifically; on the order of 8,000,000 candidates tested across every literal, pun, and genesis-block reading found so far, 0 matches; the block is one unguessed token, not a search problem
- `tested_total`: {'candidates': 8010190, 'families': 7, 'certified': True}

**Адреса и проверенное состояние:**
- `bkjJGw3NLxs8OAyRxgTL-QFpiB3lBJqZ76kDhWdB-Rs` — escrow | main | ожидается: 500.02225493 AR | проверено 2026-08-16: **funded-unspent**
  - https://viewblock.io/arweave/address/bkjJGw3NLxs8OAyRxgTL-QFpiB3lBJqZ76kDhWdB-Rs

**Деривация:**
- read the torn-paper image's 5 drawn keys into a single concatenated case-sensitive answer string of unknown length, stretch with SHA-512 x11513, use the result as an EvpKDF/AES-OpenSSL password to decrypt the page's ciphertext into an Arweave RSA wallet keyfile
- оракул: `tools/oracle.py` | сертифицирован: True
- сверено с: solved sibling Arweave Puzzle Weave #8 (answer RasputinWilhelmAlekhine), reproduced byte-for-byte against the puzzle's own decrypt routine

**Зацепки (OCP `leads`):**
  - title: the exact wording of Bible Genesis chapter 28 as a long word-series, patterned after solved sibling #7 | status: open
  - title: non-public channels: the author's Telegram group or a direct reply, for a hint never posted on Twitter | status: open

**Артефакты (OCP `artifacts`):**
  - source: https://arweave.net/1fLPMP_smP6ipdIYbYUAZtFPwO4crdYr4kMVf5uTivg

**Материалы третьих лиц:**
- the puzzle image is the author's own material, published on the Arweave permaweb page; one short quote from a named community member (the proven puzzle #13 solver) is reproduced from the public reply thread; no book, audio, or video material

**Источники (OCP `sources`):**
  - url: https://arweave.net/1fLPMP_smP6ipdIYbYUAZtFPwO4crdYr4kMVf5uTivg | title: Live puzzle page | date: 2020-04-14
  - url: https://twitter.com/arweavep/status/1250036746802298885 | title: "1,2,4,8 = solved / 3,5,7,9 = not solved yet" | date: 2020-04-14
  - url: https://github.com/HomelessPhD/AR_Puzzles/tree/main/PZL10 | title: @_LeFevre_ reply in the #10 announcement thread | date: 2020-04-22
  - url: https://github.com/HomelessPhD/AR_Puzzles/tree/main/PZL10 | title: HomelessPhD/AR_Puzzles community repository, PZL10 entry | date: 2026-08-16
  - url: https://viewblock.io/arweave/address/bkjJGw3NLxs8OAyRxgTL-QFpiB3lBJqZ76kDhWdB-Rs | title: Escrow wallet, viewblock.io | date: 2026-08-16
