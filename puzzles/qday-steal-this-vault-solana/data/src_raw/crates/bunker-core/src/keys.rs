//! Vault seed → per-epoch LMS key (MESSAGE_FORMAT §2). Off-chain only.

use alloc::string::String;
use alloc::vec::Vec;

use bip39::{Language, Mnemonic};
use hkdf::Hkdf;
use sha2::Sha256;
use zeroize::Zeroizing;

use crate::{decode_options, Cluster, CoreError, LMS_HKDF_INFO_PREFIX, LMS_HKDF_SALT};

/// Required mnemonic length (256 bits of entropy).
pub const MNEMONIC_WORDS: usize = 24;

/// Parse a 24-word English BIP-39 mnemonic. Words are matched case-insensitively and any
/// ASCII whitespace separates words; the checksum must be valid.
///
/// The English wordlist is pure ASCII, so NFKD normalization is the identity on every valid
/// mnemonic: we reject non-ASCII input instead of normalizing it (no Unicode tables needed), and
/// the seed is always computed from the canonical sentence (single spaces), exactly as BIP-39
/// specifies.
fn parse_mnemonic(mnemonic: &str) -> Result<Mnemonic, CoreError> {
    if !mnemonic.is_ascii() {
        return Err(CoreError::InvalidMnemonic);
    }
    let lower = Zeroizing::new(mnemonic.to_ascii_lowercase());
    let joined = Zeroizing::new(lower.split_ascii_whitespace().collect::<Vec<_>>().join(" "));
    let m = Mnemonic::parse_in_normalized(Language::English, joined.as_str())
        .map_err(|_| CoreError::InvalidMnemonic)?;
    if m.word_count() != MNEMONIC_WORDS {
        return Err(CoreError::InvalidMnemonic);
    }
    Ok(m)
}

/// `true` iff `mnemonic` is a valid 24-word English BIP-39 mnemonic.
pub fn validate_mnemonic(mnemonic: &str) -> bool {
    parse_mnemonic(mnemonic).is_ok()
}

/// Build the 24-word mnemonic for 32 bytes of entropy (the caller supplies CSPRNG output).
///
/// The string is allocated once at its exact length, so no partial copy of the phrase is left in
/// a freed buffer by a reallocation. The caller owns (and should wipe) the result.
pub fn generate_mnemonic(entropy: &[u8; 32]) -> String {
    let m = Mnemonic::from_entropy_in(Language::English, entropy)
        .expect("32 bytes is a valid BIP-39 entropy length");
    let len = m.words().map(str::len).sum::<usize>() + MNEMONIC_WORDS - 1;
    let mut s = String::with_capacity(len);
    for (i, w) in m.words().enumerate() {
        if i > 0 {
            s.push(' ');
        }
        s.push_str(w);
    }
    debug_assert_eq!(s.len(), len);
    s
}

/// Standard BIP-39 seed with an empty passphrase:
/// `PBKDF2-HMAC-SHA512(NFKD(mnemonic), "mnemonic", 2048, 64)`.
pub fn mnemonic_to_seed64(mnemonic: &str) -> Result<[u8; 64], CoreError> {
    let m = parse_mnemonic(mnemonic)?;
    Ok(m.to_seed_normalized(""))
}

/// What an epoch key is bound to (MESSAGE_FORMAT §2).
///
/// Leaf state (`next_leaf`, the client ledger) is tracked per vault, so an LMS key must never be
/// shared by two vaults: two vaults on one key would hand out the same one-time leaf twice. The
/// key is therefore derived from the seed *and* the vault it belongs to:
///
/// * `cluster` and `program_id`: the deployment the vault lives on (the same bytes the signed
///   message carries at offsets 9 and 10..42);
/// * `binding`: the vault's `options_v1` at epoch 0 (its `vault_id` does not exist before
///   `root_0` does; one seed + one option set + one deployment is exactly one `vault_id`), and the
///   vault's 32-byte `vault_id` at every later epoch (rotations, including to a new seed).
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub struct KeyContext<'a> {
    pub cluster: Cluster,
    pub program_id: &'a [u8; 32],
    pub binding: &'a [u8],
}

impl KeyContext<'_> {
    /// HKDF `info` for `epoch`: `"epoch" ‖ u32le(e) ‖ u8(cluster) ‖ program_id (32) ‖ binding`.
    ///
    /// Errors with [`CoreError::InvalidKeyBinding`] unless `binding` is a valid `options_v1`
    /// (2 or 34 bytes) for epoch 0, or exactly 32 bytes (`vault_id`) for epoch ≥ 1. The two shapes
    /// never overlap, so the encoding is injective.
    pub fn hkdf_info(&self, epoch: u32) -> Result<Vec<u8>, CoreError> {
        let ok = if epoch == 0 {
            decode_options(self.binding).is_ok()
        } else {
            self.binding.len() == 32
        };
        if !ok {
            return Err(CoreError::InvalidKeyBinding);
        }
        let mut info =
            Vec::with_capacity(LMS_HKDF_INFO_PREFIX.len() + 4 + 1 + 32 + self.binding.len());
        info.extend_from_slice(LMS_HKDF_INFO_PREFIX);
        info.extend_from_slice(&epoch.to_le_bytes());
        info.push(self.cluster as u8);
        info.extend_from_slice(self.program_id);
        info.extend_from_slice(self.binding);
        Ok(info)
    }
}

/// Per-epoch LMS key material (MESSAGE_FORMAT §2):
/// `okm = HKDF-SHA256(ikm = seed64, salt = "BUNKER/LMS/v1", info = ctx.hkdf_info(e), L = 48)`,
/// `SEED_e = okm[0..32]`, `I_e = okm[32..48]`.
pub fn epoch_key_material(
    seed64: &[u8; 64],
    epoch: u32,
    ctx: &KeyContext<'_>,
) -> Result<([u8; 32], [u8; 16]), CoreError> {
    let info = ctx.hkdf_info(epoch)?;
    let hk = Hkdf::<Sha256>::new(Some(LMS_HKDF_SALT), seed64);
    let mut okm = Zeroizing::new([0u8; 48]);
    hk.expand(&info, &mut okm[..])
        .expect("48 bytes is a valid HKDF-SHA256 output length");
    let mut seed = [0u8; 32];
    let mut id = [0u8; 16];
    seed.copy_from_slice(&okm[..32]);
    id.copy_from_slice(&okm[32..]);
    Ok((seed, id))
}

/// The LMS key for epoch `epoch` of `seed64` in context `ctx` (builds the full tree).
#[cfg(feature = "signer")]
pub fn epoch_key(
    seed64: &[u8; 64],
    epoch: u32,
    ctx: &KeyContext<'_>,
) -> Result<bunker_lms::LmsKey, CoreError> {
    use zeroize::Zeroize;
    let (mut seed, id) = epoch_key_material(seed64, epoch, ctx)?;
    let key = bunker_lms::LmsKey::from_seed_and_id(seed, id);
    seed.zeroize();
    Ok(key)
}

/// `root_e = I_e ‖ T[1]_e` for a mnemonic, epoch and context.
#[cfg(feature = "signer")]
pub fn derive_root(
    mnemonic: &str,
    epoch: u32,
    ctx: &KeyContext<'_>,
) -> Result<[u8; 48], CoreError> {
    let seed64 = Zeroizing::new(mnemonic_to_seed64(mnemonic)?);
    Ok(epoch_key(&seed64, epoch, ctx)?.root())
}
