var e=`//! Execute actions, run after the signature verified and the leaf was consumed: the Phase 1
//! transfers here, the Legacy heir actions in \`legacy.rs\`.
//!
//! Every account is taken from \`remaining_accounts\` in action order and compared with the signed
//! payload; nothing is derived from an unchecked account. The wallet PDA signs every CPI.

use anchor_lang::prelude::*;
use anchor_lang::system_program;
use anchor_spl::associated_token::get_associated_token_address_with_program_id;
use anchor_spl::token_2022::spl_token_2022::{
    extension::{transfer_hook::TransferHook, BaseStateWithExtensions, StateWithExtensions},
    state::{Account as SplTokenAccount, Mint as SplMint},
};
use bunker_core::{Action, SPL_TOKEN, TOKEN_2022};

use crate::errors::VaultError;
use crate::events::{ActionExecuted, KIND_CLOSE_TOKEN_ACCOUNT, KIND_TRANSFER_SOL, KIND_TRANSFER_TOKEN};
use crate::legacy;
use crate::state::WALLET_SEED;

/// System \`Transfer\` CPI: instruction index 2 (u32 LE) then lamports (u64 LE), signed by \`from\`.
/// Same instruction, accounts and signer as \`anchor_lang::system_program::transfer\`, built by hand:
/// that helper's generic bincode builder costs ~8 KB of program size, i.e. deploy rent.
pub(crate) fn sol_transfer<'info>(from: &AccountInfo<'info>, to: &AccountInfo<'info>, lamports: u64, signer: &[&[&[u8]]]) -> Result<()> {
    use anchor_lang::solana_program::instruction::{AccountMeta, Instruction};
    let mut data = Vec::with_capacity(12);
    data.extend_from_slice(&2u32.to_le_bytes());
    data.extend_from_slice(&lamports.to_le_bytes());
    let ix = Instruction {
        program_id: system_program::ID,
        accounts: vec![AccountMeta::new(*from.key, true), AccountMeta::new(*to.key, false)],
        data,
    };
    anchor_lang::solana_program::program::invoke_signed(&ix, &[from.clone(), to.clone()], signer).map_err(Into::into)
}

/// Token \`TransferChecked\` CPI (tag 12, amount u64 LE, decimals): source (w), mint, destination
/// (w), authority (signer). The same instruction \`anchor_spl::token_interface::transfer_checked\`
/// builds, without the generic packer (program size). \`program\` must already have passed
/// \`check_token_program\` (SPL Token or Token-2022 only).
pub(crate) fn token_transfer_checked<'info>(
    program: &Pubkey,
    source: &AccountInfo<'info>,
    mint: &AccountInfo<'info>,
    dest: &AccountInfo<'info>,
    authority: &AccountInfo<'info>,
    amount: u64,
    decimals: u8,
    signer: &[&[&[u8]]],
) -> Result<()> {
    use anchor_lang::solana_program::instruction::{AccountMeta, Instruction};
    let mut data = Vec::with_capacity(10);
    data.push(12);
    data.extend_from_slice(&amount.to_le_bytes());
    data.push(decimals);
    let ix = Instruction {
        program_id: *program,
        accounts: vec![
            AccountMeta::new(*source.key, false),
            AccountMeta::new_readonly(*mint.key, false),
            AccountMeta::new(*dest.key, false),
            AccountMeta::new_readonly(*authority.key, true),
        ],
        data,
    };
    anchor_lang::solana_program::program::invoke_signed(&ix, &[source.clone(), mint.clone(), dest.clone(), authority.clone()], signer)
        .map_err(Into::into)
}

/// Token \`CloseAccount\` CPI (tag 9): account (w), destination (w), owner (signer). Same as
/// \`anchor_spl::token_interface::close_account\`; \`program\` must have passed \`check_token_program\`.
pub(crate) fn token_close_account<'info>(
    program: &Pubkey,
    account: &AccountInfo<'info>,
    dest: &AccountInfo<'info>,
    owner: &AccountInfo<'info>,
    signer: &[&[&[u8]]],
) -> Result<()> {
    use anchor_lang::solana_program::instruction::{AccountMeta, Instruction};
    let ix = Instruction {
        program_id: *program,
        accounts: vec![
            AccountMeta::new(*account.key, false),
            AccountMeta::new(*dest.key, false),
            AccountMeta::new_readonly(*owner.key, true),
        ],
        data: vec![9],
    };
    anchor_lang::solana_program::program::invoke_signed(&ix, &[account.clone(), dest.clone(), owner.clone()], signer).map_err(Into::into)
}

/// Context shared by all actions of one \`execute\`.
pub struct ActionCtx<'a, 'info> {
    pub program_id: &'a Pubkey,
    /// Signs the transaction; pays the rent of a heir record that SetHeir creates.
    pub fee_payer: &'a AccountInfo<'info>,
    pub state: Pubkey,
    pub wallet: &'a AccountInfo<'info>,
    pub wallet_bump: u8,
    pub system_program: &'a AccountInfo<'info>,
    /// Accounts that must never receive funds, directly or as the owner of a token destination:
    /// wallet, state and (if any) the signature buffer.
    pub forbidden: &'a [Pubkey],
    pub root_epoch: u32,
    pub leaf_index: u32,
}

/// Cursor over \`remaining_accounts\`.
pub(crate) struct Accounts<'a, 'info> {
    list: &'a [AccountInfo<'info>],
    pos: usize,
}

impl<'a, 'info> Accounts<'a, 'info> {
    pub(crate) fn next(&mut self) -> Result<&'a AccountInfo<'info>> {
        let acc = self.list.get(self.pos).ok_or(error!(VaultError::NotEnoughAccounts))?;
        self.pos += 1;
        Ok(acc)
    }
}

/// Run \`actions\` in order, consuming exactly the accounts they need from \`remaining\`.
pub fn run_actions<'info>(
    cx: &ActionCtx<'_, 'info>,
    actions: &[Action],
    remaining: &[AccountInfo<'info>],
) -> Result<()> {
    let mut accs = Accounts { list: remaining, pos: 0 };
    let bump = [cx.wallet_bump];
    let seeds: &[&[u8]] = &[WALLET_SEED, cx.state.as_ref(), &bump];
    let signer: &[&[&[u8]]] = &[seeds];

    for (index, action) in actions.iter().enumerate() {
        let index = index as u8;
        match *action {
            Action::TransferSol { to, lamports } => {
                transfer_sol(cx, &mut accs, signer, index, Pubkey::new_from_array(to), lamports)?
            }
            Action::TransferToken { mint, token_program, destination, amount } => transfer_token(
                cx,
                &mut accs,
                signer,
                index,
                Pubkey::new_from_array(mint),
                Pubkey::new_from_array(token_program),
                Pubkey::new_from_array(destination),
                amount,
            )?,
            Action::CloseTokenAccount { mint, token_program, rent_to } => close_token_account(
                cx,
                &mut accs,
                signer,
                index,
                Pubkey::new_from_array(mint),
                Pubkey::new_from_array(token_program),
                Pubkey::new_from_array(rent_to),
            )?,
            Action::SetHeir { heir, inactivity_days } => {
                legacy::set_heir(cx, &mut accs, index, Pubkey::new_from_array(heir), inactivity_days)?
            }
            Action::CheckIn { heir, inactivity_days } => {
                legacy::check_in(cx, &mut accs, index, Pubkey::new_from_array(heir), inactivity_days)?
            }
            Action::ClearHeir { heir } => legacy::clear_heir(cx, &mut accs, index, Pubkey::new_from_array(heir))?,
        }
    }
    require!(accs.pos == remaining.len(), VaultError::TooManyAccounts);
    Ok(())
}

fn check_receiver(cx: &ActionCtx, acc: &AccountInfo, signed: &Pubkey) -> Result<()> {
    require_keys_eq!(*acc.key, *signed, VaultError::AccountMismatch);
    require!(!cx.forbidden.contains(acc.key), VaultError::AliasedAccount);
    require!(acc.is_writable, VaultError::AccountNotWritable);
    Ok(())
}

fn check_token_program(acc: &AccountInfo, signed: &Pubkey) -> Result<()> {
    require!(is_token_program(signed), VaultError::InvalidTokenProgram);
    require_keys_eq!(*acc.key, *signed, VaultError::AccountMismatch);
    Ok(())
}

/// SPL Token or Token-2022, the only token programs the vault calls.
pub(crate) fn is_token_program(id: &Pubkey) -> bool {
    let id = id.to_bytes();
    id == SPL_TOKEN || id == TOKEN_2022
}

/// \`mint_info\` (already checked to be owned by the token program) as a mint: its decimals.
/// Mints with an active transfer hook (TransferHook extension with a program id) are refused
/// before any CPI.
pub(crate) fn mint_decimals(mint_info: &AccountInfo) -> Result<u8> {
    let data = mint_info.try_borrow_data()?;
    let m = StateWithExtensions::<SplMint>::unpack(&data).map_err(|_| error!(VaultError::InvalidMint))?;
    if let Ok(hook) = m.get_extension::<TransferHook>() {
        require!(Option::<Pubkey>::from(hook.program_id).is_none(), VaultError::TransferHookNotSupported);
    }
    Ok(m.base.decimals)
}

/// \`source\` must be the wallet's canonical ATA for (\`mint\`, \`token_program\`).
fn check_source(cx: &ActionCtx, source: &AccountInfo, mint: &Pubkey, token_program: &Pubkey) -> Result<()> {
    let expected = get_associated_token_address_with_program_id(cx.wallet.key, mint, token_program);
    require_keys_eq!(*source.key, expected, VaultError::InvalidSourceAccount);
    require!(source.is_writable, VaultError::AccountNotWritable);
    Ok(())
}

/// The wallet must end an \`execute\` at exactly 0 lamports or at least the rent-exempt minimum
/// for 0 bytes. Checked once, after all actions (\`execute_handler\`), so the result does not
/// depend on the order of the TransferSol actions.
pub fn check_wallet_rent(wallet: &AccountInfo) -> Result<()> {
    let left = wallet.lamports();
    require!(
        left == 0 || left >= Rent::get()?.minimum_balance(0),
        VaultError::WalletBelowRentExempt
    );
    Ok(())
}

fn transfer_sol<'info>(
    cx: &ActionCtx<'_, 'info>,
    accs: &mut Accounts<'_, 'info>,
    signer: &[&[&[u8]]],
    index: u8,
    to: Pubkey,
    lamports: u64,
) -> Result<()> {
    let to_info = accs.next()?;
    check_receiver(cx, to_info, &to)?;

    sol_transfer(cx.wallet, to_info, lamports, signer)?;

    crate::vault_emit!(ActionExecuted {
        state: cx.state,
        root_epoch: cx.root_epoch,
        leaf_index: cx.leaf_index,
        index,
        kind: KIND_TRANSFER_SOL,
        mint: Pubkey::default(),
        destination: to,
        amount: lamports,
    });
    Ok(())
}

#[allow(clippy::too_many_arguments)]
fn transfer_token<'info>(
    cx: &ActionCtx<'_, 'info>,
    accs: &mut Accounts<'_, 'info>,
    signer: &[&[&[u8]]],
    index: u8,
    mint: Pubkey,
    token_program: Pubkey,
    destination: Pubkey,
    amount: u64,
) -> Result<()> {
    let program_info = accs.next()?;
    let mint_info = accs.next()?;
    let source = accs.next()?;
    let dest = accs.next()?;

    check_token_program(program_info, &token_program)?;

    require_keys_eq!(*mint_info.key, mint, VaultError::AccountMismatch);
    require_keys_eq!(*mint_info.owner, token_program, VaultError::InvalidMintOwner);
    let decimals = mint_decimals(mint_info)?;

    check_source(cx, source, &mint, &token_program)?;

    check_receiver(cx, dest, &destination)?;
    require_keys_neq!(*dest.key, *source.key, VaultError::DestinationIsSource);
    require_keys_eq!(*dest.owner, token_program, VaultError::InvalidDestination);
    {
        let data = dest.try_borrow_data()?;
        let acc = StateWithExtensions::<SplTokenAccount>::unpack(&data)
            .map_err(|_| error!(VaultError::InvalidDestination))?;
        require_keys_eq!(acc.base.mint, mint, VaultError::DestinationMintMismatch);
        // A token account owned by the wallet (other than the source ATA), the state or the
        // buffer would strand the tokens: only the canonical ATA is ever used as a source.
        require!(!cx.forbidden.contains(&acc.base.owner), VaultError::AliasedAccount);
    }

    token_transfer_checked(&token_program, source, mint_info, dest, cx.wallet, amount, decimals, signer)?;

    crate::vault_emit!(ActionExecuted {
        state: cx.state,
        root_epoch: cx.root_epoch,
        leaf_index: cx.leaf_index,
        index,
        kind: KIND_TRANSFER_TOKEN,
        mint,
        destination,
        amount,
    });
    Ok(())
}

fn close_token_account<'info>(
    cx: &ActionCtx<'_, 'info>,
    accs: &mut Accounts<'_, 'info>,
    signer: &[&[&[u8]]],
    index: u8,
    mint: Pubkey,
    token_program: Pubkey,
    rent_to: Pubkey,
) -> Result<()> {
    let program_info = accs.next()?;
    let source = accs.next()?;
    let rent_to_info = accs.next()?;

    check_token_program(program_info, &token_program)?;
    check_source(cx, source, &mint, &token_program)?;
    require_keys_eq!(*source.owner, token_program, VaultError::InvalidSourceAccount);
    {
        let data = source.try_borrow_data()?;
        let acc = StateWithExtensions::<SplTokenAccount>::unpack(&data)
            .map_err(|_| error!(VaultError::InvalidSourceAccount))?;
        require_keys_eq!(acc.base.mint, mint, VaultError::InvalidSourceAccount);
        require!(acc.base.amount == 0, VaultError::TokenAccountNotEmpty);
    }

    check_receiver(cx, rent_to_info, &rent_to)?;
    require_keys_neq!(*rent_to_info.key, *source.key, VaultError::AliasedAccount);

    let reclaimed = source.lamports();
    token_close_account(&token_program, source, rent_to_info, cx.wallet, signer)?;

    crate::vault_emit!(ActionExecuted {
        state: cx.state,
        root_epoch: cx.root_epoch,
        leaf_index: cx.leaf_index,
        index,
        kind: KIND_CLOSE_TOKEN_ACCOUNT,
        mint,
        destination: rent_to,
        amount: reclaimed,
    });
    Ok(())
}
`;export{e as default};