//! Attacks that must fail. Every test also checks that a rejected transaction leaves
//! `next_leaf` (and the funds) untouched where relevant.

use anchor_lang::error::ErrorCode as AnchorError;
use bunker::errors::VaultError;
use bunker_core::{encode_actions, IxTag};
use solana_address::Address;
use solana_instruction::AccountMeta;
use solana_signer::Signer;

use crate::common::*;

/// Opened vault (key A, epoch 0) with `sol` lamports in the wallet.
fn setup(sol_in_wallet: u64) -> (Env, Vault) {
    let mut env = Env::new();
    let v = Vault::new(key_a0().root(), None);
    env.open(&v);
    if sol_in_wallet > 0 {
        env.transfer_sol(&v.wallet, sol_in_wallet);
    }
    (env, v)
}

fn assert_untouched(env: &Env, v: &Vault, next_leaf: u32) {
    assert_eq!(env.state(v).next_leaf, next_leaf);
}

// ---- replay and leaf rules ---------------------------------------------------------------------

#[test]
fn replaying_the_same_transaction_fails() {
    let (mut env, v) = setup(3 * LAMPORTS_PER_SOL);
    let to = new_keypair().pubkey();
    let actions = [sol(&to, LAMPORTS_PER_SOL)];
    let payload = encode_actions(&actions);
    let sig = sign_execute(key_a0(), &v, 0, 0, &payload);
    let ix = execute_ix(&env.payer_pk(), &v, Opt::default(), 0, &payload, Some(&sig), remaining_for(&v.wallet, &actions));
    let payer = env.payer.insecure_clone();
    let tx = env.build_tx(&payer, &[ix.clone()], &[], TEST_CU_LIMIT);
    unwrap_ok(env.send_tx(tx.clone()));
    // Byte-identical transaction: rejected by the runtime.
    unwrap_err(env.send_tx(tx));
    // Same instruction in a fresh transaction: rejected by the program.
    expect_code(env.send(&[ix], &[]), vault_err(VaultError::LeafAlreadyUsed));
    assert_eq!(env.lamports(&to), LAMPORTS_PER_SOL);
    assert_untouched(&env, &v, 1);
}

#[test]
fn leaf_below_next_leaf_fails() {
    let (mut env, v) = setup(3 * LAMPORTS_PER_SOL);
    let to = new_keypair().pubkey();
    env.execute_ok(&v, key_a0(), 10, &[sol(&to, 1_000_000)]);
    for leaf in [0, 9, 10] {
        expect_code(
            env.execute_inline(&v, key_a0(), leaf, &[sol(&to, 1_000_000)], &[], Opt::default()),
            vault_err(VaultError::LeafAlreadyUsed),
        );
    }
    assert_untouched(&env, &v, 11);
}

#[test]
fn leaf_at_or_above_tree_size_fails() {
    let (mut env, v) = setup(LAMPORTS_PER_SOL);
    let to = new_keypair().pubkey();
    let actions = [sol(&to, 1_000_000)];
    let payload = encode_actions(&actions);
    // A real signature for leaf 1023 presented as leaf 1024 / u32::MAX.
    let sig = sign_execute(key_a0(), &v, 0, 1023, &payload);
    for leaf in [1024u32, 1025, u32::MAX] {
        let ix = execute_ix(&env.payer_pk(), &v, Opt::default(), leaf, &payload, Some(&sig), remaining_for(&v.wallet, &actions));
        expect_code(env.send(&[ix], &[]), vault_err(VaultError::LeafOutOfRange));
    }
    // A signature whose q field claims 1024 (cannot be produced honestly).
    let mut forged = sig.clone();
    forged[..4].copy_from_slice(&1024u32.to_be_bytes());
    let ix = execute_ix(&env.payer_pk(), &v, Opt::default(), 1024, &payload, Some(&forged), remaining_for(&v.wallet, &actions));
    expect_code(env.send(&[ix], &[]), vault_err(VaultError::LeafOutOfRange));
    assert_untouched(&env, &v, 0);
}

#[test]
fn signature_leaf_must_equal_leaf_index() {
    let (mut env, v) = setup(LAMPORTS_PER_SOL);
    let to = new_keypair().pubkey();
    let actions = [sol(&to, 1_000_000)];
    let payload = encode_actions(&actions);
    // Signature made with leaf 4 over a message that says leaf 3.
    let msg = message(LOCALNET, &PROGRAM_ID, IxTag::Execute, &v.state, 0, 3, &payload);
    let sig = key_a0().sign(4, &msg);
    for leaf in [3u32, 4] {
        let ix = execute_ix(&env.payer_pk(), &v, Opt::default(), leaf, &payload, Some(&sig), remaining_for(&v.wallet, &actions));
        let code = if leaf == 3 { VaultError::LeafMismatch } else { VaultError::InvalidSignature };
        expect_code(env.send(&[ix], &[]), vault_err(code));
    }
    assert_untouched(&env, &v, 0);
}

// ---- message binding: sign one thing, submit another --------------------------------------------

