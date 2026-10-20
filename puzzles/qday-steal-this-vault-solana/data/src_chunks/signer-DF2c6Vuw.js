var e=`//! Key generation and signing (RFC 8554 Algorithms 0–3, 5; private key per Appendix A).
//!
//! Off-chain only. The randomizer \`C\` is derived deterministically as
//! \`C = H(I ‖ u32str(q) ‖ u16str(0xFFFD) ‖ u8str(0xff) ‖ SEED)\` (MESSAGE_FORMAT §1), so signing
//! the same message with the same leaf is reproducible.

use alloc::vec;
use alloc::vec::Vec;
use core::fmt;

use zeroize::Zeroize;

use crate::hash::{Sha256Hasher, Sha2Hasher};
use crate::lmots::{self, CHAIN_LEN, D_PBLC, IQD_LEN};
use crate::lms;
use crate::params::{LmsParams, OtsParams, LMOTS_SHA256_N32_W4, LMS_SHA256_M32_H10};
use crate::{LmsError, H, N, ROOT_LEN, SIG_LEN, TREE_SIZE};

/// \`u16str(i)\` value used for the randomizer derivation (\`~2\` as a u16).
pub(crate) const RANDOMIZER_INDEX: u16 = 0xFFFD;

/// Generic private key + full Merkle tree for any RFC 8554 SHA-256 parameter set.
pub(crate) struct KeyCore<Hs: Sha256Hasher> {
    pub lms: LmsParams,
    pub ots: OtsParams,
    seed: [u8; 32],
    id: [u8; 16],
    /// \`nodes[r]\` = \`T[r]\` for \`r\` in \`1..2^(h+1)\`; \`nodes[0]\` is unused.
    nodes: Vec<[u8; N]>,
    _h: core::marker::PhantomData<Hs>,
}

impl<Hs: Sha256Hasher> Drop for KeyCore<Hs> {
    fn drop(&mut self) {
        self.seed.zeroize();
    }
}

/// Fill \`buf\` with \`I ‖ u32str(q) ‖ u16str(i) ‖ u8str(0xff) ‖ SEED\` and hash it
/// (\`x_q[i]\`, RFC 8554 Appendix A; also the randomizer with \`i = 0xFFFD\`).
#[inline]
fn derive_secret<Hs: Sha256Hasher>(buf: &mut [u8; CHAIN_LEN], i: u16, seed: &[u8; 32]) -> [u8; N] {
    buf[20..22].copy_from_slice(&i.to_be_bytes());
    buf[IQD_LEN] = 0xff;
    buf[IQD_LEN + 1..].copy_from_slice(seed);
    Hs::hashv(&[&buf[..]])
}

impl<Hs: Sha256Hasher> KeyCore<Hs> {
    /// Algorithm 1 + 2 with Appendix A key derivation: build the whole tree.
    pub fn generate(lms: LmsParams, ots: OtsParams, seed: [u8; 32], id: [u8; 16]) -> Self {
        let leaves = 1usize << lms.h;
        let mut nodes = vec![[0u8; N]; 2 * leaves];
        let max = ots.max_digit();

        // Reused buffers: the K preimage and the 55-byte chain / derivation block.
        let mut k_pre = vec![0u8; IQD_LEN + ots.p * N];
        k_pre[..16].copy_from_slice(&id);
        k_pre[20..22].copy_from_slice(&D_PBLC);
        let mut buf = [0u8; CHAIN_LEN];
        buf[..16].copy_from_slice(&id);

        for q in 0..leaves as u32 {
            buf[16..20].copy_from_slice(&q.to_be_bytes());
            k_pre[16..20].copy_from_slice(&q.to_be_bytes());
            for i in 0..ots.p {
                let x = derive_secret::<Hs>(&mut buf, i as u16, &seed);
                buf[IQD_LEN + 1..].copy_from_slice(&x);
                lmots::chain::<Hs>(&mut buf, 0, max);
                k_pre[IQD_LEN + i * N..IQD_LEN + (i + 1) * N].copy_from_slice(&buf[IQD_LEN + 1..]);
            }
            let k = Hs::hashv(&[&k_pre[..]]);
            let r = leaves as u32 + q;
            nodes[r as usize] = lms::leaf_hash::<Hs>(&id, r, &k);
        }
        buf.zeroize();

        for r in (1..leaves).rev() {
            let (l, rt) = (nodes[2 * r], nodes[2 * r + 1]);
            nodes[r] = lms::interior_hash::<Hs>(&id, r as u32, &l, &rt);
        }
        KeyCore {
            lms,
            ots,
            seed,
            id,
            nodes,
            _h: core::marker::PhantomData,
        }
    }

    pub fn id(&self) -> [u8; 16] {
        self.id
    }

    pub fn t1(&self) -> [u8; N] {
        self.nodes[1]
    }

    pub fn leaves(&self) -> u32 {
        1u32 << self.lms.h
    }

    /// LM-OTS randomizer for leaf \`q\`.
    pub fn randomizer(&self, q: u32) -> [u8; N] {
        let mut buf = [0u8; CHAIN_LEN];
        buf[..16].copy_from_slice(&self.id);
        buf[16..20].copy_from_slice(&q.to_be_bytes());
        let c = derive_secret::<Hs>(&mut buf, RANDOMIZER_INDEX, &self.seed);
        buf.zeroize();
        c
    }

    /// Authentication path for leaf \`q\`: \`path[i]\` is the sibling of the level-\`i\` ancestor.
    pub fn auth_path(&self, q: u32) -> Vec<[u8; N]> {
        let mut r = (self.leaves() + q) as usize;
        let mut path = Vec::with_capacity(self.lms.h);
        while r > 1 {
            path.push(self.nodes[r ^ 1]);
            r /= 2;
        }
        path
    }

    /// Algorithm 3 + 5 with a caller-supplied randomizer \`c\`: produce the LMS signature.
    pub fn sign_with_c(
        &self,
        q: u32,
        c: &[u8; N],
        msg_parts: &[&[u8]],
    ) -> Result<Vec<u8>, LmsError> {
        if q >= self.leaves() {
            return Err(LmsError::LeafOutOfRange);
        }
        let q_hash = lmots::message_hash::<Hs>(&self.id, q, c, msg_parts)?;
        let digits = lmots::q_with_checksum(&q_hash, &self.ots);

        let mut sig = Vec::with_capacity(self.lms.sig_len(&self.ots));
        sig.extend_from_slice(&q.to_be_bytes());
        sig.extend_from_slice(&self.ots.typecode.to_be_bytes());
        sig.extend_from_slice(c);

        let mut buf = [0u8; CHAIN_LEN];
        buf[..16].copy_from_slice(&self.id);
        buf[16..20].copy_from_slice(&q.to_be_bytes());
        for i in 0..self.ots.p {
            let a = lmots::coef(&digits, i, self.ots.w) as u16;
            let x = derive_secret::<Hs>(&mut buf, i as u16, &self.seed);
            buf[IQD_LEN + 1..].copy_from_slice(&x);
            lmots::chain::<Hs>(&mut buf, 0, a);
            sig.extend_from_slice(&buf[IQD_LEN + 1..]);
        }
        buf.zeroize();

        sig.extend_from_slice(&self.lms.typecode.to_be_bytes());
        for node in self.auth_path(q) {
            sig.extend_from_slice(&node);
        }
        debug_assert_eq!(sig.len(), self.lms.sig_len(&self.ots));
        Ok(sig)
    }

    /// Sign with the deterministic randomizer.
    pub fn sign(&self, q: u32, msg_parts: &[&[u8]]) -> Result<Vec<u8>, LmsError> {
        if q >= self.leaves() {
            return Err(LmsError::LeafOutOfRange);
        }
        let c = self.randomizer(q);
        self.sign_with_c(q, &c, msg_parts)
    }
}

/// An \`LMS_SHA256_M32_H10\` / \`LMOTS_SHA256_N32_W4\` private key with its cached Merkle tree.
///
/// The SEED is wiped on drop. \`Debug\` never prints secret material.
pub struct LmsKey {
    pub(crate) core: KeyCore<Sha2Hasher>,
}

impl LmsKey {
    /// Derive the key from \`SEED\` and \`I\` (RFC 8554 Appendix A) and build the full tree
    /// (1,024 leaves × 67 chains × 15 steps ≈ 1M SHA-256 compressions).
    pub fn from_seed_and_id(seed: [u8; 32], id: [u8; 16]) -> Self {
        LmsKey {
            core: KeyCore::generate(LMS_SHA256_M32_H10, LMOTS_SHA256_N32_W4, seed, id),
        }
    }

    /// Public key: \`I (16) ‖ T[1] (32)\`.
    pub fn root(&self) -> [u8; ROOT_LEN] {
        let mut out = [0u8; ROOT_LEN];
        out[..16].copy_from_slice(&self.core.id());
        out[16..].copy_from_slice(&self.core.t1());
        out
    }

    /// Sign \`msg\` with leaf \`q\`, returning the 2,508-byte RFC 8554 signature.
    ///
    /// # Panics
    /// If \`q >= TREE_SIZE\`. Use [\`LmsKey::try_sign\`] for a fallible version.
    pub fn sign(&self, q: u32, msg: &[u8]) -> Vec<u8> {
        match self.try_sign(q, msg) {
            Ok(s) => s,
            Err(e) => panic!("LmsKey::sign: {e}"),
        }
    }

    /// Sign \`msg\` with leaf \`q\`; errors if \`q >= TREE_SIZE\`.
    pub fn try_sign(&self, q: u32, msg: &[u8]) -> Result<Vec<u8>, LmsError> {
        self.try_sign_parts(q, &[msg])
    }

    /// Sign the concatenation of \`msg_parts\` with leaf \`q\`.
    pub fn try_sign_parts(&self, q: u32, msg_parts: &[&[u8]]) -> Result<Vec<u8>, LmsError> {
        if q >= TREE_SIZE {
            return Err(LmsError::LeafOutOfRange);
        }
        let sig = self.core.sign(q, msg_parts)?;
        debug_assert_eq!(sig.len(), SIG_LEN);
        Ok(sig)
    }

    /// Authentication path of leaf \`q\` (\`H\` sibling nodes, bottom-up). Public data.
    pub fn auth_path(&self, q: u32) -> Result<[[u8; N]; H], LmsError> {
        if q >= TREE_SIZE {
            return Err(LmsError::LeafOutOfRange);
        }
        let v = self.core.auth_path(q);
        let mut out = [[0u8; N]; H];
        out.copy_from_slice(&v);
        Ok(out)
    }
}

impl fmt::Debug for LmsKey {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        f.debug_struct("LmsKey")
            .field("root", &self.root())
            .finish_non_exhaustive()
    }
}
`;export{e as default};