# Electrum v2 (new-seed) runner. Usage: python3 ev2run.py slots.json [--pass p1,p2] ; resumable (.ev2prog), stops ~840 s
# slots: list of word | [words] | "*" (Electrum/BIP39 English 2048). Valid v2 seed: HMAC-SHA512(key "Seed version", mnemonic) hex prefix 01 (standard) / 100 (segwit) / 101 (2fa).
# Survivors: PBKDF2-SHA512(mnemonic, 'electrum'+pass, 2048) -> BIP32 root; standard: m/0/0..9, m/1/0..1; segwit/2fa: m/0'/0/0..9, m/0'/1/0..1
# compare hash160 (comp+uncomp) with target 1KfZGvwZxsvSmemoCmEV75uqcNzYBHjkHZ
import sys,json,itertools,hashlib,hmac,os,time,multiprocessing as mp
from mnemonic import Mnemonic
from coincurve import PrivateKey
import base58
W=Mnemonic('english').wordlist
T=base58.b58decode_check(os.environ.get('EV2_TARGET','1KfZGvwZxsvSmemoCmEV75uqcNzYBHjkHZ'))[1:]
N=0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364141
H=0x80000000
SECRET='/workspace/projects/57126304-85a0-4593-bf45-5ff11eb816b1/work/.secret'
def h160(b): return hashlib.new('ripemd160',hashlib.sha256(b).digest()).digest()
def ckd(k,c,i,pub=None):
    if i&H: d=b'\0'+k+i.to_bytes(4,'big')
    else: d=(pub or PrivateKey(k).public_key.format(True))+i.to_bytes(4,'big')
    I=hmac.new(c,d,hashlib.sha512).digest()
    return ((int.from_bytes(I[:32],'big')+int.from_bytes(k,'big'))%N).to_bytes(32,'big'),I[32:]
def check(phrase,kind,pw):
    seed=hashlib.pbkdf2_hmac('sha512',phrase.encode(),('electrum'+pw).encode(),2048)
    I=hmac.new(b'Bitcoin seed',seed,hashlib.sha512).digest(); k,c=I[:32],I[32:]
    if kind!='std': k,c=ckd(k,c,H)
    for br,cnt in ((0,10),(1,2)):
        kb,cb=ckd(k,c,br); pb=PrivateKey(kb).public_key.format(True)
        for i in range(cnt):
            kk,_=ckd(kb,cb,i,pb); P=PrivateKey(kk).public_key
            if h160(P.format(True))==T or h160(P.format(False))==T: return True
    return False
def kind_of(m):
    d=hmac.digest(b"Seed version",m,'sha512')
    if d[0]==1: return 'std'
    if d[0]==0x10 and (d[1]>>4) in (0,1): return 'sw'
    return None
def task(args):
    head,rest,pws=args
    sl=[[w.encode() for w in s] for s in rest]
    hb=b' '.join(w.encode() for w in head)
    n=0;surv=0
    for ws in itertools.product(*sl):
        m=b' '.join((hb,)+ws) if hb else b' '.join(ws)
        d=hmac.digest(b"Seed version",m,'sha512'); n+=1
        if d[0]==1: kind='std'
        elif d[0]==0x10 and (d[1]>>4) in (0,1): kind='sw'
        else: continue
        surv+=1
        ph=m.decode()
        for pw in pws:
            if check(ph,kind,pw): return (ph,pw,n,surv)
    return (None,None,n,surv)
def save(ph,pw):
    os.makedirs(SECRET,exist_ok=True); os.chmod(SECRET,0o700)
    p=SECRET+'/seed.txt'; open(p,'a').write(ph+'\npass='+pw+'\n'); os.chmod(p,0o600)
if __name__=='__main__':
    f=sys.argv[1]; pws=['']
    if '--pass' in sys.argv: pws=['']+sys.argv[sys.argv.index('--pass')+1].split(',')
    slots=json.load(open(f)); sl=[W if s=='*' else ([s] if isinstance(s,str) else s) for s in slots]
    k=0;ntask=1
    while k<len(sl)-1 and ntask<200: ntask*=len(sl[k]); k+=1
    heads=list(itertools.product(*sl[:k])); rest=sl[k:]
    prog=f+'.ev2prog'; start=int(open(prog).read().split()[0]) if os.path.exists(prog) else 0
    total=1
    for s in sl: total*=len(s)
    print('total',total,'tasks',len(heads),'start',start,flush=True)
    t0=time.time(); done=start; N_=0; S_=0; found=None; finished=True
    with mp.Pool(2) as P:
        for r in P.imap(task,[(h,rest,pws) for h in heads[start:]]):
            done+=1; N_+=r[2]; S_+=r[3]
            if r[0]: found=r; break
            open(prog,'w').write(f'{done}\n')
            if time.time()-t0>840: finished=False; break
    el=time.time()-t0
    if found:
        save(found[0],found[1]); print('MATCH saved to .secret',flush=True); sys.exit(0)
    if finished: open(prog,'w').write(f'{done} DONE\n')
    print(('DONE' if finished else 'PARTIAL'),'tasks',done,'/',len(heads),'cands',N_,'survivors',S_,'sec',round(el),'rate',round(N_/max(el,1)),flush=True)
