//! Legacy: a vault's heir (docs/guides/legacy.md, MESSAGE_FORMAT §4, SPEC §2).
//!
//! * Three signed actions run inside `execute` (so they need the hash-key signature and, in hybrid
//!   mode, the cosigner): SetHeir creates or updates the heir record PDA `[b"heir", state]`,
//!   CheckIn restarts its countdown, ClearHeir closes it (rent back to the vault's wallet).
//! * `inherit` (instructions/inherit.rs) needs no signature: once the deadline has passed, anyone
//!   can move everything in the vault to the recorded heir, and to nobody else. Its first call
//!   seals the vault: `next_leaf = tree_size`, so the vault's key can never sign again.
//!
//! No Ed25519 key can name the heir, move the deadline or redirect what is inherited: the heir and
//! the deadline only change through hash-key signatures, and `inherit` pays only the recorded heir
//! (SOL to its address, tokens to its canonical associated token accounts, closed-account rent to
//! its address).

use anchor_lang::prelude::*;
use anchor_lang::solana_program::instruction::{AccountMeta, Instruction};
use anchor_lang::solana_program::program::{invoke, invoke_signed};
use anchor_lang::system_program;
use anchor_lang::Discriminator;
use anchor_spl::associated_token::get_associated_token_address_with_program_id;
use anchor_spl::token_2022::spl_token_2022::{
    extension::{transfer_fee::TransferFeeAmount, BaseStateWithExtensions, StateWithExtensions},
    state::Account as SplTokenAccount,
};
use bunker_core::SECONDS_PER_DAY;

use crate::actions::{
    is_token_program, mint_decimals, token_close_account, token_transfer_checked, ActionCtx, Accounts,
};
use crate::errors::VaultError;
use crate::events::{ActionExecuted, InheritedToken, KIND_CHECK_IN, KIND_CLEAR_HEIR, KIND_SET_HEIR};
use crate::state::{Heir, HEIR_SEED, HEIR_VERSION};

/// The canonical heir record address of `state`, and its bump.
pub fn find_heir_pda(state: &Pubkey, program_id: &Pubkey) -> (Pubkey, u8) {
    Pubkey::find_program_address(&[HEIR_SEED, state.as_ref()], program_id)
}

/// Load the heir record of `state` from `info`: owner = this program, exact size, `Heir`
/// discriminator, version 1, `state` field, and `info.key` = PDA `[b"heir", state]` with the stored
/// bump. An empty system account at the canonical address is `HeirNotSet`.
pub fn load_heir(info: &AccountInfo, state: &Pubkey, program_id: &Pubkey) -> Result<Heir> {
    if *info.owner != *program_id {
        // Error path only, so the PDA search's compute does not matter.
        let not_set = *info.owner == system_program::ID
            && info.data_is_empty()
            && *info.key == find_heir_pda(state, program_id).0;
        return if not_set { err!(VaultError::HeirNotSet) } else { err!(VaultError::InvalidHeirAccount) };
    }
    let h = {
        let data = info.try_borrow_data()?;
        require!(
            data.len() == Heir::SPACE && data[..8] == *Heir::DISCRIMINATOR,
            VaultError::InvalidHeirAccount
        );
        Heir::try_deserialize(&mut &data[..]).map_err(|_| error!(VaultError::InvalidHeirAccount))?
    };
    require!(h.version == HEIR_VERSION, VaultError::InvalidHeirAccount);
    require_keys_eq!(h.state, *state, VaultError::InvalidHeirAccount);
    let expected = Pubkey::create_program_address(&[HEIR_SEED, state.as_ref(), &[h.bump]], program_id)
        .map_err(|_| error!(VaultError::InvalidHeirAccount))?;
    require_keys_eq!(expected, *info.key, VaultError::InvalidHeirAccount);
    Ok(h)
}

/// Write `h` into the heir record (discriminator + Borsh; the size never changes).
pub fn store_heir(info: &AccountInfo, h: &Heir) -> Result<()> {
    let mut data = info.try_borrow_mut_data()?;
    let mut dst: &mut [u8] = &mut data;
    h.try_serialize(&mut dst)
}

/// `now + days × 86,400` (the cluster clock's unix seconds).
pub fn deadline_after(now: i64, days: u16) -> Result<i64> {
    i64::from(days)
        .checked_mul(SECONDS_PER_DAY)
        .and_then(|secs| now.checked_add(secs))
        .ok_or(error!(VaultError::ArithmeticOverflow))
}

fn system_ix(accounts: Vec<AccountMeta>, data: Vec<u8>) -> Instruction {
    Instruction { program_id: system_program::ID, accounts, data }
}

