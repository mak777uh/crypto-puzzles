import cv2, easyocr
r=easyocr.Reader(['en'],gpu=False)
for scale in [2,4,8]:
    img=cv2.imread('alpha_mask.png')
    if img is None:
        import numpy as np
        from PIL import Image
        m=np.array(Image.open('alpha_mask.png'))
        img=cv2.cvtColor(m,cv2.COLOR_GRAY2BGR)
    big=cv2.resize(img,(img.shape[1]*scale,img.shape[0]*scale),interpolation=cv2.INTER_NEAREST)
    res=r.readtext(big,detail=1)
    txt=' '.join(t for b,t,c in res)
    print(f'scale {scale}:', txt if txt else '(none)')