# LuckyLurker Bitcoin Vault #2

Индекс: [MASTER_CATALOG.md](../../MASTER_CATALOG.md) (Части 1-8).

## Кратко
- Статус: **open (отложен)**
- Цепь: bitcoin
- Приз: 1,0 BTC
- Опубликовано: 2026-08-12 (финансирование), автор Paul Jones
- Типы: electrum-seed, bip39-seed
- Что осталось / сложность: подсказок 0; автор отложил пазл из-за проблем со спонсором

## Адреса/эскроу
- `bc1qnepv9pcnqvndux9h9mcaxvk6u993rc0lew9fpp` — main | финансирован 12.08.2026, tx `2314d7f0`
- Проверка баланса: https://mempool.space/address/bc1qnepv9pcnqvndux9h9mcaxvk6u993rc0lew9fpp

## Источники
- 2026 — страница пазла — https://luckylurker.com/bitcoin-vault-2/
- 2026 — тема на bitcointalk 5577554 — https://bitcointalk.org/index.php?topic=5577554
- 2026 — X автора — https://x.com/LuckyLurkerPaul

## Подробности
- Автор: Paul Jones (LuckyLurker).
- Официальный статус: «Postponed until further notice» — спонсорские проблемы, подсказок 0.
- Модель по аналогии с Vault #1: Electrum SegWit seed **без** passphrase, путь m/0'/0/1.
- Vault #1 (0,0008 BTC) решён — см. соседнюю папку `luckylurker-vault-1-0-0008btc`.
- Пока подсказок нет, перебор бессмысленен: пространство 12-словной seed-фразы не сужено.

## Зацепки / следующий шаг
- Мониторить страницу пазла и X автора на предмет публикации подсказок
- Зафиксировать дату и tx финансирования для последующей проверки свипа

---
## Логирование (обязательно)
См. `../../AGENT_INSTRUCTIONS.md`. Любая значимая находка, прогресс, баланс или решение (полностью либо частично) **должны** быть дописаны сюда с датой и ссылкой на источник. Параллельные агенты обязаны соблюдать тот же протокол.

## История изменений
- 2026-10-16 (deepseek-flash) — папка создана; базовое досье собрано из `MASTER_CATALOG.md` (Части 1-8).
## Досье Hark v2 (16.10.2026)

Перенесено из `MASTER_CATALOG_v2_2026-10-16.md` (рабочие досье агентов Hark, 16.10.2026 23:40 МСК). Картина механизма, подсказок, проверенных и отброшенных гипотез, оракулов и файлов.

