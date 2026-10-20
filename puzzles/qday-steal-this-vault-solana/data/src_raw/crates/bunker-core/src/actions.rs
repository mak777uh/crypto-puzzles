//! `execute` payload: `action_count u8 (1..=8) ‖ action[0] ‖ … ‖ action[count-1]`
//! (MESSAGE_FORMAT §4). Decoding is strict and canonical: every accepted byte string re-encodes
//! to itself.

use alloc::vec::Vec;

use crate::{
    CoreError, HEIR_MAX_DAYS, HEIR_MIN_DAYS, MAX_ACTIONS, SPL_TOKEN, TAG_CHECK_IN, TAG_CLEAR_HEIR,
    TAG_CLOSE_TOKEN_ACCOUNT, TAG_SET_HEIR, TAG_TRANSFER_SOL, TAG_TRANSFER_TOKEN, TOKEN_2022,
};

/// One vault action.
#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash)]
pub enum Action {
    /// Tag `0x01`: `to (32) ‖ lamports u64 LE (> 0)`.
    TransferSol { to: [u8; 32], lamports: u64 },
    /// Tag `0x02`: `mint (32) ‖ token_program (32) ‖ destination (32) ‖ amount u64 LE (> 0)`.
    TransferToken {
        mint: [u8; 32],
        token_program: [u8; 32],
        destination: [u8; 32],
        amount: u64,
    },
    /// Tag `0x03`: `mint (32) ‖ token_program (32) ‖ rent_to (32)`.
    CloseTokenAccount {
        mint: [u8; 32],
        token_program: [u8; 32],
        rent_to: [u8; 32],
    },
    /// Tag `0x10` (Legacy): `heir (32, ≠ 0) ‖ inactivity_days u16 LE (30..=3650)`. Names the
    /// vault's heir and starts the countdown: if `inactivity_days` pass without a check-in, anyone
    /// can move everything in the vault to `heir` (the permissionless `inherit` instruction).
    SetHeir {
        heir: [u8; 32],
        inactivity_days: u16,
    },
    /// Tag `0x11` (Legacy): `heir (32, ≠ 0) ‖ inactivity_days u16 LE (30..=3650)`. Restarts the
    /// countdown. Both fields must equal the vault's heir record, so what is signed says exactly
    /// whose countdown restarts and for how long.
    CheckIn {
        heir: [u8; 32],
        inactivity_days: u16,
    },
    /// Tag `0x12` (Legacy): `heir (32, ≠ 0)`. Removes the heir (it must equal the recorded one)
    /// and closes the heir record; its rent goes back to the vault.
    ClearHeir { heir: [u8; 32] },
}

impl Action {
    /// The action's tag byte.
    pub const fn tag(&self) -> u8 {
        match self {
            Action::TransferSol { .. } => TAG_TRANSFER_SOL,
            Action::TransferToken { .. } => TAG_TRANSFER_TOKEN,
            Action::CloseTokenAccount { .. } => TAG_CLOSE_TOKEN_ACCOUNT,
            Action::SetHeir { .. } => TAG_SET_HEIR,
            Action::CheckIn { .. } => TAG_CHECK_IN,
            Action::ClearHeir { .. } => TAG_CLEAR_HEIR,
        }
    }

    /// Encoded size including the tag byte (41 / 105 / 97 / 35 / 35 / 33).
    pub const fn encoded_len(&self) -> usize {
        match self {
            Action::TransferSol { .. } => 41,
            Action::TransferToken { .. } => 105,
            Action::CloseTokenAccount { .. } => 97,
            Action::SetHeir { .. } | Action::CheckIn { .. } => 35,
            Action::ClearHeir { .. } => 33,
        }
    }

    /// `true` for the Legacy (heir) actions: SetHeir, CheckIn, ClearHeir. A payload carries at
    /// most one of them.
    pub const fn is_heir_action(&self) -> bool {
        matches!(
            self,
            Action::SetHeir { .. } | Action::CheckIn { .. } | Action::ClearHeir { .. }
        )
    }

    /// Check the per-action rules (amount > 0, known token program, heir ≠ 0, period in range).
    pub fn validate(&self) -> Result<(), CoreError> {
        match self {
            Action::TransferSol { lamports, .. } => {
                if *lamports == 0 {
                    return Err(CoreError::ZeroAmount);
                }
            }
            Action::TransferToken {
                token_program,
                amount,
                ..
            } => {
                check_token_program(token_program)?;
                if *amount == 0 {
                    return Err(CoreError::ZeroAmount);
                }
            }
            Action::CloseTokenAccount { token_program, .. } => check_token_program(token_program)?,
            Action::SetHeir {
                heir,
                inactivity_days,
            }
            | Action::CheckIn {
                heir,
                inactivity_days,
            } => {
                check_heir(heir)?;
                check_inactivity_days(*inactivity_days)?;
            }
            Action::ClearHeir { heir } => check_heir(heir)?,
        }
        Ok(())
    }

    fn encode_into(&self, out: &mut Vec<u8>) {
        out.push(self.tag());
        match self {
            Action::TransferSol { to, lamports } => {
                out.extend_from_slice(to);
                out.extend_from_slice(&lamports.to_le_bytes());
            }
            Action::TransferToken {
                mint,
                token_program,
                destination,
                amount,
            } => {
                out.extend_from_slice(mint);
                out.extend_from_slice(token_program);
                out.extend_from_slice(destination);
                out.extend_from_slice(&amount.to_le_bytes());
            }
            Action::CloseTokenAccount {
                mint,
                token_program,
                rent_to,
            } => {
                out.extend_from_slice(mint);
                out.extend_from_slice(token_program);
                out.extend_from_slice(rent_to);
            }
            Action::SetHeir {
                heir,
                inactivity_days,
            }
            | Action::CheckIn {
                heir,
                inactivity_days,
            } => {
                out.extend_from_slice(heir);
                out.extend_from_slice(&inactivity_days.to_le_bytes());
            }
            Action::ClearHeir { heir } => out.extend_from_slice(heir),
        }
    }
}

