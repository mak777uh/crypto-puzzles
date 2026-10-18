"""H11b — чтение потока из 256 маркеров против точного ECDSA-оракула.

Носители свойств: (а) 4 таблицы SecretAdmirere (position, draw_order, side, glyph
с индексом тона 0..5); (б) CSV arturfromtheblock/emoji-mapping-tool (id, x, y,
angle_deg, radius, cp_hex + 8 зеркальных id из поста AFTB msg67039508).

Оракул (предрегистрирован в LOG.md):
  как k:  (k·G).x mod n == r  И  pub((s·k - z)·r^-1 mod n) == 02425afd…6650eb
  как d:  pub(d) == 02425afd…6650eb
Самотесты до первого кандидата: (1) восстановление подписи OP -> таргет-ключ и адрес;
(2) приват 1 -> 0279be66…; (3) синтетическая подпись с известными k0,d0 проходит
k-ветку оракула (certifies всю цепочку r/s/z/k→d).
"""
from __future__ import annotations

import csv
import json
import re
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
D = HERE.parent
sys.path.insert(0, str(HERE))
from phy_replicate import (N, P, Gx, Gy, inv, mul, point_add, magic_hash, recover,  # noqa: E402
                           segwit_addr, b58_addr)
import hashlib  # noqa: E402

TARGET_PUB = "02425afdd1716149faf414b6fdb96d5e7afc8ce42496042f4df559c80a7c6650eb"
TARGET_ADDR = "bc1qrpn28qa82uyjg37dvsz3w7wpm3kpdea957nm9p"
MIRROR_IDS = {9, 56, 81, 134, 151, 162, 172, 185}
G = (Gx, Gy)


def pubhex(d: int) -> str:
    if not (1 <= d <= N - 1):
        return ""
    x, y = mul(d, G)
    return ("02" if y % 2 == 0 else "03") + "%064x" % x


def h160(hexstr: str) -> bytes:
    b = bytes.fromhex(hexstr)
    return hashlib.new("ripemd160", hashlib.sha256(b).digest()).digest()


def load_sig():
    j = json.loads((D / "data" / "wayback" / "extracted.json").read_text(encoding="utf-8"))
    r = int(j["r"], 16)
    s = int(j["s"], 16)
    op = j["blocks"]["post_fix_oct4.html"][0]
    z = int.from_bytes(magic_hash(op.encode()), "big")
    return r, s, z, op


def selftest(r, s, z):
    rec = recover(r, s, z, 0)
    assert rec is not None, "recovery не работает"
    got = rec[0]
    assert got == TARGET_PUB, "восстановленный ключ != таргет: %s" % got
    assert segwit_addr(h160(got)) == TARGET_ADDR, "адрес != таргет"
    assert pubhex(1) == "0279be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798", "mul 1"
    # синтетика: известный k0 должен пройти k-ветку
    d0, k0 = 0x12345, 0xDEADBEEFCAFEBABE
    R = mul(k0, G)
    rr = R[0] % N
    z0 = int.from_bytes(hashlib.sha256(hashlib.sha256(b"synthetic").digest()).digest(), "big")
    s0 = (z0 + rr * d0) * inv(k0, N) % N
    assert hits_k(rr, s0, z0, k0, target=pubhex(d0)) == (True, True), "k-ветка оракула не сертифицирована"
    assert pubhex(d0) == recover(rr, s0, z0, R[1] & 1)[0], "d-ветка"
    print("самотесты оракула: OK (реальные r,s,z -> таргет; синтетика -> хит)")


def pubhex_from_point(q):
    x, y = q
    return ("02" if y % 2 == 0 else "03") + "%064x" % x


def hits_k(r, s, z, k, target=TARGET_PUB):
    """(k-условие, pubkey-условие) для кандидата k."""
    if not (1 <= k <= N - 1):
        return (False, False)
    x, y = mul(k, G)
    ok_r = (x % N) == r
    if not ok_r:
        return (False, False)
    d = (s * k - z) * inv(r, N) % N
    return (True, pubhex(d) == target)


def hits_d(d):
    return 1 <= d <= N - 1 and pubhex(d) == TARGET_PUB


# ------------------------------------------------------------------ потоки ---
def bits_from_int_list(vals, rule):
    out = []
    for v in vals:
        if rule == "parity":
            out.append(v & 1)
        elif rule == "ge3":
            out.append(1 if v >= 3 else 0)
        elif rule == "le1":
            out.append(1 if v <= 1 else 0)
        elif rule == "present":
            out.append(0 if v < 0 else 1)
        elif rule == "inv_present":
            out.append(1 if v < 0 else 0)
        elif rule == "mirror":
            out.append(v & 1)
    return out


def to_int(bits, msb_first):
    if not bits:
        return None
    v = 0
    if msb_first:
        for b in bits:
            v = (v << 1) | b
    else:
        for i, b in enumerate(bits):
            v |= b << (len(bits) - 1 - i)
    return v


def bytes_to_int(bs, msb_first):
    if len(bs) < 32:
        return None
    b = bytes(bs[:32])
    return int.from_bytes(b, "big" if msb_first else "little")


