# seed-phrase.com (MetaNeer Labs)

Индекс: [MASTER_CATALOG.md](../../MASTER_CATALOG.md) (Части 1-8).

## Кратко
- Статус: **open**
- Цепь: bitcoin
- Приз: 0,01 BTC
- Типы: bip39-seed, text-cipher, image-stego
- Что осталось / сложность: датированные подсказки 2024 года (стихи, эмодзи, загадки) не собраны в решение

## Адреса/эскроу
- `bc1q7x3p3rkmkxgf20n3apkccqcmn5mdtsf8zx5227` — main | BIP84
- Проверка баланса: https://mempool.space/address/bc1q7x3p3rkmkxgf20n3apkccqcmn5mdtsf8zx5227

## Источники
- 2024 — сайт пазла — https://seed-phrase.com
- 2024 — репозиторий MetaNeer — https://github.com/metaneer/seed-phrase

## Подробности
- Автор/организация: MetaNeer Labs.
- Формат: серия датированных подсказок 2024 года — стихи, эмодзи и загадки, публикуемые последовательно.
- Адрес BIP84 (native SegWit) — значит seed-фраза используется с путём m/84'/0'/0'/0/0.
- Подсказки публикуются с датами, что даёт естественный порядок применения (timeline как ключ).

## Зацепки / следующий шаг
- Собрать все датированные подсказки с сайта и из git-истории репозитория
- Проверить, используются ли даты как номера позиций слов (аналогично A1 Trithemius)
- Проверить эмодзи как BIP39-слова (эмодзи → английское слово → индекс)

---
## Логирование (обязательно)
См. `../../AGENT_INSTRUCTIONS.md`. Любая значимая находка, прогресс, баланс или решение (полностью либо частично) **должны** быть дописаны сюда с датой и ссылкой на источник. Параллельные агенты обязаны соблюдать тот же протокол.

## История изменений
- 2026-10-16 (deepseek-flash) — папка создана; базовое досье собрано из `MASTER_CATALOG.md` (Части 1-8).
## Досье Hark v2 (16.10.2026)

Перенесено из `MASTER_CATALOG_v2_2026-10-16.md` (рабочие досье агентов Hark, 16.10.2026 23:40 МСК). Картина механизма, подсказок, проверенных и отброшенных гипотез, оракулов и файлов.

### B18. seed-phrase.com (MetaNeer Labs) — 0,01 BTC
- **→ Полное актуальное досье (что решено, что проверено, что осталось): ЧАСТЬ 8.6 (seed-phrase.com).** Старая краткая запись заменена.


