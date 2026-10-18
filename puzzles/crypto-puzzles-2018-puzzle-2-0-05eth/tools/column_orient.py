import cv2, numpy as np
cap=cv2.VideoCapture('data/U_0DtYHDPy0_720p60.mp4')
i=0; best={}
while True:
    ok,fr=cap.read()
    if not ok: break
    t=i/60
    if 25.9<=t<=27.0:
        g=cv2.cvtColor(fr,cv2.COLOR_BGR2GRAY)
        a=int((g[80:640,590:700]>170).sum())
        key='A' if 8200<a<10200 else ('B' if a>=10200 else 'C')
        if key not in best: best[key]=(i,fr.copy())
    i+=1
cap.release()
for k,(i,fr) in best.items():
    crop=fr[80:640,590:700]
    big=cv2.resize(crop,None,fx=4,fy=4,interpolation=cv2.INTER_LANCZOS4)
    cv2.imwrite(f'data/f720/orient_{k}_asis.png',big)
    cv2.imwrite(f'data/f720/orient_{k}_mirror.png',cv2.flip(big,1))
    cv2.imwrite(f'data/f720/orient_{k}_rot90.png',cv2.rotate(big,cv2.ROTATE_90_CLOCKWISE))
    cv2.imwrite(f'data/f720/orient_{k}_rot270.png',cv2.rotate(big,cv2.ROTATE_90_COUNTERCLOCKWISE))
    cv2.imwrite(f'data/f720/orient_{k}_rot90m.png',cv2.flip(cv2.rotate(big,cv2.ROTATE_90_CLOCKWISE),0))
    cv2.imwrite(f'data/f720/orient_{k}_rot270m.png',cv2.flip(cv2.rotate(big,cv2.ROTATE_90_COUNTERCLOCKWISE),0))
    print(k,'frame',i,'t',i/60)
