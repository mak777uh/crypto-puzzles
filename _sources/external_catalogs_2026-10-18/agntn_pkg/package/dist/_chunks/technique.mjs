const Technique = {
	Aes: "aes",
	AsciiPrivateKey: "ascii-private-key",
	Atbash: "atbash",
	Base64: "base64",
	Beaufort: "beaufort",
	Binary: "binary",
	Bip38: "bip38",
	Caesar: "caesar",
	HashCollision: "hash-collision",
	HiddenSeedWords: "hidden-seed-words",
	MaskedKeyRange: "masked-key-range",
	Md5ToBip39Entropy: "md5-to-bip39-entropy",
	Morse: "morse",
	OpensslSaltedSha256: "openssl-salted-sha256",
	PartialKey: "partial-key",
	Qr: "qr",
	ScryptBrainwallet: "scrypt-brainwallet",
	Sha256Brainwallet: "sha256-brainwallet",
	Sha256ToBip39Entropy: "sha256-to-bip39-entropy",
	ShamirShares: "shamir-shares",
	Steganography: "steganography",
	StraddlingCheckerboard: "straddling-checkerboard",
	TripleSha256Brainwallet: "triple-sha256-brainwallet",
	Warpwallet: "warpwallet",
	Xor: "xor"
};
const techniques = Object.freeze(Object.values(Technique).toSorted());
export { Technique, techniques };
