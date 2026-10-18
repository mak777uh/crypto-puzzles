import hashlib,hmac,coincurve,sys
sys.path.insert(0,'/workspace/work/trithemius')
from oracle import TH,IDX,h160,N
H=0x80000000
def _h(c,d): I=hmac.new(c,d,hashlib.sha512).digest(); return int.from_bytes(I[:32],'big'),I[32:]
def hard(k,c,i): t,cc=_h(c,b'\0'+k.to_bytes(32,'big')+i.to_bytes(4,'big')); return (t+k)%N,cc
def pub(k): return coincurve.PrivateKey(k.to_bytes(32,'big')).public_key
def soft(k,c,P,i): t,cc=_h(c,P.format(True)+i.to_bytes(4,'big')); return (t+k)%N,cc
def hit(P): return h160(P.format(True))==TH or h160(P.format(False))==TH
def seed_check(seed):
    mk,mc=_h(b'Bitcoin seed',seed)
    # m/44'/0'/0'/{0/0,0/1,1/0}
    k,c=hard(mk,mc,44+H);k,c=hard(k,c,H);k,c=hard(k,c,H);P=pub(k)
    for ch,idxs in ((0,(0,1)),(1,(0,))):
        k2,c2=soft(k,c,P,ch);P2=pub(k2)
        for j in idxs:
            k3,_=soft(k2,c2,P2,j)
            if hit(pub(k3)): return ("m/44'/0'/0'",ch,j)
    MP=pub(mk); k2,c2=soft(mk,mc,MP,0);P2=pub(k2)
    for j in (0,1):
        k3,_=soft(k2,c2,P2,j)
        if hit(pub(k3)): return ('m/0',j)
    k2,c2=hard(mk,mc,H);P2=pub(k2);k3,c3=soft(k2,c2,P2,0);P3=pub(k3);k4,_=soft(k3,c3,P3,0)
    if hit(pub(k4)): return ("m/0'/0/0",)
    return None
def check(words):
    return seed_check(hashlib.pbkdf2_hmac('sha512',' '.join(words).encode(),b'mnemonic',2048))
if __name__=='__main__':
    import time
    # self-test vs reference oracle derivation: abandon*11 about m/44'/0'/0'/0/0
    from oracle import p2pkh
    s=hashlib.pbkdf2_hmac('sha512',('abandon '*11+'about').encode(),b'mnemonic',2048)
    mk,mc=_h(b'Bitcoin seed',s);k,c=hard(mk,mc,44+H);k,c=hard(k,c,H);k,c=hard(k,c,H)
    P=pub(k);k,c=soft(k,c,P,0);P=pub(k);k,c=soft(k,c,P,0)
    print('selftest',p2pkh(pub(k).format(True))=='1LqBGSKuX5yYUonjxT5qGfpUsXKYYWeabA')
    t=time.time()
    for i in range(300): check(['abandon']*11+['about'+str(i)])
    print('rate/core',300/(time.time()-t))
