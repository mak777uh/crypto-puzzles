# LOG.md — журнал «luckylurker-seed-riddles-80ksats»

> Формат ведения: см. `../../AGENT_INSTRUCTIONS.md`. Записи добавляются в конец; чужое не затирать.

## 2026-10-17, 18:48 — AutoClaw (модель zai_glm-5.3-flash, среда AutoClaw/Windows, проект «Default»)
- Бэкфилл: заведение журнала по протоколу (папка существовала с досье от 16.10.2026, LOG.md не был заведён).
- Тип объекта: пазл. Состояние папки: README 5430 байт (скелет из OCP — требует обогащения), файлов 1, data/=нет, tools/=нет.
- Кратко из README: статус solved; приз 80000 sats (USD 50); типы bip39-seed, word-selection, text-cipher; остаток-сложность none.
- Адрес/эскроу: bc1q32e3dxcd0n2tlzdmchraf2057d0ax4xdwrk3jq
- Источники: https://luckylurker.com/bitcoin-vault/
- Вся история и досье — в README.md этой папки; новые сессии описывать здесь (self-intro, что делал, результаты вкл. отрицательные, артефакты, ссылки).

## 2026-10-17 18:52 — Big Pickle (big-pickle / OpenCode, Windows) — сбор данных в пустую папку
- Делал: массовый обход README → источники; попыток 8, сохранено 1 в `data/`.
- Успех (1): 00_README.md
- Отказ (7): https://raw.githubusercontent.com/floflo777/open-crypto-puzzles/main/4 [FAIL: HTTP Error 404: Not Found | jina: ]; https://raw.githubusercontent.com/floflo777/open-crypto-puzzles/main/4 [FAIL: HTTP Error 404: Not Found | jina: ]; https://github.com/floflo777/open-crypto-puzzles [FAIL: IncompleteRead(327680 bytes read) ]; https://luckylurker.com/bitcoin-vault/ [FAIL: Remote end closed connection witho]; https://luckylurker.com/crypto-casinos-guide/ [FAIL: Remote end closed connection witho]; https://luckylurker.com/casino/gamdom/ [FAIL: Remote end closed connection witho]; https://luckylurker.com/casino/n1/ [FAIL: Remote end closed connection witho]
- Артефакты: `data/SOURCES.md` + скачанные файлы.
- Проверено: да (HTTP-статус/байты); содержательная разборка — следующим шагом.

## 2026-10-18, 09:52 — OCP Sync (Qoder Desktop, Windows) <!-- ocp-snapshot:19644e58 -->
- Делал: обогащение из внешнего репозитория [open-crypto-puzzles](https://github.com/floflo777/open-crypto-puzzles) — раскладка дельты снапшота `19644e58` (клон `_sources/ocp/`, реестр `_sources/OCP_SNAPSHOT.md`). Протокол: `claims acquire/heartbeat/release` по `luckylurker-seed-riddles-80ksats`. Прогонов/переборов не запускали, статус пазла и балансы не меняли, чужие файлы не перезатёрты (копии лежат отдельными деревами `data/ocp/` и `tools/ocp/` с provenance).
- Результат: перенесено 2 файлов данных → `data/ocp/`, 1 кода → `tools/ocp/`,0 тяжёлых (>250 КБ) оставлены в клоне — указатель `data/ocp/_HEAVY.md`. Зеркал, уже лежащих в базе, пропущено: 1. Статус по OCP: `solved`.
- Артефакты: `4-solved/luckylurker-seed-riddles-80ksats/data/hints.csv`, `4-solved/luckylurker-seed-riddles-80ksats/puzzle.json`, `4-solved/luckylurker-seed-riddles-80ksats/tools/oracle.py`
- Ссылки/доказательства: https://github.com/floflo777/open-crypto-puzzles/tree/19644e58e50721f8469680f2edcba1daa0697630/4-solved/luckylurker-seed-riddles-80ksats ; полная дельта — `_sources/ocp_sync_2026-10-18/delta_report.md`.

## 2026-10-19, 13:1x МСК — Qoder (Qoder Desktop, Windows) — 79 638 сат на 17oKQH… : кошелёк решателя, не приз
- Делал: он-чейн сверка адреса приза и адреса-получателя. Бронь `claims.py acquire luckylurker-seed-riddles-80ksats --agent Qoder`. Только чтение, трансляций нет.
- Результат: `bc1q32e3dxcd0n2tlzdmchraf2057d0ax4xdwrk3jq` (приз 80 000 сат) — funded 80 000 = spent 80 000, баланс **0**. Свип 17.08.2026 tx `75e570a5ea243c492e2804916482f046b2392b463c51be15624e6e25a84119f7` вывел 79 638 сат на `17oKQHHRxdQBiRaGKCoVDQJfebhPaZV3r7` + 362 сат комиссии (досье vault-1, строка 56). Значит 17oKQH… — **адрес получателя, кошелёк решателя**, а не «пополненный приз».
- Вывод: §5 не выполняется (паук снят, стадия не открывалась заново); папка остаётся в `solved/`. Баланс 79 638 сат помечен `not-ours` в `puzzles/dead-ends-registry/README.md`, чтобы следующие агенты не тратили проход и не пробовали «извлечь».
- Ссылки: https://blockstream.info/api/ (read-only, 2026-10-19), правило переноса: `../../AGENT_INSTRUCTIONS.md` §5 «Зона solved/»; https://blockstream.info/address/bc1q32e3dxcd0n2tlzdmchraf2057d0ax4xdwrk3jq
