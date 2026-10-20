# RushWallet Contest #30

Индекс: [MASTER_CATALOG.md](../../MASTER_CATALOG.md) (Части 1-8). Источник данных: [open-crypto-puzzles](https://github.com/floflo777/open-crypto-puzzles).

## Кратко
- Статус: **open** (mid)
- Цепь: bitcoin
- Приз: 1000000 sats (USD 630)
- Примечание: the escrow was funded 101,000,000 sats total: 100,000,000 sats on 2014-09-22 later returned to its own sender on 2015-03-25, and a separate 1,000,000 sats on 2015-04-24 that remains unspent; the 1,000,000 sats figure is the live prize
- Опубликовано: 2015-02-08 http://web.archive.org/web/20150208174448/https://rushwallet.com/js/contest.js
- Типы: brainwallet, audio
- Difficulty left: external-info
- the derivation is certified; about 95 million candidate passphrases across public wordlists have produced zero matches; the likely gate is a video source above the 720p footage currently available, not more computation

## Адреса/эскроу
- `13Q8hJqagtd77ojTJcEZPjTz2sBFSsYxyj` — main | expected: 1000000 sats | state: partially-spent (checked 2026-08-16) | https://mempool.space/address/13Q8hJqagtd77ojTJcEZPjTz2sBFSsYxyj

## Источники
- 2015-02-08 — RushWallet contest script (derivation) — http://web.archive.org/web/20150208174448/https://rushwallet.com/js/contest.js
- 2015-02-08 — RushWallet contest page — http://web.archive.org/web/20150208172337/https://rushwallet.com/contest
- 2026-08-16 — BitcoinTalk discussion thread — https://bitcointalk.org/index.php?topic=793720.0
- 2026-08-16 — Surviving video re-upload — https://www.youtube.com/watch?v=x0LqsUOIw0M
- 2026-10-19 — privatekeys.pw tracker (30 адресов/brainwallets) — https://privatekeys.pw/puzzles/2-btc-rushwallet-puzzle
- 2026-10-19 — Original contest video (archived, unavailable) — https://www.youtube.com/watch?v=sr8lBrtd9U4
- 2026-10-19 — Original contest video (Wayback) — https://web.archive.org/web/20230419210424/https://www.youtube.com/watch?v=Mbu9dD8ahgE
## Подробности
Здесь должна накапливаться расширенная информация по мере проходов: подсказки, прогресс сообщества, проверенные гипотезы, ссылки, compute-оценки. Текущий файл — скелет из OCP; заполняется автоматически в циклах.


## Обновление (2026-10-19, Beam — обогащение из privatekeys.pw)
- Тип: источники / таблица адресов / транскрипт
- Суть: добавлена полная таблица 30 brainwallet-адресов (#26 claimed, баланс 0; #30 open 1 000 000 сат) и транскрипт видео. Файлы: data/privatekeys-pw-30-brainwallets.md, data/privatekeys-pw-video-transcript.md.
- Источник: https://privatekeys.pw/puzzles/2-btc-rushwallet-puzzle
- Проверено: баланс #30 = 1 000 000 сат, #26 = 0 (blockstream, 2026-10-19).

---
## Логирование (обязательно)
См. `../../AGENT_INSTRUCTIONS.md`. Любая значимая находка/прогресс/баланс/решение (полностью или частично) **должна** быть дописана сюда с датой и ссылкой. Параллельные агенты обязаны соблюдать тот же протокол.

## OCP deep docs
- Folder: https://github.com/floflo777/open-crypto-puzzles/tree/main/2-mid-prizes/rushwallet-contest-30-1msats
- README (raw): https://raw.githubusercontent.com/floflo777/open-crypto-puzzles/main/2-mid-prizes/rushwallet-contest-30-1msats/README.md


## Curated deep dive (OCP, 16.10.2026)
- Приз 1 000 000 сат (0.01 BTC), несжатый WIF uncompressed. priv = SHA256(utf8 фразы как есть). Адрес 13Q8hJqagtd77ojTJcEZPjTz2sBFSsYxyj.
- Morze: «DMITRI KNOWS THIS GAME IS NOT EASY… READ SATOSHI'S PAPER».
- Blocker: нужно видео выше 720p — лист в руке Дмитрия около 1:00 (720p не считывает).
- Проверено: ~историческое покрытие SHA256 10 тыс./с; без высокого разрешения продвижение бессмысленно.
- Зацепки: найти оригинальное видео/источник более высокого разрешения; декодировать лист; проверить фразу через SHA256.
- Deep doc: https://raw.githubusercontent.com/floflo777/open-crypto-puzzles/main/2-mid-prizes/rushwallet-contest-30-1msats/README.md
## Досье Hark v2 (16.10.2026)

Перенесено из `MASTER_CATALOG_v2_2026-10-16.md` (рабочие досье агентов Hark, 16.10.2026 23:40 МСК). Картина механизма, подсказок, проверенных и отброшенных гипотез, оракулов и файлов.

### B7. RushWallet #30 — 0,01 BTC
- **→ Полное актуальное досье (что решено, что проверено, что осталось): ЧАСТЬ 8.4 (RushWallet #30).** Старая краткая запись заменена.


### RushWallet #30 — 0,01 BTC
- **Адрес/сеть/путь**: BTC mainnet, `13Q8hJqagtd77ojTJcEZPjTz2sBFSsYxyj` (P2PKH, несжатый ключ). Brainwallet: priv = SHA256(utf8(фраза как есть)), по contest.js 2015.
- **Баланс**: 1 000 000 сат. Проверено 14.10 22:05 MSK (3 tx, 1 трата — исторический возврат). 15.10 01:45 MSK на месте.
  - История:
    - 22.09.2014: пришёл 1 BTC с 1GShq18eb4V6uBtqgwxkmuPTUHCtyBcNYA (кошелёк-фондер);
    - 25.03.2015: этот 1 BTC возвращён организатору, то есть ключ у организатора;
    - 24.04.2015: +0,01 BTC с 1A5M4QrvDNq6S5vAbwd5A9eHFbTipxJefw (кто это — неизвестно). Эти 0,01 BTC не тронуты.
- **Источники**:
  - bitcointalk https://bitcointalk.org/index.php?topic=793720 (583 поста, сохранено в `btt/thread.txt`).
  - https://github.com/visalord/rushwallet-puzzle-30 (копия `visa/`, видео 1280×720 `visa/video/Bitcoin_puzzle_ARCHIVE.webm`, 110,6 с).
  - OCP `2-mid-prizes/rushwallet-contest-30-1msats` (~5,52·10⁸ негативов).
  - kryptokit.com в Wayback.
- **Подсказки и наши чтения**:
  - Морзе в видео: «DMITRI KNOWS THIS GAME IS NOT EASY, MORE WILL COME SOON. IN THE MEANTIME READ SATOSHI'S PAPER.» и позже «…PUZZLES ARE JUST THE BEGINNING. -3302». visalord записал морзе как «debunked».
  - S4VV4S (26.10.2014): «Wallet 30 (the big one) still hides somewhere in the whitepaper». Это мнение игрока, а не организатора.
  - Лист в руке Дмитрия на ~1:00: двухколоночная вёрстка, не 1-я страница whitepaper, в 720p нечитаем (наша сессия 13.10 22:05).
  - Ещё не разобраны:
    - «x4 на груди принцессы»;
    - 16 монет вокруг танцующей коронованной женщины (кадр ~01575);
    - синий прямоугольник на стене;
    - указатель «SLOGAN»;
    - числа на монетах (2784623964023 в 6:13/6:17);
    - email-подсказка «9e]IW8lnJN;J[88U3…»;
    - SoundCloud remix «STARTS WITH PAPA END WITH MIKE. K3R3Y0P1T»;
    - codepen dmitrikryptokov/ixqmh, aceology/DenqF;
    - reddit 2i7uv6 («extra clue to the big wallet»).
- **Что установлено/решено**: таблица механизмов #1–#29 (`clues.md`, `visa/findings.md`). Каждая решённая фраза — дословный текст из кадра или звука, кратность (X2…X7) видна на экране. Ответ #1 «5784623964023 578462396402» показывает, что организаторы делали опечатки и усечения. Фразы #13, #23, #26 забраны в 2014–15, но не опубликованы.
- **Проверено и отброшено** (0):
  - наши ~4·10⁶ (`NOTES.md`):
    - H1 whitepaper (строки, предложения, заголовки × регистр × 1–7 повторов): 20 358;
    - H2 модель опечаток: 3 969 787;
    - шапка whitepaper ×N: 7 830;
    - шаблоны из таблицы #1–#29: A — 19 719, B — 2 566 + 2 739, C — 14 447;
  - медиа:
    - ffprobe: только h264 + aac, тег creation_time 2014-12-28, без субтитров и доп. дорожек;
    - спектрограмма всей дорожки чистая;
    - вспышек scene>0.3 нет;
    - в Wayback clue-картинки kryptokit (wp-content/uploads/2014/09) не архивированы, у clue-542 сохранилась только рамка;
  - OCP ~5,52·10⁸: rockyou ×5 регистров, KJV, окна whitepaper, genesis, 5,1 млн песен, OCR кадров ≤720p и др.;
  - visalord: URL и бренды, все порядки имён, все предложения транскрипта ×1–10, SLOGAN ×1–10 и др. (`visa/findings.md`).
- **Что осталось / следующий шаг**: нужен новый медиа-источник — видео выше 720p (оригинальный YouTube или Vimeo; ID x0LqsUOIw0M, sr8lBrtd9U4, Mbu9dD8ahgE — через Wayback), оригинал письма-подсказки или reddit 2i7uv6. Наращивать перебор запрещено: директива Ильи через координатора, 13.10 18:20.
- **Оракул, скорость, файлы/скрипты**:
  - `/workspace/work/rushwallet30/bw.py` (`python3 bw.py file` или `bw.check(iterable)`, ~10 тыс./с, проверяет и сжатый ключ; самотест на #17, #28, #12).
  - `h1_whitepaper.py`, `h2_typo.py`, `h2b.py`, `wp.txt`/`wp_raw.txt`, `bitcoin.pdf`, `clues.md`, `btt/`, `visa/`, `wayback/`, `cands/`, `fr60/`.
- **Проекты Hark и статус**: проект 4c642759-7a1c-437b-ae54-ee098dfda3c9. Задача ee1bf57f-4931-411e-8b12-3d4c80f20904 на паузе с 13.10 ~22:40 MSK, вердикт «тупик до новой информации». Аудит 15.10: ярус 3, заморозить.
- **Оценка шансов**: наша 13.10 — 2–5%. Аудит 15.10 — ≤1%.

---

## Оперативный статус v2 (16.10.2026 ~23:30 МСК)

Строка из сводной таблицы `MASTER_CATALOG_v2` (Часть 0.3):

| RushWallet #30 | 0,01 BTC, не тронут | ≤1% | Нужно видео >720p | заморожено |

## Досье agntn/puzzles (16.10.2026)

Перенесено из реестра [@agntn/puzzles](https://puzzles.agntn.dev/collections/rushwallet) (raw: https://puzzles.agntn.dev/collections/rushwallet.md). Ниже — разбор первоисточника: механика, кто решал, что проверено.

- `id`: "rushwallet/1"
- `chain`: "bitcoin"
- `address`: "1NKUXbr2URfQyzREPUzoj4MR4ytF5mEm8u"
- `sourceUrl`: "https://web.archive.org/web/20150208172337/https://rushwallet.com/contest"
- `startedAt`: "2014-09-22 20:17:14"
- `status`: Status.Solved
- `pubkey`: uncompressed("040f5492…4d52")
- `key`: hex("af9a17713338d255ca023b7014c2c9dfcbef656d61a3370156bb804269b74a0d")

> Thirty brainwallets from a 2014 contest. Twenty-eight cracked with their passphrases on the record. No prizes recorded. The contest paid outside the addresses.

## The puzzle

RushWallet was a brainwallet service. Type a passphrase, get a key. In September 2014 its author funded thirty addresses from thirty passphrases and dared people to find them. Almost all of them fell over the following years. The last solve on the record is from 2018. And the passphrases turned out to be the kind of thing a wordlist finds: long digit strings, repeated tokens.

## What the records carry

A solved RushWallet puzzle carries the hex key, the uncompressed WIF and the passphrase that produced it. The data gate checks two things: the key derives the address, and the WIF decodes to the key. The passphrase is on the record as data. The library doesn't re-hash it. Passphrase to key is RushWallet's own scheme and out of scope here.

```ts [src/collections/rushwallet/1.ts]
export const rushwalletPuzzle1 = puzzle({
  id: "rushwallet/1",
  chain: "bitcoin",
  address: "1NKUXbr2URfQyzREPUzoj4MR4ytF5mEm8u",
  sourceUrl: "https://web.archive.org/web/20150208172337/https://rushwallet.com/contest",
  startedAt: "2014-09-22 20:17:14",
  status: Status.Solved,
  pubkey: uncompressed("040f5492…4d52"),
  key: hex("af9a17713338d255ca023b7014c2c9dfcbef656d61a3370156bb804269b74a0d")
    .wif("5K9d6a9ivmDKRe77hnzrSrg2iGkwFuvg1cCGDGBpsgyk6is9U7g")
    .passphrase("5784623964023 578462396402"),
  solvedAt: "2018-01-10 19:55:58",
});
```

No `prize` on any of them. The contest paid its winners outside the funded addresses. A prize field here would be a guess, so the record leaves it out instead of writing `0`.

## Status

Twenty-eight `solved`, one `claimed` and one still `unsolved`. `claimed` is the right word for an address emptied without a solver publishing the key. The coins moved. Nobody knows who typed what.

## Every puzzle

One page each: the record, the transactions and the live balance.

<collection-puzzles collection="rushwallet">

</collection-puzzles>

## OCP: машинные данные (puzzles.json, 16.10.2026)

Структурированные данные из `puzzles.json` репозитория [open-crypto-puzzles](https://github.com/floflo777/open-crypto-puzzles) (snapshot OCP: 2026-08-16; цены: {'date': '2026-08-16', 'BTC': 63000, 'ETH': 1880, 'AR': 1.81, 'LTC': 54}).

- `slug`: rushwallet-contest-30-1msats
- `title`: RushWallet Contest #30
- `status`: **open**
- `tier`: mid | `chain`: bitcoin
- `series`: RushWallet/KryptoKit 30-brainwallet contest
- `author`: RushWallet / KryptoKit
- `prize`: 1000000 sats (оценка $630 на 2026-08-16) — the escrow was funded 101,000,000 sats total: 100,000,000 sats on 2014-09-22 later returned to its own sender on 2015-03-25, and a separate 1,000,000 sats on 2015-04-24 that remains unspent; the 1,000,000 sats figure is the live prize
- `published`: 2015-02-08 http://web.archive.org/web/20150208174448/https://rushwallet.com/js/contest.js
- `puzzle_type`: brainwallet, audio
- `target_format`: unknown passphrase string, hashed verbatim (no trim, no case folding, no salt), SHA-256 as the 32-byte private key, uncompressed public key, P2PKH
- `difficulty_left`: external-info
- `difficulty_note`: the derivation is certified; about 95 million candidate passphrases across public wordlists have produced zero matches; the likely gate is a video source above the 720p footage currently available, not more computation
- `tested_total`: {'candidates': 95000000, 'families': 7, 'certified': False}

**Адреса и проверенное состояние:**
- `13Q8hJqagtd77ojTJcEZPjTz2sBFSsYxyj` — escrow | main | ожидается: 1000000 sats | проверено 2026-08-16: **partially-spent**
  - https://mempool.space/address/13Q8hJqagtd77ojTJcEZPjTz2sBFSsYxyj

**Деривация:**
- private_key = SHA256(utf8(passphrase)) taken verbatim, uncompressed secp256k1 public key, address = base58check(0x00 || RIPEMD160(SHA256(pubkey)))
- оракул: `tools/oracle.py` | сертифицирован: True
- сверено с: passphrases publicly claimed by other solvers for sibling brainwallets #17 and #28 of the same contest, plus the contest host's own address

**Зацепки (OCP `leads`):**
  - title: a higher-fidelity copy of the original promotional video | status: open
  - title: the Quotes-500K corpus, not yet ingested | status: open
  - title: the uncovered tail of the song-lyrics corpus (about 4.7 million songs) | status: open

**Материалы третьих лиц:**
- the promotional video and its re-uploads are third-party/platform hosted and not mirrored here; only short quoted transcriptions and archived-page links are included

**Источники (OCP `sources`):**
  - url: http://web.archive.org/web/20150208174448/https://rushwallet.com/js/contest.js | title: RushWallet contest script (derivation) | date: 2015-02-08
  - url: http://web.archive.org/web/20150208172337/https://rushwallet.com/contest | title: RushWallet contest page | date: 2015-02-08
  - url: https://bitcointalk.org/index.php?topic=793720.0 | title: BitcoinTalk discussion thread | date: 2026-08-16
  - url: https://www.youtube.com/watch?v=x0LqsUOIw0M | title: Surviving video re-upload | date: 2026-08-16
