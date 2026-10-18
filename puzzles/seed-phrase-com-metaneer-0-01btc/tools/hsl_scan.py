import re
s=open('data/inline_0.js',encoding='utf-8').read()
m=re.search(r'const constants = \{(.*?)\n            \};',s,re.S)
body=m.group(1)
const={}
for mm in re.finditer(r'(\d+):\s*\{([^}]*)\}',body):
    idx=int(mm.group(1)); d={}
    for kv in re.finditer(r'(\w+):\s*([-+0-9.eE]+)',mm.group(2)):
        d[kv.group(1)]=float(kv.group(2))
    const[idx]=d
print('parsed',len(const),'sets')
def calc(i,t):
    c=const[i]
    h=round(t**4*c['m0801']+t**3*c['m0802']+t**2*c['m0803']+t*c['m0804']+c['m0805'])
    sa=round(t**4*c['m1901']+t**3*c['m1902']+t**2*c['m1903']+t*c['m1904']+c['m1905'])
    l=round(t**4*c['m1201']+t**3*c['m1202']+t**2*c['m1203']+t*c['m1204']+c['m1205'])
    return h%360,sa,l
for i in range(10):
    vals=[calc(i,t) for t in range(0,2049)]
    hs=[v[0] for v in vals]; ss=[v[1] for v in vals]; ls=[v[2] for v in vals]
    special=[t for t,(h,sa,l) in enumerate(vals) if sa==100 and l==50]
    pure=[t for t,(h,sa,l) in enumerate(vals) if h%60==0 and sa==100 and l==50]
    print(i,'h',min(hs),max(hs),'s',min(ss),max(ss),'l',min(ls),max(ls),'s100l50',len(special),special[:15],'pure',pure[:10])
