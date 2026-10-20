# LOG.md — журнал «fe-lang-bountiful-compiler-bounty-1eth»

> Формат ведения: см. `../../AGENT_INSTRUCTIONS.md`. Записи добавляются в конец; чужое не затирать.

## 2026-10-17, 18:48 — AutoClaw (модель zai_glm-5.3-flash, среда AutoClaw/Windows, проект «Default»)
- Бэкфилл: заведение журнала по протоколу (папка существовала с досье от 16.10.2026, LOG.md не был заведён).
- Тип объекта: пазл. Состояние папки: README 25628 байт (обогащённое досье), файлов 2, data/=есть, tools/=нет.
- Кратко из README: статус open; приз 1 ETH (USD 1880); типы smart-contract, timelock; остаток-сложность insight.
- Адрес/эскроу: n/a
- Источники: https://blog.fe-lang.org/posts/bountiful-reloaded/
- Вся история и досье — в README.md этой папки; новые сессии описывать здесь (self-intro, что делал, результаты вкл. отрицательные, артефакты, ссылки).

## 2026-10-18, 09:52 — OCP Sync (Qoder Desktop, Windows) <!-- ocp-snapshot:19644e58 -->
- Делал: обогащение из внешнего репозитория [open-crypto-puzzles](https://github.com/floflo777/open-crypto-puzzles) — раскладка дельты снапшота `19644e58` (клон `_sources/ocp/`, реестр `_sources/OCP_SNAPSHOT.md`). Протокол: `claims acquire/heartbeat/release` по `fe-lang-bountiful-compiler-bounty-1eth`. Прогонов/переборов не запускали, статус пазла и балансы не меняли, чужие файлы не перезатёрты (копии лежат отдельными деревами `data/ocp/` и `tools/ocp/` с provenance).
- Результат: перенесено 5 файлов данных → `data/ocp/`, 1 кода → `tools/ocp/`,0 тяжёлых (>250 КБ) оставлены в клоне — указатель `data/ocp/_HEAVY.md`. Зеркал, уже лежащих в базе, пропущено: 0. Статус по OCP: `open`.
- Артефакты: `2-mid-prizes/fe-lang-bountiful-compiler-bounty-1eth/README.md`, `2-mid-prizes/fe-lang-bountiful-compiler-bounty-1eth/analysis/leads.md`, `2-mid-prizes/fe-lang-bountiful-compiler-bounty-1eth/analysis/tested.md`, `2-mid-prizes/fe-lang-bountiful-compiler-bounty-1eth/data/challenges.json`, `2-mid-prizes/fe-lang-bountiful-compiler-bounty-1eth/puzzle.json`, `2-mid-prizes/fe-lang-bountiful-compiler-bounty-1eth/tools/oracle.py`
- Ссылки/доказательства: https://github.com/floflo777/open-crypto-puzzles/tree/19644e58e50721f8469680f2edcba1daa0697630/2-mid-prizes/fe-lang-bountiful-compiler-bounty-1eth ; полная дельта — `_sources/ocp_sync_2026-10-18/delta_report.md`.

## 2026-10-19, 10:50 МСК — Qoder Desktop — аудит исходников Fe Bountiful (без прогона, без транзакций)
- **Что читал:** `data/shared_lib.fe`, `game.fe`, `game_2d.fe`, `game_enum.fe`, `game_bitboard.fe`, `game_monadic.fe`, `game_nested.fe`, `game_trait.fe`, `game_util.fe`, `registry.fe`; плюс `data/byte_compare_2026-10-17.txt` и логи прежних harness'ов.
- **Сборка vs цепь:** все 8 контрактов (registry + 7 игр) совпадают с deployed байт-в-байт (лог 17.10), т.е. расхождения «опубликованный исходник ≠ цепь» нет — эта ветка закрыта.
- **Логика игр:** во всех 7 вариантах ход — транспозиция плитки с единственной пустой клеткой, проверка смежности корректна (таблица `ADJACENCY` сверена вручную, 0:[1,4] … 15:[11,14]); число пустых клеток инвариантно 1; стартовая доска `0x0EFDCBA987654321` (14/15 переставлены) имеет нечётную перестановку и по чётности недостижима из решённой. Легальными ходами `isSolved()` не достигается ни в одной игре — это подтверждает прежний Lean-вывод.
- **Найденные дефекты (read-only, не дают claim):**
  - `Game2D.GetBoard(row,col)` не проверяет `row/col < 4` — возможное чтение за границей массива;
  - `GameEnum.GetBoard(index)` не проверяет `index < 16` — то же;
  - `GameEnum/Game/Monadic/Bitboard`: ветка `empty_idx = 16` достижима только при отсутствии нуля, а он инвариантен, поэтому OOB-запись `board[16]` недостижима.
  Ни один из дефектов не позволяет изменить доску или обойти `isSolved()`.
- **Registry:** `claim` соблюдает CEI (закрывает челлендж до внешнего `isSolved`), требует активный лок владельца, платит `prize_amount`; повторный claim ревертится; реентранси не даёт второй выплаты (внутренний revert ловится, но состояние уже закрыто); `withdraw` только admin и только без активных локов. Дефекта не нашёл.
- **Вывод:** руками написанного бага, дающего solve/claim, нет; остаётся только дефект компилятора Fe 26.1.0, для которого нужен локальный build + дифференциальный фаззинг (часы) и, при удаче, 0.01 ETH депозита + газ (только с письменного ОК Ильи). Быстрых денег здесь нет; приоритет снимаю.
- Прогонов, трат, транзакций и обращений к автору не было. Артефактов не создано.
- [2026-10-19 14:32Z] Qoder — независимая ETH он-чейн сверка. BountyRegistry round 3 `0x71fB6AfcD98c5BD611712ad4b8D314EF729aa69D` — **1.000000 ETH**, контракт с кодом; на контрактах игр 0 ETH (приз держит реестр) — подтверждено напрямую. `0xaD0Ad88D…` 2.001812 ETH — EOA-деплойер (админ), **не приз**. Механика требует депозита 0.01 ETH и газа от решателя: это трата → только с письменного ОК Ильи, до него пазл остаётся в мониторинге.
