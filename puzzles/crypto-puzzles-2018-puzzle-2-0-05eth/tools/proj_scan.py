import cv2, numpy as np, sys
fn,tag=sys.argv[1],sys.argv[2]
cap=cv2.VideoCapture(fn); n=int(cap.get(cv2.CAP_PROP_FRAME_COUNT)); fps=cap.get(cv2.CAP_PROP_FPS)
print(fn,'frames',n,'fps',fps,'dur',n/fps)
acc=None; accmax=None; accmin=None; i=0
while True:
    ok,fr=cap.read()
    if not ok: break
    g=cv2.cvtColor(fr,cv2.COLOR_BGR2GRAY).astype(np.float32)
    if acc is None: acc=g.copy(); accmax=g.copy(); accmin=g.copy()
    else: acc+=g; accmax=np.maximum(accmax,g); accmin=np.minimum(accmin,g)
    i+=1
cap.release()
mean=(acc/n).astype(np.uint8); mx=accmax.astype(np.uint8); mn=accmin.astype(np.uint8)
cv2.imwrite(f'data/f720/{tag}_mean.png',mean); cv2.imwrite(f'data/f720/{tag}_max.png',mx); cv2.imwrite(f'data/f720/{tag}_min.png',mn)
# residual: max - mean reveals transient low-contrast content
res=cv2.subtract(mx,mean); res=cv2.normalize(res,None,0,255,cv2.NORM_MINMAX)
cv2.imwrite(f'data/f720/{tag}_res.png',res)
print('mean range',mean.min(),mean.max(),'res range',res.min(),res.max())
