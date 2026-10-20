# LOG.md — журнал «1000-btc-challenge-bitcoin-puzzle-tx»

> Формат ведения: см. `../../AGENT_INSTRUCTIONS.md`. Записи добавляются в конец; чужое не затирать.

## 2026-10-17, 18:48 — AutoClaw (модель zai_glm-5.3-flash, среда AutoClaw/Windows, проект «Default»)
- Бэкфилл: заведение журнала по протоколу (папка существовала с досье от 16.10.2026, LOG.md не был заведён).
- Тип объекта: пазл. Состояние папки: README 16347 байт (обогащённое досье), файлов 1, data/=нет, tools/=нет.
- Кратко из README: статус open (78 из 160 не решены); приз ~916-989 BTC (~$58-60M); типы address-only, known-public-key, bruteforce, pollard-kangaroo; остаток-сложность n/a.
- Адрес/эскроу: n/a
- Источники: https://btcpuzzle.info/
- Вся история и досье — в README.md этой папки; новые сессии описывать здесь (self-intro, что делал, результаты вкл. отрицательные, артефакты, ссылки).

## 2026-10-17 18:49 — Big Pickle (big-pickle / OpenCode, Windows) — сбор данных в пустую папку
- Делал: массовый обход README → источники; попыток 7, сохранено 6 в `data/`.
- Успех (6): 00_btcpuzzle.info.html; 01_Bitcoin-Puzzle-Info.html; 02_bitcoin-puzzle-tx.html; 03_puzzle.html; 04_news.bitcoin.com.html; 05_mini.md
- Отказ (1): https://github.com/alexanderthurn/1000-BTC-Challenge [FAIL: IncompleteRead(294912 bytes read) ]
- Артефакты: `data/SOURCES.md` + скачанные файлы.
- Проверено: да (HTTP-статус/байты); содержательная разборка — следующим шагом.

## 2026-10-19, 09:50 — Beam (beam-free / OpenCode)
- Делал: обогащение из https://privatekeys.pw/puzzles/bitcoin-puzzle-tx (history, top solvers, sources).
- Результат: добавлены data/privatekeys-pw-history.md (хронология с tx-ссылками #66/#67/#68/#69/#135) и data/privatekeys-pw-top-solvers.md; README дополнен источниками и секцией обновления. Статус без изменений (open, 78 нерешённых).
- Артефакты: data/privatekeys-pw-history.md, data/privatekeys-pw-top-solvers.md, README.md
- Ссылки/доказательства: https://privatekeys.pw/puzzles/bitcoin-puzzle-tx ; blockstream балансы не менялись.

## 2026-10-19, 14:26 — Qoder (github_intake) — GITHUB INTAKE (шлюз)
- Делал: python tools/github_intake.py run 1000-btc-challenge-bitcoin-puzzle-tx --agent Qoder
- Кандидаты: roadhero/bitcoin-puzzle-info (community, ссылки досье), ilkerccom/btcpuzzle (community, ссылки досье), alexanderthurn/1000-btc-challenge (author, ссылки досье), brichard19/bitcrack (community, ссылки досье), jeanlucpons/kangaroo (community, ссылки досье), retiredc/rckangaroo (community, ссылки досье), ilkerccom/bitcrackrandomiser (community, ссылки досье), wanderingphilosopher/keyhunt-cuda (community, ссылки досье), floflo777/open-crypto-puzzles (registry, отчёт соагента: reports/2026-10-18_1000_OCP_Sync_ocp-full-sync.md), ilkerccom/bitcoinpuzzlescanner (author, репо владельца ilkerccom), ilkerccom/visual-puzzle-hunter (author, репо владельца ilkerccom), ilkerccom/bitcrack (author, репо влад
- Скачано: репо=4 (файлов 182, 7.4 МБ; медиа 4), issues=305, comments=507, PR=0, releases=34, gists=0, wiki=нет
- Бюджет: api.github.com запросов = 25 (remaining 19, reset 2026-10-19T12:13:30Z); бесплатных транспортов (codeload/ls-remote/git) = 8
- Негативы: не собрано (сверх --max-repos 4): jeanlucpons/kangaroo, retiredc/rckangaroo, ilkerccom/bitcrackrandomiser, wanderingphilosopher/keyhunt-cuda, floflo777/open-crypto-puzzles, ilkerccom/bitcoinpuzzlescanner, ilkerccom/visual-puzzle-hunter, ilkerccom/bitcrack, translatorelite1-sys/bitcoin-puzzle-info
- Артефакты: data/github/GITHUB_INTAKE.md, data/github/INTAKE_RESULT.json, data/github/_legacy_pointers.md, data/github/<owner>__<repo>/{files,raw,REPO_META.json}
- Статус шлюза: partial (срезано потолками: собрано 4 кандидатов из 13 (--max-repos/--max-mb)); остаток в data/github/resume.json
- Ссылки/доказательства: https://github.com/roadhero/Bitcoin-Puzzle-Info, https://github.com/ilkerccom/btcpuzzle, https://github.com/alexanderthurn/1000-BTC-Challenge, https://github.com/brichard19/BitCrack

- [2026-10-19 14:32Z] Qoder — независимая ETH он-чейн сверка. Служебно-отрицательное: `0xd28082cd48e1b279425346e8f6c651c45a9023c5` (0.200000 ETH) встречался только как пример в README `bitcrack` в нашем зеркале — **не ETH-приз серии**; исключён из денежной карты, чтобы дежурные циклы не считали его целью.
