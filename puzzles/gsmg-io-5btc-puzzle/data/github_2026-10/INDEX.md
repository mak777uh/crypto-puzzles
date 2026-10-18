# GSMG — GitHub / открытая сеть: развед-проход 2026-10-18 (агент Big Pickle)

Источник: прямые запросы GitHub API + raw.githubusercontent + grep.app + webfetch.
Дата прохода: 2026-10-18. Пазл на момент прохода: **не решён** (ни один публичный ключ/лик не найден).
Реальный приз: **~1.2563 BTC** на `1GSMG1JC9wtdSwfwApgj2xcmJPAwx7prBe` (5 → 2.5 → 1.25 по халвингам);
сплит 3.75 BTC на `17ucy1K9ZUAaoY6JVtM932W9jUp5LXfyHa` (без опубликованного пути выплаты).

## Что найдено (по убыванию ценности)

### 1. `floflo777/open-crypto-puzzles` — самый свежий и строгий state-of-art
- URL: https://github.com/floflo777/open-crypto-puzzles (206★, 78 форков, push **2026-10-17**).
- Локально: `floflo/` (GSMG-раздел) + `floflo/TOP__*` (корень репозитория).
- Ключевые файлы: `floflo/README.md` (GSMG, 30 КБ), `floflo/analysis__leads.md` (ранжированные зацепки),
  `floflo/analysis__tested.md` (полный ledger негативов, ~62.6M кандидатов в двух 80-байтовых замках
  + 335.7M на объекте-256), `floflo/data__planted-addresses.csv` (оракул «9 посаженных адресов»),
  `floflo/tools__oracle.py` (сертифицированный оракул: адресная половина сверена с on-chain pubkey,
  AES-половина — с фазой-2 блобом).
- Методология: `floflo/docs__methodology.md` — «oracle first, негатив только со свидетелем, insight over compute».

### 2. `HosterjackAGV/gsmg-5btc-puzzle` — компендиум-архив сообщества (2026-09-22)
- URL: https://github.com/HosterjackAGV/gsmg-5btc-puzzle (автор Hosterjack / @DaneelOlivaw в Telegram),
  живой сайт https://hosterjackagv.github.io/gsmg-5btc-puzzle/.
- Локально: `HosterjackAGV__gsmg-5btc-puzzle/` — `docs__ENDGAME-ANALYSIS.md`, `docs__LOOSE-ENDS.md`,
  `docs__VERIFIED-SOLUTIONS.md`, `docs__CREATOR-INTEL.md`, `docs__CREATOR-LOG.md`, `docs__ATTEMPTS.md`,
  `content__sowut-data.js` (лог всех сообщений автора @SoWut), `ciphertexts__*` (сырые блобы).

### 3. `turjaun985123/gsmgiopuzzle` — форк большого форензик-проекта (2026-10-14)
- URL: https://github.com/turjaun985123/gsmgiopuzzle.
- Локально: `turjaun985123__gsmgiopuzzle/timeline.md` (открытия #69–#77, до 2026-10-14),
  `route_tree.md`, скрипты. Линия наследует `floflo777` и проект `Naddiseo`.

### 4. Прочие репозитории-попытки (сохранены целиком)
`Dileep-Kumar-5/gsmg-puzzle-analysis` (криптонабор: kangaroo, duality, vic, dbbi, faed, permute9),
`jackdevs66/GSMG5_CDuality`, `bidcoinauction/gsmgio_puzzle_kit` (в т.ч. `manifest/found_key.py`,
`What Was Originally Shared.md`), `mkno03/GSMG-5BTC-Crypto-Puzzle-Solver`, `beltromatti/5-btc-puzzle`,
`dinhoka/gsmgio-5btc-puzzle`.

### 5. Прочие сетевые источники (в `_web/`)
- `_web/agntn_puzzles_dossier_gsmg.html` — досье https://puzzles.agntn.dev/collections/gsmg (машиночитаемый
  рекорд: адрес, uncompressed pubkey, 127 транзакций, 7 стадий, «unsolved»).
- `_web/gsmg-archive.org_index.html` — зеркало https://gsmg-archive.org/ с сырыми текстами фаз и блобами.
- `_web/privatekeys.pw_gsmg.html` — https://privatekeys.pw/puzzles/gsmg-puzzle (UNSOLVED, 1.25649674 BTC).

## Что из этого — НОВОЕ относительно нашей базы (на 2026-08)

1. **Приз = 1.2563 BTC** (не 5 и не 1.25+3.75 как «призовые»); `17ucy1K9…` — сплит халвинга без пути выплаты.
2. **SalPhaseIon-страница** (`89727c59…`) достигается SHA-256 от текста первой страницы
   (`GSMGIO5BTCPUZZLECHALLENGE1GSMG1JC9…`), а **не** через Decentraland/Architect. На ней **два блоба**:
   малый (`Salted__`, соль `3ab585348552415d`, 80 B ct) и большой **Cosmic Duality** (=«Dualite» в разметке).
3. **Второй 80-байтовый замок** — phase 3.2.2 (внутри фазы 3.2, соль `b45a5e3d827593ca`). Оба замка
   одной формы; «the private keys belong to half and better half» предшествует первому, «yinyang» анонсирован
   после второго.
4. **«Расшифровка Cosmic Duality» фальшива** (независимое подтверждение нашего вывода):
   floflo §11–13 воспроизводит community-ключ (XOR 7 SHA-256 токенов → EVP-MD5) и «Half/Better half»,
   но §14 показывает: это **padding-случайность** (93/20000 валидных паддингов по 1 байту; plaintext равномерный).
   Единственный документированный автором дайджест — **SHA-256**; MD5 — иллюзия.
5. **Оракул «третья дверь»**: vanity-кошелёк `3GSMG24TujqfMJG1kQoBX18DzJHQLeJYMK` профинансировал 9 адресов;
   8 с известным прообразом, `1NULY7DhzuNvSDtPkFzNo6oRTZQWBqXNE9` (2020-04-07, без сообщения) — без прообраза.
   Точный офлайн-оракул (~176 тыс. ключей/с на ядро). Полный список — `floflo/data__planted-addresses.csv`.
6. **«neighbors, half and double»** = 2P, P/2, P+G, P−G — byte-exact подтверждено.
7. **Объект-256**: нечётный поток Bifid (285 букв, алфавит 9 букв) минус I/O = 256 символов над
   23-буквенным алфавитом (единственная из 7 пар, дающая Base58-валидный алфавит). **29 выброшенных I/O
   никогда не читались как отдельное сообщение** — дешёвая новая зацепка (floflo lead #6).
8. **Lead #4 (floflo): автор использовал ОДИН публичный инструмент шифрования на всех фазах**; его Bifid
   не имеет параметра периода (период = длина сообщения), меню шифров короткое (<12). Новая инсайт-ось.
9. Репозиторий `puzzlehunt/gsmgio-5btc-puzzle` **заброшен** (issue #105), свежие claims (#69, #79, #91,
   #108, #115/#116) — ИИ-ошибки/совпадения; Naddiseo (контрибьютор) подтверждает: **не решено**.
10. Публичный uncompressed-pubkey доступен с самого начала → адрес открыт дискретному логарифму
    (как `bits`-пазлы после спенда). Никто не имеет и этого.

## Итог прохода

Публичного решения/лика ключа **нет**. Ряд зацепок фальшив (chain4/CADEIA, cosmic-расшифровка, 12 адресов,
BYTENPHASE). Реальный фронтир тот же: пароли двух 80-байтовых замков и Cosmic Duality; объект-256;

третья дверь. Новых прогонов в этом проходе **не делалось** (только разведка/чтение).
