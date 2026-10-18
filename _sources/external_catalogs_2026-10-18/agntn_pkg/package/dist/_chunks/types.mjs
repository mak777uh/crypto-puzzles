import { chainDecimals } from "./chains2.mjs";
function formatUnits(units, decimals) {
	const sign = units < 0n ? "-" : "";
	const digits = (units < 0n ? -units : units).toString().padStart(decimals + 1, "0");
	const whole = digits.slice(0, digits.length - decimals);
	const fraction = digits.slice(digits.length - decimals).replace(/0+$/u, "");
	return fraction === "" ? `${sign}${whole}` : `${sign}${whole}.${fraction}`;
}
var Balance = class {
	confirmed;
	chain;
	decimals;
	unconfirmed;
	constructor(chain, confirmed, unconfirmed) {
		if (confirmed < 0n) throw new RangeError("Confirmed balance must not be negative");
		this.chain = chain;
		this.confirmed = confirmed;
		this.unconfirmed = unconfirmed;
		this.decimals = chainDecimals(chain);
		Object.freeze(this);
	}
	total() {
		return this.confirmed + this.unconfirmed;
	}
	confirmedUnits() {
		return Number(this.confirmed) / 10 ** this.decimals;
	}
	confirmedAmount() {
		return formatUnits(this.confirmed, this.decimals);
	}
	totalUnits() {
		return Number(this.total()) / 10 ** this.decimals;
	}
	totalAmount() {
		return formatUnits(this.total(), this.decimals);
	}
};
export { Balance, formatUnits };
