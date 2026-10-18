<div align="center">

<img src="assets/svg/hero_banner.svg" width="100%" alt="Arweave Puzzle 11 Hero Banner" />

<br/>
<br/>

[![Ethereum Bounty](https://img.shields.io/badge/ETH_Bounty-1.0_ETH_(Unspent)-627EEA?style=flat-square&logo=ethereum&logoColor=white)](https://etherscan.io/address/0xFF2142E98E09b5344994F9bEB9C56C95506B9F17)
[![Target Wallet](https://img.shields.io/badge/Target_Address-0xFF2142...9F17-1098AD?style=flat-square&logo=ethereum&logoColor=white)](https://etherscan.io/address/0xFF2142E98E09b5344994F9bEB9C56C95506B9F17)
[![Arweave Permaweb](https://img.shields.io/badge/Arweave_Tx-CzITHnE...P2fY-222326?style=flat-square&logo=arweave&logoColor=white)](https://viewblock.io/arweave/tx/CzITHnEIlkQw9SbaX5futCzFrKk1qe_NwvWnIBmP2fY)
[![Python Engine](https://img.shields.io/badge/Python-3.10%2B-3776AB?style=flat-square&logo=python&logoColor=white)](https://www.python.org/)
[![Swift Engine](https://img.shields.io/badge/Swift-6.0-F05138?style=flat-square&logo=swift&logoColor=white)](https://swift.org/)
[![Metal GPU](https://img.shields.io/badge/Apple_Metal-M1%2FM2%2FM3-555555?style=flat-square&logo=apple&logoColor=white)](https://developer.apple.com/metal/)
[![Continuous Integration](https://img.shields.io/badge/CI-Passing-2ea44f?style=flat-square&logo=githubactions&logoColor=white)](https://github.com/consigcody94/ARweave-Puzzle-11/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](LICENSE)

<br/>
<br/>

<img src="assets/puzzle_11_original.png" width="900px" alt="Arweave Puzzle 11 Master Sketch" style="border-radius: 8px; border: 1px solid #1E293B;" />

<br/>
<em>"Like I specified, the private key is hidden in the image. One way to try is MEW: Access by Private Key good luck!" — Tiamat</em>
</div>

---

## Table of Contents

- [Challenge Specification & Prize Status](#challenge-specification--prize-status)
- [Official Cryptographic Artifacts](#official-cryptographic-artifacts)
- [Cryptanalytic Pipeline Architecture](#cryptanalytic-pipeline-architecture)
- [Key Forensic Discoveries](#key-forensic-discoveries)
  - [1. Steganographic Exclusion Audit (zsteg -a)](#1-steganographic-exclusion-audit-zsteg--a)
  - [2. The 434 Alpha Anomalies & Digital Cutout Proof](#2-the-434-alpha-anomalies--digital-cutout-proof)
  - [3. Naval Slipway Shading Permutation Cipher](#3-naval-slipway-shading-permutation-cipher)
  - [4. Skyline Rectangle Height Cipher & Mast Pointers](#4-skyline-rectangle-height-cipher--mast-pointers)
  - [5. Rooftop Letterform Anagrams](#5-rooftop-letterform-anagrams)
  - [6. Monet's 1856 "Alphabet Graphique" & "The Grand Quai"](#6-monets-1856-alphabet-graphique--the-grand-quai)
  - [7. Temporal Metadata Delta](#7-temporal-metadata-delta)
- [The MEW Linguistic Triad & Pokemon Mythos](#the-mew-linguistic-triad--pokemon-mythos)
- [Computer Vision: The 76 Candidate Character Contours](#computer-vision-the-76-candidate-character-contours)
- [Maritime & Cultural Ciphers: Tabarly & Enuma Elish](#maritime--cultural-ciphers-tabarly--enuma-elish)
- [Academic Coverless Steganography & 3D Mesh Models](#academic-coverless-steganography--3d-mesh-models)
- [Key Derivation Protocols & Mathematical Envelopes](#key-derivation-protocols--mathematical-envelopes)
- [High-Performance Solver Suite](#high-performance-solver-suite)
- [Quickstart & Verification Guide](#quickstart--verification-guide)
- [Repository File System](#repository-file-system)
- [License & On-Chain Disclaimer](#license--on-chain-disclaimer)

---

## Challenge Specification & Prize Status

**Arweave Puzzle #11** is an unsolved on-chain cryptographic puzzle authored by puzzle architect **Tiamat** on March 30, 2020. Uploaded permanently to the Arweave Permaweb, the puzzle holds a **1.0 ETH bounty** locked inside an unspent Ethereum wallet.

The challenge consists of a high-resolution monochrome ink sketch depicting a harbor slipway with six beached vessels, a solitary sloop on the water, twelve background skyline rectangles, and seagulls under a shaded sky.

> [!IMPORTANT]
> **On-Chain Prize Telemetry**: The target address [`0xFF2142E98E09b5344994F9bEB9C56C95506B9F17`](https://etherscan.io/address/0xFF2142E98E09b5344994F9bEB9C56C95506B9F17) holds exactly **1.0000 ETH** with a transaction count of $0$ (Nonce $0$), verifying the bounty remains unclaimed.

---

## Official Cryptographic Artifacts

| Parameter | Specification / On-Chain Record |
| :--- | :--- |
| **Arweave Transaction ID** | [`CzITHnEIlkQw9SbaX5futCzFrKk1qe_NwvWnIBmP2fY`](https://viewblock.io/arweave/tx/CzITHnEIlkQw9SbaX5futCzFrKk1qe_NwvWnIBmP2fY) |
| **Target Ethereum Address** | `0xFF2142E98E09b5344994F9bEB9C56C95506B9F17` |
| **Bounty Locked** | **1.0 ETH** ($10^{18}$ Wei) |
| **Raster Resolution** | $1600 \times 1105\text{ pixels}$ ($1,768,000\text{ pixels}$) |
| **Pixel Encoding** | 8-bit Grayscale + Alpha (`LA` Mode), $704\text{ KB}$ Portable Network Graphics |
| **Embedded PNG Metadata** | `0xFF2142E98E09b5344994F9bEB9C56C95506B9F17` (in `tEXT` chunk) |
| **Raster Timestamps** | Create: `2020-03-30T11:38:07+03:00` \| Modify: `2020-03-30T11:34:44+03:00` |
| **Author / Signer** | **Tiamat** (Creator of Arweave Puzzle Series #1 through #14) |

### Clues Provided by Creator (Tiamat)

1. *"0xFF2142E98E09b5344994F9bEB9C56C95506B9F17 it is also included somewhere in the image"*
2. *"format does not matter"*
3. *"I understand some of you get a bit frustrated when you can't solve a puzzle. Maybe take it as a chance to learn alternative forms of storing a private key. I.e. how will an attacker know what's with a weird image in your email account? #cryptocurrency #privatekey #wallet"*
4. *"Like I specified, the private key is hidden in the image. One way to try is MEW: Access by Private Key good luck!"*

---

## Cryptanalytic Pipeline Architecture

<div align="center">
<img src="assets/svg/architecture_pipeline.svg" width="100%" alt="Cryptanalytic Pipeline Architecture Diagram" />
</div>

---

## Key Forensic Discoveries

### 1. Steganographic Exclusion Audit (zsteg -a)
Executing an exhaustive `zsteg -a` scan across all 8 bit depths, color representations (R, G, B, A, RGB, BGR, RGBA, ABGR), scanline trajectories (`xy`, `yx`, `XY`, `YX`, `Xy`, `yX`), and prime pixel samplings:
* **Result**: Confirmed **zero** hidden file systems, archives (ZIP, 7z, GZIP, RAR), or injected bitstream payloads.
* **Significance**: Conclusively proves Tiamat's statement: *"format does not matter"*. The secret key is not stored in binary file injection, but within the **human visual semantics and geometry of the drawing**.

### 2. The 434 Alpha Anomalies & Digital Cutout Proof
Across all $1,768,000\text{ pixels}$:
* **$1,767,566\text{ pixels}$ ($99.98\%$)** have $\text{Alpha} = 255$ (opaque).
* Exactly **$434\text{ pixels}$ ($0.02\%$)** have $\text{Alpha} < 255$ ($\text{values } 225 \dots 254$).
* **Location**: All 434 pixels reside within the bounding box $X \in [0 \dots 551]\text{ px}, Y \in [378 \dots 1102]\text{ px}$—the precise contour of **Boat 1 (The Biggest Boat)**.
* **Forensic Meaning**: Anti-aliased feathering left by a lasso or wand selection in raster editing software (Photoshop/GIMP). Confirms Boat 1 was digitally cut out and composited into the sketch as the central hero subject.

<div align="center">
<img src="assets/alpha_anomaly_map.png" width="650px" alt="Dilated Alpha Anomaly Distribution" style="border-radius: 6px; border: 1px solid #334155;" />
<br/>
<em>Spatial distribution of the 434 alpha anomalies along the hull and rigging of Boat 1.</em>
</div>

### 3. Naval Slipway Shading Permutation Cipher

<div align="center">
<img src="assets/svg/naval_permutation.svg" width="100%" alt="Naval Shading Permutation Diagram" />
</div>

Evaluating the exact pixel darkness/shading density of the 6 beached boats on the slipway:
$$\text{Measured Densities: } [42.5\%,\ 52.6\%,\ 16.7\%,\ 9.2\%,\ 5.6\%,\ 24.4\%]$$

Ranking them from lowest density ($1$) to highest density ($6$):
* **Boat 5** ($5.6\%$): Rank **1**
* **Boat 4** ($9.2\%$): Rank **2**
* **Boat 3** ($16.7\%$): Rank **3**
* **Boat 6** ($24.4\%$): Rank **4**
* **Boat 1** ($42.5\%$): Rank **5**
* **Boat 2** ($52.6\%$): Rank **6**

Reading the boats from left to right yields the exact **permutation sequence**:
$$\mathbf{\Pi = [5,\ 6,\ 3,\ 2,\ 1,\ 4]}$$

### 4. Skyline Rectangle Height Cipher & Mast Pointers

<div align="center">
<img src="assets/svg/skyline_cipher.svg" width="100%" alt="Skyline Rectangle Cipher Diagram" />
</div>

Historical analysis from `r/CryptoPuzzlers` community threads established:
* **Rectangle Heights as Hexadecimal Digits (Multiples of 0.5)**:
  * $h = 1.0 \to \mathbf{A}$, $h = 1.5 \to \mathbf{B}$, $h = 2.0 \to \mathbf{C}$, $h = 3.0 \to \mathbf{D}$, $h = 3.5 \to \mathbf{E}$, $h = 4.5 \to \mathbf{F}$
* **Cross-Hatching Casing Rule**:
  * Horizontal Hatching (—) $\implies$ **lowercase** (`a`..`f`)
  * Vertical Hatching (|) $\implies$ **UPPERCASE** (`A`..`F`)
* **Ship Masts as Directional Pointers**:
  * The 6 moored boat masts point upward directly into Buildings 1, 3, 4, 5, 7, and the Hero Sailboat points to Building 11.

### 5. Rooftop Letterform Anagrams
Twelve distinct vertex letters are formed by the peaks of the background buildings:
$$\mathbf{T\ E\ L\ F\ I\ T\ L\ E\ I\ T\ F\ L}$$

* **Direct Anagrams**: `"THE LITTLE FLEET"`, `"A LITTLE FLEET"`, `"LITTLE FLEET"`, `"LITTLE BOATS"`.
* **Transposed by $\Pi = [5, 6, 3, 2, 1, 4]$**:
  * First Half ($\text{T E L F I T}$) $\xrightarrow{\Pi}$ $\mathbf{\text{I T L E T F}}$
  * Second Half ($\text{L E I T F L}$) $\xrightarrow{\Pi}$ $\mathbf{\text{F L I E L T}}$
  * Resulting Anagrams: `"IT LET FLIGHT"`, `"IN THE LIGHT"`.

### 6. Monet's 1856 "Alphabet Graphique" & "The Grand Quai"
Art historical investigation into Claude Monet's youth in Le Havre indicates:
* **The 1856 Sketchbooks**: Monet filled sketchbooks in 1856 (held at the Musée d'Art Moderne André Malraux - MuMa in Le Havre) documenting boats and quays. Art historians formally describe these sketchbooks as his **"alphabet graphique"**.
* **The 1874 Harbor Series**: Monet created ***The Grand Quai at Le Havre* (1874)**, directly linking the phonetic homophone **/kiː/** (*Quai* $\leftrightarrow$ *Key*) to his Le Havre harbor works (*"Access by Private Key"* $\leftrightarrow$ *"Access by Private Quay"*).

### 7. Temporal Metadata Delta
PNG `tEXT` chunk forensics reveal exact timestamps:
* `date:create`: `2020-03-30T11:38:07+03:00`
* `date:modify`: `2020-03-30T11:34:44+03:00`
* **Delta**: Exactly **$203\text{ seconds}$** ($3\text{ minutes } 23\text{ seconds}$).
* **Ethereum Block**: Mainnet Block `#9774620`.

---

## The MEW Linguistic Triad & Pokemon Mythos

<div align="center">
<img src="assets/svg/pokemon_mew_homophone_matrix.svg" width="100%" alt="The MEW Linguistic Triad & Pokemon Mythos Matrix" />
</div>

One of the most distinctive clues given by Tiamat was:
> *"Like I specified, the private key is hidden in the image. One way to try is MEW: Access by Private Key good luck!"*

Our investigation decompiled this statement into a **four-layer cryptanalytic homophone matrix**:

1. **MyEtherWallet (MEW)**:
   * The literal software destination for claiming the 1.0 ETH bounty via raw 64-hex string or 51/52-character Base58 WIF key.
2. **Pokemon Mew (#151 / 0x97) & Mewtwo (#150 / 0x96)**:
   * In *Pokemon: The First Movie - Mewtwo Strikes Back* (1998), the plot turns on the **Old Shore Wharf harbor slipway scene**. A violent storm cancels the ferry to New Island, leaving small boats beached along the slipway docks while trainers attempt to navigate the tempest.
   * In Japanese: Myū (ミュウ) and Myūtsū (ミュウツー).
   * In *Lucario and the Mystery of Mew*, Mew is explicitly identified with the *Wave-Guiding Hero* (nautical / water motif).
   * Implemented in [`solvers/pokemon_and_popculture/test_pokemon_mew_theories.py`](solvers/pokemon_and_popculture/test_pokemon_mew_theories.py) and [`test_pokemon_lore_extended.py`](solvers/pokemon_and_popculture/test_pokemon_lore_extended.py).
3. **Ornithological "Sea-Mew" (Larus canus)**:
   * The common gull (*Larus canus*) is historically termed the **Sea-Mew** due to its characteristic crying call (*"mew"*).
   * Seven distinct gulls are drawn soaring above the harbor slipway in the upper sky quadrant of Puzzle 11.
4. **The French "Quai" /kiː/ ↔ "Key" Homophone**:
   * *Quai* (wharf, harbor pier, slipway) is pronounced identically to *Key* (/kiː/).
   * *"Access by Private Key"* is a direct phonetic homophone for *"Access by Private Quay"*.

---

## Computer Vision: The 76 Candidate Character Contours

Applying multi-scale Canny edge filtering, Contrast Limited Adaptive Histogram Equalization (CLAHE), and morphological black-hat transforms identified **76 distinct contour bounding boxes** representing candidate alphanumeric glyphs:

<div align="center">
<img src="assets/edge_detection/06_detected_character_boxes.png" width="800px" alt="76 Candidate Character Boxes" style="border-radius: 6px; border: 1px solid #334155;" />
<br/>
<em>Spatial distribution of the 76 detected candidate character glyphs across the drawing.</em>
</div>

<br/>

<div align="center">
<img src="assets/edge_detection/07_all_76_character_candidates_montage.png" width="800px" alt="76 Character Candidates Montage" style="border-radius: 6px; border: 1px solid #334155;" />
<br/>
<em>Montage of all 76 candidate character crops extracted by advanced contour hierarchy analysis.</em>
</div>

The extracted contours were clustered into 64 hexadecimal nibble candidates ($32\text{ bytes}$) and permuted against SECP256k1 in [`solvers/academic_and_edge_detection/advanced_edge_and_text_detector.py`](solvers/academic_and_edge_detection/advanced_edge_and_text_detector.py).

---

## Maritime & Cultural Ciphers: Tabarly & Enuma Elish

### 1. Éric Tabarly & The Pen Duick Fleet
* Renowned French naval officer and yachtman **Éric Tabarly** raced a legendary series of six vessels named **Pen Duick** (*Pen Duick I* through *Pen Duick VI*).
* The 6 beached slipway boats in Puzzle 11 correspond structurally to the six Pen Duick naval designs.
* Evaluated in [`solvers/nautical_and_literature/test_tabarly_penduick.py`](solvers/nautical_and_literature/test_tabarly_penduick.py).

### 2. Sumerian & Babylonian Mythos (The Name "Tiamat")
* The creator moniker **Tiamat** derives from the Babylonian creation epic *Enūma Eliš*, where Tiamat represents the primordial goddess of the saltwater sea who gives birth to the universe.
* In the myth, Tiamat confers the **Tablets of Destinies** upon Kingu, her general.
* Evaluated against cuneiform transcriptions, Sumerian deity names (*Abzu*, *Kingu*, *Mummu*), and Babylonian tablets in [`solvers/nautical_and_literature/test_sumerian_tiamat.py`](solvers/nautical_and_literature/test_sumerian_tiamat.py) and [`test_cuneiform_enuma_elish.py`](solvers/nautical_and_literature/test_cuneiform_enuma_elish.py).

---

## Academic Coverless Steganography & 3D Mesh Models

<div align="center">
<img src="assets/svg/mesh_facet_steganography.svg" width="100%" alt="3D Polygonal Mesh Steganography Blueprint" />
</div>

Investigating academic literature from arXiv and the **Natural Science Foundation of China**:
* **Coverless Information Hiding**: Mapping visual objects (boats, buildings, birds) directly to dictionary indices without modifying pixel bits.
* **3D Triangular Polygonal Mesh Steganography**: Embedding secret bits by displacing vertices $v_i \to v'_i$ across an extension domain $\Delta h$ (manifested in Puzzle 11's triangular sail facets and building heights).
* Evaluated in [`solvers/academic_and_edge_detection/test_academic_coverless_and_pvd_models.py`](solvers/academic_and_edge_detection/test_academic_coverless_and_pvd_models.py) and [`test_bpcs_complexity.py`](solvers/test_bpcs_complexity.py).

---

## Key Derivation Protocols & Mathematical Envelopes

Every candidate token sequence $s$ is evaluated across five independent cryptographic pipelines against the SECP256k1 curve:

```
[ CRYPTOGRAPHIC DERIVATION PIPELINE ]
1. Direct 64-Hex Scalar:
   privkey = bytes.fromhex(s)
   Q = privkey · G  ==>  Keccak256(Q_xy)[12..31] == 0xFF2142E9...B9F17

2. Standard Cryptographic Digests:
   privkey = SHA-256(s.encode('utf-8'))
   privkey = Keccak-256(s.encode('utf-8'))
   privkey = SHA-512(s.encode('utf-8'))[0..31] / [32..63]

3. Base58 Wallet Import Format (WIF):
   Uncompressed 51-char (Prefix '5', 37 raw bytes): Checksum = SHA256(SHA256(payload))[0..3]
   Compressed 52-char (Prefix 'K'/'L', 38 raw bytes): Payload = [0x80 || privkey || 0x01]

4. Tiamat 11,513-Round Iterated SHA-512 KDF (Puzzle #7 Standard):
   h_0 = SHA-512(s)
   h_{i+1} = SHA-512(h_i) for i = 0 .. 11511
   privkey = h_{11512}[0..31]  (Raw)  OR  bytes.fromhex(h_{11512}.hex()[:64])  (Hex)
```

---

## High-Performance Solver Suite

The solvers are structured across specialized functional modules:

| Subdirectory / Solver | Methodology | Target Hypothesis |
| :--- | :--- | :--- |
| **`solvers/autonomous_master_solver.py`** | Cartesian Permutation Engine | Multi-vector synthesis combining art, metadata, and ciphers |
| **`solvers/metal_continuous_explorer.swift`** | Apple Metal GPU Shader | High-throughput SECP256k1 evaluation (>12,000 cand/s) |
| **`solvers/pokemon_and_popculture/`** | Pop-Culture & Wordplay | Pokemon Mew (#151), Old Shore Wharf, Sea-Mew, Quai/Key homophones |
| **`solvers/nautical_and_literature/`** | Maritime & Mythology | Tabarly's 6 Pen Duick vessels, Babylonian Enuma Elish, Sumerian mythos |
| **`solvers/academic_and_edge_detection/`** | Computer Vision & CV | 76 Canny contour boxes, Chinese NSF 3D mesh models, Coverless steganography |
| **`solvers/bip39_and_ciphers/`** | Mnemonic Seeds & Ciphers | BIP-39 visual token wordlists, Hanayama puzzle levels, music theory |
| **`solvers/test_bpcs_complexity.py`** | BPCS Border Complexity | 8-plane bit complexity audit confirming natural human rendering |

---

## Quickstart & Verification Guide

### Setup

```bash
# Clone the repository
git clone https://github.com/consigcody94/ARweave-Puzzle-11.git
cd ARweave-Puzzle-11

# Install Python dependencies
pip install cryptography pillow numpy
```

### Running Cryptographic Unit Tests

```bash
# Run unit tests validating SECP256k1 derivation, Keccak-256, and WIF checksums
python3 -m unittest discover -s tests -p "test_*.py"
```

### Executing Specialized Solvers

```bash
# Run Pokemon & MEW Homophone Solver
python3 solvers/pokemon_and_popculture/test_pokemon_mew_theories.py

# Run 76 Contour Edge Detector
python3 solvers/academic_and_edge_detection/advanced_edge_and_text_detector.py

# Run Pen Duick Maritime Solver
python3 solvers/nautical_and_literature/test_tabarly_penduick.py

# Run Apple Silicon Metal GPU Engine
swiftc -O -parse-as-library solvers/metal_continuous_explorer.swift -o metal_solver
./metal_solver
```

---

## Repository File System

```
ARweave-Puzzle-11/
├── .github/
│   └── workflows/
│       └── ci.yml                     # Automated GitHub Actions test pipeline
├── assets/
│   ├── puzzle_11_original.png         # Master 1600x1105 puzzle PNG (Tx CzITHnE...)
│   ├── alpha_anomaly_map.png          # Dilated map of the 434 alpha anomalies
│   ├── crops/                         # 76 isolated crops of boats and buildings
│   ├── edge_detection/                # Computer vision edge & contour character maps
│   │   ├── 01_clahe_enhanced.png      # CLAHE contrast enhancement
│   │   ├── 05_fft_magnitude_spectrum.png # Fast Fourier Transform spectrum
│   │   ├── 06_detected_character_boxes.png # 76 detected candidate character boxes
│   │   └── 07_all_76_character_candidates_montage.png # 76 character crops montage
│   ├── svg/                           # Publication-grade vector schematics
│   │   ├── architecture_pipeline.svg  # 5-stage cryptanalytic pipeline diagram
│   │   ├── hero_banner.svg            # Header banner with cryptographic motifs
│   │   ├── mesh_facet_steganography.svg # 3D mesh vertex extension & BPCS blueprint
│   │   ├── naval_permutation.svg      # Naval shading rank transposition diagram
│   │   ├── pokemon_mew_homophone_matrix.svg # Pokemon Mew & linguistic homophone matrix
│   │   └── skyline_cipher.svg         # Skyline rectangle height & mast ray tracer
│   └── zooms/                         # Multi-layer edge detection comparison panels
├── docs/
│   └── CRYPTOGRAPHIC_DOSSIER.md       # 16-Chapter comprehensive research dossier
├── solvers/
│   ├── academic_and_edge_detection/   # Computer vision and arXiv paper models
│   ├── bip39_and_ciphers/             # BIP-39 seeds, Hanayama, and music scales
│   ├── nautical_and_literature/       # Tabarly Pen Duick and Sumerian mythos
│   ├── pokemon_and_popculture/        # Pokemon Mew, Old Shore Wharf, and Sea-Mew
│   ├── autonomous_master_solver.py    # Master Cartesian cross-permutation engine
│   ├── deep_stego_extractor.py        # Comprehensive bit-plane & archive scanner
│   ├── metal_continuous_explorer.swift# High-throughput Apple Metal GPU shader engine
│   ├── search_wif_base58_visual_tokens.py # Base58 51/52-char WIF checksum validator
│   ├── test_boat_rank_permutation.py  # 5-6-3-2-1-4 transposition cipher solver
│   ├── test_bpcs_complexity.py        # BPCS 8x8 border complexity analyzer
│   └── test_hex_rectangle_masts_cipher.py # Reddit rectangle height & mast solver
├── tests/
│   └── test_crypto_primitives.py      # SECP256k1 & Keccak-256 unit tests
├── .gitignore                         # Python, Swift, and OS artifact exclusions
├── LICENSE                            # MIT License
└── README.md                          # Master showpiece documentation
```

---

## License & On-Chain Disclaimer

- **Code License**: This project is open-source under the [MIT License](LICENSE).
- **Puzzle Rights**: The original puzzle sketch was published publicly on Arweave by creator **Tiamat** under transaction `CzITHnEIlkQw9SbaX5futCzFrKk1qe_NwvWnIBmP2fY` as an open cryptographic challenge.
- **Bounty Disclaimer**: The 1.0 ETH prize resides entirely on the public Ethereum Mainnet. Derivation of the private key enables direct on-chain claiming via MEW or standard Web3 wallet software.

<br/>

<div align="center">
<sub>Engineered with mathematical rigor, forensic precision, and high-performance computing by <strong>consigcody94</strong>.</sub>
</div>
