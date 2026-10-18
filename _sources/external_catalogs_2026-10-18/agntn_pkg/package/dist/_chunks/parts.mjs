import { base58, bech32 } from "@scure/base";
const AddressKind = {
	P2PKH: "p2pkh",
	P2SH: "p2sh",
	P2WPKH: "p2wpkh",
	P2WSH: "p2wsh",
	Standard: "standard"
};
const PubkeyFormat = {
	Compressed: "compressed",
	Uncompressed: "uncompressed"
};
const TransactionType = {
	Claim: "claim",
	Decrease: "decrease",
	Funding: "funding",
	Increase: "increase",
	PubkeyReveal: "pubkey_reveal",
	Sweep: "sweep",
	Transfer: "transfer"
};
const PartyKind = {
	Organization: "organization",
	Person: "person"
};
const HintKind = {
	Community: "community",
	Official: "official"
};
function secretOf(key) {
	if (key === void 0) return;
	return hexSecret(key) ?? wifSecret(key) ?? seedSecret(key) ?? miniSecret(key);
}
function hexSecret(key) {
	return key.hex === void 0 ? void 0 : {
		kind: "hex",
		hex: key.hex
	};
}
function wifSecret(key) {
	if (key.wif?.decrypted !== void 0) return {
		kind: "wif",
		wif: key.wif.decrypted
	};
	if (key.wif?.encrypted !== void 0) return {
		kind: "encrypted",
		encrypted: key.wif.encrypted
	};
}
function seedSecret(key) {
	if (key.seed?.phrase === void 0) return;
	return {
		kind: "seed",
		phrase: key.seed.phrase,
		path: key.seed.path,
		passphrase: seedPassphrase(key.seed),
		language: key.seed.language,
		scheme: key.seed.scheme
	};
}
function seedPassphrase(seed) {
	if (seed.passphrase !== void 0) return { Known: seed.passphrase };
	return seed.scheme === "electrum" ? void 0 : seed.entropy?.passphrase;
}
function miniSecret(key) {
	return key.mini === void 0 ? void 0 : {
		kind: "mini",
		mini: key.mini
	};
}
function defined(value) {
	return Object.fromEntries(Object.entries(value).filter(([, item]) => item !== void 0));
}
function frozen(value) {
	const seen = /* @__PURE__ */ new WeakSet();
	const walk = (item) => {
		if (typeof item !== "object" || item === null || seen.has(item)) return;
		seen.add(item);
		Object.freeze(item);
		for (const nested of Object.values(item)) walk(nested);
	};
	walk(value);
	return value;
}
function address(kind, value, hash160) {
	return defined({
		value,
		kind,
		hash160
	});
}
const BASE58_KINDS = {
	bitcoin: {
		0: AddressKind.P2PKH,
		5: AddressKind.P2SH
	},
	bitcoincash: {
		0: AddressKind.P2PKH,
		5: AddressKind.P2SH
	},
	dogecoin: {
		30: AddressKind.P2PKH,
		22: AddressKind.P2SH
	},
	ecash: {
		0: AddressKind.P2PKH,
		5: AddressKind.P2SH
	},
	litecoin: {
		48: AddressKind.P2PKH,
		50: AddressKind.P2SH,
		5: AddressKind.P2SH
	}
};
const SEGWIT_PREFIXES = {
	bitcoin: "bc",
	litecoin: "ltc"
};
const DECRED_KINDS = {
	Dc: AddressKind.P2SH,
	Ds: AddressKind.P2PKH
};
const STANDARD_CHAINS = /* @__PURE__ */ new Set([
	"arweave",
	"base",
	"ethereum",
	"monero"
]);
function segwitAddress(value) {
	const { words } = bech32.decode(value);
	const program = bech32.fromWords(words.slice(1));
	if (words[0] !== 0) return;
	if (program.length === 20) return address(AddressKind.P2WPKH, value, program.toHex());
	return program.length === 32 ? address(AddressKind.P2WSH, value) : void 0;
}
function base58Address(chain, value) {
	const kinds = BASE58_KINDS[chain];
	if (kinds === void 0) return;
	const payload = base58.decode(value);
	const kind = kinds[payload[0] ?? -1];
	if (kind === void 0 || payload.length !== 25) return;
	return defined({
		value,
		kind,
		hash160: payload.subarray(1, 21).toHex()
	});
}
function addressOn(chain, value) {
	if (STANDARD_CHAINS.has(chain)) return standard(value);
	const decred = chain === "decred" ? DECRED_KINDS[value.slice(0, 2)] : void 0;
	if (decred !== void 0) return address(decred, value);
	const prefix = SEGWIT_PREFIXES[chain];
	let read;
	try {
		read = prefix !== void 0 && value.toLowerCase().startsWith(`${prefix}1`) ? segwitAddress(value) : base58Address(chain, value);
	} catch {
		read = void 0;
	}
	if (read === void 0) throw new TypeError(`${value} is not a ${chain} address kind a record can hold`);
	return read;
}
function p2pkh(value, hash160) {
	return address(AddressKind.P2PKH, value, hash160);
}
function p2wpkh(value, hash160) {
	return address(AddressKind.P2WPKH, value, hash160);
}
function p2wsh(value) {
	return address(AddressKind.P2WSH, value);
}
function p2sh(value, hash160, redeemScript) {
	return defined({
		value,
		kind: AddressKind.P2SH,
		hash160,
		redeem_script: redeemScript
	});
}
function standard(value, hash160) {
	return address(AddressKind.Standard, value, hash160);
}
function redeemScript(hash, script) {
	return {
		hash,
		script
	};
}
function compressed(value) {
	return {
		value,
		format: PubkeyFormat.Compressed
	};
}
function uncompressed(value) {
	return {
		value,
		format: PubkeyFormat.Uncompressed
	};
}
var Key = class Key {
	#data;
	constructor(data = {}) {
		this.#data = frozen(data);
	}
	#with(patch) {
		return new Key({
			...this.#data,
			...patch
		});
	}
	hex(value, bits) {
		return this.#with(defined({
			hex: value,
			bits
		}));
	}
	bits(value) {
		return this.#with({ bits: value });
	}
	wif(decrypted) {
		return this.#with({ wif: {
			...this.#data.wif,
			decrypted
		} });
	}
	encrypted(payload, options = {}) {
		return this.#with({ wif: defined({
			...this.#data.wif,
			encrypted: payload,
			...options
		}) });
	}
	passphrase(value) {
		return this.#with({ wif: {
			...this.#data.wif,
			passphrase: value
		} });
	}
	salt(value) {
		return this.#with({ wif: {
			...this.#data.wif,
			salt: value
		} });
	}
	seed(phrase, path, passphrase) {
		return this.#with({ seed: defined({
			...this.#data.seed,
			phrase,
			path,
			passphrase
		}) });
	}
	language(value) {
		return this.#with({ seed: {
			...this.#data.seed,
			language: value
		} });
	}
	electrum() {
		return this.#with({ seed: {
			...this.#data.seed,
			scheme: "electrum"
		} });
	}
	path(value) {
		return this.#with({ seed: {
			...this.#data.seed,
			path: value
		} });
	}
	xpub(value) {
		return this.#with({ seed: {
			...this.#data.seed,
			xpub: value
		} });
	}
	entropy(hash, source, passphrase) {
		return this.#with({ seed: {
			...this.#data.seed,
			entropy: defined({
				hash,
				source,
				passphrase
			})
		} });
	}
	derived() {
		return this.#with({ derived: true });
	}
	mini(value) {
		return this.#with({ mini: value });
	}
	shares(threshold, total, published) {
		return this.#with({ shares: {
			threshold,
			total,
			shares: published
		} });
	}
	data() {
		return this.#data;
	}
};
function hex$1(value, bits) {
	return new Key().hex(value, bits);
}
function bits(value) {
	return new Key().bits(value);
}
function wif(decrypted) {
	return new Key().wif(decrypted);
}
function encryptedWif(payload, options = {}) {
	return new Key().encrypted(payload, options);
}
function passphrase(value) {
	return new Key().passphrase(value);
}
function seed(phrase, path, passphrase) {
	return new Key().seed(phrase, path, passphrase);
}
function derivation(path) {
	return new Key().path(path);
}
function mini(value) {
	return new Key().mini(value);
}
function shares(threshold, total, published) {
	return new Key().shares(threshold, total, published);
}
function share(index, data) {
	return {
		index,
		data
	};
}
function source(url, description) {
	return defined({
		url,
		description
	});
}
function transaction(tx_type, txid, date, amount) {
	return {
		tx_type,
		txid,
		date,
		amount
	};
}
function funding(txid, date, amount) {
	return transaction(TransactionType.Funding, txid, date, amount);
}
function increase(txid, date, amount) {
	return transaction(TransactionType.Increase, txid, date, amount);
}
function decrease(txid, date, amount) {
	return transaction(TransactionType.Decrease, txid, date, amount);
}
function pubkeyReveal(txid, date, amount) {
	return transaction(TransactionType.PubkeyReveal, txid, date, amount);
}
function claim(txid, date, amount) {
	return transaction(TransactionType.Claim, txid, date, amount);
}
function sweep(txid, date, amount) {
	return transaction(TransactionType.Sweep, txid, date, amount);
}
function transfer(txid, date, amount) {
	return transaction(TransactionType.Transfer, txid, date, amount);
}
function profile(name, url) {
	return {
		name,
		url
	};
}
function fact(text, source, options = {}) {
	return defined({
		text,
		source,
		date: options.date
	});
}
function party(name, options = {}) {
	return defined({
		key: options.key,
		kind: options.kind,
		name,
		aliases: options.aliases,
		about: options.about,
		addresses: options.addresses,
		profiles: options.profiles,
		facts: options.facts
	});
}
function assets(options) {
	return defined({
		puzzle: options.puzzle,
		solution: options.solution,
		hints: options.hints,
		source_url: options.sourceUrl,
		digests: options.digests
	});
}
function digest(file, sha256, bytes, origin = {}) {
	return defined({
		file,
		sha256,
		bytes,
		url: origin.url,
		archive: origin.archive
	});
}
function artifact(name, url, file) {
	return defined({
		name,
		url,
		file
	});
}
function stage(name, about, artifacts, solution, used = []) {
	return defined({
		name,
		about,
		artifacts,
		answer: solution,
		techniques: used.length === 0 ? void 0 : used
	});
}
function technique(name, source) {
	return {
		name,
		source
	};
}
function confirmation(url, description) {
	return defined({
		url,
		description
	});
}
function answer(text, source, options = {}) {
	return defined({
		text,
		source,
		date: options.date
	});
}
function hint(kind, text, source, confirmation, options) {
	return defined({
		kind,
		text,
		source,
		confirmation,
		date: options.date,
		answer: options.answer
	});
}
function official(text, source, confirmation, options = {}) {
	return hint(HintKind.Official, text, source, confirmation, options);
}
function community(text, source, confirmation, options = {}) {
	return hint(HintKind.Community, text, source, confirmation, options);
}
export { AddressKind, HintKind, Key, PartyKind, PubkeyFormat, TransactionType, addressOn, answer, artifact, assets, bits, claim, community, compressed, confirmation, decrease, defined, derivation, digest, encryptedWif, fact, frozen, funding, hex$1 as hex, increase, mini, official, p2pkh, p2sh, p2wpkh, p2wsh, party, passphrase, profile, pubkeyReveal, redeemScript, secretOf, seed, seedPassphrase, share, shares, source, stage, standard, sweep, technique, transfer, uncompressed, wif };
