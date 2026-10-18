import cv2, numpy as np, sys
fn,tag=sys.argv[1],sys.argv[2]
cap=cv2.VideoCapture(fn); n=int(cap.get(cv2.CAP_PROP_FRAME_COUNT)); fps=cap.get(cv2.CAP_PROP_FPS)
W=int(cap.get(cv2.CAP_PROP_FRAME_WIDTH)); H=int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
# sample every 2nd frame for median
samples=[]
i=0
while True:
    ok,fr=cap.read()
    if not ok: break
    if i%2==0: samples.append(cv2.cvtColor(fr,cv2.COLOR_BGR2GRAY))
    i+=1
cap.release()
med=np.median(np.stack(samples),axis=0).astype(np.uint8)
cv2.imwrite(f'data/f720/{tag}_median.png',med)
cap=cv2.VideoCapture(fn)
resmax=np.zeros((H,W),np.uint8); resmin=np.full((H,W),255,np.uint8); i=0
while True:
    ok,fr=cap.read()
    if not ok: break
    g=cv2.cvtColor(fr,cv2.COLOR_BGR2GRAY)
    d=cv2.absdiff(g,med)
    resmax=np.maximum(resmax,d)
    i+=1
cap.release()
rm=cv2.normalize(resmax,None,0,255,cv2.NORM_MINMAX)
cv2.imwrite(f'data/f720/{tag}_resmax.png',rm)
print(tag,'frames',n,'resmax max',int(resmax.max()))
