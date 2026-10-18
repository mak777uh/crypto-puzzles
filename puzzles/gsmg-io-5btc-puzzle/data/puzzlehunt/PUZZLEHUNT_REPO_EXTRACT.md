# GSMG.IO 5 BTC — извлечение из репозитория сообщества `puzzlehunt/gsmgio-5btc-puzzle`

_Сгенерировано 2026-10-18 агентом Big Pickle (big-pickle / OpenCode, Windows) в рамках обогащения пазла GSMG. Публичная выгрузка GitHub API, без аутентификации._

## 0. Что это

Полный разбор публичного репозитория сообщества **`puzzlehunt/gsmgio-5btc-puzzle`**
(README + все 112 issue + 609 комментариев + все картинки), плюс внешние ссылки,
на которые он опирается. Сырьё лежит рядом: `GITHUB_DIGEST.md` (~907 КБ, тела всех
issue и комментариев), `issue_comments.json`, `README.md`, `puzzle.png`,
`theseedisplanted.png`, `phase2.png`, `phase3.png`, `SalPhaselonCosmicDuality.png`,
`photo_2020-04-26_09-24-30.jpg`.

Дата выгрузки: 2026-10-18. Автор выгрузки: Big Pickle (big-pickle / OpenCode, Windows).

> Внимание: репозиторий сильно «замусорен» LLM-фейками и шумом (см. §7). Все
> «решения», которые не дают приватник к `1GSMG…`/`17ucy…`, мейнтейнер Naddiseo
> отметает. Реальный критерий успеха по Naddiseo: **иметь приватный ключ к
> `1GSMG1JC9wtdSwfwApgj2xcmJPAwx7prBe` и/или `17ucy1K9ZUAaoY6JVtM932W9jUp5LXfyHa`**.

## 1. Ключевые адреса (проверено в сети 2026-10-18)

