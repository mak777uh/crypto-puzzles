# QODER WATCH — мониторинг новых публичных данных
Окно наблюдения: 2026-10-05 … 2026-10-19. Режим: только чтение (никаких трат/транзакций/писем/публикаций/ЛС, обращений к оракулам загадок).
Дата прохода: 2026-10-19.

## ИТОГ
Новых публичных данных, которые РЕЗКО ускоряют живой пазл и при этом ОТСУТСТВУЮТ в папках puzzles/*, за окно НЕ найдено.
Ни один приз-адрес за сегодня не двинулся (см. таблицу он-чейн) → никто не решил цель.
Ни один коммит/issue/PR в open-crypto-puzzles за окно не касается целевых слагов.
Все найденные в окне события уже отражены в папках (см. «что проверено → уже известно»).

## ЧТО НОВОГО относительно папок (и что реально в окне)
| Дата публикации | Пазл | Суть | Источник / URL | Оценка как «ускорителя» |
|---|---|---|---|---|
| 2026-10-18T19:07Z (сам свип — 2026-10-04) | Arweave #12 (сосед по серии weave; цель — #3/#10/#11) | В OCP #12 перенесён в 4-solved: эскроу `XRGEfk…0fg` опустошён (398.75 AR ушло, `verified_state: swept`). ПУБЛИЧНОГО РЕШЕНИЯ НЕТ — `answer: "unknown (swept without a published solution)"`, ключ не раскрыт. | https://github.com/floflo777/open-crypto-puzzles (коммит 09dc…, файл `4-solved/arweave-puzzle-12-400ar/puzzle.json`) ; agntn weave: https://puzzles.agntn.dev/collections/weave.md | НЕ ускоряет: механизм #12 (word-selection/geometry/text-cipher → SHA-512×11513 → AES kty:RSA) не переносится на #3 (compound-word), #10 (genesis28), #11 (пиксель/PNG); решение не раскрыто. Факт смены состояния приза соседнего пазла. |
| 2026-10-06 | Arweave #3/#10/#11 | HomelessPhD/AR_Puzzles README обновлён (состояние: #3,#10,#11 open; #12 закрыт). | https://github.com/HomelessPhD/AR_Puzzles (HEAD d04a6a23, коммит 2026-10-06) | Уже захвачено: папка выгружала HomelessPhD 2026-10-19 10:13 → состояние 10-06 уже в базе. |
| 2026-10-18T11:06Z | (служебное) | OCP HEAD сдвинулся с базы `19644e58` на `7cdfcc44`; промежуточные коммиты — только «prize map refreshed at live prices» + guntis #38 / logicbeach #42 / gsmg oracle (#46). Целевые слаги не тронуты. | https://api.github.com/repos/floflo777/open-crypto-puzzles/commits | Вне охвата (guntis/logicbeach/gsmg — другие папки). |

## ПО ЦЕЛЯМ — что проверено и статус «нового нет»
1. **Aoi Nakamoto Quizchain / Real Big Block, 0.777 BTC** — нового нет.
   - Приз `14zMkTgaVXJcxdh4JdWi29MLRR44iUSG9W`: funded 77 700 000, spent 0 → **жив** (сверено 19.10). Совпадает с папкой.
   - agntn quizchain.md — только исторические блоки (2019), 0.777-RBB там нет. r/bitcoinpuzzles — последний тред 2025-01; r/Grycoin — под-реддит больше не резолвится (RSS редиректит на поиск сообществ, приват/удалён); r/CryptoPuzzlers — dormant с 2023. Bitcointalk topic 155054 недоступен (см. ниже). Новых постов автора не обнаружено.
2. **Nuaza / bitcoin.fr, 0.2024 BTC** — новых подсказок/опубликованных слов нет (книгу НЕ трогал — это другой агент).
   - https://bitcoin.fr/chasse-au-tresor/ — без изменений (страница датирована 25.12.2024, 14 подсказок).
   - e-ducat.fr — разбор chase-а dated **29.09.2024**, свежих постов по пазлу нет (последний пост сайта вообще — 23.03.2026, не про пазл). X **@e_ducat** — посторонний франко-политический аккаунт, не про пазл.
   - Приз `bc1q8zfy6…spgc02`: 20 240 000 sat, spent 0 → **жив**.
3. **Smith Lyle & Moore Hunt #2 (Glimmer), 0.032 BTC** — новых данных нет (первоисточник метода монтажа НЕ трогал — другой агент).
   - Сайт https://www.smithlylemoore.com/treasure-hunt — без изменений, тот же xpub `xpub6CpNc58z…hNqVC`, новые lock-страницы не найдены.
   - r/smithlylemoore — последний пост 14.08.2022; X @smithlylemoore — тишина с 07.2022; stacker.news/items/658645 — 3 старых комментария, свежих нет; agntn: «As of October 2026 … 0.031777 BTC hasn't moved … No words. Yet.»
   - Приз Glimmer `bc1q0akdjvrc2csau2n3gyxa3xcq0fss852x997m9y`: 3 177 700 sat, spent 0 → **жив**.
4. **Arweave #3 / #10 / #11** — новых подсказок автора нет.
   - @ArweaveP (X) — тишина с **07.01.2024**. AR далеко от $100 (в снапшоте OCP 400 AR ≈ $724 → AR ≈ $1.8), триггер «следующие подсказки при $100» не сработал.
   - GitHub: HomelessPhD/AR_Puzzles HEAD d04a6a23 (последний коммит 2026-10-06, захвачен папкой 10-19); consigcody94/arweave-puzzle-11 HEAD 7326f0fc (последний коммит **2026-09-03**, вне окна).
   - r/CryptoPuzzlers — dormant с 2023 (1 ETH тред mczs0u уже в папке).
   - Сосед #12 свипян (см. таблицу), решение не раскрыто → механизм не даёт.
5. **kTimesG Phy (0.008 BTC) и 9vw04 Gem Finder** — новых постов автора/сообщества в окне нет.
   - agntn phy.md цитирует пост автора **2026-10-07** («cracking face emoji») — УЖЕ в папке (README:179, LOG:10). Bitcointalk topic 5584952 недоступен (см. ниже).
   - Приз phy `bc1qrpn28…57nm9p`: 800 000 sat, spent 0 → жив. Приз 9vw04 `bc1qr5mssp…ceyy2v`: баланс **2 020 760 sat** (полностью совпадает с последней записью папки).
   - X @GemfinderOfX — свежие посты (июль–авг. 2026) это трейдинг-шум, не про 9vw04; сами твиты пазла — дек. 2024.
6. **Crypto Puzzles 2018 #2 (0.05 ETH), Zden Haluška HALV, Bitcoin Treasure-Hunt Book Series** — нового нет.
   - YouTube-канал cryptopuzzles973: 5 видео, самое свежее — P2 (~фев. 2026); новых загрузок с проверки папки (10-19 11:22) нет.
   - Zden: X @Zd3N — только демосцена/арт-посты (янв. 2026, вне окна), новых подсказок HALV нет; crypto.haluska.sk и echo.ls недоступны (см. ниже).
   - Bitcoin Treasure-Hunt Book Series: mysteriouswritings «cracked»-страница и treasurehuntdb.com/cracked — «SOLVED 1/2026» (видео Prof F 01.01.2026) — ВНЕ окна и артефакт уже лежит в папке (`data/00_cracked.html`). Новых октябрьских публикаций нет.
7. **Реестр OCP (floflo777/open-crypto-puzzles)** — свежих issues/PR/коммитов по целевым слагам за 2 недели НЕТ (см. «ЧТО НОВОГО»). git ls-remote: HEAD `7cdfcc44`; API-запросов использовано ~13 из 60.

## Он-чейн перепроверка (mempool.space, 2026-10-19, read-only)
| Цепь | Адрес | funded sat | spent sat | Баланс | Вывод |
|---|---|---|---|---|---|
| BTC | 14zMkTgaVXJcxdh4JdWi29MLRR44iUSG9W (Aoi RBB) | 77 700 000 | 0 | 0.77700000 | жив |
| BTC | bc1q8zfy6wvvtskzkg4s343x42pyf363nmejspgc02 (Nuaza) | 20 240 000 | 0 | 0.20240000 | жив |
| BTC | bc1q0akdjvrc2csau2n3gyxa3xcq0fss852x997m9y (Glimmer #2) | 3 177 700 | 0 | 0.03177700 | жив |
| BTC | bc1qrpn28qa82uyjg37dvsz3w7wpm3kpdea957nm9p (kTimesG phy) | 800 000 | 0 | 0.00800000 | жив |
| BTC | bc1qr5mssp6snmduqp9enx4dzmcxvk7qw83lceyy2v (9vw04) | 5 081 908 | 3 061 148 | 0.02020760 | = папке, без движения |
| BTC | 1crypto24HCr178iMcKd5iUi5D4rsg1nK (Zden HALV) | 312 500 | 0 | 0.00312500 | жив |
| ETH | 0x1fa8Be…61ad (P2), 0xFF2142…9F17 (weave #11) | — | — | — | НЕ перепроверялись сегодня (нет ключа etherscan); последняя фиксация папок 10-18/10-19 — не потрачены. |
| AR | XRGEfkMbCMHeTY9mZI9Lh6hf8EmA8RstmBFUjDm40fg (weave #12) | — | — | — | по OCP: **swept** (10-04), решение не раскрыто. |

## Не подтверждено / не открылось (ограничения транспорта)
- **Bitcointalk** — недоступен всеми путями: curl HTTP 000, browser ERR_SSL_PROTOCOL_ERROR (http и https), WebFetch fetch failed. Посты по ktimesg (topic 5584952) и Aoi (topic 155054) не читались. Зафиксировано.
- **crypto.haluska.sk** — curl HTTP 000; WebFetch fetch failed. **echo.ls/zden-level-5** — curl HTTP 000. Не открылись.
- **redlib-зеркало catsarch.com** — WebFetch fetch failed; browser ERR_CONNECTION_TIMED_OUT. Чтение Reddit шло через официальные RSS (частично 429).
- **r/Grycoin** — RSS редиректит на subreddits/search (сообщество приватно/удалено) → посты нечитаемы.
- Reddit HTML-страница (r/Grycoin) — контент в accessibility-дереве не отрендерился (SPA/логин-уолл).
- Дата «SOLVED 1/2026» на cracked-страницах Prof F подтверждена текстом, но вне окна наблюдения.
