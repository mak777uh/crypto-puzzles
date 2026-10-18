import { PuzzlesError } from "./errors.mjs";
const apiKeyVariables = Object.freeze({
	bitcoincash: "BLOCKCHAIR_API_KEY",
	dogecoin: "BLOCKCHAIR_API_KEY",
	ecash: "BLOCKCHAIR_API_KEY",
	ethereum: "ETHERSCAN_API_KEY",
	litecoin: "BLOCKCHAIR_API_KEY"
});
const HISTORY_LIMIT = 1e3;
var BalanceError = class extends PuzzlesError {
	name = "BalanceError";
};
var InvalidAddressError = class extends BalanceError {
	name = "InvalidAddressError";
};
var UnsupportedChainError = class extends BalanceError {
	name = "UnsupportedChainError";
};
var BalanceProviderError = class extends BalanceError {
	name = "BalanceProviderError";
};
export { BalanceError, BalanceProviderError, HISTORY_LIMIT, InvalidAddressError, UnsupportedChainError, apiKeyVariables };
