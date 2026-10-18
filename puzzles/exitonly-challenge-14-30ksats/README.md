# Exitonly Bitcoin Challenge 14

Индекс: [MASTER_CATALOG.md](../../MASTER_CATALOG.md) (Части 1-8). Источник данных: [open-crypto-puzzles](https://github.com/floflo777/open-crypto-puzzles).

## Кратко
- Статус: **open** (small)
- Цепь: bitcoin
- Приз: 30000 sats (USD 18.9)
- Примечание: single P2WPKH escrow, one funding transaction
- Опубликовано: 2024-10-03 https://www.youtube.com/watch?v=jMRoWtsfCuY
- Типы: bip39-seed, word-selection
- Difficulty left: uneconomic
- the brute-force space with known word positions is 2048^4 x 128 = 2,251,799,813,685,248 candidates; at an assumed 1,000,000 to 5,000,000 derivations/second on a rented GPU the cost is roughly $31,000 to $156,000 against an $18.90 prize, about 1,600 to 8,300 times over

## Адреса/эскроу
- `bc1q5rjy2cdfy4n4dkk4r6pxtwqlm8tgjcc2dj0ee9` — main | expected: 30000 sats | state: funded-unspent (checked 2026-08-16) | https://mempool.space/address/bc1q5rjy2cdfy4n4dkk4r6pxtwqlm8tgjcc2dj0ee9

## Источники
- 2024-10-03 — Bitcoin Challenge 14 video — https://www.youtube.com/watch?v=jMRoWtsfCuY
- 2026-08-16 — Channel Exitonly — https://www.youtube.com/channel/UCRLx2BwF7wNHGoduOZE4QVw

## Подробности
Здесь должна накапливаться расширенная информация по мере проходов: подсказки, прогресс сообщества, проверенные гипотезы, ссылки, compute-оценки. Текущий файл — скелет из OCP; заполняется автоматически в циклах.


---
## Логирование (обязательно)
См. `../../AGENT_INSTRUCTIONS.md`. Любая значимая находка/прогресс/баланс/решение (полностью или частично) **должна** быть дописана сюда с датой и ссылкой. Параллельные агенты обязаны соблюдать тот же протокол.

## OCP deep docs
- Folder: https://github.com/floflo777/open-crypto-puzzles/tree/main/3-small-prizes/exitonly-challenge-14-30ksats
- README (raw): https://raw.githubusercontent.com/floflo777/open-crypto-puzzles/main/3-small-prizes/exitonly-challenge-14-30ksats/README.md

## OCP: машинные данные (puzzles.json, 16.10.2026)

Структурированные данные из `puzzles.json` репозитория [open-crypto-puzzles](https://github.com/floflo777/open-crypto-puzzles) (snapshot OCP: 2026-08-16; цены: {'date': '2026-08-16', 'BTC': 63000, 'ETH': 1880, 'AR': 1.81, 'LTC': 54}).

- `slug`: exitonly-challenge-14-30ksats
- `title`: Exitonly Bitcoin Challenge 14
- `status`: **open**
- `tier`: small | `chain`: bitcoin
- `series`: Exitonly "Bitcoin Challenge", 16 numbered episodes, 15 already spent
- `author`: Exitonly | youtube:UCRLx2BwF7wNHGoduOZE4QVw
- `prize`: 30000 sats (оценка $18.9 на 2026-08-16) — single P2WPKH escrow, one funding transaction
- `published`: 2024-10-03 https://www.youtube.com/watch?v=jMRoWtsfCuY
- `puzzle_type`: bip39-seed, word-selection
- `target_format`: BIP39 12 words (English), 7 given in clear, 5 missing, most likely BIP84 m/84'/0'/0'/0/0 (script type v0_p2wpkh), no passphrase stated, positions and order of the missing words not confirmed by the author
- `difficulty_left`: uneconomic
- `difficulty_note`: the brute-force space with known word positions is 2048^4 x 128 = 2,251,799,813,685,248 candidates; at an assumed 1,000,000 to 5,000,000 derivations/second on a rented GPU the cost is roughly $31,000 to $156,000 against an $18.90 prize, about 1,600 to 8,300 times over
- `tested_total`: {'candidates': 0, 'families': 1, 'certified': True}

**Адреса и проверенное состояние:**
- `bc1q5rjy2cdfy4n4dkk4r6pxtwqlm8tgjcc2dj0ee9` — escrow | main | ожидается: 30000 sats | проверено 2026-08-16: **funded-unspent**
  - https://mempool.space/address/bc1q5rjy2cdfy4n4dkk4r6pxtwqlm8tgjcc2dj0ee9

**Деривация:**
- combine the 7 published words with 5 unknown words into a checksum-valid BIP39 mnemonic and derive it to a Bitcoin address
- оракул: `tools/oracle.py` | сертифицирован: True
- сверено с: the public BIP39/BIP84 test vectors, since no episode of this series has a publicly known solved seed

**Зацепки (OCP `leads`):**
  - title: Solve episode #12 and compare its seed to #13 to test for a weak or correlated random source | status: open
  - title: Recover the complete solved seeds of episodes #11-#13, currently not recorded | status: open

**Материалы третьих лиц:**
- The challenge video, its frames, and its audio are not included, since they are the author's copyrighted YouTube content; the video is linked by ID only. The 7 published seed words and short quotes from the description and comments are the author's own public material, reproduced in clues/author-posts.md.

**Источники (OCP `sources`):**
  - url: https://www.youtube.com/watch?v=jMRoWtsfCuY | title: Bitcoin Challenge 14 video | date: 2024-10-03
  - url: https://www.youtube.com/channel/UCRLx2BwF7wNHGoduOZE4QVw | title: Channel Exitonly | date: 2026-08-16
