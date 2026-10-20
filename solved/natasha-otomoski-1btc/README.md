# Natasha Otomoski puzzle, 1 BTC
> **ПЕРЕМЕЩЕНО 2026-10-17 в `master/solved/`** — пазл решён/закрыт/тупиковый, активная работа не ведётся. Причина: [../INDEX.md](../INDEX.md). Вернуть в `puzzles/` — только при новых данных (правила: `AGENT_INSTRUCTIONS.md`).

Индекс: [MASTER_CATALOG.md](../../MASTER_CATALOG.md). Источник: реестр [@agntn/puzzles](https://puzzles.agntn.dev/collections/natasha-otomoski) (raw: https://puzzles.agntn.dev/collections/natasha-otomoski.md).

## Кратко (реестр agntn/puzzles)
- Описание: A 2019 BitcoinTalk question whose 32 character answer is the private key. Someone found the eight words seven months later and never said how
- Реестр: https://puzzles.agntn.dev/collections/natasha-otomoski
- `id`: "natasha-otomoski"
- `chain`: "bitcoin"
- `address`: "179sxfh6rw6bHSo5wVUhLP96k46QaEzVP"
- `sourceUrl`: THREAD
- `startedAt`: "2019-01-12 10:33:13"
- `preGenesis`: true
- `status`: Status.Solved
- `prize`: 1
- `pubkey`: uncompressed("042b0763e8ce0c77dc0ac7511a0cc5c2...e363ab6f9a")
- `key`: hex("536865486164546865496465615768696c65436f6d62696e6748657248616972").wif(
- `techniques`: [technique("ascii-private-key", ANNOUNCEMENT)]

> A 2019 BitcoinTalk question whose 32 character answer is the private key. Someone found the eight words seven months later and never said how

January 12, 2019. A BitcoinTalk account called [blockladder](https://puzzles.agntn.dev/authors/blockladder) opens a thread with ["Ok, here's a 1BTC puzzle."](https://bitcointalk.org/index.php?topic=5096267.0) and one line of question:

```text
WhyTheCombOfNatashaOtomoskiHas21Teeth?.txt
```

That's it. No picture, no riddle chain, no second clue. Just a comb, a woman nobody heard of, and a file extension. And **1 BTC** on the address.

## How the Natasha Otomoski puzzle works

### The answer is the key

The rules fit in two lines. "The solution is a 32 characters long plain-text (the private key)." And the hint: "8 camel case english words, no special symbols".

So no hashing. Take the 32 characters, read their ASCII bytes as one 256-bit number, done. That's the private key. Uncompressed P2PKH on top. The record tags it `ascii-private-key`. No salt, no rounds, nothing.

Sounds easy? Eight English words, camel case, exactly 32 letters. Pick the wrong one and you get a random address and zero feedback.

### Signed, so it's real

People asked for proof first. Fair. The post carries a signature, and on January 15 Thirdspace pasted the whole thing as a signed message for `179sxfh6rw6bHSo5wVUhLP96k46QaEzVP`. Valid. The money was there an hour before the thread, so the record says `preGenesis: true`.

### Satoshi, a comb and big.txt

The thread ran for months. Natasha Otomoski is an anagram of Satoshi Nakamoto. watashi-kokoto lined the letters up the same evening, number by number. 21 teeth, 21 million coins? Somebody went there too.

SirVladimir took the `.txt` literally. Google the question with `filetype:txt` and you land on `big.txt`, a corpus with War and Peace inside. Natasha Rostova, a gold comb, married at 21. That's a great theory. It was also wrong.

## Who solved the Natasha Otomoski puzzle

### The prize moves first

August 21, 2019. Adriano2010 spots the spend before it confirms. **0.99996681 BTC** goes to `36T9H8hJP7xexevqayU9ADxGca7Y5dKquQ` in block 591,125, at 17:05:02 UTC. Seven months and a bit after the post.

### The words come the next morning

At 08:52 on August 22 [akkort](https://puzzles.agntn.dev/solvers/akkort) posts one line:

```text
SheHadTheIdeaWhileCombingHerHair
```

Thirty-two characters. Eight words. "If creator make new puzzle with the same rules I will publish how I found solition". 3eroCold says that isn't the answer. akkort replies with the WIF and its decoded bytes, and the bytes spell the sentence. Case closed.

### Nobody liked the answer

It answers how, not why. BearCorsar said exactly that. zielar spent almost a month on it and wasn't happy. GBT_User congratulated "whoever found it (if it wasn't blockladder himself)". Ouch.

akkort called the method probabilistic and kept it. A new puzzle with the same rules would prove they weren't the creator, they said. blockladder never posted again. So the method is still a secret. Was it a word list and a lot of guessing? Maybe. Nobody knows.

## What the Natasha Otomoski record carries

### A published key, not a rebuilt one

ligor posted the hex, akkort posted the WIF. Both are on the record as published, so no `.derived()`. `verify()` turns the hex into the address and says `OK`.

```ts [src/collections/natasha-otomoski.ts]
export const natashaOtomoskiQuestion = puzzle({
  id: "natasha-otomoski",
  chain: "bitcoin",
  address: "179sxfh6rw6bHSo5wVUhLP96k46QaEzVP",
  sourceUrl: THREAD,
  startedAt: "2019-01-12 10:33:13",
  preGenesis: true,
  status: Status.Solved,
  pubkey: uncompressed("042b0763e8ce0c77dc0ac7511a0cc5c2...e363ab6f9a"),
  key: hex("536865486164546865496465615768696c65436f6d62696e6748657248616972").wif(
    "5JT281eare7tuC1v659kZRdJT91zyAR7XkuXsFibjpHa4BcSQRW",
  ),
  techniques: [technique("ascii-private-key", ANNOUNCEMENT)],
  prize: 1,
});
```

### The question carries its answer

The question is an official hint, and akkort's line hangs on it as its `answer`, with its own post and date. The hint text stays exactly as blockladder wrote it. The anagram is a community hint, because the author never confirmed it.

### Solved, with dust after

A claim plus a published key is `solved`. In May 2026 someone dropped 780 satoshis on the address and swept them in the same block. The key is public, so anyone could. The record keeps both, so `puzzles watch` has nothing to report.

## The Natasha Otomoski record

---
## Логирование (обязательно)
См. `../../AGENT_INSTRUCTIONS.md`. Любая значимая находка, прогресс, баланс или решение **должны** быть дописаны сюда с датой и ссылкой.

## История изменений
- 2026-10-16 (deepseek-flash) — данные перенесены из реестра [@agntn/puzzles](https://puzzles.agntn.dev/) (первоисточники внутри текста).

## Возврат в puzzles (2026-10-19, Beam)
- Причина: на адресе 36T9H8hJP7xexevqayU9ADxGca7Y5dKquQ остаётся **0.99996681 BTC (99 996 681 сат)**, unspent с 2019-08 (украденный приз); ключ оригинального адреса известен, но деньги лежат на чужом адресе — требуется поиск способа извлечения/атрибуции.
- Источник проверки: blockstream.info (2026-10-19).

## Поправка к возврату (2026-10-19, Qoder)
- Тип: классификация (not-ours) / отмена переноса
- Суть: возврат в `puzzles/` отменён, папка снова в `solved/`. Он-чейн: адрес пазла `179sxfh…` пуст (funded = spent = 100 000 078), а 99 996 681 сат лежат на `36T9H8…` — адресе **третьей стороны**, получателя свипа в блоке 591125 (за 7 месяцев до публикации решения akkort). Ключ akkort даёт пустой адрес: «извлекать» нечего, а попытка потратить чужой адрес — это не решение пазла, а чужие деньги.
- Источник: https://blockstream.info/tx/b01af713b3c43c7e60ed03ada26a64a92f68be2f561ecf17c67e22393c10da53 (проверено 19.10.2026)
- Проверено: да
- Влияние на оценку: цель закрыта; помечена `not-ours` в `puzzles/dead-ends-registry/`.
- Подробности и хроника: см. LOG.md
