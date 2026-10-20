//! Legacy (inheritance): SetHeir / CheckIn / ClearHeir inside `execute`, and the permissionless
//! `inherit` once the heir's deadline has passed. Happy paths first, then attacks; every attack
//! also checks that nothing moved and the vault was not sealed.

use anchor_lang::error::ErrorCode as AnchorError;
use bunker::errors::VaultError;
use bunker_core::{encode_actions, Action};
use solana_account::Account;
use solana_address::Address;
use solana_instruction::AccountMeta;
use solana_keypair::Keypair;
use solana_signer::Signer;

use crate::common::*;

/// Opened vault (key A, epoch 0), clock at T0.
fn setup() -> (Env, Vault) {
    let mut env = Env::new();
    env.set_time(T0);
    let v = Vault::new(key_a0().root(), None);
    env.open(&v);
    (env, v)
}

/// Sign and land `actions` (heir actions included) at `leaf`.
fn exec_ok(env: &mut Env, v: &Vault, leaf: u32, actions: &[Action]) {
    unwrap_ok(env.execute_vault(v, key_a0(), leaf, actions, &[], Opt::default()));
}

fn exec_err(env: &mut Env, v: &Vault, leaf: u32, actions: &[Action], code: VaultError) {
    expect_code(env.execute_vault(v, key_a0(), leaf, actions, &[], Opt::default()), vault_err(code));
}

fn sealed(env: &Env, v: &Vault) -> bool {
    let s = env.state(v);
    s.next_leaf == s.tree_size
}

// ================================================================================================
// Happy paths
// ================================================================================================

#[test]
fn set_heir_then_inherit_moves_everything_to_the_heir() {
    let (mut env, v) = setup();
    env.transfer_sol(&v.wallet, 3 * LAMPORTS_PER_SOL);
    let spl = create_mint(&mut env, SPL_TOKEN, MintKind::Plain, 6, 1_000_000);
    let t22 = create_mint(&mut env, TOKEN_2022, MintKind::PumpLike, 6, 1_000_000);
    let nft = create_nft(&mut env);
    let a_spl = deposit_tokens(&mut env, &v, &spl, 400_000);
    let a_t22 = deposit_tokens(&mut env, &v, &t22, 250_000);
    let a_nft = deposit_tokens(&mut env, &v, &nft, 1);
    let heir = new_keypair().pubkey(); // a brand-new address: no account yet

    let payer = env.payer_pk();
    let payer_before = env.lamports(&payer);
    exec_ok(&mut env, &v, 0, &[set_heir(&heir, 365)]);
    let (record, bump) = heir_pda_with_bump(&v.state);
    assert_eq!(
        env.heir(&v).unwrap(),
        HeirView { version: 1, bump, inactivity_days: 365, state: v.state, heir, set_at: T0, deadline: T0 + 365 * DAY, inherited_at: 0 }
    );
    // The fee payer paid the record's rent; the vault paid nothing.
    assert_eq!(env.lamports(&record), HEIR_RECORD_RENT);
    assert_eq!(env.lamports(&v.wallet), 3 * LAMPORTS_PER_SOL);
    let spent = payer_before - env.lamports(&payer);
    assert!(spent >= HEIR_RECORD_RENT && spent < HEIR_RECORD_RENT + 50_000, "fee payer spent {spent}");

    // One second early: refused, nothing moves.
    let cranker = env.new_funded_keypair(LAMPORTS_PER_SOL);
    let tokens = [InheritToken::from(&spl), (&t22).into(), (&nft).into()];
    env.set_time(T0 + 365 * DAY - 1);
    expect_code(env.inherit(&cranker, &v, &heir, &tokens), vault_err(VaultError::InheritanceNotDue));
    assert!(!sealed(&env, &v));
    assert_eq!(env.lamports(&v.wallet), 3 * LAMPORTS_PER_SOL);

    // At the deadline anyone can move everything, and only to the heir.
    env.set_time(T0 + 365 * DAY);
    let rents = env.lamports(&a_spl) + env.lamports(&a_t22) + env.lamports(&a_nft);
    let cranker_before = env.lamports(&cranker.pubkey());
    let meta = unwrap_ok(env.inherit(&cranker, &v, &heir, &tokens));
    assert_events(&meta, "Inherited", 1);
    assert_events(&meta, "InheritedToken", 3);
    assert_eq!(env.lamports(&v.wallet), 0);
    assert_eq!(env.lamports(&heir), 3 * LAMPORTS_PER_SOL + rents, "all SOL and every closed account's rent");
    assert_eq!(token_amount(&env, &ata(&heir, &spl.mint, &SPL_TOKEN)), 400_000);
    assert_eq!(token_amount(&env, &ata(&heir, &t22.mint, &TOKEN_2022)), 250_000);
    assert_eq!(token_amount(&env, &ata(&heir, &nft.mint, &SPL_TOKEN)), 1);
    for a in [a_spl, a_t22, a_nft] {
        assert!(env.account(&a).is_none(), "vault token account closed");
    }
    // The caller only paid (fees and the heir's three new token accounts) and got nothing.
    assert!(env.lamports(&cranker.pubkey()) < cranker_before);

    // Sealed: the key can never sign again, and the record says when it happened.
    assert!(sealed(&env, &v));
    assert_eq!(env.heir(&v).unwrap().inherited_at, T0 + 365 * DAY);
    let to = new_keypair().pubkey();
    env.transfer_sol(&v.wallet, LAMPORTS_PER_SOL);
    let used = vault_err(VaultError::LeafAlreadyUsed);
    for leaf in [1u32, 500, 1022] {
        expect_code(env.execute_inline(&v, key_a0(), leaf, &[sol(&to, 1_000_000)], &[], Opt::default()), used);
    }
    for a in [check_in(&heir, 365), set_heir(&to, 30), clear_heir(&heir)] {
        expect_code(env.execute_vault(&v, key_a0(), 2, &[a], &[], Opt::default()), used);
    }
    let new_root = key_a1().root();
    let sig = sign_rotate(key_a0(), &v, 0, 1023, &new_root);
    expect_code(env.send(&[rotate_ix(&env.payer_pk(), &v, Opt::default(), 1023, &new_root, Some(&sig))], &[]), used);
    let sig = sign_close(key_a0(), &v, 0, 7, &to);
    expect_code(env.send(&[close_vault_ix(&env.payer_pk(), &v, Opt::default(), 7, &to, Some(&sig))], &[]), used);
    expect_code(env.send(&[init_sig_buffer_ix(&env.payer_pk(), &v.state, 0, 5)], &[]), used);
    expect_code(env.send(&[init_sig_buffer_ix(&env.payer_pk(), &v.state, 0, 1023)], &[]), used);

    // Whatever arrives later is forwarded to the heir as well: the address keeps working.
    let later = deposit_tokens(&mut env, &v, &spl, 1_000);
    let later_rent = env.lamports(&later);
    let heir_before = env.lamports(&heir);
    env.warp(30 * DAY);
    unwrap_ok(env.inherit(&cranker, &v, &heir, &[(&spl).into()]));
    assert_eq!(token_amount(&env, &ata(&heir, &spl.mint, &SPL_TOKEN)), 401_000);
    assert_eq!(env.lamports(&heir), heir_before + LAMPORTS_PER_SOL + later_rent);
    assert_eq!(env.lamports(&v.wallet), 0);
    assert_eq!(env.heir(&v).unwrap().inherited_at, T0 + 365 * DAY, "sealed once, at the first inherit");
}

