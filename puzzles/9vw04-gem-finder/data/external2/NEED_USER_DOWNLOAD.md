# NEED_USER_DOWNLOAD — 9vw04 (что недоступно агенту, но доступно тебе)

Дата: 2026-10-18. Формат: **куда сохранить → что именно нужно → зачем**.
Кладём в `puzzles/9vw04-gem-finder/data/external2/<подпапка>/`, рядом можно кинуть `.md`-заметку «что это».
Приватные ключи/сиды в репозиторий не писать (правило №4 базы).

## 1. X: реплаи анонса и хинт-тредов (нужен твой залогиненный аккаунт) — в `x2/replies/`

Анонимный просмотр показывает только 4 self-реплая автора; ответы (92 + 20 + 15 + 4) закрыты логином,
зеркала (nitter, sotwe, twstalker) лежат под Cloudflare/DNS. Именно там живёт цитируемый разбор:

- `https://x.com/GemfinderOfX/status/1870319691295764655` — **все 92 ответа**, по возможности с ветками.
  Искать в первую очередь: реплай **Mixas** со словами «The number of 0 in the table is 52, like the WIF»
  (оттуда же — как он считал нули и что предлагал делать с «прыжком» от них), и любые «I tried / my analysis /
  grid read» с транскрипцией сетки.
- `https://x.com/GemfinderOfX/status/1878634169410203733` (20 ответов) и `.../1878635172754788512` (4) —
  там обсуждение хинтов про WIF/ранчуги/«spelling is incorrect on purpose»; важен текст ответов автора
  (он иногда уточняет хинт именно в ответах).
- `https://x.com/GemfinderOfX/status/2027938957112279215` (15 ответов, 01.03.2026) — самый свежий хинт
  «Every Nth character … fixed interval skip cipher»; в ответах могут быть уточнения автора.
- Треды/ветки самих сольверов: `https://x.com/canvitis`, `https://x.com/mattofdoors`,
  `https://x.com/Whogundoit`, `https://x.com/world73413383`, `https://x.com/Iwant1BTC`, `https://x.com/Aureli0Sant0s`.
- Поиск в X ( залогиненном ) по запросам: `9vw04`, `GemfinderOfX`, `bc1qr5mssp6snmduqp9enx4dzmcxvk7qw83lceyy2v`,
  `from:GemfinderOfX grid`, `min_faves:5 9vw04`.

Что сохранять: скриншот + расшифровка текста (можно просто copy/paste в `.txt`, имя файла = id твита).
Полезно: `https://x.com/i/bookmarks`/«Экспорт данных» настроек аккаунта не нужен — хватит скринов/текста.

## 2. bitcoinpuzzles.io — альянс «Desafio 9vw04» (37 участников, последнее сообщение ~16 дней назад) — в `forums/`

`https://bitcoinpuzzles.io/en/puzzles/aliancas/7` — страница открылась (сохранена:
`forums/bitcoinpuzzles_io_9vw04.html`), но **чат только для участников** («Log in to accept the invitation»).
Нужно: зарегистрироваться/войти, принять приглашение в альянс 7, выгрузить переписку (скрины или copy/paste).
Зачем: это единственный найденный живой коллектив, разбирающий именно этот пазл; там же список
«analise de terceiros» (KryoTutorias + canalqb) и, судя по составу, бразильская ветка сольверов.
Дополнительно полезные страницы сайта (если открываются только под логином):
`https://bitcoinpuzzles.io/en/challenges` (там карточка 9vw04 может иметь статус/комменты),
`https://bitcoinpuzzles.io/en/puzzles/aliancas` (список альянсов), раздел «Suggestions».

## 3. bitcointalk — поиск под аккаунтом (и DNS, и search2 закрыты) — в `forums/`

С этой машины `bitcointalk.org` не резолвится (DNS), а в браузере страница поиска требует логин.
Нужны результаты четырёх запросов (GET-формат, классика форума):

- `https://bitcointalk.org/index.php?action=search2;search=9vw04`
- `https://bitcointalk.org/index.php?action=search2;search=%22gem+finder%22+puzzle`
- `https://bitcointalk.org/index.php?action=search2;search=bc1qr5mssp6snmduqp9enx4dzmcxvk7qw83lceyy2v`
- `https://bitcointalk.org/index.php?action=search2;search=irrationallibs` (старый ник автора; найден через Wayback)

Если что-то найдётся — сохранить страницы тредов (`...;topic=<n>.0`, `.next`) целиком.

## 4. GitHub code-search (разовый токен) — в `github2/code/`

Публичный поиск репо/issues/гистов исчерпан (0 сторонних solver-репозиториев). Остался **поиск по коду** —
он требует авторизации, поэтому агентом не выполнялся. Если готов дать токен с минимальным скоупом
(пустой `public_repo`, только read) — прогоню ОДИН раз, токен только в переменную окружения процесса,
на диск/в git не попадает (правило №4), после прогона токен можно отозвать.

Запросы: `9vw04`, `GemfinderOfX`, `bc1qr5mssp6snmduqp9enx4dzmcxvk7qw83lceyy2v`, `039d7ce87733444acfde3396`,
`"9vw04" path:*.py`, `"Everything for the private key"`.
Альтернатива без токена: ручная выдача на `https://github.com/search?type=code&q=<запрос>` (скрины/список
репозиториев) → в `github2/code/`.

## 5. YouTube без субтитров (для локальной транскрипции) — в `misc/youtube/`

`https://www.youtube.com/watch?v=ZVqCO1ZCHus` — KryoTutorias, «BITCOIN PUZZLE 2025: NOVO DESAFIO VALENDO
0,02 BITCOIN» (порт.). Ссылку дал @mattofdoors в треде автора. Субтитров у видео НЕТ
(`captionsTracks` пуст), транскрибировать агенту нечем → нужно забрать аудио:
`yt-dlp -x --audio-format m4a https://www.youtube.com/watch?v=ZVqCO1ZCHus`
(или любой даунлоадер) → файл в `misc/youtube/`, дальше разберём локальным ASR, если поднимем.

## 6. 4chan-архивы (Cloudflare-челлендж) — в `forums/`

`https://b4k.co/search/?text=9vw04&boards=b` и `https://desuarchive.org/?text=9vw04`,
а также по `gem+finder+bitcoin` — с этой машины оба за Cloudflare. Нужны скрины выдачи/номера постов.

## 7. Что НЕ нужно скачивать (проверено, пусто)

Чтобы не тратить время: DDG `site:bitcointalk.org "9vw04"` = 0; DDG `"9vw04" -x.com -twitter.com` = только
мусор (NATO CAGE-код 9VW04, инстаграм-ник); YouTube «9vw04 bitcoin puzzle» = «результатов не найдено»;
GitLab/Bitbucket `9vw04` = пусто (`misc/gitlab_9vw04.json`, `misc/bitbucket_9vw04.json`; найденный
`gitlab.com/zyphra/gemfinder` — пустой шаблонный репо без связи с пазлом); lobste.rs `9vw04` = 0;
pullpush.io Reddit = только тред r/Bitcoin `1hj1v0g` (7 комментариев, по сути пусто — `reddit/INDEX.md`);
Wayback CDX по `x.com/IrrationalLibs` = 3 снапа, по ленте `GemfinderOfX` = 766 id, все — мемкоин-щит
после 01.03.2026 (см. `x2/TIMELINE_NOTE.md`).
