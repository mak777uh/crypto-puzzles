# LOG — zden-haluska-halv-312ksats

## 2026-10-17, 13:50 — Hark, проект «Zden HALV» (агент песочницы Hark)
- Представление: агент Hark, проект «Zden HALV» (рабочие файлы: /workspace/projects/294b2fcf-d0e2-45ba-9439-92c69cd75685/, NOTES.md).
- Прошлые сессии (15–16.10): точная модель графика — 256 узлов x=92+3k, уровень L∈{0..3} × unit, 8 полос по 32 узла, unit 128→1 (levels.txt). Отрицательно: 158 прямых упаковок base-4; лепестки/паузы/разности/вершины (7025); WIF/base58; base-7; хэши; PNG-стего (чанки чистые, после IEND пусто, фон строго 0, tEXt только название/адрес/сайты); 24 биекции уровень→2 бита × все/чётные/нечётные узлы (290) — 0.
- Делал (17.10): разобрал решения прошлых уровней автора — L1 (WIF, высота = (ch−'0'+1)·12), L2 (WIF, 7 бит/символ ASCII на 7 кольцах), L3 и Nethemba (сырые 32 байта, биты в признаках формы), L4 (WIF, 17 кривых × 3 точки = 51 символ, точки сетки = ASCII), SFX (WIF без префикса «5» в растре), XM17 (WIF, индекс base58 6 бит на шестиугольнике), LVL5 (измерение → (10·сторона+рамка−1)/64 → площадь, сумма пар = байт, uncompressed).
  Вывод: у автора две схемы — (1) WIF 51 симв., обычно с признаком «51 элемент» в картинке; (2) 32 байта, где один элемент картинки = один байт или один бит байта. Признака «51 элемент» в HALV нет (63 лепестка, 256 узлов, 32 столбца).
- Проверено против адреса (compressed+uncompressed):
  - транспонирование «полоса = разряд»: байт j = Σ_b f(L_{b,j})·2^(7−b), f — все 14 непостоянных функций {0..3}→{0,1}, порядок полос/столбцов прямой/обратный, инверсия, разворот внутри полосы; плюс две битовые плоскости (hi/lo) × 24 биекции → hi, lo, XOR, сумма, чередование 16-бит — 296 уникальных → 0 (cands_I1transp.txt).
  - модель свёртки: L_k = Σ c_i·b_{k+i} для бинарной b, окна 1–4, c∈{0..3} — ни одна не согласуется с уровнями точно (ни по полосам, ни целиком) → уровни не являются сглаженной битовой последовательностью (deconv.py).
  - знак сигнала: на всех 63 парах соседних ненулевых узлов линия НЕ пересекает ось → смен знака между соседними ненулевыми узлами нет; знак мог бы меняться только через нулевые узлы и визуально не восстановим.
- Результат: 0 совпадений. Схемы автора в лоб на HALV не ложатся; триажный вариант «суммы по 32 столбцам × вес» (741) тоже 0 — нужна неочевидная операция «измерение → байт» (как −1/×10/64 в LVL5), а подсказок автора для HALV нет.
- Оценка: без внешней подсказки шанс низкий; регулярные циклы не возобновляю.
- Источники: https://crypto.haluska.sk/ ; https://echo.ls/zden-level-5/ ; https://steemit.com/bitcoin/@mmorsl/solution-of-the-bitcoin-crypto-puzzle-level-4-by-zden ; https://github.com/benjacasas02/independent-cryptography-research

