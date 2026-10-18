import numpy as np, hashlib, itertools, time
from PIL import Image
im=np.array(Image.open('data/cryptoHALV.png').convert('L'))
H,W=im.shape
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
            return None
        if a==target:
            print('*** MATCH ***', tag, comp, priv.hex())
            with open('data/found.txt','a') as f:
                f.write('MATCH %s comp=%s %s\n' % (tag, comp, priv.hex()))
            return True
        if a.startswith('1crypto') or a.startswith('1Cryp') or a.startswith('1crypt'):
            print('VANITY', tag, comp, a, priv.hex()[:16])
    return False

found=False
t0=time.time()
count=0
for y in range(460,491):
    for start in range(84,100):
        for step in [2,3,4]:
            xs=[start+step*k for k in range(256)]
            if xs[-1]>=W: continue
            vals=im[y,xs].astype(int)
            for thr in [64,96,128,160,192]:
                bits0=(vals>thr).astype(int)
                for pol in [0,1]:
                    bits=[int(b)^pol for b in bits0]
                    for bitorder in ['msb','lsb']:
                        if bitorder=='msb':
                            chunks=[bits[i:i+8] for i in range(0,256,8)]
                        else:
                            chunks=[list(reversed(bits[i:i+8])) for i in range(0,256,8)]
                        try:
                            out=bytes(int(''.join(map(str,c)),2) for c in chunks)
                        except:
                            continue
                        count+=1
                        tag='y%d_s%d_step%d_thr%d_pol%d_bo%s' % (y,start,step,thr,pol,bitorder)
                        if test_priv(out, tag):
                            found=True
print('direct grid done', count, 'time', round(time.time()-t0,1), 'found', found)