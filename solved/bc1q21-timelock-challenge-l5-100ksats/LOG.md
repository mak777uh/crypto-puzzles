# LOG.md — журнал «bc1q21-timelock-challenge-l5-100ksats»

> Формат ведения: см. `../../AGENT_INSTRUCTIONS.md`. Записи добавляются в конец; чужое не затирать.

## 2026-10-17, 18:48 — AutoClaw (модель zai_glm-5.3-flash, среда AutoClaw/Windows, проект «Default»)
- Бэкфилл: заведение журнала по протоколу (папка существовала с досье от 16.10.2026, LOG.md не был заведён).
- Тип объекта: пазл. Состояние папки: README 5786 байт (скелет из OCP — требует обогащения), файлов 1, data/=нет, tools/=нет.
- Кратко из README: статус solved; приз 100000 sats (USD 63); типы bip39-seed, timelock; остаток-сложность none.
- Адрес/эскроу: 37xcRXcYRht9VZJeLYWegDRC2fjX5XVnAp
- Источники: https://bc1q21.com
- Вся история и досье — в README.md этой папки; новые сессии описывать здесь (self-intro, что делал, результаты вкл. отрицательные, артефакты, ссылки).

## 2026-10-17 18:50 — Big Pickle (big-pickle / OpenCode, Windows) — сбор данных в пустую папку
- Делал: массовый обход README → источники; попыток 6, сохранено 3 в `data/`.
- Успех (3): 00_README.md; 01_bc1q21.com.html; 02_README.md
- Отказ (3): https://raw.githubusercontent.com/floflo777/open-crypto-puzzles/main/4 [FAIL: HTTP Error 404: Not Found | jina: ]; https://raw.githubusercontent.com/floflo777/open-crypto-puzzles/main/4 [FAIL: HTTP Error 404: Not Found | jina: ]; https://github.com/floflo777/open-crypto-puzzles [FAIL: IncompleteRead(327680 bytes read) ]
- Артефакты: `data/SOURCES.md` + скачанные файлы.
- Проверено: да (HTTP-статус/байты); содержательная разборка — следующим шагом.

## 2026-10-18, 09:52 — OCP Sync (Qoder Desktop, Windows) <!-- ocp-snapshot:19644e58 -->
- Делал: обогащение из внешнего репозитория [open-crypto-puzzles](https://github.com/floflo777/open-crypto-puzzles) — раскладка дельты снапшота `19644e58` (клон `_sources/ocp/`, реестр `_sources/OCP_SNAPSHOT.md`). Протокол: `claims acquire/heartbeat/release` по `bc1q21-timelock-challenge-l5-100ksats`. Прогонов/переборов не запускали, статус пазла и балансы не меняли, чужие файлы не перезатёрты (копии лежат отдельными деревами `data/ocp/` и `tools/ocp/` с provenance).
- Результат: перенесено 2 файлов данных → `data/ocp/`, 1 кода → `tools/ocp/`,0 тяжёлых (>250 КБ) оставлены в клоне — указатель `data/ocp/_HEAVY.md`. Зеркал, уже лежащих в базе, пропущено: 1. Статус по OCP: `solved`.
- Артефакты: `4-solved/bc1q21-timelock-challenge-l5-100ksats/clues/author-posts.md`, `4-solved/bc1q21-timelock-challenge-l5-100ksats/puzzle.json`, `4-solved/bc1q21-timelock-challenge-l5-100ksats/tools/oracle.py`
- Ссылки/доказательства: https://github.com/floflo777/open-crypto-puzzles/tree/19644e58e50721f8469680f2edcba1daa0697630/4-solved/bc1q21-timelock-challenge-l5-100ksats ; полная дельта — `_sources/ocp_sync_2026-10-18/delta_report.md`.
