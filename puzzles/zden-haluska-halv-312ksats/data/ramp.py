import numpy as np
from PIL import Image
im=np.array(Image.open('data/cryptoHALV.png').convert('L'))
col=im[443:507, 91]
print('len', len(col))
print(col.tolist())
print('unique', np.unique(col, return_counts=True))