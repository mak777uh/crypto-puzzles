/// SHA-256 over concatenated slices. On-chain: the `sol_sha256` syscall; off-chain: `sha2`.
pub trait Sha256Hasher {
    /// Returns `SHA-256(parts[0] ‖ parts[1] ‖ …)`.
    fn hashv(parts: &[&[u8]]) -> [u8; 32];
}

/// Off-chain SHA-256 backend using the `sha2` crate.
#[cfg(feature = "sha2")]
#[derive(Debug, Clone, Copy, Default)]
pub struct Sha2Hasher;

#[cfg(feature = "sha2")]
impl Sha256Hasher for Sha2Hasher {
    #[inline]
    fn hashv(parts: &[&[u8]]) -> [u8; 32] {
        use sha2::{Digest, Sha256};
        let mut h = Sha256::new();
        for p in parts {
            h.update(p);
        }
        h.finalize().into()
    }
}
