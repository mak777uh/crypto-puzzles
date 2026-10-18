# Очередь 

## Проход (AutoClaw, 17.10, 19:31): GPU-эра начата. guntis/mineshop ($16k): текстовые источники собраны (описание/теги видео + блог), сканы на аномалии — новых слов нет, каркас готов к GPU-перебору после новых хинтов автора. Coders #07 specE-wide: целочисленная версия реализована, прогон 12/162 блоков (7.4%, 0 хитов) — приостановлено, resume в data/ пазла. Вердикт по целям без изменений: OPTIMAL_TARGETS_2026-10-17.md.
  (1) guntis: карточка agntn/mineshop показывает, что хинты автора приходят дописями в видео — нужен мониторинг канала @GuntisVitolins; подтверждённые позиции dutch@1, fog@5, parrot@12; пул слов из текстов собран (dutch/cattle/forest/wood/fiber/hunter/roast/dinner/fresh/fog/parrot/goat/dark/lake/easy/sing/song).
  (2) #07: v2-скрипт tools/bc07_speewide2_integer.py + data/speewide2_done_blocks.txt; инвариант: 11 слотов = 117 бит энтропии + 7 бит word12 + 11 бит р3к1; скорость CPU-MP 49 с/блок; приз $13 не оправдывает GPU-ядро.

самобудильника (самопробуждение OpenCode)

Режим:
- Каденция 15 минут.
- Агент после каждого прохода перезаписывает задачу и ставит новый таймер на 15 минут.
- Задачи объёмные: исследование + записи в MASTER_CATALOG + проверка ссылок + отчёт.
- Протокол для агентов: master/AGENT_INSTRUCTIONS.md (обязательно при любых находках).

## Правила отчётов (с 2026-10-17, многопользовательский режим)

- Детальный отчёт прохода — отдельный файл `reports/ГГГГ-ММ-ДД_ЧЧММ_<агент>_<тема>.md` (см. `reports/README.md`).
- Секция «Текущая задача» ниже перезаписывается целиком агентом, держащим бронь очереди (`python tools/claims.py acquire _queue --agent <имя>`).
- Журнал прежних проходов: `_archive/WAKE_JOURNAL_2026-10-17.md`. Решённые/закрытые пазлы: `solved/INDEX.md` — там не работать без новых данных.
- Параллельная работа: брони пазлов — `python tools/claims.py`, правила — `AGENT_INSTRUCTIONS.md` (раздел «Параллельная работа»).

## Текущая задача (проход 11): каталог — импорт dsh-сессии (GLIMMER/отчёты) закрыт; Genesis — обе ночные батареи закрыты (174 897 прогонов, 0); сертификация relaxed; эскроу
1. Genesis: батареи #4/#5 закрыты (calib7 29 598 + опечатки 3 999 + calib8 141 300 = 174 897 прогонов M1, ноль). Оракул ppZ — на паузе до решающего декодер-вопроса (2e915cad/e3373eb1); ждёт пополнения и ОК Ильи.
2. Genesis relaxed sweep: контроль финальной строки DONE total=78 347 016 + пустой hits-лог (PID 45180).
3. Эскроу-мониторинг: tx_count>116 цепных; новые OP_RETURN — декодировать сразу (бесплатные данные сообщества).
4. GLIMMER (smith-lyle-moore): оба оставшихся замка — deduction-only (печатной подсказки нет, нарушено привычное правило). Следующие ходы — только новые идеи; аудит §8 handoff на неперекрытые строки — по желанию.
5. GSMG: chain4-выход (1151 B) / seg0 — по лидам; отчёт Илье + таймер 15 мин.

---
Журнал проходов (до 2026-10-17 включительно): `_archive/WAKE_JOURNAL_2026-10-17.md`.

## 2026-10-17T19:31:26.888416 — autonomous loop
Cycle 15, step 3/6: Puzzle data check: LOG.md: ok; findings.md: ok; QUICK_WINS_2026-10-17.md: ok
Next task in queue: network-data-check

