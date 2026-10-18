"""H11a (финал) — пароль PGP-блока. Кандидаты приоритизированы, прогон параллельный.

Оракул: gpg 2.4.9, сертифицирован на эталоне, созданном этим же gpg с идентичными
параметрами (AES-256 / SHA-512 / iterated+salted count 65011712): верный пароль ->
rc=0 и точные 24 байта открытого текста; неверный -> rc=2 и пустой вывод.
(Собственная реализация S2K в phy_pgp_lib.py сертификацию НЕ прошла — она остаётся
только для разбора структуры/CRC; подбор ведётся через gpg.)

Ось (предрегистрирована в LOG.md): пароль «уже упомянут» (хинт 21.06 «the password's
already mentioned») — перебор только по упоминаниям из самих материалов загадки:
P0 якоря OP/приза/мета-хинта и их написания; P1 строки кодового блока OP;
P2 биграммы/триграммы/4-граммы OP-текста; P3 CAPS-токены темы; P4 уникальные слова темы.
"""
from __future__ import annotations

import json
import re
import subprocess
import sys
import time
from multiprocessing import Pool
from pathlib import Path

HERE = Path(__file__).resolve().parent
D = HERE.parent
WB = D / "data" / "wayback"
REF = D / "data" / "pgp_ref"
GPG = r"C:\Program Files\Git\usr\bin\gpg.exe"
BLOB = REF / "phy.pgp"
WALL_CLOCK_S = 700
NWORKERS = 16
sys.path.insert(0, str(HERE))


def gpg_decode(arg):
    passphrase, name = arg
    out = REF / ("o_%s.bin" % name)
    if out.exists():
        out.unlink()
    try:
        p = subprocess.run([GPG, "--batch", "--quiet", "--no-tty", "--pinentry-mode", "loopback",
                            "--passphrase-fd", "0", "-d", "--output", str(out), str(BLOB)],
                           input=passphrase.encode() + b"\n", stdout=subprocess.PIPE,
                           stderr=subprocess.PIPE, timeout=200)
        rc = p.returncode
    except Exception as exc:  # noqa: BLE001
        return passphrase, -1, repr(exc)[:120], ""
    data = out.read_bytes() if out.exists() else b""
    if out.exists():
        out.unlink()
    if rc == 0 and data:
        return passphrase, 0, data.decode("utf-8", "replace"), "HIT"
    return passphrase, rc, "", ""


