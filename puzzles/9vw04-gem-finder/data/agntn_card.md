---
title: "Gem Finder's 9vw04 puzzle"
description: "Gem Finder's Bitcoin puzzle pairs 9vw04 with a coloured character grid. The author says the post holds everything needed for a WIF"
canonical_url: "https://puzzles.agntn.dev/collections/9vw04"
---
# Gem Finder's 9vw04 puzzle

> Gem Finder's Bitcoin puzzle pairs 9vw04 with a coloured character grid. The author says the post holds everything needed for a WIF

December 21, 2024, 04:05 UTC. Gem Finder, GemfinderOfX on X, [posts a puzzle](https://x.com/GemfinderOfX/status/1870319691295764655). "Today I wanted to do something special." Then 0.02 BTC, about $2,000 at the time, and one promise: "Everything for the private key can be found within this message."

The message isn't long. A paragraph, an address, five odd characters and a picture. Almost two years later the coins haven't moved.

<collection-facts collection="9vw04">



</collection-facts>

## What's in the 9vw04 post

### A grid that is very much a rainbow

The picture shows 21 rows of 50 characters on black. Letter, digit, letter, digit. The letters run through all 26 in one fixed order, starting with T. Colour goes by pair, not by character. Most pairs are a white letter and a pink digit. M and G pairs are blue, N pairs lavender, O pairs grey. Five colours, then. The last row sits on a thin line at the bottom edge, with no margin under it. The first row has one above it. So the grid may go on past the picture.

The author's [December 22 reply](https://x.com/GemfinderOfX/status/1870866790752141328): "I don't really like rainbows." A colourful way to say that.

### 9vw04, the typo that isn't

`9vw04` sits right after "showing proof of funds", like a slip of the thumb. On January 2 the author [showed a private key example](https://x.com/GemfinderOfX/status/1874632897459871930) with it twice:

```text
******9vw04********************9vw04
```

"All 5 of these numbers and letters appear 2 times in the private key example." Fine. But the mask is 36 characters and a WIF has 51 or 52. And Base58 has no `0` at all. So `9vw04` can't sit in a WIF as written. Later the author said the spelling is incorrect on purpose. Does that cover the zero too?

### An address with a past

`bc1qr5ms…` isn't fresh. It got its first coins in January 2021. The same key spent from it in October 2021 and again on November 28, 2024, 23 days before the post. What was left, 2,020,760 sats, became the prize. "Proof of funds", as the post says.

Those spends exposed the public key, so the record carries it. Useful, but not a solution. The author has published no reduced key range in the posts cited here.

## The hints in the 9vw04 record

The record keeps eleven posts, from the announcement to the March 2026 clue. The later posts are replies, including the January 13 pair under the puzzle itself. The table excerpts them below. The record keeps the wording and spelling, including "Brian". That matters here.

<table>
<thead>
  <tr>
    <th>
      Date
    </th>
    
    <th>
      Hint
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      Dec 22, 2024
    </td>
    
    <td>
      "I don't really like rainbows."
    </td>
  </tr>
  
  <tr>
    <td>
      Jan 1, 2025
    </td>
    
    <td>
      "All the clues are in the post… you just aren't looking hard enough."
    </td>
  </tr>
  
  <tr>
    <td>
      Jan 2, 2025
    </td>
    
    <td>
      The key example above
    </td>
  </tr>
  
  <tr>
    <td>
      Jan 4, 2025
    </td>
    
    <td>
      "Every word is a clue sometimes you just need to look in the mirror"
    </td>
  </tr>
  
  <tr>
    <td>
      Jan 5, 2025
    </td>
    
    <td>
      "the small thing everybody has overlooked so far"
    </td>
  </tr>
  
  <tr>
    <td>
      Jan 5, 2025
    </td>
    
    <td>
      "WIF"
    </td>
  </tr>
  
  <tr>
    <td>
      Jan 9, 2025
    </td>
    
    <td>
      No software needed: "Nope just your Brian and everything in the post"
    </td>
  </tr>
  
  <tr>
    <td>
      Jan 13, 2025
    </td>
    
    <td>
      WIF again, rainbows again, and Daniel Shanks, the creator of baby step giant step
    </td>
  </tr>
  
  <tr>
    <td>
      Jan 13, 2025
    </td>
    
    <td>
      "the spelling is incorrect on purpose"
    </td>
  </tr>
  
  <tr>
    <td>
      Mar 1, 2026
    </td>
    
    <td>
      "Every Nth character has something to say there could be a fixed interval skip cipher"
    </td>
  </tr>
</tbody>
</table>

### Baby step giant step, with just your brain?

The author called Daniel Shanks and baby step giant step "very important here". Four days earlier, asked whether software or a brute force script was needed, the answer was no. Just your Brian. The posts don't explain how those clues fit together. Treat Shanks as a clue, not an instruction to start a key search.

### Fourteen months later, a skip cipher

The next hint preserved in the record is from March 2026, about fourteen months after the January batch. [Every Nth character has something to say](https://x.com/GemfinderOfX/status/2027938957112279215), the author says. There "could be" a fixed interval skip cipher. Which N, and which sequence? Not said. The visible grid offers 1,050 characters, but the post does not say the grid is the sequence to use.

## Is the 9vw04 puzzle solved?

No. On October 17, 2026 the address still holds 2,020,760 sats in two unspent outputs, unchanged since the announcement. Nothing has left it since November 2024. The prize is still there and the record remains `unsolved`.

The record keeps all four transactions of the address, from the 2021 funding on. The coins are almost four years older than the puzzle, so `preGenesis` is set and the start is the post itself.

### Check it yourself

```bash
npx @agntn/puzzles hints 9vw04
npx @agntn/puzzles balance 9vw04
npx @agntn/puzzles assets 9vw04
```

The picture ships as [assets/9vw04/puzzle.jpg](https://github.com/agntn/puzzles/tree/main/assets/9vw04), with its byte count and SHA-256 pinned in the record. All eleven posts cited by the record have local reading copies and screenshots in [assets/sources/9vw04](https://github.com/agntn/puzzles/tree/main/assets/sources/9vw04). Wayback caught the March 2026 clue the second it went up. For the other ten, Wayback and MemGator had nothing, as each copy says.

## The 9vw04 record

<puzzle-page puzzle="9vw04">



</puzzle-page>


## Sitemap

See the full [sitemap](https://puzzles.agntn.dev/sitemap.md) for all pages.
