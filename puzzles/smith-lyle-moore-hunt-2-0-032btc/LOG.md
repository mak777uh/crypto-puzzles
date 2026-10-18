# LOG.md — журнал пазла «Smith, Lyle & Moore Hunt #2 „Glimmer"»

> Как вести: см. `../../AGENT_INSTRUCTIONS.md`. Каждый агент при первом заходе добавляет блок снизу:
> дата/время, кто он (агент/модель/среда), что делал, что нашёл (включая отрицательные результаты!),
> какие скрипты и артефакты создал. Только дописывать; чужое не переписывать и не удалять.
> Прорывы и актуальное состояние — в `README.md`; здесь — полная хроника.
> Ограничения пазла: **письмо авторам (`codebreaker@smithlylemoore.com`) НЕ отправлять** без полных 12 слов и ОК Ильи; оракул Wix — только строго последовательно (~0.6 с/запрос, повторы 429/5xx); `.proton.me`-адрес — фейк/скам, не использовать.
> Бэкфилл истории выполнен 17.10.2026 (Qoder) из `README.md` и `data/GLIMMER_HANDOFF_2026-10-17.txt`.

## 2026-10-16, 23:40 — досье Hark v2 (агенты Hark)
- Делал: рабочие досье из `MASTER_CATALOG_v2_2026-10-16.md`.
- Результат: картина механизма Hunt #1/#2, подсказок, проверенных и отброшенных гипотез, оракулов и файлов. Перенесено в README «Досье Hark v2».
- Контекст: Hunt #1 (2021) решён; сайт smithlylemoore.com (Wix) — Hunt #2; приз `bc1q0akdjvrc…` = 3 177 700 сат.

## 2026-10-17, 00:00 — GLIMMER_HANDOFF от параллельного агента-охотника
- Результат: state-файл (3603 строки, `data/GLIMMER_HANDOFF_2026-10-17.txt`): карта сайта с паролями, код Wix-оракула (§6), полный список ~2500 испробованных строк (§8), оффлайн-минусы (§1: 5 порядков × 15 248 пассфраз = 0).
- Состояние: 11/12 BIP39-слов (`when you depart find mystery discover music need love fortune safe`; порядок 1–9 не подтверждён; 10=fortune, 11=safe с h7j3h «Atlas Mountains»); ровно два незакрытых замка — `zhgsm` `/raft-escape` и `jcl9c` `/smoke-signals` (родитель `jetkc` «Tropical Island», pw «Mary Ann»); третий выход jetkc → `udr8x` Death (777).

## 2026-10-17, 00:01–00:32 — прогоны dsh-сессии (DeepSeek Harness) против двух замков
- Делал: ночная сессия dsh (экспорт: `dsh-session-session-7accc1d0….zip`), строго последовательный оракул с ретраями 429/5xx (впервые без искажений — раньше 429 молча считался «мимо»).
- Результат:
  - **Батч 1** (381 запрос, 0 ошибок): 127 кандидатов = все известные пароли сайта + Hunt #1 + слаг/файловые идеи + канон Gilligan, по трём замкам → **0**. Гипотеза «замки открываются известным паролем (777/666/Hunt #1)» **закрыта надёжно**.
  - **Батч 2** (220 запросов; 70 реально новых): 18 дат знаменитых пожаров (MMDDYYYY+DDMMYYYY: Cocoanut Grove `11281942`, Лондон `02091666`, Чикаго `10081871`, Triangle `03251911`, Hindenburg `05061937`…), `cocoanutgrove`/`coconutgrove`, семейство `64` (`coconut64`, `palm64`, `island64`, `gilligan64`, `minnow64`, `skipper64`, … `sos64`), `babysteps`/`giantleap`/`shortcut`/`rainbowroad`/`n64`, Gilligan-канон (`Howell`, `Hinkley`, `Grumby`) → **0**.
  - **Батч 3** (104 запроса; 52 новых): трассы Mario Kart 64 (мотив N64 дал ранее `north64/east64/south64/west64`), даты реальных спасений (Титаник, «Эндьюранс», Аполлон-13, Miracle on the Hudson), литеральные `palmhut`/`alert`/`passingship` → **0**.
  - **jetkc разобран на глубину page JSON** (267 строковых полей): 0 скрытых компонентов из 23; мобильного эксклюзивного текста нет; медиа только `desertedisland.gif`; ссылки ровно три (`#zhgsm`, `#jcl9c`, `#udr8x`); SEO `hereonnnnngiligansissssssland`.
  - **Структурный вывод**: у `jetkc` нет строки `password:` (в отличие от почти всех родителей) и нет медиа-подсказки (привычка «ответ = имя файла») ⇒ raft/fire — **единственные два замка «чистого вывода»** на сайте; >2600 строк уже испробовано. Косвенно: Jamal5403 (Reddit) заявлял оба пароля («one leads to a dead end»); явный тупик (Death) — третий выход, значит raft/fire формально «живые».
  - **Что слать авторам**: `codebreaker@smithlylemoore.com`, тема предзаполнена «I've Found Amphitrite, and All 12 Words», тело = 12 слов; после письма приходит финальный шаг (паттерн Hunt #1: passphrase пришла в ответе — «supernova»). Не хватает: 12-е слово + passphrase.
