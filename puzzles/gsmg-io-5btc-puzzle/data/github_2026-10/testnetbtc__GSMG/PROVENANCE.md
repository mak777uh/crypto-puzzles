# PROVENANCE — testnetbtc/GSMG

- **URL:** https://github.com/testnetbtc/GSMG
- **Ветка/коммит:** `main` @ `d4db275b30a93ad0de7b76663205bca1b54b6d4d`
- **Создан:** 2026-10-15 · **последний пуш:** 2026-10-16 · **язык:** Jupyter Notebook · **размер репо:** ~65.9 МБ
- **Собран:** 2026-10-18 (Big Pickle, `git clone --depth 1` + выгрузка блобов через `git show`, т.к. в репо есть
  путь с недопустимыми для Windows символами `sources/puzzlehunt/_pr11/??` — checkout невозможен).
- **Что скопировано:** ТЕКСТ-слой рекурсивно из `research/`, `reports/`, `walkthrough/`, `reference/`, `sources/`
  (расширения `.json .py .md .txt .csv .ipynb`) + 5 корневых `.md/.txt` (`BRIEF.md`, `DECISIONS.md`, `MANIFEST.md`,
  `PROGRESS.md`, `README.md`) → `files/` (678 + 5 файлов, ~11.9 МБ).
- **Что НЕ скопировано:** `.git`, медиа и архивы, файлы >1 МБ.
- **Зачем:** независимый решатель 2026-10-15/16. Негативы **совпадают с нашими** по закрытым осям
  (matrixsumlist-as-key, zero-merge multi-letter, пред-регистрированные yin-yang операции, BTCSEED direct-key и
  brain-wallet) + есть то, чего у нас нет: **BSGS по vanity-адресу негативен до 2^28** и
  `research/2026-10-15_btcseed_bits/candidates_*.json` (готовые списки кандидатов для сверки нашим оракулом).
- **Канонический реестр фактов:** `files/reference/00_INDEX.md … 08_GLOSSARY.md` со статусами
  `reproduced / reported / interpreted / source-reproduced` + `files/reference/data/EXPERIMENT_COVERAGE.csv` (240 КБ,
  матрица «что покрыто негативами, а что нет») — прямой антидубль для будущих прогонов.
- **Ключевое для нашей оси:** `files/reference/03_UNRESOLVED.md` §1.1 — «цепочка» (`CADEIA`, линия Naddiseo #17),
  **закрыта количественно** прогоном Big Pickle 2026-10-18 (см. `puzzles/gsmg-io-5btc-puzzle/LOG.md`,
  `reports/2026-10-18_1348_BigPickle_gsmg-chain-axis-closed.md`): цепочка = артефакт PKCS#7 (1 из 1218 валидных,
  1 из 7 двухзвенных).
- **Как найден:** широким поиском `q=gsmg` (114 репо) — обязательный шлюз `github_intake.py` его НЕ видит
  (см. находку о дыре шлюза; обход — `tools/github_broadrepo_scan.py`).
