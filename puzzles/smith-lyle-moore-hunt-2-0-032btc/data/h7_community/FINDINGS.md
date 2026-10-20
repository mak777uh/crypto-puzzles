# H7 — разведка сообщества (Glimmer / Hunt #2), проход 2026-10-19

Только чтение. Ничего не публиковалось, не комментировалось, ЛС не писались, трат не было.
Папку `h7_community/` и этот файл создал исследовательский проход; LOG.md и общие файлы не трогались.

## Главное (блок №1 — критерий бита)

**Публичного описания признака 1/0 НЕ СУЩЕСТВУЕТ.** Первоисточник метода — ровно тот же
трёхстрочник, что уже калиброван в H7, и он не содержит критерия бита. Дословно
(id `pejgs65`, u/rational-Gain5010, тред `Second Treasure Hunt Discussion`,
permalink `https://www.reddit.com/r/smithlylemoore/comments/wojppy/second_treasure_hunt_discussion/pejgs65/`):

> Hey! this wasnnot from me, but for you to know how: "I got discoverglimmer from this clue: 1. The rapid montage is mapped out with one stable slot every 10 frames—that is, 3 slots per second.
> 2. Every ninth slot is the same coastal separator frame; there are 14 such separators in total.
> 3. Removing the separators leaves 120 usable slots: exactly 15 groups of 8 bits."
>
> Now, the password is:
>
> discoverglimmer.
>
> Let me know if you need more help!

Важные обстоятельства, установленные живым заходом (2026-10-19):

- Комментарий `pejgs65` **удалён с Reddit**. Страница
  `/r/smithlylemoore/comments/wojppy/comment/pejgs65/` отдаёт баннер
  «Этот комментарий больше не существует», а в ветке под `pegl0kj` единственный слот ответа
  показывает `[удалено] / Комментарий удален`. Полный дамп ветки: `thread_wojppy_comments.txt`
  (131 запись, ни одной с критерием бита) + `feed_rational-Gain5010_comments.txt`
  (полный текст `pejgs65` восстанавливается только из user-flow RSS — сохранён).
- Автор сам говорит «this was not from me» — то есть он **цитирует безымянного солвера**.
  У `rational-Gain5010` **ноль опубликованных постов** (проверено
  `/user/rational-Gain5010/submitted/.rss` → пустой фид), только комментарии-вставки чужого
  текста. Настоящий первоисточник схемы публично не светился.
- Ответов/обсуждения под `pejgs65` не было: в ветке ровно 1 ответ (сам `pejgs65`), дальше
  ничего. Детализацию «что такое 1 и что такое 0» никто никогда не выкладывал.
- Единственная публичная зацепка к механизму — `pcj7x4y` (тот же автор):
  «It is on the video, dm and I explain you. Think on the name of the song too»,
  оставленная в ответ на просьбу по гейту `/take-a-big-breath` (Wix id `c2ozw`, заголовок
  страницы «resurface»). То есть схема lives в **ЛС**, куда мы по правилу каталога не идём.
- Тред-запрос `pegl0kj` (u/glimmerreader_9281) помечен Reddit как
  «Это автоматизированный аккаунт» (bot-flagged) — то есть даже публичная просьба о деталях
  исходила не от человека.

## Блок №2 — другие каналы

| Канал | Итог |
|---|---|
| Reddit r/smithlylemoore | 10 постов всего, ничего свежее 2022 + Lounge. Даumps: `thread_wojppy.*`, `thread_megathread_ojmwfr.*` |
| Reddit r/puzzles / r/BitcoinPuzzles | постов по Glimmer-бит-канале не найдено (web-поиск по «discoverglimmer» даёт только рекламу Estée Lauder/Woolworths — ноль независимого следа) |
| X/Twitter @SmithLyleMoore | **не открылось**: `syndication.twitter.com/.../SmithLyleMoore` → «Rate limit exceeded», сам x.com за логином |
| Bitcointalk | **не открылось**: поиск только для зарегистрированных (`action=search2` → Login); web-поиск тред ханта не находит |
| web.archive.org | не использовался (ранее давал 403; живой текст `pejgs65` восстановлен из Reddit RSS, надобность отпала) |
| Discord/Telegram/блоги | следов разбора монтажа не найдено |

