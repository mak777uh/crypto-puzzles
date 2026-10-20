//! Bunker message format v1 (docs/MESSAGE_FORMAT.md) — the single source of truth shared by
//! the on-chain program (native), and the web app / CLI (via `bunker-wasm`).
//!
//! Default features are `no_std` + `alloc` and pull no std-only crates, so the program can link
//! this crate directly.
#![no_std]
#![forbid(unsafe_code)]

extern crate alloc;
#[cfg(test)]
extern crate std;

mod actions;
mod error;
#[cfg(feature = "keys")]
mod keys;
mod message;

pub use actions::{
    check_inactivity_days, decode_actions, encode_actions, try_encode_actions, validate_actions,
    Action,
};
pub use error::CoreError;
#[cfg(all(feature = "keys", feature = "signer"))]
pub use keys::{derive_root, epoch_key};
#[cfg(feature = "keys")]
pub use keys::{
    epoch_key_material, generate_mnemonic, mnemonic_to_seed64, validate_mnemonic, KeyContext,
};
pub use message::{
    decode_close_payload, decode_options, decode_rotate_payload, encode_options, message_prefix,
    parse_signed_message, signed_message, validate_payload, vault_id, Cluster, IxTag,
    SignedMessage,
};

pub use bunker_lms;
#[cfg(feature = "signer")]
pub use bunker_lms::LmsKey;
#[cfg(feature = "sha2")]
pub use bunker_lms::Sha2Hasher;
pub use bunker_lms::{Sha256Hasher, ROOT_LEN, SIG_LEN, TREE_SIZE};

/// Domain tag at the start of every signed message.
pub const DOMAIN: &[u8; 9] = b"BUNKER-v1";
/// Length of the fixed message prefix (domain ‖ cluster ‖ program ‖ tag ‖ state ‖ epoch ‖ leaf).
pub const PREFIX_LEN: usize = 83;
/// Maximum number of actions in one `execute` payload.
pub const MAX_ACTIONS: usize = 8;
/// Domain tag for `vault_id`.
pub const VAULT_ID_DOMAIN: &[u8; 18] = b"BUNKER/vault-id/v1";
/// Version byte of `options_v1`.
pub const OPTIONS_VERSION: u8 = 1;
/// HKDF salt for the per-epoch LMS key (MESSAGE_FORMAT §2): the key is bound to its vault
/// (cluster, program, options / vault id).
pub const LMS_HKDF_SALT: &[u8; 13] = b"BUNKER/LMS/v1";
/// HKDF info prefix for the per-epoch LMS key; followed by
/// `u32le(epoch) ‖ u8(cluster) ‖ program_id ‖ binding` (see [`KeyContext`]).
pub const LMS_HKDF_INFO_PREFIX: &[u8; 5] = b"epoch";

/// Action tags (MESSAGE_FORMAT §4).
pub const TAG_TRANSFER_SOL: u8 = 0x01;
pub const TAG_TRANSFER_TOKEN: u8 = 0x02;
pub const TAG_CLOSE_TOKEN_ACCOUNT: u8 = 0x03;
/// Legacy (inheritance) action tags, the first of the range reserved for later phases (0x10–0x3f).
pub const TAG_SET_HEIR: u8 = 0x10;
pub const TAG_CHECK_IN: u8 = 0x11;
pub const TAG_CLEAR_HEIR: u8 = 0x12;

/// Shortest inactivity period a heir action may sign: 30 days.
pub const HEIR_MIN_DAYS: u16 = 30;
/// Longest inactivity period a heir action may sign: 3,650 days (10 years of 365 days).
pub const HEIR_MAX_DAYS: u16 = 3650;
/// One day of the cluster clock (`Clock::unix_timestamp`), in seconds.
pub const SECONDS_PER_DAY: i64 = 86_400;

/// SPL Token program id `TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA`.
pub const SPL_TOKEN: [u8; 32] = [
    6, 221, 246, 225, 215, 101, 161, 147, 217, 203, 225, 70, 206, 235, 121, 172, 28, 180, 133, 237,
    95, 91, 55, 145, 58, 140, 245, 133, 126, 255, 0, 169,
];
/// Token-2022 program id `TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb`.
pub const TOKEN_2022: [u8; 32] = [
    6, 221, 246, 225, 238, 117, 143, 222, 24, 66, 93, 188, 228, 108, 205, 218, 182, 26, 252, 77,
    131, 185, 13, 39, 254, 189, 249, 40, 216, 161, 139, 252,
];

#[cfg(test)]
mod tests;
