# Grycoin chain
> **ПЕРЕМЕЩЕНО 2026-10-17 в `master/solved/`** — пазл решён/закрыт/тупиковый, активная работа не ведётся. Причина: [../INDEX.md](../INDEX.md). Вернуть в `puzzles/` — только при новых данных (правила: `AGENT_INSTRUCTIONS.md`).

Индекс: [MASTER_CATALOG.md](../../MASTER_CATALOG.md). Источник: реестр [@agntn/puzzles](https://puzzles.agntn.dev/collections/grycoin) (raw: https://puzzles.agntn.dev/collections/grycoin.md).

## Кратко (реестр agntn/puzzles)
- Описание: AoiNakamoto's 7 mBTC blocks on r/Grycoin from summer 2019. One went before its post was up. Another went to a solution even its author never knew
- Реестр: https://puzzles.agntn.dev/collections/grycoin

> AoiNakamoto's 7 mBTC blocks on r/Grycoin from summer 2019. One went before its post was up. Another went to a solution even its author never knew

July 28, 2019. AoiNakamoto calls the Quizchain experiment over. Three big blocks are still unsolved, and the media boost the author hoped for never came. There was also a promise: no third run of the quizchain. So what now?

A new name. "I call the chain the Grycoin chain now." Grycoin is the author's idea of a coin that caps fossil fuel production worldwide. The chain is the consolation prize. "Better than nothing." Small blocks, 7 mBTC each, one a week "as long as I feel like it".

It lasted a week. On August 4 the account posted Shutting Down. Short, and odd all the way through.

## Short chain, odd blocks

### Block 1: solved before it existed

[Block 1](https://puzzles.agntn.dev/collections/grycoin/1) asks `When is this?` No TOMI field, just the first three MD5 digits, `4c4`. The question is the first thing the author tweeted after starting up again. The answer is `Still 21st Century`.

Here's the twist. The funding confirmed at 00:35 UTC. The claim confirmed 56 minutes later. The post? 12:58 UTC, half a day after the coins were gone. "Maybe was a bit too easy for scripting wizards this time", the author admits. Scripted or not, nobody needed the post at all.

The author says the block also hides a hint for the format of block 77, the big one from the first run. You only see it if you solved by hand. Script users get the coins and miss the clue. Fair trade?

### Block 2: the answer nobody knows

[Block 2](https://puzzles.agntn.dev/collections/grycoin/2) is the opposite. Funded two days early, on purpose, and still untouched when the post went up. The question is its own text. Copy all of it, flip the case of the letters that carry Satoshi's "signs", keep everything else, hash it. That's the block 77 format, explained on a small example.

Ten hours later it's gone. u/JDScreesh congratulates u/puzzleponky. Fine, so what was the solution? The author's answer is the best line of the whole chain: "One, I actually don't know." Which letters to flip is obvious, says the author. How to get from there to the prize isn't, "not even to me".

The claim pays `129jw1GUGwiJbf4rL7qEANPbxvSRC5zfHN`. Same address that collected a pile of [Quizchain2](https://puzzles.agntn.dev/collections/quizchain2) blocks, each time with u/puzzleponky's answer in the thread. Proof? No. But it's a good guess who walked away with block 2.

## What the Grycoin records carry

Block 1 is the familiar recipe. MD5 of the answer, the 16 bytes as BIP39 entropy, `m/44'/0'/0'/0/0`. Nobody printed the key, so the record ends in `.derived()`. The WIF gives the funded address, and its public key matches the one the claim revealed. The chain checks the homework.

Block 2 has no key and never will, unless someone finally spells out that text. Its status is `claimed`: the coins moved, the secret stayed secret. What the record keeps is the method and two checksums. `3c6` for the solution, and `7759227` for the text before any letter changes. The author posted that second one for u/puzzleponky, who wasn't on Windows and got plain `\n` line breaks from the copy. A few hours later the same name gets the congratulations.

Both threads are archived in [assets/sources/grycoin](https://github.com/agntn/puzzles/tree/main/assets/sources/grycoin). The Wayback Machine kept only Reddit's empty app shell, so the transcripts come from Arctic Shift, checked against pullpush.

### Why its own collection?

Because the author said so. The post title reads "Grycoin Chain Block 1", the count starts at 1 again, and the whole point of the new name was to keep the no third run promise. So `grycoin/1`, `1` and `"grycoin/1"` all resolve inside this collection. The author record is the same one [Quizchain](https://puzzles.agntn.dev/collections/quizchain) and Quizchain2 point at.

## The Grycoin puzzle records

<collection-puzzles collection="grycoin">

</collection-puzzles>

---
## Логирование (обязательно)
См. `../../AGENT_INSTRUCTIONS.md`. Любая значимая находка, прогресс, баланс или решение **должны** быть дописаны сюда с датой и ссылкой.

## История изменений
- 2026-10-16 (deepseek-flash) — данные перенесены из реестра [@agntn/puzzles](https://puzzles.agntn.dev/) (первоисточники внутри текста).
