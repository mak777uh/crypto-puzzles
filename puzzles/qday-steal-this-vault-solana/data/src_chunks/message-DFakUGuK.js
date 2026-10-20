var e=`//! Signed message prefix, rotate / close payloads, vault options and vault id
//! (MESSAGE_FORMAT §3–§4).

use alloc::vec::Vec;

use bunker_lms::{Sha256Hasher, ROOT_LEN, TREE_SIZE};

use crate::{decode_actions, CoreError, DOMAIN, OPTIONS_VERSION, PREFIX_LEN, VAULT_ID_DOMAIN};

/// Cluster id byte inside the signed message.
#[repr(u8)]
#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash)]
pub enum Cluster {
    Localnet = 1,
    Devnet = 2,
    Testnet = 3,
    Mainnet = 4,
}

impl Cluster {
    pub const fn from_u8(v: u8) -> Option<Self> {
        match v {
            1 => Some(Cluster::Localnet),
            2 => Some(Cluster::Devnet),
            3 => Some(Cluster::Testnet),
            4 => Some(Cluster::Mainnet),
            _ => None,
        }
    }
}

impl TryFrom<u8> for Cluster {
    type Error = CoreError;
    fn try_from(v: u8) -> Result<Self, CoreError> {
        Cluster::from_u8(v).ok_or(CoreError::UnknownCluster(v))
    }
}

/// Instruction tag byte inside the signed message.
#[repr(u8)]
#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash)]
pub enum IxTag {
    Execute = 1,
    Rotate = 2,
    Close = 3,
}

impl IxTag {
    pub const fn from_u8(v: u8) -> Option<Self> {
        match v {
            1 => Some(IxTag::Execute),
            2 => Some(IxTag::Rotate),
            3 => Some(IxTag::Close),
            _ => None,
        }
    }
}

impl TryFrom<u8> for IxTag {
    type Error = CoreError;
    fn try_from(v: u8) -> Result<Self, CoreError> {
        IxTag::from_u8(v).ok_or(CoreError::UnknownIxTag(v))
    }
}

/// The 83-byte message prefix:
/// \`"BUNKER-v1" ‖ cluster ‖ program_id ‖ tag ‖ vault_state ‖ u32le(root_epoch) ‖ u32le(leaf_index)\`.
pub fn message_prefix(
    cluster: u8,
    program_id: &[u8; 32],
    tag: IxTag,
    vault_state: &[u8; 32],
    root_epoch: u32,
    leaf_index: u32,
) -> [u8; PREFIX_LEN] {
    let mut out = [0u8; PREFIX_LEN];
    out[0..9].copy_from_slice(DOMAIN);
    out[9] = cluster;
    out[10..42].copy_from_slice(program_id);
    out[42] = tag as u8;
    out[43..75].copy_from_slice(vault_state);
    out[75..79].copy_from_slice(&root_epoch.to_le_bytes());
    out[79..83].copy_from_slice(&leaf_index.to_le_bytes());
    out
}

/// Full signed message \`M = prefix ‖ payload\`.
pub fn signed_message(prefix: &[u8; PREFIX_LEN], payload: &[u8]) -> Vec<u8> {
    let mut m = Vec::with_capacity(PREFIX_LEN + payload.len());
    m.extend_from_slice(prefix);
    m.extend_from_slice(payload);
    m
}

/// The fields of a well-formed signed message (see [\`parse_signed_message\`]).
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub struct SignedMessage<'a> {
    pub cluster: Cluster,
    pub program_id: [u8; 32],
    pub tag: IxTag,
    pub vault_state: [u8; 32],
    pub root_epoch: u32,
    pub leaf_index: u32,
    pub payload: &'a [u8],
}

/// Check \`payload\` against the instruction tag: execute = canonical actions, rotate = a 48-byte
/// root, close = a 32-byte \`rent_to\`.
pub fn validate_payload(tag: IxTag, payload: &[u8]) -> Result<(), CoreError> {
    match tag {
        IxTag::Execute => decode_actions(payload).map(|_| ()),
        IxTag::Rotate => decode_rotate_payload(payload).map(|_| ()),
        IxTag::Close => decode_close_payload(payload).map(|_| ()),
    }
}

/// Parse and validate a full signed message \`M = prefix (83) ‖ payload\`: the \`"BUNKER-v1"\`
/// domain, a known cluster id and instruction tag, \`leaf_index < 1024\`, and a payload that is
/// valid for the tag. This is exactly the set of messages [\`message_prefix\`] +
/// [\`signed_message\`] produce from valid inputs.
pub fn parse_signed_message(m: &[u8]) -> Result<SignedMessage<'_>, CoreError> {
    if m.len() < PREFIX_LEN || &m[..DOMAIN.len()] != DOMAIN {
        return Err(CoreError::NotBunkerMessage);
    }
    let u32_at = |o: usize| u32::from_le_bytes([m[o], m[o + 1], m[o + 2], m[o + 3]]);
    let cluster = Cluster::try_from(m[9])?;
    let tag = IxTag::try_from(m[42])?;
    let mut program_id = [0u8; 32];
    program_id.copy_from_slice(&m[10..42]);
    let mut vault_state = [0u8; 32];
    vault_state.copy_from_slice(&m[43..75]);
    let (root_epoch, leaf_index) = (u32_at(75), u32_at(79));
    if leaf_index >= TREE_SIZE {
        return Err(CoreError::LeafOutOfRange(leaf_index));
    }
    // The program keeps a key's last leaf for \`rotate\` (execute and close are refused there), so
    // never produce a signature that can only fail and burn the one leaf that can still rotate.
    if leaf_index == TREE_SIZE - 1 && tag != IxTag::Rotate {
        return Err(CoreError::LeafReservedForRotate);
    }
    let payload = &m[PREFIX_LEN..];
    validate_payload(tag, payload)?;
    Ok(SignedMessage {
        cluster,
        program_id,
        tag,
        vault_state,
        root_epoch,
        leaf_index,
        payload,
    })
}

/// \`rotate\` payload: exactly \`new_root (48)\`.
pub fn decode_rotate_payload(payload: &[u8]) -> Result<[u8; ROOT_LEN], CoreError> {
    payload.try_into().map_err(|_| CoreError::InvalidLength)
}

/// \`close\` payload: exactly \`rent_to (32)\`.
pub fn decode_close_payload(payload: &[u8]) -> Result<[u8; 32], CoreError> {
    payload.try_into().map_err(|_| CoreError::InvalidLength)
}

/// \`options_v1 = u8(1) ‖ u8(has_cosigner) ‖ [cosigner (32) if has_cosigner = 1]\`.
pub fn encode_options(cosigner: Option<&[u8; 32]>) -> Vec<u8> {
    let mut out = Vec::with_capacity(34);
    out.push(OPTIONS_VERSION);
    match cosigner {
        Some(pk) => {
            out.push(1);
            out.extend_from_slice(pk);
        }
        None => out.push(0),
    }
    out
}

/// Strict inverse of [\`encode_options\`]: returns the cosigner, if any.
pub fn decode_options(options: &[u8]) -> Result<Option<[u8; 32]>, CoreError> {
    match options {
        [OPTIONS_VERSION, 0] => Ok(None),
        [OPTIONS_VERSION, 1, rest @ ..] if rest.len() == 32 => {
            let mut pk = [0u8; 32];
            pk.copy_from_slice(rest);
            Ok(Some(pk))
        }
        _ => Err(CoreError::InvalidOptions),
    }
}

/// \`vault_id = SHA-256("BUNKER/vault-id/v1" ‖ root_0 (48) ‖ options_v1)\`.
pub fn vault_id<Hs: Sha256Hasher>(root: &[u8; ROOT_LEN], options: &[u8]) -> [u8; 32] {
    Hs::hashv(&[VAULT_ID_DOMAIN, root, options])
}
`;export{e as default};