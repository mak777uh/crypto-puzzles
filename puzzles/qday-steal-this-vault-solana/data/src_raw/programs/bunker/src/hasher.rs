//! On-chain SHA-256 backend for `bunker-lms` / `bunker-core`: the `sol_sha256` syscall.

/// SHA-256 through the `sol_sha256` syscall (via `solana-sha256-hasher`, which uses the syscall
/// on `target_os = "solana"` and the `sha2` crate on the host).
pub struct SolSha256;

impl bunker_lms::Sha256Hasher for SolSha256 {
    #[inline(always)]
    fn hashv(parts: &[&[u8]]) -> [u8; 32] {
        solana_sha256_hasher::hashv(parts).to_bytes()
    }
}
