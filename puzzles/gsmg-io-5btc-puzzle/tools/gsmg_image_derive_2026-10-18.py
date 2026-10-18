# -*- coding: utf-8 -*-
# gsmg_image_derive_2026-10-18.py — (Big Pickle) нетекстовые производные puzzle.png → ключи → planted-адреса.
import hashlib, itertools, sys, os
import numpy as np
from PIL import Image
from coincurve import PrivateKey
sys.stdout.reconfigure(encoding="utf-8")
def h160(pub): return hashlib.new('ripemd160', hashlib.sha256(pub).digest()).digest()
def b58(data):
    a='123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz'
    n=int.from_bytes(data,'big'); s=''
    while n: n,r=divmod(n,58); s=a[r]+s
    return '1'*(len(data)-len(data.lstrip(b'\x00')))+s
def b58check(p): return b58(p+hashlib.sha256(hashlib.sha256(p).digest()).digest()[:4])
def addrs(k):
    pk=PrivateKey(k); c=pk.public_key.format(True); u=b'\x04'+pk.public_key.format(False)[1:]
    return b58check(b'\x00'+h160(c)), b58check(b'\x00'+h160(u))
def bitsrev(b):
    r=0
    for i in range(len(b)*8): r=(r<<1)|((int.from_bytes(b,'big')>>i)&1)
    return r.to_bytes(len(b),'big')
TARGETS={
 'THIRD_DOOR':'1NULY7DhzuNvSDtPkFzNo6oRTZQWBqXNE9','PRIZE':'1GSMG1JC9wtdSwfwApgj2xcmJPAwx7prBe',
 '17ucy':'17ucy1K9ZUAaoY6JVtM932W9jUp5LXfyHa','1AD2wfw':'1AD2wfwXukZ1kUAy848hTQQ72aSBZPB75r',
 '1Jqq37':'1Jqq37KkZEt4F3Dt6qXdtyiMEFBBdawbkJ','1M5ypv':'1M5ypvDbp124ZtKPbg3GJg1JqNs1x7TPoN',
 '1K23RS':'1K23RS1y2fnuZRkhw5nUpFr5Jk5WN11Zeq','18Cchr':'18CchrjA3Uzfrzy4DFqao9ric6YfK4hjdc',
 '1GyT5W':'1GyT5WrLYpwFkuiVoPDJZa1Q6jtjbjuBff','NEO1':'148XH2YBmLr4oAJXQcG84FpNYoBmqnVPHQ',
 'NEO2':'13HGhjkmKUkP8sk9k63BLmhkxRjy7uK4Rp','16eE':'16eEXbSuKN8tvcos1iKjdju6dAaWWRBMEs',
 '1KHM':'1KHMK2C8uBptRz67FbrXy43yHzhZG16Hbm','3JC6':'3JC6NJz2vXZ8A47YtGqt7ijTJn4czEmgHG',
 '1G1k':'1G1kRAFR68y6CUq1SAJMzHmjd6sEEgtVUT','1Lxw':'1LxwXaht3xbHhWnoFnZmz4jUbFgjY6s3BZ',
 '1Ph11':'1Ph11kNwGaKzuB2vc9h9dfDug73pM3mmPQ','1PhXF':'1PhXF3xVQ8Sg9FomBcmRwRbvvGfm3Y2os1',
 '1GDrx':'1GDrxTH6R4s5g8DDZNGM4bfKjd7EnEtu9W','16RGF':'16RGFo6hDtsP7pKJUULZX5ubp1C6y8jozM',
}
TSET=set(TARGETS.values()); REV={v:k for k,v in TARGETS.items()}
def constructions(b):
    out={'sha256':hashlib.sha256(b).digest()}
    if len(b)==32: out['raw']=b
    if len(b)<=32:
        out['raw_left']=b.rjust(32,b'\x00'); out['raw_right']=b.ljust(32,b'\x00')
        out['bits192_left']=bitsrev(b).rjust(32,b'\x00'); out['bits192_right']=bitsrev(b).ljust(32,b'\x00')
        out['bytes_rev']=b[::-1].rjust(32,b'\x00')
    # also digest-as-hex-ascii truncated/other
    out['sha256_hex_ascii']=hashlib.sha256(b).hexdigest().encode()
    return out
# ---- load image & grid
a=np.array(Image.open("data/puzzle_wayback.png").convert("RGB")).astype(int)
R=C=14; cell=75.0
def cls(px):
    r,g,b=px
    if abs(r-255)<30 and abs(g-242)<30 and b<120: return 0  # yellow -> 0
    if abs(r-63)<40 and abs(g-72)<40 and abs(b-204)<40: return 1  # blue -> 1
    if r<50 and g<50 and b<50: return 1  # black -> 1
    return 0  # white -> 0
