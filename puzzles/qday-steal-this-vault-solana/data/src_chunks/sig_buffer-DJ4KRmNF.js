var e=`use anchor_lang::prelude::*;
use bunker_lms::SIG_LEN;

use crate::auth::{check_leaf, load_vault};
use crate::errors::VaultError;
use crate::state::{SigBuffer, SIGBUF_SEED};

#[derive(Accounts)]
#[instruction(root_epoch: u32, leaf_index: u32)]
pub struct InitSigBuffer<'info> {
    #[account(mut)]
    pub payer: Signer<'info>,

    /// CHECK: loaded and validated by \`auth::load_vault\`.
    pub state: UncheckedAccount<'info>,

    #[account(
        init,
        payer = payer,
        space = SigBuffer::SPACE,
        seeds = [
            SIGBUF_SEED,
            state.key().as_ref(),
            payer.key().as_ref(),
            &root_epoch.to_le_bytes(),
            &leaf_index.to_le_bytes(),
        ],
        bump,
    )]
    pub sig_buffer: Account<'info, SigBuffer>,

    pub system_program: Program<'info, System>,
}

pub fn init_handler(ctx: Context<InitSigBuffer>, root_epoch: u32, leaf_index: u32) -> Result<()> {
    let vs = load_vault(&ctx.accounts.state.to_account_info(), ctx.program_id)?;
    require!(root_epoch == vs.root_epoch, VaultError::EpochMismatch);
    check_leaf(&vs, leaf_index)?;

    ctx.accounts.sig_buffer.set_inner(SigBuffer {
        state: ctx.accounts.state.key(),
        payer: ctx.accounts.payer.key(),
        root_epoch,
        leaf_index,
        bump: ctx.bumps.sig_buffer,
    });
    Ok(())
}

#[derive(Accounts)]
pub struct WriteSigBuffer<'info> {
    pub payer: Signer<'info>,

    #[account(mut, has_one = payer @ VaultError::SigBufferPayerMismatch)]
    pub sig_buffer: Account<'info, SigBuffer>,
}

pub fn write_handler(ctx: Context<WriteSigBuffer>, offset: u32, data: Vec<u8>) -> Result<()> {
    let start = offset as usize;
    let end = start
        .checked_add(data.len())
        .ok_or(error!(VaultError::SigBufferOutOfBounds))?;
    require!(end <= SIG_LEN, VaultError::SigBufferOutOfBounds);

    let info = ctx.accounts.sig_buffer.to_account_info();
    let mut dst = info.try_borrow_mut_data()?;
    dst.get_mut(SigBuffer::DATA_OFFSET + start..SigBuffer::DATA_OFFSET + end)
        .ok_or(error!(VaultError::SigBufferOutOfBounds))?
        .copy_from_slice(&data);
    Ok(())
}

#[derive(Accounts)]
pub struct CloseSigBuffer<'info> {
    #[account(mut)]
    pub payer: Signer<'info>,

    #[account(mut, has_one = payer @ VaultError::SigBufferPayerMismatch, close = payer)]
    pub sig_buffer: Account<'info, SigBuffer>,
}

pub fn close_handler(_ctx: Context<CloseSigBuffer>) -> Result<()> {
    Ok(())
}
`;export{e as default};