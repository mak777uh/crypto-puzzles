# -*- coding: utf-8 -*-
"""Inspect jetkc_page.json for isHidden:true items and mobile-only text."""
import io
import json
import re

P = r"C:\111\jetkc_page.json"
with io.open(P, encoding="utf-8") as f:
    raw = f.read()
d = json.loads(raw)

print("=== isHidden ===")
for m in re.finditer(r'"isHidden"\s*:\s*(true|false)', raw):
    pass
tru = len(re.findall(r'"isHidden"\s*:\s*true', raw))
fal = len(re.findall(r'"isHidden"\s*:\s*false', raw))
print("isHidden true : %d" % tru)
print("isHidden false: %d" % fal)

# every item that is hidden, with its text/label if any
print("\n=== скрытые элементы (контекст) ===")
for m in re.finditer(r'\{[^{}]{0,600}"isHidden"\s*:\s*true[^{}]{0,600}\}', raw):
    frag = m.group(0)
    ids = re.findall(r'"id"\s*:\s*"([^"]{1,60})"', frag)
    txt = re.findall(r'"(?:text|label)"\s*:\s*"([^"]{1,200})"', frag)
    print("  * id=%s text=%s" % (ids[:2], txt[:2]))

# collect all ids and texts
print("\n=== mobile_* ids ===")
mob = sorted(set(re.findall(r'"(mobile_[^"]{1,60})"', raw)))
print("  count: %d" % len(mob))
for x in mob[:40]:
    print("   " + x)

# all text/label values, split into mobile vs desktop by proximity to mobile_ ids
print("\n=== все уникальные значения text/label ===")
texts = re.findall(r'"(?:text|label)"\s*:\s*"((?:[^"\\]|\\.){1,400})"', raw)
uniq = []
for t in texts:
    t2 = re.sub(r"<[^>]+>", " ", t)
    t2 = re.sub(r"\s+", " ", t2).replace("&#39;", "'").strip()
    if t2 and t2 not in uniq:
        uniq.append(t2)
for t in uniq:
    print("   - %s" % t[:250])

# any clue-ish tokens
print("\n=== подозрительные токены (числа/слова-пароли) ===")
for pat in (r'\b\d{6,12}\b', r'pass\w*', r'[a-z]{4,}\d{2,}'):
    found = sorted(set(re.findall(pat, raw, re.I)))[:25]
    print("  %-18s %s" % (pat, found))