#[test]
fn check_in_restarts_the_countdown() {
    let (mut env, v) = setup();
    env.transfer_sol(&v.wallet, 2 * LAMPORTS_PER_SOL);
    let heir = env.new_funded_keypair(LAMPORTS_PER_SOL).pubkey();
    let cranker = env.new_funded_keypair(LAMPORTS_PER_SOL);
    exec_ok(&mut env, &v, 0, &[set_heir(&heir, 30)]);

    // Day 29: check in. The deadline is now day 59.
    env.set_time(T0 + 29 * DAY);
    exec_ok(&mut env, &v, 1, &[check_in(&heir, 30)]);
    let h = env.heir(&v).unwrap();
    assert_eq!((h.deadline, h.set_at, h.inherited_at), (T0 + 59 * DAY, T0, 0));

    // The old deadline no longer opens anything.
    env.set_time(T0 + 30 * DAY);
    expect_code(env.inherit(&cranker, &v, &heir, &[]), vault_err(VaultError::InheritanceNotDue));
    env.set_time(T0 + 59 * DAY - 1);
    expect_code(env.inherit(&cranker, &v, &heir, &[]), vault_err(VaultError::InheritanceNotDue));

    // Late but before anyone inherited: a check-in still counts (the owner is evidently alive).
    env.set_time(T0 + 70 * DAY);
    exec_ok(&mut env, &v, 2, &[check_in(&heir, 30)]);
    assert_eq!(env.heir(&v).unwrap().deadline, T0 + 100 * DAY);
    expect_code(env.inherit(&cranker, &v, &heir, &[]), vault_err(VaultError::InheritanceNotDue));
    assert!(!sealed(&env, &v));

    env.set_time(T0 + 100 * DAY);
    let before = env.lamports(&heir);
    unwrap_ok(env.inherit(&cranker, &v, &heir, &[]));
    assert_eq!(env.lamports(&heir), before + 2 * LAMPORTS_PER_SOL);
    assert!(sealed(&env, &v));
}

#[test]
fn set_heir_again_changes_the_heir_and_the_period() {
    let (mut env, v) = setup();
    env.transfer_sol(&v.wallet, LAMPORTS_PER_SOL);
    let first = new_keypair().pubkey();
    let second = new_keypair().pubkey();
    exec_ok(&mut env, &v, 0, &[set_heir(&first, 365)]);
    let record = heir_pda(&v.state);
    env.set_time(T0 + 10 * DAY);
    let payer_before = env.lamports(&env.payer_pk());
    exec_ok(&mut env, &v, 1, &[set_heir(&second, 730)]);
    let h = env.heir(&v).unwrap();
    assert_eq!((h.heir, h.inactivity_days, h.set_at, h.deadline), (second, 730, T0 + 10 * DAY, T0 + 740 * DAY));
    // Updating an existing record costs only the fee: no second rent.
    assert!(payer_before - env.lamports(&env.payer_pk()) < 50_000);
    assert_eq!(env.lamports(&record), HEIR_RECORD_RENT);

    // A check-in for the old heir or period is refused.
    exec_err(&mut env, &v, 2, &[check_in(&first, 730)], VaultError::HeirRecordMismatch);
    exec_err(&mut env, &v, 2, &[check_in(&second, 365)], VaultError::HeirRecordMismatch);

    // Only the new heir can be paid.
    let cranker = env.new_funded_keypair(LAMPORTS_PER_SOL);
    env.set_time(T0 + 740 * DAY);
    expect_code(env.inherit(&cranker, &v, &first, &[]), vault_err(VaultError::HeirMismatch));
    unwrap_ok(env.inherit(&cranker, &v, &second, &[]));
    assert_eq!(env.lamports(&second), LAMPORTS_PER_SOL);
    assert_eq!(env.lamports(&first), 0);
}

#[test]
fn clear_heir_closes_the_record_and_refunds_the_vault() {
    let (mut env, v) = setup();
    let heir = new_keypair().pubkey();
    // An empty vault: the refund must still leave the wallet rent-exempt (it does: the record's
    // rent is larger than a 0-byte account's).
    exec_ok(&mut env, &v, 0, &[set_heir(&heir, 90)]);
    let record = heir_pda(&v.state);
    let payer_before = env.lamports(&env.payer_pk());
    exec_ok(&mut env, &v, 1, &[clear_heir(&heir)]);
    assert!(env.account(&record).is_none(), "record closed");
    assert_eq!(env.lamports(&v.wallet), HEIR_RECORD_RENT, "the record's rent went to the vault, not the fee payer");
    assert!(env.lamports(&env.payer_pk()) < payer_before, "the fee payer only paid the fee");

    // Without a record: nothing to check in, clear or inherit.
    exec_err(&mut env, &v, 2, &[check_in(&heir, 90)], VaultError::HeirNotSet);
    exec_err(&mut env, &v, 2, &[clear_heir(&heir)], VaultError::HeirNotSet);
    let cranker = env.new_funded_keypair(LAMPORTS_PER_SOL);
    env.set_time(T0 + 365 * DAY);
    expect_code(env.inherit(&cranker, &v, &heir, &[]), vault_err(VaultError::HeirNotSet));
    assert!(!sealed(&env, &v));
    assert_eq!(env.lamports(&v.wallet), HEIR_RECORD_RENT);

    // A new SetHeir creates it again (paid by the fee payer again).
    exec_ok(&mut env, &v, 2, &[set_heir(&heir, 30)]);
    assert_eq!(env.heir(&v).unwrap().deadline, T0 + 395 * DAY);
}

#[test]
fn heir_actions_ride_along_with_transfers() {
    let (mut env, v) = setup();
    env.transfer_sol(&v.wallet, 3 * LAMPORTS_PER_SOL);
    let tm = create_mint(&mut env, TOKEN_2022, MintKind::Plain, 6, 1_000_000);
    deposit_tokens(&mut env, &v, &tm, 1_000_000);
    let heir = new_keypair().pubkey();
    let user = new_keypair().pubkey();
    let (_, user_ata) = (user, create_ata(&mut env, &user, &tm));

    // SetHeir between two transfers, then a send that also checks in.
    exec_ok(&mut env, &v, 0, &[sol(&user, LAMPORTS_PER_SOL), set_heir(&heir, 183), token(&tm.mint, &TOKEN_2022, &user_ata, 10)]);
    assert_eq!(env.heir(&v).unwrap().deadline, T0 + 183 * DAY);
    env.set_time(T0 + 100 * DAY);
    exec_ok(&mut env, &v, 1, &[token(&tm.mint, &TOKEN_2022, &user_ata, 5), check_in(&heir, 183)]);
    assert_eq!(env.heir(&v).unwrap().deadline, T0 + 283 * DAY);
    assert_eq!(token_amount(&env, &user_ata), 15);
    assert_eq!(env.lamports(&user), LAMPORTS_PER_SOL);

    // Two heir actions in one payload are not a valid payload.
    let payload = encode_actions(&[check_in(&heir, 183), clear_heir(&heir)]);
    let sig = sign_execute(key_a0(), &v, 0, 2, &payload);
    let ix = execute_ix(&env.payer_pk(), &v, Opt::default(), 2, &payload, Some(&sig), remaining_for_vault(&v, &[check_in(&heir, 183)]));
    expect_code(env.send(&[ix], &[]), vault_err(VaultError::InvalidPayload));
}

