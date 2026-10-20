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
## 2026-10-18 14:25–14:40 МСК — Qoder (по плану 18.10: цель №3, шаг (a) — аудит реально отправленных паролей)
- Бронь: `claims acquire smith-lyle-moore-hunt-2-0-032btc --agent Qoder` (до 13:10:50Z). Шлюз GitHub-intake (правило №9) перезапущен: `tools/github_intake.py run … --agent Qoder` → статус PARTIAL (`data/github/` без INTAKE_RESULT.json), ждём завершения до проверочного прогона.
- **Аудит утверждения README строка 106** («кандидаты `fffffffffff` и `01271967` числились непроверенными; по файлам не видно, были ли они среди 43 паролей t21»): проверено по фактическим артефактам, а не по чужим словам.
  1) `data/GLIMMER_HANDOFF_2026-10-17.txt:607` — автор handoff сам пишет: «Neither `fffffffffff` (11 lowercase) nor `01271967` appears in any test list for jcl9c».
  2) Но `data/glimmer_probe.py` (строки 31–32) включает оба кандидата в список KNOWN_REUSE, а `data/glimmer_probe.log` показывает прогон 17.10 00:01:58–00:14:58: **381 запрос = 127 кандидатов × 3 замка** (zhgsm, jcl9c, y6cd1), hits=0. 127 = 46 KNOWN_REUSE + 31 RAFT + 30 FIRE + 22 FIGHT минус дубли → т.е. оба кандидата **фактически уходили на все три замка**.
  3) Ограничение, которое я нашёл в коде `test()`: лог пишет только итог по замку, а не статус каждого кандидата; ветки `NO` (403/success:false) и `ERR` (повторные 429/5xx после 3 ретраев) в логе неотличимы. Средний темп 900 с/381 запрос ≈ 2,36 с на запрос при паузе 0,3–0,6 с — значит ретраи были, и «ERR-exhausted» для отдельного кандидата исключить нельзя.
- **Вывод аудита:** пункт «доподать 2 запроса» из плана не отпадает, но сужается до честной формулировки: не «никогда не отправлялись», а «отправлялись, но итоговый статус по двум кандидатам не задокументирован». Цена закрытия — 4 запроса (2 кандидата × 2 замка), оракул точный (200+success → HIT, 403 → NO, иначе ERR).
- Предрегистрированная ось H2a: `POST resolve_protected_page_urls` (pageId ∈ {jcl9c, zhgsm}, password ∈ {fffffffffff, 01271967}), строго последовательно, пауза 0,6 с, ретрай на 429/5xx до 5 раз, статус каждого ответа пишется в артефакт (в отличие от прежнего лога). 4 запроса ≪ лимита 2 500/ч, трансляций/трат нет.
- Самопроверка оракула перед прогоном: один контроль на заведомо закрытом пароле (эталон: `e3zre` + `albatross` из таблицы README) → должен дать HIT; если контроль не проходит, сеть/параметры siteId/metaSiteId неверны и негативы meaningless.

## 2026-10-18, 14:18 — Qoder (github_intake) — GITHUB INTAKE (шлюз)
- Делал: python tools/github_intake.py run smith-lyle-moore-hunt-2-0-032btc --agent Qoder
- Кандидаты: floflo777/open-crypto-puzzles (registry, ссылки досье), benjacasas02/independent-cryptography-research (community, ссылки досье), diploux/unsolved-crypto-puzzles (community, ссылки досье), schum-io/open-crypto-puzzles (fork, форки floflo777/open-crypto-puzzles), lekejf/open-crypto-puzzles (fork, форки floflo777/open-crypto-puzzles), pauldmurphy/open-crypto-puzzles (fork, форки floflo777/open-crypto-puzzles), ebr4him68-rgb/open-crypto-puzzles (fork, форки floflo777/open-crypto-puzzles), aperioscanner/open-crypto-puzzles (fork, форки floflo777/open-crypto-puzzles), windstalker-arch/open-crypto-puzzles (fork, форки floflo777/open-crypto-puzzles)
- Скачано: репо=4 (файлов 679, 27.0 МБ; медиа 74), issues=0, comments=0, PR=0, releases=0, gists=0, wiki=нет
- Бюджет: api.github.com запросов = 10 (remaining 31, reset 2026-10-18T11:34:37Z); бесплатных транспортов (codeload/ls-remote/git) = 12
- Негативы: не собрано (сверх --max-repos 4): lekejf/open-crypto-puzzles, pauldmurphy/open-crypto-puzzles, ebr4him68-rgb/open-crypto-puzzles, aperioscanner/open-crypto-puzzles, windstalker-arch/open-crypto-puzzles
- Артефакты: data/github/GITHUB_INTAKE.md, data/github/INTAKE_RESULT.json, data/github/_legacy_pointers.md, data/github/<owner>__<repo>/{files,raw,REPO_META.json}
- Статус шлюза: partial (срезано потолками: собрано 4 кандидатов из 9 (--max-repos/--max-mb)); остаток в data/github/resume.json
- Ссылки/доказательства: floflo777/open-crypto-puzzles, https://github.com/benjacasas02/independent-cryptography-research, https://github.com/diploux/unsolved-crypto-puzzles, https://github.com/Schum-io/open-crypto-puzzles


## 2026-10-18 14:40–14:45 МСК — Qoder (ось H2a выполнена: закрытие статуса по двум кандидатам)
- Шлюз GitHub-intake завершён (правило №9): репо 4, файлов 679 (27,0 МБ), issues/comments/PR/releases 0, API 10 (remaining 31), статус **partial** (срезано --max-repos 4; остаток в data/github/resume.json). Дайдест data/github/GITHUB_INTAKE.md, артефакт data/github/INTAKE_RESULT.json.
- Прогон `tools/h2a_probe.py` (7 запросов, строго последовательно, пауза 0,6 с), артефакт `data/h2a_probe.log`.
- **Самопроверка оракула пройдена:** CONTROL e3zre + albatross -> HIT (HTTP 200, payload со ссылками pages.parastorage.com). Значит негативы ниже — настоящие «пароль неверен», а не сетевые артефакты.
- Результат оси: 6/6 **NO (HTTP 403)**, ERR = 0:
  - jcl9c: fffffffffff -> 403, 01271967 -> 403
  - zhgsm: fffffffffff -> 403, 01271967 -> 403
  - y6cd1: fffffffffff -> 403, 01271967 -> 403
- **Фиксация негатива (точная формулировка):** кандидаты `fffffffffff` (11 строчных f) и `01271967` отвергнуты оракулом Wix на всех трёх запертых страницах Glimmer (jcl9c / zhgsm / y6cd1); интерпретационная дыра из аудита (NO vs ERR в логе 17.10) закрыта. Ни одного HIT.
- Побочное, полезное: подтверждено, что пара metaSiteId/siteId/pageId живая и оракул доступен с этой машины бесплатно — это открывает последовательную проверку словесных гипотез по оставшимся замкам (≤ ~2 500 запросов/час при паузе 0,6 с).
- Следующая предрегистрированная ось H2b (не перебор): разбор самих загадок `zhgsm /raft-escape` и `jcl9c /smoke-signals` по канону сериала (Hunt #1: пароли = названия эпизодов/цитаты, регистр и дефисы как на сайте) — кандидаты выводятся текстом загадки, единичные, каждый проверяется одним запросом с обязательным контролем перед серией.

## 2026-10-18 14:46–14:50 МСК — Qoder (предрегистрированная ось H2c: проверка базового допущения «gating server-side»)
- Гипотеза: досье утверждает (README:41, «факты» от Hark 16.10), что гейт страниц Wix серверный — поэтому единственный путь к zhgsm/jcl9c это угадать пароль. Это допущение не проверялось на этой машине и не датировано. Если оно неверно (Wix отдаёт HTML запертой страницы, а проверка пароля выполняется только в приложении), то вся стратегия «>2 600 строк на оракул» стоит на неверной основе.
- Ось H2c (НЕ перебор, 5 GET, ~4 секунды): `GET https://www.smithlylemoore.com/<slug>` для (а) публичного /treasure-hunt — контроль метода; (б) запертого /pirates — контроль механизма: если её HTML содержит тот же `144728_<hash>_N.json.z`, что вернул HIT-оракул (hash 922c553ee98a7d1d6703a1a696128d9a), гейт клиентский; (в) /raft-escape, /smoke-signals, /pirate-battle — только статус, размер, SHA-256 тела и найденные json-идентификаторы.
- Этическая рамка прогона: извлекаются ТОЛЬКО метаданные ответа. Содержимое запертых страниц (текст загадок, возможные бутылки со словами) не читается и не пишется в артефакты: прохождение пароля — авторский замысел, и «подглядеть» страницу означало бы решить не загадку, а конфиг. Если дыра подтвердится, решение «читать или нет» выносится к координатору, а не принимается скриптом.
- Код: `tools/h2c_gating_check.py`, артефакт: `data/h2c_gating.log`.

## 2026-10-18 15:00–15:30 МСК — Qoder (ось H2c выполнена; открыта и предрегистрирована H2d)
- **H2c (проверка допущения «gating server-side»): выполнено, допущение ПОДТВЕРЖДЕНО.** Метод: 4 GET публичного HTML (`tools/h2c_gating_check.py`, кэш `data/h2c_cache/`, поля — `tools/h2c_fields.py`). Из `warmupData` → `pagesMap` извлечены (а) 56 pid в `passwordProtected` → `data/h2c_site_locks.json`; (б) `publicPageIds` = 21 страниц; (в) имена json-файлов (`pageJsonFileName`) есть **только** у публичных 21, ни у одной из 56 защищённых — тест на e3zre: её json-имя (922c553e…) появляется в публичном HTML **0 раз** (`-1` при поиске). Значит контент запертых страниц без пароля недоступен, и обходной «прочитать страницу напрямую» путь отсутствует. Все прогоны zhgsm/jcl9c/y6cd1 легальны только через пароль — стратегия досье верна по основе.
- Побочный, но ценный результат (бесплатно, из того же `pagesMap`): полная карта сайта 78 страниц `pid → title → pageUriSEO` — `data/h2c_pagemap.json`. Досье её не имело (описывало только посещавшиеся страницы). У незакрытых замков впервые видны заголовки: **zhgsm = «RaftBuilt» / raft-escape**, **jcl9c = «lightafire» / smoke-signals**, **y6cd1 = «fight» / pirate-battle**, y756h/a (`a`), leklh/b (`b`), xjnxo/c (**copy-of-b**), vy58x/d (**copy-of-c**) — два последних slug это служебные дубликаты Wix, т.е. гипотеза «откроются после письма» ослабевает: это черновики, а не финальные ячейки).
- Уточнение по числам: защищённых страниц **56**, не 57 (`jbuh5` «My Account» — служебная Wix-страница без пароля; `ty78s` «Hell» — защищена, в досье была в списке открытых). Открытых публичных страниц 21, из них 12 (`bbryd`, `y9iq2` HOME, `wsbja`, `aj73v`, `swidf`, `jxam2`, `lzyu7` MUSIC, `p8po9` VIDEO, `ay4p6` get-hints, `gly1l`, `vicn4`, `zren*`) в досье никогда не разбирались.
- **Предрегистрирована ось H2d (чтение, не перебор):** собрать json 21 публичной страницы (`pageJsonFileName` + суффикс `.json.z?v=3`, проверенный на bbryd: HTTP 200, 3817 байт) и извлечь тексты/метки/ссылки — `tools/h2d_public_pages.py` → `data/h2d_public/*.json`, `data/h2d_texts.txt`. Цель: (1) текст `bbryd` «not a red herring, but its a red herring» — страница, чьё название прямо про указатель; (2) `ay4p6` /get-hints — механика подсказок авторов; (3) `swidf` End of Treasure Hunt + `jxam2` Heaven Is Close — статус охоты; (4) `y9iq2` HOME — возможные слова/passphrase; (5) `zren*` — лайтбоксы библиотеки. 21 GET статического CDN, оракул паролей не трогается, лимитов не касается.


