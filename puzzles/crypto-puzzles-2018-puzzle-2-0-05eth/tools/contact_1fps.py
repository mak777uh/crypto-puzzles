import cv2, numpy as np, sys
fn,out=sys.argv[1],sys.argv[2]
cap=cv2.VideoCapture(fn); fps=cap.get(cv2.CAP_PROP_FPS)
thumbs=[]; i=0
while True:
    ok,fr=cap.read()
    if not ok: break
    if abs(i/fps-round(i/fps))<1e-6:  # every 1.0 s
        t=round(i/fps)
        th=cv2.resize(fr,(384,216))
        cv2.putText(th,f'{t}s',(6,20),cv2.FONT_HERSHEY_SIMPLEX,0.6,(0,0,255),2)
        thumbs.append(th)
    i+=1
cap.release()
cols=5; rows=(len(thumbs)+cols-1)//cols
sheet=np.zeros((rows*216,cols*384,3),np.uint8)
for k,th in enumerate(thumbs):
    r,c=divmod(k,cols); sheet[r*216:(r+1)*216,c*384:(c+1)*384]=th
cv2.imwrite(out,sheet); print(out,len(thumbs),'frames',sheet.shape)
