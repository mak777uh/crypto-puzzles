# LOG.md — журнал пазла «GSMG.io 5 BTC Puzzle»

> Как вести: см. `../../AGENT_INSTRUCTIONS.md`. Каждый агент при первом заходе добавляет блок снизу:
> дата/время, кто он (агент/модель/среда), что делал, что нашёл (включая отрицательные результаты!),
> какие скрипты и артефакты создал. Только дописывать; чужое не переписывать и не удалять.
> Прорывы и актуальное состояние — в `README.md`; здесь — полная хроника.
> Ограничения: приз не тратить, приватные ключи — только в `.secret/`, к публичным каналам (Telegram Jrk и т.п.) не писать.
> Бэкфилл истории выполнен 17.10.2026 (Qoder) из `README.md` (проходы «часть 1–5») и форка Naddiseo.

## 2020-04-07 — автор (рождение пазла)
- Результат: vanity-адрес `3GSMG24TujqfMJG1kQoBX18DzJHQLeJYMK` → 9 planted-адресов (6 = sha256 ответов стадий; raw/reversed bit-image URL; `1NULY7DhzuNvSDtPkFzNo6oRTZQWBqXNE9` = «третья дверь» без известного preimage). Пароль по авторской конвенции = `sha256(X).hexdigest()` (для planted-адресов стадий 2019–2020!).
- Контекст фаз (walkthrough Naddiseo): фаза 0 — спираль, LSB→'gsmg.io/theseedisplanted'; фаза 1 — Logic «The Warning»; фаза 2 — Mr Robot (causality‖Safenet‖Luna‖HSM‖11110‖0x736B…‖FEN); фаза 3 — Фреско+Алиса+Гейзенберг; фаза 3.2 — EBCDIC-1141, шифр «thematrixhasyou», VIC («one for one, four for one»), алфавит «fubcdora/lethingkymvpszjqwx.».
- Ссылки: README «How the GSMG puzzle works»; `naddiseo-fork/` (архив).

