# LOG — Trithemius «Wealth in Poetry»

## 2026-10-17, 14:15–14:50 МСК — Hark (проект «Trithemius CSP», песочница 2 CPU, общая с другими задачами)
- Делал: свёл остаток BIP39×GPS-перебора (pos_i = S + 10·i + d_i) к задаче с ограничениями на цифры d_i (храню цифры, а не только слова). Ограничения: lat<90; два формата координат — F1 DD.dddd/DD.dddd и F2 DD.dddd/1DD.ddd (долгота ≥100°); суша (global-land-mask, любая из 4 комбинаций полушарий, клетки 0,1°); приоритет «лендмарк у населённого пункта» — клетка 0,1° с городом ≥15 тыс. (GeoNames cities15000); BIP39-чексамма; дедуп мнемоник.
- Размер остатка (только незакрытые единицы s26/s27, V16+V0), all-BIP39 по цифрам:
  - без ограничений 1,33e9; lat<90 1,20e9; суша F1∪F2 1,15e9 (≈7,2e7 с чексуммой) — суша режет лишь ~13%, перебор целиком ≈36 ч.
  - города ≥15k, та же клетка 0,1°: 2,8e7 all → 1,74e6 checksum; минус клетки ±0,1° городов ≥200k (пройдены 13.10) → **1 790 210 уникальных checksum-валидных** (V16 513 453; V0 1 276 757).
  - шире: ≥15k ±0,15° — 9,9e6 checksum (~5 ч); ≥100k ±0,35° — 9,6e6; ≥1M ±0,55° — 2,7e6.
- Оракул ускорен (fastoracle.py: общие префиксы путей, ≈1,2× к oracle.py; те же 6 путей m/44'/0'/0'/0/0,0/1,1/0; m/0/0,0/1; m/0'/0/0; сжатый+несжатый P2PKH, пустая пассфраза; самотест abandon×11 about → 1LqBGS… OK).
- Прогон 1 (14:15–14:30, лимит 870 с): V16-часть яруса 1 — проверено 478 500 из 513 453, скорость 549/с на 2 CPU (CPU делили с чужими seg0perm.py). **Совпадений с 1K4ez… нет.**
- Остаток яруса 1: ≈1,31e6 (≈40 мин, 3 прогона по 15 мин). Дальше — только с согласия Ильи.
- Артефакты: tools/space.py, tools/tiers.py, tools/enum_t1.py, tools/fastoracle.py, tools/run_cands.py; кандидаты/прогресс в песочнице /workspace/work/trith_csp/ (t1_cands.txt 1,79e6 строк hex, t1_cands.txt.prog).
- Источники: статья https://medium.com/coinmonks/securing-bitcoin-seed-phrases-in-stories-d8eb43a02254 ; адрес https://mempool.space/address/1K4ezpLybootYF23TM4a8Y4NyP7auysnRo ; GeoNames cities15000 https://download.geonames.org/export/dump/ ; global-land-mask (PyPI).

## 2026-10-17, 14:52–15:02 МСК — Hark (проект «Trithemius CSP», песочница 2 CPU)
- Поправка к записи выше: ярус 1 = **1 276 757** уникальных checksum-валидных мнемоник (V16 513 453 + V0 763 304); «1 790 210» и «V0 1 276 757» — ошибка (выводился накопительный счётчик).
- Делал: с «да» Ильи (14:52) добил остаток яруса 1 — прогон 2: 798 257 мнемоник за 588 с (1 357/с на 2 CPU), возобновление по чанкам из t1_cands.txt.prog; проверено покрытие: все 2 554 чанка закрыты.
- Результат: **ярус 1 закрыт полностью, 1 276 757 из 1 276 757 — совпадений с 1K4ezpLybootYF23TM4a8Y4NyP7auysnRo нет** (пути m/44'/0'/0'/0/0,0/1,1/0; m/0/0,0/1; m/0'/0/0; сжатый+несжатый P2PKH; пустая пассфраза).
- Вывод: GPS-правило с лендмарком в клетке 0,1° города ≥15k (кроме уже пройденных ±0,1° городов ≥200k) на носителях V16/V0 — отрицательно. Полный остаток (~1,15e9 all ≈ 7,2e7 checksum, ~15–36 ч) по решению Ильи не запускается. Следующий ярус при желании: города ≥15k ±0,15° ≈ 9,9e6 checksum (~2–5 ч).
- Артефакты: tools/run_cands.py (обновлён: пропуск закрытых чанков); данные в песочнице /workspace/work/trith_csp/.

