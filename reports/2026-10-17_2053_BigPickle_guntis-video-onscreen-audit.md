# Отчёт цикла — guntis-vitolins-metamask-8-6eth (10 ETH challenge)

- Агент: Big Pickle (big-pickle / OpenCode, Windows)
- Дата/время: 2026-10-17 ~20:53 МСК (17:53 UTC)
- Бронь: `guntis-vitolins-metamask-8-6eth`, держится (истекает 2026-10-17T19:16:09Z)
- Тип цикла: аудит письменных поверхностей + запуск экранного чтения (лид №1)

## 1. Что делал

1. Инвентаризация папки: кадры видео (432 шт., 1 кадр/с) извлечены; `data/ocr_frames.jsonl` — только 9 кадров.
2. **BIP39-аудит письменных поверхностей** (`tools/bip39_surface_audit.py`): прогнал 5 «посаженных» фраз, правила описания, заголовок и теги 2020 через словарь BIP39 и сверил с пулом OCP.
3. Добыл **полный текст описания видео из Wayback-2020** (`tools/dump_2020_description.py` → `data/2020_description_dump.txt`), вытащил все URL.
4. Запустил **EasyOCR по всем 432 кадрам** (независимый движок от issue #18) — идёт в фоне.
5. Проверил `tiny.cc/ouwjfz` из сообщения пользователя.

## 2. Результаты аудита (важное)

- Из **5 «посаженных» фраз** извлекается ровно **28 BIP39-слов**:
  `expect easy there will fog lake also you more parrot can sing song then goat round dutch cattle forest wood only because fiber like rib roast dinner fresh`
- Плюс заголовок (`update`), теги (`season market fork round`, `top`) и текст правил описания → суммарно 43 слова.
- **Новых BIP39-слов сверх пула OCP НЕТ.** Пул письменных поверхностей (описание/теги/заголовок/пост) полон — это согласуется с прежним выводом команды.
- Словарная проверка: `dutch, fog, parrot, fiber, fork, rib, goat, wood` — есть в BIP39; **`dark` — НЕТ в BIP39** (поэтому «dark fog» даёт только `fog`).

## 3. Новые наблюдения

- **30 символов `🕳` («дыры») в описании.** Описание 2020-06 дословно:
  `10 ETH challenge | Ethereum Parabolic | Bitcoin generator portfolio update !?` / `Is Crypto Winter finished?` / `🕳 ×30` / `👨‍⚖️Follow me ... Skype ...`
  В досье OCP и issues этот счётчик **не отмечен**. 30 ≠ 12; возможно декор, но стоит проверить (нет ли скрытого текста под «дырами» в живом описании).
- **`tiny.cc/ouwjfz`** → `https://heatedaffairs.com/go/p142055.subindex1585` — партнёрская ссылка, не пазл-поверхность.
- Пути 2020: `bit.ly/2UK5QJW`, `bit.ly/2UMgwYD`, `bit.ly/36XgNKr`, `bit.ly/38mWqYH`, `t.me/mineshop_eu`, `etherscan.io/address/0x9C2F44...`.

## 4. Состояние пазла (из досье/issues, снимок 2026-10-17)

- ~**70 млрд дериваций**, все отрицательные (свидетели есть).
- Закрыты: reading order RO1/RO2, connecting words C1 (18,66 млрд), `fog`/`cloud` (B-CLOUD-A/B), free-order B-POSS (10,77 млрд).
- **Единственный непокрытый канал — экранный текст.** issue #18 (`@cjmcdaniel`, 1 кадр/с, 720p, macOS Vision OCR): 122 слова, 109 вне пула; монеты из таблицы дают `atom, link, basic, token` (+`dash`). Полное расширение пула 219 экранными словами **не прогнано** (нужен GPU).
- Author: «You'll need only written words» (устный канал снят); «...written in the video on the screen so read carefully» (экран — канал).

## 5. Запущено / в работе

- `python tools/ocr_frames.py` — EasyOCR (en, CPU) по всем 432 кадрам, инкрементально в `data/ocr_frames.jsonl`, лог `data/ocr_run.log`. **Очень медленно на CPU** (часы; идёт).
- План: сравнить токены с 122 словами issue #18, отсортировать по BIP39, найти новые слова (ключевой вопрос — неполнота пула).

## 6. Вывод

- Письменная сторона **исчерпана**: новых слов нет, порядок чтения закрыт.
- Блокер — **идентификация слов и порядка**, а не объём перебора.
- Дальше возможно: (а) завершить/ускорить экранное чтение и найти новое слово; (б) новый инсайт о правиле выбора/порядка; (в) GPU-прогон 219 слов (аренда — только с ОК Ильи).
- Оценка шансов — низкая (досье ~1,5%): семейство решений перебрано очень широко.

## 7. Артефакты

- `tools/bip39_surface_audit.py` — аудит письменных поверхностей.
- `tools/dump_2020_description.py` → `data/2020_description_dump.txt` — полное описание/URL 2020.
- `tools/ocr_frames.py`, `data/ocr_frames.jsonl`, `data/ocr_run.log` — экранное чтение.
