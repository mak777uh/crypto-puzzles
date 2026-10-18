import cv2, numpy as np, os
D='data'
def scan(video,t0,t1,step,ymin,ymax,xmin,xmax,tag,thr=170,amin=80):
    cap=cv2.VideoCapture(os.path.join(D,video)); fps=cap.get(cv2.CAP_PROP_FPS)
    f0,f1=int(t0*fps),int(t1*fps)
    cap.set(cv2.CAP_PROP_POS_FRAMES,f0)
    crops=[]; labels=[]; rows=[]
    idx=f0
    while idx<f1:
        ok,fr=cap.read()
        if not ok: break
        if (idx-f0)%step==0:
            g=cv2.cvtColor(fr,cv2.COLOR_BGR2GRAY)
            m=(g>thr).astype(np.uint8)*255
            m[:ymin]=0; m[ymax:]=0; m[:, :xmin]=0; m[:, xmax:]=0
            n,lab,stats,cent=cv2.connectedComponentsWithStats(m,8)
            comps=[]
            for k in range(1,n):
                x,y,w,h,a=stats[k]
                if a>=amin:
                    comps.append((x,y,w,h,a))
            print(f'{tag} {idx/fps:6.2f}s frame {idx}: '+ ' | '.join(f'x{x+w/2:.0f} y{y+h/2:.0f} {w}x{h} a{a}' for x,y,w,h,a in comps))
            # montage: crop a wide band with all comps
            if comps:
                x0=max(0,min(c[0] for c in comps)-15); x1=min(fr.shape[1],max(c[0]+c[2] for c in comps)+15)
                y0=max(0,min(c[1] for c in comps)-15); y1=min(fr.shape[0],max(c[1]+c[3] for c in comps)+15)
                crop=fr[y0:y1,x0:x1]
                h=110; w=max(1,int(crop.shape[1]*h/crop.shape[0]))
                crop=cv2.resize(crop,(w,h))
                if w>360: crop=crop[:, :360]
                canvas=np.zeros((140,380,3),np.uint8); canvas[25:25+h,5:5+crop.shape[1]]=crop
                cv2.putText(canvas,f'{idx/fps:.2f}',(5,15),cv2.FONT_HERSHEY_SIMPLEX,0.45,(0,255,0),1)
                rows.append(canvas)
        idx+=1
    cap.release()
    if rows:
        per=6
        sheet=[]
        for r in range(0,len(rows),per):
            row=rows[r:r+per]
            while len(row)<per: row.append(np.zeros((140,380,3),np.uint8))
            sheet.append(np.hstack(row))
        out=np.vstack(sheet)
        cv2.imwrite(f'data/f720/{tag}_glyphs.png',out)
        print(tag,'montage',out.shape)
scan('TRUUTryah70_720p60.mp4',19.5,27.5,6,250,650,0,1280,'p1',170,60)
scan('U_0DtYHDPy0_720p60.mp4',25.3,27.8,3,0,720,500,800,'p2col',170,60)