#[test]
fn every_payload_byte_is_bound() {
    let (mut env, v) = setup(3 * LAMPORTS_PER_SOL);
    let tm = create_mint(&mut env, SPL_TOKEN, MintKind::Plain, 6, 1_000_000);
    let vault_ata = deposit_tokens(&mut env, &v, &tm, 1_000_000);
    let user = new_keypair().pubkey();
    let user_ata = create_ata(&mut env, &user, &tm);
    let actions = [
        sol(&user, LAMPORTS_PER_SOL),
        token(&tm.mint, &SPL_TOKEN, &user_ata, 1_000_000),
        close_ata(&tm.mint, &SPL_TOKEN, &user),
    ];
    let payload = encode_actions(&actions);
    let sig = sign_execute(key_a0(), &v, 0, 0, &payload);
    let remaining = remaining_for(&v.wallet, &actions);

    // Flip every byte of the payload (keeping the honest accounts).
    let mut failures = 0;
    for i in 0..payload.len() {
        let mut p = payload.clone();
        p[i] ^= 0x01;
        let ix = execute_ix(&env.payer_pk(), &v, Opt::default(), 0, &p, Some(&sig), remaining.clone());
        let e = unwrap_err(env.send(&[ix], &[]));
        let code = custom_code(&e);
        assert!(
            code == Some(vault_err(VaultError::InvalidSignature)) || code == Some(vault_err(VaultError::InvalidPayload)),
            "byte {i}: {:?}",
            e.err
        );
        failures += 1;
    }
    assert_eq!(failures, payload.len());

    // Substitute a different (consistent) action list: other destination, other amount.
    let attacker = new_keypair().pubkey();
    let attacker_ata = create_ata(&mut env, &attacker, &tm);
    for evil in [
        vec![sol(&attacker, LAMPORTS_PER_SOL), token(&tm.mint, &SPL_TOKEN, &user_ata, 1_000_000), close_ata(&tm.mint, &SPL_TOKEN, &user)],
        vec![sol(&user, LAMPORTS_PER_SOL), token(&tm.mint, &SPL_TOKEN, &attacker_ata, 1_000_000), close_ata(&tm.mint, &SPL_TOKEN, &user)],
        vec![sol(&user, LAMPORTS_PER_SOL + 1), token(&tm.mint, &SPL_TOKEN, &user_ata, 1_000_000), close_ata(&tm.mint, &SPL_TOKEN, &user)],
        vec![sol(&user, LAMPORTS_PER_SOL), token(&tm.mint, &SPL_TOKEN, &user_ata, 999_999), close_ata(&tm.mint, &SPL_TOKEN, &user)],
        vec![sol(&user, LAMPORTS_PER_SOL), token(&tm.mint, &SPL_TOKEN, &user_ata, 1_000_000), close_ata(&tm.mint, &SPL_TOKEN, &attacker)],
        vec![sol(&user, LAMPORTS_PER_SOL), token(&tm.mint, &SPL_TOKEN, &user_ata, 1_000_000)],
        vec![sol(&user, LAMPORTS_PER_SOL)],
    ] {
        let p = encode_actions(&evil);
        let ix = execute_ix(&env.payer_pk(), &v, Opt::default(), 0, &p, Some(&sig), remaining_for(&v.wallet, &evil));
        expect_code(env.send(&[ix], &[]), vault_err(VaultError::InvalidSignature));
    }

    // Honest payload, but a remaining account swapped for the attacker's.
    for slot in [0usize, 4, 7] {
        let mut r = remaining.clone();
        r[slot] = AccountMeta::new(if slot == 4 { attacker_ata } else { attacker }, false);
        let ix = execute_ix(&env.payer_pk(), &v, Opt::default(), 0, &payload, Some(&sig), r);
        expect_code(env.send(&[ix], &[]), vault_err(VaultError::AccountMismatch));
    }

    assert_untouched(&env, &v, 0);
    assert_eq!(token_amount(&env, &vault_ata), 1_000_000);
    // And the honest submission still works afterwards.
    let ix = execute_ix(&env.payer_pk(), &v, Opt::default(), 0, &payload, Some(&sig), remaining);
    env.send_ok(&[ix], &[]);
    assert_eq!(token_amount(&env, &user_ata), 1_000_000);
    assert!(env.account(&vault_ata).is_none());
}