## 2026-10-17, 14:05 — Hark, проект «Zden HALV»: обзор форумов и сети
- Делал: поиск по bitcointalk, reddit (r/bitcoinpuzzles, u/zden), X (@Zd3N), Facebook автора, каталогам (OCP, privatekeys.pw, puzzles.agntn.dev, boha, itsnex1s), репо benjacasas02.
- Результат: отдельной ветки обсуждения HALV на форумах НЕТ; подсказок автора нет (только «way easier than LVL 5»). Публичные разборы: OCP (59 лепестков, форма вершины круг/ромб = 1 бит, «ёмкость ~118 бит», >500 млн WIF-вариантов — 0), benjacasas02 (8 блоков × 96 px, масштаб 128→1, гипотеза 6-px такта, >33 000 кандидатов — 0). Все — отрицательные.
- НОВАЯ ЗАЦЕПКА: в той же транзакции пополнения 30946152b5f24ed975a26b28a46cb19d1ef2728159c5806544ffd0c2fb535205 (блок 839761, 2024-04-18) есть второй выход 4040 сат на вэнити-адрес 1DoTPuzbAuLZHU4TodFrnMvZXBxAoBBcNv («DoT Puz»), не потрачен, в сети нигде не упоминается. Возможно, скрытая мини-загадка автора (точечный маркер у x≈91 = пунктир из 9 штрихов?). Проверено 46 кандидатов (sha256/двойной sha256 файла, растра, levels, дат, слов) против обоих адресов — 0.
- Источники: https://blockstream.info/tx/30946152b5f24ed975a26b28a46cb19d1ef2728159c5806544ffd0c2fb535205 ; https://raw.githubusercontent.com/floflo777/open-crypto-puzzles/main/2-mid-prizes/zden-haluska-halv-312ksats/analysis/tested.md

## 2026-10-17, 14:15 — маркер x=91 (пунктир) разобран
- Пунктир y=444–506 (столбец x=91, ширина 3 px): ровно 9 ячеек по 7 px = 63 позиции — столько же, сколько лепестков (63). Каждый штрих — градиент яркости из 7 ступеней 23,47,75,107,141,178,216 (снизу ярче).
- Битовая строка (порог 5, старт 444): 1111111 1111000 0011111 0111111 0000001 0111111 0111100 0001111 0111111.
- Проверено 262 варианта (прямо/реверс/инверсия, старт 440–447, int как ключ, sha256 строки/числа/сырых пикселей) против HALV и 1DoTPuz — 0.
- Следующий шаг: сопоставить 63 бита маркера с 63 лепестками (маска/выбор лепестков, XOR с формой круг/ромб).

## 2026-10-17, 14:25 — маска маркера × 63 лепестка
- Лепестки = непрерывные ненулевые участки levels.txt: ровно 63, совпадает с 63 позициями маркера.
- Проверено 672 кандидата: выбор лепестков по маске (прямо/реверс/инверсия, оба направления лепестков) × 24 биекции уровней × head/tail/sha256; признаки лепестков (длина, максимум, сумма) как байты; XOR маски с чётностью/формой лепестка. Против HALV и 1DoTPuz — 0.
- Наблюдение: маска оставляет только 103 узла (206 бит) — меньше 256, так что «маска выбирает биты ключа» напрямую не даёт ключ.

## 2026-10-17, 14:10 — гипотеза «1DoTPuz = кошелёк-нотаризация»
- Калибровка схемы автора (1BiTCoiN WHiTe PaPeR): SHA-256 файла PNG с IPFS (9000×9000) → несжатый ключ → 19ferXDjGX7XnErWWcd4SbYg4t8Jm5NRDi, получил и потратил 777 сат. Схема автора подтверждена.
- Для HALV: SHA-256 cryptoHALV.png (сжатый/несжатый) → адреса пустые; 47 картинок сайта crypto.haluska.sk тоже не дают адресов с историей.
- 1DoTPuz… — вэнити-адрес, его нельзя получить хэшем файла (нужен подбор префикса). Вероятно, служебный/будущий кошелёк автора; ключ к HALV он не даёт. Гипотеза закрыта.

## 2026-10-17, 14:20 — полный обзор сети
- Отдельных веток на bitcointalk/reddit по HALV нет. Каталоги (privatekeys.pw, agntn, boha, itsnex1s, classace) — только пересказ анонса.
- ВАЖНО: в комментариях к посту автора на Facebook (Zd3N7, 20.04.2024) Zden написал: «I'll drop a hint for LVL HALV, but a bit later - probably in a month». Подсказка так и не найдена (ни X, ни FB, ни сайт); ~11 недель назад другой решатель спросил его об этом там же — ответа в выдаче не видно. OCP (проверка сайта 02.07.2026): URL вида cryptoHALV_hint.svg → 404.
- HTML сайта: у HALV нет скрытых комментариев; иконка cryptoHALV-ico.png — просто миниатюра (XMP: Photoshop, шаблон от 2021-02-21, сохранено 19.04.2024).
- Внешние разборы: OCP (59 лепестков, форма вершины, «~118 бит», >500 млн WIF — 0), benjacasas02 (768 px, 8 блоков × 96, 3-px решётка, гипотеза 6-px такта со 128 состояниями; >33 000 — 0). У нас 6-px такт = чётные/нечётные узлы — уже проверено.
- Вывод: лучший шанс — подсказка автора; можно спросить его самому (только с согласия Ильи).
- 14:30 доп. поиск: зеркало crypto.satori.digital = тот же текст. Wayback CDX по обоим доменам с 2024: файлов-подсказок к HALV нет (только cryptoHALV.png и -ico.png). В X ответов автора с подсказкой не найдено. Контакт автора: zden@satori.sk, X @Zd3N, FB Zd3N7.

