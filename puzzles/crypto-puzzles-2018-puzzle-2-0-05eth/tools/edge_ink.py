import cv2, numpy as np, sys
fn=sys.argv[1]
cap=cv2.VideoCapture(fn)
fps=cap.get(cv2.CAP_PROP_FPS); W=int(cap.get(cv2.CAP_PROP_FRAME_WIDTH)); H=int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
print(fn,W,H,fps)
rows=[]
i=0; prev=None
while True:
    ok,fr=cap.read()
    if not ok: break
    g=cv2.cvtColor(fr,cv2.COLOR_BGR2GRAY)
    # glyphs are near-white >200; background max ~150. Use threshold 200
    m=g>200
    L=int(m[:,:24].sum()); R=int(m[:,-24:].sum()); T=int(m[:24,:].sum()); B=int(m[-24:,:].sum())
    tot=int(m.sum())
    if max(L,R,T,B)>5:
        rows.append((i,round(i/fps,2),tot,L,R,T,B))
    i+=1
cap.release()
print('frames with edge ink:',len(rows))
# compress into windows
out=[]; start=None; last=None
for r in rows:
    if start is None: start=r; last=r; continue
    if r[0]-last[0]<=3: last=r
    else: out.append((start,last)); start=r; last=r
if start: out.append((start,last))
for a,b in out:
    print(f'window {a[1]}-{b[1]}s frames {a[0]}-{b[0]} tot[{a[2]}..{b[2]}] Lmax{max(x[3] for x in rows if a[0]<=x[0]<=b[0])} Rmax{max(x[4] for x in rows if a[0]<=x[0]<=b[0])} Tmax{max(x[5] for x in rows if a[0]<=x[0]<=b[0])} Bmax{max(x[6] for x in rows if a[0]<=x[0]<=b[0])}')