#[test]
fn prefix_fields_are_bound() {
    let (mut env, v) = setup(3 * LAMPORTS_PER_SOL);
    let other = Vault::new(key_a0().root(), Some(new_keypair().pubkey()));
    let to = new_keypair().pubkey();
    let actions = [sol(&to, LAMPORTS_PER_SOL)];
    let payload = encode_actions(&actions);
    let remaining = remaining_for(&v.wallet, &actions);
    let other_program = Address::new_unique();

    let cases: Vec<(&str, Vec<u8>)> = vec![
        ("cluster id (devnet)", message(DEVNET, &PROGRAM_ID, IxTag::Execute, &v.state, 0, 0, &payload)),
        ("cluster id (mainnet)", message(4, &PROGRAM_ID, IxTag::Execute, &v.state, 0, 0, &payload)),
        ("program id", message(LOCALNET, &other_program, IxTag::Execute, &v.state, 0, 0, &payload)),
        ("instruction tag rotate", message(LOCALNET, &PROGRAM_ID, IxTag::Rotate, &v.state, 0, 0, &payload)),
        ("instruction tag close", message(LOCALNET, &PROGRAM_ID, IxTag::Close, &v.state, 0, 0, &payload)),
        ("vault state", message(LOCALNET, &PROGRAM_ID, IxTag::Execute, &other.state, 0, 0, &payload)),
        ("root epoch", message(LOCALNET, &PROGRAM_ID, IxTag::Execute, &v.state, 1, 0, &payload)),
        ("leaf in prefix", message(LOCALNET, &PROGRAM_ID, IxTag::Execute, &v.state, 0, 1, &payload)),
    ];
    for (what, msg) in cases {
        let sig = key_a0().sign(0, &msg);
        let ix = execute_ix(&env.payer_pk(), &v, Opt::default(), 0, &payload, Some(&sig), remaining.clone());
        let e = unwrap_err(env.send(&[ix], &[]));
        assert_eq!(custom_code(&e), Some(vault_err(VaultError::InvalidSignature)), "{what}");
    }

    assert_untouched(&env, &v, 0);

    // A rotate signature (tag 2) cannot be used as a close (tag 3) and vice versa, even when the
    // payload bytes line up.
    let (mut env, v) = setup(0);
    let rent_to = env.payer_pk();
    let mut root_like = [0u8; 48];
    root_like[..32].copy_from_slice(rent_to.as_ref());
    let rotate_sig = sign_rotate(key_a0(), &v, 0, 0, &root_like);
    expect_code(
        env.send(&[close_vault_ix(&env.payer_pk(), &v, Opt::default(), 0, &rent_to, Some(&rotate_sig))], &[]),
        vault_err(VaultError::InvalidSignature),
    );
    let close_sig = sign_close(key_a0(), &v, 0, 0, &rent_to);
    let ix = rotate_ix(&env.payer_pk(), &v, Opt::default(), 0, &root_like, Some(&close_sig));
    expect_code(env.send(&[ix], &[]), vault_err(VaultError::InvalidSignature));
    // An execute signature over the same bytes as a close payload.
    let exec_sig = sign_for(key_a0(), IxTag::Execute, &v.state, 0, 0, rent_to.as_ref());
    expect_code(
        env.send(&[close_vault_ix(&env.payer_pk(), &v, Opt::default(), 0, &rent_to, Some(&exec_sig))], &[]),
        vault_err(VaultError::InvalidSignature),
    );
    assert_untouched(&env, &v, 0);
}

#[test]
fn vault_a_signature_on_vault_b_fails() {
    let mut env = Env::new();
    // Same LMS root, different options => different vault (worst case: only the state address
    // in the message separates them).
    let cos = env.new_funded_keypair(LAMPORTS_PER_SOL);
    let a = Vault::new(key_a0().root(), None);
    let b = Vault::new(key_a0().root(), Some(cos.pubkey()));
    env.open(&a);
    env.open(&b);
    env.transfer_sol(&a.wallet, 2 * LAMPORTS_PER_SOL);
    env.transfer_sol(&b.wallet, 2 * LAMPORTS_PER_SOL);
    let to = new_keypair().pubkey();
    let actions = [sol(&to, LAMPORTS_PER_SOL)];
    let payload = encode_actions(&actions);

    let sig_a = sign_execute(key_a0(), &a, 0, 0, &payload);
    let ix = execute_ix(&env.payer_pk(), &b, Opt::cosigner(cos.pubkey()), 0, &payload, Some(&sig_a), remaining_for(&b.wallet, &actions));
    expect_code(env.send(&[ix], &[&cos]), vault_err(VaultError::InvalidSignature));

    // Vault A's signature with vault B's wallet/state accounts mixed in.
    let ix = execute_ix_raw(&env.payer_pk(), &a.state, &b.wallet, Opt::default(), 0, &payload, Some(&sig_a), remaining_for(&b.wallet, &actions));
    expect_code(env.send(&[ix], &[]), vault_err(VaultError::InvalidWalletPda));

    // A vault with an unrelated root rejects key A's signatures too.
    let c = Vault::new(key_b0().root(), None);
    env.open(&c);
    env.transfer_sol(&c.wallet, 2 * LAMPORTS_PER_SOL);
    let sig = sign_execute(key_a0(), &c, 0, 0, &payload);
    let ix = execute_ix(&env.payer_pk(), &c, Opt::default(), 0, &payload, Some(&sig), remaining_for(&c.wallet, &actions));
    expect_code(env.send(&[ix], &[]), vault_err(VaultError::InvalidSignature));

    assert_eq!(env.lamports(&to), 0);
    assert_untouched(&env, &a, 0);
    assert_untouched(&env, &b, 0);
    assert_untouched(&env, &c, 0);
}

#[test]
fn tampered_signatures_fail() {
    let (mut env, v) = setup(2 * LAMPORTS_PER_SOL);
    let to = new_keypair().pubkey();
    let actions = [sol(&to, LAMPORTS_PER_SOL)];
    let payload = encode_actions(&actions);
    let sig = sign_execute(key_a0(), &v, 0, 0, &payload);
    let remaining = remaining_for(&v.wallet, &actions);
    let send = |env: &mut Env, s: &[u8]| {
        let ix = execute_ix(&env.payer_pk(), &v, Opt::default(), 0, &payload, Some(s), remaining.clone());
        env.send(&[ix], &[])
    };
    // Wrong auth path (every path node), wrong y values, wrong C, wrong type codes.
    let path_start = 2508 - 320;
    for pos in (0..10).map(|i| path_start + i * 32 + 7).chain([40 + 3, 40 + 66 * 32 + 31, 8, 39, 4, 7, 4 + 4 + 32 + 67 * 32 + 3]) {
        let mut s = sig.clone();
        s[pos] ^= 0x80;
        expect_code(send(&mut env, &s), vault_err(VaultError::InvalidSignature));
    }
    // A valid signature for another vault's auth path (key B) spliced in.
    let other = sign_execute(key_b0(), &v, 0, 0, &payload);
    let mut s = sig.clone();
    s[path_start..].copy_from_slice(&other[path_start..]);
    expect_code(send(&mut env, &s), vault_err(VaultError::InvalidSignature));
    // Wrong lengths.
    expect_code(send(&mut env, &sig[..2507]), vault_err(VaultError::InvalidSignatureLength));
    let mut long = sig.clone();
    long.push(0);
    expect_code(send(&mut env, &long), vault_err(VaultError::InvalidSignatureLength));
    expect_code(send(&mut env, &[]), vault_err(VaultError::InvalidSignatureLength));
    // Whole-signature-from-another-key.
    expect_code(send(&mut env, &other), vault_err(VaultError::InvalidSignature));
    assert_untouched(&env, &v, 0);
    unwrap_ok(send(&mut env, &sig));
}

