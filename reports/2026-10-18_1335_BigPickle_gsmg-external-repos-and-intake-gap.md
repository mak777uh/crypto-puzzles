# GSMG: новые внешние репозитории + пробел в GitHub-шлюзе (широкий поиск)

- **Агент:** Big Pickle (big-pickle / OpenCode, Windows, DESKTOP-PE9BOJ5), CPU-only
- **Дата/время:** 2026-10-18 13:35 MSK (10:35 UTC)
- **Режим:** только чтение сети + собственные файлы агента (`reports/`, новый `tools/`). **Пазл не тронут** (см. §0).
- **Скрипт:** `tools/github_broadrepo_scan.py` (новый, read-only) — воспроизводит находки.

---

## 0. Статус брони: почему это отчёт обогащения, а не «прогон»

`python tools/claims.py list` на 10:25 UTC: **`gsmg-io-5btc-puzzle` держит Qoder** (`--note github-intake`,
TTL 120 мин, heartbeat 2026-10-18T10:18:15Z → истекает 12:18:15Z). По `AGENT_INSTRUCTIONS.md` §«Параллельная
работа»: *«`puzzles/<slug>/LOG.md`, `README.md`, `tools/`, `data/` — только агент, держащий бронь этого пазла»*
и *«бронь не просрочена — не трогай этот пазл»*. Поэтому:

