# Misc surfaces — FINDINGS

## A. The one substantive third-party analysis found: CanalQb (Brazilian crypto blog)
Source: `../forums/canalqb_gemfinder_2026-09.txt` (pre-existing archive from a prior run;
NOT written by this task — quoted only). It is a ~9-min-read Portuguese article
"Puzzle Bitcoin de 0,02 BTC: o Enigma do Gem Finder" (published ~2026-09, author
@CanalQb, also on YouTube). This is the ONLY external write-up found that lays out a
concrete key-extraction theory. Key claims (translated/quoted):

### "52 zeros as markers" theory
> "Uma resposta na própria thread aponta que a grade contém exatamente **52 ocorrências do
> dígito '0'** — o mesmo número de caracteres de um WIF comprimido... Isso sugere que os
> '0' funcionam como **marcadores**, não como parte do valor final."
> Atribuído a um seguidor chamado **Mixas**: *"The number of 0 in the table is 52, like the WIF."*
Interpretation: the 52 zeros are **anchors delimiting 52 extraction operations**, one per WIF
character — NOT a global "every Nth character" read.

### "9vw04 as offset / step" theory
> "A string '9vw04' ... se repete dentro da grade — estatisticamente muito improvável...
> A comunidade tenta usá-la como **âncora ou offset** para extrair caracteres específicos da grade,
> mas ninguém publicou até hoje uma extração que resulte em um WIF válido."
> "9vw04 não precisa ser uma substring literal do texto. Pode ser o resultado de uma
> determinada seleção/transformação. Isso explicaria por que várias pessoas ficaram presas
> procurando literalmente 9vw04 na grade."
The author states the **unresolved point is exactly the role of 9vw04** and how it determines
the jump/index from each 0.

### BSGS / Daniel Shanks / "I don't like rainbows"
> "Daniel Shanks → Baby-step Giant-step (BSGS) resolve logaritmo discreto... a intenção parece ser
> transformar cada âncora 0 em um pequeno problema de busca de chave, em vez de quebrar secp256k1 inteiro."
> "'I don't like rainbows' = negação deliberada de rainbow tables; aponta para Shanks/BSGS."
No specific numeric BSGS range is given (author says Shanks gives the *algorithm*, not the *parameter*).

### Grid transcription (partial, from the article)
> "os caracteres parecem ter sido construídos em pares letra/número... o começo é:
> `T9 U3 V8 W2 Y0 Z5 R4 01 B9 M6 J2 K7 H0 L3 ...`"
This is a third-party OCR-ish read of the first ~14 cells of the 21×50 grid (letter+digit pairs).

### "spelling is incorrect on purpose" hint
> "'Also the last hint. the spelling is incorrect on purpose 😉' ... o detalhe mais suspeito é
> 'a **imagine** of Daniel shanks' em vez de 'an image of Daniel Shanks'. Se o erro intencional
> for 'imagine', isso pode apontar para imagine/imagem → **índice visual**."

### Proposed extraction pipeline (verbatim diagram)
imagem → sequência linear → identificar os 52 "0" → cada 0 funciona como âncora →
usar 9vw04 para determinar o salto/índice → obter um valor por âncora → BSGS restringe/resolve
→ 52 caracteres → WIF.

### Fraud assessment
CanalQb concludes the pattern (prize unpaid >1 yr, "email me for extra hints" requests, months
of wasted effort) matches **crypto engagement-bait scams**; deliberately publishes only a WIF
*verification* script (`bitcoinlib`), never a solver/BSGS-cracker.

## B. Other surfaces (all EMPTY or blocked)
- **lobste.rs** `search?q=9vw04&what=stories` -> HTTP 200, **0 stories** (`lobsters_9vw04.html`).
- **GitLab API** `projects?search=9vw04&public=true` -> `[]`. `search=gemfinder` -> 1 project
  `zyphra/gemfinder` (created 2026-01-08, **empty GitLab template**, only boilerplate README.md,
  0 stars, no topics) — UNRELATED (`gitlab_zyphra_readme.md`, `gitlab_zyphra_meta.json`).
- **Bitbucket** quicksearch -> HTTP **404** (`bitbucket_9vw04.json` = 404 page).
- **Telegram t.me/s/canalqb** -> all 8 page fetches failed: `curl (28) Could not connect to
  t.me port 443` (now blocked/timeout; the canalqb content above was captured by a prior run).
- **Medium** `search?query=9vw04` -> HTTP **403** (Cloudflare/captcha block).
- **Bing** SERP (2 queries) -> HTTP 200 but results are unrelated spam (Chinese Photoshop
  tutorials, Microsoft answers); the "9vw04"/"GemfinderOfX"/address "matches" are only random
  substrings inside Bing `ck/a` base64 redirect URLs. No real indexed page.
- **Mojeek** -> HTTP 403 ("network appears to be sending automated queries").
- **imgur.com/9vw04** (the Reddit `tarje` lead) -> a REAL post, but the image is a random
  **Minecraft Steve meme holding an enchanted diamond sword** (`img_9vw04.png`, 276×419).
  => RED HERRING, not the puzzle grid.

## C. bitcointalk
See `../forums/BT_NOTE.md` — domain does not resolve here (DNS blocked), search never ran.
