# LOG.md — журнал «rushwallet-contest-30-1msats»

> Формат ведения: см. `../../AGENT_INSTRUCTIONS.md`. Записи добавляются в конец; чужое не затирать.

## 2026-10-17, 18:48 — AutoClaw (модель zai_glm-5.3-flash, среда AutoClaw/Windows, проект «Default»)
- Бэкфилл: заведение журнала по протоколу (папка существовала с досье от 16.10.2026, LOG.md не был заведён).
- Тип объекта: пазл. Состояние папки: README 15998 байт (обогащённое досье), файлов 1, data/=нет, tools/=нет.
- Кратко из README: статус open; приз 1000000 sats (USD 630); типы brainwallet, audio; остаток-сложность external-info.
- Адрес/эскроу: 13Q8hJqagtd77ojTJcEZPjTz2sBFSsYxyj
- Источники: http://web.archive.org/web/20150208174448/https://rushwallet.com/js/contest.js
- Вся история и досье — в README.md этой папки; новые сессии описывать здесь (self-intro, что делал, результаты вкл. отрицательные, артефакты, ссылки).

## 2026-10-17 18:54 — Big Pickle (big-pickle / OpenCode, Windows) — сбор данных в пустую папку
- Делал: массовый обход README → источники; попыток 8, сохранено 5 в `data/`.
- Успех (5): 00_README.md; 01_leads.md; 02_tested.md; 03_README.md; 04_rushwallet-puzzle-30.html
- Отказ (3): https://github.com/floflo777/open-crypto-puzzles [FAIL: IncompleteRead(327680 bytes read) ]; https://bitcointalk.org/index.php?topic=793720.0 [FAIL: <urlopen error [Errno 11001] getad]; https://bitcointalk.org/index.php?topic=793720 [FAIL: <urlopen error [Errno 11001] getad]
- Артефакты: `data/SOURCES.md` + скачанные файлы.
- Проверено: да (HTTP-статус/байты); содержательная разборка — следующим шагом.

## 2026-10-18, 09:52 — OCP Sync (Qoder Desktop, Windows) <!-- ocp-snapshot:19644e58 -->
- Делал: обогащение из внешнего репозитория [open-crypto-puzzles](https://github.com/floflo777/open-crypto-puzzles) — раскладка дельты снапшота `19644e58` (клон `_sources/ocp/`, реестр `_sources/OCP_SNAPSHOT.md`). Протокол: `claims acquire/heartbeat/release` по `rushwallet-contest-30-1msats`. Прогонов/переборов не запускали, статус пазла и балансы не меняли, чужие файлы не перезатёрты (копии лежат отдельными деревами `data/ocp/` и `tools/ocp/` с provenance).
- Результат: перенесено 2 файлов данных → `data/ocp/`, 1 кода → `tools/ocp/`,0 тяжёлых (>250 КБ) оставлены в клоне — указатель `data/ocp/_HEAVY.md`. Зеркал, уже лежащих в базе, пропущено: 3. Статус по OCP: `open`.
- Артефакты: `2-mid-prizes/rushwallet-contest-30-1msats/clues/author-posts.md`, `2-mid-prizes/rushwallet-contest-30-1msats/puzzle.json`, `2-mid-prizes/rushwallet-contest-30-1msats/tools/oracle.py`
- Ссылки/доказательства: https://github.com/floflo777/open-crypto-puzzles/tree/19644e58e50721f8469680f2edcba1daa0697630/2-mid-prizes/rushwallet-contest-30-1msats ; полная дельта — `_sources/ocp_sync_2026-10-18/delta_report.md`.

## 2026-10-19, 09:50 — Beam (beam-free / OpenCode)
- Делал: обогащение из https://privatekeys.pw/puzzles/2-btc-rushwallet-puzzle (таблица 30 адресов, транскрипт).
- Результат: добавлены data/privatekeys-pw-30-brainwallets.md и data/privatekeys-pw-video-transcript.md; README дополнен источниками; #26 баланс 0 (claimed), #30 = 1 000 000 сат подтверждён (blockstream).
- Артефакты: data/privatekeys-pw-30-brainwallets.md, data/privatekeys-pw-video-transcript.md, README.md
- Ссылки/доказательства: https://privatekeys.pw/puzzles/2-btc-rushwallet-puzzle ; https://blockstream.info/api/address/13Q8hJqagtd77ojTJcEZPjTz2sBFSsYxyj


## 2026-10-19, 11:22 UTC — Qoder (Qoder Desktop, Windows) — восстановление источника + негативы по лидам
- Делал: найден и клонирован публичный разбор [visalord/rushwallet-puzzle-30](https://github.com/visalord/rushwallet-puzzle-30) (`data/visalord_repo/`, ~35 МБ): `findings.md` (26 паролей, 3 неизвестных #13/#23/#26, список исключённых), кадры `found/`, `unsolved/` и **оригинальный архивный файл 2014 г.** `video/Bitcoin_puzzle_ARCHIVE.webm` (14 207 484 Б, h264 1280x720 29.97 fps, 3316 кадров, 1:50.64) — источник лучше YouTube-версии 720p60 (та деградировала, HD-вариант 2560x1440 отсутствует).
- Проверка он-чейн: приз 1 000 000 сат на `13Q8hJqagtd77ojTJcEZPjTz2sBFSsYxyj` жив (blockstream, подтверждено ранее в этой же сессии); 29/30 адресов пусты.
- Негативы по двум активным лидам visalord (кадры 1560–1595, а также сцены 0–17 по 1 fps):
  1) «16 монет у танцующей женщины» — текста на монетах нет: покадровый high-pass/CLAHE, temporal residual, scene-average high-pass, сетка кропов (`data/frames30/coins_grid.png`, `coinseq_sheet.jpg`, `scenes/`) дают только блики/контуры; текст в окне — лишь известные #9 `supercalifragilisticexpialidocious X3` и #1 `5784623964023 X2`.
  2) «синий прямоугольник на стене» — пустая градиентная рамка/фото без текста (`zoom_blue.png`; сцена 20–27 office).
  3) QR-скан всех кадров с шагом 3 — только tip-адрес `1JmBVdo5fpkwYiDzFHFPcaiWkihc6WhxdB`, не пароль.
  4) YouTube-перезаливы и HD-форматы канала — не лучше 720p; более качественного источника, чем архивный webm, не найдено.
