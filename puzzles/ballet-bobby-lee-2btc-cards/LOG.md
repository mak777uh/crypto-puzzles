# LOG.md — журнал «ballet-bobby-lee-2btc-cards»

> Формат ведения: см. `../../AGENT_INSTRUCTIONS.md`. Записи добавляются в конец; чужое не затирать.

## 2026-10-17, 18:48 — AutoClaw (модель zai_glm-5.3-flash, среда AutoClaw/Windows, проект «Default»)
- Бэкфилл: заведение журнала по протоколу (папка существовала с досье от 16.10.2026, LOG.md не был заведён).
- Тип объекта: пазл. Состояние папки: README 11474 байт (обогащённое досье), файлов 1, data/=нет, tools/=нет.
- Кратко из README: статус open; приз 2.00007358 BTC (USD 126005); типы bip38, physical-object; остаток-сложность external-info.
- Адрес/эскроу: 1JxWyNrkgYvgsHu8hVQZqTXEB9RftRGP5m
- Источники: https://x.com/bobbyclee/status/1289004702122643456
- Вся история и досье — в README.md этой папки; новые сессии описывать здесь (self-intro, что делал, результаты вкл. отрицательные, артефакты, ссылки).

## 2026-10-17 18:50 — Big Pickle (big-pickle / OpenCode, Windows) — сбор данных в пустую папку
- Делал: массовый обход README → источники; попыток 8, сохранено 6 в `data/`.
- Успех (6): 00_README.md; 01_leads.md; 02_tested.md; 03_README.md; 04_ballet.html; 05_ballet.md
- Отказ (2): https://github.com/floflo777/open-crypto-puzzles [FAIL: IncompleteRead(327680 bytes read) ]; https://github.com/oritwoen/boha [FAIL: IncompleteRead(327680 bytes read) ]
- Артефакты: `data/SOURCES.md` + скачанные файлы.
- Проверено: да (HTTP-статус/байты); содержательная разборка — следующим шагом.

## 2026-10-18, 09:52 — OCP Sync (Qoder Desktop, Windows) <!-- ocp-snapshot:19644e58 -->
- Делал: обогащение из внешнего репозитория [open-crypto-puzzles](https://github.com/floflo777/open-crypto-puzzles) — раскладка дельты снапшота `19644e58` (клон `_sources/ocp/`, реестр `_sources/OCP_SNAPSHOT.md`). Протокол: `claims acquire/heartbeat/release` по `ballet-bobby-lee-2btc-cards`. Прогонов/переборов не запускали, статус пазла и балансы не меняли, чужие файлы не перезатёрты (копии лежат отдельными деревами `data/ocp/` и `tools/ocp/` с provenance).
- Результат: перенесено 7 файлов данных → `data/ocp/`, 3 кода → `tools/ocp/`,3 тяжёлых (>250 КБ) оставлены в клоне — указатель `data/ocp/_HEAVY.md`. Зеркал, уже лежащих в базе, пропущено: 3. Статус по OCP: `open`.
- Артефакты: `1-big-prizes/ballet-bobby-lee-2btc-cards/clues/AA009926-revealed.jpg`, `1-big-prizes/ballet-bobby-lee-2btc-cards/clues/author-posts.md`, `1-big-prizes/ballet-bobby-lee-2btc-cards/data/card-faces.json`, `1-big-prizes/ballet-bobby-lee-2btc-cards/data/pipeline-stages.json`, `1-big-prizes/ballet-bobby-lee-2btc-cards/images/01-structure-card-faces.svg`, `1-big-prizes/ballet-bobby-lee-2btc-cards/images/02-pipeline-derivation.svg`, `1-big-prizes/ballet-bobby-lee-2btc-cards/puzzle.json`, `1-big-prizes/ballet-bobby-lee-2btc-cards/tools/fig_cards.py`, `1-big-prizes/ballet-bobby-lee-2btc-cards/tools/fig_pipeline.py`, `1-big-prizes/ballet-bobby-lee-2btc-cards/tools/oracle.py`
- Ссылки/доказательства: https://github.com/floflo777/open-crypto-puzzles/tree/19644e58e50721f8469680f2edcba1daa0697630/1-big-prizes/ballet-bobby-lee-2btc-cards ; полная дельта — `_sources/ocp_sync_2026-10-18/delta_report.md`.

## 2026-10-19 20:58 UTC — Qoder — первоисточники через VPN: формат+алфавит passphrase, «раздельные локации», полный ANN-тред

- Бронь: взята `claims acquire` (Qoder, TTL 120 мин), в конце цикла снята. Призы перепроверены ДО работы:
  100 003 481 + 100 003 877 = **200 007 358 сат живы** (blockstream, spent 0).
- `takebobbysbitcoin.com` = **NXDOMAIN** (и через VPN); восстановлен `id_`-захват Wayback 2020-07-31.
  Дословная официальная подсказка: passphrase = **заглавные латинские буквы + цифры + дефисы**, ровно
  24 символа вида `XXXX-XXXX-XXXX-XXXX-XXXX` (раньше в папке был только шаблон, без правила алфавита).
- Новый первоисточник-аттестация носителей: 3 PNG (фото карты AA012381 с открытым passphrase,
  `privatekey.png`, `privatekey-sealed.png`) + HTML+текст страницы → `data/primary_2026-10-19/`.
- ANN-тред bitcointalk **topic=5265748** (43 поста, 3 страницы) скачан целиком (`tools/ballet_thread_2026-10-19.py`,
  только GET): **ни одного фото карты AA009926**, passphrase-подсказок автор не добавлял.
  Ключевые слова автора (msg 54930754, 2020-08-04): карты взяты из производства в Лас-Вегасе, не «бронировались»,
  и раскрыт ровно один из двух компонентов для каждой; по пересказу процесса (MoparMiningLLC)
  **ключ и passphrase генерируются и гравируются в разных географических локациях** → ось
  «passphrase выводится из серийного номера» закрыта словами производителя.
- Арифметика, запрещающая ложные надежды: 36^20 = 1,34·10^31 ≈ 2^103,6 (на гипотезу — отдельный
  scrypt N=16384,r=8,p=8); даже с эмпирическим «###Y» в первой группе = 2^85,6. **GPU под Ballet не нужен.**
- Вердикт: цель остаётся **external-info / physical carrier** (фото карты AA009926). Новых прогонов не запускалось,
  транзакций/трат/писем не было. Подробный разбор: `data/06_primary_sources_2026-10-19.md`.
