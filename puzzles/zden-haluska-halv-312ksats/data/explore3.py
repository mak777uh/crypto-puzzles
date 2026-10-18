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

# Multi-bit per run: each run length -> 2 bits, 128 runs -> 256 bits
for conv in ['mod4','div2','thresh','len-1_mod4']:
    outbits=[]
    for (pol,length) in runs:
        if conv=='mod4':
            v=length % 4
        elif conv=='div2':
            v=length//2
        elif conv=='thresh':
            v=0 if length<=2 else 1 if length<=4 else 2 if length<=6 else 3
        else:
            v=(length-1)%4
        outbits += [(v>>1)&1, v&1]
    # pack
    for bitorder in ['msb','lsb']:
        if bitorder=='msb':
            chunks=[outbits[i:i+8] for i in range(0,256,8)]
        else:
            chunks=[list(reversed(outbits[i:i+8])) for i in range(0,256,8)]
        b=bytes(int(''.join(map(str,c)),2) for c in chunks)
        count+=1
        if test_priv(b, 'run2bit_%s_%s'%(conv,bitorder)): found=True
    # include polarity as extra bit? prepend/interleave
    # interleave pol and 2 bits length -> 3 bits per run = 384; take first 256
    outbits=[]
    for (pol,length) in runs:
        v=length%4
        outbits += [pol, (v>>1)&1, v&1]
    s=''.join(map(str,outbits))[:256]
    for bitorder in ['msb','lsb']:
        if bitorder=='msb':
            chunks=[list(s[i:i+8]) for i in range(0,256,8)]
        else:
            chunks=[list(reversed(s[i:i+8])) for i in range(0,256,8)]
        b=bytes(int(''.join(c),2) for c in chunks)
        count+=1
        if test_priv(b, 'run3bit_pol_%s'%bitorder): found=True

# Each run length (1-7) as 3 bits, but 128 runs -> 384. Try first 256 bits and last 256
s=''.join(f'{length:03b}' for (pol,length) in runs)
for off in [0, 128]:
    chunk=s[off:off+256]
    if len(chunk)<256: continue
    for bitorder in ['msb','lsb']:
        if bitorder=='msb':
            chunks=[list(chunk[i:i+8]) for i in range(0,256,8)]
        else:
            chunks=[list(reversed(chunk[i:i+8])) for i in range(0,256,8)]
        b=bytes(int(''.join(c),2) for c in chunks)
        count+=1
        if test_priv(b, 'run3bit_off%d_%s'%(off,bitorder)): found=True

# Also encode (polarity, length) pairs: high runs only, length 1-7 (3 bits) -> 64*3=192 bits; pad to 256 with zeros or with low runs
s=''.join(f'{length:03b}' for (pol,length) in runs if pol==1)
s=s.ljust(256,'0')
b=int(s[:256],2).to_bytes(32,'big')
count+=1
if test_priv(b,'highruns_3bit_pad'): found=True
s=''.join(f'{length:03b}' for (pol,length) in runs if pol==0)
s=s.ljust(256,'0')
b=int(s[:256],2).to_bytes(32,'big')
count+=1
if test_priv(b,'lowruns_3bit_pad'): found=True

# Run lengths as decimal digits string -> int? try int(''.join(str(l) for ...)) mod 2^256
s=''.join(str(length) for (pol,length) in runs)
n=int(s) % (1<<256)
b=n.to_bytes(32,'big')
count+=1
if test_priv(b,'runlens_decimal'): found=True

print('explore3 done count',count,'time',round(time.time()-t0,1),'found',found)