// ---- account substitution ------------------------------------------------------------------------

#[test]
fn destination_with_wrong_mint_fails() {
    let (mut env, v) = setup(0);
    let a = create_mint(&mut env, SPL_TOKEN, MintKind::Plain, 6, 1_000_000);
    let b = create_mint(&mut env, SPL_TOKEN, MintKind::Plain, 6, 1_000_000);
    deposit_tokens(&mut env, &v, &a, 1_000_000);
    let user = new_keypair().pubkey();
    let wrong = create_ata(&mut env, &user, &b);
    expect_code(
        env.execute_inline(&v, key_a0(), 0, &[token(&a.mint, &SPL_TOKEN, &wrong, 1)], &[], Opt::default()),
        vault_err(VaultError::DestinationMintMismatch),
    );
    // A destination that is not a token account at all.
    expect_code(
        env.execute_inline(&v, key_a0(), 0, &[token(&a.mint, &SPL_TOKEN, &env.payer_pk(), 1)], &[], Opt::default()),
        vault_err(VaultError::InvalidDestination),
    );
    assert_untouched(&env, &v, 0);
}

#[test]
fn destination_equal_to_vault_ata_fails() {
    let (mut env, v) = setup(0);
    let tm = create_mint(&mut env, SPL_TOKEN, MintKind::Plain, 6, 1_000_000);
    let vault_ata = deposit_tokens(&mut env, &v, &tm, 1_000_000);
    expect_code(
        env.execute_inline(&v, key_a0(), 0, &[token(&tm.mint, &SPL_TOKEN, &vault_ata, 1)], &[], Opt::default()),
        vault_err(VaultError::DestinationIsSource),
    );
    assert_untouched(&env, &v, 0);
}

#[test]
fn fake_token_program_fails() {
    let (mut env, v) = setup(0);
    let tm = create_mint(&mut env, SPL_TOKEN, MintKind::Plain, 6, 1_000_000);
    deposit_tokens(&mut env, &v, &tm, 1_000_000);
    let (_, dest) = new_destination(&mut env, &tm);

    // 1. A signed payload naming an unknown token program is not a valid payload at all.
    let fake = Address::new_unique();
    let actions = [token(&tm.mint, &fake, &dest, 1)];
    let payload = encode_actions(&actions);
    let sig = sign_execute(key_a0(), &v, 0, 0, &payload);
    let ix = execute_ix(&env.payer_pk(), &v, Opt::default(), 0, &payload, Some(&sig), remaining_for(&v.wallet, &actions));
    expect_code(env.send(&[ix], &[]), vault_err(VaultError::InvalidPayload));

    // 2. Honest payload (SPL Token), but another program in the token-program slot.
    let actions = [token(&tm.mint, &SPL_TOKEN, &dest, 1)];
    let payload = encode_actions(&actions);
    let sig = sign_execute(key_a0(), &v, 0, 0, &payload);
    for substitute in [MEMO_PROGRAM, TOKEN_2022, SYSTEM_PROGRAM] {
        let mut r = remaining_for(&v.wallet, &actions);
        r[0] = AccountMeta::new_readonly(substitute, false);
        let ix = execute_ix(&env.payer_pk(), &v, Opt::default(), 0, &payload, Some(&sig), r);
        expect_code(env.send(&[ix], &[]), vault_err(VaultError::AccountMismatch));
    }

    // 3. Close action with a substituted program.
    let actions = [close_ata(&tm.mint, &SPL_TOKEN, &env.payer_pk())];
    let payload = encode_actions(&actions);
    let sig = sign_execute(key_a0(), &v, 0, 0, &payload);
    let mut r = remaining_for(&v.wallet, &actions);
    r[0] = AccountMeta::new_readonly(MEMO_PROGRAM, false);
    let ix = execute_ix(&env.payer_pk(), &v, Opt::default(), 0, &payload, Some(&sig), r);
    expect_code(env.send(&[ix], &[]), vault_err(VaultError::AccountMismatch));
    assert_untouched(&env, &v, 0);
}

#[test]
fn mint_owned_by_the_other_token_program_fails() {
    let (mut env, v) = setup(0);
    let t22 = create_mint(&mut env, TOKEN_2022, MintKind::Plain, 6, 1_000_000);
    deposit_tokens(&mut env, &v, &t22, 1_000_000);
    let (_, dest) = new_destination(&mut env, &t22);
    // Signed as SPL Token while the mint lives under Token-2022.
    let actions = [token(&t22.mint, &SPL_TOKEN, &dest, 1)];
    expect_code(
        env.execute_inline(&v, key_a0(), 0, &actions, &[], Opt::default()),
        vault_err(VaultError::InvalidMintOwner),
    );
    // And the reverse.
    let spl = create_mint(&mut env, SPL_TOKEN, MintKind::Plain, 6, 1_000_000);
    deposit_tokens(&mut env, &v, &spl, 1_000_000);
    let (_, dest) = new_destination(&mut env, &spl);
    expect_code(
        env.execute_inline(&v, key_a0(), 0, &[token(&spl.mint, &TOKEN_2022, &dest, 1)], &[], Opt::default()),
        vault_err(VaultError::InvalidMintOwner),
    );
    assert_untouched(&env, &v, 0);
}