#[test]
fn hybrid_vault_needs_the_cosigner_to_set_an_heir_but_not_to_inherit() {
    let mut env = Env::new();
    env.set_time(T0);
    let cos = env.new_funded_keypair(LAMPORTS_PER_SOL);
    let v = Vault::new(key_a0().root(), Some(cos.pubkey()));
    env.open(&v);
    env.transfer_sol(&v.wallet, 2 * LAMPORTS_PER_SOL);
    let heir = new_keypair().pubkey();

    // SetHeir is as powerful as a send: hash key and cosigner.
    expect_code(env.execute_vault(&v, key_a0(), 0, &[set_heir(&heir, 30)], &[], Opt::default()), vault_err(VaultError::MissingCosigner));
    let wrong = env.new_funded_keypair(LAMPORTS_PER_SOL);
    expect_code(
        env.execute_vault(&v, key_a0(), 0, &[set_heir(&heir, 30)], &[&wrong], Opt::cosigner(wrong.pubkey())),
        vault_err(VaultError::WrongCosigner),
    );
    assert!(env.heir(&v).is_none());
    unwrap_ok(env.execute_vault(&v, key_a0(), 0, &[set_heir(&heir, 30)], &[&cos], Opt::cosigner(cos.pubkey())));
    // Check-ins too.
    expect_code(env.execute_vault(&v, key_a0(), 1, &[check_in(&heir, 30)], &[], Opt::default()), vault_err(VaultError::MissingCosigner));

    // Inheriting needs neither the hash key nor the cosigner (an Ed25519 key the owner may have
    // taken with them): a stranger sends it, and it can only pay the heir.
    env.set_time(T0 + 30 * DAY);
    let stranger = env.new_funded_keypair(LAMPORTS_PER_SOL);
    unwrap_ok(env.inherit(&stranger, &v, &heir, &[]));
    assert_eq!(env.lamports(&heir), 2 * LAMPORTS_PER_SOL);
    assert!(sealed(&env, &v));
}

#[test]
fn inheritance_into_another_vault_stays_post_quantum() {
    // The heir's own Bunker vault: what is inherited lands at an address no Ed25519 key controls,
    // and only the heir vault's hash key can move it on.
    let (mut env, owner) = setup();
    let heir_vault = Vault::new(key_b0().root(), None);
    env.open(&heir_vault);
    env.transfer_sol(&owner.wallet, 2 * LAMPORTS_PER_SOL);
    let tm = create_mint(&mut env, SPL_TOKEN, MintKind::Plain, 9, 5_000);
    deposit_tokens(&mut env, &owner, &tm, 5_000);
    exec_ok(&mut env, &owner, 0, &[set_heir(&heir_vault.wallet, 30)]);

    env.set_time(T0 + 30 * DAY);
    let cranker = env.new_funded_keypair(LAMPORTS_PER_SOL);
    unwrap_ok(env.inherit(&cranker, &owner, &heir_vault.wallet, &[(&tm).into()]));
    let heir_ata = heir_vault.ata(&tm.mint, &SPL_TOKEN);
    assert_eq!(token_amount(&env, &heir_ata), 5_000);
    assert!(env.lamports(&heir_vault.wallet) >= 2 * LAMPORTS_PER_SOL);

    // The heir vault spends it with its own key.
    let out = new_keypair().pubkey();
    let (_, out_ata) = (out, create_ata(&mut env, &out, &tm));
    unwrap_ok(env.execute_inline(&heir_vault, key_b0(), 0, &[token(&tm.mint, &SPL_TOKEN, &out_ata, 5_000), sol(&out, LAMPORTS_PER_SOL)], &[], Opt::default()));
    assert_eq!(token_amount(&env, &out_ata), 5_000);
}

#[test]
fn heir_token_accounts_that_exist_are_used_and_missing_ones_created_by_the_caller() {
    let (mut env, v) = setup();
    let a = create_mint(&mut env, SPL_TOKEN, MintKind::Plain, 6, 1_000_000);
    let b = create_mint(&mut env, TOKEN_2022, MintKind::Plain, 6, 1_000_000);
    deposit_tokens(&mut env, &v, &a, 700);
    deposit_tokens(&mut env, &v, &b, 300);
    let heir = env.new_funded_keypair(LAMPORTS_PER_SOL).pubkey();
    // The heir already holds `a`.
    let heir_a = create_ata(&mut env, &heir, &a);
    transfer_tokens(&mut env, &a, &heir_a, 50);
    exec_ok(&mut env, &v, 0, &[set_heir(&heir, 30)]);

    env.set_time(T0 + 31 * DAY);
    let caller = env.new_funded_keypair(LAMPORTS_PER_SOL);
    let caller_before = env.lamports(&caller.pubkey());
    let heir_b = ata(&heir, &b.mint, &TOKEN_2022);
    assert!(env.account(&heir_b).is_none());
    unwrap_ok(env.inherit(&caller, &v, &heir, &[(&a).into(), (&b).into()]));
    assert_eq!(token_amount(&env, &heir_a), 750);
    assert_eq!(token_amount(&env, &heir_b), 300);
    // The caller paid for the heir's new Token-2022 account (and the fee), nothing more.
    let paid = caller_before - env.lamports(&caller.pubkey());
    let new_rent = env.lamports(&heir_b);
    assert!(paid >= new_rent && paid < new_rent + 50_000, "caller paid {paid}");
}

#[test]
fn withheld_transfer_fees_keep_the_vault_account_open_until_harvested() {
    let (mut env, v) = setup();
    let tm = create_mint(&mut env, TOKEN_2022, MintKind::TransferFee, 6, 100_000_000);
    let vault_ata = deposit_tokens(&mut env, &v, &tm, 10_000_000);
    let held = token_amount(&env, &vault_ata);
    let heir = new_keypair().pubkey();
    exec_ok(&mut env, &v, 0, &[set_heir(&heir, 30)]);
    env.set_time(T0 + 30 * DAY);
    let caller = env.new_funded_keypair(LAMPORTS_PER_SOL);

    // The whole balance moves (the heir receives it minus the mint's transfer fee); the vault's
    // account still holds the fee withheld from the deposit, so it stays open.
    unwrap_ok(env.inherit(&caller, &v, &heir, &[(&tm).into()]));
    let heir_ata = ata(&heir, &tm.mint, &TOKEN_2022);
    assert_eq!(token_amount(&env, &heir_ata), held - fee_of(held));
    assert_eq!(token_amount(&env, &vault_ata), 0);
    assert!(env.account(&vault_ata).is_some());

    // Harvesting is permissionless; the next inherit closes the account, rent to the heir.
    harvest_withheld(&mut env, &tm, &[&vault_ata]);
    let rent = env.lamports(&vault_ata);
    let before = env.lamports(&heir);
    unwrap_ok(env.inherit(&caller, &v, &heir, &[(&tm).into()]));
    assert!(env.account(&vault_ata).is_none());
    assert_eq!(env.lamports(&heir), before + rent);
}