def selftest():
    from phy_pgp_lib import blob
    BLOB.write_bytes(blob())
    out = REF / "o_selftest.bin"
    ref = REF / "ref.pgp"
    good = bad = False
    for pw, want in ((b"S3cretRefPass", True), (b"S3cretRefPas1", False)):
        if out.exists():
            out.unlink()
        p = subprocess.run([GPG, "--batch", "--quiet", "--no-tty", "--pinentry-mode", "loopback",
                            "--passphrase-fd", "0", "-d", "--output", str(out), str(ref)],
                           input=pw, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        data = out.read_bytes() if out.exists() else b""
        if want:
            good = p.returncode == 0 and data == b"REFERENCE-PLAINTEXT-24B"
        else:
            bad = p.returncode != 0 and not data
    if out.exists():
        out.unlink()
    print("САМОТЕСТ оракула: верный->%s  неверный->%s  blob=%d байт"
          % (good, bad, BLOB.stat().st_size))
    assert good and bad, "оракул не сертифицирован"


def harvest():
    pr = {}

    def add(s, prio):
        if not s:
            return
        s = s.strip()
        if not (1 <= len(s) <= 120):
            return
        if s not in pr or prio < pr[s]:
            pr[s] = prio

    from phy_replicate import code_blocks
    blocks = code_blocks(WB / "pre_fix.html")
    op = blocks[0] if blocks else ""
    print("OP-блок: %d символов" % len(op))
    lines = [re.sub(r"\s+", " ", l).strip() for l in op.split("\n")]
    for l in lines:
        if 4 <= len(l) <= 100:
            add(l, 1)
            add(l.lower(), 1)
            add(re.sub(r"\s+", "", l), 1)
            if l.endswith("."):
                add(l[:-1], 1)

    toks = re.findall(r"[A-Za-z][A-Za-z0-9'-]{1,}", " ".join(lines))
    for n in (2, 3, 4):
        for i in range(max(0, len(toks) - n + 1)):
            g = toks[i:i + n]
            add(" ".join(g), 2)
            add("".join(g).lower(), 2)
            add("-".join(g), 2)

    anchors = [
        "phy", "Phy", "PHY", "Phy Challenge", "phy challenge", "PhyChallenge",
        "ktimesg", "kTimesG", "KTimesG", "ktimesgphy", "phyllotaxis",
        "UrS0Mq", "talkimg", "800000", "0.008", "0,008", "256", "65011712",
        "5708258122f19519", "5584952", "66802369", "66860784",
        "no loose ends", "no hashing", "loose ends", "hashing",
        "modular values", "spacestamps", "spacestamp", "phylo", "phylo-based",
        "proof-of-equivalence", "proof of equivalence", "peer-to-peer",
        "fractional reserve banking", "private key recovery", "digital signatures",
        "trusted third party", "password", "already mentioned",
        "the password's already mentioned", "useful sign", "final useful sign",
        "A final useful sign", "BEGIN PGP MESSAGE", "PGP MESSAGE", "pgp",
        "backspace", "BACKSPACE", "backspace cat", "ascii 8", "ascii8", "cat",
        "flabit", "Zephyrus", "zephyrus", "Mox", "mox", "gvonys", "kbZ", "fhelucrM",
        "mox zephyrus flabit", "flabit zephyrus mox", "Zephyrus Mox", "MoxZephyrus",
        "cracking face", "cracking", "abacus", "clap", "clapping", "spiral",
        "Fibonacci", "golden angle", "137.5", "skin tone", "skintone", "recoloring",
        "redrawn", "emoji", "emojis", "smart approach", "4 milliseconds",
        "inside-out", "inside out", "bitcoin", "Bitcoin", "sats", "800 000 sats",
        "bearish", "bearish cycle", "worst weekly fall", "2022", "2026-06-05",
        "02425afdd1716149faf414b6fdb96d5e7afc8ce42496042f4df559c80a7c6650eb",
        "J0d1vHyLWQXkQWZBhfQmZWu8jgXA54DgLx+bPJQNBrL4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAABbiQspK6Gr2bE",
    ]
    for a in anchors:
        add(a, 0)
        for v in (a.replace(" ", ""), a.replace(" ", "-"), a.replace(" ", "_"),
                  a.replace("-", ""), a.lower(), a.capitalize(), a.upper(), a.title(),
                  a.replace(",", ".")):
            add(v, 0)

    thread = (WB / "thread.txt").read_text(encoding="utf-8", errors="replace")
    for w in sorted(set(re.findall(r"\b[A-Z][A-Za-z0-9_]{2,25}\b", thread)))[:220]:
        add(w, 3)
    cnt = {}
    for w in re.findall(r"[A-Za-z][A-Za-z0-9_.+-]{2,30}", thread):
        cnt[w] = cnt.get(w, 0) + 1
        cnt[w.lower()] = cnt.get(w.lower(), 0) + 1
    for w in sorted([w for w, c in cnt.items() if c == 1], key=len)[:300]:
        add(w, 4)

    return sorted(pr, key=lambda s: (pr[s], len(s), s)), pr


def main():
    selftest()
    cands, pr = harvest()
    byp = {p: sum(1 for c in cands if pr[c] == p) for p in sorted(set(pr.values()))}
    print("кандидатов: %d, по приоритетам %s" % (len(cands), byp))
    (D / "data" / "pgp_pass_candidates.json").write_text(
        json.dumps([{"p": pr[c], "s": c} for c in cands], ensure_ascii=False, indent=1), encoding="utf-8")
    if "--prep" in sys.argv:
        return
    t0 = time.time()
    hits = []
    done = 0
    work = [(c, str(i)) for i, c in enumerate(cands)]
    with Pool(NWORKERS) as pool:
        for passph, rc, data, tag in pool.imap_unordered(gpg_decode, work, chunksize=1):
            done += 1
            if tag == "HIT":
                hits.append((passph, data))
                print("*** ХИТ: пароль %r -> %r" % (passph, data), flush=True)
            el = time.time() - t0
            if done % 100 == 0:
                print("  %d/%d, %.0f с, хитов %d" % (done, len(cands), el, len(hits)), flush=True)
            if el > WALL_CLOCK_S:
                print("ПОТОЛОК %d с: покрыто %d/%d" % (WALL_CLOCK_S, done, len(cands)), flush=True)
                pool.terminate()
                break
    el = time.time() - t0
    print("\nитог: кандидатов %d, проверено %d, времени %.1f с, хитов %d"
          % (len(cands), done, el, len(hits)))
    (D / "data" / "pgp_sweep_result.json").write_text(json.dumps(
        {"n": len(cands), "tested": done, "seconds": round(el, 1),
         "hits": [[a, b] for a, b in hits]}, ensure_ascii=False, indent=1), encoding="utf-8")


if __name__ == "__main__":
    main()
