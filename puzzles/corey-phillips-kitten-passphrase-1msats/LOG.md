# LOG.md — журнал «corey-phillips-kitten-passphrase-1msats»

> Формат ведения: см. `../../AGENT_INSTRUCTIONS.md`. Записи добавляются в конец; чужое не затирать.

## 2026-10-17, 18:48 — AutoClaw (модель zai_glm-5.3-flash, среда AutoClaw/Windows, проект «Default»)
- Бэкфилл: заведение журнала по протоколу (папка существовала с досье от 16.10.2026, LOG.md не был заведён).
- Тип объекта: пазл. Состояние папки: README 12843 байт (обогащённое досье), файлов 1, data/=нет, tools/=нет.
- Кратко из README: статус open; приз 1001900 sats (USD 631); типы bip39-seed, brainwallet; остаток-сложность external-info.
- Адрес/эскроу: bc1qcyrndzgy036f6ax370g8zyvlw86ulawgt0246r
- Источники: https://corey-lyle-phillips.medium.com/part-1-3-turn-your-photos-into-bitcoin-private-keys-addresses
- Вся история и досье — в README.md этой папки; новые сессии описывать здесь (self-intro, что делал, результаты вкл. отрицательные, артефакты, ссылки).

## 2026-10-17 18:50 — Big Pickle (big-pickle / OpenCode, Windows) — сбор данных в пустую папку
- Делал: массовый обход README → источники; попыток 8, сохранено 5 в `data/`.
- Успех (5): 00_README.md; 01_leads.md; 02_tested.md; 03_BTC-Puzzle-by-Corey-Phillips.html; 04_bitimage.html
- Отказ (3): https://github.com/floflo777/open-crypto-puzzles [FAIL: IncompleteRead(327680 bytes read) ]; https://corey-lyle-phillips.medium.com/part-1-3-turn-your-photos-into- [FAIL: <urlopen error [Errno 11001] getad]; https://corey-lyle-phillips.medium.com/a-bitcoin-audio-puzzle-61174b98 [FAIL: <urlopen error [Errno 11001] getad]
- Артефакты: `data/SOURCES.md` + скачанные файлы.
- Проверено: да (HTTP-статус/байты); содержательная разборка — следующим шагом.

