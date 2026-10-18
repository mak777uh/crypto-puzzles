// byte_compare.mjs — побайтовое сравнение: deployed runtime (eth_getCode) vs свежая сборка fe 26.1.0.
import { ethers } from './npmtmp/node_modules/ethers/lib.esm/index.js';
import { readFileSync } from 'node:fs';

const provider = new ethers.JsonRpcProvider('https://ethereum-rpc.publicnode.com');
const REG = '0x71fB6afcD98c5BD611712ad4b8D314EF729aa69D';
const games = {
  Game: '0x046a3a4968282BaA7ad6291723873C8275434623',
  Game2D: '0xE959e7ecA1afCa6cf2Bf8b07e25Da355b6C8E8c7',
  GameBitboard: '0x5E987b6aADD4DFC2236D21edE6D07feb04350b06',
  GameEnum: '0xfb5423aDfBAC65ac675845Bb4FEBf8aeC128272E',
  GameMonadic: '0x86B7AEce1503242fED29E593FAEde3b7b00a5a1D',
  GameNested: '0x3dF9789634995546B0126bC28B9F9FcBCB129F18',
  GameTrait: '0x85b4d0B32b8a285111c244E52524B642f1A5ccFE',
};
const OUT = 'repo/contracts/out';

async function main() {
  const pairs = [['BountyRegistry', REG], ...Object.entries(games)];
  let allMatch = true;
  for (const [name, addr] of pairs) {
    const file = readFileSync(`${OUT}/${name}.runtime.bin`, 'utf8').trim().toLowerCase().replace(/^0x/, '');
    const onchain = (await provider.getCode(addr)).toLowerCase().replace(/^0x/, '');
    const match = file === onchain;
    let detail = '';
    if (!match) {
      allMatch = false;
      const n = Math.max(file.length, onchain.length);
      let firstDiff = -1, diffs = 0;
      for (let i = 0; i < n; i++) {
        if (file[i] !== onchain[i]) { diffs++; if (firstDiff === -1) firstDiff = i; }
      }
      detail = ` firstDiff@${firstDiff} diffs=${diffs} len(built=${file.length}, chain=${onchain.length})`;
      if (firstDiff >= 0) {
        detail += `\n    built: ...${file.slice(Math.max(0, firstDiff - 20), firstDiff + 40)}`;
        detail += `\n    chain: ...${onchain.slice(Math.max(0, firstDiff - 20), firstDiff + 40)}`;
      }
    }
    console.log(`${name.padEnd(14)} ${match ? 'MATCH ✓' : 'DIFF ✗'}  len built=${file.length / 2}B chain=${onchain.length / 2}B${detail}`);
    await new Promise(r => setTimeout(r, 100));
  }
  console.log(allMatch ? '\nИТОГ: все 8 контрактов байт-в-байт совпадают с deployed' : '\nИТОГ: ЕСТЬ РАСХОЖДЕНИЯ — разбирать');
}
main().catch(e => { console.error('FATAL', e.message); process.exit(1); });
