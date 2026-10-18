# ВАЖНО ДЛЯ АГЕНТОВ
# Любой, кто работает с этим каталогом, ОБЯЗАН читать и соблюдать master/AGENT_INSTRUCTIONS.md.
# Разделение ответственности (обязательно, с 17.10.2026):
#   1) puzzles/<slug>/LOG.md — журнал пазла: по датам; каждый агент при первом заходе представляется
#      (агент/модель/среда), пишет что делал, что нашёл (включая отрицательные результаты!),
#      какие скрипты и артефакты создал. Только дописывать снизу, чужое не переписывать.
#   2) Код пазла — в puzzles/<slug>/tools/, данные и артефакты (логи прогонов, дампы) — в puzzles/<slug>/data/.
#   3) puzzles/<slug>/README.md — только прорывы и важное: актуальный статус, зацепки, что решено. Хроника и рутина — в LOG.md.
#   4) Глобальные изменения (балансы, статусы, закрытие пазлов) — в этот каталог + отметка в WAKE_QUEUE.md.
# Дублирование больших текстов избегаем: детали — в папках пазлов.
# Навигация (с 17.10.2026): активные пазлы — puzzles/ (индекс puzzles/README.md);
#   решённые/закрытые/тупиковые — solved/ (индекс solved/INDEX.md), активная работа там не ведётся;
#   брони пазлов — python tools/claims.py (claims/_active/), отчёты проходов — reports/,
#   реестр агентов — agents/REGISTRY.md.
#   свежие данные сообщества (issues OCP) — _sources/OCP_ISSUES_TRIAGE_2026-10-17.md (снято 17.10.2026, Big Pickle).
# ═══════════════════════════════════════════════════════════════════
# ПОЛНЫЙ КАТАЛОГ КРИПТОЗАГАДОК И ИНТЕРНЕТ-МИСТЕРИЙ
# Собрано 14.10.2026 из всех источников
# ═══════════════════════════════════════════════════════════════════

# ЧАСТЬ 1: SEED-ФРАЗА / BIP39 ЗАГАДКИ (с призовыми фондами)

## КАТЕГОРИЯ А: ЖИВЫЕ И БЛИЗКИЕ К РЕШЕНИЮ (по handoff от Ильи)

### A1. Trithemius «Securing Wealth in Poetry» — 0,03124630 BTC
- **Адрес**: `1K4ezpLybootYF23TM4a8Y4NyP7auysnRo` (P2PKH)
- **Баланс 14.10**: 3 124 630 сат, 2 входящих tx, трат 0
- **Источники**:
  - Medium/Coinmonks 11.02.2019, автор OneSourGrape (@Trithemius)
  - OCP: `2-mid-prizes/wealth-in-poetry-0-03btc`
  - privatekeys.pw
- **Механизм**: 12 слов BIP39 по позициям токенов в тексте
  - (a) «Story & phone number»: цифры телефонов → позиции
  - (b) «Letter & GPS»: pos_i = 10·i + digit_i (i=0…11), digit_i = цифры GPS координат лендмарка
- **Подсказки**: фото «Flock of birds» (Middle Creek WMA), Zimbabwe/Venezuela гиперссылки
- **Остаток**: V16 ~234 из 467 единиц, V0 ~279 сдвигов. ~1 час на 16 ядрах.
- **Файлы**: s26_bip39.py, s27_bip39.py, gps_engine.py, carrier.py
- **Вердикт если 0**: правило (b) не работает, остаётся (a) с телефонами вне статьи

### A2. Genesis Block Wallet — 878 140 сат (растёт!)
- **Адрес**: `bc1qfkhx02v89u2qyyyljeczw6hu9sr437y44t7ae5yf09thrdukfqesnjg2wj` (2-of-2 P2WSH)
- **Баланс**: 168 779 сат на 12.09.2026 (по OCP, 24 выхода; растёт); ранее в каталоге было 878 140 сат — устарело
- **Баланс (17.10.2026, Qoder)**: 936 040 сат (935 550 в 114 цепных tx + 490 сат в мемпуле от ответного tx автора `39a7dd0c…`), трат 0 — проверено blockstream.info
- **Оракул пассфразы (Теория B, 17.10.2026, Qoder)**: `F_pp("0") = e4caa034` (F = M1-пайплайн; контроль host/b7f4182b) — независимая от модели среза поверхность атаки; ~5,1 тыс. паролей уже минус; детали — `puzzles/genesis-block-wallet-puzzle-142ksats/README.md`, `data/calib_7vectors_ours.md`
- **Анонс**: блок 963629 (22.08.2026)
- **X**: https://x.com/glxyresearch/status/2091729030160507360
- **Пресса**: https://crypto.news/bitcoin-puzzle-hides-wallet-key-in-genesis-block-data/
- **OCP**: `3-small-prizes/genesis-block-wallet-puzzle-142ksats`
- **Пайплайн**: 570-символьный hex raw-блока генезиса → SHA-256 → BIP39 12 слов → passphrase → мастер-ключ
- **Подсказки автора** (OP_RETURN):
  - «both keys use the same Genesis field, and there is no hash»
  - «root = master key from BIP39 seed; genesis_data = BIP48 account»
  - Passphrase = имя получателя первой tx, 2 слова через пробел, слово 1 короче слова 2
  - «Try all four forms: binary, hex, decimal, ASCII»
- **Остаток**: ~~relaxed 68 пар × 9 = 612 форм~~ **DONE 17.10.2026: 78 347 016 кандидатов, 0 хитов, сертифицировано** + satvar 255 вариантов Satoshi (не запускался). Переборная поверхность закрыта; открыт только оракул-путь (платный декодер-вопрос, нужен ОК Ильи) и мониторинг OP_RETURN.
- **Блокер**: Hal/Thomas/Finney исключены (не той длины по подтверждённой форме)

