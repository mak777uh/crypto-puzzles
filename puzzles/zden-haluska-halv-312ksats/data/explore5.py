import numpy as np, hashlib, time, itertools
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

levels=np.fromfile('data/amp_levels.bin',dtype=np.uint8)
t0=time.time(); count=0; found=False

# all 4! mappings of 2-bit levels to bits, pack 2 bits per node
for perm in itertools.permutations([0,1,2,3]):
    # perm maps level->2bit value
    for bits_per in [2]:
        vals=[perm[l] for l in levels]
        bits=''.join(f'{v:02b}' for v in vals)
        for bitorder in ['msb','lsb']:
            if bitorder=='msb':
                chunks=[bits[i:i+8] for i in range(0,512,8)]
            else:
                chunks=[bits[i:i+8][::-1] for i in range(0,512,8)]
            # 512 bits -> need 256. Take first 256 bits? or XOR halves? Try first 256 and XOR of two halves
            for take in ['first','xor','summod']:
                if take=='first':
                    bstr=bits[:256]
                elif take=='xor':
                    a=int(bits[:256],2); c=int(bits[256:],2); bstr=f'{a^c:0256b}'
                else:
                    a=int(bits[:256],2); c=int(bits[256:],2); bstr=f'{(a+c)%(1<<256):0256b}'
                if bitorder=='msb':
                    chunks=[bstr[i:i+8] for i in range(0,256,8)]
                else:
                    chunks=[bstr[i:i+8][::-1] for i in range(0,256,8)]
                out=bytes(int(c,2) for c in chunks)
                count+=1
                if test_priv(out, 'ampmap_%s_%s_%s'%(perm,bitorder,take)): found=True

# Also try 1 bit per level (high bit)
for thr in [1,2]:
    bits=[1 if l>=thr else 0 for l in levels]
    for bitorder in ['msb','lsb']:
        if bitorder=='msb':
            chunks=[bits[i:i+8] for i in range(0,256,8)]
        else:
            chunks=[list(reversed(bits[i:i+8])) for i in range(0,256,8)]
        out=bytes(int(''.join(map(str,c)),2) for c in chunks)
        count+=1
        if test_priv(out, 'ampthr%d_%s'%(thr,bitorder)): found=True

print('explore5 done count',count,'time',round(time.time()-t0,1),'found',found)
