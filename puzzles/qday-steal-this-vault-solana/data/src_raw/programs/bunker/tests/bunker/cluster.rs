//! The cluster id is a compile-time feature. The default build is `localnet` (1); these check the
//! `devnet` build (2) and the `mainnet` build (4) when they are present (CI builds both):
//!   cargo build-sbf --manifest-path programs/bunker/Cargo.toml --features devnet \
//!     --sbf-out-dir target/deploy-devnet
//!   cargo build-sbf --manifest-path programs/bunker/Cargo.toml --features mainnet \
//!     --sbf-out-dir target/deploy-mainnet

use bunker::errors::VaultError;
use bunker_core::{encode_actions, IxTag};
use solana_signer::Signer;

use crate::common::*;

#[test]
fn devnet_build_only_accepts_devnet_messages() {
    only_accepts_own_cluster("deploy-devnet", DEVNET);
}

#[test]
fn mainnet_build_only_accepts_mainnet_messages() {
    only_accepts_own_cluster("deploy-mainnet", MAINNET);
}

/// A build for `cluster` (at target/<dir>/bunker.so) executes a message signed for its own
/// cluster id and rejects the same signed intent for every other cluster id.
fn only_accepts_own_cluster(dir: &str, cluster_id: u8) {
    let path = std::path::Path::new(env!("CARGO_MANIFEST_DIR")).join(format!("../../target/{dir}/bunker.so"));
    if !path.exists() {
        // CI builds every cluster variant and sets this, so a missing build fails there.
        if std::env::var_os("BUNKER_REQUIRE_CLUSTER_BUILDS").is_some() {
            panic!("cluster {cluster_id} build missing: {}", path.display());
        }
        eprintln!("SKIPPED cluster {cluster_id} build: {} not built", path.display());
        return;
    }
    let mut env = Env::with_program(&path);
    let v = Vault::new(key_a0().root(), None);
    env.open(&v);
    env.transfer_sol(&v.wallet, 2 * LAMPORTS_PER_SOL);
    let to = new_keypair().pubkey();
    let actions = [sol(&to, LAMPORTS_PER_SOL)];
    let payload = encode_actions(&actions);
    let remaining = remaining_for(&v.wallet, &actions);

    // Every other cluster first (each is rejected, so leaf 0 stays unused), then the build's own.
    let others = [LOCALNET, DEVNET, MAINNET].into_iter().filter(|c| *c != cluster_id);
    for cluster in others.chain([cluster_id]) {
        let ok = cluster == cluster_id;
        let msg = message(cluster, &PROGRAM_ID, IxTag::Execute, &v.state, 0, 0, &payload);
        let sig = key_a0().sign(0, &msg);
        let ix = execute_ix(&env.payer_pk(), &v, Opt::default(), 0, &payload, Some(&sig), remaining.clone());
        if ok {
            env.send_ok(&[ix], &[]);
        } else {
            expect_code(env.send(&[ix], &[]), vault_err(VaultError::InvalidSignature));
        }
    }
    assert_eq!(env.lamports(&to), LAMPORTS_PER_SOL);
}
