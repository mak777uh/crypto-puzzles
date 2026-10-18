# LogicBeach: Powerful Moss
> **ПЕРЕМЕЩЕНО 2026-10-17 в `master/solved/`** — пазл решён/закрыт/тупиковый, активная работа не ведётся. Причина: [../INDEX.md](../INDEX.md). Вернуть в `puzzles/` — только при новых данных (правила: `AGENT_INSTRUCTIONS.md`).

Индекс: [MASTER_CATALOG.md](../../MASTER_CATALOG.md) (Части 1-8). Источник данных: [open-crypto-puzzles](https://github.com/floflo777/open-crypto-puzzles).

## Кратко
- Статус: **open** (mid)
- Цепь: base
- Приз: 0.55 ETH (USD 1034)
- Примечание: the pot grows over time toward the contract's full balance; it was 0.54 ETH at the private research folder's prior check and 0.55 ETH on 2026-08-16, consistent with the contract's own time-based ramp, not a partial claim
- Опубликовано: 2025-01-17 https://logicbeach.xyz/powerfulmoss
- Типы: image-stego, bip39-seed, word-selection, smart-contract
- Difficulty left: insight
- the carrier (the POAP clock image, not the audio), the order (clock position), and the derivation path are all confirmed; 3 of 12 hours read with no ambiguity and over 3.3 million combinations of the rest have been tested negative; the blocker is a resolution limit on the only known copy of the image (a numeral spans about 2 text rows, so 9 of 12 hours carry about 3 candidate words each), not raw compute, so an unrecovered insight into the exact readout rule or a finer source is what remains

## Адреса/эскроу
- `0x831102C7eb86f9EC8f79dF891bDeA187D54344Dd` — prize contract | expected: 0.25 ETH minimum, growing toward the full contract balance | state: contract-holds-funds (checked 2026-08-16) | https://basescan.org/address/0x831102C7eb86f9EC8f79dF891bDeA187D54344Dd

## Источники
- 2025-01-17 — LogicBeach, Powerful Moss puzzle page — https://logicbeach.xyz/powerfulmoss
- 2025-01-24 — LogicBeach, launch-period tweet (8 people have discovered the POAP) — https://x.com/Logic_Beach/status/1882824094854557885
- 2026-08-16 — POAP drop, PowerfulMoss By LogicBeach.eth — https://poap.gallery/drops/183468
- 2026-08-16 — Bifurcations solve write-up (prior puzzle, method precedent only) — https://elronvhubbard.medium.com/logic-beach-bifurcations-album-puzzle-write-up-1e1094d41038
- 2026-08-16 — 2021 ETH puzzle write-up (prior puzzle, method precedent only) — https://l0gicbeach.medium.com/logicbeach-eth-album-puzzle-2021-57acaf1910db

## Подробности
Здесь должна накапливаться расширенная информация по мере проходов: подсказки, прогресс сообщества, проверенные гипотезы, ссылки, compute-оценки. Текущий файл — скелет из OCP; заполняется автоматически в циклах.


---
## Логирование (обязательно)
См. `../../AGENT_INSTRUCTIONS.md`. Любая значимая находка/прогресс/баланс/решение (полностью или частично) **должна** быть дописана сюда с датой и ссылкой. Параллельные агенты обязаны соблюдать тот же протокол.

## OCP deep docs
- Folder: https://github.com/floflo777/open-crypto-puzzles/tree/main/2-mid-prizes/logicbeach-powerful-moss-0-54eth
- README (raw): https://raw.githubusercontent.com/floflo777/open-crypto-puzzles/main/2-mid-prizes/logicbeach-powerful-moss-0-54eth/README.md

## Досье Hark v2 (16.10.2026) — каталог 7.2

### LogicBeach «Powerful Moss» — 0,55 ETH (Base)
- ⚠️ **ПОПРАВКА 16.10: по нашей ончейн-проверке приз ЗАБРАН / эскроу пуст** (см. 8.6 §0). Статус «открыто» ниже — устаревшие данные OCP (август).
- **Контракт**: `0x831102C7eb86f9EC8f79dF891bDeA187D54344Dd` (Base), min 0.25 ETH, растёт по кривой времени
- **Статус**: открыто (contract-holds-funds, проверено 16.08.2026)
- **Тип**: image-stego, bip39-seed, word-selection, smart-contract
- **Источники**:
  - Страница: https://logicbeach.xyz/powerfulmoss
  - X: https://x.com/Logic_Beach/status/1882824094854557885
  - POAP: https://poap.gallery/drops/183468
  - Write-up (предыдущий пазл LogicBeach): https://elronvhubbard.medium.com/logicbeach-bifurcations-album-puzzle-write-up-1e1094d41038
  - Write-up (2021 ETH): https://l0gicbeach.medium.com/logicbeach-eth-album-puzzle-2021-57acaf1910db
  - OCP: https://github.com/floflo777/open-crypto-puzzles/tree/main/2-mid-prizes/logicbeach-powerful-moss-0-54eth
- **Суть**: носитель = картинка POAP-часов, порядок = позиция стрелки; 3 из 12 часов читаются однозначно, >3.3M kombinatsiy остальных отрицательны; блокер — разрешение картинки.

## Досье agntn/puzzles (16.10.2026)

Перенесено из реестра [@agntn/puzzles](https://puzzles.agntn.dev/collections/powerful-moss) (raw: https://puzzles.agntn.dev/collections/powerful-moss.md). Ниже — разбор первоисточника: механика, кто решал, что проверено.

- `id`: "powerful-moss"
- `chain`: "base"
- `address`: "0x635739254BDE27d28301f25aD57c3cAC3C3468f3"
- `sourceUrl`: PAGE
- `startedAt`: "2025-01-17 12:55:27"
- `preGenesis`: true
- `status`: Status.Claimed
- `prize`: 0.5594043765685484
- `pubkey`: uncompressed("04d8e5d3…22a8da6604")

> LogicBeach's 2025 album on Donkey Kong Country 2 soundfonts hides twelve seed words in the music. The prize sat in a contract on Base for twenty months until somebody took all of it

January 17, 2025, 12:55 UTC. LogicBeach [casts on Farcaster](https://farcaster.xyz/logic-beach/0x57ab427d): "Let this Moss grow on you!" A new album is out on the usual streaming services, and the puzzle lives on [logicbeach.xyz](https://logicbeach.xyz/powerfulmoss). Twelve songs, twelve seed words hidden somewhere in them, and a prize on Base for whoever puts the words together.

The pitch on the page is "Borrowing funky soundfonts hot off the DonkeyKongCountry2 SuperNintendo cartridge". So yes, the soundtrack of your childhood, now with a wallet inside. Grab headphones and a notepad.

## How the Powerful Moss puzzle works

The page at launch spelled it out. "Hidden across the tracks are 12 secret seed words". Then four steps:

1. Find all twelve words hidden in the album.
2. Put them in the right order.
3. Import the phrase into a wallet.
4. Hit withdraw on the page with that wallet.

The phrase derives one wallet. The page calls it the winner wallet, and only that wallet can pull the prize out of the contract. The contract also sells the album as an NFT, at least 0.01 ETH, and every mint goes into the prize.

That long description is gone from the page now. What's left is the short version: 12 songs, "and all that implies", and "There's more waiting for those who pay attention and fall through the surface cracks." The March 2025 Wayback capture still has the whole thing, and so does the repo.

### Why the lossless .wav files matter

One line from the launch page: "The Puzzle will require the actual lossless .wav files so...". And that's where it stops. Best hint on the page, and it trails off.

Streaming services compress the audio, and the page wants the files nobody compressed. Those came from the contract: mint the NFT and the page hands you a download link. Which means every solver who buys the album makes the prize bigger for everyone else. Nice trick.

The other option on the page was "Steal the album", linking a YouTube clip called "One of the worst and coolest of crimes". It isn't the album.

## What LogicBeach said before the launch

The album took almost a year, and LogicBeach talked about it on Farcaster the whole way. The record keeps <dataset-count of="hints" puzzle="powerful-moss">

</dataset-count>

 hints, many of them from those casts:

- March 2024: Donkey Kong Country 2 MIDI soundfonts, "iykyk", and a puzzle "that requires uncommon knowledge, but won't take a genius, to solve."
- April 2024: "a few of the 12 words already baked in".
- April 2024 again: "It'll be similar to this one", with a link to Bifurcations and its solution.
- September 2024: the older puzzles were technically hard and got solved "way too fast", so "I am taking care to make this one more creative."
- A week after the launch: "8 people have discovered the /poap This is a good sign ;]"

### Is it like Bifurcations?

The author says so. Bifurcations was LogicBeach's 2020 album puzzle with a Bitcoin prize, and it got solved. Somebody wrote up the whole solve on [Medium](https://elronvhubbard.medium.com/logic-beach-bifurcations-album-puzzle-write-up-1e1094d41038), and that's the link LogicBeach gave. Homework, basically.

## Why the 1 ETH prize is about half that

The launch page promised "1 ETH (currently ~$4,000) and whatever else has been tossed into the prize wallet". The note under it: the pot "starts at 0.25 ETH and grows to 1 ETH over the course of 2 months", and withdrawing earlier forfeits the rest to the creator. Today the page says the pot grows "to the full contract balance" instead.

The chain never got near the first version. The 0.25 ETH came in one mint on January 10, 2025. The rest is people buying the album: 0.1, 0.05, 0.03, and a long line of 0.01. A week after the launch LogicBeach said the prize was "up to ~0.5 ETH and growing". The contract has never held 1 ETH. The two months ran out in March 2025, so by the page's rules whoever finds the phrase gets all of it. Somebody took all of it.

### What happened on January 10

A week before the launch, the plumbing went in. At 16:46 UTC the winner wallet got 0.01 ETH from the address that deployed the contract two hours later. It called another contract and got 0.00641 ETH back. At 18:58 it minted the album itself, and a minute later that 0.01 ETH left the contract again. One more 0.01 ETH mint went in and straight back out, and at 19:03 came the 0.25 ETH. Looks a lot like somebody testing the pipes before opening the tap.

The last three mints, in 2026, paid 0.001 ETH each. The page asks for 0.01 minimum. The contract is less strict than its page.

### The contract isn't verified

Blockscout has no verified source for it, so the withdrawal rules come from the page, not from code anyone can read. The record takes the page at its word.

### The winner wallet already signed

Two of those January 10 transactions were signed by the winner wallet, so its public key is on chain and on the record. Nice to have. Useless to attack: a full 256-bit key with no range is not a brute force target.

## October 5, 2026: the moss is gone

Twenty months of nothing. Then, at 17:27:49 UTC, the winner wallet calls the contract and 0.553 ETH comes out. All of it. Two seconds later 0.559 ETH leaves the wallet for `0x7ba5e6a9…02e5`, an address that has never sent a thing. Two seconds. A script, or a very fast thumb.

Nine minutes after that, `0x7ba5208b…12e5` drops 0.0000001 ETH on the winner wallet. Put the two side by side: `0x7ba5…12e5` and `0x7ba5…02e5`. One digit apart at the end, close enough to fool a tired eye, and that's the point. It's address poisoning, a lookalike parked in the history in case the winner copies the wrong line next time. Somebody is watching this wallet, and it isn't only the winner.

Who was it? Nobody has said. A solver, or LogicBeach, who knows the words anyway? The last cast about the puzzle is from February 2025, and the twelve words aren't public. So the record says `claimed`, with the claim and no solver. Heard the words yourself? Now's a good time to tell.

## What the powerful-moss record carries

```ts [src/collections/powerful-moss.ts]
export const powerfulMossAlbum = puzzle({
  id: "powerful-moss",
  chain: "base",
  address: "0x635739254BDE27d28301f25aD57c3cAC3C3468f3",
  escrow: "0x831102C7eb86f9EC8f79dF891bDeA187D54344Dd",
  sourceUrl: PAGE,
  startedAt: "2025-01-17 12:55:27",
  preGenesis: true,
  status: Status.Claimed,
  pubkey: uncompressed("04d8e5d3…22a8da6604"),
  prize: 0.5594043765685484,
  solvedAt: "2026-10-05 17:27:49",
  stages: [stage("seed", …), stage("withdraw", …)],
  hints: [official("Using DonkeyKongCountry2 midi sound-fonts, iykyk ;] …", ANNOUNCEMENT, …), …],
  transactions: [funding(/* 2025-01-10 */), increase(…), transfer(…), decrease(…), …, claim(/* 2026-10-05 */), …],
});
```

### An address and an escrow

The seed opens a wallet, and the prize sits somewhere else. That's new here. So the record splits it: `address` is the winner wallet, the one the twelve words derive, and `escrow` is the contract holding the pot. `balance()` asks for both and adds them up, because that's what the phrase is worth. The [balances guide](https://puzzles.agntn.dev/guide/balances) has the details. The words moved the money, but they aren't public. The day they are, `verify` checks them against `address`, as usual.

### Base, not Ethereum

`chain: "base"` puts it on Base. The addresses look exactly like Ethereum ones, and the same key derives the same address on both chains. What differs is where you look: basescan.org for links, Blockscout at base.blockscout.com for the balance.

### Started at the launch, funded a week before

`startedAt` is the launch cast. The wallet and the contract were funded on January 10, so `preGenesis` marks that earlier money.

### A ledger across two addresses

`transactions` holds every move of ETH in or out of the two addresses. The winner wallet's own mint moved 0.01 ETH from one to the other. That's a `transfer`: listed, so `watch` stops calling it a spend and a deposit at once, and left out of the sum. Everything that came in before the claim, minus the two test withdrawals, adds up to 0.55941 ETH, yet `prize` says 0.5594043765685484. Where did the rest go? Gas. The winner wallet paid for its own two transactions out of the pot.

October 5 adds three lines. The withdrawal is another `transfer`, contract to wallet. The `claim` is the 0.559 ETH that left two seconds later. And the poisoner's dust is an `increase`, since `watch` would flag it otherwise. Even spam gets a receipt.

### Hints from a page that changed

The hints from the launch page carry `source` on the live page and a `confirmation` pointing at the March 2025 capture, since the live page lost most of that text. The page as the capture shows it and every cited cast are archived in `assets/sources/powerful-moss/`.

## The Powerful Moss record

## OCP: машинные данные (puzzles.json, 16.10.2026)

Структурированные данные из `puzzles.json` репозитория [open-crypto-puzzles](https://github.com/floflo777/open-crypto-puzzles) (snapshot OCP: 2026-08-16; цены: {'date': '2026-08-16', 'BTC': 63000, 'ETH': 1880, 'AR': 1.81, 'LTC': 54}).

- `slug`: logicbeach-powerful-moss-0-54eth
- `title`: LogicBeach: Powerful Moss
- `status`: **open**
- `tier`: mid | `chain`: base
- `series`: None
- `author`: LogicBeach | x:@Logic_Beach, instagram:null_atomo, ens:logicbeach.eth
- `prize`: 0.55 ETH (оценка $1034 на 2026-08-16) — the pot grows over time toward the contract's full balance; it was 0.54 ETH at the private research folder's prior check and 0.55 ETH on 2026-08-16, consistent with the contract's own time-based ramp, not a partial claim
- `published`: 2025-01-17 https://logicbeach.xyz/powerfulmoss
- `puzzle_type`: image-stego, bip39-seed, word-selection, smart-contract
- `target_format`: BIP39 12 words (English), BIP44 m/44'/60'/0'/0/0, no passphrase, address must equal the winner wallet authorized to call withdraw()
- `difficulty_left`: insight
- `difficulty_note`: the carrier (the POAP clock image, not the audio), the order (clock position), and the derivation path are all confirmed; 3 of 12 hours read with no ambiguity and over 3.3 million combinations of the rest have been tested negative; the blocker is a resolution limit on the only known copy of the image (a numeral spans about 2 text rows, so 9 of 12 hours carry about 3 candidate words each), not raw compute, so an unrecovered insight into the exact readout rule or a finer source is what remains
- `tested_total`: {'candidates': 3319137, 'families': 3, 'certified': True}

**Адреса и проверенное состояние:**
- `0x831102C7eb86f9EC8f79dF891bDeA187D54344Dd` — escrow | prize contract | ожидается: 0.25 ETH minimum, growing toward the full contract balance | проверено 2026-08-16: **contract-holds-funds**
  - https://basescan.org/address/0x831102C7eb86f9EC8f79dF891bDeA187D54344Dd

**Деривация:**
- read 12 words in clock order off the POAP clock-and-wordlist image, derive the BIP44 m/44'/60'/0'/0/0 address (plus a small account/index neighbor sweep), and compare it to the winner wallet the prize contract's withdraw() function accepts
- оракул: `tools/oracle.py` | сертифицирован: True
- сверено с: the public BIP39 all-zero-entropy test vector and the artist's own prior solved 'Bifurcations' BIP84 vector

**Зацепки (OCP `leads`):**
  - title: re-run the grid enumeration at a wider row window, one doubtful hour at a time | status: open
  - title: resample at the numeral's bottom pixel instead of its centroid | status: open
  - title: test the sunburst ray length as an alternative per-hour selector | status: open

**Артефакты (OCP `artifacts`):**
  - source: https://assets.poap.xyz/b655b40f-722e-4d6f-9a74-5bea17c539a3.png

**Материалы третьих лиц:**
- the POAP artwork in clues/ is the author's own published puzzle material; the album audio, video, and stems are the artist's commercial work and are not included, only our own text findings about them; the 2 prior-puzzle write-ups are cited by URL for method precedent, not reproduced

**Источники (OCP `sources`):**
  - url: https://logicbeach.xyz/powerfulmoss | title: LogicBeach, Powerful Moss puzzle page | date: 2025-01-17
  - url: https://x.com/Logic_Beach/status/1882824094854557885 | title: LogicBeach, launch-period tweet (8 people have discovered the POAP) | date: 2025-01-24
  - url: https://poap.gallery/drops/183468 | title: POAP drop, PowerfulMoss By LogicBeach.eth | date: 2026-08-16
  - url: https://elronvhubbard.medium.com/logic-beach-bifurcations-album-puzzle-write-up-1e1094d41038 | title: Bifurcations solve write-up (prior puzzle, method precedent only) | date: 2026-08-16
  - url: https://l0gicbeach.medium.com/logicbeach-eth-album-puzzle-2021-57acaf1910db | title: 2021 ETH puzzle write-up (prior puzzle, method precedent only) | date: 2026-08-16
