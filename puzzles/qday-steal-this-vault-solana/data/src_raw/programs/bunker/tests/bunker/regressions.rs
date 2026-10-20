//! Regressions for the security-review fixes:
//! 1. `close_vault` sweeps the wallet to `rent_to`, so a dust deposit can no longer block a close;
//! 2. the wallet rent rule is checked once, after all actions (no order dependence);
//! 3. the last leaf of each key (`tree_size - 1`) is reserved for `rotate`;
//! 4. a TransferToken destination cannot be a token account owned by the vault itself.

use bunker_lms::LmsKey;
use bunker::errors::VaultError;
use bunker_core::encode_actions;
use solana_address::Address;
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

/// A third party (paying its own fee) sends `lamports` to `to`.
fn grief(env: &mut Env, to: &Address, lamports: u64) {
    let griefer = env.new_funded_keypair(LAMPORTS_PER_SOL);
    let ix = solana_system_interface::instruction::transfer(&griefer.pubkey(), to, lamports);
    let tx = env.build_tx(&griefer, &[ix], &[], 200_000);
    unwrap_ok(env.send_tx(tx));
}

/// `close_vault` at `leaf` (current epoch) with rent to a fresh address, then check that the
/// whole wallet and the state's excess rent reached `rent_to` and that the event reports both.
fn close_and_check_sweep(env: &mut Env, v: &Vault, key: &LmsKey, leaf: u32) {
    let epoch = env.epoch(v);
    let rent_to = new_keypair().pubkey();
    let in_wallet = env.lamports(&v.wallet);
    let in_state = env.lamports(&v.state);
    let keep = env.svm.minimum_balance_for_rent_exemption(48);
    let sig = sign_close(key, v, epoch, leaf, &rent_to);
    let meta = env.send_ok(&[close_vault_ix(&env.payer_pk(), v, Opt::default(), leaf, &rent_to, Some(&sig))], &[]);

    assert_eq!(env.lamports(&v.wallet), 0, "wallet swept");
    assert!(env.account(&v.wallet).is_none());
    assert_eq!(env.lamports(&rent_to), in_wallet + in_state - keep);
    if let Some(ev) = vault_closed_event_if_logged(&meta) {
        assert_eq!((ev.wallet_lamports, ev.lamports, ev.rent_to, ev.leaf_index), (in_wallet, in_state - keep, rent_to, leaf));
    }
    let acc = env.svm.get_account(&v.state).unwrap();
    assert_eq!((acc.data.len(), acc.lamports), (48, keep));
    assert_eq!(acc.data[..8], account_disc("VaultTombstone"));
}

// ---- 1. close_vault sweeps the wallet ---------------------------------------------------------

#[test]
fn close_vault_sweeps_griefer_dust_to_rent_to() {
    // The owner drained the wallet down to the rent minimum; a griefer adds 1 lamport. This used to
    // fail with WalletNotEmpty forever.
    let (mut env, v) = setup(2 * LAMPORTS_PER_SOL);
    let to = new_keypair().pubkey();
    env.execute_ok(&v, key_a0(), 0, &[sol(&to, 2 * LAMPORTS_PER_SOL - RENT_MIN_0)]);
    grief(&mut env, &v.wallet, 1);
    assert_eq!(env.lamports(&v.wallet), RENT_MIN_0 + 1);
    close_and_check_sweep(&mut env, &v, key_a0(), 1);

    // Fully emptied wallet: the cheapest donation the runtime accepts is the rent minimum, then
    // 1 lamport more on top.
    let (mut env, v) = setup(LAMPORTS_PER_SOL);
    env.execute_ok(&v, key_a0(), 0, &[sol(&to, LAMPORTS_PER_SOL)]);
    assert_eq!(env.lamports(&v.wallet), 0);
    grief(&mut env, &v.wallet, RENT_MIN_0);
    grief(&mut env, &v.wallet, 1);
    close_and_check_sweep(&mut env, &v, key_a0(), 1);
}

