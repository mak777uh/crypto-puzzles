# Реестр GitHub-интейков (шлюз)

Правило — `AGENT_INSTRUCTIONS.md`, раздел «GitHub-интейк — обязательный первый шлюз (с 18.10.2026)».
Статусы: `done` | `partial` (бюджет/дедлайн, остаток в `data/github/resume.json`) |
`none` (репо не найдено, проверено по N запросам — шлюз закрыт корректно) |
`legacy` (дампы лежат в старых путях пазла) | `pending` (шлюз ещё не пройден).
Машиночитаемая версия — `_sources/GITHUB_INTAKE_STATUS.json`. Пересборка по диску:
`python tools/github_intake.py status --refresh` (сеть не тратит).

| Дата | Агент | slug | Статус | Репо | API-запросов | HEAD | Дайдест |
|---|---|---|---|---|---|---|---|
| 2026-10-18 | Qoder | 11b-x-1371 | none | 0 | 0 |  | data/github/GITHUB_INTAKE.md |
| 2026-10-18 | AutoClaw | 310-btc-challenge-0-31btc | partial | 4 (bitcoin/bips, baryalangpo/bips, pubky/bips, pancamarga41/bips) | 24 | 927b6de9 | puzzles/310-btc-challenge-0-31btc/data/github/GITHUB_INTAKE.md |
| 2026-10-18 | Qoder | 9vw04-gem-finder | partial | 4 (agntn/puzzles, floflo777/open-crypto-puzzles, canalqb/puzzle_bc1qr5mssp6snmduqp9enx4dzmcxvk7qw83lceyy2v, canalqb/agentehermes) | 9 | decdd4db | puzzles/9vw04-gem-finder/data/github/GITHUB_INTAKE.md |
| 2026-10-18 | Qoder | arweave-puzzle-11-1eth | partial | 4 (floflo777/open-crypto-puzzles, homelessphd/ar_puzzles, consigcody94/arweave-puzzle-11, homelessphd/btc32) | 14 | f28531c0 | puzzles/arweave-puzzle-11-1eth/data/github/GITHUB_INTAKE.md |
| 2026-10-18 | Qoder | cardano-13373665-challenge | done | 2 (eggdropper/13373665challenge, chewiegumballoni/13373665challenge) | 0 | 569e0fe2 | puzzles/cardano-13373665-challenge/data/github/GITHUB_INTAKE.md |
| 2026-10-18 | Qoder | gsmg-io-5btc-puzzle | partial | 4 | 14 |  | data/github/GITHUB_INTAKE.md |
| 2026-10-18 | Big Pickle | guntis-vitolins-metamask-8-6eth | partial | 4 (floflo777/open-crypto-puzzles, agntn/puzzles, noobsilence/crypto-puzzle-lab, pytorch/pytorch) | 11 | f28531c0 | puzzles/guntis-vitolins-metamask-8-6eth/data/github/GITHUB_INTAKE.md |
| 2026-10-18 | Qoder | ktimesg-phy-challenge-0-008btc | partial | 4 | 25 |  | data/github/GITHUB_INTAKE.md |
| 2026-10-18 | Qoder | smith-lyle-moore-hunt-2-0-032btc | partial | 4 (floflo777/open-crypto-puzzles, benjacasas02/independent-cryptography-research, diploux/unsolved-crypto-puzzles, schum-io/open-crypto-puzzles) | 10 | 19644e58 | puzzles/smith-lyle-moore-hunt-2-0-032btc/data/github/GITHUB_INTAKE.md |
| 2026-10-18 | AutoClaw | tumblecaesar-1000algo | done | 1 (harttraveller/tumblecaesar) | 2 |  | puzzles/tumblecaesar-1000algo/data/github/GITHUB_INTAKE.md |
| 2026-10-18 | Qoder | zden-haluska-halv-312ksats | partial | 2 | 0 |  | data/github/GITHUB_INTAKE.md |
| 2026-10-19 | Qoder | 1000-btc-challenge-bitcoin-puzzle-tx | partial | 4 (roadhero/bitcoin-puzzle-info, ilkerccom/btcpuzzle, alexanderthurn/1000-btc-challenge, brichard19/bitcrack) | 25 | 6bbd33dc | puzzles/1000-btc-challenge-bitcoin-puzzle-tx/data/github/GITHUB_INTAKE.md |
| 2026-10-19 | AutoClaw | bitcoin-coders-puzzle-07-21ksats | partial | 4 (agntn/puzzles, bitcoin/bips, floflo777/open-crypto-puzzles, iesta/1btcpuzzle) | 15 | de226b2a | puzzles/bitcoin-coders-puzzle-07-21ksats/data/github/GITHUB_INTAKE.md |
| 2026-10-19 | Beam | crypto-puzzles-2018-puzzle-2-0-05eth | done | 1 (floflo777/open-crypto-puzzles) | 0 | 09b7676e | puzzles/crypto-puzzles-2018-puzzle-2-0-05eth/data/github/GITHUB_INTAKE.md |
| 2026-10-19 | Beam | groestlcoin-puzzle-1000grs | none | 0 | 0 |  | puzzles/groestlcoin-puzzle-1000grs/data/github/GITHUB_INTAKE.md |
| 2026-10-19 | Beam | mapnificent-treasure-hunt-mth202610 | none | 0 | 0 |  | puzzles/mapnificent-treasure-hunt-mth202610/data/github/GITHUB_INTAKE.md |
| 2026-10-19 | Beam | purebasic-t85211-600eur | none | 0 | 0 |  | puzzles/purebasic-t85211-600eur/data/github/GITHUB_INTAKE.md |
| 2026-10-19 | AutoClaw | rcodes-1ojeu3c-5usd | none | 0 | 0 |  | puzzles/rcodes-1ojeu3c-5usd/data/github/GITHUB_INTAKE.md |
| 2026-10-19 | AutoClaw | rcodes-1tk3up2-500usd | none | 0 | 0 |  | puzzles/rcodes-1tk3up2-500usd/data/github/GITHUB_INTAKE.md |
| 2026-10-19 | Beam | rectorsquid-arrow-puzzle-50usd | none | 0 | 0 |  | puzzles/rectorsquid-arrow-puzzle-50usd/data/github/GITHUB_INTAKE.md |
