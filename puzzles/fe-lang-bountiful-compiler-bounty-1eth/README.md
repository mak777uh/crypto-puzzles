# Bountiful: the Fe compiler bug bounty

Индекс: [MASTER_CATALOG.md](../../MASTER_CATALOG.md) (Части 1-8). Источник данных: [open-crypto-puzzles](https://github.com/floflo777/open-crypto-puzzles).

## Кратко
- Статус: **open** (mid)
- Цепь: ethereum
- Приз: 1 ETH (USD 1880)
- Примечание: the registry holds 1 ETH and each of the 7 registered challenges carries a 0.25 ETH prize, so the pot pays the first 4 claims and the 5th would revert; the 1 ETH balance, not the 1.75 ETH nominal total, is what the chain can pay today
- Опубликовано: 2026-05-04 https://blog.fe-lang.org/posts/bountiful-reloaded/
- Типы: smart-contract, timelock
- Difficulty left: insight
- the 7 contracts are small and their sources are published, so nothing here is compute bound; what is missing is a defect nobody has spotted yet, in a compiler at version 26.1.0 or in about 1,000 lines of hand-written Fe

## Адреса/эскроу
- `0x71fB6afcD98c5BD611712ad4b8D314EF729aa69D` — BountyRegistry, round 3 | expected: 1 ETH | state: funded-unspent (checked 2026-08-17) | https://etherscan.io/address/0x71fB6afcD98c5BD611712ad4b8D314EF729aa69D
- `0x046a3a4968282BaA7ad6291723873C8275434623` — Game | expected: 0 ETH, prize held by the registry | state: zero-balance-contract (checked 2026-08-17) | https://etherscan.io/address/0x046a3a4968282BaA7ad6291723873C8275434623
- `0xE959e7ecA1afCa6cf2Bf8b07e25Da355b6C8E8c7` — Game2D | expected: 0 ETH, prize held by the registry | state: zero-balance-contract (checked 2026-08-17) | https://etherscan.io/address/0xE959e7ecA1afCa6cf2Bf8b07e25Da355b6C8E8c7
- `0xfb5423aDfBAC65ac675845Bb4FEBf8aeC128272E` — GameEnum | expected: 0 ETH, prize held by the registry | state: zero-balance-contract (checked 2026-08-17) | https://etherscan.io/address/0xfb5423aDfBAC65ac675845Bb4FEBf8aeC128272E
- `0x5E987b6aADD4DFC2236D21edE6D07feb04350b06` — GameBitboard | expected: 0 ETH, prize held by the registry | state: zero-balance-contract (checked 2026-08-17) | https://etherscan.io/address/0x5E987b6aADD4DFC2236D21edE6D07feb04350b06
- `0x86B7AEce1503242fED29E593FAEde3b7b00a5a1D` — GameMonadic | expected: 0 ETH, prize held by the registry | state: zero-balance-contract (checked 2026-08-17) | https://etherscan.io/address/0x86B7AEce1503242fED29E593FAEde3b7b00a5a1D
- `0x3dF9789634995546B0126bC28B9F9FcBCB129F18` — GameNested | expected: 0 ETH, prize held by the registry | state: zero-balance-contract (checked 2026-08-17) | https://etherscan.io/address/0x3dF9789634995546B0126bC28B9F9FcBCB129F18
- `0x85b4d0B32b8a285111c244E52524B642f1A5ccFE` — GameTrait | expected: 0 ETH, prize held by the registry | state: zero-balance-contract (checked 2026-08-17) | https://etherscan.io/address/0x85b4d0B32b8a285111c244E52524B642f1A5ccFE

## Источники
- 2026-05-04 — bountiful: reloaded — https://blog.fe-lang.org/posts/bountiful-reloaded/
- 2023-01-11 — bountiful: round #2 — https://blog.fe-lang.org/posts/bountiful-round-2/
- 2026-08-17 — Bountiful platform website with the live challenge list — https://bountiful.fe-lang.org/
- 2026-08-17 — Bounty hunting guide, fe-lang/bountiful — https://github.com/fe-lang/bountiful/blob/master/doc/bounty-hunting-guide.md
- 2026-08-17 — Challenge and registry sources, fe-lang/bountiful — https://github.com/fe-lang/bountiful
- 2025-11-04 — Round 2 admin withdrawal of 3.1 ETH — https://etherscan.io/tx/0xdd5188f6bb7a2fb5fab1b170213c3ad107dab20407e900128525adb92e36077e
- 2026-08-17 — Sourcify verification of the Game challenge, compiler fe 26.1.0 — https://sourcify.dev/server/v2/contract/1/0x046a3a4968282BaA7ad6291723873C8275434623

## Подробности
Здесь должна накапливаться расширенная информация по мере проходов: подсказки, прогресс сообщества, проверенные гипотезы, ссылки, compute-оценки. Текущий файл — скелет из OCP; заполняется автоматически в циклах.


---
## Логирование (обязательно)
См. `../../AGENT_INSTRUCTIONS.md`. Любая значимая находка/прогресс/баланс/решение (полностью или частично) **должна** быть дописана сюда с датой и ссылкой. Параллельные агенты обязаны соблюдать тот же протокол.

## OCP deep docs
- Folder: https://github.com/floflo777/open-crypto-puzzles/tree/main/2-mid-prizes/fe-lang-bountiful-compiler-bounty-1eth
- README (raw): https://raw.githubusercontent.com/floflo777/open-crypto-puzzles/main/2-mid-prizes/fe-lang-bountiful-compiler-bounty-1eth/README.md
## Досье Hark v2 (16.10.2026)

Перенесено из `MASTER_CATALOG_v2_2026-10-16.md` (рабочие досье агентов Hark, 16.10.2026 23:40 МСК). Картина механизма, подсказок, проверенных и отброшенных гипотез, оракулов и файлов.

### B15. Fe «Bountiful» — 1,0 ETH
- **→ Полное актуальное досье (что решено, что проверено, что осталось): ЧАСТЬ 8.6 (Fe Bountiful).** Старая краткая запись заменена.


### B15. Fe «Bountiful» — 1,0 ETH
- **Адрес/сеть**: Ethereum, BountyRegistry `0x71fB6afcD98c5BD611712ad4b8D314EF729aa69D` (round 3, май 2026). **Баланс**: 1,0 ETH, nonce 1. Проверено 14.10 22:05 МСК (до этого 12.10). На контрактах игр 0 ETH: приз держит registry.
- **Контракты игр** (deployments/1_25001932.json):
  - Game `0x046a3a49…4623`, Game2D `0xE959e7ec…c7`, GameBitboard `0x5E987b6a…0b06`, GameEnum `0xfb5423aD…272E`;
  - GameMonadic `0x86B7AEce…1a5a1D`, GameNested `0x3dF97896…9F18`, GameTrait `0x85b4d0B3…ccFE`.
  - Более старый деплой — 1_24648127.json (registry `0x78895d44…597a`).
- **Источники**: https://github.com/fe-lang/bountiful (клон, последний коммит 5137aa4 от 11.06.2026), `doc/bounty-hunting-guide.md`, https://bountiful.fe-lang.org.
- **Механизм**:
  - 7 реализаций «пятнашки» стартуют в нерешаемом состоянии (14/15 переставлены). Нужно, чтобы `isSolved()` стало true через баг компилятора Fe или контракта.
  - Выплата: `lock(address)` с депозитом (по умолчанию **0,01 ETH**), затем `moveField` (требует валидный lock через `validateOwnsLock`), затем `claim()`. **Нужны свои ETH на депозит и газ.**
- **Что установлено** (12.10):
  - все 7 игр на стартовой доске, `isSolved = false` (fe_state.py, publicnode);
  - `Adjacency.lean`: все правила ходов на уровне исходника доказаны равными смежности сетки, так что паритет на уровне исходника не ломается.
- **Проверено и отброшено**:
  - fuzz.py: 2 сида × 600 шагов × 7 игр на байт-идентичном байткоде (py-evm), включая индексы вне диапазона и грязный/короткий calldata — 0 расхождений;
  - fuzz2.py: 150 случайных и почти решённых досок × 7 игр × 16 ходов — 0 расхождений;
  - логика registry просмотрена вручную, изъянов нет.
- **Что осталось / следующий шаг**: дифференциальный фаззинг на уровне IR/ABI (aliasing индексов, упаковка `Challenge`: `is_open` 1 бит + `prize_amount` u128), особенно GameBitboard и GameMonadic. Любой локальный эксплойт потребует согласия Ильи на ~0,01 ETH + газ.
- **Файлы/скрипты**: `/workspace/work/bountiful/` (клон, `onchain_*.hex` — runtime-байткод), `/workspace/work/bountiful_fuzz/` (harness.py, fuzz.py, fuzz2.py, логи), `/workspace/work/bountiful_lean/` (Adjacency.lean, Neg.lean, NOTES.md), `/workspace/work/fe_state.py`.
- **Проекты Hark и статус**: `/workspace/projects/b6983d3d-52f5-48f8-9974-b99dc8e31c55/opportunities.md` (12.10): «ON HOLD, parallel project». ID параллельного проекта в файлах не записан. С 12.10 не трогали.
- **Оценка шансов**: низкие (L по инвентарю), но это одна из немногих задач на код и формальные методы.

## Поправка к каталогу v2 (16.10.2026) — Fe Bountiful B15

**Fe Bountiful B15.** Инвентарь 12.10 называет приз «1 ETH registry (7 × 0.25 ETH challenges)», но 7 × 0,25 ≠ 1,0. Как приз распределён по играм, не проверено (сумма зашита в `Challenge.prize_amount`).

## OCP: машинные данные (puzzles.json, 16.10.2026)

Структурированные данные из `puzzles.json` репозитория [open-crypto-puzzles](https://github.com/floflo777/open-crypto-puzzles) (snapshot OCP: 2026-08-17; цены: {'date': '2026-08-16', 'BTC': 63000, 'ETH': 1880, 'AR': 1.81, 'LTC': 54}).

- `slug`: fe-lang-bountiful-compiler-bounty-1eth
- `title`: Bountiful: the Fe compiler bug bounty
- `status`: **open**
- `tier`: mid | `chain`: ethereum
- `series`: bountiful
- `author`: Fe language team | github:fe-lang, github:cburgdorf, zulip:fe-lang.zulipchat.com
- `prize`: 1 ETH (оценка $1880 на 2026-08-16) — the registry holds 1 ETH and each of the 7 registered challenges carries a 0.25 ETH prize, so the pot pays the first 4 claims and the 5th would revert; the 1 ETH balance, not the 1.75 ETH nominal total, is what the chain can pay today
- `published`: 2026-05-04 https://blog.fe-lang.org/posts/bountiful-reloaded/
- `puzzle_type`: smart-contract, timelock
- `target_format`: a reproducible transaction or calldata sequence against one current challenge or the registry that makes claim(challenge) succeed and transfer the prize; the normal flow requires an active lock, ordinary challenges expose moveField(uint256), Game2D exposes moveField(uint256,uint256), and an exploit may use raw calldata or bypass an expected registry condition
- `difficulty_left`: insight
- `difficulty_note`: the 7 contracts are small and their sources are published, so nothing here is compute bound; what is missing is a defect nobody has spotted yet, in a compiler at version 26.1.0 or in about 1,000 lines of hand-written Fe
- `tested_total`: {'candidates': 0, 'families': 5, 'certified': False}

**Адреса и проверенное состояние:**
- `0x71fB6afcD98c5BD611712ad4b8D314EF729aa69D` — escrow | BountyRegistry, round 3 | ожидается: 1 ETH | проверено 2026-08-17: **funded-unspent**
  - https://etherscan.io/address/0x71fB6afcD98c5BD611712ad4b8D314EF729aa69D
- `0x046a3a4968282BaA7ad6291723873C8275434623` — contract | Game | ожидается: 0 ETH, prize held by the registry | проверено 2026-08-17: **zero-balance-contract**
  - https://etherscan.io/address/0x046a3a4968282BaA7ad6291723873C8275434623
- `0xE959e7ecA1afCa6cf2Bf8b07e25Da355b6C8E8c7` — contract | Game2D | ожидается: 0 ETH, prize held by the registry | проверено 2026-08-17: **zero-balance-contract**
  - https://etherscan.io/address/0xE959e7ecA1afCa6cf2Bf8b07e25Da355b6C8E8c7
- `0xfb5423aDfBAC65ac675845Bb4FEBf8aeC128272E` — contract | GameEnum | ожидается: 0 ETH, prize held by the registry | проверено 2026-08-17: **zero-balance-contract**
  - https://etherscan.io/address/0xfb5423aDfBAC65ac675845Bb4FEBf8aeC128272E
- `0x5E987b6aADD4DFC2236D21edE6D07feb04350b06` — contract | GameBitboard | ожидается: 0 ETH, prize held by the registry | проверено 2026-08-17: **zero-balance-contract**
  - https://etherscan.io/address/0x5E987b6aADD4DFC2236D21edE6D07feb04350b06
- `0x86B7AEce1503242fED29E593FAEde3b7b00a5a1D` — contract | GameMonadic | ожидается: 0 ETH, prize held by the registry | проверено 2026-08-17: **zero-balance-contract**
  - https://etherscan.io/address/0x86B7AEce1503242fED29E593FAEde3b7b00a5a1D
- `0x3dF9789634995546B0126bC28B9F9FcBCB129F18` — contract | GameNested | ожидается: 0 ETH, prize held by the registry | проверено 2026-08-17: **zero-balance-contract**
  - https://etherscan.io/address/0x3dF9789634995546B0126bC28B9F9FcBCB129F18
- `0x85b4d0B32b8a285111c244E52524B642f1A5ccFE` — contract | GameTrait | ожидается: 0 ETH, prize held by the registry | проверено 2026-08-17: **zero-balance-contract**
  - https://etherscan.io/address/0x85b4d0B32b8a285111c244E52524B642f1A5ccFE

**Деривация:**
- the board starts with tiles 14 and 15 swapped, which puts it in the half of the state space the published move rules cannot leave; a successful claim therefore needs a defect in the Fe compiler, in the challenge contract, or in the registry that escapes or bypasses those rules
- оракул: `tools/oracle.py` | сертифицирован: False

**Зацепки (OCP `leads`):**
  - title: re-audit the hand-written data in each challenge: adjacency tables, index arithmetic, bit field offsets | status: open
  - title: differential testing: run random move sequences against each compiled challenge and against a reference implementation, compare after every call | status: open
  - title: GameBitboard and GameTrait are not verified on Sourcify: rebuild them with fe 26.1.0 and compare the runtime bytecode against the deployed code | status: open
  - title: attack the registry rather than a game: claim() closes the challenge before the external isSolved() call and pays with a raw call forwarding all gas | status: open

**Материалы третьих лиц:**
- no third-party articles or dumps; my own blog posts, repository sources and documentation, quoted in short excerpts with links, plus on-chain data I read directly from Ethereum mainnet

**Источники (OCP `sources`):**
  - url: https://blog.fe-lang.org/posts/bountiful-reloaded/ | title: bountiful: reloaded | date: 2026-05-04
  - url: https://blog.fe-lang.org/posts/bountiful-round-2/ | title: bountiful: round #2 | date: 2023-01-11
  - url: https://bountiful.fe-lang.org/ | title: Bountiful platform website with the live challenge list | date: 2026-08-17
  - url: https://github.com/fe-lang/bountiful/blob/master/doc/bounty-hunting-guide.md | title: Bounty hunting guide, fe-lang/bountiful | date: 2026-08-17
  - url: https://github.com/fe-lang/bountiful | title: Challenge and registry sources, fe-lang/bountiful | date: 2026-08-17
  - url: https://etherscan.io/tx/0xdd5188f6bb7a2fb5fab1b170213c3ad107dab20407e900128525adb92e36077e | title: Round 2 admin withdrawal of 3.1 ETH | date: 2025-11-04
  - url: https://sourcify.dev/server/v2/contract/1/0x046a3a4968282BaA7ad6291723873C8275434623 | title: Sourcify verification of the Game challenge, compiler fe 26.1.0 | date: 2026-08-17

## Обновление (2026-10-17, Qoder)

- **Тип**: механика (проверено on-chain + по исходникам) + прогресс аудита + рамки затрат.
- **On-chain константы (read-only eth_call, ethereum-rpc.publicnode.com, 17.10.2026)**:
  - `lock_deposit` = **0.01 ETH** (1e16 wei); баланс registry = **1.0 ETH** (1e18 wei);
  - все 7 игр: `prize_amount` = **0.25 ETH**, `is_open` = true, `is_locked` = false;
  - сумма номиналов призов = 1.75 ETH > баланса 1.0 ETH ⇒ цепь оплатит **первые 4 claim'а**, 5-й ревертнется (TransferFailed при amount > balance).
- **Механика registry (по `contracts/ingots/registry/src/registry.fe`, зафиксирован в `src/registry.fe`)**:
  - `lock(challenge)` — payable, требует `msg.value >= lock_deposit`; лок = `{claimer, valid_until_block = block + 100}` (LOCK_PERIOD=100, shared/lib.fe); пока лок активен, второй лок невозможен.
  - Игры авторизуют ходы через `validateOwnsLock(owner, challenge)` — ходить может только активный держатель лока.
  - `claim(challenge)`: требует активный лок → закрывает челлендж (CEI: state-эффект до внешних вызовов) → static-call `isSolved()` → переводит `prize_amount` вызывающему. **Депозит не возвращается** (остаётся в балансе registry; `withdraw()` админа запрещён, пока есть активные локи).
- **Резюме атаки**: `isSolved()` достижим только через дефект компилятора Fe (26.1.0) или тонкость рукописного Fe (упаковка `unpack_board`/`pack`, StorageMap-границы, индексация), либо дефект в registry/lock-логике. На уровне исходной семантики правила ходов = смежность сетки (Lean-доказательство Adjacency.lean), чётность перестановки — инвариант, легальные ходы не решают стартовую доску (UNSOLVABLE_BOARD = 0x0EFDCBA987654321, 14/15 переставлены).
- **Аудит**: `game.fe` + `game_util.fe` разобраны (дефект не найден на текущем уровне строгости); остаются `game_2d`, `game_bitboard`, `game_enum`, `game_monadic`, `game_nested`, `game_trait`, `games_lib` + сверка deployed-байткода (задача #14: снять runtime для GameBitboard/GameTrait). Полные исходники всех 9 .fe + `registry.fe` + `shared_lib.fe` + `dummy_lock_validator.fe` — в локальной папке `puzzle-research/fe-bountiful/src/`.
- **Стоимость попытки** (когда/если появится гипотеза): 0.01 ETH невозвратный депозит + газ (lock → moveField-серии → claim); свои ETH, **без ОК Ильи ничего не отправляется** (очередь #17). Приз даёт максимум 0.25 ETH минус депозит и газ; суммарный потолок раунда — 1.0 ETH на 4 первых claim'а.
- **Источники**: https://github.com/fe-lang/bountiful (registry.fe / shared/lib.fe / games/*.fe); https://blog.fe-lang.org/posts/bountiful-reloaded/ ; on-chain проверка — read-only `eth_call` (getLockDeposit/getBalance/getPrizeAmount/isOpenChallenge/isLocked) через publicnode RPC.
- **Влияние на оценку**: без изменений; закрыт открытый вопрос «как распределён приз по играм» из поправки v2 (7 × 0.25 = 1.75 номинал против 1.0 ETH баланса).

## Обновление (2026-10-17, часть 2, Qoder) — аудит ЗАВЕРШЁН, байткод сверен, эксплойт не найден

- **Тип**: прогресс аудита (полный) + сверка байткода (закрытие Sourcify-лида) + инструментарий для будущих агентов.
- **Главный результат: все 8 deployed-контрактов байт-в-байт совпадают со свежей сборкой fe 26.1.0 из опубликованных исходников.**
  - Скачан официальный бинарник `fe_windows_amd64.exe` v26.1.0 (релиз argotorg/fe от 2026-04-30, 48 670 208 байт; fe переехал с fe-lang/fe на github.com/argotorg/fe). Работает на Windows напрямую.
  - Клон `github.com/fe-lang/bountiful`; коммит деплоя раунда 3 — `d5e2ce3` (01.05.2026, deployments/1_25001932.json); после него `contracts/` НЕ менялся (проверено `git log d5e2ce3..HEAD -- contracts/` — пусто), так что сборка с HEAD тождественна деплойной.
  - `fe build` в `repo/contracts/` → `out/*.runtime.bin`; сравнение с `eth_getCode` (публичный RPC): **BountyRegistry 5909B, Game 2409B, Game2D 2234B, GameBitboard 2145B, GameEnum 2617B, GameMonadic 4389B, GameNested 3535B, GameTrait 3148B — все MATCH, 0 различий**.
  - ⇒ **Sourcify-пробел (GameBitboard/GameTrait не верифицированы) закрыт**: это тулинг-пропуск, не признак иного компилятора/модификации. Deployed-код = детерминированный вывод fe 26.1.0 из тех самых исходников, которые были построчно аудированы.
- **Полный аудит исходников завершён**: все 7 игр + registry + shared (game_util/ADJACENCY, shared_lib, dummy_lock_validator) разобраны; таблицы смежности сверены с референсом; дефекта нет. Локальные копии src/ идентичны репо (modulo CRLF).
- **Симуляционный инструментарий на publicnode RPC (ключевое открытие, всё бесплатно, без трат):**
  - **`eth_simulateV1` работает на ethereum-rpc.publicnode.com**: ровно 2 параметра `[payload,'latest']`, `stateOverrides` — **Geth-формат `state`/`stateDiff` (НЕ `storage`; третьего параметра нет; ответ — массив блоков, `.calls[]`)**. `stateDiff` накладывается поверх реального состояния; `code`-override тоже работает; `eth_call` с третьим параметром в том же формате — тоже.
  - **Результаты проверок (все на deployed-байткоде):**
    - T3: claim на решённой доске + фейковый лок → **выплата подтверждена** (balance 1.0→0.75);
    - T4: claim на всех 7 реальных нерешённых досках с фейковым локом → **все revert, баланс 1.0** (лид «атака на registry» ЗАКРЫТ);
    - T5: isSolved на 27 досках × 7 игр = 189 тестов → **0 расхождений** с JS-моделью;
    - T6: moveField(16)/(2^200+16), getBoard OOB → все revert;
    - S1: near-solved доска + dummy-валидатор → ход → isSolved=true, клетки верны — **все 7 игр**;
    - S2: walk по 6 легальных ходов × 7 игр — **клетки после каждого хода = JS-модель, 0 аномалий**;
    - S3: 121×2 случайных calldata на GameBitboard и BountyRegistry → **все отклонены** (нет скрытых entry points/re-init);
    - S4: claim(незарегистрированный) → revert;
    - **S5 (золотой стандарт): полный реальный флоу dry-run на GameBitboard — `lock(0.01 ETH)` → `moveField(15)` → `claim` → выплата, balance 1.0→0.76; повторный claim revert; isOpen=false.** Готовый шаблон для тестирования любой будущей гипотезы бесплатно.
  - Также попутно: codesize dummy-валидатора НЕ проверяется (вызов на адрес без кода проходит); slot0 всех игр = registry (lock_validator).
- **Вывод**: дефекта нет ни на уровне исходников, ни в поведении deployed-байткода (26+ проверок). Единственная оставшаяся теоретическая поверхность — genuine баг codegen fe 26.1.0, невидимый для всего этого набора тестов; при появлении гипотезы — сначала бесплатный dry-run через `sim_harness2.mjs`, траты (0.01 ETH депозит) только с ОК Ильи.
- **Файлы/артефакты** (в `puzzle-research/fe-bountiful/`): `tools/fe_windows_amd64_v26.1.0.exe` (компилятор), `repo/` (клон), `repo/contracts/out/*.runtime.bin` (сборка), `byte_compare.mjs` (+лог), `sim_harness.mjs`/`sim_harness2.mjs` (+логи `sim_*_run*.log`), `sim_bisect.mjs`, `sim_probe3.mjs`; копии ключевых логов — в `data/` этой папки.
- **Источники**: https://github.com/argotorg/fe/releases/tag/v26.1.0 (бинарник fe 26.1.0); https://github.com/fe-lang/bountiful (коммит деплоя d5e2ce3); https://fe-lang.org/getting-started/installation/ (feup); on-chain сверка — `eth_getCode` + `eth_simulateV1` (проверено да, read-only).
