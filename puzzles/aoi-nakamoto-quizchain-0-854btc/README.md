# Aoi Nakamoto Quizchain

Индекс: [MASTER_CATALOG.md](../../MASTER_CATALOG.md) (Части 1-8). Источник данных: [open-crypto-puzzles](https://github.com/floflo777/open-crypto-puzzles).

## Кратко
- Статус: **open** (big)
- Цепь: bitcoin
- Приз: 0.777 BTC (USD 48951)
- Примечание: Block 76 (0.077 BTC) was solved and swept by a reader on 2026-08-17; only Real Big Block (0.777 BTC) remains open
- Опубликовано: 2019-04-01 https://www.reddit.com/r/Grycoin/
- Типы: bip39-seed, word-selection
- Difficulty left: external-info
- Real Big Block: the transform and the case-flip rule are confirmed exactly on a solved sibling lot; what is missing is the precise source text the author hashed on 2019-07-30. She removed one twist that day and kept at least one, and later wrote that she lost the solution herself. Every contiguous paragraph span (1,469,908 texts), a bounded 2-edit slice on the full chapter (221,520 texts), every pair of boundary edits on 16 certified bases (48,379,696 texts) and the rule the chapter dictates itself are negatives. The reader who swept Block 76 on 2026-08-17 holds the convention of a final Aoi block, which is the cheapest calibration left

## Адреса/эскроу
- `14zMkTgaVXJcxdh4JdWi29MLRR44iUSG9W` — Real Big Block, stage 2 | expected: 77700000 sats | state: funded-unspent (checked 2026-08-27) | https://mempool.space/address/14zMkTgaVXJcxdh4JdWi29MLRR44iUSG9W
- `13Cv6SXUnzGDT8JHqzzJ8xMPtsSdhJA4wd` — Quizchain2 Block 76 | expected: 7700000 sats | state: swept (checked 2026-08-21) | https://mempool.space/address/13Cv6SXUnzGDT8JHqzzJ8xMPtsSdhJA4wd
- `19TbyN5KCg1Lg7qHwezifsLVcdSa2Rj5KN` — Real Big Block, stage 1 (certification reference, solved by a third party in 2019, not part of the live prize) | expected: n/a | state: swept (checked 2026-08-16) | https://mempool.space/address/19TbyN5KCg1Lg7qHwezifsLVcdSa2Rj5KN

## Источники
- 2019-07-07 — Real Big Block stage 1 — https://www.reddit.com/r/Grycoin/comments/ca6jxv/77_mbtc_quizchain2_block_77_stage_one/
- 2019-07-22 — Quizchain2 Block 76 — https://www.reddit.com/r/Grycoin/comments/cgcv9i/77_mbtc_quizchain2_block_76/
- 2019-07-25 — Real Big Block Discussion — https://www.reddit.com/r/Grycoin/comments/chn8un/real_big_block_discussion/
- 2019-07-23 — Second, Wattpad chapter by AoiNakamoto — https://www.wattpad.com/720888559-second
- 2019-08-15 — Wattpad Nightmode userstyle, copies generic pre { white-space: pre-wrap } — https://github.com/uso-archive/data/blob/master/data/usercss/170148.user.css
- 2019-07-15 — Common Crawl CC-MAIN-2019-30 Wattpad homepage (CSS URL v=eb03e30) — https://index.commoncrawl.org/CC-MAIN-2019-30-index?url=www.wattpad.com/&output=json
- 2019-07-22 — [777 mbtc] Quizchain last block, r/Grycoin, with the 2019-07-30 update on the removed twist — https://www.reddit.com/r/Grycoin/comments/cgkpbb/777_mbtc_quizchain_last_block/
- 2019-07-23 — Starting Up, Wattpad part by AoiNakamoto: the author lost the solution — https://www.wattpad.com/762380140
- 2019-07-30 — Real Big Block escrow funding transaction — https://mempool.space/tx/a1916e7ed9eac3fcc56a55056328cb09d06925e2694f2e6720de12b228514d1f
- 2019-07-22 — Block 76 escrow funding transaction — https://mempool.space/tx/979670f3d1d4134e7989ed6f4a4370362e15c101711c93675790cf0751c8dbd4
- 2013-05-27 — Hal Finney, Bitcoin and me, bitcointalk topic 155054 — https://bitcointalk.org/index.php?topic=155054.0

## Подробности
Здесь должна накапливаться расширенная информация по мере проходов: подсказки, прогресс сообщества, проверенные гипотезы, ссылки, compute-оценки. Текущий файл — скелет из OCP; заполняется автоматически в циклах.


---
## Логирование (обязательно)
См. `../../AGENT_INSTRUCTIONS.md`. Любая значимая находка/прогресс/баланс/решение (полностью или частично) **должна** быть дописана сюда с датой и ссылкой. Параллельные агенты обязаны соблюдать тот же протокол.

## OCP deep docs
- Folder: https://github.com/floflo777/open-crypto-puzzles/tree/main/1-big-prizes/aoi-nakamoto-quizchain-0-854btc
- README (raw): https://raw.githubusercontent.com/floflo777/open-crypto-puzzles/main/1-big-prizes/aoi-nakamoto-quizchain-0-854btc/README.md


## Curated deep dive (OCP, 16.10.2026)
- Механизм: текст (UTF-8) → MD5 → 16 байт → BIP39 12 слов → m/44’/0’/0’/0/i → P2PKH, сравнение с двумя эскроу.
- Эскроу: 0.777 BTC (14zMkTgaVXJcxdh4JdWi29MLRR44iUSG9W, stage2), 0.077 BTC (13Cv6... swept 2026-08-17), 19Tby... solved (reference).
- Подсказки: «Final version of the second chapter», «13 10 13 10» (двойной Enter), «7-й приватный ключ… но первый тоже».
- Автор потеряла решение; transform/case-flip rule подтверждены на sibling lot Block 77 Stage One ((piece1 8f42a05bdf-063df3..., префикс #7); flip rule certified separately).
- Проверено: ~3.98e8 MD5-кандидатов (34 families), вкл. contiguous paragraph spans (1,469,908 texts), bounded 2-edit on full chapter (221,520), 16 certified bases * all boundary pairs (48,379,696), rule chapter dictates.
- Зацепки: (1) спросить solver’а Block 76 о сериализации/индексе/конвенции финального блока Aoi; (2) bounded 2-char edit sweep вне двух просеянных семей; (3) non-uniform 2019 editor buffer или non-contiguous selection; (4) все 2-char edits на 8 certified bases на GPU (4-5 GPU-часов, низкий EV).
- Deep doc: https://raw.githubusercontent.com/floflo777/open-crypto-puzzles/main/1-big-prizes/aoi-nakamoto-quizchain-0-854btc/README.md
## Досье Hark v2 (16.10.2026)

Перенесено из `MASTER_CATALOG_v2_2026-10-16.md` (рабочие досье агентов Hark, 16.10.2026 23:40 МСК). Картина механизма, подсказок, проверенных и отброшенных гипотез, оракулов и файлов.

### B2. Quizchain Real Big Block (Aoi Nakamoto) — 0,777 BTC
- **→ Полное актуальное досье (что решено, что проверено, что осталось): ЧАСТЬ 8.4 (Quizchain).** Старая краткая запись заменена.


### Quizchain Real Big Block (Aoi Nakamoto) — 0,777 BTC
- **Адрес/сеть/путь**: BTC mainnet, `14zMkTgaVXJcxdh4JdWi29MLRR44iUSG9W` (P2PKH). Цепочка: текст (UTF-8) → MD5 (16 байт энтропии) → BIP39, 12 слов без пароля → m/44'/0'/0'/0/i (i = 0…5). Подсказка «7-й ключ… но первый тоже» указывает на индекс 0.
  - Старый адрес до перехеширования: `1EFojcAo2vbhRGCGCa7q8Wwvzss28mhQYC` (пуст). Он нужен как второй оракул для «старой» версии текста (один перенос между абзацами).
- **Баланс**: 77 700 000 сат, 1 tx, трат 0. Проверено 14.10 22:05 MSK (bal_2026-10-14.txt). 15.10 01:45 MSK приз на месте.
- **Источники**:
  - Глава Wattpad https://www.wattpad.com/720888559-second (история 184148284 «Second», описание «Hint for block 77»). Сохранены `second_api.html` (apiv2/storytext?id=720888559), `second_plain.txt` и все 34 части в `parts/`.
  - r/Grycoin и r/bitcoinpuzzles через Arctic Shift: `aoi_posts_all.json`, `*_comments.json`, `pp_comments.json` (70 комментариев puzzleponky).
  - OCP `1-big-prizes/aoi-nakamoto-quizchain-0-854btc` (tested.md, ~3,2·10⁸ негативов).
  - agntn real-big-block, grycoin/2; benevolentcyka/puzzle (README: unsolved, 26.09.2026); gist David-glitc (план GPU).
- **Механизм**: подтверждён самотестом `tools/engine.py selftest` на векторе автора и Stage One. Инструмент автора умеет и SHA-256 → 24 слова (QC1-4/10), переключатель сбрасывается на MD5.
- **Подсказки и наши чтения** (r/Grycoin, 2019):
  - 24.07: «Final version of the second chapter».
  - 25.07: лишние переносы на Wattpad «нужны для решения».
  - 28.07: «один перенос (13 10)» — это для старого адреса.
  - 30.07: «формат первой стадии — большая подсказка к формату второй»; перехешировала, «убрала один из твистов», теперь «Enter дважды» = 13 10 13 10.
  - Позже, часть 762380140 «Starting Up»: автор «потеряла всю информацию о решении» («tragic boating accident variation»).
  - Аномалии главы: «ppM», «VIrgin», «BItcoin», «can't change the past'".». 10 абзацев с `<br>` (62, 120, 159 — посреди предложения). Глава из 273 `<p>`, modifyDate 24.07.2019 02:12 MSK, то есть до финансирования 30.07. `data-p-id` = MD5 абзаца.
- **Что установлено/решено**:
  - Нормализация воспроизведена до адреса funding-tx на 8 решённых блоках и Stage One: QC1-4, QC1-10, QC1-15, QC1-29, QC2-29, QC2-50, QC2-62, QC2-63, а также Grycoin-1 (`tools/qc1lib.py`).
  - Автор всегда хешировала с LF, хотя писала «13 10». Её «ошибки» механические: хвостовой LF из редактора.
  - QC1-29 = 17 строк через `\n` + «vOIce» + « » + последние 3 символа WIF прошлого блока.
  - Правило Stage One: в посте Финни (16 абзацев) абзацы, чья первая буква не из {I, T, A, S, M}, флипаются (первая буква → строчная, последняя → заглавная), склейка `\n\n`.
  - База Grycoin-2 (`\n\n`, MD5 7759227…) совпала с хешем автора. Флип-правило Grycoin-2 (адрес 1tzieU…, префикс MD5 3c6, pubkey 039ad91b…) НЕ воспроизведено — это и есть ключевой нерешённый узел.
  - Блок 76 свипнул читатель 17.08.2026, его формат публично не раскрыт.
  - Чужих частичных решений RBB нет.
- **Проверено и отброшено** (0; таблица в `/workspace/work/quizchain/NOTES.md`):
  - на RBB, оба адреса:
    - H1 `<br>`-артефакты: 250 776;
    - H2 знаки/формат QC1-77 «TOMI Omit TOMI»: 136 290;
    - H5 типографика: 528;
    - H4/H11 флип по предложениям и строкам: 278 560;
    - H9 все 2^15 правок опечаток: 524 288;
    - H8 альтернативные деривации (15 паролей, прямой BIP32-seed, 23 префикса путей, дети 0–19): 1 640 текстов ≈ 54 млн проверок ключей;
    - H22 правило QC1-29 (глава + ключ Stage One как [link]): 11 616;
  - на Grycoin-2 (поиск правила):
    - 2^20 подмножеств флипа первых и последних букв абзацев;
    - ≤9 флипов среди 30 границ предложений;
    - H18 флип целых предложений: 917 504;
    - H19 все 2^30 подмножеств флипа первой и последней буквы 15 предложений × 10 вариантов склейки = 10 737 418 240 MD5 (C с midstate, `tools/h19_c.c`, ~7 мин на одну склейку), префикс 3c6 прошли 2 621 368, адрес — 0;
    - H20 разбивка после «himself.»: 1 474 560;
    - H21 флип-наборы + одна нерегистровая правка: 7 656 204;
  - чужие: OCP ~3,2·10⁸; Sea_Ferret_9615 на GPU >10¹¹ (≤4 любых флипа регистра + 1–5 на границах Grycoin-2).
- **Что осталось / следующий шаг**: только инсайт, без перебора.
  - Как puzzleponky решил Grycoin-2: 02.08.2019, «easy after solving block 2, tricky bits», решение не раскрыл.
  - H10/H15: формат QC1-77 «[solution] TOMI Omit TOMI [link]», где link — полный приватный ключ блока 44 «Du Hast» (неизвестен).
  - Открытые идеи: H3 (другие «знаки»), H6/H7, H12, H13, H14, H16, H17.
  - OCP оценивает свой остаток (2 правки) в ~45 мин GPU на одну базу. У нас CPU ~1 600/с, это дни.
  - Илья 14.10: Lean и математика не помогут. Нужно угадать байты текста, обращать MD5 нереально (~2^123).
- **Оракул, скорость, файлы/скрипты**:
  - `/workspace/work/quizchain/tools/engine.py` (selftest): ~830/с на ядро, 2 ядра ≈ 1 600/с.
  - C-перебор MD5: `tools/h19_c.c`, `h19/run.sh`, `tools/h19_check.py` (~4 млн MD5/с; 10,7·10⁹ за ~2,3 ч).
  - `tools/qc1lib.py` — таблица нормализации решённых блоков.
  - `tools/h20_split.py`, `h21_edit.py`, `h22_link.py`, `h8_deriv.py`, `h9_typo.py`.
  - `tools/sweep.py` — свип при совпадении на адрес Ильи из PUZZLES_HANDOFF.md.
  - `fresh_look.md`, `gb2_paras.json`, логи `h*.log`.
- **Проекты Hark и статус**: проект 2236ab0e-dc09-445c-9ba5-8f514cc39105. Задача 915ee0aa-b120-4874-b30f-a487cb341571. Вердикт 14.10 ~10:40 MSK: «исчерпано», пауза. Аудит 15.10: ярус 3, заморозить.
- **Оценка шансов**: наша 13.10 — 1–3%. Аудит 15.10 — ≤1%. Автор сама потеряла решение.

---

## Оперативный статус v2 (16.10.2026 ~23:30 МСК)

Строка из сводной таблицы `MASTER_CATALOG_v2` (Часть 0.3):

| Quizchain RBB | 0,777 BTC, не тронут | ≤1% | Флип-правило Grycoin-2 не найдено; 10,7 млрд MD5 = 0 | заморожено |

## Досье agntn/puzzles (16.10.2026)

Перенесено из реестра [@agntn/puzzles](https://puzzles.agntn.dev/collections/real-big-block) (raw: https://puzzles.agntn.dev/collections/real-big-block.md). Ниже — разбор первоисточника: механика, кто решал, что проверено.

- `id`: "real-big-block"
- `chain`: "bitcoin"
- `address`: "14zMkTgaVXJcxdh4JdWi29MLRR44iUSG9W"
- `sourceUrl`: THREAD
- `startedAt`: "2019-07-22 23:10:09"
- `prize`: 0.777

> AoiNakamoto's last Quizchain block. 777 mBTC for the final version of a Wattpad chapter with every line break in place. Unclaimed since July 2019

July 22, 2019. AoiNakamoto posts the last block of the Quizchain. "Thank you for playing the quizchain." Then the prize: 777 mBTC. Over a hundred times the usual 7 mBTC block.

The question is one line. "Final version of the second chapter of Wattpad story, which I will publish in a moment." Hash that chapter right and the coins are yours. Seven years later, nobody has. Want to try?

## What is the Real Big Block?

### Stage Two of block 77

[Quizchain2 block 77](https://puzzles.agntn.dev/collections/quizchain2/77) came in two stages. Stage One asked you to decode Hal Finney's "Bitcoin and me" as a puzzle by Satoshi. This is Stage Two. The post calls it the "Second stage of last block". Its r/bitcoinpuzzles announcement two days later calls it [Quizchain Real Big Block](https://www.reddit.com/r/bitcoinpuzzles/comments/chf8k2/very_hard_777_mbtc_quizchain_real_big_block/), with `[Very Hard]` in front. The author wasn't kidding.

### The question is a whole chapter

No riddle, no TOMI field, no format line. The answer is the chapter itself, "Second" on Wattpad, as the author left it. The post links it a bit later: [wattpad.com/720888559-second](https://www.wattpad.com/720888559-second). The Wayback Machine has no copy of that page.

And "final version" matters. Wattpad shows you today's chapter, not the one from the last week of July 2019. In 2026 the old thread came back to life with people asking each other for a copy from that week. Nobody had one, at least not in public.

### The lucky address

The first funding went to `1EFojcAo2vbhRGCGCa7q8Wwvzss28mhQYC`, and the post spends three paragraphs on why that address is lucky. A 7 near the middle. Fibonacci numbers. `Ao` at digits six and seven, almost Aoi. Then a self-diagnosis: "Or maybe just another severe case of delirious Apophenia." Honestly, the best line of the whole chain.

## How the line breaks changed

### Two line breaks, then one, then two

The author's [discussion thread](https://www.reddit.com/r/Grycoin/comments/chn8un/real_big_block_discussion/) opens with a warning. Wattpad got extra line breaks between paragraphs, and that "is needed to solve the block". A player points out the obvious problem: `\n` or `\r\n`? It depends on who copied what.

The author's answer, on July 28: the chapter shows two breaks, but the solution has only one. One 13 and one 10 between paragraphs, checked "with the tool at asciivalue.com".

Two days later that's gone. At 23:40 UTC on July 30 the coins leave the lucky address. A player congratulates the winner. There was none. "I took the funds back for a moment", says the author. Nine minutes later 777 mBTC land on `14zMkTgaVXJcxdh4JdWi29MLRR44iUSG9W`, and the post gets an update. One twist is gone. "It is also hashed with two line breaks between paragraphs now."

### Hit enter twice

The last word on it is from August 1. A player asks whether two line breaks means one empty line or two. "I mean the second one. Hit enter twice. This displays in Ascii as 13 10 13 10." So `\r\n\r\n` between paragraphs. Simple, as long as you have the right paragraphs.

### Stage One shows the format

Note 6 in the thread says it plainly. Whoever figures out the format of Stage One gets "a big hint" for this one. [Grycoin block 2](https://puzzles.agntn.dev/collections/grycoin/2) then showed that format on a small example: keep the whole text and flip the case of the letters that carry Satoshi's "signs". The author posted that block "to give a simple example for the format used in both phases of block 77". Stage One went seven minutes after Grycoin block 2. Stage Two didn't move. Since 2026 Stage One's MD5 is public too, so you can check your copy of the format against a known answer before you burn hours on this one.

## The expiry plan that never ran

The post has two expiry conditions. If either comes first, the prize goes to "a climate emergency related charity" and the solution gets published. One: the 200 day moving average hits $100 per mBTC. Two: "Tanabata 2022 comes." The announcement adds the date, July 7, 2022.

Tanabata 2022 came and went. The coins didn't move, and the solution never showed up. In July 2019 the author put the odds of a solve below "that of humanity passing the reverse Turing test". So far, fair estimate.

## What the record carries

```ts [src/collections/real-big-block.ts]
export const realBigBlockChapter = puzzle({
  id: "real-big-block",
  chain: "bitcoin",
  address: "14zMkTgaVXJcxdh4JdWi29MLRR44iUSG9W",
  sourceUrl: THREAD,
  startedAt: "2019-07-22 23:10:09",
  prize: 0.777,
  hints: [official("Question: Final version of the second chapter of Wattpad story, …", THREAD), …],
  transactions: [funding("a1916e7e…", "2019-07-30 23:49:19", 0.777)],
});
```

### Two addresses, one prize

The record's address is the one holding the coins today, and its transactions are that address's history. One funding, July 30, 2019. The lucky address keeps its own two. `499bcd42…` paid it 777 mBTC on July 22. Eight days later `20c7a3e1…` took 0.776903 BTC back to the author, and the rest went to the fee. Both are in the post and in the archive, just not in the list. `startedAt` still says July 22, 23:10:09 UTC. That's when the block went live, so the date stays even though the address came later.

### Hints in the author's words

The record keeps <dataset-count of="hints" puzzle="real-big-block">

</dataset-count>

 hints, all from the author. The question, the link, the line break notes in the order they came, the Grycoin example and the expiry plan. The July 28 note about a single break is in there too, although the refund made it stale. A hint records what the author said, not whether it still holds.

### No key, no pubkey

`14zMk…` never spent, so there's no public key on chain, and nobody published a solution. `verify` has nothing to check, and `status` stays `unsolved`.

### Why not `quizchain2/77`?

That id is Stage One, a different address with a different prize, claimed in August 2019. One record holds one address, and Quizchain2 counts its blocks with plain numbers. So Stage Two gets a collection of its own, named the way the author named it on r/bitcoinpuzzles. The author record is the same one [Quizchain](https://puzzles.agntn.dev/collections/quizchain), Quizchain2 and the [Grycoin chain](https://puzzles.agntn.dev/collections/grycoin) point at.

All three threads are archived in [assets/sources/real-big-block](https://github.com/agntn/puzzles/tree/main/assets/sources/real-big-block). The r/bitcoinpuzzles post has a 2023 Wayback capture with the author's comment. The two r/Grycoin threads don't, so their transcripts come from Arctic Shift, checked against pullpush.

## The Real Big Block record

## OCP: машинные данные (puzzles.json, 16.10.2026)

Структурированные данные из `puzzles.json` репозитория [open-crypto-puzzles](https://github.com/floflo777/open-crypto-puzzles) (snapshot OCP: 2026-09-03; цены: {'date': '2026-08-16', 'BTC': 63000, 'ETH': 1880, 'AR': 1.81, 'LTC': 54}).

- `slug`: aoi-nakamoto-quizchain-0-854btc
- `title`: Aoi Nakamoto Quizchain
- `status`: **open**
- `tier`: big | `chain`: bitcoin
- `series`: None
- `author`: AoiNakamoto (pseudonymous) | reddit:AoiNakamoto, wattpad:AoiNakamoto
- `prize`: 0.777 BTC (оценка $48951 на 2026-08-16) — Block 76 (0.077 BTC) was solved and swept by a reader on 2026-08-17; only Real Big Block (0.777 BTC) remains open
- `published`: 2019-04-01 https://www.reddit.com/r/Grycoin/
- `puzzle_type`: bip39-seed, word-selection
- `target_format`: source text (candidate answer); MD5 of its UTF-8 bytes as 128-bit entropy; BIP39 mnemonic; BIP44 m/44'/0'/0'/0/i for i = 0 to 5; P2PKH address
- `difficulty_left`: external-info
- `difficulty_note`: Real Big Block: the transform and the case-flip rule are confirmed exactly on a solved sibling lot; what is missing is the precise source text the author hashed on 2019-07-30. She removed one twist that day and kept at least one, and later wrote that she lost the solution herself. Every contiguous paragraph span (1,469,908 texts), a bounded 2-edit slice on the full chapter (221,520 texts), every pair of boundary edits on 16 certified bases (48,379,696 texts) and the rule the chapter dictates itself are negatives. The reader who swept Block 76 on 2026-08-17 holds the convention of a final Aoi block, which is the cheapest calibration left
- `tested_total`: {'candidates': 398397713, 'families': 34, 'certified': True}

**Адреса и проверенное состояние:**
- `14zMkTgaVXJcxdh4JdWi29MLRR44iUSG9W` — escrow | Real Big Block, stage 2 | ожидается: 77700000 sats | проверено 2026-08-27: **funded-unspent**
  - https://mempool.space/address/14zMkTgaVXJcxdh4JdWi29MLRR44iUSG9W
- `13Cv6SXUnzGDT8JHqzzJ8xMPtsSdhJA4wd` — escrow | Quizchain2 Block 76 | ожидается: 7700000 sats | проверено 2026-08-21: **swept**
  - https://mempool.space/address/13Cv6SXUnzGDT8JHqzzJ8xMPtsSdhJA4wd
- `19TbyN5KCg1Lg7qHwezifsLVcdSa2Rj5KN` — escrow | Real Big Block, stage 1 (certification reference, solved by a third party in 2019, not part of the live prize) | ожидается: n/a | проверено 2026-08-16: **swept**
  - https://mempool.space/address/19TbyN5KCg1Lg7qHwezifsLVcdSa2Rj5KN

**Деривация:**
- candidate text to MD5 (128-bit entropy) to BIP39 mnemonic to BIP44 m/44'/0'/0'/0/i to P2PKH address, compared against both open escrows
- оракул: `tools/oracle.py` | сертифицирован: True
- сверено с: the author's own published calibration vector (entropy 2941774a2abec9f30c7d6777d1d53d91 to WIF L5Z66qPm... at BIP44 index 1), self-contained and exact; the case-flip rule and Block 76 prefix filter are certified separately with a synthetic example and a community-found candidate pair; full reproduction of the solved sibling lot Block 77 Stage One needs Hal Finney's bitcointalk post text, which this repository does not ship (third-party content), but which anyone can supply themselves to apply_stage_one_rule()

**Зацепки (OCP `leads`):**
  - title: ask the Block 76 solver for the serialization, index and twist convention of a final Aoi block | status: open
  - title: a bounded 2-character-edit sweep on the strongest base texts, outside the two families already swept | status: open
  - title: a non-uniform 2019 editor buffer, or a non-contiguous selection | status: open
  - title: all 2-character edits at all positions of the 8 certified bases on a rented GPU | status: open

**Материалы третьих лиц:**
- no book, chapter text, forum dump, or other bulk third-party material is included; the Wattpad chapter (the author's own fiction) and Hal Finney's bitcointalk post (third-party historical content) are both referenced by URL only, never reproduced; quotes in clues/author-posts.md are short excerpts from the puzzle author's own public Reddit posts

**Источники (OCP `sources`):**
  - url: https://www.reddit.com/r/Grycoin/comments/ca6jxv/77_mbtc_quizchain2_block_77_stage_one/ | title: Real Big Block stage 1 | date: 2019-07-07
  - url: https://www.reddit.com/r/Grycoin/comments/cgcv9i/77_mbtc_quizchain2_block_76/ | title: Quizchain2 Block 76 | date: 2019-07-22
  - url: https://www.reddit.com/r/Grycoin/comments/chn8un/real_big_block_discussion/ | title: Real Big Block Discussion | date: 2019-07-25
  - url: https://www.wattpad.com/720888559-second | title: Second, Wattpad chapter by AoiNakamoto | date: 2019-07-23
  - url: https://github.com/uso-archive/data/blob/master/data/usercss/170148.user.css | title: Wattpad Nightmode userstyle, copies generic pre { white-space: pre-wrap } | date: 2019-08-15
  - url: https://index.commoncrawl.org/CC-MAIN-2019-30-index?url=www.wattpad.com/&output=json | title: Common Crawl CC-MAIN-2019-30 Wattpad homepage (CSS URL v=eb03e30) | date: 2019-07-15
  - url: https://www.reddit.com/r/Grycoin/comments/cgkpbb/777_mbtc_quizchain_last_block/ | title: [777 mbtc] Quizchain last block, r/Grycoin, with the 2019-07-30 update on the removed twist | date: 2019-07-22
  - url: https://www.wattpad.com/762380140 | title: Starting Up, Wattpad part by AoiNakamoto: the author lost the solution | date: 2019-07-23
  - url: https://mempool.space/tx/a1916e7ed9eac3fcc56a55056328cb09d06925e2694f2e6720de12b228514d1f | title: Real Big Block escrow funding transaction | date: 2019-07-30
  - url: https://mempool.space/tx/979670f3d1d4134e7989ed6f4a4370362e15c101711c93675790cf0751c8dbd4 | title: Block 76 escrow funding transaction | date: 2019-07-22
  - url: https://bitcointalk.org/index.php?topic=155054.0 | title: Hal Finney, Bitcoin and me, bitcointalk topic 155054 | date: 2013-05-27
