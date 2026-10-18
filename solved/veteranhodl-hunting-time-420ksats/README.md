# VeteranHODL: Hunting Time
> **ПЕРЕМЕЩЕНО 2026-10-17 в `master/solved/`** — пазл решён/закрыт/тупиковый, активная работа не ведётся. Причина: [../INDEX.md](../INDEX.md). Вернуть в `puzzles/` — только при новых данных (правила: `AGENT_INSTRUCTIONS.md`).

Индекс: [MASTER_CATALOG.md](../../MASTER_CATALOG.md) (Части 1-8). Источник данных: [open-crypto-puzzles](https://github.com/floflo777/open-crypto-puzzles).

## Кратко
- Статус: **solved** (solved)
- Цепь: bitcoin
- Приз: 420000 sats (USD 265)
- Примечание: funded in two tranches, 210000 sats on 2023-07-22 and 210000 sats on 2026-07-31, the day before the author's wallet-type announcement post
- Опубликовано: 2026-06-15 https://x.com/VeteranHODL/status/2066614083105738752
- Типы: bip39-seed, book, word-selection
- Difficulty left: none
- solved by a reader after publication, not by me

## Адреса/эскроу
- `bc1qhzy6j4amw26z7e694mgfr7kvzl7xteu54f0a85` — main | expected: 420000 sats | state: swept (checked 2026-08-21) | https://mempool.space/address/bc1qhzy6j4amw26z7e694mgfr7kvzl7xteu54f0a85

## Источники
- 2026-08-16 — VeteranHODL on X — https://x.com/VeteranHODL
- 2026-06-29 — Hunt announcement post — https://x.com/VeteranHODL/status/2071632285951226106
- 2026-08-01 — Wallet type and second funding — https://x.com/VeteranHODL/status/2083486983142142452

## Подробности
Здесь должна накапливаться расширенная информация по мере проходов: подсказки, прогресс сообщества, проверенные гипотезы, ссылки, compute-оценки. Текущий файл — скелет из OCP; заполняется автоматически в циклах.


---
## Логирование (обязательно)
См. `../../AGENT_INSTRUCTIONS.md`. Любая значимая находка/прогресс/баланс/решение (полностью или частично) **должна** быть дописана сюда с датой и ссылкой. Параллельные агенты обязаны соблюдать тот же протокол.

## OCP deep docs
- Folder: https://github.com/floflo777/open-crypto-puzzles/tree/main/4-solved/veteranhodl-hunting-time-420ksats
- README (raw): https://raw.githubusercontent.com/floflo777/open-crypto-puzzles/main/4-solved/veteranhodl-hunting-time-420ksats/README.md

## Досье agntn/puzzles (16.10.2026)

Перенесено из реестра [@agntn/puzzles](https://puzzles.agntn.dev/collections/hunting-time) (raw: https://puzzles.agntn.dev/collections/hunting-time.md). Ниже — разбор первоисточника: механика, кто решал, что проверено.


> VeteranHODL hid an Electrum seed in his thriller and posted twelve photo clues on X. Claimed after seven weeks. Here's how every word was hidden

June 29, 2026, 16:30 UTC. VeteranHODL tells X that [a genuine Bitcoin seed phrase](https://x.com/VeteranHODL/status/2071632285951226106) hides in the pages of his novel Hunting Time. He writes techno-thrillers about Bitcoin and used to serve in the British Army. Clues would follow, one photo at a time. "Find the clues. Recover the wallet. Keep what's inside."

Seven weeks later somebody did.

## How the Hunting Time seed phrase was hidden

The author's own summary came two days after the claim. "'Hunting Time' was actually the biggest clue." The title is the method. Most words sit in the plot as times. A photo points at a page. The page has a time on it, say 12:24. Read it as a number, and word 1224 of the English BIP39 list is `ocean`.

The other words skip the clock. An electrical panel is `electric`. A neon sign reading "Every apology has a price" is `apology`. A hotel room with a curtain in the wind is, well, `curtain`. Some photos are that literal.

### The twelve clues, one by one

<table>
<thead>
  <tr>
    <th>
      Clue
    </th>
    
    <th>
      Posted
    </th>
    
    <th>
      The photo
    </th>
    
    <th>
      The solution's line
    </th>
    
    <th>
      Word
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      1
    </td>
    
    <td>
      Jun 29
    </td>
    
    <td>
      24 painted on a concrete wall
    </td>
    
    <td>
      Page 24 → 12:24 → BIP39 #1224
    </td>
    
    <td>
      <code>
        ocean
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      2
    </td>
    
    <td>
      Jul 6
    </td>
    
    <td>
      An electrical panel throwing sparks
    </td>
    
    <td>
      Electrical panel
    </td>
    
    <td>
      <code>
        electric
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      3
    </td>
    
    <td>
      Jul 13
    </td>
    
    <td>
      A field radio showing 19
    </td>
    
    <td>
      Page 19 → 378 meters/connection
    </td>
    
    <td>
      <code>
        connect
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      4
    </td>
    
    <td>
      Jul 20
    </td>
    
    <td>
      An arm band, UNIT 21, by a 0 patch
    </td>
    
    <td>
      Page 210 → 07:20 → #720
    </td>
    
    <td>
      <code>
        fly
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      5
    </td>
    
    <td>
      Jul 27
    </td>
    
    <td>
      Neon: Every apology has a price
    </td>
    
    <td>
      Sign
    </td>
    
    <td>
      <code>
        apology
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      6
    </td>
    
    <td>
      Jul 29
    </td>
    
    <td>
      A helicopter cockpit, 241 on a panel
    </td>
    
    <td>
      Page 241 → 16:27 → #1627
    </td>
    
    <td>
      <code>
        slender
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      7
    </td>
    
    <td>
      Aug 1
    </td>
    
    <td>
      Two helicopters, marked 14 and 60
    </td>
    
    <td>
      14 + 60 → #1460
    </td>
    
    <td>
      <code>
        reopen
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      8
    </td>
    
    <td>
      Aug 3
    </td>
    
    <td>
      A watch reading 01:03
    </td>
    
    <td>
      Page 103 → 13:04 → #1304
    </td>
    
    <td>
      <code>
        pepper
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      9
    </td>
    
    <td>
      Aug 6
    </td>
    
    <td>
      Sukhumvit Rd. and a door marked 32
    </td>
    
    <td>
      Page 32 → 06:16 → #616
    </td>
    
    <td>
      <code>
        erupt
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      10
    </td>
    
    <td>
      Aug 9
    </td>
    
    <td>
      A hotel room, curtain in the wind
    </td>
    
    <td>
      Hotel-room image
    </td>
    
    <td>
      <code>
        curtain
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      11
    </td>
    
    <td>
      Aug 11
    </td>
    
    <td>
      A thermal drone feed, COMPONENT 0103
    </td>
    
    <td>
      Page 103 → 001704 → #1704
    </td>
    
    <td>
      <code>
        stay
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      12
    </td>
    
    <td>
      Aug 13
    </td>
    
    <td>
      A Land Rover Defender in the mud
    </td>
    
    <td>
      Page 110 → 1992 → #1992
    </td>
    
    <td>
      <code>
        wedding
      </code>
    </td>
  </tr>
</tbody>
</table>

The first five came on Mondays, one a week. Then the sequel got close and [the pace went up](https://x.com/VeteranHODL/status/2082355888879235577).

### Is #1224 counted from zero or from one?

From one. `ocean` is word 1224 counting from one, and 1223 from zero. Every number in the solution works the same way, `connect` at 378 included.

### 14 plus 60 isn't 74

Clue seven shows two helicopters, one marked 14 and one 60. The solution writes "14 + 60 → #1460". Not a sum. The numbers just sit side by side. Cheeky.

### Why page 103 twice?

The watch in clue eight reads 01:03. The drone feed in clue eleven flags COMPONENT 0103. Both send you to page 103. A time there gives `pepper`, and a log time, 001704, gives `stay`. The author did say some words are "related to log times".

### Which edition?

The paperback. On August 15 [floflo777](https://puzzles.agntn.dev/solvers/floflo777), 0xFlorent_ on X, asked whether you need the book at all. [The answer](https://x.com/VeteranHODL/status/2088547059452235917): "you will need the paperback to solve the puzzle". Page numbers are paperback page numbers. Got the ebook? Bad luck.

## Electrum, not BIP39

The words come from the BIP39 list, but the phrase isn't BIP39. Its checksum fails. The author said so on [August 1](https://x.com/VeteranHODL/status/2083486983142142452), in his own way: the sats went "to a fresh electrum wallet". It's an Electrum SegWit seed. The prize sat on `m/0'/0/2`, the wallet's third receiving address. Same trap as [LuckyLurker's Vault #1](https://puzzles.agntn.dev/collections/luckylurker), which also wanted Electrum and a later index.

### Did seven words make it easy?

Not really. After clue seven the author posted [his own math](https://x.com/VeteranHODL/status/2083592109647401333): "After revealing seven seed phrase words, the entropy of the target wallet is 51 bits." Still safer than a Coldcard Mk3, he added, and three minutes later an edit put a number on that. 40 bits. Five words to go, and a whole novel to read for them.

## Who solved Hunting Time?

The claim landed on August 18 at 02:07:20 UTC. [One transaction](https://mempool.space/tx/d3783a1cde2c491a6edfbead81aeebda90257c8c25b4b0c9b2bac89bc5cd607a) took both 210,000 sat coins, 419,642 sats after the fee, to `3KBUS…`. The author spotted it that day and [congratulated the winner](https://x.com/VeteranHODL/status/2089798740978577809) with a bonus prize offer. Plus one more hint, a bit late: "A major clue is in the title of the book..."

Two days later [the full solution](https://x.com/VeteranHODL/status/2090400955707830480) went up. Its last line names [_radosinsky](https://puzzles.agntn.dev/solvers/radosinsky). The record credits them by that handle. Nothing public ties `3KBUS…` to them, so the address stays out of the solver record.

### Who funded the prize?

Two halves. The author sent 210,000 sats on July 22, 2023, when he started writing the book, he says. On July 31, 2026, mid hunt, "a generous stranger" added another 210,000. The record keeps the first as `funding` and the second as an `increase`. The first coins are three years older than the hunt, so `preGenesis` is set.

## Rerun it yourself

```ts
import { get, verify } from "@agntn/puzzles";

const book = await get("hunting-time");
await verify(book!); // { verified: true, derivedAddress: "bc1qhzy6j4amw26z7e694mgfr7kvzl7xteu54f0a85", … }
```

The record keeps the published words as `seed(...).electrum()`. Plain `seed(...)` reads them as BIP39. Wrong wallet. Here's what the mark runs, straight from `@agntn/keys`:

```ts
import { deriveHDKey, getMasterKeyFromSeed } from "@agntn/keys/bip32";
import { deriveSeed } from "@agntn/keys/electrum";

const { seed } = deriveSeed(
  "ocean electric connect fly apology slender reopen pepper erupt curtain stay wedding",
);
deriveHDKey(getMasterKeyFromSeed(seed), "m/0'/0/2").privateKey; // f760c5b9…9686, as bytes
```

The key is public now. Don't send anything there.

### What the record carries

Every clue post is a hint, quoted as written. Mostly that's "Clue Five." and friends, because the photo is the real clue. So every original upload ships in [assets/hunting-time](https://github.com/agntn/puzzles/tree/main/assets/hunting-time), and each hint's answer is its line from the solution. The June 15 teaser is a hint too, two weeks before the start. The cover's code comes from the genesis block, he wrote, and "I wonder if anyone has found the other hidden code yet...". Every cited post is archived in [assets/sources/hunting-time](https://github.com/agntn/puzzles/tree/main/assets/sources/hunting-time).

## The Hunting Time record

## OCP: машинные данные (puzzles.json, 16.10.2026)

Структурированные данные из `puzzles.json` репозитория [open-crypto-puzzles](https://github.com/floflo777/open-crypto-puzzles) (snapshot OCP: 2026-08-21; цены: {'date': '2026-08-16', 'BTC': 63000, 'ETH': 1880, 'AR': 1.81, 'LTC': 54}).

- `slug`: veteranhodl-hunting-time-420ksats
- `title`: VeteranHODL: Hunting Time
- `status`: **solved**
- `tier`: solved | `chain`: bitcoin
- `series`: None
- `author`: VeteranHODL | x:@VeteranHODL
- `prize`: 420000 sats (оценка $265 на 2026-08-16) — funded in two tranches, 210000 sats on 2023-07-22 and 210000 sats on 2026-07-31, the day before the author's wallet-type announcement post
- `published`: 2026-06-15 https://x.com/VeteranHODL/status/2066614083105738752
- `puzzle_type`: bip39-seed, book, word-selection
- `target_format`: 12-word phrase, one word per clue image in publication order; author states an Electrum wallet
- `difficulty_left`: none
- `difficulty_note`: solved by a reader after publication, not by me
- `tested_total`: {'candidates': 4924764, 'families': 2, 'certified': False}

**Адреса и проверенное состояние:**
- `bc1qhzy6j4amw26z7e694mgfr7kvzl7xteu54f0a85` — escrow | main | ожидается: 420000 sats | проверено 2026-08-21: **swept**
  - https://mempool.space/address/bc1qhzy6j4amw26z7e694mgfr7kvzl7xteu54f0a85

**Деривация:**
- one clue image equals one word, in the order the author posted them; derive BIP39/BIP84 or an Electrum segwit seed and compare to the escrow address
- оракул: `tools/oracle.py` | сертифицирован: True
- сверено с: the public BIP39/BIP84 test vector for the BIP39/BIP84 branch; the Electrum segwit branch (the format the author actually named) has no certified vector

**Зацепки (OCP `leads`):**
  - title: certify the Electrum derivation branch | status: open
  - title: re-run the numeric-index hypothesis after cleaning the candidate pools | status: open
  - title: recover the book's cover image | status: open

**Решения/выплаты (OCP `solutions`):**
  - date: 2026-08-18

**Материалы третьих лиц:**
- the novel is not reproduced; the clue images are the author's own puzzle photographs posted on X and are described but not included in this folder

**Источники (OCP `sources`):**
  - url: https://x.com/VeteranHODL | title: VeteranHODL on X | date: 2026-08-16
  - url: https://x.com/VeteranHODL/status/2071632285951226106 | title: Hunt announcement post | date: 2026-06-29
  - url: https://x.com/VeteranHODL/status/2083486983142142452 | title: Wallet type and second funding | date: 2026-08-01
