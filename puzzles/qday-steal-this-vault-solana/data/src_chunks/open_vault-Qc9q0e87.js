var e=`use anchor_lang::prelude::*;

use crate::errors::VaultError;
use crate::events::VaultOpened;
use crate::hasher::SolSha256;
use crate::state::{VaultState, VAULT_SEED, VAULT_VERSION, WALLET_SEED};

#[derive(Accounts)]
#[instruction(vault_id: [u8; 32])]
pub struct OpenVault<'info> {
    #[account(mut)]
    pub payer: Signer<'info>,

    #[account(
        init,
        payer = payer,
        space = VaultState::SPACE,
        seeds = [VAULT_SEED, vault_id.as_ref()],
        bump,
    )]
    pub state: Account<'info, VaultState>,

    /// CHECK: the vault's wallet PDA \`[b"wallet", state]\` (checked by the seeds constraint);
    /// only its address and bump are used.
    #[account(seeds = [WALLET_SEED, state.key().as_ref()], bump)]
    pub wallet: UncheckedAccount<'info>,

    pub system_program: Program<'info, System>,
}

pub fn open_vault_handler(
    ctx: Context<OpenVault>,
    vault_id: [u8; 32],
    root: [u8; 48],
    cosigner: Option<Pubkey>,
) -> Result<()> {
    let cosigner_bytes = cosigner.map(|k| k.to_bytes());
    let options = bunker_core::encode_options(cosigner_bytes.as_ref());
    let expected = bunker_core::vault_id::<SolSha256>(&root, &options);
    require!(expected == vault_id, VaultError::VaultIdMismatch);

    let slot = Clock::get()?.slot;
    ctx.accounts.state.set_inner(VaultState {
        version: VAULT_VERSION,
        bump: ctx.bumps.state,
        wallet_bump: ctx.bumps.wallet,
        vault_id,
        current_root: root,
        root_epoch: 0,
        next_leaf: 0,
        tree_size: bunker_lms::TREE_SIZE,
        cosigner,
        created_slot: slot,
        executed_count: 0,
        reserved: [0u8; 128],
    });

    crate::vault_emit!(VaultOpened {
        state: ctx.accounts.state.key(),
        wallet: ctx.accounts.wallet.key(),
        vault_id,
        root,
        cosigner,
        slot,
    });
    Ok(())
}
`;export{e as default};