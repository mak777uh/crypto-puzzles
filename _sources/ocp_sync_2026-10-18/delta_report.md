# OCP → MASTER: дельта снапшота `19644e58` (2026-10-18)

Сгенерировано `tools/ocp_delta_scan.py`.

Статусы: `PRESENT` / `PRESENT-NORM` — byte-exact (или нормализованное / canonical-JSON)
зеркало уже есть в базе; `COVERED-TEXT` — ≥90 % уникальных строк у нас есть; `PARTIAL-TEXT` —
30–90 %; `MISSING` — содержимого у нас нет. Действия: `copy-data` → `data/ocp/`,
`copy-code` → `tools/ocp/`, `link` — файл >250 КБ остаётся в клоне `_sources/ocp/`,
указатель в `data/ocp/_HEAVY.md`.

| OCP | папка MASTER | копий | ссылок | уже есть |
|---|---|---|---|---|
| `4-solved/caesarcoder-genesis-block-wallet-puzzle-947ksats` | `puzzles/genesis-block-wallet-puzzle-142ksats` | 26 | 0 | 1 |
| `2-mid-prizes/arweave-puzzle-11-1eth` | `puzzles/arweave-puzzle-11-1eth` | 24 | 1 | 1 |
| `2-mid-prizes/arweave-puzzle-3-1000ar` | `puzzles/arweave-puzzle-3-1000ar` | 20 | 1 | 2 |
| `2-mid-prizes/keir-finlow-bates-blockchain-book-600ksats` | `puzzles/keir-finlow-bates-blockchain-book-600ksats` | 13 | 0 | 4 |
| `1-big-prizes/blm-brave-new-world-0-2btc` | `puzzles/blm-brave-new-world-0-2btc` | 11 | 1 | 1 |
| `1-big-prizes/ballet-bobby-lee-2btc-cards` | `puzzles/ballet-bobby-lee-2btc-cards` | 10 | 3 | 3 |
| `1-big-prizes/bitaps-shamir-challenge-1btc` | `puzzles/bitaps-shamir-challenge-1btc` | 10 | 1 | 3 |
| `1-big-prizes/guntis-vitolins-metamask-8-6eth` | `puzzles/guntis-vitolins-metamask-8-6eth` | 10 | 0 | 5 |
| `2-mid-prizes/smith-lyle-moore-hunt-2-0-032btc` | `puzzles/smith-lyle-moore-hunt-2-0-032btc` | 10 | 0 | 0 |
| `2-mid-prizes/teikhos-bipedaljoe-solver-bounties-2eth` | `puzzles/teikhos-bipedaljoe-solver-bounties-2eth` | 10 | 0 | 3 |
| `4-solved/bitcoin-movie-enigma-100ksats` | `solved/bitcoin-movie-enigma-100ksats` | 10 | 0 | 3 |
| `1-big-prizes/aoi-nakamoto-quizchain-0-854btc` | `puzzles/aoi-nakamoto-quizchain-0-854btc` | 9 | 0 | 3 |
| `2-mid-prizes/arweave-puzzle-10-500ar` | `puzzles/arweave-puzzle-10-500ar` | 9 | 1 | 3 |
| `2-mid-prizes/arweave-puzzle-12-400ar` | `solved/arweave-puzzle-12-400ar` | 9 | 0 | 3 |
| `2-mid-prizes/corey-phillips-kitten-passphrase-1msats` | `puzzles/corey-phillips-kitten-passphrase-1msats` | 9 | 1 | 3 |
| `4-solved/keysa-crack-the-seed-369ksats` | `solved/keysa-crack-the-seed-369ksats` | 9 | 1 | 4 |
| `2-mid-prizes/logicbeach-powerful-moss-0-54eth` | `solved/logicbeach-powerful-moss-0-54eth` | 7 | 1 | 3 |
| `2-mid-prizes/zden-haluska-halv-312ksats` | `puzzles/zden-haluska-halv-312ksats` | 7 | 0 | 1 |
| `2-mid-prizes/fe-lang-bountiful-compiler-bounty-1eth` | `puzzles/fe-lang-bountiful-compiler-bounty-1eth` | 6 | 0 | 0 |
| `2-mid-prizes/school-of-bitcoin-1msats` | `puzzles/school-of-bitcoin-1msats` | 6 | 0 | 0 |
| `1-big-prizes/gsmg-io-5btc-puzzle` | `puzzles/gsmg-io-5btc-puzzle` | 5 | 0 | 8 |
| `1-big-prizes/peter-todd-hash-collision-bounties-0-59btc` | `puzzles/peter-todd-hash-collision-bounties-0-59btc` | 5 | 0 | 3 |
| `4-solved/zden-haluska-lvl5-555ksats` | `solved/zden-haluska-lvl5-555ksats` | 5 | 0 | 4 |
| `3-small-prizes/crypto-puzzles-2018-puzzle-2-0-05eth` | `puzzles/crypto-puzzles-2018-puzzle-2-0-05eth` | 4 | 0 | 1 |
| `2-mid-prizes/ah-white-walking-banks-800ksats` | `puzzles/ah-white-walking-banks-800ksats` | 3 | 0 | 3 |
| `2-mid-prizes/pindar-van-arman-cryptoartgan-nft` | `solved/pindar-van-arman-cryptoartgan-nft` | 3 | 0 | 3 |
| `2-mid-prizes/rushwallet-contest-30-1msats` | `puzzles/rushwallet-contest-30-1msats` | 3 | 0 | 3 |
| `3-small-prizes/exitonly-challenge-14-30ksats` | `puzzles/exitonly-challenge-14-30ksats` | 3 | 0 | 1 |
| `4-solved/andy-bauch-new-money-cog-428ksats` | `solved/andy-bauch-new-money-cog-428ksats` | 3 | 3 | 3 |
| `4-solved/bc1q21-timelock-challenge-l5-100ksats` | `solved/bc1q21-timelock-challenge-l5-100ksats` | 3 | 0 | 1 |
| `4-solved/dug-student-treasure-hunt-63ksats` | `solved/dug-student-treasure-hunt-63ksats` | 3 | 0 | 1 |
| `4-solved/luckylurker-seed-riddles-80ksats` | `solved/luckylurker-seed-riddles-80ksats` | 3 | 0 | 1 |
| `4-solved/veteranhodl-hunting-time-420ksats` | `solved/veteranhodl-hunting-time-420ksats` | 3 | 0 | 3 |
| `2-mid-prizes/ftpk-season-2-300usdt` | `solved/ftpk-season-2-300usdt` | 2 | 0 | 3 |
| `2-mid-prizes/path-to-greatness-treasure-hunt-3ltc` | `puzzles/path-to-greatness-treasure-hunt-3ltc` | 2 | 0 | 16 |
| `2-mid-prizes/wealth-in-poetry-0-03btc` | `puzzles/wealth-in-poetry-0-03btc` | 2 | 0 | 3 |
| `4-solved/ftpk-season-4-166usdc` | `solved/ftpk-season-4-166usdc` | 2 | 0 | 2 |
| `4-solved/wonderabbit-prometheus-1msats` | `solved/wonderabbit-prometheus-1msats` | 2 | 0 | 3 |

