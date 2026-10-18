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
