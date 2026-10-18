import hashlib
base=bytes.fromhex('01b8410c1b02220244c5556ddea8b9cd9d133d57a333baa3eed7e6478d8fedaf')
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
def addr(priv):
    pub=coincurve.PublicKey.from_secret(priv).format(compressed=True)
    sha=hashlib.sha256(pub).digest()
    ripe=hashlib.new('ripemd160', sha).digest()
    payload=b'\x00'+ripe
    checksum=hashlib.sha256(hashlib.sha256(payload).digest()).digest()[:4]
    return b58encode(payload+checksum)

transforms={
 'orig': base,
 'reverse_bytes': base[::-1],
 'bitrev_bytes': bytes(int(bin(b)[2:].rjust(8,'0')[::-1],2) for b in base),
 'reverse_bits_all': int.from_bytes(base,'big').to_bytes(32,'little'),
}
for name,k in transforms.items():
    try:
        print(name, addr(k))
    except Exception as e:
        print(name, 'err', e)