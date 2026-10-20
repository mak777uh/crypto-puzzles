var e=`//! Unit tests for the encoder: exact sizes, strictness of every rule, and the message layout.

use std::vec;
use std::vec::Vec;

use crate::*;

const A: [u8; 32] = [0x11; 32];
const B: [u8; 32] = [0x22; 32];
const C: [u8; 32] = [0x33; 32];

fn sol(lamports: u64) -> Action {
    Action::TransferSol { to: A, lamports }
}
fn tok(amount: u64) -> Action {
    Action::TransferToken {
        mint: A,
        token_program: SPL_TOKEN,
        destination: B,
        amount,
    }
}
fn close() -> Action {
    Action::CloseTokenAccount {
        mint: A,
        token_program: TOKEN_2022,
        rent_to: C,
    }
}

#[test]
fn action_sizes() {
    assert_eq!(encode_actions(&[sol(1)]).len(), 1 + 41);
    assert_eq!(encode_actions(&[tok(1)]).len(), 1 + 105);
    assert_eq!(encode_actions(&[close()]).len(), 1 + 97);
    for a in [sol(1), tok(1), close()] {
        assert_eq!(encode_actions(&[a]).len(), 1 + a.encoded_len());
    }
}

#[test]
fn exact_layout() {
    let p = encode_actions(&[sol(0x0102030405060708)]);
    assert_eq!(p[0], 1);
    assert_eq!(p[1], TAG_TRANSFER_SOL);
    assert_eq!(&p[2..34], &A);
    assert_eq!(&p[34..42], &[8, 7, 6, 5, 4, 3, 2, 1]);

    let p = encode_actions(&[tok(5)]);
    assert_eq!(p[1], TAG_TRANSFER_TOKEN);
    assert_eq!(&p[2..34], &A);
    assert_eq!(&p[34..66], &SPL_TOKEN);
    assert_eq!(&p[66..98], &B);
    assert_eq!(&p[98..106], &5u64.to_le_bytes());

    let p = encode_actions(&[close()]);
    assert_eq!(p[1], TAG_CLOSE_TOKEN_ACCOUNT);
    assert_eq!(&p[34..66], &TOKEN_2022);
    assert_eq!(&p[66..98], &C);
}

#[test]
fn decode_round_trip_mixed() {
    let list = vec![
        sol(1),
        tok(u64::MAX),
        close(),
        sol(7),
        tok(9),
        close(),
        sol(u64::MAX),
        tok(3),
    ];
    let p = try_encode_actions(&list).unwrap();
    assert_eq!(decode_actions(&p).unwrap(), list);
}

#[test]
fn decode_rejections() {
    assert_eq!(decode_actions(&[]), Err(CoreError::Empty));
    assert_eq!(decode_actions(&[0]), Err(CoreError::BadActionCount));
    assert_eq!(decode_actions(&[9]), Err(CoreError::BadActionCount));
    let nine = encode_actions(&[sol(1); 9]);
    assert_eq!(decode_actions(&nine), Err(CoreError::BadActionCount));
    assert_eq!(decode_actions(&[1]), Err(CoreError::Truncated));

    let good = encode_actions(&[sol(1)]);
    for cut in 1..good.len() {
        assert_eq!(
            decode_actions(&good[..cut]),
            Err(CoreError::Truncated),
            "cut {cut}"
        );
    }
    let mut trailing = good.clone();
    trailing.push(0);
    assert_eq!(decode_actions(&trailing), Err(CoreError::TrailingBytes));
    // Count says 1 but two actions are present.
    let mut two = encode_actions(&[sol(1), sol(2)]);
    two[0] = 1;
    assert_eq!(decode_actions(&two), Err(CoreError::TrailingBytes));
    // Count says 2 but one action is present.
    let mut short = good.clone();
    short[0] = 2;
    assert_eq!(decode_actions(&short), Err(CoreError::Truncated));

    // 0x10..=0x12 are the heir actions; the rest of the reserved range is still unknown.
    for tag in [0u8, 4, 0x0f, 0x13, 0x3f, 0x40, 0xff] {
        let mut bad = good.clone();
        bad[1] = tag;
        assert_eq!(decode_actions(&bad), Err(CoreError::UnknownTag(tag)));
    }
    assert_eq!(
        decode_actions(&encode_actions(&[sol(0)])),
        Err(CoreError::ZeroAmount)
    );
    assert_eq!(
        decode_actions(&encode_actions(&[tok(0)])),
        Err(CoreError::ZeroAmount)
    );
    let bad_prog = Action::TransferToken {
        mint: A,
        token_program: B,
        destination: C,
        amount: 1,
    };
    assert_eq!(
        decode_actions(&encode_actions(&[bad_prog])),
        Err(CoreError::InvalidTokenProgram)
    );
    let bad_prog = Action::CloseTokenAccount {
        mint: A,
        token_program: [0; 32],
        rent_to: C,
    };
    assert_eq!(
        decode_actions(&encode_actions(&[bad_prog])),
        Err(CoreError::InvalidTokenProgram)
    );
    // A later invalid action poisons the whole payload.
    assert_eq!(
        decode_actions(&encode_actions(&[sol(1), tok(0)])),
        Err(CoreError::ZeroAmount)
    );
}

fn set_heir(days: u16) -> Action {
    Action::SetHeir {
        heir: B,
        inactivity_days: days,
    }
}
fn check_in(days: u16) -> Action {
    Action::CheckIn {
        heir: B,
        inactivity_days: days,
    }
}
fn clear_heir() -> Action {
    Action::ClearHeir { heir: B }
}

#[test]
fn heir_action_sizes_and_layout() {
    for a in [set_heir(365), check_in(365), clear_heir()] {
        assert_eq!(encode_actions(&[a]).len(), 1 + a.encoded_len());
        assert!(a.is_heir_action());
    }
    assert!(!sol(1).is_heir_action() && !tok(1).is_heir_action() && !close().is_heir_action());

    let p = encode_actions(&[set_heir(0x0102)]);
    assert_eq!(p.len(), 1 + 35);
    assert_eq!(p[1], TAG_SET_HEIR);
    assert_eq!(&p[2..34], &B);
    assert_eq!(&p[34..36], &[0x02, 0x01], "u16 little-endian");

    let p = encode_actions(&[check_in(365)]);
    assert_eq!(p[1], TAG_CHECK_IN);
    assert_eq!(&p[2..34], &B);
    assert_eq!(&p[34..36], &365u16.to_le_bytes());

    let p = encode_actions(&[clear_heir()]);
    assert_eq!(p.len(), 1 + 33);
    assert_eq!(p[1], TAG_CLEAR_HEIR);
    assert_eq!(&p[2..34], &B);

    assert_eq!((TAG_SET_HEIR, TAG_CHECK_IN, TAG_CLEAR_HEIR), (0x10, 0x11, 0x12));
    assert_eq!((HEIR_MIN_DAYS, HEIR_MAX_DAYS, SECONDS_PER_DAY), (30, 3650, 86_400));
}

#[test]
fn heir_action_rules() {
    // Period bounds: 30..=3650 days, both ends included.
    for days in [30u16, 31, 183, 365, 730, 3649, 3650] {
        for a in [set_heir(days), check_in(days)] {
            let p = try_encode_actions(&[a]).unwrap();
            assert_eq!(decode_actions(&p), Ok(vec![a]));
        }
    }
    for days in [0u16, 1, 29, 3651, 4000, u16::MAX] {
        for a in [set_heir(days), check_in(days)] {
            assert_eq!(a.validate(), Err(CoreError::InactivityOutOfRange(days)));
            assert_eq!(decode_actions(&encode_actions(&[a])), Err(CoreError::InactivityOutOfRange(days)));
        }
    }
    // The heir is never the all-zero address (the System Program id: an unfilled field).
    for a in [
        Action::SetHeir { heir: [0; 32], inactivity_days: 365 },
        Action::CheckIn { heir: [0; 32], inactivity_days: 365 },
        Action::ClearHeir { heir: [0; 32] },
    ] {
        assert_eq!(a.validate(), Err(CoreError::ZeroHeir));
        assert_eq!(decode_actions(&encode_actions(&[a])), Err(CoreError::ZeroHeir));
    }
    // Truncated or extended heir actions.
    for a in [set_heir(365), check_in(365), clear_heir()] {
        let good = encode_actions(&[a]);
        for cut in 1..good.len() {
            assert_eq!(decode_actions(&good[..cut]), Err(CoreError::Truncated), "{a:?} cut {cut}");
        }
        let mut long = good.clone();
        long.push(0);
        assert_eq!(decode_actions(&long), Err(CoreError::TrailingBytes));
    }
}

#[test]
fn at_most_one_heir_action_per_payload() {
    let heirs = [set_heir(365), check_in(365), clear_heir()];
    for a in heirs {
        for b in heirs {
            let pair = [a, b];
            assert_eq!(validate_actions(&pair), Err(CoreError::MultipleHeirActions), "{a:?} + {b:?}");
            assert_eq!(try_encode_actions(&pair), Err(CoreError::MultipleHeirActions));
            assert_eq!(decode_actions(&encode_actions(&pair)), Err(CoreError::MultipleHeirActions));
            // Also when transfers separate them.
            let spread = [a, sol(1), tok(2), b];
            assert_eq!(decode_actions(&encode_actions(&spread)), Err(CoreError::MultipleHeirActions));
        }
        // One heir action anywhere among transfers is fine (the app bundles a check-in with a send).
        for at in 0..=3 {
            let mut list = vec![sol(1), tok(2), close()];
            list.insert(at, a);
            let p = try_encode_actions(&list).unwrap();
            assert_eq!(decode_actions(&p).unwrap(), list);
        }
        // Eight actions, one of them a heir action.
        let mut eight = vec![sol(1); 7];
        eight.push(a);
        assert!(try_encode_actions(&eight).is_ok());
    }
}

#[test]
fn try_encode_validates() {
    assert_eq!(try_encode_actions(&[]), Err(CoreError::BadActionCount));
    assert_eq!(
        try_encode_actions(&[sol(1); 9]),
        Err(CoreError::BadActionCount)
    );
    assert_eq!(try_encode_actions(&[sol(0)]), Err(CoreError::ZeroAmount));
    assert!(try_encode_actions(&[sol(1); 8]).is_ok());
    assert_eq!(validate_actions(&[close()]), Ok(()));
}

#[test]
fn prefix_layout() {
    let program = [0xaa; 32];
    let state = [0xbb; 32];
    let p = message_prefix(
        Cluster::Devnet as u8,
        &program,
        IxTag::Rotate,
        &state,
        0x0403_0201,
        0x0807_0605,
    );
    assert_eq!(p.len(), 83);
    assert_eq!(&p[..9], b"BUNKER-v1");
    assert_eq!(p[9], 2);
    assert_eq!(&p[10..42], &program);
    assert_eq!(p[42], 2);
    assert_eq!(&p[43..75], &state);
    assert_eq!(&p[75..79], &[1, 2, 3, 4]);
    assert_eq!(&p[79..83], &[5, 6, 7, 8]);
    let m = signed_message(&p, &[9, 9]);
    assert_eq!(m.len(), 85);
    assert_eq!(&m[..83], &p);
}

#[test]
fn enums() {
    for (v, c) in [
        (1u8, Cluster::Localnet),
        (2, Cluster::Devnet),
        (3, Cluster::Testnet),
        (4, Cluster::Mainnet),
    ] {
        assert_eq!(Cluster::try_from(v), Ok(c));
        assert_eq!(c as u8, v);
    }
    assert_eq!(Cluster::try_from(0), Err(CoreError::UnknownCluster(0)));
    assert_eq!(Cluster::try_from(5), Err(CoreError::UnknownCluster(5)));
    for (v, t) in [(1u8, IxTag::Execute), (2, IxTag::Rotate), (3, IxTag::Close)] {
        assert_eq!(IxTag::try_from(v), Ok(t));
        assert_eq!(t as u8, v);
    }
    assert_eq!(IxTag::try_from(4), Err(CoreError::UnknownIxTag(4)));
}

#[test]
fn options_and_vault_id() {
    assert_eq!(encode_options(None), vec![1, 0]);
    let with = encode_options(Some(&A));
    assert_eq!(with.len(), 34);
    assert_eq!(&with[..2], &[1, 1]);
    assert_eq!(decode_options(&with), Ok(Some(A)));
    assert_eq!(decode_options(&[1, 0]), Ok(None));
    for bad in [
        &[][..],
        &[1],
        &[0, 0],
        &[2, 0],
        &[1, 2],
        &[1, 0, 0],
        &[1, 1],
        &with[..33],
    ] {
        assert_eq!(
            decode_options(bad),
            Err(CoreError::InvalidOptions),
            "{bad:?}"
        );
    }
    let mut long = with.clone();
    long.push(0);
    assert_eq!(decode_options(&long), Err(CoreError::InvalidOptions));

    let root = [7u8; 48];
    let id0 = vault_id::<Sha2Hasher>(&root, &encode_options(None));
    let id1 = vault_id::<Sha2Hasher>(&root, &with);
    assert_ne!(id0, id1);
    // Definition check against a direct SHA-256 of the concatenation.
    let mut pre = Vec::new();
    pre.extend_from_slice(b"BUNKER/vault-id/v1");
    pre.extend_from_slice(&root);
    pre.extend_from_slice(&[1, 0]);
    assert_eq!(id0, Sha2Hasher::hashv(&[&pre]));
}

#[test]
fn rotate_close_payloads() {
    assert_eq!(decode_rotate_payload(&[3u8; 48]), Ok([3u8; 48]));
    assert_eq!(
        decode_rotate_payload(&[3u8; 47]),
        Err(CoreError::InvalidLength)
    );
    assert_eq!(
        decode_rotate_payload(&[3u8; 49]),
        Err(CoreError::InvalidLength)
    );
    assert_eq!(decode_close_payload(&[4u8; 32]), Ok([4u8; 32]));
    assert_eq!(
        decode_close_payload(&[4u8; 33]),
        Err(CoreError::InvalidLength)
    );
    assert_eq!(decode_close_payload(&[]), Err(CoreError::InvalidLength));
}

#[test]
fn parse_signed_message_accepts_exactly_well_formed_messages() {
    let program = [0xaa; 32];
    let state = [0xbb; 32];
    let exec = encode_actions(&[sol(1)]);
    for (tag, payload) in [
        (IxTag::Execute, exec.clone()),
        (IxTag::Rotate, vec![3u8; 48]),
        (IxTag::Close, vec![4u8; 32]),
    ] {
        let p = message_prefix(Cluster::Devnet as u8, &program, tag, &state, 7, 1022);
        let m = signed_message(&p, &payload);
        assert_eq!(validate_payload(tag, &payload), Ok(()));
        assert_eq!(
            parse_signed_message(&m),
            Ok(SignedMessage {
                cluster: Cluster::Devnet,
                program_id: program,
                tag,
                vault_state: state,
                root_epoch: 7,
                leaf_index: 1022,
                payload: &payload,
            })
        );
        // The last leaf is kept for rotate: execute and close may not be signed with it.
        let last = signed_message(&message_prefix(Cluster::Devnet as u8, &program, tag, &state, 7, 1023), &payload);
        if tag == IxTag::Rotate {
            assert_eq!(parse_signed_message(&last).map(|s| s.leaf_index), Ok(1023));
        } else {
            assert_eq!(parse_signed_message(&last), Err(CoreError::LeafReservedForRotate));
        }
    }
    let p = message_prefix(1, &program, IxTag::Execute, &state, 0, 5);
    let good = signed_message(&p, &exec);
    let with = |f: &dyn Fn(&mut Vec<u8>)| {
        let mut v = good.clone();
        f(&mut v);
        v
    };
    let not_rv = Err(CoreError::NotBunkerMessage);
    assert_eq!(parse_signed_message(&[]), not_rv);
    assert_eq!(parse_signed_message(b"hello"), not_rv);
    assert_eq!(parse_signed_message(&good[..82]), not_rv);
    assert_eq!(parse_signed_message(&with(&|v| v[0] ^= 1)), not_rv);
    assert_eq!(parse_signed_message(&with(&|v| v[8] = b'2')), not_rv);
    assert_eq!(
        parse_signed_message(&with(&|v| v[9] = 5)),
        Err(CoreError::UnknownCluster(5))
    );
    assert_eq!(
        parse_signed_message(&with(&|v| v[42] = 4)),
        Err(CoreError::UnknownIxTag(4))
    );
    assert_eq!(
        parse_signed_message(&with(&|v| v[79..83].copy_from_slice(&1024u32.to_le_bytes()))),
        Err(CoreError::LeafOutOfRange(1024))
    );
    // Payload checked against the tag: execute bytes under the rotate / close tags, a trailing
    // byte, a missing payload.
    assert_eq!(
        parse_signed_message(&with(&|v| v[42] = 2)),
        Err(CoreError::InvalidLength)
    );
    assert_eq!(
        parse_signed_message(&with(&|v| v[42] = 3)),
        Err(CoreError::InvalidLength)
    );
    assert_eq!(
        parse_signed_message(&with(&|v| v.push(0))),
        Err(CoreError::TrailingBytes)
    );
    assert_eq!(parse_signed_message(&good[..83]), Err(CoreError::Empty));
}

#[test]
fn token_program_constants_match_base58() {
    assert_eq!(
        bs58::encode(SPL_TOKEN).into_string(),
        "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
    );
    assert_eq!(
        bs58::encode(TOKEN_2022).into_string(),
        "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb"
    );
}

#[test]
fn constants() {
    assert_eq!(DOMAIN.len() + 1 + 32 + 1 + 32 + 4 + 4, PREFIX_LEN);
    assert_eq!(VAULT_ID_DOMAIN, b"BUNKER/vault-id/v1");
    assert_eq!(LMS_HKDF_SALT, b"BUNKER/LMS/v1");
    assert_eq!(MAX_ACTIONS, 8);
}

#[cfg(feature = "keys")]
mod keys {
    use super::*;

    const TEST_MNEMONIC: &str = "abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon \\
                                 abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon \\
                                 abandon abandon abandon art";

    #[test]
    fn mnemonic_rules() {
        assert!(validate_mnemonic(TEST_MNEMONIC));
        // Case and whitespace are normalized; the derived seed is the same.
        let messy = std::format!("  {}\\n", TEST_MNEMONIC.to_uppercase().replace(' ', "\\t "));
        assert!(validate_mnemonic(&messy));
        assert_eq!(
            mnemonic_to_seed64(&messy),
            mnemonic_to_seed64(TEST_MNEMONIC)
        );
        // Bad checksum, 12 words, unknown word, empty.
        assert!(!validate_mnemonic(
            &TEST_MNEMONIC.replace(" art", " abandon")
        ));
        assert!(!validate_mnemonic(
            "abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about"
        ));
        assert!(!validate_mnemonic(&TEST_MNEMONIC.replace(" art", " artt")));
        assert!(!validate_mnemonic(""));
        assert_eq!(mnemonic_to_seed64(""), Err(CoreError::InvalidMnemonic));
    }

    #[test]
    fn generate_mnemonic_matches_bip39() {
        assert_eq!(
            generate_mnemonic(&[0u8; 32]),
            TEST_MNEMONIC
                .split_whitespace()
                .collect::<Vec<_>>()
                .join(" ")
        );
        // BIP-39 reference vector (Trezor vectors.json): entropy 0x7f × 32.
        assert_eq!(
            generate_mnemonic(&[0x7f; 32]),
            "legal winner thank year wave sausage worth useful legal winner thank year wave sausage worth useful \\
             legal winner thank year wave sausage worth title"
        );
    }

    #[test]
    fn generate_mnemonic_allocates_once() {
        // Regression: building the phrase with push_str on String::new() reallocated five times
        // and left growing prefixes of the phrase in freed heap blocks. The phrase is now written
        // into one exact-size allocation (capacity == len proves no reallocation happened).
        for e in [
            [0u8; 32],
            [0x7f; 32],
            [0xff; 32],
            core::array::from_fn(|i| i as u8),
        ] {
            let s = generate_mnemonic(&e);
            assert_eq!(s.capacity(), s.len());
            assert!(validate_mnemonic(&s));
        }
    }

    #[test]
    fn bip39_seed_reference_vector() {
        // The Trezor reference vectors use the passphrase "TREZOR"; with the empty passphrase
        // we check against PBKDF2 computed independently below instead.
        let seed = mnemonic_to_seed64(TEST_MNEMONIC).unwrap();
        let words = TEST_MNEMONIC
            .split_whitespace()
            .collect::<Vec<_>>()
            .join(" ");
        let mut expect = [0u8; 64];
        pbkdf2_hmac_sha512(words.as_bytes(), b"mnemonic", 2048, &mut expect);
        assert_eq!(seed, expect);
    }

    /// Independent textbook PBKDF2-HMAC-SHA512 (single block suffices for 64 bytes).
    fn pbkdf2_hmac_sha512(pw: &[u8], salt: &[u8], iters: u32, out: &mut [u8; 64]) {
        use sha2::{Digest, Sha512};
        fn hmac(key: &[u8], msg: &[u8]) -> [u8; 64] {
            let mut k = [0u8; 128];
            if key.len() > 128 {
                k[..64].copy_from_slice(&Sha512::digest(key));
            } else {
                k[..key.len()].copy_from_slice(key);
            }
            let ipad: Vec<u8> = k.iter().map(|b| b ^ 0x36).collect();
            let opad: Vec<u8> = k.iter().map(|b| b ^ 0x5c).collect();
            let inner = Sha512::new()
                .chain_update(&ipad)
                .chain_update(msg)
                .finalize();
            Sha512::new()
                .chain_update(&opad)
                .chain_update(inner)
                .finalize()
                .into()
        }
        let mut s = salt.to_vec();
        s.extend_from_slice(&1u32.to_be_bytes());
        let mut u = hmac(pw, &s);
        let mut t = u;
        for _ in 1..iters {
            u = hmac(pw, &u);
            for (a, b) in t.iter_mut().zip(u.iter()) {
                *a ^= b;
            }
        }
        *out = t;
    }

    const PROGRAM: [u8; 32] = [0x5a; 32];

    fn ctx<'a>(cluster: Cluster, program_id: &'a [u8; 32], binding: &'a [u8]) -> KeyContext<'a> {
        KeyContext {
            cluster,
            program_id,
            binding,
        }
    }

    #[test]
    fn hkdf_matches_rfc5869_construction() {
        // Recompute HKDF-SHA256 by hand (RFC 5869: PRK = HMAC(salt, IKM); T(1) = HMAC(PRK, info‖1),
        // T(2) = HMAC(PRK, T(1)‖info‖2)) over the MESSAGE_FORMAT §2 info layout
        // "epoch" ‖ u32le(e) ‖ u8(cluster) ‖ program_id ‖ binding, and compare.
        use sha2::{Digest, Sha256};
        fn hmac(key: &[u8], parts: &[&[u8]]) -> [u8; 32] {
            let mut k = [0u8; 64];
            k[..key.len()].copy_from_slice(key);
            let mut inner = Sha256::new();
            inner.update(k.iter().map(|b| b ^ 0x36).collect::<Vec<_>>());
            for p in parts {
                inner.update(p);
            }
            let mut outer = Sha256::new();
            outer.update(k.iter().map(|b| b ^ 0x5c).collect::<Vec<_>>());
            outer.update(inner.finalize());
            outer.finalize().into()
        }
        let seed64 = mnemonic_to_seed64(TEST_MNEMONIC).unwrap();
        let none = encode_options(None);
        let cos = encode_options(Some(&B));
        let vid = [0xc4u8; 32];
        for (epoch, cluster, binding) in [
            (0u32, Cluster::Localnet, &none[..]),
            (0, Cluster::Mainnet, &cos[..]),
            (1, Cluster::Devnet, &vid[..]),
            (0xdead_beef, Cluster::Testnet, &vid[..]),
        ] {
            let prk = hmac(b"BUNKER/LMS/v1", &[&seed64]);
            let mut info = b"epoch".to_vec();
            info.extend_from_slice(&epoch.to_le_bytes());
            info.push(cluster as u8);
            info.extend_from_slice(&PROGRAM);
            info.extend_from_slice(binding);
            let c = ctx(cluster, &PROGRAM, binding);
            assert_eq!(c.hkdf_info(epoch).unwrap(), info);
            let t1 = hmac(&prk, &[&info, &[1]]);
            let t2 = hmac(&prk, &[&t1, &info, &[2]]);
            let (seed, id) = epoch_key_material(&seed64, epoch, &c).unwrap();
            assert_eq!(seed, t1);
            assert_eq!(id, t2[..16]);
        }
    }

    /// Regression for "LMS key identity depends only on (seed, epoch)": every vault context a
    /// seed can be used in gets its own (SEED, I), so one-time leaves are never shared between
    /// vaults whose leaf state is tracked separately. With the old derivation every line below
    /// produced the same key (I and SEED depended on the seed and epoch only).
    #[test]
    fn epoch_key_is_bound_to_its_vault() {
        let seed64 = mnemonic_to_seed64(TEST_MNEMONIC).unwrap();
        let other_program = [0x5b; 32];
        let none = encode_options(None);
        let cos_x = encode_options(Some(&A));
        let cos_y = encode_options(Some(&C));
        let k = |e: u32, c: KeyContext| epoch_key_material(&seed64, e, &c).unwrap();

        // Epoch 0: \`open\` vs \`open --cosigner X\` vs \`--cosigner Y\`, devnet vs mainnet, and two
        // program deployments all give different keys.
        let opened = [
            k(0, ctx(Cluster::Localnet, &PROGRAM, &none)),
            k(0, ctx(Cluster::Localnet, &PROGRAM, &cos_x)),
            k(0, ctx(Cluster::Localnet, &PROGRAM, &cos_y)),
            k(0, ctx(Cluster::Devnet, &PROGRAM, &none)),
            k(0, ctx(Cluster::Mainnet, &PROGRAM, &none)),
            k(0, ctx(Cluster::Localnet, &other_program, &none)),
        ];
        for i in 0..opened.len() {
            for j in i + 1..opened.len() {
                assert_ne!(opened[i].0, opened[j].0, "SEED {i} vs {j}");
                assert_ne!(opened[i].1, opened[j].1, "I {i} vs {j}");
            }
        }

        // Epoch >= 1 is bound to the vault id. Vault A (seed S1) rotates to a fresh seed S2 at
        // epoch 1; vault B, opened from S2, rotates within S2 to epoch 1. Before the fix both
        // landed on key(S2, 1).
        let s2 = mnemonic_to_seed64(&generate_mnemonic(&[0x42; 32])).unwrap();
        let vid_a = [0xa0u8; 32];
        let vid_b = [0xb0u8; 32];
        let a1 = epoch_key_material(&s2, 1, &ctx(Cluster::Devnet, &PROGRAM, &vid_a)).unwrap();
        let b1 = epoch_key_material(&s2, 1, &ctx(Cluster::Devnet, &PROGRAM, &vid_b)).unwrap();
        assert_ne!(a1, b1);
        // ... and a rotated key never equals any epoch-0 key of the same seed.
        let b0 = epoch_key_material(&s2, 0, &ctx(Cluster::Devnet, &PROGRAM, &none)).unwrap();
        assert_ne!(a1.1, b0.1);
        // Same context, different epochs: different keys (rotation never reuses a leaf).
        let c = ctx(Cluster::Devnet, &PROGRAM, &vid_a);
        assert_ne!(
            epoch_key_material(&s2, 1, &c).unwrap(),
            epoch_key_material(&s2, 2, &c).unwrap()
        );
    }

    #[test]
    fn epoch_key_binding_shape_is_enforced() {
        let seed64 = mnemonic_to_seed64(TEST_MNEMONIC).unwrap();
        let none = encode_options(None);
        let cos = encode_options(Some(&A));
        let vid = [9u8; 32];
        let bad = Err(CoreError::InvalidKeyBinding);
        let m = |e: u32, b: &[u8]| {
            epoch_key_material(&seed64, e, &ctx(Cluster::Localnet, &PROGRAM, b)).map(|_| ())
        };
        // Epoch 0 takes options_v1 only.
        assert_eq!(m(0, &none), Ok(()));
        assert_eq!(m(0, &cos), Ok(()));
        assert_eq!(m(0, &vid), bad);
        assert_eq!(m(0, &[]), bad);
        assert_eq!(m(0, &[1, 2]), bad);
        assert_eq!(m(0, &cos[..33]), bad);
        // Every later epoch takes the 32-byte vault id only.
        assert_eq!(m(1, &vid), Ok(()));
        assert_eq!(m(u32::MAX, &vid), Ok(()));
        assert_eq!(m(1, &none), bad);
        assert_eq!(m(1, &cos), bad);
        assert_eq!(m(1, &vid[..31]), bad);
        assert_eq!(m(1, &[0u8; 33]), bad);
    }

    #[cfg(feature = "signer")]
    #[test]
    fn derive_root_matches_epoch_key_material() {
        let none = encode_options(None);
        let c = ctx(Cluster::Localnet, &PROGRAM, &none);
        let seed64 = mnemonic_to_seed64(TEST_MNEMONIC).unwrap();
        let (_, id) = epoch_key_material(&seed64, 0, &c).unwrap();
        let root = derive_root(TEST_MNEMONIC, 0, &c).unwrap();
        assert_eq!(&root[..16], &id);
        assert_eq!(
            derive_root(TEST_MNEMONIC, 1, &c),
            Err(CoreError::InvalidKeyBinding)
        );
        assert_eq!(
            derive_root("not a mnemonic", 0, &c),
            Err(CoreError::InvalidMnemonic)
        );
    }
}
`;export{e as default};