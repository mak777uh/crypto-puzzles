# unsek

Cryptographic security research tools ecosystem.

## Architecture

```
                                  CRYPTOGRAPHIC SECURITY RESEARCH
                                              │
        ┌─────────────┬───────────────────────┼───────────────────────┬──────────────────┐
        │             │                       │                       │                  │
   CRYPTOGRAPHY    ECDLP                SIGNATURES                HASHES              DATA
        │             │                       │                       │                  │
   ┌────┴────┐        │                       │                  ┌────┴────┐            │
   │         │        │                       │                  │         │            │
 vuke    seed-???   kangaroo              vusi                shaha      shaha         boha
   ✅        ?         ✅                   ✅                   ✅       #11           ✅
   │                   │                      │                           │
   │                   │                      │                           │
   ▼                   ▼                      ▼                           ▼
┌───────┐         ┌───────┐            ┌──────────┐                 ┌───────────┐
│ weak  │         │Pollard│            │ nonce    │                 │ collision │
│ PRNG  │         │Kangar.│            │ reuse    │                 │ detection │
│ brain │         │ ECDLP │            │ polynonce│                 │ GROUP BY  │
│ wallet│         │ range │            │ biased   │                 │ birthday  │
│milksad│         │ search│            │ LCG/HNP  │                 │           │
└───────┘         └───────┘            └──────────┘                 └───────────┘
```

## Projects

| Project | Repo | Status | Description |
|---------|------|--------|-------------|
| [vuke](https://github.com/oritwoen/vuke) | public | ✅ Active | Vulnerable key generation research |
| [kangaroo](https://github.com/oritwoen/kangaroo) | public | ✅ Active | Pollard's Kangaroo ECDLP solver (GPU) |
| [shaha](https://github.com/oritwoen/shaha) | public | ✅ Active | Hash database builder + reverse lookup |
| [boha](https://github.com/oritwoen/boha) | public | ✅ Active | Crypto puzzles/bounties data library |
| [vgen](https://github.com/oritwoen/vgen) | public | ✅ Active | Vanity address generator (GPU) |
| [vusi](https://github.com/oritwoen/vusi) | public | ✅ Active | ECDSA signature vulnerability analysis |

## Roadmap

### Active

- [ ] **shaha #11** - Collision detection feature

### Backlog

- [ ] **seed-???** - Seed permutation/recovery (scope unclear, parked)
- [ ] **Framework CLI** - Unified interface for all tools

### Completed

- [x] vuke - vulnerable key generation
- [x] kangaroo - ECDLP solver
- [x] shaha - hash lookup
- [x] boha - puzzle data
- [x] vusi - ECDSA signature analysis
- [x] vgen - vanity generator

## Research

### Covered

| Area | Tool | Vectors |
|------|------|---------|
| Key Generation | vuke | brainwallet, PRNG (milksad, mt64, lcg, xorshift), derivation bugs |
| ECDLP | kangaroo | Pollard's Kangaroo, GPU acceleration |
| ECDSA Signatures | vusi | nonce reuse, polynonce, biased nonces, LCG nonces, half-half, lattice/HNP |
| Hash Lookup | shaha | Rainbow tables, 9 algorithms |
| Puzzle Data | boha | 7 collections, 284 puzzles |

### Hash Collisions (shaha #11)

Birthday attack complexity:

| Hash | Output | Collision Resistance | Feasibility |
|------|--------|---------------------|-------------|
| RIPEMD160 | 160-bit | 2^80 | Theoretical (years) |
| SHA256 | 256-bit | 2^128 | Infeasible |
| HASH160 | 160-bit | 2^80 | Theoretical |
| HASH256 | 256-bit | 2^128 | Infeasible |

Academic progress on RIPEMD160:

- 2023: 40-step collision attacks
- 2024: Automated attack improvements
- 2025: 44-step semi-free-start collisions

Full 80-step RIPEMD160 collision: not yet achieved.

### Seed Recovery (seed-???)

BIP39: 12 words = 128 bits entropy + 4 bit checksum, wordlist of 2048 words.

| Known Words | Unknown | Permutations | Total Space |
|-------------|---------|--------------|-------------|
| 12 | 0 | 12! = 479M | 479M |
| 11 | 1 | 12! × 2048 | ~1T |
| 6 | 6 | 12! × 2048^6 | ~10^20 |

Checksum filtering reduces valid combinations by ~16x (for 12 words).

Potential modes:

1. **permute** - 12 known words, wrong order (12! = 479M)
2. **partial** - N known + M candidates
3. **constrained** - Known positions + BIP39 checksum

Blocker: scope unclear — puzzle solving vs user recovery? Parked until concrete use case.

### Integration (Framework CLI)

```bash
# Pipeline: boha → vuke/kangaroo
boha list b1000 --unsolved --format json | \
  jq -r '.[] | .address' > targets.txt

vuke scan --transform sha256 --targets targets.txt wordlist.txt

boha show b1000/135 --format json | \
  jq -r '.pubkey' | \
  kangaroo --bits 135

# Unified CLI concept
unsek scan \
  --tools vuke,kangaroo \
  --targets boha:b1000:unsolved \
  --output results/
```

## Links

- [Peter Todd Hash Bounties](https://bitcointalk.org/index.php?topic=293382.0) - ~0.59 BTC unclaimed
- [Biased Nonce Sense (2019)](https://eprint.iacr.org/2019/023) - Lattice attacks on ECDSA implementations
- [Polynonce Attack (2023)](https://eprint.iacr.org/2023/305) - Kudelski Security
- [LadderLeak (2020)](https://eprint.iacr.org/2020/615) - <1 bit nonce leakage
