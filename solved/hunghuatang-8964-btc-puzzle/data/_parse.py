import json,re,os
here=os.path.dirname(os.path.abspath(__file__))
d=json.load(open(os.path.join(here,'comments_1tw7glw.json'),encoding='utf-8'))
data=d.get('data') if isinstance(d,dict) else d
print('n comments:', len(data or []))
seen=set()
for c in (data or []):
    b=c.get('body','') or ''
    ad=re.findall(r'bc1q[a-z0-9]{20,60}|[13][a-km-zA-HJ-NP-Z1-9]{25,34}',b)
    for a in ad: seen.add(a)
    if ad or re.search(r'complete seed|word 24|acoustic|solved|claim|sent|thank|reward',b,re.I):
        print('>>',c.get('author'),ad,'::',repr(b)[:220])
print('ADDR_UNIQ:',sorted(seen)[:25])
