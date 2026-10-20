var e=`use anchor_lang::prelude::*;

use crate::actions::sol_transfer;
use crate::auth::{check_wallet, load_vault, store_vault};
use crate::errors::VaultError;
use crate::events::Inherited;
use crate::legacy::{inherit_token, load_heir, store_heir, InheritCtx};
use crate::state::WALLET_SEED;

/// Legacy: move everything in the vault to its recorded heir once the deadline has passed. No
/// signature: anyone may send it, and it can only pay the heir.
#[derive(Accounts)]
pub struct Inherit<'info> {
    /// Anyone. Pays the network fee and the rent of any heir token account it creates.
    #[account(mut)]
    pub caller: Signer<'info>,

    /// The vault; the first inherit seals it (\`next_leaf = tree_size\`).
    /// CHECK: loaded and validated by \`auth::load_vault\` (a tombstone gives \`VaultClosed\`).
    #[account(mut)]
    pub state: UncheckedAccount<'info>,

    /// Every lamport it holds goes to \`heir\`.
    /// CHECK: re-derived from \`state\` (\`auth::check_wallet\`).
    #[account(mut)]
    pub wallet: UncheckedAccount<'info>,

    /// The vault's heir record (PDA \`[b"heir", state]\`); \`HeirNotSet\` when the vault has none.
    /// CHECK: owner, size, discriminator, version, state and PDA checked by \`legacy::load_heir\`.
    #[account(mut)]
    pub heir_record: UncheckedAccount<'info>,

    /// Receives the SOL and the rent of the vault's closed token accounts.
    /// CHECK: must equal \`heir_record.heir\`.
    #[account(mut)]
    pub heir: UncheckedAccount<'info>,

    pub system_program: Program<'info, System>,

    /// CHECK: the Associated Token Account program (address checked), for the heir's token accounts.
    #[account(address = anchor_spl::associated_token::ID)]
    pub associated_token_program: UncheckedAccount<'info>,
}

pub fn inherit_handler<'info>(ctx: Context<'info, Inherit<'info>>) -> Result<()> {
    let program_id = ctx.program_id;
    let remaining = ctx.remaining_accounts;
    let accs = ctx.accounts;
    let state_info = accs.state.to_account_info();
    let state_key = state_info.key();
    let wallet_info = accs.wallet.to_account_info();
    let heir_info = accs.heir.to_account_info();
    let record_info = accs.heir_record.to_account_info();
    let record_key = record_info.key();

    // 1. The vault (live, not a tombstone), its wallet and its heir record.
    let mut vs = load_vault(&state_info, program_id)?;
    check_wallet(wallet_info.key, &state_key, &vs, program_id)?;
    let mut record = load_heir(&record_info, &state_key, program_id)?;
    let heir = record.heir;
    require_keys_eq!(*heir_info.key, heir, VaultError::HeirMismatch);
    // SetHeir already refuses these; checked again because nothing may flow back into the vault.
    require!(heir != *wallet_info.key && heir != state_key && heir != record_key, VaultError::AliasedAccount);
    // SetHeir checked the heir when it was named, but an address with no account then can become one
    // since (a token account, a program's PDA): refuse to pay into it, and leave the vault unsealed so a
    // living owner can name another heir. Data is allowed (a nonce account is still a wallet).
    require!(
        *heir_info.owner == anchor_lang::system_program::ID && !heir_info.executable,
        VaultError::InvalidHeir
    );

    // 2. Only after the deadline: the last SetHeir or CheckIn + the signed period.
    let now = Clock::get()?.unix_timestamp;
    require!(now >= record.deadline, VaultError::InheritanceNotDue);

    // 3. Seal before any CPI: from now on the vault's key can never sign again (no leaf left, not
    //    even the one kept for rotate), so nobody holding the old seed can race the heir for what
    //    is still in the vault, now or later. The heir record keeps the time it happened.
    let sealed_now = record.inherited_at == 0;
    if sealed_now {
        record.inherited_at = now;
        store_heir(&record_info, &record)?;
    }
    if vs.next_leaf != vs.tree_size {
        vs.next_leaf = vs.tree_size;
        store_vault(&state_info, &vs)?;
    }

    // 4. Tokens: groups of [token program, mint, vault ATA, heir ATA], each emptied into the heir's.
    require!(remaining.len() % 4 == 0, VaultError::NotEnoughAccounts);
    let bump = [vs.wallet_bump];
    let seeds: &[&[u8]] = &[WALLET_SEED, state_key.as_ref(), &bump];
    let signer: &[&[&[u8]]] = &[seeds];
    let caller = accs.caller.to_account_info();
    let system_program = accs.system_program.to_account_info();
    let ata_program = accs.associated_token_program.to_account_info();
    let cx = InheritCtx {
        state: state_key,
        wallet: &wallet_info,
        heir: &heir_info,
        caller: &caller,
        system_program: &system_program,
        ata_program: &ata_program,
    };
    for group in remaining.chunks_exact(4) {
        inherit_token(&cx, group, signer)?;
    }

    // 5. SOL: everything the wallet holds, so it ends at 0 (the rent rule holds trivially).
    let lamports = wallet_info.lamports();
    if lamports > 0 {
        sol_transfer(&wallet_info, &heir_info, lamports, signer)?;
    }

    crate::vault_emit!(Inherited {
        state: state_key,
        heir,
        caller: caller.key(),
        inherited_at: record.inherited_at,
        sealed_now,
        lamports,
        token_accounts: (remaining.len() / 4) as u8,
    });
    Ok(())
}
`;export{e as default};