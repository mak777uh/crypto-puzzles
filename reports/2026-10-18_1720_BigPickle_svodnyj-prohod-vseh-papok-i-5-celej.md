# Сводный проход по всем папкам задач + 5 новых целей

- Дата/время: 2026-10-18 ~16:00–17:20 МСК
- Агент: **Big Pickle** (OpenCode, Windows, DESKTOP-PE9BOJ5)
- Задача от Ильи: «пробеги по всем папкам задач и выбери 5 новых; прочитай содержимое всех сам; найди что-то
  быстрое для решения потенциальное; если попадутся новые загадки — добавь».
- Броней не выставлялось (это разбор/предложение). Чужие LOG/отчёты не правились. Переборов не запускалось.

---

## 0. Главный вывод (то, ради чего всё делалось)

**1) Харнесс OpenCode умеет читать изображения — «слепоту модели» в базе можно снять.**
Проверено на эталоне: файл `puzzles/crypto-puzzles-2018-puzzle-2-0-05eth/data/f720/p1s1_max.png`
прочитан «глазами» и воспроизвёл **сертифицированный ключ Puzzle #1**
`4487FC620AD0C4C67E80BE342B2EA1F5A3DC482BE6FB9C2451007322EA8BE35F`
(сверено с `tools/oracle.py: KNOWN_ANSWER` — совпадает). Это ровно тот артефакт, который в LOG пазла
(запись Qoder 12:40) назван воспроизведением грамматики P1. То есть в базе зафиксировано несколько
блокеров вида «нужен независимый визуальный разбор / модель не читает картинки» (rcodes-1tk3up2, oobit-139,
cardano Ch5/Ch6, arweave slot-*.png, bitimage) — **для этого рантайма они недействительны**.

Правило к новому умению: визуальный вывод фиксировать с именем файла и временем; всё машинно
проверяемое сверять с оракулом пазла (пример выше — именно так).

**2) Новых загадок в базе не нашлось — это оформленный негатив.**
Разобраны все 81 папка `puzzles/` и 55 папок `solved/` (дайджест `data/sweep_stage1_2026-10-18.txt`,
951 строка) и внешний реестр `@agntn/puzzles` (npm-пакет `_sources/external_catalogs_2026-10-18/agntn-puzzles.tgz`;
49 коллекций; «открытых» записей = записи без `status:` — 113, суммарно ~2426 в единицах призов,
разбор `data/agntn_unsolved_dump_2026-10-18.txt`). **Все открытые записи реестра уже имеют папку:**

| Коллекция agntn | Открытых | Соответствие в базе |
|---|---|---|
| `mineshop` (8,6125 ETH) | 1 | `puzzles/guntis-vitolins-metamask-8-6eth` |
| `real-big-block` (0,777 BTC) | 1 | `puzzles/aoi-nakamoto-quizchain-0-854btc` |
| `move-over-brokers` (3×0,002 BTC) | 3 | `puzzles/keir-finlow-bates-blockchain-book-600ksats` |
| `weave/3`, `weave/10`, `weave/11` | 3 | `arweave-puzzle-3/10/11` |
| `bits/71…bits/160` | 77 | `1000-btc-challenge-bitcoin-puzzle-tx` |
| `ballet`, `bitaps`, `bitaddress`, `zden`, `phy`, `walking-banks`, `hash-collision`, `brave-new-world`, `luckylurker`, `great-riddle`, `teikhos`, `school-of-bitcoin`, `seed-phrase`, `wealth-in-poetry`, `smith-lyle-moore`, `path-to-greatness`, `gsmg`, `rushwallet`, `genesis` | 1–4 | все папки на месте |
| `satoshi-birthday-quiz`, `mini`, `movie-enigma`, `hunting-time`, `satoshi-maze`, `grycoin`, `quizchain2`, `doges-gambit`, `coin-artist`, `picture-puzzle`, `proof-of-writing`, `trivia-brainwallet`, `80-bit`, `book-quiz`, `natasha-otomoski`, `wickex`, `iamabananaamaa`, `ledger-donjon`, `liberte-guidant-le-peuple`, `warp` | 0 | решены/истекли/CTF |

