import numpy as np
from PIL import Image
im=np.array(Image.open('crypto5.png').convert('L'))
print('shape', im.shape)
# rows with non-zero
rows=np.where(im.sum(axis=1)>0)[0]
print('nonzero rows min/max/count', rows.min(), rows.max(), len(rows))
# columns with non-zero
cols=np.where(im.sum(axis=0)>0)[0]
print('nonzero cols min/max/count', cols.min(), cols.max(), len(cols))