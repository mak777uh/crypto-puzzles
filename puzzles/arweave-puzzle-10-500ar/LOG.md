# LOG.md — журнал «arweave-puzzle-10-500ar»

> Формат ведения: см. `../../AGENT_INSTRUCTIONS.md`. Записи добавляются в конец; чужое не затирать.

## 2026-10-17, 18:48 — AutoClaw (модель zai_glm-5.3-flash, среда AutoClaw/Windows, проект «Default»)
- Бэкфилл: заведение журнала по протоколу (папка существовала с досье от 16.10.2026, LOG.md не был заведён).
- Тип объекта: пазл. Состояние папки: README 14596 байт (обогащённое досье), файлов 1, data/=нет, tools/=нет.
- Кратко из README: статус open; приз 500.02225493 AR (USD 905); типы word-selection, text-cipher; остаток-сложность insight.
- Адрес/эскроу: n/a
- Источники: https://arweave.net/1fLPMP_smP6ipdIYbYUAZtFPwO4crdYr4kMVf5uTivg
- Вся история и досье — в README.md этой папки; новые сессии описывать здесь (self-intro, что делал, результаты вкл. отрицательные, артефакты, ссылки).

## 2026-10-17 18:49 — Big Pickle (big-pickle / OpenCode, Windows) — сбор данных в пустую папку
- Делал: массовый обход README → источники; попыток 7, сохранено 6 в `data/`.
- Успех (6): 00_README.md; 01_leads.md; 02_tested.md; 03_open-crypto-puzzles.html; 04_1fLPMP_smP6ipdIYbYUAZtFPwO4crdYr4kMVf5uTivg.html; 05_PZL10.html
- Отказ (1): https://viewblock.io/arweave/address/bkjJGw3NLxs8OAyRxgTL-QFpiB3lBJqZ7 [FAIL: HTTP Error 403: Forbidden | jina: ]
- Артефакты: `data/SOURCES.md` + скачанные файлы.
- Проверено: да (HTTP-статус/байты); содержательная разборка — следующим шагом.


## 2026-10-17, 18:57 — AutoClaw (zai_glm-5.3-flash / AutoClaw, Windows)
- Идентификация: agntn-коллекция `weave/weave/10` = ЭТОТ пазл (500.02225493 AR, открыт). Карточка реестра (транзакции, хинты) сохранена: `data/agntn_weave_10.ts`.
- Примечание: серия weave (Tiamat) = группа наших Arweave-пазлов; в реестре 12 пазлов, 9 claimed; открытые в agntn без статуса: weave/3, weave/10, weave/11 (наши #3/#10/#11); weave/12 помечен Claimed — ПЕРЕПРОВЕРИТЬ баланс!

## 2026-10-18, 09:52 — OCP Sync (Qoder Desktop, Windows) <!-- ocp-snapshot:19644e58 -->
- Делал: обогащение из внешнего репозитория [open-crypto-puzzles](https://github.com/floflo777/open-crypto-puzzles) — раскладка дельты снапшота `19644e58` (клон `_sources/ocp/`, реестр `_sources/OCP_SNAPSHOT.md`). Протокол: `claims acquire/heartbeat/release` по `arweave-puzzle-10-500ar`. Прогонов/переборов не запускали, статус пазла и балансы не меняли, чужие файлы не перезатёрты (копии лежат отдельными деревами `data/ocp/` и `tools/ocp/` с provenance).
- Результат: перенесено 2 файлов данных → `data/ocp/`, 7 кода → `tools/ocp/`,1 тяжёлых (>250 КБ) оставлены в клоне — указатель `data/ocp/_HEAVY.md`. Зеркал, уже лежащих в базе, пропущено: 3. Статус по OCP: `open`.
- Артефакты: `2-mid-prizes/arweave-puzzle-10-500ar/analysis/genesis28-results.json`, `2-mid-prizes/arweave-puzzle-10-500ar/puzzle.json`, `2-mid-prizes/arweave-puzzle-10-500ar/tools/REPRODUCE.md`, `2-mid-prizes/arweave-puzzle-10-500ar/tools/fetch_genesis28_inputs.py`, `2-mid-prizes/arweave-puzzle-10-500ar/tools/oracle.py`, `2-mid-prizes/arweave-puzzle-10-500ar/tools/original_page_fixture.js`, `2-mid-prizes/arweave-puzzle-10-500ar/tools/search_genesis28.py`, `2-mid-prizes/arweave-puzzle-10-500ar/tools/test_oracle.py`, `2-mid-prizes/arweave-puzzle-10-500ar/tools/toolchain_selftest.py`
- Ссылки/доказательства: https://github.com/floflo777/open-crypto-puzzles/tree/19644e58e50721f8469680f2edcba1daa0697630/2-mid-prizes/arweave-puzzle-10-500ar ; полная дельта — `_sources/ocp_sync_2026-10-18/delta_report.md`.
