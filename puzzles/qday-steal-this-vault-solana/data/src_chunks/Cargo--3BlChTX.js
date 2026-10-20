var e=`[package]
name = "bunker-core"
version = "0.1.0"
edition = "2021"
license = "Apache-2.0"
description = "Bunker message format v1: canonical action encoding, signed message, vault id, key derivation"
publish = false

[features]
default = ["sha2"]
# Off-chain SHA-256 backend (re-exports \`bunker_lms::Sha2Hasher\`).
sha2 = ["bunker-lms/sha2"]
# LMS key generation + signing (\`bunker_lms::LmsKey\`); never compiled into the program.
signer = ["sha2", "bunker-lms/signer"]
# BIP-39 mnemonic -> seed64 and HKDF epoch derivation; never compiled into the program.
keys = ["sha2", "dep:bip39", "dep:hkdf", "dep:sha2", "dep:zeroize"]

[dependencies]
bunker-lms = { path = "../bunker-lms", default-features = false }
bip39 = { version = "2.2.2", default-features = false, features = ["zeroize"], optional = true }
hkdf = { version = "0.12.4", default-features = false, optional = true }
sha2 = { version = "0.10.9", default-features = false, optional = true }
zeroize = { version = "1.8", default-features = false, features = ["alloc"], optional = true }

[dev-dependencies]
# Enables \`keys\` + \`signer\` for this crate's own tests / examples; not for normal builds.
bunker-core = { path = ".", features = ["keys", "signer"] }
bs58 = "0.5.1"
curve25519-dalek = { version = "4", default-features = false }
hex = "0.4"
proptest = "1"
serde_json = "1"
sha2 = "0.10.9"
`;export{e as default};