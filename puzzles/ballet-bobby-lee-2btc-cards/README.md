# Ballet / Bobby Lee: Take Bobby's Bitcoin

Индекс: [MASTER_CATALOG.md](../../MASTER_CATALOG.md) (Части 1-8). Источник данных: [open-crypto-puzzles](https://github.com/floflo777/open-crypto-puzzles).

## Кратко
- Статус: **open** (big)
- Цепь: bitcoin
- Приз: 2.00007358 BTC (USD 126005)
- Примечание: two independent cards, 1.00003481 BTC (AA009926) and 1.00003877 BTC (AA012381); a third card, AA007448, was solved and swept by a third party in 2020 and is not part of the live prize
- Опубликовано: 2020-07-24 https://x.com/bobbyclee/status/1289004702122643456
- Типы: bip38, physical-object
- Difficulty left: external-info
- the BIP38 EC-multiply pipeline is fully confirmed against the solved sibling card; each open card publishes only one half of its BIP38 pair (encrypted WIF on the back face, passphrase on the front face under a scratch-off), and the missing half was never photographed; image forensics on all 4 published photographs recover 0 characters of either missing half; brute force of either missing half is not feasible (about 100 bits for a passphrase, one full scrypt computation per guess)

## Адреса/эскроу
- `1JxWyNrkgYvgsHu8hVQZqTXEB9RftRGP5m` — AA009926 | expected: 100003481 sats | state: funded-unspent (checked 2026-08-16) | https://mempool.space/address/1JxWyNrkgYvgsHu8hVQZqTXEB9RftRGP5m
- `1QGtbKxx6FKDD66LwnrzHCAHmyZ7mDHqC4` — AA012381 | expected: 100003877 sats | state: funded-unspent (checked 2026-08-16) | https://mempool.space/address/1QGtbKxx6FKDD66LwnrzHCAHmyZ7mDHqC4
- `1LL6Xy92LwGDRfQP9fBU7f1477cEKctr7c` — AA007448 (oracle, solved by a third party in 2020, not part of the live prize) | expected: n/a | state: swept (checked 2026-08-16) | https://mempool.space/address/1LL6Xy92LwGDRfQP9fBU7f1477cEKctr7c

## Источники
- 2020-07-24 — Bobby Lee, challenge announcement — https://x.com/bobbyclee/status/1289004702122643456
- 2026-08-16 — oritwoen/boha, community data mirror (addresses, encrypted WIFs, passphrases, card photographs) — https://github.com/oritwoen/boha

## Подробности
Здесь должна накапливаться расширенная информация по мере проходов: подсказки, прогресс сообщества, проверенные гипотезы, ссылки, compute-оценки. Текущий файл — скелет из OCP; заполняется автоматически в циклах.


---
## Логирование (обязательно)
См. `../../AGENT_INSTRUCTIONS.md`. Любая значимая находка/прогресс/баланс/решение (полностью или частично) **должна** быть дописана сюда с датой и ссылкой. Параллельные агенты обязаны соблюдать тот же протокол.

## OCP deep docs
- Folder: https://github.com/floflo777/open-crypto-puzzles/tree/main/1-big-prizes/ballet-bobby-lee-2btc-cards
- README (raw): https://raw.githubusercontent.com/floflo777/open-crypto-puzzles/main/1-big-prizes/ballet-bobby-lee-2btc-cards/README.md


## Curated deep dive (OCP, 16.10.2026)
- Два открытых card’а: AA009926 (1.00003481 BTC) и AA012381 (1.00003877 BTC); третья AA007448 решена третьими (reference oracle).
- Формат: BIP38 EC-multiply encrypted WIF + passphrase из 5 групп по 4 символа (~100 бит each). Недостает halves: в одном WIF, в другом passphrase; image forensics 0; brute force неосуществим.
-utenant: Escrow addresses in mempool: 1JxWyNrkgYvgsHu8hVQZqTXEB9RftRGP5m и 1QGtbKxx6FKDD66LwnrzHCAHmyZ7mDHqC4.
- Зацепки: (1) фотография back face AA012381 (WIF); (2) фотография passphrase scratch-off AA009926; (3) раскрытие slабости энтропии Ballet 2020.

## Досье agntn/puzzles (16.10.2026)

Перенесено из реестра [@agntn/puzzles](https://puzzles.agntn.dev/collections/ballet) (raw: https://puzzles.agntn.dev/collections/ballet.md). Ниже — разбор первоисточника: механика, кто решал, что проверено.

- `id`: "ballet/AA007448"
- `chain`: "bitcoin"
- `address`: "1LL6Xy92LwGDRfQP9fBU7f1477cEKctr7c"
- `sourceUrl`: "https://x.com/bobbyclee/status/1289004702122643456"
- `startedAt`: "2020-07-24 05:46:12"
- `status`: Status.Solved
- `prize`: 0.0011
- `pubkey`: compressed("0351a7b8675ac06922080803608908267ec7f5bf93ecdd78969083647ac8a67d0d")
- `key`: hex("a5b9247400b7e31e54481f14828ced3a538af280e9eeb1229196c3cb5e7ecdde")

> Three Ballet cards with BIP38 keys printed on them. One decrypted for 0.0011 BTC. Two hold a bitcoin each. One waits on a passphrase and one on its encrypted key.

## The puzzle

Ballet sells physical wallets. A card with an address and a BIP38 encrypted private key printed on it, the passphrase under a scratch panel. In July 2020 Bobby Lee posted three of them as a challenge, encrypted key visible, panel intact. One had a small balance and its passphrase was found within a week. The other two hold a bitcoin each and are open for different reasons, below.

## What the records carry

A Ballet record starts from `encryptedWif(payload, { passphrase })`. When the passphrase is known, the record also carries the decrypted WIF and the hex, and the data gate decrypts the BIP38 payload with native scrypt to confirm the two agree. When it isn't, the record has the payload alone. `hasPrivateKey()` is still `true`, because an encrypted key is a representation of the key, and `verify` answers `unavailable` with `WIF is encrypted`.

```ts [src/collections/ballet/AA007448.ts]
export const balletPuzzleAA007448 = puzzle({
  id: "ballet/AA007448",
  chain: "bitcoin",
  address: "1LL6Xy92LwGDRfQP9fBU7f1477cEKctr7c",
  sourceUrl: "https://x.com/bobbyclee/status/1289004702122643456",
  startedAt: "2020-07-24 05:46:12",
  status: Status.Solved,
  pubkey: compressed("0351a7b8675ac06922080803608908267ec7f5bf93ecdd78969083647ac8a67d0d"),
  key: hex("a5b9247400b7e31e54481f14828ced3a538af280e9eeb1229196c3cb5e7ecdde")
    .wif("L2mrYyo5a6rpyQdC88UitNeH5n1rAqPcq8Qv5gwtQE8KTvW3ZTeH")
    .encrypted("6PnWfKaBfDW6mFFhhFsbNRHnVgojUhdf2b5NXP3FfwXiQ69MxEzVK2J4cH", {
      passphrase: "335Y-K745-C8WT-4D2W-80WP",
    }),
  prize: 0.0011,
  solvedAt: "2020-07-31 01:52:18",
  assets: assets({
    puzzle: "AA007448/puzzle.jpg",
    sourceUrl: "https://x.com/bobbyclee/status/1289004702122643456",
  }),
});
```

Each record ships the photo of its card under `assets/ballet/`.

## Status

`ballet/AA009926` has its encrypted key on the record and no passphrase. `ballet/AA012381` is the other way round: the passphrase is known, the encrypted key never made it onto the record. Ballet's `XXXX-XXXX-XXXX-XXXX-XXXX` passphrases aren't in any wordlist, so the bitcoins are still there.

## Every puzzle

One page each: the record, the transactions and the live balance.

<collection-puzzles collection="ballet">

</collection-puzzles>

## OCP: машинные данные (puzzles.json, 16.10.2026)

Структурированные данные из `puzzles.json` репозитория [open-crypto-puzzles](https://github.com/floflo777/open-crypto-puzzles) (snapshot OCP: 2026-08-16; цены: {'date': '2026-08-16', 'BTC': 63000, 'ETH': 1880, 'AR': 1.81, 'LTC': 54}).

- `slug`: ballet-bobby-lee-2btc-cards
- `title`: Ballet / Bobby Lee: Take Bobby's Bitcoin
- `status`: **open**
- `tier`: big | `chain`: bitcoin
- `series`: None
- `author`: Bobby Lee | x:@bobbyclee
- `prize`: 2.00007358 BTC (оценка $126005 на 2026-08-16) — two independent cards, 1.00003481 BTC (AA009926) and 1.00003877 BTC (AA012381); a third card, AA007448, was solved and swept by a third party in 2020 and is not part of the live prize
- `published`: 2020-07-24 https://x.com/bobbyclee/status/1289004702122643456
- `puzzle_type`: bip38, physical-object
- `target_format`: BIP38 encrypted WIF (EC-multiply, blob prefix 0x0143) plus a passphrase (5 groups of 4 characters, about 32-symbol alphabet), decrypted to a compressed private key, derived to a P2PKH address
- `difficulty_left`: external-info
- `difficulty_note`: the BIP38 EC-multiply pipeline is fully confirmed against the solved sibling card; each open card publishes only one half of its BIP38 pair (encrypted WIF on the back face, passphrase on the front face under a scratch-off), and the missing half was never photographed; image forensics on all 4 published photographs recover 0 characters of either missing half; brute force of either missing half is not feasible (about 100 bits for a passphrase, one full scrypt computation per guess)
- `tested_total`: {'candidates': 5, 'families': 5, 'certified': True}

**Адреса и проверенное состояние:**
- `1JxWyNrkgYvgsHu8hVQZqTXEB9RftRGP5m` — escrow | AA009926 | ожидается: 100003481 sats | проверено 2026-08-16: **funded-unspent**
  - https://mempool.space/address/1JxWyNrkgYvgsHu8hVQZqTXEB9RftRGP5m
- `1QGtbKxx6FKDD66LwnrzHCAHmyZ7mDHqC4` — escrow | AA012381 | ожидается: 100003877 sats | проверено 2026-08-16: **funded-unspent**
  - https://mempool.space/address/1QGtbKxx6FKDD66LwnrzHCAHmyZ7mDHqC4
- `1LL6Xy92LwGDRfQP9fBU7f1477cEKctr7c` — escrow | AA007448 (oracle, solved by a third party in 2020, not part of the live prize) | ожидается: n/a | проверено 2026-08-16: **swept**
  - https://mempool.space/address/1LL6Xy92LwGDRfQP9fBU7f1477cEKctr7c

**Деривация:**
- decrypt the card's BIP38 EC-multiply encrypted WIF with its own passphrase to get a private key, derive the compressed P2PKH address, and compare it to the card's escrow address
- оракул: `tools/oracle.py` | сертифицирован: True
- сверено с: the solved sibling card AA007448 (encrypted WIF 6PnWfKaB...J4cH, passphrase 335Y-K745-C8WT-4D2W-80WP), reproduced byte for byte: address, WIF, and private key hex

**Зацепки (OCP `leads`):**
  - title: a photograph of AA012381's back face (the missing encrypted WIF) | status: open
  - title: a photograph of AA009926's passphrase scratch-off face | status: open
  - title: a credible disclosure of a Ballet 2020 entropy weakness | status: open

**Артефакты (OCP `artifacts`):**
  - source: https://raw.githubusercontent.com/oritwoen/boha/main/assets/ballet/AA009926/puzzle.jpg
  - source: https://raw.githubusercontent.com/oritwoen/boha/main/assets/ballet/AA009926/revealed.jpg
  - source: https://raw.githubusercontent.com/oritwoen/boha/main/assets/ballet/AA012381/puzzle.jpg
  - source: https://raw.githubusercontent.com/oritwoen/boha/main/assets/ballet/AA007448/puzzle.jpg

**Материалы третьих лиц:**
- the 4 card photographs in clues/ are the author-published puzzle itself (mirrored from Bobby Lee's own posted images via github.com/oritwoen/boha); no book, article, or other third-party copyrighted material is included

**Источники (OCP `sources`):**
  - url: https://x.com/bobbyclee/status/1289004702122643456 | title: Bobby Lee, challenge announcement | date: 2020-07-24
  - url: https://github.com/oritwoen/boha | title: oritwoen/boha, community data mirror (addresses, encrypted WIFs, passphrases, card photographs) | date: 2026-08-16
