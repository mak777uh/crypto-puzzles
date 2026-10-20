import hashlib, numpy as np
from PIL import Image

MASK=(1<<48)-1
MULT=0x5DEECE66D
ADD=0xB

class JavaRandom:
    def __init__(self, seed):
        self.seed=(seed ^ MULT) & MASK
    def next(self,bits):
        self.seed=(self.seed*MULT+ADD)&MASK
        return self.seed >> (48-bits)
    def nextInt(self,bound):
        if bound<=0: raise ValueError
        if (bound & -bound)==bound:
            return (bound*self.next(31))>>31
        while True:
            bits=self.next(31); val=bits%bound
            t=(bits-val+(bound-1)) & 0xFFFFFFFF
            if t < 0x80000000: return val

def pw_hash(pw):
    if not pw: return 98234782
    h=hashlib.md5(pw.encode()).hexdigest()[:15]
    return int(h,16)

def extract(pw, w, h, nbytes=64):
    a=np.asarray(Image.open('data/last_backup_143.png').convert('RGB')).astype(np.uint32)
    # Java getRGB: 0x00RRGGBB; channel 0=blue? Java getRGB returns ARGB; bit (channel*8+bit): channel0=blue, 1=green, 2=red
    arr=[a[:,:,2],a[:,:,1],a[:,:,0]]  # blue, green, red to match Java channel order
    r=JavaRandom(pw_hash(pw))
    seen=set(); out=bytearray()
    for _ in range(nbytes):
        v=0
        for i in range(8):
            while True:
                x=r.nextInt(w); y=r.nextInt(h); ch=r.nextInt(3); bit=r.nextInt(1)
                key=(x,y,ch,bit)
                if key not in seen: break
            seen.add(key)
            v=(v<<1)|int((arr[ch][y,x]>>bit)&1)
        out.append(v)
    return bytes(out)

w,h=1537,1023
cands=['','openst','OpenST','open st','Open ST','openstego','OpenStego','secret','SECRET','caution','Caution','time','tempo','exif','Exif','alexandre','Alexandre','mazzei','Mazzei','bitcoin','Bitcoin','143','1400','1401','puzzle','pyramid','brave new world','Brave New World','the last backup','last backup','uncle','nephew','Portugal','portugal','blockchain','wallet','seed','seedphrase','bip39','electrum','o tempo esta acabando','O TEMPO ESTA ACABANDO']
for c in cands:
    b=extract(c,w,h,48)
    print(repr(c), b[:16].hex(), b[:16])
