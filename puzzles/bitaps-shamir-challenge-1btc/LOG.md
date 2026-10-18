# LOG.md — журнал «bitaps-shamir-challenge-1btc»

> Формат ведения: см. `../../AGENT_INSTRUCTIONS.md`. Записи добавляются в конец; чужое не затирать.

## 2026-10-17, 18:48 — AutoClaw (модель zai_glm-5.3-flash, среда AutoClaw/Windows, проект «Default»)
- Бэкфилл: заведение журнала по протоколу (папка существовала с досье от 16.10.2026, LOG.md не был заведён).
- Тип объекта: пазл. Состояние папки: README 14754 байт (обогащённое досье), файлов 1, data/=нет, tools/=нет.
- Кратко из README: статус open; приз 1.00016775 BTC (USD 63011); типы shamir, bip39-seed; остаток-сложность external-info.
- Адрес/эскроу: bc1qyjwa0tf0en4x09magpuwmt2smpsrlaxwn85lh6
- Источники: https://bitaps.com/mnemonic/challenge
- Вся история и досье — в README.md этой папки; новые сессии описывать здесь (self-intro, что делал, результаты вкл. отрицательные, артефакты, ссылки).

## 2026-10-17 18:50 — Big Pickle (big-pickle / OpenCode, Windows) — сбор данных в пустую папку
- Делал: массовый обход README → источники; попыток 8, сохранено 5 в `data/`.
- Успех (5): 00_README.md; 01_leads.md; 02_tested.md; 03_api.pullpush.io.json; 04_api.pullpush.io.json
- Отказ (3): https://github.com/floflo777/open-crypto-puzzles [FAIL: IncompleteRead(327680 bytes read) ]; https://bitaps.com/mnemonic/challenge [FAIL: HTTP Error 403: Forbidden | jina: ]; https://archive.is/8bNRM [FAIL: <urlopen error [SSL: WRONG_VERSION]
- Артефакты: `data/SOURCES.md` + скачанные файлы.
- Проверено: да (HTTP-статус/байты); содержательная разборка — следующим шагом.

## 2026-10-18, 09:52 — OCP Sync (Qoder Desktop, Windows) <!-- ocp-snapshot:19644e58 -->
- Делал: обогащение из внешнего репозитория [open-crypto-puzzles](https://github.com/floflo777/open-crypto-puzzles) — раскладка дельты снапшота `19644e58` (клон `_sources/ocp/`, реестр `_sources/OCP_SNAPSHOT.md`). Протокол: `claims acquire/heartbeat/release` по `bitaps-shamir-challenge-1btc`. Прогонов/переборов не запускали, статус пазла и балансы не меняли, чужие файлы не перезатёрты (копии лежат отдельными деревами `data/ocp/` и `tools/ocp/` с provenance).
- Результат: перенесено 8 файлов данных → `data/ocp/`, 2 кода → `tools/ocp/`,1 тяжёлых (>250 КБ) оставлены в клоне — указатель `data/ocp/_HEAVY.md`. Зеркал, уже лежащих в базе, пропущено: 3. Статус по OCP: `open`.
- Артефакты: `1-big-prizes/bitaps-shamir-challenge-1btc/challenge.warc`, `1-big-prizes/bitaps-shamir-challenge-1btc/clues/author-posts.md`, `1-big-prizes/bitaps-shamir-challenge-1btc/data/channel_reads.csv`, `1-big-prizes/bitaps-shamir-challenge-1btc/data/entropy_measurements.csv`, `1-big-prizes/bitaps-shamir-challenge-1btc/data/related_disclosures.csv`, `1-big-prizes/bitaps-shamir-challenge-1btc/puzzle.json`, `1-big-prizes/bitaps-shamir-challenge-1btc/tool-en.warc`, `1-big-prizes/bitaps-shamir-challenge-1btc/tool-ru.warc`, `1-big-prizes/bitaps-shamir-challenge-1btc/tools/oracle.py`, `1-big-prizes/bitaps-shamir-challenge-1btc/tools/structured_candidates.py`
- Ссылки/доказательства: https://github.com/floflo777/open-crypto-puzzles/tree/19644e58e50721f8469680f2edcba1daa0697630/1-big-prizes/bitaps-shamir-challenge-1btc ; полная дельта — `_sources/ocp_sync_2026-10-18/delta_report.md`.