M=[[cls(a[int(r*cell+37),int(c*cell+37)]) for c in range(C)] for r in range(R)]
open("data/grid14_cells.txt","w").write("\n".join("".join(str(v) for v in row) for row in M)+"\n")
def spiral(start,dir0,turn):
    dirs={"R":(0,1),"D":(1,0),"L":(0,-1),"U":(-1,0)}; order=["R","D","L","U"]; di=order.index(dir0)
    y,x=start; seen=set(); out=[]; step=1 if turn=="CW" else -1
    for _ in range(R*C):
        out.append((y,x)); seen.add((y,x))
        dy,dx=dirs[order[di]]; ny,nx=y+dy,x+dx
        if 0<=ny<R and 0<=nx<C and (ny,nx) not in seen: y,x=ny,nx
        else:
            di=(di+step)%4; dy,dx=dirs[order[di]]; ny,nx=y+dy,x+dx
            if 0<=ny<R and 0<=nx<C and (ny,nx) not in seen: y,x=ny,nx
            else: break
    return out
def pack(bits):
    bits=bits[:len(bits)//8*8]
    return bytes(int("".join(map(str,bits[i:i+8])),2) for i in range(0,len(bits),8))
def packpad(bits):
    b=bits+( [0]*(8-len(bits)%8) if len(bits)%8 else [])
    return bytes(int("".join(map(str,b[i:i+8])),2) for i in range(0,len(b),8))
cands={}
# matrix readings
flat_row=[M[r][c] for r in range(R) for c in range(C)]
flat_col=[M[r][c] for c in range(C) for r in range(R)]
cands['row196']=packpad(flat_row); cands['col196']=packpad(flat_col)
cands['row196_inv']=packpad([1-x for x in flat_row]); cands['col196_inv']=packpad([1-x for x in flat_col])
cands['row192']=pack(flat_row[:192]); cands['row192r']=pack(flat_row[192:])
# spiral (canonical)
sp=spiral((0,0),"D","CCW"); sb=[M[y][x] for y,x in sp]
cands['spiral196']=packpad(sb); cands['spiral192']=pack(sb[:192]); cands['spiral192_inv']=pack([1-x for x in sb[:192]])
cands['spiral_rev']=packpad(sb[::-1]); cands['spiral_rev192']=pack(sb[::-1][:192])
cands['spare4']=bytes([sum(sb[192:196][i]<<(3-i) for i in range(4))])
# all 8 rotations/flips of matrix -> row-major 196 bits
for t in range(4):
    for flip in (False,True):
        m2=np.rot90(np.array(M),t)
        if flip: m2=np.fliplr(m2)
        cands[f'rot{t}_{flip}']=packpad([int(v) for v in m2.flatten()])
# colored-only 24 bits (the low bits) on spiral
colbits=[M[y][x] for y,x in sp]
cands['colored24']=pack(colbits[7:192:8])
# PNG raw + sha
raw=open("data/puzzle_wayback.png","rb").read()
cands['png_sha256']=hashlib.sha256(raw).digest()
cands['png_raw_first32']=raw[:32]; cands['png_raw_last32']=raw[-32:]
# channel LSB streams
for ci,cn in enumerate("RGB"):
    ch=a[:,:,ci]; stream=pack([int(v) for v in ((ch&1).reshape(-1))])
    cands[f'lsb_{cn}']=stream; cands[f'lsb_{cn}_inv']=bytes(x^0xFF for x in stream)
    cands[f'sha_lsb_{cn}']=hashlib.sha256(stream).digest()
# strings
strs=["gsmg.io/theseedisplanted","https://gsmg.io/theseedisplanted","http://gsmg.io/theseedisplanted",
      "GSMGIO5BTCPUZZLECHALLENGE1GSMG1JC9wtdSwfwApgj2xcmJPAwx7prBe",
      "GSMGIO5BTCPUZZLECHALLENGE","GSMG.IO 5 BTC PUZZLE CHALLENGE","theseedisplanted","the seed is planted",
      "gsmg.io/puzzle","GSMGIO5BTCPUZZLE"]
for s in strs:
    cands['str:'+s[:20]]=s.encode()
    cands['str_rev:'+s[:20]]=s[::-1].encode()
# QR decode
try:
    import cv2
    img=cv2.imread("data/puzzle_wayback.png")
    det=cv2.QRCodeDetector()
    data,pts,_=det.detectAndDecode(img)
    print("QR content:",repr(data))
    if data: cands['qr']=data.encode(); cands['qr_rev']=data[::-1].encode()
except Exception as e:
    print("QR err",repr(e)[:150])
hits=[]; total=0
for name,X in cands.items():
    for cname,k in constructions(X).items():
        total+=1
        try: ac,au=addrs(k)
        except Exception as e: continue
        if ac in TSET: hits.append((name,cname,REV[ac],'compressed',X[:24]))
        if au in TSET: hits.append((name,cname,REV[au],'uncompressed',X[:24]))
print("candidates:",len(cands),"keys:",total,"hits:",len(hits))
for h in hits: print("HIT",h)
# sanity: confirm NEO1/NEO2 reproduce with URL string
for nm,X in [('raw_left URL',"gsmg.io/theseedisplanted".encode()),('bits192_left URL',"gsmg.io/theseedisplanted".encode())]:
    c=constructions(X)
    if nm.startswith('raw'): k=c['raw_left']
    else: k=c['bits192_left']
    print("sanity",nm,addrs(k))
