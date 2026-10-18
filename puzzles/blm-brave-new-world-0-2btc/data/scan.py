import numpy as np
from PIL import Image
im=Image.open('data/puzzle.png')
a=np.array(im)
print('mode', im.mode, 'shape', a.shape)
# alpha
alpha=a[:,:,3]
print('alpha unique count', len(np.unique(alpha)))
vals,counts=np.unique(alpha,return_counts=True)
print('alpha top', list(zip(vals.tolist(),counts.tolist()))[:20])
mask=alpha!=255
print('non255', int(mask.sum()))
# LSB of RGB at alpha!=255?
for c in range(3):
    bits=a[:,:,c][mask]&1
    print(f'ch{c} LSB ones at mask: {int(bits.sum())}/{len(bits)}')