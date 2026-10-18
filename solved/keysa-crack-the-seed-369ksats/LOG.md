# LOG.md — журнал «keysa-crack-the-seed-369ksats»

> Формат ведения: см. `../../AGENT_INSTRUCTIONS.md`. Записи добавляются в конец; чужое не затирать.

## 2026-10-17, 18:48 — AutoClaw (модель zai_glm-5.3-flash, среда AutoClaw/Windows, проект «Default»)
- Бэкфилл: заведение журнала по протоколу (папка существовала с досье от 16.10.2026, LOG.md не был заведён).
- Тип объекта: пазл. Состояние папки: README 6849 байт (скелет из OCP — требует обогащения), файлов 1, data/=нет, tools/=нет.
- Кратко из README: статус solved; приз 369369 sats (USD 233); типы bip39-seed, word-selection; остаток-сложность none.
- Адрес/эскроу: bc1qcv84707v4sglaj306qezkcrun4eejh77k8cyjr
- Источники: https://x.com/SimplestBTCBook/status/1673197111603519490
- Вся история и досье — в README.md этой папки; новые сессии описывать здесь (self-intro, что делал, результаты вкл. отрицательные, артефакты, ссылки).

## 2026-10-17 18:51 — Big Pickle (big-pickle / OpenCode, Windows) — сбор данных в пустую папку
- Делал: массовый обход README → источники; попыток 7, сохранено 6 в `data/`.
- Успех (6): 00_README.md; 01_leads.md; 02_tested.md; 03_npub1dpna3xwwddnhhzg9ycpvlcz2ze0jdwm2rf3eqd2lf9lea.html; 04_README.md; 05_L9rQ.jpg
- Отказ (1): https://github.com/floflo777/open-crypto-puzzles [FAIL: IncompleteRead(327680 bytes read) ]
- Артефакты: `data/SOURCES.md` + скачанные файлы.
- Проверено: да (HTTP-статус/байты); содержательная разборка — следующим шагом.

## 2026-10-18, 09:52 — OCP Sync (Qoder Desktop, Windows) <!-- ocp-snapshot:19644e58 -->
- Делал: обогащение из внешнего репозитория [open-crypto-puzzles](https://github.com/floflo777/open-crypto-puzzles) — раскладка дельты снапшота `19644e58` (клон `_sources/ocp/`, реестр `_sources/OCP_SNAPSHOT.md`). Протокол: `claims acquire/heartbeat/release` по `keysa-crack-the-seed-369ksats`. Прогонов/переборов не запускали, статус пазла и балансы не меняли, чужие файлы не перезатёрты (копии лежат отдельными деревами `data/ocp/` и `tools/ocp/` с provenance).
- Результат: перенесено 6 файлов данных → `data/ocp/`, 3 кода → `tools/ocp/`,1 тяжёлых (>250 КБ) оставлены в клоне — указатель `data/ocp/_HEAVY.md`. Зеркал, уже лежащих в базе, пропущено: 4. Статус по OCP: `solved`.
- Артефакты: `4-solved/keysa-crack-the-seed-369ksats/clues/author-posts.md`, `4-solved/keysa-crack-the-seed-369ksats/clues/qYkB.jpg`, `4-solved/keysa-crack-the-seed-369ksats/data/card-tokens.txt`, `4-solved/keysa-crack-the-seed-369ksats/data/coverage.csv`, `4-solved/keysa-crack-the-seed-369ksats/images/02-coverage-tested-space.png`, `4-solved/keysa-crack-the-seed-369ksats/puzzle.json`, `4-solved/keysa-crack-the-seed-369ksats/tools/fig_card_grid.py`, `4-solved/keysa-crack-the-seed-369ksats/tools/fig_coverage.py`, `4-solved/keysa-crack-the-seed-369ksats/tools/oracle.py`
- Ссылки/доказательства: https://github.com/floflo777/open-crypto-puzzles/tree/19644e58e50721f8469680f2edcba1daa0697630/4-solved/keysa-crack-the-seed-369ksats ; полная дельта — `_sources/ocp_sync_2026-10-18/delta_report.md`.
