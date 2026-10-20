#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""One bounded run: method (a) = greedy increasing partition of the article's
digit stream into 12 word positions (see LOG.md entry 2026-10-19 11:05/11:12).

Also tests the two published position lists applied to the essay body.
No transactions; hit is written to .secret/FOUND.txt only.
"""
import hashlib, hmac, os, re, sys, time, json

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
TEXT = os.path.join(ROOT, 'data', 'github', 'homelessphd', 'python_script', 'text.txt')
WORDS = os.path.join(ROOT, 'data', 'github', 'homelessphd', 'python_script', 'english.txt')

# ---- target hash160 from the escrow address (base58check decode) ----
B58 = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz'
def b58decode(s):
    n = 0
    for c in s:
        n = n * 58 + B58.index(c)
    b = n.to_bytes((n.bit_length() + 7) // 8, 'big')
    return b'\0' * (len(s) - len(s.lstrip('1'))) + b

ADDR = '1K4ezpLybootYF23TM4a8Y4NyP7auysnRo'
raw = b58decode(ADDR)
assert len(raw) == 25 and raw[0] == 0
TARGET_H160 = raw[1:21]

# ---- BIP39 / BIP32 / P2PKH ----
import coincurve
N = 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364141
H = 0x80000000

def h160(pub_bytes):
    return hashlib.new('ripemd160', hashlib.sha256(pub_bytes).digest()).digest()

def b58check(payload):
    chk = hashlib.sha256(hashlib.sha256(payload).digest()).digest()[:4]
    n = int.from_bytes(payload + chk, 'big')
    out = ''
    while n:
        n, r = divmod(n, 58)
        out = B58[r] + out
    return '1' * (len(payload + chk) - len((payload + chk).lstrip(b'\0'))) + out

def p2pkh(pub):
    return b58check(b'\0' + h160(pub))

def _h(c, d):
    I = hmac.new(c, d, hashlib.sha512).digest()
    return int.from_bytes(I[:32], 'big'), I[32:]

def hard(k, c, i):
    t, cc = _h(c, b'\0' + k.to_bytes(32, 'big') + i.to_bytes(4, 'big'))
    return (t + k) % N, cc

def pub(k):
    return coincurve.PrivateKey(k.to_bytes(32, 'big')).public_key

def soft(k, c, P, i):
    t, cc = _h(c, P.format(True) + i.to_bytes(4, 'big'))
    return (t + k) % N, cc

def selftest():
    seed = hashlib.pbkdf2_hmac('sha512', ('abandon ' * 11 + 'about').encode(), b'mnemonic', 2048)
    mk, mc = _h(b'Bitcoin seed', seed)
    k, c = hard(mk, mc, 44 + H); k, c = hard(k, c, H); k, c = hard(k, c, H)
    P = pub(k); k, c = soft(k, c, P, 0); P = pub(k); k, c = soft(k, c, P, 0)
    a = p2pkh(pub(k).format(True))
    assert a == '1LqBGSKuX5yYUonjxT5qGfpUsXKYYWeabA', a
    return a

def derive_all(mnemonic):
    seed = hashlib.pbkdf2_hmac('sha512', mnemonic.encode(), b'mnemonic', 2048)
    mk, mc = _h(b'Bitcoin seed', seed)
    out = []
    k0, c0 = mk, mc
    k, c = hard(k0, c0, 44 + H); k, c = hard(k, c, H); k, c = hard(k, c, H)
    base_k, base_c = k, c
    paths = [(0, range(20)), (1, range(2))]
    for ch, idxs in paths:
        kk, cc = base_k, base_c
        kk, cc = soft(kk, cc, pub(kk), ch)
        for j in idxs:
            k2, c2 = soft(kk, cc, pub(kk), j)
            for comp in (True, False):
                out.append((f"m/44'/0'/0'/{ch}/{j}", p2pkh(pub(k2).format(comp))))
    MP = pub(mk)
    k2, c2 = soft(mk, mc, MP, 0)
    for j in (0, 1):
        k3, _ = soft(k2, c2, pub(k2), j)
        for comp in (True, False):
            out.append((f"m/0/{j}", p2pkh(pub(k3).format(comp))))
    k2, c2 = hard(mk, mc, H)
    k3, c3 = soft(k2, c2, pub(k2), 0)
    k4, _ = soft(k3, c3, pub(k3), 0)
    for comp in (True, False):
        out.append(("m/0'/0/0", p2pkh(pub(k4).format(comp))))
    return out

def bip39_ok(words):
    S = WORDSET
    if len(words) != 12 or any(w not in S for w in words):
        return False
    idx = [WORD_IDX[w] for w in words]
    bits = 0
    for i in idx:
        bits = (bits << 11) | i
    ent = (bits >> 4).to_bytes(16, 'big')
    return (hashlib.sha256(ent).digest()[0] >> 4) == (bits & 15)

# ---- carriers ----
def tokenize_A(s):
    s = s.replace('—', ' ').replace('–', ' ')
    s = re.sub(r"[^\w'’\-]", ' ', s, flags=re.UNICODE)
    return [w for w in s.split() if w]

def tokenize_B(s):
    s = s.replace('—', ' ').replace('–', ' ')
    s = re.sub(r"[^\w'’\-]", ' ', s, flags=re.UNICODE)
    out = []
    for w in s.split():
        out += [x for x in re.split(r'[-]', w) if x]
    return out

text = open(TEXT, encoding='utf-8').read()
body_start = text.index('Photo by Barth Bailey')
body = text[body_start:]

carriers = {}
for name, src in (('full', text), ('body', body)):
    for tname, fn in (('A', tokenize_A), ('B', tokenize_B)):
        toks = fn(src)
        carriers[f'{name}_{tname}'] = toks

# ---- digit streams ----
NUMWORD = {
    'zero':0,'one':1,'two':2,'three':3,'four':4,'five':5,'six':6,'seven':7,'eight':8,'nine':9,
    'ten':10,'eleven':11,'twelve':12,'thirteen':13,'fourteen':14,'fifteen':15,'sixteen':16,
    'seventeen':17,'eighteen':18,'nineteen':19,'twenty':20,'thirty':30,'forty':40,'fifty':50,
    'sixty':60,'seventy':70,'eighty':80,'ninety':90,'hundred':100,'thousand':1000,'million':1000000,
}

def number_words_to_digits(s):
    # combine simple number words (e.g. "four thousand" -> 4000, "thirty five" -> 35)
    pat = re.compile(r'\b((?:' + '|'.join(sorted(NUMWORD, key=len, reverse=True)) + r')(?:[\s-]+(?:' + '|'.join(sorted(NUMWORD, key=len, reverse=True)) + r'))*)\b', re.I)
    def repl(m):
        parts = re.split(r'[\s-]+', m.group(1).lower())
        total, cur = 0, 0
        for p in parts:
            v = NUMWORD.get(p)
            if v is None:
                continue
            if v == 100:
                cur = (cur or 1) * 100
            elif v >= 1000:
                total += (cur or 1) * v
                cur = 0
            else:
                cur += v
        return str(total + cur)
    return pat.sub(repl, s)

streams = {
    'D1': re.sub(r'\D', '', text),
    'D2': re.sub(r'\D', '', number_words_to_digits(text)),
}

# ---- greedy increasing partition ----
def greedy(w):
    nums, i, prev = [], 0, 0
    while i < len(w):
        j = i + 1
        while j <= len(w) and int(w[i:j]) <= prev:
            j += 1
        if j > len(w):
            return None
        v = int(w[i:j])
        nums.append(v)
        prev = v
        i = j
        if len(nums) > 12:
            return None
    return nums

def words_at(toks, pos, base):
    out = []
    for p in pos:
        i = p - 1 if base == 1 else p
        if i < 0 or i >= len(toks):
            return None
        out.append(toks[i].lower().strip("'’\""))
    return out

def main():
    t0 = time.time()
    st = selftest()
    print('selftest OK ->', st)
    global WORDSET, WORD_IDX
    WORDSET = set(l.strip() for l in open(WORDS, encoding='utf-8'))
    WORD_IDX = {w: i for i, w in enumerate(l.strip() for l in open(WORDS, encoding='utf-8'))}
    print('carriers:', {k: len(v) for k, v in carriers.items()})
    print('streams:', {k: len(v) for k, v in streams.items()})

    # 1) published position lists applied to the essay
    fixed = {
        'phone': [2, 6, 9, 18, 22, 25, 45, 70, 86, 100, 113, 116],
        'gps':   [3, 18, 28, 39, 40, 56, 67, 77, 80, 90, 104, 114],
    }
    hits, bip39_cands = [], []
    for cname, toks in carriers.items():
        for fname, pos in fixed.items():
            for base in (1, 0):
                w = words_at(toks, pos, base)
                if not w:
                    continue
                if all(x in WORDSET for x in w):
                    print('ALL-BIP39 fixed', cname, fname, 'base', base, w)
                    if bip39_ok(w):
                        bip39_cands.append((cname, fname, base, w))

    # 2) windows + greedy partition
    windows_tested = 0
    parts12 = 0
    for sname, s in streams.items():
        L = len(s)
        for ln in range(12, 37):
            for stt in range(0, L - ln + 1):
                w = s[stt:stt + ln]
                windows_tested += 1
                nums = greedy(w)
                if nums is None or len(nums) != 12:
                    continue
                parts12 += 1
                for cname, toks in carriers.items():
                    n = len(toks)
                    if nums[-1] > n:
                        continue
                    for base in (1, 0):
                        words = words_at(toks, nums, base)
                        if not words:
                            continue
                        if all(x in WORDSET for x in words):
                            print('ALL-BIP39 window', sname, stt, ln, nums, cname, 'base', base, words)
                            if bip39_ok(words):
                                bip39_cands.append((cname, f'{sname}:{stt}:{ln}', base, words))

    print(f'windows tested {windows_tested}, 12-number partitions {parts12}, '
          f'BIP39 candidates {len(bip39_cands)}, elapsed {time.time()-t0:.1f}s')

    if not bip39_cands:
        print('RESULT: 0 candidates -> axis closed at word-selection level')
        return

    found = []
    for tag, src, base, words in bip39_cands:
        mnemonic = ' '.join(words)
        for path, addr in derive_all(mnemonic):
            if addr == ADDR:
                found.append((tag, src, base, path, mnemonic))
    if found:
        os.makedirs(os.path.join(ROOT, '.secret'), exist_ok=True)
        with open(os.path.join(ROOT, '.secret', 'FOUND.txt'), 'w', encoding='utf-8') as f:
            for tag, src, base, path, mnemonic in found:
                f.write(f'{tag} {src} base={base} {path}\n{mnemonic}\n')
        print('!!! HIT:', len(found), '-> .secret/FOUND.txt')
    else:
        print('RESULT: candidates derived, no address match')
    json.dump([list(x[:4]) for x in found], open(os.path.join(ROOT, 'data', 'phone_axis_hits.json'), 'w'))

if __name__ == '__main__':
    main()
