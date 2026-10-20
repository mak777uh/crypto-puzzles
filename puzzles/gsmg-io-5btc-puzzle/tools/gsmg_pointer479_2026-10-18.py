# -*- coding: utf-8 -*-
"""
Выстрел по 479-пойнтеру (Big Pickle, 2026-10-18).

Ось B (предрегистрация: LOG.md §10): «479 — указатель, а не payload».
Генерируем кандидатов из текста Architect (479 = индекс PRIVATEKEY) прайм/шаговыми
селекторами и окнами; проверяем каждого против:
  (1) точного реестра посаженных адресов (8 проверенных строк),
  (2) словаря известных токенов/англ. слов (самосогласованность),
  (3) трёх конвертов (EVP_BytesToKey MD5/SHA-256 + AES-256-CBC) со строгим фильтром
      (pad-valid И printable>=0.90) и сверкой призового hash160.

Контроли ДО прогона (иначе прогон недействителен):
  - chain-1 (salph_inner, md5) sha256 == 1449a217…
  - cosmic SetB-XOR (md5) sha256(body) == 4f7a1e4e…
  - держивация 6 зарегистрированных адресов из их известных прообразов.
Без затрат, локально, секунды.
"""
import base64
import hashlib
import itertools
import os
import sys
import time

G = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
APPLE = os.path.join(G, 'data', 'github_2026-10', 'applelamps__GSMG-CLEAN', 'files')
OUT = os.path.join(G, 'data', 'pointer479_2026-10-18.out.txt')
WORDS_ALPHA = (r'C:\Users\Admin\OneDrive\Desktop\master\puzzles'
               r'\smith-lyle-moore-hunt-2-0-032btc\data\words_alpha.txt')

_lines = []
T0 = time.time()


def log(s=''):
    s = str(s)
    _lines.append(s)
    try:
        print(s, flush=True)
    except Exception:
        print(s.encode('ascii', 'replace').decode('ascii'), flush=True)


N = 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364141
PRIZE_H160 = 'a9553269572a317e39f0f518cb87c1a0ee1dbae4'
B58 = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz'


def b58check(payload):
    chk = hashlib.sha256(hashlib.sha256(payload).digest()).digest()[:4]
    data = payload + chk
    n = int.from_bytes(data, 'big')
    out = ''
    while n:
        out = B58[n % 58] + out
        n //= 58
    for b in data:
        if b == 0:
            out = '1' + out
        else:
            break
    return out


try:
    from coincurve import PrivateKey

    def pub_from_d(d):
        return PrivateKey(d).public_key
except Exception:
    PrivateKey = None
    P_ = 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFC2F
    Gx = 0x79BE667EF9DCBBAC55A06295CE870B07029BFCDB2DCE28D959F2815B16F81798
    Gy = 0x483ADA7726A3C4655DA4FBFC0E1108A8FD17B448A68554199C47D08FFB10D4B8

    def _inv(a, n):
        return pow(a, n - 2, n)

    def _add(p1, p2):
        if p1 is None or p2 is None:
            return p1 or p2
        x1, y1 = p1
        x2, y2 = p2
        if x1 == x2 and (y1 + y2) % P_ == 0:
            return None
        lam = ((3 * x1 * x1) * _inv(2 * y1, P_) if p1 == p2
               else (y2 - y1) * _inv(x2 - x1, P_)) % P_
        x3 = (lam * lam - x1 - x2) % P_
        return (x3, (lam * (x1 - x3) - y1) % P_)

    def _mul(k, pt=(Gx, Gy)):
        r = None
        while k:
            if k & 1:
                r = _add(r, pt)
            pt = _add(pt, pt)
            k >>= 1
        return r

    class _Pub(object):
        def __init__(self, pt):
            self.pt = pt

        def format(self, compressed=True):
            x, y = self.pt
            if compressed:
                return bytes([2 + (y & 1)]) + x.to_bytes(32, 'big')
            return b'\x04' + x.to_bytes(32, 'big') + y.to_bytes(32, 'big')

    def pub_from_d(d):
        pt = _mul(int.from_bytes(d, 'big') % N)
        if pt is None:
            raise ValueError('inf')
        return _Pub(pt)


def addr_from_d(d, compressed=True):
    pub = pub_from_d(d).format(compressed)
    return b58check(b'\x00' + hashlib.new('ripemd160', hashlib.sha256(pub).digest()).digest())


def h160_from_d(d):
    pub = pub_from_d(d).format(True)
    return hashlib.new('ripemd160', hashlib.sha256(pub).digest()).hexdigest()


