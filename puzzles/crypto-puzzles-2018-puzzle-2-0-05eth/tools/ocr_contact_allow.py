import cv2, easyocr
r=easyocr.Reader(['en'],gpu=False)
for p in ['data/contact_first8.jpg','data/contact_2fps.jpg','data/contact2_2fps.jpg']:
    img=cv2.imread(p)
    res=r.readtext(img,detail=1,allowlist='0123456789abcdefABCDEF')
    txt=' '.join(t for b,t,c in res)
    print(p, '::', txt)