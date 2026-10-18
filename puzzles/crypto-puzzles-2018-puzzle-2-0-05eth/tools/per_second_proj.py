import cv2, numpy as np, os
D='data'
def proj(video, tag):
    cap=cv2.VideoCapture(os.path.join(D,video)); fps=cap.get(cv2.CAP_PROP_FPS)
    n=int(cap.get(cv2.CAP_PROP_FRAME_COUNT)); dur=n/fps
    acc={}
    i=0
    while True:
        ok,fr=cap.read()
        if not ok: break
        s=int(i/fps)
        g=cv2.cvtColor(fr,cv2.COLOR_BGR2GRAY)
        if s not in acc: acc[s]=g.copy()
        else: np.maximum(acc[s],g,out=acc[s])
        i+=1
    cap.release()
    tiles=[]
    for s in range(int(np.ceil(dur))):
        if s in acc:
            g=acc[s]
            g=cv2.normalize(g,None,0,255,cv2.NORM_MINMAX)
            g=cv2.createCLAHE(clipLimit=3.0,tileGridSize=(8,8)).apply(g)
        else:
            g=np.zeros((720,1280),np.uint8)
        g=cv2.resize(g,(426,240))
        cv2.putText(g,f'{s}s',(6,20),cv2.FONT_HERSHEY_SIMPLEX,0.6,(0,0,255),2)
        tiles.append(g)
    rows=[]
    for r in range(0,len(tiles),6):
        row=tiles[r:r+6]
        while len(row)<6: row.append(np.zeros((240,426),np.uint8))
        rows.append(np.hstack(row))
    sheet=np.vstack(rows)
    cv2.imwrite(os.path.join(D,f'{tag}_persecond_max.png'),sheet)
    print(tag,'done',sheet.shape)
proj('TRUUTryah70_720p60.mp4','p1')
proj('U_0DtYHDPy0_720p60.mp4','p2')
