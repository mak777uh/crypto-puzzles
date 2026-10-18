# Corey Phillips: Kitten Passphrase Puzzle

Индекс: [MASTER_CATALOG.md](../../MASTER_CATALOG.md) (Части 1-8). Источник данных: [open-crypto-puzzles](https://github.com/floflo777/open-crypto-puzzles).

## Кратко
- Статус: **open** (mid)
- Цепь: bitcoin
- Приз: 1001900 sats (USD 631)
- Примечание: 2 funding UTXOs summing to 1,001,900 sats, 0 spent as of 2026-08-16
- Опубликовано: 2019-07-09 https://corey-lyle-phillips.medium.com/part-1-3-turn-your-photos-into-bitcoin-private-keys-addresses-57669771cf7a
- Типы: bip39-seed, brainwallet
- Difficulty left: external-info
- the mnemonic and derivation are fully certified; about 1.16 billion passphrase candidates have been tested across curated, rule-mangled, and raw wordlist regions with 0 matches; the author states the puzzle is not meant to be solved, so the passphrase is a freely chosen secret with no confirmed public provenance

## Адреса/эскроу
- `bc1qcyrndzgy036f6ax370g8zyvlw86ulawgt0246r` — main | expected: 1001900 sats | state: funded-unspent (checked 2026-08-16) | https://mempool.space/address/bc1qcyrndzgy036f6ax370g8zyvlw86ulawgt0246r
- `bc1q57euh23y3qs2f9d5mtwpax5lqecfvrdkqce82a` — sister (empty passphrase, oracle calibration only, not a target) | expected: n/a, not a prize address | state: swept (checked 2026-08-16) | https://mempool.space/address/bc1q57euh23y3qs2f9d5mtwpax5lqecfvrdkqce82a

## Источники
- 2019-07-09 — Part 1/3: Turn Your Photos Into Bitcoin Private Keys/Addresses — https://corey-lyle-phillips.medium.com/part-1-3-turn-your-photos-into-bitcoin-private-keys-addresses-57669771cf7a
- 2020-01-05 — A Bitcoin Audio Puzzle — https://corey-lyle-phillips.medium.com/a-bitcoin-audio-puzzle-61174b9849ce
- 2026-08-16 — BTC-Puzzle-by-Corey-Phillips (community hint repository) — https://github.com/Schum-io/BTC-Puzzle-by-Corey-Phillips
- 2026-08-16 — bitimage (author's tool) — https://github.com/coreyphillips/bitimage

## Подробности
Здесь должна накапливаться расширенная информация по мере проходов: подсказки, прогресс сообщества, проверенные гипотезы, ссылки, compute-оценки. Текущий файл — скелет из OCP; заполняется автоматически в циклах.


---
## Логирование (обязательно)
См. `../../AGENT_INSTRUCTIONS.md`. Любая значимая находка/прогресс/баланс/решение (полностью или частично) **должна** быть дописана сюда с датой и ссылкой. Параллельные агенты обязаны соблюдать тот же протокол.

## OCP deep docs
- Folder: https://github.com/floflo777/open-crypto-puzzles/tree/main/2-mid-prizes/corey-phillips-kitten-passphrase-1msats
- README (raw): https://raw.githubusercontent.com/floflo777/open-crypto-puzzles/main/2-mid-prizes/corey-phillips-kitten-passphrase-1msats/README.md
## Досье Hark v2 (16.10.2026)

Перенесено из `MASTER_CATALOG_v2_2026-10-16.md` (рабочие досье агентов Hark, 16.10.2026 23:40 МСК). Картина механизма, подсказок, проверенных и отброшенных гипотез, оракулов и файлов.

### B31. Kitten Passphrase Puzzle — 0,0010019 BTC
- ⚠️ Дубль B16 (Corey Phillips Kitten) с ошибкой: приз 0,010019 BTC, неизвестна только BIP39-passphrase (24 слова публичны). См. 8.5.


### Corey Phillips «Kitten passphrase» (bitimage) — 1 001 900 сат (0,010019 BTC)
- **Адрес/сеть/путь**: `bc1qcyrndzgy036f6ax370g8zyvlw86ulawgt0246r`, BTC P2WPKH, `m/84'/0'/0'/0/0`. 2 входа, трат нет.
- **Баланс**: 1 001 900 сат, потрачено 0 — mempool.space 15.10 ~02:40 MSK (позже отдельно не проверяли; адрес входит в strategy/bal.sh).
- **Источники**: Medium 09.07.2019 «Part 1/3: Turn Your Photos Into Bitcoin Private Keys/Addresses» https://corey-lyle-phillips.medium.com/part-1-3-turn-your-photos-into-bitcoin-private-keys-addresses-57669771cf7a ; код https://github.com/coreyphillips/bitimage ; аудио-пазл автора (решён) https://corey-lyle-phillips.medium.com/a-bitcoin-audio-puzzle-61174b9849ce ; хинт-репо сообщества https://github.com/Schum-io/BTC-Puzzle-by-Corey-Phillips ; OCP `/workspace/work/open-crypto-puzzles/2-mid-prizes/corey-phillips-kitten-passphrase-1msats/`.
- **Механизм**: kitten.jpeg → base64 → SHA-256 `1808d353…4832ed` → BIP39 24 слова — ПУБЛИЧНЫ и фиксированы: «blossom educate state course sick fresh color divide number soap please pull glide weather join grit depart dynamic tenant leopard alter piano slight room». Единственная неизвестная — BIP39-пассфраза (произвольная строка). Пустая пассфраза → сестринский адрес `bc1q57euh23y3qs2f9d5mtwpax5lqecfvrdkqce82a` (≈0,00095 BTC, опустошён в 2019 и 2024 — не цель).
- **Подсказки**: автор 09.07.2019: «Remember, this is not meant to be solved»; «assuming the passphrase is sufficient and cannot be easily brute-forced» — пассфраза задумана стойкой. Подсказок о длине/теме нет. Хинт-репо про стего относится к картинке Антонопулоса 2015 г., не к kitten.jpeg.
- **Что установлено**: мнемоника воспроизводится (OCP selftest и наш kpaths.py дают сестринский адрес); картинка без скрытых данных (OCP 13.06.2026); 108-словный корпус и 35-словный список OCP НЕ опубликованы (у нас реконструкция corpus_v1, 80 тематич. слов).
- **Проверено и отброшено (все 0)**: OCP — rockyou+best64 1,10·10⁹; rockyou 14,3 млн; 108 слов × 8 rule-сетов 23,7 млн; пароль-листы 9,0 млн; «шутки» автора 2,8 млн; skullsecurity 705 тыс.; цитаты + весь BIP39 одним словом 29 201; 2-словный комбинатор 35 сл. × 6 стилей 7 350; альт. индексы BIP84 432; сообщение аудио-пазла («i am 24 words long and found on path 84») 32; btcrecover 7 454. Итого OCP ≈1,155·10⁹. Мы: corpus_v1 39 838 кандидатов × 60 путей (BIP44/49/84, акк. 0'/1', change 0/1, index 0–4), 15.10, свидетель найден; цитаты автора из его текстов 154 × 60 путей (16.10 ~11:50).
- **Что осталось**: 3-словный комбинатор по нашим 80 словам (80³×6 = 3,07 млн, ≈1 ч на 2 CPU) — снят правилом Ильи 16.10 «идеи, а не переборы»; заменён идеей цитат (0). Писать автору — только с согласия Ильи, польза мала.
- **Каталог — исправления**: B31 «Kitten Passphrase Puzzle — 0,0010019 BTC, найти 1 слово» — ДУБЛЬ B16 с ошибкой (приз 0,010019 BTC; неизвестна пассфраза, а не слово сида). B42 «Bitimage ~0,00095 BTC» — это сестринский адрес без пассфразы, уже опустошён.
- **Оракул, скорость, файлы**: OCP `tools/oracle.py` (ecdsa, `--selftest` OK 15.10; ≈430/с на ядро). Наш `/workspace/projects/b6983d3d-52f5-48f8-9974-b99dc8e31c55/work/kitten/kpaths.py` (coincurve, 60 путей, ≈230 канд/с на 2 ядрах, `--selftest`), `corpus_v1.txt`, `part_00..02`. Досье `/workspace/projects/b6983d3d-52f5-48f8-9974-b99dc8e31c55/strategy/dossiers/kitten.md` (15.10 02:50); идея 16.10 — `strategy/IDEAS.md`, `strategy/QUEUE.md`. GPU-эталон OCP 690 000/с.
- **Проекты Hark и статус**: отдельного проекта нет; ведёт стратег «работа» `b6983d3d-52f5-48f8-9974-b99dc8e31c55` (циклы ~15 мин, сейчас заняты Genesis); активной работы по Kitten после 16.10 11:50 нет.
- **Оценка шансов**: ~0,3% (досье, ярус 3). По сути «угадать пароль человека» без GPU.

---

## Оперативный статус v2 (16.10.2026 ~23:30 МСК)

Строка из сводной таблицы `MASTER_CATALOG_v2` (Часть 0.3):

| Kitten | 1 001 900 сат, не тронут | ~0,3% | Угадать passphrase человека; 154 цитаты автора = 0 | ярус 3 |

## OCP: машинные данные (puzzles.json, 16.10.2026)

Структурированные данные из `puzzles.json` репозитория [open-crypto-puzzles](https://github.com/floflo777/open-crypto-puzzles) (snapshot OCP: 2026-08-16; цены: {'date': '2026-08-16', 'BTC': 63000, 'ETH': 1880, 'AR': 1.81, 'LTC': 54}).

- `slug`: corey-phillips-kitten-passphrase-1msats
- `title`: Corey Phillips: Kitten Passphrase Puzzle
- `status`: **open**
- `tier`: mid | `chain`: bitcoin
- `series`: None
- `author`: Corey Phillips | medium:corey-lyle-phillips, github:coreyphillips, x:coreylphillips
- `prize`: 1001900 sats (оценка $631 на 2026-08-16) — 2 funding UTXOs summing to 1,001,900 sats, 0 spent as of 2026-08-16
- `published`: 2019-07-09 https://corey-lyle-phillips.medium.com/part-1-3-turn-your-photos-into-bitcoin-private-keys-addresses-57669771cf7a
- `puzzle_type`: bip39-seed, brainwallet
- `target_format`: BIP39 24 words (fixed, public), unknown passphrase, BIP84 m/84'/0'/0'/0/0
- `difficulty_left`: external-info
- `difficulty_note`: the mnemonic and derivation are fully certified; about 1.16 billion passphrase candidates have been tested across curated, rule-mangled, and raw wordlist regions with 0 matches; the author states the puzzle is not meant to be solved, so the passphrase is a freely chosen secret with no confirmed public provenance
- `tested_total`: {'candidates': 1155064682, 'families': 11, 'certified': True}

**Адреса и проверенное состояние:**
- `bc1qcyrndzgy036f6ax370g8zyvlw86ulawgt0246r` — escrow | main | ожидается: 1001900 sats | проверено 2026-08-16: **funded-unspent**
  - https://mempool.space/address/bc1qcyrndzgy036f6ax370g8zyvlw86ulawgt0246r
- `bc1q57euh23y3qs2f9d5mtwpax5lqecfvrdkqce82a` — decoy | sister (empty passphrase, oracle calibration only, not a target) | ожидается: n/a, not a prize address | проверено 2026-08-16: **swept**
  - https://mempool.space/address/bc1q57euh23y3qs2f9d5mtwpax5lqecfvrdkqce82a

**Деривация:**
- hash the published image (base64 then SHA-256) to get fixed BIP39 entropy for a public 24-word mnemonic; the unknown passphrase plus the mnemonic derive the seed, then BIP84 m/84'/0'/0'/0/0 gives the P2WPKH address
- оракул: `tools/oracle.py` | сертифицирован: True
- сверено с: the sister address bc1q57euh23y3qs2f9d5mtwpax5lqecfvrdkqce82a for an empty passphrase, and sha256(base64(kitten.jpeg)) matching the author's own published value

**Зацепки (OCP `leads`):**
  - title: ask the author directly | status: open
  - title: safety-net derivation on BIP44 and BIP49 | status: open
  - title: three-word thematic combinator | status: open

**Артефакты (OCP `artifacts`):**
  - source: https://corey-lyle-phillips.medium.com/part-1-3-turn-your-photos-into-bitcoin-private-keys-addresses-57669771cf7a

**Материалы третьих лиц:**
- clues/kitten.jpeg is the author-published puzzle image, byte-identical to the original, sha256 recorded in artifacts[]; no wordlists or third-party bulk data included, only my own derived candidate counts

**Источники (OCP `sources`):**
  - url: https://corey-lyle-phillips.medium.com/part-1-3-turn-your-photos-into-bitcoin-private-keys-addresses-57669771cf7a | title: Part 1/3: Turn Your Photos Into Bitcoin Private Keys/Addresses | date: 2019-07-09
  - url: https://corey-lyle-phillips.medium.com/a-bitcoin-audio-puzzle-61174b9849ce | title: A Bitcoin Audio Puzzle | date: 2020-01-05
  - url: https://github.com/Schum-io/BTC-Puzzle-by-Corey-Phillips | title: BTC-Puzzle-by-Corey-Phillips (community hint repository) | date: 2026-08-16
  - url: https://github.com/coreyphillips/bitimage | title: bitimage (author's tool) | date: 2026-08-16
