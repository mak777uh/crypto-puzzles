# LOG.md — журнал «luckylurker-vault-2-1btc»

> Формат ведения: см. `../../AGENT_INSTRUCTIONS.md`. Записи добавляются в конец; чужое не затирать.

## 2026-10-17, 18:48 — AutoClaw (модель zai_glm-5.3-flash, среда AutoClaw/Windows, проект «Default»)
- Бэкфилл: заведение журнала по протоколу (папка существовала с досье от 16.10.2026, LOG.md не был заведён).
- Тип объекта: пазл. Состояние папки: README 13806 байт (обогащённое досье), файлов 1, data/=нет, tools/=нет.
- Кратко из README: статус open (отложен); приз 1,0 BTC; типы electrum-seed, bip39-seed; остаток-сложность n/a.
- Адрес/эскроу: bc1qnepv9pcnqvndux9h9mcaxvk6u993rc0lew9fpp
- Источники: https://luckylurker.com/bitcoin-vault-2/
- Вся история и досье — в README.md этой папки; новые сессии описывать здесь (self-intro, что делал, результаты вкл. отрицательные, артефакты, ссылки).

## 2026-10-17 18:52 — Big Pickle (big-pickle / OpenCode, Windows) — сбор данных в пустую папку
- Делал: массовый обход README → источники; попыток 8, сохранено 4 в `data/`.
- Успех (4): 00_mnemonic.py.bin; 01_keystore.py.bin; 02_luckylurker.html; 03_luckylurker.md
- Отказ (4): https://luckylurker.com/bitcoin-vault-2/ [FAIL: Remote end closed connection witho]; https://bitcointalk.org/index.php?topic=5577554 [FAIL: <urlopen error [Errno 11001] getad]; https://luckylurker.com/bitcoin-vault-2-is-live-1-btc-prize/ [FAIL: Remote end closed connection witho]; https://bitcointalk.org/index.php?topic=5577554.0 [FAIL: <urlopen error [Errno 11001] getad]
- Артефакты: `data/SOURCES.md` + скачанные файлы.
- Проверено: да (HTTP-статус/байты); содержательная разборка — следующим шагом.

## 2026-10-18, 10:25 — OCP Sync (Qoder Desktop, Windows)
- Делал: служебная запись **без прогона** — транслирую инсайт из закрытого 18.10 пазла Genesis Block Wallet (перенесён в `solved/caesarcoder-genesis-block-wallet-puzzle-947ksats`) на этот пазл.
- Гипотеза «rounds-ось»: решение genesis было не в стандартных настройках KDF — **PBKDF2-HMAC-SHA512 rounds = 181 505 и 200 913 вместо 2 048** (числа кодируют время 18:15:05 UTC и дату 2009-01-03 генезис-блока), при пассфразе «Satoshi Nakamoto». Явного PBKDF2-кода в нашей папке нет (grep по `.py/.mjs/.js/.cu` — ноль), но есть сильный якорь: разбор vault-1 в `data/03_luckylurker.md:49` восстанавливает опубликованный сид стандартным Electrum-пайплайном `pbkdf2Sync(phrase, "electrum", 2048, 64, "sha512")` и попадает в адрес — т.е. у автора 2048 уже работал как надо, и априорная вероятность нестандартных rounds для vault-2 ниже, чем у чистых BIP39-пазлов. Приоритет оси: низкий.
- Следствие: полученные здесь нули корректны как «при rounds=2048 совпадений нет», но **не покрывают** пространство нестандартных rounds/соли — это ограничение интерпретации прежних негативов, а не новая ось перебора. Их собственный GPU-поиск тоже встал на 30 000 раундов (см. `data/ocp/README.md` genesis-папки), т.е. перебор по rounds вверх — это взрывной рост цены заCandidate, а не «ещё один заход».
- Что делать (бесплатный шаг): прочитать генератор/оракул пазла и подсказки автора на явные упоминания rounds / iterations / salt / «Electrum vs BIP39»; при неясности — вопрос автору только по решению куратора. **ПРОГОН НЕ ЗАПУСКАТЬ**: по `AGENT_INSTRUCTIONS.md` п.4 перебор допускается только по оси, суженной инсайтом, и требует отдельного ОК Ильи; «попробовать другие rounds» само по себе таким инсайтом не является.
- Артефакты: не создавались (запись текстовая).
- Ссылки: `solved/caesarcoder-genesis-block-wallet-puzzle-947ksats/LOG.md` (запись 10:05), https://github.com/floflo777/open-crypto-puzzles/pull/44 ; `_sources/ocp_sync_2026-10-18/delta_report.md`.
