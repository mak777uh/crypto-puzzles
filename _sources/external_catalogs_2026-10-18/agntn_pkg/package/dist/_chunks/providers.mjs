import { defined } from "./parts.mjs";
import { sameAddress } from "./chains2.mjs";
import { Balance } from "./types.mjs";
import { BalanceError, BalanceProviderError, HISTORY_LIMIT, InvalidAddressError as InvalidAddressError$1, UnsupportedChainError as UnsupportedChainError$1 } from "./balance.mjs";
import { InvalidAddressError } from "@agntn/chains";
import { HTTPError, RateLimitError, TransportError } from "@agntn/explorers";
import { Arweave as Arweave$1 } from "@agntn/explorers/providers/arweave";
import { Blockchair } from "@agntn/explorers/providers/blockchair";
import { Blockscout } from "@agntn/explorers/providers/blockscout";
import { Blockstream } from "@agntn/explorers/providers/blockstream";
import { Dcrdata } from "@agntn/explorers/providers/dcrdata";
import { Etherscan } from "@agntn/explorers/providers/etherscan";
import { Mempool } from "@agntn/explorers/providers/mempool";
function keyless(config) {
	const { apiKey: _, ...rest } = config;
	return rest;
}
function ethereumExplorer(config) {
	return config.apiKey === void 0 || config.apiKey.length === 0 ? new Blockscout({
		...keyless(config),
		defaultChain: "ethereum"
	}) : new Etherscan({
		...config,
		defaultChain: "ethereum"
	});
}
const explorers = {
	arweave: (config) => new Arweave$1(config),
	base: (config) => new Blockscout({
		...keyless(config),
		defaultChain: "base"
	}),
	bitcoin: (config) => new Mempool(config),
	bitcoincash: (config) => new Blockchair(config),
	decred: (config) => new Dcrdata(config),
	dogecoin: (config) => new Blockchair(config),
	ecash: (config) => new Blockchair(config),
	ethereum: ethereumExplorer,
	litecoin: (config) => new Mempool(keyless(config)),
	monero: void 0
};
const fallbacks = {
	bitcoin: (config) => new Blockstream(config),
	litecoin: (config) => new Blockchair(config)
};
function fallbackFor(chain, lookup, config) {
	const fallback = config.baseUrl === void 0 ? fallbacks[chain] : void 0;
	return lookup === "Public key" && fallback?.(config).capabilities.pubkeys !== true ? void 0 : fallback;
}
function isTransient(error) {
	return error instanceof RateLimitError || error instanceof TransportError || error instanceof HTTPError && error.statusCode >= 500;
}
function baseUnits(value, label) {
	if (!/^-?\d+$/.test(value)) throw new BalanceProviderError(`Invalid ${label} base unit value`);
	return BigInt(value);
}
function toBalance(chain, snapshot) {
	const confirmed = baseUnits(snapshot.balance, "balance");
	if (confirmed < 0n) throw new BalanceProviderError("Balance provider returned a negative confirmed balance");
	const unconfirmed = snapshot.unconfirmed === void 0 ? 0n : baseUnits(snapshot.unconfirmed, "unconfirmed");
	return new Balance(chain, confirmed, unconfirmed);
}
function redact(message, apiKey) {
	return apiKey === void 0 || apiKey.length === 0 ? message : message.replaceAll(apiKey, "REDACTED");
}
function translate(lookup, error, address, apiKey, first) {
	if (error instanceof BalanceError) return error;
	if (error instanceof InvalidAddressError || lookup === "Balance" && error instanceof HTTPError && [400, 422].includes(error.statusCode)) return new InvalidAddressError$1(`Invalid address: ${address}`);
	const message = (first === void 0 ? [error] : [first, error]).map((failure) => failure instanceof Error ? failure.message : String(failure)).join("; then ");
	return new BalanceProviderError(`${lookup} lookup failed: ${redact(message, apiKey)}`);
}
const BENCH_MS = 6e5;
const benched = /* @__PURE__ */ new Map();
async function inTurn(chain, [primary, fallback], read, fail) {
	const primaryFirst = (benched.get(chain) ?? 0) <= Date.now();
	const [first, second] = primaryFirst ? [primary, fallback] : [fallback, primary];
	try {
		return await read(first);
	} catch (error) {
		if (!primaryFirst) benched.delete(chain);
		else if (!isTransient(error)) throw fail(error);
		try {
			const value = await read(second);
			if (primaryFirst) benched.set(chain, Date.now() + BENCH_MS);
			return value;
		} catch (failure) {
			throw fail(failure, error);
		}
	}
}
async function ask(chain, lookup, address, config, read) {
	const explorer = explorers[chain];
	if (explorer === void 0) throw new UnsupportedChainError$1(`Unsupported ${lookup.toLowerCase()} chain: ${chain}`);
	const fail = (error, first) => translate(lookup, error, address, config.apiKey, first);
	const fallback = fallbackFor(chain, lookup, config);
	if (fallback !== void 0) return inTurn(chain, [explorer, fallback], read, fail);
	try {
		return await read(explorer);
	} catch (error) {
		throw fail(error);
	}
}
function configOf(options) {
	return defined({
		apiKey: options.apiKey,
		baseUrl: options.baseUrl,
		timeout: options.timeout
	});
}
function prizeAddresses(puzzle) {
	const escrow = puzzle.escrow();
	return escrow === void 0 ? [puzzle.address().value] : [puzzle.address().value, escrow.value];
}
function total(value) {
	return value !== void 0 && /^\d+$/u.test(value) ? BigInt(value) : void 0;
}
async function lookupAddress(chain, address, options) {
	const config = configOf(options);
	return ask(chain, "Balance", address, config, async (open) => {
		const provider = open(config);
		const snapshot = await provider.getBalance(address, chain);
		const { confirmed, unconfirmed } = toBalance(chain, snapshot);
		return defined({
			address,
			confirmed,
			funded: total(snapshot.funded),
			provider: provider.name,
			readAt: snapshot.fetchedAt,
			spent: total(snapshot.spent),
			unconfirmed
		});
	});
}
async function lookupBalance(puzzle, options) {
	const chain = puzzle.chain();
	return (await Promise.all(prizeAddresses(puzzle).map((address) => lookupAddress(chain, address, options)))).reduce((sum, state) => new Balance(chain, sum.confirmed + state.confirmed, sum.unconfirmed + state.unconfirmed), new Balance(chain, 0n, 0n));
}
function toChainTransaction(chain, address, transaction) {
	const direction = sameAddress(chain, transaction.from, address) ? "out" : transaction.to !== null && sameAddress(chain, transaction.to, address) ? "in" : void 0;
	const pending = transaction.status === "pending";
	return defined({
		address,
		amount: transaction.status === "failed" ? 0n : baseUnits(transaction.value, "transaction"),
		date: pending ? void 0 : transaction.timestamp,
		direction,
		pending,
		txid: transaction.hash
	});
}
async function readHistory(chain, address, config) {
	const transactions = /* @__PURE__ */ new Map();
	const read = (complete, failure) => defined({
		address,
		complete,
		failure,
		transactions: [...transactions.values()]
	});
	for (let page = 1; page * 100 <= HISTORY_LIMIT; page += 1) {
		let rows;
		try {
			rows = await ask(chain, "Transaction history", address, config, async (open) => open(config).getTxHistory(address, chain, {
				limit: 100,
				page
			}));
		} catch (error) {
			if (page === 1 || !(error instanceof BalanceError)) throw error;
			return read(false, `${error.message}, past the newest ${transactions.size} transactions at ${address}`);
		}
		for (const row of rows) {
			const transaction = toChainTransaction(chain, address, row);
			if (!transactions.has(transaction.txid)) transactions.set(transaction.txid, transaction);
		}
		if (rows.length < 100) return read(true);
	}
	return read(false);
}
async function lookupHistory(puzzle, options) {
	const chain = puzzle.chain();
	const config = configOf(options);
	return Promise.all(prizeAddresses(puzzle).map((address) => readHistory(chain, address, config)));
}
async function lookupPubkey(chain, address, options) {
	const config = configOf(options);
	return ask(chain, "Public key", address, config, async (open) => {
		const provider = open(config);
		if (!provider.capabilities.pubkeys || provider.getPubkey === void 0) return;
		const { pubkey, source, txid } = await provider.getPubkey(address, chain);
		return source === "spend" && pubkey !== null && txid !== null ? {
			pubkey,
			txid
		} : void 0;
	});
}
export { lookupAddress, lookupBalance, lookupHistory, lookupPubkey, prizeAddresses };
