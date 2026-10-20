var e=`// Loader for the generated wasm-bindgen module (crates/bunker-wasm, \`--target web\`).
//
// Browser (Vite): the \`new URL('./wasm/…', import.meta.url)\` pattern below is rewritten by Vite to the
// hashed asset URL, and the module is instantiated with fetch/instantiateStreaming.
// Node (CLI, vitest, tsx): the URL is a file: URL, so the bytes are read with node:fs and
// instantiated synchronously. \`node:fs\` is imported through a variable so bundlers leave it alone.

import initAsync, * as wasm from './wasm/bunker_wasm.js';

export type BunkerWasm = typeof wasm;

let ready = false;
let pending: Promise<void> | null = null;

/** Initialise the WASM module. Idempotent and safe to call concurrently. Works in browsers and Node. */
export function initWasm(): Promise<void> {
  if (ready) return Promise.resolve();
  if (!pending) {
    pending = load().then(
      () => {
        ready = true;
      },
      (e: unknown) => {
        pending = null;
        throw e;
      },
    );
  }
  return pending;
}

async function load(): Promise<void> {
  const url = new URL('./wasm/bunker_wasm_bg.wasm', import.meta.url);
  if (url.protocol === 'file:') {
    const fsName = 'node:fs/promises';
    const fs = (await import(/* @vite-ignore */ fsName)) as {
      readFile(p: URL): Promise<Uint8Array>;
    };
    const bytes = await fs.readFile(url);
    wasm.initSync({ module: bytes });
    return;
  }
  await initAsync({ module_or_path: url });
}

export function isWasmReady(): boolean {
  return ready;
}

/** The initialised WASM exports. Throws a clear error if initWasm() has not completed. */
export function getWasm(): BunkerWasm {
  if (!ready) throw new Error('Bunker WASM is not initialised: await initWasm() first');
  return wasm;
}
`;export{e as default};