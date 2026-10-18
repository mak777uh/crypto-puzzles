# 1000 BTC Challenge (Bitcoin Puzzle Transaction)

Индекс: [MASTER_CATALOG.md](../../MASTER_CATALOG.md) (Части 1-8).

## Кратко
- Статус: **open (78 из 160 не решены)**
- Цепь: bitcoin
- Приз: ~916-989 BTC (~$58-60M)
- Опубликовано: январь 2015, блок #339085; создатель анонимный ('saatoshi_rising', не подтверждено)
- Типы: address-only, known-public-key, bruteforce, pollard-kangaroo
- Что осталось / сложность: 78 нерешённых пазлов; ближайший — #71 (2⁷⁰-2⁷¹), просканировано 0,864%

## Адреса/эскроу
- Решено: 82 из 160 пазлов
- Нерешено: 78 пазлов
- Ближайший нерешённый: #71 — 7.1019 BTC, диапазон 2⁷⁰-2⁷¹

## Источники
- 2026 — трекер — https://btcpuzzle.info/
- 2026 — информация — https://github.com/roadhero/Bitcoin-Puzzle-Info
- 2026 — privatekeys.pw — https://privatekeys.pw/puzzles/bitcoin-puzzle-tx
- 2026 — needlespace — https://needlespace.com/en/puzzle
- 2026 — news.bitcoin.com — https://news.bitcoin.com/key-hunters-eye-58-87m-bitcoin-puzzle-as-916-btc-sits-unsolved-in-78-addresses/
- 2026 — alexanderthurn — https://github.com/alexanderthurn/1000-BTC-Challenge

