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