#[test]
fn a_prefunded_heir_record_address_does_not_block_set_heir() {
    // Anyone can send lamports to the record's address before it exists (the classic way to make
    // a plain CreateAccount fail). SetHeir tops up, allocates and assigns instead.
    for donation in [RENT_MIN_0, HEIR_RECORD_RENT + 12_345] {
        let (mut env, v) = setup();
        let record = heir_pda(&v.state);
        let griefer = env.new_funded_keypair(LAMPORTS_PER_SOL);
        let ix = solana_system_interface::instruction::transfer(&griefer.pubkey(), &record, donation);
        let tx = env.build_tx(&griefer, &[ix], &[], 200_000);
        unwrap_ok(env.send_tx(tx));
        let heir = new_keypair().pubkey();
        exec_ok(&mut env, &v, 0, &[set_heir(&heir, 30)]);
        let h = env.heir(&v).unwrap();
        assert_eq!((h.heir, h.inactivity_days), (heir, 30));
        assert_eq!(env.lamports(&record), donation.max(HEIR_RECORD_RENT));
        // Every lamport in the record, the griefer's included, goes back to the vault on clear.
        exec_ok(&mut env, &v, 1, &[clear_heir(&heir)]);
        assert_eq!(env.lamports(&v.wallet), donation.max(HEIR_RECORD_RENT));
    }
}

#[test]
fn inheriting_an_empty_vault_still_seals_it() {
    let (mut env, v) = setup();
    let heir = new_keypair().pubkey();
    exec_ok(&mut env, &v, 0, &[set_heir(&heir, 30)]);
    env.set_time(T0 + 30 * DAY);
    let caller = env.new_funded_keypair(LAMPORTS_PER_SOL);
    unwrap_ok(env.inherit(&caller, &v, &heir, &[]));
    assert!(sealed(&env, &v));
    assert_eq!(env.lamports(&heir), 0);
}

// ================================================================================================
// Attacks
// ================================================================================================

/// Vault with 2 SOL and 1,000 units of an SPL token, heir set (30 days), clock past the deadline.
struct Due {
    env: Env,
    v: Vault,
    heir: Address,
    tm: TestMint,
    caller: Keypair,
}

fn due() -> Due {
    let (mut env, v) = setup();
    env.transfer_sol(&v.wallet, 2 * LAMPORTS_PER_SOL);
    let tm = create_mint(&mut env, SPL_TOKEN, MintKind::Plain, 6, 1_000_000);
    deposit_tokens(&mut env, &v, &tm, 1_000);
    let heir = new_keypair().pubkey();
    exec_ok(&mut env, &v, 0, &[set_heir(&heir, 30)]);
    env.set_time(T0 + 31 * DAY);
    let caller = env.new_funded_keypair(LAMPORTS_PER_SOL);
    Due { env, v, heir, tm, caller }
}

impl Due {
    fn send(&mut self, ix: solana_instruction::Instruction) -> litesvm::types::TransactionResult {
        let caller = self.caller.insecure_clone();
        let tx = self.env.build_tx(&caller, &[ix], &[], TEST_CU_LIMIT);
        self.env.send_tx(tx)
    }

    /// Nothing left the vault and it is not sealed.
    fn untouched(&self) {
        assert_eq!(self.env.lamports(&self.v.wallet), 2 * LAMPORTS_PER_SOL);
        assert_eq!(token_amount(&self.env, &self.v.ata(&self.tm.mint, &SPL_TOKEN)), 1_000);
        assert!(!sealed(&self.env, &self.v));
        assert_eq!(self.env.heir(&self.v).unwrap().inherited_at, 0);
    }
}

#[test]
fn inherit_only_pays_the_recorded_heir() {
    let mut d = due();
    let attacker = d.env.new_funded_keypair(LAMPORTS_PER_SOL);
    let a = attacker.pubkey();
    let tokens = [InheritToken::from(&d.tm)];
    // The attacker as the heir account (with their own token account as destination).
    let attacker_ata = create_ata(&mut d.env, &a, &d.tm);
    let ix = inherit_ix(&d.caller.pubkey(), &d.v, &a, &tokens);
    expect_code(d.send(ix), vault_err(VaultError::HeirMismatch));
    // The right heir account, but the attacker's token account as the destination.
    let mut r = inherit_remaining(&d.v, &d.heir, &tokens);
    r[3] = AccountMeta::new(attacker_ata, false);
    let ix = inherit_ix_raw(&d.caller.pubkey(), &d.v.state, &d.v.wallet, &heir_pda(&d.v.state), &d.heir, r);
    expect_code(d.send(ix), vault_err(VaultError::InvalidDestination));
    // A non-canonical token account that the heir does own.
    let side = new_keypair();
    let rent = d.env.svm.minimum_balance_for_rent_exemption(165);
    let ixs = [
        solana_system_interface::instruction::create_account(&d.env.payer_pk(), &side.pubkey(), rent, 165, &SPL_TOKEN),
        spl_token_2022_interface::instruction::initialize_account3(&SPL_TOKEN, &side.pubkey(), &d.tm.mint, &d.heir).unwrap(),
    ];
    d.env.send_ok(&ixs, &[&side]);
    let mut r = inherit_remaining(&d.v, &d.heir, &tokens);
    r[3] = AccountMeta::new(side.pubkey(), false);
    let ix = inherit_ix_raw(&d.caller.pubkey(), &d.v.state, &d.v.wallet, &heir_pda(&d.v.state), &d.heir, r);
    expect_code(d.send(ix), vault_err(VaultError::InvalidDestination));
    // The heir's account of another mint.
    let other = create_mint(&mut d.env, SPL_TOKEN, MintKind::Plain, 6, 10);
    let heir_other = create_ata(&mut d.env, &d.heir, &other);
    let mut r = inherit_remaining(&d.v, &d.heir, &tokens);
    r[3] = AccountMeta::new(heir_other, false);
    let ix = inherit_ix_raw(&d.caller.pubkey(), &d.v.state, &d.v.wallet, &heir_pda(&d.v.state), &d.heir, r);
    expect_code(d.send(ix), vault_err(VaultError::InvalidDestination));
    // The heir passed read-only (it must receive the SOL).
    let mut ix = inherit_ix(&d.caller.pubkey(), &d.v, &d.heir, &tokens);
    ix.accounts[4] = AccountMeta::new_readonly(d.heir, false);
    expect_code(d.send(ix), anchor_err(AnchorError::ConstraintMut));
    d.untouched();
    assert_eq!(token_amount(&d.env, &attacker_ata), 0);
    // And the honest call works.
    let tokens = [InheritToken::from(&d.tm)];
    let ix = inherit_ix(&d.caller.pubkey(), &d.v, &d.heir, &tokens);
    unwrap_ok(d.send(ix));
    assert_eq!(token_amount(&d.env, &ata(&d.heir, &d.tm.mint, &SPL_TOKEN)), 1_000);
}

