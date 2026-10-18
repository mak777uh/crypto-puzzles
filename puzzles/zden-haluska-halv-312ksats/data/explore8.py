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
bits=[int(v>127) for v in im[475,xs]]
packed=bytes(int(''.join(map(str,bits[i:i+8])),2) for i in range(0,256,8))

t0=time.time(); count=0; found=False

# byte rotations
for r in range(32):
    b=packed[r:]+packed[:r]
    count+=1
    if test_priv(b,'byterot_%d'%r): found=True
    b=packed[::-1]
    b=b[r:]+b[:r]
    count+=1
    if test_priv(b,'byterotrev_%d'%r): found=True

# bit rotations of whole 256-bit int
N=int.from_bytes(packed,'big')
for r in range(256):
    M=((N << r) | (N >> (256-r))) & ((1<<256)-1)
    b=M.to_bytes(32,'big')
    count+=1
    if test_priv(b,'bitrot_%d'%r): found=True

# complement
b=bytes(~x & 0xFF for x in packed)
count+=1
if test_priv(b,'complement'): found=True

# XOR with index
b=bytes(packed[i] ^ i for i in range(32))
count+=1
if test_priv(b,'xor_index'): found=True
b=bytes(packed[i] ^ (i*8) for i in range(32))
count+=1
if test_priv(b,'xor_index8'): found=True

print('explore8 done count',count,'time',round(time.time()-t0,1),'found',found)