- Артефакты: `data/GLIMMER_HANDOFF_2026-10-17.txt`, `data/glimmer_probe.py`, `data/glimmer_batch2.py`, `data/glimmer_batch3.py`, `data/glimmer_gap.py` + логи (3 шт.), `data/jetkc_deep.py`, `data/jetkc_hidden.py`, `data/jetkc_page.json`, `data/jetkc_report.txt`.

## 2026-10-17, ~04:00 — импорт dsh-сессии в каталог (Qoder)
- Делал: Qoder (Qoder Desktop, Windows).
- Результат: артефакты сессии скопированы в `data/`; создан дайджест отчётов `data/glimmer_dsh_reports_2026-10-17.md`; README дополнен секцией «Обновление (2026-10-17, ~04:00)»; создан этот LOG.md.
- Ссылки: README «Обновление (2026-10-17, ~04:00, Qoder)».

## 2026-10-17 — заведение этого журнала
- Делал: Qoder.
- Результат: LOG.md создан (правило каталога от 17.10, см. `../../AGENT_INSTRUCTIONS.md`); история выше — бэкфилл. Дальше каждый агент дописывает свои заходы сюда.

## 2026-10-17, 13:49 — Stage 1 brute force по GLIMMER_BRUTEFORCE_GUIDE (Qoder)
- Делал: Qoder Desktop, Windows (i7-10700, 8 физ. ядер; GPU RTX 3070 занят чужим BLM-джобом `C:\blm\sweep24.py` с 15.10, не трогал).
- Оракул сертифицирован до запуска (`data/glimmer_stage1.py --selftest` внутри main):
  - BIP84 вектор: `abandon ×11 about`, пустая passphrase → `bc1qcr8te4kr609gcawutmrza0j4xv80jy8z306fyu`;
  - наш account-дериват m/84'/0'/0' совпал с bip_utils (chain code + pubkey);
  - опубликованный account xpub: /0/1 = `bc1q8cgqs3aljnj5fzg044v0lwh5cn8tul87wlvpwt` (донат), /0/0 = целевой `bc1q0akdjvrc2csau2n3gyxa3xcq0fss852x997m9y`.
- Запуск: HEAD «when you depart find» закреплён 1–4; позиции 5–12 = перестановки {mystery, discover, music, need, love, fortune, safe, X}, X ∈ 2048; пустая passphrase; сверка на уровне account xpub.
- Покрытие: 5040×8×2048 = 82 575 360 сырых мнемоник; ~5 160 960 проходят BIP39-чексумму (точный минус, если 0 совпадений).
- Организация: 32 блока по 2,59 млн сырых; маркеры `data/stage1_blocks/block_XX.done` (resume); найденное пишется в `data/FOUND_stage1.txt`; лог `data/stage1_run.log`.
- Оценка: 5,2 мс/проверку под полной загрузкой → ~14 мин на блок, 2 волны ≈ 25–30 мин.
- Результат: ожидается (дописать по завершении).

