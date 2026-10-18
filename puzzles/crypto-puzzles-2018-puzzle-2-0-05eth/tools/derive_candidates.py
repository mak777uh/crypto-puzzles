import hashlib, itertools
from ecdsa import SigningKey, SECP256k1
from Crypto.Hash import keccak
TARGET="0x1fa8be9de5bbfe047c72db8e8e3257128f7661ad"
def addr(kb):
    if len(kb)!=32: return None
    sk=SigningKey.from_string(kb,curve=SECP256k1)
    pub=sk.get_verifying_key().to_string()
    h=keccak.new(digest_bits=256); h.update(pub)
    return "0x"+h.digest()[-20:].hex()
def keccak256(b):
    h=keccak.new(digest_bits=256); h.update(b); return h.digest()
def sha256(b): return hashlib.sha256(b).digest()
def sha512(b): return hashlib.sha512(b).digest()[:32]
base=["7623804","4083267","76238044","40832677","76238 04","7 6 2 3 8 0 4","7623804MIRROR","MIRROR7623804",
      "48C7623804","762380448C","48C","4","8","C","482C","21428C","214282C","4487FC620AD0C4C67E80BE342B2EA1F5A3DC482BE6FB9C2451007322EA8BE35F",
      "PUZZLE2","puzzle2","CRYPTOPUZZLE2","cryptopuzzle2","CryptoPuzzle2","cryptopuzzles2","crypto puzzles 2","CRYPTOPUZZLER2",
      "puzzle2part1","puzzle2part2","PART1","PART2","MIRROR","mirror","7623804part1","7623804part2"]
# add simple variants
strings=set()
for s in base:
    for t in (s, s.lower(), s.upper(), s[::-1], s.replace(" ","")):
        strings.add(t)
print('strings',len(strings))
def keys_for(s):
    b=s.encode()
    yield ('ascii_padR', b.ljust(32,b'\0'))
    yield ('ascii_padL', b.rjust(32,b'\0'))
    yield ('ascii_repeat', (b*((32//len(b))+1))[:32])
    yield ('sha256', sha256(b))
    yield ('sha256x2', sha256(sha256(b)))
    yield ('sha512', sha512(b))
    yield ('keccak', keccak256(b))
    # hex interpretation
    hx=''.join(ch for ch in s if ch.lower() in '0123456789abcdef')
    if hx:
        try:
            if len(hx)%2: hx2=hx+'0'
            else: hx2=hx
            raw=bytes.fromhex(hx2)
            if raw:
                yield ('hex_padR', raw.ljust(32,b'\0')[:32])
                yield ('hex_padL', raw.rjust(32,b'\0')[:32])
                yield ('hex_sha256', sha256(raw))
                yield ('hex_keccak', keccak256(raw))
        except Exception: pass
found=[]
for s in strings:
    for m,kb in keys_for(s):
        if not kb or len(kb)!=32: continue
        a=addr(kb)
        if a==TARGET:
            print('MATCH',s,m,kb.hex()); found.append((s,m))
print('done, matches',found)
