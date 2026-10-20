var e=`[package]
name = "bunker-wasm"
version = "0.1.0"
edition = "2021"
license = "Apache-2.0"
description = "wasm-bindgen wrapper around bunker-core / bunker-lms for the TypeScript SDK"
publish = false

[lib]
crate-type = ["cdylib", "rlib"]

[dependencies]
bunker-core = { path = "../bunker-core", features = ["keys", "signer"] }
wasm-bindgen = "=0.2.129"
bs58 = { version = "0.5.1", default-features = false, features = ["alloc"] }
serde = { version = "1", default-features = false, features = ["derive", "alloc"] }
serde_json = { version = "1", default-features = false, features = ["alloc"] }
zeroize = { version = "1.8", default-features = false, features = ["alloc"] }
`;export{e as default};