## 2026-10-18, 09:52 — OCP Sync (Qoder Desktop, Windows) <!-- ocp-snapshot:19644e58 -->
- Делал: обогащение из внешнего репозитория [open-crypto-puzzles](https://github.com/floflo777/open-crypto-puzzles) — раскладка дельты снапшота `19644e58` (клон `_sources/ocp/`, реестр `_sources/OCP_SNAPSHOT.md`). Протокол: `claims acquire/heartbeat/release` по `zden-haluska-halv-312ksats`. Прогонов/переборов не запускали, статус пазла и балансы не меняли, чужие файлы не перезатёрты (копии лежат отдельными деревами `data/ocp/` и `tools/ocp/` с provenance).
- Результат: перенесено 6 файлов данных → `data/ocp/`, 1 кода → `tools/ocp/`,0 тяжёлых (>250 КБ) оставлены в клоне — указатель `data/ocp/_HEAVY.md`. Зеркал, уже лежащих в базе, пропущено: 1. Статус по OCP: `open`.
- Артефакты: `2-mid-prizes/zden-haluska-halv-312ksats/README.md`, `2-mid-prizes/zden-haluska-halv-312ksats/analysis/leads.md`, `2-mid-prizes/zden-haluska-halv-312ksats/analysis/tested.md`, `2-mid-prizes/zden-haluska-halv-312ksats/clues/author-posts.md`, `2-mid-prizes/zden-haluska-halv-312ksats/data/lobe-shape-sequence.csv`, `2-mid-prizes/zden-haluska-halv-312ksats/puzzle.json`, `2-mid-prizes/zden-haluska-halv-312ksats/tools/oracle.py`
- Ссылки/доказательства: https://github.com/floflo777/open-crypto-puzzles/tree/19644e58e50721f8469680f2edcba1daa0697630/2-mid-prizes/zden-haluska-halv-312ksats ; полная дельта — `_sources/ocp_sync_2026-10-18/delta_report.md`.

## 2026-10-18, 13:32 — Qoder (github_intake) — GITHUB INTAKE (шлюз)
- Делал: python tools/github_intake.py run zden-haluska-halv-312ksats --agent Qoder
- Кандидаты: floflo777/open-crypto-puzzles (registry, ссылки досье), benjacasas02/independent-cryptography-research (community, ссылки досье), schum-io/open-crypto-puzzles (fork, форки floflo777/open-crypto-puzzles), lekejf/open-crypto-puzzles (fork, форки floflo777/open-crypto-puzzles), pauldmurphy/open-crypto-puzzles (fork, форки floflo777/open-crypto-puzzles), ebr4him68-rgb/open-crypto-puzzles (fork, форки floflo777/open-crypto-puzzles), aperioscanner/open-crypto-puzzles (fork, форки floflo777/open-crypto-puzzles), windstalker-arch/open-crypto-puzzles (fork, форки floflo777/open-crypto-puzzles)
- Скачано: репо=2 (файлов 111, 533.3 КБ; медиа 1), issues=0, comments=0, PR=0, releases=0, gists=0, wiki=нет
- Бюджет: api.github.com запросов = 6 (remaining 56, reset 2026-10-18T11:22:04Z); бесплатных транспортов (codeload/ls-remote/git) = 4
- Негативы: не собрано (сверх --max-repos 2): schum-io/open-crypto-puzzles, lekejf/open-crypto-puzzles, pauldmurphy/open-crypto-puzzles, ebr4him68-rgb/open-crypto-puzzles, aperioscanner/open-crypto-puzzles, windstalker-arch/open-crypto-puzzles
- Артефакты: data/github/GITHUB_INTAKE.md, data/github/INTAKE_RESULT.json, data/github/_legacy_pointers.md, data/github/<owner>__<repo>/{files,raw,REPO_META.json}
- Статус шлюза: partial (); остаток в data/github/resume.json
- Ссылки/доказательства: floflo777/open-crypto-puzzles, https://github.com/benjacasas02/independent-cryptography-research


## 2026-10-18, 13:32 — Qoder (github_intake) — GITHUB INTAKE (шлюз)
- Делал: python tools/github_intake.py run zden-haluska-halv-312ksats --agent Qoder
- Кандидаты: floflo777/open-crypto-puzzles (registry, ссылки досье), benjacasas02/independent-cryptography-research (community, ссылки досье), schum-io/open-crypto-puzzles (fork, форки floflo777/open-crypto-puzzles), lekejf/open-crypto-puzzles (fork, форки floflo777/open-crypto-puzzles), pauldmurphy/open-crypto-puzzles (fork, форки floflo777/open-crypto-puzzles), ebr4him68-rgb/open-crypto-puzzles (fork, форки floflo777/open-crypto-puzzles), aperioscanner/open-crypto-puzzles (fork, форки floflo777/open-crypto-puzzles), windstalker-arch/open-crypto-puzzles (fork, форки floflo777/open-crypto-puzzles)
- Скачано: репо=2 (файлов 111, 533.3 КБ; медиа 1), issues=0, comments=0, PR=0, releases=0, gists=0, wiki=нет
- Бюджет: api.github.com запросов = 0 (remaining 34, reset 2026-10-18T10:33:40Z); бесплатных транспортов (codeload/ls-remote/git) = 9
- Негативы: не собрано (сверх --max-repos 2): schum-io/open-crypto-puzzles, lekejf/open-crypto-puzzles, pauldmurphy/open-crypto-puzzles, ebr4him68-rgb/open-crypto-puzzles, aperioscanner/open-crypto-puzzles, windstalker-arch/open-crypto-puzzles
- Артефакты: data/github/GITHUB_INTAKE.md, data/github/INTAKE_RESULT.json, data/github/_legacy_pointers.md, data/github/<owner>__<repo>/{files,raw,REPO_META.json}
- Статус шлюза: partial (); остаток в data/github/resume.json
- Ссылки/доказательства: floflo777/open-crypto-puzzles, https://github.com/benjacasas02/independent-cryptography-research


## 2026-10-18, 13:38 — Qoder (github_intake) — GITHUB INTAKE (шлюз)
- Делал: python tools/github_intake.py run zden-haluska-halv-312ksats --agent Qoder
- Кандидаты: floflo777/open-crypto-puzzles (registry, ссылки досье), benjacasas02/independent-cryptography-research (community, ссылки досье)
- Скачано: репо=2 (файлов 111, 533.3 КБ; медиа 1), issues=0, comments=0, PR=0, releases=0, gists=0, wiki=нет
- Бюджет: api.github.com запросов = 1 (remaining 54, reset 2026-10-18T11:32:22Z); бесплатных транспортов (codeload/ls-remote/git) = 2
- Негативы: репо владельца benjacasas02: пропущено (исчерпан --api-budget (1 запросов)); форки floflo777/open-crypto-puzzles: пропущено (исчерпан --api-budget (1 запросов)); benjacasas02/independent-cryptography-research: не собрано: исчерпан --api-budget (1 запросов)
- Артефакты: data/github/GITHUB_INTAKE.md, data/github/INTAKE_RESULT.json, data/github/_legacy_pointers.md, data/github/<owner>__<repo>/{files,raw,REPO_META.json}
- Статус шлюза: partial (исчерпан --api-budget (1 запросов)); остаток в data/github/resume.json
- Ссылки/доказательства: floflo777/open-crypto-puzzles, benjacasas02/independent-cryptography-research


## 2026-10-18, 13:39 — Qoder (github_intake) — GITHUB INTAKE (шлюз)
- Делал: python tools/github_intake.py run zden-haluska-halv-312ksats --agent Qoder
- Кандидаты: floflo777/open-crypto-puzzles (registry, ссылки досье), benjacasas02/independent-cryptography-research (community, ссылки досье), schum-io/open-crypto-puzzles (fork, форки floflo777/open-crypto-puzzles), lekejf/open-crypto-puzzles (fork, форки floflo777/open-crypto-puzzles), pauldmurphy/open-crypto-puzzles (fork, форки floflo777/open-crypto-puzzles), ebr4him68-rgb/open-crypto-puzzles (fork, форки floflo777/open-crypto-puzzles), aperioscanner/open-crypto-puzzles (fork, форки floflo777/open-crypto-puzzles), windstalker-arch/open-crypto-puzzles (fork, форки floflo777/open-crypto-puzzles)
- Скачано: репо=2 (файлов 111, 533.3 КБ; медиа 1), issues=0, comments=0, PR=0, releases=0, gists=0, wiki=нет
- Бюджет: api.github.com запросов = 0 (remaining 50, reset 2026-10-18T11:27:46Z); бесплатных транспортов (codeload/ls-remote/git) = 8
- Негативы: не собрано (сверх --max-repos 2): schum-io/open-crypto-puzzles, lekejf/open-crypto-puzzles, pauldmurphy/open-crypto-puzzles, ebr4him68-rgb/open-crypto-puzzles, aperioscanner/open-crypto-puzzles, windstalker-arch/open-crypto-puzzles
- Артефакты: data/github/GITHUB_INTAKE.md, data/github/INTAKE_RESULT.json, data/github/_legacy_pointers.md, data/github/<owner>__<repo>/{files,raw,REPO_META.json}
- Статус шлюза: partial (); остаток в data/github/resume.json
- Ссылки/доказательства: floflo777/open-crypto-puzzles, https://github.com/benjacasas02/independent-cryptography-research


## 2026-10-18, 14:06 МСК (11:06 UTC) — Qoder (Qoder Desktop / Windows, DESKTOP-PE9BOJ5; мультимодальное чтение) — индукция грамматики по решённым уровням
- Самопредставление: агент Qoder, среда Qoder Desktop/Windows. Цель визита — закрыть «висящий» с 16.10 14:40 шаг I1 (разобрать грамматику автора по solver-материалам решённых уровней и применить к HALV). Бронь: `claims acquire zden-haluska-halv-312ksats --agent Qoder --ttl 120` (10:57Z–12:57Z), note «индукция грамматики по решённым уровням -> чтение HALV».
- **Шлюз GitHub-интейка:** `python tools/github_intake.py status zden-haluska-halv-312ksats` → **PARTIAL** (2 репо, дайджест `data/github/GITHUB_INTAKE.md`; остаток — только форки-шум реестра). Считаем шлюз пройденным, `run --full` не запускаем (экономия api.github.com).
- **Приз перепроверен (read-only):** `blockstream.info/api/address/1crypto24HCr178iMcKd5iUi5D4rsg1nK` → funded_txo_sum **312 500**, spent **0**, tx_count 1, мемпул пуст (18.10 10:57 UTC). Совпадает с записями 15–17.10.
- **Что мешало шагу I1 раньше:** сам сайт `crypto.haluska.sk` и зеркало `crypto.satori.digital` с этой машины недоступны (`curl` → 000, 21 с таймаут), поэтому solver-картинки «не брались». Обход: **Wayback `id_`** (отдаёт оригинальные байты). Скрипт: `tools/zden_fetch_wayback_2026-10-18.py`; таймстемпы взяты из CDX (`url=crypto.haluska.sk*`, 121 urlkey).
- **Собрано 29 файлов в `data/solvers/`** (sha256 в `data/solvers/MANIFEST.md`): `crypto1/2/3solver.png`, `cryptoSFX_solver.png`, `cryptoxm17solver.png`, `crypto_nethemba_solver.png`, `xixoio_puzzle-solver.png`, `hcpp17-solver.jpg`, puzzle-картинки L1/L2/L3/L5(2018)/crypto5fix/SFX/SFX_cover/nethemba/xixoio/db18/whitepaper, `tree_puzzle-encoding_scheme.png`, `wheels_puzzle-bitmap.png`, `LitecoinSegWit.png`, `Janussteg.jpg`, обе индексные страницы (`index_2026-06-21.unpacked.html` — была gzip), 3 SVG-подсказки Litecoin SegWit, контроль `cryptoHALV_ref.png` (sha256 `3a487ebaeb480113…` = наш локальный файл, копия подлинная). Отказ 1/29 (тот же index, потом получен через curl + gzip).
- **Ground truth ключей решённых уровней** извлечён в `data/zden_levels_groundtruth.json` из локального дампа `agntn_pkg` (16 записей): полные hex+WIF есть для L1 `46c92e72…`/`5JMTiDVH…`, L2 `febedbdd…`/`5KkUiP…`, L3 `6008c37d…`/`5JYaeV…`, L5 `f4bfad68…`/`5Kg5Mosd…`, XM17 `f8520426…`/`5KhebJ…`, White Paper `261f71e7…`, Codex `5a9674db…`; публичные ключи — ещё для L4/SFX/Demobit/Nethemba/XIXOIO/SegWit/Janus/Autonomy. Это и есть «размеченные данные» для индукции: картинка + настоящий ключ.
- **Прочитано глазами (solver-картинки автора) — грамматика, воспроизводящая ключи:**
  - **LVL1** (`crypto1solver.png`, автор печатает свой код прямо на картинке): `char *key="5JMTiDVHj3pj8VfaTe6pDtD9byZr6too3PD3AGBjRxF1hVsHtc8"; for (a=0;a<l;a++){ ch=key[a]-['0'-1]; rect(0, a*12, ch*12, ch*12+12); }` ⇒ **строка = позиция символа (шаг 12 px), горизонталь = ASCII-код символа**; внизу картинки нарисована сама шкала ASCII (`0 1 2 … 9 : ; < = > ? @ A … Z [ \ ] ^ _ ` a … z`). «key starts here» / «key ends here» — маркеры начала/конца. Ключ — WIF 51 символ, начинается с «5».
  - **LVL2** (`crypto2solver.png`): 7 колец = 7 бит на символ base58; символы разложены **против часовой**; биты в правильном порядке, **меньшее кольцо = младший бит**; центральное кольцо инвертировано; «если центральный бит = 1, ориентация инвертируется и в углах». Т.е. явный **правило-декларация порядка + инверсии**.
  - **LVL3** (`crypto3solver.png`): «32 блока = 32 байта приватника», в каждом блоке — вложенные прямоугольники (четверичное деление) = 8 бит; слева легенда: **зелёные горизонтальные линии = направление кодирования, жёлтые вертикальные = старт ориентации**; блоки подписаны hex-байтами (60, 08, C3, 7D, … = начало ключа `6008c37d…` ✔).
  - **LVL SFX** (`cryptoSFX_solver.png`): растр с буквами **без анти-алиасинга, с перекрытием букв и без префикса «5»**, искажён плагином **Satori «Pixel Stretch»**: Direction=Right, Pixel Stretch **7.0**, Pixel Size **1.0**, Stretch Curve **Linear Ramp Up** (белые пиксели растянуты до 8 px, чёрные остаются 1 px). Обратное преобразование: **Pixel Stretch 0.875, Pixel Size 0.125, Linear Ramp Down** + curve-фильтр перед бинаризацией. Итог — исходный растр ключа.
  - **Litecoin SegWit** (код решателей скачан: `data/solvers/ltcsteg/`, README): 256 бит ключа записаны **обходом по графу из 28 узлов с поворотом «лопасти» (paddle) на 4 шага**, результат — в 256 узлов **кольца** (сначала внешнее по часовой, затем внутреннее); 5 точек на линии внизу = 5 посещённых узлов; 3 подсказки = 5 стадий по порядку. Т.е. у автора есть целый класс «**биты в позиционном коде с объявленным правилом обхода**».
  - **White Paper** (`1BiTCoiN…`): приватник = **SHA-256 от самого изображения** (нотаризация 777 сат) — отдельная ветка грамматики «хеш от артефакта».
- **Ключевое наблюдение по HALV (глазами, `data/cryptoHALV.png`):** сигнал — **не** «8 полос по 32 узла как задумка», а **затухающая осциллограмма**: амплитуда убывает ровно вдвое каждые 32 отсчёта (256 отсчёта = 8 удвоений = «HALV»/халвинг как концепция), слева **пунктирный вертикальный маркер** (тот же элемент «Linear Ramp», что в Pixel Stretch из SFX), зеркало относительно y=475, штемпель `20042402`, внизу `CRYPTO.SATORI.DIGITAL_ZDEN.ART` + адрес, справа логотип `BTCRYPTO / ZDEN / LVL / HALV` из тех же «палочных» штрихов, что и в решённых уровнях. ⇒ Квантование «L∈{0..3} × unit» — следствие экспоненциальной огибающей, а не 8 независимых каналов; это надо учесть при перекодировании (нормировать на огибающую).
