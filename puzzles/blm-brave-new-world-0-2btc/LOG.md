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
