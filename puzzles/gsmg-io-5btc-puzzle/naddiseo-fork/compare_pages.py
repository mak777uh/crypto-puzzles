#!/usr/bin/env python3
"""Diff textarea content: 2023-06-01 page (hash89727) vs 2026-09-24 live snapshot.
Also test 89727c59... URL hash against sha256 of known artifacts.
"""
import re, base64, hashlib, os, difflib

HERE = os.path.dirname(os.path.abspath(__file__))

def textareas(path):
    html = open(path, encoding='utf-8', errors='replace').read()
    return re.findall(r'<textarea[^>]*>(.*?)</textarea>', html, re.S | re.I)

taA = textareas(os.path.join(HERE, 'wayback_20260924.html'))      # 2026-09-24
taB = textareas(os.path.join(HERE, 'wb_pages', 'hash89727.html')) # 2023-06-01
assert len(taA) == 2 and len(taB) == 2

for name, ta in (('2026-09 live', taA), ('2023-06 page', taB)):
    print(f'{name}: ta1={len(ta[0])}B ta2={len(ta[1])}B')

# --- textarea2 (Cosmic blob): whitespace-strip compare ---
b2a = re.sub(r'\s+', '', taA[1]); b2b = re.sub(r'\s+', '', taB[1])
print('ta2 identical:', b2a == b2b, '| len', len(b2a), len(b2b))
if b2a != b2b:
    sm = difflib.SequenceMatcher(None, b2a, b2b)
    for op, i1, i2, j1, j2 in sm.get_opcodes():
        if op != 'equal':
            print(f'  ta2 {op}: A[{i1}:{i2}]={b2a[i1:i2]!r} B[{j1}:{j2}]={b2b[j1:j2]!r}')

# --- textarea1: token-level diff ---
tokA = taA[0].split(); tokB = taB[0].split()
print(f'ta1 tokens: A={len(tokA)} B={len(tokB)}')
if tokA != tokB:
    sm = difflib.SequenceMatcher(None, tokA, tokB, autojunk=False)
    n = 0
    for op, i1, i2, j1, j2 in sm.get_opcodes():
        if op != 'equal':
            n += 1
            ctx = ' '.join(tokA[max(0,i1-6):i1])
            print(f'  [{op}] A[{i1}:{i2}]={tokA[i1:i2]} B[{j1}:{j2}]={tokB[j1:j2]}  ...ctx: {ctx} ...')
            if n > 40: print('  (more...)'); break
    if n == 0: print('  (no token diffs?! lengths differ?)')
else:
    print('ta1 tokens IDENTICAL')

# --- reconstruct b64 regions ---
def find_seq(toks, seq):
    n = len(seq)
    idxs = [i for i in range(len(toks)-n+1) if toks[i:i+n] == seq]
    return idxs

def b64region(toks):
    cmd = find_seq(toks, ['c','o','m','m','a','n','d'])
    i0 = cmd[-1] + 1   # last 'command' occurrence
    tail = find_seq(toks, ['s','h','a','b','e','f','a','n','s','t','o','o'])
    i1 = tail[-1]
    return toks[i0:i1], i0, i1

regA, _, _ = b64region(tokA)
regB, _, _ = b64region(tokB)
sA = ''.join(regA); sB = ''.join(regB)
print(f'\nb64 region: A={len(sA)} chars, B={len(sB)} chars')
if sA != sB:
    sm = difflib.SequenceMatcher(None, sA, sB)
    for op, i1, i2, j1, j2 in sm.get_opcodes():
        if op != 'equal':
            print(f'  region {op}: A[{i1}:{i2}]={sA[i1:i2]!r} B[{j1}:{j2}]={sB[j1:j2]!r}')

# known working string (from derive_chains.py)
WORK = ('U2FsdGVkX186tYU0hVJBXXUnBUO7C0+X4KUWnWkCvoZSxbRD3wNsGWVHefvdrd9z'
        'QvX0t8v3jPB4okpspxebRi6sE1BMl5HI8Rku+KejUqTvdWOX6nQjSpepXwGuN/jJ')
# strip the 40-char ab-run from each region and compare to WORK
def strip_abrun(s):
    # find longest run of only a/b chars
    m = max(re.finditer(r'[ab]+', s), key=lambda x: x.end()-x.start())
    return s[:m.start()] + s[m.end():], m.group(0), m.start()
for nm, s in (('A(2026)', sA), ('B(2023)', sB)):
    t, run, pos = strip_abrun(s)
    print(f'{nm}: ab-run len={len(run)} at pos {pos}; stripped len={len(t)}; == WORK: {t == WORK}')
    if t != WORK:
        sm = difflib.SequenceMatcher(None, WORK, t)
        for op, i1, i2, j1, j2 in sm.get_opcodes():
            if op != 'equal':
                print(f'    vs WORK {op}: WORK[{i1}:{i2}]={WORK[i1:i2]!r} got[{j1}:{j2}]={t[j1:j2]!r}')

# --- sha256 of known artifacts vs URL hash 89727c59... ---
TARGET = '89727c598b9cd1cf8873f27cb7057f050645ddb6a7a157a110239ac0152f6a32'
cands = {
    'WORK string ascii': WORK.encode(),
    'SMALL blob bytes': base64.b64decode(WORK),
}
for fn in ('chain1_79.bin','chain2_79.bin','chain3_1327.bin','chain4_1151.bin'):
    p = os.path.join(HERE, fn)
    if os.path.exists(p): cands[fn] = open(p,'rb').read()
cands['ta1 raw A'] = taA[0].encode()
cands['ta1 tokens-joined A'] = ''.join(tokA).encode()
cands['ta2 b64 stripped'] = b2a.encode()
cands['ta2 blob'] = base64.b64decode(b2a)
cands['text SalPhaseIon'] = b'SalPhaseIon'
for k, v in cands.items():
    h = hashlib.sha256(v).hexdigest()
    flag = ' <<< MATCH!' if h == TARGET else ''
    print(f'sha256({k}) = {h[:24]}...{flag}')
print('\ndone')
