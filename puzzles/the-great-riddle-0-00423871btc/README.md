# The Great Riddle («The Great Print»)

Индекс: [MASTER_CATALOG.md](../../MASTER_CATALOG.md) (Части 1-8).

## Кратко
- Статус: **open**
- Цепь: bitcoin
- Приз: 0,00423871 BTC
- Опубликовано: 2024-02 (художник The Great Print)
- Типы: bip39-seed, passphrase, physical-object
- Что осталось / сложность: известны 4 слова из 24; слова спрятаны в физических иллюстрациях «Genesis Collection»

## Адреса/эскроу
- `bc1qm3ayuhn7wppuqxaywu8ea0lggs8myy7543fekk` — main
- Проверка баланса: https://mempool.space/address/bc1qm3ayuhn7wppuqxaywu8ea0lggs8myy7543fekk

## Источники
- 2024-02 — проект «The Great Print» (художник)

## Подробности
- Механизм: 24 слова BIP39 + passphrase (25-е слово).
- Опубликовано только 4 слова из 24.
- Слова спрятаны в физических иллюстрациях серии «Genesis Collection» — то есть нужен доступ к физическим предметам.
- Наличие 25-го слова (passphrase) означает, что даже полный набор 24 слов может быть недостаточен.

## Зацепки / следующий шаг
- Найти изображения всех работ «Genesis Collection» в высоком разрешении
- Проверить, не публиковались ли подсказки в соцсетях художника
- Проверить гипотезу: 4 опубликованных слова фиксируют позиции (например, 1, 6, 12, 24)

---
## Логирование (обязательно)
См. `../../AGENT_INSTRUCTIONS.md`. Любая значимая находка, прогресс, баланс или решение (полностью либо частично) **должны** быть дописаны сюда с датой и ссылкой на источник. Параллельные агенты обязаны соблюдать тот же протокол.

## История изменений
- 2026-10-16 (deepseek-flash) — папка создана; базовое досье собрано из `MASTER_CATALOG.md` (Части 1-8).

## Обновление (2026-10-16, deepseek-flash — web-исследование)
- Тип: идентификация автора + механика
- Суть:
  - **Автор — Бартош Левицки (Bartosz Lewicki)**, студия **The Great Print** (Базель); рисует крупные работы шариковой ручкой.
  - 24 слова seed-фразы спрятаны в **оригинальных** рисунках серии **«Genesis Collection»** —
    в печатных копиях слов **нет**, их нужно видеть в студии или на выставке.
  - Первый, кто пришлёт автору 24 слова **в любом порядке**, получает **25-е слово**, открывающее адрес.
  - На декабрь 2025 публично доступны были 3 работы и, соответственно, **4 слова**; четвёртая работа
    (**Bitcoin Honey Badger**) с двумя словами завершена к январю 2026.
  - Автор подписал розыгрыш он-чейн: 2100 сатоши на адрес приза с **OP_RETURN**-текстом «The Great Print running The Great Riddle».
  - Адрес `bc1qm3ayuhn7wppuqxaywu8ea0lggs8myy7543fekk`; подписывающая tx
    `e1787c3811863b67e61dcc5804645de19f5927b980e3510cc6ba554064f7d720`.
- Источники:
  - https://www.thegreatprint.net/riddle
  - https://www.thegreatprint.net/honeybadger
  - https://www.thegreatprint.net/artist
  - https://mempool.space/tx/e1787c3811863b67e61dcc5804645de19f5927b980e3510cc6ba554064f7d720
  - https://web.archive.org/web/20260123202427/https://www.thegreatprint.net/riddle
- Не подтверждено: точное число публично доступных слов на сегодня (в архиве за январь 2026 — 4).
- Проверено: да — автор, адрес, сумма (423 871 сатоши = точное совпадение с призом), механизм, число найденных слов.
- **Вывод:** пазл **намеренно медленный** — он физически не может быть решён, пока не опубликованы все 24 рисунка.
  Регулярные сессии бессмысленны; разумен только мониторинг новых работ.

## Досье agntn/puzzles (16.10.2026)

