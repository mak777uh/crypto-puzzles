# Инструмент автора (лид floflo #4) — идентификация (BigPickle, 2026-10-18)

## Гипотеза floflo
Автор сказал (аутентично), что **все фазы собирались одним и тем же софтом**. Сверка
принятых на решённых фазах конвенций с ИСХОДНИКОМ одного публичного инструмента даёт
точное совпадение на неочевидных деталях: **Bifid этого инструмента не имеет параметра
периода** (период всегда = полная длина сообщения — ровно конвенция Bifid-шага пазла), и
список шифров у инструмента короткий. Это ограничивает пространство оставшихся гипотез
меню этого инструмента.

## Что нашли мы
На **gsmg-archive.org** (community-архив `_web/gsmg-archive.org_index.html`, раздел Tools) перечислены
шесть инструментов, включая редкий **`scwf.dima.ninja`**. Мы его открыли:

- `https://scwf.dima.ninja/` — это **самохостный форк/зеркало набора «Ciphers and Codes»
  Тайлера Акинса (rumkin.com/tools/cipher/)** (в футере — `github.com/DaWouw`; вся страница —
  движок rumkin «Solve Crypto with Force!»).
- Прямая проверка первоисточника: `https://rumkin.com/tools/cipher/bifid/` (build 2026-10-15) —
  у Bifid-инструмента параметры: alphabet key, useLastInstance/reverseKey/reverseAlphabet/keyAtEnd,
  direction, input, translations. **Параметра периода НЕТ** — совпадение с конвенцией пазла.
  Пример на странице (Wikipedia Bifid: key `BGWKZQPNDSIOAXEFCLUMTHYVR`, decode `UAEOLWRINS`) —
  классический Bifid, период = длина сообщения.

## Почему это сильный кандидат («совпадает по неочевидным деталям»)
Меню Rumkin покрывает ровно те примитивы, что реально видны в пазле:
- **Bifid** — без периода (наш сертифицированный шаг с квадратом `DBIFHCEG`); ✔
- **Vigenere** — у Rumkin явно описан **Variant Beaufort** (Beaufort-конвенция пазла); ✔
- **Letter Numbers** = a1z26; **EBCDIC**; **Baconian**; **Morse**; **Skip** (счёт по N — сцитала);
  **Rotate** (поворот сетки; ей декодировали K3); **Columnar Transposition**; **Railfence**;
  **One Time Pad**; **Playfair**; **Substitution** (в т.ч. keyboard-shift). ✔
- Инструмент с источниками в открытом доступе (floflo сверял именно исходник) — MIT, avtor Tyler Akins.

⚠️ Оговорка: floflo пишет «меню короче дюжины», у Rumkin же реализовано ~25 инструментов.
Либо floflo имеет в виду подмножество/другой форк, либо это близкий родственник. Тем не менее
**«Bifid без периода + Beaufort + EBCDIC + a1z26» вместе** — редкая комбинация, а `scwf.dima.ninja`
стоит в Tools-списке community-архива.

## Следующий шаг (для будущего цикла)
Прогнать **шифры из меню Rumkin с их дефолтными конвенциями** против открытых объектов:
кандидат в пароль «Dualite»-блоба и шаг редукции 256-объекта до 32 байт. Начать с наименее
раскрученных (Skip, Rotate, Maze, Railfence, Columnar, OTP) на 256-объекте и на S570-потоках.

---

## ВЫПОЛНЕНО (BigPickle, 2026-10-18, этот же день) — живая проверка + исчерпание меню

**Живая проверка `scwf.dima.ninja` (вебфетч, 2026-10-18):** страница — это движок rumkin
«Solve Crypto with Force!», футер `github.com/DaWouw`. Подтверждено **вживую**:
- Bifid: параметры = *Alphabet Key*, *Tableau Used* (показывает `A B C D E F G H I K L M N O P Q R S T U V W X Y Z`),
  *Translate the letter A..Z into A..Z*, кнопка «Only Letters». **Параметра периода НЕТ.** ✔
- Полный список меню (сайдбар): Frequency, ASCII heatmap, Manipulator, CyberChef, BaseX(binary/hex),
  Affine, Atbash, Baconian, Base64, Baudot-Murray, Bifid, Caesar (+ROT13/Keyed/Range), Column
  Transposition, Cryptogram/quipqiup, Digraph, EBCDIC, Enigma, Gronsfeld, Morse, Maze, Letter Numbers,
  Playfair, Railfence, Rotate, Skip, Substitution, Vigenere, Web-app, XOR, Optical recognition.
- Т.е. **меню действительно широкое (~25)**, а не «короче дюжины» — оговорка floflo остаётся.
  Из этого следует: ограничение «меню» НЕ сужает пространство так сильно, как думал floflo;
  наша идентификация — это Rumkin-семейство, а не непременно узкий форк.

**Исчерпание меню при нейтральных/дефолтных конвенциях (3 ограниченных прогона):**
| прогон | что покрыл | выходов | тестов AES | валидный паддинг | читаемых | key-hit |
|---|---|---|---|---|---|---|
| `rumkin_menu_probe` | atbash, caesar 1–25, affine (12×26), letter-numbers, bifid(unkeyed+5 ключей), railfence 2–8, rotate 2–32×3, skip 2–48+offset, xor, b64/32/16 | 13 176 | 210 816 | 814 (≈шанс 823) | 0 | 0 |
| `rumkin_menu_probe2` | EBCDIC(cp037), Baudot/ITA2, Baconian(4 классиф.), Morse, Playfair, Columnar(10 ключей), Vigenere/Gronsfeld(9 ключей), Substitution(qwerty↔dvorak/colemak, 1337), Base36/58/85 | 374 | 5 984 | 26 (≈шанс) | 0 | 0 |
| `esrever_probe` (лид #5) | reverse, byte-reverse, per-byte bit-reverse, transpose w∈{5,14,19,26,29,32}, reverse+atbash | 70 | 1 120 | 2 | 0 | 0 |

Пароли-цели: 4 блоба (Cosmic `2d3f6fe0…`, salph_inner `3ab58534…`, inner-3.2 `b45a5e3d…`,
urlblob `74c974e3…`), EVP_BytesToKey {sha256, md5}, форма пароля raw + sha256-hex.
Дополнительно: прямой **key-check** каждого выхода (hex64 / base58check-WIF / 32 байта →
secp256k1 → hash160 адреса приза `a9553269…`) — 0 совпадений.
Контроль: `BIFID570` начинается с `BTCSEED` (объект верный).

**Итог:** меню Rumkin при нейтральных конвенциях **не даёт** пароль блобов, редукцию до ключа
или плоский «ying yang». Строка «KW-IN-OUT» с `BTCSEED` — это лишь идентичность BIFID570 (ожидаемо).
Единственный KW-«hit» на YINYANG — случайная подстрока `YANG` в Vigenère-выходе faed570.
Инструмент меню исчерпан как самостоятельная ось; остаются **смысловые** лиды (ингредиенты
road-map: `yellowblueprimes · matrixsumlist · lastwordsbeforearchichoice · yinyang`, лид #7 «тот ли это объект»).
