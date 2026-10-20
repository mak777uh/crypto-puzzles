# LOG.md — журнал «onfo-forsyth-1btc»

> Формат ведения: см. `../../AGENT_INSTRUCTIONS.md`. Записи добавляются в конец; чужое не затирать.

## 2026-10-17, 18:48 — AutoClaw (модель zai_glm-5.3-flash, среда AutoClaw/Windows, проект «Default»)
- Бэкфилл: заведение журнала по протоколу (папка существовала с досье от 16.10.2026, LOG.md не был заведён).
- Тип объекта: пазл. Состояние папки: README 5774 байт (скелет из OCP — требует обогащения), файлов 1, data/=нет, tools/=нет.
- Кратко из README: статус dead-end; приз 1 BTC (USD 63000); типы raw-private-key, video-series; остаток-сложность external-info.
- Адрес/эскроу: 157dpLJgAAKugukKz8UwBHapM4idyZvnLc
- Источники: https://www.benzinga.com/pressreleases/21/06/a21717862/onfo-announces-bitcoin-treasure-hunt
- Вся история и досье — в README.md этой папки; новые сессии описывать здесь (self-intro, что делал, результаты вкл. отрицательные, артефакты, ссылки).

## 2026-10-17 18:52 — Big Pickle (big-pickle / OpenCode, Windows) — сбор данных в пустую папку
- Делал: массовый обход README → источники; попыток 7, сохранено 4 в `data/`.
- Успех (4): 00_README.md; 01_onfo-announces-bitcoin-treasure-hunt.html; 02_bitcoin-millionaire-onfo-coin-creator-dead.html; 03_README.md
- Отказ (3): https://raw.githubusercontent.com/floflo777/open-crypto-puzzles/main/a [FAIL: HTTP Error 404: Not Found | jina: ]; https://raw.githubusercontent.com/floflo777/open-crypto-puzzles/main/a [FAIL: HTTP Error 404: Not Found | jina: ]; https://github.com/floflo777/open-crypto-puzzles [FAIL: IncompleteRead(294912 bytes read) ]
- Артефакты: `data/SOURCES.md` + скачанные файлы.
- Проверено: да (HTTP-статус/байты); содержательная разборка — следующим шагом.

## 2026-10-19, 10:10 — Beam (beam-free / OpenCode)
- Делал: возврат из solved/ в puzzles/ по причине ненулевого баланса.
- Результат: папка перемещена; на эскроу 157dpLJ... остаётся 1.0 BTC unspent (blockstream 2026-10-19). Статус dead-end сохраняется, но пазл снова активен для поиска решения.
- Артефакты: README.md (секция возврата)
- Ссылки: https://blockstream.info/api/address/157dpLJgAAKugukKz8UwBHapM4idyZvnLc

## 2026-10-19 09:10 UTC — Qoder Desktop (Windows) — read-only он-чейн перепроверка 1 BTC: жив, подсказок в tx нет
- Бронь `onfo-forsyth-1btc` (Qoder, TTL 60), только чтение; транзакций нет.
- Баланс (mempool.space): `157dpLJgAAKugukKz8UwBHapM4idyZvnLc` — funded **100 000 000 sat**, spent **0**, баланс **1,00000000 BTC**.
- Funding tx `c6f2e9e327c2ffa4a9eb229788afad96119c249f30d4acbda41d7f9c53b05434` (2021-06-04): выходы — 99 744 150 sat сдачи на `12hPWtyDruaauk4ghxDeh6n4UqCQcFFFqo` и ровно 100 000 000 sat на эскроу. **OP_RETURN нет.**
- У адреса автора `12hPWty…` всего 2 tx; OP_RETURN/текстовых сообщений нет.
- Вывод: приз жив, но механизм по-прежнему требует все 10 видео (опубликованы только 1–5; 6–10 не выходили, автор умер в 2023). Статус dead-end без изменений. Прогонов не было.

## 2026-10-19, 13:1x МСК — Qoder (Qoder Desktop, Windows) — триаж живых балансов: возврат в `puzzles/` отменён
- Делал: независимая он-чейн сверка адреса приза + перечитка правила §5; папка возвращена из `puzzles/` в `solved/` (перенос сегодня сделал Beam по основанию «на адресе лежат деньги»). Транзакций не создавал и не транслировал, бронь `claims.py acquire onfo-forsyth-1btc --agent Qoder`.
- Результат (он-чейн): `157dpLJgAAKugukKz8UwBHapM4idyZvnLc` — funded 100 000 000 сат, spent 0, tx_count 1 → приз жив **с 2021-06**, т.е. это не «вернули/пополнили» и не «автор открыл этап». Новых данных нет: досье и так фиксировало `state: funded-unspent` (проверка 16.08.2026).
- Почему остаётся тупиком: половина корпуса не опубликована (сегменты 6–10), единственный названный держатель ключа умер в 2023 (cointelegraph), готового решения в сети нет; перебор raw-private-key не сужен ни одной инсайт-осью → по правилу Ильи №4 прогон запрещён.
- Ссылки: https://blockstream.info/api/ (read-only, 2026-10-19), правило переноса: `../../AGENT_INSTRUCTIONS.md` §5 «Зона solved/»; https://www.benzinga.com/pressreleases/21/06/a21717862/onfo-announces-bitcoin-treasure-hunt ; https://cointelegraph.com/news/bitcoin-millionaire-onfo-coin-creator-dead

## 2026-10-19, 13:5x МСК — Qoder (Qoder Desktop, Windows) — решение владельца: статус «сторож»
- Делал: по ответу Ильи на уточняющий вопрос (`Вернуть в puzzles/ со статусом «сторож»`) вернул папку из `solved/` в `puzzles/` (`mv`), снял прежнюю пометку «возврат отменён», обновил баннер и строку статуса в README, синхронизировал `solved/INDEX.md` (строки убраны, раздел Dead-end 14→12) и `puzzles/README.md` (2 строки с меткой [сторож]).
- Результат: цель переведена в режим наблюдения вместо архива. Крипто-работа не ведётся: нет инсайт-оси (правило №4), поэтому прогоны не запускались и не планируются.
- Инструмент: `tools/sandbox/monitor.py` (watch-only, только GET blockstream.info) + `tools/sandbox/watchonly.json` (адрес в списке), `tools/sandbox/psbt_prepare.py` умеет готовить только НЕПОДПИСАННЫЙ PSBT — адрес назначения Илья ещё не выдал.
- Артефакты: tools/sandbox/{README.md,monitor.py,watchonly.json,psbt_prepare.py}, tools/_oneoff_watch_status_2026-10-19.py
- Ссылки: https://blockstream.info/api (балансы 19.10.2026), AGENT_INSTRUCTIONS.md §5 «Зона solved/», правила №4, №5, №6.
