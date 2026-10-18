import sys,os,numpy as np,pickle
exec(open('space.py').read().split("res={}")[0].replace("print('land","pass #"))
C=[l.split('\t') for l in open('/workspace/work/trithemius/geo/cities15000.txt',encoding='utf8')]
lat=np.array([float(c[4]) for c in C]);lon=np.array([float(c[5]) for c in C]);pop=np.array([int(c[14] or 0) for c in C])
def cmask(minpop,k):
    F1=np.zeros((900,1000),bool);F2=np.zeros((900,800),bool)
    sel=pop>=minpop
    a=np.floor(np.abs(lat[sel])*10).astype(int); b=np.floor(np.abs(lon[sel])*10).astype(int)
    for dy in range(-k,k+1):
        for dx in range(-k,k+1):
            aa=np.clip(a+dy,0,899); bb=b+dx
            m=(bb>=0)&(bb<1000); F1[aa[m],bb[m]]=True
            m=(bb>=1000)&(bb<1800); F2[aa[m],bb[m]-1000]=True
    return F1,F2
out=[]
for minpop,k in [(15000,0),(15000,1),(15000,3),(100000,1),(100000,3),(1000000,1),(1000000,5)]:
    F1,F2=cmask(minpop,k); tot=0
    for Vn in (16,0):
        T=tokens3(*VARS3[Vn]);n=len(T)
        done={int(x) for x in open(f's26_{Vn}.done').read().split()}
        ud={tuple(map(int,l.split())) for l in open(f's27_{Vn}.units')} if os.path.exists(f's27_{Vn}.units') else set()
        for S in range(-9,n):
            if S in done: continue
            v=vecs(T,n,S)
            if any(x.sum()==0 for x in v): continue
            v0=np.array([v[0][d] if (0<=S+d<n and T[S+d] in IDX and (S,IDX[T[S+d]]) not in ud) else 0 for d in range(10)])
            if v0.sum()==0: continue
            L=tri(v0,v[1],v[2])[:900]
            tot+=(L@F1@tri(v[6],v[7],v[8]))*np.prod([v[i].sum() for i in (3,4,5,9,10,11)])
            if v[6][1]:
                tot+=(L@F2@np.einsum('j,k,l->jkl',v[7],v[8],v[9]).reshape(1000)[:800])*np.prod([v[i].sum() for i in (3,4,5,10,11)])
    cs=tot/16; hrs=cs/(2*850)/3600
    print(f'pop>={minpop} r={k*0.1+0.05:.2f}deg: cellfrac F1 {F1.mean():.4f}; all {tot:.3e} checksum {cs:.3e} ~{hrs:.2f} h on 2 CPU',flush=True)
