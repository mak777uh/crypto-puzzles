# -*- coding: utf-8 -*-
# _bc07_speewide2.py — specE-wide v2 (AutoClaw, 17.10.2026): целочисленная формулировка.
# 11 фиксированных слотов задают 117 бит энтропии + старшие 7 бит word12; р3к1 — свободные 11 бит.
# Для каждой комбинации: 2048 sha256 (16 байт) → чексумма-ниббл фиксирован → ~128 выживших.
# Выжившие → PBKDF2 → BIP84 m/84'/0'/0'/0/0 → сравнение hash160 с целью.
import io, hashlib, hmac, os, time, itertools, multiprocessing as mp
from coincurve import PrivateKey

N = 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364141
HERE = os.path.dirname(os.path.abspath(__file__))
WL = [w.strip() for w in io.open(os.path.join(HERE, 'bip39_english.txt'), encoding='utf-8') if w.strip()]
WIDX = {w: i for i, w in enumerate(WL)}
CHARSET = 'qpzry9x8gf2tvdw0s3jn54khce6mua7l'


def decode_target_h160(addr):
    vals = [CHARSET.index(c) for c in addr[3:]]
    vals = vals[:-6]
    acc = 0; bits = 0; out = bytearray()
    for v in vals:
        acc = (acc << 5) | v; bits += 5
        if bits >= 8:
            bits -= 8; out.append((acc >> bits) & 0xFF)
    return bytes(out)


TARGET = 'bc1qj7xsxrlgmnnrqwvlakacc5yrh33h2n3xaa0m09'
TARGET_H160 = decode_target_h160(TARGET)

SLOTS = {1: ['crane', 'cargo', 'harbor', 'fence'], 2: ['laugh', 'smile', 'happy'], 3: ['dragon', 'tattoo'],
         4: ['helmet', 'glass', 'hat'], 5: ['angry', 'mad'], 6: ['tree', 'woman'], 7: ['lady', 'woman', 'hat'],
         8: ['diamond', 'crystal'], 10: ['tree', 'forest', 'leaf'], 11: ['jacket', 'tree'],
         12: ['cargo', 'crane', 'harbor', 'fence']}
ORDERS = {'row': list(range(1, 13)), 'col': [1, 5, 9, 2, 6, 10, 3, 7, 11, 4, 8, 12]}


def order_setup(order):
    """Возвращает (p9pos0, shift9, entropy_lists, word_lists, nibble, ncombos).
    entropy_lists: (offset, [значение для энтропии]); для pos12 значение = idx>>4.
    word_lists: [полные индексы слов] в том же порядке (для мнемоники)."""
    p9 = order.index(9)               # 1-based позиция р3к1
    shift9 = 128 - 11 * p9
    entropy_lists = []
    word_lists = []
    nibble = None
    for pos, panel in enumerate(order, start=1):
        if panel == 9:
            continue
        idxs = [WIDX[w] for w in SLOTS[panel]]
        if pos == 12:
            entropy_lists.append((0, [x >> 4 for x in idxs]))
            nibble = idxs[0] & 0xF
        else:
            entropy_lists.append((128 - 11 * pos, idxs))
        word_lists.append(idxs)
    combos = 1
    for lst in entropy_lists:
        combos *= len(lst[1])
    return p9 - 1, shift9, entropy_lists, word_lists, nibble, combos


def ckd(k, c, i):
    if i >= 0x80000000:
        data = b'\x00' + k + i.to_bytes(4, 'big')
    else:
        data = PrivateKey(k).public_key.format(compressed=True) + i.to_bytes(4, 'big')
    I = hmac.new(c, data, hashlib.sha512).digest()
    kn = (int.from_bytes(I[:32], 'big') + int.from_bytes(k, 'big')) % N
    return kn.to_bytes(32, 'big'), I[32:]


def derive(words):
    mn = ' '.join(words)
    seed = hashlib.pbkdf2_hmac('sha512', mn.encode(), b'mnemonic', 2048, 64)
    I = hmac.new(b'Bitcoin seed', seed, hashlib.sha512).digest()
    k, c = I[:32], I[32:]
    try:
        for i in (84 + 0x80000000, 0x80000000, 0x80000000):
            k, c = ckd(k, c, i)
    except ValueError:
        return None
    kc, cc = ckd(k, c, 0)
    ki, _ = ckd(kc, cc, 0)
    pub = PrivateKey(ki).public_key.format(compressed=True)
    h160 = hashlib.new('ripemd160', hashlib.sha256(pub).digest()).digest()
    return mn if h160 == TARGET_H160 else None


def process(args):
    oname, shift9, entropy_lists, word_lists, nibble, p9pos0, lo, hi = args
    hits = []
    total = 0
    survivors = 0
    sha = hashlib.sha256
    lists_e = [lst for _, lst in entropy_lists]
    offs = [off for off, _ in entropy_lists]
    n = 0
    for combo in itertools.product(*lists_e):
        n += 1
        if n <= lo:
            continue
        if n >= hi:
            break
        total += 1
        base = 0
        for x, off in zip(combo, offs):
            base |= x << off
        ckconst = nibble
        for w9i in range(2048):
            ent = base | (w9i << shift9)
            hh = sha(ent.to_bytes(16, 'big')).digest()
            if (hh[0] >> 4) == ckconst:
                survivors += 1
                wc = list(combo)
                words = [WL[x] for x in wc]
                words[p9pos0] = WL[w9i]
                r = derive(words)
                if r is not None:
                    hits.append((oname, r, 'm/84h/0h/0h/0/0'))
                    with open(os.path.join(HERE, 'SPEEWIDE_HIT.txt'), 'a', encoding='utf-8') as f:
                        f.write('MATCH %s %s\n' % (oname, r))
    return (oname, lo, hi, total, survivors, hits)


if __name__ == '__main__':
    tasks = []
    for oname, order in ORDERS.items():
        p9pos0, shift9, entropy_lists, word_lists, nibble, combos = order_setup(order)
        CH = 512
        nblocks = (combos + CH - 1) // CH
        for b in range(nblocks):
            tasks.append((oname, shift9, entropy_lists, word_lists, nibble, p9pos0,
                          b * CH, min((b + 1) * CH, combos)))
    donep = os.path.join(HERE, '_bc07_sw2_done.txt')
    DONE = set()
    if os.path.exists(donep):
        DONE = set(io.open(donep, encoding='utf-8').read().split())
    todo = [t for t in tasks if '%s:%d' % (t[0], t[6]) not in DONE]
    print('blocks total=%d done=%d todo=%d' % (len(tasks), len(DONE), len(todo)), flush=True)
    t0 = time.time()
    total = 0; surv = 0; hits = []
    donef = open(donep, 'a', encoding='utf-8')
    with mp.Pool(12) as pool:
        it = pool.imap_unordered(process, todo, chunksize=1)
        try:
            for res in it:
                oname, lo, hi, cnt, sv, hh2 = res
                total += cnt; surv += sv; hits += hh2
                donef.write('%s:%d\n' % (oname, lo)); donef.flush()
                if surv and surv % 200000 < 2600:
                    print('progress %s block %d: cum combos=%d survivors=%d hits=%d %.0fs'
                          % (oname, lo, total, surv, len(hits), time.time() - t0), flush=True)
                if time.time() - t0 > 8.3 * 60:
                    print('DEADLINE, terminating pool', flush=True)
                    pool.terminate(); break
        finally:
            donef.close()
    print('RUN RESULT: combos=%d survivors_derived=%d hits=%d elapsed=%.0fs'
          % (total, surv, len(hits), time.time() - t0))
    for h in hits:
        print('HIT', h)
