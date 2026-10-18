import cv2, easyocr
r=easyocr.Reader(['en'],gpu=False)
img=cv2.imread('data/frames/f_001.jpg')
res=r.readtext(img,detail=1,allowlist='0123456789abcdefABCDEF')
print('f001 allowlist:', ' | '.join(f'{t}({c:.2f})' for b,t,c in res))