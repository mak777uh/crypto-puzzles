// sim_harness.mjs — eth_simulateV1 harness для Bountiful (round 3).
// Разделы:
//  T1  позитивный контроль механики (bitboard: moveField(15) на ONE_MOVE + isSolved)
//  T2  негативный контроль (без override лока — moveField должен ревертнуться)
//  T3  позитивный контроль claim (доска решена + фейковый лок → claim платит)
//  T4  АТАКА: claim на всех 7 нерешённых играх с фейковым локом (ожидание: revert; любой success = эксплойт)
//  T5  охота расхождений isSolved по детерминированному набору досок (все 7 игр)
//  T6  индексы вне диапазона / OOB-чтения
import { ethers } from './npmtmp/node_modules/ethers/lib.esm/index.js';

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
const DUMMY = '0x00000000000000000000000000000000000000dE';
const ATTACKER = '0x000000000000000000000000000000000000f00d';
const CALLER = '0x000000000000000000000000000000000000f00d';

const iMove = new ethers.Interface(['function moveField(uint256)']);
const iMove2 = new ethers.Interface(['function moveField(uint256,uint256)']);
const iSolved = new ethers.Interface(['function isSolved() view returns (bool)']);
const iGetB = new ethers.Interface(['function getBoard(uint256) view returns (uint256)']);
const iGetB2 = new ethers.Interface(['function getBoard(uint256,uint256) view returns (uint256)']);
const iClaim = new ethers.Interface(['function claim(address)']);
const iBal = new ethers.Interface(['function getBalance() view returns (uint256)']);
const P0 = ethers.zeroPadValue('0x00', 32);
const pad = (x) => ethers.zeroPadValue(ethers.toBeHex(x), 32);
const addrSlots = { DUMMY, DUMMY: DUMMY };

const delay = (ms) => new Promise(r => setTimeout(r, ms));

const rawErr = (e) => {
  try { return JSON.stringify(e.info || e.error || String(e)).slice(0, 260); }
  catch { return String(e).slice(0, 260); }
};

// publicnode: eth_simulateV1 принимает РОВНО 2 параметра, stateOverrides = {addr: {state|stateDiff|code, ...}},
// ответ = массив блоков, у блока .calls[]. (Формат Geth; 'storage' — неизвестное поле и игнорируется/ошибка.)
async function simulate(calls, stateOverrides) {
  const payload = [{ blockStateCalls: [{ stateOverrides: stateOverrides || {}, calls }] }, 'latest'];
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const res = await provider.send('eth_simulateV1', payload);
      return { ok: true, res };
    } catch (e) {
      const msg = rawErr(e);
      if (attempt === 2) return { ok: false, err: msg };
      await delay(700);
    }
  }
}

function callResult(res, i) {
  const blk = Array.isArray(res) ? res[0] : res.blocks[0];
  const c = blk.calls[i];
  const status = c.status === '0x1' || c.status === 1 || c.status === '0x01';
  return { ok: status, ret: c.returnData || '0x', error: c.error, gasUsed: c.gasUsed };
}

const mkCall = (to, data, over = {}) => ({ from: CALLER, to, data, gas: '0x1E8480', ...over });

// ---- board storage builders ----
const BOARDS = {
  Game: (b) => {
    const st = {};
    for (let i = 0; i < 16; i++) st[ethers.keccak256(ethers.concat([pad(i), P0]))] = pad(b[i]);
    return st;
  },
  BitLike: (b) => ({ [pad(1)]: pad(b.reduce((acc, v, i) => acc | (BigInt(v) << BigInt(4 * i)), 0n)) }),
  ArrLike: (b) => { const st = {}; for (let i = 0; i < 16; i++) st[pad(1 + i)] = pad(b[i]); return st; },
};
const boardSlots = (name, b) =>
  name === 'Game' ? BOARDS.Game(b) :
  (name === 'GameBitboard' || name === 'GameMonadic') ? BOARDS.BitLike(b) : BOARDS.ArrLike(b);

const SOLVED = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,0];
const START = [1,2,3,4,5,6,7,8,9,10,11,12,13,15,14,0];
const winning = (i) => (i === 15 ? 0 : i + 1);
const isSolvedJS = (b) => b.every((v, i) => v === winning(i));

function makeBoards() {
  const out = [];
  out.push(['solved', SOLVED]);
  out.push(['start', START]);
  for (const [i, j] of [[0,1],[0,15],[13,14],[7,9],[15,14],[1,2]]) { const b = SOLVED.slice(); [b[i], b[j]] = [b[j], b[i]]; out.push([`swap${i}-${j}`, b]); }
  out.push(['rotate', SOLVED.slice(1).concat([SOLVED[0]])]);
  out.push(['reverse', SOLVED.slice().reverse()]);
  out.push(['all15+0', [15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,0]]);
  out.push(['zeros', new Array(16).fill(0)]);
  out.push(['cell15=1', SOLVED.slice(0, 15).concat([1])]);
  out.push(['cell0=0', [0].concat(SOLVED.slice(1))]);
  out.push(['shift1', [2,3,4,5,6,7,8,9,10,11,12,13,14,15,0,1]]);
  // детерминированные случайные (LCG)
  let s = 12345;
  for (let k = 0; k < 10; k++) {
    const b = SOLVED.slice();
    for (let i = 15; i > 0; i--) { s = (s * 1103515245 + 12345) & 0x7fffffff; const j = s % (i + 1); [b[i], b[j]] = [b[j], b[i]]; }
    out.push([`rand${k}`, b]);
  }
  // near: различие в одном хвостовом элементе
  out.push(['tail15=14', SOLVED.slice(0, 15).concat([15])]);
  out.push(['tail14=0', SOLVED.slice(0, 14).concat([0, 15])]);
  return out;
}

