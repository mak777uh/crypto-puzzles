#!/usr/bin/env python3
"""Validate: de-interleave of live page reproduces working SMALL_B64 exactly.
Extended sha256 candidates vs 89727c59... URL hash."""
import re, base64, hashlib, os
HERE = os.path.dirname(os.path.abspath(__file__))

html = open(os.path.join(HERE, 'wayback_20260924.html'), encoding='utf-8', errors='replace').read()
tas = re.findall(r'<textarea[^>]*>(.*?)</textarea>', html, re.S | re.I)
toks = tas[0].split()

# region: from token 'U' followed by '2','F','s','d'
def find_seq(toks, seq):
    n = len(seq)
    return [i for i in range(len(toks)-n+1) if toks[i:i+n] == seq]
i0 = find_seq(toks, ['U','2','F','s','d','G','V','k'])[0]
# tail: token 'J' followed by s,h,a,b,e
itail = find_seq(toks, ['J','s','h','a','b','e'])[-1]
region = toks[i0:itail+1]
s = ''.join(region)
print(f'region tokens={len(region)} chars={len(s)} start={"".join(toks[i0-3:i0])} end={s[-6:]}')

WORK = ('U2FsdGVkX186tYU0hVJBXXUnBUO7C0+X4KUWnWkCvoZSxbRD3wNsGWVHefvdrd9z'
        'QvX0t8v3jPB4okpspxebRi6sE1BMl5HI8Rku+KejUqTvdWOX6nQjSpepXwGuN/jJ')
# strip longest a/b-only run
m = max(re.finditer(r'[ab]+', s), key=lambda x: x.end()-x.start())
t = s[:m.start()] + s[m.end():]
print(f'ab-run len={m.end()-m.start()} pos={m.start()}; stripped={len(t)}; == WORK: {t == WORK}')

# extended sha256 candidates vs URL hash
TARGET = '89727c598b9cd1cf8873f27cb7057f050645ddb6a7a157a110239ac0152f6a32'
pw1 = b'matrixsumlistenterlastwordsbeforearchichoicethispasswordmatrixsumlist'
cands = {
 'pw1 ascii': pw1,
 'pw1 sha hex ascii': hashlib.sha256(pw1).hexdigest().encode(),
 'WIF1 ascii': b'5K2byJMssxFKuTgnk9YQjpBz5FhkwwF2LaZoAyTus8HjGEpz8AT',
 'XORKEY hex ascii': b'a795de117e472590e572dc193130c763e3fb555ee5db9d34494e156152e50735',
 'WORK full ascii(no abrun)': WORK.encode(),
 'region raw ascii': s.encode(),
 'cosmic b64 rawA': tas[1].encode(),
}
for fn in ('phase32_plaintext.bin','phase3_plaintext.txt','chain1_79.bin','chain2_79.bin'):
    p = os.path.join(HERE, fn)
    if os.path.exists(p): cands[fn] = open(p,'rb').read()
# unpadded chain1/2 (79B padded blob -> raw 79 = already those); add sha-of-sha variants
cands['sha256(chain1_79) hex'] = hashlib.sha256(open(os.path.join(HERE,'chain1_79.bin'),'rb').read()).hexdigest().encode()
hits = 0
for k, v in cands.items():
    h = hashlib.sha256(v).hexdigest()
    if h == TARGET:
        print(f'*** MATCH: {k}'); hits += 1
print(f'candidates tested: {len(cands)}, matches: {hits}')
print('done')