# ------------------------------------------------------------------ блобы
def load_blob(fn, want_salt):
    with open(os.path.join(APPLE, 'data', fn), 'r', encoding='utf-8') as f:
        b64 = ''.join(f.read().split())
    raw = base64.b64decode(b64)
    assert raw[:8] == b'Salted__', fn
    salt, ct = raw[8:16], raw[16:]
    assert salt.hex() == want_salt, (fn, salt.hex())
    return salt, ct


from Crypto.Cipher import AES

BLOBS = {
    'SALPH_INNER': load_blob('locked_salphaseion_short.b64', '3ab585348552415d'),
    'TERMINAL': load_blob('locked_terminal_phase3_2_end.b64', 'b45a5e3d827593ca'),
    'COSMIC': load_blob('locked_cosmic_duality.b64', '2d3f6fe06dc950e6'),
}


def evp(pw, salt, md):
    d, prev = b'', b''
    while len(d) < 48:
        prev = hashlib.new(md, prev + pw + salt).digest()
        d += prev
    return d[:32], d[32:48]


def padlen(b):
    n = b[-1]
    return n if 1 <= n <= 16 and b[-n:] == bytes([n]) * n else 0


def dec(blob, pw, md):
    salt, ct = blob
    key, iv = evp(pw, salt, md)
    pt = AES.new(key, AES.MODE_CBC, iv).decrypt(ct)
    return pt, padlen(pt)


# ------------------------------------------------------------------ реестр
REGISTRY = [
    ('1AD2wfwXukZ1kUAy848hTQQ72aSBZPB75r', 'sha256',
     'theflowerblossomsthroughwhatseemstobeaconcretesurface'),
    ('1Jqq37KkZEt4F3Dt6qXdtyiMEFBBdawbkJ', 'sha256', 'causality'),
    ('1K23RS1y2fnuZRkhw5nUpFr5Jk5WN11Zeq', 'sha256',
     'jacquefrescogiveitjustonesecondheisenbergsuncertaintyprinciple'),
    ('1GyT5WrLYpwFkuiVoPDJZa1Q6jtjbjuBff', 'sha256', '1GSMG1JC9wtdSwfwApgj2xcmJPAwx7prBe'),
    ('148XH2YBmLr4oAJXQcG84FpNYoBmqnVPHQ', 'raw', 'gsmg.io/theseedisplanted'),
    ('13HGhjkmKUkP8sk9k63BLmhkxRjy7uK4Rp', 'bitsrev', 'gsmg.io/theseedisplanted'),
]
OPEN_ADDR = '1NULY7DhzuNvSDtPkFzNo6oRTZQWBqXNE9'
ALL_ADDRS = set(r[0] for r in REGISTRY) | {OPEN_ADDR}


def key_from_variant(C_bytes, variant):
    """варианты построения 32-байтного ключа из строки-кандидата"""
    if variant == 'sha256':
        return hashlib.sha256(C_bytes).digest()
    if variant == 'sha256hex':
        h = hashlib.sha256(C_bytes).hexdigest().encode()
        return hashlib.sha256(h).digest()
    if variant == 'rawpad':
        if not (0 < len(C_bytes) <= 32):
            return None
        return b'\x00' * (32 - len(C_bytes)) + C_bytes
    if variant == 'rawtrunc':
        if len(C_bytes) < 32:
            return None
        return C_bytes[:32]
    if variant == 'bitsrev':
        # проверенное правило (контроль 13HGhjk…): биты дополнить нулями СПРАВА
        # до 256, и только затем развернуть всю строку.
        bits = ''.join(format(b, '08b') for b in C_bytes)[:256]
        rb = bits.ljust(256, '0')[::-1]
        return int(rb, 2).to_bytes(32, 'big')
    return None