Перенесено из реестра [@agntn/puzzles](https://puzzles.agntn.dev/collections/great-riddle) (raw: https://puzzles.agntn.dev/collections/great-riddle.md). Ниже — разбор первоисточника: механика, кто решал, что проверено.

- `id`: "great-riddle"
- `chain`: "bitcoin"
- `address`: "bc1qm3ayuhn7wppuqxaywu8ea0lggs8myy7543fekk"
- `sourceUrl`: PAGE
- `startedAt`: "2024-02-26 14:17:17"
- `preGenesis`: true
- `prize`: 0.00423871

> The Great Print hides the 24 words of a Bitcoin recovery phrase in the original pen drawings of the Genesis Collection. Find them all and the artist sends the 25th

February 2024. A Bitcoin artist in Basel puts a new page on his shop. "A Bitcoin riddle. Find the 24 hidden words". Each word sits in one of his original ballpoint drawings. Not the posters, not the prints. The originals.

So you can't solve this one from a laptop. You go to a studio in Basel, or to a Bitcoin conference where the drawings hang, and you look really closely. Bring a magnifier. Honestly, what a premise.

## How The Great Riddle works

### 24 words in the drawings

The [riddle page](https://www.thegreatprint.net/riddle) says every word "to the private key of this address" is in an original artwork of the Genesis Collection. One word per drawing, at first. Later the page says "1 (or more)", and Honey Badger really does carry two.

Then the warning: "My printed artworks do not have any hidden words intigrated!" Buying a poster gets you a poster. Fair enough.

### The 25th word comes from the artist

Here's the twist. Find all 24, in any order, and send them to the author. The first person to do it "will get the 25th word for accessing the address".

In wallet language a 25th word usually means a BIP39 passphrase. The page never says that, though. It doesn't name the wordlist or the derivation path either. So the record keeps it as written: 24 words from the drawings, one word from the artist.

Which also means you can't sweep it alone. The last step is a message to a person. A puzzle built on trust? Kind of, ya. But he signs his new drawings on chain, so at least he's easy to find.

### How many words are out there?

The page keeps a counter, dated by a block height instead of a calendar date:

- Block 832132, February 2024: 2 of 24.
- Block 862629, September 2024: 3 of 24.
- Block 927970, December 2025: 4 of 24, from only 3 finished artworks.

Three artworks and four words. That's Honey Badger and its two. Its own page says "Two words from The Great Riddle Bitcoin wallet are hidden inside this artwork", and further down calls it "the fourth word". Close enough.

The counter hasn't moved since December 2025. The Great Tree was signed on chain in May 2026. Its page says the drawing "also contains a hidden word from one of my Bitcoin wallets". So the real number is probably ahead of the page. Can you count on 24 ever being out? A large drawing "usually takes several months", says the Bhoenix page. 24 of them is a long road.

### A shortcut for collectors

Since 2025 the page has one more line. Owners of a limited edition print or an original "will receive all 100,000 blocks, all current words". Buy the art, get the words. It's a sales pitch and a hint channel at the same time, and it's on the record as an official hint.

## When did The Great Riddle start?

### February 2024, by the page's own clock

The oldest copy of the riddle page is a Wayback capture from May 26, 2024. It says "with today's block time 832132 only 2 artworks are publicly visible". Block 832132 was mined on February 26, 2024 at 14:17:17 UTC. It's the block the artist had in front of him when he wrote that version. Later edits moved it even when the counter stayed put. So it's no publication timestamp, but it's the oldest date the author put on the riddle himself. That's `startedAt`.

The shop's homepage from April 15, 2024 already links "The Great Riddle" and lists the address under "Donation via Bitcoin". Nothing older survives. A May 2023 capture of the homepage has no riddle at all, and the December 2023 ones are just redirects.

### And the September 2024 signature?

On September 23, 2024 the address got 2,100 sat with an OP_RETURN: "The Great Print running The Great Riddle". In 2025 the page started saying "starting with block 862527". It links that transaction as its Signature TxId.

So which one is the start? The page was public seven months earlier, with the same address and the same rules. The signature is the riddle getting an official birthday afterwards. The record keeps the first date and puts the signature on the author's facts.

### Money before the page

The first deposit landed on January 28, 2024, a month before the page. Then 375,489 sat on March 12, 2024, most of the prize in one go. `preGenesis` marks that early money.

## What's in the wallet

Everything after March 2024 is small change with a message. Most deposits carry an OP_RETURN naming a drawing. A few of them:

- "The Great Print is riding The Great Wave".
- "End The Fed 1/21".
- "This is fine - The Great Print".
- "Checkmate - Where others see the end, the Bitcoiner sees one move remaining".

The amounts are cute too. 2,100 sat, 1,234 sat, 888, 666, 333.

The best one? Two payments of 888 sat with "Honey badgers are unstoppable and fight against snakes", in blocks 888,887 and 888,888. Somebody waited for that block.

Each payment comes from a different address, so the chain can't tell who sent which. The pages of The Great Fall, The Great Tree and Checkmate link theirs as signatures. Nothing has ever left the address. Every satoshi that came in is still there.

## What the great-riddle record carries

```ts [src/collections/great-riddle.ts]
export const greatRiddleArtworks = puzzle({
  id: "great-riddle",
  chain: "bitcoin",
  address: "bc1qm3ayuhn7wppuqxaywu8ea0lggs8myy7543fekk",
  sourceUrl: PAGE,
  startedAt: "2024-02-26 14:17:17",
  preGenesis: true,
  prize: 0.00423871,
  stages: [stage("words", …), stage("25th word", …)],
  hints: [official("Find the 24 hidden words of my bitcoin donation address …", PAGE, FIRST_PAGE, …), …],
  transactions: [funding(/* 2024-01-28 */), increase(/* 2024-03-12 */), increase(/* the signature */), …],
});
```

### Two stages, one of them a person

`words` is the hunt through the drawings. `25th word` is the message to the artist. A stage is one step you do yourself, and asking a human for a word is a step too.

### Hints from a page that keeps changing

The page has been rewritten a few times, so the record keeps <dataset-count of="hints" puzzle="great-riddle">

</dataset-count>

 hints. Some lines are gone from the live page, like "my bitcoin donation address" and "1 well hidden word". They keep `source` on the page and a `confirmation` pointing at the May 2024 capture. The newer lines point at the first capture that shows them. Honey Badger, The Great Tree and Bhoenix add hints from their own pages.

### No key, no pubkey

The address never spent, so there's no public key on chain. And no word has been published, so `verify` has nothing to check yet. `status` stays `unsolved`.

## The Great Riddle record
