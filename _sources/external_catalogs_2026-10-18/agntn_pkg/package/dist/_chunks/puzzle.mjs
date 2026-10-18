import { TransactionType, addressOn, defined, frozen, secretOf } from "./parts.mjs";
import { assetRef } from "./asset-ref.mjs";
import { Chain, addressExplorerUrl, chainSymbol, transactionExplorerUrl } from "./chains2.mjs";
import { Status } from "./status.mjs";
const NO_TRANSACTIONS = Object.freeze([]);
const NO_ASSET_LINKS = Object.freeze([]);
const NO_STAGES = Object.freeze([]);
const NO_HINTS = Object.freeze([]);
const NO_TECHNIQUES = Object.freeze([]);
function assetUrlOf(path, ref = assetRef()) {
	return `https://raw.githubusercontent.com/agntn/puzzles/${ref}/${path.split("/").map(encodeURIComponent).join("/")}`;
}
function pinned(file, digests) {
	const found = digests?.find((item) => item.file === file);
	return found === void 0 ? {} : defined({
		sha256: found.sha256,
		bytes: found.bytes,
		origin: found.url,
		archive: found.archive
	});
}
function assetLink(kind, file, directory, digests) {
	const path = `${directory}/${file}`;
	return {
		kind,
		file,
		path,
		url: assetUrlOf(path),
		...pinned(file, digests)
	};
}
function imageLink(file, path, url, digests) {
	return file === void 0 || path === void 0 || url === void 0 ? [] : [{
		kind: "puzzle",
		file,
		path,
		url,
		...pinned(file, digests)
	}];
}
function recordLinks(assets, directory, image) {
	const { digests } = assets;
	return [
		...image,
		...(assets.hints ?? []).map((hint) => assetLink("hint", hint, directory, digests)),
		...assets.solution === void 0 ? [] : [assetLink("solution", assets.solution, directory, digests)]
	];
}
const SOLVE_TIME_UNITS = [
	[31536e3, "y"],
	[2592e3, "mo"],
	[86400, "d"],
	[3600, "h"],
	[60, "m"]
];
var Puzzle = class {
	escrow() {}
	status() {
		return Status.Unsolved;
	}
	pubkey() {}
	key() {}
	prize() {}
	currency() {}
	solvedAt() {}
	solveTime() {}
	preGenesis() {
		return false;
	}
	transactions() {
		return NO_TRANSACTIONS;
	}
	solver() {}
	assets() {}
	stages() {
		return NO_STAGES;
	}
	hints() {
		return NO_HINTS;
	}
	techniques() {
		return NO_TECHNIQUES;
	}
	collection() {
		const id = this.id();
		return id.split("/", 1)[0] ?? id;
	}
	name() {
		const id = this.id();
		return id.includes("/") ? id.slice(id.indexOf("/") + 1) : "";
	}
	keyData() {
		return this.key()?.data();
	}
	prizeCurrency() {
		return this.currency() ?? chainSymbol(this.chain());
	}
	hasPubkey() {
		return this.pubkey() !== void 0;
	}
	hasPrivateKey() {
		return secretOf(this.keyData()) !== void 0;
	}
	hasDerivedKey() {
		return this.keyData()?.derived === true && this.hasPrivateKey();
	}
	async balance(options = {}) {
		const { lookupBalance } = await import("./providers.mjs");
		return lookupBalance(this, options);
	}
	keyRange() {
		const bits = this.keyData()?.bits;
		if (bits === void 0 || bits < 1 || bits > 256) return;
		const width = BigInt(bits);
		return [1n << width - 1n, (1n << width) - 1n];
	}
	transaction(type) {
		return this.transactions().find((item) => item.tx_type === type);
	}
	fundingTransaction() {
		return this.transaction(TransactionType.Funding);
	}
	claimTransaction() {
		return this.transaction(TransactionType.Claim);
	}
	formattedSolveTime() {
		const seconds = this.solveTime();
		if (seconds === void 0) return;
		let remaining = seconds;
		const parts = [];
		for (const [unit, suffix] of SOLVE_TIME_UNITS) {
			const count = Math.floor(remaining / unit);
			remaining %= unit;
			if (count > 0) parts.push(`${count}${suffix}`);
		}
		return parts.length === 0 ? `${seconds}s` : parts.join(" ");
	}
	assetPath() {
		const file = this.assets()?.puzzle;
		return file === void 0 ? void 0 : `assets/${this.collection()}/${file}`;
	}
	assetUrl() {
		const path = this.assetPath();
		return path === void 0 ? void 0 : assetUrlOf(path);
	}
	assetLinks() {
		const assets = this.assets();
		const digests = assets?.digests;
		const directory = `assets/${this.collection()}`;
		const links = assets === void 0 ? [] : recordLinks(assets, directory, imageLink(assets.puzzle, this.assetPath(), this.assetUrl(), digests));
		for (const { file } of this.stages().flatMap((item) => item.artifacts)) {
			const link = file === void 0 ? void 0 : assetLink("artifact", file, directory, digests);
			if (link !== void 0 && !links.some((other) => other.path === link.path)) links.push(link);
		}
		return links.length === 0 ? NO_ASSET_LINKS : frozen(links);
	}
	explorerUrl() {
		return addressExplorerUrl(this.chain(), this.address().value);
	}
	claimExplorerUrl() {
		const txid = this.claimTransaction()?.txid;
		return txid === void 0 ? void 0 : transactionExplorerUrl(this.chain(), txid);
	}
	toJSON() {
		const transactions = this.transactions();
		const hints = this.hints();
		const stages = this.stages();
		const techniques = this.techniques();
		const record = defined({
			id: this.id(),
			chain: this.chain(),
			address: this.address(),
			escrow: this.escrow(),
			status: this.status(),
			pubkey: this.pubkey(),
			key: this.keyData(),
			prize: this.prize(),
			currency: this.currency(),
			start_date: this.startedAt(),
			solve_date: this.solvedAt(),
			solve_time: this.solveTime(),
			pre_genesis: this.preGenesis() ? true : void 0,
			source_url: this.sourceUrl(),
			transactions: transactions.length === 0 ? void 0 : transactions,
			solver: this.solver(),
			assets: this.assets(),
			stages: stages.length === 0 ? void 0 : stages,
			hints: hints.length === 0 ? void 0 : hints,
			techniques: techniques.length === 0 ? void 0 : techniques
		});
		return frozen(record);
	}
};
var BitcoinPuzzle = class extends Puzzle {
	chain() {
		return Chain.Bitcoin;
	}
};
var BitcoinCashPuzzle = class extends Puzzle {
	chain() {
		return Chain.BitcoinCash;
	}
};
var DogecoinPuzzle = class extends Puzzle {
	chain() {
		return Chain.Dogecoin;
	}
};
var ECashPuzzle = class extends Puzzle {
	chain() {
		return Chain.ECash;
	}
};
var EthereumPuzzle = class extends Puzzle {
	chain() {
		return Chain.Ethereum;
	}
};
var BasePuzzle = class extends Puzzle {
	chain() {
		return Chain.Base;
	}
};
var LitecoinPuzzle = class extends Puzzle {
	chain() {
		return Chain.Litecoin;
	}
};
var DecredPuzzle = class extends Puzzle {
	chain() {
		return Chain.Decred;
	}
};
var ArweavePuzzle = class extends Puzzle {
	chain() {
		return Chain.Arweave;
	}
};
var MoneroPuzzle = class extends Puzzle {
	chain() {
		return Chain.Monero;
	}
};
function resolved(chain, value) {
	return typeof value === "string" ? addressOn(chain, value) : value;
}
var SpecPuzzle = class extends Puzzle {
	#spec;
	constructor(spec) {
		super();
		const { chain } = spec;
		this.#spec = frozen(defined({
			...spec,
			address: resolved(chain, spec.address),
			escrow: spec.escrow === void 0 ? void 0 : resolved(chain, spec.escrow)
		}));
	}
	id() {
		return this.#spec.id;
	}
	chain() {
		return this.#spec.chain;
	}
	address() {
		return this.#spec.address;
	}
	escrow() {
		return this.#spec.escrow;
	}
	sourceUrl() {
		return this.#spec.sourceUrl;
	}
	startedAt() {
		return this.#spec.startedAt;
	}
	status() {
		return this.#spec.status ?? Status.Unsolved;
	}
	pubkey() {
		return this.#spec.pubkey;
	}
	key() {
		return this.#spec.key;
	}
	prize() {
		return this.#spec.prize;
	}
	currency() {
		return this.#spec.currency;
	}
	solvedAt() {
		return this.#spec.solvedAt;
	}
	solveTime() {
		return this.#spec.solveTime;
	}
	preGenesis() {
		return this.#spec.preGenesis ?? false;
	}
	transactions() {
		return this.#spec.transactions ?? NO_TRANSACTIONS;
	}
	solver() {
		return this.#spec.solver;
	}
	assets() {
		return this.#spec.assets;
	}
	stages() {
		return this.#spec.stages ?? NO_STAGES;
	}
	hints() {
		return this.#spec.hints ?? NO_HINTS;
	}
	techniques() {
		return this.#spec.techniques ?? NO_TECHNIQUES;
	}
};
function puzzle(spec) {
	return new SpecPuzzle(spec);
}
export { ArweavePuzzle, BasePuzzle, BitcoinCashPuzzle, BitcoinPuzzle, DecredPuzzle, DogecoinPuzzle, ECashPuzzle, EthereumPuzzle, LitecoinPuzzle, MoneroPuzzle, Puzzle, assetUrlOf, puzzle };
