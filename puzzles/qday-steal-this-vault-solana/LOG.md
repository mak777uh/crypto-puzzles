# LOG.md — журнал «qday-steal-this-vault-solana»

> Формат ведения: см. `../../AGENT_INSTRUCTIONS.md`. Записи добавляются в конец; чужое не затирать.

## 2026-10-17, 18:48 — AutoClaw (модель zai_glm-5.3-flash, среда AutoClaw/Windows, проект «Default»)
- Бэкфилл: заведение журнала по протоколу (папка существовала с досье от 16.10.2026, LOG.md не был заведён).
- Тип объекта: пазл. Состояние папки: README 6418 байт (обогащённое досье), файлов 1, data/=нет, tools/=нет.
- Кратко из README: статус open; приз приз внутри программы (сумма не зафиксирована); типы smart-contract, exploit; остаток-сложность n/a.
- Адрес/эскроу: n/a
- Источники: https://beforeqday.com/challenge
- Вся история и досье — в README.md этой папки; новые сессии описывать здесь (self-intro, что делал, результаты вкл. отрицательные, артефакты, ссылки).

## 2026-10-17 18:52 — Big Pickle (big-pickle / OpenCode, Windows) — сбор данных в пустую папку
- Делал: массовый обход README → источники; попыток 3, сохранено 3 в `data/`.
- Успех (3): 00_22AEUZtxpbi1ReJGrG9SyFob3uHGzZERERyVNp6uV8Y6.html; 01_challenge.html; 02_source.html
- Отказ (0): —
- Артефакты: `data/SOURCES.md` + скачанные файлы.
- Проверено: да (HTTP-статус/байты); содержательная разборка — следующим шагом.

## 2026-10-19 07:15–07:30 UTC — Qoder Desktop (Windows) — реконструкция исходников + аудит программы, он-чейн факты
- Что делал: страница `/source` отдаёт код не одним файлом, а 105 отдельными JS-чанками (по одному на файл). Скачал и декодировал их в `data/src_raw/` — это полный исходник on-chain программы (`programs/bunker/**`), библиотек `crates/bunker-lms`, `crates/bunker-core`, WASM, SDK (`packages/sdk`), CLI и **тестов атак** (`tests/bunker/attacks.rs`, `regressions.rs`). Отдельно снял задеплоенный ELF: ProgramData `5QU1pkDVn4pFWiDesNYusTixgxQhnXrFdn8qwbWpTsvw` → `data/program.so` (236 005 Б, enum=ProgramData, slot 454 696 354, upgrade authority `2avsNh9jYxkBxX2BxdsBXAA4UFEmzxZQVADwVM8KBFBp`, Ed25519 on-curve).
- Он-чейн (mainnet, RPC slot ≈458 749 040, 19.10 07:24 UTC): программа `22AEUZ…6uV8Y6` исполняемая; **всего 3 vault-состояния** (`getProgramAccounts`, dataSize=280):
  - `B21V2LbYVnWTC6yCpCK7cZBpKMe6AQsrFuhWuVFmTXSX` → wallet `CzTEB1SUozi1mGQWsSXA8b6DX7dZjbuFtTKPraU7AvAz`, **1.000000000 SOL**, root_epoch 0, next_leaf 0, executed_count 0, cosigner нет, heir-PDA `57LWjNHufNPSphYHtCSn9eZ8AGG7y22gr54WCfXGSwvW` **не существует**. Это и есть challenge-vault: ни одной подписи он не делал.
  - `EfCQYAyFhSdB9UoW2Wt9ACz6KoWgiNAUH1gPErWtKXT4` → wallet `E58oxo…Skmk`, 0.008 SOL + 0.2188 USDC, next_leaf 1, executed_count 1 (один демо-execute).
  - `FP4nSn7Sdwee9RghFCwHa3CYKMefha1SCuNVnEppBTtJ` → wallet `AkryRV…heme`, 0.1 SOL, next_leaf 0, executed_count 0.
  - Для всех трёх `vault_id == SHA-256("BUNKER/vault-id/v1" ‖ root ‖ options_v1)` — состояние консистентно с открытием.
- Что проверил в коде (отрицательно, эксплойта не нашёл):
  - верификатор LMS/LM-OTS соответствует RFC 8554: параметры жёстко H10/W4 (типкоды в подписи сверяются), `q` сверяется с `leaf_index` дважды, длина подписи ровно 2508, путь ровно 10×32, `q < 1024`; домены D_MESG/D_LEAF/D_INTR/D_PBLC и checksum W4 структурно совпадают с RFC (тест-векторы в `crates/bunker-lms/src/tests` есть, но сборку/тесты не запускал);
  - префикс сообщения (83 Б) связывает cluster=4, program_id, tag, state, root_epoch и leaf_index; payload строгий канонический (1..8 действий, без trailing bytes), каждое действие проверяется;
  - PDA state/wallet/sigbuf/heir пересчитываются из данных и bump; `next_leaf` потребляется до CPI; последний лист 1023 зарезервирован под rotate; повтор листа запрещён;
  - действия не могут платить на wallet/state/sig_buffer, source — только канонический ATA, token program только SPL/Token-2022, transfer-hook минтинг отклоняется; `check_wallet_rent` после всех действий;
  - `inherit` без подписи возможен только при существующей heir-записи и наступившем deadline; у challenge-vault heir-записи нет, а `execute`=0, значит SetHeir никогда не вызывался;
  - `close_vault`/`rotate` требуют валидную LMS-подпись; upgrade authority — обычный Ed25519-ключ команды, не PDA.
- Оценка: поверхность «без подписи» (`open_vault`, `init/write/close_sig_buffer`, `inherit`) не даёт пути к 1 SOL challenge-vault. Единственные оставшиеся классы — новая логическая ошибка в программе/верификаторе (в этом проходе не найдена) либо компрометация seed/upgrade-ключа команды. Вероятность низкая; приз живой, но «быстрым» этот путь не является.
- Ограничения: транзакций не отправлял, ключей/seed не трогал, трат не было. Не аудировал глубоко клиентский SDK/app на предмет подмены отображаемого сообщения (команда этот vault не подписывает, поэтому практического вектора не видно).
- Артефакты: `data/src_raw/**` (105 файлов), `data/program.so`, `data/vaults.json`, `data/pd.json`, `data/src_map.json`, `data/src_chunks/**`.
- Ссылки: https://beforeqday.com/challenge ; https://beforeqday.com/source ; https://solscan.io/account/22AEUZtxpbi1ReJGrG9SyFob3uHGzZERERyVNp6uV8Y6