**3) Состояния призов подтверждены на цепочке 18.10.2026 (mempool.space / blockscout):**
- `14zMkTgaVXJcxdh4JdWi29MLRR44iUSG9W` (Real Big Block) — **77 700 000 сат, 1 tx, не тронут**;
- `17Y9czcbcCz433QXsy1SGQjwLb27BBtLLZ`, `1DZ5NbUwDgxeJkKhQLgYcUUX36PtYso1pm`, `19kkawFcg2U2s6vq368MXD7FJU9JZvRrjA`
  (keir EN_medium / EN_very_hard / IT_very_hard) — по **200 000 сат, не тронуты** (3 лота = 600 ксат);
- `13Cv6SXUnzGDT8JHqzzJ8xMPtsSdhJA4wd` (quizchain2/76) — **свипнута** (0);
- `0x9C2F44EFAd0c1E852a09dF9939e6DaF061140CaF` (mineshop/Guntis) — **8,6125 ETH, не тронуто**.

**4) Каталожная нестыковка (мелкая, ночью не правил):** папка
`puzzles/bitimage-kitten-photo-puzzle-95ksats` помечена «Статус: **open**», но это и есть **решённый**
`bitimage/kitten` (prize 0,00095133 BTC, solved 09.07.2019; совпадает с `MASTER_CATALOG.md:983-984`).
Открыт **сосед** — `bitimage/kitten-passphrase` = наша папка `corey-phillips-kitten-passphrase-1msats`
(0,010019 BTC ≈ $631, на 18.10 не тронут).

---

## 1. Что именно сделано

1. `data/sweep_stage1_2026-10-18.py` → `data/sweep_stage1_2026-10-18.txt` — по каждой из 136 папок:
   статус/приз/цепь/типы, первые строки README, хвост LOG, крупнейшие файлы. Прочитан целиком.
2. `data/sweep_stage2_2026-10-18.py` → досье по 20 крупным кандидатам (`sweep_stage2a/b_2026-10-18.txt`):
   README 45 строк + хвост LOG 12 строк + top-15 файлов.
3. `data/sweep_stage3_2026-10-18.py` → компактное досье (README 24 строки) ещё по 48 папкам
   (`sweep_stage3c/d/e.txt`) — добивает покрытие «нулевого» и «малоденежного» хвоста.
4. `data/agntn_registry_dump_2026-10-18.py` / `data/agntn_unsolved_dump_2026-10-18.py` — разбор npm-реестра
   `@agntn/puzzles` (в библиотеке «нет `status:`» = «не решено») и сверка с папками базы.
5. Проверка балансов 6 адресов (mempool.space, blockscout) — 18.10.2026.
6. Проверка зрения на эталоне `p1s1_max.png` (см. §0.1).

---

## 2. Пять новых целей (не заняты, не в dead-ends, приз живой)

Ранжировано по «дешевизне решающего шага × живой приз». Ни один slug не был под бронью
(`tools/claims.py status` — «СВОБОДЕН» у всех).

### №1. `rcodes-1tk3up2-500usd` — $500, рукописный шифр (не он-чейн!)
- Что осталось: **независимая визуальная транскрипция с внешними маркерами**. Это ровно тот шаг,
  который упирался в «модель не читает картинки». Файл уже на диске:
  `data/rcodes_cipher.jpeg` (855 КБ) — я его прочитал: заголовок `47` в кружке + `WIFA↑`; в конце 1-й строки
  `↓` и `10` в кружке; в конце 5-й — `7` в рамке; в начале 6-й — `M` в кружке; 6 строк, ~90 глифов, 13 пробелов.
- Оракул: нет (автор сознательно не даёт транскрипцию). Приз — обещание u/GentlyAbusive, **не эскроу**,
  проверка «Update 8/8/26: The code still remains unsolved».
- Риск: приз вне цепочки + автор пишет, что пазл спроектирован нерешаемым. Поэтому — «гипотеза стоит
  один вечер», а не «деньги в один клик».

### №2. `oobit-139-bitcoinpuzzles-io-0-01545btc` — 0,01545 BTC (~$973), он-чейн
- Адрес: `1KKtnqLdK17ndRRwF8zaKZH6FSkSmTN6fk`, путь m/44'/0'/0'/0/0.
- Что осталось: подтвердить модель «2 слова на клип» и добрать недостающие слова. В папке уже лежит
  **всё нужное локально**: `data/main/oobit139.png` (8,1 МБ), `num_crop_*.png`, `sky_*.jpg`,
  `data/tex/TeXiSNqmqvs.f399.mp4` (21 МБ) + листы кадров `data/tex/frames/sheet_*.jpg`.
  Известные слова: mushroom, elephant, deer, tortoise, coyote, bone, slab, stone.