## Подробности
- Прогресс #71: 0,864% просканировано, ~422 года при текущем темпе.
- Address-only (#71-#134): полный брутфорс; RTX 4090 даёт ~1,5 млрд ключей/с.
- Known Public Key (#136-#160): Pollard's Kangaroo, сложность O(2^(N/2)).
- Операционный риск: frontrunning/sniping боты — победители #66 и #69 потеряли призы.
- Защита от снипинга: private mining, MARA Slipstream.
- Пазл #135 решён (в каталоге отнесён к закрытым).

## Зацепки / следующий шаг
- Для #71-#134 считать экономику: 422 года на текущем темпе — не окупается без кратного роста железа
- Для #136-#160 использовать Kangaroo (O(2^(N/2))): #160 требует ~2⁷⁹·⁵ операций — вне досягаемости
- Организационно: private mining + Slipstream обязательны, иначе приз снипнут
- Мониторить новые релизы RCKangaroo/Keyhunt-CUDA

## Полная таблица нерешённых (#71-#160)

| Пазл | Награда (BTC) | Бит | Тип | Публичный ключ |
|------|--------------|-----|-----|----------------|
| #71 | 7.1019 | 71 | Address-only | Нет |
| #72 | 7.2001 | 72 | Address-only | Нет |
| #73 | 7.3001 | 73 | Address-only | Нет |
| #74 | 7.4000 | 74 | Address-only | Нет |
| #76 | 7.6000 | 76 | Address-only | Нет |
| #77 | 7.7000 | 77 | Address-only | Нет |
| #78 | 7.8000 | 78 | Address-only | Нет |
| #79 | 7.9000 | 79 | Address-only | Нет |
| #81 | 8.1000 | 81 | Address-only | Нет |
| #82 | 8.2000 | 82 | Address-only | Нет |
| #83 | 8.3000 | 83 | Address-only | Нет |
| #84 | 8.4000 | 84 | Address-only | Нет |
| #86 | 8.6000 | 86 | Address-only | Нет |
| #87 | 8.7000 | 87 | Address-only | Нет |
| #88 | 8.8000 | 88 | Address-only | Нет |
| #89 | 8.9000 | 89 | Address-only | Нет |
| #91 | 9.1000 | 91 | Address-only | Нет |
| #92 | 9.2000 | 92 | Address-only | Нет |
| #93 | 9.3000 | 93 | Address-only | Нет |
| #94 | 9.4000 | 94 | Address-only | Нет |
| #96 | 9.6000 | 96 | Address-only | Нет |
| #97 | 9.7000 | 97 | Address-only | Нет |
| #98 | 9.8000 | 98 | Address-only | Нет |
| #99 | 9.9126 | 99 | Address-only | Нет |
| #101 | 10.1000 | 101 | Address-only | Нет |
| #102 | 10.2000 | 102 | Address-only | Нет |
| #103 | 10.3000 | 103 | Address-only | Нет |
| #104 | 10.4000 | 104 | Address-only | Нет |
| #106 | 10.6000 | 106 | Address-only | Нет |
| #107 | 10.7000 | 107 | Address-only | Нет |
| #108 | 10.8000 | 108 | Address-only | Нет |
| #109 | 10.9001 | 109 | Address-only | Нет |
| #111 | 11.1001 | 110 | Address-only | Нет |
| #112 | 11.2000 | 111 | Address-only | Нет |
| #113 | 11.3000 | 112 | Address-only | Нет |
| #114 | 11.4000 | 113 | Address-only | Нет |
| #116 | 11.6000 | 115 | Address-only | Нет |
| #117 | 11.7000 | 116 | Address-only | Нет |
| #118 | 11.8000 | 117 | Address-only | Нет |
| #119 | 11.9000 | 118 | Address-only | Нет |
| #121 | 12.1000 | 120 | Address-only | Нет |
| #122 | 12.2000 | 121 | Address-only | Нет |
| #123 | 12.3000 | 122 | Address-only | Нет |
| #124 | 12.4000 | 123 | Address-only | Нет |
| #126 | 12.6000 | 125 | Address-only | Нет |
| #127 | 12.7000 | 126 | Address-only | Нет |
| #128 | 12.8000 | 127 | Address-only | Нет |
| #129 | 12.9000 | 128 | Address-only | Нет |
| #131 | 13.1000 | 130 | Address-only | Нет |
| #132 | 13.2000 | 131 | Address-only | Нет |
| #133 | 13.3000 | 132 | Address-only | Нет |
| #134 | 13.4000 | 133 | Address-only | Нет |
| #136 | 13.6000 | 135 | Known PK | ЕСТЬ |
| #137 | 13.7000 | 136 | Known PK | ЕСТЬ |
| #138 | 13.8000 | 137 | Known PK | ЕСТЬ |
| #139 | 13.9000 | 138 | Known PK | ЕСТЬ |
| #141 | 14.1001 | 140 | Known PK | ЕСТЬ |
| #142 | 14.2000 | 141 | Known PK | ЕСТЬ |
| #143 | 14.3000 | 142 | Known PK | ЕСТЬ |
| #144 | 14.4000 | 143 | Known PK | ЕСТЬ |
| #145 | 14.5000 | 144 | Known PK | ЕСТЬ |
| #146 | 14.6000 | 145 | Known PK | ЕСТЬ |
| #147 | 14.7000 | 146 | Known PK | ЕСТЬ |
| #148 | 14.8000 | 147 | Known PK | ЕСТЬ |
| #149 | 14.9000 | 148 | Known PK | ЕСТЬ |
| #150 | 15.0000 | 149 | Known PK | ЕСТЬ |
| #151 | 15.1000 | 150 | Known PK | ЕСТЬ |
| #152 | 15.2000 | 151 | Known PK | ЕСТЬ |
| #153 | 15.3000 | 152 | Known PK | ЕСТЬ |
| #154 | 15.4000 | 153 | Known PK | ЕСТЬ |
| #155 | 15.5000 | 154 | Known PK | ЕСТЬ |
| #156 | 15.6000 | 155 | Known PK | ЕСТЬ |
| #157 | 15.7000 | 156 | Known PK | ЕСТЬ |
| #158 | 15.8000 | 157 | Known PK | ЕСТЬ |
| #159 | 15.9000 | 158 | Known PK | ЕСТЬ |
| #160 | 16.0011 | 159 | Known PK | ЕСТЬ |

---
## Логирование (обязательно)
См. `../../AGENT_INSTRUCTIONS.md`. Любая значимая находка, прогресс, баланс или решение (полностью либо частично) **должны** быть дописаны сюда с датой и ссылкой на источник. Параллельные агенты обязаны соблюдать тот же протокол.

## История изменений
- 2026-10-16 (deepseek-flash) — папка создана; базовое досье собрано из `MASTER_CATALOG.md` (Части 1-8).

## Обновление (2026-10-16, deepseek-flash — web-исследование): #135 решён, механика «кенгуру-пазлов»
- Тип: решение + уточнение механики
- Суть:
  - **Механика проекта:** 160 адресов на mainnet; N-й адрес хранит приватный ключ из диапазона **`[2^(N-1), 2^N)`**;
    суммарный приз приближается к 1000 BTC. Решены пазлы **1-70** подряд, а также **все кратные пяти от 75 до 130** — всего **82**.
  - **Puzzle #135** — первая из «кенгуру-доступных» нерешённых: её **публичный ключ раскрыт**, потому что исходный кошелёк
    когда-то отправил транзакцию с частичным расходом.
  - Изначальный депозит #135 — около **13,5 BTC**; в **2023** неизвестный отправитель добавил ещё **12,15 BTC**
    без публичного заявления, что это часть приза.
  - **Решение:** головоломку решил **RetiredCoder** (автор RCKangaroo) — **28 июля 2026** он снял 13,5 BTC с #135 и вышел из гонки.
  - **29 июля 2026, 15:40 UTC** — опубликовал «Mini-puzzle #7» (bitcointalk тред **5589799**), где, помимо BCH-остатка от #135,
    напечатал и сам ключ #135: **`6d9392a16883f90903d5f78da57af07eb2`**.
  - Механика Mini-puzzle #7: подпись, где в качестве nonce использован **merkle root генезис-блока**
    (`4a5e1e4baab89f3a32518a88c31bc87f618f76673e2cc77ab2127b7afdeda33b`), с сообщением «Thank you Satoshi Nakamoto!»;
    из подписи приватный ключ восстанавливается по формуле `pk = (s·k − z)/r mod n`.
  - Через **77 минут** после публикации BCH с адреса ушёл, и никто не объяснил как; автор написал:
    «кто-то быстро решил и не написал здесь решение. Это невежливо».
  - Той же схемой ранее вскрыты: **#120** (октябрь 2024), **#125** (ноябрь 2024), **#130** (сентябрь 2024) —
    все через мини-головоломки RetiredCoder, который отдавал оставшийся на этих адресах BCH (1,2 / 1,25 / 1,3 BCH).
  - **Этический кейс:** решатель снял ровно 13,5 BTC, но на адресе было больше (0,135 BTC в 2015 → +1,215 BTC в 2017 →
    +12,15 BTC в 2023), и он оставил остаток нетронутым, не будучи уверен, что эти монеты входят в приз.
    Обсуждалось 02.08.2026 в крипто-новостях — вопрос «где кончается приз и начинается чужое имущество» в контексте «code is law».
- Источники:
  - https://puzzles.agntn.dev/raw/collections/mini.md
  - https://bitcointalk.org/index.php?topic=5589799
  - https://www.kucoin.com/news/insight/BTC/6a6fb9369bd794000857b01e
  - https://x.com/Hey_rabbit_here/status/2084022752067961048
  - https://privatekeys.pw/puzzles/bitcoin-puzzle-tx
  - https://puzzles.agntn.dev/collections/mini
- Не подтверждено: личность автора головоломки; был ли неизвестный отправитель 2023 года связан с проектом;
  точная транзакция снятия 13,5 BTC (детали взяты из новостного поста в X).
- **Атрибуция автора:** аккаунт **`saatoshi_rising`** на bitcointalk, зарегистрированный 27 апреля 2017 утром,
  сделал ровно **один пост** через 58 минут и больше не появлялся. Личность за ним не установлена.
- Влияние на оценку: **#135 закрыт** (перенести в решённые). Дальнейшие «кенгуру-доступные» цели того же класса —
  **#140, #145, #150, #155, #160** (публичный ключ раскрыт, применим Pollard's Kangaroo).
  Нерешённые с нераскрытым публичным ключом (71-74, 76, 77 и т. д.) требуют полного перебора — выше ~64 бит нецелесообразно.

## Досье agntn/puzzles (16.10.2026)

Перенесено из реестра [@agntn/puzzles](https://puzzles.agntn.dev/collections/bits) (raw: https://puzzles.agntn.dev/collections/bits.md). Ниже — разбор первоисточника: механика, кто решал, что проверено.


> 256 addresses whose keys are 1 to 256 bits wide. The one every scanner runs against. Keys published up to 135 bits and the rest still funded.

## The puzzle

One transaction in January 2015 funded 254 addresses. Puzzles 1 and 2 were already there, funded in 2013 and 2014. The author said what the keys were in the one post the account ever made, on bitcointalk in April 2017: "There is no pattern. It is just consecutive keys from a deterministic wallet (masked with leading 000...0001 to set difficulty)." That mask puts the key of puzzle `n` somewhere in `[2^(n-1), 2^n - 1]`. That quote is the collection's hint, so every record inherits it through `bits.hintsFor(n)` and `puzzles_hints`, with the post as its source and a Wayback capture of the thread as what confirms it. The low ones fell in hours. Puzzle 1 is key `1`. The high ones are out of reach for anyone without a very specific budget. The middle is where the scanning community lives. The prizes were raised in 2017 and again in 2023, so `bits/71` holds 7.1 BTC today for a key of 71 bits.

An open record declares its width with `bits(n)`. A solved one carries it as the second argument of `hex(key, n)`. Either way `keyRange()` turns it into the two `bigint` bounds. The width marks a search space and nothing else, so it's absent on every other collection.

```ts
const puzzle = bits.require(71);

puzzle.keyRange(); // [2n ** 70n, 2n ** 71n - 1n]
puzzle.hasPubkey(); // false by design: no public key, so nothing beats scanning the range
```

## Why `bits`

The key used to be `b1000`, a number you couldn't explain from any record, on prizes that got raised twice anyway. Now it says the one thing that never moves: puzzle `n` hides a key `n` bits wide. So `bits/71` tells you the width before you open it. Well, 70 unknown bits, because the top one is always set.

The old key still resolves. `get("b1000/71")` lands on `bits/71`, and old links to these pages redirect here. Keep two names apart, though. The root's `bits(n)` writes a record's width, while this collection's `bits` holds the puzzles. Same word, two jobs. Need both in one file? An import alias settles it.

## Solved, swept, unsolved

A solved puzzle has its key on the record as `hex(…, n).wif(…)`. The data gate derives the address from it on every test run. The highest published key is 135 bits, solved in July 2026 for 13.5 BTC.

`swept` is the other large group. Once a puzzle's public key became known, through an earlier spend or a reveal, its address could be attacked with Pollard's kangaroo instead of brute force. And people did. Those records carry the sweep transaction and, where the sweeper published it, the key. The status is written down because the transaction list alone can't tell a sweep from a solve.

```ts
bits.solved().length; // keys published by whoever found them
bits.unsolved().length; // still funded, still waiting
(await selectPuzzles({ collection: "bits", status: Status.Swept })).length; // emptied once the public key leaked
```

## The record

```ts [src/collections/bits/1.ts]
export const bits1 = puzzle({
  id: "bits/1",
  chain: "bitcoin",
  address: "1BgGZ9tcN4rm9KBzDn7KprQz87SZ26SAMH",
  sourceUrl: "https://bitcointalk.org/index.php?topic=5218972",
  startedAt: "2013-01-09 11:59:15",
  status: Status.Solved,
  pubkey: compressed("0279be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798"),
  key: hex("0000000000000000000000000000000000000000000000000000000000000001", 1).wif(
    "KwDiBf89QgGbjEhKnhXJuH7LrciVrZi3qYjgd9M7rFU73sVHnoWn",
  ),
  prize: 0.001,
  solvedAt: "2013-01-10 02:54:44",
  solveTime: 53729,
  preGenesis: true,
  transactions: [
    funding("9223…808e", "2013-01-09 11:59:15", 0.03),
    claim("3da9…4277", "2013-01-10 02:54:44", 0.03),
  ],
});
```

`preGenesis: true` marks puzzles 1 and 2, funded in 2013 and 2014 before the January 2015 transaction. That's why puzzle 1 moves 0.03 BTC in its transactions while the recorded prize is the 0.001 the series assigns it. The collection is a `NumericCollection`. `bits.get(71)`, `bits.get("71")` and `bits.get("bits/71")` all land on the same record.

## Every puzzle

One page each: the record, the transactions and the live balance.

<collection-puzzles collection="bits">

</collection-puzzles>
