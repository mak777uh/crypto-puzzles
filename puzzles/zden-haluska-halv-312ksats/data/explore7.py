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
runs=[]
cur=bits[0]; cnt=1
for b in bits[1:]:
    if b==cur: cnt+=1
    else:
        runs.append((cur,cnt)); cur=b; cnt=1
runs.append((cur,cnt))

t0=time.time(); count=0; found=False

# bitstring of run lengths 3 bits each (with polarity maybe)
s3=''.join(f'{r[1]:03b}' for r in runs)  # 384 bits
# try all 256-bit windows
for off in range(0, len(s3)-256+1):
    chunk=s3[off:off+256]
    for endian_order in ['msb','lsb']:
        if endian_order=='msb':
            chunks=[chunk[i:i+8] for i in range(0,256,8)]
        else:
            chunks=[chunk[i:i+8][::-1] for i in range(0,256,8)]
        b=bytes(int(c,2) for c in chunks)
        count+=1
        if test_priv(b,'win3bit_off%d_%s'%(off,endian_order)): found=True

# amplitude levels 2 bits each -> 512-bit string
units=[128]*32+[64]*32+[32]*32+[16]*32+[8]*32+[4]*32+[2]*32+[1]*32
amps=[]
for idx in range(256):
    x=92+3*idx
    col=im[:,x]
    nz=np.where(col>0)[0]
    amp=0 if len(nz)==0 else (475-nz[0]+nz[-1]-475)//2
    L=min(3,max(0,int(round(amp/units[idx]))))
    amps.append(L)
s2=''.join(f'{l:02b}' for l in amps)  # 512 bits
for off in range(0, len(s2)-256+1, 8):
    chunk=s2[off:off+256]
    for endian_order in ['msb','lsb']:
        if endian_order=='msb':
            chunks=[chunk[i:i+8] for i in range(0,256,8)]
        else:
            chunks=[chunk[i:i+8][::-1] for i in range(0,256,8)]
        b=bytes(int(c,2) for c in chunks)
        count+=1
        if test_priv(b,'ampwin_off%d_%s'%(off,endian_order)): found=True

print('explore7 done count',count,'time',round(time.time()-t0,1),'found',found)
