var e=`// Asset discovery + support/risk classification (SPEC §3, deposit screen and vault status).

import { Buffer } from 'buffer';
import { PublicKey } from '@solana/web3.js';
import type { AccountInfo, Connection } from '@solana/web3.js';
import {
  AccountState,
  ExtensionType,
  getDefaultAccountState,
  getExtensionData,
  getExtensionTypes,
  getMetadataPointerState,
  getPermanentDelegate,
  getTransferFeeConfig,
  getTransferHook,
  unpackAccount,
  unpackMint,
} from '@solana/spl-token';
import type { Mint } from '@solana/spl-token';
import { BorshReader } from './bytes';
import { METAPLEX_TOKEN_METADATA_PROGRAM_ID, SPL_TOKEN_PROGRAM_ID, TOKEN_2022_PROGRAM_ID } from './constants';
import type { TokenMeta } from './describe';
import { sanitizeText, sanitizeTokenName, sanitizeTokenSymbol } from './text';

export type RiskId =
  | 'freezeAuthority'
  | 'permanentDelegate'
  | 'transferHook'
  | 'defaultFrozen'
  | 'mintAuthority'
  | 'upgradeableTokenProgram'
  | 'pnftRules'
  | 'transferFee'
  | 'nonTransferable'
  | 'pausable';

export interface RiskFlag {
  id: RiskId;
  severity: 'info' | 'warn' | 'danger';
  label: string;
  detail: string;
}

export interface Asset {
  kind: 'sol' | 'token' | 'nft';
  mint: PublicKey | null;
  tokenProgram: PublicKey | null;
  symbol: string;
  name: string;
  decimals: number;
  amount: bigint;
  image?: string;
  supported: boolean;
  unsupportedReason?: string;
  risks: RiskFlag[];
  /** Extensions (not in SPEC §3). */
  tokenAccount?: PublicKey;
  frozen?: boolean;
  uri?: string;
}

// ---- Metaplex Token Metadata (decoded by hand; only the fields we need) ----

export interface MetaplexMetadata {
  updateAuthority: PublicKey;
  mint: PublicKey;
  name: string;
  symbol: string;
  uri: string;
  isMutable: boolean;
  /** 0 NonFungible, 1 FungibleAsset, 2 Fungible, 3 NonFungibleEdition, 4 ProgrammableNonFungible, 5 ProgrammableNonFungibleEdition. */
  tokenStandard: number | null;
}

export const TOKEN_STANDARD = {
  NonFungible: 0,
  FungibleAsset: 1,
  Fungible: 2,
  NonFungibleEdition: 3,
  ProgrammableNonFungible: 4,
  ProgrammableNonFungibleEdition: 5,
} as const;

export function findMetaplexMetadataPda(mint: PublicKey): PublicKey {
  return PublicKey.findProgramAddressSync(
    [new TextEncoder().encode('metadata'), METAPLEX_TOKEN_METADATA_PROGRAM_ID.toBytes(), mint.toBytes()],
    METAPLEX_TOKEN_METADATA_PROGRAM_ID,
  )[0];
}


export function decodeMetaplexMetadata(data: Uint8Array): MetaplexMetadata | null {
  try {
    const r = new BorshReader(data);
    if (r.u8() !== 4) return null; // Key::MetadataV1
    const updateAuthority = new PublicKey(r.fixed(32));
    const mint = new PublicKey(r.fixed(32));
    // Chain metadata is attacker-controlled: sanitised here, at the boundary (see text.ts).
    const name = sanitizeTokenName(r.string());
    const symbol = sanitizeTokenSymbol(r.string());
    const uri = sanitizeText(r.string());
    r.u16(); // seller_fee_basis_points
    if (r.u8() === 1) {
      const n = r.u32();
      r.fixed(n * 34); // creators: address 32 + verified 1 + share 1
    }
    r.bool(); // primary_sale_happened
    const isMutable = r.bool();
    let tokenStandard: number | null = null;
    try {
      if (r.u8() === 1) r.u8(); // edition_nonce
      if (r.u8() === 1) tokenStandard = r.u8();
    } catch {
      tokenStandard = null; // old accounts end before token_standard
    }
    return { updateAuthority, mint, name, symbol, uri, isMutable, tokenStandard };
  } catch {
    return null;
  }
}

/** Token-2022 TokenMetadata extension (name/symbol/uri), decoded by hand from the TLV value. */
export function decodeToken2022Metadata(value: Uint8Array): { name: string; symbol: string; uri: string } | null {
  try {
    const r = new BorshReader(value);
    r.fixed(32); // update authority (OptionalNonZeroPubkey)
    r.fixed(32); // mint
    return { name: sanitizeTokenName(r.string()), symbol: sanitizeTokenSymbol(r.string()), uri: sanitizeText(r.string()) };
  } catch {
    return null;
  }
}

// ---- classification ----

/** Token-2022 mint extensions this build knows to be compatible with plain transfer_checked. */
const KNOWN_MINT_EXTENSIONS = new Set<number>([
  ExtensionType.TransferFeeConfig,
  ExtensionType.MintCloseAuthority,
  ExtensionType.ConfidentialTransferMint,
  ExtensionType.DefaultAccountState,
  ExtensionType.NonTransferable,
  ExtensionType.InterestBearingConfig,
  ExtensionType.PermanentDelegate,
  ExtensionType.TransferHook,
  16, // ConfidentialTransferFeeConfig (not in the spl-token JS enum)
  ExtensionType.MetadataPointer,
  ExtensionType.TokenMetadata,
  ExtensionType.GroupPointer,
  ExtensionType.TokenGroup,
  ExtensionType.GroupMemberPointer,
  ExtensionType.TokenGroupMember,
  ExtensionType.ScaledUiAmountConfig,
  ExtensionType.PausableConfig,
]);

export interface MintClassification {
  mint: PublicKey;
  tokenProgram: PublicKey;
  decimals: number;
  supply: bigint;
  kind: 'token' | 'nft';
  name: string;
  symbol: string;
  uri?: string;
  supported: boolean;
  unsupportedReason?: string;
  risks: RiskFlag[];
  extensions: number[];
  /** A transfer-hook program is set: the program refuses to move this token. */
  transferHookActive: boolean;
}

const RISK = {
  freezeAuthority: (): RiskFlag => ({
    id: 'freezeAuthority',
    severity: 'warn',
    label: 'Freeze authority',
    detail: 'The issuer can freeze this token, including the copy held by your vault.',
  }),
  mintAuthority: (): RiskFlag => ({
    id: 'mintAuthority',
    severity: 'info',
    label: 'Mint authority',
    detail: 'The issuer can still mint more supply.',
  }),
  permanentDelegate: (): RiskFlag => ({
    id: 'permanentDelegate',
    severity: 'danger',
    label: 'Permanent delegate',
    detail: 'The issuer can move these out of your vault.',
  }),
  transferHook: (): RiskFlag => ({
    id: 'transferHook',
    severity: 'danger',
    label: 'Transfer hook',
    detail: 'Every transfer runs an issuer-controlled program; the vault cannot pass its extra accounts.',
  }),
  defaultFrozen: (): RiskFlag => ({
    id: 'defaultFrozen',
    severity: 'danger',
    label: 'Frozen by default',
    detail: 'New token accounts start frozen, so the vault could not move these.',
  }),
  nonTransferable: (): RiskFlag => ({
    id: 'nonTransferable',
    severity: 'danger',
    label: 'Non-transferable',
    detail: 'This token cannot be transferred.',
  }),
  pausable: (): RiskFlag => ({
    id: 'pausable',
    severity: 'danger',
    label: 'Pausable',
    detail: 'The issuer can pause all transfers of this token.',
  }),
  transferFee: (bps: number, max: bigint): RiskFlag => ({
    id: 'transferFee',
    severity: 'warn',
    label: 'Transfer fee',
    detail: \`The issuer charges \${(bps / 100).toFixed(2)}% (up to \${max} base units) on every transfer, including deposits and withdrawals.\`,
  }),
  // Not raised for SPL Token / Token-2022 (a pump.fun-style Token-2022 mint must show zero flags);
  // only for a mint owned by some other (unknown, possibly upgradeable) token program.
  upgradeableTokenProgram: (): RiskFlag => ({
    id: 'upgradeableTokenProgram',
    severity: 'danger',
    label: 'Unknown token program',
    detail: 'This token is owned by a program other than SPL Token or Token-2022.',
  }),
  pnftRules: (): RiskFlag => ({
    id: 'pnftRules',
    severity: 'danger',
    label: 'Programmable NFT',
    detail: 'Programmable NFTs move through Metaplex rule sets, which this version does not support.',
  }),
};

export interface ClassifyInput {
  mint: Mint;
  tokenProgram: PublicKey;
  metaplex?: MetaplexMetadata | null;
}

/** Pure classification of a mint (no RPC). */
export function classifyMint({ mint, tokenProgram, metaplex }: ClassifyInput): MintClassification {
  const risks: RiskFlag[] = [];
  const blocked: string[] = [];
  const isT22 = tokenProgram.equals(TOKEN_2022_PROGRAM_ID);
  const extensions = isT22 && mint.tlvData.length > 0 ? getExtensionTypes(mint.tlvData) : [];
  // \`metaplex\` may come from the caller rather than decodeMetaplexMetadata: sanitise again (idempotent).
  let name = sanitizeTokenName(metaplex?.name);
  let symbol = sanitizeTokenSymbol(metaplex?.symbol);
  let uri = sanitizeText(metaplex?.uri) || undefined;
  let transferHookActive = false;

  if (!tokenProgram.equals(SPL_TOKEN_PROGRAM_ID) && !isT22) {
    risks.push(RISK.upgradeableTokenProgram());
    blocked.push('Unknown token program.');
  }
  if (mint.freezeAuthority) risks.push(RISK.freezeAuthority());
  if (mint.mintAuthority) risks.push(RISK.mintAuthority());

  if (isT22) {
    const unknown = extensions.filter((e) => !KNOWN_MINT_EXTENSIONS.has(e));
    if (unknown.length > 0) blocked.push(\`Unsupported Token-2022 extension(s): \${unknown.join(', ')}.\`);

    const hook = getTransferHook(mint);
    if (hook) {
      transferHookActive = !hook.programId.equals(PublicKey.default);
      if (transferHookActive || !hook.authority.equals(PublicKey.default)) {
        risks.push(RISK.transferHook());
        blocked.push(
          transferHookActive
            ? 'Transfer-hook tokens are not supported yet.'
            : 'The issuer can switch on a transfer hook at any time, which would lock these in the vault.',
        );
      }
    }
    const delegate = getPermanentDelegate(mint);
    if (delegate && !delegate.delegate.equals(PublicKey.default)) risks.push(RISK.permanentDelegate());
    const das = getDefaultAccountState(mint);
    if (das && das.state === AccountState.Frozen) {
      risks.push(RISK.defaultFrozen());
      blocked.push('Tokens whose accounts start frozen are not supported.');
    }
    if (extensions.includes(ExtensionType.NonTransferable)) {
      risks.push(RISK.nonTransferable());
      blocked.push('Non-transferable tokens cannot be deposited.');
    }
    if (extensions.includes(ExtensionType.PausableConfig)) {
      risks.push(RISK.pausable());
      blocked.push('Pausable tokens are not supported yet.');
    }
    const fee = getTransferFeeConfig(mint);
    if (fee) {
      const f = fee.newerTransferFee.transferFeeBasisPoints >= fee.olderTransferFee.transferFeeBasisPoints ? fee.newerTransferFee : fee.olderTransferFee;
      if (f.transferFeeBasisPoints > 0 || fee.transferFeeConfigAuthority) risks.push(RISK.transferFee(f.transferFeeBasisPoints, f.maximumFee));
    }
    const pointer = getMetadataPointerState(mint);
    const raw = extensions.includes(ExtensionType.TokenMetadata) ? getExtensionData(ExtensionType.TokenMetadata, mint.tlvData) : null;
    if (raw && (!pointer?.metadataAddress || pointer.metadataAddress.equals(mint.address))) {
      const md = decodeToken2022Metadata(raw);
      if (md) {
        name = md.name || name;
        symbol = md.symbol || symbol;
        uri = md.uri || uri;
      }
    }
  }

  const ts = metaplex?.tokenStandard ?? null;
  if (ts === TOKEN_STANDARD.ProgrammableNonFungible || ts === TOKEN_STANDARD.ProgrammableNonFungibleEdition) {
    risks.push(RISK.pnftRules());
    blocked.push('Programmable NFTs (pNFTs) are not supported yet.');
  }
  const isNft =
    (mint.decimals === 0 && mint.supply === 1n) ||
    ts === TOKEN_STANDARD.NonFungible ||
    ts === TOKEN_STANDARD.NonFungibleEdition ||
    ts === TOKEN_STANDARD.ProgrammableNonFungible ||
    ts === TOKEN_STANDARD.ProgrammableNonFungibleEdition;

  const out: MintClassification = {
    mint: mint.address,
    tokenProgram,
    decimals: mint.decimals,
    supply: mint.supply,
    kind: isNft ? 'nft' : 'token',
    name,
    symbol,
    supported: blocked.length === 0,
    risks,
    extensions,
    transferHookActive,
  };
  if (uri) out.uri = uri;
  if (blocked.length > 0) out.unsupportedReason = blocked.join(' ');
  return out;
}

export function mintClassificationToMeta(c: MintClassification): TokenMeta {
  const m: TokenMeta = { decimals: c.decimals };
  const symbol = sanitizeTokenSymbol(c.symbol);
  const name = sanitizeTokenName(c.name);
  if (symbol) m.symbol = symbol;
  if (name) m.name = name;
  return m;
}

// ---- RPC ----

const toBuf = (info: AccountInfo<Uint8Array | Buffer>): AccountInfo<Buffer> => ({
  ...info,
  data: Buffer.isBuffer(info.data) ? info.data : Buffer.from(info.data),
});

/** getMultipleAccountsInfo in batches of 100, preserving order. */
export async function getMultipleAccountsBatched(
  conn: Connection,
  keys: PublicKey[],
): Promise<Array<AccountInfo<Buffer> | null>> {
  const out: Array<AccountInfo<Buffer> | null> = [];
  for (let i = 0; i < keys.length; i += 100) {
    const chunk = keys.slice(i, i + 100);
    const infos = await conn.getMultipleAccountsInfo(chunk, 'confirmed');
    out.push(...infos);
  }
  return out;
}

/** Fetch and classify mints (+ their Metaplex metadata) in batched RPC calls. Missing mints are omitted. */
export async function fetchMintClassifications(conn: Connection, mints: PublicKey[]): Promise<Map<string, MintClassification>> {
  const unique = [...new Map(mints.map((m) => [m.toBase58(), m])).values()];
  const pdas = unique.map(findMetaplexMetadataPda);
  const infos = await getMultipleAccountsBatched(conn, [...unique, ...pdas]);
  const result = new Map<string, MintClassification>();
  unique.forEach((mint, i) => {
    const info = infos[i];
    if (!info) return;
    const program = info.owner;
    if (!program.equals(SPL_TOKEN_PROGRAM_ID) && !program.equals(TOKEN_2022_PROGRAM_ID)) return;
    let parsed: Mint;
    try {
      parsed = unpackMint(mint, toBuf(info), program);
    } catch {
      return;
    }
    const mdInfo = infos[unique.length + i];
    const metaplex = mdInfo && mdInfo.owner.equals(METAPLEX_TOKEN_METADATA_PROGRAM_ID) ? decodeMetaplexMetadata(mdInfo.data) : null;
    result.set(mint.toBase58(), classifyMint({ mint: parsed, tokenProgram: program, metaplex }));
  });
  return result;
}

/** Token metadata (decimals, symbol, name) for describeActions. */
export async function fetchTokenMetas(conn: Connection, mints: PublicKey[]): Promise<Map<string, TokenMeta>> {
  const cls = await fetchMintClassifications(conn, mints);
  return new Map([...cls].map(([k, c]) => [k, mintClassificationToMeta(c)]));
}

/**
 * SOL + every token account of \`owner\` under both token programs, classified for support and risk.
 * RPC: getBalance + 2 × getTokenAccountsByOwner + batched getMultipleAccountsInfo (mints + Metaplex PDAs).
 * Pass \`includeEmpty: false\` to hide zero-balance token accounts.
 */
export async function fetchAssets(
  conn: Connection,
  owner: PublicKey,
  opts?: { offCurve?: boolean; includeEmpty?: boolean },
): Promise<Asset[]> {
  const [lamports, spl, t22] = await Promise.all([
    conn.getBalance(owner, 'confirmed'),
    conn.getTokenAccountsByOwner(owner, { programId: SPL_TOKEN_PROGRAM_ID }, 'confirmed'),
    conn.getTokenAccountsByOwner(owner, { programId: TOKEN_2022_PROGRAM_ID }, 'confirmed'),
  ]);
  const accounts = [
    ...spl.value.map((a) => ({ ...a, program: SPL_TOKEN_PROGRAM_ID })),
    ...t22.value.map((a) => ({ ...a, program: TOKEN_2022_PROGRAM_ID })),
  ].map(({ pubkey, account, program }) => ({ acc: unpackAccount(pubkey, toBuf(account), program), program }));
  const cls = await fetchMintClassifications(
    conn,
    accounts.map((a) => a.acc.mint),
  );

  const assets: Asset[] = [
    {
      kind: 'sol',
      mint: null,
      tokenProgram: null,
      symbol: 'SOL',
      name: 'Solana',
      decimals: 9,
      amount: BigInt(lamports),
      supported: true,
      risks: [],
    },
  ];
  for (const { acc, program } of accounts) {
    if (opts?.includeEmpty === false && acc.amount === 0n) continue;
    const c = cls.get(acc.mint.toBase58());
    const asset: Asset = {
      kind: c?.kind ?? 'token',
      mint: acc.mint,
      tokenProgram: program,
      symbol: c?.symbol ?? '',
      name: c?.name ?? '',
      decimals: c?.decimals ?? 0,
      amount: acc.amount,
      supported: c?.supported ?? false,
      risks: c ? [...c.risks] : [],
      tokenAccount: acc.address,
      frozen: acc.isFrozen,
    };
    if (c?.uri) asset.uri = c.uri;
    const reasons: string[] = [];
    if (!c) reasons.push('Mint account not found or not a token mint.');
    else if (c.unsupportedReason) reasons.push(c.unsupportedReason);
    if (acc.isFrozen) {
      reasons.push('This token account is frozen by the issuer.');
      if (!asset.risks.some((r) => r.id === 'freezeAuthority' && r.severity === 'danger')) {
        asset.risks = asset.risks.filter((r) => r.id !== 'freezeAuthority');
        asset.risks.push({ id: 'freezeAuthority', severity: 'danger', label: 'Frozen', detail: 'The issuer has frozen this token account.' });
      }
    }
    if (reasons.length > 0) {
      asset.supported = false;
      asset.unsupportedReason = reasons.join(' ');
    }
    assets.push(asset);
  }
  return assets;
}
`;export{e as default};