//! Internal tests: RFC 8554 Appendix F (both test cases, all levels) through the generic core,
//! plus RFC §3.1.3 `coef` examples. The public-API tests live in `tests/`.

use std::string::String;
use std::vec;
use std::vec::Vec;

use crate::lmots;
use crate::lms;
use crate::params::{lms_by_type, ots_by_type, LmsParams, OtsParams};
use crate::{LmsError, Sha2Hasher, N};

#[cfg(feature = "signer")]
mod rfc_keygen;

#[derive(serde::Deserialize)]
pub(crate) struct Case {
    pub hss_public_key: String,
    pub message: String,
    pub hss_signature: String,
    #[serde(default)]
    pub top_seed: Option<String>,
    #[serde(default)]
    pub top_i: Option<String>,
    #[serde(default)]
    pub child_seed: Option<String>,
    #[serde(default)]
    pub child_i: Option<String>,
}

#[derive(serde::Deserialize)]
pub(crate) struct Vectors {
    pub test_case_1: Case,
    pub test_case_2: Case,
}

pub(crate) fn vectors() -> Vectors {
    serde_json::from_str(include_str!("../../vectors/rfc8554_appendix_f.json")).unwrap()
}

pub(crate) fn h(s: &str) -> Vec<u8> {
    hex::decode(s).unwrap()
}

fn be32(b: &[u8], at: usize) -> u32 {
    u32::from_be_bytes(b[at..at + 4].try_into().unwrap())
}

/// An LMS public key `u32str(type) ‖ u32str(otstype) ‖ I ‖ T[1]` (56 bytes).
pub(crate) struct LmsPub {
    pub lms: LmsParams,
    pub ots: OtsParams,
    pub root: [u8; 48],
}

pub(crate) fn parse_lms_pub(b: &[u8]) -> Option<LmsPub> {
    if b.len() != 56 {
        return None;
    }
    Some(LmsPub {
        lms: *lms_by_type(be32(b, 0))?,
        ots: *ots_by_type(be32(b, 4))?,
        root: b[8..56].try_into().unwrap(),
    })
}

/// Length of the LMS signature at the start of `b`, from its embedded type codes.
fn lms_sig_len_at(b: &[u8]) -> Option<usize> {
    if b.len() < 8 {
        return None;
    }
    let ots = ots_by_type(be32(b, 4))?;
    if b.len() < 4 + ots.sig_len() + 4 {
        return None;
    }
    let lms = lms_by_type(be32(b, 4 + ots.sig_len()))?;
    Some(lms.sig_len(ots))
}

pub(crate) fn verify_generic(pk: &LmsPub, msg: &[u8], sig: &[u8]) -> Result<u32, LmsError> {
    let mut scratch = vec![0u8; lms::KC_PREFIX_LEN + pk.ots.p * N];
    lms::verify_with_params::<Sha2Hasher>(&pk.lms, &pk.ots, &pk.root, &[msg], sig, &mut scratch)
}

/// Test-only HSS verifier (RFC 8554 §6.3, Algorithm 8): walks every level.
/// Returns the per-level `q` values on success.
pub(crate) fn hss_verify(hss_pub: &[u8], msg: &[u8], sig: &[u8]) -> Result<Vec<u32>, &'static str> {
    if hss_pub.len() != 60 || sig.len() < 4 {
        return Err("length");
    }
    let levels = be32(hss_pub, 0);
    let nspk = be32(sig, 0);
    if nspk + 1 != levels {
        return Err("Nspk + 1 != L");
    }
    let mut key = parse_lms_pub(&hss_pub[4..]).ok_or("public key type")?;
    let mut pos = 4usize;
    let mut qs = Vec::new();
    for _ in 0..nspk {
        let len = lms_sig_len_at(&sig[pos..]).ok_or("sig type")?;
        let s = sig.get(pos..pos + len).ok_or("short")?;
        pos += len;
        let next_pub = sig.get(pos..pos + 56).ok_or("short")?;
        pos += 56;
        qs.push(verify_generic(&key, next_pub, s).map_err(|_| "intermediate signature invalid")?);
        key = parse_lms_pub(next_pub).ok_or("child public key type")?;
    }
    let last = &sig[pos..];
    if lms_sig_len_at(last) != Some(last.len()) {
        return Err("final signature length");
    }
    qs.push(verify_generic(&key, msg, last).map_err(|_| "final signature invalid")?);
    Ok(qs)
}

/// Split an L=2 HSS signature into (sig[0], pub[1], sig[1]).
pub(crate) fn split_hss2(sig: &[u8]) -> (&[u8], &[u8], &[u8]) {
    let l0 = lms_sig_len_at(&sig[4..]).unwrap();
    let s0 = &sig[4..4 + l0];
    let p1 = &sig[4 + l0..4 + l0 + 56];
    let s1 = &sig[4 + l0 + 56..];
    (s0, p1, s1)
}

