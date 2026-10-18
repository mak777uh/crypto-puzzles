# Tier 1: GPS rule pos_i=S+10i+d_i, remaining units only, digits form a coordinate whose 0.1-deg cell (any hemisphere) holds a city>=15k (GeoNames cities15000),
# excluding cells within +-0.1deg of cities>=200k (already swept 13.10). Formats F1 DD.dddd/DD.dddd, F2 DD.dddd/1DD.ddd. Output: unique checksum-valid mnemonics.
import sys,os,itertools,hashlib,numpy as np
sys.path.insert(0,'/workspace/work/trithemius'); os.chdir('/workspace/work/trithemius')
from carrier3 import tokens3,VARS3
from oracle import IDX
C=[l.split('\t') for l in open('geo/cities15000.txt',encoding='utf8')]
lat=np.array([float(c[4]) for c in C]);lon=np.array([float(c[5]) for c in C]);pop=np.array([int(c[14] or 0) for c in C])
def cells(sel,k):
    s=set()
    a=np.floor(np.abs(lat[sel])*10).astype(int); b=np.floor(np.abs(lon[sel])*10).astype(int)
    for dy in range(-k,k+1):
        for dx in range(-k,k+1):
            s|=set(zip((a+dy).tolist(),(b+dx).tolist()))
    return s
T1=cells(pop>=15000,0)-cells(pop>=200000,1)
print('cells',len(T1),flush=True)
seen=set();cnt=0
out=open('/workspace/work/trith_csp/t1_cands.txt','w')
for Vn in (16,0):
    T=tokens3(*VARS3[Vn]);n=len(T)
    done={int(x) for x in open(f's26_{Vn}.done').read().split()}
    ud={tuple(map(int,l.split())) for l in open(f's27_{Vn}.units')} if os.path.exists(f's27_{Vn}.units') else set()
    for S in range(-9,n):
        if S in done: continue
        D=[[d for d in range(10) if 0<=S+10*i+d<n and T[S+10*i+d] in IDX] for i in range(12)]
        if any(not x for x in D): continue
        D[0]=[d for d in D[0] if (S,IDX[T[S+d]]) not in ud]
        if not D[0]: continue
        W=lambda i,d:IDX[T[S+10*i+d]]
        for d0,d1,d2 in itertools.product(D[0],D[1],D[2]):
            la=d0*100+d1*10+d2
            if la>=900: continue
            for d6,d7,d8 in itertools.product(D[6],D[7],D[8]):
                lo1=d6*100+d7*10+d8
                lon_cells=[]
                if (la,lo1) in T1: lon_cells.append('F1')
                ok2=False
                if d6==1:
                    for d9 in D[9]:
                        if (la,1000+d7*100+d8*10+d9) in T1: ok2=True;break
                if not lon_cells and not ok2: continue
                for d3,d4,d5 in itertools.product(D[3],D[4],D[5]):
                    acc6=0
                    for i,d in ((0,d0),(1,d1),(2,d2),(3,d3),(4,d4),(5,d5),(6,d6),(7,d7),(8,d8)): acc6=(acc6<<11)|W(i,d)
                    d9s=D[9] if lon_cells else [d9 for d9 in D[9] if (la,1000+d7*100+d8*10+d9) in T1]
                    for d9 in d9s:
                        a9=(acc6<<11)|W(9,d9)
                        for d10 in D[10]:
                            a10=(a9<<11)|W(10,d10)
                            for d11 in D[11]:
                                i=W(11,d11); full=(a10<<11)|i
                                if hashlib.sha256((full>>4).to_bytes(16,'big')).digest()[0]>>4==(i&15):
                                    if full not in seen:
                                        seen.add(full); out.write(f'{full:x}\n')
    print('V',Vn,'unique checksum-valid',len(seen),flush=True)
out.close()
