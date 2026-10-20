var e=`[package]
name = "bunker"
version = "0.1.0"
description = "Bunker: post-AI, post-quantum smart account for Solana (LMS hash-based signatures, SHA-256 only)"
edition = "2021"
license = "Apache-2.0"
repository = "https://github.com/nicolascoculuzzi/bunker"
publish = false

[lib]
crate-type = ["cdylib", "lib"]
name = "bunker"

[features]
# Cluster id baked into every signed message (MESSAGE_FORMAT §4). \`localnet\` is the default;
# \`devnet\` / \`testnet\` / \`mainnet\` override it (enable at most one of those three).
# no-log-ix-name: skip the "Instruction: X" log line (program size; no client reads it).
default = ["localnet", "no-log-ix-name"]
localnet = []
devnet = []
testnet = []
mainnet = []
cpi = ["no-entrypoint"]
# Log VaultOpened / ActionExecuted / KeyRotated / VaultClosed (costs program size).
events = []
no-entrypoint = []
no-log-ix-name = []
idl-build = ["anchor-lang/idl-build", "anchor-spl/idl-build"]
anchor-debug = []
custom-heap = []
custom-panic = []

[dependencies]
anchor-lang = "1.2.0"
anchor-spl = { version = "1.2.0", default-features = false, features = ["token", "token_2022", "associated_token"] }
bunker-lms = { path = "../../crates/bunker-lms", default-features = false }
bunker-core = { path = "../../crates/bunker-core", default-features = false }
solana-sha256-hasher = "3.1.0"
solana-security-txt = "1.1.1"

# Host builds (IDL generation, \`cargo test\`) never hash through this crate, but enable the
# software backend so a host call cannot panic.
[target.'cfg(not(target_os = "solana"))'.dependencies]
solana-sha256-hasher = { version = "3.1.0", features = ["sha2"] }

[dev-dependencies]
# Tests drive the compiled program (target/deploy/bunker.so) through LiteSVM and build every
# instruction by hand (no anchor-lang types; the program crate is only used for its error codes).
base64 = "0.22"
litesvm = "0.17.0"
bunker-lms = { path = "../../crates/bunker-lms", features = ["signer"] }
bunker-core = { path = "../../crates/bunker-core", features = ["keys", "signer", "sha2"] }
sha2 = "0.10.9"
solana-account = "4"
solana-address = { version = "2.7", features = ["curve25519", "decode", "std"] }
# The Clock sysvar LiteSVM uses (3.2 re-exports 4.0's type): Legacy tests move the clock.
solana-clock = "3.2"
solana-hash = "4"
solana-instruction = "3.5"
solana-instruction-error = "2.5"
solana-keypair = "3.1"
solana-message = { version = "4.6", features = ["wincode"] }
solana-program-pack = "3.1"
solana-signer = "3.0"
solana-system-interface = { version = "3.2", features = ["bincode"] }
solana-transaction = { version = "4.3", features = ["wincode"] }
solana-transaction-error = "3.4"
spl-associated-token-account-interface = "2.0"
spl-token-2022-interface = "2.1"
spl-token-metadata-interface = "0.8"
wincode = "0.6"

[lints.rust]
unexpected_cfgs = { level = "warn", check-cfg = ['cfg(target_os, values("solana"))'] }
`;export{e as default};