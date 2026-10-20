//! LMS (RFC 8554 §5).

use crate::hash::Sha256Hasher;
use crate::lmots::{self, D_INTR, D_LEAF, IQD_LEN};
use crate::params::{LmsParams, OtsParams};
use crate::{LmsError, MAX_MSG_PARTS, N, ROOT_LEN};

/// Length of the `Kc` preimage prefix `I ‖ u32str(q) ‖ u16str(D_PBLC)`.
pub(crate) const KC_PREFIX_LEN: usize = IQD_LEN;

/// `T[r] = H(I ‖ u32str(r) ‖ u16str(D_LEAF) ‖ K)` for a leaf node `r = 2^h + q`.
#[inline]
pub(crate) fn leaf_hash<Hs: Sha256Hasher>(id: &[u8; 16], r: u32, k: &[u8; N]) -> [u8; N] {
    let mut buf = [0u8; IQD_LEN + N];
    buf[..16].copy_from_slice(id);
    buf[16..20].copy_from_slice(&r.to_be_bytes());
    buf[20..22].copy_from_slice(&D_LEAF);
    buf[22..].copy_from_slice(k);
    Hs::hashv(&[&buf[..]])
}

/// `T[r] = H(I ‖ u32str(r) ‖ u16str(D_INTR) ‖ left ‖ right)` for an interior node.
#[inline]
pub(crate) fn interior_hash<Hs: Sha256Hasher>(
    id: &[u8; 16],
    r: u32,
    left: &[u8],
    right: &[u8],
) -> [u8; N] {
    let mut buf = [0u8; IQD_LEN + 2 * N];
    buf[..16].copy_from_slice(id);
    buf[16..20].copy_from_slice(&r.to_be_bytes());
    buf[20..22].copy_from_slice(&D_INTR);
    buf[22..22 + N].copy_from_slice(left);
    buf[22 + N..].copy_from_slice(right);
    Hs::hashv(&[&buf[..]])
}

#[inline]
fn be32(b: &[u8], at: usize) -> u32 {
    u32::from_be_bytes([b[at], b[at + 1], b[at + 2], b[at + 3]])
}

/// Algorithm 6a: compute the candidate root `Tc` from an LMS signature, for an LMS public key
/// whose type codes are `lms` / `ots`. Returns `(q, Tc)`.
///
/// All length / type checks happen before any slicing, so this never panics on any input.
pub(crate) fn candidate_root<Hs: Sha256Hasher>(
    lms: &LmsParams,
    ots: &OtsParams,
    id: &[u8; 16],
    msg_parts: &[&[u8]],
    sig: &[u8],
    scratch: &mut [u8],
) -> Result<(u32, [u8; N]), LmsError> {
    if msg_parts.len() > MAX_MSG_PARTS {
        return Err(LmsError::TooManyMessageParts);
    }
    if sig.len() < 8 {
        return Err(LmsError::InvalidLength);
    }
    let q = be32(sig, 0);
    if be32(sig, 4) != ots.typecode {
        return Err(LmsError::WrongOtsType);
    }
    if sig.len() != lms.sig_len(ots) {
        return Err(LmsError::InvalidLength);
    }
    let ots_end = 4 + ots.sig_len();
    if be32(sig, ots_end) != lms.typecode {
        return Err(LmsError::WrongLmsType);
    }
    // h <= 25 for every RFC parameter set, so this shift cannot overflow.
    let leaves: u32 = 1u32 << lms.h;
    if q >= leaves {
        return Err(LmsError::LeafOutOfRange);
    }

    let kc = lmots::candidate_public_key::<Hs>(ots, id, q, msg_parts, &sig[4..ots_end], scratch)?;

    let path = &sig[ots_end + 4..];
    let mut node_num = leaves + q;
    let mut tmp = leaf_hash::<Hs>(id, node_num, &kc);
    let mut i = 0usize;
    while node_num > 1 {
        let sib = &path[i * N..(i + 1) * N];
        tmp = if node_num & 1 == 1 {
            interior_hash::<Hs>(id, node_num / 2, sib, &tmp)
        } else {
            interior_hash::<Hs>(id, node_num / 2, &tmp, sib)
        };
        node_num /= 2;
        i += 1;
    }
    Ok((q, tmp))
}

/// Algorithm 6: verify `sig` over `msg_parts` against the public key `I ‖ T[1]` (`root`) of
/// type `lms` / `ots`.
pub(crate) fn verify_with_params<Hs: Sha256Hasher>(
    lms: &LmsParams,
    ots: &OtsParams,
    root: &[u8; ROOT_LEN],
    msg_parts: &[&[u8]],
    sig: &[u8],
    scratch: &mut [u8],
) -> Result<u32, LmsError> {
    let mut id = [0u8; 16];
    id.copy_from_slice(&root[..16]);
    let (q, tc) = candidate_root::<Hs>(lms, ots, &id, msg_parts, sig, scratch)?;
    // Public data: no secret to protect, but compare without early exit anyway.
    let mut diff = 0u8;
    for (a, b) in tc.iter().zip(root[16..].iter()) {
        diff |= a ^ b;
    }
    if diff == 0 {
        Ok(q)
    } else {
        Err(LmsError::InvalidSignature)
    }
}
