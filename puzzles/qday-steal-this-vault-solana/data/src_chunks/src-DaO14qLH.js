var e=`// @bunker/sdk — client library for Bunker (post-quantum smart account for Solana).
// Contract: docs/SPEC.md §3. Message format: docs/MESSAGE_FORMAT.md.
import './polyfill';

export {
  PROGRAM_ID,
  CLUSTER_ID,
  MAINNET_ENABLED,
  MAINNET_DISABLED_MESSAGE,
  SPL_TOKEN_PROGRAM_ID,
  TOKEN_2022_PROGRAM_ID,
  ASSOCIATED_TOKEN_PROGRAM_ID,
  METAPLEX_TOKEN_METADATA_PROGRAM_ID,
  PREFIX_LEN,
  SIG_LEN,
  ROOT_LEN,
  TREE_SIZE,
  MAX_ACTIONS,
  IX_TAG,
  LOW_LEAVES_WARNING,
  RESERVED_LEAVES,
  LEGACY_TX_LIMIT,
  V1_TX_LIMIT,
  V1_LOADED_ACCOUNTS_DATA_SIZE_LIMIT,
  COMPUTE_UNITS,
  BETA_CAP_LAMPORTS,
  GENESIS_HASH,
  HEIR_MIN_DAYS,
  HEIR_MAX_DAYS,
  HEIR_PERIOD_PRESETS,
  HEIR_RECORD_SIZE,
  SECONDS_PER_DAY,
  INHERIT_MAX_TOKENS_PER_TX,
} from './constants';
export type { ClusterName, IxTagName } from './constants';

export { initWasm, isWasmReady, getWasm } from './wasm';
export { generateMnemonic, validateMnemonic, deriveRoot, normalizeMnemonic, plainMnemonic, keyBinding, vaultKeyContext, vaultFromSeed } from './keys';
export type { KeyContext } from './keys';

export {
  computeVaultId,
  encodeOptions,
  findStatePda,
  findWalletPda,
  findSigBufferPda,
  findHeirPda,
  ataOf,
  vaultAddressesFromRoot,
} from './addresses';

export {
  fetchVault,
  fetchAllVaults,
  decodeVaultAccount,
  decodeSigBuffer,
  fetchHeir,
  findHeirRecordsNaming,
  decodeHeir,
  VAULT_STATE_DISCRIMINATOR,
  VAULT_TOMBSTONE_DISCRIMINATOR,
  SIG_BUFFER_DISCRIMINATOR,
  HEIR_DISCRIMINATOR,
} from './state';
export type { VaultInfo, SigBufferInfo, HeirInfo } from './state';

export {
  encodeActions,
  decodeActions,
  encodeActionsTs,
  decodeActionsTs,
  validateActions,
  messagePrefixTs,
  parseMessage,
  isSupportedTokenProgram,
  isHeirAction,
  isValidInactivityDays,
} from './actions';
export type { VaultAction, HeirAction, ParsedMessage } from './actions';

export {
  describeActions,
  describeAction,
  describeHeirConsequence,
  describeRotate,
  describeClose,
  formatAmount,
  formatDays,
  parseAmount,
  shortAddress,
} from './describe';
export type { TokenMeta, TokenMetaLookup, DescribeOptions } from './describe';

export {
  sanitizeText,
  sanitizeTokenSymbol,
  sanitizeTokenName,
  tokenSummaryLabel,
  TOKEN_SYMBOL_MAX,
  TOKEN_NAME_MAX,
} from './text';

export {
  IX_DISCRIMINATORS,
  openVaultIx,
  executeIx,
  executeRemainingAccounts,
  rotateIx,
  closeVaultIx,
  initSigBufferIx,
  writeSigBufferIx,
  closeSigBufferIx,
  inheritIx,
} from './instructions';
export type { SigSource, InheritTokenAccount } from './instructions';

// ---- Legacy (inheritance): heir record, cluster clock, permissionless inherit (legacy.ts) --------
export {
  fetchClusterTime,
  heirStatus,
  buildInheritTxs,
  inheritComputeUnits,
  summarizeInheritPlan,
  programSupportsLegacy,
  HeirCannotReceiveError,
  InheritanceNotDueError,
  NoHeirError,
} from './legacy';
export type { HeirStatus, InheritPlan, InheritTokenPlan, InheritSkip } from './legacy';

export {
  buildBufferPathTxs,
  estimateV1TxSize,
  sendPrepared,
  sendAndConfirmRaw,
  measureTx,
  txSize,
  cuLimitIx,
  diffRanges,
  TransactionTooLargeError,
  SendPreparedError,
  WalletModifiedTransactionError,
  assertWalletSignedAsBuilt,
  sendOneByOne,
  SimulationFailedError,
} from './transport';
export type { Transport, BufferPathParams, BlockhashInfo, SendOptions, WalletSend, OneByOneStatus, OneByOneOptions } from './transport';

export { buildOpenVaultTx } from './open';
export { buildDepositTxs, BetaCapError, UnsupportedAssetError } from './deposit';
export type { DepositAsset } from './deposit';

export { prepareExecute, prepareRotate, prepareClose, rebuildPrepared, executeComputeUnits, heirOfWarning, PrepareCancelledError, FrozenTokenAccountsError, VaultInheritedError } from './prepare';
export type {
  PreparedSignature,
  PrepareExecuteParams,
  PrepareRotateParams,
  PrepareCloseParams,
  SignaturePreview,
  InlineBundle,
} from './prepare';

export { MemoryLedger, LocalStorageLedger, JsonLedger, LeafReuseError, LedgerUnreadableError, ledgerKey, lmsKeyId } from './ledger';
export { findPendingSignatures, fetchRevealedLeaves, scanRevealedLeaves, PendingSignatureError, IncompleteHistoryError } from './pending';
export { RateLimitedError, isRateLimitError, withRateLimitRetry } from './rpcRetry';
export { checkRecipients } from './recipients';
export type { RecipientCheck } from './recipients';
export type { PendingSignature } from './pending';
export type { LeafLedger, LedgerEntry, MarkSpentExtra, KeyValueStorage } from './ledger';

export {
  fetchAssets,
  fetchMintClassifications,
  fetchTokenMetas,
  classifyMint,
  decodeMetaplexMetadata,
  decodeToken2022Metadata,
  findMetaplexMetadataPda,
  getMultipleAccountsBatched,
  TOKEN_STANDARD,
} from './assets';
export type { Asset, RiskFlag, RiskId, MintClassification, MetaplexMetadata, ClassifyInput } from './assets';

export { assertClusterAllowed, detectCluster, DEFAULT_RPC, MainnetDisabledError } from './cluster';
export { ixDiscriminator, accountDiscriminator, toHex, fromHex, bytesEqual, sha256 } from './bytes';

// ---- launch into the vault (pump.fun create_v2 / plain Token-2022, creator fees) ----------------
export {
  PUMP_PROGRAM_ID,
  PUMP_AMM_PROGRAM_ID,
  PUMP_FEES_PROGRAM_ID,
  MAYHEM_PROGRAM_ID,
  WSOL_MINT,
  PUMP_NAME_MAX,
  PUMP_SYMBOL_MAX,
  PUMP_URI_MAX,
  PUMP_DECIMALS,
  PUMP_IX,
  PUMP_AMM_IX,
  PumpInputError,
  assertPumpText,
  bondingCurvePda,
  creatorVaultPda,
  holderRewardsPda,
  canonicalPoolPda,
  ammCreatorVaultAuthorityPda,
  createV2Ix,
  buyV3Ix,
  sweepCreatorFeeIx,
  collectCreatorFeeV2Ix,
  ammSweepCreatorFeeIx,
  collectCoinCreatorFeeIx,
  decodePumpGlobal,
  decodeBondingCurve,
  decodePumpFeeConfig,
  decodePumpPool,
  quoteFreshCurveBuy,
} from './pump';
export type { PumpGlobal, PumpBondingCurve, PumpFeeConfig, PumpPool } from './pump';
export {
  DEV_BUY_MAX_SUPPLY_BPS,
  DEFAULT_TOKEN_SUPPLY,
  SYSTEM_ACCOUNT_RENT_LAMPORTS,
  fetchPumpLaunchConfig,
  quoteDevBuy,
  buildPumpLaunchTx,
  buildTokenLaunchTx,
  tokenMetadataInitializeIx,
  tokenMetadataUpdateAuthorityIx,
  tokenMetadataLen,
  fetchCreatorFees,
  buildCollectCreatorFeesTx,
  NothingToCollectError,
} from './launch';
export type { CreatorFeesMode, PumpLaunchConfig, PumpLaunchParams, PumpLaunchPlan, DevBuyQuote, TokenLaunchParams, TokenLaunchPlan, CreatorFees, CreatorFeeCoin } from './launch';
export * from './swap'; // Swap through Jupiter: one atomic v0 transaction around a signed execute (swap.ts).
`;export{e as default};