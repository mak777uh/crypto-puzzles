var e=`//! LM-OTS (RFC 8554 §4).

use crate::hash::Sha256Hasher;
use crate::params::OtsParams;
use crate::{LmsError, MAX_MSG_PARTS, N};

/// Domain separators (RFC 8554 §4.3 / §5.3).
pub(crate) const D_PBLC: [u8; 2] = [0x80, 0x80];
pub(crate) const D_MESG: [u8; 2] = [0x81, 0x81];
pub(crate) const D_LEAF: [u8; 2] = [0x82, 0x82];
pub(crate) const D_INTR: [u8; 2] = [0x83, 0x83];

/// Byte length of \`I ‖ u32str(q) ‖ u16str(·)\`.
pub(crate) const IQD_LEN: usize = 16 + 4 + 2;
/// Byte length of a chain-step / x-derivation preimage:
/// \`I ‖ u32str(q) ‖ u16str(i) ‖ u8str(j) ‖ tmp\` (16 + 4 + 2 + 1 + 32 = 55: one SHA-256 block).
pub(crate) const CHAIN_LEN: usize = IQD_LEN + 1 + N;

/// \`coef(S, i, w)\` (RFC 8554 §3.1.3).
#[inline(always)]
pub(crate) fn coef(s: &[u8; N + 2], i: usize, w: u8) -> u8 {
    let w = w as usize;
    let byte = s[(i * w) / 8];
    let shift = 8 - (w * (i % (8 / w)) + w);
    ((byte as usize >> shift) & ((1usize << w) - 1)) as u8
}

/// \`Q ‖ Cksm(Q)\` (RFC 8554 §4.4): the digits to sign are \`coef(result, i, w)\` for \`i < p\`.
pub(crate) fn q_with_checksum(q_hash: &[u8; N], ots: &OtsParams) -> [u8; N + 2] {
    let mut s = [0u8; N + 2];
    s[..N].copy_from_slice(q_hash);
    let max = ots.max_digit();
    let mut sum: u16 = 0;
    for i in 0..(N * 8 / ots.w as usize) {
        sum += max - coef(&s, i, ots.w) as u16;
    }
    let ck = sum << ots.ls;
    s[N..].copy_from_slice(&ck.to_be_bytes());
    s
}

/// \`Q = H(I ‖ u32str(q) ‖ u16str(D_MESG) ‖ C ‖ M)\` with \`M\` given as parts.
pub(crate) fn message_hash<Hs: Sha256Hasher>(
    id: &[u8; 16],
    q: u32,
    c: &[u8],
    msg_parts: &[&[u8]],
) -> Result<[u8; N], LmsError> {
    if msg_parts.len() > MAX_MSG_PARTS {
        return Err(LmsError::TooManyMessageParts);
    }
    let mut pre = [0u8; IQD_LEN];
    pre[..16].copy_from_slice(id);
    pre[16..20].copy_from_slice(&q.to_be_bytes());
    pre[20..22].copy_from_slice(&D_MESG);
    let mut parts: [&[u8]; 2 + MAX_MSG_PARTS] = [&[]; 2 + MAX_MSG_PARTS];
    parts[0] = &pre;
    parts[1] = c;
    parts[2..2 + msg_parts.len()].copy_from_slice(msg_parts);
    Ok(Hs::hashv(&parts[..2 + msg_parts.len()]))
}

/// Run the Winternitz chain in place: \`buf\` holds \`I ‖ u32str(q) ‖ u16str(i) ‖ · ‖ tmp\`;
/// for \`j\` in \`from..to\`: \`tmp = H(I ‖ u32str(q) ‖ u16str(i) ‖ u8str(j) ‖ tmp)\`.
#[inline]
pub(crate) fn chain<Hs: Sha256Hasher>(buf: &mut [u8; CHAIN_LEN], from: u16, to: u16) {
    let mut j = from;
    while j < to {
        buf[IQD_LEN] = j as u8;
        let out = Hs::hashv(&[&buf[..]]);
        buf[IQD_LEN + 1..].copy_from_slice(&out);
        j += 1;
    }
}

/// Algorithm 4b: compute the candidate LM-OTS public key \`Kc\` from an LM-OTS signature
/// (\`ots_sig\` = \`u32str(type) ‖ C ‖ y[0..p]\`, type already checked by the caller).
///
/// \`scratch\` must hold at least \`IQD_LEN + p·n\` bytes; it is used for the \`Kc\` preimage so
/// that no allocation is needed.
pub(crate) fn candidate_public_key<Hs: Sha256Hasher>(
    ots: &OtsParams,
    id: &[u8; 16],
    q: u32,
    msg_parts: &[&[u8]],
    ots_sig: &[u8],
    scratch: &mut [u8],
) -> Result<[u8; N], LmsError> {
    let kc_len = IQD_LEN + ots.p * N;
    if ots_sig.len() != ots.sig_len() || scratch.len() < kc_len {
        return Err(LmsError::InvalidLength);
    }
    let c = &ots_sig[4..4 + N];
    let ys = &ots_sig[4 + N..];

    let q_hash = message_hash::<Hs>(id, q, c, msg_parts)?;
    let digits = q_with_checksum(&q_hash, ots);

    let kc = &mut scratch[..kc_len];
    kc[..16].copy_from_slice(id);
    kc[16..20].copy_from_slice(&q.to_be_bytes());
    kc[20..22].copy_from_slice(&D_PBLC);

    let mut buf = [0u8; CHAIN_LEN];
    buf[..16].copy_from_slice(id);
    buf[16..20].copy_from_slice(&q.to_be_bytes());
    let max = ots.max_digit();
    for i in 0..ots.p {
        let a = coef(&digits, i, ots.w) as u16;
        buf[20..22].copy_from_slice(&(i as u16).to_be_bytes());
        buf[IQD_LEN + 1..].copy_from_slice(&ys[i * N..(i + 1) * N]);
        chain::<Hs>(&mut buf, a, max);
        kc[IQD_LEN + i * N..IQD_LEN + (i + 1) * N].copy_from_slice(&buf[IQD_LEN + 1..]);
    }
    Ok(Hs::hashv(&[&kc[..]]))
}
`;export{e as default};