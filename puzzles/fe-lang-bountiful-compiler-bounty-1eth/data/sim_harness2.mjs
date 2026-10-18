// sim_harness2.mjs — второй набор: сквозные проверки на deployed-байткоде через eth_simulateV1.
//  S0  слот0 каждой игры = registry (lock_validator)
//  S1  для каждой игры: near-solved доска (empty=11) + dummy-валидатор → moveField(11) → isSolved=true → клетки ок
//  S2  walk по 6 легальных ходов на каждой игре: сверка клеток после каждого хода с JS-моделью
//  S3  фаззинг селекторов (120 × 2 адреса в одном блоке): всё неизвестное должно ревертиться
//  S4  claim(незарегистрированный адрес) + фейковый лок → revert
//  S5  ПОЛНЫЙ dry-run реального флоу на bitboard: lock(0.01 ETH) → moveField(11) → claim → balance 0.76; повторный claim → revert
import { ethers } from './npmtmp/node_modules/ethers/lib.esm/index.js';

const provider = new ethers.JsonRpcProvider('https://ethereum-rpc.publicnode.com', undefined, { batchMaxCount: 1 });
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
const DUMMY = '0x00000000000000000000000000000000000000dE';
const ATTACKER = '0x000000000000000000000000000000000000f00d';
const CALLER2 = '0x000000000000000000000000000000000000c002';

const iMove = new ethers.Interface(['function moveField(uint256)']);
const iMove2 = new ethers.Interface(['function moveField(uint256,uint256)']);
const iSolved = new ethers.Interface(['function isSolved() view returns (bool)']);
const iGetB = new ethers.Interface(['function getBoard(uint256) view returns (uint256)']);
const iGetB2 = new ethers.Interface(['function getBoard(uint256,uint256) view returns (uint256)']);
const iClaim = new ethers.Interface(['function claim(address)']);
const iLock = new ethers.Interface(['function lock(address)']);
const iBal = new ethers.Interface(['function getBalance() view returns (uint256)']);
const iOpen = new ethers.Interface(['function isOpenChallenge(address) view returns (bool)']);
const P0 = ethers.zeroPadValue('0x00', 32);
const pad = (x) => ethers.toBeHex(x, 32);
const abi = ethers.AbiCoder.defaultAbiCoder();
const DELAY = 150;
const delay = (ms) => new Promise(r => setTimeout(r, ms));

async function simulate(calls, stateOverrides) {
  const payload = [{ blockStateCalls: [{ stateOverrides: stateOverrides || {}, calls }] }, 'latest'];
  for (let a = 0; a < 3; a++) {
    try { return { ok: true, res: await provider.send('eth_simulateV1', payload) }; }
    catch (e) { if (a === 2) return { ok: false, err: JSON.stringify(e.info || e.error || String(e)).slice(0, 200) }; await delay(800); }
  }
}
const cr = (res, i) => { const c = res[0].calls[i]; return { ok: c.status === '0x1', ret: c.returnData || '0x' }; };
const mkCall = (to, data, over = {}) => ({ from: ATTACKER, to, data, gas: '0x2DC6C0', ...over });
const boardSlots = (name, b) => {
  if (name === 'Game') { const st = {}; for (let i = 0; i < 16; i++) st[ethers.keccak256(ethers.concat([pad(i), P0]))] = pad(b[i]); return st; }
  if (name === 'GameBitboard' || name === 'GameMonadic') return { [pad(1)]: pad(b.reduce((acc, v, i) => acc | (BigInt(v) << BigInt(4 * i)), 0n)) };
  const st = {}; for (let i = 0; i < 16; i++) st[pad(1 + i)] = pad(b[i]); return st;
};
const SOLVED = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,0];
const nb = (i) => [...(i >= 4 ? [i - 4] : []), ...(i < 12 ? [i + 4] : []), ...(i % 4 !== 0 ? [i - 1] : []), ...(i % 4 !== 3 ? [i + 1] : [])];

