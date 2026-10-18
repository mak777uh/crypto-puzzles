import numpy as np, itertools
levels=np.fromfile('data/levels.bin',dtype=np.uint8)
print('len', len(levels))
# try all 4! mappings of levels {0,1,2,3} to 2-bit values 0..3
for perm in itertools.permutations([0,1,2,3]):
    bits=''.join(f'{perm[l]:02b}' for l in levels)
    out=bytes(int(bits[i:i+8],2) for i in range(0,len(bits)-7,8))
    # score printable
    printable=sum(32<=b<127 for b in out)
    if printable>40 or b'\x00' not in out[:10]:
        print('perm',perm,'printable',printable)
        print(out[:80])