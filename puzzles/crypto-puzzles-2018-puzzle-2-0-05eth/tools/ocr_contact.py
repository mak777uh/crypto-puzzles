import easyocr, cv2
r=easyocr.Reader(['en'], gpu=False)
img=cv2.imread('data/contact_first8.jpg')
res=r.readtext(img, detail=1)
print(len(res))
for b,t,c in res:
    print(f'{c:.3f} {t}')