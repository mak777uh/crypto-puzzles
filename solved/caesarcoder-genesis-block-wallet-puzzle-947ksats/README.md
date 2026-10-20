# Genesis Block Wallet Puzzle

Индекс: [MASTER_CATALOG.md](../../MASTER_CATALOG.md) (Части 1-8). Источник данных: [open-crypto-puzzles](https://github.com/floflo777/open-crypto-puzzles).

## Кратко
- Статус: ~~open (small)~~ → **РЕШЁН и СНЯТ третьей стороной** (свип 2026-10-17 03:40 UTC; баланс эскроу 0 — проверено нами on-chain 2026-10-18). См. ниже «Обновление (2026-10-18, OCP Sync)». Папка перенесена в `solved/caesarcoder-genesis-block-wallet-puzzle-947ksats`.
- Цепь: bitcoin
- Приз: ~~168779 sats (USD 106)~~ (наблюдаемый 2026-09-12) → **947 620 сат в 120 выходах на момент свипа**, выведено 935 266 сат нетто
- Примечание: 24 P2WSH outputs to one witness script; the jackpot grows because the author relays every paid question into the escrow (125,779 sats on 2026-08-24, 142,779 on 2026-08-29, 168,779 on 2026-09-12)
- Опубликовано: 2026-08-22 https://mempool.space/tx/b691de3657880d9a1eabd2783b1a9fa8c5313ced338495bf10e85727012d7a77
- Типы: multisig, raw-private-key
- Difficulty left: insight
- the lock is fully characterized (2-of-2 P2WSH, exact offline oracle) and the corpus is 285 public bytes; passes 1 and 2 (2026-08-29) exhausted the mechanical readings of the August hints (611,008 keys, 5.7e11 ordered pairs, 0 match with witnesses); the author's answers of 2026-09-10 and 2026-09-11, bought by a reader with the questions drafted here, name the root: a 12-word BIP39 mnemonic with entropy taken from the genesis block, a passphrase, and a genesis value as the BIP48 account; pass 3 (2026-09-12, 1.57 million keys, 2.46e12 pairs, witnesses re-found) shows the passphrase is none of 53 obvious readings of the block; it is the one thing the author has not described

## Адреса/эскроу
- `bc1qfkhx02v89u2qyyyljeczw6hu9sr437y44t7ae5yf09thrdukfqesnjg2wj` — main (P2WSH, witness program 4dae67a9872f1402109f9670276afc2c0758f895aafddcd089795771b7964833) | expected: 168779 sats in 24 outputs, growing | state: funded-unspent (checked 2026-09-12) | https://mempool.space/address/bc1qfkhx02v89u2qyyyljeczw6hu9sr437y44t7ae5yf09thrdukfqesnjg2wj

## Источники
- 2026-08-22 — Announcement transaction, block 963629 — https://mempool.space/tx/b691de3657880d9a1eabd2783b1a9fa8c5313ced338495bf10e85727012d7a77
- 2026-08-29 — Escrow address and full on-chain dialogue — https://mempool.space/address/bc1qfkhx02v89u2qyyyljeczw6hu9sr437y44t7ae5yf09thrdukfqesnjg2wj
- 2026-08-23 — Galaxy Research, first public report (X) — https://x.com/glxyresearch/status/2091349771952742566
- 2026-08-23 — crypto.news, Bitcoin puzzle hides wallet key in Genesis Block data — https://crypto.news/bitcoin-puzzle-hides-wallet-key-in-genesis-block-data/
- 2026-08-23 — U.Today, Satoshi's Code Reopened — https://u.today/satoshis-code-reopened-someone-just-deciphered-bitcoin-puzzle-into-genesis-block-data
- 2026-08-23 — Blockmedia (Korean) — https://www.blockmedia.co.kr/archives/1131026

## Подробности
Здесь должна накапливаться расширенная информация по мере проходов: подсказки, прогресс сообщества, проверенные гипотезы, ссылки, compute-оценки. Текущий файл — скелет из OCP; заполняется автоматически в циклах.


---
## Логирование (обязательно)
См. `../../AGENT_INSTRUCTIONS.md`. **Полная хроника всех агентов — в `LOG.md` этой папки** (по датам, с самопредставлением при первом заходе, включая отрицательные результаты; код — в `tools/`, данные — в `data/`). Сюда, в README, дописываем только прорывы и важное (с датой и ссылкой); глобальные изменения — в `../../MASTER_CATALOG.md` + `../../WAKE_QUEUE.md`. Параллельные агенты обязаны соблюдать тот же протокол.

## OCP deep docs
- Folder: https://github.com/floflo777/open-crypto-puzzles/tree/main/3-small-prizes/genesis-block-wallet-puzzle-142ksats
- README (raw): https://raw.githubusercontent.com/floflo777/open-crypto-puzzles/main/3-small-prizes/genesis-block-wallet-puzzle-142ksats/README.md


## Curated deep dive (OCP, 16.10.2026)
- Формат: 2-of-2 P2WSH (m/48'/0'/account'/script_type' BIP48-shaped путь; корень - BIP39 12 слов, энтропия из genesis-блока; passphrase).
- Hint'ы автора (OP_RETURN): «both keys use the same Genesis field, and there is no hash»; «root = master key from BIP39 seed; genesis_data = BIP48 account»; passphrase = имя получателя первой tx, 2 слова через пробел, 1-е короче 2-го; «Try all four forms: binary, hex, decimal, ASCII».
- Проходы: pass1 (чтения августовских подсказок) 611k ключей, 0; pass2 (library-specific roots, raw 64-byte extkey, raw key zero chain code) - killed; pass3: 16-byte genesis windows как 12-word entropy, 53 passphrase, genesis integers как BIP48 account, script types 0/1/2 - 2.46e12 пар - killed; passphrase ни одно из 53 очевидных чтений блока.
- Зацепки: (1) спросить автора о природе passphrase on-chain (черновик 79 байт в README); (2) wave2 текстовых вариантов; (3) следить за OP_RETURN/spend.
- Баланс: 168 779 сат на 12.09.2026, 24 выхода, растёт.
## Досье Hark v2 (16.10.2026)

Перенесено из `MASTER_CATALOG_v2_2026-10-16.md` (рабочие досье агентов Hark, 16.10.2026 23:40 МСК). Картина механизма, подсказок, проверенных и отброшенных гипотез, оракулов и файлов.

### Genesis Block Wallet Puzzle — эскроу растёт: 904 589 sat (16.10 10:55 MSK, 109 tx), затем 114 tx (16.10 21:50 MSK, сумму не записали)
- **Адрес/сеть**: BTC mainnet, `bc1qfkhx02v89u2qyyyljeczw6hu9sr437y44t7ae5yf09thrdukfqesnjg2wj`: P2WSH v0, witness program `4dae67a9872f1402109f9670276afc2c0758f895aafddcd089795771b7964833`, скрипт `OP_2 <keyA> <keyB> OP_2 OP_CHECKMULTISIG` (2-of-2, нужны оба ключа). Каждый платный вопрос автор переводит в эскроу, поэтому приз растёт. У автора отдельно есть выход 1 000 000 sat на `bc1qw8uecdjvuedtkg4s2kku4s2ak9r2cm59khclfr`: это не приз (по данным OCP).
- **Путь деривации**: BIP39 (12 слов + пассфраза) → master BIP32 → `m/48'/0'/X'/2'/c/i`, где c=0, i≤9 или c=1, i≤4 (автор, 10-03). X — номер аккаунта BIP48, «сырое значение именованного поля генезиса без хэша», хотя бы один ≥2^22 (автор, 16.10). Кандидаты: version 1, time 1231006505, bits 486604799, nonce 2083236893. Для поиска X не нужен: оракул сверяет master fingerprint. X понадобится только для вывода средств.
- **Баланс — откуда противоречие в каталоге**: это не противоречие, а снимки разных дат на растущем адресе:
  - 168 779 sat, 24 выхода: снимок OCP на 12.09;
  - 761 377 sat, 96 tx, 0 трат: наша проверка 12.10 (`/workspace/work/btc_puzzles/REPORT.md`);
  - 0,008722 BTC: 13.10 (дневной лог координатора);
  - 878 140 sat, 103 tx, spent 0: 14.10 15:20 и 15.10 02:20 MSK (mempool.space API, досье);
  - 904 589 sat, 109 tx: 16.10 10:55 MSK;
  - tx_count=114: 16.10 21:50 и 23:15 MSK (`strategy/LOG.md`), сумму не записали.
  - Траты из эскроу: 0 на все даты.
- **Источники**:
  - Единственный канал автора — OP_RETURN на адресе эскроу: https://mempool.space/address/bc1qfkhx02v89u2qyyyljeczw6hu9sr437y44t7ae5yf09thrdukfqesnjg2wj
  - Анонс: tx `b691de36…`, 2026-08-22, https://mempool.space/tx/b691de3657880d9a1eabd2783b1a9fa8c5313ced338495bf10e85727012d7a77
  - X: https://x.com/glxyresearch/status/2091729030160507360
  - Пресса: https://crypto.news/bitcoin-puzzle-hides-wallet-key-in-genesis-block-data/
  - OCP: https://github.com/floflo777/open-crypto-puzzles/tree/main/3-small-prizes/genesis-block-wallet-puzzle-142ksats
  - Трекер: https://puzzles.agntn.dev/collections/genesis
  - Форум: https://bitcointalk.org/index.php?topic=5595459.0
  - agntn считает автором @caesrcd (https://x.com/caesrcd/status/2107565388527456292; GitHub caesrcd — форк Sparrow). Мы это не проверяли.
- **Механизм (конвейер, сверен с ответами автора)**:
  1. Обычный lowercase raw-hex генезис-блока, 570 символов (как `mempool.space/api/block/000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f/raw`). Скопирован с mempool.space, склеен `tr -d '\n'` в одну строку без перевода строки.
  2. `cut -b N-M`: непрерывный срез чётной длины ≥66 (для A и B), не с 1-го байта (для A), не выходит за конец строки. Длина одинаковая у обоих косайнеров.
  3. `sha256sum` от ASCII-текста среза без `\n` → первые 32 hex → Ian Coleman, Entropy Type = Hex → 12 английских слов.
  4. Пассфраза: ровно 2 слова через один пробел, только ASCII-буквы, одна и та же у обоих косайнеров. Каждое слово — имя или фамилия «того, кто получил первую транзакцию». Для B первое слово короче второго, 3-буквенных слов нет.
  5. Master FP: A = `0852014c` (автор подтвердил 10-03), B = `040e2791` (назван игроком 10-08; автор ответил «для 040e2791», но явно не подтверждал).
- **Подсказки автора (ключевые; полный дословный список из 48 tx — в досье)**:
  - 08-22 `b691de36`: «extremely low entropy… everything was in the genesis block».
  - 08-23 `ef63243d`: «Two keys, both required».
  - 08-24 `82a076b0`: «same Genesis field, and there is no hash». Позже опровергнуто — верен поздний ответ 09-24.
  - 08-28 `8be47960`: «root -> multisig -> mainnet -> genesis_data -> script_type».
  - 09-10 `cb47c7a7`: root = master из BIP39-seed, genesis_data = номер аккаунта BIP48.
  - 09-11 `f8f04fc0`: 12 слов, пассфраза есть.
  - 09-14 `a137a898`: «Passphrase: Who received the first transaction?»
  - 09-15 `a3878ff0`: пассфраза — имя; энтропия — не сырые 16 байт.
  - 09-16 `e38caf86`: «128-bit digest».
  - 09-17 `ed010443`: «binary, hex, decimal, or ASCII — try all four».
  - 09-24 `ae906bde`: «First 128 bits of SHA-256».
  - 09-25 `e3ab67c0`: «contiguous piece… copy-pasting the tool's output».
  - 09-26 `88fc7fd6`: «The genesis block is only 2.5E-32 of the 2^128» (≈2^23).
  - 09-27 `dcd7d399`: инструменты bitcoin-cli, cut, jq, tr, sha256sum, iancoleman/bip39, OogaBoogaX/entropylab.
  - 09-28 `9da63c9f`: «1) a; 2) b» — правка до sha256; первые 32 hex как raw-энтропия.
  - 09-30 `3678a0e3` / `1f0f0af2`: hex, substring/cut, без `\n`; пассфраза одна у обоих; UTF-8-текст; Hex.
  - 10-01 `41a68f4a` / `b050d645`: длина чётная, разная по ответам; «cut ≤32 Y, ≤16 N» — противоречит ответу 10-07.
  - 10-03 `719623a4` / `d2ae17e2`: `cut -b N-M`; только ASCII; FP A = depth-0 master с пассфразой; путь m/48'/0'/X'/2'/c/i.
  - 10-05 `221021e6`: две части через один пробел, обе — имена получателя.
  - 10-06 `05ab6e90`: **контрольный вектор**: текст `000000000019d6689c08` + пассфраза «Test Example» → первое слово `host`, FP `b7f4182b`.
  - 10-06 `3e53ba38`: длина вне 18–32; не с 1-го байта; explorer; raw block hex.
  - 10-07 `9750cd4a`: mempool.space, HTML-страница, одна строка; 570 lowercase; длина чётная ≥66; за конец не выходит.
  - 10-09 `9d789e14` (для B): то же; первое слово короче; 3-буквенных нет.
  - 10-10 `c41a5e9c`: 2^23 = диапазоны cut × формы пароля; «Hal Finney?» — Declined.
  - 10-14 `d416a276`: «tr -d '\n'».
  - 15.10: «1) a; 2) c; 3) Declined; 4) n» — форм пароля 1–32, диапазонов cut >2^17, опечатки нет.
  - 16.10 `3fee7cef`: «1) Y; 2) Declined; 3) d; 4) Y» — оба аккаунта из сырого поля генезиса, один ≥2^22.
  - 16.10 вечер (по LOG/диалогу, кто спрашивал — записано неоднозначно): «1) Declined; 2) c85bcea3» по тесту `cut -b 2-67` + «Test Example». Наши варианты LF / без LF дали d1642212 / a9be51f9 — не совпали («one step differs»). Tx `f1aeed6d…` с тест-векторами (cut 1-1, 2-2, 3-3, 1-4, 1-2000, 263-400, 1-66…) — ответа нет на 16.10 21:50.
  - Зашифрованные ответы (BIE1) покупателям pubkeys и аккаунтов (bc1qdu8m, bc1qax0h = 0xflorent, bc1qrzqq, bc1q7x7y, bc1qlahu, bc1qpcmr, bc1qsese, bc1qyas2) нам недоступны.
