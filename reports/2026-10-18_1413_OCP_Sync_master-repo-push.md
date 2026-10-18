# Синхронизация папки MASTER → GitHub-репозиторий (push 18.10.2026, 14:13 локальное / 11:13 UTC)

Агент: **OCP Sync** (среда: Qoder Desktop, Windows). Постановка владельца базы: «сравни наше репо и нашу
папку и обнови полностью репо новыми данными, актуальная версия именно в папке» — то есть папка
`C:\Users\Admin\OneDrive\Desktop\master` признаётся эталонной, репозиторий
https://github.com/mak777uh/crypto-puzzles должен ей соответствовать.

## 1. Сравнение «папка vs репозиторий» до push

| параметр | значение |
|---|---|
| локальный `main` | `5bc1f8d` (после доводки OCP sync) → затем `bde2220` |
| `origin/main` до push | `ee78e77` «Синхронизация: работы Big Pickle по GSMG…» |
| дивергенция | локально впереди на **7 коммитов**, отстаёт на **0** → push = fast-forward, история не перетирается |
| файлов в индексе HEAD | 3 466 (≈443 МБ содержимого, в основном медиа) |
| размер репозитория по API GitHub | 312 886 КБ (≈306 МБ), репозиторий **публичный**, default branch `main` |
| незакоммиченное в папке | 23 изменённых + 1 712 untracked (61,3 МБ на момент замера; к моменту коммита — 1 762 файла, 98,6 МБ, т.к. другие агенты успели дописать данные) |
| конфликт-копии OneDrive (`*Conflict*`) | 0 |
| вложенные `.git` | только `_sources/ocp/.git` — закрыт локальным `.git/info/exclude` и `.gitignore`, в индекс не попал |

## 2. Решение по объёму публикации (выбор владельца)

В .gitignore записано правило: сырые зеркала чужих GitHub-репозиториев в публичный репозиторий не
кладём (лицензии чужого кода, объём, шум в `tools/key_scan.py`), старые паттерны —
`puzzles/*/data/github/*/files/`, `puzzles/*/data/github/*/raw/`, `…/wiki/`. Новый интейк GSMG лёг в
`puzzles/gsmg-io-5btc-puzzle/data/github_2026-10/<repo>/files/` и под эти паттерны не попал
(1 229 файлов, 31,8 МБ) плюс telegram-корпус GSMG (10 МБ).

Владелец базы выбрал вариант «**буквально всё, включая 1 229 файлов дампов**» — значит правило
. gitignore в этой части не применяем, публикация полная, один-в-один с папкой. Паттерны .gitignore
не меняли (они продолжают работать для старых путей `data/github/` и кэша `_sources/github/`).

## 3. Врата перед публикацией (публичный репозиторий)

1. `tools/key_scan.py` по всему дереву (обходит ФС, то есть включая unpublished-дампы):
   WIF-токенов 165, xprv/hex64-on-key-line 845; декодировано с валидной контрольной суммой 66,
   адресов на проверку 132; **`RESULT: 0 derived address(es) currently HOLD sats`** —
   «none — no live BTC balance on any key documented in the tree».
2. Пути с секретями (`​.secret/`, `secrets/`, `*.key`, `*.pem`, `*.p12`, `*.pkcs8`, `id_rsa*`) в
   публикуемом наборе — 0; в `.gitignore` они запрещены и есть не были.
3. Приватных ключей и сидов мы не добавляли: генезис-материал остался указателем на
   `tools/ocp/verify_solution.py` и чужой репозиторий (в README/LOG сида нет).
4. Fast-forward проверен до commit и после push (`git rev-list --count HEAD..origin/main` = 0).

## 4. Что ушло на GitHub

Коммит `bde2220` «Сводный снапшот рабочего дерева MASTER (1762 новых файла, 98,6 МБ)»: 1 762 файла
новых, 17 изменённых, **0 удалённых**. Состав (работы агентов, ранее не закоммиченные):

