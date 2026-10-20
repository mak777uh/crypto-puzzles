use core::fmt;

/// Errors from decoding / validating Bunker messages and from key derivation.
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum CoreError {
    /// The payload is empty.
    Empty,
    /// `action_count` is 0 or greater than `MAX_ACTIONS`.
    BadActionCount,
    /// Unknown (or reserved) action tag.
    UnknownTag(u8),
    /// The payload ends in the middle of an action.
    Truncated,
    /// Bytes remain after the last action.
    TrailingBytes,
    /// A `lamports` / `amount` field is zero.
    ZeroAmount,
    /// `token_program` is neither SPL Token nor Token-2022.
    InvalidTokenProgram,
    /// A fixed-size payload (rotate / close / options) has the wrong length.
    InvalidLength,
    /// Unknown options version or invalid `has_cosigner` flag.
    InvalidOptions,
    /// The mnemonic is not a valid 24-word English BIP-39 mnemonic.
    InvalidMnemonic,
    /// Unknown cluster id byte.
    UnknownCluster(u8),
    /// Unknown instruction tag byte.
    UnknownIxTag(u8),
    /// The message does not start with `"BUNKER-v1"` or is shorter than the 83-byte prefix.
    NotBunkerMessage,
    /// A leaf index is not below the tree size (1,024).
    LeafOutOfRange(u32),
    /// The key's last leaf (1023) is kept for `rotate`; `execute` and `close` may not use it.
    LeafReservedForRotate,
    /// An epoch key binding of the wrong shape: epoch 0 takes `options_v1`, every later epoch the
    /// vault's 32-byte `vault_id` (MESSAGE_FORMAT §2).
    InvalidKeyBinding,
    /// A heir action names the all-zero address (the System Program id, never a wallet).
    ZeroHeir,
    /// A heir action's inactivity period is outside 30..=3650 days.
    InactivityOutOfRange(u16),
    /// More than one heir action (SetHeir, CheckIn, ClearHeir) in one payload.
    MultipleHeirActions,
}

impl fmt::Display for CoreError {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        match self {
            CoreError::Empty => f.write_str("empty payload"),
            CoreError::BadActionCount => f.write_str("action count must be between 1 and 8"),
            CoreError::UnknownTag(t) => write!(f, "unknown action tag 0x{t:02x}"),
            CoreError::Truncated => f.write_str("payload truncated"),
            CoreError::TrailingBytes => f.write_str("trailing bytes after the last action"),
            CoreError::ZeroAmount => f.write_str("amount must be greater than zero"),
            CoreError::InvalidTokenProgram => {
                f.write_str("token program must be SPL Token or Token-2022")
            }
            CoreError::InvalidLength => f.write_str("wrong length"),
            CoreError::InvalidOptions => f.write_str("invalid vault options encoding"),
            CoreError::InvalidMnemonic => f.write_str(
                "invalid mnemonic: expected 24 English BIP-39 words with a valid checksum",
            ),
            CoreError::UnknownCluster(c) => write!(f, "unknown cluster id {c}"),
            CoreError::UnknownIxTag(t) => write!(f, "unknown instruction tag {t}"),
            CoreError::NotBunkerMessage => {
                f.write_str("not a BUNKER-v1 message (bad domain or shorter than 83 bytes)")
            }
            CoreError::LeafOutOfRange(q) => {
                write!(f, "leaf index {q} out of range (tree size 1024)")
            }
            CoreError::LeafReservedForRotate => {
                f.write_str("leaf 1023 is reserved for rotate: execute and close may not use it")
            }
            CoreError::InvalidKeyBinding => f.write_str(
                "invalid key binding: epoch 0 takes options_v1, later epochs the 32-byte vault_id",
            ),
            CoreError::ZeroHeir => f.write_str("heir must not be the all-zero address"),
            CoreError::InactivityOutOfRange(d) => {
                write!(f, "inactivity period of {d} days is outside 30..=3650 days")
            }
            CoreError::MultipleHeirActions => {
                f.write_str("at most one heir action (SetHeir, CheckIn, ClearHeir) per payload")
            }
        }
    }
}
