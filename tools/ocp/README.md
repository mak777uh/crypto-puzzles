# Служебные инструменты из open-crypto-puzzles (копии)

Снято агентом `OCP Sync` 2026-10-18 со снапшота `_sources/ocp/`, коммит
`19644e58e50721f8469680f2edcba1daa0697630` (https://github.com/floflo777/open-crypto-puzzles).
Файлы — byte-exact копии чужого кода, **не редактируем и не затираем**; обновляем только
при следующей синхронизации (`_sources/OCP_SNAPSHOT.md`).

| файл | blob (git) | размер | что делает | зависимости |
|---|---|---|---|---|
| `check_escrows.py` | `7dbd85b7737e28445b1ee988b9b198e8af7c7149` | 12 958 | перечитывает все адреса пазлов из `puzzles.json`/`puzzle.json` и сверяет ожидаемое состояние с ончейном; печать таблицы verdict; `--update` пишет `verified_on/verified_state` обратно в манифест | сетевые эндпоинты эксплореров |
| `derive.py` | `b5d9e0427f94c3aee2043cf348d2d896cbb5d6f2` | 11 270 | кандидат → адрес: `bip39` (m/bip44/bip49/bip84/eth/явный путь), `brainwallet`, `hexkey`, `sha256n --rounds N`, `hash160script`; `--target <addr>` → `MATCH`/`NO MATCH` (exit 0/1), удобно как оракул | `bip_utils`, `ecdsa`, `base58`, `pycryptodome` |
| `validate.py` | `3ac0e5996bf640f606bd5c2812adb75fb98b5c09` | 36 650 | QA-раннер чужого репо: схема манифеста, порядок заголовков README, запрещённые слова, ссылки, лимиты размеров, self-test оракулов, консистентность индекса | запускать только внутри клона |

Запускать из корня клона (`_sources/ocp/`), где лежат `puzzles.json` и папки пазлов:

```
cd _sources/ocp && python ../../tools/ocp/check_escrows.py --slug <ocp-slug>
cd _sources/ocp && python ../../tools/ocp/derive.py bip39 "<слова>" --target <адрес>
```

Полезно куратору: `check_escrows.py` — быстрый способ перепроверить баланс/состояние
эскроу по чужому индексу (только чтение, транзакций не создаёт).

## Важно про `derive.py` (ось rounds)

`cmd_bip39` зовёт `Bip39SeedGenerator(mnemonic, lang).Generate(passphrase)` из `bip_utils` —
итераций PBKDF2 в библиотеке **фиксированы (2048), флага переопределения нет**. Так же
зафиксированы 2048 и в их CUDA-движках (`engines/bip39_passphrase_engine.cu`,
строки вида `pbkdf2_sha512(mnem, pos, salt, 8, 2048, seed)`). Это ровно то слепое пятно,
из-за которого пазл Genesis Block Wallet не был взят ни нами, ни ими (см.
`puzzles/genesis-block-wallet-puzzle-142ksats/LOG.md` → после переноса `solved/`):
реальные rounds оказались 181505/200913. Вывод: `derive.py` и движки OCP годны как оракул
**только при подтверждённых стандартных настройках KDF**; при нестандартных rounds/соли
нужен собственный генератор с параметром rounds.

## Не перенесено нарочно

`build_index.py` (`31efb0f07e9fa1eb7e9a85d2079c14c0521d8f3b`) и `fig_prize_bars.py` —
генераторы чужого репо (пишут `puzzles.json`/картинки внутри клона), куратору не нужны;
лежат в клоне. CUDA-движки: см. `../ocp_engines_README.md`.
