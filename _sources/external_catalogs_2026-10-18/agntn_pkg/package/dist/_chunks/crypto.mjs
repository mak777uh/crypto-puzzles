import { AddressKind, PubkeyFormat } from "./parts.mjs";
import { Chain } from "./chains2.mjs";
import { getBlockchainPath } from "@agntn/keys";
import { bip39, entropyToMnemonic, loadWordlist } from "@agntn/keys/bip39";
import { deriveHDKey, getMasterKeyFromSeed } from "@agntn/keys/bip32";
import { deriveSeed } from "@agntn/keys/electrum";
import { derive } from "@agntn/keys/brainwallet";
import { decode, encode } from "@agntn/keys/wif";
import { Base } from "@agntn/keys/blockchains/base";
import { Bitcoin } from "@agntn/keys/blockchains/bitcoin";
import { BitcoinCash } from "@agntn/keys/blockchains/bitcoincash";
import { Decred } from "@agntn/keys/blockchains/decred";
import { Dogecoin } from "@agntn/keys/blockchains/dogecoin";
import { ECash } from "@agntn/keys/blockchains/ecash";
import { Ethereum } from "@agntn/keys/blockchains/ethereum";
import { Litecoin } from "@agntn/keys/blockchains/litecoin";
const wallets = {
	arweave: void 0,
	base: new Base(),
	bitcoin: new Bitcoin(),
	bitcoincash: new BitcoinCash(),
	decred: new Decred(),
	dogecoin: new Dogecoin(),
	ecash: new ECash(),
	ethereum: new Ethereum(),
	litecoin: new Litecoin(),
	monero: void 0
};
const wifChains = {
	arweave: void 0,
	base: void 0,
	bitcoin: "bitcoin",
	bitcoincash: "bitcoin",
	decred: "decred",
	dogecoin: "dogecoin",
	ecash: "bitcoin",
	ethereum: void 0,
	litecoin: "litecoin",
	monero: void 0
};
var UnsupportedAddressKindError = class extends TypeError {
	name = "UnsupportedAddressKindError";
};
function isEvm(chain) {
	return chain === Chain.Ethereum || chain === Chain.Base;
}
function walletFor(chain) {
	return wallets[chain];
}
function wifChain(chain) {
	const version = wifChains[chain];
	if (version === void 0) throw new TypeError(`${chain} has no WIF encoding`);
	return version;
}
function addressType(chain, kind) {
	if (isEvm(chain)) return;
	switch (kind) {
		case AddressKind.P2PKH: return "legacy";
		case AddressKind.P2WPKH: return "segwit";
		case AddressKind.P2SH:
		case AddressKind.P2WSH:
		case AddressKind.Standard: throw new UnsupportedAddressKindError(`Cannot derive a ${kind} address from a private key alone`);
	}
}
function privateKeyToWif(hexKey, chain, compressed) {
	return encode(hexKey, {
		chain: wifChain(chain),
		compressed
	});
}
function wifToPrivateKey(wif, chain) {
	const decoded = decode(wif, { chain: wifChain(chain) });
	return {
		compressed: decoded.compressed,
		hex: decoded.privateKey
	};
}
function privateKeyFromSeed(phrase, path, chain, passphrase, wordlist) {
	const wallet = walletFor(chain);
	if (wallet === void 0 || chain === Chain.Decred) return;
	return wallet.deriveHDWallet(phrase, path, {
		allowInvalidChecksum: true,
		...passphrase === void 0 ? {} : { passphrase },
		...wordlist === void 0 ? {} : { wordlist }
	}).keys.private;
}
function privateKeyFromElectrumSeed(phrase, path, chain, passphrase) {
	if (walletFor(chain) === void 0 || chain === Chain.Decred) return;
	const { seed } = deriveSeed(phrase, passphrase);
	const { privateKey } = deriveHDKey(getMasterKeyFromSeed(seed), path);
	if (privateKey === null) throw new TypeError("No private key at the derivation path");
	return privateKey.toHex();
}
function privateKeyFromEntropy(hash, path, chain, passphrase, wordlist) {
	const wallet = walletFor(chain);
	if (wallet === void 0) return;
	const route = path ?? getBlockchainPath(wallet);
	const entropy = Uint8Array.fromHex(hash);
	const hex = privateKeyFromSeed(wordlist === void 0 ? entropyToMnemonic(entropy) : bip39.entropyToMnemonic(entropy, [...wordlist]), route, chain, passphrase, wordlist);
	return hex === void 0 ? void 0 : {
		hex,
		path: route
	};
}
function privateKeyFromPassphrase(passphrase, recipe) {
	return derive(passphrase, recipe).toHex();
}
function addressFromPrivateKey(hexKey, chain, format, kind) {
	const wallet = walletFor(chain);
	if (wallet === void 0) return;
	const publicKey = wallet.getKeyPublic(hexKey, { compressed: format === PubkeyFormat.Compressed });
	return wallet.getAddress(publicKey, addressType(chain, kind));
}
function addressesEqual(chain, left, right) {
	return isEvm(chain) ? left.toLowerCase() === right.toLowerCase() : left === right;
}
function isUnsupportedAddressKind(error) {
	return error instanceof UnsupportedAddressKindError;
}
export { UnsupportedAddressKindError, addressFromPrivateKey, addressesEqual, isUnsupportedAddressKind, loadWordlist, privateKeyFromElectrumSeed, privateKeyFromEntropy, privateKeyFromPassphrase, privateKeyFromSeed, privateKeyToWif, wifToPrivateKey };
