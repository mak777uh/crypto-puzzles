import hashlib, coincurve
priv=bytes.fromhex('01b8410c1b02220244c5556ddea8b9cd9d133d57a333baa3eed7e6478d8fedaf')
pk=coincurve.PublicKey.from_secret(priv)
for compflag,name in [(True,'compressed'),(False,'uncompressed')]:
    pub=pk.format(compressed=compflag)
    # if uncompressed, coincurve format False gives 65 bytes
    sha=hashlib.sha256(pub).digest()
    ripe=hashlib.new('ripemd160', sha).digest()
    payload=b'\x00'+ripe
    checksum=hashlib.sha256(hashlib.sha256(payload).digest()).digest()[:4]
    def b58encode(b):
        alphabet='123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz'
        num=int.from_bytes(b,'big'); res=''
        while num>0:
            num,rem=divmod(num,58); res=alphabet[rem]+res
        for byte in b:
            if byte==0: res='1'+res
            else: break
        return res
    print(name, b58encode(payload+checksum))