## 2026-10-17T19:36:29.609552 — autonomous loop
Cycle 15, step 4/6: Network data check: https://crypto.haluska.sk/ -> HTTP 200, 2000 bytes sampled
Next task in queue: insight-action-check

## 2026-10-17T19:41:29.612017 — autonomous loop
Cycle 15, step 5/6: Insight action check: no new INSIGHT.md files; no automatic puzzle work triggered this cycle.
Next task in queue: math-lean-scan

## 2026-10-17T19:46:31.001045 — autonomous loop
Cycle 15, step 6/6: Math/lean scan: found 29 candidates; sample: 1000-btc-challenge-bitcoin-puzzle-tx, 9vw04-gem-finder, ah-white-walking-banks-800ksats, aoi-nakamoto-quizchain-0-854btc, arweave-puzzle-10-500ar
Next task in queue: balance-check

## 2026-10-17T19:51:47.391649 — autonomous loop
Cycle 16, step 1/6: Balance check: Oobit: 1545000 sats; School: 1000000 sats; Zden: 312500 sats; GSMG: 125649674 sats; SLM: 3177700 sats; Coders07: 21000 sats
Next task in queue: catalog-maintenance-note

## 2026-10-17 — Big Pickle — выбранные быстрые цели 9vw04 + bitaddress (без трат)
Пользователь выбрал: 9vw04-gem-finder + bitaddress (CPU, без трат/автора/картинок).
- **9vw04 (0.0202 BTC, живой):** скачал и проверил картинку-сетку (sha256 совпал с закреплённым). ВАЖНО: зрение модели недоступно, НО на машине стоит **EasyOCR 1.7.2 + torch CPU + OpenCV** → OCR работает (старая запись «нет OCR» устарела). Разобрал сетку 21×50 (данные/цвета + поячеечный OCR через reader.recognize). Структура: 25 пар (буква+цифра), соседние строки сдвинуты на пару. 1D skip-шифр «каждый N-й» по всем порядкам обхода с проверкой окон-WIF по pubkey (coincurve) → 0. Отрицательное: закон диагонали r-1/c-1 ложен. Артефакты: tools/{parse_grid,ocr_recognize,skip_cipher,wif_bruteforce2}.py, data/grid_colors.json, grid_ocr3.json. Нужен точный цикл-порядок букв и разгадка «spelling is incorrect on purpose» (0 недопустим в base58).
- **bitaddress (529 700 сат, живой):** BIP38 EC-multiply декодер перепроверен по тест-вектору (ок). 16 ядер, 1.17 с/кандидат. Словарь 194 189 (лексика q + типовые 2015 + слово+год + пары), прогон 4 569 за 600 с → 0. Вердикт Hark подтверждён: без реальных паролей q решать нечем, не переоткрывать.
Next task in queue: 9vw04 — выяснить фиксированный цикл букв (гипотеза: порядок из текста поста/«mirror»), сверить цветовой канал; либо перейти к другой цели по выбору Ильи.


## 2026-10-17T19:56:47.388883 — autonomous loop
Cycle 16, step 2/6: Catalog maintenance pass: reviewed WAKE_QUEUE/QUICK_WINS; no status changes this cycle. Top focus remains Crypto Puzzles 2018 #2, GSMG chain4, Zden HALV, LogicBeach Powerful Moss.
Next task in queue: puzzle-data-check

## 2026-10-17T20:01:47.386603 — autonomous loop
Cycle 16, step 3/6: Puzzle data check: LOG.md: ok; findings.md: ok; QUICK_WINS_2026-10-17.md: ok
Next task in queue: network-data-check

## 2026-10-17T20:06:47.856245 — autonomous loop
Cycle 16, step 4/6: Network data check: https://crypto.haluska.sk/ -> HTTP 200, 2000 bytes sampled
Next task in queue: insight-action-check

## 2026-10-17T20:11:47.857213 — autonomous loop
Cycle 16, step 5/6: Insight action check: no new INSIGHT.md files; no automatic puzzle work triggered this cycle.
Next task in queue: math-lean-scan

