# QDay «Steal this vault» (Solana) — реконструкция исходников и read-only аудит

**Дата:** 19.10.2026, 07:15–07:30 UTC (10:15–10:30 МСК)
**Агент:** Qoder Desktop
**Папка:** `puzzles/qday-steal-this-vault-solana/`
**Итог:** эксплойта не найдено; транзакций, трат и операций с ключами не было.

## 1. Что подтверждено он-чейн

Программа `22AEUZtxpbi1ReJGrG9SyFob3uHGzZERERyVNp6uV8Y6` (Bunker). У программы ровно три vault-состояния; challenge-vault — с балансом 1 SOL:

| state PDA | wallet PDA | баланс | root_epoch | next_leaf | executed | cosigner | heir |
|---|---|---|---|---|---|---|---|
| `B21V2LbYVnWTC6yCpCK7cZBpKMe6AQsrFuhWuVFmTXSX` | `CzTEB1SUozi1mGQWsSXA8b6DX7dZjbuFtTKPraU7AvAz` | **1.000000000 SOL** | 0 | 0 | 0 | нет | нет |
| `EfCQ…` | `E58oxo…` | 0.008 SOL + 0.2188 USDC | 1 | 1 | 1 | — | — |
| `FP4n…` | `AkryRV…` | 0.1 SOL | 0 | 0 | 0 | — | — |

Challenge-vault ни разу не подписывал: `next_leaf=0`, `executed_count=0`. Heir-PDA `57LWjNHufNPSphYHtCSn9eZ8AGG7y22gr54WCfXGSwvW` отсутствует. Соответствие state→wallet проверено пересчётом PDA оффлайн (SHA-256 по seeds, проверка on/off-curve).

ProgramData `5QU1pkDVn4pFWiDesNYusTixgxQhnXrFdn8qwbWpTsvw`; upgrade authority `2avsNh9jYxkBxX2BxdsBXAA4UFEmzxZQVADwVM8KBFBp` — обычный Ed25519-ключ (не PDA).

## 2. Реконструкция исходников

GitHub-репозиторий недоступен (404), поэтому исходники восстановлены из штатного source-browser сайта: `/source` отдаёт 105 JS-чанков с картой путей; каждый чанк декодирован Node ESM в `data/src_raw/`. Восстановлены:

- on-chain программа `programs/bunker` (open/execute/rotate/close/inherit/legacy, auth, actions, errors);
- крейты `bunker-lms` (RFC 8554: lms, lmots, params, signer) и `bunker-core` (канонические действия, префикс сообщения, vault_id);
- WASM-биндинги, SDK (`packages/sdk`), CLI и полный набор тестов, включая `attacks.rs` и `regressions.rs`.

Задеплоенный ELF сохранён как `data/program.so` (236 005 байт). Сборка/тесты не запускались — вердикт основан на чтении исходников и тестов, а не на прогоне.

## 3. Проверено и закрыто (отрицательно)

- **Параметры ключа**: жёстко `LMS_SHA256_M32_H10` (type 6) / `LMOTS_SHA256_N32_W4` (type 3), SIG_LEN 2508, ROOT_LEN 48; типкоды сверяются, подмена параметров невозможна.
- **Проверка подписи**: `q == leaf_index` проверяется и до, и после верификации; длина пути Меркла точная; W4-цепочки с доменами и контролем длины; сравнение полного 48-байтного корня (I‖T1).
- **Привязка сообщения**: 83-байтный префикс связывает cluster_id, program_id, tag, state, root_epoch, leaf_index; payload канонический (строгий декод действий).
- **Аккаунты**: все PDA пересчитываются из seeds и stored bump; запрещены алиасы wallet/state/sig_buffer; source токенов — только канонический ATA; получатель проверяется на writable/запрещённость.
- **Листы**: расход листа происходит до CPI (`next_leaf = leaf_index+1`), повтор невозможен; лист 1023 зарезервирован под `rotate`; `init_sig_buffer` подчиняется тем же правилам.
- **`inherit`**: без подписи возможен только при наличии heir-записи и наступившего deadline; у challenge-vault heir-записи нет.
- **`close_vault`**: только по подписи, payload = rent_to; sweep кошелька через invoke_signed; остаток rent уходит rent_to.
- **Ротация**: подписана текущим ключом, новый корень ≠ текущего, epoch+1, next_leaf=0.

## 4. Вывод

Путь «без подписи» к 1 SOL не найден. Приз живой, но для взятия нужна новая логическая ошибка в программе/верификаторе/SDK либо компрометация seed или upgrade-ключа — то есть не «быстрые деньги», а исследовательская задача с низкой вероятностью. Направление закрыто в текущем проходе; мониторинг баланса можно продолжать без транзакций.

## 5. Соблюдение протокола

- Транзакции не отправлялись; ключи не создавались и не трогались; приватных материалов в отчёте нет.
- Все выводы — read-only (RPC `getAccountInfo`/`getProgramAccounts` + оффлайн-декод).
- Подробная запись: `puzzles/qday-steal-this-vault-solana/LOG.md` (19.10 07:15 UTC); краткая — README той же папки.
