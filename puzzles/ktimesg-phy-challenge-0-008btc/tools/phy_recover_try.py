# -*- coding: utf-8 -*-
"""phy: перебор вариантов текста OP (десятки, не перебор) -> magic-hash -> восстановление pubkey.
Хит = pk == 02425afd…6650eb (ончейн-подтверждённый ключ целевого адреса)."""
import base64, hashlib, json, os, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from phy_replicate import magic_hash, recover, segwit_addr, TARGET_PK, TARGET_ADDR

d = json.load(open(os.path.join(os.path.dirname(__file__), "..", "data", "wayback", "extracted.json"), encoding="utf-8"))
sig = base64.b64decode(d["sig_b64"] + "=")
r = int.from_bytes(sig[1:33], "big"); s = int.from_bytes(sig[33:65], "big")
T0 = d["blocks"]["post_fix_oct4.html"][0]
T1 = d["blocks"]["post_fix_oct4.html"][1]
print("r=%x" % r); print("s=%x" % s)

variants = {
    "T0": T0,
    "T0+LF": T0 + "\n",
    "T0+2LF": T0 + "\n\n",
    "T0.strip": T0.strip(),
    "T0+2LF+sigline": T0 + "\n\n" + T1,
    "T0 single-LF-paragraphs": T0.replace("\n\n", "\n"),
    "T0 CRLF": T0.replace("\n", "\r\n"),
    "T0 CRLF+LF": T0.replace("\n", "\r\n") + "\r\n",
    "T0 no trailing .": T0[:-1],
}
found = []
for name, msg in variants.items():
    m = msg.encode("utf-8")
    z = int.from_bytes(magic_hash(m), "big")
    for recid in range(4):
        out = recover(r, s, z, recid)
        if out:
            pk, _ = out
            addr = segwit_addr(hashlib.new("ripemd160", hashlib.sha256(bytes.fromhex(pk)).digest()).digest())
            ok = pk == TARGET_PK
            print("%-24s len=%4d recid=%d pk=%s…%s addr=%s %s" % (name, len(m), recid, pk[:12], pk[-6:], addr[:16], "MATCH" if ok else ""))
            if ok:
                found.append((name, addr))
print("MATCHES:", found)
print("target addr check:", segwit_addr(hashlib.new("ripemd160", hashlib.sha256(bytes.fromhex(TARGET_PK)).digest()).digest()) == TARGET_ADDR)
