# ═══════════════════════════════════════════════════════════════════
# ПОЛНЫЙ КАТАЛОГ КРИПТОЗАГАДОК И ИНТЕРНЕТ-МИСТЕРИЙ
# Собрано 14.10.2026; дополнено рабочими досье агентов Hark 16.10.2026 23:40 МСК
# ═══════════════════════════════════════════════════════════════════

# ЧАСТЬ 0: ДЛЯ АГЕНТОВ — ЧИТАТЬ ПЕРВЫМ

## 0.1 Как пользоваться
- Части 1–7 — общий каталог (кратко). **ЧАСТЬ 8 — рабочие досье по каждой загадке, которой мы занимались**: механизм, подсказки, что установлено, что проверено и отброшено (с объёмами), что осталось, оракулы, скрипты, проекты Hark. Записи в Части 1, по которым есть досье, заменены ссылкой «→ ЧАСТЬ 8.x».
- Все рабочие папки уже существуют — **продолжать там, читать их NOTES.md, не начинать заново**: `/workspace/work/<имя>/` (genesis, trithemius, slm, glimmer, blm, quizchain, oobit139, rushwallet30, riddle85, bcoders07, luckylurker2, noizat, bitaps_sss, bountiful*, inv/phy, inv/qday, web3auto/puzzle4, mth202610, cardano_egg) и проект «работа» `/workspace/projects/b6983d3d-52f5-48f8-9974-b99dc8e31c55/work/` (ptg, arweave, guntis, kitten, bc07, sp, audit) + доска стратега `.../strategy/` (STRATEGY.md, QUEUE.md, IDEAS.md, LOG.md, dossiers/).
- Python-зависимости стратега: `PYTHONPATH=/workspace/projects/b6983d3d-52f5-48f8-9974-b99dc8e31c55/work/pylib` (системный pip сбрасывается; перед счётом проверять coincurve, mnemonic).

## 0.2 Правила Ильи (обязательны)
- **«Идеи и делайте, а не переборы» (16.10 11:33).** Каждый цикл = одна новая интерпретация из источника (текст/картинка/подсказки/прошлые загадки автора), проверка малым набором (≤10⁴ кандидатов). Массовые переборы >10⁶ запрещены; допустим только финальный счёт узко определённой идеи. Записывать идею в IDEAS (идея → основание → предсказание → результат).
- Ресурсы: песочница общая на все проекты — 2 CPU, ~7 ГБ. Не больше одного фонового счёта, `nice -n 19`, timeout ≤40 мин, прогресс в файл, резюмируемо.
- **Траты — только с явного согласия Ильи** (у агентов денег нет). Книги, платные подсказки, депозиты — спросить одной строкой. KYC нет. Ничего не публиковать и не писать от имени Ильи без его согласия (письмо автору SLM — черновик, не отправлено).
- Найденный ключ/seed — только в `.secret/` (chmod 600), никогда в чат/каталог. Сразу проверить адрес и вывести весь баланс (комиссия из приза) на адреса Ильи: BTC `bc1q4kgn8aj6j29j3zj9pfm4khcsx4hj7smkncz78a`, LTC `ltc1qkekjqn9yl0h5quwy42p7zqjuz3t4dmfarx8wtq`, EVM `0x724F6B03E8B1a5a4AE39082Ced21E88b9780125e`, SOL `3o15Gt7YLWDVEyS53UuJNJcYdyoaLNQx6hRsLCdyv4V9`, ADA `addr1q8v8qvdvjsycxc3mgfnrfwffnlzekfqvdyj8um8uazxtjj29zhytjrpn92yupre5cm29hzkpywrxljtqjmm9c9u76drsgnu4a2`. AR/GRS/ALGO — ключ в .secret и спросить Илью адрес.
- История: 14.10 22:00 Илья отменил все пазлы; 15.10 01:38 вернул призовые загадки из этого каталога стратегу проекта «работа» (b6983d3d), разрешил выносить перспективные в отдельные проекты.

## 0.3 Сводка: наши загадки (балансы проверены 16.10.2026 ~23:30 МСК, mempool/arweave/litecoinspace/publicnode)

| Загадка | Приз сейчас | Шанс (наш) | Где стоим | Кто ведёт |
|---|---|---|---|---|
| Zden HALV | 312 500 сат, не тронут | ~12% | Осциллограмма = 256 узлов × 4 уровня × 8 полос; все прямые упаковки 0; дальше — грамматика автора по решателям LVL1–5 | проект 294b2fcf (цикл 15 мин) |
| Bitcoin Coders #07 | 21 000 сат, не тронут | ~12% | 11 из 12 панелей опознаны (не опознана нижняя левая); перебор синонимов specD идёт | проект 975a88ce |
| SLM Glimmer | 3 177 700 сат, не тронут | см. 8.2 | 46/57 страниц открыто, 11 из 12 слов известны; упор в passphrase; черновик письма автору ждёт решения Ильи | проект 1b07d678 (цикл 10 мин) |
| Oobit #139 | 1 545 000 сат, не тронут | ~3% | 5 надёжных слов из 12; нужен ровно набор из 12, потом порядок | проект c2397a33 (цикл 30 мин) |
| Genesis Block | 935 550 сат, 114 tx, трат 0 (растёт) | ~2% | 255 форм «Satoshi Nakamoto» × 64 009 срезов = 0; нужна схема по новым OP_RETURN-ответам автора | стратег b6983d3d |
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


# ЧАСТЬ 1: SEED-ФРАЗА / BIP39 ЗАГАДКИ (с призовыми фондами)

## КАТЕГОРИЯ А: ЖИВЫЕ И БЛИЗКИЕ К РЕШЕНИЮ (по handoff от Ильи)

### A1. Trithemius «Securing Wealth in Poetry» — 0,03124630 BTC
- **→ Полное актуальное досье (что решено, что проверено, что осталось): ЧАСТЬ 8.1 (Trithemius).** Старая краткая запись заменена.

### A2. Genesis Block Wallet — 878 140 сат (растёт!)
- **→ Полное актуальное досье (что решено, что проверено, что осталось): ЧАСТЬ 8.1 (Genesis Block).** Старая краткая запись заменена.

### A3. Smith, Lyle & Moore Hunt #2 «Glimmer» — 0,03177700 BTC
- **→ Полное актуальное досье (что решено, что проверено, что осталось): ЧАСТЬ 8.2 (SLM Glimmer).** Старая краткая запись заменена.

### A4. Path to Greatness — 3,02608794 LTC
- **→ Полное актуальное досье (что решено, что проверено, что осталось): ЧАСТЬ 8.3 (Path to Greatness).** Старая краткая запись заменена.

### A5. Arweave #3 / #10 (+#11)
- **→ Полное актуальное досье (что решено, что проверено, что осталось): ЧАСТЬ 8.3 (Arweave).** Старая краткая запись заменена.

## КАТЕГОРИЯ Б: ЖИВЫЕ, НО ТУПИКОВЫЕ (без новой информации)

### B1. BLM «Brave New World» — 0,20107284 BTC
- **→ Полное актуальное досье (что решено, что проверено, что осталось): ЧАСТЬ 8.4 (BLM).** Старая краткая запись заменена.

### B2. Quizchain Real Big Block (Aoi Nakamoto) — 0,777 BTC
- **→ Полное актуальное досье (что решено, что проверено, что осталось): ЧАСТЬ 8.4 (Quizchain).** Старая краткая запись заменена.

