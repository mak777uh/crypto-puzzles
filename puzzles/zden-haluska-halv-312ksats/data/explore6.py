import numpy as np, hashlib, time
from PIL import Image
im=np.array(Image.open('data/cryptoHALV.png').convert('L'))
target='1crypto24HCr178iMcKd5iUi5D4rsg1nK'

def b58encode(b):
    alphabet='123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz'
    num=int.from_bytes(b,'big'); res=''
    while num>0:
        num,rem=divmod(num,58); res=alphabet[rem]+res
    for byte in b:
        if byte==0: res='1'+res
        else: break
    return res
import coincurve
def addr(priv, compressed):
    pub=coincurve.PublicKey.from_secret(priv).format(compressed=compressed)
    sha=hashlib.sha256(pub).digest()
    ripe=hashlib.new('ripemd160', sha).digest()
    payload=b'\x00'+ripe
    checksum=hashlib.sha256(hashlib.sha256(payload).digest()).digest()[:4]
    return b58encode(payload+checksum)

def test_priv(priv, tag):
    for comp in (True,False):
        try:
            a=addr(priv, comp)
        except Exception as e:
            return False
        if a==target:
            print('*** MATCH ***', tag, comp, priv.hex())
            with open('data/found.txt','a') as f:
                f.write('MATCH %s comp=%s %s\n' % (tag, comp, priv.hex()))
            return True
        if a.startswith('1crypto'):
            print('VANITY', tag, comp, a, priv.hex()[:16])
    return False

xs=[92+3*k for k in range(256)]
bits=np.array([int(v>127) for v in im[475,xs]])

t0=time.time(); count=0; found=False

def pack(bitarr, order='msb'):
    ba=list(bitarr)
    if order=='msb':
        chunks=[ba[i:i+8] for i in range(0,256,8)]
    else:
        chunks=[list(reversed(ba[i:i+8])) for i in range(0,256,8)]
    return bytes(int(''.join(map(str,c)),2) for c in chunks)

# de-interleave by bands: 8 bands of 32 bits. Try reading column-major
bands=[bits[i*32:(i+1)*32] for i in range(8)]
# column-major: bit j of band i
cm=[bits[i*32 + j] for j in range(32) for i in range(8)]
for order in ['msb','lsb']:
    b=pack(cm,order)
    count+=1
    if test_priv(b,'colmajor_%s'%order): found=True

# de-interleave by taking every 8th
for stride in [2,4,8,16,32]:
    for off in range(stride):
        arr=[bits[i] for i in range(off,256,stride)]
        if len(arr)<256: 
            arr=arr+[0]*(256-len(arr))
        arr=arr[:256]
        for order in ['msb','lsb']:
            b=pack(arr,order)
            count+=1
            if test_priv(b,'stride%d_off%d_%s'%(stride,off,order)): found=True

# Gray code ungray? apply gray decode to packed int
packed=int(''.join(map(str,bits)),2)
def gray_decode(g):
    n=0
    while g:
        n^=g
        g>>=1
    return n
gd=gray_decode(packed)
for endian in ['big','little']:
    b=gd.to_bytes(32,endian)
    count+=1
    if test_priv(b,'graydecode_%s'%endian): found=True

# single bit flips on packed (msb order) - maybe key is 1-2 bits away
base=pack(bits,'msb')
for i in range(256):
    by=i//8; bi=7-(i%8)
    b=bytearray(base); b[by]^=(1<<bi)
    count+=1
    if test_priv(bytes(b),'flipbit_%d'%i): found=True

# byte flips
for i in range(32):
    for v in range(256):
        b=bytearray(base); b[i]=v
        # too many (8192) but ok? skip to save time; do only a few
        pass

print('explore6 done count',count,'time',round(time.time()-t0,1),'found',found)