/// Create the heir record at `record` (the PDA, bump `bump`) with the fee payer's lamports. An
/// address someone already sent lamports to (anyone can) is topped up, allocated and assigned
/// instead, so a dust transfer cannot block SetHeir.
fn create_heir_account<'info>(cx: &ActionCtx<'_, 'info>, record: &AccountInfo<'info>, bump: u8) -> Result<()> {
    let bump = [bump];
    let seeds: &[&[u8]] = &[HEIR_SEED, cx.state.as_ref(), &bump];
    let space = Heir::SPACE as u64;
    let rent = Rent::get()?.minimum_balance(Heir::SPACE);
    let payer = cx.fee_payer;
    let current = record.lamports();
    if current == 0 {
        // CreateAccount (system instruction 0): lamports, space, owner.
        let mut data = Vec::with_capacity(52);
        data.extend_from_slice(&0u32.to_le_bytes());
        data.extend_from_slice(&rent.to_le_bytes());
        data.extend_from_slice(&space.to_le_bytes());
        data.extend_from_slice(cx.program_id.as_ref());
        let ix = system_ix(vec![AccountMeta::new(*payer.key, true), AccountMeta::new(*record.key, true)], data);
        return invoke_signed(&ix, &[payer.clone(), record.clone()], &[seeds]).map_err(Into::into);
    }
    let top_up = rent.saturating_sub(current);
    if top_up > 0 {
        // The fee payer signed the transaction, so its signature carries into this transfer.
        let mut data = Vec::with_capacity(12);
        data.extend_from_slice(&2u32.to_le_bytes());
        data.extend_from_slice(&top_up.to_le_bytes());
        let ix = system_ix(vec![AccountMeta::new(*payer.key, true), AccountMeta::new(*record.key, false)], data);
        invoke(&ix, &[payer.clone(), record.clone()])?;
    }
    // Allocate (system instruction 8): space.
    let mut data = Vec::with_capacity(12);
    data.extend_from_slice(&8u32.to_le_bytes());
    data.extend_from_slice(&space.to_le_bytes());
    invoke_signed(&system_ix(vec![AccountMeta::new(*record.key, true)], data), &[record.clone()], &[seeds])?;
    // Assign (system instruction 1): owner.
    let mut data = Vec::with_capacity(36);
    data.extend_from_slice(&1u32.to_le_bytes());
    data.extend_from_slice(cx.program_id.as_ref());
    invoke_signed(&system_ix(vec![AccountMeta::new(*record.key, true)], data), &[record.clone()], &[seeds])
        .map_err(Into::into)
}

fn emit_heir_action(cx: &ActionCtx, index: u8, kind: u8, heir: Pubkey, amount: u64) {
    crate::vault_emit!(ActionExecuted {
        state: cx.state,
        root_epoch: cx.root_epoch,
        leaf_index: cx.leaf_index,
        index,
        kind,
        mint: Pubkey::default(),
        destination: heir,
        amount,
    });
}

/// SetHeir (tag 0x10). Accounts: the heir record PDA (w), the heir (read only).
pub(crate) fn set_heir<'info>(
    cx: &ActionCtx<'_, 'info>,
    accs: &mut Accounts<'_, 'info>,
    index: u8,
    heir: Pubkey,
    inactivity_days: u16,
) -> Result<()> {
    let record = accs.next()?;
    let heir_info = accs.next()?;

    let (expected, bump) = find_heir_pda(&cx.state, cx.program_id);
    require_keys_eq!(*record.key, expected, VaultError::InvalidHeirAccount);
    require!(record.is_writable, VaultError::AccountNotWritable);

    // The heir: the signed address, never one of the vault's own accounts, and a wallet-like
    // account (owned by the System Program, not a program): a token account, a mint, a program
    // or one of Bunker's accounts would swallow whatever is inherited.
    require_keys_eq!(*heir_info.key, heir, VaultError::AccountMismatch);
    require!(!cx.forbidden.contains(&heir) && heir != expected, VaultError::AliasedAccount);
    require!(
        *heir_info.owner == system_program::ID && !heir_info.executable,
        VaultError::InvalidHeir
    );
    bunker_core::check_inactivity_days(inactivity_days).map_err(|_| error!(VaultError::InvalidInactivityPeriod))?;

    let now = Clock::get()?.unix_timestamp;
    let deadline = deadline_after(now, inactivity_days)?;
    if *record.owner == *cx.program_id {
        let mut h = load_heir(record, &cx.state, cx.program_id)?;
        require!(h.inherited_at == 0, VaultError::VaultInherited);
        h.heir = heir;
        h.inactivity_days = inactivity_days;
        h.set_at = now;
        h.deadline = deadline;
        store_heir(record, &h)?;
    } else {
        require_keys_eq!(*record.owner, system_program::ID, VaultError::InvalidHeirAccount);
        require!(record.data_is_empty(), VaultError::InvalidHeirAccount);
        create_heir_account(cx, record, bump)?;
        store_heir(
            record,
            &Heir {
                version: HEIR_VERSION,
                bump,
                inactivity_days,
                state: cx.state,
                heir,
                set_at: now,
                deadline,
                inherited_at: 0,
            },
        )?;
    }
    emit_heir_action(cx, index, KIND_SET_HEIR, heir, deadline as u64);
    Ok(())
}