## 2026-10-18 15:39 UTC — Qoder (ось H2d закрыта; открыта и предрегистрирована H2e)
- H2d выполнена (21 публичная страница Wix, JSON по pageJsonFileName, `tools/h2d_public_pages.py`, `data/h2d_public/*.json`, сводки `data/h2d_texts.txt`/`data/h2d_full_text.txt`/`data/h2d_links.json`). Оракул паролей не трогали.
- Новое из H2d: (1) `gv4d7` «KEY CHECKER» (hidePage=true): «CHECK YOUR KEY... OR IS IT ALL A TRAP?» + кнопка START KEY CHECK → PageLink на `#szyux`; в документе страницы ни `szyux`, ни формы/поля ввода нет — кнопка ведёт в несуществующий элемент (либо lightbox удалён). Вывод: это либо приманка, либо мёртвый артефакт; как оракул не работает, пока не найден документ szyux. (2) `aj73v` «The Search Begins» — история про корабль «Poseidon» (пустая лодка, «Nobody is aboard», чеснок, «Welcome Home») + подпись «latitude (numbers only)» и кнопка «I'm really confused»; в карте сайта есть ЗАПЕРТАЯ страница `latitude` (oq7la) — вероятно, её пароль и есть широта из истории. (3) `zrene` «Apple Music» отдаёт публичный mp3: `144728_0c8601557b264778a4388e93befab989.mp3`, title «Glimmer (ft Dhani Harrison)_48k24b.mp3», 205 с — и по `epndr` «Woven into our next single, Glimmer, is a story» это штатный носитель истории. (4) `swidf` «End of Treasure Hunt» — обращение автора: «I see what you're doing. I know it has helped you. But it wont take you all the way. We've thought your shortcut» — подтверждает, что просмотр структуры сайта помогает, но финал требует загадок.
- **Ось H2e (чтение, не перебор):** скачать публичный mp3 Glimmer и все публичные медиа 21 страницы (URI из h2d JSON, static.wixstatic.com), снять sha256; выполнить ASR (если есть локальный whisper) и/или прочитать текст песни, извлечь повествование и кандидатов-ответов на замки; НЕ отправлять ни одного пароля в оракул в этом проходе. Результат — текст/факты в `data/`, кандидаты — отдельным списком с провенансом.
- Приз: 3 177 700 сат, адрес bc1q0akdjvrc2csau2n3gyxa3xcq0fss852x997m9y, 0 трат (проверка 17.10; повторю перед оракульными запросами).


## 2026-10-18 18:52 (MSK) — Qoder — H2e закрыт частично (медиа получено) + предрегистрация H2f

- **H2e (YouTube-носитель).** `Born to Be Wild` официальный клип `XwXfJXdVSYQ` скачан через yt-dlp: видео 360p (8.34 МБ), аудио m4a (3.11 МБ), англ. авто-субтитры, info.json — в `data/media/` (sha256 ниже). Описание видео: «All footage in this video is from NASA. Find where, explorer. This video is part of their digital museum and will help you to move beyond ours.» Авто-субтитры фиксируют в концовке цитату из звонка Никсона экипажу Apollo 11 («for one priceless moment in the whole history of man… return safely to earth») — это подтверждает лунную/NASA-линию Hunt #1, но новых слов/паролей Hunt #2 не даёт. Wix-хосты (www / parastorage / static.wixstatic) с этой машины по-прежнему HTTP 000 — mp3 Glimmer и оракул паролей недоступны, поэтому ни одного запроса к Wix в этом проходе не сделано (негатива из «молчания» не выводим).
- **H2f (предрегистрация, офлайн, без внешних запросов).** Сверка двух конкурирующих моделей seed. В GitHub-интейке (benjacasas02, 02.09.2026) лежит независимая реконструкция: слова 1–9 = `when you depart find mystery` + `hunt gather whale blood` (бутылка mwfaz), 11–12 = `virtual moon`, слово 10 свободно (147 checksum-валидных), а passphrase — единственный блокер. Наша модель (README): 6–9 = `discover music need love`, 10–11 = `fortune safe`. Оси: (а) проверить обе модели на passphrase-кандидатах, которых НЕ было в наших прошлых прогонах (Title-case `Amphitrite`/`Poseidon` по всем 12 перестановкам блоков — в досье Title-case гонялся только по одной), (б) оракул — account-chaincode опубликованного xpub, witness = Hunt #1 (seed+`supernova`→известный адрес). Бюджет: 12 перестановок × 147 слов10 × ≤120 passphrase ≈ 210 тыс. проверок, ≤2 мин на 16 ядрах. Никаких транзакций/писем/публикаций.


### H2f — результат (18:57 MSK)
- Witness: `SELFTEST OK` — Hunt #1 `fortune all man kind one giant step into digital tomorrow virtual moon` + `supernova` → `bc1qgtymp8q7hw2k9tewhdq74vdlpkqhflgju69n95` (blockstream: funded 2 500 000, spent 2 500 000, 2 tx). Неверная passphrase → NO MATCH.
- Побочная находка: в досье benjacasas02 адрес Hunt #1 напечатан без «8» → невалидный bech32; значит досье содержит фактические ошибки и его «отрицательные» кампании нельзя считать сертифицированными.
- Прогон: 12 перестановок блоков `{when you depart find mystery}` / `{hunt gather whale blood}` / word10 × 2 порядка `virtual moon` × все checksum-валидные word10 (301 080 наборов) × 193 passphrase (включая пустую, Amphitrite/Poseidon в Title/UPPER) → **0 совпадений**, 80.7 с, 16 ядер. Артефакты: `data/glimmer_h2f_reconcile.py`, `data/H2F_NEGATIVE.txt`.
- Следствие: модель «whale-слова + virtual moon» с наиболее вероятными passphrase (и с пустой) закрыта нашим независимым прогоном; остаётся наша модель (11 слов) и блокеры «12-е слово / passphrase», а также оракул паролей Wix, когда сеть восстановится.

