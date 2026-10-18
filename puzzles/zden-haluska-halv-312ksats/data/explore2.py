import numpy as np, hashlib, time
from PIL import Image
im=np.array(Image.open('data/cryptoHALV.png').convert('L'))
target='1crypto24HCr178iMcKd5iUi5D4rsg1nK'
W=im.shape[1]

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

# base binary signal
xs=[92+3*k for k in range(256)]
bits=[int(v>127) for v in im[475,xs]]

# run lengths
runs=[]
cur=bits[0]; cnt=1
for b in bits[1:]:
    if b==cur: cnt+=1
    else:
        runs.append((cur,cnt)); cur=b; cnt=1
runs.append((cur,cnt))
high_runs=[r[1] for r in runs if r[0]==1]
low_runs=[r[1] for r in runs if r[0]==0]
print('num runs', len(runs), 'high', len(high_runs), 'low', len(low_runs))

t0=__import__('time').time()
count=0
found=False

# Whole-integer transforms of the 256-bit signal
N=int(''.join(map(str,bits)),2)
for name,val in [('orig',N),('bitrev',int(bin(N)[2:].rjust(256,'0')[::-1],2)),
                 ('revbytes',int.from_bytes(bytes(int(''.join(map(str,bits[i:i+8])),2) for i in range(0,256,8))[::-1],'big'))]:
    for endian in ['big','little']:
        b=val.to_bytes(32,endian)
        count+=1
        if test_priv(b, 'int_%s_%s'%(name,endian)): found=True

# high/low run lengths as base-8 digits -> int
def runs_to_int(runlist, endian='big'):
    # pad to 3 bits each, pack
    s=''.join(f'{r:03b}' for r in runlist)
    # take first/last 256
    for off in [0, len(s)-256]:
        if off<0: off=0
        if off+256>len(s): continue
        chunk=s[off:off+256]
        for eo in ['big','little']:
            b=int(chunk,2).to_bytes(32,eo)
            yield b, 'off%d'%off

for rl,name in [(high_runs,'high'),(low_runs,'low')]:
    for b,tag in runs_to_int(rl):
        count+=1
        if test_priv(b, 'runs3bit_%s_%s'%(name,tag)): found=True

# high run lengths: base-7? interpret list as mixed-radix? try as base-8 number with 64 digits
for rl,name in [(high_runs,'high'),(low_runs,'low')]:
    # base 8 (digits 0-7, but lengths 1-7; use length-1? or length)
    for digits in [rl, [r-1 for r in rl]]:
        for base in [7,8]:
            # convert digit list (most significant first) to int in given base
            n=0
            for d in digits:
                n=n*base + (d % base)
            for endian in ['big','little']:
                try:
                    b=n.to_bytes(32,endian)
                except OverflowError:
                    b=n.to_bytes((n.bit_length()+7)//8,endian).rjust(32,b'\x00') if False else None
                    # pad/truncate
                    bb=n.to_bytes((n.bit_length()+7)//8,endian)
                    bb=bb.rjust(32,b'\x00')[-32:]
                    b=bb
                count+=1
                if test_priv(b, 'mixedbase_%s_base%d_%s'%(name,base,endian)): found=True

# pairs: high+low run lengths -> byte = high*8+low? or high*16+low
# 64 pairs
pairs=[(high_runs[i] if i<len(high_runs) else 0, low_runs[i] if i<len(low_runs) else 0) for i in range(max(len(high_runs),len(low_runs)))]
# pad to 64
while len(pairs)<64: pairs.append((0,0))
for formula in ['h*8+l','h+8*l','h*16+l','h^l','h+l']:
    bs=bytearray()
    for h,l in pairs:
        if formula=='h*8+l': v=h*8+l
        elif formula=='h+8*l': v=h+8*l
        elif formula=='h*16+l': v=h*16+l
        elif formula=='h^l': v=h^l
        else: v=h+l
        bs.append(v & 0xFF)
    b=bytes(bs)
    count+=1
    if test_priv(b, 'pairs_%s'%formula): found=True
    # reversed
    count+=1
    if test_priv(b[::-1], 'pairs_%s_rev'%formula): found=True

# transition positions (indices where bit changes)
trans=[0]
for i in range(1,256):
    if bits[i]!=bits[i-1]:
        trans.append(i)
print('num transitions', len(trans))
# pack first 32 transition positions into bytes (each 8 bits) -> 32 bytes if 32 transitions; but 127 transitions. Take first 32.
for take in [32]:
    bs=bytes(trans[:take])
    count+=1
    if test_priv(bs, 'trans_first32'): found=True
    count+=1
    if test_priv(bs[::-1], 'trans_first32_rev'): found=True
# XOR of all transition positions -> 1 byte; not enough. Sum?
print('sum trans', sum(trans))

# run lengths of high runs only, packed 4 bits each (pad) -> 64*4=256
if len(high_runs)>=64:
    s=''.join(f'{r:04b}' for r in high_runs[:64])
    b=int(s,2).to_bytes(32,'big')
    count+=1
    if test_priv(b, 'highruns_4bit'): found=True
if len(low_runs)>=64:
    s=''.join(f'{r:04b}' for r in low_runs[:64])
    b=int(s,2).to_bytes(32,'big')
    count+=1
    if test_priv(b, 'lowruns_4bit'): found=True

print('explore2 done count', count, 'time', round(time.time()-t0,1), 'found', found)