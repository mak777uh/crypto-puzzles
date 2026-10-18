import numpy as np
from PIL import Image
im=Image.open('data/cryptoHALV.png').convert('L')
a=np.array(im)
print('size', a.shape)
row=a[475, :]
# x=92+3k
xs=[92+3*k for k in range(256)]
vals=[int(row[x]) for x in xs]
print('first 32 vals', vals[:32])
# quantize to 4 levels? README says L??{0..3}; threshold
# Use 4 levels by splitting 0..255 into 4
levels=[v//64 for v in vals]
print('first 64 levels', levels[:64])
# count level frequencies
from collections import Counter
print('freq', Counter(levels))
# save
np.array(vals,dtype=np.uint8).tofile('data/vals.bin')
np.array(levels,dtype=np.uint8).tofile('data/levels.bin')