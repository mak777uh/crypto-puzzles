---
title: "Dug's Student Treasure Hunt"
description: "Twelve lecture words led to three Bitcoin prizes. See Dug's 2025 treasure hunt solution with the BIP39 seed and verified BIP84 paths."
canonical_url: "https://puzzles.agntn.dev/collections/dug"
---
# Dug's Student Treasure Hunt

> Twelve lecture words led to three Bitcoin prizes. See Dug's 2025 treasure hunt solution with the BIP39 seed and verified BIP84 paths.

Twelve seed words hidden across lecture slides, with bitcoin at the end. That's one way to make students read the slides.

Dug's 2025 Student Treasure Hunt has **three funded Bitcoin addresses**, each a puzzle in the `dug` collection. Together they held **159,186 satoshis**. All three prizes have been claimed, and the published seed verifies against every address.

<collection-facts collection="dug">



</collection-facts>

## The official Nostr clue says Kingdom

Dug's [October 7 post on Nostr](https://njump.me/note157473tjlhl8046c4uhxk6889nwgflwsjtlpwgzfuqp0lmq8vvzas0km4hc) includes a photo of a lecture slide:

> Twelfth and Final Treasure Hunt Word: 12. Kingdom

One word down. Eleven to go. According to [floflo777's solution](https://github.com/floflo777/open-crypto-puzzles/tree/main/4-solved/dug-student-treasure-hunt-63ksats), the other words were in private lecture slides, but a public Seed Cipher sheet encoded the same phrase. That gave people outside the class a way in.

The shared hint links to **Dug's own post**, with [his slide photo](https://blossom.primal.net/394004c70b8907504a2424865e866b10fe5746c89122899a968f3dbcd18ad6b3.jpg) as confirmation. The solver's write-up is the source for the recovered phrase, not a substitute for the author's clue.

## BIP39 solution and BIP84 derivation paths

The published twelve-word mnemonic is:

```text
profit general lava hover jar visa joy immense install first give kingdom
```

It's BIP39 with an **empty passphrase**. The three receiving addresses use BIP84 paths `m/84'/0'/0'/0/0`, `m/84'/0'/0'/0/1` and `m/84'/0'/0'/0/2`. Same seed, different final index. Stopping at index 0 would leave two targets unchecked.

Run the verifier for each puzzle:

```bash
puzzles verify dug/2025-0
puzzles verify dug/2025-1
puzzles verify dug/2025-2
```

```text
OK  dug/2025-0
OK  dug/2025-1
OK  dug/2025-2
```

This is a public puzzle seed, not a wallet to reuse. Please don't give the internet free bitcoin.

## Who claimed the three Bitcoin prizes?

<table>
<thead>
  <tr>
    <th>
      Puzzle
    </th>
    
    <th align="right">
      Prize
    </th>
    
    <th>
      Claim date
    </th>
    
    <th>
      Solver
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      <code>
        dug/2025-0
      </code>
    </td>
    
    <td align="right">
      75,082 sats
    </td>
    
    <td>
      July 8, 2026
    </td>
    
    <td>
      Not identified
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        dug/2025-1
      </code>
    </td>
    
    <td align="right">
      63,216 sats
    </td>
    
    <td>
      August 2, 2026
    </td>
    
    <td>
      <a href="https://github.com/floflo777" rel="nofollow">
        floflo777
      </a>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        dug/2025-2
      </code>
    </td>
    
    <td align="right">
      20,888 sats
    </td>
    
    <td>
      July 8, 2026
    </td>
    
    <td>
      Not identified
    </td>
  </tr>
</tbody>
</table>

[floflo777](https://github.com/floflo777), also [0xFlorent_ on Twitter](https://twitter.com/0xFlorent_), describes recovering the second prize in his write-up. Its transaction paid **59,916 sats after fees**. Someone had already claimed indices 0 and 2 in a single transaction a few weeks earlier. The source doesn't name that solver.

So the write-up's “63ksats” title describes one recovery, not the whole collection. The [address and transaction ledger](https://puzzles.agntn.dev/assets/dug/2025-solution.md) has the full accounting. In these records, claim amounts mean the inputs spent from each target before fees, not two copies of a shared payout.

## Explore the three Dug puzzle records

<collection-puzzles collection="dug">



</collection-puzzles>


## Sitemap

See the full [sitemap](https://puzzles.agntn.dev/sitemap.md) for all pages.
