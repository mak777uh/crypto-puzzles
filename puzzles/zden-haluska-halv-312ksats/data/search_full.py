import numpy as np, hashlib
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

found=False
for y in range(465,486):
    for start in range(85,100):
        xs=[start+3*k for k in range(256)]
        if xs[-1]>=im.shape[1]: continue
        vals=im[y,xs]
        bits0=(vals>127).astype(int)
        for pol in [0,1]:
            bits=[int(b)^pol for b in bits0]
            for bitorder in ['msb','lsb']:
                if bitorder=='msb':
                    chunks=[bits[i:i+8] for i in range(0,256,8)]
                else:
                    chunks=[list(reversed(bits[i:i+8])) for i in range(0,256,8)]
                out=bytes(int(''.join(map(str,c)),2) for c in chunks)
                for comp in [True,False]:
                    try:
                        a=addr(out,comp)
                    except Exception:
                        continue
                    if a==target:
                        print('MATCH', y,start,pol,bitorder,comp)
                        print(out.hex())
                        found=True
                    elif a.startswith('1crypto'):
                        print('VANITY', y,start,pol,bitorder,comp,a)
print('done', found)