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
runs=[]
cur=bits[0]; cnt=1
for b in bits[1:]:
    if b==cur: cnt+=1
    else:
        runs.append((cur,cnt)); cur=b; cnt=1
runs.append((cur,cnt))
runlens=bytes(r[1] for r in runs)  # 128 bytes (values 1-7)
trans=bytes([0]+[i for i in range(1,256) if bits[i]!=bits[i-1]])  # up to 128

t0=time.time(); count=0; found=False

# Various byte blobs to hash
blobs={
 'packed_bits': packed,
 'packed_bits_rev': packed[::-1],
 'runlens': runlens,
 'runlens_rev': runlens[::-1],
 'transitions': trans,
 'image_png': open('data/cryptoHALV.png','rb').read(),
 'row475_raw': im[475,:].tobytes(),
 'row475_xs': im[475,xs].tobytes(),
}
for name,blob in blobs.items():
    for algo in ['sha256','sha512','md5','ripemd160','sha1']:
        h=hashlib.new(algo, blob).digest()
        # if longer than 32, take first 32; if shorter, pad
        key=h.ljust(32,b'\x00')[:32]
        count+=1
        if test_priv(key, 'hash_%s_%s'%(algo,name)): found=True
        # also double sha256
    key=hashlib.sha256(hashlib.sha256(blob).digest()).digest()
    count+=1
    if test_priv(key, 'dsha256_%s'%name): found=True
    # sha256 of hex string of bits
    key=hashlib.sha256(''.join(map(str,bits)).encode()).digest()
    count+=1
    if test_priv(key, 'sha256_bitstring'): found=True
    key=hashlib.sha256(''.join(map(str,bits)).encode()).digest()
    # WIF? no

# Try key = SHA256 of run lengths as ascii
s=' '.join(str(r[1]) for r in runs)
key=hashlib.sha256(s.encode()).digest()
count+=1
if test_priv(key, 'sha256_runlens_ascii'): found=True

# Try LVL5-style: sum of pairs of run lengths? 
# pairs of consecutive run lengths -> byte = (a*? + b) 
# Try byte = high*16+low for adjacent runs (64 bytes) already in explore2, but hash them
key=hashlib.sha256(bytes([runs[i][1]*16+runs[i+1][1] for i in range(0,128,2)])).digest()
count+=1
if test_priv(key, 'sha256_pairedruns'): found=True

# Try XOR of all row values? 
key=bytes([im[475,:].mean().astype(int)]*32)  # no

print('explore4 done count',count,'time',round(time.time()-t0,1),'found',found)
