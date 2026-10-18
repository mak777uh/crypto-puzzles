# LOG.md — журнал «ftpk-season-2-300usdt»

> Формат ведения: см. `../../AGENT_INSTRUCTIONS.md`. Записи добавляются в конец; чужое не затирать.

## 2026-10-17, 18:48 — AutoClaw (модель zai_glm-5.3-flash, среда AutoClaw/Windows, проект «Default»)
- Бэкфилл: заведение журнала по протоколу (папка существовала с досье от 16.10.2026, LOG.md не был заведён).
- Тип объекта: пазл. Состояние папки: README 9894 байт (обогащённое досье), файлов 1, data/=нет, tools/=нет.
- Кратко из README: статус open; приз 305.930218 USDT (USD 306); типы bip39-seed, word-selection; остаток-сложность insight.
- Адрес/эскроу: n/a
- Источники: https://x.com/FTPKgame/status/1924450289311961483
- Вся история и досье — в README.md этой папки; новые сессии описывать здесь (self-intro, что делал, результаты вкл. отрицательные, артефакты, ссылки).

## 2026-10-17 18:52 — Big Pickle (big-pickle / OpenCode, Windows) — сбор данных в пустую папку
- Делал: массовый обход README → источники; попыток 8, сохранено 5 в `data/`.
- Успех (5): 00_README.md; 01_leads.md; 02_tested.md; 03_open-crypto-puzzles.html; 04_README.md
- Отказ (3): https://findtheprivatekeys.vercel.app/ [FAIL: <urlopen error _ssl.c:1015: The ha]; https://findtheprivatekeys2.vercel.app/ [FAIL: <urlopen error [WinError 10054] Уд]; https://findtheprivatekeys4.vercel.app/servicecricketgloomattendsuprem [FAIL: <urlopen error [WinError 10054] Уд]
- Артефакты: `data/SOURCES.md` + скачанные файлы.
- Проверено: да (HTTP-статус/байты); содержательная разборка — следующим шагом.

## 2026-10-18, 09:52 — OCP Sync (Qoder Desktop, Windows) <!-- ocp-snapshot:19644e58 -->
- Делал: обогащение из внешнего репозитория [open-crypto-puzzles](https://github.com/floflo777/open-crypto-puzzles) — раскладка дельты снапшота `19644e58` (клон `_sources/ocp/`, реестр `_sources/OCP_SNAPSHOT.md`). Протокол: `claims acquire/heartbeat/release` по `ftpk-season-2-300usdt`. Прогонов/переборов не запускали, статус пазла и балансы не меняли, чужие файлы не перезатёрты (копии лежат отдельными деревами `data/ocp/` и `tools/ocp/` с provenance).
- Результат: перенесено 1 файлов данных → `data/ocp/`, 1 кода → `tools/ocp/`,0 тяжёлых (>250 КБ) оставлены в клоне — указатель `data/ocp/_HEAVY.md`. Зеркал, уже лежащих в базе, пропущено: 3. Статус по OCP: `open`; **статусное расхождение с нашей базой** — фиксируем двойной записью, приоритет за собственным on-chain-подтверждением
- Артефакты: `2-mid-prizes/ftpk-season-2-300usdt/puzzle.json`, `2-mid-prizes/ftpk-season-2-300usdt/tools/oracle.py`
- Ссылки/доказательства: https://github.com/floflo777/open-crypto-puzzles/tree/19644e58e50721f8469680f2edcba1daa0697630/2-mid-prizes/ftpk-season-2-300usdt ; полная дельта — `_sources/ocp_sync_2026-10-18/delta_report.md`.
