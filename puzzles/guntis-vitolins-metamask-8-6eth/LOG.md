# LOG.md — журнал «guntis-vitolins-metamask-8-6eth»

> Формат ведения: см. `../../AGENT_INSTRUCTIONS.md`. Записи добавляются в конец; чужое не затирать.

## 2026-10-17, 18:48 — AutoClaw (модель zai_glm-5.3-flash, среда AutoClaw/Windows, проект «Default»)
- Бэкфилл: заведение журнала по протоколу (папка существовала с досье от 16.10.2026, LOG.md не был заведён).
- Тип объекта: пазл. Состояние папки: README 21403 байт (обогащённое досье), файлов 1, data/=нет, tools/=нет.
- Кратко из README: статус open; приз 8.612541554256945 ETH (USD 16192); типы bip39-seed, word-selection, video-series; остаток-сложность bounded-compute.
- Адрес/эскроу: n/a
- Источники: https://www.youtube.com/watch?v=w4mpiuBP_aY
- Вся история и досье — в README.md этой папки; новые сессии описывать здесь (self-intro, что делал, результаты вкл. отрицательные, артефакты, ссылки).

## 2026-10-17 18:51 — Big Pickle (big-pickle / OpenCode, Windows) — сбор данных в пустую папку
- Делал: массовый обход README → источники; попыток 7, сохранено 6 в `data/`.
- Успех (6): 00_README.md; 01_leads.md; 02_tested.md; 03_open-crypto-puzzles.html; 04_README.md; 05_mineshop.html
- Отказ (1): https://mineshop.eu/2020/02/12/crypto-pumping-hardcore-research-portfo [FAIL: HTTP Error 403: Forbidden | jina: ]
- Артефакты: `data/SOURCES.md` + скачанные файлы.
- Проверено: да (HTTP-статус/байты); содержательная разборка — следующим шагом.

## 2026-10-17, ~19:20 — Big Pickle (big-pickle / OpenCode, Windows) — обогащение: свежее состояние сообщества (OCP issues) + восстановление 2020-поверхностей
- Делал (бронь взята: `claims.py acquire guntis-vitolins-metamask-8-6eth`):
  1. Тянул внешние поверхности и данные сообщества скриптами в `tools/` (все ответы сохранены в `data/`):
     - `fetch_surfaces.py` → OCP README/leads/tested + `reading-order-pool.json` + `video-onscreen-words.json` (все 200 OK).
     - `fetch_mirrors.py` → Wayback-страница видео 2020 (200, 315 686 Б); Piped 403, Invidious SSL ERR, `www.youtube.com` — DNS-блок.
     - `fetch_community.py` → GitHub API: 39 свежих issues + issues #18/#38 (тело+комменты) + Wayback CDX.
     - `fetch_issue38_attach.py` → 3 вложения issue #38.
  2. Восстановил **полное описание/теги/заголовок challenge-видео** из Wayback 2020-06-26 (`tools/analyze_2020_surfaces.py`): описание 1402 симв., теги `[mining rig, mining hardware, guntis vitolins, bitcoin, ethereum, top altcoins, altseason, portfolio, altcoins for 2020, bitcoin generator]`, channelId `UCkYCnjVcFJDN6Cp_uP0pv_A`. Сверил каждое BIP39-слово с пулом OCP.
- Результат (включая отрицательные):
  - **Видео-сторона «перечитана»: новых BIP39-слов нет.** Расхождение с пулом только у слов ПОСЛЕ parrot (can, sing, song, then, goat) и служебных (make, sure, favorite, already) — они вне модели (позиции >12 при порядке чтения). Значит, лид «перечитать метаданные видео» для письменной видео-стороны закрыт (пул OCP полон).
  - **Свежайшие негативы сообщества** (не было в папке): issue #38 profesor1234 (4 free-order sweep'а ≈33,4 млрд, 0) + хинты 4/5 дословно + «Last hint» + «Youll need only written words» + «пул намеренно мал ~14 слов»; issue #13 (C1 18,66 млрд, 0); issue #14 (RO1 закрыт); issue #18 (экранный OCR: 122 слова, 109 вне пула). Полные данные — `data/community/`.
  - Правки записей: `top`/`finish` мис-сорсированы; `cloud` в 2020-поверхностях отсутствует; порядок чтения опровергнут.
  - Ограничение среды: `www.youtube.com` недоступен по DNS → скачать видео/кадры для расширения экранного пула я не могу (нет yt-dlp/ffmpeg в PATH).
