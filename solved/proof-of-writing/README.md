# Proof of Writing
> **ПЕРЕМЕЩЕНО 2026-10-17 в `master/solved/`** — пазл решён/закрыт/тупиковый, активная работа не ведётся. Причина: [../INDEX.md](../INDEX.md). Вернуть в `puzzles/` — только при новых данных (правила: `AGENT_INSTRUCTIONS.md`).

Индекс: [MASTER_CATALOG.md](../../MASTER_CATALOG.md) (Части 1-8).

## Кратко
- Статус: **closed (в каталоге)**
- Цепь: —
- Приз: —
- Типы: unknown
- Что осталось / сложность: отнесён к закрытым

## Адреса/эскроу
- Данные об адресе/призе в каталоге отсутствуют — требуется уточнение.

## Источники
- Каталожная запись Части 6 `MASTER_CATALOG.md` (закрыт).

## Подробности
- Пазл упомянут только в списке закрытых, без деталей.
- Название указывает на связку «доказательство» + «текст» (возможно, литературный пазл).
- Пробел: неизвестны адрес, приз, механизм и источник.

## Зацепки / следующий шаг
- Не тратить время (закрыт)
- При появлении новых данных — дополнить карточку

---
## Логирование (обязательно)
См. `../../AGENT_INSTRUCTIONS.md`. Любая значимая находка, прогресс, баланс или решение (полностью либо частично) **должны** быть дописаны сюда с датой и ссылкой на источник. Параллельные агенты обязаны соблюдать тот же протокол.

## История изменений
- 2026-10-16 (deepseek-flash) — папка создана; базовое досье собрано из `MASTER_CATALOG.md` (Части 1-8).

## Обновление (2026-10-16, deepseek-flash — web-исследование): ПАЗЛ РЕШЁН
- Тип: решение (полное)
- Суть:
  - **1 марта 2025** автор под ником **cain** опубликовал на платформе **Proof Of Writing** (eCash, читатели платят авторам в XEC)
    эссе «Building an awesome eCash community and a chance to win 5M XEC». Никаких инструкций, кроме слов «шанс выиграть» в заголовке;
    в тот же день в кошелёк Cashtab легло **5 000 000 XEC**.
  - Первая подсказка — **«Revelations 22:13»** («Я есмь Альфа и Омега, начало и конец, первый и последний»).
  - Вторая появилась **14 апреля 2026** при переносе статьи на новую версию сайта: адрес сверху, **+10 млн XEC**
    и фраза **«It can be solved without ai or a computer»**.
  - **Решение:** «Альфа и Омега» = первый и последний. Начало — слово `Matter` (первое слово второго абзаца),
    конец — абзац о людях, «которые приходят, потому что верят». Между ними 12 абзацев; по диагонали берётся
    слово 1 из первого абзаца, слово 2 из второго и так далее.
  - Полученная сид-фраза BIP39: `matter key easily slot maple two visa swamp subject friend robust trip`
    (три слова «подстрижены»: swamped→swamp, subjecting→subject, friends→friend); контрольная сумма сошлась.
  - **Ловушка второго уровня:** eCash зарегистрирован под coin type 899, но **Cashtab с марта 2024** создаёт кошельки
    на пути `m/44'/1899'/0'/0/0`; на «учебном» пути адрес пустой.
  - **26 августа 2026, 23:41 UTC** — 30 067 980,76 XEC ушли с адреса; на следующий день пост «Solved»,
    затем публикация сид-фразы и метода. Решатель — пользователь **Ori (oritwoen)**.
  - К концу августа кошелёк держал 30 068 000,94 XEC — **в шесть раз больше** изначально обещанного.
- Источники:
  - https://puzzles.agntn.dev/raw/collections/proof-of-writing.md
  - https://puzzles.agntn.dev/collections/proof-of-writing
  - https://web.archive.org/web/20250327234214/https://proofofwriting.com/building-an-awesome-ecash-community-and-a-chance-to-win-5m-xec/
  - https://puzzles.agntn.dev/solvers/oritwoen
  - https://x.com/caincurrency
  - https://reviews.bitcoinabc.org/D15679
- Не подтверждено: заявление самой статьи о «5M XEC» как окончательном призе (по цепочке приз вырос до ~30M XEC);
  авторство «Ori» за пределами записи реестра.