- **Что установлено**:
  - Наш конвейер (`core.py` / `gw.py`) воспроизводит вектор автора host/b7f4182b.
  - Генезис-hex (570 символов) сверен по хэшу заголовка.
  - Пространство: 64 009 срезов (чётные L≥66, любой старт), без старта с 1-го байта — 63 756.
  - Из всех 162 735 подстрок × ≤32 форм ≈ 2^22,3 — это согласуется с «2^23» автора как грубой оценкой. Модель срезов не расширяли (QUEUE 16.10 10:55).
  - Под форму B логичнее всего подходит «Satoshi Nakamoto» (7<8). «Hal Finney» исключён по форме: Hal = 3 буквы, Harold / Thomas / Finney — по 6.
  - Конкурентов не меньше 6–8, у части есть купленные pubkeys и аккаунты; наше преимущество — ноль.
- **Проверено и отброшено (оба FP, lowercase-hex без `\n`, если не сказано иначе)**:
  - Все 81 225 чётных срезов L=2..570 × «Satoshi Nakamoto» в 9 регистрах → 731 тыс. → 0 (12.10).
  - 81 225 × 90 форм Hal/Harold/Thomas Finney и опечаток Nakamoto (`pp_pass2`) → 7,3 млн → 0 (12.10).
  - Многострочное копирование (W 32–128) × 9 форм SN → 305 тыс. → 0. Хвостовой `\n` и 16 регистров → 1,47 млн → 0. UPPER-hex × 16 SN → 1,02 млн → 0. Байт-реверс FP → 1,02 млн → 0. Пробелы по краям → 1,72 млн → 0 (всё 12.10).
  - Jeremy Sturdivant / Hall Finney / Laszlo Hanyecz (lower) → 1,72 млн → 0 (12.10). Jeremy UPPER → 576 тыс. → 0 (14.10 15:39).
  - new3 (dustin trammell, jercos sturdivant, malmi martti × 9) lower и UPPER → 2×1,73 млн → 0 (14.10).
  - **satvar_lower**: 255 вариантов написания SN, lower-текст, все 64 009 срезов → ≈16,3 млн → 0. Завершён 16.10 ≈14:43–15:45 MSK (`state/satvar_lower.log`: FINISHED 64009).
  - Варианты конвейера под тест-вектор `c85bcea3` (sha256 / sha256d / sha1 / md5, текст / бинарь, LF / CRLF, first / last16, сдвиги ±1, регистр) → 3 240 → 0 (16.10 21:50).
  - ПК-агент Ильи (лог 2026-10-14) → ≈100+ млн → 0: core4 {Hal, Harold, Thomas, Finney} 144 формы, Satoshi/Nakamoto+Finney, waveExtra 24 пары (dorian nakamoto, fran finney, laszlo hanyecz, gavin andresen и др.), уменьшительные harry/tommy/thom/finn; текст lower и UPPER.
  - Чужие: игрок `10edb831` — 1,8 млн «name name», 2,7e11 корней → 0. OCP passes 1–3 и PR #21 — устаревшая модель.
  - Итого у нас ≈39 млн кандидатов с satvar, у ПК ≈100+ млн — всё 0.
