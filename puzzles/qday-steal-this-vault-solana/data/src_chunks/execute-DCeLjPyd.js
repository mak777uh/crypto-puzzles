var e=`use anchor_lang::prelude::*;
use bunker_core::{Action, IxTag};

use crate::actions::{check_wallet_rent, run_actions, ActionCtx};
use crate::auth::{check_wallet, load_vault, store_vault, verify_authorization, AuthRequest};
use crate::errors::VaultError;
use crate::state::SigBuffer;

#[derive(Accounts)]
pub struct Execute<'info> {
    #[account(mut)]
    pub fee_payer: Signer<'info>,

    /// CHECK: loaded and validated by \`auth::load_vault\` (owner, discriminator, PDA); a
    /// tombstone is rejected with \`VaultClosed\`.
    #[account(mut)]
    pub state: UncheckedAccount<'info>,

    /// CHECK: re-derived from \`state\` and the stored wallet bump (\`auth::check_wallet\`).
    #[account(mut)]
    pub wallet: UncheckedAccount<'info>,

    /// Required (and must match) when the vault was opened in hybrid mode.
    pub cosigner: Option<Signer<'info>>,

    /// Signature buffer, used when \`sig\` is \`None\`; closed to \`fee_payer\` on success.
    #[account(mut)]
    pub sig_buffer: Option<Account<'info, SigBuffer>>,

    pub system_program: Program<'info, System>,
}

pub fn execute_handler<'info>(
    ctx: Context<'info, Execute<'info>>,
    leaf_index: u32,
    payload: Vec<u8>,
    sig: Option<Vec<u8>>,
) -> Result<()> {
    let program_id = ctx.program_id;
    let accs = &ctx.accounts;
    let state_info = accs.state.to_account_info();
    let state_key = state_info.key();
    let wallet_info = accs.wallet.to_account_info();

    // 1. Load + validate everything, decode, verify. No account is modified before this.
    let mut vs = load_vault(&state_info, program_id)?;
    check_wallet(wallet_info.key, &state_key, &vs, program_id)?;
    let actions =
        bunker_core::decode_actions(&payload).map_err(|_| error!(VaultError::InvalidPayload))?;
    verify_authorization(
        &vs,
        &AuthRequest {
            program_id,
            state: &state_key,
            fee_payer: accs.fee_payer.key,
            cosigner: accs.cosigner.as_ref().map(|c| c.key),
            tag: IxTag::Execute,
            leaf_index,
            payload: &payload,
            sig: sig.as_deref(),
            sig_buffer: accs.sig_buffer.as_ref(),
        },
    )?;

    // 2. Consume the leaf before any CPI.
    let root_epoch = vs.root_epoch;
    vs.next_leaf = leaf_index.checked_add(1).ok_or(error!(VaultError::ArithmeticOverflow))?;
    vs.executed_count = vs
        .executed_count
        .checked_add(1)
        .ok_or(error!(VaultError::ArithmeticOverflow))?;
    store_vault(&state_info, &vs)?;

    // 3. Run the actions, signed by the wallet PDA.
    let mut forbidden = vec![*wallet_info.key, state_key];
    if let Some(buf) = accs.sig_buffer.as_ref() {
        forbidden.push(buf.key());
    }
    let system_program = accs.system_program.to_account_info();
    let fee_payer = accs.fee_payer.to_account_info();
    run_actions(
        &ActionCtx {
            program_id,
            fee_payer: &fee_payer,
            state: state_key,
            wallet: &wallet_info,
            wallet_bump: vs.wallet_bump,
            system_program: &system_program,
            forbidden: &forbidden,
            root_epoch,
            leaf_index,
        },
        &actions,
        ctx.remaining_accounts,
    )?;

    // 4. Rent rule on what the wallet holds after all actions (order-independent). Only SOL
    //    actions and ClearHeir (the heir record's rent comes back to the wallet) move the
    //    wallet's lamports.
    if actions.iter().any(|a| matches!(a, Action::TransferSol { .. } | Action::ClearHeir { .. })) {
        check_wallet_rent(&wallet_info)?;
    }

    // 5. A consumed buffer goes back to the fee payer.
    if let Some(buf) = accs.sig_buffer.as_ref() {
        buf.close(accs.fee_payer.to_account_info())?;
    }
    Ok(())
}
`;export{e as default};