# LOG — BLM Brave New World (0,20107284 BTC)

## 2026-10-17, 14:16–14:38 MSK — Hark (проект «BLM Brave New World: 0,201 BTC», песочница Hark, 2 CPU)
- Представление: агент Hark, отдельный проект под проверку Electrum v2. До меня LOG.md в папке не было; README от 17.10 00:00 не менялся.
- Баланс: 1KfZGvwZxsvSmemoCmEV75uqcNzYBHjkHZ — 20 107 284 sat, 5 входящих, 0 трат (mempool.space API, 17.10 14:17 MSK). Приз на месте.
- Делал: оракул Electrum v2 (new-seed). Валидность: HMAC-SHA512(key "Seed version", мнемоника) hex-префикс 01 (standard) / 100 (segwit) / 101 (2FA). Сид: PBKDF2-HMAC-SHA512(мнемоника, "electrum"+passphrase, 2048). Адреса: standard m/0/0..9 и m/1/0..1; segwit/2FA m/0'/0/0..9 и m/0'/1/0..1. Сравнение hash160 сжатого и несжатого ключа с целью (P2PKH).
- Сертификация оракула: тестовый вектор Electrum "wild father tree … identify" → bip32_seed aac2a6302e48577a… (совпал); "cycle rocket west … song" → 1NNkttn1YvVGdqBW4PR6zvc3Zx3H5owKRf (m/0/0) и 1KSezYMhAJMWqFbVFB2JshYg69UpmEXR4D (m/1/0) — совпали. Планted-target тест раннера находит, негативный контроль против цели — нет.
- Главное отличие от прежних BIP39-прогонов: у Electrum v2 нет BIP39-checksum, поэтому все «хвостовые checksum-слоты» здесь — свободные слова, а отсев идёт по префиксу (~1/228).
- Результат (passphrase пустая, все 0 совпадений):
  - F1, 12 слов = каркас позиций 1–12: subject {camera|twin} tower mask police * liberty * eye black pyramid {vote|debate}, слоты 6 и 8 = все 2048 → 16 777 216 кандидатов, 74 017 валидных v2-сидов, 136 с. 0.
  - F2, 13 слов (длина сидов Electrum 2.0–2.6): то же + moon → 16 777 216, 74 002 валидных, 146 с. 0.
  - F3, 18 слов: позиции 1–5,7,9–13,16,17 фикс., слоты 6,8,14,15,18 из пула-15 (welcome brave world peace end one more real order proof first food time stock power), варианты camera/twin × vote/debate → 3 037 500, 13 106 валидных, 35 с. 0.
  - F4, 21 слово: позиции 1–20 (19 glove, 20 {apple|second}), слоты 6,8,14,15,18,21 из пула-15, варианты ×8 → 91 125 000, 399 831 валидных, 720 с. 0.
  - H11 в Electrum v2: 256 наборов «по слову из каждой из 12 строк WELCOME TO THE» в порядке строк → 2 валидных. 0.
- Old-Electrum v1 по каркасу невозможен: camera, liberty, police, pyramid, vote нет в словаре v1 (ocp/data/format-fork.json). 12-словные v1-наборы уже закрыты OCP (~3·10⁷); правдоподобного 24-словного v1-набора из досье нет — не гонял.
- Не гонял (дольше 15 мин, нужна оценка/решение Ильи): Electrum v2 на 2 фиксированных 12-словных наборах OCP, все порядки — по 479 001 600 (~65 мин каждый на 2 CPU); 13-словный пул OCP, все 12-из-13 и порядки — 6,2·10⁹ (~14 ч, только GPU); 24 слова (9 слотов из пула) — 3,8·10¹⁰, не перебирается.
- Вывод: Electrum v2 на каркасе сообщества (12/13/18/21 слово) и на H11 закрыт, 0. Шанс пазла не изменился (≤1–3%); вопрос — во входных словах, не в формате.
- Артефакты: tools/ev2run.py (раннер+оракул Electrum v2, возобновляемый), data/ev2_f1_12.json, ev2_f2_13.json, ev2_f3_18.json, ev2_f4_21.json, ev2_h11.json, ev2_runs.log.
- Ссылки: https://mempool.space/address/1KfZGvwZxsvSmemoCmEV75uqcNzYBHjkHZ ; формат Electrum seed: https://electrum.readthedocs.io/en/latest/seedphrase.html

## 2026-10-17, 14:52 MSK — Hark (проект «BLM Brave New World: 0,201 BTC»)
- Решение Ильи: BLM остановлен. Прогоны Electrum v2 по фиксированным 12-словным наборам OCP (~65 мин каждый) и 13-пулу НЕ запускались. Итог сессии — запись выше (Electrum v2 на каркасе 12/13/18/21 + H11: 0; приз на месте). Новой работы нет.