#[test]
fn source_must_be_the_canonical_ata() {
    let (mut env, v) = setup(0);
    let tm = create_mint(&mut env, SPL_TOKEN, MintKind::Plain, 6, 1_000_000);
    deposit_tokens(&mut env, &v, &tm, 500_000);
    // A second, non-ATA token account owned by the wallet.
    let side = new_keypair();
    let rent = env.svm.minimum_balance_for_rent_exemption(165);
    let ixs = [
        solana_system_interface::instruction::create_account(&env.payer_pk(), &side.pubkey(), rent, 165, &SPL_TOKEN),
        spl_token_2022_interface::instruction::initialize_account3(&SPL_TOKEN, &side.pubkey(), &tm.mint, &v.wallet).unwrap(),
    ];
    env.send_ok(&ixs, &[&side]);
    transfer_tokens(&mut env, &tm, &side.pubkey(), 500_000);
    let (_, dest) = new_destination(&mut env, &tm);
    let actions = [token(&tm.mint, &SPL_TOKEN, &dest, 1)];
    let payload = encode_actions(&actions);
    let sig = sign_execute(key_a0(), &v, 0, 0, &payload);
    let mut r = remaining_for(&v.wallet, &actions);
    r[2] = AccountMeta::new(side.pubkey(), false);
    let ix = execute_ix(&env.payer_pk(), &v, Opt::default(), 0, &payload, Some(&sig), r);
    expect_code(env.send(&[ix], &[]), vault_err(VaultError::InvalidSourceAccount));
    assert_untouched(&env, &v, 0);
}

#[test]
fn aliasing_wallet_state_or_buffer_fails() {
    let (mut env, v) = setup(2 * LAMPORTS_PER_SOL);
    for to in [v.wallet, v.state] {
        expect_code(
            env.execute_inline(&v, key_a0(), 0, &[sol(&to, 1_000_000)], &[], Opt::default()),
            vault_err(VaultError::AliasedAccount),
        );
    }
    // SOL to the signature buffer that carries this very signature.
    let p = env.payer.insecure_clone();
    let buffer = sig_buffer_address(&v.state, &p.pubkey(), 0, 0);
    let actions = [sol(&buffer, 1_000_000)];
    let payload = encode_actions(&actions);
    let sig = sign_execute(key_a0(), &v, 0, 0, &payload);
    env.upload_sig(&p, &v.state, 0, 0, &sig);
    let ix = execute_ix(&p.pubkey(), &v, Opt::buffer(buffer), 0, &payload, None, remaining_for(&v.wallet, &actions));
    expect_code(env.send(&[ix], &[]), vault_err(VaultError::AliasedAccount));
    // CloseTokenAccount rent to the wallet / state.
    let tm = create_mint(&mut env, SPL_TOKEN, MintKind::Plain, 6, 1);
    create_ata(&mut env, &v.wallet, &tm);
    for rent_to in [v.wallet, v.state] {
        expect_code(
            env.execute_inline(&v, key_a0(), 1, &[close_ata(&tm.mint, &SPL_TOKEN, &rent_to)], &[], Opt::default()),
            vault_err(VaultError::AliasedAccount),
        );
    }
    assert_untouched(&env, &v, 0);
}

#[test]
fn remaining_account_count_must_match() {
    let (mut env, v) = setup(2 * LAMPORTS_PER_SOL);
    let to = new_keypair().pubkey();
    let actions = [sol(&to, 1_000_000)];
    let payload = encode_actions(&actions);
    let sig = sign_execute(key_a0(), &v, 0, 0, &payload);
    let mut extra = remaining_for(&v.wallet, &actions);
    extra.push(AccountMeta::new(new_keypair().pubkey(), false));
    let ix = execute_ix(&env.payer_pk(), &v, Opt::default(), 0, &payload, Some(&sig), extra);
    expect_code(env.send(&[ix], &[]), vault_err(VaultError::TooManyAccounts));
    let ix = execute_ix(&env.payer_pk(), &v, Opt::default(), 0, &payload, Some(&sig), vec![]);
    expect_code(env.send(&[ix], &[]), vault_err(VaultError::NotEnoughAccounts));
    // Destination passed read-only.
    let ix = execute_ix(&env.payer_pk(), &v, Opt::default(), 0, &payload, Some(&sig), vec![AccountMeta::new_readonly(to, false)]);
    expect_code(env.send(&[ix], &[]), vault_err(VaultError::AccountNotWritable));
    assert_untouched(&env, &v, 0);
}