#[test]
fn coef_examples_rfc_3_1_3() {
    // RFC 8554 §3.1.3: S = 0x1234, coef(S, 7, 1) = 0 and coef(S, 0, 4) = 1.
    let mut s = [0u8; N + 2];
    s[0] = 0x12;
    s[1] = 0x34;
    assert_eq!(lmots::coef(&s, 7, 1), 0);
    assert_eq!(lmots::coef(&s, 0, 4), 1);
    // Exhaustive cross-check of coef against a bit-by-bit definition for every w.
    for w in [1u8, 2, 4, 8] {
        for i in 0..(16 / w as usize) {
            let mut v = 0u8;
            for b in 0..w as usize {
                let bit = i * w as usize + b;
                v = (v << 1) | ((s[bit / 8] >> (7 - bit % 8)) & 1);
            }
            assert_eq!(lmots::coef(&s, i, w), v, "w={w} i={i}");
        }
    }
}

#[test]
fn checksum_bounds() {
    // All-zero Q maximizes the checksum; all-0xff gives zero.
    for ots in [
        crate::params::LMOTS_SHA256_N32_W1,
        crate::params::LMOTS_SHA256_N32_W2,
        crate::params::LMOTS_SHA256_N32_W4,
        crate::params::LMOTS_SHA256_N32_W8,
    ] {
        let z = lmots::q_with_checksum(&[0u8; N], &ots);
        let expected = ((N * 8 / ots.w as usize) as u16 * ots.max_digit()) << ots.ls;
        assert_eq!(u16::from_be_bytes([z[N], z[N + 1]]), expected);
        let f = lmots::q_with_checksum(&[0xffu8; N], &ots);
        assert_eq!(&f[N..], &[0, 0]);
    }
}

#[test]
fn rfc8554_test_case_1_hss() {
    let v = vectors().test_case_1;
    let (pk, msg, sig) = (h(&v.hss_public_key), h(&v.message), h(&v.hss_signature));
    let qs = hss_verify(&pk, &msg, &sig).expect("RFC 8554 test case 1 must verify");
    assert_eq!(qs, vec![5, 10]);
    // Types: both levels LMS_SHA256_M32_H5 / LMOTS_SHA256_N32_W8.
    assert_eq!(&pk[4..12], &[0, 0, 0, 5, 0, 0, 0, 4]);
    let (_, p1, _) = split_hss2(&sig);
    assert_eq!(&p1[..8], &[0, 0, 0, 5, 0, 0, 0, 4]);
}

#[test]
fn rfc8554_test_case_2_hss() {
    let v = vectors().test_case_2;
    let (pk, msg, sig) = (h(&v.hss_public_key), h(&v.message), h(&v.hss_signature));
    let qs = hss_verify(&pk, &msg, &sig).expect("RFC 8554 test case 2 must verify");
    assert_eq!(qs, vec![3, 4]);
    // The top level is exactly our parameter set: the public API must verify it too.
    assert_eq!(&pk[4..12], &[0, 0, 0, 6, 0, 0, 0, 3]);
    let (s0, p1, _) = split_hss2(&sig);
    let root: [u8; 48] = pk[12..60].try_into().unwrap();
    assert_eq!(s0.len(), crate::SIG_LEN);
    assert_eq!(crate::verify::<Sha2Hasher>(&root, &[p1], s0), Ok(3));
    // Message given in several parts must give the same result.
    assert_eq!(
        crate::verify::<Sha2Hasher>(&root, &[&p1[..7], &[], &p1[7..30], &p1[30..]], s0),
        Ok(3)
    );
    assert_eq!(&p1[..8], &[0, 0, 0, 5, 0, 0, 0, 4]);
}

#[test]
fn rfc_vectors_reject_tampering() {
    for v in [vectors().test_case_1, vectors().test_case_2] {
        let (pk, msg, sig) = (h(&v.hss_public_key), h(&v.message), h(&v.hss_signature));
        // Every 7th byte of the whole HSS signature (covers q, types, C, y, path, child pub).
        for pos in (0..sig.len()).step_by(7).chain([sig.len() - 1]) {
            let mut bad = sig.clone();
            bad[pos] ^= 0x01;
            assert!(
                hss_verify(&pk, &msg, &bad).is_err(),
                "tampered byte {pos} still verified"
            );
        }
        for pos in 0..msg.len() {
            let mut bad = msg.clone();
            bad[pos] ^= 0x80;
            assert!(hss_verify(&pk, &bad, &sig).is_err());
        }
    }
}

#[test]
fn public_api_rejects_other_parameter_sets() {
    // Test case 1's level-0 signature is H5/W8: the fixed public API must refuse it by type.
    let v = vectors().test_case_1;
    let (pk, sig) = (h(&v.hss_public_key), h(&v.hss_signature));
    let (s0, p1, _) = split_hss2(&sig);
    let root: [u8; 48] = pk[12..60].try_into().unwrap();
    assert_eq!(
        crate::verify::<Sha2Hasher>(&root, &[p1], s0),
        Err(LmsError::WrongOtsType)
    );
    // Same bytes but with the OTS type patched to ours: now the length is wrong.
    let mut patched = s0.to_vec();
    patched[4..8].copy_from_slice(&3u32.to_be_bytes());
    assert_eq!(
        crate::verify::<Sha2Hasher>(&root, &[p1], &patched),
        Err(LmsError::InvalidLength)
    );
}