#[test]
fn inherit_refuses_heir_token_accounts_the_heir_no_longer_owns() {
    // SPL Token lets an account's owner be reassigned. If the heir handed its canonical account to
    // someone else, inherit refuses it rather than pay that someone.
    let (mut env, v) = setup();
    let tm = create_mint(&mut env, SPL_TOKEN, MintKind::Plain, 6, 1_000_000);
    deposit_tokens(&mut env, &v, &tm, 500);
    let heir = env.new_funded_keypair(LAMPORTS_PER_SOL);
    let heir_ata = create_ata(&mut env, &heir.pubkey(), &tm);
    let other = new_keypair().pubkey();
    let ix = spl_token_2022_interface::instruction::set_authority(
        &SPL_TOKEN,
        &heir_ata,
        Some(&other),
        spl_token_2022_interface::instruction::AuthorityType::AccountOwner,
        &heir.pubkey(),
        &[],
    )
    .unwrap();
    env.send_ok(&[ix], &[&heir]);
    exec_ok(&mut env, &v, 0, &[set_heir(&heir.pubkey(), 30)]);
    env.set_time(T0 + 30 * DAY);
    let caller = env.new_funded_keypair(LAMPORTS_PER_SOL);
    expect_code(env.inherit(&caller, &v, &heir.pubkey(), &[(&tm).into()]), vault_err(VaultError::InvalidDestination));
    assert_eq!(token_amount(&env, &heir_ata), 0);
    assert!(!sealed(&env, &v));
}

#[test]
fn inherit_only_takes_the_vaults_canonical_token_accounts() {
    let mut d = due();
    let tokens = [InheritToken::from(&d.tm)];
    // A non-ATA token account owned by the vault's wallet.
    let side = new_keypair();
    let rent = d.env.svm.minimum_balance_for_rent_exemption(165);
    let ixs = [
        solana_system_interface::instruction::create_account(&d.env.payer_pk(), &side.pubkey(), rent, 165, &SPL_TOKEN),
        spl_token_2022_interface::instruction::initialize_account3(&SPL_TOKEN, &side.pubkey(), &d.tm.mint, &d.v.wallet).unwrap(),
    ];
    d.env.send_ok(&ixs, &[&side]);
    transfer_tokens(&mut d.env, &d.tm, &side.pubkey(), 10);
    let mut r = inherit_remaining(&d.v, &d.heir, &tokens);
    r[2] = AccountMeta::new(side.pubkey(), false);
    let ix = inherit_ix_raw(&d.caller.pubkey(), &d.v.state, &d.v.wallet, &heir_pda(&d.v.state), &d.heir, r);
    expect_code(d.send(ix), vault_err(VaultError::InvalidSourceAccount));
    // Someone else's token account as the source (the caller's own).
    let foreign = create_ata(&mut d.env, &d.caller.pubkey(), &d.tm);
    let mut r = inherit_remaining(&d.v, &d.heir, &tokens);
    r[2] = AccountMeta::new(foreign, false);
    let ix = inherit_ix_raw(&d.caller.pubkey(), &d.v.state, &d.v.wallet, &heir_pda(&d.v.state), &d.heir, r);
    expect_code(d.send(ix), vault_err(VaultError::InvalidSourceAccount));
    // The vault's token account read-only.
    let mut r = inherit_remaining(&d.v, &d.heir, &tokens);
    r[2] = AccountMeta::new_readonly(d.v.ata(&d.tm.mint, &SPL_TOKEN), false);
    let ix = inherit_ix_raw(&d.caller.pubkey(), &d.v.state, &d.v.wallet, &heir_pda(&d.v.state), &d.heir, r);
    expect_code(d.send(ix), vault_err(VaultError::AccountNotWritable));
    // Fake token programs and mints owned by the other token program.
    let mut r = inherit_remaining(&d.v, &d.heir, &tokens);
    r[0] = AccountMeta::new_readonly(MEMO_PROGRAM, false);
    let ix = inherit_ix_raw(&d.caller.pubkey(), &d.v.state, &d.v.wallet, &heir_pda(&d.v.state), &d.heir, r);
    expect_code(d.send(ix), vault_err(VaultError::InvalidTokenProgram));
    // The other token program: the vault has no account there (its ATA for that program is empty
    // of data), so the source check refuses before the mint is even read.
    let wrong_program = [InheritToken { mint: d.tm.mint, token_program: TOKEN_2022 }];
    let ix = inherit_ix(&d.caller.pubkey(), &d.v, &d.heir, &wrong_program);
    expect_code(d.send(ix), vault_err(VaultError::InvalidSourceAccount));
    // A mint account that is not the token program's (forged here: a real one can't change owner).
    let original = d.env.svm.get_account(&d.tm.mint).unwrap();
    let mut forged = original.clone();
    forged.owner = TOKEN_2022;
    d.env.svm.set_account(d.tm.mint, forged).unwrap();
    let ix = inherit_ix(&d.caller.pubkey(), &d.v, &d.heir, &tokens);
    expect_code(d.send(ix), vault_err(VaultError::InvalidMintOwner));
    d.env.svm.set_account(d.tm.mint, original).unwrap();
    // An incomplete group and the same token account twice.
    let mut r = inherit_remaining(&d.v, &d.heir, &tokens);
    r.pop();
    let ix = inherit_ix_raw(&d.caller.pubkey(), &d.v.state, &d.v.wallet, &heir_pda(&d.v.state), &d.heir, r);
    expect_code(d.send(ix), vault_err(VaultError::NotEnoughAccounts));
    let ix = inherit_ix(&d.caller.pubkey(), &d.v, &d.heir, &[tokens[0], tokens[0]]);
    expect_code(d.send(ix), vault_err(VaultError::InvalidSourceAccount));
    d.untouched();
}

