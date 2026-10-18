import numpy as np, hashlib
from PIL import Image
im=np.array(Image.open('data/cryptoHALV.png').convert('L'))
target='1crypto24HCr178iMcKd5iUi5D4rsg1nK'
xs=[92+3*k for k in range(256)]
vals=im[475,xs]
bits=(vals>127).astype(int).tolist()

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
variants={'orig':bits,'rev':bits[::-1]}
for name,b in variants.items():
    for bitorder in ['msb','lsb']:
        if bitorder=='msb':
            chunks=[b[i:i+8] for i in range(0,256,8)]
        else:
            chunks=[list(reversed(b[i:i+8])) for i in range(0,256,8)]
        out=bytes(int(''.join(map(str,c)),2) for c in chunks)
        for comp in [True,False]:
            pub=coincurve.PublicKey.from_secret(out).format(compressed=comp)
            sha=hashlib.sha256(pub).digest()
            ripe=hashlib.new('ripemd160', sha).digest()
            payload=b'\x00'+ripe
            checksum=hashlib.sha256(hashlib.sha256(payload).digest()).digest()[:4]
            addr=b58encode(payload+checksum)
            print(name, bitorder, 'comp' if comp else 'uncomp', addr)