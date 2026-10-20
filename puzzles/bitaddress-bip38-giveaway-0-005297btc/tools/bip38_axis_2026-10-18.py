# -*- coding: utf-8 -*-
"""Бин38-ось «Capitalize» для bitaddress giveaway (1J7BVeP8JK4op2X3GN3Hy7xkTnGnQTMpou).

Запуск:
    python tools/bip38_axis_2026-10-18.py witness
    python tools/bip38_axis_2026-10-18.py cap  [budget_sec]

ВАЖНО (урок инцидента AutoClaw 17.10): все побочные эффекты (запись в LOG/прогресс,
создание Pool) только внутри main()/`if __name__ == "__main__"` — воркеры spawn-Пула
импортируют чистый модуль и ничего не дописывают.
"""
import hashlib, itertools, json, os, sys, time

import base58
import coincurve
from Crypto.Cipher import AES

N = 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364141
ENC_TARGET = "6PfQTphCYc1Fee19uPz2pmou5RVBDVgw8VcrPfGLos4ktUnARdiFLYhcNU"

# Пул токенов восстановлен 18.10 из data/cands_triples_2026-10-17.txt и СЕРТИФИЦИРОВАН:
# permutations(22,3) = 9240 строк = файл байт в байт (см. LOG 18.10).
TOKENS = ['always', 'around', 'berlin', 'bitcoin', 'btc', 'don', 'ethereum', 'fiat',
          'freelance', 'https', 'lightning', 'like', 'money', 'network', 'people',
          'phoenix', 'room', 'sats', 'transactions', 'wallet', 'wallets', 'your']

HERE = os.path.dirname(os.path.abspath(__file__))
BASE = os.path.dirname(HERE)
DATA = os.path.join(BASE, "data")
PROGRESS = os.path.join(DATA, "cap_progress_2026-10-18.json")
FOUND = os.path.join(DATA, "found.txt")


def _parse(enc_b58):
    enc = base58.b58decode_check(enc_b58)
    assert enc[0:2] == b"\x01\x43", enc[0:2].hex()
    return enc[2], enc[3:7], enc[7:15], enc[15:23], enc[23:39]


def _scrypt(pw, salt, n, r, p, l):
    return hashlib.scrypt(pw, salt=salt, n=n, r=r, p=p, dklen=l, maxmem=1 << 30)


def _h160(pub):
    d = hashlib.sha256(pub).digest()
    try:
        return hashlib.new("ripemd160", d).digest()
    except Exception:
        from Crypto.Hash import RIPEMD160
        return RIPEMD160.new(d).digest()


def check(passphrase, enc_b58=ENC_TARGET):
    """None — пароль не подошёл; hex приватного ключа — подошёл (адрес совпал)."""
    flag, addresshash, ownerentropy, ep1, ep2 = _parse(enc_b58)
    pw = passphrase.encode("utf-8")
    if flag & 0x04:
        pref = _scrypt(pw, ownerentropy[0:4], 16384, 8, 8, 32)
        pfs = hashlib.sha256(hashlib.sha256(pref + ownerentropy).digest()).digest()
    else:
        pfs = _scrypt(pw, ownerentropy, 16384, 8, 8, 32)
    pf = int.from_bytes(pfs, "big")
    passpoint = coincurve.PublicKey.from_secret(pfs).format(compressed=True)
    derived = _scrypt(passpoint, addresshash + ownerentropy, 1024, 1, 1, 64)
    dh1, dh2 = derived[:32], derived[32:]
    aes = AES.new(dh2, AES.MODE_ECB)
    dp2 = bytes(a ^ b for a, b in zip(aes.decrypt(ep2), dh1[16:32]))
    dp1 = bytes(a ^ b for a, b in zip(aes.decrypt(ep1 + dp2[:8]), dh1[:16]))
    seedb = dp1[:16] + dp2[8:16]
    factorb = hashlib.sha256(hashlib.sha256(seedb).digest()).digest()
    priv = (pf * int.from_bytes(factorb, "big")) % N
    pub = coincurve.PublicKey.from_secret(priv.to_bytes(32, "big")).format(compressed=False)
    addr = base58.b58encode_check(b"\x00" + _h160(pub))
    addr = addr.decode() if isinstance(addr, (bytes, bytearray)) else addr
    ah = hashlib.sha256(hashlib.sha256(addr.encode()).digest()).digest()[:4]
    return priv.to_bytes(32, "big").hex() if ah == addresshash else None


