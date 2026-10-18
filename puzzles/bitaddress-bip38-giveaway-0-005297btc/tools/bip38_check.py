import hashlib, base58, coincurve
from Crypto.Cipher import AES
N=0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364141
import os
enc=base58.b58decode_check(os.environ.get("ENC","6PfQTphCYc1Fee19uPz2pmou5RVBDVgw8VcrPfGLos4ktUnARdiFLYhcNU"))
assert enc[0:2]==b"\x01\x43", enc[0:2].hex()
flag=enc[2]; addresshash=enc[3:7]; ownerentropy=enc[7:15]
ep1=enc[15:23]; ep2=enc[23:39]
has_lot = bool(flag & 0x04)
def sha2(b): return hashlib.sha256(b).digest()
def dsha(b): return sha2(sha2(b))
def scrypt(pw,salt,n,r,p,l): return hashlib.scrypt(pw,salt=salt,n=n,r=r,p=p,dklen=l,maxmem=1<<30)
def check(passphrase):
    pw=passphrase.encode()
    if has_lot:
        ownersalt=ownerentropy[0:4]
        prefactor=scrypt(pw,ownersalt,16384,8,8,32)
        passfactor=dsha(prefactor+ownerentropy)
    else:
        passfactor=scrypt(pw,ownerentropy,16384,8,8,32)
    pf=int.from_bytes(passfactor,'big')
    passpoint=coincurve.PublicKey.from_secret(passfactor).format(compressed=True)
    derived=scrypt(passpoint,addresshash+ownerentropy,1024,1,1,64)
    dh1=derived[0:32]; dh2=derived[32:64]
    aes=AES.new(dh2,AES.MODE_ECB)
    dp2=bytes(a^b for a,b in zip(aes.decrypt(ep2),dh1[16:32]))
    ep1full=ep1+dp2[0:8]
    dp1=bytes(a^b for a,b in zip(aes.decrypt(ep1full),dh1[0:16]))
    seedb=dp1[0:16]+dp2[8:16]
    factorb=dsha(seedb)
    priv=(pf*int.from_bytes(factorb,'big'))%N
    pk=coincurve.PublicKey.from_secret(priv.to_bytes(32,'big'))
    pub_unc=pk.format(compressed=False)
    # address from uncompressed
    h=hashlib.new('ripemd160',sha2(pub_unc)).digest()
    addr=base58.b58encode_check(b'\x00'+h)
    ah=dsha(addr)[0:4]
    if ah==addresshash:
        return priv.to_bytes(32,'big').hex()
    return None
if __name__=="__main__":
    import sys,time
    t=time.time()
    for i in range(50): check("test%d"%i)
    dt=time.time()-t
    print("flag=%d has_lot=%s"%(flag,has_lot))
    print("per candidate: %.4f s -> %.0f/s"%(dt/50, 50/dt))
