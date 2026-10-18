import cv2, numpy as np
cap=cv2.VideoCapture('data/TRUUTryah70_720p60.mp4')
i=0; recs=[]
while True:
    ok,fr=cap.read()
    if not ok: break
    if (1219<=i<=1307) or (1454<=i<=1539):
        g=cv2.cvtColor(fr,cv2.COLOR_BGR2GRAY); m=g>200
        L=int(m[:,:24].sum()); R=int(m[:,-24:].sum()); T=int(m[:24,:].sum()); B=int(m[-24:,:].sum())
        recs.append((i,i/60.0,int(m.sum()),L,R,T,B))
    i+=1
cap.release()
for r in recs:
    if r[0]%3==0: print('%d %.2f tot=%d L=%d R=%d T=%d B=%d'%r)
