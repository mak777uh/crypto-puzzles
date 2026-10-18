# Цикл Big Pickle — path-to-greatness-treasure-hunt-3ltc (3.02608794 LTC)
## 2026-10-17, ~23:20 МСК (20:20 UTC) — обогащение: полный набор медиа пазла + перепроверка стего/подсказки 8

- **Агент:** Big Pickle (deepseek-v4.1-flash-free / OpenCode, Windows, DESKTOP-PE9BOJ5)
- **Пазл:** `puzzles/path-to-greatness-treasure-hunt-3ltc` (Категория A4, приз ~$163, `Difficulty left: insight`); бронь взята/снята в этом же цикле.
- **Приз (перепроверен 17.10.2026):** `LUtL7qnm3gzxKjHcfVLSjydqhhinTVmTmS` = **302,608,794 litoshi (3.02608794 LTC), 8 входящих tx, 0 потрачено** (`api.blockcypher.com` `ltc`). Жив.

### Проблема, которую закрыл цикл
Локальная папка содержала **только тексты OCP** и ни одного медиа-файла. При этом весь пазл — это изображения (9 подсказок) + два без-потерь носителя (аудио и стего). Без медиа решать нечего.

### Что сделано
1. **Импорт ассетов с сайта** `https://p2gtreasure.com/` (сервер отдаёт `406` на «библиотечный» UA; с браузерными заголовками — `200`):
   - `Clues/p2g_clues.zip` (3,607,721 B) и все 9 подсказок (`00111111.jpg`, `clue1_imagine.jpg`, `clue2_scramble.jpg`, `clue3_wasd.jpg`, `clue4_chess.jpg`, `clue5_wonders.jpg`, `computer_screen.jpg`, `qr1.jpg`, `qr2.jpg`);
   - `treasure_chest.png`, `lookingood.css`, `old/index.html`.
2. **Разрешены оба QR** (`tinyurl.com/y6c6o3uj`, `tinyurl.com/y28knqz3`) → Google Drive (`uc?export=download&id=…`) → скачаны **`Beach.png` (142,129 B)** и **`Ship.png` (2,896,530 B)** — два единственных lossless-носителя.
3. **Первоисточники OCP** (`author-posts.md`, `analysis/leads.md`, `analysis/tested.md`, `README.md`) сохранены в `data/site/`.
4. **Треклист альбома** «Seconds of Dream» через iTunes lookup API (13 треков, Σ 3,426,218 мс) → `data/album_tracklist.json`.

### Проверки и находки
- **Стего (clue 7)** подтверждён на `Ship.png`: `R&0xFE==G&0xFE` на **100 %** пикселей, `G&0xFE==B&0xFE` на 100 %, средний красный LSB **0.2502** (совпало с OCP). Извлечены `data/site/ship_redlsb_raw.png` и `ship_redlsb_3x3.png`. **OCR (EasyOCR) текста не находит** — скрытая картинка есть дизеренный фотомонтаж, не текст (согласуется с OCP). ASCII-поток красного LSB — шум.
- **Clue 8** (`00111111.jpg`): OCR воспроизводит панель `4 -> Exit Light -> T`, `8 -> Ghost March -> R`, ряд `?`×13, строку `ehk-bqNEFRUn-`.
- **Подсказка 8 — свидетели сходятся** при буквальном чтении «число = 1-based позиция буквы в названии трека (пробелы убраны)»: `ExitLight[4]='t'`, `GhostMarch[8]='r'`. 11 букв → значения алфавита → **17 цифр `58112171456182114`**. Открыто: правило выбора трека для 13 ячеек (дефисы в позициях 4 и 13; значение `q`=17 > длины `nocturnalsugars`, что исключает простую 1:1-индексацию).
- **computer_screen.jpg**: OCR воспроизводит все четыре окна схемы (WIF-блоб, 4 сегмента с IV, длины 16/15/8/12/20/16/24/17, `fix_clues.script`).

### Артефакты
`data/site/` (31 файл: ассеты + `ocp__*` + извлечённые LSB-картинки; sha256[:16] — в `LOG.md`), `data/album_tracklist.json`, `data/SOURCES.md`. Скрипты цикла — во временной папке.

### Следующий шаг
Приз требует **все 8 ответов**. Осталось 2 «недочитанных»: clue 6 (аудио; на этой машине YouTube недоступен) и clue 7 (тего извлечён, но строку автор «нарисовал» не текстом). Плюс открытое правило подсказки 8. Продолжение — инсайт-задача на часы/дни; медиа-блокер снят.
