//! Shared authorization path for `execute`, `rotate` and `close_vault`:
//! load + validate the vault state, check the wallet PDA, the cosigner (hybrid mode), the leaf
//! rules, find the signature (inline or buffer) and verify it over
//! `message_prefix(...) ‖ payload`.

use anchor_lang::prelude::*;
use anchor_lang::Discriminator;
use bunker_lms::{LmsError, ROOT_LEN, SIG_LEN};
use bunker_core::IxTag;

use crate::errors::VaultError;
use crate::hasher::SolSha256;
use crate::state::{
    SigBuffer, VaultState, VaultTombstone, SIGBUF_SEED, VAULT_SEED, VAULT_VERSION, WALLET_SEED,
};
use crate::CLUSTER_ID;

/// Load the vault state from `info`: owner = this program, exact size, `VaultState`
/// discriminator (a tombstone gives `VaultClosed`), and `info.key` = PDA `[b"vault", vault_id]`
/// with the stored bump.
pub fn load_vault(info: &AccountInfo, program_id: &Pubkey) -> Result<VaultState> {
    require_keys_eq!(*info.owner, *program_id, VaultError::InvalidVaultAccount);
    let vs = {
        let data = info.try_borrow_data()?;
        if data.len() >= 8 && data[..8] == *VaultTombstone::DISCRIMINATOR {
            return err!(VaultError::VaultClosed);
        }
        if data.len() != VaultState::SPACE || data[..8] != *VaultState::DISCRIMINATOR {
            return err!(VaultError::InvalidVaultAccount);
        }
        VaultState::try_deserialize(&mut &data[..])
            .map_err(|_| error!(VaultError::InvalidVaultAccount))?
    };
    require!(vs.version == VAULT_VERSION, VaultError::InvalidVaultAccount);
    let expected = Pubkey::create_program_address(&[VAULT_SEED, &vs.vault_id, &[vs.bump]], program_id)
        .map_err(|_| error!(VaultError::InvalidStatePda))?;
    require_keys_eq!(expected, *info.key, VaultError::InvalidStatePda);
    Ok(vs)
}

/// Write `vs` back into the state account (discriminator + Borsh).
pub fn store_vault(info: &AccountInfo, vs: &VaultState) -> Result<()> {
    let mut data = info.try_borrow_mut_data()?;
    let mut dst: &mut [u8] = &mut data;
    vs.try_serialize(&mut dst)
}

/// `wallet` must be the PDA `[b"wallet", state, wallet_bump]`.
pub fn check_wallet(wallet: &Pubkey, state: &Pubkey, vs: &VaultState, program_id: &Pubkey) -> Result<()> {
    let expected =
        Pubkey::create_program_address(&[WALLET_SEED, state.as_ref(), &[vs.wallet_bump]], program_id)
            .map_err(|_| error!(VaultError::InvalidWalletPda))?;
    require_keys_eq!(expected, *wallet, VaultError::InvalidWalletPda);
    Ok(())
}

/// Hybrid mode: when the vault has a cosigner it must sign (Anchor's `Signer` already checked
/// `is_signer`); a vault without one rejects a stray cosigner account.
pub fn check_cosigner(vs: &VaultState, cosigner: Option<&Pubkey>) -> Result<()> {
    match (vs.cosigner, cosigner) {
        (Some(expected), Some(given)) => {
            require_keys_eq!(*given, expected, VaultError::WrongCosigner);
            Ok(())
        }
        (Some(_), None) => err!(VaultError::MissingCosigner),
        (None, Some(_)) => err!(VaultError::UnexpectedCosigner),
        (None, None) => Ok(()),
    }
}

/// Leaf rules (MESSAGE_FORMAT §5): `next_leaf <= leaf_index < tree_size`. Used as-is by
/// `init_sig_buffer` (a buffer may carry any instruction, rotate included).
pub fn check_leaf(vs: &VaultState, leaf_index: u32) -> Result<()> {
    require!(leaf_index >= vs.next_leaf, VaultError::LeafAlreadyUsed);
    require!(leaf_index < vs.tree_size, VaultError::LeafOutOfRange);
    Ok(())
}