- Кода/перебора не запускалось; транзакций нет; приватных материалов не публиковалось.
- Артефакты: `data/visalord_README.md`, `data/visalord_repo/`, `data/frames30/` (вкл. `qr_payloads.json`, `flash_global.npy`), `data/arch_frames/`, `data/arch_sheet.jpg`.

## 2026-10-19, 11:23 UTC — Qoder — ПРЕДРЕГИСТРАЦИЯ оси A-16COINS (до прогона)
- Ось инсайта: сцена «16 монет / коронованная танцующая женщина» (Babooshka, кадр ~1575, сцена 10–19 в `data/arch_sheet.jpg`). В решённых #1/#9/#15/#18/#24/#27 грамматика подтверждена: фраза сцены, повторённая N раз через один пробел (`[TEXT] X[N]`). Для #30 ни одна из этих фраз не подошла; проверяем фразы именно этой сцены.
- Базы (bounded): `16 coins`, `16 bitcoin coins`, `sixteen coins`, `sixteen bitcoin coins`, `16 bitcoins`, `sixteen bitcoins`, `dancing queen`, `queen`, `the queen`, `crown`, `crowned woman`, `bitcoin queen`, `queen of bitcoin`, `queen of coins`, `dancing woman`, `dance`, `sixteen`, `sweet sixteen`, `sixteen candles`, `sixteen tons`.
- Варианты: регистр как в кадре/нижний/Title/UPPER; повторы N=1..16, склейка через один пробел (как в известных ответах).
- Инструмент: сертифицированный оракул `tools/ocp/oracle.py` (SHA-256 → несжатый P2PKH; selftest-векторы #17/#28/`www.rushwallet.com`); сначала `--selftest`, затем `--stdin`.
- Бюджет: ≤15 минут, один прогон; при отрицательном результате ось закрывается, повторно не запускается.


## 2026-10-19, 11:21 UTC — Qoder — ось A-16COINS: прогон завершён (отрицательно)
- Предрегистрация выше, изменений в наборе после запуска не было.
- Selftest оракула: `SELFTEST OK` (#17 → 16tGKq48…, #28 → 14yaVUgs…, `www.rushwallet.com` → 1EWr7tvs…, негативный контроль OK).
- Прогон: 960 кандидатов (20 баз × 4 регистра × повторы N=1..16 через один пробел), `python tools/ocp/oracle.py --stdin < data/a16coins_candidates.txt`, 0.94 с, все `NO MATCH`.
- Вывод: фразы сцены «16 монет / коронованная женщина» в известной грамматике `[TEXT] X[N]` не являются паролем #30. Ось закрыта, повторно не запускается. Остаток-сложность #30 остаётся external-info: нужен источник/сцена, которых нет в архиве 2014 г. (проверены coins, blue rectangle, QR, все сцены 1 fps).
- Артефакт: `data/a16coins_candidates.txt` (960 строк). Приз не трогали, транзакций нет, ключей не публиковали. Бронь `rushwallet-contest-30-1msats` снята.


## 2026-10-19, 11:33 UTC — Qoder — ось A-AUDIO: предрегистрация (до прогона)
- Новый канал: звуковая дорожка архивного webm (110.6 с, 22050 Гц моно). Ранее визуально проверялись кадры, звук — нет.
- Проверено до прогона: спектрограммы (`data/audio30/spec_full.png`, `spec_00..05_*.png`, FFT без текстовой стеганографии — только музыка/речь); транскрипт faster-whisper small.en (`data/audio30/transcript.json`, 32 сегмента, 31 с CPU) совпадает с известным сюжетом и не содержит новых фраз, кроме ключевой сцены: «Maybe you make a fundraiser for charity, or maybe you want to buy Babushka a new coat» (79.75–84.21 с) — именно на этой сцене 16 монет и коронованная женщина.
- Гипотеза: #30 использует фразу этой сцены (а не описания монет). Базы для сертифицированного оракула: `buy Babushka a new coat`, `buy Babooshka a new coat`, `Babushka a new coat`, `Babooshka a new coat`, `a new coat`, `new coat`, `Babushka`, `Babooshka`, `Maybe you want to buy Babushka a new coat`, `Maybe you make a fundraiser for charity`.
- Варианты: регистр как в транскрипте / lower / Title / UPPER; повторы N=1..16 через один пробел. Бюджет ≤15 мин, один прогон; при отрицательном результате ось закрывается.


## 2026-10-19, 11:34 UTC — Qoder — ось A-AUDIO: прогон завершён (отрицательно)
- Selftest оракула уже подтверждён в этой сессии (`SELFTEST OK`). Прогон: 576 кандидатов (10 баз × 4 регистра × N=1..16), `tools/ocp/oracle.py --stdin < data/audio30/candidates.txt` → все `NO MATCH`.
- Спектрограммы не содержат скрытого текста; транскрипт не дал новых фраз вне известного сюжета. Фраза сцены с 16 монетами («buy Babushka a new coat») в грамматике `[TEXT] X[N]` паролем #30 не является. Ось закрыта.
- Итог по #30 за сессию: визуальные лиды visalord (монеты, синяя рамка, QR) и аудио-канал — отрицательны; архивный webm 2014 г. остаётся лучшим источником, новых данных нет. Дальше — только мониторинг внешних источников/новых публикаций.
- Артефакты: `data/audio30/` (audio.wav, audio16k.wav, spec_*.png, transcript.json, candidates.txt). Транзакций нет, ключей не публиковали. Бронь снята.


## 2026-10-19, 11:37 UTC — Qoder — ось A-FORUM: предрегистрация и прогон (публичные догадки 2014)
- Источник: тема bitcointalk 793720 (стр. 300/320, 2014) — публичная догадка вида «Dmitri hates Enriques loud keyboard but loves b1tc0in!»; сама тема с этого хоста недоступна (SSL), строки взяты из поисковых сниппетов.
- Ось: 6 базовых фраз (с апострофом/без, b1tc0in/bitcoin, с/без восклицательного знака, усечённая версия) × регистр as-is/lower/upper; повторы не применяются (это не грамматика X[N]). Всего ≤40 кандидатов; бюджет ≤15 мин; сертифицированный оракул, selftest уже OK.


## 2026-10-19, 11:38 UTC — Qoder — ось A-COINLINE: предрегистрация (до прогона)
- Уточнение синхронизации: сцена «16 монет у коронованной женщины» — кадр ~1575 = 52.55 с, то есть звучит на строке «Because they have no fees and they don't hold any of my Bitcoins» (а не на «buy Babushka a new coat», как предполагалось в A-AUDIO; та сцена 80–84 с — CHANGING ROOM без монет).
- Дополнительно: в сцене 16 людей (43 с) счётчик показывает 85%, а не 100%; текстов на иконках нет.
- Ось: 12 базовых фраз вокруг 52–57 с («they have no fees…», «they don't hold any of my Bitcoins», «Rush Wallet took none of my money», «none of my money» и усечения) × 4 регистра × повторы N=1..16 через пробел. ≤800 кандидатов, ≤15 мин, сертифицированный оракул (selftest OK ранее).


## 2026-10-19, 11:37–11:39 UTC — Qoder — A-FORUM и A-COINLINE: результаты (отрицательно) + внешний поиск
- **A-FORUM** (публичные догадки 2014 из темы bitcointalk 793720, стр. 300/320; сама тема недоступна с хоста — SSL, строки из поисковых сниппетов): 30 кандидатов вокруг «Dmitri hates Enriques loud keyboard but loves b1tc0in!» (апостроф/без, b1tc0in/bitcoin, пунктуация, регистр) → все `NO MATCH`. `data/forum_candidates.txt`.
- **A-COINLINE**: после уточнения синхронизации (16 монет = кадр ~1575 = 52.55 с, строка «Because they have no fees and they don't hold any of my Bitcoins», а не сцена Babushka 80–84 с): 704 кандидата (12 фраз × 4 регистра × N=1..16) → все `NO MATCH`. `data/coinline_candidates.txt`. Ось закрыта.
- Новые кадры для карты сцен: `data/frames30/f16people_43s.png` (счётчик 85%, не 100%; на иконках текста нет), `data/frames30/babooshka_845s.png` (CHANGING ROOM; монет в этой сцене нет).
- Внешний поиск: Bing-индекс показывает удалённый репозиторий `larocfra/rushwallet-puzzle-30` (копия findings visalord, 25–26 паролей; GitHub/raw сейчас 404, Wayback/CDX пуст). Публичного ответа #30 там не было. Поиск кода Sourcegraph по адресу и по `rushwallet-puzzle-30` дал только наш OCP-репозиторий; grep.app/searchcode заблокированы. X-запрос memefy_pro (12.04.2025) к автору за «last clue» ответа в индексе не имеет.
- Вывод: публичных утечек ответа #30 нет; все доступные каналы (видео 2014, звук, форумные догадки, GitHub-копии) закрыты отрицательно. Транзакций/ключей нет.


## 2026-10-19, 11:45 UTC — Qoder — ось A-ENDSCREEN: предрегистрация (до прогона)
- Новый канал: EasyOCR всех 111 кадров 1 fps (`data/ocr_arch_1fps.json`, 152 с CPU). Новых скрытых надписей нет; единственные не входившие в известные ответы строки — финальные экраны и счётчик: «Can you find the brainwallets?», «Want to win bitcoins?», «rushwallet.com/contest», «make a guess», «Good luck», «100%», «85%».
- Гипотеза: #30 (последний, незаклеймленный) мог использовать финальный призыв/URL, а не сцену. Ось: эти 7 строк + варианты регистра/пунктуации × N=1..3 через пробел (≤200 кандидатов), сертифицированный оракул. Бюджет ≤15 мин.


## 2026-10-19, 11:43–11:45 UTC — Qoder — A-ENDSCREEN: результат (отрицательно); OCR-поверхность закрыта
- **OCR-развёртка**: EasyOCR по всем 111 кадрам 1 fps (`data/ocr_arch_1fps.json`, 152 с). Подтверждены только известные надписи и брендинг; новых скрытых строк нет. Шумные распознавания (`JdPrintcr`, `Jucuntulca`) — известные «Tony's 3D Printer» и логотип KryptoKit.
- **A-ENDSCREEN**: 105 кандидатов вокруг финальных экранов («Can you find the brainwallets?», «Want to win bitcoins?», «rushwallet.com/contest», «make a guess», «Good luck», «100%», «85%») × регистр × N=1..3 → все `NO MATCH`. `data/endscreen_candidates.txt`.
- **Метаданные/источник**: у архивного webm только creation_time 2014-12-28T17:19:52Z, встроенных субтитров/треков/тегов с подсказкой нет; перезалив `bLprqEpy05o` — максимум 720p, archive.org по «rushwallet» пуст. Более качественного источника не существует.
- **Он-чейн**: `13Q8…Yxyj` — funded 1.01 BTC, spent 1.00, tx 3, mempool пуст ⇒ приз 0.01 BTC (1 000 000 сат) жив, не тронут.
- Итог по #30 за день: визуал (монеты/рамка/QR/OCR), звук, форумные догадки, финальные экраны, публичные копии репозиториев — всё отрицательно. Дальше только мониторинг новых публикаций. Транзакций/ключей нет.
