# Exploratory note: alternative 68-byte interpretation, GF(256) interpolation, XOR-triangle scans, and current best near-miss

Hi everyone,

I’m sharing this as a technical progress note, not as a final solution.

My name is **Mattia Beltrami**, I’m 21 and I study computer engineering in Italy. One reason I wanted to publish this is that it feels like a concrete example of what a state-of-the-art AI model can do today in real research work: help you enter a domain you did not know well, study it much faster, write and iterate on code quickly, and get to something that is at least genuinely interesting and worth documenting. At the same time, this process also made it very clear to me that the model is not the part that holds the overall vision together. You still need someone applying critical thinking, deciding which directions are actually meaningful, and having the intuitions that make the search move. In my case, GPT-5.4 was an extremely strong assistant, but the decisions about what to test next and what felt structurally promising were still mine.

What follows is an **alternative interpretation** of the final 68-byte output, plus a set of **search scripts** and the **best near-miss** I found so far.

---

## 1. Scope and status

This note starts **after** the currently public/reproducible path that leads from Cosmic Duality to the final **68-byte** value.

I am **not** re-documenting the whole puzzle path here. I assume the reader is already familiar with the public state that yields the 68-byte final output.

This note is specifically about:

- an alternative parsing of those 68 bytes,
- a byte-wise cubic interpolation model over **GF(256)**,
- XOR-triangle constructions from the resulting derived points,
- exhaustive-ish scans over levels / serializations,
- the current best near-miss against the final target address.

Important: this is **not** a claim that the puzzle is solved.

---

## 2. Alternative interpretation of the final 68 bytes

The standard interpretation that I kept seeing was basically:

- first 32 bytes = Half
- next 32 bytes = Better Half
- last 4 bytes = trailing marker

I tried a different interpretation that, at least structurally, felt more meaningful:

- first **64 bytes** = **4 blocks of 16 bytes**
- last **4 bytes** = **4 x-coordinates**

So instead of:

```text
32 + 32 + 4
```

I read the output as:

```text
16 + 16 + 16 + 16 + 4
```

Using the 68-byte value, this gives the four 16-byte blocks:

```text
E(fc) = 0423d9115a1dc756d5d08d2de880ab50
E(0c) = 8bd4745fc97709f4fcb513f2cb8fcc35
E(1b) = 48cc46e66bdd36b09ae344552f606a76
E(02) = 1f9d90681f20dfefe2b43db18b623971
```

and the final 4 bytes become the x-values:

```text
fc, 0c, 1b, 02
```

So the model is:

- four known values of an unknown structure,
- each value is 16 bytes,
- each is attached to a single-byte x-coordinate.

This is what suggested trying interpolation.

---

## 3. GF(256) model

### 3.1 Field choice

I used **GF(2^8)** with the AES irreducible polynomial:

```text
x^8 + x^4 + x^3 + x + 1   => 0x11b
```

This is not the only possible GF(256) representation, so this is a real caveat:

> if the creator used a different irreducible polynomial / basis, the resulting interpolants would differ.

Still, AES polynomial is a natural first choice and gives a clean branch to explore.

### 3.2 Byte-wise cubic interpolation

For each byte position `j = 0..15`, I define a cubic polynomial `p_j(x)` over GF(256) such that:

```text
p_j(fc) = byte_j(E(fc))
p_j(0c) = byte_j(E(0c))
p_j(1b) = byte_j(E(1b))
p_j(02) = byte_j(E(02))
```

Then define the 16-byte evaluation:

```text
E(x) = p_0(x) || p_1(x) || ... || p_15(x)
```

This gives a family of 16-byte blocks parameterized by one-byte x-values.

---

## 4. Derived special points

The cleanest additional evaluations I got were:

```text
E(00) = 5b53b1be263aacaa4f70e3b7b3a4a2e9
E(04) = 15b331f311c05c4b2895f9f9d47474d8
E(0f) = 613056fbcd1510dde6de488994081aa3
```

So the natural 7-point set becomes:

```text
fc, 00, 02, 04, 0c, 0f, 1b
```

with corresponding values:

```text
E(fc) = 0423d9115a1dc756d5d08d2de880ab50
E(00) = 5b53b1be263aacaa4f70e3b7b3a4a2e9
E(02) = 1f9d90681f20dfefe2b43db18b623971
E(04) = 15b331f311c05c4b2895f9f9d47474d8
E(0c) = 8bd4745fc97709f4fcb513f2cb8fcc35
E(0f) = 613056fbcd1510dde6de488994081aa3
E(1b) = 48cc46e66bdd36b09ae344552f606a76
```

At that point I stopped thinking in terms of just “Half / Better Half”, and started treating this as a 7-node object.

---

## 5. XOR triangle construction

Given an ordered list of 7 blocks:

```text
v0, v1, v2, v3, v4, v5, v6
```

I build the XOR triangle row-by-row:

- row 0 = original 7 blocks
- row 1 = pairwise xor of adjacent blocks
- row 2 = xor of adjacent row-1 blocks
- ...
- row 6 = single block at the apex

Formally:

```text
row_{k+1}[i] = row_k[i] xor row_k[i+1]
```

for all valid `i`.

This gives 7 rows total:

- `level_0`: 7 blocks
- `level_1`: 6 blocks
- `level_2`: 5 blocks
- `level_3`: 4 blocks
- `level_4`: 3 blocks
- `level_5`: 2 blocks
- `level_6`: 1 block