## 2026-10-17 18:56 — Big Pickle (big-pickle / OpenCode, Windows) — сбор данных в пустую папку
- Делал: массовый обход README → источники; попыток 8, сохранено 6 в `data/`.
- Успех (6): 00_README.md; 01_leads.md; 02_tested.md; 03_0.03-btc-coinmonks-puzzle.html; 04_README.md; 05_Wealth_in_Poetry.html
- Отказ (2): https://github.com/floflo777/open-crypto-puzzles [FAIL: IncompleteRead(327680 bytes read) ]; https://medium.com/coinmonks/securing-bitcoin-seed-phrases-in-stories- [FAIL: <urlopen error [SSL: WRONG_VERSION]
- Артефакты: `data/SOURCES.md` + скачанные файлы.
- Проверено: да (HTTP-статус/байты); содержательная разборка — следующим шагом.

## 2026-10-18, 09:52 — OCP Sync (Qoder Desktop, Windows) <!-- ocp-snapshot:19644e58 -->
- Делал: обогащение из внешнего репозитория [open-crypto-puzzles](https://github.com/floflo777/open-crypto-puzzles) — раскладка дельты снапшота `19644e58` (клон `_sources/ocp/`, реестр `_sources/OCP_SNAPSHOT.md`). Протокол: `claims acquire/heartbeat/release` по `wealth-in-poetry-0-03btc`. Прогонов/переборов не запускали, статус пазла и балансы не меняли, чужие файлы не перезатёрты (копии лежат отдельными деревами `data/ocp/` и `tools/ocp/` с provenance).
- Результат: перенесено 2 файлов данных → `data/ocp/`, 0 кода → `tools/ocp/`,0 тяжёлых (>250 КБ) оставлены в клоне — указатель `data/ocp/_HEAVY.md`. Зеркал, уже лежащих в базе, пропущено: 3. Статус по OCP: `open`.
- Артефакты: `2-mid-prizes/wealth-in-poetry-0-03btc/clues/author-posts.md`, `2-mid-prizes/wealth-in-poetry-0-03btc/puzzle.json`
- Ссылки/доказательства: https://github.com/floflo777/open-crypto-puzzles/tree/19644e58e50721f8469680f2edcba1daa0697630/2-mid-prizes/wealth-in-poetry-0-03btc ; полная дельта — `_sources/ocp_sync_2026-10-18/delta_report.md`.

## 2026-10-18, 10:25 — OCP Sync (Qoder Desktop, Windows)
- Делал: служебная запись **без прогона** — транслирую инсайт из закрытого 18.10 пазла Genesis Block Wallet (перенесён в `solved/caesarcoder-genesis-block-wallet-puzzle-947ksats`) на этот пазл.
- Гипотеза «rounds-ось»: решение genesis было не в стандартных настройках KDF — **PBKDF2-HMAC-SHA512 rounds = 181 505 и 200 913 вместо 2 048** (числа кодируют время 18:15:05 UTC и дату 2009-01-03 генезис-блока), при пассфразе «Satoshi Nakamoto». Наш пайплайн здесь жёстко фиксирует стандарт: `tools/fastoracle.py:27` — `hashlib.pbkdf2_hmac('sha512', …, b'mnemonic', 2048)` (и selftest на «abandon×11 about»).
- Следствие: полученные здесь нули корректны как «при rounds=2048 совпадений нет», но **не покрывают** пространство нестандартных rounds/соли — это ограничение интерпретации прежних негативов, а не новая ось перебора. Их собственный GPU-поиск тоже встал на 30 000 раундов (см. `data/ocp/README.md` genesis-папки), т.е. перебор по rounds вверх — это взрывной рост цены заCandidate, а не «ещё один заход».
- Что делать (бесплатный шаг): прочитать генератор/оракул пазла и подсказки автора на явные упоминания rounds / iterations / salt / «Electrum vs BIP39»; при неясности — вопрос автору только по решению куратора. **ПРОГОН НЕ ЗАПУСКАТЬ**: по `AGENT_INSTRUCTIONS.md` п.4 перебор допускается только по оси, суженной инсайтом, и требует отдельного ОК Ильи; «попробовать другие rounds» само по себе таким инсайтом не является.
- Артефакты: не создавались (запись текстовая).
- Ссылки: `solved/caesarcoder-genesis-block-wallet-puzzle-947ksats/LOG.md` (запись 10:05), https://github.com/floflo777/open-crypto-puzzles/pull/44 ; `_sources/ocp_sync_2026-10-18/delta_report.md`.
