# Peter Todd Hash Collision Bounties

Индекс: [MASTER_CATALOG.md](../../MASTER_CATALOG.md) (Части 1-8). Источник данных: [open-crypto-puzzles](https://github.com/floflo777/open-crypto-puzzles).

## Кратко
- Статус: **watch** (big)
- Цепь: bitcoin
- Приз: 0.59364885 BTC (USD 37400)
- Примечание: combined across 4 live P2SH scripts (SHA-256, RIPEMD-160, HASH160, HASH256); a 5th sibling (SHA-1) was claimed in 2023 and is not part of this total
- Опубликовано: 2013-09-13 https://bitcointalk.org/index.php?topic=293382.0
- Типы: hash-collision
- Difficulty left: research-breakthrough
- no known shortcut over the generic collision bound for any of the 4 live hash functions (2^128 for SHA-256 and HASH256, 2^80 for RIPEMD-160 and HASH160); what would close this is a published practical collision on one of them, the way SHAttered did for SHA-1 in 2017

## Адреса/эскроу
- `35Snmmy3uhaer2gTboc81ayCip4m9DT4ko` — SHA-256 | expected: 0.27734251 BTC | state: funded-unspent (checked 2026-08-16) | https://mempool.space/address/35Snmmy3uhaer2gTboc81ayCip4m9DT4ko
- `3KyiQEGqqdb4nqfhUzGKN6KPhXmQsLNpay` — RIPEMD-160 | expected: 0.11576888 BTC | state: funded-unspent (checked 2026-08-16) | https://mempool.space/address/3KyiQEGqqdb4nqfhUzGKN6KPhXmQsLNpay
- `39VXyuoc6SXYKp9TcAhoiN1mb4ns6z3Yu6` — HASH160 (RIPEMD160(SHA256())) | expected: 0.10026873 BTC | state: funded-unspent (checked 2026-08-16) | https://mempool.space/address/39VXyuoc6SXYKp9TcAhoiN1mb4ns6z3Yu6
- `3DUQQvz4t57Jy7jxE86kyFcNpKtURNf1VW` — HASH256 (SHA256(SHA256())) | expected: 0.10026873 BTC | state: funded-unspent (checked 2026-08-16) | https://mempool.space/address/3DUQQvz4t57Jy7jxE86kyFcNpKtURNf1VW
- `37k7toV1Nv4DfmQbmZ8KuZDQCYK9x5KpzP` — SHA-1 (reference sibling, claimed 2023-02-22, not part of the live prize) | expected: 0 BTC (fully spent) | state: swept (checked 2026-08-16) | https://mempool.space/address/37k7toV1Nv4DfmQbmZ8KuZDQCYK9x5KpzP

## Источники
- 2013-09-13 — REWARD offered for hash collisions for SHA1, SHA256, RIPEMD160 and other — https://bitcointalk.org/index.php?topic=293382.0
- 2026-08-16 — boha, community bounty mirror (hash_collision.jsonc) — https://github.com/oritwoen/boha
- 2017-02-23 — The first collision for full SHA-1 (SHAttered) — https://shattered.io
- 2023-02-22 — mempool.space, SHA-1 bounty claiming transaction — https://mempool.space/tx/9ec2a0db0c4c3423a6b2c3cb2a26fc626b037121b4b5f3f57b08916196ff14e0
- 2026-08-16 — mempool.space, 4 live escrow addresses and the SHA-1 reference — https://mempool.space/address/35Snmmy3uhaer2gTboc81ayCip4m9DT4ko

## Подробности
Здесь должна накапливаться расширенная информация по мере проходов: подсказки, прогресс сообщества, проверенные гипотезы, ссылки, compute-оценки. Текущий файл — скелет из OCP; заполняется автоматически в циклах.


---
## Логирование (обязательно)
См. `../../AGENT_INSTRUCTIONS.md`. Любая значимая находка/прогресс/баланс/решение (полностью или частично) **должна** быть дописана сюда с датой и ссылкой. Параллельные агенты обязаны соблюдать тот же протокол.

## OCP deep docs
- Folder: https://github.com/floflo777/open-crypto-puzzles/tree/main/1-big-prizes/peter-todd-hash-collision-bounties-0-59btc
- README (raw): https://raw.githubusercontent.com/floflo777/open-crypto-puzzles/main/1-big-prizes/peter-todd-hash-collision-bounties-0-59btc/README.md

## Досье agntn/puzzles (16.10.2026)

Перенесено из реестра [@agntn/puzzles](https://puzzles.agntn.dev/collections/hash-collision) (raw: https://puzzles.agntn.dev/collections/hash-collision.md). Ниже — разбор первоисточника: механика, кто решал, что проверено.

- `id`: "hash-collision/sha1"
- `chain`: "bitcoin"
- `address`: p2sh(
- `sourceUrl`: "https://bitcointalk.org/index.php?topic=293382.0"
- `startedAt`: "2013-09-13 04:48:29"
- `status`: Status.Claimed
- `prize`: 2.48

> Peter Todd's P2SH bounties from 2013. Five pay for a hash collision and one for an OP_ABS quirk. SHA-1 fell in 2017 and was spent in 2023. Four still stand.

## The puzzle

In September 2013 Peter Todd funded six P2SH addresses. Five pay out to anyone with a hash collision: two different preimages, same value under SHA-1, SHA-256, RIPEMD-160, HASH160 or HASH256. The sixth pays for an `OP_ABS` quirk, no collision needed. It's a bounty on the hash function itself. The prize sits on chain where anyone can top it up, and people did.

SHA-1 fell in 2017, when the SHAttered collision was published. The bounty was spent in 2023, and the record dates the claim to that transaction. The other four hash bounties are still funded. Nobody has a SHA-256 collision. And if you have one, there's a faster way to make money than 0.28 BTC.

## What the records carry

These are the only `p2sh` records in the dataset, and the only ones with a redeem script:

```ts [src/collections/hash-collision/sha1.ts]
export const hashCollisionPuzzleSha1 = puzzle({
  id: "hash-collision/sha1",
  chain: "bitcoin",
  address: p2sh(
    "37k7toV1Nv4DfmQbmZ8KuZDQCYK9x5KpzP",
    "4266fc6f2c2861d7fe229b279a79803afca7ba34",
    redeemScript("4266fc6f2c2861d7fe229b279a79803afca7ba34", "6e879169a77ca787"),
  ),
  sourceUrl: "https://bitcointalk.org/index.php?topic=293382.0",
  startedAt: "2013-09-13 04:48:29",
  status: Status.Claimed,
  prize: 2.48,
  solvedAt: "2023-02-22 23:00:49",
  transactions: [
    funding("09de…8a83", "2013-09-13 04:48:29", 0.01),
    claim("9ec2…14e0", "2023-02-22 23:00:49", 0.000096),
  ],
});
```

`6e879169a77ca787` is `OP_2DUP OP_EQUAL OP_NOT OP_VERIFY OP_SHA1 OP_SWAP OP_SHA1 OP_EQUAL`. Two inputs, not equal to each other, equal after SHA-1. There's no private key to publish, so `hasPrivateKey()` is `false` on all six and `verify` answers `unavailable`. A public key isn't a thing here either. A P2SH address exposes a script, not a key, and the data gate exempts this collection from the rule that a claimed puzzle needs one.

## Status

`claimed`, not `solved`, for SHA-1 and `OP_ABS`. A collision isn't a key anyone could post to the thread. `peter_todd` is an alias for this collection, from the days the dataset was keyed by author.

## Every puzzle

One page each: the record, the transactions and the live balance.

<collection-puzzles collection="hash-collision">

</collection-puzzles>

## OCP: машинные данные (puzzles.json, 16.10.2026)

Структурированные данные из `puzzles.json` репозитория [open-crypto-puzzles](https://github.com/floflo777/open-crypto-puzzles) (snapshot OCP: 2026-08-16; цены: {'date': '2026-08-16', 'BTC': 63000, 'ETH': 1880, 'AR': 1.81, 'LTC': 54}).

- `slug`: peter-todd-hash-collision-bounties-0-59btc
- `title`: Peter Todd Hash Collision Bounties
- `status`: **watch**
- `tier`: big | `chain`: bitcoin
- `series`: None
- `author`: Peter Todd | bitcointalk:u=2546
- `prize`: 0.59364885 BTC (оценка $37400 на 2026-08-16) — combined across 4 live P2SH scripts (SHA-256, RIPEMD-160, HASH160, HASH256); a 5th sibling (SHA-1) was claimed in 2023 and is not part of this total
- `published`: 2013-09-13 https://bitcointalk.org/index.php?topic=293382.0
- `puzzle_type`: hash-collision
- `target_format`: two distinct byte strings, each under 521 bytes, with equal digest under the named hash function; submitted directly in a scriptSig, no key derivation involved
- `difficulty_left`: research-breakthrough
- `difficulty_note`: no known shortcut over the generic collision bound for any of the 4 live hash functions (2^128 for SHA-256 and HASH256, 2^80 for RIPEMD-160 and HASH160); what would close this is a published practical collision on one of them, the way SHAttered did for SHA-1 in 2017
- `tested_total`: {'candidates': 0, 'families': 4, 'certified': True}

**Адреса и проверенное состояние:**
- `35Snmmy3uhaer2gTboc81ayCip4m9DT4ko` — escrow | SHA-256 | ожидается: 0.27734251 BTC | проверено 2026-08-16: **funded-unspent**
  - https://mempool.space/address/35Snmmy3uhaer2gTboc81ayCip4m9DT4ko
- `3KyiQEGqqdb4nqfhUzGKN6KPhXmQsLNpay` — escrow | RIPEMD-160 | ожидается: 0.11576888 BTC | проверено 2026-08-16: **funded-unspent**
  - https://mempool.space/address/3KyiQEGqqdb4nqfhUzGKN6KPhXmQsLNpay
- `39VXyuoc6SXYKp9TcAhoiN1mb4ns6z3Yu6` — escrow | HASH160 (RIPEMD160(SHA256())) | ожидается: 0.10026873 BTC | проверено 2026-08-16: **funded-unspent**
  - https://mempool.space/address/39VXyuoc6SXYKp9TcAhoiN1mb4ns6z3Yu6
- `3DUQQvz4t57Jy7jxE86kyFcNpKtURNf1VW` — escrow | HASH256 (SHA256(SHA256())) | ожидается: 0.10026873 BTC | проверено 2026-08-16: **funded-unspent**
  - https://mempool.space/address/3DUQQvz4t57Jy7jxE86kyFcNpKtURNf1VW
- `37k7toV1Nv4DfmQbmZ8KuZDQCYK9x5KpzP` — escrow | SHA-1 (reference sibling, claimed 2023-02-22, not part of the live prize) | ожидается: 0 BTC (fully spent) | проверено 2026-08-16: **swept**
  - https://mempool.space/address/37k7toV1Nv4DfmQbmZ8KuZDQCYK9x5KpzP

**Деривация:**
- supply 2 distinct pushes a, b in a single scriptSig such that HASH(a) == HASH(b); this is the generic collision-finding problem for the named hash, with no shortcut in the script itself
- оракул: `tools/oracle.py` | сертифицирован: True
- сверено с: the real 2023-02-22 SHA-1 claim (txid 9ec2a0db0c4c3423a6b2c3cb2a26fc626b037121b4b5f3f57b08916196ff14e0, block 777856), decoded directly from its scriptSig: the SHAttered PDF-prefix pair; and the same-day 2013-09-13 OP_ABS demo claim, a non-hash sibling script proving the same payout template works

**Зацепки (OCP `leads`):**
  - title: a published practical or academic full collision on SHA-256, RIPEMD-160, HASH160 or HASH256 | status: open
  - title: RIPEMD-160 and HASH160 as the most-watched sub-targets (smallest generic bound, more active reduced-round literature) | status: open
  - title: passive monitoring of the spent flag on the 4 live addresses and of collision announcements | status: open

**Материалы третьих лиц:**
- the redeem-script table and the quoted lines are Peter Todd's own puzzle material, quoted briefly with source and date; the SHAttered SHA-1 collision pair is a public academic research artifact (Stevens et al., 2017), read directly from the public blockchain rather than reproduced from the paper; no other third-party material is included

**Источники (OCP `sources`):**
  - url: https://bitcointalk.org/index.php?topic=293382.0 | title: REWARD offered for hash collisions for SHA1, SHA256, RIPEMD160 and other | date: 2013-09-13
  - url: https://github.com/oritwoen/boha | title: boha, community bounty mirror (hash_collision.jsonc) | date: 2026-08-16
  - url: https://shattered.io | title: The first collision for full SHA-1 (SHAttered) | date: 2017-02-23
  - url: https://mempool.space/tx/9ec2a0db0c4c3423a6b2c3cb2a26fc626b037121b4b5f3f57b08916196ff14e0 | title: mempool.space, SHA-1 bounty claiming transaction | date: 2023-02-22
  - url: https://mempool.space/address/35Snmmy3uhaer2gTboc81ayCip4m9DT4ko | title: mempool.space, 4 live escrow addresses and the SHA-1 reference | date: 2026-08-16
