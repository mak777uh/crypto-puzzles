# -*- coding: utf-8 -*-
"""GSMG: разведка оси ECDSA-подписей призового ключа.

Задача: собрать ВСЕ подписи, сделанные призовым ключом
(адрес 1GSMG1JC9wtdSwfwApgj2xcmJPAwx7prBe, h160 a9553269...bae4),
и вычислить для каждой тройку (r, s, z), где z = legacy SIGHASH_ALL.
Только чтение сети (blockstream.info) + локальная арифметика.

Выход: %TEMP%\\opencode\\gsmg-enrich\\ecdsa_sigs.json + читаемый отчёт в stdout.
"""
import hashlib
import json
import os
import sys
import time
import urllib.request

sys.stdout.reconfigure(encoding="utf-8")
TMP = r"C:\Users\Admin\AppData\Local\Temp\opencode\gsmg-enrich"
ADDR = "1GSMG1JC9wtdSwfwApgj2xcmJPAwx7prBe"
H160 = "a9553269572a317e39f0f518cb87c1a0ee1dbae4"
PUBU = bytes.fromhex(
    "04f4d1bbd91e65e2a019566a17574e97dae908b784b388891848007e4f55d5a464"
    "9c73d25fc5ed8fd7227cab0be4e576c0c6404db5aa546286563e4be12bf33559")
N = 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364141
P_ = 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFC2F
Gx = 0x79BE667EF9DCBBAC55A06295CE870B07029BFCDB2DCE28D959F2815B16F81798
Gy = 0x483ADA7726A3C4655DA4FBFC0E1108A8FD17B448A68554199C47D08FFB10D4B8
API = "https://blockstream.info/api"


def get(url, tries=5):
    for i in range(tries):
        try:
            with urllib.request.urlopen(url, timeout=45) as r:
                return r.read().decode()
        except Exception as e:
            if i == tries - 1:
                raise
            time.sleep(2 + 2 * i)


def sha256d(b):
    return hashlib.sha256(hashlib.sha256(b).digest()).digest()


def b58h160(addr):
    import string
    AL = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"
    n = 0
    for c in addr:
        n = n * 58 + AL.index(c)
    b = n.to_bytes(25, "big")
    assert b[-4:] == sha256d(b[:-4])[:4], "bad checksum"
    return b[1:21]


assert b58h160(ADDR).hex() == H160, "проверка адреса не сошлась"


def rd_varint(h, i):
    v = h[i]
    if v < 0xfd:
        return v, i + 1
    if v == 0xfd:
        return int.from_bytes(h[i + 1:i + 3], "little"), i + 3
    if v == 0xfe:
        return int.from_bytes(h[i + 1:i + 5], "little"), i + 5
    return int.from_bytes(h[i + 1:i + 9], "little"), i + 9


def parse_tx(raw):
    h = bytes.fromhex(raw)
    i = 0
    ver = int.from_bytes(h[i:i + 4], "little"); i += 4
    n_in, i = rd_varint(h, i)
    vins = []
    for _ in range(n_in):
        ptxid = h[i:i + 32][::-1].hex(); i += 32
        pvout = int.from_bytes(h[i:i + 4], "little"); i += 4
        sl, i = rd_varint(h, i)
        script = h[i:i + sl]; i += sl
        seq = int.from_bytes(h[i:i + 4], "little"); i += 4
        vins.append({"ptxid": ptxid, "pvout": pvout, "script": script, "seq": seq})
    n_out, i = rd_varint(h, i)
    vouts = []
    for _ in range(n_out):
        val = int.from_bytes(h[i:i + 8], "little"); i += 8
        sl, i = rd_varint(h, i)
        spk = h[i:i + sl]; i += sl
        vouts.append({"value": val, "spk": spk})
    lock = int.from_bytes(h[i:i + 4], "little")
    return {"ver": ver, "vin": vins, "vout": vouts, "lock": lock}


