# EXTERNAL_DIGEST.md — сводка внешнего сбора по 9vw04 (Qoder, 2026-10-18)

Формат: источник → URL/файл → что дали. Пустые результаты перечислены явно,
чтобы будущие агенты не повторяли. Всё собрано read-only; приватных ключей нет.

## GitHub

- Поиск репо/кода (`GemfinderOfX`, `9vw04`, `gem finder puzzle`, `WIF puzzle grid`,
  issue-search) через api.github.com, 2026-10-18. **Сторонних solver-репозиториев с
  рабочим перебором — 0.** Найденное:
  - `canalqb-puzzle` (бразильский блог-проект) → `data/external/github/canalqb-puzzle/`.
    Ценное: независимая **ручная транскрипция сетки** (21×50) в `puzzle_decoder.py`
    → `data/external/canalqb_grid_transcription.txt`; их jpeg картинки — sha256
    совпадает с нашим puzzle_wayback.jpg; `mask_debug.jpg` (HSV-маска красных
    «радужных» клеток). Их вывод: César/BSGS — самодеятельность, результата не дали.
  - `agntn/puzzles` (реестр) → `data/external/github/agntn/`: `src/collections/9vw04.ts`
    (идентичен локальной карточке), 11 транскриптов постов автора
    `assets/sources/9vw04/gemfinderofx-*.md` + скриншоты, `docs/content` карточка,
    `assets/9vw04/puzzle.jpg` (sha256 совпал).
- GitHub issues (поиск + API): OCP `#32`, `#33` (GemfinderOfX-треды: кто что пробовал,
  «не решено», новых идей нет) → `data/external/github_issues/community_issues.json`;
  agntn `#529`, `#537` (заведение карточки). `gh_search_*.json` — сырые ответы.
  Code-search по коду — требует токен (лимит 60 req/ч), не выполнялся.

## X / Twitter

- syndication.twitter.com (`cdn.syndication.twimg.com/tweet-result`, token=a) —
  13 твитов verbatim (анонс-тред, все reply-хинты, пост 01.03.2026, посты-упоминания)
  → `data/external/x/tweet_*.json`. **Новых хинтов после 01.03.2026 нет.**
  В тред-рич-тексте хинтов больше нет, чем 15 в карточке agntn.
- Профиль @GemfinderOfX просмотрен браузером (browser-use): лента 12.2024–10.2026 —
  активность есть, целепосвящённых пазлу постов после марта 2026 не видно.
- Пост 01.03.2026 (skip cipher): приложен **GIF «Geometry Math GIF»** (спираль/диагонали,
  498×498) → `data/external/x/mar2026_skipcipher_spiral.mp4` + постер-кадр. Это иллюстрация
  идеи «каждый N-й»/маршрута — учтено в осях H1/H3.
- Картинка сетки `?name=orig`: sha256 `bbcc8759…adadb4` = локальный файл. Совпадение подтверждено.

## Реестр / wayback

- Живой `puzzles.agntn.dev/collections/9vw04` (2026-10-18) = локальной карточке, новых полей нет.
- Wayback CDX: снапшоты треда — только твит 01.03.2026 заархивирован целиком
  (`data/external/wayback/mar2026_hint_snapshot.html`); снап пазл-картинки 2025-03-03
  (`puzzle_snapshot_20250303.jpg`, sha256 совпал). Остальные CDX-выгрузки пусты.

## Форумы / видео

- bitcointalk: поиск требует регистрации («Only registered members») — **закрыто**.
- reddit JSON: HTTP 403 (blocked) — **закрыто**. WebSearch по `GemfinderOfX`/адресу —
  упоминаний, отличных от X/canalqb, не найдено.
- canalqb.blogspot (пост о GemFinder) → `data/external/forums/canalqb_gemfinder_post.txt`
  и `canalqb_gemfinder_analysis.txt` (20 901 симв., скептический разбор: suspected
  «невозможность» пазла, транскрипция сетки).
- YouTube `ZVqCO1ZCHus` (canalqb) — без субтитров, разбора не дали. `yt_*.html` — сырьё.

## On-chain (blockstream.info; mempool.space на машине недоступен)

- Адрес приза: история = 4 транзакции как в карточке; баланс 2 020 760 сат (проверен 18.10).
- Траты 2021–2024 (`data/external/onchain_txs_parsed.json`, разбор сырых tx):
  witness-входы используют pubkey **039d7ce8… (compressed)** ⇒ целевой ключ —
  **compressed WIF, 52 символа, префикс K/L**. Это фиксирует длину окна всех переборов.
- Сестринские P2PKH траты того же ключа → `sister_p2pkh_txs.json` (подтверждение формата).

## Итог для решения

1. Единственный внешний независимый прочит сетки — canalqb; сверен с нашим OCR,
   расхождения 29 клеток разрешены шаблонами/цветом → `data/grid_ocr5.json`.
2. Закрытых сторонними solver-осей реально нет (никто не публиковал перебор).
3. Формат цели (52, compressed, K/L) подтверждён ончейн, а не только хинтами «WIF».


---

# Поиск разборов v2 (Qoder, 2026-10-18, `data/external2/`)

Режим: искать СТОРОННИЕ разборы (не перебирать заново). Формат как выше: источник → файл → что дал.

## Что дали новые поверхности

