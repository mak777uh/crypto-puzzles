# Commander U Riddle for 8.5 BTC
> **ПЕРЕМЕЩЕНО 2026-10-17 в `master/solved/`** — пазл решён/закрыт/тупиковый, активная работа не ведётся. Причина: [../INDEX.md](../INDEX.md). Вернуть в `puzzles/` — только при новых данных (правила: `AGENT_INSTRUCTIONS.md`).

Индекс: [MASTER_CATALOG.md](../../MASTER_CATALOG.md) (Части 1-8). Источник данных: [open-crypto-puzzles](https://github.com/floflo777/open-crypto-puzzles).

## Кратко
- Статус: **dead-end** (dead-end)
- Цепь: bitcoin
- Приз: 8.50099081 BTC (USD 535562)
- Примечание: 8.5 BTC of this sits in a 2010 P2PK output, which mempool.space's address API does not index; it shows only the 99,081 sats held in 8 separate P2PKH outputs at the same address. Both readings are correct for what each indexer counts; the full total is spendable by the one private key that controls both, since the P2PKH outputs derive from the same uncompressed public key exposed by the P2PK output
- Опубликовано: 2019-05-15 https://commanderu.github.io/index.html
- Типы: raw-private-key, text-cipher
- Difficulty left: external-info
- 4 of 6 fragments are unrecovered; one has no published checksum at all, and 3 do not match the MD5 of any base58 string of the stated length under any of 28 standard transforms tried; the missing piece is the original 2019 channel with the sub-riddle answers, which I could not find, and which may never have existed as a real puzzle in the first place

## Адреса/эскроу
- `1KDUcZh5Z6H1of4Pwoy5ojJtkQxcQBHhnH` — the announced prize address | expected: 8.50099081 BTC (850,000,000 sats P2PK, not shown by mempool.space; 99,081 sats P2PKH, shown) | state: funded-unspent (checked 2026-08-16) | https://mempool.space/address/1KDUcZh5Z6H1of4Pwoy5ojJtkQxcQBHhnH

## Источники
- 2026-07-26 — Commander U, puzzle site — https://commanderu.github.io/index.html
- 2026-07-26 — Commander U repository issues — https://github.com/commanderu/commanderu.github.io/issues
- 2026-02-01 — Bitcointalk repost, thread 5573629 — https://bitcointalk.org/index.php?topic=5573629.0
- 2010-09-22 — Funding transaction (2010 P2PK output), mempool.space — https://mempool.space/tx/80d8bc9856938d3dce012dfa2b2f93d6724bc046e10f4d0dde824ce3392eb774

## Подробности
Здесь должна накапливаться расширенная информация по мере проходов: подсказки, прогресс сообщества, проверенные гипотезы, ссылки, compute-оценки. Текущий файл — скелет из OCP; заполняется автоматически в циклах.


---
## Логирование (обязательно)
См. `../../AGENT_INSTRUCTIONS.md`. Любая значимая находка/прогресс/баланс/решение (полностью или частично) **должна** быть дописана сюда с датой и ссылкой. Параллельные агенты обязаны соблюдать тот же протокол.

## OCP deep docs
- Folder: https://github.com/floflo777/open-crypto-puzzles/tree/main/archive/dead-ends/commander-u-puzzle-8-5btc
- README (raw): https://raw.githubusercontent.com/floflo777/open-crypto-puzzles/main/archive/dead-ends/commander-u-puzzle-8-5btc/README.md
## Досье Hark v2 (16.10.2026)

Перенесено из `MASTER_CATALOG_v2_2026-10-16.md` (рабочие досье агентов Hark, 16.10.2026 23:40 МСК). Картина механизма, подсказок, проверенных и отброшенных гипотез, оракулов и файлов.

### B8. «Riddle for 8.5 BTC» (commanderu) — 99 081 сат
- **→ Полное актуальное досье (что решено, что проверено, что осталось): ЧАСТЬ 8.4 (Riddle 8.5).** Старая краткая запись заменена.


### «Riddle for 8.5 BTC» (commanderu.github.io) — фактически 99 081 сат
- **Адрес/сеть/путь**: BTC mainnet, `1KDUcZh5Z6H1of4Pwoy5ojJtkQxcQBHhnH` (P2PKH). Ключ — WIF uncompressed (51 символ, начинается с «5»), собранный из 6 частей: 3×9 + 3×8 символов.
- **Баланс**: 99 081 сат, 8 входящих донатов, 0 трат. Проверено 14.10 22:05 MSK. Донаты: 1000 (02.2019), 10000 (04.2019), 782 (09.2019), 1100 (06.2020), 580 (08.2020), 10019 (02.2022), 75000 (01.2024), 600 (01.2025). **8,5 BTC на адресе не было никогда**: первый вход в 2019, заявление OP про 23.09.2010 ложно. На сайте стоит донат-виджет, так что это, вероятно, приманка для донатов. Нет гарантии, что ключ вообще собирается. Свип 8 входов ≈ 2,5 тыс. сат комиссии → чистыми ≈ 96,6 тыс. сат (~$80).
- **Источники**:
  - Сайт commanderu.github.io (репо commanderu/commanderu.github.io, 78 коммитов 16–21.05.2019, клон `/workspace/work/riddle85/repo/`).
  - bitcointalk https://bitcointalk.org/index.php?topic=5573629 (OP walletrecovery, отрицательный trust).
  - bitcoinpuzzle.ru (упоминание).
- **Подсказки и наши чтения** (`/workspace/work/riddle85/NOTES.md`):
  1. QR в base64 → «1.5JRd42nU1» → часть 1 = `5JRd42nU1`, найдена. Это публичная расшифровка подсказки сайта.
  2. «AnimalƵ (1,3,5,7 - word 2,3,6,8 - numbers)», 8 символов. Вероятно, чередование буква–цифра. Проверочного хеша нет. Ранние версии подсказки: «Animal(1,3,5 word 2,3,6 - nubmers)» → «AnimalZ» → «AnimalƵ». Ƶ, судя по всему, декор коммита стилизации.
  3. `@221b71a2f785887386016268b47fa956@` + OpenSSL `U2FsdGVkX18XIKPjM2cf54Jh81/zBmjRohN8cnJ7wfE=` (Salted__, salt 1720a3e333671fe7, 1 блок → открытый текст ≤15 байт). Пароль, вероятно, — прообраз этого MD5.
  4. MD5 b621fcb90c0d961735bcf98cb8adbcfb = `AhiF1tpuG`, найдена.
  5. MD5 7f4eb6dbc2e0658e661e9ccbd0a3f289 — не найдена.
  6. MD5 7099591e95e1a4927a5e96cbbb467275 — не найдена.
  - Длины: по 9 символов — ч1, ч4 и одна из {3, 5, 6}; по 8 — ч2 и две из {3, 5, 6}.
- **Что установлено/решено**: части 1 и 4. Подсказки 3–6 добавлены одним коммитом 179f9e1 (20.05.2019) и не менялись. Скрытых данных в репо нет: проверены XMP, хвосты, LSB. Адрес 13CiiWnD475JHMyY7jc42tEw9KgTsMbr1p — донат-кнопка автора (546 сат). **Поправка к каталогу**: не найдены части 2, 3, 5 и 6. Часть 3 — тоже не найдена (шифртекст не вскрыт), а не только 2/5/6.
- **Проверено и отброшено** (0):
  - ~4,1·10⁸ MD5 «животное + цифры» (452 основы, ~170 животных, префиксы 1.–6.) против всех 4 хешей (`s2/search.py`, `s2/animals.txt`);
  - 7 380 вариантов openssl для ч3 (хеш как пароль, словарь ~140 слов × MD5/SHA256-KDF × AES-128/192/256/3DES);
  - MD4/NTLM/двойной MD5/усечённые SHA-1 и SHA-256 × ~1,6 тыс. слов с префиксами (~10⁴);
  - публичных решений не нашлось: хеши, «AnimalƵ», commanderu, bitcoinpuzzle.ru, bitcointalk.
- **Что осталось / следующий шаг**: только перебор, а он запрещён. Полный 58^8 MD5 ≈ 1,3·10¹⁴ (~40+ суток на 2 CPU). Ч2 по маске L D L D L D L D ≈ 3,8·10¹⁰, и проверить её можно только WIF-чексуммой, когда известны остальные части. Ход по смыслу — один: найти точную грамматику «AnimalƵ» и пароль ч3 из словаря.
- **Оракул, скорость, файлы/скрипты**: `/workspace/work/riddle85/s2/search.py` (~1,5·10⁶ MD5/с на Python, ~2·10⁷/с на ядро на C — оценка NOTES), `s4.py`, `t.py`, `h3.bin` (шифртекст ч3), `diffs.txt` (диффы коммитов), `repo/`.
- **Проекты Hark и статус**: проект f3403511-6476-4446-8c46-ced34ab32a08. Задача a9fb75cf на паузе с 13.10 ~19:20 MSK, вердикт «тупик».
- **Оценка шансов**: аудит 15.10 — <1%, «не брать». Приз ~$80 не окупает работы.

---

## Оперативный статус v2 (16.10.2026 ~23:30 МСК)

Строка из сводной таблицы `MASTER_CATALOG_v2` (Часть 0.3):

| Riddle 8.5 | 99 081 сат | <1% | Только перебор, не брать | — |

## OCP: машинные данные (puzzles.json, 16.10.2026)

Структурированные данные из `puzzles.json` репозитория [open-crypto-puzzles](https://github.com/floflo777/open-crypto-puzzles) (snapshot OCP: 2026-08-16; цены: {'date': '2026-08-16', 'BTC': 63000, 'ETH': 1880, 'AR': 1.81, 'LTC': 54}).

- `slug`: commander-u-puzzle-8-5btc
- `title`: Commander U Riddle for 8.5 BTC
- `status`: **dead-end** (dead-end: suspected-fake)
- `tier`: dead-end | `chain`: bitcoin
- `series`: None
- `author`: Commander U | github:commanderu
- `prize`: 8.50099081 BTC (оценка $535562 на 2026-08-16) — 8.5 BTC of this sits in a 2010 P2PK output, which mempool.space's address API does not index; it shows only the 99,081 sats held in 8 separate P2PKH outputs at the same address. Both readings are correct for what each indexer counts; the full total is spendable by the one private key that controls both, since the P2PKH outputs derive from the same uncompressed public key exposed by the P2PK output
- `published`: 2019-05-15 https://commanderu.github.io/index.html
- `puzzle_type`: raw-private-key, text-cipher
- `target_format`: 51-character uncompressed mainnet WIF (6 concatenated base58 fragments, lengths 9, 8, 9, 9, 8, 8), matching P2PKH address 1KDUcZh5Z6H1of4Pwoy5ojJtkQxcQBHhnH and uncompressed public key 041ebfac69910efb17ab697db5f2a4ff815e1d37c05e40d56977031a3a36b80464ea6782ad2913e2a5ec33e187f0fee50675bc78a25d657846e08e8425f2384b2a
- `difficulty_left`: external-info
- `difficulty_note`: 4 of 6 fragments are unrecovered; one has no published checksum at all, and 3 do not match the MD5 of any base58 string of the stated length under any of 28 standard transforms tried; the missing piece is the original 2019 channel with the sub-riddle answers, which I could not find, and which may never have existed as a real puzzle in the first place

**Адреса и проверенное состояние:**
- `1KDUcZh5Z6H1of4Pwoy5ojJtkQxcQBHhnH` — escrow | the announced prize address | ожидается: 8.50099081 BTC (850,000,000 sats P2PK, not shown by mempool.space; 99,081 sats P2PKH, shown) | проверено 2026-08-16: **funded-unspent**
  - https://mempool.space/address/1KDUcZh5Z6H1of4Pwoy5ojJtkQxcQBHhnH

**Деривация:**
- concatenate 6 base58 fragments, each meant to be recovered by solving one sub-riddle and checked against a per-fragment MD5 hash, into a 51-character WIF; decode it to a private key; the resulting uncompressed public key must equal the known exposed public key exactly

**Материалы третьих лиц:**
- the site's own hint text and fragment table, reproduced as published; no third-party copyrighted material

**Источники (OCP `sources`):**
  - url: https://commanderu.github.io/index.html | title: Commander U, puzzle site | date: 2026-07-26
  - url: https://github.com/commanderu/commanderu.github.io/issues | title: Commander U repository issues | date: 2026-07-26
  - url: https://bitcointalk.org/index.php?topic=5573629.0 | title: Bitcointalk repost, thread 5573629 | date: 2026-02-01
  - url: https://mempool.space/tx/80d8bc9856938d3dce012dfa2b2f93d6724bc046e10f4d0dde824ce3392eb774 | title: Funding transaction (2010 P2PK output), mempool.space | date: 2010-09-22
