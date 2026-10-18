import cv2, numpy as np
cap=cv2.VideoCapture('data/TRUUTryah70_720p60.mp4')
i=0
print('frame t -> comps (x,y,w,h,area)')
while True:
    ok,fr=cap.read()
    if not ok: break
    if 1219<=i<=1307 and i%3==0:
        g=cv2.cvtColor(fr,cv2.COLOR_BGR2GRAY); m=(g>200).astype(np.uint8)
        n,lab,stats,cent=cv2.connectedComponentsWithStats(m,8)
        comps=[]
        for k in range(1,n):
            x,y,w,h,a=stats[k]
            if a>=150: comps.append((int(x),int(y),int(w),int(h),int(a)))
        print(f'{i} {i/60:.2f} -> {comps}')
    i+=1
cap.release()
