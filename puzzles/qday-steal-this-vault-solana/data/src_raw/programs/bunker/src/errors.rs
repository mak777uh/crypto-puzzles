use anchor_lang::prelude::*;

#[error_code]
pub enum VaultError {
    // --- open_vault -------------------------------------------------------------------------
    #[msg("vault_id does not match the root and options (MESSAGE_FORMAT 3)")]
    VaultIdMismatch,

    // --- vault state ------------------------------------------------------------------------
    #[msg("The vault is closed (tombstone)")]
    VaultClosed,
    #[msg("The state account is not a vault of this program")]
    InvalidVaultAccount,
    #[msg("The state account is not the vault PDA for its vault_id")]
    InvalidStatePda,
    #[msg("The wallet account is not the wallet PDA of this vault")]
    InvalidWalletPda,

    // --- cosigner (hybrid mode) ---------------------------------------------------------------
    #[msg("This vault requires its cosigner to sign")]
    MissingCosigner,
    #[msg("The cosigner account is not this vault's cosigner")]
    WrongCosigner,
    #[msg("A cosigner was passed but this vault has none")]
    UnexpectedCosigner,

    // --- leaves -------------------------------------------------------------------------------
    #[msg("leaf_index is below next_leaf (already used or skipped)")]
    LeafAlreadyUsed,
    #[msg("leaf_index is outside the key's tree")]
    LeafOutOfRange,
    #[msg("The signature's leaf (q) differs from leaf_index")]
    LeafMismatch,

    // --- signature ----------------------------------------------------------------------------
    #[msg("No signature: pass `sig` or a signature buffer")]
    MissingSignature,
    #[msg("Pass either an inline signature or a signature buffer, not both")]
    AmbiguousSignatureSource,
    #[msg("The signature has the wrong length")]
    InvalidSignatureLength,
    #[msg("The LMS signature does not verify for this message and root")]
    InvalidSignature,

    // --- signature buffer ---------------------------------------------------------------------
    #[msg("The signature buffer belongs to another vault, payer, epoch or leaf")]
    SigBufferMismatch,
    #[msg("The signature buffer is not the expected PDA")]
    InvalidSigBufferPda,
    #[msg("Write is outside the signature area")]
    SigBufferOutOfBounds,
    #[msg("Only the payer that created the buffer can write to or close it")]
    SigBufferPayerMismatch,
    #[msg("root_epoch does not match the vault's current epoch")]
    EpochMismatch,

    // --- payloads -----------------------------------------------------------------------------
    #[msg("The execute payload is not a valid canonical action list")]
    InvalidPayload,
    #[msg("new_root equals the current root")]
    SameRoot,

    // --- accounts -----------------------------------------------------------------------------
    #[msg("Not enough remaining accounts for the signed actions")]
    NotEnoughAccounts,
    #[msg("More remaining accounts than the signed actions use")]
    TooManyAccounts,
    #[msg("An account does not match the signed payload")]
    AccountMismatch,
    #[msg("An account that receives funds must be writable")]
    AccountNotWritable,
    #[msg("A destination aliases the wallet, the vault state or the signature buffer")]
    AliasedAccount,
    #[msg("Token program must be SPL Token or Token-2022")]
    InvalidTokenProgram,
    #[msg("The mint is not owned by the signed token program")]
    InvalidMintOwner,
    #[msg("The mint account is not a valid mint")]
    InvalidMint,
    #[msg("The source is not the wallet's canonical associated token account")]
    InvalidSourceAccount,
    #[msg("The destination is not a token account of the signed token program")]
    InvalidDestination,
    #[msg("The destination token account holds a different mint")]
    DestinationMintMismatch,
    #[msg("The destination is the source token account")]
    DestinationIsSource,
    #[msg("Mints with an active transfer hook are not supported")]
    TransferHookNotSupported,
    #[msg("Only empty token accounts can be closed")]
    TokenAccountNotEmpty,

    // --- SOL ----------------------------------------------------------------------------------
    #[msg("The wallet must keep 0 lamports or at least the rent-exempt minimum")]
    WalletBelowRentExempt,
    /// No longer returned: `close_vault` now sweeps the wallet's lamports to `rent_to`. Kept so
    /// the codes after it do not shift.
    #[msg("The wallet still holds lamports; withdraw everything before closing")]
    WalletNotEmpty,

    // --- misc ---------------------------------------------------------------------------------
    #[msg("Arithmetic overflow")]
    ArithmeticOverflow,

    // --- appended (never insert above: codes are 6000 + index) ---------------------------------
    #[msg("The last one-time leaf of each key is reserved for rotate")]
    LeafReservedForRotate,

    // --- Legacy: heir record and inherit (6040..) ----------------------------------------------
    #[msg("This vault has no heir")]
    HeirNotSet,
    #[msg("The heir record account is not this vault's heir PDA")]
    InvalidHeirAccount,
    #[msg("The signed heir or inactivity period does not match the vault's heir record")]
    HeirRecordMismatch,
    #[msg("The heir must be a wallet address: a System Program account that is not a program")]
    InvalidHeir,
    #[msg("The inactivity period must be between 30 and 3,650 days")]
    InvalidInactivityPeriod,
    #[msg("The heir's deadline has not passed yet")]
    InheritanceNotDue,
    #[msg("This vault was inherited: its heir can no longer change")]
    VaultInherited,
    #[msg("The heir account is not the vault's recorded heir")]
    HeirMismatch,
}
