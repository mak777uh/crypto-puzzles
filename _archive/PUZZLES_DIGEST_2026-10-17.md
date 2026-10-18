# ДИГЕСТ ВСЕХ 130 ПАПОК ЗАГАДОК

Сборка: 2026-10-17 18:42

## 1000-btc-challenge-bitcoin-puzzle-tx
# 1000 BTC Challenge (Bitcoin Puzzle Transaction)
- РўРёРїС‹: address-only, known-public-key, bruteforce, pollard-kangaroo
- 2026 вЂ” news.bitcoin.com вЂ” https://news.bitcoin.com/key-hunters-eye-58-87m-bitcoin-puzzle-as-916-btc-sits-unsolved-in-78-addresses/
- Address-only (#71-#134): РїРѕР»РЅС‹Р№ Р±СЂСѓС‚С„РѕСЂСЃ; RTX 4090 РґР°С‘С‚ ~1,5 РјР»СЂРґ РєР»СЋС‡РµР№/СЃ.
| #71 | 7.1019 | 71 | Address-only | РќРµС‚ |
| #72 | 7.2001 | 72 | Address-only | РќРµС‚ |
| #73 | 7.3001 | 73 | Address-only | РќРµС‚ |
| #74 | 7.4000 | 74 | Address-only | РќРµС‚ |
| #76 | 7.6000 | 76 | Address-only | РќРµС‚ |
| #77 | 7.7000 | 77 | Address-only | РќРµС‚ |
| #78 | 7.8000 | 78 | Address-only | РќРµС‚ |
| #79 | 7.9000 | 79 | Address-only | РќРµС‚ |
| #81 | 8.1000 | 81 | Address-only | РќРµС‚ |
| #82 | 8.2000 | 82 | Address-only | РќРµС‚ |
- files=1, data-files=0, log=False

## 11b-x-1371
# 11B-X-1371 (2015)
- files=1, data-files=0, log=False

## 1btc-brainwallet-defcon-2014
# В«1 BTC BrainwalletВ» (DEFCON 2014)
  - https://www.reddit.com/r/bitcoinpuzzles/comments/7asy51/brainwallet_puzzle_004_btc_reward/
- files=1, data-files=0, log=False

## 310-btc-challenge-0-31btc
# 310 BTC Challenge (С„РёРЅР°Р»СЊРЅС‹Р№ СЌС‚Р°Рї)
- files=1, data-files=0, log=False

## 80-bit-ktimesg-key-challenge
# kTimesG's 80-bit key challenge
- `address`: "1ECDLP8osCZHBB1LH5PVAUfFegeMgFb52q"
- `status`: Status.Solved
- `prize`: 0.005
October 16, 2024. [kTimesG](https://bitcointalk.org/index.php?topic=1306983.msg64639847#msg64639847) announced a side challenge in the Bitcointalk thread of the [Bitcoin puzzle transaction](https://puzzles.agntn.dev/collections/bits). The deal: on November 1 at midnight UTC, a P2PKH address with **0.005 BTC** and "an 80-bits secure private key". Plus the range to search. The winner only had to say which method broke it. And there was a line for everyone about to argue: "If your first instinct is to yell 'this is not a 80-bits secure private key', please note this competition is NOT for you."
The address got two payments of 0.0025 BTC on October 28 and never spent. No spend, no public key, nothing to search with. The author promised to push a spend 20 to 28 hours after the range post. And the hint said where the hard part was: "The challenge involves correctly extracting pubkey from the raw TX, otherwise it's a no brainer."
  address: "1ECDLP8osCZHBB1LH5PVAUfFegeMgFb52q",
  status: Status.Solved,
  prize: 0.005,
  solver: party(undefined, { addresses: ["14q4SoQwENXXzsVT3GMwDrDUGiW5QZeiDg"] }),
The key is the reduced one, the 256-bit number that actually signs for the address. It has no `bits`, on purpose. `bits` has to match the key's own length, and 80 is the width of the range, not the key. The range and the 511-bit form sit in the hints, where the author put them.
`startedAt` is the range post, not the funding four days earlier. The author did post the address on October 31, to show it wasn't a hoax. But without the range there was nothing to search. And without the pending spend, nothing to search with. So `solveTime` is 88,528 seconds, about 24.6 hours, and almost all of it was waiting for the spend.
### A solver with an address and no name
opchecksig [wrote later](https://bitcointalk.org/index.php?topic=1306983.msg64697663#msg64697663) that the prize address is theirs. Kangaroo on an RTX 4070, 28 minutes. Nobody signed anything with that address though. So the record keeps the address and skips the name.
- files=1, data-files=0, log=False

## 973-eht-namuh-973
# 973-eht-namuh-973.com
- files=1, data-files=0, log=False

## a858de45f56d9bc9-reddit
# A858DE45F56D9BC9 (Reddit)
- files=1, data-files=0, log=False

## actuarial-science-nft-hunt-10eth
# Actuarial Science NFT Hunt
- files=1, data-files=0, log=False

## adam-2-0
# Adam 2.0 / РЅР°СЃР»РµРґРЅРёРєРё Unfavorable Semicircle
- files=1, data-files=0, log=False

## aenigma-shards-nft
# Aenigma Shards (AESH NFT cryptogram)
- A promised total is not a funded prize: mint stalled at 72 of 100, contract holds 0 ETH, no puzzle ever released beyond a demo. Check the contract balance, not the marketing.
- `0xC77C1CB208356d953439190a94f3C8a4c4f502A3` вЂ” None | expected: None | state: unfunded (checked 2026-08-16) | https://etherscan.io/address/0xC77C1CB208356d953439190a94f3C8a4c4f502A3
- `status`: **dead-end** (dead-end: unfunded)
- `prize`: 34 ETH (РѕС†РµРЅРєР° $None РЅР° 2026-08-16) вЂ” promised across 10 contingent mint-count tiers; never materialized
- `difficulty_note`: A promised total is not a funded prize: mint stalled at 72 of 100, contract holds 0 ETH, no puzzle ever released beyond a demo. Check the contract balance, not the marketing.
  - https://etherscan.io/address/0xC77C1CB208356d953439190a94f3C8a4c4f502A3
- files=1, data-files=0, log=False

## ah-white-walking-banks-800ksats
# AH White: Walking Banks
- РџСЂРёРјРµС‡Р°РЅРёРµ: split across two P2WPKH addresses derived from one published xpub, funded 2024-09-05
- `bc1qxy4tf0s4n7x9w24rawf9qsxh2hyljrmvyrhwzt` вЂ” account 0, index 0 | expected: 100000 sats | state: funded-unspent (checked 2026-08-16) | https://mempool.space/address/bc1qxy4tf0s4n7x9w24rawf9qsxh2hyljrmvyrhwzt
- `bc1q4qc24xk5cehc4t7vr264zldsms2kmxf86jqjau` вЂ” account 0, index 1 | expected: 700000 sats | state: funded-unspent (checked 2026-08-16) | https://mempool.space/address/bc1q4qc24xk5cehc4t7vr264zldsms2kmxf86jqjau
- Folder: https://github.com/floflo777/open-crypto-puzzles/tree/main/2-mid-prizes/ah-white-walking-banks-800ksats
- README (raw): https://raw.githubusercontent.com/floflo777/open-crypto-puzzles/main/2-mid-prizes/ah-white-walking-banks-800ksats/README.md
> AH White hid a real 24-word Bitcoin seed in the thriller Walking Banks. 800000 sats wait on two addresses. Four words are known and twenty are not.
> The book holds information that, when pieced together, unveil a seed phrase to a wallet containing real bitcoin; 0.008 BTC, or 800,000 Satoshis to be precise.
The characters work it out on the next page. "Third" appears twice, every other word three times. The repeats are error correction against mutations, and the words are BIP39. Then Ying says it out loud: crystal, small, advice and reflect go in "as the third list of words" of a longer seed. If every list holds four words, that's positions 9 to 12.
## Two addresses, one seed
One 24-word seed funds two native SegWit addresses. `walking-banks/1` holds 100,000 sats and `walking-banks/2` holds 700,000, numbered in the order they were funded. Each gets its own record, like the [Dug hunt](https://puzzles.agntn.dev/collections/dug) does, because each is a separate prize on the chain. Find the seed and you take both.
### The site published an xpub, not an address
The Find the Treasure section linked the wallet's xpub on blockchain.com. That key is the account level of the wallet, so it derives every address the seed can show. Read it as native SegWit and child `0/0` and `0/1` are exactly the two funded addresses. Both records carry that xpub, with the paths `m/84'/0'/0'/0/0` and `m/84'/0'/0'/0/1`. The author never said 84, so that part is the native SegWit convention, not her word. The xpub is hers, though. Got a candidate seed? Derive its account key and compare. One string match away from 800,000 sats.
Everything past those four words. floflo777's [write up](https://github.com/floflo777/open-crypto-puzzles/tree/main/2-mid-prizes/ah-white-walking-banks-800ksats) covers the free PDF, the site text and the audiobook narration. Acrostics, typography, a search for more strings like that one. Only the page 122 string came out. Their best lead is to ask the author whether the free PDF holds all 24 words at all.
- files=2, data-files=0, log=True

## andy-bauch-new-money-cog-428ksats
# Andy Bauch: New Money, COG
- `1HLodS8H2GoWbnBXWcz7EkY773dKdD4JEv` вЂ” main | expected: 0 sats (428,206 sats until 2026-09-25) | state: swept (checked 2026-09-26) | https://mempool.space/address/1HLodS8H2GoWbnBXWcz7EkY773dKdD4JEv
- `status`: **solved**
- `prize`: 428206 sats (РѕС†РµРЅРєР° $270 РЅР° 2026-08-16) вЂ” the escrow received 527,872 sats on 2017-07-01, that amount left on 2017-12-30 and was replaced by the same funder the next day, 2017-12-31, with the 428,206 sats that remains unspent today
- `target_format`: unknown; likely a 52-character compressed WIF private key (K or L prefix), P2PKH, based on the escrow's own compressed-pubkey spend
  - https://mempool.space/address/1HLodS8H2GoWbnBXWcz7EkY773dKdD4JEv
- a private key encoded as a pattern of colored LEGO bricks (mechanism used for COG specifically not yet fixed: color count, cell size and payload region are all unknown), decoded back to compressed and uncompressed P2PKH addresses and compared to the escrow
  - title: a photograph resolving individual plate seams (about 40 px/stud or more), from the piece's current owner | status: open
  - title: close the color-count gap in the region search (only 4 colors tried so far) | status: open
  - title: series pieces from 2017 with no public photo yet | status: open
- files=1, data-files=0, log=False

## anime-seed-phrase-puzzle-0-2btc
# Anime Seed Phrase Puzzle
- files=1, data-files=0, log=False

## aoi-nakamoto-quizchain-0-854btc
# Aoi Nakamoto Quizchain
- Real Big Block: the transform and the case-flip rule are confirmed exactly on a solved sibling lot; what is missing is the precise source text the author hashed on 2019-07-30. She removed one twist that day and kept at least one, and later wrote that she lost the solution herself. Every contiguous paragraph span (1,469,908 texts), a bounded 2-edit slice on the full chapter (221,520 texts), every pair of boundary edits on 16 certified bases (48,379,696 texts) and the rule the chapter dictates itself are negatives. The reader who swept Block 76 on 2026-08-17 holds the convention of a final Aoi block, which is the cheapest calibration left
- `14zMkTgaVXJcxdh4JdWi29MLRR44iUSG9W` вЂ” Real Big Block, stage 2 | expected: 77700000 sats | state: funded-unspent (checked 2026-08-27) | https://mempool.space/address/14zMkTgaVXJcxdh4JdWi29MLRR44iUSG9W
- `13Cv6SXUnzGDT8JHqzzJ8xMPtsSdhJA4wd` вЂ” Quizchain2 Block 76 | expected: 7700000 sats | state: swept (checked 2026-08-21) | https://mempool.space/address/13Cv6SXUnzGDT8JHqzzJ8xMPtsSdhJA4wd
- `19TbyN5KCg1Lg7qHwezifsLVcdSa2Rj5KN` вЂ” Real Big Block, stage 1 (certification reference, solved by a third party in 2019, not part of the live prize) | expected: n/a | state: swept (checked 2026-08-16) | https://mempool.space/address/19TbyN5KCg1Lg7qHwezifsLVcdSa2Rj5KN
- Folder: https://github.com/floflo777/open-crypto-puzzles/tree/main/1-big-prizes/aoi-nakamoto-quizchain-0-854btc
- README (raw): https://raw.githubusercontent.com/floflo777/open-crypto-puzzles/main/1-big-prizes/aoi-nakamoto-quizchain-0-854btc/README.md
- Deep doc: https://raw.githubusercontent.com/floflo777/open-crypto-puzzles/main/1-big-prizes/aoi-nakamoto-quizchain-0-854btc/README.md
  - OCP `1-big-prizes/aoi-nakamoto-quizchain-0-854btc` (tested.md, ~3,2В·10вЃё РЅРµРіР°С‚РёРІРѕРІ).
- `address`: "14zMkTgaVXJcxdh4JdWi29MLRR44iUSG9W"
- `prize`: 0.777
July 22, 2019. AoiNakamoto posts the last block of the Quizchain. "Thank you for playing the quizchain." Then the prize: 777 mBTC. Over a hundred times the usual 7 mBTC block.
### The lucky address
The first funding went to `1EFojcAo2vbhRGCGCa7q8Wwvzss28mhQYC`, and the post spends three paragraphs on why that address is lucky. A 7 near the middle. Fibonacci numbers. `Ao` at digits six and seven, almost Aoi. Then a self-diagnosis: "Or maybe just another severe case of delirious Apophenia." Honestly, the best line of the whole chain.
- files=2, data-files=0, log=True

## arweave-puzzle-10-500ar
# Arweave Puzzle #10
- `bkjJGw3NLxs8OAyRxgTL-QFpiB3lBJqZ76kDhWdB-Rs` вЂ” main | expected: 500.02225493 AR | state: funded-unspent (checked 2026-08-16) | https://viewblock.io/arweave/address/bkjJGw3NLxs8OAyRxgTL-QFpiB3lBJqZ76kDhWdB-Rs
- 2020-04-14 вЂ” "1,2,4,8 = solved / 3,5,7,9 = not solved yet" вЂ” https://twitter.com/arweavep/status/1250036746802298885
- 2026-08-16 вЂ” Escrow wallet, viewblock.io вЂ” https://viewblock.io/arweave/address/bkjJGw3NLxs8OAyRxgTL-QFpiB3lBJqZ76kDhWdB-Rs
- Folder: https://github.com/floflo777/open-crypto-puzzles/tree/main/2-mid-prizes/arweave-puzzle-10-500ar
- README (raw): https://raw.githubusercontent.com/floflo777/open-crypto-puzzles/main/2-mid-prizes/arweave-puzzle-10-500ar/README.md
> Tiamat's twelve weave puzzles from 2019 and 2020 with prizes in AR and ETH and DAI. Nine claimed. Three still open including over 1500 AR.
Tiamat published a series of puzzles on Arweave itself. Every titled page says Puzzle Weave and a number. Hence the key `weave` and ids like `weave/3`. Arweave is the address, not the name. Each puzzle is a transaction with instructions and a funded wallet. A few live on Ethereum for variety. The prizes were AR for the most part, plus a few ETH and one 100 DAI bounty. That bounty is why `currency` exists as a field.
puzzle.prize(); // 100
puzzle.prizeCurrency(); // "DAI", not ETH
An Arweave address is a `standard` address. There are no script kinds to pick from, and the library has no key to address derivation for the chain, so an Arweave record never verifies. It doesn't have to. None of the solvers published a key. The outcomes are `claimed`, the wallet was emptied, and the record stops where the knowledge stops. The Ethereum records in the collection are the same shape with `chain: "ethereum"`.
  address: "wHP6OPG5GMF5dedo_CD8AAy6x8La-gfI5b5pk65Tx_0",
  prize: 1000.165838006237,
Three funding transactions make the 1000 AR bounty. Then strangers kept tipping the wallet, from December 2021 to September 2025. A few sent hundredths of an AR, most a lot less. Who sends dust to an open puzzle? Nobody says. The record lists every tip anyway, because the prize is what the wallet holds, not what the author promised. `weave/10` and `weave/12` got the same treatment.
- files=1, data-files=0, log=False

## arweave-puzzle-11-1eth
# Arweave Puzzle #11
- РџСЂРёРјРµС‡Р°РЅРёРµ: 1 ETH, address held as a plain EOA, never spent from since funding
- РћРїСѓР±Р»РёРєРѕРІР°РЅРѕ: 2020-04-22 https://twitter.com/arweavep/status/1252961944807641090
- the target format (raw private key, not a mnemonic) and the decoy (the address printed in the file's tEXt chunk) are both confirmed; close to 1,000 direct encodings of the measured geometry and the metadata anomaly have been tested, all negative; the exact pixel-level encoding is not yet known and no certified oracle exists to test one against, so the missing piece is either an unrecovered insight into the encoding or the never-delivered author hint
- `0xFF2142E98E09b5344994F9bEB9C56C95506B9F17` вЂ” main | expected: 1 ETH | state: funded-unspent (checked 2026-08-16) | https://etherscan.io/address/0xFF2142E98E09b5344994F9bEB9C56C95506B9F17
- 2020-04-22 вЂ” Tiamat, original announcement вЂ” https://twitter.com/arweavep/status/1252961944807641090
- 2021-08-23 вЂ” Tiamat, the $100 hint reply вЂ” https://twitter.com/arweavep/status/1429846914028158977
- Folder: https://github.com/floflo777/open-crypto-puzzles/tree/main/2-mid-prizes/arweave-puzzle-11-1eth
- README (raw): https://raw.githubusercontent.com/floflo777/open-crypto-puzzles/main/2-mid-prizes/arweave-puzzle-11-1eth/README.md
> Tiamat's twelve weave puzzles from 2019 and 2020 with prizes in AR and ETH and DAI. Nine claimed. Three still open including over 1500 AR.
Tiamat published a series of puzzles on Arweave itself. Every titled page says Puzzle Weave and a number. Hence the key `weave` and ids like `weave/3`. Arweave is the address, not the name. Each puzzle is a transaction with instructions and a funded wallet. A few live on Ethereum for variety. The prizes were AR for the most part, plus a few ETH and one 100 DAI bounty. That bounty is why `currency` exists as a field.
puzzle.prize(); // 100
puzzle.prizeCurrency(); // "DAI", not ETH
An Arweave address is a `standard` address. There are no script kinds to pick from, and the library has no key to address derivation for the chain, so an Arweave record never verifies. It doesn't have to. None of the solvers published a key. The outcomes are `claimed`, the wallet was emptied, and the record stops where the knowledge stops. The Ethereum records in the collection are the same shape with `chain: "ethereum"`.
- files=10, data-files=4, log=True

## arweave-puzzle-12-400ar
# Arweave Puzzle Weave #12
- РћРїСѓР±Р»РёРєРѕРІР°РЅРѕ: 2020-05-05 https://twitter.com/arweavep/status/1257613928185675776
- `XRGEfkMbCMHeTY9mZI9Lh6hf8EmA8RstmBFUjDm40fg` вЂ” main | expected: 400.00248121 AR | state: funded-unspent (checked 2026-08-16) | https://viewblock.io/arweave/address/XRGEfkMbCMHeTY9mZI9Lh6hf8EmA8RstmBFUjDm40fg
- 2020-05-05 вЂ” "Puzzle 12 is here" вЂ” https://twitter.com/arweavep/status/1257613928185675776
- 2020-05-23 вЂ” "58 chars CS" вЂ” https://twitter.com/arweavep/status/1264211142714499072
- 2020-04-14 вЂ” "1,2,4,8 = solved / 3,5,7,9 = not solved yet" вЂ” https://twitter.com/arweavep/status/1250036746802298885
- 2026-08-16 вЂ” Escrow wallet, viewblock.io вЂ” https://viewblock.io/arweave/address/XRGEfkMbCMHeTY9mZI9Lh6hf8EmA8RstmBFUjDm40fg
- Folder: https://github.com/floflo777/open-crypto-puzzles/tree/main/2-mid-prizes/arweave-puzzle-12-400ar
- README (raw): https://raw.githubusercontent.com/floflo777/open-crypto-puzzles/main/2-mid-prizes/arweave-puzzle-12-400ar/README.md
  - X: https://twitter.com/arweavep/status/1257613928185675776 (05.05.2020, В«Puzzle 12 is hereВ»)
  - X: https://twitter.com/arweavep/status/1264211142714499072 (В«58 chars CSВ»)
  - X: https://twitter.com/arweavep/status/1250036746802298885 (В«1,2,4,8 = solved / 3,5,7,9 = not solvedВ»)
  - OCP: https://github.com/floflo777/open-crypto-puzzles/tree/main/2-mid-prizes/arweave-puzzle-12-400ar
  - Explorer: https://viewblock.io/arweave/address/XRGEfkMbCMHeTY9mZI9Lh6hf8EmA8RstmBFUjDm40fg
- files=1, data-files=0, log=False

## arweave-puzzle-3-1000ar
# Arweave Puzzle #3
- РћРїСѓР±Р»РёРєРѕРІР°РЅРѕ: 2019-05-27 https://twitter.com/arweavep/status/1132936723162378240
- Exact-address oracle and original-page controls pass. Historical searches lack per-run witnesses and do not prove the number of wrong image readings. Dated ecosystem sources and visual interpretation remain unresolved.
- `wHP6OPG5GMF5dedo_CD8AAy6x8La-gfI5b5pk65Tx_0` вЂ” main | expected: 1000.165838006237 AR | state: funded-unspent (checked 2026-09-04) | https://viewblock.io/arweave/address/wHP6OPG5GMF5dedo_CD8AAy6x8La-gfI5b5pk65Tx_0
- 2019-05-27 вЂ” Puzzle Weave 3 announcement вЂ” https://twitter.com/arweavep/status/1132936723162378240
- 2019-09-26 вЂ” "With N.1.7.0.0 release, third pic became obsolete" вЂ” https://twitter.com/arweavep/status/1177235139035836417
- 2019-07-21 вЂ” "Did anybody count the dots?" вЂ” https://twitter.com/arweavep/status/1152887601529073665
- 2020-03-04 вЂ” "The list of unsolved Arweave puzzles ordered by difficulty probably looks like: 3, 9, 8, 5, 7" вЂ” https://twitter.com/arweavep/status/1235199397371277315
- 2026-08-16 вЂ” Escrow wallet, viewblock.io вЂ” https://viewblock.io/arweave/address/wHP6OPG5GMF5dedo_CD8AAy6x8La-gfI5b5pk65Tx_0
- Folder: https://github.com/floflo777/open-crypto-puzzles/tree/main/2-mid-prizes/arweave-puzzle-3-1000ar
- README (raw): https://raw.githubusercontent.com/floflo777/open-crypto-puzzles/main/2-mid-prizes/arweave-puzzle-3-1000ar/README.md
- **РСЃС‚РѕС‡РЅРёРєРё**: OCP `2-mid-prizes/arweave-puzzle-3-1000ar`; СЃС‚СЂР°РЅРёС†Р° arweave.net/VLJIGuTJвЂ¦ (32 РїРѕР»СЏ РїРѕ 1 СЃРёРјРІРѕР»Сѓ = 8Г—4); Discord-СЌРєСЃРїРѕСЂС‚/Medium/tiamat РІ `$W/arweave/src/`; РѕС‚РІРµС‚С‹ Р°РІС‚РѕСЂР° РІ С‚СЂРµРґРµ С‚РІРёС‚Р° 1132936723162378240 (Р°СЂС…РёРІ 2022).
> Tiamat's twelve weave puzzles from 2019 and 2020 with prizes in AR and ETH and DAI. Nine claimed. Three still open including over 1500 AR.
Tiamat published a series of puzzles on Arweave itself. Every titled page says Puzzle Weave and a number. Hence the key `weave` and ids like `weave/3`. Arweave is the address, not the name. Each puzzle is a transaction with instructions and a funded wallet. A few live on Ethereum for variety. The prizes were AR for the most part, plus a few ETH and one 100 DAI bounty. That bounty is why `currency` exists as a field.
- files=1, data-files=0, log=False

## ballet-bobby-lee-2btc-cards
# Ballet / Bobby Lee: Take Bobby's Bitcoin
- РџСЂРёРјРµС‡Р°РЅРёРµ: two independent cards, 1.00003481 BTC (AA009926) and 1.00003877 BTC (AA012381); a third card, AA007448, was solved and swept by a third party in 2020 and is not part of the live prize
- РћРїСѓР±Р»РёРєРѕРІР°РЅРѕ: 2020-07-24 https://x.com/bobbyclee/status/1289004702122643456
- `1JxWyNrkgYvgsHu8hVQZqTXEB9RftRGP5m` вЂ” AA009926 | expected: 100003481 sats | state: funded-unspent (checked 2026-08-16) | https://mempool.space/address/1JxWyNrkgYvgsHu8hVQZqTXEB9RftRGP5m
- `1QGtbKxx6FKDD66LwnrzHCAHmyZ7mDHqC4` вЂ” AA012381 | expected: 100003877 sats | state: funded-unspent (checked 2026-08-16) | https://mempool.space/address/1QGtbKxx6FKDD66LwnrzHCAHmyZ7mDHqC4
- `1LL6Xy92LwGDRfQP9fBU7f1477cEKctr7c` вЂ” AA007448 (oracle, solved by a third party in 2020, not part of the live prize) | expected: n/a | state: swept (checked 2026-08-16) | https://mempool.space/address/1LL6Xy92LwGDRfQP9fBU7f1477cEKctr7c
- 2020-07-24 вЂ” Bobby Lee, challenge announcement вЂ” https://x.com/bobbyclee/status/1289004702122643456
- 2026-08-16 вЂ” oritwoen/boha, community data mirror (addresses, encrypted WIFs, passphrases, card photographs) вЂ” https://github.com/oritwoen/boha
- Folder: https://github.com/floflo777/open-crypto-puzzles/tree/main/1-big-prizes/ballet-bobby-lee-2btc-cards
- README (raw): https://raw.githubusercontent.com/floflo777/open-crypto-puzzles/main/1-big-prizes/ballet-bobby-lee-2btc-cards/README.md
-utenant: Escrow addresses in mempool: 1JxWyNrkgYvgsHu8hVQZqTXEB9RftRGP5m Рё 1QGtbKxx6FKDD66LwnrzHCAHmyZ7mDHqC4.
- `address`: "1LL6Xy92LwGDRfQP9fBU7f1477cEKctr7c"
- `sourceUrl`: "https://x.com/bobbyclee/status/1289004702122643456"
- `status`: Status.Solved
- files=1, data-files=0, log=False

## bam-askabitcoiner-seed-cipher
# BAM x AskABitcoiner 42k Seed Cipher
- `3Q1Qzs6EmTVE4JeUWRJVNxi9v5UJLN2mtc` вЂ” None | expected: None | state: swept (checked 2026-08-16) | https://mempool.space/address/3Q1Qzs6EmTVE4JeUWRJVNxi9v5UJLN2mtc
- `status`: **dead-end** (dead-end: swept-by-third-party)
- `prize`: 42100 sats (РѕС†РµРЅРєР° $27 РЅР° 2026-08-16)
  - https://mempool.space/address/3Q1Qzs6EmTVE4JeUWRJVNxi9v5UJLN2mtc
- files=1, data-files=0, log=False

## bc1q21-timelock-challenge-l5-100ksats
# bc1q21 Time-Lock Challenge, Level 5
- `37xcRXcYRht9VZJeLYWegDRC2fjX5XVnAp` вЂ” P2SH CLTV time lock holding the prize | expected: 100,000 sats, funded 2026-07-03 | state: swept (checked 2026-08-16) | https://mempool.space/address/37xcRXcYRht9VZJeLYWegDRC2fjX5XVnAp
- `bc1q3pwpgp7dkhtzj6qya39l8tu6dgdarv9gr9kx0r` вЂ” funding-oracle address, BIP84 m/84'/0'/0'/0/0 of the recovery phrase | expected: 101,750 sats total received | state: swept (checked 2026-08-16) | https://mempool.space/address/bc1q3pwpgp7dkhtzj6qya39l8tu6dgdarv9gr9kx0r
- `status`: **solved**
- `prize`: 100000 sats (РѕС†РµРЅРєР° $63 РЅР° 2026-08-16) вЂ” 100,000 sats locked in the P2SH time lock; I received 99,604 sats after the 396 sat network fee
- `target_format`: BIP39 12 words, English, BIP84 m/84'/0'/0'/0/0 for the funding-oracle address; the prize itself sits behind a P2SH CLTV script spent with a key at m/44'/0'/0'/0/0, no passphrase
- `37xcRXcYRht9VZJeLYWegDRC2fjX5XVnAp` вЂ” contract | P2SH CLTV time lock holding the prize | РѕР¶РёРґР°РµС‚СЃСЏ: 100,000 sats, funded 2026-07-03 | РїСЂРѕРІРµСЂРµРЅРѕ 2026-08-16: **swept**
  - https://mempool.space/address/37xcRXcYRht9VZJeLYWegDRC2fjX5XVnAp
- `bc1q3pwpgp7dkhtzj6qya39l8tu6dgdarv9gr9kx0r` вЂ” escrow | funding-oracle address, BIP84 m/84'/0'/0'/0/0 of the recovery phrase | РѕР¶РёРґР°РµС‚СЃСЏ: 101,750 sats total received | РїСЂРѕРІРµСЂРµРЅРѕ 2026-08-16: **swept**
  - https://mempool.space/address/bc1q3pwpgp7dkhtzj6qya39l8tu6dgdarv9gr9kx0r
- assemble 12 BIP39 words from 12 daily riddle clues under a wordlist-constrained reading (the operator substitutes the closest BIP39 word when the natural English word is not in the list); validate against the funding-oracle address; separately reconstruct the CLTV redeem script by hashing candidate (derivation path, midnight-UTC locktime) pairs and comparing the result to the P2SH address
- СЃРІРµСЂРµРЅРѕ СЃ: the official BIP84 test vector, and the solved mnemonic itself, which reproduces the funding-oracle address exactly
- files=1, data-files=0, log=False

## bitaddress-bip38-giveaway-0-005297btc
# bitaddress.org BIP38 giveaway
- РџСЂРѕРІРµСЂРєР° Р±Р°Р»Р°РЅСЃР°: https://mempool.space/address/1J7BVeP8JK4op2X3GN3Hy7xkTnGnQTMpou
- РњРµС…Р°РЅРёР·Рј: BIP38-С€РёС„СЂРѕРІР°РЅРёРµ РїСЂРёРІР°С‚РЅРѕРіРѕ РєР»СЋС‡Р°, СЃРіРµРЅРµСЂРёСЂРѕРІР°РЅРЅРѕРіРѕ РЅР° bitaddress.org.
    РєР°СЂС‚РёРЅРєСѓ-Р±СѓРјР°Р¶РЅС‹Р№ РєРѕС€РµР»С‘Рє bitaddress.org, **BIP38-Р·Р°С€РёС„СЂРѕРІР°РЅРЅС‹Р№ WIF** Рё Р°РґСЂРµСЃ, РїР°СЂРѕР»СЊРЅСѓСЋ С„СЂР°Р·Сѓ Рє РєРѕС‚РѕСЂРѕРјСѓ РѕРЅ Р·Р°Р±С‹Р»,
  - https://puzzles.agntn.dev/collections/bitaddress
РџРµСЂРµРЅРµСЃРµРЅРѕ РёР· СЂРµРµСЃС‚СЂР° [@agntn/puzzles](https://puzzles.agntn.dev/collections/bitaddress) (raw: https://puzzles.agntn.dev/collections/bitaddress.md). РќРёР¶Рµ вЂ” СЂР°Р·Р±РѕСЂ РїРµСЂРІРѕРёСЃС‚РѕС‡РЅРёРєР°: РјРµС…Р°РЅРёРєР°, РєС‚Рѕ СЂРµС€Р°Р», С‡С‚Рѕ РїСЂРѕРІРµСЂРµРЅРѕ.
- `id`: "bitaddress"
- `address`: "1J7BVeP8JK4op2X3GN3Hy7xkTnGnQTMpou"
- `prize`: 0.005297
> A bitaddress.org paper wallet whose owner forgot the BIP38 passphrase and gave the coins to whoever guesses it. Posted on Stacker News in October 2023 and still locked
October 6, 2023, 11:50 UTC. q [posts on Stacker News](https://stacker.news/items/275973) and the pitch is beautifully simple. Some years ago I made a paper wallet with a BIP38 passphrase. I don't remember the passphrase. Brute force it and the coins are yours. Then the encrypted key, the address, and where the passphrase should be, one honest line: `<find out>`.
Not much, and that's the puzzle. The post and q's replies under it give <dataset-count of="hints" puzzle="bitaddress">
- The wallet came from bitaddress.org.
One free check though. The payload carries the first 4 bytes of the address's double SHA-256, and they match `1J7BVeвЂ¦`. So the key and the address on the paper really belong together. Worth knowing before you set a GPU on fire.
- files=12, data-files=7, log=True

## bitaps-shamir-challenge-1btc
# Bitaps Shamir Secret Sharing Challenge
- residual entropy is about 125 bits after every constraint I could establish (duplicate-value coefficient rejection plus a real defect in the deployed 2020 generator's entropy check); no third Shamir share has surfaced in the public record, including same-day Reddit and Telegram copies, the 2020-07-04 Common Crawl body, archive.today, live mirrors, and 13 GitHub forks of mnemonic-offline-tool; the published zpub is a BIP84 account key and its 0/0 child is the escrow; what would close this is that missing share, or a disclosed constraint on it, not compute
- `bc1qyjwa0tf0en4x09magpuwmt2smpsrlaxwn85lh6` вЂ” main | expected: 1.00016775 BTC (100,016,775 sats) | state: funded-unspent (checked 2026-08-28) | https://mempool.space/address/bc1qyjwa0tf0en4x09magpuwmt2smpsrlaxwn85lh6
- 2020-06-19 вЂ” Bitaps announcement вЂ” https://x.com/bitaps_com/status/1274018817304379394
- 2026-08-28 вЂ” mempool.space, escrow address вЂ” https://mempool.space/address/bc1qyjwa0tf0en4x09magpuwmt2smpsrlaxwn85lh6
- Folder: https://github.com/floflo777/open-crypto-puzzles/tree/main/1-big-prizes/bitaps-shamir-challenge-1btc
- README (raw): https://raw.githubusercontent.com/floflo777/open-crypto-puzzles/main/1-big-prizes/bitaps-shamir-challenge-1btc/README.md
  - OCP `1-big-prizes/bitaps-shamir-challenge-1btc`; РЅР° GitHub Р±РѕР»СЊС€Рµ 40 issues (2026) СЃ С‚РµРј Р¶Рµ РІС‹РІРѕРґРѕРј.
- `address`: "bc1qyjwa0tf0en4x09magpuwmt2smpsrlaxwn85lh6"
- `prize`: 1.00016775
> One SegWit address behind a 3 of 5 Shamir secret sharing scheme. Two shares and the extended public key are published. One bitcoin and change since 2020.
Bitaps split a mnemonic into five shares with a threshold of three. They published two of them and the account's zpub, and put a bitcoin on the first receiving address. Three shares recover the seed. Two don't, by construction. So the challenge is a statement about the scheme as much as a bounty: you can't get there from what's public.
  address: "bc1qyjwa0tf0en4x09magpuwmt2smpsrlaxwn85lh6",
  prize: 1.00016775,
- files=1, data-files=0, log=False

## bitcoin-coders-puzzle-07-21ksats
# Bitcoin Coders Puzzle 07
- РџСЂРѕРІРµСЂРєР° Р±Р°Р»Р°РЅСЃР°: https://mempool.space/address/bc1qj7xsxrlgmnnrqwvlakacc5yrh33h2n3xaa0m09
  - https://blockchain.info/q/addressbalance/bc1qj7xsxrlgmnnrqwvlakacc5yrh33h2n3xaa0m09
- files=5, data-files=2, log=True

## bitcoin-movie-enigma-100ksats
# Bitcoin Movie Enigma
- `bc1q94ecsn0qk8lap2gefrycnms3ruepy889z969a6` вЂ” main | expected: 100000 sats prize, now swept by confirmed payout | state: swept (checked 2026-09-07) | https://mempool.space/address/bc1q94ecsn0qk8lap2gefrycnms3ruepy889z969a6
- `address`: "bc1q94ecsn0qk8lap2gefrycnms3ruepy889z969a6"
- `status`: Status.Solved
- `prize`: 0.001
> 34 film stills, each title turned into a BIP39 word, ten intruders to drop. 100,000 sats on a SegWit address since April 2022, claimed in September 2026 with a phrase whose checksum fails.
klems posted 34 movie frames on X in April 2022 and put 100,000 sats on a native SegWit address the same day. The platforms compressed the frames badly, so the puzzle got a small site of its own and a relaunch on Nostr in January 2024. The rules: name every film, turn each title into an English BIP39 word "somehow", and drop the ten intruders, films that don't belong in the sequence, using what IMDb says about each. The 24 words left, in panel order, restore the wallet.
  address: "bc1q94ecsn0qk8lap2gefrycnms3ruepy889z969a6",
  status: Status.Solved,
  prize: 0.001,
    addresses: ["35h2x1Rqq3HmV1NX4KQAGZoz8Vmf42ktQT"],
The phrase fails the BIP39 checksum. Its last word encodes 47 where the entropy calls for 119, so a wallet that validates before deriving refuses it, and every sweep that filtered candidates on the checksum threw the answer away. The seed is PBKDF2 over the words, so derivation doesn't care: `m/84'/0'/0'/0/0` gives the funded address and the compressed key the claim spent with. `verify()` derives it the same way and says `verified`. That's the one place the checksum matters in this library, and it doesn't.
## Status
- `status`: **solved**
- files=1, data-files=0, log=False

## bitcoin-treasure-hunt-book-series
# Bitcoin Treasure-Hunt Book Series
- files=1, data-files=0, log=False

## bitimage-kitten-photo-puzzle-95ksats
# Bitimage (Kitten Photo Puzzle)
  - https://corey-lyle-phillips.medium.com/part-1-3-turn-your-photos-into-bitcoin-private-keys-addresses-57669771cf7a
  - https://twitter.com/aantonop/status/603701870482300928
- `address`: "bc1q57euh23y3qs2f9d5mtwpax5lqecfvrdkqce82a"
- `status`: Status.Solved
- `prize`: 0.00095133
Corey Phillips wrote a three part series on turning a photo into a private key. Hash the image bytes, use the hash as BIP39 entropy, derive along `m/84'/0'/0'/0/0`. Then he funded two addresses from two images and posted them. The first image was Andreas Antonopoulos's kitten tweet. Solved in six days. The second adds a BIP39 passphrase on top of the image hash, and it's still open.
  address: "bc1q57euh23y3qs2f9d5mtwpax5lqecfvrdkqce82a",
  status: Status.Solved,
      "https://twitter.com/aantonop/status/603701870482300928",
  prize: 0.00095133,
    sourceUrl: "https://twitter.com/aantonop/status/603701870482300928",
## Status
- files=1, data-files=0, log=False

## blm-brave-new-world-0-2btc
# BLM Collage: Welcome to the Brave New World
- `1KfZGvwZxsvSmemoCmEV75uqcNzYBHjkHZ` вЂ” main | expected: 20107284 sats | state: funded-unspent (checked 2026-08-16) | https://mempool.space/address/1KfZGvwZxsvSmemoCmEV75uqcNzYBHjkHZ
- Folder: https://github.com/floflo777/open-crypto-puzzles/tree/main/1-big-prizes/blm-brave-new-world-0-2btc
- README (raw): https://raw.githubusercontent.com/floflo777/open-crypto-puzzles/main/1-big-prizes/blm-brave-new-world-0-2btc/README.md
  - OCP: https://github.com/floflo777/open-crypto-puzzles/tree/main/1-big-prizes/blm-brave-new-world-0-2btc (РєРѕРїРёСЏ `/workspace/work/blm/ocp/`: README, analysis/tested.md, leads.md, clues/*.png, tools/oracle.py).
- `address`: "1KfZGvwZxsvSmemoCmEV75uqcNzYBHjkHZ"
- `prize`: 0.20107284
> A picture puzzle one Reddit account posted to its own profile in October 2020, with 0.2 BTC on the address written into it. Six years later the coins are still there.
October 8, 2020, 09:25 UTC. A Reddit account called stsh_n [posts to its own profile](https://www.reddit.com/user/stsh_n/comments/j79zvj/bitcoin_puzzle_2000/). Title: "Bitcoin puzzle (2000$)". Body: one picture. No rules, no hint, no "good luck". The address in the picture holds **0.2 BTC**, roughly the two grand from the title at the time. And it had been sitting there since May.
Then the year itself. George Floyd with "05.25.20" and "I can't BREATHE". Black Lives Matter slogans. Surveillance cameras. A statue with a bag over its head. The pyramid from the dollar bill. A clock face. Trump and Biden nose to nose over "11.03.20", a big red question mark between them. The Statue of Liberty holds a tablet that says BLM, with "1865-202вЂ¦?" next to her and "ONLY real BITCOIN" on the pedestal.
The address? Rotated, up the left edge: `1KfZGvwZxsvSmemoCmEV75uqcNzYBHjkHZ`. Easy to miss the first time.
Because of that tablet and the slogans. [floflo777's open-crypto-puzzles](https://github.com/floflo777/open-crypto-puzzles/tree/main/1-big-prizes/blm-brave-new-world-0-2btc) files it as BLM, for example. The key here goes with what the picture calls itself.
After that, silence. Until strangers started tipping it. 1000 sat in October 2023, 100,000 in December 2024, then 557 and 5727 in 2025. Tiny, but somebody still cares. The address has received 20,107,284 sat in total and spent exactly zero.
  address: "1KfZGvwZxsvSmemoCmEV75uqcNzYBHjkHZ",
- files=14, data-files=11, log=True

## book-quiz-7-million
# 7 million book quiz
- РћРїРёСЃР°РЅРёРµ: AoiNakamoto's second quiz, seven answers hashed into BIP39 entropy, four of them opinions and a sixty minute deadline. The prize went home and the answer key came out afterwards
- `address`: "1PLa3c2xjtoP6YE1FvaLhsf4akSxvdv3Ta"
- `status`: Status.Expired
- `prize`: 0.07
> AoiNakamoto's second quiz, seven answers hashed into BIP39 entropy, four of them opinions and a sixty minute deadline. The prize went home and the answer key came out afterwards
The recipe is the one from the day before: paste the correct answer sentences together with one space between them, SHA-256 that, feed the hex to a brain wallet tool as entropy, and the prize sits at the first address of the wallet that comes out.
The book is never named. "Which book? You know already, if you are reading this." Universal basic income, a value added tax, Humanity First, robots taking the jobs, and one of the wrong titles is "Normal Strikes Back": it is Andrew Yang's *The War on Normal People*. The record keeps the thread and leaves that identification here, on a page you can argue with.
  address: "1PLa3c2xjtoP6YE1FvaLhsf4akSxvdv3Ta",
  status: Status.Expired,
  prize: 0.07,
`expired` is the status for a prize the author took back, the same one the two unclaimed [WarpWallet challenges](https://puzzles.agntn.dev/collections/warp) carry. The spend is a `decrease`, an author withdrawal, not a `claim`, because nobody collected anything: 0.06978813 BTC to the author's own P2SH address, 21,187 satoshis to the miner.
## Where the address comes from
### The post has no address, the comments do
- files=1, data-files=0, log=False

## cardano-13373665-challenge
# Cardano В«13373665 ChallengeВ» (eggdropper / MintMatrix)
- **РђРґСЂРµСЃ/СЃРµС‚СЊ**: Cardano, Ch6 enterprise-Р°РґСЂРµСЃ `addr1v9ht7vedвЂ¦` (РїРѕР»РЅС‹Р№ Р°РґСЂРµСЃ РІ NOTES РЅРµ Р·Р°РїРёСЃР°РЅ; РЅР°Р№С‚Рё РІ СЂРµРїРѕ РёР»Рё С‡РµСЂРµР· koios). **Р‘Р°Р»Р°РЅСЃ**: 3 UTxO, РІСЃРµРіРѕ 12,789241 ADA + 4011 egg (koios address_info 13.10.2026). Р’СЃРµ РїСЂРёС€Р»Рё СЃ РґРѕРЅР°С‚-Р°РґСЂРµСЃР° addr1q80dp67вЂ¦, РјРµС‚Р°РґР°РЅРЅС‹С… РЅРµС‚.
- files=5, data-files=3, log=True

## cicada-3301
# Cicada 3301
- files=1, data-files=0, log=False

## cicada-3372
# Cicada 3372 (2017)
- files=1, data-files=0, log=False

## coin-artist-torched-h34r7s
# TORCHED H34R7S Bitcoin Puzzle
Yes, with an **uncompressed public key**. Use compressed serialization and you'll get a different address. Same private scalar, wrong wallet. That's an easy detail to miss when checking an old Bitcoin puzzle with current defaults.
The second command checks the recorded key against the address locally. No explorer or account needed.
## 4.87 BTC prize, almost 5 BTC claimed
Those numbers describe different things. **4.87 BTC** is the advertised prize. The [claim transaction](https://blockstream.info/tx/cb0156faa1716186b96f7e668a59204061a3419a746810ce151052d2860ac7cf) spent 5.001337 BTC and paid **4.99676152 BTC** after fees. It was confirmed on February 1, 2018 at 15:09:42 UTC.
The record keeps the advertised prize separate from the claim amount: 5.001337 BTC spent from the target before fees. Its `solvedAt` is that confirmation time, not a claim to know when someone finished decoding the painting. Later dust deposits and sweeps don't rewrite the original result.
- files=1, data-files=0, log=False

## coin-games-weekly-banknote-puzzles
# Coin_Games weekly banknote puzzles
- РћРїРёСЃР°РЅРёРµ: Coin_Pro drew Bitcoin puzzles as banknotes in late 2017 and promised a bigger prize every week. Every funded prize got emptied and nobody said how
> Coin_Pro drew Bitcoin puzzles as banknotes in late 2017 and promised a bigger prize every week. Every funded prize got emptied and nobody said how
December 4, 2017. A post on r/bitcoinpuzzles asks whether the subreddit is coming back to life. [New Weekly Bitcoin Puzzles!](https://www.reddit.com/r/bitcoinpuzzles/comments/7hfbar/new_weekly_bitcoin_puzzles_is_it_the_resurrection/) Three images, three addresses, three tiny prizes. 2,020 sats, then 3,301, then 6,661. The makers? "Coin_Pro and Valhalla Games Unlimited."
Tiny, yes. One commenter said it out loud: "the prize is so small there's no real reason to be secretive". Fair point. Did anyone listen?
## Who emptied the Coin_Games prizes?
The prize left on December 14, 2017, at 08:13:31 UTC. The site posted the same day: "Prize amount claimed. Blockchain Error? Investigating..." The [claim](https://mempool.space/tx/1e2e0f017c15946f44d7f6f19e359fd6aa6c655353c8e094cb431d28de2376c7) is a strange one. It swept the 2,020 sats together with three other inputs and paid 195,995 sats in fees to send 170,599 on. Nearly a hundred times the prize, burned on the way out. The home page still reads "Solved! (Or stolen?)". Good question, honestly.
The home page's last update is dated January 6, 2018. Both remaining puzzles say "Active" there to this day. The chain says otherwise. Week 3 was emptied on [March 5, 2018](https://mempool.space/tx/b028604b1a8f159c95d9939853ff88073093b432700833004f720a505455379d), week 2 on [August 19, 2018](https://mempool.space/tx/d5efdb6e62e85f3d603c37d4e3ded82cddbb7e71f8a7d36c9848caa7f9a99157). No post, no write-up, no key. So all three records say `claimed`, with the spend and the address the coins went to.
The site dates the puzzles November 19, November 26 and December 3. The chain disagrees. Weeks 1 and 3 were funded in the same block, 495180, on November 20 at 04:37:55 UTC. Week 2 followed one block later. So the "weekly" prizes were all on the table from day one. `startedAt` keeps the dates the site gives weeks 2 and 3, and `preGenesis` says the coins got there first.
On the home page, without addresses. #4 is "UNKNOWN Account" at .00013371 BTC. #5 adds 7.771 OHM to .00007771 BTC, #6 adds 17,771 OACoin to .00017771 BTC. #7 says "Funding Unsuccessful". The pages of #4 to #6 show a picture and a price, nothing more.
No address, no record. If one turns up, the week gets its number back.
The thread came from u/3301J, who wrote it like a fan tip: "they are doing weekly prizes". Yet 3301J answered the one question in the comments with the Discord invite the home page links. In 2019 the same account offered an indie RPG called Holy Order for sale. The home page teases "The Holy Order : Comming 2018". Same person? Maybe. No single source says so, so the record keeps the two names apart.
- files=1, data-files=0, log=False

## commander-u-puzzle-8-5btc
# Commander U Riddle for 8.5 BTC
- РџСЂРёРјРµС‡Р°РЅРёРµ: 8.5 BTC of this sits in a 2010 P2PK output, which mempool.space's address API does not index; it shows only the 99,081 sats held in 8 separate P2PKH outputs at the same address. Both readings are correct for what each indexer counts; the full total is spendable by the one private key that controls both, since the P2PKH outputs derive from the same uncompressed public key exposed by the P2PK output
- `1KDUcZh5Z6H1of4Pwoy5ojJtkQxcQBHhnH` вЂ” the announced prize address | expected: 8.50099081 BTC (850,000,000 sats P2PK, not shown by mempool.space; 99,081 sats P2PKH, shown) | state: funded-unspent (checked 2026-08-16) | https://mempool.space/address/1KDUcZh5Z6H1of4Pwoy5ojJtkQxcQBHhnH
- `status`: **dead-end** (dead-end: suspected-fake)
- `prize`: 8.50099081 BTC (РѕС†РµРЅРєР° $535562 РЅР° 2026-08-16) вЂ” 8.5 BTC of this sits in a 2010 P2PK output, which mempool.space's address API does not index; it shows only the 99,081 sats held in 8 separate P2PKH outputs at the same address. Both readings are correct for what each indexer counts; the full total is spendable by the one private key that controls both, since the P2PKH outputs derive from the same uncompressed public key exposed by the P2PK output
- `target_format`: 51-character uncompressed mainnet WIF (6 concatenated base58 fragments, lengths 9, 8, 9, 9, 8, 8), matching P2PKH address 1KDUcZh5Z6H1of4Pwoy5ojJtkQxcQBHhnH and uncompressed public key 041ebfac69910efb17ab697db5f2a4ff815e1d37c05e40d56977031a3a36b80464ea6782ad2913e2a5ec33e187f0fee50675bc78a25d657846e08e8425f2384b2a
- `1KDUcZh5Z6H1of4Pwoy5ojJtkQxcQBHhnH` вЂ” escrow | the announced prize address | РѕР¶РёРґР°РµС‚СЃСЏ: 8.50099081 BTC (850,000,000 sats P2PK, not shown by mempool.space; 99,081 sats P2PKH, shown) | РїСЂРѕРІРµСЂРµРЅРѕ 2026-08-16: **funded-unspent**
  - https://mempool.space/address/1KDUcZh5Z6H1of4Pwoy5ojJtkQxcQBHhnH
- files=1, data-files=0, log=False

## corey-phillips-kitten-passphrase-1msats
# Corey Phillips: Kitten Passphrase Puzzle
- РћРїСѓР±Р»РёРєРѕРІР°РЅРѕ: 2019-07-09 https://corey-lyle-phillips.medium.com/part-1-3-turn-your-photos-into-bitcoin-private-keys-addresses-57669771cf7a
- `bc1qcyrndzgy036f6ax370g8zyvlw86ulawgt0246r` вЂ” main | expected: 1001900 sats | state: funded-unspent (checked 2026-08-16) | https://mempool.space/address/bc1qcyrndzgy036f6ax370g8zyvlw86ulawgt0246r
- `bc1q57euh23y3qs2f9d5mtwpax5lqecfvrdkqce82a` вЂ” sister (empty passphrase, oracle calibration only, not a target) | expected: n/a, not a prize address | state: swept (checked 2026-08-16) | https://mempool.space/address/bc1q57euh23y3qs2f9d5mtwpax5lqecfvrdkqce82a
- 2019-07-09 вЂ” Part 1/3: Turn Your Photos Into Bitcoin Private Keys/Addresses вЂ” https://corey-lyle-phillips.medium.com/part-1-3-turn-your-photos-into-bitcoin-private-keys-addresses-57669771cf7a
- Folder: https://github.com/floflo777/open-crypto-puzzles/tree/main/2-mid-prizes/corey-phillips-kitten-passphrase-1msats
- README (raw): https://raw.githubusercontent.com/floflo777/open-crypto-puzzles/main/2-mid-prizes/corey-phillips-kitten-passphrase-1msats/README.md
- **РСЃС‚РѕС‡РЅРёРєРё**: Medium 09.07.2019 В«Part 1/3: Turn Your Photos Into Bitcoin Private Keys/AddressesВ» https://corey-lyle-phillips.medium.com/part-1-3-turn-your-photos-into-bitcoin-private-keys-addresses-57669771cf7a ; РєРѕРґ https://github.com/coreyphillips/bitimage ; Р°СѓРґРёРѕ-РїР°Р·Р» Р°РІС‚РѕСЂР° (СЂРµС€С‘РЅ) https://corey-lyle-phillips.medium.com/a-bitcoin-audio-puzzle-61174b9849ce ; С…РёРЅС‚-СЂРµРїРѕ СЃРѕРѕР±С‰РµСЃС‚РІР° https://github.com/Schum-io/BTC-Puzzle-by-Corey-Phillips ; OCP `/workspace/work/open-crypto-puzzles/2-mid-prizes/corey-phillips-kitten-passphrase-1msats/`.
- `status`: **open**
- `prize`: 1001900 sats (РѕС†РµРЅРєР° $631 РЅР° 2026-08-16) вЂ” 2 funding UTXOs summing to 1,001,900 sats, 0 spent as of 2026-08-16
- `published`: 2019-07-09 https://corey-lyle-phillips.medium.com/part-1-3-turn-your-photos-into-bitcoin-private-keys-addresses-57669771cf7a
- `target_format`: BIP39 24 words (fixed, public), unknown passphrase, BIP84 m/84'/0'/0'/0/0
  - https://mempool.space/address/bc1qcyrndzgy036f6ax370g8zyvlw86ulawgt0246r
- `bc1q57euh23y3qs2f9d5mtwpax5lqecfvrdkqce82a` вЂ” decoy | sister (empty passphrase, oracle calibration only, not a target) | РѕР¶РёРґР°РµС‚СЃСЏ: n/a, not a prize address | РїСЂРѕРІРµСЂРµРЅРѕ 2026-08-16: **swept**
- files=1, data-files=0, log=False

## crypto-puzzles-2018-puzzle-2-0-05eth
# Crypto Puzzles 2018: Puzzle #2
- РџСЂРёРјРµС‡Р°РЅРёРµ: single externally-owned account, never signed a transaction (nonce 0); that this address is Puzzle #2's escrow is a strong inference from the funder and amount matching Puzzle #1, not stated directly by the author
- `0x1fa8Be9De5bBFE047C72dB8E8E3257128F7661ad` вЂ” main | expected: 0.05 ETH | state: funded-unspent (checked 2026-08-16) | https://etherscan.io/address/0x1fa8Be9De5bBFE047C72dB8E8E3257128F7661ad
- Folder: https://github.com/floflo777/open-crypto-puzzles/tree/main/3-small-prizes/crypto-puzzles-2018-puzzle-2-0-05eth
- README (raw): https://raw.githubusercontent.com/floflo777/open-crypto-puzzles/main/3-small-prizes/crypto-puzzles-2018-puzzle-2-0-05eth/README.md
- `status`: **open**
- `prize`: 0.05 ETH (РѕС†РµРЅРєР° $94 РЅР° 2026-08-16) вЂ” single externally-owned account, never signed a transaction (nonce 0); that this address is Puzzle #2's escrow is a strong inference from the funder and amount matching Puzzle #1, not stated directly by the author
- `target_format`: 64-character hex private key (32 bytes), secp256k1, Keccak-256 of the uncompressed public key to a 20-byte address, no BIP39, no passphrase, no derivation path
  - https://etherscan.io/address/0x1fa8Be9De5bBFE047C72dB8E8E3257128F7661ad
- read a 64-character hex private key hidden as composite glyphs across the two Puzzle #2 videos, then derive secp256k1 -> Keccak-256 -> last 20 bytes to an Ethereum address
- СЃРІРµСЂРµРЅРѕ СЃ: Puzzle #1's own published solution (64-hex answer read from its solution video), which derives to the address that received and was later spent from for that puzzle's own 0.05 ETH prize in 2018
  - title: Replay Puzzle #1 end to end to fix the reading grammar | status: open
  - title: Finish the planned template-matching pass against Puzzle #1's glyph shapes | status: open
  - title: Bounded 16^8 sweep if a small gap remains after reading | status: open
- files=840, data-files=798, log=True

## cryptopuzzles-eth-easycore-numbers
# cryptopuzzles.eth вЂ” Easycore Рё Numbers вЂ” РРЎРџР РђР’Р›Р•РќРћ: РќР• СЂРµС€РµРЅС‹
  вЂ” РїСЂРѕРІРµСЂРєР°: https://etherscan.io/address/0x06460646ca1603a61953eeb385681f5d56401ede
  вЂ” РїСЂРѕРІРµСЂРєР°: https://mempool.space/address/1PUzZ61FSVTn12CafJC85Vy1ts3BoFcXdU
- files=1, data-files=0, log=False

## dead-ends-registry
# Р РµРµСЃС‚СЂ РјС‘СЂС‚РІС‹С… Рё РѕС‚Р±СЂР°РєРѕРІР°РЅРЅС‹С… Р·Р°РіР°РґРѕРє (РЅРµ С‚СЂР°С‚РёС‚СЊ РІСЂРµРјСЏ)
| Q-Day Prize (Project Eleven) | 1 BTC | РІС‹РґР°РЅ 24.04.2026 (Lelli), Р·Р°РєСЂС‹С‚; СЌС‚Рѕ РЅРµ QDay vault | 16.10.2026 |
- files=1, data-files=0, log=False

## demint-bitcoin-evangelism
# De Mint: Bitcoin Evangelism book puzzle
- `status`: **dead-end** (dead-end: solved-by-others)
- `prize`: 3146386 sats (РѕС†РµРЅРєР° $1982 РЅР° 2026-08-16) вЂ” puzzle 1; a later puzzle 2 of 1,000,000 sats had no published escrow
- files=1, data-files=0, log=False

## doges-gambit
# Doge's Gambit
- РћРїРёСЃР°РЅРёРµ: Doge's Gambit by Crypto Puzzlers hid an Ether key and a Dogecoin key in one 68 second video of a chess board. Both prizes were claimed in 2021 and the author published both solutions
- `address`: "DRMqy4bGAnWpaShBFtTUoHEiBWj4HoiSfq"
- `status`: Status.Solved
- `prize`: 10000
> Doge's Gambit by Crypto Puzzlers hid an Ether key and a Dogecoin key in one 68 second video of a chess board. Both prizes were claimed in 2021 and the author published both solutions
December 11, 2020, 22:11 UTC. Crypto Puzzlers uploads [Doge's Gambit](https://www.youtube.com/watch?v=DieNZPwIUoQ), 68 seconds of a chess board, and nine minutes later [posts it on r/dogecoin](https://www.reddit.com/r/dogecoin/comments/kbcptp/10000_doge_reward_new_cryptocurrency_video_puzzle/). "I tried something new in that there are really two puzzles in one". The previous one posted there went in a few hours, so this one is a bit harder.
Two prizes, two chains, two keys. The video description lists 10,000 DOGE at `DRMqy4вЂ¦` and 0.01 ETH plus 49 BOMB at `0x7777F6вЂ¦`. Difficulty 6 out of 10, says the author. All three were funded in the half hour before the upload.
Frame one gives yellow 5 + 2 = 7, green 1 + 7 = 8, blue 7 + e = 5 and red 8 + 8 = 0. That's `7850`, the first four hex digits of the key. Sixteen frames, four digits each, 64 hex characters. The modular addition is the part the author calls the trickiest, and the one the author was glad to have put in, since the prize kept growing while nobody got it.
April 23, 2021, 14:32 UTC. The first move is the 49 BOMB, 48 to a new address, because Bomb Token burns 1% of every transfer and 1% of 49 rounds up to one whole bomb. That transfer cost 0.004759827 ETH in gas. Ten minutes later the Ether follows, 0.003308173 ETH after another 0.001932 in fees.
So of the 0.01 ETH prize, less than a third made it out. Spring 2021 gas, everybody.
Five months after the upload the 10,000 DOGE left `DRMqy4вЂ¦` on May 9, 2021, at 00:28 UTC, 9,999 to one address and 1 DOGE in fees. The solver wrote to the author that it took about a month of work. The author's own tally of the prize: around $50 at funding, $400 in January, five or six thousand dollars on the day it was claimed. Nice month.
`puzzles verify doges-gambit/doge` derives the address from the WIF on screen, and the public key in the claim's input script matches it too.
  address: "DRMqy4bGAnWpaShBFtTUoHEiBWj4HoiSfq",
- files=1, data-files=0, log=False

## dug-student-treasure-hunt-63ksats
# Dug's Student Treasure Hunt (2025 edition)
- `bc1qych2me6h85j38s3xmfwdkcvpqakpld3yr2y5ss` вЂ” index 0, m/84'/0'/0'/0/0 | expected: 75,082 sats, funded 2025-06-26 | state: swept (checked 2026-08-16) | https://mempool.space/address/bc1qych2me6h85j38s3xmfwdkcvpqakpld3yr2y5ss
- `bc1qphfklk568cf93267yetpngqsz0mthw4z4x2q69` вЂ” index 1, m/84'/0'/0'/0/1, the one I solved | expected: 63,216 sats, funded 2026-06-26 | state: swept (checked 2026-08-16) | https://mempool.space/address/bc1qphfklk568cf93267yetpngqsz0mthw4z4x2q69
- `bc1qnclravnmv7vta9fhnp44hu3y85z3tfgz0n33wl` вЂ” index 2, m/84'/0'/0'/0/2 | expected: 20,888 sats, funded 2026-06-26 | state: swept (checked 2026-08-16) | https://mempool.space/address/bc1qnclravnmv7vta9fhnp44hu3y85z3tfgz0n33wl
> Twelve lecture words led to three Bitcoin prizes. See Dug's 2025 treasure hunt solution with the BIP39 seed and verified BIP84 paths.
Dug's 2025 Student Treasure Hunt has **three funded Bitcoin addresses**, each a puzzle in the `dug` collection. Together they held **159,186 satoshis**. All three prizes have been claimed, and the published seed verifies against every address.
It's BIP39 with an **empty passphrase**. The three receiving addresses use BIP84 paths `m/84'/0'/0'/0/0`, `m/84'/0'/0'/0/1` and `m/84'/0'/0'/0/2`. Same seed, different final index. Stopping at index 0 would leave two targets unchecked.
## Who claimed the three Bitcoin prizes?
      Prize
[floflo777](https://github.com/floflo777), also [0xFlorent_ on Twitter](https://twitter.com/0xFlorent_), describes recovering the second prize in his write-up. Its transaction paid **59,916 sats after fees**. Someone had already claimed indices 0 and 2 in a single transaction a few weeks earlier. The source doesn't name that solver.
So the write-up's вЂњ63ksatsвЂќ title describes one recovery, not the whole collection. The [address and transaction ledger](https://puzzles.agntn.dev/assets/dug/2025-solution.md) has the full accounting. In these records, claim amounts mean the inputs spent from each target before fees, not two copies of a shared payout.
- `status`: **solved**
- `prize`: 63216 sats (РѕС†РµРЅРєР° $40 РЅР° 2026-08-16) вЂ” the portion I recovered (index 1 of 3); a third party had already swept the larger index 0 plus index 2 portion, 95,792 sats, five weeks earlier
- `target_format`: BIP39 12 words, English, BIP84 m/84'/0'/0'/0/i for i in 0, 1, 2, no passphrase
- files=1, data-files=0, log=False

## exitonly-challenge-14-30ksats
# Exitonly Bitcoin Challenge 14
- the brute-force space with known word positions is 2048^4 x 128 = 2,251,799,813,685,248 candidates; at an assumed 1,000,000 to 5,000,000 derivations/second on a rented GPU the cost is roughly $31,000 to $156,000 against an $18.90 prize, about 1,600 to 8,300 times over
- `bc1q5rjy2cdfy4n4dkk4r6pxtwqlm8tgjcc2dj0ee9` вЂ” main | expected: 30000 sats | state: funded-unspent (checked 2026-08-16) | https://mempool.space/address/bc1q5rjy2cdfy4n4dkk4r6pxtwqlm8tgjcc2dj0ee9
- Folder: https://github.com/floflo777/open-crypto-puzzles/tree/main/3-small-prizes/exitonly-challenge-14-30ksats
- README (raw): https://raw.githubusercontent.com/floflo777/open-crypto-puzzles/main/3-small-prizes/exitonly-challenge-14-30ksats/README.md
- `status`: **open**
- `prize`: 30000 sats (РѕС†РµРЅРєР° $18.9 РЅР° 2026-08-16) вЂ” single P2WPKH escrow, one funding transaction
- `target_format`: BIP39 12 words (English), 7 given in clear, 5 missing, most likely BIP84 m/84'/0'/0'/0/0 (script type v0_p2wpkh), no passphrase stated, positions and order of the missing words not confirmed by the author
- `difficulty_note`: the brute-force space with known word positions is 2048^4 x 128 = 2,251,799,813,685,248 candidates; at an assumed 1,000,000 to 5,000,000 derivations/second on a rented GPU the cost is roughly $31,000 to $156,000 against an $18.90 prize, about 1,600 to 8,300 times over
  - https://mempool.space/address/bc1q5rjy2cdfy4n4dkk4r6pxtwqlm8tgjcc2dj0ee9
- combine the 7 published words with 5 unknown words into a checksum-valid BIP39 mnemonic and derive it to a Bitcoin address
  - title: Solve episode #12 and compare its seed to #13 to test for a weak or correlated random source | status: open
  - title: Recover the complete solved seeds of episodes #11-#13, currently not recorded | status: open
- files=1, data-files=0, log=False

## fe-lang-bountiful-compiler-bounty-1eth
# Bountiful: the Fe compiler bug bounty
- РџСЂРёРјРµС‡Р°РЅРёРµ: the registry holds 1 ETH and each of the 7 registered challenges carries a 0.25 ETH prize, so the pot pays the first 4 claims and the 5th would revert; the 1 ETH balance, not the 1.75 ETH nominal total, is what the chain can pay today
- `0x71fB6afcD98c5BD611712ad4b8D314EF729aa69D` вЂ” BountyRegistry, round 3 | expected: 1 ETH | state: funded-unspent (checked 2026-08-17) | https://etherscan.io/address/0x71fB6afcD98c5BD611712ad4b8D314EF729aa69D
- `0x046a3a4968282BaA7ad6291723873C8275434623` вЂ” Game | expected: 0 ETH, prize held by the registry | state: zero-balance-contract (checked 2026-08-17) | https://etherscan.io/address/0x046a3a4968282BaA7ad6291723873C8275434623
- `0xE959e7ecA1afCa6cf2Bf8b07e25Da355b6C8E8c7` вЂ” Game2D | expected: 0 ETH, prize held by the registry | state: zero-balance-contract (checked 2026-08-17) | https://etherscan.io/address/0xE959e7ecA1afCa6cf2Bf8b07e25Da355b6C8E8c7
- `0xfb5423aDfBAC65ac675845Bb4FEBf8aeC128272E` вЂ” GameEnum | expected: 0 ETH, prize held by the registry | state: zero-balance-contract (checked 2026-08-17) | https://etherscan.io/address/0xfb5423aDfBAC65ac675845Bb4FEBf8aeC128272E
- `0x5E987b6aADD4DFC2236D21edE6D07feb04350b06` вЂ” GameBitboard | expected: 0 ETH, prize held by the registry | state: zero-balance-contract (checked 2026-08-17) | https://etherscan.io/address/0x5E987b6aADD4DFC2236D21edE6D07feb04350b06
- `0x86B7AEce1503242fED29E593FAEde3b7b00a5a1D` вЂ” GameMonadic | expected: 0 ETH, prize held by the registry | state: zero-balance-contract (checked 2026-08-17) | https://etherscan.io/address/0x86B7AEce1503242fED29E593FAEde3b7b00a5a1D
- `0x3dF9789634995546B0126bC28B9F9FcBCB129F18` вЂ” GameNested | expected: 0 ETH, prize held by the registry | state: zero-balance-contract (checked 2026-08-17) | https://etherscan.io/address/0x3dF9789634995546B0126bC28B9F9FcBCB129F18
- `0x85b4d0B32b8a285111c244E52524B642f1A5ccFE` вЂ” GameTrait | expected: 0 ETH, prize held by the registry | state: zero-balance-contract (checked 2026-08-17) | https://etherscan.io/address/0x85b4d0B32b8a285111c244E52524B642f1A5ccFE
- Folder: https://github.com/floflo777/open-crypto-puzzles/tree/main/2-mid-prizes/fe-lang-bountiful-compiler-bounty-1eth
- README (raw): https://raw.githubusercontent.com/floflo777/open-crypto-puzzles/main/2-mid-prizes/fe-lang-bountiful-compiler-bounty-1eth/README.md
  - Р’С‹РїР»Р°С‚Р°: `lock(address)` СЃ РґРµРїРѕР·РёС‚РѕРј (РїРѕ СѓРјРѕР»С‡Р°РЅРёСЋ **0,01 ETH**), Р·Р°С‚РµРј `moveField` (С‚СЂРµР±СѓРµС‚ РІР°Р»РёРґРЅС‹Р№ lock С‡РµСЂРµР· `validateOwnsLock`), Р·Р°С‚РµРј `claim()`. **РќСѓР¶РЅС‹ СЃРІРѕРё ETH РЅР° РґРµРїРѕР·РёС‚ Рё РіР°Р·.**
- **Р§С‚Рѕ РѕСЃС‚Р°Р»РѕСЃСЊ / СЃР»РµРґСѓСЋС‰РёР№ С€Р°Рі**: РґРёС„С„РµСЂРµРЅС†РёР°Р»СЊРЅС‹Р№ С„Р°Р·Р·РёРЅРі РЅР° СѓСЂРѕРІРЅРµ IR/ABI (aliasing РёРЅРґРµРєСЃРѕРІ, СѓРїР°РєРѕРІРєР° `Challenge`: `is_open` 1 Р±РёС‚ + `prize_amount` u128), РѕСЃРѕР±РµРЅРЅРѕ GameBitboard Рё GameMonadic. Р›СЋР±РѕР№ Р»РѕРєР°Р»СЊРЅС‹Р№ СЌРєСЃРїР»РѕР№С‚ РїРѕС‚СЂРµР±СѓРµС‚ СЃРѕРіР»Р°СЃРёСЏ РР»СЊРё РЅР° ~0,01 ETH + РіР°Р·.
- files=41, data-files=40, log=False

## ftpk-season-2-300usdt
# FTPK Season 2: Never-Ending
- РџСЂРёРјРµС‡Р°РЅРёРµ: ERC-20 USDT; the escrow's native ETH balance is 0, the prize is entirely the token balance
- РћРїСѓР±Р»РёРєРѕРІР°РЅРѕ: 2025-05-19 https://x.com/FTPKgame/status/1924450289311961483
- `0xb5fe4f1b6cb2bbe6a327f8c68f370da7df18b2dc` вЂ” main | expected: 305.930218 USDT | state: funded-unspent (checked 2026-08-27) | https://etherscan.io/address/0xb5fe4f1b6cb2bbe6a327f8c68f370da7df18b2dc
- 2025-05-19 вЂ” "Here we go for a new game, 300 USDT to win" вЂ” https://x.com/FTPKgame/status/1924450289311961483
- 2025-06-05 вЂ” Author, Attack Challenge Mode post вЂ” https://x.com/FTPKgame/status/1930610344247906356
- 2025-06-15 вЂ” Author, last Season 2 clue (black knight) вЂ” https://x.com/FTPKgame/status/1934183762079666297
- 2025-06-06 вЂ” Author, naming N4Khjir and thedragon8383 вЂ” https://x.com/FTPKgame/status/1931006963740979489
- 2025-05-28 вЂ” N4Khjir, Game 7 title Zero-based indexing вЂ” https://x.com/N4Khjir/status/1927621189503005053
- 2025-05-28 вЂ” N4Khjir, Game 11 Braille / +33 / French poem вЂ” https://x.com/N4Khjir/status/1927623047076282678
- 2025-06-06 вЂ” Author, image2.jpg is a development error вЂ” https://x.com/FTPKgame/status/1931024956046909798
- 2026-08-27 вЂ” Escrow wallet, etherscan.io вЂ” https://etherscan.io/address/0xb5fe4f1b6cb2bbe6a327f8c68f370da7df18b2dc
- Folder: https://github.com/floflo777/open-crypto-puzzles/tree/main/2-mid-prizes/ftpk-season-2-300usdt
- README (raw): https://raw.githubusercontent.com/floflo777/open-crypto-puzzles/main/2-mid-prizes/ftpk-season-2-300usdt/README.md
- files=1, data-files=0, log=False

## ftpk-season-4-166usdc
# FTPK Season 4: Something in Common
- РџСЂРёРјРµС‡Р°РЅРёРµ: the author tops up this prize over time; it started at 150 USDC and has grown since, plus a small native ETH gas preload for the eventual winner
- РћРїСѓР±Р»РёРєРѕРІР°РЅРѕ: 2026-07-16 https://x.com/FTPKgame/status/2077755138668671313
- `0xa468335485cE853F21A44451755bd88364e9d618` вЂ” main | expected: 166.000000 USDC | state: swept (checked 2026-08-21) | https://etherscan.io/address/0xa468335485cE853F21A44451755bd88364e9d618
- 2026-07-16 вЂ” "A new treasure hunt is live! (Something in common), 12 hidden words, 150 USDC to be won" вЂ” https://x.com/FTPKgame/status/2077755138668671313
- 2026-07-23 вЂ” "Yes, all the words are necessarily part of the BIP-39 list" вЂ” https://x.com/FTPKgame/status/2080258068529492034
- 2026-07-25 вЂ” "There is something that almost all the games have in common" вЂ” https://x.com/FTPKgame/status/2080976765401387082
- 2026-07-22 вЂ” "In Season 4, there is a hidden page to help you with Season 2" вЂ” https://x.com/FTPKgame/status/2079947035357102350
- 2026-08-16 вЂ” Escrow wallet, etherscan.io вЂ” https://etherscan.io/address/0xa468335485cE853F21A44451755bd88364e9d618
- `status`: **solved**
- `prize`: 166.0 USDC (РѕС†РµРЅРєР° $166 РЅР° 2026-08-16) вЂ” the author tops up this prize over time; it started at 150 USDC and has grown since, plus a small native ETH gas preload for the eventual winner
- `published`: 2026-07-16 https://x.com/FTPKgame/status/2077755138668671313
- `target_format`: 12 English BIP39 words, BIP44 Ethereum m/44'/60'/0'/0/0, no passphrase, order recoverable offline once the word set is known
  - https://etherscan.io/address/0xa468335485cE853F21A44451755bd88364e9d618
- files=1, data-files=0, log=False

## game-of-satoshi-season-1
# The Game of Satoshi (Season 1)
- `status`: **dead-end** (dead-end: custodial)
- `prize`: 0.21 BTC (РѕС†РµРЅРєР° $13230 РЅР° 2026-08-16) вЂ” pool split among top 5000 players, paid by the organizer
- files=1, data-files=0, log=False

## genesis-block-wallet-puzzle-142ksats
# Genesis Block Wallet Puzzle
- the lock is fully characterized (2-of-2 P2WSH, exact offline oracle) and the corpus is 285 public bytes; passes 1 and 2 (2026-08-29) exhausted the mechanical readings of the August hints (611,008 keys, 5.7e11 ordered pairs, 0 match with witnesses); the author's answers of 2026-09-10 and 2026-09-11, bought by a reader with the questions drafted here, name the root: a 12-word BIP39 mnemonic with entropy taken from the genesis block, a passphrase, and a genesis value as the BIP48 account; pass 3 (2026-09-12, 1.57 million keys, 2.46e12 pairs, witnesses re-found) shows the passphrase is none of 53 obvious readings of the block; it is the one thing the author has not described
- `bc1qfkhx02v89u2qyyyljeczw6hu9sr437y44t7ae5yf09thrdukfqesnjg2wj` вЂ” main (P2WSH, witness program 4dae67a9872f1402109f9670276afc2c0758f895aafddcd089795771b7964833) | expected: 168779 sats in 24 outputs, growing | state: funded-unspent (checked 2026-09-12) | https://mempool.space/address/bc1qfkhx02v89u2qyyyljeczw6hu9sr437y44t7ae5yf09thrdukfqesnjg2wj
- 2026-08-29 вЂ” Escrow address and full on-chain dialogue вЂ” https://mempool.space/address/bc1qfkhx02v89u2qyyyljeczw6hu9sr437y44t7ae5yf09thrdukfqesnjg2wj
- 2026-08-23 вЂ” Galaxy Research, first public report (X) вЂ” https://x.com/glxyresearch/status/2091349771952742566
- Folder: https://github.com/floflo777/open-crypto-puzzles/tree/main/3-small-prizes/genesis-block-wallet-puzzle-142ksats
- README (raw): https://raw.githubusercontent.com/floflo777/open-crypto-puzzles/main/3-small-prizes/genesis-block-wallet-puzzle-142ksats/README.md
  - Р•РґРёРЅСЃС‚РІРµРЅРЅС‹Р№ РєР°РЅР°Р» Р°РІС‚РѕСЂР° вЂ” OP_RETURN РЅР° Р°РґСЂРµСЃРµ СЌСЃРєСЂРѕСѓ: https://mempool.space/address/bc1qfkhx02v89u2qyyyljeczw6hu9sr437y44t7ae5yf09thrdukfqesnjg2wj
  - X: https://x.com/glxyresearch/status/2091729030160507360
  - OCP: https://github.com/floflo777/open-crypto-puzzles/tree/main/3-small-prizes/genesis-block-wallet-puzzle-142ksats
  - agntn СЃС‡РёС‚Р°РµС‚ Р°РІС‚РѕСЂРѕРј @caesrcd (https://x.com/caesrcd/status/2107565388527456292; GitHub caesrcd вЂ” С„РѕСЂРє Sparrow). РњС‹ СЌС‚Рѕ РЅРµ РїСЂРѕРІРµСЂСЏР»Рё.
> Explore the Genesis Block Wallet Puzzle and the author's Bitcoin OP_RETURN replies. Follow the clues and check the prize balance without mistaking a hint for a solution
The target is a **P2WSH address**:
Those are the author's claims. The witness script and public keys are not recorded here, and a clue is not a verified recipe. The author has offered the two public keys for 50k sats since September 17. The September 24 terms add 1k to the author's address and deliver the keys encrypted to the buyer. Bought, not published.
- files=14, data-files=12, log=True

## ghostnet
# GhostNet (2009)
- files=1, data-files=0, log=False

## groestlcoin-puzzle-1000grs
# Groestlcoin Puzzle
- РўРёРїС‹: address-puzzle, raw-key
- files=2, data-files=0, log=True

## grycoin-chain
# Grycoin chain
A new name. "I call the chain the Grycoin chain now." Grycoin is the author's idea of a coin that caps fossil fuel production worldwide. The chain is the consolation prize. "Better than nothing." Small blocks, 7 mBTC each, one a week "as long as I feel like it".
Ten hours later it's gone. u/JDScreesh congratulates u/puzzleponky. Fine, so what was the solution? The author's answer is the best line of the whole chain: "One, I actually don't know." Which letters to flip is obvious, says the author. How to get from there to the prize isn't, "not even to me".
The claim pays `129jw1GUGwiJbf4rL7qEANPbxvSRC5zfHN`. Same address that collected a pile of [Quizchain2](https://puzzles.agntn.dev/collections/quizchain2) blocks, each time with u/puzzleponky's answer in the thread. Proof? No. But it's a good guess who walked away with block 2.
Block 1 is the familiar recipe. MD5 of the answer, the 16 bytes as BIP39 entropy, `m/44'/0'/0'/0/0`. Nobody printed the key, so the record ends in `.derived()`. The WIF gives the funded address, and its public key matches the one the claim revealed. The chain checks the homework.
Block 2 has no key and never will, unless someone finally spells out that text. Its status is `claimed`: the coins moved, the secret stayed secret. What the record keeps is the method and two checksums. `3c6` for the solution, and `7759227` for the text before any letter changes. The author posted that second one for u/puzzleponky, who wasn't on Windows and got plain `\n` line breaks from the copy. A few hours later the same name gets the congratulations.
- files=49, data-files=42, log=True

## gsmg-io-5btc-puzzle
# GSMG.io Puzzle
- РџСЂРёРјРµС‡Р°РЅРёРµ: the balance of the prize address 1GSMG1JC9wtdSwfwApgj2xcmJPAwx7prBe at the 2026-08-16 snapshot (1.25635374 BTC on 2026-09-03, the difference is third-party dust). The creator announced in April 2019 that the reward halves at every Bitcoin halving, and it did: 5 BTC funded 2019-04-13, 2.5 BTC moved out in block 630001 (2020-05-11) and 1.25 BTC on 2024-04-24 to 17ucy1K9ZUAaoY6JVtM932W9jUp5LXfyHa, which has never spent and has no published payout path. Those 3.7505531 BTC are listed as an address below but not counted as prize; the reading that the Dualite blob gates them is unconfirmed. Correction contributed by Y0lan in issue #15 (2026-09-02), verified on chain 2026-09-03
- the stage chain to the final page is fully solved and replays from archived material with the creator's own convention (password = sha256 of the answer); the 256-symbol object has been tested as a direct 32-byte key reduction across roughly 335.7 million candidates with 0 match; both 80-byte locks (SalPhaseIon small blob and the 2019 phase 3.2.2 blob) are negative for every word sequence of every puzzle text and of the three Matrix films, for stage answers and digests, interleavings and iterated hashes (about 25.8 million decryptions with witnesses); the creator's unmessaged planted address of 2020-04-07, the third door, is negative for every textual construction (about 62 million candidates with witnesses); the community's decrypted Cosmic Duality is a padding accident; what would open the third door is a rule of the creator's from early 2020 read on a non-textual object
- `1GSMG1JC9wtdSwfwApgj2xcmJPAwx7prBe` вЂ” prize address (small blob gate) | expected: 125635374 sats | state: partially-spent (checked 2026-09-03) | https://mempool.space/address/1GSMG1JC9wtdSwfwApgj2xcmJPAwx7prBe
- `17ucy1K9ZUAaoY6JVtM932W9jUp5LXfyHa` вЂ” halving split-off, creator controlled; not counted as prize (the Dualite-blob reading is unconfirmed) | expected: 375055856 sats | state: funded-unspent (checked 2026-09-03) | https://mempool.space/address/17ucy1K9ZUAaoY6JVtM932W9jUp5LXfyHa
- 2020-05-11 вЂ” First transfer to the second address вЂ” https://mempool.space/tx/2aa9a4a90be819d5122d70c993280785a0508f163521e7b38cebb4db0b071b13
- 2024-04-24 вЂ” Second transfer to the second address вЂ” https://mempool.space/tx/88cdb3cdca12b471551b1b26188508a14ca5fd8a415223ffb7c190381c9b9df3
- 2020-05-11 вЂ” OP_RETURN "Halving" from the creator's vanity address, same block as the first split вЂ” https://mempool.space/tx/a798905f53fdcadcbd2e2a1e61d23ba69a07e26130a78c76da4bf4d7a170f383
- 2026-09-02 вЂ” Issue #15, Y0lan: prize is 1.25 BTC, not 5.0068982 BTC вЂ” https://github.com/floflo777/open-crypto-puzzles/issues/15
- 2026-09-03 вЂ” The creator's vanity wallet that funded the planted addresses вЂ” https://mempool.space/address/3GSMG24TujqfMJG1kQoBX18DzJHQLeJYMK
- Folder: https://github.com/floflo777/open-crypto-puzzles/tree/main/1-big-prizes/gsmg-io-5btc-puzzle
- README (raw): https://raw.githubusercontent.com/floflo777/open-crypto-puzzles/main/1-big-prizes/gsmg-io-5btc-puzzle/README.md
- Exact offline oracle: 9 planted addresses (6 SHA-256 stage answers + raw/reversed bit image URL + 1 without preimage 1NULY7DhzuNvSDtPkFzNo6oRTZQWBqXNE9 = В«С‚СЂРµС‚СЊСЏ РґРІРµСЂСЊВ»).
- РџСЂРѕРІРµСЂРµРЅРѕ (РѕС‚СЂРёС†Р°С‚РµР»СЊРЅРѕ): 256-obj reductions 335.7M; large blob direct 59k/59k; textual passwords ~62.6M total across both locks/planted addresses; community "Cosmic Duality" = padding accident; plain rockyou.txt (~14.3M) РµС‰С‘ СЂР°Р±РѕС‚Р°Р» РїСЂРё Р·Р°РєСЂС‹С‚РёРё СЃРµСЃСЃРёРё.
- files=73, data-files=63, log=True

## guntis-vitolins-metamask-8-6eth
# Guntis Vitolins: 10 ETH Challenge
- РџСЂРёРјРµС‡Р°РЅРёРµ: wallet funded with 10 ETH on 2020-02-12; the author has withdrawn from it 7 times since 2021-05, most recently 2024-06-04, totaling approximately 1.377 ETH; he still holds and periodically uses this private key, so this is not a frozen escrow
- `0x9C2F44EFAd0c1E852a09dF9939e6DaF061140CaF` вЂ” main | expected: 8.61254155425694462 ETH | state: funded-unspent (checked 2026-08-16) | https://etherscan.io/address/0x9C2F44EFAd0c1E852a09dF9939e6DaF061140CaF
- Folder: https://github.com/floflo777/open-crypto-puzzles/tree/main/1-big-prizes/guntis-vitolins-metamask-8-6eth
- README (raw): https://raw.githubusercontent.com/floflo777/open-crypto-puzzles/main/1-big-prizes/guntis-vitolins-metamask-8-6eth/README.md
- Deep doc: https://raw.githubusercontent.com/floflo777/open-crypto-puzzles/main/1-big-prizes/guntis-vitolins-metamask-8-6eth/README.md
- **РСЃС‚РѕС‡РЅРёРєРё**: РІРёРґРµРѕ https://www.youtube.com/watch?v=w4mpiuBP_aY ; РїРѕСЃС‚ https://mineshop.eu/2020/02/12/crypto-pumping-hardcore-research-portfolio-update-how-are-we-doing/ (С‚РµРіРё вЂ” РІ Р°СЂС…РёРІРµ Wayback 28.05.2020); С…РёРЅС‚ 4 https://www.youtube.com/watch?v=03wXiMczCXk (~15:15); С…РёРЅС‚ 5 https://www.youtube.com/watch?v=ZjBJKooVmuE (~17:25). OCP: `/workspace/work/open-crypto-puzzles/1-big-prizes/guntis-vitolins-metamask-8-6eth/` (data/reading-order-pool.json, video-onscreen-words.json, seed-slots.json, tools/). GitHub floflo777/open-crypto-puzzles issues #18 (cjmcdaniel 04.09, Bayols 26.09), #38 (profesor1234 04.10). puzzles.agntn.dev/collections/mineshop.
- `address`: "0x9C2F44EFAd0c1E852a09dF9939e6DaF061140CaF"
- `prize`: 8.612541554256945
> Six of twelve seed words sit in a YouTube video, six in the mineshop.eu post it links to. The prize, the rules in the author's own words, and why a shrinking balance here means nothing.
### The address, the money, the rules
  address: "0x9C2F44EFAd0c1E852a09dF9939e6DaF061140CaF",
  prize: 8.612541554256945,
The public key is another story. He signed every withdrawal himself, and each signature gives the key back. Hash it and you land on this exact address, so the record carries it now. Closer to the 8.6 ETH? Not one bit. It's the lock, not the key.
- files=1, data-files=0, log=False

## iamabananaamaa-puzzles
# IAMABananaAMAA's puzzles
- `address`: "1DprL7pbKGwjMKoJ4c6BEKrTmtbPB4AiNJ"
- `status`: Status.Solved
- `prize`: 0.001
[Wickex](https://www.reddit.com/r/bitcoinpuzzles/comments/1thjjq/comment/ce846u3/) posted the address `1DprL7pbKGwjMKoJ4c6BEKrTmtbPB4AiNJ` at 01:01:07 UTC, 2 hours 25 minutes after the post. Called it "Public key of the decrypted address", but it's an address. The prize left three and a half minutes later, 0.0009 BTC after a 0.0001 BTC fee. The author was posting from a phone and missed the comment for almost an hour and a half. Then: "Wow, I completely missed your post.. Feel free to explain it!" [The method](https://www.reddit.com/r/bitcoinpuzzles/comments/1thjjq/comment/ce86ejm/) came right after.
  address: "1DprL7pbKGwjMKoJ4c6BEKrTmtbPB4AiNJ",
  status: Status.Solved,
  prize: 0.001,
The thread never shows the WIF. Wickex gave the address and the recipe, the author confirmed both. The key in the record is that recipe run on the GIF itself, and `verify` derives the address from it. The public key comes from the spend's own input script, so it doesn't depend on the recipe at all.
Plus the address `1wkQxZaewFqYrDJeVnxqrfMKfJykdRfr5`, funded an hour and three quarters before, and a rule: if you solve it and want to leave the prize for someone else, post the first two and last two characters of the key. "It doesn't involve any images or videos."
Now join the four lines. `Ky1VCMxtg9xD13hFrEhWxN22QobNEfeTDX14sZdhGHC3nBRTEDQ8`. 52 characters, starts with `K`, and the Base58 checksum holds. That's a compressed WIF. It derives `1wkQxZвЂ¦dfr5`, and its public key is the one in the claim's input script.
At 14:42 came another comment, also deleted. The author asked how they solved it, then: "You got it from that guys post? Gah...I wish he didn't do that." The prize left at 15:18:26, 0.0009 BTC after a 0.0001 BTC fee. Nobody in the thread said it was them.
  address: "1wkQxZaewFqYrDJeVnxqrfMKfJykdRfr5",
  status: Status.Solved,
- files=1, data-files=0, log=False

## jack-froese-emails
# Jack Froese Emails (2011)
- files=1, data-files=0, log=False

## john-titor
# John Titor (2000-2001)
- files=1, data-files=0, log=False

## keir-finlow-bates-blockchain-book-600ksats
# Keir Finlow-Bates: Move Over Brokers Treasure Hunt
- `14aFhno96fkt7knLWMDQ4j8yh8v5hBF4n1` вЂ” EN_easy_1 | expected: 200000 sats | state: swept (checked 2026-09-01) | https://mempool.space/address/14aFhno96fkt7knLWMDQ4j8yh8v5hBF4n1
- `14utGQn5GdfPvUrHNLAwTmmP99QpXm9mg6` вЂ” EN_easy_2 | expected: 200000 sats | state: swept (checked 2026-09-01) | https://mempool.space/address/14utGQn5GdfPvUrHNLAwTmmP99QpXm9mg6
- `1QFafw3weoWTRQhiLafRw2eyWbVmES6wfJ` вЂ” EN_medium_s | expected: 200000 sats | state: swept (checked 2026-09-01) | https://mempool.space/address/1QFafw3weoWTRQhiLafRw2eyWbVmES6wfJ
- `17Y9czcbcCz433QXsy1SGQjwLb27BBtLLZ` вЂ” EN_medium | expected: 200000 sats | state: funded-unspent (checked 2026-09-01) | https://mempool.space/address/17Y9czcbcCz433QXsy1SGQjwLb27BBtLLZ
- `181rPpfdUGFg4fVEdhDZEfDbBSqgigtoZR` вЂ” EN_hard_1 | expected: 200000 sats | state: swept (checked 2026-09-01) | https://mempool.space/address/181rPpfdUGFg4fVEdhDZEfDbBSqgigtoZR
- `161YgNX2NrCzGunWvoV1hN3DuzWeuovBK3` вЂ” EN_hard_2 | expected: 200000 sats | state: swept (checked 2026-09-01) | https://mempool.space/address/161YgNX2NrCzGunWvoV1hN3DuzWeuovBK3
- `1KZei2D5yz3UJ59LvXsC1Y9y4ktSgcnVwz` вЂ” EN_veryhard_s | expected: 200000 sats | state: swept (checked 2026-09-01) | https://mempool.space/address/1KZei2D5yz3UJ59LvXsC1Y9y4ktSgcnVwz
- `1DZ5NbUwDgxeJkKhQLgYcUUX36PtYso1pm` вЂ” EN_veryhard | expected: 200000 sats | state: funded-unspent (checked 2026-09-01) | https://mempool.space/address/1DZ5NbUwDgxeJkKhQLgYcUUX36PtYso1pm
- `1MEstvLAzc5DzJtvx7uyvKNNUCPN3ofWMK` вЂ” IT_easy | expected: 200000 sats | state: swept (checked 2026-09-01) | https://mempool.space/address/1MEstvLAzc5DzJtvx7uyvKNNUCPN3ofWMK
- `1Q78hDeaHXQbuCSQxG1uPAc4V3jsuVUG9r` вЂ” IT_medium | expected: 200000 sats | state: swept (checked 2026-09-01) | https://mempool.space/address/1Q78hDeaHXQbuCSQxG1uPAc4V3jsuVUG9r
- `1QExGvuieS9MvuKC3R1qjp6jGTVcqisTDj` вЂ” IT_hard | expected: 200000 sats | state: swept (checked 2026-09-01) | https://mempool.space/address/1QExGvuieS9MvuKC3R1qjp6jGTVcqisTDj
- `19kkawFcg2U2s6vq368MXD7FJU9JZvRrjA` вЂ” IT_veryhard | expected: 200000 sats | state: funded-unspent (checked 2026-09-01) | https://mempool.space/address/19kkawFcg2U2s6vq368MXD7FJU9JZvRrjA
- `bc1qax0hsnwnxl7393awtc3hsy0ftm6tg4tyk2nfja` вЂ” my wallet (destination of all 4 payouts) | expected: n/a | state: unknown (checked 2026-08-16) | https://mempool.space/address/bc1qax0hsnwnxl7393awtc3hsy0ftm6tg4tyk2nfja
- files=1, data-files=0, log=False

## keysa-crack-the-seed-369ksats
# Keysa: Crack the Seed Game
- РџСЂРёРјРµС‡Р°РЅРёРµ: the author never published the escrow address; I found it by matching the announced amount, 369,369 sats, as a near-unique fingerprint in a full blockchain balance dump, then corroborated it by script type (v0_p2wpkh, matching BIP84) and by funding time (2 minutes 28 seconds after the announcement post)
- РћРїСѓР±Р»РёРєРѕРІР°РЅРѕ: 2023-06-26 https://x.com/SimplestBTCBook/status/1673197111603519490
- `bc1qcv84707v4sglaj306qezkcrun4eejh77k8cyjr` вЂ” main | expected: 0 sats (369,369 sats until 2026-09-08) | state: swept (checked 2026-09-12) | https://mempool.space/address/bc1qcv84707v4sglaj306qezkcrun4eejh77k8cyjr
- 2023-06-26 вЂ” Keysa, original announcement вЂ” https://x.com/SimplestBTCBook/status/1673197111603519490
- 2023-06-27 вЂ” Keysa, reply: all the words but two, are in order вЂ” https://x.com/SimplestBTCBook/status/1673685712498049025
- 2023-06-27 вЂ” Keysa, reply: one still wouldn't know which of all those words are the 12 вЂ” https://x.com/SimplestBTCBook/status/1673683632546873344
- 2023-06-27 вЂ” Keysa, reply: these are all BIP 39 words, because the anon set would decrease вЂ” https://x.com/SimplestBTCBook/status/1673720563318112256
- `status`: **solved**
- `prize`: 369369 sats (РѕС†РµРЅРєР° $233 РЅР° 2026-08-16) вЂ” the author never published the escrow address; I found it by matching the announced amount, 369,369 sats, as a near-unique fingerprint in a full blockchain balance dump, then corroborated it by script type (v0_p2wpkh, matching BIP84) and by funding time (2 minutes 28 seconds after the announcement post)
- `published`: 2023-06-26 https://x.com/SimplestBTCBook/status/1673197111603519490
- `target_format`: BIP39 12 words (English), BIP84 m/84'/0'/0'/0/0, no passphrase
  - https://mempool.space/address/bc1qcv84707v4sglaj306qezkcrun4eejh77k8cyjr
- select 12 of the 70 printed words in some order, derive the BIP84 first receiving address, and compare it to the escrow address
- files=1, data-files=0, log=False

## ktimesg-phy-challenge-0-008btc
# kTimesG В«Phy ChallengeВ»
- РџСЂРѕРІРµСЂРєР° Р±Р°Р»Р°РЅСЃР°: https://mempool.space/address/bc1qrpn28qa82uyjg37dvsz3w7wpm3kpdea957nm9p
- РџРѕРґСЃРєР°Р·РєРё Р°РІС‚РѕСЂР°: В«modular valuesВ», В«fractionalВ», В«no loose ends, no hashingВ».
- РџСЂРѕРІРµСЂРёС‚СЊ В«modular valuesВ»: СЃСѓРјРјС‹/РїСЂРѕРёР·РІРµРґРµРЅРёСЏ РєРѕРѕСЂРґРёРЅР°С‚ РїРѕ РјРѕРґСѓР»СЋ n Рё РїРѕ РјРѕРґСѓР»СЋ 2вЃ·В№
- `address`: "bc1qrpn28qa82uyjg37dvsz3w7wpm3kpdea957nm9p"
- `prize`: 0.008
> kTimesG signed a whitepaper parody and posted a spiral of grey emojis. The signature gives up the prize address. The key behind it is still out there
A text that sounds familiar. It's the abstract of the Bitcoin whitepaper with words swapped. "Electronic cash" became "modular values". Timestamps became "spacestamps", proof of work became "phylo-based proof-of-equivalence". Then a news headline and the line about a puzzle for everyone.
## The prize showed up two weeks later
On June 21 the author [came back](https://bitcointalk.org/index.php?topic=5584952.msg66860784#msg66860784): there's a prize "as of today", and one character is missing from the second code. Plus a PGP message, with "the password's already mentioned." The same evening, **800,000 sats** landed on a native SegWit address.
Nobody had posted that address yet. Where does it come from?
On July 29 NotATether [posted](https://bitcointalk.org/index.php?topic=5584952.msg66990855#msg66990855) "It's J." With the J in front, the signature verifies against the whole signed text, no trailing newline. It recovers the public key `02425afdвЂ¦6650eb` and the address `bc1qrpn28qa82uyjg37dvsz3w7wpm3kpdea957nm9p`. The funded one.
Later someone doubted the address. The author's [answer](https://bitcointalk.org/index.php?topic=5584952.msg67040416#msg67040416) was short: "Why would you think the address is wrong, since the signature verifies?"
So what does the post really hold? Everyone in the thread got stuck around here. NotATether ran Kangaroo over almost the whole 80-bit range. Nothing. The author's verdict: "no idea where it was ever hinted anything about using Kangaroo." The data speaks for itself, apparently.
- files=2, data-files=0, log=True

## lake-city-quiet-pills
# Lake City Quiet Pills (2010-Рµ)
- files=1, data-files=0, log=False

## ledger-donjon-ctf
# Ledger Donjon CTF
- РћРїРёСЃР°РЅРёРµ: Scissors Secret Sharing from Capture the Fortress 2020. A solved BIP39 challenge with its published phrase and BIP44 path. CTF points aren't a BTC prize.
- `address`: "1EHiMwCPzcvMdeGowsowVF2X2PgLo67Qj7"
- `status`: Status.Solved
> Scissors Secret Sharing from Capture the Fortress 2020. A solved BIP39 challenge with its published phrase and BIP44 path. CTF points aren't a BTC prize.
The write-up publishes the ordered phrase and the BIP44 path. `verify()` derives the challenge address from those exact values. No search is needed, the answer is already public.
  address: "1EHiMwCPzcvMdeGowsowVF2X2PgLo67Qj7",
  status: Status.Solved,
## Status
Solved, with joachim credited for the published solution, not asserted to be the first solver. The record leaves `solvedAt` and transactions absent because the write-up doesn't establish either. Its 100 points were a CTF score, so `prize` stays absent too. Treating points as BTC would quietly corrupt the dataset's totals.
- files=1, data-files=0, log=False

## liberte-guidant-le-peuple-2019
# La LibertГ© guidant le peuple 2019
Somewhere in the paint sits a wallet. On January 7 he [posts the mural](https://www.reddit.com/r/Bitcoin/comments/adc601/street_art_treasure_hunt_with_a_bitcoin_puzzle/) to r/Bitcoin with the address and 0.26 BTC in it. Alistair Milne paid for the prize. The location stays secret. "Not very hard to find", says the author. Six days later the coins are gone.
Base64 fell immediately. AES needed the key, so they emailed the address painted at the bottom right. Caesar took longer than it should have. They kept testing the first three letters as `ATQ`, and they were `ATO`. Once read right, the keys `g` and `h` gave `union` and `citoyen`.
await verify(mural!); // { verified: true, derivedAddress: "1NqPwPp7hEXZ3Atj77Ue11xAEMmXqAXwrQ", вЂ¦ }
The French authorities painted over the mural in February 2019. The address kept getting coins. 1,000 sats in September 2019, gone two days later. In December 2019 someone sent 0.0578 BTC to a key the whole internet had read. It left in the same block, with 0.0031 BTC of that as a fee. A bot, most likely, and a fast one.
The prize is the 0.28916308 BTC the claim spent: about 0.26 BTC on January 6, plus the top-ups during the hunt. The first deposit was 26,300 sats on January 2, and the record calls that one `funding`. Both came before the post, so `preGenesis` is set. `startedAt` is the announcement page, 22:42:07 UTC. Every hint keeps its original language. Antoine is the record's solver. Marina appears by name in his record, because a puzzle holds one solver.
- files=1, data-files=0, log=False

## logicbeach-powerful-moss-0-54eth
# LogicBeach: Powerful Moss
- `0x831102C7eb86f9EC8f79dF891bDeA187D54344Dd` вЂ” prize contract | expected: 0.25 ETH minimum, growing toward the full contract balance | state: contract-holds-funds (checked 2026-08-16) | https://basescan.org/address/0x831102C7eb86f9EC8f79dF891bDeA187D54344Dd
- 2025-01-24 вЂ” LogicBeach, launch-period tweet (8 people have discovered the POAP) вЂ” https://x.com/Logic_Beach/status/1882824094854557885
- Folder: https://github.com/floflo777/open-crypto-puzzles/tree/main/2-mid-prizes/logicbeach-powerful-moss-0-54eth
- README (raw): https://raw.githubusercontent.com/floflo777/open-crypto-puzzles/main/2-mid-prizes/logicbeach-powerful-moss-0-54eth/README.md
- **РЎС‚Р°С‚СѓСЃ**: РѕС‚РєСЂС‹С‚Рѕ (contract-holds-funds, РїСЂРѕРІРµСЂРµРЅРѕ 16.08.2026)
  - X: https://x.com/Logic_Beach/status/1882824094854557885
  - OCP: https://github.com/floflo777/open-crypto-puzzles/tree/main/2-mid-prizes/logicbeach-powerful-moss-0-54eth
- `address`: "0x635739254BDE27d28301f25aD57c3cAC3C3468f3"
- `status`: Status.Claimed
- `prize`: 0.5594043765685484
> LogicBeach's 2025 album on Donkey Kong Country 2 soundfonts hides twelve seed words in the music. The prize sat in a contract on Base for twenty months until somebody took all of it
January 17, 2025, 12:55 UTC. LogicBeach [casts on Farcaster](https://farcaster.xyz/logic-beach/0x57ab427d): "Let this Moss grow on you!" A new album is out on the usual streaming services, and the puzzle lives on [logicbeach.xyz](https://logicbeach.xyz/powerfulmoss). Twelve songs, twelve seed words hidden somewhere in them, and a prize on Base for whoever puts the words together.
The phrase derives one wallet. The page calls it the winner wallet, and only that wallet can pull the prize out of the contract. The contract also sells the album as an NFT, at least 0.01 ETH, and every mint goes into the prize.
- files=1, data-files=0, log=False

## lost-media-bfi-75-most-wanted
# Lost Media (BFI 75 Most Wanted, Doctor Who Рё РґСЂ.)
- files=1, data-files=0, log=False

## luckylurker-seed-riddles-80ksats
# LuckyLurker Seed Riddles
- `bc1q32e3dxcd0n2tlzdmchraf2057d0ax4xdwrk3jq` вЂ” main | expected: 80000 sats | state: swept (checked 2026-08-21) | https://mempool.space/address/bc1q32e3dxcd0n2tlzdmchraf2057d0ax4xdwrk3jq
- 2026-08-16 вЂ” Crypto casinos guide (hint 3 target) вЂ” https://luckylurker.com/crypto-casinos-guide/
- 2026-08-16 вЂ” Gamdom review (hint 5 target) вЂ” https://luckylurker.com/casino/gamdom/
- 2026-08-16 вЂ” N1 Casino review (hint 8 target) вЂ” https://luckylurker.com/casino/n1/
- 2026-08-16 вЂ” Fastest crypto casino withdrawals article (hint 9 target) вЂ” https://luckylurker.com/fastest-crypto-casino-withdrawals-2026/
- `status`: **solved**
- `prize`: 80000 sats (РѕС†РµРЅРєР° $50 РЅР° 2026-08-16) вЂ” single P2WPKH escrow, 2 funding transactions of 40,000 sats each
- `target_format`: BIP39 12 words (English), fixed 1:1 position mapping from the 12 published hints, most likely BIP84 m/84'/0'/0'/0/0 (script type v0_p2wpkh), no passphrase stated
  - https://mempool.space/address/bc1q32e3dxcd0n2tlzdmchraf2057d0ax4xdwrk3jq
- resolve each of the 12 labeled hints to one BIP39 word at its stated position, then derive the 12-word mnemonic to a Bitcoin address
  - title: Wait for or request the site's own canonical answer to the 8 riddles | status: open
  - title: Re-check the other 8 riddle-linked articles for the same italic-tag device | status: open
- The puzzle page and 4 target review articles are the site's own published pages; only short verbatim hints and a table of the marked words are included, no full page content.
- files=1, data-files=0, log=False

## luckylurker-vault-1-0-0008btc
# LuckyLurker Bitcoin Vault #1
- files=1, data-files=0, log=False

## luckylurker-vault-2-1btc
# LuckyLurker Bitcoin Vault #2
- РџСЂРѕРІРµСЂРєР° Р±Р°Р»Р°РЅСЃР°: https://mempool.space/address/bc1qnepv9pcnqvndux9h9mcaxvk6u993rc0lew9fpp
  - https://luckylurker.com/bitcoin-vault-2/ Рё https://luckylurker.com/bitcoin-vault-2-is-live-1-btc-prize/ вЂ” Р·Р° SG-РєР°РїС‡РµР№, С‡РёС‚Р°С‚СЊ Р±СЂР°СѓР·РµСЂРѕРј;
> Paul Jones's Bitcoin Vault puzzles. Verify Vault 1's Electrum seed and claimed prize. Vault 2 has 1 BTC with public hints due October 12.
Two vaults, two different states: the first is solved, the second has a funded 1 BTC prize. Both come from [Paul Jones](https://luckylurker.com/author/paul-jones/), identified on LuckyLurker's [About page](https://luckylurker.com/about-us/) and posting as [Paul_LuckyLurker on Bitcointalk](https://bitcointalk.org/index.php?action=profile;u=3750819).
The phrase has [Electrum seed version](https://electrum.readthedocs.io/en/latest/seedphrase.html) `100`. With an empty passphrase, **m/0'/0/1** gives the funded address: the second receiving address, not the first. [Electrum's mnemonic code](https://github.com/spesmilo/electrum/blob/master/electrum/mnemonic.py) uses the salt `electrum`, and its [keystore](https://github.com/spesmilo/electrum/blob/master/electrum/keystore.py) starts this account at `m/0'`. BIP84 isn't the right path here.
This check uses `@scure/bip32` 2.4.0 and `@agntn/keys` 0.3.0. It matches both the funded address and the public key exposed in the claim transaction.
assert.equal(bitcoin.getAddress(pubkey, "segwit"), "bc1q32e3dxcd0n2tlzdmchraf2057d0ax4xdwrk3jq");
The record keeps these twelve words as `seed(...).electrum()`. `verify()` runs the same derivation through `@agntn/keys`. Or skip the plumbing: `verify(await requirePuzzle("luckylurker/vault-1"))` says `verified: true`. Paul published words. Now the record holds words too, not a hex nobody printed. This is a public solved puzzle, not a wallet to reuse.
### The 80,000-satoshi prize and claim
The [claim transaction](https://mempool.space/tx/75e570a5ea243c492e2804916482f046b2392b463c51be15624e6e25a84119f7) spent two 40,000-satoshi outputs on August 17, 2026 at 18:08:09 UTC. It paid 79,638 sats to `17oKQHHRxdQBiRaGKCoVDQJfebhPaZV3r7` and 362 sats in fees. The prize was 80,000 sats, not the smaller payout. Paul confirmed the solve but didn't name the solver.
## Bitcoin Vault #2 and its 1 BTC prize
[Vault #2](https://luckylurker.com/bitcoin-vault-2/) uses `bc1qnepv9pcnqvndux9h9mcaxvk6u993rc0lew9fpp`. Its [funding transaction](https://mempool.space/tx/2314d7f0b76c4f29ed1cfb949fd2882d648712f5c6cbaef9d7dff8ddee46f198) deposited 1 BTC on August 12, 2026 at 14:19:56 UTC. On September 20 the address still held that BTC, with no spends.
The [launch announcement](https://luckylurker.com/bitcoin-vault-2-is-live-1-btc-prize/) was published on September 11 at 16:42:56 UTC, per the [publisher's metadata](https://luckylurker.com/wp-json/wp/v2/posts?slug=bitcoin-vault-2-is-live-1-btc-prize&_fields=date,date_gmt,link,title). That's the second puzzle's start date. Funding came earlier; public hints come later.
- files=1, data-files=0, log=False

## mapnificent-treasure-hunt-mth202610
# Mapnificent Treasure Hunt MTH202610
- **РђРґСЂРµСЃ/СЃРµС‚СЊ**: РЅРµ РєСЂРёРїС‚Р°. РџСЂРёР· РІС‹РїР»Р°С‡РёРІР°РµС‚ РѕСЂРіР°РЅРёР·Р°С‚РѕСЂ: В«This website will contact the winner to deliver the prizeВ». РЎРїРѕСЃРѕР± РІС‹РїР»Р°С‚С‹ РЅРµ СѓРєР°Р·Р°РЅ, KYC РЅРµ СѓРїРѕРјРёРЅР°РµС‚СЃСЏ. **РЎС‚Р°С‚СѓСЃ**: РѕС‚РІРµС‚ РѕС‚РїСЂР°РІР»РµРЅ, Р¶РґС‘Рј РёС‚РѕРіРѕРІ.
- files=1, data-files=0, log=False

## marianas-web
# Mariana's Web / РјРёС„РѕР»РѕРіРёСЏ РіР»СѓР±РѕРєРѕРіРѕ РІРµР±Р°
- files=1, data-files=0, log=False

## markovian-parallax-denigrate
# Markovian Parallax Denigrate (1996)
- files=1, data-files=0, log=False

## max-headroom-broadcast-hijacking
# Max Headroom Broadcast Hijacking (1987)
- files=1, data-files=0, log=False

## minecraft-arg
# Minecraft ARG (2019+)
- files=1, data-files=0, log=False

## mini-puzzles-retiredcoder
# RetiredCoder's mini-puzzles
- РћРїРёСЃР°РЅРёРµ: Seven small puzzles RetiredCoder posted on Bitcointalk from 2024 to 2026. Four are built on a Bitcoin puzzle key the author already held and pay the Bitcoin Cash still sitting on that puzzle's address, three put 0.01 BTC on a fresh key.
- `address`: p2pkh("bitcoincash:qz3yjg59ypg6jqpwhaxgvjj44jm4hdx0w5wsxw2qez", "a2492285вЂ¦b4cf75")
- `status`: Status.Solved
- `prize`: 1.3
> Seven small puzzles RetiredCoder posted on Bitcointalk from 2024 to 2026. Four are built on a Bitcoin puzzle key the author already held and pay the Bitcoin Cash still sitting on that puzzle's address, three put 0.01 BTC on a fresh key.
In 2023 somebody emptied puzzles 120 and 125 of the [Bitcoin puzzle transaction](https://puzzles.agntn.dev/collections/bits) and said nothing. In September 2024, 130 went the same way. A few weeks later a fresh Bitcointalk account called [RetiredCoder](https://puzzles.agntn.dev/authors/retired-coder) started posting mini-puzzles, one a month, each opening with "Guys, I'm bored today". The trick is where the prize was. Those addresses got their first coins before the August 2017 fork, so the same keys still unlocked a copy on Bitcoin Cash. Whoever holds the key to the BTC side holds the BCH side too. RetiredCoder had three such keys and gave the BCH away through riddles.
That's 30 hex characters, three of them wrong. Pick three positions, try every other hex digit in each and compare with something you already know about puzzle 120. kTimesG counted almost 14 million variants and asked how anyone checks the balance of all of them. You don't. RetiredCoder, blunt as usual: "If you don't know what is puzzle #120 and its address, well, you are out of the game." The public key of 120 has been on chain since 2019, so you compare pubkeys and never touch an explorer. "Correct, pubkey is the fastest way."
The real key is `b10f22572c497a836ea187f2e1fc23`. Positions 1, 9 and 21 were changed: `5` for `1`, `A` for `C`, `A` for `7`. The prize moved at 18:33 UTC. sneeky777 said "solved it in 3 mins" twelve minutes later and posted the key at 18:59. That was also the first time anybody saw the key of puzzle 120, over a year and a half after its BTC was taken.
[December 14](https://bitcointalk.org/index.php?topic=5522785), and this time "a bit more challenging". One message, one signature, both from the address of puzzle 130:
The thread ran four pages. First "a hint is in the message". Then "you should have some understanding of ECDSA signature vulnerabilities". Etar checked a weak nonce in 80 bits and found nothing. "Same K or weak K would be too easy." A day later, "don't take anything from the blockchain". A minute after that the thread saw the prize move, and the claim confirmed at 17:21 UTC. The winner never said a word, so the author [explained it](https://bitcointalk.org/index.php?topic=5522785.msg64850761#msg64850761) instead.
[January 14, 2025](https://bitcointalk.org/index.php?topic=5526453), 17:22 UTC. No more puzzle keys to give away, so this time it's a public key made for the occasion, with 0.01 BTC on its address:
"You don't even need GPUs or fast PC." And probably no ECDSA, that was the last one. iceland2k14 went through what it isn't: no endomorphism image below 53 bits, none near a bit boundary, none a hash of the title. The prize moved at 08:41 UTC the next morning, and an hour later ukn9977 posted the answer as a Sage one-liner: `k = k*LAMBDA+1`.
where A (lowest bits of privkey) - some 64bit value
- files=1, data-files=0, log=False

## natasha-otomoski-1btc
# Natasha Otomoski puzzle, 1 BTC
- `address`: "179sxfh6rw6bHSo5wVUhLP96k46QaEzVP"
- `status`: Status.Solved
- `prize`: 1
That's it. No picture, no riddle chain, no second clue. Just a comb, a woman nobody heard of, and a file extension. And **1 BTC** on the address.
Sounds easy? Eight English words, camel case, exactly 32 letters. Pick the wrong one and you get a random address and zero feedback.
### The prize moves first
ligor posted the hex, akkort posted the WIF. Both are on the record as published, so no `.derived()`. `verify()` turns the hex into the address and says `OK`.
  address: "179sxfh6rw6bHSo5wVUhLP96k46QaEzVP",
  status: Status.Solved,
  prize: 1,
A claim plus a published key is `solved`. In May 2026 someone dropped 780 satoshis on the address and swept them in the same block. The key is public, so anyone could. The record keeps both, so `puzzles watch` has nothing to report.
- files=1, data-files=0, log=False

## neuro-sama-arg
# Neuro-sama ARG (2023-2024)
- files=1, data-files=0, log=False

## nist-seeds-bounty-valsorda
# NIST seeds bounty (Filippo Valsorda)
- **Р¤Р°Р№Р»С‹/СЃРєСЂРёРїС‚С‹**: `/workspace/projects/89da3155-7b64-41d5-9823-4200239c1884/work/nist_seeds/NOTES.md`, `search.c`, `search` (aarch64 musl), `gen_phrases.py`, `gen_phrases2.py`, `phrases.txt`, `phrases2.txt`, `seeds15.txt`, `targets_all.txt`, `run1/`, `run2/`.
- files=1, data-files=0, log=False

## nuaza-bitcoin-fr-chasse-au-tresor-0-2024btc
# РќСѓР°Р·Р° / bitcoin.fr В«Chasse au trГ©sorВ»
- РџСЂРѕРІРµСЂРєР° Р±Р°Р»Р°РЅСЃР°: https://mempool.space/address/bc1q8zfy6wvvtskzkg4s343x42pyf363nmejspgc02
    | 20вЂ“21 | РіР». 4 В«Г‰nergieВ» | physique (reward), source (thrive) |
- files=1, data-files=0, log=False

## objective-thune-licorne-0-21btc
# Objective Thune: Le Secret de la Licorne
- the mechanism is fully specified and the oracle is ready; what is missing is which 3 of the 210 physical book copies hold the keys, a physical fact, not a computation
- `3Jf995GANG4EmFBK89byNNyZdtB3ELXJsZ` вЂ” main | expected: 0.21021 BTC (21,021,000 sats) | state: funded-unspent (checked 2026-08-16) | https://mempool.space/address/3Jf995GANG4EmFBK89byNNyZdtB3ELXJsZ
- 2026-08-16 вЂ” mempool.space, escrow address вЂ” https://mempool.space/address/3Jf995GANG4EmFBK89byNNyZdtB3ELXJsZ
- `status`: **dead-end** (dead-end: unobtainable-material)
- `prize`: 0.21021 BTC (РѕС†РµРЅРєР° $13243 РЅР° 2026-08-16) вЂ” P2SH escrow, 2 funding transactions: 2020-01-03 (21,000,000 sats) and 2020-06-19 (21,000 sats)
- `target_format`: 3 private keys, physically hidden in 3 of 210 numbered book copies; their public keys form a Bitcoin Core 0.18.1-style P2SH multisig redeem script (M-of-3, key order not sorted)
- `difficulty_note`: the mechanism is fully specified and the oracle is ready; what is missing is which 3 of the 210 physical book copies hold the keys, a physical fact, not a computation
  - https://mempool.space/address/3Jf995GANG4EmFBK89byNNyZdtB3ELXJsZ
  - title: write to the authors or the publisher: has the lot ever been claimed | status: open
  - title: the 2025 CC BY-SA print-files zip (currently 404, not archived) | status: open
  - title: locate a physical numbered collector copy and inspect it | status: open
  - title: re-read the authors' and publisher's social accounts for a claim mention | status: open
  - url: https://mempool.space/address/3Jf995GANG4EmFBK89byNNyZdtB3ELXJsZ | title: mempool.space, escrow address | date: 2026-08-16
- files=1, data-files=0, log=False

## oct282011-com
# Oct282011.com (2011)
- files=1, data-files=0, log=False

## onfo-forsyth-1btc
# ONFO / Dr. J.R. Forsyth Bitcoin Treasure Hunt
- half of the announced material (segments 6 to 10) was never published, and the sole self-declared key holder died in 2023; no known method applies to an incomplete corpus
- `157dpLJgAAKugukKz8UwBHapM4idyZvnLc` вЂ” the announced prize wallet | expected: 1 BTC | state: funded-unspent (checked 2026-08-16) | https://mempool.space/address/157dpLJgAAKugukKz8UwBHapM4idyZvnLc
- `status`: **dead-end** (dead-end: author-deceased-unfinished)
- `prize`: 1 BTC (РѕС†РµРЅРєР° $63000 РЅР° 2026-08-16) вЂ” reported in contemporaneous coverage as funded from the author's personal funds, not a company treasury
- `target_format`: a Bitcoin private key, format not specified by the author (WIF or hex), matching P2PKH address 157dpLJgAAKugukKz8UwBHapM4idyZvnLc
- `difficulty_note`: half of the announced material (segments 6 to 10) was never published, and the sole self-declared key holder died in 2023; no known method applies to an incomplete corpus
- `157dpLJgAAKugukKz8UwBHapM4idyZvnLc` вЂ” escrow | the announced prize wallet | РѕР¶РёРґР°РµС‚СЃСЏ: 1 BTC | РїСЂРѕРІРµСЂРµРЅРѕ 2026-08-16: **funded-unspent**
  - https://mempool.space/address/157dpLJgAAKugukKz8UwBHapM4idyZvnLc
- files=1, data-files=0, log=False

## oobit-139-bitcoinpuzzles-io-0-01545btc
# Oobit 139 (bitcoinpuzzles.io)
- РџСЂРѕРІРµСЂРєР° Р±Р°Р»Р°РЅСЃР°: https://mempool.space/address/1KKtnqLdK17ndRRwF8zaKZH6FSkSmTN6fk
- **РњРµС…Р°РЅРёР·Рј**: 12 СЃР»РѕРІ = РѕР±СЉРµРєС‚С‹ РЅР° РіР»Р°РІРЅРѕР№ РєР°СЂС‚РёРЅРєРµ (РєРѕР№РѕС‚ СЃ РїР°РЅС†РёСЂРµРј С‡РµСЂРµРїР°С…Рё РІ РїСѓСЃС‚С‹РЅРµ) + РІ 6 СЃРєСЂС‹С‚С‹С… РєР»РёРїР°С… + СЃР»РѕРІР°, СЃРїСЂСЏС‚Р°РЅРЅС‹Рµ РІРЅРµ РєР°СЂС‚РёРЅРєРё. РћС‚РІРµС‚ РЅР° СЃР°Р№С‚Рµ РІРІРѕРґРёС‚СЃСЏ Р·Р° 1 cacatal, РјС‹ РїСЂРѕРІРµСЂСЏРµРј РѕС„Р»Р°Р№РЅ РїРѕ Р°РґСЂРµСЃСѓ. РћРїРёСЃР°РЅРёРµ: В«Oobit Challenge [1]+3 / Oobit allows you to pay with crypto anywhere that accepts VisaВ® / Prize: 1,545,000 Satoshis / m/44'/0'/0'/0/0В» (СЃРјС‹СЃР» В«[1]+3В» РЅРµ СѓСЃС‚Р°РЅРѕРІР»РµРЅ).
  - https://blockchair.com/bitcoin/address/1KKtnqLdK17ndRRwF8zaKZH6FSkSmTN6fk
- files=158, data-files=157, log=False

## operation-mindfuck-illuminatus
# Operation Mindfuck / Illuminatus-РєСѓР»СЊС‚СѓСЂР°
- files=1, data-files=0, log=False

## paradigm-kryptos-ctf-pk1-pk10
# Paradigm Kryptos CTF (PK1-PK10)
  - РѕР±РѕР·РЅР°С‡РµРЅРёРµ **В«PK1-PK10В» РЅР° РѕС„РёС†РёР°Р»СЊРЅС‹С… СЃС‚СЂР°РЅРёС†Р°С… РЅРµ РІСЃС‚СЂРµС‡Р°РµС‚СЃСЏ** вЂ” С‚Р°Рј РїСЂРѕСЃС‚Рѕ В«10 puzzlesВ» Рё В«$1,000 prize eachВ».
- files=1, data-files=0, log=False

## path-to-greatness-treasure-hunt-3ltc
# Path to Greatness: Treasure Hunt
- РџСЂРёРјРµС‡Р°РЅРёРµ: 302,608,794 litoshis. The pot is topped up by the public: the site invites donations straight into the prize address, which is why there are 8 incoming transactions. LTC was $54.17 when I read the price on 2026-09-12; the repository snapshot price of $54 is used here.
- РћРїСѓР±Р»РёРєРѕРІР°РЅРѕ: 2021-07-25 https://reddit.com/r/ARG/comments/orgh1k/i_made_a_treasure_hunt_with_a_crypto_prize/
- `LUtL7qnm3gzxKjHcfVLSjydqhhinTVmTmS` вЂ” prize | expected: 302,608,794 litoshis received over 8 transactions, 0 spent | state: funded-unspent (checked 2026-09-12) | https://litecoinspace.org/address/LUtL7qnm3gzxKjHcfVLSjydqhhinTVmTmS
- 2021-07-25 вЂ” I made a treasure hunt with a crypto prize, r/ARG announcement вЂ” https://reddit.com/r/ARG/comments/orgh1k/i_made_a_treasure_hunt_with_a_crypto_prize/
- 2026-09-09 вЂ” p2gtreasure.com, clues, rules and donation address вЂ” https://p2gtreasure.com/
- 2026-09-12 вЂ” Escrow on litecoinspace, funded and unspent вЂ” https://litecoinspace.org/address/LUtL7qnm3gzxKjHcfVLSjydqhhinTVmTmS
- Folder: https://github.com/floflo777/open-crypto-puzzles/tree/main/2-mid-prizes/path-to-greatness-treasure-hunt-3ltc
- README (raw): https://raw.githubusercontent.com/floflo777/open-crypto-puzzles/main/2-mid-prizes/path-to-greatness-treasure-hunt-3ltc/README.md
- **РСЃС‚РѕС‡РЅРёРєРё**: СЃР°Р№С‚ p2gtreasure.com (+ /old/p2g.html); OCP `github.com/floflo777/open-crypto-puzzles/tree/main/2-mid-prizes/path-to-greatness-treasure-hunt-3ltc` (README, analysis/leads.md, tested.md в‰€5,7В·10В№ВІ РЅРµРіР°С‚РёРІРѕРІ, tools/oracle.py); РґРµРјРѕ РёРіСЂС‹ (Unity, Google Drive id `15B7i1EU7OUpc1SXYmSccRLDku4199cSB`, 134 РњР‘); YouTube-РєР°РЅР°Р» Р°РІС‚РѕСЂР° UCrwC8bYZ_Yyum9gj4OHVEiQ (3 РІРёРґРµРѕ: T98D6Otefgs Р°РЅРѕРЅСЃ 05.02.2021, LxcJ3eqM2Rc В«SolovilleВ», EojQgdZeTyM В«Seconds of DreamВ»); РІС‚РѕСЂРѕР№ РєР°РЅР°Р» Р°РІС‚РѕСЂР° @jpatt194 (UCd31L914iVvaFMwEbN-7izQ, РїРѕР»РЅС‹Р№ Р°Р»СЊР±РѕРј Archaic Reveries lS7VW3az4Zs). РђР»СЊР±РѕРјС‹ Р°РІС‚РѕСЂР°: В«Seconds of DreamВ» (iTunes 1548289299, 13 С‚СЂРµРєРѕРІ) Рё В«Archaic ReveriesВ» (1398628401, 8 С‚СЂРµРєРѕРІ).
- `address`: "LUtL7qnm3gzxKjHcfVLSjydqhhinTVmTmS"
- `prize`: 3.02608794
> A 2021 Litecoin treasure hunt from an indie game developer. The clues sat inside a parkour game demo and later on the hunt's page as nine images. Nobody has taken the prize.
The prize is whatever that wallet holds. Donations raise it, and it has only grown. Nothing has ever left the address.
- files=1, data-files=0, log=False

## peter-todd-hash-collision-bounties-0-59btc
# Peter Todd Hash Collision Bounties
- `35Snmmy3uhaer2gTboc81ayCip4m9DT4ko` вЂ” SHA-256 | expected: 0.27734251 BTC | state: funded-unspent (checked 2026-08-16) | https://mempool.space/address/35Snmmy3uhaer2gTboc81ayCip4m9DT4ko
- `3KyiQEGqqdb4nqfhUzGKN6KPhXmQsLNpay` вЂ” RIPEMD-160 | expected: 0.11576888 BTC | state: funded-unspent (checked 2026-08-16) | https://mempool.space/address/3KyiQEGqqdb4nqfhUzGKN6KPhXmQsLNpay
- `39VXyuoc6SXYKp9TcAhoiN1mb4ns6z3Yu6` вЂ” HASH160 (RIPEMD160(SHA256())) | expected: 0.10026873 BTC | state: funded-unspent (checked 2026-08-16) | https://mempool.space/address/39VXyuoc6SXYKp9TcAhoiN1mb4ns6z3Yu6
- `3DUQQvz4t57Jy7jxE86kyFcNpKtURNf1VW` вЂ” HASH256 (SHA256(SHA256())) | expected: 0.10026873 BTC | state: funded-unspent (checked 2026-08-16) | https://mempool.space/address/3DUQQvz4t57Jy7jxE86kyFcNpKtURNf1VW
- `37k7toV1Nv4DfmQbmZ8KuZDQCYK9x5KpzP` вЂ” SHA-1 (reference sibling, claimed 2023-02-22, not part of the live prize) | expected: 0 BTC (fully spent) | state: swept (checked 2026-08-16) | https://mempool.space/address/37k7toV1Nv4DfmQbmZ8KuZDQCYK9x5KpzP
- 2013-09-13 вЂ” REWARD offered for hash collisions for SHA1, SHA256, RIPEMD160 and other вЂ” https://bitcointalk.org/index.php?topic=293382.0
- 2026-08-16 вЂ” mempool.space, 4 live escrow addresses and the SHA-1 reference вЂ” https://mempool.space/address/35Snmmy3uhaer2gTboc81ayCip4m9DT4ko
- Folder: https://github.com/floflo777/open-crypto-puzzles/tree/main/1-big-prizes/peter-todd-hash-collision-bounties-0-59btc
- README (raw): https://raw.githubusercontent.com/floflo777/open-crypto-puzzles/main/1-big-prizes/peter-todd-hash-collision-bounties-0-59btc/README.md
- `address`: p2sh(
- `status`: Status.Claimed
- `prize`: 2.48
In September 2013 Peter Todd funded six P2SH addresses. Five pay out to anyone with a hash collision: two different preimages, same value under SHA-1, SHA-256, RIPEMD-160, HASH160 or HASH256. The sixth pays for an `OP_ABS` quirk, no collision needed. It's a bounty on the hash function itself. The prize sits on chain where anyone can top it up, and people did.
- files=1, data-files=0, log=False

## phemex-dorian-nakamoto
# Phemex Dorian Nakamoto 2.1 BTC puzzle
- `1h8BNZkhsPiu6EKazP19WkGxDw3jHf9aT` вЂ” None | expected: None | state: swept (checked 2026-08-16) | https://mempool.space/address/1h8BNZkhsPiu6EKazP19WkGxDw3jHf9aT
- `address`: "1h8BNZkhsPiu6EKazP19WkGxDw3jHf9aT"
- `status`: Status.Expired
- `prize`: 1.1
### A portrait, an address and a split prize
The [rules page](https://phemex.com/announcements/try-to-solve-our-2-btc-puzzle) gives you the picture and the address `1h8BNZkhsPiu6EKazP19WkGxDw3jHf9aT`. The 2.1 BTC is two prizes. 1.1 BTC sits on the address. Take the key and move it. The other 1 BTC lands on your Phemex account, once you prove you hold the key.
Every step reruns. `@agntn/encodings` decodes both words, BigInt does the rest. `puzzles verify satoshi-maze` derives the compressed key and lands on the address. The key on the record is padded to 64 hex digits, nothing else changed.
The address got a 10,000 sat test on January 16, 2020. It spent 7,900 of it two hours later. That spend put the public key on chain the same morning. At 06:53 UTC came the 1.1 BTC. The rules page went up at 08:24.
On March 21 at 02:31 UTC, 1.099 BTC left in one transaction. The Ending went up at 02:47. It says "with the release of this information, the prize money will no longer be available". The Ending doesn't name a txid. But nobody had won, and the money went 16 minutes before the key came out. So the record calls that spend a `decrease`, the author taking the prize back.
In between, people sent the address 84 tiny payments. 53 of them are exactly 666 sat. Somebody also dropped 30,000 sat on January 22. With the 90,000 sat change from the withdrawal, 198,300 sat were left. At 05:17 UTC all of it went out in one transaction. The key had been public for two and a half hours. Anyone could have done it, so the record calls it a `sweep`.
Nothing is left on the address. `status` is `expired`, the same as the [book quiz](https://puzzles.agntn.dev/collections/book-quiz). The prize went home, then the answer came out.
  address: "1h8BNZkhsPiu6EKazP19WkGxDw3jHf9aT",
  status: Status.Expired,
- files=1, data-files=0, log=False

## picture-puzzle-1mbtc
# 1 mBTC picture puzzle
- `address`: "1MeQumbMGbTDPUNtBbLwzfyZqeeZzpRnex"
- `status`: Status.Solved
- `prize`: 0.001
December 23, 2013, 05:40 UTC. r/bitcoinpuzzles is seven hours old and givesadvice4bitcoin [posts a picture](https://www.reddit.com/r/bitcoinpuzzles/comments/1tifs1/easy_1mbtc_picture_puzzle/). "It's a very easy puzzle, but it may be a little harder than it first appears." One image, an address with **1 mBTC**, marked easy. The funding confirmed 81 seconds after the post.
The QR code holds 56 binary digits. Decode them as bytes and you get "36 down". The author's edit says the code "needs to be used two different ways", and the first is "as is": the digits themselves are the page number. `directory.io/00110011вЂ¦01101110`. Then the decoded "36 down" says which row.
  address: "1MeQumbMGbTDPUNtBbLwzfyZqeeZzpRnex",
  status: Status.Solved,
  prize: 0.001,
The solution in the post stops at the page and never prints the key. So the key on the record is the author's recipe run once, and `verify` checks it against the address.
One catch. Read the page number as decimal and the 36th key down isn't the prize address. Read it as octal and it is. Probably the leading zero, which is how C and PHP mark an octal number. A page starts at key `128 * (page - 1)`, row 36 adds 35, and the key derives `1MeQumbMGbTDPUNtBbLwzfyZqeeZzpRnex` uncompressed. That's also the public key the claim signed with.
- files=1, data-files=0, log=False

## pindar-van-arman-cryptoartgan-nft
# Pindar Van Arman: cryptoArtGAN Act 1 Puzzle
- РџСЂРёРјРµС‡Р°РЅРёРµ: 1 ERC-1155 NFT, "Magic Internet moneyGAN" (445/512); no market value recorded for this specific piece
- the derivation is standard and fully understood; what is unresolved is which 11 published words are the 'glitches' and their order. About 22.5 million addresses and 9 fully-ordered 11-word sets have been checked with zero matches
- `0x18f87ec9c527aba1db44f715456bf28b0dae478d` вЂ” main | expected: 1 NFT (Magic Internet moneyGAN, 445/512) | state: funded-unspent (checked 2026-08-16) | https://etherscan.io/address/0x18f87ec9c527aba1db44f715456bf28b0dae478d
- 2022-08-25 вЂ” Restated on X вЂ” https://x.com/VanArman/status/1562799956175757313
- Folder: https://github.com/floflo777/open-crypto-puzzles/tree/main/2-mid-prizes/pindar-van-arman-cryptoartgan-nft
- README (raw): https://raw.githubusercontent.com/floflo777/open-crypto-puzzles/main/2-mid-prizes/pindar-van-arman-cryptoartgan-nft/README.md
  - X: https://x.com/VanArman/status/1562799956175757313 (25.08.2022)
  - OCP: https://github.com/floflo777/open-crypto-puzzles/tree/main/2-mid-prizes/pindar-van-arman-cryptoartgan-nft
- `status`: **open**
- `prize`: 1 NFT (РѕС†РµРЅРєР° $None РЅР° 2026-08-16) вЂ” 1 ERC-1155 NFT, "Magic Internet moneyGAN" (445/512); no market value recorded for this specific piece
- `target_format`: BIP39 12 words (English), standard Ethereum derivation, no passphrase stated
- `difficulty_note`: the derivation is standard and fully understood; what is unresolved is which 11 published words are the 'glitches' and their order. About 22.5 million addresses and 9 fully-ordered 11-word sets have been checked with zero matches
  - https://etherscan.io/address/0x18f87ec9c527aba1db44f715456bf28b0dae478d
- files=1, data-files=0, log=False

## platos-solid
# Plato's Solid вЂ” РќР• РџРћР”РўР’Р•Р Р–Р”Р•РќРћ (РёСЃС‚РѕС‡РЅРёРєРѕРІ РЅРµ РЅР°Р№РґРµРЅРѕ)
- files=1, data-files=0, log=False

## project-architeuthis
# Project Architeuthis (US Navy, 2014)
- files=1, data-files=0, log=False

## proof-of-writing
# Proof of Writing
- `address`: p2pkh("ecash:qq5r308v2mkh6x5mkqpr6wytszz6f9r7qcnfttev0z", "2838bcecвЂ¦a4947e06")
- `status`: Status.Solved
- `prize`: 30068000.94
> An essay about the eCash community with twelve seed words on its diagonal. Nobody read it that way for eighteen months and the prize grew to 30 million XEC before it went.
That morning 5,000,000 XEC lands in a Cashtab wallet. Then nothing happens for a year and a half, except the prize keeps growing. **30,068,000.94 XEC** by August 2026, gone in one transaction on August 26.
Second one came with the relaunch on April 14, 2026. cain moved the article to the new Proof Of Writing, put the address on top and added: "It can be solved without ai or a computer". Plus 10M XEC that morning, 10M more in June and 5M on August 20. That last 5M had six days of life left.
Twelve words and you're done? Not really. eCash's registered coin type is 899, so every textbook tells you `m/44'/899'/0'/0/0`. That address is empty, never funded. Cashtab has made every new wallet on `m/44'/1899'/0'/0/0` since [March 2024](https://reviews.bitcoinabc.org/D15679), and that's where the prize was sitting. So you can have the right seed, check the textbook path, see zero and throw the answer away. Same trap as the [Movie Enigma](https://puzzles.agntn.dev/collections/movie-enigma) checksum, one level deeper.
  address: p2pkh("ecash:qq5r308v2mkh6x5mkqpr6wytszz6f9r7qcnfttev0z", "2838bcecвЂ¦a4947e06"),
  status: Status.Solved,
  prize: 30068000.94,
September 29, 2025, a small heart attack for anyone watching the address. 5,059,096.41 XEC goes out. Thirteen hours later 5,058,997.76 XEC comes back, both times with the XECX token along for the ride. Only the key holder could sign the first one, so it's a `decrease`, not a claim. False alarm, the puzzle stayed open.
Sixty-eight deposits of 1,000 XEC, most of them in March and July 2025, all but one with a `PAY` marker in the OP_RETURN. Small, and nobody called them prize money, so the record keeps the four real deposits and the round trip and skips the rest. They still count in `prize`, because that's what the claim transaction spent.
- files=1, data-files=0, log=False

## publius-enigma
# Publius Enigma (1994)
  - Р’ РѕРґРЅРѕРј РёР· РїРѕСЃС‚РѕРІ Р·Р°СЏРІР»РµРЅРѕ, С‡С‚Рѕ Сѓ Р°Р»СЊР±РѕРјР° РµСЃС‚СЊ В«central purpose and a designed solutionВ», Р° РЅР°С€РµРґС€РµРјСѓ РѕР±РµС‰Р°РЅ **В«unique prizeВ»**.
- files=1, data-files=0, log=False

## purebasic-t85211-600eur
# purebasic.fr t=85211 вЂ” 600 EUR
- files=1, data-files=0, log=False

## qday-steal-this-vault-solana
# QDay В«Steal this vaultВ» (Solana)
**QDay B37.** В«Q-Day Prize (1 BTC)В» Project Eleven вЂ” **РґСЂСѓРіРѕР№ РєРѕРЅРєСѓСЂСЃ**: РІС‹РґР°РЅ 24.04.2026 (Lelli, 15-Р±РёС‚РЅС‹Р№ РєР»СЋС‡) Рё Р·Р°РєСЂС‹С‚. РќРµ РїСѓС‚Р°С‚СЊ СЃ В«Steal this vaultВ». РСЃС‚РѕС‡РЅРёРє: `/workspace/projects/b6983d3d-52f5-48f8-9974-b99dc8e31c55/strategy/LOG.md`, Р·Р°РїРёСЃСЊ 16.10 18:15.
- files=1, data-files=0, log=False

## quizchain2-series
# Quizchain2
And then the fight. Under [block 6](https://puzzles.agntn.dev/collections/quizchain2/6) a throwaway account says scripts solve 90% of the blocks. True? Nobody can prove it either way. [Block 7](https://puzzles.agntn.dev/collections/quizchain2/7) names the author's altcoin, Grycoin, and a human gets there first. [Block 8](https://puzzles.agntn.dev/collections/quizchain2/8) is xkcd's most famous password, twice. [Block 9](https://puzzles.agntn.dev/collections/quizchain2/9) gets funded twice by accident, so 14 mBTC sit on one address. And [block 10](https://puzzles.agntn.dev/collections/quizchain2/10)? The worst received block of the whole experiment, by the author's own count. That takes some doing.
[Block 11](https://puzzles.agntn.dev/collections/quizchain2/11) has no question at all, and its answer is one space. Literally. Then the first mistake of the run. [Block 12](https://puzzles.agntn.dev/collections/quizchain2/12) gets a capitalization hint wrong, `Grycoin` where the hash wants `grycoin`. That costs the author a 77 mBTC [block 14](https://puzzles.agntn.dev/collections/quizchain2/14), fourteen characters cut out of the genesis address.
In between, [block 16](https://puzzles.agntn.dev/collections/quizchain2/16) digs up a vanity address from 2012. [Block 17](https://puzzles.agntn.dev/collections/quizchain2/17) looks into the Mona Lisa's right eye. [Block 18](https://puzzles.agntn.dev/collections/quizchain2/18) asks for one word, `Third.` [Block 20](https://puzzles.agntn.dev/collections/quizchain2/20) quotes an address that fails its own checksum. Who needs a valid address to burn coins?
[Block 21](https://puzzles.agntn.dev/collections/quizchain2/21) has a question that says it has no question. The answer is `21 million`, and the hard part is the TOMI field. Players hate it. The author keeps it. Then [block 22](https://puzzles.agntn.dev/collections/quizchain2/22) skips the field and pays for it. A player had the address on a list of old guesses and claimed it four hours before the post. So every block after it gets a TOMI field. Lesson learned.
Riddles first. [Block 31](https://puzzles.agntn.dev/collections/quizchain2/31) says `oxen` and means the Veronese riddle, a thousand years old. [Block 32](https://puzzles.agntn.dev/collections/quizchain2/32) rewards anyone who remembers the first run: `Omnipotent`, the answer its block 22 should have had. Gone in eleven minutes.
Atbash shows up once more. [Block 34](https://puzzles.agntn.dev/collections/quizchain2/34) reads the foldover two places to the right and survives almost a day. [Block 36](https://puzzles.agntn.dev/collections/quizchain2/36) is pure wordplay, `bit` after `de`, `or` and `ha`, and players call it fair. Rare praise. [Block 38](https://puzzles.agntn.dev/collections/quizchain2/38) takes `ACE` from a Pieter Wuille tweet. And [block 40](https://puzzles.agntn.dev/collections/quizchain2/40)? `hodl`, solved at sight, with a double spend race for the prize. Who else could close a stretch like this?
[Block 50](https://puzzles.agntn.dev/collections/quizchain2/50) makes up for it. Twenty-one ones, a valid address once you add the checksum. The answer is `4oLvT2`. Fair, clever and gone in under three hours. Isn't that the whole point?
The prizes count up now. Each block pays the cross sum of its number, 8 mBTC for [block 71](https://puzzles.agntn.dev/collections/quizchain2/71) up to 12 for [block 75](https://puzzles.agntn.dev/collections/quizchain2/75). Block 71 asks `not zero` and wants `net zero`. One player had it, but wrote `carbon-neutral` with a hyphen. Correct English, wrong hash.
Then the big ones. [Block 76](https://puzzles.agntn.dev/collections/quizchain2/76) pays 77 mBTC for `change to`. One public guess matched both posted checksums and still missed the address. The coins sat there for seven years. They moved in August 2026, and nobody has said how.
[Block 77](https://puzzles.agntn.dev/collections/quizchain2/77) came early, on July 7, and in two stages. Stage One is Hal Finney's "Bitcoin and me", read as a puzzle by Satoshi. It went seven minutes after [Grycoin block 2](https://puzzles.agntn.dev/collections/grycoin/2) showed the format, to the same address. The winner kept the tricky bits to themselves. Seven years later a player who didn't win wrote the hash down anyway, and the claim's key backs it. Stage Two, the 777 mBTC block, is [a puzzle of its own](https://puzzles.agntn.dev/collections/real-big-block) and still waits. Up for it?
The first run switched to MD5 at block 15 by accident and just kept it. The second run doesn't even pretend. Every block hashes its string with MD5, feeds the 16 bytes to Ian Coleman's BIP39 tool as entropy and takes `m/44'/0'/0'/0/0`. Twelve words, one address, done.
A few keys got printed. Block 2's sits in a player's walkthrough. Block 3's shows up in the block 4 thread, because block 4's answer hides inside it. Sneaky. And the author printed block 6's key as the link for block 8. Block 12's key came from a player who posted the string, the address and the WIF right after the claim.
The rest end in `.derived()`. Nobody printed them, so the record runs the published recipe on the published answer. The chain keeps it honest. The WIF has to give the funded address, and its public key has to match the one the claim revealed. Nobody can fake that, the author included.
- files=1, data-files=0, log=False

## quizchain-series
# Quizchain
- `address`: "16NLaozWwi4JSTRMnMfi3oCkBjXBWVFgYR"
- `status`: Status.Solved
- `prize`: 0.007
Here's the trick. You answer the question, glue on a piece of the previous block's key and hash the lot. That hash is the seed, and the first address holds the prize. So you can't open a block without the key of the one before it. That's the chain.
One question per block, the answer plus three characters of the previous key, SHA-256, entropy. [Block 1](https://puzzles.agntn.dev/collections/quizchain/1) gave the answer away and hid the work in the author's favorite address. [Block 4](https://puzzles.agntn.dev/collections/quizchain/4) put two words inside one kanji. [Block 6](https://puzzles.agntn.dev/collections/quizchain/6) held out overnight with two very plain words. [Block 7](https://puzzles.agntn.dev/collections/quizchain/7) paid 77 mBTC for a question about the handle. Then [block 9](https://puzzles.agntn.dev/collections/quizchain/9) and [block 10](https://puzzles.agntn.dev/collections/quizchain/10) both broke on a line break the author copied into the hash.
Short answers were too easy to brute force, so the format grew a field. First BotFU in [block 30](https://puzzles.agntn.dev/collections/quizchain/30), then BFUB from [block 31](https://puzzles.agntn.dev/collections/quizchain/31) on: a short hint that only makes sense once you know the answer. [Block 34](https://puzzles.agntn.dev/collections/quizchain/34) found `Hoax` inside a prize address. [Blocks 39 to 41](https://puzzles.agntn.dev/collections/quizchain/39) were the first real chain, no links given. [Block 44](https://puzzles.agntn.dev/collections/quizchain/44) was an empty answer and a line from Du Hast, and it held for 23 days.
From [block 59](https://puzzles.agntn.dev/collections/quizchain/59) the link is the whole previous key, so nothing short can be guessed anymore. Atbash words, a road block in [block 66](https://puzzles.agntn.dev/collections/quizchain/66) that locked [block 67](https://puzzles.agntn.dev/collections/quizchain/67) for a day, Lord of the Rings, The Da Vinci Code and Agatha Christie. The prize climbed with the cross sum of the block number, up to 76 mBTC for [block 76](https://puzzles.agntn.dev/collections/quizchain/76).
### Block 77: the genesis address
[Block 77](https://puzzles.agntn.dev/collections/quizchain/77), 77 mBTC, turned the genesis address into a puzzle the author credits to Satoshi. It took ten hints and two and a half months, and the answer has Hal Finney in it.
  address: "16NLaozWwi4JSTRMnMfi3oCkBjXBWVFgYR",
  status: Status.Solved,
    source(SOLUTION, "SHA-256 of answer b) with the last three characters of the address appended"),
  prize: 0.007,
- files=1, data-files=0, log=False

## rcodes-1ojeu3c-5usd
# r/codes 1ojeu3c
- files=1, data-files=0, log=False

## rcodes-1tk3up2-500usd
# r/codes 1tk3up2 В«$500 first to solveВ»
- files=18, data-files=10, log=True

## rectorsquid-arrow-puzzle-50usd
# rectorsquid Arrow Puzzle (2012)
- files=1, data-files=0, log=False

## rushwallet-contest-30-1msats
# RushWallet Contest #30
- РџСЂРёРјРµС‡Р°РЅРёРµ: the escrow was funded 101,000,000 sats total: 100,000,000 sats on 2014-09-22 later returned to its own sender on 2015-03-25, and a separate 1,000,000 sats on 2015-04-24 that remains unspent; the 1,000,000 sats figure is the live prize
- `13Q8hJqagtd77ojTJcEZPjTz2sBFSsYxyj` вЂ” main | expected: 1000000 sats | state: partially-spent (checked 2026-08-16) | https://mempool.space/address/13Q8hJqagtd77ojTJcEZPjTz2sBFSsYxyj
- Folder: https://github.com/floflo777/open-crypto-puzzles/tree/main/2-mid-prizes/rushwallet-contest-30-1msats
- README (raw): https://raw.githubusercontent.com/floflo777/open-crypto-puzzles/main/2-mid-prizes/rushwallet-contest-30-1msats/README.md
- Deep doc: https://raw.githubusercontent.com/floflo777/open-crypto-puzzles/main/2-mid-prizes/rushwallet-contest-30-1msats/README.md
  - OCP `2-mid-prizes/rushwallet-contest-30-1msats` (~5,52В·10вЃё РЅРµРіР°С‚РёРІРѕРІ).
- `address`: "1NKUXbr2URfQyzREPUzoj4MR4ytF5mEm8u"
- `status`: Status.Solved
> Thirty brainwallets from a 2014 contest. Twenty-eight cracked with their passphrases on the record. No prizes recorded. The contest paid outside the addresses.
RushWallet was a brainwallet service. Type a passphrase, get a key. In September 2014 its author funded thirty addresses from thirty passphrases and dared people to find them. Almost all of them fell over the following years. The last solve on the record is from 2018. And the passphrases turned out to be the kind of thing a wordlist finds: long digit strings, repeated tokens.
A solved RushWallet puzzle carries the hex key, the uncompressed WIF and the passphrase that produced it. The data gate checks two things: the key derives the address, and the WIF decodes to the key. The passphrase is on the record as data. The library doesn't re-hash it. Passphrase to key is RushWallet's own scheme and out of scope here.
  address: "1NKUXbr2URfQyzREPUzoj4MR4ytF5mEm8u",
  status: Status.Solved,
- files=1, data-files=0, log=False

## satoshi-birthday-7-million-quiz
# Satoshi birthday 7 million quiz
- РћРїРёСЃР°РЅРёРµ: Seven trivia questions about Bitcoin history hashed into BIP39 entropy. The rules and the published answer key and how the record proves its own address
- `address`: "1GNrvamE9WP4DL6hTicWy1aoqCUwFM2Jbz"
- `status`: Status.Solved
- `prize`: 0.07
> Seven trivia questions about Bitcoin history hashed into BIP39 entropy. The rules and the published answer key and how the record proves its own address
The questions are Bitcoin trivia with teeth. Which burn address holds more, `1AndrewYangForPresident2o2ozm6Pzd` or `1TRUMPforPresident2o2oxxxxxAvY6s`? What did r/Bitcoin look like on December 7, 2010? Which coprocessor did Hal Finney's RPOW run on?
This is where most of the competitors burned their afternoon. The hash is not a private key and not a passphrase. It goes into [iancoleman.io/bip39](https://iancoleman.io/bip39/) as hex entropy, comes back as a 24-word phrase, and the money sits at the first address of that wallet, `m/44'/0'/0'/0/0`. One guy burned hours pushing the hash straight into Electrum as a key and got nowhere with it.
The author confirmed both parts in the thread. Coleman's tool, and "Legacy Bitcoin address starting with 1."
  address: "1GNrvamE9WP4DL6hTicWy1aoqCUwFM2Jbz",
  status: Status.Solved,
  prize: 0.07,
Every hint here is the author talking: the rules, the formatting example, the address type, the credit to Ian Coleman. The answer key hangs off the first hint as its `answer`, because that's where it was published, in a comment written after the money was gone, and that hint's `confirmation` points at the Wayback capture. A hint says what was said and who said it. It never says whether it was right.
## Where the address comes from
- files=1, data-files=0, log=False

## satoshi-maze
# Satoshi-Maze вЂ” РђР›РРђРЎ РїР°РїРєРё [phemex-dorian-nakamoto](../phemex-dorian-nakamoto/README.md)
- files=1, data-files=0, log=False

## satoshi-nakamoto-mystery
# РЎР°С‚РѕСЃРё РќР°РєР°РјРѕС‚Рѕ (Р»РёС‡РЅРѕСЃС‚СЊ)
- files=1, data-files=0, log=False

## school-of-bitcoin-1msats
# School of Bitcoin: 1 Million Sats In This Image
- `bc1qcsdfkaqgy9ux668vmzflzqsyg0qtspncymt5ed` вЂ” main | expected: 1000000 sats | state: funded-unspent (checked 2026-08-16) | https://mempool.space/address/bc1qcsdfkaqgy9ux668vmzflzqsyg0qtspncymt5ed
- Folder: https://github.com/floflo777/open-crypto-puzzles/tree/main/2-mid-prizes/school-of-bitcoin-1msats
- README (raw): https://raw.githubusercontent.com/floflo777/open-crypto-puzzles/main/2-mid-prizes/school-of-bitcoin-1msats/README.md
- `address`: "bc1qcsdfkaqgy9ux668vmzflzqsyg0qtspncymt5ed"
- `prize`: 0.01
The coins were already waiting. They landed on the address nine days before that post. Then a month of "pls follow and retweet". On November 23 the account got there, and the back went up as the pinned tweet. Still unclaimed. Want a go?
The Morse read "ZEROBONEZEROONEZERO FINGZ KNEE DID 4D A DRESS 2Z PRIES". Read it aloud. `0b1010` is ten, so "10 things needed for the address to see prize". Dad joke level puns, in Morse. Respect.
  address: "bc1qcsdfkaqgy9ux668vmzflzqsyg0qtspncymt5ed",
  prize: 0.01,
`bc1qcsdfвЂ¦` received one funding and never spent it. No public key on chain, no published seed. `verify` has nothing to check, and `status` stays `unsolved`.
- `status`: **open**
- `prize`: 1000000 sats (РѕС†РµРЅРєР° $630 РЅР° 2026-08-16) вЂ” single funding transaction, 0.01 BTC
- `target_format`: BIP39 12 words, word 1 = abstract, possible passphrase, BIP84 m/84'/0'/0'/0/0
- files=6, data-files=3, log=True

## seed-phrase-com-metaneer-0-01btc
# seed-phrase.com (MetaNeer Labs)
- РџСЂРѕРІРµСЂРєР° Р±Р°Р»Р°РЅСЃР°: https://mempool.space/address/bc1q7x3p3rkmkxgf20n3apkccqcmn5mdtsf8zx5227
  - https://mempool.space/address/bc1q7x3p3rkmkxgf20n3apkccqcmn5mdtsf8zx5227
- `address`: "bc1q7x3p3rkmkxgf20n3apkccqcmn5mdtsf8zx5227"
- `prize`: 0.01
> A website that dropped clues to a Bitcoin recovery phrase all summer of 2024 and then went quiet. The 0.01 BTC is still on the address
They came fast in July. A poem, a picture, a riddle about October, an emoji. August slowed down. On August 14 came an encrypted message and a second deposit of 0.005 BTC, so the prize doubled to 0.01. The last commit, the next day, just updates the balance.
- `m/84'/0'/0'/0/0`, the first native SegWit address. At least that one is plain.
  address: "bc1q7x3p3rkmkxgf20n3apkccqcmn5mdtsf8zx5227",
  prize: 0.01,
The derivation path is the one thing the author spelled out, so `key` holds the path and no words. The 0.01 BTC sits there unspent. Whoever builds the phrase first gets to fill in the rest.
- files=12, data-files=9, log=True

## seed-phrase-crossword-nft-magic-eden
# Seed Phrase Crossword (NFT, Magic Eden)
- files=1, data-files=0, log=False

## smith-lyle-moore-hunt-2-0-032btc
# Smith, Lyle & Moore Hunt #2: Glimmer
- `bc1q0akdjvrc2csau2n3gyxa3xcq0fss852x997m9y` вЂ” main | expected: 3177700 sats | state: funded-unspent (checked 2026-08-16) | https://mempool.space/address/bc1q0akdjvrc2csau2n3gyxa3xcq0fss852x997m9y
- `bc1qax0hsnwnxl7393awtc3hsy0ftm6tg4tyk2nfja` вЂ” my wallet (destination if solved) | expected: n/a | state: unknown (checked 2026-08-16) | https://mempool.space/address/bc1qax0hsnwnxl7393awtc3hsy0ftm6tg4tyk2nfja
- 2026-08-16 вЂ” Escrow address вЂ” https://mempool.space/address/bc1q0akdjvrc2csau2n3gyxa3xcq0fss852x997m9y
- Folder: https://github.com/floflo777/open-crypto-puzzles/tree/main/2-mid-prizes/smith-lyle-moore-hunt-2-0-032btc
- README (raw): https://raw.githubusercontent.com/floflo777/open-crypto-puzzles/main/2-mid-prizes/smith-lyle-moore-hunt-2-0-032btc/README.md
- 1b07d678 В«Priority Task CheckВ». РђРєС‚РёРІРµРЅ 16.10 (status working, РїРѕСЃР»РµРґРЅСЏСЏ Р°РєС‚РёРІРЅРѕСЃС‚СЊ 23:06): С†РёРєР» РєР°Р¶РґС‹Рµ 10 РјРёРЅ, 40вЂ“80 РЅРѕРІС‹С… РєР»СЋС‡РµР№ Рє zhgsm/jcl9c Рё РїСЂРѕРІРµСЂРєР° Reddit; РІРµРґС‘С‚ /workspace/work/glimmer/NOTES.md.
June 25, 2021. 0.025 BTC lands on a native SegWit address. The band's treasure hunt page doesn't show the address, though. It shows an xpub and promises the coins to whoever reaches the end of the journey first. The theme is Apollo 11. The first clue sits in the album cover of their Born to Be Wild.
July 29, 2022. 0.031777 BTC, for the single Glimmer. Same trick as before: the flag on the treasure hunt page links an xpub on CoinTracker. Its first receiving address, native SegWit, holds the coins. The xpub also gives away the public key, so the record has one without a single spend.
- `status`: **open**
- `prize`: 0.031777 BTC (РѕС†РµРЅРєР° $2002 РЅР° 2026-08-16) вЂ” 3,177,700 sats, funded in a single transaction on 2022-07-29, unspent
- `target_format`: BIP39 12 words, English wordlist, plus a passphrase, BIP84 m/84'/0'/0'/0/0, P2WPKH
  - https://mempool.space/address/bc1q0akdjvrc2csau2n3gyxa3xcq0fss852x997m9y
  - https://mempool.space/address/bc1qax0hsnwnxl7393awtc3hsy0ftm6tg4tyk2nfja
- files=63, data-files=61, log=True

## solana-puzzles-4-0-834sol
# Solana Puzzles #4
- files=1, data-files=0, log=False

## teikhos-bipedaljoe-solver-bounties-2eth
# TeikhosBounty: Johan Nygren's Proof-of-Public-Key Puzzles
- РџСЂРёРјРµС‡Р°РЅРёРµ: sum of the 3 open contracts: C1 1.000002 ETH, C2 0.500002 ETH, 9732 0.500002 ETH; a 4th contract, AEC7, holds 1.000012 ETH with no payout path for anyone; a 5th, 735B, was solved by me for 0.5 ETH and is now drained
- the cryptography is sound and confirmed working end to end by the 735B solve; C1, C2, and 9732 target public keys that have never appeared on chain or in any OSINT trace found so far, so the only realistic path in is information from the author
- `0x735ba26f91e1275fa4b504649b19ef74739fe7e7` вЂ” 735B | expected: 0.5 ETH | state: swept (checked 2026-08-16) | https://etherscan.io/address/0x735ba26f91e1275fa4b504649b19ef74739fe7e7
- `0x17e5e0910b9185b0ede564dcbf074ca910ad56a4` вЂ” C1 | expected: 1.000002 ETH | state: contract-holds-funds (checked 2026-08-16) | https://etherscan.io/address/0x17e5e0910b9185b0ede564dcbf074ca910ad56a4
- `0xd7c6d542f3dcdceda845112b8fd567b8f8655805` вЂ” C2 | expected: 0.500002 ETH | state: contract-holds-funds (checked 2026-08-16) | https://etherscan.io/address/0xd7c6d542f3dcdceda845112b8fd567b8f8655805
- `0x973c2178b09225d1de3ab037d40b3f24af696255` вЂ” 9732 | expected: 0.500002 ETH | state: contract-holds-funds (checked 2026-08-16) | https://etherscan.io/address/0x973c2178b09225d1de3ab037d40b3f24af696255
- `0xaec7e8c221c3fd24e75c996e32289235fd899ebf` вЂ” AEC7 | expected: 1.000012 ETH, no payout path exists | state: contract-holds-funds (checked 2026-08-16) | https://etherscan.io/address/0xaec7e8c221c3fd24e75c996e32289235fd899ebf
- `0x83e4b2a5A464bDfCD83057Ac08447f533A595156` вЂ” my wallet (735B payout destination) | expected: n/a | state: unknown (checked 2026-08-16) | https://etherscan.io/address/0x83e4b2a5A464bDfCD83057Ac08447f533A595156
- 2026-08-16 вЂ” C1 verified source вЂ” https://etherscan.io/address/0x17e5e0910b9185b0ede564dcbf074ca910ad56a4#code
- Folder: https://github.com/floflo777/open-crypto-puzzles/tree/main/2-mid-prizes/teikhos-bipedaljoe-solver-bounties-2eth
- README (raw): https://raw.githubusercontent.com/floflo777/open-crypto-puzzles/main/2-mid-prizes/teikhos-bipedaljoe-solver-bounties-2eth/README.md
  - C1-РєРѕРґ: https://etherscan.io/address/0x17e5e0910b9185b0ede564dcbf074ca910ad56a4#code
  - OCP: https://github.com/floflo777/open-crypto-puzzles/tree/main/2-mid-prizes/teikhos-bipedaljoe-solver-bounties-2eth
- files=2, data-files=0, log=True

## the-great-riddle-0-00423871btc
# The Great Riddle (В«The Great PrintВ»)
- РџСЂРѕРІРµСЂРєР° Р±Р°Р»Р°РЅСЃР°: https://mempool.space/address/bc1qm3ayuhn7wppuqxaywu8ea0lggs8myy7543fekk
- `address`: "bc1qm3ayuhn7wppuqxaywu8ea0lggs8myy7543fekk"
- `prize`: 0.00423871
The [riddle page](https://www.thegreatprint.net/riddle) says every word "to the private key of this address" is in an original artwork of the Genesis Collection. One word per drawing, at first. Later the page says "1 (or more)", and Honey Badger really does carry two.
Here's the twist. Find all 24, in any order, and send them to the author. The first person to do it "will get the 25th word for accessing the address".
The shop's homepage from April 15, 2024 already links "The Great Riddle" and lists the address under "Donation via Bitcoin". Nothing older survives. A May 2023 capture of the homepage has no riddle at all, and the December 2023 ones are just redirects.
On September 23, 2024 the address got 2,100 sat with an OP_RETURN: "The Great Print running The Great Riddle". In 2025 the page started saying "starting with block 862527". It links that transaction as its Signature TxId.
So which one is the start? The page was public seven months earlier, with the same address and the same rules. The signature is the riddle getting an official birthday afterwards. The record keeps the first date and puts the signature on the author's facts.
The first deposit landed on January 28, 2024, a month before the page. Then 375,489 sat on March 12, 2024, most of the prize in one go. `preGenesis` marks that early money.
Each payment comes from a different address, so the chain can't tell who sent which. The pages of The Great Fall, The Great Tree and Checkmate link theirs as signatures. Nothing has ever left the address. Every satoshi that came in is still there.
  address: "bc1qm3ayuhn7wppuqxaywu8ea0lggs8myy7543fekk",
  prize: 0.00423871,
  hints: [official("Find the 24 hidden words of my bitcoin donation address вЂ¦", PAGE, FIRST_PAGE, вЂ¦), вЂ¦],
- files=1, data-files=0, log=False

## timeless-1000-random-seed-puzzle-0-062eth
# Timeless $1000 Random Seed Puzzle
  - https://eth.blockscout.com/api/v2/addresses/0xb6f420204511C7fE9Dd3DE14266a260e8f11aC37/transactions
- files=1, data-files=0, log=False

## trezor-bug-bounty-100k-usd
# Trezor Bug Bounty
  - https://trezor.io/ja/other/partner-portal/for-developers/trezor-bug-bounty-program-scope-rules-and-rewards
- files=1, data-files=0, log=False

## trivia-brainwallet-0-04btc
# Brainwallet puzzle, 0.04 BTC
- `address`: "1E3NARnUX25UgMvZd5EZTutD9yVHTVGDNC"
- `status`: Status.Solved
- `prize`: 0.04
The plan was **0.05 BTC**, about $300. Bitcoin went up in the meantime, so on November 4 the [post](https://www.reddit.com/r/bitcoinpuzzles/comments/7asy51/brainwallet_puzzle_004_btc_reward/) went out with **0.04 BTC**. Six hours later the wallet was empty.
Every riddle gives one word or one number. Lowercase, no punctuation. Answers 1 to 10 go into brainwallet.io in order, one space between them. Answers 11 and 12 go into the salt field of the "generic" tab. Hit generate. Same address as in the post? You win.
Different address? Tough luck. The post says to check your spaces first, then your answers. That's the only feedback you get. Twelve answers, one wrong letter anywhere, and you're staring at a random address with no idea which riddle broke it. Brutal and kind of beautiful.
- `sopranos.reframed.snubbed`. Three random words? No, a what3words address. In Mozambique.
The site is dead, the code isn't. The Wayback Machine has [brainwallet.io from October 11, 2017](https://web.archive.org/web/20171011071719/https://brainwallet.io/), 24 days before launch. That file is byte for byte the one in [routman/brainwallet.io](https://github.com/routman/brainwallet.io) at commit `7c9ca3f`. And the hex step matters a lot. Hash the raw scrypt bytes instead, or take the compressed address, and you land somewhere else. Only the page's own reading hits the prize.
The claim landed in block 493,125 at 02:05:31 UTC on November 5. Eleven seconds after that block's timestamp [Quantris](https://puzzles.agntn.dev/solvers/quantris) wrote "Claimed it :)" in the thread. Half the prize went to charity. The spend pays 0.019935 BTC to `1HB5XMLmzFVj8ALj6mfBsbifRoD4miY36v`, which Quantris named as WikiLeaks' donation address. So clue 9 was about WikiLeaks, and WikiLeaks got paid. Nice loop.
The author asked right away how they got number 12. And the answer is great. They didn't. Quantris "totally cheesed" it, trying even numbers in the salt until the address matched. Eleven answers right and the last one a small number? That's a few clicks. The real clue was a Twitter account, 2 hams for $20. Quantris had seen it years before and still didn't connect it. Happens to the best of us.
  address: "1E3NARnUX25UgMvZd5EZTutD9yVHTVGDNC",
  status: Status.Solved,
  prize: 0.04,
- files=1, data-files=0, log=False

## tumblecaesar-1000algo
# Tumblecaesar (harttrav, r/codes, 2022)
- **РСЃС‚РѕС‡РЅРёРєРё**: https://www.reddit.com/r/codes/comments/ux648f/tumblecaesar_an_algorithm_i_created_with_a_prize/; README Р°РІС‚РѕСЂР°; Р±Р»РѕРі harttraveller.com/Tumbler+Challenge (РЅРµ РЅР°Р№РґРµРЅ, СЃС‚РѕРёС‚ РёСЃРєР°С‚СЊ РІ Wayback); Discord Р°РІС‚РѕСЂР°.
- files=1, data-files=0, log=False

## unfavorable-semicircle
# Unfavorable Semicircle (2015-2016)
- files=1, data-files=0, log=False

## uvb-76-the-buzzer
# UVB-76 / В«The BuzzerВ»
- files=1, data-files=0, log=False

## valor-por-tamaulipas
# Valor por Tamaulipas (2012)
- files=1, data-files=0, log=False

## veil-hunts-1380-2020usd
# Veil Hunts (findveil.com)
- files=1, data-files=0, log=False

## veteranhodl-hunting-time-420ksats
# VeteranHODL: Hunting Time
- РћРїСѓР±Р»РёРєРѕРІР°РЅРѕ: 2026-06-15 https://x.com/VeteranHODL/status/2066614083105738752
- `bc1qhzy6j4amw26z7e694mgfr7kvzl7xteu54f0a85` вЂ” main | expected: 420000 sats | state: swept (checked 2026-08-21) | https://mempool.space/address/bc1qhzy6j4amw26z7e694mgfr7kvzl7xteu54f0a85
- 2026-06-29 вЂ” Hunt announcement post вЂ” https://x.com/VeteranHODL/status/2071632285951226106
- 2026-08-01 вЂ” Wallet type and second funding вЂ” https://x.com/VeteranHODL/status/2083486983142142452
June 29, 2026, 16:30 UTC. VeteranHODL tells X that [a genuine Bitcoin seed phrase](https://x.com/VeteranHODL/status/2071632285951226106) hides in the pages of his novel Hunting Time. He writes techno-thrillers about Bitcoin and used to serve in the British Army. Clues would follow, one photo at a time. "Find the clues. Recover the wallet. Keep what's inside."
The first five came on Mondays, one a week. Then the sequel got close and [the pace went up](https://x.com/VeteranHODL/status/2082355888879235577).
The paperback. On August 15 [floflo777](https://puzzles.agntn.dev/solvers/floflo777), 0xFlorent_ on X, asked whether you need the book at all. [The answer](https://x.com/VeteranHODL/status/2088547059452235917): "you will need the paperback to solve the puzzle". Page numbers are paperback page numbers. Got the ebook? Bad luck.
The words come from the BIP39 list, but the phrase isn't BIP39. Its checksum fails. The author said so on [August 1](https://x.com/VeteranHODL/status/2083486983142142452), in his own way: the sats went "to a fresh electrum wallet". It's an Electrum SegWit seed. The prize sat on `m/0'/0/2`, the wallet's third receiving address. Same trap as [LuckyLurker's Vault #1](https://puzzles.agntn.dev/collections/luckylurker), which also wanted Electrum and a later index.
Not really. After clue seven the author posted [his own math](https://x.com/VeteranHODL/status/2083592109647401333): "After revealing seven seed phrase words, the entropy of the target wallet is 51 bits." Still safer than a Coldcard Mk3, he added, and three minutes later an edit put a number on that. 40 bits. Five words to go, and a whole novel to read for them.
The claim landed on August 18 at 02:07:20 UTC. [One transaction](https://mempool.space/tx/d3783a1cde2c491a6edfbead81aeebda90257c8c25b4b0c9b2bac89bc5cd607a) took both 210,000 sat coins, 419,642 sats after the fee, to `3KBUSвЂ¦`. The author spotted it that day and [congratulated the winner](https://x.com/VeteranHODL/status/2089798740978577809) with a bonus prize offer. Plus one more hint, a bit late: "A major clue is in the title of the book..."
Two days later [the full solution](https://x.com/VeteranHODL/status/2090400955707830480) went up. Its last line names [_radosinsky](https://puzzles.agntn.dev/solvers/radosinsky). The record credits them by that handle. Nothing public ties `3KBUSвЂ¦` to them, so the address stays out of the solver record.
### Who funded the prize?
await verify(book!); // { verified: true, derivedAddress: "bc1qhzy6j4amw26z7e694mgfr7kvzl7xteu54f0a85", вЂ¦ }
- files=1, data-files=0, log=False

## wares-wallets-solana
# Wares Wallets (Solana video series)
- РџСЂРёРјРµС‡Р°РЅРёРµ: per puzzle; marketed higher than the real value
- Checked escrows at 0 SOL; channel inactive since 2025-07-04. Reusable: Solana path m/44'/501'/0' (solana-cli/Solflare), not Phantom's .../0'/0'. Measure the real prize before the marketing number.
- `status`: **dead-end** (dead-end: swept-by-third-party)
- `prize`: 0.1 SOL (РѕС†РµРЅРєР° $15 РЅР° 2026-08-16) вЂ” per puzzle; marketed higher than the real value
- `difficulty_note`: Checked escrows at 0 SOL; channel inactive since 2025-07-04. Reusable: Solana path m/44'/501'/0' (solana-cli/Solflare), not Phantom's .../0'/0'. Measure the real prize before the marketing number.
- files=1, data-files=0, log=False

## warpwallet-challenges
# WarpWallet challenges
- `address`: "1JKb1617p68H5MPkoNaMtaJCqKDU3h8qSn"
- `status`: Status.Solved
- `prize`: 0.1
[WarpWallet](https://keybase.io/warp) was Keybase's answer to weak brainwallets. scrypt with a salt, usually an email address, so a passphrase couldn't be brute forced with a plain SHA-256 wordlist. To prove it, they funded challenges with short passphrases and dared people to crack them. The four small ones fell. The two 20 BTC ones didn't. They expired on schedule, and Keybase published the passphrases when they took the coins back.
Every WarpWallet record carries the hex key, the WIF and the passphrase, plus the salt where one was used, as `.passphrase(вЂ¦)` and `.salt(вЂ¦)` on the key builder. The library verifies the key against the address, not the passphrase against the key. scrypt with WarpWallet's parameters is a different package's job.
Each record also carries the hint Keybase printed next to its wallet, as `official(вЂ¦)` with a Wayback capture of the page for its confirmation. The page still shows five of them; for the first 20 BTC challenge it shows the answer instead, so the December 2013 capture is where that hint lives. Each confirmation points at the versioned page the capture holds, because the bare `keybase.io/warp` capture is a redirect stub that dies in a browser.
  address: "1JKb1617p68H5MPkoNaMtaJCqKDU3h8qSn",
  status: Status.Solved,
  prize: 0.1,
## Status
`expired` is the status for the two big challenges. The author took the prize back when the deadline passed. The keys on those records are the ones Keybase published, so they verify like any solved puzzle. The `warpwallet` alias resolves to this collection in every lookup.
- files=1, data-files=0, log=False

## wealth-in-poetry-0-03btc
# Trithemius: Wealth in Poetry
- `1K4ezpLybootYF23TM4a8Y4NyP7auysnRo` вЂ” main | expected: 3124630 sats | state: funded-unspent (checked 2026-08-16) | https://mempool.space/address/1K4ezpLybootYF23TM4a8Y4NyP7auysnRo
- Folder: https://github.com/floflo777/open-crypto-puzzles/tree/main/2-mid-prizes/wealth-in-poetry-0-03btc
- README (raw): https://raw.githubusercontent.com/floflo777/open-crypto-puzzles/main/2-mid-prizes/wealth-in-poetry-0-03btc/README.md
  - OCP `2-mid-prizes/wealth-in-poetry-0-03btc`.
- `address`: "1K4ezpLybootYF23TM4a8Y4NyP7auysnRo"
- `prize`: 0.0312463
And right under it, the address. **0.03 BTC**, and it's still there.
The coins came first. 3,050,269 sat landed on 2019-02-10 at 14:47 UTC, one day before the essay went up. On 2019-04-08 someone sent another 74,361 sat. Nothing has left the address since.
  address: "1K4ezpLybootYF23TM4a8Y4NyP7auysnRo",
  prize: 0.0312463,
`startedAt` is the publication time, 15:34:04 UTC, straight from Medium's own `firstPublishedAt`. The funding keeps its own date, a day earlier. The author put in 0.03050269 BTC, and the essay rounds it to .03. The 74,361 sat from April is an `increase`, so `prize` is 0.0312463 BTC, what the address holds.
- `status`: **open**
- `prize`: 3124630 sats (РѕС†РµРЅРєР° $1969 РЅР° 2026-08-16) вЂ” 0.0312463 BTC, 2 funding transactions, exact dates not recorded
- files=7, data-files=0, log=True

## webdriver-torso
# Webdriver Torso (2013+)
- files=1, data-files=0, log=False

## wickex-youtube-puzzle
# Wickex's YouTube puzzle
- `address`: "1LhQZc57j9i3xofj5poayd6PnakN7xHwDA"
- `status`: Status.Solved
- `prize`: 0.001
December 23, 2013, 02:22 UTC. Wickex had just solved [IAMABananaAMAA's GIF puzzle](https://puzzles.agntn.dev/collections/iamabananaamaa), and [the next post](https://www.reddit.com/r/bitcoinpuzzles/comments/1ti0uw/medium_1mbtc_find_the_private_key/) says why there's a second puzzle at all: "Because I successfully completed the previous puzzle, it would only be fair to create the next one." Marked medium. An address, **1 mBTC**, and a line of hex to start from.
IAMABananaAMAA got there first. "I cleared it but I'm going to send it back actually and then start another." And did. The sweep and the refund went into the same block, 276478, at 03:08:58. The refund's change went to the same address the sweep paid, so the chain agrees with the comment.
  address: "1LhQZc57j9i3xofj5poayd6PnakN7xHwDA",
  status: Status.Solved,
  prize: 0.001,
Four hints are Wickex's: the hex from the post and three comments. Each carries a piece of IAMABananaAMAA's four step answer, word for word, from [the comment](https://www.reddit.com/r/bitcoinpuzzles/comments/1ti0uw/comment/ce87ss1/) posted after the prize was gone. "STI...I5Z" is a community hint. It's the solver's, not the author's, and the record keeps that.
### Six transactions for one prize
The funding confirmed 18 seconds before the post. Then the first claim and the refund, recorded as an `increase`, since that's what it did to the address. Then the second claim. And in February 2014, whoever still had the key sent 27,486 satoshis in and 17,486 out in the same block. That's the `increase` and the `sweep` at the end. The address is empty since.
- files=1, data-files=0, log=False

## wif500-500btc
# WIF500 (500 BTC) вЂ” РРЎРџР РђР’Р›Р•РќРћ: РїР°Р·Р» РћРўРљР Р«Рў
- РџСЂРѕРІРµСЂРєР°: https://blockstream.info/api/address/1PfNh5fRcE9JKDmicD2Rh3pexGwce1LqyU
- РџСЂРѕРІРµСЂРєР° (РІРµР±): https://blockchain.com/btc/address/1PfNh5fRcE9JKDmicD2Rh3pexGwce1LqyU
- https://blockstream.info/api/address/1PfNh5fRcE9JKDmicD2Rh3pexGwce1LqyU
- files=1, data-files=0, log=False

## wonderabbit-prometheus-1msats
# Wonderabbit: Prometheus
- РџСЂРёРјРµС‡Р°РЅРёРµ: current balance after a documented 21000-sats self-test transaction that the author sent to and from themselves before funding the prize; not the prize moving
- `bc1q3nxe7436s3mlrkyrg3uv2a40yt5dcmfu7tggx5` вЂ” main | expected: 0 sats (1,031,123 sats until 2026-09-28) | state: swept (checked 2026-10-03) | https://mempool.space/address/bc1q3nxe7436s3mlrkyrg3uv2a40yt5dcmfu7tggx5
- `status`: **solved**
- `prize`: 1031123 sats (РѕС†РµРЅРєР° $650 РЅР° 2026-08-16) вЂ” current balance after a documented 21000-sats self-test transaction that the author sent to and from themselves before funding the prize; not the prize moving
- `target_format`: BIP39 12 words, each expressed as text, a 1-2048 wordlist index, or an 11-bit binary; derivation path not established
  - https://mempool.space/address/bc1q3nxe7436s3mlrkyrg3uv2a40yt5dcmfu7tggx5
- no ciphertext has been extracted from public material; once words, indices, or binaries are recovered from the companion programme, derive BIP44/49/84 and compare to the escrow address
  - title: obtain the companion puzzle programme | status: open
  - title: ask a specific yes-or-no question on Nostr | status: open
  - title: watch for a third staging of the show | status: open
- files=1, data-files=0, log=False

## zden-haluska-halv-312ksats
# Zden Level HALV
- РћРїСѓР±Р»РёРєРѕРІР°РЅРѕ: 2024-04-20 https://twitter.com/Zd3N/status/1781475361160663236
- `1crypto24HCr178iMcKd5iUi5D4rsg1nK` вЂ” main | expected: 312500 sats | state: funded-unspent (checked 2026-08-16) | https://mempool.space/address/1crypto24HCr178iMcKd5iUi5D4rsg1nK
- 2024-04-20 вЂ” Zden, original announcement вЂ” https://twitter.com/Zd3N/status/1781475361160663236
- Folder: https://github.com/floflo777/open-crypto-puzzles/tree/main/2-mid-prizes/zden-haluska-halv-312ksats
- README (raw): https://raw.githubusercontent.com/floflo777/open-crypto-puzzles/main/2-mid-prizes/zden-haluska-halv-312ksats/README.md
- **РСЃС‚РѕС‡РЅРёРєРё**: https://crypto.haluska.sk/ (Р·РµСЂРєР°Р»Рѕ crypto.satori.digital), РѕРїСѓР±Р»РёРєРѕРІР°РЅРѕ 20.04.2024; С‚РІРёС‚ https://twitter.com/Zd3N/status/1781475361160663236. Р РµС€РµРЅРёРµ LVL5: https://echo.ls/zden-level-5/ ; СЂР°Р·Р±РѕСЂ LVL4: https://steemit.com/bitcoin/@mmorsl/solution-of-the-bitcoin-crypto-puzzle-level-4-by-zden. OCP: `/workspace/work/open-crypto-puzzles/2-mid-prizes/zden-haluska-halv-312ksats/`. Р’РЅРµС€РЅРёР№ СЂР°Р·Р±РѕСЂ: github benjacasas02/independent-cryptography-research (research/zden; >33 000 РєР°РЅРґРёРґР°С‚РѕРІ вЂ” 0).
Zden publishes images with a key hidden in them, on [crypto.haluska.sk](https://crypto.haluska.sk/). Most levels are a single image. Autonomy combines images and animation across several stages. The prize sits on the address. The solver posts the key. The series moved across four chains, so this is the one collection that spans four values of `chain`. `zden/decred-janus` paid 460 DCR, `zden/litecoin-segwit` 230 LTC, `zden/xixoio` 6 ETH.
Every Zden record has an `assets({ puzzle })` entry pointing at the image under `assets/zden/` in the repository, so `assetPath()` and `assetUrl()` answer for all sixteen. Fifteen carry the public key, seven carry the private key. A `solved` status doesn't mean the record has enough key material for `verify`; without it, verification answers `unavailable`.
`zden/decred-autonomy` was left out because the live catalog didn't show an address. The [original page's archived HTML](https://web.archive.org/web/20170430210807/https://decred.org/autonomy_puzzle/) links `DseEpHK49hHrTJhxwop3B86K1dryv4CYz8N` below its reward counter, so there's no need for a special addressless record. [Scott Burke's account for BlockCrushr Labs](https://medium.com/blockcrushr-labs/solving-decreds-autonomy-puzzle-aedac18f18f3) dates the launch to 25 April 2017 and documents their solution. The record ships Zden's [gate render](https://crypto.haluska.sk/gate_full.jpg), not the entire interactive puzzle.
Why did 355 DCR leave the address when the puzzle promised 500? [Decred's v1.0 press release](https://www.prnewswire.com/news-releases/decred-releases-v10-the-worlds-first-cryptocurrency-of-the-people-for-the-people-and-by-the-people-300443738.html) has the rule: 500 DCR to the first solver, cut every 24 hours. The chain follows it to the letter. On 26 April 100 DCR went back to the address that had put the prize up. Then 50 on the 27th, 25 on the 28th. Two deposits added 3 and 25 DCR. Slow solvers paid for every day, literally.
The rest of the history is housekeeping. The `funding` is a first 500 DCR that sat there from 6 to 11 April, before launch, and then left. The 502.86 DCR that stayed came in on the 20th. On launch day it left for another address and came back 24 minutes later. Same round trip as in [Proof of Writing](https://puzzles.agntn.dev/collections/proof-of-writing), so a `decrease` and an `increase`. Then 29 April, 23:08 UTC. One transaction sent 355 DCR out and the change back. A second one took the change in the same block. Both are `claim`, and `prize: 355.85470498` is what the address held right before. The launch is dated only to the day, so there's no `solveTime`. The article's publication date isn't a solve date either.
  address: "DsRaAja82UvgnqYaBHYFuyCKURFX2rCyEJ8",
  status: Status.Solved,
- files=38, data-files=36, log=True

## zden-haluska-lvl5-555ksats
# Zden Cryptopuzzle LVL.5
- РћРїСѓР±Р»РёРєРѕРІР°РЅРѕ: 2018-11-09 https://twitter.com/Zd3N/status/1060955171591766018
- `1cryptoGeCRiTzVgxBQcKFFjSVydN1GW7` вЂ” main | expected: 0 sats (555,550 sats until 2026-09-22) | state: swept (checked 2026-09-26) | https://mempool.space/address/1cryptoGeCRiTzVgxBQcKFFjSVydN1GW7
- 2018-11-09 вЂ” Zden, original announcement вЂ” https://twitter.com/Zd3N/status/1060955171591766018
- 2018-12-24 вЂ” Zden, Christmas hint bundle вЂ” https://twitter.com/Zd3N/status/1077146640090316800
- `status`: **solved**
- `prize`: 555550 sats (РѕС†РµРЅРєР° $350 РЅР° 2026-08-16)
- `published`: 2018-11-09 https://twitter.com/Zd3N/status/1060955171591766018
- `target_format`: 256-bit private key as direct hex (not WIF, not BIP39), P2PKH
  - https://mempool.space/address/1cryptoGeCRiTzVgxBQcKFFjSVydN1GW7
  - title: a clarification from the author on 3 exact bindings (x, byte-range normalization, following) | status: open
  - title: a higher-fidelity source for the mini-hint glyphs | status: open
  - title: a wider author-error tolerance sweep (3-byte wildcard) | status: open
  - url: https://twitter.com/Zd3N/status/1060955171591766018 | title: Zden, original announcement | date: 2018-11-09
- files=1, data-files=0, log=False

## zk-guess-chainhackers-31
# ZK Guess #31 (chainhackers, Base)
- Secret 149 was identified, but a third party guessed it about 40 hours later and the puzzle forfeited. A zero-cost, positive-value action runs immediately.
- `0x6F890B08fa4312135E1b4CF03929f8e389A866B4` вЂ” None | expected: None | state: contract-holds-funds (checked 2026-08-16) | https://basescan.org/address/0x6F890B08fa4312135E1b4CF03929f8e389A866B4
- `status`: **dead-end** (dead-end: window-closed)
- `prize`: 0.0025 ETH (РѕС†РµРЅРєР° $5 РЅР° 2026-08-16)
- `difficulty_note`: Secret 149 was identified, but a third party guessed it about 40 hours later and the puzzle forfeited. A zero-cost, positive-value action runs immediately.
- `0x6F890B08fa4312135E1b4CF03929f8e389A866B4` вЂ” contract | None | РѕР¶РёРґР°РµС‚СЃСЏ: None | РїСЂРѕРІРµСЂРµРЅРѕ 2026-08-16: **contract-holds-funds**
  - https://basescan.org/address/0x6F890B08fa4312135E1b4CF03929f8e389A866B4
- files=1, data-files=0, log=False

## zodomo-11x11-pixel-puzzles-0-05eth
# Zodomo 11x11 Pixel Puzzles
- РџСЂРёРјРµС‡Р°РЅРёРµ: the active (fourth) puzzle's nominal per-piece prize; no escrow currently holds it, see Why this is a dead end
- `0x60a5431a138b0320641408694562f624f3c977a8` вЂ” piece #869 escrow | expected: 0.05 ETH, funded 2026-07-30 | state: swept (checked 2026-08-16) | https://etherscan.io/address/0x60a5431a138b0320641408694562f624f3c977a8
- `0x9cc846fe9b75a4cee897f605b240dd0030fcd5a2` вЂ” piece #930 escrow, encoding scheme not reconstructed | expected: 0.05 ETH, funded 2026-07-30 | state: swept (checked 2026-08-16) | https://etherscan.io/address/0x9cc846fe9b75a4cee897f605b240dd0030fcd5a2
- `0xf5d45c9d798aedb754b1ed8660af3ea79178b765` вЂ” piece #993 escrow, reclaimed by the artist himself | expected: 0.05 ETH, funded 2026-07-30 | state: swept (checked 2026-08-16) | https://etherscan.io/address/0xf5d45c9d798aedb754b1ed8660af3ea79178b765
- `0xa15585918e6ef74239246f4e1538acdf70b4743e` вЂ” queengarden.eth, paid by hand as the 3rd solver's prize; a real person's active personal wallet, not an escrow for the active puzzle | expected: n/a | state: unknown (checked 2026-08-16) | https://etherscan.io/address/0xa15585918e6ef74239246f4e1538acdf70b4743e
- 2026-08-01 вЂ” Zodomo, X post announcing the active puzzle вЂ” https://x.com/Zodomo/status/2083364549697155550
- 2026-07-30 вЂ” Zodomo, X post naming the intended difficulty вЂ” https://x.com/Zodomo/status/2082949091244327366
- `status`: **dead-end** (dead-end: unfunded)
- `prize`: 0.05 ETH (РѕС†РµРЅРєР° $94 РЅР° 2026-08-16) вЂ” the active (fourth) puzzle's nominal per-piece prize; no escrow currently holds it, see Why this is a dead end
- `target_format`: BIP39 mnemonic, 12 or 24 words, English, encoded in an 11x11 pixel grid using an 11-color base-11 palette, BIP44 m/44'/60'/0'/0/0, no passphrase
  - https://etherscan.io/address/0x60a5431a138b0320641408694562f624f3c977a8
  - https://etherscan.io/address/0x9cc846fe9b75a4cee897f605b240dd0030fcd5a2
  - https://etherscan.io/address/0xf5d45c9d798aedb754b1ed8660af3ea79178b765
- files=1, data-files=0, log=False