### B3. Oobit 139 (bitcoinpuzzles.io) — 0,01545 BTC
- **→ Полное актуальное досье (что решено, что проверено, что осталось): ЧАСТЬ 8.5 (Oobit #139).** Старая краткая запись заменена.

### B4. Нуаза / bitcoin.fr «Chasse au trésor» — 0,2024 BTC
- **→ Полное актуальное досье (что решено, что проверено, что осталось): ЧАСТЬ 8.4 (Нуаза).** Старая краткая запись заменена.

### B5. kTimesG Phy Challenge — 0,008 BTC
- **→ Полное актуальное досье (что решено, что проверено, что осталось): ЧАСТЬ 8.6 (Phy).** Старая краткая запись заменена.

### B6. Solana Puzzles #4 — 0,834 SOL
- **→ Полное актуальное досье (что решено, что проверено, что осталось): ЧАСТЬ 8.6 (Solana #4).** Старая краткая запись заменена.

### B7. RushWallet #30 — 0,01 BTC
- **→ Полное актуальное досье (что решено, что проверено, что осталось): ЧАСТЬ 8.4 (RushWallet #30).** Старая краткая запись заменена.

### B8. «Riddle for 8.5 BTC» (commanderu) — 99 081 сат
- **→ Полное актуальное досье (что решено, что проверено, что осталось): ЧАСТЬ 8.4 (Riddle 8.5).** Старая краткая запись заменена.

### B9. Bitcoin Coders Puzzle 07 — 21 000 сат
- **→ Полное актуальное досье (что решено, что проверено, что осталось): ЧАСТЬ 8.5 (Bitcoin Coders #07).** Старая краткая запись заменена.

### B10. LuckyLurker Vault #2 — 1,0 BTC
- **→ Полное актуальное досье (что решено, что проверено, что осталось): ЧАСТЬ 8.6 (LuckyLurker #2).** Старая краткая запись заменена.

## КАТЕГОРИЯ В: ТУПИКОВЫЕ / НЕРЕШАЕМЫЕ

### B11. Bitaps Shamir SSS — 1,00016775 BTC
- **→ Полное актуальное досье (что решено, что проверено, что осталось): ЧАСТЬ 8.6 (Bitaps).** Старая краткая запись заменена.

### B12. Guntis Vitolins «10 ETH Challenge» — 8,6125 ETH
- **→ Полное актуальное досье (что решено, что проверено, что осталось): ЧАСТЬ 8.5 (Guntis).** Старая краткая запись заменена.

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

### B15. Fe «Bountiful» — 1,0 ETH
- **→ Полное актуальное досье (что решено, что проверено, что осталось): ЧАСТЬ 8.6 (Fe Bountiful).** Старая краткая запись заменена.

## КАТЕГОРИЯ Г: МЕЛКИЕ / НИШЕВЫЕ

### B16. Corey Phillips kitten — 0,010019 BTC
- **→ Полное актуальное досье (что решено, что проверено, что осталось): ЧАСТЬ 8.5 (Kitten).** Старая краткая запись заменена.

### B17. School of Bitcoin — 0,01 BTC
- **Адрес**: `bc1qcsdfkaqgy9ux668vmzflzqsyg0qtspncymt5ed`
- **Механизм**: Морзе / Wingdings / QR → seed

### B18. seed-phrase.com (MetaNeer Labs) — 0,01 BTC
- **→ Полное актуальное досье (что решено, что проверено, что осталось): ЧАСТЬ 8.6 (seed-phrase.com).** Старая краткая запись заменена.

### B19. AH White «Walking Banks» — 0,008 BTC
- **Адреса**: `bc1qxy4tf0s4n7x9w24rawf9qsxh2hyljrmvyrhwzt` + `bc1q4qc24xk5cehc4t7vr264zldsms2kmxf86jqjau`
- **Механизм**: 24 слова в романе, 4 известны

### B20. Keir Finlow-Bates — 3 × 0,002 BTC
- **Адреса**: `17Y9czcbcCz433QXsy1SGQjwLb27BBtLLZ`, `1DZ5NbUwDgxeJkKhQLgYcUUX36PtYso1pm`, `19kkawFcg2U2s6vq368MXD7FJU9JZvRrjA`
- **Механизм**: brainwallet-ответы из книги

### B21. Zden «HALV» — 0,003125 BTC
- **→ Полное актуальное досье (что решено, что проверено, что осталось): ЧАСТЬ 8.5 (Zden HALV).** Старая краткая запись заменена.

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
- ⚠️ Дубль B16 (Corey Phillips Kitten) с ошибкой: приз 0,010019 BTC, неизвестна только BIP39-passphrase (24 слова публичны). См. 8.5.

### B32. Move Over Brokers Treasure Hunt — 0,0006 BTC
- **Механизм**: brainwallets, текстовые шифры

### B33. Bitcoin Treasure-Hunt Book Series
- **Механизм**: литературные загадки в книгах, 25% роялти

### B34. Veil Hunts — $1,380-$2,020
- **Источник**: findveil.com
- **Механизм**: физический геокэшинг, QR-код в сундуке

### B35. Paradigm Kryptos CTF (PK1-PK10)
- **Приз**: $1,000 за каждую из 10 задач
- **Источник**: Paradigm.xyz

### B36. Groestlcoin puzzle — 1000,0001 GRS
- **→ Полное актуальное досье (что решено, что проверено, что осталось): ЧАСТЬ 8.6 (Groestlcoin).** Старая краткая запись заменена.

### B37. QDay «Steal this vault» (Solana)
- **→ Полное актуальное досье (что решено, что проверено, что осталось): ЧАСТЬ 8.6 (QDay).** Старая краткая запись заменена.

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
- Дубль A2. См. 8.1.

### B42. Bitimage (Kitten Photo Puzzle) — ~0,00095 BTC
- ⚠️ Адрес без passphrase уже опустошён; живой приз — B16 (с passphrase). См. 8.5.

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

+ (16.10) Arweave #12 (0 AR, проверено 16.10), FTPK Season 2 (0 USDT), LogicBeach «Powerful Moss» (контракт пуст), Pindar bitGAN (0 ETH, NFT не проверен), Q-Day Prize Project Eleven (выдан 24.04.2026). Полный список ещё 44 мёртвых — ЧАСТЬ 8.6, раздел В.

FTPK S4 (решён), 1000-BTC #135,
Satoshi-Maze, Proof of Writing, Movie Enigma, Hunting Time, Keysa,
LuckyLurker #1, Dug Student Hunt, 310 BTC Challenge (частично),
Paradigm Kryptos CTF, cryptopuzzles.eth (Easycore/Numbers), Plato's Solid,
WIF500 (500 BTC, закрытый GPU-перебор 2⁵⁸)


# ═══════════════════════════════════════════════════════════════════
# ЧАСТЬ 7: ОБНОВЛЕНИЯ И ДОПОЛНЕНИЯ (проверка 16.10.2026)
# ═══════════════════════════════════════════════════════════════════

## 7.1 Уточнения по уже известным призовым пазлам

- **A2 Genesis Block Wallet**: (старая запись) 168 779 сат на 12.09.2026 — эскроу растёт за счёт платных вопросов; наша проверка 16.10 23:30: **935 550 сат, 114 tx, трат 0** (24 P2WSH-выхода, растёт; по verified_state puzzles.json). Ранее в каталоге было «878 140 сат» — это устаревшая/ошибочная оценка.
- **Part 6 «ЗАКРЫТЫ» исправлен**: Arweave #12, FTPK Season 2 и LogicBeach «Powerful Moss» были ошибочно отмечены как закрытые; на самом деле они **открыты** (см. ниже и OCP). Из закрытых убраны.
- **FTPK Season 4** подтверждённо решён (решение/выплата есть в OCP, кассовый tx 0x4c10…ffdd8f37, 181 USDC).
- **Сводка решённых (OCP, 10)** для сверки с Part 6: Andy Bauch COG; bc1q21 timelock L5; Bitcoin Movie Enigma; Dug Student Hunt; FTPK S4; Keysa; LuckyLurker Seed Riddles; VeteranHODL Hunting Time; Wonderabbit Prometheus; Zden LVL5. (Часть уже была в Part 6.)
- **Arweave серия**: #12 тоже открыт (ранее каталог упоминал только #3, #10, #11).
- **Teikhos / TeikhosBounty**: в каталоге (B28) стоял «~2.0 ETH, неопубликованный ключ». OCP уточняет: это набор контрактов Джона Нюгрена (C1 1.000002, C2 0.500002, 9732 0.500002 ETH открыты; 735B решён на 0.5 ETH). См. ниже.

## 7.2 Новые призовые пазлы (ранее отсутствовали в каталоге)

### Arweave Weave #12 — 400,00248121 AR (~$724)
- ⚠️ **ПОПРАВКА 16.10: по нашей ончейн-проверке приз ЗАБРАН / эскроу пуст** (см. 8.6 §0). Статус «открыто» ниже — устаревшие данные OCP (август).
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
- ⚠️ **ПОПРАВКА 16.10: по нашей ончейн-проверке приз ЗАБРАН / эскроу пуст** (см. 8.6 §0). Статус «открыто» ниже — устаревшие данные OCP (август).
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
- ⚠️ **ПОПРАВКА 16.10: по нашей ончейн-проверке приз ЗАБРАН / эскроу пуст** (см. 8.6 §0). Статус «открыто» ниже — устаревшие данные OCP (август).
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
- ⚠️ **ПОПРАВКА 16.10: по нашей ончейн-проверке приз ЗАБРАН / эскроу пуст** (см. 8.6 §0). Статус «открыто» ниже — устаревшие данные OCP (август).
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
| gsmg-io-5btc-puzzle | open | bitcoin | 1.2563451 BTC | `1GSMG1JC9wtdSwfwApgj2xcmJPAwx7prBe` | partially-spent (2026-09-03) | https://mempool.space/address/1GSMG1JC9wtdSwfwApgj2xcmJPAwx7prBe |
| gsmg-io-5btc-puzzle | open | bitcoin | 1.2563451 BTC | `17ucy1K9ZUAaoY6JVtM932W9jUp5LXfyHa` | funded-unspent (2026-09-03) | https://mempool.space/address/17ucy1K9ZUAaoY6JVtM932W9jUp5LXfyHa |
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
# ЧАСТЬ 8: РАБОЧИЕ ДОСЬЕ АГЕНТОВ HARK (что и как решили, что осталось) — 16.10.2026
# ═══════════════════════════════════════════════════════════════════

## 8.1 Genesis Block Wallet и Trithemius

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

### Trithemius «Securing Wealth in Poetry» — 3 124 630 sat (0,0312463 BTC)
- **Адрес/сеть**: BTC mainnet, `1K4ezpLybootYF23TM4a8Y4NyP7auysnRo` (P2PKH, сжатый ключ предполагается). 2 входящих tx, 0 трат:
  - финансирование `0a9ddd15…` — 2019-02-10 14:47 UTC, 3 050 269 sat с адреса 3Gyb…;
  - докидка `b3c9d8cc…` — 2019-04-08, 74 361 sat.
- **Путь деривации**: не известен. Проверяем BIP39: m/44'/0'/0'/0/0..1, m/0/0, m/0/1, m/0'/0/0, m/44'/0'/0'/1/0; Electrum: m/0/0..1, m/1/0..1. Пустая пассфраза. В статье «send it to your hardware wallet» — это намекает на BIP44.
- **Баланс**: 3 124 630 sat, spent 0 — последняя проверка 15.10 02:25 MSK (mempool.space). Совпадает с проверками 13.10 и 14.10.
- **Источники**:
  - Оригинал: https://medium.com/coinmonks/securing-bitcoin-seed-phrases-in-stories-d8eb43a02254 (OneSourGrape → @Trithemius; firstPublishedAt 2019-02-11 15:34:04 UTC; снимки Wayback 02-11…02-17 идентичны).
  - Разборы: https://github.com/HomelessPhD/Wealth_in_Poetry ; https://github.com/diploux/unsolved-crypto-puzzles/tree/main/puzzles/trithemius-wealth-in-poetry (заявляют скрытую «decode chain»).
  - Трекеры: https://puzzles.agntn.dev/collections/wealth-in-poetry ; https://privatekeys.pw/puzzles/0.03-btc-coinmonks-puzzle (UNSOLVED).
  - OCP `2-mid-prizes/wealth-in-poetry-0-03btc`.
- **Механизм**: 12 слов BIP39 по позициям токенов в тексте статьи. Проверить можно только адресом; фильтр — checksum BIP39 (1/16) или версия Electrum (1/256). Автор описал два метода:
  - (a) «Story & phone number»: цифры 2–3 телефонов → возрастающие позиции. Номера «written on a different page», то есть в статье их может не быть.
  - (b) «Letter & GPS»: pos_i = S + 10·i + d_i, где d_i — цифры координат лендмарка, «related to a plot».
  - Токенизация откалибрована на обоих примерах автора: слова через дефис и апостроф — один токен.
  - Носители VARS3: 32 варианта текста (`carrier3.py`): V0 = (4,1,1,1,1), V16 = (0,1,1,1,1).
- **Подсказки автора** (все — 2019-02-11, в самой статье; после этого автор не отвечал ни под статьёй, ни где-либо ещё):
  - «If you've read this far, you've read every word required to access a wallet with .03 BTC. Good luck!»
  - «Only you know which story contains your wealth.»
  - Метод (a) «…written on a different page to remove any connection…».
  - Метод (b): «21.493021 translates to: 2, 11, 24, 39, 43, 50, 62, 71».
  - Обещал пожертвовать приз (GiveDirectly), если его не заберут до конца 2020, — не сделал.
- **Что установлено**:
  - Пример (a) нерабочий: позиция 113 = «a».
  - Пример (b) (Supreme Court 38.8906 N, 77.0044 W → «asset trial load … honey») валиден по checksum, но его адреса никогда не финансировались.
  - Показанная в статье «seed phrase» witch collapse… скопирована с Bitcoin Wiki — не ключ.
  - Сюжет: Китай → Циндао → Тайвань → Канада. Шапка — фото Barth Bailey «Flock of birds», Middle Creek WMA, PA.
  - EXIF вычищен, стего не подтверждено.
  - Аномалии (diploux, не объяснены): «ye-ye» ровно один раз в каждом из 8 абзацев (позиции 26, 88, 179, 233, 278, 381, 437, 521); прописью «eighteen / ten / four thousand»; «it's» вместо «its».
  - GPS-правило перечислимо без знания лендмарка: ≈8,4e8 (V0) / 8,7e8 (V16) all-BIP39 на носитель, ≈5,3e7 с checksum.
- **Проверено и отброшено (всё 0 совпадений по адресу)**:
  - OCP 08.2026: 541 числовой ключ (~300 тыс. дериваций); деривации и пассфразы к примерам (~578 тыс.); форензика и LSB.
  - diploux: даты и годы как ключ. HomelessPhD: скользящие окна BIP39 / old Electrum.
  - Наше, 13–14.10:
    - GPS по Qingdao, Тайваню, Канаде, Caracas — ≈80 тыс.;
    - 15 лендмарков — 736 тыс.;
    - ye-ye и числительные как поток;
    - DMS 14 лендмарков — 43,7 тыс.;
    - все города ≥200k (3101): 5,67 млн; × 16 токенизаций + 15 пассфраз: 22,5 млн; × 32 носителя: 51,5 млн; lon-lat: 43,9 млн;
    - окрестность ±0,1° городов — 1,9e8;
    - Middle Creek WMA — 6,8 млн;
    - нулевой шифр — 74 потока;
    - выделения Medium (жирный, курсив, ссылки) — 126 тыс.;
    - GPS от структурных якорей — 1,19e8;
    - гео-коробка Китай/Тайвань — 702 тыс. checksum;
    - цифры из гиперссылок.
  - **Electrum 2.x × полное GPS-пространство на V0 и V16** (≈1,7e9 → ≈6,7 млн Electrum-валидных) — ЗАКРЫТО 14.10 10:20.
  - **BIP39 × полное GPS** — частично:
    - V16: 832 из 950 сдвигов (`s26_16.done`) + **219 из 467 единиц** (`s27_16.units`, уникальных строк 219, последнее изменение 14.10 ≈22:02 MSK);
    - V0: 583 из 862 сдвигов (`s26_0.done`).
- **Что осталось / следующий шаг**:
  - Остаток (`trith_remain.py`, 15.10 02:25):
    - V16 — 248 единиц, 4,97e8 all (≈3,1e7 checksum), ≈14,5–20,5 ч на 2 CPU;
    - V0 — 916 единиц / 279 сдвигов, 7,89e8 all, ≈23–32 ч.
  - Итого ≈1,29e9 all ≈ 37,5–53 ч CPU (на ПК Ильи с 16 ядрами — примерно в 8 раз быстрее).
  - Команды: `cd /workspace/work/trithemius && python3 s27_bip39.py 16 1000` (до 0 единиц), затем `python3 s27_bip39.py 0 1000`. Прогресс проверять так: `python3 /workspace/projects/b6983d3d-52f5-48f8-9974-b99dc8e31c55/work/trith_remain.py`.
  - Это массовый счёт (>10^6): по правилу Ильи 16.10 «идеи, а не переборы» допустим только как финальный счёт узкой идеи. Trithemius понижен до яруса 2–3, в свободный слот.
  - Дешёвые идеи из досье:
    - числительные eighteen / ten / four thousand как цифры метода (a) — <1e4 кандидатов;
    - добавить в оракул несжатый P2PKH и m/44'/0'/0'/0/2..19 для новых прогонов.
  - Если полный GPS-перебор даст 0 — вердикт «правило (b) не работает». Остаётся (a), без внешней информации нерешаемо: C(130,12) ≈ 1e17 на одну историю.
- **Оракул, скорость, файлы**:
  - `/workspace/work/trithemius/oracle.py` (checksum → PBKDF2 → BIP32 → P2PKH, 6 путей; самотест «abandon×11 about» → 1LqBGSKuX5yYUonjxT5qGfpUsXKYYWeabA).
  - `/workspace/work/trithemius/electrum_oracle.py` (тест «cycle rocket…» → 1NNkttn1YvVGdqBW4PR6zvc3Zx3H5owKRf).
  - Раннер `/workspace/work/trithemius/s27_bip39.py V TL`: единица = сдвиг × первое слово; прогресс в `s27_V.units`, закрытые сдвиги в `s26_V.done`; хит → `.secret/FOUND.txt` и печать «НАЙДЕНО».
  - Носители: `carrier3.py` (VARS3), `gps_engine.py`, `article.txt`, `snaps/`, `fresh/`.
  - Журналы: `/workspace/work/trithemius/NOTES.md` (сессии 1–60), `HYPOTHESES.md`.
  - Досье: `/workspace/projects/b6983d3d-52f5-48f8-9974-b99dc8e31c55/strategy/dossiers/trithemius.md`.
  - Скорость 6 760–9 520 all/с ≈ 430–600 адресных проверок/с на 2 CPU (общие).
  - Нужен `pip install -q coincurve` после перезапуска песочницы. Нельзя делать `pkill -f s27_bip39` из шелла — убивает сам шелл.
- **Проекты Hark и статус**:
  - 13.10: создан проект **de339428-d222-4341-95b9-15e8b475a28c** (Trithemius), задача 3034aaca каждые 20 мин до 13.11. Последнее сообщение в журнале — 14.10 21:50 (сессия 60, ≈254 из 467 по оценке сессии; по файлу 219 уникальных).
  - 14.10 22:05: остановлен общей отменой биткоин-загадок Ильёй (дневной лог: «Genesis/Arweave/пазлы остановлены»; точный статус задачи 3034aaca отдельно не записан).
  - 15.10 01:41: передан стратегу **b6983d3d-52f5-48f8-9974-b99dc8e31c55** (задача b0ef392a, сначала ярус 1, потом понижен до 2). С 15.10 s27 не запускался: фоновый слот занимал Genesis, потом действует запрет массовых переборов.
- **Оценка шансов**: ≈0,5% (досье 15.10; ранее 2–5%). Главный риск — ключ сделан методом (a) с номерами вне статьи. Тогда весь GPS-перебор бесполезен. diploux может решить раньше.

---

## 8.2 Smith, Lyle & Moore «Glimmer»

### A3. Smith, Lyle & Moore Hunt #2 «Glimmer» — 0,031777 BTC (3 177 700 сат)
- **Адрес**: `bc1q0akdjvrc2csau2n3gyxa3xcq0fss852x997m9y`. Это BTC, BIP39 из 12 слов + **passphrase** (25-е слово), BIP84 P2WPKH, путь `m/84'/0'/0'/0/0`. hash160 `7f6cd930785621de2a71410dd89b007a6103d146`, pubkey адреса `037e3109f564912f1007912d90f76c7aae43b812d6286d609a86140b746fbc7943`.
- **Account xpub (m/84'/0'/0')**: `xpub6CpNc58zqQvNGPHDGGTr68wgrmtfFDBWRuSDAxoDdrCE1iRAaZtyAD5T9uCJ3ELUYKCkx8Jkind2kwoR3Uxmg1ycQ6DWyGxZBMFvQqhNqVC`. Автор опубликовал его на сайте. Проверка: /0/1 того же аккаунта = `bc1q8cgqs3aljnj5fzg044v0lwh5cn8tul87wlvpwt`, адрес донатов группы.
- **Баланс**: 3 177 700 сат, трат нет. Проверки: blockstream 13.10 17:10, затем каждый цикл; последняя запись в glimmer/NOTES.md — 16.10 00:37 МСК, «intact».
- **Hunt #1** решён в 2021: `fortune all man kind one giant step into digital tomorrow virtual moon` + passphrase `supernova`. По нему проверен весь наш тулчейн.

**Источники**
- smithlylemoore.com (Wix). metaSiteId `13cab6fc-e004-4514-aab0-a7cf702047f9`, siteId `b8aa9fe0-61db-4696-8909-9dd877606aa4`, rev 4.
- r/smithlylemoore, ветки wojppy («Second Treasure Hunt Discussion») и ojmqzj. Читаем через arctic-shift.photon-reddit.com/api/comments/search?subreddit=smithlylemoore; pullpush из curl закрыт Cloudflare.
- github.com/floflo777/open-crypto-puzzles, раздел smith-lyle-moore-hunt-2-0-032btc (локальный клон /workspace/work/slm/ocp). Отстаёт от нас.
- github.com/benjacasas02/independent-cryptography-research/tree/main/research/glimmer (досье u/TapInteresting2374, снимок 02.09.2026). Копия в /workspace/work/glimmer/comm/tap/.
- Отчёт решателей от 26.08.2026 (pdfhost j8y6cN2WSx): /workspace/work/glimmer/findings.txt. Устарел: слова 6–9 и 11–12 в нём неверны.
- puzzles.agntn.dev: xpub и pubkey.

**Механизм.** Сайт — лабиринт из ~57 запароленных страниц Wix. Пароли регистрозависимы. Бутылки с посланиями дают слова seed с номерами. Финал /glimmer: «Once you have all 12 words… email them to us, for the final step». Кнопка на нём — mailto `codebreaker@smithlylemoore.com`, тема «I've Found Amphitrite, and All 12 Words». В Hunt #1 passphrase сообщали только после такого письма.

**Замки: открытые (46 из 57; pid / slug → пароль → что за ним)**
| pid /slug | пароль | что там |
|---|---|---|
| oq7la /latitude | `27756932` | цифры широты из EXIF Poseidon.jpg (27°7'56.93"N) + «2»; «longitude (numbers only)» |
| ml7yd /who-is-she | `73511573` | цифры долготы (73°5'11.57"W) + «3»; ТВ-комната → xtb6t |
| xtb6t /choose-your-direction | `amphitrite` | компас: north64/east64/south64/west64 |
| eetj4 north, x8cku atlantis, gyhal glow-in-the-dark, rtf05 octopus | `north64` | копии North → kx8wx |
| pbvye east, xrd91 birdpewp | `east64` | → e3zre |
| fv4pt south / g5jpk west | `south64` / `west64` | South → udr8x, vispv; West → wt1jy |
| e3zre /pirates | `albatross` | «welcome home party… Donner party at sea»; кнопки hhb0r и y6cd1 (fight) |
| hhb0r /talk-to-pirates | `semaphore` | картинка-семафор «PASSWORD YOU SHALL PASS 47» |
| sm18u /litter | `youshallpass47` | **бутылка: слова 1–5 `when you depart find mystery`** → qomxw |
| qomxw /night, wqcam /celine-dion | `witchoftheeast` | → giz6m, pxsqo |
| giz6m /isawthismovie3timesintheaters | `2hours40minutes` | → udr8x (смерть) |
| pxsqo /weallliveinayellowsubmarine | `20000leagues` | видео LifeFlashBeforeEyes.mp4 → c2ozw |
| c2ozw /take-a-big-breath (resurface) | `discoverglimmer` | **бутылка, подписи 5–8: `discover music need love`**; «password hint — where will you find her?» → h7j3h. Пароль — битовый узор монтажа (метод rational-Gain5010, Reddit pejgs65, 08.10) |
| h7j3h /a-rocky-beach (land) | `Atlas Mountains` | **«After I Love You… 10 fortune, 11 safe»**; «Sing her a song… password: closerandcloser» |
| gkfxt /glimmer (финал) | `closerandcloser` | текст о письме из 12 слов (mailto, см. выше); Glimmer.mp3, mountainbg720.mov |
| kx8wx /a-giant-whale-appears | `wavebreaker7109` | → gps16 |
| gps16 /speak-to-whales | `mobydick69420` | ролик James Nestor о кашалотах → mwfaz |
| mwfaz /whale-message | `glimmer` | бутылка `hunt gather whale blood` (приманка) → thmoi |
| thmoi /land-ho | `huntgathwhalblo` | → chtro, eqyel |
| chtro /hitch-a-ride / eqyel /swim-to-shore | `seahitchhiker` / `michaelphelps` | → d3zak / vbk6p |
| d3zak /reach-land | `sleighride` | тупик → ty78s /hell (`666`) |
| vbk6p /cape-cod | `vampire` | тизер следующего сингла |
| neyhh, shzgm, t2xjy, kvvu4, wdnv9 /name1–5 | `Gilligan` `Jonas` `Thurston` `Lovey` `Ginger` | цепочка «Острова Гиллигана» |
| b3vye /havingfunwiththeurl… (Name 6) | `Dr. Roy` | → jetkc |
| jetkc /hereonnnnngiligansissssssland | `Mary Ann` | остров: raft → zhgsm, fire → jcl9c, stay → udr8x |
| udr8x /death | `777` | тупик |
| vispv /awake | `electricfeel64` | → neyhh |
| wt1jy /message | `pirate bay` (нашёл Илья) | → a76va |
| a76va /ross-u (the library) | `shiphuntshalpar` | лайтбоксы zren* (FBI RAID «ffffffffff», Bitcoin QT, Apple Music); выход → ouxh2 |
| ouxh2 /escape | `escape` | → kx8wx (петля) |
| ruiat /the-passage → oanvz /the-vault | `FFFFFFFFFFF` → `4samcodeartist` | остатки Hunt #1; vault ссылается на удалённые dbqak, lw4kn |
| a4rhu /gateway → acwn5 /illstillbelovinyou | `codebreaker11` → `virtual moon` | остатки Hunt #1, к словам Hunt #2 не относятся |

**Замки: закрытые (11)**
- **zhgsm /raft-escape (RaftBuilt)**, «Escape via raft, made from palm tree wood». Пробовали весь BIP39 (часть ответов 429), канон Гиллигана, Cast Away/Wilson, Kon-Tiki, Heyerdahl, Huck Finn, Life of Pi, песни (Sloop John B, Piña Colada…), EXIF minnow.jpeg (22.6001,-73.41; дата 1964-09-26 = S1E1 «Two on a Raft»), эпизоды, каламбуры (palmpilot, macgyver, balsa, tiki…), все известные пароли. Всё 0. Возможно, это тупик.
- **jcl9c /smoke-signals (lightafire)**, «Light a Fire to Alert a Passing Ship». BIP39 2048 (0), песни (Light My Fire, Signal Fire, SOS), Smokey, Prometheus, тики-факел, Bat-Signal, Human Torch, Smaug, SOS/mayday, все известные пароли (включая Hunt #1). Всё 0. По SYNTHESIS — вероятный аналог шага огонь → vault из Hunt #1. Кандидаты `fffffffffff` (11 строчных f) и `01271967` в SYNTHESIS числились непроверенными; позже t21 прогнал все 43 известных пароля, но были ли среди них эти два, по файлам не видно.
- **y6cd1 /pirate-battle (fight)**, «I choose to fight». Пробовали brain_cands (571), оружие и Metallica, fight/yes/arrr, EXIF пиратского фото (25.9126,-44.1054, двоичное «nope lol»), все известные пароли. 0. BIP39-свип неполный (<100 слов).
- **sodpq /treasure-map-97328971321**: BIP39 2048 и общинные кандидаты — 0; по deepscan это остаток Hunt #1.
- **fibyo /vampire, tt6yc /vampireb**: общинные кандидаты — 0 (тизер сингла Vampire).
- **y756h /a, leklh /b, xjnxo /c, vy58x /d**: созданы 29.07.2022, в день релиза Glimmer. Финальные слова, supernova, 4samcodeartist — 0. Гипотеза: это страницы, которые открываются после письма.
- jbuh5 /my-account — служебная страница Wix. Публичные (без пароля): key-checker gv4d7 (рикролл), waiting / still-waiting, end-of-treasure-hunt, get-hints.

**Известные слова seed**
1 when · 2 you · 3 depart · 4 find · 5 mystery (/litter) · 6 discover · 7 music · 8 need · 9 love (/take-a-big-breath, подписи на странице **5–8**) · 10 fortune · 11 safe (/a-rocky-beach) · 12 **?**
- Порядок под вопросом. A: mystery на 5-м месте (основной). B: mystery на 9-м. Ещё два порядка: mystery 12-м, неизвестное слово на 5-м или 9-м месте (логи D/E). Номера 9 нет ни на одной странице.
- На Reddit пишут: aramor1 — «10 you will receive, but 9 and 12 no»; iuseredditlikeyou (16.09) — «two are missing and there are replacements».
- Слово 12 в порядке A: 128 вариантов с валидной контрольной суммой (список в /workspace/work/glimmer/glimmer_wallet.txt). В порядке A из песни проходят eagle, fly, now; в порядке B — climb, heart, sun, dust, behind, horn, leave, nothing.

**Проверено и отброшено (офлайн, оракул xpub)**
- Комментарий к таблице: все прогоны ниже — 0 совпадений.

| Seed / порядок | Passphrase | Объём |
|---|---|---|
| A и B, слово 12 перебрано целиком (125 / 128 вариантов) | 15 248 вариантов: кандидаты, лирика 1–4-граммами, регистры | закончено 16.10 ~20:15 |
| A и B × 128 | 1 168 паролей, slug и названий страниц | ~299 тыс. комбинаций |
| A и B × 128 | 299 band-фраз (участники группы, Dhani Harrison, Beatles) | — |
| D/E | 1 169 вариантов | закончено |
| D/E | 15 248, первая треть (5 122) | закончено; вторая треть (5 067) по логам не завершена |
| A × 128 | одно слово BIP39, годы 1900–2030, числа (4 247) | прервано по лимиту CPU, неполно |

- По досье Tap (seed с whale-словами и virtual moon): пустой passphrase, supernova, словарь в 358 тыс. слов. Для нашего seed тела это неприменимо.
- Медиа: все видео (Wix-транскоды, метаданные потеряны), разница двух версий Glimmer.mp3 (только шум кодека), EXIF, спектрограммы — подсказок нет. Обложка: base32 `UVHZ532IWIFZFN5FUY2K5RDX3I` → 16 байт `A54F9EEF48B20B92B7A5A634AEC477DA`, ни на что не подошло.
- Не повторять: пустой passphrase, supernova, словарные свипы, полный свип 15 248 × A/B.

**Что осталось / следующий шаг**
1. Слово 12 и passphrase. Гипотеза из NOTES: их присылает автор после письма из /glimmer, как было в Hunt #1. Черновик письма с 11 словами готов, но не отправлен: Илья сомневается, стоит ли слать 11 слов. Отправка только с его явного согласия.
2. Открыть zhgsm / jcl9c. Паттерн ветки: «знаменитость/вещь, выполняющая действие кнопки». Плюс зеркало Hunt #1: огонь → vault → gateway.
3. Ответ группы на просьбу о подсказке. Комментарий u/Serious-Bad8845 (Google mak777777uh) от 16.10 23:17: https://www.reddit.com/r/smithlylemoore/comments/wojppy/comment/ph62e5z/ — на 23:30 ответов 0. /get-hints требует публичного поста; r/smithlylemoore ограничивает новые посты.
4. Дожать: D/E × оставшиеся 2/3 набора 15 248; BIP-слово/год как passphrase с файлом прогресса.
- Запреты: решателям в ЛС не писать (Илья, 14.10 18:46 «забей ищи сам»). Не писать на smithlylemoore.codebreaker@proton.me (по Reddit — возможный скам).

**Оракул, скорость, файлы**
- Оракул паролей Wix: `POST https://site-pages.wix.com/_api/wix-public-html-info-webapp/resolve_protected_page_urls?siteRevision=4`, тело `{password,pageId,metaSiteId,siteId}`. 200 + URL JSON — верно, 403 — неверно, 429/прочее — лимит (повторить). Только последовательно, пауза 0,3–0,6 с (≈2 500 проверок/ч). Параллельные скрипты получают 429/WAF и ложные «мимо».
- Оракул seed (офлайн): /workspace/work/glimmer/w12check.py (сравнение account-pubkey `TPUB`), slotcheck.py (шаблон с «?»), fwr.py (резюмируемый свип, файлы progA/progB.txt), walletcheck.py (embit+coincurve в ./pylib, ~1,2 мс/адрес). Скорость ~15–16 с на слово × 15 248 passphrase (≈1 000 проверок/с на 2 ядрах). Фоновые задачи песочницы убиваются через 1 200 с — нужен резюм.
- Файлы /workspace/work/glimmer/: NOTES.md (главный журнал, 16.10), map.json (pid→пароль, без 4 последних), sitemap.json (slug→pid,title), edges.out, page_*.json, SYNTHESIS.md (правила автора, топ-кандидаты), COMMUNITY.md, DEEPSCAN.md, glimmer_wallet.txt (сводка для GPU), HIT_h7j3h.txt, t*.py (батчи для оракула), pp_*.txt / ppF_0* (списки passphrase), bip39.txt, comm/ (дамп Reddit, досье Tap), vid2/, audio_diff/.
- /workspace/work/slm/: NOTES.md (журнал 13–14.10), wix.py (check/fetch), map.py, g.py, guesslog.txt, pwmap.json, GRAPH.md, RULES.md, seedsearch.py, run1–15.py (ранние офлайн-свипы), ocp/.
- Разведка Reddit: /workspace/projects/1b07d678-80ae-425a-93d7-393c4a65d627/work/slm_public_intel_2026-10-16.md.

**Проекты Hark**
- db335b03 «Smith, Lyle & Moore: 0,0318 BTC» (13–14.10). Задача 9e23b25d отменена 14.10 22:08 при повороте «только заработок»; последняя активность 14.10 17:46.
- 1b07d678 «Priority Task Check». Активен 16.10 (status working, последняя активность 23:06): цикл каждые 10 мин, 40–80 новых ключей к zhgsm/jcl9c и проверка Reddit; ведёт /workspace/work/glimmer/NOTES.md.

**Оценка шансов.** До финала дошли (11 из 12 слов, все страницы на пути открыты). Слово 12 — 128 вариантов, при известном passphrase оно находится офлайн мгновенно. Упор — passphrase: по прецеденту Hunt #1 её почти наверняка выдаёт автор после письма. Без письма или ответа группы шанс низкий (координатор 14.10 оценивал ~3%). С ответом автора — высокий.

Файл: /workspace/projects/aa5ddde6-45de-46be-b0aa-6bd4db202e32/work/catalog_parts/g2.md

---

## 8.3 Path to Greatness и Arweave

## G3. Path to Greatness и Arweave Puzzles (#3, #10, #11, #12)

Сокращения путей: `$W` = `/workspace/projects/b6983d3d-52f5-48f8-9974-b99dc8e31c55/work` (проект Hark «работа»).
Времена в заметках PTG/Arweave записаны в зоне +04 (Саратов) или MSK — как в исходнике.
**Общий статус: 14.10.2026 22:00 Илья отменил все крипто-загадки, работа по PTG/Arweave остановлена.** Ниже — состояние на момент остановки.

### Path to Greatness — 3,02608794 LTC
- **Адрес/сеть**: `LUtL7qnm3gzxKjHcfVLSjydqhhinTVmTmS` (Litecoin). **Баланс**: 302 608 794 литоши, 8 входящих tx, 0 отправлено, мемпул пуст — последняя наша проверка 13.10.2026 16:30 +04 (litecoinspace/blockcypher; затем каталог отмечает ту же сумму на 14.10). Не тронут.
- **Выплата при решении**: свип сразу на LTC-адрес Ильи `ltc1qkekjqn9yl0h5quwy42p7zqjuz3t4dmfarx8wtq` (указал 12.10 18:15).
- **Источники**: сайт p2gtreasure.com (+ /old/p2g.html); OCP `github.com/floflo777/open-crypto-puzzles/tree/main/2-mid-prizes/path-to-greatness-treasure-hunt-3ltc` (README, analysis/leads.md, tested.md ≈5,7·10¹² негативов, tools/oracle.py); демо игры (Unity, Google Drive id `15B7i1EU7OUpc1SXYmSccRLDku4199cSB`, 134 МБ); YouTube-канал автора UCrwC8bYZ_Yyum9gj4OHVEiQ (3 видео: T98D6Otefgs анонс 05.02.2021, LxcJ3eqM2Rc «Soloville», EojQgdZeTyM «Seconds of Dream»); второй канал автора @jpatt194 (UCd31L914iVvaFMwEbN-7izQ, полный альбом Archaic Reveries lS7VW3az4Zs). Альбомы автора: «Seconds of Dream» (iTunes 1548289299, 13 треков) и «Archaic Reveries» (1398628401, 8 треков).
- **Механизм** (схема автора с computer_screen.jpg): 8 ответов (длины 16,15,8,12,20,16,24,17; пробелы убраны; lowercase, кроме chess) → 4 ключа AES-256-CBC, каждый шифрует 1 блок; super_key расшифровывает WIF.
  - Seg1 = imagine(16) + beach(16), IV `few_n_far_btween`
  - Seg2 = chess(12, регистр сохраняется) + wonders(20), IV `nocturnal_sugars`
  - Seg3 = wasd(8) + ship(24), IV `colors_on_leaves`
  - Seg4 = scramble(15) + sky(17), IV `seconds_of_dream`
  - Оракул: открытый текст блока должен кончаться паддингом (PKCS7 8×0x08 → ложные срабатывания 2⁻⁶⁴). 13.10 введён «relaxed padding» (`seg_rp`: любые 8 одинаковых байт или ANSI X.923), потому что PKCS7 нигде не доказан.
  - Аудит 15.10: MITM по половинам ключа невозможен (раунд-ключи K2..K14 смешивают обе половины) → замки вскрываются только трактовкой подсказок.
- **Подсказки и наши чтения**:
  - Clue 1 «Imagine» (пародия на Леннона + число 19410712): «the infamous way» = формат YYYYDDMM по примеру 19410712 (Пёрл-Харбор); ответ = (1941+N)0712, записанный дважды; N = число погибших (не установлено). Вариант «for→4 ⇒ 1945» — лишь догадка. Цифровые формы покрыты полностью (см. ниже).
  - Clue 6 «Beach» (аудио: «counting starts with a deer / pattern starts with the sun / note the first fifteen you hear»): 15 нот → 16 символов (лишний символ не объяснён). Мелодия с YouTube (A#5 F#5 B5 A#5 F#5 D#5 F5 C#5 B4 C#5 A#4 …) подтверждена независимо 13.10; в игре с t=0 звучит другая (D#5 F5 F#5 F5 D#5 A#4 B4 F#4 …); «Lost and Found» (Archaic Reveries) — D4 E4 F4 E4 D4 C4 D4 C4 A3 …; Soloville — ре-минорная, отдельно. Чтения «deer = do, sun = re (ре, а не соль)» → тоника G#, нота F — единственная хроматическая (даёт 16-й символ); также соль-правило, ступени от тоники, сольфеджио-буквы.
  - Clue 5 «Wonders» (пиктограммы + числа 12772 mi, 5210 km, 12061 mi): строки 4–8 стиха — цитаты чужих песен: Hávamál (Falkenbach), Nightwish «Ghost Love Score», Pink Floyd «High Hopes», Coheed and Cambria «Three Evils», Alestorm «Treasure Island»; L2 ≈ Vintersorg. Пиктограммы ↔ эти песни (призрак с сердцем = GLS, три демона = Three Evils, рогатый шлем = Hávamál, якорь = Alestorm, star?star = Vintersorg «Astral & Arcane»). Ряды: GLS ▼ HighHopes ▶ 12772; Alestorm ▲ ThreeEvils ◀ 5210; Hávamál ▲ Astral&Arcane ▶ 12061. Операция, связывающая пару песен с числом, не найдена. Литерал «12772mi5210km12061mi» ровно 20 символов — проверен, 0.
  - Clue 4 «Chess» (стих «From the front lines to the throne», «A period of madness / From a symbol that's flown»): позиция сконструирована (не мат в 2 — поправка 13.10; нет мата ≤4 по Stockfish 17; источник в базе lichess не найден). На доске следы монтажа: вклеенная область A {b8–h8, c7–h7, c6–h6} (Re8 c7 f7 d6 Nf6 g6) и метки в углах c3 (пешка) и c2 (король) — «от передовой до трона». Лучшее чтение белых: Ng5Bd4Qb3Kc2.
  - Clue 3 «WASD» (сетка стрелок с числами): один цикл из 92 клеток + ровно 4 «хвоста» без предшественника — (r1,c2) 5→, (r4,c9) 2↑, (r8,c10) 4←, (r9,c1) 1↓ (четыре разных направления) + 4 изолированные звезды 1–4; ни одна стрелка не ведёт на звезду или за край (≈2 % случайно → задумано). Ни одна механика не даёт однозначной 8-клавишной строки. Топ-кандидаты: `$W/ptg/s21g/TOPLEFT.txt` (7s1a9d4w, 2w1s5d4a, 5d2w4a1s, d3w1as24, 53214124, 64283188, g5c9d2i9).
  - Clue 7 «Ship» (Ship.png): **установлено** — это отредактированное фото Wikimedia «RMS Titanic 3.jpg» (ревизия 11.12.2018); три правки: стих, водяной знак в небе **«clue 8 in sand»**, имя на носу заменено на **SIMOISIAYSC** = инициалы реплики Эндрюса из фильма 1997: «**S**he **i**s **m**ade **o**f **i**ron, **s**ir! **I** **a**ssure **y**ou, **s**he **c**an». Красный LSB: монтаж Исмей (Джонатан Хайд) слева, Эндрюс (Виктор Гарбер) справа + чертёж носа с надписями палуб. Ship (24) привязан к этой сцене, но конкретная строка не найдена.
  - Clue 8 «Sky» (панель-пример, 13 клеток `ehk-bqNEFRUn`… ↔ 13 треков SoD; правило «4 → Exit Light → T», «8 → Ghost March → R»: число = индекс буквы в названии трека). Песок Beach.png несёт пиксельный текст 3×5: **`G0dcbA-A`** (8) и **`80f9Fk-FC`** (9) → 8+9 = 17 = длина sky; слева рамка 10×10 с подписями углов 00/90/09/99, нарисованная как 4 уголка без середины.
  - Clue 2 «Scramble» (41-буквенное предложение, правило «capital: addition, lower: subtract»): строка S делится ровно на 15 токенов вида [строчные/тире][Заглавная] — по одному на символ scramble; значения токенов (−22,16,5,6,4,4,−5,−40,15,−8,−4,−31,−23,−12,2) в английский текст не переводятся.
- **Что установлено/решено** (ни один замок не вскрыт):
  - Файлы подсказок финальные и уникальные (все снимки Wayback 2022–2026 = SHA1 наших файлов; аудит данных 13.10). В демо нет QR/beach/ship-текстур; Beach/Ship с Drive байт-в-байт равны файлам сайта. Твит автора 16.05.2021: «All the clues are now posted… no need to download the demo».
  - Лексика clue 5 = цитаты песен; bow = акроним реплики Эндрюса; «clue 8 in sand» → текст на песке; рамка-уголки на песке.
  - Позиционная SoD-расшифровка примера clue 8 (вперёд, регистр игнорируется) даёт `notth##io###a` (5 клеток вне длины названия), null-тест p≈0,003–0,008 — **умеренный сигнал**, но противоречит печатному примеру 2.
  - Холодные пересборки A/B (13.10, вслепую) вывели ту же структуру — якорения на ложной схеме не обнаружено.
- **Проверено и отброшено** (ориентировочно наш вклад >5·10¹⁰ ключей сверх ~5,7·10¹² OCP, всё = 0; свидетели-witness перепроверялись перед прогонами):
  - Lock 1: imagine = все 8-цифровые блоки дважды (d8x2, 1e8) × сотни/тысячи форм beach (YouTube, игровая, onset-15, G#-re, сольфеджио, октавные метки, вставка любого из 94 символов) → 0 (сессии 2–18, ~4·10¹⁰); imagine = любой год 1941–9999 + 0712 во всех порядках × 3 623 формы beach → 0; даты прописью / с разделителями / «каждый символ дважды» / зеркало → 0; «Lost and Found» 16-нотные формы × 1 685 403 форм imagine + 15 нот с любым вставленным символом × все imagine = 1,25·10¹⁰ → 0 (13.10 16:40). Вывод: lock 1 блокирует запись beach (15→16), а не imagine.
  - Lock 2: шахматные чтения × песенные/числовые токены wonders (14,9M), литерал wonders, широкие 20-символьные формы wonders 137k × 7 285 шахматных = 10⁹ → 0; таблица Менделеева, география 26 «чудес» → 0. «Мат в 2» — ошибка (1.Qxb6+ cxb6).
  - Lock 3: ship = btscssimoisiayscaswiiamc, simoisiaysc+thomasandrews, jonathanhydevictorgarber, ismaybutthisshipcantsink, nearermygodtothee+bethany/horbury, sheltersaloonuppermiddle, songedautomne… — каждая × ВСЕ {0-9wasd}⁸ (1,48·10⁹) → 0; 9 617 ship-кандидатов (`$W/ptg/s20l3/ship_UX.txt`) × {w,a,s,d}⁸, {W,A,S,D}⁸, {^<v>}⁸ и структурные left → 0. Вывод аналитиков: блокер, вероятно, сетка WASD.
  - Lock 4: «not the middle» как истина отброшен (null-тест: свободный 5-титульный шифр даёт английский почти из любой строки); scramble-семейства × sky (песок, шаблоны) — сотни миллионов, scrS × skyBig 1,39·10⁹ → 0.
  - Порядок половин/перестановка CT/IV (kord/, 1,74·10⁹ ключей, 6 IV) → 0. Аудио/стего в Beach.png (биты, сигнатуры) → пусто. Публичных решений/обсуждений сверх OCP, agntn и r/ARG нет.
- **Что осталось / следующий шаг** (только инсайт, без массового перебора — указание Ильи 13.10 09:39: прогоны <10⁹ и под конкретное чтение):
  1. Lock 1: правило записи 15 нот → 16 символов (или иной источник мелодии).
  2. Lock 2: операция «пара песен → число» в wonders (длительности/номера/даты точных версий; ▲▼ как чарты).
  3. Lock 3: механика сетки WASD → 8 клавиш; ship — производная строка из сцены Исмей/Эндрюс.
  4. Lock 4: правило overflow для 5 клеток примера clue 8, затем применить к 17 клеткам песка; правило clue 2 → 15 символов.
  - Не перезапущены после рестартов: полосы `s19l3` (isamathematicalcertainty, jbruceismaythomasandrews × {0-9wasd}⁸) и `s21g/runpa.sh` — результатов нет.
- **Оракул, скорость, файлы/скрипты**:
  - `$W/ptg/seg.c` / `$W/ptg/seg` (AES ARMv8, ~3,2·10⁶ ключей/с/ядро; режимы file:, d8x2, sep8x2, cs:); relaxed-padding: `$W/ptg/s15/seg_rp`, `pat_rp`, `ins_rp`; многоCT/IV: `$W/ptg/kord/segk.c`. Полная цепочка: `PYTHONPATH=pylib python3 $W/ptg/p/tools/oracle.py --answers …` (selftest OK). Сборка через zig (`$W/ptg/pylib`), gcc в песочнице нет.
  - Заметки: `$W/ptg/NOTES.md` (104 КБ, по сессиям), `$W/ptg/INSIGHTS.md` (84 КБ, по замкам), `$W/ptg/audit/DATA_AUDIT.md`, `$W/ptg/cold/A_readings.md`, `B_readings.md`.
  - Данные: аудио `$W/ptg/audio/game/album_from_demo.ogg`, `$W/ptg/audio/yt/*.mp3` (soloville, secondsofdream, archaic_reveries, lostandfound); текстуры без потерь `$W/ptg/demo/tex/*.png`; OCP-копия `$W/ptg/p/`.
- **Проекты Hark и статус**: работа велась в проекте «работа» (`b6983d3d…`), сессии 1–22 с 12.10 по 13.10. Задачи: ежечасная `48f4c59c-e1ff-40ee-931c-bca6282035a7` (13.10 15:50 переведена на 1 сессию/день в 14:00 MSK до 19.10) и ежедневная `85082f68-1d68-42f2-bd6f-06584d1a1c5f`; 14.10 22:00 все загадки отменены — актуальный статус задач по файлам не подтверждён (вероятно, остановлены). Ключ не найден, ничего не свипалось.
- **Оценка шансов**: 2–4 % (аудит 15.10, ярус 3). Сильная сторона — быстрый точный оракул; слабая — все 4 замка закрыты, решающий шаг — трактовка, а не вычисление.

### Arweave Puzzles (автор Tiamat, @arweavep) — #3, #10, #11, #12
Общее: механизм #3/#10/#12 = SHA512^11513(ответ) hex → CryptoJS EvpKDF (1e4 итераций, 32 слова) → Rijndael Nk=32/Nr=38 CBC → Arweave JWK; сертифицирован на решённом #8 («RasputinWilhelmAlekhine»). Наш чекер `$W/arweave/fastcheck.py {3|10}` — расшифровка первого блока, при префиксе `{"` полный оракул; ~20 канд/с/ядро при свободном CPU (KDF дорогой; реально 7–20). Ложные `{"` ≈1/65k (встречались, полный оракул отсекал). Хиты пишутся в `$W/arweave/hits.private` (600, не открывать в отчётах). Источник общины: https://github.com/HomelessPhD/AR_Puzzles (README PZL3/PZL10, issues #5–#12 — авторских подсказок нет). Свип-конвейер готов, не использован: `$W/arweave/sweep/sweep.js`, `autosweep.py`, `p10/autosweep10.py`. Работа в проекте «работа», остановлена 14.10 22:00.

#### #3 — 1000,165838 AR
- **Адрес**: `wHP6OPG5GMF5dedo_CD8AAy6x8La-gfI5b5pk65Tx_0`. **Баланс**: 1 000 165 838 006 237 winston, last_tx пуст — наша проверка 13.10.2026 06:49 UTC. Опубликован 27.05.2019 (изначально 750 AR, позже доливка).
- **Источники**: OCP `2-mid-prizes/arweave-puzzle-3-1000ar`; страница arweave.net/VLJIGuTJ… (32 поля по 1 символу = 8×4); Discord-экспорт/Medium/tiamat в `$W/arweave/src/`; ответы автора в треде твита 1132936723162378240 (архив 2022).
- **Механизм**: 8 ребусов по 4 символа, склейка, lowercase (пустые клетки допустимы).
- **Подсказки и чтения**: 1 кривые буквы A N/H I D → anno / 1984 (плакат Big Brother, порт Arweave 1984) / aihd — слабо; 2 ромб «21863» → md12 / md5 / pool — не решён; 3 кирка + «SH», автор: «with N.1.7.0.0 release, third pic became obsolete» (SHA-384→RandomX) → **a384** (сильно); 4 перевёрнутый треугольник с гранёным камнем = **логотип SILO** (баннер Medium 21.02.2019) → **silo** (сильно; автор «подогнал ответ под очевидную догадку arweave-india»); 5 карта Скандинавии → e4d5 / loki; 6 дерево → root/tree (цитата «type TREE» может относиться к #5 → tree не исключать); 7 кактус + бумеранг + камень → pull / **arid** (ArweaveID); 8 точки, «Did anybody count the dots?» → 57–58 → **base** (Base58). Автор: «7 картинок легко тому, кто следил 6 месяцев, для 1 нужна удача».
- **Проверено и отброшено**: H5 (консенсус anno md12 a384 cash e4d5 root pull base + все 1–2-слотовые замены) 11 973; H6 (silo+arid) 4 808; H7 5 544; H8 (a384/silo/base фикс., продукт слотов 5×6×7 × 25×25 слов слотов 1–2) 77 256; H9–H11 (1984/aihd, md5, короткие слова) 20 968 → **всего ≈121 тыс. уникальных, 0 совпадений** (12–13.10). OCP: 1 679 616 и ~3,3·10⁸ (без свидетелей) — 0. H9 чанки 07–10 (~8 тыс.) не завершены (VM-рестарт).
- **Осталось**: ≥1–2 опорных слота прочитаны неверно; нужны новые прочтения по источникам 12.2018–05.2019 (логотипы Chronobot, Weavemail, ArweaveID, Quorweave), «tree» в слоте 6, семейство Big Brother в слоте 1, слот 2.
- **Файлы**: `$W/arweave/gen3_h5.py`…`gen3_h11.py`, `$W/arweave/runs/` (списки и выводы, `tested_h5_h8.txt`), `$W/arweave/NOTES.md`.
- **Шансы**: 2–3 % (аудит 15.10, ярус 3; брать только с новой идеей прочтения).

#### #10 — 500,022 AR
- **Адрес**: `bkjJGw3NLxs8OAyRxgTL-QFpiB3lBJqZ76kDhWdB-Rs`. **Баланс**: 500 022 254 930 000 winston, last_tx пуст — 13.10.2026 10:25 MSK. Опубликован 14.04.2020 (arweave.net/1fLPMP_smP6ipdIYbYUAZtFPwO4crdYr4kMVf5uTivg).
- **Механизм**: свободный текст, регистр важен, длина неизвестна.
- **Подсказки и чтения**: кости (2,1,4 / 2,4) → Einstein/«Dice»/214; «6 3 18» вокруг кольца → 03.06.2018 (ICO); логотип «a» поверх силуэта Палпатина → Palpatine/Sidious/Order66; «[0-19]» → COVID-19 / срез / высота блока; ключ с биркой «…nesis #28» → Genesis 28 (Иаков/Вефиль/лестница) или генезис-блок Arweave. Единственная авторская подсказка: «1,2,4,8 = solved / 3,5,7,9 = not solved yet».
- **Проверено и отброшено**: генезис-блок Arweave (genesis_wallets.csv 507 строк, 314 tx блока 0, индексы 27/28, срезы) 72 → 0; имена в стиле #8 (Einstein/Palpatine/Covid19/Jacob/2018 во всех порядках, 4-/3-слотовые) 28 960 → 0 (13.10); OCP ~8 010 190 → 0.
- **Осталось**: нужен новый ограничитель (подсказка автора) или иное прочтение механики; слепые продукты токенов бесполезны.
- **Файлы**: `$W/arweave/p10/` (gen10_names.py, h10n.txt, h10w.txt, fastcheck1.py, genesis_wallets.csv).
- **Шансы**: <1 % — «не брать» (аудит 15.10).

#### #11 — 1 ETH
- **Адрес**: `0xFF2142E98E09b5344994F9bEB9C56C95506B9F17` (Ethereum). **Баланс**: 1,0 ETH, 0 исходящих — проверка OCP 16.08.2026; **нашей проверки нет**.
- **Механизм**: один PNG-скетч гавани (1600×1105, grayscale+alpha), подсказка «MEW: Access by Private Key» → сырой 64-hex приватный ключ спрятан в картинке; адрес в метаданных — подтверждённая приманка. Сертифицированного оракула нет (только деривация адреса).
- **Проверено** (OCP): ~1000 геометрических/метаданных кодировок (12 зданий, 1 большой парус, 5 малых), 7 168 битстримов, 79 863 окна, баркоды (PR #21) → 0. Мы сами ничего не проверяли (ПК-агент 14.10 только прочитал README).
- **Осталось**: полный zsteg-скан всех плоскостей (минуты CPU). **Шансы**: 1–2 %, ярус 3 / «не брать».

#### #12 — 400,00248121 AR — **ПОПРАВКА: приз, по нашим данным, забран**
- **Адрес**: `XRGEfkMbCMHeTY9mZI9Lh6hf8EmA8RstmBFUjDm40fg`. Каталог (7.2) пишет «открыто, проверено 16.08.2026» по OCP; но наш скан 12.10.2026 показал **0 AR** («appears swept», work/zero-spend-earning-scan-2026-10-12.md), а лог ПК-агента Ильи 14.10 фиксирует вывод средств tx `gx0Ws1TP…` (эскроу = 0). Строку каталога надо перевести в «решён/забран», перепроверить на viewblock перед любым действием.
- **Механизм (для истории)**: пазл из 4 кусков (флаги, кит + дата 16-03-2020, фигуры с цифрами, 5 штрихованных букв) → один ответ 58 символов с учётом регистра, тот же пайплайн. Кусок 3 решён (2111011 → HEXAGON), кусок 1 — сильное неподтверждённое чтение, кусок 2 (18 символов) открыт; OCP ~157 тыс. кандидатов = 0. ПК-агент Ильи написал сертифицированный решатель (C+OpenCL), работа брошена из-за нулевого баланса.
- **Шансы**: 0 (приза нет).

Файл: `/workspace/projects/aa5ddde6-45de-46be-b0aa-6bd4db202e32/work/catalog_parts/g3.md`

---

## 8.4 BLM, Quizchain, RushWallet #30, Riddle 8.5, Нуаза

## Группа 4: BLM, Quizchain RBB, RushWallet #30, Riddle 8.5 BTC, Нуаза

Составлено 16.10.2026 ~23:20 MSK только по файлам workspace. В сеть не ходили, новых прогонов не было. Seed-фраз, WIF и содержимого `.secret/` здесь нет: папки `.secret/` не открывались.
Время: в NOTES.md и журналах — MSK, если не сказано иное. Журналы `.hark/journal/*.jsonl` пишутся в UTC. mtime файлов в песочнице — тоже UTC.
Последние балансы:
- 14.10 22:05 MSK, mempool.space, сырой вывод `/workspace/work/pc_handoff/bal_2026-10-14.txt`, скрипт `/workspace/work/pc_handoff/bal.py`;
- для BLM, Quizchain и RushWallet ещё 15.10 01:45 MSK: аудит `/workspace/projects/b6983d3d-52f5-48f8-9974-b99dc8e31c55/work/puzzle_solvability_audit_2026-10-15.md`, «все 7 призов на месте».

---

### BLM «Brave New World» — 0,20107284 BTC
- **Адрес/сеть/путь**: BTC mainnet, `1KfZGvwZxsvSmemoCmEV75uqcNzYBHjkHZ` (P2PKH). Формат не установлен: BIP39 или old-Electrum v1. Наш стандарт проверки: пути m/44'/0'/0'/0/0, m/0/0, m/0'/0/0, m/49', m/84' (последние две — по hash160 как P2PKH), сжатый и несжатый ключ.
- **Баланс**: 20 107 284 сат, 5 входящих tx, трат 0. Проверено 14.10 22:05 MSK (bal_2026-10-14.txt). 15.10 01:45 MSK приз на месте (аудит).
- **Источники**:
  - Автор u/stsh_n, Reddit, 08.10.2020, «Bitcoin puzzle (2000$)», одна картинка: https://www.reddit.com/user/stsh_n/comments/j79zvj/bitcoin_puzzle_2000/
  - Репо сообщества: https://github.com/jmr2704/bitcoin-0.2-image-puzzle (копия `/workspace/work/blm/repo_README.md`).
  - OCP: https://github.com/floflo777/open-crypto-puzzles/tree/main/1-big-prizes/blm-brave-new-world-0-2btc (копия `/workspace/work/blm/ocp/`: README, analysis/tested.md, leads.md, clues/*.png, tools/oracle.py).
  - bitcointalk: https://bitcointalk.org/index.php?topic=5404767.0 — обсуждение сообщества, не материал автора.
  - Ещё в каталоге: HomelessPhD/BLM_0.2BTC, rarsn4/blm-0.2btc-analysis, Dileep-Kumar-5/blm-puzzle-analysis, grokipedia. В наших файлах их нет и мы их не открывали.
- **Механизм**: README сообщества: «You will need to guess the: Words to use. Correct order of the words. Correct length.» Сообщество записывает слова как «число → BIP39[число−1]». ПК-агент Ильи сверил все 43 пары README: 43/43 (`HANDOVER_ilya_2026-10-14.md`, §2.1). Оговорка: числа вычислило само сообщество, это не канал извлечения слов из картинки.
- **Изображение**: 1600×1200, это максимум, другого разрешения нет (OCP). Стего, EXIF, LSB, альфа-канал чистые. Ончейн-данных в funding-tx нет: нет ни OP_RETURN, ни данных в witness (HANDOVER §3).
- **Подсказки и наши чтения**:
  - Руны решены сообществом, заново не транскрибировать:
    - правая колонка: «ЗДЕСЬ ЗАШИФРОВАНЫ БИТКОИНЫ НА ЧЁРНЫЙ ДЕНЬ НОМЕР Х»;
    - ещё две строки: «Я надеюсь что сюда будут присылать много биткоинов» и «Сумма двух чисел»;
    - над Трампом: TUESDAY (шифр Bill Cipher / Gravity Falls) = 03.11.2020, день выборов.
    - Наш сквозной декод 14.10 (сессия 1) строгой подстановки не дал. Вероятная причина — путаница похожих глифов.
  - Часы читаются глазом. Мы смотрели 14.10 13:29 на `/workspace/work/blm/dial2x.png` (кроп 265,729–685,1140 ×2). Циферблат зеркальный и повёрнут примерно на −73° (OCP):
    - красная стрелка MOON между 12 и 1 → 13;
    - длинная стрелка TOWER между 1 и 2 → 3;
    - короткая часовая между 10 и 11 → 21.
    - OCP независимо намерил 0,54 и 1,48 ч.
    - Наш вывод: длина ≥21, вероятнее 24.
    - ПК-агент Ильи эти позиции измерить не смог и считает их гипотезой сообщества (HANDOVER §2.2).
  - Каркас позиций (таблица сообщества + правило «сумма двух чисел»):

    | Позиция | Слово |
    |---|---|
    | 1 | subject |
    | 2 | camera или twin |
    | 3 | tower |
    | 4 | mask |
    | 5 | police |
    | 6 | ? |
    | 7 | liberty |
    | 8 | ? |
    | 9 | eye (4+5) |
    | 10 | black («номер X») |
    | 11 | pyramid (5+6) |
    | 12 | vote или debate |
    | 13 | moon |
    | 14, 15 | ? |
    | 16 | rifle |
    | 17 | gold |
    | 18 | ? |
    | 19 | glove (CVD19) |
    | 20 | apple или second (XX) |
    | 21 | часовая стрелка, слово неизвестно |
    | 22–23 | ? |
    | 24 | checksum |

  - Пул-15 для пустых слотов: welcome brave world peace end one more real order proof first food time stock power.
  - Не разобрано:
    - строка рун под циферблатом (3 слова через «:»);
    - зеркальные латинские девизы на печати: …NOSCERE…, FIAT JUSTITIA ET PEREAT MUNDUS, …UBI PATRIA;
    - опечатки микротекста whitepaper: wich, proot, introdue, participans, doudle, sing, abcense, arrrived.
  - Конфликт словарей: police, one, seed, phrase и this есть в BIP39, но их нет в old-Electrum (HANDOVER §4.3). Breathe и fist указывают на Electrum (OCP README).
- **Что установлено/решено**: руны, TUESDAY, три позиции часов (сильная поддержка), механизм «число → BIP39». Глифы в левом верхнем углу — псевдоалфавит нейросети (подпись «ChatGPT»). «Часы с годами» — график смертности COVID. Полосы по краям — повёрнутый адрес. «1713 в слове COVID» при ×16 не подтверждено (HANDOVER §3).
- **Проверено и отброшено** (всё 0 совпадений):
  - OCP: ~7,2·10⁹ BIP39-последовательностей, все 12-из-13 и все порядки пула `moon tower real black subject time first food this proof order receive mask`, GPU, m/44'/0'/0'/0/0. Плюс ~3·10⁷ old-Electrum v1, ~1,6·10⁶ «якорных» BIP39. Electrum v2 и широкий набор путей (~47 путей) проверены только на 5 топ-последовательностях. Три прогона btcrecover (4,99·10⁸, 2,74·10⁸, 8,8·10⁵) — результат «not recorded», это не «0» (`ocp/analysis/tested.md`). Якоря tower/subject/time/real отозваны: у их источников нет постов о пазле.
  - Сообщество, со слов самих раннеров, OCP не воспроизводил: ArmaCorex 3,772·10¹¹, ac00300 4,79·10⁸, demesmaeker 6×12!. Цифры каталога «278+ / 191+ млрд (rarsn4)» в наших файлах не подтверждены.
  - ПК Ильи: наборы A и B, все подмножества и порядки, 0. 12 слов old-Electrum в порядке чтения: 2 275 мнемоник, 0. sweep24: 12 разных слов из пула-17, все порядки, только сжатый ключ, m/44'/0'/0'/0/0, ~192 тыс./с, ~12 суток. Итог в наших файлах не записан.
  - Наши прогоны 14.10, `/workspace/work/blm/NOTES.md` и `tools/*.prog`:
    - каркас как 12 слов (позиции 1–12, слоты 6 и 8 — все 2048): 785 299 checksum-валидных фраз × 5 путей × comp/uncomp, 0;
    - H1, 18 слов (позиции 1–5, 7, 9–13, 16, 17; слоты 6, 8, 14, 15 из пула-15; 18-е по checksum): 1 620 000, DONE, 0;
    - H2, 21 слово: куски h2_00_welcome, h2_01_brave и h2_02_world по 1 620 000, все DONE (`h2_02_world.json.prog` = «1620000 DONE», mtime 14.10 19:18 UTC = 22:18 MSK), 0. В PUZZLES_HANDOFF.md кусок h2_02 записан как «на 720 000» — это устарело;
    - H11 («WELCOME TO THE» = 12 строк whitepaper, по слову из строки по порядку): 256 наборов → 22 валидных, 0.
- **Что осталось / следующий шаг**:
  1. H2: куски `h2_03_peace` … `h2_14_power` (12 × ~1,62·10⁶). Прогресса по ним нет: файлов `.prog` не существует.
  2. H4: варианты camera↔twin, vote↔debate, apple↔second (×8).
  3. H6: black на 20, second на 10.
  4. H3: 24 слова, слоты 6, 8, 14, 15, 18, 21–23 из пула-15, 24-е по checksum, ≈2·10¹⁰. Только GPU (~29 ч на 3070).
  5. H5: BIP39-passphrase TUESDAY, BLM, 10:07, CVD19, 05.25.20.
  6. H8–H10: опечатки, цветные слова, строка рун под циферблатом.
  7. Перезапустить три btcrecover-прогона OCP, у которых не записан результат. OCP называет это своей «fastest open lead».
  8. Узнать у Ильи итог sweep24.
- **Оракул, скорость, файлы/скрипты**:
  - Оракулы:
    - `/workspace/work/blm/ocp/tools/oracle.py --selftest` / `--stdin`: ~1,7 тыс. BIP39/с на ядро, ~280/с Electrum v1;
    - `/workspace/work/blm/tools/fastcheck.py` (слоты в JSON: слово, список или «*»; checksum-отсев; ~1 мс на фразу на ядро, ~770 деривизаций/с с 5 путями).
  - Раннеры:
    - `/workspace/work/blm/tools/run.py <slots.json>`: возобновляемый, прогресс в `.prog`, сам останавливается через ~1050 с, сам доставляет pip-пакеты;
    - `fc18.py`, `h11.py`, `h18.json`, `h2_NN_*.json`.
  - Материалы: `/workspace/work/blm/dial2x.png`, `crops/`, `runes/`, `HANDOVER_ilya_2026-10-14.md` (= `/workspace/projects/233a2ae6-8f6b-4fb0-9137-902718c1a34f/files/uploads/HANDOVER.md`).
  - `FOR_OPENCODE.md` — канал Hark → OpenCode. Ответного `FROM_OPENCODE.md` нет.
- **Проекты Hark и статус**: проект 233a2ae6-8f6b-4fb0-9137-902718c1a34f. Задача сессий 1a204712-2611-475e-8401-e1ecf34f9510 (каждые 20 мин). Последняя запись журнала проекта — 14.10 ~22:40 MSK. Аудит 15.10 01:45: ярус 3, заморожено. H2 держать фоном, только если это бесплатно по токенам; новых гипотез не плодить. Илья 14.10 14:27: «тупик не надо, нужны гипотезы».
- **Оценка шансов**: наша 14.10 13:00 — 1–3%, 13:31 — 3–5%. Аудит 15.10 — ≤1%. Каждая гипотеза 10⁶–10⁷ без сигнала, это лотерея. Решает правило порядка или пула, а не железо.

---

### Quizchain Real Big Block (Aoi Nakamoto) — 0,777 BTC
- **Адрес/сеть/путь**: BTC mainnet, `14zMkTgaVXJcxdh4JdWi29MLRR44iUSG9W` (P2PKH). Цепочка: текст (UTF-8) → MD5 (16 байт энтропии) → BIP39, 12 слов без пароля → m/44'/0'/0'/0/i (i = 0…5). Подсказка «7-й ключ… но первый тоже» указывает на индекс 0.
  - Старый адрес до перехеширования: `1EFojcAo2vbhRGCGCa7q8Wwvzss28mhQYC` (пуст). Он нужен как второй оракул для «старой» версии текста (один перенос между абзацами).
- **Баланс**: 77 700 000 сат, 1 tx, трат 0. Проверено 14.10 22:05 MSK (bal_2026-10-14.txt). 15.10 01:45 MSK приз на месте.
- **Источники**:
  - Глава Wattpad https://www.wattpad.com/720888559-second (история 184148284 «Second», описание «Hint for block 77»). Сохранены `second_api.html` (apiv2/storytext?id=720888559), `second_plain.txt` и все 34 части в `parts/`.
  - r/Grycoin и r/bitcoinpuzzles через Arctic Shift: `aoi_posts_all.json`, `*_comments.json`, `pp_comments.json` (70 комментариев puzzleponky).
  - OCP `1-big-prizes/aoi-nakamoto-quizchain-0-854btc` (tested.md, ~3,2·10⁸ негативов).
  - agntn real-big-block, grycoin/2; benevolentcyka/puzzle (README: unsolved, 26.09.2026); gist David-glitc (план GPU).
- **Механизм**: подтверждён самотестом `tools/engine.py selftest` на векторе автора и Stage One. Инструмент автора умеет и SHA-256 → 24 слова (QC1-4/10), переключатель сбрасывается на MD5.
- **Подсказки и наши чтения** (r/Grycoin, 2019):
  - 24.07: «Final version of the second chapter».
  - 25.07: лишние переносы на Wattpad «нужны для решения».
  - 28.07: «один перенос (13 10)» — это для старого адреса.
  - 30.07: «формат первой стадии — большая подсказка к формату второй»; перехешировала, «убрала один из твистов», теперь «Enter дважды» = 13 10 13 10.
  - Позже, часть 762380140 «Starting Up»: автор «потеряла всю информацию о решении» («tragic boating accident variation»).
  - Аномалии главы: «ppM», «VIrgin», «BItcoin», «can't change the past'".». 10 абзацев с `<br>` (62, 120, 159 — посреди предложения). Глава из 273 `<p>`, modifyDate 24.07.2019 02:12 MSK, то есть до финансирования 30.07. `data-p-id` = MD5 абзаца.
- **Что установлено/решено**:
  - Нормализация воспроизведена до адреса funding-tx на 8 решённых блоках и Stage One: QC1-4, QC1-10, QC1-15, QC1-29, QC2-29, QC2-50, QC2-62, QC2-63, а также Grycoin-1 (`tools/qc1lib.py`).
  - Автор всегда хешировала с LF, хотя писала «13 10». Её «ошибки» механические: хвостовой LF из редактора.
  - QC1-29 = 17 строк через `\n` + «vOIce» + « » + последние 3 символа WIF прошлого блока.
  - Правило Stage One: в посте Финни (16 абзацев) абзацы, чья первая буква не из {I, T, A, S, M}, флипаются (первая буква → строчная, последняя → заглавная), склейка `\n\n`.
  - База Grycoin-2 (`\n\n`, MD5 7759227…) совпала с хешем автора. Флип-правило Grycoin-2 (адрес 1tzieU…, префикс MD5 3c6, pubkey 039ad91b…) НЕ воспроизведено — это и есть ключевой нерешённый узел.
  - Блок 76 свипнул читатель 17.08.2026, его формат публично не раскрыт.
  - Чужих частичных решений RBB нет.
- **Проверено и отброшено** (0; таблица в `/workspace/work/quizchain/NOTES.md`):
  - на RBB, оба адреса:
    - H1 `<br>`-артефакты: 250 776;
    - H2 знаки/формат QC1-77 «TOMI Omit TOMI»: 136 290;
    - H5 типографика: 528;
    - H4/H11 флип по предложениям и строкам: 278 560;
    - H9 все 2^15 правок опечаток: 524 288;
    - H8 альтернативные деривации (15 паролей, прямой BIP32-seed, 23 префикса путей, дети 0–19): 1 640 текстов ≈ 54 млн проверок ключей;
    - H22 правило QC1-29 (глава + ключ Stage One как [link]): 11 616;
  - на Grycoin-2 (поиск правила):
    - 2^20 подмножеств флипа первых и последних букв абзацев;
    - ≤9 флипов среди 30 границ предложений;
    - H18 флип целых предложений: 917 504;
    - H19 все 2^30 подмножеств флипа первой и последней буквы 15 предложений × 10 вариантов склейки = 10 737 418 240 MD5 (C с midstate, `tools/h19_c.c`, ~7 мин на одну склейку), префикс 3c6 прошли 2 621 368, адрес — 0;
    - H20 разбивка после «himself.»: 1 474 560;
    - H21 флип-наборы + одна нерегистровая правка: 7 656 204;
  - чужие: OCP ~3,2·10⁸; Sea_Ferret_9615 на GPU >10¹¹ (≤4 любых флипа регистра + 1–5 на границах Grycoin-2).
- **Что осталось / следующий шаг**: только инсайт, без перебора.
  - Как puzzleponky решил Grycoin-2: 02.08.2019, «easy after solving block 2, tricky bits», решение не раскрыл.
  - H10/H15: формат QC1-77 «[solution] TOMI Omit TOMI [link]», где link — полный приватный ключ блока 44 «Du Hast» (неизвестен).
  - Открытые идеи: H3 (другие «знаки»), H6/H7, H12, H13, H14, H16, H17.
  - OCP оценивает свой остаток (2 правки) в ~45 мин GPU на одну базу. У нас CPU ~1 600/с, это дни.
  - Илья 14.10: Lean и математика не помогут. Нужно угадать байты текста, обращать MD5 нереально (~2^123).
- **Оракул, скорость, файлы/скрипты**:
  - `/workspace/work/quizchain/tools/engine.py` (selftest): ~830/с на ядро, 2 ядра ≈ 1 600/с.
  - C-перебор MD5: `tools/h19_c.c`, `h19/run.sh`, `tools/h19_check.py` (~4 млн MD5/с; 10,7·10⁹ за ~2,3 ч).
  - `tools/qc1lib.py` — таблица нормализации решённых блоков.
  - `tools/h20_split.py`, `h21_edit.py`, `h22_link.py`, `h8_deriv.py`, `h9_typo.py`.
  - `tools/sweep.py` — свип при совпадении на адрес Ильи из PUZZLES_HANDOFF.md.
  - `fresh_look.md`, `gb2_paras.json`, логи `h*.log`.
- **Проекты Hark и статус**: проект 2236ab0e-dc09-445c-9ba5-8f514cc39105. Задача 915ee0aa-b120-4874-b30f-a487cb341571. Вердикт 14.10 ~10:40 MSK: «исчерпано», пауза. Аудит 15.10: ярус 3, заморозить.
- **Оценка шансов**: наша 13.10 — 1–3%. Аудит 15.10 — ≤1%. Автор сама потеряла решение.

---

### RushWallet #30 — 0,01 BTC
- **Адрес/сеть/путь**: BTC mainnet, `13Q8hJqagtd77ojTJcEZPjTz2sBFSsYxyj` (P2PKH, несжатый ключ). Brainwallet: priv = SHA256(utf8(фраза как есть)), по contest.js 2015.
- **Баланс**: 1 000 000 сат. Проверено 14.10 22:05 MSK (3 tx, 1 трата — исторический возврат). 15.10 01:45 MSK на месте.
  - История:
    - 22.09.2014: пришёл 1 BTC с 1GShq18eb4V6uBtqgwxkmuPTUHCtyBcNYA (кошелёк-фондер);
    - 25.03.2015: этот 1 BTC возвращён организатору, то есть ключ у организатора;
    - 24.04.2015: +0,01 BTC с 1A5M4QrvDNq6S5vAbwd5A9eHFbTipxJefw (кто это — неизвестно). Эти 0,01 BTC не тронуты.
- **Источники**:
  - bitcointalk https://bitcointalk.org/index.php?topic=793720 (583 поста, сохранено в `btt/thread.txt`).
  - https://github.com/visalord/rushwallet-puzzle-30 (копия `visa/`, видео 1280×720 `visa/video/Bitcoin_puzzle_ARCHIVE.webm`, 110,6 с).
  - OCP `2-mid-prizes/rushwallet-contest-30-1msats` (~5,52·10⁸ негативов).
  - kryptokit.com в Wayback.
- **Подсказки и наши чтения**:
  - Морзе в видео: «DMITRI KNOWS THIS GAME IS NOT EASY, MORE WILL COME SOON. IN THE MEANTIME READ SATOSHI'S PAPER.» и позже «…PUZZLES ARE JUST THE BEGINNING. -3302». visalord записал морзе как «debunked».
  - S4VV4S (26.10.2014): «Wallet 30 (the big one) still hides somewhere in the whitepaper». Это мнение игрока, а не организатора.
  - Лист в руке Дмитрия на ~1:00: двухколоночная вёрстка, не 1-я страница whitepaper, в 720p нечитаем (наша сессия 13.10 22:05).
  - Ещё не разобраны:
    - «x4 на груди принцессы»;
    - 16 монет вокруг танцующей коронованной женщины (кадр ~01575);
    - синий прямоугольник на стене;
    - указатель «SLOGAN»;
    - числа на монетах (2784623964023 в 6:13/6:17);
    - email-подсказка «9e]IW8lnJN;J[88U3…»;
    - SoundCloud remix «STARTS WITH PAPA END WITH MIKE. K3R3Y0P1T»;
    - codepen dmitrikryptokov/ixqmh, aceology/DenqF;
    - reddit 2i7uv6 («extra clue to the big wallet»).
- **Что установлено/решено**: таблица механизмов #1–#29 (`clues.md`, `visa/findings.md`). Каждая решённая фраза — дословный текст из кадра или звука, кратность (X2…X7) видна на экране. Ответ #1 «5784623964023 578462396402» показывает, что организаторы делали опечатки и усечения. Фразы #13, #23, #26 забраны в 2014–15, но не опубликованы.
- **Проверено и отброшено** (0):
  - наши ~4·10⁶ (`NOTES.md`):
    - H1 whitepaper (строки, предложения, заголовки × регистр × 1–7 повторов): 20 358;
    - H2 модель опечаток: 3 969 787;
    - шапка whitepaper ×N: 7 830;
    - шаблоны из таблицы #1–#29: A — 19 719, B — 2 566 + 2 739, C — 14 447;
  - медиа:
    - ffprobe: только h264 + aac, тег creation_time 2014-12-28, без субтитров и доп. дорожек;
    - спектрограмма всей дорожки чистая;
    - вспышек scene>0.3 нет;
    - в Wayback clue-картинки kryptokit (wp-content/uploads/2014/09) не архивированы, у clue-542 сохранилась только рамка;
  - OCP ~5,52·10⁸: rockyou ×5 регистров, KJV, окна whitepaper, genesis, 5,1 млн песен, OCR кадров ≤720p и др.;
  - visalord: URL и бренды, все порядки имён, все предложения транскрипта ×1–10, SLOGAN ×1–10 и др. (`visa/findings.md`).
- **Что осталось / следующий шаг**: нужен новый медиа-источник — видео выше 720p (оригинальный YouTube или Vimeo; ID x0LqsUOIw0M, sr8lBrtd9U4, Mbu9dD8ahgE — через Wayback), оригинал письма-подсказки или reddit 2i7uv6. Наращивать перебор запрещено: директива Ильи через координатора, 13.10 18:20.
- **Оракул, скорость, файлы/скрипты**:
  - `/workspace/work/rushwallet30/bw.py` (`python3 bw.py file` или `bw.check(iterable)`, ~10 тыс./с, проверяет и сжатый ключ; самотест на #17, #28, #12).
  - `h1_whitepaper.py`, `h2_typo.py`, `h2b.py`, `wp.txt`/`wp_raw.txt`, `bitcoin.pdf`, `clues.md`, `btt/`, `visa/`, `wayback/`, `cands/`, `fr60/`.
- **Проекты Hark и статус**: проект 4c642759-7a1c-437b-ae54-ee098dfda3c9. Задача ee1bf57f-4931-411e-8b12-3d4c80f20904 на паузе с 13.10 ~22:40 MSK, вердикт «тупик до новой информации». Аудит 15.10: ярус 3, заморозить.
- **Оценка шансов**: наша 13.10 — 2–5%. Аудит 15.10 — ≤1%.

---

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

### Нуаза / bitcoin.fr «Chasse au trésor» — 0,2024 BTC
- **Адрес/сеть/путь**: BTC mainnet, `bc1q8zfy6wvvtskzkg4s343x42pyf363nmejspgc02` (P2WPKH). Путь m/84'/0'/0'/0/0, пустой passphrase — подтвердил автор: e-ducat.fr/2024-09-29-adresses-et-chemins, его Ruby `BipMnemonic.to_seed(mnemonic:)`.
- **Баланс**: 20 240 000 сат, 1 tx, трат 0. Проверено 14.10 22:05 MSK (bal_2026-10-14.txt). Раньше: 13.10 ~13:40 MSK (blockstream) и 21:30 MSK (mempool.space).
- **Источники**:
  - https://bitcoin.fr/chasse-au-tresor/ — 14 подсказок в X @e_ducat, 15.08–25.12.2024.
  - Книга Pierre Noizat «L'énergie, face cachée de la monnaie» (EN: «Energy, the Flip Side of Money»).
  - Форум jeuxvideo.com, тема 76202287 (9 страниц, последний пост 24.09.2026).
  - Репо блога github.com/pierrenoizat/pierrenoizat.github.io (последний коммит 30.03.2026).
  - Бесплатный OverDrive sample (FR): https://www.overdrive.com/media/11171221/sample?slug=x
- **Механизм**: 24 английских слова BIP39. Слова 1–21 — французские слова из книги, каждое заменяется английским словом того же номера в english.txt (французский список нужен в NFC). Слова 22–24 = **open always win** (Samsung «Open Always Wins», 07.2024; «wins» нет в BIP39). Настоящее 24-е слово НЕ является валидной checksum.
- **Подсказки**:
  - 1: «8 images → 14 mots»;
  - 2: две олимпийские годы;
  - 3: департамент происхождения;
  - 4: два слова в оглавлении;
  - 5: два слова в главе на центральную тему;
  - 9: верификатор. При верных 23 словах валидное 24-е — одно из alien, detect, flip, gas, organ, peasant, staff (1697), trigger;
  - 10: слова 1–14 — в картинках, по порядку; million, minutes, opinions не входят; 13–14 — на обложке;
  - 11: годы связаны с биографией (15–16), «остерегайтесь ложной информации», 17 связано с именем автора;
  - 12: 18–19 — в оглавлении;
  - 13: 20–21 — в начале главы на центральную тему;
  - 14: слоган.
- **Что установлено/решено**:
  - Подсказка 9 даёт 64-битный верификатор первых 23 слов без деривации: CS = [50, 227, 200, 0, 227, 17, 160, 68] (`src/chk.py`, самотест пройден).
  - Слоты и наши чтения:

    | Слова | Откуда | Наше чтение |
    |---|---|---|
    | 13–14 | обложка | énergie (father), monnaie (own), pierre (rice) |
    | 15–16 | годы как номера | 1960 → visual (рождение, май 1960; 1965 у Figaro — «ложная информация»), 1980 → wash (X80) |
    | 17 | имя / департамент | фамилия NOIZAT происходит из Creuse (23) → creuser (deny) или accepter (номер 23); слот открыт |
    | 18–19 | оглавление | économie, progrès, amour, bonheur, science |
    | 20–21 | гл. 4 «Énergie» | physique (reward), source (thrive) |

  - Картинки, найденные бесплатно:
    - «indice baguette» p.105: indice, затем minutes (мн. ч., исключено — это подтверждает картинку);
    - таблица p.72: fossile, manuel, physique;
    - дерево решений: pluie, soleil;
    - «Énergie libre» p.14 из OverDrive sample: libre.
- **Проверено и отброшено** (0; `/workspace/work/noizat/NOTES.md`, логи в `runs/`):
  - famA: 1,11·10⁹ (упорядоченные 12-подмножества пула форума × обложка × все олимпийские годы 1960–2024 × слот 17 (6 вариантов) × оглавление × гл. 4);
  - famB: 4,82·10⁸ (порядок чтения 16 слов, 1 365 подмножеств);
  - famC: 3,61·10⁸ (строгая последовательность + одно любое слово из 2048 в любой из 12 позиций);
  - famD-y: 1,85·10⁷ (70 почти строгих последовательностей × годы с 0/1-индексацией);
  - famD-w: 3,51·10⁸ (слот 17 = любое из 2048);
  - итого наших ≈2,3·10⁹;
  - форум: решатели с книгой, ~10¹⁶ на 10×RTX 4090 — 0. Консенсус форума: ошибка или неоднозначность у автора. Автор на вопросы не отвечает.
- **Что осталось / следующий шаг**:
  - Блокер — картинки, которых нет ни в одном бесплатном источнике: yin-yang p.42, timbre p.101, bilan BCE p.99 (печатная версия), identité p.174, bonhomme/opinions p.178, а также точный печатный текст p.72 и p.105.
  - Пройдены: Google/Play Books, Amazon/Kindle Look Inside, Everand FR/EN, OverDrive FR, лекции B-Only'25, BCE#1 (31.01.2026), BTC Prague 2025, кадры анимационного фильма, блог и репо автора, форумы, Reddit, bitcointalk.
  - OverDrive EN sample не прочитан (Server Error), но он тоже кончается на ~гл. 8.
  - Пути:
    1. Купить книгу: Kindle €8,99, Konsensus EPUB €10, EN EPUB €6 (цены 13.10). Илья 13.10 15:13 решил НЕ покупать. Нужна новая явная санкция.
    2. Взять через библиотечную карту: Tout Apprendre/Mozaik во французских медиатеках, например La Rochelle. Нужен аккаунт.
  - Форум предупреждает: картинки бумажного и электронного изданий различаются.
- **Оракул, скорость, файлы/скрипты**:
  - `/workspace/work/noizat/src/chk.py` (`full_ok`, `search_fast`; ~10⁹ за минуты, без деривации), `src/chk.c`, `src/selftest.py`, `src/famA.py`–`famD.py`.
  - `french.txt` (NFC), `english.txt`, `ch4_energie.txt`, `web/` (educat_img, kindle_sample, chegaray, gh_tree.json), `jvc/`.
  - Транскрипты `bce1_transcript_en.txt`, `btcprague25_transcript_en.txt`.
- **Проекты Hark и статус**: проект fba678df-af16-4c60-ad3d-e580a0ced7d3 («Охота Нуаза»). Цикл eb137114 (30 мин, 5 направлений) завершён и отменён 13.10 ~21:45 MSK с вердиктом «только покупка или библиотека». Аудит 15.10: ярус 3, «только с покупкой книги».
- **Оценка шансов**: аудит 15.10 — ~2%, и только с книгой. Даже с книгой опытные решатели на GPU не преуспели. Вероятна ошибка автора.

---
Путь к файлу: /workspace/projects/aa5ddde6-45de-46be-b0aa-6bd4db202e32/work/catalog_parts/g4.md

---

## 8.5 Oobit #139, Bitcoin Coders #07, Zden HALV, Kitten, Guntis

# Часть g5: Oobit #139 · Bitcoin Coders #07 · Zden HALV · Corey Phillips Kitten · Guntis 8,6 ETH
Собрано 16.10.2026 ~23:20 MSK только по файлам рабочего пространства (сеть и счёт не запускались). Время везде MSK, если не указано иное. Заменяет/дополняет записи MASTER_CATALOG §B3, B9, B21, B16 (+дубли B31/B42), B12.

---

### Oobit #139 (bitcoinpuzzles.io «Super challenge Oobit 12 words») — 1 545 000 сат (0,01545 BTC)
- **Адрес/сеть/путь**: `1KKtnqLdK17ndRRwF8zaKZH6FSkSmTN6fk`, BTC P2PKH, BIP39 12 англ. слов, без пассфразы (по почерку автора), `m/44'/0'/0'/0/0`. 2 входа: 30 000 сат (12.07.2026 08:26 UTC) + 1 515 000 сат (13.07.2026 07:53 UTC), трат нет.
- **Баланс**: 1 545 000 сат, не потрачен — последняя наша проверка 16.10 ~15:10 MSK (STRATEGY.md проекта; до этого mempool.space 16.10 ~10:58).
- **Источники**: https://bitcoinpuzzles.io/en/puzzles/139 (автор Mestre Caçatal, 02.06.2026; вкладки /tab/dicas, /tab/comentarios, /tab/aliancas). Картинка: https://falling-dream-4791.fly.storage.tigris.dev/puzzles/ca168e8f-9153-4ed6-8f0a-8291dcfbc44d.png (2752×1536, на 16.10 не менялась). 6 AI-клипов «Desafio Oobit» на канале @CortesdaCacatolandia. Официальное видео-объяснение: YouTube i0ZX2jWMUmk «Da para ganhar R$4,981 na hora». Свежий ролик автора TeXiSNqmqvs (~07.10). Канал автора @mestrecacatal (UCjVt3SWdIQL7Ty5ITXgEqnA), Cortes UCag_O1mbcxa38-GPJ8f1PLA. Альянсы: https://bitcoinpuzzles.io/en/puzzles/aliancas/3 (лидер Billy, ~108–139 уч.), «easy brute» (Ahmed, 105 уч.). Telegram t.me/bpuzzles (закрытая группа), Discord «Caçadores Digitais» (инвайт ZFP4QrWney).
- **Механизм**: 12 слов = объекты на главной картинке (койот с панцирем черепахи в пустыне) + в 6 скрытых клипах + слова, спрятанные вне картинки. Ответ на сайте вводится за 1 cacatal, мы проверяем офлайн по адресу. Описание: «Oobit Challenge [1]+3 / Oobit allows you to pay with crypto anywhere that accepts Visa® / Prize: 1,545,000 Satoshis / m/44'/0'/0'/0/0» (смысл «[1]+3» не установлен).
- **Подсказки и наши чтения**:
  - Скрытые надписи на главной картинке (13.10): ID клипа «7DEcPmhijrU» (низ), иврит «פטריה» = гриб → **mushroom** (панцирь), число «201025109820650999» в небе (смысл не найден).
  - Клипы по датам (верная нумерация в clips_frames.md; в DOSSIER/досье нумерация НЕВЕРНА): 1) 7DEcPmhijrU 12.07 — слон у ржавого/каменного диска с дыркой; 2) qrvocJCSc4Q 12.07 — черепаха + койот с костью; 3) bshCjlr5bdI 15.07 — мужчина поднимает бетонную плиту в ангаре; 4) NagGwROg-lM 27.07 — олень толкает белый гриб в сосновом лесу; 5) uxLjx32vTL0 31.07 — волк/койот в туманной пустыне; 6) V0E8p9wreD4 02.08 — большая кошка со спины на каменных руинах (кисточка хвоста → скорее lion, не panther).
  - Платная подсказка #1: 6 105 CB ≈ $2,4, 19 покупок на 16.10, пазл не решён → одной подсказки мало. Илья отказался (14.10) — не предлагать.
  - Купон Oobit (реф. код в описании i0ZX2jWMUmk, «12 → 11 слов») требует регистрации в приложении Oobit; у нескольких комментаторов подсказка не пришла. Илья 16.10 13:33: «не буду ставить» — не использовать и не предлагать.
  - Почерк автора по решённым #100 и #138 (оба решил Pasaribu Halomuan): 3 картинки × 4 слова; часть слов — подмены подписей UI в его роликах (в LgoxP7Q0hu0 строка «Public Key» заменена на «Tornado»; в PRiekMPpp0c вкладка «About» → «Hazard», оба слова #138), слово из прошлого челленджа (venture повторён), название Discord-канала (material). Автор: незнание португальского помогло победителю → слова читаются прямо по-английски.
  - Список альянса 3 (кадр TeXiSNqmqvs @2:46, shots/tex246.png): coyote +7, mushroom +5, tortoise +3, orbit +3, home +1, bone… (23 слова, остальные за кадром). orbit/home — вероятно перенос из #138, слабо.
- **Что установлено**: подтверждено оракулом 0 из 12. Уверенно (5): mushroom, elephant, deer, tortoise, coyote. Средне: bone, slab, stone, panther|jaguar|lion. Слабо: wolf, man/athlete/muscle, desert, fog, dawn, coin, wheel, plate, shell, sand, claw, visa, card, drink, orbit, home. В клипах (1080p, 726 кадров, медиана/хайпасс/CLAHE) склеек и скрытого текста нет. Вывод STRATEGY 16.10 15:10: видимое ядро знают 140+ участников, их переборы пусты (Pablo S.M: 15 слов, 1,34·10¹¹) ⇒ 1–3 слова спрятаны вне картинки/клипов.
- **Проверено и отброшено (0 совпадений)**:
  - 2 слова/клип, 4 порядка дат × 64 перестановки × ~40 820 наборов ≈ 652 тыс. (14.10); free1: 720 порядков клипов × 72 набора = 206 928 (14.10).
  - I01 структура 2-3-2-2-1-2 — 10 368; I02 gym/plate — 7 680; I03 venture-вставка — 10 368; I13 демо-фраза генератора из i0ZX2jWMUmk @4:41 и вариации — 1 681; I15 orbit/home на любую позицию — 2×10 368; I18 тема денег/басни (coin cash credit card visa race slow story heavy…) — 6 144 + 20 480 (16.10).
  - Число из неба: как приватный ключ/sha256/индексы BIP39/Twitter ID/Discord ID (Unknown) — пусто; как координаты (Акашочитлан, Мексика) — смысла нет.
  - Метаданные, LSB, хвост PNG главной картинки; сайт oobit.com (sitemap 427 URL, 332 страницы) — подсказок нет; ~25 роликов автора на подмены UI — найдены только Tornado/Hazard (#138).
- **Что осталось / следующий шаг**: мониторинг (вкладки подсказок/комментариев #139, новые ролики @mestrecacatal, баланс) + одна смысловая идея за цикл с проверкой ≤~10⁴ (разрешено Ильёй 16.10 15:17). Неисследовано: «[1]+3» как 3 слова из слогана; плотный разбор кадров скринкастов июнь–авг (приём «браузер ставит на паузу → скрин → читаем сами» рабочий). Финальный перебор порядка (12!/16 ≈ 3·10⁷, ~4 ч на 2 CPU) — только при 12 установленных словах.
- **Блоки**: вход на bitcoinpuzzles.io только Google через bitcoinflix-1fe04.firebaseapp.com — браузер Hark не проходит (16.10 11:16); Discord — агентский аккаунт ограничен, основной упёрся в hCaptcha (16.10 12:45); YouTube из песочницы закрыт — mp4 тянули через invidious.f5.si (длинные ролики не отдаёт).
- **Оракул, скорость, файлы**:
  - `/workspace/projects/c2397a33-b4cc-4202-befe-1aba09168dec/work/oracle.py` (mnemonic+bip_utils, ~160 проверок/с на 2 CPU; при совпадении пишет в work/.secret/FOUND.txt, chmod 600). `permsearch.py` — возобновляемый движок перестановок (hashlib+coincurve, ~1 000/с/ядро), `pairsearch.py`, `idea01_structure.py`, `idea02_plate.py`, `idea03_reused.py`, `idea15_*.py`, `idea18_theme.py`, `idea18b_two.py`, `fetch_clips.py` (обход Anubis PoW invidious).
  - Документы: `.../work/NOTES.md` (журнал), `IDEAS.md`, `QUEUE.md`, `STRATEGY.md`, `DOSSIER.md`, `clips_frames.md`, `videoscan/*.md` (i0ZX2jWMUmk_findings.md, video1–4), `shots/` (tex246.png, demo441.png), `frames/`, `mp4/`, `channel_videos.json` (715 роликов).
  - Старое: `/workspace/work/oobit139/` (NOTES.md, pz/ — HTML пазлов 1–150, pairs_*.log); досье `/workspace/projects/b6983d3d-52f5-48f8-9974-b99dc8e31c55/strategy/dossiers/oobit-139.md` (16.10 11:05, нумерация клипов в нём неверна).
- **Проекты Hark и статус**: `c2397a33-b4cc-4202-befe-1aba09168dec` «Oobit #139: Загадка на 1 545 000 сат» — активен, цикл «Oobit: цикл» раз в 30 мин до 15.11 (запись 16.10 11:34); последние записи в файлах 16.10 15:25. Старый проект `1ae68e05-fda3-4817-a8aa-c0618b676993` «Oobit 12 words» — заменён (последняя активность 14.10). Стратег «работа» (b6983d3d) только сверяет раз в сутки.
- **Оценка шансов**: ~3% (досье 16.10); STRATEGY: «шанс невелик» — 200+ конкурентов, у автора GPU-код для порядков, приз ~$1 000–1 270.

---

### Bitcoin Coders Puzzle #07 — 21 000 сат
- **Адрес/сеть/путь**: `bc1qj7xsxrlgmnnrqwvlakacc5yrh33h2n3xaa0m09`, BTC P2WPKH, BIP39 12 англ. слов, без пассфразы, страница даёт `m/84'/0'/0'`, проверяем `/0/0` (oracle.py также /0/0–2 и /1/0–2). Вход: tx `85ad0185b5dbec7969c99f751c8bfc2b6905b77eca7dc1a6995fbb6137490c5e` (05.10.2026 20:37 UTC).
- **Баланс**: 21 000 сат, не потрачен — последняя запись цикла 16.10 23:05 («баланс цел, MATCH нет», IDEAS.md).
- **Источники**: https://bitcoincoders.org/desafios/puzzle-07 (октябрь 2026); картинка https://bitcoincoders.org/assets/desafios/puzzle-07-desafio.webp (1088×1472, файл не менялся). Подсказки — только Discord Bitcoin Coders, канал https://discord.com/channels/1414049501257142284/1479179285884440827 (инвайт discord.gg/e5qUsNWgQg) — нами НЕ прочитан. Анонсы @kakafurlan / @bitcoin_coders в X (подсказок нет). Издания 01–06 закрыты, 07 активно, следующее — ноябрь 2026.
- **Механизм**: «A imagem contém representações das 12 palavras». Картинка = 34×46 плиток 32×32 px, перемешаны, не повёрнуты (перемешивание серверное, не seed-random — seedtest отверг). Исходник — страница комикса 4 колонки × 3 ряда = 12 панелей (гуттеры: колонки плиток 8, 16, 25/26; ряды 15, 30 — сплошные, 4×3 подтверждена 16.10). Порядок слов — гипотеза: по строкам слева направо.
- **Подсказки и наши чтения**: открытых подсказок к 07 нет. Прототип — Пазл 01 (решение опубликовано): «rural midnight aerobic version bird grow civil double february penalty flag wood» → слова у автора СЛУЧАЙНЫЕ BIP39 (вкл. абстрактные), картинки рисуются под них ⇒ подбирать слово по главному предмету сцены. У 06 механика «порядок надо угадать» ⇒ порядок тоже может быть частью загадки.
- **Что установлено (раскладка, р=ряд, к=колонка)**:
  - р1: к1 кран с контейнером за сеткой (crane/cargo/harbor/fence); к2 смеющаяся женщина в мазках краски (laugh/smile/happy); к3 тату дракона (dragon/tattoo, уверенно); к4 синий шлем/кепка + мультяшное лицо в очках (helmet/hat/glass?).
  - р2: к1 злой мужчина со стиснутыми зубами, фиолетовый фон (angry/mad); к2 пергамент с деревом/орнаментом или женщина в бежевом плаще (c11) — не до конца ясно; к3 девушка в шляпе и тёмных очках (lady/woman/girl/hat); к4 бриллиант на фиолетовом со звёздами (diamond/crystal).
  - р3: к1 НЕ опознана (частично: бледная бумага, красный глянцевый предмет, кофейные пятна → coffee/cup?/apple/paper); к2 пейзаж с деревьями + волосы; к3 человек в розовом худи + дерево на пергаменте; к4 штабеля контейнеров (cargo/harbor/fence).
  - Не в BIP39: container, glasses, hoodie, sky, pine, bear, star, cup.
- **Проверено и отброшено**:
  - Сборка: GA gaps (13.10) — мешанина; Kruskal без якорей — 438 кластеров; k-means по цвету — чистота ~0,4; 2-opt (place2) — хуже; hrow (гуттер-ряды) — не даёт ряды кластерам без ay; стыки для р3к1 — соседей нет; seedtest (random.shuffle с сидом 0..20000) — шум.
  - «12 слов = иконки в тёмных плитках» (bulb, scissors, sparkle) — иконок <12. Метаданные/стего webp (единственный чанк VP8, без EXIF/хвоста), соседние ассеты-подсказки (404), JS страницы — пусто.
  - Обложка puzzle-07.webp (12 табличек) как набор слов: 16 384 + 11 520 кандидатов → 0.
  - Переборы (разрешены Ильёй 16.10 ~13:40): specA (р3к1 = все 2048) — 73 423 валидных → 0; specB (шлем в р3к1, р1к4 = *) → 0; specC (34 560 синонимов × р3к1 = *, ≈4,4 млн валидных, 16 шардов) → 0; specD (синонимы «от другого ИИ», 281,8 млн комбинаций, 32 шарда) — шарды 0–23 без совпадения, 24–25 начаты, 26–31 не начаты (по логам на 16.10 ~23:15).
- **Что осталось / следующий шаг**: дождаться specD; затем specE — слова по ГЛАВНОМУ ПРЕДМЕТУ каждой сцены (coat, glass, crane, cable, jacket, smoke…, ≤3–5 на слот, р3к1 = все 2048) — spec ещё не написан. Пункт 2o: порядок по колонкам (р1к1, р2к1, р3к1, р1к2…). Опознать р3к1 и уточнить р2к2. Лучший внешний ход — чтение Discord-канала подсказок (заблокирован, Илья 14:18: «бог с ним»).
- **Оракул, скорость, файлы**:
  - `/workspace/projects/975a88ce-afde-490a-a6fd-35e2533e235d/work/fastcheck.py` (свой PBKDF2+coincurve, checksum-фильтр, ~1 000 деривов/с на ядро, шардирование; spec*.json: 12 слотов в порядке чтения, «*» = все 2048), `work/runq.sh` (очередь), логи `work/runs/spec{A,B,C,D}_<k>.log`, `q.log`, `qD.log`; `work/oracle.py` (selftest OK). Сборка: `place.py`, `place2.py`, `place3.py`, `canvas_abs.py`, `attach*.py`, `prop.py`, `hrow*.py`, `chain.py`, `subasm*`, `seedtest.py`; рендеры `work/out/` (cabs*.png, canvas3_1.08.png, w*.png, subG0x2.png); матрицы стыков `work/DLR.npy`, `DTB.npy`.
  - Документы: `.../975a88ce-.../NOTES.md`, `IDEAS.md` (134 строки, полный журнал идей), `QUEUE.md`.
  - Старое: `/workspace/work/bcoders07/` (NOTES.md, classify.py, solve.py, merge.py, gapsrepo/), `/workspace/projects/b6983d3d-52f5-48f8-9974-b99dc8e31c55/work/bc07/` (merge2.py, asm2_*), досье `.../strategy/dossiers/bitcoin-coders-07.md` (16.10 11:05).
  - Pip-пакеты теряются: `PYTHONPATH=work/pylib`; прогоны ≤5 мин, nice -n 19; песочница перезапускается — фоновые шарды умирают, проверять ps и перезапускать runq.sh.
- **Проекты Hark и статус**: `975a88ce-afde-490a-a6fd-35e2533e235d` «Bitcoin Coders #07: загадка на 21 000 сат» — активен, цикл ~15–30 мин (записи циклов до 16.10 23:05), Илья просил писать только при совпадении или если приз заберут. Старый проект `28058c93-90d7-4014-ba6c-119e772adbb4` — задача 9ff8cf3b (15 мин) поставлена на паузу 13.10 23:09.
- **Оценка шансов**: ~12% (досье 16.10 11:05; аудит 15.10 — 15–20%). Приз мал (~$17), гонка: месячный ритм, вероятно заберут до конца октября.

---

### Zden «HALV» (crypto.haluska.sk) — 312 500 сат (0,003125 BTC)
- **Адрес/сеть/путь**: `1crypto24HCr178iMcKd5iUi5D4rsg1nK`, BTC P2PKH (ванити `1crypto…`). Ключ — сырой 256-битный приватный ключ, спрятанный в картинке; формат неизвестен: прямой hex (как LVL3/LVL5/Nethemba) или WIF (как LVL1/2/4/XM17/SFX). Оракул проверяет compressed и uncompressed.
- **Баланс**: 312 500 сат, 1 входящий выход, трат нет — mempool.space 15.10 ~02:20; циклы проекта «приз проверен/цел» — последняя запись 16.10 23:10 MSK.
- **Источники**: https://crypto.haluska.sk/ (зеркало crypto.satori.digital), опубликовано 20.04.2024; твит https://twitter.com/Zd3N/status/1781475361160663236. Решение LVL5: https://echo.ls/zden-level-5/ ; разбор LVL4: https://steemit.com/bitcoin/@mmorsl/solution-of-the-bitcoin-crypto-puzzle-level-4-by-zden. OCP: `/workspace/work/open-crypto-puzzles/2-mid-prizes/zden-haluska-halv-312ksats/`. Внешний разбор: github benjacasas02/independent-cryptography-research (research/zden; >33 000 кандидатов — 0).
- **Механизм**: одна картинка `cryptoHALV.png` (950×950, grayscale). Сигнал s(x)≥0 нарисован как s и −s, строго зеркален вокруг y=475 на x 93–857 (асимметрии кроме лого/маркера нет). Подсказка автора одна (20.04.2024): «This level is way easier than LVL 5. It shouldn't take long until it's solved.» Файлы `cryptoHALV_hint.*` — 404 (15.10).
- **Подсказки и наши чтения**:
  - В картинке: «CRYPTO.SATORI.DIGITAL_ZDEN.ART», адрес, штамп «20042402» = DDMMYYHH (20.04.24 02 ч CEST — момент халвинга, декор), логотип «BTCRYPTO / ZDEN / LVL / HALV». tEXt Comment — только название/адрес/домены/zden@satori.sk.
  - Маркер у x=91, y 443–506 (64 строки): 1-px линия из 4 штрихов 11/12/13/11 с паузами 5/6/5, яркость — пила из 7 ступеней (23…216), как «Linear Ramp» плагина Satori Pixel Stretch (SFX). Гипотеза: маркер старта/развёртки.
  - «Грамматика» автора (по решённым уровням): всё в точных целых пикселях, без LSB; квантование малыми уровнями (Nethemba: размер 0..3 = 2 бита); маркер старта/направления; LVL5 — измерения прямоугольников + формула из угла → round → суммы пар → 32 байта hex, uncompressed.
- **Что установлено**: модель отсчётов ТОЧНАЯ (15.10): 256 узлов на сетке x = 92 + 3k (k 0..255), значение в узле L∈{0..3} × unit полосы; 8 полос по 32 узла с unit 128, 64, 32, 16, 8, 4, 2, 1; между узлами прямые отрезки (подтверждено синтезом). Последовательность — `work/levels.txt`. Распределение 0:117, 2:78, 1:34, 3:27 — сильно неравномерно ⇒ вероятно НЕ прямые биты; 256×2 = 512 бит, а не 256. Лепестков (ненулевых серий) 63. Второго канала в наклонах/плато нет. OCP-модель «59 долей круг/ромб, ~118 бит» неверна.
- **Проверено и отброшено (все 0)**:
  - S3 (15.10): 158 структурных упаковок base-4 (все/чётные/нечётные узлы, MSB/LSB, прямой/обратный, инверсия, половины, XOR, sha256, 1 бит/узел, int mod 2^256); ASCII-гипотеза не печатна.
  - S4: лепестки/паузы/разности/вершины/высоты как hex, base 4–7/16 — 7 025. S5: base58-тест, base-7 по разностям, знак верх/низ (шум ≤14/255), WIF (512 бит не влезают) — ~24. S6: хеши строк маркера — 18. Цикл 7: выборки 4 из 8 полос — 6 720. Цикл 8: чёт/нечёт, hi/lo биты, пары-нибблы — 32.
  - I2 хеши дат/наград халвингов, 312500, адреса, имён — ~140; I3 хеши чисел маркера — 22 404; I4 PNG-стего/чанки/хвост — чисто (фон строго 0); I5 24 биекции уровень→2 бита × узлы × направление + пары base-7 — 290; White Paper-приём (sha/dsha файла/пикселей, строки) — 24.
  - OCP (до нас): 59-символьная последовательность форм (202 ключа), ступени халвинга (~47), брейнволлеты (~110), дифференциал+знак, wildcard WIF (>5·10⁸) — все 0.
- **Что осталось / следующий шаг**: I1 — разобрать solver-картинки прошлых уровней (crypto1–4solver, cryptoSFX_solver, crypto_nethemba_solver, cryptoxm17solver): какая операция над измерениями давала байты, вывести 3 схемы и применить к levels.txt (числится «следующим» с 16.10 14:40, пока не сделан). Открыто: маркер 11/12/13/11 как параметр чтения (старт/шаг), неравномерность распределения уровней как признак кода переменной длины/base58. Внешне — следить за появлением cryptoHALV_hint.
- **Оракул, скорость, файлы**:
  - `/workspace/projects/294b2fcf-d0e2-45ba-9439-92c69cd75685/work/oracle.py` (selftest OK; запуск `PYTHONPATH=work/pylib:/workspace/projects/b6983d3d-52f5-48f8-9974-b99dc8e31c55/work/pylib python3 work/oracle.py --stdin`), быстрый пакетный `work/check.py` (coincurve). OCP-оракул: `.../zden-haluska-halv-312ksats/tools/oracle.py`.
  - Данные: `work/levels.txt`, `work/node_final.csv`, `work/synth.py`, `work/disc2.py`, `work/vectorize.py`, `work/cands_*.txt`/`.py`, `work/data/cryptoHALV.png`, `work/data/solvers/` (решатели прошлых уровней), кропы маркера/даты. Журнал: `/workspace/projects/294b2fcf-d0e2-45ba-9439-92c69cd75685/NOTES.md`. Досье: `/workspace/projects/b6983d3d-52f5-48f8-9974-b99dc8e31c55/strategy/dossiers/zden-halv.md` (15.10 02:50) + `dossiers/halv/`.
- **Проекты Hark и статус**: `294b2fcf-d0e2-45ba-9439-92c69cd75685` «Zden HALV» — активен, цикл раз в 30 мин (с 16.10 11:35; 15.10 был переведён на ежедневный 10:00 после закрытия S1–S6). Последние ~10 циклов (с 14:40) новых идей не отработали — только проверка приза.
- **Оценка шансов**: 12% (досье 15.10, ярус 1). Блокер интеллектуальный: схема «уровни → 256 бит»; трат не требуется.

---

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

### Guntis Vitolins «10 ETH Challenge» (mineshop.eu) — 8,61254155425694462 ETH
- **Адрес/сеть/путь**: `0x9C2F44EFAd0c1E852a09dF9939e6DaF061140CaF`, Ethereum, BIP39 12 англ. слов, без пассфразы, MetaMask `m/44'/60'/0'/0/0`.
- **Баланс**: 8,61254155425694462 ETH, nonce 7, блок 26 193 999 — publicnode RPC 15.10 ~02:45 MSK; без изменений с 16.08.2026. 7 исходящих tx 2021-05…2024-06-04 (~1,377 ETH) — автор сам держит ключ, движение ≠ решение (в каталоге «автор тратит» — уточнить: последняя трата 04.06.2024).
- **Источники**: видео https://www.youtube.com/watch?v=w4mpiuBP_aY ; пост https://mineshop.eu/2020/02/12/crypto-pumping-hardcore-research-portfolio-update-how-are-we-doing/ (теги — в архиве Wayback 28.05.2020); хинт 4 https://www.youtube.com/watch?v=03wXiMczCXk (~15:15); хинт 5 https://www.youtube.com/watch?v=ZjBJKooVmuE (~17:25). OCP: `/workspace/work/open-crypto-puzzles/1-big-prizes/guntis-vitolins-metamask-8-6eth/` (data/reading-order-pool.json, video-onscreen-words.json, seed-slots.json, tools/). GitHub floflo777/open-crypto-puzzles issues #18 (cjmcdaniel 04.09, Bayols 26.09), #38 (profesor1234 04.10). puzzles.agntn.dev/collections/mineshop.
- **Механизм**: 6 слов спрятаны в видео (описание, теги, заголовок, «written in the video on the screen»), 6 — в блог-посте 12.02.2020. Чек-сумма: ~1/16 расстановок требует деривации.
- **Подсказки (дословно)**: описание видео — «Don't expect anything easy there will be dark fog on the lake.»; «Do you think its more likely for parrot can sing a song then for a goat to whistle?». Пост — «Round dutch cattle is living in the forest and eating wood.» «Only because there is a lot of healthy fiber.» «Hunter like the rib roast dinner fresh.»; теги «altcoin season, altcoins, bitcoin, bull market, crypto pumping, ethereum, ethereum fork, round». Хинт 5: «keyword fork… not necessarily in order… one of the keywords from the seed wallet». Автор в комментариях: слово может быть в любой позиции; «Youll need only written words» (устный канал снят).
- **Что установлено**: якоря dutch@1 (Нидерланды), fog@5 (капли воды), parrot@12 (тропическая птица); члены без позиции fiber (хинт 4), fork (хинт 5). Пул письменных поверхностей: до fog 25 слов, между fog и parrot только lake/also, пост после dutch 19 → модель RO1. Issue #18: 192 уникальных слова (109 экранных + 110 автосубтитров, 27 общих), копия `work/guntis/issue18_words.json`; в окне таблицы портфеля (93–201 с) ~22 слова, монеты link, basic, token, atom, dash.
- **Проверено и отброшено (все 0)**: OCP P1 150,8 млн; G1 79,4 млн; R1 3,38 млрд; R2−R1 1,23 млрд; S1 1,16 млрд; R1+словоформы 10,75 млрд; RO1 (полная модель порядка чтения) 10,48 млн; RO2 582 725; C1 18,66 млрд (GPU). Bayols #18: RO1 на 7 путях; RO1 + 1 слот из монет/build/ready/donor/stay/until/win; пост-флоатеры hard/minimum (~280 млн). profesor1234 #38: B-POSS, B-CLOUD-A/B по 10,77 млрд, B-FRAMES 1,04 млрд (~35 млрд). Мы 15.10: 4 свободных видео-слота = монеты в порядке таблицы (5 последовательностей), 2 570 400 расст. → 160 060 дериваций, свидетель найден. Итого ≈70 млрд дериваций. Оговорка: в харнессах найден баг «хвостовая гонка» (потеря до 0,014–4,75% хвоста); скрипты Bayols не проверены на него.
- **Что осталось / следующий шаг**: код готов — `coinsk.py` (K монет, ordered/any, 126 юнитов, резюмируемо). Не покрыто: K=4 any 61,7 млн расст. → 3,86 млн дер. (~32 мин на 2 CPU); K=3 ordered 12,4 млн дер. (~1,7 ч); K=3 any 74,5 млн (~10 ч); K=2 ordered 97,2 млн (~13,5 ч). Суммарно ~190 млн — СНЯТО 16.10 11:33 правилом Ильи «идеи, а не переборы»: сначала из текста/видео/прошлых загадок вывести, КАКИЕ слова и порядок (≤10⁴). Экранные слова k=1 по всем 103 — 2,24·10⁹ (только GPU; аренда = трата, нужна Ильина санкция).
- **Каталог — исправления**: подтверждённые позиции верны (dutch@1, fog@5, parrot@12); «часть пула в HTML-метаданных» = теги поста (архив Wayback) + описание/теги видео.
- **Оракул, скорость, файлы**: OCP `tools/oracle.py --selftest` OK (15.10), ~650/с (bip_utils, 1 ядро); быстрый путь (функции `sweep_paths.py`) ≈2 000/с на 2 ядрах (~7,2 млн/ч). GPU-эталоны: L40S 780 000/с, GTX 1060 70 000/с. Наши: `/workspace/projects/b6983d3d-52f5-48f8-9974-b99dc8e31c55/work/guntis/coinsk.py` (формулы сверены: 348 228 000 на монету = число Bayols), `coins4_tableorder.py`, `issue18_words.json`. Досье `/workspace/projects/b6983d3d-52f5-48f8-9974-b99dc8e31c55/strategy/dossiers/guntis.md` (15.10 03:05); `strategy/QUEUE.md`, `strategy/LOG.md` (16.10 11:40).
- **Проекты Hark и статус**: отдельного проекта нет; ведёт стратег «работа» `b6983d3d-52f5-48f8-9974-b99dc8e31c55` (циклы ~15 мин; после 16.10 11:40 по Guntis работы нет, счёт не запускался).
- **Оценка шансов**: ~1,5% (досье 15.10). Самый крупный приз (~$20 800), но главный блокер — идентификация слов: RO1 закрыта на 100% ⇒ пул неполон или порядок не сохраняется.

---
Файл: /workspace/projects/aa5ddde6-45de-46be-b0aa-6bd4db202e32/work/catalog_parts/g5.md

---

## 8.6 Phy, Solana #4, LuckyLurker #2, Bitaps, Fe Bountiful, seed-phrase.com, Groestlcoin, QDay + новые загадки вне каталога + мёртвые

# Раздел G6. Загадки, которые мы трогали, и находки вне каталога

Составлено 16.10.2026 около 23:40 МСК только по файлам workspace: журналы, аудиты, handoff. Сеть не открывалась, счёт не запускался, балансы в этот раз не перепроверялись. У каждого баланса стоит дата последней нашей проверки. Секретов (seed, WIF, xsk) здесь нет: они лежат только в `.secret/` соответствующих папок, и эти папки не открывались.

Часовые пояса. Часть журналов писалась по Europe/Saratov (UTC+4). Где источник указывал +04, это помечено. Остальные времена даны в МСК.

---

## 0. Важные поправки к каталогу (читать первым)

1. **В разделе 7.2 каталога четыре пазла названы «открытыми», но наша живая проверка 12.10.2026 это опровергает.** Источники: `/workspace/work/puzzle-inventory-2026-10-12.md`, раздел «Swept, solved or unfunded», и `/workspace/work/ocp_check_2026-10-12.txt`. Статусы «открыто» в 7.2 взяты из манифеста OCP (проверка 16.08–27.08.2026) и устарели.
   - **Arweave Weave #12.** Адрес `XRGEfkMb…40fg`: баланс 0 AR, last_tx `gx0Ws1TP…`. В ocp_check «DRIFT: manifest says funded-unspent, chain says unfunded». Handoff 14.10 тоже пишет «#12 забран».
   - **FTPK Season 2.** Контракт `0xb5fe4f1b…dc`: USDT balanceOf = 0, nonce 6. ocp_check: «swept».
   - **LogicBeach «Powerful Moss»** (Base). Контракт `0x831102C7…44Dd`: баланс 0, nonce 1. В инвентаре: «claimed Oct 2026».
   - **Pindar Van Arman bitGAN.** Адрес `0x18f87e…478d`: 0 ETH (12.10 и 14.10). Приз здесь NFT, а владение NFT мы **не проверяли**, так что статус не подтверждён.
2. **QDay B37.** «Q-Day Prize (1 BTC)» Project Eleven — **другой конкурс**: выдан 24.04.2026 (Lelli, 15-битный ключ) и закрыт. Не путать с «Steal this vault». Источник: `/workspace/projects/b6983d3d-52f5-48f8-9974-b99dc8e31c55/strategy/LOG.md`, запись 16.10 18:15.
3. **Fe Bountiful B15.** Инвентарь 12.10 называет приз «1 ETH registry (7 × 0.25 ETH challenges)», но 7 × 0,25 ≠ 1,0. Как приз распределён по играм, не проверено (сумма зашита в `Challenge.prize_amount`).
4. **Phy и Solana #4.** 14.10 около 22:00 работу по ним, а также по Bitaps, отменил Илья: «do not touch». 15.10 01:38 стратег проекта «работа» получил право брать пазлы из каталога, но Phy и Solana #4 он держит в ярусе 3, «заморожено». Источник: `/workspace/projects/b6983d3d-52f5-48f8-9974-b99dc8e31c55/strategy/STRATEGY.md`.

---

## ЧАСТЬ А. Загадки из каталога, которые мы трогали (дополнения и исправления)

### B5. kTimesG Phy Challenge — 0,008 BTC
- **Адрес/сеть**: `bc1qrpn28qa82uyjg37dvsz3w7wpm3kpdea957nm9p` (BTC P2WPKH). **Баланс**: 800 000 сат, трат 0. Проверено 14.10 22:05 МСК (handoff) и 15.10 01:30 МСК (STRATEGY.md). Средства пришли 21.06.2026; пост автора — 05.06.
- **Источники**:
  - https://bitcointalk.org/index.php?topic=5584952.0 — на 13.10 там 102 поста, последний #102 от omry33 (12.10); в шапке «3 posts by 2+ users deleted»;
  - https://puzzles.agntn.dev/collections/phy;
  - альбом SecretAdmirere imgur BzcJMdl.
- **Механизм**:
  - Подпись Bitcoin Signed Message, заголовок 39 (P2WPKH, recid 0); r = 0x4775bc7c…0d06b2f8, s = 0x5b890b292ba1abd9b1 (71 бит).
  - pubkey 02425afd…6650eb; z — хеш signed message полного текста OP без завершающего LF (с восстановленной «J»).
  - Алгебра доказана: s выбран автором, а d выведен как d = (s·k − z)·r⁻¹ mod n. Секрет — **k** (или c = d/k), и его надо *прочитать* из картинки. Вычислить его нельзя: при одной подписи ограничение только на k не даёт решётке информации.
  - Картинка — эмодзи-спираль 2048², 256 эмодзи. Раскладка биюгатная: β = 49,740°, 128 антиподальных пар, центр (1024,27; 1017,68).
- **Что установлено** (13–14.10):
  - Все 9 байт s нечётные, бит 2 = 0 (p ≈ 2⁻¹⁸). Байты лежат в ⟨3⟩ ⊂ (Z/256)*; base-3-логарифмы [51,34,39,42,31,8,63,6,60].
  - **Ошибка в таблице сообщества**: позиция 188 (0-based; у сообщества 189) — это 🩷 U+1FA77, а не ❤️. Отсюда новая таблица t3. Ниндзя (поз. 250) по-прежнему неразрешим (1,002).
  - «97 %» автора — это 124/128: все 4 ошибки SecretAdmirere (8, 186, 188, 254) лежат на одном рукаве, то есть единица счёта — пара или рукав (модель M2).
  - Удалённый ответ автора на «маленький s» — «🔀🔄». Мета-подсказка «gvonys fhelucrM kbZ» читается как «Mox Zephyrus flabit». Таблица всех фраз автора с датами — в `FRESH.md` §1.
- **Проверено и отброшено** (сессии 1–9, H1–H100+, S6–S9):
  - кодпоинты, тона и ранги во многих порядках;
  - BSGS до 2⁴⁵; LLL/CVP (7006); k = ±a/b (194 тыс.; отдельно a/b ≤ 30 000 в probe.py);
  - золотое сечение и Фибоначчи; s как сид, Lehmer, faro;
  - страйды a·j+b по всем b (4 268 544); 6-битное «написание» s (57 млн окон);
  - модель цепочки связей (M3) опровергнута в тоновой форме;
  - повтор зависящих от кодпоинтов батарей на t3 и t3n — 396 068 значений, 0 (сессия 9, 14.10 00:02 +04).
  - Автор сам отверг: Kangaroo, хеширование, лишний LF, семантические и LLM-трактовки.
- **Что осталось / следующий шаг**: нужна новая трактовка того, как из 256-цикла (или из 128 пар) читается k. Вердикт 14.10 08:40: **пауза до новой подсказки автора**. Генерировать кандидатов вслепую нельзя (решение координатора 13.10 23:37).
- **Файлы/скрипты**:
  - `/workspace/work/inv/phy/FRESH.md` — лучший вход: фразы автора, исключённые модели, M1–M4;
  - `/workspace/work/inv/phy/SUB.md` — журнал сессий 1–9;
  - `/workspace/work/inv/phy/verify.py`, `signed_message.txt`, `puzzle_data.txt`, `puzzle.png`, `emoji_tables.json`;
  - `/workspace/work/inv/phy/s8/` — t3, screen.py, heartfit.py, posts.json;
  - `/workspace/work/inv/phy/var_t3/`, `var_t3n/`, `rerun8/`;
  - журнал `/workspace/work/web3auto/NOTES.md`.
- **Проекты Hark и статус**: «наука леарн выплаты» (1d1b2b74-1bb5-46d6-83be-2f104126e3ac), отменено Ильёй 14.10 22:00. Задача 676189e9 с 14.10 23:19 занимается только заработком, а не Phy. У стратега «работа» (b6983d3d) — ярус 3.
- **Оценка шансов**: низкие без новой подсказки. Оракул мгновенный (одно k·G), так что новая идея проверяется за минуты.

### B6. Solana Puzzles #4 — 0,834 SOL
- **Адрес/сеть**: `DmDBmb7AEm6xRxkoBYq1mJYqsZP263gmXB53zA2dqjne` (Solana). **Баланс**: 834 000 000 lamports, проверено 14.10 22:05 МСК. Две входящие tx: 02.09.2025 и 27.01.2026; исходящих нет.
- **История приза**: при запуске 0,4 SOL. 27.01.2026 участник сообщества удвоил его до 0,8 (TG и X 2016180204129910898).
- **Источники**:
  - https://solanapuzzles.com/puzzle4 (images/puzzle4.png, 1536×1024);
  - Wayback-копия пропавшей страницы подсказок /puzzle4-1 (20260625004904) → `puzzle4/wb_p41.txt`. Админ потерял файл подсказок при пересборке сайта 15.09.2026;
  - TG https://t.me/+5GYvaO1qGT44Mjdh и x.com/solanapuzzles.
- **Механизм** (восстановлен на решённых #1–#3 и сверен с адресами 3/3):
  - случайная мнемоника из 12 слов, Phantom m/44'/501'/0'/0', без passphrase;
  - в #1–#3: одна ячейка 3×4 = одно слово через смысловую связь (объект, признак, действие, смысл); очевидное слово часто избегается;
  - порядок: #1 построчно, #2 обратно, #3 спиралью.
  - #4 — коллаж Adobe Express, не сетка. Админ: «not a "direct" solution», «Not with simple numbers» (09.01.2026). Word checker для #4 нет (02.09.2026).
- **Что установлено** (13–14.10):
  - решённые seed #1–#3 и правило серии — в `SOLFRESH.md`;
  - видео на странице = ASCII «evident agenda» → по 4-буквенному префиксу evidence (#622) и agent (#39), не подтверждено;
  - Σ = 13058 на #1–#3 не проверяется (суммы 9817/13395/9962) — правдоподобно, но не доказано;
  - метаданные картинок #1–#4 пусты (C2PA/XMP/EXIF Ideogram, без нагрузки);
  - промо-фраза из X 14.09.2026 — декор (checksum невалиден);
  - «That is correct» админа 14.09 относилось к обновлению сайта, а не к ответу.
- **Проверено и отброшено**:
  - M2, M5, M7 (3,5 млн); orders E1/E2 (5,3 млн комбинаций); wide S/NS;
  - R1–R5, анаграммы; hexfix сетки (263 тыс.); SSS-сетки;
  - «evidence agent» парой на всех позициях (~145 тыс. деривизаций);
  - Σ-MITM: 1,38e10 → 550 048 деривизаций;
  - run4: 12 объектов коллажа, 9 порядков × 2 ветки = 6 094 231 деривизация. Всё 0.
- **Что осталось / следующий шаг**: нужен новый сигнал — подтверждение Σ или текстовый ключ, который фиксирует 2–3 слова. Есть непроверенная идея: покадрово посмотреть видео страницы и YouTube QhXQo-h0lwc. Вердикт 14.10 11:05 +04: модель объектов — тупик, PAUSED.
- **Файлы/скрипты**:
  - `/workspace/work/web3auto/puzzle4/`: `derive.py` (сверен на #1–#3), `SOLFRESH.md`, `reasoning.md`, `obj_slots.json`, `run4/`, `fresh/` (mitm.py, slots.py, страницы #1–#3), `wide.py`, `m7.py`, `orders.py`, `audio/`, `video/`;
  - `/workspace/work/web3auto/puzzle4/tg/findings.md` — все реплики админа с датами;
  - журналы `/workspace/work/web3auto/NOTES.md` и `/workspace/projects/1d1b2b74-1bb5-46d6-83be-2f104126e3ac/.hark/journal/2026-10-1{2,3,4}.jsonl`.
- **Проекты Hark и статус**: «наука леарн выплаты» (1d1b2b74), отменено Ильёй 14.10 22:00. У стратега «работа» — ярус 3.
- **Оценка шансов**: низкие. По web3surf-скану 12.10 это единственный живой пазл с автоматической выплатой и нулевыми тратами, но это загадка, а не математика.

### B10. LuckyLurker Vault #2 — 1,0 BTC
- **Адрес/сеть**: `bc1qnepv9pcnqvndux9h9mcaxvk6u993rc0lew9fpp` (BTC). Профинансирован 12.08.2026, tx 2314d7f0…f198. **Баланс**: 100 000 000 сат, трат 0. Проверено 14.10 22:05 МСК и 15.10 01:45 МСК.
- **Источники**:
  - https://luckylurker.com/bitcoin-vault-2/ и https://luckylurker.com/bitcoin-vault-2-is-live-1-btc-prize/ — за SG-капчей, читать браузером;
  - bitcointalk 5577554 — последний пост #10 от 11.09, «Coming soon...»;
  - X @LuckyLurkerPaul — последний пост 08.10, «postponed». Автор Paul Jones.
- **Механизм** (по Vault #1): Electrum SegWit seed v100 без passphrase, путь m/0'/0/1 (второй receive-адрес). Подсказки сначала получали подписчики; публично они вышли 17–22 марта. 4 подсказки указывали на курсивные слова в обзорных статьях сайта.
- **Что установлено**: браузерная проверка 13.10 19:51 и 21:54 МСК показала «Bitcoin Vault #2 — Postponed Until Further Notice… unresolved arrangements with the promotion's sponsor». Даты нет, суммы нет, подсказок 0. Платной подписки нет, есть только бесплатная форма email.
- **Проверено и отброшено**: решать пока нечего. Запись инвентаря 12.10 «hints start today» устарела.
- **Что осталось / следующий шаг**: ждать перезапуска. 14.10 15:19 МСК адрес mak777777uh@gmail.com подписан на «Get Vault #2 updates» (Brevo/sibforms); подтверждающего письма не было. Если подсказки выйдут, это сразу ярус 1: oracle.py готов.
- **Файлы/скрипты**: `/workspace/work/luckylurker2/NOTES.md`, `oracle.py` (BIP39 84/49/44 с индексами 0–19 и Electrum segwit m/0'/0/0–19), копии страниц `vault2_page.md`, `vault2_islive_page.md`, `bitcointalk_sep2026plus.md`.
- **Проекты Hark и статус**: «LuckyLurker Vault #2: 1 BTC» (6ad2f71d-98c4-4cb1-be9a-d2bc49ae1ac2). Сторож eabd2a4e раз в 6 ч проверяет баланс, X, bitcointalk и Gmail; по журналу активен на 14.10. У стратега — ярус 3, «ждать».
- **Оценка шансов**: 0 сейчас. Риски: 1 BTC остаётся под контролем автора и может быть отозван или перезапущен с меньшим призом; после запуска будет гонка с подписчиками.

### B11. Bitaps Shamir SSS — 1,00016775 BTC
- **Адрес/сеть**: `bc1qyjwa0tf0en4x09magpuwmt2smpsrlaxwn85lh6` (BIP84 m/84'/0'/0'/0/0). **Баланс**: 100 016 775 сат, трат 0. Проверено 14.10 22:05 МСК, перед этим 14.10 17:03 +04.
- **Источники**:
  - https://bitaps.com/mnemonic/challenge (копия `challenge.html`);
  - код jsbtc master (последний коммит 30.09.2020), `src/functions/shamir_secret_sharing.js`, `bip39_mnemonic.js`;
  - OCP `1-big-prizes/bitaps-shamir-challenge-1btc`; на GitHub больше 40 issues (2026) с тем же выводом.
- **Механизм**: 3-of-5 Shamir над GF(256); x упакован в 4 бита checksum. Две доли опубликованы (слова — в каталоге).
- **Что установлено** (аудит 13.10):
  - GF(256) (AES 0x11b, генератор 3), Лагранж и pow корректны; x-индексы берутся из отдельного буфера.
  - Утечка 1: `while(q.includes(w))` — 0,27 бита.
  - Утечка 2: `igamc()` вызывает `igam()` без S → ReferenceError → буфер отбраковывается при χ² < 3. P(pass) = 0,139 (замер rtest.py), то есть ≤2,85 бита на буфер.
  - Итого утечка ≤~9 бит, остаток ≥2¹¹⁹.
- **Проверено и отброшено**: слабость, которая свела бы задачу к ≤1e9, в коде не найдена. Баг `continue` в do-while срабатывает с вероятностью ~1e-38 — неважен.
- **Что осталось / следующий шаг**: только третья доля или доказательство, что сама мнемоника сгенерирована не CSPRNG (данных нет). Регулярные сессии не ставились (решение 13.10).
- **Файлы/скрипты**: `/workspace/work/bitaps_sss/NOTES.md`, `rtest.py`, `challenge.html`, `jsbtc/` (клон).
- **Проекты Hark и статус**: проект d54060b7-9c4a-4ca9-95be-d49e44dd2240, сторож 5b44f3ad. 14.10 22:00 Илья: «do not touch». У стратега — «не брать никогда».
- **Оценка шансов**: ~0 %.

### B15. Fe «Bountiful» — 1,0 ETH
- **Адрес/сеть**: Ethereum, BountyRegistry `0x71fB6afcD98c5BD611712ad4b8D314EF729aa69D` (round 3, май 2026). **Баланс**: 1,0 ETH, nonce 1. Проверено 14.10 22:05 МСК (до этого 12.10). На контрактах игр 0 ETH: приз держит registry.
- **Контракты игр** (deployments/1_25001932.json):
  - Game `0x046a3a49…4623`, Game2D `0xE959e7ec…c7`, GameBitboard `0x5E987b6a…0b06`, GameEnum `0xfb5423aD…272E`;
  - GameMonadic `0x86B7AEce…1a5a1D`, GameNested `0x3dF97896…9F18`, GameTrait `0x85b4d0B3…ccFE`.
  - Более старый деплой — 1_24648127.json (registry `0x78895d44…597a`).
- **Источники**: https://github.com/fe-lang/bountiful (клон, последний коммит 5137aa4 от 11.06.2026), `doc/bounty-hunting-guide.md`, https://bountiful.fe-lang.org.
- **Механизм**:
  - 7 реализаций «пятнашки» стартуют в нерешаемом состоянии (14/15 переставлены). Нужно, чтобы `isSolved()` стало true через баг компилятора Fe или контракта.
  - Выплата: `lock(address)` с депозитом (по умолчанию **0,01 ETH**), затем `moveField` (требует валидный lock через `validateOwnsLock`), затем `claim()`. **Нужны свои ETH на депозит и газ.**
- **Что установлено** (12.10):
  - все 7 игр на стартовой доске, `isSolved = false` (fe_state.py, publicnode);
  - `Adjacency.lean`: все правила ходов на уровне исходника доказаны равными смежности сетки, так что паритет на уровне исходника не ломается.
- **Проверено и отброшено**:
  - fuzz.py: 2 сида × 600 шагов × 7 игр на байт-идентичном байткоде (py-evm), включая индексы вне диапазона и грязный/короткий calldata — 0 расхождений;
  - fuzz2.py: 150 случайных и почти решённых досок × 7 игр × 16 ходов — 0 расхождений;
  - логика registry просмотрена вручную, изъянов нет.
- **Что осталось / следующий шаг**: дифференциальный фаззинг на уровне IR/ABI (aliasing индексов, упаковка `Challenge`: `is_open` 1 бит + `prize_amount` u128), особенно GameBitboard и GameMonadic. Любой локальный эксплойт потребует согласия Ильи на ~0,01 ETH + газ.
- **Файлы/скрипты**: `/workspace/work/bountiful/` (клон, `onchain_*.hex` — runtime-байткод), `/workspace/work/bountiful_fuzz/` (harness.py, fuzz.py, fuzz2.py, логи), `/workspace/work/bountiful_lean/` (Adjacency.lean, Neg.lean, NOTES.md), `/workspace/work/fe_state.py`.
- **Проекты Hark и статус**: `/workspace/projects/b6983d3d-52f5-48f8-9974-b99dc8e31c55/opportunities.md` (12.10): «ON HOLD, parallel project». ID параллельного проекта в файлах не записан. С 12.10 не трогали.
- **Оценка шансов**: низкие (L по инвентарю), но это одна из немногих задач на код и формальные методы.

### B18. seed-phrase.com (MetaNeer Labs) — 0,01 BTC
- **Адрес/сеть**: `bc1q7x3p3rkmkxgf20n3apkccqcmn5mdtsf8zx5227` (BIP84, путь m/84'/0'/0'/0/0). **Баланс**: 1 000 000 сат, 2 tx, не тронут. Проверено 16.10 18:30 МСК (LOG стратега).
- **Источники**: https://seed-phrase.com, https://github.com/metaneer/seed-phrase (репо 2024), https://puzzles.agntn.dev/collections/seed-phrase, YouTube paehCmD14dI.
- **Механизм**: в 2024 выходили датированные подсказки (стихи, эмодзи, картинки, «клубы» с AES-GCM). Слов n ≥ 15: сумма индексов 29045 даёт n ≥ 15.
- **Что установлено** (аудит 15.10):
  - **клуб 14.08.2024 вскрыт**: AES-GCM, пароль «october», соль «salt», KDF = SHA256(pw‖salt)×1000 → слово «sick» (🤢);
  - кандидаты: october (клуб 19.07), jazz/surprise/fake (whatafeeling.png), reveal/expose/uncover (стих 14.07; ссылка onetimesecret уже сгорела), magic (09.08), слово из фавикона (?);
  - видео paehCmD14dI: HSL-цвет по полиномам и скорость воспроизведения 0,25…2,5 → индекс 0..9 (не разобрано).
- **Проверено и отброшено**: систематического перебора не было.
- **Что осталось / следующий шаг**: разобрать цветовой канал видео и фавикон, собрать оставшиеся ~9–12 слов. Ограничение по сумме и checksum пригодятся только в самом конце. Досье стратега стоит в очереди (QUEUE.md).
- **Файлы/скрипты**: `/workspace/projects/b6983d3d-52f5-48f8-9974-b99dc8e31c55/work/sp/` (index.html, whatafeeling.png, illusionsmichael.png, sumofwords.png, SPfavicon-256x256.png, wl.pdf, pylib/); разбор — в `/workspace/projects/b6983d3d-52f5-48f8-9974-b99dc8e31c55/work/puzzle-solvability-audit-2026-10-15.md`.
- **Проекты Hark и статус**: «работа» (b6983d3d), ярус 2 «инсайт по случаю». В INDEX досье строка не заполнена.
- **Оценка шансов**: ~3 % (ярус 3; ярус 2, если найдётся источник оставшихся слов).

### B36. Groestlcoin puzzle — 1000,0001 GRS
- **Адрес/сеть**: `FindKEYLrVaahtkaVRk8KTspRMyWxfUi3i` (Groestlcoin), hash160 956453576444632092713b08f81892b4d24791e6. Монеты лежат с 10.08.2018. **Баланс**: 1000,0001 GRS (chainz.cryptoid.info, 15.10 ~01:45 МСК). Это ≈ $290 при GRS ≈ $0,29 по blockchair; досье 16.10 называет сумму «копейками».
- **Источники**: groestlcoin.org/puzzle (картинка 2048×2048 RGBA), bitcointalk 5137602, Discord Groestlcoin.
- **Механизм**: многоэтапный: картинка → Stegsolve → Морзе → hex → ключ.
- **Что установлено**: этап 1 известен с 2019 и нами воспроизведён. Stegsolve даёт «356ef», Морзе — 64 hex `15D4B9DBC48302F65DC3E055557B5BBF7DB832F43097FC6E648F5E1BE66C63D3`. Как ключ напрямую не подходит. Сообщество застряло на этапе 2 с 2019.
- **Проверено и отброшено** (grs_test.py, 15.10): raw/rev/byte-rev, sha256(hex и str), XOR, ±, × с 0x356ef и повтором «356ef» → hash160 адреса: 0 совпадений.
- **Что осталось / следующий шаг**: дешёвые проверки на ~1 час — Groestl-512/256 (родной хеш монеты) от строки и байтов, AES/XOR с ключами, производными от «356ef», WIF с Groestl-checksum. Дальше нужна идея.
- **Файлы/скрипты**: `/workspace/projects/b6983d3d-52f5-48f8-9974-b99dc8e31c55/work/audit/grs.png`, `grs_small.png`, `grs_test.py` (pure-python secp256k1), `SOLVABILITY_AUDIT.md`; досье `/workspace/projects/b6983d3d-52f5-48f8-9974-b99dc8e31c55/strategy/dossiers/groestlcoin.md` (16.10).
- **Проекты Hark и статус**: проект «Groestlcoin puzzle: 1000 GRS» (f3203026-f501-46ca-93bf-cb85cd7232d6) создан 14.10 13:25; его папки в workspace нет, заметок нет. У стратега вердикт 16.10 11:00: ярус 3, не брать.
- **Оценка шансов**: ~3 %, приз мал.

### B37. QDay «Steal this vault» (Solana)
- **Адрес/сеть**: Solana, программа `22AEUZtxpbi1ReJGrG9SyFob3uHGzZERERyVNp6uV8Y6`. PDA хранилищ на 12.10:
  - `CzTEB1SUozi1mGQWsSXA8b6DX7dZjbuFtTKPraU7AvAz` — 1,0 SOL, создан 09.10.2026 03:38 UTC, **вероятно** challenge-vault;
  - `AkryRVzbmrdr6w4rcWSucdJBSTkDnnM9kr3DP2qqheme` — 0,1 SOL;
  - `E58oxoCKSfJHS9UDD5mPjKeTdWaeZNLKRX3t9c6xSkmk` — 0,008 SOL + 0,2188 USDC.
  - **Баланс**: эти цифры из инвентаря 12.10; с тех пор не перепроверялись. Какой PDA — challenge-vault, **не подтверждено**.
- **Источники**: https://beforeqday.com/challenge, https://beforeqday.com/source. Страница — SPA; копии `ch.html` и `idx.js`. В JS ссылка «Challenge: Real SOL behind nothing but SHA-256».
- **Механизм**: хранилище без приватного ключа (адрес — PDA), снятие идёт по одноразовой хеш-подписи. В idx.js видны параметры `LMS_SHA256_M32_H10` / `LMOTS_SHA256_N32_W4` (RFC 8554). Комиссии и консенсус остаются на Ed25519. По странице, upgrade authority у программы пока есть. Взлом означает подделку LMS или логический баг программы, SDK или верификатора, а не подбор ключа.
- **Что установлено**: запуск 09.10.2026 без аудита. По аудиту 15.10, «сокровищница ни разу не подписывала» — подделывать нечего, остаются только логические баги.
- **Проверено и отброшено**: код всерьёз не ревьюили. В opportunities.md (13.10) и multichain (14.10) стоит вердикт «REJECT-infeasible».
- **Что осталось / следующий шаг**:
  - браузером прочитать условия и подтвердить challenge-PDA;
  - ревью Rust-программы и верификатора: границы q, длина пути Меркла, контрольная сумма LM-OTS, проверки аккаунтов.
  - **Трогать только подтверждённый challenge-vault**: остальные PDA могут принадлежать реальным пользователям. Нужна мелкая комиссия SOL. Эксплойт-tx могут повторить наблюдатели.
- **Файлы/скрипты**: `/workspace/work/inv/qday/ch.html`, `/workspace/work/inv/qday/idx.js`; досье `/workspace/projects/b6983d3d-52f5-48f8-9974-b99dc8e31c55/strategy/dossiers/qday.md` (16.10 13:30).
- **Проекты Hark и статус**: «работа» (b6983d3d). Досье 16.10: ярус 3, «нужен браузер». В STRATEGY.md противоречие: QDay стоит одновременно в ярусе 2 (по аудиту) и в «не брать никогда».
- **Оценка шансов**: 1–3 % (аудит 15.10), приз ~1 SOL.

---

## ЧАСТЬ Б. Живые призовые загадки и квесты вне каталога

Проверено grep'ом 16.10: в `MASTER_CATALOG-b88c70c86c6b.md` нет ни одного из названий ниже (Mapnificent, 13373665/eggdropper, NIST/Valsorda, Tumblecaesar, rectorsquid/Arrow, r/codes).

### Mapnificent Treasure Hunt MTH202610 — $400
- **Адрес/сеть**: не крипта. Приз выплачивает организатор: «This website will contact the winner to deliver the prize». Способ выплаты не указан, KYC не упоминается. **Статус**: ответ отправлен, ждём итогов.
- **Источники**: https://mapnificenceofchina.com/mapnificent-treasure-hunt-mth202610/; правила и подсказки — treasure-hunt и tips-on-how-to-solve-the-riddles-or-puzzle (копии .txt в папке).
- **Механизм**: цепочка из 5 загадок в разных разделах сайта. Метки стоят в KML Google My Maps (`https://www.google.com/maps/d/kml?mid=MID&forcekml=1`), а не в HTML, а на картинках — в левом нижнем углу. Ответ отправляется письмом на mth_admin@mapofcn-dev.org с темой «Mapnificent Treasure Hunt 202610», формат: English name [MTH202610] + URL, по строке на ответ. **Попытка одна**: засчитывается первое письмо.
- **Что установлено/решено**: 5/5. Mogao Caves → Leshan Giant Buddha → Shaolin Temple → картинка «Buddha Jumps Over the Wall» (галерея Rice Culture, #images-10) → Zhu Yuanzhang. В метке последнего — копия первой загадки, цикл замыкается. **Письмо отправлено 13.10.2026 19:11 МСК** с mak777777uh@gmail.com.
- **Проверено и отброшено**: старая картинка 佛跳墙 в галерее Fujian (2025/07) меток не содержит.
- **Что осталось / следующий шаг**: ждать итога (≈01.12.2026) и поста «MTH202610 Answer». На 14.10 10:00 МСК ответа организатора не было. **Повторно не слать и Илье не предлагать.** Следующий выпуск, вероятно, будет MTH202701: прошлые — 202607 и 202610.
- **Файлы/скрипты**: `/workspace/work/mth202610/NOTES.md`, `email_draft.txt`, `kml_*.kml`, `kmlurls.txt`, `checks/list.json`, страницы 202607/202610 (.html/.txt); исходная находка — `/workspace/projects/89da3155-7b64-41d5-9823-4200239c1884/work/hunt/mth/` и `answers/mapnificent_MTH202610.md`.
- **Проекты Hark и статус**: проект 10354a0a (ведёт), охота «оычн» (89da3155) нашла 4/5 меток. Ежедневная проверка Gmail по журналу шла до 14.10.
- **Оценка шансов**: ответ полный, но победителя выбирают среди верных ответов или по первенству (точное правило в NOTES не записано). Исход неизвестен.

### Cardano «13373665 Challenge» (eggdropper / MintMatrix), Ch6 — 12,789 ADA + 4011 egg
- **Адрес/сеть**: Cardano, Ch6 enterprise-адрес `addr1v9ht7ved…` (полный адрес в NOTES не записан; найти в репо или через koios). **Баланс**: 3 UTxO, всего 12,789241 ADA + 4011 egg (koios address_info 13.10.2026). Все пришли с донат-адреса addr1q80dp67…, метаданных нет.
- **Источники**: https://github.com/eggdropper/13373665Challenge (11 коммитов 16–18.04.2022, SOLUTIONS.MD), форк ChewieGumballoni/13373665Challenge (идентичен), IPFS-картинки (логотип QmNjhx…, Ch5 QmcUgS…), @MintMatrix_io.
- **Механизм**: серия Cardano-кошельков, каждый с одной подсказкой. Подсказка Ch6 — только «See through the matrix.» Деривация Icarus/CIP1852, m/1852'/1815'/0'/0/0.
- **Что установлено/решено**:
  - **Ch3 решён и выведен 13.10.2026 14:15 МСК**: подсказка — Caesar −3 от bech32 addr_xsk. 2,8 ADA + 366 egg ушли на адрес Ильи, tx bf9cb40415fef8bf69e82bc51fff302292899fd1ad563aa6bc949810b3fd9267.
  - Ch5 пуст (steghide, пустой пароль). Ch7 — скрипт-адрес, не приз.
  - Автор — команда MintMatrix.io: по метаданным минта яиц «redeemableProperties: True».
- **Проверено и отброшено** (по Ch6): LSB, альфа и хвост PNG логотипа; LSB PNG Ch2; outguess на Ch5 jpg; zero-width в README; метаданные tx; запись в token registry; мнемоники Ch1/2/4/5 на acct 0–2, role 0/1, idx 0–9; транспонированные и диагональные матрицы слов (14 валидных, 0 совпадений); soft-children xvk Ch3/4/5.
- **Что осталось / следующий шаг**: DCT-стего (jsteg/F5) в стегозавре Ch5 JPEG («see-through», рентген); M-clear.png (прозрачный логотип MintMatrix, архив январь 2022) не разобран; «redeemable properties» в архиве mintmatrix.io за 2022.
- **Файлы/скрипты**: `/workspace/work/cardano_egg/NOTES.md`, `icarus.py` (BIP39 → Icarus → CIP1852, сверен на Ch2/4/5), `sweep.py` (ручной CBOR-билдер tx + отправка через Koios, годится для любых Cardano-выводов), `derive.py`, `english.txt`, `img/`, `pub.hex`; ключ Ch3 — только в `.secret/`.
- **Проекты Hark и статус**: мультичейн-охота, задача 98bdbcc9 (`/workspace/work/multichain/NOTES.md`). Ch6 после сессии 13.10 (~35 мин) не возобновлялся. Охоте «оычн» с 14.10 09:34 велено «Cardano/TON-квесты не делать».
- **Оценка шансов**: низкие-средние, приз ≈12,8 ADA. Выплата без посредников: ключ → sweep.py.

### NIST seeds bounty (Filippo Valsorda) — $12 288 (×3 при пожертвовании)
- **Адрес/сеть**: не крипта. Приз гарантирует лично Filippo. Ответ — письмо с пре-сидами на seeds@filippo.io, в теме «ANTISPAM»; первенство по Received-заголовку.
- **Источник**: https://words.filippo.io/seeds-bounty/ (опубликовано 05.10.2023; дата 19.09.2026 — это зеркало vuink.com).
- **Механизм**: найти прообраз SHA-1 для сидов кривых NIST P-192/224/256/384/521. $6 144 — за первый найденный пре-сид, $6 144 — за все пять; втрое больше при пожертвовании US 501(c)(3). Срок не ограничен, отмену объявят за 6 месяцев. Если платить резиденту РФ нельзя по закону, остаётся только пожертвование (наш вывод).
- **Что установлено**: сиды дал Jerry Solinas (NSA) в 1997, он умер в 2023. По письму Solinas Бернстайну 2014: SHA-1 от ASCII «humorous message» со счётчиком, варианты «Give Bob and Jerry a raise» / «Bob and Jerry rule»; код писал Bob Reiter. Сиды бинарных кривых X9.62 содержат «MinghuaQu» (Certicom) и хешами не являются.
- **Проверено и отброшено** (13.10): search.c — собственный SHA-1, ~3,6 млн H/с на ядро.
  - run1: 2 727 фраз × счётчики 0..2999 × разделители, хвосты и бинарные счётчики = 484 086 132 хеша;
  - run2: ещё 2 214 фраз = 393 020 424 хеша;
  - **всего 877 106 556 хешей, 0 совпадений**. Совпадение по 64-битному префиксу покрывает и ~12k целей Filippo (seed − 0..~2400).
- **Что осталось / следующий шаг**: только новая зацепка о точной фразе или формате. Без неё не повторять: охота «оычн» внесла пазл в «ОТБРАКОВАНО» 13.10. Конкуренты с 2023 года гоняют GPU.
- **Файлы/скрипты**: `/workspace/projects/89da3155-7b64-41d5-9823-4200239c1884/work/nist_seeds/NOTES.md`, `search.c`, `search` (aarch64 musl), `gen_phrases.py`, `gen_phrases2.py`, `phrases.txt`, `phrases2.txt`, `seeds15.txt`, `targets_all.txt`, `run1/`, `run2/`.
- **Проекты Hark и статус**: «оычн» (89da3155), отбраковано.
- **Оценка шансов**: низкие (чистое угадывание формата фразы).

### Tumblecaesar (harttrav, r/codes, 2022) — 1000,0037 ALGO
- **Адрес/сеть**: Algorand, `ZUECZQ67…WBYU` (полный адрес в файлах не записан, он есть в посте). **Баланс**: 1000,0037 ALGO, не тронуты (algonode, 13.10.2026; статус аккаунта Offline).
- **Источники**: https://www.reddit.com/r/codes/comments/ux648f/tumblecaesar_an_algorithm_i_created_with_a_prize/; README автора; блог harttraveller.com/Tumbler+Challenge (не найден, стоит искать в Wayback); Discord автора.
- **Механизм**: шифр на Python: Mersenne-«тамблер» (random.Random((i+seed)·T).sample по алфавиту из 62 символов) в несколько слоёв. Шифртекст 175 символов, ordinal_sum = 335475 — точный оракул. Открытый текст по README — CamelCase, из него собирается мнемоника Algorand.
- **Что установлено**: самотест на примере из README проходит, модель шифра воспроизведена (brute.py).
- **Проверено и отброшено**: seed 0…~3 800 000 × слои 1–16 с фильтром CamelCase + сумма — не найдено (≈1100 seed/с на ядро).
- **Что осталось / следующий шаг**: найти подсказки о seed (Wayback блога, Discord); или расширить seed до 10⁷–10⁸, слои до 40 и ослабить фильтр (это часы-сутки CPU, правило «без тупого перебора» требует сильной гипотезы). Для вывода нужен Algorand-адрес Ильи — его в списке выплатных адресов нет, спросить.
- **Файлы/скрипты**: `/workspace/projects/89da3155-7b64-41d5-9823-4200239c1884/work/hunt/tumble/brute.py`, логи `a.log`–`d.log`; журнал `/workspace/projects/89da3155-7b64-41d5-9823-4200239c1884/work/hunt/NOTES.md` (сессии 13–15).
- **Проекты Hark и статус**: «оычн» (89da3155). Остановлено 13.10: «перебор дальше нерационален без подсказки».
- **Оценка шансов**: низкие без подсказки о seed. Оракул точный, приз автоматический (по ключу).

### Мелкие и неподтверждённые живые (по журналу «оычн», 13.10.2026)
| Название | Приз | Статус по нашим данным | Ссылка | Файлы |
|---|---|---|---|---|
| rectorsquid Arrow Puzzle (2012) | $50 PayPal | по комментарию 2013 жив, не решён; клавиатура 3×3, цепочки стрелок и 8 направлений не подошли («dave» — не ответ) | https://blog.rectorsquid.com/arrow-puzzle/ | `/workspace/projects/89da3155-7b64-41d5-9823-4200239c1884/work/hunt/arrow/` |
| r/codes 1tk3up2 «$500 first to solve» | $500 | не решён с мая 2026, 97 комментариев, подсказки расплывчатые; низкий приоритет | https://www.reddit.com/r/codes/comments/1tk3up2/ | — |
| r/codes 1ojeu3c | $5 | не решён, транспозиция с цифрами | https://www.reddit.com/r/codes/comments/1ojeu3c/ | — |
| purebasic.fr t=85211 | 600 EUR | статус неизвестен: Cloudflare 403 и для fetch, и для browser, в Wayback пусто | https://www.purebasic.fr/english/viewtopic.php?t=85211 | — |

---

## ЧАСТЬ В. Проверено и мертво (не тратить время)

В таблицу вошло только то, чего нет в разделах 6 и 7.3 каталога. Даты — дни наших проверок.

| Название | Приз | Почему мёртв | Дата проверки |
|---|---|---|---|
| Arweave Weave #12 | 400 AR | баланс 0, swept (last_tx gx0Ws1TP…); **каталог 7.2 ошибочно считает открытым** | 12.10.2026 (handoff 14.10 подтверждает) |
| FTPK Season 2 | 305,93 USDT | USDT = 0, swept; **ошибка в каталоге 7.2** | 12.10.2026 |
| LogicBeach «Powerful Moss» (Base) | 0,55 ETH | контракт пуст, claimed Oct 2026; **ошибка в каталоге 7.2** | 12.10.2026 |
| Pindar bitGAN Act 1 | 1 NFT | 0 ETH на адресе; владение NFT не проверено — скорее мёртв | 12.10 и 14.10.2026 |
| Q-Day Prize (Project Eleven) | 1 BTC | выдан 24.04.2026 (Lelli), закрыт; это не QDay vault | 16.10.2026 |
| cuddlefish «5 BTC PEM» (bitcointalk 30122) | 5 BTC | ~250 неизвестных бит ключа, хеш проверяет только полный ключ; автор неактивен с 2018 | 13.10.2026 |
| «1 BTC GPS pole» (1CaF544…, topic 5280036) | 1 BTC | монета Casascius 2012 года, автор не владеет — чужие деньги | 13.10.2026 |
| «k2=k1/2» (1FvUkW8…, topic 5321454) | 3350 BTC | кит с поддельными подписями, система для d вырождена — чужие деньги | 13.10.2026 |
| Crack the Vault (topic 5592594) | — | bc1qpt40… = 0, решён 30.08.2026 | 14.10.2026 |
| HIDDEN IN PLAIN SIGHT | 500 000 сат | bc1qttvjast… потрачен 03.2026 | 14.10.2026 |
| Algoriddle (Algorand) | 100 ALGO | KFGWR5LV… = 0, решён 08.12.2019 | 13.10.2026 |
| TRON Foundation bounty | 6 666 TRX | TQE8ymfa… = 0 | 13.10.2026 |
| Kripto Lore KRIPTOOCT21 | — | 0xa4c37379… — пыль 0,00035 ETH | 13.10.2026 |
| antipalos cardano-puzzle | — | баланс 0 | 13.10.2026 |
| sudoku-bounty (Cardano, addr1w8s53ha6…) | ADA | 0, открытых задач нет; следить, если появятся | 14.10.2026 |
| Crack The Seed V4 (cracktheseed.com) | $300 SOL | вход только через HackForums, хранилище 0 SOL | 13–14.10.2026 |
| allabtai «Follow the White Rabbit» (Solana USDC) | — | быстрые раунды, вероятно забран (не подтверждено) | 12 и 14.10.2026 |
| Roble Regal «Trading Handbook» (3CKkHm2n…) | 20,39 BTC | охота закрыта 08.07.2026, книга снята, «хранилище» привязано к истечению домена (продлён до 02.07.2027), жалобы на скам | 13.10.2026 |
| Sound Money vol.2 (omg21btc) | 1 000 000 сат | решён (bc1qc79k9…: funded = spent) | 13.10.2026 |
| craigraw students puzzle | 1,6M сат | выведен или украден 04.09.2026 | 13.10.2026 |
| bitcointalk 5585867 «16.5 BTC lost wallet» | 0,5 BTC награды | решён | 13.10.2026 |
| ТОПЛЕС «Цикада 3301» | 67 000 ₽ | решён 04.07.2026 (@dorzon) | 14.10.2026 |
| Eildosa 1 ETH cypher (r/codes mtkrra) | 1 ETH | на кошельке 0,00018 ETH, забран | 13.10.2026 |
| Mouldy_Soul 0.1 ETH (cryptoauthors) | 0,1 ETH | сайт продаётся, пазл мёртв | 13.10.2026 |
| Navcoin cryptoriddle (r/codes 10va85t) | $170 | claimed | 13.10.2026 |
| encryption-thing-v1 (r/codes) | A$20 | взломан в июле 2026 | 13.10.2026 |
| Ram Rachum homebrew (2013) | $50 | интерфейс отдаёт 404, решить нельзя | 13.10.2026 |
| Red Fern Valley (r/ARG) | 1 ETH | страница стала рекламой другой игры | 13.10.2026 |
| bitcoinriddle.com (2013) | 0,1–0,2 BTC | все 15 решены, адреса 0 | 13.10.2026 |
| Coin_Artist «Legend of Satoshi» | 3,5–4,87 BTC | балансы 0, решено | 13.10.2026 |
| bitcointalk 2145129 (zeroth) | 0,005 BTC | решён в 2017 | 13.10.2026 |
| agntn coin-games / zden decred-autonomy / quizchain2-77 | — | 3/3 забраны 2017–18 / решён 2017 / решён 2019 | 14.10.2026 |
| HashBid «Frontier week» (0x35e57f2b…) | 0,106 ETH | гринд lowest-hash, 1 % от bonusFund за раунд, нужен свой газ | 12.10.2026 |
| Puzzleth quests | — | только testnet (Base Sepolia / Sepolia) | 12.10.2026 |
| Qairos «Break the Curve» | — | «points only», контракты не задеплоены | 12.10.2026 |
| KOAN (Solana) | токен | у токена нет рынка, судья — сервер | 12.10.2026 |
| Dankrad RSA bounties | — | официально закрыты | 12.10.2026 |
| craigmayhew «33 = a³+b³+c³» | — | решён 2019, контракт «42» не задеплоен | 12.10.2026 |
| IMD SOREN onchain hunt | SORN | каждая попытка сжигает 100 SORN — это трата | 14.10.2026 |
| Sarpoy (Solana), Bear Trap (Base) | — | платные подсказки и попытки | 12–13.10.2026 |
| DeMath (Base), Certora CTF Endless | — | жюри или выплата вне блокчейна / в DEMATH | 12.10.2026 |
| elevbit-ai lottery-yourtoken | — | призовой пул пуст | 13.10.2026 |
| G-Research GRiddles Series C #2 | £1000 розыгрыш | требуется гражданство, ответы ИИ запрещены, приз разыгрывается — не для нас (Series B #4 решён 02.10) | 13.10.2026 |
| bitcoinpuzzles.io (кроме #139) | — | призы в баллах платформы; Pinball 0, Million Show и Misterioso потрачены | 13.10.2026 |

Не проверены до конца (упомянуты в журналах без баланса): DecrypTON (TON, 24 загадки, платные подсказки), Zenon treasure hunt — `/workspace/work/multichain/NOTES.md`, 13.10.

---

## Источники этого раздела (все прочитаны 16.10.2026)
- `/workspace/work/pc_handoff/PUZZLES_HANDOFF.md` (14.10 22:15), `/workspace/work/pc_handoff/bal_2026-10-14.txt`
- `/workspace/projects/b6983d3d-52f5-48f8-9974-b99dc8e31c55/work/puzzle-solvability-audit-2026-10-15.md`, `…/work/puzzle_solvability_audit_2026-10-15.md`, `…/work/audit/SOLVABILITY_AUDIT.md`
- `/workspace/projects/b6983d3d-52f5-48f8-9974-b99dc8e31c55/strategy/` (STRATEGY.md, LOG.md, QUEUE.md, dossiers/INDEX.md, groestlcoin.md, qday.md), `…/opportunities.md`
- `/workspace/work/puzzle-inventory-2026-10-12.md`, `/workspace/work/web3surf-puzzles-2026-10-12.md`, `/workspace/work/ocp_check_2026-10-12.txt`
- `/workspace/work/multichain/NOTES.md`, `/workspace/projects/89da3155-7b64-41d5-9823-4200239c1884/work/hunt/NOTES.md` и `finds.md`
- Папки пазлов, перечисленные в записях выше.

Файл: `/workspace/projects/aa5ddde6-45de-46be-b0aa-6bd4db202e32/work/catalog_parts/g6.md`

---

# ═══════════════════════════════════════════════════════════════════
# КОНЕЦ КАТАЛОГА
# ═══════════════════════════════════════════════════════════════════