## 2026-10-17T20:16:48.061041 — autonomous loop
Cycle 16, step 6/6: Math/lean scan: found 29 candidates; sample: 1000-btc-challenge-bitcoin-puzzle-tx, 9vw04-gem-finder, ah-white-walking-banks-800ksats, aoi-nakamoto-quizchain-0-854btc, arweave-puzzle-10-500ar
Next task in queue: balance-check

## 2026-10-17T20:22:03.262566 — autonomous loop
Cycle 17, step 1/6: Balance check: Oobit: 1545000 sats; School: 1000000 sats; Zden: 312500 sats; GSMG: 125649674 sats; SLM: 3177700 sats; Coders07: 21000 sats
Next task in queue: catalog-maintenance-note

## 2026-10-17T20:27:03.259847 — autonomous loop
Cycle 17, step 2/6: Catalog maintenance pass: reviewed WAKE_QUEUE/QUICK_WINS; no status changes this cycle. Top focus remains Crypto Puzzles 2018 #2, GSMG chain4, Zden HALV, LogicBeach Powerful Moss.
Next task in queue: puzzle-data-check

## 2026-10-17T20:32:03.279740 — autonomous loop
Cycle 17, step 3/6: Puzzle data check: LOG.md: ok; findings.md: ok; QUICK_WINS_2026-10-17.md: ok
Next task in queue: network-data-check

## 2026-10-17T20:37:03.594775 — autonomous loop
Cycle 17, step 4/6: Network data check: https://crypto.haluska.sk/ -> HTTP 200, 2000 bytes sampled
Next task in queue: insight-action-check

## 2026-10-17T20:42:03.641617 — autonomous loop
Cycle 17, step 5/6: Insight action check: no new INSIGHT.md files; no automatic puzzle work triggered this cycle.
Next task in queue: math-lean-scan

## 2026-10-17T20:47:04.349976 — autonomous loop
Cycle 17, step 6/6: Math/lean scan: found 29 candidates; sample: 1000-btc-challenge-bitcoin-puzzle-tx, 9vw04-gem-finder, ah-white-walking-banks-800ksats, aoi-nakamoto-quizchain-0-854btc, arweave-puzzle-10-500ar
Next task in queue: balance-check

## 2026-10-17T20:52:12.722434 — autonomous loop
Cycle 18, step 1/6: Balance check: Oobit: 1545000 sats; School: 1000000 sats; Zden: 312500 sats; GSMG: 125649674 sats; SLM: 3177700 sats; Coders07: 21000 sats
Next task in queue: catalog-maintenance-note

## 2026-10-17T20:57:12.720738 — autonomous loop
Cycle 18, step 2/6: Catalog maintenance pass: reviewed WAKE_QUEUE/QUICK_WINS; no status changes this cycle. Top focus remains Crypto Puzzles 2018 #2, GSMG chain4, Zden HALV, LogicBeach Powerful Moss.
Next task in queue: puzzle-data-check

## 2026-10-17T21:02:12.719098 — autonomous loop
Cycle 18, step 3/6: Puzzle data check: LOG.md: ok; findings.md: ok; QUICK_WINS_2026-10-17.md: ok
Next task in queue: network-data-check

## 2026-10-17T21:07:13.019943 — autonomous loop
Cycle 18, step 4/6: Network data check: https://crypto.haluska.sk/ -> HTTP 200, 2000 bytes sampled
Next task in queue: insight-action-check

## 2026-10-17T21:12:13.021966 — autonomous loop
Cycle 18, step 5/6: Insight action check: no new INSIGHT.md files; no automatic puzzle work triggered this cycle.
Next task in queue: math-lean-scan

## 2026-10-17T21:17:14.073265 — autonomous loop
Cycle 18, step 6/6: Math/lean scan: found 29 candidates; sample: 1000-btc-challenge-bitcoin-puzzle-tx, 9vw04-gem-finder, ah-white-walking-banks-800ksats, aoi-nakamoto-quizchain-0-854btc, arweave-puzzle-10-500ar
Next task in queue: balance-check

