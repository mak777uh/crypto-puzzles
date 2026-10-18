import numpy as np
from PIL import Image
im=Image.open('data/puzzle11.png')
a=np.array(im)
alpha=a[:,:,1]
mask=(alpha!=255).astype(np.uint8)*255
Image.fromarray(mask).save('data/alpha_mask.png')
print('non255 count', int((alpha!=255).sum()))
# connected components
import cv2
num,labels,stats,centroids=cv2.connectedComponentsWithStats(mask,8)
print('components', num)
for i in range(1,num):
    x,y,w,h,area=stats[i]
    if area>=5:
        print(i, 'bbox', (x,y,w,h), 'area', area)