//! LMS hash-based signatures per RFC 8554 / NIST SP 800-208.
//!
//! The public API is fixed to one parameter set:
//! `LMS_SHA256_M32_H10` (typecode 6) with `LMOTS_SHA256_N32_W4` (typecode 3).
//! Any other type code in a signature is rejected.
//!
//! Verification is `no_std`, allocation-free and panic-free on any input, and hashes through the
//! [`Sha256Hasher`] trait so the on-chain program can plug in the `sol_sha256` syscall.
#![no_std]
#![forbid(unsafe_code)]

#[cfg(feature = "signer")]
extern crate alloc;
#[cfg(test)]
extern crate std;

/// Hash output size in bytes (n = m = 32).
pub const N: usize = 32;
/// Number of Winternitz chains for `LMOTS_SHA256_N32_W4`.
pub const P: usize = 67;
/// Merkle tree height for `LMS_SHA256_M32_H10`.
pub const H: usize = 10;
/// Number of one-time leaves per key.
pub const TREE_SIZE: u32 = 1 << H;
/// `LMS_SHA256_M32_H10`.
pub const LMS_TYPE: u32 = 0x0000_0006;
/// `LMOTS_SHA256_N32_W4`.
pub const LMOTS_TYPE: u32 = 0x0000_0003;
/// Encoded signature length: 4 (q) + 4 + 32 + 67·32 (LM-OTS) + 4 + 10·32 (path).
pub const SIG_LEN: usize = 2508;
/// Public key ("root") length: I (16) ‖ T[1] (32). Type codes are implied.
pub const ROOT_LEN: usize = 48;
/// Maximum number of message parts accepted by [`verify`] (allocation-free bound).
pub const MAX_MSG_PARTS: usize = 16;

mod error;
mod hash;
pub(crate) mod lmots;
pub(crate) mod lms;
pub(crate) mod params;

#[cfg(feature = "signer")]
mod signer;

pub use error::LmsError;
pub use hash::Sha256Hasher;
#[cfg(feature = "sha2")]
pub use hash::Sha2Hasher;
#[cfg(feature = "signer")]
pub use signer::LmsKey;

/// Verify an LMS signature over the message given as concatenated parts
/// (`M = msg_parts[0] ‖ msg_parts[1] ‖ …`).
///
/// `root` is `I (16) ‖ T[1] (32)`; the type codes are fixed (`LMS_SHA256_M32_H10`,
/// `LMOTS_SHA256_N32_W4`) and any other type code inside `sig` is rejected.
/// Returns `q` (the leaf index inside the signature) on success.
pub fn verify<Hs: Sha256Hasher>(
    root: &[u8; ROOT_LEN],
    msg_parts: &[&[u8]],
    sig: &[u8],
) -> Result<u32, LmsError> {
    let mut scratch = [0u8; lms::KC_PREFIX_LEN + P * N];
    lms::verify_with_params::<Hs>(
        &params::LMS_SHA256_M32_H10,
        &params::LMOTS_SHA256_N32_W4,
        root,
        msg_parts,
        sig,
        &mut scratch,
    )
}

/// Read the leaf index `q` from an encoded signature without verifying it.
pub fn signature_leaf_index(sig: &[u8]) -> Result<u32, LmsError> {
    if sig.len() != SIG_LEN {
        return Err(LmsError::InvalidLength);
    }
    Ok(u32::from_be_bytes([sig[0], sig[1], sig[2], sig[3]]))
}

#[cfg(test)]
mod tests;
