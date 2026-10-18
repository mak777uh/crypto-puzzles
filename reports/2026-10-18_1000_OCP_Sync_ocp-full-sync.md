# Отчёт прохода: синхронизация open-crypto-puzzles → master (полный перенос дельт)

- Дата/время: 2026-10-18, ~13:35 (локальное), агент **OCP Sync** (Qoder Desktop, Windows)
- Задача (поставил Илья 18.10): изучить https://github.com/floflo777/open-crypto-puzzles (**OCP**),
  проверить, есть ли там загадки, которых нет в `master` (**MASTER**), и перенести всю новую
  информацию по уже имеющимся пазлам.
- Решения Ильи по ходу: (1) полный клон с картинками и WARC; (2) genesis закрыть и перенести в
  `solved/` с прописанием инсайта; (3) просроченные брони AutoClaw перехватить и дописать LOG.
- Прогонов/переборов НЕ запускали, транзакций/трат/писем авторам/публикаций сидов нет.

## 1. Ответы на оба вопроса

**Новых пазлов в OCP нет.** 38 пазловых сущностей OCP (тиры `1-big-prizes` 7, `2-mid-prizes` 18,
`3-small-prizes` 2, `4-solved` 11) отображаются 1-в-1 на наши папки; единственная «непара» —
`4-solved/caesarcoder-genesis-block-wallet-puzzle-947ksats`, и это переименованный наш
`puzzles/genesis-block-wallet-puzzle-142ksats` (см. п. 3). Служебное (`archive/dead-ends` 11 записей,
`engines/` 6 CUDA-движков, `tools/`, `docs/`, `schema/`, `puzzles.json`) — новых объектов не даёт,
но даёт полезные негатив-реестры и индексы (см. п. 5, 6). Проверка completeness: `python
tools/ocp_delta_scan.py verify` → «сущностей 38 | без следа синхронизации 0 | unmapped 0».

**Главная новая информация — genesis решён и свипнут** (п. 3). Дельты по остальным пазлам локальны:
реестры негативов, witnessed-свипы, датасеты, сертифицированные оракулы (п. 4). По
`wealth-in-poetry`, `aoi-quizchain`, `bitaps-shamir`, `peter-todd`, `smith-lyle-moore` мы впереди OCP —
там только артефакты (oracle.py, дампы), не факты.

## 2. Снапшот репозитория

- Клон: `_sources/ocp/` (HEAD `19644e58e50721f8469680f2edcba1daa0697630`, main, 474 blob,
  49,7 МБ на диске вместе с `.git`; последний коммит репо 2026-10-17T23:38:02Z, история 138 коммитов).
- Реестр снапшотов и правила инкрементальной следующей синхронизации: `_sources/OCP_SNAPSHOT.md`
  (дельта считается от PREV_SNAPSHOT_SHA через `git diff --name-status`, хеши берутся из
  `git ls-tree`, а не из ФС — защита от OneDrive-гидрации).
- `.git` клона сохранён (нужен для `git fetch`), в индекс MASTER не попал: `_sources/ocp/` добавлен
  в `.git/info/exclude` (чужой `.gitignore` не трогали).
- Свежие issues/PR OCP: `_sources/OCP_ISSUES_2026-10-18.json` + триаж
  `#46` (претензия автора по GSMG: 80-байтовые локи не могут содержать один raw-ключ, oracle.py
  пропускает hex — зафиксировано как **неподтверждённый тезис автора**, не как факт), `#45`, `PR #44`
  (решение genesis). Снапшот issues от 17.10 не переписан.
- Конфликт-копий OneDrive (`*Conflict*`) не найдено; повторная проверка после записи артефактов — чисто.
  Гидрация: `attrib +p` на `_sources/ocp/**` и зеркала, затем полное пофайловое чтение 502 файлов
  (49,7 МБ) — 0 ошибок/0 пустых.

## 3. Genesis Block Wallet: закрыт (главная находка)

- On-chain-подтверждение **нашим вистом**, а не со ссылкой на OCP: `bc1qfkhx02…` — 120 funded /
  120 spent, баланс 0 (mempool.space address API, 18.10). Свип: 2026-10-17 03:40:20 UTC, блок 971803,
  tx `1c70c474…`, нетто 935 266 сат (финальный приз 947 620 сат — расхождение с «947 220» из наших старых
  записей объяснено и примирено в LOG).
