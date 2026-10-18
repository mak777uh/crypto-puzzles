# -*- coding: utf-8 -*-
# gsmg_thirddoor_batch_2026-10-17.py — (AutoClaw)
# Батч против "третьей двери" 1NULY7DhzuNvSDtPkFzNo6oRTZQWBqXNE9 и всех посаженных адресов.
# Конвенции сертифицированы на 5/5 известных preimage:
#   sha256(preimage)                         -> 1Jqq37(causality), 1AD2wfw(flower), 1K23RS(jacquefresco)
#   raw_left (ASCII<=32, нули слева)         -> NEO1 (gsmg.io/theseedisplanted)
#   bits192_left (192 бита строки наоборот)  -> NEO2
# Семейства: перестановки 1..7 токенов (x {'', ' '} x lower/UPPER/Title), перестановки 6 уникальных
# токенов, чтения dropped29, даты, challenge-строки, словарь токенов/ответов <=32 байт.
# Итог: 44,326 ключей, все попадания = 5 известных witness-ов, новых 0.
# Зависимости: coincurve. Вход dropped29: data/s570_bifid_2026-10-17.txt.
import hashlib, itertools, io, os, sys
from coincurve import PrivateKey
def h160(pub): return hashlib.new('ripemd160', hashlib.sha256(pub).digest()).digest()
def b58(data):
    alpha='123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz'
    n=int.from_bytes(data,'big'); s=''
    while n: n,r=divmod(n,58); s=alpha[r]+s
    pad=len(data)-len(data.lstrip(b'\x00'))
    return '1'*pad+s
def b58check(p): return b58(p+hashlib.sha256(hashlib.sha256(p).digest()).digest()[:4])
def addrs(key32):
    pk=PrivateKey(key32)
    c=pk.public_key.format(compressed=True); u=b'\x04'+pk.public_key.format(compressed=False)[1:]
    return b58check(b'\x00'+h160(c)), b58check(b'\x00'+h160(u))
def bitsrev(b):
    n=int.from_bytes(b,'big'); nb=len(b)*8; r=0
    for i in range(nb): r=(r<<1)|((n>>i)&1)
    return r.to_bytes(len(b),'big')
TARGETS={
 'THIRD_DOOR':'1NULY7DhzuNvSDtPkFzNo6oRTZQWBqXNE9',
 'PRIZE':'1GSMG1JC9wtdSwfwApgj2xcmJPAwx7prBe',
 '1AD2wfw':'1AD2wfwXukZ1kUAy848hTQQ72aSBZPB75r',
 '1Jqq37':'1Jqq37KkZEt4F3Dt6qXdtyiMEFBBdawbkJ',
 '1M5ypv':'1M5ypvDbp124ZtKPbg3GJg1JqNs1x7TPoN',
 '1K23RS':'1K23RS1y2fnuZRkhw5nUpFr5Jk5WN11Zeq',
 '18Cchr':'18CchrjA3Uzfrzy4DFqao9ric6YfK4hjdc',
 '1GyT5W':'1GyT5WrLYpwFkuiVoPDJZa1Q6jtjbjuBff',
 'NEO1':'148XH2YBmLr4oAJXQcG84FpNYoBmqnVPHQ',
 'NEO2':'13HGhjkmKUkP8sk9k63BLmhkxRjy7uK4Rp',
}
TSET=set(TARGETS.values())
def constructions(s):
    b=s.encode() if isinstance(s,str) else s
    out={'sha256':hashlib.sha256(b).digest()}
    if len(b)<=32:
        out['raw_left']=b.rjust(32,b'\x00')
        out['raw_right']=b.ljust(32,b'\x00')
        out['bits192_left']=bitsrev(b).rjust(32,b'\x00')
        out['bits192_right']=bitsrev(b).ljust(32,b'\x00')
        out['bytes_rev']=b[::-1].rjust(32,b'\x00')
    return out
tokens=['matrixsumlist','enter','lastwordsbeforearchichoice','thispassword','matrixsumlist','yourlastcommand','secondanswer']
uniq6=['matrixsumlist','enter','lastwordsbeforearchichoice','thispassword','yourlastcommand','secondanswer']
strs=set()
for k in range(1,8):
    for p in set(itertools.permutations(tokens,k)):
        for sep in ('',' '):
            base=sep.join(p); strs.add(base); strs.add(base.upper()); strs.add(base.title())
for k in range(1,7):
    for p in itertools.permutations(uniq6,k):
        for sep in ('',' '):
            base=sep.join(p); strs.add(base); strs.add(base.upper())
dropped='OOIIOOOIIOOIOIIOIOOOOIOIIOIOI'
for one in 'IO':
    bits=''.join('1' if ch==one else '0' for ch in dropped)
    strs.add(bits); strs.add(bits[::-1]); strs.add(str(int(bits,2))); strs.add(format(int(bits,2),'x'))
    strs.add(format(int(bits,2),'08x')); strs.add(format(int(bits,2),'08X'))
dates=['2020-04-07','07.04.2020','20200407','04/07/2020','2020-04-08','20200408','2020-04-03','20200403','2020-03-24','20200324','2020-01-14','20200114','2020-12-10','20201210','2021-05-06','2021-12-02','2023-02-23','2026-07-12']
for d in dates: strs.add(d); strs.add(d.replace('-','')); strs.add(d.replace('-','/'))
prize='1GSMG1JC9wtdSwfwApgj2xcmJPAwx7prBe'; van='3GSMG24TujqfMJG1kQoBX18DzJHQLeJYMK'
for b in ['GSMGIO5BTCPUZZLECHALLENGE','GSMG.IO 5 BTC PUZZLE CHALLENGE','gsmg.io 5 btc puzzle challenge','GSMGIO5BTCPUZZLE','the gsmg.io puzzle']:
    strs.add(b); strs.add(b[::-1]); strs.add(b+prize); strs.add(prize+b); strs.add(b+van); strs.add(van+b)
vocab=['matrixsumlist','enter','lastwordsbeforearchichoice','thispassword','yourlastcommand','secondanswer','causality','theone','keymakers','ourfirsthintisyourlastcommand','shabefourfirsthintisyourlastcommand','choiceisanillusion','thereisnospoon','thematrixhasyou','followthewhiterabbit','follow the white rabbit','theseedisplanted','theflowerblossomsthroughwhatseemstobeaconcretesurface','the flower blossoms through what seems to be a concrete surface','jacquefrescogiveitjustonesecondheisenbergsuncertaintyprinciple','salvation','anotherdoor','thereisanotherdoor','half','betterhalf','yinyang','dualite','Dualite','DUALITE','archichoice','thearchitectchoice','the architect choice','thepassword','password','thesecondanswer','verification','thirddoor','the third door','gsmg.io/theseedisplanted','matrixsumlistenterlastwordsbeforearchichoicethispasswordmatrixsumlist','shabef','yellowhasanumberandsodoesblue','yellow has a number and so does blue','zeroedout','primes']
strs.update(vocab)
hits=[]; total=0
for s in strs:
    for cname,k in constructions(s).items():
        total+=1
        a_c,a_u=addrs(k)
        if a_c in TSET: hits.append((s[:80],cname,a_c,'compressed'))
        if a_u in TSET: hits.append((s[:80],cname,a_u,'uncompressed'))
print('keys:',total,'hits:',len(hits))
for h in hits: print('HIT',h)
