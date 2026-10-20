# Проход 2026-10-19 (Qoder): HomelessPhD/CorePhylips_CATS и AR_Puzzles, закрытие H2h у SLM

Кратко: три действия, все — без транзакций и без публикации ключей. Живых хитов нет.

## 1. Corey Phillips «CATS» (`corey-phillips-kitten-passphrase-1msats`) — ось HomelessPhD закрыта

- Приз перепроверен он-чейн перед прогоном (blockstream, 2026-10-19 ~07:08 UTC):
  `bc1qcyrndzgy036f6ax370g8zyvlw86ulawgt0246r` — funded **1 001 900** сат, spent **0**, tx 2.
  Сестринский `bc1q57euh23y3qs2f9d5mtwpax5lqecfvrdkqce82a` — 415 133/415 133, пуст.
- Ссылка Пользователя: <https://github.com/HomelessPhD/CorePhylips_CATS> (main). В репозитории только
  `BruteCats/`: `brute_cats.py`, `pass_list.txt` (316 строк), `cats_2.jpeg`, пустой `found.txt`.
  Новых подсказок нет; README автора репозитория: «tried 1/3 of rockyou.txt ... nothing worked».
- Артефакты: `puzzles/corey-phillips-kitten-passphrase-1msats/data/homelessphd/`
  (изображение sha256 `b988e088…f5e7343` — совпадает с известным файлом пазла), BIP39-список,
  оракул `tools/homelessphd/cats_oracle.py`, раннер `tools/homelessphd/run_axis.py`.
- Оракул воспроизводит `brute_cats.py` точно: `sha256(base64(jpeg))` → BIP39-24 →
  PBKDF2(mnemonic, `"mnemonic"+pass`, 2048) → `m/84'/0'/0'/0/0` → P2WPKH. Калибровка:
  пустая пассфраза → `bc1q57eu…ce82a`, **WITNESS OK**.
- Оси предрегистрированы в LOG до запуска: **H1** — строки как есть (313 уникальных), **H2** — то же
  после `strip()` (313). Результат: **0 совпадений** в обеих, 0,47 с и 0,43 с (≈700 кандид/с).
- Вывод: список HomelessPhD пассфразу не содержит; расширять ось бессмысленно — она заведомо покрыта
  уже отработанным OCP-негативом ≈1,16·10⁹. Папка-дубль, созданная под эту ссылку, удалена;
  всё консолидировано в каноническом досье.
- Файлы: `LOG.md` (предрегистрация + результат), `data/homelessphd/run_H1_2026-10-19.txt`,
  `run_H2_2026-10-19.txt`.

## 2. Smith, Lyle & Moore #2 «Glimmer» — свип y6cd1 закрыт полностью

- Бронь была просрочена (моя же), перехвачена `claims steal`, затем снята; перехват зафиксирован в LOG.
- `tools/h2h_retry_errors.py --page y6cd1`: контроль `e3zre|albatross` → HIT, затем 28 повторных
  проб по прежним сетевым ERR (#42–70): **0 HIT, 28 NO, 0 ERR**.
- Итог оси H2h: **2048/2048 слов BIP39, 0 HIT** — гипотеза «пароль на `y6cd1` = слово BIP39»
  закрыта сертифицированным негативом. `data/h2h_state.json`: next 2048/2048, hits [].
- Приз не двигался: 3 177 700 сат, spent 0 (последняя проверка 17.10). Остальные оси SLM
  (Title-case West, East-фраза, South-каламбур) не запускались — вне этого прохода.

## 3. AR_Puzzles — ссылка Пользователя, только сбор данных

- <https://github.com/HomelessPhD/AR_Puzzles> (main): **не решены #3, #10, #11**; решены #5, #7, #8, #12
  (полезны как независимая калибровка оракула серии).
- Скачано в `puzzles/arweave-puzzle-3-1000ar/data/homelessphd/`:
  `PZL3.md` (sha256 `4dffc903…f5d6`), `PZL10.md` (`97ab34be…64fb`),
  `ArweaveP_user_tweets.xlsx` (`d60658b4…aab0`) и распакованный дамп `tweets.tsv` (403 твита).
- Проверка дампа: **новых авторских подсказок нет**. Есть только известные («Did anybody count the dots?»,
  «N.1.7.0.0 → third pic obsolete», «0xFF2142… also included somewhere in the image»,
  «format does not matter», «Next set of hints when AR reaches $100»). Твит 2020-05-23 раскрывает
  решение другого пазла серии (sha256(hexagon) → 8 hex → ключ) — это решённый #7.
- По #11 `PZL11/pics/` содержит только иллюстрации прежних идей (Chunks, HIST/FILTERED, dummy_screen,
  plain_boat, skyscrap); новых данных для пиксельной оси нет. Оси A11-H1 (адрес в потоках) и A11-H2
  (альфа-канал) уже закрыты негативами с witness — повторно не запускались.
- По #3 ось «компаунд-слово» исчерпана ранее (7 349 кандидатов, 0 MATCH); репозиторий новых чтений
  слотов не добавляет.
- Записи добавлены в `LOG.md` всех трёх досье; брони взяты и сняты.

## Изменения в общих файлах

- `MASTER_CATALOG.md`: в строку SLM добавлено «BIP39-свип y6cd1 закрыт 19.10 (2048/2048, 0 HIT)»;
  в строку Kitten — «HomelessPhD pass_list 313×2 = 0 (19.10)».
- Новые/обновлённые досье: `corey-phillips-kitten-passphrase-1msats`,
  `smith-lyle-moore-hunt-2-0-032btc`, `arweave-puzzle-3-1000ar`, `arweave-puzzle-10-500ar`,
  `arweave-puzzle-11-1eth`.
- Транзакций не совершалось; приватные материалы в репозиторий не писались (хитов не было).

## Что осталось

- **CATS**: пассфраза — свободный секрет автора; без новой информации от автора шанс ~0,3%.
- **SLM**: только deduction-замки; нужна новая идея/ответ автора, не перебор.
- **AR #3/#10/#11**: нужен смысловой инсайт (или подсказка автора при AR $100 для #11).
