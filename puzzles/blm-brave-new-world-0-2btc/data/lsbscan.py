import numpy as np, re, hashlib, zlib
from PIL import Image
im=Image.open('data/puzzle.png')
a=np.array(im)[:,:,:3]
# scan each channel bitplane, row/col order, for ascii/hex
hexre=re.compile(rb'[0-9a-fA-F]{32,}')
asc=re.compile(rb'[\x20-\x7e]{8,}')
found=[]
for c in range(3):
    for bit in range(8):
        plane=(a[:,:,c]>>bit)&1
        for order in ['C','F']:
            bits=plane.flatten(order=order)
            # pack
            n=(len(bits)//8)*8
            data=int(''.join(map(str,bits[:n].tolist())),2).to_bytes(n//8,'big')
            for m in hexre.finditer(data):
                found.append((f'ch{c}b{bit}{order}','hex',m.group().decode()))
            for m in asc.finditer(data):
                s=m.group()
                if len(s)>=12:
                    found.append((f'ch{c}b{bit}{order}','ascii',s[:80].decode('latin1')))
print('hits', len(found))
for f in found[:20]: print(f)