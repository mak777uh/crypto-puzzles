import cv2, easyocr, glob, os
r=easyocr.Reader(['en'],gpu=False)
out=[]
for p in sorted(glob.glob('data/frames/*.jpg')):
    img=cv2.imread(p)
    res=r.readtext(img,detail=1,allowlist='0123456789abcdefABCDEF')
    txt=' '.join(t for b,t,c in res)
    out.append(f'{os.path.basename(p)} :: {txt}')
open('data/ocr_allow_all.txt','w',encoding='utf-8').write('\n'.join(out))
print('\n'.join(out[:20]))