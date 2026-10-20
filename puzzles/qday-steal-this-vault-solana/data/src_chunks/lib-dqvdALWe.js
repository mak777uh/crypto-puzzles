var e=`//! wasm-bindgen wrapper used by \`@bunker/sdk\` (web app + CLI). See docs/SPEC.md §1.
//!
//! All byte arrays are \`Uint8Array\`; errors are thrown as JS \`Error\`s. Entropy always comes from
//! the JS side (\`crypto.getRandomValues\`), so this crate has no RNG dependency.
//!
//! Boundary hygiene:
//! * Numbers arrive as \`f64\` and must be integers in range: the generated glue would otherwise
//!   wrap \`u32\` / truncate \`u8\` arguments silently (\`2**32 + 5\` → 5, \`NaN\` → 0, \`257\` → 1).
//! * Secrets (mnemonic, entropy) are taken as owned buffers and wiped before returning, the
//!   generated mnemonic is handed to JS without leaving a copy in linear memory, and every
//!   secret-handling export overwrites the stack region it used (\`scrub_stack\`). Strings on the
//!   JS side cannot be wiped; that part is the caller's responsibility.

use std::fmt::Display;

use bunker_core::{
    decode_actions as core_decode_actions, epoch_key, message_prefix, mnemonic_to_seed64,
    parse_signed_message, bunker_lms, signed_message, try_encode_actions, validate_payload, Cluster,
    CoreError, IxTag, KeyContext, Sha2Hasher, ROOT_LEN, SIG_LEN,
};
use wasm_bindgen::prelude::*;
use zeroize::{Zeroize, Zeroizing};

mod json;

fn js_err(msg: impl Display) -> JsError {
    JsError::new(&msg.to_string())
}

fn fixed<const L: usize>(bytes: &[u8], what: &str) -> Result<[u8; L], String> {
    bytes
        .try_into()
        .map_err(|_| format!("{what} must be exactly {L} bytes (got {})", bytes.len()))
}

/// An integer argument in \`0..=max\`. Rejects NaN, ±Infinity, fractions and out-of-range values
/// instead of letting the glue's ToInt32 wrap them.
fn int_arg(v: f64, max: u32, what: &str) -> Result<u32, String> {
    if v.is_finite() && v.fract() == 0.0 && v >= 0.0 && v <= f64::from(max) {
        Ok(v as u32)
    } else {
        Err(format!("{what} must be an integer in 0..={max} (got {v})"))
    }
}

fn u32_arg(v: f64, what: &str) -> Result<u32, String> {
    int_arg(v, u32::MAX, what)
}

fn u8_arg(v: f64, what: &str) -> Result<u8, String> {
    int_arg(v, u8::MAX.into(), what).map(|x| x as u8)
}

fn leaf_arg(v: f64) -> Result<u32, String> {
    let leaf = u32_arg(v, "leaf index")?;
    if leaf >= bunker_lms::TREE_SIZE {
        return Err(CoreError::LeafOutOfRange(leaf).to_string());
    }
    Ok(leaf)
}

/// Bytes of shadow stack overwritten after each secret-handling export. The deepest secret
/// residue observed (BIP-39 PBKDF2, HKDF, LMS key generation and signing) is within ~5 KiB of
/// the stack top; 64 KiB leaves a wide margin and costs microseconds.
const SCRUB_BYTES: usize = 64 * 1024;

/// Overwrite the stack region below the caller's frame, where the secret-handling callees it just
/// returned from kept their locals (BIP-39 seed, HKDF state, SEED, chain values). Exports call
/// their work in a separate \`#[inline(never)]\` function first, so no secret lives in the export's
/// own frame.
#[inline(never)]
fn scrub_stack() {
    let mut buf = [0u8; SCRUB_BYTES];
    buf.zeroize();
    core::hint::black_box(&mut buf);
}

/// Heuristic broken-RNG guard for 32 bytes of entropy: CSPRNG output has fewer than 12 distinct
/// byte values with probability < 2^-75. Catches an unfilled buffer, a constant, or a string /
/// hex text coerced byte-by-byte by the glue (at most 11 distinct values).
fn entropy_looks_broken(e: &[u8; 32]) -> bool {
    let mut seen = [false; 256];
    for &b in e {
        seen[b as usize] = true;
    }
    seen.iter().filter(|&&s| s).count() < 12
}

/// 24-word English BIP-39 mnemonic from 32 bytes of CSPRNG entropy.
#[wasm_bindgen(unchecked_return_type = "string")]
pub fn generate_mnemonic(entropy32: Vec<u8>) -> Result<JsValue, JsError> {
    let entropy32 = Zeroizing::new(entropy32);
    let phrase = generate_mnemonic_inner(&entropy32);
    scrub_stack();
    // JS copies the string out of linear memory; our buffer is wiped when \`phrase\` drops.
    Ok(JsValue::from_str(&phrase.map_err(js_err)?))
}

#[inline(never)]
fn generate_mnemonic_inner(entropy32: &[u8]) -> Result<Zeroizing<String>, String> {
    let entropy = Zeroizing::new(fixed::<32>(entropy32, "entropy")?);
    if entropy_looks_broken(&entropy) {
        return Err(
            "entropy looks broken (too few distinct bytes); use crypto.getRandomValues".into(),
        );
    }
    Ok(Zeroizing::new(bunker_core::generate_mnemonic(&entropy)))
}

/// \`true\` iff \`m\` is a valid 24-word English BIP-39 mnemonic.
#[wasm_bindgen]
pub fn validate_mnemonic(m: String) -> bool {
    let m = Zeroizing::new(m);
    let ok = validate_mnemonic_inner(&m);
    scrub_stack();
    ok
}

#[inline(never)]
fn validate_mnemonic_inner(m: &str) -> bool {
    bunker_core::validate_mnemonic(m)
}

/// The key context for an epoch key (MESSAGE_FORMAT §2).
fn key_context<'a>(
    epoch: u32,
    cluster: u8,
    program_id: &'a [u8; 32],
    binding: &'a [u8],
) -> Result<KeyContext<'a>, String> {
    let ctx = KeyContext {
        cluster: Cluster::try_from(cluster).map_err(|e| e.to_string())?,
        program_id,
        binding,
    };
    // Shape check before the slow PBKDF2 / tree build.
    ctx.hkdf_info(epoch).map_err(|e| e.to_string())?;
    Ok(ctx)
}

/// \`root_e = I_e ‖ T[1]_e\` (48 bytes) of the key \`mnemonic\` uses for one vault at key epoch
/// \`epoch\` (MESSAGE_FORMAT §2). The key is bound to the vault: \`cluster\` and \`program_id32\` are
/// the deployment, \`binding\` is the vault's \`options_v1\` at epoch 0 and its 32-byte \`vault_id\` at
/// every later epoch. Builds the LMS tree.
#[wasm_bindgen]
pub fn derive_root(
    mnemonic: String,
    epoch: f64,
    cluster: f64,
    program_id32: &[u8],
    binding: &[u8],
) -> Result<Vec<u8>, JsError> {
    let mnemonic = Zeroizing::new(mnemonic);
    let out = derive_root_inner(&mnemonic, epoch, cluster, program_id32, binding);
    scrub_stack();
    Ok(out.map_err(js_err)?.to_vec())
}

#[inline(never)]
fn derive_root_inner(
    mnemonic: &str,
    epoch: f64,
    cluster: f64,
    program_id32: &[u8],
    binding: &[u8],
) -> Result<[u8; ROOT_LEN], String> {
    let epoch = u32_arg(epoch, "epoch")?;
    let cluster = u8_arg(cluster, "cluster")?;
    let program_id = fixed::<32>(program_id32, "program id")?;
    let ctx = key_context(epoch, cluster, &program_id, binding)?;
    let seed64 = Zeroizing::new(mnemonic_to_seed64(mnemonic).map_err(|e| e.to_string())?);
    let key = epoch_key(&seed64, epoch, &ctx).map_err(|e| e.to_string())?;
    Ok(key.root())
}

/// \`vault_id = SHA-256("BUNKER/vault-id/v1" ‖ root48 ‖ options)\` (32 bytes).
#[wasm_bindgen]
pub fn vault_id(root48: &[u8], options: &[u8]) -> Result<Vec<u8>, JsError> {
    let root = fixed::<ROOT_LEN>(root48, "root").map_err(js_err)?;
    bunker_core::decode_options(options).map_err(js_err)?;
    Ok(bunker_core::vault_id::<Sha2Hasher>(&root, options).to_vec())
}

/// \`options_v1\` for an optional cosigner (pass an empty array for "no cosigner").
#[wasm_bindgen]
pub fn encode_options(cosigner32_or_empty: &[u8]) -> Result<Vec<u8>, JsError> {
    match cosigner32_or_empty.len() {
        0 => Ok(bunker_core::encode_options(None)),
        32 => Ok(bunker_core::encode_options(Some(
            &fixed::<32>(cosigner32_or_empty, "cosigner").map_err(js_err)?,
        ))),
        n => Err(js_err(format!(
            "cosigner must be 32 bytes or empty (got {n})"
        ))),
    }
}

/// Canonical \`execute\` payload from the actions JSON:
/// \`[{"kind":"transferSol","to":"<base58>","lamports":"<decimal>"},
///   {"kind":"transferToken","mint":"…","tokenProgram":"…","destination":"…","amount":"<decimal>"},
///   {"kind":"closeTokenAccount","mint":"…","tokenProgram":"…","rentTo":"…"},
///   {"kind":"setHeir","heir":"…","inactivityDays":365},
///   {"kind":"checkIn","heir":"…","inactivityDays":365},
///   {"kind":"clearHeir","heir":"…"}]\`.
/// Validated (1..=8 actions, amounts > 0, SPL Token / Token-2022 only, heir ≠ 0, 30..=3650 days,
/// at most one heir action) before encoding.
#[wasm_bindgen]
pub fn encode_actions(actions_json: &str) -> Result<Vec<u8>, JsError> {
    let actions = json::actions_from_json(actions_json).map_err(js_err)?;
    try_encode_actions(&actions).map_err(js_err)
}

/// Strictly decode an \`execute\` payload back to the actions JSON (same shape as \`encode_actions\`).
#[wasm_bindgen]
pub fn decode_actions(payload: &[u8]) -> Result<String, JsError> {
    let actions = core_decode_actions(payload).map_err(js_err)?;
    Ok(json::actions_to_json(&actions))
}

fn payload_err(tag: IxTag, e: CoreError) -> String {
    match tag {
        IxTag::Execute => e.to_string(),
        IxTag::Rotate => "rotate payload must be a 48-byte root".into(),
        IxTag::Close => "close payload must be a 32-byte rent_to pubkey".into(),
    }
}

/// Full signed message \`M = prefix (83) ‖ payload\`. The payload is checked against the tag
/// (execute: canonical actions; rotate: 48-byte root; close: 32-byte rent_to).
#[wasm_bindgen]
pub fn message(
    cluster: f64,
    program_id32: &[u8],
    tag: f64,
    state32: &[u8],
    epoch: f64,
    leaf: f64,
    payload: &[u8],
) -> Result<Vec<u8>, JsError> {
    message_inner(cluster, program_id32, tag, state32, epoch, leaf, payload).map_err(js_err)
}

fn message_inner(
    cluster: f64,
    program_id32: &[u8],
    tag: f64,
    state32: &[u8],
    epoch: f64,
    leaf: f64,
    payload: &[u8],
) -> Result<Vec<u8>, String> {
    let cluster = u8_arg(cluster, "cluster")?;
    let tag = u8_arg(tag, "instruction tag")?;
    let epoch = u32_arg(epoch, "epoch")?;
    let leaf = leaf_arg(leaf)?;
    Cluster::try_from(cluster).map_err(|e| e.to_string())?;
    let tag = IxTag::try_from(tag).map_err(|e| e.to_string())?;
    let program_id = fixed::<32>(program_id32, "program id")?;
    let state = fixed::<32>(state32, "vault state")?;
    validate_payload(tag, payload).map_err(|e| payload_err(tag, e))?;
    let prefix = message_prefix(cluster, &program_id, tag, &state, epoch, leaf);
    let m = signed_message(&prefix, payload);
    debug_assert!(parse_signed_message(&m).is_ok());
    Ok(m)
}

/// Sign the Bunker message \`message\` with leaf \`leaf\` of \`mnemonic\`'s epoch-\`epoch\` key for
/// one vault (2,508 bytes). \`message\` must be a well-formed \`BUNKER-v1\` message whose own
/// \`root_epoch\` and \`leaf_index\` equal \`epoch\` and \`leaf\`, so the leaf a caller records is the
/// leaf that is revealed. The key is bound to the message's cluster and program id plus
/// \`binding\` (the vault's \`options_v1\` at epoch 0, its 32-byte \`vault_id\` afterwards; see
/// \`derive_root\`). \`expected_root\` is the vault's on-chain \`current_root\`: nothing is signed
/// unless the derived key is that key, so a leaf is only ever revealed by the vault that owns
/// the key (MESSAGE_FORMAT §2). Rebuilds the LMS tree, and verifies the signature before
/// returning it.
#[wasm_bindgen]
pub fn sign(
    mnemonic: String,
    epoch: f64,
    leaf: f64,
    message: &[u8],
    binding: &[u8],
    expected_root: &[u8],
) -> Result<Vec<u8>, JsError> {
    let mnemonic = Zeroizing::new(mnemonic);
    let out = sign_inner(&mnemonic, epoch, leaf, message, binding, expected_root);
    scrub_stack();
    out.map_err(js_err)
}

#[inline(never)]
fn sign_inner(
    mnemonic: &str,
    epoch: f64,
    leaf: f64,
    message: &[u8],
    binding: &[u8],
    expected_root: &[u8],
) -> Result<Vec<u8>, String> {
    let epoch = u32_arg(epoch, "epoch")?;
    let leaf = leaf_arg(leaf)?;
    let expected_root = fixed::<ROOT_LEN>(expected_root, "expected root")?;
    let m = parse_signed_message(message).map_err(|e| format!("refusing to sign: {e}"))?;
    if m.root_epoch != epoch || m.leaf_index != leaf {
        return Err(format!(
            "refusing to sign: the message is for epoch {} leaf {}, not epoch {epoch} leaf {leaf}",
            m.root_epoch, m.leaf_index
        ));
    }
    let ctx = key_context(epoch, m.cluster as u8, &m.program_id, binding)?;
    let seed64 = Zeroizing::new(mnemonic_to_seed64(mnemonic).map_err(|e| e.to_string())?);
    let key = epoch_key(&seed64, epoch, &ctx).map_err(|e| e.to_string())?;
    if key.root() != expected_root {
        return Err(
            "refusing to sign: this seed's key for this vault and epoch is not the expected root \\
             (wrong seed, vault binding or epoch)"
                .into(),
        );
    }
    let sig = key.try_sign(leaf, message).map_err(|e| e.to_string())?;
    match bunker_lms::verify::<Sha2Hasher>(&key.root(), &[message], &sig) {
        Ok(q) if q == leaf && sig.len() == SIG_LEN => Ok(sig),
        _ => Err("internal error: produced signature does not verify".into()),
    }
}

/// \`true\` iff \`sig\` is a valid signature over the well-formed Bunker message \`message\` under
/// \`root48\`, made with the leaf the message names (\`q == leaf_index\`, as the program requires).
/// Never throws.
#[wasm_bindgen]
pub fn verify(root48: &[u8], message: &[u8], sig: &[u8]) -> bool {
    let Ok(root) = <[u8; ROOT_LEN]>::try_from(root48) else {
        return false;
    };
    let Ok(m) = parse_signed_message(message) else {
        return false;
    };
    bunker_lms::verify::<Sha2Hasher>(&root, &[message], sig) == Ok(m.leaf_index)
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn integer_arguments_are_checked() {
        assert_eq!(int_arg(0.0, u32::MAX, "x"), Ok(0));
        assert_eq!(int_arg(-0.0, u32::MAX, "x"), Ok(0));
        assert_eq!(int_arg(4294967295.0, u32::MAX, "x"), Ok(u32::MAX));
        assert_eq!(int_arg(255.0, 255, "x"), Ok(255));
        for bad in [
            f64::NAN,
            f64::INFINITY,
            f64::NEG_INFINITY,
            -1.0,
            5.9,
            0.5,
            4294967296.0,
            4294967301.0,
        ] {
            assert!(int_arg(bad, u32::MAX, "x").is_err(), "{bad}");
        }
        assert!(int_arg(256.0, 255, "cluster").is_err());
        assert!(int_arg(257.0, 255, "cluster").is_err());
    }

    const SIGS: &str = include_str!("../../bunker-core/vectors/signatures.json");
    const KEYS: &str = include_str!("../../bunker-core/vectors/keys.json");

    fn unhex(s: &str) -> Vec<u8> {
        (0..s.len())
            .step_by(2)
            .map(|i| u8::from_str_radix(&s[i..i + 2], 16).unwrap())
            .collect()
    }

    fn vectors() -> (String, Vec<serde_json::Value>) {
        let keys: serde_json::Value = serde_json::from_str(KEYS).unwrap();
        let sigs: serde_json::Value = serde_json::from_str(SIGS).unwrap();
        (
            keys["mnemonic"].as_str().unwrap().into(),
            sigs["signatures"].as_array().unwrap().clone(),
        )
    }

    /// Regression for "WASM sign() does not check that the epoch and leaf arguments match the
    /// message": the leaf that is revealed is always the leaf the message (and hence the
    /// caller's ledger entry) names, and only Bunker messages are signed.
    #[test]
    fn sign_refuses_messages_that_disagree_with_its_arguments() {
        let (mn, sigs) = vectors();
        let s = &sigs[0]; // execute, epoch 0, leaf 0, localnet
        let msg = unhex(s["message"].as_str().unwrap());
        let binding = unhex(s["binding"].as_str().unwrap());
        let root = unhex(s["root"].as_str().unwrap());
        // Consistent arguments reproduce the golden signature.
        let sig = sign_inner(&mn, 0.0, 0.0, &msg, &binding, &root).unwrap();
        assert_eq!(sig, unhex(s["signature"].as_str().unwrap()));
        // Leaf / epoch mismatches: previously signed with the argument's leaf (q = 5).
        let e = sign_inner(&mn, 0.0, 5.0, &msg, &binding, &root).unwrap_err();
        assert!(e.contains("epoch 0 leaf 0, not epoch 0 leaf 5"), "{e}");
        let e = sign_inner(&mn, 1.0, 0.0, &msg, &[7u8; 32], &root).unwrap_err();
        assert!(e.contains("not epoch 1 leaf 0"), "{e}");
        // Not a Bunker message: previously any bytes were signed.
        for junk in [&b"hello"[..], &[], &msg[..82], &[0u8; 200]] {
            let e = sign_inner(&mn, 0.0, 0.0, junk, &binding, &root).unwrap_err();
            assert!(e.starts_with("refusing to sign"), "{e}");
        }
        let mut bad_payload = msg.clone();
        bad_payload.push(0);
        assert!(sign_inner(&mn, 0.0, 0.0, &bad_payload, &binding, &root).is_err());
        // Coerced numbers never select another leaf.
        for leaf in [f64::NAN, 0.5, 4294967296.0, -1.0, 1024.0] {
            assert!(
                sign_inner(&mn, 0.0, leaf, &msg, &binding, &root).is_err(),
                "{leaf}"
            );
        }
        // Wrong binding shape for the epoch.
        assert!(sign_inner(&mn, 0.0, 0.0, &msg, &[9u8; 32], &root).is_err());
        // The key must be the vault's key: another vault's binding (here the same seed with a
        // cosigner) derives a different key, so nothing is signed for this message's vault.
        let mut other = vec![1u8, 1];
        other.extend_from_slice(&[7u8; 32]);
        let e = sign_inner(&mn, 0.0, 0.0, &msg, &other, &root).unwrap_err();
        assert!(e.contains("not the expected root"), "{e}");
        let mut wrong_root = root.clone();
        wrong_root[47] ^= 1;
        let e = sign_inner(&mn, 0.0, 0.0, &msg, &binding, &wrong_root).unwrap_err();
        assert!(e.contains("not the expected root"), "{e}");
        assert!(sign_inner(&mn, 0.0, 0.0, &msg, &binding, &root[..47]).is_err());
    }

    #[test]
    fn sign_and_derive_root_match_the_golden_vectors() {
        let (mn, sigs) = vectors();
        let keys: serde_json::Value = serde_json::from_str(KEYS).unwrap();
        let program = unhex("0f27b4eeb3548d7c5387c06dd565ea63ebec951de3618aff9286f32c837ac907");
        for s in &sigs {
            let msg = unhex(s["message"].as_str().unwrap());
            let binding = unhex(s["binding"].as_str().unwrap());
            let epoch = s["epoch"].as_f64().unwrap();
            let leaf = s["leaf_index"].as_f64().unwrap();
            let root = unhex(s["root"].as_str().unwrap());
            let sig = sign_inner(&mn, epoch, leaf, &msg, &binding, &root).unwrap();
            assert_eq!(sig, unhex(s["signature"].as_str().unwrap()));
            assert!(verify(&root, &msg, &sig));
            // The key is bound to the message's cluster + program and to the binding.
            let cluster = s["cluster"].as_f64().unwrap();
            let derived = derive_root_inner(&mn, epoch, cluster, &msg[10..42], &binding).unwrap();
            assert_eq!(derived.to_vec(), root);
            assert_eq!(&msg[10..42], &program[..]);
        }
        for e in keys["epochs"].as_array().unwrap() {
            let root = derive_root_inner(
                &mn,
                e["epoch"].as_f64().unwrap(),
                e["cluster"].as_f64().unwrap(),
                &program,
                &unhex(e["binding"].as_str().unwrap()),
            )
            .unwrap();
            assert_eq!(root.to_vec(), unhex(e["root"].as_str().unwrap()));
        }
        assert!(derive_root_inner(&mn, 0.0, 9.0, &program, &[1, 0]).is_err());
        assert!(derive_root_inner(&mn, 1.0, 1.0, &program, &[1, 0]).is_err());
        assert!(derive_root_inner(&mn, f64::NAN, 1.0, &program, &[1, 0]).is_err());
        assert!(derive_root_inner(&mn, 0.0, 1.0, &program[..31], &[1, 0]).is_err());
    }

    #[test]
    fn verify_requires_a_bunker_message_and_the_named_leaf() {
        let (_, sigs) = vectors();
        let s = &sigs[0];
        let root = unhex(s["root"].as_str().unwrap());
        let msg = unhex(s["message"].as_str().unwrap());
        let sig = unhex(s["signature"].as_str().unwrap());
        assert!(verify(&root, &msg, &sig));
        assert!(!verify(&root, &[], &sig));
        assert!(!verify(&root, b"hello", &sig));
        // Same bytes, but the message now names leaf 1 while the signature uses q = 0.
        let mut other_leaf = msg.clone();
        other_leaf[79] = 1;
        assert!(!verify(&root, &other_leaf, &sig));
    }

    #[test]
    fn message_rejects_coerced_numbers() {
        let (_, sigs) = vectors();
        let msg = unhex(sigs[0]["message"].as_str().unwrap());
        let (p, st, payload) = (&msg[10..42], &msg[43..75], &msg[83..]);
        assert_eq!(
            message_inner(1.0, p, 1.0, st, 0.0, 0.0, payload).unwrap(),
            msg
        );
        for (c, t, e, l) in [
            (257.0, 1.0, 0.0, 0.0),
            (260.0, 1.0, 0.0, 0.0),
            (1.0, 257.0, 0.0, 0.0),
            (1.0, 1.0, 4294967297.0, 0.0),
            (1.0, 1.0, -1.0, 0.0),
            (1.0, 1.0, 0.0, 4294967301.0),
            (1.0, 1.0, 0.0, f64::NAN),
            (1.0, 1.0, 0.0, 5.9),
            (f64::NAN, 1.0, 0.0, 0.0),
        ] {
            assert!(
                message_inner(c, p, t, st, e, l, payload).is_err(),
                "{c} {t} {e} {l}"
            );
        }
    }

    #[test]
    fn entropy_heuristic() {
        let fresh: [u8; 32] = core::array::from_fn(|i| (i as u8).wrapping_mul(37));
        assert!(!entropy_looks_broken(&fresh));
        assert!(entropy_looks_broken(&[0; 32]));
        assert!(entropy_looks_broken(&[0x7f; 32]));
        // A hex string coerced per character by the glue: digits stay, letters become 0.
        let mut hexish = [0u8; 32];
        for (i, c) in "9f86d081884c7d659a2feaa0c55ad015".bytes().enumerate() {
            hexish[i] = if c.is_ascii_digit() { c - b'0' } else { 0 };
        }
        assert!(entropy_looks_broken(&hexish));
    }
}
`;export{e as default};