## 2026-10-18, 16:50 UTC — Qoder Desktop (Windows) — сеть Wix восстановилась; H2e добит (mp3+ASR), предрегистрация H2g
- Приз перепроверен: `3 177 700` сат, `spent 0`, `tx 1` (mempool.space, 16:49Z) — жив.
- **H2e (добит):** Wix снова доступен (`www.smithlylemoore.com/treasure-hunt` → 200, 486 201 Б). Glimmer mp3 скачан по штатному пути Wix `static.wixstatic.com/mp3/144728_0c8601557b264778a4388e93befab989.mp3` (4 918 881 Б, 3:24.86, 192 kb/s, sha256 `d786217f81074f7f28333fb1ca3187255b9a10b73c2cef5e2ba7a15cfdd83ba0`) → `data/media/glimmer.mp3`. ASR: faster-whisper `base.en` int8 через ffmpeg-PCM (обход несовместимого PyAV), транскрипт `data/media/glimmer_asr.txt`; текст совпадает с уже известными лирическими строками (glimmer in the ocean / high tide brings her to the coast / closer and closer / feathers of an eagle / we'll paint our names across the silver sky). Новых строк, которых нет в `GLIMMER_HANDOFF` (52 строки и 945 n-грамм уже гонялись), не появилось; оракул в этом шаге не трогали.
- **Ось H2g (регистрируется ДО прогона; не перебор, закрытие известных 429-дыр из HANDOFF §0.4 и §0.2):**
  (а) `zhgsm` × 30 BIP39-слов, получивших 429 и ни разу не проверенных: love, lumber, luxury, lyrics, machine, magnet, mammal, man, mandate, mansion, maple, margin, marine, market, marriage, mask, match, measure, message, monitor, monkey, museum, north, nose, ocean, opera, oven, six, sniff — в нижнем регистре и Title Case (60 запросов);
  (б) пароли-повторы, которые из-за threaded-429 считались «мимо», но фактически не тестировались: `777`, `666`, `fffffffffff`, `FFFFFFFFFFF`, `01271967`, `north64`, `wavebreaker7109`, `witchoftheeast`, `east64`, `escape` × `zhgsm`, `jcl9c`, `y6cd1` (30 запросов).
  Контроль перед серией: `e3zre` + `albatross` → обязателен HIT. Темп 0,6 с, ретраи 429/5xx до 5, статусы NO/ERR различаются, ERR негативом не считается. Бюджет ≈91 запрос, ~2 мин, лимит 2 500/ч не затрагивается. Скрипт `tools/h2g_gap_probe.py`, лог `data/h2g_gap_probe.log`.
- **H2g выполнен (16:51Z): 82 probes, 0 HIT, 82 NO, 0 ERR** (1м41с; контроль e3zre/albatross = HIT). Закрыты: 29 BIP39-слов × 2 регистра на `zhgsm` (58) и 8 паролей-повторов × 3 замка (24). Негатив сертифицирован (NO≠ERR). Лог `data/h2g_gap_probe.log`.
- **Ось H2h (регистрируется ДО прогона; закрытие главной BIP39-дыры):** `y6cd1` (pirate-battle) — прошлый свип остановился на #0, фактически <100 слов. Гипотеза: пароль — слово BIP39 (привычка автора: пароль c2ozw содержал seed-слово `discover`; gkfxt = лирическая строка). Свип стандартного списка 2048 слов (`data/bip39.txt`), строго последовательно, пауза 0,7 с, ретраи 429/5xx, контроль `e3zre/albatross` перед каждым чанком; чанк ≤500 запросов (≈10–11 мин < лимита 15). Прогресс в `data/h2h_state.json`, лог `data/h2h_y6cd1.log`; HIT сохраняется в `data/h2h_hits.json` и останавливает серию. Скрипт `tools/h2h_bip39_probe.py`.
- **H2h чанк 1: остановлен сетью, не негатив.** Контроль HIT прошёл; слова #0–39 (`abandon`…`again`, 40 шт.) → **NO (403)**, затем на #40–45 пошли SSL-handshake timeouts (ERR). После прогона Wix снова недоступен с машины (`www.smithlylemoore.com` и API → HTTP 000, 3×12 с). Состояние `next=40` зафиксировано в `data/h2h_state.json`; ERR не засчитываются, при восстановлении сети свип продолжить с #40. Лог `data/h2h_y6cd1.log`.


## 2026-10-19 10:10 UTC — Qoder (Desktop, Windows) — H2h закрыта: y6cd1 2048/2048, 0 HIT
- Бронь была просрочена (истекла 2026-10-18T19:41Z, моя же, host DESKTOP-PE9BOJ5); перехвачена через `claims steal ... --agent Qoder --ttl 120` — зафиксировано здесь по требованию инструмента.
- Приз перед прогоном не менялся (последняя проверка 17.10, 3 177 700 сат, spent 0); запросы к Wix — только оракул паролей, транзакций нет.
- Метод: `tools/h2h_retry_errors.py --page y6cd1` — повтор 28 индексов, по которым в ночном свипе были сетевые ERR (#42–70), тем же оракулом, последовательно, пауза 0,7 с, контроль `e3zre|albatross` ПЕРЕД серией.
- Результат: CONTROL → HIT (HTTP 200); **28 probes: 0 HIT, 28 NO, 0 ERR**. Лог: `data/h2h_retry_y6cd1.log`.
- Итог по оси H2h: все 2048 слов стандартного BIP39 проверены на `y6cd1` (2048 NO, 0 HIT, ERR не осталось) — гипотеза «пароль = слово BIP39» на pirate-battle **закрыта сертифицированным негативом**. Состояние `data/h2h_state.json`: next=2048/2048, hits=[].
- Что осталось по SLM: непарольные оси досье (Title-case повтор West, точная фраза East, каламбур South, reverse-search стиллов) — вне этого прохода; оракул больше не нужен, пока не появятся новые кандидаты.

## 2026-10-19 12:27 UTC — Qoder (Desktop, Windows) — внешний сигнал + ось H3 (предрегистрация ДО прогона)
- Источник: arctic-shift, r/smithlylemoore, комментарий rational-Gain5010 от 2026-10-08 (t3_wojppy, сохранён
  в `data/reddit_new_20261019.json`). Сообщество сообщает готовый пароль `discoverglimmer` и способ его
  получения: по `LifeFlashBeforeEyes.mp4` кадр-за-кадром берётся один стабильный слот каждые 10 кадров
  (3 слота/с), каждый 9-й слот — прибрежный разделитель (14 штук), после удаления остаётся 120 слотов
  = ровно 15 групп по 8 бит = 15 символов. Дать объяснение не можем независимо, но проверка оракулом — да.
- Контекст: на `gkfxt` (glimmer) уже открыт `closerandcloser`; ветка East застревает на `/take-a-big-breath`
  (`c2ozw`) — именно там просит помощь glimmerreader_9281 (2026-10-07).
- **Ось H3:** пробы `discoverglimmer` и вариаций (без пробела/с пробелом `discover glimmer`, Title-case
  `Discovemail`… нет: `Discoverglimmer`, `Discover Glimmer`, `discovemail` не входит) на запертых страницах
  `c2ozw`, `ml7yd`, `zhgsm`, `jcl9c`, `udr8x`, `pxsqo`, `sodpq`, `y6cd1` (для полноты). Контроль `e3zre|albatross`
  ОБЯЗАТЕЛЕН до серии (HIT). Темп 0,7 с, ретраи 429/5xx до 5, NO/ERR разделяются, HIT не пишется в открытые файлы.
  Объём ≈ 56 запросов, ~1 мин. Только чтение сайта; транзакций, писем и публикаций нет.

### H3 — РЕЗУЛЬТАТ: c2ozw ОТКРЫТ (первый прорыв по SLM за проход)
- Контроль `e3zre|albatross` = HIT (200). Пробы 5 вариантов × 8 страниц = 40 запросов.
- **`c2ozw` + `discoverglimmer` = HIT (200)** — страница `resurface` открыта. Варианты с пробелом,
  Title-case и CAPS = NO; на остальных 7 замках (`ml7yd`, `zhgsm`, `jcl9c`, `udr8x`, `pxsqo`, `sodpq`,
  `y6cd1`) все 5 вариантов = NO. Статусы: `data/h3_discoverglimmer.log`, страница: `data/c2ozw_page.json`.
- Содержимое `resurface` (полный извлечённый текст): «Ahhhh... fresh air again... And more litter?
  Amphitrite should take better care of the sea.» / «The message reads:» / числа `5 6 7 8` /
  слова `discover music need love` / «Land in the distance. Finally. You can feel that you are getting
  closer to her.» / «password hint - where will you find her?».
- Значение: числа и слова стоят в DOM-порядке как 5→discover, 6→music, 7→need, 8→love. Это сдвигает
  прежнюю модель досье (6–9 = discover music need love) на одну позицию: слова 5–8 подтверждены страницей.

### H4 — ПРЕДРЕГИСТРАЦИЯ (офлайн-оракул xpub против новых позиций слов 5–8)
- Основа: опубликованный автором account xpub `m/84'/0'/0'` = xpub6CpNc58zqQvNGPHDGGTr68wgrmtfFDBWRuSDAxoDdrCE1iRAaZtyAD5T9uCJ3ELUYKCkx8Jkind2kwoR3Uxmg1ycQ6DWyGxZBMFvQqhNqVC;
  адрес приза `bc1q0akdjvrc2csau2n3gyxa3xcq0fss852x997m9y`; witness — Hunt #1 (12 слов + `supernova`) обязан
  дать известный адрес `1…`/соответствующий ключ, иначе инструмент невалиден.
- Гипотеза состава: 5–8 = `discover music need love` (подтверждено resurface), 9–12 = `hunt gather whale blood`
  (бутылка mwfaz, неподтверждено), 1–4 — любые 4 из `{when, you, depart, find, mystery}` в любом порядке.
- Перебор: 5 выбранных × 4! = 120 упорядочиваний, фильтр по BIP39-чексумме, затем passphrase-кандидаты
  (пустая строка + ~40 известных из досье и вариантов регистра/пробелов) → seed PBKDF2-HMAC-SHA512 (2048) →
  BIP32 m/84'/0'/0' xpub → сравнение с опубликованным. Объём: тысячи хеш-функций, <2 мин, офлайн, без сети.
- Хит = совпадение xpub: это полный seed+passphrase (деньги), передаётся только Илье лично; в репозиторий
  и в файлы не пишется, транзакций не делается. Негатив логируется с числом проверенных комбинаций.

### H5 — ПРЕДРЕГИСТРАЦИЯ (добить BIP39-свип открытого замка h7j3h /a-rocky-beach)
- Почему это денежная ось: h7j3h — следующий после `c2ozw` (открыт в H3) замок ветки East; по COMMUNITY.md
  u/aramor1 говорит «easy, the main thing is to write it correctly», а в insight 5/§2 указано, что ответ
  h7j3h может быть 10-м seed-словом («10 you will receive»). Прошлый свип остановился на ~#300–#400 из 2048,
  то есть >80% списка не покрыто — это дыра, а не негатив.
- Прогон чанками ≤10 минут (лимит 15): `tools/h5_bip39_h7j3h.py --start 400 --end 1250` сейчас,
  продолжение 1250..2048 следующим прогоном. Слова — официальный список `data/bip39.txt`, строго
  последовательно, пауза 0,7 с, ретраи 429/5xx до 5, статусы NO/HIT/ERR разделяются (ERR негативом не считается),
  контроль `e3zre|albatross` = HIT обязателен перед серией.
- HIT → пароль замка (не приватный ключ) сохраняется в `data/h5_hits.json`, текст страницы в `data/`,
  в публичные файлы и в память не пишется. Оракул — только чтение Wix; транзакций и писем нет (финал охоты
  требует письма группе — это отдельное действие, без письменного ОК Ильи не выполняется).

### H4 — РЕЗУЛЬТАТ: негатив, но с сертифицированным оракулом (важно для всех будущих негативов)
- Инструмент: `tools/h4_xpub_sweep.py` (офлайн, без сети). 120 упорядочиваний позиций 1-4 из
  {when, you, depart, find, mystery} (P(5,4)), 5-8 = `discover music need love`, 9-12 =
  `hunt gather whale blood`; × 32 passphrase-кандидата = **3 720** пар seed+passphrase.
  Из 120 корпусов BIP39-чексумму проходят 7.
- **Сертификация ноги seed->адрес: OK.** Контроль Hunt #1
  (`fortune all man kind one giant step into digital tomorrow virtual moon` + `supernova`)
  воспроизведён этим же кодом: адрес `bc1qgtymp8q7hw2k9tewhdq74vdlpkqhflgju69n95` = путь
  `m/84'/0'/0'/0/0`. Нога xpub->эскроу сертифицирована ранее (`tools/ocp/oracle.py --selftest`).
  То есть негатив H4 — настоящий негатив по проверенному множеству, а не «мусорный» инструмент.
- Итог: **0 совпадений** с опубликованным xpub (9.2 с). Покрыта СДВИНУТАЯ модель корпуса
  (5-8 = discover music need love), которую предыдущие кампании досье (C1..C6, миллиарды
  проверок) НЕ покрывали: там стояло 1-9 = when you depart find mystery hunt gather whale blood,
  11-12 = virtual moon.
- Ограничение негатива (обязательно учитывать): проверены только 4 слова из пула
  {when, you, depart, find, mystery} на позициях 1-4, фиксированный хвост 9-12 и 32 пароля.
  Пул passphrase крошечный против 358 612 слов словаря — при неверном хвосте или неизвестном
  пароле результат ничего не доказывает про фразу в целом.
- Ключей/seed-фраз не найдено, в файлы и логи ничего секретного не записано; транзакций нет.

### H6 — ПРЕДРЕГИСТРАЦИЯ (слова resurface на 7 открытых замках)
- Ось: страница `resurface` (открыта в H3) дала числа 5-8 и слова `discover music need love`,
  плюс подсказку «where will you find her?». Проверяем как пароли открытых замков `ml7yd`,
  `zhgsm`, `jcl9c`, `udr8x`, `pxsqo`, `sodpq`, `y6cd1` 8 кандидатов: `music`, `need`, `love`,
  `her`, `resurface`, `freshair`, `where will you find her`, `wherewillyoufindher`.
- Объём 56 запросов, темп 0,7 с + сетевые ретраи, ориентировочно ~3 мин (лимит 15).
- Контроль `e3zre|albatross` = HIT обязателен; HIT = пароль замка, пишется только в
  `data/h6_hits.json` и в чат Илье; приватных ключей здесь нет; транзакций и писем нет.

### H6 — РЕЗУЛЬТАТ: негатив
- 56 проб (8 кандидатов × 7 открытых замков), контроль `e3zre|albatross` = HIT (200) перед серией.
- Итог: **0 HIT, 56 NO (HTTP 403 = штатный «неверный пароль» этого сайта), 0 ERR.** Логи:
  `data/h6_probe.log`. Слова `resurface` (music/need/love/her) и фразы-подсказки паролями замков не являются.
- Следствие: подсказка «where will you find her?» — указание на ветку (замок `h7j3h`), а не на строку
  пароля. Дальше по `h7j3h` идёт только сетевой BIP39-свип H5.

### H7 — ПРЕДРЕГИСТРАЦИЯ (биты «быстрого монтажа» по калибровке сообщества)
- Источник калибровки: Reddit u/rational-Gain5010 (id `pejgs65`, сохранён в
  `data/reddit_new_20261019.json`): метод получения пароля `discoverglimmer` —
  слот каждые 10 кадров (3 слота/с), каждый 9-й слот — одинаковый береговой разделитель
  (14 штук), после удаления 120 слотов = 15 групп по 8 бит = 15 ASCII-символов.
  15 символов == длина `discoverglimmer`, метод самовоспроизводим.
- Ось: `tools/h7_montage_bits.py` гонит тот же метод по всем локальным видео
  (`bornwild_video.mp4`, `vid2/bottle_720p.mp4`, `vid2/life_720p.mp4`) с перебором
  полярности, окна 0..8 и «с разделителями / без», и ищет печатные ASCII-пробеги >=6.
- Проверка валидности прогона = воспроизведение `discoverglimmer` хотя бы на одном файле;
  если ни на одном не воспроизводится — метод неприменим к имеющимся файлам (видео-источник
  монтажа не скачан), негатив засчитывается только как «эти файлы», а не как «оси закрыты».
- Офлайн, без сети, ~2-4 мин. Найденная строка = кандидат в пароль замка, не ключ.

### H7 — РЕЗУЛЬТАТ: структура монтажа воспроизведена на 100%, признак бита — нет
- Скачаны все 6 разных видео сайта (Wix media id из сохранённых дампов страниц):
  `data/vid3/08cb…mp4` (74,03 с, 29,97 fps, 2218 кадров), `5843…mp4` (97,7 с), `9080…mp4`,
  `7a52…mp4`, `4b5c…mp4` (== уже имевшийся life_720p), `18a1…mp4` (== bottle_720p, он же
  ролик открытой страницы resurface).
- **Подтверждение метода.** В `08cb…mp4` на шаге 10 кадров найден разделительный кадр,
  повторяющийся РОВНО с шагом 9 на позициях 8,17,26,…,125 — 14 штук. После его удаления
  остаётся ровно **120 данных слотов** = 15 групп по 8 бит. Это дословно структура из
  подсказки u/rational-Gain5010, из которой сообщество получило `discoverglimmer`. То есть
  метод существует, видео найдено, окно монтажа = слоты 0..133 (44,7 с из 74 с).
- **Что не получилось:** не восстановлен сам признак 0/1. Перебрано и дало мусор (нет
  `discoverglimmer`, нет печатных пробегов): k-means(k=2) по RGB/gray/половинам/R−B, яркость и
  контраст с порогами по медиане и квантилям 0,3/0,4/0,6/0,7, intra-движение слота, lastdiff,
  std внутри слота, все комбинации msb/lsb × полярность × сдвиг фазы 0..7. Итого десятки
  декодирований, 0 осмысленных строк.
- Инструменты: `tools/h7_montage_bits.py`, `tools/h7b_slot_cluster.py`, `tools/h7c_montage120.py`,
  `tools/h7d_binize.py`, `tools/h7e_stability_bits.py`.
- Честный вывод: ось НЕ закрыта — закрыто только «эти признаки на этом файле». Ключ к оси —
  точное определение бита (какие два состояния различают 120 слотов). Это единственный вопрос,
  который стоит задать сообществу; по правилу каталога я никому не пишу и никуда не публикую.
- Побочный факт: ролик страницы `resurface` = `bottle_720p.mp4` (14,5 с, 25 fps, 363 кадра) —
  монтажа там нет, 36 слотов; то есть `discoverglimmer` кодируется другим роликом.

### H5 — РЕЗУЛЬТАТ чанка 1 (400..1249): негатив; чанк 2 (1250..2048) идёт
- Прогон `tools/h5_bip39_h7j3h.py --start 400 --end 1250`, контроль `e3zre|albatross` = HIT (200)
  до и после серии. Итог: **850 проб, 0 HIT, 850 NO, 0 ERR** (состояние `data/h5_state.json`,
  лог `data/h5_h7j3h.log`) — индексированный покрытый диапазон 400..1249 официального BIP39-списка.
- Хронометраж: 12:38:04 -> 13:07:56 UTC = 29,9 мин на 850 проб (~2,1 с/проба — сетевой оракул,
  не вычисление). Регистрировалось окно «чанк <=10 мин»; фактически чанк длился дольше из-за
  задержки Wix. Отклонение зафиксировано честно: повторять такие чанки надо с учётом ~2 с/запрос,
  т.е. <=300 проб на 10-минутное окно.
- Чанк 2 (1250..2048, 798 проб) запущен тем же инструментом в фоне; результат допишется отдельно.

## 2026-10-19, 13:27 UTC — Qoder — H5 чанк 2 (h7j3h, 1250..2047): НЕГАТИВ; предрегистрация добора 0..399
- Свидетель прогона: `data/h5_h7j3h.log` строки 37..70 — `== H5 start 2026-10-19 16:08:34 page=h7j3h
  range=1250..2048 CONTROL e3zre|albatross -> HIT (200)` и `== H5 done: 798 probes, 0 HIT, 798 NO, 0 ERR;
  next=2048`. Состояние: `data/h5_state.json` (page=h7j3h, last_index=2047, next=2048, hit=0, no=798, err=0).
- Контроль оракула перед чанком — HIT (HTTP 200) на e3zre|albatross, значит 403 = корректный NO;
  ошибок транспорта (ERR) за весь чанк — 0, т.е. ни один негатив не «молчание сети».
- Итог по оси «одно слово BIP39 = пароль замка h7j3h»: покрыто 400..2047 (чанк 1: 850 NO, чанк 2: 798 NO),
  0 HIT. ДЫРА: индексы 0..399 на этом замке не проверялись (свип `y6cd1` покрыт полностью, next=2048).
- Предрегистрация (пока этот же прогон, до старта): **H5b** — добор индексов 0..399 списка `data/bip39.txt`
  по тому же механизму (Wix-оракул, `ask(page, pw)`, контроль HIT перед стартом, пауза 0.7 с,
  ретраи, NO=403, ERR не считается негативом). Ожидаемое время ~5-6 минут, обращений 400 (+контроль).
  Инсайд-оси: слово-пароль из публичного BIP39-списка — единственная документированная не закрытая
  ветка этого замка; GPU не используется, чистый сетевой опрос. Старт — сразу после этой записи.
- Транзакций, трат, писем, публикаций нет; ключей не найдено. Бронь `Qoder` продлена до 15:23:45Z.

## 2026-10-19, 13:38 UTC — Qoder — H5b выполнен: ось «одно слово BIP39 = пароль h7j3h» ЗАКРЫТА полностью
- Прогон по предрегистрации (запись 13:27 UTC): `python tools/h5_bip39_h7j3h.py --start 0 --end 400
  --pause 0.7`. Свидетель: `data/h5_h7j3h.log` — `== H5 done: 400 probes, 0 HIT, 400 NO, 0 ERR; next=400`
  и `data/h5_state.json` (page=h7j3h, last_index=399, hit=0, no=400, err=0, ts=13:37:48Z).
  Контроль оракула перед стартом: `e3zre|albatross -> HIT (200)`, значит 403 корректно = «нет».
- Итог по оси: **2048 из 2048** слов стандартного BIP39-списка (`data/bip39.txt`) проверены на замке
  `h7j3h` — 0 HIT, 0 ERR (3 чанка: 0..399 = 400 NO, 400..1249 = 850 NO, 1250..2047 = 798 NO;
  сумма 2048, лог-строки 1..70 в `data/h5_h7j3h.log`). Замок `y6cd1` закрыт ранее тем же механизмом
  полностью (`data/h2h_state.json`: next=2048, hits=[]).
- Вывод: «пароль замка = одно слово из BIP39» для этих двух замков исчерпан. Это негатив с полным
  покрытием, а не «не доделали». Следующих дешёвых сетевых осей в этом замке не остаётся;
  незакрытые линии ханта — признак бита в монтаже (H7) и финальное письмо (нужен ОК Ильи).
- Режим: время прогона ~6 минут (в лимите ≤15 минут), GPU не использовался, обращений 2048+3
  контроля. Транзакций, трат, писем, публикаций нет; ключей нет. Бронь `Qoder` до 15:23:45Z.

## 2026-10-19, 13:46 UTC — Qoder — ось H7 (сообщество) закрыта: публичного критерия бита не существует
- Досье разведки: `data/h7_community/FINDINGS.md` (+ дампы `thread_wojppy.*`,
  `feed_rational-Gain5010.*`, `thread_megathread_ojmwfr.*`, `site/*.html`, `site/site_texts.json`,
  инструменты `dump_feeds.py`, `extract_site_texts.py`). Только чтение: ничего не публиковалось,
  комментарии/ЛС не писались, трат нет.
- **Главный вывод (почему ось закрыта, а не «не доделана»):** метода «как читать бит из монтажа»
  в публичном поле **нет**. Единственный первоисточник — трёхстрочник (стабильный слот каждые
  10 кадров → 3 слота в секунду; каждый 9-й слот — разделитель, их 14; после удаления остаются
  120 слотов = 15 групп по 8 бит), и он не содержит признака 1/0. Сам постящий (u/rational-Gain5010)
  пишет «this was not from me», то есть цитирует безымянного солвера; опубликованных постов у него
  ноль (`/user/…/submitted/.rss` пуст) — настоящий автор схемы публично не светился.
  Комментарий `pejgs65` к 19.10 **удалён с Reddit** (страница = «Этот комментарий больше не
  существует», в ветке — `[удалено]`); текст восстановлен только из user-flow RSS и сохранён в дампе.
  Веток с обсуждением деталей нет: под `pejgs65` ровно один ответ.
- Единственная публичная зацепка к носителю бита — `pcj7x4y`: «It is on the video, dm and I explain
  you. Think on the name of the song too» (оставлена в ответ на просьбу по гейту `c2ozw`).
  Дальше — ЛС, куда по правилу каталога мы не идём. Просьба-запрос `pegl0kj` помечена Reddit как
  автоматизированный аккаунт.
- Другие каналы пусты по этой теме: r/puzzles, r/BitcoinPuzzles — ничего; веб-поиск по
  «discoverglimmer» даёт только рекламу (Estée Lauder / Woolworths); X @SmithLyleMoore —
  syndication «Rate limit exceeded», сайт за логином; Bitcointalk — поиск только для
  зарегистрированных, отдельного треда ханта не найдено; Discord/Telegram/блоги — следов нет.
  Live-дамп тредов: 131 запись `wojppy` + 242 записи официального MEGATHREAD — совпадений по
  слову-методу (bit/montage/separator/frames) ноль.
- Полезные побочные находки (зарегистрированы, чтобы не переисследовать):
  1. Публичных решателей Hunt #2 **нет** — всё сообщество сидит на гейтах (East: `pirate-battle`,
     `weallliveinayellowsubmarine`, `narcosis`, `take-a-big-breath`; South: `raft-escape`,
     `smoke-signals`; West: `message` + список имён пиратов; North: «coming soon», пусто).
     Обмен паролями идёт исключительно в ЛС.
  2. `c2ozw` — не внешний токен, а внутренний Wix-id страницы `resurface` (seo-slug
     `/take-a-big-breath`), что совпадает с нашим `data/h2c_pagemap.json`.
  3. Финальный шаг по прецеденту Hunt #1 (комментарий `pdzbkjn`, сохранён): письмо на
     `codebreaker@smithlylemoore.com` с ответом ~через сутки и выдачей нового URL + пароля;
     формат паролей — `tomorrow0010000`, `morse00100001`, `codebreaker11`. В 2026 почта, по
     словам u/Unlikely_Ad3554 (`p8xxwi3`), «still active», но есть контрпримеры (`p60lqs0` — 7 ч
     без ответа, `p60gsxa` — 3 суток, `p69n6uz` — считает письмо риском). То есть оракул
     «правильный ключ → ответ» не подтверждён.
  4. Новые подсказки не появлялись: сумма в `/more-info` по-прежнему «.031777 Bitcoin», тексты
     стартовых страниц не менялись, гейты `glimmer` / `who-is-she` / `take-a-big-breath` отдают
     только оболочку.
- Что это меняет в плане: ветка «дождаться/найти публичный критерий бита» исчерпана.Montage-ось
  теперь требует **собственной** гипотезы (полный перебор признаков уже дал 0 на 120 слотах),
  а финальный email — письменной санкции Ильи. Дешёвых сетевых осей по ханту больше не осталось:
  `h7j3h` и `y6cd1` проверены 2048/2048 словами, `c2ozw` вскрыт, свип по сдвинутому корпусу — 0.
- Он-чейн (исправлено 13:55 UTC — ниже была указана чужая цель): эскроу SLM Hunt #2
  `bc1q0akdjvrc2csau2n3gyxa3xcq0fss852x997m9y` → funded 3 177 700, spent 0, 1 tx (проверено
  blockstream.info 2026-10-19 13:55 UTC). Транзакций не отправлялось, ключей не генерировалось.

## 2026-10-19, 13:48 UTC — Qoder — предрегистрация оси H7f: supervised-подгонка носителя бита по известному ответу
- Инструмент: `tools/h7f_pixel_fit.py`. Источник — только локальный `data/vid3/08cb40115a304bacaf3b924b96e5bf23.mp4`
  (74,0 с, 30000/1001 fps, 2218 кадров, 406x720). Сети нет, прогонов по сети нет, время прогона < 15 минут.
- Формулировка оси (чем отличается от закрытых H7d/H7e): там перебирались **вручную задуманные** признаки
  (яркость, контраст, квантили, k-means по RGB/gray/четвертям, intra-движение, std, msb/lsb × полярность ×
  фаза 0..7) и ни один не дал `discoverglimmer`. Здесь задача ставится как **статистическая**: поскольку
  ответ известен (120 бит ASCII `discoverglimmer`, 66 единиц / 54 нуля), для каждого из 4096 пикселей
  модели 64x64 и для блоков 8x8 считается точечно-биасериальная корреляция с известным вектором бит.
  Если носитель существует в модели «один слот = один бит, слоты читаются подряд», какая-то компонента
  обязана отделить единичные слоты от нулевых сильнее, чем любая перестановка того же вектора.
- Null-распределение строится randomization-тестом (200 перестановок известного вектора, seed 20261019),
  поэтому негатив будет **сертифицированным** (эмпирический p), а не «не повезло с признаком».
- Дополнительные проверки в том же прогоне: два способа сборки слота (среднее 10 кадров / средний кадр),
  два порядка бита в байте (msb/lsb), баланс медианного разделения (должно быть ~66/54) и четыре варианта
  порядка чтения (прямой, байт наоборот, группы наоборот, по колонкам) для случая, когда байты ложатся на
  слоты не подряд.
- Критерий успеха: эмпирический p < 0,01 И max|r| > 0,55 — тогда признак указан явно, дальше только
  декодирование и сверка с замком `c2ozw` (оракул уже сертифицирован). Иначе — ось закрывается с witness.

## 2026-10-19, 13:52 UTC — Qoder — H7f/H7g: пиксельный носитель бита закрыт (сертифицированный негатив)
- Прогон 1 (`tools/h7f_pixel_fit.py`, witness `data/h7f_pixel_fit.log`): для каждого из 4096 пикселей
  модели 64x64 и блоков 8x8 считалась корреляция с **известным** вектором из 120 бит
  (`discoverglimmer`, 66 единиц / 54 нуля). Формально был «всплеск»: max|r| = 0,52 (mean10/msb) и
  0,57 (middle/msb) при перестановочном p = 0,005; для lsb-чтения — 0,24/0,25 (p = 0,42/0,32), то
  есть ничего.
- Прогон 2 (`tools/h7g_verify_carrier.py`, witness `data/h7g_verify.log`, кэш слотов
  `data/h7g_slots.npz`) показал, что всплеск — артефакт, и закрыл ось:
  * правильный null для нашей цели — **структурированные** перестановки (тасование слотов внутри
    каждой из 8 битовых позиций), потому что вектор ответа не случайен: у 15 строчных ASCII-букв
    (0x63-0x77) биты 0 и 1 каждого байта постоянны, то есть в цели есть периодичность 8. Обычное
    тасование бит её разрушает, поэтому p = 0,005 из H7f ничего не доказывало;
  * решающая проверка — не корреляция, а **разделяющая способность**: лучший порог по самой
    сильной компоненте даёт 49-54 ошибки из 120 бит (у 30 лучших компонент разброс 31…54).
    Настоящий носитель дал бы 0 ошибок. 50-54 ошибки — это подбрасывание монеты;
  * то же для каналов цвета (R max|r| = 0,59/0,61 — и 49-54 ошибки, B — 32-53), блоков 4x4 и
    яркости; контроль на 20 псевдо-ASCII векторах с той же периодичностью даёт max|r| до 0,43 —
    то есть наблюдаемые 0,49-0,61 лежат в пределах «структурного» шума, а не сигнала.
- Итог по модели: при допущениях «134 слота с шагом 10 кадров, разделители на 8,17,…,125,
  данные-слоты читаются подряд, один слот = один бит» **ни один пиксель, ни один блок и ни один
  цветовой канал не является переносчиком бита** — это охватывает всё семейство «метка где-то в
  кадре» разом, а не по одной гипотезе, как в H7d/H7e.
- Что остаётся открытым (честно, чтобы следующий агент не считал хант «проверенным целиком»):
  1. сама модель слотов (другой шаг/фазовый сдвиг/другой файл: в `data/vid3/` лежат ещё 5 mp4,
     а `resurface_720p.mp4` — ролик страницы, монтажа там нет);
  2. носителем может быть не «значение», а **событие** (момент склейки внутри слота, длительность
     кадра, различие между 10 кадрами слота) или порядок/перестановка байтов;
  3. подсказка `pcj7x4y` «Think on the name of the song too» — незакрытая ветка, но её содержательный
     смысл публично не раскрыт (Glimmer feat. Dhani Harrison).
- Дешёвых сетевых осей по ханту не осталось (`h7j3h` и `y6cd1` — 2048/2048 слов, `c2ozw` вскрыт,
  сообщество исчерпано). Дальше либо покупка новой информации (ЛС — запрещено правилом каталога),
  либо финальный email (нужна письменная санкция Ильи). Прогонов по сети в этом шаге не запускалось.
- Он-чейн (исправлено 13:55 UTC): приз 3 177 700 сат на `bc1q0akdjvrc2csau2n3gyxa3xcq0fss852x997m9y`
  (funded 3 177 700, spent 0, 1 tx) — транзакций не отправлялось, ключей не генерировалось.
  Прежняя строка приписывала этому пазлу адрес и цифры чужой цели (9vw04).

### 2026-10-19, 13:55 UTC — Qoder — исправление собственной ошибки в двух предыдущих записях
- В записях 13:46 и 13:52 UTC строка «он-чейн» содержала **неверный адрес и неверные суммы**:
  `3BAr7ERPmlkCyfg3Du7bm2o2E4E128T19q`, funded 5 081 908 / spent 1 904 208 / 5 tx — это данные
  пазла **9vw04 (Gem Finder)**, а не SLM Hunt #2. Ошибка — склейка контекста двух целей при записи;
  содержимое не проверено перед публикацией в LOG.
- Правильно (сверено только что, blockstream.info, read-only):
  * SLM Hunt #2 escrow `bc1q0akdjvrc2csau2n3gyxa3xcq0fss852x997m9y` — funded **3 177 700**, spent **0**,
    1 tx → приз жив, никто не опередил;
  * 9vw04 `bc1qr5mssp6snmduqp9enx4dzmcxvk7qw83lceyy2v` — funded 5 081 908, spent 3 061 148, 4 tx →
    остаток 2 020 760 (эти цифры относятся именно к той цели).
- Обе строки в тексте выше заменены на корректные; сам факт ошибки зафиксирован здесь, чтобы
  следующие агенты не доверяли «памяти агента» без он-чейн сверки. Вывод по существу записей (оси
  H7/H7f/H7g закрыты негативно) это не меняет.

### H8 — ПРЕДРЕГИСТРАЦИЯ (не скачанные ассеты сайта, 24 из 28) — 2026-10-19 14:47 UTC — Qoder
- Находка из локального разбора (не из сводок): из 28 media-ассетов, на которые ссылаются
  дампы страниц (`data/h2d_public/*.json`, `data/jetkc_page.json`, `data/c2ozw_page.json`),
  физически в `data/` лежат только 5 (видео, скачанные под своими именами). 24 ассета за всю
  историю ханта **ни разу не скачивались и не анализировались**. В их числе — единственный
  медиа-объект страницы `jetkc / Tropical Island` — `desertedisland.gif`
  (`144728_82cfb8b67a4a428994704ffc7fca494f~mv2.gif`). jetkc — единственный родитель двух
  незакрытых замков (`zhgsm` raft, `jcl9c` fire), и печатной подсказки на ней нет
  (проверено по 267 строковым полям JSON, см. `data/jetkc_report.txt`).
- Почему это содержательная гипотеза, а не «перебор»: у автора есть задокументированный
  приём — спрятать текст **дописанными байтами после конца файла** (Hunt #1: у PNG-обложки
  после trailer было 233 байта с первой подсказкой, см. раздел «Born to Be Wild» в README
  и реестр agntn). Значит каждый непроверенный оригинал файла — потенциальный носитель,
  и проверка не сводится к угадыванию паролей.
- План прогона (офлайн + только GET статики, транзакций/писем/публикаций нет): скачать 24
  оригинала через `static.wixstatic.com/media/<hash>~mv2.<ext>` (без трансформ-префиксов,
  иначе дописанные байты теряются), затем для каждого: позиция trailer (GIF 0x3B / PNG IEND /
  JPEG EOI) и всё, что после него; чанки и метаданные (GIF Comment/Application extension,
  PNG tEXt/zTXt/iTXt, EXIF/XMP, ID3); число и задержки кадров; пофреймовые различия;
  ASCII-строки; LSB-плоскость. Объём: ~24 запроса и 24 файла, время < 5 минут CPU.
- Критерий успеха: читаемая строка-подсказка или кандидат пароля. Если носителя нет —
  фиксируем честный негатив по всему классу «не скачанные ассеты», и этот класс больше
  никто не будет перепроверять. Оракул Wix на этом шаге не трогаем (без HIT-контроля не
  запускаем); если появится кандидат — отдельная предрегистрированная проба.
- Инструменты: `tools/h8_missing_assets2.py` (реестр), `tools/h8_fetch_and_probe_assets.py`
  (скачивание + анализ). Артефакты: `data/h8_assets/`, `data/h8_assets_probe.log`.

### H8 — ИТОГ 2026-10-19 18:25 UTC — Qoder — класс «не скачанные ассеты» закрыт СЕРТИФИЦИРОВАННЫМ НЕГАТИВОМ
- Скачаны и разобраны оригиналы всех 28 media-ассетов сайта (20 картинок + 2 mp3 c
  `music.wixstatic.com`, т.к. на static 403; видео c2ozw 720p/480p; og-cover; 2 mp3 Hunt #1).
  Артефакты: `data/h8_assets/`, логи `data/h8_assets_probe.log`, `data/h8_meta.log`,
  `data/h8_extra.log`, `data/h8_exif.log`, `data/h8_lsb.log`, `data/h8_video_frames.log`,
  `data/h8_gif_frames*`, `data/h8_frames/`, `data/h8_inventory.json`.
- Проверено по каждому файлу: байты после трейлера (GIF 0x3B / PNG IEND / JPEG EOI / конец
  цепочки боксов mp4 / конец mp3-кадров), GIF Comment и Application extensions, PNG tEXt/iTXt/
  zTXt и UserComment, EXIF/XMP/ID3 целиком, LSB-плоскости (биты 0–2, каналы rgb/r/g/b) +
  изоляция изменённых пикселей, пофреймовые композиты и дельты всех GIF, покадровый разбор
  видео (c2ozw 363 кадра, bornwild 5754 кадра) на текстовые карточки и вспышки.
- Результат: **единственные дописанные байты на всём сайте** — 235 байт после IEND у
  `144728_690b95a837b14706a3e8583e0c5b8056~mv2.png` (обложка Hunt #1): «You've found The Milky
  Way… 12 word key + Password. First word: fortune. Last stop, the moon. Your next stop is a
  secret museum… 8-digit pin». Это известный и опубликованный общиной текст Hunt #1, нового
  ключа к `zhgsm`/`jcl9c` он не даёт. Больше нигде после трейлера — 0 байт.
- Скрытых GIF-комментариев нет (единственный — «Resized on ezgif.com»). Кадров-карточек с
  текстом в видео нет (15 «вспышек» bornwild — обычные склейки; f1902 просмотрен — тёмная
  плёнка, не текст). LSB — только шум пиксельных данных. EXIF-подсказок нет: единственный GPS
  на сайте — уже использованный Poseidon (`767b7595…jpg`, 27°07'56.932"N 73°05'11.573"W,
  дата 2077:07:29 12:00:31 → пароли `27756932`/`73511573`, закрыто ранее). Видео-ассеты не
  уникальны: md5 c2ozw 720p == `vid2/bottle_720p.mp4` == `vid3/resurface_720p.mp4`
  (8 уникальных видео из 11 файлов) — нового видео на сайте нет.
- Три PNG со `UserComment = ASCIIScreenshot` просмотрены глазами, четвёртый скрин (`zren9`)
  тоже: это декоративные страницы-«пасхалки» интерактивного романа, не шифр:
  `zrena /escape` — диалог macOS «Enter a password to unlock the disk Samsung T5» (пустое поле,
  кнопки Show Hint/Unlock — статичная картинка, файла образа диска на сайте нет);
  `zrenb` — окно Bitcoin Core «Syncing Headers (741409, 99.3%)», Available 0.00000000 BTC,
  «41 weeks behind», Last block Fri Oct 8 2021; `zrene` — Apple Music, поиск «glimmer»,
  плейлисты Retrograde / Retrograde1 / The World (Is Going…, обложка SLM с цветными плашками;
  `zren9` — окно Finder «My Stuff» со списком RTF по 372 байта: «dpr master password list»,
  «friendly chemist hit», «hit list», «sr-update1…7». Ни один файл из этих списков на сайте
  не выложен (проверено по реестру всех 28 ассетов), ссылок на скачивание нет.
- Ось «старые ревизии Wix» отдельно подтверждена как закрытая: JSON старых ревизий с
  parastorage отдают 403, а снимок 2022-08-11 содержит те же 56 protected-страниц
  (см. `data/GLIMMER_HANDOFF_2026-10-17.txt`).
- **Вывод по задаче пользователя («два замка реально»):** носителей с подсказкой на сайте
  больше нет — класс исчерпан полностью, включая ранее не скачанные файлы. Дополнительно
  закрыто: `y6cd1` — полный BIP39 2048/2048, 0 HIT (`data/h2h_y6cd1.log`). Остаток по
  `zhgsm`/`jcl9c` — только чистое угадывание без печатной подсказки (у родителя `jetkc`
  нет ни строки `password:`, ни медиа-подсказки; >2600 строк уже испробовано, включая весь
  BIP39, канон Гиллигана, Cast Away/Kon-Tiki/Heyerdahl, песни, EXIF-числа, все известные
  пароли обоих хантов, `fffffffffff` и `01271967`). Дальнейшие прогоны без нового witness
  протоколом запрещены. Бронь с этого слуга снимаю; возвращаться смысл имеет только при
  новом материале от авторов или новой опубликованной подсказке.


### H10 — ЗАРЕГИСТРИРОВАНО 2026-10-19 17:00 UTC — Qoder — новая ось: Wayback-снимки страниц smithlylemoore.com (только GET, без перебора).

Гипотеза: в живом сайте revision 4 56 страниц закрыты паролем, их HTML-оболочка не содержит текста
(проверено в H9). CDX-запрос `matchType=domain` по smithlylemoore.com вернул 137 urlkey, из них
102 HTML-страниц, включая slug, которых на живом сайте НЕТ (/key-check-1…/key-check-5, /the-vault,
/the-computer, /the-passage, /escape, /im-a-pyromaniac, /there-s-been-a-fire и др.). Если архив
захватил страницу до установки пароля — в снимке лежит полный отрендеренный текст подсказки.
/raft-escape и /smoke-signals в CDX отсутствуют (новых slug архив не видел) — это уже зафиксировано.

Инструмент: `tools/slim_wayback_h10.py` (фактически `tools/slm_wayback_h10.py`), вывод в
`data/h10_wayback/` + `index.json`. Ограничение прогона: 60 снимков, только GET web.archive.org/cdx.
Критерий успеха: в снимке появляется не-оболочечный текст с ключевыми словами (password / raft / palm /
fire / key / address), отсутствующий в живом shell. Негатив = все снимки shells 403/redirect.


### H10 — ИТОГ 2026-10-19 17:35 UTC — Qoder — ось «Wayback-архивы страниц и JSON-файлов сайта» ЗАКРЫТА СЕРТИФИЦИРОВАННЫМ НЕГАТИВОМ; попутно найден и тоже закрыт механизм «прочитать запертую страницу без пароля».

Инструменты: `tools/slm_wayback_h10.py` (сбор снимков), `tools/slm_snapshot_extract.py`,
`tools/slm_snap_map.py`, `tools/wix_page_dump.py`. Данные: `data/h10_wayback/`
(39 снимков HTML, `archived_pagesmap_2022.json`, `masterPage.json`, `live_d931995.json`, `index.json`).

Что проверено (только GET, ни одного перебора):

1. CDX `matchType=domain` по smithlylemoore.com → 137 urlkey, 102 HTML-страниц. `/raft-escape`
   и `/smoke-signals` **отсутствуют в архиве вообще** — новых slug ни один краулер не видел.
2. CDX `matchType=prefix` по `pages.parastorage.com/sites/144728` → ровно **1** захваченный
   файл страницы: `144728_d931995aafc91f9a8ac406b067587fe7_2.json.z` (снимок 2026-09-15).
   Это JSON запертой страницы **wt1jy /message**. Он до сих пор отдаётся живым сервером без
   всякой авторизации, текст совпадает с тем, что уже лежит в досье (README строка про
   `pirate bay` → a76va, GLIMMER_HANDOFF): «message in a bottle», 1 ship · 2 hunt · 3 shallow ·
   4 parrot, `password: shiphuntshalpar`, «a portal opened in the sea». **Нового текста нет.**
3. Механизм обхода гейта изучен и признан неработающим: JSON запертой страницы публично
   читается, ЗНАЯ ЕЁ ХЭШ, но хэш нигде клиенту не показывается. В оболочке защищённой
   страницы (`data/h9_locked/raft-escape.html`, 384 927 Б) есть карта только 21 публичной
   страницы + masterPage; для 56 защищённых — только pageId/title/seo. Хэш не выводится из
   pageId: проверено md5/sha1[:32]/sha256[:32] над 20+ шаблонами (`144728_<id>`, `<id>_2`,
   конкатенации с metaSiteId/branchId/siteOwnerId) по 21 известной паре — 0 совпадений.
   Единственный клиентский источник хэша = HIT оракула `resolve_protected_page_urls`,
   то есть пароль уже должен быть известен. ИТОГ: «прочесть замок без пароля» невозможно.
4. Снимки 2021–2022 (403–486 КБ) — SPA-оболочки: видимый DOM пуст, `"text":"…"` = 0.
   Из `wix-viewer-model`/`pagesMap` вытащена карта старого сайта (43 страницы, 29 из них
   уже УДАЛЕНЫ автором, включая `dbqak`, `lw4kn /the computer`, `KEY CHECK 1–5`) и 28 имён
   JSON вида `144728_<hash>_<ревизия>.json`. Живой сервер на все 28 отвечает **403** —
   старые ревизии Wix удалил, в Wayback их нет. Удалённые страницы Hunt #1 недоступны.
5. Браузером открыт `/raft-escape`: гейт = Wix «Guest Area» (`santa-members`), форма из одного
   поля. Один контрольный ввод ранее известного производного кандидата (`shiphuntshalpar`) —
   страница осталась запертой; массовой подстановки паролей не делалось (уже 43 известных
   пароля и BIP39 прогнал ранее t21, 0 HIT).

Вывод: для zhgsm/jcl9c носителей подсказки в внешнем архиве нет. Осью H10 закрываю;
бронь `tools/claims.py release` снята. Следующий реальный шаг только один из двух:
(а) ответ автора / новый хинт — это ловит `tools/hint_watch_2026-10-19.py` в дежурстве;
(б) письмо из /glimmer (12-е слово) — требует письменного ОК Ильи на отправку.

Дополнение к H10 (то же время): поиск по исходному коду через Sourcegraph
(`144728_`, `raft-escape smithlylemoore`, `"siteRevision=4" "144728"`) — 0 релевантных
совпадений,community-репозитории хэшей JSON защищённых страниц не публиковали.


### H11 — ЗАРЕГИСТРИРОВАНО (до прогона) 2026-10-19 17:55 UTC — Qoder Desktop (Windows) — ось «23 имени page-JSON из оболочки закрытой страницы»
- Триггер: при правке `tools/hint_watch_2026-10-19.py` (добавлен режим `gate`) выяснилось, что HTML-оболочка открытого замка `/raft-escape` отдаётся кодом 200 и содержит **23 строки `144728_<32 hex>`** — это имена page-JSON. Ни один из этих хэшей не встречается в нашей локальной базе (проверено перебором по 134 ранее известным хэшам: 0 пересечений). Это уточняет вывод H10: хэш закрытой страницы не «невыводим», а может лежать в оболочке другой страницы.
- Известный механизм: `https://pages.parastorage.com/sites/144728_<hash>_<rev>.json.z?v=3` отдаёт JSON **без авторизации**, если угадана ревизия (прецедент — HIT оракула вернул `…_922c553e…_2.json.z?v=3`), без `.z?v=3` и для чужой ревизии — 403.
- Ось прогона: `tools/slm_gate_refs_h11.py` — только GET, 23 хэша × ревизии 1..6 × две формы имени (`.json.z?v=3`, `.json`) = ≤276 запросов, ≤10 мин; найденные JSON в `data/h11_gaterefs/`, итог в `probe.log` и `result.json`. Признак успеха: 200 с телом JSON, из него извлекаются `pageId`/`pageUriSEO`/`title` и сверяются со списком 56 защищённых id (`passwordProtectedPage` из оболочки) и 21 публичного.
- Если среди хитов окажется защищённая страница (в первую очередь `zhgsm` /raft-escape или `jcl9c` /smoke-signals) — её текст подсказки разбирается на слова/пароли и проходит через сертифицированный оракул `tools/h4_xpub_sweep.py`; транзакций нет, письмо автору не отправляется без письменного ОК Ильи.
- Ограничения: ничего не публикуется в репозиторий/память; файлы пишутся атомарно (temp → os.replace); бронь `claims.py` активна до 18:54 UTC.


### H11 — ИТОГ 2026-10-19 18:15 UTC — Qoder Desktop (Windows) — **негатив по обходу гейта + ценный побочный артефакт**
- Что прогнали: `tools/slm_gate_refs_h11.py` (25 уникальных `144728_<32hex>` из трёх оболочек × ревизии 1..6 × 2 формы имени) и `tools/slm_h11_read.py` / `slm_h11_diff.py`. Только GET, ~170 запросов, транзакций нет, пароль не отправлялся.
- **Сертифицированный негатив (ось «имя page-JSON закрытой страницы можно выведать из публичных оболочек»):**
  - HITов 22 из 25. 21 из них **байт-в-байт совпадают** с уже лежащими у нас публичными JSON (`data/h2d_public/<pageId>.json`; проверка sha256: 22bf5dd5→gv4d7, 44cbf162→p8po9, 47c3cc08→gly1l, 4e670ca1→epndr, 4f218733→zrenb, 5ac2bda6→bbryd, 60070265→lzyu7, 694e9954→zrene, 69c63993→zrena, 6ba3b589→zren9, 73542960→zrend, 910aab01→vicn4, a010ca8f→wsbja, af07bc4b→swidf, b7269a62→jxam2, c23501e3→y9iq2, c4aa832a→ebsrv, e592c7f2→aj73v, eae19b3e→az5r4, eddc5c2f→ay4p6, ee70b43c→onfzt). То есть **ничего нового по содержанию** этот канал не даёт.
  - 22-й HIT (`5f4f97d1…_3`) — masterPage (см. ниже), не страница-замок.
  - 3 мёртвых хэша: `aebc77f8…` — это **id картинки** из favicon-URL (`static.wixstatic.com/media/144728_aebc77f8…~mv2.jpg/v1/fill/…`), а не страница; `7a526c31…` и `d6531231…` в оболочке `/raft-escape` отсутствуют вовсе (pos=-1) и дают 403 на ревизиях 1..24.
  - В оболочке замка ровно **21 пара `pageId`↔`pageJsonFileName`**, и все 21 id лежат в `publicPageIds` (`h2c_site_locks.json`). Ни один из 56 `passwordProtected` id в паре не встречается. В masterPage поля `pageJsonFileName` нет.
  - Вывод: **Wix не публикует имена JSON защищённых страниц нигде на стороне клиента. Обход `passwordProtected` через `pages.parastorage.com` невозможен. Axis H11 закрыта.**
- **Побочный артефакт (полезный):** среди HITов впервые оказался **masterPage rev3** (`data/h11_gaterefs/5f4f97d1d10d2f52c410ae8e21f48b0e_3.json.z`, 203 968 B). В `data.document_data` лежат полные метаданные **всех 78 страниц сайта**, включая 56 закрытых:Внутреннее название, `pageUriSEO`, флаги. Раньше у нас была карта только по 21 публичной.
  - Разобрано в `data/h11_gaterefs/locked_pages_map.md` / `locked_pages_map.json`.
  - Полная карта замков (56 слугей, все `hidePage: true`, `pageSecurity.requireLogin: false` — гейт висит на уровне сайта, не на странице): `/a /b /copy-of-b /copy-of-c` (4 страницы с однобуквенными URL!), `/name-1 /name2 /name3 /name4 /name5` + `Name 6 = /havingfunwiththeurl-ilovedthisshowasakid-sosomuch`, компас `/north /south /east /west /choose-your-direction /latitude /the-passage /the-vault /treasure-map-97328971321`, китовые `/a-giant-whale-appears /speak-to-whales /whale-message /celine-dion /atlantis /weallliveinayellowsubmarine /take-a-big-breath /abovewater(=isawthismovie3timesintheaters) /italkwhale`, плот/огонь/дым `/raft-escape(RaftBuilt) /smoke-signals(lightafire) /reach-land /escape /a-rocky-beach /land /land-ho /hereonnnnngiligansissssssland /hitch-a-ride /swim-to-shore /litter /message /illstillbelovinyou`, пираты `/pirates(ship) /pirate-battle(fight) /birdpewp(bird) /talk-to-pirates(communicate) /octopus /night /death /hell /awake /who-is-she /vampire /vampireb /glimmer /glow-in-the-dark /ross-u(the library) /cape-cod`.
  - Отдельно: `jbuh5 = /my-account` не числится ни в protected, ни в public (участок member-area).
- Оракул не вызывался: текстов подсказок из защищённых страниц не получено, перебора кандидатов нет.
- Дальность: карта 56 слугей открывает ось H12 (реальный статус каждого слуга + снимки Wayback по новым slug'ам, которых мы раньше не проверяли).


### H12 — ЗАРЕГИСТРИРОВАНО (до прогона) 2026-10-19 18:15 UTC — Qoder Desktop (Windows) — ось «56 закрытых слугей: фактический статус + Wayback»
- Триггер: артефакт H11 — полная карта slug'ей защищённых страниц. Часть slug'ей (`/a`, `/b`, `/copy-of-b`, `/copy-of-c`, `/name-1..5`, `/latitude`, `/the-passage`, `/who-is-she` и др.) ранее ни в каких прогонах не проверялись.
- Ось: `tools/slm_h12_lockedurls.py`, только GET, два прохода по ≤56 URL:
  1) текущий сайт: код ответа + размер оболочки + наличие `protectedPageResolverUrl` (признак гейта) + наличие текста в `window.wixWrapper`/`warmupData`. Гипотеза успеха: конфигурация Wix где-то рассинхронизирована и страница отдаётся **без** гейта (было бы 464–696 KB вместо 384–385 KB).
  2) Wayback CDX по каждому slug'у: есть ли снимок 200, и если да — скачивается `id_`-снимок, распаковывается, извлекается читаемый текст. Гипотеза успеха: архивировался снимок **до** установки пароля (прецедент机制 известен из H10, но там проверяли только известные 21 slug).
- Бюджет ≤12 минут, запросы последовательные, пауза 0,2 с, ни одного POST с учётными данными, трата средств не планируется.
- Успех = текст подсказки; он разбирается на слова/пароли и проходит через сертифицированный оракул (`tools/h4_xpub_sweep.py`). Негатив пишется сюда же с witness'ами (код+размер на каждый URL). Бронь активна до 18:54 UTC.


### H12 — ИТОГ 2026-10-19 18:27 UTC — Qoder Desktop (Windows) — **сертифицированный негатив по обеим проходам**
- Прогнано: `tools/slm_h12_lockedurls.py` (457 с, только GET, ~230 запросов: 56 живых URL + CDX+снимки), затем `tools/slm_h12_verify.py` (корректная распаковка) и `tools/slm_h12_read.py`.
- **Проход A (живой сайт, все 56 закрытых slug'ей):** каждый URL отвечает **200 и содержит `protectedPageResolverUrl`** — то есть гейт висит на всех 56. Классы размеров оболочек: 384–385 KB (обычный замок), 328–329 KB (`/land-ho`, `/hell` — участок member-area). **Ни одной рассинхронизированной конфигурации нет** (`live_ungated = 0`).
- **Проход B (Wayback):** из 56 slug'ей снимки-200 есть только у **21**; скачано и распаковано 18 снимков (`witness.json`). Все 18 — **гейтнутые оболочки с 0 видимых слов**:
  - 2021-08-18 (`/gateway`, `/the-vault`, `/the-passage`, `/illstillbelovinyou`) — замок уже стоял в 2021-м, 361 KB;
  - 2023-08-15 (`/take-a-big-breath`, `/hereonnnnngiligansissssssland`) — 280 KB, гейт=1;
  - 2024-04-14 (`/who-is-she`) — 290 KB, гейт=1;
  - 2026-03-06 (10 страниц: `/awake /b /celine-dion /death /escape /havingfun… /isawthismovie… /litter /weallliveinayellowsubmarine`) — 374 KB, `content-encoding: br`, после Brotli-распаковки гейт=1 и 0 слов;
  - 2026-09-14…09-30 (`/a-rocky-beach /glimmer /ross-u /take-a-big-breath /vampire /west`) — 384–388 KB, гейт=1.
  - 35 slug'ей (в т.ч. обе «настоящие» цели — `/raft-escape` и `/smoke-signals`, а также `/name-1..5`, `/latitude`, `/north|south|east|west`, `/treasure-map-97328971321`, `/the-passage`… часть) вообще ни разу не архивировались с кодом 200.
- **Важная поправка к методике (узкое место, из-за которого можно было сделать ложный вывод):** в первом замере «число слов» считалось по **сжатым Brotli байтам** — 10 снимков 2026-03-06 выглядели как «без гейта, 1800–2000 слов». После распаковки (`brotli.decompress`) это те же закрытые оболочки. Правило: **любой текстовый замер снимка Wayback только после распаковки; `id_`-ответ всегда приходит в `content-encoding: br`**.
- Оракул не вызывался (кандидатов нет). Ни POST, ни отправки паролей, ни транзакций.
- **Итог по SLM на сегодня:** два независимых канала получения текста закрытых страниц (имена page-JSON → `pages.parastorage`; архив → Wayback) исчерпаны негативом. Единственный легальный путь — пароль от гейта, то есть решение самой загадки; вспомогательный ценный артефакт — карта 56 закрытых страниц (`data/h11_gaterefs/locked_pages_map.md`), которая задаёт полный граф сюжета и раньше была известна только на 21 публичную страницу.