### B10. LuckyLurker Vault #2 — 1,0 BTC
- **→ Полное актуальное досье (что решено, что проверено, что осталось): ЧАСТЬ 8.6 (LuckyLurker #2).** Старая краткая запись заменена.


### B10. LuckyLurker Vault #2 — 1,0 BTC
- **Адрес/сеть**: `bc1qnepv9pcnqvndux9h9mcaxvk6u993rc0lew9fpp` (BTC). Профинансирован 12.08.2026, tx 2314d7f0…f198. **Баланс**: 100 000 000 сат, трат 0. Проверено 14.10 22:05 МСК и 15.10 01:45 МСК.
- **Источники**:
  - https://luckylurker.com/bitcoin-vault-2/ и https://luckylurker.com/bitcoin-vault-2-is-live-1-btc-prize/ — за SG-капчей, читать браузером;
  - bitcointalk 5577554 — последний пост #10 от 11.09, «Coming soon...»;
  - X @LuckyLurkerPaul — последний пост 08.10, «postponed». Автор Paul Jones.
- **Механизм** (по Vault #1): Electrum SegWit seed v100 без passphrase, путь m/0'/0/1 (второй receive-адрес). Подсказки сначала получали подписчики; публично они вышли 17–22 марта. 4 подсказки указывали на курсивные слова в обзорных статьях сайта.
- **Что установлено**: браузерная проверка 13.10 19:51 и 21:54 МСК показала «Bitcoin Vault #2 — Postponed Until Further Notice… unresolved arrangements with the promotion's sponsor». Даты нет, суммы нет, подсказок 0. Платной подписки нет, есть только бесплатная форма email.
- **Проверено и отброшено**: решать пока нечего. Запись инвентаря 12.10 «hints start today» устарела.
- **Что осталось / следующий шаг**: ждать перезапуска. 14.10 15:19 МСК адрес mak777777uh@gmail.com подписан на «Get Vault #2 updates» (Brevo/sibforms); подтверждающего письма не было. Если подсказки выйдут, это сразу ярус 1: oracle.py готов.
- **Файлы/скрипты**: `/workspace/work/luckylurker2/NOTES.md`, `oracle.py` (BIP39 84/49/44 с индексами 0–19 и Electrum segwit m/0'/0/0–19), копии страниц `vault2_page.md`, `vault2_islive_page.md`, `bitcointalk_sep2026plus.md`.
- **Проекты Hark и статус**: «LuckyLurker Vault #2: 1 BTC» (6ad2f71d-98c4-4cb1-be9a-d2bc49ae1ac2). Сторож eabd2a4e раз в 6 ч проверяет баланс, X, bitcointalk и Gmail; по журналу активен на 14.10. У стратега — ярус 3, «ждать».
- **Оценка шансов**: 0 сейчас. Риски: 1 BTC остаётся под контролем автора и может быть отозван или перезапущен с меньшим призом; после запуска будет гонка с подписчиками.

## Оперативный статус v2 (16.10.2026 ~23:30 МСК)

Строка из сводной таблицы `MASTER_CATALOG_v2` (Часть 0.3):

| LuckyLurker #2 | 1 BTC, не тронут | 0 сейчас | Отложен автором, подсказок нет | сторож |

## Обновление (2026-10-16, deepseek-flash — web-исследование)
- Тип: уточнение статуса и авторства
- Суть:
  - **Vault #1** (0,4 → 0,8 mBTC) стартовал в марте 2026 и был **вскрыт 22.08.2026** — весь приз забран он-чейн.
  - **Vault #2** с призом **1 BTC** анонсирован **11.09.2026** на bitcointalk, затем **отложен на неопределённый срок**
    из-за «unresolved arrangements with the promotion's sponsor». Страница прямо озаглавлена **«Postponed»**;
    подтверждённой даты запуска и суммы приза на ней нет.
  - При этом **1 BTC уже лежит на адресе с 12.08.2026**, tx `2314d7f0b76c4f29ed1cfb949fd2882d648712f5c6cbaef9d7dff8ddee46f198`.
  - Подсказки (не раскрывающие слова по одному) были запланированы с 12.10.2026; автор предупреждал, что их нужно **комбинировать**.
  - **Уточнение авторства:** на bitcointalk аккаунт называется **`Paul_LuckyLurker`** (u=3750819). Полное имя «Paul Jones»
    в проверенных источниках **не встречается**.
- Источники:
  - https://luckylurker.com/bitcoin-vault-2/
  - https://bitcointalk.org/index.php?topic=5577554.0
  - https://puzzles.agntn.dev/collections/luckylurker
- Не подтверждено: имя «Paul Jones»; схема и путь деривации Vault #2 (публичного ключа/сида нет — предполагать Electrum, как в #1, **нельзя**).
- Проверено: да — адрес, 1 BTC, отложенный статус.
- Риски: 1 BTC остаётся под контролем автора и может быть отозван или перезапущен с меньшим призом; после запуска будет гонка с подписчиками.

## Досье agntn/puzzles (16.10.2026)

Перенесено из реестра [@agntn/puzzles](https://puzzles.agntn.dev/collections/luckylurker) (raw: https://puzzles.agntn.dev/collections/luckylurker.md). Ниже — разбор первоисточника: механика, кто решал, что проверено.


> Paul Jones's Bitcoin Vault puzzles. Verify Vault 1's Electrum seed and claimed prize. Vault 2 has 1 BTC with public hints due October 12.

Two vaults, two different states: the first is solved, the second has a funded 1 BTC prize. Both come from [Paul Jones](https://luckylurker.com/author/paul-jones/), identified on LuckyLurker's [About page](https://luckylurker.com/about-us/) and posting as [Paul_LuckyLurker on Bitcointalk](https://bitcointalk.org/index.php?action=profile;u=3750819).

## Bitcoin Vault #1 solution

Paul [announced the hunt](https://bitcointalk.org/index.php?topic=5577554.0) on March 16, 2026 at 17:54:03 UTC. Twelve riddles pointed to twelve seed words; four sent readers to articles elsewhere on the site. The [vault page](https://luckylurker.com/bitcoin-vault/) dates its public hints from March 17 to March 22. The earlier forum announcement sets the puzzle's start date.

Each hint keeps its original wording in `text`. The word published after it was solved lives in `answer`, with its own source. Folding that word back into the clue would erase what participants actually had to solve.

### Electrum seed and derivation path

The published phrase is:

```text
visit kingdom unveil kangaroo deposit found great grid remind science umbrella spot
```

It's an **Electrum SegWit seed**, not BIP39, despite what the [author's recap](https://luckylurker.com/luckylurker-bitcoin-vault-1-has-been-cracked/) calls it. The distinction matters: BIP39 rejects its checksum, and skipping that check still produces the wrong wallet.

The phrase has [Electrum seed version](https://electrum.readthedocs.io/en/latest/seedphrase.html) `100`. With an empty passphrase, **m/0'/0/1** gives the funded address: the second receiving address, not the first. [Electrum's mnemonic code](https://github.com/spesmilo/electrum/blob/master/electrum/mnemonic.py) uses the salt `electrum`, and its [keystore](https://github.com/spesmilo/electrum/blob/master/electrum/keystore.py) starts this account at `m/0'`. BIP84 isn't the right path here.

### Verify the published seed

This check uses `@scure/bip32` 2.4.0 and `@agntn/keys` 0.3.0. It matches both the funded address and the public key exposed in the claim transaction.

```js
import assert from "node:assert/strict";
import { createHmac, pbkdf2Sync } from "node:crypto";
import { HDKey } from "@scure/bip32";
import { Bitcoin } from "@agntn/keys/blockchains/bitcoin";

const phrase =
  "visit kingdom unveil kangaroo deposit found great grid remind science umbrella spot";
assert.ok(createHmac("sha512", "Seed version").update(phrase).digest("hex").startsWith("100"));
const seed = pbkdf2Sync(phrase, "electrum", 2048, 64, "sha512");
const child = HDKey.fromMasterSeed(seed).derive("m/0'/0/1");
const bitcoin = new Bitcoin();
const pubkey = bitcoin.getKeyPublic(Buffer.from(child.privateKey).toString("hex"), {
  compressed: true,
});
assert.equal(pubkey, "024ad3b398bc9a95b4b8d44310e15a5355402dba3c784e60bf3b14821ca1622adb");
assert.equal(bitcoin.getAddress(pubkey, "segwit"), "bc1q32e3dxcd0n2tlzdmchraf2057d0ax4xdwrk3jq");
```

The record keeps these twelve words as `seed(...).electrum()`. `verify()` runs the same derivation through `@agntn/keys`. Or skip the plumbing: `verify(await requirePuzzle("luckylurker/vault-1"))` says `verified: true`. Paul published words. Now the record holds words too, not a hex nobody printed. This is a public solved puzzle, not a wallet to reuse.

### The 80,000-satoshi prize and claim

The [claim transaction](https://mempool.space/tx/75e570a5ea243c492e2804916482f046b2392b463c51be15624e6e25a84119f7) spent two 40,000-satoshi outputs on August 17, 2026 at 18:08:09 UTC. It paid 79,638 sats to `17oKQHHRxdQBiRaGKCoVDQJfebhPaZV3r7` and 362 sats in fees. The prize was 80,000 sats, not the smaller payout. Paul confirmed the solve but didn't name the solver.

## Bitcoin Vault #2 and its 1 BTC prize

[Vault #2](https://luckylurker.com/bitcoin-vault-2/) uses `bc1qnepv9pcnqvndux9h9mcaxvk6u993rc0lew9fpp`. Its [funding transaction](https://mempool.space/tx/2314d7f0b76c4f29ed1cfb949fd2882d648712f5c6cbaef9d7dff8ddee46f198) deposited 1 BTC on August 12, 2026 at 14:19:56 UTC. On September 20 the address still held that BTC, with no spends.

The [launch announcement](https://luckylurker.com/bitcoin-vault-2-is-live-1-btc-prize/) was published on September 11 at 16:42:56 UTC, per the [publisher's metadata](https://luckylurker.com/wp-json/wp/v2/posts?slug=bitcoin-vault-2-is-live-1-btc-prize&_fields=date,date_gmt,link,title). That's the second puzzle's start date. Funding came earlier; public hints come later.

### When do Vault #2 hints start?

Public hints are scheduled from **October 12, 2026**. All twelve slots were locked at the September 20 check. Paul warns that clues may need combining rather than mapping neatly to individual words.

Vault #2 has no recorded public key, seed or derivation path. Don't assume it uses Electrum just because the first vault did.

## Browse the LuckyLurker puzzle records

<collection-puzzles collection="luckylurker">

</collection-puzzles>