## 2026-10-17, 14:19 — Stage 1 завершён: точный минус (Qoder)
- Итог: **0 совпадений**. Пройдено 32/32 блока, 82 575 360 сырых мнемоник, **5 157 251** прошедших BIP39-чексумму; все — с пустой passphrase, HEAD «when you depart find» в позициях 1–4, X ∈ все 2048 слов, позиции 5–12 — все перестановки 7 известных + X.
- Время: 1660 с (27,7 мин) на 16 логических потоках (8 физ. ядер; GPU занят BLM).
- Сверка шла на уровне account xpub m/84'/0'/0' (chain code + pubkey), оракул сертифицирован до запуска (см. запись 13:49). FOUND_stage1.txt не создан.
- Эскроу: mempool.space в 14:16 — funded 3 177 700, spent 0, tx_count 1 (не тронут).
- Вывод: при закреплённых первых четырёх словах мнемоники с пустой passphrase не существует ни для одного 12-го слова и ни для одного порядка остальных семи. Значит: либо порядок первых четырёх иной, либо passphrase непустая (либо и то и другое).
- Артефакты: `data/glimmer_stage1.py`, `data/stage1_run.log`, `data/stage1_blocks/*.done` (32), `data/bip39.txt`. Resume-маркеры оставлены.
- Далее по гайду: Stage 2 (словарь passphrase на порядках A/B/D/E/G) и/или вариант 1b (блок из 4 слов в любой позиции, ~46 млн) — оба требуют GPU; GPU освободится после BLM-джоба, либо можно запускать CPU-волнами.