/// [`check_leaf`] plus: the key's last leaf (`tree_size - 1`) is reserved for `rotate`, so
/// `execute` / `close_vault` must use `leaf_index < tree_size - 1`. Otherwise a vault whose last
/// leaf was spent on anything but a rotation could never be authorised again.
pub fn check_leaf_for(vs: &VaultState, leaf_index: u32, tag: IxTag) -> Result<()> {
    check_leaf(vs, leaf_index)?;
    if tag != IxTag::Rotate {
        require!(
            leaf_index < vs.tree_size.saturating_sub(1),
            VaultError::LeafReservedForRotate
        );
    }
    Ok(())
}

/// Everything `verify_authorization` needs besides the vault state.
pub struct AuthRequest<'a, 'info> {
    pub program_id: &'a Pubkey,
    pub state: &'a Pubkey,
    pub fee_payer: &'a Pubkey,
    pub cosigner: Option<&'a Pubkey>,
    pub tag: IxTag,
    pub leaf_index: u32,
    pub payload: &'a [u8],
    pub sig: Option<&'a [u8]>,
    pub sig_buffer: Option<&'a Account<'info, SigBuffer>>,
}

/// Cosigner + leaf rules + LMS verification of `prefix(tag, state, epoch, leaf) ‖ payload`
/// against `vs.current_root`. Touches no account data.
pub fn verify_authorization(vs: &VaultState, req: &AuthRequest) -> Result<()> {
    check_cosigner(vs, req.cosigner)?;
    check_leaf_for(vs, req.leaf_index, req.tag)?;

    let prefix = bunker_core::message_prefix(
        CLUSTER_ID,
        &req.program_id.to_bytes(),
        req.tag,
        &req.state.to_bytes(),
        vs.root_epoch,
        req.leaf_index,
    );

    match (req.sig, req.sig_buffer) {
        (Some(sig), None) => verify_sig(&vs.current_root, &prefix, req.payload, sig, req.leaf_index),
        (None, Some(buf)) => {
            require_keys_eq!(buf.state, *req.state, VaultError::SigBufferMismatch);
            require_keys_eq!(buf.payer, *req.fee_payer, VaultError::SigBufferMismatch);
            require!(
                buf.root_epoch == vs.root_epoch && buf.leaf_index == req.leaf_index,
                VaultError::SigBufferMismatch
            );
            let expected = Pubkey::create_program_address(
                &[
                    SIGBUF_SEED,
                    buf.state.as_ref(),
                    buf.payer.as_ref(),
                    &buf.root_epoch.to_le_bytes(),
                    &buf.leaf_index.to_le_bytes(),
                    &[buf.bump],
                ],
                req.program_id,
            )
            .map_err(|_| error!(VaultError::InvalidSigBufferPda))?;
            require_keys_eq!(expected, buf.key(), VaultError::InvalidSigBufferPda);

            let info = buf.to_account_info();
            let data = info.try_borrow_data()?;
            let sig = data
                .get(SigBuffer::DATA_OFFSET..SigBuffer::DATA_OFFSET + SIG_LEN)
                .ok_or(error!(VaultError::InvalidSignatureLength))?;
            verify_sig(&vs.current_root, &prefix, req.payload, sig, req.leaf_index)
        }
        (None, None) => err!(VaultError::MissingSignature),
        (Some(_), Some(_)) => err!(VaultError::AmbiguousSignatureSource),
    }
}

/// LMS verification in its own stack frame (the verifier keeps a ~2.2 KB scratch buffer).
#[inline(never)]
fn verify_sig(
    root: &[u8; ROOT_LEN],
    prefix: &[u8],
    payload: &[u8],
    sig: &[u8],
    leaf_index: u32,
) -> Result<()> {
    require!(sig.len() == SIG_LEN, VaultError::InvalidSignatureLength);
    // q is the first field of the signature; check it before spending compute on the chains.
    let q = bunker_lms::signature_leaf_index(sig).map_err(|_| error!(VaultError::InvalidSignatureLength))?;
    require!(q == leaf_index, VaultError::LeafMismatch);
    let q = bunker_lms::verify::<SolSha256>(root, &[prefix, payload], sig).map_err(|e| match e {
        LmsError::InvalidLength => error!(VaultError::InvalidSignatureLength),
        LmsError::LeafOutOfRange => error!(VaultError::LeafOutOfRange),
        _ => error!(VaultError::InvalidSignature),
    })?;
    require!(q == leaf_index, VaultError::LeafMismatch);
    Ok(())
}
