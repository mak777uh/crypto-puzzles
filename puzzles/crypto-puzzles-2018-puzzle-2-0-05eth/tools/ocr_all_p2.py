import cv2, easyocr, glob, os
r=easyocr.Reader(['en'],gpu=False)
for outdir in ['data/allframes_truu','data/allframes_u0']:
    out=[]
    for p in sorted(glob.glob(os.path.join(outdir,'*.jpg'))):
        img=cv2.imread(p)
        res=r.readtext(img,detail=1,allowlist='0123456789abcdefABCDEF')
        txt=' '.join(t for b,t,c in res)
        # keep frames with many hex chars
        if len(txt.replace(' ',''))>=12:
            out.append(f'{os.path.basename(p)} :: {txt}')
    print('===',outdir,'candidates',len(out))
    for line in out: print(line)