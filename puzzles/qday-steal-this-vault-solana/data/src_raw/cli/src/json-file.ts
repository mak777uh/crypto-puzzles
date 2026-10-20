// JSON files the CLI reads (fee-payer keypair, --actions-file, leaf ledger).

/**
 * JSON.parse of a file, failing with `message` alone. Node's SyntaxError quotes the start of the
 * input (`"abandon ab"... is not valid JSON`), so passing the seed file where a JSON file belongs
 * would print seed words. Never chain the original error (no `cause`): BUNKER_DEBUG prints stacks.
 */
export function parseJsonFile(raw: string, message: string): unknown {
  try {
    return JSON.parse(raw) as unknown;
  } catch {
    throw new Error(message);
  }
}
