# 2026-10-17 19:25 — Big Pickle — предложение цели + проход: guntis-vitolins-metamask-8-6eth

## Тип
- Предложение цели (стандартный цикл, AGENTS.md п.8) + выполненный 1-й цикл обогащения/разведки.
- Строка в `PROPOSALS.md`: `2026-10-17 19:25 | Big Pickle | guntis-vitolins-metamask-8-6eth | ... | в работе`.

## Почему выбрана эта цель (фильтры протокола)
- В `puzzles/` (не в `solved/`), не в `dead-ends-registry`, баланс **жив** (8,612541554256945 ETH, `0x9C2F44EFAd0c1E852a09dF9939e6DaF061140CaF`).
- Бронь на момент выбора свободна (`claims.py status` → СВОБОДЕН); взята: `claims.py acquire ... --agent "Big Pickle"`.
- Наибольший EV среди свободных/достижимых целей (OPTIMAL_TARGETS: ~1,5% × $16k ≈ $240; выше только GSMG, но он уже в активной работе другого агента).
- Профиль из QUICK_WINS/OPTIMAL_TARGETS: Tier S №1; топ-открытый лид — «перечитать письменные поверхности» — это **reading task** (не перебор), т.е. в моей зоне (текст), при отсутствии зрения/видео/трат.

## Что делал (1-й цикл)
1. Проверил среду: `bip_utils`, `mnemonic`, `coincurve`, `easyocr`, `cv2`, `PIL` — есть; **`yt-dlp`/`ffmpeg` — нет**; `www.youtube.com` — **DNS-блок** (`gaierror`), но `i.ytimg.com`, `web.archive.org`, `raw.githubusercontent.com`, `api.github.com` — доступны.
2. Выгрузил OCP-данные (`tools/fetch_surfaces.py`): README/leads/tested, `reading-order-pool.json`, `video-onscreen-words.json` — все 200 OK.
3. Восстановил **Wayback-страницу challenge-видео 2020** (`tools/fetch_mirrors.py`) и извлёк полное описание/теги/заголовок (`tools/analyze_2020_surfaces.py`) — 1402 симв. описания, теги, channelId.
4. Выгрузил **данные сообщества** через GitHub API (`tools/fetch_community.py`, `tools/fetch_issue38_attach.py`, `tools/parse_community.py`): 39 свежих issues + #18/#38 (тело+комменты) + 3 вложения #38.

