# -*- coding: utf-8 -*-
"""H8 шаг 11: кто хостит три PNG со UserComment=ASCIIScreenshot и какой у них alt/контекст."""
import pathlib, re, json, urllib.parse

ROOT = pathlib.Path(r"C:/Users/Admin/OneDrive/Desktop/master/puzzles/smith-lyle-moore-hunt-2-0-032btc")
targets = ["52b07010edf4458baa06a821f578df73", "7541577c5aff4ccbb112dcfe10965f80",
           "8e8262f6c7d94ae082499d651438a5d2", "ad1d0fada11947c888047ff55a410976",
           "d6531231cbd742c3aaa926cdf65468a0", "14170c6550e6455f86c0eaca905c5922",
           "12668e416a1f43be8904c8605637ceee", "2ba991114f8a4afe84df3d95b9521bf2",
           "357dfb1de9f248eaa5d3fd3283b1dd64", "e30067e9859d4ee8976515590a8e9865",
           "d989475c36474e97b01704d245236cef"]
pagemap = json.load(open(ROOT / "data/h2c_pagemap.json", encoding="utf-8"))
pm_txt = json.dumps(pagemap, ensure_ascii=False)

for h in targets:
    srcs = []
    for p in ROOT.rglob("*"):
        if not p.is_file() or p.suffix.lower() not in (".json", ".html", ".txt", ".md", ".log", ".xml"):
            continue
        if p.stat().st_size > 8_000_000:
            continue
        t = urllib.parse.unquote(p.read_text(encoding="utf-8", errors="ignore"))
        if h in t:
            srcs.append(str(p.relative_to(ROOT))[:58])
            # alt/name рядом
            for m in re.finditer(h, t):
                ctx = t[m.start():m.start() + 700]
                alt = re.findall(r'"(?:alt|name|title|description)"\s*:\s*"([^"]{1,80})"', ctx)
                if alt:
                    srcs.append("      alt/name: " + " | ".join(dict.fromkeys(alt))[:150])
                    break
    print("### %s" % h)
    for s in srcs[:6]:
        print("   ", s)
    print()
