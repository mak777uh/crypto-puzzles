# TORCHED H34R7S Bitcoin Puzzle
> **ПЕРЕМЕЩЕНО 2026-10-17 в `master/solved/`** — пазл решён/закрыт/тупиковый, активная работа не ведётся. Причина: [../INDEX.md](../INDEX.md). Вернуть в `puzzles/` — только при новых данных (правила: `AGENT_INSTRUCTIONS.md`).

Индекс: [MASTER_CATALOG.md](../../MASTER_CATALOG.md). Источник: реестр [@agntn/puzzles](https://puzzles.agntn.dev/collections/coin-artist) (raw: https://puzzles.agntn.dev/collections/coin-artist.md).

## Кратко (реестр agntn/puzzles)
- Описание: How coin_artist's TORCHED H34R7S Bitcoin puzzle was solved. The 1FLAMEN6 wallet and its published key checked against the 2018 claim transaction.
- Реестр: https://puzzles.agntn.dev/collections/coin-artist

> How coin_artist's TORCHED H34R7S Bitcoin puzzle was solved. The 1FLAMEN6 wallet and its published key checked against the 2018 claim transaction.

A painting with a Bitcoin private key hidden in its flames. Not a metaphor, an actual wallet key. **TORCHED H34R7S** is the final piece of *The Legend of Satoshi Nakamoto*, created by **coin_artist** with **Rhea Myers**. Its `1FLAMEN6` wallet was claimed in February 2018, almost three years after the painting's public release.

![TORCHED H34R7S by coin_artist. Birds above a chessboard with a ribboned key and a border of coloured flames.](https://puzzles.agntn.dev/assets/coin-artist/torched-h34r7s/puzzle.jpg)

## What was hidden in the painting?

The [April 3, 2015 announcement](https://bitcointalk.org/index.php?topic=766000.msg8633825#msg8633825) offered 4.87 BTC at `1FLAMEN6rq2BqMnkUmsJBqCGWdwgVKcegd`. The forum thread started in 2014, but this record starts with the final painting's release. Earlier stages of the hunt aren't separate records here.

The flames carry binary data. Each one's height, border colour, width and interior colour encode four bits. Read the inner border clockwise and the outer border counterclockwise. The ribbons around the painted key give the repeating XOR mask, `011010`. The key was, quite literally, drawn on the canvas.

[Motherboard's solution account](https://www.vice.com/en/article/heres-the-solution-to-the-3-year-old-dollar50000-bitcoin-puzzle/) explains the decoding and includes confirmation from the creators. The recovered text refers to Shakespeare's *The Phoenix and the Turtle* and contains the wallet key. The image above is served from this site. Its [public mirror](https://github.com/ynohtna92/1FLAMEN6/blob/64f6eff0cb6541f7a4209fc567a37dce33cb9039/The%20Legend%20of%20Satoshi%20Nakamoto.jpg) identifies the preserved source.

## Does the published key actually match 1FLAMEN6?

Yes, with an **uncompressed public key**. Use compressed serialization and you'll get a different address. Same private scalar, wrong wallet. That's an easy detail to miss when checking an old Bitcoin puzzle with current defaults.

The [published private key](https://privatekeys.pw/puzzles/1flamen6-puzzle) derives `1FLAMEN6rq2BqMnkUmsJBqCGWdwgVKcegd`. Its public key also appears in the claim transaction's input scripts. So the record doesn't rely only on a solved badge or an empty balance.

```bash
puzzles show coin-artist/torched-h34r7s
puzzles verify coin-artist/torched-h34r7s
```

The second command checks the recorded key against the address locally. No explorer or account needed.

## 4.87 BTC prize, almost 5 BTC claimed

Those numbers describe different things. **4.87 BTC** is the advertised prize. The [claim transaction](https://blockstream.info/tx/cb0156faa1716186b96f7e668a59204061a3419a746810ce151052d2860ac7cf) spent 5.001337 BTC and paid **4.99676152 BTC** after fees. It was confirmed on February 1, 2018 at 15:09:42 UTC.

The record keeps the advertised prize separate from the claim amount: 5.001337 BTC spent from the target before fees. Its `solvedAt` is that confirmation time, not a claim to know when someone finished decoding the painting. Later dust deposits and sweeps don't rewrite the original result.

## Who solved it?

Motherboard calls the solver "Isaac" and explicitly says the name was changed. That's not a verified identity, so the dataset leaves the solver field empty. The [solution note](https://puzzles.agntn.dev/assets/coin-artist/torched-h34r7s/solution.md) keeps the sources and transaction accounting together.

<collection-puzzles collection="coin-artist">

</collection-puzzles>

---
## Логирование (обязательно)
См. `../../AGENT_INSTRUCTIONS.md`. Любая значимая находка, прогресс, баланс или решение **должны** быть дописаны сюда с датой и ссылкой.

## История изменений
- 2026-10-16 (deepseek-flash) — данные перенесены из реестра [@agntn/puzzles](https://puzzles.agntn.dev/) (первоисточники внутри текста).
