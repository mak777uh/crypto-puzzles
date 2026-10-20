# LOG.md — журнал «objective-thune-licorne-0-21btc»

> Формат ведения: см. `../../AGENT_INSTRUCTIONS.md`. Записи добавляются в конец; чужое не затирать.

## 2026-10-17, 18:48 — AutoClaw (модель zai_glm-5.3-flash, среда AutoClaw/Windows, проект «Default»)
- Бэкфилл: заведение журнала по протоколу (папка существовала с досье от 16.10.2026, LOG.md не был заведён).
- Тип объекта: пазл. Состояние папки: README 6390 байт (скелет из OCP — требует обогащения), файлов 1, data/=нет, tools/=нет.
- Кратко из README: статус dead-end; приз 0.21021 BTC (USD 13243); типы multisig, physical-object, book; остаток-сложность none.
- Адрес/эскроу: 3Jf995GANG4EmFBK89byNNyZdtB3ELXJsZ
- Источники: https://bitcoin.fr/le-secret-de-la-licorne/
- Вся история и досье — в README.md этой папки; новые сессии описывать здесь (self-intro, что делал, результаты вкл. отрицательные, артефакты, ссылки).

## 2026-10-17 18:52 — Big Pickle (big-pickle / OpenCode, Windows) — сбор данных в пустую папку
- Делал: массовый обход README → источники; попыток 7, сохранено 6 в `data/`.
- Успех (6): 00_README.md; 01_leads.md; 02_tested.md; 03_bitcoin.fr.html; 04_222-soutien-licorne-financement-participatif-d-une.html; 05_journalducoin.com.html
- Отказ (1): https://github.com/floflo777/open-crypto-puzzles [FAIL: IncompleteRead(327680 bytes read) ]
- Артефакты: `data/SOURCES.md` + скачанные файлы.
- Проверено: да (HTTP-статус/байты); содержательная разборка — следующим шагом.

## 2026-10-19, 10:10 — Beam (beam-free / OpenCode)
- Делал: возврат из solved/ в puzzles/ по причине ненулевого баланса.
- Результат: папка перемещена; на 3Jf995... остаётся 0.21021 BTC unspent (blockstream 2026-10-19). Пазл физический (2-of-? ключи в книгах), но деньги не сняты.
- Артефакты: README.md (секция возврата)
- Ссылки: https://blockstream.info/api/address/3Jf995GANG4EmFBK89byNNyZdtB3ELXJsZ

## 2026-10-19, 13:1x МСК — Qoder (Qoder Desktop, Windows) — триаж живых балансов: возврат в `puzzles/` отменён
- Делал: он-чейн сверка эскроу + перечитка §5; папка возвращена из `puzzles/` в `solved/`. Бронь `claims.py acquire objective-thune-licorne-0-21btc --agent Qoder`. Трансляций нет.
- Результат (он-чейн): `3Jf995GANG4EmFBK89byNNyZdtB3ELXJsZ` = 21 021 000 сат, трат 0 — приз жив с 2020 (2 пополнения: 03.01.2020 и 19.06.2020). Основания для возврата по §5 («приз вернули/пополнили», «автор открыл этап») отсутствуют: пополнений после 2020 не было.
- Почему тупик: 2-of-3 multisig по физическим книгам — нужны 3 ключа из 210 нумерованных экземпляров. Это физический факт, не вычисление; готового решения в сети нет.
- Ссылки: https://blockstream.info/api/ (read-only, 2026-10-19), правило переноса: `../../AGENT_INSTRUCTIONS.md` §5 «Зона solved/»; https://bitcoin.fr/le-secret-de-la-licorne/ ; https://mempool.space/address/3Jf995GANG4EmFBK89byNNyZdtB3ELXJsZ

## 2026-10-19, 13:5x МСК — Qoder (Qoder Desktop, Windows) — решение владельца: статус «сторож»
- Делал: по ответу Ильи на уточняющий вопрос (`Вернуть в puzzles/ со статусом «сторож»`) вернул папку из `solved/` в `puzzles/` (`mv`), снял прежнюю пометку «возврат отменён», обновил баннер и строку статуса в README, синхронизировал `solved/INDEX.md` (строки убраны, раздел Dead-end 14→12) и `puzzles/README.md` (2 строки с меткой [сторож]).
- Результат: цель переведена в режим наблюдения вместо архива. Крипто-работа не ведётся: нет инсайт-оси (правило №4), поэтому прогоны не запускались и не планируются.
- Инструмент: `tools/sandbox/monitor.py` (watch-only, только GET blockstream.info) + `tools/sandbox/watchonly.json` (адрес в списке), `tools/sandbox/psbt_prepare.py` умеет готовить только НЕПОДПИСАННЫЙ PSBT — адрес назначения Илья ещё не выдал.
- Артефакты: tools/sandbox/{README.md,monitor.py,watchonly.json,psbt_prepare.py}, tools/_oneoff_watch_status_2026-10-19.py
- Ссылки: https://blockstream.info/api (балансы 19.10.2026), AGENT_INSTRUCTIONS.md §5 «Зона solved/», правила №4, №5, №6.