- Оракул: мнемоника → m/44'/0'/0'/0/0 → адрес (совпадение = победа). Ничего не платить не нужно
  (платная подсказка ~$1,8 — вне правил без ОК).
- Почему «быстро»: это визуальный шаг по **уже скачанным** файлам, без сети.

### №3. `arweave-puzzle-3-1000ar` — 1000 AR (~$1810), он-чейн
- Что осталось: прочитать 8 картинок-подсказок «слоты» `data/ocp/clues/slot-1..8.png` (все на диске)
  и сверить с уже прогнанными 121 тыс. чтений (`data/01_tested.md`); оракул — точный адрес
  (`tools/ocp/oracle.py`), приз `wHP6OPG5GMF5dedo_CD8AAy6x8La-gfI5b5pk65Tx_0`.
- Почему «ново»: все прежние заходы читали слоты текстовыми моделями; визуальное чтение — дешёвый
  независимый канал, который раньше был закрыт.

### №4. `bitcoin-coders-puzzle-07-21ksats` — 21 000 сат (~$13), он-чейн
- Адрес/оракул: `bc1qj7xsxrlgmnnrqwvlakacc5yrh33h2n3xaa0m09`, оракул сертифицирован на 3 вектора BIP84.
- Два дешёвых шага: (а) визуально прочитать **недостающую 12-ю панель** из оригинала
  `puzzle-07-desafio.webp` (1088×1472, 1 бесплатный fetch с bitcoincoders.org); (б) **доказать/закрыть**
  specE-wide: 12/162 блоков уже пройдены, resume-файл `data/speewide2_done_blocks.txt` готов,
  CPU-MP ~49 с/блок → остаток ~2,2 ч = 16 прогонов по 8,3 мин (укладывается в лимит 15 мин).
- Почему стоит брать: это единственная цель, где решающий шаг **детерминированный и конечный** (да/нет),
  даже при малом призе.

### №5. `cardano-13373665-challenge` (Ch6) — ~12,8 ADA + яйцо 1337, он-чейн/кардано
- Что осталось: закрытая локальная стего-проверка Ch5-JPEG — `steghide` с пустым паролем на копиях
  картинки с нескольких IPFS-шлюзов (сравнить байты) и `jsteg`/F5 на той же JPEG. Работа целиком локальная,
  ответ однозначный.
- Почему в списке: самый дешёвый «закрывающий» шаг после №4; приз мал, поэтому ставить не первым.

**Отложенный фаворит (не в пятёрке, но заряжен):** `crypto-puzzles-2018-puzzle-2-0-05eth` — после проверки
зрения я повторил ключ P1 глазами; для P2 остаётся интерпретация жирной демо-грамматики (шов по обеим осям,
зеркало «MIRROR», половинки глифов, колонка `7623804`). Qoder закрыл «ИИ-чтение 64 hex из видео P2»
отрицательно и понизил приоритет; я это подтверждаю: пер-секундные max-проекции P2 действительно **пустые**
(проверил визуально `data/f720/p2_persecond_max.png` и `p1_persecond_max.png`).

---

## 3. Что НЕ является целью (чтобы следующий агент не тратил цикл)

- **Все «массовые переборы» — закрыты**: Genesis 78,3 млн (сертификат), BLM 479 млн + 7,2 млрд GPU,
  Guntis ~70 млрд, Oobit 652 тыс. + 207 тыс., SLM 15 248 наборов, Arweave #3 121 тыс., NIST 877 млн SHA-1.