def write_varint(n):
    if n < 0xfd:
        return bytes([n])
    if n <= 0xffff:
        return b"\xfd" + n.to_bytes(2, "little")
    if n <= 0xffffffff:
        return b"\xfe" + n.to_bytes(4, "little")
    return b"\xff" + n.to_bytes(8, "little")


def legacy_sighash(tx, idx, prev_spk, hashtype=1):
    """z для legacy (не-segwit) входа idx."""
    out = tx["ver"].to_bytes(4, "little")
    out += write_varint(len(tx["vin"]))
    for k, v in enumerate(tx["vin"]):
        out += bytes.fromhex(v["ptxid"])[::-1]
        out += v["pvout"].to_bytes(4, "little")
        script = prev_spk if k == idx else b""
        out += write_varint(len(script)) + script
        out += v["seq"].to_bytes(4, "little")
    out += write_varint(len(tx["vout"]))
    for v in tx["vout"]:
        out += v["value"].to_bytes(8, "little")
        out += write_varint(len(v["spk"])) + v["spk"]
    out += tx["lock"].to_bytes(4, "little")
    out += hashtype.to_bytes(4, "little")
    return int.from_bytes(sha256d(out), "big")


def parse_script_sig(script):
    """Возвращает (der_sig, hashtype, pubkey) для P2PKH scriptSig [pushed sig][pushed pubkey]."""
    if not script:
        return None
    i = 0
    parts = []
    while i < len(script):
        l = script[i]; i += 1
        if l == 0:
            parts.append(b"")
            continue
        if l > len(script) - i:
            return None
        parts.append(script[i:i + l]); i += l
    if len(parts) < 1:
        return None
    sig = parts[0]
    if len(sig) < 9:
        return None
    ht = sig[-1]
    der = sig[:-1]
    pub = parts[1] if len(parts) > 1 else None
    return der, ht, pub


def der_rs(der):
    if der[0] != 0x30:
        return None
    i = 2
    if der[i] != 0x02:
        return None
    rl = der[i + 1]; r = der[i + 2:i + 2 + rl]; i += 2 + rl
    if der[i] != 0x02:
        return None
    sl = der[i + 1]; s = der[i + 2:i + 2 + sl]
    return int.from_bytes(r, "big"), int.from_bytes(s, "big")


# ---------------- ECDSA verify ----------------
def _inv(a, m):
    return pow(a, m - 2, m)


def _add(p1, p2):
    if p1 is None:
        return p2
    if p2 is None:
        return p1
    x1, y1 = p1; x2, y2 = p2
    if x1 == x2 and (y1 + y2) % P_ == 0:
        return None
    lam = ((3 * x1 * x1) * _inv(2 * y1, P_) if p1 == p2 else (y2 - y1) * _inv(x2 - x1, P_)) % P_
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


def verify(r, s, z, Q=None):
    Q = Q or (int.from_bytes(PUBU[1:33], "big"), int.from_bytes(PUBU[33:], "big"))
    if not (1 <= r < N and 1 <= s < N):
        return False
    w = _inv(s, N)
    u1 = (z * w) % N
    u2 = (r * w) % N
    pt = _add(_mul(u1), _mul(u2, Q))
    if pt is None:
        return False
    return pt[0] % N == r


def h160_of(d):
    pt = _mul(d % N)
    if pt is None:
        return None
    pub = b"\x04" + pt[0].to_bytes(32, "big") + pt[1].to_bytes(32, "big")
    return hashlib.new("ripemd160", hashlib.sha256(pub).digest()).hexdigest()


