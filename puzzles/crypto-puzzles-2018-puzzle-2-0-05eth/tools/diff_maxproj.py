import cv2, numpy as np, os
def run(video,tag,base_t0=0.5,base_t1=4.0):
    cap=cv2.VideoCapture(video); fps=cap.get(cv2.CAP_PROP_FPS); n=int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    base_frames=[]
    cap.set(cv2.CAP_PROP_POS_FRAMES,int(base_t0*fps))
    for i in range(int(base_t0*fps),int(base_t1*fps)):
        ok,fr=cap.read()
        if not ok: break
        base_frames.append(cv2.cvtColor(fr,cv2.COLOR_BGR2GRAY).astype(np.float32))
    base=np.median(np.stack(base_frames,0),axis=0)
    cap.set(cv2.CAP_PROP_POS_FRAMES,0)
    mx=np.zeros_like(base); sm=np.zeros_like(base); cnt=0
    while True:
        ok,fr=cap.read()
        if not ok: break
        g=cv2.cvtColor(fr,cv2.COLOR_BGR2GRAY).astype(np.float32)
        d=np.abs(g-base)
        np.maximum(mx,d,out=mx); sm+=d; cnt+=1
    cap.release()
    for name,img in [('max',mx),('mean',sm/max(cnt,1))]:
        img=np.clip(img,0,255).astype(np.uint8)
        eq=cv2.createCLAHE(clipLimit=6.0,tileGridSize=(16,16)).apply(img)
        cv2.imwrite(f'data/f720/{tag}_diff_{name}.png',eq)
    print(tag,'done frames',cnt)
run('data/3l1jFa3Mw0s_720p60.mp4','p1s1')
run('data/TRUUTryah70_720p60.mp4','p2p1')
run('data/U_0DtYHDPy0_720p60.mp4','p2p2')
