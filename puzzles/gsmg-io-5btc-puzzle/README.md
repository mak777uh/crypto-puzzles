# GSMG.io Puzzle

Индекс: [MASTER_CATALOG.md](../../MASTER_CATALOG.md) (Части 1-8). Источник данных: [open-crypto-puzzles](https://github.com/floflo777/open-crypto-puzzles).

## Кратко
- Статус: **open** (big)
- Цепь: bitcoin
- Приз: 1.2563451 BTC (USD 79150)
- Примечание: the balance of the prize address 1GSMG1JC9wtdSwfwApgj2xcmJPAwx7prBe at the 2026-08-16 snapshot (1.25635374 BTC on 2026-09-03, the difference is third-party dust). The creator announced in April 2019 that the reward halves at every Bitcoin halving, and it did: 5 BTC funded 2019-04-13, 2.5 BTC moved out in block 630001 (2020-05-11) and 1.25 BTC on 2024-04-24 to 17ucy1K9ZUAaoY6JVtM932W9jUp5LXfyHa, which has never spent and has no published payout path. Those 3.7505531 BTC are listed as an address below but not counted as prize; the reading that the Dualite blob gates them is unconfirmed. Correction contributed by Y0lan in issue #15 (2026-09-02), verified on chain 2026-09-03
- Опубликовано: 2019-04-13 https://mempool.space/tx/73e48ff571a7e9a4387574a50cf2fcb7b21b6ea5702c777a035664df57cbce02
- Типы: text-cipher, pixel-code, web-tree, raw-private-key
- Difficulty left: insight
- the stage chain to the final page is fully solved and replays from archived material with the creator's own convention (password = sha256 of the answer); the 256-symbol object has been tested as a direct 32-byte key reduction across roughly 335.7 million candidates with 0 match; both 80-byte locks (SalPhaseIon small blob and the 2019 phase 3.2.2 blob) are negative for every word sequence of every puzzle text and of the three Matrix films, for stage answers and digests, interleavings and iterated hashes (about 25.8 million decryptions with witnesses); the creator's unmessaged planted address of 2020-04-07, the third door, is negative for every textual construction (about 62 million candidates with witnesses); the community's decrypted Cosmic Duality is a padding accident; what would open the third door is a rule of the creator's from early 2020 read on a non-textual object

## Адреса/эскроу
- `1GSMG1JC9wtdSwfwApgj2xcmJPAwx7prBe` — prize address (small blob gate) | expected: 125635374 sats | state: partially-spent (checked 2026-09-03) | https://mempool.space/address/1GSMG1JC9wtdSwfwApgj2xcmJPAwx7prBe
- `17ucy1K9ZUAaoY6JVtM932W9jUp5LXfyHa` — halving split-off, creator controlled; not counted as prize (the Dualite-blob reading is unconfirmed) | expected: 375055856 sats | state: funded-unspent (checked 2026-09-03) | https://mempool.space/address/17ucy1K9ZUAaoY6JVtM932W9jUp5LXfyHa

## Источники
- 2026-08-16 — GSMG.io, platform site — https://www.gsmg.io/
- 2019-04-13 — Escrow first-funding transaction — https://mempool.space/tx/73e48ff571a7e9a4387574a50cf2fcb7b21b6ea5702c777a035664df57cbce02
- 2020-05-11 — First transfer to the second address — https://mempool.space/tx/2aa9a4a90be819d5122d70c993280785a0508f163521e7b38cebb4db0b071b13
- 2024-04-24 — Second transfer to the second address — https://mempool.space/tx/88cdb3cdca12b471551b1b26188508a14ca5fd8a415223ffb7c190381c9b9df3
- 2020-05-11 — OP_RETURN "Halving" from the creator's vanity address, same block as the first split — https://mempool.space/tx/a798905f53fdcadcbd2e2a1e61d23ba69a07e26130a78c76da4bf4d7a170f383
- 2026-09-02 — Issue #15, Y0lan: prize is 1.25 BTC, not 5.0068982 BTC — https://github.com/floflo777/open-crypto-puzzles/issues/15
- 2025-02-18 — bitcointalk topic 5532424 — https://bitcointalk.org/index.php?topic=5532424.0
- 2026-08-16 — Community-maintained stage documentation — https://github.com/puzzlehunt/gsmgio-5btc-puzzle
- 2020-11-12 — Phase 2 and Phase 3 page with the creator's cipher convention — https://gsmg.io/choiceisanillusioncreatedbetweenthosewithpowerandthosewithoutaveryspecialdessertiwroteitmyself
- 2026-09-03 — The creator's vanity wallet that funded the planted addresses — https://mempool.space/address/3GSMG24TujqfMJG1kQoBX18DzJHQLeJYMK

## Подробности
Здесь должна накапливаться расширенная информация по мере проходов: подсказки, прогресс сообщества, проверенные гипотезы, ссылки, compute-оценки. Текущий файл — скелет из OCP; заполняется автоматически в циклах.


---
## Логирование (обязательно)
См. `../../AGENT_INSTRUCTIONS.md`. **Полная хроника всех агентов — в `LOG.md` этой папки** (по датам, с самопредставлением при первом заходе, включая отрицательные результаты; код — в `tools/`, данные — в `data/`). Сюда, в README, дописываем только прорывы и важное (с датой и ссылкой); глобальные изменения — в `../../MASTER_CATALOG.md` + `../../WAKE_QUEUE.md`. Параллельные агенты обязаны соблюдать тот же протокол.

## OCP deep docs
- Folder: https://github.com/floflo777/open-crypto-puzzles/tree/main/1-big-prizes/gsmg-io-5btc-puzzle
- README (raw): https://raw.githubusercontent.com/floflo777/open-crypto-puzzles/main/1-big-prizes/gsmg-io-5btc-puzzle/README.md


## Curated deep dive (OCP, 16.10.2026)
- Приз live: 1.2563451 BTC (1GSMG...); 3.75 BTC ушло в 17ucy... без пути выплаты (halvings).
- Механизм: цепочка страниц → финальная страница с 1075 токенами; фазы (Vigenère → Bifid key DBIFHCEG period 570 → image bits 'gsmg.io/theseedisplanted') → 256-символьный объект (alphabet 23, I/O dropout) → попытки свести к 256-битному ключу.
- Два 80-байтовых OpenSSL Salted__ блоба (phase 3.2.2 2019, SalPhaseIon small 2021), password=sha256(X).hexdigest(); password verified under SHA-256 (creator's convention).
- Exact offline oracle: 9 planted addresses (6 SHA-256 stage answers + raw/reversed bit image URL + 1 without preimage 1NULY7DhzuNvSDtPkFzNo6oRTZQWBqXNE9 = «третья дверь»).
- Проверено (отрицательно): 256-obj reductions 335.7M; large blob direct 59k/59k; textual passwords ~62.6M total across both locks/planted addresses; community "Cosmic Duality" = padding accident; plain rockyou.txt (~14.3M) ещё работал при закрытии сессии.
- Зацепки: (1) третья дверь preimage; (2) каждый пароль против обоих 80-байтовых блобов (40 reading plaintext); (3) replay динамически собранных кандидатов из 213 historical scripts (bug в фильтре); (4) identify single tool used to build phases; (5) esrever на остальных объектах; (6) 29 dropped letters.
- Deep doc: [OCP README](https://raw.githubusercontent.com/floflo777/open-crypto-puzzles/main/1-big-prizes/gsmg-io-5btc-puzzle/README.md)

## Досье agntn/puzzles (16.10.2026)

Перенесено из реестра [@agntn/puzzles](https://puzzles.agntn.dev/collections/gsmg) (raw: https://puzzles.agntn.dev/collections/gsmg.md). Ниже — разбор первоисточника: механика, кто решал, что проверено.

- `id`: "gsmg"
- `chain`: "bitcoin"
- `address`: "1GSMG1JC9wtdSwfwApgj2xcmJPAwx7prBe"
- `sourceUrl`: "https://gsmg.io/puzzle"
- `startedAt`: "2019-04-13 16:32:40"
- `prize`: 1.25636967
- `pubkey`: uncompressed(

> The GSMG.io 5 BTC puzzle from April 2019, phase by phase. A grid with a rabbit, a hidden password form, riddles, a chess position and two AES blobs. Halved twice by the author, 1.25 BTC and change on the address today.

## The puzzle

GSMG.io published an image, a rabbit hole of encoded phases behind it, and 5 BTC on an address whose public key was posted along with it. Nobody finished. The author took half back in 2020 and half of what was left in 2024. So the prize on the record is 1.25636967 BTC, the 1.25 that stayed plus what's left of a long trickle of small deposits. The transaction list has every one of them, and it says exactly where the other 3.75 went.

## How the GSMG puzzle works, phase by phase

Five pieces, all of them still live on gsmg.io: three numbered phases, then SalPhaseIon and Cosmic Duality on a page you only find by hashing. The domain was renewed and every URL below answers, so this walks through the author's own pages, not archive captures.

Most of it is solved, and the answers have been public since 2019 and 2020. The community writeup that collects them is [puzzlehunt/gsmgio-5btc-puzzle](https://github.com/puzzlehunt/gsmgio-5btc-puzzle/blob/fb92dd15487c6e2d275adb8c923698b7166c328e/README.md), started in April 2020 and last touched in May 2021. Everything below marked as checked was rerun against the copies in this repository: the image, both phase ciphertexts, the hashes and the decodes. What's still locked is at the end.

### Phase 1: a grid with a rabbit in it

#### The picture at gsmg.io/puzzle

The entry point isn't even a page. `https://gsmg.io/puzzle` answers with a bare PNG, 1048 by 1556 pixels. The top is a 14 by 14 grid of black, white, blue and yellow squares with a pixel rabbit sitting in the middle. Below a red line comes the banner: GSMG.IO 5 BTC PUZZLE CHALLENGE, the logo, the prize address and a QR code.

That QR code is the first trap for anyone holding a phone. It scans fine and gives you the address on blockchain.com. Which you already had, printed right next to it. The grid is the puzzle, and the grid is not a QR code, however much it looks like one from across the room.

#### How to read the grid

Every square is a bit. Black and blue are 1, white and yellow are 0. Start in the top left corner and go counterclockwise in a spiral: down the left edge, along the bottom, up the right, back along the top, and inwards. 196 squares give 24 bytes and four spare bits, and the bytes spell:

```text
gsmg.io/theseedisplanted
```

Checked, against the pixels and against the writeup's matrix. The rabbit sits on the four centre squares, which are the four spare bits, so they don't count. It also covers the edges of three squares in the ring around them. Those still show mostly white and read as 0. A 1 in any of them turns the end of the URL into junk like `plantet` or `plan|ed`.

#### The seed is planted

That URL is a tiny page. Eight small pictures in a row, one black, three blue and four red: a bank with a dollar sign and "war" under it, "CA", "dig i +", a closed lock over "lo", "crypto gic", "n you", an open lock over "n ing", and "t -". Words with pieces missing, rebus style.

Under them sits a password form you won't see. It's wrapped in `display: none`, so it only shows up in the page source or the dev tools. The form posts to `/phase1verification`, and that's how we know this page still counts as phase 1. There's also an HTML comment for whoever got this far: "Nice to see you around! Good luck little bunny hunter ;)"

#### The password is a song

Put the pictures back together and you get "war" plus "ning" and "lo" plus "gic". The Warning, by Logic. The writeup didn't always say so: its first version, from April 2020, named a different song, and the Logic reading came in March 2021. The password was in there from the start:

```text
theflowerblossomsthroughwhatseemstobeaconcretesurface
```

Unhide the form, type it, submit. There's a nice receipt for this one too. On April 22, 2019, nine days after launch, somebody in GSMG's own [Telegram support group](https://t.me/GSMG_Bot/29066) was asked for "an hash of the answer" and posted this:

```text
5ac407837447fba24ba2802e4d1e9aecb4580aa29fef1088cc387c180b746f75
```

That's the SHA-256 of the phrase above. Checked.

### Phase 2: are you looking for the private keymaker?

The form sends you to a page whose path is a whole sentence with the spaces taken out, 94 letters of it: choice is an illusion created between those with power and those without, a very special dessert, I wrote it myself. Good luck typing that from memory. The comment in its source says "You made it to the next step! Good luck little bunny hunter ;)" and the page is headed PHASE 2.

#### The first ciphertext

It starts with a line in quotes, "1... are you looking for the private keymaker?", and goes on: "You come to me, without it. Come to me with it and you'll have the power to continue. It'll grant the first part." Then the page says how the blob is locked, "Ciphered with aes-256-cbc /w base64 sha-256(password)", and prints it. 14 lines of base64 starting with `U2FsdGVk`, which is OpenSSL's `Salted__` header. So at least the format isn't a mystery.

#### The password is causality

The path gives it away if you've seen The Matrix Reloaded. "Choice is an illusion created between those with power and those without" is the Merovingian, and a few lines earlier in the same scene he names the one constant: causality. Hash the word, take the digest as lowercase hex, and hand that to OpenSSL as the password:

```bash
openssl enc -aes-256-cbc -d -a -md sha256 -in phase2.txt \
  -pass pass:eb3efb5151e6255994711fe8f2264427ceeebf88109e1d7fad5b0a8b6d07e5bf
```

Checked: 648 bytes of plaintext. Three ways to get `bad decrypt` instead, all checked too. Hash `causality` with a trailing newline, which is what `echo` and a text file give you. Write the digest in uppercase. Or leave out `-md sha256` on an old OpenSSL that still derives the key with MD5.

#### What phase 2 decrypts to

The plaintext opens with "The ironic 2name of the keymakers trying to protect the current digital powers", drops a Mr. Robot episode title, and asks "Crypto finally to the latin 3Moon? Tell me, 4How so mate?". Then a row nobody has fully read yet, `# X 2 S H 4 Y 0 Q B 15 #`, with clues for four of its letters. The writeup reads S as a sum in Klingon numbers, 2 plus 5 times 6, so 32, and B as -16, built from the Intel part number of a Core i5. Even that B takes a bit of bending to get there. Q and H are still open, and so is what the row is for.

The numbered words are the useful part. 2name, 3Moon and 4How so mate point at a hardware security module, the Thales SafeNet Luna HSM. Those are parts 2, 3 and 4 of the phase 3 password, and causality was part 1.

#### Riddles, a chess board and a buddhist

Back on the page, after the blob, it stops being polite. One paragraph is about a guy who theorised that any linear electrical network can be swapped for a current source in parallel with a resistance, about his competition, and about the rulers of "a piece of land that's technically the poorest of the entire planet". It ends with "The 5binary code is a part of the piece of this puzzle." The next one has a chancellor awaiting banks to be bailed out, who "decided to write an anarchist digital answer to this worlds' misery".

Then a chess position in FEN:

```text
B5KR/1r5B/6R1/2b1p1p1/2P1k1P1/1p2P2p/1P2P2P/3N1N2 w - - 0 1
```

And a question under it: "And now a buddhist is forced to move. What will be the next situation?" Between the pieces sit little tags like `/(aaa, connected enf)` and `/(aBa, connected not enf)`.

#### Parts 5, 6 and 7

The theorem is Norton's. From there the writeup reads the rulers as US presidents: four named John, two Johnsons, and the one "with a number", John F. Kennedy. The order is Executive Order 11110, five digits that look binary, the one said to have tried to rein in the Federal Reserve. The writeup calls this stretch "a bit of a stretch" itself. Part 5 is `11110`.

The chancellor is the headline in Bitcoin's genesis block. "Its' raw data after 4 on row 1616" is line 1616 of the original `main.cpp`, where the coinbase scriptSig is `486604799 4 0x736B…6854`. Part 6 is the hex after the 4, `0x` included.

Part 7 is the board after a buddhist move, one that doesn't give mate. The writeup calls it a fairly well known chess problem, and the answer is the next position in FEN, with Black to move:

```text
B5KR/1r5B/2R5/2b1p1p1/2P1k1P1/1p2P2p/1P2P2P/3N1N2 b - - 0 1
```

The tags say how to write each part down. `aBa` keeps the case as it is. `connected enf` means no spaces, `connected not enf` means keep them, which is why the FEN goes in with its spaces.

### Phase 3: the second blob

#### Seven parts and one hash

The last line of phase 2 is the only plain instruction on the whole site: "parts 1..7 --> sha-256 -> dgst is the password to enter Phase 3". Right below it, headed PHASE 3, sits the second blob. 86 lines of base64, about six times the first one, "also ciphered with aes-256-cbc /w base64". Same lock, bigger box.

Glue the seven parts together, `causality`, `Safenet`, `Luna`, `HSM`, `11110`, the genesis hex and the FEN, and hash:

```text
1a57c572caf3cf722e41f5f9cf99ffacff06728a43032dd44c481c77d2ec30d5
```

Checked: 4090 bytes of plaintext. One warning from experience. The blob's last line shares a line with the closing `</textarea>` in the HTML, so a copy that drops it decrypts fine right up to the end and then fails on padding. The copy here has all 86 lines.

#### Phase 3.1: three riddles

The plaintext starts with three riddles, each marked `/(aa,connected enf)`, so lowercase and no spaces:

1. What if the Merovingian is wrong and something other than causality could be ours? "The future is ours to direct" is Jacque Fresco, so `jacquefresco`.
2. "How long is forever?" asks Alice, and the White Rabbit says "Sometimes, just one second". Add `giveit` in front, as the riddle says: `giveitjustonesecond`.
3. The fundamental limit to the precision of certain pairs of properties: `heisenbergsuncertaintyprinciple`.

Their SHA-256 opens the phase 3.2 blob that comes right after them. Checked: 2422 bytes.

```text
250f37726d6862939f723edc4f993fde9d33c6004aab4f2203d9ee489d61ce4c
```

### Phase 3.2: the Architect's speech

Phase 3.2 opens with the Architect from The Matrix Reloaded, "I've been waiting for you", and then hands over four things: a line of box drawing characters, a 149 digit number, a sentence about a king and a queen, and one more base64 blob.

#### A beautiful strategic position

"... am I here? Wake up, you..." is Neo's line with Neo swapped for you, and the puzzle keeps doing that. "I've designed you a beautiful strategic position. One for one, four for one." Beautiful points to the Beaufort cipher, and one, one, four, one is 1141, the IBM EBCDIC code page. Read the box characters as EBCDIC 1141, then run Beaufort with the key `THEMATRIXHASYOU`.

It's a long message, and it doesn't pull punches: "YOUR LIFE IS THE SUM OF A REMAINDER OF AN UNBALANCED EQUATION INHERENT TO THE PROGRAMMING OF THIS PUZZLE". It also says the last task needs "OVER TWENTY-THREE CIPHERS SIXTEEN ENCRYPTIONS AND OR SEVEN INTERTWINED PASSWORDS", and that brute force might be required. Checked, Beaufort included.

#### Code page 1141 without code page 1141

Neither Node nor Python ships 1141. Python does ship `cp273`, though, and 1141 is just 273 with the euro sign swapped in. So take the 1539 bytes OpenSSL gives you, read them as Windows-1252 and encode them with `cp273`. Out come the writeup's letters, all 1539 of them, starting with `vtkvplmepphluwahtzmjp`. Not one euro sign in there, so the swap never matters. Checked, and glibc's `iconv`, which does know IBM1141, gives the same letters.

The writeup had those letters and the speech from April 2020. Where the letters come from, the 1141 part, only showed up in March 2021. Who needs a reason when the key works?

#### A king, a queen and a checkerboard

"A fubcd-king & oracle-queen, thingky mvps, on a sad board but as wide as the first one seen." The words build a keyed alphabet, `FUBCDORA.LETHINGKYMVPS.JQZXW`, and the board is a VIC straddling checkerboard, with 1 and 4 as the blank columns. The 149 digit number decodes to:

```text
IN CASE YOU MANAGE TO CRACK THIS THE PRIVATE KEYS BELONG TO HALF AND BETTER HALF AND THEY ALSO NEED FUNDS TO LIVE
```

Checked. Nice, but it's not a key. Two keys, the text says, and it doesn't say which.

The writeup's April 2020 version got there the long way. Plain alphabet on the board, then a substitution solver over the result. The keyed alphabet came in March 2021, same day as the 1141 reading.

#### The blob that's left

The last thing in phase 3.2 is another base64 blob, starting `U2FsdGVkX1+0Wl49`. That's `Salted__`, the header OpenSSL puts on what it encrypts, and it says nothing about the cipher. Phase 3.1 named aes-256-cbc for the blob this one came out of, not for this one. The writeup has no password for it.

### SalPhaseIon and Cosmic Duality

#### The door in the first picture

Two later hints came from the creator, according to the writeup. One is a spot in Decentraland with an audio file. Split the stereo channels, invert one, mix back to mono, and the spectrogram says `HASHTHETEXT`. The other is a poem: "Go back to the first puzzle piece without further ado. It might have shown you only one door, beware that the rabbits nest may contain a whole lot more."

So hash the text on the first picture, the banner line and the address run together:

```text
GSMGIO5BTCPUZZLECHALLENGE1GSMG1JC9wtdSwfwApgj2xcmJPAwx7prBe
```

Its SHA-256 is a page path. Checked, and the page is live:

```text
https://gsmg.io/89727c598b9cd1cf8873f27cb7057f050645ddb6a7a157a110239ac0152f6a32
```

#### SalPhaseIon

One heading and one long line of spaced out letters, mostly `a` to `i`. Some of it gives in:

- Two stretches use only `a` and `b`. Read them as bits and they say `matrixsumlist` and `enter`.
- `shabef` shows up twice. `sha` stays as it is, and `bef` is 256 with `a` to `i` as the digits 1 to 9, the same digits the runs below use. Right next to it, in plain letters: "our first hint is your last command".
- Split on `z`, two runs use `a` to `i` and `o`. Read those as digits with `o` for 0, convert the number to hex, and you get `lastwordsbeforearchichoice` and `thispassword`.

All checked. Woven through the letters, one character at a time, is a base64 blob starting `U2FsdGVkX186tYU0`, the same OpenSSL header, with no cipher named anywhere on the page. The writeup has no password for that one either.

#### Cosmic Duality

The same page, second heading. A clean 28 line base64 blob, the OpenSSL header once more, and no words at all. The writeups stop here.

### Is the GSMG puzzle solved?

No. The prize is still on the address, the 1.25 BTC the author left plus some dust, and the record says unsolved. Three blobs have no password in the writeup: the last one in phase 3.2, the one inside SalPhaseIon, and Cosmic Duality. People keep posting claims about them, and the [r/bitcoinpuzzles thread from October 2019](https://www.reddit.com/r/bitcoinpuzzles/comments/dfwcqk/gsmgio_5_btc_puzzle/) is where most of that happens. Take what you read there as a claim until someone shows the plaintext.

## What the records carry

```ts [src/collections/gsmg.ts]
export const gsmgPuzzle = puzzle({
  id: "gsmg",
  chain: "bitcoin",
  address: "1GSMG1JC9wtdSwfwApgj2xcmJPAwx7prBe",
  sourceUrl: "https://gsmg.io/puzzle",
  startedAt: "2019-04-13 16:32:40",
  pubkey: uncompressed(
    "04f4d1bbd91e65e2a019566a17574e97dae908b784b388891848007e4f55d5a4649c73d25fc5ed8fd7227cab0be4e576c0c6404db5aa546286563e4be12bf33559",
  ),
  prize: 1.25636967,
  transactions: [
    funding("73e4…ce02", "2019-04-13 16:32:40", 5),
    increase("a2d2…7a8b", "2020-03-24 01:08:49", 0.00000666),
    increase("a798…f383", "2020-05-11 20:02:50", 0.000007),
    decrease("2aa9…1b13", "2020-05-11 20:02:50", 2.5),
    // …
    decrease("88cd…9df3", "2024-04-24 21:47:27", 1.25),
    // … every later deposit, the last on 2026-09-25
  ],
  assets: assets({
    puzzle: "puzzle.png",
    hints: ["follow-the-white-rabbit.png"],
    sourceUrl: "https://gsmg.io/puzzle",
  }),
  stages: [
    stage(
      "phase 1",
      "A 14 by 14 grid of black, white, blue and yellow squares …",
      [
        artifact("puzzle image", "https://gsmg.io/puzzle", "puzzle.png"),
        artifact("the seed is planted", "https://gsmg.io/theseedisplanted"),
      ],
      answer("The grid read as bits …", `${WRITEUP}#1-httpsgsmgiopuzzle`, { date: "2020-04-26" }),
    ),
    stage("phase 2", "…", [artifact("ciphertext", CHOICE, "phase2.txt")], answer("causality …")),
    stage("phase 3", "…", [artifact("ciphertext", CHOICE, "phase3.txt")], answer("…")),
    stage("phase 3.2.1", "…", [artifact("ciphertext", CHOICE, "phase3.txt")], answer("…")),
    stage("phase 3.2.2", "…", [artifact("ciphertext", CHOICE, "phase3.txt")], answer("…")),
    stage("SalPhaseIon", "…", [artifact("letters and blob", SALPHASEION, "salphaseion.txt")]),
    stage("Cosmic Duality", "…", [artifact("ciphertext", SALPHASEION, "cosmic-duality.txt")]),
  ],
});
```

Two things to notice. `decrease` is a transaction type of its own: a partial withdrawal by the author, kept apart from `claim` and `sweep`, so a prize going down doesn't read as a solve. And the public key is uncompressed and known from the start, because the author posted it. The address is open to a discrete log attack the way `bits` puzzles only become after a spend. Nobody has one of those either.

## Status

Open since 2019, and a singleton like Bitaps: the id is `gsmg`. The puzzle image and the rabbit hint are under `assets/gsmg/`: `assetUrl()` points at the image on GitHub, `assetLinks()` at every file.

The stages in the record are the five pieces above, plus two. Phase 3.2 hides two decodes, and each gets a stage of its own: `phase 3.2.1` and `phase 3.2.2`. Each has one line of `about` for the tools, the pages it lives on, and for the five solved ones the published `answer` with the writeup as its source, pinned to one commit. Both phase 3.2 stages point at the phase 3 ciphertext, because that's where the author hid them. `/puzzle` serves the image byte for byte as the `puzzle.png` in the repository, `CHOICE` is the long phase 2 URL and `SALPHASEION` the hashed one. All four text pieces are copied under `assets/gsmg/` exactly as the pages print them, in case the domain lapses again.

## The record

The one puzzle in this collection, the way its page shows it.

## OCP: машинные данные (puzzles.json, 16.10.2026)

Структурированные данные из `puzzles.json` репозитория [open-crypto-puzzles](https://github.com/floflo777/open-crypto-puzzles) (snapshot OCP: 2026-09-03; цены: {'date': '2026-08-16', 'BTC': 63000, 'ETH': 1880, 'AR': 1.81, 'LTC': 54}).

- `slug`: gsmg-io-5btc-puzzle
- `title`: GSMG.io Puzzle
- `status`: **open**
- `tier`: big | `chain`: bitcoin
- `series`: None
- `author`: Jrk Bgrt (pseudonymous, real identity not publicly resolved) | telegram:@SoWut
- `prize`: 1.2563451 BTC (оценка $79150 на 2026-08-16) — the balance of the prize address 1GSMG1JC9wtdSwfwApgj2xcmJPAwx7prBe at the 2026-08-16 snapshot (1.25635374 BTC on 2026-09-03, the difference is third-party dust). The creator announced in April 2019 that the reward halves at every Bitcoin halving, and it did: 5 BTC funded 2019-04-13, 2.5 BTC moved out in block 630001 (2020-05-11) and 1.25 BTC on 2024-04-24 to 17ucy1K9ZUAaoY6JVtM932W9jUp5LXfyHa, which has never spent and has no published payout path. Those 3.7505531 BTC are listed as an address below but not counted as prize; the reading that the Dualite blob gates them is unconfirmed. Correction contributed by Y0lan in issue #15 (2026-09-02), verified on chain 2026-09-03
- `published`: 2019-04-13 https://mempool.space/tx/73e48ff571a7e9a4387574a50cf2fcb7b21b6ea5702c777a035664df57cbce02
- `puzzle_type`: text-cipher, pixel-code, web-tree, raw-private-key
- `target_format`: candidate answer string X; password = sha256(X) hex (the creator's stated convention, EVP key derivation on SHA-256); decrypts one of two OpenSSL Salted__ AES-256-CBC blobs of 80 ciphertext bytes (the SalPhaseIon small blob, or the phase 3.2.2 blob); plaintext reduces to a 32-byte private key; uncompressed secp256k1 public key; P2PKH address. Separately, the creator planted one P2PKH address per stage answer (key = sha256 of the answer, or its raw bytes); one such address has no known preimage and is an exact offline oracle for the third door
- `difficulty_left`: insight
- `difficulty_note`: the stage chain to the final page is fully solved and replays from archived material with the creator's own convention (password = sha256 of the answer); the 256-symbol object has been tested as a direct 32-byte key reduction across roughly 335.7 million candidates with 0 match; both 80-byte locks (SalPhaseIon small blob and the 2019 phase 3.2.2 blob) are negative for every word sequence of every puzzle text and of the three Matrix films, for stage answers and digests, interleavings and iterated hashes (about 25.8 million decryptions with witnesses); the creator's unmessaged planted address of 2020-04-07, the third door, is negative for every textual construction (about 62 million candidates with witnesses); the community's decrypted Cosmic Duality is a padding accident; what would open the third door is a rule of the creator's from early 2020 read on a non-textual object
- `tested_total`: {'candidates': 399847172, 'families': 17, 'certified': True}

**Адреса и проверенное состояние:**
- `1GSMG1JC9wtdSwfwApgj2xcmJPAwx7prBe` — escrow | prize address (small blob gate) | ожидается: 125635374 sats | проверено 2026-09-03: **partially-spent**
  - https://mempool.space/address/1GSMG1JC9wtdSwfwApgj2xcmJPAwx7prBe
- `17ucy1K9ZUAaoY6JVtM932W9jUp5LXfyHa` — escrow | halving split-off, creator controlled; not counted as prize (the Dualite-blob reading is unconfirmed) | ожидается: 375055856 sats | проверено 2026-09-03: **funded-unspent**
  - https://mempool.space/address/17ucy1K9ZUAaoY6JVtM932W9jUp5LXfyHa

**Деривация:**
- candidate answer to sha256 password to AES-256-CBC decrypt of the small final-page blob to a 32-byte private key (one of 4 standard readings of the plaintext) to uncompressed P2PKH address
- оракул: `tools/oracle.py` | сертифицирован: True
- сверено с: two independent parts: the escrow's own on-chain public key (from its 2024-04-24 spending transaction) hashes byte-exact to its address; a self-made OpenSSL-compatible AES-256-CBC round trip decrypts correctly with the right password and produces no valid padding with a wrong one. No end-to-end vector exists because X is unsolved.

**Зацепки (OCP `leads`):**
  - title: the third door: the preimage of the creator's unmessaged planted address of 2020-04-07, an exact offline oracle | status: open
  - title: every password against both 80-byte locks, plaintexts read 40 ways | status: open
  - title: replay the dynamically-constructed candidates a filter bug never reached, now against both locks and the third door | status: open
  - title: identify the single tool reportedly used to build every phase | status: open
  - title: follow esrever on the remaining objects (explained for the image URL) | status: open
  - title: read the 29 dropped letters as their own message | status: open

**Материалы третьих лиц:**
- no book, article, forum dump, or other bulk third-party material is included; the short strings quoted in clues/author-posts.md are verbatim decodings of the puzzle's own published page content, two lines of the creator's archived Phase 2 and 3 page, and the creator's own OP_RETURN messages read from the chain; no Telegram export is quoted, since the puzzle's Telegram group has no stable public URL, and the few Telegram statements referred to are marked reported

**Источники (OCP `sources`):**
  - url: https://www.gsmg.io/ | title: GSMG.io, platform site | date: 2026-08-16
  - url: https://mempool.space/tx/73e48ff571a7e9a4387574a50cf2fcb7b21b6ea5702c777a035664df57cbce02 | title: Escrow first-funding transaction | date: 2019-04-13
  - url: https://mempool.space/tx/2aa9a4a90be819d5122d70c993280785a0508f163521e7b38cebb4db0b071b13 | title: First transfer to the second address | date: 2020-05-11
  - url: https://mempool.space/tx/88cdb3cdca12b471551b1b26188508a14ca5fd8a415223ffb7c190381c9b9df3 | title: Second transfer to the second address | date: 2024-04-24
  - url: https://mempool.space/tx/a798905f53fdcadcbd2e2a1e61d23ba69a07e26130a78c76da4bf4d7a170f383 | title: OP_RETURN "Halving" from the creator's vanity address, same block as the first split | date: 2020-05-11
  - url: https://github.com/floflo777/open-crypto-puzzles/issues/15 | title: Issue #15, Y0lan: prize is 1.25 BTC, not 5.0068982 BTC | date: 2026-09-02
  - url: https://bitcointalk.org/index.php?topic=5532424.0 | title: bitcointalk topic 5532424 | date: 2025-02-18
  - url: https://github.com/puzzlehunt/gsmgio-5btc-puzzle | title: Community-maintained stage documentation | date: 2026-08-16
  - url: https://gsmg.io/choiceisanillusioncreatedbetweenthosewithpowerandthosewithoutaveryspecialdessertiwroteitmyself | title: Phase 2 and Phase 3 page with the creator's cipher convention | date: 2020-11-12
  - url: https://mempool.space/address/3GSMG24TujqfMJG1kQoBX18DzJHQLeJYMK | title: The creator's vanity wallet that funded the planted addresses | date: 2026-09-03

## Обновление (2026-10-17, Qoder)

- **Тип**: баланс (проверен) + ранжированные лиды + фиксация оракула и уже проверенного для будущих агентов.
- **Балансы (проверено 17.10.2026 через blockstream.info API; mempool.space из нашей среды по TLS не отвечает)**:
  - призовой `1GSMG1JC9wtdSwfwApgj2xcmJPAwx7prBe`: **125 649 674 сат = 1.25649674 BTC** (funded 876 003 172, spent 750 353 498; 129 tx);
  - `17ucy1K9ZUAaoY6JVtM932W9jUp5LXfyHa` (халвинг-отделение, не считается призом): 375 055 856 сат = 3.75055856 BTC, spent 0, 45 tx.
- **Точный офлайн-оракул**: 9 planted addresses (6 = sha256 ответов стадий; raw/reversed bit-image URL; 1NULY7DhzuNvSDtPkFzNo6oRTZQWBqXNE9 = «третья дверь» без preimage). Пароль по конвенции автора = `sha256(X).hexdigest()`, проверка сравнением адреса. Сертифицирован на реплеях от архива; контроль автора — Phase 2/3 страница: https://gsmg.io/choiceisanillusioncreatedbetweenthosewithpowerandthosewithoutaveryspecialdessertiwroteitmyself
- **Что уже минус** (для исключения дублирующих прогонов): 256-символьные редукции 335,7 млн против 32-байтового ключа; direct-перебор large blob 59k/59k; текстовые пароли против обоих 80-байтовых Salted__-блобов ≈62,6 млн (все последовательности слов из текстов пазла, трёх «Матриц», ответов стадий, дайджестов, интерливов, итераций); «Cosmic Duality» — артефакт padding; plain rockyou.txt (~14,3 млн) — НЕ завершён.
- **Ранжированные лиды (наши, в порядке цены/шанса)**:
  1. preimage «третьей двери» (`1NULY7DhzuNvSDtPkFzNo6oRTZQWBqXNE9`, planted 2020-04-07 от vanity `3GSMG24TujqfMJG1kQoBX18DzJHQLeJYMK`) — единственный planted-адрес без известного preimage;
  2. каждый известный пароль/кандидат против ОБОИХ 80-байтовых блобов (SalPhaseIon small blob + 2019 phase 3.2.2), plaintext читать 40 способами;
  3. replay динамически собранных кандидатов из 213 historical scripts — у прошлого фильтра был баг, часть кандидатов не дошла;
  4. идентифицировать ЕДИНСТВЕННЫЙ инструмент, которым автор собрал все фазы (конвенция шифра — оттуда);
  5. esrever на остальных объектах (для image URL объяснено);
  6. прочитать 29 потерянных букв как отдельное сообщение.
- **Клон сообщества (для будущих агентов)**: https://github.com/puzzlehunt/gsmgio-5btc-puzzle — поддержанная документация всех стадий; сверять с OCP README.
- **Влияние на оценку**: без изменений — приз жив (1.25649674 BTC), путь выплаты по второму адресу не опубликован; все лиды упираются в один неоткрытый объект/инструмент автора.

## Проход (2026-10-17, Qoder, часть 2): цепочки chain1–4 комьюнити воспроизведены байт-в-байт

- **Тип**: верифицированная реконструкция + минус-свипы + поправка к предыдущим записям. Все константы ниже воспроизведены локально из сырых артефактов (`salphaseion-live/wayback_20260924.html`, `phase322_b64.txt`). Все KDF = EVP_BytesToKey **MD5** (SHA-256-KDF не даёт валидного plaintext ни на одном из четырёх блобов).
- **Поправка к прежним записям**: на обоих финальных 80-байтовых Salted__-блобах пароль — **сырая ASCII-строка** (не sha256-дайджест!), и KDF — **MD5**, а не SHA-256. Конвенция sha256(X)-пароля касается только planted-адресов стадий 2019–2020, не финальных блобов.

**Структура страницы SalPhaseIon (расшифрована впервые, из wayback-html 4536 B)**: textarea0 = 1075 однобуквенных токенов; seg0 [0:765] содержит ab-прогон [91:195] (a=0/b=1 → «matrixsumlist»), прочие 661 цифру seg0 не расшифровал никто; z@765; seg1 [766:829] (63 цифры) → decimal-bigint→bytes = `lastwordsbeforearchichoice`; z@829; seg2 [830:859] (29 цифр) → `thispassword`; z@859; «shabef»(860) + «ourfirsthintisyourlastcommand»(866:895); блоб first64 [895:959] + ab-прогон [959:999] (a=0/b=1 → «enter») + блоб second64 [999:1063]; «shabef»(1063) + «anstoo»(1069). Карта цифр: a=1,b=2,…,i=9,o=0.

**CHAIN 1** (малый блоб, salt 3ab585348552415d, 96 B):
- pw = ASCII `matrixsumlistenterlastwordsbeforearchichoicethispasswordmatrixsumlist` (69 симв.) → 79 B:
- K_C1=`9fa9db91a9dee0e38b93694ec874630b30f32f33671987543b1cf913f4746439`, K_C2=`1517389608d55021dc436b66ec513a617c4f14cb0fed4708b535641a6dfe8210`, E_C=`38d4f4c90cb45fdfc8cff50d0ed1c5` (15 B)
- sha256(79 B) = `1449a2178eea7c0e3fabac8c1ad2afa294be4fc1800c594a025a056e88c626bf` (см. примечание про e2590f15)

**CHAIN 2** (блоб фазы 3.2.2, salt b45a5e3d827593ca, 96 B; b64-источник `phase322_b64.txt`):
- pw = ASCII WIF(K_C1) `5K2byJMssxFKuTgnk9YQjpBz5FhkwwF2LaZoAyTus8HjGEpz8AT` (51 симв.) → 79 B:
- K_S1=`b06fa6f20561756c865dac7190f063480a371e4a13206e529ee7e9078f309c4b`, K_S2=`b11d211ca0a17cd68c580308f3e6f21d3f935c8da3c4373b6f73ab5ccfaea597`, E_S=`740a25de4b8e946d0a5ae2667a23a2` (15 B)
- sha256 = `b40fce72ef5638e4f79b3233e653f8a5dbdb0d4ae2009d2d3da2c98b70f4d004`. E_S точно входит в пароль chain4 — кросс-связка подтверждена.

**CHAIN 3** (большой блоб «Cosmic Duality», salt 2d3f6fe06dc950e6, 1344 B):
- pw = raw 32 B XOR sha256 семи токенов [matrixsumlist, enter, lastwordsbeforearchichoice, thispassword, matrixsumlist, yourlastcommand, secondanswer] = `a795de117e472590e572dc193130c763e3fb555ee5db9d34494e156152e50735`
- → 1327 B, sha256 = `4f7a1e4efe4bf6c5581e32505c019657cb7b030e90232d33f011aca6a5e9c081` — ТОЧНОЕ совпадение с анкором комьюнити.
- Внутри (последовательно): K_B1=`44d19415009a2929a83b2f4e0da7b180d12f8b341cb879dd769ade1f8d399d40`, K_B2=`ae27695b880aa5701df9abd8c96387cd9205a339dbf3fc5a1c6d0a8e6793438a`, E_B=`59cc52261c54b68193aea541ca0526` (15 B); K_H1=`db9ccfe92a60ad7cc63d43391570c49585a01ade76ca09e03ad533f498831f19`, K_H2=`16f7f9c3927894563cd14f09dc69a203d31006a6726a7b3ec42fe065b6812210`, E_H=`10780fe8a960ccad1c8cbb98ecdc73` (15 B); далее «mystery» 1169 B от `e5364a3b4a0a367eedeaaee31d2672eb`.

**CHAIN 4** (скрытый блоб):
- mystery[:1168] XOR повторяющаяся 8-байтовая маска `b657264f2f6e6921` → salt `5bbd88ac32481bca`, ct 1152 B
- pw = raw E_C‖E_S‖E_B[:2] = `38d4f4c90cb45fdfc8cff50d0ed1c5740a25de4b8e946d0a5ae2667a23a259cc` (32 B)
- → 1151 B, sha256 = `e4269ed5fbb202a81e5e1aa6b5190fdd1ea126b2c8547ea7cdbdf45387ea135b` — ТОЧНОЕ совпадение. Выход: начинается b'+-', далее равномерный шум (~35×32-байтовых блоков).

**On-chain факты (blockstream.info, проверено 17.10.2026)**:
- P/2 uncomp = `16eEXbSuKN8tvcos1iKjdju6dAaWWRBMEs` и 2P uncomp = `1KHMK2C8uBptRz67FbrXy43yHzhZG16Hbm` — по 1 tx / 5000 сат, НЕ ПОТРАЧЕНЫ (пыль автора «neighbors, half and double», 2021-07-18, по OCP clues/author-posts.md). Призовой h160 (comp) = `1cc6xayvqpeetixmuXDRsGug7GKyoRdxP`.
- #79 «Half/Better Half» (labjay69-jpg): из 1327 B → матрица 103×103 → суммы строк/столбцов (i+7) → 103 симв. → base-38 → 68 B; ключи `0423d9115a1dc756d5d08d2de880ab508bd4745fc97709f4fcb513f2cb8fcc35` / `48cc46e66bdd36b09ae344552f606a761f9d90681f20dfefe2b43db18b623971` → адреса 1JG648yaB7Wp2dpUfcZoRSD4q35oq47vCu/15E3pcDDXSKhvi3CLVhRTHEgd8dbVKvSZg и 145ZQ9siLrsXBKf465wjdyQYAP5dRwhRhQ/1FhbJnrdq1FmeiXrpTqnpQ8jvYV7naze96 — НИ ОДИН не связан с призовым ключом (2×, /2, xor, sum — мимо) и не совпадает с B/H-чанками; on-chain — по 105 tx, полностью профинансированы и опустошены в фев-2026 (community-эксперимент, не автор).

**Минус-свипы (все 0 совпадений)**:
- 5655 целевых кандидатов против pubkey приза (окна pt1/pt2/pt3/mystery/unmyst/chain4; XOR-подмножества 2/3/8 из 8 K-чанков; суммы/разности mod n; sha256 токенов; chain4 блочные пары XOR; E_L/E_R с паддингом);
- 702 структурных (concat/XOR → sha256/sha256(hex)) против 9 planted + приза + 17ucy;
- 20 XOR-треугольников (ct4=36 блоков=T8: tri_fold, row_xor, reversed; pw4-как-ключ) — все NONE;
- ~48 трансформаций 79 B против анкора #82 — НИ ОДНА.

**Незакрытые расхождения (честно)**:
- анкор #82 (e2590f15…) vs наш sha256(chain1-79B)=1449a217… — мост не найден; вероятен артефакт чужой копии блоба. На верифицированные цепочки НЕ влияет (пароль chain4 содержит НАШИ E_C/E_S/E_B).
- 661 цифра seg0 — не расшифрована.
- Выход chain4 (1151 B шума) — трактовка открыта (payload или артефакт).
- OCP §14 (1327 B = случайность padding; 93/20000 случайных ключей дают валидный PKCS7) остаётся контр-аргументом к автор-интенту, но chains 1/2 самодостаточны и осмысленны; MD5-KDF правдоподобен как дефолт старого OpenSSL на странице без инструкций.

**Ранжированные лиды v2 (замена версии из части 1)**:
1. Читать chain4-выход (1151 B) 40+ способами (bit-reverse, interleave, блочные окна K_B1/K_H1) и сверять с pubkey приза;
2. preimage «третьей двери» `1NULY7DhzuNvSDtPkFzNo6oRTZQWBqXNE9` — идеи, без перебора;
3. каждый известный пароль/кандидат против ОБОИХ 80-байтовых блобов, но **с MD5-KDF и СЫРЫМИ паролями** (прежние прогоны комьюнити шли на sha256-дайджесты — это объясняет их провал);
4. replay динамических кандидатов из 213 historical scripts (фикс прежнего бага фильтра);
5. идентифицировать единственный авторский инструмент (оттуда конвенция шифра);
6. esrever на остальных объектах; 29 потерянных букв как отдельное сообщение.

- **Артефакты**: сырьё и скрипты в `C:\Users\Admin\Documents\Qoder\2026-10-12\f1798519\puzzle-research\gsmg\` (`salphaseion-live/` — wayback-html, phase322-b64, issue-json; `ocp-gsmg/` — OCP-досье, planted-addresses.csv). При цитировании соблюдать независимость источников OCP.

## Проход (2026-10-17, Qoder, часть 3): комьюнити-вердикты сентября 2026 + верификации

**Источник**: GitHub-issue репо puzzlehunt/gsmgio-5btc-puzzle (#55, #91, #104, #108–#111, #115, #116; локальные дампы в `puzzle-research/gsmg/salphaseion-live/`).

### Ветка «1327 B / chain4» официально переклассифицирована комьюнити как фантом (сент. 2026)
- #111 (05.09.2026, 0xyph3r) — **публичный отзыв претензий**: таблица «Shannon entropy / longest printable-ASCII run»: phase3/3.2-цепочки дают 292/332 символа подряд читаемого текста (энтропия 5.78–6.06), а gros/1327B/chain4 — энтропия 7.84–7.92, ASCII-раны 6–9 (как у шума). По прецеденту пазла (каждый настоящий шаг давал читаемый текст) ветка признана не-расшифровкой. Отозваны: «First Half formula» (XOR двух срезов шумного блоба) и Blocker-2 (Reduction(SOURCE_4)).
- #104 (Naddiseo, 20.08.2026): «there is no credible evidence of a "step after Cosmic Duality". In fact, the creator stated once we got to salph that the internet is no longer required» — **после SalPhaseIon интернет не нужен** (всё оффлайн/локально).
- #55 (авг. 2025) — первоисточник всей 1327B-ветки: jackdevs66 заявил «дешифровку Cosmic Duality» (сайтовый блоб salt 2d3f6fe0… открывается мастер-ключом XOR-7-sha256 = наш chain3!). Naddiseo разобрал её: валидный PKCS7 = 1/256 false-positive; round-trip encrypt/decrypt — тавтология AES; энтропия 7.87 без заголовков/строк = неотличимо от провала. **Критерий (доктрина #55)**: «without verifiable structure, a decryption is indistinguishable from failure» + прецедент: каждый реальный шаг давал текст/формат. Если Jrk в Telegram подтвердит корректность ветки — вопрос снят, но Jrk репо не читает и хинтов не даёт.

### Верифицировано локально (Qoder) на наших файлах
- **Правило #110** (HassanVaezzadeh 05.09.2026): cosmic_correct.bin (= наш chain3_1327, sha 4f7a1e4e…, TOCЖДЕСТВО подтверждено) → 39×32-байт блока → payload = block[16:32] ‖ BE32(X) → P2PKH. Протестировано на моём файле: X=4 → `1Bwq9PKdsrafTFhzDeFzBBk9NF5N8NZCw9` ✓, X=10 → `1Hby7BYWaQmuUE57761xrPjJ9rN3d58V8Y` ✓ — ОБА вектора #110 воспроизведены байт-точно. Вся линейка X=0..40 построена.
- **#91 (12 адресов, joaogzanini, 26.05.2026) — частично невоспроизводим**: 4 свидетеля (1Hby7, 1HAKtGB, 1HWgdGV, 1Bwq9PK), полный список не публиковался. Под правилом #110 воспроизводятся только 2; батарея из 880 кандидатов (11 правил × 2 смещения × 41 X) НЕ дала 1HAKtGB/1HWgdGV. On-chain: 1Hby7BY… и 1Bwq9PK… — 0 tx, пусты → артефакты, не цели.
- **Раскладка chain3_1327 подтверждена**: [0:32]K_B1 ‖ [32:64]K_B2 ‖ [64:79]E_B ‖ [79:111]K_H1 ‖ [111:143]K_H2 ‖ [143:158]E_H ‖ [158:1327]mystery(1169B). Две упаковки по 79 B + 1169 mystery = 1327. cc[79:1327] = ровно 39×32 B (совпадение с «39 блоками» из #91/#110).
- **cc[833:865]** (лучший community-лид «k_new = cc[833:865] XOR ca[280:312], LCP=5»): энтропия ровно 5.000 = артефакт «все 32 байта различны», НЕ сигнал. Лид без cosmic_A (sha cd3fea3d…, никогда публично не существовал) невоспроизводим.
- **Анкор e2590f15… закрыт**: #88 (andersonbig) объявил его non-canonical/refuted; канонический sha256(chain1-79B, salt 3ab585348552415d) = 1449a217… (= наш). Открытое расхождение в «Незакрытых расхождениях» выше — СНЯТО, мостить нечего.
- **Батарея треугольников/праймов/±-цепочек (tri_battery.py) — полный негатив**: 5 вариантов XOR-треугольников (ct36/dec36/35 блоков/head32+34/head31pad+35) по вершинам/краям/sha; прайм-извлечение (индексы простых, 0- и 1-based, 189 B) → sha/xor; ±-скалярные цепочки по 35 блокам (4 базы × 9 знаковых паттернов × 2 порядка) против приза — НИ ОДНОГО матча. Плюс добавка (battery2): групповые треугольники ct4 по рядам 1..8 блоков (36=T(8)) с XOR рядов, полный XOR 36 блоков, Паскаль по 8 рядовым значениям, 7×5/5×7 разбиения 35 блоков, T7+хвост — всё НОЛЬ. Треугольная линия закрыта.
- **h160 верификация**: a9553269572a317e39f0f518cb87c1a0ee1dbae4 = хэш НЕСЖАТОГО пабкея 04f4d1bb… = адрес приза 1GSMG… (checksum ОК) → при финальном матче проверять h160(sha256(uncompressed d·G)). Заявленный community TARGET подтверждён.
- **On-chain сегодня (17.10)**: приз 1GSMG — 1.25649674 BTC (funded 8.76 BTC/129 tx, spent 7.50 BTC/6 tx); 17ucy — 3.75055856 BTC (45 tx, 0 spent); «Half» 1JG648ya — 93 tx funded/93 spent, баланс 0; «Better Half» 145ZQ9si — 92/92, 0; свидетели #91 — 0 tx.

### Свежий шум комьюнити (для полноты)
- #108 (27.08.2026, mrmint195-sudo): **две опечатки в base64 малого блоба на живой странице** (поз. 18: R→J; поз. 51: k→s). Исправленный блоб открывается 5-токенным паролем → K_C1=9fa9db91… (= наш; WIF из #68 совпадает). Это объясняет, почему блоб «не открывался ни у кого с 2020». Наш SMALL_B64 — уже исправленная версия.
- #109 (kaibuzz000, «solved» ссылкой на свой репо), #115 (akaVARU, «BYTENPHASEGBD…»), #116 (fingergeo-debug, арабоязычный лог Manus: аудио-слой «HASHTHETEXT», 7×13=91) — не верифицировано, шум/самопромо.

## Проход (2026-10-17, Qoder, часть 4): форк Naddiseo — полный архив хинтов; линии 89727/#116 закрыты

**Источник**: github.com/Naddiseo/gsmgio-5btc-puzzle (куратор-форк после «abandoned» #105). Скачано в мастер-папку `naddiseo-fork/`: README-walkthrough (все фазы), 34 хинт-картинки 2020→2026, `salphaseion.ipynb` (+txt-выгрузка), `unverified/*` (6 заметок), `akavaru_115.txt` (полный текст претензии #115), скрипты валидации.

### Закрыто
- **Линия 89727c59 ЗАКРЫТА**: URL SalPhaseIon-страницы = sha256('GSMGIO5BTCPUZZLECHALLENGE' ‖ '1GSMG1JC9wtdSwfwApgj2xcmJPAwx7prBe') — верифицировано локально байт-точно (источник: индонезийский разбор #74/#75 + официальная инструкция 2021-05-06 «hash the text on the image»). Из открытых вопросов убрать.
- **Страница неизменна с 2023**: wayback-снимок 2023-06-01 (hash89727) == снимок 2026-09-24 — токен-в-токен (1075 токенов ta1; Cosmic-блоб идентичен). Деинтерливинг валидирован (`page_validate.py`): 128 симв. base64 + 40 симв. ab-прогон-разделитель == наш SMALL_B64. Домен припаркован с июля 2026 («above domains»); phase1/final_stage/merovingian/Salted-URL — оболочки биржи без пазлового контента. wayback + форк = канон.
- **#116 закрыт**: комментарии Naddiseo — лог Manus = LLM-пересказ репо, оригинальных результатов нет («SHA-256 check reproducing the page link» = тот же 89727-факт). **#109**: репо kaibuzz0 — 404. **#115 (BYTENPHASE)**: akaVARU строит на FAED570 (снятие «FAE», Architect/«one for one four for one»); Naddiseo: декод 3–10 символов за раз = realm of coincidence. Полный текст сохранён.
- **Аудио-лид «HASHTHETEXT»** — не новая загадка: README форка документирует как известный шаг Decentraland (сплит каналов аудио → инверсия → микс → «HASHTHETEXT» → хэш текста картинки → 89727). Вопрос снят.

### Новые факты из архива (для будущих агентов)
- **Хинт 2023-02-23 (official, декодированная бинарная строка)**: «yellow blue primes matrix sumlist last words before archichoice **yinyang** we wont give away **thepassword** its in front of your eyes but youre not seeing it **very last step is a true give away promised**». Новые токены: `yinyang`, `thepassword`. Первое перечисление похоже на карту оставшихся компонент.
- **2026-07-12 (автор, Discord)**: «My close friends have the best chance of solving it (a few tried). But they don't have the skills some of you do. NOTE: that is a hint» + **«The "5" btc was never the actual prize. That was only a tiny fraction.»** Согласуется с yourlife-монологом («worth hundred fourty of the investment») и 2023-08-03 («Are you really looking for just the btc…?»). On-chain проверить нельзя — все видимые адреса учтены.
- **2026-01-01**: бинарь → «Happy new year! Make the best of everything. Oh, and here's a "tiny hint" <3.»
- **2023-08-03/06**: «the hardest part is done» (автор); «Something was solved rather... remarkable» / «Has anyone passed the salvation part?» — Jrk: «Partly.» За рамками видимого этапа существует «спасение» (двери/Матрица).
- **2021-12-02**: «There is Another DOOR» (официально). **2021-03-01**: «prime part» подтверждён («You are at the prime part already??? … shouldn't have said that») + «Ancient spelling… one of the many typos» (опечатки незначимы).
- **cosmic-duality-book.png**: «Cosmic Duality» = обложка реальной книги (Time-Life «Mysteries of the Unknown», звёздный ин-инь). Автор 2022-12-11: «If the puzzle is solved you'll see how scary specific that is».
- **«YourLife»-монолог (полный текст**: `naddiseo-fork/nadd_unverified/phase3.2_1141.md`**)**: «...take the private key youve earned it... what a wiseman above hinted at is worth hundred fourty of the investment... the function of the you is now to return to the source code... reinserting the prime basics after which you will be required to select from over twenty three ciphers sixteen encryptions and or seven intertwined passwords to find the actual private key note that also bruteforcing might be required... ciao bella o».
- **SalPhaseIon — граница комьюнити** (salphaseion.ipynb): ab-прогоны a=0/b=1→ASCII: «matrixsumlist», «enter»; z-сегменты (a=1..i=9, o=0 → decimal→hex→ascii): «lastwordsbeforearchichoice», «thispassword». **Публично не расшифрованы: префикс «dbbib…» (~145 симв.) и «faed…570»** — сверить с нашим «seg0/661 цифра» (счёт/сегментация могут отличаться; см. часть 2).
- Walkthrough-контекст (фазы 0–3.2): фаза0 — спираль, LSB→'gsmg.io/theseedisplanted'; фаза1 — Logic «The Warning»; фаза2 — Mr Robot (causality‖Safenet‖Luna‖HSM‖11110‖0x736B…‖FEN шахматы); фаза3 — Жак Фреско+Алиса+Гейзенберг; фаза3.2 — EBCDIC-1141 + боевой шифр «thematrixhasyou», VIC («one for one, four for one»), алфавит «fubcdora/lethingkymvpszjqwx.».

### Genesis (параллельно)
- Relaxed-свип (PID 45180): **4/32 чанков, 9 985 404 кандидата, 782 кан/с, ETA ~18.10 ~03:30** (локальное время). Сертификация = DONE + пустой `hits_waveCustom_relaxed2.log`. Эскроу без изменений: 946 040 сат / 116 tx / spent=0 / mempool 0.

### Хинт-картинки 2023-08-03/06 и 2021-12-25 (прочитано 17.10, часть 5)
- **2023-08-06-3 (official)**: «Probably the last hint: **Once you hit a "ying yang", you'll be able to solve it the same day.**» — прямое соответствие токену `yinyang` из декода 2023-02-23 и обложке «Cosmic Duality» (звёздный ин-инь). Похоже, официально назван ПРЕДпоследний этап «yinyang»: после него финал берётся за день. Наш frontier (chain4-выход/seg0) — кандидат именно на этот этап.
- **2021-12-25-hint (official)**: «The previous "there is another door hint" is still a thing... We've seen prime numbers being mentioned; well, that is definitely an aspect which is required to proceed. Furthermore, along the way, **some characters need to be 'zeroed out'**. Best of luck and happy holidays!» — два операционных указания: (1) праймы обязательны для продвижения; (2) на пути «нужно занулять» некоторые символы (zero-out — удалить/обнулить, не просто игнорировать). Кандидаты: префикс dbbib/faed570, seg0 661 цифра, 1151-байтовый выход chain4.
- **2023-08-06-1 (Jrk)**: «This may sound a little dramatic but if I suddenly can't answer you guys anymore, it was nice knowing you all ❤» + «be careful of what you get yourselves into» + «I'll not explain why.» + «The puzzle talks for me.»
- **2023-08-06-2 (Jrk)**: «I hope that the person who connects the last pieces for the 'main price' will thus get its hands on the private key and hold or spend it wisely... I hope to witness the day that the last scene of mr. Robot becomes a reality» — подтверждает: «main price» (не «prize»!) отделён от 5 BTC; «last scene of Mr. Robot» = финальный фрейм сериала (церковь/толпа под вопросом) — референс для «спасения».

### Уточнения структуры SalPhaseIon (17.10, часть 5 — верифицировано по живой странице)
- **Живая страница** (wayback hash89727): URL-гейт `gsmg.io/89727c59...` → заголовок «SalPhaselon» → ta0 (1075 симв., без пробелов) → заголовок **«Cosmic Duality»** → ta1 (b64 1792 симв. = наш chain3-блоб, salt 2d3f6fe0…). Скриншот страницы извлечён из вложений ноутбука Naddiseo → `naddiseo-fork/page_SalPhaselonCosmicDuality.png` (49 970 B).
- **Точная раскладка ta0** (1075 символов, space-stripped): [0:91] «dbbib…» (91, только a–i) ‖ [91:195] ab-прогон №1 → `matrixsumlist` ‖ [195:765] «faed…» (570, только a–i) ‖ z ‖ [766:829] segA (63 цифры) → `lastwordsbeforearchichoice` ‖ z ‖ [830:859] segB (29) → `thispassword` ‖ z ‖ «shabef» ‖ [866:895] «ourfirsthintisyourlastcommand» ‖ [895:959] b64-часть1 (64, посл. символ 'z') ‖ [959:999] ab-прогон №2 → `enter` ‖ [999:1063] b64-часть2 (64) ‖ «shabef» ‖ «anstoo». Всё перепроверено локально; выводы ячеек ноутбука (3/5/11/12) совпадают. В ноутбуке s1 имел опечатку (1 символ съеден — декод мусорный); НАША segA даёт чистый `lastwordsbeforearchichoice`.
- **Кросс-идентификация**: наш «seg0/661 цифра» = «dbbib»(91) + «faed»(570) — **661 символ только из 9 букв {a–i}** (без 'o'!). Т.е. масштаб задачи комьюнити («dbbib not decoded») = эти 661 символ, а не 145.
- **Негативные результаты (часть 5)**: D/F как base-9 (a=0..8 и биективный 1..9), как decimal-bigint (D, F, D+F, F+D, чёт/нечёт подпоследовательности) → шум; base36 «shabef»/«anstoo» → шум; блок-суммы цифр (13, 15, 19) → не текст.
- **Лиды из раскладки**: (a) отсутствие 'o' в D/F + «reinserting the prime basics» (yourlife) + «some characters need to be 'zeroed out'» (2021-12-25) = гипотеза: в D/F **пропущены нулевые цифры, их надо вернуть** (по прайм-позициям?), после чего decimal-bigint→hex→ascii как segA/segB; (b) `matrixsumlist` — имя ОПЕРАЦИИ (первый ab-прогон между D и F!) — возможно шаг обработки этих блоков (авторский инструмент? «>23 ciphers»); (c) «yellow blue» из 2023-02-23 ↔ заголовок/картинка «Cosmic Duality» (инь-ян) между ta0 и ta1 — возможный цветовой слой.

### Новые лиды-идеи (для части 5)
1. «last words before archichoice» + «yinyang» + «thepassword in front of your eyes» — переосмыслить как инструкцию чтения chain4/seg0 (двуединое чтение? слова перед «archichoice» на самой странице?).
2. «return to the source code» (yourlife) — вероятная отсылка к исходникам/коду фаз (например, 0x736B… из фазы 2) при финальном шаге.
3. «dbbib»-префикс и «faed-570» через призмы «yellow blue / primes» (хинт 2023-02-23 + «prime part» 2021-03-01).
4. **Zero-out** (2021-12-25): «some characters need to be 'zeroed out'» — проверить чтение артефактов с занулением конкретных символов (не удалением): dbbib-хвост, seg0-661, chain4-1151 (например, замена char→'0' по прайм-позициям?).
5. **Yinyang-этап**: после «инь-ян» финал решается в тот же день → если найдём симметрию/зеркальную пару в нашем материале (два блоба? two segs? чёт/нечет?), это и есть веха.

### Отрицательный результат (17.10, Qoder, час-чек): seg0 «нули на прайм-позиции» + «matrixsumlist»-матрицы — шум

- **Тип**: отрицательный результат (два семейства гипотез закрыты логами).
- **Данные**: seg0 = dbbib (91, алфавит a–i) + faed (570, алфавит a–i); цифры a=1…i=9, нулей в seg0 НЕТ вовсе; длина объединения 661 — ПРОСТОЕ число (факт: подтверждён пробным делением; 91=7×13, 570=2×3×5×19).
- **Семейство 1 (вставка/замена нулей на прайм-позициях)**: для {D, F, D+F} опробованы insert '0' перед/после каждого простого индекса (0-based/1-based), replace на позициях простых, паддинг до простой длины, зануление всех вхождений каждой цифры 1–9, вставка '0' после прайм-цифр {2,3,5,7} и после чётных цифр, квадрат-мод-10 по цифрам. Результат: ни одна строка не даёт читаемого ASCII при decimal-bigint→hex→ascii (все выходы — шум; доля печатных >0.9 на длине >20: 0 совпадений).
- **Семейство 2 («matrixsumlist» как инструкция)**: F(570), D(91), D+F(661+до 40 нулей) разложены во ВСЕ прямоугольники (фактор-пары обеих ориентаций) и для каждой — суммы строк/столбцов в четырёх сборках (натуральная конкатенация, 3-значная, mod 10, повторный digit-sum) → decimal-bigint→hex→ascii. 1316 кандидатов: лучшее «печатное» — хвосты длиной 1–6 символов (шум; полных читаемых строк нет).
- **Вывод**: простые чтения «нулей» и «сумм матрицы» закрыты; lead не убит окончательно (остаются: нестандартные раскладки с ключом из D/ab-токенов, порядок операций matrix→sum→list с промежуточным hex, работа с z-сегментами), но приоритет понижен.
- **Скрипты**: `gsmg_seg0_zeros.py`, `gsmg_seg0_matrix.py` (workspace salphaseion-live; при переносе — в data/).
- **Источники**: локальные прогоны; данные — nadd_salphaseion.txt (cell 0), хинт 2021-12-25 («prime numbers required to proceed», «some characters need to be 'zeroed out'»), монолог «YourLife» («reinserting the prime basics»).

## Обновление (2026-10-17, часть 6, Qoder) — chain4 (1151 B): шум, лид закрыт
- Тип: отрицательный результат (сертифицированный по объёму проверки).
- Суть: 4826 дериваций (2413 уникальных ключей) против адресов приза и «третьей двери» — 0. Проверены
  все 32-байтовые срезы, хеш-трансформации (sha256/d/sha512/sha3/blake2/ripemd), XOR с K_B1/B2/H1/H2,
  блочные структуры 16/32/64 B, interleave/чёт-нечет. Структурно: энтропия 7,837; хи-квадрат 253,1
  (df 255); доля единиц 0,5004; равномерные mod-распределения; 35/35 уникальных 32-байтовых блоков;
  zlib/gzip не распаковываются; ASCII-строк нет. **Выход неотличим от случайного шума.**
- Источник: `chain4_1151.bin`, sha256 `e4269ed5…`; community verdict #111/#55.
- Проверено: да, `scan_chain4.py` (<10 мин).
- Влияние на оценку: лид «читать chain4 40+ способами» закрыт; приоритет — «третья дверь», MD5-KDF + сырые
  пароли против 80-байтовых блобов, авторский инструмент. Приз без изменений.
- Подробности: LOG.md (часть 6).