def main():
    r, s, z, op = load_sig()
    selftest(r, s, z)

    tables = json.loads((D / "data" / "secretadm_tables.json").read_text(encoding="utf-8"))
    rows_all = tables[list(tables)[0]]
    T = [rows_all[i:i + 256] for i in range(0, 1024, 256)]
    print("таблиц SecretAdmirere: %d по %d строк" % (len(T), len(T[0])))

    csvp = (D / "data/github/arturfromtheblock__emoji-mapping-tool/files"
            / "Phy Challenge Data/phy_emoji_data.csv")
    with open(csvp, encoding="utf-8-sig") as f:
        C = list(csv.DictReader(f))
    print("CSV-маркеров: %d" % len(C))

    cands = {}

    def reg(name, val, kind):
        if val is None:
            return
        cands.setdefault((kind, val), []).append(name)

    # тоны из таблиц
    for ti, tab in enumerate(T):
        tones0, tonesum, present = [], [], []
        for row in tab:
            ts = [int(x) for x in re.findall(r"\.(\d)", row["glyph"])]
            tones0.append(ts[0] if ts else -1)
            tonesum.append(sum(ts) if ts else -1)
            present.append(0 if ts else 1)
        # упорядочивание по position и по draw_order
        for label, key in (("pos", "position"), ("draw", "draw_order")):
            idx = sorted(range(256), key=lambda i: tab[i][key])
            for rule, vals in (("parity", tones0), ("ge3", tones0), ("le1", tones0),
                               ("sumpar", [0 if v < 0 else v & 1 for v in tonesum]),
                               ("noskin", present)):
                bits = bits_from_int_list([vals[i] for i in idx], rule) if rule != "noskin" else vals
                if rule == "noskin":
                    bits = list(vals)
                for msb in (True, False):
                    reg("T%d.%s.%s.%s.bit" % (ti + 1, label, rule, "msb" if msb else "lsb"),
                        to_int(bits, msb), "k")
                    reg("T%d.%s.%s.%s.bit" % (ti + 1, label, rule, "msb" if msb else "lsb"),
                        to_int(bits, msb), "d")
            # байтовые потоки: сам тон и codepoint
            cps = []
            for i in idx:
                m = re.search(r"u([0-9A-Fa-f]{4,6})", tab[i]["glyph"])
                cps.append(int(m.group(1), 16) if m else 0)
            for pname, bs in (("tone", [max(0, tones0[i]) for i in idx]),
                              ("cplow", [c & 0xFF for c in cps]),
                              ("cphigh", [(c >> 8) & 0xFF for c in cps])):
                for msb in (True, False):
                    reg("T%d.%s.%s.%s.byte" % (ti + 1, label, pname, "msb" if msb else "lsb"),
                        bytes_to_int(bs, msb), "k")
                    reg("T%d.%s.%s.%s.byte" % (ti + 1, label, pname, "msb" if msb else "lsb"),
                        bytes_to_int(bs, msb), "d")

    # CSV: id / угол / радиус, зеркальные как бит
    def order_by(keyf):
        return sorted(range(len(C)), key=lambda i: keyf(C[i]))

    orders = [("id", order_by(lambda c: int(c["id"]))),
              ("ang+", order_by(lambda c: float(c["angle_deg"]))),
              ("ang-", order_by(lambda c: -float(c["angle_deg"]))),
              ("rad+", order_by(lambda c: float(c["radius"]))),
              ("rad-", order_by(lambda c: -float(c["radius"])))]
    for oname, idx in orders:
        bits = [1 if int(C[i]["id"]) in MIRROR_IDS else 0 for i in idx]
        for msb in (True, False):
            v = to_int(bits, msb)
            reg("CSV.%s.mirror.%s" % (oname, "msb" if msb else "lsb"), v, "k")
            reg("CSV.%s.mirror.%s" % (oname, "msb" if msb else "lsb"), v, "d")
        cpl = [int(C[i]["cp_hex"].split("-")[0], 16) for i in idx]
        for pname, bs in (("cplow", [c & 0xFF for c in cpl]), ("cphigh", [(c >> 8) & 0xFF for c in cpl])):
            for msb in (True, False):
                v = bytes_to_int(bs, msb)
                reg("CSV.%s.%s.%s" % (oname, pname, "msb" if msb else "lsb"), v, "k")
                reg("CSV.%s.%s.%s" % (oname, pname, "msb" if msb else "lsb"), v, "d")

    print("уникальных кандидатов: %d (имённых потоков %d)" % (len(cands), sum(len(v) for v in cands.values())))
    hits = []
    n = 0
    for (kind, val), names in cands.items():
        n += 1
        if kind == "k":
            a, b = hits_k(r, s, z, val)
            if a:
                hits.append(("k", val, names, b))
        else:
            if hits_d(val):
                hits.append(("d", val, names, True))
    print("проверено %d кандидатов, хитов %d" % (n, len(hits)))
    for h in hits:
        print("!!! ХИТ", h[0], hex(h[1]), h[2], "pub-ok=", h[3])
    (D / "data" / "h11b_result.json").write_text(json.dumps(
        {"tested": n, "unique": len(cands), "hits": [[h[0], "%x" % h[1], h[2], h[3]] for h in hits],
         "streams": {str(k[1])[:16]: v for k, v in list(cands.items())[:0]}},
        ensure_ascii=False, indent=1), encoding="utf-8")
    if not hits:
        print("негатив: ни один из упорядоченных потонов (тон/зеркальность/codepoint) "
              "не даёт ни k (условие r), ни d (условие pubkey).")


if __name__ == "__main__":
    main()