## 2026-10-18, 09:52 — OCP Sync (Qoder Desktop, Windows) <!-- ocp-snapshot:19644e58 -->
- Делал: обогащение из внешнего репозитория [open-crypto-puzzles](https://github.com/floflo777/open-crypto-puzzles) — раскладка дельты снапшота `19644e58` (клон `_sources/ocp/`, реестр `_sources/OCP_SNAPSHOT.md`). Протокол: `claims acquire/heartbeat/release` по `corey-phillips-kitten-passphrase-1msats`. Прогонов/переборов не запускали, статус пазла и балансы не меняли, чужие файлы не перезатёрты (копии лежат отдельными деревами `data/ocp/` и `tools/ocp/` с provenance).
- Результат: перенесено 6 файлов данных → `data/ocp/`, 3 кода → `tools/ocp/`,1 тяжёлых (>250 КБ) оставлены в клоне — указатель `data/ocp/_HEAVY.md`. Зеркал, уже лежащих в базе, пропущено: 3. Статус по OCP: `open`.
- Артефакты: `2-mid-prizes/corey-phillips-kitten-passphrase-1msats/clues/author-posts.md`, `2-mid-prizes/corey-phillips-kitten-passphrase-1msats/data/coverage.csv`, `2-mid-prizes/corey-phillips-kitten-passphrase-1msats/data/pipeline-stages.json`, `2-mid-prizes/corey-phillips-kitten-passphrase-1msats/images/01-pipeline-derivation.svg`, `2-mid-prizes/corey-phillips-kitten-passphrase-1msats/images/02-coverage-tested-space.png`, `2-mid-prizes/corey-phillips-kitten-passphrase-1msats/puzzle.json`, `2-mid-prizes/corey-phillips-kitten-passphrase-1msats/tools/fig_coverage.py`, `2-mid-prizes/corey-phillips-kitten-passphrase-1msats/tools/fig_pipeline.py`, `2-mid-prizes/corey-phillips-kitten-passphrase-1msats/tools/oracle.py`
- Ссылки/доказательства: https://github.com/floflo777/open-crypto-puzzles/tree/19644e58e50721f8469680f2edcba1daa0697630/2-mid-prizes/corey-phillips-kitten-passphrase-1msats ; полная дельта — `_sources/ocp_sync_2026-10-18/delta_report.md`.


## 2026-10-19 10:09 — Qoder (Desktop, Windows) — ПРЕДРЕГИСТРАЦИЯ оси HomelessPhD/CorePhylips_CATS
- Ссылка Пользователя: https://github.com/HomelessPhD/CorePhylips_CATS (main). В репозитории только `BruteCats/`: `brute_cats.py`, `pass_list.txt` (316 строк), `cats_2.jpeg`, пустой `found.txt`; README автора репозитория: «tried 1/3 of rockyou.txt ... nothing worked». Новых подсказок/ключей нет.
- Артефакты скопированы в `data/homelessphd/` (+ `data/bip39-english.txt`); `sha256(cats_2.jpeg) = b988e0881a0211222e83f3e2a4bfac695c951bf96aa33ec112fab6992f5e7343` — совпадает с известным файлом пазла, подмены нет.
- Он-чейн перед прогоном (blockstream API, 2026-10-19 ~07:08 UTC): цель `bc1qcyrndzgy036f6ax370g8zyvlw86ulawgt0246r` — funded 1 001 900, spent 0, tx 2 (жива); сестринский `bc1q57euh23y3qs2f9d5mtwpax5lqecfvrdkqce82a` — funded 415 133, spent 415 133 (пуст).
- Оракул: `tools/homelessphd/cats_oracle.py` (точно воспроизводит `brute_cats.py`: sha256(base64(jpeg)) → BIP39-24 → PBKDF2(mnemonic, "mnemonic"+pass, 2048) → m/84'/0'/0'/0/0 → P2WPKH). Калибровка: passphrase "" → `bc1q57eu…ce82a`, WITNESS OK.
- Предрегистрированные оси ДО прогона:
  - **H1**: строки `pass_list.txt` как есть, удалён только завершающий `
`, пустые пропущены, дедуп по первому вхождению (ожидается ≤316 кандидатов).
  - **H2**: те же строки после `strip()` (кавычки/пробелы сохраняются), дедуп (ожидается ≤316).
  - Путь только `m/84'/0'/0'/0/0`; другие пути/пассфразы не добавляются. Расширение оси после негатива — только новой предрегистрацией.
- Почему это почти наверняка негатив: OCP уже прогнал ≈1,16·10⁹ кандидатов (rockyou, best64, 9 млн пароль-листов), куда 316 строк практически наверняка входят; автор пазла прямо писал «not meant to be solved». Прогон — формальное закрытие оси по ссылке Пользователя, ≤15 мин.
- При HIT: пассфраза/приватный ключ — только лично Илье в чат, в репозиторий пишется лишь индекс + адрес + sha256(passphrase). Транзакции не совершаются.
- Бронь: `claims acquire corey-phillips-kitten-passphrase-1msats --agent Qoder --ttl 120` — OK.

- Результат H1/H2 (2026-10-19 10:09 UTC): H1 — 313 уникальных, 0 совпадений, 0,47 с (668/с); H2 — 313 уникальных, 0 совпадений, 0,43 с (727/с). Обе оси — негатив; witness OK до каждого прогона. Машинные результаты: `data/homelessphd/run_H1_2026-10-19.txt`, `run_H2_2026-10-19.txt`. Вывод: список HomelessPhD не содержит пассфразы; ось закрыта, расширения не будет — она заведомо входит в уже отработанный OCP-негатив ≈1,16·10⁹. Папка-дубль `puzzles/corey-phillips-cats-password-0-01btc` удалена, артефакты консолидированы здесь.
