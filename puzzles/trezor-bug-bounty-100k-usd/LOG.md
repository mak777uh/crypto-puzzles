# LOG.md — журнал «trezor-bug-bounty-100k-usd»

> Формат ведения: см. `../../AGENT_INSTRUCTIONS.md`. Записи добавляются в конец; чужое не затирать.

## 2026-10-17, 18:48 — AutoClaw (модель zai_glm-5.3-flash, среда AutoClaw/Windows, проект «Default»)
- Бэкфилл: заведение журнала по протоколу (папка существовала с досье от 16.10.2026, LOG.md не был заведён).
- Тип объекта: пазл. Состояние папки: README 4972 байт (обогащённое досье), файлов 1, data/=нет, tools/=нет.
- Кратко из README: статус open (программа); приз до $100 000; типы hardware-wallet, security-research; остаток-сложность n/a.
- Адрес/эскроу: n/a
- Источники: https://trezor.io/security
- Вся история и досье — в README.md этой папки; новые сессии описывать здесь (self-intro, что делал, результаты вкл. отрицательные, артефакты, ссылки).

## 2026-10-17 18:55 — Big Pickle (big-pickle / OpenCode, Windows) — сбор данных в пустую папку
- Делал: массовый обход README → источники; попыток 4, сохранено 4 в `data/`.
- Успех (4): 00_security.html; 01_trezor-bug-bounty-program-scope-rules-and-rewards.html; 02_Unfixable-Key-Extraction-Attack-on-Trezor.html; 03_wallet-bounty.html
- Отказ (0): —
- Артефакты: `data/SOURCES.md` + скачанные файлы.
- Проверено: да (HTTP-статус/байты); содержательная разборка — следующим шагом.