async function main() {
  const t0 = Date.now();
  // ---------- T1: позитивный контроль ----------
  console.log('=== T1: bitboard ONE_MOVE: moveField(15) c override slot0 -> затем isSolved ===');
  {
    const game = games.GameBitboard;
    const oneMove = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,0,15];
    const ov = { [game]: { stateDiff: { [P0]: pad(DUMMY), ...boardSlots('GameBitboard', oneMove) } }, [DUMMY]: { code: '0x00' } };
    const r = await simulate([
      mkCall(game, iMove.encodeFunctionData('moveField', [15])),
      mkCall(game, iSolved.encodeFunctionData('isSolved')),
    ], ov);
    if (!r.ok) { console.log('  SIM FAIL:', r.err); }
    else {
      const m = callResult(r.res, 0), s = callResult(r.res, 1);
      const solved = s.ok && ethers.AbiCoder.defaultAbiCoder().decode(['bool'], s.ret)[0];
      console.log(`  moveField(15): ${m.ok ? 'SUCCESS' : 'REVERT ' + m.ret.slice(0, 20)}`);
      console.log(`  isSolved после: ${s.ok ? solved : 'REVERT'}`);
      console.log(`  => механика override+последовательность ${m.ok && solved === true ? 'РАБОТАЕТ' : 'НЕ РАБОТАЕТ — разбираться'}`);
    }
  }
  // ---------- T1b: codeless dummy (без code override) ----------
  console.log('=== T1b: то же, но dummy без кода (проверка codesize-check) ===');
  {
    const game = games.GameBitboard;
    const oneMove = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,0,15];
    const ov = { [game]: { stateDiff: { [P0]: pad(DUMMY), ...boardSlots('GameBitboard', oneMove) } } };
    const r = await simulate([mkCall(game, iMove.encodeFunctionData('moveField', [15]))], ov);
    if (!r.ok) console.log('  SIM FAIL:', r.err);
    else { const m = callResult(r.res, 0); console.log(`  moveField(15) c codeless dummy: ${m.ok ? 'SUCCESS (codesize не проверяется)' : 'REVERT ' + m.ret.slice(0, 20) + ' (проверяется codesize или иное)'}`); }
  }

  // ---------- T2: негативный контроль ----------
  console.log('=== T2: реальное состояние, moveField(11) БЕЗ override → должен ревертнуться ===');
  {
    const game = games.GameBitboard;
    const r = await simulate([mkCall(game, iMove.encodeFunctionData('moveField', [11]))], {});
    if (!r.ok) console.log('  SIM FAIL:', r.err);
    else { const m = callResult(r.res, 0); console.log(`  moveField(11): ${m.ok ? 'SUCCESS — СТРАННО (реальный лок-чек не сработал?!)' : 'REVERT ' + m.ret.slice(0, 80)}`); }
  }

  // ---------- T3: позитивный контроль claim ----------
  console.log('=== T3: claim(bitboard) на РЕШЁННОЙ доске + фейковый лок → ожидание: успех, balance -0.25 ===');
  {
    const game = games.GameBitboard;
    const block = BigInt(await provider.getBlockNumber());
    const lockWord = (BigInt(ATTACKER) << 96n) | (block + 1000n);
    const lockSlot = ethers.keccak256(ethers.concat([pad(game), P0]));
    const ov = {
      [game]: { stateDiff: { ...boardSlots('GameBitboard', SOLVED) } },
      [REG]: { stateDiff: { [lockSlot]: '0x' + lockWord.toString(16).padStart(64, '0') } },
    };
    const r = await simulate([
      mkCall(REG, iClaim.encodeFunctionData('claim', [game])),
      mkCall(REG, iBal.encodeFunctionData('getBalance')),
    ], ov);
    if (!r.ok) console.log('  SIM FAIL:', r.err);
    else {
      const c = callResult(r.res, 0), b = callResult(r.res, 1);
      console.log(`  claim: ${c.ok ? 'SUCCESS' : 'REVERT ' + c.ret.slice(0, 40)}`);
      if (b.ok) console.log(`  registry balance после: ${ethers.formatEther(BigInt(b.ret))} ETH (ожидание при выплате: 0.75)`);
      const transfers = (Array.isArray(r.res) ? r.res[0] : r.res.blocks[0]).calls[0].logs || [];
      console.log('  logs:', JSON.stringify(transfers).slice(0, 300));
    }
  }

  // ---------- T4: АТАКА claim на нерешённых ----------
  console.log('=== T4: claim на всех 7 играх (реальные НЕрешённые доски) + фейковый лок ===');
  {
    const block = BigInt(await provider.getBlockNumber());
    for (const [n, game] of Object.entries(games)) {
      const lockWord = (BigInt(ATTACKER) << 96n) | (block + 1000n);
      const lockSlot = ethers.keccak256(ethers.concat([pad(game), P0]));
      const ov = { [REG]: { stateDiff: { [lockSlot]: '0x' + lockWord.toString(16).padStart(64, '0') } } };
      const r = await simulate([
        mkCall(REG, iClaim.encodeFunctionData('claim', [game])),
        mkCall(REG, iBal.encodeFunctionData('getBalance')),
      ], ov);
      if (!r.ok) { console.log(`  ${n.padEnd(13)} SIM FAIL: ${r.err}`); continue; }
      const c = callResult(r.res, 0), b = callResult(r.res, 1);
      const bal = b.ok ? ethers.formatEther(BigInt(b.ret)) : '?';
      console.log(`  ${n.padEnd(13)} claim: ${c.ok ? '*** SUCCESS *** ' : 'revert ' + c.ret.slice(0, 40) + ' '} | balance=${bal}`);
      if (c.ok) console.log('   !!! АНОМАЛИЯ: claim на нерешённой игре прошёл — ЭКСПЛОЙТ-КАНДИДАТ');
      await delay(40);
    }
  }

  // ---------- T5: охота расхождений isSolved ----------
  console.log('=== T5: isSolved на 24 досках × 7 игр (сравнение с JS) ===');
  {
    const boards = makeBoards();
    let divergences = 0, tested = 0;
    for (const [n, game] of Object.entries(games)) {
      for (const [bn, b] of boards) {
        const ov = { [game]: { stateDiff: boardSlots(n, b) } };
        const r = await simulate([mkCall(game, iSolved.encodeFunctionData('isSolved'))], ov);
        tested++;
        if (!r.ok) { console.log(`  ${n} ${bn}: SIM FAIL ${r.err}`); continue; }
        const s = callResult(r.res, 0);
        const got = s.ok ? ethers.AbiCoder.defaultAbiCoder().decode(['bool'], s.ret)[0] : `REVERT(${s.ret.slice(0, 10)})`;
        const want = isSolvedJS(b);
        if (got !== want) {
          divergences++;
          console.log(`  !!! ${n} ${bn}: isSolved=${got}, ожидалось ${want}, доска=[${b.join(',')}]`);
        }
        await delay(30);
      }
      console.log(`  ${n}: ${boards.length} досок — готово`);
    }
    console.log(`  T5 итог: ${tested} тестов, расхождений: ${divergences}`);
  }

  // ---------- T6: OOB ----------
  console.log('=== T6: индексы вне диапазона ===');
  {
    // moveField(16) и moveField(2^200) на bitboard с dummy-локом
    const game = games.GameBitboard;
    const ov = { [game]: { stateDiff: { [P0]: pad(DUMMY) } }, [DUMMY]: { code: '0x00' } };
    const big = (1n << 200n) + 16n;
    const r = await simulate([
      mkCall(game, iMove.encodeFunctionData('moveField', [16])),
      mkCall(game, iMove.encodeFunctionData('moveField', [big])),
    ], ov);
    if (!r.ok) console.log('  SIM FAIL:', r.err);
    else {
      const a = callResult(r.res, 0), b = callResult(r.res, 1);
      console.log(`  moveField(16): ${a.ok ? 'SUCCESS?!' : 'revert ' + a.ret.slice(0, 40)}`);
      console.log(`  moveField(2^200+16): ${b.ok ? 'SUCCESS?!' : 'revert ' + b.ret.slice(0, 40)}`);
    }
    // Game2D getBoard(16,0) — OOB-чтение?
    const g2d = games.Game2D;
    const r2 = await simulate([mkCall(g2d, iGetB2.encodeFunctionData('getBoard', [16, 0]))], {});
    if (r2.ok) {
      const v = callResult(r2.res, 0);
      console.log(`  Game2D getBoard(16,0): ${v.ok ? 'вернул ' + v.ret.slice(0, 42) + ' (OOB-ЧТЕНИЕ!)' : 'revert ' + v.ret.slice(0, 40)}`);
    } else console.log('  Game2D sim fail:', r2.err);
    const r3 = await simulate([mkCall(g2d, iGetB2.encodeFunctionData('getBoard', [0, (1n << 200n)]))], {});
    if (r3.ok) {
      const v = callResult(r3.res, 0);
      console.log(`  Game2D getBoard(0,2^200): ${v.ok ? 'вернул ' + v.ret.slice(0, 42) + ' (OOB-ЧТЕНИЕ!)' : 'revert ' + v.ret.slice(0, 40)}`);
    } else console.log('  Game2D sim fail:', r3.err);
  }

  console.log(`\nВСЁ. Время: ${((Date.now() - t0) / 1000).toFixed(0)}s`);
}

main().catch(e => { console.error('FATAL', e); process.exit(1); });
