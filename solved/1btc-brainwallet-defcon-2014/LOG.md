# LOG.md — журнал «1btc-brainwallet-defcon-2014»

> Формат ведения: см. `../../AGENT_INSTRUCTIONS.md`. Записи добавляются в конец; чужое не затирать.

## 2026-10-17, 18:48 — AutoClaw (модель zai_glm-5.3-flash, среда AutoClaw/Windows, проект «Default»)
- Бэкфилл: заведение журнала по протоколу (папка существовала с досье от 16.10.2026, LOG.md не был заведён).
- Тип объекта: пазл. Состояние папки: README 4993 байт (обогащённое досье), файлов 1, data/=нет, tools/=нет.
- Кратко из README: статус open / исторический; приз 1 BTC; типы brainwallet, book-cipher, word-selection; остаток-сложность n/a.
- Адрес/эскроу: n/a
- Источники: n/a
- Вся история и досье — в README.md этой папки; новые сессии описывать здесь (self-intro, что делал, результаты вкл. отрицательные, артефакты, ссылки).

## 2026-10-18 18:37 UTC — Qoder Desktop (Windows) — info-сбор: источник «20 подсказок из книги» не существует в найденных материалах
- Проверены сохранённые данные: `00_api.pullpush.io.json` — это пост 2017 г. о brainwallet-пазле **0,04 BTC** (`1E3NARnUX…VGDNC`, 12 загадок, решён Quantris), к «20 подсказкам» отношения не имеет; `01_api.pullpush.io.json` — пустая выдача.
- DEF CON 33 PDF (Joseph Gabay, «The One Bitcoin Heist… decade-old puzzle») с этой машины не скачивается (HTTP 000), конспект infocondb недоступен. По уже собранному досье: «The One Bitcoin Heist» — пазл 2014 г. на 1 BTC, **решён** в 2024 г. (доклад DEF CON 33); связка «20 подсказок из книги» ни в одном материале не встречается.
- Вывод: запись, вероятно, дублирует уже решённый «The One Bitcoin Heist» (или перепутана с 0,04 BTC brainwallet 2017). Рекомендация: переклассифицировать/закрыть при ревизии; для окончательного подтверждения нужен исходный URL от куратора каталога.


## 2026-10-19 14:19 UTC — Qoder Desktop (Windows) — ЗАКРЫТИЕ: это дубль уже решённого пазла, живой цели нет
- Что искалось: первоисточник «20 подсказок из книги → brainwallet, 1 BTC» и адрес приза. Адреса в
  досье никогда не было («Адрес в каталоге не зафиксирован — требуется уточнить (B43)»), поэтому
  он-чейн проверка невозможна в принципе: папка не может быть денежной целью.
- Первичный источник найден и лежит в папке: `data/02_the-one-bitcoin-heist-making-a-custom-hashcat-modu.html`
  (аннотация DEF CON 33, 08.08.2025, докладчик Joseph "stoppingcart" Gabay). Дословно: «In 2014,
  someone by the name of Spencer Lucas released the "One Bitcoin Book", a set of 20 clues that when
  solved, unlocked a bitcoin wallet containing one bitcoin (then valued at ~$400). Over 10 years and
  a six-figure price tag later, it remained unclaimed. **In December 2024, the prize was finally claimed** through a combination of human-solved solutions and a custom module for Hashcat…».
- Совпадение полное и по году, и по количеству подсказок, и по механизму (brainwallet = SHA-256 от
  фразы), и по номиналу (1 BTC). Прежняя формулировка каталога «DEFCON 2014» — неточность: пазл
  опубликован автором как «The One Bitcoin Book», а доклад о его взломе — DEF CON 33 (2025), не 2014.
- Итоговый вердикт: **дубль решённого пазла, приз был снят в декабре 2024**, незакрытых осей нет.
  Папка перенесена из `puzzles/` в `solved/` (раздел 5 `AGENT_INSTRUCTIONS.md`), строки обновлены в
  `solved/INDEX.md` (таблица «Решённые — приз снят»: 29 → 30, всего папок 55 → 56) и удалена из
  `puzzles/README.md`. Возврат в работу — только при новых данных (например, если куратор каталога
  даст ссылку на ДРУГОЙ пазл с 20 книжными подсказками).
- Не делали: GitHub-интейк (шлюз требуется для предложений/прогонов, здесь прогона нет — цель
  закрыта документально), прогонов, трат, транзакций, публикаций, обращений к автору и солверу.
- Ссылки: https://infocondb.org/con/def-con/def-con-33/the-one-bitcoin-heist-making-a-custom-hashcat-module-to-solve-a-decade-old-puzzle-challenge ;
  https://www.youtube.com/watch?v=74_4Q329PH8
