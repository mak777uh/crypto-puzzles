# AH White: Walking Banks

Индекс: [MASTER_CATALOG.md](../../MASTER_CATALOG.md) (Части 1-8). Источник данных: [open-crypto-puzzles](https://github.com/floflo777/open-crypto-puzzles).

## Кратко
- Статус: **open** (mid)
- Цепь: bitcoin
- Приз: 800000 sats (USD 504)
- Примечание: split across two P2WPKH addresses derived from one published xpub, funded 2024-09-05
- Опубликовано: 2025-05-01 https://njump.me/npub1c2rvx6ue9uewl452kczcfxz9w242sfzn64ul8dv2afd3t5dpktzs0kmmvf
- Типы: bip39-seed, book, text-cipher
- Difficulty left: external-info
- the mechanism is fully understood and the published text has been mined exhaustively; only 1 of 6 organ-donor groups (4 of 24 words) is printed as a decodable block, and the other 5 are not present anywhere in the free PDF, the site text, or the audiobook narration, which argues the remaining words depend on hints the author has not yet published

## Адреса/эскроу
- `bc1qxy4tf0s4n7x9w24rawf9qsxh2hyljrmvyrhwzt` — account 0, index 0 | expected: 100000 sats | state: funded-unspent (checked 2026-10-19) | https://mempool.space/address/bc1qxy4tf0s4n7x9w24rawf9qsxh2hyljrmvyrhwzt
- `bc1q4qc24xk5cehc4t7vr264zldsms2kmxf86jqjau` — account 0, index 1 | expected: 700000 sats | state: funded-unspent (checked 2026-10-19) | https://mempool.space/address/bc1q4qc24xk5cehc4t7vr264zldsms2kmxf86jqjau

## Источники
- 2026-08-16 — AH White, Nostr profile — https://njump.me/npub1c2rvx6ue9uewl452kczcfxz9w242sfzn64ul8dv2afd3t5dpktzs0kmmvf
- 2026-08-16 — Walking Banks, official site (Find the Treasure) — https://walkingbanks.com
- **2026-10-19 — сайт мёртв:** walkingbanks.com отдаёт заглушку Hostinger «Your domain is expired» (HTTP 200, 10 881 байт); официальная страница/подсказки недоступны, приз на обоих адресах жив (100 000 + 700 000 сат, spent 0). См. LOG.md.

## Подробности
Здесь должна накапливаться расширенная информация по мере проходов: подсказки, прогресс сообщества, проверенные гипотезы, ссылки, compute-оценки. Текущий файл — скелет из OCP; заполняется автоматически в циклах.


---
## Логирование (обязательно)
См. `../../AGENT_INSTRUCTIONS.md`. Любая значимая находка/прогресс/баланс/решение (полностью или частично) **должна** быть дописана сюда с датой и ссылкой. Параллельные агенты обязаны соблюдать тот же протокол.

## OCP deep docs
- Folder: https://github.com/floflo777/open-crypto-puzzles/tree/main/2-mid-prizes/ah-white-walking-banks-800ksats
- README (raw): https://raw.githubusercontent.com/floflo777/open-crypto-puzzles/main/2-mid-prizes/ah-white-walking-banks-800ksats/README.md

## Досье agntn/puzzles (16.10.2026)

Перенесено из реестра [@agntn/puzzles](https://puzzles.agntn.dev/collections/walking-banks) (raw: https://puzzles.agntn.dev/collections/walking-banks.md). Ниже — разбор первоисточника: механика, кто решал, что проверено.


> AH White hid a real 24-word Bitcoin seed in the thriller Walking Banks. 800000 sats wait on two addresses. Four words are known and twenty are not.

A murder mystery where the victims carry a seed phrase in their DNA. Fun premise. Then [AH White](https://puzzles.agntn.dev/authors/ah-white) made it real.

On September 5, 2024, two deposits landed on one wallet, **100,000 sats** and **700,000 sats**. The next day the author posted the whole novel as a [free PDF on Nostr](https://njump.me/note1jvpc4m95fdr5hxqkhpyj5alcaeqj7hwtr6hdp4zk5n9uvewpzkyq2ldrlv). The seed is somewhere in that book. Nobody has found it. Two years on, both deposits are still there.

## How the Walking Banks hunt works

### Read the book, find the words

The rules fit in two sentences on the author's site:

> The book holds information that, when pieced together, unveil a seed phrase to a wallet containing real bitcoin; 0.008 BTC, or 800,000 Satoshis to be precise.

That's it. No riddle page, no puzzle numbers. Just a novel and a wallet. walkingbanks.com has since expired, so the records read it through the Wayback Machine. The treasure outlived its own domain.

### Page 122 shows how it's done

122 is the number printed on the page. The PDF viewer calls it 128. There, a lab decodes an intron someone planted in a victim's DNA. This string comes out:

```text
xiiithirdiiicrystaliiismalliiiadviceiiireflectxxxxxxcrystaliiismalliiiadviceiiireflectxxxxxxcrystaliiismalliiiadviceiiireflectiiithirdiiix
```

The characters work it out on the next page. "Third" appears twice, every other word three times. The repeats are error correction against mutations, and the words are BIP39. Then Ying says it out loud: crystal, small, advice and reflect go in "as the third list of words" of a longer seed. If every list holds four words, that's positions 9 to 12.

So the book teaches the decoder on itself. Nice touch. Too bad it only does it once.

### The hints came slowly

The author promised hints if the wallet stayed full. They're short, and every one is on the record with its Nostr note:

- May 2025: it's 24 words.
- November 2025: word repetitions are allowed in a seed phrase.
- March 2026: the book contains the words in the right order.

That last one sounds generous. Is it? It rules out a shuffle, sure. It doesn't say where the other five lists are.

## Two addresses, one seed

### Why the collection has two records

One 24-word seed funds two native SegWit addresses. `walking-banks/1` holds 100,000 sats and `walking-banks/2` holds 700,000, numbered in the order they were funded. Each gets its own record, like the [Dug hunt](https://puzzles.agntn.dev/collections/dug) does, because each is a separate prize on the chain. Find the seed and you take both.

### The site published an xpub, not an address

The Find the Treasure section linked the wallet's xpub on blockchain.com. That key is the account level of the wallet, so it derives every address the seed can show. Read it as native SegWit and child `0/0` and `0/1` are exactly the two funded addresses. Both records carry that xpub, with the paths `m/84'/0'/0'/0/0` and `m/84'/0'/0'/0/1`. The author never said 84, so that part is the native SegWit convention, not her word. The xpub is hers, though. Got a candidate seed? Derive its account key and compare. One string match away from 800,000 sats.

Read it as legacy and you get an empty wallet. [floflo777](https://puzzles.agntn.dev/solvers/floflo777) points out that most explorers do just that. And in August 2025 the author [answered a reader](https://njump.me/note1l9kql0d2urf8n26zgls65mssq4r5wmp27w77uzeu33jn5j3z0pvsuafh3a) that no transaction showed up, not even the deposits. The coins were there the whole time. The explorer was looking in the wrong drawer.

## What's still open in Walking Banks

Everything past those four words. floflo777's [write up](https://github.com/floflo777/open-crypto-puzzles/tree/main/2-mid-prizes/ah-white-walking-banks-800ksats) covers the free PDF, the site text and the audiobook narration. Acrostics, typography, a search for more strings like that one. Only the page 122 string came out. Their best lead is to ask the author whether the free PDF holds all 24 words at all.

Twenty words of 2048 each is far past any search. Four missing words is about a day on one GPU, by floflo777's estimate. So the hunt is waiting for one more hint, or one more reader. Maybe you?

## The Walking Banks puzzle records

<collection-puzzles collection="walking-banks">

</collection-puzzles>

## OCP: машинные данные (puzzles.json, 16.10.2026)

Структурированные данные из `puzzles.json` репозитория [open-crypto-puzzles](https://github.com/floflo777/open-crypto-puzzles) (snapshot OCP: 2026-08-16; цены: {'date': '2026-08-16', 'BTC': 63000, 'ETH': 1880, 'AR': 1.81, 'LTC': 54}).

- `slug`: ah-white-walking-banks-800ksats
- `title`: AH White: Walking Banks
- `status`: **open**
- `tier`: mid | `chain`: bitcoin
- `series`: None
- `author`: AH White | nostr:npub1c2rvx6ue9uewl452kczcfxz9w242sfzn64ul8dv2afd3t5dpktzs0kmmvf, reddit:AH_W
- `prize`: 800000 sats (оценка $504 на 2026-08-16) — split across two P2WPKH addresses derived from one published xpub, funded 2024-09-05
- `published`: 2025-05-01 https://njump.me/npub1c2rvx6ue9uewl452kczcfxz9w242sfzn64ul8dv2afd3t5dpktzs0kmmvf
- `puzzle_type`: bip39-seed, book, text-cipher
- `target_format`: BIP39 24 words (English), empty passphrase, account key matching the published xpub (native SegWit, BIP84)
- `difficulty_left`: external-info
- `difficulty_note`: the mechanism is fully understood and the published text has been mined exhaustively; only 1 of 6 organ-donor groups (4 of 24 words) is printed as a decodable block, and the other 5 are not present anywhere in the free PDF, the site text, or the audiobook narration, which argues the remaining words depend on hints the author has not yet published
- `tested_total`: {'candidates': 0, 'families': 9, 'certified': True}

**Адреса и проверенное состояние:**
- `bc1qxy4tf0s4n7x9w24rawf9qsxh2hyljrmvyrhwzt` — escrow | account 0, index 0 | ожидается: 100000 sats | проверено 2026-08-16: **funded-unspent**
  - https://mempool.space/address/bc1qxy4tf0s4n7x9w24rawf9qsxh2hyljrmvyrhwzt
- `bc1q4qc24xk5cehc4t7vr264zldsms2kmxf86jqjau` — escrow | account 0, index 1 | ожидается: 700000 sats | проверено 2026-08-16: **funded-unspent**
  - https://mempool.space/address/bc1q4qc24xk5cehc4t7vr264zldsms2kmxf86jqjau

**Деривация:**
- derive the account-0 extended key (BIP84/44/49/86, empty passphrase) for a candidate 24-word mnemonic and compare its compressed public key and chain code to the published xpub
- оракул: `tools/oracle.py` | сертифицирован: True
- сверено с: the published xpub's own derivation of the two known treasure addresses, plus the public 24-word BIP39 test vector (all-zero entropy, checksum word 'art')

**Зацепки (OCP `leads`):**
  - title: write to the author | status: open
  - title: watch the Nostr feed for new hints | status: open
  - title: GPU completion of the last 4 words once 20 are known | status: open

**Материалы третьих лиц:**
- no book pages, OCR text, or audiobook audio/transcripts are included; the one chapter 11 passage quoted in clues/author-posts.md is the short excerpt that carries the puzzle's own decoding rule

**Источники (OCP `sources`):**
  - url: https://njump.me/npub1c2rvx6ue9uewl452kczcfxz9w242sfzn64ul8dv2afd3t5dpktzs0kmmvf | title: AH White, Nostr profile | date: 2026-08-16
  - url: https://walkingbanks.com | title: Walking Banks, official site (Find the Treasure) | date: 2026-08-16
