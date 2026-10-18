import cv2, easyocr
r=easyocr.Reader(['en'], gpu=False)
p='data/frames/f_001.jpg'
img=cv2.imread(p)
for name,im in [('orig',img),('gray',cv2.cvtColor(img,cv2.COLOR_BGR2GRAY)),('thresh',cv2.threshold(cv2.cvtColor(img,cv2.COLOR_BGR2GRAY),127,255,cv2.THRESH_BINARY)[1])]:
    # upscale
    im2=cv2.resize(im,(im.shape[1]*2,im.shape[0]*2),interpolation=cv2.INTER_CUBIC)
    res=r.readtext(im2,detail=1)
    print(name, '::', ' | '.join(f'{t}({c:.2f})' for b,t,c in res))