def cap_candidates():
    out, seen = [], set()
    for p in itertools.permutations(TOKENS, 3):
        s = "".join(t.capitalize() for t in p)
        if len(s) <= 30 and s not in seen:
            seen.add(s)
            out.append(s)
    return out


def _job(s):
    try:
        return (s, check(s))
    except Exception as exc:
        return (s, "ERR:" + exc.__class__.__name__)


def cmd_witness():
    ok_vec = check("TestingOneTwoThree", "6PfQu77ygVyJLZjfvMLyhLMQbYnu5uguoJJ4kMCLqWwPEdfpwANVS76gTX")
    want = "a43a940577f4e97f5c4d39eb14ff083a98187c64ea7c99ef7ce460833959a519"
    neg = check("walletbitcoinberlin")
    print("вектор BIP38:", ok_vec)
    print("OK-вектор  :", "PASS" if ok_vec == want else "FAIL")
    print("негатив    :", "PASS" if neg is None else "FAIL " + str(neg))
    return 0 if ok_vec == want and neg is None else 1


def cmd_cap(budget):
    from multiprocessing import Pool
    cands = cap_candidates()
    done = 0
    if os.path.exists(PROGRESS):
        try:
            done = int(json.load(open(PROGRESS, encoding="utf-8")).get("done", 0))
        except Exception:
            done = 0
    todo = cands[done:]
    print(f"cap: всего {len(cands)}, уже проверено {done}, осталось {len(todo)}, бюджет {budget}s", flush=True)
    t0 = time.time()
    checked = hits = 0
    err = []
    with Pool(16) as pool:
        for s, r in pool.imap_unordered(_job, todo, chunksize=2):
            checked += 1
            if r == "ERR:TimeoutError" or (isinstance(r, str) and r.startswith("ERR:")):
                err.append((s, r))
            elif r:
                hits += 1
                with open(FOUND, "a", encoding="utf-8") as fh:
                    fh.write(f"{time.strftime('%Y-%m-%d %H:%M:%S')} PASS={s!r} priv={r}\n")
                print("FOUND", repr(s), r, flush=True)
                pool.terminate()
                break
            if checked % 200 == 0:
                el = time.time() - t0
                print(f"  {done+checked}/{len(cands)}  {el:.0f}s  {checked/el:.1f}/s", flush=True)
                _save(done + checked, len(cands), budget, el, hits, err)
            if time.time() - t0 > budget:
                print("бюджет исчерпан", flush=True)
                pool.terminate()
                break
    el = time.time() - t0
    _save(done + checked, len(cands), budget, el, hits, err)
    print(f"ИТОГ cap: проверено {checked} (ось {done+checked}/{len(cands)}), найдено {hits}, ошибок {len(err)}, {el:.0f}s")
    return 0


def _save(done, total, budget, el, hits, err):
    with open(PROGRESS + ".tmp", "w", encoding="utf-8") as fh:
        json.dump({"axis": "cap-per-token", "done": done, "total": total,
                   "budget_sec": budget, "elapsed_sec": round(el), "hits": hits,
                   "errors": err[:20], "ts": time.strftime('%Y-%m-%dT%H:%M:%SZ', time.gmtime())}, fh)
    os.replace(PROGRESS + ".tmp", PROGRESS)


if __name__ == "__main__":
    mode = sys.argv[1] if len(sys.argv) > 1 else "witness"
    if mode == "witness":
        sys.exit(cmd_witness())
    if mode == "cap":
        sys.exit(cmd_cap(int(sys.argv[2]) if len(sys.argv) > 2 else 840))
    print("unknown mode")
    sys.exit(2)
