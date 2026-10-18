import cv2, numpy as np
A=cv2.imread('data/f720/layer_A.png',0)>128
C=cv2.imread('data/f720/layer_C.png',0)>128
def iou(x,y): return (x&y).sum()/max(1,(x|y).sum())
trans={
 'id':lambda m:m, 'fliplr':lambda m:np.fliplr(m), 'flipud':lambda m:np.flipud(m),
 'rot90':lambda m:np.rot90(m,1), 'rot180':lambda m:np.rot90(m,2), 'rot270':lambda m:np.rot90(m,3),
 'transpose':lambda m:m.T, 'antitranspose':lambda m:np.rot90(m,2).T}
for k,f in trans.items():
    t=f(C)
    if t.shape!=A.shape:
        t=cv2.resize(t.astype(np.uint8),(A.shape[1],A.shape[0]))>0
    print(k, round(iou(A,t),3))
# best shift dx,dy of C onto A
best=(0,0,0)
for dy in range(-30,31):
    for dx in range(-40,41):
        t=np.roll(np.roll(C,dy,axis=0),dx,axis=1)
        s=iou(A,t)
        if s>best[2]: best=(dx,dy,s)
print('best shift dx,dy,iou',best)