#[test]
fn fake_state_or_wallet_fails() {
    let (mut env, v) = setup(2 * LAMPORTS_PER_SOL);
    let to = new_keypair().pubkey();
    let actions = [sol(&to, 1_000_000)];
    let payload = encode_actions(&actions);
    let sig = sign_execute(key_a0(), &v, 0, 0, &payload);
    let r = remaining_for(&v.wallet, &actions);

    // A copy of the real state at another address, owned by the program (forged account data).
    let forged = Address::new_unique();
    let mut acc = env.svm.get_account(&v.state).unwrap();
    acc.data[8 + 3 + 32 + 48 + 4..][..4].copy_from_slice(&0u32.to_le_bytes());
    env.svm.set_account(forged, acc.clone()).unwrap();
    let ix = execute_ix_raw(&env.payer_pk(), &forged, &v.wallet, Opt::default(), 0, &payload, Some(&sig), r.clone());
    expect_code(env.send(&[ix], &[]), vault_err(VaultError::InvalidStatePda));
    // Same data owned by another program.
    acc.owner = SYSTEM_PROGRAM;
    env.svm.set_account(forged, acc).unwrap();
    let ix = execute_ix_raw(&env.payer_pk(), &forged, &v.wallet, Opt::default(), 0, &payload, Some(&sig), r.clone());
    expect_code(env.send(&[ix], &[]), vault_err(VaultError::InvalidVaultAccount));
    // A signature buffer passed as the state.
    let p = env.payer_pk();
    env.send_ok(&[init_sig_buffer_ix(&p, &v.state, 0, 0)], &[]);
    let buf = sig_buffer_address(&v.state, &p, 0, 0);
    let ix = execute_ix_raw(&env.payer_pk(), &buf, &v.wallet, Opt::default(), 0, &payload, Some(&sig), r.clone());
    expect_code(env.send(&[ix], &[]), vault_err(VaultError::InvalidVaultAccount));
    // Wrong wallet.
    let ix = execute_ix_raw(&env.payer_pk(), &v.state, &to, Opt::default(), 0, &payload, Some(&sig), r);
    expect_code(env.send(&[ix], &[]), vault_err(VaultError::InvalidWalletPda));
    assert_untouched(&env, &v, 0);
}

// ---- SOL rules ---------------------------------------------------------------------------------

#[test]
fn sol_transfer_leaving_wallet_below_rent_fails() {
    let (mut env, v) = setup(2 * LAMPORTS_PER_SOL);
    let to = new_keypair().pubkey();
    for left in [1u64, RENT_MIN_0 - 1] {
        expect_code(
            env.execute_inline(&v, key_a0(), 0, &[sol(&to, 2 * LAMPORTS_PER_SOL - left)], &[], Opt::default()),
            vault_err(VaultError::WalletBelowRentExempt),
        );
    }
    // Two transfers in one execute whose total leaves the wallet below the minimum (the rule is
    // checked once, on the final balance; see regressions.rs for the order-independence).
    expect_code(
        env.execute_inline(&v, key_a0(), 0, &[sol(&to, LAMPORTS_PER_SOL), sol(&to, LAMPORTS_PER_SOL - 5)], &[], Opt::default()),
        vault_err(VaultError::WalletBelowRentExempt),
    );
    assert_untouched(&env, &v, 0);
    assert_eq!(env.lamports(&v.wallet), 2 * LAMPORTS_PER_SOL);
}

#[test]
fn close_vault_with_read_only_wallet_fails() {
    // close_vault sweeps the wallet (regressions.rs), so the wallet must be passed writable.
    let (mut env, v) = setup(LAMPORTS_PER_SOL);
    let rent_to = new_keypair().pubkey();
    let sig = sign_close(key_a0(), &v, 0, 0, &rent_to);
    let mut ix = close_vault_ix(&env.payer_pk(), &v, Opt::default(), 0, &rent_to, Some(&sig));
    ix.accounts[2] = AccountMeta::new_readonly(v.wallet, false);
    expect_code(env.send(&[ix], &[]), anchor_err(AnchorError::ConstraintMut));
    assert_untouched(&env, &v, 0);
    assert_eq!(env.lamports(&v.wallet), LAMPORTS_PER_SOL);
    assert_eq!(env.lamports(&rent_to), 0);
}

#[test]
fn close_vault_account_checks() {
    let (mut env, v) = setup(0);
    let rent_to = new_keypair().pubkey();
    let sig = sign_close(key_a0(), &v, 0, 0, &rent_to);
    // rent_to account differs from the signed argument.
    let ix = close_vault_ix_raw(&env.payer_pk(), &v, Opt::default(), 0, &rent_to, &env.payer_pk(), Some(&sig));
    expect_code(env.send(&[ix], &[]), vault_err(VaultError::AccountMismatch));
    // Signed rent_to differs from the argument (signature over another rent_to).
    let other = env.payer_pk();
    let ix = close_vault_ix(&env.payer_pk(), &v, Opt::default(), 0, &other, Some(&sig));
    expect_code(env.send(&[ix], &[]), vault_err(VaultError::InvalidSignature));
    // rent_to = state.
    let sig_state = sign_close(key_a0(), &v, 0, 0, &v.state);
    let ix = close_vault_ix(&env.payer_pk(), &v, Opt::default(), 0, &v.state, Some(&sig_state));
    expect_code(env.send(&[ix], &[]), vault_err(VaultError::AliasedAccount));
    assert_untouched(&env, &v, 0);
}

#[test]
fn close_token_account_with_balance_fails() {
    let (mut env, v) = setup(0);
    let tm = create_mint(&mut env, SPL_TOKEN, MintKind::Plain, 6, 1_000);
    deposit_tokens(&mut env, &v, &tm, 1_000);
    expect_code(
        env.execute_inline(&v, key_a0(), 0, &[close_ata(&tm.mint, &SPL_TOKEN, &env.payer_pk())], &[], Opt::default()),
        vault_err(VaultError::TokenAccountNotEmpty),
    );
    assert_untouched(&env, &v, 0);
}

