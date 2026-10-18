import { PubkeyFormat, secretOf, seedPassphrase } from "./parts.mjs";
import "./puzzle.mjs";
let wallets;
function unavailable(reason) {
	return {
		reason,
		unavailable: true
	};
}
function failed(reason) {
	return {
		reason,
		unavailable: false
	};
}
function messageOf(error, fallback) {
	return error instanceof Error ? error.message : fallback;
}
async function seedHex(seed, path, chain, passphrase, decoders) {
	if (seed.scheme === "electrum") return decoders.privateKeyFromElectrumSeed(seed.phrase, path, chain, passphrase);
	const wordlist = seed.language === void 0 ? void 0 : await decoders.loadWordlist(seed.language);
	return decoders.privateKeyFromSeed(seed.phrase, path, chain, passphrase, wordlist);
}
async function resolveSeedKey(seed, chain, format, decoders) {
	if (seed.path === void 0) return unavailable("Seed has no derivation path");
	if (seed.passphrase === "Required") return unavailable("Seed requires an unknown passphrase");
	try {
		const hex = await seedHex(seed, seed.path, chain, seed.passphrase?.Known, decoders);
		if (hex === void 0) return unavailable(`Seed derivation is not supported for ${chain}`);
		return {
			hex,
			format
		};
	} catch (error) {
		return failed(messageOf(error, "Seed derivation failed"));
	}
}
function resolveWifKey(wif, chain, decoders) {
	try {
		const decoded = decoders.wifToPrivateKey(wif, chain);
		return {
			hex: decoded.hex,
			format: decoded.compressed ? PubkeyFormat.Compressed : PubkeyFormat.Uncompressed
		};
	} catch (error) {
		return failed(messageOf(error, "Invalid WIF"));
	}
}
function hexFormat(puzzle, hex, decoders) {
	const format = puzzle.pubkey()?.format;
	if (format !== void 0) return format;
	const wif = puzzle.keyData()?.wif?.decrypted;
	if (wif !== void 0) {
		const decoded = resolveWifKey(wif, puzzle.chain(), decoders);
		if ("hex" in decoded && decoded.hex === hex.toLowerCase()) return decoded.format;
	}
	return PubkeyFormat.Compressed;
}
async function resolveKey(puzzle, decoders) {
	const secret = secretOf(puzzle.keyData());
	if (secret === void 0) return unavailable("Puzzle has no private key");
	switch (secret.kind) {
		case "hex": return {
			hex: secret.hex,
			format: hexFormat(puzzle, secret.hex, decoders)
		};
		case "wif": return resolveWifKey(secret.wif, puzzle.chain(), decoders);
		case "encrypted": return unavailable("WIF is encrypted");
		case "seed": return resolveSeedKey(secret, puzzle.chain(), puzzle.pubkey()?.format ?? PubkeyFormat.Compressed, decoders);
		case "mini": return unavailable("Mini private keys are not verified");
	}
}
async function techniqueNames(puzzle) {
	const { getCollection } = await import("./registry2.mjs");
	const collection = await getCollection(puzzle.collection());
	return (collection?.all().includes(puzzle) ? collection.techniquesById(puzzle.id()) : [...puzzle.techniques(), ...puzzle.stages().flatMap((item) => item.techniques ?? [])]).map((tag) => tag.name);
}
const WARPWALLET_SKIPPED = "WarpWallet's scrypt needs 256 MiB, so the data gate checks it instead";
function brainwalletOf(names) {
	if (names.includes("triple-sha256-brainwallet")) return ["triple-sha256-brainwallet", {
		kdf: "sha256",
		iterations: 3
	}];
	if (names.includes("sha256-brainwallet")) return ["sha256-brainwallet", { kdf: "sha256" }];
}
async function rebuildFromEntropy(puzzle, seed, decoders) {
	const chain = puzzle.chain();
	const recipe = "bip39-entropy";
	if (seed.scheme === "electrum") return {
		recipe,
		key: unavailable("BIP39 entropy doesn't rebuild an Electrum seed")
	};
	const passphrase = seedPassphrase(seed);
	if (passphrase === "Required") return {
		recipe,
		key: unavailable("Entropy seed requires an unknown passphrase")
	};
	try {
		const wordlist = seed.language === void 0 ? void 0 : await decoders.loadWordlist(seed.language);
		const rebuilt = decoders.privateKeyFromEntropy(seed.entropy.hash, seed.path, chain, passphrase?.Known, wordlist);
		return rebuilt === void 0 ? {
			recipe,
			key: unavailable(`Seed derivation is not supported for ${chain}`)
		} : {
			recipe,
			path: rebuilt.path,
			key: {
				hex: rebuilt.hex,
				format: hexFormat(puzzle, rebuilt.hex, decoders)
			}
		};
	} catch (error) {
		return {
			recipe,
			key: failed(messageOf(error, "Entropy derivation failed"))
		};
	}
}
function rebuildFromPassphrase(puzzle, recipe, passphrase, decoders) {
	const [name, options] = recipe;
	try {
		const hex = decoders.privateKeyFromPassphrase(passphrase, options);
		return {
			recipe: name,
			key: {
				hex,
				format: hexFormat(puzzle, hex, decoders)
			}
		};
	} catch (error) {
		return {
			recipe: name,
			key: failed(messageOf(error, "Brainwallet derivation failed"))
		};
	}
}
async function rebuild(puzzle, decoders) {
	const key = puzzle.keyData();
	const entropy = key?.seed?.entropy;
	if (key?.seed !== void 0 && entropy !== void 0) return rebuildFromEntropy(puzzle, {
		...key.seed,
		entropy
	}, decoders);
	return key?.wif?.passphrase === void 0 ? void 0 : rebuildBrainwallet(puzzle, key.wif.passphrase, decoders);
}
async function rebuildBrainwallet(puzzle, passphrase, decoders) {
	const names = await techniqueNames(puzzle);
	if (names.includes("warpwallet")) return {
		recipe: "warpwallet",
		key: unavailable(WARPWALLET_SKIPPED)
	};
	const recipe = brainwalletOf(names);
	return recipe === void 0 ? void 0 : rebuildFromPassphrase(puzzle, recipe, passphrase, decoders);
}
function checkKey(puzzle, crypto, key) {
	if (!("hex" in key)) return {
		derivedAddress: null,
		error: key.reason,
		unavailable: key.unavailable
	};
	const chain = puzzle.chain();
	const address = puzzle.address();
	try {
		const derivedAddress = crypto.addressFromPrivateKey(key.hex, chain, key.format, address.kind);
		if (derivedAddress === void 0) return {
			derivedAddress: null,
			error: `Unsupported verification chain: ${chain}`,
			unavailable: true
		};
		return {
			derivedAddress,
			error: crypto.addressesEqual(chain, derivedAddress, address.value) ? null : `Verification mismatch: expected ${address.value}, got ${derivedAddress}`,
			unavailable: false,
			hex: key.hex
		};
	} catch (error) {
		return {
			derivedAddress: null,
			error: messageOf(error, "Verification failed"),
			unavailable: crypto.isUnsupportedAddressKind(error)
		};
	}
}
function checkRecipe(puzzle, crypto, rebuilt) {
	const checked = checkKey(puzzle, crypto, rebuilt.key);
	return {
		recipe: rebuilt.recipe,
		...rebuilt.path === void 0 ? {} : { path: rebuilt.path },
		verified: checked.error === null,
		unavailable: checked.unavailable,
		privateKey: checked.error === null ? checked.hex ?? null : null,
		derivedAddress: checked.derivedAddress,
		error: checked.error
	};
}
async function verify(puzzle) {
	const crypto = await (wallets ??= import("./crypto.mjs"));
	const checked = checkKey(puzzle, crypto, await resolveKey(puzzle, crypto));
	const rebuilt = await rebuild(puzzle, crypto);
	const id = puzzle.id();
	const expectedAddress = puzzle.address().value;
	const recipe = rebuilt === void 0 ? {} : { recipe: checkRecipe(puzzle, crypto, rebuilt) };
	if (checked.error === null && checked.derivedAddress !== null && checked.hex !== void 0) return {
		id,
		verified: true,
		privateKey: checked.hex,
		expectedAddress,
		derivedAddress: checked.derivedAddress,
		error: null,
		...recipe
	};
	return {
		id,
		verified: false,
		privateKey: null,
		expectedAddress,
		derivedAddress: checked.derivedAddress,
		unavailable: checked.unavailable,
		error: checked.error ?? "Verification failed",
		...recipe
	};
}
export { verify };