| Адрес | Роль | H160 (hash160 от payload) | Баланс |
|---|---|---|---|
| `1GSMG1JC9wtdSwfwApgj2xcmJPAwx7prBe` | **Главный приз** | `a9553269572a317e39f0f518cb87c1a0ee1dbae4` | **1.25649674 BTC** |
| `17ucy1K9ZUAaoY6JVtM932W9jUp5LXfyHa` | Отрезанная (halving) половина приза; сообщество считает вторым целевым | `4bc468447fe1b048ad030a2f9a125478eabc4ed6` | 3.75055856 BTC |
| `1JK27jtvE1wS4VG9k7Zpo8wBufMbYwy3r8` | Адрес пожертвований из README | — | — |
| `1JG648yaB7Wp2dpUfcZoRSD4q35oq47vCu` | «**Half**» (из VIC-сообщения «PRIVATE KEYS BELONG TO HALF AND BETTER HALF») | `bd5498c1234b66dd9a68565783c01df38197496b` | 0 (105 tx, всё потрачено) |
| `145ZQ9siLrsXBKf465wjdyQYAP5dRwhRhQ` | «**Better Half**» | `21c51630aacc0673203b061b8676bfacc6757033` | 0 (105 tx, всё потрачено) |
| `1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa` | Сатоши (генезис) — упоминается в #33 как «награда за суверенитет» | — | — |
| `17HtPrTzt6q5hdmvHxYVWc1W4dhWRkVWYV` | адрес юзера `kaibuzz0`, который требовал «выплаты» (#33-#40) | — | шум |
| `1NULY7DhzuNvSDtPkFzNo6oRTZQWBqXNE9` | «третья дверь» **из нашего досье** — в puzzlehunt-issues НЕ упоминается | `eb862e37998c1d077a6c0b46330bccb5f73427aa` | — |

Ванити-адреса `1GSM…` (десятки, напр. `1GSMG1SPVVWc2xXnWuNb88WJURtyEYFHDw`,
`1GSMG1JC9Y9SoWJVDdQzMD96K4t9SHkN3`): это адреса, которые участники *нагенерировали
перебором*, пытаясь «угадать» вид адреса приза; к загадке отношения не имеют.

## 2. Пять «зацепок-дверей» и что из них решено

Документированный проход сообщества (README + issues):

1. `gsmg.io/puzzle` → **решено**: 14×14, чёрный/синий = 1, жёлтый/белый = 0;
   спираль CCW от (0,0) вниз → `gsmg.io/theseedisplanted`.
2. `theseedisplanted` → скрытая POST-форма → пароль
   `theflowerblossomsthroughwhatseemstobeaconcretesurface`.
3. `choiceisanillusion…` (Matrix Reloaded) → пароль `causality`;
   openssl AES-256-CBC, SHA256-пароль.
4. Phase 3 (7 частей: causality/Safenet/Luna/HSM/11110/genesis-hex/FEN) → SHA256 →
   phase3.txt; затем Phase 3.2 (jacquefresco+giveitjustonesecond+heisenberg…) →
   Архитектор-речь + **Beaufort** (ключ `THEMATRIXHASYOU`) + **VIC** (алфавит
   `FUBCDORA.LETHINGKYMVPS/JQZXW`, цифры 1,4) →
   `INCASEYOUMANAGETOCRACKTHISTHEPRIVATEKEYSBELONGTOHALFANDBETTERHALFANDTHEYALSONEEDFUNDSTOLIVE`.
5. **SalPhaseIon / Cosmic Duality (не закрыто)**: `abba`-блоки → `matrixsumlist`,
   `enter`; a1z26+base16 → `lastwordsbeforearchichoice`, `thispassword`;
   `shabef`=sha256; `shabefanstoo`=secondanswer; 7 паролей → XOR → ключ
   `a795de117e472590e572dc193130c763e3fb555ee5db9d34494e156152e50735` (EVP-MD5)
   → `cosmic_decrypted.bin` 1327 B (sha256 `4f7a1e4e…`).

## 3. Свежие технические находки 2026 (самое ценное)

- **#111 (0xyph3r, 05.09.2026)** — единственный, кто даёт *проверяемые* формулы:
  - Phase 0: 24 цветные клетки (15 синих, 9 жёлтых) — это ровно позиции с
    индексом спирали ≡ 5 (mod 8) (при их спирали; у нас те же клетки ≡ 7 mod 8 →
    т.е. последний бит каждого из 24 байт URL). 20 000 случайных 24-подмножеств
    из 196 ни разу не дали такого совпадения.
  - Ровно **одна** off-white клетка RGB **(254,254,254)** в (строка 7, столбец 4);
    при их спирали индекс 177. Подтверждает issue **#14** («кролик смотрит на неё»).
  - `FH (First Half, 16 B) = gros[0::4][:16] XOR gros[1145:1161] = 8048c428a6faf6d3df77db13ca68766d`
    — со слов автора «verified against H160».
  - `BetterHalf = Reduction(SOURCE_4) XOR gros[1161:1177]`, где
    `gros[1161:1177] = 3be6ecf1d5c126e50f25ded3bc8fb6d9`,
    `SOURCE_4 (48 B) = 42f5f4b7cbf78cf078a24a6ca7179b462eac13504c9791c8f1192ef8a7a352a4ef756397ea74234a97a95f01ae37f8c9`
    (base64 `QvX0t8v3jPB4okpspxebRi6sE1BMl5HI8Rku+KejUqTvdWOX6nQjSpepXwGuN/jJ` — это
    «малый blob» со страницы SalPhaseIon). `Reduction: 48 B → 16 B` **неизвестен**.
  - Внутренний blob: `phase32_aes.bin` 96 B, salt `b45a5e3d827593ca`, sha256 префикс
    `291dfd6f…`; подсказка «Raising the stakes without extra chances of winning.
    A fubcd-king & oracle-queen, thingky mvps, on a sad board but as wide as the
    first one seen.» — **фраза «without extra chances of winning» не разгадана**.
  - Промежуточно решённый блок: `TESTHISTHEENTERISINNERHEARESHATHENIRARERESTTHEY`.
  - H160-цель, к которой он привязывается: `a9553269572a317e39f0f518cb87c1a0ee1dbae4`.
    **ПРОВЕРЕНО НАМИ: это в точности hash160 адреса приза `1GSMG1JC9…`.** То есть
    конструкция «половин» нацелена на публичный ключ приза напрямую.
- **#103 (ZetaReticulus, 20.08.2026)** — хвостовые 4 байта цепочки Cosmic Duality
  `fc0c1b02` как signed → `-4,12,27,2` → закрывают таблицу Phase-2:
  `-4, 2, 32, 12, 4, 27, 0, 2, -16, 15`. Naddiseo: «гипотеза, не solved».
- **#106 (eliooooooot, 22.08.2026)** — важные уточнения:
  - `oracle.py` из `floflo777/open-crypto-puzzles` использует **EVP-MD5**, но все
    *решённые* blob'ы цепочки идут на **EVP-SHA256** (openssl ≥1.1.0) → все его
    свипы (в т.ч. 116 043 кандидата) структурно некорректны. **Исключение —
    Cosmic Duality**: он действительно на EVP-MD5 с raw-digest паролем.
  - Заявленные «открытые» суммы сетки: строки `610876654997879`, столбцы
    `8108108736759668` (к «matrixsumlist»).
- **#108 (mrmint195-sudo, 27.08.2026)** — «малый blob содержит 2 опечатки»:
  pos 18 `R→J`, pos 51 `k→s`; после правки salt `3ab585348552415d`, пароль
  `matrixsumlistenterlastwordsbeforearchichoice…` → 79 B (K_C1/K_C2/E_C).
  **Naddiseo возражает**: правка «почти случайных данных» создаёт слишком большую
  область поиска и противоречит словам создателя, что оставшиеся шаги проще.
  ⚠️ У нас в `naddiseo-fork` этот малый blob уже расшифровывается (в базовой
  обрезке), т.е. для нас это не «новое».
- **#88 (zemnovodnuy / GalloClaudio64, 29.03.2026)** — «стена»: Cosmic Duality
  расшифровывается чисто, дальше «треугольник, а именно **XOR triangle**».
- **#112/#113 (Mohamed-nsr, 01.10.2026, араб.)** — спорные заявления:
  «**Bifid**-цепочка даёт `BTCSEED`, sha256 `15d62c82…` — точное совпадение»;
  «цветная сетка даёт **484 и 479**; минус 5 — балансируются; позиция 479 в речи
  Архитектора = „take the private key you've earned“»; «спираль в ноутбуке
  сообщества — left→bottom→right→top, а не геометрическая».
- **#115 (akaVARU, 09.10.2026)** — из блока `FAED570` (570 симв. a-i) получает
  строку `BYTENPHASE…` («BYTE N PHASE»), убрав начальные `FAE` и взяв D первым
  (Vigenère-subtraction с `THEPROBLEMIS`). Naddiseo считает это совпадениями.
- **#114 (windstalker-arch, 08.10.2026)** — разыскивается полный экспорт Telegram:
  группа **«GSMG Puzzle Solvers»**, id `1166734859`, экспорт `ChatExport_2026-07-26`,
  ~**57 729 сообщений** за 2019-04-20…2026-07-26; последнее сообщение создателя —
  id ~66976. Локально у автора доступ обрывается на id 63966 (2026-05-28).
  **Это и есть «непубличный корпус сообщений создателя».**
- **#99 (rings33, 17.07.2026)** — «Half» = `1JG648yaB7Wp2dpUfcZoRSD4q35oq47vCu`,
  «Better Half» = `145ZQ9siLrsXBKf465wjdyQYAP5dRwhRhQ`; пайплайн до Phase 4 есть,
  блок на извлечении адреса из `cosmic_decrypted.bin`.
- **#84 (a11yot, 02.03.2026)** — «chain4.bin» 1168 B (48 B header + 35×32 B блоков),
  sha256 `a80a399af1221bd62538594141bee1064e1b071b547d60729f13c0224041a0f7`;
  вывод автора: технически нерешаемо. (Наш per-puzzle README уже знает про #111/#115/#116.)
- **#55 (jackdevs66, 23.08.2025)** — репозиторий `jackdevs66/GSMG5_CDuality`;
  наблюдение `1327 = 23×57 + 16`.

## 4. Подсказки создателя (Jrk Bgrt) — реестр

Создатель = **«Jrk Bgrt»**, присутствует в Telegram-группе «GSMG Puzzle Solvers»,
заходит «несколько раз в год», раздаёт подсказки. Хронология (локально уже
собрана в `naddiseo-fork/nadd_hints/` — 37 картинок 2020-01-14 … 2026-07-12):

- 2020-01-14 — «Roses are White but often Red. Yellow has a number and so does Blue.
  Go back to the first puzzle piece without further ado. It might have shown you only
  one door, beware that the rabbits nest may contain a whole lot more. Hush hush.»
- 2020-02-20 — Decentraland (координаты → аудио → спектрограмма `HASHTHETEXT`).
- 2021-12-25 — «prime numbers required», «some characters need to be zeroed out».
- 2021-12-02 — «another door».
- 2023-02-23 — бинарная подсказка (LSB-first, текст реверснут) → ингредиенты:
  *yellow, blue, primes, matrixsumlist, lastwordsbeforearchichoice, yinyang*;
  «пароль у вас перед глазами».
- 2023-08-06-3 — «once you hit a ying yang, solve it the same day».
- 2026-01-01 — новогодняя подсказка.
- 2026-07-12 — «The '5' btc was never the actual prize… only a tiny fraction».

OP_RETURN в сети: «**for ying yang thank you!**» и «**it myself 140 investment**»
(подтверждают «yinyang» и «140 investment»).

## 5. Внешние ссылки (ключевые)

- Репозиторий: `github.com/puzzlehunt/gsmgio-5btc-puzzle` (+ `issues`, `issues/69`, `issues/84`).
- Форк-ноутбуки Naddiseo: `github.com/Naddiseo/gsmgio-5btc-puzzle` (ветка
  `notebook-solutions` уже слита; локально — `naddiseo-fork/`).
- «Сертифицированный» чекер: `github.com/floflo777/open-crypto-puzzles` (`tools/oracle.py`).
- Solver-репозиторий: `github.com/jackdevs66/GSMG5_CDuality`.
- Reddit: `r/bitcoinpuzzles` — треды `dfwcqk` и `bf7siz`.
- BitcoinTalk: тема `5532424` (плюс `5529568`).
- Decentraland / аудио-спектрограмма (README).
- Инструменты из README: `openssl`, CyberChef (`gchq.github.io/CyberChef`),
  `dcode.fr/vic-cipher`, `ciphertools.co.uk/decode.php`, xorbin SHA256.
- Telegram: группа «GSMG Puzzle Solvers» (id `1166734859`) — экспорт недоступен публично.


## 6. Инвентарь выгруженного (sha256:16)

| файл | байт | sha256[:16] |
|---|---|---|
| `GITHUB_DIGEST.md` | 952213 | `b60c583b822644c1` |
| `README.md` | 28936 | `442270a145641d6f` |
| `SalPhaselonCosmicDuality.png` | 49970 | `a3810ba24250c5a0` |
| `issue_comments.json` | 1841665 | `debdfd2bade52ea7` |
| `phase2.png` | 56258 | `c5526b205cac47c5` |
| `phase3.png` | 127044 | `c8637fc3ff532dcd` |
| `photo_2020-04-26_09-24-30.jpg` | 90957 | `312dfc1898cb0a45` |
| `puzzle.png` | 29931 | `38125bbdf1ea58b9` |
| `theseedisplanted.png` | 8619 | `6230f079b0127877` |


## 7. Шум / фейки (чтобы не тратить время)

- #33-#40 (`kaibuzz0`): «загадка решена, заплатите» + адрес `17HtPrT…`. Сообщество
  помечает как ложь; сам содержит адрес Сатоши `1A1zP1eP…`.
- #15 (127 комментариев, «Solution»): длинная ветка с «найденными ключами» вида
  seed `'5550609 101 303 314 25121972'` → ванити-адрес `1GSMiiq65Qdy…` — это
  подгонка перебором, не решение.
- #17 (заголовок — сам base64-блок `U2FsdGVkX186tYU0…`), #20, #22, #26, #31
  («This is a scam»), #34 — шум.
- #27/#28 (`disbee00`): «декодировано» + огромный hex через BIP39 —
  LLM-генерация, не подтверждено.
- #74/#75/#76 (индонезийская серия «0,01% lagi?»): подробные, но это LLM-конспекты
  уже известных шагов (23 слоя BEAUFORT/VIC и т.д.); полезны как оглавление, не
  как новые факты. Совпадает с нашими phone-константами (chain3 sha `4f7a1e4e…`,
  chain4 `e4269ed5…` ← **фантом, у нас уже отсечён**).
- #116 (`fingergeo-debug`): араб. лог AI-агента «Manus» — Naddiseo: это типичный
  LLM-«псевдо-результат», с проекцией результатов.
- #108 («CADEIA») и #112/#113 («Bifid→BTCSEED», «484/479») — **не подтверждены**;
  Naddiseo явно спорит с #108.


## 8. Полный индекс issues (112)

| # | state | создан | автор | комм. | заголовок |
|---:|---|---|---|---:|---|
| 1 | closed | 2020-05-03 | ruzbeh8 | 0 | Decentraland |
| 2 | closed | 2021-01-11 | edoardocoen | 5 | Followed the last hint |
| 3 | closed | 2021-03-20 | Naddiseo | 1 | Update README.md |
| 4 | open | 2021-04-21 | pianist1989m | 2 | question about cifer |
| 5 | closed | 2021-04-26 | Francisco1892 | 0 | Questions about audio files |
| 6 | open | 2021-05-14 | slonyarakmw | 22 | About Last Phase |
| 7 | open | 2021-05-17 | slonyarakmw | 6 | > ok... This another little things.. but not from last phase... |
| 8 | closed | 2021-05-20 | Naddiseo | 2 | Update README.md |
| 11 | closed | 2023-04-25 | biawalid | 2 | ?? |
| 14 | open | 2023-06-28 | Steve502r | 0 | 1 white square different  |
| 15 | open | 2023-07-22 | Hilltopperjm | 127 | Solution  |
| 16 | closed | 2023-08-24 | Naddiseo | 2 | Reorganization and ipython notebook solutions |
| 17 | open | 2023-12-06 | wetdro | 11 | I think I decoded U2FsZGVkX186tYU0hVRBXXUnBUO7C0+X4KUWnWkCvoZSxbRD3wNkGWVHefvdrd9zQvX0t8v3jPB4okpspxebRi6sE1BMl5HI8Rku+KejUqTvdWOX6nQjSpepXwGuN/jJ |
| 18 | open | 2024-04-07 | amirofski | 1 | New Hints |
| 19 | open | 2024-05-21 | puzzlehint | 5 | New clue |
| 20 | closed | 2024-05-25 | v0rl0x | 6 | Roses are white but often red (SOLVED) |
| 21 | open | 2024-06-09 | KrazzyK29 | 20 | Help claim finally! |
| 22 | closed | 2024-12-12 | pudingearl | 1 | Salt |
| 23 | open | 2025-01-31 | Raja9797 | 2 | Answer  |
| 24 | open | 2025-02-10 | guy29278 | 32 | Looking for Retired Coder |
| 25 | open | 2025-03-29 | disbee00 | 19 | To the creator |
| 26 | closed | 2025-04-05 | misstobee | 6 | . |
| 27 | open | 2025-04-10 | disbee00 | 24 | Dang it's already solved ? Here's what I got |
| 28 | open | 2025-04-11 | disbee00 | 29 | Continue |
| 29 | open | 2025-05-15 | generation998 | 3 | need suggestions with last 2 decrypted base64 |
| 30 | closed | 2025-05-24 | pgurido | 0 | Patch 1 |
| 31 | closed | 2025-05-29 | gotest-mix | 7 | This is a scam. Let's give it up |
| 32 | closed | 2025-05-30 | gotest-mix | 1 | new hint |
| 33 | closed | 2025-06-25 | kaibuzz0 | 0 |    Fun game too easy, disappointed the key master left no way to claim sovereignty     5Kb8kLf9zgWQnogidDA76MzPL6TsZZY36hWXMssSzNydYXYB9KF BTC Address: 1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa   Puzzle maker I ask for reward to claim sovereignty and exit  The whole reason I began the journey   17HtPrTzt6q5hdmvHxYVWc1W4dhWRkVWYV |
| 34 | closed | 2025-06-25 | kaibuzz0 | 0 | Did I do something we did not expect? |
| 35 | closed | 2025-06-25 | kaibuzz0 | 0 | Game solved? don't waste your time?  How is this possible  |
| 36 | closed | 2025-06-25 | kaibuzz0 | 0 | To the puzzle maker  |
| 37 | closed | 2025-06-25 | kaibuzz0 | 6 | Broken trust by puzzle maker |
| 38 | closed | 2025-06-27 | kaibuzz0 | 9 | Puzzle solved !!!! Puzzle maker did infact break trust |
| 39 | closed | 2025-06-27 | kaibuzz0 | 2 | NO BITCOIN  puzzled solved  all proof |
| 40 | closed | 2025-06-27 | kaibuzz0 | 4 | Puzzled solved  all proof  |
| 41 | closed | 2025-06-27 | kaibuzz0 | 2 | show your face fraud  |
| 42 | closed | 2025-06-27 | kaibuzz0 | 2 | One thing solving this puzzle proves |
| 43 | closed | 2025-06-27 | kaibuzz0 | 6 | Call me liar again, further instructions   |
| 44 | closed | 2025-06-27 | kaibuzz0 | 7 | Explanation for dummys  |
| 45 | closed | 2025-06-27 | kaibuzz0 | 2 | To answer the question how difficult this was  |
| 46 | closed | 2025-06-27 | kaibuzz0 | 4 | Ill just screen record the whole process  |
| 47 | closed | 2025-07-12 | dutches2399x | 8 | + |
| 48 | open | 2025-07-14 | Kaizko | 0 | Its a recruiting puzzle xD |
| 49 | open | 2025-07-14 | sanjay9867 | 2 | flag{4ES_1s_e4sy_t0_cr4ck_w1th_p4ssw0rd} |
| 50 | open | 2025-07-20 | Kaizko | 2 | to live |
| 51 | open | 2025-08-16 | alexdepario | 14 | Progress on Salphaseion and Cosmic Duality |
| 52 | open | 2025-08-18 | Hysean2 | 4 | What if the end is actually the beginning ? |
| 53 | open | 2025-08-19 | jaymg25 | 0 | I am the puzzle |
| 54 | open | 2025-08-20 | Bradferd247 | 0 | i think i have it |
| 55 | open | 2025-08-23 | jackdevs66 | 15 | Finally I Decrypted Cosmic Duality! |
| 56 | open | 2025-08-31 | dgk5902a-boop | 5 | The final resolution of the stage. Only the choice is true. |
| 57 | open | 2025-09-05 | longbanana33 | 0 | Electrum Zcash |
| 58 | open | 2025-09-09 | vitalkpk-wq | 2 | Another DOOR |
| 59 | closed | 2025-09-18 | gaudhu | 0 | I solved the GSM puzzle — Please contact me privately |
| 60 | closed | 2025-09-18 | gaudhu | 2 | [Solution Submission] GSMG Puzzle Solved - Claiming Reward |
| 61 | open | 2025-10-01 | Raja9797 | 1 | 😭😭😭😭😭 |
| 62 | open | 2025-10-04 | dwdashish2 | 4 | GSMG puzzle |
| 63 | open | 2025-10-12 | PolishGold | 1 | phase 6 broke |
| 64 | open | 2025-11-01 | dgk5902a-boop | 1 | NEW DOOR |
| 65 | open | 2025-11-06 | Jaykachi | 0 | I Asked the Architect – The Choice Is to Build |
| 66 | closed | 2025-11-10 | arctechnologys | 2 | [Phase 5] Cosmic Duality - Complete Solution & Reproducible Decryption |
| 67 | open | 2025-12-14 | GalloClaudio64 | 0 | Merlon in QR code |
| 68 | open | 2025-12-22 | consigcody94 | 10 | Add comprehensive gap analysis for GSMG.IO 5 BTC puzzle |
| 69 | open | 2025-12-27 | nightidn641 | 7 | SOLVED:` GSMG 5 BTC Puzzle - Comprehensive Solution & Private Key Reconstruction |
| 70 | closed | 2026-01-25 | abdallahbn31 | 1 | scam |
| 71 | open | 2026-01-27 | mesunrise | 5 | How do you claim the reward? |
| 72 | open | 2026-01-29 | knightsafda | 5 | My Philisophy |
| 73 | open | 2026-02-03 | joaogzanini-beep | 5 | AO CRIADOR |
| 74 | open | 2026-02-16 | moetneos-maker | 15 | 0,01% lagi? |
| 75 | closed | 2026-02-16 | moetneos-maker | 1 | 🐒 |
| 76 | open | 2026-02-18 | moetneos-maker | 0 | Lanjutan dari 0,01% Kemarin 🥴 |
| 77 | open | 2026-02-19 | Tarroot | 0 | THAT WHAT A WISEMAN ABOVE HINTED |
| 78 | open | 2026-02-19 | moetneos-maker | 0 | lanjutan part 2 0,01%  |
| 79 | open | 2026-02-20 | labjay69-jpg | 3 | 🎯 GSMG Puzzle Phase 3 SOLVED - Half & Better Half Derived |
| 80 | open | 2026-02-20 | xxCarlosxx1025 | 1 | GSMG Puzzle Claim - Full Proof + Dust Txids - Feb 20 2026 |
| 81 | closed | 2026-02-24 | vadiksh85-pixel | 6 | Phase 3 Deterministic Terminal State Confirmed (No Phase-4 Signal in Matrix Invariants) |
| 82 | open | 2026-02-25 | vadiksh85-pixel | 2 | Phase 3 (Cosmic Duality) — Reproducibility Audit (No Private Material Disclosed) |
| 83 | open | 2026-02-27 | Wi77erd | 2 | What i have observed. |
| 84 | open | 2026-03-02 | a11yot | 2 | My journey through the GSMG 5 BTC puzzle – and why I believe it's unsolvable |
| 85 | open | 2026-03-07 | rblinnviola-oss | 0 | The maker of this |
| 86 | open | 2026-03-07 | robotixcoder | 0 | I don't understand something.... |
| 87 | open | 2026-03-13 | EnigmAnderson | 8 | CIAO BELLA O — We've been waiting at the last door |
| 88 | open | 2026-03-29 | zemnovodnuy | 20 | If you’re treating the Cosmic Duality output as something that still needs to be decrypted or entropy-reduced, pause and re-evaluate. That layer does resolve cleanly once interpreted correctly, and what comes out is internally consistent and stable. The harder part isn’t breaking it further — it’s recognizing what role that output actually plays in the overall structure. Once you found how to decode it you run into a wall where you need to think different, triangular to be specific. Without revealing to much The only way out will be an XOR triangle. I haven't solved the part that comes after that (yet) |
| 89 | open | 2026-04-13 | drecantu759 | 0 | No one thinks it's weird that |
| 90 | open | 2026-05-08 | robotixcoder | 1 | GSMG.io is down? |
| 91 | open | 2026-05-26 | joaogzanini-beep | 3 | [BREAKTHROUGH] Phase 6+ Solved - 12 Addresses Found |
| 92 | open | 2026-06-04 | ektemfg | 3 | Seeking reproducible definition of ca / cosmic_A, row1-4, and K_I1 |
| 93 | open | 2026-06-13 | halbgott29a | 1 | Add cryptanalysis of the unsolved SalPhaseIon/Cosmic Duality endgame |
| 94 | open | 2026-06-13 | moetneos-maker | 0 | The final result of cosmic duality: flag{8KJ} |
| 95 | open | 2026-06-18 | hossein2002426 | 1 | https://github.com/hossein2002426/gsmgio-5btc-puzzle/tree/master |
| 96 | open | 2026-06-18 | Morgane0664 | 2 | Analyse complète — Nouvelles pistes sur le blob @@@@@@@@@@ Contexte |
| 97 | closed | 2026-07-02 | nickkhodcts | 8 | GSMG.IO 5 BTC Puzzle — Prize Claim |
| 98 | open | 2026-07-08 | Ro1bv | 5 | Guy's Is This Puzzle Fake? |
| 99 | open | 2026-07-17 | rings33 | 11 | Request: Address Extraction Algorithm from cosmic_decrypted.bin (Phase 5/6) |
| 100 | open | 2026-08-04 | fuckyouAXEDEVMinecraftserver | 1 | What's the rabbit in the middle for? |
| 101 | closed | 2026-08-19 | wayzeek | 1 | Correct the prize summary with current on-chain state |
| 102 | closed | 2026-08-19 | wayzeek | 1 | Say what is still unsolved, and how to tell claims apart |
| 103 | open | 2026-08-20 | ZetaReticulus | 1 | Phase-2 table resolved: the 4 trailing bytes give X=-4, H=12, Y=27, Q=2 |
| 104 | open | 2026-08-20 | c4chiras | 3 | Correction (retracting my premise) + narrowed request: creator guidance on the SalPhaseIon / Cosmic Duality stage |
| 105 | open | 2026-08-20 | Naddiseo | 0 | This Repository is Abandoned |
| 106 | open | 2026-08-22 | eliooooooot | 3 | [Research] Decoded author hint (2023), color-frame proof, oracle KDF correction, fake-solution debunking, and full KDF/mode sweep closure |
| 107 | closed | 2026-08-26 | Anvexis | 0 | GSMG.IO 5 BTC Puzzle – Analysis & Progress Log |
| 108 | open | 2026-08-27 | mrmint195-sudo | 5 | [SOLVED] The SalPhaseIon small blob has TWO typos on the live page — full decrypt + chain closure |
| 109 | open | 2026-08-31 | kaibuzz000 | 5 | Everyone i think its been solved |
| 110 | open | 2026-09-05 | HassanVaezzadeh | 2 | Independent verification of the reported 12-address extraction from **cosmic_correct.bin** |
| 111 | closed | 2026-09-05 | 0xyph3r | 4 | Two specific questions on the inner blob password and Reduction(SOURCE_4) — plus two verifiable structural findings in the Phase 0 grid |
| 112 | closed | 2026-10-01 | Mohamed-nsr | 0 | im stuck  |
| 113 | open | 2026-10-01 | Mohamed-nsr | 1 | weeoooo |
| 114 | open | 2026-10-08 | windstalker-arch | 2 | Request: verbatim creator-account Telegram messages after 2026-05-28 (group message IDs ~63967-70186) |
| 115 | open | 2026-10-09 | akaVARU | 6 | i found this BYTENPHASEGBD... ? |
| 116 | open | 2026-10-15 | fingergeo-debug | 4 | Arabic-language research on the GSMG.IO 5 BTC puzzle (work in progress, please translate) |


## 9. Все внешние ссылки, найденные в README/issues/комментариях


### bitcointalk (2)

- https://bitcointalk.org/index.php?topic=5151725.0
- https://bitcointalk.org/index.php?topic=5529568.msg65045641#msg65045641

### blockchain.com (4)

- https://www.blockchain.com/btc/address/17ucy1K9ZUAaoY6JVtM932W9jUp5LXfyHa
- https://www.blockchain.com/btc/address/1GSMG1JC9wtdSwfwApgj2xcmJPAwx7prBe
- https://www.blockchain.com/btc/address/1JK27jtvE1wS4VG9k7Zpo8wBufMbYwy3r8
- https://www.blockchain.com/explorer/addresses/btc/1GSMG1JC9wtdSwfwApgj2xcmJPAwx7prBe

### ciphertools (1)

- https://ciphertools.co.uk/decode.php

### dcode.fr (2)

- https://www.dcode.fr/ascii-shift-cipher
- https://www.dcode.fr/vic-cipher

### gchq.github (3)

- https://gchq.github.io/CyberChef/#recipe=Decode_text(
- https://gchq.github.io/CyberChef/#recipe=From_Hex(
- https://gchq.github.io/CyberChef/#recipe=Remove_whitespace(true

### github.com (174)

- https://github.com/GalloClaudio64
- https://github.com/Naddiseo
- https://github.com/Naddiseo/gsmgio-5btc-puzzle
- https://github.com/Naddiseo/gsmgio-5btc-puzzle/blob/master/phase2.ipynb
- https://github.com/Naddiseo/gsmgio-5btc-puzzle/blob/master/phase3.2.ipynb
- https://github.com/Naddiseo/gsmgio-5btc-puzzle/tree/notebook-solutions
- https://github.com/Neo-070
- https://github.com/WabiLipa
- https://github.com/alexdepario/5-BTC-PUZZLE-Cosmic-Duality
- https://github.com/andersonbig
- https://github.com/disbee00
- https://github.com/eazytest
- https://github.com/hossein2002426/gsmgio-5btc-puzzle
- https://github.com/jackdevs66/GSMG5_CDuality
- https://github.com/kaibuzz0/Gsmg.io-solution
- https://github.com/mesunrise
- https://github.com/notifications/mobile/android/CL4SZDAITDWA3G2BXZKBNO35OA26VA5CNFSNUABFM5UWIORPF5TWS5BNNB2WEL2JONZXKZKDN5WW2ZLOOQXTKNJYHA4DANRVGU3KM4TFMFZW63VHMNXW23LFNZ2KKZLWMVXHJLTGN5XXIZLSL5QW4ZDSN5UWI
- https://github.com/notifications/mobile/android/CL4SZDBVP3LCTUWF5FXAUPT5OMQT7A5CNFSNUABFM5UWIORPF5TWS5BNNB2WEL2JONZXKZKDN5WW2ZLOOQXTKNRSGYYDMNRVGQY2M4TFMFZW63VHMNXW23LFNZ2KKZLWMVXHJLTGN5XXIZLSL5QW4ZDSN5UWI
- https://github.com/notifications/mobile/android/CL4SZDDWEUQK6UFGEMTPOBD5OLT63A5CNFSNUABFM5UWIORPF5TWS5BNNB2WEL2JONZXKZKDN5WW2ZLOOQXTKNRSGMYTKNJXGYZKM4TFMFZW63VHMNXW23LFNZ2KKZLWMVXHJLTGN5XXIZLSL5QW4ZDSN5UWI
- https://github.com/notifications/mobile/android/CL4SZDHXPGQPHXN5VVIPJMT5K4JONA5CNFSNUABFM5UWIORPF5TWS5BNNB2WEL2JONZXKZKDN5WW2ZLOOQXTKMZVG44TMNBWHAZ2M4TFMFZW63VHMNXW23LFNZ2KKZLWMVXHJLTGN5XXIZLSL5QW4ZDSN5UWI
- https://github.com/notifications/mobile/ios/CL4SZDBLZKGLJRRSD6T7QRT5OLT63A5CNFSNUABFM5UWIORPF5TWS5BNNB2WEL2JONZXKZKDN5WW2ZLOOQXTKNRSGMYTKNJXGYZKM4TFMFZW63VHMNXW23LFNZ2KKZLWMVXHJKTGN5XXIZLSL5UW64Y
- https://github.com/notifications/mobile/ios/CL4SZDBUNVCMCB6ZCYA3RJD5OMQT7A5CNFSNUABFM5UWIORPF5TWS5BNNB2WEL2JONZXKZKDN5WW2ZLOOQXTKNRSGYYDMNRVGQY2M4TFMFZW63VHMNXW23LFNZ2KKZLWMVXHJKTGN5XXIZLSL5UW64Y
- https://github.com/notifications/mobile/ios/CL4SZDFKQNVBEYMAQJC66CT5K4JONA5CNFSNUABFM5UWIORPF5TWS5BNNB2WEL2JONZXKZKDN5WW2ZLOOQXTKMZVG44TMNBWHAZ2M4TFMFZW63VHMNXW23LFNZ2KKZLWMVXHJKTGN5XXIZLSL5UW64Y
- https://github.com/notifications/mobile/ios/CL4SZDFQUG55ZWDWIJNFXWT5OA26VA5CNFSNUABFM5UWIORPF5TWS5BNNB2WEL2JONZXKZKDN5WW2ZLOOQXTKNJYHA4DANRVGU3KM4TFMFZW63VHMNXW23LFNZ2KKZLWMVXHJKTGN5XXIZLSL5UW64Y
- https://github.com/notifications/unsubscribe-auth/ANVCGLSFTHZLYQUPB2ULDED2PA7ZTAVCNFSM6AAAAABJBA4OYKVHI2DSMVQWIX3LMV43OSLTON2WKQ3PNVWWK3TUHMZDMNBXGAYTAOBRGU
- https://github.com/notifications/unsubscribe-auth/ANVCGLWTYJ2ARZK26HIS3VD2LU7WFAVCNFSM6AAAAABJBA4OYKVHI2DSMVQWIX3LMV43OSLTON2WKQ3PNVWWK3TUHMZDMMBTGA3DANBYGA
- https://github.com/notifications/unsubscribe-auth/ARMUMI2FGFRHUSGHYFYLAYTXTAMSZANCNFSM6AAAAAA2TSJKPI
- https://github.com/notifications/unsubscribe-auth/AT6L52EI2IKB3BXH3PZZEI3XTYIKTANCNFSM6AAAAAA2TSJKPI
- https://github.com/notifications/unsubscribe-auth/AT6L52HRMUCNIL5MCM53QJDXTSZZ7ANCNFSM6AAAAAA2TSJKPI
- https://github.com/notifications/unsubscribe-auth/B472XCQK5TQWCRWD3WJG5Z34MIBQZAVCNFSM6AAAAACVJ24M6CVHI2DSMVQWIX3LMV43OSLTON2WKQ3PNVWWK3TUHMZTSMBZHA3DENRYGE
- https://github.com/notifications/unsubscribe-auth/B472XCSJ2CHEEUKJFI7NVQ34MRECRAVCNFSM6AAAAACVJ24M6CVHI2DSMVQWIX3LMV43OSLTON2WKQ3PNVWWK3TUHMZTSMRQGI3TKNZYHE
- https://github.com/notifications/unsubscribe-auth/B472XCSNRGHY52EH4WLO3YL4MIM3VAVCNFSM6AAAAACVJ24M6CVHI2DSMVQWIX3LMV43OSLTON2WKQ3PNVWWK3TUHMZTSMJQGI3TANRYHE
- https://github.com/notifications/unsubscribe-auth/B472XCSU2FBIIZTY4X3CGR34MIDLLAVCNFSM6AAAAACVJ24M6CVHI2DSMVQWIX3LMV43OSLTON2WKQ3PNVWWK3TUHMZTSMBZHEZDOOJZGE
- https://github.com/notifications/unsubscribe-auth/B472XCXFSZ36TCRPSWIPGL34MIFIZAVCNFSM6AAAAACVJ24M6CVHI2DSMVQWIX3LMV43OSLTON2WKQ3PNVWWK3TUHMZTSMBZHE4TCMBZG4
- https://github.com/notifications/unsubscribe-auth/BAAGTJJEXT3DLAWDDPUVBILXTSAFZANCNFSM6AAAAAA2TSJKPI
- https://github.com/notifications/unsubscribe-auth/BAAGTJK3KN3BA5GMLYRS5HTXSP7ODANCNFSM6AAAAAA2TSJKPI
- https://github.com/notifications/unsubscribe-auth/BAAGTJK7OJKSNLHNRMJCFLDY2XQQDAVCNFSM6AAAAAA2TSJKPKVHI2DSMVQWIX3LMV43OSLTON2WKQ3PNVWWK3TUHMZDAMRXHAYDSMBTG4
- https://github.com/notifications/unsubscribe-auth/BAAGTJKVFZNVKOJGIVIXFG3XS7JWBANCNFSM6AAAAAA2TSJKPI
- https://github.com/notifications/unsubscribe-auth/BAAGTJLINHVHTUFMQDVHPFDXR37XLANCNFSM6AAAAAA2TSJKPI
- https://github.com/notifications/unsubscribe-auth/BAAGTJMPCOAVUDHFRH4ZWM3XTSA2XANCNFSM6AAAAAA2TSJKPI
- https://github.com/notifications/unsubscribe-auth/BAAGTJOIJZZFAM535ZTIOBTXTSCCLANCNFSM6AAAAAA2TSJKPI
- https://github.com/notifications/unsubscribe-auth/BD3CAYSIALPJ4O6EV7OA72LYJZVT5AVCNFSM6AAAAABAITEUQWVHI2DSMVQWIX3LMV43OSLTON2WKQ3PNVWWK3TUHMYTQNJZGAZTCOBZGI
- https://github.com/notifications/unsubscribe-auth/BP6QMA27JM5QMSVUELSC2RL2YQOVPAVCNFSM6AAAAAB2BV3DVWVHI2DSMVQWIX3LMV43OSLTON2WKQ3PNVWWK3TUHMZDOOBXGQ2TAOJXGU
- https://github.com/notifications/unsubscribe-auth/BP6QMA3PL4UA7SWDPIV7N3D2ZKL2XAVCNFSM6AAAAAB26OQB4CVHI2DSMVQWIX3LMV43OSLTON2WKQ3PNVWWK3TUHMZDQMBQGAZTSMRUGA
- https://github.com/notifications/unsubscribe-auth/BP6QMA5ICT4NQYFG7B2R2MT25SQEHAVCNFSM6AAAAAB243S7Y6VHI2DSMVQWIX3LMV43OSLTON2WKQ3PNVWWK3TUHMZDQNRWGQZDSNRUGQ
- https://github.com/notifications/unsubscribe-auth/BP6QMA5JCGWQZBJ3XQ6SABD2ZXMLLAVCNFSM6AAAAAB2BV3DVWVHI2DSMVQWIX3LMV43OSLTON2WKQ3PNVWWK3TUHMZDQMBYGIZTINJUGM
- https://github.com/notifications/unsubscribe-auth/BP6QMA7ESG3Y6QR2ZUG4TED2ZU4QBAVCNFSM6AAAAAB26OQB4CVHI2DSMVQWIX3LMV43OSLTON2WKQ3PNVWWK3TUHMZDQMBWHEYDKOJXHA
- https://github.com/notifications/unsubscribe-auth/BP6QMA7J7Q3UPQ2NXSLZSA32Y5XO7AVCNFSM6AAAAAB243S7Y6VHI2DSMVQWIX3LMV43OSLTON2WKQ3PNVWWK3TUHMZDOOJWGEYTMNZYHA
- https://github.com/notifications/unsubscribe-auth/BP6QMA7L343KU4CZ2WUBXYT2YQLX3AVCNFSM6AAAAAB2BV3DVWVHI2DSMVQWIX3LMV43OSLTON2WKQ3PNVWWK3TUHMZDOOBXGM4TQMBXGA
- https://github.com/notifications/unsubscribe-auth/BP6QMA7XGJW7V2YYFYLLYA32YQAO7AVCNFSM6AAAAAB2BV3DVWVHI2DSMVQWIX3LMV43OSLTON2WKQ3PNVWWK3TUHMZDOOBXGE2TMMZSGM
- https://github.com/notifications/unsubscribe-auth/BP6QMAYRUHRJ4LXPQRCOHEL25RAS5AVCNFSM6AAAAAB243S7Y6VHI2DSMVQWIX3LMV43OSLTON2WKQ3PNVWWK3TUHMZDQNRVGI2DMMZTGQ
- https://github.com/notifications/unsubscribe-auth/BP6QMAZE3W7E4JMZKHU3M3D2ZKKHPAVCNFSM6AAAAAB26OQB4CVHI2DSMVQWIX3LMV43OSLTON2WKQ3PNVWWK3TUHMZDQMBQGAZTIMRSGQ
- https://github.com/notifications/unsubscribe-auth/BP6QMAZMIPCJ2WTIFUKWNGT25SUW3AVCNFSM6AAAAAB243S7Y6VHI2DSMVQWIX3LMV43OSLTON2WKQ3PNVWWK3TUHMZDQNRWGU2TMNBTGA
- https://github.com/notifications/unsubscribe-auth/CL4SZDAFZX44L542DLTXLOD5OA26VAVCNFSNUABFKJSXA33TNF2G64TZHMZDKOBYGUZDGMBXHNEXG43VMU5TIOJQG4ZTENZSGM22C5QC
- https://github.com/notifications/unsubscribe-auth/CL4SZDFOTHDTYZAZO3CVNLT5OLT63AVCNFSNUABFKJSXA33TNF2G64TZHMZDKOBYGUZDGMBXHNEXG43VMU5TIOJQG4ZTENZSGM22C5QC
- https://github.com/notifications/unsubscribe-auth/CL4SZDFTS6YIRUROLHFYQP35OMQT7AVCNFSNUABFKJSXA33TNF2G64TZHMZDKOBYGUZDGMBXHNEXG43VMU5TIOJQG4ZTENZSGM22C5QC
- https://github.com/notifications/unsubscribe-auth/CL4SZDH7EECTUYPEA6HDJH35K4JONAVCNFSNUABFKJSXA33TNF2G64TZHMZDKOBYGUZDGMBXHNEXG43VMU5TIOJQG4ZTENZSGM22C5QC
- https://github.com/puzzlehunt/gsmgio-5btc-puzzle/assets/109914114/a0a1e241-04f9-45b7-a735-da8fb76dd885
- https://github.com/puzzlehunt/gsmgio-5btc-puzzle/assets/109914114/d8d3911e-4231-4fb6-ac48-48cee5de14fa
- https://github.com/puzzlehunt/gsmgio-5btc-puzzle/assets/137006090/65bafdc5-31e8-41e4-a513-c2170a8ec7f3
- https://github.com/puzzlehunt/gsmgio-5btc-puzzle/assets/31393531/18c3efe1-6b93-442d-80a1-8f0d2dfbb9c4
- https://github.com/puzzlehunt/gsmgio-5btc-puzzle/issues/105
- https://github.com/puzzlehunt/gsmgio-5btc-puzzle/issues/15#issuecomment-1648752406
- https://github.com/puzzlehunt/gsmgio-5btc-puzzle/issues/15#issuecomment-1656146435
- https://github.com/puzzlehunt/gsmgio-5btc-puzzle/issues/15#issuecomment-1658688179
- https://github.com/puzzlehunt/gsmgio-5btc-puzzle/issues/15#issuecomment-1659157786
- https://github.com/puzzlehunt/gsmgio-5btc-puzzle/issues/15#issuecomment-1665002289
- https://github.com/puzzlehunt/gsmgio-5btc-puzzle/issues/15#issuecomment-1665015732
- https://github.com/puzzlehunt/gsmgio-5btc-puzzle/issues/15#issuecomment-1665033666
- https://github.com/puzzlehunt/gsmgio-5btc-puzzle/issues/15#issuecomment-1665265549
- https://github.com/puzzlehunt/gsmgio-5btc-puzzle/issues/15#issuecomment-1666455570
- https://github.com/puzzlehunt/gsmgio-5btc-puzzle/issues/15#issuecomment-2027809037
- https://github.com/puzzlehunt/gsmgio-5btc-puzzle/issues/17#issuecomment-1859031892
- https://github.com/puzzlehunt/gsmgio-5btc-puzzle/issues/21#issuecomment-2603060480
- https://github.com/puzzlehunt/gsmgio-5btc-puzzle/issues/21#issuecomment-2647010815
- https://github.com/puzzlehunt/gsmgio-5btc-puzzle/issues/25#issuecomment-2787156323
- https://github.com/puzzlehunt/gsmgio-5btc-puzzle/issues/25#issuecomment-2787398070
- https://github.com/puzzlehunt/gsmgio-5btc-puzzle/issues/25#issuecomment-2787450975
- https://github.com/puzzlehunt/gsmgio-5btc-puzzle/issues/25#issuecomment-2808234543
- https://github.com/puzzlehunt/gsmgio-5btc-puzzle/issues/27#issuecomment-2796116788
- https://github.com/puzzlehunt/gsmgio-5btc-puzzle/issues/27#issuecomment-2865246334
- https://github.com/puzzlehunt/gsmgio-5btc-puzzle/issues/27#issuecomment-2866429644
- https://github.com/puzzlehunt/gsmgio-5btc-puzzle/issues/27#issuecomment-2866556430
- https://github.com/puzzlehunt/gsmgio-5btc-puzzle/issues/28#issuecomment-2800034224
- https://github.com/puzzlehunt/gsmgio-5btc-puzzle/issues/28#issuecomment-2800039240
- https://github.com/puzzlehunt/gsmgio-5btc-puzzle/issues/28#issuecomment-2806905978
- https://github.com/puzzlehunt/gsmgio-5btc-puzzle/issues/55
- https://github.com/puzzlehunt/gsmgio-5btc-puzzle/issues/56
- https://github.com/puzzlehunt/gsmgio-5btc-puzzle/issues/6#issuecomment-842580474_
- https://github.com/puzzlehunt/gsmgio-5btc-puzzle/issues/66
- https://github.com/puzzlehunt/gsmgio-5btc-puzzle/issues/67
- https://github.com/puzzlehunt/gsmgio-5btc-puzzle/issues/68#issuecomment-3691156333_
- https://github.com/puzzlehunt/gsmgio-5btc-puzzle/issues/72
- https://github.com/puzzlehunt/gsmgio-5btc-puzzle/issues/74#issuecomment-3909862681
- https://github.com/puzzlehunt/gsmgio-5btc-puzzle/issues/74#issuecomment-3909927991
- https://github.com/puzzlehunt/gsmgio-5btc-puzzle/issues/74#issuecomment-3909991097
- https://github.com/puzzlehunt/gsmgio-5btc-puzzle/issues/74#issuecomment-3910270689
- https://github.com/puzzlehunt/gsmgio-5btc-puzzle/issues/74#issuecomment-3920275789
- https://github.com/puzzlehunt/gsmgio-5btc-puzzle/issues/82
- https://github.com/puzzlehunt/gsmgio-5btc-puzzle/issues/87
- https://github.com/puzzlehunt/gsmgio-5btc-puzzle/issues/99
- https://github.com/puzzlehunt/gsmgio-5btc-puzzle/issues/99#issuecomment-5357964683
- https://github.com/puzzlehunt/gsmgio-5btc-puzzle/issues/99#issuecomment-5588806556
- https://github.com/puzzlehunt/gsmgio-5btc-puzzle/issues/99#issuecomment-5623155762
- https://github.com/puzzlehunt/gsmgio-5btc-puzzle/issues/99#issuecomment-5626066541
- https://github.com/puzzlehunt/gsmgio-5btc-puzzle/issues/99?email_source=notifications&email_token=CL4SZDBAPQLB4YJCP2D23OD5OLT63A5CNFSNUABFM5UWIORPF5TWS5BNNB2WEL2JONZXKZKDN5WW2ZLOOQXTKNRSGMYTKNJXGYZKM4TFMFZW63VHMNXW23LFNZ2KKZLWMVXHJLDGN5XXIZLSL5RWY2LDNM#issuecomment-5623155762
- https://github.com/puzzlehunt/gsmgio-5btc-puzzle/issues/99?email_source=notifications&email_token=CL4SZDCF4IKCY6NUI37F2JD5K4JONA5CNFSNUABFM5UWIORPF5TWS5BNNB2WEL2JONZXKZKDN5WW2ZLOOQXTKMZVG44TMNBWHAZ2M4TFMFZW63VHMNXW23LFNZ2KKZLWMVXHJLDGN5XXIZLSL5RWY2LDNM#issuecomment-5357964683
- https://github.com/puzzlehunt/gsmgio-5btc-puzzle/issues/99?email_source=notifications&email_token=CL4SZDEVAFKLAGFQNI62EQL5OA26VA5CNFSNUABFM5UWIORPF5TWS5BNNB2WEL2JONZXKZKDN5WW2ZLOOQXTKNJYHA4DANRVGU3KM4TFMFZW63VHMNXW23LFNZ2KKZLWMVXHJLDGN5XXIZLSL5RWY2LDNM#issuecomment-5588806556
- https://github.com/puzzlehunt/gsmgio-5btc-puzzle/issues/99?email_source=notifications&email_token=CL4SZDHRXELRUYALLLW4VQL5OMQT7A5CNFSNUABFM5UWIORPF5TWS5BNNB2WEL2JONZXKZKDN5WW2ZLOOQXTKNRSGYYDMNRVGQY2M4TFMFZW63VHMNXW23LFNZ2KKZLWMVXHJLDGN5XXIZLSL5RWY2LDNM#issuecomment-5626066541
- https://github.com/puzzlehunt/gsmgio-5btc-puzzle/pull/68
- https://github.com/puzzlehunt/gsmgio-5btc-puzzle/pull/68#issuecomment-3691156333
- https://github.com/user-attachments/assets/07d991a4-2ce9-479a-8eb1-20353dd1b6dc
- https://github.com/user-attachments/assets/0cd8580f-45ea-4b1b-9e76-94d8ec089054
- https://github.com/user-attachments/assets/15741092-21cc-4af2-81fd-bbfd1735b081
- https://github.com/user-attachments/assets/16591257-1c4d-4a0b-a0be-cd60cd1b3852
- https://github.com/user-attachments/assets/1ab79985-e379-48de-a9d5-4358b3dadddc
- https://github.com/user-attachments/assets/1f956ebc-053e-4edd-96d0-3fcb7a816699
- https://github.com/user-attachments/assets/1fad124a-b5a9-42c0-a638-437a4b357ed6
- https://github.com/user-attachments/assets/2899091a-9dcc-4fc9-b3fd-0441347fd934
- https://github.com/user-attachments/assets/29d3954d-5445-4405-a4df-10b759cee886
- https://github.com/user-attachments/assets/2ae11fa7-f98b-46c4-b78a-b54adca95fba
- https://github.com/user-attachments/assets/327e3a1f-1f89-4fd5-bee6-595e655deab9
- https://github.com/user-attachments/assets/339c4ae1-c525-48c6-b6ca-c67459be4fe6
- https://github.com/user-attachments/assets/3fa6ce0c-2fcb-447c-8a44-283620d7a7dd
- https://github.com/user-attachments/assets/41b98c35-1e76-45b6-a115-008f76621845
- https://github.com/user-attachments/assets/49b3bc09-4079-4244-a28c-91b04fe546bf
- https://github.com/user-attachments/assets/53737812-3bfd-4417-95f6-23654b477ac3
- https://github.com/user-attachments/assets/5aedf710-03e0-42e9-b56e-f4fd1e9c3282
- https://github.com/user-attachments/assets/5e07796d-4739-4ed1-8c34-4c986dc225a1
- https://github.com/user-attachments/assets/5f5437d8-3070-4715-bb07-65694162f6d9
- https://github.com/user-attachments/assets/64b46c60-186d-4a65-990c-108a5d38f3f3
- https://github.com/user-attachments/assets/659656f7-d962-4935-b848-86688bc2a1c6
- https://github.com/user-attachments/assets/669616f4-d284-46b2-9405-cd5b6b478e1f
- https://github.com/user-attachments/assets/6ba4e819-99c9-4de7-9216-0e074d742152
- https://github.com/user-attachments/assets/71a6c595-1dc8-4d63-8129-0dee09da0fb1
- https://github.com/user-attachments/assets/767b648e-d6dc-4c1c-a135-c177d16f1df0
- https://github.com/user-attachments/assets/772752bb-e1ac-44df-81dc-27aea281fb4a
- https://github.com/user-attachments/assets/7fb937b0-5d5e-4a9d-a4dc-8722a8f164a3
- https://github.com/user-attachments/assets/8164c4ea-ab9a-410e-942f-540468ed1428
- https://github.com/user-attachments/assets/83a15001-4aaf-4a8e-8961-23f5cd8eba3a
- https://github.com/user-attachments/assets/8473c6bc-902a-4b44-8e78-71f6da57debc
- https://github.com/user-attachments/assets/84d053fe-ed66-4e15-89f5-048a4ad61752
- https://github.com/user-attachments/assets/874a65a1-5d62-40a2-83b8-209d7d13c737
- https://github.com/user-attachments/assets/8a8c155a-aca1-41ee-9dff-39e7775a2267
- https://github.com/user-attachments/assets/90a06f31-652f-46ac-885b-782f5e4e416f
- https://github.com/user-attachments/assets/91c4804f-b644-4c73-a4ca-93d3bed93f67
- https://github.com/user-attachments/assets/9622c035-e0a9-40b2-81f7-ab9897b12b38
- https://github.com/user-attachments/assets/a13b45dc-8d27-4dc6-b460-0451d9630351
- https://github.com/user-attachments/assets/a7e2fad5-2c70-4191-8232-b07e9d5c887d
- https://github.com/user-attachments/assets/a863c190-1116-4884-836e-1e24d15cb876
- https://github.com/user-attachments/assets/a8a37e17-385b-4c8f-beff-44767a2130f4
- https://github.com/user-attachments/assets/af569a53-cf05-4e9a-a786-0d1d6e475014
- https://github.com/user-attachments/assets/afe0a92b-dcf8-4fa3-b1e8-02669e7e6721
- https://github.com/user-attachments/assets/b0c2035a-009d-40dd-9fc7-7f9837bf8d08
- https://github.com/user-attachments/assets/b3df5283-0af9-4367-8a01-203185fbef62
- https://github.com/user-attachments/assets/b4b8d4d8-e71f-44d1-9790-76916d114faa
- https://github.com/user-attachments/assets/b5941e00-ed2d-404c-9b45-730aed240f9c
- https://github.com/user-attachments/assets/b88bdcae-e593-4fc8-a596-5a69ece9af40
- https://github.com/user-attachments/assets/bb309728-c375-478c-bb20-a82fe88290b1
- https://github.com/user-attachments/assets/bc917d4e-7b39-4486-a1e3-d48471e51754
- https://github.com/user-attachments/assets/bd66843a-9c8d-4501-af30-486f1c05ae43
- https://github.com/user-attachments/assets/beb06b06-1e48-4e8c-82bb-d1953ec8ac2f
- https://github.com/user-attachments/assets/c09af128-befb-447b-892a-eea93f0be00b
- https://github.com/user-attachments/assets/c336d546-548b-4565-b4b3-38d9fa1c01b7
- https://github.com/user-attachments/assets/cc20538d-6767-4fe6-a4ae-b760b8351bed
- https://github.com/user-attachments/assets/d2bbe597-cf08-4620-a43e-3541843952ac
- https://github.com/user-attachments/assets/d633c283-e33c-4ef6-96fa-efb1efba07a3
- https://github.com/user-attachments/assets/e0d95e94-8e69-4804-9c77-b62e5e0fde63
- https://github.com/user-attachments/assets/e5adeea5-5ab1-468d-88f1-cbf5e72e9a9b
- https://github.com/user-attachments/assets/e8ca4635-2ed2-4380-be91-9e49a58343f5
- https://github.com/user-attachments/assets/f4ca35d8-7484-4305-8e13-facf03837806
- https://github.com/user-attachments/assets/f5e2ee1b-328f-4263-a39c-e18f591863b2
- https://github.com/user-attachments/assets/f8aa79de-d73e-4212-9647-a2a17f5acfac
- https://github.com/zemnovodnuy

### gsmg.io (10)

- http://gsmg.io/
- https://gsmg.io/89727c598b9cd1cf8873f27cb7057f050645ddb6a7a157a110239ac0152f6a32
- https://gsmg.io/choiceisanillusioncreatedbetweenthosewithpowerandthosewithoutaveryspecialdessertiwroteitmyself
- https://gsmg.io/puzzle
- https://gsmg.io/theseedisplanted
- https://gsmg.io/theseedisplanted.
- https://gsmg.io/youarewrongaboutdirhunt
- https://web.archive.org/web/20240415000000*/https://gsmg.io/youarewrongaboutdirhunt
- https://web.archive.org/web/20240415000000*/https://www.gsmg.io/puzzlesupposethisone
- https://www.gsmg.io/puzzlesupposethisone

### imdb (2)

- https://www.imdb.com/name/nm0048127/?ref_=ttch_qu
- https://www.imdb.com/title/tt0234215/characters/nm0048127/

### manus.im (1)

- https://manus.im/share/enHGQ9TXsgvjtU3bLwXXyj

### openssl (1)

- https://www.openssl.org/

### other (26)

- http://audio_source.wav/
- http://cosmic_duality.txt/
- https://coinguides.org/sign-verify-bitcoin-address/
- https://deepwiki.com/puzzlehunt/gsmgio-5btc-puzzle
- https://docs.python.org/3/library/stdtypes.html#bytes.decode
- https://github.![IMG_20250627_193811475_HDR.jpg
- https://mempool.space/tx/6563d875b072f9ecd1ae84f618bae33d0a6d3367b4ce3dc0e90d9ae8be7e3ee4
- https://mempool.space/tx/f25d0374cc19f7e19f015f91d67b3c36ca3822aeba8ec620622faaf6093c14d8
- https://private-user-images.githubusercontent.com/150517572/468312031-659656f7-d962-4935-b848-86688bc2a1c6.png?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NTY0NTMxMzIsIm5iZiI6MTc1NjQ1MjgzMiwicGF0aCI6Ii8xNTA1MTc1NzIvNDY4MzEyMDMxLTY1OTY1NmY3LWQ5NjItNDkzNS1iODQ4LTg2Njg4YmMyYTFjNi5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjUwODI5JTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI1MDgyOVQwNzMzNTJaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT04ZTJlNjI5YWNhYzI3ZWY3NDM1YzI1ZmZlNTUxYTgwNzU3Y2I3NjM4OWVmYWNiMTUyOTY0YmFkNGYzZDRlMmRkJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCJ9.QYoCT_0N2ztEO83IW5pyiWEMlqIU7VmAhLgJWs3HJkk
- https://private-user-images.githubusercontent.com/227274414/530507723-8164c4ea-ab9a-410e-942f-540468ed1428.png?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3OTA0NDU3ODQsIm5iZiI6MTc5MDQ0NTQ4NCwicGF0aCI6Ii8yMjcyNzQ0MTQvNTMwNTA3NzIzLTgxNjRjNGVhLWFiOWEtNDEwZS05NDJmLTU0MDQ2OGVkMTQyOC5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjYwOTI2JTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI2MDkyNlQxNzU4MDRaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT0zNWMyNzBlYjk3ZGQ5ZGQ2ODVkZDI3M2MyZTllZDFkYWIxYjkwMGMwMzVhNzdjNGNkMDViMGUwMTgwNDUzZTZmJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCZyZXNwb25zZS1jb250ZW50LXR5cGU9aW1hZ2UlMkZwbmcifQ.pSvp1D-gdijMMKrW1muplUx7E3n82LOPP64xg9eRXn0
- https://privnote.com/#
- https://privnote.com/B27Ul1BF#49BazxQqq
- https://stackoverflow.com/a/43926523
- https://t.me/+VISqN0kCAvowNDQ0
- https://t.me/+xxwEPfKG3WYzZDY6
- https://t.me/joinchat/AJXEwEWK9gvhxwkgeXJUVw
- https://thalesdocs.com/gphsm/luna/10.1/docs/network/Content/Product_Overview/the_safenet_hsm/the_safenet_hsm.htm
- https://user-images.githubusercontent.com/131772651/234271519-05047957-8a20-4522-b465-6d6fae0299d5.jpg
- https://user-images.githubusercontent.com/40121870/118528240-c70e5400-b74a-11eb-91d0-6b83a4818e59.png
- https://user-images.githubusercontent.com/40121870/118528245-c83f8100-b74a-11eb-91cf-effe2a980e0b.png
- https://user-images.githubusercontent.com/40121870/120228278-7bcc6900-c253-11eb-8ae8-b1ab81801ee8.jpg
- https://user-images.githubusercontent.com/82031466/119490111-a8c9d900-bd86-11eb-9e58-e970bdaf39f8.png
- https://www.python.org/downloads
- https://www.python.org/downloads.
- https://www.rockol.com/uk/lyrics-61092449/logic-the-warning-inner-mix?refresh_ce
- https://xorbin.com/tools/sha256-hash-calculator

### reddit (3)

- https://www.reddit.com/r/bitcoinpuzzles/comments/bf7siz/gsmgio_5_btc_puzzle_challenge/
- https://www.reddit.com/r/bitcoinpuzzles/comments/dfwcqk/gsmgio_5_btc_puzzle/
- https://www.reddit.com/user/Neo-07/

### sourceforge (1)

- https://sourceforge.net/p/bitcoin/code/133/tree/trunk/main.cpp#l1616

### wikipedia (4)

- https://en.wikipedia.org/wiki/Algebraic_notation_(chess
- https://en.wikipedia.org/wiki/Attribute-based_encryption
- https://en.wikipedia.org/wiki/Executive_Order_11110
- https://en.wikipedia.org/wiki/List_of_United_States_federal_executive_orders#John_F._Kennedy_(1961%E2%80%931963

### youtube (1)

- https://www.youtube.com/watch?v=Z9A-acu-0y0&ab_channel=SharonGavrielov
