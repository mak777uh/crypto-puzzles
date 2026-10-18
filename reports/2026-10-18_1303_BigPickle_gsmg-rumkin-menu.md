# Отчёт цикла — GSMG 5-BTC — «меню Rumkin исчерпано» (BigPickle, 2026-10-18 13:03 MSK / 10:03Z)

**Агент:** Big Pickle (deepseek-v4.1-flash-free / OpenCode, Windows DESKTOP-PE9BOJ5, CPU-only)
**Пазл:** `gsmg-io-5btc-puzzle` (бронь `BigPickle`, TTL 120 мин, взята 09:55Z, снята по завершении)
**Тип цикла:** автономная ось по лиду floflo #4 (инструмент автора) + лид #5 («esrever»)
**Файл-отчёт:** этот. Отчёты — отдельный файл, чужие не трогались.

## Задача
Продолжить эндгейм: найти недостающее (финальный ключ, пароли блобов, пропущенные артефакты),
двигаясь по рекомендованным осям. Без трат, GPU, писем авторам, без работы BLM.

## Что сделано (3 ограниченных прогона, гипотеза/ось зафиксированы в `LOG.md` ДО прогонов)

### 0. Живая верификация инструмента (лид #4) — ПОЛОЖИТЕЛЬНО
Вебфетч `https://scwf.dima.ninja/` (2026-10-18): это движок rumkin **«Solve Crypto with Force!»**,
форк `github.com/DaWouw`. Подтверждено **вживую**:
- **Bifid БЕЗ параметра периода** (параметры: Alphabet Key, Tableau Used, Translation, «Only Letters») —
  ровно конвенция Bifid-шага пазла. ✔
- Полное меню (~25): Affine, Atbash, Baconian, Base64, Baudot-Murray, Bifid, Caesar(+ROT13/Keyed/Range),
  Column Transposition, Cryptogram/quipqiup, Digraph, EBCDIC, Enigma, Gronsfeld, Morse, Maze,
  Letter Numbers, Playfair, Railfence, Rotate, Skip, Substitution, Vigenere, XOR, Base32/36/58/85, Optical.
- Вывод: меню **широкое**, «короче дюжины» (floflo) — неточность. Идентификация = семейство Rumkin,
  не непременно узкий форк; ограничение «меню» слабо сужает пространство.

### 1. Прогон меню, часть 1 — `tools/gsmg_rumkin_menu_probe_2026-10-18.py`
Объекты: BIFID570, ODD285, KEPT256, DROPPED29, EVEN-BCDE285, dbbi91, faed570.
Шифры: atbash, Caesar 1–25, Affine (12×26, enc/dec), letter-numbers, Bifid (unkeyed + ключи
{DBIFHCEG, 4 ингредиента}), railfence 2–8, rotate 2–32 × 1–3, skip 2–48 + offset, XOR, base64/32/16.
Цель: пароль 4 блобов (raw и sha256-hex, EVP sha256/md5).
**Итог:** 13 176 выходов, 210 816 тестов AES, 814 валидных паддингов (≈случайное 823), **0 читаемых**.

### 2. Прогон меню, часть 2 — `tools/gsmg_rumkin_menu_probe2_2026-10-18.py`
Добраны оставшиеся фиксированные/ключевые шифры меню: EBCDIC(cp037), Baudot/ITA2,
Baconian (4 классификации), Morse, Playfair (unkeyed enc/dec), Columnar (10 ключей, в т.ч. из
ингредиентов и из сумм матрицы), Vigenere/Gronsfeld (9 ключей), Substitution (qwerty↔dvorak/colemak,
1337-sp3ak), Base36/58/85. Исправлена ошибка pass-1 (`bifid_enc` был идентичен decode — теперь корректен).
**+ прямая проверка ключа** каждого выхода (hex64 / base58check-WIF / 32 байта → secp256k1 → hash160 адреса приза).
**Итог:** 374 выхода, 5 984 теста AES, 26 валидных паддингов (≈шанс), **0 читаемых, 0 key-hit**.

### 3. Лид floflo #5 «esrever» — `tools/gsmg_esrever_probe_2026-10-18.py`
Малый очерченный набор реверс-прочтений тех же объектов: reverse, byte-reverse, per-byte bit-reverse,
транспонирование сетки w∈{5,14,19,26,29,32}, reverse+atbash. + тот же key-check.
**Итог:** 70 выходов, 1 120 тестов AES, 2 валидных паддинга, **0 читаемых, 0 key-hit**.

## Контроль качества
- Объект верный: `BIFID570` начинается с `BTCSEED` (идентичность — ожидаемая).
- Все «читаемые хиты» пустые; шумовые совпадения в pass-1 (9 шт., printable 0.37–0.41) — от слишком
  коротких ключевых слов (`5K`, `half`) в случайных байтах; в отчёте помечены как шум.
- Валидные паддинги во всех прогонах = математическое ожидание 1/256 → сигнала нет.

## Результат
**Меню Rumkin (при нейтральных/дефолтных конвенциях) исчерпано как самостоятельная ось:**
не даёт пароль блобов, не даёт редукцию 256-объекта до 32-байтного ключа, не даёт плоского «ying yang».
Лид #5 («esrever») в простых прочтениях — тоже пусто.

## Артефакты этого цикла
- `tools/gsmg_rumkin_menu_probe_2026-10-18.py` + `data/rumkin_menu_probe_2026-10-18.out.txt`
- `tools/gsmg_rumkin_menu_probe2_2026-10-18.py` + `data/rumkin_menu_probe2_2026-10-18.out.txt`
- `tools/gsmg_esrever_probe_2026-10-18.py` + `data/esrever_probe_2026-10-18.out.txt`
- `data/tool_identification_2026-10-18.md` — обновлён (живая проверка + таблица исчерпания меню)
- `LOG.md` — append (гипотеза до прогона + результаты)

## Остаётся / следующая ось
Инструментально-механические оси (GitHub-свип, web-свип, фаза-1, blob-probe, Bifid-потоки, меню, esrever)
**закрыты отрицательно**. Фронтьер — **смысловой**, «вечер направленного рассуждения» (floflo #3/#7):
1. **Road-map автора** (`yellowblueprimes · matrixsumlist · lastwordsbeforearchichoice · yinyang`):
   `matrixsumlist` = суммы строк/столбцов матрицы (`610876654997879` / `8108108736759668`, обе 101);
   что такое `yellowblueprimes`, `lastwordsbeforearchichoice`, и где «ying yang»-гейт (C7).
   «Пароль у тебя перед глазами».
2. **Лид #7** (floflo): верный ли объект вообще — 256-символьный объект может быть указателем,
   а не ключом; тогда прямой источник ключа — блоб-путь (oracle floflo) или «Dualite»-блоб.
3. **Лид #3** (floflo): повторить динамически строящиеся кандидаты, которые не дошли из-за бага фильтра.

Рекомендация: следующий цикл — **пункт 1** (направленное рассуждение по road-map), не перебор.
