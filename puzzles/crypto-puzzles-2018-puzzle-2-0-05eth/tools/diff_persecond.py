import cv2, numpy as np
def run(video,tag):
    cap=cv2.VideoCapture(video); fps=cap.get(cv2.CAP_PROP_FPS); n=int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    base_frames=[]
    cap.set(cv2.CAP_PROP_POS_FRAMES,int(0.5*fps))
    for i in range(int(0.5*fps),int(4*fps)):
        ok,fr=cap.read()
        if not ok: break
        base_frames.append(cv2.cvtColor(fr,cv2.COLOR_BGR2GRAY).astype(np.float32))
    base=np.median(np.stack(base_frames,0),axis=0)
    cap.set(cv2.CAP_PROP_POS_FRAMES,0)
    acc={}; i=0
    while True:
        ok,fr=cap.read()
        if not ok: break
        g=cv2.cvtColor(fr,cv2.COLOR_BGR2GRAY).astype(np.float32)
        d=np.abs(g-base)
        s=int(i/fps)
        if s not in acc: acc[s]=np.zeros_like(d)
        np.maximum(acc[s],d,out=acc[s])
        i+=1
    cap.release()
    tiles=[]
    for s in range(30):
        d=acc.get(s,np.zeros_like(base))
        img=np.clip(d*4,0,255).astype(np.uint8)  # amplify 4x
        img=cv2.createCLAHE(clipLimit=4.0,tileGridSize=(8,8)).apply(img)
        img=cv2.resize(img,(426,240))
        cv2.putText(img,f'{s}s',(6,20),cv2.FONT_HERSHEY_SIMPLEX,0.6,(0,0,255),2)
        tiles.append(cv2.cvtColor(img,cv2.COLOR_GRAY2BGR))
    rows=[np.hstack(tiles[r:r+6]) for r in range(0,30,6)]
    sheet=np.vstack(rows)
    cv2.imwrite(f'data/f720/{tag}_diff_persecond.png',sheet)
    # window isolated maxes
    for name,(a,b) in {'demo':(19.5,27.0),'pre':(4,19.5)}.items():
        mm=np.zeros_like(base)
        for s in range(int(a),int(np.ceil(b))):
            if s in acc: np.maximum(mm,acc[s],out=mm)
        img=np.clip(mm*4,0,255).astype(np.uint8)
        img=cv2.createCLAHE(clipLimit=4.0,tileGridSize=(8,8)).apply(img)
        cv2.imwrite(f'data/f720/{tag}_diffwin_{name}.png',img)
    print(tag,'done',sheet.shape)
run('data/TRUUTryah70_720p60.mp4','p2p1')
run('data/U_0DtYHDPy0_720p60.mp4','p2p2')
run('data/3l1jFa3Mw0s_720p60.mp4','p1s1')
