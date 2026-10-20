# LOG.md — журнал «arweave-puzzle-3-1000ar»

> Формат ведения: см. `../../AGENT_INSTRUCTIONS.md`. Записи добавляются в конец; чужое не затирать.

## 2026-10-17, 18:48 — AutoClaw (модель zai_glm-5.3-flash, среда AutoClaw/Windows, проект «Default»)
- Бэкфилл: заведение журнала по протоколу (папка существовала с досье от 16.10.2026, LOG.md не был заведён).
- Тип объекта: пазл. Состояние папки: README 18378 байт (обогащённое досье), файлов 1, data/=нет, tools/=нет.
- Кратко из README: статус open; приз 1000.165838006237 AR (USD 1810); типы word-selection, text-cipher; остаток-сложность insight.
- Адрес/эскроу: n/a
- Источники: https://twitter.com/arweavep/status/1132936723162378240
- Вся история и досье — в README.md этой папки; новые сессии описывать здесь (self-intro, что делал, результаты вкл. отрицательные, артефакты, ссылки).

## 2026-10-17 18:50 — Big Pickle (big-pickle / OpenCode, Windows) — сбор данных в пустую папку
- Делал: массовый обход README → источники; попыток 8, сохранено 3 в `data/`.
- Успех (3): 00_README.md; 01_tested.md; 02_VLJIGuTJewofKx8ad4JYQs93nEuGnkgjrIt_Sd2QPYw.html
- Отказ (5): https://raw.githubusercontent.com/floflo777/open-crypto-puzzles/main/2 [FAIL: HTTP Error 404: Not Found | jina: ]; https://github.com/floflo777/open-crypto-puzzles [FAIL: IncompleteRead(327680 bytes read) ]; https://viewblock.io/arweave/address/wHP6OPG5GMF5dedo_CD8AAy6x8La-gfI5 [FAIL: HTTP Error 403: Forbidden | jina: ]; https://github.com/HomelessPhD/AR_Puzzles/tree/main/PZL3 [FAIL: IncompleteRead(327680 bytes read) ]; https://arweave.medium.com/community-spotlight-meeting-tiamat-e484655b [FAIL: <urlopen error [Errno 11001] getad]
- Артефакты: `data/SOURCES.md` + скачанные файлы.
- Проверено: да (HTTP-статус/байты); содержательная разборка — следующим шагом.


