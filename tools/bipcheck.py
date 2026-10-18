import json, urllib.request
# load local bip0173? Instead use known list from puzzle-lab if exists
import os
candidates=['sick','october','jazz','surprise','fake','reveal','expose','uncover','magic','truth','sleeping','surface','uncover']
# try find bip39 file
for root,_,files in os.walk('C:/Users/Admin'):
    for f in files:
        if 'bip' in f.lower() and f.endswith('.txt'):
            print('found', os.path.join(root,f)); break
print('candidates:', candidates)