1. **CanalQb, пост 09.2026 (обновлённый, не тот, что в v1)** → `forums/canalqb_gemfinder_2026-09.{html,txt}`.
   przekывает X-реплай некоего **Mixas**: «The number of 0 in the table is 52, like the WIF» и трактовку
   «нули = 52 якоря извлечения, шаг задаёт 9vw04», плюс трактовку «Daniel Shanks / не люблю rainbows» как
   BSGS-указание и «spelling is incorrect on purpose» → «a **imagine** of Daniel shanks» (намеренная ошибка =
   визуальный индекс). Проверено на нашей финальной сетке: цифровых нулей в `grid_ocr5` **ровно 52**
   (у OCR-сырья canalqb — 72 из-за подмены O→0). Но 525 цифр / 10 ≈ 52.5, т.е. это и ожидаемая частота,
   а распределение нулей выглядит случайным (2–3 в строке, гэпы 10–34). Ось H7 (нули как якоря,
   смещения/гэпы/цвета, 306 кандидатов) → **0 валидных WIF**.
2. **bitcoinpuzzles.io, альянс «Desafio 9vw04»** → `forums/bitcoinpuzzles_io_9vw04.html`. Страница пазла
   публична (2749 знаков текста, ссылки на первоисточники + список «сторонних разборов» = тот же
   KryoTutorias и canalqb). Главное: **37 участников, чат живой (последнее сообщение ~16 дней назад)**,
   доступ только участникам → пункт 2 списка на скачку.
3. **YouTube KryoTutorias `ZVqCO1ZCHus`** (ссылку в тредe автора дал @mattofdoors, найдено через fxtwitter) —
   португальский обзор пазла, **субтитров нет** (`captionsTracks` пуст) → пункт 5 списка на скачку (аудио под
   локальную транскрипцию).
4. **fxtwitter как обход логина X** → `x2/fx_*.json`, `x2/burst/`, `x2/timeline/`. Даёт полный текст и число
   ответов по любому статусу, но НЕ даёт сами реплаи (92/20/15/4) → пункт 1 списка на скачку.
   Побочно: полный текст хинта 13.01.2025 = «…and trust me that's very **important here**» (у нас был обрезан
   — содержательно ничего нового); ник автора до переименования — **@IrrationalLibs** (URL медиа анонса).
5. **Лента автора после 01.03.2026 → новых хинтов НЕТ** → `x2/TIMELINE_NOTE.md`. Via Wayback CDX
   (`misc/wayback/ids_all.txt`, 766 status id) + fxtwitter: февраль–июль 2026 = мемкоин-щит
   (`$Rock`, `$Cwif`, `cash-cat`, рефералка polymarket.us/8026), 40+ постов за 7 часов; последний
   содержательный пост по пазлу — 01.03.2026 (skip-cipher). Профиль: joined 01.2022, 2 329 фолловеров.
6. **Reddit (pullpush)** → `reddit/INDEX.md`: по всем запросам (9vw04 / GemfinderOfX / адрес / irrationallibs)
   только уже известный тред r/Bitcoin `1hj1v0g` (7 комментов, по сути пусто). Wayback-снап треда
   (`reddit/wayback/snap_1hj1v0g_20250803.html`) новых комментариев не добавил.
7. **GitHub глубже** → `github2/`: issue-search по всей платформе = 3 хита (OCP #32, OCP #33, agntn PR #537);
   комментарии OCP #32 выгружены (`github2/ocp_issue_32_comments.json`): автор темы `deviceio121` пишет, что
   потратил «4–5 дней и упёрся в блокеры», публичных репозиториев у него **0** → его работа недоступна.
   `agntn/puzzles` #529/#537 — только боты-ревьюеры, человеческих разборов нет.
8. **GitLab/Bitbucket/lobste.rs/DG** → `misc/`: `gitlab.com/zyphra/gemfinder` — пустой шаблонный репо
   (1 README, 01.2026), к пазлу не относится; остальное 0/мусор (NATO CAGE 9VW04, инстаграм-ник @9vw04).

## Проверено и пусто (не повторять)

`bitcointalk.org` — DNS не резолвится с этой машины, а в браузере страница поиска требует логин
(`forums/BT_NOTE.md`) → только ручными запросами из списка на скачку; DDG `site:bitcointalk.org` по 9vw04/
GemfinderOfX/адресу = 0. 4chan-архивы (b4k.co, desuarchive) — Cloudflare. nitter/sotwe/twstalker — мертвы
или под Cloudflare. YouTube-поиск «9vw04 bitcoin puzzle» = «результатов не найдено». GitHub: repo/gist/user/
issue-поиск исчерпан (code-search — только с токеном, пункт 4).

## Итог v2 для решения

Стороннего правила «сетка → WIF» в открытых источниках НЕТ: все найденные разборы (canalqb, KryoTutorias,
OCP-треды, r/Bitcoin) пересказывают хинты и честно признаются, что результата нет. Единственный инсайт,
который можно проверить — «52 нуля как якоря» (H7, закрыт негативом за 0.2 с). Поведенка автора (щит-лента,
рефералки, 10+ месяцев без движения приза) усиливает версию «пазл без детерминированного решения», поэтому
приоритет дальше — не новые оси, а чужой разбор из логин-гейтов (X-реплаи и чат bitcoinpuzzles.io).

Дополнение (итог параллельного агента, 12:4x): `imgur.com/9vw04` проверен визуально — картинка Minecraft-Стива
с мечом, red herring (`misc/img_9vw04.png`); Telegram `t.me/s/canalqb` — коннект-таймаут; Medium/Mojeek — 403;
Bing — спам-выдача; Wayback по анонсу 1870319691295764655 — не архивирован. Полнота: `misc/MISC_FINDINGS.md`,
`reddit/INDEX.md`, `forums/BT_NOTE.md`.