- в папку `puzzles/gsmg-io-5btc-puzzle/` **не записано ничего**;
- находки ниже — из публичного GitHub (read-only) и лежат в моём отчёте;
- локальные копии новых репо — во временной папке `%TEMP%\opencode\gsmg-enrich\` (см. §4), их может
  скопировать в базу держащий бронь.

Это ровно тот случай, когда мой прошлый лид («суммы как offsets») уже покрыт базой
(`naddiseo-fork/gsmg_seg0_matrix.py`: все фактор-пары × суммы строк/столбцов × nat/3d/mod10 + паддинг нулями),
а `testnetbtc/GSMG` независимо закрыл ту же ось (см. §1.1) — значит ось исчерпана, и по протоколу
(3 цикла без новой проверенной информации) я перешёл в режим **обогащения**.

---

## 1. Новые репозитории, которых НЕТ в базе

Найдены **широким** поиском (`q=gsmg`, 114 репозиториев; отбор `created|pushed ≥ 2026-08-01`).
Текущий шлюз `github_intake.py` их не видит (§3). Проверено grep'ом: строк `testnetbtc`, `AppleLamps`,
`nineeeai` в базе нет.

### 1.1. `testnetbtc/GSMG` — создан 2026-10-15, пуш 2026-10-16, Jupyter, 65.9 МБ
https://github.com/testnetbtc/GSMG

- Корень: `BRIEF.md` (17 КБ), `DECISIONS.md` (10 КБ), `MANIFEST.md` (9.3 КБ), `PROGRESS.md`, `README.md` (7.7 КБ),
  папки `reference/ reports/ reproduction/ research/ sources/ walkthrough/`.
- Крупные файлы: `reports/MASTER_REASONING_REPORT.md` (63 КБ), `reports/REASONING_REPORT_v2.md` (27 КБ),
  `research/2026-10-15_SESSION_JOURNAL.md`, `research/2026-10-15_{btcseed_bits,yinyang_ops,zero_merge}/`
  (скрипты + JSON кандидатов, `bsgs_fast.py`, `btclib.py`, `candidates_btcseed.json` 66 КБ).
- Коммиты (по датам): `matrixsumlist-as-key`, `zero-merge decimal solver, zero-out rules, yin-yang folds —
  all negative`, `offline prize oracle + BTCSEED direct-key and brain-wallet tests (negative)`,
  `vanity-grind BSGS (negative to 2^28)`.
- **Вывод:** независимый решатель ушёл в те же оси, что и наша база (matrixsumlist, zero-out, yin-yang,
  BTCSEED), и получил **те же негативы**; плюс сделал то, чего у нас нет — **BSGS по vanity-адресу
  до 2^28** и `candidates_btcseed.json`. Ценность: (а) подтверждение закрытых осей, (б) контрольный
  список кандидатов для сверки с нашим оракулом, (в) BSGS-результат (нижняя граница).

### 1.2. `AppleLamps/GSMG-CLEAN` — создан/пуш 2026-09-15, Python, 32.8 МБ
https://github.com/AppleLamps/GSMG-CLEAN

Самый содержательный независимый корпус по финальной фазе (папки `data/ evidence/ newest-puzzle-9.15.26-
creator-attachments/ notes/ originals/ prior_research_ledgers/ reference_texts/ runs/ telegram/ tools/`).

- Документы `01_PROVEN_CHAIN.md` … `15_*`, среди них `03_OPEN_LEADS.md` (21 КБ), `04_DEAD_ENDS_TESTED.md`,
  `07_DUTCH_LENS_REVIEW.md` (13.7 КБ), `09_UNFORESEEN_HINT_AND_LAST_WORDS.md` (12 КБ),
  `12_WHOLE_PUZZLE_DIRECTION_AUDIT.md` (11 КБ), `11_UNVERIFIED_ASSUMPTIONS_AUDIT.md`.
- `tools/` — 50 скриптов (`verify_chain.py`, `check_candidate.py`, `reproduce_leads.py`, аудиты …);
  `runs/` — 46 прогонов от 2026-09-13/14 с `REPORT.md`; `data/` — DBBI/FAED/149 digits/1539 Architect letters,
  три locked-блоба, `leads_reproduced.json`.
- `newest-puzzle-9.15.26-creator-attachments/` — `jrk_messages.txt` (**128 КБ**), `jrk_name_matches_other_account.txt`
  (20 КБ), `creator_attachments.tsv` (25 вложений создателя 2019-05…2026-07), `photos/ stickers/ video_files/ telegram_by_year/`.
- `telegram/` — экспорты группы с `from_id == user9815232` (817 сообщений создателя) и группового чата (5 424).

### 1.3. Негативы (проверено, не тратить)
- `nineeeai-ux/gsmg-5btc-puzzle-solver` (2026-09-09) — **заглушка**: size 0, единственный `README.md` (82 Б,
  «Automated solver…»), кода нет.
- «Фермы контента» (не решатели): `wcw13/gsmgi`, `x0ptghiu9s/gsmg`, `tj9ds49i9c/gsmgg`, `sridharsad/gsmg`
  (description = «content», size ~0).
- Не по теме: `nidhalhaouari479/manager-GSMGUIDE`, `…/caissier-gsmguide`, `…/gsmguideecole` (приложение
  GSMG Guide / школа), `brandonleblanc1/csd-roa-template` (шаблон ROA для GSMG/CSD-организации),
  `ilyas1993-del/gsmgloball`, `suttonmark0257/gsmgge`.
- Уже в базе: `turjaun985123/gsmgiopuzzle`, `HosterjackAGV/gsmg-5btc-puzzle`.

---

## 2. Что из найденного — реально новое для нашей базы

База **уже** знает главное из корпуса AppleLamps: «Architect `PRIVATEKEY` на offset 479» (letters-only 1539)
и «DBBI − VIC → YOUWON» лежат в `puzzles/gsmg-io-5btc-puzzle/data/github_2026-10/turjaun985123__gsmgiopuzzle/
{timeline.md, route_tree.md}` («canonical prime sums B484/Y479 → Architect[479:] PRIVATEKEY — CONFIRMED /
FITTED POINTER»), а Telegram-корпус уже содержит верификацию сообщества от 2026-10-08 (Marc #75874) и
2026-10-10 (#76101). То есть по финальной фазе наша база **на 3–4 недели впереди** AppleLamps (снимок 2026-09-13).

Инкрементально новое (кандидаты на интеграцию):

1. **Resolution «unforeseen hint»** (`09_…` §1): «непредвиденная подсказка» #6509 = **#5966/#5969 (2021-03-01):
   «the matrix step involves a *prime part*»**, где #5969 = «Oh wait, shouldn't have said that. That might have
   been a hint». Это связывает `yellowblueprimes` (road-map #8446) с `matrixsumlist` и уточняет ось «primes».
2. **«Raising the stakes…» = покерный *straddle*** (`12_…` §2): объясняет выбор *straddling* checkerboard
   бытовым словом, а не отдельной подсказкой. У нас страддл-декод есть, но эта трактовка формулировки — нет.
3. **Dutch-lens** (`07_…`): «price» = *prijs* = **приз** (не цена); «the better half» = **его партнёр**
   (не отсылка к адресу Better Half); скрытого нидерландского ключа нет. Полезно как **снятие ложных**
   трактовок (напр. «price is in half»).
4. **Off-white клетка** (`01_…`): ровно одна клетка `#fefefe`, row 7 col 4 (0-based) = спиральный индекс **163**,
   держит бит 3 байта 20 — букву `n` в «pla**n**ted».
5. **Систематический негатив-леджер** с контрольными статистиками (0/20,000 shuffle-контролей и т.п.) по
   46 осям + **755 padding-валидных выходов сохранены и перепроверены** — прямой антидубль для будущих прогонов.
6. Из `testnetbtc`: **BSGS по vanity-адресу негативен до 2^28**; `candidates_btcseed.json` (66 КБ) — готовый
   список кандидатов BTCSEED-ветки для сверки нашим оракулом.

**Чего новое НЕ даёт:** открытия финального гейта. Ни один из двух репо его не открыл (оба — негативы по
тем же осям). Это обогащение + антидубль, а не прорыв.

---

## 3. Главная находка: дыра в обязательном GitHub-шлюзе (проектный уровень)