## 2026-10-17T21:22:34.618464 — autonomous loop
Cycle 19, step 1/6: Balance check: Oobit: 1545000 sats; School: 1000000 sats; Zden: 312500 sats; GSMG: 125649674 sats; SLM: 3177700 sats; Coders07: 21000 sats
Next task in queue: catalog-maintenance-note

## 2026-10-17T21:27:34.615866 — autonomous loop
Cycle 19, step 2/6: Catalog maintenance pass: reviewed WAKE_QUEUE/QUICK_WINS; no status changes this cycle. Top focus remains Crypto Puzzles 2018 #2, GSMG chain4, Zden HALV, LogicBeach Powerful Moss.
Next task in queue: puzzle-data-check

## 2026-10-17T21:32:34.661526 — autonomous loop
Cycle 19, step 3/6: Puzzle data check: LOG.md: ok; findings.md: ok; QUICK_WINS_2026-10-17.md: ok
Next task in queue: network-data-check

## 2026-10-17T21:37:34.960423 — autonomous loop
Cycle 19, step 4/6: Network data check: https://crypto.haluska.sk/ -> HTTP 200, 2000 bytes sampled
Next task in queue: insight-action-check

## 2026-10-17T21:42:34.961672 — autonomous loop
Cycle 19, step 5/6: Insight action check: no new INSIGHT.md files; no automatic puzzle work triggered this cycle.
Next task in queue: math-lean-scan

## 2026-10-17T21:47:35.304894 — autonomous loop
Cycle 19, step 6/6: Math/lean scan: found 29 candidates; sample: 1000-btc-challenge-bitcoin-puzzle-tx, 9vw04-gem-finder, ah-white-walking-banks-800ksats, aoi-nakamoto-quizchain-0-854btc, arweave-puzzle-10-500ar
Next task in queue: balance-check

## 2026-10-17T21:52:49.797620 — autonomous loop
Cycle 20, step 1/6: Balance check: Oobit: 1545000 sats; School: 1000000 sats; Zden: 312500 sats; GSMG: 125649674 sats; SLM: 3177700 sats; Coders07: 21000 sats
Next task in queue: catalog-maintenance-note

## 2026-10-17T21:57:49.795104 — autonomous loop
Cycle 20, step 2/6: Catalog maintenance pass: reviewed WAKE_QUEUE/QUICK_WINS; no status changes this cycle. Top focus remains Crypto Puzzles 2018 #2, GSMG chain4, Zden HALV, LogicBeach Powerful Moss.
Next task in queue: puzzle-data-check

## 2026-10-17T22:02:49.793092 — autonomous loop
Cycle 20, step 3/6: Puzzle data check: LOG.md: ok; findings.md: ok; QUICK_WINS_2026-10-17.md: ok
Next task in queue: network-data-check

## 2026-10-17T22:07:50.104573 — autonomous loop
Cycle 20, step 4/6: Network data check: https://crypto.haluska.sk/ -> HTTP 200, 2000 bytes sampled
Next task in queue: insight-action-check

## 2026-10-17T22:12:50.107440 — autonomous loop
Cycle 20, step 5/6: Insight action check: no new INSIGHT.md files; no automatic puzzle work triggered this cycle.
Next task in queue: math-lean-scan

## 2026-10-17T22:17:50.418901 — autonomous loop
Cycle 20, step 6/6: Math/lean scan: found 29 candidates; sample: 1000-btc-challenge-bitcoin-puzzle-tx, 9vw04-gem-finder, ah-white-walking-banks-800ksats, aoi-nakamoto-quizchain-0-854btc, arweave-puzzle-10-500ar
Next task in queue: balance-check

## 2026-10-17T22:22:56.947352 — autonomous loop
Cycle 21, step 1/6: Balance check: Oobit: 1545000 sats; School: 1000000 sats; Zden: 312500 sats; GSMG: 125649674 sats; SLM: 3177700 sats; Coders07: 21000 sats
Next task in queue: catalog-maintenance-note