- `puzzles/gsmg-io-5btc-puzzle/` — `data/github_2026-10/**` (AppleLamps/GSMG-CLEAN 18,5 МБ,
  testnetbtc/GSMG 11,7 МБ, HosterjackAGV, Dileep-Kumar-5, mkno03, floflo, `_web`, `extra`),
  `data/telegram/**` (полный корпус канала 7,3 МБ, `hits_endgame.txt` 1,2 МБ, срезы), `data/github/`,
  `data/README_community_full_2026-10-18.md`, `tools/**`, LOG/README/blobs-индекс;
- `puzzles/zden-haluska-halv-312ksats/data/solvers/**` — чужие стего-разборы (≈33 МБ картинок,
  включая 19,5 МБ `CodexPuzzle-hint.png`);
- `puzzles/path-to-greatness-treasure-hunt-3ltc/data/site/**` (7,9 МБ), `puzzles/ktimesg-phy-challenge-0-008btc/data/imgur_93apBej.png` (0,9 МБ), `puzzles/11b-x-1371/**`, `puzzles/9vw04-gem-finder/**`, `lunarcrush-lunar-vault-62btc`, `solved/hunghuatang-8964-btc-puzzle/data`, `solved/satoshis-treasure-arg-1m/data`;
- `_sources/external_catalogs_2026-10-18/**` (agntn-пакет, дампы внешних каталогов), `_sources/KNOWN_SET_2026-10-18.{json,txt}` (3,8 МБ), `_sources/GITHUB_INTAKE_STATUS.*`, `_sources/EXTERNAL_CATALOGS_2026-10-18.md`;
- служебное: `tools/github_intake.py`, `tools/key_scan.py` (обновлён другим агентом), обновлённые
  `README.md`, `AGENT_INSTRUCTIONS.md`, `PROPOSALS.md`, `.gitignore`, `agents/REGISTRY.md`, отчёты агентов за 18.10.

Итого на репозиторий легли также 8 коммитов истории: 4 моих (снапшот OCP + раскладка дельт + доводка
LOG + этот снапшот дерева) и коммиты других агентов (`942a679` правила git-синхронизации, `b0ee953`
полная заливка каталога, `e811837`/`9f626da`/`f31148d` по 9vw04).

## 5. Проверка после push

- `git ls-remote origin refs/heads/main` = `bde2220a01b13e7bd163ed4bb633ef6f6e30f6d1` = локальный HEAD;
  `git rev-list --count HEAD..origin/main` = 0.
- Выкачка с `raw.githubusercontent.com` (10 контрольных путей) — все HTTP 200, размеры побайтово
  совпадают с локальными: `WAKE_QUEUE.md` 37 976, `MASTER_CATALOG.md` 108 272,
  `data/telegram/full_corpus.txt` 7 639 261, `data/solvers/CodexPuzzle-hint.png` 20 491 068,
  `_sources/ocp_sync_2026-10-18/delta_report.md` 11 948, `tools/ocp_delta_scan.py` 29 455,
  `solved/caesarcoder-genesis-block-wallet-puzzle-947ksats/LOG.md` 18 571,
  `reports/2026-10-18_1000_OCP_Sync_ocp-full-sync.md` 23 340.
- Рекурсивный `GET /git/trees/main?recursive=1` не дочитан (IncompleteRead на 1,67 МБ — дерево большое);
  вместо него использован raw-лист и локальный `ls-files`, этого достаточно для подтверждения факта push.

## 6. Замечания на будущее

1. Правило .gitignore про «сырые дампы чужих репозиториев» теперь расходится с фактом публикации:
   если решим держаться правила, надо добавить `puzzles/*/data/github_*/**/files/` в исключения и
   снять файлы из индекса (`git rm --cached`) — но это уже история в публичном репо, полностью
   убрать её можно только перезаписью истории (не делаем без отдельного решения).
2. Репозиторий теперь ≈400+ МБ в рабочем дереве; следующий push с новыми дампами упрётся в разумный
   предел — для чужих репо лучше держать выжимки (`REPO_META.json`, `media_index.md`, `GITHUB_INTAKE.md`).
3. Другие агенты (Qoder, Big Pickle) продолжают писать в те же файлы; правила те же — общие файлы
   атомарно, `LOG.md` только дописывать вниз, после чужогомассового rewrite сверять следы (`grep`
   маркеров), как показала доводка 13:31–14:0x.
4. Прогонов, транзакций и трат в этом проходе не было; публикация — только содержимое папки.
