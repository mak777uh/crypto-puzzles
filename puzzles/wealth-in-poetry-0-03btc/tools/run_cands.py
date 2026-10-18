# usage: run_cands.py FILE START END TL  -> checks mnemonics (hex 132-bit ints) lines [START,END) with fastoracle, time limit TL s; progress -> FILE.prog
import sys,time,os
sys.path.insert(0,'/workspace/work/trith_csp'); sys.path.insert(0,'/workspace/work/trithemius')
from multiprocessing import Pool
from oracle import W,found
from fastoracle import check
F,A,B,TL=sys.argv[1],int(sys.argv[2]),int(sys.argv[3]),float(sys.argv[4]);T0=time.time()
def words(x): return [W[(x>>(11*(11-k)))&2047] for k in range(12)]
def job(chunk):
    if time.time()-T0>TL: return (chunk[0],0,None)
    for x in chunk:
        w=words(x); r=check(w)
        if r: found(w,('csp_t1',r)); return (chunk[0],len(chunk),r)
    return (chunk[0],len(chunk),None)
if __name__=='__main__':
    L=[int(l,16) for l in open(F)][A:B]
    CH=[L[i:i+500] for i in range(0,len(L),500)]
    import os
    dn=set(l.split()[0] for l in open(F+'.prog')) if os.path.exists(F+'.prog') else set()
    CH=[c for c in CH if f'{c[0]:x}' not in dn]
    print('chunks left',len(CH),flush=True)
    tot=0
    with Pool(2) as p, open(F+'.prog','a') as pf:
        for first,c,r in p.imap_unordered(job,CH):
            if c: pf.write(f'{first:x} {c}\n'); pf.flush(); tot+=c
            if r: print('НАЙДЕНО',r,flush=True)
    print('checked',tot,'of',len(L),'elapsed',round(time.time()-T0),'rate',round(tot/max(1,time.time()-T0)),flush=True)