### B18. seed-phrase.com (MetaNeer Labs) — 0,01 BTC
- **Адрес/сеть**: `bc1q7x3p3rkmkxgf20n3apkccqcmn5mdtsf8zx5227` (BIP84, путь m/84'/0'/0'/0/0). **Баланс**: 1 000 000 сат, 2 tx, не тронут. Проверено 16.10 18:30 МСК (LOG стратега).
- **Источники**: https://seed-phrase.com, https://github.com/metaneer/seed-phrase (репо 2024), https://puzzles.agntn.dev/collections/seed-phrase, YouTube paehCmD14dI.
- **Механизм**: в 2024 выходили датированные подсказки (стихи, эмодзи, картинки, «клубы» с AES-GCM). Слов n ≥ 15: сумма индексов 29045 даёт n ≥ 15.
- **Что установлено** (аудит 15.10):
  - **клуб 14.08.2024 вскрыт**: AES-GCM, пароль «october», соль «salt», KDF = SHA256(pw‖salt)×1000 → слово «sick» (🤢);
  - кандидаты: october (клуб 19.07), jazz/surprise/fake (whatafeeling.png), reveal/expose/uncover (стих 14.07; ссылка onetimesecret уже сгорела), magic (09.08), слово из фавикона (?);
  - видео paehCmD14dI: HSL-цвет по полиномам и скорость воспроизведения 0,25…2,5 → индекс 0..9 (не разобрано).
- **Проверено и отброшено**: систематического перебора не было.
- **Что осталось / следующий шаг**: разобрать цветовой канал видео и фавикон, собрать оставшиеся ~9–12 слов. Ограничение по сумме и checksum пригодятся только в самом конце. Досье стратега стоит в очереди (QUEUE.md).
- **Файлы/скрипты**: `/workspace/projects/b6983d3d-52f5-48f8-9974-b99dc8e31c55/work/sp/` (index.html, whatafeeling.png, illusionsmichael.png, sumofwords.png, SPfavicon-256x256.png, wl.pdf, pylib/); разбор — в `/workspace/projects/b6983d3d-52f5-48f8-9974-b99dc8e31c55/work/puzzle-solvability-audit-2026-10-15.md`.
- **Проекты Hark и статус**: «работа» (b6983d3d), ярус 2 «инсайт по случаю». В INDEX досье строка не заполнена.
- **Оценка шансов**: ~3 % (ярус 3; ярус 2, если найдётся источник оставшихся слов).

## Обновление (2026-10-16, deepseek-flash — web-исследование)
- Тип: детализация механизма + подтверждение статуса
- Суть:
  - Сайт публиковал **по одной подсказке в день с 12 июля 2024**; каждая подсказка — отдельный коммит в `metaneer/seed-phrase`
    (сайт раздаётся через GitHub Pages).
  - Первый взнос — 0,005 BTC; **14 августа 2024** сумма удвоена до **0,01 BTC**.
  - Состав подсказок: BIP-39 wordlist EN+CN в PDF, стихотворение про «поднять завесу»,
    одноразовая ссылка **onetimesecret**, картинки `whatafeeling.png` («Don't be shocked, it's a fake») и `illusionsmichael.png`
    («Illusions Michael»), «web favorite icon» (favicon), эмодзи 🤢, **сумма 29 045** при каждом x_i от 1 до 2048,
    путь деривации `m/84'/0'/0'/0/0` и AES-шифртекст с паролем-ответом на подсказку от 19.07.2024.
  - **Последняя подсказка — 14 августа 2024**; с тех пор тишина более двух лет. Баланс ровно **0,01 BTC**, не потрачен.
  - Из суммы индексов 29045 следует **n ≥ 15 слов**.
- Источники:
  - https://seed-phrase.com/
  - https://github.com/metaneer/seed-phrase
  - https://mempool.space/address/bc1q7x3p3rkmkxgf20n3apkccqcmn5mdtsf8zx5227
  - https://puzzles.agntn.dev/collections/seed-phrase
- Не подтверждено: связь домена с компанией «MetaNeer Labs» — организация `metaneer` действительно публикует сайт (CNAME),
  Эндрю Беллэй указан основателем MetaNeer Labs, но прямого заявления «пазл создан MetaNeer Labs» в источниках нет;
  репозиторий содержит только заглушку README.
- Проверено: да — сайт, все подсказки, адрес, коммиты, баланс.
- Влияние на оценку: пазл **спящий** (новых подсказок 2 года) — ценность представляют уже опубликованные материалы.

## Досье agntn/puzzles (16.10.2026)

Перенесено из реестра [@agntn/puzzles](https://puzzles.agntn.dev/collections/seed-phrase) (raw: https://puzzles.agntn.dev/collections/seed-phrase.md). Ниже — разбор первоисточника: механика, кто решал, что проверено.

- `id`: "seed-phrase"
- `chain`: "bitcoin"
- `address`: "bc1q7x3p3rkmkxgf20n3apkccqcmn5mdtsf8zx5227"
- `sourceUrl`: SITE
- `startedAt`: "2024-07-12 20:06:29"
- `prize`: 0.01
- `key`: derivation("m/84'/0'/0'/0/0")
- `techniques`: [technique("hidden-seed-words", SITE), technique("aes", SITE)]

> A website that dropped clues to a Bitcoin recovery phrase all summer of 2024 and then went quiet. The 0.01 BTC is still on the address

July 12, 2024, 20:06 UTC. Half a million sats, 0.005 BTC, land on `bc1q7x3p…zx5227`. An hour later a GitHub repository called `metaneer/seed-phrase` shows up, and soon after a page at [seed-phrase.com](https://seed-phrase.com/). The pitch fits in one line: "Solve puzzles to uncover a secret recovery phrase that unlocks a Bitcoin wallet." First one to decode it takes the coins.

## Clues every few days, until there weren't

The page is a log. Every clue gets a date heading, and after the launch each one got its own commit in [the repository](https://github.com/metaneer/seed-phrase/commits/main/), so the history is right there. The record keeps <dataset-count of="hints" puzzle="seed-phrase">

</dataset-count>

 hints, the rules and the warnings included.

They came fast in July. A poem, a picture, a riddle about October, an emoji. August slowed down. On August 14 came an encrypted message and a second deposit of 0.005 BTC, so the prize doubled to 0.01. The last commit, the next day, just updates the balance.

Then nothing. Two years now. Did the author give up, or is everything already on the page?

## What the page hands you

The first real clue is a stack of tools. A PDF of the [BIP39 English wordlist](https://seed-phrase.com/bip-0039-wordlist-en-CN.pdf), "These words will be useful:", and under it a YouTube video called *BIP-39 English Wordlist*. The whole list again, all 2048 words.

Under the video sits a box that changes colour. The page's script reads the video's time and playback speed and runs them through polynomials for hue, saturation and lightness. The playback speed picks which set of coefficients runs. Change the speed, change the colours. Nobody puts that on a page by accident.

The rest, in order:

- A poem about truths sleeping beneath the surface. "What word embodies this quest?"
- A [link to a secret](https://onetimesecret.com/secret/9ju7i8r5tx59szmh2xms48y24phaded) that "will only open one time ever". One click, one reader. The record keeps the sentence, not the secret.
- A pop art crowd in shock under a big pink JAZZ. Alt text "You gotta see it to believe it", title "Don't be shocked, it's a fake."
- The harvest month that also saw "a transformative paper announcing a peer-to-peer electronic cash system". The whitepaper went out on October 31, 2008.
- "web favorite icon". Two minutes earlier the same day, the site got [its favicon](https://github.com/metaneer/seed-phrase/commit/64b6de978e7725d14fea37717ed7b18b31d497b1): a big SP with coloured rays shooting from one point.
- 🤢. That's the whole clue.
- A formula: the sum of the word indexes is 29,045, each between 1 and 2,048.
- `m/84'/0'/0'/0/0`, the first native SegWit address. At least that one is plain.
- A magician pulling back a black cloth, titled "Illusions Michael". Yes, that's GOB from *Arrested Development*.

![The 2024-07-16 clue: a pop-art crowd in shock under the word JAZZ](https://puzzles.agntn.dev/assets/seed-phrase/whatafeeling.png)

## The sum does some work

Twelve words can't reach 29,045. Even twelve copies of the last word, `zoo`, add up to 24,576. So the phrase is at least 15 words long, and the formula never says `n`. Neat trick for one picture.

## The locked message

The August 14 clue is ciphertext, an IV, a salt that reads `salt` and a password: "answer to 2024-07-19 clue (lc)". Lowercase, that is. The page ships its own tool to open it. The script hashes the password and the salt with SHA-256, a thousand rounds, and uses the result as an AES-GCM key. So the riddle about October is a key to something else. How many clues on this page play double roles?

And the policies at the bottom say it outright: "There will be red herrings."

## What the seed-phrase record carries

```ts [src/collections/seed-phrase.ts]
export const seedPhrasePuzzle = puzzle({
  id: "seed-phrase",
  chain: "bitcoin",
  address: "bc1q7x3p3rkmkxgf20n3apkccqcmn5mdtsf8zx5227",
  sourceUrl: SITE,
  startedAt: "2024-07-12 20:06:29",
  key: derivation("m/84'/0'/0'/0/0"),
  techniques: [technique("hidden-seed-words", SITE), technique("aes", SITE)],
  prize: 0.01,
  hints: [/* the rules, the red herrings and every dated clue */],
  transactions: [funding(/* 0.005 BTC */), increase(/* 0.005 BTC more */)],
  assets: assets({ hints: [/* the wordlist, three pictures, the favicon */], digests: [/* … */] }),
});
```

### Every clue has a receipt

A website can change overnight. So each dated hint carries the commit that put it on the page as its confirmation. Same words, same day, with a SHA you can check.

### Pictures as hints

Five files back the clues, so the record ships them: the wordlist PDF, the JAZZ crowd, the favicon, the formula and the magician. Each is pinned by SHA-256 and size, next to its URL on the site and a Wayback capture that serves the same bytes. The picture clues keep their alt and title text as the hint, because that's the only text they have.

### No phrase, just the path

The derivation path is the one thing the author spelled out, so `key` holds the path and no words. The 0.01 BTC sits there unspent. Whoever builds the phrase first gets to fill in the rest.

## The seed-phrase.com record