- Артефакты: `tools/{fetch_surfaces,fetch_mirrors,extract_video_meta,analyze_2020_surfaces,fetch_community,parse_community,fetch_issue38_attach,print_issues}.py`; `data/mirror/wayback_video_2020.html`; `data/community/*` (issues JSON, вложения #38, selected_issues.txt); `data/ocp_reading_order_pool.json`, `data/ocp_video_onscreen_words.json`.
- Ссылки: https://github.com/floflo777/open-crypto-puzzles/issues/38 (и /10 /13 /14 /18); https://web.archive.org/web/20200626184951/https://www.youtube.com/watch?v=w4mpiuBP_aY
- Следующий шаг: без доступа к видео экранный лид недостижим; остались только GPU-оси (15 мин/прогон, аренда — с ОК Ильи). Либо ждать нового инсайта.

## 2026-10-17, ~19:40 — Big Pickle — попытка добыть видео (экранный лид): ОТРИЦАТЕЛЬНО, среда блокирует YouTube
- Цель: скачать `w4mpiuBP_aY` и прогнать EasyOCR по кадрам → расширить пул экранными словами (главный открытый лид, #18).
- Что пробовал (все — отрицательно):
  1. DNS: `www.youtube.com`/`youtube.com`/`ytimg.com` — `getaddrinfo failed`; НО `youtubei.googleapis.com` (172.217.114.4) и `googlevideo.com` резолвятся, `pypi.org` доступен.
  2. Поставил `yt-dlp` 2026.08.19 (`pip install`, OK). Запуск `yt-dlp --extractor-args "youtube:player_client=tv_embedded"` → **ошибка**: yt-dlp всё равно резолвит `www.youtube.com` (getaddrinfo failed). Не работает.
  3. Прямой Innertube API (`youtubei.googleapis.com/youtubei/v1/player`, клиенты ANDROID/WEB/IOS) → соединения **режутся** (`ConnectionResetError 10054` / ReadTimeout). Похоже на SNI/DPI-фильтр Google-API.
  4. Скан 18 зеркал Piped/Invidious (`tools/scan_mirrors.py`): только единицы резолвятся, но все отвечают 401/403/500/502 или SSL/таймаут. Рабочего зеркала нет.
  5. `r.jina.ai` по youtube-странице → 451. Wayback отдаёт только HTML 2020 (описание — уже снято).
- Вывод: **в текущей среде видео недостижимо**. Разблокировка требует внешнего действия: Илья скачивает `w4mpiuBP_aY` и кладёт файл в `data/` (тогда EasyOCR/cv2 дадут кадры), либо ОК на GPU-аренду.
- Артефакты: `tools/fetch_yt_innertube.py`, `tools/scan_mirrors.py`, `data/mirror/mirror_scan.txt`.

## 2026-10-17, ~20:55 — Big Pickle — BIP39-аудит письменных поверхностей + поздние снапшоты Wayback (ОТРИЦАТЕЛЬНО); экранный OCR невыполним на этой машине
- Делал:
  1. `tools/bip39_surface_audit.py` — прогон 5 «посаженных» фраз + правил описания + заголовка + тегов 2020 через словарь BIP39. Из 5 фраз ровно **28 BIP39-слов**; суммарно 43. **Новых сверх пула OCP нет** — письменные поверхности полны. Проверка словаря: `dutch/fog/parrot/fiber/fork/rib/goat/wood` ∈ BIP39; **`dark` ∉ BIP39**.
  2. `tools/dump_2020_description.py` → `data/2020_description_dump.txt`: полное описание видео (2020-06): заголовок / «Is Crypto Winter finished?» / **30 символов 🕳** / контакты (Skype/Facebook/Telegram). Счётчик «30 дыр» нигде в досье не отмечен — возможно декор. `tiny.cc/ouwjfz` → `heatedaffairs.com/go/p142055.subindex1585` (партнёрка, не поверхность).
  3. `tools/mine_later_snapshots.py` — **поздние снапшоты Wayback**: видео 2024-11-24 и 2026-09-22, пост 2023-03-24 и 2024-10-13. Новых посаженных слов НЕТ. В описании 2024 — только служебные (`make/sure/favorite/already`); в полном теле поста ~82 BIP39-слова, но это обычный текст статьи. CDX: у видео есть снапшоты 2024-09/11 и 2026-08/09, у поста — до 2024-10 (2026 = 404).
  4. `tools/ocr_frames.py`: **EasyOCR на 432 кадрах не работает** — процесс убивается без traceback (~4 ядра, до ~500 МБ; 9/432 кадров). Экранный канал независимо закрыт issue #18 (1 кадр/с, 122 слова, 109 вне пула; монеты atom/link/basic/token/dash).
- Результат: **письменная сторона исчерпана (со свидетелем)**, порядок чтения закрыт ранее. Блокер — идентификация слов/порядка. Остались: GPU-прогон 219 экранных слов (только с ОК Ильи) либо новые хинты автора.
- Артефакты: `tools/{bip39_surface_audit,dump_2020_description,mine_later_snapshots}.py`; `data/2020_description_dump.txt`; `data/later_*.html`; `data/later_snapshots_bip39.txt`; отчёт `reports/2026-10-17_2053_BigPickle_guntis-video-onscreen-audit.md`.

## 2026-10-17, ~22:05 (MSK) / 19:05 UTC — Big Pickle — сводный OCR 231 кадра (новые чтения UI, закладок нет) + запуск ограниченного свипа «монеты на экране»

- Делал:
  1. `tools/merge_ocr.py` — слил `data/ocr_frames.jsonl` + `data/ocr_part{A..D}.jsonl` (остатки убитых ранее 4 параллельных воркеров) в один дедуплицированный файл: **231 кадр** (было 83). Бэкап — `data/ocr_frames.backup.jsonl`; части оставлены на диске.
  2. `tools/analyze_ocr_screens.py` → `data/onscreen_bip39_words.json`: 231 кадр, **89 различных BIP39-слов**. Монетные слова на экране в моём чтении: **link, basic, token**. `atom` не засчитан из-за склейки с «)» (распознано «Cosmos (ATOMI», видно сырые токены кадров 96/100/150/151/152/156), `dash` не читается. Согласуется с issue #18 (atom/link/basic/token/dash).
  3. Контекст слов проверен по сырым токенам кадров: **7–19 с** — страница YouTube-канала (сайдбар: `panda` = канал «Red Panda Mining», а также `farm/coin/risk/popular`); **96–152 с** — таблица портфеля (Cosmos (ATOM), Chainlink (LINK), Basic Attention Token (BAT)); **326 с** — скриншот Etherscan по адресу приза; **370–380 с** — скриншот Google-поиска «ethereum wallet 12 word seed phrase» (UI-слова `seed/phrase/word/reveal/access/mask`, НЕ закладка); **69–100 с** — лендинг крипто-сервиса (`asset/profit/price/volume/…`).
  → **Новых ЗАКЛАДОК на экране нет**: 21 «новое» слово против issue #18 — это UI/сниппеты. Единственный содержательный экранный пласт — **монетная таблица** (atom/link/basic/token).
- Гипотеза свипа (записана ДО прогона; ось — инсайт автора «слова могут быть написаны на экране/в видео»):
  видео-сторона (6 слов) = `{fog, parrot}` (описание) + **4 монеты с экрана** из `{atom,link,basic,token,dash}`;
  пост-сторона (6 слов) = `{dutch,fiber,fork}` + 3 из постового пула (`round,cattle,forest,wood,only,because,there,like,rib,roast,dinner,fresh,season,market,top,update,winter,you,will,also`).
  Якоря: pos1=`dutch`, pos4=`fiber`, pos5=`fog`, pos12=`parrot`; свободные позиции `{2,3,6,7,8,9,10,11}` — 8! порядков/набор.
  Не покрыто прошлыми свипами: `sweep_coins` (RO1-модель + ОДНА свободная монета), `B-FRAMES` (free-order, но видео-пул добавлял только build/share/atom/link — **без basic/token**).
  Инструмент: `tools/sweep_coin_video.py` поверх `tools/fast_eth.py` (проверен 40/40 против bip_utils + канон точный; ~557 адр/с/ядро → ~3,2k/с на 16 ядрах). Шардинг 6×(~12,5 мин) под лимит ≤15 мин/прогон. Объём: 5700 наборов × 8! = 2,3e8 перестановок, 1/16 валидны → ~1,44e7 адресов.
- Результат: **см. следующий блок** (записывается по завершении; отрицательный результат — тоже свидетель).

## 2026-10-17, ~22:50 MSK / 19:50 UTC — Big Pickle — РЕЗУЛЬТАТ свипа «монеты на экране»: ОТРИЦАТЕЛЬНО (0), со свидетелем

- **Прогон завершён полностью**: 6 шардов (≤15 мин каждый), `tools/sweep_coin_video.py --shard k --of 6`. Все шарды 0 хитов.
- **Итоги (сырые строки в `data/sweep_coinvideo_all.log`):**
  - shard 0: arranged=38,304,000 checksum_valid=2,393,858 hits=0
  - shard 1: arranged=38,304,000 checksum_valid=2,393,181 hits=0
  - shard 2: arranged=38,304,000 checksum_valid=2,393,779 hits=0
  - shard 3: arranged=38,304,000 checksum_valid=2,396,697 hits=0
  - shard 4: arranged=38,304,000 checksum_valid=2,393,486 hits=0
  - shard 5: arranged=38,304,000 checksum_valid=2,395,930 hits=0
  - **Σ: arrangements=229,824,000; checksum_valid=14,366,931; hits=0.**
- **Свидетель корректности движка:** ожидание 229,824,000 / 16 = **14,364,000** валидных; получено **14,366,931** (прохождение **6.2514 %** против предсказанных 6.25 %). Отклонение +0.02 % — движок покрывает пространство ровно, «хвостовой гонки» нет (`imap_unordered` собирает все результаты).
- **Что закрыто этим результатом:** гипотеза «видео-сторона = `{fog, parrot}` + **4 монеты** из `{atom, link, basic, token, dash}`; пост-сторона = `{dutch, fiber, fork}` + 3 из постового пула (20 слов); свободный порядок 8 нефиксированных позиций (`{2,3,6,7,8,9,10,11}`)» — **полностью отрицательна**. Это был единственный неохваченный free-order угол: `sweep_coins` (RO1 + ОДНА свободная монета) и `B-FRAMES` (free-order, но видео-пул только `build/share/atom/link`, без `basic/token`).
- **Вывод по пазлу:** на CPU свободных, ещё не покрытых *инсайт-осей* у guntis не осталось. Открытые лиды требуют GPU/аренды (несколько монет с экрана × 219 экранных слов; connecting words; substrings of longer words) либо **новых хинтов автора** — по правилам Ильи аренда/траты только с его ОК.
- Артефакты: `tools/sweep_coin_video.py`, `tools/fast_eth.py`; `data/sweep_coinvideo_all.log`; отчёт `reports/2026-10-17_1905_BigPickle_guntis-onscreen-coins-sweep.md`.
- Ссылки/доказательства: приз перепроверен он-чейн `0x9C2F44EFAd0c1E852a09dF9939e6DaF061140CaF` = 8.61254155426562 ETH (rpc `1rpc.io/eth`, 17.10 ~22:30 MSK).
