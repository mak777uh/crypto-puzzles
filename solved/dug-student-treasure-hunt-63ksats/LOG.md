# LOG.md — журнал «dug-student-treasure-hunt-63ksats»

> Формат ведения: см. `../../AGENT_INSTRUCTIONS.md`. Записи добавляются в конец; чужое не затирать.

## 2026-10-17, 18:48 — AutoClaw (модель zai_glm-5.3-flash, среда AutoClaw/Windows, проект «Default»)
- Бэкфилл: заведение журнала по протоколу (папка существовала с досье от 16.10.2026, LOG.md не был заведён).
- Тип объекта: пазл. Состояние папки: README 10674 байт (обогащённое досье), файлов 1, data/=нет, tools/=нет.
- Кратко из README: статус solved; приз 63216 sats (USD 40); типы bip39-seed, text-cipher; остаток-сложность none.
- Адрес/эскроу: bc1qych2me6h85j38s3xmfwdkcvpqakpld3yr2y5ss
- Источники: https://njump.me/npub1zrmu0amjmkynxlxgmdsyrjmp8vhxdz8ch5vja9vh9ym4natg8k5s8ge9wx
- Вся история и досье — в README.md этой папки; новые сессии описывать здесь (self-intro, что делал, результаты вкл. отрицательные, артефакты, ссылки).

## 2026-10-17 18:50 — Big Pickle (big-pickle / OpenCode, Windows) — сбор данных в пустую папку
- Делал: массовый обход README → источники; попыток 8, сохранено 5 в `data/`.
- Успех (5): 00_README.md; 01_npub1zrmu0amjmkynxlxgmdsyrjmp8vhxdz8ch5vja9vh9ym4n.html; 02_README.md; 03_dug.html; 04_dug.md
- Отказ (3): https://raw.githubusercontent.com/floflo777/open-crypto-puzzles/main/4 [FAIL: HTTP Error 404: Not Found | jina: ]; https://raw.githubusercontent.com/floflo777/open-crypto-puzzles/main/4 [FAIL: HTTP Error 404: Not Found | jina: ]; https://github.com/floflo777/open-crypto-puzzles [FAIL: IncompleteRead(327680 bytes read) ]
- Артефакты: `data/SOURCES.md` + скачанные файлы.
- Проверено: да (HTTP-статус/байты); содержательная разборка — следующим шагом.

## 2026-10-18, 09:52 — OCP Sync (Qoder Desktop, Windows) <!-- ocp-snapshot:19644e58 -->
- Делал: обогащение из внешнего репозитория [open-crypto-puzzles](https://github.com/floflo777/open-crypto-puzzles) — раскладка дельты снапшота `19644e58` (клон `_sources/ocp/`, реестр `_sources/OCP_SNAPSHOT.md`). Протокол: `claims acquire/heartbeat/release` по `dug-student-treasure-hunt-63ksats`. Прогонов/переборов не запускали, статус пазла и балансы не меняли, чужие файлы не перезатёрты (копии лежат отдельными деревами `data/ocp/` и `tools/ocp/` с provenance).
- Результат: перенесено 2 файлов данных → `data/ocp/`, 1 кода → `tools/ocp/`,0 тяжёлых (>250 КБ) оставлены в клоне — указатель `data/ocp/_HEAVY.md`. Зеркал, уже лежащих в базе, пропущено: 1. Статус по OCP: `solved`.
- Артефакты: `4-solved/dug-student-treasure-hunt-63ksats/clues/author-posts.md`, `4-solved/dug-student-treasure-hunt-63ksats/puzzle.json`, `4-solved/dug-student-treasure-hunt-63ksats/tools/oracle.py`
- Ссылки/доказательства: https://github.com/floflo777/open-crypto-puzzles/tree/19644e58e50721f8469680f2edcba1daa0697630/4-solved/dug-student-treasure-hunt-63ksats ; полная дельта — `_sources/ocp_sync_2026-10-18/delta_report.md`.
