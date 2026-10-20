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

## 2026-10-18, 09:52 — OCP Sync (Qoder Desktop, Windows) <!-- ocp-snapshot:19644e58 -->
- Делал: обогащение из внешнего репозитория [open-crypto-puzzles](https://github.com/floflo777/open-crypto-puzzles) — раскладка дельты снапшота `19644e58` (клон `_sources/ocp/`, реестр `_sources/OCP_SNAPSHOT.md`). Протокол: `claims acquire/heartbeat/release` по `guntis-vitolins-metamask-8-6eth`. Прогонов/переборов не запускали, статус пазла и балансы не меняли, чужие файлы не перезатёрты (копии лежат отдельными деревами `data/ocp/` и `tools/ocp/` с provenance).
- Результат: перенесено 4 файлов данных → `data/ocp/`, 6 кода → `tools/ocp/`,0 тяжёлых (>250 КБ) оставлены в клоне — указатель `data/ocp/_HEAVY.md`. Зеркал, уже лежащих в базе, пропущено: 5. Статус по OCP: `open`.
- Артефакты: `1-big-prizes/guntis-vitolins-metamask-8-6eth/clues/author-posts.md`, `1-big-prizes/guntis-vitolins-metamask-8-6eth/data/seed-slots.json`, `1-big-prizes/guntis-vitolins-metamask-8-6eth/images/01-seed-slot-grid.svg`, `1-big-prizes/guntis-vitolins-metamask-8-6eth/puzzle.json`, `1-big-prizes/guntis-vitolins-metamask-8-6eth/tools/fig_slots.py`, `1-big-prizes/guntis-vitolins-metamask-8-6eth/tools/oracle.py`, `1-big-prizes/guntis-vitolins-metamask-8-6eth/tools/sweep_coins.py`, `1-big-prizes/guntis-vitolins-metamask-8-6eth/tools/sweep_paths.py`, `1-big-prizes/guntis-vitolins-metamask-8-6eth/tools/sweep_postword.py`, `1-big-prizes/guntis-vitolins-metamask-8-6eth/tools/sweep_reading_order.py`
- Ссылки/доказательства: https://github.com/floflo777/open-crypto-puzzles/tree/19644e58e50721f8469680f2edcba1daa0697630/1-big-prizes/guntis-vitolins-metamask-8-6eth ; полная дельта — `_sources/ocp_sync_2026-10-18/delta_report.md`.

## 2026-10-18, 10:25 — OCP Sync (Qoder Desktop, Windows)
- Делал: служебная запись **без прогона** — транслирую инсайт из закрытого 18.10 пазла Genesis Block Wallet (перенесён в `solved/caesarcoder-genesis-block-wallet-puzzle-947ksats`) на этот пазл.
- Гипотеза «rounds-ось»: решение genesis было не в стандартных настройках KDF — **PBKDF2-HMAC-SHA512 rounds = 181 505 и 200 913 вместо 2 048** (числа кодируют время 18:15:05 UTC и дату 2009-01-03 генезис-блока), при пассфразе «Satoshi Nakamoto». Наш пайплайн фиксирует стандарт: `tools/fast_eth.py:47` — `pbkdf2_hmac("sha512", mnemonic, b"mnemonic", 2048)`; в `data/02_tested.md` (RO1, 167 688 000 раскладок × 7 путей, 2026-09-26) тоже одна PBKDF2 на кандидата при 2048. Отдельная оговорка: если цель — дешифровка самого MetaMask-vault, а не BIP39-сид, то параметры KDF берутся из JSON хранилища (iterations/salt полями файла), и 2048 там ни при чём — механику стоит явно зафиксировать в досье.
- Следствие: полученные здесь нули корректны как «при rounds=2048 совпадений нет», но **не покрывают** пространство нестандартных rounds/соли — это ограничение интерпретации прежних негативов, а не новая ось перебора. Их собственный GPU-поиск тоже встал на 30 000 раундов (см. `data/ocp/README.md` genesis-папки), т.е. перебор по rounds вверх — это взрывной рост цены заCandidate, а не «ещё один заход».
- Что делать (бесплатный шаг): прочитать генератор/оракул пазла и подсказки автора на явные упоминания rounds / iterations / salt / «Electrum vs BIP39»; при неясности — вопрос автору только по решению куратора. **ПРОГОН НЕ ЗАПУСКАТЬ**: по `AGENT_INSTRUCTIONS.md` п.4 перебор допускается только по оси, суженной инсайтом, и требует отдельного ОК Ильи; «попробовать другие rounds» само по себе таким инсайтом не является.
- Артефакты: не создавались (запись текстовая).
- Ссылки: `solved/caesarcoder-genesis-block-wallet-puzzle-947ksats/LOG.md` (запись 10:05), https://github.com/floflo777/open-crypto-puzzles/pull/44 ; `_sources/ocp_sync_2026-10-18/delta_report.md`.

## 2026-10-18, 17:47 — Big Pickle (github_intake) — GITHUB INTAKE (шлюз)
- Делал: python tools/github_intake.py run guntis-vitolins-metamask-8-6eth --agent Big Pickle
- Кандидаты: floflo777/open-crypto-puzzles (registry, ссылки досье), agntn/puzzles (community, ссылки досье), noobsilence/crypto-puzzle-lab (community, ссылки досье), pytorch/pytorch (community, ссылки досье), schum-io/open-crypto-puzzles (fork, форки floflo777/open-crypto-puzzles), lekejf/open-crypto-puzzles (fork, форки floflo777/open-crypto-puzzles), pauldmurphy/open-crypto-puzzles (fork, форки floflo777/open-crypto-puzzles), ebr4him68-rgb/open-crypto-puzzles (fork, форки floflo777/open-crypto-puzzles), aperioscanner/open-crypto-puzzles (fork, форки floflo777/open-crypto-puzzles), windstalker-arch/open-crypto-puzzles (fork, форки floflo777/open-crypto-puzzles)
- Скачано: репо=4 (файлов 66, 248.9 КБ; медиа 0), issues=300, comments=500, PR=0, releases=47, gists=0, wiki=нет
- Бюджет: api.github.com запросов = 11 (remaining 43, reset 2026-10-18T15:42:28Z); бесплатных транспортов (codeload/ls-remote/git) = 12
- Негативы: не собрано (сверх --max-repos 4): schum-io/open-crypto-puzzles, lekejf/open-crypto-puzzles, pauldmurphy/open-crypto-puzzles, ebr4him68-rgb/open-crypto-puzzles, aperioscanner/open-crypto-puzzles, windstalker-arch/open-crypto-puzzles; agntn/puzzles: репозиторий больше --max-mb (25 МБ) — содержимое НЕ распаковано, только метаданные и API; pytorch/pytorch: ls-remote не отвечает (404/приватный/удалён)
- Артефакты: data/github/GITHUB_INTAKE.md, data/github/INTAKE_RESULT.json, data/github/_legacy_pointers.md, data/github/<owner>__<repo>/{files,raw,REPO_META.json}
- Статус шлюза: partial (срезано потолками: собрано 4 кандидатов из 10 (--max-repos/--max-mb)); остаток в data/github/resume.json
- Ссылки/доказательства: floflo777/open-crypto-puzzles, https://github.com/agntn/puzzles, https://github.com/NoobSilence/crypto-puzzle-lab, pytorch/pytorch

## 2026-10-18, 19:05 MSK / 16:05 UTC — Big Pickle — ось «ECDSA-нонсы»: СЕРТИФИЦИРОВАННЫЙ НЕГАТИВ + Lean-порог

- Бронь `guntis-vitolins-metamask-8-6eth` взята 14:41Z (heartbeat 16:30Z). GitHub-шлюз пройден ранее в этот же день (PARTIAL, 4 репо / 11 запросов, метка `GH:partial(4 репо, 11 req)`).
- Ось, а не перебор: призовой EOA `0x9C2F44EFAd0c1E852a09dF9939e6DaF061140CaF` — обычный ключ, который 7 раз платил наружу, то есть оставил 7 подписей ECDSA. Гипотеза: слабый/повторяющийся нонс (RMS/k-переиспользование) → ключ выводится арифметически за секунды. Инструмент: `tools/guntis_ecdsa_screen_2026-10-18.py`.
- Данные: 13 транзакций по адресу, из них **7 исходящих** (nonces 0..6): 0.1 / 0.1 / 0.066 (2021), 0.221843609129308203 + 0.221703927706783253 (бл. 18962348/18962350), 0.400685974388152517 (бл. 19191608), 0.266985625493923407 (бл. 20017688). Все 7 подписей вытащены (публичные JSON-RPC + фолбэк через proxy-API Blockscout для самых свежих), r,s,v,type,chainId,nonce,gasPrice/gas,to,value,input.
- Для каждой подписи пересчитан хеш сообщения z (legacy, EIP-155 cid=1, EIP-2930, EIP-1559) и восстановлен pubkey из (r,s,v,z) через coincurve.
- **ПОЛОЖИТЕЛЬНЫЙ КОНТРОЛЬ: 7/7** — восстановленный несжатый pubkey совпал с опубликованным `04e1a30fe567710a3592a56eb479d251fe7456e1f0791c39bf54691a50edab08b44904515ff30c07f354815bb2a45d83576ee8e320ab52058b35e715611fbc4f9d` И keccak-адрес от него совпал с адресом приза. Значит z и recovery-id посчитаны верно, и негатив ниже действителен.
- **Результат: повторов r нет (7 уникальных из 7), повторов s нет.** Переиспользования нонса нет → формула `k=(z1−z2)/(s1−s2)`, `d=(s1·k−z1)/r` неприменима. (Именно повторы r — решающий бинарный признак; его отсутствие закрывает ось «nonce reuse».)
- **HNP-порог (решетчатая атака на смещённые нонсы): ℓ ≥ ⌈256/t⌉.** При t=7 → **37 бит** утечки на подпись (при t=10 → 26). Множество гипотез «у всех 7 нонсов ≥37 нулевых ведущих бит» имеет долю 2^−259 полного пространства: RNG должен был бы выдавать нонсы < 2^219 — катастрофический дефект генератора. Повод считать ось закрытой.
- **Оговорка (важно не наследовать ошибку):** «ведущих нулей в r» — НЕ утечка нонса. r = x(k·G); маленький k не даёт маленького r. Поэтому столбец «ведущих нулей в r» в отчёте инструмента — просто наблюдение распределения x-координат, не свидетельство о нонсах. Прямо измерить утечку нельзя, только решёткой.
- Lean-сертификат: `lean/HnpThreshold.lean` (ядро Lean 4 без Mathlib, компилируется `lean HnpThreshold.lean`, exit 0): `threshold_7`, `threshold_10`, `insufficient_7`, `ceil_5..ceil_10` (значения ⌈256/t⌉ посчитаны формулой, а не заявлены), `thr_5..thr_10`, `counting_split` (2^(7·256) = 2^(7·219)·2^259), `leak_fraction`. Сертифицирует АРИФМЕТИКУ порога; корректность ECDSA — вне Lean (coincurve + положительный контроль выше).
- Артефакты: `tools/guntis_ecdsa_screen_2026-10-18.py`; `data/ecdsa_screen_2026-10-18.txt`; `lean/HnpThreshold.lean`.
- Вывод по оси: закрыта как негатив со свидетелем. Следующий вход в пазл — не подписи, а восстановление сид-фразы (см. запись ниже).

## 2026-10-18, 19:25 MSK / 16:25 UTC — Big Pickle — канал «текст на экране видео» ПРОЧИТАН ЗРЕНИЕМ: негатив 432/432 кадров

- Почему именно этот канал: `data/02_tested.md` в разделе «What none of this has tested» п.1 прямо называет его единственным непрочитанным («No frame of the video image has been read … the largest untested channel»). При этом перебор в свободном порядке по «посаженному» пулу закрыт свидетельно (P1 + R1 + R1b + C1 ≈ 16,7 + 18,7 млрд производных → 0), а свободный порядок по полному пулу — 1,48e14 производных (недостижимо). Значит единственная дешёвая непроверенная ось — чтение картинки.
- Ограничение прежних сессий снято: этот харнесс (OpenCode) умеет читать изображения. EasyOCR на этой машине падал (убивался), фон — 231/432 кадра; Vision-OCR другого агента (issue #18) давал 122 слова, 109 «вне пула».
- Сделано: `tools/mosaics_2026-10-18.py` → 12 контактных листов всех **432 кадров** (`data/mosaics/mosaic_00_0-35s.png` … `mosaic_11_396-431s.png`), прочитаны все 12; затем 4 кадра в полном разрешении (297, 320, 375, 419, 427 с).
- **Что реально на экране за 7:12:** говорящая голова в кухне; сайт mineshop.eu; трекеры портфеля (livecoinwatch, таблица монет CMC-типа, 150–159 и 255–263 с); **Etherscan по адресу приза** (320 с: баланс **10 Ether**, пополнение из **Poloniex 4**, tx `0x0a0c970ebeacc19…`, комиссия 0.0003024, браузер Brave + баннер «Use Crypto Wallets / Use MetaMask»); Google-выдача по запросу **«ethereum wallet 12 word seed phrase»** (375 с, Atomic Wallet / Bitcoin Wiki / MetaMask «How to Reveal Your Seed Phrase»); служебная карточка **«Sponsor Challenge»** (294–299 с, зелёный оверлей); брендовый монтаж аутро с надписями **BUILD / ANALYZE / DATA / POWERFUL** (≈415–428 с).
- **Посаженных seed-слов на экране НЕТ.** Единственные намеренные оверлеи автора — служебные: «Sponsor Challenge» и бренд-монтаж. Из них в BIP39 входят только `sponsor` и `build`, и оба уже были в перебранных пулах (sponsor — в OCP-пуле чтения; build — отдельный прогон Bayols «RO1 + один свободный видео-слот из build, ready», 0 совпадений). `challenge`, `analyze`, `data`, `powerful`, `mining`, `hardware`, `wallet`, `ethereum` в BIP39 НЕ входят.
- Проверка словарём (не на глаз): `tools/bip39_check_2026-10-18.py` — среди наэкранных надписей **63 члена BIP39**, все служебные (UI YouTube / таблицы монет / Google / Etherscan); 25 не-членов. Ни одного «посаженного» слова.
- Побочная находка для досье (нового в папке не было): 10 ETH на призовой адрес пришли **с адреса Poloniex 4** (`0xa910f92acd…`), и это видно прямо в кадре 320 с — эскроу-адрес и транзакция пополнения показаны автором в видео.
- Артефакты: `tools/mosaics_2026-10-18.py`, `tools/bip39_check_2026-10-18.py`; `data/mosaics/*` (12 листов); прочитанные кадры `data/frames_1fps/f_07425_0297.0s.jpg`, `f_08000_0320.0s.jpg`, `f_09375_0375.0s.jpg`, `f_10475_0419.0s.jpg`, `f_10675_0427.0s.jpg`; отчёт `reports/2026-10-18_1930_BigPickle_guntis-ecdsa-screen-i-kadry.md`.
- Вывод: канал «видео-картинка» закрыт как негатив со свидетелем (собственное зрение, 432/432 кадра, вместо падавшего OCR). После этого в пазле остаются только недостижимые на CPU оси: подстроки в свободном порядке (~2,8e11 производных) и свободный порядок по полному пулу (1,48e14). Обе — GPU/аренда, то есть с ОК Ильи.

- [2026-10-19 14:32Z] Qoder — независимая ETH он-чейн сверка. Эскроу `0x9C2F44EFAd0c1E852a09dF9939e6DaF061140CaF` проверен напрямую с этой машины (JSON-RPC publicnode/1rpc, block 26 227 181): **8.612542 ETH ≈ $20 629** (ETH $2 395.21) — живой, соответствует ожидаемым 8.61. Признан крупнейшим живым ETH-призом базы (68 % всей живой эфирной суммы CPU-исчерпанных пазлов). Статус работы не меняется: CPU-оси закрыты негативом, GPU-оси — только с ОК Ильи. Отдельно: `0xE708D14…`/`0x861EbCC…`/`0xaAd9A1c…` (0.2218/0.0965/0.0194 ETH) из зеркала noobsilence — **DRAIN_DEST/attacker кошельки адрес-пойзинг-кампании**, к призу отношения не имеют, взаимодействие с ними запрещено. См. [reports/2026-10-19_1430_Qoder_eth-live-map-verified.md](reports/2026-10-19_1430_Qoder_eth-live-map-verified.md).


## 2026-10-19 18:56 UTC — Qoder Desktop (Windows) — синхрон дельты реестра OCP (issue #38): аудио-канал снят словом автора, +3,26·10^10 чужих негативов
- Что синхронизировано: коммиты `09b7676e8` (2026-10-18 19:11Z, «guntis (#38, profesor1234): four free-order sweeps integrated with credit; author 'only written words' reply retires the audio channel of lead 1; verbatim hint-5 fork wording recorded») и `dc8206f6b` (2026-10-18 19:07Z, logicbeach + arweave #12 перенесены в 4-solved). Сырьё: `_sources/ocp_sync_2026-10-19/`, копии в папке: `data/ocp_guntis_leads_2026-10-19.md` (sha256 933a090368c20efc…), `data/ocp_guntis_tested_2026-10-19.md`, `data/ocp_guntis_author-posts_2026-10-19.md`. GitHub-шлюз: только GET.
- **Факт 1 — канал «голос в видео» снят первоисточником (не нашим негативом):** в комментариях к видео челленджа `w4mpiuBP_aY` автор @GuntisVitolins отвечает зрителю, который не разобрал последнее произнесённое слово: **«Youll need only written words.»** Следствие: 110 словарных слов, живущих только в автосубтитрах, не являются носителями и не требуют свипа; остаётся написанный текст (описание/заголовок/теги/текст на кадрах). Это снижает lead 1 ровно вдвое.
- **Факт 2 — дословная формулировка hint 5** (на текущей загрузке `ZjBJKooVmuE` на **17:25**, а не 17:28; hint 4 — **15:15**, а не 15:26): «so the last hint we are giving out is a keyboard fork so it's f o r k that's a keyword it's not necessarily uh in order um it's one of the keywords from the seed wallet». Это первичное основание считать `fork` членом списка на **свободной** позиции — именно это и проверяли свипы B-POSS/B-FRAMES.
- **Факт 3 — новые негативы сообщества (CUDA), засвидетельствованы и повторять нам не нужно:** пул 29 «content words» (слова 5 посаженных предложений + слаг тегов блога + заголовок и хук видео, минус якоря и «плавающие»), якоря `dutch`/1, `fog`/5, `parrot`/12, путь `m/44'/60'/0'/0/0`:
  - B-POSS: `fiber`+`fork`+`possible` обязательны, +6 упорядоченных из пула, пространство P(9,3)·P(29,6) = 172 375 257 600 → выполнено 10 773 378 819 чексумм-валидных, 42,3 ч, 0 совпадений, witness 3/3;
  - B-CLOUD-A: `fog`/5, плавающие `fiber`/`fork`/`cloud` → 10 773 355 757, 49,6 ч, 0 совпадений, 3/3;
  - B-CLOUD-B: `cloud`/5, плавающие `fiber`/`fork`/`fog` → 10 773 538 507, 48,5 ч, 0 совпадений, 2/2;
  - B-FRAMES: `fiber`+`fork` обязательны, пост-сторона 3 из 14, видео-сторона 4 из 9 (`build` `share` `atom` `link` с кадров), разбивка 6/6 → 1 040 162 282 производных, 0 совпадений (то же при индексах 0..4), witness 4/4.
  - Аттестация движка перед каждым прогоном: канонический вектор `abandon`×11 `about` на CPU и на устройстве, отказ чексуммы для `abandon`×12, 171/171 дифференциальных случаев SHA-512, сквозной planted-key, кросс-проверка с btcrecover. Суммарно ~**3,26·10^10** выполненных производных.
- **Факт 4 — вопрос `fog`/`cloud` закрыт с обеих сторон:** B-CLOUD-A и B-CLOUD-B проверяли обе ориентации; результат согласуется с уже зафиксированным снятием `cloud` и не открывает его заново.
- **Факт 5 — что осталось незакрытым (по самому реестру):** 77 словарных слов вне пула 29 не затронуты ни одним свипом; полный свободный порядок по пулу = 1,4826·10^14 чексумм-валидных производных ≈ 5,9 года при 792 000 дериваций/с. Куратор прямо пишет: ограничивающий фактор — **не перебор, а идентификация слов**, то есть чтение текста на кадрах (lead 1 частично выполнен @cjmcdaniel: 122 словарных слова читаемы на экране, 109 из них вне пула, большинство — браузерный «хром»; кандидаты из таблицы портфеля — `atom` `link` `basic` `token` `dash`).
- Он-чейн-статус цели не менялся с проверки 14:32Z этого же дня: `0x9C2F44EFAd0c1E852a09dF9939e6DaF061140CaF` = 8,612542 ETH (жив). Вывод по приоритету «быстрые деньги»: цель остаётся GPU-классом и ближайшей мишенью не является; наша работа по ней = мониторинг реестра и чужих свипов, чтобы не дублировать.
- Отдельно по реестру: `logicbeach-powerful-moss-0-54eth` и `arweave-puzzle-12-400ar` переведены куратором в 4-solved (наша база уже считала LogicBeach выплаченным; по arweave #12 записи в каталоге нет — фиксация для будущей ревизии).
- Транзакций, трат, обращений к автору нет.

- Уточнение к записи 18:56 UTC: формальной брони Qoder на цель не было (`claims acquire` не прошёл, бронь держит BigPickle, 2026-10-18/19) — запись сделана append-only как синхрон внешней документации, рабочих прогонов Qoder по цели не запускал и не запускает, пока бронь чужая.

## 2026-10-19 19:46 UTC — Qoder (Windows) — бронь перехвачена; через VPN проверен канал «новый намёк автора»
- Протокол: `claims steal guntis-vitolins-metamask-8-6eth --agent Qoder --ttl 120` (бронь BigPickle просрочена 2026-10-18T18:30:41Z;
  Илья подтвердил 19:16 UTC, что считать только свежие брони сегодняшнего дня, старые = недействительны). Переборов не запускал.
- Он-чейн (read-only, publicnode RPC): `0x9C2F44EFAd0c1E852a09dF9939e6DaF061140CaF` = **8,612542 ETH** — без изменений с 14:30 UTC.
- Новое: заработал VPN (`127.0.0.1:10809`), открыл YouTube/X, которые раньше были недоступны. Сняты страницы канала
  `@GuntisVitolins` (вкладка /videos, 30 последних загрузок, `ytInitialData` → `lockupViewModel`) и трёх известных роликов
  (`w4mpiuBP_aY`, `03wXiMczCXk`, `ZjBJKooVmuE`).
- **НЕГАТИВ по лиду «новая подсказка автора в видео»:** самая свежая загрузка канала — «NerdQaxe++ Mini …» и другие обзоры ASIC,
  все помечены «1 год назад» (11 тыс. просмотров), т.е. после подсказки 5 (2021 г. ролик `ZjBJKooVmuE`) новых роликов нет ~1 год.
  Текст-носитель приза за это время не пополнялся; «written words» = тот же закрытый набор поверхностей (заголовок/описание/теги
  ролика-загадки + пост mineshop.eu), уже исчерпанный ~70 млрд чужих дериваций. Свидетельство: `_sources/youtube_guntis_2026-10-19/`
  (4 HTML, 30 записей, снимок списка загрузок). Побочно найденное: ролик `4bOT37MZOPY` «Worlds smallest Bitcoin asic miner Bitaxe Gamma,
  hidden prize!» (год назад) — **возможная новая цель того же автора**, в каталоге записи нет; статус/адрес ещё не проверены,
  запись сделана только как наблюдение (не как цель).
- Приоритет по-прежнему упирается в GPU (аренда = трата, ждёт письменного ОК Ильи) и в идентификацию слов, а не в перебор.

## 2026-10-19 19:53 UTC — Qoder — поправка к предыдущей записи + негатив по загрузкам канала
- **Исправляю свою ошибку.** В записи 19:46 UTC я написал, что после подсказки 5 новых роликов нет ~1 год — это неверно: я смотрел вкладку /videos, где YouTube перемешал порядок. Проверено по RSS-фиду канала (`channel_id=UCkYCnjVcFJDN6Cp_uP0pv_A`, 15 записей): **7 загрузок в 2026 году** (24.08, 04.09, 05.09 x2, 21.09, 22.09) и 1 в 2025-11. Автор активен.
- **Но содержательного прироста это не даёт — негатив:** в описаниях всех роликов 2024–2026 блок «10 ETH challenge rules» побайтово совпадает с версией 2020 года (один и тот же sha256 нормализованного блока, см. `data/guntis_2026_uploads_2026-10-19.md`). Новых слов/фраз/подсказок автор не публиковал; блок обрывается на Hint 4. Лид OCP №4 («перечитать метаданные ещё раз») по каналу закрыт.
- Ложный кандидат снят: ролик `4bOT37MZOPY` «…hidden prize!» (09.11.2024) — не новая задача, а тиражирование тех же правил 10 ETH (в описании только известный адрес эскроу).
- Он-чейн ещё раз: `0x9C2F44EFAd0c1E852a09dF9939e6DaF061140CaF` = 8,612542 ETH (без изменений).
- Переборов не запускал (остаток = GPU-класс, аренда = трата, ждёт письменного ОК Ильи). Бронь по цели после этого цикла снимаю, чтобы не мешать другим агентам.

## 2026-10-19 19:56 UTC — Qoder — вторая поправка: блоки правил различаются, вывод пересчитан честно
- Запись 19:53 UTC содержала неверную фразу «блок правил побайтово совпадает с версией 2020 года». Побайтовое сравнение (инструмент `tools/guntis_channel_2026-10-19.py`, таблица в `data/guntis_2026_uploads_2026-10-19.md`) даёт **три разных блока**: A = описание ролика-загадки 2020 г. (обе загадочные фразы, включая «parrot … goat to whistle», списка Hint нет), B = перепост 2024-11 `4bOT37MZOPY` (список Hint 1–4, ссылка `bit.ly/38mWqYH`), C = перепосты 2025-11…2026-09 (тот же список Hint 1–4, только иная форма ссылки на пост). Deltas: B↔C = 2 строки (форма ссылки), C↔A = замена «goat to whistle» на список Hint 1–4.
- Существенного вывода это не меняет, но формулировка теперь точная: **новых слов и новых позиций ни в одном блоке 2024–2026 нет** — все строки этих блоков уже есть в досье (якоря tropical bird/Netherlands/condensed water droplets, фраза про fog, ссылка на пост). «goat to whistle» — строка **только** описания 2020 г., в перепостах её нет, так чтоsurface-набор не расширяется, а тиражируется.
- Hint 5 в текстовых описаниях не встречается нигде (только устно в `ZjBJKooVmuE`) — согласуется с вердиктом автора «Youll need only written words»: устный канал закрыт, письменный замкнут и исчерпан сообществом (~70 млрд дериваций).
- Бронь снята, переборов не было, транзакций не было.