- **Что осталось / следующий шаг**:
  - (1) QUEUE «Genesis-идея» (высший приоритет, не сделан на 16.10 23:15): по подсказкам 15–16.10 (≤32 форм, cut >2^17, аккаунты = сырое поле) вывести конкретно, что такое cut и какие формы, — ≤10^4 кандидатов. Правило Ильи 16.10 11:33: «идеи, а не переборы», массовые счёты >10^6 запрещены.
  - (2) Разобрать ответ на тест-вектор `c85bcea3` (cut 2-67, «Test Example»): если удастся воспроизвести — это прямая калибровка шага, которым наш конвейер отличается.
  - (3) satvar_upper (`python3 sweep2.py satvar_upper pp_sat_variants.json upper 0 64009 780` в `/workspace/work/genesis`, ≈16,3 млн, ≈2 ч на 2 CPU) — по QUEUE НЕ запускать без идеи.
  - (4) relaxed 68 пар / 612 форм ≈78,3 млн — только на ПК Ильи.
  - (5) Платный вопрос автору — трата: денег нет (Илья 14.10 16:24), не предлагать.
  - Раз в цикл проверять tx_count (>114 → новые OP_RETURN).
- **Оракул, скорость, файлы**:
  - `/workspace/work/genesis/core.py` (PBKDF2 через OpenSSL + coincurve) и раннер `/workspace/work/genesis/sweep2.py JOB PPFILE CASE LO HI TIME`: прогресс в `state/JOB.progress`, лог в `state/JOB.log`, хиты только в `.secret` (600) с печатью «HIT A/B idx pp#».
  - Самотест host/b7f4182b PASS, маяк ловится.
  - Скорость ≈1 230 канд/с на ядро, 2 090–2 320/с на 2 CPU; 513–1 180/с, когда CPU делят с другими.
  - После перезапуска песочницы: `pip install -q coincurve`, `PYTHONPATH=/workspace/projects/b6983d3d-52f5-48f8-9974-b99dc8e31c55/work/pylib`.
  - Списки паролей: `/workspace/work/genesis/pp_*.json`.
  - Что проверено: `/workspace/work/genesis/tested.md`. Очередь: `/workspace/work/genesis/QUEUE.md`. Диалог до 10-10 и сводка 16.10: `/workspace/work/genesis/opreturn_dialog.txt`.
  - Выгрузка 103 tx: `/workspace/projects/b6983d3d-52f5-48f8-9974-b99dc8e31c55/work/genesis_txs_2026-10-15.json` (`fetch_genesis.py`, `gen_hints.py` → `genesis_hints.md`).
  - Старый набор: `/workspace/work/btc_puzzles/` (`gw.py`, `search*.py`, `genesis570.hex`, `english.txt`, `REPORT.md`).
  - Досье: `/workspace/projects/b6983d3d-52f5-48f8-9974-b99dc8e31c55/strategy/dossiers/genesis.md`.
  - Финальная проверка ключей — OCP `tools/oracle.py --selftest`. Вывод только приватной отправкой майнеру: слабые ключи можно перехватить через RBF в мемпуле.
- **Проекты Hark и статус**:
  - 12.10: выбрана целью (проект «наука леарн выплаты»), в тот же день остановлена правилом Ильи «без переборов» (pass3 убит на 0).
  - 14.10 15:30: создан проект **e65d8e8f-3d9a-4f62-8af5-886d71088b65** «Genesis Block Wallet», задача a8e1265d каждые 20 мин. Последнее сообщение в журнале — 14.10 21:56 (satvar_lower ≈1000/64009).
  - 14.10 22:05: Илья отменил все биткоин-загадки, Genesis остановлен.
  - 15.10 01:41: возобновлено в проекте-стратеге **b6983d3d-52f5-48f8-9974-b99dc8e31c55** (задача стратега b0ef392a каждые 15 мин, ярус 1).
  - 15.10 03:15 – 16.10 10:50: ≈31 ч холостых «коротких циклов»: фон умер на 14000, перезапущен 16.10 10:50.
  - На 16.10 23:15 MSK: lower закрыт, новых идей нет, счёт не идёт.
