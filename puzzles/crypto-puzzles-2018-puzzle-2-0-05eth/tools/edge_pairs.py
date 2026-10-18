import cv2, numpy as np
cap=cv2.VideoCapture('data/TRUUTryah70_720p60.mp4')
want={1254:'20.90',1284:'21.40'}
i=0
while True:
    ok,fr=cap.read()
    if not ok: break
    if i in want:
        L=fr[250:480,0:160]; R=fr[250:480,1120:1280]
        pair=np.hstack([L,np.full((230,40,3),40,np.uint8),R])
        cv2.imwrite(f'data/f720/edgepair_{want[i]}.png',pair)
        # rolled: shift frame right by 640 so right edge goes to center? try np.roll(fr,640,axis=1)
        rolled=np.roll(fr,640,axis=1)
        cv2.imwrite(f'data/f720/roll640_{want[i]}.png',rolled)
    i+=1
cap.release()
print('ok')
