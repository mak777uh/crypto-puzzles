use anchor_lang::prelude::*;

/// Action kinds in [`ActionExecuted::kind`] (same values as the payload tags).
pub const KIND_TRANSFER_SOL: u8 = 1;
pub const KIND_TRANSFER_TOKEN: u8 = 2;
pub const KIND_CLOSE_TOKEN_ACCOUNT: u8 = 3;
pub const KIND_SET_HEIR: u8 = 0x10;
pub const KIND_CHECK_IN: u8 = 0x11;
pub const KIND_CLEAR_HEIR: u8 = 0x12;

#[event]
pub struct VaultOpened {
    pub state: Pubkey,
    pub wallet: Pubkey,
    pub vault_id: [u8; 32],
    pub root: [u8; 48],
    pub cosigner: Option<Pubkey>,
    pub slot: u64,
}

/// One event per action of a successful `execute`.
#[event]
pub struct ActionExecuted {
    pub state: Pubkey,
    pub root_epoch: u32,
    pub leaf_index: u32,
    /// Position of the action in the payload (0-based).
    pub index: u8,
    /// 1 = TransferSol, 2 = TransferToken, 3 = CloseTokenAccount, 0x10 = SetHeir,
    /// 0x11 = CheckIn, 0x12 = ClearHeir.
    pub kind: u8,
    /// Mint (default pubkey for SOL and the heir actions).
    pub mint: Pubkey,
    /// `to` / token `destination` / `rent_to` / the heir.
    pub destination: Pubkey,
    /// Lamports (TransferSol), token base units (TransferToken), lamports reclaimed
    /// (CloseTokenAccount), the new deadline in unix seconds (SetHeir, CheckIn) or lamports the
    /// heir record returned to the vault (ClearHeir).
    pub amount: u64,
}

/// One per successful `inherit`.
#[event]
pub struct Inherited {
    pub state: Pubkey,
    pub heir: Pubkey,
    /// Whoever sent it (anyone; it pays fees and the heir's new token accounts).
    pub caller: Pubkey,
    /// Unix time of the vault's first inherit, when it was sealed.
    pub inherited_at: i64,
    /// This call was the first one and sealed the vault.
    pub sealed_now: bool,
    /// Lamports moved from the vault's wallet to the heir.
    pub lamports: u64,
    /// Vault token accounts emptied in this call.
    pub token_accounts: u8,
}

/// One per vault token account an `inherit` emptied.
#[event]
pub struct InheritedToken {
    pub state: Pubkey,
    pub mint: Pubkey,
    /// The heir's canonical associated token account.
    pub heir_token_account: Pubkey,
    /// Token base units moved (before any Token-2022 transfer fee).
    pub amount: u64,
    /// The vault's token account was closed and its rent went to the heir.
    pub closed: bool,
}

#[event]
pub struct KeyRotated {
    pub state: Pubkey,
    /// Leaf of the old key that signed the rotation.
    pub leaf_index: u32,
    pub old_epoch: u32,
    pub new_epoch: u32,
    pub new_root: [u8; 48],
}

#[event]
pub struct VaultClosed {
    pub state: Pubkey,
    pub vault_id: [u8; 32],
    pub root_epoch: u32,
    pub leaf_index: u32,
    pub rent_to: Pubkey,
    /// Lamports moved from the state account to `rent_to`.
    pub lamports: u64,
    pub slot: u64,
    /// Lamports swept from the wallet PDA to `rent_to` (everything it held; 0 if it was empty).
    pub wallet_lamports: u64,
}
