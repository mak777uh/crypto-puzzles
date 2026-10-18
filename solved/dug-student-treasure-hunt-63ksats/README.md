# Dug's Student Treasure Hunt (2025 edition)
> **ПЕРЕМЕЩЕНО 2026-10-17 в `master/solved/`** — пазл решён/закрыт/тупиковый, активная работа не ведётся. Причина: [../INDEX.md](../INDEX.md). Вернуть в `puzzles/` — только при новых данных (правила: `AGENT_INSTRUCTIONS.md`).

Индекс: [MASTER_CATALOG.md](../../MASTER_CATALOG.md) (Части 1-8). Источник данных: [open-crypto-puzzles](https://github.com/floflo777/open-crypto-puzzles).

## Кратко
- Статус: **solved** (solved)
- Цепь: bitcoin
- Приз: 63216 sats (USD 40)
- Примечание: the portion I recovered (index 1 of 3); a third party had already swept the larger index 0 plus index 2 portion, 95,792 sats, five weeks earlier
- Опубликовано: 2025-06-26 https://njump.me/npub1zrmu0amjmkynxlxgmdsyrjmp8vhxdz8ch5vja9vh9ym4natg8k5s8ge9wx
- Типы: bip39-seed, text-cipher
- Difficulty left: none
- solved; the payout transaction confirms the answer

## Адреса/эскроу
- `bc1qych2me6h85j38s3xmfwdkcvpqakpld3yr2y5ss` — index 0, m/84'/0'/0'/0/0 | expected: 75,082 sats, funded 2025-06-26 | state: swept (checked 2026-08-16) | https://mempool.space/address/bc1qych2me6h85j38s3xmfwdkcvpqakpld3yr2y5ss
- `bc1qphfklk568cf93267yetpngqsz0mthw4z4x2q69` — index 1, m/84'/0'/0'/0/1, the one I solved | expected: 63,216 sats, funded 2026-06-26 | state: swept (checked 2026-08-16) | https://mempool.space/address/bc1qphfklk568cf93267yetpngqsz0mthw4z4x2q69
- `bc1qnclravnmv7vta9fhnp44hu3y85z3tfgz0n33wl` — index 2, m/84'/0'/0'/0/2 | expected: 20,888 sats, funded 2026-06-26 | state: swept (checked 2026-08-16) | https://mempool.space/address/bc1qnclravnmv7vta9fhnp44hu3y85z3tfgz0n33wl

## Источники
- 2026-08-16 — Dug, Nostr profile — https://njump.me/npub1zrmu0amjmkynxlxgmdsyrjmp8vhxdz8ch5vja9vh9ym4natg8k5s8ge9wx
- 2026-08-02 — Payout transaction, mempool.space — https://mempool.space/tx/ee70de514686588173b64fc31fc317ae15f1e903c742cc99140d2cf1bb2e8db1
- 2026-07-08 — Third-party consolidation transaction, mempool.space — https://mempool.space/tx/bcc2154f4eb33c361973313b9fe81131568b2f4ee3ef5a2c3e98dc327afd8074

## Подробности
Здесь должна накапливаться расширенная информация по мере проходов: подсказки, прогресс сообщества, проверенные гипотезы, ссылки, compute-оценки. Текущий файл — скелет из OCP; заполняется автоматически в циклах.


---
## Логирование (обязательно)
См. `../../AGENT_INSTRUCTIONS.md`. Любая значимая находка/прогресс/баланс/решение (полностью или частично) **должна** быть дописана сюда с датой и ссылкой. Параллельные агенты обязаны соблюдать тот же протокол.

## OCP deep docs
- Folder: https://github.com/floflo777/open-crypto-puzzles/tree/main/4-solved/dug-student-treasure-hunt-63ksats
- README (raw): https://raw.githubusercontent.com/floflo777/open-crypto-puzzles/main/4-solved/dug-student-treasure-hunt-63ksats/README.md

## Досье agntn/puzzles (16.10.2026)

Перенесено из реестра [@agntn/puzzles](https://puzzles.agntn.dev/collections/dug) (raw: https://puzzles.agntn.dev/collections/dug.md). Ниже — разбор первоисточника: механика, кто решал, что проверено.


> Twelve lecture words led to three Bitcoin prizes. See Dug's 2025 treasure hunt solution with the BIP39 seed and verified BIP84 paths.

Twelve seed words hidden across lecture slides, with bitcoin at the end. That's one way to make students read the slides.

Dug's 2025 Student Treasure Hunt has **three funded Bitcoin addresses**, each a puzzle in the `dug` collection. Together they held **159,186 satoshis**. All three prizes have been claimed, and the published seed verifies against every address.

## The official Nostr clue says Kingdom

Dug's [October 7 post on Nostr](https://njump.me/note157473tjlhl8046c4uhxk6889nwgflwsjtlpwgzfuqp0lmq8vvzas0km4hc) includes a photo of a lecture slide:

> Twelfth and Final Treasure Hunt Word: 12. Kingdom

One word down. Eleven to go. According to [floflo777's solution](https://github.com/floflo777/open-crypto-puzzles/tree/main/4-solved/dug-student-treasure-hunt-63ksats), the other words were in private lecture slides, but a public Seed Cipher sheet encoded the same phrase. That gave people outside the class a way in.

The shared hint links to **Dug's own post**, with [his slide photo](https://blossom.primal.net/394004c70b8907504a2424865e866b10fe5746c89122899a968f3dbcd18ad6b3.jpg) as confirmation. The solver's write-up is the source for the recovered phrase, not a substitute for the author's clue.

## BIP39 solution and BIP84 derivation paths

The published twelve-word mnemonic is:

```text
profit general lava hover jar visa joy immense install first give kingdom
```

It's BIP39 with an **empty passphrase**. The three receiving addresses use BIP84 paths `m/84'/0'/0'/0/0`, `m/84'/0'/0'/0/1` and `m/84'/0'/0'/0/2`. Same seed, different final index. Stopping at index 0 would leave two targets unchecked.

Run the verifier for each puzzle:

```bash
puzzles verify dug/2025-0
puzzles verify dug/2025-1
puzzles verify dug/2025-2
```

```text
OK  dug/2025-0
OK  dug/2025-1
OK  dug/2025-2
```

This is a public puzzle seed, not a wallet to reuse. Please don't give the internet free bitcoin.

## Who claimed the three Bitcoin prizes?

<table>
<thead>
  <tr>
    <th>
      Puzzle
    </th>
    
    <th align="right">
      Prize
    </th>
    
    <th>
      Claim date
    </th>
    
    <th>
      Solver
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      <code>
        dug/2025-0
      </code>
    </td>
    
    <td align="right">
      75,082 sats
    </td>
    
    <td>
      July 8, 2026
    </td>
    
    <td>
      Not identified
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        dug/2025-1
      </code>
    </td>
    
    <td align="right">
      63,216 sats
    </td>
    
    <td>
      August 2, 2026
    </td>
    
    <td>
      <a href="https://github.com/floflo777" rel="nofollow">
        floflo777
      </a>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        dug/2025-2
      </code>
    </td>
    
    <td align="right">
      20,888 sats
    </td>
    
    <td>
      July 8, 2026
    </td>
    
    <td>
      Not identified
    </td>
  </tr>
</tbody>
</table>

[floflo777](https://github.com/floflo777), also [0xFlorent_ on Twitter](https://twitter.com/0xFlorent_), describes recovering the second prize in his write-up. Its transaction paid **59,916 sats after fees**. Someone had already claimed indices 0 and 2 in a single transaction a few weeks earlier. The source doesn't name that solver.

So the write-up's “63ksats” title describes one recovery, not the whole collection. The [address and transaction ledger](https://puzzles.agntn.dev/assets/dug/2025-solution.md) has the full accounting. In these records, claim amounts mean the inputs spent from each target before fees, not two copies of a shared payout.

## Explore the three Dug puzzle records

<collection-puzzles collection="dug">

</collection-puzzles>

## OCP: машинные данные (puzzles.json, 16.10.2026)

Структурированные данные из `puzzles.json` репозитория [open-crypto-puzzles](https://github.com/floflo777/open-crypto-puzzles) (snapshot OCP: 2026-08-16; цены: {'date': '2026-08-16', 'BTC': 63000, 'ETH': 1880, 'AR': 1.81, 'LTC': 54}).

- `slug`: dug-student-treasure-hunt-63ksats
- `title`: Dug's Student Treasure Hunt (2025 edition)
- `status`: **solved**
- `tier`: solved | `chain`: bitcoin
- `series`: None
- `author`: Dug | nostr:npub1zrmu0amjmkynxlxgmdsyrjmp8vhxdz8ch5vja9vh9ym4natg8k5s8ge9wx, nip05:Dug@primal.net
- `prize`: 63216 sats (оценка $40 на 2026-08-16) — the portion I recovered (index 1 of 3); a third party had already swept the larger index 0 plus index 2 portion, 95,792 sats, five weeks earlier
- `published`: 2025-06-26 https://njump.me/npub1zrmu0amjmkynxlxgmdsyrjmp8vhxdz8ch5vja9vh9ym4natg8k5s8ge9wx
- `puzzle_type`: bip39-seed, text-cipher
- `target_format`: BIP39 12 words, English, BIP84 m/84'/0'/0'/0/i for i in 0, 1, 2, no passphrase
- `difficulty_left`: none
- `difficulty_note`: solved; the payout transaction confirms the answer
- `tested_total`: {'candidates': 1935, 'families': 1, 'certified': True}

**Адреса и проверенное состояние:**
- `bc1qych2me6h85j38s3xmfwdkcvpqakpld3yr2y5ss` — escrow | index 0, m/84'/0'/0'/0/0 | ожидается: 75,082 sats, funded 2025-06-26 | проверено 2026-08-16: **swept**
  - https://mempool.space/address/bc1qych2me6h85j38s3xmfwdkcvpqakpld3yr2y5ss
- `bc1qphfklk568cf93267yetpngqsz0mthw4z4x2q69` — escrow | index 1, m/84'/0'/0'/0/1, the one I solved | ожидается: 63,216 sats, funded 2026-06-26 | проверено 2026-08-16: **swept**
  - https://mempool.space/address/bc1qphfklk568cf93267yetpngqsz0mthw4z4x2q69
- `bc1qnclravnmv7vta9fhnp44hu3y85z3tfgz0n33wl` — escrow | index 2, m/84'/0'/0'/0/2 | ожидается: 20,888 sats, funded 2026-06-26 | проверено 2026-08-16: **swept**
  - https://mempool.space/address/bc1qnclravnmv7vta9fhnp44hu3y85z3tfgz0n33wl

**Деривация:**
- assemble 12 BIP39 words (11 recovered by decoding a glyph-substitution cipher over a scrambled key page, 1 posted on a public lecture slide); validate the checksum; derive the BIP84 first three receive addresses; compare to the funded addresses
- оракул: `tools/oracle.py` | сертифицирован: True
- сверено с: the official BIP84 test vector, and the solved mnemonic itself, which reproduces all three funded addresses exactly

**Решения/выплаты (OCP `solutions`):**
  - date: 2026-08-02

**Материалы третьих лиц:**
- one lecture-slide image and one handwritten cipher sheet published by the author on Nostr, described but not reproduced in full; the Seed Cipher template referenced is a free, publicly distributed Stackchain Magazine artwork, not reproduced here

**Источники (OCP `sources`):**
  - url: https://njump.me/npub1zrmu0amjmkynxlxgmdsyrjmp8vhxdz8ch5vja9vh9ym4natg8k5s8ge9wx | title: Dug, Nostr profile | date: 2026-08-16
  - url: https://mempool.space/tx/ee70de514686588173b64fc31fc317ae15f1e903c742cc99140d2cf1bb2e8db1 | title: Payout transaction, mempool.space | date: 2026-08-02
  - url: https://mempool.space/tx/bcc2154f4eb33c361973313b9fe81131568b2f4ee3ef5a2c3e98dc327afd8074 | title: Third-party consolidation transaction, mempool.space | date: 2026-07-08