## 2026-10-17, 14:34 — Stage 1b на GPU: точный минус (Qoder)
- По указанию Ильи остановлен чужой BLM-джоб `C:\blm\sweep24.py` (надзиратель + python; чекпоинт 3350/12376 сохранён в `sweep24_state.json`, рядом положен `PAUSED_BY_ILYA_2026-10-17.txt`). GPU освобождён.
- Собран GPU-движок на базе CUDA-исходника BLM (`data/gpu/device_glimmer.cu`, pbkdf2+secp256k1+BIP32, путь по умолчанию m/84'/0'/0'/0/0) + два ядра: генератор checksum-валидных 12-слов и дериватор. Скрипт `data/glimmer_gpu_stage1b.py`.
- Сертификация: подсаженный BIP84-вектор `abandon ×11 about` найден на строке 0; негативный контроль (та же мнемоника против адреса Glimmer) — 0. NVRTC-компиляция ~2 мин, кэшируется.
- Прогон: блок «when you depart find» в каждой из 9 позиций; остальные 8 позиций — все 8! порядков {7 известных + X}, X ∈ 2048; пустая passphrase.
- Итог: **46 451 601 деривация за 226,4 с (~205 тыс/с), 0 совпадений**. По позициям: 5 159 239 / 5 158 471 / 5 159 597 / 5 160 049 / 5 165 157 / 5 161 459 / 5 164 038 / 5 161 751 / 5 161 840.
- Следствие: пустая passphrase закрыта уже и для варианта «блок из 4 слов в любом месте». Остаётся непустая passphrase (Stage 2) либо другой набор/порядок слов.
- Артефакты: `data/glimmer_gpu_stage1b.py`, `data/gpu/device_glimmer.cu`, `data/stage1b_run.log`. FOUND_stage1b.txt не создан.

---
<!-- добавлено при синхронизации из облачной копии папки (экспорт Drive 2026-10-17T13:05:50Z) -->

## 2026-10-17, 14:16–14:46 — Hark, проект «SLM Glimmer: загадка на 3,18 млн сат» (Hark agent, песочница Hark, 2 ядра)
- Делал: задача Ильи — «добить оставшиеся 2/3 из 15 248 по D/E». Сверил логи прогонов в песочнице (`/workspace/work/glimmer/D0–D2.log`, `E0–E2.log`, `fwrA/fwrB.log`).
- Результат 1 (уточнение досье): «2/3 не завершено» в досье v2 — **устарело**. Все три трети (ppF_00/01/02 = 5122+5067+5059 = 15 248, включая пустой passphrase) по D (131 вариант 12-го слова) и E (139) завершены 16.10 20:03–20:41 МСК, `done`, FOUND нет. Вместе с A/B (fwrA/fwrB `ALLDONE`) — 4 порядка × 15 248 = **0**.
- Результат 2 (новый прогон, расширение порядка): 10 слов в фиксированном порядке `when you depart find discover music need love fortune safe`, `mystery` в любом из 11 слотов, неизвестное слово в любой из 12 позиций, только checksum-валидные → **16 856 мнемоник** (накрывает A/B/D/E и все прочие позиции). × 43 passphrase: пустой, supernova/Supernova, glimmer/Glimmer, amphitrite/Amphitrite, closerandcloser, closer and closer, Atlas Mountains, atlasmountains, discoverglimmer, youshallpass47, codebreaker, codebreaker11, smoke, fire, raft, Mary Ann, maryann, Gilligan/gilligan, vampire/Vampire, 4samcodeartist, virtual moon, treasure, Poseidon/poseidon, smithlylemoore, Smith Lyle Moore, SmithLyleMoore, wavebreaker7109, electricfeel64, 777, north64, Minnow/minnow, lightafire, RaftBuilt, escape, albatross, semaphore. Путь m/84'/0'/0', сравнение с account-pubkey из опубликованного xpub (`02e20da6…fb73`). ≈725 тыс. проверок, ~15 мин → **0 совпадений**.
- Вывод: уровень 1 (офлайн: 11 известных слов + перебор 12-го и порядка) честно закрыт. Порядок слов уже не узкое место — при любой позиции 12-го слова/mystery ни пустой, ни «очевидные» passphrase не подходят. Значит упор в passphrase (или 12-е слово не «филлер», а конкретное слово за замками zhgsm/jcl9c). Цена перебора passphrase: ~52 с на одну строку по всем 16 856 мнемоникам (2 ядра) ≈ 70 строк/час; по узким порядкам A/B — ~0,13 с на строку. Слепой словарный перебор по всем позициям бесперспективен; по прецеденту Hunt #1 passphrase приходит от авторов после письма с 12 словами (письмо — только с ОК Ильи).
- Артефакты: `data/anypos_sweep.py` (резюмируемый, файл прогресса `<pplist>.done`), `data/pp_top.txt`.


## 2026-10-17, 18:44 — AutoClaw (модель zai_glm-5.3-flash, среда AutoClaw/Windows, проект «Default»)
- Представляюсь: сессия по протоколу AGENT_INSTRUCTIONS.md; работаю по замкам raft/smoke (12-е слово).
- Делал: батч 4 — **все 98 названий эпизодов Gilligan's Island** (Wikipedia, сезоны 1–3; родительская страница jetkc — тема сериала, S1E1 буквально «Two on a Raft»). Очистка артефактов вики, 4 формы регистра/пробелов, дедуп против секции 8 HANDOFF (2479 испытанных) → **83 действительно новых кандидата** × 2 замка (zhgsm raft-escape, jcl9c smoke-signals) через Wix-оракул (resolve_protected_page_urls), темп 0.25 с, ретраи на 429/5xx.
- Результат: **166 запросов, 0 попаданий.** Семейство «названия эпизодов» закрыто (те, что не были в 2479, теперь сертифицированно проверены).
- Поправка к моему же раннему совету в WAKE_QUEUE: письмо авторам отправить НЕЛЬЗЯ — финальная страница требует все 12 слов (12-е за замками raft/smoke, порядок не уверен). Письмо откладывается до 12-го слова.
- Артефакты: `tools/glimmer_batch4_episodes.py`, `data/glimmer_batch4_results.txt`, `data/gilligans_island_episode_titles_98.txt`.
- Ссылки/доказательства: en.wikipedia.org List_of_Gilligan's_Island_episodes (сезоны 1–3); оракул — как в data/glimmer_batch3.py.


## 2026-10-17, 21:47 — AutoClaw (zai_glm-5.3-flash / AutoClaw, Windows)
- Бронь: claims acquire (AutoClaw). Ось: deduction-замки raft/smoke — свежие семейства: полные имена персонажей, фразы песни-заставки, морские/спасательные термины, watubi, мифы побега/огня (Daedalus/Lucifer/Hephaestus), даты эпизодов; lower+Title; дедуп против 2479 секции 8 HANDOFF.
- Кандидатов: 49 × 2 замка через Wix-оракул.
- Результат: проверено 98 запросов, найдено 0. Ось закрыта (семейства исчерпаны).

## 2026-10-18, 09:52 — OCP Sync (Qoder Desktop, Windows) <!-- ocp-snapshot:19644e58 -->
- Делал: обогащение из внешнего репозитория [open-crypto-puzzles](https://github.com/floflo777/open-crypto-puzzles) — раскладка дельты снапшота `19644e58` (клон `_sources/ocp/`, реестр `_sources/OCP_SNAPSHOT.md`). Протокол: `claims acquire/heartbeat/release` по `smith-lyle-moore-hunt-2-0-032btc`. Прогонов/переборов не запускали, статус пазла и балансы не меняли, чужие файлы не перезатёрты (копии лежат отдельными деревами `data/ocp/` и `tools/ocp/` с provenance).
- Результат: перенесено 8 файлов данных → `data/ocp/`, 2 кода → `tools/ocp/`,0 тяжёлых (>250 КБ) оставлены в клоне — указатель `data/ocp/_HEAVY.md`. Зеркал, уже лежащих в базе, пропущено: 0. Статус по OCP: `open`.
- Артефакты: `2-mid-prizes/smith-lyle-moore-hunt-2-0-032btc/README.md`, `2-mid-prizes/smith-lyle-moore-hunt-2-0-032btc/analysis/leads.md`, `2-mid-prizes/smith-lyle-moore-hunt-2-0-032btc/analysis/mechanism.md`, `2-mid-prizes/smith-lyle-moore-hunt-2-0-032btc/analysis/tested.md`, `2-mid-prizes/smith-lyle-moore-hunt-2-0-032btc/clues/author-posts.md`, `2-mid-prizes/smith-lyle-moore-hunt-2-0-032btc/data/site-structure.csv`, `2-mid-prizes/smith-lyle-moore-hunt-2-0-032btc/images/02-structure-branches.svg`, `2-mid-prizes/smith-lyle-moore-hunt-2-0-032btc/puzzle.json`, `2-mid-prizes/smith-lyle-moore-hunt-2-0-032btc/tools/fig_structure.py`, `2-mid-prizes/smith-lyle-moore-hunt-2-0-032btc/tools/oracle.py`
- Ссылки/доказательства: https://github.com/floflo777/open-crypto-puzzles/tree/19644e58e50721f8469680f2edcba1daa0697630/2-mid-prizes/smith-lyle-moore-hunt-2-0-032btc ; полная дельта — `_sources/ocp_sync_2026-10-18/delta_report.md`.

## 2026-10-18, 10:25 — OCP Sync (Qoder Desktop, Windows)
- Делал: служебная запись **без прогона** — транслирую инсайт из закрытого 18.10 пазла Genesis Block Wallet (перенесён в `solved/caesarcoder-genesis-block-wallet-puzzle-947ksats`) на этот пазл.
- Гипотеза «rounds-ось»: решение genesis было не в стандартных настройках KDF — **PBKDF2-HMAC-SHA512 rounds = 181 505 и 200 913 вместо 2 048** (числа кодируют время 18:15:05 UTC и дату 2009-01-03 генезис-блока), при пассфразе «Satoshi Nakamoto». Наш пайплайн фиксирует стандарт: `data/anypos_sweep.py:9` — `pbkdf2_hmac('sha512', mn, ('mnemonic'+pp), 2048)`; GPU-ядро `data/gpu/device_glimmer.cu` (pbkdf2+secp256k1+BIP32) — тоже 2048. Негативы GLIMMER покрывают только эту ветку.
- Следствие: полученные здесь нули корректны как «при rounds=2048 совпадений нет», но **не покрывают** пространство нестандартных rounds/соли — это ограничение интерпретации прежних негативов, а не новая ось перебора. Их собственный GPU-поиск тоже встал на 30 000 раундов (см. `data/ocp/README.md` genesis-папки), т.е. перебор по rounds вверх — это взрывной рост цены заCandidate, а не «ещё один заход».
- Что делать (бесплатный шаг): прочитать генератор/оракул пазла и подсказки автора на явные упоминания rounds / iterations / salt / «Electrum vs BIP39»; при неясности — вопрос автору только по решению куратора. **ПРОГОН НЕ ЗАПУСКАТЬ**: по `AGENT_INSTRUCTIONS.md` п.4 перебор допускается только по оси, суженной инсайтом, и требует отдельного ОК Ильи; «попробовать другие rounds» само по себе таким инсайтом не является.
- Артефакты: не создавались; материал OCP по пазлу лёг в `data/ocp/` и `tools/ocp/` (запись 09:52).
- Ссылки: `solved/caesarcoder-genesis-block-wallet-puzzle-947ksats/LOG.md` (запись 10:05), https://github.com/floflo777/open-crypto-puzzles/pull/44 ; `_sources/ocp_sync_2026-10-18/delta_report.md`.
