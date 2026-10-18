import numpy as np
from PIL import Image
im=Image.open('data/puzzle11.png')
a=np.array(im)
alpha=a[:,:,1]
ys,xs=np.where(alpha!=255)
order=np.lexsort((xs,ys))
vals=alpha[ys[order],xs[order]]
print('count',len(vals))
print('first 80 vals', vals[:80].tolist())
# try 5-bit packing (values 0..31 after subtract 224?)
b=vals-224
print('min/max', b.min(), b.max())
bits=''.join(f'{v:05b}' for v in b)
import re
# pack bits MSB first
out=bytearray()
for i in range(0,len(bits)-7,8):
    out.append(int(bits[i:i+8],2))
data=bytes(out)
print('packed len', len(data))
print('ascii-ish:', ''.join(chr(c) if 32<=c<127 else '.' for c in data[:200]))
import re
for m in re.finditer(rb'[0-9a-fA-F]{16,}', data):
    print('hexrun', m.group())