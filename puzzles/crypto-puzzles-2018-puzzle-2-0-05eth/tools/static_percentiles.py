import cv2, numpy as np
def run(video,tag,t0,t1):
    cap=cv2.VideoCapture(video); fps=cap.get(cv2.CAP_PROP_FPS)
    f0,f1=int(t0*fps),int(t1*fps)
    cap.set(cv2.CAP_PROP_POS_FRAMES,f0)
    frames=[]
    i=f0
    while i<f1:
        ok,fr=cap.read()
        if not ok: break
        frames.append(cv2.cvtColor(fr,cv2.COLOR_BGR2GRAY))
        i+=1
    cap.release()
    arr=np.stack(frames,0)
    print(tag,'frames',arr.shape)
    for q in [0,10,50,90,100]:
        im=np.percentile(arr,q,axis=0).astype(np.uint8)
        eq=cv2.createCLAHE(clipLimit=6.0,tileGridSize=(16,16)).apply(im)
        cv2.imwrite(f'data/f720/{tag}_p{q}.png',eq)
        # high-pass version
        hp=im.astype(np.float32)-cv2.GaussianBlur(im,(0,0),9)
        hp=cv2.normalize(hp,None,0,255,cv2.NORM_MINMAX).astype(np.uint8)
        cv2.imwrite(f'data/f720/{tag}_p{q}_hp.png',hp)
run('data/TRUUTryah70_720p60.mp4','p1static',5,19)
run('data/U_0DtYHDPy0_720p60.mp4','p2static',5,20)
