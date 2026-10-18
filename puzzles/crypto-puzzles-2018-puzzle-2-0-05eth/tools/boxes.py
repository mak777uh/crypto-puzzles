import cv2, easyocr
r=easyocr.Reader(['en'],gpu=False)
img=cv2.imread('data/frames/f_011.jpg')
res=r.readtext(img,detail=1)
for b,t,c in res:
    xs=[p[0] for p in b]; ys=[p[1] for p in b]
    print(f'{c:.2f} {t!r} bbox x={min(xs):.0f}-{max(xs):.0f} y={min(ys):.0f}-{max(ys):.0f}')