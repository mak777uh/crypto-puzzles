# bitaddress.org BIP38 giveaway

Индекс: [MASTER_CATALOG.md](../../MASTER_CATALOG.md) (Части 1-8).

## Кратко
- Статус: **open**
- Цепь: bitcoin
- Приз: 0,005297 BTC
- Опубликовано: stacker.news/items/275973
- Типы: bip38, brainwallet, password-recovery
- Что осталось / сложность: пароль BIP38 забыт владельцем; перебор ограничен словарём владельца

## Адреса/эскроу
- `1J7BVeP8JK4op2X3GN3Hy7xkTnGnQTMpou` — main
- Проверка баланса: https://mempool.space/address/1J7BVeP8JK4op2X3GN3Hy7xkTnGnQTMpou

## Источники
- 2026 — пост владельца — https://stacker.news/items/275973

## Подробности
- Механизм: BIP38-шифрование приватного ключа, сгенерированного на bitaddress.org.
- Владелец забыл пароль и опубликовал адрес — фактически это задача восстановления пароля, а не «загадка с подсказками».
- BIP38 устойчив: каждый кандидат стоит два scrypt-прохода, поэтому скорость перебора низкая (тысячи/с на GPU).
- Этический нюанс: публикация сделана самим владельцем, что делает попытки законными, но приз фактически «забытый пароль».

## Зацепки / следующий шаг
- Оценить реалистичный словарь кандидатов (по постам владельца на stacker.news и в соцсетях)
- Проверить btcrecover с поддержкой BIP38
- Уточнить у владельца подсказки к паролю, если публикация ещё активна

---
## Логирование (обязательно)
См. `../../AGENT_INSTRUCTIONS.md`. Любая значимая находка, прогресс, баланс или решение (полностью либо частично) **должны** быть дописаны сюда с датой и ссылкой на источник. Параллельные агенты обязаны соблюдать тот же протокол.

## История изменений
- 2026-10-16 (deepseek-flash) — папка создана; базовое досье собрано из `MASTER_CATALOG.md` (Части 1-8).

## Обновление (2026-10-16, deepseek-flash — web-исследование)
- Тип: детализация задачи восстановления пароля
- Суть:
  - **6 октября 2023** пользователь **`q`** на **Stacker News** опубликовал пост «Brute force and the coins are yours»:
    картинку-бумажный кошелёк bitaddress.org, **BIP38-зашифрованный WIF** и адрес, парольную фразу к которому он забыл,
    предложив забрать монеты тому, кто её подберёт. Это демонстрация того, что парольная фраза — не дополнительный слой безопасности.
  - Уточнения автора: фраза вероятно **не длиннее 30 символов**, спецсимволы скорее **не** использовались,
    вероятно **комбинация из 3 разных паролей**; менеджером паролей он, скорее всего, не пользовался.
    Он ранее снимал средства с кошелька, поэтому фраза не может быть невозможной.
  - Сообщество по префиксу **`6Pf`** определило: **BIP38 EC-multiply, без сжатия, без lot/sequence**.
  - **Зашифрованный ключ:** `6PfQTphCYc1Fee19uPz2pmou5RVBDVgw8VcrPfGLos4ktUnARdiFLYhcNU`
  - **Открытый ключ (uncompressed):** `04f7af13c4fda2f920dbd8ebc8d2cc87cdc6674a7beda95a402ab83dd7e952597aeebdb76b2b4bc15771c57eb48568b2a8fa83219f9fa53519aaef5cd75bac30ac`
  - Баланс: **529 700 сатоши** при total received 4 865 700 (снятие 0,038063 BTC было прежним владельцем в 2016).
- Источники:
  - https://stacker.news/items/275973
  - https://stacker.news/items/276117
  - https://a.stacker.news/items/275973?commentId=276428
  - https://i.imgur.com/3RSb8MH.png
  - https://puzzles.agntn.dev/collections/bitaddress
- Не подтверждено: точные формулировки подсказок взяты из реестра (сам stacker.news при прямом fetch отдал ошибку соединения).
- Проверено: да — пост, зашифрованный ключ, адрес, подсказки автора, текущий непотраченный баланс.
- **Практический вывод:** задача сводится к словарю кандидатов; каждый кандидат стоит два scrypt-прохода, поэтому скорость низкая.

## Досье agntn/puzzles (16.10.2026)

