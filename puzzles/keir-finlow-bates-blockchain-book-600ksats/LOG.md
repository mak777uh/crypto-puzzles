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

## 2026-10-18, 09:52 — OCP Sync (Qoder Desktop, Windows) <!-- ocp-snapshot:19644e58 -->
- Делал: обогащение из внешнего репозитория [open-crypto-puzzles](https://github.com/floflo777/open-crypto-puzzles) — раскладка дельты снапшота `19644e58` (клон `_sources/ocp/`, реестр `_sources/OCP_SNAPSHOT.md`). Протокол: `claims acquire/heartbeat/release` по `keir-finlow-bates-blockchain-book-600ksats`. Прогонов/переборов не запускали, статус пазла и балансы не меняли, чужие файлы не перезатёрты (копии лежат отдельными деревами `data/ocp/` и `tools/ocp/` с provenance).
- Результат: перенесено 8 файлов данных → `data/ocp/`, 5 кода → `tools/ocp/`,0 тяжёлых (>250 КБ) оставлены в клоне — указатель `data/ocp/_HEAVY.md`. Зеркал, уже лежащих в базе, пропущено: 4. Статус по OCP: `open`.
- Артефакты: `2-mid-prizes/keir-finlow-bates-blockchain-book-600ksats/clues/author-posts.md`, `2-mid-prizes/keir-finlow-bates-blockchain-book-600ksats/data/pipeline-stages.json`, `2-mid-prizes/keir-finlow-bates-blockchain-book-600ksats/data/pow-nonce-best.csv`, `2-mid-prizes/keir-finlow-bates-blockchain-book-600ksats/data/timeline.csv`, `2-mid-prizes/keir-finlow-bates-blockchain-book-600ksats/images/01-pipeline-derivation.svg`, `2-mid-prizes/keir-finlow-bates-blockchain-book-600ksats/images/02-structure-lots.svg`, `2-mid-prizes/keir-finlow-bates-blockchain-book-600ksats/images/03-timeline-funding.png`, `2-mid-prizes/keir-finlow-bates-blockchain-book-600ksats/puzzle.json`, `2-mid-prizes/keir-finlow-bates-blockchain-book-600ksats/tools/fig_lots.py`, `2-mid-prizes/keir-finlow-bates-blockchain-book-600ksats/tools/fig_pipeline.py`, `2-mid-prizes/keir-finlow-bates-blockchain-book-600ksats/tools/fig_timeline.py`, `2-mid-prizes/keir-finlow-bates-blockchain-book-600ksats/tools/oracle.py` …
- Ссылки/доказательства: https://github.com/floflo777/open-crypto-puzzles/tree/19644e58e50721f8469680f2edcba1daa0697630/2-mid-prizes/keir-finlow-bates-blockchain-book-600ksats ; полная дельта — `_sources/ocp_sync_2026-10-18/delta_report.md`.

## 2026-10-19, 14:01 UTC — Qoder Desktop — он-чейн 12 лотов + 4 опубликованных ответа из OCP
- Делал: сплошной скан локального клона `open-crypto-puzzles` (`_sources/ocp/`, `git pull` перед сканом)
  скриптом `../../tools/ocp_live_with_answer.py` — искал открытые пазлы, у которых ЕСТЬ живой баланс
  и публично опубликованный ответ/ключ (законная «быстрая» форма — гонка, а не инсайт). Затем сверил
  все 12 адресов лотов этого пазла напрямую через blockstream.info (read-only). Прогонов/переборов
  не запускалось, покупок и транзакций нет. Бронь: `claims.py acquire keir-finlow-bates-blockchain-book-600ksats --agent Qoder`.
- **Он-чейн на 2026-10-19 14:01 UTC (свежее последней проверки куратора 2026-09-01):** живых лотов ровно
  три, по 200 000 сат каждый, `spent 0`, `1 tx` — то есть никто не опередил:
  * `17Y9czcbcCz433QXsy1SGQjwLb27BBtLLZ` — EN_medium, остаток 200 000;
  * `1DZ5NbUwDgxeJkKhQLgYcUUX36PtYso1pm` — EN_veryhard, остаток 200 000;
  * `19kkawFcg2U2s6vq368MXD7FJU9JZvRrjA` — IT_veryhard, остаток 200 000.
  Остальные девять опустошены (0). Суммарный живой приз — **600 000 сат**.
- **Публикация ключей по РЕШЁННЫМ лотам** (из `2-mid-prizes/keir-finlow-bates-blockchain-book-600ksats/puzzle.json`,
  поле `solutions`; `key_material_disclosed: true`, выплаты шли на `bc1qax0hsnwnxl7393awtc3hsy0ftm6tg4tyk2nfja`):
  * EN_hard_1 (17.06.2026): `carpet baby bicycle betray shift approve barrel phrase measure prevent image brain`
    — то есть ответом может быть **сама BIP39-фраза**, прогнанная через sha256x3;
  * EN_hard_2 (25.06.2026): «XOR of the 7 SHA-256 values printed in Figure 10»;
  * IT_medium (01.07.2026): `orologio snervato mugnaio enzima scienza glutine spargere valletta diametro pianta totano civetta`;
  * IT_hard (03.07.2026): `Genova Firenze Bologna Brindisi`.
  Плюс известные из README куратора: EN_easy_1 = `221B Baker Street`, EN_easy_2 = `9781688289970`
  (ISBN бумажного издания — строки, которой **нет** в электронной версии).
  Это калибровочный набор из 6 «лот → точный ответ», и он ценен сам по себе: на нём сертифицируется
  оракул `tools/oracle.py` (sha256x3 → uncompressed P2PKH), что делает любой будущий негатив настоящим.
- **Что уже закрыто куратором (важно, чтобы не повторять):** ~9 600 строк-ответов, 694 000 форм номеров
  страниц, 800 800 форм ISBN-надстроек и **34,4·10^9** PoW-нонцев (фигура 11, 45 млн хеш/с, 24 ядра,
  8 мин 56 с) — 0 совпадений по трём открытым лотам; закрыты акростихи, «planted flaws», пары знаков,
  discography, Erdos-цепочка, Merkle-корни из строк фигур, печати 4 изданий, front/back matter.
- **Единственный незакрытый лид куратора** — физическая книга: KDP-папербек (ISBN 9781688289970),
  Lulu-хардкорвер (9781716479724) и итальянский папербек, ~$60 за три. Обоснование: ответ EN_easy_2
  (ISBN) существует только на печатном объекте, а внутренности страниц 9-320 бумажных изданий
  цифровыми средствами не получены. Второй лид — разгадать IT_easy по **раскрытому на-чейн
  публичному ключу** как бесплатный калибровочный оракул (лот уже снят, но ответ покажет стиль
  итальянских ответов и бьёт прямо в IT_veryhard).
- **Вывод по приоритету «быстрые деньги»**: это самый дешёвый из всех известных блокеров в каталоге —
  ~$60 и ручное чтение трёх книг против 600 000 сат живого приза, с готовым сертифицированным оракулом.
  Для сравнения: Nuaza — €8,99 при ~2 % шансов и 10^16 чужих негативов. Решение о покупке — за Ильёй;
  без физического объекта (или без доступа к нему) работа упирается в тот же тупик, что и у куратора.

## 2026-10-19 18:42 UTC — Qoder (сплошной BTC-свип, правки досье не вносил)
- Он-чейн (blockstream, только GET): три призовых лота живы и не потрачены —
  `17Y9czcbcCz433QXsy1SGQjwLb27BBtLLZ` 200 000, `1DZ5NbUwDgxeJkKhQLgYcUUX36PtYso1pm` 200 000,
  `19kkawFcg2U2s6vq368MXD7FJU9JZvRrjA` 200 000 (каждый: funded = сумма, spent 0, 1 tx).
  Итого 600 000 сат — расхождений с проверкой 14:01 UTC нет.
- **Найден мусор в секции «Адреса/эскроу» этого README**: строка с
  `bc1qax0hsnwnxl7393awtc3hsy0ftm6tg4tyk2nfja` (остаток 23 213 сат, funded 15 332 648,
  spent 15 309 435, 25 tx) — это не эскроу Кира, а чужой кошелёк-мелочь, он же лежит в
  «Адреса/эскроу» `../smith-lyle-moore-hunt-2-0-032btc/README.md`. Из-за него пазл
  выглядит как «623 213 живых». Предлагаю удалить строку из обоих README (не сделал сам,
  т.к. это правка чужого досье); до удаления — при любых свопах этот адрес игнорировать.
- Транзакций, писем и публикаций нет. Бронь не брал (сверка read-only).
