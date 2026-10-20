> **ВНИМАНИЕ (18.10.2026, Qoder): модель ниже неверна по фазе и недействительна как доказательство негатива.**
> Решётка 3-px ячеек начинается с **x = 112**, а не с x = 92 (область 92..111 — служебная
> шкала: вертикальный пунктир на x=91 и «ромб» ±385 = 3·128). Все ~20 000 «прямых упаковок»
> брались со сдвигом 20 px на косых участках. Исправленная съёмка:
> `tools/zden_halv_measure_2026-10-18.py` → `data/halv_wave_model_2026-10-18.json`;
> четыре оси на правильной решётке (256 кандидатов) — в `data/GRAMMAR.md` и `LOG.md` за 18.10.

# Zden HALV - signal analysis findings

Date: 2026-10-17

## Extracted signals
- Row y=475 at x=92+3k (256 nodes): vals.bin (raw) / levels.bin (//64). Binary threshold 127 gives 256 bits with 128 runs (64 high pulses of lengths 1-7, 64 gaps).
- Amplitude at nodes (top-to-center distance) saved as amp_levels.bin (2 bits x 256, derived as round(amp/unit) per band).
- Run lengths: 128 values in range 1-7.

## Experiments run (no match to 1crypto24HCr178iMcKd5iUi5D4rsg1nK)
1. Direct bit packing over y 460-490, x start 84-99, step 2/3/4, thresholds, polarity, msb/lsb byte order (19840 candidates).
2. Run-length multi-bit encodings (2 bits/run, 3 bits/run, polarity interleave), mixed bases, paired runs, transition positions (36+23 candidates).
3. Hash-based keys (SHA256/512, MD5, RIPEMD160, SHA1, double-SHA256) over packed bits, run lengths, transitions, PNG bytes, row data (58 candidates).
4. Amplitude-level bit packing with all 4! level->2bit maps, thresholds, first/xor/sum of halves, 1-bit thresholds (148 candidates).
5. De-interleaving (column-major, strided), Gray-code decode, single-bit flips (384 candidates).
6. Sliding windows over 3-bit run lengths and 2-bit amplitude levels (324 candidates).
7. Byte/bit rotations, complement, index XOR (323 candidates).

Total candidates tested with coincurve (compressed+uncompressed): ~20k+. No exact or vanity (1crypto*) match.

## Saved files
- vals.bin, levels.bin, amp_levels.bin
- explore1.py .. explore8.py (reproducible experiments)
- found.txt (absent = no match)

## Conclusion
No candidate key matched the target address under tested encodings. The 256-bit row signal's information capacity (~118 bits) suggests the key is derived via a nontrivial transform (likely LVL5-style arithmetic on measurements) not yet identified. Recommend next: analyze solver images from prior Zden levels to infer the measurement->byte formula, and test hint publication.