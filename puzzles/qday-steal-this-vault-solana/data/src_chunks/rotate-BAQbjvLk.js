var e=`use anchor_lang::prelude::*;
use bunker_core::IxTag;

use crate::auth::{load_vault, store_vault, verify_authorization, AuthRequest};
use crate::errors::VaultError;
use crate::events::KeyRotated;
use crate::state::SigBuffer;

#[derive(Accounts)]
pub struct Rotate<'info> {
    #[account(mut)]
    pub fee_payer: Signer<'info>,

    /// CHECK: loaded and validated by \`auth::load_vault\`.
    #[account(mut)]
    pub state: UncheckedAccount<'info>,

    pub cosigner: Option<Signer<'info>>,

    #[account(mut)]
    pub sig_buffer: Option<Account<'info, SigBuffer>>,

    pub system_program: Program<'info, System>,
}

pub fn rotate_handler<'info>(
    ctx: Context<'info, Rotate<'info>>,
    leaf_index: u32,
    new_root: [u8; 48],
    sig: Option<Vec<u8>>,
) -> Result<()> {
    let program_id = ctx.program_id;
    let accs = &ctx.accounts;
    require!(ctx.remaining_accounts.is_empty(), VaultError::TooManyAccounts);
    let state_info = accs.state.to_account_info();
    let state_key = state_info.key();

    let mut vs = load_vault(&state_info, program_id)?;
    require!(new_root != vs.current_root, VaultError::SameRoot);
    verify_authorization(
        &vs,
        &AuthRequest {
            program_id,
            state: &state_key,
            fee_payer: accs.fee_payer.key,
            cosigner: accs.cosigner.as_ref().map(|c| c.key),
            tag: IxTag::Rotate,
            leaf_index,
            payload: &new_root,
            sig: sig.as_deref(),
            sig_buffer: accs.sig_buffer.as_ref(),
        },
    )?;

    let old_epoch = vs.root_epoch;
    vs.current_root = new_root;
    vs.root_epoch = old_epoch.checked_add(1).ok_or(error!(VaultError::ArithmeticOverflow))?;
    vs.next_leaf = 0;
    store_vault(&state_info, &vs)?;

    crate::vault_emit!(KeyRotated {
        state: state_key,
        leaf_index,
        old_epoch,
        new_epoch: vs.root_epoch,
        new_root,
    });

    if let Some(buf) = accs.sig_buffer.as_ref() {
        buf.close(accs.fee_payer.to_account_info())?;
    }
    Ok(())
}
`;export{e as default};