## 2021-03-01 — автор (подтверждение)
- Результат: «prime part» подтверждён («You are at the prime part already?? … shouldn't have said that») + «Ancient spelling… one of the many typos» — опечатки незначимы.

## 2021-05-06 — автор (официальная инструкция)
- Результат: «hash the text on the image» — основа находки 89727 (URL SalPhaseIon-страницы = sha256('GSMGIO5BTCPUZZLECHALLENGE' ‖ '1GSMG1JC9wtdSwfwApgj2xcmJPAwx7prBe')).

## 2021-12-02 / 2021-12-25 — автор (двери и зануление)
- Результат: «There is Another DOOR» (2021-12-02) — за видимым этапом существует «спасение». Хинт 2021-12-25: (1) праймы обязательны для продвижения; (2) «some characters need to be 'zeroed out'» (занулить, не удалить).

## 2023-02-23 — автор (декодированный бинарный хинт)
- Результат: «yellow blue primes matrix sumlist last words before archichoice **yinyang** we wont give away **thepassword** its in front of your eyes but youre not seeing it **very last step is a true give away promised**». Новые токены: `yinyang`, `thepassword`; похоже на карту оставшихся компонент.

## 2023-08-03/06 — автор + Jrk (статус)
- Результат: автор «the hardest part is done»; «Once you hit a "ying yang", you'll be able to solve it the same day» (2023-08-06-3). Jrk: «Has anyone passed the salvation part?» — «Partly.»; монологи Jrk про «main price» (отделён от 5 BTC) и «last scene of Mr. Robot».

## 2025-08 — комьюнити (#55)
- Результат: jackdevs66 заявил дешифровку «Cosmic Duality» (сайтовый блоб salt 2d3f6fe0… = наш chain3). Naddiseo разобрал: валидный PKCS7 = 1/256 false-positive; round-trip — тавтология; энтропия 7.87 без структуры. **Доктрина (#55)**: «without verifiable structure, a decryption is indistinguishable from failure» + прецедент: каждый реальный шаг давал текст/формат.

## 2026-01-01 / 2026-07-12 — автор (хинты)
- Результат: «Happy new year! … here's a "tiny hint"» (бинарник). Discord 2026-07-12: «My close friends have the best chance of solving it … NOTE: that is a hint» + **«The "5" btc was never the actual prize. That was only a tiny fraction.»** Согласуется с yourlife-монологом («worth hundred fourty of the investment»).

## 2026-09-05 — комьюнити (вердикты и правило #110)
- Результат: **#111 (0xyph3r) — публичный отзыв претензий**: таблица энтропии (phase3/3.2 = 5.78–6.06 с ASCII-ранами 292/332 символа; gros/1327B/chain4 = 7.84–7.92, раны 6–9) → ветка «1327 B / step after Cosmic Duality» переклассифицирована как **фантом**; отозваны «First Half formula» и Blocker-2.
- Результат: **правило #110** (HassanVaezzadeh): cosmic_correct.bin (= chain3_1327, sha `4f7a1e4e…`) → 39×32-байт блока → payload = block[16:32] ‖ BE32(X) → P2PKH. Воспроизведено нами байт-точно (X=4 → `1Bwq9PKdsrafTFhzDeFzBBk9NF5N8NZCw9`, X=10 → `1Hby7BYWaQmuUE57761xrPjJ9rN3d58V8Y` — оба вектора #110 ✓).
- См. также: #104 (Naddiseo): «после SalPhaseIon интернет не нужен» (всё оффлайн).

## 2026-10-17, часть 1 (Qoder) — балансы, оракул, лиды
- Делал: Qoder. Проверка балансов (blockstream.info), фиксация оракула и уже проверенного (чтобы не дублировать прогоны).
- Результат: приз `1GSMG…` = **1.25649674 BTC** (funded 8.76 BTC / 129 tx; spent 7.50 BTC / 6 tx); `17ucy1K9Z…` (халвинг-отделение) = 3.75055856 BTC, spent 0. P/2 uncomp `16eEXbSuKN8tvcos1iKjDju6dAaWWRBMEs` и 2P uncomp `1KHMK2C8uBptRz67FbrXy43yHzhZG16Hbm` — по 5000 сат, НЕ потрачены (пыль автора «neighbors, half and double»). Приз жив.
- Уже минус (не повторять): 256-символьные редукции 335,7 млн; direct-перебор large blob 59k/59k; текстовые пароли против 80-байтовых блобов ≈62,6 млн; «Cosmic Duality»-артефакт; plain rockyou.txt (~14,3 млн) — НЕ завершён.
- Артефакты: README «Обновление (2026-10-17, Qoder)».

## 2026-10-17, часть 2 (Qoder) — цепочки chain1–4 воспроизведены байт-в-байт
- Делал: реконструкция из сырых артефактов (`salphaseion-live/wayback_20260924.html`, `phase322_b64.txt`).
- Результат: **все KDF = EVP_BytesToKey MD5**; на финальных 80-байтовых блобах пароль — **СЫРАЯ ASCII-строка** (не sha256-дайджест!). Поправка к прежним записям комьюнити.
  - chain1: pw = `matrixsumlistenterlastwordsbeforearchichoicethispasswordmatrixsumlist` → K_C1/K_C2/E_C; sha256(79B) = `1449a217…`.
  - chain2: pw = WIF(K_C1) `5K2byJMssxFKuTgnk9YQjpBz5FhkwwF2LaZoAyTus8HjGEpz8AT` → K_S1/K_S2/E_S; E_S входит в пароль chain4.
  - chain3: pw = XOR sha256 7 токенов = `a795de11…`; выход 1327 B, sha = `4f7a1e4e…` (точное совпадение с анкором комьюнити).
  - chain4: mask XOR `b657264f2f6e6921` → salt `5bbd88ac…`; pw = E_C‖E_S‖E_B[:2]; выход 1151 B, sha = `e4269ed5…` — точное совпадение. Выход: b'+-' + равномерный шум.
- Минус-свипы: 5655 целевых кандидатов против pubkey приза; 702 структурных против 9 planted + приза + 17ucy; 20 XOR-треугольников; ~48 трансформаций 79B против анкора #82 — всё 0.
- Артефакты: README «часть 2»; скрипты в puzzle-research/gsmg/ (при переносе — в `data/`).

## 2026-10-17, часть 3 (Qoder) — комьюнити-верификации
- Результат: #91 (12 адресов) — частично невоспроизводим (полный список не публиковался; под правилом #110 воспроизводятся только 2 из 4 свидетелей); cc[833:865] лид — энтропия ровно 5.000 = артефакт; **анкор `e2590f15…` закрыт** (#88: non-canonical/refuted; канонический = наш `1449a217…`).
- Результат: треугольная батарея (tri_battery.py + battery2: XOR-треугольники, прайм-извлечение, ±-скалярные цепочки, Паскаль) — полный негатив.
- Результат: h160 приза подтверждён: `a9553269…` = хэш НЕСЖАТОГО пабкея (проверять финальную находку по uncompressed d·G!).
- Артефакты: README «часть 3».

## 2026-10-17, часть 4 (Qoder) — форк Naddiseo; линии закрыты
- Делал: скачал github.com/Naddiseo/gsmgio-5btc-puzzle → `naddiseo-fork/` (README-walkthrough, 34 хинт-картинки 2020→2026, salphaseion.ipynb, unverified/*, akavaru_115.txt).
- Результат (закрыто): **линия 89727** — верифицирована байт-точно; страница неизменна с 2023 (wayback 2023-06-01 == 2026-09-24, токен-в-токен); домен припаркован с июля 2026; #116 закрыт (лог Manus = LLM-пересказ); #109 — репо 404; #115 (BYTENPHASE/akaVARU) — 3–10 символов за раз = realm of coincidence; аудио-лид «HASHTHETEXT» — известный шаг Decentraland, не новая загадка.
- Новые факты: cosmic-duality-book.png = обложка Time-Life «Mysteries of the Unknown»; «YourLife»-монолог (полный текст `naddiseo-fork/nadd_unverified/phase3.2_1141.md`): «...take the private key youve earned it ... reinserting the prime basics after which you will be required to select from over twenty three ciphers sixteen encryptions and or seven intertwined passwords ... bruteforcing might be required».
- Артефакты: `naddiseo-fork/` (в корне папки пазла).

## 2026-10-17, часть 5 (Qoder) — хинт-картинки, структура SalPhaseIon, seg0-негатив
- Результат (структура SalPhaseIon, по живой странице): ta0 = 1075 символов: [0:91] «dbbib…» (a–i) ‖ [91:195] ab→`matrixsumlist` ‖ [195:765] «faed…» (570, a–i) ‖ z ‖ segA(63 цифры)→`lastwordsbeforearchichoice` ‖ segB(29)→`thispassword` ‖ «shabef» ‖ `ourfirsthintisyourlastcommand` ‖ b64 ‖ ab→`enter` ‖ b64 ‖ «shabef» ‖ «anstoo». **Наш «seg0/661 символ» = dbbib(91)+faed(570)** — без буквы 'o'.
- Минус: D/F как base-9 / decimal-bigint / чёт-нечёт / base36 / блок-суммы → шум; seg0 «нули на прайм-позиции» (insert/replace/pad по простым индексам, зануление цифр, квадрат-мод-10) → читаемого ASCII нет; «matrixsumlist»-матрицы (все прямоугольники × 4 сборки, 1316 кандидатов) → шум.
- Лиды v2: (1) чтение chain4-выхода (1151 B) 40+ способами; (2) preimage «третьей двери» `1NULY7DhzuNvSDtPkFzNo6oRTZQWBqXNE9`; (3) ВСЕ известные пароли против ОБОИХ 80-байтовых блобов с MD5-KDF и СЫРЫМИ паролями (прежние прогоны комьюнити шли на sha256-дайджесты — объясняет их провал); (4) replay динамических кандидатов из 213 historical scripts (фикс прежнего бага фильтра); (5) идентифицировать авторский инструмент; (6) esrever на остальных объектах; 29 потерянных букв как отдельное сообщение.
- Артефакты: `gsmg_seg0_zeros.py`, `gsmg_seg0_matrix.py` (workspace salphaseion-live), `page_SalPhaselonCosmicDuality.png` (в naddiseo-fork).
- Ссылки: README «часть 5»; хинты 2021-12-25 (zero-out), 2023-02-23 (yinyang), 2023-08-06-3.

## 2026-10-17 — заведение этого журнала
- Делал: Qoder.
- Результат: LOG.md создан (правило каталога от 17.10); история выше — бэкфилл из README. Дальше каждый агент дописывает свои заходы сюда.

## 2026-10-17, часть 6 (Qoder) — chain4 (1151 B) разобран: статистически шум, лид №1 закрыт
- Делал: Qoder. Загрузил локальный `chain4_1151.bin` (sha256 `e4269ed5…`, 1151 B), написал `scan_chain4.py`:
  проверка против адресов приза `1GSMG1JC9wtdSwfwApgj2xcmJPAwx7prBe` и «третьей двери»
  `1NULY7DhzuNvSDtPkFzNo6oRTZQWBqXNE9` (P2PKH, compressed+uncompressed).
- Что проверено (4826 дериваций, 2413 уникальных ключей, 0 совпадений):
  - все 32-байтовые срезы со всех 1120 смещений, прямой и обратный порядок;
  - sha256/sha256d/sha512[:32]/sha512[-32:]/sha3/blake2b/blake2s/ripemd160 от всего блока и от его
    reverse/bit-reverse/nibble-swap/invert;
  - XOR всего блока с K_B1/K_B2/K_H1/K_H2 (циклично) + sha256, а также срезы XOR-потока;
  - блочные структуры 16/32/64 B (прямые блоки + sha256 блоков), interleave/deinterleave чёт/нечет,
    склейки ev+od / od+ev, срезы даже/нечёт.
- Структурный анализ: энтропия 7,837 бит/байт; хи-квадрат 253,1 при df=255 (идеально для случайного);
  доля единичных бит 0,5004; равномерные распределения по mod 2/4/8/16/32/64/128; 254 уникальных байта;
  все 35 32-байтовых блоков уникальны; zlib/gzip не распаковываются; читаемых ASCII-строк нет
  (только случайные 4–6-символьные обрывки); первые два байта `+-` — случайная пара (p≈1/65536, не значимо).
- Вывод: **выход chain4 неотличим от равномерного случайного шума**. Это подтверждает вердикт комьюнити
  (#111/#55: энтропия 7,84–7,92, ASCII-раны 6–9) — цепочка 1–4 воспроизводится точно, но её конец —
  тупик/приманка, а не 32-байтовый ключ. Лид №1 «читать chain4 40+ способами» закрыт.
- Что это меняет: приоритет внутри GSMG переходит к лидам №2–№5: preimage «третьей двери» (идеи, не перебор),
  MD5-KDF + сырые пароли против обоих 80-байтовых блобов, replay динамических кандидатов, авторский инструмент.
- Артефакты: `puzzle-research/gsmg/salphaseion-live/scan_chain4.py` (локально), копия — в `tools/` папки пазла.
- Ссылки: README «часть 6»; OCP GSMG README (community verdict #111), issue #55.

---
<!-- добавлено при синхронизации из облачной копии папки (экспорт Drive 2026-10-17T13:05:50Z) -->

## 2026-10-17 14:30 MSK — Hark (облачный агент, проект «GSMG.io: пазл на 1,256 BTC») — chain4 и seg0: структурный реверс
- Делал: независимо воспроизвёл chain3→chain4 из wayback-снимка 2026-09-24 (4536 B): chain3 1327 B sha `4f7a1e4e…` ✓, chain4 1151 B sha `e4269ed5…` ✓.
- Результат (chain4 = фантом отбора, доводы):
  1. Маска `b657264f2f6e6921` = mystery[:8] XOR b'Salted__' — тавтология: заголовок «Salted__» получается из ЛЮБЫХ 8 байт, salt `5bbd88ac…` произволен.
  2. Паддинг расшифровки = один байт 0x01 (raw tail `…578a1901`). Замер: 20 000 случайных 32-байтовых паролей на том же ct → 81 валидный PKCS7 (≈1/247).
  3. Из 2100 «естественных» вариантов пароля (перестановки E_C/E_S/E_B/E_H по 2–4, префиксы 16..full, hex-формы) валидный паддинг дают 4 (CSB:32, CSBH:32, CBHS:60, BCSH:56) при ожидании ≈8,5 — найденный пароль статистически неотличим от случайного попадания.
  4. Выход vs 300 образцов urandom(1151): энтропия 7.837 (медиана 7.833), χ² 253 (медиана 252), ASCII-ран 6 (медиана 6), zlib 1162 (=1162), равенства на лагах 1–64 в пределах ожидания, дублей 32-байтовых блоков 0. «+-» в начале — шанс ≈14%. Структуры нет. Согласуется с #111 и доктриной #55.
- Результат (seg0 = dbbib[0:91] + faed[195:765], 661 цифра 1–9):
  - Частоты НЕ равномерные: χ²(8 df) = 40 (D), 44 (F), 42 (D+F), p<1e-5; в F перекос на 'g' (107 vs 63 ожид.), в D — 'b' 25/91 и 'e' 18/91. Значит, это НЕ десятичная/9-ричная запись случайного bigint (та была бы равномерной). IoC пар/троек F лишь чуть выше равномерного — на текст под простой подстановкой тоже не похоже.
  - Полный перебор инъективных отображений букв a–i в цифры (base-10: все 10·9! = 3,6 млн карт, т.е. включая «зануление» любой одной буквы в 0; base-9: все 9·8! карт) × сегменты D, F, D+F → bigint → bytes, порог печатаемости >60%: F и D+F — 0 попаданий; D (38 байт) — максимум 0.76 = шум (21 708 «хитов» только на коротком D, ни одного читаемого). Время 210 с.
- Итог: линия chain4 закрыта как фантом; seg0 как bigint-кодировка (любая перестановка цифр, base 9/10) — 0. Открытое: неравномерность seg0 (перекос 'g') — признак, что seg0 это не число, а иная схема (координаты/индексы в чём-то? позиционный шифр?). Ключей и адресов не найдено.
- Артефакты (в воркспейсе проекта Hark, не на Drive): rebuild.py (chain3/4 из wayback), c4stats.py (статистика + false-positive замер), seg0perm.py (+ seg0perm.out).

---

## 2026-10-17 — Big Pickle (OpenCode/Windows) — GSMG: seg0 класс «прайм/не-прайм» ×2, K-значения → адреса
- Контекст: пользователь выбрал GSMG как следующую цель. При подъёме состояния выяснилось, что **chain4 закрыт** (Qoder «часть 6» + Hark, см. выше) — строка «разобрать 1151 B» в `QUICK_WINS_2026-10-17.md` устарела (фантом). Дублировать не стал.
- Что делал (новое, чего нет в README/LOG):
  1. **Локальная независимая экстракция ta0** из `naddiseo-fork/nadd_salphaseion.txt` → `tools/gsmg_seg0_fresh.py`. Проверка: `len(ta0)=1075`, `D=ta0[0:91]` (алфавит a–i), `ab1=ta0[91:195]` (a/b) декодируется ровно в `matrixsumlist`, `F=ta0[195:765]` (a–i), `segA` → `lastwordsbeforearchichoice`. Экстракция подтверждена и воспроизводима на Drive без воркспейса Qoder/Hark.
  2. **Классовые (неинъективные) прайм-семейства** на D/F/D+F — под хинты «prime numbers … required to proceed» + «some characters need to be 'zeroed out'»: (a) карта цифра→бит по простоте (2,3,5,7=1; 1,4,6,8,9=0) и её дополнение, big-endian с паддингом до байта, + реверс; (b) зануление всех НЕпростых цифр в `o`, и отдельно всех простых, → decimal-bigint → bytes; (c) `esrever` на D/F/D+F. Всего 21 блоб.
     - Результат: **негатив**. Максимум печатаемости 0.45 (на 38-байтовом D, шум-пол 0.35–0.5). Ни один блоб и ни одно 32-байтовое окно (прямое и реверс) и ни sha256(блоб) не даёт ключа к адресам приза/третьей двери. Это дополняет инъективный перебор Hark (3,6 млн карт): неинъективные класс-карты тоже 0.
  3. **K-значения цепочек → адреса** (`tools/gsmg_chain_keys_to_addrs.py`): 8 K (K_C1/C2, K_S1/S2, K_B1/B2, K_H1/H2) × {raw, sha256, sha256d, modN} × {compressed, uncompressed} = 64 вывода против 8 целей (приз, 17ucy, 1NULY, P/2 16eE, 2P 1KHM, Half 1JG648, BetterHalf 145ZQ, vanity 3GSMG). **0 совпадений.**
     - Смысл: строчка VIC-декода «PRIVATE KEYS BELONG TO HALF AND BETTER HALF» **не** означает, что K_B*/K_H* суть ключи этих адресов напрямую (даже через sha256d/modN). Значит, перед «Half/BetterHalf» стоит ещё один неоткрытый шаг — либо они про другие адреса.
- Итог прохода: GSMG требует не перебора, а недостающей идеи/инструмента автора (лиды v2 №2 preimage третьей двери, №3 тулчейн, №4 «инструмент автора», №5 29 выпавших букв). Оба новых теста чисто негативны; ничего не сломано, два пробела закрыты.
- Артефакты: `tools/gsmg_seg0_fresh.py`, `tools/gsmg_chain_keys_to_addrs.py`, `tools/gsmg_transcript_struct.py`, `tools/gsmg_ta0_tokens.py`.

---

## 2026-10-17 — Big Pickle (OpenCode/Windows) — GSMG: структура SalPhaseIon как транскрипт интерактивного инструмента
- Что делал: углубился в узел «опознать инструмент автора» (по выбору пользователя).
- Структура ta0 (1075 токенов по 1 символу):
  - part0 0..765: data-блок (D + ab1 + F), в нём `ab1` → `matrixsumlist` (a/b), `ab2` (конец part4) → `enter`.
  - part1 766..829: segA с 'o' → `lastwordsbeforearchichoice` (decimal-bigint → hex → ascii)
  - part2 830..859: segB с 'o' → `thispassword`
  - part3 860..958: `s h a b e f o u r f i r s t h i n t i s y o u r l a s t c o m m a n d U 2 F s ...` → читается `shabefourfirsthintisyourlastcommand` + base64 `U2FsdGVkX186tYU0hVJBXXUnBUO7C0+X4KUWnWkCvoZSxbRD3wNsGWVHefvdrd9` (обрезан до 59 байтовой репрезентации?)
  - part4 959..1075: `a b b a a b a ... ab2 (enter)` + base64 `QvX0t8v3jPB4okpspxebRi6sE1BMl5HI8Rku+KejUqTvdWOX6nQjSpepXwGuN/jJ` + `s h a b e f a n s t o o`
- Главная фраза: `our first hint is your last command` (после `shabef`). Это прямо намекает: **первый хинт автора — это «твоё последнее командование»**. Но в контексте именно SalPhaseIon-транскрипта это значит «посмотри, что ты только что ввёл/что было последней командой».
- Обнаружено два `shabef`-окна: одно перед английским текстом, другое в конце (part4 после base64b) → видимо, `shabef` = маркер `sha256` в обозначениях автора (b=2,e=5,f=6).
- Base64-блоки (AES-подобные): первый 76-char base64 в part3, второй 66-char в part4 — их границы уже разобраны в nadd_salphaseion.ipynb (отброшен хвостовой `shabefanstoo` и сделан корректный split).
- Итог: SalPhaseIon — документированный в naddiseo-форке **транскрипт**.
- **Попытка расшифровки SalPhaseIon AES-blob**: объединил base64 из part3+part4 → `data/salphaseion_aes.b64`. Пробовал OpenSSL и EVP_BytesToKey (MD5, 1 round) со штатными и транскрипт-вариантами — без печатаемого результата.
- Линия «инструмент автора»: пользователь выбрал её как приоритет. Структурировал ta0; проверил несколько гипотез (в т.ч. «your last command» → Phase 0). Поиск в naddiseo-форке не выявил явного имени инструмента. Пробовал EVP_BytesToKey (MD5) с разными IV — без читаемого результата. Без новых данных линия ограничена; bounded-подход исчерпан.
- Артефакты: `tools/gsmg_transcript_struct.py`, `tools/gsmg_ta0_tokens.py`, `data/salphaseion_aes.b64`, `data/salphaseion_aes.dec`.


## 2026-10-17, 17:29 — AutoClaw (модель zai_glm-5.3-flash, среда AutoClaw/Windows, проект «Default»)
- Представляюсь: работаю по протоколу AGENT_INSTRUCTIONS.md; сессия — математические лиды GSMG без переборов.
- Делал: лид OCP #6 «read the 29 dropped letters as their own message» — первый полный проход.
- Результат: **лид закрыт как отрицательный.** Независимо воспроизведён Bifid-декод FAED570
  (квадрат DBIFHCEG, алфавит без J, координаты вперемешку, период 570) → выход начинается с `BTCSEED`
  (совпадает с сертификатом OCP #5); нечётный поток 285 букв, минус I/O = ровно 256 символов над
  23-буквенным алфавитом (сертификат OCP #6 подтверждён). **29 выброшенных букв = `OOIIOOOIIOOIOIIOIOOOOIOIIOIOI`**
  (впервые задокументированы дословно). Против сертифицированного оракула OCP прогнаны 37 кандидатов
  (сырые I/O, бинарный текст в 2 полярностях x 2 направления, dec/hex/padded, 5-битные группы,
  run-length, base-4 пары, esrever-варианты kept256/odd285/even285/out570) — **0 совпадений**;
  морзе-сегментация (~9 млн вариантов до cap) — ни одного легибельного фрагмента.
  Дополнительно: чётный поток выхода — 285 букв над алфавитом {B,C,D,E} (кватернарный), 2-битные
  чтения непечатаемы — отдельный недокументированный объект, флаг будущим агентам.
- Влияние: лид #6 из ranked-leads исключён (kill-критерий OCP выполнен). Картина пазла не изменилась,
  приз жив (1.25649674 BTC).
- Артефакты: `tools/gsmg_s570_bifid_lead6.py`, `data/s570_bifid_2026-10-17.txt`,
  `data/lead6_29_dropped_letters_2026-10-17.md`.
- Ссылки/доказательства: OCP leads.md §6 и README п.5–6; вход — akavaru_115.txt (FAED570);
  оракул — ocp-gsmg/tools/oracle.py (selftest OK).


## 2026-10-17, 17:41 — AutoClaw (модель zai_glm-5.3-flash, среда AutoClaw/Windows, проект «Default»)
- Делал: лид OCP #1 «третья дверь» — закрытие найденной дыры в негативах OCP: §16 гонял перестановки 7 ЧАСТЕЙ phase-3, §19 — слова по 1–5; **перестановки самих 7 токенов цепочки Cosmic Duality против посаженных адресов не тестировались**. Плюс мои новые объекты (dropped29) и даты/challenge против двери.
- Результат:
  - Конвейер построений сертифицирован: восстановлены все 5 известных preimage (causality→1Jqq37, flower→1AD2wfw, jacquefresco→1K23RS, raw_left→NEO1, bits192_left→NEO2). Уточнение конвенций: bits-reversed = разворот 192 бит самих байт строки с последующим нулевым паддингом слева (не 256-битный разворот).
  - **Батч 44,326 ключей**: перестановки 1–7 токенов (мультимножество, 2 разделителя × 3 регистра), перестановки 6 уникальных токенов, все чтения dropped29 (бинарный текст 2 полярности × 2 направления, dec/hex/padded), 23 даты × 3 формата, challenge-строки (±prize/±vanity, реверсы), словарь токенов/ответов ≤32 байт — построения sha256 / raw_left / raw_right / bits192_L / bits192_R / bytes_rev, сравнение compressed+uncompressed против двери и всех посаженных + приз.
  - **0 новых попаданий** (все 5 — известные witness-ы). Семейство закрыто.
  - **Even-поток Bifid-выхода** ({B,C,D,E}, 285 букв): все 2-битные отображения (24 перестановки × 2 полярности) → все 256-битные окна (31 сдвиг) как сырые ключи — 15,120 ключей, **0 попаданий**; 2-битные чтения непечатаемы (0.32–0.37).
  - **Лид OCP #3 (replay 213 scripts) недоступен из публичных материалов**: в репо OCP 19 файлов (без скриптов), клон puzzlehunt/gsmgio-5btc-puzzle — 7 файлов (README + картинки). Корпус 213 скриптов существует только в частном исследовании (review 2026-07-28); для реплея нужен доступ к нему.
- Влияние: дверь остаётся открытой; текстово-токенное семейство и даже-поток закрыты. Из ranked-лидов актуальны: #4 (идентификация инструмента — меню <12 шифров) и #3 (требует непубличный корпус).
- Артефакты: `tools/gsmg_thirddoor_batch_2026-10-17.py` (воспроизводимый, witness-и внутри).
- Ссылки/доказательства: data/planted-addresses.csv (OCP), analysis/tested.md §16/18/19, analysis/leads.md §1.


## 2026-10-17, 17:50 — AutoClaw (модель zai_glm-5.3-flash, среда AutoClaw/Windows, проект «Default») — лид №4, меню-проход
- Делал: идентификация инструмента + прогон меню классических шифров по открытым объектам (лид OCP #4).
- Идентификация: конвенция OCP («Bifid без параметра периода = полная длина сообщения», квадрат «ключ + алфавит с удалённой буквой») совпадает с **Boxentriq** (boxentriq.com/ciphers/bifid-cipher: «Period length Optional. Leave blank to use the full message length», J сливается с I, квадрат строится «ключ + остаток алфавита»). Мой локальный Bifid с этими конвенциями воспроизводит BTCSEED-выход пазла байт-в-байт. Оговорка: имя инструмента в частном исследовании OCP может отличаться (у Boxentriq период — опциональное поле, не отсутствие параметра).
- Меню-проход: объекты kept256 / odd285 / even285 / bifid570 × ключи {DBIFHCEG, THEPROBLEMIS, MATRIXSUMLIST, ENTER, BTCSEED, SECONDANSWER, GSMG, нет} × шифры {Caesar ±3, Atbash, Affine 5/8±inv, keyed substitution ±inv, Vigenère dec/enc, Beaufort, Vigenère-Autokey dec/enc, Bifid} → **360 выходов**.
- Проверки каждого выхода: (а) пароль Dualite-блоба (2448 B, salt eefc4c5befc1656a, извлечён из README клона сообщества — скопирован в data/) и блоба страницы phase23 (4112 B, salt 9fbc451d13d071f4 — тоже в data/), EVP sha256/md5, формы «sha256(X).hexdigest()» и «raw X»; (б) малый блоб через оракул OCP; (в) третья дверь (sha256/raw_L/bits192).
- Результат: **0 совпадений**. 10 валидных PKCS7-паддингов — ложные (математическое ожидание ~10 при ~2880 расшифровках; plaintext нечитаемы, без вложенного Salted__). Читаемых фрагментов нет. Оракул малогоблоба — мимо. Третья дверь — мимо.
- Влияние: меню-подход в объёме «классическая подмена/Вижинер-семейство с ключами пазла» закрыт. Остаются непокрытыми: транспозиции с параметрами (columnar/route/scytale), Playfair/Four-square (диграфы), Trifid/ADFGX/ADFGVX (фракционирование), Морзе-семейство (Pollux/Morbit) — и сценарий, что у OCP идентифицирован другой инструмент с другим меню.
- Артефакты: `data/dualite_blob_2448B_salt_eefc4c5b_b64.txt`, `data/phase23_page_blob_4112B_salt_9fbc451d_b64.txt`, `data/blobs_index_2026-10-17.md`.
- Ссылки: boxentriq.com/ciphers/bifid-cipher (конвенция периода); ocp leads.md §4.


## 2026-10-18 — Big Pickle (big-pickle / OpenCode, Windows) — GSMG: получена «первая картинка» (puzzle.png), спираль вскрыта байт-в-байт
- Контекст: chain4 закрыт как фантом (Qoder ч.6, Hark, #111) — строку QUICK_WINS «разобрать 1151 B» дублировать не стал. Пользователь выбрал GSMG; перешёл к лиду №2 «третья дверь» и к объекту, которого в папке НЕ было — исходная картинка фазы 1.
- Делал:
  1. Достал `https://gsmg.io/puzzle` (puzzle.png, 1048×1556, colortype 6 RGBA) из Wayback: `web.archive.org/web/20201112011308id_/https://gsmg.io/puzzle`, sha256 `38125bbdf1ea58b9b30b075bc6bf71e4089d04bba37098317e47097e2f2a1830`. Ранее картинки в папке не было.
  2. Структура: верх = сетка 14×14 ячеек по 75 px (чёрные/белые + 24 цветных: 9 жёлтых, 15 синих), красная линия y≈1047, ниже серая плашка-баннер с текстом и QR.
  3. **Спираль декодирована воспроизводимо**: старт (0,0), вниз, против часовой, inward; **чёрный/синий = 1, белый/жёлтый = 0** → первые 192 бита = `gsmg.io/theseedisplanted` (совпало байт-в-байт с README стр.87). Последние 4 бита (центр 2×2) = «кролик», spare.
  4. OCR баннера (EasyOCR CPU): «GSMG.IO 5 BTC PUZZLE CHALLENGE» + призовой адрес — картинка идентифицирована.
- Гипотеза/ось (записано ДО прогона): README стр.48 прямо говорит, что ДВА из 9 planted-адресов построены из «raw/reversed bit-image URL»: NEO1=`148XH2YB…`=raw_left(URL), NEO2=`13HGhjkm…`=bits192_left(URL) — конвенция «X=производное картинки → ключ» сертифицирована. Значит, третья дверь `1NULY…` (без preimage) может читаться ДРУГИМ нетекстовым чтением той же картинки (хинт 2020-01-14: «Go back to the first puzzle piece … may contain a whole lot more»). Ось: перебрать нетекстовые чтения картинки (196 бит: спираль-2-направления, row/col-major, реверс, инверсия; младшие биты кролика; баннер; QR) × 6 конструкций (sha256/raw_left/raw_right/bits192_left/bits192_right/bytes_rev) → P2PKH → сверить со всеми 9 planted + призом. Прогон ≤15 мин.
- Артефакты: `data/puzzle_wayback.png`, `data/grid14_cells.txt`, `tools/gsmg_image_derive_2026-10-18.py`.

- Результат прогона (51 нетекстовое чтение картинки × 6 конструкций = 335 ключей): **0 хитов по третьей двери**.
  - Сверка конвенции (witness-ы воспроизведены): `spiral192`→`raw_left` = NEO1 `148XH2YB…`; `spiral192`→`bits192_left` = NEO2 `13HGhjkm…`.
  - **Новый факт**: `1Ph11kNwGaKzuB2vc9h9dfDug73pM3mmPQ` = **НЕСЖАТЫЙ близнец NEO1** (тот же ключ = raw_left(URL)); значит конвенция planted дублирует compressed И uncompressed.
- Другие нетекстовые каналы картинки (все — чисто/закрыто):
  - off-by-one LSB-стего: **0 пикселей** (изображение = 6 базовых цветов + сглаживание краёв кролика/лого/текста; ровно 1 604 352 px в базовых цветах, ни одного «±1»).
  - QR в баннере декодирован: `https://www.blockchain.com/btc/address/1GSMG1JC9wtdSwfwApgj2xcmJPAwx7prBe` — та самая «приманка» (README стр.83).
  - «Кролик» над сеткой — тонкие штрихи ~15 px (14 компонент, 300–2475 px) поверх центра; кодировки нет.
  - Сетка 14×14 подтверждена: `.`(чёрных)=85, `#`(белых)=87, Y=9, B=15; 24 цветных сидят на индексах ≡7 mod 8 спирали — это биты 7,15,…,191 (младшие биты URL).
- Вывод: ось «прямое нетекстовое чтение первой картинки → третья дверь» **закрыта (негатив)**. Третья дверь остаётся открытой: хинт говорит о «правиле автора начала 2020 на нетекстовом объекте», но это, по-видимому, ДРУГОЙ объект (или чтение с дополнительным шагом), а не сама puzzle.png.
- Бонус для будущих агентов: страница `theseedisplanted` и её 8 ребусных картинок заархивированы — `web.archive.org/web/2020/https://gsmg.io/theseedisplanted` + `…/theseedisplanted/img/{black_banking - war, blue_ca, blue_dig_i, blue_lock_lo, red_crypto_gic, red_n_you, red_open_lock_n_ing, red_t}.png` (CDX 2020-11-12 … 2026). Прямые URL с домена мертвы с 07.2026.
- Артефакты: `data/puzzle_wayback.png` (sha256 38125bbd…), `data/grid14_cells.{png,txt}`, `data/banner.png`, `data/center_rabbit.png`, `tools/gsmg_image_derive_2026-10-18.py` (воспроизводимый прогон с witness-ами).
- Отчёт: `reports/2026-10-18_1042_BigPickle_gsmg-phase1-image.md`.

## 2026-10-18 — Big Pickle (big-pickle / OpenCode, Windows) — GSMG: полная выгрузка репозитория сообщества puzzlehunt/gsmgio-5btc-puzzle

- Повод: запрос Ильи «посмотреть репозиторий и ссылки целиком и вытащить всю информацию по загадке». Тип: обогащение.
- Выгружено через GitHub API (без аутентификации) в `data/puzzlehunt/`:
  - `PUZZLEHUNT_REPO_EXTRACT.md` (45.9 КБ) — итоговый разбор: 5 «дверей», свежие находки 2026, реестр подсказок создателя, таблица адресов, индекс 112 issues, 235 внешних ссылок;
  - `GITHUB_DIGEST.md` (~907 КБ) — README + тела всех 112 issue + 609 комментариев;
  - `issue_comments.json` (609 комментариев, raw);
  - `README.md` (396 строк), все картинки: `puzzle.png`, `theseedisplanted.png`, `phase2.png`, `phase3.png`, `SalPhaselonCosmicDuality.png`, `photo_2020-04-26_09-24-30.jpg`.
- **Проверенная находка (наша)**: H160-«цель» из issue #111 (`a9553269572a317e39f0f518cb87c1a0ee1dbae4`) = **в точности hash160 адреса приза `1GSMG1JC9wtdSwfwApgj2xcmJPAwx7prBe`** (подтверждено base58-декодом). Т.е. конструкция «половин» #111 нацелена на публичный ключ приза напрямую.
  - `FH (16 B) = gros[0::4][:16] XOR gros[1145:1161] = 8048c428a6faf6d3df77db13ca68766d`;
  - `BetterHalf = Reduction(SOURCE_4) XOR gros[1161:1177]`, `Reduction: 48B→16B` — неизвестен;
  - `SOURCE_4` base64 `QvX0t8v3jPB4okpspxebRi6sE1BMl5HI8Rku+KejUqTvdWOX6nQjSpepXwGuN/jJ` (малый blob SalPhaseIon).
- Подтверждено (независимо от нас): единственная off-white клетка **RGB (254,254,254)** в (строка 7, столбец 4) — issues #14 и #111. 24 цветные клетки = «последний бит каждого из 24 байт» URL (спиральный индекс ≡ 5 mod 8 у сообщества; у нас ≡ 7 mod 8 — та же структура).
- Новые сущности: «Half» = `1JG648yaB7Wp2dpUfcZoRSD4q35oq47vCu` (H160 `bd5498c1…`, баланс 0, 105 tx); «Better Half» = `145ZQ9siLrsXBKf465wjdyQYAP5dRwhRhQ` (H160 `21c51630…`, баланс 0, 105 tx). Создатель = «Jrk Bgrt» (Telegram «GSMG Puzzle Solvers», id 1166734859). Issue #114: разыскивается полный Telegram-экспорт ≈57 729 сообщений (2019-04-20…2026-07-26) — непубличный корпус подсказок.
- Уточнение #106: `floflo777/open-crypto-puzzles:tools/oracle.py` использует EVP-MD5, но все решённые блобы цепочки — EVP-SHA256 (исключение — только Cosmic Duality). Прежние свипы через oracle.py структурно недостоверны.
- Мейнтейнер Naddiseo: загадка решаема («все части есть»); критерий — приватник к `1GSMG1JC9…` и/или `17ucy1K9…`. CADEIA/chain4, правки base64 (#108) и «Bifid→BTCSEED» (#112/#113) он считает LLM-фейками. Наш прежний вывод «chain4 = фантом» согласуется.
- Следующий шаг (требует ОК Ильи): проверить формулы #111 против локального воспроизводимого артефакта Phase 3.2 (`gros`, 2432 B). Ось задана формулами — не слепой перебор.
- Отчёт: `reports/2026-10-18_1055_BigPickle_gsmg-puzzlehunt-repo-extract.md`.

## 2026-10-18 ~11:00 — Big Pickle — ГИПОТЕЗА+ОСЬ (пишется ДО прогона)

- **Гипотеза (H-111):** приватный ключ приза `1GSMG1JC9wtdSwfwApgj2xcmJPAwx7prBe` (H160 `a9553269572a317e39f0f518cb87c1a0ee1dbae4`) извлекается из артефакта `gros` — расшифрованного Phase-3.2 блоба (`data/dualite_blob_2448B_salt_eefc4c5b_b64.txt`, salt `eefc4c5befc1656a`, ct 2432 B).
- **Ось (сужена формулами issue #111, НЕ слепой перебор):**
  1. воспроизвести `gros` двумя известными из #111 паролями: `sha256("jacquefrescogiveitjustonesecondheisenbergsuncertaintyprinciple")` (EVP-SHA256) и тройным sha256 от `theseedisplanted` (EVP-MD5/SHA256) → цель: plaintext 2422/2432 B, начинающийся речью Архитектора;
  2. прямая проверка: privkey=16B `FH` и privkey=32B `FH||X` (X из `gros`) → pubkey (compressed+uncompressed) → hash160 == цель `a9553...` / `4bc468447fe1b048ad030a2f9a125478eabc4ed6` (17ucy);
  3. `FH = gros[0::4][:16] XOR gros[1145:1161]`, `BetterHalf = Reduction(SOURCE_4) XOR gros[1161:1177]`, и набор трактовок `Reduction` (в т.ч. «one for one, four for one»/1141/EBCDIC, XOR-треугольник #88), а также 32-байтные блоки `gros[i:i+32]` и их XOR/срезы по формуле #111.
- **Бюджет:** <=15 мин CPU. Стоп-критерий: hash160(pubkey)==цель.
- **Ожидание:** скорее всего негатив, но формула задаёт ровно одну ось -> допустимо.


### РЕЗУЛЬТАТ прогона H-111 (2026-10-18, Big Pickle)

- **`gros` воспроизведён точно.** Блоб Phase 3.2 (2448 B = Salted__+salt `eefc4c5befc1656a`+2432 B ct) из README сообщества; AES-256-CBC, EVP_BytesToKey SHA-256 (`D_i=H(D_{i-1}‖pw‖salt)` — без соли не работает), пароль `sha256("jacquefresco...uncertaintyprinciple")` -> **2422 B**, sha256 `b82afeb86f9e50848220f9b64b744b821400308aea273a1c949b9d2d0e408a34`.
  - Структура: Архитектор-речь 0..447; **Beaufort-блок 447..1986 (1539 B, 26 симв.)**; CRLF; 149 цифр 1990..2143; подсказка 2143..2292; внутренний blob 2292..2422 (48 B, salt `b45a5e3d827593ca`).
  - Байт->буква разметка Beaufort-блока восстановлена (26 байт<->26 букв, конфликтов 0) и **совпала с буквенной транскрипцией README** -> наш gros = gros сообщества.
- **НОВОЕ (стратегически важно): публичный ключ приза ОПУБЛИКОВАН.** `04f4d1bb...bf33559` (uncompressed, на кривой) -> hash160 `a9553269572a317e39f0f518cb87c1a0ee1dbae4` = **в точности адрес приза `1GSMG1JC9…`**. Значит любого кандидата ключа можно проверять мгновенно офчейн (pubkey == PUB), без блокчейна. Использовать во всех будущих прогонах.
- **Ось закрыта (негатив): константы #111 не воспроизводятся.**
  - Наш `FH = gros[0::4][:16] XOR gros[1145:1161]` = `801e5053aeb04a50a953e92c3501a330`; #111 заявляет `8048c428a6faf6d3df77db13ca68766d` — мимо.
  - Наш `gros[1161:1177]` = `c0d12ff6cc5fcac05f5f3ec960c2c5c8`; #111 заявляет `3be6ecf1d5c126e50f25ded3bc8fb6d9` — мимо.
  - Исчерпывающий XOR-поиск по 7 буферам (plain 2422 / ct 2432 / full 2448 / letters 1539 / speech+letters+tail / speech 447 / inner blob 48) x stride 1..8 x все смещения: **0 совпадений** с FH #111.
  - Вывод: `gros` в #111 — **неопубликованный 2432-байтный артефакт**; его «FH verified against H160» из публичных данных **непроверяемо** -> трактуем как неподтверждённое. Ось «ключ из gros по #111» исчерпана.
- Свип: 204 кандидата (FH и его варианты, XOR-свёртки SOURCE_4 48 B во всех stride/окнах x `gros[1161:1177]`) против публичного ключа приза -> **0 хитов**.
- Остаётся только публичная информация, не вычисление: корпус сообщений создателя («Jrk Bgrt», Telegram «GSMG Puzzle Solvers», issue #114 — полный экспорт ~57 729 сообщений). Без подсказки создателя последний шаг не выводится из уже опубликованного.
- Артефакты: `data/gros_phase32_2422.bin`, `data/phase32_inner_blob.b64`, `tools/gsmg_phase32_gros_repro_2026-10-18.py`. Отчёт: `reports/2026-10-18_1110_BigPickle_gsmg-111-falsification.md`.
- **Бронь: снята по завершении.**


### 2026-10-18 2026-10-18 11:37 — Big Pickle — ЖИВОЙ САЙТ gsmg.io НАЙДЕН (корректировка прежней пометки)

- Проверено: `https://gsmg.io` **ЖИВ** (в прежних отчётах ошибочно стоял «припаркован/404»). Отдаёт
  оригинальные страницы пазла напрямую, без Wayback.
- Живая главная: новая «shutdown»-анимация, `2017 — 2026`, «The lights are off. / Nine years of chaos
  ended. One mystery remains.» и ссылка «Follow the white rabbit →» на `/puzzle`. В финале — жёстко
  зашитая сетка 14x14 из 0/1 и надпись `SYSTEM FAILURE`; алфавит «matrix rain» =
  `0101…01GSMG.IO5BTCPUZZLECHALLENGE`. Задержки в коде 2442 / 1441 / 13950 / 4100 мс.
- `/puzzle` = **та же** `puzzle.png` (sha256 `38125bbd…2a1830`), что у нас из Wayback → новых картинок нет.
- `/theseedisplanted`: 8 плиток-ребусов + СКРЫТАЯ форма `POST /phase1verification`. Плитки (прочитаны
  зрением): [банк]+`war`, `CA`, `dig i`+`+`, [замок]+`lO`, `crypto`/`gic`, `n you`, [открытый замок]+`n ing`,
  `t`+`-`. Ребус = песня Logic «The Warning» (`war`+`ning`, `lo`+`gic`). Форма **мертва** (404 `Hello :-)`).
- `/choiceisanillusion…iwroteitmyself`: полный **PHASE 2 + PHASE 3** текст; блобы: phase2 672 B salt
  `06286612d43ed7ed`, phase3 4112 B salt `9fbc451d13d071f4` — **совпал с нашим**
  `data/phase23_page_blob_4112B_salt_9fbc451d_b64.txt` ✔. Подтверждены дословно: Нортон-абзац, «5binary code»,
  Bitcoin-whitepaper «raw data after 4 on row 1616», FEN `B5KR/1r5B/6R1/2b1p1p1/2P1k1P1/1p2P2p/1P2P2P/3N1N2 w - - 0 1`,
  «parts 1..7 -> sha-256 -> password to enter Phase 3».
- `/89727c598b9cd1cf8873f27cb7057f050645ddb6a7a157a110239ac0152f6a32`: **SalPhaseIon + Cosmic Duality**;
  внутри вшиты `h a b e`, «f o u r f i r s t h i n t i s y o u r l a s t c o m m a n d»,
  base64 `U2FsdGVkX186tYU0…`, фрагмент `QvX0t8v3jPB4okpspxebRi6sE1BMl5HI8Rku+KejUqTvdWOX6nQjSpepXwGuN/jJ`
  (= «SOURCE_4» из issue #111!), `s h a b e f a n s t o o`; Cosmic-блоб 1344 B salt `2d3f6fe06dc950e6`.
- 404 (тело `Hello :-)`): `/phase1verification`, `/phase2`, `/phase3`, `/TheArchitectChoice`, `/final_stage`,
  `/puzzlesupposethisone`, `/youarewrongaboutdirhunt`, `/youmeandself`, `/youmeiandself`, `/salphaseion`,
  `/4f7a1e4e…`, `/sitemap.xml` и ~28 прочих вариантов.
- **Артефакт `phase3.2` (`dualite_blob_2448B_salt_eefc4c5b`) на живом сайте ОТСУТСТВУЕТ** — это добыча
  сообщества из глубины phase-3; источник всё ещё неизвестен.
- Скачано: `data/live2026/` (3 HTML + 11 PNG), карта — `data/live2026/LIVE_SITE_MAP_2026-10-18.md`.
- **Вывод:** пазл открыт (сайт переписан под «смерть» компании, но «One mystery remains»); первоисточник
  теперь доступен → сверки делаем по живым байтам. Все три известных блоба подтверждены.

### 2026-10-18 — Big Pickle — Telegram-корпус + декод road-map создателя; гипотеза H-SP1

- Пользователь передал ранее недоступные источники: **полный экспорт Telegram-группы «GSMG Puzzle Solvers»**
  (65 654 сообщения, 2019-04-20..2026-10-18, 628 отправителей), **тред bitcointalk**, **README сообщества**
  (новый, полный: содержит решения phase 3.2.1 Beaufort и phase 3.2.2 Vic + секцию SalPhaseIon).
  Корпус проиндексирован: `data/telegram/full_corpus.txt` (59 967 непустых сообщений), сообщения создателя —
  `data/telegram/creator_JrkBgrt_compact.txt` (476 шт.), выжимка состояния искусства —
  `data/telegram/STATE_OF_ART_2026.md`.
- **Расшифрован бинарный дамп создателя (Telegram msg id 8446, 2023-02-24, 1448 симв. 0/1).**
  Метод: **побитовый реверс каждого байта + реверс порядка байт**. Результат (`jrk_reveal.txt`):
  `yellow blue primes matrixsumlist lastwordsbeforearchichoice yinyang we wont give away the password
  its in front of your eyes but you're not seeing it very last step is a true give away promised`.
  Это официальный road-map финальной фазы. Скрипт: `tools/gsmg_jrk_reveal_decode_2026-10-18.py`.
- **Состояние искусства сообщества (2026-08..10)**: единственный аутентифицированный объект — `btcseed`
  payload (Bifid-плейнтекст SEG-1, 570 симв., sha256 `15d62c82…dd8d0507`), сведённый к 96 состояниям
  (4 control × 24 carrier, одинокий `z` на поз. 98). `chain4` (1151 B) и `cosmic` (1327 B, `4f7a1e4e…`) —
  фантомы/паддинг-хиты. **Стена = interpretive-правило-потребитель для btcseed-96**, а не вычисление.
- **Гипотеза H-SP1**: 96-байтовый AES-блоб SalPhaseIon (`U2FsdGVkX186tYU0hVJBXX…`, salt `3ab585348552415d`)
  = AES-256-CBC-шифр приватного ключа приза; пароль — токен, буквально присутствующий на самой странице
  SalPhaseIon (`thispassword`, `lastwordsbeforearchichoice`, `matrixsumlist`, `enter`, `shabef`, `thepassword`,
  `four first hint is your last command`), т.е. «password is in front of your eyes».
- **Ось прогона (≤15 мин)**: пул кандидатов-паролей (токены страницы + перестановки-конкатенации + sha256-хекс
  + известные пароли предыдущих стадий) × KDF {md5, sha256} × {стандартный EVP-IV, явный IV
  `14f23fd58189ad7ee1d794ad8cc16d7d` из раннего JSON-артефакта} → расшифровать → проверить, что результат =
  32-байт ключ / WIF / 64-hex → hash160(pubkey) == `a9553269572a317e39f0f518cb87c1a0ee1dbae4`.
  Тот же пул — для внутреннего 3.2-блоба (salt `b45a5e3d827593ca`).
- **Оракул**: опубликованный uncompressed pubkey `04f4d1bb…33559` — мгновенная offline-проверка (не сеть).
- Результат прогона — ниже.

- **Результат H-SP1 (прогон 2026-10-18, ≤15 мин): НОЛЬ.** 159 паролей-кандидатов × KDF {md5,sha256} ×
  {EVP-IV, явный IV `14f23fd58189ad7ee1d794ad8cc16d7d`} = **1 272 расшифровки** по двум блобам
  (SP salt `3ab585348552415d`, INNER32 salt `b45a5e3d827593ca`) -> ни один плейнтекст не даёт 32-байт ключ /
  WIF (51–52) / 64-hex, hash160(pubkey) которого == `a9553269…d bae4`. Оракул верифицирован: hash160 от
  опубликованного uncompressed-pubkey даёт ровно `a9553269572a317e39f0f518cb87c1a0ee1dbae4`; положительные
  контроли (raw-32 и compressed WIF) срабатывают. Скрипт: `tools/gsmg_sp1_password_probe_2026-10-18.py`.
- **Скачан и проверен Decentraland (estate 955, парцеллы `-41,-16`/`-41,-17`)** — закрыта позиция из
  «STILL MISSING» сообщества. Файлы сцены: `bin/game.js` (QmcoAs6k…), `scene.json` (QmdESuCgu…),
  `sounds/puzzlepiece.mp3` (QmeRy5Mjm…). Кастомный код сцены = 84 строки: 10 кубов + `TextShape("GSMG.IO
  \n5 BTC PUZZLE CHALLENGE")` (синий, fontSize 5, поз. (5,5,10)) + клик играет mp3. **Скрытых в сцене
  подсказок нет**; единственный информационный слой = аудио -> `HASHTHETEXT` (уже известно).
  Артефакты: `data/decentraland_2026-10-18/`.
- **`beta.gsmg.io` не резолвится** (DNS fail; в 2025 был жив, `version.json` упоминался). Значит «3 private
  share links on the beta host + 2 JS bundles» из списка сообщества сейчас недостижимы напрямую.
- **README сообщества** (`Downloads/README.md`, 28 936 B, sha256 `442270a1…`) **побайтово идентичен** нашей копии
  `data/puzzlehunt/README.md` — нового содержания в нём нет (diff пустой,
  `data/README_diff_vs_repo_copy_2026-10-18.txt`).
- **Граница:** новых путей к приватному ключу прогон не даёт. Стена ровно та, что называет сообщество:
  interpretive-правило «потребителя» для `btcseed`-объекта (96 состояний) + пароль к SP-блобу.

### 2026-10-18 — Big Pickle — пакет DeepWiki-страниц: проверка на новизну (отрицательно)

- Пользователь передал 12 markdown-страниц `deepwiki.com` по репозиторию `puzzlehunt/gsmgio-5btc-puzzle`
  (снимок README на коммит `fb92dd15`, published 2025-08-25).
- Машинная проверка: новых 40–64-hex строк нет (кроме известной `1a57c572…`), нет солей `3ab58534`/`b45a5e3d`,
  нет `4f7a1e4e…`/`cd3fea3d…`, нет WIF/мнемоник. Все base64-токены = знакомые строки README.
- **Вывод: производный дубликат нашего `data/puzzlehunt/README.md` (sha256 `442270a1…`)**; новой информации нет.
  Заметка: `data/deepwiki_2025-08-25_DUPLICATE_note.md`. Повторно не разбирать.


### 2026-10-18 — Big Pickle — GitHub + открытая сеть: развед-проход (новый state-of-art 09–10/2026)

- По прямому заданию пользователя прогнал прямой поиск: GitHub API (repo/issue), raw.githubusercontent,
  публичный индексатор кода grep.app, webfetch. Найдены и выкачаны живые репозитории/зеркала 2026 г.;
  всё сохранено в `data/github_2026-10/` (индекс: `data/github_2026-10/INDEX.md`).
- Главные источники: `floflo777/open-crypto-puzzles` (206★, push 2026-10-17) — самый строгий ledger;
  `HosterjackAGV/gsmg-5btc-puzzle` (компендиум, 2026-09-22); `turjaun985123/gsmgiopuzzle` (форк форензик-
  проекта, открытия до #77, 2026-10-14); плюс зеркало `gsmg-archive.org`, досье `puzzles.agntn.dev`,
  `privatekeys.pw`. Все прочие найденные репозитории — либо дубли, либо ИИ-слоп.
- Подтверждено независимо: **cosmic/`4f7a1e4e…` и «Half/Better half» — padding-случайность**
  (floflo §11–14: 93/20000 случайных ключей дают валидный паддинг, 92 из них однобайтовый; plaintext
  равномерный). Наш вывод #111 сохраняется.
- НОВОЕ для нас (см. INDEX): реальный приз ~1.2563 BTC; SalPhaseIon-страница берётся SHA-256 текста первой
  страницы (не через Decentraland); на ней ДВА блоба (малый `3ab585348552415d` + Cosmic Duality);
  **второй 80-байтовый замок** — phase 3.2.2 (`b45a5e3d827593ca`); оракул «третья дверь»
  (`1NULY7DhzuNvSDtPkFzNo6oRTZQWBqXNE9`, 9 посаженных адресов, 8 с известным прообразом);
  объект-256 (нечётный поток Bifid 285 → минус I/O = 256/23-букв.) и **29 выброшенных I/O-букв, никогда
  не прочитанных как сообщение**; подтверждённый факт, что автор использовал ОДИН публичный шифр-инструмент
  (Bifid без параметра периода, короткое меню) — это новая инсайт-ось.
- Публичного решения/ключа-лика **нет**; репозиторий puzzlehunt заброшен (#105), свежие «SOLVED»-claims
  (#69/#79/#91/#108/#115/#116) опровергнуты контрибьютором Naddiseo.
- Прогонов не делалось (разведка/чтение). Следующая возможная ось — lead #4 (инструмент автора) и
  чтение 29 выброшенных I/O-букв; любой прогон — только после гипотезы в LOG и в пределах ≤15 мин.


### 2026-10-18 — Big Pickle — 4-й блоб (urlblob) + инструмент автора (лид floflo #4)

- Режим: разведка/анализ; bounded-прогон ≤15 мин по одной оси; без брутфорса, без трат.
- **4-й OpenSSL-блоб восстановлен из hex-URL в Wayback CDX** (снимок 2026-01-05):
  `data/urlblob_4th_salt_74c974e3.bin` (112 B = `Salted__` + salt `74c974e3f92e64b5` + 96 B ct).
  0 общих блоков с cosmic/salph_inner/inner-3.2/p32 → независимый контейнер; в репо HosterjackAGV артефакта нет.
  Полный CDX домена (626 строк): `data/wayback_cdx_gsmg_2026-10-18.txt`. Описание: `data/urlblob_4th_blob_2026-10-18.md`.
- **Bounded-прогон по urlblob** (ось: «пароль — уже имеющийся объект»): 366 тестов
  (ответы этапов + объекты SalPhaseIon/256/ODD/EVEN-BCDE/DROPPED29 + base64-пути + 24 перестановки 4 солей;
  raw/sha256; kdf sha256/md5) → **0 читаемых** (1 случайная коллизия паддинга CAUSALITY/md5).
  Инструмент: `tools/gsmg_urlblob_probe_2026-10-18.py` (разбор блоба: `tools/gsmg_4th_blob_and_yinyang_2026-10-18.py`).
- **Идентификация инструмента автора (лид floflo #4):** Tools-список gsmg-archive.org включает редкий
  `scwf.dima.ninja` = самохостный форк набора Rumkin (Tyler Akins, `rumkin.com/tools/cipher/`).
  Первоисточник Bifid — **без параметра периода** (период = полная длина) = конвенция Bifid-шага пазла;
  меню покрывает Beaufort/EBCDIC/a1z26/Skip/Rotate/… → `data/tool_identification_2026-10-18.md`.
- Разобраны CDX-аномалии: `/iXJ8WYuc0c+Ic/J8twV/BQZF3banoVehECOawBUvajI=` = base64 от hex-slug SalPhaseIon
  (solver-артефакт); `/k27RwIKb…` = 128 B энтропии без Salted__; `beta.gsmg.io/puzzle` = пустой SPA-shell.
- Сверка с нашей историей: ось {B,C,D,E}-поток / BIP39-мнемоника уже закрыта (LOG ст. 162/178) — не дублировали.
- Фронтир без изменений (2 лока + cosmic + 256-объект + третья дверь + urlblob). Рекомендованная ось:
  прогнать меню Rumkin против 256-объекта и «Dualite»-блоба.
- Отчёт: `reports/2026-10-18_1250_BigPickle_gsmg-4th-blob-and-tool.md`.


### 2026-10-18 — Big Pickle — ГИПОТЕЗА И ОСЬ ПРОГОНА (фиксируется ДО запуска)

- **Инсайт:** автор собирал все фазы ОДНИМ публичным инструментом (лид floflo #4). Идентифицирован кандидат —
  набор «Ciphers and Codes» Rumkin (Tyler Akins), зеркало `scwf.dima.ninja`; его Bifid **без параметра периода**
  (период = длина) = конвенция Bifid-шага пазла.
- **Ось:** применить шифры ЭТОГО меню с дефолтными/нейтральными конвенциями к имеющимся объектам
  (BIFID570, ODD/tsed-285, KEPT256/256-объект, DROPPED29, EVEN-BCDE-285, dbbi-91, faed-570),
  и каждый результат (raw и sha256-hex) проверить как пароль четырёх AES-блобов
  (Cosmic `2d3f6fe0…`, salph_inner `3ab58534…`, inner-3.2 `b45a5e3d…`, urlblob `74c974e3…`)
  при EVP_BytesToKey {sha256, md5}; принимать только читаемый plaintext (printable ≥0.85 или ключевые слова).
- **Меню (трансформации):** identity/reverse/upper/lower, Atbash, Caesar N=1..25, Affine (a,b),
  Bifid decode/encode (unkeyed + keyed {DBIFHCEG, 4 ингредиента}), Columnar (keylen 2..8),
  Railfence (rails 2..8), Rotate (width 2..32 × 1..3), Skip (N=2..64, offset), XOR (ингредиенты/соли),
  Letter-Numbers (a1z26), Base64/32/58/36/16 decode.
- **Границы:** один прогон, ≤15 мин, CPU-only. Ожидаемый уровень шума — только случайные коллизии паддинга,
  которые отсекаются фильтром читаемости. Инструмент: `tools/gsmg_rumkin_menu_probe_2026-10-18.py`.

### 2026-10-18 13:03 MSK — Big Pickle — РЕЗУЛЬТАТ прогона (меню Rumkin + esrever)

Ось: меню идентифицированного инструмента автора (`scwf.dima.ninja` = движок rumkin, форк DaWouw;
Bifid без периода — подтверждено ВЖИВУЮ вебфетчем 2026-10-18) против открытых объектов.

- **pass 1** `tools/gsmg_rumkin_menu_probe_2026-10-18.py`:
  atbash, Caesar 1–25, Affine(12×26), letter-numbers, Bifid(unkeyed+{DBIFHCEG,4 ингредиента}),
  railfence 2–8, rotate 2–32×1–3, skip 2–48+offset, XOR, b64/32/16 → 13 176 выходов,
  210 816 тестов AES, 814 валидных паддинга (≈случайное 823), **0 читаемых**.
- **pass 2** `tools/gsmg_rumkin_menu_probe2_2026-10-18.py`:
  EBCDIC(cp037), Baudot/ITA2, Baconian, Morse, Playfair, Columnar(10 ключей), Vigenere/Gronsfeld(9),
  Substitution(qwerty↔dvorak/colemak,1337), Base36/58/85 + прямой key-check (secp256k1→hash160 приза)
  → 374 выхода, 5 984 теста AES, 26 валидных паддинга, **0 читаемых, 0 key-hit**.
  (Исправлен баг pass-1: `bifid_enc` был идентичен decode.)
- **pass 3 (лид #5 «esrever»)** `tools/gsmg_esrever_probe_2026-10-18.py`:
  reverse, byte-reverse, per-byte bit-reverse, transpose w∈{5,14,19,26,29,32}, reverse+atbash
  → 70 выходов, 1 120 тестов AES, **0 читаемых, 0 key-hit**.

Цель во всех прогонах: пароль 4 блобов (Cosmic `2d3f6fe0…`, salph_inner `3ab58534…`,
inner-3.2 `b45a5e3d…`, urlblob `74c974e3…`), форма raw + sha256-hex, EVP {sha256,md5}.
Контроль: `BIFID570` начинается с `BTCSEED` (объект верный). Валидные паддинги = ровно шанс.

**Вывод:** меню Rumkin при нейтральных конвенциях — отрицательно как самостоятельная ось.
Единственный YINYANG-hit — случайная подстрока `YANG` в Vigenère-выходе. Остаются смысловые лиды
(road-map ингредиенты, floflo #7 «тот ли объект», floflo #3 «баг фильтра»). Отчёт:
`reports/2026-10-18_1303_BigPickle_gsmg-rumkin-menu.md`. Бронь снята.

### 2026-10-18 — Big Pickle — ГИПОТЕЗА И ОСЬ ПРОГОНА №2 (фиксируется ДО запуска)

- **Инсайт (структурный).** Road-map `yellowblueprimes · matrixsumlist · lastwordsbeforearchichoice · yinyang`,
  похоже, перечисляет **операции**, а имена = размеры. Длины: `matrixsumlist`=13, `yinyang`=7,
  `lastwordsbeforearchichoice`=26, `thispassword`=12. И ровно:
  **dbbi = 91 = 13 × 7** (= `matrixsumlist` × `yinyang`); **faed = 570 = 38 × 15**,
  где 38 = 26 + 12 (`lastwordsbeforearchichoice` + `thispassword`).
- **Гипотеза H-MSL.** `matrixsumlist` = буквально «список сумм матрицы»: оцифровать dbbi (a→1..i→9),
  сложить в матрицу по именованным размерам, взять **суммы строк** (список = имя шага);
  `yinyang` = **двойственное** чтение (суммы столбцов) — инь/ян.
- **Ось прогона.** dbbi (13×7, 7×13) и faed (38×15, 15×38) + опционально D+F/ta0-блок:
  суммы строк/столбцов → канонические рендеры (mod26→A–Z (v−1 и v), mod10/mod9→digits→bigint→hex→ASCII,
  значения mod 256 как байты, конкатенация-десятичная→bigint→hex→ASCII) → **объективный скоринг**
  (printable-доля + словарь частых англ. слов + поиск маркеров SENDTHE/TOSETHEX/BLUENET/BTCSEED/YINYANG);
  затем комбинации списков dbbi⊕faed (XOR/± mod26) и проверка каждого letter-выхода как пароля 4 блобов
  (raw + sha256-hex).
- **Границы.** Один прогон, ≤15 мин, CPU-only, **без подгонки** под «SENDTHE». Инструмент:
  `tools/gsmg_matrixsumlist_2026-10-18.py`.

### 2026-10-18 13:13 MSK — Big Pickle — РЕЗУЛЬТАТ прогона №2 (road-map: `matrixsumlist`/`yinyang`)

- **Новая структурная находка.** Road-map токены = РАЗМЕРЫ: `matrixsumlist`=13, `yinyang`=7, и dbbi=91=13×7;
  `lastwordsbeforearchichoice`(26)+`thispassword`(12)=38, blue(=15) → faed=570=38×15. Т.е.
  dbbi = matrixsumlist × yinyang, faed = (26+12) × blue. Подробно (с сырыми суммами):
  `data/matrixsumlist_namesizes_2026-10-18.md`.
- **Прогон p4** `tools/gsmg_matrixsumlist_2026-10-18.py` (суммы строк/столбцов по именованным формам
  13×7/7×13/38×15/15×38 + комбинации dbbi⊕faed; рендеры mod26/mod9/mod10/bytes/catdec→bigint→hex→ascii;
  пароль 4 блобов raw+sha256hex): **180 кандидатов, 2 880 тестов AES, 0 читаемых, 0 словарных, 0 маркеров.**
- **Прогон p5** `tools/gsmg_matrixsumlist_p5_2026-10-18.py`: (A) рендеры сумм фикс. ширины (2/3 цифры
  с ведущими нулями) → bigint → hex → ASCII; (B) суммы как позиции zero-out/вставки '0' в dbbi/faed/D+F
  → house-декод: **216 кандидатов, 3 456 тестов, 0 читаемых, 0 маркеров.**
- **Следствие:** community-«SENDTHE / TOSETHEX / BLUENET» (TG 2026-05-22) при канонических рендерах НЕ
  воспроизводится → сильная подозрительность на подгонку. Совпадает с известным негативом KB
  («matrixsumlist-матрицы, 1316 кандидатов → шум»).
- **Вывод:** форма (имена=13/7/38/15) точна арифметически, но прямой рендер сумм в текст/ключ (и позиции
  зануления) — отрицательно. Суммы сохранены в `data/matrixsumlist_namesizes_2026-10-18.md`. Отчёт:
  `reports/2026-10-18_1313_BigPickle_gsmg-matrixsumlist.md`. Бронь снята.

## 2026-10-18, 13:18 — Qoder (github_intake) — GITHUB INTAKE (шлюз)
- Делал: python tools/github_intake.py run gsmg-io-5btc-puzzle --agent Qoder
- Кандидаты: puzzlehunt/gsmgio-5btc-puzzle (community, ссылки досье), naddiseo/gsmgio-5btc-puzzle (maintainer, ссылки досье), floflo777/open-crypto-puzzles (registry, ссылки досье), jackdevs66/gsmg5_cduality (community, ссылки досье), alexdepario/5-btc-puzzle-cosmic-duality (community, ссылки досье), hossein2002426/gsmgio-5btc-puzzle (community, ссылки досье), jwerle/libbeaufort (community, ссылки досье), bitcoin/bitcoin (community, ссылки досье), hosterjackagv/gsmg-5btc-puzzle (community, ссылки досье), kaibuzz0/gsmg.io-solution (community, ссылки досье), corunethron/salph-cosmic-better-solution (community, ссылки досье), corunethron/salph-cosmic-extra-solution (community, ссылки досье), corunethron/sal
- Скачано: репо=0 (файлов 0, 0 Б; медиа 0), issues=0, comments=0, PR=0, releases=0, gists=0, wiki=нет
- Бюджет: api.github.com запросов = 0 (remaining 45, reset 2026-10-18T10:40:53Z); бесплатных транспортов (codeload/ls-remote/git) = 0
- Негативы: репо владельца puzzlehunt: пропущено (исчерпан --api-budget (0 запросов)); форки puzzlehunt/gsmgio-5btc-puzzle: пропущено (исчерпан --api-budget (0 запросов)); не собрано (сверх --max-repos 4): alexdepario/5-btc-puzzle-cosmic-duality, hossein2002426/gsmgio-5btc-puzzle, jwerle/libbeaufort, bitcoin/bitcoin, hosterjackagv/gsmg-5btc-puzzle, kaibuzz0/gsmg.io-solution, corunethron/salph-cosmic-better-solution, corunethron/salph-cosmic-extra-solution, corunethron/salph-cosmic-final-solution, corunethron/salph-cosmic-great-solution, corunethron/salph-cosmic-super-solution, corunethron/salph-cosmic-ultra-solution, dinhoka/gsmgio-5btc-puzzle, halbgott29a/gsmgio-5btc-puzzle, jconorgrogan/lost-eth, juli
- Артефакты: data/github/GITHUB_INTAKE.md, data/github/INTAKE_RESULT.json, data/github/_legacy_pointers.md, data/github/<owner>__<repo>/{files,raw,REPO_META.json}
- Статус шлюза: partial (исчерпан --api-budget (0 запросов)); остаток в data/github/resume.json
- Ссылки/доказательства: нет репозиториев


## 2026-10-18, 13:23 — Qoder (github_intake) — GITHUB INTAKE (шлюз)
- Делал: python tools/github_intake.py run gsmg-io-5btc-puzzle --agent Qoder
- Кандидаты: puzzlehunt/gsmgio-5btc-puzzle (community, ссылки досье), naddiseo/gsmgio-5btc-puzzle (maintainer, ссылки досье), floflo777/open-crypto-puzzles (registry, ссылки досье), jackdevs66/gsmg5_cduality (community, ссылки досье), alexdepario/5-btc-puzzle-cosmic-duality (community, ссылки досье), hossein2002426/gsmgio-5btc-puzzle (community, ссылки досье), jwerle/libbeaufort (community, ссылки досье), bitcoin/bitcoin (community, ссылки досье), hosterjackagv/gsmg-5btc-puzzle (community, ссылки досье), kaibuzz0/gsmg.io-solution (community, ссылки досье), corunethron/salph-cosmic-better-solution (community, ссылки досье), corunethron/salph-cosmic-extra-solution (community, ссылки досье), corunethron/sal
- Скачано: репо=4 (файлов 6, 13.6 КБ; медиа 0), issues=0, comments=0, PR=0, releases=0, gists=0, wiki=нет
- Бюджет: api.github.com запросов = 0 (remaining 45, reset 2026-10-18T10:40:53Z); бесплатных транспортов (codeload/ls-remote/git) = 4
- Негативы: репо владельца puzzlehunt: пропущено (исчерпан --api-budget (0 запросов)); форки puzzlehunt/gsmgio-5btc-puzzle: пропущено (исчерпан --api-budget (0 запросов)); не собрано (сверх --max-repos 4): alexdepario/5-btc-puzzle-cosmic-duality, hossein2002426/gsmgio-5btc-puzzle, jwerle/libbeaufort, bitcoin/bitcoin, hosterjackagv/gsmg-5btc-puzzle, kaibuzz0/gsmg.io-solution, corunethron/salph-cosmic-better-solution, corunethron/salph-cosmic-extra-solution, corunethron/salph-cosmic-final-solution, corunethron/salph-cosmic-great-solution, corunethron/salph-cosmic-super-solution, corunethron/salph-cosmic-ultra-solution, dinhoka/gsmgio-5btc-puzzle, halbgott29a/gsmgio-5btc-puzzle, jconorgrogan/lost-eth, juli
- Артефакты: data/github/GITHUB_INTAKE.md, data/github/INTAKE_RESULT.json, data/github/_legacy_pointers.md, data/github/<owner>__<repo>/{files,raw,REPO_META.json}
- Статус шлюза: partial (исчерпан --api-budget (0 запросов)); остаток в data/github/resume.json
- Ссылки/доказательства: puzzlehunt/gsmgio-5btc-puzzle, naddiseo/gsmgio-5btc-puzzle, floflo777/open-crypto-puzzles, jackdevs66/gsmg5_cduality


## 2026-10-18, 13:27 — Qoder (github_intake) — GITHUB INTAKE (шлюз)
- Делал: python tools/github_intake.py run gsmg-io-5btc-puzzle --agent Qoder
- Кандидаты: puzzlehunt/gsmgio-5btc-puzzle (community, ссылки досье), naddiseo/gsmgio-5btc-puzzle (maintainer, ссылки досье), floflo777/open-crypto-puzzles (registry, ссылки досье), jackdevs66/gsmg5_cduality (community, ссылки досье), alexdepario/5-btc-puzzle-cosmic-duality (community, ссылки досье), hossein2002426/gsmgio-5btc-puzzle (community, ссылки досье), jwerle/libbeaufort (community, ссылки досье), bitcoin/bitcoin (community, ссылки досье), hosterjackagv/gsmg-5btc-puzzle (community, ссылки досье), kaibuzz0/gsmg.io-solution (community, ссылки досье), corunethron/salph-cosmic-better-solution (community, ссылки досье), corunethron/salph-cosmic-extra-solution (community, ссылки досье), corunethron/sal
- Скачано: репо=23 (файлов 3279, 88.7 МБ; медиа 186), issues=0, comments=0, PR=0, releases=0, gists=0, wiki=нет
- Бюджет: api.github.com запросов = 0 (remaining 45, reset 2026-10-18T10:40:53Z); бесплатных транспортов (codeload/ls-remote/git) = 26
- Негативы: репо владельца puzzlehunt: пропущено (исчерпан --api-budget (0 запросов)); форки puzzlehunt/gsmgio-5btc-puzzle: пропущено (исчерпан --api-budget (0 запросов)); не собрано (сверх --max-repos 4): alexdepario/5-btc-puzzle-cosmic-duality, hossein2002426/gsmgio-5btc-puzzle, jwerle/libbeaufort, bitcoin/bitcoin, hosterjackagv/gsmg-5btc-puzzle, kaibuzz0/gsmg.io-solution, corunethron/salph-cosmic-better-solution, corunethron/salph-cosmic-extra-solution, corunethron/salph-cosmic-final-solution, corunethron/salph-cosmic-great-solution, corunethron/salph-cosmic-super-solution, corunethron/salph-cosmic-ultra-solution, dinhoka/gsmgio-5btc-puzzle, halbgott29a/gsmgio-5btc-puzzle, jconorgrogan/lost-eth, juli
- Артефакты: data/github/GITHUB_INTAKE.md, data/github/INTAKE_RESULT.json, data/github/_legacy_pointers.md, data/github/<owner>__<repo>/{files,raw,REPO_META.json}
- Статус шлюза: partial (исчерпан --api-budget (0 запросов)); остаток в data/github/resume.json
- Ссылки/доказательства: puzzlehunt/gsmgio-5btc-puzzle, naddiseo/gsmgio-5btc-puzzle, floflo777/open-crypto-puzzles, jackdevs66/gsmg5_cduality, alexdepario/5-btc-puzzle-cosmic-duality, hossein2002426/gsmgio-5btc-puzzle


## 2026-10-18, 13:28 — Qoder (github_intake) — GITHUB INTAKE (шлюз)
- Делал: python tools/github_intake.py run gsmg-io-5btc-puzzle --agent Qoder
- Кандидаты: puzzlehunt/gsmgio-5btc-puzzle (community, ссылки досье), naddiseo/gsmgio-5btc-puzzle (maintainer, ссылки досье), floflo777/open-crypto-puzzles (registry, ссылки досье), jackdevs66/gsmg5_cduality (community, ссылки досье), alexdepario/5-btc-puzzle-cosmic-duality (community, ссылки досье), hossein2002426/gsmgio-5btc-puzzle (community, ссылки досье), jwerle/libbeaufort (community, ссылки досье), bitcoin/bitcoin (community, ссылки досье), hosterjackagv/gsmg-5btc-puzzle (community, ссылки досье), kaibuzz0/gsmg.io-solution (community, ссылки досье), corunethron/salph-cosmic-better-solution (community, ссылки досье), corunethron/salph-cosmic-extra-solution (community, ссылки досье), corunethron/sal
- Скачано: репо=4 (файлов 6, 13.6 КБ; медиа 0), issues=0, comments=0, PR=0, releases=0, gists=0, wiki=нет
- Бюджет: api.github.com запросов = 0 (remaining 45, reset 2026-10-18T10:40:53Z); бесплатных транспортов (codeload/ls-remote/git) = 4
- Негативы: репо владельца puzzlehunt: пропущено (исчерпан --api-budget (0 запросов)); форки puzzlehunt/gsmgio-5btc-puzzle: пропущено (исчерпан --api-budget (0 запросов)); не собрано (сверх --max-repos 4): alexdepario/5-btc-puzzle-cosmic-duality, hossein2002426/gsmgio-5btc-puzzle, jwerle/libbeaufort, bitcoin/bitcoin, hosterjackagv/gsmg-5btc-puzzle, kaibuzz0/gsmg.io-solution, corunethron/salph-cosmic-better-solution, corunethron/salph-cosmic-extra-solution, corunethron/salph-cosmic-final-solution, corunethron/salph-cosmic-great-solution, corunethron/salph-cosmic-super-solution, corunethron/salph-cosmic-ultra-solution, dinhoka/gsmgio-5btc-puzzle, halbgott29a/gsmgio-5btc-puzzle, jconorgrogan/lost-eth, juli
- Артефакты: data/github/GITHUB_INTAKE.md, data/github/INTAKE_RESULT.json, data/github/_legacy_pointers.md, data/github/<owner>__<repo>/{files,raw,REPO_META.json}
- Статус шлюза: partial (исчерпан --api-budget (0 запросов)); остаток в data/github/resume.json
- Ссылки/доказательства: puzzlehunt/gsmgio-5btc-puzzle, naddiseo/gsmgio-5btc-puzzle, floflo777/open-crypto-puzzles, jackdevs66/gsmg5_cduality


## 2026-10-18, 13:31 — Qoder (github_intake) — GITHUB INTAKE (шлюз)
- Делал: python tools/github_intake.py run gsmg-io-5btc-puzzle --agent Qoder
- Кандидаты: puzzlehunt/gsmgio-5btc-puzzle (community, ссылки досье), naddiseo/gsmgio-5btc-puzzle (maintainer, ссылки досье), floflo777/open-crypto-puzzles (registry, ссылки досье), jackdevs66/gsmg5_cduality (community, ссылки досье), alexdepario/5-btc-puzzle-cosmic-duality (community, ссылки досье), hossein2002426/gsmgio-5btc-puzzle (community, ссылки досье), jwerle/libbeaufort (community, ссылки досье), hosterjackagv/gsmg-5btc-puzzle (community, ссылки досье), kaibuzz0/gsmg.io-solution (community, ссылки досье), corunethron/salph-cosmic-better-solution (community, ссылки досье), corunethron/salph-cosmic-extra-solution (community, ссылки досье), corunethron/salph-cosmic-final-solution (community, ссылки
- Скачано: репо=4 (файлов 6, 13.6 КБ; медиа 0), issues=129, comments=500, PR=0, releases=0, gists=0, wiki=нет
- Бюджет: api.github.com запросов = 14 (remaining 36, reset 2026-10-18T10:33:40Z); бесплатных транспортов (codeload/ls-remote/git) = 4
- Негативы: не собрано (сверх --max-repos 4): alexdepario/5-btc-puzzle-cosmic-duality, hossein2002426/gsmgio-5btc-puzzle, jwerle/libbeaufort, hosterjackagv/gsmg-5btc-puzzle, kaibuzz0/gsmg.io-solution, corunethron/salph-cosmic-better-solution, corunethron/salph-cosmic-extra-solution, corunethron/salph-cosmic-final-solution, corunethron/salph-cosmic-great-solution, corunethron/salph-cosmic-super-solution, corunethron/salph-cosmic-ultra-solution, dinhoka/gsmgio-5btc-puzzle, halbgott29a/gsmgio-5btc-puzzle, jconorgrogan/lost-eth, seed-safe/btc-balance, silveranth/gsmgio-5btc-puzzle, turjaun985123/gsmgiopuzzle, abkr1/gsmgio-5btc-puzzle, liam-dow/gsmgio-5btc-puzzle, powerversed01/gsmgio-5btc-puzzle, devjotaduo
- Артефакты: data/github/GITHUB_INTAKE.md, data/github/INTAKE_RESULT.json, data/github/_legacy_pointers.md, data/github/<owner>__<repo>/{files,raw,REPO_META.json}
- Статус шлюза: partial (исчерпан --api-budget (14 запросов)); остаток в data/github/resume.json
- Ссылки/доказательства: https://github.com/puzzlehunt/gsmgio-5btc-puzzle, https://github.com/Naddiseo/gsmgio-5btc-puzzle, floflo777/open-crypto-puzzles, jackdevs66/gsmg5_cduality


### 2026-10-18 — Big Pickle — закрытие оси «буквальные метки страницы как пароль» + интеграция двух новых репо

- **Контекст брони**: `gsmg-io-5btc-puzzle` держал Qoder (note `github-intake`, до 12:18:15Z); я не трогал пазл и работал
  только в своих файлах. В 10:52Z бронь освободилась — взял (TTL 120 мин) только чтобы зафиксировать результат и
  интегрировать репо, затем отпустил.
- **Гипотеза/ось прер-регистрированы ДО прогона** (пока бронь была чужой — отдельным файлом, не в LOG):
  `%TEMP%\opencode\gsmg-enrich\PREREGISTERED_HYPOTHESIS_chain_axis.txt`.
- **Что проверялось.** `testnetbtc/GSMG:reference/03_UNRESOLVED.md` §1.1 публикует «цепочку»: пароль блоба
  `salph_inner` (salt `3ab585348552415d`) = литерал `matrixsumlist`+`enter`+`lastwordsbeforearchichoice`+
  `thispassword`+`matrixsumlist` → при EVP-MD5 даёт 79 Б `1449a217…26bf`; пароль `p32_trailing`
  (salt `b45a5e3d827593ca`) = uncompressed WIF первых 32 Б выхода → тоже валидный паддинг. Оба автора сами зовут
  это «формой ложноположительного PKCS#7» и держат `significance: unverified`.
- **Ось (единственная, ≤15 мин; факт 8.7 с).** Все конкатенации ЛИТЕРАЛОВ, буквально напечатанных на странице
  SalPhaseIon (`matrixsumlist`, `enter`, `lastwordsbeforearchichoice`, `thispassword`,
  `ourfirsthintisyourlastcommand`), длина 1..6 токенов, повторы разрешены, разделитель `""`/`" "`,
  кодировки пароля {сырые байты, sha256-hex}, KDF {md5, sha256}, оба блоба = **312 440 расшифровок**.
- **Критерий (до прогона).** Валидных паддингов ≈ N/243 ⇒ ось закрыта; единственная ⇒ открыта.
- **Результат.** Валидных PKCS#7 — **1218**, ожидаемый шум — **~1286** (отношение **0.95**). Паддингов >1 байта — 5
  (шум ~4.8). Двухзвенных цепочек (WIF первых 32 Б → второй блоб) — **7** (шум ~5). **Призовых ключей — 0.**
  Максимум печатаемости среди всех 1218 валидных — **0.56**; выходов с printable ≥0.85 — **0**.
  **Положительный контроль сработал**: `sha256` выхода цепочки-1 = `1449a2178eea7c0e3fabac8c1ad2afa294be4fc1800c594a025a056e88c626bf` (точно как публикует сообщество).
- **Вердикт: ось ЗАКРЫТА.** Литералы страницы дают ровно столько «открытий», сколько даёт случайная строка той же
  длины. Опубликованная «цепочка» (`CADEIA`, линия Naddiseo #17) — **1 из 1218** валидных и **1 из 7** двухзвенных,
  т.е. статистический артефакт PKCS#7 (тот же класс, что уже отвергнутые `cosmic`/`4f7a1e4e…` и `chain4`).
  Двухзвенность почти бесплатна: из любого валидного выхода пароль следующего блоба строится постфактум.
  Проверена и отвергнута гипотеза «может, пароль даёт бинарный ключ, а printable-валидаторы его отбраковали» —
  читаемого выхода нет вовсе (максимум 0.56).
- **Near-miss в нашей же базе.** Наш прошлый прогон **H-SP1** имел в пуле строку
  `matrixsumlistenterlastwordsbeforearchichoice…` **без замыкающего `matrixsumlist`** — т.е. ровно один токен от
  опубликованного пароля; и валидатор H-SP1 был «приз-или-ничего» (валидные паддинги не записывались). Теперь
  проверено полностью — 0.
- **Скрипт прогона**: `%TEMP%\opencode\gsmg-enrich\chain_axis_probe.py` (полный текст — в отчёте
  `reports/2026-10-18_1348_BigPickle_gsmg-chain-axis-closed.md`, Приложение). Шум-порог калибруется в самом скрипте.
- **Обогащение: два новых независимых репо найдены ШИРОКИМ поиском и скопированы в базу** (текст-слои, без .git и медиа):
  - `data/github_2026-10/testnetbtc__GSMG/files/` (678 файлов + 5 корневых, 11.9 МБ; created 2026-10-15):
    канонический реестр `reference/00_INDEX…08_GLOSSARY` (статусы reproduced/reported/interpreted),
    `EXPERIMENT_COVERAGE.csv`, `SOURCE_INVENTORY.csv`, `reports/MASTER_REASONING_REPORT.md`, research-сессии
    (`btcseed_bits`, `yinyang_ops`, `zero_merge`) с кандидатами-джейсонами. Их негативы **совпадают с нашими**
    по закрытым осям (matrixsumlist-as-key, zero-merge, yin-yang, BTCSEED) + **BSGS по vanity до 2^28** (нет у нас).
  - `data/github_2026-10/applelamps__GSMG-CLEAN/files/` (433 файла, 19.0 МБ; created 2026-09-15): docs 01–15,
    `runs/` (46 прогонов), `tools/`, `prior_research_ledgers/`, `telegram/jrk_messages.txt` (128 КБ).
    Снимок **старше нашей базы на 3–4 недели** (у нас уже есть и `PRIVATEKEY@479`, и `YOUWON` через `turjaun985123`),
    инкрементально: 46-прогонный негатив-леджер с контрольными статистиками, resolution «unforeseen hint» (#5966/#5969
    «prime part»), покерный *straddle* как объяснение «Raising the stakes…», Dutch-lens (снятие ложных трактовок).
- **ПРОЕКТНАЯ НАХОДКА (дыра GitHub-шлюза).** `tools/github_intake.py → discover()` ищет кандидатов по ССЫЛКАМ в досье
  пазла, а его опциональный поиск использует запрос `slug.replace("-"," ")` = `gsmg io 5btc puzzle` (AND-совпадение → 0).
  Поэтому репозиторий, созданный сообществом заново и нигде в досье не процитированный, шлюзом НЕ находится.
  Подтверждено на живом результате: intake Qoder'а (10:33Z) в `data/github/` разложил 20+ репо по фиксированному
  списку, но `testnetbtc/GSMG`, `AppleLamps/GSMG-CLEAN`, `nineeeai-ux/gsmg-5btc-puzzle-solver` там ОТСУТСТВУЮТ —
  их даёт только широкий запрос `q=gsmg` (114 репо). Готовый read-only обход: **`tools/github_broadrepo_scan.py`**.
- **Негативы прохода**: (а) ось литералов — 0 (см. выше); (б) `nineeeai-ux/gsmg-5btc-puzzle-solver` — заглушка
  (size 0, только README); (в) фермы контента `wcw13/gsmgi`, `x0ptghiu9s/gsmg`, `tj9ds49i9c/gsmgg`, `sridharsad/gsmg`;
  (г) публичного `puzle-main`/`STATE_OF_PLAY.md`/`SOLUTION.md` (упомянуты AppleLamps как «внешнее workspace») НЕ существует.
- **Граница прежняя**: стена — interpretive-правило «потребителя» для `btcseed`-объекта (96 состояний) + пароль к
  SP-блобам. Ось «пароль = буквальный текст страницы» теперь исключена количественно.
- Отчёты: `reports/2026-10-18_1348_BigPickle_gsmg-chain-axis-closed.md`,
  `reports/2026-10-18_1335_BigPickle_gsmg-external-repos-and-intake-gap.md`.

#### Пред-регистрация (Big Pickle, 2026-10-18, запись ДО прогона) — ось «литералы создателя × все запертые контейнеры»

- **Почему ещё один прогон по литералам.** Предыдущий прогон (см. запись выше) закрыл ось для пары SP/P32 на
  наборе ИЗ ПЯТИ литералов СТРАНИЦЫ. Но создатель буквально напечатал ещё и второй набор — **road-map из Telegram
  msg 8446** (`tools/gsmg_jrk_reveal_decode_2026-10-18.py`): `yellowblueprimes`, `matrixsumlist`,
  `lastwordsbeforearchichoice`, `yinyang`, `we wont give away the password its in front of your eyes but you're not
  seeing it very last step is a true give away promised`. Подсказка создателя «the password is in front of your eyes»
  указывает именно на ЛИТЕРАЛЫ, а запертых контейнеров три (`salph_inner`, `p32_trailing`, `cosmic`).

- **Гипотеза.** Если пароль одного из трёх контейнеров — конкатенация ЛИТЕРАЛОВ создателя, то в пространстве
  «все конкатенации длиной 1..4 из 13 литералов» должен быть выход, ОТЛИЧАЮЩИЙСЯ от шума (валидный паддинг при
  многобайтовом паддинге и/или читаемый текст). Если распределение снова равно шуму — ось закрыта **комплексно**.

- **Ось прогона (единственная, ≤15 мин).** Токены (13): `matrixsumlist`, `enter`, `lastwordsbeforearchichoice`,
  `thispassword`, `ourfirsthintisyourlastcommand`, `yellowblueprimes`, `yinyang`, `shabef`, `causality`, `theone`,
  `secondanswer`, `yourlastcommand`, `btcseed`. Длины 1..4, повторы разрешены, разделитель `""`/`" "`,
  кодировки пароля {сырые байты, sha256-hex}, KDF {md5, sha256}, блобы: `salph_inner` (salt 3ab585348552415d),
  `p32_trailing` (salt b45a5e3d827593ca), `cosmic` (salt 2d3f6fe06dc950e6).

- **Критерий.** Ожидаемый шум для 1328-Б (`cosmic`) и 80-Б блобов считается отдельно (P ≈ 1/256 и 1/243
  на тест соответственно). Значимо только: паддинг >1 байта при читаемом тексте (printable ≥0.85), либо
  32/64-байтовый ключ, дающий hash160 == `a9553269…bae4`, либо читаемый ASCII.

- **Положительный контроль.** Опубликованный литерал-цепочка-1 (5 токенов) обязан снова дать
  sha256(unpad) = `1449a217…26bf` на `salph_inner` (md5) — тогда harness тот же, что в предыдущем прогоне.

- **Вне оси:** перебор >10^7, GPU, траты, письма, изменение чужих файлов.
- Скрипт: `%TEMP%\opencode\gsmg-enrich\literal_tokens_all_blobs.py`; результат — отдельный отчёт + эта же запись (ниже).
