import numpy as np
from PIL import Image
for y in [475]:
    im=np.array(Image.open('crypto5.png').convert('L'))
    xs=[92+3*k for k in range(256)]
    vals=im[y,xs]
    print('y',y,'first 32', vals[:32].tolist())
    print('unique', np.unique(vals, return_counts=True))