### A3. Smith, Lyle & Moore Hunt #2 «Glimmer» — 0,03177700 BTC
- **Адрес**: `bc1q0akdjvrc2csau2n3gyxa3xcq0fss852x997m9y` (BIP84 m/84'/0'/0'/0/0)
- **Баланс 14.10**: 3 177 700 сат, трат 0
- **xpub**: xpub6CpNc58zqQvNGPHDGGTr68wgrmtfFDBWRuSDAxoDdrCE1iRAaZtyAD5T9uCJ3ELUYKCkx8Jkind2kwoR3Uxmg1ycQ6DWyGxZBMFvQqhNqVC
- **Источники**: smithlylemoore.com (Wix), OCP, r/smithlylemoore (через Arctic Shift)
- **Hunt #1** решён в 2021: puzzles.agntn.dev/…/born-to-be-wild
- **Wix-оракул**: POST site-pages.wix.com/_api/wix-public-html-info-webapp/resolve_protected_page_urls
- **Открыты все ключевые страницы (вкл. h7j3h «Atlas Mountains» — даёт слова 10–11; gkfxt «closerandcloser»). Неоткрытыми остались ровно два замка: zhgsm `/raft-escape` и jcl9c `/smoke-signals` (родитель — jetkc «Tropical Island», pw «Mary Ann»). y6cd1 закрыт как тролль (EXIF «nope lol»).**
- **Найденные слова (11 из 12)**: when you depart find mystery discover music need love fortune safe (порядок 1–9 не подтверждён; 10=fortune, 11=safe с h7j3h). Отдельная цепочка: hunt gather whale blood ship hunt shallow parrot (см. GLIMMER_HANDOFF §2).
- **Остаток**: 12-е слово (за двумя замками) + passphrase (по паттерну Hunt #1 приходит в ответе на письмо с 12 словами — codebreaker@smithlylemoore.com, тема предзаполнена «I've Found Amphitrite, and All 12 Words»). ⚠ адрес .proton.me — фейк.
- **17.10.2026 (dsh-сессия + Qoder, ночь)**: оба замка — ~700 доп. последовательных запросов к Wix-оракулу, 0 хитов, 0 ошибок; гипотеза «пароли переиспользуются» закрыта надёжно (впервые без 429-искажений). jetkc разобран на глубину page JSON: печатной подсказки нет — оба замка «чистого вывода» (единственные такие на сайте). Детали: `puzzles/smith-lyle-moore-hunt-2-0-032btc/README.md` + `data/glimmer_dsh_reports_2026-10-17.md` + `data/GLIMMER_HANDOFF_2026-10-17.txt`.

### A4. Path to Greatness — 3,02608794 LTC
- **Адрес**: `LUtL7qnm3gzxKjHcfVLSjydqhhinTVmTmS`
- **Баланс 14.10**: 302 608 794 литоши, 8 tx, отправлено 0
- **OCP**: `2-mid-prizes/path-to-greatness-treasure-hunt-3ltc` (~5,7·10¹² негативов)
- **Сайт**: p2gtreasure.com
- **YouTube**: UCrwC8bYZ_Yyum9gj4OHVEiQ (3 видео, включая «Soloville»)
- **Механизм**: 8 ответов → 4 ключа AES-256-CBC:
  - Seg1: imagine 16 + beach 16, IV few_n_far_btween
  - Seg2: chess 12 + wonders 20, IV nocturnal_sugars
  - Seg3: wasd 8 + ship 24, IV colors_on_leaves
  - Seg4: scramble 15 + sky 17, IV seconds_of_dream
- **Ни один замок не вскрыт**
- **Подсказки**: clue 1 «Imagine» (Леннон + 19410712), clue 6 «Beach» (15 нот → 16 символов)
- **AES-оракул**: ~3,2·10⁶ ключей/с на ядро
- **Файлы**: seg.c, NOTES.md (104 КБ), INSIGHTS.md (84 КБ)

### A5. Arweave #3 / #10 (+#11)
- **#3**: `wHP6OPG5GMF5dedo_CD8AAy6x8La-gfI5b5pk65Tx_0` — 1000,1658 AR
- **#10**: `bkjJGw3NLxs8OAyRxgTL-QFpiB3lBJqZ76kDhWdB-Rs` — 500,0223 AR
- **#11 (ETH)**: `0xFF2142E98E09b5344994F9bEB9C56C95506B9F17` — 1,0 ETH
- **OCP**: `2-mid-prizes/arweave-puzzle-3-1000ar`, `…-10-500ar`, `…-11-1eth`
- **GitHub**: https://github.com/HomelessPhD/AR_Puzzles
- **Механизм**: SHA512^11513(ответ) → EvpKDF → Rijndael Nk=32/Nr=38 CBC
- **#3 подсказки**: anno md12 a384 cash e4d5 root pull base (8 картинок)
- **#10 подсказки**: кости 2,1,4/2,4; «6 3 18»; Палпатин; ключ «…nesis #28»
- **Скорость**: ~20 кандидатов/с на ядро (KDF дорогой)

## КАТЕГОРИЯ Б: ЖИВЫЕ, НО ТУПИКОВЫЕ (без новой информации)

### B1. BLM «Brave New World» — 0,20107284 BTC
- **Адрес**: `1KfZGvwZxsvSmemoCmEV75uqcNzYBHjkHZ` (P2PKH)
- **Баланс 14.10**: 20 107 284 сат, 5 входящих tx, трат 0
- **Автор**: u/stsh_n, Reddit 8.10.2020, «Bitcoin puzzle (2000$)»
- **Источники**:
  - https://github.com/jmr2704/bitcoin-0.2-image-puzzle
  - https://github.com/HomelessPhD/BLM_0.2BTC
  - https://github.com/floflo777/open-crypto-puzzles/tree/main/1-big-prizes/blm-brave-new-world-0-2btc
  - https://github.com/rarsn4/blm-0.2btc-analysis (191+ млрд дериваций)
  - https://github.com/Dileep-Kumar-5/blm-puzzle-analysis
  - https://bitcointalk.org/index.php?topic=5404767.0
  - https://grokipedia.com/page/BLM_02_BTC_puzzle
- **Изображение**: 1600×1200, SHA256 d0b04378f75d63997b8034ec2ef1bdd108178e4546de78237bd35abf4189a782
- **Руны решены** (кириллица): «Здесь зашифрованы биткоины на чёрный день номер X», «Я надеюсь что сюда будут присылать много биткоинов», «Сумма двух чисел»
- **TUESDAY** (Bill Cipher над Трампом) = 3.11.2020, день выборов
- **Clock positions** (пользователь verified):
  - Секундная (красная): MOON, между 12-1 → 13
  - Минутная: TOWER, между 1-2 → 3
  - Часовая: нет текста, между 10-11 → 21
  - Часы показывают 10:07, повёрнуты ~73°
- **Position table** (README + clock):
  1=subject, 2=camera/twin, 3=tower, 4=mask, 5=police, 6=?, 7=liberty, 8=?,
  9=eye, 10=black, 11=pyramid, 12=vote/debate, 13=moon, 14-15=?, 16=rifle,
  17=gold, 18=?, 19=glove, 20=apple/second, 21=?, 22-24=?
- **25 строк микротекста** = WELCOME TO THE BRAVE NEW WORLD (12+13)
- **Опечатки whitepaper**: wich, proot, introdue, participans, doudle, sing, abcense, arrrived (+of cource, mini.that)
- **Пул-15 для пустых слотов**: welcome brave world peace end one more real order proof first food time stock power
- **Формат конфликт**: breathe (Electrum only) vs this/food (BIP39 only)
- **Проверено**: 278+ млрд дериваций (rarsn4), 377 млрд (ArmaCorex), 7,2 млрд GPU (OCP)
- **Electrum v2**: 40/42 слова совместимы, но не протестирован должным образом
- **Остаток (Илья)**: H2 (21 слово) ~1,2·10⁷, H3 (24 слова) ~2·10¹⁰ GPU
- **Гипотезы**: H1-H11, включая 18-word, 24-word, BREATHE passphrase

### B2. Quizchain Real Big Block (Aoi Nakamoto) — 0,777 BTC
- **Адрес**: `14zMkTgaVXJcxdh4JdWi29MLRR44iUSG9W`
- **Старый адрес**: `1EFojcAo2vbhRGCGCa7q8Wwvzss28mhQYC` (пуст)
- **Источники**:
  - Wattpad: https://www.wattpad.com/720888559-second (история 184148284)
  - OCP: `1-big-prizes/aoi-nakamoto-quizchain-0-854btc`
  - r/Grycoin, r/bitcoinpuzzles (через Arctic Shift)
- **Механизм**: текст (UTF-8) → MD5 → 16 байт → BIP39 12 слов → m/44'/0'/0'/0/i
- **Подсказки**: «Final version of the second chapter», «13 10 13 10» (Enter дважды), «7-й приватный ключ… но первый тоже»
- **Автор потеряла решение** («tragic boating accident variation»)
- **Блок 76** (0.077 BTC) решён в августе 2026
- **Проверено**: ~1,1·10¹⁰ MD5 + ~3,2·10⁸ у OCP
- **Нерешённый узел**: флип-правило Grycoin-2

### B3. Oobit 139 (bitcoinpuzzles.io) — 0,01545 BTC
- **Адрес**: `1KKtnqLdK17ndRRwF8zaKZH6FSkSmTN6fk` (m/44'/0'/0'/0/0)
- **Источник**: https://bitcoinpuzzles.io/en/puzzles/139
- **Автор**: Mestre Caçatal, 02.06.2026
- **6 YouTube клипов** (ID: 7DEcPmhijrU, qrvocJCSc4Q, bshCjlr5bdI, NagGwROg-lM, uxLjx32vTL0, V0E8p9wreD4)
- **Слова**: mushroom, elephant, deer, tortoise, coyote, bone, slab, stone
- **Модель «2 слова на клип»** не подтверждена
- **Платная подсказка**: 1 (~4588 CB, ~$1,8) — Илья отказался

### B4. Нуаза / bitcoin.fr «Chasse au trésor» — 0,2024 BTC
- **Адрес**: `bc1q8zfy6wvvtskzkg4s343x42pyf363nmejspgc02` (m/84'/0'/0'/0/0)
- **Источники**:
  - https://bitcoin.fr/chasse-au-tresor/ (14 подсказок, X @e_ducat, 15.08-25.12.2024)
  - Книга: Pierre Noizat «L'énergie, face cachée de la monnaie»
  - Форум: jeuxvideo.com тема 76202287
- **Механизм**: 24 английских слова BIP39. Слова 1-21 = французские слова из книги → английские по номеру. 22-24 = open always win
- **Подсказка 9**: 64-битный верификатор (8 допустимых последних слов)
- **Блокер**: книга €8,99-10, нужны картинки (yin-yang p.42, timbre p.101, bilan BCE p.99)
- **Проверено**: famA-D, ~10¹⁶ у решателей форума

### B5. kTimesG Phy Challenge — 0,008 BTC
- **Адрес**: `bc1qrpn28qa82uyjg37dvsz3w7wpm3kpdea957nm9p` (P2WPKH)
- **Источники**:
  - https://bitcointalk.org/index.php?topic=5584952.0 (102 поста)
  - https://puzzles.agntn.dev/collections/phy
- **Механизм**: подпись Bitcoin Signed Message, s = 0x5b890b292ba1abd9b1 (71 бит)
- **d = (s·k − z)·r⁻¹ mod n** — нужно найти k из картинки
- **Картинка**: эмодзи-спираль 2048² (256 эмодзи, «phyllotaxis»)
- **Подсказки автора**: «modular values», «fractional», «no loose ends, no hashing»
- **Проверено**: BSGS до 2⁴⁵, решётки LLL, ~10⁷ значений

### B6. Solana Puzzles #4 — 0,834 SOL
- **Кошелёк**: `DmDBmb7AEm6xRxkoBYq1mJYqsZP263gmXB53zA2dqjne`
- **Источники**:
  - https://solanapuzzles.com/puzzle4 (1536×1024)
  - TG: https://t.me/+5GYvaO1qGT44Mjdh
- **Механизм**: 12 слов, Phantom m/44'/501'/0'/0', без passphrase
- **12 подсказок**: ROT13, зеркальное, «The key is under the moonlight», 2^128+51 (SSS), 13°37'N 00°42'E, Σx=13058
- **QR → YouTube** QhXQo-h0lwc (numbers station, ASCII «evident agenda»)

### B7. RushWallet #30 — 0,01 BTC
- **Адрес**: `13Q8hJqagtd77ojTJcEZPjTz2sBFSsYxyj` (P2PKH, несжатый)
- **Баланс 14.10**: 1 000 000 сат (от 24.04.2015)
- **Источники**:
  - https://bitcointalk.org/index.php?topic=793720 (583 поста)
  - https://github.com/visalord/rushwallet-puzzle-30 (видео 720p)
  - OCP: `2-mid-prizes/rushwallet-contest-30-1msats`
- **Механизм**: priv = SHA256(utf8 фразы как есть), несжатый ключ
- **Морзе**: «DMITRI KNOWS THIS GAME IS NOT EASY… READ SATOSHI'S PAPER»
- **Блокер**: нужно видео выше 720p (лист в руке Дмитрия ~1:00)

### B8. «Riddle for 8.5 BTC» (commanderu) — 99 081 сат
- **Адрес**: `1KDUcZh5Z6H1of4Pwoy5ojJtkQxcQBHhnH`
- **Внимание**: 8,5 BTC никогда не было на адресе (заявление ложно)
- **Источник**: commanderu.github.io, https://bitcointalk.org/index.php?topic=5573629
- **Механизм**: WIF uncompressed из 6 частей (3×9 + 3×8 = 51 символ)
- **Найдено**: часть 1 (5JRd42nU1) и часть 4 (AhiF1tpuG)
- **Не найдено**: части 2, 5, 6 (перебор запрещён)

### B9. Bitcoin Coders Puzzle 07 — 21 000 сат
- **Адрес**: `bc1qj7xsxrlgmnnrqwvlakacc5yrh33h2n3xaa0m09` (m/84'/0'/0'/0/0)
- **Механизм**: плитки 32×32 (34×46) = перемешанная комикс-страница 4×3 = 12 панелей
- **Узнано 5 панелей**: crane/cargo, lady/woman, tree, dragon/tattoo, diamond/crystal
- **Статус**: пауза, jigsaw-сборка (438 кластеров)

### B10. LuckyLurker Vault #2 — 1,0 BTC
- **Адрес**: `bc1qnepv9pcnqvndux9h9mcaxvk6u993rc0lew9fpp`
- **Финансирован**: 12.08.2026, tx 2314d7f0
- **Источники**:
  - https://luckylurker.com/bitcoin-vault-2/
  - https://bitcointalk.org/index.php?topic=5577554
  - X: @LuckyLurkerPaul
- **Автор**: Paul Jones
- **Статус**: «Postponed until further notice» — спонсорские проблемы, подсказок 0
- **Vault #1** (0.0008 BTC) решён
- **Модель**: Electrum SegWit seed без passphrase, m/0'/0/1

## КАТЕГОРИЯ В: ТУПИКОВЫЕ / НЕРЕШАЕМЫЕ

### B11. Bitaps Shamir SSS — 1,00016775 BTC
- **Адрес**: `bc1qyjwa0tf0en4x09magpuwmt2smpsrlaxwn85lh6` (BIP84)
- **Источник**: https://bitaps.com/mnemonic/challenge
- **Механизм**: 3-of-5 Shamir над GF(256). Опубликованы 2 доли:
  - S1: session cigar grape merry useful churn fatal thought very any arm unaware
  - S2: clock fresh security field caution effort gorilla speed plastic common tomato echo
- **Вердикт**: нерешаемо без третьей доли (≥2¹¹⁹)

### B12. Guntis Vitolins «10 ETH Challenge» — 8,6125 ETH
- **Адрес**: `0x9C2F44EFAd0c1E852a09dF9939e6DaF061140CaF` (MetaMask m/44'/60'/0'/0/0)
- **Баланс 14.10**: 8,6125 ETH (nonce 7, автор тратит)
- **Источники**:
  - https://github.com/floflo777/open-crypto-puzzles/tree/main/1-big-prizes/guntis-vitolins-metamask-8-6eth
  - https://www.youtube.com/watch?v=w4mpiuBP_aY
  - https://puzzles.agntn.dev/collections/mineshop
  - mineshop.eu (пост 12.02.2020)
- **Механизм**: 12-словная BIP39, 6 слов в YouTube, 6 в блоге
- **Подтверждены позиции**: 1=dutch, 5=fog, 12=parrot
- **Часть пула в HTML-метаданных**

### B13. Ballet / Bobby Lee «Take Bobby's Bitcoin» — 2,00007358 BTC
- **Адреса**: `1JxWyNrkgYvgsHu8hVQZqTXEB9RftRGP5m` + `1QGtbKxx6FKDD66LwnrzHCAHmyZ7mDHqC4`
- **Источник**: Twitter Bobby Lee 24.07.2020
- **Механизм**: BIP38-карты, 16 из 18 символов видны на фото, 2 скрыты
- **3 карты**: одна решена (автором), две остаются

### B14. GSMG.io Puzzle — 1,25649674 BTC
- **Адрес**: `1GSMG1JC9wtdSwfwApgj2xcmJPAwx7prBe`
- **Источники**:
  - https://gsmg.io/puzzle
  - https://github.com/floflo777/open-crypto-puzzles/tree/main/1-big-prizes/gsmg-io-5btc-puzzle
  - https://github.com/HosterjackAGV/gsmg-5btc-puzzle
  - gsmg-archive.org
- **Механизм**: многоэтапный (двоичная матрица → URL → AES → финальный ключ)
- **5 из 6 фаз решены**, финальная не решена
- **Приз**: 5 BTC → 1.256 BTC после халвингов
- **Статус 17.10.2026 (Qoder, часть 2)**: цепочки chain1–4 комьюнити **воспроизведены байт-в-байт** (KDF=EVP_BytesToKey **MD5**! пароли сырые, не sha256-дайджесты): оба 80-байтовых Salted__-блоба открыты; chain3 sha256=4f7a1e4e…, chain4 sha256=e4269ed5… — совпали. Структура SalPhaseIon расшифрована. Минус-свипы 5655+702+20+~48 = 0. Открыто: выход chain4 (1151 B шума), 661 цифра seg0. Детали: `puzzles/gsmg-io-5btc-puzzle/README.md`.

### B15. Fe «Bountiful» — 1,0 ETH
- **Адрес**: registry `0x71fB6afcD98c5BD611712ad4b8D314EF729aa69D`
- **Источник**: https://github.com/fe-lang/bountiful
- **Механизм**: claim() из нерешаемой «пятнашки» через баг компилятора Fe
- **Нужен газ** (lock + claim)
- **Статус 17.10.2026 (Qoder)**: аудит ЗАВЕРШЁН — исходники чистые; все 8 deployed-контрактов **байт-в-байт** совпали со сборкой fe 26.1.0 (Sourcify-пробел закрыт); 26+ поведенческих тестов на deployed-байткоде — 0 дефектов; полный dry-run lock→move→claim воспроизведён бесплатно через eth_simulateV1. Детали и артефакты: `puzzles/fe-lang-bountiful-compiler-bounty-1eth/` (README + data/).

## КАТЕГОРИЯ Г: МЕЛКИЕ / НИШЕВЫЕ

### B16. Corey Phillips kitten — 0,010019 BTC
- **Адрес**: `bc1qcyrndzgy036f6ax370g8zyvlw86ulawgt0246r`
- **Механизм**: BIP39-passphrase. Автор: «not meant to be solved»

### B17. School of Bitcoin — 0,01 BTC
- **Адрес**: `bc1qcsdfkaqgy9ux668vmzflzqsyg0qtspncymt5ed`
- **Механизм**: Морзе / Wingdings / QR → seed

### B18. seed-phrase.com (MetaNeer Labs) — 0,01 BTC
- **Адрес**: `bc1q7x3p3rkmkxgf20n3apkccqcmn5mdtsf8zx5227` (BIP84)
- **Источники**: https://seed-phrase.com, https://github.com/metaneer/seed-phrase
- **Суть**: датированные подсказки 2024 (стихи, эмодзи, загадки)

### B19. AH White «Walking Banks» — 0,008 BTC
- **Адреса**: `bc1qxy4tf0s4n7x9w24rawf9qsxh2hyljrmvyrhwzt` + `bc1q4qc24xk5cehc4t7vr264zldsms2kmxf86jqjau`
- **Механизм**: 24 слова в романе, 4 известны

### B20. Keir Finlow-Bates — 3 × 0,002 BTC
- **Адреса**: `17Y9czcbcCz433QXsy1SGQjwLb27BBtLLZ`, `1DZ5NbUwDgxeJkKhQLgYcUUX36PtYso1pm`, `19kkawFcg2U2s6vq368MXD7FJU9JZvRrjA`
- **Механизм**: brainwallet-ответы из книги

### B21. Zden «HALV» — 0,003125 BTC
- **Адрес**: `1crypto24HCr178iMcKd5iUi5D4rsg1nK`
- **Источник**: crypto.haluska.sk
- **Механизм**: raw key из геометрической картинки

### B22. The Great Riddle — 0,00423871 BTC
- **Адрес**: `bc1qm3ayuhn7wppuqxaywu8ea0lggs8myy7543fekk`
- **Источник**: The Great Print (художник), февраль 2024
- **Механизм**: 24 слова BIP39 + passphrase (25-е слово). 4 из 24 выложены.
- **Слова в физических иллюстрациях** «Genesis Collection»

### B23. Anime Seed Phrase Puzzle — 0,2 BTC
- **Механизм**: картинка с множеством подсказок

### B24. Actuarial Science NFT Hunt — до 10 ETH
- **Механизм**: собрать 12 из 100 NFT

### B25. Exitonly Challenge 14 — 0,0003 BTC
- **Адрес**: `bc1q5rjy2cdfy4n4dkk4r6pxtwqlm8tgjcc2dj0ee9`

### B26. bitaddress BIP38 giveaway — 0,005297 BTC
- **Адрес**: `1J7BVeP8JK4op2X3GN3Hy7xkTnGnQTMpou`
- **Источник**: stacker.news/items/275973
- **Механизм**: забытый BIP38-пароль владельца

### B27. Crypto Puzzles 2018 #2 — 0,05 ETH
- **Адрес**: `0x1fa8Be9De5bBFE047C72dB8E8E3257128F7661ad`
- **Механизм**: raw key из серии картинок и видео

### B28. Teikhos C1/C2/C3 — ~2,0 ETH
- **Адреса**: `0x17e5e0910b…`, `0xd7c6d542f3…`, `0x973c2178b0…`
- **Механизм**: неопубликованный 256-битный ключ автора

### B29. 310 BTC Challenge (финальный этап) — 0,31 BTC
- 3 из 4 этапов решены. Ч/Б PNG со стеганографией, шифрами, культурными отсылками

### B30. Seed Phrase Crossword (NFT Magic Eden)
- **Механизм**: кроссворд внутри NFT → Pillar Wallet seed

### B31. Kitten Passphrase Puzzle — 0,0010019 BTC
- **Механизм**: почти известная seed-фраза, нужно найти 1 слово

### B32. Move Over Brokers Treasure Hunt — 0,0006 BTC
- **Механизм**: brainwallets, текстовые шифры

### B33. Bitcoin Treasure-Hunt Book Series
- **Механизм**: литературные загадки в книгах, 25% роялти

### B34. Veil Hunts — $1,380-$2,020
- **Источник**: findveil.com
- **Механизм**: физический геокэшинг, QR-код в сундуке

### B35. Paradigm Kryptos CTF (PK1-PK10)
- **Приз**: $1,000 за каждую из 10 задач — **ЗАКРЫТО: все 10 решены `forwardsecrecy` 02.10.2026, приём до 31.07.2026 (проверено 17.10.2026)**
- **Источник**: Paradigm.xyz

### B36. Groestlcoin puzzle — 1000,0001 GRS
- **Адрес**: `FindKEYLrVaahtkaVRk8KTspRMyWxfUi3i`
- **Источник**: groestlcoin.org/puzzle, bitcointalk 5137602

### B37. QDay «Steal this vault» (Solana)
- **Программа**: `22AEUZtxpbi1ReJGrG9SyFob3uHGzZERERyVNp6uV8Y6`
- **Источник**: https://beforeqday.com/challenge

### B38. Peter Todd коллизии — 0,59 BTC
- **Адреса**: `35Snmmy3…`, `3KyiQEGq…`, `39VXyuoc…`, `3DUQQvz4…`
- **Механизм**: коллизия SHA-256 / RIPEMD-160 / HASH160 / HASH256

### B39. Timeless $1000 Random Seed Puzzle — 0,062 ETH
- **Источник**: r/CryptoCurrency, 8 марта 2023, пользователь timelesssmidgen
- **Суть**: 24 слова BIP39 в случайном порядке. 24! ≈ 10²³. Практически нерешаемо.
- **12-словная версия** ($5 ALGO) решена за 30 часов

### B40. Trezor Bug Bounty — до $100,000
- **Источник**: Trezor Security page
- **Механизм**: уязвимость → доступ к seed-фразе

### B41. Genesis Block Brainwallet Puzzle
- См. A2 выше (тот же)

### B42. Bitimage (Kitten Photo Puzzle) — ~0,00095 BTC
- **Механизм**: seed в фото котёнка из твита Andreas Antonopoulos

### B43. «1 BTC Brainwallet» (DEFCON 2014) — 1 BTC
- **Механизм**: 20 подсказок из книги → brainwallet

# ЧАСТЬ 2: 1000 BTC CHALLENGE (Bitcoin Puzzle Transaction)

- **Запущен**: январь 2015 (блок #339085)
- **Создатель**: аноним ('saatoshi_rising', не подтверждено)
- **Решено**: 82 из 160 пазлов
- **Нерешено**: 78 пазлов, ~916-989 BTC (~$58-60M)
- **Ближайший нерешённый**: #71 (7.1019 BTC), диапазон 2^70-2^71
- **Прогресс #71**: 0.864% просканировано, ~422 года при текущем темпе
- **Типы**:
  - Address-only (#71-#134): полный брутфорс, RTX 4090 ~1.5 млрд/с
  - Known Public Key (#136-#160): Pollard's Kangaroo, O(2^(N/2))
- **Операционный риск**: frontrunning/sniping боты (победители #66 и #69 потеряли призы)
- **Защита**: private mining, MARA Slipstream
- **Ссылки**:
  - https://btcpuzzle.info/
  - https://github.com/roadhero/Bitcoin-Puzzle-Info
  - https://privatekeys.pw/puzzles/bitcoin-puzzle-tx
  - https://needlespace.com/en/puzzle
  - https://news.bitcoin.com/key-hunters-eye-58-87m-bitcoin-puzzle-as-916-btc-sits-unsolved-in-78-addresses/
  - https://github.com/alexanderthurn/1000-BTC-Challenge

## Полная таблица нерешённых (#71-#160):

| Пазл | Награда (BTC) | Бит | Тип | Публичный ключ |
|------|--------------|-----|-----|----------------|
| #71 | 7.1019 | 71 | Address-only | Нет |
| #72 | 7.2001 | 72 | Address-only | Нет |
| #73 | 7.3001 | 73 | Address-only | Нет |
| #74 | 7.4000 | 74 | Address-only | Нет |
| #76 | 7.6000 | 76 | Address-only | Нет |
| #77 | 7.7000 | 77 | Address-only | Нет |
| #78 | 7.8000 | 78 | Address-only | Нет |
| #79 | 7.9000 | 79 | Address-only | Нет |
| #81 | 8.1000 | 81 | Address-only | Нет |
| #82 | 8.2000 | 82 | Address-only | Нет |
| #83 | 8.3000 | 83 | Address-only | Нет |
| #84 | 8.4000 | 84 | Address-only | Нет |
| #86 | 8.6000 | 86 | Address-only | Нет |
| #87 | 8.7000 | 87 | Address-only | Нет |
| #88 | 8.8000 | 88 | Address-only | Нет |
| #89 | 8.9000 | 89 | Address-only | Нет |
| #91 | 9.1000 | 91 | Address-only | Нет |
| #92 | 9.2000 | 92 | Address-only | Нет |
| #93 | 9.3000 | 93 | Address-only | Нет |
| #94 | 9.4000 | 94 | Address-only | Нет |
| #96 | 9.6000 | 96 | Address-only | Нет |
| #97 | 9.7000 | 97 | Address-only | Нет |
| #98 | 9.8000 | 98 | Address-only | Нет |
| #99 | 9.9126 | 99 | Address-only | Нет |
| #101 | 10.1000 | 101 | Address-only | Нет |
| #102 | 10.2000 | 102 | Address-only | Нет |
| #103 | 10.3000 | 103 | Address-only | Нет |
| #104 | 10.4000 | 104 | Address-only | Нет |
| #106 | 10.6000 | 106 | Address-only | Нет |
| #107 | 10.7000 | 107 | Address-only | Нет |
| #108 | 10.8000 | 108 | Address-only | Нет |
| #109 | 10.9001 | 109 | Address-only | Нет |
| #111 | 11.1001 | 110 | Address-only | Нет |
| #112 | 11.2000 | 111 | Address-only | Нет |
| #113 | 11.3000 | 112 | Address-only | Нет |
| #114 | 11.4000 | 113 | Address-only | Нет |
| #116 | 11.6000 | 115 | Address-only | Нет |
| #117 | 11.7000 | 116 | Address-only | Нет |
| #118 | 11.8000 | 117 | Address-only | Нет |
| #119 | 11.9000 | 118 | Address-only | Нет |
| #121 | 12.1000 | 120 | Address-only | Нет |
| #122 | 12.2000 | 121 | Address-only | Нет |
| #123 | 12.3000 | 122 | Address-only | Нет |
| #124 | 12.4000 | 123 | Address-only | Нет |
| #126 | 12.6000 | 125 | Address-only | Нет |
| #127 | 12.7000 | 126 | Address-only | Нет |
| #128 | 12.8000 | 127 | Address-only | Нет |
| #129 | 12.9000 | 128 | Address-only | Нет |
| #131 | 13.1000 | 130 | Address-only | Нет |
| #132 | 13.2000 | 131 | Address-only | Нет |
| #133 | 13.3000 | 132 | Address-only | Нет |
| #134 | 13.4000 | 133 | Address-only | Нет |
| #136 | 13.6000 | 135 | Known PK | ЕСТЬ |
| #137 | 13.7000 | 136 | Known PK | ЕСТЬ |
| #138 | 13.8000 | 137 | Known PK | ЕСТЬ |
| #139 | 13.9000 | 138 | Known PK | ЕСТЬ |
| #141 | 14.1001 | 140 | Known PK | ЕСТЬ |
| #142 | 14.2000 | 141 | Known PK | ЕСТЬ |
| #143 | 14.3000 | 142 | Known PK | ЕСТЬ |
| #144 | 14.4000 | 143 | Known PK | ЕСТЬ |
| #145 | 14.5000 | 144 | Known PK | ЕСТЬ |
| #146 | 14.6000 | 145 | Known PK | ЕСТЬ |
| #147 | 14.7000 | 146 | Known PK | ЕСТЬ |
| #148 | 14.8000 | 147 | Known PK | ЕСТЬ |
| #149 | 14.9000 | 148 | Known PK | ЕСТЬ |
| #150 | 15.0000 | 149 | Known PK | ЕСТЬ |
| #151 | 15.1000 | 150 | Known PK | ЕСТЬ |
| #152 | 15.2000 | 151 | Known PK | ЕСТЬ |
| #153 | 15.3000 | 152 | Known PK | ЕСТЬ |
| #154 | 15.4000 | 153 | Known PK | ЕСТЬ |
| #155 | 15.5000 | 154 | Known PK | ЕСТЬ |
| #156 | 15.6000 | 155 | Known PK | ЕСТЬ |
| #157 | 15.7000 | 156 | Known PK | ЕСТЬ |
| #158 | 15.8000 | 157 | Known PK | ЕСТЬ |
| #159 | 15.9000 | 158 | Known PK | ЕСТЬ |
| #160 | 16.0011 | 159 | Known PK | ЕСТЬ |

# ЧАСТЬ 3: ИНТЕРНЕТ-ЗАГАДКИ И ARG (без призовых фондов)

## 1. Cicada 3301 (2012-2014)
- **Тип**: ARG, криптография, физические квесты (QR-коды в Москве, Париже, Сеуле, Окинаве)
- **Нерешённое**: Liber Primus — руническая книга, большая часть не расшифрована
- **PGP-ключ**: 7A35090F
- **Статус**: Частично не решена. Новых задач с 2016, но подделки продолжаются
- **Ссылки**:
  - https://cicada-solvers.github.io (Is It Cicada — проверка подписей)
  - https://en.wikipedia.org/wiki/Cicada_3301
  - https://unfiction.com
  - https://habr.com (разборы)

## 2. Cicada 3372 (2017)
- Сообщение с валидной PGP-подписью, но без новых головоломок
- Предупреждение о подделках

## 3. A858DE45F56D9BC9 (Reddit, 2011+)
- **Ссылка**: https://www.reddit.com/r/A858DE45F56D9BC9
- Тысячи зашифрованных постов (hex-дампы, бинарные данные)
- Некоторые расшифрованы (ASCII-арт Stonehenge), большинство — нет
- Автоматизированная публикация, личность неизвестна
- Считается завершённым, но большая часть данных не расшифрована

## 4. Markovian Parallax Denigrate (1996)
- **Ссылка**: https://en.wikipedia.org/wiki/Markovian_Parallax_Denigrate
- Самая старая интернет-загадка
- Usenet, бессмысленные сообщения с цепями Маркова
- Спам? Эксперимент? Троллинг?

## 5. Сатоси Накамото (2008)
- Личность неизвестна, кошельки с ~1M BTC не тронуты
- Паттерн Патоши в блокчейне
- Кандидаты: Ник Сабо, Хэл Финни, Адам Бэк, Дориан Накамото, Крейг Райт
- Доказательство = подпись ранним ключом или движение монет

## 6. Neuro-sama ARG (2023-2024)
- **Ссылки**: https://neuroarg.miraheze.org, https://neuro-arg.github.io
- AI-персонаж, видео с AES-шифрованием
- Числовые загадки в кадрах
- Ключи шифрования не найдены

## 7. Minecraft ARG (2019+)
- Скрытые seed-ы миров, аномалии
- Легенды о пропавших игроках
- Часть загадок possibly impossible by design

## 8. John Titor (2000-2001)
- **Ссылка**: https://paranormalis.com (оригинальные чаты)
- Форумный "путешественник во времени из 2036"
- Технические детали, предсказания
- Личность не установлена

## 9. GhostNet (2009)
- **Ссылка**: https://en.wikipedia.org/wiki/GhostNet, https://deibert.citizenlab.ca
- Кибершпионаж: 1295 ПК в 103 странах
- Посольства, министерства, офис Далай-ламы
- Подозрение на Китай, прямых доказательств нет

## 10. Valor por Tamaulipas (2012)
- **Ссылка**: https://en.wikipedia.org/wiki/Valor_por_Tamaulipas
- Анонимная Facebook-страница о наркоторговле в Мексике
- Администратор под угрозами, ушёл в 2014
- Личность не раскрыта

## 11. Webdriver Torso (2013+)
- **Ссылка**: https://en.wikipedia.org/wiki/Webdriver_Torso
- YouTube-канал с тысячами видео (красные/синие прямоугольники)
- Google признал: тестирование качества видео
- Но аномальные видео (Rick Astley, Эйфелева башня, "Matei") не объяснены

# ЧАСТЬ 4: КАТАЛОГИ, ИНСТРУМЕНТЫ, СООБЩЕСТВА

## Каталоги
- https://github.com/floflo777/open-crypto-puzzles (28+ funded unsolved, ~10 BTC + 12 ETH + 1900 AR)
- https://puzzles.agntn.dev/ (TypeScript библиотека + CLI, @agntn/puzzles)
- https://github.com/floflo777/crypto-puzzle-hunt (32 загадки)
- https://github.com/timchurchard/bitcoin-puzzles
- https://btcpuzzle.info (трекер 1000 BTC)
- https://privatekeys.pw/puzzles
- https://btcpuzzlesearch.com (77 открытых призов, 903 BTC)
- https://needlespace.com/en/puzzle
- https://lotterypzl.org/
- https://github.com/itsnex1s/crypto-puzzle-list

## Инструменты
- **btcrecover**: https://github.com/gurnec/btcrecover — BIP39 + Electrum, GPU, частичные seed
- **btc-seed-recovery**: Python, 1-2 недостающих слова
- **bip_utils**: Python библиотека (BIP39, BIP44, Electrum, etc.)
- **mnemonic**: Python библиотека (BIP39 wordlists)
- **StegExpose, StegDetect, StegAlyzerAS**: стего-детекция
- **GIMP, Audacity**: ручной анализ
- **Autopsy, FTK Imager**: форензика
- **BitCrack, JeanLucPons Kangaroo, RCKangaroo, Keyhunt-CUDA**: GPU ECDLP

## Сообщества
- Reddit: r/UnresolvedMysteries, r/Cicada, r/ARG, r/cryptography, r/bitcoinpuzzles, r/CryptoPuzzlers, r/Bitcoin
- 4chan: /x/, /b/
- Unfiction: https://unfiction.com
- Bitcointalk: раздел «игры и головоломки»
- Discord/Telegram: приватные серверы
- Arctic Shift: https://arctic-shift.photon-reddit.com (Reddit API через curl)

## Скорости оракулов (по журналам Ильи)
| Задача | Скорость |
|--------|----------|
| BIP39 → BIP44 | ~1ms/фраза на ядро, ~770 деривизаций/с с 5 путями |
| BIP39 + BIP84 | ~800-1250/с на ядро |
| Genesis PBKDF2 | ~1230/с на ядро |
| AES (PTG) | ~3.2M ключей/с на ядро |
| Arweave KDF | ~20 кандидатов/с на ядро |
| RushWallet SHA256 | ~10 тыс./с |
| Wix-оракул | 0.4-0.75/с |
| GPU BIP39 (OCP) | 12.7M последовательностей/с |
| GPU BIP39 (Илья 3070) | ~192 тыс. адресов/с |

## Проверка балансов
- BTC: mempool.space/api/address, blockstream.info/api/address
- LTC: blockcypher
- SOL: api.mainnet-beta.solana.com
- ETH: ethereum-rpc.publicnode.com
- AR: arweave.net/wallet/<addr>/balance
- GRS: chainz.cryptoid.info

# ЧАСТЬ 5: БЕЗОПАСНОСТЬ И ЭТИКА

## Красные флаги (скам)
- Требование ввести свою seed-фразу/приватный ключ
- «Сканеры семенных фраз»
- Искусственная срочность
- Обещания гарантированной прибыли
- Анонимная команда без верификации

## Проверка легитимности
- Всегда проверять баланс адреса на блокчейн-эксплорере
- Если адрес не существует/нулевой баланс → скам
- Информация от нескольких независимых источников

## Юридические аспекты
- Публичные bounty с заявленным вознаграждением = легально
- Перебор чужих ключей без согласия = незаконно
- Использование эксплойтов = неэтично

# ЧАСТЬ 6: ЗАБРАНЫ / ЗАКРЫТЫ (не тратить время)

> С 2026-10-17 папки решённых/закрытых/тупиковых пазлов физически перенесены в `solved/` (индекс: `solved/INDEX.md`); пути ниже обновлены.

FTPK S4 (решён), 1000-BTC #135,
Satoshi-Maze, Proof of Writing, Movie Enigma, Hunting Time, Keysa,
LuckyLurker #1, Dug Student Hunt, 310 BTC Challenge (частично),
Paradigm Kryptos CTF, cryptopuzzles.eth (Easycore/Numbers), Plato's Solid,
WIF500 (500 BTC, закрытый GPU-перебор 2⁵⁸)

## ⚠ ИСПРАВЛЕНИЯ ЭТОГО СПИСКА (проверка 16.10.2026, deepseek-flash)

Три пункта в списке «закрытых» **опровергнуты** проверкой первоисточников. Ничего не удалено —
ниже пометки, детали в папках `puzzles/`.

- **WIF500 — НЕ закрыт.** Адрес `1PfNh5fRcE9JKDmicD2Rh3pexGwce1LqyU` держит **500,00035446 BTC, 0 потрачено**
  (проверено через Blockstream API: `funded_txo_sum = 50000035446`, `spent_txo_sum = 0`, 26 пополнений).
  В README фигурируют **12 неизвестных символов base58 ≈ 2⁷⁰**, а не 2⁵⁸. Слово «closed» означало «проект закрыт», а не «решён».
  Дополнительно — **красный флаг**: GPU-инструмент выдаёт «зашифрованный ключ», расшифровать который могут только организаторы,
  поэтому нашедший не может забрать монеты сам. Досье: `puzzles/wif500-500btc/README.md`.
- **cryptopuzzles.eth (Easycore / Numbers) — НЕ решены.** По первоисточнику `cryptopuzzles.eth.limo` обе головоломки
  находятся в разделе **Unsolved** (призовые адреса `0x06460646ca1603a61953eeb385681f5d56401ede` и `1PUzZ61FSVTn12CafJC85Vy1ts3BoFcXdU`).
  Сайт не обновлялся с 06.02.2019, автор сам предупреждает проверять блокчейн. Досье: `puzzles/cryptopuzzles-eth-easycore-numbers/README.md`.
  - **ПОПРАВКА (17.10.2026, Big Pickle) — проверка блокчейна выполнена: ОБА адреса ПУСТЫ (выведены).**
    Numbers `1PUzZ61…`: recv = sent = 944 414 сат, вывод **30.06.2021**; Easycore `0x06460646…`: **0 ETH**, 4 входа по 0,25 ETH (2019) и полный вывод **10.02.2020** (0,9991 ETH).
    Значит по блокчейну обе **закрыты (вероятно решены/claim)**, а не «открыты»; сайт устарел. Первоначальная метка каталога «решены» — ближе к истине. Отчёт: `reports/2026-10-17_2325_BigPickle_portfolio-balance-refresh.md`.
- **Plato's Solid — источников не найдено.** Криптопазла с таким названием нет ни в реестре @agntn/puzzles (50+ коллекций),
  ни в OCP, ни в списке cryptopuzzles.eth. Единственное совпадение — математическая «Plato's Solids Puzzle» (без приза и блокчейна).
  **Рекомендация: исключить или запросить исходную ссылку.** Досье: `solved/platos-solid/README.md`.
- **Satoshi-Maze = Phemex Dorian Nakamoto (дубликат).** Это одна и та же головоломка биржи Phemex (адрес `1h8BNZkhsPiu6EKazP19WkGxDw3jHf9aT`, свип 21.03.2020).
  Приз **не был выигран**: биржа вернула средства себе и сама опубликовала решение 21.03.2020.
  Каноническое досье: `solved/phemex-dorian-nakamoto/README.md`; папка `solved/satoshi-maze/` оставлена как алиас.
- **1000-BTC #135 — решён** (28.07.2026, RetiredCoder, автор RCKangaroo; ключ `6d9392a16883f90903d5f78da57af07eb2`
  опубликован 29.07.2026 в bitcointalk треде 5589799). Следующие «кенгуру-доступные» цели: **#140, #145, #150, #155, #160**.
- **Полезно взять в каталог целиком:** реестр **@agntn/puzzles** — https://puzzles.agntn.dev/
  (50+ коллекций; markdown-версии `/raw/collections/<slug>.md`; машинночитаемые данные
  https://raw.githubusercontent.com/agntn/puzzles/main/puzzles.json; индекс https://puzzles.agntn.dev/sitemap.md).


# ═══════════════════════════════════════════════════════════════════
# ЧАСТЬ 7: ОБНОВЛЕНИЯ И ДОПОЛНЕНИЯ (проверка 16.10.2026)
# ═══════════════════════════════════════════════════════════════════

## 7.1 Уточнения по уже известным призовым пазлам

- **A2 Genesis Block Wallet**: актуальный баланс 168 779 сат на 12.09.2026 (24 P2WSH-выхода, растёт; по verified_state puzzles.json). Ранее в каталоге было «878 140 сат» — это устаревшая/ошибочная оценка.
- **Part 6 «ЗАКРЫТЫ» исправлен**: Arweave #12, FTPK Season 2 и LogicBeach «Powerful Moss» были ошибочно отмечены как закрытые; на самом деле они **открыты** (см. ниже и OCP). Из закрытых убраны.
- **FTPK Season 4** подтверждённо решён (решение/выплата есть в OCP, кассовый tx 0x4c10…ffdd8f37, 181 USDC).
- **Сводка решённых (OCP, 10)** для сверки с Part 6: Andy Bauch COG; bc1q21 timelock L5; Bitcoin Movie Enigma; Dug Student Hunt; FTPK S4; Keysa; LuckyLurker Seed Riddles; VeteranHODL Hunting Time; Wonderabbit Prometheus; Zden LVL5. (Часть уже была в Part 6.)
- **Arweave серия**: #12 тоже открыт (ранее каталог упоминал только #3, #10, #11).
- **Teikhos / TeikhosBounty**: в каталоге (B28) стоял «~2.0 ETH, неопубликованный ключ». OCP уточняет: это набор контрактов Джона Нюгрена (C1 1.000002, C2 0.500002, 9732 0.500002 ETH открыты; 735B решён на 0.5 ETH). См. ниже.

## 7.2 Новые призовые пазлы (ранее отсутствовали в каталоге)

### Arweave Weave #12 — 400,00248121 AR (~$724)
- **Адрес**: `XRGEfkMbCMHeTY9mZI9Lh6hf8EmA8RstmBFUjDm40fg` (Arweave)
- **Статус**: открыто (funded-unspent, проверено 16.08.2026)
- **Тип**: word-selection, geometry, text-cipher
- **Источники**:
  - X: https://twitter.com/arweavep/status/1257613928185675776 (05.05.2020, «Puzzle 12 is here»)
  - Страница: https://arweave.net/gymumAAsxGlzqPL5HzoEB8Xryu61o174j7vHwx21Qoo
  - X: https://twitter.com/arweavep/status/1264211142714499072 («58 chars CS»)
  - X: https://twitter.com/arweavep/status/1250036746802298885 («1,2,4,8 = solved / 3,5,7,9 = not solved»)
  - OCP: https://github.com/floflo777/open-crypto-puzzles/tree/main/2-mid-prizes/arweave-puzzle-12-400ar
  - Explorer: https://viewblock.io/arweave/address/XRGEfkMbCMHeTY9mZI9Lh6hf8EmA8RstmBFUjDm40fg
- **Суть**: кусок 3 решён, кусок 1 имеет сильное неподтверждённое чтение, открыто 18-символьное значение куска 2.

### FTPK Season 2 «Never-Ending» — 305,930218 USDT
- **Сеть/контракт**: Ethereum, `0xb5fe4f1b6cb2bbe6a327f8c68f370da7df18b2dc` (USDT, нативный ETH = 0)
- **Статус**: открыто (funded-unspent, проверено 27.08.2026)
- **Тип**: bip39-seed, word-selection
- **Источники**:
  - X автора: https://x.com/FTPKgame/status/1924450289311961483 (19.05.2025)
  - HUB: https://findtheprivatekeys.vercel.app/
  - S2 сайт: https://findtheprivatekeys2.vercel.app/
  - X автора: https://x.com/FTPKgame/status/1930610344247906356 (Attack Challenge Mode)
  - X автора: https://x.com/FTPKgame/status/1934183762079666297 (последняя подсказка S2)
  - X/N4Khjir: https://x.com/N4Khjir/status/1927621189503005053 , https://x.com/N4Khjir/status/1927623047076282678
  - Escrow: https://etherscan.io/address/0xb5fe4f1b6cb2bbe6a327f8c68f370da7df18b2dc
  - OCP: https://github.com/floflo777/open-crypto-puzzles/tree/main/2-mid-prizes/ftpk-season-2-300usdt
- **Суть**: имя страницы (hash без пробелов), игры 1–11 + экстра; «черный конь» (15.06.2025). 0 из 12 слов подтверждены через оракул.

### LogicBeach «Powerful Moss» — 0,55 ETH (Base)
- **Контракт**: `0x831102C7eb86f9EC8f79dF891bDeA187D54344Dd` (Base), min 0.25 ETH, растёт по кривой времени
- **Статус**: открыто (contract-holds-funds, проверено 16.08.2026)
- **Тип**: image-stego, bip39-seed, word-selection, smart-contract
- **Источники**:
  - Страница: https://logicbeach.xyz/powerfulmoss
  - X: https://x.com/Logic_Beach/status/1882824094854557885
  - POAP: https://poap.gallery/drops/183468
  - Write-up (предыдущий пазл LogicBeach): https://elronvhubbard.medium.com/logicbeach-bifurcations-album-puzzle-write-up-1e1094d41038
  - Write-up (2021 ETH): https://l0gicbeach.medium.com/logicbeach-eth-album-puzzle-2021-57acaf1910db
  - OCP: https://github.com/floflo777/open-crypto-puzzles/tree/main/2-mid-prizes/logicbeach-powerful-moss-0-54eth
- **Суть**: носитель = картинка POAP-часов, порядок = позиция стрелки; 3 из 12 часов читаются однозначно, >3.3M kombinatsiy остальных отрицательны; блокер — разрешение картинки.

### Pindar Van Arman «cryptoArtGAN Act 1» — 1 NFT (ERC-1155)
- **Контракт/адрес**: `0x18f87ec9c527aba1db44f715456bf28b0dae478d` (Ethereum), NFT «Magic Internet moneyGAN» (445/512)
- **Статус**: открыто (funded-unspent, проверено 16.08.2026)
- **Тип**: bip39-seed, word-selection
- **Источники**:
  - Сайт: https://bitgans.com/
  - Анонс: https://bitgans.com/news/cryptoartgans (05.02.2022)
  - X: https://x.com/VanArman/status/1562799956175757313 (25.08.2022)
  - Журнал: https://bitgans.com/journal/page014
  - OCP: https://github.com/floflo777/open-crypto-puzzles/tree/main/2-mid-prizes/pindar-van-arman-cryptoartgan-nft
- **Суть**: нужно выбрать 11 «глитчей» из 12 опубликованных слов и их порядок; ~22.5M адресов и 9 полных наборов проверены, 0 совпадений.

### TeikhosBounty (Johan Nygren, «Proof-of-Public-Key») — 2.000006 ETH
- **Сеть**: Ethereum. Открыты:
  - C1 `0x17e5e0910b9185b0ede564dcbf074ca910ad56a4` — 1.000002 ETH
  - C2 `0xd7c6d542f3dcdceda845112b8fd567b8f8655805` — 0.500002 ETH
  - 9732 `0x973c2178b09225d1de3ab037d40b3f24af696255` — 0.500002 ETH
  - AEC7 `0xaec7e8c221c3fd24e75c996e32289235fd899ebf` — 1.000012 ETH (без пути выплаты)
  - Решён 735B `0x735ba26f91e1275fa4b504649b19ef74739fe7e7` → 0.5 ETH (выплачено 21.06.2026)
- **Статус**: открыто (C1/C2/9732 funded-unspent, проверено 16.08.2026)
- **Тип**: smart-contract, timelock
- **Источники**:
  - Gist: https://gist.github.com/resilience-me/be11a0ed3575dddca10df8263b53cc1d (27.02.2018, ProofOfSymmetricKey.sol)
  - EIP-935: https://github.com/ethereum/EIPs/issues/935 (19.03.2018, идея подписи)
  - C1-код: https://etherscan.io/address/0x17e5e0910b9185b0ede564dcbf074ca910ad56a4#code
  - Ревернутая попытка 2022 (утечка pubkey 735B): https://etherscan.io/tx/0x7e2596f9f202aad8a90e84cf93e32e7b3fb0ba244491d84542cedaf089a553c4
  - Выплата 735B: https://etherscan.io/tx/0x4d2bfceb311bda8d265debab1c8ad23cb860922b876eca523327d0405ab97bff
  - OCP: https://github.com/floflo777/open-crypto-puzzles/tree/main/2-mid-prizes/teikhos-bipedaljoe-solver-bounties-2eth
- **Суть**: криптография подтверждена (735B решили), но целевые pubkey C1/C2/9732 никогда не появлялись on-chain; реальный путь — информация от автора.

## 7.3 Архивные / мёртвые пазлы OCP (ранее не были в каталоге)

| Slug | Название | Приз | Статус/причина | Эскроу (если есть) |
|---|---|---|---|---|
| commander-u-puzzle-8-5btc | Commander U «Riddle for 8.5 BTC» | 8.50099081 BTC | suspected-fake | `1KDUcZh5Z6H1of4Pwoy5ojJtkQxcQBHhnH` (99 081 сат + 8.5 BTC в P2PK 2010 г., показано mempool.space неверно) |
| objective-thune-licorne-0-21btc | Objective Thune «Le Secret de la Licorne» | 0.21021 BTC | unobtainable-material (210 экземпляров книги) | `3Jf995GANG4EmFBK89byNNyZdtB3ELXJsZ` |
| onfo-forsyth-1btc | ONFO / Dr. Forsyth Treasure Hunt | 1 BTC | author-deceased-unfinished | `157dpLJgAAKugukKz8UwBHapM4idyZvnLc` |
| zodomo-11x11-pixel-puzzles-0-05eth | Zodomo 11x11 Pixel Puzzles | 0.05 ETH | unfunded (escrow сметён) | `0x60a5431a138b0320641408694562f624f3c977a8` (swept) |
| aenigma-shards-nft | Aenigma Shards (AESH NFT) | 34 ETH (обещано) | unfunded (0 ETH на контракте) | `0xC77C1CB208356d953439190a94f3C8a4c4f502A3` (unfunded) |
| bam-askabitcoiner-seed-cipher | BAM x AskABitcoiner Seed Cipher | 42 100 сат | swept-by-third-party (05.06.2026) | `3Q1Qzs6EmTVE4JeUWRJVNxi9v5UJLN2mtc` (swept) |
| demint-bitcoin-evangelism | De Mint «Bitcoin Evangelism» | 3 146 386 сат | solved-by-others (~окт. 2022) | эскроу не опубликован |
| game-of-satoshi-season-1 | The Game of Satoshi (S1) | 0.21 BTC | custodial (сервер) | — |
| phemex-dorian-nakamoto | Phemex Dorian Nakamoto | 1.1 BTC | swept-by-third-party (21.03.2020; публичный ключ раскрыт) | `1h8BNZkhsPiu6EKazP19WkGxDw3jHf9aT` (swept) |
| wares-wallets-solana | Wares Wallets (Solana) | 0.1 SOL | swept-by-third-party | `AayfnPQbmjR4nh9MY2EbgghVRLDVLnKDro3AJb9agCZq` (swept) |
| zk-guess-chainhackers-31 | ZK Guess #31 (Base) | 0.0025 ETH | window-closed (угадано третьими; ~40 ч позже) | `0x6F890B08fa4312135E1b4CF03929f8e389A866B4` (contract-holds) |

**Примечания**:
- Для мёртвых пазлов оставлены причины из OCP: подделка/неизвлекаемый материал/автор умер/без финансирования/решено третьими/custodial/окно закрыто.
- «Onfo / Forsyth»: автор умер в 2023, половина материала (сегменты 6–10) не выходила.

## 7.4 Сводная таблица escrow (OCP, все открытые/закрытые)

| Slug | Статус | Цепь | Приз | Эскроу-адрес | Состояние (проверено) | Ссылка |
|---|---|---|---|---|---|---|
| aoi-nakamoto-quizchain-0-854btc | open | bitcoin | 0.777 BTC | `14zMkTgaVXJcxdh4JdWi29MLRR44iUSG9W` | funded-unspent (2026-08-27) | https://mempool.space/address/14zMkTgaVXJcxdh4JdWi29MLRR44iUSG9W |
| aoi-nakamoto-quizchain-0-854btc | open | bitcoin | 0.777 BTC | `13Cv6SXUnzGDT8JHqzzJ8xMPtsSdhJA4wd` | swept (2026-08-21) | https://mempool.space/address/13Cv6SXUnzGDT8JHqzzJ8xMPtsSdhJA4wd |
| aoi-nakamoto-quizchain-0-854btc | open | bitcoin | 0.777 BTC | `19TbyN5KCg1Lg7qHwezifsLVcdSa2Rj5KN` | swept (2026-08-16) | https://mempool.space/address/19TbyN5KCg1Lg7qHwezifsLVcdSa2Rj5KN |
| ballet-bobby-lee-2btc-cards | open | bitcoin | 2.00007358 BTC | `1JxWyNrkgYvgsHu8hVQZqTXEB9RftRGP5m` | funded-unspent (2026-08-16) | https://mempool.space/address/1JxWyNrkgYvgsHu8hVQZqTXEB9RftRGP5m |
| ballet-bobby-lee-2btc-cards | open | bitcoin | 2.00007358 BTC | `1QGtbKxx6FKDD66LwnrzHCAHmyZ7mDHqC4` | funded-unspent (2026-08-16) | https://mempool.space/address/1QGtbKxx6FKDD66LwnrzHCAHmyZ7mDHqC4 |
| ballet-bobby-lee-2btc-cards | open | bitcoin | 2.00007358 BTC | `1LL6Xy92LwGDRfQP9fBU7f1477cEKctr7c` | swept (2026-08-16) | https://mempool.space/address/1LL6Xy92LwGDRfQP9fBU7f1477cEKctr7c |
| bitaps-shamir-challenge-1btc | open | bitcoin | 1.00016775 BTC | `bc1qyjwa0tf0en4x09magpuwmt2smpsrlaxwn85lh6` | funded-unspent (2026-08-28) | https://mempool.space/address/bc1qyjwa0tf0en4x09magpuwmt2smpsrlaxwn85lh6 |
| blm-brave-new-world-0-2btc | open | bitcoin | 20107284 sats | `1KfZGvwZxsvSmemoCmEV75uqcNzYBHjkHZ` | funded-unspent (2026-08-16) | https://mempool.space/address/1KfZGvwZxsvSmemoCmEV75uqcNzYBHjkHZ |
| gsmg-io-5btc-puzzle | open | bitcoin | 1.25649674 BTC (17.10.2026) | `1GSMG1JC9wtdSwfwApgj2xcmJPAwx7prBe` | partially-spent (2026-10-17) | https://mempool.space/address/1GSMG1JC9wtdSwfwApgj2xcmJPAwx7prBe |
| gsmg-io-5btc-puzzle | open | bitcoin | 3.75055856 BTC (17.10.2026; не приз) | `17ucy1K9ZUAaoY6JVtM932W9jUp5LXfyHa` | funded-unspent (2026-10-17) | https://mempool.space/address/17ucy1K9ZUAaoY6JVtM932W9jUp5LXfyHa |
| guntis-vitolins-metamask-8-6eth | open | ethereum | 8.612541554256945 ETH | `0x9C2F44EFAd0c1E852a09dF9939e6DaF061140CaF` | funded-unspent (2026-08-16) | https://etherscan.io/address/0x9C2F44EFAd0c1E852a09dF9939e6DaF061140CaF |
| peter-todd-hash-collision-bounties-0-59btc | watch | bitcoin | 0.59364885 BTC | `35Snmmy3uhaer2gTboc81ayCip4m9DT4ko` | funded-unspent (2026-08-16) | https://mempool.space/address/35Snmmy3uhaer2gTboc81ayCip4m9DT4ko |
| peter-todd-hash-collision-bounties-0-59btc | watch | bitcoin | 0.59364885 BTC | `3KyiQEGqqdb4nqfhUzGKN6KPhXmQsLNpay` | funded-unspent (2026-08-16) | https://mempool.space/address/3KyiQEGqqdb4nqfhUzGKN6KPhXmQsLNpay |
| peter-todd-hash-collision-bounties-0-59btc | watch | bitcoin | 0.59364885 BTC | `39VXyuoc6SXYKp9TcAhoiN1mb4ns6z3Yu6` | funded-unspent (2026-08-16) | https://mempool.space/address/39VXyuoc6SXYKp9TcAhoiN1mb4ns6z3Yu6 |
| peter-todd-hash-collision-bounties-0-59btc | watch | bitcoin | 0.59364885 BTC | `3DUQQvz4t57Jy7jxE86kyFcNpKtURNf1VW` | funded-unspent (2026-08-16) | https://mempool.space/address/3DUQQvz4t57Jy7jxE86kyFcNpKtURNf1VW |
| peter-todd-hash-collision-bounties-0-59btc | watch | bitcoin | 0.59364885 BTC | `37k7toV1Nv4DfmQbmZ8KuZDQCYK9x5KpzP` | swept (2026-08-16) | https://mempool.space/address/37k7toV1Nv4DfmQbmZ8KuZDQCYK9x5KpzP |
| ah-white-walking-banks-800ksats | open | bitcoin | 800000 sats | `bc1qxy4tf0s4n7x9w24rawf9qsxh2hyljrmvyrhwzt` | funded-unspent (2026-08-16) | https://mempool.space/address/bc1qxy4tf0s4n7x9w24rawf9qsxh2hyljrmvyrhwzt |
| ah-white-walking-banks-800ksats | open | bitcoin | 800000 sats | `bc1q4qc24xk5cehc4t7vr264zldsms2kmxf86jqjau` | funded-unspent (2026-08-16) | https://mempool.space/address/bc1q4qc24xk5cehc4t7vr264zldsms2kmxf86jqjau |
| arweave-puzzle-10-500ar | open | arweave | 500.02225493 AR | `bkjJGw3NLxs8OAyRxgTL-QFpiB3lBJqZ76kDhWdB-Rs` | funded-unspent (2026-08-16) | https://viewblock.io/arweave/address/bkjJGw3NLxs8OAyRxgTL-QFpiB3lBJqZ76kDhWdB-Rs |
| arweave-puzzle-11-1eth | open | ethereum | 1 ETH | `0xFF2142E98E09b5344994F9bEB9C56C95506B9F17` | funded-unspent (2026-08-16) | https://etherscan.io/address/0xFF2142E98E09b5344994F9bEB9C56C95506B9F17 |
| arweave-puzzle-12-400ar | open | arweave | 400.00248121 AR | `XRGEfkMbCMHeTY9mZI9Lh6hf8EmA8RstmBFUjDm40fg` | funded-unspent (2026-08-16) | https://viewblock.io/arweave/address/XRGEfkMbCMHeTY9mZI9Lh6hf8EmA8RstmBFUjDm40fg |
| arweave-puzzle-3-1000ar | open | arweave | 1000.165838006237 AR | `wHP6OPG5GMF5dedo_CD8AAy6x8La-gfI5b5pk65Tx_0` | funded-unspent (2026-09-04) | https://viewblock.io/arweave/address/wHP6OPG5GMF5dedo_CD8AAy6x8La-gfI5b5pk65Tx_0 |
| corey-phillips-kitten-passphrase-1msats | open | bitcoin | 1001900 sats | `bc1qcyrndzgy036f6ax370g8zyvlw86ulawgt0246r` | funded-unspent (2026-08-16) | https://mempool.space/address/bc1qcyrndzgy036f6ax370g8zyvlw86ulawgt0246r |
| fe-lang-bountiful-compiler-bounty-1eth | open | ethereum | 1 ETH | `0x71fB6afcD98c5BD611712ad4b8D314EF729aa69D` | funded-unspent (2026-08-17) | https://etherscan.io/address/0x71fB6afcD98c5BD611712ad4b8D314EF729aa69D |
| ftpk-season-2-300usdt | open | ethereum | 305.930218 USDT | `0xb5fe4f1b6cb2bbe6a327f8c68f370da7df18b2dc` | funded-unspent (2026-08-27) | https://etherscan.io/address/0xb5fe4f1b6cb2bbe6a327f8c68f370da7df18b2dc |
| keir-finlow-bates-blockchain-book-600ksats | open | bitcoin | 600000 sats | `14aFhno96fkt7knLWMDQ4j8yh8v5hBF4n1` | swept (2026-09-01) | https://mempool.space/address/14aFhno96fkt7knLWMDQ4j8yh8v5hBF4n1 |
| keir-finlow-bates-blockchain-book-600ksats | open | bitcoin | 600000 sats | `14utGQn5GdfPvUrHNLAwTmmP99QpXm9mg6` | swept (2026-09-01) | https://mempool.space/address/14utGQn5GdfPvUrHNLAwTmmP99QpXm9mg6 |
| keir-finlow-bates-blockchain-book-600ksats | open | bitcoin | 600000 sats | `1QFafw3weoWTRQhiLafRw2eyWbVmES6wfJ` | swept (2026-09-01) | https://mempool.space/address/1QFafw3weoWTRQhiLafRw2eyWbVmES6wfJ |
| keir-finlow-bates-blockchain-book-600ksats | open | bitcoin | 600000 sats | `17Y9czcbcCz433QXsy1SGQjwLb27BBtLLZ` | funded-unspent (2026-09-01) | https://mempool.space/address/17Y9czcbcCz433QXsy1SGQjwLb27BBtLLZ |
| keir-finlow-bates-blockchain-book-600ksats | open | bitcoin | 600000 sats | `181rPpfdUGFg4fVEdhDZEfDbBSqgigtoZR` | swept (2026-09-01) | https://mempool.space/address/181rPpfdUGFg4fVEdhDZEfDbBSqgigtoZR |
| keir-finlow-bates-blockchain-book-600ksats | open | bitcoin | 600000 sats | `161YgNX2NrCzGunWvoV1hN3DuzWeuovBK3` | swept (2026-09-01) | https://mempool.space/address/161YgNX2NrCzGunWvoV1hN3DuzWeuovBK3 |
| keir-finlow-bates-blockchain-book-600ksats | open | bitcoin | 600000 sats | `1KZei2D5yz3UJ59LvXsC1Y9y4ktSgcnVwz` | swept (2026-09-01) | https://mempool.space/address/1KZei2D5yz3UJ59LvXsC1Y9y4ktSgcnVwz |
| keir-finlow-bates-blockchain-book-600ksats | open | bitcoin | 600000 sats | `1DZ5NbUwDgxeJkKhQLgYcUUX36PtYso1pm` | funded-unspent (2026-09-01) | https://mempool.space/address/1DZ5NbUwDgxeJkKhQLgYcUUX36PtYso1pm |
| keir-finlow-bates-blockchain-book-600ksats | open | bitcoin | 600000 sats | `1MEstvLAzc5DzJtvx7uyvKNNUCPN3ofWMK` | swept (2026-09-01) | https://mempool.space/address/1MEstvLAzc5DzJtvx7uyvKNNUCPN3ofWMK |
| keir-finlow-bates-blockchain-book-600ksats | open | bitcoin | 600000 sats | `1Q78hDeaHXQbuCSQxG1uPAc4V3jsuVUG9r` | swept (2026-09-01) | https://mempool.space/address/1Q78hDeaHXQbuCSQxG1uPAc4V3jsuVUG9r |
| keir-finlow-bates-blockchain-book-600ksats | open | bitcoin | 600000 sats | `1QExGvuieS9MvuKC3R1qjp6jGTVcqisTDj` | swept (2026-09-01) | https://mempool.space/address/1QExGvuieS9MvuKC3R1qjp6jGTVcqisTDj |
| keir-finlow-bates-blockchain-book-600ksats | open | bitcoin | 600000 sats | `19kkawFcg2U2s6vq368MXD7FJU9JZvRrjA` | funded-unspent (2026-09-01) | https://mempool.space/address/19kkawFcg2U2s6vq368MXD7FJU9JZvRrjA |
| logicbeach-powerful-moss-0-54eth | open | base | 0.55 ETH | `0x831102C7eb86f9EC8f79dF891bDeA187D54344Dd` | contract-holds-funds (2026-08-16) | https://basescan.org/address/0x831102C7eb86f9EC8f79dF891bDeA187D54344Dd |
| path-to-greatness-treasure-hunt-3ltc | open | litecoin | 3.02608794 LTC | `LUtL7qnm3gzxKjHcfVLSjydqhhinTVmTmS` | funded-unspent (2026-09-12) | https://litecoinspace.org/address/LUtL7qnm3gzxKjHcfVLSjydqhhinTVmTmS |
| pindar-van-arman-cryptoartgan-nft | open | ethereum | 1 NFT | `0x18f87ec9c527aba1db44f715456bf28b0dae478d` | funded-unspent (2026-08-16) | https://etherscan.io/address/0x18f87ec9c527aba1db44f715456bf28b0dae478d |
| rushwallet-contest-30-1msats | open | bitcoin | 1000000 sats | `13Q8hJqagtd77ojTJcEZPjTz2sBFSsYxyj` | partially-spent (2026-08-16) | https://mempool.space/address/13Q8hJqagtd77ojTJcEZPjTz2sBFSsYxyj |
| school-of-bitcoin-1msats | open | bitcoin | 1000000 sats | `bc1qcsdfkaqgy9ux668vmzflzqsyg0qtspncymt5ed` | funded-unspent (2026-08-16) | https://mempool.space/address/bc1qcsdfkaqgy9ux668vmzflzqsyg0qtspncymt5ed |
| smith-lyle-moore-hunt-2-0-032btc | open | bitcoin | 0.031777 BTC | `bc1q0akdjvrc2csau2n3gyxa3xcq0fss852x997m9y` | funded-unspent (2026-08-16) | https://mempool.space/address/bc1q0akdjvrc2csau2n3gyxa3xcq0fss852x997m9y |
| wealth-in-poetry-0-03btc | open | bitcoin | 3124630 sats | `1K4ezpLybootYF23TM4a8Y4NyP7auysnRo` | funded-unspent (2026-08-16) | https://mempool.space/address/1K4ezpLybootYF23TM4a8Y4NyP7auysnRo |
| zden-haluska-halv-312ksats | open | bitcoin | 312500 sats | `1crypto24HCr178iMcKd5iUi5D4rsg1nK` | funded-unspent (2026-08-16) | https://mempool.space/address/1crypto24HCr178iMcKd5iUi5D4rsg1nK |
| crypto-puzzles-2018-puzzle-2-0-05eth | open | ethereum | 0.05 ETH | `0x1fa8Be9De5bBFE047C72dB8E8E3257128F7661ad` | funded-unspent (2026-08-16) | https://etherscan.io/address/0x1fa8Be9De5bBFE047C72dB8E8E3257128F7661ad |
| exitonly-challenge-14-30ksats | open | bitcoin | 30000 sats | `bc1q5rjy2cdfy4n4dkk4r6pxtwqlm8tgjcc2dj0ee9` | funded-unspent (2026-08-16) | https://mempool.space/address/bc1q5rjy2cdfy4n4dkk4r6pxtwqlm8tgjcc2dj0ee9 |
| genesis-block-wallet-puzzle-142ksats | open | bitcoin | 168779 sats | `bc1qfkhx02v89u2qyyyljeczw6hu9sr437y44t7ae5yf09thrdukfqesnjg2wj` | funded-unspent (2026-09-12) | https://mempool.space/address/bc1qfkhx02v89u2qyyyljeczw6hu9sr437y44t7ae5yf09thrdukfqesnjg2wj |
| andy-bauch-new-money-cog-428ksats | solved | bitcoin | 428206 sats | `1HLodS8H2GoWbnBXWcz7EkY773dKdD4JEv` | swept (2026-09-26) | https://mempool.space/address/1HLodS8H2GoWbnBXWcz7EkY773dKdD4JEv |
| bc1q21-timelock-challenge-l5-100ksats | solved | bitcoin | 100000 sats | `bc1q3pwpgp7dkhtzj6qya39l8tu6dgdarv9gr9kx0r` | swept (2026-08-16) | https://mempool.space/address/bc1q3pwpgp7dkhtzj6qya39l8tu6dgdarv9gr9kx0r |
| bitcoin-movie-enigma-100ksats | solved | bitcoin | 100000 sats | `bc1q94ecsn0qk8lap2gefrycnms3ruepy889z969a6` | swept (2026-09-07) | https://mempool.space/address/bc1q94ecsn0qk8lap2gefrycnms3ruepy889z969a6 |
| dug-student-treasure-hunt-63ksats | solved | bitcoin | 63216 sats | `bc1qych2me6h85j38s3xmfwdkcvpqakpld3yr2y5ss` | swept (2026-08-16) | https://mempool.space/address/bc1qych2me6h85j38s3xmfwdkcvpqakpld3yr2y5ss |
| dug-student-treasure-hunt-63ksats | solved | bitcoin | 63216 sats | `bc1qphfklk568cf93267yetpngqsz0mthw4z4x2q69` | swept (2026-08-16) | https://mempool.space/address/bc1qphfklk568cf93267yetpngqsz0mthw4z4x2q69 |
| dug-student-treasure-hunt-63ksats | solved | bitcoin | 63216 sats | `bc1qnclravnmv7vta9fhnp44hu3y85z3tfgz0n33wl` | swept (2026-08-16) | https://mempool.space/address/bc1qnclravnmv7vta9fhnp44hu3y85z3tfgz0n33wl |
| ftpk-season-4-166usdc | solved | ethereum | 166.0 USDC | `0xa468335485cE853F21A44451755bd88364e9d618` | swept (2026-08-21) | https://etherscan.io/address/0xa468335485cE853F21A44451755bd88364e9d618 |
| keysa-crack-the-seed-369ksats | solved | bitcoin | 369369 sats | `bc1qcv84707v4sglaj306qezkcrun4eejh77k8cyjr` | swept (2026-09-12) | https://mempool.space/address/bc1qcv84707v4sglaj306qezkcrun4eejh77k8cyjr |
| luckylurker-seed-riddles-80ksats | solved | bitcoin | 80000 sats | `bc1q32e3dxcd0n2tlzdmchraf2057d0ax4xdwrk3jq` | swept (2026-08-21) | https://mempool.space/address/bc1q32e3dxcd0n2tlzdmchraf2057d0ax4xdwrk3jq |
| veteranhodl-hunting-time-420ksats | solved | bitcoin | 420000 sats | `bc1qhzy6j4amw26z7e694mgfr7kvzl7xteu54f0a85` | swept (2026-08-21) | https://mempool.space/address/bc1qhzy6j4amw26z7e694mgfr7kvzl7xteu54f0a85 |
| wonderabbit-prometheus-1msats | solved | bitcoin | 1031123 sats | `bc1q3nxe7436s3mlrkyrg3uv2a40yt5dcmfu7tggx5` | swept (2026-10-03) | https://mempool.space/address/bc1q3nxe7436s3mlrkyrg3uv2a40yt5dcmfu7tggx5 |
| zden-haluska-lvl5-555ksats | solved | bitcoin | 555550 sats | `1cryptoGeCRiTzVgxBQcKFFjSVydN1GW7` | swept (2026-09-26) | https://mempool.space/address/1cryptoGeCRiTzVgxBQcKFFjSVydN1GW7 |
| commander-u-puzzle-8-5btc | dead-end | bitcoin | 8.50099081 BTC | `1KDUcZh5Z6H1of4Pwoy5ojJtkQxcQBHhnH` | funded-unspent (2026-08-16) | https://mempool.space/address/1KDUcZh5Z6H1of4Pwoy5ojJtkQxcQBHhnH |
| objective-thune-licorne-0-21btc | dead-end | bitcoin | 0.21021 BTC | `3Jf995GANG4EmFBK89byNNyZdtB3ELXJsZ` | funded-unspent (2026-08-16) | https://mempool.space/address/3Jf995GANG4EmFBK89byNNyZdtB3ELXJsZ |
| onfo-forsyth-1btc | dead-end | bitcoin | 1 BTC | `157dpLJgAAKugukKz8UwBHapM4idyZvnLc` | funded-unspent (2026-08-16) | https://mempool.space/address/157dpLJgAAKugukKz8UwBHapM4idyZvnLc |
| zodomo-11x11-pixel-puzzles-0-05eth | dead-end | ethereum | 0.05 ETH | `0x60a5431a138b0320641408694562f624f3c977a8` | swept (2026-08-16) | https://etherscan.io/address/0x60a5431a138b0320641408694562f624f3c977a8 |
| zodomo-11x11-pixel-puzzles-0-05eth | dead-end | ethereum | 0.05 ETH | `0x9cc846fe9b75a4cee897f605b240dd0030fcd5a2` | swept (2026-08-16) | https://etherscan.io/address/0x9cc846fe9b75a4cee897f605b240dd0030fcd5a2 |
| zodomo-11x11-pixel-puzzles-0-05eth | dead-end | ethereum | 0.05 ETH | `0xf5d45c9d798aedb754b1ed8660af3ea79178b765` | swept (2026-08-16) | https://etherscan.io/address/0xf5d45c9d798aedb754b1ed8660af3ea79178b765 |
| bam-askabitcoiner-seed-cipher | dead-end | bitcoin | 42100 sats | `3Q1Qzs6EmTVE4JeUWRJVNxi9v5UJLN2mtc` | swept (2026-08-16) | https://mempool.space/address/3Q1Qzs6EmTVE4JeUWRJVNxi9v5UJLN2mtc |
| phemex-dorian-nakamoto | dead-end | bitcoin | 1.1 BTC | `1h8BNZkhsPiu6EKazP19WkGxDw3jHf9aT` | swept (2026-08-16) | https://mempool.space/address/1h8BNZkhsPiu6EKazP19WkGxDw3jHf9aT |
| wares-wallets-solana | dead-end | solana | 0.1 SOL | `AayfnPQbmjR4nh9MY2EbgghVRLDVLnKDro3AJb9agCZq` | swept (2026-08-16) | https://solscan.io/account/AayfnPQbmjR4nh9MY2EbgghVRLDVLnKDro3AJb9agCZq |

## 7.5 Интернет-загадки (дополнение к ЧАСТИ 3)

Следующие мистерии из обзорных списков 2026 (WatchMojo, Top Entertainment News и др.) ранее не были в каталоге:

- **Max Headroom Broadcast Hijacking (1987)** — перехват двух чикагских TV-сигналов 22.11.1987, маска Max Headroom. Виновные не установлены (FCC держит дело открытым). Источники: https://en.wikipedia.org/wiki/Max_Headroom_broadcast_signal_intrusion ; https://www.watchmojo.com/articles/top-48-unsolved-internet-mysteries
- **Unfavorable Semicircle (2015–2016, YouTube)** — ~77 000 абстрактных видео с искажённым аудио, загружались на нечеловеческой скорости; создатель неизвестен. BBC называла это « quest to solve YouTube's strangest mystery». Источник: https://www.watchmojo.com/articles/top-48-unsolved-internet-mysteries
- **Jack Froese Emails (2011)** — письма с личными деталями из аккаунта умершего (сердечная аритмия), отправленные его другу и кузену спустя 5 месяцев. Источник: https://www.watchmojo.com/articles/top-48-unsolved-internet-mysteries
- **11B-X-1371 (2015)** — DVD из Польши с видео «чумного доктора», спектрограммы и шифры; автор объявился (Parker Warner Wright), считает арт-объектом, но intent спорен. Источник: https://www.watchmojo.com/articles/top-48-unsolved-internet-mysteries
- **Lake City Quiet Pills (2010-е)** — сайт/сообщения, связь с разведкой (оспаривается). Источник: https://www.10enews.com/famous-internet-mysteries-which-are-still-unsolved-in-2026/
- **Publius Enigma (1994, Usenet)** — загадка, связанная с альбомом Pink Floyd; PDF/шифры. Источник: https://en.wikipedia.org/wiki/Publius_Enigma
- **Oct282011.com (2011)** — сайт с обратным отсчётом, связывали с вымогательством/взломом; детали противоречивы. Источник: https://www.watchmojo.com/articles/top-48-unsolved-internet-mysteries
- **973-eht-namuh-973.com** — загадочный сайт с обратным таймером, уведенная угроза «the end is coming». Источник: https://www.watchmojo.com/articles/top-48-unsolved-internet-mysteries
- **Unfavorable Semicircle-наследники / Adam 2.0** — потенциальные преемники, молчаливые; упоминания в обзорах. Источник: https://www.watchmojo.com/articles/top-48-unsolved-internet-mysteries
- **Mariana's Web / Deep-web мифология** — отдельная категория легенд. Источник: https://www.watchmojo.com/articles/top-48-unsolved-internet-mysteries
- **Lost Media (BFI 75 Most Wanted, Doctor Who и др.)** — не пазлы, но связанные расследования. Источник: https://mysteryatlas.pulsaa.net/topics/internet-mysteries

## 7.6 Каталоги / источники для расширения (новые ссылки)
- WatchMojo, 48 unsolved internet mysteries: https://www.watchmojo.com/articles/top-48-unsolved-internet-mysteries
- Top Entertainment News, unsolved 2026: https://www.10enews.com/famous-internet-mysteries-which-are-still-unsolved-in-2026/
- Mystery Atlas, internet mysteries: https://mysteryatlas.pulsaa.net/topics/internet-mysteries
- Internet Is Fun, database: https://internetisfun.com/database/internet-mysteries-compendium/
- Wikipedia category: https://en.wikipedia.org/wiki/Category:Internet_mysteries
- Reddit r/InternetMysteries: https://www.reddit.com/r/InternetMysteries/
- Vibe List, cracked cases: https://vibelist.net/internet-pop-culture/internet-history/the-internets-most-baffling-unsolved-mysteries-the-few-that-were-eventually-cracked/

## 7.7 Автономия / «самобудильник»
- В этой среде я не могу сам себя разбудить между сообщениями: reasoning-агент работает только при входящем сообщении/вызове.
- Что можно сделать: (а) я сделал большой пакет обновлений в этом проходе; (б) можно запустить фоновый скрипт (PowerShell-цикл), но сеть из shell часто недоступна (SSL), а без сети он не сможет проверять балансы; (в) самый надёжный путь — периодически присылать короткое «продолжай»/«обнови», либо настроить внешний планировщик (cron/GitHub Actions) на fetch-проверки и запись в файл.
- Предлагаю: при каждом вашем «продолжай» я повторяю цикл: проверить OCP puzzles.json, web-источники, дозаписать новые пазлы/ссылки/балансы, и кратко доложить.

# ═══════════════════════════════════════════════════════════════════
# ЧАСТЬ 8: БАЛАНСЫ И ПЛАНЫ (обновлено 16.10.2026)

## 8.1 Актуальные балансы (BlockCypher, 16.10.2026)
- A1 Trithemius: 3 124 630 сат (2 tx, 0 трат) — совпадает с каталогом.
- A3 Smith/Lyle/Moore: 3 177 700 сат (1 tx, 0 трат) — совпадает.
- A4 Path to Greatness (LTC): 302 608 794 литоши (8 tx, 0 трат) — совпадает.
- B1 BLM: 20 107 284 сат (5 tx, 0 трат) — совпадает.
- B11 Bitaps: 100 016 775 сат (5 tx, 0 трат) — совпадает (1.00016775 BTC).
- A2 Genesis: 168 779 сат на 12.09.2026 (OCP) — используем это значение.
- A5 Arweave #3/#10/#11/#12: см. OCP verified_state (таблица 7.4).

## 8.2 Планы следующих циклов (объёмные задачи)
- Цикл 3 (15 мин): (1) пройти 28 OCP README и вытащить clues/leads в appendix; (2) добавить 15 новых интернет-мистерий; (3) проверить 30 ссылок из Parts 3-4; (4) записать итог в WAKE_QUEUE.md.
- Цикл 4 (15 мин): (1) собрать балансы всех адресов из Parts 1-2 через API; (2) обновить "Баланс 14.10"; (3) дозаполнить источники для B9-B43.
- Цикл 5 (15 мин): (1) структурировать каталог (оглавление, якоря); (2) cross-reference; (3) экспорт tl;dr.
Каденция: 15 минут. Каждый цикл ставить новый таймер и писать отчёт в WAKE_QUEUE.md.

## 8.3 Структура папок пазлов (создано/сверено 16.10.2026, deepseek-flash)

Всего папок в `puzzles/`: **103** (49 существовавших + 54 созданные в этом проходе).
Индекс с описаниями: `puzzles/README.md`.

Созданы досье для загадок, которые были только в каталоге:

- **Категория Б (криптопазы):** B3 Oobit 139, B4 Нуаза/bitcoin.fr, B5 kTimesG Phy, B6 Solana Puzzles #4,
  B9 Bitcoin Coders Puzzle 07, B10 LuckyLurker Vault #2, B18 seed-phrase.com, B22 The Great Riddle,
  B23 Anime Seed Phrase, B24 Actuarial Science NFT Hunt, B26 bitaddress BIP38, B29 310 BTC Challenge,
  B30 Seed Phrase Crossword (Magic Eden), B33 Bitcoin Treasure-Hunt Book Series, B34 Veil Hunts,
  B35 Paradigm Kryptos CTF, B36 Groestlcoin, B37 QDay, B39 Timeless Random Seed, B40 Trezor Bug Bounty,
  B42 Bitimage, B43 1 BTC Brainwallet (DEFCON 2014).
- **Часть 2:** 1000 BTC Challenge (с полной таблицей нерешённых #71-#160).
- **Часть 3 (интернет-загадки):** Cicada 3301, Cicada 3372, A858DE45F56D9BC9, Markovian Parallax Denigrate,
  Сатоси Накамото, Neuro-sama ARG, Minecraft ARG, John Titor, GhostNet, Valor por Tamaulipas, Webdriver Torso.
- **Часть 7.5 (новые мистерии):** Max Headroom, Unfavorable Semicircle, Jack Froese Emails, 11B-X-1371,
  Lake City Quiet Pills, Publius Enigma, Oct282011.com, 973-eht-namuh-973, Adam 2.0, Mariana's Web,
  Lost Media / BFI 75 Most Wanted.
- **Часть 6 (закрытые, ранее без досье):** Satoshi-Maze, Proof of Writing, Plato's Solid, WIF500,
  cryptopuzzles.eth (Easycore/Numbers), LuckyLurker Vault #1.
- **Часть 9 (добавлена внешней правкой в 23:07):** UVB-76 «The Buzzer», Project Architeuthis,
  Operation Mindfuck / Illuminatus-культура (остальные 11 записей Части 9 уже имели папки).

Сведённые дубликаты (отдельных папок нет, чтобы не дублировать знания):
- `B31 Kitten Passphrase Puzzle` = `puzzles/corey-phillips-kitten-passphrase-1msats` (в каталоге ошибка: 0,0010019 BTC;
  фактический адрес держит 1 001 900 сат = 0,010019 BTC).
- `B41 Genesis Block Brainwallet Puzzle` = `puzzles/genesis-block-wallet-puzzle-142ksats` (каталог сам ссылается на A2).
- `B32 Move Over Brokers Treasure Hunt` = `puzzles/keir-finlow-bates-blockchain-book-600ksats`.
- `1000-BTC #135` учтён в папке 1000 BTC Challenge.

**Известные пробелы** (нужны первоисточники; в досье помечены как «не подтверждено»):
адрес/эскроу для B23 Anime Seed Phrase, B24 Actuarial Science NFT Hunt, B29 310 BTC Challenge,
B30 Seed Phrase Crossword, B33 Bitcoin Treasure-Hunt Book Series, B39 Timeless Random Seed,
B42 Bitimage, B43 1 BTC Brainwallet, WIF500, cryptopuzzles.eth, LuckyLurker Vault #1, Satoshi-Maze,
Proof of Writing, Plato's Solid.

**Замечание по конкурентным правкам:** в этом проходе обнаружено, что разделы 8.1 и 8.2 были утрачены
при внешней правке файла (появился раздел ЧАСТЬ 9). Разделы восстановлены 16.10.2026 23:13.
Параллельным агентам: не перезаписывать файл целиком, только дополнять (append/edit).

# ═══════════════════════════════════════════════════════════════════
# ЧАСТЬ 9: ИНТЕРНЕТ-МИСТЕРИИ (углублённо, 16.10.2026)

# ═══════════════════════════════════════════════════════════════════
# ЧАСТЬ 10: БАЛАНСЫ ПРОХОДА 4 (BlockCypher, 16.10.2026)
# ═══════════════════════════════════════════════════════════════════

- B8 Commander U: `1KDUcZh5Z6H1of4Pwoy5ojJtkQxcQBHhnH` — 850 099 081 сат (8.50099081 BTC; P2PK 2010 года + P2PKH 99 081 сат).
- B9 Bitcoin Coders Puzzle 07: `bc1qj7xsxrlgmnnrqwvlakacc5yrh33h2n3xaa0m09` — 21 000 сат.
- B10 LuckyLurker Vault #2: `bc1qnepv9pcnqvndux9h9mcaxvk6u993rc0lew9fpp` — 100 000 000 сат (1 BTC), 1 tx, unreceived (confirmed).
- B13 Ballet AA009926: `1JxWyNrkgYvgsHu8hVQZqTXEB9RftRGP5m` — 100 003 481 сат (1.00003481 BTC).
- B16 Corey Phillips kitten: `bc1qcyrndzgy036f6ax370g8zyvlw86ulawgt0246r` — 1 001 900 сат.

Протокол агентов: см. `master/AGENT_INSTRUCTIONS.md`.
# ═══════════════════════════════════════════════════════════════════

# ═══════════════════════════════════════════════════════════════════
# ЧАСТЬ 11: БАЛАНСЫ ПРОХОДА 5 (BlockCypher, 16.10.2026)
# ═══════════════════════════════════════════════════════════════════

- B8 Commander U: 850 099 081 сат (8.50099081 BTC).
- B9 Bitcoin Coders #07: 21 000 сат.
- B10 LuckyLurker Vault #2: 100 000 000 сат (1 BTC).
- B13 Ballet AA009926: 100 003 481 сат.
- B16 Corey Phillips: 1 001 900 сат.
- B19 AH White addr0: 100 000 сат; addr1 (700 000 сат) — rate limited, каталог-значение сохранено.
- B22 The Great Riddle: 423 871 сат.
- B25 Exitonly #14: 30 000 сат.
- B26 bitaddress BIP38: 529 700 сат (529700), из 3 806 300 получено, 3 276 600 потрачено (многоходовка).

Проверка ссылок ( выборка ): mempool.space/bitcoin-адреса работают через BlockCypher; GitHub/OCP readme доступны; detailed OCP deep docs аналогично. Протокол агентов: `master/AGENT_INSTRUCTIONS.md`.
Расширенная проверка ссылок (486 URL, найденные мёртвые ссылки) — см. раздел 12.9.

# ═══════════════════════════════════════════════════════════════════
# ЧАСТЬ 12: СВОДКА V2 (рабочие досье агентов Hark, 16.10.2026) — перенесено deepseek-flash
# ═══════════════════════════════════════════════════════════════════

Полный исходник v2 сохранён рядом: `MASTER_CATALOG_v2_2026-10-16.md` (257 КБ, 1835 строк).
Пер-пазловые досье из v2 **распределены по папкам** `puzzles/<slug>/README.md` (разделы
«Досье Hark v2 (16.10.2026)», «Оперативный статус v2», «Поправка к каталогу v2»).
Ниже — то, что относится ко всему каталогу целиком и должно читаться перед работой.

## 12.1 Как пользоваться (из v2, Часть 0.1)

- Части 1–7 — общий каталог (кратко). **ЧАСТЬ 8 — рабочие досье по каждой загадке, которой мы занимались**: механизм, подсказки, что установлено, что проверено и отброшено (с объёмами), что осталось, оракулы, скрипты, проекты Hark. Записи в Части 1, по которым есть досье, заменены ссылкой «→ ЧАСТЬ 8.x».
- Все рабочие папки уже существуют — **продолжать там, читать их NOTES.md, не начинать заново**: `/workspace/work/<имя>/` (genesis, trithemius, slm, glimmer, blm, quizchain, oobit139, rushwallet30, riddle85, bcoders07, luckylurker2, noizat, bitaps_sss, bountiful*, inv/phy, inv/qday, web3auto/puzzle4, mth202610, cardano_egg) и проект «работа» `/workspace/projects/b6983d3d-52f5-48f8-9974-b99dc8e31c55/work/` (ptg, arweave, guntis, kitten, bc07, sp, audit) + доска стратега `.../strategy/` (STRATEGY.md, QUEUE.md, IDEAS.md, LOG.md, dossiers/).
- Python-зависимости стратега: `PYTHONPATH=/workspace/projects/b6983d3d-52f5-48f8-9974-b99dc8e31c55/work/pylib` (системный pip сбрасывается; перед счётом проверять coincurve, mnemonic).

## 12.2 Правила работы (из v2, Часть 0.2)

- **«Идеи и делайте, а не переборы» (16.10 11:33).** Каждый цикл = одна новая интерпретация из источника (текст/картинка/подсказки/прошлые загадки автора), проверка малым набором (≤10⁴ кандидатов). Массовые переборы >10⁶ запрещены; допустим только финальный счёт узко определённой идеи. Записывать идею в IDEAS (идея → основание → предсказание → результат).
- Ресурсы: песочница общая на все проекты — 2 CPU, ~7 ГБ. Не больше одного фонового счёта, `nice -n 19`, timeout ≤40 мин, прогресс в файл, резюмируемо.
- **Траты — только с явного согласия Ильи** (у агентов денег нет). Книги, платные подсказки, депозиты — спросить одной строкой. KYC нет. Ничего не публиковать и не писать от имени Ильи без его согласия (письмо автору SLM — черновик, не отправлено).
- Найденный ключ/seed — только в `.secret/` (chmod 600), никогда в чат/каталог. Сразу проверить адрес и вывести весь баланс (комиссия из приза) на адреса Ильи: BTC `bc1q4kgn8aj6j29j3zj9pfm4khcsx4hj7smkncz78a`, LTC `ltc1qkekjqn9yl0h5quwy42p7zqjuz3t4dmfarx8wtq`, EVM `0x724F6B03E8B1a5a4AE39082Ced21E88b9780125e`, SOL `3o15Gt7YLWDVEyS53UuJNJcYdyoaLNQx6hRsLCdyv4V9`, ADA `addr1q8v8qvdvjsycxc3mgfnrfwffnlzekfqvdyj8um8uazxtjj29zhytjrpn92yupre5cm29hzkpywrxljtqjmm9c9u76drsgnu4a2`. AR/GRS/ALGO — ключ в .secret и спросить Илью адрес.
- История: 14.10 22:00 Илья отменил все пазлы; 15.10 01:38 вернул призовые загадки из этого каталога стратегу проекта «работа» (b6983d3d), разрешил выносить перспективные в отдельные проекты.

## 12.3 Сводка: наши загадки, балансы и шансы (v2, Часть 0.3, проверено 16.10.2026 ~23:30 МСК)

| Загадка | Приз сейчас | Шанс (наш) | Где стоим | Кто ведёт |
|---|---|---|---|---|
| Zden HALV | 312 500 сат, не тронут | ~12% | Осциллограмма = 256 узлов × 4 уровня × 8 полос; все прямые упаковки 0; дальше — грамматика автора по решателям LVL1–5 | проект 294b2fcf (цикл 15 мин) |
| Bitcoin Coders #07 | 21 000 сат, не тронут | ~12% | 11 из 12 панелей опознаны (не опознана нижняя левая); перебор синонимов specD идёт | проект 975a88ce |
| SLM Glimmer | 3 177 700 сат, не тронут | см. 8.2 | 46/57 страниц открыто, 11 из 12 слов известны; упор в passphrase; черновик письма автору ждёт решения Ильи | проект 1b07d678 (цикл 10 мин) |
| Oobit #139 | 1 545 000 сат, не тронут | ~3% | 5 надёжных слов из 12; нужен ровно набор из 12, потом порядок | проект c2397a33 (цикл 30 мин) |
| Genesis Block | 946 040 сат, 116 tx, трат 0 (растёт) | ~2% | 255 форм «Satoshi Nakamoto» × 64 009 срезов = 0; нужна схема по новым OP_RETURN-ответам автора | стратег b6983d3d |
| Path to Greatness | 3,02608794 LTC, не тронут | 2–4% | 4 AES-замка закрыты; новые зацепки по кораблю/песку/песням — 8.3 | заморожено |
| Нуаза bitcoin.fr | 0,2024 BTC, не тронут | ~2% | Нужна книга (покупку Илья отклонил 13.10) | заморожено |
| Guntis 8,6 ETH | ~8,6125 ETH, не тронут | ~1,5% | Пул слов неполон/порядок неясен; перебор 190 млн снят правилом «идеи» | стратег (ярус 2) |
| BLM | 0,20107284 BTC, не тронут | ≤1–3% | h2_02 досчитан 0; Electrum v2 не проверен толком | заморожено |
| Quizchain RBB | 0,777 BTC, не тронут | ≤1% | Флип-правило Grycoin-2 не найдено; 10,7 млрд MD5 = 0 | заморожено |
| RushWallet #30 | 0,01 BTC, не тронут | ≤1% | Нужно видео >720p | заморожено |
| Trithemius | 0,0312463 BTC, не тронут | ~0,5% | BIP39-ветка GPS-правила: 219/467 единиц; остаток 37–53 ч CPU | стратег (свободный слот) |
| Kitten | 1 001 900 сат, не тронут | ~0,3% | Угадать passphrase человека; 154 цитаты автора = 0 | ярус 3 |
| Phy (kTimesG) | 800 000 сат, не тронут | низкий | Пауза до новой подсказки автора | заморожено |
| Solana #4 | 0,834 SOL | низкий | ~6 млн по модели объектов = 0 | заморожено |
| LuckyLurker #2 | 1 BTC, не тронут | 0 сейчас | Отложен автором, подсказок нет | сторож |
| Riddle 8.5 | 99 081 сат | <1% | Только перебор, не брать | — |
| Bitaps Shamir | 1,00016775 BTC | ~0 | ≥2¹¹⁹, не брать | — |
| Arweave #3 / #10 | 1000,166 AR / 500,022 AR, не тронуты | низкий | ~121 тыс. кандидатов #3 = 0 | заморожено |
| Arweave #12 | **0 AR — забран** | — | Не брать | — |
| Mapnificent MTH202610 ($400) | — | ? | **Решено 5/5**, ответ отправлен 13.10; итоги ~01.12.2026; повторно не слать | сторож |
| Cardano 13373665 Ch6 | ~12,8 ADA | низко-средний | Ch3 уже решён и выведен нами 13.10 | — |

**Проверка балансов 17.10.2026 (Qoder):** Guntis 8.612542 ETH/nonce 7, Crypto Puzzles 2018 #2 0.05 ETH/nonce 0, Teikhos C1/C2/9732/AEC7 1.000002/0.500002/0.500002/1.000012 ETH (nonce 1), Aenigma 0, Fe Bountiful registry 1.0 ETH — всё **не тронуто**. Genesis-эскроу вырос до **946 040 сат / 116 tx / трат 0** (ответы автора в блоке 971770: 7 отпечатков + предложение 10k+1k). Ничего не зависло, все статусы таблицы актуальны.

## 12.4 Важные поправки к каталогу (из v2, раздел G6)

1. **В разделе 7.2 каталога четыре пазла названы «открытыми», но наша живая проверка 12.10.2026 это опровергает.** Источники: `/workspace/work/puzzle-inventory-2026-10-12.md`, раздел «Swept, solved or unfunded», и `/workspace/work/ocp_check_2026-10-12.txt`. Статусы «открыто» в 7.2 взяты из манифеста OCP (проверка 16.08–27.08.2026) и устарели.
   - **Arweave Weave #12.** Адрес `XRGEfkMb…40fg`: баланс 0 AR, last_tx `gx0Ws1TP…`. В ocp_check «DRIFT: manifest says funded-unspent, chain says unfunded». Handoff 14.10 тоже пишет «#12 забран».
   - **FTPK Season 2.** Контракт `0xb5fe4f1b…dc`: USDT balanceOf = 0, nonce 6. ocp_check: «swept».
   - **LogicBeach «Powerful Moss»** (Base). Контракт `0x831102C7…44Dd`: баланс 0, nonce 1. В инвентаре: «claimed Oct 2026».
   - **Pindar Van Arman bitGAN.** Адрес `0x18f87e…478d`: 0 ETH (12.10 и 14.10). Приз здесь NFT, а владение NFT мы **не проверяли**, так что статус не подтверждён.
2. **QDay B37.** «Q-Day Prize (1 BTC)» Project Eleven — **другой конкурс**: выдан 24.04.2026 (Lelli, 15-битный ключ) и закрыт. Не путать с «Steal this vault». Источник: `/workspace/projects/b6983d3d-52f5-48f8-9974-b99dc8e31c55/strategy/LOG.md`, запись 16.10 18:15.
3. **Fe Bountiful B15.** Инвентарь 12.10 называет приз «1 ETH registry (7 × 0.25 ETH challenges)», но 7 × 0,25 ≠ 1,0. Как приз распределён по играм, не проверено (сумма зашита в `Challenge.prize_amount`). → **ЗАКРЫТО 17.10.2026: on-chain подтверждено — 7 × 0.25 ETH номинал, баланс registry 1.0 ETH (оплатит первые 4 claim'а).**
4. **Phy и Solana #4.** 14.10 около 22:00 работу по ним, а также по Bitaps, отменил Илья: «do not touch». 15.10 01:38 стратег проекта «работа» получил право брать пазлы из каталога, но Phy и Solana #4 он держит в ярусе 3, «заморожено». Источник: `/workspace/projects/b6983d3d-52f5-48f8-9974-b99dc8e31c55/strategy/STRATEGY.md`.

---

## 12.5 Новые живые загадки вне каталога (из v2, Часть Б)

Перенесены в отдельные папки:

- [mapnificent-treasure-hunt-mth202610](puzzles/mapnificent-treasure-hunt-mth202610/README.md) — MTH202610, $400, **решено нами 5/5**, ответ отправлен 13.10.2026, ждём итогов ~01.12.2026. Повторно не слать.
- [cardano-13373665-challenge](puzzles/cardano-13373665-challenge/README.md) — Cardano Ch6, ~12,8 ADA + 4011 egg; Ch3 решён и выведен 13.10.2026.
- [nist-seeds-bounty-valsorda](solved/nist-seeds-bounty-valsorda/README.md) — $12 288 (×3 при пожертвовании); 877 106 556 хешей = 0.
- [tumblecaesar-1000algo](puzzles/tumblecaesar-1000algo/README.md) — 1000,0037 ALGO, не тронут; seed 0…3,8 млн = 0.
- [rectorsquid-arrow-puzzle-50usd](puzzles/rectorsquid-arrow-puzzle-50usd/README.md) — $50 PayPal, по комментарию 2013 жив.
- [rcodes-1tk3up2-500usd](puzzles/rcodes-1tk3up2-500usd/README.md) — $500, не решён с мая 2026.
- [rcodes-1ojeu3c-5usd](puzzles/rcodes-1ojeu3c-5usd/README.md) — $5, транспозиция с цифрами.
- [purebasic-t85211-600eur](puzzles/purebasic-t85211-600eur/README.md) — 600 EUR, страница за Cloudflare 403.

## 12.6 Реестр мёртвых и отбракованных загадок

- [dead-ends-registry](puzzles/dead-ends-registry/README.md) — **проверять перед началом любой работы**.
  Таблица из ~45 позиций с конкретной причиной смерти (swept / unfunded / solved / dead /
  not-ours / spend-required / off-chain) и датой проверки. Дубликаты с Частью 6 и 7.3 исключены.

## 12.7 Ключевые поправки к статусам (сводно)

- **Arweave Weave #12 — приз забран** (баланс 0 AR, last_tx `gx0Ws1TP…`); каталог 7.2 ошибочно считал открытым.
- **FTPK Season 2 — swept** (USDT balanceOf = 0); каталог 7.2 ошибался.
- **LogicBeach «Powerful Moss» — claimed Oct 2026** (контракт пуст); каталог 7.2 ошибался.
- **Pindar bitGAN — 0 ETH**, владение NFT не проверено; скорее мёртв.
- **QDay:** не путать с «Q-Day Prize» (Project Eleven, 1 BTC) — тот выдан 24.04.2026 (Lelli) и закрыт.
- **Fe Bountiful:** «1 ETH (7 × 0,25 ETH)» арифметически не сходится, распределение приза не проверено. → **ЗАКРЫТО 17.10.2026 (см. п.3 выше): 7 × 0.25 номинал при балансе 1.0 ETH.**
- **Phy и Solana #4:** 14.10.2026 работа отменена Ильёй («do not touch»), у стратега — ярус 3, заморожено.
- **Paradigm Kryptos CTF — ЗАКРЫТ (исправлено 17.10.2026):** все 10 пазлов решены `forwardsecrecy` 02.10.2026; страница CTF указывает приём до 31.07.2026. Призовых $1000 больше нет; отдельно K4 скульптуры не решён, но это не оплачиваемый CTF-пазл.
- **Timeless $1000 Random Seed** — адрес `0xb6f4…aC37` опустошён 15.02.2025, баланс 0.
- **Bitcoin Treasure-Hunt Book Series** — это книга «CRACKED» Professor F (одна, не серия), решена 01.01.2026, приз 0,3 BTC; «25% роялти» не подтверждено.
- **310 BTC Challenge** — адрес финальной стадии (0,31 BTC) в источниках не найден.
- **Trezor Bug Bounty** — активная программа, но «до $100 000» не подтверждено; это не пазл.
- **Не подтверждено (источников нет):** B23 Anime Seed Phrase, B24 Actuarial Science NFT Hunt,
  B30 Seed Phrase Crossword, B9 «серия» Bitcoin Coders #07, B37 QDay «Steal this vault»,
  B43 «20 подсказок из книги» (вероятно «The One Bitcoin Heist», DEF CON 33).

## 12.8 Поправки по итогам web-исследования 21 загадки (deepseek-flash)

Проведено независимое web-исследование по 21 «тонкой» записи каталога (B22-B43).
Результаты перенесены в папки. Ключевое:

- **Подтверждено живое (балансы не тронуты):** Oobit #139 — 1 545 000 сат; kTimesG Phy — 800 000 сат;
  Solana #4 — 0,834 SOL; LuckyLurker Vault #2 — 1 BTC (статус «Postponed»); seed-phrase.com — 0,01 BTC;
  The Great Riddle — 423 871 сат (автор Bartosz Lewicki / The Great Print); bitaddress BIP38 — 529 700 сат
  (ключ `6PfQTphCYc1Fee19uPz2pmou5RVBDVgw8VcrPfGLos4ktUnARdiFLYhcNU`, EC-multiply без сжатия);
  Groestlcoin — 1000,0001 GRS (1 tx с 10.08.2018).
- **Bitimage:** на базе техники Кори Филлипса два приза — 0,01 BTC (passphrase, не тронут) и
  0,00095133 BTC (вскрыт 09.07.2019). Спрятана BIP-39-мнемоника из data URI, а не seed;
  фото — твит Антонопулоса, автор — Кори Филлипс.
- **Veil Hunts:** «$1380-$2020» не подтверждено ($2500 для охоты #1); домен findveil.com не подтверждён.

## 12.9 Проверка ссылок (deepseek-flash, 16.10.2026)

Автоматический обход всех URL каталога: **486 уникальных**, проверено **224**.

- **Реально мёртвые (HTTP 404), исправлены в папках:** `cicada-solvers.github.io` → https://www.cicadasolvers.com/quickstart/ ;
  два URL Daily Dot по 11B-X-1371 → https://dailydot.com/11b-x-1371-11b-3-1369-parker-wright ;
  `cyberwarzone.com/darknet-marianas-web-levels/` (пример-пересказ мифа; первоисточник — Engadget).
- **HTTP 400:** `abcnews.com/blogs/...` без `www` → рабочий вариант `abcnews.go.com/...`.
- **HTTP 503:** CDX API web.archive.org ограничивает ботов.
- **403 / 429 / таймауты:** защита от автоматических запросов (Medium, Cloudflare, Lost Media Wiki,
  mempool.space, vercel) — в браузере открываются.

## 12.10 Предупреждение о конкурентных правках (важно для агентов)

В этом проходе зафиксированы **три случая потери данных** из-за одновременной записи в `MASTER_CATALOG.md`:
разделы 8.1/8.2 были утрачены (восстановлены), затем подразделы 11.1-11.8 (восстановлены здесь как Часть 12).
**Правило: не перезаписывать файл целиком.** Только `append`/точечный `edit`; после правки проверять,
что ранее существовавшие разделы на месте (`8.1`, `8.2`, `8.3`, `ИСПРАВЛЕНИЯ ЭТОГО СПИСКА`, `ЧАСТЬ 12`).

---


# ═══════════════════════════════════════════════════════════════════
# ═══════════════════════════════════════════════════════════════════
# ЧАСТЬ 13: РЕЕСТР @agntn/puzzles — импорт 16.10.2026 (deepseek-flash)
# ═══════════════════════════════════════════════════════════════════

Реестр [@agntn/puzzles](https://puzzles.agntn.dev/) — второй по полноте независимый источник после OCP.
Машиночитаемые точки входа (проверены 16.10.2026, все отвечают 200):

- индекс всех страниц: https://puzzles.agntn.dev/sitemap.md
- markdown любой коллекции: `https://puzzles.agntn.dev/raw/collections/<slug>.md`
- машинные данные: https://raw.githubusercontent.com/agntn/puzzles/main/puzzles.json
- страницы авторов и решателей: `/raw/authors/<slug>.md`, `/raw/solvers/<slug>.md`
- гиды: балансы, верификация, CLI, реестр, playground — `/raw/guide/*.md`

Всего в реестре **50 коллекций**; скачано 49 (полный локальный кэш — `C:\111\agntn_raw\`).

## 13.1 Новые папки, созданные по реестру (18)

- [80-bit-ktimesg-key-challenge](solved/80-bit-ktimesg-key-challenge/README.md) — kTimesG's 80-bit key challenge
- [book-quiz-7-million](solved/book-quiz-7-million/README.md) — 7 million book quiz
- [coin-artist-torched-h34r7s](solved/coin-artist-torched-h34r7s/README.md) — TORCHED H34R7S Bitcoin Puzzle (coin_artist)
- [coin-games-weekly-banknote-puzzles](puzzles/coin-games-weekly-banknote-puzzles/README.md) — Coin_Games weekly banknote puzzles
- [doges-gambit](solved/doges-gambit/README.md) — Doge's Gambit
- [grycoin-chain](solved/grycoin-chain/README.md) — Grycoin chain
- [iamabananaamaa-puzzles](solved/iamabananaamaa-puzzles/README.md) — IAMABananaAMAA's puzzles (GIF-пазл)
- [ledger-donjon-ctf](solved/ledger-donjon-ctf/README.md) — Ledger Donjon CTF
- [liberte-guidant-le-peuple-2019](solved/liberte-guidant-le-peuple-2019/README.md) — La Liberté guidant le peuple 2019 (Pascal Boyart)
- [mini-puzzles-retiredcoder](solved/mini-puzzles-retiredcoder/README.md) — RetiredCoder's mini-puzzles (серия)
- [natasha-otomoski-1btc](solved/natasha-otomoski-1btc/README.md) — Natasha Otomoski puzzle, 1 BTC
- [picture-puzzle-1mbtc](solved/picture-puzzle-1mbtc/README.md) — 1 mBTC picture puzzle
- [quizchain-series](solved/quizchain-series/README.md) — Quizchain (серия, 77 блоков)
- [quizchain2-series](solved/quizchain2-series/README.md) — Quizchain2 (серия)
- [satoshi-birthday-7-million-quiz](solved/satoshi-birthday-7-million-quiz/README.md) — Satoshi birthday 7 million quiz
- [trivia-brainwallet-0-04btc](solved/trivia-brainwallet-0-04btc/README.md) — Brainwallet puzzle, 0.04 BTC (12 тривиа-загадок)
- [warpwallet-challenges](solved/warpwallet-challenges/README.md) — WarpWallet challenges
- [wickex-youtube-puzzle](solved/wickex-youtube-puzzle/README.md) — Wickex's YouTube puzzle

## 13.2 Существующие папки, дополненные разбором реестра (30)

В каждую добавлен раздел **«Досье agntn/puzzles (16.10.2026)»** с разбором первоисточника
(механика, кто и когда решил, что проверено, ссылки): ballet, bitaddress, bitaps, bitimage,
bits (1000 BTC), brave-new-world, dug, genesis, great-riddle, gsmg, hash-collision, hunting-time,
luckylurker, mineshop, mini, move-over-brokers, movie-enigma, path-to-greatness, phy, powerful-moss,
proof-of-writing, real-big-block, rushwallet, satoshi-maze, school-of-bitcoin, seed-phrase,
smith-lyle-moore, teikhos, walking-banks, wealth-in-poetry, zden.

Дополнительно общий разбор серии **Puzzle Weave** добавлен во все четыре папки Arweave
(#3, #10, #11, #12).

## 13.3 Что реестр даёт для решений (самое ценное)

- **Natasha Otomoski (1 BTC)** — ответ оказался ASCII-строкой: `SheHadTheIdeaWhileCombingHerHair`
  (32 символа, 8 camelCase-слов = приватный ключ напрямую, без хеширования). Решён `akkort` 22.08.2019,
  метод не раскрыт. Паттерн «ответ = ключ» полезен для других пазлов.
- **RetiredCoder mini-puzzles** — механика публикации ключей уже решённых пазлов 1000 BTC через подпись
  с nonce = merkle root генезис-блока. Это готовый инструмент атрибуции и верификации.
- **Grycoin chain** — источник «флип-правила», которое до сих пор блокирует B2 Quizchain Real Big Block.
- **Quizchain / Quizchain2** — полные серии по 77 блоков: дают грамматику подсказок автора AoiNakamoto.
- **Coin_Games weekly banknote** — серия, уже разобранная (3/3 забраны 2017-18) — в реестре есть детали.
- **WarpWallet challenges** — параметры scrypt/PBKDF2-кошельков, полезны как оракулы.

## 13.4 Замечание по конкурентным правкам

Раздел **12.10** («Предупреждение о конкурентных правках») остаётся в силе: файл правят параллельно.
Дубликат раздела «СВОДКА V2», случайно вставленный повторно 16.10.2026, удалён; проверяйте,
что в файле ровно один `# ЧАСТЬ 12: СВОДКА V2` и один `# ЧАСТЬ 13`.


# ═══════════════════════════════════════════════════════════════════
# ЧАСТЬ 14: OCP puzzles.json — машинные данные в папках (16.10.2026, deepseek-flash)
# ═══════════════════════════════════════════════════════════════════

Источник: https://raw.githubusercontent.com/floflo777/open-crypto-puzzles/main/puzzles.json
(snapshot OCP `generated_on: 2026-08-16`, цены: BTC 63 000, ETH 1 880, AR 1,81, LTC 54).
Локальный кэш: `C:\111\ocp_puzzles.json`.

**Состав реестра:** 49 записей — big 7, mid 18, small 3, solved 10, dead-end 11.
**Сверка покрытия: у всех 49 записей есть папка в `puzzles/` (0 отсутствующих).**

В каждую из 49 папок добавлен раздел **«OCP: машинные данные (puzzles.json, 16.10.2026)»**
со структурированными полями, которых не было в текстовом каталоге:

- `status` (+ `dead_end_reason`), `tier`, `chain`, `series`, `author` с хендлами;
- `prize` с оценкой в USD на дату снапшота и примечанием автора;
- **`addresses`** — все адреса с ролью, меткой, ожидаемой суммой, датой проверки
  и полем **`verified_state`** (`funded-unspent` / `swept` / `partially-spent` / `contract-holds-funds`);
- `puzzle_type`, `target_format`, `difficulty_left`, `difficulty_note`, `tested_total`;
- `derivation` — сводка пути и **оракул** (`oracle_certified`, `certified_against`);
- `leads` (зацепки), `solutions` (кто решил и как), `payout`, `artifacts`,
  `third_party_material`, `sources`.

**Почему это важно для решений:** поля `tested_total` и `difficulty_note` прямо говорят, что уже
перебрано и где стена; `derivation.oracle` указывает на готовый сертифицированный скрипт проверки;
`verified_state` у адресов — единственный надёжный признак, жив ли приз (манифест OCP устаревает:
именно так вскрылись ошибки по Arweave #12, FTPK S2, LogicBeach и Pindar, см. Часть 12.4).

**Итоговое состояние каталога на конец прохода:**
- **130** папок в `puzzles/`, у всех есть `README.md`;
- Части 1-14 в этом файле + полный исходник v2 рядом (`MASTER_CATALOG_v2_2026-10-16.md`);
- реестры, из которых пополнялся каталог: OCP (49), @agntn/puzzles (50 коллекций, локальный кэш
  `C:\111\agntn_raw\`), плюс web-исследования по 21 «тонкой» записи и 22 интернет-мистериям.

# КОНЕЦ КАТАЛОГА
# ═══════════════════════════════════════════════════════════════════