#[test]
fn close_vault_sweeps_sol_left_in_the_wallet() {
    // The owner signs "withdraw everything", a griefer front-runs it with 1 lamport so it fails
    // the rent rule; close_vault still sweeps the SOL left from before plus the dust.
    let (mut env, v) = setup(3 * LAMPORTS_PER_SOL);
    let to = new_keypair().pubkey();
    let full = env.lamports(&v.wallet);
    let actions = [sol(&to, full)];
    let payload = encode_actions(&actions);
    let sig = sign_execute(key_a0(), &v, 0, 0, &payload);
    grief(&mut env, &v.wallet, 1);
    let ix = execute_ix(&env.payer_pk(), &v, Opt::default(), 0, &payload, Some(&sig), remaining_for(&v.wallet, &actions));
    expect_code(env.send(&[ix], &[]), vault_err(VaultError::WalletBelowRentExempt));
    assert_eq!(env.lamports(&v.wallet), full + 1);
    close_and_check_sweep(&mut env, &v, key_a0(), 1);
    assert_eq!(env.lamports(&to), 0);

    // Hybrid vault, signature through a buffer, rent_to = fee payer: same sweep, buffer refunded.
    let mut env = Env::new();
    let cos = env.new_funded_keypair(LAMPORTS_PER_SOL);
    let v = Vault::new(key_a0().root(), Some(cos.pubkey()));
    env.open(&v);
    env.transfer_sol(&v.wallet, 5 * LAMPORTS_PER_SOL);
    grief(&mut env, &v.wallet, 1);
    let fee_payer = env.new_funded_keypair(10 * LAMPORTS_PER_SOL);
    let fp = fee_payer.pubkey();
    let sig = sign_close(key_a0(), &v, 0, 0, &fp);
    let in_wallet = env.lamports(&v.wallet);
    let excess = env.lamports(&v.state) - env.svm.minimum_balance_for_rent_exemption(48);
    let (buffer, _) = env.upload_sig(&fee_payer, &v.state, 0, 0, &sig);
    let buf_rent = env.lamports(&buffer);
    let before = env.lamports(&fp);
    let ix = close_vault_ix(&fp, &v, Opt { cosigner: Some(cos.pubkey()), cosigner_unsigned: false, sig_buffer: Some(buffer) }, 0, &fp, None);
    let tx = env.build_tx(&fee_payer, &[ix], &[&cos], 200_000);
    let meta = unwrap_ok(env.send_tx(tx));
    if let Some(ev) = vault_closed_event_if_logged(&meta) {
        assert_eq!((ev.wallet_lamports, ev.lamports), (in_wallet, excess));
    }
    assert_eq!(env.lamports(&v.wallet), 0);
    assert!(env.account(&buffer).is_none());
    // Everything but the transaction fee came back to the fee payer.
    let gained = env.lamports(&fp) - before;
    let expected = in_wallet + excess + buf_rent;
    assert!(gained <= expected && gained + 20_000 >= expected, "gained {gained}, expected ~{expected}");
}

// ---- 2. rent rule checked once, after all actions ------------------------------------------------

#[test]
fn split_sol_withdrawal_succeeds_in_either_order() {
    let (mut env, v) = setup(2 * LAMPORTS_PER_SOL);
    // Existing accounts, so the small transfer is not refused by the receiver's rent rule.
    let a = env.new_funded_keypair(LAMPORTS_PER_SOL).pubkey();
    let b = env.new_funded_keypair(LAMPORTS_PER_SOL).pubkey();
    let bal = env.lamports(&v.wallet);
    let small = 100_000; // < RENT_MIN_0: the big transfer alone would leave the wallet "rent-paying"

    env.execute_ok(&v, key_a0(), 0, &[sol(&a, bal - small), sol(&b, small)]);
    assert_eq!(env.lamports(&v.wallet), 0);
    env.transfer_sol(&v.wallet, bal);
    env.execute_ok(&v, key_a0(), 1, &[sol(&b, small), sol(&a, bal - small)]);
    assert_eq!(env.lamports(&v.wallet), 0);
    assert_eq!(env.lamports(&a), LAMPORTS_PER_SOL + 2 * (bal - small));
    assert_eq!(env.lamports(&b), LAMPORTS_PER_SOL + 2 * small);

    // The final balance still has to be 0 or >= the rent minimum, in either order.
    env.transfer_sol(&v.wallet, bal);
    for (leaf, actions) in [(2, [sol(&a, bal - small), sol(&b, small - 1)]), (3, [sol(&b, small - 1), sol(&a, bal - small)])] {
        expect_code(
            env.execute_inline(&v, key_a0(), leaf, &actions, &[], Opt::default()),
            vault_err(VaultError::WalletBelowRentExempt),
        );
    }
    assert_eq!(env.state(&v).next_leaf, 2);
    assert_eq!(env.lamports(&v.wallet), bal);
}

// ---- 3. last leaf reserved for rotate -------------------------------------------------------------

