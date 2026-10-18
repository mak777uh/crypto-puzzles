import os
from PIL import Image
for n in range(1,6):
    p=f'crypto{n}.png'
    im=Image.open(p)
    print(p, im.size, im.mode)