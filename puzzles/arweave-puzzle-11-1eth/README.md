# Arweave Puzzle #11

Индекс: [MASTER_CATALOG.md](../../MASTER_CATALOG.md) (Части 1-8). Источник данных: [open-crypto-puzzles](https://github.com/floflo777/open-crypto-puzzles).

## Кратко
- Статус: **open** (mid)
- Цепь: ethereum
- Приз: 1 ETH (USD 1880)
- Примечание: 1 ETH, address held as a plain EOA, never spent from since funding
- Опубликовано: 2020-04-22 https://twitter.com/arweavep/status/1252961944807641090
- Типы: image-stego, pixel-code, raw-private-key
- Difficulty left: insight
- the target format (raw private key, not a mnemonic) and the decoy (the address printed in the file's tEXt chunk) are both confirmed; close to 1,000 direct encodings of the measured geometry and the metadata anomaly have been tested, all negative; the exact pixel-level encoding is not yet known and no certified oracle exists to test one against, so the missing piece is either an unrecovered insight into the encoding or the never-delivered author hint

## Адреса/эскроу
- `0xFF2142E98E09b5344994F9bEB9C56C95506B9F17` — main | expected: 1 ETH | state: funded-unspent (checked 2026-08-16) | https://etherscan.io/address/0xFF2142E98E09b5344994F9bEB9C56C95506B9F17

## Источники
- 2020-04-22 — Tiamat, original announcement — https://twitter.com/arweavep/status/1252961944807641090
- 2021-08-23 — Tiamat, the $100 hint reply — https://twitter.com/arweavep/status/1429846914028158977
- 2026-08-16 — HomelessPhD, AR_Puzzles community repository, PZL11 — https://github.com/HomelessPhD/AR_Puzzles/tree/main/PZL11

## Подробности
Здесь должна накапливаться расширенная информация по мере проходов: подсказки, прогресс сообщества, проверенные гипотезы, ссылки, compute-оценки. Текущий файл — скелет из OCP; заполняется автоматически в циклах.


---
## Логирование (обязательно)
См. `../../AGENT_INSTRUCTIONS.md`. Любая значимая находка/прогресс/баланс/решение (полностью или частично) **должна** быть дописана сюда с датой и ссылкой. Параллельные агенты обязаны соблюдать тот же протокол.

## OCP deep docs
- Folder: https://github.com/floflo777/open-crypto-puzzles/tree/main/2-mid-prizes/arweave-puzzle-11-1eth
- README (raw): https://raw.githubusercontent.com/floflo777/open-crypto-puzzles/main/2-mid-prizes/arweave-puzzle-11-1eth/README.md

## Досье Hark v2 (16.10.2026)

### Arweave Puzzles (автор Tiamat, @arweavep) — #3, #10, #11, #12
Общее: механизм #3/#10/#12 = SHA512^11513(ответ) hex → CryptoJS EvpKDF (1e4 итераций, 32 слова) → Rijndael Nk=32/Nr=38 CBC → Arweave JWK; сертифицирован на решённом #8 («RasputinWilhelmAlekhine»). Наш чекер `$W/arweave/fastcheck.py {3|10}` — расшифровка первого блока, при префиксе `{"` полный оракул; ~20 канд/с/ядро при свободном CPU (KDF дорогой; реально 7–20). Ложные `{"` ≈1/65k (встречались, полный оракул отсекал). Хиты пишутся в `$W/arweave/hits.private` (600, не открывать в отчётах). Источник общины: https://github.com/HomelessPhD/AR_Puzzles (README PZL3/PZL10, issues #5–#12 — авторских подсказок нет). Свип-конвейер готов, не использован: `$W/arweave/sweep/sweep.js`, `autosweep.py`, `p10/autosweep10.py`. Работа в проекте «работа», остановлена 14.10 22:00.

---

#### #11 — 1 ETH
- **Адрес**: `0xFF2142E98E09b5344994F9bEB9C56C95506B9F17` (Ethereum). **Баланс**: 1,0 ETH, 0 исходящих — проверка OCP 16.08.2026; **нашей проверки нет**.
- **Механизм**: один PNG-скетч гавани (1600×1105, grayscale+alpha), подсказка «MEW: Access by Private Key» → сырой 64-hex приватный ключ спрятан в картинке; адрес в метаданных — подтверждённая приманка. Сертифицированного оракула нет (только деривация адреса).
- **Проверено** (OCP): ~1000 геометрических/метаданных кодировок (12 зданий, 1 большой парус, 5 малых), 7 168 битстримов, 79 863 окна, баркоды (PR #21) → 0. Мы сами ничего не проверяли (ПК-агент 14.10 только прочитал README).
- **Осталось**: полный zsteg-скан всех плоскостей (минуты CPU). **Шансы**: 1–2 %, ярус 3 / «не брать».

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

- `slug`: arweave-puzzle-11-1eth
- `title`: Arweave Puzzle #11
- `status`: **open**
- `tier`: mid | `chain`: ethereum
- `series`: arweave-puzzles
- `author`: Tiamat | twitter:@arweavep
- `prize`: 1 ETH (оценка $1880 на 2026-08-16) — 1 ETH, address held as a plain EOA, never spent from since funding
- `published`: 2020-04-22 https://twitter.com/arweavep/status/1252961944807641090
- `puzzle_type`: image-stego, pixel-code, raw-private-key
- `target_format`: raw 32-byte / 64-hex secp256k1 private key, standard ETH address derivation, no mnemonic, no keystore
- `difficulty_left`: insight
- `difficulty_note`: the target format (raw private key, not a mnemonic) and the decoy (the address printed in the file's tEXt chunk) are both confirmed; close to 1,000 direct encodings of the measured geometry and the metadata anomaly have been tested, all negative; the exact pixel-level encoding is not yet known and no certified oracle exists to test one against, so the missing piece is either an unrecovered insight into the encoding or the never-delivered author hint
- `tested_total`: {'candidates': 1000, 'families': 4, 'certified': False}

**Адреса и проверенное состояние:**
- `0xFF2142E98E09b5344994F9bEB9C56C95506B9F17` — escrow | main | ожидается: 1 ETH | проверено 2026-08-16: **funded-unspent**
  - https://etherscan.io/address/0xFF2142E98E09b5344994F9bEB9C56C95506B9F17

**Деривация:**
- extract a 256-bit value from the pixel content of the published PNG (channel, order, and quantization not yet determined) and compare its ETH address to the escrow address
- сверено с: the derivation primitives (SHA-256, Keccak-256, secp256k1, EIP-55) are checked against public test vectors, but no known-answer image-to-key pair exists for this specific puzzle, so no oracle is shipped

**Зацепки (OCP `leads`):**
  - title: systematic LSB scan of the continuous grayscale and alpha channels | status: open
  - title: join the community Telegram group and search first-hand for the promised hint | status: open
  - title: puzzle #9's real solving method, if it ever surfaces | status: open

**Артефакты (OCP `artifacts`):**
  - source: https://viewblock.io/arweave/tx/CzITHnEIlkQw9SbaX5futCzFrKk1qe_NwvWnIBmP2fY

**Материалы третьих лиц:**
- the puzzle image in clues/ is the author's own published puzzle material, stored on Arweave; the author's quotes in clues/author-posts.md are reproduced from a community repository that itself mirrors the author's Twitter replies; no other third-party material is included

**Источники (OCP `sources`):**
  - url: https://twitter.com/arweavep/status/1252961944807641090 | title: Tiamat, original announcement | date: 2020-04-22
  - url: https://twitter.com/arweavep/status/1429846914028158977 | title: Tiamat, the $100 hint reply | date: 2021-08-23
  - url: https://github.com/HomelessPhD/AR_Puzzles/tree/main/PZL11 | title: HomelessPhD, AR_Puzzles community repository, PZL11 | date: 2026-08-16

## Обновление (2026-10-17, Qoder) — bounded-стего-скан: отрицательный
- Тип: отрицательный результат (дешёвый слой закрыт).
- Суть: скачан оригинальный PNG (sha256 `c6ba4b50…db87e1`); проверены чанки/tEXt/хвост после IEND,
  прямые ASCII/64-hex, LSB и все 8 битовых плоскостей L и A (row/column), zlib-потоки, альфа-аномалии,
  фильтр-байты PNG. Всё чисто: 434 пикселя A<255 — сглаживание краёв рисунка, не канал; фильтры — обычный libpng.
- Источник: https://arweave.net/CzITHnEIlkQw9SbaX5futCzFrKk1qe_NwvWnIBmP2fY
- Проверено: да, детерминированно (`tools/scan11.py`, <2 мин).
- Влияние на оценку: без изменений (1–2%); следующий шаг — только смысловая гипотеза о геометрии ключа.
- Подробности и хроника: см. LOG.md.
