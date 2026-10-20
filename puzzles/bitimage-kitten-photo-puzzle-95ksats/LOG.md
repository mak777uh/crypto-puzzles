# LOG.md — журнал «bitimage-kitten-photo-puzzle-95ksats»

> Формат ведения: см. `../../AGENT_INSTRUCTIONS.md`. Записи добавляются в конец; чужое не затирать.

## 2026-10-17, 18:48 — AutoClaw (модель zai_glm-5.3-flash, среда AutoClaw/Windows, проект «Default»)
- Бэкфилл: заведение журнала по протоколу (папка существовала с досье от 16.10.2026, LOG.md не был заведён).
- Тип объекта: пазл. Состояние папки: README 8656 байт (обогащённое досье), файлов 1, data/=нет, tools/=нет.
- Кратко из README: статус open; приз ~0,00095 BTC; типы image-stego, brainwallet, bip39-seed; остаток-сложность n/a.
- Адрес/эскроу: n/a
- Источники: https://github.com/coreyphillips/bitimage
- Вся история и досье — в README.md этой папки; новые сессии описывать здесь (self-intro, что делал, результаты вкл. отрицательные, артефакты, ссылки).

## 2026-10-17 18:50 — Big Pickle (big-pickle / OpenCode, Windows) — сбор данных в пустую папку
- Делал: массовый обход README → источники; попыток 6, сохранено 4 в `data/`.
- Успех (4): 00_bitimage.html; 01_31.html; 02_bitimage.html; 03_bitimage.md
- Отказ (2): https://corey-lyle-phillips.medium.com/part-1-3-turn-your-photos-into- [FAIL: <urlopen error [Errno 11001] getad]; https://corey-lyle-phillips.medium.com/… [FAIL: 'ascii' codec can't encode charact]
- Артефакты: `data/SOURCES.md` + скачанные файлы.
- Проверено: да (HTTP-статус/байты); содержательная разборка — следующим шагом.

## 2026-10-18 18:32 UTC — Qoder Desktop (Windows) — он-чейн проверка: приз снят
- Проверка (read-only, blockstream): `bc1q57euh23y3qs2f9d5mtwpax5lqecfvrdkqce82a` → funded 415 133, spent 415 133, 4 tx.
- Вывод: адрес полностью опустошён (ранее подтверждено 2019), приз снят → досье кандидат в `solved/` по правилам каталога (перенос — при следующей ревизии, без переноса папки этой сессией).
- Команда воспроизведения: `curl -s https://blockstream.info/api/address/bc1q57euh23y3qs2f9d5mtwpax5lqecfvrdkqce82a`.
