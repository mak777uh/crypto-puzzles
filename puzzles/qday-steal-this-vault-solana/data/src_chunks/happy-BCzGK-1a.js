var e=`//! Happy paths: open, deposit, execute (single + multi action), withdrawals, leaf skipping,
//! rotate, close (tombstone), hybrid mode, both signature transports. Security-fix regressions
//! (close sweep, rent check order, reserved last leaf, stranded tokens) live in \`regressions.rs\`.

use bunker::errors::VaultError;
use bunker_core::encode_actions;
use solana_address::Address;
use solana_signer::Signer;

use crate::common::*;

#[test]
fn open_vault_initialises_state() {
    let mut env = Env::new();
    let v = Vault::new(key_a0().root(), None);
    let meta = env.open(&v);
    assert_events(&meta, "VaultOpened", 1);

    let s = env.state(&v);
    let (_, bump) = Address::find_program_address(&[b"vault", &v.vault_id], &PROGRAM_ID);
    let (_, wallet_bump) = Address::find_program_address(&[b"wallet", v.state.as_ref()], &PROGRAM_ID);
    assert_eq!(s.version, 1);
    assert_eq!(s.bump, bump);
    assert_eq!(s.wallet_bump, wallet_bump);
    assert_eq!(s.vault_id, v.vault_id);
    assert_eq!(s.current_root, key_a0().root());
    assert_eq!(s.root_epoch, 0);
    assert_eq!(s.next_leaf, 0);
    assert_eq!(s.tree_size, 1024);
    assert_eq!(s.cosigner, None);
    assert_eq!(s.executed_count, 0);
    let acc = env.svm.get_account(&v.state).unwrap();
    assert_eq!(acc.owner, PROGRAM_ID);
    assert_eq!(acc.data.len(), 280);
    // The wallet is a plain system account that does not exist until it is funded.
    assert!(env.account(&v.wallet).is_none());
}

#[test]
fn open_vault_binds_root_and_options() {
    let mut env = Env::new();
    let root = key_a0().root();
    let attacker_cosigner = new_keypair().pubkey();
    let v = Vault::new(root, None);

    // Front-run attempt: same state address (vault_id of the no-cosigner vault) but a hostile
    // cosigner in the arguments.
    let ix = open_vault_ix_raw(&env.payer_pk(), &v.state, &v.wallet, v.vault_id, root, Some(attacker_cosigner));
    expect_code(env.send(&[ix], &[]), vault_err(VaultError::VaultIdMismatch));
    // Same vault_id but a different root.
    let ix = open_vault_ix_raw(&env.payer_pk(), &v.state, &v.wallet, v.vault_id, key_b0().root(), None);
    expect_code(env.send(&[ix], &[]), vault_err(VaultError::VaultIdMismatch));

    // The hostile-cosigner vault is simply a different address.
    let hostile = Vault::new(root, Some(attacker_cosigner));
    assert_ne!(hostile.state, v.state);
    env.open(&hostile);
    env.open(&v);
    assert_eq!(env.state(&v).cosigner, None);
}

#[test]
fn open_vault_twice_fails() {
    let mut env = Env::new();
    let v = Vault::new(key_a0().root(), None);
    env.open(&v);
    let ix = open_vault_ix(&env.payer_pk(), &v);
    unwrap_err(env.send(&[ix], &[]));
}

#[test]
fn deposit_then_multi_action_execute() {
    let mut env = Env::new();
    let v = Vault::new(key_a0().root(), None);
    env.open(&v);

    // Deposits are plain transfers that never touch the program.
    env.transfer_sol(&v.wallet, 5 * LAMPORTS_PER_SOL);
    let tm = create_mint(&mut env, SPL_TOKEN, MintKind::Plain, 6, 1_000_000_000);
    let vault_ata = deposit_tokens(&mut env, &v, &tm, 250_000_000);
    assert_eq!(token_amount(&env, &vault_ata), 250_000_000);
    let ata_rent = env.lamports(&vault_ata);

    // One execute: send SOL, send all tokens, close the now-empty ATA.
    let user = new_keypair().pubkey();
    let (_, user_ata) = new_destination(&mut env, &tm);
    let actions = [
        sol(&user, LAMPORTS_PER_SOL),
        token(&tm.mint, &SPL_TOKEN, &user_ata, 250_000_000),
        close_ata(&tm.mint, &SPL_TOKEN, &user),
    ];
    let meta = env.execute_ok(&v, key_a0(), 0, &actions);
    assert_events(&meta, "ActionExecuted", 3);

    assert_eq!(env.lamports(&user), LAMPORTS_PER_SOL + ata_rent);
    assert_eq!(token_amount(&env, &user_ata), 250_000_000);
    assert!(env.account(&vault_ata).is_none(), "vault ATA closed");
    assert_eq!(env.lamports(&v.wallet), 4 * LAMPORTS_PER_SOL);
    let s = env.state(&v);
    assert_eq!(s.next_leaf, 1);
    assert_eq!(s.executed_count, 1);
}

#[test]
fn partial_and_full_sol_withdrawal() {
    let mut env = Env::new();
    let v = Vault::new(key_a0().root(), None);
    env.open(&v);
    env.transfer_sol(&v.wallet, 3 * LAMPORTS_PER_SOL);
    let to = new_keypair().pubkey();

    env.execute_ok(&v, key_a0(), 0, &[sol(&to, LAMPORTS_PER_SOL)]);
    assert_eq!(env.lamports(&v.wallet), 2 * LAMPORTS_PER_SOL);

    // Leaving exactly the rent-exempt minimum is fine.
    env.execute_ok(&v, key_a0(), 1, &[sol(&to, 2 * LAMPORTS_PER_SOL - RENT_MIN_0)]);
    assert_eq!(env.lamports(&v.wallet), RENT_MIN_0);

    // Full withdrawal to exactly 0.
    env.execute_ok(&v, key_a0(), 2, &[sol(&to, RENT_MIN_0)]);
    assert_eq!(env.lamports(&v.wallet), 0);
    assert_eq!(env.lamports(&to), 3 * LAMPORTS_PER_SOL);
    assert_eq!(env.state(&v).next_leaf, 3);

    // The vault keeps working after being emptied and refilled.
    env.transfer_sol(&v.wallet, LAMPORTS_PER_SOL);
    env.execute_ok(&v, key_a0(), 3, &[sol(&to, LAMPORTS_PER_SOL)]);
    assert_eq!(env.lamports(&v.wallet), 0);
}

#[test]
fn eight_actions_in_one_execute() {
    let mut env = Env::new();
    let v = Vault::new(key_a0().root(), None);
    env.open(&v);
    env.transfer_sol(&v.wallet, 10 * LAMPORTS_PER_SOL);
    let dests: Vec<Address> = (0..8).map(|_| new_keypair().pubkey()).collect();
    let actions: Vec<_> = dests.iter().map(|d| sol(d, LAMPORTS_PER_SOL)).collect();
    let meta = env.execute_ok(&v, key_a0(), 0, &actions);
    assert_events(&meta, "ActionExecuted", 8);
    for d in &dests {
        assert_eq!(env.lamports(d), LAMPORTS_PER_SOL);
    }
    // Nine actions are not a valid payload.
    let mut nine = actions.clone();
    nine.push(sol(&dests[0], 1));
    let payload = encode_actions(&nine);
    let sig = sign_execute(key_a0(), &v, 0, 1, &payload);
    let ix = execute_ix(&env.payer_pk(), &v, Opt::default(), 1, &payload, Some(&sig), remaining_for(&v.wallet, &nine));
    expect_code(env.send(&[ix], &[]), vault_err(VaultError::InvalidPayload));
}

#[test]
fn leaf_skipping_moves_next_leaf_forward() {
    let mut env = Env::new();
    let v = Vault::new(key_a0().root(), None);
    env.open(&v);
    env.transfer_sol(&v.wallet, 3 * LAMPORTS_PER_SOL);
    let to = new_keypair().pubkey();

    env.execute_ok(&v, key_a0(), 5, &[sol(&to, LAMPORTS_PER_SOL)]);
    assert_eq!(env.state(&v).next_leaf, 6);

    // Leaves 0..=5 are now unusable.
    for leaf in [0u32, 4, 5] {
        expect_code(
            env.execute_inline(&v, key_a0(), leaf, &[sol(&to, 1_000_000)], &[], Opt::default()),
            vault_err(VaultError::LeafAlreadyUsed),
        );
    }
    env.execute_ok(&v, key_a0(), 6, &[sol(&to, LAMPORTS_PER_SOL)]);
    // The last leaf execute may use is tree_size - 2 (leaf 1023 is reserved for rotate).
    env.execute_ok(&v, key_a0(), 1022, &[sol(&to, 1_000_000)]);
    assert_eq!(env.state(&v).next_leaf, 1023);
    expect_code(
        env.execute_inline(&v, key_a0(), 1022, &[sol(&to, 1_000_000)], &[], Opt::default()),
        vault_err(VaultError::LeafAlreadyUsed),
    );
    expect_code(
        env.execute_inline(&v, key_a0(), 1023, &[sol(&to, 1_000_000)], &[], Opt::default()),
        vault_err(VaultError::LeafReservedForRotate),
    );
}

#[test]
fn failed_transaction_does_not_advance_next_leaf() {
    let mut env = Env::new();
    let v = Vault::new(key_a0().root(), None);
    env.open(&v);
    env.transfer_sol(&v.wallet, LAMPORTS_PER_SOL);
    let to = new_keypair().pubkey();

    // Valid signature, but the wallet cannot pay: the CPI fails and the whole tx reverts.
    let r = env.execute_inline(&v, key_a0(), 3, &[sol(&to, 2 * LAMPORTS_PER_SOL)], &[], Opt::default());
    unwrap_err(r);
    let s = env.state(&v);
    assert_eq!(s.next_leaf, 0);
    assert_eq!(s.executed_count, 0);
    assert_eq!(env.lamports(&v.wallet), LAMPORTS_PER_SOL);

    // Leaf 3's signature is now public; clients move on to a fresh leaf.
    env.execute_ok(&v, key_a0(), 4, &[sol(&to, LAMPORTS_PER_SOL / 2)]);
    assert_eq!(env.state(&v).next_leaf, 5);
}

#[test]
fn rotate_then_old_epoch_signatures_fail() {
    let mut env = Env::new();
    let v = Vault::new(key_a0().root(), None);
    env.open(&v);
    env.transfer_sol(&v.wallet, 3 * LAMPORTS_PER_SOL);
    let to = new_keypair().pubkey();
    env.execute_ok(&v, key_a0(), 0, &[sol(&to, LAMPORTS_PER_SOL)]);

    // Pre-sign an epoch-0 message for a future leaf, then rotate with leaf 1.
    let payload = encode_actions(&[sol(&to, LAMPORTS_PER_SOL)]);
    let old_sig = sign_execute(key_a0(), &v, 0, 7, &payload);
    let new_root = key_a1().root();
    let sig = sign_rotate(key_a0(), &v, 0, 1, &new_root);
    let meta = env.send_ok(&[rotate_ix(&env.payer_pk(), &v, Opt::default(), 1, &new_root, Some(&sig))], &[]);
    assert_events(&meta, "KeyRotated", 1);
    let s = env.state(&v);
    assert_eq!(s.root_epoch, 1);
    assert_eq!(s.next_leaf, 0);
    assert_eq!(s.current_root, new_root);
    assert_eq!(s.vault_id, v.vault_id, "address and id never change");

    // The pre-signed epoch-0 signature no longer verifies (different root and epoch)...
    let remaining = remaining_for(&v.wallet, &[sol(&to, LAMPORTS_PER_SOL)]);
    let ix = execute_ix(&env.payer_pk(), &v, Opt::default(), 7, &payload, Some(&old_sig), remaining.clone());
    expect_code(env.send(&[ix], &[]), vault_err(VaultError::InvalidSignature));
    // ...nor does an old-key signature over an epoch-1 message.
    let old_key_new_epoch = sign_execute(key_a0(), &v, 1, 8, &payload);
    let ix = execute_ix(&env.payer_pk(), &v, Opt::default(), 8, &payload, Some(&old_key_new_epoch), remaining.clone());
    expect_code(env.send(&[ix], &[]), vault_err(VaultError::InvalidSignature));
    // ...nor a new-key signature over an epoch-0 message.
    let new_key_old_epoch = sign_execute(key_a1(), &v, 0, 9, &payload);
    let ix = execute_ix(&env.payer_pk(), &v, Opt::default(), 9, &payload, Some(&new_key_old_epoch), remaining);
    expect_code(env.send(&[ix], &[]), vault_err(VaultError::InvalidSignature));

    // The new key works from leaf 0, and the old key cannot rotate again.
    env.execute_ok(&v, key_a1(), 0, &[sol(&to, LAMPORTS_PER_SOL)]);
    let back = key_a0().root();
    let sig = sign_rotate(key_a0(), &v, 1, 1, &back);
    expect_code(
        env.send(&[rotate_ix(&env.payer_pk(), &v, Opt::default(), 1, &back, Some(&sig))], &[]),
        vault_err(VaultError::InvalidSignature),
    );
    assert_eq!(env.state(&v).next_leaf, 1);
}

#[test]
fn rotate_to_same_root_is_rejected() {
    let mut env = Env::new();
    let v = Vault::new(key_a0().root(), None);
    env.open(&v);
    let same = key_a0().root();
    let sig = sign_rotate(key_a0(), &v, 0, 0, &same);
    expect_code(
        env.send(&[rotate_ix(&env.payer_pk(), &v, Opt::default(), 0, &same, Some(&sig))], &[]),
        vault_err(VaultError::SameRoot),
    );
}

#[test]
fn close_vault_leaves_tombstone_and_cannot_reopen() {
    let mut env = Env::new();
    let v = Vault::new(key_a0().root(), None);
    env.open(&v);
    env.transfer_sol(&v.wallet, LAMPORTS_PER_SOL);
    let user = new_keypair().pubkey();
    env.execute_ok(&v, key_a0(), 0, &[sol(&user, LAMPORTS_PER_SOL)]);
    assert_eq!(env.lamports(&v.wallet), 0);

    let state_lamports = env.lamports(&v.state);
    let rent_to = new_keypair().pubkey();
    let sig = sign_close(key_a0(), &v, 0, 1, &rent_to);
    let meta = env.send_ok(&[close_vault_ix(&env.payer_pk(), &v, Opt::default(), 1, &rent_to, Some(&sig))], &[]);
    assert_events(&meta, "VaultClosed", 1);

    let acc = env.svm.get_account(&v.state).unwrap();
    assert_eq!(acc.owner, PROGRAM_ID);
    assert_eq!(acc.data.len(), 48);
    assert_eq!(acc.data[..8], account_disc("VaultTombstone"));
    assert_eq!(acc.data[8..40], v.vault_id);
    let keep = env.svm.minimum_balance_for_rent_exemption(48);
    assert_eq!(acc.lamports, keep);
    assert_eq!(env.lamports(&rent_to), state_lamports - keep);
    if let Some(ev) = vault_closed_event_if_logged(&meta) {
        assert_eq!((ev.state, ev.vault_id, ev.root_epoch, ev.leaf_index, ev.rent_to), (v.state, v.vault_id, 0, 1, rent_to));
        assert_eq!((ev.lamports, ev.wallet_lamports), (state_lamports - keep, 0), "empty wallet: nothing swept");
    }

    // Re-opening the same vault_id fails (the address is taken forever).
    let ix = open_vault_ix(&env.payer_pk(), &v);
    unwrap_err(env.send(&[ix], &[]));
    // Every authorised instruction on the tombstone fails with VaultClosed.
    env.transfer_sol(&v.wallet, LAMPORTS_PER_SOL);
    expect_code(
        env.execute_inline(&v, key_a0(), 5, &[sol(&user, 1_000_000)], &[], Opt::default()),
        vault_err(VaultError::VaultClosed),
    );
    let new_root = key_a1().root();
    let sig = sign_rotate(key_a0(), &v, 0, 6, &new_root);
    expect_code(
        env.send(&[rotate_ix(&env.payer_pk(), &v, Opt::default(), 6, &new_root, Some(&sig))], &[]),
        vault_err(VaultError::VaultClosed),
    );
    let sig = sign_close(key_a0(), &v, 0, 7, &rent_to);
    expect_code(
        env.send(&[close_vault_ix(&env.payer_pk(), &v, Opt::default(), 7, &rent_to, Some(&sig))], &[]),
        vault_err(VaultError::VaultClosed),
    );
    let ix = init_sig_buffer_ix(&env.payer_pk(), &v.state, 0, 8);
    expect_code(env.send(&[ix], &[]), vault_err(VaultError::VaultClosed));
}

#[test]
fn close_vault_rent_to_fee_payer() {
    let mut env = Env::new();
    let v = Vault::new(key_a0().root(), None);
    env.open(&v);
    let payer = env.payer_pk();
    let sig = sign_close(key_a0(), &v, 0, 0, &payer);
    env.send_ok(&[close_vault_ix(&payer, &v, Opt::default(), 0, &payer, Some(&sig))], &[]);
    assert_eq!(env.svm.get_account(&v.state).unwrap().data.len(), 48);
}

#[test]
fn hybrid_mode_happy_path() {
    let mut env = Env::new();
    let cosigner = env.new_funded_keypair(LAMPORTS_PER_SOL);
    let v = Vault::new(key_a0().root(), Some(cosigner.pubkey()));
    env.open(&v);
    assert_eq!(env.state(&v).cosigner, Some(cosigner.pubkey()));
    env.transfer_sol(&v.wallet, 2 * LAMPORTS_PER_SOL);
    let to = new_keypair().pubkey();

    unwrap_ok(env.execute_inline(&v, key_a0(), 0, &[sol(&to, LAMPORTS_PER_SOL)], &[&cosigner], Opt::cosigner(cosigner.pubkey())));
    assert_eq!(env.lamports(&to), LAMPORTS_PER_SOL);

    // The cosigner can also be the fee payer.
    let payload = encode_actions(&[sol(&to, LAMPORTS_PER_SOL)]);
    let sig = sign_execute(key_a0(), &v, 0, 1, &payload);
    let ix = execute_ix(&cosigner.pubkey(), &v, Opt::cosigner(cosigner.pubkey()), 1, &payload, Some(&sig), remaining_for(&v.wallet, &[sol(&to, LAMPORTS_PER_SOL)]));
    let tx = env.build_tx(&cosigner, &[ix], &[], TEST_CU_LIMIT);
    unwrap_ok(env.send_tx(tx));

    // Rotate and close also need the cosigner.
    let new_root = key_a1().root();
    let sig = sign_rotate(key_a0(), &v, 0, 2, &new_root);
    env.send_ok(&[rotate_ix(&env.payer_pk(), &v, Opt::cosigner(cosigner.pubkey()), 2, &new_root, Some(&sig))], &[&cosigner]);
    let rent_to = env.payer_pk();
    let sig = sign_close(key_a1(), &v, 1, 0, &rent_to);
    env.send_ok(&[close_vault_ix(&env.payer_pk(), &v, Opt::cosigner(cosigner.pubkey()), 0, &rent_to, Some(&sig))], &[&cosigner]);
}

#[test]
fn inline_signature_in_large_transaction() {
    let mut env = Env::new();
    let v = Vault::new(key_a0().root(), None);
    env.open(&v);
    env.transfer_sol(&v.wallet, 2 * LAMPORTS_PER_SOL);
    let to = new_keypair().pubkey();
    let actions = [sol(&to, LAMPORTS_PER_SOL)];
    let payload = encode_actions(&actions);
    let sig = sign_execute(key_a0(), &v, 0, 0, &payload);
    let ix = execute_ix(&env.payer_pk(), &v, Opt::default(), 0, &payload, Some(&sig), remaining_for(&v.wallet, &actions));

    // Legacy encoding: does not fit a 1,232-byte packet (LiteSVM does not enforce the limit).
    let payer = env.payer.insecure_clone();
    let legacy = env.build_tx(&payer, &[ix.clone()], &[], 200_000);
    let size = legacy_tx_size(&legacy);
    assert!(size > PACKET_DATA_SIZE && size <= 4096, "legacy size {size}");
    unwrap_ok(env.send_tx(legacy));
    assert_eq!(env.lamports(&to), LAMPORTS_PER_SOL);

    // v1 encoding (4,096-byte limit; compute and loaded-data budgets in the header) for the next leaf.
    let payload = encode_actions(&actions);
    let sig = sign_execute(key_a0(), &v, 0, 1, &payload);
    let ix = execute_ix(&env.payer_pk(), &v, Opt::default(), 1, &payload, Some(&sig), remaining_for(&v.wallet, &actions));
    let v1 = build_v1_tx(&mut env, &payer, &[ix], &[], 200_000);
    let v1_size = tx_size(&v1);
    assert!(v1_size <= 4096, "v1 size {v1_size}");
    unwrap_ok(env.send_tx(v1));
    assert_eq!(env.lamports(&to), 2 * LAMPORTS_PER_SOL);
    assert_eq!(env.state(&v).next_leaf, 2);
}

#[test]
fn buffer_path_execute_rotate_close() {
    let mut env = Env::new();
    let v = Vault::new(key_a0().root(), None);
    env.open(&v);
    env.transfer_sol(&v.wallet, 2 * LAMPORTS_PER_SOL);
    let to = new_keypair().pubkey();
    let fee_payer = env.new_funded_keypair(10 * LAMPORTS_PER_SOL);

    // execute via buffer: several legacy-sized write transactions, then execute with sig = None.
    let actions = [sol(&to, 2 * LAMPORTS_PER_SOL)];
    let payload = encode_actions(&actions);
    let sig = sign_execute(key_a0(), &v, 0, 0, &payload);
    let (buffer, stats) = env.upload_sig(&fee_payer, &v.state, 0, 0, &sig);
    assert!(stats.len() >= 3, "a 2,508-byte signature needs several legacy transactions");
    assert!(stats.iter().all(|(bytes, _)| *bytes <= PACKET_DATA_SIZE));
    let buf_acc = env.svm.get_account(&buffer).unwrap();
    assert_eq!(buf_acc.data.len(), 2589);
    assert_eq!(&buf_acc.data[81..], &sig[..]);
    let buf_rent = buf_acc.lamports;

    let before = env.lamports(&fee_payer.pubkey());
    let ix = execute_ix(&fee_payer.pubkey(), &v, Opt::buffer(buffer), 0, &payload, None, remaining_for(&v.wallet, &actions));
    let tx = env.build_tx(&fee_payer, &[ix], &[], 200_000);
    assert!(legacy_tx_size(&tx) <= PACKET_DATA_SIZE);
    unwrap_ok(env.send_tx(tx));
    assert_eq!(env.lamports(&to), 2 * LAMPORTS_PER_SOL);
    assert!(env.account(&buffer).is_none(), "buffer closed");
    // The buffer's rent comes back to the fee payer (minus this transaction's fee).
    assert!(env.lamports(&fee_payer.pubkey()) + 20_000 >= before + buf_rent);

    // rotate via buffer (chunks written out of order).
    let new_root = key_a1().root();
    let sig = sign_rotate(key_a0(), &v, 0, 1, &new_root);
    let p = fee_payer.pubkey();
    let buffer = sig_buffer_address(&v.state, &p, 0, 1);
    unwrap_ok({
        let ixs = [init_sig_buffer_ix(&p, &v.state, 0, 1), write_sig_buffer_ix(&p, &buffer, 1700, &sig[1700..])];
        let tx = env.build_tx(&fee_payer, &ixs, &[], 200_000);
        env.send_tx(tx)
    });
    unwrap_ok({
        let tx = env.build_tx(&fee_payer, &[write_sig_buffer_ix(&p, &buffer, 0, &sig[..800])], &[], 200_000);
        env.send_tx(tx)
    });
    // Missing middle chunk: verification fails and nothing changes.
    let rot = rotate_ix(&p, &v, Opt::buffer(buffer), 1, &new_root, None);
    let tx = env.build_tx(&fee_payer, &[rot.clone()], &[], 200_000);
    expect_code(env.send_tx(tx), vault_err(VaultError::InvalidSignature));
    assert_eq!(env.state(&v).root_epoch, 0);
    unwrap_ok({
        let tx = env.build_tx(&fee_payer, &[write_sig_buffer_ix(&p, &buffer, 800, &sig[800..1700])], &[], 200_000);
        env.send_tx(tx)
    });
    let tx = env.build_tx(&fee_payer, &[rot], &[], 200_000);
    unwrap_ok(env.send_tx(tx));
    assert_eq!(env.state(&v).root_epoch, 1);
    assert!(env.account(&buffer).is_none());

    // close via buffer, rent to an arbitrary address.
    let rent_to = new_keypair().pubkey();
    let sig = sign_close(key_a1(), &v, 1, 0, &rent_to);
    let (buffer, _) = env.upload_sig(&fee_payer, &v.state, 1, 0, &sig);
    let ix = close_vault_ix(&p, &v, Opt::buffer(buffer), 0, &rent_to, None);
    let tx = env.build_tx(&fee_payer, &[ix], &[], 200_000);
    unwrap_ok(env.send_tx(tx));
    assert!(env.lamports(&rent_to) > 0);
    assert!(env.account(&buffer).is_none());
    assert_eq!(env.svm.get_account(&v.state).unwrap().data.len(), 48);
}

#[test]
fn abandoned_buffer_can_be_closed_by_its_payer() {
    let mut env = Env::new();
    let v = Vault::new(key_a0().root(), None);
    env.open(&v);
    let p = env.payer_pk();
    env.send_ok(&[init_sig_buffer_ix(&p, &v.state, 0, 3)], &[]);
    let buffer = sig_buffer_address(&v.state, &p, 0, 3);
    let rent = env.lamports(&buffer);
    assert!(rent > 0);
    let before = env.lamports(&p);
    env.send_ok(&[close_sig_buffer_ix(&p, &buffer)], &[]);
    assert!(env.account(&buffer).is_none());
    assert!(env.lamports(&p) > before);
}

#[test]
fn anyone_can_relay_a_signed_execute() {
    // The fee payer is trusted for nothing: a third party relaying the user's signed message can
    // only cause exactly the signed effect.
    let mut env = Env::new();
    let v = Vault::new(key_a0().root(), None);
    env.open(&v);
    env.transfer_sol(&v.wallet, LAMPORTS_PER_SOL);
    let to = new_keypair().pubkey();
    let relayer = env.new_funded_keypair(LAMPORTS_PER_SOL);
    let actions = [sol(&to, LAMPORTS_PER_SOL)];
    let payload = encode_actions(&actions);
    let sig = sign_execute(key_a0(), &v, 0, 0, &payload);
    let ix = execute_ix(&relayer.pubkey(), &v, Opt::default(), 0, &payload, Some(&sig), remaining_for(&v.wallet, &actions));
    let tx = env.build_tx(&relayer, &[ix], &[], TEST_CU_LIMIT);
    unwrap_ok(env.send_tx(tx));
    assert_eq!(env.lamports(&to), LAMPORTS_PER_SOL);
}
`;export{e as default};