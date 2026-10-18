import cv2, numpy as np
def grab(video,t):
    cap=cv2.VideoCapture(video); cap.set(cv2.CAP_PROP_POS_FRAMES,int(t*60)); ok,fr=cap.read(); cap.release(); return fr
def hp(img,sigma=5,amp=6):
    f=img.astype(np.float32)
    b=cv2.GaussianBlur(f,(0,0),sigma)
    d=f-b
    d=np.clip(d*amp+128,0,255).astype(np.uint8)
    return d
for tag,video,t in [('p1s1','data/3l1jFa3Mw0s_720p60.mp4',12),('p2p1','data/TRUUTryah70_720p60.mp4',10),('p2p2','data/U_0DtYHDPy0_720p60.mp4',10)]:
    fr=grab(video,t)
    tiles=[]
    for ci,cn in enumerate(['B','G','R']):
        ch=fr[:,:,ci]
        d=hp(ch)
        d=cv2.createCLAHE(clipLimit=3.0,tileGridSize=(8,8)).apply(d)
        d=cv2.resize(d,(640,360))
        cv2.putText(d,cn,(6,24),cv2.FONT_HERSHEY_SIMPLEX,0.8,(0,0,255),2)
        tiles.append(cv2.cvtColor(d,cv2.COLOR_GRAY2BGR))
    g=cv2.cvtColor(fr,cv2.COLOR_BGR2GRAY)
    d=hp(g); d=cv2.createCLAHE(clipLimit=3.0,tileGridSize=(8,8)).apply(d); d=cv2.resize(d,(640,360))
    cv2.putText(d,'gray',(6,24),cv2.FONT_HERSHEY_SIMPLEX,0.8,(0,0,255),2)
    tiles.append(cv2.cvtColor(d,cv2.COLOR_GRAY2BGR))
    sheet=np.vstack([np.hstack(tiles[:2]),np.hstack(tiles[2:])])
    cv2.imwrite(f'data/f720/{tag}_hp_channels.png',sheet); print(tag,sheet.shape)
