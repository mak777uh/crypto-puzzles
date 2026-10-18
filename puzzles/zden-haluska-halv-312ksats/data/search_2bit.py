import numpy as np, hashlib, itertools
from PIL import Image
im=np.array(Image.open('data/cryptoHALV.png').convert('L'))
target='1crypto24HCr178iMcKd5iUi5D4rsg1nK'
xs=[92+3*k for k in range(256)]
vals=im[475,xs]
levels=np.array([0 if v<64 else 1 if v<128 else 2 if v<192 else 3 for v in vals])

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
for perm in itertools.permutations([0,1,2,3]):
    bits=''.join(f'{perm[l]:02b}' for l in levels)
    # try both bit orders within byte
    for bitorder in ['msb','lsb']:
        if bitorder=='msb':
            chunks=[bits[i:i+8] for i in range(0,512,8)]
        else:
            chunks=[bits[i:i+8][::-1] for i in range(0,512,8)]
        out=bytes(int(c,2) for c in chunks)
        try:
            pub=coincurve.PublicKey.from_secret(out).format(compressed=True)
        except Exception:
            continue
        sha=hashlib.sha256(pub).digest()
        ripe=hashlib.new('ripemd160', sha).digest()
        payload=b'\x00'+ripe
        checksum=hashlib.sha256(hashlib.sha256(payload).digest()).digest()[:4]
        addr=b58encode(payload+checksum)
        if addr==target:
            print('MATCH', perm, bitorder)
            print(out.hex())
        elif addr.startswith('1crypto'):
            print('VANITY', perm, bitorder, addr)