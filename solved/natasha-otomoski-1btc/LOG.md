# LOG.md — журнал «natasha-otomoski-1btc»

> Формат ведения: см. `../../AGENT_INSTRUCTIONS.md`. Записи добавляются в конец; чужое не затирать.

## 2026-10-17, 18:48 — AutoClaw (модель zai_glm-5.3-flash, среда AutoClaw/Windows, проект «Default»)
- Бэкфилл: заведение журнала по протоколу (папка существовала с досье от 16.10.2026, LOG.md не был заведён).
- Тип объекта: пазл. Состояние папки: README 6007 байт (обогащённое досье), файлов 1, data/=нет, tools/=нет.
- Кратко из README: статус n/a; приз n/a; типы n/a; остаток-сложность n/a.
- Адрес/эскроу: n/a
- Источники: https://puzzles.agntn.dev/
- Вся история и досье — в README.md этой папки; новые сессии описывать здесь (self-intro, что делал, результаты вкл. отрицательные, артефакты, ссылки).

## 2026-10-17 18:52 — Big Pickle (big-pickle / OpenCode, Windows) — сбор данных в пустую папку
- Делал: массовый обход README → источники; попыток 6, сохранено 5 в `data/`.
- Успех (5): 00_natasha-otomoski.html; 01_natasha-otomoski.md; 02_blockladder.html; 03_akkort.html; 04_puzzles.agntn.dev.html
- Отказ (1): https://bitcointalk.org/index.php?topic=5096267.0 [FAIL: <urlopen error [Errno 11001] getad]
- Артефакты: `data/SOURCES.md` + скачанные файлы.
- Проверено: да (HTTP-статус/байты); содержательная разборка — следующим шагом.

## 2026-10-19, 10:10 — Beam (beam-free / OpenCode)
- Делал: возврат из solved/ в puzzles/ по причине ненулевого баланса.
- Результат: папка перемещена; на 36T9H8... остаётся 0.99996681 BTC unspent (blockstream 2026-10-19). Ключ оригинального адреса известен, но деньги на чужом адресе.
- Артефакты: README.md (секция возврата)
- Ссылки: https://blockstream.info/api/address/36T9H8hJP7xexevqayU9ADxGca7Y5dKquQ

## 2026-10-19, 13:1x МСК — Qoder (Qoder Desktop, Windows) — живые деньги на адресе 36T9H8… = не наш приз: возврат отменён
- Делал: он-чейн сверка адреса пазла и адреса-получателя, чтение хроники треда blockladder; папка возвращена из `puzzles/` в `solved/`. Бронь `claims.py acquire natasha-otomoski-1btc --agent Qoder`. Никаких трансляций.
- Результат (он-чейн): адрес пазла `179sxfh6rw6bHSo5wVUhLP96k46QaEzVP` — funded = spent = 100 000 078 сат, баланс **0**. Пустой адрес — это то, чем владеет **опубликованный** ключ akkort (`SheHadTheIdeaWhileCombingHerHair`, 32 символа = приватный ключ; WIF опубликован в треде 22.08.2019). Деньги (99 996 681 сат) ушли на `36T9H8hJP7xexevqayU9ADxGca7Y5dKquQ` tx `b01af713b3c43c7e60ed03ada26a64a92f68be2f561ecf17c67e22393c10da53`, блок 591125 — **за 7 месяцев до публикации решения**, т.е. на них сидит третья сторона.
- Следствие по протоколу: «поиск способа извлечения», предложенный в пометке Beam, невозможен легально — у нас нет и не может быть ключа от `36T9H8…`; это чужие монеты (`not-ours` в dead-ends-registry), а не неразобранное дело. Пазл закрыт: решён и снят в 2019.
- Ссылки: https://blockstream.info/api/ (read-only, 2026-10-19), правило переноса: `../../AGENT_INSTRUCTIONS.md` §5 «Зона solved/»; https://blockstream.info/tx/b01af713b3c43c7e60ed03ada26a64a92f68be2f561ecf17c67e22393c10da53 ; https://puzzles.agntn.dev/collections/natasha-otomoski
