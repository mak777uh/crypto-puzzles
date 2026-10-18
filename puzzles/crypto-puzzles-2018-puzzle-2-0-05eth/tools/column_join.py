import cv2, numpy as np
A=cv2.imread('data/f720/layer_A.png',0)>128
C=cv2.imread('data/f720/layer_C.png',0)>128
U=A|C
rowp=U.sum(axis=1)
# find bands: rows with ink
bands=[]; inb=False
for y,v in enumerate(rowp):
    if v>0 and not inb: y0=y; inb=True
    if v==0 and inb: bands.append((y0,y-1)); inb=False
if inb: bands.append((y0,len(rowp)-1))
# merge bands closer than 4 px
merged=[]
for b in bands:
    if merged and b[0]-merged[-1][1]<=4: merged[-1]=(merged[-1][0],b[1])
    else: merged.append(list(b))
print('bands',merged)
CANVAS_W=110
comps=[]
for idx,(y0,y1) in enumerate(merged):
    h=y1-y0+1
    # C shifted left by 40: place C region x 27..73 at new x 27-40 .. 73-40 = -13..33 -> pad
    # Build a canvas of width 150: C occupies [0..46], A occupies [46..46+36]
    cc=np.zeros((h,46),np.uint8); a=np.zeros((h,36),np.uint8)
    cs=max(0,27); ce=min(74,110)
    cc[:, max(0,46-(73-27)-0):] = 0
    # simpler: crop C from x=27..73 (46 px), crop A from x=32..68 (36 px), hstack
    cseg=(C[y0:y1+1,27:73]*255).astype(np.uint8)
    aseg=(A[y0:y1+1,32:68]*255).astype(np.uint8)
    comp=np.hstack([cseg,aseg])
    comps.append(comp)
maxh=max(c.shape[0] for c in comps)
rows=[]
for c in comps:
    pad=np.zeros((maxh,c.shape[1]),np.uint8); pad[:c.shape[0],:]=c; rows.append(pad)
grid=np.hstack([np.pad(r,((0,0),(0,8))) for r in rows])
big=cv2.resize(grid,None,fx=5,fy=5,interpolation=cv2.INTER_NEAREST)
cv2.imwrite('data/f720/column_joined_masks.png',big)
# also raw image version using best frames
cap=cv2.VideoCapture('data/U_0DtYHDPy0_720p60.mp4')
frames={}
i=0
while True:
    ok,fr=cap.read()
    if not ok: break
    if i in (1554,1565):
        frames[i]=fr[80:640,590:700].copy()
    i+=1
cap.release()
Fa=frames[1554]; Fc=frames[1565]
comps=[]
for (y0,y1) in merged:
    cseg=Fc[y0:y1+1,27:73]
    aseg=Fa[y0:y1+1,32:68]
    comp=np.hstack([cseg,aseg]); comps.append(comp)
maxh=max(c.shape[0] for c in comps)
rows=[]
for c in comps:
    pad=np.zeros((maxh,c.shape[1],3),np.uint8); pad[:c.shape[0],:]=c; rows.append(pad)
grid=np.hstack([np.pad(r,((0,0),(0,8),(0,0)),constant_values=20) for r in rows])
big=cv2.resize(grid,None,fx=5,fy=5,interpolation=cv2.INTER_LANCZOS4)
cv2.imwrite('data/f720/column_joined.png',big)
print('saved',big.shape)
