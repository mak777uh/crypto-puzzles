var e=`//! Compute-unit and transaction-size measurements. \`measurements\` regenerates
//! \`programs/bunker/MEASUREMENTS.md\`; every number in that file comes from this test.
//!
//! Two things make an instruction's cost vary for the same shape of input, and both are modelled:
//! * LMS verification runs Σ(15 − aᵢ) hash-chain steps, which depends on the message hash;
//! * \`find_program_address\` (vault ATA for token actions, PDAs in \`open_vault\` / \`init_sig_buffer\`)
//!   costs one extra \`create_program_address\` per bump below 255.

use std::fmt::Write as _;

use bunker_lms::LmsKey;
use bunker_core::{encode_actions, Action, IxTag};
use solana_address::Address;
use solana_instruction::Instruction;
use solana_keypair::Keypair;
use solana_signer::Signer;

use crate::common::*;

const V1_MAX: usize = 4096;
/// Safety margin applied on top of the modelled worst case.
const MARGIN_PCT: u64 = 10;
/// Extra bump iterations allowed for in the one-size-fits-all constants (clients that compute
/// the exact bumps use the formula instead). P(> 24 extra over 8 derivations) ≈ 2·10⁻⁴, and a
/// transaction that runs out of compute can be re-sent with the same signature and a higher limit.
const ITER_ALLOWANCE_EXECUTE: u64 = 24;
const ITER_ALLOWANCE_PDA: u64 = 16;
/// \`close_vault\` is measured with SOL in the wallet (its most expensive path: the sweep CPI).
const CLOSE_SCENARIO: &str = "close_vault (wallet holds SOL, swept to rent_to)";

#[derive(Clone, Copy, PartialEq, Eq, Debug)]
enum Path {
    /// Signature inline, v1 transaction (4,096 bytes; compute budget in the header).
    Inline,
    /// Signature uploaded with legacy transactions; the last chunk rides with the instruction.
    Buffer,
}

impl Path {
    fn label(self) -> &'static str {
        match self {
            Path::Inline => "inline, v1 tx",
            Path::Buffer => "buffer, legacy txs",
        }
    }
}

struct Row {
    scenario: String,
    path: Path,
    /// Bytes of every transaction of the path.
    tx_bytes: Vec<usize>,
    fits: bool,
    /// CU of the transaction carrying the signed instruction.
    cu: u64,
    steps: u32,
    extra_iters: u32,
    /// (n_sol, n_token, n_close) for the cost model.
    shape: (u64, u64, u64),
}

fn round_up(x: u64, to: u64) -> u64 {
    x.div_ceil(to) * to
}

fn with_margin(cu: u64) -> u64 {
    round_up(cu * (100 + MARGIN_PCT) / 100, 5_000)
}

fn shape(actions: &[Action]) -> (u64, u64, u64) {
    actions.iter().fold((0, 0, 0), |(s, t, c), a| match a {
        Action::TransferSol { .. } => (s + 1, t, c),
        Action::TransferToken { .. } => (s, t + 1, c),
        Action::CloseTokenAccount { .. } => (s, t, c + 1),
        // Heir actions are measured on their own (at most one per payload).
        Action::SetHeir { .. } | Action::CheckIn { .. } | Action::ClearHeir { .. } => (s, t, c),
    })
}

/// Send the instruction built by \`make_ix\` (signed by \`key\` over \`msg\`) through \`path\`.
#[allow(clippy::too_many_arguments)]
fn run(
    env: &mut Env,
    scenario: &str,
    path: Path,
    root: &[u8; 48],
    state: &Address,
    epoch: u32,
    leaf: u32,
    msg: &[u8],
    key: &LmsKey,
    make_ix: &dyn Fn(Option<&[u8]>, Option<Address>, &Address) -> Instruction,
    signers: &[&Keypair],
    extra_iters: u32,
    shape: (u64, u64, u64),
) -> Row {
    let sig = key.sign(leaf, msg);
    let steps = verify_chain_steps(root, msg, &sig);
    let payer = env.payer.insecure_clone();
    let (tx_bytes, cu, fits) = match path {
        Path::Inline => {
            let ix = make_ix(Some(&sig), None, &payer.pubkey());
            let tx = build_v1_tx(env, &payer, &[ix], signers, TEST_CU_LIMIT);
            let bytes = tx_size(&tx);
            let meta = unwrap_ok(env.send_tx(tx));
            (vec![bytes], meta.compute_units_consumed, bytes <= V1_MAX)
        }
        Path::Buffer => {
            let buffer = sig_buffer_address(state, &payer.pubkey(), epoch, leaf);
            let ix = make_ix(None, Some(buffer), &payer.pubkey());
            let txs = env.send_buffered(&payer, state, epoch, leaf, &sig, ix, signers);
            let fits = txs.iter().all(|(b, _)| *b <= PACKET_DATA_SIZE);
            (txs.iter().map(|t| t.0).collect(), txs.last().unwrap().1, fits)
        }
    };
    Row { scenario: scenario.into(), path, tx_bytes, fits, cu, steps, extra_iters, shape }
}

#[allow(clippy::too_many_arguments)]
fn run_execute(env: &mut Env, v: &Vault, key: &LmsKey, leaf: u32, scenario: &str, path: Path, actions: &[Action], cos: Option<&Keypair>) -> Row {
    let epoch = env.epoch(v);
    let payload = encode_actions(actions);
    let msg = message(LOCALNET, &PROGRAM_ID, IxTag::Execute, &v.state, epoch, leaf, &payload);
    let remaining = remaining_for_vault(v, actions);
    let vv = v.clone();
    let cos_pk = cos.map(|c| c.pubkey());
    let make = move |sig: Option<&[u8]>, buf: Option<Address>, fee_payer: &Address| {
        let opt = Opt { cosigner: cos_pk, cosigner_unsigned: false, sig_buffer: buf };
        execute_ix(fee_payer, &vv, opt, leaf, &payload, sig, remaining.clone())
    };
    let signers: Vec<&Keypair> = cos.into_iter().collect();
    let extra = actions_extra_iterations(&v.wallet, actions) + heir_extra_iterations(v, actions);
    run(env, scenario, path, &v.root, &v.state, epoch, leaf, &msg, key, &make, &signers, extra, shape(actions))
}

/// SetHeir searches for the heir record PDA (\`find_program_address\`): its extra iterations.
fn heir_extra_iterations(v: &Vault, actions: &[Action]) -> u32 {
    if actions.iter().any(|a| matches!(a, Action::SetHeir { .. })) {
        255 - heir_pda_with_bump(&v.state).1 as u32
    } else {
        0
    }
}

/// Which heir action a Legacy execute row measures.
#[derive(Clone, Copy, PartialEq, Eq, Debug)]
enum HeirKind {
    SetHeir,
    CheckIn,
    ClearHeir,
}

/// A vault (key A, epoch 0, 10 SOL), clock at T0, optionally with a heir record already set
/// (365 days, at leaf 0) so the next free leaf is 1.
fn heir_fixture(with_record: bool, prefund_record: bool) -> (Env, Vault, Address, u32) {
    let mut env = Env::new();
    env.set_time(T0);
    let v = Vault::new(key_a0().root(), None);
    env.open(&v);
    env.transfer_sol(&v.wallet, 10 * LAMPORTS_PER_SOL);
    let heir = Address::new_from_array([0x42; 32]);
    if prefund_record {
        // Someone sent lamports to the record's address first: SetHeir tops up, allocates, assigns.
        env.transfer_sol(&heir_pda(&v.state), RENT_MIN_0);
    }
    let leaf = if with_record {
        unwrap_ok(env.execute_vault(&v, key_a0(), 0, &[set_heir(&heir, 365)], &[], Opt::default()));
        1
    } else {
        0
    };
    (env, v, heir, leaf)
}

/// One measured \`inherit\`.
struct InheritRow {
    scenario: String,
    tx_bytes: usize,
    cu: u64,
    /// find_program_address iterations below bump 255: ours (vault and heir ATAs) and the ATA
    /// program's own when it creates a heir account.
    extra_iters: u32,
    /// Token accounts emptied, of which the heir's account had to be created.
    groups: u64,
    created: u64,
}

/// A due vault with \`n\` mints of \`kind\` (\`with_existing\` of them already held by the heir), then
/// one \`inherit\` emptying all of them.
fn run_inherit(scenario: &str, kind: Option<(Address, MintKind)>, n: usize, with_existing: usize) -> InheritRow {
    let mut env = Env::new();
    env.set_time(T0);
    let v = Vault::new(key_a0().root(), None);
    env.open(&v);
    env.transfer_sol(&v.wallet, 5 * LAMPORTS_PER_SOL);
    let heir = new_keypair().pubkey();
    let mut tokens = Vec::new();
    let mut extra = 0u32;
    if let Some((program, k)) = kind {
        for i in 0..n {
            let tm = create_mint(&mut env, program, k, 6, 1_000_000);
            deposit_tokens(&mut env, &v, &tm, 1_000_000);
            if i < with_existing {
                create_ata(&mut env, &heir, &tm);
            } else {
                extra += ata_extra_iterations(&heir, &tm.mint, &program);
            }
            extra += ata_extra_iterations(&v.wallet, &tm.mint, &program) + ata_extra_iterations(&heir, &tm.mint, &program);
            tokens.push(InheritToken::from(&tm));
        }
    }
    unwrap_ok(env.execute_vault(&v, key_a0(), 0, &[set_heir(&heir, 30)], &[], Opt::default()));
    env.set_time(T0 + 30 * DAY);
    let caller = env.new_funded_keypair(10 * LAMPORTS_PER_SOL);
    let ix = inherit_ix(&caller.pubkey(), &v, &heir, &tokens);
    let tx = env.build_tx(&caller, &[ix], &[], TEST_CU_LIMIT);
    let tx_bytes = legacy_tx_size(&tx);
    let meta = unwrap_ok(env.send_tx(tx));
    assert_eq!(env.lamports(&v.wallet), 0);
    InheritRow {
        scenario: scenario.into(),
        tx_bytes,
        cu: meta.compute_units_consumed,
        extra_iters: extra,
        groups: n as u64,
        created: (n - with_existing) as u64,
    }
}

/// Largest number of token accounts one legacy \`inherit\` transaction can carry (distinct mints;
/// nothing is sent).
fn max_inherit_groups(program: Address) -> usize {
    let mut env = Env::new();
    let v = Vault::new(key_a0().root(), None);
    let caller = env.payer.insecure_clone();
    let heir = Address::new_from_array([0x42; 32]);
    let mut best = 0;
    for n in 0..=16usize {
        let tokens: Vec<InheritToken> = (0..n).map(|i| InheritToken { mint: Address::new_from_array([(i as u8) + 100; 32]), token_program: program }).collect();
        let ix = inherit_ix(&caller.pubkey(), &v, &heir, &tokens);
        let tx = env.build_tx(&caller, &[ix], &[], TEST_CU_LIMIT);
        if legacy_tx_size(&tx) <= PACKET_DATA_SIZE {
            best = n;
        }
    }
    best
}

/// A vault with SOL and \`n\` distinct mints of \`kind\` deposited into it.
struct Fixture {
    env: Env,
    v: Vault,
    mints: Vec<TestMint>,
    user: Address,
    dests: Vec<Address>,
}

fn fixture(kind: Option<(Address, MintKind)>, n: usize) -> Fixture {
    let mut env = Env::new();
    let v = Vault::new(key_a0().root(), None);
    env.open(&v);
    env.transfer_sol(&v.wallet, 100 * LAMPORTS_PER_SOL);
    let user = new_keypair().pubkey();
    let mut mints = Vec::new();
    let mut dests = Vec::new();
    if let Some((program, k)) = kind {
        for _ in 0..n {
            let tm = create_mint(&mut env, program, k, 6, 1_000_000_000);
            deposit_tokens(&mut env, &v, &tm, 1_000_000_000);
            dests.push(create_ata(&mut env, &user, &tm));
            mints.push(tm);
        }
    }
    Fixture { env, v, mints, user, dests }
}

/// Byte size of an execute transaction for \`actions\` on each path (nothing is sent):
/// (inline v1, buffer legacy execute-only, buffer v1 execute-only).
fn execute_sizes(env: &mut Env, v: &Vault, actions: &[Action]) -> (usize, usize, usize) {
    let payload = encode_actions(actions);
    let remaining = remaining_for(&v.wallet, actions);
    let payer = env.payer.insecure_clone();
    let dummy = vec![0u8; 2508];
    let inline = execute_ix(&payer.pubkey(), v, Opt::default(), 0, &payload, Some(&dummy), remaining.clone());
    let buffered = execute_ix(&payer.pubkey(), v, Opt::buffer(Address::new_unique()), 0, &payload, None, remaining);
    let v1_inline = tx_size(&build_v1_tx(env, &payer, &[inline], &[], TEST_CU_LIMIT));
    let legacy_buffer = legacy_tx_size(&env.build_tx(&payer, &[buffered.clone()], &[], TEST_CU_LIMIT));
    let v1_buffer = tx_size(&build_v1_tx(env, &payer, &[buffered], &[], TEST_CU_LIMIT));
    (v1_inline, legacy_buffer, v1_buffer)
}

/// Largest n (≤ 8) such that \`make(n)\` fits each path.
fn max_actions(env: &mut Env, v: &Vault, make: &dyn Fn(usize) -> Vec<Action>) -> (usize, usize, usize) {
    let mut best = (0, 0, 0);
    for n in 1..=8 {
        let (a, b, c) = execute_sizes(env, v, &make(n));
        if a <= V1_MAX {
            best.0 = n;
        }
        if b <= PACKET_DATA_SIZE {
            best.1 = n;
        }
        if c <= V1_MAX {
            best.2 = n;
        }
    }
    best
}

/// Least-squares fit of \`y = a + b·x\`.
fn fit(samples: &[(f64, f64)]) -> (f64, f64) {
    let n = samples.len() as f64;
    let mx = samples.iter().map(|s| s.0).sum::<f64>() / n;
    let my = samples.iter().map(|s| s.1).sum::<f64>() / n;
    let sxy: f64 = samples.iter().map(|s| (s.0 - mx) * (s.1 - my)).sum();
    let sxx: f64 = samples.iter().map(|s| (s.0 - mx).powi(2)).sum();
    let b = sxy / sxx;
    (my - b * mx, b)
}

#[test]
fn measurements() {
    let max_steps = max_chain_steps() as u64;

    // ---- 1. LMS verification cost: CU vs chain steps (64 signatures, same instruction) --------
    let mut samples = Vec::new();
    {
        let mut env = Env::new();
        let v = Vault::new(key_a0().root(), None);
        env.open(&v);
        env.transfer_sol(&v.wallet, 10 * LAMPORTS_PER_SOL);
        let to = env.payer_pk();
        for leaf in 0..64u32 {
            let r = run_execute(&mut env, &v, key_a0(), leaf, "sample", Path::Inline, &[sol(&to, 1_000 + leaf as u64)], None);
            samples.push((r.steps as f64, r.cu as f64));
        }
    }
    let (fit_a, fit_b) = fit(&samples);
    let max_resid = samples.iter().map(|(s, c)| (c - (fit_a + fit_b * s)).abs()).fold(0.0, f64::max);
    assert!(fit_b > 50.0 && max_resid < 200.0, "verification cost should be linear in chain steps (slope {fit_b}, resid {max_resid})");
    let slope = fit_b.ceil() as u64;

    // ---- 2. cost of one extra find_program_address iteration (vault ATA derivation) ---------------
    let pda_iter = {
        let mut env = Env::new();
        let v = Vault::new(key_a0().root(), None);
        env.open(&v);
        // Pick mint keypairs whose vault ATA needs 0 and many extra iterations.
        let (mut lo_kp, mut hi_kp): (Option<Keypair>, Option<Keypair>) = (None, None);
        let mut best = 0;
        for _ in 0..400 {
            let kp = new_keypair();
            let e = ata_extra_iterations(&v.wallet, &kp.pubkey(), &SPL_TOKEN);
            if e == 0 && lo_kp.is_none() {
                lo_kp = Some(kp);
            } else if e > best {
                best = e;
                hi_kp = Some(kp);
            }
        }
        assert!(best >= 5, "need a high-iteration mint for calibration");
        let mut pts = Vec::new();
        for (leaf, kp) in [lo_kp.unwrap(), hi_kp.unwrap()].into_iter().enumerate() {
            let tm = create_mint_with(&mut env, SPL_TOKEN, MintKind::Plain, 6, 1_000, kp);
            deposit_tokens(&mut env, &v, &tm, 1_000);
            let (_, dest) = new_destination(&mut env, &tm);
            let r = run_execute(&mut env, &v, key_a0(), leaf as u32, "cal", Path::Inline, &[token(&tm.mint, &SPL_TOKEN, &dest, 1)], None);
            pts.push((r.extra_iters as f64, r.cu as f64 - slope as f64 * r.steps as f64));
        }
        let per = (pts[1].1 - pts[0].1) / (pts[1].0 - pts[0].0);
        assert!((1400.0..1800.0).contains(&per), "unexpected per-iteration cost {per}");
        per.ceil() as u64
    };
    let worst = |r: &Row| r.cu - pda_iter * r.extra_iters as u64 + slope * (max_steps - r.steps as u64);

    // ---- 3. open_vault ------------------------------------------------------------------------------
    let mut unsigned: Vec<(String, usize, u64, u64)> = Vec::new(); // (name, bytes, cu, normalised cu)
    for cos in [false, true] {
        let mut env = Env::new();
        let c = new_keypair().pubkey();
        let v = Vault::new(key_a0().root(), cos.then_some(c));
        let payer = env.payer.insecure_clone();
        let tx = env.build_tx(&payer, &[open_vault_ix(&payer.pubkey(), &v)], &[], 200_000);
        let bytes = legacy_tx_size(&tx);
        let meta = unwrap_ok(env.send_tx(tx));
        let s = env.state(&v);
        let extra = (255 - s.bump as u64) + (255 - s.wallet_bump as u64);
        let name = if cos { "open_vault (hybrid, with cosigner)" } else { "open_vault" };
        unsigned.push((name.into(), bytes, meta.compute_units_consumed, meta.compute_units_consumed - pda_iter * extra));
    }

    // ---- 4. execute scenarios -----------------------------------------------------------------
    let mut rows: Vec<Row> = Vec::new();
    type Build = Box<dyn Fn(&Fixture) -> Vec<Action>>;
    let scenarios: Vec<(&str, Option<(Address, MintKind)>, usize, Build)> = vec![
        ("1× TransferSol", None, 0, Box::new(|f: &Fixture| vec![sol(&f.user, LAMPORTS_PER_SOL)])),
        ("1× TransferToken, SPL Token", Some((SPL_TOKEN, MintKind::Plain)), 1, Box::new(|f: &Fixture| vec![token(&f.mints[0].mint, &SPL_TOKEN, &f.dests[0], 1_000)])),
        ("1× TransferToken, Token-2022", Some((TOKEN_2022, MintKind::Plain)), 1, Box::new(|f: &Fixture| vec![token(&f.mints[0].mint, &TOKEN_2022, &f.dests[0], 1_000)])),
        ("1× TransferToken, Token-2022 pump.fun-style", Some((TOKEN_2022, MintKind::PumpLike)), 1, Box::new(|f: &Fixture| vec![token(&f.mints[0].mint, &TOKEN_2022, &f.dests[0], 1_000)])),
        ("1× TransferToken, Token-2022 transfer fee", Some((TOKEN_2022, MintKind::TransferFee)), 1, Box::new(|f: &Fixture| vec![token(&f.mints[0].mint, &TOKEN_2022, &f.dests[0], 1_000)])),
        ("TransferToken (all) + CloseTokenAccount, SPL Token", Some((SPL_TOKEN, MintKind::Plain)), 1, Box::new(|f: &Fixture| {
            vec![token(&f.mints[0].mint, &SPL_TOKEN, &f.dests[0], 1_000_000_000), close_ata(&f.mints[0].mint, &SPL_TOKEN, &f.user)]
        })),
        ("TransferSol + TransferToken (all) + CloseTokenAccount, SPL Token", Some((SPL_TOKEN, MintKind::Plain)), 1, Box::new(|f: &Fixture| {
            vec![sol(&f.user, LAMPORTS_PER_SOL), token(&f.mints[0].mint, &SPL_TOKEN, &f.dests[0], 1_000_000_000), close_ata(&f.mints[0].mint, &SPL_TOKEN, &f.user)]
        })),
        ("8× TransferSol, distinct recipients", None, 0, Box::new(|_f: &Fixture| (0..8u8).map(|i| sol(&Address::new_from_array([i + 1; 32]), LAMPORTS_PER_SOL)).collect())),
        ("8× TransferToken, SPL Token, 8 mints", Some((SPL_TOKEN, MintKind::Plain)), 8, Box::new(|f: &Fixture| {
            (0..8).map(|i| token(&f.mints[i].mint, &SPL_TOKEN, &f.dests[i], 1_000)).collect()
        })),
        ("8× TransferToken, Token-2022 transfer fee, 8 mints", Some((TOKEN_2022, MintKind::TransferFee)), 8, Box::new(|f: &Fixture| {
            (0..8).map(|i| token(&f.mints[i].mint, &TOKEN_2022, &f.dests[i], 1_000)).collect()
        })),
        ("4× (TransferToken all + CloseTokenAccount), Token-2022 pump.fun-style", Some((TOKEN_2022, MintKind::PumpLike)), 4, Box::new(|f: &Fixture| {
            (0..4).flat_map(|i| [token(&f.mints[i].mint, &TOKEN_2022, &f.dests[i], 1_000_000_000), close_ata(&f.mints[i].mint, &TOKEN_2022, &f.user)]).collect()
        })),
    ];
    for (name, kind, n, build) in &scenarios {
        for path in [Path::Inline, Path::Buffer] {
            let mut f = fixture(*kind, *n);
            let actions = build(&f);
            let v = f.v.clone();
            rows.push(run_execute(&mut f.env, &v, key_a0(), 0, name, path, &actions, None));
        }
    }
    for path in [Path::Inline, Path::Buffer] {
        let mut env = Env::new();
        let cos = env.new_funded_keypair(LAMPORTS_PER_SOL);
        let v = Vault::new(key_a0().root(), Some(cos.pubkey()));
        env.open(&v);
        env.transfer_sol(&v.wallet, 10 * LAMPORTS_PER_SOL);
        let to = env.payer_pk();
        rows.push(run_execute(&mut env, &v, key_a0(), 0, "1× TransferSol, hybrid (cosigner signs)", path, &[sol(&to, LAMPORTS_PER_SOL)], Some(&cos)));
    }

    // ---- 5. rotate / close_vault ----------------------------------------------------------------
    for path in [Path::Inline, Path::Buffer] {
        let mut env = Env::new();
        let v = Vault::new(key_a0().root(), None);
        env.open(&v);
        let new_root = key_a1().root();
        let msg = message(LOCALNET, &PROGRAM_ID, IxTag::Rotate, &v.state, 0, 0, &new_root);
        let vv = v.clone();
        let make = move |sig: Option<&[u8]>, buf: Option<Address>, fp: &Address| rotate_ix(fp, &vv, Opt { sig_buffer: buf, ..Default::default() }, 0, &new_root, sig);
        rows.push(run(&mut env, "rotate", path, &v.root, &v.state, 0, 0, &msg, key_a0(), &make, &[], 0, (0, 0, 0)));

        // Worst case for close_vault: the wallet still holds SOL, so the sweep CPI runs.
        env.transfer_sol(&v.wallet, LAMPORTS_PER_SOL);
        let rent_to = env.payer_pk();
        let msg = message(LOCALNET, &PROGRAM_ID, IxTag::Close, &v.state, 1, 0, rent_to.as_ref());
        let vv = v.clone();
        let make = move |sig: Option<&[u8]>, buf: Option<Address>, fp: &Address| close_vault_ix(fp, &vv, Opt { sig_buffer: buf, ..Default::default() }, 0, &rent_to, sig);
        rows.push(run(&mut env, CLOSE_SCENARIO, path, &key_a1().root(), &v.state, 1, 0, &msg, key_a1(), &make, &[], 0, (0, 0, 0)));
    }

    // ---- 6. signature-buffer instructions, ATA creation -----------------------------------------
    {
        let mut env = Env::new();
        let v = Vault::new(key_a0().root(), None);
        env.open(&v);
        let payer = env.payer.insecure_clone();
        let p = payer.pubkey();
        let buffer = sig_buffer_address(&v.state, &p, 0, 0);
        let (_, bbump) = Address::find_program_address(&[b"sigbuf", v.state.as_ref(), p.as_ref(), &0u32.to_le_bytes(), &0u32.to_le_bytes()], &PROGRAM_ID);
        let extra = 255 - bbump as u64;
        for (name, ix, extra) in [
            ("init_sig_buffer", init_sig_buffer_ix(&p, &v.state, 0, 0), extra),
            ("write_sig_buffer, 1,000-byte chunk", write_sig_buffer_ix(&p, &buffer, 0, &[1u8; 1000]), 0),
            ("close_sig_buffer", close_sig_buffer_ix(&p, &buffer), 0),
        ] {
            let tx = env.build_tx(&payer, &[ix], &[], 200_000);
            let bytes = legacy_tx_size(&tx);
            let m = unwrap_ok(env.send_tx(tx));
            unsigned.push((name.into(), bytes, m.compute_units_consumed, m.compute_units_consumed - pda_iter * extra));
        }
        for (prog, label) in [(SPL_TOKEN, "SPL Token"), (TOKEN_2022, "Token-2022 transfer fee")] {
            let kind = if prog == SPL_TOKEN { MintKind::Plain } else { MintKind::TransferFee };
            let tm = create_mint(&mut env, prog, kind, 6, 0);
            let owner = new_keypair().pubkey();
            let ix = spl_associated_token_account_interface::instruction::create_associated_token_account_idempotent(&p, &owner, &tm.mint, &prog);
            let tx = env.build_tx(&payer, &[ix], &[], 200_000);
            let bytes = legacy_tx_size(&tx);
            let m = unwrap_ok(env.send_tx(tx));
            let cu = m.compute_units_consumed;
            unsigned.push((format!("create destination ATA (idempotent), {label} — ATA program, not Bunker"), bytes, cu, cu));
        }
    }

    // ---- 7. capacity: how many actions fit --------------------------------------------------------
    let mut capacity: Vec<(&str, (usize, usize, usize))> = Vec::new();
    {
        let mut env = Env::new();
        let v = Vault::new(key_a0().root(), None);
        let user = Address::new_from_array([7; 32]);
        let m = |i: usize| Address::new_from_array([(i as u8) + 100; 32]);
        let d = |i: usize| Address::new_from_array([(i as u8) + 150; 32]);
        capacity.push(("TransferSol, distinct recipients", max_actions(&mut env, &v, &|n| (0..n).map(|i| sol(&d(i), 1)).collect())));
        capacity.push(("TransferToken, distinct mints and destinations", max_actions(&mut env, &v, &|n| (0..n).map(|i| token(&m(i), &SPL_TOKEN, &d(i), 1)).collect())));
        capacity.push(("CloseTokenAccount, distinct mints, one rent_to", max_actions(&mut env, &v, &|n| (0..n).map(|i| close_ata(&m(i), &SPL_TOKEN, &user)).collect())));
        capacity.push(("withdraw-all: (TransferToken + CloseTokenAccount) per mint, counted in actions", max_actions(&mut env, &v, &|n| {
            (0..n.div_ceil(2)).flat_map(|i| [token(&m(i), &SPL_TOKEN, &d(i), 1), close_ata(&m(i), &SPL_TOKEN, &user)]).take(n).collect()
        })));
    }

    // ---- 7b. Legacy: heir actions inside execute ----------------------------------------------------
    let mut heir_rows: Vec<(HeirKind, Row)> = Vec::new();
    for path in [Path::Inline, Path::Buffer] {
        type HeirCase = (&'static str, HeirKind, bool, bool, fn(&Address) -> Vec<Action>);
        let cases: [HeirCase; 6] = [
            ("SetHeir (creates the heir record)", HeirKind::SetHeir, false, false, |h| vec![set_heir(h, 365)]),
            ("SetHeir (record address pre-funded by someone else)", HeirKind::SetHeir, false, true, |h| vec![set_heir(h, 365)]),
            ("SetHeir (updates the heir record)", HeirKind::SetHeir, true, false, |h| vec![set_heir(h, 730)]),
            ("CheckIn", HeirKind::CheckIn, true, false, |h| vec![check_in(h, 365)]),
            ("ClearHeir", HeirKind::ClearHeir, true, false, |h| vec![clear_heir(h)]),
            ("TransferSol + CheckIn (a send that checks in)", HeirKind::CheckIn, true, false, |h| {
                vec![sol(&Address::new_from_array([9; 32]), LAMPORTS_PER_SOL), check_in(h, 365)]
            }),
        ];
        for (name, kind, with_record, prefund, build) in cases {
            let (mut env, v, heir, leaf) = heir_fixture(with_record, prefund);
            let actions = build(&heir);
            heir_rows.push((kind, run_execute(&mut env, &v, key_a0(), leaf, name, path, &actions, None)));
        }
    }

    // ---- 7c. Legacy: inherit ------------------------------------------------------------------------
    let max_groups_spl = max_inherit_groups(SPL_TOKEN);
    let max_groups_t22 = max_inherit_groups(TOKEN_2022);
    let mut inherit_rows: Vec<InheritRow> = vec![
        run_inherit("SOL only (no token accounts)", None, 0, 0),
        run_inherit("1 SPL Token account, the heir already has its account", Some((SPL_TOKEN, MintKind::Plain)), 1, 1),
        run_inherit("1 SPL Token account, the heir's account is created", Some((SPL_TOKEN, MintKind::Plain)), 1, 0),
        run_inherit("1 Token-2022 account, the heir's account is created", Some((TOKEN_2022, MintKind::Plain)), 1, 0),
        run_inherit("1 Token-2022 pump.fun-style account, the heir's account is created", Some((TOKEN_2022, MintKind::PumpLike)), 1, 0),
        run_inherit("1 Token-2022 transfer-fee account (stays open: withheld fee), created", Some((TOKEN_2022, MintKind::TransferFee)), 1, 0),
    ];
    inherit_rows.push(run_inherit(
        &format!("{max_groups_spl} SPL Token accounts (the most one legacy transaction carries), all created"),
        Some((SPL_TOKEN, MintKind::Plain)),
        max_groups_spl,
        0,
    ));
    inherit_rows.push(run_inherit(
        &format!("{max_groups_t22} Token-2022 pump.fun-style accounts, all created"),
        Some((TOKEN_2022, MintKind::PumpLike)),
        max_groups_t22,
        0,
    ));
    for r in &inherit_rows {
        assert!(r.tx_bytes <= PACKET_DATA_SIZE, "{} does not fit a legacy transaction ({} bytes)", r.scenario, r.tx_bytes);
    }

    // ---- 8. cost model ------------------------------------------------------------------------
    let w = |pred: &dyn Fn(&Row) -> bool| rows.iter().filter(|r| pred(r)).map(&worst).max().unwrap();
    let named = |name: &'static str| move |r: &Row| r.scenario == name;
    let sol1 = w(&named("1× TransferSol"));
    let sol8 = w(&named("8× TransferSol, distinct recipients"));
    let per_sol = (sol8 - sol1).div_ceil(7);
    let base = sol1 - per_sol;
    let per_token = rows
        .iter()
        .filter(|r| r.shape.0 == 0 && r.shape.1 > 0 && r.shape.2 == 0)
        // Saturating: a cheap token CPI can cost less than \`base\`; the assert below still checks
        // that the model covers every measured row.
        .map(|r| worst(r).saturating_sub(base).div_ceil(r.shape.1))
        .max()
        .unwrap();
    let per_close = rows
        .iter()
        .filter(|r| r.shape.2 > 0)
        .map(|r| worst(r).saturating_sub(base + r.shape.0 * per_sol + r.shape.1 * per_token).div_ceil(r.shape.2))
        .max()
        .unwrap();
    let cosigner_extra = w(&named("1× TransferSol, hybrid (cosigner signs)")).saturating_sub(sol1);
    // A heir action's own cost: what its rows cost beyond the transfers they carry (at most one
    // heir action per payload, so the model adds exactly one of these).
    let heir_cost = |kind: HeirKind| {
        heir_rows
            .iter()
            .filter(|(k, _)| *k == kind)
            .map(|(_, r)| worst(r).saturating_sub(base + r.shape.0 * per_sol + r.shape.1 * per_token + r.shape.2 * per_close))
            .max()
            .unwrap()
    };
    let (per_set_heir, per_check_in, per_clear_heir) = (heir_cost(HeirKind::SetHeir), heir_cost(HeirKind::CheckIn), heir_cost(HeirKind::ClearHeir));
    let base = base + cosigner_extra;
    let model = |s: u64, t: u64, c: u64| base + s * per_sol + t * per_token + c * per_close;
    for r in rows.iter().filter(|r| r.shape != (0, 0, 0)) {
        assert!(model(r.shape.0, r.shape.1, r.shape.2) >= worst(r), "model under-estimates {} ({:?})", r.scenario, r.path);
    }
    for (kind, r) in &heir_rows {
        let heir = match kind {
            HeirKind::SetHeir => per_set_heir,
            HeirKind::CheckIn => per_check_in,
            HeirKind::ClearHeir => per_clear_heir,
        };
        assert!(model(r.shape.0, r.shape.1, r.shape.2) + heir >= worst(r), "model under-estimates {} ({:?})", r.scenario, r.path);
    }

    // inherit = base + per created heir account + per existing one, at bump 255 everywhere.
    let inherit_norm = |r: &InheritRow| r.cu - pda_iter * r.extra_iters as u64;
    let inherit_base = inherit_rows.iter().filter(|r| r.groups == 0).map(&inherit_norm).max().unwrap();
    let per_group = |created: bool| {
        inherit_rows
            .iter()
            .filter(|r| r.groups > 0 && r.created == if created { r.groups } else { 0 })
            .map(|r| inherit_norm(r).saturating_sub(inherit_base).div_ceil(r.groups))
            .max()
            .unwrap()
    };
    let (inherit_per_created, inherit_per_existing) = (per_group(true), per_group(false));
    let inherit_model = |r: &InheritRow| inherit_base + r.created * inherit_per_created + (r.groups - r.created) * inherit_per_existing;
    for r in &inherit_rows {
        assert!(inherit_model(r) >= inherit_norm(r), "inherit model under-estimates {}", r.scenario);
    }
    let max_groups = max_groups_spl.min(max_groups_t22) as u64;
    // Three derivations per created heir account (vault ATA, heir ATA, and the ATA program's own).
    let inherit_rec = with_margin(inherit_base + max_groups * inherit_per_created + ITER_ALLOWANCE_EXECUTE * pda_iter);
    let any8 = (0..=8u64).flat_map(|t| (0..=8 - t).map(move |c| (8 - t - c, t, c))).map(|(s, t, c)| model(s, t, c)).max().unwrap();
    let exec_any8 = with_margin(any8 + ITER_ALLOWANCE_EXECUTE * pda_iter);
    let rotate_rec = with_margin(w(&named("rotate")) + cosigner_extra);
    let close_rec = with_margin(w(&named(CLOSE_SCENARIO)) + cosigner_extra);
    let open_rec = with_margin(unsigned.iter().filter(|u| u.0.starts_with("open_vault")).map(|u| u.3).max().unwrap() + ITER_ALLOWANCE_PDA * pda_iter);
    // Buffer upload transactions: init + chunk is the most expensive mix.
    let init = unsigned.iter().find(|u| u.0 == "init_sig_buffer").unwrap().3;
    let write = unsigned.iter().find(|u| u.0.starts_with("write_sig_buffer")).unwrap().2;
    let buf_rec = with_margin(init + write + ITER_ALLOWANCE_PDA * pda_iter);

    // ---- program sizes as loaded in LiteSVM (programdata for upgradeable programs) ---------------
    let prog_size = {
        let env = Env::new();
        move |id: &Address| -> usize {
            let acc = env.svm.get_account(id).unwrap();
            if acc.owner == BPF_LOADER_UPGRADEABLE {
                let pd = Address::new_from_array(acc.data[4..36].try_into().unwrap());
                env.svm.get_account(&pd).unwrap().data.len()
            } else {
                acc.data.len()
            }
        }
    };
    let p_token = {
        let env = Env::new();
        env.svm.get_account(&SPL_TOKEN).unwrap().owner == BPF_LOADER_UPGRADEABLE
    };
    let kib = |b: usize| b.div_ceil(1024);
    let (rv_kib, t22_kib, spl_kib) = (kib(prog_size(&PROGRAM_ID)), kib(prog_size(&TOKEN_2022)), kib(prog_size(&SPL_TOKEN)));

    // ---- write MEASUREMENTS.md ------------------------------------------------------------------
    let so_size = std::fs::metadata(so_path()).unwrap().len();
    let mut md = String::new();
    macro_rules! line { ($($t:tt)*) => { writeln!(md, $($t)*).unwrap() }; }
    line!("# Bunker program — measurements");
    line!();
    line!("Generated by \`cargo test -p bunker --release --test bunker measurements\`. Do not edit by hand.");
    line!();
    line!("Environment: LiteSVM 0.17 with its mainnet feature set (SPL Token = {}, Token-2022 11.0,", if p_token { "p-token" } else { "spl-token 3.5" });
    line!("ATA 1.1, v1 transactions enabled); program built by \`cargo build-sbf\` (platform-tools v1.57, default");
    line!("\`localnet\` feature).");
    line!();
    line!("* Program binary \`target/deploy/bunker.so\`: **{so_size} bytes** ({:.1} KiB, SBPF v3).", so_size as f64 / 1024.0);
    line!("* CU = everything the transaction consumed. Legacy transactions carry SetComputeUnitLimit +");
    line!("  SetComputeUnitPrice instructions; v1 transactions carry the budget in their header.");
    line!("* **LMS verification** runs Σ(15 − aᵢ) Winternitz hash-chain steps over the 67 digits of Q ‖ Cksm(Q).");
    line!("  Fit over {} signatures of the same instruction: **CU ≈ {fit_a:.0} + {fit_b:.2} × steps** (max residual {max_resid:.0} CU).", samples.len());
    let (smin, smax) = (samples.iter().map(|s| s.0 as u32).min().unwrap(), samples.iter().map(|s| s.0 as u32).max().unwrap());
    line!("  Observed {smin}–{smax} steps; the theoretical maximum is **{max_steps}** (all message digits 0).");
    line!("* **PDA bumps**: each \`find_program_address\` iteration below bump 255 costs **{pda_iter} CU** (measured).");
    line!("  The program derives the vault's ATA once per TransferToken / CloseTokenAccount; \`open_vault\` derives");
    line!("  the state and wallet PDAs and \`init_sig_buffer\` the buffer PDA. Everything else uses the stored bumps.");
    line!("* **Worst case** = measured − {pda_iter} × (extra bump iterations) + {slope} × ({max_steps} − steps), i.e. the");
    line!("  maximum-steps signature with every derived PDA at bump 255. **Recommended** = worst case + {MARGIN_PCT}%,");
    line!("  rounded up to 5,000 CU.");
    line!();
    line!("## Recommended \`SetComputeUnitLimit\`");
    line!();
    line!("| Instruction | CU limit | How |");
    line!("|---|---:|---|");
    line!("| \`execute\` (exact) | formula | \`1.{MARGIN_PCT:02} × ({base} + {per_sol}·n_sol + {per_token}·n_token + {per_close}·n_close + heir + {pda_iter}·Σ(255 − bump))\`, rounded up to 5,000; \`bump\` = bump of the vault ATA of each token action (TransferToken and CloseTokenAccount) and, for SetHeir, of the heir record PDA; \`heir\` = {per_set_heir} (SetHeir), {per_check_in} (CheckIn), {per_clear_heir} (ClearHeir) or 0 (at most one heir action per payload) |");
    line!("| \`execute\` (constant) | **{exec_any8}** | any Phase 1 payload of ≤ 8 actions, allowing {ITER_ALLOWANCE_EXECUTE} extra bump iterations; add the \`heir\` term for a payload with a heir action |");
    line!("| \`inherit\` (exact) | formula | \`1.{MARGIN_PCT:02} × ({inherit_base} + {inherit_per_created}·n_created + {inherit_per_existing}·n_existing + {pda_iter}·Σ(255 − bump))\`, rounded up to 5,000; per token account: the vault's ATA, the heir's ATA, and the ATA program's own search when it creates the heir's account |");
    line!("| \`inherit\` (constant) | **{inherit_rec}** | up to {max_groups} token accounts per legacy transaction, every heir account created, allowing {ITER_ALLOWANCE_EXECUTE} extra bump iterations |");
    line!("| \`rotate\` | **{rotate_rec}** | constant (no PDA search) |");
    line!("| \`close_vault\` | **{close_rec}** | constant (no PDA search); covers the wallet sweep |");
    line!("| \`open_vault\` | **{open_rec}** | allows {ITER_ALLOWANCE_PDA} extra bump iterations (or add {pda_iter} × the exact count) |");
    line!("| buffer upload tx (\`init_sig_buffer\` + \`write_sig_buffer\`, or \`write_sig_buffer\` alone, or \`close_sig_buffer\`) | **{buf_rec}** | allows {ITER_ALLOWANCE_PDA} extra bump iterations for the buffer PDA |");
    line!();
    line!("The formula's base already includes hybrid mode (cosigner) and the buffer path (buffer checks + the");
    line!("final \`write_sig_buffer\` chunk travelling in the same transaction). Add the ATA program's cost (below)");
    line!("for each destination ATA created in the same transaction. A transaction that runs out of compute");
    line!("does not consume the leaf: re-send the **same** signature with a higher limit (never re-sign).");
    line!();
    line!("v1 transactions default every budget to 0, so they must also set a loaded-accounts data size limit.");
    line!("LiteSVM does not count program binaries; on a cluster the limit has to cover the programs' data");
    line!("(here: Bunker {rv_kib} KiB, Token-2022 {t22_kib} KiB, SPL Token {spl_kib} KiB) plus the accounts: use **2 MiB**.");
    line!();
    line!("## Signed instructions");
    line!();
    line!("| Scenario | Path | Txs | Bytes per tx | Fits | CU | Steps | Extra bump iters | Worst case | Recommended |");
    line!("|---|---|---:|---|:---:|---:|---:|---:|---:|---:|");
    for r in &rows {
        let bytes = r.tx_bytes.iter().map(|b| b.to_string()).collect::<Vec<_>>().join(" + ");
        let lim = if r.path == Path::Inline { "≤ 4,096" } else { "≤ 1,232" };
        let fits = if r.fits { format!("yes ({lim})") } else { format!("**no** ({lim})") };
        line!("| {} | {} | {} | {} | {} | {} | {} | {} | {} | {} |", r.scenario, r.path.label(), r.tx_bytes.len(), bytes, fits, r.cu, r.steps, r.extra_iters, worst(r), with_margin(worst(r)));
    }
    line!();
    line!("Buffer path: transaction 1 is \`init_sig_buffer\` + the first chunk, the middle ones are chunks, and the");
    line!("last one carries the remaining chunk together with the signed instruction (\`sig = None\`) when it fits,");
    line!("otherwise the instruction alone. CU is for that last transaction. Rows marked **no** were run anyway");
    line!("(LiteSVM does not enforce packet sizes) — see the capacity table for what fits.");
    line!();
    line!("## Unsigned transactions");
    line!();
    line!("| Transaction | Bytes | CU | CU at bump 255 |");
    line!("|---|---:|---:|---:|");
    for (name, b, cu, norm) in &unsigned {
        line!("| {name} | {b} | {cu} | {norm} |");
    }
    line!();
    line!("## How many actions fit in one \`execute\` transaction");
    line!();
    line!("Worst case (every action has its own accounts), no address lookup tables; a payload holds at most 8");
    line!("actions. The buffer columns count only the \`execute\` transaction (the signature is uploaded separately).");
    line!();
    line!("| Actions | Inline sig, v1 tx (4,096 B) | Buffer, legacy execute tx (1,232 B) | Buffer, v1 execute tx (4,096 B) |");
    line!("|---|---:|---:|---:|");
    for (name, (a, b, c)) in &capacity {
        line!("| {name} | {a} | {b} | {c} |");
    }
    line!();
    line!("Clients split larger withdrawals over several \`execute\` calls (one leaf each).");
    line!();
    line!("## Legacy");
    line!();
    line!("### Heir actions inside \`execute\`");
    line!();
    line!("Same columns as above. The heir record is the 100-byte PDA \`[\\"heir\\", state]\`; SetHeir searches for it");
    line!("(\`find_program_address\`), CheckIn and ClearHeir check it with the stored bump. The pre-funded case is the");
    line!("griefed one: someone sent lamports to the record's address first, so SetHeir tops up, allocates and assigns");
    line!("(three system calls) instead of one CreateAccount.");
    line!();
    line!("| Scenario | Path | Txs | Bytes per tx | Fits | CU | Steps | Extra bump iters | Worst case | Recommended |");
    line!("|---|---|---:|---|:---:|---:|---:|---:|---:|---:|");
    for (_, r) in &heir_rows {
        let bytes = r.tx_bytes.iter().map(|b| b.to_string()).collect::<Vec<_>>().join(" + ");
        let lim = if r.path == Path::Inline { "≤ 4,096" } else { "≤ 1,232" };
        let fits = if r.fits { format!("yes ({lim})") } else { format!("**no** ({lim})") };
        line!("| {} | {} | {} | {} | {} | {} | {} | {} | {} | {} |", r.scenario, r.path.label(), r.tx_bytes.len(), bytes, fits, r.cu, r.steps, r.extra_iters, worst(r), with_margin(worst(r)));
    }
    line!();
    line!("### \`inherit\`");
    line!();
    line!("No hash-key signature, so no LMS verification: one legacy transaction, paid and signed by whoever sends it.");
    line!("Every row sweeps the vault's SOL to the heir as well. \\"Created\\" means the heir had no account for that");
    line!("token yet: the caller pays its rent and the ATA program's create runs inside \`inherit\`.");
    line!();
    line!("| Scenario | Bytes | Fits (≤ 1,232) | CU | Extra bump iters | CU at bump 255 | Recommended |");
    line!("|---|---:|:---:|---:|---:|---:|---:|");
    for r in &inherit_rows {
        let norm = inherit_norm(r);
        line!("| {} | {} | {} | {} | {} | {} | {} |", r.scenario, r.tx_bytes, if r.tx_bytes <= PACKET_DATA_SIZE { "yes" } else { "**no**" }, r.cu, r.extra_iters, norm, with_margin(inherit_model(r) + ITER_ALLOWANCE_EXECUTE * pda_iter));
    }
    line!();
    line!("One legacy \`inherit\` transaction carries at most **{max_groups_spl}** token accounts (SPL Token) or **{max_groups_t22}** (Token-2022)");
    line!("with distinct mints, no lookup tables. Clients split larger estates over several \`inherit\` transactions; each one");
    line!("sweeps whatever SOL is left, and the first one seals the vault.");

    let out = std::path::Path::new(env!("CARGO_MANIFEST_DIR")).join("MEASUREMENTS.md");
    std::fs::write(&out, md).unwrap();
    println!("wrote {}", out.display());
}
`;export{e as default};