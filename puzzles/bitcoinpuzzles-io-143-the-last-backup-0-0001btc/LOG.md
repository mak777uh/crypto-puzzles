# LOG.md — журнал «bitcoinpuzzles-io-143-the-last-backup-0-0001btc»

> Формат: см. `../../AGENT_INSTRUCTIONS.md`. Записи добавляются в конец; чужое не затирать.

## 2026-10-19, 08:49 UTC — Qoder Desktop (Windows) — заведение папки и фиксация разбора #143
- Агент: Qoder (desktop-агент Qoder, Windows, сессия `ae64fdaf`), бронь `bitcoinpuzzles-io-143-the-last-backup-0-0001btc` взята 2026-10-19 08:49 UTC (TTL 120 мин).
- Делал: переносил результаты разбора пазла #143 «The Last Backup» из временной папки `anime-seed-phrase-puzzle-0-2btc` (туда они попали при идентификации BLM) в отдельную папку пазла по протоколу; перепроверил он-чейн и страницу.
- **Он-чейн (mempool.space, 2026-10-19):** адрес `1LATz4tnX6DSBPqkZEV7NSGvHEMLTjBGtt`.
  - `funded_txo_count=1`, `funded_txo_sum=10 000 sat`, `spent_txo_count=0`, `spent_txo_sum=0`, `tx_count=1`, mempool пуст. Приз жив.
  - Funding tx `885f238b98937a0bc18675541d59d6b9bef9b69593d8532f3654a667db788fe3`, блок **963675**, 2026-08-23 04:23:36 UTC.
  - Это **батч-выплата на 22 выхода** (наш — vout #19, 10 000 sat), а не адресный перевод автора. В выходах только p2wpkh/p2sh/p2pkh, **OP_RETURN нет** → подсказок в транзакции нет. Первый вход — `bc1qnnpqvue0w38nulh099pcq5ca0ge0tfg544awyg`.
- **Страница пазла** (https://bitcoinpuzzles.io/en/puzzles/143, сохранена `data/bp_143.html`):
  - автор **Alexandre**, уровень «Caçatal Iniciante», публикация 08/16 03:54; статус Active.
  - витрина: **92 930 CB ≈ US$37** (баллы платформы, отдельно от BTC на адресе).
  - на странице 12 подсказок (платные, текст без логина не отдаётся), комментарии и отзывы подгружаются динамически.
- **Файл-загадка:** `data/last_backup_143.png` — 3 431 826 Б, PNG 1537×1023 RGB, sha256 `191ceb2129df9c8a4f6d1b302bdb6f3150333783937776c324bf8ac920257687`.
  - Чанки: IHDR, **caBX (24 910 Б)**, 104×IDAT, IEND; 0 байт после IEND; распакованный IDAT ровно 4 718 076 байт; лишнего zlib-потока нет.
  - caBX извлечён в `data/last_backup_caBX.bin`, sha256 `401fd80366063f1433725542a90c7d976db615e76430d00b069f3d704ca19e4d`.
- **C2PA/JUMBF:** claim generator — OpenAI Media Service, **gpt-image 2.0**, `trainedAlgorithmicMedia`; created/signed 2026-07-29; сертификаты Trufo; `c2pa.hash.data` с exclusions start=33 length=24922, alg sha256, hash `78da7b50…df310`. Текста промпта/seed в манифесте нет.
  - Проверка `c2patool v0.28.2`: `asset hash error, name: jumbf manifest, error: hash verification( Hashes do not match )`, `validation_state: Invalid`. То есть **served PNG изменён/перекодирован после подписи OpenAI** — LSB-слой мог быть уничтожен.
- **Визуальный разбор** (`data/lb_*.png`): тёмный фэнтези-коллаж, гигантский золотой Bitcoin на циферблате, «O TEMPO ESTÁ ACABANDO!», табличка **SECRET** внутри M слова TEMPO, шестерни, молнии, руины, звёздное небо, карта Португалии внизу справа, «Caution» камнями внизу слева.
  - Стрелки часов ≈ **10:07:38**; аннотации: **ω = 10** (у 10), **λ** (≈ у 8), **x3** (у 3), **−ζ** (у 4).
  - high-pass / invert / CLAHE / residual / 2D FFT / block-noise — скрытых оверлеев не выявили.
- **Стего-негативы (анализ, не перебор):**
  - LSB-плоскости 0–7 по R/G/B: нагрузки нет; ложные «магии» (gz/jpg/zip) валидацию не проходят.
  - OpenStego sequential: заголовка `OPENSTEGO` нет ни при 1–8 битах/канал, ни в порядках RGB/BGR/GRB, ни на разных битовых смещениях.
  - Данных после IEND нет; дополнительного zlib-потока нет.
  - OpenStego RandomLSB: ~40 кандидатных паролей — все отрицательные (эмуляция `java.util.Random`, MD5→15 hex; `tools/try_openstego.py`).
- **Публичная механика (из описания/комментариев):** ответ — 12 английских слов (BIP39) + «старый инструмент» и паттерн; заявлен третий слой — скрытое аудио (Audacity/спектрограмма); «Open ST» с высокой вероятностью = OpenStego; три фрагмента/слова остаются сцепленными; в компонентах «5, audio, code»; индексы 1400/1401 → BIP39 `puzzle`/`pyramid` (1-based, сверено с `bip39-english.txt`).
- **Результат:** пазл не решён, ключа нет. Прогонов перебора не запускалось, ось не регистрировалась. Приз — 0,0001 BTC; приоритет низкий.
- **Артефакты:** `data/last_backup_143.png`, `data/last_backup_caBX.bin`, `data/last_backup_preview.png`, `data/lb_*.png` (21 файл), `data/lb_lsb_bits.bin`, `data/bp_143.html`, `data/SOURCES.md`, `tools/try_openstego.py`.
- **Ссылки:** https://bitcoinpuzzles.io/en/puzzles/143 ; https://mempool.space/address/1LATz4tnX6DSBPqkZEV7NSGvHEMLTjBGtt ; https://mempool.space/tx/885f238b98937a0bc18675541d59d6b9bef9b69593d8532f3654a667db788fe3
- **Ограничения:** транзакций нет; ключей/seed нет; ничего не публиковалось. Если ключ появится — только лично Илье.
