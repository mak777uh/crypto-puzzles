use anchor_lang::prelude::*;
use bunker_core::IxTag;

use crate::auth::{check_wallet, load_vault, verify_authorization, AuthRequest};
use crate::errors::VaultError;
use crate::events::VaultClosed;
use crate::state::{SigBuffer, VaultTombstone, WALLET_SEED};

#[derive(Accounts)]
pub struct CloseVault<'info> {
    #[account(mut)]
    pub fee_payer: Signer<'info>,

    /// CHECK: loaded and validated by `auth::load_vault`; rewritten as a `VaultTombstone`.
    #[account(mut)]
    pub state: UncheckedAccount<'info>,

    /// Every lamport it holds is swept to `rent_to` (system transfer signed by the wallet PDA).
    /// CHECK: re-derived from `state` (`auth::check_wallet`).
    #[account(mut)]
    pub wallet: UncheckedAccount<'info>,

    /// Receives the wallet's lamports and the state account's excess rent.
    /// CHECK: must equal the signed `rent_to`.
    #[account(mut)]
    pub rent_to: UncheckedAccount<'info>,

    pub cosigner: Option<Signer<'info>>,

    #[account(mut)]
    pub sig_buffer: Option<Account<'info, SigBuffer>>,

    pub system_program: Program<'info, System>,
}

pub fn close_vault_handler<'info>(
    ctx: Context<'info, CloseVault<'info>>,
    leaf_index: u32,
    rent_to: Pubkey,
    sig: Option<Vec<u8>>,
) -> Result<()> {
    let program_id = ctx.program_id;
    let accs = &ctx.accounts;
    require!(ctx.remaining_accounts.is_empty(), VaultError::TooManyAccounts);
    let state_info = accs.state.to_account_info();
    let state_key = state_info.key();
    let wallet_info = accs.wallet.to_account_info();
    let rent_to_info = accs.rent_to.to_account_info();

    let vs = load_vault(&state_info, program_id)?;
    check_wallet(wallet_info.key, &state_key, &vs, program_id)?;

    require_keys_eq!(*rent_to_info.key, rent_to, VaultError::AccountMismatch);
    require_keys_neq!(rent_to, *wallet_info.key, VaultError::AliasedAccount);
    require_keys_neq!(rent_to, state_key, VaultError::AliasedAccount);
    if let Some(buf) = accs.sig_buffer.as_ref() {
        require_keys_neq!(rent_to, buf.key(), VaultError::AliasedAccount);
    }

    verify_authorization(
        &vs,
        &AuthRequest {
            program_id,
            state: &state_key,
            fee_payer: accs.fee_payer.key,
            cosigner: accs.cosigner.as_ref().map(|c| c.key),
            tag: IxTag::Close,
            leaf_index,
            payload: rent_to.as_ref(),
            sig: sig.as_deref(),
            sig_buffer: accs.sig_buffer.as_ref(),
        },
    )?;

    // Sweep the wallet (a data-less system account) to the signed `rent_to`, so a dust deposit
    // can never block the close. After this the wallet holds 0 lamports and stops existing.
    let swept = wallet_info.lamports();
    if swept > 0 {
        let bump = [vs.wallet_bump];
        let seeds: &[&[u8]] = &[WALLET_SEED, state_key.as_ref(), &bump];
        crate::actions::sol_transfer(&wallet_info, &rent_to_info, swept, &[seeds])?;
    }

    // Tombstone: discriminator + vault_id + closed_slot, shrunk to 48 bytes.
    let slot = Clock::get()?.slot;
    {
        let mut data = state_info.try_borrow_mut_data()?;
        data.fill(0);
        let mut dst: &mut [u8] = &mut data;
        VaultTombstone { vault_id: vs.vault_id, closed_slot: slot }.try_serialize(&mut dst)?;
    }
    state_info.resize(VaultTombstone::SPACE)?;

    let keep = Rent::get()?.minimum_balance(VaultTombstone::SPACE);
    let excess = state_info
        .lamports()
        .checked_sub(keep)
        .ok_or(error!(VaultError::ArithmeticOverflow))?;
    if excess > 0 {
        state_info.sub_lamports(excess)?;
        rent_to_info.add_lamports(excess)?;
    }

    crate::vault_emit!(VaultClosed {
        state: state_key,
        vault_id: vs.vault_id,
        root_epoch: vs.root_epoch,
        leaf_index,
        rent_to,
        lamports: excess,
        slot,
        wallet_lamports: swept,
    });

    if let Some(buf) = accs.sig_buffer.as_ref() {
        buf.close(accs.fee_payer.to_account_info())?;
    }
    Ok(())
}
