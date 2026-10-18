# LOG.md — журнал «exitonly-challenge-14-30ksats»

> Формат ведения: см. `../../AGENT_INSTRUCTIONS.md`. Записи добавляются в конец; чужое не затирать.

## 2026-10-17, 18:48 — AutoClaw (модель zai_glm-5.3-flash, среда AutoClaw/Windows, проект «Default»)
- Бэкфилл: заведение журнала по протоколу (папка существовала с досье от 16.10.2026, LOG.md не был заведён).
- Тип объекта: пазл. Состояние папки: README 5341 байт (скелет из OCP — требует обогащения), файлов 1, data/=нет, tools/=нет.
- Кратко из README: статус open; приз 30000 sats (USD 18.9); типы bip39-seed, word-selection; остаток-сложность uneconomic.
- Адрес/эскроу: bc1q5rjy2cdfy4n4dkk4r6pxtwqlm8tgjcc2dj0ee9
- Источники: https://www.youtube.com/watch?v=jMRoWtsfCuY
- Вся история и досье — в README.md этой папки; новые сессии описывать здесь (self-intro, что делал, результаты вкл. отрицательные, артефакты, ссылки).

## 2026-10-17 18:50 — Big Pickle (big-pickle / OpenCode, Windows) — сбор данных в пустую папку
- Делал: массовый обход README → источники; попыток 5, сохранено 2 в `data/`.
- Успех (2): 00_README.md; 01_README.md
- Отказ (3): https://raw.githubusercontent.com/floflo777/open-crypto-puzzles/main/3 [FAIL: HTTP Error 404: Not Found | jina: ]; https://raw.githubusercontent.com/floflo777/open-crypto-puzzles/main/3 [FAIL: HTTP Error 404: Not Found | jina: ]; https://github.com/floflo777/open-crypto-puzzles [FAIL: IncompleteRead(327680 bytes read) ]
- Артефакты: `data/SOURCES.md` + скачанные файлы.
- Проверено: да (HTTP-статус/байты); содержательная разборка — следующим шагом.

## 2026-10-18, 09:52 — OCP Sync (Qoder Desktop, Windows) <!-- ocp-snapshot:19644e58 -->
- Делал: обогащение из внешнего репозитория [open-crypto-puzzles](https://github.com/floflo777/open-crypto-puzzles) — раскладка дельты снапшота `19644e58` (клон `_sources/ocp/`, реестр `_sources/OCP_SNAPSHOT.md`). Протокол: `claims acquire/heartbeat/release` по `exitonly-challenge-14-30ksats`. Прогонов/переборов не запускали, статус пазла и балансы не меняли, чужие файлы не перезатёрты (копии лежат отдельными деревами `data/ocp/` и `tools/ocp/` с provenance).
- Результат: перенесено 2 файлов данных → `data/ocp/`, 1 кода → `tools/ocp/`,0 тяжёлых (>250 КБ) оставлены в клоне — указатель `data/ocp/_HEAVY.md`. Зеркал, уже лежащих в базе, пропущено: 1. Статус по OCP: `open`.
- Артефакты: `3-small-prizes/exitonly-challenge-14-30ksats/clues/author-posts.md`, `3-small-prizes/exitonly-challenge-14-30ksats/puzzle.json`, `3-small-prizes/exitonly-challenge-14-30ksats/tools/oracle.py`
- Ссылки/доказательства: https://github.com/floflo777/open-crypto-puzzles/tree/19644e58e50721f8469680f2edcba1daa0697630/3-small-prizes/exitonly-challenge-14-30ksats ; полная дельта — `_sources/ocp_sync_2026-10-18/delta_report.md`.
