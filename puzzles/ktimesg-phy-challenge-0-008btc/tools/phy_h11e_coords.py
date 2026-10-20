# -*- coding: utf-8 -*-
"""H11e — координаты эмодзи-маркеров как скаляр: k / d / c=d/k против ECDSA-оракула.

Пререгистрация: LOG.md 2026-10-19 11:52 UTC. Хит печатается в консоль и НЕ сохраняется в репозиторий.
"""
import csv, json, sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
sys.path.insert(0, str(HERE))
import phy_h11d_cratio as H  # noqa: E402

N = H.N
D = HERE.parent
CSVP = (D / "data/github/arturfromtheblock__emoji-mapping-tool/files"
        / "Phy Challenge Data/phy_emoji_data.csv")
OUT = D / "data/h11e_coords_result.json"


def pack_bits(bits, msb=True):
    bits = bits[:256]
    if len(bits) < 256:
        return None
    out = bytearray(32)
    if msb:
        for i, b in enumerate(bits):
            if b:
                out[i // 8] |= 0x80 >> (i % 8)
    else:
        for i, b in enumerate(bits):
            if b:
                out[i // 8] |= 1 << (i % 8)
    return int.from_bytes(out, "big")


def pack_bytes(vals, big=True):
    if len(vals) < 32:
        return None
    return int.from_bytes(bytes(v & 0xFF for v in vals[:32]), "big" if big else "little")


def main():
    r, s, z, _ = H.load_sig()
    H.selftest(r, s, z)

    rows = list(csv.DictReader(open(CSVP, encoding="utf-8-sig")))
    fields = {
        "x": [int(float(q["x"])) for q in rows],
        "y": [int(float(q["y"])) for q in rows],
        "cx": [int(round(float(q["cx"]))) for q in rows],
        "cy": [int(round(float(q["cy"]))) for q in rows],
        "w": [int(float(q["w"])) for q in rows],
        "h": [int(float(q["h"])) for q in rows],
    }
    idx = {
        "id": sorted(range(len(rows)), key=lambda i: int(rows[i]["id"])),
        "angle+": sorted(range(len(rows)), key=lambda i: float(rows[i]["angle_deg"])),
        "angle-": sorted(range(len(rows)), key=lambda i: -float(rows[i]["angle_deg"])),
        "radius+": sorted(range(len(rows)), key=lambda i: float(rows[i]["radius"])),
        "radius-": sorted(range(len(rows)), key=lambda i: -float(rows[i]["radius"])),
        "x+": sorted(range(len(rows)), key=lambda i: fields["x"][i]),
        "y+": sorted(range(len(rows)), key=lambda i: fields["y"][i]),
    }

    cands = {}

    def reg(name, val):
        if val is None:
            return
        cands.setdefault(val, []).append(name)

    for oname, order in idx.items():
        for fname, vals0 in fields.items():
            vals = [vals0[i] for i in order]
            for b in (0, 1, 2):
                bits = [(v >> b) & 1 for v in vals]
                for msb in (True, False):
                    reg(f"{oname}.{fname}.bit{b}.{'msb' if msb else 'lsb'}", pack_bits(bits, msb))
            for big in (True, False):
                reg(f"{oname}.{fname}.lo8.{'msb' if big else 'lsb'}", pack_bytes([v & 0xFF for v in vals], big))
                reg(f"{oname}.{fname}.hi8.{'msb' if big else 'lsb'}",
                    pack_bytes([(v >> 8) & 0xFF for v in vals], big))
            dif = [(vals[i + 1] - vals[i]) & 0xFF for i in range(len(vals) - 1)]
            for big in (True, False):
                reg(f"{oname}.{fname}.diff.{'msb' if big else 'lsb'}", pack_bytes(dif, big))

    tested = 0
    hits = []
    for val, names in cands.items():
        if not (1 <= val <= N - 1):
            continue
        tested += 1
        a, b = H.hits_k(r, s, z, val)
        if b:
            hits.append(("k", val, names))
        if H.hits_d(val):
            hits.append(("d", val, names))
        a, b = H.hits_c(r, s, z, val)
        if b:
            hits.append(("c", val, names))

    print("уникальных скаляров в диапазоне: %d, хитов: %d" % (tested, len(hits)))
    for kind, val, names in hits:
        # ключ — только в консоль, не в файл
        print("!!! ХИТ %s %064x %s" % (kind, val, names[:6]))
    json.dump({"tested": tested, "hits": len(hits),
               "hit_names": [h[2][:6] for h in hits]},
              open(OUT, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    if not hits:
        print("негатив H11e: координаты/разности в 7 порядках не дают ни k, ни d, ни c.")


if __name__ == "__main__":
    main()
