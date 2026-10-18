# Crypto Puzzles 2018: Puzzle #2

Индекс: [MASTER_CATALOG.md](../../MASTER_CATALOG.md) (Части 1-8). Источник данных: [open-crypto-puzzles](https://github.com/floflo777/open-crypto-puzzles).

## Кратко
- Статус: **open** (small)
- Цепь: ethereum
- Приз: 0.05 ETH (USD 94)
- Примечание: single externally-owned account, never signed a transaction (nonce 0); that this address is Puzzle #2's escrow is a strong inference from the funder and amount matching Puzzle #1, not stated directly by the author
- Опубликовано: 2018-08-06 https://www.youtube.com/watch?v=TRUUTryah70
- Типы: raw-private-key, image-stego, video-series
- Difficulty left: external-info
- the transform is certified; what remains is finishing a visual read of Puzzle #2's two videos, about 40 to 50 of 64 hex characters legible today

## Адреса/эскроу
- `0x1fa8Be9De5bBFE047C72dB8E8E3257128F7661ad` — main | expected: 0.05 ETH | state: funded-unspent (checked 2026-08-16) | https://etherscan.io/address/0x1fa8Be9De5bBFE047C72dB8E8E3257128F7661ad

## Источники
- 2018-07-19 — Crypto Puzzle 1, statement part 1 — https://www.youtube.com/watch?v=3l1jFa3Mw0s
- 2018-07-19 — Crypto Puzzle 1, statement part 2 — https://www.youtube.com/watch?v=hX-pOBj8VsI
- 2018-07-19 — Crypto Puzzle 1 Solved! — https://www.youtube.com/watch?v=0jJ6XadOAWk
- 2018-08-06 — Crypto Puzzle 2, part 1 — https://www.youtube.com/watch?v=TRUUTryah70
- 2018-08-06 — Crypto Puzzle 2, part 2 — https://www.youtube.com/watch?v=U_0DtYHDPy0
- 2026-08-16 — Channel: Crypto Puzzles — https://www.youtube.com/channel/UCR8-P07nNhxyEr6fwJXvjQQ

## Подробности
Здесь должна накапливаться расширенная информация по мере проходов: подсказки, прогресс сообщества, проверенные гипотезы, ссылки, compute-оценки. Текущий файл — скелет из OCP; заполняется автоматически в циклах.


---
## Логирование (обязательно)
См. `../../AGENT_INSTRUCTIONS.md`. Любая значимая находка/прогресс/баланс/решение (полностью или частично) **должна** быть дописана сюда с датой и ссылкой. Параллельные агенты обязаны соблюдать тот же протокол.

## OCP deep docs
- Folder: https://github.com/floflo777/open-crypto-puzzles/tree/main/3-small-prizes/crypto-puzzles-2018-puzzle-2-0-05eth
- README (raw): https://raw.githubusercontent.com/floflo777/open-crypto-puzzles/main/3-small-prizes/crypto-puzzles-2018-puzzle-2-0-05eth/README.md

## OCP: машинные данные (puzzles.json, 16.10.2026)

Структурированные данные из `puzzles.json` репозитория [open-crypto-puzzles](https://github.com/floflo777/open-crypto-puzzles) (snapshot OCP: 2026-08-19; цены: {'date': '2026-08-16', 'BTC': 63000, 'ETH': 1880, 'AR': 1.81, 'LTC': 54}).

- `slug`: crypto-puzzles-2018-puzzle-2-0-05eth
- `title`: Crypto Puzzles 2018: Puzzle #2
- `status`: **open**
- `tier`: small | `chain`: ethereum
- `series`: Crypto Puzzles (2018 YouTube channel), same series as the solved Puzzle #1
- `author`: unnamed, published under the YouTube channel "Crypto Puzzles" | youtube:UCR8-P07nNhxyEr6fwJXvjQQ
- `prize`: 0.05 ETH (оценка $94 на 2026-08-16) — single externally-owned account, never signed a transaction (nonce 0); that this address is Puzzle #2's escrow is a strong inference from the funder and amount matching Puzzle #1, not stated directly by the author
- `published`: 2018-08-06 https://www.youtube.com/watch?v=TRUUTryah70
- `puzzle_type`: raw-private-key, image-stego, video-series
- `target_format`: 64-character hex private key (32 bytes), secp256k1, Keccak-256 of the uncompressed public key to a 20-byte address, no BIP39, no passphrase, no derivation path
- `difficulty_left`: external-info
- `difficulty_note`: the transform is certified; what remains is finishing a visual read of Puzzle #2's two videos, about 40 to 50 of 64 hex characters legible today
- `tested_total`: {'candidates': 1, 'families': 2, 'certified': True}

**Адреса и проверенное состояние:**
- `0x1fa8Be9De5bBFE047C72dB8E8E3257128F7661ad` — escrow | main | ожидается: 0.05 ETH | проверено 2026-08-16: **funded-unspent**
  - https://etherscan.io/address/0x1fa8Be9De5bBFE047C72dB8E8E3257128F7661ad

**Деривация:**
- read a 64-character hex private key hidden as composite glyphs across the two Puzzle #2 videos, then derive secp256k1 -> Keccak-256 -> last 20 bytes to an Ethereum address
- оракул: `tools/oracle.py` | сертифицирован: True
- сверено с: Puzzle #1's own published solution (64-hex answer read from its solution video), which derives to the address that received and was later spent from for that puzzle's own 0.05 ETH prize in 2018

**Зацепки (OCP `leads`):**
  - title: Replay Puzzle #1 end to end to fix the reading grammar | status: open
  - title: Finish the planned template-matching pass against Puzzle #1's glyph shapes | status: open
  - title: Bounded 16^8 sweep if a small gap remains after reading | status: open

**Материалы третьих лиц:**
- No video frames, screenshots, or video files are included; both puzzles are linked by video ID only. The certification vector (Puzzle #1's already-solved private key) is drawn from the author's own public solution video for a prize claimed and spent by an unrelated third party in 2018.

**Источники (OCP `sources`):**
  - url: https://www.youtube.com/watch?v=3l1jFa3Mw0s | title: Crypto Puzzle 1, statement part 1 | date: 2018-07-19
  - url: https://www.youtube.com/watch?v=hX-pOBj8VsI | title: Crypto Puzzle 1, statement part 2 | date: 2018-07-19
  - url: https://www.youtube.com/watch?v=0jJ6XadOAWk | title: Crypto Puzzle 1 Solved! | date: 2018-07-19
  - url: https://www.youtube.com/watch?v=TRUUTryah70 | title: Crypto Puzzle 2, part 1 | date: 2018-08-06
  - url: https://www.youtube.com/watch?v=U_0DtYHDPy0 | title: Crypto Puzzle 2, part 2 | date: 2018-08-06
  - url: https://www.youtube.com/channel/UCR8-P07nNhxyEr6fwJXvjQQ | title: Channel: Crypto Puzzles | date: 2026-08-16

## Обновление (2026-10-17, Qoder)
- Тип: прогресс / исправление источника
- Суть: получены **нативные 720p60-рендиции** обоих видео (itag 298, 1280x720, 60 fps) через `yt-dlp --extractor-args "youtube:player_client=tv_embedded"`. Утверждение OCP `analysis/tested.md` от 2026-08-18 «only 360p is served» на 2026-10-17 **неверно**. На 720p60: seam-1 (гориз. шов) и seam-2 (верт. шов) при прокрутке кадра дают цельный глиф «4» — шов задуман как wrap, а не потеря пикселей; Part 2 даёт «8», «Ɔ»→«C» и слово MIRROR; вертикальная колонка Part 2 имеет 3 статических слоя (не скролл). Полного 64-hex чтения пока нет.
- Источник: https://www.youtube.com/watch?v=TRUUTryah70 , https://www.youtube.com/watch?v=U_0DtYHDPy0 , https://raw.githubusercontent.com/floflo777/open-crypto-puzzles/main/3-small-prizes/crypto-puzzles-2018-puzzle-2-0-05eth/analysis/tested.md
- Проверено: да — ffprobe 1280x720/60fps/1800 кадров, покадровый анализ 1800 кадров, реконструкция seam-ов.
- Влияние на оценку: приз 0.05 ETH жив (nonce 0, 2026-10-17); сложность остаётся external-info/visual, но 720p60 даёт материал лучше, чем у OCP. Следующие шаги: шаблоны 16 hex-глифов из solution-видео Puzzle #1; разложение 3 слоёв колонки; перебор только при остатке ≤4 символов.
- Подробности и хроника: см. LOG.md (2026-10-17, 10:20).
