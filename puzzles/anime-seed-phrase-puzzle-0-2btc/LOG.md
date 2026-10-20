# LOG.md — журнал «anime-seed-phrase-puzzle-0-2btc»

> Формат ведения: см. `../../AGENT_INSTRUCTIONS.md`. Записи добавляются в конец; чужое не затирать.

## 2026-10-17, 18:48 — AutoClaw (модель zai_glm-5.3-flash, среда AutoClaw/Windows, проект «Default»)
- Бэкфилл: заведение журнала по протоколу (папка существовала с досье от 16.10.2026, LOG.md не был заведён).
- Тип объекта: пазл. Состояние папки: README 4020 байт (обогащённое досье), файлов 1, data/=нет, tools/=нет.
- Кратко из README: статус open; приз 0,2 BTC; типы bip39-seed, image-stego, word-selection; остаток-сложность n/a.
- Адрес/эскроу: n/a
- Источники: n/a
- Вся история и досье — в README.md этой папки; новые сессии описывать здесь (self-intro, что делал, результаты вкл. отрицательные, артефакты, ссылки).

## 2026-10-17 18:49 — Big Pickle (big-pickle / OpenCode, Windows) — сбор данных в пустую папку
- Делал: массовый обход README → источники; попыток 2, сохранено 2 в `data/`.
- Успех (2): 00_cryptokeepercanada.com.html; 01_europeanbusinessmagazine.com.html
- Отказ (0): —
- Артефакты: `data/SOURCES.md` + скачанные файлы.
- Проверено: да (HTTP-статус/байты); содержательная разборка — следующим шагом.

## 2026-10-18 18:37 UTC — Qoder Desktop (Windows) — info-сбор: первоисточник по-прежнему не найден
- Повторный поиск (WebSearch: «anime seed phrase puzzle 0.2 BTC», «0.2 BTC anime puzzle seed phrase reddit bitcoinpuzzles») прямого источника не дал. Проверена зацепка из скачанной статьи (europeanbusinessmagazine): единственная найденная в HTML строка, похожая на BTC-адрес (`1BRNyv5…veavE`), оказалась фрагментом имени файла картинки (`…FsolcVbd1BRNyv5…-218x150.webp`), а не адресом — блокчейн-проверка подтвердила «Invalid Bitcoin address».
- Ближайшее реальное совпадение по описанию — анимационный проект «Bitcoin & Friends» (8 серий, seed-фразы в сериях, призы в NFT на $150k), но сумма/формат не совпадают с 0,2 BTC; тождество не подтверждено.
- Вывод: запись остаётся **непроверенной** (нет ни адреса, ни автора, ни даты). Практической работы нет; кандидат на отбраковку/переклассификацию при ревизии каталога.

## 2026-10-19 11:10 UTC — Qoder Desktop (Windows) — НАЙДЕН ПЕРВОИСТОЧНИК И ОРИГИНАЛЬНАЯ КАРТИНКА
- Через браузер (хост-сеть до waivio/peakd не доходит, HTTP 000) открыта статья-первоисточник: https://www.waivio.com/@ferngully/solving-btc-puzzles-in-2025 — «The image contains a seed phrase. The prize is worth 0.2 BTC.» Это снимает прежний статус «непроверенной» записи: у пазла есть автор (ferngully), картинка и заявленный приз 0,2 BTC.
- Оригинал картинки скачан штатным способом автора (peakd CDN): https://images.hive.blog/0x0/https://files.peakd.com/file/peakd-hive/ferngully/EoeHtNgFju2aqNDznoDiBaG4fxK9cc3HDSvGJXZsjLcb5k1apKoCF589Hs3s971eFq5.png
  Артефакт: `data/anime_seed_0.2btc.png`, 1 956 309 байт, PNG 1280x960, RGB; sha256 `072e22a884abecb3a6a1177efc594a617445e36ca8d4b19f1e1df57344faa849`.
- Первичный визуальный разбор (preview_1400.png + 4 тайла): коллаж «WELCOME TO BRAVE NEW WORLD», набранный word-art (буквы из множества мелких слов — вероятный пул BIP39); фоновая надпись «THE SEED PHRASE IN THE …»; символика BLM/COVID/выборов 2020; вертикальные рунические полосы слева/справа (похоже Elder Futhark, справа читается начало «TIME…»); внизу латинская строка «Esse quam niger es, sic dixit cacobbus ollae».
- Адрес-эскроу 0,2 BTC пока НЕ найден; он-чейн не проверялся. Никаких прогонов/дериваций не делалось. Следующий шаг: извлечь слова word-art, декодировать руны и латинскую строку, найти адрес (статья/метаданные/privatekeys.pw), затем предрегистрировать ось ДО прогона.

## 2026-10-19 11:18 UTC — Qoder Desktop (Windows) — ИДЕНТИФИКАЦИЯ: это тот же пазл, что `blm-brave-new-world-0-2btc` (заморожен)
- Адрес из вертикальной надписи у левого края прочитан и проверен по base58check: `1KfZGvwZxsvSmemoCmEV75uqcNzYBHjkHZ` — контрольная сумма верна (единственный вариант из прочтений).
- Он-чейн (blockstream API через браузер, т.к. хост-сеть недоступна): funded_txo_count=5, funded_txo_sum=20 107 284 sat, spent_txo_count=0, spent_txo_sum=0, tx_count=5, mempool 0. Приз жив, 0 трат.
- Первоисточник: Reddit u/stsh_n, 2020-10-08, «Bitcoin puzzle (2000$)»; автор — stsh_n, не ferngully. Оригинал 1600x1200 (i.redd.it/n1x7g8ceaur51.png; зеркало raw.githubusercontent.com/agntn/puzzles/main/assets/brave-new-world/puzzle.png), sha256 `d0b04378f75d63997b8034ec2ef1bdd108178e4546de78237bd35abf4189a782`, RGBA, альфа непрозрачная, tEXt нет.
- Сообщество: пазл известен как «0.2 BTC Brave New World Puzzle», статус UNSOLVED; руны = русские фразы, над Трампом Bill Cipher → TUESDAY; каркас слов и сотни млрд дериваций уже проверены (см. досье `../blm-brave-new-world-0-2btc/README.md` и LOG.md).
- **Работа не запускалась**: в `blm-brave-new-world-0-2btc/LOG.md` зафиксировано решение Ильи от 17.10 «BLM остановлен». Дубликат закрываю как идентифицированный; перебор/деривации по этому пазлу без нового письменного ОК Ильи не делаю. Ключей/транзакций нет.
