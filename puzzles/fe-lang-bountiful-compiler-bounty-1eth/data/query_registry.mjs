// query_registry.mjs — on-chain константы BountyRegistry (Fe Bountiful, round 3).
// Использование: cd в папку с npmtmp (или установи ethers) и:
//   node query_registry.mjs
// Проверено 2026-10-17: lock_deposit=0.01 ETH, balance=1.0 ETH, 7 игр по 0.25 ETH, все open, не locked.
import { ethers } from './npmtmp/node_modules/ethers/lib.esm/index.js';

const provider = new ethers.JsonRpcProvider('https://ethereum-rpc.publicnode.com');
const REG = '0x71fB6afcD98c5BD611712ad4b8D314EF729aa69D';
const abi = [
  'function getLockDeposit() view returns (uint256)',
  'function getBalance() view returns (uint256)',
  'function getPrizeAmount(address) view returns (uint128)',
  'function isOpenChallenge(address) view returns (bool)',
  'function isLocked(address) view returns (bool)',
  // для будущих проверок:
  'function getLockInfo(address) view returns (address, uint256)',
];
const c = new ethers.Contract(REG, abi, provider);

const games = {
  Game: '0x046a3a4968282BaA7ad6291723873C8275434623',
  Game2D: '0xE959e7ecA1afCa6cf2Bf8b07e25Da355b6C8E8c7',
  GameBitboard: '0x5E987b6aADD4DFC2236D21edE6D07feb04350b06',
  GameEnum: '0xfb5423aDfBAC65ac675845Bb4FEBf8aeC128272E',
  GameMonadic: '0x86B7AEce1503242fED29E593FAEde3b7b00a5a1D',
  GameNested: '0x3dF9789634995546B0126bC28B9F9FcBCB129F18',
  GameTrait: '0x85b4d0B32b8a285111c244E52524B642f1A5ccFE',
};

const fmt = (x) => ethers.formatEther(x) + ' ETH';
console.log('lock_deposit:', fmt(await c.getLockDeposit()));
console.log('registry balance:', fmt(await c.getBalance()));
let sum = 0n;
for (const [n, a] of Object.entries(games)) {
  const p = await c.getPrizeAmount(a);
  sum += p;
  console.log(n.padEnd(12), fmt(p), 'open:', await c.isOpenChallenge(a), 'locked:', await c.isLocked(a));
}
console.log('sum prizes:', fmt(sum), '(chain pays only first 4 claims at 1.0 ETH balance)');