## 2026-10-17, 18:57 — AutoClaw (zai_glm-5.3-flash / AutoClaw, Windows)
- Идентификация: agntn-коллекция `weave/weave/3` = ЭТОТ пазл (1000.165838 AR, открыт (status не Claimed)). Карточка реестра (транзакции, хинты) сохранена: `data/agntn_weave_3.ts`.
- Примечание: серия weave (Tiamat) = группа наших Arweave-пазлов; в реестре 12 пазлов, 9 claimed; открытые в agntn без статуса: weave/3, weave/10, weave/11 (наши #3/#10/#11); weave/12 помечен Claimed — ПЕРЕПРОВЕРИТЬ баланс!

## 2026-10-18, 09:52 — OCP Sync (Qoder Desktop, Windows) <!-- ocp-snapshot:19644e58 -->
- Делал: обогащение из внешнего репозитория [open-crypto-puzzles](https://github.com/floflo777/open-crypto-puzzles) — раскладка дельты снапшота `19644e58` (клон `_sources/ocp/`, реестр `_sources/OCP_SNAPSHOT.md`). Протокол: `claims acquire/heartbeat/release` по `arweave-puzzle-3-1000ar`. Прогонов/переборов не запускали, статус пазла и балансы не меняли, чужие файлы не перезатёрты (копии лежат отдельными деревами `data/ocp/` и `tools/ocp/` с provenance).
- Результат: перенесено 15 файлов данных → `data/ocp/`, 5 кода → `tools/ocp/`,1 тяжёлых (>250 КБ) оставлены в клоне — указатель `data/ocp/_HEAVY.md`. Зеркал, уже лежащих в базе, пропущено: 2. Статус по OCP: `open`.
- Артефакты: `2-mid-prizes/arweave-puzzle-3-1000ar/analysis/funding-2026-09-04.json`, `2-mid-prizes/arweave-puzzle-3-1000ar/analysis/h1-result.json`, `2-mid-prizes/arweave-puzzle-3-1000ar/analysis/h2-result.json`, `2-mid-prizes/arweave-puzzle-3-1000ar/analysis/h3-result.json`, `2-mid-prizes/arweave-puzzle-3-1000ar/analysis/h4-result.json`, `2-mid-prizes/arweave-puzzle-3-1000ar/analysis/source-review.md`, `2-mid-prizes/arweave-puzzle-3-1000ar/clues/slot-1.png`, `2-mid-prizes/arweave-puzzle-3-1000ar/clues/slot-2.png`, `2-mid-prizes/arweave-puzzle-3-1000ar/clues/slot-3.png`, `2-mid-prizes/arweave-puzzle-3-1000ar/clues/slot-4.png`, `2-mid-prizes/arweave-puzzle-3-1000ar/clues/slot-5.png`, `2-mid-prizes/arweave-puzzle-3-1000ar/clues/slot-6.png` …
- Ссылки/доказательства: https://github.com/floflo777/open-crypto-puzzles/tree/19644e58e50721f8469680f2edcba1daa0697630/2-mid-prizes/arweave-puzzle-3-1000ar ; полная дельта — `_sources/ocp_sync_2026-10-18/delta_report.md`.

## 2026-10-18, 16:09 — Qoder Desktop (Windows, мультимодальное чтение) — ось «компаунд-слово», прогон A/B
- Идентификация: агент Qoder Desktop (Windows), продолжение сессии по этой папке; бронь `arweave-puzzle-3-1000ar` активна (heartbeat 16:07:47Z, TTL 120).
- Приз перепроверен on-chain: `GET https://arweave.net/wallet/wHP6OPG5GMF5dedo_CD8AAy6x8La-gfI5b5pk65Tx_0/balance` → `1000165838006237` winston = **1000.165838006237 AR**, сеть `arweave.N.1`, height 2023965 (16:08Z). Приз жив.
- Ось (регистрируется ДО прогона): **«компаунд-слово»**. По стилю решённых сиблингов (PZL5: `*`, `48`, `GCE`, `Eris`, `Umber`, `Castle`=O-O на бревне, `Picasso`; PZL7; PZL8) рисунок показывает ОДИН компонент составного термина, а 4-символьный ответ — ВТОРОЙ компонент. Чтения: слот 1 нарисовано ANNO → ответ `unce` (announce); слот 2 число 21863 в ромбе (ZIP) → `code`; слот 3 SH+майнинг → `a384` (сильное, не меняем); слот 4 AR+$ со стрелками → `cash` (AR.CASH, не меняем); слот 5 карта Скандинавии → `e4d5` (Scandinavian Defence, тот же приём, что Castle в PZL5); слот 6 дерево → `hash` (hash tree; TREE заведомо неверен по хинту автора); слот 7 UP+кактус → `vest` (UPVEST; видимая часть UP, ответ VEST); слот 8 58 точек → `base` (base58).
- База прогона: слоты 3=`a384`, 4=`cash`, 8=`base` зафиксированы. Меняются: слот 1 ∈ {unce, anno, noah, 1984}; слот 2 ∈ {code, md12, mail, snow, hill, 0603, 2018, 5567}; слот 5 ∈ {e4d5, beam, scan, port, 1984}; слот 6 ∈ {hash, root, asmt, fork, 9788}; слот 7 — прогон A `vest`, прогон B `pull`. Каждый прогон 800 уникальных, ≈7.5–8 мин при 1.7 кандидата/с (лимит 15 мин соблюдён). Все комбинации отличаются от консенсуса H5 минимум в 5 слотах и от H8 (там слот 4 был `silo`) — не пересекаются с проверенным.
- Контроль: перед прогонами обязателен `oracle.py --selftest` (`SELFTEST OK`, решённый PZL8) + одиночный заведомо неверный кандидат → `NO MATCH`.
- Кандидаты: `data/compound_batch_A.txt` (vest), `data/compound_batch_B.txt` (pull); негативы будут дописаны сюда с числом кандидатов и командами воспроизведения.
- **Прогон A: 800 уникальных → 0 MATCH** (2м15с, 5.94/с, 12 воркеров). Команда: `python tools/ocp/parallel_check.py data/compound_batch_A.txt --workers 12 --progress`.
- **Прогон B: 800 уникальных → 0 MATCH** (2м19с, 5.76/с). Команда: `... data/compound_batch_B.txt ...`.
- **Прогон C (расширение пулов, без повторов A/B и комбинаций ≤2 отличий от консенсуса H5): 3 124 уникальных → 0 MATCH** (8м43с, 5.98/с, 14 воркеров). Пулы C: слот1 {unce,anno,noah,1984,curl}, слот2 {code,md12,mail,snow,hill,0603,2018,5567}, слот5 {e4d5,beam,scan,port,1984,.erl}, слот6 {hash,root,asmt,fork,9788}, слот7 {vest,pull,pool,west}; слоты 3=a384, 4=cash, 8=base. Команда: `python tools/ocp/parallel_check.py data/compound_batch_C.txt --workers 14 --progress`.
- Контроли: `oracle.py --selftest` → `SELFTEST OK` (PZL8, exact-address positive/negative); одиночный заведомо неверный кандидат (консенсус H5) → `NO MATCH`. Все прогоны — через сертифицированный `oracle.check()` (parallel_check импортирует его без изменений), поэтому MATCH был бы эквивалентен оракульному.
- Итог оси на данный момент: 4 724 уникальных, 0 совпадений. Ось не закрыта: остаётся подвариант «слот 4 = silo» (в H8 silo сочетался с фиксированными пулами слотов 1–2; комбинации с `unce`/`noah`/`curl` и `vest`/`pool` не проверялись).
- **Прогон D (регистрируется до запуска)**: слот 3=a384, 4=`silo`, 8=base; слот1 {unce,anno,noah,1984,curl}; слот2 {code,md12,mail,snow,hill,0603,2018}; слот5 {e4d5,beam,port,loki,nord}; слот6 {hash,root,asmt,leaf,node}; слот7 {vest,pull,pool}. Итого 2 625 уникальных, ≈7.5 мин при 6/с. Файл `data/compound_batch_D.txt`.
- **Прогон D: 2 625 уникальных → 0 MATCH** (7м25с, 5.91/с, 14 воркеров). Команда: `python tools/ocp/parallel_check.py data/compound_batch_D.txt --workers 14 --progress`.
- **Итог оси «компаунд-слово»: 7 349 уникальных кандидатов, 0 совпадений.** Файлы и sha256: A `697c95a4…50be0` (800), B `c2a8e635…c6c20e` (800), C `364b161e…90ad36` (3 124), D `0b89b014…b60275` (2 625); все — `data/compound_batch_[A-D].txt`, результаты `[A-D].result` (пустые), stderr `[A-D].err` (счётчики). Ось исчерпана в зарегистрированных границах; дальнейшие прогоны по ней не планируются без новой подсказки автора. Инструмент `tools/ocp/parallel_check.py` импортирует сертифицированный `oracle.check()` без изменений (проверено: selftest PZL8 OK + негативный witness `NO MATCH`); параллелизация только по независимым кандидатам.

## 2026-10-19 10:13 UTC — Qoder — ссылка Пользователя на HomelessPhD/AR_Puzzles (только сбор данных)

- Контекст: ссылка Пользователя на клубный репозиторий https://github.com/HomelessPhD/AR_Puzzles (main). Состояние по README: **не решены #3, #10, #11**; решены #5, #7, #8, #12 (их решения — независимая калибровка оракула серии).
- Скачано в `puzzles/arweave-puzzle-3-1000ar/data/homelessphd/`: `PZL3.md` (sha256 4dffc903…f5d6), `PZL10.md` (97ab34be…64fb), `ArweaveP_user_tweets.xlsx` (d60658b4…aab0), распакованный дамп `tweets.tsv` (403 твита @ArweaveP, 2019-05-27…2022+).
- Проверка дампа: новых авторских подсказок по #3/#10/#11 нет. Найдены только уже известные: «Did anybody count the dots?», «N.1.7.0.0 → third pic obsolete», «0xFF2142… also included somewhere in the image», «format does not matter», «Next set of hints when AR reaches $100». Твит от 2020-05-23 раскрывает механизм решения другого пазла серии (sha256(hexagon) → 8 hex → ключ) — это решённый #7, не #11.
- Прогонов в этом проходе не запускалось; балансы не менялись; транзакций нет. Он-чейн статусы — последние подтверждённые в README.

- По #3: репозиторий повторяет уже имевшееся `data/community/PZL3_README.md`; новых чтений слотов нет. Ось «компаунд-слово» уже исчерпана ранее (7 349 уникальных, 0 MATCH, прогоны A–D) — повторно не запускалась, новых кандидатов репозиторий не даёт.
