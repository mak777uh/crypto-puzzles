import cv2, numpy as np
A=cv2.imread('data/f720/layer_A.png',0)>128
C=cv2.imread('data/f720/layer_C.png',0)>128
y0,y1=35,525
bounds=[y0+round(k*(y1-y0)/8) for k in range(9)]
print(bounds)
cap=cv2.VideoCapture('data/U_0DtYHDPy0_720p60.mp4')
frames={}; i=0
while True:
    ok,fr=cap.read()
    if not ok: break
    if i in (1554,1565): frames[i]=fr[80:640,590:700].copy()
    i+=1
cap.release()
Fa=frames[1554]; Fc=frames[1565]
# variant 1: C(left of glyph) + A(right of glyph)
for variant in ['CA','AC']:
    comps=[]
    for k in range(8):
        ya,yb=bounds[k],bounds[k+1]
        cseg=Fc[ya:yb,27:73]
        aseg=Fa[ya:yb,32:68]
        if variant=='CA': comp=np.hstack([cseg,aseg])
        else: comp=np.hstack([aseg,cseg])
        comps.append(comp)
    maxh=max(c.shape[0] for c in comps)
    rows=[np.pad(c,((0,maxh-c.shape[0]),(0,0),(0,0)),constant_values=20) for c in comps]
    grid=np.hstack([np.pad(r,((0,0),(0,10),(0,0)),constant_values=20) for r in rows])
    big=cv2.resize(grid,None,fx=5,fy=5,interpolation=cv2.INTER_LANCZOS4)
    cv2.imwrite(f'data/f720/column8_{variant}.png',big)
    print(variant,big.shape)