- **Исчерпано/инсайт-барьер**: `gsmg-io-5btc-puzzle` (оси A/A2/B/C закрыты отрицательно), `9vw04-gem-finder`,
  `arweave-puzzle-11-1eth`, `ktimesg-phy-challenge`, `smith-lyle-moore-hunt-2`, `zden-haluska-halv` — под
  бронью Qoder (не трогать), `wealth-in-poetry`, `bitaddress-bip38-giveaway` — под AutoClaw, `aoi-nakamoto-quizchain`,
  `luckylurker-vault-2`, `tumblecaesar-1000algo` (нет Algorand-адреса), `groestlcoin-puzzle-1000grs`
  (нужен архив Discord, 2-й этап), `bitaps-shamir-challenge` (125 бит), `ballet-bobby-lee` (недостижимо),
  `nuaza`/`1btc-brainwallet-defcon-2014`/`keir` (нужна бумажная книга — материал недоступен),
  `1000-btc-challenge` (адреса #71+ требуют >2^70, локально нереально), `peter-todd-hash-collision`
  (коллизии), `wif500` (2^70), `trezor-bug-bounty` (исследование, не пазл), `timeless-1000-random-seed` (24!).
- **Физические/оффлайн**: `veil-hunts`, `krypto-chase`, `gold-crystal`, `lunarcrush-lunar-vault`,
  `bitcoin-treasure-hunt-book-series`, `mapnificent` (ждём результат), `actuarial-science-nft-hunt`
  (нужен сбор 12/100 NFT; источник не подтверждён).
- **Без приза** (интернет-мистерии): `cicada-3301`, `ghostnet`, `marianas-web`, `uvb-76`, `11b-x-1371`,
  `973-eht-namuh-973`, `lake-city-quiet-pills`, `john-titor`, `webdriver-torso`, `max-headroom`,
  `lost-media-bfi`, `markovian-parallax`, `unfavorable-semicircle`, `valor-por-tamaulipas`, `adam-2-0`,
  `neuro-sama-arg`, `minecraft-arg`, `project-architeuthis`, `purebasic-t85211` (внешняя инфа).
- **«Не он-чейн / не пазл»**: `rcodes-1ojeu3c-5usd` ($5), `rectorsquid-arrow-puzzle-50usd` (оракул автора),
  `coin-games-weekly-banknote` (свипнуты), `exitonly-challenge-14` (неэкономично), `qday` (закрыт),
  `cryptopuzzles-eth-easycore-numbers` (сайт мёртв с 2019, выводы со адресов сделаны — денег нет).

---

## 4. Артефакты этого прохода

- `data/sweep_stage1_2026-10-18.{py,txt}` — полный дайджест 136 папок.
- `data/sweep_stage2_2026-10-18.{py,txt}` + `data/sweep_stage2a_2026-10-18.txt`, `data/sweep_stage2b_2026-10-18.txt`
  — досье 20 крупных кандидатов.
- `data/sweep_stage3_2026-10-18.py` + `data/sweep_stage3{c,d,e}.txt` — досье ещё 48 папок.
- `data/agntn_registry_dump_2026-10-18.py`, `data/agntn_unsolved_dump_2026-10-18.py` + вывод
  `data/agntn_unsolved_dump_2026-10-18.txt` — сверка внешнего реестра с базой.
- Ссылки (все проверены 18.10.2026): https://mempool.space/api/address/14zMkTgaVXJcxdh4JdWi29MLRR44iUSG9W ,
  …/17Y9czcbcCz433QXsy1SGQjwLb27BBtLLZ , …/1DZ5NbUwDgxeJkKhQLgYcUUX36PtYso1pm ,
  …/19kkawFcg2U2s6vq368MXD7FJU9JZvRrjA , …/13Cv6SXUnzGDT8JHqzzJ8xMPtsSdhJA4wd ,
  https://eth.blockscout.com/api/v2/addresses/0x9C2F44EFAd0c1E852a09dF9939e6DaF061140CaF ,
  https://puzzles.agntn.dev/collections/real-big-block , https://puzzles.agntn.dev/collections/mineshop ,
  https://bitcoincoders.org/desafios/puzzle-07 , https://bitcoinpuzzles.io/en/puzzles/139 ,
  https://www.reddit.com/r/codes/comments/1tk3up2/ .
- Записи в LOG пазлов: `crypto-puzzles-2018-puzzle-2-0-05eth/LOG.md` (проверка зрения на эталоне),
  `rcodes-1tk3up2-500usd/LOG.md` (визуальная транскрипция маркеров).
- `MASTER_CATALOG.md` — короткий блок «Возможность чтения изображений / сводный проход».

## 5. Что предлагаю делать дальше

Начать с **№1 `rcodes-1tk3up2-500usd`** (самый самодостаточный шаг: картинка на диске, маркеры я уже вижу)
или с **№2 `oobit-139`** (лучший он-чейн EV из свободных, ~$973, всё локально).
Перед стартом обязателен GitHub-шлюз: `python tools/github_intake.py run <slug> --agent BigPickle`
(у 73 из 80 активных папок шлюз ещё `pending`), затем бронь `claims.py acquire` и запись
гипотезы+оси в `LOG.md` до первого прогона.
