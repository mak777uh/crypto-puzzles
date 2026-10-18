import sys,bip38
from multiprocessing import Pool
c=open(sys.argv[1]).read().split('\n')
def f(p): return (p,bip38.check(p))
with Pool(2) as pool:
    for p,r in pool.imap_unordered(f,c,chunksize=4):
        if r: print("FOUND",repr(p),r,flush=True); pool.terminate(); break
print("done",len(c))