## Блок №3 — что нового по Hunt #2 (сверх известного)

1. **Полный разбор Hunt #1** (комментарий `pdzbkjn`, тот же автор, в том же треде; на день
   выгрузки 19.10 он был `[removed]`, сейчас читается через user-flow RSS — сохранён целиком в
   `feed_rational-Gain5010_comments.txt`). Ценность — конвенции автора пазла: форматы паролей
   вида `tomorrow0010000`, `morse00100001`, `codebreaker11`; письмо на
   `codebreaker@smithlylemoore.com` → **ответ через ~1 день** с новым URL и паролем; финал —
   `gateway` + «the end of it all» → `supernova`. Прямое отношение к нашему вопросу про
   финальный email: публичного шаблона ответа нет, прецедент #1 — «письмо с 12 словами →
   человек/автоответчик присылает следующий URL».
2. **Почта жива в 2026**: u/Unlikely_Ad3554 (`p8xxwi3`) — «mail box is still active i got
   response from them lol». Контрапункты: u/shamewizard__ (`p69n6uz`) считает письмо
   скамом/риском; u/Englipt (`p60lqs0`) ждёт 7 ч, u/Slight_Force_208 (`p60gsxa`) 3 суток без
   ответа. То есть оракул «правильный ключ → ответ» не подтверждён, ответы бывают у некоторых.
3. **Никто хант #2 не решил.** Публично все сидят на гейтах: East (`pirate-battle`,
   `weallliveinayellowsubmarine`, `narcosis`, `take-a-big-breath`/`resurface`), South
   (`raft-escape`, `smoke-signals`), West (`message`, список имён Blackbeard/Fanning/Ulrich/
   Ulbricht/Svartholm/Neij — rarioj `j5mauw8`: «all names mentioned there have something in
   common»), North (после кита — «coming soon», по several сообщениям пуст). Обмен паролями
   идёт exclusively в ЛС (`p70kd2k`, `p7fv0rq`, `pbyp4lj`, `phe1dot`).
4. **Новых замков не открывали**: живые страницы `glimmer`, `who-is-she`, `take-a-big-breath`
   отдают только пароль-гейтнутую оболочку Wix (200 OK, контента нет), текст `/treasure-hunt`
   не менялся, сумма в `/more-info` по-прежнему «.031777 Bitcoin».
5. **`c2ozw`** — не внешний токен, а **внутренний Wix id страницы** `resurface`
   (seo-slug `/take-a-big-breath`); совпадает с нашим `h2c_pagemap.json`. Никаких упоминаний
   `c2ozw` в сообществе/вебе не найдено.
6. Единственный публичный намёк на носитель бита для `discoverglimmer` — «It is on the video …
   Think on the name of the song too» (`pcj7x4y`) + замечание сообщества, что Glimmer feat.
   Dhani Harrison, а East-ветка крутится вокруг Beatles/20000 leagues (`p6m2pg2`, `p668cva`).
   Про яркость/позицию овала/LSB-MSB — **ни одного слова**.

## Блок №4 — опубликованные подсказки Hunt #2 (точные цитаты, снято живьём 2026-10-19)

- `/treasure-hunt`: «TLDR: This is a digital treasure hunt. Whoever reaches the end of the
  journey first will uncover the private keys to a bitcoin wallet… P.S. X Marks the spot —
  find the X (not on the flag), and we'll help you solve the first clue.»
