# kTimesG Phy (800 000 сат): оракул подписи восстановлен с нуля, подпазл «PGP MESSAGE» решён (пароль `already mentioned`), ось «один бит на маркер» закрыта негативом

- **Агент:** Qoder (Qoder Desktop, Windows, DESKTOP-PE9BOJ5, CPU-only, без GPU и без трат)
- **Дата/время:** 2026-10-18, 13:20–14:30 MSK (10:20–11:30Z). Бронь `ktimesg-phy-challenge-0-008btc` (`claims acquire … --agent Qoder --ttl 120`, heartbeat в 12:45Z и 13:10Z).
- **Тип:** сессия по плану пользователя от 18.10 (цель №5 в списке приоритетов — Phy): (1) репликация оракула, (2) шлюз GitHub-intake (правило №9), (3) две предрегистрированные оси H11a и H11b.
- **Что здесь новое для базы:** до этой сессии в базе **не было воспроизводимого `z`** (весь код эпохи Hark и `signed_message.txt` утрачены), подпазл PGP считался непроходимым («the password is still open» — KarTonP, msg67107155, 21.09.2026), а восстановление подписи в 1/3/4-й сессиях опиралось на чужие утверждения.

## 1. Репликация ECDSA-оракула (точность вместо доверия)

Носитель: Wayback-снап поста msg66802369 (bitcointalk.org с этой машины не резолвится) → `data/wayback/pre_fix.html`, `post_fix_oct4.html`. Текст OP вытащен парсером кодовых блоков (`tools/phy_replicate.py::code_blocks`), 959 символов, **без завершающего перевода строки**.

Подпись из второго кодового блока (после «BACKSPACE cat»-фикса, 30.07): 87 символов base64 = 65 байт, header 39 (P2WPKH, recid 0):
`J0d1vHyLWQXkQWZBhfQmZWu8jgXA54DgLx+bPJQNBrL4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAABbiQspK6Gr2bE`
→ `r = 0x4775bc7c8b5905e441664185f426656bbc8e05c0e780e02f1f9b3c940d06b2f8`, `s = 0x5b890b292ba1abd9b1` (9 значащих байт, 71 бит).

`z = sha256d(b"\x18Bitcoin Signed Message:\n" + varint(959) + msg)`. Результат прогона 9 вариантов текста × 4 recid (`tools/phy_recover_try.py`):

| вариант | pubkey | адрес | вердикт |
|---|---|---|---|
| T0 (OP как есть) | `02425afdd1716149faf414b6fdb96d5e7afc8ce42496042f4df559c80a7c6650eb` | `bc1qrpn28qa82uyjg37dvsz3w7wpm3kpdea957nm9p` | **СОВПАДЕНИЕ с таргетом** |
| T0.strip | тот же | тот же | СОВПАДЕНИЕ |
| остальные 16 | — | — | мимо |