- Открытые детали: кто такой cain; почему путь 1899 не был указан в тексте; был ли «round trip» 29 сентября 2025
  (5 059 096,41 XEC ушли и через 13 часов вернулись с токеном XECX) технической ошибкой или проверкой.
- Проверено: да — решение воспроизводится (сид, путь, адрес и публичный ключ проверены в реестре @agntn/puzzles).
- Влияние на оценку: статус меняется с «closed» на **«solved (26.08.2026), приз выплачен»**.

## Досье agntn/puzzles (16.10.2026)

Перенесено из реестра [@agntn/puzzles](https://puzzles.agntn.dev/collections/proof-of-writing) (raw: https://puzzles.agntn.dev/collections/proof-of-writing.md). Ниже — разбор первоисточника: механика, кто решал, что проверено.

- `id`: "proof-of-writing"
- `chain`: "ecash"
- `address`: p2pkh("ecash:qq5r308v2mkh6x5mkqpr6wytszz6f9r7qcnfttev0z", "2838bcec…a4947e06")
- `sourceUrl`: ARTICLE
- `startedAt`: "2025-03-01 08:32:39"
- `status`: Status.Solved
- `prize`: 30068000.94
- `pubkey`: compressed("0257eaa8…31b7f48b6d")
- `key`: seed("matter key easily slot maple two visa swamp subject friend robust trip", "m/44'/1899'/0'/0/0")

> An essay about the eCash community with twelve seed words on its diagonal. Nobody read it that way for eighteen months and the prize grew to 30 million XEC before it went.

March 1, 2025. cain posts [Building an awesome eCash community and a chance to win 5M XEC](https://web.archive.org/web/20250327234214/https://proofofwriting.com/building-an-awesome-ecash-community-and-a-chance-to-win-5m-xec/) on Proof Of Writing, the eCash site where readers pay writers in XEC. Three minutes of reading. Community, engagement, trust, a church on Sundays. Where's the puzzle? Nowhere. Just "a chance to win" in the title and not a word more.

That morning 5,000,000 XEC lands in a Cashtab wallet. Then nothing happens for a year and a half, except the prize keeps growing. **30,068,000.94 XEC** by August 2026, gone in one transaction on August 26.

## Two hints

First one, `Revelations 22:13`. "I am Alpha and Omega, the beginning and the end, the first and the last." Looks like a nice quote for an essay about belief. It's actually the whole puzzle, packed in one verse.

Second one came with the relaunch on April 14, 2026. cain moved the article to the new Proof Of Writing, put the address on top and added: "It can be solved without ai or a computer". Plus 10M XEC that morning, 10M more in June and 5M on August 20. That last 5M had six days of life left.

## The diagonal

Alpha and Omega, first and last. So you need a start and an end. The start is `Matter`, the first word of the second paragraph. The end is the paragraph about people "who show up because they believe". Twelve paragraphs between them, and then you go down the diagonal: word 1 from the first one, word 2 from the second, word 3 from the third, all the way to word 12 from the twelfth.

<table>
<thead>
  <tr>
    <th>
      Paragraph opens with
    </th>
    
    <th>
      Word
    </th>
    
    <th>
      BIP39
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      Matter of fact
    </td>
    
    <td>
      Matter
    </td>
    
    <td>
      <code>
        matter
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      Another key to
    </td>
    
    <td>
      key
    </td>
    
    <td>
      <code>
        key
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      Engagement is easily
    </td>
    
    <td>
      easily
    </td>
    
    <td>
      <code>
        easily
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      This isn’t a slot machine
    </td>
    
    <td>
      slot
    </td>
    
    <td>
      <code>
        slot
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      Like timber from a maple tree
    </td>
    
    <td>
      maple
    </td>
    
    <td>
      <code>
        maple
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      Purpose and belief may be two
    </td>
    
    <td>
      two
    </td>
    
    <td>
      <code>
        two
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      If eCash wants to take on Visa
    </td>
    
    <td>
      Visa
    </td>
    
    <td>
      <code>
        visa
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      Trust is crucial. Lately, crypto has been swamped
    </td>
    
    <td>
      swamped
    </td>
    
    <td>
      <code>
        swamp
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      On a personal note, my wife has been subjecting
    </td>
    
    <td>
      subjecting
    </td>
    
    <td>
      <code>
        subject
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      We mostly keep to ourselves, and have made no friends
    </td>
    
    <td>
      friends
    </td>
    
    <td>
      <code>
        friend
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      I appreciate how everything runs so smoothly. They have a robust
    </td>
    
    <td>
      robust
    </td>
    
    <td>
      <code>
        robust
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      It’s what the eCash community could be, I thought. What a trip
    </td>
    
    <td>
      trip
    </td>
    
    <td>
      <code>
        trip
      </code>
    </td>
  </tr>
</tbody>
</table>

Nine words are straight from the BIP39 list. Three need a haircut: `swamped`, `subjecting` and `friends` lose their endings. Checksum passes too, which a random twelve does only once in sixteen tries. And yes, pen and paper are enough to find all of it. cain wasn't bluffing.

"What a trip" as the last word. Honestly, hard to write a better ending for this puzzle.

## Path 1899, not 899

Twelve words and you're done? Not really. eCash's registered coin type is 899, so every textbook tells you `m/44'/899'/0'/0/0`. That address is empty, never funded. Cashtab has made every new wallet on `m/44'/1899'/0'/0/0` since [March 2024](https://reviews.bitcoinabc.org/D15679), and that's where the prize was sitting. So you can have the right seed, check the textbook path, see zero and throw the answer away. Same trap as the [Movie Enigma](https://puzzles.agntn.dev/collections/movie-enigma) checksum, one level deeper.

[Ori](https://puzzles.agntn.dev/solvers/oritwoen) didn't throw it away. 30,067,980.76 XEC left on August 26, 2026 at 23:41 UTC, the "Solved" post went up the next day, and the seed with the method a few hours after that. cain updated the article with the news and a link to the post.

## What the Proof Of Writing record carries

```ts [src/collections/proof-of-writing.ts]
export const ecashCommunity = puzzle({
  id: "proof-of-writing",
  chain: "ecash",
  address: p2pkh("ecash:qq5r308v2mkh6x5mkqpr6wytszz6f9r7qcnfttev0z", "2838bcec…a4947e06"),
  sourceUrl: ARTICLE,
  startedAt: "2025-03-01 08:32:39",
  status: Status.Solved,
  pubkey: compressed("0257eaa8…31b7f48b6d"),
  key: seed("matter key easily slot maple two visa swamp subject friend robust trip", "m/44'/1899'/0'/0/0"),
  prize: 30068000.94,
  hints: [
    official("Revelations 22:13", ARTICLE, undefined, { answer: answer("The clue \"Alpha and Omega\" defines paragraphs …", SOLUTION, { date: "2026-08-27" }) }),
    official("It can be solved without ai or a computer", ARTICLE, undefined, { date: "2026-04-14" }),
  ],
  transactions: [funding(/* 2025-03-01, 5M XEC */), decrease(/* 2025-09-29 */), increase(/* four more */), claim(/* 2026-08-26 */)],
  solver: party("Ori", { key: "oritwoen", … }),
  assets: assets({ puzzle: "puzzle.txt", sourceUrl: CAPTURE }),
});
```

### The first eCash record

New chain in the dataset. `chain: "ecash"` puts the record there: CashAddr with the `ecash:` prefix, XEC with two decimals, and `verify()` walks the seed down the recorded path, 1899 and all. `puzzles verify proof-of-writing` says `OK`. Nice to see after all that.

### A round trip in September

September 29, 2025, a small heart attack for anyone watching the address. 5,059,096.41 XEC goes out. Thirteen hours later 5,058,997.76 XEC comes back, both times with the XECX token along for the ride. Only the key holder could sign the first one, so it's a `decrease`, not a claim. False alarm, the puzzle stayed open.

### What the transactions leave out

Sixty-eight deposits of 1,000 XEC, most of them in March and July 2025, all but one with a `PAY` marker in the OP_RETURN. Small, and nobody called them prize money, so the record keeps the four real deposits and the round trip and skips the rest. They still count in `prize`, because that's what the claim transaction spent.

### The text

Here the text is the puzzle, so it's in the repo. `assets/proof-of-writing/puzzle.txt` is the essay as the [Wayback Machine saw it on March 27, 2025](https://web.archive.org/web/20250327234214/https://proofofwriting.com/building-an-awesome-ecash-community-and-a-chance-to-win-5m-xec/), the title and fourteen paragraphs. Want the version with the seed words bolded and capitalized? That one is on the new site, behind 100 XEC.

## The Proof Of Writing record