## 2026-10-17T22:27:56.944624 — autonomous loop
Cycle 21, step 2/6: Catalog maintenance pass: reviewed WAKE_QUEUE/QUICK_WINS; no status changes this cycle. Top focus remains Crypto Puzzles 2018 #2, GSMG chain4, Zden HALV, LogicBeach Powerful Moss.
Next task in queue: puzzle-data-check

## 2026-10-17T22:32:56.943082 — autonomous loop
Cycle 21, step 3/6: Puzzle data check: LOG.md: ok; findings.md: ok; QUICK_WINS_2026-10-17.md: ok
Next task in queue: network-data-check

## 2026-10-17T22:37:57.237215 — autonomous loop
Cycle 21, step 4/6: Network data check: https://crypto.haluska.sk/ -> HTTP 200, 2000 bytes sampled
Next task in queue: insight-action-check

## 2026-10-17T22:42:57.245004 — autonomous loop
Cycle 21, step 5/6: Insight action check: no new INSIGHT.md files; no automatic puzzle work triggered this cycle.
Next task in queue: math-lean-scan

## 2026-10-17T22:47:57.506056 — autonomous loop
Cycle 21, step 6/6: Math/lean scan: found 29 candidates; sample: 1000-btc-challenge-bitcoin-puzzle-tx, 9vw04-gem-finder, ah-white-walking-banks-800ksats, aoi-nakamoto-quizchain-0-854btc, arweave-puzzle-10-500ar
Next task in queue: balance-check

## 2026-10-17T22:53:04.413127 — autonomous loop
Cycle 22, step 1/6: Balance check: Oobit: 1545000 sats; School: 1000000 sats; Zden: 312500 sats; GSMG: 125649674 sats; SLM: 3177700 sats; Coders07: 21000 sats
Next task in queue: catalog-maintenance-note

## 2026-10-17T22:58:04.409997 — autonomous loop
Cycle 22, step 2/6: Catalog maintenance pass: reviewed WAKE_QUEUE/QUICK_WINS; no status changes this cycle. Top focus remains Crypto Puzzles 2018 #2, GSMG chain4, Zden HALV, LogicBeach Powerful Moss.
Next task in queue: puzzle-data-check

## 2026-10-17T23:03:04.407759 — autonomous loop
Cycle 22, step 3/6: Puzzle data check: LOG.md: ok; findings.md: ok; QUICK_WINS_2026-10-17.md: ok
Next task in queue: network-data-check

## 2026-10-17T23:08:04.733836 — autonomous loop
Cycle 22, step 4/6: Network data check: https://crypto.haluska.sk/ -> HTTP 200, 2000 bytes sampled
Next task in queue: insight-action-check

## 2026-10-17T23:13:04.737904 — autonomous loop
Cycle 22, step 5/6: Insight action check: no new INSIGHT.md files; no automatic puzzle work triggered this cycle.
Next task in queue: math-lean-scan

## 2026-10-17T23:18:04.954075 — autonomous loop
Cycle 22, step 6/6: Math/lean scan: found 29 candidates; sample: 1000-btc-challenge-bitcoin-puzzle-tx, 9vw04-gem-finder, ah-white-walking-banks-800ksats, aoi-nakamoto-quizchain-0-854btc, arweave-puzzle-10-500ar
Next task in queue: balance-check

