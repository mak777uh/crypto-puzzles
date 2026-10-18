# Bitaps Shamir Secret Sharing Challenge

Индекс: [MASTER_CATALOG.md](../../MASTER_CATALOG.md) (Части 1-8). Источник данных: [open-crypto-puzzles](https://github.com/floflo777/open-crypto-puzzles).

## Кратко
- Статус: **open** (big)
- Цепь: bitcoin
- Приз: 1.00016775 BTC (USD 63011)
- Примечание: single P2WPKH escrow, funded across 5 transactions ending 2022-10
- Опубликовано: 2020-06-19 https://web.archive.org/web/20230328022959/https://bitaps.com/mnemonic/challenge
- Типы: shamir, bip39-seed
- Difficulty left: external-info
- residual entropy is about 125 bits after every constraint I could establish (duplicate-value coefficient rejection plus a real defect in the deployed 2020 generator's entropy check); no third Shamir share has surfaced in the public record, including same-day Reddit and Telegram copies, the 2020-07-04 Common Crawl body, archive.today, live mirrors, and 13 GitHub forks of mnemonic-offline-tool; the published zpub is a BIP84 account key and its 0/0 child is the escrow; what would close this is that missing share, or a disclosed constraint on it, not compute

## Адреса/эскроу
- `bc1qyjwa0tf0en4x09magpuwmt2smpsrlaxwn85lh6` — main | expected: 1.00016775 BTC (100,016,775 sats) | state: funded-unspent (checked 2026-08-28) | https://mempool.space/address/bc1qyjwa0tf0en4x09magpuwmt2smpsrlaxwn85lh6

## Источники
- 2020-06-19 — Shamir Secret Backup Scheme bug bounty (challenge page) — https://bitaps.com/mnemonic/challenge
- 2020-07-04 — Common Crawl CC-MAIN-2020-29 challenge page (challenge.warc) — https://bitaps.com/mnemonic/challenge
- 2021-06-20 — archive.today snapshot of the challenge page — https://archive.is/8bNRM
- 2020-06-19 — Bitaps announcement — https://x.com/bitaps_com/status/1274018817304379394
- 2020-06-19 — Bitaps Reddit copy, r/Bitcoin hc4bfk — https://www.reddit.com/r/Bitcoin/comments/hc4bfk/1_btc_cryptographic_challenge_with_splitted/
- 2020-06-19 — Bitaps Telegram copy — https://t.me/bitapscom/15
- 2020-06-19 — mnemonic-offline-tool, commit 5b6dd995 (bundles jsbtc) — https://github.com/bitaps-com/mnemonic-offline-tool/commit/5b6dd995478b49c489b95444fbb0dca4006746a2
- 2026-08-16 — bitaps-com/jsbtc (repository) — https://github.com/bitaps-com/jsbtc
- 2026-07-16 — jsbtc issue #65, coefficient-bias defect — https://github.com/bitaps-com/jsbtc/issues/65
- 2026-08-28 — mempool.space, escrow address — https://mempool.space/address/bc1qyjwa0tf0en4x09magpuwmt2smpsrlaxwn85lh6

## Подробности
Здесь должна накапливаться расширенная информация по мере проходов: подсказки, прогресс сообщества, проверенные гипотезы, ссылки, compute-оценки. Текущий файл — скелет из OCP; заполняется автоматически в циклах.


---
## Логирование (обязательно)
См. `../../AGENT_INSTRUCTIONS.md`. Любая значимая находка/прогресс/баланс/решение (полностью или частично) **должна** быть дописана сюда с датой и ссылкой. Параллельные агенты обязаны соблюдать тот же протокол.

## OCP deep docs
- Folder: https://github.com/floflo777/open-crypto-puzzles/tree/main/1-big-prizes/bitaps-shamir-challenge-1btc
- README (raw): https://raw.githubusercontent.com/floflo777/open-crypto-puzzles/main/1-big-prizes/bitaps-shamir-challenge-1btc/README.md
## Досье Hark v2 (16.10.2026)

Перенесено из `MASTER_CATALOG_v2_2026-10-16.md` (рабочие досье агентов Hark, 16.10.2026 23:40 МСК). Картина механизма, подсказок, проверенных и отброшенных гипотез, оракулов и файлов.

### B11. Bitaps Shamir SSS — 1,00016775 BTC
- **→ Полное актуальное досье (что решено, что проверено, что осталось): ЧАСТЬ 8.6 (Bitaps).** Старая краткая запись заменена.


### B11. Bitaps Shamir SSS — 1,00016775 BTC
- **Адрес/сеть**: `bc1qyjwa0tf0en4x09magpuwmt2smpsrlaxwn85lh6` (BIP84 m/84'/0'/0'/0/0). **Баланс**: 100 016 775 сат, трат 0. Проверено 14.10 22:05 МСК, перед этим 14.10 17:03 +04.
- **Источники**:
  - https://bitaps.com/mnemonic/challenge (копия `challenge.html`);
  - код jsbtc master (последний коммит 30.09.2020), `src/functions/shamir_secret_sharing.js`, `bip39_mnemonic.js`;
  - OCP `1-big-prizes/bitaps-shamir-challenge-1btc`; на GitHub больше 40 issues (2026) с тем же выводом.
- **Механизм**: 3-of-5 Shamir над GF(256); x упакован в 4 бита checksum. Две доли опубликованы (слова — в каталоге).
- **Что установлено** (аудит 13.10):
  - GF(256) (AES 0x11b, генератор 3), Лагранж и pow корректны; x-индексы берутся из отдельного буфера.
  - Утечка 1: `while(q.includes(w))` — 0,27 бита.
  - Утечка 2: `igamc()` вызывает `igam()` без S → ReferenceError → буфер отбраковывается при χ² < 3. P(pass) = 0,139 (замер rtest.py), то есть ≤2,85 бита на буфер.
  - Итого утечка ≤~9 бит, остаток ≥2¹¹⁹.
- **Проверено и отброшено**: слабость, которая свела бы задачу к ≤1e9, в коде не найдена. Баг `continue` в do-while срабатывает с вероятностью ~1e-38 — неважен.
- **Что осталось / следующий шаг**: только третья доля или доказательство, что сама мнемоника сгенерирована не CSPRNG (данных нет). Регулярные сессии не ставились (решение 13.10).
- **Файлы/скрипты**: `/workspace/work/bitaps_sss/NOTES.md`, `rtest.py`, `challenge.html`, `jsbtc/` (клон).
- **Проекты Hark и статус**: проект d54060b7-9c4a-4ca9-95be-d49e44dd2240, сторож 5b44f3ad. 14.10 22:00 Илья: «do not touch». У стратега — «не брать никогда».
- **Оценка шансов**: ~0 %.

## Оперативный статус v2 (16.10.2026 ~23:30 МСК)

Строка из сводной таблицы `MASTER_CATALOG_v2` (Часть 0.3):

| Bitaps Shamir | 1,00016775 BTC | ~0 | ≥2¹¹⁹, не брать | — |


## Curated deep dive (OCP, 16.10.2026)
- Приз 1.00016775 BTC (P2WPKH), Shamir 3-of-5 над GF(256); опубликованы 2 доли (S1, S2). N=3 без третьей доли (≥2^119).
- Доли:
  S1: session cigar grape merry useful churn fatal thought very any arm unaware
  S2: clock fresh security field caution effort gorilla speed plastic common tomato echo
- Заблокировано: третья доля не surfaced в публичном рекорде (Reddit/Telegram/CommonCrawl/архивы/13 GitHub forks). Утечка или новая подсказка нужна.
- Ресурсы для проверки (OCP): Common Crawl CC-MAIN-2020-29; archive.is; jsbtc issue #65 коэффициент-смещение.

## Досье agntn/puzzles (16.10.2026)

Перенесено из реестра [@agntn/puzzles](https://puzzles.agntn.dev/collections/bitaps) (raw: https://puzzles.agntn.dev/collections/bitaps.md). Ниже — разбор первоисточника: механика, кто решал, что проверено.

- `id`: "bitaps"
- `chain`: "bitcoin"
- `address`: "bc1qyjwa0tf0en4x09magpuwmt2smpsrlaxwn85lh6"
- `sourceUrl`: "https://bitaps.com/mnemonic/challenge"
- `startedAt`: "2020-06-19 13:24:41"
- `prize`: 1.00016775
- `pubkey`: compressed("0385a3a591451ed7ed6c90dae882db918107d6f906d270cf4728d168126e0e89aa")
- `key`: derivation("m/84'/0'/0'/0/0")

> One SegWit address behind a 3 of 5 Shamir secret sharing scheme. Two shares and the extended public key are published. One bitcoin and change since 2020.

## The puzzle

Bitaps split a mnemonic into five shares with a threshold of three. They published two of them and the account's zpub, and put a bitcoin on the first receiving address. Three shares recover the seed. Two don't, by construction. So the challenge is a statement about the scheme as much as a bounty: you can't get there from what's public.

## What the records carry

The one record in the collection is the only one with `shares` on it:

```ts [src/collections/bitaps.ts]
export const bitapsPuzzle = puzzle({
  id: "bitaps",
  chain: "bitcoin",
  address: "bc1qyjwa0tf0en4x09magpuwmt2smpsrlaxwn85lh6",
  sourceUrl: "https://bitaps.com/mnemonic/challenge",
  startedAt: "2020-06-19 13:24:41",
  pubkey: compressed("0385a3a591451ed7ed6c90dae882db918107d6f906d270cf4728d168126e0e89aa"),
  key: derivation("m/84'/0'/0'/0/0")
    .xpub(
      "zpub6qdEDkv51FpxX6g1rpFGckmiL46vV8ccmtEgPAkj3qj8N4ZZHyXDRA9RwpTiFK2Kb8vRaDmSmwgX6rfB4t2K8Ktdq8ExQ6fumKpn2ndJCqL",
    )
    .shares(3, 5, [
      share(1, "session cigar grape merry useful churn fatal thought very any arm unaware"),
      share(
        2,
        "clock fresh security field caution effort gorilla speed plastic common tomato echo",
      ),
    ]),
  prize: 1.00016775,
  transactions: [
    funding("a24e…25e6", "2020-06-19 13:24:41", 1),
    increase("bb0b…f167", "2021-11-29 12:20:03", 0.00008781),
    increase("fe3f…c14d", "2022-02-05 20:43:56", 0.00002403),
    increase("910c…b272", "2022-10-13 00:48:34", 0.0000522),
    increase("c617…3419", "2026-02-01 14:34:35", 0.00000371),
  ],
});
```

The public key is known because the zpub gives it. The private key isn't. A path plus an xpub is no secret, so `hasPrivateKey()` says `false`. The four top-ups since 2020 are on the record as `increase` transactions. That's why the prize has change on the end.

## Status

Open, and a singleton. The id is `bitaps`, `bitaps.get()` takes no argument, and `get("bitaps")` at the top level finds it too.

## The record

The one puzzle in this collection, the way its page shows it.

## OCP: машинные данные (puzzles.json, 16.10.2026)

Структурированные данные из `puzzles.json` репозитория [open-crypto-puzzles](https://github.com/floflo777/open-crypto-puzzles) (snapshot OCP: 2026-08-28; цены: {'date': '2026-08-16', 'BTC': 63000, 'ETH': 1880, 'AR': 1.81, 'LTC': 54}).

- `slug`: bitaps-shamir-challenge-1btc
- `title`: Bitaps Shamir Secret Sharing Challenge
- `status`: **open**
- `tier`: big | `chain`: bitcoin
- `series`: None
- `author`: Bitaps | x:@bitaps_com, web:bitaps.com
- `prize`: 1.00016775 BTC (оценка $63011 на 2026-08-16) — single P2WPKH escrow, funded across 5 transactions ending 2022-10
- `published`: 2020-06-19 https://web.archive.org/web/20230328022959/https://bitaps.com/mnemonic/challenge
- `puzzle_type`: shamir, bip39-seed
- `target_format`: BIP39 12-word English mnemonic (the secret), BIP84 m/84'/0'/0'/0/0, no passphrase
- `difficulty_left`: external-info
- `difficulty_note`: residual entropy is about 125 bits after every constraint I could establish (duplicate-value coefficient rejection plus a real defect in the deployed 2020 generator's entropy check); no third Shamir share has surfaced in the public record, including same-day Reddit and Telegram copies, the 2020-07-04 Common Crawl body, archive.today, live mirrors, and 13 GitHub forks of mnemonic-offline-tool; the published zpub is a BIP84 account key and its 0/0 child is the escrow; what would close this is that missing share, or a disclosed constraint on it, not compute
- `tested_total`: {'candidates': 394191, 'families': 10, 'certified': True}

**Адреса и проверенное состояние:**
- `bc1qyjwa0tf0en4x09magpuwmt2smpsrlaxwn85lh6` — escrow | main | ожидается: 1.00016775 BTC (100,016,775 sats) | проверено 2026-08-28: **funded-unspent**
  - https://mempool.space/address/bc1qyjwa0tf0en4x09magpuwmt2smpsrlaxwn85lh6

**Деривация:**
- reconstruct a 16-byte secret from 3 of 5 Shamir shares over GF(256) (2 published, 1 needed), re-encode as a BIP39 mnemonic with its true checksum, derive BIP84 m/84'/0'/0'/0/0, compare to the escrow
- оракул: `tools/oracle.py` | сертифицирован: True
- сверено с: public BIP84 test vector (abandon x11 + about) and a synthetic 3-of-5 GF(256) split/reconstruct round trip; no solved sibling exists for this puzzle

**Зацепки (OCP `leads`):**
  - title: the unpublished 3rd share; same-day copies, the 2020-07-04 Common Crawl body, and later archives all show only the original 2 shares | status: open
  - title: Memento TimeTravel still unreachable; X reply tree beyond the 3 replies returned with the announcement | status: open

**Материалы третьих лиц:**
- the 2 published Shamir shares and the challenge-page quotes are Bitaps's own puzzle material, quoted briefly with source and date; no third-party copyrighted material is included

**Источники (OCP `sources`):**
  - url: https://bitaps.com/mnemonic/challenge | title: Shamir Secret Backup Scheme bug bounty (challenge page) | date: 2020-06-19
  - url: https://bitaps.com/mnemonic/challenge | title: Common Crawl CC-MAIN-2020-29 challenge page (challenge.warc) | date: 2020-07-04
  - url: https://archive.is/8bNRM | title: archive.today snapshot of the challenge page | date: 2021-06-20
  - url: https://x.com/bitaps_com/status/1274018817304379394 | title: Bitaps announcement | date: 2020-06-19
  - url: https://www.reddit.com/r/Bitcoin/comments/hc4bfk/1_btc_cryptographic_challenge_with_splitted/ | title: Bitaps Reddit copy, r/Bitcoin hc4bfk | date: 2020-06-19
  - url: https://t.me/bitapscom/15 | title: Bitaps Telegram copy | date: 2020-06-19
  - url: https://github.com/bitaps-com/mnemonic-offline-tool/commit/5b6dd995478b49c489b95444fbb0dca4006746a2 | title: mnemonic-offline-tool, commit 5b6dd995 (bundles jsbtc) | date: 2020-06-19
  - url: https://github.com/bitaps-com/jsbtc | title: bitaps-com/jsbtc (repository) | date: 2026-08-16
  - url: https://github.com/bitaps-com/jsbtc/issues/65 | title: jsbtc issue #65, coefficient-bias defect | date: 2026-07-16
  - url: https://mempool.space/address/bc1qyjwa0tf0en4x09magpuwmt2smpsrlaxwn85lh6 | title: mempool.space, escrow address | date: 2026-08-28
