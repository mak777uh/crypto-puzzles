# LOG — hunghuatang-8964-btc-puzzle

## 2026-10-18, 12:45 — Qoder (Qoder Desktop, Windows)
- Делал: проход по поиску новых каталогов и репозиториев загадок (план — `reports/2026-10-18_1245_Qoder_catalog-search-plan-and-new-sources.md`).
  Волна по Reddit через Arctic Shift (`/api/posts/search?subreddit=CryptoCurrency&after=2026-01-01`) плюс точечный
  `/api/posts/ids?ids=1nc5tt2` → получен текст поста r/Bitcoin со ссылкой на Threads-паблицера.
- Результат: **пазл новый для базы** (в `_sources/KNOWN_SET_2026-10-18.txt` «8964»/«hunghuatang» — 0 совпадений).
  Дата релиза ≈ 2025-08-25, механика: «строка из 24 чисел → 24 слова», награда — BTC.
  **Отрицательные результаты**: (1) Threads недоступен из этой среды — WebFetch на
  https://www.threads.com/@hunghuatang вернул «fetch failed»; (2) адрес приза в найденных материалах отсутствует,
  поэтому баланс не проверялся и статус «фонд есть» не подтверждён; (3) r/CryptoPuzzlers и r/bitcoinpuzzles через
  Arctic Shift за 2026 год отдали 0 постов (подфорумы пусты/мертвы) — повторять этот канал бессмысленно.
- Артефакты: README.md, `data/arctic_shift_post_1nc5tt2.json`.
- Ссылки/доказательства:
  https://www.reddit.com/r/Bitcoin/comments/1nc5tt2/a_puzzle_with_bitcoin_rewards/
  https://www.threads.com/@hunghuatang/post/DNwj6PxxHcd
  https://arctic-shift.photon-reddit.com/api/posts/ids?ids=1nc5tt2
- Не проверено до конца: адрес и сумма приза, факт решения, личность автора.

## 2026-10-18, 13:05 — Qoder (проход верификации)
- Делал: web.archive.org CDX по threads.com/@hunghuatang → 0 снапшотов (контент Threads не архивирован).
  Через Arctic Shift нашёл ФРОЛЛОУП r/Bitcoin 1tw7glw «Puzzle designed for 8964, BTC reward .00896400» + 50 комментариев
  (сохранено: data/post_1tw7glw.json, data/comments_1tw7glw.json).
- Результат: **ПАЗЛ РЕШЁН.** Автор @hunghuatang в комментарии: «This puzzle has just been solved — congratulations
  to @IndividualOk6204.» Приз 0.008964 BTC. Механика — 6-bit кодировка на перфорированных картах (XOR-правило мага).
  Адрес комментатора 1GajcPPZYUCeCV8LQ126qM1iJjBYEFpf1g = баланс 0 (пожертвование, не приз).
- Вывод для базы: нарушает фильтр «только нерешённые» → перенос в solved/ (причина: solved).
- Ссылки: https://www.reddit.com/r/Bitcoin/comments/1tw7glw/puzzle_designed_for_8964_btc_reward_00896400/