// ---- hybrid mode -----------------------------------------------------------------------------------

#[test]
fn hybrid_mode_requires_the_right_cosigner() {
    let mut env = Env::new();
    let cos = env.new_funded_keypair(LAMPORTS_PER_SOL);
    let v = Vault::new(key_a0().root(), Some(cos.pubkey()));
    env.open(&v);
    let to = new_keypair().pubkey();
    // close_vault without the cosigner / with the wrong one.
    let rent_to = env.payer_pk();
    let sig = sign_close(key_a0(), &v, 0, 0, &rent_to);
    expect_code(
        env.send(&[close_vault_ix(&env.payer_pk(), &v, Opt::default(), 0, &rent_to, Some(&sig))], &[]),
        vault_err(VaultError::MissingCosigner),
    );
    let wrong = env.new_funded_keypair(LAMPORTS_PER_SOL);
    expect_code(
        env.send(&[close_vault_ix(&env.payer_pk(), &v, Opt::cosigner(wrong.pubkey()), 0, &rent_to, Some(&sig))], &[&wrong]),
        vault_err(VaultError::WrongCosigner),
    );
    env.transfer_sol(&v.wallet, 2 * LAMPORTS_PER_SOL);
    let actions = [sol(&to, LAMPORTS_PER_SOL)];

    // No cosigner account.
    expect_code(env.execute_inline(&v, key_a0(), 0, &actions, &[], Opt::default()), vault_err(VaultError::MissingCosigner));
    // Cosigner account present but not signing.
    let unsigned = Opt { cosigner: Some(cos.pubkey()), cosigner_unsigned: true, sig_buffer: None };
    expect_code(env.execute_inline(&v, key_a0(), 0, &actions, &[], unsigned), anchor_err(AnchorError::AccountNotSigner));
    // Wrong cosigner (signing).
    expect_code(
        env.execute_inline(&v, key_a0(), 0, &actions, &[&wrong], Opt::cosigner(wrong.pubkey())),
        vault_err(VaultError::WrongCosigner),
    );
    // Rotate without the cosigner.
    let new_root = key_a1().root();
    let sig = sign_rotate(key_a0(), &v, 0, 0, &new_root);
    expect_code(
        env.send(&[rotate_ix(&env.payer_pk(), &v, Opt::default(), 0, &new_root, Some(&sig))], &[]),
        vault_err(VaultError::MissingCosigner),
    );
    assert_untouched(&env, &v, 0);
    // The cosigner alone cannot do anything without a valid LMS signature.
    let payload = encode_actions(&actions);
    let bogus = sign_execute(key_b0(), &v, 0, 0, &payload);
    let ix = execute_ix(&env.payer_pk(), &v, Opt::cosigner(cos.pubkey()), 0, &payload, Some(&bogus), remaining_for(&v.wallet, &actions));
    expect_code(env.send(&[ix], &[&cos]), vault_err(VaultError::InvalidSignature));
    assert_untouched(&env, &v, 0);
}

#[test]
fn cosigner_on_a_non_hybrid_vault_is_rejected() {
    let (mut env, v) = setup(2 * LAMPORTS_PER_SOL);
    let stray = env.new_funded_keypair(LAMPORTS_PER_SOL);
    let to = new_keypair().pubkey();
    expect_code(
        env.execute_inline(&v, key_a0(), 0, &[sol(&to, 1)], &[&stray], Opt::cosigner(stray.pubkey())),
        vault_err(VaultError::UnexpectedCosigner),
    );
}

// ---- signature buffer ---------------------------------------------------------------------------

#[test]
fn buffer_written_by_another_payer_fails() {
    let (mut env, v) = setup(2 * LAMPORTS_PER_SOL);
    let to = new_keypair().pubkey();
    let actions = [sol(&to, LAMPORTS_PER_SOL)];
    let payload = encode_actions(&actions);
    let sig = sign_execute(key_a0(), &v, 0, 0, &payload);
    let owner = env.new_funded_keypair(10 * LAMPORTS_PER_SOL);
    let attacker = env.new_funded_keypair(10 * LAMPORTS_PER_SOL);

    let (buffer, _) = env.upload_sig(&owner, &v.state, 0, 0, &sig);
    // The attacker cannot overwrite or close the owner's buffer.
    let tx = env.build_tx(&attacker, &[write_sig_buffer_ix(&attacker.pubkey(), &buffer, 0, &[0u8; 64])], &[], 200_000);
    expect_code(env.send_tx(tx), vault_err(VaultError::SigBufferPayerMismatch));
    let tx = env.build_tx(&attacker, &[close_sig_buffer_ix(&attacker.pubkey(), &buffer)], &[], 200_000);
    expect_code(env.send_tx(tx), vault_err(VaultError::SigBufferPayerMismatch));

    // The attacker's own buffer (corrupted) cannot be used with the owner as fee payer, and the
    // owner's buffer cannot be consumed by the attacker as fee payer.
    let mut bad = sig.clone();
    bad[100] ^= 1;
    let (evil_buffer, _) = env.upload_sig(&attacker, &v.state, 0, 0, &bad);
    let ix = execute_ix(&owner.pubkey(), &v, Opt::buffer(evil_buffer), 0, &payload, None, remaining_for(&v.wallet, &actions));
    let tx = env.build_tx(&owner, &[ix], &[], 400_000);
    expect_code(env.send_tx(tx), vault_err(VaultError::SigBufferMismatch));
    let ix = execute_ix(&attacker.pubkey(), &v, Opt::buffer(buffer), 0, &payload, None, remaining_for(&v.wallet, &actions));
    let tx = env.build_tx(&attacker, &[ix], &[], 400_000);
    expect_code(env.send_tx(tx), vault_err(VaultError::SigBufferMismatch));
    // With its own fee payer, the corrupted buffer just fails verification.
    let ix = execute_ix(&attacker.pubkey(), &v, Opt::buffer(evil_buffer), 0, &payload, None, remaining_for(&v.wallet, &actions));
    let tx = env.build_tx(&attacker, &[ix], &[], 400_000);
    expect_code(env.send_tx(tx), vault_err(VaultError::InvalidSignature));

    assert_untouched(&env, &v, 0);
    // The owner's intact buffer still works.
    let ix = execute_ix(&owner.pubkey(), &v, Opt::buffer(buffer), 0, &payload, None, remaining_for(&v.wallet, &actions));
    let tx = env.build_tx(&owner, &[ix], &[], 400_000);
    unwrap_ok(env.send_tx(tx));
}

