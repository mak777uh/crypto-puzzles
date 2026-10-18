import numpy as np
from PIL import Image
im=Image.open('data/puzzle11.png')
a=np.array(im)
L=a[:,:,0]; A=a[:,:,1]
mask=A!=255
ys,xs=np.where(mask)
order=np.lexsort((xs,ys))
bits=L[ys[order],xs[order]] & 1
print('bits count', len(bits), 'ones', int(bits.sum()))
out=bytearray()
for i in range(0,len(bits)-7,8):
    out.append(int(''.join(str(b) for b in bits[i:i+8]),2))
data=bytes(out)
print('packed', len(data))
print(''.join(chr(c) if 32<=c<127 else '.' for c in data[:300]))
import re
for m in re.finditer(rb'[0-9a-fA-F]{20,}', data): print('hexrun', m.group())