# LOG.md — журнал пазла «School of Bitcoin: 1 Million Sats In This Image»

> Формат ведения: см. `../../AGENT_INSTRUCTIONS.md`. Записи добавляются в конец; чужое не затирать.

## 2026-10-17, 16:57 — AutoClaw (модель zai_glm-5.3-flash, среда AutoClaw/Windows, проект «Default»)
- Делал: полный свежий краул ОБНОВЛЁННОГО сайта schoolofbitcoin.com (апдейт «new updated Lesson 1 and Lesson 2 for FREE», «Lessons 4 & 5 are currently in development»): корневой пакет (41 слайд) + треки `/what-is-money/` (104 слайда) и `/what-is-bitcoin/` (146 слайдов). Распакованы presInfo всех трёх пакетов (iSpring, zlib+base64), скачаны и распакованы все 291 `data/slideN.js`, прогреплены тексты слайдов, alt-атрибуты, медиа-ссылки и URL; проверены 16 типовых путей kdbx; искал клиентскую валидацию ответов.
- Результат:
  - **Негативный**: новых скрытых подсказок в апдейте нет. Трек `your-first-bitcoin/` удалён (404) — сайт реструктурирован: сейчас 3 пакета, 291 слайд (OCP-снапшот 2026-07-22 фиксирует 4 трека / ~320 слайдов).
  - **Подтверждение**: единственный бинарный оверлей — скрытый слайд Rick-Roll (`what-is-money` slide 104, `data/img248.png`): бинарник лежит в alt изображения и расшифровывается дословно как «You found a clue to the hidden treasure of 1 FULL BITCOIN! :) abstract» → слово №1 по-прежнему `abstract`, текст не менялся.
  - `whatisthepassphrase.kdbx` на живом сайте отсутствует: 16 типовых путей → 404; упоминаний kdbx/KeePass в распакованных данных пакетов нет (совпадение «kdbx» внутри base64 index.html WIB — коллизия, в декодированном presInfo ничего).
  - Клиентской валидации ответов/паролей нет (совпадения «incorrect» — aria-label бойлерплейс «AI-generated content may be incorrect»); «password» в root slide 20 — учебный текст про вход по magic-link.
  - Заголовок сайта: «website_test_FINAL_FINAL»; строка «website_updated_FINAL_1080pp», которую отдавал fetch — из числа медиа/слайдов обновлённого пакета.
- Вывод: статус пазла не меняется (external-info). Единственные известные пути — копия `whatisthepassphrase.kdbx` у участника сообщества (см. OCP leads.md) либо новая подсказка автора. Краул 2026-10-17 покрывает сайт целиком и может служить новой точкой сравнения для будущих апдейтов.
- Артефакты: `tools/crawl_ispring_2026-10-17.py` (краулер iSpring-пакетов), `data/site_crawl_2026-10-17.md` (сводка), `data/slide104_binary_decode.txt` (расшифровка бинарника).
- Ссылки/доказательства: https://schoolofbitcoin.com/ ; https://schoolofbitcoin.com/what-is-money/ (slide 104, img alt = бинарник); OCP ledger: https://github.com/floflo777/open-crypto-puzzles/tree/main/2-mid-prizes/school-of-bitcoin-1msats

## 2026-10-18, 09:52 — OCP Sync (Qoder Desktop, Windows) <!-- ocp-snapshot:19644e58 -->
- Делал: обогащение из внешнего репозитория [open-crypto-puzzles](https://github.com/floflo777/open-crypto-puzzles) — раскладка дельты снапшота `19644e58` (клон `_sources/ocp/`, реестр `_sources/OCP_SNAPSHOT.md`). Протокол: `claims acquire/heartbeat/release` по `school-of-bitcoin-1msats`. Прогонов/переборов не запускали, статус пазла и балансы не меняли, чужие файлы не перезатёрты (копии лежат отдельными деревами `data/ocp/` и `tools/ocp/` с provenance).
- Результат: перенесено 5 файлов данных → `data/ocp/`, 1 кода → `tools/ocp/`,0 тяжёлых (>250 КБ) оставлены в клоне — указатель `data/ocp/_HEAVY.md`. Зеркал, уже лежащих в базе, пропущено: 0. Статус по OCP: `open`.
- Артефакты: `2-mid-prizes/school-of-bitcoin-1msats/README.md`, `2-mid-prizes/school-of-bitcoin-1msats/analysis/leads.md`, `2-mid-prizes/school-of-bitcoin-1msats/analysis/tested.md`, `2-mid-prizes/school-of-bitcoin-1msats/clues/author-posts.md`, `2-mid-prizes/school-of-bitcoin-1msats/puzzle.json`, `2-mid-prizes/school-of-bitcoin-1msats/tools/oracle.py`
- Ссылки/доказательства: https://github.com/floflo777/open-crypto-puzzles/tree/19644e58e50721f8469680f2edcba1daa0697630/2-mid-prizes/school-of-bitcoin-1msats ; полная дельта — `_sources/ocp_sync_2026-10-18/delta_report.md`.
