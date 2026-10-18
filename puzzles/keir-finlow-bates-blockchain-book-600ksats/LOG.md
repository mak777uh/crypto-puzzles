# LOG.md — журнал «keir-finlow-bates-blockchain-book-600ksats»

> Формат ведения: см. `../../AGENT_INSTRUCTIONS.md`. Записи добавляются в конец; чужое не затирать.

## 2026-10-17, 18:48 — AutoClaw (модель zai_glm-5.3-flash, среда AutoClaw/Windows, проект «Default»)
- Бэкфилл: заведение журнала по протоколу (папка существовала с досье от 16.10.2026, LOG.md не был заведён).
- Тип объекта: пазл. Состояние папки: README 20156 байт (обогащённое досье), файлов 1, data/=нет, tools/=нет.
- Кратко из README: статус open; приз 600000 sats (USD 378); типы book, brainwallet, text-cipher; остаток-сложность human-action.
- Адрес/эскроу: 14aFhno96fkt7knLWMDQ4j8yh8v5hBF4n1
- Источники: https://kf106.medium.com/everyone-loves-a-treasure-hunt-93885ae8d80a
- Вся история и досье — в README.md этой папки; новые сессии описывать здесь (self-intro, что делал, результаты вкл. отрицательные, артефакты, ссылки).

## 2026-10-17 18:51 — Big Pickle (big-pickle / OpenCode, Windows) — сбор данных в пустую папку
- Делал: массовый обход README → источники; попыток 7, сохранено 6 в `data/`.
- Успех (6): 00_README.md; 01_leads.md; 02_tested.md; 03_open-crypto-puzzles.html; 04_B08QSH5X91.html; 05_README.md
- Отказ (1): https://kf106.medium.com/everyone-loves-a-treasure-hunt-93885ae8d80a [FAIL: <urlopen error [Errno 11001] getad]
- Артефакты: `data/SOURCES.md` + скачанные файлы.
- Проверено: да (HTTP-статус/байты); содержательная разборка — следующим шагом.


## 2026-10-17, 19:09 — AutoClaw (zai_glm-5.3-flash / AutoClaw, Windows)
- Прорыв данных: OCP-папка keir-finlow-bates-blockchain-book-600ksats содержит ПОЛНЫЙ разбор серии (32 КБ README floflo777): 12 лотов по 200,000 сат, **3 открыты и живы** (балансы проверены 17.10: EN_medium 17Y9cz…, EN_veryhard 1DZ5Nb…, IT_veryhard 19kkaw… — по 200,000 сат, 1 tx, не тронуты). Итог 600,000 сат ≈ $378.
- Механика подтверждена: точная строка-ответ → SHA-256×3 (raw chaining, варианты hex-строки ±newline проверяются оракулом) → uncompressed P2PKH. Оракул сертифицирован (EN_easy_1 «221B Baker Street», EN_easy_2 «9781688289970», IT_hard «Genova Firenze Bologna Brindisi»). Известные ответы — конкретные идентификаторы, не предложения.
- floflo777 решил 4 лота сам в 2026 (EN_hard_1/2, IT_medium/hard) и исчерпал EBOOK; вероятный гейт открытых лотов — физическая книга (KDP paperback ISBN 9781688289970 / Lulu hardcover 9781716479724; «Limited Indexed Edition» 2025 — 330 стр., лишних данных о ханте нет). Наша старая заметка «нужна физическая книга, 3 лота по 200k» — подтверждена и уточнена.
- Варианты без покупки: Amazon Look Inside превью нужных страниц (бесплатно), автора спросить нельзя? — можно: автор жив (kf106.medium.com, статья 2025-09-11 «Everyone Loves a Treasure Hunt»); письма = ОК Ильи.
- Артефакты: data/ocp_readme_2026.md, data/ocp_lots.csv (все 12 лотов, адреса, состояния, даты).
- Следующий шаг: прочитать leads.md/tested.md OCP (что именно ищется в 3 открытых лотах), затем Look Inside / решение о покупке.
