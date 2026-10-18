import numpy as np, hashlib, itertools
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

def addr_from_bits(bits):
    # bits: list of 256 ints
    for order in ['msb','lsb']:
        if order=='msb':
            chunks=[bits[i:i+8] for i in range(0,256,8)]
        else:
            chunks=[list(reversed(bits[i:i+8])) for i in range(0,256,8)]
        out=bytes(int(''.join(map(str,c)),2) for c in chunks)
        pub=None
        try:
            import coincurve
            pub=coincurve.PublicKey.from_secret(out).format(compressed=True)
        except Exception:
            return None
        sha=hashlib.sha256(pub).digest()
        ripe=hashlib.new('ripemd160', sha).digest()
        payload=b'\x00'+ripe
        checksum=hashlib.sha256(hashlib.sha256(payload).digest()).digest()[:4]
        return b58encode(payload+checksum)

found=False
for y in range(470,481):
    for start in range(88,98):
        xs=[start+3*k for k in range(256)]
        if xs[-1]>=im.shape[1]: continue
        vals=im[y,xs]
        bits0=(vals>127).astype(int)
        for pol in [0,1]:
            bits=[b^pol for b in bits0]
            for order in ['msb','lsb']:
                a=addr_from_bits(bits) if False else None
                # inline addr
                if order=='msb':
                    chunks=[bits[i:i+8] for i in range(0,256,8)]
                else:
                    chunks=[list(reversed(bits[i:i+8])) for i in range(0,256,8)]
                out=bytes(int(''.join(map(str,c)),2) for c in chunks)
                try:
                    import coincurve
                    pub=coincurve.PublicKey.from_secret(out).format(compressed=True)
                except Exception:
                    continue
                sha=hashlib.sha256(pub).digest()
                ripe=hashlib.new('ripemd160', sha).digest()
                payload=b'\x00'+ripe
                checksum=hashlib.sha256(hashlib.sha256(payload).digest()).digest()[:4]
                addr=b58encode(payload+checksum)
                if addr==target:
                    print('MATCH!', 'y',y,'start',start,'pol',pol,'order',order)
                    print('priv', out.hex())
                    found=True
                elif addr.startswith('1crypto') or addr.startswith('1C') or addr.startswith('15mo'):
                    pass
print('done found=',found)