fn check_token_program(p: &[u8; 32]) -> Result<(), CoreError> {
    if *p == SPL_TOKEN || *p == TOKEN_2022 {
        Ok(())
    } else {
        Err(CoreError::InvalidTokenProgram)
    }
}

/// The all-zero key is the System Program's id, never a wallet: an unfilled heir field.
fn check_heir(heir: &[u8; 32]) -> Result<(), CoreError> {
    if *heir == [0u8; 32] {
        Err(CoreError::ZeroHeir)
    } else {
        Ok(())
    }
}

/// `HEIR_MIN_DAYS..=HEIR_MAX_DAYS` (30 days to 10 years).
pub fn check_inactivity_days(days: u16) -> Result<(), CoreError> {
    if (HEIR_MIN_DAYS..=HEIR_MAX_DAYS).contains(&days) {
        Ok(())
    } else {
        Err(CoreError::InactivityOutOfRange(days))
    }
}

/// Check that `actions` is a valid `execute` action list: 1..=8 actions, every action valid, and
/// at most one Legacy (heir) action.
pub fn validate_actions(actions: &[Action]) -> Result<(), CoreError> {
    if actions.is_empty() || actions.len() > MAX_ACTIONS {
        return Err(CoreError::BadActionCount);
    }
    actions.iter().try_for_each(Action::validate)?;
    if actions.iter().filter(|a| a.is_heir_action()).count() > 1 {
        return Err(CoreError::MultipleHeirActions);
    }
    Ok(())
}

/// Encode the `execute` payload as-is (no validation; use [`try_encode_actions`] in clients so
/// that an invalid list is never signed).
pub fn encode_actions(actions: &[Action]) -> Vec<u8> {
    let len = 1 + actions.iter().map(Action::encoded_len).sum::<usize>();
    let mut out = Vec::with_capacity(len);
    out.push(actions.len() as u8);
    for a in actions {
        a.encode_into(&mut out);
    }
    out
}

/// Validate, then encode the `execute` payload.
pub fn try_encode_actions(actions: &[Action]) -> Result<Vec<u8>, CoreError> {
    validate_actions(actions)?;
    Ok(encode_actions(actions))
}

struct Reader<'a> {
    buf: &'a [u8],
    pos: usize,
}

impl<'a> Reader<'a> {
    fn take<const L: usize>(&mut self) -> Result<[u8; L], CoreError> {
        let end = self.pos.checked_add(L).ok_or(CoreError::Truncated)?;
        let s = self.buf.get(self.pos..end).ok_or(CoreError::Truncated)?;
        self.pos = end;
        let mut out = [0u8; L];
        out.copy_from_slice(s);
        Ok(out)
    }
    fn u8(&mut self) -> Result<u8, CoreError> {
        Ok(self.take::<1>()?[0])
    }
    fn u16(&mut self) -> Result<u16, CoreError> {
        Ok(u16::from_le_bytes(self.take::<2>()?))
    }
    fn u64(&mut self) -> Result<u64, CoreError> {
        Ok(u64::from_le_bytes(self.take::<8>()?))
    }
}

/// Decode an `execute` payload. Strict and canonical: exact length, known tags, 1..=8 actions,
/// amounts > 0, token program SPL Token or Token-2022, heir ≠ 0, inactivity period 30..=3650 days,
/// at most one heir action, no trailing bytes.
pub fn decode_actions(payload: &[u8]) -> Result<Vec<Action>, CoreError> {
    if payload.is_empty() {
        return Err(CoreError::Empty);
    }
    let mut r = Reader {
        buf: payload,
        pos: 0,
    };
    let count = r.u8()? as usize;
    if count == 0 || count > MAX_ACTIONS {
        return Err(CoreError::BadActionCount);
    }
    let mut actions = Vec::with_capacity(count);
    let mut heir_actions = 0usize;
    for _ in 0..count {
        let tag = r.u8()?;
        let action = match tag {
            TAG_TRANSFER_SOL => Action::TransferSol {
                to: r.take()?,
                lamports: r.u64()?,
            },
            TAG_TRANSFER_TOKEN => Action::TransferToken {
                mint: r.take()?,
                token_program: r.take()?,
                destination: r.take()?,
                amount: r.u64()?,
            },
            TAG_CLOSE_TOKEN_ACCOUNT => Action::CloseTokenAccount {
                mint: r.take()?,
                token_program: r.take()?,
                rent_to: r.take()?,
            },
            TAG_SET_HEIR => Action::SetHeir {
                heir: r.take()?,
                inactivity_days: r.u16()?,
            },
            TAG_CHECK_IN => Action::CheckIn {
                heir: r.take()?,
                inactivity_days: r.u16()?,
            },
            TAG_CLEAR_HEIR => Action::ClearHeir { heir: r.take()? },
            t => return Err(CoreError::UnknownTag(t)),
        };
        action.validate()?;
        if action.is_heir_action() {
            heir_actions += 1;
            if heir_actions > 1 {
                return Err(CoreError::MultipleHeirActions);
            }
        }
        actions.push(action);
    }
    if r.pos != payload.len() {
        return Err(CoreError::TrailingBytes);
    }
    Ok(actions)
}