## Результат (включая отрицательные)
- **Видео-сторона перечитана, новых BIP39-слов нет.** Байт-сверка восстановленного описания/тегов/заголовка с пулом OCP: расхождения только у слов ПОСЛЕ `parrot` (can/sing/song/then/goat) и служебных (make/sure/favorite/already) — вне модели. Значит, лид «перечитать метаданные видео» для письменной видео-стороны фактически закрыт (OCP-пул полон).
- **Свежайшее состояние сообщества (отсутствовало в папке):**
  - Хинты 4/5 дословно; «Last hint»; автор: «Youll need only written words» (устный канал исключён); «if will have to many words, people can make bot and have easy guess» (пул намеренно мал ~14 слов = 12 сид + пара обманок).
  - Закрытые лиды (сертифицированные негативы, все 0): RO1 (167,7 млн расст. / 10,48 млн валидных, #14); C1 connecting-words (18,66 млрд, #13); четыре free-order sweep'а professor1234 (#38): B-POSS 10,77 млрд, B-CLOUD-A 10,77 млрд, B-CLOUD-B 10,77 млрд, B-FRAMES 1,04 млрд. Итого по папке ≈70 млрд дериваций, ноль.
  - Экранный канал (#18): 122 слова читаются, 109 вне пула → пул прошлых sweep'ов неполон; полное расширение пула экранными словами (219) НЕ выполнено (это ключевая открытая ось).
  - Баг харнесса «tail race» (silent loss до 0,014–4,75%) — учитывать в своих прогонах.
  - Мелкие правки записей: `top`/`finish` мис-сорсированы (#10); `cloud` в 2020-поверхностях отсутствует.
- **Ограничение среды:** без `www.youtube.com`/`yt-dlp` скачать видео и кадры для расширения экранного пула я не могу → самый ценный открытый лид недостижим в этой среде.

## Артефакты (папка пазла)
- Код: `puzzles/guntis-vitolins-metamask-8-6eth/tools/{fetch_surfaces,fetch_mirrors,extract_video_meta,analyze_2020_surfaces,fetch_community,parse_community,fetch_issue38_attach,print_issues}.py`
- Данные: `data/mirror/wayback_video_2020.html`; `data/community/*` (issues JSON, вложения #38, `selected_issues.txt`); `data/ocp_reading_order_pool.json`, `data/ocp_video_onscreen_words.json`; `data/SOURCES_guntis_fetch.txt`.
- Папка пазла: обновлены `README.md` (секция «Обновление 2026-10-17, Big Pickle») и `LOG.md` (запись 2026-10-17, Big Pickle).

## Кросс-пазловые находки (OCP issues) — что важно для нашей базы
- Сводка: `_sources/OCP_ISSUES_TRIAGE_2026-10-17.md` (39 issues, таблица) + сырой `_sources/OCP_ISSUES_2026-10-17.json`; генератор `tools/ocp_issues_triage.py`. Указатель добавлен в шапку `MASTER_CATALOG.md`.
- **Solved сообществом (сверено с нашей `solved/`):** #44 genesis-block 17.10.2026 (детали решения: два cosigner из ОДНОЙ 12-словной мнемоники, энтропия = первые 128 бит sha256 от hex coinbase-текста `cut -b 263-400`, passphrase «Satoshi Nakamoto», PBKDF2 на 181…); #24/#25 bitcoin-movie-enigma (блок 965998); #28 keysa swept (блок 966260); #34 zden LVL.5; #35 andy-bauch; #36 Prometheus; #40 arweave #12; #42 Powerful Moss (у нас папки нет). Совпадает с нашей базой — новых действий не требует.
- **Активные лиды, которых стоит коснуться:**
  - **#43 Aoi Quizchain** (moonflightrocket-ops, 2026-10-13): публичный вопрос решателю Block 76 — «точный формат строки, разделитель, энкодинг и индекс деривации». Наша папка `aoi-nakamoto-quizchain-0-854btc` (0,777 BTC, живой) — прямо про это; стоит сверить наш формат с открытым вопросом.
  - **#5/#8 Crypto Puzzles 2018 #2**: сообщество (diploux #5; ZetaReticulus #8) **закрыло «лид 1»** и предлагает реклассификацию `insight → external-info`. Наша папка `crypto-puzzles-2018-puzzle-2-0-05eth` — проверить, учтён ли этот вывод (в README упоминание GitHub уже есть).
  - **#29 Path to Greatness** (автор floflo777, 3,026 LTC): опубликована **вся архитектура** — поддельный десктоп-скриншот показывает зашифрованный WIF, 4 AES-256-CBC сегмента + их IV (= названия треков альбома), пары «ключ-подсказка» и длины всех 8 ответов. Наша папка `path-to-greatness-treasure-hunt-3ltc` — механизм известен, нужен инсайт по ответам.
  - **#33 несколько нерешённых X-челленджей** (KwikbitL, GemfinderOfX=наш 9vw04, dlay_on, SimplestBTCBook) — кандидаты в новые папки.
  - **#2 Fe bug bounty** (7 контрактов 15-puzzle на mainnet, 0,25 ETH за claim) — наша папка `fe-lang-bountiful-compiler-bounty-1eth`.
  - #12 BLM timeline paradox; #17 FTPK s2 Game 12 (URL = SHA256(предложение)); #41 SLM — **уже имеем** (тот же pdfhost + та же цепочка имён, «Ginge» — опечатка/OCR).
- **GSMG #6 (баг oracle MD5) и #15 (приз 1,25 BTC, не 5,006)** — **уже отражены** в нашей папке `gsmg-io-5btc-puzzle` (см. её README/LOG: MD5-KDF + сырые пароли — наша собственная находка; поправка #15 внесена).

## Доказательства/ссылки
- https://github.com/floflo777/open-crypto-puzzles/issues/38 (тела + вложения 1-tested-ledger.md, 2-clue-written-words.md, 3-method-tail-race.md), /18, /14, /13, /10
- https://web.archive.org/web/20200626184951/https://www.youtube.com/watch?v=w4mpiuBP_aY
- https://raw.githubusercontent.com/floflo777/open-crypto-puzzles/main/1-big-prizes/guntis-vitolins-metamask-8-6eth/data/{reading-order-pool,video-onscreen-words}.json

## Что дальше (предложение Илье — решение по одной развилке)
1. **Нужен ОК на GPU-ось** (аренда) для единственной неисчерпанной математической оси — расширение пула экранными словами и/или свободный порядок вне пула 29. Без аренды — только 15-мин CPU-прогоны по узкой инсайт-оси.
2. Либо **дать доступ к видео**: скачать `w4mpiuBP_aY` и положить файл в `data/` — тогда я доведу экранный лид OCR-ом (`EasyOCR`/`cv2` есть) без аренды. **Важно:** в текущей среде YouTube недостижим — `www.youtube.com` DNS-блок, прямой Innertube-API режется (reset/timeout), зеркала Piped/Invidious дают 401/403/500/SSL; `yt-dlp` установлен, но упирается в `www.youtube.com` (проверено 2026-10-17).
3. Пока решения нет — цель не оставляю: TTL брони 120 мин; 3 цикла без новой проверенной информации → статус `исчерпано` и переход к обогащению других папок из сети.

## Риски/честность
- Вероятность успеха низкая (~1,5%); сообщество с GPU прошло ≈70 млрд вариантов. Ценность данного прохода — **свежая и проверенная перетреяция базы** (закрыт лид, добавлены данные сообщества), а не решение.
- Публикация/траты/аренда — только с ОК Ильи.
