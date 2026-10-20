# Smith, Lyle & Moore Hunt #2: Glimmer

Индекс: [MASTER_CATALOG.md](../../MASTER_CATALOG.md) (Части 1-8). Источник данных: [open-crypto-puzzles](https://github.com/floflo777/open-crypto-puzzles).

## Кратко
- Статус: **open** (mid)
- Цепь: bitcoin
- Приз: 0.031777 BTC (USD 2002)
- Примечание: 3,177,700 sats, funded in a single transaction on 2022-07-29, unspent
- Опубликовано: 2022-07-29 https://www.smithlylemoore.com/treasure-hunt
- Типы: bip39-seed, password-pages, web-tree
- Difficulty left: insight
- the 12 words and passphrase are locked behind 3 password-gated pages, each requiring a specific author-intended answer to a riddle rather than a decodable cipher; about 5,000 candidates have been tried across the 3 locks with 0 hits, none of them a certified exhaustive negative

## Адреса/эскроу
- `bc1q0akdjvrc2csau2n3gyxa3xcq0fss852x997m9y` — main | expected: 3177700 sats | state: funded-unspent (checked 2026-08-16) | https://mempool.space/address/bc1q0akdjvrc2csau2n3gyxa3xcq0fss852x997m9y
- `bc1qax0hsnwnxl7393awtc3hsy0ftm6tg4tyk2nfja` — my wallet (destination if solved) | expected: n/a | state: unknown (checked 2026-08-16) | https://mempool.space/address/bc1qax0hsnwnxl7393awtc3hsy0ftm6tg4tyk2nfja

## Источники
- 2022-07-29 — Smith, Lyle & Moore, Treasure Hunt page — https://www.smithlylemoore.com/treasure-hunt
- 2024-08-23 — Bitcoin Treasure Hunt - 2021 (still unsolved) — https://stacker.news/items/658645
- 2026-08-16 — Escrow address — https://mempool.space/address/bc1q0akdjvrc2csau2n3gyxa3xcq0fss852x997m9y

## Подробности
Здесь должна накапливаться расширенная информация по мере проходов: подсказки, прогресс сообщества, проверенные гипотезы, ссылки, compute-оценки. Текущий файл — скелет из OCP; заполняется автоматически в циклах.


---
## Логирование (обязательно)
См. `../../AGENT_INSTRUCTIONS.md`. **Полная хроника всех агентов — в `LOG.md` этой папки** (по датам, с самопредставлением при первом заходе, включая отрицательные результаты; код — в `tools/`, данные — в `data/`). Сюда, в README, дописываем только прорывы и важное (с датой и ссылкой); глобальные изменения — в `../../MASTER_CATALOG.md` + `../../WAKE_QUEUE.md`. Параллельные агенты обязаны соблюдать тот же протокол.

## OCP deep docs
- Folder: https://github.com/floflo777/open-crypto-puzzles/tree/main/2-mid-prizes/smith-lyle-moore-hunt-2-0-032btc
- README (raw): https://raw.githubusercontent.com/floflo777/open-crypto-puzzles/main/2-mid-prizes/smith-lyle-moore-hunt-2-0-032btc/README.md


## Curated deep dive (OCP, 16.10.2026)
- Сайт Wix (~70 страниц), пароли; EXIF-GPS открывает compass и 4 ветви: north/south/east/west64.
- West (Blackbeard, Napster/Metallica/Silk Road/Pirate Bay), East (наркоз/«is this the end?»), South (Name 6 — шестой кастaway Gilligan’s Island), North — тупик.
- Escrow подтверждается xpub: BIP39 12 слов + passphrase → BIP84 m/84’/0’/0’/0/0 → P2WPKH.
- Факты: пароли регистрозависимы (Title Case); в North 0 из 12 слов; нет numeric suffix; gating server-side.
- Проверено: ~2,1k West + ~2,0k East + ~775 South кандидатов — 0; правило «нижний регистр» опровергнуто; cover-art trailer bytes 1,585 img — 0; аудиостего — 0.
- Зацепки: (1) повторить West в Title Case (~1,560 кандидатов); (2) точная фраза East («does not end here», Gandalf-цепочка); (3) reverse-image search стиллов LifeFlashBeforeEyes.mp4; (4) каламбур South (slug havingfunwiththeurl-ilovedthisshowasakid, «unbridaled»).
## Досье Hark v2 (16.10.2026)

Перенесено из `MASTER_CATALOG_v2_2026-10-16.md` (рабочие досье агентов Hark, 16.10.2026 23:40 МСК). Картина механизма, подсказок, проверенных и отброшенных гипотез, оракулов и файлов.

### A3. Smith, Lyle & Moore Hunt #2 «Glimmer» — 0,03177700 BTC
- **→ Полное актуальное досье (что решено, что проверено, что осталось): ЧАСТЬ 8.2 (SLM Glimmer).** Старая краткая запись заменена.


### A3. Smith, Lyle & Moore Hunt #2 «Glimmer» — 0,031777 BTC (3 177 700 сат)
- **Адрес**: `bc1q0akdjvrc2csau2n3gyxa3xcq0fss852x997m9y`. Это BTC, BIP39 из 12 слов + **passphrase** (25-е слово), BIP84 P2WPKH, путь `m/84'/0'/0'/0/0`. hash160 `7f6cd930785621de2a71410dd89b007a6103d146`, pubkey адреса `037e3109f564912f1007912d90f76c7aae43b812d6286d609a86140b746fbc7943`.
- **Account xpub (m/84'/0'/0')**: `xpub6CpNc58zqQvNGPHDGGTr68wgrmtfFDBWRuSDAxoDdrCE1iRAaZtyAD5T9uCJ3ELUYKCkx8Jkind2kwoR3Uxmg1ycQ6DWyGxZBMFvQqhNqVC`. Автор опубликовал его на сайте. Проверка: /0/1 того же аккаунта = `bc1q8cgqs3aljnj5fzg044v0lwh5cn8tul87wlvpwt`, адрес донатов группы.
- **Баланс**: 3 177 700 сат, трат нет. Проверки: blockstream 13.10 17:10, затем каждый цикл; последняя запись в glimmer/NOTES.md — 16.10 00:37 МСК, «intact».
- **Hunt #1** решён в 2021: `fortune all man kind one giant step into digital tomorrow virtual moon` + passphrase `supernova`. По нему проверен весь наш тулчейн.

**Источники**
- smithlylemoore.com (Wix). metaSiteId `13cab6fc-e004-4514-aab0-a7cf702047f9`, siteId `b8aa9fe0-61db-4696-8909-9dd877606aa4`, rev 4.
- r/smithlylemoore, ветки wojppy («Second Treasure Hunt Discussion») и ojmqzj. Читаем через arctic-shift.photon-reddit.com/api/comments/search?subreddit=smithlylemoore; pullpush из curl закрыт Cloudflare.
- github.com/floflo777/open-crypto-puzzles, раздел smith-lyle-moore-hunt-2-0-032btc (локальный клон /workspace/work/slm/ocp). Отстаёт от нас.
- github.com/benjacasas02/independent-cryptography-research/tree/main/research/glimmer (досье u/TapInteresting2374, снимок 02.09.2026). Копия в /workspace/work/glimmer/comm/tap/.
- Отчёт решателей от 26.08.2026 (pdfhost j8y6cN2WSx): /workspace/work/glimmer/findings.txt. Устарел: слова 6–9 и 11–12 в нём неверны.
- puzzles.agntn.dev: xpub и pubkey.

**Механизм.** Сайт — лабиринт из ~57 запароленных страниц Wix. Пароли регистрозависимы. Бутылки с посланиями дают слова seed с номерами. Финал /glimmer: «Once you have all 12 words… email them to us, for the final step». Кнопка на нём — mailto `codebreaker@smithlylemoore.com`, тема «I've Found Amphitrite, and All 12 Words». В Hunt #1 passphrase сообщали только после такого письма.

**Замки: открытые (46 из 57; pid / slug → пароль → что за ним)**
| pid /slug | пароль | что там |
|---|---|---|
| oq7la /latitude | `27756932` | цифры широты из EXIF Poseidon.jpg (27°7'56.93"N) + «2»; «longitude (numbers only)» |
| ml7yd /who-is-she | `73511573` | цифры долготы (73°5'11.57"W) + «3»; ТВ-комната → xtb6t |
| xtb6t /choose-your-direction | `amphitrite` | компас: north64/east64/south64/west64 |
| eetj4 north, x8cku atlantis, gyhal glow-in-the-dark, rtf05 octopus | `north64` | копии North → kx8wx |
| pbvye east, xrd91 birdpewp | `east64` | → e3zre |
| fv4pt south / g5jpk west | `south64` / `west64` | South → udr8x, vispv; West → wt1jy |
| e3zre /pirates | `albatross` | «welcome home party… Donner party at sea»; кнопки hhb0r и y6cd1 (fight) |
| hhb0r /talk-to-pirates | `semaphore` | картинка-семафор «PASSWORD YOU SHALL PASS 47» |
| sm18u /litter | `youshallpass47` | **бутылка: слова 1–5 `when you depart find mystery`** → qomxw |
| qomxw /night, wqcam /celine-dion | `witchoftheeast` | → giz6m, pxsqo |
| giz6m /isawthismovie3timesintheaters | `2hours40minutes` | → udr8x (смерть) |
| pxsqo /weallliveinayellowsubmarine | `20000leagues` | видео LifeFlashBeforeEyes.mp4 → c2ozw |
| c2ozw /take-a-big-breath (resurface) | `discoverglimmer` | **бутылка, подписи 5–8: `discover music need love`**; «password hint — where will you find her?» → h7j3h. Пароль — битовый узор монтажа (метод rational-Gain5010, Reddit pejgs65, 08.10) |
| h7j3h /a-rocky-beach (land) | `Atlas Mountains` | **«After I Love You… 10 fortune, 11 safe»**; «Sing her a song… password: closerandcloser» |
| gkfxt /glimmer (финал) | `closerandcloser` | текст о письме из 12 слов (mailto, см. выше); Glimmer.mp3, mountainbg720.mov |
| kx8wx /a-giant-whale-appears | `wavebreaker7109` | → gps16 |
| gps16 /speak-to-whales | `mobydick69420` | ролик James Nestor о кашалотах → mwfaz |
| mwfaz /whale-message | `glimmer` | бутылка `hunt gather whale blood` (приманка) → thmoi |
| thmoi /land-ho | `huntgathwhalblo` | → chtro, eqyel |
| chtro /hitch-a-ride / eqyel /swim-to-shore | `seahitchhiker` / `michaelphelps` | → d3zak / vbk6p |
| d3zak /reach-land | `sleighride` | тупик → ty78s /hell (`666`) |
| vbk6p /cape-cod | `vampire` | тизер следующего сингла |
| neyhh, shzgm, t2xjy, kvvu4, wdnv9 /name1–5 | `Gilligan` `Jonas` `Thurston` `Lovey` `Ginger` | цепочка «Острова Гиллигана» |
| b3vye /havingfunwiththeurl… (Name 6) | `Dr. Roy` | → jetkc |
| jetkc /hereonnnnngiligansissssssland | `Mary Ann` | остров: raft → zhgsm, fire → jcl9c, stay → udr8x |
| udr8x /death | `777` | тупик |
| vispv /awake | `electricfeel64` | → neyhh |
| wt1jy /message | `pirate bay` (нашёл Илья) | → a76va |
| a76va /ross-u (the library) | `shiphuntshalpar` | лайтбоксы zren* (FBI RAID «ffffffffff», Bitcoin QT, Apple Music); выход → ouxh2 |
| ouxh2 /escape | `escape` | → kx8wx (петля) |
| ruiat /the-passage → oanvz /the-vault | `FFFFFFFFFFF` → `4samcodeartist` | остатки Hunt #1; vault ссылается на удалённые dbqak, lw4kn |
| a4rhu /gateway → acwn5 /illstillbelovinyou | `codebreaker11` → `virtual moon` | остатки Hunt #1, к словам Hunt #2 не относятся |

**Замки: закрытые (11)**
- **zhgsm /raft-escape (RaftBuilt)**, «Escape via raft, made from palm tree wood». Пробовали весь BIP39 (часть ответов 429), канон Гиллигана, Cast Away/Wilson, Kon-Tiki, Heyerdahl, Huck Finn, Life of Pi, песни (Sloop John B, Piña Colada…), EXIF minnow.jpeg (22.6001,-73.41; дата 1964-09-26 = S1E1 «Two on a Raft»), эпизоды, каламбуры (palmpilot, macgyver, balsa, tiki…), все известные пароли. Всё 0. Возможно, это тупик.
- **jcl9c /smoke-signals (lightafire)**, «Light a Fire to Alert a Passing Ship». BIP39 2048 (0), песни (Light My Fire, Signal Fire, SOS), Smokey, Prometheus, тики-факел, Bat-Signal, Human Torch, Smaug, SOS/mayday, все известные пароли (включая Hunt #1). Всё 0. По SYNTHESIS — вероятный аналог шага огонь → vault из Hunt #1. Кандидаты `fffffffffff` (11 строчных f) и `01271967` в SYNTHESIS числились непроверенными; позже t21 прогнал все 43 известных пароля, но были ли среди них эти два, по файлам не видно.
- **y6cd1 /pirate-battle (fight)**, «I choose to fight». Пробовали brain_cands (571), оружие и Metallica, fight/yes/arrr, EXIF пиратского фото (25.9126,-44.1054, двоичное «nope lol»), все известные пароли. 0. BIP39-свип неполный (<100 слов).
- **sodpq /treasure-map-97328971321**: BIP39 2048 и общинные кандидаты — 0; по deepscan это остаток Hunt #1.
- **fibyo /vampire, tt6yc /vampireb**: общинные кандидаты — 0 (тизер сингла Vampire).
- **y756h /a, leklh /b, xjnxo /c, vy58x /d**: созданы 29.07.2022, в день релиза Glimmer. Финальные слова, supernova, 4samcodeartist — 0. Гипотеза: это страницы, которые открываются после письма.
- jbuh5 /my-account — служебная страница Wix. Публичные (без пароля): key-checker gv4d7 (рикролл), waiting / still-waiting, end-of-treasure-hunt, get-hints.

**Известные слова seed**
1 when · 2 you · 3 depart · 4 find · 5 mystery (/litter) · 6 discover · 7 music · 8 need · 9 love (/take-a-big-breath, подписи на странице **5–8**) · 10 fortune · 11 safe (/a-rocky-beach) · 12 **?**
- Порядок под вопросом. A: mystery на 5-м месте (основной). B: mystery на 9-м. Ещё два порядка: mystery 12-м, неизвестное слово на 5-м или 9-м месте (логи D/E). Номера 9 нет ни на одной странице.
- На Reddit пишут: aramor1 — «10 you will receive, but 9 and 12 no»; iuseredditlikeyou (16.09) — «two are missing and there are replacements».
- Слово 12 в порядке A: 128 вариантов с валидной контрольной суммой (список в /workspace/work/glimmer/glimmer_wallet.txt). В порядке A из песни проходят eagle, fly, now; в порядке B — climb, heart, sun, dust, behind, horn, leave, nothing.

**Проверено и отброшено (офлайн, оракул xpub)**
- Комментарий к таблице: все прогоны ниже — 0 совпадений.

| Seed / порядок | Passphrase | Объём |
|---|---|---|
| A и B, слово 12 перебрано целиком (125 / 128 вариантов) | 15 248 вариантов: кандидаты, лирика 1–4-граммами, регистры | закончено 16.10 ~20:15 |
| A и B × 128 | 1 168 паролей, slug и названий страниц | ~299 тыс. комбинаций |
| A и B × 128 | 299 band-фраз (участники группы, Dhani Harrison, Beatles) | — |
| D/E | 1 169 вариантов | закончено |
| D/E | 15 248, первая треть (5 122) | закончено; вторая треть (5 067) по логам не завершена |
| A × 128 | одно слово BIP39, годы 1900–2030, числа (4 247) | прервано по лимиту CPU, неполно |

- По досье Tap (seed с whale-словами и virtual moon): пустой passphrase, supernova, словарь в 358 тыс. слов. Для нашего seed тела это неприменимо.
- Медиа: все видео (Wix-транскоды, метаданные потеряны), разница двух версий Glimmer.mp3 (только шум кодека), EXIF, спектрограммы — подсказок нет. Обложка: base32 `UVHZ532IWIFZFN5FUY2K5RDX3I` → 16 байт `A54F9EEF48B20B92B7A5A634AEC477DA`, ни на что не подошло.
- Не повторять: пустой passphrase, supernova, словарные свипы, полный свип 15 248 × A/B.

**Что осталось / следующий шаг**
1. Слово 12 и passphrase. Гипотеза из NOTES: их присылает автор после письма из /glimmer, как было в Hunt #1. Черновик письма с 11 словами готов, но не отправлен: Илья сомневается, стоит ли слать 11 слов. Отправка только с его явного согласия.
2. Открыть zhgsm / jcl9c. Паттерн ветки: «знаменитость/вещь, выполняющая действие кнопки». Плюс зеркало Hunt #1: огонь → vault → gateway.
3. Ответ группы на просьбу о подсказке. Комментарий u/Serious-Bad8845 (Google mak777777uh) от 16.10 23:17: https://www.reddit.com/r/smithlylemoore/comments/wojppy/comment/ph62e5z/ — на 23:30 ответов 0. /get-hints требует публичного поста; r/smithlylemoore ограничивает новые посты.
4. Дожать: D/E × оставшиеся 2/3 набора 15 248; BIP-слово/год как passphrase с файлом прогресса.
- Запреты: решателям в ЛС не писать (Илья, 14.10 18:46 «забей ищи сам»). Не писать на smithlylemoore.codebreaker@proton.me (по Reddit — возможный скам).

**Оракул, скорость, файлы**
- Оракул паролей Wix: `POST https://site-pages.wix.com/_api/wix-public-html-info-webapp/resolve_protected_page_urls?siteRevision=4`, тело `{password,pageId,metaSiteId,siteId}`. 200 + URL JSON — верно, 403 — неверно, 429/прочее — лимит (повторить). Только последовательно, пауза 0,3–0,6 с (≈2 500 проверок/ч). Параллельные скрипты получают 429/WAF и ложные «мимо».
- Оракул seed (офлайн): /workspace/work/glimmer/w12check.py (сравнение account-pubkey `TPUB`), slotcheck.py (шаблон с «?»), fwr.py (резюмируемый свип, файлы progA/progB.txt), walletcheck.py (embit+coincurve в ./pylib, ~1,2 мс/адрес). Скорость ~15–16 с на слово × 15 248 passphrase (≈1 000 проверок/с на 2 ядрах). Фоновые задачи песочницы убиваются через 1 200 с — нужен резюм.
- Файлы /workspace/work/glimmer/: NOTES.md (главный журнал, 16.10), map.json (pid→пароль, без 4 последних), sitemap.json (slug→pid,title), edges.out, page_*.json, SYNTHESIS.md (правила автора, топ-кандидаты), COMMUNITY.md, DEEPSCAN.md, glimmer_wallet.txt (сводка для GPU), HIT_h7j3h.txt, t*.py (батчи для оракула), pp_*.txt / ppF_0* (списки passphrase), bip39.txt, comm/ (дамп Reddit, досье Tap), vid2/, audio_diff/.
- /workspace/work/slm/: NOTES.md (журнал 13–14.10), wix.py (check/fetch), map.py, g.py, guesslog.txt, pwmap.json, GRAPH.md, RULES.md, seedsearch.py, run1–15.py (ранние офлайн-свипы), ocp/.
- Разведка Reddit: /workspace/projects/1b07d678-80ae-425a-93d7-393c4a65d627/work/slm_public_intel_2026-10-16.md.

**Проекты Hark**
- db335b03 «Smith, Lyle & Moore: 0,0318 BTC» (13–14.10). Задача 9e23b25d отменена 14.10 22:08 при повороте «только заработок»; последняя активность 14.10 17:46.
- 1b07d678 «Priority Task Check». Активен 16.10 (status working, последняя активность 23:06): цикл каждые 10 мин, 40–80 новых ключей к zhgsm/jcl9c и проверка Reddit; ведёт /workspace/work/glimmer/NOTES.md.

**Оценка шансов.** До финала дошли (11 из 12 слов, все страницы на пути открыты). Слово 12 — 128 вариантов, при известном passphrase оно находится офлайн мгновенно. Упор — passphrase: по прецеденту Hunt #1 её почти наверняка выдаёт автор после письма. Без письма или ответа группы шанс низкий (координатор 14.10 оценивал ~3%). С ответом автора — высокий.

Файл: /workspace/projects/aa5ddde6-45de-46be-b0aa-6bd4db202e32/work/catalog_parts/g2.md

---

## Оперативный статус v2 (16.10.2026 ~23:30 МСК)

Строка из сводной таблицы `MASTER_CATALOG_v2` (Часть 0.3):

| SLM Glimmer | 3 177 700 сат, не тронут | см. 8.2 | 46/57 страниц открыто, 11 из 12 слов известны; упор в passphrase; черновик письма автору ждёт решения Ильи | проект 1b07d678 (цикл 10 мин) |

## Досье agntn/puzzles (16.10.2026)

Перенесено из реестра [@agntn/puzzles](https://puzzles.agntn.dev/collections/smith-lyle-moore) (raw: https://puzzles.agntn.dev/collections/smith-lyle-moore.md). Ниже — разбор первоисточника: механика, кто решал, что проверено.

- `key`: seed(

> An indie band hid bitcoin behind riddles on its own website. Born to Be Wild fell in 2021 to Morse and the password supernova. Glimmer is still open

Most bands buy ads. [Smith, Lyle & Moore](https://puzzles.agntn.dev/authors/smith-lyle-moore) bought bitcoin. They hid the keys behind riddles on their own website and called it a treasure hunt. Then they did it again a year later.

## Born to Be Wild, a trip to the moon

June 25, 2021. 0.025 BTC lands on a native SegWit address. The band's treasure hunt page doesn't show the address, though. It shows an xpub and promises the coins to whoever reaches the end of the journey first. The theme is Apollo 11. The first clue sits in the album cover of their Born to Be Wild.

### The album cover keeps talking

The PNG ends. The file doesn't. The record ships the cover, so you can read the rest yourself:

```bash
tail -c 233 assets/smith-lyle-moore/born-to-be-wild/puzzle.png
```

```text
You've found The Milky Way. Thanks for playing. 12 word key + Password. First word: fortune. Last stop, the moon. Your next stop is a secret museum. Enter through a hidden door. You'll need an 8-digit pin to gain admission, explorer.
```

So the shape is known from step one. Twelve words, one password, and the first word for free.

### Gate after gate on the way up

The rest is a chain of password pages and key checks. The winners' write-up lists every one of them.

- The museum pin is the date of the moon landing, `07201969`.
- The gold frames inside are the plaques of the first and last Apollo missions. Both end with "for all man kind". Three words.
- "One giant leap" would be perfect. Except `leap` isn't a BIP39 word. So it's `one giant step`.
- The museum burns down. One path is dated to the Apollo 1 fire and leads nowhere. The way back takes `fffffffffff`, then the same in capitals.
- The vault opens with `4samcodeartist`. Samuel Morse was a painter too, the band explained later.
- The YouTube mix and an inverted upload cancel out. What's left is Morse: `T+13STDALT`. Thirteen seconds after touchdown, the alternative mix has a guitar. The guitar spells `INTO DIGITAL`.
- A page of ones and zeros reads "like an immortal, it never dies." That's `tomorrow`.
- An email to the band earns the gateway. The ticket in is the last stop of the journey, `virtual moon`.

And the wallet password? "The end of it all", plus a star. `supernova`.

Ever tried to hear Morse in a guitar solo? One commenter got `into` and gave up on the rest. Fair enough.

### Check the twelve words yourself

```bash
npx @agntn/puzzles verify smith-lyle-moore/born-to-be-wild
```

`OK`. Drop the password and the same twelve words open another wallet, one that never saw a single transaction. That's why `seed()` takes a BIP39 passphrase as its third argument now.

### Solved overnight, written up the same day

The coins left on August 18, 2021, at 07:33 UTC. That evening [u/26-9-15-20](https://puzzles.agntn.dev/solvers/26-9-15-20) posted the full write-up: "we just solved the puzzle last night". The band answered under it with "Way to go you guys!!". Then they explained the frames, the giant step and the painter in their own words.

One thing nobody cracked. The page promised a shortcut, "the baby steps that lead to one giant leap". Asked about it, the band said nobody figured it out. "Prob will use a similar method to encode something into our next release."

## Glimmer, a voyage across the sea

July 29, 2022. 0.031777 BTC, for the single Glimmer. Same trick as before: the flag on the treasure hunt page links an xpub on CoinTracker. Its first receiving address, native SegWit, holds the coins. The xpub also gives away the public key, so the record has one without a single spend.

This time it's a psychedelic journey across the sea. "The treasure is buried with riddles, cyphers, analogies and references to historical events or epic nautical stories." The key checker winks at returning players: "enter first word of key... just like last time ;)".

### The shortcut sentence, copied word for word

The rainbow road paragraph is back on the Glimmer page. Same N64 shortcut, same "baby steps that lead to one giant leap". The band said it would encode something the same way in the next release. Was that a promise or a joke?

### What's still open in Glimmer

Everything past the pages. The words, the password, the shortcut. The record keeps <dataset-count of="hints" puzzle="smith-lyle-moore/glimmer">

</dataset-count>

 hints, each from the band's pages with a Wayback capture beside it. As of October 2026, the 0.031777 BTC hasn't moved since it landed.

## What the records carry

```ts [src/collections/smith-lyle-moore/born-to-be-wild.ts]
key: seed(
  "fortune all man kind one giant step into digital tomorrow virtual moon",
  "m/84'/0'/0'/0/0",
  "supernova",
).xpub("xpub6CdP…NvABg"),
stages: [/* the album cover, the museum, the vault, the gateway, the final attraction */],
```

Every stage carries its password as a published answer, quoted from the write-up. The cover is pinned by SHA-256, with the band's own URL and a 2021 Wayback capture that serve the same bytes. Glimmer keeps the xpub, the path and the pubkey. No words. Yet.

## The Smith, Lyle & Moore puzzle records

<collection-puzzles collection="smith-lyle-moore">

</collection-puzzles>

## OCP: машинные данные (puzzles.json, 16.10.2026)

Структурированные данные из `puzzles.json` репозитория [open-crypto-puzzles](https://github.com/floflo777/open-crypto-puzzles) (snapshot OCP: 2026-08-16; цены: {'date': '2026-08-16', 'BTC': 63000, 'ETH': 1880, 'AR': 1.81, 'LTC': 54}).

- `slug`: smith-lyle-moore-hunt-2-0-032btc
- `title`: Smith, Lyle & Moore Hunt #2: Glimmer
- `status`: **open**
- `tier`: mid | `chain`: bitcoin
- `series`: None
- `author`: Smith, Lyle & Moore | site:smithlylemoore.com
- `prize`: 0.031777 BTC (оценка $2002 на 2026-08-16) — 3,177,700 sats, funded in a single transaction on 2022-07-29, unspent
- `published`: 2022-07-29 https://www.smithlylemoore.com/treasure-hunt
- `puzzle_type`: bip39-seed, password-pages, web-tree
- `target_format`: BIP39 12 words, English wordlist, plus a passphrase, BIP84 m/84'/0'/0'/0/0, P2WPKH
- `difficulty_left`: insight
- `difficulty_note`: the 12 words and passphrase are locked behind 3 password-gated pages, each requiring a specific author-intended answer to a riddle rather than a decodable cipher; about 5,000 candidates have been tried across the 3 locks with 0 hits, none of them a certified exhaustive negative
- `tested_total`: {'candidates': 5000, 'families': 6, 'certified': False}

**Адреса и проверенное состояние:**
- `bc1q0akdjvrc2csau2n3gyxa3xcq0fss852x997m9y` — escrow | main | ожидается: 3177700 sats | проверено 2026-08-16: **funded-unspent**
  - https://mempool.space/address/bc1q0akdjvrc2csau2n3gyxa3xcq0fss852x997m9y
- `bc1qax0hsnwnxl7393awtc3hsy0ftm6tg4tyk2nfja` — payout | my wallet (destination if solved) | ожидается: n/a | проверено 2026-08-16: **unknown**
  - https://mempool.space/address/bc1qax0hsnwnxl7393awtc3hsy0ftm6tg4tyk2nfja

**Деривация:**
- 12 BIP39 words plus a passphrase, scattered across 3 password-gated web pages, derived along BIP84 to a P2WPKH address matching the escrow; the author separately published the account xpub
- оракул: `tools/oracle.py` | сертифицирован: True
- сверено с: the published account xpub, whose m/0/0 P2WPKH address equals the escrow; a known-wrong BIP39 test vector is also confirmed to produce NO MATCH. The BIP39-mnemonic-to-seed leg has no known-good vector, since 0 of 12 words are held

**Зацепки (OCP `leads`):**
  - title: retry the West lock in Title Case | status: open
  - title: retry the East lock on the exact Gandalf 'journey doesn't end here' phrasing | status: open
  - title: reverse image search the LifeFlashBeforeEyes.mp4 clip stills | status: open
  - title: a fresh reading of the South lock's own slug pun | status: open

**Материалы третьих лиц:**
- no Wix page mirrors, no audio/video files, no Instagram media shipped; only 3 short verbatim riddle quotes (about 220 words total) with the site URL, and my own derived structure/pipeline data

**Источники (OCP `sources`):**
  - url: https://www.smithlylemoore.com/treasure-hunt | title: Smith, Lyle & Moore, Treasure Hunt page | date: 2022-07-29
  - url: https://stacker.news/items/658645 | title: Bitcoin Treasure Hunt - 2021 (still unsolved) | date: 2024-08-23
  - url: https://mempool.space/address/bc1q0akdjvrc2csau2n3gyxa3xcq0fss852x997m9y | title: Escrow address | date: 2026-08-16


---
## Обновление (2026-10-17, ~04:00, Qoder) — импорт dsh-сессии: прогоны двух замков у Wix-оракула (надежные минусы), разбор jetkc, статус «что слать авторам»

- **Тип**: новые артефакты + серия надёжных отрицательных результатов (закрытие гипотезы переиспользования паролей) + структурный вывод + ответ на вопрос «что присылать авторам».
- **Источник**: экспорт сессии `dsh-session-session-7accc1d0-67bc-41f8-8655-75994fadb6e2.zip` (DeepSeek Harness, ночь 16→17.10, 22:00–00:32 МСК) + `GLIMMER_HANDOFF.txt` (state 17.10 00:00 МСК, от параллельного агента-охотника из /workspace/work/glimmer/). Оба файла — в `data/`.
- **Методика прогонов** (важно, отличие от прежних попыток): оракул Wix `resolve_protected_page_urls` вызывался СТРОГО последовательно (~0.6 c/запрос), HTTP 429/5xx повторялись с бэкоффом, ошибки отделены от «неверный пароль» (403). Раньше 429 молча считался «мимо» — поэтому гипотеза переиспользования считалась непроверенной. Теперь — проверена по-настоящему.
- **Батч 1 (381 запрос, 0 ошибок)**: 127 кандидатов = все известные пароли сайта + пароли Hunt #1 + слаг/имя-файловые идеи + канон Gilligan — по трём замкам `zhgsm`/`jcl9c`/`y6cd1` → **0 хитов**. Гипотеза «замки открываются известным паролем (777/666/Hunt #1)» **закрыта**.
- **Батч 2 (220 запросов, 70 реально новых строк)**: 18 дат знаменитых пожаров (MMDDYYYY+DDMMYYYY: `11281942` Cocoanut Grove, `02091666` Лондон, `10081871` Чикаго, `03251911` Triangle, `05061937` Hindenburg…), каламбур `cocoanutgrove`/`coconutgrove`, семейство `64` (`coconut64`, `palm64`, `island64`, `gilligan64`, `minnow64`, `skipper64`, `hut64`, `beach64`, `desertedisland64`, `beacon64`, `campfire64`, `signal64`, `smokesignal64`, `sos64`), leap/shortcut-семейство (`babysteps`, `giantleap`, `shortcut`, `rainbowroad`, `n64`), Gilligan-канон (`Howell`, `Hinkley`, `Grumby`) → **0**.
- **Батч 3 (104 запроса, 52 новых)**: трассы Mario Kart 64 (обоснование — мотив N64/rainbow road дал `north64/east64/south64/west64`), даты реальных спасений (Титаник, «Эндьюранс», «Аполлон-13», Miracle on the Hudson), литеральные семейства `palmhut`/`alert`/`passingship` → **0**.
- **Разбор `jetkc` (Tropical Island) на полную глубину** (page JSON, 267 строковых полей; отчёт `data/jetkc_report.txt`, JSON `data/jetkc_page.json`): 0 скрытых компонентов из 23; мобильного эксклюзивного текста нет (`mobile_hints` — служебный компонент Wix); медиа только `desertedisland.gif` (уже пробовался); исходящие ссылки ровно три: `#zhgsm`, `#jcl9c`, `#udr8x`; SEO `pageUriSEO=hereonnnnngiligansissssssland`.
- **Структурный вывод**: единственный родитель обоих замков — `jetkc`, и у него **нет строки `password:`** (в отличие от почти всех прочих родителей) и **нет медиа-подсказки** (привычка «ответ = имя файла»). Значит raft/fire — **единственные два замка «чистого вывода»** на сайте; >2600 строк уже испробовано, и печатной подсказки, судя по всему, не существует. Косвенно: в Reddit `Jamal5403` заявлял, что у него есть оба пароля («one leads to a dead end»), а третий выход jetkc уже ведёт в `udr8x` Death (777) — т.е. явный тупик помечен, raft/fire формально «живые».
- **Что нужно прислать авторам (дословно с сайта, страница gkfxt)**: кому — `codebreaker@smithlylemoore.com`; тема предзаполнена — «I've Found Amphitrite, and All 12 Words»; тело — сами 12 слов. Текст: «Once you have all 12 words, click below and email them to us, for the final step». После письма группа отвечает финальным шагом (паттерн Hunt #1: passphrase пришла именно в ответе — последнее слово невыпущенной песни «supernova»). ⚠ `smithlylemoore.codebreaker@proton.me` — фейк/скам; настоящий адрес — только кнопка на `/glimmer` (по данным сообщества, он активен, сентябрь 2026).
- **Чего не хватает для письма**: 12-е слово (есть 11: `when you depart find mystery discover music need love fortune safe`; порядок 1–9 конфликтует в самом сайте — бутылка /litter метит 1–5, /take-a-big-breath метит 5–8) и passphrase (приходит только в ответе). Замечание сессии: слово `smoke` входит в checksum-валидные наборы 12-го слова (125–128 слов) — оба незакрытых замка тематически про дым/огонь; проверить при появлении порядка.
- **Оффлайн-минусы (из handoff, §1)**: 5 порядков × 15 248 пассфраз — 0; любой оффлайн-чек без passphrase малоинформативен.
- **Файлы в `data/`**: `GLIMMER_HANDOFF_2026-10-17.txt` (3603 строки: карта сайта с паролями, код оракула §6, полный список ~2500 испробованных строк §8, оффлайн-минусы §1, DEEPSCAN, тактика), `glimmer_probe.py` / `glimmer_batch2.py` / `glimmer_batch3.py` + логи, `glimmer_gap.py`, `jetkc_deep.py` / `jetkc_hidden.py`, `glimmer_dsh_reports_2026-10-17.md` (дайджест отчётов сессии).
- **Источники**: https://www.smithlylemoore.com/ (Wix; metaSiteId `13cab6fc-e004-4514-aab0-a7cf702047f9`, siteId `b8aa9fe0-61db-4696-8909-9dd877606aa4`); экспорт dsh-сессии (zip в Downloads); `GLIMMER_HANDOFF.txt`.

## Обновление 2026-10-17, 14:19 — Stage 1 (Qoder): точный минус по пустой пассфразе
- Оракул сертифицирован: эталон BIP84 (`abandon ×11 about` → `bc1qcr8te4kr609gcawutmrza0j4xv80jy8z306fyu`), account xpub m/84'/0'/0' совпал с bip_utils, /0/1 = донат-адрес, /0/0 = целевой.
- Прогон по `GLIMMER_BRUTEFORCE_GUIDE.txt`: HEAD «when you depart find» в 1–4; позиции 5–12 — все перестановки {mystery, discover, music, need, love, fortune, safe, X}, X ∈ все 2048; **пустая passphrase**.
- Покрытие: 82 575 360 сырых, **5 157 251** чексумм-валидных мнемоник, 32/32 блока, 1660 с. **Совпадений 0** → `FOUND_stage1.txt` не создан.
- Следствие: при таком порядке первых четырёх слов решения с пустой пассфразой нет ни для одного 12-го слова и ни для одного порядка остальных семи. Остаются: иной порядок первых четырёх (вариант 1b), непустая passphrase (Stage 2) или и то и другое.
- Эскроу не тронут (mempool.space 14:16: funded 3 177 700, spent 0, tx 1). Артефакты: `data/glimmer_stage1.py`, `data/stage1_run.log`, `data/stage1_blocks/`, `data/bip39.txt`.

## Обновление GitHub-интейка (2026-10-18, Qoder)
- GitHub-интейк: **partial** (2026-10-18) — срезано потолками: собрано 4 кандидатов из 9 (--max-repos/--max-mb); остаток в `data/github/resume.json` репо: 4; путь дайдеста: `data/github/GITHUB_INTAKE.md`


## Обновление 2026-10-18, 15:57 UTC — Qoder: H2e (медиа) + H2f (сверка чужой модели)
- YouTube-клип `Born to Be Wild` (`XwXfJXdVSYQ`) скачан в `data/media/` (видео/аудио/субтитры/info.json, sha256 в LOG). Описание: «All footage… from NASA. Find where, explorer»; концовка цитирует звонок Никсона Apollo 11. Новых слов Hunt #2 не даёт.
- Wix-хосты, reddit, stacker.news недоступны (HTTP 000) — mp3 Glimmer и оракул паролей не запускались.
- Досье `benjacasas02/.../research/glimmer` проверено: адрес Hunt #1 в нём напечатан с ошибкой (невалидный bech32); верный — `bc1qgtymp8q7hw2k9tewhdq74vdlpkqhflgju69n95` (on-chain 2 500 000 сат, swept). Модель досье (whale-слова + virtual moon) × 193 passphrase (вкл. пустую/Amphitrite) × 301 080 наборов → **0** (`data/glimmer_h2f_reconcile.py`, `data/H2F_NEGATIVE.txt`).
- Актуальные блокеры без изменений: 12-е слово и passphrase; письмо автору — только с ОК Ильи.


## H2h: BIP39-свип y6cd1 закрыт (2026-10-19, Qoder)
- Все 2048 слов стандартного BIP39 проверены на `y6cd1` (pirate-battle): **0 HIT, 0 ERR** (28 прежних ERR перепроверены отдельно, все NO). Гипотеза «пароль — слово BIP39» закрыта; `data/h2h_state.json` = next 2048/2048. Подробности — `LOG.md` 2026-10-19, лог `data/h2h_retry_y6cd1.log`.
