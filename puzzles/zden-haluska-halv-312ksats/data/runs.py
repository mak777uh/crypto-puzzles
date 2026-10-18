import numpy as np
from PIL import Image
im=np.array(Image.open('data/cryptoHALV.png').convert('L'))
xs=[92+3*k for k in range(256)]
vals=im[475,xs]
bits=(vals>127).astype(int)
# runs
runs=[]
cur=bits[0]; cnt=1
for b in bits[1:]:
    if b==cur: cnt+=1
    else:
        runs.append((int(cur),cnt)); cur=b; cnt=1
runs.append((int(cur),cnt))
print('num runs', len(runs))
print('run lengths', [r[1] for r in runs])
print('run vals', [r[0] for r in runs])