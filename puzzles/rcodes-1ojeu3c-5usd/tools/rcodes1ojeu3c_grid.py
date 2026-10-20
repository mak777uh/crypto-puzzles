# -*- coding: utf-8 -*-
"""r/codes 1ojeu3c: сеточные чтения (ширины 2-40, 8 симметрий, спираль, диагонали),
по сырому тексту и по ROT13. Скоринг по английским триграммам. AutoClaw, 19.10.2026."""
import codecs
CT = ("HLYMAIB1NAEAFTPESIYEAIVAWKOD147LEONEMSANA_XROHAFTVESRHEROEN325TITGSVHTKPSOULRCADAYTTMASNRO691"
      "YRNOLOEEYRTPZZEEETBRSIJEASBN810ISNGDIOTERAEYRDAUTTEMHRAEUKCYTUEDIEHTSBEVYSOTEBITGSCUHDQRILIWHSSTITSDNSGYETETDENIETMSEGHDSRIUBITUNOAUNIKSROAHERCPDSEASRAETLLBWTIFHSOTAHETTAOYBHIFTCCAMOXE25TAHICOOEPTDEXC?NUTEESOTRKCYD143")
TRIG = ["the","and","ing","ion","ent","for","her","tha","nth","int","ere","tio","ter","est","ers",
        "ati","hat","ate","all","eth","hes","ver","his","oft","ith","fth","sth","oth","res","ont",
        "one","two","you","that","this","with","have","from","they","would","there","which","ould",
        "ight","twil","time","just","know","like","some","then","than","them","more","only"]
def score(s):
    s = s.lower(); return sum(s.count(t) for t in TRIG)

def grid_reads(text, w):
    n = len(text); h = (n + w - 1)//w
    rows = [text[i*w:(i+1)*w].ljust(w) for i in range(h)]
    out = {}
    out["cols"] = ''.join(''.join(r[c] for r in rows) for c in range(w))
    out["cols_rev"] = ''.join(''.join(r[c] for r in rows) for c in reversed(range(w)))
    out["cols_each_rev"] = ''.join(''.join(r[c] for r in reversed(rows)) for c in range(w))
    out["rows"] = ''.join(rows)
    out["rows_rev"] = ''.join(reversed(rows))
    g = [list(r) for r in rows]
    res = []
    top, bot, left, right = 0, h-1, 0, w-1
    while top <= bot and left <= right:
        for c in range(left, right+1): res.append(g[top][c])
        top += 1
        for r in range(top, bot+1): res.append(g[r][right])
        right -= 1
        if top <= bot:
            for c in range(right, left-1, -1): res.append(g[bot][c])
            bot -= 1
        if left <= right:
            for r in range(bot, top-1, -1): res.append(g[r][left])
            left += 1
    out["spiral"] = ''.join(res)
    diag = []
    for s in range(h+w-1):
        for r in range(h):
            c = s - r
            if 0 <= c < w: diag.append(g[r][c])
    out["diag"] = ''.join(diag)
    adiag = []
    for s in range(h+w-1):
        for r in range(h):
            c = s - r
            if 0 <= c < w: adiag.append(g[h-1-r][c])
    out["adiag"] = ''.join(adiag)
    return out

if __name__ == "__main__":
    best = []
    for tname, T in [("raw", CT), ("rot13", codecs.encode(CT, "rot13"))]:
        for w in range(2, 41):
            for rname, s in grid_reads(T, w).items():
                best.append((score(s), "%s w=%d %s" % (tname, w, rname), s[:90]))
    best.sort(key=lambda x: -x[0])
    for b in best[:12]:
        print(b[0], b[1]); print("   ", b[2])