- **Оценка шансов**: ≈2% (досье 15.10). Всё вероятное по форме (семейство SN, Hal Finney) уже 0. Либо модель неверна в одном шаге (на это намекает «one step differs» по тест-вектору), либо имя неочевидное. У конкурентов есть GPU и купленные ключи.

## Оперативный статус v2 (16.10.2026 ~23:30 МСК)

Строка из сводной таблицы `MASTER_CATALOG_v2` (Часть 0.3):

| Genesis Block | 935 550 сат, 114 tx, трат 0 (растёт) | ~2% | 255 форм «Satoshi Nakamoto» × 64 009 срезов = 0; нужна схема по новым OP_RETURN-ответам автора | стратег b6983d3d |

## Досье agntn/puzzles (16.10.2026)

Перенесено из реестра [@agntn/puzzles](https://puzzles.agntn.dev/collections/genesis) (raw: https://puzzles.agntn.dev/collections/genesis.md). Ниже — разбор первоисточника: механика, кто решал, что проверено.


> Explore the Genesis Block Wallet Puzzle and the author's Bitcoin OP_RETURN replies. Follow the clues and check the prize balance without mistaking a hint for a solution

The **Genesis Block Wallet Puzzle** is an unsolved Bitcoin challenge announced on August 22, 2026. Its anonymous creator says everything needed to generate the wallet is in Bitcoin's first block. Public data. Extremely low entropy. No backup needed.

Sounds like a friendly warm-up. Then the hints say there are **two keys, and you need both**. Nice little catch.

## Two keys and a very old block

The [announcement](https://mempool.space/tx/b691de3657880d9a1eabd2783b1a9fa8c5313ced338495bf10e85727012d7a77) sits in an `OP_RETURN` output in block 963629. That's a message written into a Bitcoin transaction, not a private conversation or a disappearing post.

The target is a **P2WSH address**:

```text
bc1qfkhx02v89u2qyyyljeczw6hu9sr437y44t7ae5yf09thrdukfqesnjg2wj
```

According to the replies, the wallet uses a 2-of-2 multisig. Both keys come from the same Genesis block field. Later clues mention BIP39 with twelve words and a passphrase, followed by BIP48. So the puzzle points back to 2009, but the wallet uses much newer conventions.

Those are the author's claims. The witness script and public keys are not recorded here, and a clue is not a verified recipe. The author has offered the two public keys for 50k sats since September 17. The September 24 terms add 1k to the author's address and deliver the keys encrypted to the buyer. Bought, not published.

## Genesis puzzle hints in OP_RETURN, not answers

The record keeps every public reply through October 7, 2026. With the announcement that's <dataset-count collection="genesis" of="hints">

</dataset-count>

 hints, and counting. Some narrow the puzzle. Others explain how to buy another hint. Bitcoin support tickets, apparently.

The useful turns in the conversation include:

- **The Genesis field:** both keys use the same field and are derived independently.
- **The newspaper:** one reply says The Times can stand in for the Genesis block.
- **The wallet format:** later replies name BIP39, twelve words, a passphrase and a BIP48 account number drawn from Genesis data.
- **The passphrase:** the author asks who received the first transaction, then says it is a name.
- **The entropy:** a September reply calls it a 128-bit digest, not raw sixteen-byte data. On September 24 the author spelled it out: the first 128 bits of a SHA-256 hash.
- **The hashed input:** a contiguous piece of the block, copied and pasted exactly as a standard tool prints it. Nothing typed by hand, nothing stitched together.
- **The toolchain:** on September 27 the author listed what made the twelve words: `bitcoin-cli`, `cut`, `jq`, `tr`, `sha256sum`, iancoleman/bip39 and OogaBoogaX/entropylab. Plus a warning that the block is small and the rest takes brute force.
- **The pipeline:** a day later, two letters. `jq`, `cut` and `tr` changed the text before `sha256sum`, and the first 32 hex of the digest went in as raw entropy, not through Ian Coleman's option that turns text into words.
- **All at once:** a declined offer for a master fingerprint came back with a reason. Without the passphrase the fingerprint would give the entropy away, so every secret piece has to be cracked at the same time. On September 28 a request for short hashes of the passphrase and the words got the same no. Any value that isolates one secret is an oracle for the others.
- **The cut:** on September 30 the hashed text turned out to be hex, a piece cut out of a tool's field, with no trailing newline. In October it got a size. Even, more than 16 characters, at most 32, the same length for both cosigners. The knife was `cut -b`. And the source? Not the raw `getblock 0` hex, just "genesis block". Thanks, that narrows it right down.
- **One cosigner by name:** a player's question named the master fingerprint `0852014c`, and on October 3 the author said yes. It's the master key with the passphrase applied, and its entropy went into Ian Coleman's tool as Hex. Both keys sit at `m/48h/0h/Xh/2h/c/i` with small indexes. Both cosigners share one passphrase, ASCII letters and spaces only. How many spaces? The answer was `¬_¬`.
- **Two names:** on October 5 the space question got its answer anyway. The passphrase is two words with one space between them. Each word is a given name or surname of whoever received the first transaction. And the hashed text isn't a clean run of 18 to 32 hex digits lifted from a known field. It's one of those fields with the length, case or ending changed.
- **A test run:** on October 6 a player asked for a dry run of the pipeline itself. The input was twenty hex characters from the start of the block hash, `000000000019d6689c08`, with `Test Example` as the passphrase. The author answered with the first word and the master fingerprint, `host` and `b7f4182b`. We ran them too. SHA-256 of the text with no newline, the first 32 hex as entropy, and both values match. So the recipe really is that boring. Good. The secrets are the hard part.
- **Where the cut came from:** an hour later, four letters. The line came from an explorer page or API, out of the raw block hex. And `cut -b` didn't start at its first byte.
- **Straight off mempool.space:** on October 7 one message answered two question sets at once. The hex came from mempool.space, copied from the page in a browser, one unbroken run. It's the usual lowercase raw block hex, all 570 characters. The hashed text is even and 66 characters or longer. And the cut didn't run past the end of the string.

Wait, wasn't an earlier answer "there is no hash"? Yes, on August 24. A month later the author named SHA-256 outright. Both messages stay in the record. Smoothing that apparent contradiction away would make the story cleaner and the evidence worse.

Same thing with the copy and paste. On September 25 the input was a piece of the block exactly as a tool shows it. On September 27 it was pasted from `bitcoin-cli` and an explorer, and in the same block the author answered N to "exactly tool copy-paste ASCII". Pasted, then trimmed with `jq`, `cut` and `tr` fits all three. It's still a reading, not a recipe.

And the length? On October 1 the cut was even, over 16 and at most 32 characters. On October 6 the hashed text's length falls outside 18 to 32. Are the cut and the hashed text two different strings? Maybe. On October 7 a player asked exactly that, with three readings to pick from. The author picked d, other, and in the same message put the hashed text at 66 characters or more. So much for 32. The record keeps every answer and doesn't pick.

Read the full texts with their dates and transaction links:

```bash
puzzles hints genesis
```

## Replies you can't read

Since September 24 some of the author's messages are encrypted. They sit in `OP_RETURN` like the rest, as base64 starting with `QklFMQ`, which decodes to `BIE1`, Electrum's message encryption. Each one opens only for the player whose public key it was encrypted to. They're on chain and still not hints here, because nobody else can read them.

The author's X account [made that a sales pitch](https://x.com/caesrcd/status/2107565388527456292) on October 6. Who wants the two public keys? The encrypted ones are already on chain, it says. True. They open for the player who paid, though, not for whoever squints hardest.

Other messages quote a player's decrypted offer before the author's answer. The [September 26 one](https://mempool.space/tx/88fc7fd69dc89b2d716814d2a1ccdc8bdf419f158c7028b37c1cb83230cda4da) does that. The offer is the player's words, so only the text after "Reason for decline:" is recorded. Questions players send to the address stay out too, even the ones the author answered. Some answers are only letters, like `1) a; 2) b.`, so each hint's note says which question it answers.

## Is the Genesis Block Wallet Puzzle solved?

**No verified solution is recorded here.** The dataset marks `genesis` as unsolved, with no key or claim transaction. A headline saying someone "deciphered" something isn't enough to change that.

The start date is the announcement's block timestamp. The record includes the initial 20,000-satoshi funding and the announcement's 5,000-satoshi deposit, not every later hint payment. `preGenesis` marks that earlier funding. The address kind is `p2wsh`. Knowing that format still doesn't give us the missing witness script.

## How much bitcoin is in the puzzle wallet?

Hint payments accumulate at the target address, so a fixed prize figure gets stale. The record leaves that amount unset. Check the [address on mempool.space](https://mempool.space/address/bc1qfkhx02v89u2qyyyljeczw6hu9sr437y44t7ae5yf09thrdukfqesnjg2wj) or ask the balance command:

```bash
puzzles balance genesis
```

The [message offering paid hints](https://mempool.space/tx/248f690de194372564baa14e1bebf08154e2f2042ed205baa6157fdc0e3f22ea) promises better hints for larger payments. That's the author's offer, not a guarantee or a recommendation to send money.

## Sources behind the Genesis puzzle clues

[floflo777's research folder](https://github.com/floflo777/open-crypto-puzzles/tree/main/3-small-prizes/genesis-block-wallet-puzzle-142ksats) collects the dialogue, research and original coverage. Its [author-posts transcript](https://github.com/floflo777/open-crypto-puzzles/blob/main/3-small-prizes/genesis-block-wallet-puzzle-142ksats/clues/author-posts.md) explains how the replies connect through change outputs.

Every message here was checked against confirmed transaction bytes. Earlier replies spend change outputs linked back to the announcement. From the [September 19 message](https://mempool.space/tx/d78593ab6288e2c9792f8c5ad8d020893d1b1dd9631eb5b1ffa5765f13029cd7) on, the replies come from the announcement's input address again. The September 27 and 28 answers go one better: each spends the 1k the question paid to that address, so the answer is chained to its question. Each hint carries that evidence. Player questions, including relayed ones, are not quietly promoted to author hints.

[Galaxy Research](https://x.com/glxyresearch/status/2091349771952742566) reported the announcement. [crypto.news](https://crypto.news/bitcoin-puzzle-hides-wallet-key-in-genesis-block-data/) and [U.Today](https://u.today/satoshis-code-reopened-someone-just-deciphered-bitcoin-puzzle-into-genesis-block-data) covered it on August 23. Useful context, but the transactions are the source for the actual clues.

## A singleton id, no name segment

`genesis` is the whole identifier, like [`gsmg`](https://puzzles.agntn.dev/collections/gsmg) and the other singletons. It used to be `genesis/block`, a name segment for a collection that only ever held one puzzle. The old page redirects here.

## The Genesis Block Wallet Puzzle record

## OCP: машинные данные (puzzles.json, 16.10.2026)

Структурированные данные из `puzzles.json` репозитория [open-crypto-puzzles](https://github.com/floflo777/open-crypto-puzzles) (snapshot OCP: 2026-09-12; цены: {'date': '2026-08-16', 'BTC': 63000, 'ETH': 1880, 'AR': 1.81, 'LTC': 54}).

- `slug`: genesis-block-wallet-puzzle-142ksats
- `title`: Genesis Block Wallet Puzzle
- `status`: **open**
- `tier`: small | `chain`: bitcoin
- `series`: None
- `author`: anonymous (on-chain only, OP_RETURN messages to the escrow)
- `prize`: 168779 sats (оценка $106 на 2026-08-16) — 24 P2WSH outputs to one witness script; the jackpot grows because the author relays every paid question into the escrow (125,779 sats on 2026-08-24, 142,779 on 2026-08-29, 168,779 on 2026-09-12)
- `published`: 2026-08-22 https://mempool.space/tx/b691de3657880d9a1eabd2783b1a9fa8c5313ced338495bf10e85727012d7a77
- `puzzle_type`: multisig, raw-private-key
- `target_format`: P2WSH v0; witness script OP_2 <keyA> <keyB> OP_2 OP_CHECKMULTISIG; both keys derived from one genesis-block field (reported: the coinbase text) without hashing; the author's derivation rule names the BIP48 levels m/48'/0'/account'/script_type'
- `difficulty_left`: insight
- `difficulty_note`: the lock is fully characterized (2-of-2 P2WSH, exact offline oracle) and the corpus is 285 public bytes; passes 1 and 2 (2026-08-29) exhausted the mechanical readings of the August hints (611,008 keys, 5.7e11 ordered pairs, 0 match with witnesses); the author's answers of 2026-09-10 and 2026-09-11, bought by a reader with the questions drafted here, name the root: a 12-word BIP39 mnemonic with entropy taken from the genesis block, a passphrase, and a genesis value as the BIP48 account; pass 3 (2026-09-12, 1.57 million keys, 2.46e12 pairs, witnesses re-found) shows the passphrase is none of 53 obvious readings of the block; it is the one thing the author has not described
- `tested_total`: {'candidates': 573973795610, 'families': 8, 'certified': True}

**Адреса и проверенное состояние:**
- `bc1qfkhx02v89u2qyyyljeczw6hu9sr437y44t7ae5yf09thrdukfqesnjg2wj` — escrow | main (P2WSH, witness program 4dae67a9872f1402109f9670276afc2c0758f895aafddcd089795771b7964833) | ожидается: 168779 sats in 24 outputs, growing | проверено 2026-09-12: **funded-unspent**
  - https://mempool.space/address/bc1qfkhx02v89u2qyyyljeczw6hu9sr437y44t7ae5yf09thrdukfqesnjg2wj

**Деривация:**
- derive two secp256k1 keys from one field of the genesis block (author's hints: the coinbase text readable in The Times, no hash, keys independent, a BIP48-shaped path with a genesis value as account), build the 2-of-2 witness script in either key order, sha256 it, and compare with the published 32-byte witness program
- оракул: `tools/oracle.py` | сертифицирован: True
- сверено с: the BIP-173 P2WSH test vector, and a real 2-of-2 P2WSH spent in block 963629 (tx 47ded3504e855ce418e46eeca4694b55a623d1e23a8e3c83292abbcf9cee9f7a, input 0) whose revealed keys rebuild the script and hash to the spent address; private key 1 to the generator point; negative control against the escrow

**Зацепки (OCP `leads`):**
  - title: ask the author about the passphrase's nature on chain (79-byte draft in the README); pass 3 shows it is none of 53 obvious readings of the block | status: open
  - title: pass 3 wave 2: text variants and every coinbase-text substring as passphrase | status: open
  - title: watch the escrow for new OP_RETURN hints or a spend before any work | status: open
  - title: pass 3: 16-byte genesis windows as 12-word entropy, 53 passphrases, genesis integers as BIP48 account, script types 0/1/2, keys paired (2.46e12 pairs) | status: killed
  - title: pass 2: library-specific roots (hashed roots, raw 64-byte extended key, raw key with zero chain code) along the same 214 paths | status: killed
  - title: pass 1: literal readings of the 2026-08-28 hints, families A to D | status: killed

**Материалы третьих лиц:**
- none: the genesis block and the author's OP_RETURN messages are public chain data; press articles are linked, not reproduced

**Источники (OCP `sources`):**
  - url: https://mempool.space/tx/b691de3657880d9a1eabd2783b1a9fa8c5313ced338495bf10e85727012d7a77 | title: Announcement transaction, block 963629 | date: 2026-08-22
  - url: https://mempool.space/address/bc1qfkhx02v89u2qyyyljeczw6hu9sr437y44t7ae5yf09thrdukfqesnjg2wj | title: Escrow address and full on-chain dialogue | date: 2026-08-29
  - url: https://x.com/glxyresearch/status/2091349771952742566 | title: Galaxy Research, first public report (X) | date: 2026-08-23
  - url: https://crypto.news/bitcoin-puzzle-hides-wallet-key-in-genesis-block-data/ | title: crypto.news, Bitcoin puzzle hides wallet key in Genesis Block data | date: 2026-08-23
  - url: https://u.today/satoshis-code-reopened-someone-just-deciphered-bitcoin-puzzle-into-genesis-block-data | title: U.Today, Satoshi's Code Reopened | date: 2026-08-23
  - url: https://www.blockmedia.co.kr/archives/1131026 | title: Blockmedia (Korean) | date: 2026-08-23

## Обновление (2026-10-17, Qoder)

- **Тип**: прогресс + отрицательный результат + баланс + новый оракул (Теория B).
- **Баланс (проверено 2026-10-17)**: 936 040 сат, трат 0 — 935 550 сат в 114 цепных tx + 490 сат в мемпуле (ответный tx автора `39a7dd0c…`, ждёт подтверждения). Проверка: `https://blockstream.info/api/address/bc1qfkhx02v89u2qyyyljeczw6hu9sr437y44t7ae5yf09thrdukfqesnjg2wj` (mempool.space из нашей среды по TLS не отвечает — использовать blockstream.info).
- **7-векторный ответ автора ПОЛУЧЕН** (tx `39a7dd0c74a15d11c2cc301167bcee243f458bdc54f2aa3e6a1426df44d868d6`, OP_RETURN, на 17.10 в мемпуле; вопрос `f1aeed6d…` замайнен в блоке 971753 16.10 18:34 MSK). Для cosigner 0852014c, «source and steps unchanged, substituting only cut + passphrase Test Example»:
  - cut 1-1 → `e4caa034`; 2-2 → `9fb54bad`; 3-3 → `e4caa034`; 1-4 → `e79c9765`; 1-2000 → `8b9b2fea`; 263-400 → `68ab4226`; 1-66 → `9290f941`; ранее 2-67 → `c85bcea3`.
- **Наши M1-значения** (гарантированный источник=570-hex, тексты "0","1","0100", L, L[262:400], L[0:66], L[1:67]): 2e915cad, 4d09a997, 2e915cad, 7540c669, 1e7b8869, 96b86c97, 2f6ea42b, d1642212 — НИ ОДНО совпадение ни с одним текстом/регистром/LF-вариантом (calib.mjs/calib2/calib3, ~5 тыс. вариантов, все контроль-гейтнутые).
- **Теория B (действующая)** — почему: (1) контрольный вектор автора (#970190: текст `000000000019d6689c08` + «Test Example» → host/b7f4182b) совпадает с нашим M1 ровно, т.е. его пайплайн = M1 и подставлять Test Example он умеет; (2) его равенство 1)==3) при 2)≠1) доказывает, что источник — тот же «0100…»-hex и текст(1-1)=«0»; (3) при M1 и тексте «0» расхождение возможно ТОЛЬКО по пассфразе ⇒ в 7-векторном прогоне он фактически прогнал СВОЮ реальную пассфразу.
- **Оракул пассфразы (независимый от модели среза)**: найти pp, такую что `F_M1(pp,"0") = e4caa034`; немедленно подтверждать остальными 7: "1"→9fb54bad, "0100"→e79c9765, L→8b9b2fea, L[262:400]→68ab4226, L[0:66]→9290f941, L[1:67]→c85bcea3. Найденная pp → прогнать все 162 735 подстрок × регистры против 0852014c/040e2791 (~минуты) → модель среза разрешится сама.
- **Проверено против оракула — ВСЁ 0** (≈5 100 pp, все с контроль-гейтом host/b7f4182b): формы core4 {Hal,Harold,Thomas,Finney}, Satoshi/Nakamoto, 24 пары names_extra, ~30 расширенных (martti malmi, jed mccaleb, peter todd…), 612-строчный relaxed-список, 109 трансформ «Test Example» (регистры/пробелы/дефисы), печатные символы под Test Example, и НОВОЕ (17.10, calib6): 116 пар людей «первой транзакции» (jeremy/jercos sturdivant, dustin trammell, laszlo hanyecz, martti malmi, marek palatinus, newliberty standard, hall/harry finney…) × 9 форм × 2 суффикса = 2 088 тестов.
- **Следующий шаг**: расширять именное пространство оракула (курированные пары известных фигур; при необходимости задокументированное расширение до ~10^5 пар) и/или новое прочтение «Who received the first transaction?»; следить за подтверждением tx `39a7dd0c` и новыми OP_RETURN (tx_count > 114).
- **Relaxed-волна** (68 пар × 9 = 612 форм, 78 347 016 кандидатов): **ЗАВЕРШЕНА И СЕРТИФИЦИРОВАНА 17.10.2026** — финальная строка `DONE wave=waveCustom: 78347016 candidates in 27878s (2810 cand/s), hits=0`; `hits_waveCustom_relaxed2.log` пуст; процесс завершён. Перебор имён получателя исчерпан; открыт только оракул-путь (декодер-вопрос) и новые OP_RETURN.
- **Файлы-артефакты (добавлены в `data/`)**: `dialogue-opreturn-2026-10-17.txt` (192 записи, включая ответ #0), `calib_7vectors_ours.md` (полный разбор Теории B), `calib4.mjs`, `calib5.mjs`, `calib6.mjs`, `names_oracle3.txt` (список пар оракульной батареи #3).
- **Источники**: https://mempool.space/tx/39a7dd0c74a15d11c2cc301167bcee243f458bdc54f2aa3e6a1426df44d868d6 ; https://mempool.space/address/bc1qfkhx02v89u2qyyyljeczw6hu9sr437y44t7ae5yf09thrdukfqesnjg2wj ; локальный разбор — `data/calib_7vectors_ours.md`.
- **Влияние на оценку**: оракул пассфразы — новая независимая поверхность атаки (~5,1k pp минус на текущих семействах); при нахождении pp весь пазл сводится к минутному пересчёту. Оценка шансов не меняется до новых данных (~2%), но пайплайн стал проверяемым без модели среза.

## Обновление (2026-10-17, ночь, Qoder) — имя-пространство оракула закрыто; Теория B несовместима с ограничениями автора

- **Тип**: отрицательный результат (полное закрытие семейства) + стратегический вывод + подготовленный решающий вопрос.
- **Суть**: ревизия калибровок показала, что оракульное пространство «2-словных имён получателя первой транзакции» закрыто ПОЛНОСТЬЮ и было покрыто уже существующими батареями: calib4 тестировал полный прямоугольник 12 имён × 12 (Hal, Harold, Thomas, Finney, Harry, Tommy, Thom, Finn, Tom, Fin, Satoshi, Nakamoto) × 9 регистровых комбинаций × 3 текстовых суффикса (включая «Satoshi Nakamoto» во всех смешанных регистрах), calib5 — 24 пары, calib6 — 57 пар (люди «первой транзакции» и ранние фигуры) × 2 порядка × 9 регистров × 2 суффикса, plus пустой pp, единичные символы, 109 трансформ «Test Example» под оракулом `F_pp("0")=e4caa034` — всего ≈5,1 тыс. pp, ноль совпадений.
- **Логический вывод (важно)**: при подтверждённых автором ограничениях на реальную pp (ровно 2 слова через 1 пробел; каждое слово — имя получателя; w1 строго короче w2 по буквам; ни одно слово не ровно 3 буквы; без опечаток) у Хэла Финни ЛЕГАЛЬНЫХ ПАР НЕТ (Hal=3 буквы исключён; Harold/Thomas/Finney все по 6 букв, строгого «короче» не существует), а у Сатоши Накамото легальна ровно одна пара («Satoshi Nakamoto», 7<8) — и она оракул-минус во всех регистрах. Следовательно **Теория B в исходном виде несовместима с ограничениями автора**: наиболее вероятная альтернатива — Теория C (в 7-векторном прогоне его инструмент фактически подставил стёртую/чужую pp: захардкоженная pp в скрипте или несохранённая сессия; контроль #970190 при этом честно отработал с «Test Example»).
- **Ревизия сообщества**: репо floflo777 — новых разборов после 2026-09-05 нет (analysis/leads.md, analysis/tested.md, свежие коммиты — только авто-обновление цен). Их Pass 3 (329 энтропий × 53 пассфразы через BIP48-пути) ортогонален нашему мастер-fingerprint оракулу; ни одна из 53 их пассфраз не образует 2-словную имя-пару.
- **Подготовлен решающий вопрос (в очередь, 10k+1k, ждёт пополнения и ОК)**: «Прогони свои шаги на cut -b 1-1 (текст "0") дважды: с BIP39 pp 'Test Example' и с pp 'qZw'. Ответь: fp1; fp2.» Наши M1-предсказания: 'Test Example' → `2e915cad`, 'qZw' → `e3373eb1`. Расшифровка: {2e915cad, e3373eb1} → подстановка pp работает → модель источника/ката неверна, форензика переносится на источник (Теория A′); {e4caa034, e4caa034} → инструмент игнорирует введённую pp → Теория B/C доказана (оракул = его реальная pp, но тогда противоречие с его же ограничениями придётся разрешать новыми вопросами о получателе); любая иная смесь → новые данные для модели.
- **Проверено**: да — контроль b7f4182b на всех прогонах; предсказания e3373eb1/2e915cad пересчитаны локально повторно (2026-10-17); квитанции калибровок calib4.mjs/calib5.mjs/calib6.mjs в data/.
- **Влияние на оценку**: до ответа на решающий вопрос приоритет оракула-охоты понижен с «топ-лида» до «паузы»: дальнейшее расширение имя-пространства без нового прочтения получателя имеет низкую EV. Приоритет возвращается к (а) прямому двойному перебору, (б) мониторингу канала (новые OP_RETURN сообщества несут бесплатные данные), (в) сертификации relaxed-волны.
- **Источники**: https://github.com/floflo777/open-crypto-puzzles/tree/main/3-small-prizes/genesis-block-wallet-puzzle-142ksats (analysis, tools, commits); локально: STATE.md (страта 17.10), calib4/5/6.mjs, hits-логи.

## Обновление (2026-10-17, 03:30, Qoder) — 3-векторный ответ автора; противоречие прогонов подтверждено дословно; батареи #4/#5

- **Тип**: новые данные с цепи (вопрос+ответ, дословно) + отрицательный результат батареи #4 + фоновая батарея #5.
- **Новый ответ автора** (tx `484fef192e43bd6c72407ad4382037f6ff3c6df985df165b3a78713bc50aa4d8`, 17.10 в мемпуле, 500 сат): «1) e4caa034; 2) 9fb54bad; 3) 3bc42789.»
- **Полный текст нашего вопроса** (tx `5b7ff44c779abced7889d70dce5299d3680140bc77f6d54e200c1c55b33ee472`, подтверждён в блоке 971770) — дословно: «Test vectors with predefined inputs, final result only, same as your last answer. For cosigner 0852014c, use your own procedure and settings unchanged, except that the cut output is the literal text given below instead of a cut of the block, **with BIP39 passphrase Test Example**. Reply with the master fingerprint for each: 1) 0; 2) 1; 3) 000000000019d6689c08».
- **Дословное внутреннее противоречие прогонов**: один и тот же литеральный текст `000000000019d6689c08` с одной и той же заявленной pp «Test Example» дал 10-06 → `b7f4182b` (= воспроизводится нашей M1), а 17.10 → `3bc42789`. ≠ ⇒ между прогонами сменилась ФАКТИЧЕСКАЯ pp (в прогонах 3-х и 7-и векторов фактически применилась НЕ «Test Example»). Значения «0»→`e4caa034` и «1»→`9fb54bad` совпадают в обоих новых прогонах ⇒ там действует одна и та же фиксированная ppZ.
- **Объединённый оракул на ppZ (8 значений)**: F("0")=e4caa034; F("1")=9fb54bad; F("000000000019d6689c08")=3bc42789; F("0100")=e79c9765; F(L)=8b9b2fea; F(L[262:400])=68ab4226; F(L[0:66])=9290f941; F(L[1:67])=c85bcea3. (L = 570-символьная lowercase raw-hex строка genesis.)
- **Батарея #4 (calib7.mjs, локально)**: универсум 9 866 пассфраз (все ранее сгенерированные файлы 1 188; трансформы «Test Example»; полная матрица имён {Hal,Harold,Thomas,Finney,Harry,Tommy,Thom,Finn,Tom,Fin,Hall,Harald,Henry,Finny,Fenney,Phinney,Satoshi,Nakamoto}² × 9 регистров × разделители пробел/двойной пробел/дефис; пары names_oracle3+names_extra в обоих порядках) × суффиксы {'', '
', ' '} = 29 598 прогонов M1 против первой константы оракула → **0 совпадений** (контроль host/b7f4182b выдержан в каждом прогоне).
- **Батарея #5 (calib8.mjs, запущена фоном)**: тот же универсум × расширенные варианты ТЕКСТА {"0","0
","0
","0 "," 0"} × суффиксы pp {'', '
', ' ', '
'} ≈ 197 тыс. прогонов (~20 мин); при совпадении — автоматическая перекрёстная проверка «1»/«000000000019d6689c08» с тем же хвостом текста и запись в hits_oracle8b.log.
- **Теории после батарей**: (B′) инструмент в новых прогонах подставил реальную pp автора — тогда ppZ вне 9 866-универсума, что означает либо получатель ≠ Хэл Финни, либо нестандартную форму (против его же шейп-ответов); (C) инструмент подставил произвольную/стершую pp — оффлайн-оракул тупиковый. Разрешение — **решающий декодер-вопрос** (двухпрогонный тест «Test Example» vs «qZw» на тексте "0"; предсказания M1: 2e915cad / e3373eb1) — в очереди, ждёт пополнения и ОК.
- **On-chain (проверено 17.10 03:30)**: 946 040 сат в 116 цепных tx (spent=0) + 500 сат в мемпуле (ответ автора 484fef19) = 946 540 сат суммарно. Блокчейн-источник: blockstream.info.
- **Артефакты (data/)**: `calib7.mjs`, `calib8.mjs`, `escrow_txs_now.json` (свежие 26 tx с полными OP_RETURN-текстами), `escrow_stats.json`.
- **Источники**: https://blockstream.info/tx/484fef192e43bd6c72407ad4382037f6ff3c6df985df165b3a78713bc50aa4d8 ; https://blockstream.info/tx/5b7ff44c779abced7889d70dce5299d3680140bc77f6d54e200c1c55b33ee472 ; локальные прогоны с контроль-гейтом b7f4182b.

- **Добавлено 04:05 (Qoder)**: мини-батарея опечаток ppZ — все Levenshtein-≤1 варианты «Test Example» (замена/вставка/удаление в каждом месте по всему ASCII-алфавиту + транспозиции + перестановки слов/реверс/удвоение) = 1 333 уникальных pp × суффиксы {'', '
', ' '} = 3 999 прогонов против F("0")=e4caa034 → **0**. Вывод: ppZ не является опечаткой/перестановкой «Test Example».

- **Добавлено 04:10 (Qoder)**: **батарея #5 (calib8.mjs) закрыта окончательно** — `SCAN DONE: 141300 evals in 915.3s; hits = 0` (контроль host/b7f4182b выдержан; hit-лог `hits_oracle8b.log` не создан — пусто). Итог обеих ночных батарей против первой константы оракула ppZ: calib7 29 598 + опечатки 3 999 + calib8 141 300 = **174 897 прогонов M1, ноль совпадений**. Оракул-охота по курированным именным семействам официально на паузе до решающего декодер-вопроса (двухпрогонный тест «Test Example» vs «qZw» на тексте "0"; предсказания M1: 2e915cad / e3373eb1) — ждёт пополнения кошелька и ОК Ильи.
- **Уточнение реквизитов (Qoder, 17.10)**: адрес `bc1qf6e4ap3vl7...` (полный виден в эскроу-транзакциях) — это **наш** адрес финансирования вопросов автору (транзакции `971753`, `971734`, `5b7ff44c`), НЕ ривальный плательщик. Ранее в черновиках он ошибочно назывался «rival payer» — метка снята.


## Обновление (2026-10-18, OCP Sync)
- Тип: **решение** (внешним решателем) + закрытие пазла в нашей базе
- Суть: пазл решён и снят. Механика: entropy = первые 128 бит `sha256(raw genesis hex, bytes 263–400)` →
  12-словный BIP39, пассфраз «Satoshi Nakamoto», два косигнера P2WSH 2-of-2 по пути
  `m/48'/0'/1231006505'/2'/0/0`. **Решающий инсайт — нестандартное число раундов PBKDF2-HMAC-SHA512:
  181 505 и 200 913 вместо стандартных 2 048** (числа кодируют время и дату генезис-блока: 18:15:05 UTC и
  2009-01-03). Все наши негативы (78 347 016 кандидатов, ~175 тыс. прогонов оракула) были получены при
  rounds = 2048 и это пространство не покрывали.
- Источник: https://github.com/floflo777/open-crypto-puzzles (папка `4-solved/caesarcoder-genesis-block-wallet-puzzle-947ksats`,
  снапшот-коммит `19644e58`; PR #44 решателя Schum-io, автор решения — CaesarCoder); копии артефактов —
  `data/ocp/` и `tools/ocp/` этой папки (provenance в `SOURCE.md`).
- Проверено: **да** — собственным on-chain-вистом 2026-10-18 (mempool.space address API): funded 120 выходов /
  947 620 сат, spent 120 / 947 620 → баланс 0; tx свипа `1c70c4745fad5bf891b9ee2a9f8b0b5cd3f328eb847eb09c9bebb92f5f7e900b`
  подтверждена в блоке 971803 (2026-10-17T03:40:20Z). Независимая проверка Big Pickle от 17.10 14:31 — баланс 0.
- Влияние на оценку: **0 сат, денежный смысл утрачен** — пазл выводится из активной очереди; практический вывод
  для остальных BIP39/Electrum-пазлов — «rounds-ось» (см. `LOG.md` и `WAKE_QUEUE.md`), не запускать перебор
  без инсайт-оси.
- Публикация ключей: материал ключей опубликован решателем **после** свипа в чужом репо
  (`data/ocp/puzzle.json` → `solutions[0].answer`, `key_material_disclosed: true`). В этом README и в `LOG.md`
  сид и фраза намеренно не дублируются — только указатель и проверяемый `tools/ocp/verify_solution.py`.
  Ключ чужой, средства выведены 17.10 — трогать нечего.
- Подробности и хроника: см. LOG.md (запись 2026-10-18, 10:05) и `_sources/ocp_sync_2026-10-18/delta_report.md`.

## Уточнение (2026-10-19, Qoder): bc1qw8… = кошелёк автора, не приз
- Тип: баланс / классификация (not-ours)
- Суть: `bc1qw8uecdjvuedtkg4s2kku4s2ak9r2cm59khclfr` (1 000 000 сат, funded 2026-08-21) пополнен tx `e2cbb236…`: вход с `bc1q0x054…`, сдача 62 970 на `bc1q7nn9…`, который в `data/ocp/data/on-chain-dialogue.json` — **change-адрес автора**. OP_RETURN нет. Эскроу приза `bc1qfkhx02…` пуст (947 620 = spent). Поэтому папка **остаётся в `solved/`** — «приз пополнили» не подтверждается.
- Источник: https://blockstream.info/tx/e2cbb23690c3c1f8a294c7e4747cf62f374cddf06bdec1beeff39e12d2a0c5d2 ; `data/ocp/data/on-chain-dialogue.json`
- Проверено: да (19.10.2026, read-only)
- Влияние на оценку: цель не открывается заново; 0,01 BTC — чужие средства автора.
- Подробности и хроника: см. LOG.md
