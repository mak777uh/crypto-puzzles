# OCP — реестр снапшотов репозитория open-crypto-puzzles

Источник: https://github.com/floflo777/open-crypto-puzzles (автор floflo777, «Unsolved crypto puzzles worth ~10 BTC, ~12 ETH and ~1,900 AR still on-chain»).
Локальный полный клон: `_sources/ocp/` (в индекс MASTER не кладётся — см. `.git/info/exclude`; embedded git-репо).

## Таблица снапшотов (новые строки — дописывать вниз, старое не переписывать)

| Дата (UTC) | HEAD-SHA | Ветка | Blob | Рабочее дерево | Агент | Примечание |
|---|---|---|---|---|---|---|
| 2026-10-18 09:33 | `19644e58e50721f8469680f2edcba1daa0697630` | main | 474 | 26 МБ (474 файла) | OCP Sync (Qoder Desktop) | первичный полный клон; последний коммит репо 2026-10-17T23:38:02Z «assets: prize map refreshed at live prices»; история 138 коммитков |

Состав клона по группам файлов (blob): `1-big-prizes` 92, `2-mid-prizes` 205, `3-small-prizes` 10, `4-solved` 100 → **407 пазловых**; `archive/dead-ends` 20; служебное (engines, tools, docs, schema, puzzles.json, README, AGENTS, CONTRIBUTING, LICENSE, assets, .github) 47.

## Как делать следующую синхронизацию (инкрементально, не повторным сравнением деревьев)

```bash
cd _sources/ocp
git fetch origin main
git log --oneline <PREV_SNAPSHOT_SHA>..origin/main                 # что вышло нового
git diff --name-status <PREV_SNAPSHOT_SHA>..origin/main            # дельта по файлам
git checkout main && git merge --ff-only origin/main               # обновить рабочее дерево
python ../../tools/ocp_delta_scan.py --base <PREV_SNAPSHOT_SHA>    # компаратор дельт в отчёт
# затем — дописать новую строку в таблицу выше
```

Правила фиксации, обязательные для компаратора:

1. **Хеши файлов брать из git, а не из файловой системы**: `git ls-tree -r <SHA>` даёт blob-SHA на путь. OneDrive может оставить файлы гидратированными/изменёнными — ФС-хеш ненадёжен.
2. Провенанс каждого скопированного в папку пазла файла — `SOURCE.md` рядом (`commit`, `blob`, `path`, `url`, `pulled`, `agent`).
3. При расхождении фактов OCP и наших — **не перетирать**: двойная фиксация «по OCP X, у нас Y от <дата>» + статус `STATUS_CONFLICT` в отчёте; приоритет — собственное on-chain-подтверждение.
4. OCP-код кладётся только в `puzzles/<slug>/tools/ocp/` и `MASTER/tools/ocp/`, не смешивается с нашим.

## Что лежит в клоне и зачем оно нам

| Путь в клоне | Содержание | Польза для MASTER |
|---|---|---|
| `puzzles.json` (49 записей, 245 КБ) | машиночитаемый индекс: slug, tier, status, prize, author, `addresses[].{address,role,expected,verified_on,verified_state}`, `solutions[].payout_txid`, `dead_end_reason` | источник статусов и on-chain-верификации эскроу для каталога; сводка снапшота 2026-08-16: 27 funded ≈ $403k (5.94 BTC, 13.21 ETH, 1900 AR, 3.03 LTC, 306 USDT) |
| `<tier>/<slug>/analysis/{leads.md,tested.md}` | регистры гипотез и **задокументированных негативов** с числами | обогащение наших LOG (в т.ч. witnessed-свипы arweave, GPU-прогоны BLM, coverage Corey Phillips) |
| `<tier>/<slug>/clues/author-posts.md` + `data/*.{json,csv}` | дословные посты/ответы авторов, дампы (on-chain-dialogue, card-faces, lots, coverage, geometry) | наши папки часто содержат только `puzzle.json` |
| `<tier>/<slug>/tools/oracle.py` | сертифицированные оракулы (`--selftest`, синтетические witnesses) | проверка/заимствование оракульной дисциплины; у GSMG наш KDF не сертифицирован |
| `archive/dead-ends/` (`rows.json` + README + 4 папки) | 11 мёртвых пазлов с причиной, датой, доказательством | правки в `puzzles/dead-ends-registry/README.md` |
| `engines/` (6 CUDA-ядер, lib, build.sh, README 17 КБ) | secp256k1_hash160 9.3M кл/с; bip39_passphrase 220–790k/с; perm11 через Lehmer 792k/с; electrum_v1 58.8k/с; pzl3_arweave ~251k/с; arweave_var; **p2wsh_2of2_pairs 1.95e9 пар/с** | указатель `tools/ocp_engines_README.md`; сборка/запуск — только по отдельному решению Ильи |
| `tools/check_escrows.py`, `derive.py`, `validate.py`, `build_index.py` | перепроверка эскроу на цепи (`--update` пишет verified_on; ERROR ≠ swept), деривация bip39/brainwallet/hexkey/sha256n/hash160script с MATCH, валидация схемы | копия в `MASTER/tools/ocp/` для кураторов |
| `docs/methodology.md`, `docs/verify-funding.md` | оракул-первым, head/mid/tail witnesses, BIP39-фильтр 12!→29.9M, amount-fingerprint; curl-проверки и ловушки | согласуется с нашим протоколом; полезно как референс |
| `schema/puzzle.schema.json` | enum `dead_end_reason` (10), `verified_state` (funded-unspent/swept/unfunded/zero-balance-contract…), `solutions[].payout_txid` | форма фиксации статусов |
| `README.md` + `assets/prize-map.svg` | карта призов по живым ценам (workflow `.github/workflows/prize-map.yml` обновляет ежедневно) | ориентир по объёмам; цены устаревшие снапшотом 2026-08-16 |
| `AGENTS.md`, `CONTRIBUTING.md` | их внутренние правила репо | контекст, не протокол MASTER |

## Известные расхождения с нашей базой (на момент снапшота)

- **Genesis Block Wallet**: у OCP — `4-solved/caesarcoder-genesis-block-wallet-puzzle-947ksats`, РЕШЁН и СНЯТ 2026-10-17 (наше on-chain-подтверждение: `bc1qfkhx02…` = 120 funded / 120 spent, баланс 0). У нас папка до 18.10 числилась активной → закрыта, см. `solved/caesarcoder-genesis-block-wallet-puzzle-947ksats/LOG.md`.
- У OCP папки `school-of-bitcoin-1msats`, `zden-haluska-halv-312ksats` и др. лежат в `2-mid-prizes`, у нас статусы могут отличаться — фиксируется компаратором как `STATUS_CONFLICT`, правки только с on-chain-перепроверкой.
- `issues` сняты отдельно: `_sources/OCP_ISSUES_2026-10-17.json` (39 шт., Big Pickle) + `_sources/OCP_ISSUES_2026-10-18.json` (дельта: PR #44, issues #45, #46).

## Правки базы этим проходом

Полный отчёт: `reports/2026-10-18_*_OCP Sync_ocp-full-sync.md`. Машиночитаемая дельта: `_sources/ocp_sync_2026-10-18/delta_report.{json,md}`.
