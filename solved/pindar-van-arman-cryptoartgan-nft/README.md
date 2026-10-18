# Pindar Van Arman: cryptoArtGAN Act 1 Puzzle
> **ПЕРЕМЕЩЕНО 2026-10-17 в `master/solved/`** — пазл решён/закрыт/тупиковый, активная работа не ведётся. Причина: [../INDEX.md](../INDEX.md). Вернуть в `puzzles/` — только при новых данных (правила: `AGENT_INSTRUCTIONS.md`).

Индекс: [MASTER_CATALOG.md](../../MASTER_CATALOG.md) (Части 1-8). Источник данных: [open-crypto-puzzles](https://github.com/floflo777/open-crypto-puzzles).

## Кратко
- Статус: **open** (mid)
- Цепь: ethereum
- Приз: 1 NFT (USD None)
- Примечание: 1 ERC-1155 NFT, "Magic Internet moneyGAN" (445/512); no market value recorded for this specific piece
- Опубликовано: 2022-02-05 https://bitgans.com/news/cryptoartgans
- Типы: bip39-seed, word-selection
- Difficulty left: insight
- the derivation is standard and fully understood; what is unresolved is which 11 published words are the 'glitches' and their order. About 22.5 million addresses and 9 fully-ordered 11-word sets have been checked with zero matches

## Адреса/эскроу
- `0x18f87ec9c527aba1db44f715456bf28b0dae478d` — main | expected: 1 NFT (Magic Internet moneyGAN, 445/512) | state: funded-unspent (checked 2026-08-16) | https://etherscan.io/address/0x18f87ec9c527aba1db44f715456bf28b0dae478d

## Источники
- 2026-08-16 — Pindar Van Arman, artist site — https://bitgans.com/
- 2022-02-05 — cryptoArtGAN announcement — https://bitgans.com/news/cryptoartgans
- 2022-08-25 — Restated on X — https://x.com/VanArman/status/1562799956175757313
- 2022-01-01 — "BIP39 and bitGANs" journal entry — https://bitgans.com/journal/page014

## Подробности
Здесь должна накапливаться расширенная информация по мере проходов: подсказки, прогресс сообщества, проверенные гипотезы, ссылки, compute-оценки. Текущий файл — скелет из OCP; заполняется автоматически в циклах.


---
## Логирование (обязательно)
См. `../../AGENT_INSTRUCTIONS.md`. Любая значимая находка/прогресс/баланс/решение (полностью или частично) **должна** быть дописана сюда с датой и ссылкой. Параллельные агенты обязаны соблюдать тот же протокол.

## OCP deep docs
- Folder: https://github.com/floflo777/open-crypto-puzzles/tree/main/2-mid-prizes/pindar-van-arman-cryptoartgan-nft
- README (raw): https://raw.githubusercontent.com/floflo777/open-crypto-puzzles/main/2-mid-prizes/pindar-van-arman-cryptoartgan-nft/README.md

## Досье Hark v2 (16.10.2026) — каталог 7.2

### Pindar Van Arman «cryptoArtGAN Act 1» — 1 NFT (ERC-1155)
- ⚠️ **ПОПРАВКА 16.10: по нашей ончейн-проверке приз ЗАБРАН / эскроу пуст** (см. 8.6 §0). Статус «открыто» ниже — устаревшие данные OCP (август).
- **Контракт/адрес**: `0x18f87ec9c527aba1db44f715456bf28b0dae478d` (Ethereum), NFT «Magic Internet moneyGAN» (445/512)
- **Статус**: открыто (funded-unspent, проверено 16.08.2026)
- **Тип**: bip39-seed, word-selection
- **Источники**:
  - Сайт: https://bitgans.com/
  - Анонс: https://bitgans.com/news/cryptoartgans (05.02.2022)
  - X: https://x.com/VanArman/status/1562799956175757313 (25.08.2022)
  - Журнал: https://bitgans.com/journal/page014
  - OCP: https://github.com/floflo777/open-crypto-puzzles/tree/main/2-mid-prizes/pindar-van-arman-cryptoartgan-nft
- **Суть**: нужно выбрать 11 «глитчей» из 12 опубликованных слов и их порядок; ~22.5M адресов и 9 полных наборов проверены, 0 совпадений.

## OCP: машинные данные (puzzles.json, 16.10.2026)

Структурированные данные из `puzzles.json` репозитория [open-crypto-puzzles](https://github.com/floflo777/open-crypto-puzzles) (snapshot OCP: 2026-08-16; цены: {'date': '2026-08-16', 'BTC': 63000, 'ETH': 1880, 'AR': 1.81, 'LTC': 54}).

- `slug`: pindar-van-arman-cryptoartgan-nft
- `title`: Pindar Van Arman: cryptoArtGAN Act 1 Puzzle
- `status`: **open**
- `tier`: mid | `chain`: ethereum
- `series`: Van Arman's bitGANs / cryptoArtGAN wallet-puzzle system
- `author`: Pindar Van Arman | x:@VanArman, web:bitgans.com
- `prize`: 1 NFT (оценка $None на 2026-08-16) — 1 ERC-1155 NFT, "Magic Internet moneyGAN" (445/512); no market value recorded for this specific piece
- `published`: 2022-02-05 https://bitgans.com/news/cryptoartgans
- `puzzle_type`: bip39-seed, word-selection
- `target_format`: BIP39 12 words (English), standard Ethereum derivation, no passphrase stated
- `difficulty_left`: insight
- `difficulty_note`: the derivation is standard and fully understood; what is unresolved is which 11 published words are the 'glitches' and their order. About 22.5 million addresses and 9 fully-ordered 11-word sets have been checked with zero matches
- `tested_total`: {'candidates': 22500000, 'families': 3, 'certified': False}

**Адреса и проверенное состояние:**
- `0x18f87ec9c527aba1db44f715456bf28b0dae478d` — escrow | main | ожидается: 1 NFT (Magic Internet moneyGAN, 445/512) | проверено 2026-08-16: **funded-unspent**
  - https://etherscan.io/address/0x18f87ec9c527aba1db44f715456bf28b0dae478d

**Деривация:**
- 11 words the artist calls 'glitches' plus a 12th checksum-constrained word form a 12-word BIP39 mnemonic, derived to an Ethereum address and compared to the escrow

**Зацепки (OCP `leads`):**
  - title: frame-by-frame analysis of the artist's Act 1 - Review archive on Arweave | status: open
  - title: finish the on-chain metadata sweep (about 132 token indices return 404) | status: open
  - title: a bounded 11! x 128 sweep once a specific 11-word set is argued for | status: open

**Источники (OCP `sources`):**
  - url: https://bitgans.com/ | title: Pindar Van Arman, artist site | date: 2026-08-16
  - url: https://bitgans.com/news/cryptoartgans | title: cryptoArtGAN announcement | date: 2022-02-05
  - url: https://x.com/VanArman/status/1562799956175757313 | title: Restated on X | date: 2022-08-25
  - url: https://bitgans.com/journal/page014 | title: "BIP39 and bitGANs" journal entry | date: 2022-01-01
