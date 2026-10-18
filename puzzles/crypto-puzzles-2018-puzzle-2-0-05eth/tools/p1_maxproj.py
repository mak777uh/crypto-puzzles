import cv2, numpy as np
cap=cv2.VideoCapture('data/TRUUTryah70_720p60.mp4')
mx=None; mn=None; n=0; acc=None
caps={'all':(0,1800),'pre':(0,1140),'post':(1140,1800)}
res={k:[None,None,0] for k in caps}
while True:
    ok,fr=cap.read()
    if not ok: break
    g=cv2.cvtColor(fr,cv2.COLOR_BGR2GRAY).astype(np.uint8)
    for k,(a,b) in caps.items():
        if a<=n<b:
            if res[k][0] is None: res[k][0]=g.copy(); res[k][1]=g.copy()
            else:
                np.maximum(res[k][0],g,out=res[k][0]); np.minimum(res[k][1],g,out=res[k][1])
            res[k][2]+=1
    n+=1
cap.release()
for k,(M,m,c) in res.items():
    for tag,img in [('max',M),('min',m)]:
        if img is None: continue
        eq=cv2.createCLAHE(clipLimit=4.0,tileGridSize=(16,16)).apply(img)
        cv2.imwrite(f'data/f720/p1proj_{k}_{tag}.png',eq)
        cv2.imwrite(f'data/f720/p1proj_{k}_{tag}_raw.png',img)
    print(k,c)
