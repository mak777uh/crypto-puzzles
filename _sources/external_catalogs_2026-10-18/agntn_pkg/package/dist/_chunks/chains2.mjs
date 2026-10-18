import { Arweave, Base, Bitcoin, BitcoinCash, Decred, Dogecoin, Ecash, Ethereum, InvalidAddressError, InvalidTxidError, Litecoin, Monero, UnknownChainError, UnsupportedChainError, getChain } from "@agntn/chains";
const Chain = {
	Arweave: "arweave",
	Base: "base",
	Bitcoin: "bitcoin",
	BitcoinCash: "bitcoincash",
	Decred: "decred",
	Dogecoin: "dogecoin",
	ECash: "ecash",
	Ethereum: "ethereum",
	Litecoin: "litecoin",
	Monero: "monero"
};
const chains = Object.freeze(Object.values(Chain));
const metadata = Object.freeze({
	arweave: new Arweave(),
	base: new Base(),
	bitcoin: new Bitcoin(),
	bitcoincash: new BitcoinCash(),
	decred: new Decred(),
	dogecoin: new Dogecoin(),
	ecash: new Ecash(),
	ethereum: new Ethereum(),
	litecoin: new Litecoin(),
	monero: new Monero()
});
function isSupported(key) {
	return Object.hasOwn(metadata, key);
}
function chainSymbol(chain) {
	return metadata[chain].symbol;
}
function chainDecimals(chain) {
	return metadata[chain].decimals;
}
function chainName(chain) {
	return metadata[chain].name;
}
function parseChain(value) {
	try {
		const key = getChain(value).key;
		return isSupported(key) ? key : void 0;
	} catch (error) {
		if (error instanceof UnsupportedChainError || error instanceof UnknownChainError) return;
		throw error;
	}
}
function transactionExplorerUrl(chain, txid) {
	return `${metadata[chain].explorer}/tx/${encodeURIComponent(txid)}`;
}
function addressExplorerUrl(chain, address) {
	const encoded = encodeURIComponent(address);
	const base = metadata[chain].explorer;
	return chain === Chain.Monero ? `${base}/search?value=${encoded}` : `${base}/address/${encoded}`;
}
function isValidAddress(chain, address) {
	try {
		metadata[chain].assertAddress(address);
		return true;
	} catch (error) {
		if (error instanceof InvalidAddressError) return false;
		throw error;
	}
}
function isValidTransactionId(chain, txid) {
	try {
		metadata[chain].assertTxid(txid);
		return true;
	} catch (error) {
		if (error instanceof InvalidTxidError) return false;
		throw error;
	}
}
const bech32Prefixes = Object.freeze({
	bitcoin: ["bc1"],
	litecoin: ["ltc1"]
});
function caseFolds(chain, address) {
	if (chain === Chain.Ethereum || chain === Chain.Base || chain === Chain.BitcoinCash || chain === Chain.ECash) return true;
	const prefixes = bech32Prefixes[chain];
	const lowered = address.toLowerCase();
	return prefixes !== void 0 && prefixes.some((prefix) => lowered.startsWith(prefix));
}
function sameAddress(chain, left, right) {
	return left === right || caseFolds(chain, left) && caseFolds(chain, right) && left.toLowerCase() === right.toLowerCase();
}
export { Chain, addressExplorerUrl, chainDecimals, chainName, chainSymbol, chains, isValidAddress, isValidTransactionId, parseChain, sameAddress, transactionExplorerUrl };
