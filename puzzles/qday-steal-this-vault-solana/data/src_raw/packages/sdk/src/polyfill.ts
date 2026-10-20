// @solana/spl-token reads the global `Buffer` at call time. Browsers have none, so provide the
// `buffer` package's implementation when it is missing (no-op in Node). Imported first by index.ts.
import { Buffer } from 'buffer';

const g = globalThis as { Buffer?: unknown };
if (typeof g.Buffer === 'undefined') g.Buffer = Buffer;