Because the field characteristic is 2, every node is effectively a subset-xor of the original leaves.

---

## 6. What I tested

I tested several families of candidates, always comparing against the final target P2PKH address.

For each 32-byte candidate key `k`, I checked:

- compressed pubkey -> P2PKH hash160
- uncompressed pubkey -> P2PKH hash160

### 6.1 Two 16-byte evaluations concatenated

I tested ordered pairs:

```text
E(a) || E(b)
```

over large sets of points derived from the interpolation model.

No exact match.

### 6.2 XOR / subset-xor families

I tested:

- triangle nodes,
- subset-xor candidates,
- pairwise concatenations of such nodes,
- hashed variants.

No exact match.

### 6.3 Level scans over all triangle permutations

I tested **all 2520 unique permutations modulo reversal** of the 7 special points.

For each permutation:

- build the XOR triangle,
- take every level `level_0 ... level_6`,
- test `sha256(level_bytes)` as private key,
- test `double_sha256(level_bytes)` as private key,
- verify both compressed and uncompressed.

Still no exact match.

---

## 7. Current best near-miss

The strongest signal I found is:

- **order**:

  ```text
  00, 0f, 0c, fc, 02, 04, 1b
  ```
- **row**:

  ```text
  level_3
  ```
- **transform**:

  ```text
  double_sha256(level_3_bytes)
  ```
- **best format**:

  ```text
  uncompressed
  ```

This yields:

```text
private key candidate:
8969503d47ab2edab7433c8a32771d1880c6b65898cc178d1cd76b6ea9e4238c
```

Resulting uncompressed hash160:

```text
a955a042e800556fdeea1eb9cc0b80a196cf76a5
```

Target hash160:

```text
a9553269572a317e39f0f518cb87c1a0ee1dbae4
```

So the common prefix is:

```text
a955
```

I know that 4 matching hex digits are **not evidence of correctness** by themselves. But in my scans this did not show up as uniform random noise across the whole search space. It emerged as the strongest signal inside the level/triangle family.

---

## 8. Structure of the hot case

For the order:

```text
00, 0f, 0c, fc, 02, 04, 1b
```

the `level_3` row consists of these 4 blocks:

```text
b0 = b5944a0b784572d580cb35e104a3df2f
b1 = f15a6bdd415f01902d0febe73c6544b7
b2 = 85d90cd59d8a4d06e3445a977c192acc
b3 = 46c13e6c3f20724285120d3098f68c8f
```

The raw `level_3` byte stream is:

```text
b0 || b1 || b2 || b3
```

and:

```text
double_sha256(b0 || b1 || b2 || b3)
```

is exactly the private key candidate above.

---

## 9. What I tried around the hot case

I did not stop at the single near-miss. Around this exact hot row, I also tested:

- all 24 permutations of the 4 blocks,
- byte reversal per block,
- total reversal,
- pairwise 32-byte concatenations,
- small XOR foldings,
- combinations with neighboring levels (`level_2`, `level_4`),
- combinations with borders.

None of those gave an exact match.
None improved the `a955...` near-miss.

This is why I currently think that if this branch is meaningful at all, the final step is probably **not** something trivial like:

- “pick any two 16-byte pieces”,
- “swap two blocks in the middle row”,
- “reverse bytes and hash again”.

It feels more like a **global serialization problem** on the triangle, or some final structural mapping that is not one of the obvious local tweaks.

---

## 10. Reproducible scripts

The repo now contains real scripts instead of pasted snippets:

- `scripts/gf256_interp.py`: GF(256) interpolation and point generation.
- `scripts/xor_triangle.py`: XOR triangle utilities.
- `scripts/btc_check.py`: secp256k1 key and hash160 checks.
- `scripts/scan_levels.py`: exhaustive scan over all unique triangle permutations modulo reversal.
- `scripts/reproduce_hot_case.py`: direct reconstruction of the strongest near-miss.

Typical usage:

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python3 scripts/gf256_interp.py
python3 scripts/reproduce_hot_case.py
python3 scripts/scan_levels.py
```

Expected interesting outputs include:

```text
E(00) = 5b53b1be263aacaa4f70e3b7b3a4a2e9
E(04) = 15b331f311c05c4b2895f9f9d47474d8
E(0f) = 613056fbcd1510dde6de488994081aa3
candidate priv = 8969503d47ab2edab7433c8a32771d1880c6b65898cc178d1cd76b6ea9e4238c
uncompressed_h160 = a955a042e800556fdeea1eb9cc0b80a196cf76a5
```

---

## 11. Interpretation

At the moment, my personal takeaway is:

- the `4 x 16 + 4 x-values` interpretation is worth considering,
- GF(256) interpolation gives a clean 7-point structure,
- triangle-based scans do **not** solve the puzzle directly,
- but they do produce one stronger-than-average signal,
- and that signal is tied to a **specific order** and the **middle row** of the triangle.

If this branch is nonsense, then at least the scripts above make it easier to reject it cleanly.

If this branch is meaningful, then I suspect the final step is probably something like:

- a constrained global serialization,
- a final mapping from the hot row / hot order,
- or another structure-preserving transformation that is not one of the obvious local tweaks.

---

## 12. Final note

I’m posting this because I think it is better to share a reproducible dead-end / partial branch than to keep it private. Maybe someone else sees immediately why this model is wrong, or maybe someone notices a missing final step.

Thanks.
— Mattia