#[test]
fn another_vaults_heir_record_is_refused() {
    // Vault B names the attacker with a short countdown that has run out; vault A's own heir is
    // not due. B's record must not open A.
    let (mut env, a) = setup();
    env.transfer_sol(&a.wallet, 2 * LAMPORTS_PER_SOL);
    let b = Vault::new(key_b0().root(), None);
    env.open(&b);
    let attacker = env.new_funded_keypair(LAMPORTS_PER_SOL);
    let heir_a = new_keypair().pubkey();
    exec_ok(&mut env, &a, 0, &[set_heir(&heir_a, 3650)]);
    unwrap_ok(env.execute_vault(&b, key_b0(), 0, &[set_heir(&attacker.pubkey(), 30)], &[], Opt::default()));
    env.set_time(T0 + 30 * DAY);

    let ix = inherit_ix_raw(&attacker.pubkey(), &a.state, &a.wallet, &heir_pda(&b.state), &attacker.pubkey(), vec![]);
    let tx = env.build_tx(&attacker, &[ix], &[], TEST_CU_LIMIT);
    expect_code(env.send_tx(tx), vault_err(VaultError::InvalidHeirAccount));
    // B's wallet with A's state, or the other way round.
    let ix = inherit_ix_raw(&attacker.pubkey(), &a.state, &b.wallet, &heir_pda(&b.state), &attacker.pubkey(), vec![]);
    let tx = env.build_tx(&attacker, &[ix], &[], TEST_CU_LIMIT);
    expect_code(env.send_tx(tx), vault_err(VaultError::InvalidWalletPda));
    // Inside A's execute: a check-in or clear aimed at B's record.
    let payload = encode_actions(&[check_in(&attacker.pubkey(), 30)]);
    let sig = sign_execute(key_a0(), &a, 0, 1, &payload);
    let ix = execute_ix(&env.payer_pk(), &a, Opt::default(), 1, &payload, Some(&sig), vec![AccountMeta::new(heir_pda(&b.state), false)]);
    expect_code(env.send(&[ix], &[]), vault_err(VaultError::InvalidHeirAccount));
    // A SetHeir pointed at B's record address.
    let payload = encode_actions(&[set_heir(&heir_a, 30)]);
    let sig = sign_execute(key_a0(), &a, 0, 1, &payload);
    let r = vec![AccountMeta::new(heir_pda(&b.state), false), AccountMeta::new_readonly(heir_a, false)];
    let ix = execute_ix(&env.payer_pk(), &a, Opt::default(), 1, &payload, Some(&sig), r);
    expect_code(env.send(&[ix], &[]), vault_err(VaultError::InvalidHeirAccount));

    assert_eq!(env.lamports(&a.wallet), 2 * LAMPORTS_PER_SOL);
    assert!(!sealed(&env, &a));
    // B itself is due and pays its own heir.
    unwrap_ok(env.inherit(&attacker, &b, &attacker.pubkey(), &[]));
}

#[test]
fn forged_heir_records_are_refused() {
    let mut d = due();
    let real = d.env.svm.get_account(&heir_pda(&d.v.state)).unwrap();
    let attacker = new_keypair().pubkey();
    // A program-owned copy at another address, naming the attacker with an expired deadline.
    let mut forged = real.clone();
    forged.data[44..76].copy_from_slice(attacker.as_ref());
    forged.data[84..92].copy_from_slice(&0i64.to_le_bytes());
    let fake = Address::new_unique();
    d.env.svm.set_account(fake, forged.clone()).unwrap();
    let ix = inherit_ix_raw(&d.caller.pubkey(), &d.v.state, &d.v.wallet, &fake, &attacker, vec![]);
    expect_code(d.send(ix), vault_err(VaultError::InvalidHeirAccount));
    // The same bytes owned by the System Program.
    let mut sys = forged.clone();
    sys.owner = SYSTEM_PROGRAM;
    d.env.svm.set_account(fake, sys).unwrap();
    let ix = inherit_ix_raw(&d.caller.pubkey(), &d.v.state, &d.v.wallet, &fake, &attacker, vec![]);
    expect_code(d.send(ix), vault_err(VaultError::InvalidHeirAccount));
    // Wrong discriminator / size / version at the real address (as if the layout were corrupted).
    let corruptions: [fn(&mut Vec<u8>); 3] = [|x| x[0] ^= 1, |x| x.push(0), |x| x[8] = 2];
    for corrupt in corruptions {
        let mut acc = real.clone();
        corrupt(&mut acc.data);
        d.env.svm.set_account(heir_pda(&d.v.state), acc).unwrap();
        let ix = inherit_ix(&d.caller.pubkey(), &d.v, &d.heir, &[]);
        expect_code(d.send(ix), vault_err(VaultError::InvalidHeirAccount));
    }
    d.env.svm.set_account(heir_pda(&d.v.state), real).unwrap();
    // The vault's state, a signature buffer or the wallet in the record slot.
    for slot in [d.v.state, d.v.wallet] {
        let ix = inherit_ix_raw(&d.caller.pubkey(), &d.v.state, &d.v.wallet, &slot, &d.heir, vec![]);
        expect_code(d.send(ix), vault_err(VaultError::InvalidHeirAccount));
    }
    d.untouched();
}

#[test]
fn inherit_without_an_heir_or_on_a_closed_vault_fails() {
    // No record at all.
    let (mut env, v) = setup();
    env.transfer_sol(&v.wallet, LAMPORTS_PER_SOL);
    let caller = env.new_funded_keypair(LAMPORTS_PER_SOL);
    let anyone = new_keypair().pubkey();
    expect_code(env.inherit(&caller, &v, &anyone, &[]), vault_err(VaultError::HeirNotSet));
    assert_eq!(env.lamports(&v.wallet), LAMPORTS_PER_SOL);
    assert!(!sealed(&env, &v));

    // A record left behind by a vault closed without clearing it (the clients refuse to do this).
    let heir = new_keypair().pubkey();
    exec_ok(&mut env, &v, 0, &[set_heir(&heir, 30)]);
    let rent_to = env.payer_pk();
    let sig = sign_close(key_a0(), &v, 0, 1, &rent_to);
    env.send_ok(&[close_vault_ix(&env.payer_pk(), &v, Opt::default(), 1, &rent_to, Some(&sig))], &[]);
    env.set_time(T0 + 365 * DAY);
    expect_code(env.inherit(&caller, &v, &heir, &[]), vault_err(VaultError::VaultClosed));
}

#[test]
fn inherit_refuses_transfer_hook_mints_but_moves_the_rest() {
    let mut d = due();
    let hook = create_mint(&mut d.env, TOKEN_2022, MintKind::TransferHook, 6, 0);
    let vault_hook = create_ata(&mut d.env, &d.v.wallet, &hook);
    mint_to(&mut d.env, &hook, &vault_hook, 77);
    let ix = inherit_ix(&d.caller.pubkey(), &d.v, &d.heir, &[(&d.tm).into(), (&hook).into()]);
    expect_code(d.send(ix), vault_err(VaultError::TransferHookNotSupported));
    d.untouched();
    // Without the hook mint everything else goes through; the hook tokens stay where they are.
    let ix = inherit_ix(&d.caller.pubkey(), &d.v, &d.heir, &[(&d.tm).into()]);
    unwrap_ok(d.send(ix));
    assert_eq!(token_amount(&d.env, &vault_hook), 77);
    assert_eq!(token_amount(&d.env, &ata(&d.heir, &d.tm.mint, &SPL_TOKEN)), 1_000);
}

#[test]
fn inherit_account_checks() {
    let mut d = due();
    // Wrong wallet, the caller not signing, the ATA program swapped.
    let ix = inherit_ix_raw(&d.caller.pubkey(), &d.v.state, &d.heir, &heir_pda(&d.v.state), &d.heir, vec![]);
    expect_code(d.send(ix), vault_err(VaultError::InvalidWalletPda));
    let mut ix = inherit_ix(&d.caller.pubkey(), &d.v, &d.heir, &[]);
    let stranger = new_keypair().pubkey();
    ix.accounts[0] = AccountMeta::new(stranger, false);
    expect_code(d.send(ix), anchor_err(AnchorError::AccountNotSigner));
    let mut ix = inherit_ix(&d.caller.pubkey(), &d.v, &d.heir, &[]);
    ix.accounts[6] = AccountMeta::new_readonly(MEMO_PROGRAM, false);
    expect_code(d.send(ix), anchor_err(AnchorError::ConstraintAddress));
    // The state read-only (the seal writes it).
    let mut ix = inherit_ix(&d.caller.pubkey(), &d.v, &d.heir, &[]);
    ix.accounts[1] = AccountMeta::new_readonly(d.v.state, false);
    expect_code(d.send(ix), anchor_err(AnchorError::ConstraintMut));
    d.untouched();
}

