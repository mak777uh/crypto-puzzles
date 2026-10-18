import easyocr, cv2
r=easyocr.Reader(['en'],gpu=False)
for n in range(1,6):
    img=cv2.imread(f'crypto{n}.png')
    res=r.readtext(img,detail=1)
    txt=' | '.join(f'{t}({c:.2f})' for b,t,c in res)
    print(f'crypto{n}.png ::', txt)