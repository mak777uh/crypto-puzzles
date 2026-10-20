"""Extract published hint text from the live smithlylemoore.com pages saved in ./site/.

Read-only helper for the H7 community research pass. Writes site/site_texts.json.
"""
import re
import glob
import html
import os
import json

TEXT_FIELD = re.compile(r'"text":"(.*?)"')
TAGS = re.compile(r'<[^>]+>')
BOILER = ('wix', 'javascript', 'cookie', 'privacy policy', 'terms')


def clean(s):
    try:
        s = s.encode('utf-8', 'ignore').decode('unicode_escape', 'ignore')
    except Exception:
        pass
    s = s.replace('\\n', ' ').replace('\\"', '"')
    s = TAGS.sub(' ', s)
    return re.sub(r'\s+', ' ', s).strip()


def main():
    out = {}
    for path in sorted(glob.glob(os.path.join('site', '*.html'))):
        raw = open(path, encoding='utf-8', errors='ignore').read()
        cand = set()
        for m in TEXT_FIELD.finditer(raw):
            s = clean(m.group(1))
            if len(s) < 4 or s.startswith('http'):
                continue
            if any(b in s.lower() for b in BOILER):
                continue
            cand.add(s)
        body = re.sub(r'(?is)<(script|style)[^>]*>.*?</\1>', '', raw)
        lines = [html.unescape(x).strip() for x in TAGS.sub('\n', body).split('\n')]
        seen, keep = set(), []
        for l in lines:
            if l and l not in seen:
                seen.add(l)
                keep.append(l)
        name = os.path.basename(path)[:-5]
        out[name] = {'json_texts': sorted(cand, key=len, reverse=True)[:40],
                     'visible_lines': keep[:150]}
        print('=====', name)
        for t in sorted(cand, key=len, reverse=True)[:15]:
            print('  *', t[:260])
    with open(os.path.join('site', 'site_texts.json'), 'w', encoding='utf-8') as fh:
        json.dump(out, fh, ensure_ascii=False, indent=1)


if __name__ == '__main__':
    main()
