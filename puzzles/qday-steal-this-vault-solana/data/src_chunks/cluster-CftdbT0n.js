var e=`import type { Connection } from '@solana/web3.js';
import { GENESIS_HASH, MAINNET_DISABLED_MESSAGE, MAINNET_ENABLED } from './constants';
import type { ClusterName } from './constants';

export class MainnetDisabledError extends Error {
  constructor() {
    super(MAINNET_DISABLED_MESSAGE);
    this.name = 'MainnetDisabledError';
  }
}

export function assertClusterAllowed(cluster: ClusterName): void {
  if (cluster === 'mainnet-beta' && !MAINNET_ENABLED) throw new MainnetDisabledError();
}

export const DEFAULT_RPC: Record<ClusterName, string> = {
  localnet: 'http://127.0.0.1:8899',
  devnet: 'https://api.devnet.solana.com',
  'mainnet-beta': 'https://api.mainnet-beta.solana.com',
};

/**
 * Cluster name of a live RPC endpoint by genesis hash: mainnet/devnet by their known hashes,
 * anything else (test validators) is treated as localnet. Testnet is rejected (no deployment).
 */
export async function detectCluster(conn: Connection): Promise<ClusterName> {
  const genesis = await conn.getGenesisHash();
  if (genesis === GENESIS_HASH['mainnet-beta']) return 'mainnet-beta';
  if (genesis === GENESIS_HASH.devnet) return 'devnet';
  if (genesis === GENESIS_HASH.testnet) throw new Error('testnet is not supported by Bunker');
  return 'localnet';
}
`;export{e as default};