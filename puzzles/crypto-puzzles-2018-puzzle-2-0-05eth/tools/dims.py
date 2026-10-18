import cv2, glob, os
for p in sorted(glob.glob('data/frames/*.jpg'))[:5]+['data/contact_2fps.jpg','data/contact_first8.jpg']:
    im=cv2.imread(p)
    print(os.path.basename(p), im.shape if im is not None else None)