#[test]
fn buffer_for_another_leaf_or_vault_fails() {
    let (mut env, v) = setup(2 * LAMPORTS_PER_SOL);
    let other = Vault::new(key_b0().root(), None);
    env.open(&other);
    let to = new_keypair().pubkey();
    let actions = [sol(&to, LAMPORTS_PER_SOL)];
    let payload = encode_actions(&actions);
    let p = env.payer.insecure_clone();

    // Buffer for leaf 1 holding a leaf-0 signature, used as leaf 0 and as leaf 1.
    let sig0 = sign_execute(key_a0(), &v, 0, 0, &payload);
    let (buf1, _) = env.upload_sig(&p, &v.state, 0, 1, &sig0);
    let ix = execute_ix(&p.pubkey(), &v, Opt::buffer(buf1), 0, &payload, None, remaining_for(&v.wallet, &actions));
    expect_code(env.send(&[ix], &[]), vault_err(VaultError::SigBufferMismatch));
    let ix = execute_ix(&p.pubkey(), &v, Opt::buffer(buf1), 1, &payload, None, remaining_for(&v.wallet, &actions));
    expect_code(env.send(&[ix], &[]), vault_err(VaultError::LeafMismatch));

    // Buffer created for another vault.
    let (buf_other, _) = env.upload_sig(&p, &other.state, 0, 0, &sig0);
    let ix = execute_ix(&p.pubkey(), &v, Opt::buffer(buf_other), 0, &payload, None, remaining_for(&v.wallet, &actions));
    expect_code(env.send(&[ix], &[]), vault_err(VaultError::SigBufferMismatch));

    // Both an inline signature and a buffer / neither.
    let ix = execute_ix(&p.pubkey(), &v, Opt::buffer(buf1), 1, &payload, Some(&sig0), remaining_for(&v.wallet, &actions));
    expect_code(env.send(&[ix], &[]), vault_err(VaultError::AmbiguousSignatureSource));
    let ix = execute_ix(&p.pubkey(), &v, Opt::default(), 0, &payload, None, remaining_for(&v.wallet, &actions));
    expect_code(env.send(&[ix], &[]), vault_err(VaultError::MissingSignature));
    assert_untouched(&env, &v, 0);
}

#[test]
fn sig_buffer_init_and_write_bounds() {
    let (mut env, v) = setup(0);
    let p = env.payer_pk();
    // Wrong epoch, used leaf, out-of-tree leaf.
    expect_code(env.send(&[init_sig_buffer_ix(&p, &v.state, 1, 0)], &[]), vault_err(VaultError::EpochMismatch));
    expect_code(env.send(&[init_sig_buffer_ix(&p, &v.state, 0, 1024)], &[]), vault_err(VaultError::LeafOutOfRange));
    env.send_ok(&[init_sig_buffer_ix(&p, &v.state, 0, 0)], &[]);
    let buffer = sig_buffer_address(&v.state, &p, 0, 0);
    // Writes stay inside the 2,508-byte area.
    env.send_ok(&[write_sig_buffer_ix(&p, &buffer, 2500, &[7u8; 8])], &[]);
    expect_code(env.send(&[write_sig_buffer_ix(&p, &buffer, 2501, &[7u8; 8])], &[]), vault_err(VaultError::SigBufferOutOfBounds));
    expect_code(env.send(&[write_sig_buffer_ix(&p, &buffer, u32::MAX, &[7u8; 1])], &[]), vault_err(VaultError::SigBufferOutOfBounds));
    // Re-initialising the same buffer fails.
    unwrap_err(env.send(&[init_sig_buffer_ix(&p, &v.state, 0, 0)], &[]));
    let acc = env.svm.get_account(&buffer).unwrap();
    assert_eq!(acc.data[..8], account_disc("SigBuffer"));
    assert_eq!(&acc.data[81 + 2500..], &[7u8; 8]);

    // Spent leaf: once next_leaf moves past it, a new buffer for it cannot be created.
    env.transfer_sol(&v.wallet, LAMPORTS_PER_SOL);
    env.execute_ok(&v, key_a0(), 3, &[sol(&p, LAMPORTS_PER_SOL)]);
    expect_code(env.send(&[init_sig_buffer_ix(&p, &v.state, 0, 2)], &[]), vault_err(VaultError::LeafAlreadyUsed));
}
