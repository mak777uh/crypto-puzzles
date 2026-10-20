var e=`//! Test harness: LiteSVM environment, fixed LMS keys, hand-built instructions (Anchor
//! discriminators + Borsh by hand), token helpers and assertions.
#![allow(dead_code)]

use std::sync::OnceLock;

use base64::Engine;
use litesvm::types::{FailedTransactionMetadata, TransactionMetadata, TransactionResult};
use litesvm::LiteSVM;
use bunker_lms::LmsKey;
use bunker_core::{self as core, Action, IxTag};
use sha2::{Digest, Sha256};
use solana_account::Account;
use solana_address::Address;
use solana_instruction::{AccountMeta, Instruction};
use solana_instruction_error::InstructionError;
use solana_keypair::Keypair;
use solana_message::{Message, VersionedMessage};
use solana_program_pack::Pack;
use solana_signer::Signer;
use solana_transaction::versioned::VersionedTransaction;
use solana_transaction::Transaction;
use solana_transaction_error::TransactionError;
use spl_token_2022_interface::extension::{ExtensionType, StateWithExtensions};

// ------------------------------------------------------------------------------------------------
// Constants
// ------------------------------------------------------------------------------------------------

pub const PROGRAM_ID: Address = Address::from_str_const("22AEUZtxpbi1ReJGrG9SyFob3uHGzZERERyVNp6uV8Y6");
pub const SYSTEM_PROGRAM: Address = Address::from_str_const("11111111111111111111111111111111");
pub const SPL_TOKEN: Address = Address::new_from_array(core::SPL_TOKEN);
pub const TOKEN_2022: Address = Address::new_from_array(core::TOKEN_2022);
pub const ATA_PROGRAM: Address = Address::from_str_const("ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL");
pub const COMPUTE_BUDGET: Address = Address::from_str_const("ComputeBudget111111111111111111111111111111");
pub const BPF_LOADER_UPGRADEABLE: Address = Address::from_str_const("BPFLoaderUpgradeab1e11111111111111111111111");
pub const MEMO_PROGRAM: Address = Address::from_str_const("MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr");

/// Cluster id of the default (\`localnet\`) build under test.
pub const LOCALNET: u8 = 1;
pub const DEVNET: u8 = 2;
pub const MAINNET: u8 = 4;
pub const LAMPORTS_PER_SOL: u64 = 1_000_000_000;
/// Rent-exempt minimum of a 0-byte account (the wallet PDA).
pub const RENT_MIN_0: u64 = 890_880;
/// Legacy transaction size limit (bytes).
pub const PACKET_DATA_SIZE: usize = 1232;
/// Default compute-unit limit in test transactions.
pub const TEST_CU_LIMIT: u32 = 1_400_000;

// ------------------------------------------------------------------------------------------------
// Keys (fixed test mnemonics; each key is ~1M hashes to build, so cache it per test binary)
// ------------------------------------------------------------------------------------------------

pub fn mnemonic(tag: u8) -> String {
    core::generate_mnemonic(&[tag; 32])
}

/// A test key derived the way clients derive it (MESSAGE_FORMAT §2): bound to localnet, this
/// program and the vault (\`options_v1\` at epoch 0, the \`vault_id\` after). The program itself only
/// checks signatures against the stored root; the binding just keeps the fixtures realistic.
fn derive_key(tag: u8, epoch: u32, binding: &[u8]) -> LmsKey {
    let seed = core::mnemonic_to_seed64(&mnemonic(tag)).expect("valid test mnemonic");
    let program_id = PROGRAM_ID.to_bytes();
    let ctx = core::KeyContext { cluster: core::Cluster::Localnet, program_id: &program_id, binding };
    core::epoch_key(&seed, epoch, &ctx).expect("valid key binding")
}

/// Mnemonic "A", epoch 0, for a vault without a cosigner.
pub fn key_a0() -> &'static LmsKey {
    static K: OnceLock<LmsKey> = OnceLock::new();
    K.get_or_init(|| derive_key(0xA1, 0, &core::encode_options(None)))
}
/// Mnemonic "A", epoch 1 (rotation target), bound to the vault \`key_a0\` opens without a cosigner.
pub fn key_a1() -> &'static LmsKey {
    static K: OnceLock<LmsKey> = OnceLock::new();
    K.get_or_init(|| {
        let vault_id = core::vault_id::<core::Sha2Hasher>(&key_a0().root(), &core::encode_options(None));
        derive_key(0xA1, 1, &vault_id)
    })
}
/// Mnemonic "B", epoch 0 (an unrelated vault).
pub fn key_b0() -> &'static LmsKey {
    static K: OnceLock<LmsKey> = OnceLock::new();
    K.get_or_init(|| derive_key(0xB2, 0, &core::encode_options(None)))
}

/// Deterministic keypair: the n-th call in the current test thread (each libtest test runs on
/// its own thread), so addresses, PDA bumps and therefore compute units are reproducible.
pub fn new_keypair() -> Keypair {
    use std::cell::Cell;
    thread_local!(static N: Cell<u64> = const { Cell::new(0) });
    let n = N.with(|c| {
        let v = c.get();
        c.set(v + 1);
        v
    });
    Keypair::new_from_array(sha256(&[b"bunker-test-keypair", &n.to_le_bytes()]))
}

// ------------------------------------------------------------------------------------------------
// Anchor encoding by hand
// ------------------------------------------------------------------------------------------------

pub fn sha256(parts: &[&[u8]]) -> [u8; 32] {
    let mut h = Sha256::new();
    for p in parts {
        h.update(p);
    }
    h.finalize().into()
}

pub fn ix_disc(name: &str) -> [u8; 8] {
    sha256(&[format!("global:{name}").as_bytes()])[..8].try_into().unwrap()
}
pub fn account_disc(name: &str) -> [u8; 8] {
    sha256(&[format!("account:{name}").as_bytes()])[..8].try_into().unwrap()
}
pub fn event_disc(name: &str) -> [u8; 8] {
    sha256(&[format!("event:{name}").as_bytes()])[..8].try_into().unwrap()
}

fn put_vec(out: &mut Vec<u8>, bytes: &[u8]) {
    out.extend_from_slice(&(bytes.len() as u32).to_le_bytes());
    out.extend_from_slice(bytes);
}
fn put_opt_vec(out: &mut Vec<u8>, bytes: Option<&[u8]>) {
    match bytes {
        None => out.push(0),
        Some(b) => {
            out.push(1);
            put_vec(out, b);
        }
    }
}

/// Anchor's \`Option<Account>\` convention: \`None\` is the program id (read-only, not a signer).
fn opt_meta(addr: Option<Address>, writable: bool, signer: bool) -> AccountMeta {
    match addr {
        None => AccountMeta::new_readonly(PROGRAM_ID, false),
        Some(a) if writable => AccountMeta::new(a, signer),
        Some(a) => AccountMeta::new_readonly(a, signer),
    }
}

// ------------------------------------------------------------------------------------------------
// Vault addresses
// ------------------------------------------------------------------------------------------------

#[derive(Clone, Debug)]
pub struct Vault {
    pub vault_id: [u8; 32],
    pub root: [u8; 48],
    pub cosigner: Option<Address>,
    pub state: Address,
    pub wallet: Address,
}

impl Vault {
    pub fn new(root: [u8; 48], cosigner: Option<Address>) -> Self {
        let cos = cosigner.map(|c| c.to_bytes());
        let options = core::encode_options(cos.as_ref());
        let vault_id = core::vault_id::<core::Sha2Hasher>(&root, &options);
        let (state, _) = Address::find_program_address(&[b"vault", &vault_id], &PROGRAM_ID);
        let (wallet, _) = Address::find_program_address(&[b"wallet", state.as_ref()], &PROGRAM_ID);
        Vault { vault_id, root, cosigner, state, wallet }
    }

    pub fn ata(&self, mint: &Address, token_program: &Address) -> Address {
        ata(&self.wallet, mint, token_program)
    }
}

pub fn ata(owner: &Address, mint: &Address, token_program: &Address) -> Address {
    spl_associated_token_account_interface::address::get_associated_token_address_with_program_id(
        owner,
        mint,
        token_program,
    )
}

/// The vault's heir record PDA \`[b"heir", state]\`.
pub fn heir_pda(state: &Address) -> Address {
    heir_pda_with_bump(state).0
}

pub fn heir_pda_with_bump(state: &Address) -> (Address, u8) {
    Address::find_program_address(&[b"heir", state.as_ref()], &PROGRAM_ID)
}

pub fn sig_buffer_address(state: &Address, payer: &Address, epoch: u32, leaf: u32) -> Address {
    Address::find_program_address(
        &[b"sigbuf", state.as_ref(), payer.as_ref(), &epoch.to_le_bytes(), &leaf.to_le_bytes()],
        &PROGRAM_ID,
    )
    .0
}

// ------------------------------------------------------------------------------------------------
// Instructions
// ------------------------------------------------------------------------------------------------

pub fn open_vault_ix(payer: &Address, v: &Vault) -> Instruction {
    open_vault_ix_raw(payer, &v.state, &v.wallet, v.vault_id, v.root, v.cosigner)
}

pub fn open_vault_ix_raw(
    payer: &Address,
    state: &Address,
    wallet: &Address,
    vault_id: [u8; 32],
    root: [u8; 48],
    cosigner: Option<Address>,
) -> Instruction {
    let mut data = ix_disc("open_vault").to_vec();
    data.extend_from_slice(&vault_id);
    data.extend_from_slice(&root);
    match cosigner {
        None => data.push(0),
        Some(c) => {
            data.push(1);
            data.extend_from_slice(c.as_ref());
        }
    }
    Instruction {
        program_id: PROGRAM_ID,
        accounts: vec![
            AccountMeta::new(*payer, true),
            AccountMeta::new(*state, false),
            AccountMeta::new_readonly(*wallet, false),
            AccountMeta::new_readonly(SYSTEM_PROGRAM, false),
        ],
        data,
    }
}

/// Optional accounts shared by execute / rotate / close_vault.
#[derive(Clone, Copy, Default, Debug)]
pub struct Opt {
    pub cosigner: Option<Address>,
    /// Pass the cosigner account but without a signature (attack).
    pub cosigner_unsigned: bool,
    pub sig_buffer: Option<Address>,
}

impl Opt {
    pub fn cosigner(c: Address) -> Self {
        Opt { cosigner: Some(c), ..Default::default() }
    }
    pub fn buffer(b: Address) -> Self {
        Opt { sig_buffer: Some(b), ..Default::default() }
    }
    fn metas(&self) -> [AccountMeta; 2] {
        [
            opt_meta(self.cosigner, false, !self.cosigner_unsigned),
            opt_meta(self.sig_buffer, true, false),
        ]
    }
}

pub fn execute_ix(
    fee_payer: &Address,
    v: &Vault,
    opt: Opt,
    leaf: u32,
    payload: &[u8],
    sig: Option<&[u8]>,
    remaining: Vec<AccountMeta>,
) -> Instruction {
    execute_ix_raw(fee_payer, &v.state, &v.wallet, opt, leaf, payload, sig, remaining)
}

#[allow(clippy::too_many_arguments)]
pub fn execute_ix_raw(
    fee_payer: &Address,
    state: &Address,
    wallet: &Address,
    opt: Opt,
    leaf: u32,
    payload: &[u8],
    sig: Option<&[u8]>,
    remaining: Vec<AccountMeta>,
) -> Instruction {
    let mut data = ix_disc("execute").to_vec();
    data.extend_from_slice(&leaf.to_le_bytes());
    put_vec(&mut data, payload);
    put_opt_vec(&mut data, sig);
    let [cos, buf] = opt.metas();
    let mut accounts = vec![
        AccountMeta::new(*fee_payer, true),
        AccountMeta::new(*state, false),
        AccountMeta::new(*wallet, false),
        cos,
        buf,
        AccountMeta::new_readonly(SYSTEM_PROGRAM, false),
    ];
    accounts.extend(remaining);
    Instruction { program_id: PROGRAM_ID, accounts, data }
}

pub fn rotate_ix(fee_payer: &Address, v: &Vault, opt: Opt, leaf: u32, new_root: &[u8; 48], sig: Option<&[u8]>) -> Instruction {
    let mut data = ix_disc("rotate").to_vec();
    data.extend_from_slice(&leaf.to_le_bytes());
    data.extend_from_slice(new_root);
    put_opt_vec(&mut data, sig);
    let [cos, buf] = opt.metas();
    Instruction {
        program_id: PROGRAM_ID,
        accounts: vec![
            AccountMeta::new(*fee_payer, true),
            AccountMeta::new(v.state, false),
            cos,
            buf,
            AccountMeta::new_readonly(SYSTEM_PROGRAM, false),
        ],
        data,
    }
}

pub fn close_vault_ix(
    fee_payer: &Address,
    v: &Vault,
    opt: Opt,
    leaf: u32,
    rent_to: &Address,
    sig: Option<&[u8]>,
) -> Instruction {
    close_vault_ix_raw(fee_payer, v, opt, leaf, rent_to, rent_to, sig)
}

/// \`rent_to_arg\` is the signed/argument value, \`rent_to_account\` the account actually passed.
pub fn close_vault_ix_raw(
    fee_payer: &Address,
    v: &Vault,
    opt: Opt,
    leaf: u32,
    rent_to_arg: &Address,
    rent_to_account: &Address,
    sig: Option<&[u8]>,
) -> Instruction {
    let mut data = ix_disc("close_vault").to_vec();
    data.extend_from_slice(&leaf.to_le_bytes());
    data.extend_from_slice(rent_to_arg.as_ref());
    put_opt_vec(&mut data, sig);
    let [cos, buf] = opt.metas();
    Instruction {
        program_id: PROGRAM_ID,
        accounts: vec![
            AccountMeta::new(*fee_payer, true),
            AccountMeta::new(v.state, false),
            // Writable: close_vault sweeps the wallet's lamports to rent_to.
            AccountMeta::new(v.wallet, false),
            AccountMeta::new(*rent_to_account, false),
            cos,
            buf,
            AccountMeta::new_readonly(SYSTEM_PROGRAM, false),
        ],
        data,
    }
}

pub fn init_sig_buffer_ix(payer: &Address, state: &Address, epoch: u32, leaf: u32) -> Instruction {
    let buffer = sig_buffer_address(state, payer, epoch, leaf);
    let mut data = ix_disc("init_sig_buffer").to_vec();
    data.extend_from_slice(&epoch.to_le_bytes());
    data.extend_from_slice(&leaf.to_le_bytes());
    Instruction {
        program_id: PROGRAM_ID,
        accounts: vec![
            AccountMeta::new(*payer, true),
            AccountMeta::new_readonly(*state, false),
            AccountMeta::new(buffer, false),
            AccountMeta::new_readonly(SYSTEM_PROGRAM, false),
        ],
        data,
    }
}

pub fn write_sig_buffer_ix(payer: &Address, buffer: &Address, offset: u32, chunk: &[u8]) -> Instruction {
    let mut data = ix_disc("write_sig_buffer").to_vec();
    data.extend_from_slice(&offset.to_le_bytes());
    put_vec(&mut data, chunk);
    Instruction {
        program_id: PROGRAM_ID,
        accounts: vec![AccountMeta::new_readonly(*payer, true), AccountMeta::new(*buffer, false)],
        data,
    }
}

pub fn close_sig_buffer_ix(payer: &Address, buffer: &Address) -> Instruction {
    Instruction {
        program_id: PROGRAM_ID,
        accounts: vec![AccountMeta::new(*payer, true), AccountMeta::new(*buffer, false)],
        data: ix_disc("close_sig_buffer").to_vec(),
    }
}

pub fn set_cu_limit_ix(units: u32) -> Instruction {
    let mut data = vec![2u8];
    data.extend_from_slice(&units.to_le_bytes());
    Instruction { program_id: COMPUTE_BUDGET, accounts: vec![], data }
}
pub fn set_cu_price_ix(micro_lamports: u64) -> Instruction {
    let mut data = vec![3u8];
    data.extend_from_slice(&micro_lamports.to_le_bytes());
    Instruction { program_id: COMPUTE_BUDGET, accounts: vec![], data }
}

/// Remaining accounts for \`actions\` of vault \`v\`, in action order (SPEC §2), heir actions included.
pub fn remaining_for_vault(v: &Vault, actions: &[Action]) -> Vec<AccountMeta> {
    let mut out = Vec::new();
    for a in actions {
        match *a {
            Action::SetHeir { heir, .. } => {
                out.push(AccountMeta::new(heir_pda(&v.state), false));
                out.push(AccountMeta::new_readonly(Address::new_from_array(heir), false));
            }
            Action::CheckIn { .. } | Action::ClearHeir { .. } => out.push(AccountMeta::new(heir_pda(&v.state), false)),
            _ => out.extend(remaining_for(&v.wallet, std::slice::from_ref(a))),
        }
    }
    out
}

/// Remaining accounts for transfer \`actions\` (SPEC §2). Heir actions need the vault's state:
/// use [\`remaining_for_vault\`].
pub fn remaining_for(wallet: &Address, actions: &[Action]) -> Vec<AccountMeta> {
    let mut out = Vec::new();
    for a in actions {
        match *a {
            Action::SetHeir { .. } | Action::CheckIn { .. } | Action::ClearHeir { .. } => {
                panic!("heir actions need the vault's state: use remaining_for_vault")
            }
            Action::TransferSol { to, .. } => out.push(AccountMeta::new(Address::new_from_array(to), false)),
            Action::TransferToken { mint, token_program, destination, .. } => {
                let (mint, tp) = (Address::new_from_array(mint), Address::new_from_array(token_program));
                out.push(AccountMeta::new_readonly(tp, false));
                out.push(AccountMeta::new_readonly(mint, false));
                out.push(AccountMeta::new(ata(wallet, &mint, &tp), false));
                out.push(AccountMeta::new(Address::new_from_array(destination), false));
            }
            Action::CloseTokenAccount { mint, token_program, rent_to } => {
                let (mint, tp) = (Address::new_from_array(mint), Address::new_from_array(token_program));
                out.push(AccountMeta::new_readonly(tp, false));
                out.push(AccountMeta::new(ata(wallet, &mint, &tp), false));
                out.push(AccountMeta::new(Address::new_from_array(rent_to), false));
            }
        }
    }
    out
}

pub fn sol(to: &Address, lamports: u64) -> Action {
    Action::TransferSol { to: to.to_bytes(), lamports }
}
pub fn token(mint: &Address, token_program: &Address, destination: &Address, amount: u64) -> Action {
    Action::TransferToken {
        mint: mint.to_bytes(),
        token_program: token_program.to_bytes(),
        destination: destination.to_bytes(),
        amount,
    }
}
pub fn close_ata(mint: &Address, token_program: &Address, rent_to: &Address) -> Action {
    Action::CloseTokenAccount { mint: mint.to_bytes(), token_program: token_program.to_bytes(), rent_to: rent_to.to_bytes() }
}
pub fn set_heir(heir: &Address, days: u16) -> Action {
    Action::SetHeir { heir: heir.to_bytes(), inactivity_days: days }
}
pub fn check_in(heir: &Address, days: u16) -> Action {
    Action::CheckIn { heir: heir.to_bytes(), inactivity_days: days }
}
pub fn clear_heir(heir: &Address) -> Action {
    Action::ClearHeir { heir: heir.to_bytes() }
}

// ------------------------------------------------------------------------------------------------
// Legacy: inherit
// ------------------------------------------------------------------------------------------------

pub const DAY: i64 = 86_400;
/// Unix time the Legacy tests start at (9 Oct 2026, 12:00 UTC).
pub const T0: i64 = 1_791_547_200;
/// Rent-exempt minimum of the 100-byte heir record.
pub const HEIR_RECORD_RENT: u64 = (128 + 100) * 6_960;

/// One token account for \`inherit\` to empty: the mint and its token program.
#[derive(Clone, Copy, Debug)]
pub struct InheritToken {
    pub mint: Address,
    pub token_program: Address,
}

impl From<&TestMint> for InheritToken {
    fn from(t: &TestMint) -> Self {
        InheritToken { mint: t.mint, token_program: t.program }
    }
}

/// \`[token_program, mint, vault_ata (w), heir_ata (w)]\` for each token, in order.
pub fn inherit_remaining(v: &Vault, heir: &Address, tokens: &[InheritToken]) -> Vec<AccountMeta> {
    tokens
        .iter()
        .flat_map(|t| {
            [
                AccountMeta::new_readonly(t.token_program, false),
                AccountMeta::new_readonly(t.mint, false),
                AccountMeta::new(ata(&v.wallet, &t.mint, &t.token_program), false),
                AccountMeta::new(ata(heir, &t.mint, &t.token_program), false),
            ]
        })
        .collect()
}

/// \`inherit\` paid by \`caller\`, paying \`heir\`, emptying \`tokens\` (canonical accounts).
pub fn inherit_ix(caller: &Address, v: &Vault, heir: &Address, tokens: &[InheritToken]) -> Instruction {
    inherit_ix_raw(caller, &v.state, &v.wallet, &heir_pda(&v.state), heir, inherit_remaining(v, heir, tokens))
}

pub fn inherit_ix_raw(caller: &Address, state: &Address, wallet: &Address, record: &Address, heir: &Address, remaining: Vec<AccountMeta>) -> Instruction {
    let mut accounts = vec![
        AccountMeta::new(*caller, true),
        AccountMeta::new(*state, false),
        AccountMeta::new(*wallet, false),
        AccountMeta::new(*record, false),
        AccountMeta::new(*heir, false),
        AccountMeta::new_readonly(SYSTEM_PROGRAM, false),
        AccountMeta::new_readonly(ATA_PROGRAM, false),
    ];
    accounts.extend(remaining);
    Instruction { program_id: PROGRAM_ID, accounts, data: ix_disc("inherit").to_vec() }
}

/// Decoded heir record (SPEC §2).
#[derive(Clone, Debug, PartialEq, Eq)]
pub struct HeirView {
    pub version: u8,
    pub bump: u8,
    pub inactivity_days: u16,
    pub state: Address,
    pub heir: Address,
    pub set_at: i64,
    pub deadline: i64,
    pub inherited_at: i64,
}

impl HeirView {
    pub fn parse(d: &[u8]) -> Self {
        assert_eq!(d.len(), 100, "Heir size");
        assert_eq!(d[..8], account_disc("Heir"), "Heir discriminator");
        let addr = |o: usize| Address::new_from_array(d[o..o + 32].try_into().unwrap());
        let i64_at = |o: usize| i64::from_le_bytes(d[o..o + 8].try_into().unwrap());
        HeirView {
            version: d[8],
            bump: d[9],
            inactivity_days: u16::from_le_bytes([d[10], d[11]]),
            state: addr(12),
            heir: addr(44),
            set_at: i64_at(76),
            deadline: i64_at(84),
            inherited_at: i64_at(92),
        }
    }
}

impl Env {
    /// The cluster clock's unix time.
    pub fn now(&self) -> i64 {
        self.svm.get_sysvar::<solana_clock::Clock>().unix_timestamp
    }

    /// Set the cluster clock's unix time (the slot moves forward too, so transactions stay fresh).
    pub fn set_time(&mut self, unix: i64) {
        let mut c = self.svm.get_sysvar::<solana_clock::Clock>();
        c.unix_timestamp = unix;
        c.slot += 1;
        self.svm.set_sysvar(&c);
    }

    pub fn warp(&mut self, seconds: i64) {
        let now = self.now();
        self.set_time(now + seconds);
    }

    /// The vault's heir record, if it exists.
    pub fn heir(&self, v: &Vault) -> Option<HeirView> {
        self.account(&heir_pda(&v.state)).map(|a| {
            assert_eq!(a.owner, PROGRAM_ID, "heir record owner");
            HeirView::parse(&a.data)
        })
    }

    /// Execute \`actions\` (heir actions included) with an inline signature by \`key\` at \`leaf\`.
    pub fn execute_vault(&mut self, v: &Vault, key: &LmsKey, leaf: u32, actions: &[Action], signers: &[&Keypair], opt: Opt) -> TransactionResult {
        let epoch = self.epoch(v);
        let payload = core::encode_actions(actions);
        let sig = sign_execute(key, v, epoch, leaf, &payload);
        let ix = execute_ix(&self.payer.pubkey(), v, opt, leaf, &payload, Some(&sig), remaining_for_vault(v, actions));
        self.send(&[ix], signers)
    }

    /// \`inherit\` sent and paid by \`caller\`.
    pub fn inherit(&mut self, caller: &Keypair, v: &Vault, heir: &Address, tokens: &[InheritToken]) -> TransactionResult {
        let ix = inherit_ix(&caller.pubkey(), v, heir, tokens);
        let tx = self.build_tx(caller, &[ix], &[], TEST_CU_LIMIT);
        self.send_tx(tx)
    }
}

// ------------------------------------------------------------------------------------------------
// Messages and signatures
// ------------------------------------------------------------------------------------------------

#[allow(clippy::too_many_arguments)]
pub fn message(cluster: u8, program: &Address, tag: IxTag, state: &Address, epoch: u32, leaf: u32, payload: &[u8]) -> Vec<u8> {
    let prefix = core::message_prefix(cluster, &program.to_bytes(), tag, &state.to_bytes(), epoch, leaf);
    core::signed_message(&prefix, payload)
}

pub fn sign_for(key: &LmsKey, tag: IxTag, state: &Address, epoch: u32, leaf: u32, payload: &[u8]) -> Vec<u8> {
    key.sign(leaf, &message(LOCALNET, &PROGRAM_ID, tag, state, epoch, leaf, payload))
}

pub fn sign_execute(key: &LmsKey, v: &Vault, epoch: u32, leaf: u32, payload: &[u8]) -> Vec<u8> {
    sign_for(key, IxTag::Execute, &v.state, epoch, leaf, payload)
}
pub fn sign_rotate(key: &LmsKey, v: &Vault, epoch: u32, leaf: u32, new_root: &[u8; 48]) -> Vec<u8> {
    sign_for(key, IxTag::Rotate, &v.state, epoch, leaf, new_root)
}
pub fn sign_close(key: &LmsKey, v: &Vault, epoch: u32, leaf: u32, rent_to: &Address) -> Vec<u8> {
    sign_for(key, IxTag::Close, &v.state, epoch, leaf, rent_to.as_ref())
}

/// Number of Winternitz chain steps the verifier performs for \`sig\` over \`msg\` (RFC 8554
/// Algorithm 4b: Σ (15 − a_i) over the 67 digits of Q ‖ Cksm(Q)). Used for CU modelling.
pub fn verify_chain_steps(root: &[u8; 48], msg: &[u8], sig: &[u8]) -> u32 {
    let q = &sig[0..4];
    let c = &sig[8..40];
    let qh = sha256(&[&root[..16], q, &[0x81, 0x81], c, msg]);
    let mut s = [0u8; 34];
    s[..32].copy_from_slice(&qh);
    let digit = |s: &[u8; 34], i: usize| -> u32 { ((s[i / 2] >> (4 * (1 - (i % 2)))) & 0xf) as u32 };
    let sum: u32 = (0..64).map(|i| 15 - digit(&s, i)).sum();
    let ck = (sum as u16) << 4;
    s[32..].copy_from_slice(&ck.to_be_bytes());
    (0..67).map(|i| 15 - digit(&s, i)).sum()
}

/// Largest possible Σ (15 − a_i) over all message hashes (checksum included).
pub fn max_chain_steps() -> u32 {
    (0u32..=960)
        .map(|s| {
            let ck = (s as u16) << 4;
            let d = |sh: u32| ((ck >> sh) & 0xf) as u32;
            s + (15 - d(12)) + (15 - d(8)) + (15 - d(4))
        })
        .max()
        .unwrap()
}

// ------------------------------------------------------------------------------------------------
// Environment
// ------------------------------------------------------------------------------------------------

pub fn so_path() -> std::path::PathBuf {
    let p = std::path::Path::new(env!("CARGO_MANIFEST_DIR")).join("../../target/deploy/bunker.so");
    assert!(
        p.exists(),
        "{} not found: build the program first (\`anchor build\` or \`cargo build-sbf --manifest-path programs/bunker/Cargo.toml\`)",
        p.display()
    );
    p
}

pub struct Env {
    pub svm: LiteSVM,
    pub payer: Keypair,
}

impl Env {
    pub fn new() -> Self {
        Self::with_program(&so_path())
    }

    /// Environment running the program binary at \`path\` (e.g. the devnet build).
    pub fn with_program(path: &std::path::Path) -> Self {
        let mut svm = LiteSVM::new();
        svm.add_program_from_file(PROGRAM_ID, path).expect("load bunker.so");
        let payer = new_keypair();
        svm.airdrop(&payer.pubkey(), 1_000 * LAMPORTS_PER_SOL).unwrap();
        Env { svm, payer }
    }

    pub fn new_funded_keypair(&mut self, lamports: u64) -> Keypair {
        let k = new_keypair();
        self.svm.airdrop(&k.pubkey(), lamports).unwrap();
        k
    }

    pub fn payer_pk(&self) -> Address {
        self.payer.pubkey()
    }

    /// Build a legacy transaction (fresh blockhash) paid by \`payer\`, with SetComputeUnitLimit +
    /// SetComputeUnitPrice prepended.
    pub fn build_tx(&mut self, payer: &Keypair, ixs: &[Instruction], signers: &[&Keypair], cu_limit: u32) -> Transaction {
        self.svm.expire_blockhash();
        let mut all = vec![set_cu_limit_ix(cu_limit), set_cu_price_ix(1)];
        all.extend_from_slice(ixs);
        let keys = required_signers(payer, &all, signers);
        Transaction::new_signed_with_payer(&all, Some(&payer.pubkey()), &keys, self.svm.latest_blockhash())
    }

    pub fn send_tx(&mut self, tx: impl Into<VersionedTransaction>) -> TransactionResult {
        self.svm.send_transaction(tx)
    }

    /// Send \`ixs\` paid by the default payer.
    pub fn send(&mut self, ixs: &[Instruction], signers: &[&Keypair]) -> TransactionResult {
        let payer = self.payer.insecure_clone();
        let tx = self.build_tx(&payer, ixs, signers, TEST_CU_LIMIT);
        self.send_tx(tx)
    }

    pub fn send_ok(&mut self, ixs: &[Instruction], signers: &[&Keypair]) -> TransactionMetadata {
        match self.send(ixs, signers) {
            Ok(m) => m,
            Err(e) => panic!("transaction failed: {:?}\\n{}", e.err, e.meta.pretty_logs()),
        }
    }

    pub fn account(&self, a: &Address) -> Option<Account> {
        self.svm.get_account(a).filter(|acc| acc.lamports > 0)
    }

    pub fn lamports(&self, a: &Address) -> u64 {
        self.svm.get_balance(a).unwrap_or(0)
    }

    pub fn airdrop(&mut self, a: &Address, lamports: u64) {
        self.svm.airdrop(a, lamports).unwrap();
    }

    /// Plain SOL transfer from the default payer (a "deposit").
    pub fn transfer_sol(&mut self, to: &Address, lamports: u64) {
        let ix = solana_system_interface::instruction::transfer(&self.payer.pubkey(), to, lamports);
        self.send_ok(&[ix], &[]);
    }

    pub fn open(&mut self, v: &Vault) -> TransactionMetadata {
        let ix = open_vault_ix(&self.payer.pubkey(), v);
        self.send_ok(&[ix], &[])
    }

    /// Current epoch (0 when the account is not a live vault, e.g. a tombstone).
    pub fn epoch(&self, v: &Vault) -> u32 {
        match self.svm.get_account(&v.state) {
            Some(acc) if acc.data.len() == 280 => StateView::parse(&acc.data).root_epoch,
            _ => 0,
        }
    }

    pub fn state(&self, v: &Vault) -> StateView {
        let acc = self.svm.get_account(&v.state).expect("state account");
        StateView::parse(&acc.data)
    }

    /// Execute \`actions\` with an inline signature by \`key\` at \`leaf\` (epoch read from chain).
    pub fn execute_inline(&mut self, v: &Vault, key: &LmsKey, leaf: u32, actions: &[Action], signers: &[&Keypair], opt: Opt) -> TransactionResult {
        self.execute_vault(v, key, leaf, actions, signers, opt)
    }

    pub fn execute_ok(&mut self, v: &Vault, key: &LmsKey, leaf: u32, actions: &[Action]) -> TransactionMetadata {
        unwrap_ok(self.execute_inline(v, key, leaf, actions, &[], Opt::default()))
    }

    /// Upload \`sig\` into a fresh buffer using legacy-sized transactions paid by \`payer\`
    /// (\`init_sig_buffer\` + as many \`write_sig_buffer\` chunks as fit in each transaction).
    /// Returns the buffer address and the per-transaction (bytes, compute units).
    pub fn upload_sig(&mut self, payer: &Keypair, state: &Address, epoch: u32, leaf: u32, sig: &[u8]) -> (Address, Vec<(usize, u64)>) {
        let buffer = sig_buffer_address(state, &payer.pubkey(), epoch, leaf);
        let mut stats = Vec::new();
        let mut offset = 0usize;
        let mut first = true;
        while offset < sig.len() || first {
            let mk = |n: usize| {
                let mut ixs = Vec::new();
                if first {
                    ixs.push(init_sig_buffer_ix(&payer.pubkey(), state, epoch, leaf));
                }
                if n > 0 {
                    ixs.push(write_sig_buffer_ix(&payer.pubkey(), &buffer, offset as u32, &sig[offset..offset + n]));
                }
                ixs
            };
            // Largest chunk that keeps the transaction within the legacy packet limit.
            let mut n = sig.len() - offset;
            loop {
                let tx = self.build_tx(payer, &mk(n), &[], 200_000);
                if tx_size(&tx.into()) <= PACKET_DATA_SIZE {
                    break;
                }
                n -= 1;
            }
            let tx = self.build_tx(payer, &mk(n), &[], 200_000);
            let size = tx_size(&tx.clone().into());
            let meta = unwrap_ok(self.send_tx(tx));
            stats.push((size, meta.compute_units_consumed));
            offset += n;
            first = false;
        }
        (buffer, stats)
    }
}

/// The payer plus those of \`signers\` that some instruction marks as a signer.
fn required_signers<'a>(payer: &'a Keypair, ixs: &[Instruction], signers: &[&'a Keypair]) -> Vec<&'a Keypair> {
    let mut keys: Vec<&Keypair> = vec![payer];
    for s in signers {
        let pk = s.pubkey();
        let needed = ixs.iter().any(|ix| ix.accounts.iter().any(|m| m.is_signer && m.pubkey == pk));
        if needed && keys.iter().all(|k| k.pubkey() != pk) {
            keys.push(s);
        }
    }
    keys
}

/// Number of extra \`find_program_address\` iterations (255 − bump) for the ATA of
/// (\`owner\`, \`mint\`, \`token_program\`). Each costs one more \`create_program_address\` on chain.
pub fn ata_extra_iterations(owner: &Address, mint: &Address, token_program: &Address) -> u32 {
    let (_, bump) = Address::find_program_address(&[owner.as_ref(), token_program.as_ref(), mint.as_ref()], &ATA_PROGRAM);
    255 - bump as u32
}

/// Σ extra ATA-derivation iterations the program performs for \`actions\` (one per token action).
pub fn actions_extra_iterations(wallet: &Address, actions: &[Action]) -> u32 {
    actions
        .iter()
        .map(|a| match *a {
            // SetHeir's heir-record PDA search depends on the vault's state, not the wallet: the
            // Legacy measurements count it themselves (heir_extra_iterations).
            Action::TransferSol { .. } | Action::SetHeir { .. } | Action::CheckIn { .. } | Action::ClearHeir { .. } => 0,
            Action::TransferToken { mint, token_program, .. } | Action::CloseTokenAccount { mint, token_program, .. } => {
                ata_extra_iterations(wallet, &Address::new_from_array(mint), &Address::new_from_array(token_program))
            }
        })
        .sum()
}

impl Env {
    /// Buffer path, packed as tightly as legacy transactions allow: \`init_sig_buffer\` + chunk,
    /// chunks, and the last chunk travels with \`final_ix\` (the signed instruction with
    /// \`sig = None\`) whenever it fits. Returns (bytes, compute units) per transaction; the last
    /// entry is the transaction that carries \`final_ix\`.
    pub fn send_buffered(
        &mut self,
        payer: &Keypair,
        state: &Address,
        epoch: u32,
        leaf: u32,
        sig: &[u8],
        final_ix: Instruction,
        signers: &[&Keypair],
    ) -> Vec<(usize, u64)> {
        let buffer = sig_buffer_address(state, &payer.pubkey(), epoch, leaf);
        let p = payer.pubkey();
        let mut out = Vec::new();
        let mut offset = 0usize;
        let mut first = true;
        loop {
            let ixs_for = |n: usize, with_final: bool| {
                let mut ixs = Vec::new();
                if first {
                    ixs.push(init_sig_buffer_ix(&p, state, epoch, leaf));
                }
                if n > 0 {
                    ixs.push(write_sig_buffer_ix(&p, &buffer, offset as u32, &sig[offset..offset + n]));
                }
                if with_final {
                    ixs.push(final_ix.clone());
                }
                ixs
            };
            let rest = sig.len() - offset;
            let tx = self.build_tx(payer, &ixs_for(rest, true), signers, TEST_CU_LIMIT);
            if rest == 0 || legacy_tx_size(&tx) <= PACKET_DATA_SIZE {
                let size = legacy_tx_size(&tx);
                let meta = unwrap_ok(self.send_tx(tx));
                out.push((size, meta.compute_units_consumed));
                return out;
            }
            let mut n = rest;
            while n > 0 && legacy_tx_size(&self.build_tx(payer, &ixs_for(n, false), &[], TEST_CU_LIMIT)) > PACKET_DATA_SIZE {
                n -= 1;
            }
            let tx = self.build_tx(payer, &ixs_for(n, false), &[], TEST_CU_LIMIT);
            let size = legacy_tx_size(&tx);
            let meta = unwrap_ok(self.send_tx(tx));
            out.push((size, meta.compute_units_consumed));
            offset += n;
            first = false;
        }
    }
}

pub fn tx_size(tx: &VersionedTransaction) -> usize {
    wincode::serialize(tx).expect("serialize tx").len()
}

pub fn legacy_tx_size(tx: &Transaction) -> usize {
    tx_size(&tx.clone().into())
}

/// Loaded-accounts data size limit used for v1 transactions in tests (bytes).
pub const V1_LOADED_DATA_LIMIT: u32 = 1024 * 1024;

/// Build a v1 (4 KiB) transaction; LiteSVM support for v1 is probed by the caller.
pub fn build_v1_tx(env: &mut Env, payer: &Keypair, ixs: &[Instruction], signers: &[&Keypair], cu_limit: u32) -> VersionedTransaction {
    env.svm.expire_blockhash();
    // v1 defaults every budget to 0: the compute-unit limit and the loaded-accounts data size
    // limit must be set explicitly.
    let config = solana_message::v1::TransactionConfig::empty()
        .with_compute_unit_limit(cu_limit)
        .with_loaded_accounts_data_size_limit(V1_LOADED_DATA_LIMIT)
        .with_priority_fee(1);
    let msg = solana_message::v1::Message::try_compile_with_config(&payer.pubkey(), ixs, env.svm.latest_blockhash(), config)
        .expect("compile v1 message");
    let keys = required_signers(payer, ixs, signers);
    VersionedTransaction::try_new(VersionedMessage::V1(msg), &keys).expect("sign v1 tx")
}

/// Legacy message helper (for size estimates).
pub fn legacy_message(payer: &Address, ixs: &[Instruction]) -> Message {
    Message::new(ixs, Some(payer))
}

// ------------------------------------------------------------------------------------------------
// State parsing
// ------------------------------------------------------------------------------------------------

#[derive(Clone, Debug, PartialEq, Eq)]
pub struct StateView {
    pub version: u8,
    pub bump: u8,
    pub wallet_bump: u8,
    pub vault_id: [u8; 32],
    pub current_root: [u8; 48],
    pub root_epoch: u32,
    pub next_leaf: u32,
    pub tree_size: u32,
    pub cosigner: Option<Address>,
    pub created_slot: u64,
    pub executed_count: u64,
}

impl StateView {
    pub fn parse(d: &[u8]) -> Self {
        assert_eq!(d.len(), 280, "VaultState size");
        assert_eq!(d[..8], account_disc("VaultState"), "VaultState discriminator");
        let mut p = 8;
        let mut take = |n: usize| {
            let s = &d[p..p + n];
            p += n;
            s.to_vec()
        };
        let version = take(1)[0];
        let bump = take(1)[0];
        let wallet_bump = take(1)[0];
        let vault_id: [u8; 32] = take(32).try_into().unwrap();
        let current_root: [u8; 48] = take(48).try_into().unwrap();
        let root_epoch = u32::from_le_bytes(take(4).try_into().unwrap());
        let next_leaf = u32::from_le_bytes(take(4).try_into().unwrap());
        let tree_size = u32::from_le_bytes(take(4).try_into().unwrap());
        let cosigner = match take(1)[0] {
            0 => None,
            1 => Some(Address::new_from_array(take(32).try_into().unwrap())),
            t => panic!("bad option tag {t}"),
        };
        let created_slot = u64::from_le_bytes(take(8).try_into().unwrap());
        let executed_count = u64::from_le_bytes(take(8).try_into().unwrap());
        StateView { version, bump, wallet_bump, vault_id, current_root, root_epoch, next_leaf, tree_size, cosigner, created_slot, executed_count }
    }
}

// ------------------------------------------------------------------------------------------------
// Results, errors, events
// ------------------------------------------------------------------------------------------------

pub fn unwrap_ok(r: TransactionResult) -> TransactionMetadata {
    match r {
        Ok(m) => m,
        Err(e) => panic!("transaction failed: {:?}\\n{}", e.err, e.meta.pretty_logs()),
    }
}

pub fn unwrap_err(r: TransactionResult) -> FailedTransactionMetadata {
    match r {
        Ok(m) => panic!("transaction unexpectedly succeeded\\n{}", m.pretty_logs()),
        Err(e) => e,
    }
}

/// Custom program error code of a failed transaction (any instruction).
pub fn custom_code(e: &FailedTransactionMetadata) -> Option<u32> {
    match &e.err {
        TransactionError::InstructionError(_, InstructionError::Custom(c)) => Some(*c),
        _ => None,
    }
}

/// Expect a failure with Anchor/custom error \`code\`.
#[track_caller]
pub fn expect_code(r: TransactionResult, code: u32) {
    let e = unwrap_err(r);
    assert_eq!(custom_code(&e), Some(code), "unexpected error {:?}\\n{}", e.err, e.meta.pretty_logs());
}

pub fn vault_err(e: bunker::errors::VaultError) -> u32 {
    u32::from(e)
}

pub fn anchor_err(e: anchor_lang::error::ErrorCode) -> u32 {
    u32::from(e)
}

/// Decode the Anchor events (\`Program data:\` logs) of a transaction: (discriminator, payload).
pub fn events(meta: &TransactionMetadata) -> Vec<([u8; 8], Vec<u8>)> {
    meta.logs
        .iter()
        .filter_map(|l| l.strip_prefix("Program data: "))
        .filter_map(|b| base64::engine::general_purpose::STANDARD.decode(b).ok())
        .filter(|d| d.len() >= 8)
        .map(|d| (d[..8].try_into().unwrap(), d[8..].to_vec()))
        .collect()
}

pub fn count_events(meta: &TransactionMetadata, name: &str) -> usize {
    let disc = event_disc(name);
    events(meta).iter().filter(|(d, _)| *d == disc).count()
}

/// The deployed program is built without events (the \`events\` feature, off by default, costs
/// program size and so deploy rent). Event checks run only against a build that logs them;
/// the balances and state they describe are always checked directly.
pub fn assert_events(meta: &TransactionMetadata, name: &str, n: usize) {
    if !events(meta).is_empty() {
        assert_eq!(count_events(meta, name), n, "{name} events");
    }
}

/// \`vault_closed_event\` when the program logs events (see \`assert_events\`).
pub fn vault_closed_event_if_logged(meta: &TransactionMetadata) -> Option<VaultClosedEvent> {
    (!events(meta).is_empty()).then(|| vault_closed_event(meta))
}

/// Decoded \`VaultClosed\` event.
#[derive(Clone, Debug, PartialEq, Eq)]
pub struct VaultClosedEvent {
    pub state: Address,
    pub vault_id: [u8; 32],
    pub root_epoch: u32,
    pub leaf_index: u32,
    pub rent_to: Address,
    /// Lamports moved from the state account.
    pub lamports: u64,
    pub slot: u64,
    /// Lamports swept from the wallet PDA.
    pub wallet_lamports: u64,
}

/// The single \`VaultClosed\` event of a transaction.
pub fn vault_closed_event(meta: &TransactionMetadata) -> VaultClosedEvent {
    let disc = event_disc("VaultClosed");
    let all: Vec<_> = events(meta).into_iter().filter(|(d, _)| *d == disc).collect();
    assert_eq!(all.len(), 1, "exactly one VaultClosed event");
    let d = &all[0].1;
    assert_eq!(d.len(), 32 + 32 + 4 + 4 + 32 + 8 + 8 + 8, "VaultClosed size");
    let addr = |o: usize| Address::new_from_array(d[o..o + 32].try_into().unwrap());
    let u32_at = |o: usize| u32::from_le_bytes(d[o..o + 4].try_into().unwrap());
    let u64_at = |o: usize| u64::from_le_bytes(d[o..o + 8].try_into().unwrap());
    VaultClosedEvent {
        state: addr(0),
        vault_id: d[32..64].try_into().unwrap(),
        root_epoch: u32_at(64),
        leaf_index: u32_at(68),
        rent_to: addr(72),
        lamports: u64_at(104),
        slot: u64_at(112),
        wallet_lamports: u64_at(120),
    }
}

// ------------------------------------------------------------------------------------------------
// Tokens
// ------------------------------------------------------------------------------------------------

#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub enum MintKind {
    /// Plain mint (either program).
    Plain,
    /// pump.fun-style Token-2022 mint: MetadataPointer → itself + TokenMetadata, mint and freeze
    /// authority removed after the initial supply.
    PumpLike,
    /// Token-2022 TransferFeeConfig (1% fee).
    TransferFee,
    /// Token-2022 TransferHook pointing at a program.
    TransferHook,
}

pub struct TestMint {
    pub mint: Address,
    pub program: Address,
    pub decimals: u8,
    pub authority: Keypair,
}

pub const TRANSFER_FEE_BPS: u16 = 100;

/// Create a mint and give \`supply\` to the default payer's ATA.
pub fn create_mint(env: &mut Env, program: Address, kind: MintKind, decimals: u8, supply: u64) -> TestMint {
    let mint_kp = new_keypair();
    create_mint_with(env, program, kind, decimals, supply, mint_kp)
}

/// [\`create_mint\`] with a chosen mint keypair.
pub fn create_mint_with(env: &mut Env, program: Address, kind: MintKind, decimals: u8, supply: u64, mint_kp: Keypair) -> TestMint {
    use spl_token_2022_interface::extension::{metadata_pointer, transfer_fee, transfer_hook};
    use spl_token_2022_interface::instruction as ti;
    use spl_token_2022_interface::state::Mint;

    let authority = env.new_funded_keypair(10 * LAMPORTS_PER_SOL);
    let mint = mint_kp.pubkey();
    let exts: Vec<ExtensionType> = match kind {
        MintKind::Plain => vec![],
        MintKind::PumpLike => vec![ExtensionType::MetadataPointer],
        MintKind::TransferFee => vec![ExtensionType::TransferFeeConfig],
        MintKind::TransferHook => vec![ExtensionType::TransferHook],
    };
    let space = if exts.is_empty() { Mint::LEN } else { ExtensionType::try_calculate_account_len::<Mint>(&exts).unwrap() };
    // Pre-fund room for the TokenMetadata TLV entry (the token program reallocates in place).
    let lamports = env.svm.minimum_balance_for_rent_exemption(space + if kind == MintKind::PumpLike { 512 } else { 0 });
    let mut ixs = vec![solana_system_interface::instruction::create_account(
        &env.payer_pk(),
        &mint,
        lamports,
        space as u64,
        &program,
    )];
    match kind {
        MintKind::Plain => {}
        MintKind::PumpLike => ixs.push(metadata_pointer::instruction::initialize(&program, &mint, None, Some(mint)).unwrap()),
        MintKind::TransferFee => ixs.push(
            transfer_fee::instruction::initialize_transfer_fee_config(
                &program,
                &mint,
                Some(&authority.pubkey()),
                Some(&authority.pubkey()),
                TRANSFER_FEE_BPS,
                u64::MAX,
            )
            .unwrap(),
        ),
        MintKind::TransferHook => {
            ixs.push(transfer_hook::instruction::initialize(&program, &mint, Some(authority.pubkey()), Some(MEMO_PROGRAM)).unwrap())
        }
    }
    let freeze = if kind == MintKind::PumpLike { None } else { Some(authority.pubkey()) };
    ixs.push(ti::initialize_mint2(&program, &mint, &authority.pubkey(), freeze.as_ref(), decimals).unwrap());
    if kind == MintKind::PumpLike {
        ixs.push(spl_token_metadata_interface::instruction::initialize(
            &program,
            &mint,
            &authority.pubkey(),
            &mint,
            &authority.pubkey(),
            "Bunker Test".to_string(),
            "BUNKER".to_string(),
            "https://example.invalid/root.json".to_string(),
        ));
    }
    env.send_ok(&ixs, &[&mint_kp, &authority]);

    let tm = TestMint { mint, program, decimals, authority };
    let holder = env.payer_pk();
    let holder_ata = create_ata(env, &holder, &tm);
    if supply > 0 {
        mint_to(env, &tm, &holder_ata, supply);
    }
    if kind == MintKind::PumpLike {
        // pump.fun revokes the mint authority after the initial supply (freeze was never set).
        let ix = ti::set_authority(&program, &mint, None, ti::AuthorityType::MintTokens, &tm.authority.pubkey(), &[]).unwrap();
        let auth = tm.authority.insecure_clone();
        env.send_ok(&[ix], &[&auth]);
    }
    tm
}

/// A "standard NFT": SPL Token, decimals 0, supply 1, mint authority removed.
pub fn create_nft(env: &mut Env) -> TestMint {
    use spl_token_2022_interface::instruction as ti;
    let tm = create_mint(env, SPL_TOKEN, MintKind::Plain, 0, 1);
    let ix = ti::set_authority(&SPL_TOKEN, &tm.mint, None, ti::AuthorityType::MintTokens, &tm.authority.pubkey(), &[]).unwrap();
    let auth = tm.authority.insecure_clone();
    env.send_ok(&[ix], &[&auth]);
    tm
}

pub fn create_ata(env: &mut Env, owner: &Address, tm: &TestMint) -> Address {
    let ix = spl_associated_token_account_interface::instruction::create_associated_token_account_idempotent(
        &env.payer_pk(),
        owner,
        &tm.mint,
        &tm.program,
    );
    env.send_ok(&[ix], &[]);
    ata(owner, &tm.mint, &tm.program)
}

pub fn mint_to(env: &mut Env, tm: &TestMint, dest: &Address, amount: u64) {
    let ix = spl_token_2022_interface::instruction::mint_to_checked(
        &tm.program,
        &tm.mint,
        dest,
        &tm.authority.pubkey(),
        &[],
        amount,
        tm.decimals,
    )
    .unwrap();
    let auth = tm.authority.insecure_clone();
    env.send_ok(&[ix], &[&auth]);
}

/// Token transfer from the default payer's ATA (a "deposit" when \`dest\` is a vault ATA).
pub fn transfer_tokens(env: &mut Env, tm: &TestMint, dest: &Address, amount: u64) {
    let owner = env.payer_pk();
    let src = ata(&owner, &tm.mint, &tm.program);
    let ix = spl_token_2022_interface::instruction::transfer_checked(&tm.program, &src, &tm.mint, dest, &owner, &[], amount, tm.decimals)
        .unwrap();
    env.send_ok(&[ix], &[]);
}

/// Deposit: create the vault's ATA (idempotent) and transfer \`amount\` into it.
pub fn deposit_tokens(env: &mut Env, v: &Vault, tm: &TestMint, amount: u64) -> Address {
    let vault_ata = create_ata(env, &v.wallet, tm);
    transfer_tokens(env, tm, &vault_ata, amount);
    vault_ata
}

pub fn token_amount(env: &Env, token_account: &Address) -> u64 {
    let acc = env.svm.get_account(token_account).expect("token account");
    StateWithExtensions::<spl_token_2022_interface::state::Account>::unpack(&acc.data).unwrap().base.amount
}

pub fn token_mint_of(env: &Env, token_account: &Address) -> Address {
    let acc = env.svm.get_account(token_account).expect("token account");
    StateWithExtensions::<spl_token_2022_interface::state::Account>::unpack(&acc.data).unwrap().base.mint
}

/// Fresh owner + its ATA for \`tm\` (a withdrawal destination).
pub fn new_destination(env: &mut Env, tm: &TestMint) -> (Address, Address) {
    let owner = new_keypair().pubkey();
    let dest = create_ata(env, &owner, tm);
    (owner, dest)
}

/// Transfer-fee withheld on a Token-2022 account must be harvested (permissionless) before the
/// account can be closed.
pub fn harvest_withheld(env: &mut Env, tm: &TestMint, accounts: &[&Address]) {
    let ix = spl_token_2022_interface::extension::transfer_fee::instruction::harvest_withheld_tokens_to_mint(
        &tm.program,
        &tm.mint,
        accounts,
    )
    .unwrap();
    env.send_ok(&[ix], &[]);
}

pub fn fee_of(amount: u64) -> u64 {
    // ceil(amount * bps / 10_000), as Token-2022 computes it.
    (amount as u128 * TRANSFER_FEE_BPS as u128).div_ceil(10_000) as u64
}
`;export{e as default};