import cv2, numpy as np
cap=cv2.VideoCapture('data/puzzle1_solution_0jJ6XadOAWk_720p60.mp4')
n=int(cap.get(cv2.CAP_PROP_FRAME_COUNT)); print('frames',n)
acc=None; accmax=None; diff=[]
prev=None; i=0
while True:
    ok,fr=cap.read()
    if not ok: break
    g=cv2.cvtColor(fr,cv2.COLOR_BGR2GRAY).astype(np.float32)
    if acc is None: acc=g.copy(); accmax=g.copy()
    else:
        acc+=g; accmax=np.maximum(accmax,g)
    if prev is not None: diff.append((i,float(np.mean(np.abs(g-prev)))))
    prev=g
    i+=1
cap.release()
mean=(acc/n).astype(np.uint8); mx=accmax.astype(np.uint8)
cv2.imwrite('data/f720/sol_mean.png',mean); cv2.imwrite('data/f720/sol_max.png',mx)
d=np.array([x[1] for x in diff])
print('diff mean %.3f max %.3f at %d'%(d.mean(),d.max(),diff[int(d.argmax())][0]))
# top 12 diff frames
idx=np.argsort(d)[-12:][::-1]
print([(diff[int(k)][0],round(float(d[k]),2)) for k in idx])
