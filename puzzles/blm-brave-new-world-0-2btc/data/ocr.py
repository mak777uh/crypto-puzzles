import cv2, easyocr
r=easyocr.Reader(['en'],gpu=False)
img=cv2.imread('data/puzzle.png')
res=r.readtext(img,detail=1)
out=[f'{c:.2f} {t}' for b,t,c in res]
open('data/ocr.txt','w',encoding='utf-8').write('\n'.join(out))
print(len(out))
for line in out[:40]: print(line)