async function main() {
  const t0 = Date.now();
  // ---- S0: slot0 = registry у всех игр ----
  console.log('=== S0: slot0 каждой игры (ожидание: адрес registry) ===');
  {
    const regWord = ethers.zeroPadValue(REG, 32);
    for (const [n, g] of Object.entries(games)) {
      const v = await provider.getStorage(g, 0);
      const ok = v.toLowerCase() === regWord.toLowerCase();
      console.log(`  ${n.padEnd(13)} slot0=${v.slice(0, 14)}… ${ok ? 'OK (registry)' : '!!! НЕ registry'}`);
      await delay(60);
    }
  }

  // ---- S1: near-solved (empty=11) + dummy → moveField → isSolved ----
  console.log('=== S1: near-solved доска (empty=11, клетка15=12) × 7 игр ===');
  {
    const near = SOLVED.slice(); near[15] = 12; near[11] = 0;
    for (const [n, g] of Object.entries(games)) {
      const ov = { [g]: { stateDiff: boardSlots(n, near) }, [DUMMY]: { code: '0x00' } };
      // добить slot0 → dummy: stateDiff на slot0
      ov[g].stateDiff[P0] = pad(BigInt(DUMMY));
      const moveData = n === 'Game2D' ? iMove2.encodeFunctionData('moveField', [3, 3]) : iMove.encodeFunctionData('moveField', [15]);
      const getB = (cell) => n === 'Game2D'
        ? mkCall(g, iGetB2.encodeFunctionData('getBoard', [Math.floor(cell / 4), cell % 4]))
        : mkCall(g, iGetB.encodeFunctionData('getBoard', [cell]));
      const r = await simulate([
        mkCall(g, moveData),
        mkCall(g, iSolved.encodeFunctionData('isSolved')),
        getB(11),
        getB(15),
      ], ov);
      if (!r.ok) { console.log(`  ${n.padEnd(13)} SIM FAIL ${r.err}`); continue; }
      const m = cr(r.res, 0), s = cr(r.res, 1), c11 = cr(r.res, 2), c15 = cr(r.res, 3);
      const solved = s.ok && abi.decode(['bool'], s.ret)[0];
      const v11 = c11.ok ? BigInt(c11.ret).toString() : '?', v15 = c15.ok ? BigInt(c15.ret).toString() : '?';
      const good = m.ok && solved === true && v11 === '12' && v15 === '0';
      console.log(`  ${n.padEnd(13)} move(15):${m.ok ? 'OK' : 'REVERT'} isSolved:${solved} cell11=${v11} cell15=${v15} ${good ? '→ ПОЛНЫЙ ЦИКЛ ИГРЫ ОК' : '→ !!! РАЗБИРАТЬСЯ'}`);
      await delay(DELAY);
    }
  }

  // ---- S2: walk 6 ходов × 7 игр, сверка с JS ----
  console.log('=== S2: 6 легальных ходов на игру, сверка клеток с JS-моделью ===');
  {
    for (const [n, g] of Object.entries(games)) {
      let s = 777;
      const b = [1,2,3,4,5,6,7,8,9,10,11,12,13,15,14,0]; let e = 15; // реальная стартовая
      const ov = { [g]: { stateDiff: boardSlots(n, b) }, [DUMMY]: { code: '0x00' } };
      ov[g].stateDiff[P0] = pad(BigInt(DUMMY));
      const calls = [], wants = [];
      for (let step = 0; step < 6; step++) {
        const nbs = nb(e);
        s = (s * 1103515245 + 12345) & 0x7fffffff;
        const t = nbs[s % nbs.length];
        const data = n === 'Game2D'
          ? iMove2.encodeFunctionData('moveField', [Math.floor(t / 4), t % 4])
          : iMove.encodeFunctionData('moveField', [t]);
        calls.push(mkCall(g, data));
        const oldT = b[t];               // значение, которое переедет в eOld
        const eOld = e;                  // СТАРАЯ пустая клетка (получит oldT)
        [b[t], b[e]] = [b[e], b[t]]; e = t;   // модель: b[t]=0, b[eOld]=oldT
        wants.push([t, oldT, eOld]);
        calls.push(mkCall(g, n === 'Game2D' ? iGetB2.encodeFunctionData('getBoard', [Math.floor(t / 4), t % 4]) : iGetB.encodeFunctionData('getBoard', [t])));   // ожидание: 0
        calls.push(mkCall(g, n === 'Game2D' ? iGetB2.encodeFunctionData('getBoard', [Math.floor(eOld / 4), eOld % 4]) : iGetB.encodeFunctionData('getBoard', [eOld])));   // ожидание: oldT
      }
      calls.push(mkCall(g, iSolved.encodeFunctionData('isSolved')));
      const r = await simulate(calls, ov);
      if (!r.ok) { console.log(`  ${n.padEnd(13)} SIM FAIL ${r.err}`); continue; }
      let bad = 0;
      for (let step = 0; step < 6; step++) {
        const [t, oldT, e2] = wants[step];
        const mv = cr(r.res, step * 3), ct = cr(r.res, step * 3 + 1), ce = cr(r.res, step * 3 + 2);
        const vT = ct.ok ? BigInt(ct.ret) : null, vE = ce.ok ? BigInt(ce.ret) : null;
        if (!mv.ok) { bad++; console.log(`   ${n} шаг${step} moveField(${t}): REVERT!`); }
        if (vT !== 0n) { bad++; console.log(`   ${n} шаг${step} клетка ${t}: ${vT}, ожидание 0`); }
        if (vE !== BigInt(oldT)) { bad++; console.log(`   ${n} шаг${step} клетка ${e2}: ${vE}, ожидание ${oldT}`); }
      }
      const fin = cr(r.res, 18);
      const solvedNow = fin.ok && abi.decode(['bool'], fin.ret)[0];
      console.log(`  ${n.padEnd(13)} 6 ходов: ${bad === 0 ? 'все ходы и клетки = JS-модель' : bad + ' АНОМАЛИЙ'}; isSolved в конце: ${solvedNow} (ожидание false)`);
      await delay(DELAY);
    }
  }

  // ---- S3: фаззинг селекторов ----
  console.log('=== S3: 120 случайных селекторов + пустой calldata (bitboard, registry) — всё должно ревертиться ===');
  {
    let s = 424242;
    const rnd = () => { s = (s * 1103515245 + 12345) & 0x7fffffff; return s; };
    for (const [n, addr] of [['GameBitboard', games.GameBitboard], ['BountyRegistry', REG]]) {
      const calls = [{ to: addr, data: '0x', from: ATTACKER }];
      const sels = [];
      for (let i = 0; i < 120; i++) {
        let sel = '0x'; for (let k = 0; k < 8; k++) sel += (rnd() % 16).toString(16);
        sels.push(sel);
        calls.push({ from: ATTACKER, to: addr, data: sel + '00'.repeat(32 * 2) }); // с двумя word-ами
      }
      const r = await simulate(calls, {});
      if (!r.ok) { console.log(`  ${n}: SIM FAIL ${r.err}`); continue; }
      let okCnt = 0;
      for (let i = 0; i < calls.length; i++) {
        const c = cr(r.res, i);
        if (c.ok) { okCnt++; console.log(`   !!! ${n} принял calldata[${i}] = ${i === 0 ? '(пусто)' : sels[i - 1]} ret=${c.ret.slice(0, 20)}`); }
      }
      console.log(`  ${n.padEnd(13)} 121 calldata: принято ${okCnt} (ожидание 0) — все прочие revert`);
      await delay(DELAY);
    }
  }

  // ---- S4: claim(незарегистрированный) ----
  console.log('=== S4: claim на незарегистрированном адресе + фейковый лок ===');
  {
    const FAKE = '0x000000000000000000000000000000000000BAD1';
    const block = BigInt(await provider.getBlockNumber());
    const lockWord = (BigInt(ATTACKER) << 96n) | (block + 1000n);
    const lockSlot = ethers.keccak256(ethers.concat([pad(BigInt(FAKE)), P0]));
    const ov = { [REG]: { stateDiff: { [lockSlot]: '0x' + lockWord.toString(16).padStart(64, '0') } } };
    const r = await simulate([mkCall(REG, iClaim.encodeFunctionData('claim', [FAKE]))], ov);
    if (!r.ok) console.log('  SIM FAIL', r.err);
    else { const c = cr(r.res, 0); console.log(`  claim(fake): ${c.ok ? '!!! SUCCESS — ЭКСПЛОЙТ' : 'revert (ожидание) ' + c.ret.slice(0, 20)}`); }
  }

  // ---- S5: полный dry-run ----
  console.log('=== S5: ПОЛНЫЙ dry-run bitboard: lock(0.01) → moveField(11) → claim → повторный claim ===');
  {
    const g = games.GameBitboard;
    const near = SOLVED.slice(); near[15] = 12; near[11] = 0;
    const ov = {
      [g]: { stateDiff: boardSlots('GameBitboard', near) },
      [ATTACKER]: { balance: '0x' + (10n ** 18n).toString(16) }, // дать атакующему 1 ETH для депозита
    };
    const DEP = '0x2386F26FC10000'; // 0.01 ETH
    const r = await simulate([
      { from: ATTACKER, to: REG, data: iLock.encodeFunctionData('lock', [g]), value: DEP, gas: '0x2DC6C0' },
      { from: ATTACKER, to: REG, data: iBal.encodeFunctionData('getBalance'), gas: '0x2DC6C0' },
      mkCall(g, iMove.encodeFunctionData('moveField', [15])),
      mkCall(g, iSolved.encodeFunctionData('isSolved')),
      mkCall(REG, iClaim.encodeFunctionData('claim', [g])),
      mkCall(REG, iBal.encodeFunctionData('getBalance')),
      mkCall(REG, iOpen.encodeFunctionData('isOpenChallenge', [g])),
      mkCall(REG, iClaim.encodeFunctionData('claim', [g])), // повторный — должен ревертнуться
    ], ov);
    if (!r.ok) console.log('  SIM FAIL', r.err);
    else {
      const lock = cr(r.res, 0), bal1 = cr(r.res, 1), mv = cr(r.res, 2), sol = cr(r.res, 3),
        cl = cr(r.res, 4), bal2 = cr(r.res, 5), op = cr(r.res, 6), cl2 = cr(r.res, 7);
      console.log(`  lock:          ${lock.ok ? 'OK' : 'REVERT'}   balance после депозита: ${bal1.ok ? ethers.formatEther(BigInt(bal1.ret)) : '?'}`);
      console.log(`  moveField(11): ${mv.ok ? 'OK' : 'REVERT'}   isSolved: ${sol.ok ? abi.decode(['bool'], sol.ret)[0] : '?'}`);
      console.log(`  claim:         ${cl.ok ? 'OK (ВЫПЛАТА!)' : 'REVERT ' + cl.ret.slice(0, 20)}   balance после: ${bal2.ok ? ethers.formatEther(BigInt(bal2.ret)) : '?'} (ожидание 0.76)`);
      console.log(`  isOpen после:  ${op.ok ? abi.decode(['bool'], op.ret)[0] : '?'} (ожидание false)`);
      console.log(`  claim #2:      ${cl2.ok ? '!!! SUCCESS — двойная выплата!' : 'revert (ожидание)'}`);
    }
  }

  console.log(`\nВСЁ. Время: ${((Date.now() - t0) / 1000).toFixed(0)}s`);
}
main().catch(e => { console.error('FATAL', e); process.exit(1); });