## STATUS_CONFLICT — статус по OCP не совпадает с нашим расположением папки (6)

Ничего не затираем: расхождение фиксируется дважды, приоритет — собственное on-chain
подтверждение. Строки ниже — материал для куратора, не основание для автоматической правки.

- `2-mid-prizes/arweave-puzzle-12-400ar` → `solved/arweave-puzzle-12-400ar` — arweave-puzzle-12-400ar: по OCP «open», у нас папка в solved/ | примечание OCP: the small amount above 400 AR is unsolicited dust received after the 2020-04-14 funding, not a partial withdrawal
- `4-solved/caesarcoder-genesis-block-wallet-puzzle-947ksats` → `puzzles/genesis-block-wallet-puzzle-142ksats` — caesarcoder-genesis-block-wallet-puzzle-947ksats: по OCP «solved», у нас папка в puzzles/ | примечание OCP: the jackpot started at 25,000 sats and grew because the author relayed every paid question into the escrow; 947,620 sats in 120 outputs when it was swept on 2026-10-17
- `2-mid-prizes/ftpk-season-2-300usdt` → `solved/ftpk-season-2-300usdt` — ftpk-season-2-300usdt: по OCP «open», у нас папка в solved/ | примечание OCP: ERC-20 USDT; the escrow's native ETH balance is 0, the prize is entirely the token balance
- `2-mid-prizes/logicbeach-powerful-moss-0-54eth` → `solved/logicbeach-powerful-moss-0-54eth` — logicbeach-powerful-moss-0-54eth: по OCP «open», у нас папка в solved/ | примечание OCP: the pot grows over time toward the contract's full balance; it was 0.54 ETH at the private research folder's prior check and 0.55 ETH on 2026-08-16, consistent with the contract's own time-based ramp, not a partial claim
- `1-big-prizes/peter-todd-hash-collision-bounties-0-59btc` → `puzzles/peter-todd-hash-collision-bounties-0-59btc` — peter-todd-hash-collision-bounties-0-59btc: по OCP «watch», у нас папка в puzzles/ | примечание OCP: combined across 4 live P2SH scripts (SHA-256, RIPEMD-160, HASH160, HASH256); a 5th sibling (SHA-1) was claimed in 2023 and is not part of this total
- `2-mid-prizes/pindar-van-arman-cryptoartgan-nft` → `solved/pindar-van-arman-cryptoartgan-nft` — pindar-van-arman-cryptoartgan-nft: по OCP «open», у нас папка в solved/ | примечание OCP: 1 ERC-1155 NFT, "Magic Internet moneyGAN" (445/512); no market value recorded for this specific piece

## UNMAPPED (сущности OCP без папки в MASTER) — завести по п.8 AGENT_INSTRUCTIONS

- нет

## Служебные файлы вне папок пазлов (71) — остаются в клоне