- `/more-info`: «…Woven into our next single, Glimmer, is a story. Uncover the story... it
  will lead you to .031777 Bitcoin.» / «Presave Glimmer and we'll help you solve the first
  puzzle in an email on release day.» / «…share this hunt on reddit (comments or posts), and/or
  tag your friends on social media and show us, and we will reward you for helping us spread
  the word.» / «In rainbow road on N64, if you speed boost at the beginning and fly off track
  to the left (with precision), you can be taken on a large shortcut. There is also a shortcut
  in this journey if you know where/how to look and are willing to take the baby steps that
  lead to one giant leap.»
- `/get-hints`: «Share this treasure hunt with your friends on social media. Tag us. We will
  offer assistance to those that do, with one of the first 3 steps (your choice which one —
  previous page was Step #1)… After that, any hints will only be shared publicly.»
- `/the-search-begins` (публичный стартовый текст): «The mystery begins... You land in the sea.
  Your ship, Poseidon, is close by. You swim to it. Why didn't she come to get you?» + полный
  текст про cabin/Welcome Home/garlic (важно: «ship = Poseidon», «she» — тот же гейт
  `who-is-she`).
- Пост автора `w8pwag` + репост их Instagram-текста (`ihqp7m6`): «We've used a large part of
  our advertising budget for Glimmer to bury a $750 digital treasure…»

## Файлы в h7_community/ и что они подтверждают

| Файл | URL-источник | Что подтверждено |
|---|---|---|
| `thread_wojppy.rss.xml` (87 КБ, 131 entry) | `https://www.reddit.com/r/smithlylemoore/comments/wojppy/.rss?limit=500&sort=new` | полный публичный состав треда; ни одного упоминания критерия бита |
| `thread_wojppy_comments.txt` | то же, распаршено | читаемыйverbatim-дамп 131 комментария (поиск по bit/montage/separator/frames — 0 совпадений по методу) |
| `feed_rational-Gain5010.rss.xml` | `https://www.reddit.com/user/rational-Gain5010/.rss?limit=100` | единственный живой носитель текста удалённого `pejgs65`; + полный `pdzbkjn` (разбор Hunt #1) |
| `feed_rational-Gain5010_comments.txt` | то же | verbatim: `pejgs65`, `pcj7x4y`, `pdzbkjn`, `pbwpmz0`, `pbywdaq`, `pc301g2` и др. |
| `thread_megathread_ojmwfr.rss.xml` / `_comments.txt` | `https://www.reddit.com/r/smithlylemoore/comments/ojmwfr/.rss?limit=500` | 242 записи официального MEGATHREAD (Hunt #1, ответы группы); конвенции формата паролей и email |
| `site/treasure-hunt.html`, `more-info.html`, `get-hints.html`, `glimmer.html`, `who-is-she.html`, `take-a-big-breath.html`, `the-search-begins.html` | живые страницы `smithlylemoore.com`, 2026-10-19 | официальные подсказки в текущей редакции; `glimmer`/`who-is-she`/`take-a-big-breath` = только оболочка (гейт цел, новых замков не видно) |
| `site/site_texts.json` | извлечено `extract_site_texts.py` | точные цитаты текстов страниц |
| `dump_feeds.py`, `extract_site_texts.py` | — | инструменты извлечения (read-only по входным дампам) |

## Не удалось (честно)

- X/Twitter @SmithLyleMoore — syndication API отдал «Rate limit exceeded», сам сайт за стеной
  логина; корневые твиды по «Glimmer/discoverglimmer/c2ozw» не получены.
- Bitcointalk — поиск только для зарегистрированных; отдельного треда ханта web-поиск не нашёл.
- Lounge-тред `ojmqzj` свежим дампом — 429 (Reddit rate limit); содержимое частично есть в
  более раннем локальном `../reddit_comments_all.json`.
- Текст `pejgs65` в виде живого комментария — удалён модератором/автором; восстановлен только
  из user-flow RSS.
- Никакого публичного описания признака 0/1 (яркость/позиция/цвет/порядок бит) найти не удалось;
  ни в Reddit, ни за его пределами. Ось H7 остаётся разблокируемой только через ЛС солверов
  (что запрещено правилами каталога) либо через собственную гипотезу.
