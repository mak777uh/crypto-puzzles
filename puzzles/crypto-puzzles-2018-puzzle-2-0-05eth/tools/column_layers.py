import cv2, numpy as np
cap=cv2.VideoCapture('data/U_0DtYHDPy0_720p60.mp4')
x0,x1,y0,y1=590,700,80,640
clusters={'A':[],'B':[],'C':[]}
i=0
while True:
    ok,fr=cap.read()
    if not ok: break
    t=i/60.0
    if 26.0<=t<=27.0:
        g=cv2.cvtColor(fr[y0:y1,x0:x1],cv2.COLOR_BGR2GRAY)
        m=(g>170).astype(np.uint8)
        a=int(m.sum())
        k='A' if a<10200 else ('B' if a<11000 else 'C')
        # careful: A~9035 C~7475 B~12760
        k='B' if a>11000 else ('A' if a>8200 else 'C')
        clusters[k].append(m)
    i+=1
cap.release()
med={}
for k,v in clusters.items():
    print(k,len(v))
    med[k]=(np.mean(v,axis=0)>0.5).astype(np.uint8)
    cv2.imwrite(f'data/f720/layer_{k}.png',med[k]*255)
OR=(med['A']|med['B']|med['C'])
AND=(med['A']&med['B']&med['C'])
XOR=(med['A']^med['B']^med['C'])
cv2.imwrite('data/f720/layer_OR.png',OR*255)
cv2.imwrite('data/f720/layer_AND.png',AND*255)
cv2.imwrite('data/f720/layer_XOR.png',XOR*255)
print('areas med', {k:int(v.sum()) for k,v in med.items()}, 'OR',int(OR.sum()),'AND',int(AND.sum()),'XOR',int(XOR.sum()))