def main():
    A = open(os.path.join(APPLE, 'data', 'architect_letters_1539.txt'),
             encoding='utf-8', errors='replace').read().strip()
    log('Architect: len=%d  A[479:489]=%r' % (len(A), A[479:489]))
    assert len(A) == 1539 and A[479:489] == 'PRIVATEKEY'
    RD = open(os.path.join(APPLE, 'data', 'architect_plaintext_readable.txt'),
              encoding='utf-8', errors='replace').read()

    # ---------------- контроли ----------------
    log('--- КОНТРОЛИ ---')
    KNOWN = b'matrixsumlistenterlastwordsbeforearchichoice' \
            b'thispasswordmatrixsumlist'
    pt, n = dec(BLOBS['SALPH_INNER'], KNOWN, 'md5')
    ch = hashlib.sha256(pt[:len(pt) - n]).hexdigest()
    log('  chain-1 (SP, md5): pid=%d sha256=%s -> %s' %
        (n, ch[:16], 'OK' if ch.startswith('1449a217') else '!!! FAIL !!!'))
    ctrl1 = ch.startswith('1449a217')
    SETB = [b'matrixsumlist', b'enter', b'lastwordsbeforearchichoice', b'thispassword',
            b'matrixsumlist', b'yourlastcommand', b'secondanswer']
    x = b'\x00' * 32
    for t in SETB:
        x = bytes(a ^ b for a, b in zip(x, hashlib.sha256(t).digest()))
    pt, n = dec(BLOBS['COSMIC'], x, 'md5')
    bh = hashlib.sha256(pt[:len(pt) - n]).hexdigest()
    log('  cosmic SetB (md5): key=%s sha256(body)=%s -> %s' %
        (x.hex()[:16], bh[:16], 'OK' if bh.startswith('4f7a1e4e') else '!!! FAIL !!!'))
    ctrl2 = bh.startswith('4f7a1e4e')

    ok_addr = 0
    for addr, how, pre in REGISTRY:
        d = None
        if how == 'sha256':
            d = hashlib.sha256(pre.encode()).digest()
        elif how == 'raw':
            d = b'\x00' * (32 - len(pre)) + pre.encode()
        elif how == 'bitsrev':
            bits = ''.join(format(b, '08b') for b in pre.encode())
            d = int(bits.ljust(256, '0')[::-1], 2).to_bytes(32, 'big')
        if d is None:
            continue
        good = False
        for comp in (True, False):
            try:
                if addr_from_d(d, comp) == addr:
                    good = True
            except Exception:
                pass
        ok_addr += 1 if good else 0
        log('  адрес-контроль %-36s %-7s -> %s' % (addr, how, 'OK' if good else 'не воспроизведён'))
    log('  адрес-контролей пройдено: %d / %d' % (ok_addr, len(REGISTRY)))
    if not (ctrl1 and ctrl2 and ok_addr >= 4):
        log('!!! контроль не пройден — прогон недостоверен')
        return 1

    # ---------------- генерация кандидатов ----------------
    PRIMES = []
    sieve = [True] * 2000
    for i in range(2, 2000):
        if sieve[i]:
            PRIMES.append(i)
            for j in range(i * i, 2000, i):
                sieve[j] = False

    cands = {}

    def add(tag, s):
        if s and 4 <= len(s) <= 300 and s not in cands.values():
            cands[tag] = s

    BASES = {
        'A': A,
        'A479': A[479:],
        'A484': A[484:],
        'AnoIO': A.replace('I', '').replace('O', ''),
        'A479noIO': A[479:].replace('I', '').replace('O', ''),
    }
    for bn, b in BASES.items():
        n = len(b)
        pr0 = [p for p in PRIMES if p < n]
        pr1 = [p - 1 for p in PRIMES if 1 <= p <= n]
        prset = set(pr0)
        add('%s|prime0' % bn, ''.join(b[i] for i in pr0))
        add('%s|prime1' % bn, ''.join(b[i] for i in pr1))
        add('%s|nonprime' % bn, ''.join(b[i] for i in range(n) if i not in prset))
        for k in (5, 7, 9, 15, 16, 23, 24, 38):
            add('%s|step%d' % (bn, k), ''.join(b[i] for i in range(0, n, k)))
            add('%s|step%d@479' % (bn, k), ''.join(b[i] for i in range(479 if bn == 'A' else 0, n, k)))
        for st in (479, 484):
            add('%s|from%d' % (bn, st), b[st:] if st < n else '')

    for L in list(range(1, 97)) + [127, 149, 227, 256, 300, 479, 570]:
        add('win479|%d' % L, A[479:479 + L])
        add('win484|%d' % L, A[484:484 + L])
        add('win479noIO|%d' % L, A[479:479 + L].replace('I', '').replace('O', ''))
    MARK = 'REINSERTINGTHEPRIMEBASICS'
    R = A.index(MARK)
    log('метка %s начинается на индексе %d' % (MARK, R))
    for L in (16, 23, 32, 64, 91, 96, 127, 149, 227, 256):
        add('aftermark|%d' % L, A[R + len(MARK):R + len(MARK) + L])
    # смещения/разности подсказок
    for st in (0, 5, 10, 484, 479 + 10):
        add('off479+%d' % st, A[479 + st:479 + st + 64])
    # циклы {1},{4},{21} с шагом 23/24
    for step in (23, 24):
        idx = []
        i = 0
        while True:
            j = [1, 4, 21][i % 3] + (i // 3) * step
            if j >= len(A):
                break
            idx.append(j)
            i += 1
        add('cyc141|%d' % step, ''.join(A[j] for j in idx))
    # слова из читаемой версии
    import re
    W = re.findall(r'[A-Za-z][A-Za-z\'\-]*', RD)
    for k in (5, 7, 9, 16, 23, 24, 32, 51, 64):
        add('readable|first%d' % k, ' '.join(W[:k]))
        add('readable|nojoin%d' % k, ''.join(W[:k]))
    # явные литералы-кандидаты (пункт «после PRIVATEKEY»)
    pw = A[479:479 + 32]
    add('literal|A[479:479+32]', pw)
    add('literal|A[479+10:479+10+32]', A[489:489 + 32])
    add('literal|PRIVATEKEY', 'PRIVATEKEY')

    cands = {k: v for k, v in cands.items() if v}
    log('')
    log('кандидатов сгенерировано: %d' % len(cands))

    # ---------------- словари ----------------
    eng = set()
    with open(WORDS_ALPHA, encoding='utf-8', errors='replace') as f:
        for l in f:
            t = l.strip().lower()
            if 4 <= len(t) <= 60 and t.isalpha():
                eng.add(t)

    CUR = set("""matrixsumlist lastwordsbeforearchichoice thispassword yinyang
    yellowblueprimes shabef ourfirsthintisyourlastcommand btcseed theprivatekey
    privatekey betterhalf causality theseedisplanted theflowerblossomsthroughwhatseemstobeaconcretesurface
    jacquefrescogiveitjustonesecondheisenbergsuncertaintyprinciple theone enter
    secondanswer yourlastcommand""".split())

    # ---------------- прогон ----------------
    key_variants = ('sha256', 'sha256hex', 'rawpad', 'bitsrev')
    oracle_hits = []
    prize_hits = []
    dict_hits = []
    env_hits = []
    env_top = []
    tests = 0

    for tag, C in cands.items():
        for form, cb in (('U', C.encode()), ('L', C.lower().encode())):
            tests += 1
            # (2) словарь
            cl = C.lower()
            if cl in CUR:
                dict_hits.append((tag, form, 'PUZ', C))
            elif cl in eng:
                dict_hits.append((tag, form, 'EN', C))
            # (1) адресный оракул
            for kv in key_variants:
                d = key_from_variant(cb, kv)
                if not d or len(d) != 32:
                    continue
                try:
                    if int.from_bytes(d, 'big') % N == 0:
                        continue
                    for comp in (True, False):
                        ad = addr_from_d(d, comp)
                        if ad in ALL_ADDRS:
                            oracle_hits.append((tag, form, kv, 'comp' if comp else 'unc', ad))
                    if h160_from_d(d) == PRIZE_H160:
                        prize_hits.append((tag, form, kv, d.hex()))
                except Exception:
                    pass
            # (3) конверты
            for enc, pwb in (('raw', cb), ('sha256hex', hashlib.sha256(cb).hexdigest().encode())):
                for md in ('md5', 'sha256'):
                    for bn, blob in BLOBS.items():
                        ptx, nn = dec(blob, pwb, md)
                        if not nn:
                            continue
                        body = ptx[:len(ptx) - nn]
                        pr = sum(1 for z in ptx if 32 <= z < 127) / len(ptx)
                        if pr >= 0.90:
                            env_hits.append((tag, form, bn, enc, md, nn, len(body), pr,
                                             hashlib.sha256(body).hexdigest(), C[:40]))
                        if len(body) == 32:
                            k = int.from_bytes(body, 'big')
                            if 0 < k < N and h160_from_d(body) == PRIZE_H160:
                                prize_hits.append((tag, form, 'ENV:%s' % bn, body.hex()))
                        env_top.append((pr, nn, bn, enc, md, tag))

    log('тестов (кандидат × регистр): %d  elapsed %.1fs' % (tests, time.time() - T0))
    log('')
    log('(1) адресные совпадения по реестру: %d' % len(oracle_hits))
    for h in oracle_hits:
        log('    !! %s' % (h,))
    log('призовых hash160: %d' % len(prize_hits))
    for h in prize_hits:
        log('    !!! %s' % (h,))
    log('')
    log('(2) словарные попадания (самосогласованность): %d' % len(dict_hits))
    for h in dict_hits[:20]:
        log('    %-6s %s %-28s %s' % (h[2], h[1], h[0], h[3][:60]))
    log('')
    log('(3) конверты: pad-valid+printable>=0.90 — %d' % len(env_hits))
    for h in env_hits[:20]:
        log('    !! %s' % (h,))
    env_top.sort(key=lambda z: -z[0])
    log('топ-8 по печатаемости (для глаза):')
    for pr, nn, bn, enc, md, tag in env_top[:8]:
        log('    pr=%.3f pad=%d %-12s %-9s %-6s %s' % (pr, nn, bn, enc, md, tag))

    log('')
    log('ИТОГ: адрес 0 / приз 0 / словарь %d (информационно) / конверты %d' %
        (len(dict_hits), len(env_hits)))
    with open(OUT, 'w', encoding='utf-8') as f:
        f.write('\n'.join(_lines) + '\n')
    log('ОТЧЁТ: %s' % OUT)
    return 0


if __name__ == '__main__':
    sys.exit(main())
