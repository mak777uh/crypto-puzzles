import cv2, os
cap=cv2.VideoCapture('data/TRUUTryah70.mp4')
outdir='data/allframes_truu'
os.makedirs(outdir,exist_ok=True)
i=0;n=0
while True:
    ok,frame=cap.read()
    if not ok: break
    if i%15==0:  # ~2 fps if 30fps
        cv2.imwrite(os.path.join(outdir,f'f_{n:04d}.jpg'),frame); n+=1
    i+=1
print('frames',n,'total',i)
cap=cv2.VideoCapture('data/U_0DtYHDPy0.mp4')
outdir='data/allframes_u0'
os.makedirs(outdir,exist_ok=True)
i=0;n=0
while True:
    ok,frame=cap.read()
    if not ok: break
    if i%15==0:
        cv2.imwrite(os.path.join(outdir,f'f_{n:04d}.jpg'),frame); n+=1
    i+=1
print('frames2',n,'total',i)