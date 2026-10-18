# LOG.md — журнал «ballet-bobby-lee-2btc-cards»

> Формат ведения: см. `../../AGENT_INSTRUCTIONS.md`. Записи добавляются в конец; чужое не затирать.

## 2026-10-17, 18:48 — AutoClaw (модель zai_glm-5.3-flash, среда AutoClaw/Windows, проект «Default»)
- Бэкфилл: заведение журнала по протоколу (папка существовала с досье от 16.10.2026, LOG.md не был заведён).
- Тип объекта: пазл. Состояние папки: README 11474 байт (обогащённое досье), файлов 1, data/=нет, tools/=нет.
- Кратко из README: статус open; приз 2.00007358 BTC (USD 126005); типы bip38, physical-object; остаток-сложность external-info.
- Адрес/эскроу: 1JxWyNrkgYvgsHu8hVQZqTXEB9RftRGP5m
- Источники: https://x.com/bobbyclee/status/1289004702122643456
- Вся история и досье — в README.md этой папки; новые сессии описывать здесь (self-intro, что делал, результаты вкл. отрицательные, артефакты, ссылки).

## 2026-10-17 18:50 — Big Pickle (big-pickle / OpenCode, Windows) — сбор данных в пустую папку
- Делал: массовый обход README → источники; попыток 8, сохранено 6 в `data/`.
- Успех (6): 00_README.md; 01_leads.md; 02_tested.md; 03_README.md; 04_ballet.html; 05_ballet.md
- Отказ (2): https://github.com/floflo777/open-crypto-puzzles [FAIL: IncompleteRead(327680 bytes read) ]; https://github.com/oritwoen/boha [FAIL: IncompleteRead(327680 bytes read) ]
- Артефакты: `data/SOURCES.md` + скачанные файлы.
- Проверено: да (HTTP-статус/байты); содержательная разборка — следующим шагом.

## 2026-10-18, 09:52 — OCP Sync (Qoder Desktop, Windows) <!-- ocp-snapshot:19644e58 -->
- Делал: обогащение из внешнего репозитория [open-crypto-puzzles](https://github.com/floflo777/open-crypto-puzzles) — раскладка дельты снапшота `19644e58` (клон `_sources/ocp/`, реестр `_sources/OCP_SNAPSHOT.md`). Протокол: `claims acquire/heartbeat/release` по `ballet-bobby-lee-2btc-cards`. Прогонов/переборов не запускали, статус пазла и балансы не меняли, чужие файлы не перезатёрты (копии лежат отдельными деревами `data/ocp/` и `tools/ocp/` с provenance).
- Результат: перенесено 7 файлов данных → `data/ocp/`, 3 кода → `tools/ocp/`,3 тяжёлых (>250 КБ) оставлены в клоне — указатель `data/ocp/_HEAVY.md`. Зеркал, уже лежащих в базе, пропущено: 3. Статус по OCP: `open`.
- Артефакты: `1-big-prizes/ballet-bobby-lee-2btc-cards/clues/AA009926-revealed.jpg`, `1-big-prizes/ballet-bobby-lee-2btc-cards/clues/author-posts.md`, `1-big-prizes/ballet-bobby-lee-2btc-cards/data/card-faces.json`, `1-big-prizes/ballet-bobby-lee-2btc-cards/data/pipeline-stages.json`, `1-big-prizes/ballet-bobby-lee-2btc-cards/images/01-structure-card-faces.svg`, `1-big-prizes/ballet-bobby-lee-2btc-cards/images/02-pipeline-derivation.svg`, `1-big-prizes/ballet-bobby-lee-2btc-cards/puzzle.json`, `1-big-prizes/ballet-bobby-lee-2btc-cards/tools/fig_cards.py`, `1-big-prizes/ballet-bobby-lee-2btc-cards/tools/fig_pipeline.py`, `1-big-prizes/ballet-bobby-lee-2btc-cards/tools/oracle.py`
- Ссылки/доказательства: https://github.com/floflo777/open-crypto-puzzles/tree/19644e58e50721f8469680f2edcba1daa0697630/1-big-prizes/ballet-bobby-lee-2btc-cards ; полная дельта — `_sources/ocp_sync_2026-10-18/delta_report.md`.
