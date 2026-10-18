/** The methods a puzzle's key or one of its stages was built with, one name each. */
export declare const Technique: {
  /** AES encryption under a key the solver has to assemble. */
  readonly Aes: "aes";
  /** Plain text whose ASCII bytes are the private key, read as one number. */
  readonly AsciiPrivateKey: "ascii-private-key";
  /** The Atbash substitution, A for Z, B for Y. */
  readonly Atbash: "atbash";
  /** Base64, standard or with a shuffled alphabet. */
  readonly Base64: "base64";
  /** The Beaufort cipher. */
  readonly Beaufort: "beaufort";
  /** Data spelled out as ones and zeros. */
  readonly Binary: "binary";
  /** A BIP38 encrypted private key whose passphrase is the secret. */
  readonly Bip38: "bip38";
  /** A Caesar shift, every letter moved the same distance. ROT13 goes 13, HAL to IBM just 1. */
  readonly Caesar: "caesar";
  /** Two different preimages with the same hash. */
  readonly HashCollision: "hash-collision";
  /** The words of a BIP39 phrase hidden in a text, an image or a video. */
  readonly HiddenSeedWords: "hidden-seed-words";
  /** A key masked with leading zeros down to a declared bit width. */
  readonly MaskedKeyRange: "masked-key-range";
  /** The MD5 of a text as BIP39 entropy. */
  readonly Md5ToBip39Entropy: "md5-to-bip39-entropy";
  /** Morse code. */
  readonly Morse: "morse";
  /** An OpenSSL salted blob whose password is the SHA-256 hex of a phrase. */
  readonly OpensslSaltedSha256: "openssl-salted-sha256";
  /** A key published with characters missing or wrong. */
  readonly PartialKey: "partial-key";
  /** A QR code. */
  readonly Qr: "qr";
  /** A brainwallet that runs scrypt over the passphrase first. */
  readonly ScryptBrainwallet: "scrypt-brainwallet";
  /** The SHA-256 of a passphrase as the private key. */
  readonly Sha256Brainwallet: "sha256-brainwallet";
  /** The SHA-256 of a text or a file as BIP39 entropy. */
  readonly Sha256ToBip39Entropy: "sha256-to-bip39-entropy";
  /** Shamir secret sharing, a threshold of shares. */
  readonly ShamirShares: "shamir-shares";
  /** Data hidden inside an image, a sound, a video or a file. */
  readonly Steganography: "steganography";
  /** A straddling checkerboard, digits for letters. */
  readonly StraddlingCheckerboard: "straddling-checkerboard";
  /** Three rounds of SHA-256 over a passphrase, each on the last digest, as the private key. */
  readonly TripleSha256Brainwallet: "triple-sha256-brainwallet";
  /** Keybase's WarpWallet, scrypt and PBKDF2 over a passphrase and a salt. */
  readonly Warpwallet: "warpwallet";
  /** XOR with a mask. */
  readonly Xor: "xor";
};
/** One name from the technique vocabulary. */
export type Technique = (typeof Technique)[keyof typeof Technique];
/** Every technique name, sorted. */
export declare const techniques: readonly Technique[];