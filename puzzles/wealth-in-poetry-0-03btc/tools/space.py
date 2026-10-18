import sys,os,math,numpy as np,pickle
sys.path.insert(0,'/workspace/work/trithemius'); os.chdir('/workspace/work/trithemius')
from carrier3 import tokens3,VARS3
from oracle import IDX
from global_land_mask import globe
# land masks: F1 lat DD.d (0..89.9) x lon DD.d (0..99.9); F2 lat DD.d x lon 1DD.d (100..179.9)
def mask(lon0, nlon):
    la=np.arange(900)/10.0; lo=lon0+np.arange(nlon)/10.0
    ok=np.zeros((900,nlon),bool)
    for dy in (0.01,0.05,0.09):
        for dx in (0.01,0.05,0.09):
            for sy in (1,-1):
                for sx in (1,-1):
                    LA,LO=np.meshgrid(sy*(la+dy),sx*(lo+dx),indexing='ij')
                    LO=np.where(LO>180,LO-360,LO)
                    ok|=globe.is_land(LA,LO)
    return ok
if os.path.exists('/workspace/work/trith_csp/masks.pkl'):
    M1,M2=pickle.load(open('/workspace/work/trith_csp/masks.pkl','rb'))
else:
    M1=mask(0,1000); M2=mask(100,800); pickle.dump((M1,M2),open('/workspace/work/trith_csp/masks.pkl','wb'))
print('land frac F1 %.3f F2 %.3f'%(M1.mean(),M2.mean()))
def vecs(T,n,S):
    V=[]
    for i in range(12):
        V.append(np.array([1 if 0<=S+10*i+d<n and T[S+10*i+d] in IDX else 0 for d in range(10)],float))
    return V
def tri(a,b,c): return np.einsum('i,j,k->ijk',a,b,c).reshape(1000)
res={}
for Vn in (16,0):
    T=tokens3(*VARS3[Vn]);n=len(T)
    done={int(x) for x in open(f's26_{Vn}.done').read().split()} if os.path.exists(f's26_{Vn}.done') else set()
    ud={tuple(map(int,l.split())) for l in open(f's27_{Vn}.units')} if os.path.exists(f's27_{Vn}.units') else set()
    A=B=C=D=E2=0.0
    for S in range(-9,n):
        if S in done: continue
        v=vecs(T,n,S)
        if any(x.sum()==0 for x in v): continue
        # restrict first slot to remaining units
        v0=np.array([v[0][d] if (S+d>=0 and S+d<n and T[S+d] in IDX and (S,IDX[T[S+d]]) not in ud) else 0 for d in range(10)])
        if v0.sum()==0: continue
        rest=np.prod([v[i].sum() for i in (3,4,5,9,10,11)])
        A+=v0.sum()*np.prod([v[i].sum() for i in range(1,12)])
        L=tri(v0,v[1],v[2])[:900]
        v0b=v0.copy(); v0b[9]=0
        B+=v0b.sum()*np.prod([v[i].sum() for i in range(1,12)])           # lat<90
        O1=tri(v[6],v[7],v[8])
        C+=(L@M1@O1)*rest                                                  # F1 land
        # F2: lon 1DD.ddd -> d6=1, d7,d8 = tens/units deg, d9 = first decimal; 3 decimals only
        if v[6][1]:
            O2=np.einsum('j,k,l->jkl',v[7],v[8],v[9]).reshape(1000)[:800]
            rest2=np.prod([v[i].sum() for i in (3,4,5,10,11)])
            D+=(L@M2@O2)*rest2
    res[Vn]=(A,B,C,D)
    print(f'V{Vn}: digit-level all-BIP39 left {A:.3e}; lat<90 {B:.3e}; F1 land {C:.3e}; F2(lon>=100) land {D:.3e}; F1+F2 land {C+D:.3e}',flush=True)
pickle.dump(res,open('/workspace/work/trith_csp/space.pkl','wb'))