- `.github/workflows/prize-map.yml`
- `.gitignore`
- `1-big-prizes/README.md`
- `2-mid-prizes/README.md`
- `3-small-prizes/README.md`
- `4-solved/README.md`
- `AGENTS.md`
- `CONTRIBUTING.md`
- `LICENSE`
- `LICENSE-CODE`
- `README.md`
- `archive/dead-ends/README.md`
- `archive/dead-ends/commander-u-puzzle-8-5btc/README.md`
- `archive/dead-ends/commander-u-puzzle-8-5btc/clues/author-posts.md`
- `archive/dead-ends/commander-u-puzzle-8-5btc/puzzle.json`
- `archive/dead-ends/objective-thune-licorne-0-21btc/README.md`
- `archive/dead-ends/objective-thune-licorne-0-21btc/analysis/leads.md`
- `archive/dead-ends/objective-thune-licorne-0-21btc/analysis/tested.md`
- `archive/dead-ends/objective-thune-licorne-0-21btc/clues/author-posts.md`
- `archive/dead-ends/objective-thune-licorne-0-21btc/data/funding.csv`
- `archive/dead-ends/objective-thune-licorne-0-21btc/data/print_run_stock.csv`
- `archive/dead-ends/objective-thune-licorne-0-21btc/puzzle.json`
- `archive/dead-ends/objective-thune-licorne-0-21btc/tools/oracle.py`
- `archive/dead-ends/onfo-forsyth-1btc/README.md`
- `archive/dead-ends/onfo-forsyth-1btc/clues/author-posts.md`
- `archive/dead-ends/onfo-forsyth-1btc/puzzle.json`
- `archive/dead-ends/rows.json`
- `archive/dead-ends/zodomo-11x11-pixel-puzzles-0-05eth/README.md`
- `archive/dead-ends/zodomo-11x11-pixel-puzzles-0-05eth/clues/author-posts.md`
- `archive/dead-ends/zodomo-11x11-pixel-puzzles-0-05eth/puzzle.json`
- `archive/dead-ends/zodomo-11x11-pixel-puzzles-0-05eth/tools/oracle.py`
- `assets/prize-map.svg`
- `docs/glossary.md`
- `docs/illustrations.md`
- `docs/methodology.md`
- `docs/style-guide.md`
- `docs/templates/README.template.md`
- `docs/templates/leads.template.md`
- `docs/templates/puzzle.template.json`
- `docs/templates/tested.template.md`
- `docs/verify-funding.md`
- `engines/.gitignore`
- `engines/README.md`
- `engines/arv_candfile.py`
- `engines/arweave_var_engine.cu`
- `engines/arweave_var_host.py`
- `engines/bip39_passphrase_engine.cu`
- `engines/bip39pass_eth.py`
- `engines/bip39pass_oracle.py`
- `engines/bip39pass_stream.py`
- `engines/build.sh`
- `engines/electrum_v1_engine.cu`
- `engines/lib/__init__.py`
- `engines/lib/bip39_english.txt`
- `engines/lib/bip39_multipath.py`
- `engines/lib/btc_p2pkh.py`
- `engines/lib/rushwallet_derive.py`
- `engines/p2wsh_2of2_pairs.cu`
- `engines/perm11_eth_host.py`
- `engines/pzl3_arweave_engine.cu`
- `engines/pzl3_host.py`
- `engines/secp256k1_hash160_engine.cu`
- `puzzles.json`
- `requirements.lock`
- `schema/puzzle.schema.json`
- `tools/build_index.py`
- `tools/check_escrows.py`
- `tools/derive.py`
- `tools/fig_prize_bars.py`
- `tools/requirements.txt`
- `tools/validate.py`

## Интерпретация расхождений (куратор-заметка, OCP Sync 2026-10-18)

- `arweave-puzzle-12-400ar`, `ftpk-season-2-300usdt`, `logicbeach-powerful-moss-0-54eth`,
  `pindar-van-arman-cryptoartgan-nft` — OCP помечает `open`, у нас папки в `solved/`. Их on-chain
  сверка датирована 2026-08-16/2026-08-27 (`verified_on` в `puzzles.json`), наша — 2026-10-12
  (`solved/INDEX.md`: свип/пустой контракт/USDT=0). **Наше подтверждение новее → OCP отстаёт,
  ничего не меняем**; в папках эти пазлы получили двойную фиксацию статуса в `LOG.md`.
- `caesarcoder-genesis-block-wallet-puzzle-947ksats` — обратный случай: OCP впереди, у нас ещё
  `puzzles/`. Закрыт и перенесён в `solved/caesarcoder-genesis-block-wallet-puzzle-947ksats`
  в этом же проходе (свип 2026-10-17 03:40 UTC, наше on-chain-подтверждение 120/120 spent).
- `peter-todd-hash-collision-bounties-0-59btc` — у OCP статус `watch` (не `open`): это 4 живых
  P2SH-скрипта с выплатой (bounty) за коллизии, призовой фонд не «заперт» в обычном смысле. У нас остаётся
  активным; расхождение терминологии, не фактов.
- Tier-несоответствия (у OCP `1-big/2-mid/3-small`, у нас другие оценки) в дельту не входят:
  сравнение статусов — по факту «открыт/решён/мёртв», не по размеру приза.
