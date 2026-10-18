# -*- coding: utf-8 -*-
"""phy: собрать все внешние ссылки-картинки треда (чужие чтения картинки) из Wayback-дампов."""
import re, glob, json

urls = set()
pat = re.compile(r'https?://(?:www\.)?(?:talkimg\.com|imgur\.com|i\.imgur\.com)[^\s"<>\x27]+')
for f in glob.glob('data/wayback/page_*.html'):
    s = open(f, encoding='utf-8', errors='replace').read()
    for u in pat.findall(s):
        u = u.rstrip('\\/;,.)').replace('&amp;', '&')
        urls.add(u)
for u in sorted(urls):
    print(u)
print('total', len(urls))
json.dump(sorted(urls), open('data/wayback/ext_links.json', 'w'), indent=1)
