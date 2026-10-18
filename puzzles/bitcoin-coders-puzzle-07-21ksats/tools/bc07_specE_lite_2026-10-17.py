# -*- coding: utf-8 -*-
# bc07_specE_lite_2026-10-17.py — (AutoClaw) specE-lite для Bitcoin Coders #07
# Пространство: 2 гипотезы порядка (строки/колонки) x слоты-кандидаты из досье Hark
# (р1к1 crane/cargo/harbor/fence, р1к2 laugh/smile/happy, р1к3 dragon/tattoo,
#  р1к4 helmet/glass/hat, р2к1 angry/mad, р2к2 tree/woman, р2к3 lady/woman/hat,
#  р2к4 diamond/crystal, р3к1 apple/cherry/heart/cup [ИИ-зрение AutoClaw],
#  р3к2 tree/forest/leaf, р3к3 jacket/tree, р3к4 cargo/crane/harbor/fence)
# x адреса m/84'/0'/0'/{0,1}/{0,1,2}.
# 331,776 кандидатов -> 20,752 чексумма-валидных -> 0 совпадений (17.10.2026).
# Оракул сертифицирован на 3 официальных вектора BIP84 (abandon-about: 0/0, 0/1, 1/0).
# Зависимости: coincurve. Словарь BIP39: bitcoin/bips bip-0039/english.txt.
import hashlib, hmac, itertools, io, sys
from coincurve import PrivateKey
N=0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364141
CHARSET='qpzry9x8gf2tvdw0s3jn54khce6mua7l'
TARGET='bc1qj7xsxrlgmnnrqwvlakacc5yrh33h2n3xaa0m09'
def bech32_encode(hrp,data):
    GEN=[0x3b6a57b2,0x26508e6d,0x1ea119fa,0x3d4233dd,0x2a1462b3]
    values=[ord(x)>>5 for x in hrp]+[0]+[ord(x)&31 for x in hrp]+data
    chk=1
    for v in values+[0,0,0,0,0,0]:
        b=chk>>25; chk=(chk&0x1ffffff)<<5^v
        for i in range(5): chk^=GEN[i] if ((b>>i)&1) else 0
    chk^=1
    return hrp+'1'+''.join(CHARSET[d] for d in data+[(chk>>5*(5-i))&31 for i in range(6)])
def convertbits(data,frombits,tobits,pad=True):
    acc=0; bits=0; ret=[]; maxv=(1<<tobits)-1
    for value in data:
        acc=(acc<<frombits)|value; bits+=frombits
        while bits>=tobits:
            bits-=tobits; ret.append((acc>>bits)&maxv)
    if pad and bits: ret.append((acc<<(tobits-bits))&maxv)
    return ret
def addr_from_pub(pub):
    h=hashlib.new('ripemd160', hashlib.sha256(pub).digest()).digest()
    return bech32_encode('bc',[0]+convertbits(h,8,5))
def seed_of(m): return hashlib.pbkdf2_hmac('sha512', m.encode(), b'mnemonic', 2048, 64)
def ckd(k,c,i):
    if i>=0x80000000: data=b'\x00'+k+i.to_bytes(4,'big')
    else: data=PrivateKey(k).public_key.format(compressed=True)+i.to_bytes(4,'big')
    I=hmac.new(c,data,hashlib.sha512).digest()
    kn=(int.from_bytes(I[:32],'big')+int.from_bytes(k,'big'))%N
    return kn.to_bytes(32,'big'), I[32:]
def addresses_for(mnemonic):
    seed=hashlib.pbkdf2_hmac('sha512', mnemonic.encode(), b'mnemonic', 2048, 64)
    I=hmac.new(b'Bitcoin seed', seed, hashlib.sha512).digest()
    k,c=I[:32],I[32:]
    for i in (84+0x80000000,0x80000000,0x80000000): k,c=ckd(k,c,i)
    res=[]
    for change in (0,1):
        kc,cc=ckd(k,c,change)
        for idx in (0,1,2):
            ki,_=ckd(kc,cc,idx)
            res.append(('m/84h/0h/0h/%d/%d'%(change,idx), addr_from_pub(PrivateKey(ki).public_key.format(compressed=True))))
    return res
SLOTS={1:['crane','cargo','harbor','fence'],2:['laugh','smile','happy'],3:['dragon','tattoo'],
 4:['helmet','glass','hat'],5:['angry','mad'],6:['tree','woman'],7:['lady','woman','hat'],
 8:['diamond','crystal'],9:['apple','cherry','heart','cup'],10:['tree','forest','leaf'],
 11:['jacket','tree'],12:['cargo','crane','harbor','fence']}
ORDERS={'row':list(range(1,13)), 'column':[1,5,9,2,6,10,3,7,11,4,8,12]}
def run(wordlist_path):
    WL=[w.strip() for w in io.open(wordlist_path,encoding='utf-8') if w.strip()]
    WMAP={w:i for i,w in enumerate(WL)}
    def checksum_ok(words):
        bits=''.join(format(WMAP[w],'011b') for w in words)
        ent=bits[:128]
        hh=hashlib.sha256(bytes(int(ent[i:i+8],2) for i in range(0,128,8))).digest()
        return format(hh[0],'08b')[:4]==bits[128:]
    total=0; ck=0; hits=[]
    for order_name,order in ORDERS.items():
        others=[SLOTS[p] for p in order[:8]]+[SLOTS[p] for p in order[9:]]
        pos9=order[8]
        for w9 in SLOTS[pos9]:
            for combo in itertools.product(*others):
                words12=[None]*12
                for p,wd in zip(order[:8],combo[:8]): words12[p-1]=wd
                for p,wd in zip(order[9:],combo[8:]): words12[p-1]=wd
                words12[pos9-1]=w9
                total+=1
                if checksum_ok(words12):
                    ck+=1
                    for path,a in addresses_for(' '.join(words12)):
                        if a==TARGET: hits.append((order_name,' '.join(words12),path))
    return total, ck, hits
if __name__=='__main__':
    t,c,h=run(sys.argv[1] if len(sys.argv)>1 else 'bip39_english.txt')
    print('candidates=%d checksum_valid=%d hits=%d'%(t,c,len(h)))
    for x in h: print('HIT',x)
