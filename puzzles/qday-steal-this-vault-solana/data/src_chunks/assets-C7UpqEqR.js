var e=`//! Asset coverage: SOL, SPL Token, Token-2022 (pump.fun-style metadata mint, transfer-fee mint,
//! transfer-hook mint), standard NFT.

use bunker::errors::VaultError;
use solana_signer::Signer;
use spl_token_2022_interface::extension::{
    metadata_pointer::MetadataPointer, BaseStateWithExtensions, StateWithExtensions,
};

use crate::common::*;

/// Partial withdrawal, full withdrawal, then close the vault's ATA.
fn withdraw_partial_full_close(env: &mut Env, v: &Vault, tm: &TestMint, deposit: u64, first_leaf: u32) {
    let vault_ata = deposit_tokens(env, v, tm, deposit);
    assert_eq!(token_amount(env, &vault_ata), deposit);
    let (owner, dest) = new_destination(env, tm);

    let part = deposit / 4;
    env.execute_ok(v, key_a0(), first_leaf, &[token(&tm.mint, &tm.program, &dest, part)]);
    assert_eq!(token_amount(env, &vault_ata), deposit - part);
    assert_eq!(token_amount(env, &dest), part);

    let rest = deposit - part;
    let ata_rent = env.lamports(&vault_ata);
    env.execute_ok(
        v,
        key_a0(),
        first_leaf + 1,
        &[token(&tm.mint, &tm.program, &dest, rest), close_ata(&tm.mint, &tm.program, &owner)],
    );
    assert_eq!(token_amount(env, &dest), deposit);
    assert!(env.account(&vault_ata).is_none());
    assert_eq!(env.lamports(&owner), ata_rent);
}

#[test]
fn spl_token_deposit_withdraw_close() {
    let mut env = Env::new();
    let v = Vault::new(key_a0().root(), None);
    env.open(&v);
    let tm = create_mint(&mut env, SPL_TOKEN, MintKind::Plain, 9, 10_000_000_000);
    withdraw_partial_full_close(&mut env, &v, &tm, 4_000_000_000, 0);
    assert_eq!(env.state(&v).next_leaf, 2);
}

#[test]
fn token_2022_plain_deposit_withdraw_close() {
    let mut env = Env::new();
    let v = Vault::new(key_a0().root(), None);
    env.open(&v);
    let tm = create_mint(&mut env, TOKEN_2022, MintKind::Plain, 6, 10_000_000);
    withdraw_partial_full_close(&mut env, &v, &tm, 8_000_000, 0);
}

#[test]
fn token_2022_pump_fun_style_mint() {
    let mut env = Env::new();
    let v = Vault::new(key_a0().root(), None);
    env.open(&v);
    let tm = create_mint(&mut env, TOKEN_2022, MintKind::PumpLike, 6, 1_000_000_000_000_000);

    // Configured like pump.fun: metadata pointer to itself + metadata, no mint / freeze authority.
    let acc = env.svm.get_account(&tm.mint).unwrap();
    assert_eq!(acc.owner, TOKEN_2022);
    let m = StateWithExtensions::<spl_token_2022_interface::state::Mint>::unpack(&acc.data).unwrap();
    assert!(m.base.mint_authority.is_none());
    assert!(m.base.freeze_authority.is_none());
    let ptr = m.get_extension::<MetadataPointer>().unwrap();
    assert_eq!(Option::<solana_address::Address>::from(ptr.metadata_address), Some(tm.mint));
    let md = m.get_variable_len_extension::<spl_token_metadata_interface::state::TokenMetadata>().unwrap();
    assert_eq!(md.symbol, "BUNKER");

    withdraw_partial_full_close(&mut env, &v, &tm, 123_456_789_000_000, 0);
}

#[test]
fn token_2022_transfer_fee_mint() {
    let mut env = Env::new();
    let v = Vault::new(key_a0().root(), None);
    env.open(&v);
    let tm = create_mint(&mut env, TOKEN_2022, MintKind::TransferFee, 6, 100_000_000);

    // The deposit pays the 1% fee; it is withheld on the vault's ATA.
    let deposit = 10_000_000;
    let vault_ata = deposit_tokens(&mut env, &v, &tm, deposit);
    let received = deposit - fee_of(deposit);
    assert_eq!(token_amount(&env, &vault_ata), received);

    let (owner, dest) = new_destination(&mut env, &tm);
    // Partial: the destination receives amount minus the fee.
    env.execute_ok(&v, key_a0(), 0, &[token(&tm.mint, &TOKEN_2022, &dest, 1_000_000)]);
    assert_eq!(token_amount(&env, &dest), 1_000_000 - fee_of(1_000_000));

    // Full withdrawal.
    let rest = token_amount(&env, &vault_ata);
    env.execute_ok(&v, key_a0(), 1, &[token(&tm.mint, &TOKEN_2022, &dest, rest)]);
    assert_eq!(token_amount(&env, &vault_ata), 0);

    // Closing needs the withheld fee harvested first (the token program refuses otherwise);
    // harvesting is permissionless and needs no vault signature.
    let close = [close_ata(&tm.mint, &TOKEN_2022, &owner)];
    unwrap_err(env.execute_inline(&v, key_a0(), 2, &close, &[], Opt::default()));
    assert_eq!(env.state(&v).next_leaf, 2);
    harvest_withheld(&mut env, &tm, &[&vault_ata]);
    env.execute_ok(&v, key_a0(), 3, &close);
    assert!(env.account(&vault_ata).is_none());
}

#[test]
fn token_2022_transfer_hook_mint_fails_cleanly() {
    let mut env = Env::new();
    let v = Vault::new(key_a0().root(), None);
    env.open(&v);
    let tm = create_mint(&mut env, TOKEN_2022, MintKind::TransferHook, 6, 0);
    // A plain deposit would need the hook's extra accounts (the app blocks these mints), so mint
    // straight into the vault's ATA to simulate tokens that ended up there anyway.
    let vault_ata = create_ata(&mut env, &v.wallet, &tm);
    mint_to(&mut env, &tm, &vault_ata, 5_000_000);
    let (_, dest) = new_destination(&mut env, &tm);

    expect_code(
        env.execute_inline(&v, key_a0(), 0, &[token(&tm.mint, &TOKEN_2022, &dest, 1_000_000)], &[], Opt::default()),
        vault_err(VaultError::TransferHookNotSupported),
    );
    assert_eq!(env.state(&v).next_leaf, 0, "failed transfer does not consume the leaf");
    assert_eq!(token_amount(&env, &vault_ata), 5_000_000);
}

#[test]
fn standard_nft_withdraw_and_close() {
    let mut env = Env::new();
    let v = Vault::new(key_a0().root(), None);
    env.open(&v);
    let nft = create_nft(&mut env);
    let acc = env.svm.get_account(&nft.mint).unwrap();
    let m = StateWithExtensions::<spl_token_2022_interface::state::Mint>::unpack(&acc.data).unwrap();
    assert_eq!((m.base.decimals, m.base.supply), (0, 1));
    assert!(m.base.mint_authority.is_none());

    let vault_ata = deposit_tokens(&mut env, &v, &nft, 1);
    let (owner, dest) = new_destination(&mut env, &nft);
    env.execute_ok(&v, key_a0(), 0, &[token(&nft.mint, &SPL_TOKEN, &dest, 1), close_ata(&nft.mint, &SPL_TOKEN, &owner)]);
    assert_eq!(token_amount(&env, &dest), 1);
    assert!(env.account(&vault_ata).is_none());
}

#[test]
fn mixed_assets_in_one_execute() {
    let mut env = Env::new();
    let v = Vault::new(key_a0().root(), None);
    env.open(&v);
    env.transfer_sol(&v.wallet, 3 * LAMPORTS_PER_SOL);
    let spl = create_mint(&mut env, SPL_TOKEN, MintKind::Plain, 6, 1_000_000);
    let t22 = create_mint(&mut env, TOKEN_2022, MintKind::PumpLike, 6, 1_000_000);
    let nft = create_nft(&mut env);
    deposit_tokens(&mut env, &v, &spl, 1_000_000);
    deposit_tokens(&mut env, &v, &t22, 1_000_000);
    deposit_tokens(&mut env, &v, &nft, 1);
    let user = new_keypair().pubkey();
    let (_, d_spl) = (user, create_ata(&mut env, &user, &spl));
    let d_t22 = create_ata(&mut env, &user, &t22);
    let d_nft = create_ata(&mut env, &user, &nft);

    let actions = [
        token(&spl.mint, &SPL_TOKEN, &d_spl, 1_000_000),
        token(&t22.mint, &TOKEN_2022, &d_t22, 1_000_000),
        token(&nft.mint, &SPL_TOKEN, &d_nft, 1),
        close_ata(&spl.mint, &SPL_TOKEN, &user),
        close_ata(&t22.mint, &TOKEN_2022, &user),
        close_ata(&nft.mint, &SPL_TOKEN, &user),
        sol(&user, 3 * LAMPORTS_PER_SOL),
    ];
    let meta = env.execute_ok(&v, key_a0(), 0, &actions);
    assert_events(&meta, "ActionExecuted", 7);
    assert_eq!(env.lamports(&v.wallet), 0);
    assert_eq!(token_amount(&env, &d_spl), 1_000_000);
    assert_eq!(token_amount(&env, &d_t22), 1_000_000);
    assert_eq!(token_amount(&env, &d_nft), 1);
}
`;export{e as default};