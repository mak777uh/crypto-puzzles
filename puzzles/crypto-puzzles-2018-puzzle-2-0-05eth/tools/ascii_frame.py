import cv2
p='data/frames/f_011.jpg'
img=cv2.imread(p, cv2.IMREAD_GRAYSCALE)
h,w=img.shape
scale=0.1
small=cv2.resize(img,(int(w*scale),int(h*scale)))
chars=' .:-=+*#%@'
for row in small:
    print(''.join(chars[min(9, int(x/256*10))] for x in row))