`tools/github_intake.py` → `discover()` собирает кандидатов только из:
(1) **ссылок в досье** (`README.md`/`LOG.md` + все текстовые файлы папки пазла), (2) локального
`_sources/ocp/puzzles.json`, (3) репозиториев первых двух владельцев, (4) форков топ-кандидата,
(5) опционального поиска `--search-k` с запросом **`slug.replace("-", " ")`**.

Для `gsmg-io-5btc-puzzle` запрос (5) = **`gsmg io 5btc puzzle`** — это AND-сопоставление по
имени/описанию/темам; оно не находит ни `testnetbtc/GSMG`, ни `AppleLamps/GSMG-CLEAN`, ни
`nineeeai-ux/gsmg-5btc-puzzle-solver`. При этом широкий запрос **`gsmg`** даёт 114 репозиториев, из
которых 3 «свежих» репозитория по нашему пазлу базе неизвестны.

**Следствие:** репозиторий, который сообщество создало заново и который нигде в нашем досье не
процитирован, шлюзом **не обнаруживается** — а значит «GH:done/N репо» может быть ложным `done`.
Это касается любой цели, а не только GSMG.

Та же дыра дала боковую находку по Arweave: `rastarhey1121/arweave_puzzle` (создан 2026-09-06, CUDA,
`validate_cuda_fixed.cu` = `puzzle_search_final.cu`, MD5-перебор) — тоже не в базе.

**Рекомендация (не сделав — см. ниже):**

```diff
- for i in range(search_k):
-     q = slug.replace("-", " ").strip()
+ # отличительные токены цели + широкий поиск + фильтр свежести
+ for i, tok in enumerate((manual_tokens or [slug.split("-")[0], *[t for t in slug.split("-") if len(t) > 3]])):
+     q = tok
```

плюс фильтр `created_at|pushed_at >= (последний интейк − 60 дней)` и дедуп против `data/github/**`.
Готовый read-only обход уже лежит рядом: **`tools/github_broadrepo_scan.py`**.

> `github_intake.py` я **специально не правил**: Qoder держит бронь `gsmg-io-5btc-puzzle` с note
> `github-intake`, то есть шлюз запускается прямо сейчас; правка общего инструмента в момент прогона
> чужим агентом — риск. Предложение выше — на решение держащего/Ильи.

---

## 4. Передача держащему бронь (Qoder) / пользователю

Копии уже скачаны (git clone --depth 1) — можно перенести байт-в-байт:

```
%TEMP%\opencode\gsmg-enrich\testnetbtc__GSMG           (65.9 МБ, .git удалить)
%TEMP%\opencode\gsmg-enrich\applelamps__GSMG-CLEAN    (32.8 МБ, .git удалить)
```

Ожидаемое место в базе (конвенция интейка): `puzzles/gsmg-io-5btc-puzzle/data/github_2026-10/
testnetbtc__GSMG/files/**` и `…/applelamps__GSMG-CLEAN/files/**` (+ `raw/` при необходимости),
и строка «✅ прочитано» в `LOG.md` пазла — **держащим бронь**.

Команды для перезапуска широкого поиска:

```powershell
python tools/github_broadrepo_scan.py --queries gsmg,salphaseion --since 2026-08-01
python tools/github_broadrepo_scan.py --queries "arweave puzzle" --since 2026-08-01
```

---

## 5. Негативы этого прохода (обязательный раздел)

- **`puzle-main` / `STATE_OF_PLAY.md` / `SOLUTION.md`** (упомянуты AppleLamps `03_…` как «внешнее
  workspace», `D:\downloads-8.8\puzle-main\`) — публичного репозитория НЕТ: GitHub search `puzle-main`,
  `puzle gsmg`, `salphaseion`, `STATE_OF_PLAY` = 0 релевантных. Это локальная папка, не канал.
- **Arweave #11 OCR** — ось закрыта: `data/mask_ocr.py` + `LOG.md` («OCR returned no text»); повторять
  чтение картинки OCR-ом не нужно (и у сообщества уже есть `consigcody94/ARweave-Puzzle-11`).
- **Arweave #11 баланс** — жив: 1.0 ETH (blockcypher/blockscout: `coin_balance 1000000000000000000`,
  ~$2420). Не «мёртвый» адрес.
- Повторный проход по «суммы как offsets» на GSMG — не дублировать (см. §0).

---

## 6. Следующий ход (предложение)

1. Держащему GSMG: интегрировать §1.1/§1.2 в базу и отметить шлюз.
2. Илье/держащему интейка: решить по §3 (правка `discover()` или штатный запуск `github_broadrepo_scan.py`
   после каждого `run`). Дыра проектная — затрагивает все цели.
3. Наибольшая ценность новых репо — **антидубль** (46 прогонов AppleLamps + 3 папки testnetbtc),
   а не новая ось: финальный ключ GSMG по-прежнему не найден ни нами, ни ими.