## 2026-10-17T23:26:00 — Big Pickle (balance-check)
Portfolio balance refresh: 37 адресов через tools/balance_check_fast.py (wall 4.7 c, снимок tools/balance_check_2026-10-17_2320_bigpickle.txt). Решённых пазлов по движению средств НЕ обнаружено.
- Целы: WIF500 500,00035446 BTC (0 трат); Quizchain 0,777 BTC; GSMG 125 649 674 сат; bitaps 100 016 775; luckylurker-vault-2 100 000 000; onfo-forsyth 100 000 000; Peter Todd 0,5936 BTC (4 адр.); Trithemius 3 124 630; SLM 3 177 700; kTimesG 800 000; guntis 8,612542 ETH; arweave-11 1,0 ETH.
- Ложная тревога снята: genesis-block-wallet (bc1qfkhx02…) — dust-релей (in 569 → out ~500), а не статичный эскроу; его sweep 17.10 03:40 — норма, не solve.
- НАХОДКА (закрыта открытая задача прошлой сессии): cryptopuzzles.eth — ОБА призовых адреса пусты: Numbers 1PUzZ61… выведен 30.06.2021 (recv=sent=944 414 сат); Easycore 0x06460646… = 0 ETH, опустошён 10.02.2020 (0,9991 ETH). По блокчейну обе закрыты → правка каталога «открыты» (16.10) неверна; первоисточник-сайт устарел.
- Обслуживание: исправлен битый адрес peter-todd-1 и добавлены 6 крупных адресов в чекер.
Отчёты: reports/2026-10-17_2325_BigPickle_portfolio-balance-refresh.md; puzzles/cryptopuzzles-eth-easycore-numbers/{LOG,README}.md.

## 2026-10-17T23:23:12.967113 — autonomous loop
Cycle 23, step 1/6: Balance check: Oobit: 1545000 sats; School: 1000000 sats; Zden: 312500 sats; GSMG: 125649674 sats; SLM: 3177700 sats; Coders07: 21000 sats
Next task in queue: catalog-maintenance-note

## 2026-10-17T23:28:12.968405 — autonomous loop
Cycle 23, step 2/6: Catalog maintenance pass: reviewed WAKE_QUEUE/QUICK_WINS; no status changes this cycle. Top focus remains Crypto Puzzles 2018 #2, GSMG chain4, Zden HALV, LogicBeach Powerful Moss.
Next task in queue: puzzle-data-check

## 2026-10-17T23:33:12.969976 — autonomous loop
Cycle 23, step 3/6: Puzzle data check: LOG.md: ok; findings.md: ok; QUICK_WINS_2026-10-17.md: ok
Next task in queue: network-data-check

## 2026-10-17T23:38:13.265701 — autonomous loop
Cycle 23, step 4/6: Network data check: https://crypto.haluska.sk/ -> HTTP 200, 2000 bytes sampled
Next task in queue: insight-action-check

## 2026-10-18T10:42 — Big Pickle (GSMG, лид «третья дверь»)
Взял GSMG (бронь до 18.10 12:27 MSK). chain4 = фантом (не дублировал). **Достал потерянную первую картинку** `gsmg.io/puzzle`: PNG 1048×1556 из Wayback (sha256 38125bbd…), скопировал в `data/puzzle_wayback.png`. Спираль декодирована воспроизводимо: старт (0,0), вниз, против часовой; чёрный/синий=1, белый/жёлтый=0 → 192 бита = `gsmg.io/theseedisplanted` (совпало с OCP byte-exact). Прогон 335 ключей (51 нетекстовое чтение × 6 конструкций) против 9 planted + приза: **0 хитов по третьей двери**; witness-ы NEO1/NEO2 воспроизведены, найден новый факт — `1Ph11kNw…` = несжатый близнец NEO1. off-by-one LSB = 0 px; QR = приманка (blockchain.com/btc/address/1GSMG…); кролик = тонкие штрихи без кодировки. Ось закрыта негативом; третья дверь открыта (нужен другой нетекстовый объект/шаг). Артефакты: `data/{puzzle_wayback.png,grid14_cells.*,banner.png,center_rabbit.png}`, `tools/gsmg_image_derive_2026-10-18.py`. Отчёт: `reports/2026-10-18_1042_BigPickle_gsmg-phase1-image.md`. Приз жив.

## 2026-10-18 ~10:55 — Big Pickle (GSMG: выгрузка репозитория сообщества)
По запросу Ильи выкачал ЦЕЛИКОМ публичный репо `puzzlehunt/gsmgio-5btc-puzzle` в `puzzles/gsmg-io-5btc-puzzle/data/puzzlehunt/`: README, все 112 issues, 609 комментариев (`GITHUB_DIGEST.md` ~907 КБ), все картинки, плюс сводка `PUZZLEHUNT_REPO_EXTRACT.md`. **Находка:** H160-цель из issue #111 == hash160 призового адреса `1GSMG1JC9…` (проверено). Новые адреса «Half»/«BetterHalf» (пусты). Создатель = «Jrk Bgrt», активен в Telegram; ищется полный экспорт группы. Отчёт: `reports/2026-10-18_1055_BigPickle_gsmg-puzzlehunt-repo-extract.md`. Жду решения Ильи по проверке формул #111.