Самотесты арифметики: privkey 1 → `0279be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798`; bech32-конвейер → эталонный `bc1qw508d6qejxtdg4y5r3zarvary0c5x87kvqaby` (BIP173). Найденная по ходу ошибка (модуль поля P подменялся порядком группы N в point arithmetic и в guard'е decompression) исправлена — P и N разделены явно.

Баланс перед прогоном проверен заново (18.10, 11:20Z, blockstream.info): 800 000 сат, исходящих 0.

## 2. Шлюз GitHub-intake (правило №9)

`python tools/github_intake.py run ktimesg-phy-challenge-0-008btc --agent Qoder` → статус **partial** (25 запросов к api.github.com, remaining 54), артефакты в `data/github/`, остаток в `resume.json`. Вытащено то, чего в досье не было:

- `arturfromtheblock/emoji-mapping-tool` → `Phy Challenge Data/phy_emoji_data.csv`: 257 маркеров с id, x, y, w, h, cx, cy, **angle_deg, radius**, char, name, cp_hex, cp_bin, utf8_hex, utf8_bin (человеческая разметка AFTB, автора первого поста в теме).
- `agntn/puzzles` (npm-дистрибутив `agntn_pkg`) → 19 официальных хинтов с id постов и датами, `PICTURE`, digest `baf3ed80…` на 1 687 922 байта, funding tx `2ba79d0b…5964d3`.
- `data/wayback/thread.txt` — 80 постов темы целиком (CDX + `id_`-снапы с gzip; без decompression первые выгрузки были бинарным мусором).

## 3. H11a: подпазл «PGP MESSAGE» — **РЕШЁН**

Хинт автора от 21.06.2026 (пост-приз msg66860784): «A final useful sign (**the password's already mentioned**)» + PGP-блок.

Спецификация носителя (моя проверка пакетами, `tools/phy_pgp_probe.py`, `tools/phy_pgp_lib.py`): SKESK v4, шифр 9 = AES-256, S2K 3 (iterated+salted), hash 10 = SHA-512, salt `5708258122F19519`, c-byte 0xFF → count 65 011 712; SEIPD v1, 55 байт. **CRC-24 брони = 0FEB9B совпал с рассчитанным по 72 байтам** → base64 восстановлен побайтово точно, пакеты заполняют blob без остатка. Открытый текст по структуре 24 байта (1+8+24+22 = 55).

Оракул — gpg 2.4.9 (Git for Windows), **сертифицирован до первого кандидата**: тем же gpg сделан эталонный блок с идентичными параметрами и известным паролем → верный пароль даёт rc=0 и точные 24 байта, неверный rc=2 и пустой вывод. Собственная реализация S2K сертификацию не прошла (не угадана семантика вставки промежуточного хеша у GnuPG) — в подборе не участвовала; это зафиксировано в LOG, чтобы следующий агент не принял её за рабочую.

Прогон `tools/phy_pgp_crack.py`: **1 964** кандидата, все из упоминавшегося (P0 якоря и варианты написания 370, P1 строки кодового блока OP 7, P2 2/3/4-граммы OP-текста 1 224, P3 CAPS-токены темы 214, P4 уникальные слова темы 149), 16 воркеров, **покрыто 1964/1964 за 194,9 с** (потолок 700 с не выбран).

**Хит (1, точный): пароль `already mentioned`** → `gpg: decryption okay` (MDC-проверка пройдена). Открытый текст: `2E 0A` = «.» + LF; literal-пакет mode b, имя файла пустое, ZIP algo=1, created 1782057597 = 2026-06-21T15:59:57Z — за ~2 часа до транзакции приза (18:08:38 того же дня), т.е. это момент выкладки хинта.

Как читать: авторские формулировки буквалистичны («the password's already mentioned» = пароль буквально «already mentioned»). Содержимое — одиночная точка: знак умножения (домножение k·G / d·G, как предполагал whanau в msg67116020) и/или «точка, финал». **Новых байтов для k подпазл не даёт** — ветка закрыта как решённая; это первый задокументировный успех по PGP в открытой теме (21.09 KarTonP: «the password is still open»).

## 4. H11b: «один бит на маркер» — количественный негатив

`tools/phy_h11b_streams.py`. Самотесты: реальные r,s,z → таргет-ключ и адрес; privkey 1 → эталон; **синтетическая подпись** (k0=0xDEADBEEFCAFEBABE, d0=0x12345) проходит обе ветки оракула. Попутно исправлен баг в `phy_replicate.recover`: бит recid-0 использовался одновременно для сдвига `x = r + n` и для чётности y, из-за чего recid 1..3 были неверны; теперь бит0 = чётность y, бит1 = сдвиг x (сертифицированный recid=0 не затронут, но покрытие recid 1..3 стало корректным).

Данные: 4 таблицы SecretAdmirere (msg67069308; `position, draw_order, side A/B, glyph c.p.+.тон 0..5, name`) по 256 строк + CSV AFTB + 8 зеркальных id (9, 56, 81, 134, 151, 162, 172, 185).

284 именованных потока → 130 уникальных кандидатов: свойства (чётность первого тона, тон≥3, тон≤1, чётность суммы тонов, «нет тона» (44 строки), зеркальность, тон как байт, младший/старший байт codepoint) × порядки (position и draw_order по 4 таблицам; id, angle±, radius± из CSV) × сборка (MSB/LSB) × роль (k и d).

**Результат: 0 хитов.** Показательно, что ни один поток не прошёл даже первое условие `(k·G).x mod n == r` — это закрывает всё семейство «возьми битовое свойство эмодзи и упорядочи_known-способом» (у KarTonP на то же ушло ~940 кандидатов, msg67116114).

## 5. Строение картинки (измерено, а не пересказано)

`tools/phy_scan_image.py`, `phy_grey_struct.py`, `phy_obj_scalars.py`, `phy_sheet2.py`; результаты в `data/image_*.json`, `data/sheet_000.png`, `data/sheet_025.png`:

- 2048×2048 RGBA; ровно **256** связных компонентов ≥500 px плюс центральная монета; 99,47% пикселей точно серые (R=G=B), цвет существует **только внутри монеты** (в т.ч. 1161 бордовых px); альфа имеет 256 различных уровней.
- Негатив: ни один по-объектный скаляр (mean/median/mode/max/min/n_uniq/px/opaque_px/alpha_sum/wsum) не образует перестановку 0..255 → канал «плоский серый = байт» в картинке отсутствует.
- Монтаж кропов просмотрен глазами: глифы — цветные эмодзи, переведённые в серый, у людей/рук видны разные уровни серого по тону кожи (тонкий канал существует).
- Диф OP-текста с настоящим абстрактом Bitcoin: заменены именно «хешевые» слова — electronic cash → modular values, financial institution → fractional reserve banking system, double-spending → private key recovery, timestamps transactions → spacestamps information, **hashing them → carefully measuring it**, hash-based proof-of-work → **phylo-based proof-of-equivalence**, The longest chain → The chain. То есть сам OP формулирует метод («no hashing»): вместо хеша — измерение и филлотаксис. Это качественный вывод, чисел он не даёт.

## 6. Что закрыто и что осталось

Закрыто этой сессией: воспроизводимость оракула (r, s, z, pubkey, адрес) — ранее отсутствовала; подпазл PGP (решён, данных не даёт); семейство потоков «бит-свойство × порядок» (130 кандидатов, 0 хитов); ложная надежда на «серый = байт» (измерено).

Открытый остаток (одна ось, предрегистрирована в LOG как H11c): **собственный канал измерения геометрии** — квантованные отклонения r_i от идеальной филлотаксисной решётки c·√i, угловые остатки, парные «противоположности» 128 пар (aakhey, msg67053662). Это уже не вариации «один бит на маркер», а новая конструкция, и она требует рисунка-оригинала (есть: `data/05_puzzle.png`, sha256-совпадение с digest 1687922 B).

Ограничение честности: мета-хинт 05.09 `gvonys fhelucrM kbZ` расшифрован только как ROT13 + чтение слов задом наперёд → «flabit Zephyrus Mox» (17 букв; 17 = половина «34 tick» на ободе монеты по whanau). Дальше не читается; слово Zephyrus в подборе паролей PGP не сработало (перебран 1964).

## 7. Организационное: конфликт, требующий решения пользователя

В базе Phy числится **замороженным по решению Ильи 14.10 («do not touch»)**: `puzzles/ktimesg-phy-challenge-0-008btc/README.md:85` и `MASTER_CATALOG.md:1041,1096` (статус «заморожено», «Пауза до новой подсказки автора»), и в `OPTIMAL_TARGETS_2026-10-17.md:30` Phy исключён. При этом утверждённый 18.10 план поставил Phy целью №2, а 17.10 Hark уже делал «тест-заход после разморозки» и рекомендовал вернуть заморозку. Работа этой сессии была аналитической (только чтение, без трат, без обращений к автору, прогоны ≤15 мин), но формально она идёт вразрез с записью «не трогать». **Нужна явная отметка Ильи: продолжать Phy (и тогда снять строку «заморожено» в каталоге) или остановить на достигнутом.**

## 8. Артефакты

`puzzles/ktimesg-phy-challenge-0-008btc/`: `LOG.md` (записи 13:20, 14:00, 14:10 — гипотезы и оси до прогонов), `tools/phy_{replicate,recover_try,pgp_probe,pgp_lib,pgp_crack,h11b_streams,scan_image,grey_struct,obj_scalars,csv_struct,sheet2,parse_tables,selftest}.py`, `data/wayback/*` (thread.txt, posts.json, снапы, extracted.json), `data/github/*`, `data/pgp_ref/{phy.pgp,ref.pgp,plain.bin}`, `data/pgp_pass_candidates.json`, `data/pgp_sweep.log`, `data/pgp_sweep_result.json`, `data/secretadm_tables.json`, `data/h11b_result.json`, `data/image_*.json`, `data/sheet_0*.png`.

## 9. Как проверить

```
cd puzzles/ktimesg-phy-challenge-0-008btc
python tools/phy_recover_try.py            # должен напечатать MATCH pubkey/адреса
python tools/phy_pgp_lib.py                # CRC24 0FEB9B, пакеты 13+55
python tools/phy_pgp_crack.py --prep       # сертификация оракула + 1964 кандидата
python tools/phy_h11b_streams.py           # самотесты OK, 130 кандидатов, 0 хитов
echo "already mentioned" | "/c/Program Files/Git/usr/bin/gpg.exe" --batch --quiet \
  --pinentry-mode loopback --passphrase-fd 0 -vv -d --output /dev/null data/pgp_ref/phy.pgp
```
