import cv2, easyocr, glob, os, re
r=easyocr.Reader(['en'],gpu=False)
out=[]
for d in ['data/allframes_truu','data/allframes_u0']:
    for p in sorted(glob.glob(os.path.join(d,'*.jpg'))):
        img=cv2.imread(p)
        res=r.readtext(img,detail=1)
        txt=' '.join(t for b,t,c in res)
        # find hex-like tokens length>=8
        toks=re.findall(r'[0-9a-fA-F]{8,}', txt)
        if toks:
            out.append(f'{os.path.basename(p)} :: {" ".join(toks)}')
open('data/ocr_default_all.txt','w',encoding='utf-8').write('\n'.join(out))
print('candidates', len(out))
for line in out[:20]: print(line)