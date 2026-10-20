//! RFC 8554 Test Case 2 gives the private keys (SEED, I, Appendix A derivation) of both levels.
//! Rebuild both trees from them and check the public keys and the signatures byte-for-byte.

use super::{h, parse_lms_pub, split_hss2, vectors};
use crate::params::{
    LMOTS_SHA256_N32_W4, LMOTS_SHA256_N32_W8, LMS_SHA256_M32_H10, LMS_SHA256_M32_H5,
};
use crate::signer::KeyCore;
use crate::{LmsKey, Sha2Hasher};

fn arr<const L: usize>(s: &Option<std::string::String>) -> [u8; L] {
    h(s.as_deref().unwrap()).try_into().unwrap()
}

#[test]
fn test_case_2_top_level_keygen_and_signature() {
    let v = vectors().test_case_2;
    let (pk, sig) = (h(&v.hss_public_key), h(&v.hss_signature));
    let (s0, p1, _) = split_hss2(&sig);

    // Public API: our fixed parameter set (H10 / W4).
    let key = LmsKey::from_seed_and_id(arr::<32>(&v.top_seed), arr::<16>(&v.top_i));
    assert_eq!(
        &key.root()[..],
        &pk[12..60],
        "top-level root (I || T[1]) must match the RFC"
    );

    // The RFC signature at q = 3, re-created with the RFC's randomizer C: y[] and the path
    // must come out byte-identical.
    assert_eq!(
        (key.core.lms, key.core.ots),
        (LMS_SHA256_M32_H10, LMOTS_SHA256_N32_W4)
    );
    let c: [u8; 32] = s0[8..40].try_into().unwrap();
    let ours = key.core.sign_with_c(3, &c, &[p1]).unwrap();
    assert_eq!(
        ours, s0,
        "re-signed top-level signature must equal the RFC bytes"
    );

    // And our deterministic randomizer (MESSAGE_FORMAT §1, i = 0xFFFD) reproduces the RFC's C,
    // i.e. the full signature from the public API is byte-identical.
    assert_eq!(
        key.sign(3, p1),
        s0,
        "deterministic C must reproduce RFC 8554 test case 2"
    );
    assert_eq!(
        &key.auth_path(3).unwrap().concat()[..],
        &s0[s0.len() - 320..]
    );
}

#[test]
fn test_case_2_child_level_keygen_and_signature() {
    let v = vectors().test_case_2;
    let (msg, sig) = (h(&v.message), h(&v.hss_signature));
    let (_, p1, s1) = split_hss2(&sig);
    let child = parse_lms_pub(p1).unwrap();
    assert_eq!(child.lms, LMS_SHA256_M32_H5);
    assert_eq!(child.ots, LMOTS_SHA256_N32_W8);

    let core = KeyCore::<Sha2Hasher>::generate(
        LMS_SHA256_M32_H5,
        LMOTS_SHA256_N32_W8,
        arr(&v.child_seed),
        arr(&v.child_i),
    );
    assert_eq!(core.id(), child.root[..16]);
    assert_eq!(core.t1(), child.root[16..], "child T[1] must match the RFC");

    let q = u32::from_be_bytes(s1[..4].try_into().unwrap());
    assert_eq!(q, 4);
    let c: [u8; 32] = s1[8..40].try_into().unwrap();
    assert_eq!(core.sign_with_c(q, &c, &[&msg]).unwrap(), s1);
    assert_eq!(
        core.sign(q, &[&msg]).unwrap(),
        s1,
        "deterministic C must reproduce the child signature too"
    );
}
