import hashlib
priv=bytes.fromhex('01b8410c1b02220244c5556ddea8b9cd9d133d57a333baa3eed7e6478d8fedaf')
# try coincurve
try:
    import coincurve
    pk=coincurve.PublicKey.from_secret(priv)
    pub=pk.format(compressed=True)
    print('coincurve ok', pub.hex())
except Exception as e:
    print('coincurve err', e)
# derive P2PKH manually via ecdsa if available
try:
    import ecdsa
    sk=ecdsa.SigningKey.from_string(priv, curve=ecdsa.SECP256k1)
    vk=sk.get_verifying_key()
    pub= b'\x04'+vk.to_string()  # uncompressed
    # compressed
    x=vk.to_string()[:32]; y=vk.to_string()[32:]
    comp = x + (b'\x02' if int.from_bytes(y,'big')%2==0 else b'\x03')
    pubc = comp
    print('ecdsa pub', pubc.hex())
except Exception as e:
    print('ecdsa err', e)