Перенесено из реестра [@agntn/puzzles](https://puzzles.agntn.dev/collections/bitaddress) (raw: https://puzzles.agntn.dev/collections/bitaddress.md). Ниже — разбор первоисточника: механика, кто решал, что проверено.

- `id`: "bitaddress"
- `chain`: "bitcoin"
- `address`: "1J7BVeP8JK4op2X3GN3Hy7xkTnGnQTMpou"
- `sourceUrl`: THREAD
- `startedAt`: "2023-10-06 11:50:09"
- `prize`: 0.005297
- `pubkey`: uncompressed("04f7af13…d75bac30ac")
- `key`: encryptedWif("6PfQTphCYc1Fee19uPz2pmou5RVBDVgw8VcrPfGLos4ktUnARdiFLYhcNU")

> A bitaddress.org paper wallet whose owner forgot the BIP38 passphrase and gave the coins to whoever guesses it. Posted on Stacker News in October 2023 and still locked

October 6, 2023, 11:50 UTC. q [posts on Stacker News](https://stacker.news/items/275973) and the pitch is beautifully simple. Some years ago I made a paper wallet with a BIP38 passphrase. I don't remember the passphrase. Brute force it and the coins are yours. Then the encrypted key, the address, and where the passphrase should be, one honest line: `<find out>`.

No riddle, no clues planted on purpose, no author smirking somewhere with the answer. The only one who ever knew the password is q from years ago, and q from years ago isn't answering.

## Why give it away

Two reasons. q will "never have time to do it", being "stuck in love life laugh". Fair enough. And q wants to prove a point: a passphrase "is not an extra security layer it is only extra step for donating the coins to every bitcoiner".

Bold. Almost three years later the coins haven't moved, so right now the score is passphrase 1, every bitcoiner 0.

## What q remembers

Not much, and that's the puzzle. The post and q's replies under it give <dataset-count of="hints" puzzle="bitaddress">

</dataset-count>

 hints:

- The passphrase is probably not more than 30 characters.
- The wallet came from bitaddress.org.
- q already tried the passwords from back then, so probably no special characters.
- q used to glue 3 different passwords together to secure wallets, which lands around 30 characters. Probably no password manager. And q withdrew from this wallet once, so the passphrase can't be impossible.

That last one is the good one. Three old passwords in a row is a way smaller space than 30 random characters. Still huge, but huge in a shape a wordlist can actually chew on. If you know how people picked passwords around 2015, you're already ahead.

## The 6Pf prefix

An hour and a half in, a commenter called 0fje0 spots it: the key starts with `6Pf`. In BIP38 that means EC multiply mode, an uncompressed key, no lot or sequence number. The payload agrees, flag bytes `0x0143` and `0x00`. So the passphrase first became an intermediate code and the key was built from that, not a plain WIF encrypted afterwards.

Does it help? Honestly, no. Every guess still goes through scrypt with N=16384, r=8, p=8 before you learn anything, and that's slow on purpose. BIP38 was built to make exactly this kind of fun expensive.

One free check though. The payload carries the first 4 bytes of the address's double SHA-256, and they match `1J7BVe…`. So the key and the address on the paper really belong together. Worth knowing before you set a GPU on fire.

## What the chain shows

The coins are older than the post. Two deposits in the same block on June 2, 2015, 0.01337 BTC and 0.02999 BTC. Then on June 12, 2016 somebody who still knew the passphrase spent both: 0.037963 BTC out, 0.0001 to fees, 0.005297 BTC back as change to the same address.

That's the withdrawal q mentions. It's also the only proof that this passphrase ever lived in a human head.

Since then, silence. 529,700 sat in the same spot since 2016, waiting for someone with a good wordlist and a lot of patience.

## What the bitaddress record carries

```ts [src/collections/bitaddress.ts]
export const bruteForce = puzzle({
  id: "bitaddress",
  chain: "bitcoin",
  address: "1J7BVeP8JK4op2X3GN3Hy7xkTnGnQTMpou",
  sourceUrl: THREAD,
  startedAt: "2023-10-06 11:50:09",
  pubkey: uncompressed("04f7af13…d75bac30ac"),
  key: encryptedWif("6PfQTphCYc1Fee19uPz2pmou5RVBDVgw8VcrPfGLos4ktUnARdiFLYhcNU"),
  prize: 0.005297,
  hints: [official("I suspect the passphrase is not more than 30 characters.", THREAD, …), community("The private key starts with '6Pf', though. …", comment("276026"), …), …],
  transactions: [funding(/* 2015-06-02 */), increase(/* same block */), decrease(/* 2016-06-12 */)],
  assets: assets({ puzzle: "puzzle.png", sourceUrl: PICTURE }),
});
```

### An encrypted key and no passphrase

`encryptedWif()` with the payload alone. No passphrase option, because nobody has one, q included. `puzzles verify bitaddress` answers `SKIP` with `WIF is encrypted`, same as the unsolved [Ballet](https://puzzles.agntn.dev/collections/ballet) wallet. The day someone cracks it, the passphrase goes into that same call and verify finally gets to do its job.

### The public key was never a secret

The 2016 spend signed with the uncompressed key, so `pubkey` comes straight from that input. Zero help against scrypt. The record just likes to know things.

### Started at the post, funded long before

`startedAt` is the post, the moment the passphrase became everybody's problem. The two 2015 deposits keep their dates, the 2016 spend is a `decrease` of what left the address, and `prize` is the 0.005297 BTC that was there on the day of the post.

### Why bitaddress

The post's title is great, and it's the page's title too. As an id it's useless though. Half this dataset is brute force of some kind, so `brute-force` would point at everything and nothing. What only this puzzle has is where the wallet came from: bitaddress.org, named by q in the post. So the id is `bitaddress`.

### The picture

`assets/bitaddress/puzzle.png` is the paper wallet as Imgur serves it: address on the left, encrypted key on the right, both QR codes. Top left there's the attacker success formula from section 11 of the Bitcoin whitepaper. Nice decoration for a wallet whose only attacker is its owner's memory.

### The thread is archived

Stacker News is doing fine, but the hints live in comments, and comments have a way of disappearing. So the repo keeps its own copy. `assets/sources/bitaddress/` has the post and every comment, checked against a Wayback capture from February 2026.

## The bitaddress record