#[test]
fn replaying_heir_signatures_and_inherit_transactions() {
    let (mut env, v) = setup();
    env.transfer_sol(&v.wallet, LAMPORTS_PER_SOL);
    let heir = new_keypair().pubkey();
    let attacker = new_keypair().pubkey();
    let actions = [set_heir(&heir, 30)];
    let payload = encode_actions(&actions);
    let sig = sign_execute(key_a0(), &v, 0, 0, &payload);
    let ix = execute_ix(&env.payer_pk(), &v, Opt::default(), 0, &payload, Some(&sig), remaining_for_vault(&v, &actions));
    // The signature names its heir: swapping it (and the account) breaks the signature.
    let evil = [set_heir(&attacker, 30)];
    let evil_ix = execute_ix(&env.payer_pk(), &v, Opt::default(), 0, &encode_actions(&evil), Some(&sig), remaining_for_vault(&v, &evil));
    expect_code(env.send(&[evil_ix], &[]), vault_err(VaultError::InvalidSignature));
    // Same signature, attacker as the heir account: refused before anything is written.
    let mut r = remaining_for_vault(&v, &actions);
    r[1] = AccountMeta::new_readonly(attacker, false);
    let swapped = execute_ix(&env.payer_pk(), &v, Opt::default(), 0, &payload, Some(&sig), r);
    expect_code(env.send(&[swapped], &[]), vault_err(VaultError::AccountMismatch));
    env.send_ok(&[ix.clone()], &[]);
    // Replayed later (to restart a countdown, say): the leaf is spent.
    env.set_time(T0 + 29 * DAY);
    expect_code(env.send(&[ix], &[]), vault_err(VaultError::LeafAlreadyUsed));
    assert_eq!(env.heir(&v).unwrap().deadline, T0 + 30 * DAY);

    // A check-in signed for leaf 1 can't be used at another leaf or for another vault.
    let ci = [check_in(&heir, 30)];
    let payload = encode_actions(&ci);
    let sig = sign_execute(key_a0(), &v, 0, 1, &payload);
    let at2 = execute_ix(&env.payer_pk(), &v, Opt::default(), 2, &payload, Some(&sig), remaining_for_vault(&v, &ci));
    expect_code(env.send(&[at2], &[]), vault_err(VaultError::LeafMismatch));

    // Inherit: the identical transaction twice is a duplicate; a second call is harmless.
    env.set_time(T0 + 30 * DAY);
    let caller = env.new_funded_keypair(LAMPORTS_PER_SOL);
    let ix = inherit_ix(&caller.pubkey(), &v, &heir, &[]);
    let tx = env.build_tx(&caller, &[ix], &[], TEST_CU_LIMIT);
    unwrap_ok(env.send_tx(tx.clone()));
    unwrap_err(env.send_tx(tx));
    unwrap_ok(env.inherit(&caller, &v, &heir, &[]));
    assert_eq!(env.lamports(&heir), LAMPORTS_PER_SOL);
}

#[test]
fn set_heir_account_and_value_rules() {
    let (mut env, v) = setup();
    env.transfer_sol(&v.wallet, LAMPORTS_PER_SOL);
    // The vault's own accounts as the heir.
    for own in [v.wallet, v.state, heir_pda(&v.state)] {
        exec_err(&mut env, &v, 0, &[set_heir(&own, 30)], VaultError::AliasedAccount);
    }
    // Not a wallet: a token account, a mint, a program, a Bunker account.
    let tm = create_mint(&mut env, SPL_TOKEN, MintKind::Plain, 6, 10);
    let payer = env.payer_pk();
    let token_account = create_ata(&mut env, &payer, &tm);
    let other = Vault::new(key_b0().root(), None);
    env.open(&other);
    for bad in [token_account, tm.mint, SPL_TOKEN, PROGRAM_ID, MEMO_PROGRAM, other.state] {
        exec_err(&mut env, &v, 0, &[set_heir(&bad, 30)], VaultError::InvalidHeir);
    }
    // The heir account differs from the signed heir; the record is not the PDA or read-only.
    let heir = new_keypair().pubkey();
    let actions = [set_heir(&heir, 30)];
    let payload = encode_actions(&actions);
    let sig = sign_execute(key_a0(), &v, 0, 0, &payload);
    let send = |env: &mut Env, r: Vec<AccountMeta>| {
        let ix = execute_ix(&env.payer_pk(), &v, Opt::default(), 0, &payload, Some(&sig), r);
        env.send(&[ix], &[])
    };
    let mut r = remaining_for_vault(&v, &actions);
    r[1] = AccountMeta::new_readonly(new_keypair().pubkey(), false);
    expect_code(send(&mut env, r), vault_err(VaultError::AccountMismatch));
    let mut r = remaining_for_vault(&v, &actions);
    r[0] = AccountMeta::new(Address::new_unique(), false);
    expect_code(send(&mut env, r), vault_err(VaultError::InvalidHeirAccount));
    let mut r = remaining_for_vault(&v, &actions);
    r[0] = AccountMeta::new_readonly(heir_pda(&v.state), false);
    expect_code(send(&mut env, r), vault_err(VaultError::AccountNotWritable));
    let mut r = remaining_for_vault(&v, &actions);
    r.pop();
    expect_code(send(&mut env, r), vault_err(VaultError::NotEnoughAccounts));
    let mut r = remaining_for_vault(&v, &actions);
    r.push(AccountMeta::new(heir, false));
    expect_code(send(&mut env, r), vault_err(VaultError::TooManyAccounts));
    // Values the encoder refuses: out-of-range periods and the all-zero heir.
    for bad in [
        Action::SetHeir { heir: heir.to_bytes(), inactivity_days: 29 },
        Action::SetHeir { heir: heir.to_bytes(), inactivity_days: 3651 },
        Action::SetHeir { heir: [0; 32], inactivity_days: 30 },
        Action::CheckIn { heir: heir.to_bytes(), inactivity_days: 0 },
    ] {
        let payload = encode_actions(&[bad]);
        let sig = sign_execute(key_a0(), &v, 0, 0, &payload);
        let ix = execute_ix(&env.payer_pk(), &v, Opt::default(), 0, &payload, Some(&sig), remaining_for_vault(&v, &[bad]));
        expect_code(env.send(&[ix], &[]), vault_err(VaultError::InvalidPayload));
    }
    assert!(env.heir(&v).is_none());
    assert_eq!(env.state(&v).next_leaf, 0);
    // The honest SetHeir still works.
    expect_code(send(&mut env, vec![]), vault_err(VaultError::NotEnoughAccounts));
    exec_ok(&mut env, &v, 0, &actions);
}

