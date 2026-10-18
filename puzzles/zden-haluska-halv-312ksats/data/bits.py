import numpy as np
levels=np.fromfile('data/levels.bin',dtype=np.uint8)
bits=(levels>1).astype(int)
print('ones', bits.sum())
out=bytes(int(''.join(map(str,bits[i:i+8])),2) for i in range(0,256-7,8))
print('32 bytes:', out.hex())
print('ascii:', ''.join(chr(b) if 32<=b<127 else '.' for b in out))