## 2026-10-18 ~11:10 — Big Pickle (GSMG: прогон оси #111)
С разрешения Ильи прогнал ось H-111. Воспроизвёл Phase-3.2 plaintext `gros` (2422 B, sha256 `b82afeb8…`, через openssl EVP-SHA256) — точно. **Новое:** публичный ключ приза `04f4d1bb…` подтверждён (=адрес `1GSMG1JC9…`), значит ключи проверяются мгновенно офчейн. **Константы issue #111 (FH и `gros[1161:1177]`) не воспроизводятся** — исчерпывающий XOR-поиск по 7 буферам × stride × смещения дал 0 совпадений → `gros` #111 неопубликован, его «verified against H160» непроверяемо. 204 кандидата ключа → 0 хитов. Ось **закрыта негативом**; дальше нужен только корпус создателя (Telegram, issue #114). Отчёт: `reports/2026-10-18_1110_BigPickle_gsmg-111-falsification.md`. Бронь снята.

## 2026-10-18 11:37 — Big Pickle (gsmg.io: живой сайт найден)
Ревизия внешних источников: **`gsmg.io` жив** (прежняя пометка «404» неверна) и отдаёт оригинальные страницы —
`/theseedisplanted` (8 плиток-ребуса + мёртвая форма `/phase1verification`), `/choiceisanillusion…iwroteitmyself`
(PHASE 2 + PHASE 3 целиком), `/89727c598b9cd1…f6a32` (SalPhaseIon + Cosmic Duality), `/puzzle` (та же puzzle.png),
новая «shutdown»-главная с `2017 — 2026` / «One mystery remains» / «Follow the white rabbit». Наши локальные блобы
подтвердились байт-в-байт (phase2 672 B salt `06286612d43ed7ed`, phase3 4112 B salt `9fbc451d13d071f4`, cosmic 1344 B
salt `2d3f6fe06dc950e6`). Новое: ребус Phase 1 прочитан зрением (плитки `[банк]+war`, `CA`, `dig i +`, `[замок]+lO`,
`crypto/gic`, `n you`, `[открытый замок]+n ing`, `t -`), сетка 14×14 из 0/1 и алфавит `GSMG.IO5BTCPUZZLECHALLENGE` на
главной, фрагмент `QvX0t8v3…GuN/jJ` (= SOURCE_4 из #111) в SalPhaseIon. Недостающее: артефакт `phase3.2` на сайте
отсутствует; bitcointalk/telegram/privnote/youtube мне недоступны — запрошены у Ильи. Карта: `data/live2026/`.
Отчёт: `reports/2026-10-18_1137_BigPickle_gsmg-live-site-map.md`.

## Проход (Qoder, 18.10.2026, 10:25): 9vw04-gem-finder — сбор+OCR+оси, итог «исчерпано»
- Внешний сбор завершён (0 solver-репо; транскрипция canalqb; 13 твитов verbatim; GIF мартовского хинта; on-chain: цель = compressed WIF 52). Сводка: puzzles/9vw04-gem-finder/data/EXTERNAL_DIGEST.md.
- Сетка исправлена: data/grid_ocr5.json (+40 поправок O/Z; буквенный канал = избыточный цикл 26 букв, «mirror» подтверждён). Оракул 17.10 был сломан (len==34 вместо 38) — починен, self-test добавлен.
- 3 цикла осей, ~9850 кандидатов, 0 валидных WIF. Строка «исчерпано» в PROPOSALS.md. Отчёты: reports/2026-10-18_1020_Qoder_9vw04-external-collection.md, reports/2026-10-18_1025_Qoder_9vw04-solve-pass.md. Бронь снята.
