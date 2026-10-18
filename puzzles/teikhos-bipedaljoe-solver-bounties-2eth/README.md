# TeikhosBounty: Johan Nygren's Proof-of-Public-Key Puzzles

Индекс: [MASTER_CATALOG.md](../../MASTER_CATALOG.md) (Части 1-8). Источник данных: [open-crypto-puzzles](https://github.com/floflo777/open-crypto-puzzles).

## Кратко
- Статус: **open** (mid)
- Цепь: ethereum
- Приз: 2.000006 ETH (USD 3760)
- Примечание: sum of the 3 open contracts: C1 1.000002 ETH, C2 0.500002 ETH, 9732 0.500002 ETH; a 4th contract, AEC7, holds 1.000012 ETH with no payout path for anyone; a 5th, 735B, was solved by me for 0.5 ETH and is now drained
- Опубликовано: 2018-02-25 https://gist.github.com/resilience-me/be11a0ed3575dddca10df8263b53cc1d
- Типы: smart-contract, timelock
- Difficulty left: external-info
- the cryptography is sound and confirmed working end to end by the 735B solve; C1, C2, and 9732 target public keys that have never appeared on chain or in any OSINT trace found so far, so the only realistic path in is information from the author

## Адреса/эскроу
- `0x735ba26f91e1275fa4b504649b19ef74739fe7e7` — 735B | expected: 0.5 ETH | state: swept (checked 2026-08-16) | https://etherscan.io/address/0x735ba26f91e1275fa4b504649b19ef74739fe7e7
- `0x17e5e0910b9185b0ede564dcbf074ca910ad56a4` — C1 | expected: 1.000002 ETH | state: contract-holds-funds (checked 2026-08-16) | https://etherscan.io/address/0x17e5e0910b9185b0ede564dcbf074ca910ad56a4
- `0xd7c6d542f3dcdceda845112b8fd567b8f8655805` — C2 | expected: 0.500002 ETH | state: contract-holds-funds (checked 2026-08-16) | https://etherscan.io/address/0xd7c6d542f3dcdceda845112b8fd567b8f8655805
- `0x973c2178b09225d1de3ab037d40b3f24af696255` — 9732 | expected: 0.500002 ETH | state: contract-holds-funds (checked 2026-08-16) | https://etherscan.io/address/0x973c2178b09225d1de3ab037d40b3f24af696255
- `0xaec7e8c221c3fd24e75c996e32289235fd899ebf` — AEC7 | expected: 1.000012 ETH, no payout path exists | state: contract-holds-funds (checked 2026-08-16) | https://etherscan.io/address/0xaec7e8c221c3fd24e75c996e32289235fd899ebf
- `0x83e4b2a5A464bDfCD83057Ac08447f533A595156` — my wallet (735B payout destination) | expected: n/a | state: unknown (checked 2026-08-16) | https://etherscan.io/address/0x83e4b2a5A464bDfCD83057Ac08447f533A595156

## Источники
- 2018-03-19 — Signature idea for use with account abstraction — https://github.com/ethereum/EIPs/issues/935
- 2018-02-27 — ProofOfSymmetricKey.sol — https://gist.github.com/resilience-me/be11a0ed3575dddca10df8263b53cc1d
- 2026-08-16 — C1 verified source — https://etherscan.io/address/0x17e5e0910b9185b0ede564dcbf074ca910ad56a4#code
- 2022-04-03 — The 2022 reverted attempt that leaked 735B's public key — https://etherscan.io/tx/0x7e2596f9f202aad8a90e84cf93e32e7b3fb0ba244491d84542cedaf089a553c4
- 2026-06-21 — 735B payout transaction — https://etherscan.io/tx/0x4d2bfceb311bda8d265debab1c8ad23cb860922b876eca523327d0405ab97bff

## Подробности
Здесь должна накапливаться расширенная информация по мере проходов: подсказки, прогресс сообщества, проверенные гипотезы, ссылки, compute-оценки. Текущий файл — скелет из OCP; заполняется автоматически в циклах.


---
## Логирование (обязательно)
См. `../../AGENT_INSTRUCTIONS.md`. Любая значимая находка/прогресс/баланс/решение (полностью или частично) **должна** быть дописана сюда с датой и ссылкой. Параллельные агенты обязаны соблюдать тот же протокол.

## OCP deep docs
- Folder: https://github.com/floflo777/open-crypto-puzzles/tree/main/2-mid-prizes/teikhos-bipedaljoe-solver-bounties-2eth
- README (raw): https://raw.githubusercontent.com/floflo777/open-crypto-puzzles/main/2-mid-prizes/teikhos-bipedaljoe-solver-bounties-2eth/README.md

## Досье Hark v2 (16.10.2026) — каталог 7.2

### TeikhosBounty (Johan Nygren, «Proof-of-Public-Key») — 2.000006 ETH
- **Сеть**: Ethereum. Открыты:
  - C1 `0x17e5e0910b9185b0ede564dcbf074ca910ad56a4` — 1.000002 ETH
  - C2 `0xd7c6d542f3dcdceda845112b8fd567b8f8655805` — 0.500002 ETH
  - 9732 `0x973c2178b09225d1de3ab037d40b3f24af696255` — 0.500002 ETH
  - AEC7 `0xaec7e8c221c3fd24e75c996e32289235fd899ebf` — 1.000012 ETH (без пути выплаты)
  - Решён 735B `0x735ba26f91e1275fa4b504649b19ef74739fe7e7` → 0.5 ETH (выплачено 21.06.2026)
- **Статус**: открыто (C1/C2/9732 funded-unspent, проверено 16.08.2026)
- **Тип**: smart-contract, timelock
- **Источники**:
  - Gist: https://gist.github.com/resilience-me/be11a0ed3575dddca10df8263b53cc1d (27.02.2018, ProofOfSymmetricKey.sol)
  - EIP-935: https://github.com/ethereum/EIPs/issues/935 (19.03.2018, идея подписи)
  - C1-код: https://etherscan.io/address/0x17e5e0910b9185b0ede564dcbf074ca910ad56a4#code
  - Ревернутая попытка 2022 (утечка pubkey 735B): https://etherscan.io/tx/0x7e2596f9f202aad8a90e84cf93e32e7b3fb0ba244491d84542cedaf089a553c4
  - Выплата 735B: https://etherscan.io/tx/0x4d2bfceb311bda8d265debab1c8ad23cb860922b876eca523327d0405ab97bff
  - OCP: https://github.com/floflo777/open-crypto-puzzles/tree/main/2-mid-prizes/teikhos-bipedaljoe-solver-bounties-2eth
- **Суть**: криптография подтверждена (735B решили), но целевые pubkey C1/C2/9732 никогда не появлялись on-chain; реальный путь — информация от автора.

## Досье agntn/puzzles (16.10.2026)

Перенесено из реестра [@agntn/puzzles](https://puzzles.agntn.dev/collections/teikhos) (raw: https://puzzles.agntn.dev/collections/teikhos.md). Ниже — разбор первоисточника: механика, кто решал, что проверено.

- `id`: "teikhos/4"
- `chain`: "ethereum"
- `address`: "0x735ba26f91e1275fa4b504649b19ef74739fe7e7"
- `sourceUrl`: "https://etherscan.io/address/0x735ba26f91e1275fa4b504649b19ef74739fe7e7#code"
- `startedAt`: "2018-03-14 03:11:51"
- `status`: Status.Solved
- `prize`: 0.5

> In 2018 Johan Nygren put ETH behind five contracts that pay whoever submits the right public key. Four of them can pay. One did in 2026 with a key a failed attempt had left on chain four years earlier.

In February and March 2018 [Johan Nygren](https://puzzles.agntn.dev/authors/johan-nygren) deployed five contracts from one address, all verified on Etherscan as `TeikhosBounty`, and funded each with ETH. The idea behind them: hide a signature behind a hash so nobody can use it until they know the public key. Five days after the last deploy the author [proposed it on the EIPs tracker](https://github.com/ethereum/EIPs/issues/935) as `proof_of_public_key = keccak256(nextPublicKey)` and named it Teikhos, Greek for "wall" or "fortification". The contracts are the wall with money behind it.

## How a TeikhosBounty works

Normally a public key leaks the moment an address signs something. Here the address never signs. The contract stores a signature that key made over itself, XORed with the key, so the stored words look like noise. Send the right 64 bytes to `authenticate()` and the XOR gives back `r` and `s`. `ecrecover` checks them against the address the key hashes to. Wrong key, garbage signature, nothing happens.

So what do you search for? Not a private key. You never sign anything with it, and you don't need it. You need the public key, and there is no route from the contract to it: no transaction from its address, no signature, nothing on chain to recover it from. It's a 64-byte secret someone has to hand you.

### Three variants

- **teikhos/0** and **teikhos/1**, 1 ETH each. The simple one: stored words XOR public key, `ecrecover`, `suicide(msg.sender)`. Except teikhos/0 stops at the check, more on that below.
- **teikhos/2**, 0.5 ETH. One more layer: the public key first unlocks a symmetric key, and that key unlocks the signature. The same code went up [as a gist](https://gist.github.com/resilience-me/be11a0ed3575dddca10df8263b53cc1d) 48 minutes before the deploy, stored proofs included.
- **teikhos/3** and **teikhos/4**, 0.5 ETH each. The mask is the Keccak-512 of the key, computed by a separate `SHA3_512` contract. And there's commit and reveal on top, because teikhos/1 and teikhos/2 pay whoever's transaction lands first. Anyone watching the mempool can copy a correct key and outbid you on gas.

The two commit and reveal contracts aren't twins. teikhos/4 went up two hours after teikhos/3 as a revision. In teikhos/3 you commit, `authenticate()` sets the solution, you call `reveal()` later, and if nobody reveals a valid commit in seven days, `reward()` sends the ETH back to the author. In teikhos/4 `authenticate()` reveals your commit in the same call and reverts unless it holds. No way back to the author.

## How teikhos/4 fell

On April 3, 2022 an address nobody has tied to a name committed to teikhos/4 and, twenty minutes later, called `authenticate()` with a public key. The transaction [reverted](https://etherscan.io/tx/0x7e2596f9f202aad8a90e84cf93e32e7b3fb0ba244491d84542cedaf089a553c4). The key was right. In teikhos/4 a correct key only reverts at the last line, `require(reveal() == true)`, so it was their commit that didn't hold. A reverted transaction still keeps its calldata, though. The answer sat on chain for four years.

[floflo777](https://puzzles.agntn.dev/solvers/floflo777) went through the calldata of every authenticate call to the five contracts, checked each key offline and found this one. In June 2026 they committed and authenticated through Flashbots, so nobody could copy the commit, waited the seven days and called `reward()`. 0.5 ETH, eight years and three months after the funding.

The day they [posted about it](https://x.com/0xFlorent_/status/2068735759889145906), a crowd showed up. More than a dozen addresses sent `authenticate()` calls to teikhos/0, teikhos/1 and teikhos/2. Nothing paid, and teikhos/0 couldn't have.

## What the teikhos records carry

```ts [src/collections/teikhos/4.ts]
export const teikhos4 = puzzle({
  id: "teikhos/4",
  chain: "ethereum",
  address: "0x735ba26f91e1275fa4b504649b19ef74739fe7e7",
  sourceUrl: "https://etherscan.io/address/0x735ba26f91e1275fa4b504649b19ef74739fe7e7#code",
  startedAt: "2018-03-14 03:11:51",
  status: Status.Solved,
  prize: 0.5,
  stages: [
    stage("commit", "Store a signature by your own address …", [
      artifact("verified contract source", source),
    ]),
    stage(
      "authenticate",
      "Submit the public key whose Keccak-512 unmasks the stored proof …",
      [artifact("verified contract source", source)],
      answer("ca6a98ce…c36940c6", writeup, { date: "2026-08-16" }),
    ),
    stage("reward", "After the seven days anyone can call it …", [
      artifact("verified contract source", source),
    ]),
  ],
  solvedAt: "2026-06-21 09:51:23",
  solveTime: 261_038_372,
  transactions: [funding(/* 2018 */), claim(/* 2026, reward() */)],
  solver: party("floflo777", { key: "floflo777", addresses: ["0x83e4…5156"], facts: [/* … */] }),
});
```

### An answer that isn't a key

The winning input is a public key, and `pubkey` is the wrong place for it. That field means the key of the puzzle's own address, and a contract has none. So the key lives on the `authenticate` stage as its published `answer`, with floflo777's write-up as the source. The stages are the contract's own calls, one transaction each: three for teikhos/4, four for teikhos/3 with its separate `reveal()`, and one `authenticate` for the older three. The record has no `key` and no `pubkey`, and `verify` has nothing to check. The chain already did: `reward()` only pays after the right key went through `authenticate()`.

### Contracts don't sign

A claim here is a `selfdestruct`, not a signed spend, so a solved record has no public key to show. The validation that asks every claimed puzzle for one skips this collection, the same way it skips the Arweave weaves.

### Numbered in deployment order

`teikhos/4` resolves as `4`, `"4"` or `teikhos/4`. The numbers are our own, the order the contracts went on chain, from 0. Etherscan calls all five `TeikhosBounty`, so the author's name doesn't tell them apart. Why 0 and not 1? The first contract is the odd one out, and the rest keep the numbers they'd have without it.

### teikhos/0 can't pay

The first contract, [`0xaec7e8c2…`](https://etherscan.io/address/0xaec7e8c221c3fd24e75c996e32289235fd899ebf#code), went up 49 minutes before teikhos/1 and holds a bit over 1 ETH. Its `authenticate()` returns `true` on the right key and that's all. No `suicide`, no transfer, nothing else in the code moves ETH. So the record is there because the author funded it like the others, and it stays `unsolved` forever, key or no key. Its 1 ETH counts toward the open prizes, and nobody can collect it.

## The TeikhosBounty records

<collection-puzzles collection="teikhos">

</collection-puzzles>

## OCP: машинные данные (puzzles.json, 16.10.2026)

Структурированные данные из `puzzles.json` репозитория [open-crypto-puzzles](https://github.com/floflo777/open-crypto-puzzles) (snapshot OCP: 2026-08-16; цены: {'date': '2026-08-16', 'BTC': 63000, 'ETH': 1880, 'AR': 1.81, 'LTC': 54}).

- `slug`: teikhos-bipedaljoe-solver-bounties-2eth
- `title`: TeikhosBounty: Johan Nygren's Proof-of-Public-Key Puzzles
- `status`: **open**
- `tier`: mid | `chain`: ethereum
- `series`: teikhos
- `author`: Johan Nygren | github:resilience-me, reddit:johanngr, steemit:johan-nygren, x:resilience_me, former:bipedaljoe
- `prize`: 2.000006 ETH (оценка $3760 на 2026-08-16) — sum of the 3 open contracts: C1 1.000002 ETH, C2 0.500002 ETH, 9732 0.500002 ETH; a 4th contract, AEC7, holds 1.000012 ETH with no payout path for anyone; a 5th, 735B, was solved by me for 0.5 ETH and is now drained
- `published`: 2018-02-25 https://gist.github.com/resilience-me/be11a0ed3575dddca10df8263b53cc1d
- `puzzle_type`: smart-contract, timelock
- `target_format`: 64-byte uncompressed public key (no 0x04 prefix), unmasked against the contract's stored proof and checked with ecrecover; no private key needed
- `difficulty_left`: external-info
- `difficulty_note`: the cryptography is sound and confirmed working end to end by the 735B solve; C1, C2, and 9732 target public keys that have never appeared on chain or in any OSINT trace found so far, so the only realistic path in is information from the author
- `tested_total`: {'candidates': 2, 'families': 5, 'certified': False}

**Адреса и проверенное состояние:**
- `0x735ba26f91e1275fa4b504649b19ef74739fe7e7` — contract | 735B | ожидается: 0.5 ETH | проверено 2026-08-16: **swept**
  - https://etherscan.io/address/0x735ba26f91e1275fa4b504649b19ef74739fe7e7
- `0x17e5e0910b9185b0ede564dcbf074ca910ad56a4` — contract | C1 | ожидается: 1.000002 ETH | проверено 2026-08-16: **contract-holds-funds**
  - https://etherscan.io/address/0x17e5e0910b9185b0ede564dcbf074ca910ad56a4
- `0xd7c6d542f3dcdceda845112b8fd567b8f8655805` — contract | C2 | ожидается: 0.500002 ETH | проверено 2026-08-16: **contract-holds-funds**
  - https://etherscan.io/address/0xd7c6d542f3dcdceda845112b8fd567b8f8655805
- `0x973c2178b09225d1de3ab037d40b3f24af696255` — contract | 9732 | ожидается: 0.500002 ETH | проверено 2026-08-16: **contract-holds-funds**
  - https://etherscan.io/address/0x973c2178b09225d1de3ab037d40b3f24af696255
- `0xaec7e8c221c3fd24e75c996e32289235fd899ebf` — contract | AEC7 | ожидается: 1.000012 ETH, no payout path exists | проверено 2026-08-16: **contract-holds-funds**
  - https://etherscan.io/address/0xaec7e8c221c3fd24e75c996e32289235fd899ebf
- `0x83e4b2a5A464bDfCD83057Ac08447f533A595156` — payout | my wallet (735B payout destination) | ожидается: n/a | проверено 2026-08-16: **unknown**
  - https://etherscan.io/address/0x83e4b2a5A464bDfCD83057Ac08447f533A595156

**Деривация:**
- unmask the contract's stored proof with a candidate 64-byte public key to get (r, s), then check with ECDSA public-key recovery (both recovery ids) that it is a valid signature of a fixed message under address(keccak256(pubkey))
- оракул: `tools/oracle.py` | сертифицирован: True
- сверено с: the real public key I recovered and submitted to solve 735B, itself public on chain since the winning authenticate() transaction; a deliberately altered version of the same key is confirmed to fail

**Зацепки (OCP `leads`):**
  - title: ask Johan Nygren directly where the C1/C2/9732 public keys or a solution are published | status: open
  - title: passive triggers: a testnet snapshot resurfaces, the author discloses a key, or a competitor submits a key to C1/C2 in public | status: open

**Решения/выплаты (OCP `solutions`):**
  - date: 2026-06-21

**Материалы третьих лиц:**
- no third-party articles or dumps; only the author's own published GitHub issue and gist text (about 90 words quoted total), verified contract source, and on-chain transaction data

**Источники (OCP `sources`):**
  - url: https://github.com/ethereum/EIPs/issues/935 | title: Signature idea for use with account abstraction | date: 2018-03-19
  - url: https://gist.github.com/resilience-me/be11a0ed3575dddca10df8263b53cc1d | title: ProofOfSymmetricKey.sol | date: 2018-02-27
  - url: https://etherscan.io/address/0x17e5e0910b9185b0ede564dcbf074ca910ad56a4#code | title: C1 verified source | date: 2026-08-16
  - url: https://etherscan.io/tx/0x7e2596f9f202aad8a90e84cf93e32e7b3fb0ba244491d84542cedaf089a553c4 | title: The 2022 reverted attempt that leaked 735B's public key | date: 2022-04-03
  - url: https://etherscan.io/tx/0x4d2bfceb311bda8d265debab1c8ad23cb860922b876eca523327d0405ab97bff | title: 735B payout transaction | date: 2026-06-21
