import hashlib
pub=bytes.fromhex('03dbdb2a9567a4f6553a28350b8f61dd77c71511b8b7edf93edc98094a07e90558')
sha=hashlib.sha256(pub).digest()
ripe=hashlib.new('ripemd160', sha).digest()
# base58check
def b58encode(b):
    alphabet='123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz'
    num=int.from_bytes(b,'big')
    res=''
    while num>0:
        num,rem=divmod(num,58)
        res=alphabet[rem]+res
    # leading zeros
    for byte in b:
        if byte==0: res='1'+res
        else: break
    return res
payload=b'\x00'+ripe
checksum=hashlib.sha256(hashlib.sha256(payload).digest()).digest()[:4]
addr=b58encode(payload+checksum)
print('address:', addr)
print('target:  1crypto24HCr178iMcKd5iUi5D4rsg1nK')