/// CheckIn (tag 0x11). Accounts: the heir record (w). The signed heir and period must be the
/// recorded ones; the deadline becomes now + period. Allowed after the deadline too, as long as
/// nobody has inherited yet.
pub(crate) fn check_in<'info>(
    cx: &ActionCtx<'_, 'info>,
    accs: &mut Accounts<'_, 'info>,
    index: u8,
    heir: Pubkey,
    inactivity_days: u16,
) -> Result<()> {
    let record = accs.next()?;
    require!(record.is_writable, VaultError::AccountNotWritable);
    let mut h = load_heir(record, &cx.state, cx.program_id)?;
    require!(h.inherited_at == 0, VaultError::VaultInherited);
    require!(
        h.heir == heir && h.inactivity_days == inactivity_days,
        VaultError::HeirRecordMismatch
    );
    h.deadline = deadline_after(Clock::get()?.unix_timestamp, inactivity_days)?;
    store_heir(record, &h)?;
    emit_heir_action(cx, index, KIND_CHECK_IN, heir, h.deadline as u64);
    Ok(())
}

/// ClearHeir (tag 0x12). Accounts: the heir record (w). The signed heir must be the recorded one.
/// The record is closed and every lamport it holds goes to the vault's wallet: never to the fee
/// payer, who signs nothing of what the vault does.
pub(crate) fn clear_heir<'info>(
    cx: &ActionCtx<'_, 'info>,
    accs: &mut Accounts<'_, 'info>,
    index: u8,
    heir: Pubkey,
) -> Result<()> {
    let record = accs.next()?;
    require!(record.is_writable, VaultError::AccountNotWritable);
    let h = load_heir(record, &cx.state, cx.program_id)?;
    require!(h.inherited_at == 0, VaultError::VaultInherited);
    require_keys_eq!(h.heir, heir, VaultError::HeirRecordMismatch);

    let lamports = record.lamports();
    record.sub_lamports(lamports)?;
    cx.wallet.add_lamports(lamports)?;
    record.assign(&system_program::ID);
    record.resize(0)?;
    emit_heir_action(cx, index, KIND_CLEAR_HEIR, heir, lamports);
    Ok(())
}

// ---- inherit: one vault token account --------------------------------------------------------

/// What every token group of one `inherit` shares.
pub struct InheritCtx<'a, 'info> {
    pub state: Pubkey,
    pub wallet: &'a AccountInfo<'info>,
    pub heir: &'a AccountInfo<'info>,
    pub caller: &'a AccountInfo<'info>,
    pub system_program: &'a AccountInfo<'info>,
    pub ata_program: &'a AccountInfo<'info>,
}

/// Associated Token Account `CreateIdempotent` (instruction 1): payer (s, w), the ATA (w), its
/// owner, the mint, the System Program, the token program.
fn create_ata_idempotent<'info>(
    cx: &InheritCtx<'_, 'info>,
    ata: &AccountInfo<'info>,
    mint: &AccountInfo<'info>,
    token_program: &AccountInfo<'info>,
) -> Result<()> {
    let ix = Instruction {
        program_id: *cx.ata_program.key,
        accounts: vec![
            AccountMeta::new(*cx.caller.key, true),
            AccountMeta::new(*ata.key, false),
            AccountMeta::new_readonly(*cx.heir.key, false),
            AccountMeta::new_readonly(*mint.key, false),
            AccountMeta::new_readonly(*cx.system_program.key, false),
            AccountMeta::new_readonly(*token_program.key, false),
        ],
        data: vec![1],
    };
    invoke(
        &ix,
        &[
            cx.caller.clone(),
            ata.clone(),
            cx.heir.clone(),
            mint.clone(),
            cx.system_program.clone(),
            token_program.clone(),
        ],
    )
    .map_err(Into::into)
}

