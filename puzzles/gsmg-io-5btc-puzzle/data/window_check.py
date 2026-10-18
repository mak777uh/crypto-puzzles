import hashlib, pathlib
from coincurve import PrivateKey
data=pathlib.Path(r'C:\Users\Admin\OneDrive\Desktop\master\puzzles\gsmg-io-5btc-puzzle\data\chain4_1151.bin').read_bytes()
targets={'1GSMG1JC9wtdSwfwApgj2xcmJPAwx7prBe','1NULY7DhzuNvSDtPkFzNo6oRTZQWBqXNE9'}
def b58(b):
    alpha='123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz'
    n=int.from_bytes(b,'big'); r=''
    while n>0:
        n,rem=divmod(n,58); r=alpha[rem]+r
    for byte in b:
        if byte==0: r='1'+r
        else: break
    return r
def addr(priv,comp):
    pub=PrivateKey(priv).public_key.format(compressed=comp)
    h=hashlib.new('ripemd160',hashlib.sha256(pub).digest()).digest()
    payload=b'\x00'+h
    chk=hashlib.sha256(hashlib.sha256(payload).digest()).digest()[:4]
    return b58(payload+chk)
hits=[]
for off in range(len(data)-31):
    w=data[off:off+32]
    for comp in (True,False):
        try: a=addr(w,comp)
        except Exception: a=None
        if a in targets: hits.append(('direct',off,comp,a,w.hex()))
    # sha256
    h=hashlib.sha256(w).digest()
    for comp in (True,False):
        try: a=addr(h,comp)
        except Exception: a=None
        if a in targets: hits.append(('sha256',off,comp,a,h.hex()))
    # reversed
    rw=w[::-1]
    for comp in (True,False):
        try: a=addr(rw,comp)
        except Exception: a=None
        if a in targets: hits.append(('rev',off,comp,a,rw.hex()))
print('hits', hits)
# also print any address starting with 1GSMG? none likely
print('done')