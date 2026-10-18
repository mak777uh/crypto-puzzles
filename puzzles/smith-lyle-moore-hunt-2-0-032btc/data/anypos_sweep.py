# SLM Glimmer: generalized order sweep. 10 words in fixed order (when you depart find discover music need love fortune safe),
# 'mystery' at any of 11 slots, unknown word at any of 12 positions (checksum-valid only). Passphrases from pp list.
import sys, os, time, hashlib
from multiprocessing import Pool
G='/workspace/work/glimmer'; sys.path.insert(0,G+'/pylib'); sys.path.insert(0,G); os.chdir(G)
from w12check import W, IDX, valid, TPUB
from embit import bip32
def acct(mn,pp):
    seed=hashlib.pbkdf2_hmac('sha512',mn.encode(),('mnemonic'+pp).encode(),2048)
    return bip32.HDKey.from_seed(seed).derive("m/84h/0h/0h").key.sec()
base=['when','you','depart','find','discover','music','need','love','fortune','safe']
mns=set()
for i in range(11):
    o=base[:i]+['mystery']+base[i:]
    for j in range(12):
        for w in W:
            m=o[:j]+[w]+o[j:]
            if valid(m): mns.add(' '.join(m))
MNS=sorted(mns)
def chk(pp):
    for m in MNS:
        if acct(m,pp)==TPUB: return (pp,m)
    return (pp,None)
if __name__=='__main__':
    pps=[l.rstrip('\n') for l in open(sys.argv[1])]
    prog=sys.argv[1]+'.done'
    done=set(l.rstrip('\n') for l in open(prog)) if os.path.exists(prog) else set()
    todo=[p for p in pps if p not in done]
    print(len(MNS),'mnemonics',len(todo),'pps todo',flush=True); t=time.time()
    with Pool(2) as pool:
        for pp,m in pool.imap_unordered(chk,todo):
            if m:
                print('FOUND',m,repr(pp),flush=True); open('/workspace/projects/9ccf2524-8b0d-468a-bd1c-33ac5b019a7f/work/FOUND.txt','w').write(m+'\n'+pp+'\n'); pool.terminate(); sys.exit()
            open(prog,'a').write(pp+'\n'); print('ok',repr(pp),round(time.time()-t),flush=True)
    print('ALLDONE',round(time.time()-t),flush=True)