/// Whether an empty token account can be closed: Token-2022 refuses while it still holds withheld
/// transfer fees (harvesting them is permissionless; a later `inherit` closes it).
fn closable_when_empty(source: &AccountInfo) -> Result<bool> {
    let data = source.try_borrow_data()?;
    let acc = StateWithExtensions::<SplTokenAccount>::unpack(&data).map_err(|_| error!(VaultError::InvalidSourceAccount))?;
    Ok(acc.base.amount == 0 && acc.get_extension::<TransferFeeAmount>().map_or(true, |f| f.closable().is_ok()))
}

/// Move one vault token account to the heir: `[token_program, mint, vault_ata (w), heir_ata (w)]`.
///
/// The vault's account must be the wallet's canonical ATA for (mint, token program) and hold `mint`.
/// An empty one is simply closed with its rent going to the heir: no mint, hook or heir account is
/// involved (CloseAccount runs no hook), so the caller pays for no account that would receive
/// nothing. Otherwise the destination must be the heir's canonical ATA (created idempotently with the
/// caller's lamports when missing, then checked to be the heir's account of that mint), the whole
/// balance moves, and the emptied vault account is closed with its rent going to the heir, unless
/// Token-2022 still holds withheld transfer fees in it. Mints with an active transfer hook are
/// refused, as TransferToken refuses them.
pub fn inherit_token<'info>(cx: &InheritCtx<'_, 'info>, group: &[AccountInfo<'info>], signer: &[&[&[u8]]]) -> Result<()> {
    let [program_info, mint_info, source, dest] = group else {
        return err!(VaultError::NotEnoughAccounts);
    };
    let token_program = *program_info.key;
    require!(is_token_program(&token_program), VaultError::InvalidTokenProgram);
    let mint = *mint_info.key;

    // Source: the vault's canonical ATA (derived here, never taken on trust).
    let expected_source = get_associated_token_address_with_program_id(cx.wallet.key, &mint, &token_program);
    require_keys_eq!(*source.key, expected_source, VaultError::InvalidSourceAccount);
    require!(source.is_writable, VaultError::AccountNotWritable);
    require_keys_eq!(*source.owner, token_program, VaultError::InvalidSourceAccount);
    let amount = {
        let data = source.try_borrow_data()?;
        let acc = StateWithExtensions::<SplTokenAccount>::unpack(&data)
            .map_err(|_| error!(VaultError::InvalidSourceAccount))?;
        require_keys_eq!(acc.base.mint, mint, VaultError::InvalidSourceAccount);
        acc.base.amount
    };

    if amount == 0 {
        let closed = closable_when_empty(source)?;
        if closed {
            token_close_account(&token_program, source, cx.heir, cx.wallet, signer)?;
        }
        crate::vault_emit!(InheritedToken {
            state: cx.state,
            mint,
            heir_token_account: Pubkey::default(),
            amount: 0,
            closed,
        });
        return Ok(());
    }

    require_keys_eq!(*mint_info.owner, token_program, VaultError::InvalidMintOwner);
    let decimals = mint_decimals(mint_info)?;

    // Destination: the heir's canonical ATA, nothing else.
    let expected_dest = get_associated_token_address_with_program_id(cx.heir.key, &mint, &token_program);
    require_keys_eq!(*dest.key, expected_dest, VaultError::InvalidDestination);
    require!(dest.is_writable, VaultError::AccountNotWritable);
    if *dest.owner != token_program {
        create_ata_idempotent(cx, dest, mint_info, program_info)?;
    }
    require_keys_eq!(*dest.owner, token_program, VaultError::InvalidDestination);
    {
        let data = dest.try_borrow_data()?;
        let acc = StateWithExtensions::<SplTokenAccount>::unpack(&data)
            .map_err(|_| error!(VaultError::InvalidDestination))?;
        require_keys_eq!(acc.base.mint, mint, VaultError::DestinationMintMismatch);
        // An SPL Token account's owner can be reassigned: only the heir's own account will do.
        require_keys_eq!(acc.base.owner, *cx.heir.key, VaultError::InvalidDestination);
    }

    token_transfer_checked(&token_program, source, mint_info, dest, cx.wallet, amount, decimals, signer)?;
    let closable = closable_when_empty(source)?;
    if closable {
        token_close_account(&token_program, source, cx.heir, cx.wallet, signer)?;
    }

    crate::vault_emit!(InheritedToken {
        state: cx.state,
        mint,
        heir_token_account: *dest.key,
        amount,
        closed: closable,
    });
    Ok(())
}
