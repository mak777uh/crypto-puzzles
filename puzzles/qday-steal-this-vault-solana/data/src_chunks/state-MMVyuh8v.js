var e=`use anchor_lang::prelude::*;

/// Seed of the vault state PDA: \`[b"vault", vault_id]\`.
pub const VAULT_SEED: &[u8] = b"vault";
/// Seed of the wallet PDA (the vault's address): \`[b"wallet", state]\`.
pub const WALLET_SEED: &[u8] = b"wallet";
/// Seed of a signature buffer PDA:
/// \`[b"sigbuf", state, payer, u32le(root_epoch), u32le(leaf_index)]\`.
pub const SIGBUF_SEED: &[u8] = b"sigbuf";

/// Seed of a vault's heir record (Legacy): \`[b"heir", state]\`.
pub const HEIR_SEED: &[u8] = b"heir";

/// \`VaultState.version\`.
pub const VAULT_VERSION: u8 = 1;
/// \`Heir.version\`.
pub const HEIR_VERSION: u8 = 1;

/// Per-vault state. PDA \`[b"vault", vault_id]\`.
#[account]
#[derive(InitSpace, Debug, PartialEq, Eq)]
pub struct VaultState {
    /// Layout version (1).
    pub version: u8,
    /// Bump of the state PDA.
    pub bump: u8,
    /// Bump of the wallet PDA \`[b"wallet", state]\`.
    pub wallet_bump: u8,
    /// \`SHA-256("BUNKER/vault-id/v1" ‖ root_0 ‖ options_v1)\`.
    pub vault_id: [u8; 32],
    /// Current LMS public key \`I (16) ‖ T[1] (32)\`.
    pub current_root: [u8; 48],
    /// +1 on every rotation.
    pub root_epoch: u32,
    /// Lowest leaf index that may still be used in this epoch.
    pub next_leaf: u32,
    /// Leaves per key (1024).
    pub tree_size: u32,
    /// Hybrid mode: Ed25519 key that must co-sign \`execute\` / \`rotate\` / \`close_vault\`.
    pub cosigner: Option<Pubkey>,
    /// Slot of \`open_vault\`.
    pub created_slot: u64,
    /// Number of successful \`execute\` calls.
    pub executed_count: u64,
    /// Reserved for Phase 2 (recovery, cosigner change).
    pub reserved: [u8; 128],
}

impl VaultState {
    /// Account size including the 8-byte discriminator (280).
    pub const SPACE: usize = 8 + Self::INIT_SPACE;
}

/// What a closed vault's state account turns into. Keeps the \`vault_id\` so the address can never
/// be re-initialised (which would reset \`next_leaf\` and let old signatures replay).
#[account]
#[derive(InitSpace, Debug, PartialEq, Eq)]
pub struct VaultTombstone {
    pub vault_id: [u8; 32],
    pub closed_slot: u64,
}

impl VaultTombstone {
    /// Account size including the 8-byte discriminator (48).
    pub const SPACE: usize = 8 + Self::INIT_SPACE;
}

/// Signature buffer header. PDA \`[b"sigbuf", state, payer, u32le(root_epoch), u32le(leaf_index)]\`.
/// The account is \`SigBuffer::SPACE\` bytes: discriminator (8) ‖ header (73) ‖ signature area
/// (\`SIG_LEN\` = 2,508 bytes, zero-initialised) starting at [\`SigBuffer::DATA_OFFSET\`].
#[account]
#[derive(InitSpace, Debug, PartialEq, Eq)]
pub struct SigBuffer {
    pub state: Pubkey,
    pub payer: Pubkey,
    pub root_epoch: u32,
    pub leaf_index: u32,
    pub bump: u8,
}

impl SigBuffer {
    /// Offset of the signature area inside the account data (81).
    pub const DATA_OFFSET: usize = 8 + Self::INIT_SPACE;
    /// Total account size (2,589).
    pub const SPACE: usize = Self::DATA_OFFSET + bunker_lms::SIG_LEN;
}

/// A vault's heir (Legacy). PDA \`[b"heir", state]\`, created by a signed SetHeir (the fee payer
/// pays its rent), restarted by CheckIn, closed by ClearHeir (rent back to the vault's wallet).
/// Once \`deadline\` has passed, the permissionless \`inherit\` moves everything in the vault to
/// \`heir\`; its first call seals the vault and sets \`inherited_at\`, after which nothing changes
/// this record again.
#[account]
#[derive(InitSpace, Debug, PartialEq, Eq)]
pub struct Heir {
    /// Layout version (1).
    pub version: u8,
    /// Bump of this PDA.
    pub bump: u8,
    /// The signed inactivity period, 30..=3650 days.
    pub inactivity_days: u16,
    /// The vault's state account.
    pub state: Pubkey,
    /// Who inherits: SOL goes to this address, tokens to its canonical associated token accounts.
    pub heir: Pubkey,
    /// Unix time of the SetHeir that named this heir and period.
    pub set_at: i64,
    /// Unix time from which \`inherit\` works: the last SetHeir or CheckIn + inactivity_days.
    pub deadline: i64,
    /// Unix time of the first \`inherit\` (the vault was sealed then); 0 while not inherited.
    pub inherited_at: i64,
}

impl Heir {
    /// Account size including the 8-byte discriminator (100).
    pub const SPACE: usize = 8 + Self::INIT_SPACE;
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn sizes() {
        assert_eq!(VaultState::SPACE, 280);
        assert_eq!(VaultTombstone::SPACE, 48);
        assert_eq!(SigBuffer::DATA_OFFSET, 81);
        assert_eq!(SigBuffer::SPACE, 2589);
        assert_eq!(Heir::SPACE, 100);
    }
}
`;export{e as default};