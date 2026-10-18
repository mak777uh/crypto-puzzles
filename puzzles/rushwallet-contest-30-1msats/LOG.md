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