def main():
    print("призовой адрес:", ADDR, "h160 OK")
    # 1. все tx адреса (с пагинацией)
    txs = []
    page = get(f"{API}/address/{ADDR}/txs")
    while True:
        batch = json.loads(page)
        txs += batch
        if len(batch) < 25:
            break
        page = get(f"{API}/address/{ADDR}/txs/chain/{batch[-1]['txid']}")
    print("всего tx на адресе (confirmed):", len(txs))

    # 2. отбираем траты: вход, ссылающийся на выход этого адреса
    spends = []
    for t in txs:
        for vi, vin in enumerate(t["vin"]):
            pa = vin.get("prevout", {}).get("scriptpubkey_address")
            if pa == ADDR:
                spends.append(t["txid"])
                break
    spends = list(dict.fromkeys(spends))
    print("тратящих tx:", len(spends), spends)

    # 3. тянем сырые hex и разбираем
    sigs = []
    raw_cache = {}
    for txid in spends:
        raw = get(f"{API}/tx/{txid}/hex").strip()
        raw_cache[txid] = raw
        tx = parse_tx(raw)
        for vi, vin in enumerate(tx["vin"]):
            prev = next((t for t in txs if t["txid"] == vin["ptxid"]), None)
            if prev is None:
                prev = json.loads(get(f"{API}/tx/{vin['ptxid']}"))
            po = prev["vout"][vin["pvout"]]
            if po.get("scriptpubkey_address") != ADDR:
                continue
            ps = parse_script_sig(vin["script"])
            if not ps:
                continue
            der, ht, pub = ps
            rs = der_rs(der)
            if not rs:
                continue
            r, s = rs
            spk = bytes.fromhex(po["scriptpubkey"])
            z = legacy_sighash(tx, vi, spk, ht)
            ok = verify(r, s, z)
            sigs.append({"txid": txid, "vin": vi, "r": hex(r), "s": hex(s), "z": hex(z),
                         "ht": ht, "pub": pub.hex() if pub else None, "verify": ok,
                         "block": next((t.get("status", {}).get("block_height") for t in txs if t["txid"] == txid), None)})
            print(f"  {txid[:16]} vin={vi} r={hex(r)[:18]}... s={hex(s)[:14]}... z={hex(z)[:18]}... verify={ok} pub={('04'+pub.hex()[2:14]+'...') if pub else None}")

    print("\nподписей призового ключа:", len(sigs))
    print("уникальных r:", len({g["r"] for g in sigs}))
    print("все verify=True:", all(g["verify"] for g in sigs))

    # 4. контроль по дайджесту комьюнити (issue #94-ish, «THE GHOST DATA»)
    ctrl = [
        ("00dbe31ca9440892abcec35c0aa83380e1c35d2a33ea99fc314e6bcaf299b8847a",
         "17a2531912ce634185f572357b49873764545d8703723002d3c3778e763e98dc",
         "3596e7108347b041e49483c08d94f516ec16383a7a0d18d9cfef100988bfd680"),
        ("00fce22a0a026a33197ae65efa47420aa1c4efdbf95f8370f4da22802392ab2db2",
         "193bbf54a6be9ef136eefee1dd17006e4d75558f7a26982c266825de2bae9bbe",
         "9ecb8572ff38c8e3920c0448193be179b780c02b4324c8e787c7f7f44d1f8590"),
    ]
    print("\nконтроль дайджеста комьюнити (2 тройки R/S/Z):")
    for i, (rh, sh, zh) in enumerate(ctrl):
        r = int(rh, 16); s = int(sh, 16); z = int(zh, 16)
        okr = r % N == r and 1 <= r < N
        ok = verify(r, s, z)
        match = any(int(g["r"], 16) == r for g in sigs)
        print(f"  #{i}: r<N={okr} verify={ok} r_совпал с нашей подписью={match}")

    os.makedirs(TMP, exist_ok=True)
    with open(os.path.join(TMP, "ecdsa_sigs.json"), "w", encoding="utf-8") as f:
        json.dump({"addr": ADDR, "h160": H160, "spends": spends, "sigs": sigs}, f, indent=1)
    print("\nсохранено:", os.path.join(TMP, "ecdsa_sigs.json"))
    print("контроль призового ключа (h160(1*G)?? нет) — h160(d=1) =", h160_of(1)[:16], "(санити функции)")


if __name__ == "__main__":
    main()