- Механика: entropy = первые 128 бит `sha256(raw hex genesis, байты 263…400)` → 12 слов BIP39 →
  passphrase «Satoshi Nakamoto» → BIP48 `m/48'/0'/1231006505'/2'/0/0`; **PBKDF2-HMAC-SHA512
  rounds = 181505** (соавтор A, fingerprint `0852014c` ≈ 18:15:05) и **200913** (B, `040e2791` ≈
  дата генезиса) вместо канонических 2048. Автор — CaesarCoder (PR #44, Schum-io); его post-sweep
  OP_RETURN: «My GPU searched everywhere except the PBKDF2 settings».
- Честная фиксация нашего провала: 78 347 016 кандидатов + ~175 тыс. прогонов оракула — все при
  rounds=2048, то есть решётка не покрывала реальное пространство; постфактум это объясняет и наш
  «ppZ-парадокс» (смена настроек между прогонами автора).
- Сделано: `git mv puzzles/genesis-block-wallet-puzzle-142ksats → solved/caesarcoder-genesis-block-wallet-puzzle-947ksats`
  (вся наша работа ушла целиком, ничего не удалено); append в `LOG.md` (2 записи: служебная раскладка +
  разбора решения); «Обновление (2026-10-18, OCP Sync) — Тип: решение» в `README.md`; артефакты
  `tools/ocp/verify_solution.py`, `tools/ocp/REPRODUCE.md`, `data/ocp/data/on-chain-dialogue.json`
  (123 tx), `data/ocp/clues/author-posts.md`, `data/ocp/analysis/2026-09-05/*.json` + `SOURCE.md`.
  Сид/фразу в README/LOG не дублируем (приз снят третьей стороной; указатель на
  `data/ocp/puzzle.json → solutions[0].answer`, `key_material_disclosed: true`).
- Индексы: `solved/INDEX.md` (строка есть), `puzzles/README.md` (перечёркнуто → `solved/`),
  `MASTER_CATALOG.md` (статус в A2 + OCP-путь + машинная таблица + Часть 8 + алиас B41 +
  стратегическая таблица), `WAKE_QUEUE.md` (genesis снят из активных).

## 4. Дельты по существующим пазлам: что перенесено

Компаратор `tools/ocp_delta_scan.py` (scan/apply/verify; git-blob SHA256-сверка с нормализацией
LF/CRLF и canonical-JSON; статусы PRESENT / PRESENT-NORM / COVERED-TEXT / PARTIAL-TEXT / MISSING;
самопроверка «учтено 474 из 474 blob»). Отчёт: `_sources/ocp_sync_2026-10-18/delta_report.{md,json}`.

- Статусы файлов: `MISSING 294`, `PRESENT-NORM 88`, `PRESENT 20`, `PARTIAL-TEXT 1`.
- Раскладка: **276 копий + 14 ссылок на тяжёлые файлы (>250 KB)** по 37 папкам, `PENDING-CLAIM: 1`
  (см. п. 7). Схема: данные OCP → `puzzles/<slug>/data/ocp/<путь>`, чужой код →
  `puzzles/<slug>/tools/ocp/<путь>`, в каждой папке `SOURCE.md` (commit/blob/path/url/pulled/agent);
  тяжёлое — ссылкой `_HEAVY.md` в клон; старые частичные зеркала не переименовывались.
  Итого зеркал: 235 файлов в `data/ocp/`, 121 в `tools/ocp/`, 22 `SOURCE.md`.
- Приоритетное содержимое: негатив-реестры B1–B16 (~330 млн проверок) и witnessed H1–H4 по
  arweave-3/10/11, `genesis28-results.json`, `geometry.json`, задокументированный баг их оракула;
  `mechanism.md`/`contracts.csv` по teikhos; `lots.csv`, `pow-nonce-best.csv`, `pow_nonce_search.c`
  по keir-finlow-bates; `coverage.csv` по corey-phillips; `format-fork.json` (опровергнутые якоря)
  по blm; `card-faces.json` по ballet-bobby-lee (секреты одной карты не светим — только указатель);
  exitonly-14, crypto-puzzles-2018-2, path-to-greatness и др.
- Служебное в `tools/ocp/`: `check_escrows.py`, `derive.py`, `validate.py` + `README.md`
  (provenance и как запускать из клона); `build_index.py` намеренно не копировали. Шесть CUDA-движков
  OCP — только указатель `tools/ocp_engines_README.md` (secp256k1_hash160 9,3M кл/с; bip39_passphrase
  220–790k/с; electrum_v1 58,8k/с; pzl3/arweave_var ~251k/с; p2wsh_2of2_pairs 1,95e9 пар/с) с явной
  пометкой «не собирать и не запускать без отдельного решения».

## 5. STATUS_CONFLICT: 6 расхождений, решённые в пользу нашего on-chain-виста

Разбор в `delta_report.md` (секция «Интерпретация расхождений»): у OCP ещё `open` по четырём папкам,
которые у нас в `solved/` (arweave-12, ftpk-s2, logicbeach, pindar) — их `verified_on` 2026-08-16/27
против нашей проверки 2026-10-12, то есть это **устарелость OCP**, а не новое открытие; genesis —
обратный случай (OCP впереди); peter-todd — терминология (`watch` vs `open`, приз жив). Нигде чужие
строки не затёрты: в папках лежит двойная фиксация «по OCP X, у нас Y от <дата>».

## 6. Round-ось (гипотеза, без прогонов)

Прецедент genesis ⇒ нестандартные `rounds` могут обесценивать наши негативы. Проверено grep'ом, где
наш код жёстко фиксирует KDF; append в `LOG.md` 7 живых пазлов: `wealth-in-poetry`
(`tools/fastoracle.py:27`), `guntis-vitolins-metamask` (`tools/fast_eth.py:47`, + оговорка про
MetaMask-vault KDF), `bitcoin-coders-puzzle-07` (`tools/bc07_speewide2_integer.py:74`),
`blm-brave-new-world` (`tools/ev2run.py:21`, Electrum v2), `luckylurker-vault-2` (локального KDF нет,
низкий приоритет), `smith-lyle-moore` (`data/anypos_sweep.py:9`, `data/gpu/device_glimmer.cu`),
`aoi-nakamoto-quizchain` (механику уточнить). В каждой записи: дешёвая проверка = читать генератор /
спросить автора, и **«ПРОГОН НЕ ЗАПУСКАТЬ» без инсайт-оси и отдельного ОК Ильи**. Не применимо к
`bitaddress-bip38` (scrypt), `corey-phillips` (raw SHA-256), `keir-finlow-bates` (PoW).
Важно в обратную сторону: их CUDA `bip39_passphrase_engine.cu` и `derive.py` тоже фиксыают 2048 —
их негативы разделяют ту же слепую зону.

## 7. Параллельность и инцидент с чужим «переформатом»

- Брони по протоколу: acquire/steal/release через `tools/claims.py`; `puzzles/gsmg-io-5btc-puzzle`
  пропущен как `PENDING-CLAIM` (BigPickle активен) — снять позже:
  `python tools/ocp_delta_scan.py apply` (идемпотентно, маркер `<!-- ocp-snapshot:19644e58 -->`).
  `arweave-puzzle-11` взят после того, как lease освободился.
- 18.10 ~13:05–13:12 параллельный проход перезаписал `MASTER_CATALOG.md` и хвосты трёх `LOG.md`,
  (а) сняв мои правки каталога по genesis, (б) оставив дефекты генерации: одна строка повторялась
  подряд в 3–25 вариантах (`- X`, `X`, `## X`, `# ## X`), из-за чего `git diff` показывал весь файл
  изменённым. Принято меры: правки каталога повторно применены по якорям
  (`tools/_oneoff_catalog_genesis_2026-10-18.py`), дубли склеены (`tools/log_dedup.py`, 229 строк,
  проверка «ни одна уникальная строка не потеряна» по нормализованным множествам), EOL-шум убран
  (`tools/eol_repair.py`). Целая HEAD-версия каталога спасена:
  `_sources/MASTER_CATALOG_pre_reformat_2026-10-18_HEAD.md`.
- **Что должен решить куратор/Илья:** в текущем `MASTER_CATALOG.md` после чужого переформата
  отсутствует 374 строки HEAD-версии, в т. ч. заголовки `КАТЕГОРИЯ А/Б` и `### A1…A5 / B1…B6`
  (тела пунктов сохранены, сетка приоритетов потеряна). Восстанавливать ли из спасённой копии —
  решение Ильи; в одиночку файл не чиним, он сейчас у кого-то в активной правке. Детали —
  `WAKE_QUEUE.md`, секция «Инцидент (OCP Sync, 18.10, 13:2x)».
- Счётчики в `puzzles/README.md`/`solved/INDEX.md` сверены с диском: 80 активных досье
  (+ `dead-ends-registry`) и 55 папок в `solved/`.

## 8. Безопасность ключей

`python tools/key_scan.py` по всем новым артефактам (WIF/xprv-regular expressions + derivation +
проверка балансов): **0 живых адресов** (`_sources/ocp_sync_2026-10-18/key_scan_full.txt`;
«RESULT: 0 derived address(es) currently HOLD sats»). Отдельные срабатывания класса
`hex64-on-key-line` — нулевые hex-строки в чужом HTML-дампе, не ключи. Секреты (сид/фраза genesis,
карты ballet-bobby-lee) в README/LOG/чат не дублируются; byte-exact копии OCP-файлов оставлены в provenance-папках `data/ocp/` как есть, поскольку приз снят третьей стороной.

## 9. Dead-ends (причины по OCP)

Append-таблица в `puzzles/dead-ends-registry/README.md`: `objective-thune-licorne`
(unobtainable-material), `onfo-forsyth` (author-deceased, сегменты 6–10 не выпускались),
`aenigma-shards` (unfunded, контракт 0 ETH), `bam-askabitcoiner` (swept 05.06.2026), `demint`
(solved-by-others ~10.2022), `game-of-satoshi` (custodial), `wares-wallets` (swept),
`zk-guess-chainhackers-31` (window-closed, secret 149) — с причиной/датой/URL. Папки не переносим,
только документируем причину. Плюс: по `1h8BNZkh…` уточнено — это Phemex Dorian (swept 21.03.2020),
ярлык «satoshi-maze=0» неточен; разбронированная нами проверка U-адреса (99 081 сат, 8 UTXO, 0 трат)
и их оговорка про P2PK-индексирование зафиксированы обе, вывод совпадает: `suspected-fake`.

## 10. Рекомендуемое (не сделано намеренно)

1. Push в `mak777uh/crypto-puzzles` — только по отдельному ОК Ильи (в клоне ~50 МБ).
2. GSMG: снять `PENDING-CLAIM` и доложить дельту (oracle.py + issue #46) после освобождения брони.
3. Вне MASTER (только рекомендация, не правка): объявить P1 закрытым и архивировать
   `C:\Users\Admin\crypto-work\p1-genesis\` — genesis решён другой стороной, активных процессов там нет.
4. Решить судьбу `MASTER_CATALOG.md` (п. 7) и, если нужно, ввести правило: общие файлы переписываются
   только атомарной вставкой по якорям, «полный reformat каталога» — отдельным согласованным проходом.

## Артефакты прохода

`_sources/ocp/` (клон), `_sources/OCP_SNAPSHOT.md`, `_sources/OCP_ISSUES_2026-10-18.json`,
`_sources/ocp_sync_2026-10-18/{delta_report.md,delta_report.json,apply_log.md,key_scan_full.txt}`,
`_sources/MASTER_CATALOG_pre_reformat_2026-10-18_HEAD.md`, `tools/ocp_delta_scan.py`,
`tools/eol_repair.py`, `tools/log_dedup.py`, `tools/_oneoff_catalog_genesis_2026-10-18.py`,
`tools/ocp/{README.md,check_escrows.py,derive.py,validate.py}`, `tools/ocp_engines_README.md`,
37 папок с `data/ocp/**` и `tools/ocp/**`, `solved/caesarcoder-genesis-block-wallet-puzzle-947ksats/**`,
правки `MASTER_CATALOG.md`, `WAKE_QUEUE.md`, `puzzles/README.md`, `solved/INDEX.md`,
`agents/REGISTRY.md`, `puzzles/dead-ends-registry/README.md`.
