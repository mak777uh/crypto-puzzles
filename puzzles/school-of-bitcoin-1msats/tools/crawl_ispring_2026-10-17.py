# -*- coding: utf-8 -*-
# iSpring crawler for schoolofbitcoin.com (2026-10-17, AutoClaw)
# Скачивает index.html каждого пакета, распаковывает presInfo (zlib+base64),
# скачивает все slideN.js, распаковывает их и грепает тексты/alt/медиа.
import urllib.request, re, base64, zlib, json, os, sys

def get(url):
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    return urllib.request.urlopen(req, timeout=60).read()

def crawl(base, outdir):
    os.makedirs(outdir, exist_ok=True)
    html = get(base).decode('utf-8', 'replace')
    open(os.path.join(outdir, 'index.html'), 'w', encoding='utf-8').write(html)
    m = re.search(r'var presInfo = "([^"]+)"', html)
    if not m:
        print('no presInfo at', base); return
    pres = json.loads(zlib.decompress(base64.b64decode(m.group(1))))
    json.dump(pres, open(os.path.join(outdir, 'pres.json'), 'w', encoding='utf-8'))
    print(base, '->', len(pres['s']), 'slides, title:', pres.get('t'))
    binpat = re.compile(r'alt="((?:[01]{8} ?){8,})')
    for i, s in enumerate(pres['s']):
        src = s.get('s', '')
        if not src: continue
        url = base.rsplit('/', 1)[0] + '/' + src if '/' in base else base + src
        try:
            d = get(url)
        except Exception as e:
            print('  ERR', src, e); continue
        open(os.path.join(outdir, 'slide%03d.js' % (i + 1)), 'wb').write(d)
        t = d.decode('utf-8', 'replace')
        for mm in re.finditer(r'"(eNr[A-Za-z0-9+/=]+)"', t):
            try:
                t += '\n' + zlib.decompress(base64.b64decode(mm.group(1))).decode('utf-8', 'replace')
            except Exception:
                pass
        for bm in binpat.finditer(t):
            raw = bm.group(1).replace('\\', '').strip()
            txt = ''.join(chr(int(b, 2)) for b in raw.split() if len(b) == 8)
            print('  BINARY ALT slide%d -> %s' % (i + 1, txt[:200]))

if __name__ == '__main__':
    for p in ['https://schoolofbitcoin.com/',
              'https://schoolofbitcoin.com/what-is-money/index.html',
              'https://schoolofbitcoin.com/what-is-bitcoin/index.html']:
        crawl(p, os.path.join('sob_crawl', p.split('//')[1].replace('/', '_') or 'root'))
