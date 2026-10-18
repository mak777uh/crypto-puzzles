import easyocr, cv2, glob, os
r=easyocr.Reader(['en'], gpu=False)
for p in sorted(glob.glob('data/frames/*.jpg')):
    img=cv2.imread(p)
    res=r.readtext(img, detail=1)
    txt=' | '.join(f'{t}({c:.2f})' for b,t,c in res)
    print(os.path.basename(p), '::', txt)