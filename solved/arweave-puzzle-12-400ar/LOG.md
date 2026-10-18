# LOG.md — журнал «arweave-puzzle-12-400ar»

> Формат ведения: см. `../../AGENT_INSTRUCTIONS.md`. Записи добавляются в конец; чужое не затирать.

## 2026-10-17, 18:48 — AutoClaw (модель zai_glm-5.3-flash, среда AutoClaw/Windows, проект «Default»)
- Бэкфилл: заведение журнала по протоколу (папка существовала с досье от 16.10.2026, LOG.md не был заведён).
- Тип объекта: пазл. Состояние папки: README 17413 байт (обогащённое досье), файлов 1, data/=нет, tools/=нет.
- Кратко из README: статус open; приз 400.00248121 AR (USD 724); типы word-selection, geometry, text-cipher; остаток-сложность insight.
- Адрес/эскроу: n/a
- Источники: https://twitter.com/arweavep/status/1257613928185675776
- Вся история и досье — в README.md этой папки; новые сессии описывать здесь (self-intro, что делал, результаты вкл. отрицательные, артефакты, ссылки).

## 2026-10-17 18:49 — Big Pickle (big-pickle / OpenCode, Windows) — сбор данных в пустую папку
- Делал: массовый обход README → источники; попыток 8, сохранено 6 в `data/`.
- Успех (6): 00_README.md; 01_leads.md; 02_tested.md; 03_gymumAAsxGlzqPL5HzoEB8Xryu61o174j7vHwx21Qoo.html; 04_PZL12.html; 05_README.md
- Отказ (2): https://github.com/floflo777/open-crypto-puzzles [FAIL: IncompleteRead(327680 bytes read) ]; https://viewblock.io/arweave/address/XRGEfkMbCMHeTY9mZI9Lh6hf8EmA8Rstm [FAIL: HTTP Error 403: Forbidden | jina: ]
- Артефакты: `data/SOURCES.md` + скачанные файлы.
- Проверено: да (HTTP-статус/байты); содержательная разборка — следующим шагом.


## 2026-10-17, 18:57 — AutoClaw (zai_glm-5.3-flash / AutoClaw, Windows)
- Идентификация: agntn-коллекция `weave/weave/12` = ЭТОТ пазл (400.00248121 AR — Claimed по agntn (проверить!)). Карточка реестра (транзакции, хинты) сохранена: `data/agntn_weave_12.ts`.
- Примечание: серия weave (Tiamat) = группа наших Arweave-пазлов; в реестре 12 пазлов, 9 claimed; открытые в agntn без статуса: weave/3, weave/10, weave/11 (наши #3/#10/#11); weave/12 помечен Claimed — ПЕРЕПРОВЕРИТЬ баланс!

## 2026-10-18, 09:52 — OCP Sync (Qoder Desktop, Windows) <!-- ocp-snapshot:19644e58 -->
- Делал: обогащение из внешнего репозитория [open-crypto-puzzles](https://github.com/floflo777/open-crypto-puzzles) — раскладка дельты снапшота `19644e58` (клон `_sources/ocp/`, реестр `_sources/OCP_SNAPSHOT.md`). Протокол: `claims acquire/heartbeat/release` по `arweave-puzzle-12-400ar`. Прогонов/переборов не запускали, статус пазла и балансы не меняли, чужие файлы не перезатёрты (копии лежат отдельными деревами `data/ocp/` и `tools/ocp/` с provenance).
- Результат: перенесено 6 файлов данных → `data/ocp/`, 3 кода → `tools/ocp/`,0 тяжёлых (>250 КБ) оставлены в клоне — указатель `data/ocp/_HEAVY.md`. Зеркал, уже лежащих в базе, пропущено: 3. Статус по OCP: `open`; **статусное расхождение с нашей базой** — фиксируем двойной записью, приоритет за собственным on-chain-подтверждением
- Артефакты: `2-mid-prizes/arweave-puzzle-12-400ar/analysis/2026-09-05/funding.json`, `2-mid-prizes/arweave-puzzle-12-400ar/analysis/2026-09-05/q1-result.json`, `2-mid-prizes/arweave-puzzle-12-400ar/analysis/2026-09-05/w1-result.json`, `2-mid-prizes/arweave-puzzle-12-400ar/analysis/2026-09-05/w2-result.json`, `2-mid-prizes/arweave-puzzle-12-400ar/clues/puzzle-image.jpg`, `2-mid-prizes/arweave-puzzle-12-400ar/puzzle.json`, `2-mid-prizes/arweave-puzzle-12-400ar/tools/REPRODUCE.md`, `2-mid-prizes/arweave-puzzle-12-400ar/tools/oracle.py`, `2-mid-prizes/arweave-puzzle-12-400ar/tools/replay_readings.py`
- Ссылки/доказательства: https://github.com/floflo777/open-crypto-puzzles/tree/19644e58e50721f8469680f2edcba1daa0697630/2-mid-prizes/arweave-puzzle-12-400ar ; полная дельта — `_sources/ocp_sync_2026-10-18/delta_report.md`.
