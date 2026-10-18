import cv2, numpy as np, json, hashlib
cap=cv2.VideoCapture('data/U_0DtYHDPy0_720p60.mp4')
fps=cap.get(cv2.CAP_PROP_FPS); n=int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
print('fps',fps,'frames',n)
x0,x1,y0,y1=590,700,80,640
states={}; order=[]
i=0
while True:
    ok,fr=cap.read()
    if not ok: break
    t=i/fps
    if 25.7<=t<=28.0:
        crop=cv2.cvtColor(fr[y0:y1,x0:x1],cv2.COLOR_BGR2GRAY)
        mask=(crop>170).astype(np.uint8)
        area=int(mask.sum())
        if area>100:
            h=hashlib.md5(mask.tobytes()).hexdigest()[:10]
            if h not in states:
                states[h]={'area':area,'first':round(i,1),'last':round(i,1),'t0':round(t,3),'cnt':1}
                order.append(h)
                cv2.imwrite(f'data/f720/colstate_{len(order):02d}.png',fr[y0:y1,x0:x1])
                cv2.imwrite(f'data/f720/colstate_{len(order):02d}_mask.png',mask*255)
            else:
                states[h]['last']=round(i,1); states[h]['cnt']+=1
    i+=1
cap.release()
print(json.dumps({k:states[k] for k in order},indent=1))
