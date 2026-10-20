//! Bunker — a post-quantum smart account for Solana.
//!
//! A vault is controlled by a stateful hash-based LMS key (RFC 8554 / NIST SP 800-208,
//! `LMS_SHA256_M32_H10` + `LMOTS_SHA256_N32_W4`). Every state change (`execute`, `rotate`,
//! `close_vault`) must carry one LMS signature over the canonical message defined in
//! `docs/MESSAGE_FORMAT.md`; the fee payer is trusted for nothing except paying fees. The one
//! unsigned state change is `inherit` (Legacy): it works only after the deadline that a signed
//! SetHeir / CheckIn set, and it can only pay the heir that signature named.
//!
//! There is no admin, no fee, no pause switch, no config account and no upgrade logic in this
//! program. See `docs/SPEC.md` §2 for the interface contract.
#![allow(unexpected_cfgs)]
#![allow(clippy::result_large_err)]

use anchor_lang::prelude::*;

pub mod actions;
pub mod auth;
pub mod errors;
/// `emit!` only with `--features events`: no client reads the events, and their code is program
/// size, i.e. deploy rent.
macro_rules! vault_emit {
    ($e:expr) => {{
        #[cfg(feature = "events")]
        anchor_lang::prelude::emit!($e);
        // Without the feature the event is still type-checked, never built or logged.
        #[cfg(not(feature = "events"))]
        let _ = || $e;
    }};
}
pub(crate) use vault_emit;

pub mod events;
pub mod hasher;
pub mod instructions;
pub mod legacy;
pub mod state;

pub use instructions::*;

declare_id!("22AEUZtxpbi1ReJGrG9SyFob3uHGzZERERyVNp6uV8Y6");

#[cfg(any(
    all(feature = "devnet", feature = "testnet"),
    all(feature = "devnet", feature = "mainnet"),
    all(feature = "testnet", feature = "mainnet"),
))]
compile_error!("enable at most one of the `devnet`, `testnet` and `mainnet` features");

/// Cluster id baked into every signed message (MESSAGE_FORMAT §4). Chosen at compile time:
/// `mainnet` (4) > `testnet` (3) > `devnet` (2) > `localnet` (1, the default).
pub const CLUSTER_ID: u8 = if cfg!(feature = "mainnet") {
    bunker_core::Cluster::Mainnet as u8
} else if cfg!(feature = "testnet") {
    bunker_core::Cluster::Testnet as u8
} else if cfg!(feature = "devnet") {
    bunker_core::Cluster::Devnet as u8
} else {
    bunker_core::Cluster::Localnet as u8
};

#[cfg(not(feature = "no-entrypoint"))]
solana_security_txt::security_txt! {
    name: "Bunker",
    project_url: "https://github.com/nicolascoculuzzi/bunker",
    contacts: "link:https://github.com/nicolascoculuzzi/bunker/security/advisories/new",
    policy: "https://github.com/nicolascoculuzzi/bunker/blob/main/SECURITY.md",
    preferred_languages: "en",
    source_code: "https://github.com/nicolascoculuzzi/bunker"
}

#[program]
pub mod bunker {
    use super::*;

    /// Create a vault for `root` (epoch 0). Anyone may call it; the address is bound to the root
    /// and the options through `vault_id`, so a front-runner can only open the same vault.
    pub fn open_vault(
        ctx: Context<OpenVault>,
        vault_id: [u8; 32],
        root: [u8; 48],
        cosigner: Option<Pubkey>,
    ) -> Result<()> {
        instructions::open_vault_handler(ctx, vault_id, root, cosigner)
    }

    /// Run 1..=8 signed actions (`payload` = canonical execute payload). `sig = None` reads the
    /// signature from `sig_buffer`. Per-action accounts follow in `remaining_accounts`.
    pub fn execute<'info>(
        ctx: Context<'info, Execute<'info>>,
        leaf_index: u32,
        payload: Vec<u8>,
        sig: Option<Vec<u8>>,
    ) -> Result<()> {
        instructions::execute_handler(ctx, leaf_index, payload, sig)
    }

    /// Move the vault to a new LMS root (next epoch). Signed by the current root.
    pub fn rotate<'info>(
        ctx: Context<'info, Rotate<'info>>,
        leaf_index: u32,
        new_root: [u8; 48],
        sig: Option<Vec<u8>>,
    ) -> Result<()> {
        instructions::rotate_handler(ctx, leaf_index, new_root, sig)
    }

    /// Close the vault: every lamport in the wallet is swept to `rent_to`, the state becomes a
    /// tombstone so the `vault_id` can never be re-opened, and its excess rent goes to `rent_to`.
    pub fn close_vault<'info>(
        ctx: Context<'info, CloseVault<'info>>,
        leaf_index: u32,
        rent_to: Pubkey,
        sig: Option<Vec<u8>>,
    ) -> Result<()> {
        instructions::close_vault_handler(ctx, leaf_index, rent_to, sig)
    }

    /// Create a signature buffer for (`state`, `payer`, `root_epoch`, `leaf_index`).
    pub fn init_sig_buffer(
        ctx: Context<InitSigBuffer>,
        root_epoch: u32,
        leaf_index: u32,
    ) -> Result<()> {
        instructions::init_handler(ctx, root_epoch, leaf_index)
    }

    /// Write `data` at `offset` into the buffer's signature area (any order, bounds-checked).
    pub fn write_sig_buffer(ctx: Context<WriteSigBuffer>, offset: u32, data: Vec<u8>) -> Result<()> {
        instructions::write_handler(ctx, offset, data)
    }

    /// Abandon a signature buffer and refund its rent to the payer.
    pub fn close_sig_buffer(ctx: Context<CloseSigBuffer>) -> Result<()> {
        instructions::close_handler(ctx)
    }

    /// Legacy: once the heir's deadline has passed, move everything in the vault to the recorded
    /// heir (SOL, and each vault token account passed in `remaining_accounts` as
    /// `[token_program, mint, vault_ata, heir_ata]`). Anyone may call it, it needs no signature, and
    /// it pays only the heir. The first call seals the vault: its key can never sign again.
    pub fn inherit<'info>(ctx: Context<'info, Inherit<'info>>) -> Result<()> {
        instructions::inherit_handler(ctx)
    }
}