## 2026-10-18, 09:52 — OCP Sync (Qoder Desktop, Windows) <!-- ocp-snapshot:19644e58 -->
- Делал: обогащение из внешнего репозитория [open-crypto-puzzles](https://github.com/floflo777/open-crypto-puzzles) — раскладка дельты снапшота `19644e58` (клон `_sources/ocp/`, реестр `_sources/OCP_SNAPSHOT.md`). Протокол: `claims acquire/heartbeat/release` по `blm-brave-new-world-0-2btc`. Прогонов/переборов не запускали, статус пазла и балансы не меняли, чужие файлы не перезатёрты (копии лежат отдельными деревами `data/ocp/` и `tools/ocp/` с provenance).
- Результат: перенесено 8 файлов данных → `data/ocp/`, 3 кода → `tools/ocp/`,1 тяжёлых (>250 КБ) оставлены в клоне — указатель `data/ocp/_HEAVY.md`. Зеркал, уже лежащих в базе, пропущено: 1. Статус по OCP: `open`.
- Артефакты: `1-big-prizes/blm-brave-new-world-0-2btc/README.md`, `1-big-prizes/blm-brave-new-world-0-2btc/analysis/leads.md`, `1-big-prizes/blm-brave-new-world-0-2btc/analysis/tested.md`, `1-big-prizes/blm-brave-new-world-0-2btc/clues/author-posts.md`, `1-big-prizes/blm-brave-new-world-0-2btc/data/candidate-regions.json`, `1-big-prizes/blm-brave-new-world-0-2btc/data/format-fork.json`, `1-big-prizes/blm-brave-new-world-0-2btc/images/02-format-fork.svg`, `1-big-prizes/blm-brave-new-world-0-2btc/puzzle.json`, `1-big-prizes/blm-brave-new-world-0-2btc/tools/fig_format_fork.py`, `1-big-prizes/blm-brave-new-world-0-2btc/tools/fig_regions.py`, `1-big-prizes/blm-brave-new-world-0-2btc/tools/oracle.py`
- Ссылки/доказательства: https://github.com/floflo777/open-crypto-puzzles/tree/19644e58e50721f8469680f2edcba1daa0697630/1-big-prizes/blm-brave-new-world-0-2btc ; полная дельта — `_sources/ocp_sync_2026-10-18/delta_report.md`.

## 2026-10-18, 10:25 — OCP Sync (Qoder Desktop, Windows)
- Делал: служебная запись **без прогона** — транслирую инсайт из закрытого 18.10 пазла Genesis Block Wallet (перенесён в `solved/caesarcoder-genesis-block-wallet-puzzle-947ksats`) на этот пазл.
- Гипотеза «rounds-ось»: решение genesis было не в стандартных настройках KDF — **PBKDF2-HMAC-SHA512 rounds = 181 505 и 200 913 вместо 2 048** (числа кодируют время 18:15:05 UTC и дату 2009-01-03 генезис-блока), при пассфразе «Satoshi Nakamoto». Наш пайплайн — Electrum v2: `tools/ev2run.py:21` — `pbkdf2_hmac('sha512', phrase, ('electrum'+pw), 2048)`; у Electrum это канонические 2048, но прецедент genesis показывает, что автор мог отойти и от канона своего же формата.
- Следствие: полученные здесь нули корректны как «при rounds=2048 совпадений нет», но **не покрывают** пространство нестандартных rounds/соли — это ограничение интерпретации прежних негативов, а не новая ось перебора. Их собственный GPU-поиск тоже встал на 30 000 раундов (см. `data/ocp/README.md` genesis-папки), т.е. перебор по rounds вверх — это взрывной рост цены заCandidate, а не «ещё один заход».
- Что делать (бесплатный шаг): прочитать генератор/оракул пазла и подсказки автора на явные упоминания rounds / iterations / salt / «Electrum vs BIP39»; при неясности — вопрос автору только по решению куратора. **ПРОГОН НЕ ЗАПУСКАТЬ**: по `AGENT_INSTRUCTIONS.md` п.4 перебор допускается только по оси, суженной инсайтом, и требует отдельного ОК Ильи; «попробовать другие rounds» само по себе таким инсайтом не является.
- Артефакты: не создавались; в `data/ocp/` и `tools/ocp/` этого прохода лёг материал OCP по пазлу (см. запись 09:52).
- Ссылки: `solved/caesarcoder-genesis-block-wallet-puzzle-947ksats/LOG.md` (запись 10:05), https://github.com/floflo777/open-crypto-puzzles/pull/44 ; `_sources/ocp_sync_2026-10-18/delta_report.md`.