#[test]
fn last_leaf_is_reserved_for_rotate() {
    let (mut env, v) = setup(3 * LAMPORTS_PER_SOL);
    let to = new_keypair().pubkey();
    let rent_to = new_keypair().pubkey();
    let close_at = |env: &mut Env, key: &LmsKey, epoch: u32, leaf: u32| {
        let sig = sign_close(key, &v, epoch, leaf, &rent_to);
        let ix = close_vault_ix(&env.payer_pk(), &v, Opt::default(), leaf, &rent_to, Some(&sig));
        env.send(&[ix], &[])
    };
    let reserved = vault_err(VaultError::LeafReservedForRotate);

    // Neither execute nor close may jump straight to leaf 1023.
    expect_code(env.execute_inline(&v, key_a0(), 1023, &[sol(&to, LAMPORTS_PER_SOL)], &[], Opt::default()), reserved);
    expect_code(close_at(&mut env, key_a0(), 0, 1023), reserved);
    assert_eq!(env.state(&v).next_leaf, 0);

    // Leaf 1022 is the last one execute can use; afterwards only rotate is possible.
    env.execute_ok(&v, key_a0(), 1022, &[sol(&to, LAMPORTS_PER_SOL)]);
    assert_eq!(env.state(&v).next_leaf, 1023);
    expect_code(env.execute_inline(&v, key_a0(), 1023, &[sol(&to, LAMPORTS_PER_SOL)], &[], Opt::default()), reserved);
    expect_code(close_at(&mut env, key_a0(), 0, 1023), reserved);
    assert_eq!(env.state(&v).next_leaf, 1023);
    assert_eq!(env.lamports(&v.wallet), 2 * LAMPORTS_PER_SOL);
    assert_eq!(env.lamports(&rent_to), 0);

    // Rotate at leaf 1023 succeeds (through a signature buffer: init_sig_buffer accepts 1023).
    let p = env.payer.insecure_clone();
    let new_root = key_a1().root();
    let sig = sign_rotate(key_a0(), &v, 0, 1023, &new_root);
    let buffer = sig_buffer_address(&v.state, &p.pubkey(), 0, 1023);
    let rot = rotate_ix(&p.pubkey(), &v, Opt::buffer(buffer), 1023, &new_root, None);
    env.send_buffered(&p, &v.state, 0, 1023, &sig, rot, &[]);
    let s = env.state(&v);
    assert_eq!((s.root_epoch, s.next_leaf, s.current_root), (1, 0, new_root));

    // The vault keeps working at the next epoch, whose own last leaf is reserved in turn.
    env.execute_ok(&v, key_a1(), 0, &[sol(&to, LAMPORTS_PER_SOL)]);
    assert_eq!(env.lamports(&to), 2 * LAMPORTS_PER_SOL);
    expect_code(env.execute_inline(&v, key_a1(), 1023, &[sol(&to, 1_000_000)], &[], Opt::default()), reserved);
    expect_code(close_at(&mut env, key_a1(), 1, 1023), reserved);
    close_and_check_sweep(&mut env, &v, key_a1(), 1);
}

// ---- 4. no token destination owned by the vault itself ----------------------------------------------

/// A fresh, non-ATA token account for `tm` whose owner field is `owner`.
fn side_token_account(env: &mut Env, tm: &TestMint, owner: &Address) -> Address {
    let kp = new_keypair();
    let rent = env.svm.minimum_balance_for_rent_exemption(165);
    let ixs = [
        solana_system_interface::instruction::create_account(&env.payer_pk(), &kp.pubkey(), rent, 165, &tm.program),
        spl_token_2022_interface::instruction::initialize_account3(&tm.program, &kp.pubkey(), &tm.mint, owner).unwrap(),
    ];
    env.send_ok(&ixs, &[&kp]);
    kp.pubkey()
}

#[test]
fn token_transfer_to_a_vault_owned_token_account_fails() {
    for program in [SPL_TOKEN, TOKEN_2022] {
        let (mut env, v) = setup(0);
        let tm = create_mint(&mut env, program, MintKind::Plain, 6, 1_000_000);
        let vault_ata = deposit_tokens(&mut env, &v, &tm, 1_000_000);
        // Owned by the wallet (would strand the tokens: only the canonical ATA is ever a source)
        // or by the state PDA (which never signs).
        for owner in [v.wallet, v.state] {
            let side = side_token_account(&mut env, &tm, &owner);
            expect_code(
                env.execute_inline(&v, key_a0(), 0, &[token(&tm.mint, &program, &side, 1)], &[], Opt::default()),
                vault_err(VaultError::AliasedAccount),
            );
            assert_eq!(token_amount(&env, &side), 0);
        }
        assert_eq!(token_amount(&env, &vault_ata), 1_000_000);
        assert_eq!(env.state(&v).next_leaf, 0);

        // A non-canonical token account of anyone else is still a valid destination.
        let other = new_keypair().pubkey();
        let side = side_token_account(&mut env, &tm, &other);
        env.execute_ok(&v, key_a0(), 0, &[token(&tm.mint, &program, &side, 1)]);
        assert_eq!(token_amount(&env, &side), 1);
        assert_eq!(token_amount(&env, &vault_ata), 999_999);
    }
}