#[test]
fn check_in_and_clear_must_name_the_recorded_heir() {
    let (mut env, v) = setup();
    let heir = new_keypair().pubkey();
    let other = new_keypair().pubkey();
    exec_ok(&mut env, &v, 0, &[set_heir(&heir, 365)]);
    exec_err(&mut env, &v, 1, &[check_in(&other, 365)], VaultError::HeirRecordMismatch);
    exec_err(&mut env, &v, 1, &[check_in(&heir, 364)], VaultError::HeirRecordMismatch);
    exec_err(&mut env, &v, 1, &[clear_heir(&other)], VaultError::HeirRecordMismatch);
    // Read-only record.
    let ci = [check_in(&heir, 365)];
    let payload = encode_actions(&ci);
    let sig = sign_execute(key_a0(), &v, 0, 1, &payload);
    let ix = execute_ix(&env.payer_pk(), &v, Opt::default(), 1, &payload, Some(&sig), vec![AccountMeta::new_readonly(heir_pda(&v.state), false)]);
    expect_code(env.send(&[ix], &[]), vault_err(VaultError::AccountNotWritable));
    assert_eq!(env.heir(&v).unwrap().deadline, T0 + 365 * DAY);
    assert_eq!(env.state(&v).next_leaf, 1);
}

#[test]
fn an_inherited_record_never_changes_even_if_the_leaf_check_were_bypassed() {
    // Defence in depth: after the seal the leaf rules already stop every signature. Forge the
    // vault back to next_leaf 0 (impossible on chain) and the heir actions still refuse.
    let mut d = due();
    let ix = inherit_ix(&d.caller.pubkey(), &d.v, &d.heir, &[(&d.tm).into()]);
    unwrap_ok(d.send(ix));
    let mut acc: Account = d.env.svm.get_account(&d.v.state).unwrap();
    let off = 8 + 1 + 1 + 1 + 32 + 48 + 4;
    acc.data[off..off + 4].copy_from_slice(&0u32.to_le_bytes());
    d.env.svm.set_account(d.v.state, acc).unwrap();
    assert_eq!(d.env.state(&d.v).next_leaf, 0);
    let heir = d.heir;
    for (leaf, a) in [(1u32, check_in(&heir, 30)), (2, set_heir(&heir, 365)), (3, clear_heir(&heir))] {
        exec_err(&mut d.env, &d.v, leaf, &[a], VaultError::VaultInherited);
    }
}

#[test]
fn an_heir_address_that_stopped_being_a_wallet_is_refused_and_the_vault_stays_open() {
    // SetHeir accepted an address with no account; later someone turns it into a token account or
    // a program's account. inherit must not pay into it, and must not seal the vault.
    let mut d = due();
    let heir = d.heir;
    let rent = d.env.svm.minimum_balance_for_rent_exemption(165);
    // A token account, another program's account, one of Bunker's own accounts.
    for owner in [SPL_TOKEN, MEMO_PROGRAM, PROGRAM_ID] {
        let acc = Account { lamports: rent, data: vec![0; 165], owner, executable: false, rent_epoch: 0 };
        d.env.svm.set_account(heir, acc).unwrap();
        let ix = inherit_ix(&d.caller.pubkey(), &d.v, &heir, &[(&d.tm).into()]);
        expect_code(d.send(ix), vault_err(VaultError::InvalidHeir));
        d.untouched();
    }
    // A system account with data (a nonce account) is still a wallet.
    let nonce_like = Account { lamports: rent, data: vec![0; 80], owner: SYSTEM_PROGRAM, executable: false, rent_epoch: 0 };
    d.env.svm.set_account(heir, nonce_like).unwrap();
    let ix = inherit_ix(&d.caller.pubkey(), &d.v, &heir, &[]);
    let tx = d.env.build_tx(&d.caller.insecure_clone(), &[ix], &[], TEST_CU_LIMIT);
    let sim = d.env.svm.simulate_transaction(tx);
    assert!(sim.is_ok(), "a system account with data is a valid heir: {sim:?}");
    // Back to the token-account case: the owner, still around, names another heir (the vault was
    // never sealed) and everything goes there instead.
    let acc = Account { lamports: rent, data: vec![0; 165], owner: SPL_TOKEN, executable: false, rent_epoch: 0 };
    d.env.svm.set_account(heir, acc).unwrap();
    let other = new_keypair().pubkey();
    exec_ok(&mut d.env, &d.v, 1, &[set_heir(&other, 30)]);
    d.env.set_time(T0 + 62 * DAY);
    let ix = inherit_ix(&d.caller.pubkey(), &d.v, &other, &[(&d.tm).into()]);
    unwrap_ok(d.send(ix));
    assert_eq!(token_amount(&d.env, &ata(&other, &d.tm.mint, &SPL_TOKEN)), 1_000);
    assert!(sealed(&d.env, &d.v));
}

#[test]
fn empty_vault_token_accounts_close_straight_to_the_heir() {
    // An emptied vault account needs no heir account (the caller pays for nothing that receives
    // nothing), and closing runs no hook, so even a transfer-hook mint's empty account closes.
    let mut d = due();
    let hook = create_mint(&mut d.env, TOKEN_2022, MintKind::TransferHook, 6, 0);
    let empty_hook = create_ata(&mut d.env, &d.v.wallet, &hook);
    let plain = create_mint(&mut d.env, SPL_TOKEN, MintKind::Plain, 6, 0);
    let empty_plain = create_ata(&mut d.env, &d.v.wallet, &plain);
    let rent_hook = d.env.lamports(&empty_hook);
    let rent_plain = d.env.lamports(&empty_plain);
    let rent_tm = d.env.lamports(&d.v.ata(&d.tm.mint, &SPL_TOKEN));
    let caller = d.caller.pubkey();
    let caller_before = d.env.lamports(&caller);
    let ix = inherit_ix(&caller, &d.v, &d.heir, &[(&d.tm).into(), (&hook).into(), (&plain).into()]);
    unwrap_ok(d.send(ix));
    assert_eq!(d.env.lamports(&empty_hook), 0);
    assert_eq!(d.env.lamports(&empty_plain), 0);
    assert_eq!(d.env.lamports(&ata(&d.heir, &hook.mint, &TOKEN_2022)), 0, "no heir account for an empty one");
    assert_eq!(d.env.lamports(&ata(&d.heir, &plain.mint, &SPL_TOKEN)), 0, "no heir account for an empty one");
    let heir_ata = ata(&d.heir, &d.tm.mint, &SPL_TOKEN);
    assert_eq!(token_amount(&d.env, &heir_ata), 1_000);
    // The heir gets the SOL and every closed account's rent; the caller paid one heir account and fees.
    assert_eq!(d.env.lamports(&d.heir), 2 * LAMPORTS_PER_SOL + rent_hook + rent_plain + rent_tm);
    let paid = caller_before - d.env.lamports(&caller) - d.env.lamports(&heir_ata);
    assert!((5_000..10_000).contains(&paid), "caller paid {paid} lamports beyond the heir account's rent");
}
